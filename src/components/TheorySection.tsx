import React from 'react';
import { BookOpen, Sparkles, HelpCircle, Binary, History, Compass } from 'lucide-react';
import { KNOWN_PERFECT_NUMBERS } from '../utils/perfectNumber';

export const TheorySection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>Mükemmel Sayılar Matematik Rehberi</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Antik Yunan&apos;dan modern sayı teorisine mükemmel sayıların sırları ve algoritmik temelleri.
        </p>
      </div>

      {/* Main Definition & Euclid-Euler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Definition Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
            <Compass className="w-4 h-4" />
            <span>Tanım ve Temel Kural</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Matematikte, <strong className="text-white">kendisi hariç</strong> bütün pozitif bölenlerinin
            (kalansız bölen sayılarının) toplamı kendisine eşit olan pozitif tam sayılara{' '}
            <strong className="text-indigo-400">mükemmel sayı (perfect number)</strong> denir.
          </p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <div className="text-slate-400">// 28 Örneği:</div>
            <div>Pozitif Bölenler: 1, 2, 4, 7, 14, (28 hariç)</div>
            <div className="text-emerald-400 font-semibold">Toplam: 1 + 2 + 4 + 7 + 14 = 28 ✓</div>
          </div>
        </div>

        {/* Why 1 is not perfect */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>1 Neden Mükemmel Sayı Değildir?</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            1 sayısının pozitif böleni yalnızca kendisidir (1). Tanım gereği sayının kendisi hariç
            tutulduğunda geriye hiçbir öz bölen kalmaz (boş küme).
          </p>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <div className="text-slate-400">// 1 Kontrolü:</div>
            <div>Kendisi hariç bölenler: [] (Yok)</div>
            <div>Bölenler toplamı: 0</div>
            <div className="text-rose-400 font-semibold">Sonuç: 0 != 1 (Mükemmel Sayı Değildir ✗)</div>
          </div>
        </div>
      </div>

      {/* Euclid-Euler Theorem & Formula */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
          <Binary className="w-4 h-4" />
          <span>Öklid - Euler Formülü ve Mersenne Asalları</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          M.Ö. 300 yılında Öklid, eğer <code className="text-indigo-300 font-mono">2^p - 1</code> bir asal
          sayı (Mersenne asalı) ise,{' '}
          <code className="text-indigo-300 font-mono">2^(p-1) × (2^p - 1)</code> sayısının bir çift
          mükemmel sayı olduğunu kanıtlamıştır. Yüzyıllar sonra Leonhard Euler, tüm çift mükemmel
          sayıların bu biçimde olmak zorunda olduğunu ispatlamıştır.
        </p>

        {/* Formula breakdown table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Asal p</th>
                <th className="py-2.5 px-3">Mersenne Asalı (2^p - 1)</th>
                <th className="py-2.5 px-3">Formül: 2^(p-1) × (2^p - 1)</th>
                <th className="py-2.5 px-3 text-right">Mükemmel Sayı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {KNOWN_PERFECT_NUMBERS.map((item) => (
                <tr key={item.n} className="hover:bg-slate-950/40">
                  <td className="py-2.5 px-3 text-indigo-400 font-bold">p = {item.p}</td>
                  <td className="py-2.5 px-3">{Math.pow(2, item.p) - 1}</td>
                  <td className="py-2.5 px-3 text-slate-400">{item.formula}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-bold text-sm">
                    {item.n}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Mystery & Open Problem */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
          <History className="w-4 h-4 text-indigo-400" />
          <span>Matematik Tarihinin En Eski Açık Problemi</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          &quot;Tek bir mükemmel sayı var mıdır?&quot; Bu soru 2000 yılı aşkın süredir çözülememiştir.
          Süper bilgisayarlarla 10^1500 değerine kadar yapılan araştırmalarda tek bir mükemmel sayıya
          rastlanmamıştır, ancak var olamayacağı da henüz matematiksel olarak kesinleştirilmemiştir.
        </p>
      </div>
    </div>
  );
};
