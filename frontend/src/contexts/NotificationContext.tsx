'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Notification } from '../app/components/SmartNotifications';

interface NotificationContextType {
  notifications: Notification[];
  loading: boolean;
  stats: {
    total: number;
    unread: number;
    critical: number;
    high: number;
    byCategory: Record<string, number>;
  };
  fetchNotifications: (filters?: {
    type?: string;
    priority?: string;
    isRead?: boolean;
    category?: string;
    limit?: number;
  }) => Promise<void>;
  fetchStats: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<boolean>;
  markAllAsRead: () => Promise<boolean>;
  dismissNotification: (notificationId: string) => Promise<boolean>;
  createNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => Promise<Notification | null>;
  subscribeToNotifications: (callback: (notification: Notification) => void) => () => void;
  generateSystemNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const notificationHook = useNotifications();

  return (
    <NotificationContext.Provider value={notificationHook}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}; 