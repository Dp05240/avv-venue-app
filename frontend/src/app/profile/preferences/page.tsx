'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Link from 'next/link';

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: string;
  privacy: {
    profileVisibility: 'public' | 'private' | 'team';
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
    allowContact: boolean;
  };
  display: {
    compactMode: boolean;
    showAvatars: boolean;
    showNotifications: boolean;
    autoRefresh: boolean;
    refreshInterval: number;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reduceMotion: boolean;
    screenReader: boolean;
  };
}

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    privacy: {
      profileVisibility: 'team',
      showEmail: true,
      showPhone: false,
      showLocation: true,
      allowContact: true
    },
    display: {
      compactMode: false,
      showAvatars: true,
      showNotifications: true,
      autoRefresh: true,
      refreshInterval: 30
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reduceMotion: false,
      screenReader: false
    }
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await profileApi.getPreferences();
      console.log('Loading preferences...');
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      // TODO: Replace with actual API call
      // await profileApi.updatePreferences(preferences);
      
      console.log('Preferences updated:', preferences);
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePreferenceChange = (category: keyof UserPreferences, field: string, value: any) => {
    setPreferences({
      ...preferences,
      [category]: {
        ...(preferences[category] as any),
        [field]: value
      }
    });
  };

  const handlePrivacyChange = (field: string, value: any) => {
    setPreferences({
      ...preferences,
      privacy: {
        ...preferences.privacy,
        [field]: value
      }
    });
  };

  const handleDisplayChange = (field: string, value: any) => {
    setPreferences({
      ...preferences,
      display: {
        ...preferences.display,
        [field]: value
      }
    });
  };

  const handleAccessibilityChange = (field: string, value: any) => {
    setPreferences({
      ...preferences,
      accessibility: {
        ...preferences.accessibility,
        [field]: value
      }
    });
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
                  Preferences
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Customize your experience and privacy settings
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
                  onClick={handleSavePreferences}
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
                  {saving ? 'Saving...' : 'Save Preferences'}
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
                      background: '#3b82f6',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
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

            {/* Right Column - Preferences Settings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Appearance & Display */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Appearance & Display
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Theme
                    </label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as any })}
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
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Language
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
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
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">Italiano</option>
                      <option value="pt">Português</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Date Format
                    </label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
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
                      <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Time Format
                    </label>
                    <select
                      value={preferences.timeFormat}
                      onChange={(e) => setPreferences({ ...preferences, timeFormat: e.target.value as any })}
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
                      <option value="12h">12-hour (AM/PM)</option>
                      <option value="24h">24-hour</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Currency
                    </label>
                    <select
                      value={preferences.currency}
                      onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
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
                      <option value="AUD">AUD (A$)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Timezone
                    </label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
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
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Compact Mode
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Reduce spacing and show more content
                      </div>
                    </div>
                    <button
                      onClick={() => handleDisplayChange('compactMode', !preferences.display.compactMode)}
                      style={{
                        background: preferences.display.compactMode ? '#10b981' : '#e5e7eb',
                        color: preferences.display.compactMode ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.display.compactMode ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Show Avatars
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Display user profile pictures
                      </div>
                    </div>
                    <button
                      onClick={() => handleDisplayChange('showAvatars', !preferences.display.showAvatars)}
                      style={{
                        background: preferences.display.showAvatars ? '#10b981' : '#e5e7eb',
                        color: preferences.display.showAvatars ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.display.showAvatars ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Auto Refresh
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Automatically refresh data every {preferences.display.refreshInterval} seconds
                      </div>
                    </div>
                    <button
                      onClick={() => handleDisplayChange('autoRefresh', !preferences.display.autoRefresh)}
                      style={{
                        background: preferences.display.autoRefresh ? '#10b981' : '#e5e7eb',
                        color: preferences.display.autoRefresh ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.display.autoRefresh ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Privacy Settings
                </h2>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Profile Visibility
                  </label>
                  <select
                    value={preferences.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
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
                    <option value="public">Public - Anyone can see my profile</option>
                    <option value="team">Team - Only team members can see</option>
                    <option value="private">Private - Only I can see</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Show Email Address
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Display email in profile
                      </div>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange('showEmail', !preferences.privacy.showEmail)}
                      style={{
                        background: preferences.privacy.showEmail ? '#10b981' : '#e5e7eb',
                        color: preferences.privacy.showEmail ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.privacy.showEmail ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Show Phone Number
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Display phone in profile
                      </div>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange('showPhone', !preferences.privacy.showPhone)}
                      style={{
                        background: preferences.privacy.showPhone ? '#10b981' : '#e5e7eb',
                        color: preferences.privacy.showPhone ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.privacy.showPhone ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Show Location
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Display location in profile
                      </div>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange('showLocation', !preferences.privacy.showLocation)}
                      style={{
                        background: preferences.privacy.showLocation ? '#10b981' : '#e5e7eb',
                        color: preferences.privacy.showLocation ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.privacy.showLocation ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Allow Contact
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Allow others to contact me
                      </div>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange('allowContact', !preferences.privacy.allowContact)}
                      style={{
                        background: preferences.privacy.allowContact ? '#10b981' : '#e5e7eb',
                        color: preferences.privacy.allowContact ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.privacy.allowContact ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Accessibility */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Accessibility
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        High Contrast
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Increase contrast for better visibility
                      </div>
                    </div>
                    <button
                      onClick={() => handleAccessibilityChange('highContrast', !preferences.accessibility.highContrast)}
                      style={{
                        background: preferences.accessibility.highContrast ? '#10b981' : '#e5e7eb',
                        color: preferences.accessibility.highContrast ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.accessibility.highContrast ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Large Text
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Increase text size for better readability
                      </div>
                    </div>
                    <button
                      onClick={() => handleAccessibilityChange('largeText', !preferences.accessibility.largeText)}
                      style={{
                        background: preferences.accessibility.largeText ? '#10b981' : '#e5e7eb',
                        color: preferences.accessibility.largeText ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.accessibility.largeText ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Reduce Motion
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Minimize animations and transitions
                      </div>
                    </div>
                    <button
                      onClick={() => handleAccessibilityChange('reduceMotion', !preferences.accessibility.reduceMotion)}
                      style={{
                        background: preferences.accessibility.reduceMotion ? '#10b981' : '#e5e7eb',
                        color: preferences.accessibility.reduceMotion ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.accessibility.reduceMotion ? 'On' : 'Off'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#232323' }}>
                        Screen Reader Support
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Optimize for screen readers
                      </div>
                    </div>
                    <button
                      onClick={() => handleAccessibilityChange('screenReader', !preferences.accessibility.screenReader)}
                      style={{
                        background: preferences.accessibility.screenReader ? '#10b981' : '#e5e7eb',
                        color: preferences.accessibility.screenReader ? '#fff' : '#374151',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {preferences.accessibility.screenReader ? 'On' : 'Off'}
                    </button>
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