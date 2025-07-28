'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../../components/NavBar';
import { EquipmentAssignment, AssignedEquipment, SetupRequirement } from '../../types';

export default function CreateAssignmentPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<AssignedEquipment[]>([]);
  const [setupRequirements, setSetupRequirements] = useState<SetupRequirement[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const [bookingsResponse, inventoryResponse] = await Promise.all([
      //   bookingsApi.getAll(),
      //   inventoryApi.getItems()
      // ]);

      // Sample data
      const sampleBookings = [
        {
          id: 'booking-001',
          clientName: 'Tech Corp',
          eventTitle: 'Tech Conference 2025',
          date: '2025-01-15',
          startTime: '09:00',
          endTime: '17:00',
          space: 'Main Hall',
          attendees: 200,
          status: 'Confirmed'
        },
        {
          id: 'booking-002',
          clientName: 'Sarah & John',
          eventTitle: 'Wedding Reception',
          date: '2025-01-22',
          startTime: '18:00',
          endTime: '23:00',
          space: 'Garden Room',
          attendees: 120,
          status: 'Confirmed'
        },
        {
          id: 'booking-003',
          clientName: 'Innovation Inc',
          eventTitle: 'Product Launch',
          date: '2025-01-08',
          startTime: '19:00',
          endTime: '22:00',
          space: 'Rooftop',
          attendees: 80,
          status: 'Pending'
        }
      ];

      const sampleInventory = [
        {
          id: 1,
          name: 'Projector',
          sku: 'PROJ-001',
          category: 'Audio/Visual',
          quantity: 5,
          available: 3,
          location: 'Storage A'
        },
        {
          id: 2,
          name: 'Speakers',
          sku: 'SPK-001',
          category: 'Audio/Visual',
          quantity: 10,
          available: 8,
          location: 'Storage A'
        },
        {
          id: 3,
          name: 'Tables',
          sku: 'TBL-001',
          category: 'Furniture',
          quantity: 50,
          available: 45,
          location: 'Storage B'
        },
        {
          id: 4,
          name: 'Chairs',
          sku: 'CHR-001',
          category: 'Furniture',
          quantity: 200,
          available: 180,
          location: 'Storage B'
        },
        {
          id: 5,
          name: 'LED Screens',
          sku: 'LED-001',
          category: 'Audio/Visual',
          quantity: 3,
          available: 2,
          location: 'Storage A'
        }
      ];

      setBookings(sampleBookings);
      setInventoryItems(sampleInventory);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEquipment = () => {
    const newEquipment: AssignedEquipment = {
      id: `eq-${Date.now()}`,
      inventoryItemId: 0,
      itemName: '',
      itemSku: '',
      category: '',
      quantity: 1,
      quantityNeeded: 1,
      location: '',
      setupTime: '',
      teardownTime: '',
      status: 'assigned',
      assignedBy: 'Current User',
      assignedAt: new Date().toISOString().split('T')[0],
      notes: '',
      setupInstructions: '',
      specialRequirements: ''
    };
    setSelectedEquipment([...selectedEquipment, newEquipment]);
  };

  const handleEquipmentChange = (index: number, field: keyof AssignedEquipment, value: any) => {
    const updatedEquipment = [...selectedEquipment];
    updatedEquipment[index] = { ...updatedEquipment[index], [field]: value };
    
    // If item is selected, populate other fields
    if (field === 'inventoryItemId' && value) {
      const item = inventoryItems.find(i => i.id === parseInt(value));
      if (item) {
        updatedEquipment[index] = {
          ...updatedEquipment[index],
          itemName: item.name,
          itemSku: item.sku,
          category: item.category,
          location: item.location
        };
      }
    }
    
    setSelectedEquipment(updatedEquipment);
  };

  const handleRemoveEquipment = (index: number) => {
    setSelectedEquipment(selectedEquipment.filter((_, i) => i !== index));
  };

  const handleAddSetupRequirement = () => {
    const newRequirement: SetupRequirement = {
      id: `req-${Date.now()}`,
      requirement: '',
      priority: 'medium',
      status: 'pending',
      estimatedTime: 30,
      notes: ''
    };
    setSetupRequirements([...setupRequirements, newRequirement]);
  };

  const handleRequirementChange = (index: number, field: keyof SetupRequirement, value: any) => {
    const updatedRequirements = [...setupRequirements];
    updatedRequirements[index] = { ...updatedRequirements[index], [field]: value };
    setSetupRequirements(updatedRequirements);
  };

  const handleRemoveRequirement = (index: number) => {
    setSetupRequirements(setupRequirements.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!selectedBooking || selectedEquipment.length === 0) {
      alert('Please select a booking and add at least one equipment item.');
      return;
    }

    try {
      setSaving(true);
      const booking = bookings.find(b => b.id === selectedBooking);
      
      const newAssignment: EquipmentAssignment = {
        id: `ea-${Date.now()}`,
        bookingId: selectedBooking,
        bookingTitle: booking?.eventTitle || '',
        eventDate: booking?.date || '',
        startTime: booking?.startTime || '',
        endTime: booking?.endTime || '',
        space: booking?.space || '',
        clientName: booking?.clientName || '',
        status: 'pending',
        assignedBy: 'Current User',
        assignedAt: new Date().toISOString().split('T')[0],
        notes,
        equipment: selectedEquipment,
        setupRequirements
      };

      // TODO: Replace with actual API call
      // await equipmentAssignmentApi.create(newAssignment);
      console.log('Creating assignment:', newAssignment);

      // Redirect to assignments list
      window.location.href = '/operations/equipment-assignment/assignments';
    } catch (error) {
      console.error('Error saving assignment:', error);
      alert('Failed to save assignment. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const selectedBookingData = bookings.find(b => b.id === selectedBooking);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>
                  Create Equipment Assignment
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Assign equipment to events and coordinate setup requirements
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a 
                  href="/operations/equipment-assignment/assignments"
                  style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </a>
                <button
                  onClick={handleSave}
                  disabled={saving || !selectedBooking || selectedEquipment.length === 0}
                  style={{
                    background: saving ? '#9ca3af' : '#3b82f6',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: saving ? 'not-allowed' : 'pointer'
                  }}
                >
                  {saving ? 'Saving...' : 'Save Assignment'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Left Column - Booking & Equipment */}
            <div>
              {/* Booking Selection */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                  Select Booking
                </h2>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Choose Event
                  </label>
                  <select
                    value={selectedBooking}
                    onChange={(e) => setSelectedBooking(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="">Select a booking...</option>
                    {bookings.map(booking => (
                      <option key={booking.id} value={booking.id}>
                        {booking.eventTitle} - {booking.clientName} ({booking.date})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedBookingData && (
                  <div style={{ 
                    background: '#f8fafc', 
                    borderRadius: '8px', 
                    padding: '16px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '12px' }}>
                      Booking Details
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                      <div>
                        <span style={{ color: '#666', fontWeight: '500' }}>Event:</span>
                        <div style={{ color: '#232323', fontWeight: '600' }}>{selectedBookingData.eventTitle}</div>
                      </div>
                      <div>
                        <span style={{ color: '#666', fontWeight: '500' }}>Client:</span>
                        <div style={{ color: '#232323', fontWeight: '600' }}>{selectedBookingData.clientName}</div>
                      </div>
                      <div>
                        <span style={{ color: '#666', fontWeight: '500' }}>Date:</span>
                        <div style={{ color: '#232323', fontWeight: '600' }}>{selectedBookingData.date}</div>
                      </div>
                      <div>
                        <span style={{ color: '#666', fontWeight: '500' }}>Time:</span>
                        <div style={{ color: '#232323', fontWeight: '600' }}>
                          {selectedBookingData.startTime} - {selectedBookingData.endTime}
                        </div>
                      </div>
                      <div>
                        <span style={{ color: '#666', fontWeight: '500' }}>Space:</span>
                        <div style={{ color: '#232323', fontWeight: '600' }}>{selectedBookingData.space}</div>
                      </div>
                      <div>
                        <span style={{ color: '#666', fontWeight: '500' }}>Attendees:</span>
                        <div style={{ color: '#232323', fontWeight: '600' }}>{selectedBookingData.attendees}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Equipment Selection */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323' }}>
                    Equipment Assignment
                  </h2>
                  <button
                    onClick={handleAddEquipment}
                    style={{
                      background: '#10b981',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    + Add Equipment
                  </button>
                </div>

                {selectedEquipment.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', color: '#666' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
                    <p>No equipment assigned yet</p>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>Click "Add Equipment" to get started</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {selectedEquipment.map((equipment, index) => (
                      <div key={equipment.id} style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        background: '#f9fafb'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#232323' }}>
                            Equipment #{index + 1}
                          </h3>
                          <button
                            onClick={() => handleRemoveEquipment(index)}
                            style={{
                              background: '#ef4444',
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: 'none',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Remove
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                              Equipment Item
                            </label>
                            <select
                              value={equipment.inventoryItemId}
                              onChange={(e) => handleEquipmentChange(index, 'inventoryItemId', parseInt(e.target.value))}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '14px',
                                outline: 'none'
                              }}
                            >
                              <option value="">Select equipment...</option>
                              {inventoryItems.map(item => (
                                <option key={item.id} value={item.id}>
                                  {item.name} ({item.available} available)
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                              Quantity Needed
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={equipment.quantityNeeded}
                              onChange={(e) => handleEquipmentChange(index, 'quantityNeeded', parseInt(e.target.value))}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '14px',
                                outline: 'none'
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                              Setup Time
                            </label>
                            <input
                              type="time"
                              value={equipment.setupTime}
                              onChange={(e) => handleEquipmentChange(index, 'setupTime', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '14px',
                                outline: 'none'
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                              Teardown Time
                            </label>
                            <input
                              type="time"
                              value={equipment.teardownTime}
                              onChange={(e) => handleEquipmentChange(index, 'teardownTime', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '14px',
                                outline: 'none'
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ marginTop: '12px' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                            Setup Instructions
                          </label>
                          <textarea
                            value={equipment.setupInstructions || ''}
                            onChange={(e) => handleEquipmentChange(index, 'setupInstructions', e.target.value)}
                            placeholder="Special setup instructions for crew..."
                            style={{
                              width: '100%',
                              padding: '8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '14px',
                              outline: 'none',
                              minHeight: '60px',
                              resize: 'vertical'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Setup Requirements & Notes */}
            <div>
              {/* Setup Requirements */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323' }}>
                    Setup Requirements
                  </h2>
                  <button
                    onClick={handleAddSetupRequirement}
                    style={{
                      background: '#f59e0b',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    + Add Requirement
                  </button>
                </div>

                {setupRequirements.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', color: '#666' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                    <p>No setup requirements added</p>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>Add specific setup tasks for crew</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {setupRequirements.map((requirement, index) => (
                      <div key={requirement.id} style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '12px',
                        background: '#f9fafb'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#232323' }}>
                            Requirement #{index + 1}
                          </h4>
                          <button
                            onClick={() => handleRemoveRequirement(index)}
                            style={{
                              background: '#ef4444',
                              color: '#fff',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              border: 'none',
                              fontSize: '10px',
                              cursor: 'pointer'
                            }}
                          >
                            Remove
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                              Task
                            </label>
                            <input
                              type="text"
                              value={requirement.requirement}
                              onChange={(e) => handleRequirementChange(index, 'requirement', e.target.value)}
                              placeholder="Setup task description..."
                              style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '12px',
                                outline: 'none'
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                              Priority
                            </label>
                            <select
                              value={requirement.priority}
                              onChange={(e) => handleRequirementChange(index, 'priority', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '12px',
                                outline: 'none'
                              }}
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="critical">Critical</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                              Est. Time (min)
                            </label>
                            <input
                              type="number"
                              min="5"
                              value={requirement.estimatedTime}
                              onChange={(e) => handleRequirementChange(index, 'estimatedTime', parseInt(e.target.value))}
                              style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '12px',
                                outline: 'none'
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                              Assigned To
                            </label>
                            <input
                              type="text"
                              value={requirement.assignedTo || ''}
                              onChange={(e) => handleRequirementChange(index, 'assignedTo', e.target.value)}
                              placeholder="Crew member name..."
                              style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '12px',
                                outline: 'none'
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Notes
                          </label>
                          <textarea
                            value={requirement.notes || ''}
                            onChange={(e) => handleRequirementChange(index, 'notes', e.target.value)}
                            placeholder="Additional notes..."
                            style={{
                              width: '100%',
                              padding: '6px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '12px',
                              outline: 'none',
                              minHeight: '40px',
                              resize: 'vertical'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                  Assignment Notes
                </h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes about this equipment assignment..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    minHeight: '120px',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 