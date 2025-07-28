// API service layer for connecting to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Import inventory types
import { InventoryCategory, InventoryItem, InventoryTransaction, InventoryAlert } from '../app/operations/inventory/types';

// TypeScript interfaces
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  notes?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  clientId: number;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  space: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  attendees: number;
  eventType: string;
  notes: string;
  createdAt: string;
  totalAmount: number;
  depositPaid: number;
}

export interface Invoice {
  id: string;
  clientId: number;
  client: string;
  bookingId: string;
  amount: number;
  tax: number;
  total: number;
  due: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
  sent: string;
  notes: string;
  lineItems: InvoiceLineItem[];
  paymentMethod?: string;
  paymentDate?: string;
  createdAt: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Payment {
  id: string;
  clientId: number;
  amount: number;
  method: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export interface DashboardData {
  totalClients: number;
  totalBookings: number;
  pendingBalance: number;
  overdueCount: number;
  pendingBookings: number;
  totalRevenue: number;
  recentActivity: Array<{
    type: string;
    text: string;
    date: string;
  }>;
}

export interface ClientDetails {
  client: Client;
  bookings: Booking[];
  payments: Payment[];
  invoices: Invoice[];
}

export interface CalendarBlock {
  id: string;
  date: string;
  startDate?: string;
  endDate?: string;
  type: 'venue_closure' | 'space_block' | 'advance_booking' | 'maintenance';
  spaces?: string[];
  reason: string;
  description?: string;
  isRecurring?: boolean;
  recurringPattern?: 'weekly' | 'monthly' | 'yearly';
  createdAt: string;
  createdBy: string;
}

// API response wrapper
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}

// Dashboard API
export const dashboardApi = {
  getDashboardData: (): Promise<ApiResponse<DashboardData>> => 
    apiRequest<DashboardData>('/dashboard'),
};

// Clients API
export const clientsApi = {
  getAll: (params?: { search?: string; status?: string }): Promise<ApiResponse<Client[]>> => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append('search', params.search);
    if (params?.status) searchParams.append('status', params.status);
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/clients?${queryString}` : '/clients';
    return apiRequest<Client[]>(endpoint);
  },

  getById: (id: number): Promise<ApiResponse<Client>> => 
    apiRequest<Client>(`/clients/${id}`),

  create: (client: Omit<Client, 'id' | 'createdAt'>): Promise<ApiResponse<Client>> => 
    apiRequest<Client>('/clients', {
      method: 'POST',
      body: JSON.stringify(client),
    }),

  update: (id: number, client: Partial<Client>): Promise<ApiResponse<Client>> => 
    apiRequest<Client>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(client),
    }),

  delete: (id: number): Promise<ApiResponse<void>> => 
    apiRequest<void>(`/clients/${id}`, {
      method: 'DELETE',
    }),

  getDetails: (id: number): Promise<ApiResponse<ClientDetails>> => 
    apiRequest<ClientDetails>(`/clients/${id}/details`),
};

// Bookings API
export const bookingsApi = {
  getAll: (params?: { search?: string; status?: string; space?: string }): Promise<ApiResponse<Booking[]>> => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append('search', params.search);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.space) searchParams.append('space', params.space);
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/bookings?${queryString}` : '/bookings';
    return apiRequest<Booking[]>(endpoint);
  },

  getById: (id: string): Promise<ApiResponse<Booking>> => 
    apiRequest<Booking>(`/bookings/${id}`),

