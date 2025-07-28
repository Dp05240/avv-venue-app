'use client';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';

interface Booking {
  id: string;
  clientId: number;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  space: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  attendees: number;
  eventType: string;
  notes: string;
  createdAt: string;
  totalAmount: number;
  depositPaid: number;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const sampleClients: Client[] = [
  { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '555-1234' },
  { id: 2, name: 'Beta Events', email: 'info@betaevents.com', phone: '555-5678' },
  { id: 3, name: 'Gamma Group', email: 'hello@gammagroup.com', phone: '555-9012' },
];

const sampleBookings: Booking[] = [
  {
    id: 'BK-2001',
    clientId: 1,
    clientName: 'Acme Corp',
    date: '2024-08-15',
    startTime: '18:00',
    endTime: '23:00',
    space: 'Main Hall',
    status: 'Confirmed',
    attendees: 150,
    eventType: 'Corporate Event',
    notes: 'Annual company dinner with keynote speaker',
    createdAt: '2024-07-01',
    totalAmount: 2500,
    depositPaid: 500,
  },
  {
    id: 'BK-2002',
    clientId: 2,
    clientName: 'Beta Events',
    date: '2024-07-28',
    startTime: '14:00',
    endTime: '22:00',
    space: 'Garden Room',
    status: 'Completed',
    attendees: 80,
    eventType: 'Wedding Reception',
    notes: 'Outdoor wedding reception with catering',
    createdAt: '2024-06-15',
    totalAmount: 1800,
    depositPaid: 1800,
  },
  {
    id: 'BK-2003',
    clientId: 3,
    clientName: 'Gamma Group',
    date: '2024-07-30',
    startTime: '19:00',
    endTime: '23:00',
    space: 'Rooftop',
    status: 'Pending',
    attendees: 60,
    eventType: 'Product Launch',
    notes: 'Tech product launch with demo stations',
    createdAt: '2024-07-10',
    totalAmount: 1200,
    depositPaid: 0,
  },
];

const spaces = ['Main Hall', 'Garden Room', 'Rooftop', 'Conference Room A', 'Conference Room B', 'Outdoor Terrace'];
const eventTypes = ['Corporate Event', 'Wedding', 'Birthday Party', 'Product Launch', 'Conference', 'Trade Show', 'Other'];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [showEditBooking, setShowEditBooking] = useState<Booking | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'>('all');
  const [filterSpace, setFilterSpace] = useState('all');

  const [bookingForm, setBookingForm] = useState<Omit<Booking, 'id' | 'clientName' | 'createdAt'>>({
    clientId: sampleClients[0]?.id || 1,
    date: '',
    startTime: '',
    endTime: '',
    space: spaces[0],
    status: 'Pending',
    attendees: 0,
    eventType: eventTypes[0],
    notes: '',
    totalAmount: 0,
    depositPaid: 0,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  function handleAddBooking() {
    setShowAddBooking(true);
    setBookingForm({
      clientId: sampleClients[0]?.id || 1,
      date: '',
      startTime: '',
      endTime: '',
      space: spaces[0],
      status: 'Pending',
      attendees: 0,
      eventType: eventTypes[0],
      notes: '',
      totalAmount: 0,
      depositPaid: 0,
    });
    setFormErrors({});
  }

  function handleEditBooking(booking: Booking) {
    setShowEditBooking(booking);
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
    });
    setFormErrors({});
  }

