'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Building2,
  TrendingUp,
  Wallet,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  FileText,
  Package,
  Star,
  MoreHorizontal,
  Plus,
  Eye,
  ChevronRight,
  Zap,
  Target,
  AlertTriangle,
  Upload,
  Download,
  Check,
  X,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Demo Data
const projectStats = [
  {
    title: 'Active Projects',
    value: '4',
    change: 12,
    icon: Building2,
    color: 'from-indigo-500 to-purple-600',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    title: 'Total Budget',
    value: '₹3.2 Cr',
    change: 8.5,
    icon: Wallet,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    title: 'Overall Progress',
    value: '68%',
    change: 5.2,
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    title: 'Pending Approvals',
    value: '7',
    change: -3,
    icon: CheckCircle,
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
  },
];

const initialProjects = [
  {
    id: 1,
    name: 'Green Valley Residency',
    status: 'in_progress',
    progress: 72,
    budget: 15000000,
    spent: 10800000,
    dueDate: '2025-03-15',
    engineer: 'Arun Verma',
    phase: 'Superstructure',
  },
  {
    id: 2,
    name: 'Sunrise Commercial Complex',
    status: 'planning',
    progress: 15,
    budget: 45000000,
    spent: 6750000,
    dueDate: '2026-01-20',
    engineer: 'Deepak Singh',
    phase: 'Foundation',
  },
  {
    id: 3,
    name: 'Lakeview Apartments',
    status: 'in_progress',
    progress: 45,
    budget: 28000000,
    spent: 12600000,
    dueDate: '2025-08-10',
    engineer: 'Priya Iyer',
    phase: 'Plinth Work',
  },
  {
    id: 4,
    name: 'Metro Office Park',
    status: 'draft',
    progress: 0,
    budget: 55000000,
    spent: 0,
    dueDate: '2026-06-30',
    engineer: 'Unassigned',
    phase: 'Planning',
  },
];

const recentActivities = [
  {
    icon: CheckCircle,
    text: 'Foundation work approved for Green Valley',
    time: '2h ago',
    color: 'text-emerald-500',
  },
  {
    icon: Package,
    text: '50 bags cement delivered to Lakeview',
    time: '4h ago',
    color: 'text-blue-500',
  },
  {
    icon: FileText,
    text: 'New quotation from ABC Steel Suppliers',
    time: '6h ago',
    color: 'text-amber-500',
  },
  {
    icon: Users,
    text: '3 new workers assigned to Sunrise Complex',
    time: '8h ago',
    color: 'text-purple-500',
  },
  {
    icon: Bot,
    text: 'AI detected potential delay risk in Lakeview',
    time: '12h ago',
    color: 'text-red-500',
  },
];

const initialApprovals = [
  {
    id: 'app-1',
    type: 'Quotation',
    item: 'Steel Rebar — ₹4.2L',
    project: 'Green Valley',
    priority: 'high',
    details: 'ABC Steel quotation for 6 tonnes Fe500D TMT bars.',
  },
  {
    id: 'app-2',
    type: 'Payment',
    item: 'Labour Charges — ₹1.8L',
    project: 'Lakeview',
    priority: 'medium',
    details: 'Weekly billing invoice for concrete crew.',
  },
  {
    id: 'app-3',
    type: 'Material',
    item: 'Cement Order — 200 bags',
    project: 'Sunrise',
    priority: 'high',
    details: 'Cement order requisition for foundation pouring.',
  },
  {
    id: 'app-4',
    type: 'Design',
    item: '2nd Floor Revision v3',
    project: 'Green Valley',
    priority: 'low',
    details: 'Floor layout changes for electrical ducts.',
  },
];

const aiInsights = [
  {
    icon: Zap,
    text: 'Budget optimization possible: Switch TMT bar supplier to save ₹1.2L',
    type: 'opportunity',
  },
  {
    icon: AlertTriangle,
    text: 'Lakeview project may face 5-day delay due to weather forecast',
    type: 'warning',
  },
  { icon: Target, text: 'Green Valley is ahead of schedule by 8 days', type: 'success' },
];

const budgetChart = [
  { month: 'Jan', planned: 25, actual: 22 },
  { month: 'Feb', planned: 32, actual: 30 },
  { month: 'Mar', planned: 38, actual: 42 },
  { month: 'Apr', planned: 45, actual: 40 },
  { month: 'May', planned: 55, actual: 52 },
  { month: 'Jun', planned: 62, actual: 58 },
  { month: 'Jul', planned: 68, actual: 65 },
];

