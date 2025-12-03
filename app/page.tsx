"use client";

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

// Importando nossos componentes
import { Header } from './components/Header';
import { ScanForm } from './components/ScanForm';
import { ResultCard } from './components/ResultCard';

// Tipos (para o TypeScript não reclamar)
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

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

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
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-500 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans p-4 md:p-8">

        {/* 1. Componente de Cabeçalho */}
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <main className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="text-center space-y-4 py-8 animate-in fade-in zoom-in duration-500">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Acessibilidade <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">descomplicada.</span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Seu consultor digital para criar produtos inclusivos e referências de mercado.
            </p>
          </div>

          {/* 2. Componente de Formulário */}
          <ScanForm 
            urlInput={urlInput} 
            setUrlInput={setUrlInput} 
            handleScan={handleScan} 
            scanning={scanning} 
          />

          {/* Feedback de Erro */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-2">
              <AlertTriangle size={20} /> {error}
            </div>
          )}

          {/* 3. Componente de Resultado */}
          <ResultCard result={result} scanning={scanning} />

        </main>
      </div>
    </div>
  );
};

export default IrisReimagined;