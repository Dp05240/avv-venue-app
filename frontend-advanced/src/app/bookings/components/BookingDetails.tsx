'use client';

import { useState } from 'react';
import { bookingsApi, apiUtils } from '../../../services/api';
import type { Booking } from '../../../services/api';

interface BookingDetailsProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (booking: Booking) => void;
}

export default function BookingDetails({ booking, isOpen, onClose, onUpdate }: BookingDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [showDateChangeForm, setShowDateChangeForm] = useState(false);
  const [showSpaceChangeForm, setShowSpaceChangeForm] = useState(false);
  const [showCancellationForm, setShowCancellationForm] = useState(false);
  
  // Date change form state
  const [dateChangeData, setDateChangeData] = useState({
    newDate: booking.date,
    newStartTime: booking.startTime,
    newEndTime: booking.endTime,
    reason: '',
    notes: '',
    notifyClient: true
  });

  // Space change form state
  const [spaceChangeData, setSpaceChangeData] = useState({
    newSpace: booking.space,
    reason: '',
    notes: '',
    notifyClient: true,
    checkAvailability: true
  });

  // Cancellation form state
  const [cancellationData, setCancellationData] = useState({
    reason: '',
    refundMethod: 'full' as 'full' | 'partial' | 'none',
    refundAmount: booking.depositPaid,
    notes: '',
    cancellationFee: 0
  });

  const handleStatusChange = async (newStatus: Booking['status']) => {
    setLoading(true);
    try {
      const response = await bookingsApi.update(booking.id, { status: newStatus });
      if (response.data) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleDateChange = async () => {
    if (!dateChangeData.reason.trim()) {
      alert('Please provide a reason for the date change');
      return;
    }

    setLoading(true);
    try {
      const response = await bookingsApi.changeDate(booking.id, dateChangeData);
      if (response.data) {
        onUpdate(response.data);
        setShowDateChangeForm(false);
        alert('Booking date changed successfully!');
      } else if (response.error) {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error('Failed to change booking date:', error);
      alert('Failed to change booking date');
    } finally {
      setLoading(false);
    }
  };

  const handleSpaceChange = async () => {
    if (!spaceChangeData.reason.trim()) {
      alert('Please provide a reason for the space change');
      return;
    }

    setLoading(true);
    try {
      const response = await bookingsApi.changeSpace(booking.id, spaceChangeData);
      if (response.data) {
        onUpdate(response.data);
        setShowSpaceChangeForm(false);
        alert('Booking space changed successfully!');
      } else if (response.error) {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error('Failed to change booking space:', error);
      alert('Failed to change booking space');
    } finally {
      setLoading(false);
    }
  };

  const handleCancellation = async () => {
    if (!cancellationData.reason.trim()) {
      alert('Please provide a cancellation reason');
      return;
    }

    setLoading(true);
    try {
      const response = await bookingsApi.cancel(booking.id, cancellationData);
      if (response.data) {
        onUpdate(response.data);
        setShowCancellationForm(false);
        alert('Booking cancelled successfully!');
      } else if (response.error) {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  const calculateCancellationFee = () => {
    const daysUntilEvent = Math.ceil((new Date(booking.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const totalPaid = booking.depositPaid;
    
    if (daysUntilEvent > 30) return 0;
    if (daysUntilEvent > 14) return totalPaid * 0.1;
    if (daysUntilEvent > 7) return totalPaid * 0.25;
    if (daysUntilEvent > 3) return totalPaid * 0.5;
    return totalPaid;
  };

  const getSpaceCapacity = (space: string): number => {
    const capacities: Record<string, number> = {
      'Main Hall': 500,
      'Garden Room': 150,
      'Rooftop': 200,
      'Conference Room': 50,
      'Ballroom': 300,
      'Outdoor Pavilion': 400,
      'VIP Lounge': 30,
      'Meeting Room A': 20,
      'Meeting Room B': 20,
      'Exhibition Hall': 800,
    };
    return capacities[space] || 0;
  };

  const getStatusColor = (status: string) => {
    return apiUtils.getStatusColor(status);
  };

  const getStatusBackgroundColor = (status: string) => {
    return apiUtils.getStatusBackgroundColor(status);
  };

  const formatDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    return `${diffMinutes}m`;
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '32px',
        maxWidth: 700,
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
        }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#333', margin: '0 0 8px 0' }}>
              {booking.eventType}
            </h2>
            <div style={{ fontSize: 18, color: '#666' }}>
              Booking #{booking.id}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: '#666',
              padding: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Status Badge */}
        <div style={{ marginBottom: 24 }}>
          <span style={{
            background: getStatusBackgroundColor(booking.status),
            color: getStatusColor(booking.status),
            padding: '8px 16px',
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 600,
            display: 'inline-block',
          }}>
            {booking.status}
          </span>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Left Column */}
          <div>
            {/* Client Information */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 12 }}>
                Client Information
              </h3>
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: '16px',
              }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                  {booking.clientName}
                </div>
                <div style={{ color: '#666', fontSize: 14 }}>
                  Client ID: {booking.clientId}
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 12 }}>
                Event Details
              </h3>
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: '16px',
              }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Event Type:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>{booking.eventType}</span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Attendees:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>{booking.attendees} people</span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Space:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>{booking.space}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: '#333' }}>Duration:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>
                    {formatDuration(booking.startTime, booking.endTime)}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 12 }}>
                Financial Information
              </h3>
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: '16px',
              }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Total Amount:</span>
                  <span style={{ marginLeft: 8, color: '#666', fontSize: 16 }}>
                    {apiUtils.formatCurrency(booking.totalAmount)}
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Deposit Paid:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>
                    {apiUtils.formatCurrency(booking.depositPaid)}
                  </span>
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: '#e8f5e8',
                  borderRadius: 6,
                  marginTop: 8,
                }}>
                  <span style={{ fontWeight: 600, color: '#1a7f5a' }}>Balance Due:</span>
                  <span style={{ marginLeft: 8, color: '#1a7f5a', fontSize: 16 }}>
                    {apiUtils.formatCurrency(booking.totalAmount - booking.depositPaid)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Date & Time */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 12 }}>
                Date & Time
              </h3>
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: '16px',
              }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Date:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>
                    {apiUtils.formatDate(booking.date)}
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Start Time:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>{booking.startTime}</span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>End Time:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>{booking.endTime}</span>
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: '#e0e7ff',
                  borderRadius: 6,
                  marginTop: 8,
                }}>
                  <span style={{ fontWeight: 600, color: '#6a82fb' }}>
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {booking.notes && (
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 12 }}>
                  Notes
                </h3>
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: 8,
                  padding: '16px',
                  whiteSpace: 'pre-wrap',
                  color: '#666',
                  lineHeight: 1.5,
                }}>
                  {booking.notes}
                </div>
              </div>
            )}

            {/* Booking Information */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 12 }}>
                Booking Information
              </h3>
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: '16px',
              }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Created:</span>
                  <span style={{ marginLeft: 8, color: '#666' }}>
                    {apiUtils.formatDate(booking.createdAt)}
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Booking ID:</span>
                  <span style={{ marginLeft: 8, color: '#666', fontFamily: 'monospace' }}>
                    {booking.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          marginTop: 24,
          paddingTop: 20,
          borderTop: '1px solid #e5e7eb',
          flexWrap: 'wrap'
        }}>
          {/* Change Date Button */}
          {booking.status !== 'Cancelled' && (
            <button
              onClick={() => setShowDateChangeForm(true)}
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: '1px solid #f59e0b',
                background: '#fff',
                color: '#f59e0b',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              📅 Change Date
            </button>
          )}

          {/* Change Space Button */}
          {booking.status !== 'Cancelled' && (
            <button
              onClick={() => setShowSpaceChangeForm(true)}
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: '1px solid #8b5cf6',
                background: '#fff',
                color: '#8b5cf6',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              🏢 Change Space
            </button>
          )}

          {/* Cancel Booking Button */}
          {booking.status !== 'Cancelled' && (
            <button
              onClick={() => setShowCancellationForm(true)}
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: '1px solid #ef4444',
                background: '#fff',
                color: '#ef4444',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              ❌ Cancel Booking
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              background: '#fff',
              color: '#666',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            Close
          </button>
        </div>



        {/* Date Change Form */}
        {showDateChangeForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
          }}>
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '24px',
              maxWidth: 500,
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#333' }}>
                  Change Booking Date
                </h3>
                <button
                  onClick={() => setShowDateChangeForm(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 24,
                    cursor: 'pointer',
                    color: '#666',
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Current Booking</h4>
                  <p style={{ margin: 0, color: '#666' }}>
                    {booking.eventType} • {booking.clientName}
                  </p>
                  <p style={{ margin: '4px 0 0 0', color: '#666' }}>
                    {apiUtils.formatDate(booking.date)} • {booking.startTime} - {booking.endTime} • {booking.space}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                      New Date *
                    </label>
                    <input
                      type="date"
                      value={dateChangeData.newDate}
                      onChange={(e) => setDateChangeData({...dateChangeData, newDate: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                        fontSize: 14,
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                      Start Time *
                    </label>
                    <input
                      type="time"
                      value={dateChangeData.newStartTime}
                      onChange={(e) => setDateChangeData({...dateChangeData, newStartTime: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                        fontSize: 14,
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                      End Time *
                    </label>
                    <input
                      type="time"
                      value={dateChangeData.newEndTime}
                      onChange={(e) => setDateChangeData({...dateChangeData, newEndTime: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    Reason for Date Change *
                  </label>
                  <select
                    value={dateChangeData.reason}
                    onChange={(e) => setDateChangeData({...dateChangeData, reason: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      fontSize: 14,
                    }}
                  >
                    <option value="">Select a reason</option>
                    <option value="Client Request">Client Request</option>
                    <option value="Weather Conditions">Weather Conditions</option>
                    <option value="Venue Maintenance">Venue Maintenance</option>
                    <option value="Scheduling Conflict">Scheduling Conflict</option>
                    <option value="Event Postponement">Event Postponement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    Additional Notes
                  </label>
                  <textarea
                    value={dateChangeData.notes}
                    onChange={(e) => setDateChangeData({...dateChangeData, notes: e.target.value})}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      fontSize: 14,
                      resize: 'vertical',
                    }}
                    placeholder="Any additional notes about the date change..."
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <input
                    type="checkbox"
                    checked={dateChangeData.notifyClient}
                    onChange={(e) => setDateChangeData({...dateChangeData, notifyClient: e.target.checked})}
                    style={{ marginRight: 8 }}
                  />
                  <span style={{ fontSize: 14 }}>Notify client about the date change via email</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowDateChangeForm(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 6,
                    border: '1px solid #d1d5db',
                    background: '#fff',
                    color: '#666',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDateChange}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#f59e0b',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Updating...' : 'Confirm Date Change'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Space Change Form */}
        {showSpaceChangeForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
          }}>
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '24px',
              maxWidth: 500,
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#333' }}>
                  Change Booking Space
                </h3>
                <button
                  onClick={() => setShowSpaceChangeForm(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 24,
                    cursor: 'pointer',
                    color: '#666',
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Current Booking</h4>
                  <p style={{ margin: 0, color: '#666' }}>
                    {booking.eventType} • {booking.clientName}
                  </p>
                  <p style={{ margin: '4px 0 0 0', color: '#666' }}>
                    {apiUtils.formatDate(booking.date)} • {booking.startTime} - {booking.endTime}
                  </p>
                  <p style={{ margin: '4px 0 0 0', color: '#666' }}>
                    Current Space: {booking.space} (Capacity: {getSpaceCapacity(booking.space)}) • Attendees: {booking.attendees}
                  </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    New Space *
                  </label>
                  <select
                    value={spaceChangeData.newSpace}
                    onChange={(e) => setSpaceChangeData({...spaceChangeData, newSpace: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      fontSize: 14,
                    }}
                  >
                    <option value="Main Hall">Main Hall (Capacity: 500)</option>
                    <option value="Garden Room">Garden Room (Capacity: 150)</option>
                    <option value="Rooftop">Rooftop (Capacity: 200)</option>
                    <option value="Conference Room">Conference Room (Capacity: 50)</option>
                    <option value="Ballroom">Ballroom (Capacity: 300)</option>
                    <option value="Outdoor Pavilion">Outdoor Pavilion (Capacity: 400)</option>
                    <option value="VIP Lounge">VIP Lounge (Capacity: 30)</option>
                    <option value="Meeting Room A">Meeting Room A (Capacity: 20)</option>
                    <option value="Meeting Room B">Meeting Room B (Capacity: 20)</option>
                    <option value="Exhibition Hall">Exhibition Hall (Capacity: 800)</option>
                  </select>
                  
                  {spaceChangeData.newSpace !== booking.space && (
                    <div style={{ marginTop: 8, padding: 8, background: '#f0f9ff', borderRadius: 4 }}>
                      <p style={{ margin: 0, fontSize: 12, color: '#0369a1' }}>
                        New capacity: {getSpaceCapacity(spaceChangeData.newSpace)} people
                        {booking.attendees > getSpaceCapacity(spaceChangeData.newSpace) && (
                          <span style={{ color: '#dc2626', fontWeight: 600 }}> ⚠️ Warning: Capacity may be insufficient</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    Reason for Space Change *
                  </label>
                  <select
                    value={spaceChangeData.reason}
                    onChange={(e) => setSpaceChangeData({...spaceChangeData, reason: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      fontSize: 14,
                    }}
                  >
                    <option value="">Select a reason</option>
                    <option value="Client Request">Client Request</option>
                    <option value="Capacity Requirements">Capacity Requirements</option>
                    <option value="Space Maintenance">Space Maintenance</option>
                    <option value="Better Suited Space">Better Suited Space</option>
                    <option value="Scheduling Conflict">Scheduling Conflict</option>
                    <option value="Weather Conditions">Weather Conditions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    Additional Notes
                  </label>
                  <textarea
                    value={spaceChangeData.notes}
                    onChange={(e) => setSpaceChangeData({...spaceChangeData, notes: e.target.value})}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      fontSize: 14,
                      resize: 'vertical',
                    }}
                    placeholder="Any additional notes about the space change..."
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <input
                    type="checkbox"
                    checked={spaceChangeData.notifyClient}
                    onChange={(e) => setSpaceChangeData({...spaceChangeData, notifyClient: e.target.checked})}
                    style={{ marginRight: 8 }}
                  />
                  <span style={{ fontSize: 14 }}>Notify client about the space change via email</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowSpaceChangeForm(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 6,
                    border: '1px solid #d1d5db',
                    background: '#fff',
                    color: '#666',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSpaceChange}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#8b5cf6',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Updating...' : 'Confirm Space Change'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Form */}
        {showCancellationForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
          }}>
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '24px',
              maxWidth: 500,
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#333' }}>
                  Cancel Booking
                </h3>
                <button
                  onClick={() => setShowCancellationForm(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 24,
                    cursor: 'pointer',
                    color: '#666',
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Booking Details</h4>
                  <p style={{ margin: 0, color: '#666' }}>
                    {booking.eventType} • {booking.clientName}
                  </p>
                  <p style={{ margin: '4px 0 0 0', color: '#666' }}>
                    {apiUtils.formatDate(booking.date)} • {booking.startTime} - {booking.endTime} • {booking.space}
                  </p>
                  <p style={{ margin: '4px 0 0 0', color: '#666' }}>
                    Total Amount: {apiUtils.formatCurrency(booking.totalAmount)} • Deposit Paid: {apiUtils.formatCurrency(booking.depositPaid)}
                  </p>
                </div>

                <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: 8, padding: 12, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#92400e' }}>Cancellation Policy</h4>
                  <p style={{ margin: 0, fontSize: 12, color: '#92400e' }}>
                    {(() => {
                      const daysUntilEvent = Math.ceil((new Date(booking.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                      if (daysUntilEvent > 30) return 'Full refund available';
                      if (daysUntilEvent > 14) return '10% cancellation fee applies';
                      if (daysUntilEvent > 7) return '25% cancellation fee applies';
                      if (daysUntilEvent > 3) return '50% cancellation fee applies';
                      return 'No refund available - less than 4 days until event';
                    })()}
                  </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    Cancellation Reason *
                  </label>
                  <select
                    value={cancellationData.reason}
                    onChange={(e) => setCancellationData({...cancellationData, reason: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      fontSize: 14,
                    }}
                  >
                    <option value="">Select a reason</option>
                    <option value="Client Request">Client Request</option>
                    <option value="Weather Conditions">Weather Conditions</option>
                    <option value="Venue Unavailable">Venue Unavailable</option>
                    <option value="Technical Issues">Technical Issues</option>
                    <option value="Force Majeure">Force Majeure</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    Refund Method
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="refundMethod"
                        value="full"
                        checked={cancellationData.refundMethod === 'full'}
                        onChange={() => {
                          const fee = calculateCancellationFee();
                          setCancellationData({
                            ...cancellationData,
                            refundMethod: 'full',
                            refundAmount: booking.depositPaid - fee,
                            cancellationFee: fee
                          });
                        }}
                        style={{ marginRight: 8 }}
                      />
                      <span style={{ fontSize: 14 }}>Full Refund (minus cancellation fee)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="refundMethod"
                        value="partial"
                        checked={cancellationData.refundMethod === 'partial'}
                        onChange={() => {
                          setCancellationData({
                            ...cancellationData,
                            refundMethod: 'partial',
                            refundAmount: booking.depositPaid * 0.5,
                            cancellationFee: booking.depositPaid * 0.5
                          });
                        }}
                        style={{ marginRight: 8 }}
                      />
                      <span style={{ fontSize: 14 }}>Partial Refund (50%)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="refundMethod"
                        value="none"
                        checked={cancellationData.refundMethod === 'none'}
                        onChange={() => {
                          setCancellationData({
                            ...cancellationData,
                            refundMethod: 'none',
                            refundAmount: 0,
                            cancellationFee: booking.depositPaid
                          });
                        }}
                        style={{ marginRight: 8 }}
                      />
                      <span style={{ fontSize: 14 }}>No Refund</span>
                    </label>
                  </div>
                </div>

                <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 12, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Refund Summary</h4>
                  <div style={{ fontSize: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span>Deposit Paid:</span>
                      <span>{apiUtils.formatCurrency(booking.depositPaid)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span>Cancellation Fee:</span>
                      <span style={{ color: '#dc2626' }}>-{apiUtils.formatCurrency(cancellationData.cancellationFee)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, borderTop: '1px solid #d1d5db', paddingTop: 4 }}>
                      <span>Refund Amount:</span>
                      <span style={{ color: '#059669' }}>{apiUtils.formatCurrency(cancellationData.refundAmount)}</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    Additional Notes
                  </label>
                  <textarea
                    value={cancellationData.notes}
                    onChange={(e) => setCancellationData({...cancellationData, notes: e.target.value})}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      fontSize: 14,
                      resize: 'vertical',
                    }}
                    placeholder="Any additional notes about the cancellation..."
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowCancellationForm(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 6,
                    border: '1px solid #d1d5db',
                    background: '#fff',
                    color: '#666',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancellation}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 