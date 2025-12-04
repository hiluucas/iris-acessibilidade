import React from 'react';
import Link from 'next/link';
import { Eye, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl print:hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black shadow-xl shadow-zinc-900/10 transition-transform group-hover:scale-105 group-hover:rotate-3">
                <Eye size={20} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
                Iris.
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              Design não é apenas como se vê, é como funciona para <span className="text-zinc-900 dark:text-zinc-200 font-bold">todas as pessoas</span>.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Produto</h4>
              <ul className="space-y-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <li><Link href="/" className="hover:text-blue-600 transition-colors">Scanner</Link></li>
                <li><Link href="/docs" className="hover:text-blue-600 transition-colors">Biblioteca</Link></li>
                <li><Link href="/reference" className="hover:text-blue-600 transition-colors">Guia WCAG</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">© {currentYear} Iris Open Source.</p>
          
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 pl-1 pr-4 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
            <span className="bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-500 shadow-sm border border-zinc-100 dark:border-zinc-700">Creator</span>
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Lucas Coutinho</span>
          </div>
        </div>

      </div>
    </footer>
  );
};