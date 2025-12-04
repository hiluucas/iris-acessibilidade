import React from 'react';
import { Eye, Sun, Moon, Book, FileText } from 'lucide-react'; // Importe FileText
import Link from 'next/link';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto mb-12 py-4">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
          <Eye size={24} />
        </div>
        <span className="text-2xl font-bold tracking-tight">Iris.</span>
      </Link>

      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Link para Biblioteca (Docs) */}
        <Link 
          href="/docs" 
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <Book size={18} />
          Biblioteca
        </Link>

        {/* NOVO LINK: Referência / Manifesto */}
        <Link 
          href="/reference" 
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Documento de Referência"
        >
          <FileText size={18} />
          <span className="hidden md:inline">Guia WCAG</span>
        </Link>

        {/* Separador Visual */}
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

        <button 
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-transform"
          aria-label="Alternar tema"
        >
          {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-600" />}
        </button>
      </div>
    </header>
  );
};