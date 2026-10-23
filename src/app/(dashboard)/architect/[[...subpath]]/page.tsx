'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  PenTool, LayoutGrid, GitBranch, Users, Upload, MessageSquare, Bot,
  FileText, Download, Eye, Clock, CheckCircle, Plus, ChevronRight,
  ArrowUpRight, Image, Layers, Filter, Search, MoreHorizontal, Star, X
} from 'lucide-react';

const stats = [
  { title: 'Active Designs', value: '8', change: 3, icon: PenTool, color: 'from-purple-500 to-indigo-600' },
  { title: 'Floor Plans', value: '24', change: 6, icon: LayoutGrid, color: 'from-blue-500 to-cyan-600' },
  { title: 'Revisions', value: '47', change: 12, icon: GitBranch, color: 'from-amber-500 to-orange-600' },
  { title: 'Collaborations', value: '5', change: 1, icon: Users, color: 'from-emerald-500 to-teal-600' },
];

const initialDesigns = [
  { id: 1, name: 'Green Valley - Ground Floor Plan', type: 'DWG', version: 'v3.2', status: 'approved', updatedAt: '2024-07-15', comments: 8, project: 'Green Valley Residency' },
  { id: 2, name: 'Sunrise Complex - Elevation (East)', type: 'PDF', version: 'v2.1', status: 'review', updatedAt: '2024-07-14', comments: 3, project: 'Sunrise Commercial' },
  { id: 3, name: 'Lakeview - 3D Model', type: '3D', version: 'v1.5', status: 'draft', updatedAt: '2024-07-13', comments: 0, project: 'Lakeview Apartments' },
  { id: 4, name: 'Green Valley - Section Drawing A-A', type: 'DXF', version: 'v4.0', status: 'approved', updatedAt: '2024-07-12', comments: 12, project: 'Green Valley Residency' },
  { id: 5, name: 'Sunrise Complex - 1st Floor Plan', type: 'DWG', version: 'v1.8', status: 'revision', updatedAt: '2024-07-11', comments: 5, project: 'Sunrise Commercial' },
  { id: 6, name: 'Lakeview - Structural Layout', type: 'PDF', version: 'v2.3', status: 'review', updatedAt: '2024-07-10', comments: 7, project: 'Lakeview Apartments' },
];

const revisionHistory = [
  { version: 'v3.2', author: 'You', date: '15 Jul 2024', change: 'Updated window positions per engineer feedback', status: 'current' },
  { version: 'v3.1', author: 'You', date: '12 Jul 2024', change: 'Added balcony detail drawings', status: 'superseded' },
  { version: 'v3.0', author: 'You', date: '08 Jul 2024', change: 'Major revision - restructured room layout', status: 'superseded' },
  { version: 'v2.5', author: 'Sneha Patel', date: '02 Jul 2024', change: 'Interior modifications for client approval', status: 'superseded' },
];

const collaborationComments = [
  { author: 'Arun Verma', role: 'Civil Engineer', comment: 'Column positions need to align with structural grid. Please adjust C3 and C4.', time: '2h ago', avatar: 'AV' },
  { author: 'Rajesh Kumar', role: 'Customer', comment: 'Can we increase the master bedroom by 2 feet? Budget is flexible.', time: '5h ago', avatar: 'RK' },
  { author: 'AI Analysis', role: 'AI Assistant', comment: 'Ventilation score: 82/100. Consider adding a window on the south wall for cross-ventilation.', time: '6h ago', avatar: '🤖' },
];