const initialDocs = [
  {
    id: 1,
    name: 'Land_Possession_Certificate.pdf',
    type: 'land_document',
    size: '2.4 MB',
    date: '2024-01-10',
  },
  {
    id: 2,
    name: 'Soil_Bearing_Test_Report.pdf',
    type: 'survey_report',
    size: '4.8 MB',
    date: '2024-01-12',
  },
  {
    id: 3,
    name: 'Ground_Floor_Plan_v3.dwg',
    type: 'floor_plan',
    size: '12.5 MB',
    date: '2024-02-18',
  },
  {
    id: 4,
    name: 'Structural_Load_Calculations.pdf',
    type: 'government_doc',
    size: '3.1 MB',
    date: '2024-03-01',
  },
];

export default function CustomerDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';

  const [projectsList, setProjectsList] = useState(initialProjects);
  const [approvals, setApprovals] = useState(initialApprovals);
  const [docs, setDocs] = useState(initialDocs);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectBudget, setNewProjectBudget] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleApprove = (id: string) => {
    setApprovals(approvals.filter((a) => a.id !== id));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const newProj = {
      id: Date.now(),
      name: newProjectName,
      status: 'planning' as const,
      progress: 0,
      budget: Number(newProjectBudget) || 10000000,
      spent: 0,
      dueDate: new Date(Date.now() + 31536000000).toISOString().split('T')[0],
      engineer: 'Unassigned',
      phase: 'Planning',
    };
    setProjectsList([...projectsList, newProj]);
    setNewProjectName('');
    setNewProjectBudget('');
    setIsNewProjectModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ========================================================
           TAB: OVERVIEW (DEFAULT DASHBOARD)
           ======================================================== */}
        {currentSubpath === 'overview' && (
          <>
            {/* Header */}
            <div className="flex animate-fade-in flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Welcome back, Rajesh 👋
                </h1>
                <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                  Here&apos;s what&apos;s happening across your projects today.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-sm">
                  <Calendar className="h-4 w-4" /> Last 30 Days
                </button>
                <button
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="btn-primary text-sm"
                >
                  <Plus className="h-4 w-4" /> New Project
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="animate-delay-100 grid animate-fade-in grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {projectStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.title} className="premium-card group relative overflow-hidden p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <div
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
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
                    </div>
                    <p className="text-2xl font-bold text-surface-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                      {stat.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Main Grid */}
            <div className="animate-delay-200 grid animate-fade-in gap-6 lg:grid-cols-3">
              {/* Projects List */}
              <div className="premium-card lg:col-span-2">
                <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
                  <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                    My Projects
                  </h2>
                </div>
                <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
                  {projectsList.map((project) => (
                    <div
                      key={project.id}
                      className="group cursor-pointer p-5 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/30"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-surface-900 transition-colors group-hover:text-brand-500 dark:text-white">
                            {project.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-2xs font-medium ${
                                project.status === 'in_progress'
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                  : project.status === 'planning'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                    : 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400'
                              }`}
                            >
                              {project.status === 'in_progress'
                                ? 'In Progress'
                                : project.status === 'planning'
                                  ? 'Planning'
                                  : 'Draft'}
                            </span>
                            <span className="text-2xs text-surface-400">•</span>
                            <span className="text-2xs text-surface-500 dark:text-surface-400">
                              {project.phase}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 flex items-center gap-6">
                        <div>
                          <p className="mb-0.5 text-2xs text-surface-400">Budget</p>
                          <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">
                            {formatCurrency(project.budget)}
                          </p>
                        </div>
                        <div>
                          <p className="mb-0.5 text-2xs text-surface-400">Spent</p>
                          <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">
                            {formatCurrency(project.spent)}
                          </p>
                        </div>
                        <div>
                          <p className="mb-0.5 text-2xs text-surface-400">Engineer</p>
                          <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">
                            {project.engineer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="progress-bar flex-1">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="w-8 text-xs font-semibold text-surface-600 dark:text-surface-400">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* AI Insights */}
                <div className="premium-card">
                  <div className="flex items-center gap-2 border-b border-surface-200 p-5 dark:border-surface-800">
                    <div className="gradient-primary flex h-6 w-6 items-center justify-center rounded-lg">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                      AI Insights
                    </h2>
                  </div>
                  <div className="space-y-3 p-4">
                    {aiInsights.map((insight, i) => {
                      const Icon = insight.icon;
                      return (
                        <div
                          key={i}
                          className={`flex items-start gap-3 rounded-xl p-3 ${
                            insight.type === 'warning'
                              ? 'border border-amber-200 bg-amber-50 dark:border-amber-800/30 dark:bg-amber-900/10'
                              : insight.type === 'success'
                                ? 'border border-emerald-200 bg-emerald-50 dark:border-emerald-800/30 dark:bg-emerald-900/10'
                                : 'border border-blue-200 bg-blue-50 dark:border-blue-800/30 dark:bg-blue-900/10'
                          }`}
                        >
                          <Icon
                            className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                              insight.type === 'warning'
                                ? 'text-amber-500'
                                : insight.type === 'success'
                                  ? 'text-emerald-500'
                                  : 'text-blue-500'
                            }`}
                          />
                          <p className="text-xs leading-relaxed text-surface-700 dark:text-surface-300">
                            {insight.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="premium-card">
                  <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
                    <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                      Pending Approvals
                    </h2>
                    <span className="badge-warning">{approvals.length}</span>
                  </div>
                  <div className="space-y-3 p-4">
                    {approvals.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center justify-between rounded-xl border border-surface-200 bg-surface-50 p-3 transition-colors hover:border-brand-200 dark:border-surface-800/50 dark:bg-surface-800/30 dark:hover:border-brand-800"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                item.priority === 'high'
                                  ? 'bg-red-500'
                                  : item.priority === 'medium'
                                    ? 'bg-amber-500'
                                    : 'bg-blue-500'
                              }`}
                            />
                            <p className="truncate text-xs font-medium text-surface-900 dark:text-white">
                              {item.item}
                            </p>
                          </div>
                          <p className="ml-3.5 mt-0.5 text-2xs text-surface-400">
                            {item.type} • {item.project}
                          </p>
                        </div>
                        <div className="flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="rounded-md bg-emerald-500 px-2 py-1 text-2xs font-medium text-white hover:bg-emerald-600"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Chart */}
            <div className="premium-card animate-delay-300 animate-fade-in p-5">
              <h2 className="mb-6 text-base font-semibold text-surface-900 dark:text-white">
                Budget vs. Actual Expenditure
              </h2>
              <div className="flex h-48 items-end gap-4">
                {budgetChart.map((item) => (
                  <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-40 w-full items-end gap-1">
                      <div
                        className="relative flex-1 rounded-t-md bg-brand-500/20"
                        style={{ height: `${item.planned * 1.5}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 rounded-t-md bg-brand-500"
                          style={{ height: `${item.planned * 0.7}%` }}
                        />
                      </div>
                      <div
                        className="relative flex-1 rounded-t-md bg-emerald-500/20"
                        style={{ height: `${item.actual * 1.5}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 rounded-t-md bg-emerald-500"
                          style={{ height: `${item.actual * 0.7}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-2xs text-surface-400">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ========================================================
           TAB: MY PROJECTS
           ======================================================== */}
        {currentSubpath === 'projects' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Projects Tracker
                </h1>
                <p className="text-sm text-surface-500">
                  Create, monitor, and configure your structural projects.
                </p>
              </div>
              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="btn-primary text-sm"
              >
                <Plus className="h-4 w-4" /> Create Project
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {projectsList.map((project) => (
                <div key={project.id} className="premium-card flex flex-col justify-between p-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-base font-bold text-surface-900 dark:text-white">
                        {project.name}
                      </h3>
                      <span
                        className={`badge ${project.status === 'in_progress' ? 'badge-success' : 'badge-warning'}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="mb-4 text-xs text-surface-500">
                      Engineer: {project.engineer} • Target Due Date: {project.dueDate}
                    </p>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-surface-50 p-3 dark:bg-surface-800/40">
                        <p className="text-2xs text-surface-400">Total Budget</p>
                        <p className="text-sm font-bold text-surface-900 dark:text-white">
                          {formatCurrency(project.budget)}
                        </p>
                      </div>
                      <div className="rounded-xl bg-surface-50 p-3 dark:bg-surface-800/40">
                        <p className="text-2xs text-surface-400">Spent Budget</p>
                        <p className="text-sm font-bold text-surface-900 dark:text-white">
                          {formatCurrency(project.spent)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-surface-700 dark:text-surface-300">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
           TAB: DOCUMENTS
           ======================================================== */}
        {currentSubpath === 'documents' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Document Registry
                </h1>
                <p className="text-sm text-surface-500">
                  Possession deeds, architectural models, and legal approvals.
                </p>
              </div>
              <button onClick={() => setIsUploadModalOpen(true)} className="btn-primary text-sm">
                <Upload className="h-4 w-4" /> Upload Document
              </button>
            </div>

            <div className="premium-card overflow-hidden">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Filename</th>
                    <th>Classification</th>
                    <th>File Size</th>
                    <th>Date Uploaded</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc) => (
                    <tr key={doc.id}>
                      <td className="font-medium text-surface-900 dark:text-white">{doc.name}</td>
                      <td>
                        <span className="badge-info capitalize">{doc.type.replace('_', ' ')}</span>
                      </td>
                      <td className="font-mono text-xs">{doc.size}</td>
                      <td className="text-xs text-surface-500">{doc.date}</td>
                      <td className="text-right">
                        <button className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
           TAB: APPROVALS
           ======================================================== */}
        {currentSubpath === 'approvals' && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                Approval Inbox
              </h1>
              <p className="text-sm text-surface-500">
                Sign off quotations, payments, and architectural revisions.
              </p>
            </div>

            <div className="space-y-4">
              {approvals.length === 0 ? (
                <div className="premium-card p-12 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20">
                    <Check className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">
                    Inbox Clean
                  </h3>
                  <p className="mt-1 text-xs text-surface-500">
                    You have approved all pending proposals.
                  </p>
                </div>
              ) : (
                approvals.map((app) => (
                  <div
                    key={app.id}
                    className="premium-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            app.priority === 'high'
                              ? 'bg-red-500'
                              : app.priority === 'medium'
                                ? 'bg-amber-500'
                                : 'bg-blue-500'
                          }`}
                        />
                        <span className="badge-primary text-2xs font-bold uppercase">
                          {app.type}
                        </span>
                        <span className="text-xs text-surface-400">• {app.project}</span>
                      </div>
                      <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                        {app.item}
                      </h3>
                      <p className="mt-1 text-xs text-surface-500">{app.details}</p>
                    </div>
                    <div className="flex flex-shrink-0 gap-2">
                      <button
                        onClick={() => handleApprove(app.id)}
                        className="btn-primary bg-emerald-600 px-4 py-2 text-xs hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApprove(app.id)}
                        className="btn-secondary border-red-500/20 px-4 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================
           TAB: BUDGET
           ======================================================== */}
        {currentSubpath === 'budget' && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                Financial Summary
              </h1>
              <p className="text-sm text-surface-500">
                Monitor cash outflows, allocated scopes, and supplier invoices.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="premium-card p-5">
                <p className="text-2xs text-surface-400">Total Project Budget</p>
                <p className="mt-1 text-2xl font-extrabold text-surface-900 dark:text-white">
                  ₹3.20 Cr
                </p>
              </div>
              <div className="premium-card p-5">
                <p className="text-2xs text-surface-400">Total Spent to Date</p>
                <p className="mt-1 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  ₹1.75 Cr
                </p>
              </div>
              <div className="premium-card p-5">
                <p className="text-2xs text-surface-400">Remaining Balance</p>
                <p className="mt-1 text-2xl font-extrabold text-brand-500">₹1.45 Cr</p>
              </div>
            </div>

            <div className="premium-card p-6">
              <h3 className="mb-4 text-sm font-bold text-surface-900 dark:text-white">
                Cash Outflow Ledger
              </h3>
              <div className="space-y-4">
                {[
                  { tag: 'Materials', budget: '₹1.80Cr', spent: '₹1.10Cr', pct: 61 },
                  { tag: 'Contractor Labour', budget: '₹95L', spent: '₹45L', pct: 47 },
                  { tag: 'Consultation Fees', budget: '₹25L', spent: '₹15L', pct: 60 },
                  { tag: 'Permissions & Legal', budget: '₹20L', spent: '₹5L', pct: 25 },
                ].map((item) => (
                  <div key={item.tag} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-surface-700 dark:text-surface-300">
                        {item.tag}
                      </span>
                      <span className="text-surface-500">
                        Spent: {item.spent} / Budget: {item.budget} ({item.pct}%)
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
           TAB: TIMELINE
           ======================================================== */}
        {currentSubpath === 'timeline' && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                Project Milestones
              </h1>
              <p className="text-sm text-surface-500">
                Monitor structural progress phases and target completion dates.
              </p>
            </div>

            <div className="premium-card p-6">
              <div className="relative ml-4 space-y-8 border-l-2 border-brand-500/30 pl-6">
                {[
                  {
                    phase: 'Planning & Legal approvals',
                    status: 'completed',
                    desc: 'Government documents signed off, soil survey compiled.',
                    date: 'Jan 2024',
                  },
                  {
                    phase: 'Excavation & PCC foundations',
                    status: 'completed',
                    desc: 'Slab excavation finished, cement cast verified.',
                    date: 'Mar 2024',
                  },
                  {
                    phase: 'Plinth level construction',
                    status: 'completed',
                    desc: 'M20 mix casting completed, curing finished.',
                    date: 'May 2024',
                  },
                  {
                    phase: 'Superstructure framing',
                    status: 'in_progress',
                    desc: 'Column and beam casting is currently 72% complete.',
                    date: 'Jul 2024 (Active)',
                  },
                  {
                    phase: 'Plumbing & electrical conduits',
                    status: 'pending',
                    desc: 'Wiring grids and water piping installations.',
                    date: 'Oct 2024',
                  },
                  {
                    phase: 'Brick laying & finishing',
                    status: 'pending',
                    desc: 'External masonry plastering and interior paint.',
                    date: 'Dec 2024',
                  },
                ].map((m) => (
                  <div key={m.phase} className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 ${
                        m.status === 'completed'
                          ? 'border-emerald-500 bg-emerald-500'
                          : m.status === 'in_progress'
                            ? 'animate-pulse border-amber-500 bg-amber-500'
                            : 'border-surface-300 bg-white dark:border-surface-700 dark:bg-surface-900'
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-bold text-surface-900 dark:text-white">
                          {m.phase}
                        </h4>
                        <span className="font-mono text-2xs text-surface-400">{m.date}</span>
                      </div>
                      <p className="mt-1 text-xs text-surface-500">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
         MODAL: CREATE PROJECT
         ======================================================= */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsNewProjectModalOpen(false)}
          />
          <div className="relative w-full max-w-md animate-scale-in rounded-xl border border-surface-200 bg-white p-6 shadow-glass-lg dark:border-surface-800 dark:bg-surface-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-surface-900 dark:text-white">
                Create New Project
              </h3>
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="rounded-lg p-1 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Green Valley Phase 2"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  Estimated Budget (INR)
                </label>
                <input
                  type="number"
                  required
                  value={newProjectBudget}
                  onChange={(e) => setNewProjectBudget(e.target.value)}
                  placeholder="12000000"
                  className="input-field"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
         MODAL: UPLOAD DOCUMENT
         ======================================================== */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsUploadModalOpen(false)}
          />
          <div className="relative w-full max-w-md animate-scale-in rounded-xl border border-surface-200 bg-white p-6 shadow-glass-lg dark:border-surface-800 dark:bg-surface-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-surface-900 dark:text-white">
                Upload Construction Document
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="rounded-lg p-1 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-4 cursor-pointer rounded-xl border-2 border-dashed border-surface-200 p-8 text-center transition-colors hover:border-brand-500 dark:border-surface-700">
              <Upload className="mx-auto mb-2 h-8 w-8 text-surface-400" />
              <p className="text-xs text-surface-600 dark:text-surface-400">
                Drag and drop file here, or click to browse
              </p>
              <p className="mt-1 text-2xs text-surface-400">PDF, DWG, DXF up to 50MB</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsUploadModalOpen(false)} className="btn-secondary text-xs">
                Cancel
              </button>
              <button
                onClick={() => {
                  setDocs([
                    ...docs,
                    {
                      id: Date.now(),
                      name: 'Uploaded_Blueprint_Revised.dwg',
                      type: 'floor_plan',
                      size: '8.4 MB',
                      date: new Date().toISOString().split('T')[0],
                    },
                  ]);
                  setIsUploadModalOpen(false);
                }}
                className="btn-primary text-xs"
              >
                Simulate Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
