// ============================================
// TRUST INFRA — Global State Store (Zustand)
// ============================================

import { create } from 'zustand';
import { User, UserRole, Notification } from '@/types';

// === Auth Store ===
interface AuthStore {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    id: 'demo-001',
    email: 'rajesh@trustinfra.com',
    fullName: 'Rajesh Kumar',
    role: 'customer',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
  },
  role: 'customer',
  isAuthenticated: true,
  setUser: (user) => set({ user, role: user.role, isAuthenticated: true }),
  setRole: (role) => set((state) => ({
    role,
    user: state.user ? { ...state.user, role } : null,
  })),
  logout: () => set({ user: null, role: 'customer', isAuthenticated: false }),
}));

// === Theme Store ===
interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme }),
}));

// === Sidebar Store ===
interface SidebarStore {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapsed: () => void;
  toggleMobile: () => void;
  setMobileOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isCollapsed: false,
  isMobileOpen: false,
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setMobileOpen: (open) => set({ isMobileOpen: open }),
}));

// === Notification Store ===
interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: '1',
      userId: 'demo-001',
      title: 'Material Approved',
      message: 'Your cement order for Green Valley project has been approved.',
      type: 'approval',
      isRead: false,
      createdAt: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: '2',
      userId: 'demo-001',
      title: 'New Quotation Received',
      message: 'ABC Suppliers sent a quotation for steel reinforcement.',
      type: 'material',
      isRead: false,
      createdAt: new Date(Date.now() - 900000).toISOString(),
    },
    {
      id: '3',
      userId: 'demo-001',
      title: 'Deadline Reminder',
      message: 'Foundation work deadline is in 3 days.',
      type: 'deadline',
      isRead: false,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: '4',
      userId: 'demo-001',
      title: 'Worker Attendance',
      message: '15 out of 18 workers checked in today.',
      type: 'attendance',
      isRead: true,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '5',
      userId: 'demo-001',
      title: 'Payment Processed',
      message: '₹2,50,000 payment to XYZ Contractors completed.',
      type: 'payment',
      isRead: true,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
  unreadCount: 3,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
}));
