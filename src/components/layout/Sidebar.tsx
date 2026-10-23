'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, useThemeStore, useSidebarStore } from '@/stores';
import { getNavigationForRole } from '@/lib/rbac';
import { ROLE_LABELS } from '@/lib/constants';
import { cn, getInitials } from '@/lib/utils';
import {
  LayoutDashboard, Building2, FileText, CheckCircle, Wallet, Calendar,
  Bot, MessageSquare, BarChart3, Bell, ClipboardList, HardHat, Package,
  Shield, BookOpen, PenTool, LayoutGrid, GitBranch, Users, ShoppingCart,
  Truck, Receipt, CreditCard, Clock, CheckSquare, Camera, AlertTriangle,
  TrendingUp, ScrollText, Lock, Activity, Settings, ChevronLeft, ChevronRight,
  LogOut, Sparkles, X
} from 'lucide-react';
import type { UserRole } from '@/types';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Building2, FileText, CheckCircle, Wallet, Calendar,
  Bot, MessageSquare, BarChart3, Bell, ClipboardList, HardHat, Package,
  Shield, BookOpen, PenTool, LayoutGrid, GitBranch, Users, ShoppingCart,
  Truck, Receipt, CreditCard, Clock, CheckSquare, Camera, AlertTriangle,
  TrendingUp, ScrollText, Lock, Activity, Settings,
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen flex flex-col transition-all duration-300 ease-in-out',
          'bg-white dark:bg-surface-950 border-r border-surface-200 dark:border-surface-800',
          isCollapsed ? 'w-[72px]' : 'w-[260px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-16 px-4 border-b border-surface-200 dark:border-surface-800',
          isCollapsed ? 'justify-center' : 'gap-3'
        )}>
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-surface-900 dark:text-white tracking-tight">Trust Infra</span>
              <span className="text-2xs text-surface-500 dark:text-surface-400 truncate">{ROLE_LABELS[role]}</span>
            </div>
          )}
          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden ml-auto p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const IconComponent = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group',
                  isCollapsed && 'justify-center px-2',
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800/60 hover:text-surface-900 dark:hover:text-white'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <IconComponent className={cn(
                  'flex-shrink-0 transition-colors',
                  'w-[18px] h-[18px]',
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-surface-400 dark:text-surface-500 group-hover:text-surface-600 dark:group-hover:text-surface-300'
                )} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && (
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {isCollapsed && item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Role Switcher (Demo) */}
        {!isCollapsed && (
          <div className="px-3 pb-2">
            <div className="p-2 rounded-xl bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800">
              <label className="text-2xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider px-1">
                Switch Role (Demo)
              </label>
              <select
                value={role}
                onChange={(e) => {
                  const newRole = e.target.value as UserRole;
                  useAuthStore.getState().setRole(newRole);
                  router.push(newRole === 'project_manager' ? '/project-manager' : `/${newRole}`);
                }}
                className="w-full mt-1 px-2 py-1.5 rounded-lg text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {Object.entries(ROLE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex items-center justify-center h-10 border-t border-surface-200 dark:border-surface-800 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* User Card */}
        <div className={cn(
          'border-t border-surface-200 dark:border-surface-800 p-3',
          isCollapsed && 'flex justify-center'
        )}>
          {isCollapsed ? (
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
              {user ? getInitials(user.fullName) : 'U'}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user ? getInitials(user.fullName) : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                  {user?.fullName || 'User'}
                </p>
                <p className="text-2xs text-surface-500 dark:text-surface-400 truncate">
                  {user?.email || 'user@trustinfra.com'}
                </p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
