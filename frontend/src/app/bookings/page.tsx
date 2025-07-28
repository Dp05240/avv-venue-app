'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import BookingSidebar from './components/BookingSidebar';
import BookingsCalendar from './components/BookingsCalendar';
import BookingModal from './components/BookingModal';
import BookingDetails from './components/BookingDetails';
import CalendarBlockModal from './components/CalendarBlockModal';
import { bookingsApi, calendarBlocksApi } from '../../services/api';
import type { Booking, CalendarBlock } from '../../services/api';

type ViewMode = 'calendar' | 'list';

// Unified color scheme for modern design
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

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [calendarBlocks, setCalendarBlocks] = useState<CalendarBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'>('all');
  const [filterSpace, setFilterSpace] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Enhanced booking form state
  const [bookingForm, setBookingForm] = useState({
    clientId: 1,
    date: '',
    startTime: '',
    endTime: '',
    space: 'Main Hall',
    status: 'Pending' as 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled',
    attendees: 0,
    eventType: 'Corporate Event',
    notes: '',
    totalAmount: 0,
    depositPaid: 0,
    setupTime: '30', // minutes
    cleanupTime: '30', // minutes
    catering: false,
    audioVisual: false,
    decorations: false,
    security: false,
    parking: false,
    specialRequirements: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    emergencyContact: '',
    insurance: false,
    contractSigned: false,
    depositReceived: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [bookingsResponse, blocksResponse] = await Promise.all([
        bookingsApi.getAll(),
        calendarBlocksApi.getAll()
      ]);

      if (bookingsResponse.data) {
        setBookings(bookingsResponse.data);
      }
      if (blocksResponse.data) {
        setCalendarBlocks(blocksResponse.data);
      }
    } catch (err) {
      setError('Failed to load bookings data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveBooking() {
    try {
      setLoading(true);
      const response = await bookingsApi.create({
        clientId: bookingForm.clientId,
        date: bookingForm.date,
        startTime: bookingForm.startTime,
        endTime: bookingForm.endTime,
        space: bookingForm.space,
        status: bookingForm.status,
        attendees: bookingForm.attendees,
        eventType: bookingForm.eventType,
        notes: bookingForm.notes,
        totalAmount: bookingForm.totalAmount,
        depositPaid: bookingForm.depositPaid,
      });

      if (response.data) {
        setBookings([...bookings, response.data!]);
        setShowBookingModal(false);
        resetBookingForm();
        alert('Booking created successfully!');
      } else if (response.error) {
        alert(`Error: ${response.error}`);
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      alert('Failed to create booking');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateBooking() {
    if (!editingBooking) return;

    try {
      setLoading(true);
      const response = await bookingsApi.update(editingBooking.id, {
        clientId: bookingForm.clientId,
        date: bookingForm.date,
        startTime: bookingForm.startTime,
        endTime: bookingForm.endTime,
        space: bookingForm.space,
        status: bookingForm.status,
        attendees: bookingForm.attendees,
        eventType: bookingForm.eventType,
        notes: bookingForm.notes,
        totalAmount: bookingForm.totalAmount,
        depositPaid: bookingForm.depositPaid,
      });

      if (response.data) {
        setBookings(bookings.map(b => b.id === editingBooking.id ? response.data! : b));
        setShowBookingModal(false);
        setEditingBooking(null);
        resetBookingForm();
        alert('Booking updated successfully!');
      }
    } catch (err) {
      console.error('Error updating booking:', err);
      alert('Failed to update booking');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteBooking(booking: Booking) {
    if (!confirm(`Are you sure you want to delete booking ${booking.id}?`)) return;

    try {
      setLoading(true);
      await bookingsApi.delete(booking.id);
      setBookings(bookings.filter(b => b.id !== booking.id));
      alert('Booking deleted successfully!');
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Failed to delete booking');
    } finally {
      setLoading(false);
    }
  }

  function handleBookingSelect(booking: Booking) {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  }

  function handleEditBooking(booking: Booking) {
    setEditingBooking(booking);
    setBookingForm({
      clientId: booking.clientId,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      space: booking.space,
      status: booking.status,
      attendees: booking.attendees,
      eventType: booking.eventType,
      notes: booking.notes,
      totalAmount: booking.totalAmount,
      depositPaid: booking.depositPaid,
      setupTime: '30',
      cleanupTime: '30',
      catering: false,
      audioVisual: false,
      decorations: false,
      security: false,
      parking: false,
      specialRequirements: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: '',
      emergencyContact: '',
      insurance: false,
      contractSigned: false,
      depositReceived: false,
    });
    setShowBookingModal(true);
  }

  function handleCancelBooking(booking: Booking) {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  }

  function resetBookingForm() {
    setBookingForm({
      clientId: 1,
      date: '',
      startTime: '',
      endTime: '',
      space: 'Main Hall',
      status: 'Pending',
      attendees: 0,
      eventType: 'Corporate Event',
      notes: '',
      totalAmount: 0,
      depositPaid: 0,
      setupTime: '30',
      cleanupTime: '30',
      catering: false,
      audioVisual: false,
      decorations: false,
      security: false,
      parking: false,
      specialRequirements: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: '',
      emergencyContact: '',
      insurance: false,
      contractSigned: false,
      depositReceived: false,
    });
  }

  // Enhanced filtering and search
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.space.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSpace = filterSpace === 'all' || booking.space === filterSpace;
    
    let matchesDate = true;
    if (filterDateRange !== 'all') {
      const bookingDate = new Date(booking.date);
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      switch (filterDateRange) {
        case 'today':
          matchesDate = bookingDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const endOfWeek = new Date(startOfDay);
          endOfWeek.setDate(startOfDay.getDate() + 7);
          matchesDate = bookingDate >= startOfDay && bookingDate < endOfWeek;
          break;
        case 'month':
          const endOfMonth = new Date(startOfDay);
          endOfMonth.setMonth(startOfDay.getMonth() + 1);
          matchesDate = bookingDate >= startOfDay && bookingDate < endOfMonth;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesSpace && matchesDate;
  });

  // Analytics calculations
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const pendingRevenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Pending')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: colors.background }}>
        <NavBar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 'calc(100vh - 80px)',
          fontSize: '18px',
          color: colors.text.secondary
        }}>
          Loading bookings...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: colors.background }}>
        <NavBar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 'calc(100vh - 80px)',
          fontSize: '18px',
          color: colors.danger
        }}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <NavBar />
      
      <div style={{ padding: '32px' }}>
        {/* Header with Analytics */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 700, color: colors.text.primary, marginBottom: '8px' }}>
                Booking Management
              </h1>
              <p style={{ fontSize: '18px', color: colors.text.secondary }}>
                Manage events, schedules, and venue bookings with advanced features
              </p>
            </div>
            <button
              onClick={() => {
                setEditingBooking(null);
                resetBookingForm();
                setShowBookingModal(true);
              }}
              style={{
                padding: '12px 24px',
                background: colors.primaryGradient,
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
              }}
            >
              <span style={{ fontSize: '20px' }}>+</span>
              New Booking
            </button>
          </div>

          {/* Analytics Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px', 
            marginBottom: '32px' 
          }}>
            <div style={{
              background: colors.surface,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid colors.border',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '60px', 
                height: '60px', 
                background: colors.primaryGradient,
                borderRadius: '0 16px 0 60px',
                opacity: 0.1
              }} />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: colors.primaryGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                }}>
                  <span style={{ color: '#fff', fontSize: '24px' }}>📅</span>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: colors.text.primary }}>
                    {totalBookings}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.text.secondary, fontWeight: 500 }}>
                    Total Bookings
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: colors.surface,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid colors.border',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '60px', 
                height: '60px', 
                background: `linear-gradient(135deg, ${colors.success} 0%, #34d399 100%)`,
                borderRadius: '0 16px 0 60px',
                opacity: 0.1
              }} />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${colors.success} 0%, #34d399 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                }}>
                  <span style={{ color: '#fff', fontSize: '24px' }}>✅</span>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: colors.text.primary }}>
                    {confirmedBookings}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.text.secondary, fontWeight: 500 }}>
                    Confirmed
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: colors.surface,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid colors.border',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '60px', 
                height: '60px', 
                background: `linear-gradient(135deg, ${colors.warning} 0%, #fbbf24 100%)`,
                borderRadius: '0 16px 0 60px',
                opacity: 0.1
              }} />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${colors.warning} 0%, #fbbf24 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                }}>
                  <span style={{ color: '#fff', fontSize: '24px' }}>⏳</span>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: colors.text.primary }}>
                    {pendingBookings}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.text.secondary, fontWeight: 500 }}>
                    Pending
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: colors.surface,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid colors.border',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '60px', 
                height: '60px', 
                background: `linear-gradient(135deg, ${colors.danger} 0%, #f87171 100%)`,
                borderRadius: '0 16px 0 60px',
                opacity: 0.1
              }} />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${colors.danger} 0%, #f87171 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                }}>
                  <span style={{ color: '#fff', fontSize: '24px' }}>❌</span>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: colors.text.primary }}>
                    {cancelledBookings}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.text.secondary, fontWeight: 500 }}>
                    Cancelled
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: colors.surface,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid colors.border',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '60px', 
                height: '60px', 
                background: `linear-gradient(135deg, #10b981 0%, #34d399 100%)`,
                borderRadius: '0 16px 0 60px',
                opacity: 0.1
              }} />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, #10b981 0%, #34d399 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                }}>
                  <span style={{ color: '#fff', fontSize: '24px' }}>💰</span>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: colors.text.primary }}>
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.text.secondary, fontWeight: 500 }}>
                    Total Revenue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Sidebar */}
          <div style={{ width: '320px', flexShrink: 0 }}>
            <BookingSidebar
              bookings={filteredBookings}
              onBookingSelect={handleBookingSelect}
              onEditBooking={handleEditBooking}
              onCancelBooking={handleCancelBooking}
              onDateChange={(booking) => {
                setSelectedBooking(booking);
                setShowBookingDetails(true);
              }}
              onSpaceChange={(booking) => {
                setSelectedBooking(booking);
                setShowBookingDetails(true);
              }}
            />
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1 }}>
            {/* View Mode Toggle */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginBottom: '24px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setViewMode('calendar')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  background: viewMode === 'calendar' ? colors.primary : colors.surface,
                  color: viewMode === 'calendar' ? '#fff' : colors.text.secondary,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                📅 Calendar View
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  background: viewMode === 'list' ? colors.primary : colors.surface,
                  color: viewMode === 'list' ? '#fff' : colors.text.secondary,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                📋 List View
              </button>
            </div>

            {viewMode === 'calendar' ? (
              <BookingsCalendar
                onDateSelect={setSelectedDate}
                onBookingSelect={handleBookingSelect}
                selectedDate={selectedDate || undefined}
              />
            ) : (
              <div style={{
                background: colors.surface,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid colors.border',
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 600, color: colors.text.primary, marginBottom: '16px' }}>
                    Booking List
                  </h2>
                  
                  {/* Enhanced Filters */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '16px', 
                    marginBottom: '24px',
                    flexWrap: 'wrap'
                  }}>
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        flex: 1,
                        minWidth: '200px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${colors.border}`,
                        fontSize: '16px',
                        background: colors.surface,
                      }}
                    />
                    
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${colors.border}`,
                        fontSize: '16px',
                        background: colors.surface,
                        minWidth: '120px',
                      }}
                    >
                      <option value="all">All Status</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    
                    <select
                      value={filterSpace}
                      onChange={(e) => setFilterSpace(e.target.value)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${colors.border}`,
                        fontSize: '16px',
                        background: colors.surface,
                        minWidth: '120px',
                      }}
                    >
                      <option value="all">All Spaces</option>
                      <option value="Main Hall">Main Hall</option>
                      <option value="Garden Room">Garden Room</option>
                      <option value="Rooftop">Rooftop</option>
                      <option value="Conference Room">Conference Room</option>
                    </select>
                    
                    <select
                      value={filterDateRange}
                      onChange={(e) => setFilterDateRange(e.target.value as any)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${colors.border}`,
                        fontSize: '16px',
                        background: colors.surface,
                        minWidth: '120px',
                      }}
                    >
                      <option value="all">All Dates</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>

                {/* Enhanced Booking List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredBookings.map(booking => (
                    <div
                      key={booking.id}
                      style={{
                        padding: '20px',
                        background: colors.background,
                        borderRadius: '12px',
                        border: '1px solid colors.border',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      onClick={() => handleBookingSelect(booking)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
                              {booking.eventType}
                            </h3>
                            <span style={{
                              marginLeft: '12px',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: booking.status === 'Confirmed' ? '#ecfdf5' : 
                                        booking.status === 'Pending' ? '#fffbeb' : 
                                        booking.status === 'Completed' ? '#f0f9ff' : '#fef2f2',
                              color: booking.status === 'Confirmed' ? colors.success : 
                                     booking.status === 'Pending' ? colors.warning : 
                                     booking.status === 'Completed' ? '#3b82f6' : colors.danger,
                            }}>
                              {booking.status}
                            </span>
                          </div>
                          
                          <div style={{ fontSize: '16px', color: colors.text.secondary, marginBottom: '4px' }}>
                            {booking.clientName}
                          </div>
                          
                          <div style={{ fontSize: '14px', color: colors.text.muted }}>
                            {new Date(booking.date).toLocaleDateString()} • {booking.startTime} - {booking.endTime} • {booking.space}
                          </div>
                          
                          <div style={{ fontSize: '14px', color: colors.text.muted, marginTop: '8px' }}>
                            {booking.attendees} attendees • ${booking.totalAmount.toLocaleString()}
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditBooking(booking);
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
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelBooking(booking);
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
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredBookings.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '48px',
                      color: colors.text.secondary,
                      fontSize: '18px',
                    }}>
                      {searchTerm || filterStatus !== 'all' || filterSpace !== 'all' || filterDateRange !== 'all'
                        ? 'No bookings found matching your filters.'
                        : 'No bookings found. Create your first booking to get started.'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setEditingBooking(null);
            resetBookingForm();
          }}
          booking={editingBooking}
          formData={bookingForm}
          onFormChange={setBookingForm}
          onSave={editingBooking ? handleUpdateBooking : handleSaveBooking}
          loading={loading}
        />
      )}

      {showBookingDetails && selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          isOpen={showBookingDetails}
          onClose={() => {
            setShowBookingDetails(false);
            setSelectedBooking(null);
          }}
          onUpdate={(updatedBooking) => {
            setBookings(bookings.map(b => b.id === updatedBooking.id ? updatedBooking : b));
          }}
        />
      )}



      {showBlockModal && (
        <CalendarBlockModal
          isOpen={showBlockModal}
          onClose={() => setShowBlockModal(false)}
          onSave={async (blockData) => {
            try {
              // Ensure required fields are present
              if (!blockData.date || !blockData.reason || !blockData.type) {
                alert('Please fill in all required fields');
                return;
              }
              
              const createData = {
                date: blockData.date,
                startDate: blockData.startDate,
                endDate: blockData.endDate,
                type: blockData.type,
                spaces: blockData.spaces,
                reason: blockData.reason,
                description: blockData.description,
                isRecurring: blockData.isRecurring,
                recurringPattern: blockData.recurringPattern,
                createdBy: blockData.createdBy || 'Current User',
              };
              
              const response = await calendarBlocksApi.create(createData);
              if (response.data) {
                setCalendarBlocks([...calendarBlocks, response.data]);
                setShowBlockModal(false);
                alert('Calendar blocked successfully!');
              }
            } catch (err) {
              console.error('Error creating calendar block:', err);
              alert('Failed to block calendar');
            }
          }}
        />
      )}
    </div>
  );
} 