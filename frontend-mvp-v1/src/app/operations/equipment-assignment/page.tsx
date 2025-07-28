'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { EquipmentAssignment, EquipmentConflict } from './types';

export default function EquipmentAssignmentPage() {
  const [assignments, setAssignments] = useState<EquipmentAssignment[]>([]);
  const [conflicts, setConflicts] = useState<EquipmentConflict[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssignments: 0,
    pendingAssignments: 0,
    activeAssignments: 0,
    conflicts: 0,
    equipmentUtilization: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const [assignmentsResponse, conflictsResponse, statsResponse] = await Promise.all([
      //   equipmentAssignmentApi.getAll(),
      //   equipmentAssignmentApi.getConflicts(),
      //   equipmentAssignmentApi.getStats()
      // ]);

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
              id: 'eq-002',
              inventoryItemId: 2,
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
              id: 'eq-003',
              inventoryItemId: 3,
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
        }
      ];

      const sampleConflicts: EquipmentConflict[] = [
        {
          id: 'conflict-001',
          equipmentId: 1,
          equipmentName: 'Projector',
          conflictingAssignments: ['ea-001', 'ea-003'],
          conflictType: 'time_overlap',
          severity: 'high',
          suggestedResolution: 'Consider using alternative projector or reschedule one event'
        }
      ];

      setAssignments(sampleAssignments);
      setConflicts(sampleConflicts);
      setStats({
        totalAssignments: sampleAssignments.length,
        pendingAssignments: sampleAssignments.filter(a => a.status === 'pending').length,
        activeAssignments: sampleAssignments.filter(a => a.status === 'confirmed' || a.status === 'in_progress').length,
        conflicts: sampleConflicts.length,
        equipmentUtilization: 75,
      });
    } catch (error) {
      console.error('Error loading equipment assignment data:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading equipment assignments...</div>
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
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>
              Equipment Assignment
            </h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Manage equipment allocation for events and coordinate setup operations
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px', 
            marginBottom: '32px' 
          }}>
            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Total Assignments</p>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#232323' }}>{stats.totalAssignments}</p>
                </div>
                <div style={{ 
                  padding: '12px', 
                  background: '#dbeafe', 
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>📋</span>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Pending</p>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b' }}>{stats.pendingAssignments}</p>
                </div>
                <div style={{ 
                  padding: '12px', 
                  background: '#fef3c7', 
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>⏳</span>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Active</p>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>{stats.activeAssignments}</p>
                </div>
                <div style={{ 
                  padding: '12px', 
                  background: '#d1fae5', 
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>✅</span>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Conflicts</p>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444' }}>{stats.conflicts}</p>
                </div>
                <div style={{ 
                  padding: '12px', 
                  background: '#fee2e2', 
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>⚠️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px', 
            marginBottom: '32px' 
          }}>
            <a href="/operations/equipment-assignment/assignments" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: '#dbeafe', 
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>🔧</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>Assignments</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Manage equipment assignments</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/operations/equipment-assignment/calendar" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: '#fef3c7', 
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📅</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>Calendar</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Equipment allocation calendar</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/operations/equipment-assignment/setup-lists" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: '#d1fae5', 
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📝</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>Setup Lists</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Generate crew setup lists</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/operations/equipment-assignment/reports" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: '#f3e8ff', 
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📊</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>Reports</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Equipment usage analytics</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Recent Assignments */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323' }}>Recent Assignments</h2>
              <a 
                href="/operations/equipment-assignment/assignments" 
                style={{ 
                  color: '#3b82f6', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                View All →
              </a>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666' }}>Event</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666' }}>Space</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666' }}>Equipment</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.slice(0, 5).map((assignment) => (
                    <tr key={assignment.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#232323' }}>
                        <div>
                          <div style={{ fontWeight: '600' }}>{assignment.bookingTitle}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{assignment.clientName}</div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#232323' }}>
                        <div>
                          <div>{assignment.eventDate}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {assignment.startTime} - {assignment.endTime}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#232323' }}>{assignment.space}</td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#232323' }}>
                        {assignment.equipment.length} items
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          ...getStatusColor(assignment.status)
                        }}>
                          {assignment.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <a 
                          href={`/operations/equipment-assignment/assignments/${assignment.id}`}
                          style={{ 
                            color: '#3b82f6', 
                            textDecoration: 'none', 
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          View →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Equipment Conflicts */}
          {conflicts.length > 0 && (
            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323' }}>Equipment Conflicts</h2>
                <span style={{ 
                  padding: '4px 8px', 
                  background: '#fee2e2', 
                  color: '#ef4444', 
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {conflicts.length} conflicts
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {conflicts.map((conflict) => (
                  <div key={conflict.id} style={{
                    padding: '16px',
                    background: '#fef2f2',
                    borderRadius: '8px',
                    border: '1px solid #fecaca'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                          {conflict.equipmentName}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#666' }}>
                          {conflict.conflictType.replace('_', ' ')}
                        </p>
                      </div>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: conflict.severity === 'critical' ? '#fee2e2' : 
                                   conflict.severity === 'high' ? '#fef3c7' : '#dbeafe',
                        color: conflict.severity === 'critical' ? '#ef4444' : 
                               conflict.severity === 'high' ? '#f59e0b' : '#3b82f6'
                      }}>
                        {conflict.severity}
                      </span>
                    </div>
                    {conflict.suggestedResolution && (
                      <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                        <strong>Suggested:</strong> {conflict.suggestedResolution}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 