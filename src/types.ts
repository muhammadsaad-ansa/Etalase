export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string; // Lucide icon name or emoji
  category: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  isFeatured?: boolean;
  isActive: boolean;
  clicks: number;
  scheduledStart?: string;
  scheduledEnd?: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  bannerUrl?: string;
  isVerified: boolean;
  linkLayout?: 1 | 2 | 3;
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    telegram?: string;
    email?: string;
    whatsapp?: string;
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
  bgType: 'solid' | 'gradient' | 'dark' | 'image';
  bgColor: string;
  gradientClass: string;
  cardStyle: 'glass' | 'solid' | 'outline' | 'neumorphic' | 'neon';
  cardBg: string;
  cardText: string;
  buttonRadius: 'rounded-xl' | 'rounded-full' | 'rounded-md' | 'rounded-none';
  fontFamily: string;
}

export interface AnalyticsStats {
  totalViews: number;
  totalClicks: number;
  clickHistory: { date: string; clicks: number; views: number }[];
}
