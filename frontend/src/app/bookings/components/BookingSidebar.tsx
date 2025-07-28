'use client';

import React, { useState } from 'react';
import type { Booking } from '../../../services/api';

interface BookingSidebarProps {
  bookings: Booking[];
  onBookingSelect: (booking: Booking) => void;
  onEditBooking: (booking: Booking) => void;
  onCancelBooking: (booking: Booking) => void;
  onDateChange?: (booking: Booking) => void;
  onSpaceChange?: (booking: Booking) => void;
}

// Unified color scheme
const colors = {
  primary: '#6366f1', // Indigo
  primaryGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  secondary: '#f59e0b', // Amber
  success: '#10b981', // Emerald
  warning: '#f59e0b', // Amber
  danger: '#ef4444', // Red
  background: '#f8fafc', // Slate 50
  surface: '#ffffff',
  border: '#e2e8f0', // Slate 200
  text: {
    primary: '#1e293b', // Slate 800
    secondary: '#64748b', // Slate 500
    muted: '#94a3b8', // Slate 400
  }
};

// Enhanced sample data for active bookings
const sampleActiveBookings: Booking[] = [
  {
    id: 'BK001',
    clientId: 1,
    clientName: 'Acme Corporation',
    date: '2024-01-15',
    startTime: '18:00',
    endTime: '22:00',
    space: 'Main Hall',
    status: 'Confirmed',
    attendees: 150,
    eventType: 'Corporate Event',
    notes: 'Annual company dinner with awards ceremony',
    totalAmount: 2500,
    depositPaid: 500,
    createdAt: '2024-01-10T10:30:00Z'
  },
  {
    id: 'BK002',
    clientId: 2,
    clientName: 'Tech Startup Inc',
    date: '2024-01-20',
    startTime: '14:00',
    endTime: '18:00',
    space: 'Conference Room A',
    status: 'Pending',
    attendees: 50,
    eventType: 'Product Launch',
    notes: 'New software product launch event',
    totalAmount: 1200,
    depositPaid: 0,
    createdAt: '2024-01-12T14:15:00Z'
  }
];

// Enhanced sample data for quotations
const sampleQuotations: Booking[] = [
  {
    id: 'QT001',
    clientId: 3,
    clientName: 'Event Professionals LLC',
    date: '2024-02-10',
    startTime: '19:00',
    endTime: '23:00',
    space: 'Garden Room',
    status: 'Pending',
    attendees: 80,
    eventType: 'Wedding Reception',
    notes: 'Elegant wedding reception with outdoor ceremony',
    totalAmount: 3200,
    depositPaid: 0,
    createdAt: '2024-01-13T09:45:00Z'
  },
  {
    id: 'QT002',
    clientId: 4,
    clientName: 'Wedding Planners Co',
    date: '2024-02-15',
    startTime: '16:00',
    endTime: '20:00',
    space: 'Rooftop',
    status: 'Pending',
    attendees: 120,
    eventType: 'Wedding',
    notes: 'Modern rooftop wedding with city views',
    totalAmount: 4500,
    depositPaid: 0,
    createdAt: '2024-01-14T11:20:00Z'
  },
  {
    id: 'QT003',
    clientId: 5,
    clientName: 'Corporate Events Ltd',
    date: '2024-02-20',
    startTime: '09:00',
    endTime: '17:00',
    space: 'Main Hall',
    status: 'Pending',
    attendees: 200,
    eventType: 'Conference',
    notes: 'Annual industry conference with keynote speakers',
    totalAmount: 6000,
    depositPaid: 0,
    createdAt: '2024-01-15T16:30:00Z'
  }
];

// Sample cancelled bookings
const sampleCancelledBookings: Booking[] = [
  {
    id: 'BK003',
    clientId: 6,
    clientName: 'Marketing Solutions',
    date: '2024-01-25',
    startTime: '15:00',
    endTime: '19:00',
    space: 'Conference Room B',
    status: 'Cancelled',
    attendees: 75,
    eventType: 'Marketing Workshop',
    notes: 'Cancelled due to client request',
    totalAmount: 1800,
    depositPaid: 200,
    createdAt: '2024-01-08T13:00:00Z'
  }
];

