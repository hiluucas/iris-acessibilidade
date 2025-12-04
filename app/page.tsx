"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

// Importando nossos componentes
import { Header } from './components/Header/index';
import { ScanForm } from './components/ScanForm/index';
import { ResultCard } from './components/ResultCard/index';

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

  // EFEITO DE INICIALIZAÇÃO (Roda apenas uma vez no carregamento)
  useEffect(() => {
    // 1. Verifica se o usuário já escolheu um tema antes
    const savedTheme = localStorage.getItem('theme');
    // 2. Verifica a preferência do sistema operacional
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Lógica de decisão: Se salvou dark OU (não salvou nada E sistema é dark)
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // FUNÇÃO DE TROCA (Toggle)
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

      if (!response.ok) {
        throw new Error('Falha ao analisar o site.');
      }

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
    // Removemos a div wrapper 'dark' aqui, pois agora controlamos o <html>
    <div className="min-h-screen transition-colors duration-500 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans p-4 md:p-8">

      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-4 py-8 animate-in fade-in zoom-in duration-500">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Acessibilidade <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">descomplicada.</span>
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Seu consultor digital para criar produtos inclusivos e referências de mercado.
          </p>
        </div>

        <ScanForm 
          urlInput={urlInput} 
          setUrlInput={setUrlInput} 
          handleScan={handleScan} 
          scanning={scanning} 
        />

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-2">
            <AlertTriangle size={20} /> {error}
          </div>
        )}

        <ResultCard result={result} scanning={scanning} />

      </main>
    </div>
  );
};

export default IrisReimagined;