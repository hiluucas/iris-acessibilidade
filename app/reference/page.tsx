"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Eye, MousePointer, Brain, Shield, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header';

export default function ReferencePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'perceptivel', 'operavel', 'compreensivel', 'robusto'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'intro', label: 'Introdução' },
    { id: 'perceptivel', label: '1. Perceptível' },
    { id: 'operavel', label: '2. Operável' },
    { id: 'compreensivel', label: '3. Compreensível' },
    { id: 'robusto', label: '4. Robusto' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-500 print:bg-white print:text-black">
      
      <div className="print:hidden">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-8 pb-32 flex flex-col lg:flex-row gap-20 mt-12">
        
        {/* STICKY NAV (Minimalista) */}
        <aside className="hidden lg:block w-64 shrink-0 print:hidden h-fit sticky top-32">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-12 transition-colors">
            <ArrowLeft size={16} /> Voltar
          </Link>
          
          <nav className="space-y-4 border-l border-zinc-200 dark:border-zinc-800 ml-2">
            {menuItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={`block pl-6 text-sm transition-all duration-300 border-l -ml-px ${
                  activeSection === item.id 
                    ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-bold' 
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button 
            onClick={handlePrint}
            className="mt-12 flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest"
          >
            <Download size={14} /> Download PDF
          </button>
        </aside>

        {/* CONTEÚDO PRINCIPAL (Tipografia Otimizada) */}
        <article className="flex-1 max-w-3xl">
          
          {/* Mobile Back */}
          <div className="lg:hidden mb-12 print:hidden">
            <Link href="/" className="flex items-center gap-2 text-sm font-bold text-zinc-500">
              <ArrowLeft size={16} /> Voltar
            </Link>
          </div>

          <header id="intro" className="mb-24">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4 block">Manual de Referência v2.2</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[0.95]">
              Inclusão <br/>Digital.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
              Um guia essencial sobre os princípios da acessibilidade web, projetado para ser lido por humanos.
            </p>
          </header>

          <div className="space-y-32">
            
            {/* Seção 1 */}
            <section id="perceptivel" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-900 dark:text-white">
                  <Eye size={32} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">Perceptível</h2>
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-12 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
                A informação não pode ser invisível aos sentidos. Se o usuário não pode ver, deve poder ouvir. Se não pode ouvir, deve poder ler.
              </p>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">1.1 Texto Alternativo</h3>
                  <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Todo conteúdo visual que transmite informação deve ter uma alternativa em texto. Isso permite que leitores de tela descrevam imagens para usuários cegos.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">1.3 Adaptável</h3>
                  <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Crie conteúdo que possa ser apresentado de diferentes formas (como um layout simplificado) sem perder informação ou estrutura. Use HTML semântico.
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 2 */}
            <section id="operavel" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-900 dark:text-white">
                  <MousePointer size={32} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">Operável</h2>
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-12 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
                A interface não pode exigir uma interação que o usuário não consegue realizar (ex: exigir mouse).
              </p>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">2.1 Teclado</h3>
                  <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Toda a funcionalidade deve estar disponível a partir de um teclado. O usuário deve conseguir navegar e interagir sem o uso do mouse.
                  </p>
                </div>
              </div>
            </section>

             {/* Seção 3 */}
             <section id="compreensivel" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-900 dark:text-white">
                  <Brain size={32} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">Compreensível</h2>
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-12 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
                A operação da interface deve ser clara e a linguagem deve ser acessível.
              </p>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">3.2 Previsível</h3>
                  <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    As páginas devem operar de maneira previsível. Nada deve mudar de contexto inesperadamente apenas ao receber foco.
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 4 */}
            <section id="robusto" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-900 dark:text-white">
                  <Shield size={32} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">Robusto</h2>
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-12 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
                O código deve ser limpo e compatível com tecnologias atuais e futuras.
              </p>
            </section>

          </div>

          <footer className="mt-32 pt-12 border-t border-zinc-200 dark:border-zinc-800 print:hidden">
            <p className="text-sm text-zinc-400 font-medium">
              © 2024 Iris Open Source. <br className="md:hidden"/> Baseado na documentação oficial W3C/WAI.
            </p>
          </footer>

        </article>

        <button 
          onClick={scrollToTop}
          className="lg:hidden fixed bottom-8 right-8 p-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-2xl z-50"
        >
          <ArrowUp size={20} />
        </button>

      </main>
    </div>
  );
}