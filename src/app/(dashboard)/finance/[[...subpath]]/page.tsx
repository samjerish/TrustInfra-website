'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Wallet,
  CreditCard,
  Receipt,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  CheckCircle,
  Clock,
  Download,
  Plus,
  Filter,
  Eye,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const stats = [
  {
    title: 'Total Budget',
    value: '₹14.3 Cr',
    change: 0,
    icon: Wallet,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'Total Spent',
    value: '₹8.7 Cr',
    change: -4.2,
    icon: IndianRupee,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Pending Payments',
    value: '₹45.2 L',
    change: 12,
    icon: Clock,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Savings',
    value: '₹1.8 Cr',
    change: 15,
    icon: TrendingUp,
    color: 'from-pink-500 to-rose-600',
  },
];

const recentPayments = [
  {
    id: 'PAY-001',
    to: 'ABC Steel Suppliers',
    amount: 420000,
    project: 'Green Valley',
    status: 'completed',
    date: '15 Jul 2024',
    type: 'Material',
  },
  {
    id: 'PAY-002',
    to: 'Labour Contractor (July)',
    amount: 180000,
    project: 'Lakeview',
    status: 'pending',
    date: '14 Jul 2024',
    type: 'Labour',
  },
  {
    id: 'PAY-003',
    to: 'Ready Mix Concrete Co.',
    amount: 550000,
    project: 'Sunrise',
    status: 'approved',
    date: '13 Jul 2024',
    type: 'Material',
  },
  {
    id: 'PAY-004',
    to: 'Site Engineer Salary',
    amount: 85000,
    project: 'All Projects',
    status: 'completed',
    date: '01 Jul 2024',
    type: 'Salary',
  },
  {
    id: 'PAY-005',
    to: 'XYZ Bricks & Blocks',
    amount: 200000,
    project: 'Green Valley',
    status: 'processing',
    date: '12 Jul 2024',
    type: 'Material',
  },
];

const budgetBreakdown = [
  { category: 'Materials', allocated: 8500000, spent: 5200000, pct: 61 },
  { category: 'Labour', allocated: 3200000, spent: 2100000, pct: 66 },
  { category: 'Equipment', allocated: 1200000, spent: 800000, pct: 67 },
  { category: 'Architect Fees', allocated: 500000, spent: 350000, pct: 70 },
  { category: 'Permits & Legal', allocated: 300000, spent: 200000, pct: 67 },
  { category: 'Contingency', allocated: 600000, spent: 50000, pct: 8 },
];

export default function FinanceDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex animate-fade-in flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              Finance Dashboard
            </h1>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Budget tracking, payments, and financial analytics.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="btn-primary text-sm">
              <Plus className="h-4 w-4" /> New Payment
            </button>
          </div>
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
                  {stat.change !== 0 && (
                    <span
                      className={`flex items-center gap-0.5 text-xs font-semibold ${stat.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
                    >
                      {stat.change >= 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(stat.change)}%
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="animate-delay-200 grid animate-fade-in gap-6 lg:grid-cols-3">
          {/* Payments */}
          <div className="premium-card overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                Recent Payments
              </h2>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>To</th>
                  <th>Project</th>
                  <th>Type</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{p.to}</p>
                      <p className="text-2xs text-surface-400">
                        {p.id} • {p.date}
                      </p>
                    </td>
                    <td className="text-xs">{p.project}</td>
                    <td>
                      <span className="badge-info">{p.type}</span>
                    </td>
                    <td className="text-right font-mono font-semibold">
                      {formatCurrency(p.amount)}
                    </td>
                    <td>
                      <span
                        className={`badge ${p.status === 'completed' ? 'badge-success' : p.status === 'pending' ? 'badge-warning' : p.status === 'approved' ? 'badge-primary' : 'badge-info'}`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Budget Breakdown */}
          <div className="premium-card">
            <div className="border-b border-surface-200 p-5 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                Budget Breakdown
              </h2>
            </div>
            <div className="space-y-4 p-4">
              {budgetBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-surface-700 dark:text-surface-300">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-surface-500">{item.pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-bar-fill ${item.pct > 80 ? '!bg-red-500' : item.pct > 60 ? '!bg-amber-500' : ''}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-2xs text-surface-400">
                      Spent: {formatCurrency(item.spent)}
                    </span>
                    <span className="text-2xs text-surface-400">
                      of {formatCurrency(item.allocated)}
                    </span>
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
