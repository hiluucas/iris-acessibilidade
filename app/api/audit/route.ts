import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import axeCore from 'axe-core';

// Definindo a interface da resposta para Type Safety
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
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
    }

    // 1. Inicia o navegador invisível (Headless Chrome)
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 2. Navega até a URL alvo
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 3. Injeta o axe-core na página
    // Isso permite que o script de auditoria rode "dentro" do site visitado
    await page.evaluate(axeCore.source);

    // 4. Executa a análise WCAG 2.2 (níveis A e AA)
    const results = await page.evaluate(async () => {
      // @ts-ignore
      return await axe.run({
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      });
    });

    await browser.close();

    // 5. Calcula um "Iris Score" simplificado (100 - penalidades)
    // Cada violação crítica tira mais pontos
    let penalty = 0;
    results.violations.forEach((v: any) => {
      if (v.impact === 'critical') penalty += 5;
      if (v.impact === 'serious') penalty += 3;
      if (v.impact === 'moderate') penalty += 1;
    });
    const score = Math.max(0, 100 - penalty);

    // 6. Retorna o JSON limpo
    const auditData: AuditResult = {
      url,
      timestamp: new Date().toISOString(),
      violations: results.violations,
      score,
    };

    return NextResponse.json(auditData);

  } catch (error) {
    console.error('Erro na auditoria:', error);
    return NextResponse.json(
      { error: 'Falha ao analisar a URL. Verifique se o endereço está correto.' }, 
      { status: 500 }
    );
  }
}