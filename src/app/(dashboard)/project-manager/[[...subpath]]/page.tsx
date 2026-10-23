'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Building2, Users, Calendar, Wallet, TrendingUp, Package,
  ArrowUpRight, Target, Clock, BarChart3, ChevronRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const stats = [
  { title: 'Total Projects', value: '12', change: 3, icon: Building2, color: 'from-indigo-500 to-purple-600' },
  { title: 'Team Members', value: '156', change: 12, icon: Users, color: 'from-emerald-500 to-teal-600' },
  { title: 'Budget Utilized', value: '72%', change: 5, icon: Wallet, color: 'from-amber-500 to-orange-600' },
  { title: 'On-Time Rate', value: '89%', change: 4, icon: Target, color: 'from-pink-500 to-rose-600' },
];

const projectPipeline = [
  { name: 'Green Valley', phase: 'Superstructure', progress: 72, budget: '₹1.5Cr', status: 'on_track', team: 24 },
  { name: 'Sunrise Complex', phase: 'Foundation', progress: 15, budget: '₹4.5Cr', status: 'on_track', team: 18 },
  { name: 'Lakeview Apts', phase: 'Plinth Work', progress: 45, budget: '₹2.8Cr', status: 'at_risk', team: 30 },
  { name: 'Metro Office', phase: 'Planning', progress: 5, budget: '₹5.5Cr', status: 'on_track', team: 8 },
  { name: 'Hill View Villa', phase: 'Finishing', progress: 88, budget: '₹85L', status: 'ahead', team: 12 },
];

const timeline = [
  { date: 'Today', events: ['Green Valley: Column casting B2', 'Lakeview: Plumbing inspection'] },
  { date: 'Tomorrow', events: ['Sunrise: Foundation PCC pour', 'Material delivery — 200 bags cement'] },
  { date: '18 Jul', events: ['Metro Office: Kick-off meeting', 'Hill View: Final inspection'] },
  { date: '20 Jul', events: ['Green Valley: 2nd floor slab casting'] },
];

export default function ProjectManagerDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Project Manager Dashboard</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Portfolio overview and resource management.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in animate-delay-100">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="premium-card p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />{stat.change}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in animate-delay-200">
          <div className="lg:col-span-2 premium-card">
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">Project Pipeline</h2>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
              {projectPipeline.map((p) => (
                <div key={p.name} className="p-5 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{p.name}</h3>
                      <p className="text-2xs text-surface-400">{p.phase} • {p.team} members • {p.budget}</p>
                    </div>
                    <span className={`badge ${p.status === 'on_track' ? 'badge-success' : p.status === 'at_risk' ? 'badge-warning' : 'badge-primary'}`}>
                      {p.status === 'on_track' ? 'On Track' : p.status === 'at_risk' ? 'At Risk' : 'Ahead'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-surface-600 dark:text-surface-400 w-8">{p.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card">
            <div className="flex items-center gap-2 p-5 border-b border-surface-200 dark:border-surface-800">
              <Calendar className="w-4 h-4 text-brand-500" />
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">Upcoming</h2>
            </div>
            <div className="p-4 space-y-4">
              {timeline.map((day) => (
                <div key={day.date}>
                  <p className="text-xs font-semibold text-surface-900 dark:text-white mb-2">{day.date}</p>
                  <div className="space-y-1.5">
                    {day.events.map((event, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-surface-50 dark:bg-surface-800/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <p className="text-xs text-surface-600 dark:text-surface-400">{event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
