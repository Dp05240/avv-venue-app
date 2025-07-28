# Smart Notifications System

## Overview

The Smart Notifications System is a comprehensive notification management solution designed for the AV+V Venue Management App. It provides real-time alerts, intelligent filtering, and seamless integration across all modules.

## Features

### 🎯 **Core Features**
- **Real-time Notifications**: Instant alerts for critical events
- **Smart Filtering**: Filter by priority, type, category, and read status
- **Category Grouping**: Organize notifications by business function
- **Priority Levels**: Critical, High, Medium, Low priority system
- **Action Integration**: Direct links to relevant pages/actions
- **Read/Unread Management**: Track notification status
- **Search Functionality**: Find specific notifications quickly

### 📱 **User Interface**
- **Notification Bell**: Prominent bell icon with badge count
- **Dropdown Panel**: Quick access to recent notifications
- **Dedicated Page**: Full notification management interface
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Clean, professional design with animations

### 🔧 **Technical Features**
- **Backend API**: Complete REST API for notification management
- **Service Layer**: Reusable notification service
- **Context Provider**: Global state management
- **Custom Hooks**: Easy integration across components
- **TypeScript**: Full type safety and IntelliSense

## Architecture

### Components Structure
```
frontend/src/
├── app/
│   ├── components/
│   │   └── SmartNotifications.tsx          # Main notification component
│   └── notifications/
│       └── page.tsx                        # Dedicated notifications page
├── services/
│   └── notificationService.ts              # Backend integration service
├── hooks/
│   └── useNotifications.ts                 # Custom hook for notifications
├── contexts/
│   └── NotificationContext.tsx             # Global state management
└── SMART_NOTIFICATIONS_SYSTEM.md           # This documentation
```

### Backend API Endpoints
```
GET    /api/notifications                   # Get all notifications
GET    /api/notifications/:id               # Get specific notification
POST   /api/notifications                   # Create new notification
PUT    /api/notifications/:id/read          # Mark as read
PUT    /api/notifications/mark-all-read     # Mark all as read
DELETE /api/notifications/:id               # Dismiss notification
GET    /api/notifications/stats             # Get notification statistics
```

## Notification Types

### 📅 **Booking Notifications**
- **Upcoming Bookings**: Reminders for events within 24 hours
- **Booking Confirmations**: When bookings are confirmed
- **Booking Cancellations**: When bookings are cancelled
- **Booking Reminders**: Setup and preparation reminders
- **Booking Conflicts**: Double booking alerts

### 📦 **Inventory Notifications**
- **Low Stock Alerts**: When items are running low
- **Out of Stock**: When items are completely unavailable
- **Expiry Warnings**: Items approaching expiration
- **Damage Reports**: Equipment damage notifications
- **Restock Reminders**: When items need reordering

### 🔧 **Maintenance Notifications**
- **Maintenance Due**: Scheduled maintenance reminders
- **Maintenance Overdue**: Past due maintenance tasks
- **Maintenance Completed**: Task completion confirmations
- **Urgent Repairs**: Critical repair requirements

### 👤 **Client Notifications**
- **Payment Notifications**: Payment confirmations
- **Payment Overdue**: Late payment alerts
- **Payment Confirmed**: Successful payment notifications
- **Invoice Generated**: New invoice notifications

### ⚙️ **System Notifications**
- **System Backup**: Backup completion alerts
- **System Updates**: Software update notifications
- **System Errors**: Error and warning messages
- **Security Alerts**: Security-related notifications

## Priority Levels

### 🚨 **Critical (Red)**
- Booking conflicts
- Out of stock items
- Urgent repairs
- Security alerts
- Payment overdue > 30 days

### ⚠️ **High (Orange)**
- Upcoming bookings (≤ 2 hours)
- Low stock items
- Maintenance overdue
- Payment overdue (5-30 days)

### 📋 **Medium (Yellow)**
- Booking confirmations
- Maintenance due (≤ 3 days)
- Expiry warnings
- System updates

### ℹ️ **Low (Gray)**
- System backups
- General information
- Non-urgent updates

## Integration Guide

### 1. **Setup Notification Provider**
Wrap your app with the NotificationProvider:

```tsx
// app/layout.tsx
import { NotificationProvider } from '../contexts/NotificationContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
```

### 2. **Add Notification Bell to NavBar**
The SmartNotifications component is already integrated into the NavBar.

### 3. **Create Notifications from Components**
Use the notification context to create notifications:

