'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  ClipboardList, HardHat, Package, Shield, BookOpen, FileText,
  TrendingUp, AlertTriangle, Clock, CheckCircle, Plus, ChevronRight,
  ArrowUpRight, ArrowDownRight, Users, Calendar, MoreHorizontal,
  Download, Filter, Search, Eye, Edit, Trash2, BarChart3, X
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const stats = [
  { title: 'Active Projects', value: '6', change: 2, icon: ClipboardList, color: 'from-blue-500 to-indigo-600' },
  { title: 'Workers Assigned', value: '47', change: 5, icon: HardHat, color: 'from-amber-500 to-orange-600' },
  { title: 'Material Requests', value: '12', change: -2, icon: Package, color: 'from-emerald-500 to-teal-600' },
  { title: 'Quality Score', value: '94%', change: 3, icon: Shield, color: 'from-purple-500 to-pink-600' },
];

const initialBoqItems = [
  { id: 1, item: 'OPC 53 Grade Cement', unit: 'bags', qty: 2500, rate: 380, total: 950000, category: 'Concrete' },
  { id: 2, item: 'TMT Steel Fe500D (12mm)', unit: 'kg', qty: 8000, rate: 72, total: 576000, category: 'Steel' },
  { id: 3, item: 'M-Sand (Fine)', unit: 'cu.m', qty: 150, rate: 1800, total: 270000, category: 'Concrete' },
  { id: 4, item: 'Red Bricks (Standard)', unit: 'nos', qty: 45000, rate: 8, total: 360000, category: 'Masonry' },
  { id: 5, item: 'M20 Ready Mix Concrete', unit: 'cu.m', qty: 200, rate: 5500, total: 1100000, category: 'Concrete' },
  { id: 6, item: '20mm Aggregate', unit: 'cu.m', qty: 120, rate: 2200, total: 264000, category: 'Concrete' },
];

const dailyLogs = [
  { date: 'Today', weather: '☀️ Clear', workers: 18, tasks: 5, completed: 3, issues: 1 },
  { date: 'Yesterday', weather: '⛅ Partly Cloudy', workers: 16, tasks: 4, completed: 4, issues: 0 },
  { date: '14 Jul', weather: '🌧️ Light Rain', workers: 12, tasks: 3, completed: 2, issues: 2 },
  { date: '13 Jul', weather: '☀️ Clear', workers: 18, tasks: 6, completed: 5, issues: 0 },
];

const initialWorkerList = [
  { id: 1, name: 'Raju Yadav', role: 'Mason', status: 'present', task: 'Wall construction B2', phone: '+91 98765xxxxx' },
  { id: 2, name: 'Suresh Kumar', role: 'Carpenter', status: 'present', task: 'Formwork 1st floor', phone: '+91 87654xxxxx' },
  { id: 3, name: 'Mohan Lal', role: 'Electrician', status: 'absent', task: '-', phone: '+91 76543xxxxx' },
  { id: 4, name: 'Vikram Singh', role: 'Plumber', status: 'present', task: 'Drainage line B1', phone: '+91 65432xxxxx' },
  { id: 5, name: 'Karan Patel', role: 'Helper', status: 'half_day', task: 'Material transport', phone: '+91 54321xxxxx' },
];

const initialMaterialRequests = [
  { id: 'MR-001', material: 'Cement OPC 53', qty: '200 bags', project: 'Green Valley', status: 'quoted', quotes: 3 },
  { id: 'MR-002', material: 'TMT Bar 12mm', qty: '2000 kg', project: 'Lakeview', status: 'pending', quotes: 0 },
  { id: 'MR-003', material: 'River Sand', qty: '30 cu.m', project: 'Green Valley', status: 'approved', quotes: 4 },
  { id: 'MR-004', material: 'AAC Blocks', qty: '5000 nos', project: 'Sunrise', status: 'ordered', quotes: 2 },
];

