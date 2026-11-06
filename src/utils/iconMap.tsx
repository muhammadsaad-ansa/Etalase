import React from 'react';
import {
  Globe,
  Sparkles,
  ShoppingBag,
  Headphones,
  MessageCircle,
  Instagram,
  Youtube,
  Github,
  Twitter,
  Linkedin,
  Send,
  Mail,
  Phone,
  Bookmark,
  ExternalLink,
  BookOpen,
  Code,
  Heart,
  Star,
  Zap,
  Video,
  Music,
  FileText,
  Briefcase
} from 'lucide-react';

export function getLinkIcon(iconName: string, className: string = "w-5 h-5") {
  switch (iconName) {
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Headphones': return <Headphones className={className} />;
    case 'MessageCircle': return <MessageCircle className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Star': return <Star className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Video': return <Video className={className} />;
    case 'Music': return <Music className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    default: return <ExternalLink className={className} />;
  }
}

export function getSocialIcon(platform: string, className: string = "w-5 h-5") {
  switch (platform) {
    case 'instagram': return <Instagram className={className} />;
    case 'tiktok': return <Video className={className} />;
    case 'youtube': return <Youtube className={className} />;
    case 'twitter': return <Twitter className={className} />;
    case 'github': return <Github className={className} />;
    case 'linkedin': return <Linkedin className={className} />;
    case 'telegram': return <Send className={className} />;
    case 'email': return <Mail className={className} />;
    case 'whatsapp': return <Phone className={className} />;
    default: return <Globe className={className} />;
  }
}
