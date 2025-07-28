'use client';

import React, { useState, useEffect } from 'react';
import type { Booking } from '../../../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking | null;
  formData: any;
  onFormChange: (data: any) => void;
  onSave: () => void;
  loading: boolean;
}

// Enhanced form data structure with multi-day support
interface EnhancedBookingForm {
  // Basic Information
  clientId: number;
  eventType: string;
  attendees: number;
  
  // Multi-day booking support
  isMultiDay: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  space: string;
  
  // Financial Information
  totalAmount: number;
  depositPaid: number;
  hourlyRate: number;
  
  // Event Details
  eventName: string;
  eventDescription: string;
  setupTime: string;
  cleanupTime: string;
  
  // Services & Add-ons
  catering: boolean;
  audioVisual: boolean;
  decorations: boolean;
  security: boolean;
  parking: boolean;
  cleaning: boolean;
  
  // Contact Information
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  emergencyContact: string;
  
  // Requirements & Notes
  specialRequirements: string;
  notes: string;
  
  // Legal & Compliance
  insurance: boolean;
  contractSigned: boolean;
  depositReceived: boolean;
  termsAccepted: boolean;
  
  // Status
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

const eventTypes = [
  'Corporate Event',
  'Wedding',
  'Birthday Party',
  'Conference',
  'Product Launch',
  'Exhibition',
  'Workshop',
  'Concert',
  'Private Party',
  'Multi-Day Event',
  'Other'
];

const spaces = [
  'Main Hall',
  'Garden Room',
  'Rooftop',
  'Conference Room A',
  'Conference Room B',
  'Outdoor Space',
  'VIP Lounge'
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
];

// Sample clients for demo
const sampleClients = [
  { id: 1, name: 'John Smith', email: 'john@acmecorp.com', company: 'Acme Corporation' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@techstartup.com', company: 'Tech Startup Inc' },
  { id: 3, name: 'Michael Brown', email: 'michael@eventpro.com', company: 'Event Professionals LLC' },
  { id: 4, name: 'Emily Davis', email: 'emily@weddingplanners.com', company: 'Wedding Planners Co' },
  { id: 5, name: 'David Wilson', email: 'david@corporateevents.com', company: 'Corporate Events Ltd' },
];

export default function BookingModal({ 
  isOpen, 
  onClose, 
  booking, 
  formData, 
  onFormChange, 
  onSave, 
  loading 
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const totalSteps = 3; // Reduced from 4 to 3 steps

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormErrors({});
    }
  }, [isOpen]);

  function validateStep(step: number): boolean {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1: // Basic Information
        if (!formData.clientId) errors.clientId = 'Please select a client';
        if (!formData.eventType) errors.eventType = 'Please select an event type';
        if (!formData.attendees || formData.attendees <= 0) errors.attendees = 'Please enter number of attendees';
        if (!formData.startDate) errors.startDate = 'Please select start date';
        if (formData.isMultiDay && !formData.endDate) errors.endDate = 'Please select end date';
        if (!formData.startTime) errors.startTime = 'Please select start time';
        if (!formData.endTime) errors.endTime = 'Please select end time';
        if (!formData.space) errors.space = 'Please select a space';
        break;

      case 2: // Event Details & Contact
        if (!formData.eventName) errors.eventName = 'Please enter event name';
        if (!formData.contactPerson) errors.contactPerson = 'Please enter contact person';
        if (!formData.contactPhone) errors.contactPhone = 'Please enter contact phone';
        if (!formData.contactEmail) errors.contactEmail = 'Please enter contact email';
        break;

      case 3: // Pricing & Confirmation
        if (!formData.totalAmount || formData.totalAmount <= 0) errors.totalAmount = 'Please enter total amount';
        if (formData.depositPaid > formData.totalAmount) errors.depositPaid = 'Deposit cannot exceed total amount';
        if (!formData.termsAccepted) errors.termsAccepted = 'Please accept terms and conditions';
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  }

  function handlePrevious() {
    setCurrentStep(Math.max(currentStep - 1, 1));
  }

  function handleSave() {
    if (validateStep(currentStep)) {
      onSave();
    }
  }

