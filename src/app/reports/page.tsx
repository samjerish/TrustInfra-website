'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  BarChart3, Download, Calendar, FileText, Filter,
  TrendingUp, PieChart, ArrowUpRight, Plus, Eye
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const reportTypes = [
  { type: 'daily', label: 'Daily Report', count: 45, icon: '📋' },
  { type: 'weekly', label: 'Weekly Report', count: 12, icon: '📊' },
  { type: 'monthly', label: 'Monthly Report', count: 3, icon: '📈' },
  { type: 'financial', label: 'Financial Summary', count: 6, icon: '💰' },
  { type: 'completion', label: 'Completion Report', count: 1, icon: '✅' },
  { type: 'custom', label: 'Custom Report', count: 8, icon: '🔧' },
];

const recentReports = [
  { id: 1, title: 'Green Valley — Daily Progress (15 Jul)', type: 'daily', project: 'Green Valley', generatedBy: 'Arun Verma', date: '15 Jul 2024', format: 'PDF' },
  { id: 2, title: 'Weekly Financial Summary (Week 28)', type: 'weekly', project: 'All Projects', generatedBy: 'Finance Team', date: '14 Jul 2024', format: 'Excel' },
  { id: 3, title: 'Lakeview — Quality Inspection', type: 'custom', project: 'Lakeview Apartments', generatedBy: 'Priya Iyer', date: '13 Jul 2024', format: 'PDF' },
  { id: 4, title: 'Monthly Budget Report (June 2024)', type: 'monthly', project: 'All Projects', generatedBy: 'System', date: '01 Jul 2024', format: 'Excel' },
  { id: 5, title: 'Sunrise Complex — Foundation Report', type: 'completion', project: 'Sunrise Complex', generatedBy: 'Deepak Singh', date: '28 Jun 2024', format: 'PDF' },
];

const analytics = [
  { label: 'Avg. Project Duration', value: '14 months', change: -8 },
  { label: 'Cost per Sq.Ft', value: '₹1,850', change: -5 },
  { label: 'Material Wastage', value: '4.2%', change: -12 },
  { label: 'Worker Productivity', value: '87%', change: 6 },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('all');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Reports & Analytics</h1>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Generate reports, view analytics, and track KPIs.</p>
          </div>
          <button className="btn-primary text-sm"><Plus className="w-4 h-4" /> Generate Report</button>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {reportTypes.map((rt) => (
            <button key={rt.type} onClick={() => setSelectedType(rt.type)} className={`premium-card p-4 text-center group ${selectedType === rt.type ? 'ring-2 ring-brand-500' : ''}`}>
              <span className="text-2xl mb-2 block">{rt.icon}</span>
              <p className="text-xs font-semibold text-surface-900 dark:text-white">{rt.label}</p>
              <p className="text-2xs text-surface-400 mt-0.5">{rt.count} reports</p>
            </button>
          ))}
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {analytics.map((a) => (
            <div key={a.label} className="premium-card p-5">
              <p className="text-xs text-surface-500 dark:text-surface-400">{a.label}</p>
              <p className="text-xl font-bold text-surface-900 dark:text-white mt-1">{a.value}</p>
              <span className={`text-xs font-semibold ${a.change < 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {a.change < 0 ? '↓' : '↑'} {Math.abs(a.change)}% vs last quarter
              </span>
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="premium-card p-5">
          <h2 className="text-base font-semibold text-surface-900 dark:text-white mb-4">Project Performance Overview</h2>
          <div className="flex items-end gap-3 h-52">
            {[65, 72, 55, 88, 42, 78, 60, 85, 70, 92, 68, 75].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-brand-500/20 relative" style={{ height: `${val * 2}px` }}>
                  <div className="absolute bottom-0 left-0 right-0 rounded-t-md gradient-primary" style={{ height: '65%' }} />
                </div>
                <span className="text-2xs text-surface-400">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="premium-card overflow-hidden">
          <div className="p-5 border-b border-surface-200 dark:border-surface-800">
            <h2 className="text-base font-semibold text-surface-900 dark:text-white">Recent Reports</h2>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Report</th><th>Project</th><th>Type</th><th>Generated By</th><th>Date</th><th>Format</th><th className="text-right">Actions</th></tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id}>
                  <td className="font-medium text-surface-900 dark:text-white">{report.title}</td>
                  <td className="text-xs">{report.project}</td>
                  <td><span className="badge-primary capitalize">{report.type}</span></td>
                  <td className="text-xs">{report.generatedBy}</td>
                  <td className="text-xs text-surface-500">{report.date}</td>
                  <td><span className={`badge ${report.format === 'PDF' ? 'badge-danger' : 'badge-success'}`}>{report.format}</span></td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400"><Download className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
