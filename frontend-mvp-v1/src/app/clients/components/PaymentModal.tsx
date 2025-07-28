'use client';

import React, { useState } from 'react';

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

interface PaymentModalProps {
  client: Client;
  onClose: () => void;
  onPayment: (paymentData: Omit<Payment, 'id' | 'clientId'>) => void;
}

export default function PaymentModal({ client, onClose, onPayment }: PaymentModalProps) {
  const [paymentData, setPaymentData] = useState({
    amount: client.outstandingBalance,
    method: 'cash' as 'cash' | 'check' | 'card' | 'bank_transfer',
    reference: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!paymentData.amount || paymentData.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    }

    if (paymentData.amount > client.outstandingBalance) {
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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payment: Omit<Payment, 'id' | 'clientId'> = {
      amount: paymentData.amount,
      method: paymentData.method,
      date: new Date().toISOString().slice(0, 10),
      reference: paymentData.reference || undefined,
      notes: paymentData.notes || undefined,
      status: 'completed',
    };

    onPayment(payment);
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

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash': return 'Cash';
      case 'check': return 'Check';
      case 'card': return 'Credit/Debit Card';
      case 'bank_transfer': return 'Bank Transfer';
      default: return 'Other';
    }
  };

  const getReferencePlaceholder = (method: string) => {
    switch (method) {
      case 'cash': return 'Optional: Receipt number or notes';
      case 'check': return 'Check number (required)';
      case 'card': return 'Transaction ID or reference (required)';
      case 'bank_transfer': return 'Transfer reference or confirmation (required)';
      default: return 'Reference or notes';
    }
  };

  return (
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
      zIndex: 1000,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
            Collect Payment
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b' }}>
            Collect payment from <strong>{client.name}</strong>
          </p>
        </div>

        {/* Client Info */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#64748b' }}>Outstanding Balance</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>
              ${client.outstandingBalance.toLocaleString()}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#64748b' }}>Preferred Method</span>
            <span style={{ fontSize: '14px', color: '#1e293b' }}>
              {getPaymentMethodIcon(client.paymentMethod)} {getPaymentMethodLabel(client.paymentMethod)}
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                  border: formErrors.amount ? '1px solid #ef4444' : '1px solid #d1d5db',
                  fontSize: '16px',
                }}
                placeholder="0.00"
                step="0.01"
                min="0"
                max={client.outstandingBalance}
              />
            </div>
            {formErrors.amount && (
              <div style={{ fontSize: '14px', color: '#ef4444', marginTop: '4px' }}>
                {formErrors.amount}
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
                  {getPaymentMethodLabel(method)}
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
              placeholder={getReferencePlaceholder(paymentData.method)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: formErrors.reference ? '1px solid #ef4444' : '1px solid #d1d5db',
                fontSize: '16px',
              }}
            />
            {formErrors.reference && (
              <div style={{ fontSize: '14px', color: '#ef4444', marginTop: '4px' }}>
                {formErrors.reference}
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

          {/* Payment Summary */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #e2e8f0',
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
                {getPaymentMethodIcon(paymentData.method)} {getPaymentMethodLabel(paymentData.method)}
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
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={handleSubmit}
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
          <button
            onClick={onClose}
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
  );
} 