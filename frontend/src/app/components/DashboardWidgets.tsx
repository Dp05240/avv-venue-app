'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Types for dashboard widgets
interface DashboardMetric {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
  link?: string;
}

interface QuickAction {
  label: string;
  icon: string;
  color: string;
  link: string;
  description: string;
}

interface RecentActivity {
  id: string;
  type: 'booking' | 'payment' | 'maintenance' | 'alert';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
  action?: string;
}

interface SpaceStatus {
  id: string;
  name: string;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  currentEvent?: string;
  nextEvent?: string;
  occupancy: number;
  revenue: number;
}

// Metrics Widget Component
export function MetricsWidget({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: 16,
      marginBottom: 24
    }}>
      {metrics.map((metric, index) => (
        <Link 
          key={index} 
          href={metric.link || '#'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '20px 18px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: metric.color,
              borderRadius: '12px 12px 0 0'
            }} />
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: 12 
            }}>
              <div style={{ fontSize: 28 }}>{metric.icon}</div>
              {metric.change && (
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: metric.changeType === 'positive' ? '#10b981' : 
                         metric.changeType === 'negative' ? '#ef4444' : '#6b7280',
                  background: metric.changeType === 'positive' ? '#ecfdf5' : 
                             metric.changeType === 'negative' ? '#fef2f2' : '#f3f4f6',
                  padding: '3px 6px',
                  borderRadius: 6,
                  border: `1px solid ${metric.changeType === 'positive' ? '#a7f3d0' : 
                                           metric.changeType === 'negative' ? '#fca5a5' : '#d1d5db'}`
                }}>
                  {metric.change}
                </div>
              )}
            </div>
            
            <div style={{ 
              fontSize: 28, 
              fontWeight: 700, 
              color: '#1e293b', 
              marginBottom: 6,
              lineHeight: 1.2
            }}>
              {metric.value}
            </div>
            <div style={{ 
              fontSize: 14, 
              color: '#64748b', 
              fontWeight: 500,
              lineHeight: 1.3
            }}>
              {metric.label}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Quick Actions Widget Component
