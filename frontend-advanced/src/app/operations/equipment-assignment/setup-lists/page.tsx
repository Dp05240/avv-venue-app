'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import { SetupList, EquipmentAssignment } from '../types';

export default function SetupListsPage() {
  const [setupLists, setSetupLists] = useState<SetupList[]>([]);
  const [assignments, setAssignments] = useState<EquipmentAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const [setupListsResponse, assignmentsResponse] = await Promise.all([
      //   equipmentAssignmentApi.getSetupLists(),
      //   equipmentAssignmentApi.getAll()
      // ]);

      // Sample data
      const sampleSetupLists: SetupList[] = [
        {
          id: 'sl-001',
          assignmentId: 'ea-001',
          eventTitle: 'Tech Conference 2025',
          eventDate: '2025-01-15',
          space: 'Main Hall',
          crewMembers: [
            {
              id: 'crew-001',
              name: 'John Smith',
              role: 'AV Technician',
              contact: 'john.smith@venue.com',
              assignedTasks: ['Setup projectors', 'Test audio system'],
              startTime: '08:00',
              endTime: '18:00',
              status: 'confirmed'
            },
            {
              id: 'crew-002',
              name: 'Sarah Johnson',
              role: 'Setup Coordinator',
              contact: 'sarah.johnson@venue.com',
              assignedTasks: ['Arrange seating', 'Set up presentation area'],
              startTime: '07:30',
              endTime: '17:30',
              status: 'confirmed'
            }
          ],
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
              assignedAt: '2025-01-10'
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
              notes: 'Completed successfully'
            }
          ],
          timeline: [
            {
              id: 'timeline-001',
              time: '07:30',
              task: 'Crew arrival and briefing',
              assignedTo: ['Setup Coordinator'],
              priority: 'high',
              status: 'completed'
            },
            {
              id: 'timeline-002',
              time: '08:00',
              task: 'Begin AV equipment setup',
              assignedTo: ['AV Technician'],
              equipment: ['Projector', 'Speakers'],
              priority: 'critical',
              status: 'in_progress'
            },
            {
              id: 'timeline-003',
              time: '08:30',
              task: 'Arrange seating and presentation area',
              assignedTo: ['Setup Coordinator'],
              priority: 'high',
              status: 'pending'
            }
          ],
          status: 'published',
          createdBy: 'John Manager',
          createdAt: '2025-01-10',
          updatedAt: '2025-01-12'
        }
      ];

      const sampleAssignments: EquipmentAssignment[] = [
        {
          id: 'ea-001',
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
          equipment: [],
          setupRequirements: []
        },
        {
          id: 'ea-002',
          bookingId: 'booking-002',
          bookingTitle: 'Wedding Reception',
          eventDate: '2025-01-22',
          startTime: '18:00',
          endTime: '23:00',
          space: 'Garden Room',
          clientName: 'Sarah & John',
          status: 'pending',
          assignedBy: 'Jane Coordinator',
          assignedAt: '2025-01-12',
          equipment: [],
          setupRequirements: []
        }
      ];

      setSetupLists(sampleSetupLists);
      setAssignments(sampleAssignments);
    } catch (error) {
      console.error('Error loading setup lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSetupList = async () => {
    if (!selectedAssignment) {
      alert('Please select an assignment first.');
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await equipmentAssignmentApi.createSetupList(selectedAssignment);
      
      const assignment = assignments.find(a => a.id === selectedAssignment);
      const newSetupList: SetupList = {
        id: `sl-${Date.now()}`,
        assignmentId: selectedAssignment,
        eventTitle: assignment?.bookingTitle || '',
        eventDate: assignment?.eventDate || '',
        space: assignment?.space || '',
        crewMembers: [],
        equipment: [],
        setupRequirements: [],
        timeline: [],
        status: 'draft',
        createdBy: 'Current User',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setSetupLists([...setupLists, newSetupList]);
      setShowCreateModal(false);
      setSelectedAssignment('');
      
      // Redirect to the new setup list
      window.location.href = `/operations/equipment-assignment/setup-lists/${newSetupList.id}`;
    } catch (error) {
      console.error('Error creating setup list:', error);
      alert('Failed to create setup list. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return { color: '#6b7280', background: '#f3f4f6' };
      case 'published': return { color: '#10b981', background: '#d1fae5' };
      case 'in_progress': return { color: '#3b82f6', background: '#dbeafe' };
      case 'completed': return { color: '#6b7280', background: '#f3f4f6' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading setup lists...</div>
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
                  Setup Lists
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Generate and manage crew setup lists for equipment assignments
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                + Create Setup List
              </button>
            </div>
          </div>

          {/* Setup Lists Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '24px' 
          }}>
            {setupLists.map((setupList) => (
              <div key={setupList.id} style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '24px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              onClick={() => {
                window.location.href = `/operations/equipment-assignment/setup-lists/${setupList.id}`;
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                      {setupList.eventTitle}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      {setupList.eventDate} • {setupList.space}
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '500',
                    ...getStatusColor(setupList.status)
                  }}>
                    {setupList.status.replace('_', ' ')}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                      Crew Members
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {setupList.crewMembers.length}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                      Equipment Items
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {setupList.equipment.length}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                      Setup Tasks
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {setupList.setupRequirements.length}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                      Timeline Items
                    </label>
                    <div style={{ fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                      {setupList.timeline.length}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Created by {setupList.createdBy}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {setupList.updatedAt}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {setupLists.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '64px 24px',
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>📝</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                No setup lists yet
              </h3>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
                Create your first setup list to coordinate crew operations
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Create Setup List
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Setup List Modal */}
      {showCreateModal && (
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
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323' }}>
                Create Setup List
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Select Assignment
              </label>
              <select
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
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
                <option value="">Choose an assignment...</option>
                {assignments.map(assignment => (
                  <option key={assignment.id} value={assignment.id}>
                    {assignment.bookingTitle} - {assignment.clientName} ({assignment.eventDate})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSetupList}
                disabled={!selectedAssignment}
                style={{
                  background: !selectedAssignment ? '#9ca3af' : '#3b82f6',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: !selectedAssignment ? 'not-allowed' : 'pointer'
                }}
              >
                Create Setup List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 