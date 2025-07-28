import React from 'react';
import NavBar from '../../../../components/NavBar';

// Required for static export
export async function generateStaticParams() {
  return [
    { id: 'assignment-001' },
    { id: 'assignment-002' },
    { id: 'assignment-003' },
  ];
}

export default async function AssignmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: assignmentId } = await params;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            background: '#fff', 
            borderRadius: '16px', 
            padding: '32px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#232323', marginBottom: '16px' }}>
              Equipment Assignment Details
            </h1>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
              Assignment ID: {assignmentId}
            </p>
            <div style={{ 
              padding: '24px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <p style={{ color: '#666', fontSize: '14px' }}>
                This page shows detailed equipment assignment information for static export.
                In a full implementation, this would display comprehensive assignment details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 