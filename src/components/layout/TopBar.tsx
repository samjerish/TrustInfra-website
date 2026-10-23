'use client';

import React, { useState } from 'react';
import { useAuthStore, useThemeStore, useSidebarStore, useNotificationStore } from '@/stores';
import { cn, getInitials, formatRelativeTime } from '@/lib/utils';
import { ROLE_LABELS } from '@/lib/constants';
import {
  Search, Bell, Sun, Moon, Menu, Plus, ChevronDown,
  Settings, LogOut, User, HelpCircle, CheckCircle, Clock,
  Package, CreditCard, AlertTriangle, MessageSquare, X
} from 'lucide-react';

const notificationIcons: Record<string, React.ElementType> = {
  approval: CheckCircle,
  deadline: Clock,
  material: Package,
  payment: CreditCard,
  attendance: User,
  message: MessageSquare,
  system: AlertTriangle,
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

export default function TopBar() {
  const { user, role } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { toggleMobile } = useSidebarStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-6 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-100 dark:bg-surface-800/60 border border-transparent focus-within:border-brand-500/30 focus-within:bg-white dark:focus-within:bg-surface-800 transition-all w-[320px]">
          <Search className="w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search projects, documents, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-surface-700 dark:text-surface-300 placeholder:text-surface-400 dark:placeholder:text-surface-500 w-full"
          />
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-2xs font-mono text-surface-400 bg-surface-200 dark:bg-surface-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Quick Action */}
        <button className="hidden sm:inline-flex btn-primary text-xs px-3 py-2">
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => {
            toggleTheme();
            document.documentElement.classList.toggle('dark');
          }}
          className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            className="relative p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-surface-950">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-2 w-[380px] z-50 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-glass-lg overflow-hidden animate-scale-in">
                <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200 dark:border-surface-800">
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Notifications</h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-brand-500 hover:text-brand-600 font-medium"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {notifications.map((notification) => {
                    const Icon = notificationIcons[notification.type] || Bell;
                    const colorClass = notificationColors[notification.type] || 'text-surface-500 bg-surface-100';
                    return (
                      <button
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={cn(
                          'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/50',
                          !notification.isRead && 'bg-brand-50/30 dark:bg-brand-500/5'
                        )}
                      >
                        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', colorClass)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-2xs text-surface-400 dark:text-surface-500 mt-1">
                            {formatRelativeTime(notification.createdAt)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-surface-200 dark:border-surface-800 p-2">
                  <button className="w-full py-2 text-xs font-medium text-brand-500 hover:text-brand-600 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold">
              {user ? getInitials(user.fullName) : 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-surface-900 dark:text-white leading-tight">
                {user?.fullName || 'User'}
              </p>
              <p className="text-2xs text-surface-500 dark:text-surface-400">
                {ROLE_LABELS[role]}
              </p>
            </div>
            <ChevronDown className="hidden md:block w-3.5 h-3.5 text-surface-400" />
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-[220px] z-50 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-glass-lg overflow-hidden animate-scale-in">
                <div className="p-3 border-b border-surface-200 dark:border-surface-800">
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">{user?.fullName}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">{user?.email}</p>
                </div>
                <div className="p-1.5">
                  {[
                    { icon: User, label: 'Profile', action: () => {} },
                    { icon: Settings, label: 'Settings', action: () => {} },
                    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
                  ].map(({ icon: Icon, label, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="p-1.5 border-t border-surface-200 dark:border-surface-800">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
