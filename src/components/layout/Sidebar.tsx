'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, useThemeStore, useSidebarStore } from '@/stores';
import { getNavigationForRole } from '@/lib/rbac';
import { ROLE_LABELS } from '@/lib/constants';
import { cn, getInitials } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  FileText,
  CheckCircle,
  Wallet,
  Calendar,
  Bot,
  MessageSquare,
  BarChart3,
  Bell,
  ClipboardList,
  HardHat,
  Package,
  Shield,
  BookOpen,
  PenTool,
  LayoutGrid,
  GitBranch,
  Users,
  ShoppingCart,
  Truck,
  Receipt,
  CreditCard,
  Clock,
  CheckSquare,
  Camera,
  AlertTriangle,
  TrendingUp,
  ScrollText,
  Lock,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';
import type { UserRole } from '@/types';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Building2,
  FileText,
  CheckCircle,
  Wallet,
  Calendar,
  Bot,
  MessageSquare,
  BarChart3,
  Bell,
  ClipboardList,
  HardHat,
  Package,
  Shield,
  BookOpen,
  PenTool,
  LayoutGrid,
  GitBranch,
  Users,
  ShoppingCart,
  Truck,
  Receipt,
  CreditCard,
  Clock,
  CheckSquare,
  Camera,
  AlertTriangle,
  TrendingUp,
  ScrollText,
  Lock,
  Activity,
  Settings,
};

export default function Sidebar() {
  const { role, user } = useAuthStore();
  const { isCollapsed, isMobileOpen, toggleCollapsed, setMobileOpen } = useSidebarStore();
  const navItems = getNavigationForRole(role);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col transition-all duration-300 ease-in-out',
          'border-r border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-950',
          isCollapsed ? 'w-[72px]' : 'w-[260px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex h-16 items-center border-b border-surface-200 px-4 dark:border-surface-800',
            isCollapsed ? 'justify-center' : 'gap-3'
          )}
        >
          <div className="gradient-primary flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-bold tracking-tight text-surface-900 dark:text-white">
                Trust Infra
              </span>
              <span className="truncate text-2xs text-surface-500 dark:text-surface-400">
                {ROLE_LABELS[role]}
              </span>
            </div>
          )}
          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto rounded-lg p-1 hover:bg-surface-100 dark:hover:bg-surface-800 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const IconComponent = iconMap[item.icon] || LayoutDashboard;
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200',
                  isCollapsed && 'justify-center px-2',
                  isActive
                    ? 'bg-brand-50 text-brand-600 shadow-sm dark:bg-brand-500/10 dark:text-brand-400'
                    : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800/60 dark:hover:text-white'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <IconComponent
                  className={cn(
                    'flex-shrink-0 transition-colors',
                    'h-[18px] w-[18px]',
                    isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-surface-400 group-hover:text-surface-600 dark:text-surface-500 dark:group-hover:text-surface-300'
                  )}
                />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 truncate text-left">{item.label}</span>
                    {item.badge && (
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {isCollapsed && item.badge && (
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Role Switcher (Demo) */}
        {!isCollapsed && (
          <div className="px-3 pb-2">
            <div className="rounded-xl border border-surface-200 bg-surface-50 p-2 dark:border-surface-800 dark:bg-surface-900">
              <label className="px-1 text-2xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                Switch Role (Demo)
              </label>
              <select
                value={role}
                onChange={(e) => {
                  const newRole = e.target.value as UserRole;
                  useAuthStore.getState().setRole(newRole);
                  router.push(newRole === 'project_manager' ? '/project-manager' : `/${newRole}`);
                }}
                className="mt-1 w-full rounded-lg border border-surface-200 bg-white px-2 py-1.5 text-xs text-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300"
              >
                {Object.entries(ROLE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={toggleCollapsed}
          className="hidden h-10 items-center justify-center border-t border-surface-200 text-surface-400 transition-colors hover:bg-surface-50 hover:text-surface-600 dark:border-surface-800 dark:hover:bg-surface-800/50 dark:hover:text-surface-300 lg:flex"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* User Card */}
        <div
          className={cn(
            'border-t border-surface-200 p-3 dark:border-surface-800',
            isCollapsed && 'flex justify-center'
          )}
        >
          {isCollapsed ? (
            <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white">
              {user ? getInitials(user.fullName) : 'U'}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="gradient-primary flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                {user ? getInitials(user.fullName) : 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-surface-900 dark:text-white">
                  {user?.fullName || 'User'}
                </p>
                <p className="truncate text-2xs text-surface-500 dark:text-surface-400">
                  {user?.email || 'user@trustinfra.com'}
                </p>
              </div>
              <button className="rounded-lg p-1.5 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-600 dark:hover:bg-surface-800 dark:hover:text-surface-300">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
