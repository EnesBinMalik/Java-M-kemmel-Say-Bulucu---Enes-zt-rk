import React from 'react';
import { Play, CheckCircle2, XCircle, Star, ArrowUpRight } from 'lucide-react';
import { analyzeNumber } from '../utils/perfectNumber';

interface ScenarioCardsProps {
  onSelectScenario: (num: number) => void;
  currentNumber: number;
}

export const ScenarioCards: React.FC<ScenarioCardsProps> = ({
  onSelectScenario,
  currentNumber,
}) => {
  const scenarios = [
    {
      id: 'scen-28',
      number: 28,
      isPromptScenario: true,
      label: 'Senaryo 1 (Prompt)',
      note: '28 sayısının çarpanları 1, 2, 4, 7, 14 olup toplamı 28 eder.',
      expectedOutput: '28 Mükemmel sayıdır',
      isPerfect: true,
    },
    {
      id: 'scen-1',
      number: 1,
      isPromptScenario: true,
      label: 'Senaryo 2 (Prompt)',
      note: '1 sayısının kendisinden küçük pozitif böleni yoktur. Toplam 0 ≠ 1 olduğundan mükemmel sayı değildir.',
      expectedOutput: '1 Mükemmel sayı değildir.',
      isPerfect: false,
    },
    {
      id: 'scen-496',
      number: 496,
      isPromptScenario: true,
      label: 'Senaryo 3 (Prompt)',
      note: '1 + 2 + 4 + 8 + 16 + 31 + 62 + 124 + 248 = 496. 3. mükemmel sayıdır.',
      expectedOutput: '496 Mükemmel sayıdır',
      isPerfect: true,
    },
    {
      id: 'scen-6',
      number: 6,
      isPromptScenario: false,
      label: 'Ek Senaryo (En Küçük)',
      note: '1 + 2 + 3 = 6. Bilinen en küçük ve ilk mükemmel sayıdır.',
      expectedOutput: '6 Mükemmel sayıdır',
      isPerfect: true,
    },
    {
      id: 'scen-12',
      number: 12,
      isPromptScenario: false,
      label: 'Ek Senaryo (Zengin Sayı)',
      note: '1 + 2 + 3 + 4 + 6 = 16. Toplam sayıdan büyüktür (16 > 12).',
      expectedOutput: '12 Mükemmel sayı değildir.',
      isPerfect: false,
    },
    {
      id: 'scen-8128',
      number: 8128,
      isPromptScenario: false,
      label: 'Ek Senaryo (4. Mükemmel)',
      note: 'Antik Yunan matematikçisi Nikomakhos tarafından listelenen 4. mükemmel sayı.',
      expectedOutput: '8128 Mükemmel sayıdır',
      isPerfect: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-white">İstenen ve Doğrulanan Senaryolar</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ödev şartnamesinde belirtilen test senaryoları ve sonuçları.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Enes Öztürk Doğrulama Testleri
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scen) => {
          const isSelected = currentNumber === scen.number;
          return (
            <div
              key={scen.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-lg ring-1 ring-indigo-500/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Header label & prompt badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 font-mono">
                    {scen.label}
                  </span>
                  {scen.isPromptScenario && (
                    <span className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-indigo-400" />
                      İstenen Senaryo
                    </span>
                  )}
                </div>

                {/* Input & Expected output */}
                <div className="space-y-1.5">
                  <div className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                    <span>Sayı: {scen.number}</span>
                  </div>

                  <div
                    className={`p-2.5 rounded-lg font-mono text-xs flex items-center gap-2 border ${
                      scen.isPerfect
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {scen.isPerfect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="font-semibold">{scen.expectedOutput}</span>
                  </div>
                </div>

                {/* Explanation text */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {scen.note}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectScenario(scen.number)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isSelected ? 'Seçili (Simülatörde)' : 'Simülatörde Test Et'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
