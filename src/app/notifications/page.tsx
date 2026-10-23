'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Bell, CheckCircle, Clock, Package, CreditCard, MessageSquare,
  AlertTriangle, Users, Filter, Check, Trash2, Settings
} from 'lucide-react';
import { cn, formatRelativeTime } from '@/lib/utils';

const notificationIcons: Record<string, React.ElementType> = {
  approval: CheckCircle, deadline: Clock, material: Package,
  payment: CreditCard, message: MessageSquare, attendance: Users, system: AlertTriangle,
};

const notificationColors: Record<string, string> = {
  approval: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
  deadline: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  material: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  payment: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
  attendance: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20',
  message: 'text-brand-500 bg-brand-50 dark:bg-brand-900/20',
  system: 'text-red-500 bg-red-50 dark:bg-red-900/20',
};

const allNotifications = [
  { id: '1', title: 'Material Approved', message: 'Your cement order for Green Valley project has been approved by Arun Verma.', type: 'approval', isRead: false, time: '5 min ago' },
  { id: '2', title: 'New Quotation Received', message: 'ABC Suppliers sent a quotation for TMT steel reinforcement — ₹4,20,000 for 6000 kg.', type: 'material', isRead: false, time: '15 min ago' },
  { id: '3', title: 'Deadline Reminder', message: 'Foundation work deadline is in 3 days. Current progress: 85%.', type: 'deadline', isRead: false, time: '30 min ago' },
  { id: '4', title: 'New Message from Arun', message: 'Foundation inspection scheduled for tomorrow at 10 AM.', type: 'message', isRead: false, time: '1h ago' },
  { id: '5', title: 'Worker Attendance', message: '15 out of 18 workers checked in today at Green Valley site.', type: 'attendance', isRead: true, time: '2h ago' },
  { id: '6', title: 'Payment Processed', message: '₹2,50,000 payment to XYZ Contractors completed successfully.', type: 'payment', isRead: true, time: '3h ago' },
  { id: '7', title: 'AI Alert: Weather Warning', message: 'Heavy rain predicted for next 2 days. Consider pausing outdoor concrete work.', type: 'system', isRead: true, time: '4h ago' },
  { id: '8', title: 'Design Updated', message: 'Sneha Patel uploaded a new revision (v3.2) of Ground Floor Plan.', type: 'approval', isRead: true, time: '5h ago' },
  { id: '9', title: 'Material Delivery', message: '200 bags of cement delivered to Green Valley site. Signed by site supervisor.', type: 'material', isRead: true, time: '6h ago' },
  { id: '10', title: 'Quality Inspection Passed', message: 'Block A foundation passed quality inspection. Score: 94/100.', type: 'approval', isRead: true, time: '8h ago' },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(allNotifications);

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications.filter(n => n.type === filter);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Notifications</h1>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">{notifications.filter(n => !n.isRead).length} unread notifications</p>
          </div>
          <div className="flex gap-2">
            <button onClick={markAllRead} className="btn-ghost text-sm"><Check className="w-4 h-4" /> Mark All Read</button>
            <button className="btn-ghost text-sm"><Settings className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'unread', 'approval', 'material', 'deadline', 'payment', 'message', 'system'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all capitalize', filter === f ? 'bg-brand-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200')}>
              {f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="premium-card divide-y divide-surface-100 dark:divide-surface-800/50">
          {filtered.map((notification) => {
            const Icon = notificationIcons[notification.type] || Bell;
            const colorClass = notificationColors[notification.type] || '';
            return (
              <div key={notification.id} className={cn('flex items-start gap-4 p-4 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/30 cursor-pointer', !notification.isRead && 'bg-brand-50/30 dark:bg-brand-500/5')}>
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', colorClass)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{notification.title}</p>
                    {!notification.isRead && <span className="w-2 h-2 rounded-full bg-brand-500" />}
                  </div>
                  <p className="text-xs text-surface-600 dark:text-surface-400 mt-0.5 leading-relaxed">{notification.message}</p>
                  <p className="text-2xs text-surface-400 mt-1.5">{notification.time}</p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-400 opacity-0 group-hover:opacity-100 flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