  function calculateDuration() {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      const diffMs = end.getTime() - start.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHours}h ${diffMinutes}m`;
    }
    return '';
  }

  function calculateTotalDays() {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays + 1; // Include both start and end dates
    }
    return 1;
  }

  function calculateTotalAmount() {
    let total = 0;
    
    // Base rate calculation
    if (formData.hourlyRate && formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const dailyRate = formData.hourlyRate * diffHours;
      const totalDays = calculateTotalDays();
      total += dailyRate * totalDays;
    }

    // Add-ons
    if (formData.catering) total += 500 * calculateTotalDays();
    if (formData.audioVisual) total += 300 * calculateTotalDays();
    if (formData.decorations) total += 200 * calculateTotalDays();
    if (formData.security) total += 400 * calculateTotalDays();
    if (formData.parking) total += 100 * calculateTotalDays();
    if (formData.cleaning) total += 150 * calculateTotalDays();

    return total;
  }

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
      padding: '20px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        maxWidth: '700px', // Reduced from 800px
        width: '100%',
        maxHeight: '85vh', // Reduced from 90vh
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', // Reduced padding
          borderBottom: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#fff',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0, marginBottom: '4px' }}>
                {booking ? 'Edit Booking' : 'New Booking'}
              </h2>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Step {currentStep} of {totalSteps}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px', // Reduced size
                height: '32px',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}>
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: '20px', // Reduced size
                    height: '20px',
                    borderRadius: '50%',
                    background: i + 1 <= currentStep ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                    color: i + 1 <= currentStep ? '#6366f1' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 600,
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div style={{
              height: '3px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                background: '#fff',
                width: `${(currentStep / totalSteps) * 100}%`,
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Content - Fixed scrolling */}
        <div style={{ 
          padding: '24px', 
          overflowY: 'auto', 
          maxHeight: 'calc(85vh - 120px)', // Fixed height calculation
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9',
        }}>
          {currentStep === 1 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: '#1e293b' }}>
                Basic Information
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Client *
                  </label>
                  <select
                    value={formData.clientId || ''}
                    onChange={(e) => onFormChange({ ...formData, clientId: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.clientId ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="">Select a client</option>
                    {sampleClients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} - {client.company}
                      </option>
                    ))}
                  </select>
                  {formErrors.clientId && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.clientId}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Event Type *
                  </label>
                  <select
                    value={formData.eventType || ''}
                    onChange={(e) => onFormChange({ ...formData, eventType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.eventType ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formErrors.eventType && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.eventType}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Attendees *
                  </label>
                  <input
                    type="number"
                    value={formData.attendees || ''}
                    onChange={(e) => onFormChange({ ...formData, attendees: parseInt(e.target.value) || 0 })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.attendees ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                    min="1"
                  />
                  {formErrors.attendees && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.attendees}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Space *
                  </label>
                  <select
                    value={formData.space || ''}
                    onChange={(e) => onFormChange({ ...formData, space: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.space ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="">Select a space</option>
                    {spaces.map(space => (
                      <option key={space} value={space}>{space}</option>
                    ))}
                  </select>
                  {formErrors.space && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.space}
                    </div>
                  )}
                </div>

                {/* Multi-day booking toggle */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '12px' }}>
                    <input
                      type="checkbox"
                      checked={formData.isMultiDay || false}
                      onChange={(e) => onFormChange({ 
                        ...formData, 
                        isMultiDay: e.target.checked,
                        endDate: e.target.checked ? formData.endDate : formData.startDate
                      })}
                      style={{ marginRight: '8px', width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                      Multi-day event
                    </span>
                  </label>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => onFormChange({ 
                      ...formData, 
                      startDate: e.target.value,
                      endDate: formData.isMultiDay ? formData.endDate : e.target.value
                    })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.startDate ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {formErrors.startDate && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.startDate}
                    </div>
                  )}
                </div>

                {formData.isMultiDay && (
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={formData.endDate || ''}
                      onChange={(e) => onFormChange({ ...formData, endDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: formErrors.endDate ? '1px solid #ef4444' : '1px solid #d1d5db',
                        fontSize: '14px',
                      }}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                    />
                    {formErrors.endDate && (
                      <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                        {formErrors.endDate}
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Start Time *
                  </label>
                  <select
                    value={formData.startTime || ''}
                    onChange={(e) => onFormChange({ ...formData, startTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.startTime ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="">Select start time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {formErrors.startTime && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.startTime}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    End Time *
                  </label>
                  <select
                    value={formData.endTime || ''}
                    onChange={(e) => onFormChange({ ...formData, endTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.endTime ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="">Select end time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {formErrors.endTime && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.endTime}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Duration
                  </label>
                  <div style={{
                    padding: '10px',
                    background: '#f8fafc',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    fontSize: '14px',
                    color: '#64748b',
                  }}>
                    {calculateDuration() || 'Select start and end times'}
                    {formData.isMultiDay && ` • ${calculateTotalDays()} day(s)`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: '#1e293b' }}>
                Event Details & Contact Information
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Event Name *
                  </label>
                  <input
                    type="text"
                    value={formData.eventName || ''}
                    onChange={(e) => onFormChange({ ...formData, eventName: e.target.value })}
                    placeholder="Enter event name"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.eventName ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                  />
                  {formErrors.eventName && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.eventName}
                    </div>
                  )}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Event Description
                  </label>
                  <textarea
                    value={formData.eventDescription || ''}
                    onChange={(e) => onFormChange({ ...formData, eventDescription: e.target.value })}
                    placeholder="Describe the event..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson || ''}
                    onChange={(e) => onFormChange({ ...formData, contactPerson: e.target.value })}
                    placeholder="Full name"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.contactPerson ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                  />
                  {formErrors.contactPerson && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.contactPerson}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone || ''}
                    onChange={(e) => onFormChange({ ...formData, contactPhone: e.target.value })}
                    placeholder="Phone number"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.contactPhone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                  />
                  {formErrors.contactPhone && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.contactPhone}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail || ''}
                    onChange={(e) => onFormChange({ ...formData, contactEmail: e.target.value })}
                    placeholder="Email address"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.contactEmail ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                  />
                  {formErrors.contactEmail && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.contactEmail}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact || ''}
                    onChange={(e) => onFormChange({ ...formData, emergencyContact: e.target.value })}
                    placeholder="Emergency contact"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Setup Time
                  </label>
                  <select
                    value={formData.setupTime || '30'}
                    onChange={(e) => onFormChange({ ...formData, setupTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="0">No setup time</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Cleanup Time
                  </label>
                  <select
                    value={formData.cleanupTime || '30'}
                    onChange={(e) => onFormChange({ ...formData, cleanupTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="0">No cleanup time</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: '#1e293b' }}>
                Pricing & Confirmation
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    value={formData.hourlyRate || ''}
                    onChange={(e) => onFormChange({ ...formData, hourlyRate: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Total Amount ($) *
                  </label>
                  <input
                    type="number"
                    value={formData.totalAmount || ''}
                    onChange={(e) => onFormChange({ ...formData, totalAmount: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.totalAmount ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                    min="0"
                    step="0.01"
                  />
                  {formErrors.totalAmount && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.totalAmount}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Deposit Paid ($)
                  </label>
                  <input
                    type="number"
                    value={formData.depositPaid || ''}
                    onChange={(e) => onFormChange({ ...formData, depositPaid: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: formErrors.depositPaid ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '14px',
                    }}
                    min="0"
                    step="0.01"
                  />
                  {formErrors.depositPaid && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.depositPaid}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                    Balance Due
                  </label>
                  <div style={{
                    padding: '10px',
                    background: '#f8fafc',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    fontSize: '14px',
                    color: '#64748b',
                    fontWeight: 600,
                  }}>
                    ${((formData.totalAmount || 0) - (formData.depositPaid || 0)).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Services & Add-ons */}
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#1e293b' }}>
                  Additional Services
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {[
                    { key: 'catering', label: 'Catering', price: 500 },
                    { key: 'audioVisual', label: 'Audio/Visual', price: 300 },
                    { key: 'decorations', label: 'Decorations', price: 200 },
                    { key: 'security', label: 'Security', price: 400 },
                    { key: 'parking', label: 'Parking', price: 100 },
                    { key: 'cleaning', label: 'Cleaning', price: 150 },
                  ].map(service => (
                    <label
                      key={service.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: formData[service.key] ? '#f0f9ff' : '#fff',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData[service.key] || false}
                        onChange={(e) => onFormChange({ ...formData, [service.key]: e.target.checked })}
                        style={{ marginRight: '8px', width: '16px', height: '16px' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '13px' }}>
                          {service.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          ${service.price}/day
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Requirements */}
              <div style={{ marginTop: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px', color: '#374151' }}>
                  Special Requirements
                </label>
                <textarea
                  value={formData.specialRequirements || ''}
                  onChange={(e) => onFormChange({ ...formData, specialRequirements: e.target.value })}
                  placeholder="Any special requirements or requests..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Terms and Conditions */}
              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted || false}
                    onChange={(e) => onFormChange({ ...formData, termsAccepted: e.target.checked })}
                    style={{ marginRight: '8px', marginTop: '2px', width: '16px', height: '16px' }}
                  />
                  <div style={{ fontSize: '13px', color: '#374151' }}>
                    I agree to the{' '}
                    <span style={{ color: '#6366f1', textDecoration: 'underline', cursor: 'pointer' }}>
                      terms and conditions
                    </span>
                    {' '}and{' '}
                    <span style={{ color: '#6366f1', textDecoration: 'underline', cursor: 'pointer' }}>
                      privacy policy
                    </span>
                  </div>
                </label>
                {formErrors.termsAccepted && (
                  <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                    {formErrors.termsAccepted}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            style={{
              padding: '10px 20px',
              background: currentStep === 1 ? '#e2e8f0' : '#fff',
              color: currentStep === 1 ? '#94a3b8' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            Previous
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                background: '#fff',
                color: '#64748b',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                style={{
                  padding: '10px 20px',
                  background: '#6366f1',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  background: loading ? '#94a3b8' : '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Saving...' : (booking ? 'Update Booking' : 'Create Booking')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 