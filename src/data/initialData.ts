import { LinkItem, ProfileData, ThemeConfig } from '../types';

export const initialProfile: ProfileData = {
  name: 'Raka Pratama',
  handle: 'rakapratama',
  bio: '✨ Content Creator, Tech Enthusiast & Digital Entrepreneur. Menjelajahi dunia teknologi, AI & kreativitas.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  isVerified: true,
  linkLayout: 1,
  socials: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    email: 'mailto:raka@example.com',
    whatsapp: 'https://wa.me/6281234567890'
  }
};

export const initialLinks: LinkItem[] = [
  {
    id: 'link-1',
    title: '🚀 E-Course Belajar AI & Prompt Engineering',
    url: 'https://example.com/e-course',
    icon: 'Sparkles',
    category: 'Produk Digital',
    description: 'Kuasai kecerdasan buatan dari dasar hingga mahir. Diskon 50% hari ini!',
    tags: ['AI', 'Belajar', 'Diskon'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=400&auto=format&fit=crop&q=80',
    isFeatured: true,
    isActive: true,
    clicks: 342,
  },
  {
    id: 'link-2',
    title: '📱 Portofolio & Jasa Pembuatan Website',
    url: 'https://example.com/portfolio',
    icon: 'Globe',
    category: 'Layanan',
    description: 'Butuh landing page atau web app modern? Mari berkolaborasi dengan saya.',
    tags: ['Jasa', 'Web', 'Freelance'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    isFeatured: true,
    isActive: true,
    clicks: 218,
  },
  {
    id: 'link-3',
    title: '📚 Rekomendasi Buku & Gadget Produktivitas',
    url: 'https://example.com/gear',
    icon: 'ShoppingBag',
    category: 'Affiliate',
    description: 'Daftar alat tempur kerja harian yang saya gunakan di meja setup.',
    tags: ['Gear', 'Setup', 'Affiliate'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
    isFeatured: false,
    isActive: true,
    clicks: 156,
  },
  {
    id: 'link-4',
    title: '🎙️ Podcast TechTalk Indonesia Episode Terbaru',
    url: 'https://example.com/podcast',
    icon: 'Headphones',
    category: 'Media',
    description: 'Diskusi santai seputar tren startup, AI, dan karir tech bersama expert.',
    tags: ['Podcast', 'Tech', 'Audio'],
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&auto=format&fit=crop&q=80',
    isFeatured: false,
    isActive: true,
    clicks: 94,
  },
  {
    id: 'link-5',
    title: '💬 Gabung Grup Telegram Diskusi Kreator',
    url: 'https://example.com/telegram',
    icon: 'MessageCircle',
    category: 'Komunitas',
    description: 'Wadah networking sesama kreator digital dan developer.',
    tags: ['Komunitas', 'Networking'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    isFeatured: false,
    isActive: true,
    clicks: 129,
  }
];

export const themes: ThemeConfig[] = [
  {
    id: 'modern-glass',
    name: 'Modern Glass',
    bgType: 'gradient',
    bgColor: 'from-slate-900 via-purple-950 to-slate-900',
    gradientClass: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950',
    cardStyle: 'glass',
    cardBg: 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15',
    cardText: 'text-white',
    buttonRadius: 'rounded-xl',
    fontFamily: 'font-sans'
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    bgType: 'gradient',
    bgColor: 'from-rose-500 via-purple-600 to-indigo-700',
    gradientClass: 'bg-gradient-to-tr from-orange-600 via-rose-600 to-purple-800',
    cardStyle: 'glass',
    cardBg: 'bg-black/25 backdrop-blur-md border border-white/15 hover:bg-black/35',
    cardText: 'text-white',
    buttonRadius: 'rounded-full',
    fontFamily: 'font-sans'
  },
  {
    id: 'minimal-light',
    name: 'Clean Minimalist',
    bgType: 'solid',
    bgColor: 'bg-slate-50',
    gradientClass: 'bg-slate-100',
    cardStyle: 'solid',
    cardBg: 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300',
    cardText: 'text-slate-900',
    buttonRadius: 'rounded-xl',
    fontFamily: 'font-sans'
  },
  {
    id: 'emerald-nature',
    name: 'Emerald Forest',
    bgType: 'gradient',
    bgColor: 'from-emerald-900 to-teal-950',
    gradientClass: 'bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950',
    cardStyle: 'glass',
    cardBg: 'bg-emerald-900/30 backdrop-blur-md border border-emerald-500/30 hover:bg-emerald-900/40',
    cardText: 'text-emerald-50',
    buttonRadius: 'rounded-xl',
    fontFamily: 'font-sans'
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    bgType: 'dark',
    bgColor: 'bg-black',
    gradientClass: 'bg-black',
    cardStyle: 'neon',
    cardBg: 'bg-zinc-900 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    cardText: 'text-cyan-300',
    buttonRadius: 'rounded-md',
    fontFamily: 'font-mono'
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel',
    bgType: 'gradient',
    bgColor: 'from-pink-100 via-purple-100 to-blue-100',
    gradientClass: 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100',
    cardStyle: 'solid',
    cardBg: 'bg-white/80 backdrop-blur-sm border border-purple-200/60 shadow-sm hover:shadow',
    cardText: 'text-purple-950',
    buttonRadius: 'rounded-full',
    fontFamily: 'font-sans'
  }
];
