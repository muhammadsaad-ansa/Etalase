import React from 'react';
import { Eye, MousePointerClick, TrendingUp, Award, Globe, Smartphone, Monitor, Users, Share2 } from 'lucide-react';
import { LinkItem } from '../types';

interface DashboardAnalyticsProps {
  links: LinkItem[];
  totalViews: number;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  links,
  totalViews,
}) => {
  const totalClicks = links.reduce((acc, l) => acc + l.clicks, 0);
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

  const sortedLinks = [...links].sort((a, b) => b.clicks - a.clicks);
  const maxClicks = Math.max(...links.map(l => l.clicks), 1);

  // Simulated 7-day traffic trend
  const weeklyTraffic = [
    { day: 'Sen', views: 180, clicks: 42 },
    { day: 'Sel', views: 210, clicks: 58 },
    { day: 'Rab', views: 245, clicks: 71 },
    { day: 'Kam', views: 195, clicks: 49 },
    { day: 'Jum', views: 320, clicks: 95 },
    { day: 'Sab', views: 385, clicks: 118 },
    { day: 'Min', views: 285, clicks: 84 },
  ];

  const maxWeeklyViews = Math.max(...weeklyTraffic.map(w => w.views), 1);

  // Simulated Visitor Sources (Traffic Sources)
  const trafficSources = [
    { source: 'Instagram', percentage: 45, color: 'bg-rose-500' },
    { source: 'TikTok', percentage: 28, color: 'bg-zinc-900 dark:bg-zinc-100' },
    { source: 'WhatsApp', percentage: 15, color: 'bg-emerald-500' },
    { source: 'Direct / Lainnya', percentage: 12, color: 'bg-indigo-500' },
  ];

  // Device breakdown
  const devices = [
    { device: 'Smartphone (Mobile)', percentage: 82, icon: Smartphone, count: '1,164' },
    { device: 'Desktop / Laptop', percentage: 16, icon: Monitor, count: '228' },
    { device: 'Tablet', percentage: 2, icon: Globe, count: '28' },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Analisis & Statistik Pengunjung</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Grafik tren kunjungan, sumber traffic, perangkat, dan performa klik link Anda.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Pengunjung</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">{totalViews.toLocaleString()}</h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% minggu ini
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Klik Link</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">{totalClicks.toLocaleString()}</h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> +18.8% minggu ini
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <MousePointerClick className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Click-Through Rate (CTR)</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">{ctr}%</h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1 mt-2">
              <Award className="w-3.5 h-3.5" /> Performa sangat baik
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 7-Day Visitor Traffic Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Grafik Kunjungan 7 Hari Terakhir 📈</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tren jumlah pengunjung unik dan total klik link harian.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span> Pengunjung
            </span>
            <span className="flex items-center gap-1.5 text-violet-500">
              <span className="w-3 h-3 rounded-full bg-violet-400 inline-block"></span> Klik
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2 border-b border-slate-100 dark:border-slate-800">
          {weeklyTraffic.map((item) => {
            const heightPercent = Math.round((item.views / maxWeeklyViews) * 100);
            const clickPercent = Math.round((item.clicks / maxWeeklyViews) * 100);
            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.views}
                </div>
                <div className="w-full max-w-[36px] bg-indigo-50 dark:bg-indigo-950/50 rounded-xl overflow-hidden flex flex-col justify-end h-full relative">
                  <div
                    className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-t-xl transition-all duration-500 relative"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-violet-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${Math.round(clickPercent * 0.7)}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 font-mono mt-1">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Demographics: Traffic Sources & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Traffic Sources */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Sumber Pengunjung (Traffic Sources) 📊</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Dari platform mana saja pengunjung mengakses etalase Anda.
            </p>
          </div>

          <div className="space-y-4">
            {trafficSources.map((src) => (
              <div key={src.source} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${src.color}`}></span>
                    {src.source}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                    {src.percentage}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${src.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Perangkat Pengunjung (Devices)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Jenis perangkat yang digunakan pengunjung saat membuka halaman.
            </p>
          </div>

          <div className="space-y-4">
            {devices.map((dev) => {
              const IconComp = dev.icon;
              return (
                <div key={dev.device} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{dev.device}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{dev.count} kunjungan</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {dev.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Top Performing Links Breakdown */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Performa Klik Berdasarkan Link</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Link dengan jumlah klik terbanyak di etalase Anda.
          </p>
        </div>

        <div className="space-y-4">
          {sortedLinks.map((link, idx) => {
            const percentage = Math.round((link.clicks / maxClicks) * 100);
            return (
              <div key={link.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{link.title}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0 ml-2 tabular-nums">
                    {link.clicks} klik ({percentage}%)
                  </span>
                </div>
                
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
