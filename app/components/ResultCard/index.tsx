import React from 'react';
import { Activity, Check, AlertCircle, Zap, Heart, Wrench, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
// Importamos a "Célebro" do projeto para não ter dados duplicados
import { knowledgeBase } from '../../data/knowledge-base';

interface Violation {
  id: string;
  impact: string;
  description: string;
  help: string;
}

interface AuditResult {
  score: number;
  violations: Violation[];
}

interface ResultCardProps {
  result: AuditResult | null;
  scanning: boolean;
}

export const ResultCard = ({ result, scanning }: ResultCardProps) => {
  if (!result && !scanning) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 mt-12 pb-20">
      
      {/* 1. O PLACAR (SCORE) */}
      <div className="md:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl flex items-center justify-between relative overflow-hidden transition-colors">
        <div className="relative z-10">
          <p className="text-zinc-500 font-medium mb-1">Nota Iris</p>
          {scanning ? (
            <div className="h-16 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className={`text-8xl font-black tracking-tighter ${result!.score >= 80 ? 'text-green-500' : result!.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {result?.score}
                </span>
                <span className="text-2xl text-zinc-400 font-bold">/100</span>
              </div>
              <p className="mt-4 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium text-lg">
                {result!.score === 100 ? (
                  <span className="flex items-center gap-2 text-green-700 bg-green-100 dark:bg-green-900/30 px-4 py-1.5 rounded-full">
                    <Check size={18} strokeWidth={3} /> Site Inclusivo! Parabéns.
                  </span>
                ) : (
                  <span>Encontramos {result!.violations.length} pontos de melhoria.</span>
                )}
              </p>
            </>
          )}
        </div>
        <Activity size={140} className="absolute -right-8 -bottom-8 text-zinc-100 dark:text-zinc-800 rotate-12" />
      </div>

      {/* 2. CARD DE STATUS RÁPIDO */}
      <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-600/20 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
            <div className="p-3 bg-white/20 w-fit rounded-xl backdrop-blur-sm mb-4">
              <Zap size={28} fill="currentColor" />
            </div>
            <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Veredito</p>
            <p className="text-3xl font-bold leading-tight">
                {scanning ? 'Analisando...' : result?.score === 100 ? 'Referência!' : result?.score! >= 80 ? 'Muito Bom' : 'Precisa de Ajustes'}
            </p>
            <p className="text-blue-200 text-sm mt-3 opacity-90">
                Seguindo diretrizes WCAG 2.2 (Padrão Mundial).
            </p>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-50 translate-x-10 -translate-y-10"></div>
      </div>

      {/* 3. RELATÓRIO CONSULTIVO (CONECTADO À BIBLIOTECA) */}
      {!scanning && result && result.violations.length > 0 && (
        <div className="md:col-span-3 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 transition-colors">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-xl">
                <BookOpen size={24} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Consultoria Técnica</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Entenda o impacto humano e como corrigir o código.</p>
            </div>
          </div>

          <div className="space-y-6">
            {result.violations.map((v, i) => {
              // AQUI ESTÁ A MÁGICA: Buscamos a explicação direto da sua Biblioteca
              const doc = knowledgeBase.find(k => k.id === v.id);
              
              // Fallback: Se não acharmos na biblioteca, usamos o texto do próprio erro
              const title = doc ? doc.title : v.help;
              const explanation = doc ? doc.why : v.description;
              const fix = doc ? doc.fix : 'Consulte a documentação técnica.';
              const Icon = doc ? doc.icon : AlertCircle;

              return (
                <div key={i} className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all shadow-sm hover:shadow-md">
                  
                  {/* Cabeçalho do Card */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        v.impact === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                        v.impact === 'serious' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                        {v.impact === 'critical' ? 'Crítico' : v.impact === 'serious' ? 'Sério' : 'Moderado'}
                        </span>
                        
                        {/* Se temos documento, mostramos a categoria */}
                        {doc && (
                          <span className="font-bold text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                             • {doc.category}
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Título com Ícone Dinâmico */}
                  <h4 className="font-bold text-xl text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <div className="p-1.5 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-zinc-500">
                      <Icon size={20} />
                    </div>
                    {title}
                  </h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Coluna 1: Impacto Humano */}
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                            <Heart size={16} /> Impacto Humano
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {explanation}
                        </p>
                    </div>

                    {/* Coluna 2: Como Corrigir */}
                    <div className="bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-bold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                              <Wrench size={16} /> Como Corrigir
                          </p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-mono mb-3">
                              {fix}
                          </p>
                        </div>
                        
                        {/* Botão para levar à biblioteca (O Pulo do Gato) */}
                        <Link href="/docs" className="text-xs font-bold text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors self-end">
                          Ver detalhes na biblioteca <ArrowRight size={12} />
                        </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};