```tsx
import { useNotificationContext } from '../contexts/NotificationContext';
import { NOTIFICATION_CATEGORIES } from '../app/components/SmartNotifications';

function MyComponent() {
  const { createNotification } = useNotificationContext();

  const handleLowStock = async () => {
    await createNotification({
      type: 'inventory',
      priority: 'high',
      title: 'Low Stock Alert',
      message: 'Champagne glasses are running low. Only 12 units remaining.',
      category: NOTIFICATION_CATEGORIES.INVENTORY.LOW_STOCK,
      entityId: 'INV-001',
      entityName: 'Champagne Glasses',
      actionUrl: '/operations/inventory',
      isRead: false,
      metadata: {
        itemId: 1,
      },
    });
  };

  return (
    <button onClick={handleLowStock}>
      Create Low Stock Alert
    </button>
  );
}
```

### 4. **Subscribe to Real-time Notifications**
Listen for new notifications:

```tsx
import { useNotificationContext } from '../contexts/NotificationContext';

function MyComponent() {
  const { subscribeToNotifications } = useNotificationContext();

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notification) => {
      console.log('New notification:', notification);
      // Handle new notification (e.g., show toast, play sound)
    });

    return unsubscribe;
  }, [subscribeToNotifications]);

  return <div>Component with real-time notifications</div>;
}
```

## Usage Examples

### **Inventory Management Integration**
```tsx
// When inventory is low
const handleInventoryUpdate = async (item: InventoryItem) => {
  if (item.quantity <= item.minQuantity) {
    await createNotification({
      type: 'inventory',
      priority: item.quantity === 0 ? 'critical' : 'high',
      title: item.quantity === 0 ? 'Out of Stock' : 'Low Stock Alert',
      message: `${item.name} is ${item.quantity === 0 ? 'completely out of stock' : `running low (${item.quantity} units remaining)`}.`,
      category: item.quantity === 0 ? NOTIFICATION_CATEGORIES.INVENTORY.OUT_OF_STOCK : NOTIFICATION_CATEGORIES.INVENTORY.LOW_STOCK,
      entityId: item.id.toString(),
      entityName: item.name,
      actionUrl: '/operations/inventory',
      isRead: false,
      metadata: { itemId: item.id },
    });
  }
};
```

### **Booking System Integration**
```tsx
// When booking is confirmed
const handleBookingConfirmation = async (booking: Booking) => {
  await createNotification({
    type: 'booking',
    priority: 'medium',
    title: 'Booking Confirmation',
    message: `${booking.eventType} for ${booking.clientName} has been confirmed for ${booking.date}.`,
    category: NOTIFICATION_CATEGORIES.BOOKING.CONFIRMATION,
    entityId: booking.id,
    entityName: booking.clientName,
    actionUrl: `/bookings/${booking.id}`,
    isRead: false,
    metadata: {
      bookingId: booking.id,
      clientId: booking.clientId,
    },
  });
};
```

### **Payment System Integration**
```tsx
// When payment is overdue
const handlePaymentOverdue = async (invoice: Invoice) => {
  const daysOverdue = getDaysOverdue(invoice.dueDate);
  
  await createNotification({
    type: 'client',
    priority: daysOverdue > 30 ? 'critical' : 'high',
    title: 'Payment Overdue',
    message: `Invoice #${invoice.id} for ${invoice.clientName} is ${daysOverdue} days overdue. Amount: $${invoice.amount}`,
    category: NOTIFICATION_CATEGORIES.CLIENT.OVERDUE,
    entityId: invoice.id,
    entityName: invoice.clientName,
    actionUrl: '/clients/invoices',
    isRead: false,
    metadata: {
      clientId: invoice.clientId,
      amount: invoice.amount,
      dueDate: invoice.dueDate,
    },
  });
};
```

## Configuration

### **Notification Settings**
You can customize notification behavior by modifying the service:

```tsx
// services/notificationService.ts
export class NotificationService {
  // Customize polling interval for real-time updates
  private pollingInterval = 30000; // 30 seconds

  // Customize notification expiration
  private defaultExpiration = 7 * 24 * 60 * 60 * 1000; // 7 days

  // Customize notification limits
  private maxNotifications = 100;
}
```

### **Styling Customization**
The notification components use inline styles for easy customization:

```tsx
// Customize notification colors
const customColors = {
  critical: '#dc3545',
  high: '#fd7e14',
  medium: '#ffc107',
  low: '#6c757d',
};

