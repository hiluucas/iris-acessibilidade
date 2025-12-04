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
      setError("Não conseguimos acessar esse site. Verifique a URL e tente novamente.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-blue-500/30">
      
      {/* Background Grid Pattern (Sutil e Moderno) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Gradiente de Luz (Ambient Glow) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 p-6 md:p-12 max-w-5xl mx-auto">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <main className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Hero Section Refinado */}
          <div className="text-center space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 border border-blue-100 dark:border-blue-900/50">
              <Sparkles size={12} />
              Auditoria WCAG 2.2
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Torne a web <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 animate-gradient">
                universalmente acessível.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Diagnóstico profissional, didático e instantâneo para elevar a qualidade do seu produto digital.
            </p>
          </div>

          {/* Componente de Formulário (Elevated) */}
          <div className="w-full max-w-2xl">
            <ScanForm 
              urlInput={urlInput} 
              setUrlInput={setUrlInput} 
              handleScan={handleScan} 
              scanning={scanning} 
            />
          </div>

          {/* Feedback de Erro */}
          {error && (
            <div className="w-full max-w-2xl p-4 bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-sm animate-in zoom-in duration-300">
              <AlertTriangle size={18} /> 
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}

          {/* Resultado */}
          <div className="w-full">
            <ResultCard result={result} scanning={scanning} />
          </div>

        </main>
      </div>
    </div>
  );
};

export default IrisReimagined;