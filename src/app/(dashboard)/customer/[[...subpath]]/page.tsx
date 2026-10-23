'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Building2, TrendingUp, Wallet, Calendar, Users, CheckCircle, Clock,
  ArrowUpRight, ArrowDownRight, Bot, FileText, Package, Star,
  MoreHorizontal, Plus, Eye, ChevronRight, Zap, Target, AlertTriangle,
  Upload, Download, Check, X, ShieldAlert, Award
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Demo Data
const projectStats = [
  { title: 'Active Projects', value: '4', change: 12, icon: Building2, color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { title: 'Total Budget', value: '₹3.2 Cr', change: 8.5, icon: Wallet, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { title: 'Overall Progress', value: '68%', change: 5.2, icon: TrendingUp, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { title: 'Pending Approvals', value: '7', change: -3, icon: CheckCircle, color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
];

const initialProjects = [
  { id: 1, name: 'Green Valley Residency', status: 'in_progress', progress: 72, budget: 15000000, spent: 10800000, dueDate: '2025-03-15', engineer: 'Arun Verma', phase: 'Superstructure' },
  { id: 2, name: 'Sunrise Commercial Complex', status: 'planning', progress: 15, budget: 45000000, spent: 6750000, dueDate: '2026-01-20', engineer: 'Deepak Singh', phase: 'Foundation' },
  { id: 3, name: 'Lakeview Apartments', status: 'in_progress', progress: 45, budget: 28000000, spent: 12600000, dueDate: '2025-08-10', engineer: 'Priya Iyer', phase: 'Plinth Work' },
  { id: 4, name: 'Metro Office Park', status: 'draft', progress: 0, budget: 55000000, spent: 0, dueDate: '2026-06-30', engineer: 'Unassigned', phase: 'Planning' },
];

const recentActivities = [
  { icon: CheckCircle, text: 'Foundation work approved for Green Valley', time: '2h ago', color: 'text-emerald-500' },
  { icon: Package, text: '50 bags cement delivered to Lakeview', time: '4h ago', color: 'text-blue-500' },
  { icon: FileText, text: 'New quotation from ABC Steel Suppliers', time: '6h ago', color: 'text-amber-500' },
  { icon: Users, text: '3 new workers assigned to Sunrise Complex', time: '8h ago', color: 'text-purple-500' },
  { icon: Bot, text: 'AI detected potential delay risk in Lakeview', time: '12h ago', color: 'text-red-500' },
];

const initialApprovals = [
  { id: 'app-1', type: 'Quotation', item: 'Steel Rebar — ₹4.2L', project: 'Green Valley', priority: 'high', details: 'ABC Steel quotation for 6 tonnes Fe500D TMT bars.' },
  { id: 'app-2', type: 'Payment', item: 'Labour Charges — ₹1.8L', project: 'Lakeview', priority: 'medium', details: 'Weekly billing invoice for concrete crew.' },
  { id: 'app-3', type: 'Material', item: 'Cement Order — 200 bags', project: 'Sunrise', priority: 'high', details: 'Cement order requisition for foundation pouring.' },
  { id: 'app-4', type: 'Design', item: '2nd Floor Revision v3', project: 'Green Valley', priority: 'low', details: 'Floor layout changes for electrical ducts.' },
];

const aiInsights = [
  { icon: Zap, text: 'Budget optimization possible: Switch TMT bar supplier to save ₹1.2L', type: 'opportunity' },
  { icon: AlertTriangle, text: 'Lakeview project may face 5-day delay due to weather forecast', type: 'warning' },
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
  { id: 1, name: 'Land_Possession_Certificate.pdf', type: 'land_document', size: '2.4 MB', date: '2024-01-10' },
  { id: 2, name: 'Soil_Bearing_Test_Report.pdf', type: 'survey_report', size: '4.8 MB', date: '2024-01-12' },
  { id: 3, name: 'Ground_Floor_Plan_v3.dwg', type: 'floor_plan', size: '12.5 MB', date: '2024-02-18' },
  { id: 4, name: 'Structural_Load_Calculations.pdf', type: 'government_doc', size: '3.1 MB', date: '2024-03-01' },
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
    setApprovals(approvals.filter(a => a.id !== id));
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
      phase: 'Planning'
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Welcome back, Rajesh 👋</h1>
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Here&apos;s what&apos;s happening across your projects today.</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-sm">
                  <Calendar className="w-4 h-4" /> Last 30 Days
                </button>
                <button onClick={() => setIsNewProjectModalOpen(true)} className="btn-primary text-sm">
                  <Plus className="w-4 h-4" /> New Project
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in animate-delay-100">
              {projectStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.title} className="premium-card p-5 relative overflow-hidden group">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stat.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(stat.change)}%
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{stat.title}</p>
                  </div>
                );
              })}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6 animate-fade-in animate-delay-200">
              {/* Projects List */}
              <div className="lg:col-span-2 premium-card">
                <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
                  <h2 className="text-base font-semibold text-surface-900 dark:text-white">My Projects</h2>
                </div>
                <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
                  {projectsList.map((project) => (
                    <div key={project.id} className="p-5 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-sm font-semibold text-surface-900 dark:text-white group-hover:text-brand-500 transition-colors">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium ${
                              project.status === 'in_progress' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                              project.status === 'planning' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                              'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                            }`}>
                              {project.status === 'in_progress' ? 'In Progress' : project.status === 'planning' ? 'Planning' : 'Draft'}
                            </span>
                            <span className="text-2xs text-surface-400">•</span>
                            <span className="text-2xs text-surface-500 dark:text-surface-400">{project.phase}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 mb-3">
                        <div>
                          <p className="text-2xs text-surface-400 mb-0.5">Budget</p>
                          <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">{formatCurrency(project.budget)}</p>
                        </div>
                        <div>
                          <p className="text-2xs text-surface-400 mb-0.5">Spent</p>
                          <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">{formatCurrency(project.spent)}</p>
                        </div>
                        <div>
                          <p className="text-2xs text-surface-400 mb-0.5">Engineer</p>
                          <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">{project.engineer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-surface-600 dark:text-surface-400 w-8">{project.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* AI Insights */}
                <div className="premium-card">
                  <div className="flex items-center gap-2 p-5 border-b border-surface-200 dark:border-surface-800">
                    <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h2 className="text-base font-semibold text-surface-900 dark:text-white">AI Insights</h2>
                  </div>
                  <div className="p-4 space-y-3">
                    {aiInsights.map((insight, i) => {
                      const Icon = insight.icon;
                      return (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${
                          insight.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30' :
                          insight.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30' :
                          'bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30'
                        }`}>
                          <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            insight.type === 'warning' ? 'text-amber-500' :
                            insight.type === 'success' ? 'text-emerald-500' : 'text-blue-500'
                          }`} />
                          <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed">{insight.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="premium-card">
                  <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
                    <h2 className="text-base font-semibold text-surface-900 dark:text-white">Pending Approvals</h2>
                    <span className="badge-warning">{approvals.length}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {approvals.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-50 dark:bg-surface-800/30 border border-surface-200 dark:border-surface-800/50 group hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                            }`} />
                            <p className="text-xs font-medium text-surface-900 dark:text-white truncate">{item.item}</p>
                          </div>
                          <p className="text-2xs text-surface-400 mt-0.5 ml-3.5">{item.type} • {item.project}</p>
                        </div>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleApprove(item.id)} className="px-2 py-1 rounded-md bg-emerald-500 text-white text-2xs font-medium hover:bg-emerald-600">
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
            <div className="premium-card p-5 animate-fade-in animate-delay-300">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white mb-6">Budget vs. Actual Expenditure</h2>
              <div className="flex items-end gap-4 h-48">
                {budgetChart.map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end gap-1 h-40">
                      <div className="flex-1 rounded-t-md bg-brand-500/20 relative" style={{ height: `${item.planned * 1.5}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 rounded-t-md bg-brand-500" style={{ height: `${item.planned * 0.7}%` }} />
                      </div>
                      <div className="flex-1 rounded-t-md bg-emerald-500/20 relative" style={{ height: `${item.actual * 1.5}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 rounded-t-md bg-emerald-500" style={{ height: `${item.actual * 0.7}%` }} />
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
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Projects Tracker</h1>
                <p className="text-sm text-surface-500">Create, monitor, and configure your structural projects.</p>
              </div>
              <button onClick={() => setIsNewProjectModalOpen(true)} className="btn-primary text-sm">
                <Plus className="w-4 h-4" /> Create Project
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projectsList.map((project) => (
                <div key={project.id} className="premium-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-base text-surface-900 dark:text-white">{project.name}</h3>
                      <span className={`badge ${project.status === 'in_progress' ? 'badge-success' : 'badge-warning'}`}>{project.status}</span>
                    </div>
                    <p className="text-xs text-surface-500 mb-4">Engineer: {project.engineer} • Target Due Date: {project.dueDate}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-3 bg-surface-50 dark:bg-surface-800/40 rounded-xl">
                        <p className="text-2xs text-surface-400">Total Budget</p>
                        <p className="text-sm font-bold text-surface-900 dark:text-white">{formatCurrency(project.budget)}</p>
                      </div>
                      <div className="p-3 bg-surface-50 dark:bg-surface-800/40 rounded-xl">
                        <p className="text-2xs text-surface-400">Spent Budget</p>
                        <p className="text-sm font-bold text-surface-900 dark:text-white">{formatCurrency(project.spent)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-surface-700 dark:text-surface-300">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
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
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Document Registry</h1>
                <p className="text-sm text-surface-500">Possession deeds, architectural models, and legal approvals.</p>
              </div>
              <button onClick={() => setIsUploadModalOpen(true)} className="btn-primary text-sm">
                <Upload className="w-4 h-4" /> Upload Document
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
                      <td><span className="badge-info capitalize">{doc.type.replace('_', ' ')}</span></td>
                      <td className="font-mono text-xs">{doc.size}</td>
                      <td className="text-xs text-surface-500">{doc.date}</td>
                      <td className="text-right">
                        <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                          <Download className="w-4 h-4" />
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Approval Inbox</h1>
              <p className="text-sm text-surface-500">Sign off quotations, payments, and architectural revisions.</p>
            </div>

            <div className="space-y-4">
              {approvals.length === 0 ? (
                <div className="premium-card p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Inbox Clean</h3>
                  <p className="text-xs text-surface-500 mt-1">You have approved all pending proposals.</p>
                </div>
              ) : (
                approvals.map((app) => (
                  <div key={app.id} className="premium-card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          app.priority === 'high' ? 'bg-red-500' : app.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                        }`} />
                        <span className="badge-primary text-2xs uppercase font-bold">{app.type}</span>
                        <span className="text-xs text-surface-400">• {app.project}</span>
                      </div>
                      <h3 className="font-bold text-sm text-surface-900 dark:text-white">{app.item}</h3>
                      <p className="text-xs text-surface-500 mt-1">{app.details}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleApprove(app.id)} className="btn-primary text-xs py-2 px-4 bg-emerald-600 hover:bg-emerald-700">
                        Approve
                      </button>
                      <button onClick={() => handleApprove(app.id)} className="btn-secondary text-xs py-2 px-4 border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Financial Summary</h1>
              <p className="text-sm text-surface-500">Monitor cash outflows, allocated scopes, and supplier invoices.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="premium-card p-5">
                <p className="text-2xs text-surface-400">Total Project Budget</p>
                <p className="text-2xl font-extrabold text-surface-900 dark:text-white mt-1">₹3.20 Cr</p>
              </div>
              <div className="premium-card p-5">
                <p className="text-2xs text-surface-400">Total Spent to Date</p>
                <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">₹1.75 Cr</p>
              </div>
              <div className="premium-card p-5">
                <p className="text-2xs text-surface-400">Remaining Balance</p>
                <p className="text-2xl font-extrabold text-brand-500 mt-1">₹1.45 Cr</p>
              </div>
            </div>

            <div className="premium-card p-6">
              <h3 className="font-bold text-sm text-surface-900 dark:text-white mb-4">Cash Outflow Ledger</h3>
              <div className="space-y-4">
                {[
                  { tag: 'Materials', budget: '₹1.80Cr', spent: '₹1.10Cr', pct: 61 },
                  { tag: 'Contractor Labour', budget: '₹95L', spent: '₹45L', pct: 47 },
                  { tag: 'Consultation Fees', budget: '₹25L', spent: '₹15L', pct: 60 },
                  { tag: 'Permissions & Legal', budget: '₹20L', spent: '₹5L', pct: 25 },
                ].map((item) => (
                  <div key={item.tag} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-surface-700 dark:text-surface-300">{item.tag}</span>
                      <span className="text-surface-500">Spent: {item.spent} / Budget: {item.budget} ({item.pct}%)</span>
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Project Milestones</h1>
              <p className="text-sm text-surface-500">Monitor structural progress phases and target completion dates.</p>
            </div>

            <div className="premium-card p-6">
              <div className="relative border-l-2 border-brand-500/30 ml-4 pl-6 space-y-8">
                {[
                  { phase: 'Planning & Legal approvals', status: 'completed', desc: 'Government documents signed off, soil survey compiled.', date: 'Jan 2024' },
                  { phase: 'Excavation & PCC foundations', status: 'completed', desc: 'Slab excavation finished, cement cast verified.', date: 'Mar 2024' },
                  { phase: 'Plinth level construction', status: 'completed', desc: 'M20 mix casting completed, curing finished.', date: 'May 2024' },
                  { phase: 'Superstructure framing', status: 'in_progress', desc: 'Column and beam casting is currently 72% complete.', date: 'Jul 2024 (Active)' },
                  { phase: 'Plumbing & electrical conduits', status: 'pending', desc: 'Wiring grids and water piping installations.', date: 'Oct 2024' },
                  { phase: 'Brick laying & finishing', status: 'pending', desc: 'External masonry plastering and interior paint.', date: 'Dec 2024' },
                ].map((m) => (
                  <div key={m.phase} className="relative">
                    <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                      m.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                      m.status === 'in_progress' ? 'bg-amber-500 border-amber-500 animate-pulse' :
                      'bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700'
                    }`} />
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-sm text-surface-900 dark:text-white">{m.phase}</h4>
                        <span className="text-2xs text-surface-400 font-mono">{m.date}</span>
                      </div>
                      <p className="text-xs text-surface-500 mt-1">{m.desc}</p>
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsNewProjectModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl p-6 shadow-glass-lg animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-surface-900 dark:text-white">Create New Project</h3>
              <button onClick={() => setIsNewProjectModalOpen(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Project Name</label>
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
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Estimated Budget (INR)</label>
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
                <button type="button" onClick={() => setIsNewProjectModalOpen(false)} className="btn-secondary text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Create Project</button>
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl p-6 shadow-glass-lg animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-surface-900 dark:text-white">Upload Construction Document</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-xl p-8 text-center hover:border-brand-500 transition-colors cursor-pointer mb-4">
              <Upload className="w-8 h-8 text-surface-400 mx-auto mb-2" />
              <p className="text-xs text-surface-600 dark:text-surface-400">Drag and drop file here, or click to browse</p>
              <p className="text-2xs text-surface-400 mt-1">PDF, DWG, DXF up to 50MB</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsUploadModalOpen(false)} className="btn-secondary text-xs">Cancel</button>
              <button onClick={() => {
                setDocs([...docs, { id: Date.now(), name: 'Uploaded_Blueprint_Revised.dwg', type: 'floor_plan', size: '8.4 MB', date: new Date().toISOString().split('T')[0] }]);
                setIsUploadModalOpen(false);
              }} className="btn-primary text-xs">Simulate Upload</button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
