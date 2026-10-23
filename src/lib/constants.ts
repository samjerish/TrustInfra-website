// ============================================
// TRUST INFRA — Constants
// ============================================

import { UserRole } from '@/types';

export const APP_NAME = 'Trust Infra';
export const APP_DESCRIPTION = 'Enterprise Construction Management & AI Collaboration Platform';
export const APP_VERSION = '1.0.0';

// Role Display Names
export const ROLE_LABELS: Record<UserRole, string> = {
  customer: 'Customer',
  engineer: 'Civil Engineer',
  architect: 'Architect',
  dealer: 'Dealer / Supplier',
  worker: 'Field Worker',
  supervisor: 'Site Supervisor',
  project_manager: 'Project Manager',
  finance: 'Finance Team',
  admin: 'Administrator',
};

// Role Colors
export const ROLE_COLORS: Record<UserRole, string> = {
  customer: '#6366f1',
  engineer: '#0ea5e9',
  architect: '#8b5cf6',
  dealer: '#f59e0b',
  worker: '#10b981',
  supervisor: '#ef4444',
  project_manager: '#ec4899',
  finance: '#14b8a6',
  admin: '#f97316',
};

// Project Status Labels
export const PROJECT_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  planning: 'Planning',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

// BOQ Categories
export const BOQ_CATEGORIES = [
  { value: 'earthwork', label: 'Earthwork' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'masonry', label: 'Masonry' },
  { value: 'steel', label: 'Steel & Reinforcement' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'finishing', label: 'Finishing' },
  { value: 'woodwork', label: 'Woodwork' },
  { value: 'painting', label: 'Painting' },
  { value: 'misc', label: 'Miscellaneous' },
];

// Material Units
export const MATERIAL_UNITS = [
  'bags',
  'kg',
  'tonnes',
  'cubic meters',
  'cubic feet',
  'sq. meters',
  'sq. feet',
  'nos',
  'running meters',
  'liters',
  'bundles',
  'pieces',
];

// Chart Colors
export const CHART_COLORS = [
  '#6366f1',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#0ea5e9',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#84cc16',
];

// Demo Data Constants
export const DEMO_USER = {
  id: 'demo-user-001',
  email: 'demo@trustinfra.com',
  fullName: 'Rajesh Kumar',
  role: 'customer' as UserRole,
  avatarUrl: '',
  isActive: true,
  createdAt: '2024-01-15T00:00:00Z',
};
