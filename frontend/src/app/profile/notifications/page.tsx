'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Link from 'next/link';

interface NotificationSettings {
  email: {
    enabled: boolean;
    bookingConfirmations: boolean;
    bookingReminders: boolean;
    paymentReceipts: boolean;
    systemUpdates: boolean;
    marketingEmails: boolean;
  };
  sms: {
    enabled: boolean;
    bookingConfirmations: boolean;
    bookingReminders: boolean;
    urgentAlerts: boolean;
  };
  push: {
    enabled: boolean;
    bookingUpdates: boolean;
    newMessages: boolean;
    systemAlerts: boolean;
  };
  frequency: {
    bookingReminders: 'immediate' | '1_hour' | '24_hours' | 'disabled';
    paymentReminders: 'immediate' | '1_day' | '3_days' | 'disabled';
    systemUpdates: 'immediate' | 'daily' | 'weekly' | 'disabled';
  };
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      enabled: true,
      bookingConfirmations: true,
      bookingReminders: true,
      paymentReceipts: true,
      systemUpdates: false,
      marketingEmails: false
    },
    sms: {
      enabled: false,
      bookingConfirmations: false,
      bookingReminders: false,
      urgentAlerts: true
    },
    push: {
      enabled: true,
      bookingUpdates: true,
      newMessages: true,
      systemAlerts: false
    },
    frequency: {
      bookingReminders: '24_hours',
      paymentReminders: '1_day',
      systemUpdates: 'daily'
    }
  });

  const [saving, setSaving] = useState(false);
  const [testNotification, setTestNotification] = useState('');

  const handleToggle = (category: keyof NotificationSettings, field: string, value: boolean) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: value
      }
    });
  };

  const handleFrequencyChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      frequency: {
        ...settings.frequency,
        [field]: value as any
      }
    });
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      // TODO: Replace with actual API call
      // await profileApi.updateNotificationSettings(settings);
      
      console.log('Notification settings updated:', settings);
      alert('Notification settings saved successfully!');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Failed to save notification settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleTestNotification = async (type: 'email' | 'sms' | 'push') => {
    try {
      // TODO: Replace with actual API call
      // await profileApi.sendTestNotification(type);
      
      alert(`Test ${type} notification sent successfully!`);
    } catch (error) {
      console.error(`Error sending test ${type} notification:`, error);
      alert(`Failed to send test ${type} notification. Please try again.`);
    }
  };

  const getFrequencyLabel = (value: string) => {
    switch (value) {
      case 'immediate': return 'Immediate';
      case '1_hour': return '1 hour before';
      case '24_hours': return '24 hours before';
      case '1_day': return '1 day before';
      case '3_days': return '3 days before';
      case 'daily': return 'Daily digest';
      case 'weekly': return 'Weekly digest';
      case 'disabled': return 'Disabled';
      default: return value;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>
                  Notification Settings
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Manage how and when you receive notifications
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/profile" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    Back to Profile
                  </button>
                </Link>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  style={{
                    background: saving ? '#9ca3af' : '#10b981',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: saving ? 'not-allowed' : 'pointer'
                  }}
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
            {/* Left Column - Navigation */}
            <div>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                  Profile Sections
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href="/profile" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      📋 Personal Information
                    </div>
                  </Link>
                  <Link href="/profile/security" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      🔒 Security & Password
                    </div>
                  </Link>
                  <Link href="/profile/notifications" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#3b82f6',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      🔔 Notifications
                    </div>
                  </Link>
                  <Link href="/profile/preferences" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      ⚙️ Preferences
                    </div>
                  </Link>
                  <Link href="/profile/billing" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      💳 Billing & Subscription
                    </div>
                  </Link>
                  <Link href="/profile/activity" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      📊 Activity & Analytics
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Notification Settings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Email Notifications */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                      Email Notifications
                    </h2>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      Receive notifications via email
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleTestNotification('email')}
                      style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Test Email
                    </button>
                    <button
                      onClick={() => handleToggle('email', 'enabled', !settings.email.enabled)}
                      style={{
                        background: settings.email.enabled ? '#10b981' : '#e5e7eb',
                        color: settings.email.enabled ? '#fff' : '#374151',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.email.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Booking Confirmations
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Receive confirmation when bookings are made
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('email', 'bookingConfirmations', !settings.email.bookingConfirmations)}
                      style={{
                        background: settings.email.bookingConfirmations ? '#10b981' : '#e5e7eb',
                        color: settings.email.bookingConfirmations ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.email.bookingConfirmations ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Booking Reminders
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Get reminded about upcoming bookings
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('email', 'bookingReminders', !settings.email.bookingReminders)}
                      style={{
                        background: settings.email.bookingReminders ? '#10b981' : '#e5e7eb',
                        color: settings.email.bookingReminders ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.email.bookingReminders ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Payment Receipts
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Receive payment confirmations and receipts
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('email', 'paymentReceipts', !settings.email.paymentReceipts)}
                      style={{
                        background: settings.email.paymentReceipts ? '#10b981' : '#e5e7eb',
                        color: settings.email.paymentReceipts ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.email.paymentReceipts ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        System Updates
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Important system updates and maintenance
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('email', 'systemUpdates', !settings.email.systemUpdates)}
                      style={{
                        background: settings.email.systemUpdates ? '#10b981' : '#e5e7eb',
                        color: settings.email.systemUpdates ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.email.systemUpdates ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Marketing Emails
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Promotional content and special offers
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('email', 'marketingEmails', !settings.email.marketingEmails)}
                      style={{
                        background: settings.email.marketingEmails ? '#10b981' : '#e5e7eb',
                        color: settings.email.marketingEmails ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.email.marketingEmails ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

              {/* SMS Notifications */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                      SMS Notifications
                    </h2>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      Receive notifications via text message
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleTestNotification('sms')}
                      style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Test SMS
                    </button>
                    <button
                      onClick={() => handleToggle('sms', 'enabled', !settings.sms.enabled)}
                      style={{
                        background: settings.sms.enabled ? '#10b981' : '#e5e7eb',
                        color: settings.sms.enabled ? '#fff' : '#374151',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.sms.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Booking Confirmations
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        SMS confirmation for new bookings
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('sms', 'bookingConfirmations', !settings.sms.bookingConfirmations)}
                      style={{
                        background: settings.sms.bookingConfirmations ? '#10b981' : '#e5e7eb',
                        color: settings.sms.bookingConfirmations ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.sms.bookingConfirmations ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Booking Reminders
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        SMS reminders for upcoming events
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('sms', 'bookingReminders', !settings.sms.bookingReminders)}
                      style={{
                        background: settings.sms.bookingReminders ? '#10b981' : '#e5e7eb',
                        color: settings.sms.bookingReminders ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.sms.bookingReminders ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Urgent Alerts
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Critical notifications and emergencies
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('sms', 'urgentAlerts', !settings.sms.urgentAlerts)}
                      style={{
                        background: settings.sms.urgentAlerts ? '#10b981' : '#e5e7eb',
                        color: settings.sms.urgentAlerts ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.sms.urgentAlerts ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Push Notifications */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                      Push Notifications
                    </h2>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      Receive notifications in your browser
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleTestNotification('push')}
                      style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Test Push
                    </button>
                    <button
                      onClick={() => handleToggle('push', 'enabled', !settings.push.enabled)}
                      style={{
                        background: settings.push.enabled ? '#10b981' : '#e5e7eb',
                        color: settings.push.enabled ? '#fff' : '#374151',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.push.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Booking Updates
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Real-time updates on booking status
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('push', 'bookingUpdates', !settings.push.bookingUpdates)}
                      style={{
                        background: settings.push.bookingUpdates ? '#10b981' : '#e5e7eb',
                        color: settings.push.bookingUpdates ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.push.bookingUpdates ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        New Messages
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Notifications for new client messages
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('push', 'newMessages', !settings.push.newMessages)}
                      style={{
                        background: settings.push.newMessages ? '#10b981' : '#e5e7eb',
                        color: settings.push.newMessages ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.push.newMessages ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        System Alerts
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Important system notifications
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('push', 'systemAlerts', !settings.push.systemAlerts)}
                      style={{
                        background: settings.push.systemAlerts ? '#10b981' : '#e5e7eb',
                        color: settings.push.systemAlerts ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {settings.push.systemAlerts ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Frequency */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Notification Frequency
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Booking Reminders
                    </label>
                    <select
                      value={settings.frequency.bookingReminders}
                      onChange={(e) => handleFrequencyChange('bookingReminders', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#fff'
                      }}
                    >
                      <option value="immediate">Immediate</option>
                      <option value="1_hour">1 hour before</option>
                      <option value="24_hours">24 hours before</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Payment Reminders
                    </label>
                    <select
                      value={settings.frequency.paymentReminders}
                      onChange={(e) => handleFrequencyChange('paymentReminders', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#fff'
                      }}
                    >
                      <option value="immediate">Immediate</option>
                      <option value="1_day">1 day before</option>
                      <option value="3_days">3 days before</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      System Updates
                    </label>
                    <select
                      value={settings.frequency.systemUpdates}
                      onChange={(e) => handleFrequencyChange('systemUpdates', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#fff'
                      }}
                    >
                      <option value="immediate">Immediate</option>
                      <option value="daily">Daily digest</option>
                      <option value="weekly">Weekly digest</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 