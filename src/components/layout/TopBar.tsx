'use client';

import React, { useState } from 'react';
import { useAuthStore, useThemeStore, useSidebarStore, useNotificationStore } from '@/stores';
import { cn, getInitials, formatRelativeTime } from '@/lib/utils';
import { ROLE_LABELS } from '@/lib/constants';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  Plus,
  ChevronDown,
  Settings,
  LogOut,
  User,
  HelpCircle,
  CheckCircle,
  Clock,
  Package,
  CreditCard,
  AlertTriangle,
  MessageSquare,
  X,
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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-200 bg-white/80 px-4 backdrop-blur-xl dark:border-surface-800 dark:bg-surface-950/80 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobile}
          className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="hidden w-[320px] items-center gap-2 rounded-xl border border-transparent bg-surface-100 px-3 py-2 transition-all focus-within:border-brand-500/30 focus-within:bg-white dark:bg-surface-800/60 dark:focus-within:bg-surface-800 md:flex">
          <Search className="h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search projects, documents, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-surface-700 outline-none placeholder:text-surface-400 dark:text-surface-300 dark:placeholder:text-surface-500"
          />
          <kbd className="hidden items-center rounded bg-surface-200 px-1.5 py-0.5 font-mono text-2xs text-surface-400 dark:bg-surface-700 lg:inline-flex">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Quick Action */}
        <button className="btn-primary hidden px-3 py-2 text-xs sm:inline-flex">
          <Plus className="h-3.5 w-3.5" />
          <span>New Project</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => {
            toggleTheme();
            document.documentElement.classList.toggle('dark');
          }}
          className="rounded-lg p-2 text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
        >
          {theme === 'dark' ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative rounded-lg p-2 text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
          >
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-surface-950">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-[380px] animate-scale-in overflow-hidden rounded-xl border border-surface-200 bg-white shadow-glass-lg dark:border-surface-800 dark:bg-surface-900">
                <div className="flex items-center justify-between border-b border-surface-200 px-4 py-3 dark:border-surface-800">
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">
                    Notifications
                  </h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-brand-500 hover:text-brand-600"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="custom-scrollbar max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notificationIcons[notification.type] || Bell;
                    const colorClass =
                      notificationColors[notification.type] || 'text-surface-500 bg-surface-100';
                    return (
                      <button
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={cn(
                          'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/50',
                          !notification.isRead && 'bg-brand-50/30 dark:bg-brand-500/5'
                        )}
                      >
                        <div
                          className={cn(
                            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
                            colorClass
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium text-surface-900 dark:text-white">
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                            )}
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-xs text-surface-500 dark:text-surface-400">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-2xs text-surface-400 dark:text-surface-500">
                            {formatRelativeTime(notification.createdAt)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-surface-200 p-2 dark:border-surface-800">
                  <button className="w-full rounded-lg py-2 text-xs font-medium text-brand-500 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-500/10">
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
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
              {user ? getInitials(user.fullName) : 'U'}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-xs font-semibold leading-tight text-surface-900 dark:text-white">
                {user?.fullName || 'User'}
              </p>
              <p className="text-2xs text-surface-500 dark:text-surface-400">{ROLE_LABELS[role]}</p>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-surface-400 md:block" />
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-[220px] animate-scale-in overflow-hidden rounded-xl border border-surface-200 bg-white shadow-glass-lg dark:border-surface-800 dark:bg-surface-900">
                <div className="border-b border-surface-200 p-3 dark:border-surface-800">
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">
                    {user?.fullName}
                  </p>
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
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="border-t border-surface-200 p-1.5 dark:border-surface-800">
                  <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20">
                    <LogOut className="h-4 w-4" />
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
