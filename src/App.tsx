import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardLinks } from './components/DashboardLinks';
import { DashboardAppearance } from './components/DashboardAppearance';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { LinkEditorModal } from './components/LinkEditorModal';
import { QRCodeModal } from './components/QRCodeModal';
import { AIBioModal } from './components/AIBioModal';
import { PhonePreview } from './components/PhonePreview';
import { PublicViewPage } from './components/PublicViewPage';
import { initialLinks, initialProfile, themes } from './data/initialData';
import { LinkItem, ProfileData, ThemeConfig } from './types';
import { Layers, Smartphone, Sparkles, Download, Upload, RotateCcw } from 'lucide-react';

export default function App() {
  // Load state from localStorage or defaults
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('linkvault_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [links, setLinks] = useState<LinkItem[]>(() => {
    const saved = localStorage.getItem('linkvault_links');
    return saved ? JSON.parse(saved) : initialLinks;
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('linkvault_theme');
    return saved ? JSON.parse(saved) : themes[0];
  });

  const [totalViews, setTotalViews] = useState<number>(() => {
    const saved = localStorage.getItem('linkvault_views');
    return saved ? parseInt(saved, 10) : 1420;
  });

  const [activeTab, setActiveTab] = useState<'links' | 'appearance' | 'analytics'>('links');
  const [isPublicView, setIsPublicView] = useState(false);

  // Modals state
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAIBioOpen, setIsAIBioOpen] = useState(false);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('linkvault_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('linkvault_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('linkvault_theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('linkvault_views', totalViews.toString());
  }, [totalViews]);

  // Link Handlers
  const handleSaveLink = (linkItem: LinkItem) => {
    setLinks(prev => {
      const exists = prev.some(l => l.id === linkItem.id);
      if (exists) {
        return prev.map(l => l.id === linkItem.id ? linkItem : l);
      } else {
        return [linkItem, ...prev];
      }
    });
  };

  const handleDeleteLink = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus link ini?')) {
      setLinks(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, isActive: !l.isActive } : l));
  };

  const handleMoveLink = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...links];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLinks.length) return;
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;
    setLinks(newLinks);
  };

  const handleLinkClickSimulation = (id: string) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, clicks: l.clicks + 1 } : l));
  };

  const handleResetData = () => {
    if (window.confirm('Reset semua data ke pengaturan awal?')) {
      setProfile(initialProfile);
      setLinks(initialLinks);
      setCurrentTheme(themes[0]);
      setTotalViews(1420);
      localStorage.clear();
    }
  };

  if (isPublicView) {
    return (
      <PublicViewPage
        profile={profile}
        links={links}
        theme={currentTheme}
        onBackToDashboard={() => setIsPublicView(false)}
        onLinkClick={handleLinkClickSimulation}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQR={() => setIsQRModalOpen(true)}
        onTogglePublicView={() => setIsPublicView(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Center Dashboard Content */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* Quick Actions Toolbar */}
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Etalase Aktif:</span>
              <a
                href={`/${profile.handle}`}
                onClick={(e) => { e.preventDefault(); setIsPublicView(true); }}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono"
              >
                linkvault.id/{profile.handle}
              </a>
            </div>

            <button
              onClick={handleResetData}
              className="text-xs text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1"
              title="Reset Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>

          {/* Active Tab View */}
          {activeTab === 'links' && (
            <DashboardLinks
              links={links}
              onAddLink={() => { setEditingLink(null); setIsLinkModalOpen(true); }}
              onEditLink={(link) => { setEditingLink(link); setIsLinkModalOpen(true); }}
              onDeleteLink={handleDeleteLink}
              onToggleActive={handleToggleActive}
              onMoveLink={handleMoveLink}
            />
          )}

          {activeTab === 'appearance' && (
            <DashboardAppearance
              profile={profile}
              setProfile={setProfile}
              currentTheme={currentTheme}
              setTheme={setCurrentTheme}
              onOpenAIBio={() => setIsAIBioOpen(true)}
            />
          )}

          {activeTab === 'analytics' && (
            <DashboardAnalytics
              links={links}
              totalViews={totalViews}
            />
          )}

        </div>

        {/* Right Sidebar: Live Mobile Preview */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24 hidden lg:flex flex-col items-center">
          <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center">
            
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-500" />
                Live Preview Mobile
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <PhonePreview
              profile={profile}
              links={links}
              theme={currentTheme}
              onLinkClick={handleLinkClickSimulation}
            />

            <button
              onClick={() => setIsPublicView(true)}
              className="mt-5 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Buka Halaman Layar Penuh</span>
            </button>

          </div>
        </div>

      </main>

      {/* Modals */}
      <LinkEditorModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onSave={handleSaveLink}
        editingLink={editingLink}
      />

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        handle={profile.handle}
      />

      <AIBioModal
        isOpen={isAIBioOpen}
        onClose={() => setIsAIBioOpen(false)}
        onSelectBio={(newBio) => setProfile(prev => ({ ...prev, bio: newBio }))}
        currentName={profile.name}
      />

    </div>
  );
}
