'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  PenTool,
  LayoutGrid,
  GitBranch,
  Users,
  Upload,
  MessageSquare,
  Bot,
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle,
  Plus,
  ChevronRight,
  ArrowUpRight,
  Image,
  Layers,
  Filter,
  Search,
  MoreHorizontal,
  Star,
  X,
} from 'lucide-react';

const stats = [
  {
    title: 'Active Designs',
    value: '8',
    change: 3,
    icon: PenTool,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    title: 'Floor Plans',
    value: '24',
    change: 6,
    icon: LayoutGrid,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Revisions',
    value: '47',
    change: 12,
    icon: GitBranch,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Collaborations',
    value: '5',
    change: 1,
    icon: Users,
    color: 'from-emerald-500 to-teal-600',
  },
];

const initialDesigns = [
  {
    id: 1,
    name: 'Green Valley - Ground Floor Plan',
    type: 'DWG',
    version: 'v3.2',
    status: 'approved',
    updatedAt: '2024-07-15',
    comments: 8,
    project: 'Green Valley Residency',
  },
  {
    id: 2,
    name: 'Sunrise Complex - Elevation (East)',
    type: 'PDF',
    version: 'v2.1',
    status: 'review',
    updatedAt: '2024-07-14',
    comments: 3,
    project: 'Sunrise Commercial',
  },
  {
    id: 3,
    name: 'Lakeview - 3D Model',
    type: '3D',
    version: 'v1.5',
    status: 'draft',
    updatedAt: '2024-07-13',
    comments: 0,
    project: 'Lakeview Apartments',
  },
  {
    id: 4,
    name: 'Green Valley - Section Drawing A-A',
    type: 'DXF',
    version: 'v4.0',
    status: 'approved',
    updatedAt: '2024-07-12',
    comments: 12,
    project: 'Green Valley Residency',
  },
  {
    id: 5,
    name: 'Sunrise Complex - 1st Floor Plan',
    type: 'DWG',
    version: 'v1.8',
    status: 'revision',
    updatedAt: '2024-07-11',
    comments: 5,
    project: 'Sunrise Commercial',
  },
  {
    id: 6,
    name: 'Lakeview - Structural Layout',
    type: 'PDF',
    version: 'v2.3',
    status: 'review',
    updatedAt: '2024-07-10',
    comments: 7,
    project: 'Lakeview Apartments',
  },
];

const revisionHistory = [
  {
    version: 'v3.2',
    author: 'You',
    date: '15 Jul 2024',
    change: 'Updated window positions per engineer feedback',
    status: 'current',
  },
  {
    version: 'v3.1',
    author: 'You',
    date: '12 Jul 2024',
    change: 'Added balcony detail drawings',
    status: 'superseded',
  },
  {
    version: 'v3.0',
    author: 'You',
    date: '08 Jul 2024',
    change: 'Major revision - restructured room layout',
    status: 'superseded',
  },
  {
    version: 'v2.5',
    author: 'Sneha Patel',
    date: '02 Jul 2024',
    change: 'Interior modifications for client approval',
    status: 'superseded',
  },
];

const collaborationComments = [
  {
    author: 'Arun Verma',
    role: 'Civil Engineer',
    comment: 'Column positions need to align with structural grid. Please adjust C3 and C4.',
    time: '2h ago',
    avatar: 'AV',
  },
  {
    author: 'Rajesh Kumar',
    role: 'Customer',
    comment: 'Can we increase the master bedroom by 2 feet? Budget is flexible.',
    time: '5h ago',
    avatar: 'RK',
  },
  {
    author: 'AI Analysis',
    role: 'AI Assistant',
    comment:
      'Ventilation score: 82/100. Consider adding a window on the south wall for cross-ventilation.',
    time: '6h ago',
    avatar: '🤖',
  },
];

