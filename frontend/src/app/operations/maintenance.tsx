import React from 'react';
import NavBar from '../components/NavBar';

export default function MaintenancePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ maxWidth: 700, margin: '40px auto 0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#232323', marginBottom: 24 }}>Maintenance</h1>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 48, marginBottom: 16 }}>🛠️</span>
          <div style={{ fontWeight: 600, fontSize: 20, color: '#232323', marginBottom: 8 }}>Maintenance & Operations</div>
          <div style={{ color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 12 }}>
            This is where you will manage all work orders, preventive maintenance, and asset care for your venues.<br />
            Features coming soon!
          </div>
        </div>
      </div>
    </div>
  );
} 