import React from 'react';
import { Search, ArrowRight, Loader2 } from 'lucide-react';

interface ScanFormProps {
  urlInput: string;
  setUrlInput: (value: string) => void;
  handleScan: (e: React.FormEvent) => void;
  scanning: boolean;
}

export const ScanForm = ({ urlInput, setUrlInput, handleScan, scanning }: ScanFormProps) => {
  return (
    <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-zinc-200/50 dark:border-zinc-800 transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.6)]">
      <form onSubmit={handleScan} className="flex flex-col sm:flex-row p-2 gap-2">
        <div className="relative flex-grow group">
          
          <label htmlFor="url-input" className="sr-only">
            Digite a URL do site para auditar
          </label>

          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors duration-300">
            <Search size={20} strokeWidth={2.5} />
          </div>
          
          <input 
            id="url-input" 
            type="url" 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://exemplo.com.br" 
            className="w-full h-14 sm:h-16 pl-14 pr-6 rounded-2xl bg-transparent border-none text-lg font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-0 focus:outline-none transition-all"
            required
            autoComplete="off"
          />
        </div>
        <button 
          type="submit"
          disabled={scanning}
          className="h-14 sm:h-16 px-8 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-base sm:text-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-80 disabled:cursor-not-allowed shadow-lg shadow-zinc-900/10 dark:shadow-white/5 shrink-0"
        >
          {scanning ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Analisando...
            </>
          ) : (
            <>
              Auditar <ArrowRight size={20} strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};