// Customize notification icons
const customIcons = {
  booking: '📅',
  inventory: '📦',
  maintenance: '🔧',
  client: '👤',
  payment: '💰',
  system: '⚙️',
  alert: '🚨',
};
```

## Best Practices

### **1. Notification Priority**
- Use **Critical** sparingly for immediate attention required
- Use **High** for important but not urgent items
- Use **Medium** for informational updates
- Use **Low** for general system messages

### **2. Notification Content**
- Keep titles concise and descriptive
- Provide actionable messages
- Include relevant entity information
- Use appropriate action URLs

### **3. Performance**
- Limit notification polling frequency
- Implement proper cleanup for subscriptions
- Use pagination for large notification lists
- Cache notification data when appropriate

### **4. User Experience**
- Provide clear action buttons
- Group related notifications
- Allow bulk actions (mark all read)
- Implement proper loading states

## Troubleshooting

### **Common Issues**

1. **Notifications not appearing**
   - Check if NotificationProvider is properly set up
   - Verify backend API is running
   - Check browser console for errors

2. **Real-time updates not working**
   - Verify polling interval is set correctly
   - Check network connectivity
   - Ensure backend endpoints are responding

3. **Notification count not updating**
   - Refresh notification stats after actions
   - Check if markAsRead/dismiss calls are successful
   - Verify state updates are propagating

### **Debug Mode**
Enable debug logging in the notification service:

```tsx
// services/notificationService.ts
private debug = true;

private log(message: string, data?: any) {
  if (this.debug) {
    console.log(`[NotificationService] ${message}`, data);
  }
}
```

## Future Enhancements

### **Planned Features**
- **Push Notifications**: Browser push notifications
- **Email Integration**: Email notifications for critical alerts
- **SMS Integration**: Text message alerts for urgent items
- **Notification Templates**: Predefined notification templates
- **Advanced Filtering**: Date range, custom filters
- **Notification Analytics**: Usage statistics and insights
- **Bulk Operations**: Bulk mark read, delete, etc.
- **Notification Preferences**: User-specific notification settings

### **Technical Improvements**
- **WebSocket Support**: Real-time updates via WebSocket
- **Offline Support**: Queue notifications when offline
- **Performance Optimization**: Virtual scrolling for large lists
- **Accessibility**: Enhanced screen reader support
- **Internationalization**: Multi-language support

## API Reference

### **Notification Interface**
```typescript
interface Notification {
  id: string;
  type: 'booking' | 'inventory' | 'maintenance' | 'client' | 'payment' | 'system' | 'alert';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  category: string;
  entityId?: string;
  entityName?: string;
  actionUrl?: string;
  createdAt: string;
  isRead: boolean;
  expiresAt?: string;
  metadata?: {
    bookingId?: string;
    clientId?: number;
    itemId?: number;
    taskId?: string;
    amount?: number;
    dueDate?: string;
  };
}
```

### **Service Methods**
```typescript
class NotificationService {
  getNotifications(filters?: FilterOptions): Promise<Notification[]>;
  markAsRead(notificationId: string): Promise<boolean>;
  markAllAsRead(): Promise<boolean>;
  dismissNotification(notificationId: string): Promise<boolean>;
  createNotification(notification: CreateNotificationRequest): Promise<Notification | null>;
  getNotificationStats(): Promise<NotificationStats>;
  subscribeToNotifications(callback: NotificationCallback): () => void;
  generateSystemNotifications(): Promise<void>;
}
```

### **Hook Methods**
```typescript
const useNotifications = () => {
  return {
    notifications: Notification[];
    loading: boolean;
    stats: NotificationStats;
    fetchNotifications: (filters?: FilterOptions) => Promise<void>;
    fetchStats: () => Promise<void>;
    markAsRead: (notificationId: string) => Promise<boolean>;
    markAllAsRead: () => Promise<boolean>;
    dismissNotification: (notificationId: string) => Promise<boolean>;
    createNotification: (notification: CreateNotificationRequest) => Promise<Notification | null>;
    subscribeToNotifications: (callback: NotificationCallback) => () => void;
    generateSystemNotifications: () => Promise<void>;
  };
};
```

---

This Smart Notifications System provides a comprehensive solution for managing all types of notifications in the AV+V Venue Management App. It's designed to be scalable, maintainable, and user-friendly while providing powerful features for effective notification management. 