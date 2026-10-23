// ============================================
// TRUST INFRA — Role-Based Access Control (RBAC)
// ============================================

import { UserRole } from '@/types';

// Permission definitions
export type Permission =
  | 'project:create'
  | 'project:read'
  | 'project:update'
  | 'project:delete'
  | 'project:approve'
  | 'document:upload'
  | 'document:read'
  | 'document:delete'
  | 'boq:create'
  | 'boq:read'
  | 'boq:update'
  | 'design:upload'
  | 'design:read'
  | 'design:comment'
  | 'inventory:manage'
  | 'quotation:submit'
  | 'quotation:approve'
  | 'quotation:read'
  | 'worker:assign'
  | 'worker:manage'
  | 'attendance:mark'
  | 'attendance:read'
  | 'task:create'
  | 'task:read'
  | 'task:update'
  | 'task:complete'
  | 'finance:read'
  | 'finance:manage'
  | 'payment:approve'
  | 'payment:create'
  | 'report:generate'
  | 'report:read'
  | 'ai:use'
  | 'ai:analyze'
  | 'chat:send'
  | 'chat:create_room'
  | 'notification:read'
  | 'user:manage'
  | 'role:manage'
  | 'audit:read'
  | 'system:settings'
  | 'analytics:read';

// Role-Permission Matrix
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  customer: [
    'project:create',
    'project:read',
    'project:update',
    'document:upload',
    'document:read',
    'boq:read',
    'design:read',
    'design:comment',
    'quotation:approve',
    'quotation:read',
    'task:read',
    'finance:read',
    'payment:approve',
    'report:read',
    'ai:use',
    'chat:send',
    'chat:create_room',
    'notification:read',
  ],
  engineer: [
    'project:read',
    'project:update',
    'document:upload',
    'document:read',
    'boq:create',
    'boq:read',
    'boq:update',
    'design:read',
    'design:comment',
    'quotation:approve',
    'quotation:read',
    'worker:assign',
    'worker:manage',
    'attendance:read',
    'task:create',
    'task:read',
    'task:update',
    'report:generate',
    'report:read',
    'ai:use',
    'ai:analyze',
    'chat:send',
    'chat:create_room',
    'notification:read',
  ],
  architect: [
    'project:read',
    'document:upload',
    'document:read',
    'boq:read',
    'design:upload',
    'design:read',
    'design:comment',
    'quotation:read',
    'task:read',
    'report:read',
    'ai:use',
    'ai:analyze',
    'chat:send',
    'chat:create_room',
    'notification:read',
  ],
  dealer: [
    'project:read',
    'document:read',
    'boq:read',
    'inventory:manage',
    'quotation:submit',
    'quotation:read',
    'finance:read',
    'report:read',
    'chat:send',
    'notification:read',
  ],
  worker: [
    'project:read',
    'document:upload',
    'attendance:mark',
    'attendance:read',
    'task:read',
    'task:update',
    'task:complete',
    'chat:send',
    'notification:read',
  ],
  supervisor: [
    'project:read',
    'project:update',
    'document:upload',
    'document:read',
    'boq:read',
    'design:read',
    'worker:assign',
    'worker:manage',
    'attendance:mark',
    'attendance:read',
    'task:create',
    'task:read',
    'task:update',
    'report:generate',
    'report:read',
    'ai:use',
    'chat:send',
    'chat:create_room',
    'notification:read',
  ],
  project_manager: [
    'project:create',
    'project:read',
    'project:update',
    'project:approve',
    'document:upload',
    'document:read',
    'document:delete',
    'boq:create',
    'boq:read',
    'boq:update',
    'design:read',
    'design:comment',
    'quotation:approve',
    'quotation:read',
    'worker:assign',
    'worker:manage',
    'attendance:read',
    'task:create',
    'task:read',
    'task:update',
    'finance:read',
    'finance:manage',
    'payment:approve',
    'payment:create',
    'report:generate',
    'report:read',
    'ai:use',
    'ai:analyze',
    'chat:send',
    'chat:create_room',
    'notification:read',
    'analytics:read',
  ],
  finance: [
    'project:read',
    'document:read',
    'boq:read',
    'quotation:approve',
    'quotation:read',
    'finance:read',
    'finance:manage',
    'payment:approve',
    'payment:create',
    'report:generate',
    'report:read',
    'chat:send',
    'notification:read',
    'analytics:read',
  ],
  admin: [
    'project:create',
    'project:read',
    'project:update',
    'project:delete',
    'project:approve',
    'document:upload',
    'document:read',
    'document:delete',
    'boq:create',
    'boq:read',
    'boq:update',
    'design:upload',
    'design:read',
    'design:comment',
    'inventory:manage',
    'quotation:submit',
    'quotation:approve',
    'quotation:read',
    'worker:assign',
    'worker:manage',
    'attendance:mark',
    'attendance:read',
    'task:create',
    'task:read',
    'task:update',
    'task:complete',
    'finance:read',
    'finance:manage',
    'payment:approve',
    'payment:create',
    'report:generate',
    'report:read',
    'ai:use',
    'ai:analyze',
    'chat:send',
    'chat:create_room',
    'notification:read',
    'user:manage',
    'role:manage',
    'audit:read',
    'system:settings',
    'analytics:read',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

export function getPermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

// Navigation items per role
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

export function getNavigationForRole(role: UserRole): NavItem[] {
  const baseItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: `/${role === 'project_manager' ? 'project-manager' : role}`,
      icon: 'LayoutDashboard',
    },
    { label: 'Community Feed', href: '/feed', icon: 'Camera' },
  ];

  const roleSpecificItems: Record<UserRole, NavItem[]> = {
    customer: [
      { label: 'My Projects', href: '/customer/projects', icon: 'Building2' },
      { label: 'Team Builder', href: '/team-builder', icon: 'Users' },
      { label: 'Documents', href: '/customer/documents', icon: 'FileText' },
      { label: 'Approvals', href: '/customer/approvals', icon: 'CheckCircle' },
      { label: 'Budget', href: '/customer/budget', icon: 'Wallet' },
      { label: 'Timeline', href: '/customer/timeline', icon: 'Calendar' },
      { label: 'AI Assistant', href: '/ai-assistant', icon: 'Bot' },
      { label: 'Chat', href: '/chat', icon: 'MessageSquare', badge: 3 },
      { label: 'Reports', href: '/reports', icon: 'BarChart3' },
      { label: 'Notifications', href: '/notifications', icon: 'Bell', badge: 5 },
    ],
    engineer: [
      { label: 'Projects', href: '/engineer/projects', icon: 'Building2' },
      { label: 'BOQ', href: '/engineer/boq', icon: 'ClipboardList' },
      { label: 'Site Reports', href: '/engineer/reports', icon: 'FileText' },
      { label: 'Workers', href: '/engineer/workers', icon: 'HardHat' },
      { label: 'Materials', href: '/engineer/materials', icon: 'Package' },
      { label: 'Quality', href: '/engineer/quality', icon: 'Shield' },
      { label: 'Daily Logs', href: '/engineer/logs', icon: 'BookOpen' },
      { label: 'AI Assistant', href: '/ai-assistant', icon: 'Bot' },
      { label: 'Chat', href: '/chat', icon: 'MessageSquare', badge: 2 },
      { label: 'Reports', href: '/reports', icon: 'BarChart3' },
    ],
    architect: [
      { label: 'Projects', href: '/architect/projects', icon: 'Building2' },
      { label: 'Designs', href: '/architect/designs', icon: 'PenTool' },
      { label: 'Floor Plans', href: '/architect/floor-plans', icon: 'LayoutGrid' },
      { label: 'Revisions', href: '/architect/revisions', icon: 'GitBranch' },
      { label: 'Collaboration', href: '/architect/collaboration', icon: 'Users' },
      { label: 'AI Analysis', href: '/ai-assistant', icon: 'Bot' },
      { label: 'Chat', href: '/chat', icon: 'MessageSquare' },
    ],
    dealer: [
      { label: 'Inventory', href: '/dealer/inventory', icon: 'Package' },
      { label: 'Quotation Requests', href: '/dealer/requests', icon: 'FileText' },
      { label: 'Orders', href: '/dealer/orders', icon: 'ShoppingCart' },
      { label: 'Deliveries', href: '/dealer/deliveries', icon: 'Truck' },
      { label: 'Invoices', href: '/dealer/invoices', icon: 'Receipt' },
      { label: 'Payments', href: '/dealer/payments', icon: 'CreditCard' },
      { label: 'Chat', href: '/chat', icon: 'MessageSquare' },
    ],
    worker: [
      { label: 'Attendance', href: '/worker/attendance', icon: 'Clock' },
      { label: "Today's Tasks", href: '/worker/tasks', icon: 'CheckSquare' },
      { label: 'Upload Photos', href: '/worker/photos', icon: 'Camera' },
      { label: 'Salary', href: '/worker/salary', icon: 'Wallet' },
      { label: 'Notifications', href: '/notifications', icon: 'Bell', badge: 2 },
    ],
    supervisor: [
      { label: 'Site Overview', href: '/supervisor/overview', icon: 'LayoutDashboard' },
      { label: 'Workers', href: '/supervisor/workers', icon: 'HardHat' },
      { label: 'Tasks', href: '/supervisor/tasks', icon: 'CheckSquare' },
      { label: 'Attendance', href: '/supervisor/attendance', icon: 'Clock' },
      { label: 'Quality Control', href: '/supervisor/quality', icon: 'Shield' },
      { label: 'Safety', href: '/supervisor/safety', icon: 'AlertTriangle' },
      { label: 'AI Assistant', href: '/ai-assistant', icon: 'Bot' },
      { label: 'Chat', href: '/chat', icon: 'MessageSquare' },
    ],
    project_manager: [
      { label: 'All Projects', href: '/project-manager/projects', icon: 'Building2' },
      { label: 'Resources', href: '/project-manager/resources', icon: 'Users' },
      { label: 'Timeline', href: '/project-manager/timeline', icon: 'Calendar' },
      { label: 'Budget', href: '/project-manager/budget', icon: 'Wallet' },
      { label: 'Materials', href: '/project-manager/materials', icon: 'Package' },
      { label: 'Reports', href: '/reports', icon: 'BarChart3' },
      { label: 'AI Assistant', href: '/ai-assistant', icon: 'Bot' },
      { label: 'Chat', href: '/chat', icon: 'MessageSquare', badge: 4 },
      { label: 'Analytics', href: '/project-manager/analytics', icon: 'TrendingUp' },
    ],
    finance: [
      { label: 'Overview', href: '/finance/overview', icon: 'LayoutDashboard' },
      { label: 'Budgets', href: '/finance/budgets', icon: 'Wallet' },
      { label: 'Payments', href: '/finance/payments', icon: 'CreditCard' },
      { label: 'Invoices', href: '/finance/invoices', icon: 'Receipt' },
      { label: 'Approvals', href: '/finance/approvals', icon: 'CheckCircle' },
      { label: 'Reports', href: '/reports', icon: 'BarChart3' },
      { label: 'Analytics', href: '/finance/analytics', icon: 'TrendingUp' },
    ],
    admin: [
      { label: 'Users', href: '/admin/users', icon: 'Users' },
      { label: 'Projects', href: '/admin/projects', icon: 'Building2' },
      { label: 'Analytics', href: '/admin/analytics', icon: 'TrendingUp' },
      { label: 'Roles & Permissions', href: '/admin/roles', icon: 'Shield' },
      { label: 'Subscriptions', href: '/admin/subscriptions', icon: 'CreditCard' },
      { label: 'Audit Logs', href: '/admin/audit', icon: 'ScrollText' },
      { label: 'Security', href: '/admin/security', icon: 'Lock' },
      { label: 'System Health', href: '/admin/health', icon: 'Activity' },
      { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
    ],
  };

  return [...baseItems, ...roleSpecificItems[role]];
}
