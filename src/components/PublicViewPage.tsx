import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ExternalLink, Flame, Share2, Check, Tag, Filter, Search } from 'lucide-react';
import { ProfileData, LinkItem, ThemeConfig } from '../types';
import { getLinkIcon, getSocialIcon } from '../utils/iconMap';

interface PublicViewPageProps {
  profile: ProfileData;
  links: LinkItem[];
  theme: ThemeConfig;
  onBackToDashboard: () => void;
  onLinkClick: (id: string) => void;
}

export const PublicViewPage: React.FC<PublicViewPageProps> = ({
  profile,
  links,
  theme,
  onBackToDashboard,
  onLinkClick,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedShare, setCopiedShare] = useState(false);

  const activeLinks = links.filter((l) => l.isActive);
  const allTags = Array.from(new Set(activeLinks.flatMap((l) => l.tags || [])));

  const filteredLinks = activeLinks.filter((l) => {
    // Tag filter
    const matchesTag = selectedTag === 'all' || (l.tags && l.tags.includes(selectedTag));
    
    // Search query filter
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesTag;

    const matchesTitle = l.title.toLowerCase().includes(query);
    const matchesDesc = l.description?.toLowerCase().includes(query) || false;
    const matchesCategory = l.category.toLowerCase().includes(query);
    const matchesTags = l.tags?.some(t => t.toLowerCase().includes(query)) || false;

    return matchesTag && (matchesTitle || matchesDesc || matchesCategory || matchesTags);
  });

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Etalase Link - ${profile.name}`,
          text: profile.bio,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (err) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      } catch (e) {
        prompt('Salin link etalase Anda:', shareUrl);
      }
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-between p-6 sm:p-10 ${theme.gradientClass} ${theme.bgColor} transition-colors relative`}>
      
      {/* Top Navigation / Actions */}
      <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-xl text-xs font-semibold shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar ke Dashboard</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl text-xs font-semibold shadow-lg transition-all"
          title="Bagikan Etalase"
        >
          {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          <span>{copiedShare ? 'Link Tersalin!' : 'Bagikan Etalase'}</span>
        </button>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-lg mx-auto flex flex-col items-center flex-1 my-auto py-16">
        
        {/* Profile Avatar & Info */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-24 h-24 rounded-full p-1 bg-white/20 backdrop-blur-md shadow-xl mb-4">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
            {profile.isVerified && (
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-md">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>

          <h1 className={`text-xl font-bold tracking-tight ${theme.cardText} mb-1 flex items-center gap-2`}>
            {profile.name}
          </h1>
          <p className="text-xs font-mono opacity-80 mb-3 text-slate-300">
            @{profile.handle}
          </p>

          <p className={`text-sm opacity-90 leading-relaxed max-w-sm ${theme.cardText} px-4`}>
            {profile.bio}
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
            {Object.entries(profile.socials).map(([platform, url]) => {
              if (!url) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-sm"
                  title={platform}
                >
                  {getSocialIcon(platform, "w-5 h-5")}
                </a>
              );
            })}
          </div>
        </div>

        {/* Search Bar & Tag Filter */}
        <div className="w-full px-2 space-y-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60 text-white" />
            <input
              type="text"
              placeholder="Cari link, kategori, atau tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder-white/60 text-xs focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-center flex-wrap">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedTag === 'all'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md'
                }`}
              >
                Semua
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                    selectedTag === tag
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md'
                  }`}
                >
                  <span>#{tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Links Stack / Grid Layout */}
        <div className={`w-full px-2 ${
          (profile.linkLayout || 1) === 1
            ? 'flex flex-col gap-4'
            : (profile.linkLayout || 1) === 2
            ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
        }`}>
          {filteredLinks.length === 0 ? (
            <div className="col-span-full text-center py-12 opacity-70 text-sm text-white">
              Tidak ada link yang sesuai dengan pencarian Anda.
            </div>
          ) : (
            filteredLinks.map((link) => {
              const layout = profile.linkLayout || 1;
              if (layout === 1) {
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onLinkClick(link.id)}
                    className={`group relative flex items-center p-4 sm:p-4.5 ${theme.buttonRadius} ${theme.cardBg} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
                  >
                    {link.isFeatured && (
                      <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                        <Flame className="w-3 h-3" />
                        <span>Unggulan</span>
                      </div>
                    )}

                    {/* Thumbnail Image or Icon */}
                    {link.imageUrl ? (
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 mr-4 shadow-sm">
                        <img src={link.imageUrl} alt={link.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mr-4 text-white shadow-inner">
                        {getLinkIcon(link.icon, "w-6 h-6")}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 pr-2">
                      <div className={`text-sm font-bold truncate ${theme.cardText} group-hover:underline`}>
                        {link.title}
                      </div>
                      {link.description && (
                        <div className="text-xs opacity-80 mt-0.5 text-slate-200 line-clamp-2 leading-relaxed">
                          {link.description}
                        </div>
                      )}
                      {link.tags && link.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          {link.tags.map((t) => (
                            <span key={t} className="text-[10px] opacity-80 bg-white/15 px-2 py-0.5 rounded font-mono text-white">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity shrink-0 text-white" />
                  </a>
                );
              } else {
                // Grid layout (2 or 3 columns)
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onLinkClick(link.id)}
                    className={`group relative flex flex-col p-4 ${theme.buttonRadius} ${theme.cardBg} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
                  >
                    {link.isFeatured && (
                      <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                        <Flame className="w-2.5 h-2.5" />
                        <span>Unggulan</span>
                      </div>
                    )}

                    {link.imageUrl ? (
                      <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden border border-white/20 mb-3 shadow-sm">
                        <img src={link.imageUrl} alt={link.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    ) : (
                      <div className="w-full h-20 rounded-xl bg-white/10 flex items-center justify-center mb-3 text-white shadow-inner">
                        {getLinkIcon(link.icon, "w-8 h-8")}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className={`text-sm font-bold line-clamp-2 ${theme.cardText} group-hover:underline leading-snug mb-1`}>
                          {link.title}
                        </div>
                        {link.description && (
                          <div className="text-xs opacity-80 text-slate-200 line-clamp-2 leading-relaxed">
                            {link.description}
                          </div>
                        )}
                      </div>

                      {link.tags && link.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                          {link.tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[10px] opacity-80 bg-white/15 px-2 py-0.5 rounded font-mono text-white">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </a>
                );
              }
            })
          )}
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-white/10 mt-auto">
        <p className="text-xs font-medium tracking-wide opacity-60 text-slate-300">
          Dibuat dengan <strong className="font-bold text-white">LinkVault Studio</strong> · Platform Etalase Link Profesional
        </p>
      </footer>

    </div>
  );
};
