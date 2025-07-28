'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar';

export default function DemoNotificationsPage() {
  const [demoResults, setDemoResults] = useState<string[]>([]);

  const addDemoResult = (message: string) => {
    setDemoResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const demoBookingNotification = async () => {
    try {
      // Simulate notification creation
      addDemoResult('✅ Booking notification created successfully (Demo Mode)');
    } catch (error) {
      addDemoResult('❌ Failed to create booking notification');
    }
  };

  const demoInventoryNotification = async () => {
    try {
      // Simulate notification creation
      addDemoResult('✅ Inventory notification created successfully (Demo Mode)');
    } catch (error) {
      addDemoResult('❌ Failed to create inventory notification');
    }
  };

  const demoMaintenanceNotification = async () => {
    try {
      // Simulate notification creation
      addDemoResult('✅ Maintenance notification created successfully (Demo Mode)');
    } catch (error) {
      addDemoResult('❌ Failed to create maintenance notification');
    }
  };

  const demoClientNotification = async () => {
    try {
      // Simulate notification creation
      addDemoResult('✅ Client notification created successfully (Demo Mode)');
    } catch (error) {
      addDemoResult('❌ Failed to create client notification');
    }
  };

  const demoSystemNotification = async () => {
    try {
      // Simulate notification creation
      addDemoResult('✅ System notification created successfully (Demo Mode)');
    } catch (error) {
      addDemoResult('❌ Failed to create system notification');
    }
  };

  const clearDemoResults = () => {
    setDemoResults([]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            background: '#fff', 
            borderRadius: '16px', 
            padding: '32px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#232323', marginBottom: '16px' }}>
              Demo Notifications
            </h1>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
              Test the notification system with demo notifications
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <button
                onClick={demoBookingNotification}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📅 Demo Booking Notification
              </button>

              <button
                onClick={demoInventoryNotification}
                style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📦 Demo Inventory Notification
              </button>

              <button
                onClick={demoMaintenanceNotification}
                style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🔧 Demo Maintenance Notification
              </button>

              <button
                onClick={demoClientNotification}
                style={{
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                👥 Demo Client Notification
              </button>

              <button
                onClick={demoSystemNotification}
                style={{
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ⚙️ Demo System Notification
              </button>
            </div>

            <div style={{ 
              background: '#f8f9fa', 
              borderRadius: '8px', 
              padding: '20px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323' }}>
                  Demo Results
                </h3>
                <button
                  onClick={clearDemoResults}
                  style={{
                    background: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Clear Results
                </button>
              </div>

              <div style={{ 
                maxHeight: '300px', 
                overflowY: 'auto',
                background: '#fff',
                borderRadius: '6px',
                padding: '16px',
                border: '1px solid #e9ecef'
              }}>
                {demoResults.length === 0 ? (
                  <p style={{ color: '#666', fontSize: '14px', textAlign: 'center' }}>
                    Click the buttons above to see demo results here...
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {demoResults.map((result, index) => (
                      <div key={index} style={{ 
                        fontSize: '13px', 
                        color: '#232323',
                        padding: '8px',
                        background: '#f8f9fa',
                        borderRadius: '4px',
                        border: '1px solid #e9ecef'
                      }}>
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              background: '#e3f2fd', 
              borderRadius: '8px',
              border: '1px solid #bbdefb'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1976d2', marginBottom: '8px' }}>
                ℹ️ Demo Mode
              </h4>
              <p style={{ fontSize: '14px', color: '#1976d2', lineHeight: '1.5' }}>
                This is a demo version for static export. In a full implementation, these buttons would create real notifications 
                that appear in the notification center and can be managed through the notification system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 