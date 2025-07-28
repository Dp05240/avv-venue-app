'use client';
import React from 'react';
import NavBar from '../components/NavBar';
import Link from 'next/link';

export default function OperationsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ maxWidth: 1200, margin: '40px auto 0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#232323', marginBottom: 32 }}>Operations</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          <Link href="/operations/equipment-assignment" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px #6a82fb33';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px #6a82fb22';
            }}>
              <span style={{ fontSize: 40, marginBottom: 12 }}>🔧</span>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>Equipment Assignment</div>
              <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>Manage equipment allocation for events, track setup/teardown, and coordinate crew operations.</div>
            </div>
          </Link>
          <Link href="/operations/maintenance" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px #6a82fb33';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px #6a82fb22';
            }}>
              <span style={{ fontSize: 40, marginBottom: 12 }}>🛠️</span>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>Maintenance</div>
              <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>Manage work orders, preventive tasks, and asset maintenance.</div>
            </div>
          </Link>
          <Link href="/operations/inventory" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px #6a82fb33';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px #6a82fb22';
            }}>
              <span style={{ fontSize: 40, marginBottom: 12 }}>📦</span>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>Inventory</div>
              <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>Manage stock levels, track items, and monitor inventory transactions.</div>
            </div>
          </Link>
          <Link href="/operations/purchase-orders" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px #6a82fb33';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px #6a82fb22';
            }}>
              <span style={{ fontSize: 40, marginBottom: 12 }}>📋</span>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>Purchase Orders</div>
              <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>Create and manage purchase orders, track vendors, and monitor procurement.</div>
            </div>
          </Link>
          <Link href="/operations/vendors" style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px #6a82fb33';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px #6a82fb22';
            }}>
              <span style={{ fontSize: 40, marginBottom: 12 }}>🏢</span>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>Vendors</div>
              <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>Manage vendor relationships, track purchase history, and optimize procurement.</div>
            </div>
          </Link>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.9 }}>
            <span style={{ fontSize: 40, marginBottom: 12 }}>📊</span>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#232323', marginBottom: 6 }}>Analytics</div>
            <div style={{ color: '#888', fontSize: 15, textAlign: 'center' }}>[Placeholder for analytics dashboard]</div>
          </div>
        </div>
      </div>
    </div>
  );
} 