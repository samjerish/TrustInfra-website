'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Clock, CheckSquare, Camera, Wallet, MapPin, Upload,
  ArrowUpRight, CheckCircle, Circle, AlertCircle, IndianRupee
} from 'lucide-react';

const initialTodayTasks = [
  { id: 1, title: 'Complete wall plastering - Block A, 2nd Floor', priority: 'high', status: 'in_progress', time: '08:00 - 12:00' },
  { id: 2, title: 'Brick laying - Block B, Ground Floor (North Wall)', priority: 'medium', status: 'pending', time: '12:30 - 16:00' },
  { id: 3, title: 'Clean debris from staircase area', priority: 'low', status: 'completed', time: '16:00 - 17:00' },
  { id: 4, title: 'Assist electrician with conduit laying', priority: 'medium', status: 'pending', time: '17:00 - 18:00' },
];

const weeklyAttendance = [
  { day: 'Mon', status: 'present', hours: '8h' },
  { day: 'Tue', status: 'present', hours: '9h' },
  { day: 'Wed', status: 'present', hours: '8h' },
  { day: 'Thu', status: 'half_day', hours: '4h' },
  { day: 'Fri', status: 'present', hours: '8h' },
  { day: 'Sat', status: 'present', hours: '7h' },
  { day: 'Sun', status: 'leave', hours: '-' },
];

const salaryBreakdown = [
  { label: 'Base Salary', amount: 18000 },
  { label: 'Overtime (12hrs)', amount: 3600 },
  { label: 'Allowances', amount: 2000 },
  { label: 'Deductions', amount: -1500 },
];

export default function WorkerDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';
  
  const [checkedIn, setCheckedIn] = useState(true);
  const [tasks, setTasks] = useState(initialTodayTasks);

  const handleTaskStatusChange = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'pending' ? 'in_progress' : t.status === 'in_progress' ? 'completed' : 'pending';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Good Morning, Raju 🔨</h1>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Green Valley Residency • Block A • 2nd Floor</p>
          </div>
          <button
            onClick={() => setCheckedIn(!checkedIn)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${checkedIn
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
              }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            {checkedIn ? 'Check Out' : 'Check In'}
          </button>
        </div>

        {/* Status Banner */}
        {checkedIn && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 flex items-center gap-3 animate-fade-in">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Checked in at 08:15 AM</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Working for 4h 23m • Green Valley Site</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-3 h-3" /> GPS Verified
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in animate-delay-100">
          {/* Today's Tasks */}
          <div className="lg:col-span-2 premium-card">
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">Today&apos;s Tasks</h2>
              <span className="text-xs text-surface-400">{tasks.filter(t => t.status === 'completed').length}/{tasks.length} completed</span>
            </div>
            <div className="p-4 space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${
                  task.status === 'completed'
                    ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30'
                    : task.status === 'in_progress'
                      ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30'
                      : 'bg-white dark:bg-surface-800/30 border-surface-200 dark:border-surface-800'
                  }`}>
                  <button onClick={() => handleTaskStatusChange(task.id)} className="mt-0.5 flex-shrink-0">
                    {task.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : task.status === 'in_progress' ? (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-surface-300 dark:text-surface-600" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-surface-400' : 'text-surface-900 dark:text-white'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-2xs text-surface-400">{task.time}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-2xs text-surface-400 capitalize">{task.priority}</span>
                    </div>
                  </div>
                  {task.status !== 'completed' && (
                    <button onClick={() => handleTaskStatusChange(task.id)} className="btn-primary text-2xs px-2 py-1">
                      {task.status === 'in_progress' ? 'Complete' : 'Start'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upload Photos */}
            <div className="premium-card p-5">
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Upload Work Photos</h3>
              <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-xl p-6 text-center hover:border-brand-300 dark:hover:border-brand-700 transition-colors cursor-pointer">
                <Camera className="w-8 h-8 text-surface-400 mx-auto mb-2" />
                <p className="text-xs text-surface-500 dark:text-surface-400">Tap to capture or upload</p>
                <p className="text-2xs text-surface-400 mt-1">JPG, PNG up to 10MB</p>
              </div>
            </div>

            {/* Attendance */}
            <div className="premium-card p-5">
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">This Week Attendance</h3>
              <div className="grid grid-cols-7 gap-1">
                {weeklyAttendance.map((day) => (
                  <div key={day.day} className="text-center">
                    <p className="text-2xs text-surface-400 mb-1">{day.day}</p>
                    <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-2xs font-bold ${
                      day.status === 'present' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600' :
                      day.status === 'half_day' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600' :
                      day.status === 'leave' ? 'bg-surface-100 dark:bg-surface-800 text-surface-400' :
                      'bg-red-100 dark:bg-red-900/20 text-red-600'
                    }`}>
                      {day.status === 'present' ? '✓' : day.status === 'half_day' ? '½' : day.status === 'leave' ? '-' : '✗'}
                    </div>
                    <p className="text-2xs text-surface-400 mt-1">{day.hours}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div className="premium-card p-5">
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Salary Summary</h3>
              <div className="space-y-2">
                {salaryBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-surface-500 dark:text-surface-400">{item.label}</span>
                    <span className={`text-xs font-mono font-semibold ${item.amount < 0 ? 'text-red-500' : 'text-surface-900 dark:text-white'}`}>
                      {item.amount < 0 ? '-' : ''}₹{Math.abs(item.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-surface-200 dark:border-surface-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-surface-900 dark:text-white">Net Pay</span>
                  <span className="text-lg font-bold gradient-text">₹{(salaryBreakdown.reduce((a, b) => a + b.amount, 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