export default function EngineerDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';
  
  const [activeTab, setActiveTab] = useState(currentSubpath);
  const [boqItems, setBoqItems] = useState(initialBoqItems);
  const [workerList, setWorkerList] = useState(initialWorkerList);
  const [materialRequests, setMaterialRequests] = useState(initialMaterialRequests);
  
  const [isNewBOQModalOpen, setIsNewBOQModalOpen] = useState(false);
  const [newBOQItem, setNewBOQItem] = useState('');
  const [newBOQQty, setNewBOQQty] = useState('');
  const [newBOQRate, setNewBOQRate] = useState('');
  const [newBOQCategory, setNewBOQCategory] = useState('Concrete');

  useEffect(() => {
    setActiveTab(currentSubpath);
  }, [currentSubpath]);

  const handleAddBOQItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBOQItem.trim()) return;
    const newItem = {
      id: Date.now(),
      item: newBOQItem,
      unit: 'nos',
      qty: Number(newBOQQty) || 1,
      rate: Number(newBOQRate) || 1,
      total: (Number(newBOQQty) || 1) * (Number(newBOQRate) || 1),
      category: newBOQCategory,
    };
    setBoqItems([...boqItems, newItem]);
    setNewBOQItem('');
    setNewBOQQty('');
    setNewBOQRate('');
    setIsNewBOQModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Engineer Dashboard</h1>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Manage BOQ, materials, workers, and site operations.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <button onClick={() => setIsNewBOQModalOpen(true)} className="btn-primary text-sm">
              <Plus className="w-4 h-4" /> Create BOQ
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
                  <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(stat.change)}
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
          {['overview', 'boq', 'workers', 'materials', 'logs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab
                ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
                : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                }`}
            >
              {tab === 'boq' ? 'BOQ' : tab}
            </button>
          ))}
        </div>

        {/* BOQ Table */}
        {(activeTab === 'overview' || activeTab === 'boq') && (
          <div className="premium-card overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">Bill of Quantities (BOQ)</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-800/60">
                  <Search className="w-3.5 h-3.5 text-surface-400" />
                  <input type="text" placeholder="Search items..." className="bg-transparent text-xs outline-none text-surface-700 dark:text-surface-300 w-32" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Unit</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Rate (₹)</th>
                    <th className="text-right">Total (₹)</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {boqItems.map((item) => (
                    <tr key={item.id}>
                      <td className="font-medium text-surface-900 dark:text-white">{item.item}</td>
                      <td><span className="badge-primary">{item.category}</span></td>
                      <td>{item.unit}</td>
                      <td className="text-right font-mono">{item.qty.toLocaleString()}</td>
                      <td className="text-right font-mono">{item.rate.toLocaleString()}</td>
                      <td className="text-right font-mono font-semibold text-surface-900 dark:text-white">{formatCurrency(item.total)}</td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setBoqItems(boqItems.filter(b => b.id !== item.id))} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-surface-400 hover:text-red-500">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-surface-200 dark:border-surface-700">
                    <td colSpan={5} className="font-semibold text-surface-900 dark:text-white text-right">Grand Total</td>
                    <td className="text-right font-mono font-bold text-lg text-brand-600 dark:text-brand-400">
                      {formatCurrency(boqItems.reduce((sum, item) => sum + item.total, 0))}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Workers & Daily Logs */}
        {(activeTab === 'overview' || activeTab === 'workers') && (
          <div className="grid lg:grid-cols-2 gap-6 animate-fade-in animate-delay-100">
            {/* Workers */}
            <div className="premium-card">
              <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">Workers Today</h2>
                <span className="badge-success">15/18 Present</span>
              </div>
              <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
                {workerList.map((worker, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-900 dark:text-white">{worker.name}</p>
                        <p className="text-2xs text-surface-400">{worker.role} • {worker.task}</p>
                      </div>
                    </div>
                    <select
                      value={worker.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as any;
                        setWorkerList(workerList.map(w => w.id === worker.id ? { ...w, status: newStatus } : w));
                      }}
                      className="px-2 py-1 rounded-lg text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300"
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="half_day">Half Day</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Logs */}
            <div className="premium-card">
              <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">Daily Logs</h2>
              </div>
              <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
                {dailyLogs.map((log, i) => (
                  <div key={i} className="p-4 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-surface-900 dark:text-white">{log.date}</p>
                      <span className="text-xs">{log.weather}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-center p-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                        <p className="text-lg font-bold text-surface-900 dark:text-white">{log.workers}</p>
                        <p className="text-2xs text-surface-400">Workers</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                        <p className="text-lg font-bold text-surface-900 dark:text-white">{log.tasks}</p>
                        <p className="text-2xs text-surface-400">Tasks</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/10">
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{log.completed}</p>
                        <p className="text-2xs text-surface-400">Done</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-red-50 dark:bg-red-900/10">
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">{log.issues}</p>
                        <p className="text-2xs text-surface-400">Issues</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Material Requests */}
        {(activeTab === 'overview' || activeTab === 'materials') && (
          <div className="premium-card overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">Material Requests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Material</th>
                    <th>Quantity</th>
                    <th>Project</th>
                    <th>Quotations</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="font-mono text-xs font-semibold text-brand-500">{req.id}</td>
                      <td className="font-medium text-surface-900 dark:text-white">{req.material}</td>
                      <td>{req.qty}</td>
                      <td>{req.project}</td>
                      <td>{req.quotes > 0 ? <span className="badge-primary">{req.quotes} received</span> : <span className="text-surface-400">—</span>}</td>
                      <td>
                        <span className={`badge ${
                          req.status === 'approved' ? 'badge-success' :
                          req.status === 'pending' ? 'badge-warning' :
                          req.status === 'quoted' ? 'badge-primary' : 'badge-info'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
         MODAL: CREATE BOQ ITEM
         ======================================================== */}
      {isNewBOQModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsNewBOQModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl p-6 shadow-glass-lg animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-surface-900 dark:text-white">Add BOQ Ledger Item</h3>
              <button onClick={() => setIsNewBOQModalOpen(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddBOQItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Item Description</label>
                <input
                  type="text"
                  required
                  value={newBOQItem}
                  onChange={(e) => setNewBOQItem(e.target.value)}
                  placeholder="E.g. Steel Rebars 16mm"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    value={newBOQQty}
                    onChange={(e) => setNewBOQQty(e.target.value)}
                    placeholder="1000"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Unit Rate (₹)</label>
                  <input
                    type="number"
                    required
                    value={newBOQRate}
                    onChange={(e) => setNewBOQRate(e.target.value)}
                    placeholder="75"
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Category</label>
                <select
                  value={newBOQCategory}
                  onChange={(e) => setNewBOQCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="Concrete">Concrete</option>
                  <option value="Steel">Steel & Reinforcement</option>
                  <option value="Masonry">Masonry</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsNewBOQModalOpen(false)} className="btn-secondary text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Add Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
