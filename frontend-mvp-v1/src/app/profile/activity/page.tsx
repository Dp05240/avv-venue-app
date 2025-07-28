'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Link from 'next/link';

interface ActivityLog {
  id: string;
  type: 'booking' | 'venue' | 'client' | 'system' | 'login';
  action: string;
  description: string;
  timestamp: string;
  ip: string;
  device: string;
  location: string;
}

interface PerformanceMetrics {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  responseTime: number;
  completionRate: number;
  clientSatisfaction: number;
}

interface UsageStats {
  pageViews: { page: string; views: number }[];
  timeSpent: { page: string; minutes: number }[];
  features: { feature: string; usage: number }[];
  devices: { device: string; sessions: number }[];
}

export default function ActivityPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30_days');
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivityData();
  }, [selectedPeriod]);

  const loadActivityData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const [activityResponse, metricsResponse, usageResponse] = await Promise.all([
      //   profileApi.getActivityLogs(selectedPeriod),
      //   profileApi.getPerformanceMetrics(selectedPeriod),
      //   profileApi.getUsageStats(selectedPeriod)
      // ]);

      // Sample activity logs
      const sampleActivityLogs: ActivityLog[] = [
        {
          id: 'act-001',
          type: 'booking',
          action: 'Created',
          description: 'Created new booking for Tech Conference 2025',
          timestamp: '2025-01-15T14:30:00Z',
          ip: '192.168.1.100',
          device: 'Chrome on MacBook Pro',
          location: 'New York, NY'
        },
        {
          id: 'act-002',
          type: 'venue',
          action: 'Updated',
          description: 'Updated venue details for Main Hall',
          timestamp: '2025-01-15T13:45:00Z',
          ip: '192.168.1.100',
          device: 'Chrome on MacBook Pro',
          location: 'New York, NY'
        },
        {
          id: 'act-003',
          type: 'client',
          action: 'Added',
          description: 'Added new client: Tech Corp',
          timestamp: '2025-01-15T12:20:00Z',
          ip: '192.168.1.100',
          device: 'Chrome on MacBook Pro',
          location: 'New York, NY'
        },
        {
          id: 'act-004',
          type: 'system',
          action: 'Login',
          description: 'Successfully logged in',
          timestamp: '2025-01-15T09:00:00Z',
          ip: '192.168.1.100',
          device: 'Chrome on MacBook Pro',
          location: 'New York, NY'
        },
        {
          id: 'act-005',
          type: 'booking',
          action: 'Confirmed',
          description: 'Confirmed booking for Wedding Reception',
          timestamp: '2025-01-14T16:15:00Z',
          ip: '192.168.1.101',
          device: 'Safari on iPhone',
          location: 'New York, NY'
        }
      ];

      const sampleMetrics: PerformanceMetrics = {
        totalBookings: 247,
        totalRevenue: 125000,
        averageRating: 4.8,
        responseTime: 2.3,
        completionRate: 94.5,
        clientSatisfaction: 96.2
      };

      const sampleUsageStats: UsageStats = {
        pageViews: [
          { page: 'Dashboard', views: 156 },
          { page: 'Bookings', views: 89 },
          { page: 'Venues', views: 67 },
          { page: 'Clients', views: 45 },
          { page: 'Operations', views: 34 }
        ],
        timeSpent: [
          { page: 'Dashboard', minutes: 45 },
          { page: 'Bookings', minutes: 120 },
          { page: 'Venues', minutes: 90 },
          { page: 'Clients', minutes: 60 },
          { page: 'Operations', minutes: 75 }
        ],
        features: [
          { feature: 'Booking Management', usage: 85 },
          { feature: 'Venue Management', usage: 72 },
          { feature: 'Client Management', usage: 68 },
          { feature: 'Equipment Assignment', usage: 45 },
          { feature: 'Reports & Analytics', usage: 38 }
        ],
        devices: [
          { device: 'Desktop', sessions: 156 },
          { device: 'Mobile', sessions: 89 },
          { device: 'Tablet', sessions: 23 }
        ]
      };

      setActivityLogs(sampleActivityLogs);
      setMetrics(sampleMetrics);
      setUsageStats(sampleUsageStats);
    } catch (error) {
      console.error('Error loading activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return { color: '#3b82f6', background: '#dbeafe' };
      case 'venue': return { color: '#10b981', background: '#d1fae5' };
      case 'client': return { color: '#f59e0b', background: '#fef3c7' };
      case 'system': return { color: '#8b5cf6', background: '#ede9fe' };
      case 'login': return { color: '#6b7280', background: '#f3f4f6' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading activity data...</div>
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
                  Activity & Analytics
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Track your activity and performance metrics
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                  Period:
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff'
                  }}
                >
                  <option value="7_days">Last 7 days</option>
                  <option value="30_days">Last 30 days</option>
                  <option value="90_days">Last 90 days</option>
                  <option value="1_year">Last year</option>
                </select>
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
                      background: '#3b82f6',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      📊 Activity & Analytics
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Activity Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Performance Metrics */}
              {metrics && (
                <div style={{ 
                  background: '#fff', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                  padding: '32px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                    Performance Metrics
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>
                        {metrics.totalBookings}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Total Bookings</div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>
                        ${metrics.totalRevenue.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Total Revenue</div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>
                        {metrics.averageRating}/5
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Average Rating</div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: '#8b5cf6', marginBottom: '8px' }}>
                        {metrics.completionRate}%
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Completion Rate</div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>
                        {metrics.responseTime}s
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Avg Response Time</div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: '#06b6d4', marginBottom: '8px' }}>
                        {metrics.clientSatisfaction}%
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Usage Statistics */}
              {usageStats && (
                <div style={{ 
                  background: '#fff', 
                  borderRadius: '12px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                  padding: '32px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                    Usage Statistics
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    {/* Page Views */}
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                        Most Visited Pages
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {usageStats.pageViews.map((page, index) => (
                          <div key={page.page} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            background: '#f9fafb',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                background: '#3b82f6',
                                color: '#fff',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                {index + 1}
                              </div>
                              <div style={{ fontSize: '14px', fontWeight: '500', color: '#232323' }}>
                                {page.page}
                              </div>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>
                              {page.views} views
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Time Spent */}
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                        Time Spent by Page
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {usageStats.timeSpent.map((page, index) => (
                          <div key={page.page} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            background: '#f9fafb',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{
                                width: '24px',
                                height: '24px',
                                background: '#10b981',
                                color: '#fff',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                {index + 1}
                              </div>
                              <div style={{ fontSize: '14px', fontWeight: '500', color: '#232323' }}>
                                {page.page}
                              </div>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>
                              {page.minutes} min
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Feature Usage */}
                  <div style={{ marginTop: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                      Feature Usage
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {usageStats.features.map((feature) => (
                        <div key={feature.feature} style={{
                          padding: '12px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#232323' }}>
                              {feature.feature}
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#f59e0b' }}>
                              {feature.usage}%
                            </div>
                          </div>
                          <div style={{ 
                            width: '100%', 
                            height: '8px', 
                            background: '#e5e7eb', 
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${feature.usage}%`,
                              height: '100%',
                              background: '#f59e0b',
                              borderRadius: '4px',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Usage */}
                  <div style={{ marginTop: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                      Device Usage
                    </h3>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      {usageStats.devices.map((device) => (
                        <div key={device.device} style={{
                          flex: 1,
                          textAlign: 'center',
                          padding: '16px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6', marginBottom: '8px' }}>
                            {device.sessions}
                          </div>
                          <div style={{ fontSize: '14px', color: '#666' }}>
                            {device.device}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Recent Activity
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {activityLogs.map((activity) => (
                    <div key={activity.id} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        ...getActivityTypeColor(activity.type)
                      }}>
                        {activity.type === 'booking' && '📋'}
                        {activity.type === 'venue' && '🏢'}
                        {activity.type === 'client' && '👥'}
                        {activity.type === 'system' && '⚙️'}
                        {activity.type === 'login' && '🔐'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323' }}>
                            {activity.action} - {activity.description}
                          </div>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            ...getActivityTypeColor(activity.type)
                          }}>
                            {activity.type}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                          {formatTimestamp(activity.timestamp)}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {activity.device} • {activity.location} • IP: {activity.ip}
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
                    View All Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 