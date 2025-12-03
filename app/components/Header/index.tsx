import React from 'react';
import { Eye, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// O "export const" abaixo é OBRIGATÓRIO para o erro sumir
export const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto mb-12">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
          <Eye size={24} />
        </div>
        <span className="text-2xl font-bold tracking-tight">Iris.</span>
      </div>
      <button 
        onClick={toggleTheme}
        className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-transform"
        aria-label="Alternar tema"
      >
        {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-600" />}
      </button>
    </header>
  );
};