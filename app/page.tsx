"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { ScanForm } from './components/ScanForm';
import { ResultCard } from './components/ResultCard';

export interface Violation {
  id: string;
  impact: string;
  description: string;
  help: string;
}

export interface AuditResult {
  score: number;
  violations: Violation[];
}

const IrisReimagined = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    
    setScanning(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });

      if (!response.ok) throw new Error('Falha ao analisar o site.');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível acessar este site. Verifique a URL e tente novamente.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black transition-colors duration-500">
      
      {/* Header Container com Padding */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-8">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      {/* Main Centralizado com MUITO Respiro */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-center items-center py-20 md:py-32">
        
        {/* Bloco Hero + Input */}
        <div className={`transition-all duration-700 ease-out w-full max-w-4xl flex flex-col items-center gap-12 ${result ? 'mt-0' : 'mt-[-10vh]'}`}>
          
          {/* Títulos */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-4 animate-in fade-in zoom-in duration-500">
              <Sparkles size={14} className="text-blue-500 fill-blue-500/20" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Auditoria WCAG 2.2</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95] text-balance">
              Acessibilidade <br className="hidden md:block" />
              <span className="text-zinc-400 dark:text-zinc-600">Descomplicada.</span>
            </h1>
            
            {!result && (
              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Audite, aprenda e corrija. A ferramenta definitiva para designers e desenvolvedores inclusivos.
              </p>
            )}
          </div>

          {/* Scanner (Input) */}
          <div className="w-full max-w-2xl relative group z-10">
            {/* Sombra colorida sutil atrás */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <ScanForm 
              urlInput={urlInput} 
              setUrlInput={setUrlInput} 
              handleScan={handleScan} 
              scanning={scanning} 
            />
            
            {/* Mensagem de Erro */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center gap-3 shadow-sm animate-in slide-in-from-top-2">
                <AlertTriangle size={18} /> 
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}
          </div>

        </div>

        {/* Resultados (Separados visualmente) */}
        <div className="w-full mt-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <ResultCard result={result} scanning={scanning} />
        </div>

      </main>
    </div>
  );
};

export default IrisReimagined;