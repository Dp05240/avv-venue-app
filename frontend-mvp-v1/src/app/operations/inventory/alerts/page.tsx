'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import { InventoryAlert } from '../types';
import { inventoryApi } from '../../../../services/api';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const response = await inventoryApi.getAlerts();
      if (response.data) {
        setAlerts(response.data);
      } else {
        setError(response.error || 'Failed to load alerts');
      }
    } catch (error) {
      setError('An error occurred while loading alerts');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (alert: InventoryAlert) => {
    try {
      const response = await inventoryApi.markAlertAsRead(alert.id);
      if (response.data) {
        setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, isRead: true } : a));
      }
    } catch (error) {
      console.error('Failed to mark alert as read:', error);
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'low_stock': return { color: '#e74c3c', background: '#fee2e2' };
      case 'expiry': return { color: '#f59e0b', background: '#fef3c7' };
      case 'overstock': return { color: '#10b981', background: '#10b98120' };
      case 'damage': return { color: '#dc2626', background: '#fee2e2' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return '⚠️';
      case 'expiry': return '⏰';
      case 'overstock': return '📦';
      case 'damage': return '💥';
      default: return '🔔';
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading alerts...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>Inventory Alerts</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>Monitor system alerts and notifications</p>
          </div>

          {error && (
            <div style={{ 
              background: '#fee2e2', 
              border: '1px solid #fecaca', 
              borderRadius: '6px', 
              padding: '12px', 
              marginBottom: '24px',
              color: '#dc2626'
            }}>
              {error}
            </div>
          )}

          {/* Alerts List */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            overflow: 'hidden' 
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#232323' }}>System Alerts</h2>
            </div>
            
            <div>
              {alerts.map(alert => (
                <div 
                  key={alert.id} 
                  style={{ 
                    padding: '20px 24px', 
                    borderBottom: '1px solid #f3f4f6',
                    background: alert.isRead ? '#fff' : '#fef7f0',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ 
                      padding: '8px', 
                      background: '#f3f4f6', 
                      borderRadius: '6px',
                      fontSize: '20px'
                    }}>
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ 
                          display: 'inline-flex',
                          padding: '4px 8px',
                          fontSize: '12px',
                          fontWeight: '500',
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                          ...getAlertTypeColor(alert.type)
                        }}>
                          {alert.type.replace('_', ' ')}
                        </span>
                        {!alert.isRead && (
                          <span style={{ 
                            display: 'inline-block',
                            width: '8px',
                            height: '8px',
                            background: '#e74c3c',
                            borderRadius: '50%'
                          }} />
                        )}
                      </div>
                      
                      <div style={{ fontSize: '14px', color: '#232323', marginBottom: '4px' }}>
                        {alert.itemName}
                      </div>
                      
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        {alert.message}
                      </div>
                      
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#9ca3af',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span>{new Date(alert.createdAt).toLocaleString()}</span>
                        {!alert.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(alert)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#667eea',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {alerts.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '48px', 
                color: '#666'
              }}>
                No alerts found. You're all caught up!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 