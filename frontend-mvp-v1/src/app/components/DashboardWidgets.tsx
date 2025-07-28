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
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: 20,
      marginBottom: 32
    }}>
      {metrics.map((metric, index) => (
        <Link 
          key={index} 
          href={metric.link || '#'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '24px 20px',
            border: '2px solid #e2e8f0',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: metric.color,
              borderRadius: '16px 16px 0 0'
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 32 }}>{metric.icon}</div>
              {metric.change && (
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: metric.changeType === 'positive' ? '#10b981' : 
                         metric.changeType === 'negative' ? '#ef4444' : '#6b7280',
                  background: metric.changeType === 'positive' ? '#ecfdf5' : 
                             metric.changeType === 'negative' ? '#fef2f2' : '#f3f4f6',
                  padding: '4px 8px',
                  borderRadius: 8,
                  border: `1px solid ${metric.changeType === 'positive' ? '#a7f3d0' : 
                                           metric.changeType === 'negative' ? '#fca5a5' : '#d1d5db'}`
                }}>
                  {metric.change}
                </div>
              )}
            </div>
            
            <div style={{ fontSize: 32, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>
              {metric.value}
            </div>
            <div style={{ fontSize: 16, color: '#64748b', fontWeight: 500 }}>
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
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>
        Quick Actions
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 16
      }}>
        {actions.map((action, index) => (
          <Link 
            key={index} 
            href={action.link}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '20px 16px',
              border: '2px solid #e2e8f0',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{action.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>
                {action.label}
              </div>
              <div style={{ fontSize: 13, color: '#64748b' }}>
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
      borderRadius: 20,
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>
          Recent Activities
        </h2>
        <Link href="/notifications" style={{ 
          fontSize: 14, 
          color: '#3b82f6', 
          textDecoration: 'none',
          fontWeight: 600
        }}>
          View All →
        </Link>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activities.map((activity) => (
          <div key={activity.id} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            padding: '16px',
            borderRadius: 12,
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
            <div style={{ fontSize: 20 }}>{getStatusIcon(activity.type)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: 16, 
                fontWeight: 600, 
                color: '#1e293b',
                marginBottom: 4
              }}>
                {activity.title}
              </div>
              <div style={{ 
                fontSize: 14, 
                color: '#64748b',
                marginBottom: 8
              }}>
                {activity.description}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between'
              }}>
                <div style={{ 
                  fontSize: 12, 
                  color: '#94a3b8',
                  fontWeight: 500
                }}>
                  {activity.time}
                </div>
                {activity.action && (
                  <button style={{
                    fontSize: 12,
                    color: getStatusColor(activity.status),
                    background: `${getStatusColor(activity.status)}10`,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: 6
                  }}>
                    {activity.action}
                  </button>
                )}
              </div>
            </div>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: getStatusColor(activity.status),
              marginTop: 4
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
      borderRadius: 20,
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>
          Space Status
        </h2>
        <Link href="/operations/spaces" style={{ 
          fontSize: 14, 
          color: '#3b82f6', 
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Manage Spaces →
        </Link>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {spaces.map((space) => (
          <div key={space.id} style={{
            padding: '20px',
            borderRadius: 12,
            border: '2px solid #e2e8f0',
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>
                {space.name}
              </div>
              <div style={{
                padding: '6px 12px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                color: '#fff',
                background: getSpaceStatusColor(space.status),
                textTransform: 'capitalize'
              }}>
                {space.status}
              </div>
            </div>
            
            {space.currentEvent && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>
                  Current Event:
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>
                  {space.currentEvent}
                </div>
              </div>
            )}
            
            {space.nextEvent && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>
                  Next Event:
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>
                  {space.nextEvent}
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>
                  Occupancy
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
                  {space.occupancy}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>
                  Revenue
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>
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
      borderRadius: 16,
      padding: '24px',
      color: '#fff',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>{weather.icon}</div>
      <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>
        {weather.temperature}°F
      </div>
      <div style={{ fontSize: 16, opacity: 0.9 }}>
        {weather.condition}
      </div>
      <div style={{ fontSize: 14, opacity: 0.7, marginTop: 8 }}>
        Perfect weather for events!
      </div>
    </div>
  );
}

// Export types for use in other components
export type { DashboardMetric, QuickAction, RecentActivity, SpaceStatus }; 