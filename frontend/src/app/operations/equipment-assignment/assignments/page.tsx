'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import { EquipmentAssignment } from '../types';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<EquipmentAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [spaceFilter, setSpaceFilter] = useState('all');

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await equipmentAssignmentApi.getAll();

      // Sample data for now
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
              status: 'assigned',
              assignedBy: 'John Manager',
              assignedAt: '2025-01-10',
            }
          ],
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
          equipment: [
            {
              id: 'eq-003',
              inventoryItemId: 3,
              itemName: 'Tables',
              itemSku: 'TBL-001',
              category: 'Furniture',
              quantity: 20,
              quantityNeeded: 20,
              location: 'Garden Room',
              setupTime: '16:00',
              teardownTime: '00:00',
              status: 'assigned',
              assignedBy: 'Jane Coordinator',
              assignedAt: '2025-01-12',
            },
            {
              id: 'eq-004',
              inventoryItemId: 4,
              itemName: 'Chairs',
              itemSku: 'CHR-001',
              category: 'Furniture',
              quantity: 120,
              quantityNeeded: 120,
              location: 'Garden Room',
              setupTime: '16:00',
              teardownTime: '00:00',
              status: 'assigned',
              assignedBy: 'Jane Coordinator',
              assignedAt: '2025-01-12',
            }
          ],
          setupRequirements: []
        },
        {
          id: 'ea-003',
          bookingId: 'booking-003',
          bookingTitle: 'Product Launch',
          eventDate: '2025-01-08',
          startTime: '19:00',
          endTime: '22:00',
          space: 'Rooftop',
          clientName: 'Innovation Inc',
          status: 'in_progress',
          assignedBy: 'Mike Operations',
          assignedAt: '2025-01-05',
          equipment: [
            {
              id: 'eq-005',
              inventoryItemId: 5,
              itemName: 'LED Screens',
              itemSku: 'LED-001',
              category: 'Audio/Visual',
              quantity: 2,
              quantityNeeded: 2,
              location: 'Rooftop',
              setupTime: '17:00',
              teardownTime: '23:00',
              status: 'setup_complete',
              assignedBy: 'Mike Operations',
              assignedAt: '2025-01-05',
            }
          ],
          setupRequirements: []
        }
      ];

      setAssignments(sampleAssignments);
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.bookingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.space.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesSpace = spaceFilter === 'all' || assignment.space === spaceFilter;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = assignment.eventDate === today;
    } else if (dateFilter === 'this_week') {
      const today = new Date();
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      const eventDate = new Date(assignment.eventDate);
      matchesDate = eventDate >= weekStart && eventDate <= weekEnd;
    } else if (dateFilter === 'this_month') {
      const today = new Date();
      const eventDate = new Date(assignment.eventDate);
      matchesDate = eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
    }

    return matchesSearch && matchesStatus && matchesDate && matchesSpace;
  });

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

  const getUniqueSpaces = () => {
    const spaces = assignments.map(a => a.space);
    return ['all', ...Array.from(new Set(spaces))];
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading assignments...</div>
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
                  Equipment Assignments
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Manage and track equipment assignments for all events
                </p>
              </div>
              <a 
                href="/operations/equipment-assignment/assignments/create"
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>➕</span>
                New Assignment
              </a>
            </div>
          </div>

          {/* Filters */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Search */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search events, clients, spaces..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Status Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff'
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Date Range
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff'
                  }}
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                </select>
              </div>

              {/* Space Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Space
                </label>
                <select
                  value={spaceFilter}
                  onChange={(e) => setSpaceFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff'
                  }}
                >
                  {getUniqueSpaces().map(space => (
                    <option key={space} value={space}>
                      {space === 'all' ? 'All Spaces' : space}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Showing {filteredAssignments.length} of {assignments.length} assignments
            </p>
          </div>

          {/* Assignments Table */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            overflow: 'hidden',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Event</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Date & Time</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Space</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Equipment</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Assigned By</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment) => (
                    <tr key={assignment.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#232323' }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{assignment.bookingTitle}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{assignment.clientName}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#232323' }}>
                        <div>
                          <div style={{ fontWeight: '500' }}>{assignment.eventDate}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {assignment.startTime} - {assignment.endTime}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#232323' }}>{assignment.space}</td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#232323' }}>
                        <div>
                          <div style={{ fontWeight: '500' }}>{assignment.equipment.length} items</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {assignment.equipment.slice(0, 2).map(eq => eq.itemName).join(', ')}
                            {assignment.equipment.length > 2 && ` +${assignment.equipment.length - 2} more`}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          ...getStatusColor(assignment.status)
                        }}>
                          {assignment.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#232323' }}>
                        <div>
                          <div>{assignment.assignedBy}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{assignment.assignedAt}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <a 
                            href={`/operations/equipment-assignment/assignments/${assignment.id}`}
                            style={{
                              padding: '6px 12px',
                              background: '#f3f4f6',
                              color: '#374151',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            View
                          </a>
                          <a 
                            href={`/operations/equipment-assignment/assignments/${assignment.id}?edit=true`}
                            style={{
                              padding: '6px 12px',
                              background: '#dbeafe',
                              color: '#3b82f6',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            Edit
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAssignments.length === 0 && (
              <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  No assignments found
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                  Try adjusting your filters or create a new assignment
                </p>
                <a 
                  href="/operations/equipment-assignment/assignments/create"
                  style={{
                    background: '#3b82f6',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Create Assignment
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 