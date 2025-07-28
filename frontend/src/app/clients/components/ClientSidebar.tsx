'use client';

import React, { useState, useEffect } from 'react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'prospect';
  totalSpent: number;
  lastBooking: string;
  createdAt: string;
  paymentMethod: 'cash' | 'check' | 'card' | 'bank_transfer';
  outstandingBalance: number;
  archived?: boolean;
}

interface Payment {
  id: string;
  clientId: number;
  amount: number;
  method: 'cash' | 'check' | 'card' | 'bank_transfer';
  date: string;
  reference?: string;
  notes?: string;
  status: 'pending' | 'completed' | 'failed';
}

interface ClientSidebarProps {
  client: Client | null;
  onClose: () => void;
  onSave: (client: Client) => void;
  onDelete: (clientId: number) => void;
  onArchive: (clientId: number) => void;
  onUnarchive: (clientId: number) => void;
  payments: Payment[];
  onPayment: (clientId: number, paymentData: Omit<Payment, 'id' | 'clientId'>) => void;
  communications?: Communication[];
}

interface Communication {
  id: string;
  type: 'text' | 'email' | 'call';
  direction: 'outbound' | 'inbound';
  subject?: string;
  content: string;
  date: string;
  time: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'missed' | 'answered';
}

export default function ClientSidebar({ client, onClose, onSave, onDelete, onArchive, onUnarchive, payments, onPayment, communications = [] }: ClientSidebarProps) {
  const [formData, setFormData] = useState<Omit<Client, 'id' | 'createdAt' | 'totalSpent' | 'lastBooking'>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: '',
    status: 'active',
    paymentMethod: 'card',
    outstandingBalance: 0,
    archived: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [showUnarchiveConfirm, setShowUnarchiveConfirm] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    amount: client?.outstandingBalance || 0,
    method: client?.paymentMethod || 'cash',
    reference: '',
    notes: '',
  });
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        company: client.company || '',
        address: client.address || '',
        notes: client.notes || '',
        status: client.status,
        paymentMethod: client.paymentMethod,
        outstandingBalance: client.outstandingBalance,
        archived: client.archived || false,
      });
      setIsEditing(false);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        notes: '',
        status: 'prospect',
        paymentMethod: 'card',
        outstandingBalance: 0,
        archived: false,
      });
      setIsEditing(true);
    }
    setFormErrors({});
  }, [client]);

  useEffect(() => {
    setPaymentData({
      amount: client?.outstandingBalance || 0,
      method: client?.paymentMethod || 'cash',
      reference: '',
      notes: '',
    });
  }, [client]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = (): boolean => {
    const errors: Record<string, string> = {};
    if (!paymentData.amount || paymentData.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    }
    if (client && paymentData.amount > client.outstandingBalance) {
      errors.amount = 'Amount cannot exceed outstanding balance';
    }
    if (paymentData.method === 'check' && !paymentData.reference.trim()) {
      errors.reference = 'Check number is required';
    }
    if (paymentData.method === 'card' && !paymentData.reference.trim()) {
      errors.reference = 'Transaction reference is required';
    }
    if (paymentData.method === 'bank_transfer' && !paymentData.reference.trim()) {
      errors.reference = 'Transfer reference is required';
    }
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updatedClient: Client = {
      id: client?.id || 0,
      ...formData,
      createdAt: client?.createdAt || new Date().toISOString().slice(0, 10),
      totalSpent: client?.totalSpent || 0,
      lastBooking: client?.lastBooking || '',
    };

    onSave(updatedClient);
  };

  const handlePaymentSubmit = () => {
    if (!client) return;
    if (!validatePayment()) return;
    onPayment(client.id, {
      amount: paymentData.amount,
      method: paymentData.method,
      date: new Date().toISOString().slice(0, 10),
      reference: paymentData.reference || undefined,
      notes: paymentData.notes || undefined,
      status: 'completed',
    });
    setPaymentData({
      amount: Math.max(0, (client.outstandingBalance || 0) - paymentData.amount),
      method: client.paymentMethod,
      reference: '',
      notes: '',
    });
  };

  const handleDelete = () => {
    if (client) {
      onDelete(client.id);
    }
    setShowDeleteConfirm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'prospect': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case 'active': return '#ecfdf5';
      case 'inactive': return '#f3f4f6';
      case 'prospect': return '#fffbeb';
      default: return '#f3f4f6';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return '💵';
      case 'check': return '🏦';
      case 'card': return '💳';
      case 'bank_transfer': return '🏛️';
      default: return '💰';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '500px',
          background: '#fff',
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1001,
          overflow: 'auto',
        }}
      >
        {/* Top Actions: Archive/Delete */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '16px 24px 0 24px' }}>
          {client && !client.archived && (
            <button
              onClick={() => setShowArchiveConfirm(true)}
              style={{
                padding: '8px 16px',
                background: '#f59e0b',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Archive
            </button>
          )}
          {client && client.archived && (
            <button
              onClick={() => setShowUnarchiveConfirm(true)}
              style={{
                padding: '8px 16px',
                background: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Unarchive
            </button>
          )}
          {client && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                padding: '8px 16px',
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          )}
        </div>

        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              {client ? client.name : 'New Client'}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#64748b',
                padding: '4px',
              }}
            >
              ×
            </button>
          </div>
          {client && (
            <div style={{ marginTop: '12px' }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                background: getStatusBackgroundColor(client.status),
                color: getStatusColor(client.status),
                textTransform: 'capitalize',
              }}>
                {client.status}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {!isEditing && client ? (
            /* View Mode */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Client Info */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                  Client Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Name</div>
                    <div style={{ fontSize: '16px', color: '#1e293b' }}>{client.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Email</div>
                    <div style={{ fontSize: '16px', color: '#1e293b' }}>{client.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Phone</div>
                    <div style={{ fontSize: '16px', color: '#1e293b' }}>{client.phone}</div>
                  </div>
                  {client.company && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Company</div>
                      <div style={{ fontSize: '16px', color: '#1e293b' }}>{client.company}</div>
                    </div>
                  )}
                  {client.address && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Address</div>
                      <div style={{ fontSize: '16px', color: '#1e293b' }}>{client.address}</div>
                    </div>
                  )}
                  {client.notes && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Notes</div>
                      <div style={{ fontSize: '16px', color: '#1e293b' }}>{client.notes}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Summary */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                  Financial Summary
                </h3>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #e2e8f0',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Total Spent</span>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                      ${client.totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Outstanding Balance</span>
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      color: client.outstandingBalance > 0 ? '#ef4444' : '#10b981' 
                    }}>
                      ${client.outstandingBalance.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Preferred Payment</span>
                    <span style={{ fontSize: '14px', color: '#1e293b' }}>
                      {getPaymentMethodIcon(client.paymentMethod)} {client.paymentMethod.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                  Recent Activity
                </h3>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #e2e8f0',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Last Booking</span>
                    <span style={{ fontSize: '14px', color: '#1e293b' }}>
                      {client.lastBooking ? new Date(client.lastBooking).toLocaleDateString() : 'No bookings'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Member Since</span>
                    <span style={{ fontSize: '14px', color: '#1e293b' }}>
                      {new Date(client.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: '12px 24px',
                    background: '#6366f1',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Edit Client
                </button>
              </div>

              {/* Payment Collection */}
              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                  Collect Payment
                </h3>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '16px',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Amount */}
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                        Payment Amount *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '16px',
                          color: '#64748b',
                        }}>
                          $
                        </span>
                        <input
                          type="number"
                          value={paymentData.amount}
                          onChange={(e) => setPaymentData({ ...paymentData, amount: parseFloat(e.target.value) || 0 })}
                          style={{
                            width: '100%',
                            padding: '12px 12px 12px 32px',
                            borderRadius: '8px',
                            border: paymentErrors.amount ? '1px solid #ef4444' : '1px solid #d1d5db',
                            fontSize: '16px',
                          }}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          max={client.outstandingBalance}
                        />
                      </div>
                      {paymentErrors.amount && (
                        <div style={{ fontSize: '14px', color: '#ef4444', marginTop: '4px' }}>
                          {paymentErrors.amount}
                        </div>
                      )}
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        Maximum: ${client.outstandingBalance.toLocaleString()}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                        Payment Method *
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        {(['cash', 'check', 'card', 'bank_transfer'] as const).map((method) => (
                          <button
                            key={method}
                            onClick={() => setPaymentData({ ...paymentData, method })}
                            style={{
                              padding: '12px',
                              borderRadius: '8px',
                              border: paymentData.method === method ? '2px solid #6366f1' : '1px solid #d1d5db',
                              background: paymentData.method === method ? '#f0f4ff' : '#fff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '14px',
                              fontWeight: 500,
                              color: paymentData.method === method ? '#6366f1' : '#374151',
                            }}
                          >
                            <span style={{ fontSize: '16px' }}>{getPaymentMethodIcon(method)}</span>
                            {method.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reference */}
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                        Reference
                      </label>
                      <input
                        type="text"
                        value={paymentData.reference}
                        onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
                        placeholder={(() => {
                          switch (paymentData.method) {
                            case 'cash': return 'Optional: Receipt number or notes';
                            case 'check': return 'Check number (required)';
                            case 'card': return 'Transaction ID or reference (required)';
                            case 'bank_transfer': return 'Transfer reference or confirmation (required)';
                            default: return 'Reference or notes';
                          }
                        })()}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: paymentErrors.reference ? '1px solid #ef4444' : '1px solid #d1d5db',
                          fontSize: '16px',
                        }}
                      />
                      {paymentErrors.reference && (
                        <div style={{ fontSize: '14px', color: '#ef4444', marginTop: '4px' }}>
                          {paymentErrors.reference}
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                        Notes
                      </label>
                      <textarea
                        value={paymentData.notes}
                        onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                        rows={3}
                        placeholder="Optional notes about this payment..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid #d1d5db',
                          fontSize: '16px',
                          resize: 'vertical',
                        }}
                      />
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '8px',
                    padding: '16px',
                    border: '1px solid #e2e8f0',
                    marginTop: '16px',
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>
                      Payment Summary
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#64748b' }}>Payment Amount</span>
                      <span style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                        ${paymentData.amount.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#64748b' }}>Payment Method</span>
                      <span style={{ fontSize: '14px', color: '#1e293b' }}>
                        {getPaymentMethodIcon(paymentData.method)} {paymentData.method.replace('_', ' ')}
                      </span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      paddingTop: '8px',
                      borderTop: '1px solid #e2e8f0',
                      marginTop: '8px'
                    }}>
                      <span style={{ fontSize: '14px', color: '#64748b' }}>Remaining Balance</span>
                      <span style={{ 
                        fontSize: '16px', 
                        fontWeight: 600, 
                        color: (client.outstandingBalance - paymentData.amount) > 0 ? '#ef4444' : '#10b981' 
                      }}>
                        ${Math.max(0, client.outstandingBalance - paymentData.amount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button
                      onClick={handlePaymentSubmit}
                      style={{
                        padding: '12px 24px',
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        flex: 1,
                      }}
                    >
                      Collect Payment
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                  Payment History
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {payments.filter(p => p.clientId === client.id).length === 0 && (
                    <div style={{ color: '#aaa', fontSize: 16 }}>No payments yet.</div>
                  )}
                  {payments.filter(p => p.clientId === client.id).sort((a, b) => b.date.localeCompare(a.date)).map(payment => (
                    <div key={payment.id} style={{ background: '#f8f9fa', borderRadius: 8, padding: 12, display: 'flex', gap: 16, alignItems: 'center', border: '1px solid #ececec' }}>
                      <span style={{ color: '#888' }}>Date: {payment.date}</span>
                      <span style={{ color: '#34a853', fontWeight: 600 }}>Amount: ${payment.amount}</span>
                      <span style={{ color: '#666' }}>Method: {getPaymentMethodIcon(payment.method)} {payment.method.replace('_', ' ')}</span>
                      {payment.reference && <span style={{ color: '#666' }}>Ref: {payment.reference}</span>}
                      <span style={{ 
                        color: payment.status === 'completed' ? '#34a853' : payment.status === 'pending' ? '#f4b400' : '#e53935',
                        fontWeight: 600,
                        fontSize: 12,
                        background: payment.status === 'completed' ? '#e8f5e8' : payment.status === 'pending' ? '#fffbe6' : '#ffe6e6',
                        padding: '2px 6px',
                        borderRadius: 4
                      }}>
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication History */}
              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                  Communication History
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {communications.length === 0 && (
                    <div style={{ color: '#aaa', fontSize: 16 }}>No communication history yet.</div>
                  )}
                  {communications.map((comm) => (
                    <div key={comm.id} style={{ 
                      background: '#f8fafc', 
                      borderRadius: 8, 
                      padding: 12, 
                      border: '1px solid #e2e8f0',
                      borderLeft: `4px solid ${comm.direction === 'outbound' ? '#6366f1' : '#10b981'}`,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 16 }}>
                            {comm.type === 'text' ? '📱' : comm.type === 'email' ? '📧' : '📞'}
                          </span>
                          <span style={{ 
                            fontSize: 14, 
                            fontWeight: 600, 
                            color: '#374151',
                            textTransform: 'capitalize',
                          }}>
                            {comm.type} {comm.direction}
                          </span>
                          <span style={{ 
                            fontSize: 12, 
                            color: '#64748b',
                            background: '#e2e8f0',
                            padding: '2px 6px',
                            borderRadius: 4,
                          }}>
                            {comm.date} at {comm.time}
                          </span>
                        </div>
                        <span style={{ 
                          fontSize: 12,
                          color: comm.status === 'read' || comm.status === 'answered' ? '#10b981' : 
                                 comm.status === 'delivered' ? '#6366f1' : 
                                 comm.status === 'sent' ? '#f59e0b' : '#ef4444',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                        }}>
                          {comm.status}
                        </span>
                      </div>
                      
                      {comm.subject && (
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>
                          {comm.subject}
                        </div>
                      )}
                      
                      <div style={{ 
                        fontSize: 14, 
                        color: '#64748b',
                        lineHeight: 1.4,
                      }}>
                        {comm.content}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <button
                    style={{
                      padding: '8px 16px',
                      background: '#fff',
                      color: '#6366f1',
                      border: '1px solid #6366f1',
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    View All Communications
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
                {client ? 'Edit Client' : 'New Client'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: formErrors.name ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '16px',
                    }}
                  />
                  {formErrors.name && (
                    <div style={{ fontSize: '14px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: formErrors.email ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '16px',
                    }}
                  />
                  {formErrors.email && (
                    <div style={{ fontSize: '14px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: formErrors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      fontSize: '16px',
                    }}
                  />
                  {formErrors.phone && (
                    <div style={{ fontSize: '14px', color: '#ef4444', marginTop: '4px' }}>
                      {formErrors.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px',
                    }}
                  >
                    <option value="prospect">Prospect</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                    Preferred Payment Method
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px',
                    }}
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '12px 24px',
                    background: '#6366f1',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  {client ? 'Update Client' : 'Create Client'}
                </button>
                <button
                  onClick={() => {
                    if (client) {
                      setIsEditing(false);
                    } else {
                      onClose();
                    }
                  }}
                  style={{
                    padding: '12px 24px',
                    background: '#fff',
                    color: '#64748b',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
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
          zIndex: 1002,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
              Delete Client
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px' }}>
              Are you sure you want to delete <strong>{client?.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleDelete}
                style={{
                  padding: '12px 24px',
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: '12px 24px',
                  background: '#fff',
                  color: '#64748b',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      {showArchiveConfirm && client && (
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
          zIndex: 1002,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
              Archive Client
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px' }}>
              Are you sure you want to archive <strong>{client.name}</strong>? This client will be hidden from the main list but not deleted.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => { onArchive(client.id); setShowArchiveConfirm(false); }}
                style={{
                  padding: '12px 24px',
                  background: '#f59e0b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Archive
              </button>
              <button
                onClick={() => setShowArchiveConfirm(false)}
                style={{
                  padding: '12px 24px',
                  background: '#fff',
                  color: '#64748b',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unarchive Confirmation Modal */}
      {showUnarchiveConfirm && client && (
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
          zIndex: 1002,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
              Unarchive Client
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px' }}>
              Are you sure you want to unarchive <strong>{client.name}</strong>? This client will be visible in the main list again.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => { onUnarchive(client.id); setShowUnarchiveConfirm(false); }}
                style={{
                  padding: '12px 24px',
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Unarchive
              </button>
              <button
                onClick={() => setShowUnarchiveConfirm(false)}
                style={{
                  padding: '12px 24px',
                  background: '#fff',
                  color: '#64748b',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 