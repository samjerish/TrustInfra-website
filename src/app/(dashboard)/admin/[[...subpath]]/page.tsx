'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users,
  Building2,
  TrendingUp,
  Shield,
  CreditCard,
  ScrollText,
  Lock,
  Activity,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  Server,
  Database,
  Cpu,
  BarChart3,
  X,
} from 'lucide-react';
import { ROLE_LABELS } from '@/lib/constants';

const stats = [
  {
    title: 'Total Users',
    value: '1,547',
    change: 12,
    icon: Users,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'Active Projects',
    value: '89',
    change: 8,
    icon: Building2,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Revenue (Month)',
    value: '₹42.5L',
    change: 15,
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'System Uptime',
    value: '99.98%',
    change: 0.02,
    icon: Activity,
    color: 'from-pink-500 to-rose-600',
  },
];

const initialUsers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'customer',
    status: 'active',
    projects: 4,
    joined: '15 Jan 2024',
  },
  {
    id: 2,
    name: 'Arun Verma',
    email: 'arun@buildcorp.com',
    role: 'engineer',
    status: 'active',
    projects: 6,
    joined: '20 Feb 2024',
  },
  {
    id: 3,
    name: 'Sneha Patel',
    email: 'sneha@designhub.com',
    role: 'architect',
    status: 'active',
    projects: 3,
    joined: '05 Mar 2024',
  },
  {
    id: 4,
    name: 'ABC Steel Suppliers',
    email: 'contact@abcsteel.com',
    role: 'dealer',
    status: 'active',
    projects: 12,
    joined: '10 Jan 2024',
  },
  {
    id: 5,
    name: 'Deepak Singh',
    email: 'deepak@infra.com',
    role: 'project_manager',
    status: 'inactive',
    projects: 8,
    joined: '28 Dec 2023',
  },
  {
    id: 6,
    name: 'Meera Finance',
    email: 'meera@trustinfra.com',
    role: 'finance',
    status: 'active',
    projects: 0,
    joined: '01 Apr 2024',
  },
];

const auditLogs = [
  {
    action: 'User Login',
    user: 'Rajesh Kumar',
    ip: '192.168.1.45',
    time: '5 min ago',
    level: 'info',
  },
  {
    action: 'Project Created',
    user: 'Arun Verma',
    ip: '10.0.0.12',
    time: '15 min ago',
    level: 'info',
  },
  {
    action: 'Permission Changed',
    user: 'Admin',
    ip: '192.168.1.1',
    time: '1h ago',
    level: 'warning',
  },
  {
    action: 'Failed Login Attempt',
    user: 'unknown@test.com',
    ip: '45.33.12.89',
    time: '2h ago',
    level: 'error',
  },
  {
    action: 'File Deleted',
    user: 'Sneha Patel',
    ip: '172.16.0.5',
    time: '3h ago',
    level: 'warning',
  },
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

  const [activeTab, setActiveTab] = useState(
    currentSubpath === 'overview' ? 'users' : currentSubpath
  );
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
      joined: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
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
        <div className="flex animate-fade-in flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Platform administration and monitoring.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">
              <Settings className="h-4 w-4" /> Settings
            </button>
            <button onClick={() => setIsAddUserModalOpen(true)} className="btn-primary text-sm">
              <Plus className="h-4 w-4" /> Add User
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
                    {stat.change}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex w-fit gap-1 rounded-xl bg-surface-100 p-1 dark:bg-surface-800/60">
          {['users', 'analytics', 'audit', 'health'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-surface-900 shadow-sm dark:bg-surface-700 dark:text-white' : 'text-surface-500 hover:text-surface-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Users */}
        {(activeTab === 'users' || currentSubpath === 'overview') && (
          <div className="premium-card animate-delay-200 animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                User Management
              </h2>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">Projects</th>
                  <th>Joined</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-2xs text-surface-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge-primary">
                        {ROLE_LABELS[user.role as keyof typeof ROLE_LABELS]}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="text-right font-mono">{user.projects}</td>
                    <td className="text-xs text-surface-500">{user.joined}</td>
                    <td className="text-right">
                      <button
                        onClick={() => setUsersList(usersList.filter((u) => u.id !== user.id))}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
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
          <div className="grid animate-fade-in gap-6 lg:grid-cols-2">
            <div className="premium-card p-5">
              <h3 className="mb-4 text-base font-semibold text-surface-900 dark:text-white">
                Users by Role
              </h3>
              <div className="space-y-3">
                {roleDistribution.map((r) => (
                  <div key={r.role} className="flex items-center gap-3">
                    <span className="w-28 truncate text-xs text-surface-500">
                      {ROLE_LABELS[r.role as keyof typeof ROLE_LABELS]}
                    </span>
                    <div className="h-6 flex-1 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
                      <div
                        className="gradient-primary h-full rounded-full transition-all"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="w-12 text-right font-mono text-xs font-semibold text-surface-700 dark:text-surface-300">
                      {r.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="premium-card p-5">
              <h3 className="mb-4 text-base font-semibold text-surface-900 dark:text-white">
                Platform Growth
              </h3>
              <div className="flex h-48 items-end gap-2">
                {[12, 18, 25, 35, 42, 55, 68, 75, 82, 89, 95, 100].map((val, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="relative w-full flex-1 rounded-t-md bg-brand-500/20"
                      style={{ height: `${val}%` }}
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-t-md bg-brand-500"
                        style={{ height: '70%' }}
                      />
                    </div>
                    <span className="text-2xs text-surface-400">
                      {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs */}
        {activeTab === 'audit' && (
          <div className="premium-card animate-fade-in overflow-hidden">
            <div className="border-b border-surface-200 p-5 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                Audit Logs
              </h2>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
              {auditLogs.map((log, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/30"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${log.level === 'error' ? 'bg-red-500' : log.level === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  />
                  <span className="flex-1 text-sm font-medium text-surface-900 dark:text-white">
                    {log.action}
                  </span>
                  <span className="w-32 text-xs text-surface-500">{log.user}</span>
                  <span className="w-28 font-mono text-xs text-surface-400">{log.ip}</span>
                  <span className="w-20 text-right text-xs text-surface-400">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Health */}
        {activeTab === 'health' && (
          <div className="grid animate-fade-in gap-4 md:grid-cols-2 lg:grid-cols-4">
            {systemHealth.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.service} className="premium-card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-5 w-5 text-surface-400" />
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${svc.status === 'healthy' ? 'bg-emerald-500' : 'animate-pulse bg-amber-500'}`}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">
                    {svc.service}
                  </h3>
                  <p
                    className={`mt-0.5 text-xs capitalize ${svc.status === 'healthy' ? 'text-emerald-500' : 'text-amber-500'}`}
                  >
                    {svc.status}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-surface-200 pt-3 dark:border-surface-800">
                    <div>
                      <p className="text-2xs text-surface-400">Uptime</p>
                      <p className="text-xs font-semibold text-surface-900 dark:text-white">
                        {svc.uptime}
                      </p>
                    </div>
                    <div>
                      <p className="text-2xs text-surface-400">Latency</p>
                      <p className="text-xs font-semibold text-surface-900 dark:text-white">
                        {svc.latency}
                      </p>
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
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAddUserModalOpen(false)}
          />
          <div className="relative w-full max-w-md animate-scale-in rounded-xl border border-surface-200 bg-white p-6 shadow-glass-lg dark:border-surface-800 dark:bg-surface-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-surface-900 dark:text-white">
                Add Platform User
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="rounded-lg p-1 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  Full Name
                </label>
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
                <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  Email Address
                </label>
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
                <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  Role Allocation
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="input-field"
                >
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Register User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
