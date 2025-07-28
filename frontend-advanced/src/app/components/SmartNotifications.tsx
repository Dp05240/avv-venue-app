'use client';

import React, { useState, useEffect, useRef } from 'react';

// Notification Types
export interface Notification {
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

// Notification Categories
export const NOTIFICATION_CATEGORIES = {
  BOOKING: {
    UPCOMING: 'Upcoming Bookings',
    CONFIRMATION: 'Booking Confirmations',
    CANCELLATION: 'Booking Cancellations',
    REMINDER: 'Booking Reminders',
    CONFLICT: 'Booking Conflicts',
  },
  INVENTORY: {
    LOW_STOCK: 'Low Stock Alerts',
    OUT_OF_STOCK: 'Out of Stock',
    EXPIRY: 'Expiry Warnings',
    DAMAGE: 'Damage Reports',
    RESTOCK: 'Restock Reminders',
  },
  MAINTENANCE: {
    DUE: 'Maintenance Due',
    OVERDUE: 'Maintenance Overdue',
    COMPLETED: 'Maintenance Completed',
    URGENT: 'Urgent Repairs',
  },
  CLIENT: {
    PAYMENT: 'Payment Notifications',
    OVERDUE: 'Payment Overdue',
    CONFIRMATION: 'Payment Confirmed',
    INVOICE: 'Invoice Generated',
  },
  SYSTEM: {
    BACKUP: 'System Backup',
    UPDATE: 'System Updates',
    ERROR: 'System Errors',
    SECURITY: 'Security Alerts',
  },
};

interface SmartNotificationsProps {
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onDismiss?: (notificationId: string) => void;
}

export default function SmartNotifications({ 
  onNotificationClick, 
  onMarkAsRead, 
  onDismiss 
}: SmartNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'critical' | 'high'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [groupByCategory, setGroupByCategory] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample notifications data with proper action URLs
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      // Booking Notifications
      {
        id: '1',
        type: 'booking',
        priority: 'high',
        title: 'Upcoming Wedding Reception',
        message: 'Wedding reception for Sarah & John is tomorrow at 6 PM. Setup required at 2 PM.',
        category: NOTIFICATION_CATEGORIES.BOOKING.UPCOMING,
        entityId: 'BK-2001',
        entityName: 'Sarah & John Wedding',
        actionUrl: '/bookings/BK-2001',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        isRead: false,
        metadata: {
          bookingId: 'BK-2001',
          clientId: 1,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }
      },
      {
        id: '2',
        type: 'booking',
        priority: 'medium',
        title: 'Booking Confirmation',
        message: 'Corporate event for Acme Corp has been confirmed for August 15th.',
        category: NOTIFICATION_CATEGORIES.BOOKING.CONFIRMATION,
        entityId: 'BK-2002',
        entityName: 'Acme Corp Event',
        actionUrl: '/bookings/BK-2002',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        isRead: true,
        metadata: {
          bookingId: 'BK-2002',
          clientId: 2,
        }
      },
      {
        id: '3',
        type: 'booking',
        priority: 'critical',
        title: 'Booking Conflict Detected',
        message: 'Double booking detected for Main Hall on August 20th. Immediate attention required.',
        category: NOTIFICATION_CATEGORIES.BOOKING.CONFLICT,
        entityId: 'BK-2003',
        entityName: 'Main Hall',
        actionUrl: '/bookings',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        isRead: false,
        metadata: {
          bookingId: 'BK-2003',
        }
      },

      // Inventory Notifications
      {
        id: '4',
        type: 'inventory',
        priority: 'high',
        title: 'Low Stock Alert',
        message: 'Champagne glasses are running low. Only 12 units remaining.',
        category: NOTIFICATION_CATEGORIES.INVENTORY.LOW_STOCK,
        entityId: 'INV-001',
        entityName: 'Champagne Glasses',
        actionUrl: '/operations/inventory?item=1&alert=low_stock',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        isRead: false,
        metadata: {
          itemId: 1,
        }
      },
      {
        id: '5',
        type: 'inventory',
        priority: 'critical',
        title: 'Out of Stock',
        message: 'Table linens are completely out of stock. Urgent restock needed.',
        category: NOTIFICATION_CATEGORIES.INVENTORY.OUT_OF_STOCK,
        entityId: 'INV-002',
        entityName: 'Table Linens',
        actionUrl: '/operations/inventory?item=2&alert=out_of_stock',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        isRead: false,
        metadata: {
          itemId: 2,
        }
      },
      {
        id: '6',
        type: 'inventory',
        priority: 'medium',
        title: 'Expiry Warning',
        message: 'Catering supplies will expire in 3 days. Consider using for upcoming events.',
        category: NOTIFICATION_CATEGORIES.INVENTORY.EXPIRY,
        entityId: 'INV-003',
        entityName: 'Catering Supplies',
        actionUrl: '/operations/inventory?item=3&alert=expiry',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        isRead: true,
        metadata: {
          itemId: 3,
        }
      },

      // Maintenance Notifications
      {
        id: '7',
        type: 'maintenance',
        priority: 'high',
        title: 'HVAC Maintenance Due',
        message: 'Quarterly HVAC maintenance is due this week. Schedule with technician.',
        category: NOTIFICATION_CATEGORIES.MAINTENANCE.DUE,
        entityId: 'TASK-001',
        entityName: 'HVAC System',
        actionUrl: '/operations/maintenance?task=TASK-001&status=due',
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        isRead: false,
        metadata: {
          taskId: 'TASK-001',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        }
      },
      {
        id: '8',
        type: 'maintenance',
        priority: 'critical',
        title: 'Urgent Repair Required',
        message: 'Kitchen sink is leaking. Immediate repair needed to prevent water damage.',
        category: NOTIFICATION_CATEGORIES.MAINTENANCE.URGENT,
        entityId: 'TASK-002',
        entityName: 'Kitchen Sink',
        actionUrl: '/operations/maintenance?task=TASK-002&priority=urgent',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        isRead: false,
        metadata: {
          taskId: 'TASK-002',
        }
      },

      // Client/Payment Notifications
      {
        id: '9',
        type: 'client',
        priority: 'high',
        title: 'Payment Overdue',
        message: 'Invoice #INV-2024-001 for Beta Events is 5 days overdue. Amount: $1,800',
        category: NOTIFICATION_CATEGORIES.CLIENT.OVERDUE,
        entityId: 'INV-2024-001',
        entityName: 'Beta Events',
        actionUrl: '/clients',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        isRead: false,
        metadata: {
          clientId: 2,
          amount: 1800,
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        }
      },
      {
        id: '10',
        type: 'client',
        priority: 'medium',
        title: 'Payment Confirmed',
        message: 'Payment received for Gamma Group. Invoice #INV-2024-002. Amount: $1,200',
        category: NOTIFICATION_CATEGORIES.CLIENT.CONFIRMATION,
        entityId: 'INV-2024-002',
        entityName: 'Gamma Group',
        actionUrl: '/clients',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        isRead: true,
        metadata: {
          clientId: 3,
          amount: 1200,
        }
      },

      // System Notifications
      {
        id: '11',
        type: 'system',
        priority: 'low',
        title: 'System Backup Completed',
        message: 'Daily system backup completed successfully at 2:00 AM.',
        category: NOTIFICATION_CATEGORIES.SYSTEM.BACKUP,
        actionUrl: '/notifications?type=system&category=backup',
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
        isRead: true,
      },
      {
        id: '12',
        type: 'system',
        priority: 'medium',
        title: 'Security Alert',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        category: NOTIFICATION_CATEGORIES.SYSTEM.SECURITY,
        actionUrl: '/notifications?type=system&category=security',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
        isRead: false,
      },
    ];

