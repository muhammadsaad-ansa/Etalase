import React, { useState } from 'react';
import { Plus, Edit3, Trash2, ArrowUp, ArrowDown, Eye, Flame, Tag, Filter } from 'lucide-react';
import { LinkItem } from '../types';
import { getLinkIcon } from '../utils/iconMap';

interface DashboardLinksProps {
  links: LinkItem[];
  onAddLink: () => void;
  onEditLink: (link: LinkItem) => void;
  onDeleteLink: (id: string) => void;
  onToggleActive: (id: string) => void;
  onMoveLink: (index: number, direction: 'up' | 'down') => void;
}

export const DashboardLinks: React.FC<DashboardLinksProps> = ({
  links,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onToggleActive,
  onMoveLink,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Collect all unique tags
  const allTags = Array.from(
    new Set(links.flatMap((l) => l.tags || []))
  );

  const filteredLinks = links.filter((l) => {
    if (selectedTag === 'all') return true;
    return l.tags && l.tags.includes(selectedTag);
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kelola Etalase Link</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Tambah, atur urutan, deskripsi, tag, dan foto untuk setiap link di katalog Anda.
          </p>
        </div>
        <button
          onClick={onAddLink}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Link Baru</span>
        </button>
      </div>

      {/* Tag Filtering Bar */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Tag:</span>
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedTag === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Semua ({links.length})
          </button>
          {allTags.map((tag) => {
            const count = links.filter((l) => l.tags && l.tags.includes(tag)).length;
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Tag className="w-3 h-3 opacity-70" />
                <span>{tag} ({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Links List */}
      <div className="space-y-3">
        {filteredLinks.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Tidak ada link dengan tag "{selectedTag}".</p>
            <button
              onClick={() => setSelectedTag('all')}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filteredLinks.map((link, index) => {
            const originalIndex = links.findIndex(l => l.id === link.id);
            return (
              <div
                key={link.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border ${
                  link.isFeatured
                    ? 'border-indigo-300 dark:border-indigo-700 shadow-md shadow-indigo-500/5'
                    : 'border-slate-200 dark:border-slate-800'
                } p-4 sm:p-5 flex items-center justify-between gap-4 transition-all hover:shadow-md`}
              >
                
                {/* Left Info */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <div className="flex flex-col gap-1 text-slate-400 pt-2 sm:pt-0">
                    <button
                      onClick={() => onMoveLink(originalIndex, 'up')}
                      disabled={originalIndex === 0}
                      aria-label="Pindahkan ke atas"
                      className="hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30 transition-colors"
                      title="Pindahkan ke atas"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onMoveLink(originalIndex, 'down')}
                      disabled={originalIndex === links.length - 1}
                      aria-label="Pindahkan ke bawah"
                      className="hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30 transition-colors"
                      title="Pindahkan ke bawah"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Thumbnail Image or Icon */}
                  {link.imageUrl ? (
                    <div className="w-14 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                      <img src={link.imageUrl} alt={link.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      {getLinkIcon(link.icon, "w-5 h-5")}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {link.title}
                      </h3>
                      <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                        {link.category}
                      </span>
                      {link.isFeatured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-md flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          Unggulan
                        </span>
                      )}
                    </div>

                    {link.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">
                        {link.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-400 font-mono truncate max-w-[220px]">
                        {link.url}
                      </span>
                      {link.tags && link.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {link.tags.map((t) => (
                            <span key={t} className="text-[10px] bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md font-medium">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Stats & Actions */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex flex-col items-end text-right">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-indigo-500" />
                      {link.clicks} klik
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Total Pengunjung</span>
                  </div>

                  {/* Active Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={link.isActive}
                      onChange={() => onToggleActive(link.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>

                  <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
                    <button
                      onClick={() => onEditLink(link)}
                      aria-label={`Edit link ${link.title}`}
                      className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      title="Edit Link"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteLink(link.id)}
                      aria-label={`Hapus link ${link.title}`}
                      className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Hapus Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
