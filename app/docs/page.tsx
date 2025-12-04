"use client";

import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Filter, Layers, Search } from 'lucide-react';
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500 font-sans pb-32">
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Cabeçalho com muito espaço */}
        <div className="py-20 max-w-3xl">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Voltar para Auditoria
          </Link>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[0.9]">
            Biblioteca.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
            Diretrizes de acessibilidade explicadas. Sem "tecniquês", com foco em solução.
          </p>
        </div>

        {/* Filtros (Ilha Flutuante) */}
        <div className="sticky top-8 z-30 mb-16">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 p-2 rounded-2xl shadow-2xl shadow-zinc-200/20 dark:shadow-black/50 inline-flex items-center gap-2 max-w-full overflow-x-auto scrollbar-hide">
            
            <div className="flex items-center gap-2 px-4 text-xs font-bold uppercase tracking-widest text-zinc-400 shrink-0 border-r border-zinc-200 dark:border-zinc-800 h-8 mr-2">
              <Filter size={14} />
              Filtrar
            </div>

            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300
                    ${isActive 
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-md' 
                      : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 hover:text-zinc-900'}
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Bento (Espaçoso) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="group flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 rounded-[2.5rem] hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative">
              
              <div className="mb-8 flex justify-between items-start">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <doc.icon size={32} strokeWidth={1.5} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  doc.impact === 'Crítico' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30' : 
                  'bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30'
                }`}>
                  {doc.impact}
                </span>
              </div>

              <div className="flex-1">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 block flex items-center gap-2">
                  <Layers size={12} /> {doc.category}
                </span>
                
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                  {doc.title}
                </h3>
                
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                  {doc.why}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Como Resolver</p>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50 font-mono text-xs text-zinc-600 dark:text-zinc-300 break-words">
                  {doc.fix}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 opacity-50">
            <Search size={48} className="text-zinc-300 dark:text-zinc-700 mb-4" strokeWidth={1} />
            <p className="text-xl font-bold text-zinc-900 dark:text-white">Nenhum item encontrado.</p>
          </div>
        )}

      </main>
    </div>
  );
}