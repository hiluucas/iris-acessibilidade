import { NextResponse } from 'next/server';
import axeCore from 'axe-core';
// Importa APENAS o tipo, não a biblioteca real (para não pesar)
import type { Browser } from 'puppeteer-core';

// Configuração para Vercel Pro (60s) ou Hobby (10s - máximo possível)
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
      // VERCEL (Nuvem)
      const chromium = require('@sparticuz/chromium-min');
      const puppeteerCore = require('puppeteer-core');

      // A URL aqui PRECISA ser da versão v131.0.1 para casar com o pacote instalado
      browser = await puppeteerCore.launch({
        args: [
          ...chromium.args,
          '--hide-scrollbars',
          '--disable-web-security',
          '--disable-gpu',     // Obrigatório para Serverless
          '--no-zygote',       // Economia de memória
          '--single-process',  // Evita processos fantasmas
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(
          'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
        ),
        headless: chromium.headless,
      });

    } else {
      // LOCAL (Seu PC)
      const puppeteer = require('puppeteer');
      
      // Usa o Chrome instalado pelo Puppeteer v23
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    if (!browser) throw new Error('Falha crítica ao iniciar o navegador.');
    
    const page = await browser.newPage();

    // Disfarce de Usuário (User Agent de Chrome v120 para passar despercebido)
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Navegação (30s timeout para não estourar o limite da Vercel)
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

    // Injeta a engine de auditoria
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
      { error: 'Erro técnico ao processar. Verifique se a URL é válida.' }, 
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}