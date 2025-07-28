'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Link from 'next/link';

interface BusinessSettings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  website: string;
  logo: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  taxRate: number;
  defaultPaymentTerms: number;
  minimumNoticeHours: number;
  cancellationPolicy: string;
  bookingPolicy: string;
  autoConfirmBookings: boolean;
  requireDeposit: boolean;
  depositPercentage: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

interface SystemHealth {
  databaseStatus: 'healthy' | 'warning' | 'error';
  apiResponseTime: number;
  activeUsers: number;
  totalBookings: number;
  systemUptime: string;
  lastBackup: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business');
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      
      // Sample business settings
      const sampleBusinessSettings: BusinessSettings = {
        companyName: 'Premier Venues Inc.',
        companyEmail: 'info@premiervenues.com',
        companyPhone: '+1 (555) 123-4567',
        companyAddress: '123 Business Ave, New York, NY 10001',
        website: 'www.premiervenues.com',
        logo: 'PV',
        timezone: 'America/New_York',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
        taxRate: 8.875,
        defaultPaymentTerms: 30,
        minimumNoticeHours: 24,
        cancellationPolicy: 'Free cancellation up to 48 hours before event. 50% refund for cancellations 24-48 hours before. No refund for cancellations within 24 hours.',
        bookingPolicy: '50% deposit required to confirm booking. Full payment due 7 days before event.',
        autoConfirmBookings: false,
        requireDeposit: true,
        depositPercentage: 50
      };

      // Sample users
      const sampleUsers: User[] = [
        {
          id: 'user-001',
          name: 'Alex Johnson',
          email: 'alex@premiervenues.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2025-01-15 14:30',
          createdAt: '2024-01-15'
        },
        {
          id: 'user-002',
          name: 'Sarah Wilson',
          email: 'sarah@premiervenues.com',
          role: 'manager',
          status: 'active',
          lastLogin: '2025-01-15 12:15',
          createdAt: '2024-02-01'
        },
        {
          id: 'user-003',
          name: 'Mike Davis',
          email: 'mike@premiervenues.com',
          role: 'staff',
          status: 'active',
          lastLogin: '2025-01-14 16:45',
          createdAt: '2024-03-10'
        },
        {
          id: 'user-004',
          name: 'Lisa Brown',
          email: 'lisa@premiervenues.com',
          role: 'viewer',
          status: 'inactive',
          lastLogin: '2025-01-10 09:20',
          createdAt: '2024-04-05'
        }
      ];

      // Sample system health
      const sampleSystemHealth: SystemHealth = {
        databaseStatus: 'healthy',
        apiResponseTime: 245,
        activeUsers: 12,
        totalBookings: 247,
        systemUptime: '99.9%',
        lastBackup: '2025-01-15 02:00'
      };

