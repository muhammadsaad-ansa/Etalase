import React from 'react';
import { Layers, QrCode, Eye, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: 'links' | 'appearance' | 'analytics') => void;
  onOpenQR: () => void;
  onTogglePublicView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQR,
  onTogglePublicView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => setActiveTab('links')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              LinkVault<span className="text-indigo-600 dark:text-indigo-400">.id</span>
            </h1>
          </div>
        </div>

        {/* Zone 2: Navigation Links (4-5 single-line items) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('links')}
            className={`px-4 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'links'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Etalase Link
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-4 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'appearance'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tampilan & Profil
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Statistik & Klik
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQR}
            aria-label="QR Code Generator"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
          >
            <QrCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>QR Code</span>
          </button>

          <button
            onClick={onTogglePublicView}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 rounded-xl transition-all whitespace-nowrap"
          >
            <Eye className="w-4 h-4" />
            <span>Lihat Halaman Publik</span>
          </button>
        </div>

      </div>
    </header>
  );
};
