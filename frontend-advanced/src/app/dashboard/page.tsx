'use client';

import NavBar from '../components/NavBar';
import { 
  MetricsWidget, 
  QuickActionsWidget, 
  RecentActivitiesWidget, 
  SpaceStatusWidget,
  WeatherWidget,
  type DashboardMetric,
  type QuickAction,
  type RecentActivity,
  type SpaceStatus
} from '../components/DashboardWidgets';
import PDFGenerator from '../components/PDFGenerator';
import ProductionRoadmapPDF from '../components/ProductionRoadmapPDF';
import VisualProductionDoc from '../components/VisualProductionDoc';
import ScreenshotGuide from '../components/ScreenshotGuide';
import AcquisitionPitchDeck from '../components/AcquisitionPitchDeck';
import { useState, useEffect } from 'react';
import Link from 'next/link';



export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced metrics with real-time data
  const metrics: DashboardMetric[] = [
    {
      label: 'Today\'s Revenue',
      value: '$12,450',
      change: '+18.5%',
      changeType: 'positive',
      icon: '💰',
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      link: '/operations/reports'
    },
    {
      label: 'Active Bookings',
      value: 23,
      change: '+3',
      changeType: 'positive',
      icon: '📅',
      color: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      link: '/bookings'
    },
    {
      label: 'Venue Utilization',
      value: '87%',
      change: '+5.2%',
      changeType: 'positive',
      icon: '🏢',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      link: '/operations/spaces'
    },
    {
      label: 'Pending Payments',
      value: '$8,920',
      change: '-12.3%',
      changeType: 'negative',
      icon: '⏳',
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      link: '/clients'
    },
    {
      label: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      changeType: 'positive',
      icon: '⭐',
      color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      link: '/clients'
    },
    {
      label: 'Maintenance Alerts',
      value: 2,
      change: '-1',
      changeType: 'positive',
      icon: '🔧',
      color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      link: '/operations/maintenance'
    }
  ];

  // Quick actions for common tasks
  const quickActions: QuickAction[] = [
    {
      label: 'New Booking',
      icon: '➕',
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      link: '/bookings',
      description: 'Create a new event booking'
    },
    {
      label: 'Check Availability',
      icon: '📋',
      color: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      link: '/bookings',
      description: 'View venue availability'
    },
    {
      label: 'Send Invoice',
      icon: '📄',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      link: '/clients',
      description: 'Generate and send invoice'
    },
    {
      label: 'Schedule Maintenance',
      icon: '🔧',
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      link: '/operations/maintenance',
      description: 'Book maintenance service'
    },
    {
      label: 'Add Client',
      icon: '👥',
      color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      link: '/clients/new',
      description: 'Register new client'
    },

  ];

  // Recent activities
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Confirmed',
      description: 'Tech Conference 2025 - Main Hall',
      time: '2 minutes ago',
      status: 'success',
      action: 'View Details'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      description: '$2,500 from Acme Corporation',
      time: '15 minutes ago',
      status: 'success',
      action: 'View Invoice'
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Maintenance Scheduled',
      description: 'HVAC system - Garden Room',
      time: '1 hour ago',
      status: 'info',
      action: 'View Schedule'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Low Inventory Alert',
      description: 'Audio equipment running low',
      time: '2 hours ago',
      status: 'warning',
      action: 'Restock'
    },
    {
      id: '5',
      type: 'booking',
      title: 'Booking Cancelled',
      description: 'Birthday Party - Conference Room A',
      time: '3 hours ago',
      status: 'error',
      action: 'View Details'
    }
  ];

  // Space status data
  const spaceStatus: SpaceStatus[] = [
    {
      id: '1',
      name: 'Main Hall',
      status: 'occupied',
      currentEvent: 'Tech Conference 2025',
      nextEvent: 'Corporate Gala (6:00 PM)',
      occupancy: 95,
      revenue: 8500
    },
    {
      id: '2',
      name: 'Garden Room',
      status: 'cleaning',
      nextEvent: 'Wedding Reception (4:00 PM)',
      occupancy: 0,
      revenue: 3200
    },
    {
      id: '3',
      name: 'Rooftop Terrace',
      status: 'available',
      nextEvent: 'Product Launch (7:00 PM)',
      occupancy: 0,
      revenue: 2500
    },
    {
      id: '4',
      name: 'Conference Room A',
      status: 'maintenance',
      nextEvent: 'Board Meeting (9:00 AM)',
      occupancy: 0,
      revenue: 800
    }
  ];



  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <NavBar />
      
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', padding: '0 32px' }}>
        {/* Weather Widget on the side */}
        <div style={{ marginRight: 32 }}>
          <WeatherWidget />
        </div>
        
        {/* Main Dashboard Content */}
        <div style={{ flex: 1, padding: '32px 0' }}>
          {/* Header with Welcome and Time */}
          <div style={{
            background: '#fff',
            borderRadius: 20,
            padding: '32px 40px',
            marginBottom: 32,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 style={{ 
                  fontSize: 36, 
                  fontWeight: 800, 
                  marginBottom: 8, 
                  background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Welcome back, Admin! 👋
                </h1>
                <p style={{ fontSize: 18, color: '#64748b', marginBottom: 0 }}>
                  Here's what's happening with your venues today
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1e293b' }}>
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div style={{ fontSize: 16, color: '#64748b' }}>
                  {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <MetricsWidget metrics={metrics} />

            {/* Quick Actions */}
            <QuickActionsWidget actions={quickActions} />
          </div>

          {/* Two Column Layout for Activities and Space Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <RecentActivitiesWidget activities={recentActivities} />
            <SpaceStatusWidget spaces={spaceStatus} />
          </div>

          {/* PDF Documentation Generator */}
          <PDFGenerator onGenerate={() => {
            console.log('PDF generated successfully!');
          }} />

          {/* Production Roadmap PDF Generator */}
          <ProductionRoadmapPDF onGenerate={() => {
            console.log('Production roadmap PDF generated successfully!');
          }} />

          {/* Visual Production Documentation */}
          <VisualProductionDoc onGenerate={() => {
            console.log('Visual production documentation generated successfully!');
          }} />

          {/* Screenshot Guide */}
          <ScreenshotGuide onGenerate={() => {
            console.log('Screenshot guide generated successfully!');
          }} />

          {/* Acquisition Pitch Deck */}
          <AcquisitionPitchDeck onGenerate={() => {
            console.log('Acquisition pitch deck generated successfully!');
          }} />
        </div>
      </div>
    </div>
  );
}