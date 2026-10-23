'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users, Building2, TrendingUp, Shield, CreditCard, ScrollText,
  Lock, Activity, Settings, ArrowUpRight, ArrowDownRight, Plus,
  Search, Filter, Edit, Trash2, Eye, MoreHorizontal, CheckCircle,
  XCircle, AlertTriangle, Globe, Server, Database, Cpu, BarChart3, X
} from 'lucide-react';
import { ROLE_LABELS } from '@/lib/constants';

const stats = [
  { title: 'Total Users', value: '1,547', change: 12, icon: Users, color: 'from-indigo-500 to-purple-600' },
  { title: 'Active Projects', value: '89', change: 8, icon: Building2, color: 'from-emerald-500 to-teal-600' },
  { title: 'Revenue (Month)', value: '₹42.5L', change: 15, icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
  { title: 'System Uptime', value: '99.98%', change: 0.02, icon: Activity, color: 'from-pink-500 to-rose-600' },
];

const initialUsers = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'customer', status: 'active', projects: 4, joined: '15 Jan 2024' },
  { id: 2, name: 'Arun Verma', email: 'arun@buildcorp.com', role: 'engineer', status: 'active', projects: 6, joined: '20 Feb 2024' },
  { id: 3, name: 'Sneha Patel', email: 'sneha@designhub.com', role: 'architect', status: 'active', projects: 3, joined: '05 Mar 2024' },
  { id: 4, name: 'ABC Steel Suppliers', email: 'contact@abcsteel.com', role: 'dealer', status: 'active', projects: 12, joined: '10 Jan 2024' },
  { id: 5, name: 'Deepak Singh', email: 'deepak@infra.com', role: 'project_manager', status: 'inactive', projects: 8, joined: '28 Dec 2023' },
  { id: 6, name: 'Meera Finance', email: 'meera@trustinfra.com', role: 'finance', status: 'active', projects: 0, joined: '01 Apr 2024' },
];

const auditLogs = [
  { action: 'User Login', user: 'Rajesh Kumar', ip: '192.168.1.45', time: '5 min ago', level: 'info' },
  { action: 'Project Created', user: 'Arun Verma', ip: '10.0.0.12', time: '15 min ago', level: 'info' },
  { action: 'Permission Changed', user: 'Admin', ip: '192.168.1.1', time: '1h ago', level: 'warning' },
  { action: 'Failed Login Attempt', user: 'unknown@test.com', ip: '45.33.12.89', time: '2h ago', level: 'error' },
  { action: 'File Deleted', user: 'Sneha Patel', ip: '172.16.0.5', time: '3h ago', level: 'warning' },
];

const systemHealth = [
  { service: 'API Server', status: 'healthy', uptime: '99.99%', latency: '45ms', icon: Server },
  { service: 'Database', status: 'healthy', uptime: '99.98%', latency: '12ms', icon: Database },
  { service: 'AI Service', status: 'degraded', uptime: '98.5%', latency: '320ms', icon: Cpu },
  { service: 'CDN', status: 'healthy', uptime: '100%', latency: '8ms', icon: Globe },
];

const roleDistribution = [
  { role: 'customer', count: 450, pct: 29 },
  { role: 'engineer', count: 280, pct: 18 },
  { role: 'architect', count: 120, pct: 8 },
  { role: 'dealer', count: 200, pct: 13 },
  { role: 'worker', count: 380, pct: 25 },
  { role: 'supervisor', count: 50, pct: 3 },
  { role: 'project_manager', count: 40, pct: 3 },
  { role: 'finance', count: 15, pct: 1 },
  { role: 'admin', count: 12, pct: 0.8 },
];

