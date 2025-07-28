'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import NavBar from '../../../../components/NavBar';
import { EquipmentAssignment } from '../../types';

export default function AssignmentDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const assignmentId = params.id as string;
  const isEditMode = searchParams.get('edit') === 'true';

  const [assignment, setAssignment] = useState<EquipmentAssignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(isEditMode);

  useEffect(() => {
    loadAssignment();
  }, [assignmentId]);

  const loadAssignment = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await equipmentAssignmentApi.getById(assignmentId);

      // Sample data
      const sampleAssignment: EquipmentAssignment = {
        id: assignmentId,
        bookingId: 'booking-001',
        bookingTitle: 'Tech Conference 2025',
        eventDate: '2025-01-15',
        startTime: '09:00',
        endTime: '17:00',
        space: 'Main Hall',
        clientName: 'Tech Corp',
        status: 'confirmed',
        assignedBy: 'John Manager',
        assignedAt: '2025-01-10',
        notes: 'High-profile tech conference with multiple speakers. Ensure all AV equipment is tested before setup.',
        equipment: [
          {
            id: 'eq-001',
            inventoryItemId: 1,
            itemName: 'Projector',
            itemSku: 'PROJ-001',
            category: 'Audio/Visual',
            quantity: 2,
            quantityNeeded: 2,
            location: 'Main Hall',
            setupTime: '08:00',
            teardownTime: '18:00',
            status: 'assigned',
            assignedBy: 'John Manager',
            assignedAt: '2025-01-10',
            setupInstructions: 'Position projectors at opposite ends of the hall for dual-screen presentation',
            specialRequirements: 'HDMI cables and adapters needed'
          },
          {
            id: 'eq-002',
            inventoryItemId: 2,
            itemName: 'Speakers',
            itemSku: 'SPK-001',
            category: 'Audio/Visual',
            quantity: 4,
            quantityNeeded: 4,
            location: 'Main Hall',
            setupTime: '08:00',
            teardownTime: '18:00',
            status: 'setup_complete',
            assignedBy: 'John Manager',
            assignedAt: '2025-01-10',
            setupInstructions: 'Place speakers at corners for optimal sound distribution',
            specialRequirements: 'Wireless microphones for speakers'
          }
        ],
        setupRequirements: [
          {
            id: 'req-001',
            requirement: 'Test all AV equipment',
            priority: 'critical',
            assignedTo: 'AV Team',
            status: 'completed',
            estimatedTime: 60,
            notes: 'Completed successfully - all equipment working'
          },
          {
            id: 'req-002',
            requirement: 'Set up presentation area',
            priority: 'high',
            assignedTo: 'Setup Crew',
            status: 'in_progress',
            estimatedTime: 45,
            notes: 'Podium and backdrop installation in progress'
          },
          {
            id: 'req-003',
            requirement: 'Arrange seating',
            priority: 'medium',
            assignedTo: 'Setup Crew',
            status: 'pending',
            estimatedTime: 30,
            notes: '200 chairs in theater style arrangement'
          }
        ]
      };

      setAssignment(sampleAssignment);
    } catch (error) {
      console.error('Error loading assignment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!assignment) return;

    try {
      setSaving(true);
      // TODO: Replace with actual API call
      // await equipmentAssignmentApi.updateStatus(assignmentId, newStatus);
      
      setAssignment({ ...assignment, status: newStatus as any });
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return { color: '#10b981', background: '#10b98120' };
      case 'pending': return { color: '#f59e0b', background: '#fef3c7' };
      case 'in_progress': return { color: '#3b82f6', background: '#dbeafe' };
      case 'completed': return { color: '#6b7280', background: '#f3f4f6' };
      case 'cancelled': return { color: '#ef4444', background: '#fee2e2' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return { color: '#3b82f6', background: '#dbeafe' };
      case 'setup_complete': return { color: '#10b981', background: '#d1fae5' };
      case 'in_use': return { color: '#f59e0b', background: '#fef3c7' };
      case 'teardown_complete': return { color: '#6b7280', background: '#f3f4f6' };
      case 'returned': return { color: '#10b981', background: '#d1fae5' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  const getRequirementStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return { color: '#f59e0b', background: '#fef3c7' };
      case 'in_progress': return { color: '#3b82f6', background: '#dbeafe' };
      case 'completed': return { color: '#10b981', background: '#d1fae5' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return { color: '#ef4444', background: '#fee2e2' };
      case 'high': return { color: '#f59e0b', background: '#fef3c7' };
      case 'medium': return { color: '#3b82f6', background: '#dbeafe' };
      case 'low': return { color: '#10b981', background: '#d1fae5' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading assignment details...</div>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Assignment not found</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>
                  Equipment Assignment Details
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  {assignment.bookingTitle} - {assignment.clientName}
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
                  Back to Assignments
                </a>
                <button
                  onClick={() => setEditMode(!editMode)}
                  style={{
                    background: editMode ? '#f59e0b' : '#3b82f6',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {editMode ? 'Cancel Edit' : 'Edit Assignment'}
                </button>
                {editMode && (
                  <button
                    onClick={() => {/* TODO: Save changes */}}
                    disabled={saving}
                    style={{
                      background: saving ? '#9ca3af' : '#10b981',
                      color: '#fff',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: saving ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Left Column - Assignment Info & Equipment */}
            <div>
              {/* Assignment Information */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323' }}>
                    Assignment Information
                  </h2>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    ...getStatusColor(assignment.status)
                  }}>
                    {assignment.status.replace('_', ' ')}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Event Title
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {assignment.bookingTitle}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Client
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {assignment.clientName}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Event Date
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {assignment.eventDate}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Event Time
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {assignment.startTime} - {assignment.endTime}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Space
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {assignment.space}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Assigned By
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {assignment.assignedBy}
                    </div>
                  </div>
                </div>

                {editMode && (
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Status
                    </label>
                    <select
                      value={assignment.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      disabled={saving}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#fff'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Equipment List */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '20px' }}>
                  Assigned Equipment ({assignment.equipment.length} items)
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {assignment.equipment.map((equipment) => (
                    <div key={equipment.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '16px',
                      background: '#f9fafb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                            {equipment.itemName}
                          </h3>
                          <p style={{ fontSize: '12px', color: '#666' }}>
                            SKU: {equipment.itemSku} • Category: {equipment.category}
                          </p>
                        </div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '500',
                          ...getEquipmentStatusColor(equipment.status)
                        }}>
                          {equipment.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Quantity
                          </label>
                          <div style={{ fontSize: '14px', color: '#232323' }}>
                            {equipment.quantityNeeded} needed
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Location
                          </label>
                          <div style={{ fontSize: '14px', color: '#232323' }}>
                            {equipment.location}
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Setup Time
                          </label>
                          <div style={{ fontSize: '14px', color: '#232323' }}>
                            {equipment.setupTime}
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Teardown Time
                          </label>
                          <div style={{ fontSize: '14px', color: '#232323' }}>
                            {equipment.teardownTime}
                          </div>
                        </div>
                      </div>

                      {equipment.setupInstructions && (
                        <div style={{ marginBottom: '8px' }}>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Setup Instructions
                          </label>
                          <div style={{ fontSize: '13px', color: '#232323', background: '#fff', padding: '8px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                            {equipment.setupInstructions}
                          </div>
                        </div>
                      )}

                      {equipment.specialRequirements && (
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Special Requirements
                          </label>
                          <div style={{ fontSize: '13px', color: '#232323', background: '#fff', padding: '8px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                            {equipment.specialRequirements}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '20px' }}>
                  Setup Requirements ({assignment.setupRequirements.length} tasks)
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {assignment.setupRequirements.map((requirement) => (
                    <div key={requirement.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      background: '#f9fafb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#232323' }}>
                          {requirement.requirement}
                        </h3>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: '500',
                            ...getPriorityColor(requirement.priority)
                          }}>
                            {requirement.priority}
                          </span>
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: '500',
                            ...getRequirementStatusColor(requirement.status)
                          }}>
                            {requirement.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px', fontSize: '12px' }}>
                        <div>
                          <span style={{ color: '#666', fontWeight: '500' }}>Assigned to:</span>
                          <div style={{ color: '#232323' }}>{requirement.assignedTo || 'Unassigned'}</div>
                        </div>
                        <div>
                          <span style={{ color: '#666', fontWeight: '500' }}>Est. time:</span>
                          <div style={{ color: '#232323' }}>{requirement.estimatedTime} min</div>
                        </div>
                        {requirement.actualTime && (
                          <div>
                            <span style={{ color: '#666', fontWeight: '500' }}>Actual time:</span>
                            <div style={{ color: '#232323' }}>{requirement.actualTime} min</div>
                          </div>
                        )}
                      </div>

                      {requirement.notes && (
                        <div style={{ fontSize: '12px', color: '#666', background: '#fff', padding: '6px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                          {requirement.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {assignment.notes && (
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
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#232323', 
                    lineHeight: '1.6',
                    background: '#f8fafc',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {assignment.notes}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 