import React, { useState } from 'react';
import { Copy, Check, Download, BookOpen, Layers, Zap } from 'lucide-react';
import { JAVA_SNIPPETS, JavaCodeSnippet } from '../data/javaCode';

interface CodeViewerProps {
  onCopiedNotification?: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onCopiedNotification }) => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('standard');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet: JavaCodeSnippet =
    JAVA_SNIPPETS.find((s) => s.id === selectedSnippetId) || JAVA_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    if (onCopiedNotification) onCopiedNotification();
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const filename =
      activeSnippet.id === 'standard'
        ? 'MukemmelSayi.java'
        : activeSnippet.id === 'optimized'
        ? 'MukemmelSayiHizli.java'
        : 'MukemmelSayiMetotlu.java';

    const blob = new Blob([activeSnippet.code], { type: 'text/x-java-source;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-0">
      {/* Tab Switcher & Actions */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Code tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {JAVA_SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => setSelectedSnippetId(snippet.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedSnippetId === snippet.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {snippet.title}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700/60"
            title="Java Kaynak Dosyası Olarak İndir (.java)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">İndir (.java)</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-emerald-200">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Snippet Description Banner */}
      <div className="bg-slate-950/70 px-4 py-2.5 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <span className="text-slate-300 font-medium">{activeSnippet.shortDesc}</span>
        <span className="font-mono text-slate-400 shrink-0 text-[11px]">
          {activeSnippet.complexity}
        </span>
      </div>

      {/* Code Display Area */}
      <div className="relative font-mono text-xs sm:text-sm bg-slate-950/90 text-slate-200 p-4 sm:p-5 overflow-x-auto max-h-[500px] leading-relaxed select-text">
        <pre className="text-slate-200 font-mono">
          <code>{activeSnippet.code}</code>
        </pre>
      </div>

      {/* Code Explanation & Breakdown Section */}
      <div className="bg-slate-950 p-4 sm:p-6 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Java Kodunun Satır Satır Açıklaması</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-lg space-y-1">
            <span className="font-mono text-indigo-400 font-bold">1. Scanner Nesnesi</span>
            <p className="text-slate-400 leading-relaxed">
              <code>Scanner scanner = new Scanner(System.in);</code> klavyeden kullanıcı girişi almak için oluşturulur.
              <code>scanner.nextInt();</code> ile konsoldan tam sayı okunur.
            </p>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-lg space-y-1">
            <span className="font-mono text-indigo-400 font-bold">2. For Döngüsü ve Sınır Şartı</span>
            <p className="text-slate-400 leading-relaxed">
              <code>for (int i = 1; i &lt; sayi; i++)</code> döngüsü 1&apos;den başlar ve <code>i &lt; sayi</code> sayesinde
              sayının kendisi hariç tutularak tüm pozitif çarpanlar taranır.
            </p>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-lg space-y-1">
            <span className="font-mono text-indigo-400 font-bold">3. Mod Alma (Kalan Kontrolü)</span>
            <p className="text-slate-400 leading-relaxed">
              <code>if (sayi % i == 0)</code> kontrolü, sayının <code>i</code> değişkenine kalansız bölünüp
              bölünmediğini test eder. Kalansız ise <code>toplam += i;</code> ile toplanır.
            </p>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-lg space-y-1">
            <span className="font-mono text-indigo-400 font-bold">4. Eşitlik ve İmza Yazdırma</span>
            <p className="text-slate-400 leading-relaxed">
              <code>if (sayi &gt; 0 &amp;&amp; toplam == sayi)</code> koşuluyla mükemmel sayı ise
              &quot;Mükemmel sayıdır&quot;, değilse &quot;Mükemmel sayı değildir.&quot; ve Enes Öztürk imzası ekrana yazdırılır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
