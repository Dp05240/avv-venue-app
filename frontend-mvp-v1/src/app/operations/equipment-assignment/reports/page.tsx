'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import { EquipmentUsageReport } from '../types';

export default function ReportsPage() {
  const [reports, setReports] = useState<EquipmentUsageReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');

  useEffect(() => {
    loadReports();
  }, [selectedPeriod]);

  const loadReports = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await equipmentAssignmentApi.getUsageReport(selectedPeriod);

      // Sample data
      const sampleReport: EquipmentUsageReport = {
        period: 'January 2025',
        totalAssignments: 24,
        totalEquipmentUsed: 156,
        mostUsedEquipment: [
          {
            itemName: 'Projector',
            usageCount: 18,
            totalHours: 144
          },
          {
            itemName: 'Tables',
            usageCount: 15,
            totalHours: 120
          },
          {
            itemName: 'Chairs',
            usageCount: 12,
            totalHours: 96
          },
          {
            itemName: 'Speakers',
            usageCount: 10,
            totalHours: 80
          },
          {
            itemName: 'LED Screens',
            usageCount: 8,
            totalHours: 64
          }
        ],
        spaceUtilization: [
          {
            space: 'Main Hall',
            assignments: 12,
            utilizationRate: 85
          },
          {
            space: 'Garden Room',
            assignments: 8,
            utilizationRate: 72
          },
          {
            space: 'Rooftop',
            assignments: 4,
            utilizationRate: 45
          }
        ],
        crewEfficiency: [
          {
            crewMember: 'John Smith',
            tasksCompleted: 45,
            averageTime: 28
          },
          {
            crewMember: 'Sarah Johnson',
            tasksCompleted: 38,
            averageTime: 32
          },
          {
            crewMember: 'Mike Wilson',
            tasksCompleted: 42,
            averageTime: 25
          },
          {
            crewMember: 'Lisa Davis',
            tasksCompleted: 35,
            averageTime: 35
          }
        ]
      };

      setReports(sampleReport);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUtilizationColor = (rate: number) => {
    if (rate >= 80) return '#10b981';
    if (rate >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getEfficiencyColor = (time: number) => {
    if (time <= 25) return '#10b981';
    if (time <= 35) return '#f59e0b';
    return '#ef4444';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading reports...</div>
        </div>
      </div>
    );
  }

  if (!reports) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>No report data available</div>
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
                  Equipment Usage Reports
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Analytics and performance metrics for equipment assignments
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                  Period:
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff'
                  }}
                >
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="this_quarter">This Quarter</option>
                  <option value="this_year">This Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
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
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#232323' }}>{reports.totalAssignments}</p>
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
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Equipment Used</p>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#232323' }}>{reports.totalEquipmentUsed}</p>
                </div>
                <div style={{ 
                  padding: '12px', 
                  background: '#d1fae5', 
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>🔧</span>
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
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Avg. Utilization</p>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#232323' }}>
                    {Math.round(reports.spaceUtilization.reduce((acc, space) => acc + space.utilizationRate, 0) / reports.spaceUtilization.length)}%
                  </p>
                </div>
                <div style={{ 
                  padding: '12px', 
                  background: '#fef3c7', 
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>📊</span>
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
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Period</p>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: '#232323' }}>{reports.period}</p>
                </div>
                <div style={{ 
                  padding: '12px', 
                  background: '#f3e8ff', 
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>📅</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Most Used Equipment */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '20px' }}>
                Most Used Equipment
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reports.mostUsedEquipment.map((equipment, index) => (
                  <div key={equipment.itemName} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: '#3b82f6',
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323' }}>
                          {equipment.itemName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {equipment.usageCount} assignments
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323' }}>
                        {equipment.totalHours}h
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        total hours
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Space Utilization */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '20px' }}>
                Space Utilization
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reports.spaceUtilization.map((space) => (
                  <div key={space.space} style={{
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323' }}>
                        {space.space}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: getUtilizationColor(space.utilizationRate) }}>
                        {space.utilizationRate}%
                      </div>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: '#e5e7eb', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${space.utilizationRate}%`,
                        height: '100%',
                        background: getUtilizationColor(space.utilizationRate),
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      {space.assignments} assignments
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crew Efficiency */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px',
            marginTop: '32px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '20px' }}>
              Crew Efficiency
            </h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Crew Member</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Tasks Completed</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Avg. Time (min)</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Efficiency Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.crewEfficiency.map((crew) => (
                    <tr key={crew.crewMember} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#232323', fontWeight: '500' }}>
                        {crew.crewMember}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#232323' }}>
                        {crew.tasksCompleted}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#232323' }}>
                        {crew.averageTime}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: getEfficiencyColor(crew.averageTime) + '20',
                          color: getEfficiencyColor(crew.averageTime)
                        }}>
                          {crew.averageTime <= 25 ? 'Excellent' : 
                           crew.averageTime <= 35 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Options */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px',
            marginTop: '32px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '20px' }}>
              Export Reports
            </h2>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {/* TODO: Export PDF */}}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📄 Export PDF
              </button>
              <button
                onClick={() => {/* TODO: Export Excel */}}
                style={{
                  background: '#10b981',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📊 Export Excel
              </button>
              <button
                onClick={() => {/* TODO: Schedule report */}}
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📧 Schedule Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 