import React, { useState, useEffect } from 'react';
import { X, Sparkles, Globe, ShoppingBag, Headphones, MessageCircle, BookOpen, Code, Star, Zap, Video, Music, FileText, Briefcase, Image as ImageIcon, Upload, Tag } from 'lucide-react';
import { LinkItem } from '../types';

interface LinkEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: LinkItem) => void;
  editingLink?: LinkItem | null;
}

const AVAILABLE_ICONS = [
  { name: 'Sparkles', label: 'Sparkles', icon: Sparkles },
  { name: 'Globe', label: 'Globe', icon: Globe },
  { name: 'ShoppingBag', label: 'Toko / Produk', icon: ShoppingBag },
  { name: 'Headphones', label: 'Audio / Podcast', icon: Headphones },
  { name: 'MessageCircle', label: 'Pesan / Komunitas', icon: MessageCircle },
  { name: 'BookOpen', label: 'Buku / Artikel', icon: BookOpen },
  { name: 'Code', label: 'Kode / Tech', icon: Code },
  { name: 'Star', label: 'Bintang / Unggulan', icon: Star },
  { name: 'Zap', label: 'Kilat / Promo', icon: Zap },
  { name: 'Video', label: 'Video', icon: Video },
  { name: 'Music', label: 'Musik', icon: Music },
  { name: 'FileText', label: 'Dokumen', icon: FileText },
  { name: 'Briefcase', label: 'Bisnis / Portofolio', icon: Briefcase },
];

const CATEGORIES = [
  'Produk Digital',
  'Layanan',
  'Affiliate',
  'Media',
  'Komunitas',
  'Sosial Media',
  'Lainnya'
];

export const LinkEditorModal: React.FC<LinkEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingLink
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Produk Digital');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [icon, setIcon] = useState('Sparkles');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setCategory(editingLink.category || 'Produk Digital');
      setDescription(editingLink.description || '');
      setTagsInput(editingLink.tags ? editingLink.tags.join(', ') : '');
      setImageUrl(editingLink.imageUrl || '');
      setIcon(editingLink.icon || 'Sparkles');
      setIsFeatured(!!editingLink.isFeatured);
      setIsActive(editingLink.isActive !== false);
    } else {
      setTitle('');
      setUrl('');
      setCategory('Produk Digital');
      setDescription('');
      setTagsInput('');
      setImageUrl('');
      setIcon('Sparkles');
      setIsFeatured(false);
      setIsActive(true);
    }
  }, [editingLink, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImageUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const linkItem: LinkItem = {
      id: editingLink ? editingLink.id : `link-${Date.now()}`,
      title: title.trim(),
      url: url.startsWith('http') ? url : `https://${url}`,
      category,
      description: description.trim(),
      tags,
      imageUrl: imageUrl.trim(),
      icon,
      isFeatured,
      isActive,
      clicks: editingLink ? editingLink.clicks : 0
    };

    onSave(linkItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {editingLink ? 'Edit Link Etalase' : 'Tambah Link Baru'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Judul Link <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: 🚀 E-Course Belajar AI & Prompt Engineering"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              URL Tujuan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="https://example.com/produk"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Deskripsi Link
            </label>
            <textarea
              rows={2}
              placeholder="Tuliskan deskripsi informatif yang akan ditampilkan di katalog..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tagging System */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-500" />
              <span>Tag Link (Pisahkan dengan koma)</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: AI, Belajar, Diskon, Web"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Link Photo / Image Upload (Gallery or File) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
              <span>Foto / Thumbnail Link</span>
            </label>
            
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="https://images.unsplash.com/... atau unggah file"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <label className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 border border-slate-200 dark:border-slate-700">
                <Upload className="w-4 h-4 text-indigo-500" />
                <span>Pilih dari Galeri</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {imageUrl && (
              <div className="mt-2 relative w-20 h-14 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                <img src={imageUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Ikon
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {AVAILABLE_ICONS.map((i) => (
                  <option key={i.name} value={i.name}>{i.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-white block">Tandai Unggulan (Featured)</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Tampilkan dengan efek sorotan spesial</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-white block">Status Aktif</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Nonaktifkan untuk menyembunyikan sementara</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/25 transition-all"
            >
              {editingLink ? 'Simpan Perubahan' : 'Tambah Link'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