  create: (booking: Omit<Booking, 'id' | 'clientName' | 'createdAt'>): Promise<ApiResponse<Booking>> => 
    apiRequest<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    }),

  update: (id: string, booking: Partial<Booking>): Promise<ApiResponse<Booking>> => 
    apiRequest<Booking>(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(booking),
    }),

  delete: (id: string): Promise<ApiResponse<void>> => 
    apiRequest<void>(`/bookings/${id}`, {
      method: 'DELETE',
    }),

  // New methods for enhanced booking management
  cancel: (id: string, cancellationData: {
    reason: string;
    refundAmount: number;
    refundMethod: 'full' | 'partial' | 'none';
    notes: string;
    cancellationFee: number;
  }): Promise<ApiResponse<Booking>> => 
    apiRequest<Booking>(`/bookings/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify(cancellationData),
    }),

  changeDate: (id: string, dateChangeData: {
    newDate: string;
    newStartTime: string;
    newEndTime: string;
    reason: string;
    notes: string;
    notifyClient: boolean;
  }): Promise<ApiResponse<Booking>> => 
    apiRequest<Booking>(`/bookings/${id}/change-date`, {
      method: 'POST',
      body: JSON.stringify(dateChangeData),
    }),

  changeSpace: (id: string, spaceChangeData: {
    newSpace: string;
    reason: string;
    notes: string;
    notifyClient: boolean;
    checkAvailability: boolean;
  }): Promise<ApiResponse<Booking>> => 
    apiRequest<Booking>(`/bookings/${id}/change-space`, {
      method: 'POST',
      body: JSON.stringify(spaceChangeData),
    }),

  checkAvailability: (params: {
    date: string;
    startTime: string;
    endTime: string;
    space?: string;
    excludeBookingId?: string;
  }): Promise<ApiResponse<{
    available: boolean;
    conflictingBookings: Booking[];
    availableSpaces: string[];
  }>> => 
    apiRequest(`/bookings/check-availability`, {
      method: 'POST',
      body: JSON.stringify(params),
    }),
};



// Payments API
export const paymentsApi = {
  getAll: (): Promise<ApiResponse<Payment[]>> => 
    apiRequest<Payment[]>('/payments'),

  create: (payment: Omit<Payment, 'id' | 'status' | 'date'>): Promise<ApiResponse<Payment>> => 
    apiRequest<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    }),
};

// Inventory API
export const inventoryApi = {
  // Categories
  getCategories: (): Promise<ApiResponse<InventoryCategory[]>> => 
    apiRequest<InventoryCategory[]>('/inventory/categories'),

  createCategory: (category: Omit<InventoryCategory, 'id' | 'createdAt'>): Promise<ApiResponse<InventoryCategory>> => 
    apiRequest<InventoryCategory>('/inventory/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    }),

  updateCategory: (id: number, category: Partial<InventoryCategory>): Promise<ApiResponse<InventoryCategory>> => 
    apiRequest<InventoryCategory>(`/inventory/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    }),

  deleteCategory: (id: number): Promise<ApiResponse<void>> => 
    apiRequest<void>(`/inventory/categories/${id}`, {
      method: 'DELETE',
    }),

  // Items
  getItems: (params?: { 
    search?: string; 
    categoryId?: number; 
    status?: string; 
    lowStock?: boolean 
  }): Promise<ApiResponse<InventoryItem[]>> => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append('search', params.search);
    if (params?.categoryId) searchParams.append('categoryId', params.categoryId.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.lowStock) searchParams.append('lowStock', 'true');
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/inventory/items?${queryString}` : '/inventory/items';
    return apiRequest<InventoryItem[]>(endpoint);
  },

  getItemById: (id: number): Promise<ApiResponse<InventoryItem>> => 
    apiRequest<InventoryItem>(`/inventory/items/${id}`),

  createItem: (item: Omit<InventoryItem, 'id' | 'categoryName' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<InventoryItem>> => 
    apiRequest<InventoryItem>('/inventory/items', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  updateItem: (id: number, item: Partial<InventoryItem>): Promise<ApiResponse<InventoryItem>> => 
    apiRequest<InventoryItem>(`/inventory/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    }),

  deleteItem: (id: number): Promise<ApiResponse<void>> => 
    apiRequest<void>(`/inventory/items/${id}`, {
      method: 'DELETE',
    }),

  // Transactions
  getTransactions: (params?: { 
    itemId?: number; 
    type?: string; 
    startDate?: string; 
    endDate?: string 
  }): Promise<ApiResponse<InventoryTransaction[]>> => {
    const searchParams = new URLSearchParams();
    if (params?.itemId) searchParams.append('itemId', params.itemId.toString());
    if (params?.type) searchParams.append('type', params.type);
    if (params?.startDate) searchParams.append('startDate', params.startDate);
    if (params?.endDate) searchParams.append('endDate', params.endDate);
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/inventory/transactions?${queryString}` : '/inventory/transactions';
    return apiRequest<InventoryTransaction[]>(endpoint);
  },

  createTransaction: (transaction: Omit<InventoryTransaction, 'id' | 'itemName' | 'createdAt'>): Promise<ApiResponse<InventoryTransaction>> => 
    apiRequest<InventoryTransaction>('/inventory/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    }),

  // Alerts
  getAlerts: (params?: { isRead?: boolean }): Promise<ApiResponse<InventoryAlert[]>> => {
    const searchParams = new URLSearchParams();
    if (params?.isRead !== undefined) searchParams.append('isRead', params.isRead.toString());
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/inventory/alerts?${queryString}` : '/inventory/alerts';
    return apiRequest<InventoryAlert[]>(endpoint);
  },

  markAlertAsRead: (id: number): Promise<ApiResponse<InventoryAlert>> => 
    apiRequest<InventoryAlert>(`/inventory/alerts/${id}/read`, {
      method: 'PUT',
    }),

  // Dashboard stats
  getInventoryStats: (): Promise<ApiResponse<{
    totalItems: number;
    totalValue: number;
    lowStockCount: number;
    alertCount: number;
  }>> => 
    apiRequest('/inventory/stats'),

  // Get low stock items for auto-drafting
  getLowStockItems: (): Promise<ApiResponse<InventoryItem[]>> => 
    apiRequest('/inventory/items?lowStock=true'),
};

