'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { bookingsApi, calendarBlocksApi, apiUtils } from '../../../services/api';
import type { Booking, CalendarBlock } from '../../../services/api';
import CalendarBlockModal from './CalendarBlockModal';

interface BookingsCalendarProps {
  onDateSelect?: (date: Date) => void;
  onBookingSelect?: (booking: Booking) => void;
  selectedDate?: Date;
}

type CalendarStatus = 'available' | 'booked' | 'partial' | 'closed' | 'blocked' | 'space_blocked';

interface DayData {
  status: CalendarStatus;
  bookings: Booking[];
  blocks: CalendarBlock[];
}

// Unified color scheme matching the main page
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

export default function BookingsCalendar({ onDateSelect, onBookingSelect, selectedDate }: BookingsCalendarProps) {
  const [calendarData, setCalendarData] = useState<Record<string, DayData>>({});
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedBlockDate, setSelectedBlockDate] = useState<Date | undefined>();
  const [calendarBlocks, setCalendarBlocks] = useState<CalendarBlock[]>([]);
  const [selectedDateBookings, setSelectedDateBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookingsForMonth();
    fetchCalendarBlocks();
  }, [currentDate]);

  const fetchCalendarBlocks = async () => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const startDate = new Date(year, month, 1).toISOString().split('T')[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
      
      const response = await calendarBlocksApi.getForDateRange(startDate, endDate);
      if (response.data) {
        setCalendarBlocks(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch calendar blocks:', error);
    }
  };

  const fetchBookingsForMonth = async () => {
    setLoading(true);
    try {
      const response = await bookingsApi.getAll();
      if (response.data) {
        const bookings = response.data;
        const monthData: Record<string, DayData> = {};
        
        // Get the first and last day of the current month view
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Initialize all days in the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
          const date = new Date(year, month, day);
          const key = date.toISOString().split('T')[0];
          const dayOfWeek = date.getDay();
          
          // Check if it's a weekend (closed)
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          
          monthData[key] = {
            status: isWeekend ? 'closed' : 'available',
            bookings: [],
            blocks: [],
          };
        }
        
        // Add real bookings to the calendar
        bookings.forEach(booking => {
          const key = booking.date;
          if (monthData[key]) {
            monthData[key].bookings.push(booking);
            
            // Update status based on bookings
            if (monthData[key].bookings.length === 1) {
              monthData[key].status = 'booked';
            } else if (monthData[key].bookings.length > 1) {
              monthData[key].status = 'partial';
            }
          }
        });

        // Add sample data for demonstration
        const sampleBookings = [
          {
            id: 'sample-1',
            clientId: 1,
            clientName: 'Tech Conference 2025',
            date: `${year}-${String(month + 1).padStart(2, '0')}-15`,
            startTime: '09:00',
            endTime: '17:00',
            space: 'Main Hall',
            status: 'Confirmed' as const,
            attendees: 200,
            eventType: 'Conference',
            notes: 'Annual tech conference with keynote speakers',
            createdAt: '2024-12-01',
            totalAmount: 5000,
            depositPaid: 1000,
          },
          {
            id: 'sample-2',
            clientId: 2,
            clientName: 'Wedding Reception',
            date: `${year}-${String(month + 1).padStart(2, '0')}-22`,
            startTime: '18:00',
            endTime: '23:00',
            space: 'Garden Room',
            status: 'Confirmed' as const,
            attendees: 120,
            eventType: 'Wedding Reception',
            notes: 'Sarah & John wedding celebration',
            createdAt: '2024-12-01',
            totalAmount: 3000,
            depositPaid: 1500,
          },
          {
            id: 'sample-3',
            clientId: 3,
            clientName: 'Product Launch',
            date: `${year}-${String(month + 1).padStart(2, '0')}-08`,
            startTime: '19:00',
            endTime: '22:00',
            space: 'Rooftop',
            status: 'Pending' as const,
            attendees: 80,
            eventType: 'Product Launch',
            notes: 'New smartphone launch event',
            createdAt: '2024-12-01',
            totalAmount: 2500,
            depositPaid: 500,
          },
          {
            id: 'sample-4',
            clientId: 4,
            clientName: 'Corporate Dinner',
            date: `${year}-${String(month + 1).padStart(2, '0')}-12`,
            startTime: '18:30',
            endTime: '21:30',
            space: 'Main Hall',
            status: 'Confirmed' as const,
            attendees: 150,
            eventType: 'Corporate Event',
            notes: 'Annual company dinner and awards',
            createdAt: '2024-12-01',
            totalAmount: 4000,
            depositPaid: 2000,
          },
          {
            id: 'sample-5',
            clientId: 5,
            clientName: 'Birthday Party',
            date: `${year}-${String(month + 1).padStart(2, '0')}-25`,
            startTime: '14:00',
            endTime: '18:00',
            space: 'Garden Room',
            status: 'Pending' as const,
            attendees: 50,
            eventType: 'Birthday Party',
            notes: 'Sweet 16 birthday celebration',
            createdAt: '2024-12-01',
            totalAmount: 1200,
            depositPaid: 300,
          },
          {
            id: 'sample-6',
            clientId: 6,
            clientName: 'Morning Meeting',
            date: `${year}-${String(month + 1).padStart(2, '0')}-12`,
            startTime: '09:00',
            endTime: '11:00',
            space: 'Conference Room A',
            status: 'Confirmed' as const,
            attendees: 25,
            eventType: 'Meeting',
            notes: 'Board meeting and strategy session',
            createdAt: '2024-12-01',
            totalAmount: 800,
            depositPaid: 400,
          },
          {
            id: 'sample-7',
            clientId: 7,
            clientName: 'Art Exhibition',
            date: `${year}-${String(month + 1).padStart(2, '0')}-18`,
            startTime: '10:00',
            endTime: '18:00',
            space: 'Main Hall',
            status: 'Confirmed' as const,
            attendees: 100,
            eventType: 'Exhibition',
            notes: 'Local artists showcase',
            createdAt: '2024-12-01',
            totalAmount: 1800,
            depositPaid: 900,
          },
          {
            id: 'sample-8',
            clientId: 8,
            clientName: 'Evening Reception',
            date: `${year}-${String(month + 1).padStart(2, '0')}-18`,
            startTime: '19:00',
            endTime: '23:00',
            space: 'Garden Room',
            status: 'Confirmed' as const,
            attendees: 80,
            eventType: 'Reception',
            notes: 'Evening networking event',
            createdAt: '2024-12-01',
            totalAmount: 2200,
            depositPaid: 1100,
          },
          {
            id: 'sample-9',
            clientId: 9,
            clientName: 'Workshop Session',
            date: `${year}-${String(month + 1).padStart(2, '0')}-29`,
            startTime: '14:00',
            endTime: '16:00',
            space: 'Conference Room A',
            status: 'Pending' as const,
            attendees: 30,
            eventType: 'Workshop',
            notes: 'Professional development workshop',
            createdAt: '2024-12-01',
            totalAmount: 600,
            depositPaid: 200,
          },
          {
            id: 'sample-10',
            clientId: 10,
            clientName: 'Gala Dinner',
            date: `${year}-${String(month + 1).padStart(2, '0')}-29`,
            startTime: '19:30',
            endTime: '23:30',
            space: 'Main Hall',
            status: 'Confirmed' as const,
            attendees: 200,
            eventType: 'Gala',
            notes: 'Annual charity gala dinner',
            createdAt: '2024-12-01',
            totalAmount: 6000,
            depositPaid: 3000,
          },
        ];
        
        // Add sample bookings to the calendar
        sampleBookings.forEach(booking => {
          const key = booking.date;
          if (monthData[key]) {
            monthData[key].bookings.push(booking);
            
            // Update status based on total bookings for that day
            const totalBookings = monthData[key].bookings.length;
            if (totalBookings === 1) {
              monthData[key].status = 'booked';
            } else if (totalBookings > 1) {
              monthData[key].status = 'partial';
            }
          }
        });

        // Add sample calendar blocks
        const sampleBlocks = [
          {
            id: 'block-1',
            date: `${year}-${String(month + 1).padStart(2, '0')}-25`,
            type: 'venue_closure' as const,
            reason: 'Christmas Day - Venue Closed',
            description: 'Annual holiday closure',
            createdAt: '2024-01-01',
            createdBy: 'Admin',
          },
          {
            id: 'block-2',
            date: `${year}-${String(month + 1).padStart(2, '0')}-26`,
            type: 'maintenance' as const,
            reason: 'Post-Christmas Maintenance',
            description: 'Deep cleaning and equipment maintenance',
            createdAt: '2024-01-01',
            createdBy: 'Admin',
          },
          {
            id: 'block-3',
            date: `${year}-${String(month + 1).padStart(2, '0')}-31`,
            type: 'advance_booking' as const,
            reason: 'New Year\'s Eve - Reserved for Major Event',
            description: 'Holding for potential high-profile New Year celebration',
            createdAt: '2024-06-01',
            createdBy: 'Manager',
          },
          {
            id: 'block-4',
            date: `${year}-${String(month + 1).padStart(2, '0')}-15`,
            type: 'space_block' as const,
            spaces: ['Main Hall', 'Garden Room'],
            reason: 'Annual Staff Party',
            description: 'Internal staff celebration - Main Hall and Garden Room reserved',
            createdAt: '2024-11-01',
            createdBy: 'HR Manager',
          },
        ];

        // Add sample blocks to the calendar
        sampleBlocks.forEach(block => {
          const key = block.date;
          if (monthData[key]) {
            monthData[key].blocks.push(block);
            
            // Update status based on block type
            if (block.type === 'venue_closure') {
              monthData[key].status = 'blocked';
            } else if (block.type === 'space_block' && monthData[key].status !== 'blocked') {
              monthData[key].status = 'space_blocked';
            }
          }
        });

        // Add calendar blocks to the calendar
        calendarBlocks.forEach(block => {
          const key = block.date;
          if (monthData[key]) {
            monthData[key].blocks.push(block);
            monthData[key].status = 'blocked';
          }
        });

        setCalendarData(monthData);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDayStatus = (date: Date): CalendarStatus => {
    const key = date.toISOString().split('T')[0];
    return calendarData[key]?.status || 'available';
  };

  const getDayBookings = (date: Date): Booking[] => {
    const key = date.toISOString().split('T')[0];
    return calendarData[key]?.bookings || [];
  };

  const getDayBlocks = (date: Date): CalendarBlock[] => {
    const key = date.toISOString().split('T')[0];
    return calendarData[key]?.blocks || [];
  };

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setCurrentDate(value);
      if (onDateSelect) {
        onDateSelect(value);
      }
    }
  };

  const handleDayClick = (date: Date) => {
    const dayBookings = getDayBookings(date);
    const dayBlocks = getDayBlocks(date);
    
    // Always set the clicked date and show event list
    setClickedDate(date);
    setSelectedDateBookings(dayBookings);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleEventClick = (booking: Booking) => {
    if (onBookingSelect) {
      onBookingSelect(booking);
    }
  };

  const getStatusColor = (status: CalendarStatus): string => {
    switch (status) {
      case 'available':
        return colors.success;
      case 'booked':
        return colors.danger;
      case 'partial':
        return colors.warning;
      case 'closed':
        return colors.text.muted;
      case 'blocked':
        return colors.primary;
      case 'space_blocked':
        return colors.secondary;
      default:
        return colors.text.secondary;
    }
  };

  const getStatusBackgroundColor = (status: CalendarStatus): string => {
    switch (status) {
      case 'available':
        return '#ecfdf5'; // Green 50
      case 'booked':
        return '#fef2f2'; // Red 50
      case 'partial':
        return '#fffbeb'; // Amber 50
      case 'closed':
        return '#f8fafc'; // Slate 50
      case 'blocked':
        return '#eef2ff'; // Indigo 50
      case 'space_blocked':
        return '#fffbeb'; // Amber 50
      default:
        return colors.background;
    }
  };

  const formatTime = (time: string): string => {
    return time.substring(0, 5); // Remove seconds if present
  };

  const handleSaveBlock = async (blockData: Partial<CalendarBlock>) => {
    try {
      if (blockData.id) {
        // Update existing block
        const response = await calendarBlocksApi.update(blockData.id, blockData);
        if (response.error) {
          alert('Failed to update calendar block: ' + response.error);
        } else {
          setShowBlockModal(false);
          fetchCalendarBlocks();
        }
      } else {
        // Create new block - ensure required fields are present
        const createData = {
          date: blockData.date || new Date().toISOString().split('T')[0],
          type: blockData.type || 'venue_closure',
          reason: blockData.reason || '',
          description: blockData.description || '',
          spaces: blockData.spaces || [],
          isRecurring: blockData.isRecurring || false,
          recurringPattern: blockData.recurringPattern,
          createdBy: blockData.createdBy || 'admin',
        };
        
        const response = await calendarBlocksApi.create(createData);
        if (response.error) {
          alert('Failed to create calendar block: ' + response.error);
        } else {
          setShowBlockModal(false);
          fetchCalendarBlocks();
        }
      }
    } catch (error) {
      console.error('Failed to save calendar block:', error);
      alert('Failed to save calendar block. Please try again.');
    }
  };

  const renderEventList = () => {
    if (!clickedDate) return null;

    return (
      <div style={{
        marginTop: '24px',
        background: colors.surface,
        borderRadius: '12px',
        border: '1px solid colors.border',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px',
          background: colors.primaryGradient,
          color: '#fff',
          fontSize: '16px',
          fontWeight: 600,
        }}>
          Events for {clickedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        <div style={{ padding: '16px 20px' }}>
          {selectedDateBookings.length > 0 ? (
            selectedDateBookings.map((booking, index) => (
              <div
                key={booking.id}
                style={{
                  background: colors.background,
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: index < selectedDateBookings.length - 1 ? '12px' : 0,
                  border: '1px solid colors.border',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = colors.border;
                }}
                onClick={() => handleEventClick(booking)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ flex: 1, marginRight: '80px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      color: colors.text.primary, 
                      margin: '0 0 4px 0' 
                    }}>
                      {booking.eventType}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: colors.text.secondary, 
                      margin: '0 0 8px 0' 
                    }}>
                      {booking.clientName}
                    </p>
                  </div>
                  
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: booking.status === 'Confirmed' ? '#ecfdf5' : booking.status === 'Pending' ? '#fffbeb' : booking.status === 'Cancelled' ? '#fef2f2' : '#f0f9ff',
                    color: booking.status === 'Confirmed' ? colors.success : booking.status === 'Pending' ? colors.warning : booking.status === 'Cancelled' ? colors.danger : colors.primary,
                    flexShrink: 0,
                  }}>
                    {booking.status}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: colors.text.secondary }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontWeight: 600 }}>📅</span>
                    {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontWeight: 600 }}>🏢</span>
                    {booking.space}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontWeight: 600 }}>👥</span>
                    {booking.attendees} attendees
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontWeight: 600 }}>💰</span>
                    ${booking.totalAmount.toLocaleString()}
                  </div>
                </div>
                
                {booking.notes && (
                  <div style={{ 
                    marginTop: '8px', 
                    padding: '8px 12px', 
                    background: '#f8fafc', 
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: colors.text.secondary,
                    fontStyle: 'italic',
                  }}>
                    {booking.notes}
                  </div>
                )}
                
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontSize: '12px',
                  color: colors.text.muted,
                  fontWeight: 500,
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                }}>
                  Click to view details →
                </div>
              </div>
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '32px 16px',
              color: colors.text.secondary,
              fontSize: '14px',
            }}>
              No events scheduled for this date
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCalendarLegend = () => (
    <div style={{ 
      marginTop: 24, 
      padding: '16px', 
      background: colors.background, 
      borderRadius: 8,
      border: `1px solid ${colors.border}`
    }}>
      <h4 style={{ 
        fontSize: 14, 
        fontWeight: 600, 
        color: colors.text.primary, 
        marginBottom: 12 
      }}>
        Calendar Legend
      </h4>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: 8 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: colors.success,
          }}></div>
          <span style={{ fontSize: 12, color: colors.text.secondary }}>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: colors.danger,
          }}></div>
          <span style={{ fontSize: 12, color: colors.text.secondary }}>Booked</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: colors.warning,
          }}></div>
          <span style={{ fontSize: 12, color: colors.text.secondary }}>Multiple</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: colors.text.muted,
          }}></div>
          <span style={{ fontSize: 12, color: colors.text.secondary }}>Closed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: colors.primary,
          }}></div>
          <span style={{ fontSize: 12, color: colors.text.secondary }}>Blocked</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: colors.secondary,
          }}></div>
          <span style={{ fontSize: 12, color: colors.text.secondary }}>Space Blocked</span>
        </div>
      </div>
    </div>
  );

  // Function to get events for a specific date


  // Custom tile content renderer with event names
  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view !== 'month') return null;

    const dayBookings = getDayBookings(date);
    const dayStatus = getDayStatus(date);
    
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '4px',
        minHeight: '70px',
        cursor: dayBookings.length > 0 ? 'pointer' : 'default',
      }}
      onClick={() => handleDayClick(date)}
      >
        {/* Date number */}
        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: dayStatus === 'available' ? '#374151' : '#1f2937',
          marginBottom: '4px',
          zIndex: 2,
          lineHeight: '1',
        }}>
          {date.getDate()}
        </div>

        {/* Event preview text for single booking */}
        {dayStatus === 'booked' && dayBookings.length === 1 && (
          <div style={{
            fontSize: '10px',
            fontWeight: 600,
            color: '#1f2937',
            textAlign: 'center',
            lineHeight: '1.2',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: '2px 3px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '3px',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            marginBottom: '2px',
          }}>
            {dayBookings[0].clientName || dayBookings[0].eventType || 'Event'}
          </div>
        )}

        {/* Multiple events preview */}
        {dayStatus === 'partial' && dayBookings.length > 1 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            width: '100%',
            marginBottom: '2px',
          }}>
            {dayBookings.slice(0, 2).map((booking, index) => (
              <div
                key={index}
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  color: '#1f2937',
                  textAlign: 'center',
                  lineHeight: '1.1',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  padding: '2px 3px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '3px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                }}
              >
                {booking.clientName || booking.eventType || 'Event'}
              </div>
            ))}
            {dayBookings.length > 2 && (
              <div style={{
                fontSize: '8px',
                color: '#6b7280',
                textAlign: 'center',
                fontStyle: 'italic',
                fontWeight: 500,
                lineHeight: '1',
              }}>
                +{dayBookings.length - 2} more
              </div>
            )}
          </div>
        )}

        {/* Status indicators - positioned at bottom */}
        {(dayStatus === 'blocked' || dayStatus === 'space_blocked') && (
          <div style={{
            fontSize: '9px',
            fontWeight: 600,
            color: '#1f2937',
            textAlign: 'center',
            padding: '2px 3px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '3px',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            marginTop: 'auto',
            lineHeight: '1',
          }}>
            {dayStatus === 'blocked' ? 'Blocked' : 'Space Blocked'}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      background: colors.surface,
      borderRadius: 16,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '24px',
      minHeight: 600,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: colors.text.primary, margin: 0 }}>
          Bookings Calendar
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {loading && (
            <div style={{ fontSize: 14, color: colors.text.secondary }}>
              Loading...
            </div>
          )}
          <button
            onClick={() => {
              setSelectedBlockDate(undefined);
              setShowBlockModal(true);
            }}
            style={{
              background: colors.primaryGradient,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 16px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px -1px rgba(99, 102, 241, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px -1px rgba(99, 102, 241, 0.3)';
            }}
          >
            <span style={{ fontSize: 16 }}>🚫</span>
            Block Calendar
          </button>
        </div>
      </div>

      <Calendar
        onChange={handleDateChange}
        value={currentDate}
        tileClassName={({ date, view }) => {
          if (view !== 'month') return '';
          const status = getDayStatus(date);
          return `calendar-day-${status}`;
        }}
        tileContent={tileContent}
      />

      {/* Event List Preview */}
      {renderEventList()}

      {/* Calendar Legend */}
      {renderCalendarLegend()}

      <style>{`
        .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
          background: transparent;
        }
        
        .react-calendar__navigation {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .react-calendar__navigation button {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          font-size: 16px;
          font-weight: 600;
          color: ${colors.text.primary};
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .react-calendar__navigation button:hover {
          background: ${colors.background};
          border-color: ${colors.primary};
          color: ${colors.primary};
        }
        
        .react-calendar__navigation button:disabled {
          color: ${colors.text.muted};
          cursor: not-allowed;
          background: ${colors.background};
        }
        
        .react-calendar__navigation__label {
          font-size: 18px;
          font-weight: 700;
          color: ${colors.text.primary};
          background: transparent;
          border: none;
          padding: 10px 20px;
        }
        
        .react-calendar__month-view__weekdays {
          margin-bottom: 12px;
        }
        
        .react-calendar__month-view__weekdays__weekday {
          padding: 12px 8px;
          font-weight: 600;
          color: ${colors.text.secondary};
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }
        
        .react-calendar__tile {
          position: relative;
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          padding: 12px 8px;
          font-size: 14px;
          font-weight: 500;
          color: ${colors.text.primary};
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2px;
        }
        
        .react-calendar__tile:hover {
          background: ${colors.background};
          border-color: ${colors.primary};
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .react-calendar__tile--active {
          background: ${colors.primary} !important;
          color: white !important;
          border-color: ${colors.primary} !important;
          box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
        }
        
        .react-calendar__tile--now {
          background: ${colors.background};
          color: ${colors.primary};
          font-weight: 600;
          border-color: ${colors.primary};
        }
        
        .calendar-day-available {
          background: #ecfdf5 !important;
          border-color: #a7f3d0 !important;
          color: #065f46 !important;
        }
        
        .calendar-day-booked {
          background: #fef2f2 !important;
          border-color: #fca5a5 !important;
          color: #991b1b !important;
        }
        
        .calendar-day-partial {
          background: #fffbeb !important;
          border-color: #fcd34d !important;
          color: #92400e !important;
        }
        
        .calendar-day-closed {
          background: #f8fafc !important;
          border-color: #cbd5e1 !important;
          color: #475569 !important;
        }
        
        .calendar-day-blocked {
          background: #eef2ff !important;
          border-color: #a5b4fc !important;
          color: #3730a3 !important;
        }
        
        .calendar-day-space_blocked {
          background: #fffbeb !important;
          border-color: #fbbf24 !important;
          color: #92400e !important;
        }
        
        .react-calendar__tile--neighboringMonth {
          color: ${colors.text.muted};
          background: ${colors.background};
        }
      `}</style>

      {/* Calendar Block Modal */}
      <CalendarBlockModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        onSave={handleSaveBlock}
        selectedDate={selectedBlockDate}
      />
    </div>
  );
} 