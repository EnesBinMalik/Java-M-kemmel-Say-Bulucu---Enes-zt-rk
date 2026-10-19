import React from 'react';
import { Terminal, Code2 } from 'lucide-react';

interface HeaderProps {
  onCopyCode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onCopyCode, activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#simulator"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('simulator');
            }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-indigo-300 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Terminal className="w-4 h-4" />
            </div>
            <span>Java Mükemmel Sayı</span>
          </a>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'simulator' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Simülatör
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'code' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Java Kaynak Kodu
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'scenarios' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Test Senaryoları
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'theory' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Matematik Teori
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onCopyCode}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Java Kodunu Kopyala</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
