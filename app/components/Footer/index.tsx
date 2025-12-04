import React from 'react';
import Link from 'next/link';
import { Eye, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl print:hidden overflow-hidden">
      
      {/* Ambient Glow (Detalhe Sutil de Fundo) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* LADO ESQUERDO: Branding Forte */}
          <div className="max-w-md space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black shadow-xl shadow-zinc-900/10 transition-transform group-hover:scale-105 group-hover:rotate-3">
                <Eye size={20} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
                Iris.
              </span>
            </Link>
            
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Design não é apenas como se vê, é como funciona para <span className="text-zinc-900 dark:text-zinc-200 font-bold">todas as pessoas</span>.
            </p>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Sistema Operacional v1.0</span>
            </div>
          </div>

          {/* LADO DIREITO: Navegação Limpa */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Ferramentas</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-1 group">
                    Scanner WCAG
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-1 group">
                    Biblioteca
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Recursos</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/reference" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-1 group">
                    Guia Oficial
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR: A Assinatura Premium */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            © {currentYear} Iris Open Source. Licença MIT.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 dark:text-zinc-500">Designed & Engineered by</span>
            <a 
              href="https://seusite.com" // Coloque seu link real aqui se tiver
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              <span className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Lucas Coutinho
              </span>
              <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-600" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">
                Product Designer
              </span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};