      setBusinessSettings(sampleBusinessSettings);
      setUsers(sampleUsers);
      setSystemHealth(sampleSystemHealth);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessSettingsSave = async () => {
    if (!businessSettings) return;

    try {
      setSaving(true);
      // TODO: Replace with actual API call
      // await settingsApi.updateBusinessSettings(businessSettings);
      
      console.log('Business settings updated:', businessSettings);
      alert('Business settings saved successfully!');
    } catch (error) {
      console.error('Error saving business settings:', error);
      alert('Failed to save business settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof BusinessSettings, value: any) => {
    if (!businessSettings) return;
    setBusinessSettings({ ...businessSettings, [field]: value });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return { color: '#10b981', background: '#d1fae5' };
      case 'warning': return { color: '#f59e0b', background: '#fef3c7' };
      case 'error': return { color: '#ef4444', background: '#fee2e2' };
      case 'active': return { color: '#10b981', background: '#d1fae5' };
      case 'inactive': return { color: '#6b7280', background: '#f3f4f6' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return { color: '#ef4444', background: '#fee2e2' };
      case 'manager': return { color: '#f59e0b', background: '#fef3c7' };
      case 'staff': return { color: '#3b82f6', background: '#dbeafe' };
      case 'viewer': return { color: '#6b7280', background: '#f3f4f6' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>
                  Settings & Administration
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Manage business settings, users, and system configuration
                </p>
              </div>
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
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'business', label: '🏢 Business Settings', icon: '🏢' },
                { id: 'booking', label: '📅 Booking Rules', icon: '📅' },
                { id: 'payment', label: '💳 Payment & Billing', icon: '💳' },
                { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
                { id: 'integrations', label: '🔗 Integrations', icon: '🔗' },
                { id: 'users', label: '👥 User Management', icon: '👥' },
                { id: 'system', label: '⚙️ System Admin', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    background: activeTab === tab.id ? '#3b82f6' : '#f3f4f6',
                    color: activeTab === tab.id ? '#fff' : '#374151',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '32px',
            border: '1px solid #e5e7eb'
          }}>
            {/* Business Settings Tab */}
            {activeTab === 'business' && businessSettings && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Business Information
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={businessSettings.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Company Email
                    </label>
                    <input
                      type="email"
                      value={businessSettings.companyEmail}
                      onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Company Phone
                    </label>
                    <input
                      type="tel"
                      value={businessSettings.companyPhone}
                      onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Website
                    </label>
                    <input
                      type="url"
                      value={businessSettings.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Company Address
                    </label>
                    <textarea
                      value={businessSettings.companyAddress}
                      onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '20px' }}>
                  System Preferences
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Timezone
                    </label>
                    <select
                      value={businessSettings.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
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
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Currency
                    </label>
                    <select
                      value={businessSettings.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
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
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Date Format
                    </label>
                    <select
                      value={businessSettings.dateFormat}
                      onChange={(e) => handleInputChange('dateFormat', e.target.value)}
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
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleBusinessSettingsSave}
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
                    {saving ? 'Saving...' : 'Save Business Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* Booking Rules Tab */}
            {activeTab === 'booking' && businessSettings && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Booking Rules & Policies
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Minimum Notice (hours)
                    </label>
                    <input
                      type="number"
                      value={businessSettings.minimumNoticeHours}
                      onChange={(e) => handleInputChange('minimumNoticeHours', parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Default Payment Terms (days)
                    </label>
                    <input
                      type="number"
                      value={businessSettings.defaultPaymentTerms}
                      onChange={(e) => handleInputChange('defaultPaymentTerms', parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Booking Policy
                    </label>
                    <textarea
                      value={businessSettings.bookingPolicy}
                      onChange={(e) => handleInputChange('bookingPolicy', e.target.value)}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Cancellation Policy
                    </label>
                    <textarea
                      value={businessSettings.cancellationPolicy}
                      onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleBusinessSettingsSave}
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
                    {saving ? 'Saving...' : 'Save Booking Rules'}
                  </button>
                </div>
              </div>
            )}

            {/* Payment & Billing Tab */}
            {activeTab === 'payment' && businessSettings && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Payment & Billing Settings
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={businessSettings.taxRate}
                      onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Deposit Percentage (%)
                    </label>
                    <input
                      type="number"
                      value={businessSettings.depositPercentage}
                      onChange={(e) => handleInputChange('depositPercentage', parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                      <input
                        type="checkbox"
                        id="requireDeposit"
                        checked={businessSettings.requireDeposit}
                        onChange={(e) => handleInputChange('requireDeposit', e.target.checked)}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <label htmlFor="requireDeposit" style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Require deposit for bookings
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        id="autoConfirmBookings"
                        checked={businessSettings.autoConfirmBookings}
                        onChange={(e) => handleInputChange('autoConfirmBookings', e.target.checked)}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <label htmlFor="autoConfirmBookings" style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Auto-confirm bookings (no manual approval required)
                      </label>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleBusinessSettingsSave}
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
                    {saving ? 'Saving...' : 'Save Payment Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323' }}>
                    User Management
                  </h2>
                  <button
                    onClick={() => setShowAddUserModal(true)}
                    style={{
                      background: '#3b82f6',
                      color: '#fff',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    + Add User
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Name</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Email</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Role</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Last Login</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                            {user.name}
                          </td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#232323' }}>
                            {user.email}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500',
                              ...getRoleColor(user.role)
                            }}>
                              {user.role}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500',
                              ...getStatusColor(user.status)
                            }}>
                              {user.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#232323' }}>
                            {user.lastLogin}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button style={{
                                background: '#f3f4f6',
                                color: '#374151',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}>
                                Edit
                              </button>
                              <button style={{
                                background: '#fee2e2',
                                color: '#ef4444',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* System Admin Tab */}
            {activeTab === 'system' && systemHealth && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  System Health & Administration
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                  <div style={{
                    background: '#f9fafb',
                    borderRadius: '8px',
                    padding: '20px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px', color: '#666' }}>Database Status</span>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        ...getStatusColor(systemHealth.databaseStatus)
                      }}>
                        {systemHealth.databaseStatus}
                      </span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#232323' }}>
                      {systemHealth.databaseStatus === 'healthy' ? '✅' : '⚠️'}
                    </div>
                  </div>

                  <div style={{
                    background: '#f9fafb',
                    borderRadius: '8px',
                    padding: '20px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>API Response Time</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#232323' }}>
                      {systemHealth.apiResponseTime}ms
                    </div>
                  </div>

                  <div style={{
                    background: '#f9fafb',
                    borderRadius: '8px',
                    padding: '20px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Active Users</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#232323' }}>
                      {systemHealth.activeUsers}
                    </div>
                  </div>

                  <div style={{
                    background: '#f9fafb',
                    borderRadius: '8px',
                    padding: '20px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>System Uptime</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#232323' }}>
                      {systemHealth.systemUptime}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div style={{
                    background: '#f9fafb',
                    borderRadius: '8px',
                    padding: '20px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                      System Actions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button style={{
                        background: '#3b82f6',
                        color: '#fff',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}>
                        🔄 Refresh System Cache
                      </button>
                      <button style={{
                        background: '#f59e0b',
                        color: '#fff',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}>
                        💾 Create Backup
                      </button>
                      <button style={{
                        background: '#10b981',
                        color: '#fff',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}>
                        📊 Generate System Report
                      </button>
                    </div>
                  </div>

                  <div style={{
                    background: '#f9fafb',
                    borderRadius: '8px',
                    padding: '20px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                      System Information
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>Total Bookings:</span>
                        <span style={{ fontWeight: '600', color: '#232323' }}>{systemHealth.totalBookings}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>Last Backup:</span>
                        <span style={{ fontWeight: '600', color: '#232323' }}>{systemHealth.lastBackup}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>Version:</span>
                        <span style={{ fontWeight: '600', color: '#232323' }}>v2.1.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder tabs */}
            {['notifications', 'integrations'].includes(activeTab) && (
              <div style={{ textAlign: 'center', padding: '64px 24px' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚧</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                  Coming Soon
                </h3>
                <p style={{ fontSize: '16px', color: '#6b7280' }}>
                  This section is under development and will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 