  function handleDeleteBooking(booking: Booking) {
    setShowDeleteConfirm(booking);
  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {};
    if (!bookingForm.date) errors.date = 'Date is required';
    if (!bookingForm.startTime) errors.startTime = 'Start time is required';
    if (!bookingForm.endTime) errors.endTime = 'End time is required';
    if (bookingForm.attendees <= 0) errors.attendees = 'Number of attendees must be greater than 0';
    if (bookingForm.totalAmount < 0) errors.totalAmount = 'Total amount cannot be negative';
    if (bookingForm.depositPaid < 0) errors.depositPaid = 'Deposit cannot be negative';
    if (bookingForm.depositPaid > bookingForm.totalAmount) errors.depositPaid = 'Deposit cannot exceed total amount';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmitBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedClient = sampleClients.find(c => c.id === bookingForm.clientId);
    
    if (showEditBooking) {
      // Edit existing booking
      setBookings(bookings.map(b => b.id === showEditBooking.id ? {
        ...bookingForm,
        id: b.id,
        clientName: selectedClient?.name || '',
        createdAt: b.createdAt,
      } : b));
      setShowEditBooking(null);
    } else {
      // Add new booking
      const newBooking: Booking = {
        ...bookingForm,
        id: 'BK-' + (2000 + bookings.length + 1),
        clientName: selectedClient?.name || '',
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setBookings([newBooking, ...bookings]);
      setShowAddBooking(false);
    }
  }

  function handleDeleteConfirm() {
    if (showDeleteConfirm) {
      setBookings(bookings.filter(b => b.id !== showDeleteConfirm.id));
      setShowDeleteConfirm(null);
    }
  }

  function handleStatusChange(bookingId: string, newStatus: Booking['status']) {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  }

  // Filter and search
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.space.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSpace = filterSpace === 'all' || booking.space === filterSpace;
    return matchesSearch && matchesStatus && matchesSpace;
  });

  // Dashboard calculations
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const pendingRevenue = bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed').reduce((sum, b) => sum + b.totalAmount - b.depositPaid, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ maxWidth: 1200, margin: '40px auto 0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#232323', marginBottom: 24 }}>Bookings Management</h1>
        
        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 32, flexWrap: 'wrap' }}>
          <div style={{ background: '#e0e7ff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb22', padding: 24, minWidth: 180, flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#232323', fontSize: 18, marginBottom: 6 }}>Total Bookings</div>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#6a82fb' }}>{totalBookings}</div>
          </div>
          <div style={{ background: '#fffbe6', borderRadius: 12, boxShadow: '0 2px 8px #f4b40022', padding: 24, minWidth: 180, flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#232323', fontSize: 18, marginBottom: 6 }}>Confirmed</div>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#34a853' }}>{confirmedBookings}</div>
          </div>
          <div style={{ background: '#ffe6e6', borderRadius: 12, boxShadow: '0 2px 8px #e5393522', padding: 24, minWidth: 180, flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#232323', fontSize: 18, marginBottom: 6 }}>Pending</div>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#f4b400' }}>{pendingBookings}</div>
          </div>
          <div style={{ background: '#e6f7ff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb22', padding: 24, minWidth: 180, flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#232323', fontSize: 18, marginBottom: 6 }}>Pending Revenue</div>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#e53935' }}>${pendingRevenue}</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb11', padding: 20, marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ececec', fontSize: 14 }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ececec', fontSize: 14, minWidth: 120 }}
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
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ececec', fontSize: 14, minWidth: 140 }}
          >
            <option value="all">All Spaces</option>
            {spaces.map(space => <option key={space} value={space}>{space}</option>)}
          </select>
          <button
            onClick={handleAddBooking}
            style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
          >
            + New Booking
          </button>
        </div>

        {/* Bookings List */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#232323', marginBottom: 20 }}>All Bookings</h2>
          {filteredBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
              {searchTerm ? 'No bookings found matching your search.' : 'No bookings yet. Create your first booking to get started!'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredBookings.map(booking => (
                <div key={booking.id} style={{ background: '#f8f9fa', borderRadius: 12, padding: 20, border: '1px solid #ececec' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, color: '#6a82fb', fontSize: 16 }}>{booking.id}</span>
                        <span style={{ fontWeight: 600, color: '#232323', fontSize: 16 }}>{booking.clientName}</span>
                        <span style={{ 
                          color: booking.status === 'Confirmed' ? '#34a853' : 
                                 booking.status === 'Pending' ? '#f4b400' : 
                                 booking.status === 'Completed' ? '#6a82fb' : '#e53935', 
                          fontWeight: 600, 
                          fontSize: 14,
                          background: booking.status === 'Confirmed' ? '#e8f5e8' : 
                                    booking.status === 'Pending' ? '#fffbe6' : 
                                    booking.status === 'Completed' ? '#e0e7ff' : '#ffe6e6',
                          padding: '4px 8px',
                          borderRadius: 6
                        }}>
                          {booking.status}
                        </span>
                      </div>
                      <div style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>
                        <b>{booking.eventType}</b> • {booking.space} • {booking.attendees} attendees
                      </div>
                      <div style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>
                        {booking.date} • {booking.startTime} - {booking.endTime}
                      </div>
                      <div style={{ color: '#666', fontSize: 14 }}>
                        Total: <b>${booking.totalAmount}</b> • Deposit: <b>${booking.depositPaid}</b>
                      </div>
                      {booking.notes && (
                        <div style={{ color: '#666', fontSize: 14, marginTop: 8, fontStyle: 'italic' }}>
                          "{booking.notes}"
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                        style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #ececec', fontSize: 12 }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => handleEditBooking(booking)}
                        style={{ background: '#e0e7ff', color: '#232323', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking)}
                        style={{ background: '#ffe6e6', color: '#e53935', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Booking Modal */}
        {(showAddBooking || showEditBooking) && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(44,62,80,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(31,38,135,0.12)', padding: 32, width: 600, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#6a82fb', marginBottom: 20 }}>
                {showEditBooking ? 'Edit Booking' : 'New Booking'}
              </div>
              <form onSubmit={handleSubmitBooking} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Client *</label>
                    <select
                      value={bookingForm.clientId}
                      onChange={(e) => setBookingForm({ ...bookingForm, clientId: Number(e.target.value) })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 14 }}
                    >
                      {sampleClients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Event Type</label>
                    <select
                      value={bookingForm.eventType}
                      onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 14 }}
                    >
                      {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Date *</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: formErrors.date ? '1px solid #e53935' : '1px solid #ececec', fontSize: 14 }}
                    />
                    {formErrors.date && <div style={{ color: '#e53935', fontSize: 12, marginTop: 4 }}>{formErrors.date}</div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Start Time *</label>
                    <input
                      type="time"
                      value={bookingForm.startTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: formErrors.startTime ? '1px solid #e53935' : '1px solid #ececec', fontSize: 14 }}
                    />
                    {formErrors.startTime && <div style={{ color: '#e53935', fontSize: 12, marginTop: 4 }}>{formErrors.startTime}</div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>End Time *</label>
                    <input
                      type="time"
                      value={bookingForm.endTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: formErrors.endTime ? '1px solid #e53935' : '1px solid #ececec', fontSize: 14 }}
                    />
                    {formErrors.endTime && <div style={{ color: '#e53935', fontSize: 12, marginTop: 4 }}>{formErrors.endTime}</div>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Space</label>
                    <select
                      value={bookingForm.space}
                      onChange={(e) => setBookingForm({ ...bookingForm, space: e.target.value })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 14 }}
                    >
                      {spaces.map(space => <option key={space} value={space}>{space}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Attendees *</label>
                    <input
                      type="number"
                      min="1"
                      value={bookingForm.attendees}
                      onChange={(e) => setBookingForm({ ...bookingForm, attendees: Number(e.target.value) })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: formErrors.attendees ? '1px solid #e53935' : '1px solid #ececec', fontSize: 14 }}
                    />
                    {formErrors.attendees && <div style={{ color: '#e53935', fontSize: 12, marginTop: 4 }}>{formErrors.attendees}</div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Status</label>
                    <select
                      value={bookingForm.status}
                      onChange={(e) => setBookingForm({ ...bookingForm, status: e.target.value as Booking['status'] })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 14 }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Total Amount</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={bookingForm.totalAmount}
                      onChange={(e) => setBookingForm({ ...bookingForm, totalAmount: Number(e.target.value) })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: formErrors.totalAmount ? '1px solid #e53935' : '1px solid #ececec', fontSize: 14 }}
                    />
                    {formErrors.totalAmount && <div style={{ color: '#e53935', fontSize: 12, marginTop: 4 }}>{formErrors.totalAmount}</div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Deposit Paid</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={bookingForm.depositPaid}
                      onChange={(e) => setBookingForm({ ...bookingForm, depositPaid: Number(e.target.value) })}
                      style={{ width: '100%', padding: 10, borderRadius: 8, border: formErrors.depositPaid ? '1px solid #e53935' : '1px solid #ececec', fontSize: 14 }}
                    />
                    {formErrors.depositPaid && <div style={{ color: '#e53935', fontSize: 12, marginTop: 4 }}>{formErrors.depositPaid}</div>}
                  </div>
                </div>

                <div>
                  <label style={{ fontWeight: 600, color: '#232323', marginBottom: 4, display: 'block' }}>Notes</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    rows={3}
                    style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ececec', fontSize: 14 }}
                    placeholder="Additional notes about this booking..."
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button type="submit" style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', flex: 1 }}>
                    {showEditBooking ? 'Update Booking' : 'Create Booking'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAddBooking(false); setShowEditBooking(null); }}
                    style={{ background: '#ececec', color: '#232323', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(44,62,80,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(31,38,135,0.12)', padding: 32, width: 400, maxWidth: '95vw', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#e53935', marginBottom: 12 }}>Delete Booking</div>
              <div style={{ color: '#444', fontSize: 16, marginBottom: 24 }}>
                Are you sure you want to delete booking <b>{showDeleteConfirm.id}</b> for <b>{showDeleteConfirm.clientName}</b>? This action cannot be undone.
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={handleDeleteConfirm}
                  style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', flex: 1 }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  style={{ background: '#ececec', color: '#232323', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 