export default function AdminDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';
  
  const [activeTab, setActiveTab] = useState(currentSubpath === 'overview' ? 'users' : currentSubpath);
  const [usersList, setUsersList] = useState(initialUsers);
  
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('customer');

  useEffect(() => {
    setActiveTab(currentSubpath === 'overview' ? 'users' : currentSubpath);
  }, [currentSubpath]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    const newUser = {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'active',
      projects: 0,
      joined: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setUsersList([...usersList, newUser]);
    setNewUserName('');
    setNewUserEmail('');
    setIsAddUserModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Platform administration and monitoring.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm"><Settings className="w-4 h-4" /> Settings</button>
            <button onClick={() => setIsAddUserModalOpen(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add User</button>
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
                    <ArrowUpRight className="w-3 h-3" />{stat.change}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-surface-100 dark:bg-surface-800/60 w-fit">
          {['users', 'analytics', 'audit', 'health'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Users */}
        {(activeTab === 'users' || currentSubpath === 'overview') && (
          <div className="premium-card overflow-hidden animate-fade-in animate-delay-200">
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">User Management</h2>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>User</th><th>Role</th><th>Status</th><th className="text-right">Projects</th><th>Joined</th><th className="text-right">Actions</th></tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-900 dark:text-white">{user.name}</p>
                          <p className="text-2xs text-surface-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-primary">{ROLE_LABELS[user.role as keyof typeof ROLE_LABELS]}</span></td>
                    <td>
                      <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="text-right font-mono">{user.projects}</td>
                    <td className="text-xs text-surface-500">{user.joined}</td>
                    <td className="text-right">
                      <button onClick={() => setUsersList(usersList.filter(u => u.id !== user.id))} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
                        ✕ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
            <div className="premium-card p-5">
              <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-4">Users by Role</h3>
              <div className="space-y-3">
                {roleDistribution.map((r) => (
                  <div key={r.role} className="flex items-center gap-3">
                    <span className="text-xs text-surface-500 w-28 truncate">{ROLE_LABELS[r.role as keyof typeof ROLE_LABELS]}</span>
                    <div className="flex-1 h-6 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="text-xs font-mono font-semibold text-surface-700 dark:text-surface-300 w-12 text-right">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="premium-card p-5">
              <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-4">Platform Growth</h3>
              <div className="flex items-end gap-2 h-48">
                {[12, 18, 25, 35, 42, 55, 68, 75, 82, 89, 95, 100].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-md bg-brand-500/20 relative flex-1" style={{ height: `${val}%` }}>
                      <div className="absolute bottom-0 left-0 right-0 rounded-t-md bg-brand-500" style={{ height: '70%' }} />
                    </div>
                    <span className="text-2xs text-surface-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs */}
        {activeTab === 'audit' && (
          <div className="premium-card overflow-hidden animate-fade-in">
            <div className="p-5 border-b border-surface-200 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">Audit Logs</h2>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${log.level === 'error' ? 'bg-red-500' : log.level === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <span className="text-sm font-medium text-surface-900 dark:text-white flex-1">{log.action}</span>
                  <span className="text-xs text-surface-500 w-32">{log.user}</span>
                  <span className="text-xs font-mono text-surface-400 w-28">{log.ip}</span>
                  <span className="text-xs text-surface-400 w-20 text-right">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Health */}
        {activeTab === 'health' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {systemHealth.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.service} className="premium-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-5 h-5 text-surface-400" />
                    <span className={`w-2.5 h-2.5 rounded-full ${svc.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{svc.service}</h3>
                  <p className={`text-xs mt-0.5 capitalize ${svc.status === 'healthy' ? 'text-emerald-500' : 'text-amber-500'}`}>{svc.status}</p>
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-surface-200 dark:border-surface-800">
                    <div>
                      <p className="text-2xs text-surface-400">Uptime</p>
                      <p className="text-xs font-semibold text-surface-900 dark:text-white">{svc.uptime}</p>
                    </div>
                    <div>
                      <p className="text-2xs text-surface-400">Latency</p>
                      <p className="text-xs font-semibold text-surface-900 dark:text-white">{svc.latency}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================
         MODAL: ADD USER
         ======================================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddUserModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl p-6 shadow-glass-lg animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-surface-900 dark:text-white">Add Platform User</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Karan Sharma"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="karan@trustinfra.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Role Allocation</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="input-field"
                >
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="btn-secondary text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Register User</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
