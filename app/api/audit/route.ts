import { NextResponse } from 'next/server';
import axeCore from 'axe-core';
// Importamos apenas os tipos para não quebrar o build
import type { Browser } from 'puppeteer-core';

// Configurações para Vercel (Tempo máximo de execução)
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export interface AuditResult {
  url: string;
  timestamp: string;
  violations: Array<{
    id: string;
    impact: string;
    description: string;
    help: string;
    nodes: Array<{ html: string; target: string[] }>;
  }>;
  score: number;
}

export async function POST(req: Request) {
  let browser: Browser | null = null;

  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
    }

    // --- LÓGICA HÍBRIDA: LOCAL vs NUVEM ---
    if (process.env.NODE_ENV === 'production') {
      // AMBIENTE DE NUVEM (VERCEL)
      const chromium = require('@sparticuz/chromium-min');
      const puppeteerCore = require('puppeteer-core');

      browser = await puppeteerCore.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(
          'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
        ),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });

    } else {
      // AMBIENTE LOCAL (SEU COMPUTADOR)
      // Usa o puppeteer padrão que já tem o Chrome baixado
      const puppeteer = require('puppeteer');
      
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    if (!browser) throw new Error('Falha crítica ao iniciar o navegador.');
    
    const page = await browser.newPage();

    // Disfarce de Usuário Real (Evita bloqueios de segurança)
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Navegação (Timeout de 30s)
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 30000 
    });

    // Injeção de compatibilidade para o axe-core (Corrige erro "module not defined")
    await page.evaluate(() => {
      // @ts-ignore
      window.module = { exports: {} };
      // @ts-ignore
      window.exports = {};
      // @ts-ignore
      window.process = { env: {} };
    });

    // Injeta a engine de acessibilidade
    await page.evaluate(axeCore.source);

    // Executa a auditoria (WCAG 2.2 A e AA)
    const results = await page.evaluate(async () => {
      // @ts-ignore
      return await axe.run({
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      });
    });

    // Cálculo de Score
    let penalty = 0;
    // @ts-ignore
    results.violations.forEach((v: any) => {
      if (v.impact === 'critical') penalty += 5;
      if (v.impact === 'serious') penalty += 3;
      if (v.impact === 'moderate') penalty += 1;
    });
    const score = Math.max(0, 100 - penalty);

    const auditData: AuditResult = {
      url,
      timestamp: new Date().toISOString(),
      // @ts-ignore
      violations: results.violations,
      score,
    };

    return NextResponse.json(auditData);

  } catch (error) {
    console.error('ERRO NO SCANNER:', error);
    return NextResponse.json(
      { error: 'Erro técnico ao processar. Verifique se a URL é válida.' }, 
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}