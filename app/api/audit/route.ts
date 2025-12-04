import { NextResponse } from 'next/server';
import axeCore from 'axe-core';
// Importações condicionais para lidar com Nuvem vs Local
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

// O Puppeteer padrão (local) é importado dinamicamente para não quebrar na Vercel
const localExecutablePath = process.platform === 'win32' 
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // Caminho comum no Windows
  : process.platform === 'linux'
  ? '/usr/bin/google-chrome'
  : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

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
  let browser;
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
    }

    // --- LÓGICA DE AMBIENTE (A Mágica Acontece Aqui) ---
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
      // CONFIGURAÇÃO DE NUVEM (VERCEL)
      // Carrega o Chromium leve necessário para Serverless
      browser = await puppeteerCore.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'),
        headless: chromium.headless,
      });
    } else {
      // CONFIGURAÇÃO LOCAL (SEU PC)
      // Tenta usar o puppeteer normal ou o puppeteer-core apontando para seu Chrome
      const puppeteer = await import('puppeteer').then(mod => mod.default);
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    
    const page = await browser.newPage();

    // Configurações de Viewport e User Agent
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Navegação Robusta
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });

    // Injeção do Axe-Core (Correção do module is not defined)
    await page.evaluate(() => {
      // @ts-ignore
      window.module = { exports: {} };
      // @ts-ignore
      window.exports = {};
      // @ts-ignore
      window.process = { env: {} };
    });

    await page.evaluate(axeCore.source);

    // Execução da Auditoria
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
      { error: 'Falha técnica ao analisar. Em produção, verifique os logs da Vercel.' }, 
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}