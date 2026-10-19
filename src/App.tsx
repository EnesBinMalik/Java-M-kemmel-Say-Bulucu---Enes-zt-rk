/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { JavaTerminal } from './components/JavaTerminal';
import { DivisorVisualizer } from './components/DivisorVisualizer';
import { CodeViewer } from './components/CodeViewer';
import { ScenarioCards } from './components/ScenarioCards';
import { TheorySection } from './components/TheorySection';
import { analyzeNumber } from './utils/perfectNumber';
import { JAVA_SNIPPETS } from './data/javaCode';
import { Check, Sparkles, Code2, Terminal, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState<number>(28);
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const analysis = analyzeNumber(currentNumber);

  const handleCopyPrimaryCode = () => {
    navigator.clipboard.writeText(JAVA_SNIPPETS[0].code);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2400);
  };

  const handleSelectScenario = (num: number) => {
    setCurrentNumber(num);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Copied Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
          <span>Enes Öztürk imzalı Java kodu panoya kopyalandı!</span>
        </div>
      )}

      {/* Top Bar Contract (3 Zones) */}
      <Header
        onCopyCode={handleCopyPrimaryCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="text-indigo-400 font-semibold font-mono">Java SE Algoritma Geliştirme</span>
            <span aria-hidden="true">·</span>
            <span>Enes Öztürk İmzalı</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">Bölen Analizi &amp; Simülatör</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: 'balance' }}>
              Java ile Mükemmel Sayı Bulucu
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Klavyeden girilen sayının kendisi hariç pozitif tam bölenlerinin toplamını hesaplayıp,
              sayı mükemmel ise ekrana <span className="text-emerald-400 font-semibold font-mono">&ldquo;mükemmel sayıdır.&rdquo;</span>,
              değilse <span className="text-rose-400 font-semibold font-mono">&ldquo;mükemmel sayı değildir.&rdquo;</span> yazdıran program.
            </p>
          </div>

          {/* Enes Öztürk Signature Attribution Bar */}
          <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold font-mono text-sm">
                EÖ
              </div>
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span>Enes Öztürk</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Algoritma Tasarımı &amp; Java Kaynak Kodları Yazar İmzası
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Test Edilen Sayı:</span>
              <span className="px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/40 font-mono text-indigo-300 font-bold">
                {currentNumber}
              </span>
              <span className={analysis.isPerfect ? 'text-emerald-400 font-semibold' : 'text-slate-400 font-medium'}>
                ({analysis.isPerfect ? 'Mükemmel Sayı ✓' : 'Mükemmel Sayı Değil ✗'})
              </span>
            </div>
          </div>
        </div>

        {/* View Selection Navigation on Main Page */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-fit">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Simülatör &amp; Bölen Analizi</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Java Kaynak Kodu</span>
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'scenarios'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>İstenen Senaryolar</span>
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'theory'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Matematik Teori</span>
          </button>
        </div>

        {/* Tab 1: Simulator & Divisor Breakdown */}
        {activeTab === 'simulator' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Zone: Terminal & Scanner Simulation */}
              <div className="lg:col-span-7 space-y-4">
                <JavaTerminal
                  currentNumber={currentNumber}
                  onNumberChange={(num) => setCurrentNumber(num)}
                  analysis={analysis}
                />
              </div>

              {/* Right Zone: Divisor Visualizer & Summation Math */}
              <div className="lg:col-span-5 space-y-4">
                <DivisorVisualizer analysis={analysis} />
              </div>
            </div>

            {/* Quick Scenario Strip Below Terminal */}
            <div className="pt-4 border-t border-slate-900">
              <ScenarioCards
                onSelectScenario={handleSelectScenario}
                currentNumber={currentNumber}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Java Source Code Viewer */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <CodeViewer onCopiedNotification={() => setCopiedNotification(true)} />
          </div>
        )}

        {/* Tab 3: Detailed Scenarios */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <ScenarioCards
              onSelectScenario={handleSelectScenario}
              currentNumber={currentNumber}
            />
          </div>
        )}

        {/* Tab 4: Mathematical Theory */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <TheorySection />
          </div>
        )}

        {/* Signature & Author Section */}
        <section className="mt-16 p-6 sm:p-8 bg-slate-900/60 border border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-indigo-400 font-semibold tracking-wide uppercase">
                Program İmzası ve Telif
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Hazırlayan: Enes Öztürk
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                Bu Java programı, üniversite ve lise algoritma dersleri, teknik mülakatlar ve
                matematiksel modelleme için en temiz Java kodlama standartlarıyla
                Enes Öztürk tarafından hazırlanmış ve doğrulanmıştır.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleCopyPrimaryCode}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-lg"
              >
                <Code2 className="w-4 h-4" />
                <span>Enes Öztürk İmzalı Kodu Kopyala</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>Java Mükemmel Sayı Algoritması</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400 font-semibold">Enes Öztürk</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Senaryolar: 28, 1, 496</span>
            <span aria-hidden="true">·</span>
            <span>Java SE 17+ / OpenJDK Uyumlu</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
