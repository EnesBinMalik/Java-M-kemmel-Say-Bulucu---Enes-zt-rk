import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, FastForward, CheckCircle2, XCircle, Sparkles, Terminal as TermIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { analyzeNumber } from '../utils/perfectNumber';
import { PerfectNumberResult } from '../types';

interface JavaTerminalProps {
  currentNumber: number;
  onNumberChange: (num: number) => void;
  analysis: PerfectNumberResult;
}

interface LogEntry {
  type: 'system' | 'prompt' | 'input' | 'output' | 'success' | 'fail' | 'signature';
  text: string;
}

export const JavaTerminal: React.FC<JavaTerminalProps> = ({
  currentNumber,
  onNumberChange,
  analysis,
}) => {
  const [inputValue, setInputValue] = useState<string>(currentNumber.toString());
  const [terminalLogs, setTerminalLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepMode, setStepMode] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [autoStepping, setAutoStepping] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Initialize with standard scenario
  useEffect(() => {
    executeSimulation(currentNumber);
  }, []);

  useEffect(() => {
    setInputValue(currentNumber.toString());
  }, [currentNumber]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, currentStepIndex]);

  // Handle auto-stepping
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoStepping && stepMode && analysis.steps.length > 0) {
      if (currentStepIndex < analysis.steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
        }, 350);
      } else {
        setAutoStepping(false);
      }
    }
    return () => clearTimeout(timer);
  }, [autoStepping, stepMode, currentStepIndex, analysis.steps.length]);

  const executeSimulation = (num: number) => {
    const res = analyzeNumber(num);
    setIsRunning(true);
    setStepMode(false);
    setAutoStepping(false);
    setCurrentStepIndex(0);

    const logs: LogEntry[] = [
      { type: 'system', text: '$ javac MukemmelSayi.java' },
      { type: 'system', text: '$ java MukemmelSayi' },
      { type: 'prompt', text: 'Bir sayı giriniz: ' },
      { type: 'input', text: num.toString() },
    ];

    if (res.isPerfect) {
      logs.push({
        type: 'success',
        text: `${num} Mükemmel sayıdır`,
      });
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#3b82f6', '#f59e0b'],
        });
      } catch (e) {
        // Safe fallback
      }
    } else {
      logs.push({
        type: 'fail',
        text: `${num} Mükemmel sayı değildir.`,
      });
    }

    logs.push({
      type: 'signature',
      text: '--------------------------------\nProgrammer: Enes Öztürk',
    });

    setTerminalLogs(logs);
    setIsRunning(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onNumberChange(parsed);
      executeSimulation(parsed);
    }
  };

  const startStepMode = () => {
    setStepMode(true);
    setCurrentStepIndex(0);
    setAutoStepping(false);
    setTerminalLogs([
      { type: 'system', text: '$ javac MukemmelSayi.java' },
      { type: 'system', text: '$ jdb MukemmelSayi (Adım Adım Hata Ayıklayıcı)' },
      { type: 'prompt', text: 'Bir sayı giriniz: ' },
      { type: 'input', text: currentNumber.toString() },
      { type: 'system', text: `Döngü başlatıldı: for (int i = 1; i < ${currentNumber}; i++)` },
    ]);
  };

  const handleQuickSelect = (num: number) => {
    setInputValue(num.toString());
    onNumberChange(num);
    executeSimulation(num);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <TermIcon className="w-3.5 h-3.5 text-indigo-400" />
            bash — MukemmelSayi.java
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (stepMode) {
                setStepMode(false);
                setAutoStepping(false);
              } else {
                startStepMode();
              }
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              stepMode
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            {stepMode ? 'Normal Mod' : 'Adım Adım Hata Ayıkla (Debug)'}
          </button>

          <button
            onClick={() => executeSimulation(currentNumber)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Çalıştır</span>
          </button>
        </div>
      </div>

      {/* Quick Scenario Preset Chips */}
      <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-mono">Senaryo Seç:</span>
        <button
          onClick={() => handleQuickSelect(28)}
          className={`px-2 py-0.5 rounded font-mono transition-colors ${
            currentNumber === 28
              ? 'bg-indigo-600 text-white font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          28 (Mükemmel)
        </button>
        <button
          onClick={() => handleQuickSelect(1)}
          className={`px-2 py-0.5 rounded font-mono transition-colors ${
            currentNumber === 1
              ? 'bg-indigo-600 text-white font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          1 (Mükemmel Değil)
        </button>
        <button
          onClick={() => handleQuickSelect(496)}
          className={`px-2 py-0.5 rounded font-mono transition-colors ${
            currentNumber === 496
              ? 'bg-indigo-600 text-white font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          496 (Mükemmel)
        </button>
        <button
          onClick={() => handleQuickSelect(6)}
          className={`px-2 py-0.5 rounded font-mono transition-colors ${
            currentNumber === 6
              ? 'bg-indigo-600 text-white font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          6 (En Küçük Mükemmel)
        </button>
        <button
          onClick={() => handleQuickSelect(12)}
          className={`px-2 py-0.5 rounded font-mono transition-colors ${
            currentNumber === 12
              ? 'bg-indigo-600 text-white font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          12 (Mükemmel Değil)
        </button>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 sm:p-5 font-mono text-sm min-h-[280px] max-h-[380px] overflow-y-auto space-y-2 bg-slate-950/80 selection:bg-indigo-500/40">
        {!stepMode ? (
          <>
            {terminalLogs.map((log, idx) => {
              if (log.type === 'system') {
                return (
                  <div key={idx} className="text-slate-500 text-xs">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'prompt') {
                return (
                  <div key={idx} className="text-slate-200">
                    <span className="text-slate-400">{log.text}</span>
                    <span className="text-indigo-400 font-semibold">{terminalLogs[idx + 1]?.text}</span>
                  </div>
                );
              }
              if (log.type === 'input') {
                return null; // Rendered alongside prompt
              }
              if (log.type === 'success') {
                return (
                  <div
                    key={idx}
                    className="p-3 my-2 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-base">{log.text}</div>
                      <div className="text-xs text-emerald-400/80 mt-1">
                        Bölenler Toplamı: {analysis.formulaString}
                      </div>
                    </div>
                  </div>
                );
              }
              if (log.type === 'fail') {
                return (
                  <div
                    key={idx}
                    className="p-3 my-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 flex items-start gap-2.5"
                  >
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-base">{log.text}</div>
                      <div className="text-xs text-rose-400/80 mt-1">
                        Bölenler Toplamı: {analysis.sumOfDivisors} (Sayıya eşit değildir)
                      </div>
                    </div>
                  </div>
                );
              }
              if (log.type === 'signature') {
                return (
                  <div key={idx} className="mt-4 pt-3 border-t border-slate-800 text-indigo-400 text-xs font-semibold whitespace-pre-line">
                    {log.text}
                  </div>
                );
              }
              return null;
            })}
          </>
        ) : (
          /* Step Mode Debugger Output */
          <div className="space-y-3">
            <div className="text-amber-400 text-xs pb-1 border-b border-slate-800">
              [DEBUG GERÇEK ZAMANLI DÖNGÜ İZLEME] Sayı: {currentNumber}
            </div>

            {analysis.steps.slice(0, currentStepIndex + 1).map((step, idx) => (
              <div
                key={idx}
                className={`p-2 rounded text-xs transition-all ${
                  idx === currentStepIndex
                    ? 'bg-indigo-950/70 border border-indigo-500/40 text-slate-100 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    Adım {step.i}: <span className="text-slate-300">i = {step.i}</span>
                  </span>
                  <span
                    className={
                      step.isDivisor
                        ? 'text-emerald-400 font-semibold'
                        : 'text-slate-500'
                    }
                  >
                    {step.isDivisor ? '✓ TAM BÖLEN' : '✗ KALANLI'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">
                  {step.note}
                </div>
              </div>
            ))}

            {currentStepIndex >= analysis.steps.length - 1 && (
              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                <div className="text-xs text-slate-300 font-semibold">
                  Döngü Tamamlandı. Kontrol: (toplam == sayi) ({analysis.sumOfDivisors} == {currentNumber})
                </div>
                {analysis.isPerfect ? (
                  <div className="text-emerald-400 font-bold text-sm">
                    &gt; {currentNumber} Mükemmel sayıdır
                  </div>
                ) : (
                  <div className="text-rose-400 font-bold text-sm">
                    &gt; {currentNumber} Mükemmel sayı değildir.
                  </div>
                )}
                <div className="text-indigo-400 text-xs">
                  Geliştirici: Enes Öztürk
                </div>
              </div>
            )}
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Step Mode Controller Bar */}
      {stepMode && (
        <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400">
            Adım: <span className="text-indigo-400 font-bold">{currentStepIndex + 1}</span> / {analysis.steps.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStepIndex(0)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
              title="Başa Dön"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAutoStepping(!autoStepping)}
              className={`px-3 py-1 rounded font-medium flex items-center gap-1.5 ${
                autoStepping
                  ? 'bg-amber-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {autoStepping ? 'Durdur' : 'Otomatik Oynat'}
            </button>
            <button
              onClick={() => {
                if (currentStepIndex < analysis.steps.length - 1) {
                  setCurrentStepIndex((prev) => prev + 1);
                }
              }}
              disabled={currentStepIndex >= analysis.steps.length - 1}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded flex items-center gap-1"
            >
              <span>Sonraki Adım</span>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Keyboard Input Console Prompt */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-slate-950 p-3 sm:p-4 border-t border-slate-800 flex items-center gap-3"
      >
        <span className="text-xs sm:text-sm font-mono text-slate-400 shrink-0 select-none">
          Bir sayı giriniz:
        </span>
        <input
          ref={inputRef}
          type="number"
          min="1"
          max="10000000"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Örn: 28, 496, 1..."
          className="flex-1 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-sm font-mono text-white placeholder-slate-500 outline-none transition-colors"
        />
        <button
          type="submit"
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shrink-0 shadow-sm"
        >
          Çalıştır (Enter)
        </button>
      </form>
    </div>
  );
};
