// ============================================
// TRUST INFRA — Core TypeScript Types
// ============================================

// === User & Auth Types ===
export type UserRole = 
  | 'customer' 
  | 'engineer' 
  | 'architect' 
  | 'dealer' 
  | 'worker' 
  | 'supervisor' 
  | 'project_manager' 
  | 'finance' 
  | 'admin';

export interface User {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  organizationId?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// === Project Types ===
export type ProjectStatus = 
  | 'draft' 
  | 'planning' 
  | 'in_progress' 
  | 'on_hold' 
  | 'completed' 
  | 'cancelled';

export interface Project {
  id: string;
  customerId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  progress: number;
  location: {
    address: string;
    city: string;
    state: string;
    lat?: number;
    lng?: number;
  };
  memberCount: number;
  createdAt: string;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  role: UserRole;
  permissions: string[];
}

// === Document Types ===
export type DocumentType = 
  | 'land_document' 
  | 'site_image' 
  | 'survey_report' 
  | 'government_doc' 
  | 'autocad' 
  | 'floor_plan' 
  | 'elevation' 
  | 'section_drawing' 
  | '3d_model' 
  | 'report' 
  | 'invoice' 
  | 'other';

export interface Document {
  id: string;
  projectId: string;
  uploadedBy: string;
  name: string;
  fileUrl: string;
  type: DocumentType;
  version: number;
  size: number;
  createdAt: string;
}

// === BOQ Types ===
export type BOQCategory = 
  | 'earthwork' 
  | 'concrete' 
  | 'masonry' 
  | 'steel' 
  | 'plumbing' 
  | 'electrical' 
  | 'finishing' 
  | 'woodwork' 
  | 'painting' 
  | 'misc';

export interface BOQItem {
  id: string;
  projectId: string;
  itemName: string;
  description?: string;
  unit: string;
  quantity: number;
  unitRate: number;
  total: number;
  category: BOQCategory;
}

// === Task Types ===
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  progress: number;
  assignedTo?: string[];
}

// === Material & Dealer Types ===
export type RequestStatus = 'pending' | 'quoted' | 'approved' | 'ordered' | 'delivered' | 'cancelled';

export interface MaterialRequest {
  id: string;
  projectId: string;
  requestedBy: string;
  materialName: string;
  quantity: number;
  unit: string;
  status: RequestStatus;
  quotationCount: number;
  createdAt: string;
}

export interface Quotation {
  id: string;
  requestId: string;
  dealerId: string;
  dealerName: string;
  unitPrice: number;
  totalPrice: number;
  deliveryDays: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  dealerId: string;
  materialName: string;
  quantity: number;
  unit: string;
  price: number;
  available: boolean;
  category: string;
}

// === Attendance Types ===
export interface Attendance {
  id: string;
  workerId: string;
  workerName: string;
  projectId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  gpsLocation?: { lat: number; lng: number };
  status: 'present' | 'absent' | 'half_day' | 'leave';
}

// === Chat Types ===
export type ChatRoomType = 'direct' | 'group' | 'project';

export interface ChatRoom {
  id: string;
  projectId?: string;
  name: string;
  type: ChatRoomType;
  members: string[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  chatRoomId: string;
  content: string;
  fileUrl?: string;
  isRead: boolean;
  createdAt: string;
}

// === Finance Types ===
export type PaymentStatus = 'pending' | 'approved' | 'processing' | 'completed' | 'rejected';

export interface Payment {
  id: string;
  projectId: string;
  fromUser: string;
  toUser: string;
  amount: number;
  status: PaymentStatus;
  invoiceUrl?: string;
  description: string;
  createdAt: string;
}

// === AI Types ===
export type AnalysisType = 
  | 'cost_estimation' 
  | 'material_estimation' 
  | 'risk_analysis' 
  | 'timeline_prediction' 
  | 'design_analysis' 
  | 'budget_optimization' 
  | 'safety_recommendation';

export interface AIAnalysis {
  id: string;
  projectId: string;
  analysisType: AnalysisType;
  inputData: Record<string, unknown>;
  results: Record<string, unknown>;
  confidence: number;
  createdAt: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  projectContext?: string;
  timestamp: string;
}

// === Notification Types ===
export type NotificationType = 
  | 'approval' 
  | 'deadline' 
  | 'material' 
  | 'attendance' 
  | 'payment' 
  | 'message' 
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// === Report Types ===
export type ReportType = 'daily' | 'weekly' | 'monthly' | 'completion' | 'financial' | 'custom';

export interface Report {
  id: string;
  projectId: string;
  type: ReportType;
  title: string;
  generatedBy: string;
  fileUrl?: string;
  createdAt: string;
}

// === Navigation Types ===
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

export interface SidebarConfig {
  role: UserRole;
  items: NavItem[];
}

// === Dashboard Stat Types ===
export interface StatCard {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: 'brand' | 'accent' | 'warning' | 'danger' | 'info';
}
