import React from 'react';
import { CheckCircle2, ExternalLink, Flame } from 'lucide-react';
import { ProfileData, LinkItem, ThemeConfig } from '../types';
import { getLinkIcon, getSocialIcon } from '../utils/iconMap';

interface PhonePreviewProps {
  profile: ProfileData;
  links: LinkItem[];
  theme: ThemeConfig;
  onLinkClick?: (id: string) => void;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  profile,
  links,
  theme,
  onLinkClick
}) => {
  const activeLinks = links.filter((l) => l.isActive);

  return (
    <div className="relative mx-auto w-[320px] h-[650px] bg-slate-950 rounded-[40px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-slate-800 flex flex-col shrink-0 select-none">
      
      {/* Phone Speaker Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
        <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
      </div>

      {/* Screen Container */}
      <div className={`relative w-full h-full rounded-[30px] overflow-y-auto overflow-x-hidden flex flex-col ${theme.gradientClass} ${theme.bgColor} p-5 scrollbar-none`}>
        
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mt-6 mb-5">
          <div className="relative w-20 h-20 rounded-full p-1 bg-white/20 backdrop-blur-md shadow-md mb-3">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
            {profile.isVerified && (
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 justify-center">
            <h2 className={`text-base font-bold tracking-tight ${theme.cardText}`}>
              {profile.name}
            </h2>
          </div>
          <p className="text-xs font-mono opacity-75 mt-0.5 mb-2.5 text-slate-300">
            @{profile.handle}
          </p>

          <p className={`text-xs opacity-90 leading-relaxed max-w-[260px] ${theme.cardText}`}>
            {profile.bio}
          </p>

          {/* Social Icons Bar */}
          <div className="flex items-center justify-center gap-2.5 mt-4 flex-wrap">
            {Object.entries(profile.socials).map(([platform, url]) => {
              if (!url) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:scale-110"
                  title={platform}
                >
                  {getSocialIcon(platform, "w-4 h-4")}
                </a>
              );
            })}
          </div>
        </div>

        {/* Links List / Grid Layout */}
        <div className={`w-full flex-1 pb-6 ${
          (profile.linkLayout || 1) === 1
            ? 'flex flex-col gap-3.5'
            : (profile.linkLayout || 1) === 2
            ? 'grid grid-cols-2 gap-2.5'
            : 'grid grid-cols-3 gap-2'
        }`}>
          {activeLinks.length === 0 ? (
            <div className="col-span-full text-center py-10 opacity-60 text-xs">
              Belum ada link aktif di etalase ini.
            </div>
          ) : (
            activeLinks.map((link) => {
              const layout = profile.linkLayout || 1;
              if (layout === 1) {
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onLinkClick && onLinkClick(link.id)}
                    className={`group relative flex items-center p-3 ${theme.buttonRadius} ${theme.cardBg} transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0`}
                  >
                    {link.isFeatured && (
                      <div className="absolute -top-2 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-10">
                        <Flame className="w-2.5 h-2.5" />
                        <span>Unggulan</span>
                      </div>
                    )}

                    {/* Thumbnail Photo or Icon */}
                    {link.imageUrl ? (
                      <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/20 shrink-0 mr-3">
                        <img src={link.imageUrl} alt={link.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mr-3 text-white">
                        {getLinkIcon(link.icon, "w-5 h-5")}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 pr-2">
                      <div className={`text-xs font-semibold truncate ${theme.cardText} group-hover:underline`}>
                        {link.title}
                      </div>
                      {link.description && (
                        <div className="text-[10px] opacity-75 truncate mt-0.5 text-slate-300">
                          {link.description}
                        </div>
                      )}
                      {link.tags && link.tags.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {link.tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[9px] opacity-70 bg-white/10 px-1.5 py-0.5 rounded font-mono">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity shrink-0 text-white" />
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
                    onClick={() => onLinkClick && onLinkClick(link.id)}
                    className={`group relative flex flex-col p-2.5 ${theme.buttonRadius} ${theme.cardBg} transition-all duration-200 transform hover:-translate-y-0.5`}
                  >
                    {link.isFeatured && (
                      <div className="absolute -top-1.5 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full shadow-sm z-10">
                        ★
                      </div>
                    )}

                    {link.imageUrl ? (
                      <div className={`w-full ${layout === 2 ? 'h-16' : 'h-12'} rounded-lg overflow-hidden border border-white/20 mb-2`}>
                        <img src={link.imageUrl} alt={link.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className={`w-full ${layout === 2 ? 'h-16' : 'h-12'} rounded-lg bg-white/10 flex items-center justify-center mb-2 text-white`}>
                        {getLinkIcon(link.icon, layout === 2 ? "w-5 h-5" : "w-4 h-4")}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className={`text-[11px] font-semibold line-clamp-2 ${theme.cardText} group-hover:underline leading-tight`}>
                        {link.title}
                      </div>
                      {layout === 2 && link.description && (
                        <div className="text-[9px] opacity-75 line-clamp-1 mt-1 text-slate-300">
                          {link.description}
                        </div>
                      )}
                    </div>
                  </a>
                );
              }
            })
          )}
        </div>

        {/* Branding Footer */}
        <div className="text-center pt-2 pb-1 border-t border-white/10 mt-auto">
          <span className="text-[10px] font-medium tracking-wide opacity-60 text-slate-300">
            Powered by <strong className="font-bold">LinkVault</strong>
          </span>
        </div>

      </div>
    </div>
  );
};
