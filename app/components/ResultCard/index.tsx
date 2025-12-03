import React from 'react';
import { Activity, Check, AlertCircle, Zap } from 'lucide-react';

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
  // Se não tem resultado e não está escaneando, não mostre nada
  if (!result && !scanning) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 mt-12">
      
      {/* 1. O PLACAR (SCORE) */}
      <div className="md:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-zinc-500 font-medium mb-1">Nota de Acessibilidade</p>
          {scanning ? (
            <div className="h-16 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className={`text-7xl font-black tracking-tighter ${result!.score >= 80 ? 'text-green-500' : result!.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {result?.score}
                </span>
                <span className="text-xl text-zinc-400 font-bold">/100</span>
              </div>
              <p className="mt-4 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                {result!.score === 100 ? (
                  <span className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
                    <Check size={14} strokeWidth={3} /> Site Acessível!
                  </span>
                ) : (
                  <span>Encontramos {result!.violations.length} correções prioritárias.</span>
                )}
              </p>
            </>
          )}
        </div>
        <Activity size={120} className="absolute -right-6 -bottom-6 text-zinc-100 dark:text-zinc-800 rotate-12" />
      </div>

      {/* 2. CARD DE STATUS RÁPIDO */}
      <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-600/20 flex flex-col justify-between">
        <div className="p-3 bg-white/20 w-fit rounded-xl backdrop-blur-sm">
          <Zap size={24} fill="currentColor" />
        </div>
        <div>
          <p className="text-blue-100 text-sm font-medium mb-1">Status da Auditoria</p>
          <p className="text-2xl font-bold">
            {scanning ? 'Analisando...' : result?.score === 100 ? 'Excelente' : 'Requer Atenção'}
          </p>
          <p className="text-blue-200 text-xs mt-2 opacity-80">Baseado nas diretrizes WCAG 2.2</p>
        </div>
      </div>

      {/* 3. LISTA DETALHADA */}
      {!scanning && result && result.violations.length > 0 && (
        <div className="md:col-span-3 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="text-red-500" />
            Relatório Técnico
          </h3>
          <div className="space-y-3">
            {result.violations.map((v, i) => (
              <div key={i} className="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      v.impact === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                      v.impact === 'serious' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {v.impact}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">{v.id}</span>
                  </div>
                </div>
                <p className="font-semibold text-lg text-zinc-800 dark:text-zinc-200 mb-1">{v.help}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};