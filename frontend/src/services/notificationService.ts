import { Notification, NOTIFICATION_CATEGORIES } from '../app/components/SmartNotifications';

// Notification Service for backend integration
export class NotificationService {
  private static instance: NotificationService;
  private baseUrl = 'http://localhost:3001/api';

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Get all notifications with filters
  async getNotifications(filters?: {
    type?: string;
    priority?: string;
    isRead?: boolean;
    category?: string;
    limit?: number;
  }): Promise<Notification[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.type) params.append('type', filters.type);
      if (filters?.priority) params.append('priority', filters.priority);
      if (filters?.isRead !== undefined) params.append('isRead', filters.isRead.toString());
      if (filters?.category) params.append('category', filters.category);
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await fetch(`${this.baseUrl}/notifications?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch notifications');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.ok;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/mark-all-read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.ok;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  // Dismiss notification
  async dismissNotification(notificationId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/${notificationId}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error dismissing notification:', error);
      return false;
    }
  }

  // Get notification statistics
  async getNotificationStats(): Promise<{
    total: number;
    unread: number;
    critical: number;
    high: number;
    byCategory: Record<string, number>;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/stats`);
      if (!response.ok) throw new Error('Failed to fetch notification stats');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching notification stats:', error);
      return {
        total: 0,
        unread: 0,
        critical: 0,
        high: 0,
        byCategory: {},
      };
    }
  }

  // Create notification (for system-generated notifications)
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification | null> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification),
      });
      
      if (!response.ok) throw new Error('Failed to create notification');
      
      return await response.json();
    } catch (error) {
      console.error('Error creating notification:', error);
      return null;
    }
  }

  // Subscribe to real-time notifications (WebSocket)
  subscribeToNotifications(callback: (notification: Notification) => void): () => void {
    // In a real implementation, this would use WebSocket
    // For now, we'll simulate with polling
    const interval = setInterval(async () => {
      try {
        const notifications = await this.getNotifications({ isRead: false, limit: 1 });
        if (notifications.length > 0) {
          callback(notifications[0]);
        }
      } catch (error) {
        console.error('Error polling notifications:', error);
      }
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }

  // Generate system notifications based on app events
  async generateSystemNotifications(): Promise<void> {
    // This would be called by various parts of the app to generate notifications
    // For example, when inventory is low, bookings are due, etc.
    
    // Example: Check for upcoming bookings
    await this.checkUpcomingBookings();
    
    // Example: Check for low inventory
    await this.checkLowInventory();
    
    // Example: Check for overdue payments
    await this.checkOverduePayments();
    
    // Example: Check for maintenance due
    await this.checkMaintenanceDue();
  }

  private async checkUpcomingBookings(): Promise<void> {
    try {
      // This would fetch upcoming bookings and create notifications
      const response = await fetch(`${this.baseUrl}/bookings/upcoming`);
      if (response.ok) {
        const upcomingBookings = await response.json();
        
        for (const booking of upcomingBookings) {
          const hoursUntilBooking = this.getHoursUntil(booking.date, booking.startTime);
          
          if (hoursUntilBooking <= 24 && hoursUntilBooking > 0) {
            await this.createNotification({
              type: 'booking',
              priority: hoursUntilBooking <= 2 ? 'critical' : 'high',
              title: `Upcoming ${booking.eventType}`,
              message: `${booking.eventType} for ${booking.clientName} is in ${Math.floor(hoursUntilBooking)} hours. Setup required at ${booking.startTime}.`,
              category: NOTIFICATION_CATEGORIES.BOOKING.UPCOMING,
              entityId: booking.id,
              entityName: booking.clientName,
              actionUrl: `/bookings/${booking.id}?reminder=true&hours=${Math.floor(hoursUntilBooking)}`,
              isRead: false,
              metadata: {
                bookingId: booking.id,
                clientId: booking.clientId,
                dueDate: booking.date,
              },
            });
          }
        }
      }
    } catch (error) {
      console.error('Error checking upcoming bookings:', error);
    }
  }

  private async checkLowInventory(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/inventory/alerts?type=low_stock`);
      if (response.ok) {
        const lowStockItems = await response.json();
        
        for (const item of lowStockItems) {
          await this.createNotification({
            type: 'inventory',
            priority: item.quantity === 0 ? 'critical' : 'high',
            title: item.quantity === 0 ? 'Out of Stock' : 'Low Stock Alert',
            message: `${item.name} is ${item.quantity === 0 ? 'completely out of stock' : `running low (${item.quantity} units remaining)`}.`,
            category: item.quantity === 0 ? NOTIFICATION_CATEGORIES.INVENTORY.OUT_OF_STOCK : NOTIFICATION_CATEGORIES.INVENTORY.LOW_STOCK,
            entityId: item.id.toString(),
            entityName: item.name,
            actionUrl: `/operations/inventory?item=${item.id}&alert=${item.quantity === 0 ? 'out_of_stock' : 'low_stock'}`,
            isRead: false,
            metadata: {
              itemId: item.id,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error checking low inventory:', error);
    }
  }

  private async checkOverduePayments(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/clients/invoices/overdue`);
      if (response.ok) {
        const overdueInvoices = await response.json();
        
        for (const invoice of overdueInvoices) {
          const daysOverdue = this.getDaysOverdue(invoice.dueDate);
          
          await this.createNotification({
            type: 'client',
            priority: daysOverdue > 30 ? 'critical' : 'high',
            title: 'Payment Overdue',
            message: `Invoice #${invoice.id} for ${invoice.clientName} is ${daysOverdue} days overdue. Amount: $${invoice.amount}`,
            category: NOTIFICATION_CATEGORIES.CLIENT.OVERDUE,
            entityId: invoice.id,
            entityName: invoice.clientName,
            actionUrl: `/clients/invoices?invoice=${invoice.id}&status=overdue&days=${daysOverdue}`,
            isRead: false,
            metadata: {
              clientId: invoice.clientId,
              amount: invoice.amount,
              dueDate: invoice.dueDate,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error checking overdue payments:', error);
    }
  }

  private async checkMaintenanceDue(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/maintenance/tasks/due`);
      if (response.ok) {
        const dueTasks = await response.json();
        
        for (const task of dueTasks) {
          const daysUntilDue = this.getDaysUntil(task.dueDate);
          
          await this.createNotification({
            type: 'maintenance',
            priority: daysUntilDue <= 0 ? 'critical' : daysUntilDue <= 3 ? 'high' : 'medium',
            title: daysUntilDue <= 0 ? 'Maintenance Overdue' : 'Maintenance Due',
            message: `${task.title} is ${daysUntilDue <= 0 ? `${Math.abs(daysUntilDue)} days overdue` : `due in ${daysUntilDue} days`}.`,
            category: daysUntilDue <= 0 ? NOTIFICATION_CATEGORIES.MAINTENANCE.OVERDUE : NOTIFICATION_CATEGORIES.MAINTENANCE.DUE,
            entityId: task.id,
            entityName: task.title,
            actionUrl: `/operations/maintenance?task=${task.id}&status=${daysUntilDue <= 0 ? 'overdue' : 'due'}&days=${Math.abs(daysUntilDue)}`,
            isRead: false,
            metadata: {
              taskId: task.id,
              dueDate: task.dueDate,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error checking maintenance due:', error);
    }
  }

  private getHoursUntil(date: string, time: string): number {
    const now = new Date();
    const bookingDateTime = new Date(`${date}T${time}`);
    const diffMs = bookingDateTime.getTime() - now.getTime();
    return diffMs / (1000 * 60 * 60);
  }

  private getDaysOverdue(dueDate: string): number {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = now.getTime() - due.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  private getDaysUntil(dueDate: string): number {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due.getTime() - now.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance(); 