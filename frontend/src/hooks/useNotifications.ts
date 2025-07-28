import { useState, useEffect, useCallback } from 'react';
import { Notification } from '../app/components/SmartNotifications';
import { notificationService } from '../services/notificationService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    critical: 0,
    high: 0,
    byCategory: {} as Record<string, number>,
  });

  // Fetch notifications
  const fetchNotifications = useCallback(async (filters?: {
    type?: string;
    priority?: string;
    isRead?: boolean;
    category?: string;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications(filters);
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const data = await notificationService.getNotificationStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching notification stats:', error);
    }
  }, []);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const success = await notificationService.markAsRead(notificationId);
      if (success) {
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
        );
        fetchStats(); // Refresh stats
      }
      return success;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }, [fetchStats]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      const success = await notificationService.markAllAsRead();
      if (success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        fetchStats(); // Refresh stats
      }
      return success;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }, [fetchStats]);

  // Dismiss notification
  const dismissNotification = useCallback(async (notificationId: string) => {
    try {
      const success = await notificationService.dismissNotification(notificationId);
      if (success) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        fetchStats(); // Refresh stats
      }
      return success;
    } catch (error) {
      console.error('Error dismissing notification:', error);
      return false;
    }
  }, [fetchStats]);

  // Create notification
  const createNotification = useCallback(async (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    try {
      const newNotification = await notificationService.createNotification(notification);
      if (newNotification) {
        setNotifications(prev => [newNotification, ...prev]);
        fetchStats(); // Refresh stats
      }
      return newNotification;
    } catch (error) {
      console.error('Error creating notification:', error);
      return null;
    }
  }, [fetchStats]);

  // Subscribe to real-time notifications
  const subscribeToNotifications = useCallback((callback: (notification: Notification) => void) => {
    return notificationService.subscribeToNotifications(callback);
  }, []);

  // Generate system notifications
  const generateSystemNotifications = useCallback(async () => {
    try {
      await notificationService.generateSystemNotifications();
      fetchNotifications(); // Refresh notifications
      fetchStats(); // Refresh stats
    } catch (error) {
      console.error('Error generating system notifications:', error);
    }
  }, [fetchNotifications, fetchStats]);

  // Initialize
  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, [fetchNotifications, fetchStats]);

  return {
    notifications,
    loading,
    stats,
    fetchNotifications,
    fetchStats,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    createNotification,
    subscribeToNotifications,
    generateSystemNotifications,
  };
}; 