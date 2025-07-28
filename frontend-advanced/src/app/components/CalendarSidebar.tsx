'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { bookingsApi, calendarBlocksApi } from '../../services/api';
import type { Booking, CalendarBlock } from '../../services/api';

type CalendarStatus = 'available' | 'booked' | 'partial' | 'closed' | 'blocked' | 'space_blocked';

interface DayData {
  status: CalendarStatus;
  bookings: Booking[];
  blocks: CalendarBlock[];
}

// Unified color scheme matching the booking calendar
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

export default function CalendarSidebar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarData, setCalendarData] = useState<Record<string, DayData>>({});
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarBlocks, setCalendarBlocks] = useState<CalendarBlock[]>([]);

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

        // Add sample data for demonstration (same as booking calendar)
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
      setSelectedDate(value);
    }
  };

  const formatTime = (time: string): string => {
    return time.substring(0, 5); // Remove seconds if present
  };

  const dayData = calendarData[selectedDate.toISOString().split('T')[0]];
  const status = dayData?.status || 'available';
  const events = dayData?.bookings || [];
  const blocks = dayData?.blocks || [];

  return (
    <div style={{
      width: 280,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 16px rgba(31,38,135,0.08)',
      padding: '20px 16px 16px 16px',
      marginRight: 32,
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: '#6a82fb' }}>Calendar</h3>
      
      {loading && (
        <div style={{ fontSize: 12, color: colors.text.secondary, marginBottom: 12 }}>
          Loading...
        </div>
      )}
      
      <Calendar
        onChange={handleDateChange}
        value={currentDate}
        tileClassName={({ date, view }) => {
          if (view !== 'month') return '';
          const status = getDayStatus(date);
          return `sidebar-calendar-day-${status}`;
        }}
        tileContent={({ date, view }) => {
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
              padding: '2px',
              minHeight: '50px',
            }}>
              {/* Date number */}
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                color: dayStatus === 'available' ? '#374151' : '#1f2937',
                marginBottom: '2px',
                zIndex: 2,
                lineHeight: '1',
              }}>
                {date.getDate()}
              </div>

              {/* Event preview for single booking */}
              {dayStatus === 'booked' && dayBookings.length === 1 && (
                <div style={{
                  fontSize: '8px',
                  fontWeight: 600,
                  color: '#1f2937',
                  textAlign: 'center',
                  lineHeight: '1.1',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  padding: '1px 2px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '2px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                }}>
                  {dayBookings[0].clientName || dayBookings[0].eventType || 'Event'}
                </div>
              )}

              {/* Multiple events preview */}
              {dayStatus === 'partial' && dayBookings.length > 1 && (
                <div style={{
                  fontSize: '7px',
                  fontWeight: 600,
                  color: '#1f2937',
                  textAlign: 'center',
                  padding: '1px 2px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '2px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                }}>
                  {dayBookings.length} events
                </div>
              )}

              {/* Status indicators */}
              {(dayStatus === 'blocked' || dayStatus === 'space_blocked') && (
                <div style={{
                  fontSize: '7px',
                  fontWeight: 600,
                  color: '#1f2937',
                  textAlign: 'center',
                  padding: '1px 2px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '2px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  marginTop: 'auto',
                }}>
                  {dayStatus === 'blocked' ? 'Blocked' : 'Space Blocked'}
                </div>
              )}
            </div>
          );
        }}
      />
      
      <style>{`
        .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
          background: transparent;
        }
        
        .react-calendar__navigation {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .react-calendar__navigation button {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          font-size: 12px;
          font-weight: 600;
          color: ${colors.text.primary};
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .react-calendar__navigation button:hover {
          background: ${colors.background};
          border-color: ${colors.primary};
          color: ${colors.primary};
        }
        
        .react-calendar__navigation__label {
          font-size: 14px;
          font-weight: 700;
          color: ${colors.text.primary};
          background: transparent;
          border: none;
          padding: 6px 12px;
        }
        
        .react-calendar__month-view__weekdays {
          margin-bottom: 8px;
        }
        
        .react-calendar__month-view__weekdays__weekday {
          padding: 8px 4px;
          font-weight: 600;
          color: ${colors.text.secondary};
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }
        
        .react-calendar__tile {
          position: relative;
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          padding: 8px 4px;
          font-size: 12px;
          font-weight: 500;
          color: ${colors.text.primary};
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1px;
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
        
        .sidebar-calendar-day-available {
          background: #ecfdf5 !important;
          border-color: #a7f3d0 !important;
          color: #065f46 !important;
        }
        
        .sidebar-calendar-day-booked {
          background: #fef2f2 !important;
          border-color: #fca5a5 !important;
          color: #991b1b !important;
        }
        
        .sidebar-calendar-day-partial {
          background: #fffbeb !important;
          border-color: #fcd34d !important;
          color: #92400e !important;
        }
        
        .sidebar-calendar-day-closed {
          background: #f8fafc !important;
          border-color: #cbd5e1 !important;
          color: #475569 !important;
        }
        
        .sidebar-calendar-day-blocked {
          background: #eef2ff !important;
          border-color: #a5b4fc !important;
          color: #3730a3 !important;
        }
        
        .sidebar-calendar-day-space_blocked {
          background: #fffbeb !important;
          border-color: #fbbf24 !important;
          color: #92400e !important;
        }
        
        .react-calendar__tile--neighboringMonth {
          color: ${colors.text.muted};
          background: ${colors.background};
        }
      `}</style>
      
      <div style={{ marginTop: 16, width: '100%' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: '#444' }}>
          {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
        <div style={{
          marginBottom: 8,
          fontWeight: 500,
          fontSize: 12,
          color:
            status === 'booked' ? colors.danger
            : status === 'partial' ? colors.warning
            : status === 'closed' ? colors.text.muted
            : status === 'blocked' ? colors.primary
            : status === 'space_blocked' ? colors.secondary
            : colors.success,
        }}>
          {status === 'booked' ? 'Booked' :
           status === 'partial' ? 'Multiple Events' :
           status === 'closed' ? 'Venue Closed' :
           status === 'blocked' ? 'Blocked' :
           status === 'space_blocked' ? 'Space Blocked' :
           'Available'}
        </div>
        
        {events.length === 0 && blocks.length === 0 ? (
          <div style={{ color: '#aaa', fontSize: 12 }}>No events for this day.</div>
        ) : (
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {/* Show blocks first */}
            {blocks.map((block, i) => (
              <div key={`block-${i}`} style={{
                background: 'linear-gradient(90deg, #eef2ff 0%, #c7d2fe 100%)',
                borderRadius: 6,
                padding: '6px 8px',
                marginBottom: 6,
                color: colors.primary,
                fontSize: 11,
                border: '1px solid #a5b4fc',
              }}>
                <b>🚫 {block.reason}</b>
                <div style={{ fontSize: 10, marginTop: 2 }}>{block.description}</div>
              </div>
            ))}
            
            {/* Show events */}
            {events.map((ev, i) => (
              <div key={`event-${i}`} style={{
                background:
                  ev.status === 'Confirmed'
                    ? 'linear-gradient(90deg, #ecfdf5 0%, #a7f3d0 100%)'
                    : ev.status === 'Pending'
                    ? 'linear-gradient(90deg, #fffbeb 0%, #fcd34d 100%)'
                    : 'linear-gradient(90deg, #fef2f2 0%, #fca5a5 100%)',
                borderRadius: 6,
                padding: '6px 8px',
                marginBottom: 6,
                color: ev.status === 'Confirmed' ? colors.success : ev.status === 'Pending' ? colors.warning : colors.danger,
                fontSize: 11,
                border: `1px solid ${ev.status === 'Confirmed' ? '#a7f3d0' : ev.status === 'Pending' ? '#fcd34d' : '#fca5a5'}`,
              }}>
                <b>{ev.clientName}</b>
                <div style={{ fontSize: 10, marginTop: 2 }}>
                  {formatTime(ev.startTime)} - {formatTime(ev.endTime)} • {ev.space}
                </div>
                <div style={{ fontSize: 9, marginTop: 2, opacity: 0.8 }}>
                  {ev.attendees} attendees • ${ev.totalAmount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Compact Legend */}
      <div style={{
        marginTop: 16,
        width: '100%',
        color: '#222',
        fontWeight: 500,
        fontSize: 11,
      }}>
        <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 4, color: '#444' }}>Legend:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <span>
            <span style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              background: colors.success,
              borderRadius: '50%',
              marginRight: 4,
              verticalAlign: 'middle',
            }} />
            <span style={{ color: colors.success }}>Available</span>
          </span>
          <span>
            <span style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              background: colors.danger,
              borderRadius: '50%',
              marginRight: 4,
              verticalAlign: 'middle',
            }} />
            <span style={{ color: colors.danger }}>Booked</span>
          </span>
          <span>
            <span style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              background: colors.warning,
              borderRadius: '50%',
              marginRight: 4,
              verticalAlign: 'middle',
            }} />
            <span style={{ color: colors.warning }}>Multiple</span>
          </span>
          <span>
            <span style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              background: colors.text.muted,
              borderRadius: '50%',
              marginRight: 4,
              verticalAlign: 'middle',
            }} />
            <span style={{ color: colors.text.muted }}>Closed</span>
          </span>
        </div>
      </div>
    </div>
  );
}