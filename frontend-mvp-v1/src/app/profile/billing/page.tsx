'use client';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Link from 'next/link';

export default function BillingPage() {
  const [currentPlan] = useState({
    name: 'Professional',
    price: '$99/month',
    features: ['Unlimited venues', 'Advanced analytics', 'Priority support', 'Custom branding'],
    nextBilling: '2025-02-15'
  });

  const [paymentMethod] = useState({
    type: 'Visa',
    last4: '4242',
    expiry: '12/26',
    name: 'Alex Johnson'
  });

  const [invoices] = useState([
    {
      id: 'INV-001',
      date: '2025-01-15',
      amount: '$99.00',
      status: 'paid',
      description: 'Professional Plan - January 2025'
    },
    {
      id: 'INV-002',
      date: '2024-12-15',
      amount: '$99.00',
      status: 'paid',
      description: 'Professional Plan - December 2024'
    },
    {
      id: 'INV-003',
      date: '2024-11-15',
      amount: '$99.00',
      status: 'paid',
      description: 'Professional Plan - November 2024'
    }
  ]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>
                  Billing & Subscription
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Manage your subscription and payment methods
                </p>
              </div>
              <Link href="/profile" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Back to Profile
                </button>
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
            {/* Left Column - Navigation */}
            <div>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#232323', marginBottom: '16px' }}>
                  Profile Sections
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href="/profile" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      📋 Personal Information
                    </div>
                  </Link>
                  <Link href="/profile/security" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      🔒 Security & Password
                    </div>
                  </Link>
                  <Link href="/profile/notifications" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      🔔 Notifications
                    </div>
                  </Link>
                  <Link href="/profile/preferences" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      ⚙️ Preferences
                    </div>
                  </Link>
                  <Link href="/profile/billing" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#3b82f6',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      💳 Billing & Subscription
                    </div>
                  </Link>
                  <Link href="/profile/activity" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    >
                      📊 Activity & Analytics
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Billing Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Current Plan */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '8px' }}>
                      Current Plan
                    </h2>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      Next billing date: {currentPlan.nextBilling}
                    </p>
                  </div>
                  <button style={{
                    background: '#3b82f6',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    Change Plan
                  </button>
                </div>

                <div style={{ 
                  background: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '20px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>
                        {currentPlan.name} Plan
                      </h3>
                      <p style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
                        {currentPlan.price}
                      </p>
                    </div>
                    <div style={{ 
                      padding: '8px 12px', 
                      background: '#d1fae5', 
                      color: '#065f46',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Active
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Plan Features:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {currentPlan.features.map((feature, index) => (
                        <li key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          fontSize: '14px', 
                          color: '#374151',
                          marginBottom: '4px'
                        }}>
                          <span style={{ color: '#10b981' }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323' }}>
                    Payment Method
                  </h2>
                  <button style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    Update
                  </button>
                </div>

                <div style={{ 
                  background: '#f8fafc', 
                  borderRadius: '8px', 
                  padding: '20px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '32px',
                      background: '#1e40af',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {paymentMethod.type}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#232323' }}>
                        •••• •••• •••• {paymentMethod.last4}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {paymentMethod.name} • Expires {paymentMethod.expiry}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice History */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '32px',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323', marginBottom: '24px' }}>
                  Invoice History
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {invoices.map((invoice) => (
                    <div key={invoice.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#232323' }}>
                          {invoice.description}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {invoice.id} • {invoice.date}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#232323' }}>
                          {invoice.amount}
                        </div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: '#d1fae5',
                          color: '#065f46'
                        }}>
                          {invoice.status}
                        </span>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          color: '#3b82f6',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}>
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: '#3b82f6',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}>
                    View All Invoices
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 