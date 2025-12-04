"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Download, BookOpen, ChevronRight, 
  Eye, MousePointer, Brain, Shield, Menu, X, ArrowUp, 
  LayoutGrid 
} from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/Header';

export default function ReferencePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Lógica de Scroll (Spy & Progresso)
  useEffect(() => {
    const handleScroll = () => {
      // 1. Barra de Progresso
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // 2. Scroll Spy (Detectar seção ativa)
      const sections = ['intro', 'perceptivel', 'operavel', 'compreensivel', 'robusto', 'diversidade'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Considera ativo se estiver no topo ou meio da tela
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
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
    { id: 'intro', label: 'Introdução', icon: BookOpen },
    { id: 'perceptivel', label: '1. Perceptível', icon: Eye },
    { id: 'operavel', label: '2. Operável', icon: MousePointer },
    { id: 'compreensivel', label: '3. Compreensível', icon: Brain },
    { id: 'robusto', label: '4. Robusto', icon: Shield },
    { id: 'diversidade', label: 'Diversidade', icon: LayoutGrid },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans p-4 md:p-8 print:bg-white print:text-black print:p-0 relative">
      
      {/* BARRA DE PROGRESSO DE LEITURA (UX PREMIUM) */}
      <div className="fixed top-0 left-0 h-1.5 bg-blue-600 z-[60] transition-all duration-100 ease-out print:hidden" style={{ width: `${scrollProgress * 100}%` }} />

      <div className="print:hidden">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      {/* MENU MOBILE FLUTUANTE */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 print:hidden">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-black rounded-full font-bold shadow-2xl transition-all active:scale-95 border border-zinc-700 dark:border-zinc-200"
        >
          {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
          <span>Índice</span>
        </button>
      </div>

      {/* MODAL MENU MOBILE */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm animate-in fade-in" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute bottom-24 left-4 right-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-bottom-10">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeSection === item.id 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' 
                      : 'text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto mb-20">
        
        {/* NAV SUPERIOR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-in slide-in-from-top-4 duration-500 print:hidden">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 font-semibold transition-colors">
            <div className="p-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800 group-hover:bg-blue-100 transition-colors">
               <ArrowLeft size={14} />
            </div>
            Voltar
          </Link>
          
          <button 
            onClick={handlePrint}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg font-medium text-sm transition-all"
          >
            <Download size={16} />
            Salvar PDF
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* --- SIDEBAR DE NAVEGAÇÃO (Sticky & Clean) --- */}
          <aside className="hidden lg:block w-64 shrink-0 print:hidden">
            <nav className="sticky top-8 space-y-6">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 px-4">Capítulos</p>
                <div className="space-y-1 relative">
                  {/* Linha de conexão visual */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />
                  
                  {menuItems.map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`}
                      className={`group flex items-center justify-between px-4 py-2 text-sm rounded-r-lg transition-all duration-200 relative border-l-2 ${
                        activeSection === item.id 
                          ? 'border-blue-600 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' 
                          : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Precisa de ajuda?</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 leading-tight">
                  Baixe este guia completo para compartilhar com seu time.
                </p>
                <button 
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg font-bold text-xs shadow-lg transition-transform active:scale-95"
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </nav>
          </aside>

          {/* --- CONTEÚDO PRINCIPAL --- */}
          <article className="flex-1 min-w-0">
            
            {/* Header */}
            <header className="mb-20" id="intro">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold uppercase tracking-widest text-[10px] mb-6">
                Referência WCAG 2.2
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-8 leading-[1.1]">
                Design Universal <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Para Todos.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                Um guia definitivo sobre os <strong>4 Princípios Fundamentais (POUR)</strong> da acessibilidade web. Projetado para ser lido, entendido e aplicado.
              </p>
            </header>

            {/* SEÇÃO 1: PERCEPTÍVEL */}
            <section id="perceptivel" className="mb-24 scroll-mt-24 break-inside-avoid">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Eye size={28} />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">1. Perceptível</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Intro Card */}
                <div className="md:col-span-2 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 mb-4">
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    "A informação não pode ser invisível para todos os sentidos." <br/>
                    Se o usuário não consegue ver, ele deve conseguir ouvir. Se não consegue ouvir, deve conseguir ler.
                  </p>
                </div>

                {/* Diretriz Cards */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 block">1.1 Texto Alternativo</span>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Imagens e Gráficos</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Tudo que não for texto precisa de descrição. Use <code>alt=""</code> em imagens para que leitores de tela possam descrevê-las.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 block">1.3 Adaptável</span>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Estrutura Semântica</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Use HTML correto (H1, H2, Nav, Main). A informação deve fazer sentido mesmo se o CSS for desligado.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 block">1.4 Distinguível</span>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Contraste e Cor</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Não use apenas cor para informar erro. Garanta contraste de 4.5:1 entre texto e fundo.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: OPERÁVEL */}
            <section id="operavel" className="mb-24 scroll-mt-24 break-inside-avoid">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
                  <MousePointer size={28} />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">2. Operável</h2>
              </div>

              <div className="md:col-span-2 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 mb-8">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  "O usuário precisa conseguir interagir com a interface." <br/>
                  Seja via mouse, teclado, comando de voz ou toque. A navegação deve ser fluida.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 mb-2 block">2.1 Teclado</span>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Acesso Universal</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Tudo deve funcionar sem mouse. O usuário deve conseguir navegar (Tab) e ativar (Enter/Space) qualquer elemento.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 mb-2 block">2.4 Navegável</span>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Foco Visível</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Nunca remova o outline de foco. O usuário precisa saber onde está o cursor. Use títulos de página descritivos.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 3: COMPREENSÍVEL */}
            <section id="compreensivel" className="mb-24 scroll-mt-24 break-inside-avoid">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Brain size={28} />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">3. Compreensível</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-3 text-purple-600 dark:text-purple-400 font-bold">
                    <span className="text-2xl">3.1</span> Legível
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Defina o idioma (`lang="pt-BR"`). Evite jargões. Explique abreviações.
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-3 text-purple-600 dark:text-purple-400 font-bold">
                    <span className="text-2xl">3.2</span> Previsível
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Ao receber foco, nada deve mudar de lugar drasticamente. Mantenha a navegação consistente.
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-3 text-purple-600 dark:text-purple-400 font-bold">
                    <span className="text-2xl">3.3</span> Assistência
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Identifique erros de formulário em texto claro e sugira como corrigir.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 4: ROBUSTO */}
            <section id="robusto" className="mb-24 scroll-mt-24 break-inside-avoid">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Shield size={28} />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">4. Robusto</h2>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-3xl border border-amber-100 dark:border-amber-900/30">
                <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-4">Compatibilidade Máxima</h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  Seu código deve ser limpo e válido para funcionar em navegadores antigos, novos e tecnologias assistivas futuras.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white dark:bg-black rounded-lg text-xs font-mono border border-zinc-200 dark:border-zinc-800 text-zinc-500">&lt;HTML Válido&gt;</span>
                  <span className="px-3 py-1 bg-white dark:bg-black rounded-lg text-xs font-mono border border-zinc-200 dark:border-zinc-800 text-zinc-500">ARIA Correto</span>
                  <span className="px-3 py-1 bg-white dark:bg-black rounded-lg text-xs font-mono border border-zinc-200 dark:border-zinc-800 text-zinc-500">IDs Únicos</span>
                </div>
              </div>
            </section>

            {/* SEÇÃO 5: DIVERSIDADE (VISUAL PREMIUM) */}
            <section id="diversidade" className="mb-12 scroll-mt-24 break-inside-avoid">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl">
                  <LayoutGrid size={28} />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">O Espectro da Inclusão</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Permanente */}
                <div className="group bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-sm">
                  <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-300 font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    P
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Permanente</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Pessoas que vivem com deficiências contínuas. <br/>
                    <span className="italic opacity-70">Ex: Cegueira, Surdez, Paralisia.</span>
                  </p>
                </div>

                {/* Temporária */}
                <div className="group bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-sm">
                  <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-300 font-bold group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                    T
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Temporária</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Situações de curto prazo ou recuperação. <br/>
                    <span className="italic opacity-70">Ex: Braço quebrado, Catarata, Infecção.</span>
                  </p>
                </div>

                {/* Situacional */}
                <div className="group bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-sm">
                  <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-300 font-bold group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                    S
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">Situacional</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Limitações causadas pelo ambiente. <br/>
                    <span className="italic opacity-70">Ex: Luz do sol forte, Segurando bebê, Barulho.</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800 text-center print:mt-10">
              <p className="font-bold text-zinc-900 dark:text-white mb-2">Iris Acessibilidade</p>
              <p className="text-sm text-zinc-500">
                Documento gerado para fins educacionais e de referência técnica.
              </p>
            </footer>

          </article>
        </div>

        {/* Back to Top Mobile */}
        <button 
          onClick={scrollToTop}
          className="lg:hidden fixed bottom-8 right-8 p-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-2xl z-50 transition-transform hover:-translate-y-1"
        >
          <ArrowUp size={20} />
        </button>

      </main>
    </div>
  );
}