// Utility functions
export const apiUtils = {
  // Format currency
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  },

  // Format date
  formatDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Format date and time
  formatDateTime: (dateString: string, timeString?: string): string => {
    const date = new Date(dateString);
    const time = timeString ? new Date(`2000-01-01T${timeString}`) : null;
    
    const dateFormatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    if (time) {
      const timeFormatted = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `${dateFormatted} at ${timeFormatted}`;
    }

    return dateFormatted;
  },

  // Get status color
  getStatusColor: (status: string): string => {
    switch (status) {
      case 'Confirmed':
      case 'Paid':
      case 'completed':
      case 'accepted':
      case 'approved':
        return '#10b981';
      case 'Pending':
      case 'pending':
      case 'sent':
        return '#f59e0b';
      case 'Overdue':
      case 'failed':
      case 'Cancelled':
      case 'rejected':
        return '#ef4444';
      case 'Completed':
        return '#3b82f6';
      case 'draft':
        return '#6b7280';
      case 'reviewing':
        return '#3b82f6';
      case 'expired':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  },

  // Get status background color
  getStatusBackgroundColor: (status: string): string => {
    switch (status) {
      case 'Confirmed':
      case 'Paid':
      case 'completed':
      case 'accepted':
      case 'approved':
        return '#d1fae5';
      case 'Pending':
      case 'pending':
      case 'sent':
        return '#fef3c7';
      case 'Overdue':
      case 'failed':
      case 'Cancelled':
      case 'rejected':
        return '#fee2e2';
      case 'Completed':
        return '#dbeafe';
      case 'draft':
        return '#f3f4f6';
      case 'reviewing':
        return '#dbeafe';
      case 'expired':
        return '#f3e8ff';
      default:
        return '#f3f4f6';
    }
  },

  // Validate email
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone
  validatePhone: (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  },

  // Generate unique ID
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },


};

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const errorHandler = {
  handleApiError: (error: unknown): string => {
    if (error instanceof ApiError) {
      return error.message;
    }
    
    if (error && typeof error === 'object' && 'error' in error) {
      return String(error.error);
    }
    
    if (typeof error === 'string') {
      return error;
    }
    
    return 'An unexpected error occurred. Please try again.';
  },

  isNetworkError: (error: unknown): boolean => {
    if (error && typeof error === 'object' && 'message' in error) {
      const message = String(error.message);
      return message.includes('fetch') || 
             message.includes('network') ||
             message.includes('Failed to fetch');
    }
    return false;
  },
};

// Local storage utilities for offline support
export const storageUtils = {
  setItem: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  getItem: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return defaultValue || null;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};

// Cache utilities
export const cacheUtils = {
  cache: new Map<string, { data: unknown; timestamp: number }>(),

  set: (key: string, data: unknown, ttl: number = 5 * 60 * 1000): void => {
    cacheUtils.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  },

  get: <T>(key: string): T | null => {
    const cached = cacheUtils.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.timestamp) {
      cacheUtils.cache.delete(key);
      return null;
    }
    
    return cached.data as T;
  },

  clear: (): void => {
    cacheUtils.cache.clear();
  },

  clearExpired: (): void => {
    const now = Date.now();
    for (const [key, value] of cacheUtils.cache.entries()) {
      if (now > value.timestamp) {
        cacheUtils.cache.delete(key);
      }
    }
  },
};

// Calendar Blocks API
export const calendarBlocksApi = {
  getAll: (params?: { 
    startDate?: string; 
    endDate?: string; 
    type?: string; 
    space?: string 
  }): Promise<ApiResponse<CalendarBlock[]>> => {
    const searchParams = new URLSearchParams();
    if (params?.startDate) searchParams.append('startDate', params.startDate);
    if (params?.endDate) searchParams.append('endDate', params.endDate);
    if (params?.type) searchParams.append('type', params.type);
    if (params?.space) searchParams.append('space', params.space);
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/calendar-blocks?${queryString}` : '/calendar-blocks';
    return apiRequest<CalendarBlock[]>(endpoint);
  },

  getById: (id: string): Promise<ApiResponse<CalendarBlock>> => 
    apiRequest<CalendarBlock>(`/calendar-blocks/${id}`),

  create: (block: Omit<CalendarBlock, 'id' | 'createdAt'>): Promise<ApiResponse<CalendarBlock>> => 
    apiRequest<CalendarBlock>('/calendar-blocks', {
      method: 'POST',
      body: JSON.stringify(block),
    }),

  update: (id: string, block: Partial<CalendarBlock>): Promise<ApiResponse<CalendarBlock>> => 
    apiRequest<CalendarBlock>(`/calendar-blocks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(block),
    }),

  delete: (id: string): Promise<ApiResponse<void>> => 
    apiRequest<void>(`/calendar-blocks/${id}`, {
      method: 'DELETE',
    }),

  getForDate: (date: string): Promise<ApiResponse<CalendarBlock[]>> => 
    apiRequest<CalendarBlock[]>(`/calendar-blocks/date/${date}`),

  getForDateRange: (startDate: string, endDate: string): Promise<ApiResponse<CalendarBlock[]>> => 
    apiRequest<CalendarBlock[]>(`/calendar-blocks/range?startDate=${startDate}&endDate=${endDate}`),
};

// Export all APIs as a single object for convenience
export const api = {
  dashboard: dashboardApi,
  clients: clientsApi,
  bookings: bookingsApi,
  payments: paymentsApi,
  inventory: inventoryApi,
  calendarBlocks: calendarBlocksApi,
  utils: apiUtils,
  error: errorHandler,
  storage: storageUtils,
  cache: cacheUtils,
};

export default api; 