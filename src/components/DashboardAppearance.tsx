import React from 'react';
import { Sparkles, Check, User, Globe, Share2, Upload, Image as ImageIcon } from 'lucide-react';
import { ProfileData, ThemeConfig } from '../types';
import { themes } from '../data/initialData';
import { getSocialIcon } from '../utils/iconMap';

interface DashboardAppearanceProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  currentTheme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  onOpenAIBio: () => void;
}

export const DashboardAppearance: React.FC<DashboardAppearanceProps> = ({
  profile,
  setProfile,
  currentTheme,
  setTheme,
  onOpenAIBio,
}) => {
  const handleProfileChange = (field: keyof ProfileData, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socials: { ...prev.socials, [platform]: value }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          handleProfileChange('avatarUrl', uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Profile Info Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profil & Identitas Etalase</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Atur informasi profil, foto profil, dan bio yang akan dilihat oleh pengunjung Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Nama Lengkap / Brand
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Username / Handle
            </label>
            <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <span className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm font-mono">
                linkvault.id/
              </span>
              <input
                type="text"
                value={profile.handle}
                onChange={(e) => handleProfileChange('handle', e.target.value)}
                className="w-full px-4 py-2.5 bg-transparent text-slate-900 dark:text-white text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Bio / Tagline Halaman
            </label>
            <button
              type="button"
              onClick={onOpenAIBio}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buat dengan AI</span>
            </button>
          </div>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
          />
        </div>

        {/* Profile Photo / Avatar Upload & URL */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Foto Profil / Avatar</span>
          </label>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/30 bg-slate-100 dark:bg-slate-800 shrink-0 shadow-md">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 w-full space-y-2">
              <input
                type="text"
                placeholder="https://images.unsplash.com/... atau pilih dari galeri"
                value={profile.avatarUrl}
                onChange={(e) => handleProfileChange('avatarUrl', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <div className="flex items-center gap-2">
                <label className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 shadow-sm">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Ambil dari Galeri atau File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-slate-400">Format: JPG, PNG, WebP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ikon Media Sosial</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Tautkan akun sosial media Anda agar tampil di bagian atas etalase.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(profile.socials).map((platform) => (
            <div key={platform} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                {getSocialIcon(platform, "w-5 h-5")}
              </div>
              <input
                type="text"
                placeholder={`URL ${platform.toUpperCase()}`}
                value={(profile.socials as any)[platform] || ''}
                onChange={(e) => handleSocialChange(platform, e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Theme Selection Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pilih Tema & Estetika</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih skema warna dan gaya kartu yang paling sesuai dengan karakter Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((t) => {
            const isSelected = currentTheme.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t)}
                className={`relative rounded-2xl p-4 cursor-pointer border-2 transition-all flex flex-col justify-between h-36 overflow-hidden ${
                  isSelected
                    ? 'border-indigo-600 shadow-lg shadow-indigo-600/15 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                } ${t.gradientClass} ${t.bgColor}`}
              >
                <div className="flex items-center justify-between z-10">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${t.cardStyle === 'solid' ? 'bg-slate-900 text-white' : 'bg-black/30 backdrop-blur-md text-white'}`}>
                    {t.name}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 z-10 mt-auto">
                  <div className={`h-4 w-3/4 rounded ${t.cardStyle === 'solid' ? 'bg-slate-200' : 'bg-white/20'}`}></div>
                  <div className={`h-3 w-1/2 rounded ${t.cardStyle === 'solid' ? 'bg-slate-100' : 'bg-white/10'}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Layout Selection Card (1 baris, 2 baris, 3 baris) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tata Letak Etalase (Layout)</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih bagaimana link dan kartu Anda ditampilkan kepada pengunjung (1 baris, 2 baris/kolom, atau 3 baris/kolom).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 1, name: 'Tata Letak 1 Baris', desc: 'Tampilan standar memanjang ke bawah dengan detail lengkap.' },
            { id: 2, name: 'Tata Letak 2 Baris', desc: 'Tata letak 2 kolom seimbang, sangat bagus untuk portofolio & produk.' },
            { id: 3, name: 'Tata Letak 3 Baris', desc: 'Tata letak 3 kolom kompak, ideal untuk banyak tautan/katalog.' },
          ].map((layoutOpt) => {
            const isSelected = (profile.linkLayout || 1) === layoutOpt.id;
            return (
              <div
                key={layoutOpt.id}
                onClick={() => handleProfileChange('linkLayout', layoutOpt.id)}
                className={`relative rounded-2xl p-5 cursor-pointer border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-md shadow-indigo-600/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {layoutOpt.name}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Visual mini preview */}
                <div className={`grid gap-1.5 mb-3 ${layoutOpt.id === 1 ? 'grid-cols-1' : layoutOpt.id === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {Array.from({ length: layoutOpt.id === 1 ? 2 : layoutOpt.id === 2 ? 4 : 6 }).map((_, i) => (
                    <div key={i} className={`h-6 rounded bg-slate-200 dark:bg-slate-700 ${layoutOpt.id === 1 ? 'w-full' : ''}`}></div>
                  ))}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {layoutOpt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
