import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Search, 
  Sun, 
  Moon, 
  ArrowRight, 
  Activity, 
  LayoutGrid, 
  Settings, 
  Check,
  Zap,
  Smartphone,
  Globe
} from 'lucide-react';

/**
 * --- DICA DO CTO PARA O DESENVOLVEDOR (VOCÊ!) ---
 * * Como funciona o Dark/Light Mode aqui?
 * Usamos o Tailwind CSS. Note as classes que começam com "dark:".
 * Exemplo: `bg-white dark:bg-zinc-900`
 * Tradução: "No modo claro, o fundo é branco. Se o modo escuro estiver ativo, o fundo vira zinco escuro."
 */

const IrisReimagined = () => {
  // Estado para controlar o tema (começa como falso = Light Mode)
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Estado para simular o scan
  const [scanning, setScanning] = useState(false);
  const [score, setScore] = useState(null);

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Simulação de Scan (Backend Fake)
  const handleScan = (e) => {
    e.preventDefault();
    setScanning(true);
    setScore(null); // Reseta score anterior
    
    // Simula 2 segundos de processamento
    setTimeout(() => {
      setScanning(false);
      setScore(85); // Retorna um score fictício
    }, 2000);
  };

  return (
    // O segredo do tema está nesta div pai: se 'isDarkMode' for true, adicionamos a classe 'dark'
    <div className={isDarkMode ? 'dark' : ''}>
      
      {/* FUNDO DA PÁGINA 
        bg-zinc-50 = Cor de papel suave (confortável para leitura)
        dark:bg-black = Preto total para telas OLED (economia de bateria e descanso visual)
      */}
      <div className="min-h-screen transition-colors duration-500 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans p-4 md:p-8">

        {/* --- CABEÇALHO FLUTUANTE --- */}
        <header className="flex justify-between items-center max-w-6xl mx-auto mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Eye size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Iris.</span>
          </div>

          {/* Botão de Tema (Toggle) */}
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-transform"
            aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
        </header>

        {/* --- ÁREA PRINCIPAL (Layout Centralizado) --- */}
        <main className="max-w-4xl mx-auto space-y-8">
          
          {/* 1. O HERO (Título e Promessa) */}
          <div className="text-center space-y-4 py-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold tracking-wide mb-4">
              ✨ Nova Versão 2.0
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Acessibilidade <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">descomplicada.</span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Nós traduzimos as regras complexas da WCAG em ações simples para o seu time de desenvolvimento.
            </p>
          </div>

          {/* 2. O SCANNER (A Ferramenta Principal) */}
          {/* Efeito de vidro (Glassmorphism) adaptado para Light/Dark */}
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-2 rounded-3xl shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 transition-all duration-500">
            <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors">
                  <Search size={22} />
                </div>
                <input 
                  type="url" 
                  placeholder="Cole seu site aqui (ex: www.minhaloja.com)" 
                  className="w-full h-16 pl-14 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border-none text-lg text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={scanning}
                className="h-16 px-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {scanning ? 'Analisando...' : 'Auditar'} 
                {!scanning && <ArrowRight size={20} />}
              </button>
            </form>
          </div>

          {/* 3. RESULTADO DINÂMICO (Bento Grid Layout) */}
          {/* Só aparece se tivermos um score ou estiver escaneando */}
          {(score || scanning) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* CARD 1: O Score (Grande destaque) */}
              <div className="md:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-zinc-500 font-medium mb-1">Saúde do Site</p>
                  {scanning ? (
                    <div className="h-16 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-7xl font-black tracking-tighter">{score}</span>
                      <span className="text-xl text-zinc-400 font-bold">/100</span>
                    </div>
                  )}
                  <p className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full w-fit text-sm">
                    <Check size={14} strokeWidth={3} /> Bom Trabalho
                  </p>
                </div>
                {/* Elemento decorativo de fundo */}
                <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-50 dark:from-blue-900/20 to-transparent pointer-events-none"></div>
                <Activity size={120} className="absolute -right-6 -bottom-6 text-zinc-100 dark:text-zinc-800 rotate-12" />
              </div>

              {/* CARD 2: Quick Stats */}
              <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-600/20 flex flex-col justify-between">
                <div className="p-3 bg-white/20 w-fit rounded-xl backdrop-blur-sm">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Performance</p>
                  <p className="text-4xl font-bold">0.8s</p>
                  <p className="text-blue-200 text-xs mt-2">Carregamento rápido (LCP)</p>
                </div>
              </div>

              {/* CARD 3: Simulação Mobile */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center gap-4 group cursor-pointer hover:border-blue-500 transition-colors">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mobile Friendly</h3>
                  <p className="text-zinc-500 text-sm">Áreas de toque adequadas.</p>
                </div>
              </div>

              {/* CARD 4: Screen Reader */}
              <div className="md:col-span-2 bg-zinc-900 dark:bg-zinc-800 text-white p-6 rounded-3xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-zinc-800 dark:bg-zinc-950 rounded-2xl">
                     <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Teste de Leitor de Tela</h3>
                    <p className="text-zinc-400 text-sm">Simular VoiceOver / NVDA</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <ArrowRight size={20} />
                </div>
              </div>

            </div>
          )}

          {/* 4. FOOTER DIDÁTICO */}
          {!score && !scanning && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 opacity-50">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-pulse"></div>
               ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default IrisReimagined;