'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import { EquipmentCalendarEvent, EquipmentAssignment } from '../types';

export default function EquipmentCalendarPage() {
  const [calendarEvents, setCalendarEvents] = useState<EquipmentCalendarEvent[]>([]);
  const [assignments, setAssignments] = useState<EquipmentAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [selectedSpace, setSelectedSpace] = useState<string>('all');

  useEffect(() => {
    loadCalendarData();
  }, []);

  const loadCalendarData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const [assignmentsResponse, eventsResponse] = await Promise.all([
      //   equipmentAssignmentApi.getAll(),
      //   equipmentAssignmentApi.getCalendarEvents()
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
            }
          ],
          setupRequirements: []
        }
      ];

      // Generate calendar events from assignments
      const events: EquipmentCalendarEvent[] = [];
      sampleAssignments.forEach(assignment => {
        assignment.equipment.forEach(equipment => {
          // Setup event
          events.push({
            id: `${equipment.id}-setup`,
            title: `Setup: ${equipment.itemName}`,
            start: `${assignment.eventDate}T${equipment.setupTime}:00`,
            end: `${assignment.eventDate}T${assignment.startTime}:00`,
            assignmentId: assignment.id,
            equipmentId: equipment.inventoryItemId,
            equipmentName: equipment.itemName,
            space: assignment.space,
            status: 'setup',
            color: '#3b82f6'
          });

          // In-use event
          events.push({
            id: `${equipment.id}-inuse`,
            title: `${equipment.itemName} - ${assignment.bookingTitle}`,
            start: `${assignment.eventDate}T${assignment.startTime}:00`,
            end: `${assignment.eventDate}T${assignment.endTime}:00`,
            assignmentId: assignment.id,
            equipmentId: equipment.inventoryItemId,
            equipmentName: equipment.itemName,
            space: assignment.space,
            status: 'in_use',
            color: '#10b981'
          });

          // Teardown event
          events.push({
            id: `${equipment.id}-teardown`,
            title: `Teardown: ${equipment.itemName}`,
            start: `${assignment.eventDate}T${assignment.endTime}:00`,
            end: `${assignment.eventDate}T${equipment.teardownTime}:00`,
            assignmentId: assignment.id,
            equipmentId: equipment.inventoryItemId,
            equipmentName: equipment.itemName,
            space: assignment.space,
            status: 'teardown',
            color: '#f59e0b'
          });
        });
      });

      setAssignments(sampleAssignments);
      setCalendarEvents(events);
    } catch (error) {
      console.error('Error loading calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = calendarEvents.filter(event => {
    const matchesEquipment = selectedEquipment === 'all' || event.equipmentName === selectedEquipment;
    const matchesSpace = selectedSpace === 'all' || event.space === selectedSpace;
    return matchesEquipment && matchesSpace;
  });

  const getUniqueEquipment = () => {
    const equipment = calendarEvents.map(e => e.equipmentName);
    return ['all', ...Array.from(new Set(equipment))];
  };

  const getUniqueSpaces = () => {
    const spaces = calendarEvents.map(e => e.space);
    return ['all', ...Array.from(new Set(spaces))];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'setup': return '#3b82f6';
      case 'in_use': return '#10b981';
      case 'teardown': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'setup': return 'Setup';
      case 'in_use': return 'In Use';
      case 'teardown': return 'Teardown';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading calendar...</div>
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
                  Equipment Calendar
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Visual timeline of equipment allocation and usage
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
                  View Assignments
                </a>
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
                  New Assignment
                </a>
              </div>
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
              {/* Equipment Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Equipment
                </label>
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
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
                  {getUniqueEquipment().map(equipment => (
                    <option key={equipment} value={equipment}>
                      {equipment === 'all' ? 'All Equipment' : equipment}
                    </option>
                  ))}
                </select>
              </div>

              {/* Space Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Space
                </label>
                <select
                  value={selectedSpace}
                  onChange={(e) => setSelectedSpace(e.target.value)}
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

              {/* Date Navigation */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
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
            </div>
          </div>

          {/* Calendar Legend */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '20px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>Legend</h3>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Setup</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: '#10b981', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '14px', color: '#374151' }}>In Use</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: '#f59e0b', borderRadius: '4px' }}></div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Teardown</span>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '8px' }}>
                Equipment Timeline
              </h2>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Showing {filteredEvents.length} events for {selectedDate.toLocaleDateString()}
              </p>
            </div>

            {/* Timeline View */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredEvents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    No equipment events found
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    Try adjusting your filters or create a new assignment
                  </p>
                </div>
              ) : (
                filteredEvents
                  .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                  .map((event) => {
                    const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const endTime = new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    return (
                      <div key={event.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '16px',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        border: `2px solid ${event.color}`,
                        position: 'relative'
                      }}>
                        {/* Time indicator */}
                        <div style={{
                          position: 'absolute',
                          left: '-8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '16px',
                          height: '16px',
                          background: event.color,
                          borderRadius: '50%'
                        }}></div>

                        {/* Time range */}
                        <div style={{ 
                          minWidth: '120px', 
                          marginRight: '24px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                            {startTime}
                          </div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            to {endTime}
                          </div>
                        </div>

                        {/* Event details */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#232323' }}>
                              {event.title}
                            </h3>
                            <span style={{
                              padding: '4px 8px',
                              background: `${event.color}20`,
                              color: event.color,
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {getStatusLabel(event.status)}
                            </span>
                          </div>
                          <div style={{ fontSize: '14px', color: '#666' }}>
                            {event.equipmentName} • {event.space}
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <a 
                            href={`/operations/equipment-assignment/assignments/${event.assignmentId}`}
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
                            View Assignment
                          </a>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          {/* Equipment Usage Summary */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px',
            marginTop: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
              Equipment Usage Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
                  {filteredEvents.filter(e => e.status === 'setup').length}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Setup Events</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                  {filteredEvents.filter(e => e.status === 'in_use').length}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Active Usage</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
                  {filteredEvents.filter(e => e.status === 'teardown').length}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Teardown Events</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#6b7280' }}>
                  {getUniqueEquipment().length - 1}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Equipment Types</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 