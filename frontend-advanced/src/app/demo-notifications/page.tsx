'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useNotificationContext } from '../../contexts/NotificationContext';
import { NOTIFICATION_CATEGORIES } from '../components/SmartNotifications';

export default function DemoNotificationsPage() {
  const { createNotification } = useNotificationContext();
  const [demoResults, setDemoResults] = useState<string[]>([]);

  const addDemoResult = (message: string) => {
    setDemoResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const demoBookingNotification = async () => {
    try {
      await createNotification({
        type: 'booking',
        priority: 'high',
                 title: 'Demo: Upcoming Event',
         message: 'This is a demo booking notification. Click to mark as read.',
        category: NOTIFICATION_CATEGORIES.BOOKING.UPCOMING,
        entityId: 'DEMO-BK-001',
        entityName: 'Demo Event',
        actionUrl: '/bookings?demo=true&notification=demo_booking',
        isRead: false,
        metadata: {
          bookingId: 'DEMO-BK-001',
          clientId: 999,
        },
      });
      addDemoResult('✅ Booking notification created successfully');
    } catch (error) {
      addDemoResult('❌ Failed to create booking notification');
    }
  };

  const demoInventoryNotification = async () => {
    try {
      await createNotification({
        type: 'inventory',
        priority: 'critical',
                 title: 'Demo: Out of Stock Alert',
         message: 'This is a demo inventory notification. Click to mark as read.',
        category: NOTIFICATION_CATEGORIES.INVENTORY.OUT_OF_STOCK,
        entityId: 'DEMO-INV-001',
        entityName: 'Demo Item',
        actionUrl: '/operations/inventory?demo=true&alert=demo_out_of_stock',
        isRead: false,
        metadata: {
          itemId: 999,
        },
      });
      addDemoResult('✅ Inventory notification created successfully');
    } catch (error) {
      addDemoResult('❌ Failed to create inventory notification');
    }
  };

  const demoMaintenanceNotification = async () => {
    try {
      await createNotification({
        type: 'maintenance',
        priority: 'high',
                 title: 'Demo: Maintenance Due',
         message: 'This is a demo maintenance notification. Click to mark as read.',
        category: NOTIFICATION_CATEGORIES.MAINTENANCE.DUE,
        entityId: 'DEMO-TASK-001',
        entityName: 'Demo Task',
        actionUrl: '/operations/maintenance?demo=true&task=demo_maintenance',
        isRead: false,
        metadata: {
          taskId: 'DEMO-TASK-001',
        },
      });
      addDemoResult('✅ Maintenance notification created successfully');
    } catch (error) {
      addDemoResult('❌ Failed to create maintenance notification');
    }
  };

  const demoClientNotification = async () => {
    try {
      await createNotification({
        type: 'client',
        priority: 'critical',
                 title: 'Demo: Payment Overdue',
         message: 'This is a demo client notification. Click to mark as read.',
        category: NOTIFICATION_CATEGORIES.CLIENT.OVERDUE,
        entityId: 'DEMO-INV-001',
        entityName: 'Demo Client',
        actionUrl: '/clients?demo=true&notification=demo_payment',
        isRead: false,
        metadata: {
          clientId: 999,
          amount: 1500,
        },
      });
      addDemoResult('✅ Client notification created successfully');
    } catch (error) {
      addDemoResult('❌ Failed to create client notification');
    }
  };

  const demoSystemNotification = async () => {
    try {
      await createNotification({
        type: 'system',
        priority: 'medium',
                 title: 'Demo: System Alert',
         message: 'This is a demo system notification. Click to mark as read.',
        category: NOTIFICATION_CATEGORIES.SYSTEM.SECURITY,
        actionUrl: '/notifications?demo=true&type=system',
        isRead: false,
      });
      addDemoResult('✅ System notification created successfully');
    } catch (error) {
      addDemoResult('❌ Failed to create system notification');
    }
  };

  const clearDemoResults = () => {
    setDemoResults([]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <NavBar />
      
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          color: 'white',
        }}>
                     <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
             Notification System Demo (MVP)
           </h1>
           <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
             Test the read-only notification system - click to mark as read
           </p>
        </div>

        {/* Demo Controls */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '24px', 
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0', color: '#374151' }}>
            Create Demo Notifications
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <button
              onClick={demoBookingNotification}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              📅 Create Booking Notification
            </button>

            <button
              onClick={demoInventoryNotification}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              📦 Create Inventory Notification
            </button>

            <button
              onClick={demoMaintenanceNotification}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #fd7e14 0%, #e55a00 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🔧 Create Maintenance Notification
            </button>

            <button
              onClick={demoClientNotification}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #6f42c1 0%, #5a2d91 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              👤 Create Client Notification
            </button>

            <button
              onClick={demoSystemNotification}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              ⚙️ Create System Notification
            </button>
          </div>
        </div>

        {/* Instructions */}
                 <div style={{ 
           background: 'white', 
           borderRadius: '12px', 
           padding: '24px', 
           marginBottom: '24px',
           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
         }}>
           <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#374151' }}>
             How to Test
           </h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
             <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
               <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: '#374151' }}>1. Create Notifications</h4>
               <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                 Click the buttons above to create different types of demo notifications.
               </p>
             </div>
             <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
               <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: '#374151' }}>2. Check Notification Bell</h4>
               <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                 Look at the notification bell in the navbar - it should show the new notifications.
               </p>
             </div>
             <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
               <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: '#374151' }}>3. Mark as Read</h4>
               <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                 Click on notifications to mark them as read. This is a read-only MVP version.
               </p>
             </div>
           </div>
         </div>

        {/* Demo Results */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#374151' }}>
              Demo Results
            </h3>
            <button
              onClick={clearDemoResults}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Clear Results
            </button>
          </div>
          
          {demoResults.length === 0 ? (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              color: '#9ca3af',
              background: '#f9fafb',
              borderRadius: '8px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>No demo results yet</div>
              <div style={{ fontSize: '14px' }}>Create some notifications to see results here</div>
            </div>
          ) : (
            <div style={{ 
              background: '#f8f9fa', 
              borderRadius: '8px', 
              padding: '16px',
              maxHeight: '300px',
              overflowY: 'auto',
            }}>
              {demoResults.map((result, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '8px 12px',
                    background: 'white',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '24px',
          marginTop: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0', color: '#374151' }}>
            Quick Navigation
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              href="/notifications"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: '#6a82fb',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              📋 All Notifications
            </a>
            <a 
              href="/bookings"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: '#667eea',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              📅 Bookings
            </a>
            <a 
              href="/operations/inventory"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: '#dc3545',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              📦 Inventory
            </a>
            <a 
              href="/operations/maintenance"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: '#fd7e14',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              🔧 Maintenance
            </a>
            <a 
              href="/clients"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: '#6f42c1',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              👤 Clients
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 