'use client';

import { useState, useRef } from 'react';
import type { PurchaseOrder, PurchaseOrderItem, Vendor, InventoryItem } from '../types';

interface PurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: PurchaseOrder) => void;
  vendors: Vendor[];
  inventoryItems: InventoryItem[];
  existingOrder?: PurchaseOrder;
}

export default function PurchaseOrderModal({
  isOpen,
  onClose,
  onSave,
  vendors,
  inventoryItems,
  existingOrder
}: PurchaseOrderModalProps) {
  const [formData, setFormData] = useState({
    vendorId: existingOrder?.vendorId || '',
    orderNumber: existingOrder?.orderNumber || generateOrderNumber(),
    orderDate: existingOrder?.orderDate || new Date().toISOString().split('T')[0],
    expectedDelivery: existingOrder?.expectedDelivery || '',
    notes: existingOrder?.notes || '',
    terms: 'Net 30',
    shippingMethod: 'Standard',
    priority: 'normal'
  });

  const [items, setItems] = useState<PurchaseOrderItem[]>(
    existingOrder?.items || []
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PO-${year}${month}${day}-${random}`;
  }

  const addItem = () => {
    const newItem: PurchaseOrderItem = {
      id: Date.now(),
      itemId: 0,
      itemName: '',
      quantity: 1,
      unitCost: 0,
      totalCost: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof PurchaseOrderItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-calculate total cost
    if (field === 'quantity' || field === 'unitCost') {
      updatedItems[index].totalCost = updatedItems[index].quantity * updatedItems[index].unitCost;
    }
    
    // Auto-fill item name if itemId is selected
    if (field === 'itemId' && value) {
      const selectedItem = inventoryItems.find(item => item.id === parseInt(value));
      if (selectedItem) {
        updatedItems[index].itemName = selectedItem.name;
        updatedItems[index].unitCost = selectedItem.cost;
        updatedItems[index].totalCost = updatedItems[index].quantity * selectedItem.cost;
      }
    }
    
    setItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.totalCost, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = () => {
    if (!formData.vendorId || items.length === 0) {
      alert('Please select a vendor and add at least one item');
      return;
    }

    const vendor = vendors.find(v => v.id === parseInt(String(formData.vendorId)));
    if (!vendor) return;

    const order: PurchaseOrder = {
      id: existingOrder?.id || Date.now(),
      vendorId: parseInt(String(formData.vendorId)),
      vendorName: vendor.name,
      orderNumber: formData.orderNumber,
      orderDate: formData.orderDate,
      expectedDelivery: formData.expectedDelivery,
      status: 'draft',
      totalAmount: calculateTotal(),
      notes: formData.notes,
      items: items,
      createdAt: existingOrder?.createdAt || new Date().toISOString().split('T')[0],
      terms: formData.terms,
      shippingMethod: formData.shippingMethod,
      priority: formData.priority as 'low' | 'normal' | 'high' | 'urgent'
    };

    onSave(order);
    onClose();
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      if (printRef.current) {
        window.print();
      }
      setIsPrinting(false);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: 32,
          maxWidth: 1200,
          width: '95%',
          maxHeight: '95vh',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#232323' }}>
              {existingOrder ? 'Edit Purchase Order' : 'Create Purchase Order'}
            </h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handlePrint}
                style={{
                  background: '#6a82fb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                🖨️ Print
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: '#888'
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div style={{ display: 'flex', marginBottom: 24, gap: 8 }}>
            {[1, 2, 3].map(step => (
              <div
                key={step}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: currentStep >= step ? '#6a82fb' : '#f0f0f0',
                  color: currentStep >= step ? '#fff' : '#666',
                  borderRadius: 8,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentStep(step)}
              >
                {step === 1 ? 'Order Details' : step === 2 ? 'Items' : 'Review'}
              </div>
            ))}
          </div>

          {/* Step 1: Order Details */}
          {currentStep === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  Vendor *
                </label>
                              <select
                value={String(formData.vendorId)}
                onChange={(e) => setFormData({...formData, vendorId: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  background: '#fff'
                }}
                required
              >
                  <option value="">Select a vendor</option>
                  {vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name} - {vendor.contactPerson}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  Order Number
                </label>
                <input
                  type="text"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#fff'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  Order Date
                </label>
                <input
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#fff'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  Expected Delivery
                </label>
                <input
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#fff'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  Payment Terms
                </label>
                <select
                  value={formData.terms}
                  onChange={(e) => setFormData({...formData, terms: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#fff'
                  }}
                >
                  <option value="Net 30">Net 30</option>
                  <option value="Net 15">Net 15</option>
                  <option value="Due on Receipt">Due on Receipt</option>
                  <option value="Net 60">Net 60</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  Shipping Method
                </label>
                <select
                  value={formData.shippingMethod}
                  onChange={(e) => setFormData({...formData, shippingMethod: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#fff'
                  }}
                >
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                  <option value="Overnight">Overnight</option>
                  <option value="Pickup">Pickup</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#fff'
                  }}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#fff',
                    resize: 'vertical'
                  }}
                  placeholder="Additional notes or special instructions..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Items */}
          {currentStep === 2 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>Order Items</h3>
                <button
                  onClick={addItem}
                  style={{
                    background: '#6a82fb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 14,
                    cursor: 'pointer'
                  }}
                >
                  + Add Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map((item, index) => (
                  <div key={item.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                    gap: 12,
                    padding: 16,
                    background: '#f8f9fa',
                    borderRadius: 8,
                    alignItems: 'center'
                  }}>
                    <select
                      value={item.itemId}
                      onChange={(e) => updateItem(index, 'itemId', parseInt(e.target.value))}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: 4,
                        fontSize: 14
                      }}
                    >
                      <option value={0}>Select Item</option>
                      {inventoryItems.map(invItem => (
                        <option key={invItem.id} value={invItem.id}>
                          {invItem.name} - ${invItem.cost}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: 4,
                        fontSize: 14
                      }}
                    />

                    <input
                      type="number"
                      value={item.unitCost}
                      onChange={(e) => updateItem(index, 'unitCost', parseFloat(e.target.value) || 0)}
                      step="0.01"
                      min="0"
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: 4,
                        fontSize: 14
                      }}
                    />

                    <div style={{ fontWeight: 600, color: '#333' }}>
                      ${item.totalCost.toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      style={{
                        background: '#e53935',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '6px 10px',
                        fontSize: 12,
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {items.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  No items added yet. Click "Add Item" to get started.
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 16 }}>Review Order</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 12 }}>Order Information</h4>
                  <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Order Number:</strong> {formData.orderNumber}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Vendor:</strong> {vendors.find(v => v.id === parseInt(String(formData.vendorId)))?.name}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Order Date:</strong> {formData.orderDate}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Expected Delivery:</strong> {formData.expectedDelivery}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Terms:</strong> {formData.terms}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>Shipping:</strong> {formData.shippingMethod}
                    </div>
                    <div>
                      <strong>Priority:</strong> {formData.priority}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 12 }}>Order Summary</h4>
                  <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>Subtotal:</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>Tax (8%):</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, borderTop: '1px solid #ddd', paddingTop: 8 }}>
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 12 }}>Items</h4>
                <div style={{ background: '#f8f9fa', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12, padding: '12px 16px', background: '#e9ecef', fontWeight: 600 }}>
                    <div>Item</div>
                    <div>Quantity</div>
                    <div>Unit Cost</div>
                    <div>Total</div>
                  </div>
                  {items.map((item, index) => (
                    <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12, padding: '12px 16px', borderBottom: index < items.length - 1 ? '1px solid #ddd' : 'none' }}>
                      <div>{item.itemName}</div>
                      <div>{item.quantity}</div>
                      <div>${item.unitCost.toFixed(2)}</div>
                      <div style={{ fontWeight: 600 }}>${item.totalCost.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              style={{
                background: currentStep === 1 ? '#f0f0f0' : '#6a82fb',
                color: currentStep === 1 ? '#999' : '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: 14,
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>

            <div style={{ display: 'flex', gap: 12 }}>
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  style={{
                    background: '#6a82fb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: 14,
                    cursor: 'pointer'
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{
                    background: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: 14,
                    cursor: 'pointer'
                  }}
                >
                  {existingOrder ? 'Update Order' : 'Create Order'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Print View */}
      {isPrinting && (
        <div ref={printRef} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#fff',
          zIndex: 2000,
          padding: '40px',
          display: 'none'
        }}>
          {/* Print content will be rendered here */}
        </div>
      )}
    </>
  );
} 