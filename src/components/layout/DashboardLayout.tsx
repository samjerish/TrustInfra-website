'use client';

import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useSidebarStore } from '@/stores';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300',
          isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        )}
      >
        <TopBar />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
