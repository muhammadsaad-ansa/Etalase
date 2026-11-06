import React, { useState } from 'react';
import { X, Sparkles, Loader2, Check } from 'lucide-react';

interface AIBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBio: (bio: string) => void;
  currentName: string;
}

export const AIBioModal: React.FC<AIBioModalProps> = ({
  isOpen,
  onClose,
  onSelectBio,
  currentName
}) => {
  const [niche, setNiche] = useState('Kreator Konten & Tech Enthusiast');
  const [tone, setTone] = useState('Profesional & Inspiratif');
  const [loading, setLoading] = useState(false);
  const [bios, setBios] = useState<string[]>([]);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentName, niche, tone })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.bios)) {
        setBios(data.bios);
      } else {
        setError(data.error || 'Gagal menghasilkan bio.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Bio Generator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form / Content */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Bidang / Niche Anda
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Contoh: Digital Marketing, Programmer, Fotografer"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Gaya Bahasa
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Profesional & Inspiratif">Profesional & Inspiratif</option>
                <option value="Santai & Gaul">Santai & Gaul</option>
                <option value="Formal & Elegan">Formal & Elegan</option>
                <option value="Enerjik & Persuasif">Enerjik & Persuasif</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sedang Meracik Bio AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Buat Bio dengan Gemini AI</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-900">
              {error}
            </p>
          )}

          {bios.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pilih Bio Rekomendasi:
              </p>
              {bios.map((b, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectBio(b);
                    onClose();
                  }}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-xl cursor-pointer transition-all text-sm text-slate-800 dark:text-slate-200 flex items-start justify-between gap-2 group"
                >
                  <span className="leading-relaxed">{b}</span>
                  <span className="shrink-0 text-xs font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity pt-0.5">
                    Gunakan
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
