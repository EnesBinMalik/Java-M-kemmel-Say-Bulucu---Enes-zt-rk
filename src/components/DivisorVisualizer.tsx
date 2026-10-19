import React from 'react';
import { Check, X, ArrowRight, Info, Calculator, Sparkles } from 'lucide-react';
import { PerfectNumberResult } from '../types';

interface DivisorVisualizerProps {
  analysis: PerfectNumberResult;
  onSelectDivisor?: (d: number) => void;
}

export const DivisorVisualizer: React.FC<DivisorVisualizerProps> = ({ analysis }) => {
  const { number, isPerfect, properDivisors, sumOfDivisors, difference, formulaString } = analysis;

  // Number classification:
  // sum == number -> Mükemmel (Perfect)
  // sum < number -> Eksik (Deficient)
  // sum > number -> Zengin (Abundant)
  let classification = 'Mükemmel Sayı';
  let classDescription = 'Kendisi hariç pozitif tam sayı bölenlerinin toplamı sayının kendisine eşittir.';

  if (!isPerfect) {
    if (sumOfDivisors < number) {
      classification = 'Eksik Sayı (Deficient)';
      classDescription = `Bölenler toplamı (${sumOfDivisors}) sayının kendisinden (${number}) küçüktür.`;
    } else {
      classification = 'Zengin Sayı (Abundant)';
      classDescription = `Bölenler toplamı (${sumOfDivisors}) sayının kendisinden (${number}) büyüktür.`;
    }
  }

  const ratio = number > 0 ? (sumOfDivisors / number) * 100 : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      {/* Title & Classification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-slate-400">Matematiksel Bölen Analizi</div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <span>Sayı:</span>
            <span className="text-indigo-400 font-mono text-2xl">{number}</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {isPerfect ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Check className="w-4 h-4 stroke-[3]" />
              <span className="text-xs font-bold tracking-wide uppercase">Mükemmel Sayı</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              <X className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-medium">{classification}</span>
            </div>
          )}
        </div>
      </div>

      {/* Proper Divisors Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium text-slate-300">
            Kendisi Hariç Pozitif Tam Sayı Çarpanları ({properDivisors.length} adet):
          </span>
          <span className="font-mono text-slate-400">
            (d &lt; {number} ve {number} % d == 0)
          </span>
        </div>

        {properDivisors.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {properDivisors.map((d, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 border border-slate-700/80 rounded-lg text-slate-200 font-mono text-sm hover:border-indigo-500 transition-colors shadow-sm"
              >
                <span className="text-indigo-400 font-semibold">{d}</span>
                <span className="text-[10px] text-slate-500 font-sans">
                  ({number}/{d}={number / d})
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400">
            {number === 1 ? (
              <span className="text-amber-400/90">
                1 sayısının kendisinden küçük pozitif böleni yoktur. Bu nedenle bölenler toplamı 0&apos;dır.
              </span>
            ) : (
              <span>Hiç öz bölen bulunamadı.</span>
            )}
          </div>
        )}
      </div>

      {/* Summation Equation Visualizer */}
      <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-2">
        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5 text-indigo-400" />
          <span>Bölenlerin Toplam Formülü</span>
        </div>
        <div className="font-mono text-sm sm:text-base text-slate-200 overflow-x-auto py-1">
          {properDivisors.length > 0 ? (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-indigo-300">{properDivisors.join(' + ')}</span>
              <span className="text-slate-500">=</span>
              <span className={`font-bold ${isPerfect ? 'text-emerald-400' : 'text-amber-400'}`}>
                {sumOfDivisors}
              </span>
            </div>
          ) : (
            <span className="text-slate-400">Bölen yok (Toplam = 0)</span>
          )}
        </div>
      </div>

      {/* Comparison Balance Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-lg">
          <div className="text-xs text-slate-400 font-mono">Bölenler Toplamı</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">{sumOfDivisors}</div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-lg">
          <div className="text-xs text-slate-400 font-mono">Sayının Kendisi</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">{number}</div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-lg">
          <div className="text-xs text-slate-400 font-mono">Fark (Toplam - Sayı)</div>
          <div
            className={`text-xl font-bold font-mono mt-0.5 ${
              difference === 0
                ? 'text-emerald-400'
                : difference < 0
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            {difference > 0 ? `+${difference}` : difference}
          </div>
        </div>
      </div>

      {/* Educational Note */}
      <div className="p-3.5 bg-indigo-950/20 border border-indigo-500/20 rounded-lg text-xs text-indigo-200/90 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {classDescription}{' '}
          {isPerfect && (
            <span className="text-emerald-300 font-medium">
              Öklid-Euler teoremine göre tüm bilinen çift mükemmel sayılar 2^(p-1) * (2^p - 1) formülündedir.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
