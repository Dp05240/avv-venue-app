'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import { InventoryTransaction } from '../types';
import { inventoryApi } from '../../../../services/api';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await inventoryApi.getTransactions();
      if (response.data) {
        setTransactions(response.data);
      } else {
        setError(response.error || 'Failed to load transactions');
      }
    } catch (error) {
      setError('An error occurred while loading transactions');
    } finally {
      setLoading(false);
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'in': return { color: '#10b981', background: '#10b98120' };
      case 'out': return { color: '#e74c3c', background: '#fee2e2' };
      case 'adjustment': return { color: '#f59e0b', background: '#fef3c7' };
      case 'damage': return { color: '#dc2626', background: '#fee2e2' };
      case 'expiry': return { color: '#6b7280', background: '#f3f4f6' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading transactions...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      
      <div style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>Inventory Transactions</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>Track all inventory movements and changes</p>
          </div>

          {error && (
            <div style={{ 
              background: '#fee2e2', 
              border: '1px solid #fecaca', 
              borderRadius: '6px', 
              padding: '12px', 
              marginBottom: '24px',
              color: '#dc2626'
            }}>
              {error}
            </div>
          )}

          {/* Transactions Table */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            overflow: 'hidden' 
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#232323' }}>Transaction History</h2>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Item</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Type</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Quantity</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Previous</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>New</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Performed By</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (
                    <tr key={transaction.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#232323' }}>
                          {transaction.itemName}
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          display: 'inline-flex',
                          padding: '4px 8px',
                          fontSize: '12px',
                          fontWeight: '500',
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                          ...getTransactionTypeColor(transaction.type)
                        }}>
                          {transaction.type}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>
                        {transaction.quantity > 0 ? '+' : ''}{transaction.quantity}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>
                        {transaction.previousQuantity}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>
                        {transaction.newQuantity}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>
                        {transaction.performedBy}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {transactions.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '48px', 
                color: '#666'
              }}>
                No transactions found. Transactions will appear here when inventory movements occur.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 