export default function BookingSidebar({ 
  bookings, 
  onBookingSelect, 
  onEditBooking, 
  onCancelBooking,
  onDateChange,
  onSpaceChange
}: BookingSidebarProps) {
  const [activeSection, setActiveSection] = useState('active');
  const [showManageOptions, setShowManageOptions] = useState<string | null>(null);

  // Use sample data for demonstration
  const activeBookings = sampleActiveBookings;
  const quotations = sampleQuotations;
  const cancelledBookings = sampleCancelledBookings;

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'confirmed': return colors.success;
      case 'pending': return colors.warning;
      case 'cancelled': return colors.danger;
      case 'completed': return colors.primary;
      default: return colors.text.secondary;
    }
  }

  function getStatusBackgroundColor(status: string) {
    switch (status.toLowerCase()) {
      case 'confirmed': return '#ecfdf5';
      case 'pending': return '#fffbeb';
      case 'cancelled': return '#fef2f2';
      case 'completed': return '#f0f9ff';
      default: return colors.background;
    }
  }

  function handleManageClick(bookingId: string) {
    setShowManageOptions(showManageOptions === bookingId ? null : bookingId);
  }

  function handleManageAction(action: string, booking: Booking) {
    setShowManageOptions(null);
    
    switch (action) {
      case 'edit':
        onEditBooking(booking);
        break;
      case 'change-date':
        if (onDateChange) {
          onDateChange(booking);
        } else {
          alert('Change date functionality coming soon!');
        }
        break;
      case 'change-space':
        if (onSpaceChange) {
          onSpaceChange(booking);
        } else {
          alert('Change space functionality coming soon!');
        }
        break;
      case 'cancel':
        onCancelBooking(booking);
        break;
    }
  }

  function renderActiveBookings() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {activeBookings.map(booking => (
          <div
            key={booking.id}
            style={{
              background: colors.surface,
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid colors.border',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => onBookingSelect(booking)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.text.primary, margin: '0 0 4px 0' }}>
                  {booking.eventType}
                </h3>
                <p style={{ fontSize: '14px', color: colors.text.secondary, margin: '0 0 8px 0' }}>
                  {booking.clientName}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: getStatusBackgroundColor(booking.status),
                    color: getStatusColor(booking.status),
                  }}>
                    {booking.status}
                  </span>
                  <span style={{ fontSize: '12px', color: colors.text.muted }}>
                    {booking.attendees} attendees
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: colors.text.muted }}>
                  {new Date(booking.date).toLocaleDateString()} • {booking.startTime} - {booking.endTime}
                </div>
                <div style={{ fontSize: '12px', color: colors.text.muted, marginTop: '4px' }}>
                  {booking.space} • ${booking.totalAmount.toLocaleString()}
                </div>
              </div>
              
              <div style={{ position: 'relative' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleManageClick(booking.id);
                  }}
                  style={{
                    padding: '8px 12px',
                    background: colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#4f46e5';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = colors.primary;
                  }}
                >
                  Manage
                </button>
                
                {showManageOptions === booking.id && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: colors.surface,
                    borderRadius: '8px',
                    border: '1px solid colors.border',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    zIndex: 10,
                    minWidth: '160px',
                    marginTop: '4px',
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManageAction('edit', booking);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '14px',
                        color: colors.text.primary,
                        cursor: 'pointer',
                        borderBottom: '1px solid colors.border',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = colors.background;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      ✏️ Edit Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManageAction('change-date', booking);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '14px',
                        color: colors.text.primary,
                        cursor: 'pointer',
                        borderBottom: '1px solid colors.border',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = colors.background;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      📅 Change Date
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManageAction('change-space', booking);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '14px',
                        color: colors.text.primary,
                        cursor: 'pointer',
                        borderBottom: '1px solid colors.border',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = colors.background;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      🏢 Change Space
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManageAction('cancel', booking);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '14px',
                        color: colors.danger,
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#fef2f2';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      ❌ Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderQuotations() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {quotations.map(quotation => (
          <div
            key={quotation.id}
            style={{
              background: colors.surface,
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid colors.border',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => onBookingSelect(quotation)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.text.primary, margin: '0 0 4px 0' }}>
                  {quotation.eventType}
                </h3>
                <p style={{ fontSize: '14px', color: colors.text.secondary, margin: '0 0 8px 0' }}>
                  {quotation.clientName}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: '#fffbeb',
                    color: colors.warning,
                  }}>
                    Quotation
                  </span>
                  <span style={{ fontSize: '12px', color: colors.text.muted }}>
                    {quotation.attendees} attendees
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: colors.text.muted }}>
                  {new Date(quotation.date).toLocaleDateString()} • {quotation.startTime} - {quotation.endTime}
                </div>
                <div style={{ fontSize: '12px', color: colors.text.muted, marginTop: '4px' }}>
                  {quotation.space} • ${quotation.totalAmount.toLocaleString()}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditBooking(quotation);
                  }}
                  style={{
                    padding: '8px 12px',
                    background: colors.success,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#059669';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = colors.success;
                  }}
                >
                  Convert
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancelBooking(quotation);
                  }}
                  style={{
                    padding: '8px 12px',
                    background: colors.danger,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#dc2626';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = colors.danger;
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderCancelledBookings() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {cancelledBookings.map(booking => (
          <div
            key={booking.id}
            style={{
              background: colors.surface,
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid colors.border',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: 0.7,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => onBookingSelect(booking)}
          >
            <div style={{ marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.text.primary, margin: '0 0 4px 0' }}>
                {booking.eventType}
              </h3>
              <p style={{ fontSize: '14px', color: colors.text.secondary, margin: '0 0 8px 0' }}>
                {booking.clientName}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: '#fef2f2',
                  color: colors.danger,
                }}>
                  Cancelled
                </span>
                <span style={{ fontSize: '12px', color: colors.text.muted }}>
                  {booking.attendees} attendees
                </span>
              </div>
              <div style={{ fontSize: '12px', color: colors.text.muted }}>
                {new Date(booking.date).toLocaleDateString()} • {booking.startTime} - {booking.endTime}
              </div>
              <div style={{ fontSize: '12px', color: colors.text.muted, marginTop: '4px' }}>
                {booking.space} • ${booking.totalAmount.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      background: colors.surface,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid colors.border',
      height: 'fit-content',
    }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div style={{
          background: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: 16,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: colors.primary, marginBottom: 4 }}>
            {activeBookings.length}
          </div>
          <div style={{ fontSize: 12, color: colors.text.secondary, fontWeight: 500 }}>
            Active Bookings
          </div>
        </div>
        <div style={{
          background: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: 16,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: colors.warning, marginBottom: 4 }}>
            {quotations.length}
          </div>
          <div style={{ fontSize: 12, color: colors.text.secondary, fontWeight: 500 }}>
            Quotations
          </div>
        </div>
        <div style={{
          background: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: 16,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: colors.danger, marginBottom: 4 }}>
            {cancelledBookings.length}
          </div>
          <div style={{ fontSize: 12, color: colors.text.secondary, fontWeight: 500 }}>
            Cancelled
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button
            onClick={() => setActiveSection('active')}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              background: activeSection === 'active' ? colors.primary : colors.surface,
              color: activeSection === 'active' ? '#fff' : colors.text.secondary,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Active
          </button>
          <button
            onClick={() => setActiveSection('quotes')}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              background: activeSection === 'quotes' ? colors.primary : colors.surface,
              color: activeSection === 'quotes' ? '#fff' : colors.text.secondary,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Quotes
          </button>
          <button
            onClick={() => setActiveSection('cancelled')}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              background: activeSection === 'cancelled' ? colors.primary : colors.surface,
              color: activeSection === 'cancelled' ? '#fff' : colors.text.secondary,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Content */}
      {activeSection === 'active' && renderActiveBookings()}
      {activeSection === 'quotes' && renderQuotations()}
      {activeSection === 'cancelled' && renderCancelledBookings()}

      {/* Decorative Icon */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: colors.primaryGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 600,
      }}>
        N
      </div>
    </div>
  );
} 