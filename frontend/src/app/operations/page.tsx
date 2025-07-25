import React from 'react';
import NavBar from '../components/NavBar';
import Link from 'next/link';

export default function OperationsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ maxWidth: 900, margin: '40px auto 0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#232323', marginBottom: 32 }}>Operations</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          <Link href="/operations/maintenance" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
              <span style={{ fontSize: 40, marginBottom: 12 }}>🛠️</span>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>Maintenance</div>
              <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>Manage work orders, preventive tasks, and asset maintenance.</div>
            </div>
          </Link>
          <Link href="/operations/billing" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
              <span style={{ fontSize: 40, marginBottom: 12 }}>💳</span>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>Billing</div>
              <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>View and manage invoices, payments, and financials.</div>
            </div>
          </Link>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
            <span style={{ fontSize: 40, marginBottom: 12 }}>🧰</span>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>More Coming Soon</div>
            <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>Inventory, vendors, and more operations modules are on the way.</div>
          </div>
        </div>
      </div>
    </div>
  );
} 