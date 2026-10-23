'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  HardHat,
  CheckSquare,
  Clock,
  Shield,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Users,
  MapPin,
  Camera,
  FileText,
  ThermometerSun,
} from 'lucide-react';

const stats = [
  {
    title: 'Workers On-Site',
    value: '42/50',
    change: 84,
    icon: HardHat,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Tasks Completed',
    value: '18/24',
    change: 75,
    icon: CheckSquare,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Safety Score',
    value: '96%',
    change: 2,
    icon: Shield,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Quality Index',
    value: '92%',
    change: 5,
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-600',
  },
];

const siteZones = [
  {
    zone: 'Block A - Ground Floor',
    workers: 12,
    status: 'active',
    task: 'Brick laying & plastering',
  },
  { zone: 'Block A - 1st Floor', workers: 8, status: 'active', task: 'Column reinforcement' },
  { zone: 'Block B - Foundation', workers: 15, status: 'active', task: 'Excavation & PCC' },
  { zone: 'Block C - Parking', workers: 5, status: 'paused', task: 'Awaiting material delivery' },
  { zone: 'Common Area', workers: 2, status: 'inspection', task: 'Quality check - drainage' },
];

const safetyIssues = [
  {
    issue: 'Missing safety harness — worker #23, Block A 1st Floor',
    severity: 'high',
    time: '30 min ago',
  },
  { issue: 'Exposed wiring near water source — Block B', severity: 'critical', time: '1h ago' },
  { issue: 'Hard hat compliance check needed — Block C crew', severity: 'medium', time: '2h ago' },
];

export default function SupervisorDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            Site Supervisor Dashboard
          </h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Green Valley Residency • Real-time site overview
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
            <div className="border-b border-surface-200 p-5 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                Site Zones
              </h2>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
              {siteZones.map((zone) => (
                <div
                  key={zone.zone}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${zone.status === 'active' ? 'animate-pulse bg-emerald-500' : zone.status === 'paused' ? 'bg-amber-500' : 'bg-blue-500'}`}
                    />
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-white">
                        {zone.zone}
                      </p>
                      <p className="text-2xs text-surface-400">{zone.task}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-surface-500">
                      <Users className="h-3 w-3" /> {zone.workers}
                    </div>
                    <span
                      className={`badge ${zone.status === 'active' ? 'badge-success' : zone.status === 'paused' ? 'badge-warning' : 'badge-info'}`}
                    >
                      {zone.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card">
            <div className="flex items-center gap-2 border-b border-surface-200 p-5 dark:border-surface-800">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                Safety Alerts
              </h2>
            </div>
            <div className="space-y-3 p-4">
              {safetyIssues.map((issue, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-3 ${
                    issue.severity === 'critical'
                      ? 'border-red-200 bg-red-50 dark:border-red-800/30 dark:bg-red-900/10'
                      : issue.severity === 'high'
                        ? 'border-amber-200 bg-amber-50 dark:border-amber-800/30 dark:bg-amber-900/10'
                        : 'border-blue-200 bg-blue-50 dark:border-blue-800/30 dark:bg-blue-900/10'
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${issue.severity === 'critical' ? 'bg-red-500' : issue.severity === 'high' ? 'bg-amber-500' : 'bg-blue-500'}`}
                    />
                    <span
                      className={`text-2xs font-bold uppercase ${issue.severity === 'critical' ? 'text-red-500' : issue.severity === 'high' ? 'text-amber-500' : 'text-blue-500'}`}
                    >
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-xs text-surface-700 dark:text-surface-300">{issue.issue}</p>
                  <p className="mt-1 text-2xs text-surface-400">{issue.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
