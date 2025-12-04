import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import axeCore from 'axe-core';

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

    // 1. Inicia o navegador (Headless)
    browser = await puppeteer.launch({ 
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ] 
    });
    
    const page = await browser.newPage();

    // 2. Define tamanho de tela real e User Agent (Disfarce para não ser bloqueado)
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // 3. Navega até a URL (Timeout aumentado para 60s)
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });

    // 4. --- A CORREÇÃO DO ERRO "MODULE IS NOT DEFINED" ---
    // Injetamos variáveis falsas para o axe-core achar que está num ambiente compatível
    await page.evaluate(() => {
      // @ts-ignore
      window.module = { exports: {} };
      // @ts-ignore
      window.exports = {};
      // @ts-ignore
      window.process = { env: {} };
    });

    // 5. Injeta o axe-core
    await page.evaluate(axeCore.source);

    // 6. Executa a auditoria
    const results = await page.evaluate(async () => {
      // @ts-ignore
      return await axe.run({
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      });
    });

    // 7. Calcula o Score
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
      { error: 'Falha técnica ao analisar. Tente outro site ou verifique o terminal.' }, 
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}