export function QuickActionsWidget({ actions }: { actions: QuickAction[] }) {
  return (
    <div>
      <h2 style={{ 
        fontSize: 20, 
        fontWeight: 600, 
        color: '#1e293b', 
        marginBottom: 16 
      }}>
        Quick Actions
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: 12
      }}>
        {actions.map((action, index) => (
          <Link 
            key={index} 
            href={action.link}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              background: '#fff',
              borderRadius: 10,
              padding: '16px 14px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center',
              height: '100%',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{action.icon}</div>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 600, 
                color: '#1e293b', 
                marginBottom: 4,
                lineHeight: 1.2
              }}>
                {action.label}
              </div>
              <div style={{ 
                fontSize: 11, 
                color: '#64748b',
                lineHeight: 1.3
              }}>
                {action.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Recent Activities Widget Component
export function RecentActivitiesWidget({ activities }: { activities: RecentActivity[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'booking': return '📅';
      case 'payment': return '💰';
      case 'maintenance': return '🔧';
      case 'alert': return '⚠️';
      default: return '📌';
    }
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: '24px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 20 
      }}>
        <h2 style={{ 
          fontSize: 20, 
          fontWeight: 600, 
          color: '#1e293b' 
        }}>
          Recent Activities
        </h2>
        <Link href="/notifications" style={{ 
          fontSize: 13, 
          color: '#3b82f6', 
          textDecoration: 'none',
          fontWeight: 600
        }}>
          View All →
        </Link>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {activities.map((activity) => (
          <div key={activity.id} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: '14px',
            borderRadius: 10,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
          >
            <div style={{ fontSize: 18 }}>{getStatusIcon(activity.type)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 600, 
                color: '#1e293b',
                marginBottom: 3
              }}>
                {activity.title}
              </div>
              <div style={{ 
                fontSize: 12, 
                color: '#64748b',
                marginBottom: 6
              }}>
                {activity.description}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between'
              }}>
                <div style={{ 
                  fontSize: 11, 
                  color: '#94a3b8',
                  fontWeight: 500
                }}>
                  {activity.time}
                </div>
                {activity.action && (
                  <button style={{
                    fontSize: 11,
                    color: getStatusColor(activity.status),
                    background: `${getStatusColor(activity.status)}10`,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    padding: '3px 6px',
                    borderRadius: 4
                  }}>
                    {activity.action}
                  </button>
                )}
              </div>
            </div>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: getStatusColor(activity.status),
              marginTop: 3
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Space Status Widget Component
export function SpaceStatusWidget({ spaces }: { spaces: SpaceStatus[] }) {
  const getSpaceStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'occupied': return '#ef4444';
      case 'cleaning': return '#f59e0b';
      case 'maintenance': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: '24px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 20 
      }}>
        <h2 style={{ 
          fontSize: 20, 
          fontWeight: 600, 
          color: '#1e293b' 
        }}>
          Space Status
        </h2>
        <Link href="/operations/spaces" style={{ 
          fontSize: 13, 
          color: '#3b82f6', 
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Manage Spaces →
        </Link>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {spaces.map((space) => (
          <div key={space.id} style={{
            padding: '16px',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: 10 
            }}>
              <div style={{ 
                fontSize: 16, 
                fontWeight: 600, 
                color: '#1e293b' 
              }}>
                {space.name}
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: 16,
                fontSize: 11,
                fontWeight: 600,
                color: '#fff',
                background: getSpaceStatusColor(space.status),
                textTransform: 'capitalize'
              }}>
                {space.status}
              </div>
            </div>
            
            {space.currentEvent && (
              <div style={{ marginBottom: 6 }}>
                <div style={{ 
                  fontSize: 12, 
                  color: '#64748b', 
                  marginBottom: 2 
                }}>
                  Current Event:
                </div>
                <div style={{ 
                  fontSize: 13, 
                  fontWeight: 600, 
                  color: '#1e293b' 
                }}>
                  {space.currentEvent}
                </div>
              </div>
            )}
            
            {space.nextEvent && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ 
                  fontSize: 12, 
                  color: '#64748b', 
                  marginBottom: 2 
                }}>
                  Next Event:
                </div>
                <div style={{ 
                  fontSize: 13, 
                  fontWeight: 600, 
                  color: '#1e293b' 
                }}>
                  {space.nextEvent}
                </div>
              </div>
            )}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div>
                <div style={{ 
                  fontSize: 11, 
                  color: '#64748b', 
                  marginBottom: 1 
                }}>
                  Occupancy
                </div>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 700, 
                  color: '#1e293b' 
                }}>
                  {space.occupancy}%
                </div>
              </div>
              <div>
                <div style={{ 
                  fontSize: 11, 
                  color: '#64748b', 
                  marginBottom: 1 
                }}>
                  Revenue
                </div>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 700, 
                  color: '#10b981' 
                }}>
                  ${space.revenue.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Weather Widget Component (Bonus feature)
export function WeatherWidget() {
  const [weather, setWeather] = useState({
    temperature: 72,
    condition: 'Partly Cloudy',
    icon: '⛅'
  });

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: 14,
      padding: '20px',
      color: '#fff',
      textAlign: 'center',
      height: 'fit-content',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ fontSize: 42, marginBottom: 6 }}>{weather.icon}</div>
      <div style={{ 
        fontSize: 28, 
        fontWeight: 700, 
        marginBottom: 3,
        lineHeight: 1.2
      }}>
        {weather.temperature}°F
      </div>
      <div style={{ 
        fontSize: 14, 
        opacity: 0.9,
        marginBottom: 8,
        lineHeight: 1.3
      }}>
        {weather.condition}
      </div>
      <div style={{ 
        fontSize: 12, 
        opacity: 0.7,
        lineHeight: 1.3
      }}>
        Perfect weather for events!
      </div>
    </div>
  );
}

// Export types for use in other components
export type { DashboardMetric, QuickAction, RecentActivity, SpaceStatus }; 