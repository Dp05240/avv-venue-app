'use client';

import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Link from 'next/link';

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginHistory] = useState([
    {
      id: 1,
      date: '2025-01-15',
      time: '14:30',
      location: 'New York, NY',
      device: 'Chrome on MacBook Pro',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      date: '2025-01-14',
      time: '09:15',
      location: 'New York, NY',
      device: 'Safari on iPhone',
      ip: '192.168.1.101',
      status: 'success'
    },
    {
      id: 3,
      date: '2025-01-12',
      time: '16:45',
      location: 'Unknown',
      device: 'Chrome on Windows',
      ip: '203.45.67.89',
      status: 'failed'
    }
  ]);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    try {
      setSaving(true);
      // TODO: Replace with actual API call
      // await profileApi.changePassword(currentPassword, newPassword);
      
      console.log('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      // TODO: Replace with actual API call
      // await profileApi.toggleTwoFactor(!twoFactorEnabled);
      
      setTwoFactorEnabled(!twoFactorEnabled);
      alert(twoFactorEnabled ? 'Two-factor authentication disabled.' : 'Two-factor authentication enabled.');
    } catch (error) {
      console.error('Error toggling two-factor authentication:', error);
      alert('Failed to update two-factor authentication settings.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return { color: '#10b981', background: '#d1fae5' };
      case 'failed': return { color: '#ef4444', background: '#fee2e2' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
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
                  Security & Password
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Manage your account security settings and password
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
                      background: '#3b82f6',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      🔒 Security & Password
                    </div>
                  </Link>
                  <Link href="/profile/notifications" style={{ textDecoration: 'none' }}>
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

            {/* Right Column - Security Settings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Password Change */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Change Password
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Current Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          paddingRight: '40px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6b7280'
                        }}
                      >
                        {showCurrentPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          paddingRight: '40px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6b7280'
                        }}
                      >
                        {showNewPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      Password must be at least 8 characters long
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Confirm New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          paddingRight: '40px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6b7280'
                        }}
                      >
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    disabled={saving || !currentPassword || !newPassword || !confirmPassword}
                    style={{
                      background: saving || !currentPassword || !newPassword || !confirmPassword ? '#9ca3af' : '#3b82f6',
                      color: '#fff',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: saving || !currentPassword || !newPassword || !confirmPassword ? 'not-allowed' : 'pointer',
                      alignSelf: 'flex-start'
                    }}
                  >
                    {saving ? 'Changing Password...' : 'Change Password'}
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Two-Factor Authentication
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                      SMS Authentication
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      Receive a code via SMS when signing in
                    </p>
                  </div>
                  <button
                    onClick={handleTwoFactorToggle}
                    style={{
                      background: twoFactorEnabled ? '#10b981' : '#e5e7eb',
                      color: twoFactorEnabled ? '#fff' : '#374151',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div style={{ 
                  padding: '16px', 
                  background: '#f8fafc', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                    <strong>How it works:</strong> When you sign in, you'll receive a 6-digit code via SMS to your registered phone number. 
                    Enter this code to complete the sign-in process.
                  </div>
                </div>
              </div>

              {/* Login History */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Recent Login Activity
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {loginHistory.map((login) => (
                    <div key={login.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: login.status === 'success' ? '#d1fae5' : '#fee2e2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px'
                        }}>
                          {login.status === 'success' ? '✅' : '❌'}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323' }}>
                            {login.device}
                          </div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {login.date} at {login.time} • {login.location}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          ...getStatusColor(login.status)
                        }}>
                          {login.status}
                        </span>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                          IP: {login.ip}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: '#3b82f6',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}>
                    View All Login History
                  </button>
                </div>
              </div>

              {/* Security Tips */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Security Tips
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ fontSize: '16px', marginTop: '2px' }}>🔐</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                        Use a strong password
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Create a password with at least 8 characters, including uppercase, lowercase, numbers, and symbols.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ fontSize: '16px', marginTop: '2px' }}>📱</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                        Enable two-factor authentication
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Add an extra layer of security by requiring a code from your phone when signing in.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ fontSize: '16px', marginTop: '2px' }}>👀</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                        Monitor your login activity
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Regularly check your login history for any suspicious activity.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ fontSize: '16px', marginTop: '2px' }}>🚫</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                        Never share your credentials
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Keep your username and password private and never share them with anyone.
                      </div>
                    </div>
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