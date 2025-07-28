'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Notification, NOTIFICATION_CATEGORIES } from '../components/SmartNotifications';
import { notificationService } from '../../services/notificationService';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    critical: 0,
    high: 0,
    byCategory: {} as Record<string, number>,
  });

  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await notificationService.getNotificationStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching notification stats:', error);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const success = await notificationService.markAsRead(notificationId);
      if (success) {
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
        );
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const success = await notificationService.markAllAsRead();
      if (success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleDismiss = async (notificationId: string) => {
    try {
      const success = await notificationService.dismissNotification(notificationId);
      if (success) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error dismissing notification:', error);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'unread' && !notification.isRead) ||
      (activeFilter === 'critical' && notification.priority === 'critical') ||
      (activeFilter === 'high' && notification.priority === 'high') ||
      (activeFilter === 'medium' && notification.priority === 'medium') ||
      (activeFilter === 'low' && notification.priority === 'low');

    const matchesType = typeFilter === 'all' || notification.type === typeFilter;

    const matchesSearch = 
      !searchTerm ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesType && matchesSearch;
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

  const notificationTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'booking', label: 'Bookings' },
    { value: 'inventory', label: 'Inventory' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'client', label: 'Clients' },
    { value: 'payment', label: 'Payments' },
    { value: 'system', label: 'System' },
    { value: 'alert', label: 'Alerts' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <NavBar />
      
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          color: 'white',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
                Notifications Center
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
                Stay updated with all important events and alerts
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleMarkAllAsRead}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >
                Mark All Read
              </button>
              <button
                onClick={() => setGroupByCategory(!groupByCategory)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >
                {groupByCategory ? 'Ungroup' : 'Group by Category'}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{stats.total}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Total</div>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{stats.unread}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Unread</div>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px', color: '#dc3545' }}>{stats.critical}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Critical</div>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px', color: '#fd7e14' }}>{stats.high}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>High Priority</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '24px', 
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Priority Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Priority
              </label>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as any)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  minWidth: '120px',
                }}
              >
                <option value="all">All Priorities</option>
                <option value="unread">Unread Only</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  minWidth: '120px',
                }}
              >
                {notificationTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '16px', color: '#6b7280' }}>Loading notifications...</div>
            </div>
          ) : Object.keys(groupedNotifications).length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                No notifications found
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                {searchTerm || activeFilter !== 'all' || typeFilter !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'You\'re all caught up!'}
              </div>
            </div>
          ) : (
            Object.entries(groupedNotifications).map(([category, categoryNotifications]) => (
              <div key={category}>
                {groupByCategory && (
                  <div style={{
                    padding: '16px 24px',
                    background: '#f8f9fa',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
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
                        padding: '20px 24px',
                        borderBottom: '1px solid #f3f4f6',
                        background: notification.isRead ? 'white' : '#f8f9ff',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = notification.isRead ? '#f9fafb' : '#f0f4ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = notification.isRead ? 'white' : '#f8f9ff';
                      }}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          flexShrink: 0,
                        }}>
                          {icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <h3 style={{
                              margin: 0,
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#111827',
                              lineHeight: '1.4',
                            }}>
                              {notification.title}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {!notification.isRead && (
                                <span style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: color,
                                  flexShrink: 0,
                                }} />
                              )}
                              <span style={{
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: '500',
                                background: color,
                                color: 'white',
                              }}>
                                {notification.priority.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <p style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            color: '#6b7280',
                            lineHeight: '1.5',
                          }}>
                            {notification.message}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                              {notification.entityName && (
                                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                                  {notification.entityName}
                                </span>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {!notification.isRead && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  style={{
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #d1d5db',
                                    background: 'white',
                                    color: '#374151',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#f9fafb';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'white';
                                  }}
                                >
                                  Mark Read
                                </button>
                              )}
                              <button
                                onClick={() => handleDismiss(notification.id)}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  border: '1px solid #d1d5db',
                                  background: 'white',
                                  color: '#374151',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f9fafb';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'white';
                                }}
                              >
                                Dismiss
                              </button>
                                                             <button
                                 onClick={() => handleMarkAsRead(notification.id)}
                                 style={{
                                   padding: '6px 12px',
                                   borderRadius: '6px',
                                   border: 'none',
                                   background: notification.isRead ? '#e9ecef' : '#6a82fb',
                                   color: notification.isRead ? '#6c757d' : 'white',
                                   fontSize: '12px',
                                   cursor: notification.isRead ? 'default' : 'pointer',
                                   transition: 'all 0.2s ease',
                                 }}
                                 disabled={notification.isRead}
                                 onMouseEnter={(e) => {
                                   if (!notification.isRead) {
                                     e.currentTarget.style.background = '#5a6fd8';
                                   }
                                 }}
                                 onMouseLeave={(e) => {
                                   if (!notification.isRead) {
                                     e.currentTarget.style.background = '#6a82fb';
                                   }
                                 }}
                               >
                                 {notification.isRead ? 'Read' : 'Mark Read'}
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
      </div>
    </div>
  );
} 