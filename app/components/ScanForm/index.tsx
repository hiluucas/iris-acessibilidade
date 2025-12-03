import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface ScanFormProps {
  urlInput: string;
  setUrlInput: (value: string) => void;
  handleScan: (e: React.FormEvent) => void;
  scanning: boolean;
}

export const ScanForm = ({ urlInput, setUrlInput, handleScan, scanning }: ScanFormProps) => {
  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-2 rounded-3xl shadow-2xl transition-all duration-500">
      <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-grow group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors">
            <Search size={22} />
          </div>
          <input 
            type="url" 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://exemplo.com.br" 
            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border-none text-lg text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            required
          />
        </div>
        <button 
          type="submit"
          disabled={scanning}
          className="h-16 px-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {scanning ? 'Auditando...' : 'Auditar'} 
          {!scanning && <ArrowRight size={20} />}
        </button>
      </form>
    </div>
  );
};