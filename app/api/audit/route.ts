import { NextResponse } from 'next/server';
import axeCore from 'axe-core';
// Importamos apenas os tipos para não quebrar o build
import type { Browser } from 'puppeteer-core';

export const maxDuration = 60; // Define limite de 60s para a função na Vercel (Pro) ou o máximo permitido

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
      // ESTAMOS NA VERCEL (NUVEM)
      const chromium = require('@sparticuz/chromium-min');
      const puppeteerCore = require('puppeteer-core');

      browser = await puppeteerCore.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });

    } else {
      // ESTAMOS NO SEU COMPUTADOR (LOCAL)
      const puppeteer = require('puppeteer');
      
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // O puppeteer local já baixa o chrome automaticamente, não precisa de path
      });
    }

    if (!browser) throw new Error('Falha ao iniciar o navegador.');
    
    const page = await browser.newPage();

    // Configurações para parecer um usuário real
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Navega até a URL (Timeout de 30s para garantir resposta rápida)
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 30000 
    });

    // Injeção do Axe-Core (Correção do erro "module is not defined")
    await page.evaluate(() => {
      // @ts-ignore
      window.module = { exports: {} };
      // @ts-ignore
      window.exports = {};
      // @ts-ignore
      window.process = { env: {} };
    });

    // Injeta a biblioteca de auditoria
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

    // Cálculo do Score
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
    console.error('ERRO NO BACKEND:', error);
    return NextResponse.json(
      { error: 'Erro técnico ao analisar. Tente novamente ou verifique a URL.' }, 
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}