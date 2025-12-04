"use client";

import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Filter, Layers } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { knowledgeBase } from '../data/knowledge-base';

export default function DocsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Estado agora controla a Categoria selecionada, não um texto de busca
  const [activeCategory, setActiveCategory] = useState("Todos");

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  // 1. EXTRAÇÃO INTELIGENTE DE TAGS
  // O código olha para os dados e descobre quais categorias existem automaticamente.
  // Set(size) remove duplicatas.
  const categories = ["Todos", ...Array.from(new Set(knowledgeBase.map(item => item.category)))];

  // 2. LÓGICA DE FILTRAGEM
  const filteredDocs = activeCategory === "Todos" 
    ? knowledgeBase 
    : knowledgeBase.filter(doc => doc.category === activeCategory);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans p-4 md:p-8">
      
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4 animate-in slide-in-from-top-4 duration-500">
          <div>
            <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 mb-2 hover:underline">
              <ArrowLeft size={16} /> Voltar para Auditoria
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight">Biblioteca do Saber</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">
              Navegue por categorias e domine as diretrizes de acessibilidade.
            </p>
          </div>
        </div>

        {/* --- NOVA ÁREA DE TAGS (Smart Navigation) --- */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-2 pr-4">
            <Filter size={18} className="text-zinc-400" />
            <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider mr-2">Filtros:</span>
            
            {categories.map((cat) => {
              // Conta quantos itens existem nessa categoria para mostrar o número (UX de Referência)
              const count = cat === "Todos" 
                ? knowledgeBase.length 
                : knowledgeBase.filter(i => i.category === cat).length;

              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 border
                    ${isActive 
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white shadow-lg scale-105' 
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-zinc-800'}
                  `}
                >
                  {cat}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="group flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <doc.icon size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                    doc.impact === 'Crítico' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900' : 
                    doc.impact === 'Sério' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 border border-orange-100 dark:border-orange-900' :
                    'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900'
                  }`}>
                    {doc.impact}
                  </span>
                </div>

                <div className="mb-6">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                    <Layers size={12} /> {doc.category}
                  </span>
                  <h3 className="font-bold text-xl text-zinc-900 dark:text-white leading-tight mb-3">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {doc.why}
                  </p>
                </div>
              </div>

              {/* Footer do Card */}
              <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl">
                  <p className="text-xs font-bold text-green-600 dark:text-green-500 mb-1 flex items-center gap-1">
                    Solução Rápida
                  </p>
                  <code className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 block truncate" title={doc.fix}>
                    {doc.fix}
                  </code>
                </div>
                <div className="mt-4 flex justify-between items-center">
                   <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                    WCAG {doc.wcag}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Estado Vazio (Caso raro) */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <BookOpen size={48} className="mx-auto mb-4" />
            <p className="text-xl font-medium">Nenhum diretriz encontrada nesta categoria.</p>
          </div>
        )}

      </main>
    </div>
  );
}