export default function ArchitectDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';

  const [activeTab, setActiveTab] = useState(
    currentSubpath === 'overview' ? 'designs' : currentSubpath
  );
  const [designs, setDesigns] = useState(initialDesigns);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadType, setUploadType] = useState('DWG');

  useEffect(() => {
    setActiveTab(currentSubpath === 'overview' ? 'designs' : currentSubpath);
  }, [currentSubpath]);

  const handleUploadDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) return;
    const newDesign = {
      id: Date.now(),
      name: uploadName,
      type: uploadType,
      version: 'v1.0',
      status: 'draft',
      updatedAt: new Date().toISOString().split('T')[0],
      comments: 0,
      project: 'Green Valley Residency',
    };
    setDesigns([newDesign, ...designs]);
    setUploadName('');
    setIsUploadModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex animate-fade-in flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              Architect Portal
            </h1>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Manage designs, floor plans, and collaborate with your team.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">
              <Bot className="h-4 w-4" /> AI Analysis
            </button>
            <button onClick={() => setIsUploadModalOpen(true)} className="btn-primary text-sm">
              <Upload className="h-4 w-4" /> Upload Design
            </button>
          </div>
        </div>

        {/* Stats */}
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
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Design Files Tab View */}
        {(activeTab === 'designs' || activeTab === 'floor-plans') && (
          <div className="premium-card animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                Design Files
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg bg-surface-100 px-3 py-1.5 dark:bg-surface-800/60">
                  <Search className="h-3.5 w-3.5 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search designs..."
                    className="w-32 bg-transparent text-xs text-surface-700 outline-none dark:text-surface-300"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-surface-200 transition-all hover:border-brand-200 dark:border-surface-800 dark:hover:border-brand-800"
                >
                  {/* Preview */}
                  <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-800 dark:to-surface-700">
                    <div className="grid h-20 w-24 grid-cols-4 gap-1 opacity-30">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="rounded-sm bg-surface-400 dark:bg-surface-500" />
                      ))}
                    </div>
                    <div className="absolute left-2 top-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-2xs font-bold ${
                          design.type === 'DWG'
                            ? 'bg-blue-500 text-white'
                            : design.type === 'PDF'
                              ? 'bg-red-500 text-white'
                              : design.type === '3D'
                                ? 'bg-purple-500 text-white'
                                : 'bg-amber-500 text-white'
                        }`}
                      >
                        {design.type}
                      </span>
                    </div>
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-lg bg-white/90 p-1.5 text-surface-600 shadow-sm hover:text-brand-500 dark:bg-surface-800/90">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-lg bg-white/90 p-1.5 text-surface-600 shadow-sm hover:text-brand-500 dark:bg-surface-800/90">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="truncate text-sm font-semibold text-surface-900 transition-colors group-hover:text-brand-500 dark:text-white">
                      {design.name}
                    </h3>
                    <p className="mt-1 text-2xs text-surface-400">{design.project}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-2xs text-surface-500">
                          {design.version}
                        </span>
                        <span
                          className={`badge text-2xs ${
                            design.status === 'approved'
                              ? 'badge-success'
                              : design.status === 'review'
                                ? 'badge-warning'
                                : design.status === 'revision'
                                  ? 'badge-primary'
                                  : 'badge-info'
                          }`}
                        >
                          {design.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-2xs text-surface-400">
                        <MessageSquare className="h-3 w-3" />
                        {design.comments}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revisions & Collaboration */}
        {(activeTab === 'revisions' ||
          activeTab === 'collaboration' ||
          currentSubpath === 'overview') && (
          <div className="animate-delay-100 grid animate-fade-in gap-6 lg:grid-cols-2">
            {/* Revision History */}
            <div className="premium-card">
              <div className="border-b border-surface-200 p-5 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                  Revision History
                </h2>
                <p className="mt-0.5 text-xs text-surface-400">Green Valley - Ground Floor Plan</p>
              </div>
              <div className="space-y-4 p-4">
                {revisionHistory.map((rev, i) => (
                  <div key={rev.version} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          rev.status === 'current'
                            ? 'bg-brand-500 text-white'
                            : 'bg-surface-200 text-surface-500 dark:bg-surface-800'
                        }`}
                      >
                        {rev.version.replace('v', '')}
                      </div>
                      {i < revisionHistory.length - 1 && (
                        <div className="mt-1 h-full w-0.5 bg-surface-200 dark:bg-surface-800" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-surface-900 dark:text-white">
                          {rev.version}
                        </span>
                        {rev.status === 'current' && (
                          <span className="badge-success text-2xs">Current</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-surface-600 dark:text-surface-400">
                        {rev.change}
                      </p>
                      <p className="mt-1 text-2xs text-surface-400">
                        {rev.author} • {rev.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration & Comments */}
            <div className="premium-card">
              <div className="border-b border-surface-200 p-5 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                  Comments & Feedback
                </h2>
              </div>
              <div className="space-y-4 p-4">
                {collaborationComments.map((comment, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="gradient-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-surface-900 dark:text-white">
                          {comment.author}
                        </span>
                        <span className="text-2xs text-surface-400">{comment.role}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-surface-600 dark:text-surface-400">
                        {comment.comment}
                      </p>
                      <p className="mt-1.5 text-2xs text-surface-400">{comment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
         MODAL: UPLOAD DRAWING
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
                Upload New Architectural Design
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="rounded-lg p-1 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleUploadDesign} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  Design Drawing Name
                </label>
                <input
                  type="text"
                  required
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="E.g. Front Elevation Layout"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  Format Type
                </label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="input-field"
                >
                  <option value="DWG">DWG (AutoCAD Drawing)</option>
                  <option value="DXF">DXF (Drawing Exchange Format)</option>
                  <option value="PDF">PDF (Standard Document)</option>
                  <option value="3D">3D (Autodesk Model)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