export default function ArchitectDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';
  
  const [activeTab, setActiveTab] = useState(currentSubpath === 'overview' ? 'designs' : currentSubpath);
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
      project: 'Green Valley Residency'
    };
    setDesigns([newDesign, ...designs]);
    setUploadName('');
    setIsUploadModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Architect Portal</h1>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Manage designs, floor plans, and collaborate with your team.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">
              <Bot className="w-4 h-4" /> AI Analysis
            </button>
            <button onClick={() => setIsUploadModalOpen(true)} className="btn-primary text-sm">
              <Upload className="w-4 h-4" /> Upload Design
            </button>
          </div>
        </div>

        {/* Stats */}
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
                    <ArrowUpRight className="w-3 h-3" />{stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Design Files Tab View */}
        {(activeTab === 'designs' || activeTab === 'floor-plans') && (
          <div className="premium-card overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">Design Files</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-800/60">
                  <Search className="w-3.5 h-3.5 text-surface-400" />
                  <input type="text" placeholder="Search designs..." className="bg-transparent text-xs outline-none text-surface-700 dark:text-surface-300 w-32" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
              {designs.map((design) => (
                <div key={design.id} className="rounded-xl border border-surface-200 dark:border-surface-800 overflow-hidden hover:border-brand-200 dark:hover:border-brand-800 transition-all group cursor-pointer">
                  {/* Preview */}
                  <div className="h-36 bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-800 dark:to-surface-700 flex items-center justify-center relative">
                    <div className="grid grid-cols-4 gap-1 w-24 h-20 opacity-30">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="bg-surface-400 dark:bg-surface-500 rounded-sm" />
                      ))}
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-0.5 rounded-md text-2xs font-bold ${
                        design.type === 'DWG' ? 'bg-blue-500 text-white' :
                        design.type === 'PDF' ? 'bg-red-500 text-white' :
                        design.type === '3D' ? 'bg-purple-500 text-white' :
                        'bg-amber-500 text-white'
                      }`}>
                        {design.type}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button className="p-1.5 rounded-lg bg-white/90 dark:bg-surface-800/90 text-surface-600 hover:text-brand-500 shadow-sm">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/90 dark:bg-surface-800/90 text-surface-600 hover:text-brand-500 shadow-sm">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-white truncate group-hover:text-brand-500 transition-colors">
                      {design.name}
                    </h3>
                    <p className="text-2xs text-surface-400 mt-1">{design.project}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-mono text-surface-500">{design.version}</span>
                        <span className={`badge text-2xs ${
                          design.status === 'approved' ? 'badge-success' :
                          design.status === 'review' ? 'badge-warning' :
                          design.status === 'revision' ? 'badge-primary' : 'badge-info'
                        }`}>
                          {design.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-2xs text-surface-400">
                        <MessageSquare className="w-3 h-3" />
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
        {(activeTab === 'revisions' || activeTab === 'collaboration' || currentSubpath === 'overview') && (
          <div className="grid lg:grid-cols-2 gap-6 animate-fade-in animate-delay-100">
            {/* Revision History */}
            <div className="premium-card">
              <div className="p-5 border-b border-surface-200 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">Revision History</h2>
                <p className="text-xs text-surface-400 mt-0.5">Green Valley - Ground Floor Plan</p>
              </div>
              <div className="p-4 space-y-4">
                {revisionHistory.map((rev, i) => (
                  <div key={rev.version} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${rev.status === 'current'
                        ? 'bg-brand-500 text-white'
                        : 'bg-surface-200 dark:bg-surface-800 text-surface-500'
                        }`}>
                        {rev.version.replace('v', '')}
                      </div>
                      {i < revisionHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-surface-200 dark:bg-surface-800 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-surface-900 dark:text-white">{rev.version}</span>
                        {rev.status === 'current' && <span className="badge-success text-2xs">Current</span>}
                      </div>
                      <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5">{rev.change}</p>
                      <p className="text-2xs text-surface-400 mt-1">{rev.author} • {rev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration & Comments */}
            <div className="premium-card">
              <div className="p-5 border-b border-surface-200 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">Comments & Feedback</h2>
              </div>
              <div className="p-4 space-y-4">
                {collaborationComments.map((comment, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-surface-900 dark:text-white">{comment.author}</span>
                        <span className="text-2xs text-surface-400">{comment.role}</span>
                      </div>
                      <p className="text-xs text-surface-600 dark:text-surface-400 mt-1 leading-relaxed">{comment.comment}</p>
                      <p className="text-2xs text-surface-400 mt-1.5">{comment.time}</p>
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl p-6 shadow-glass-lg animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-surface-900 dark:text-white">Upload New Architectural Design</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUploadDesign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Design Drawing Name</label>
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
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Format Type</label>
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
                <button type="button" onClick={() => setIsUploadModalOpen(false)} className="btn-secondary text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Upload File</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
