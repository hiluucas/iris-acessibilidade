"use client";

import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Filter, Layers } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { knowledgeBase } from '../data/knowledge-base';

export default function DocsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const categories = ["Todos", ...Array.from(new Set(knowledgeBase.map(item => item.category)))];

  const filteredDocs = activeCategory === "Todos" 
    ? knowledgeBase 
    : knowledgeBase.filter(doc => doc.category === activeCategory);

  return (
    <div className="min-h-screen relative bg-zinc-50 dark:bg-black transition-colors duration-500">
      
      {/* Detalhe de Fundo */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <main className="space-y-16 mt-12">
          
          {/* Header da Página */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors w-fit group">
              <div className="p-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:border-blue-200 dark:group-hover:border-blue-900 transition-colors">
                 <ArrowLeft size={14} />
              </div>
              Voltar para Auditoria
            </Link>
            
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
                Biblioteca do Saber
              </h1>
              <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Explore nossa enciclopédia de diretrizes. Conhecimento técnico e prático para designers e desenvolvedores.
              </p>
            </div>
          </div>

          {/* Filtros Inteligentes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-600 px-1">
              <Filter size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Filtrar Conteúdo</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {categories.map((cat) => {
                const count = cat === "Todos" ? knowledgeBase.length : knowledgeBase.filter(i => i.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      relative flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                      ${isActive 
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white shadow-lg scale-105 z-10' 
                        : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800'}
                    `}
                  >
                    {cat}
                    <span className={`flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid de Cards (Consistência Visual) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="group flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                
                {/* Header do Card */}
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <doc.icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      doc.impact === 'Crítico' ? 'text-red-600 border-red-100 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30' : 
                      doc.impact === 'Sério' ? 'text-orange-600 border-orange-100 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-900/30' :
                      'text-yellow-600 border-yellow-100 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900/30'
                    }`}>
                      {doc.impact}
                    </span>
                  </div>

                  <div className="mb-6">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block flex items-center gap-1.5">
                      <Layers size={12} /> {doc.category}
                    </span>
                    <h3 className="font-bold text-2xl text-zinc-900 dark:text-white leading-tight mb-3">
                      {doc.title}
                    </h3>
                    <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {doc.why}
                    </p>
                  </div>
                </div>

                {/* Footer Técnico */}
                <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                    <p className="text-[10px] font-bold text-green-600 dark:text-green-500 mb-2 uppercase tracking-wider">
                      Solução
                    </p>
                    <code className="text-xs font-mono text-zinc-600 dark:text-zinc-400 block line-clamp-2" title={doc.fix}>
                      {doc.fix}
                    </code>
                  </div>
                  <div className="mt-4 flex justify-end">
                     <span className="text-[10px] font-bold text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-md">
                      WCAG {doc.wcag}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {filteredDocs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 opacity-50">
              <BookOpen size={48} className="text-zinc-300 dark:text-zinc-700 mb-4" />
              <p className="text-xl font-bold text-zinc-900 dark:text-white">Nada encontrado.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}