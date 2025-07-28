'use client';

import { useRef, useEffect } from 'react';
import type { PurchaseOrder, Vendor } from '../types';

interface PurchaseOrderPDFProps {
  order: PurchaseOrder;
  vendor: Vendor;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    logo?: string;
  };
}

export default function PurchaseOrderPDF({ order, vendor, companyInfo }: PurchaseOrderPDFProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const calculateSubtotal = () => {
    return order.items.reduce((sum, item) => sum + item.totalCost, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#e53935';
      case 'high': return '#ff9800';
      case 'normal': return '#2196f3';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#ff9800';
      case 'sent': return '#2196f3';
      case 'confirmed': return '#4caf50';
      case 'received': return '#8bc34a';
      case 'cancelled': return '#e53935';
      default: return '#ff9800';
    }
  };

  return (
    <div ref={printRef} style={{
      maxWidth: '800px',
      margin: '0 auto',
      background: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      lineHeight: '1.4',
      color: '#333'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '40px',
        borderBottom: '2px solid #333',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 0 8px 0'
          }}>
            {companyInfo.name}
          </h1>
          <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
            <div>{companyInfo.address}</div>
            <div>Phone: {companyInfo.phone}</div>
            <div>Email: {companyInfo.email}</div>
            {companyInfo.website && <div>Website: {companyInfo.website}</div>}
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 0 16px 0'
          }}>
            PURCHASE ORDER
          </h2>
          <div style={{ fontSize: '14px', color: '#666' }}>
            <div><strong>PO Number:</strong> {order.orderNumber}</div>
            <div><strong>Date:</strong> {formatDate(order.orderDate)}</div>
            <div><strong>Status:</strong> 
              <span style={{
                color: getStatusColor(order.status),
                fontWeight: 'bold',
                marginLeft: '4px'
              }}>
                {order.status.toUpperCase()}
              </span>
            </div>
            {order.priority && (
              <div><strong>Priority:</strong> 
                <span style={{
                  color: getPriorityColor(order.priority),
                  fontWeight: 'bold',
                  marginLeft: '4px'
                }}>
                  {order.priority.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Information */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        marginBottom: '40px'
      }}>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 0 12px 0',
            borderBottom: '1px solid #ddd',
            paddingBottom: '4px'
          }}>
            VENDOR INFORMATION
          </h3>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <div style={{ fontWeight: 'bold' }}>{vendor.name}</div>
            <div>Contact: {vendor.contactPerson}</div>
            <div>{vendor.address}</div>
            <div>Phone: {vendor.phone}</div>
            <div>Email: {vendor.email}</div>
            {vendor.website && <div>Website: {vendor.website}</div>}
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 0 12px 0',
            borderBottom: '1px solid #ddd',
            paddingBottom: '4px'
          }}>
            ORDER DETAILS
          </h3>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <div><strong>Expected Delivery:</strong> {formatDate(order.expectedDelivery)}</div>
            <div><strong>Payment Terms:</strong> {order.terms || 'Net 30'}</div>
            <div><strong>Shipping Method:</strong> {order.shippingMethod || 'Standard'}</div>
            {order.approvedBy && (
              <div><strong>Approved By:</strong> {order.approvedBy}</div>
            )}
            {order.approvedAt && (
              <div><strong>Approved Date:</strong> {formatDate(order.approvedAt)}</div>
            )}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333',
          margin: '0 0 12px 0',
          borderBottom: '1px solid #ddd',
          paddingBottom: '4px'
        }}>
          ORDER ITEMS
        </h3>
        
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #ddd'
        }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 8px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Item Description
              </th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 8px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                SKU
              </th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 8px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Qty
              </th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 8px',
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Unit Price
              </th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 8px',
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={item.id} style={{ background: index % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px 8px',
                  fontSize: '12px'
                }}>
                  {item.itemName}
                  {item.description && (
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                      {item.description}
                    </div>
                  )}
                </td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px 8px',
                  textAlign: 'center',
                  fontSize: '12px'
                }}>
                  {item.sku || '-'}
                </td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px 8px',
                  textAlign: 'center',
                  fontSize: '12px'
                }}>
                  {item.quantity}
                </td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px 8px',
                  textAlign: 'right',
                  fontSize: '12px'
                }}>
                  {formatCurrency(item.unitCost)}
                </td>
                <td style={{
                  border: '1px solid #ddd',
                  padding: '12px 8px',
                  textAlign: 'right',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {formatCurrency(item.totalCost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '40px'
      }}>
        <div style={{
          width: '300px',
          border: '1px solid #ddd',
          padding: '16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            <span>Subtotal:</span>
            <span>{formatCurrency(calculateSubtotal())}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            <span>Tax (8%):</span>
            <span>{formatCurrency(calculateTax())}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
            fontWeight: 'bold',
            borderTop: '1px solid #ddd',
            paddingTop: '8px'
          }}>
            <span>Total:</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 0 12px 0',
            borderBottom: '1px solid #ddd',
            paddingBottom: '4px'
          }}>
            NOTES
          </h3>
          <div style={{
            background: '#f8f9fa',
            padding: '16px',
            borderRadius: '4px',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            {order.notes}
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div style={{
        marginBottom: '40px',
        fontSize: '11px',
        color: '#666',
        lineHeight: '1.4'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          margin: '0 0 8px 0'
        }}>
          TERMS AND CONDITIONS
        </h3>
        <div>
          <p>1. All prices are subject to change without notice.</p>
          <p>2. Payment terms are as specified above.</p>
          <p>3. Delivery is expected on or before the specified date.</p>
          <p>4. Returns must be made within 30 days of receipt.</p>
          <p>5. All items must be in original packaging for returns.</p>
          <p>6. This purchase order constitutes a binding agreement.</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTop: '1px solid #ddd',
        paddingTop: '20px',
        fontSize: '12px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            border: '1px solid #ddd',
            width: '200px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            Authorized Signature
          </div>
          <div>Date: _________________</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            border: '1px solid #ddd',
            width: '200px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            Vendor Signature
          </div>
          <div>Date: _________________</div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 20px;
          }
          
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
} 