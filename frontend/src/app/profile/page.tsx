'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Link from 'next/link';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  company: string;
  position: string;
  bio: string;
  location: string;
  timezone: string;
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private' | 'team';
      showEmail: boolean;
      showPhone: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
  stats: {
    totalBookings: number;
    totalVenues: number;
    totalClients: number;
    memberSince: string;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await profileApi.getProfile();

      // Sample profile data
      const sampleProfile: UserProfile = {
        id: 'user-001',
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex.johnson@venueapp.com',
        phone: '+1 (555) 123-4567',
        role: 'Venue Manager',
        avatar: 'AJ',
        company: 'Premier Venues Inc.',
        position: 'Senior Venue Manager',
        bio: 'Experienced venue manager with 8+ years in the events industry. Passionate about creating exceptional experiences and optimizing venue operations.',
        location: 'New York, NY',
        timezone: 'America/New_York',
        preferences: {
          notifications: {
            email: true,
            sms: false,
            push: true
          },
          privacy: {
            profileVisibility: 'team',
            showEmail: true,
            showPhone: false
          },
          theme: 'light',
          language: 'en'
        },
        stats: {
          totalBookings: 247,
          totalVenues: 12,
          totalClients: 89,
          memberSince: '2022-03-15'
        }
      };

      setProfile(sampleProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      // TODO: Replace with actual API call
      // await profileApi.updateProfile(profile);
      
      console.log('Profile updated:', profile);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handlePreferenceChange = (category: keyof UserProfile['preferences'], field: string, value: any) => {
    if (!profile) return;
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [category]: {
          ...(profile.preferences[category] as any),
          [field]: value
        }
      }
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Profile not found</div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>
                  Profile Settings
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Manage your account information and preferences
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {editMode ? (
                  <>
                    <button
                      onClick={() => setEditMode(false)}
                      style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
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
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
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
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
            {/* Left Column - Profile Overview & Navigation */}
            <div>
              {/* Profile Card */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '32px',
                    margin: '0 auto 16px auto',
                    boxShadow: '0 4px 16px rgba(252, 92, 125, 0.3)'
                  }}>
                    {profile.avatar}
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#232323', marginBottom: '4px' }}>
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
                    {profile.position}
                  </p>
                  <p style={{ fontSize: '14px', color: '#888' }}>
                    {profile.company}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
                      {profile.stats.totalBookings}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Bookings</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                      {profile.stats.totalVenues}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Venues</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
                      {profile.stats.totalClients}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Clients</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6' }}>
                      {Math.floor((Date.now() - new Date(profile.stats.memberSince).getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Days</div>
                  </div>
                </div>

                <div style={{ 
                  padding: '16px', 
                  background: '#f8fafc', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                    Member since {new Date(profile.stats.memberSince).toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {profile.location} • {profile.timezone}
                  </div>
                </div>
              </div>

              {/* Navigation */}
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
                      background: '#3b82f6',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
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
                  <Link href="/settings" style={{ textDecoration: 'none' }}>
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
                      ⚙️ Business Settings & Admin
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Personal Information */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '32px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                Personal Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    First Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      {profile.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Last Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      {profile.lastName}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Email Address
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      {profile.email}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Phone Number
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      {profile.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Company
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      {profile.company}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Position
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      {profile.position}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Location
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      {profile.location}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Timezone
                  </label>
                  {editMode ? (
                    <select
                      value={profile.timezone}
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
                  ) : (
                    <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      {profile.timezone.replace('America/', '').replace('Europe/', '')}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Bio
                </label>
                {editMode ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
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
                ) : (
                  <div style={{ fontSize: '16px', color: '#232323', padding: '12px', background: '#f9fafb', borderRadius: '8px', lineHeight: '1.6' }}>
                    {profile.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 