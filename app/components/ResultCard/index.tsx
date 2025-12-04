import React from 'react';
import { Activity, Check, AlertCircle, Zap, Heart, Wrench, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* 1. O PLACAR (SCORE) */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-zinc-400 dark:text-zinc-500 font-bold text-xs uppercase tracking-widest mb-3">Health Score</p>
          {scanning ? (
            <div className="h-24 w-48 bg-zinc-100 dark:bg-zinc-800 rounded-2xl animate-pulse"></div>
          ) : (
            <>
              <div className="flex items-baseline gap-1">
                <span className={`text-8xl sm:text-9xl font-black tracking-tighter leading-none ${result!.score >= 80 ? 'text-green-500' : result!.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {result?.score}
                </span>
                <span className="text-2xl text-zinc-300 dark:text-zinc-700 font-bold">/100</span>
              </div>
              <div className="mt-6 flex items-center gap-3">
                {result!.score === 100 ? (
                  <span className="inline-flex items-center gap-2 text-green-700 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 px-4 py-2 rounded-full text-sm font-bold">
                    <Check size={16} strokeWidth={3} /> Perfeito
                  </span>
                ) : (
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
                    {result!.violations.length} {result!.violations.length === 1 ? 'correção necessária' : 'correções necessárias'}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        <div className="absolute right-0 bottom-0 opacity-5 dark:opacity-[0.02] transform translate-x-1/4 translate-y-1/4 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
           <Activity size={300} />
        </div>
      </div>

      {/* 2. CARD DE STATUS RÁPIDO */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-blue-600/20 dark:shadow-none flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="p-3.5 bg-white/10 w-fit rounded-2xl backdrop-blur-md border border-white/10 mb-6">
              <Zap size={24} fill="currentColor" className="text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2">Veredito</p>
              <p className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight">
                  {scanning ? 'Analisando...' : result?.score === 100 ? 'Referência!' : result?.score! >= 80 ? 'Excelente' : 'Requer Atenção'}
              </p>
              <div className="w-12 h-1 bg-white/20 rounded-full mt-6 mb-4"></div>
              <p className="text-blue-50 text-sm font-medium opacity-90 leading-relaxed">
                  Baseado nas diretrizes globais WCAG 2.2 Level AA.
              </p>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl opacity-60 translate-x-20 -translate-y-20 pointer-events-none"></div>
      </div>

      {/* 3. RELATÓRIO CONSULTIVO */}
      {!scanning && result && result.violations.length > 0 && (
        <div className="lg:col-span-3 mt-8">
          <div className="flex items-center gap-4 mb-10 px-2">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl">
                <BookOpen size={24} strokeWidth={2} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Plano de Ação</h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">Priorize as correções baseadas no impacto humano.</p>
            </div>
          </div>

          <div className="grid gap-6">
            {result.violations.map((v, i) => {
              const doc = knowledgeBase.find(k => k.id === v.id);
              const title = doc ? doc.title : v.help;
              const explanation = doc ? doc.why : v.description;
              const fix = doc ? doc.fix : 'Consulte a documentação técnica.';
              const Icon = doc ? doc.icon : AlertCircle;

              return (
                <div key={i} className="group bg-white dark:bg-zinc-900 rounded-3xl p-1 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50">
                  <div className="p-6 sm:p-8">
                    
                    {/* Header do Item */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${
                          v.impact === 'critical' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
                          v.impact === 'serious' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                          'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                              v.impact === 'critical' ? 'border-red-100 text-red-600 dark:border-red-900/30' : 
                              v.impact === 'serious' ? 'border-orange-100 text-orange-600 dark:border-orange-900/30' : 
                              'border-yellow-100 text-yellow-600 dark:border-yellow-900/30'
                            }`}>
                              {v.impact === 'critical' ? 'Crítico' : v.impact === 'serious' ? 'Sério' : 'Moderado'}
                            </span>
                            {doc && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                {doc.category}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                            {title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                      {/* Problema */}
                      <div className="space-y-3">
                          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                              <Heart size={14} /> Impacto Humano
                          </p>
                          <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                              {explanation}
                          </p>
                      </div>

                      {/* Solução */}
                      <div className="bg-zinc-50 dark:bg-black/40 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800/50">
                          <p className="text-xs font-bold text-green-600 dark:text-green-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                              <Wrench size={14} /> Correção Técnica
                          </p>
                          <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                              {fix}
                          </p>
                          <div className="flex justify-end">
                            <Link href="/docs" className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                              Biblioteca <ArrowRight size={10} />
                            </Link>
                          </div>
                      </div>
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