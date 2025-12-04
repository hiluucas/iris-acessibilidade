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
    <div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
        
        {/* Page Header */}
        <div className="pt-12 pb-16 md:pt-20 md:pb-24">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Voltar
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6">
            Biblioteca.
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Uma coleção curada de diretrizes de acessibilidade para designers e desenvolvedores modernos.
          </p>
        </div>

        {/* Filter Tabs - Clean Style */}
        <div className="sticky top-0 z-20 bg-zinc-50/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 mb-12 -mx-6 px-6 md:-mx-8 md:px-8 pt-4">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    relative text-sm font-bold whitespace-nowrap transition-colors duration-200
                    ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}
                  `}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute -bottom-4 left-0 w-full h-0.5 bg-zinc-900 dark:bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="group flex flex-col h-full">
              
              <div className="mb-6 relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 p-8 transition-colors duration-300 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    doc.impact === 'Crítico' ? 'border-red-200 text-red-600 dark:border-red-900 dark:text-red-400' : 
                    'border-amber-200 text-amber-600 dark:border-amber-900 dark:text-amber-400'
                  }`}>
                    {doc.impact}
                  </span>
                </div>
                <div className="text-zinc-900 dark:text-white transition-transform duration-300 group-hover:scale-110 origin-center">
                  <doc.icon size={40} strokeWidth={1.5} />
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  <Layers size={12} />
                  {doc.category}
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-zinc-200 dark:decoration-zinc-700">
                  {doc.title}
                </h3>
                
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 flex-1">
                  {doc.why}
                </p>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Solução</p>
                  <code className="text-xs font-mono text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 px-3 py-2 rounded-lg block w-full truncate">
                    {doc.fix}
                  </code>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="py-32 text-center opacity-50">
            <BookOpen size={48} className="mx-auto mb-4 text-zinc-300 dark:text-zinc-700" strokeWidth={1} />
            <p className="text-lg font-medium text-zinc-900 dark:text-white">Nenhum conteúdo encontrado.</p>
          </div>
        )}

      </main>
    </div>
  );
}