    setNotifications(sampleNotifications);
  }, []);

  // Filter notifications based on active filter and search
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'unread' && !notification.isRead) ||
      (activeFilter === 'critical' && notification.priority === 'critical') ||
      (activeFilter === 'high' && ['critical', 'high'].includes(notification.priority));

    const matchesSearch = 
      !searchTerm ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Group notifications by category if enabled
  const groupedNotifications = groupByCategory 
    ? filteredNotifications.reduce((groups, notification) => {
        const category = notification.category;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(notification);
        return groups;
      }, {} as Record<string, Notification[]>)
    : { 'All Notifications': filteredNotifications };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' && !n.isRead).length;

  // Handle notification click - just mark as read for MVP
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
      );
      onMarkAsRead?.(notification.id);
    }
    onNotificationClick?.(notification);
    
    // Close dropdown
    setIsOpen(false);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
    onMarkAsRead?.(notificationId);
  };

  const handleDismiss = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    onDismiss?.(notificationId);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get notification icon and color
  const getNotificationIcon = (type: string, priority: string) => {
    const icons = {
      booking: '📅',
      inventory: '📦',
      maintenance: '🔧',
      client: '👤',
      payment: '💰',
      system: '⚙️',
      alert: '🚨',
    };

    const colors = {
      low: '#6c757d',
      medium: '#ffc107',
      high: '#fd7e14',
      critical: '#dc3545',
    };

    return { icon: icons[type as keyof typeof icons] || '🔔', color: colors[priority as keyof typeof colors] };
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          background: 'none',
          border: '1px solid #e9ecef',
          padding: '8px 12px',
          borderRadius: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          color: '#6a82fb',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f8f9fa';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
          <path 
            d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
          <circle cx="12" cy="20" r="1.5" fill="currentColor"/>
        </svg>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            background: criticalCount > 0 ? '#dc3545' : '#6a82fb',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            border: '2px solid white',
          }}>
            {criticalCount > 0 ? criticalCount : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          width: '400px',
          maxHeight: '600px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          border: '1px solid #e9ecef',
          zIndex: 1000,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #e9ecef',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ×
              </button>
            </div>

            {/* Filters and Search */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {(['all', 'unread', 'critical', 'high'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeFilter === filter ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>
                {unreadCount} unread • {criticalCount} critical
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setGroupByCategory(!groupByCategory)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {groupByCategory ? 'Ungroup' : 'Group'}
                </button>
                <button
                  onClick={handleMarkAllAsRead}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Mark All Read
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {Object.keys(groupedNotifications).length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6c757d' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>No notifications</div>
                <div style={{ fontSize: '14px' }}>You're all caught up!</div>
              </div>
            ) : (
              Object.entries(groupedNotifications).map(([category, categoryNotifications]) => (
                <div key={category}>
                  {groupByCategory && (
                    <div style={{
                      padding: '12px 20px',
                      background: '#f8f9fa',
                      borderBottom: '1px solid #e9ecef',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#495057',
                    }}>
                      {category} ({categoryNotifications.length})
                    </div>
                  )}
                  {categoryNotifications.map((notification) => {
                    const { icon, color } = getNotificationIcon(notification.type, notification.priority);
                    return (
                      <div
                        key={notification.id}
                        style={{
                          padding: '16px 20px',
                          borderBottom: '1px solid #f1f3f4',
                          background: notification.isRead ? 'white' : '#f8f9ff',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = notification.isRead ? '#f8f9fa' : '#f0f4ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = notification.isRead ? 'white' : '#f8f9ff';
                        }}
                        onClick={() => handleNotificationClick(notification)}
                        title="Click to mark as read"
                      >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            flexShrink: 0,
                          }}>
                            {icon}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                              <h4 style={{
                                margin: 0,
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#232323',
                                lineHeight: '1.3',
                              }}>
                                {notification.title}
                              </h4>
                              {!notification.isRead && (
                                <span style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: color,
                                  flexShrink: 0,
                                  marginLeft: '8px',
                                }} />
                              )}
                            </div>
                            <p style={{
                              margin: '4px 0 8px 0',
                              fontSize: '13px',
                              color: '#6c757d',
                              lineHeight: '1.4',
                            }}>
                              {notification.message}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '12px', color: '#adb5bd' }}>
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                              <div style={{ display: 'flex', gap: '4px' }}>
                                {!notification.isRead && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMarkAsRead(notification.id);
                                    }}
                                    style={{
                                      padding: '4px 8px',
                                      borderRadius: '4px',
                                      border: 'none',
                                      background: '#e9ecef',
                                      color: '#6c757d',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Mark Read
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDismiss(notification.id);
                                  }}
                                  style={{
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    background: '#e9ecef',
                                    color: '#6c757d',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Dismiss
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '12px 20px',
            borderTop: '1px solid #e9ecef',
            background: '#f8f9fa',
            textAlign: 'center',
          }}>
            <button
              onClick={() => window.location.href = '/notifications'}
              style={{
                background: 'none',
                border: 'none',
                color: '#6a82fb',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 