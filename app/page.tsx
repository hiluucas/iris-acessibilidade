"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowDown } from 'lucide-react';
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
      
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-center py-12">
        
        {/* Hero Section - Limpo e Tipográfico */}
        <div className={`transition-all duration-700 ease-in-out ${result ? 'mt-0' : 'mt-12 md:mt-20'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.9]">
              Torne a web <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
                acessível.
              </span>
            </h1>
            
            {!result && (
              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                A ferramenta de referência para auditar, aprender e corrigir interfaces digitais.
              </p>
            )}
          </div>

          {/* Scanner Area */}
          <div className="mt-12 md:mt-16 max-w-2xl mx-auto w-full relative z-10">
            <ScanForm 
              urlInput={urlInput} 
              setUrlInput={setUrlInput} 
              handleScan={handleScan} 
              scanning={scanning} 
            />
            
            {/* Error Feedback */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
                <AlertTriangle size={16} /> 
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Results Area */}
        <div className="w-full mt-12 md:mt-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <ResultCard result={result} scanning={scanning} />
        </div>

      </main>
    </div>
  );
};

export default IrisReimagined;