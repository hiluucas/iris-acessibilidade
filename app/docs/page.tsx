"use client";

import React, { useState } from 'react';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { knowledgeBase } from '../data/knowledge-base';

export default function DocsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTheme = () => {
    // Lógica simples de tema para esta página
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  // Lógica de Filtro (Busca Inteligente)
  const filteredDocs = knowledgeBase.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.why.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen transition-colors duration-500 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans p-4 md:p-8">
      
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabeçalho da Página */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-in slide-in-from-top-4 duration-500">
          <div>
            <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 mb-2 hover:underline">
              <ArrowLeft size={16} /> Voltar para Auditoria
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight">Biblioteca do Saber</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Explore as diretrizes de acessibilidade e aprenda a criar uma web para todos.
            </p>
          </div>
        </div>

        {/* Barra de Busca */}
        <div className="relative group max-w-2xl">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="O que você quer aprender? (ex: contraste, imagem, botão)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none shadow-sm"
          />
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                    <doc.icon size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">{doc.category}</span>
                    <h3 className="font-bold text-lg leading-tight">{doc.title}</h3>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  doc.impact === 'Crítico' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                  doc.impact === 'Sério' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {doc.impact}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">Por que importa?</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {doc.why}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm font-bold text-green-600 dark:text-green-400 mb-1 flex items-center gap-2">
                    Como corrigir
                  </p>
                  <code className="block bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-300 overflow-x-auto">
                    {doc.fix}
                  </code>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                    WCAG {doc.wcag}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Estado Vazio (Zero Results) */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <BookOpen size={48} className="mx-auto mb-4" />
            <p className="text-xl font-medium">Nenhum diretriz encontrada para "{searchTerm}"</p>
            <p>Tente buscar por termos como "cor", "texto" ou "form".</p>
          </div>
        )}

      </main>
    </div>
  );
}