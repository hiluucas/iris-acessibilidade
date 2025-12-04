import { NextResponse } from 'next/server';
import axeCore from 'axe-core';
import type { Browser } from 'puppeteer-core';

// Configuração crítica para Vercel
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

    // --- LÓGICA DE AMBIENTE ---
    if (process.env.NODE_ENV === 'production') {
      // AMBIENTE VERCEL
      const chromium = require('@sparticuz/chromium-min');
      const puppeteerCore = require('puppeteer-core');

      // IMPORTANTE: A versão do pacote aqui DEVE bater com a URL do executablePath
      // Estamos usando v131.0.1 em ambos
      browser = await puppeteerCore.launch({
        args: [
          ...chromium.args, 
          '--hide-scrollbars', 
          '--disable-web-security', 
          '--disable-gpu'
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(
          'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
        ),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });

    } else {
      // AMBIENTE LOCAL
      const puppeteer = require('puppeteer');
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    if (!browser) throw new Error('Falha crítica ao iniciar o navegador.');
    
    const page = await browser.newPage();

    // Configuração de Viewport e User Agent
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Navegação com Timeout de Segurança (30s)
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 30000 
    });

    // Injeção de compatibilidade (Mock do Node.js)
    await page.evaluate(() => {
      // @ts-ignore
      window.module = { exports: {} };
      // @ts-ignore
      window.exports = {};
      // @ts-ignore
      window.process = { env: {} };
    });

    // Injeta o script de auditoria
    await page.evaluate(axeCore.source);

    // Executa a auditoria
    const results = await page.evaluate(async () => {
      // @ts-ignore
      return await axe.run({
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      });
    });

    // Calcula o score
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
      { error: 'Erro técnico ao processar. Verifique a URL.' }, 
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}