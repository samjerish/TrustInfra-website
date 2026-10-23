'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Building2,
  Users,
  Calendar,
  Wallet,
  TrendingUp,
  Package,
  ArrowUpRight,
  Target,
  Clock,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const stats = [
  {
    title: 'Total Projects',
    value: '12',
    change: 3,
    icon: Building2,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'Team Members',
    value: '156',
    change: 12,
    icon: Users,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Budget Utilized',
    value: '72%',
    change: 5,
    icon: Wallet,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'On-Time Rate',
    value: '89%',
    change: 4,
    icon: Target,
    color: 'from-pink-500 to-rose-600',
  },
];

const projectPipeline = [
  {
    name: 'Green Valley',
    phase: 'Superstructure',
    progress: 72,
    budget: '₹1.5Cr',
    status: 'on_track',
    team: 24,
  },
  {
    name: 'Sunrise Complex',
    phase: 'Foundation',
    progress: 15,
    budget: '₹4.5Cr',
    status: 'on_track',
    team: 18,
  },
  {
    name: 'Lakeview Apts',
    phase: 'Plinth Work',
    progress: 45,
    budget: '₹2.8Cr',
    status: 'at_risk',
    team: 30,
  },
  {
    name: 'Metro Office',
    phase: 'Planning',
    progress: 5,
    budget: '₹5.5Cr',
    status: 'on_track',
    team: 8,
  },
  {
    name: 'Hill View Villa',
    phase: 'Finishing',
    progress: 88,
    budget: '₹85L',
    status: 'ahead',
    team: 12,
  },
];

const timeline = [
  { date: 'Today', events: ['Green Valley: Column casting B2', 'Lakeview: Plumbing inspection'] },
  {
    date: 'Tomorrow',
    events: ['Sunrise: Foundation PCC pour', 'Material delivery — 200 bags cement'],
  },
  { date: '18 Jul', events: ['Metro Office: Kick-off meeting', 'Hill View: Final inspection'] },
  { date: '20 Jul', events: ['Green Valley: 2nd floor slab casting'] },
];

export default function ProjectManagerDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            Project Manager Dashboard
          </h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Portfolio overview and resource management.
          </p>
        </div>

        <div className="animate-delay-100 grid animate-fade-in grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="premium-card group p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="animate-delay-200 grid animate-fade-in gap-6 lg:grid-cols-3">
          <div className="premium-card lg:col-span-2">
            <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                Project Pipeline
              </h2>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
              {projectPipeline.map((p) => (
                <div
                  key={p.name}
                  className="cursor-pointer p-5 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/30"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-surface-900 dark:text-white">
                        {p.name}
                      </h3>
                      <p className="text-2xs text-surface-400">
                        {p.phase} • {p.team} members • {p.budget}
                      </p>
                    </div>
                    <span
                      className={`badge ${p.status === 'on_track' ? 'badge-success' : p.status === 'at_risk' ? 'badge-warning' : 'badge-primary'}`}
                    >
                      {p.status === 'on_track'
                        ? 'On Track'
                        : p.status === 'at_risk'
                          ? 'At Risk'
                          : 'Ahead'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="progress-bar flex-1">
                      <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="w-8 text-xs font-semibold text-surface-600 dark:text-surface-400">
                      {p.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card">
            <div className="flex items-center gap-2 border-b border-surface-200 p-5 dark:border-surface-800">
              <Calendar className="h-4 w-4 text-brand-500" />
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">Upcoming</h2>
            </div>
            <div className="space-y-4 p-4">
              {timeline.map((day) => (
                <div key={day.date}>
                  <p className="mb-2 text-xs font-semibold text-surface-900 dark:text-white">
                    {day.date}
                  </p>
                  <div className="space-y-1.5">
                    {day.events.map((event, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg bg-surface-50 p-2 dark:bg-surface-800/30"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
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
