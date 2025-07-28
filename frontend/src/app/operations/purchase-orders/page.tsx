'use client';

import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { inventoryApi } from '../../../services/api';
import type { PurchaseOrder, Vendor, InventoryItem, PurchaseOrderItem } from './types';

interface PurchaseOrderAnalytics {
  totalOrders: number;
  totalSpent: number;
  pendingOrders: number;
  confirmedOrders: number;
  receivedOrders: number;
  vendorStats: Array<{
    vendorId: number;
    vendorName: string;
    totalOrders: number;
    totalSpent: number;
    avgOrderValue: number;
    lastOrderDate: string | null;
  }>;
}

export default function PurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [analytics, setAnalytics] = useState<PurchaseOrderAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // UI States
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'drafts'>('overview');
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [showPDFModal, setShowPDFModal] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form States
  const [formData, setFormData] = useState({
    vendorId: '',
    orderNumber: generateOrderNumber(),
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: '',
    notes: '',
    terms: 'Net 30',
    shippingMethod: 'Standard',
    priority: 'normal'
  });
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);
  
  // Item Selection States
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [filteredInventoryItems, setFilteredInventoryItems] = useState<InventoryItem[]>([]);
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemCost, setNewItemCost] = useState(0);
  const [itemSearchTerm, setItemSearchTerm] = useState('');
  const [showItemDropdown, setShowItemDropdown] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredInventoryItems(inventoryItems);
  }, [inventoryItems]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [ordersRes, vendorsRes, itemsRes, analyticsRes] = await Promise.all([
        fetch('http://localhost:4000/api/purchase-orders'),
        fetch('http://localhost:4000/api/vendors'),
        fetch('http://localhost:4000/api/inventory/items'),
        fetch('http://localhost:4000/api/purchase-orders/analytics')
      ]);

      if (ordersRes.ok) setPurchaseOrders(await ordersRes.json());
      if (vendorsRes.ok) setVendors(await vendorsRes.json());
      if (itemsRes.ok) setInventoryItems(await itemsRes.json());
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PO-${year}${month}${day}-${random}`;
  }

  const handleCreateOrder = async () => {
    if (!formData.vendorId || orderItems.length === 0) {
      alert('Please select a vendor and add at least one item');
      return;
    }

    const vendor = vendors.find(v => v.id === parseInt(formData.vendorId));
    if (!vendor) return;

    const totalAmount = orderItems.reduce((sum, item) => sum + item.totalCost, 0);

    const order: PurchaseOrder = {
      id: Date.now(),
      vendorId: parseInt(formData.vendorId),
      vendorName: vendor.name,
      orderNumber: formData.orderNumber,
      orderDate: formData.orderDate,
      expectedDelivery: formData.expectedDelivery,
      status: 'draft',
      totalAmount,
      notes: formData.notes,
      items: orderItems,
      createdAt: new Date().toISOString(),
      terms: formData.terms,
      shippingMethod: formData.shippingMethod,
      priority: formData.priority as 'low' | 'normal' | 'high' | 'urgent'
    };

    try {
      const response = await fetch('http://localhost:4000/api/purchase-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        await fetchData();
        setActiveTab('overview');
        resetForm();
        alert('Purchase order created successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      alert('Failed to create purchase order');
    }
  };

  const handleSmartAutoDraft = async () => {
    try {
      setLoading(true);
      
      // Get low stock items
      const lowStockResponse = await inventoryApi.getLowStockItems();
      if (!lowStockResponse.data) {
        setError('Failed to fetch low stock items');
        return;
      }

      const lowStockItems = lowStockResponse.data;
      
      if (lowStockItems.length === 0) {
        alert('No items need reordering at this time!');
        return;
      }

      // Group items by preferred vendor or fallback to reorderVendor
      const itemsByVendor = new Map<string | number, any[]>();
      
      lowStockItems.forEach(item => {
        // Use preferred vendor if available, otherwise use reorderVendor string
        const vendorId = (item as any).preferredVendorId || 0;
        const vendorKey = vendorId || item.reorderVendor || 'Unknown Vendor';
        
        if (!itemsByVendor.has(vendorKey)) {
          itemsByVendor.set(vendorKey, []);
        }
        itemsByVendor.get(vendorKey)!.push(item);
      });

      // Create draft orders for each vendor
      const draftOrders: PurchaseOrder[] = [];
      
      for (const [vendorKey, items] of itemsByVendor) {
        const orderItems = items.map(item => ({
          id: Date.now() + Math.random(),
          itemId: item.id,
          itemName: item.name,
          quantity: Math.max(0, item.minQuantity - item.quantity), // Calculate reorder quantity
          unitCost: item.cost,
          totalCost: Math.max(0, item.minQuantity - item.quantity) * item.cost,
          sku: item.sku,
          description: item.description
        }));

        const totalAmount = orderItems.reduce((sum, item) => sum + item.totalCost, 0);
        
        if (totalAmount > 0) {
          // Find vendor details
          let vendorName = 'Unknown Vendor';
          let vendorId = 0;
          let terms = 'Net 30';
          let shippingMethod = 'Standard';
          
          if (typeof vendorKey === 'number' && vendorKey > 0) {
            const vendor = vendors.find(v => v.id === vendorKey);
            if (vendor) {
              vendorName = vendor.name;
              vendorId = vendor.id;
              terms = vendor.preferredPaymentTerms || 'Net 30';
              shippingMethod = vendor.preferredShippingMethod || 'Standard';
            }
          } else {
            vendorName = vendorKey as string;
          }
          
          const draftOrder: PurchaseOrder = {
            id: Date.now() + Math.random(),
            vendorId: vendorId,
            vendorName: vendorName,
            orderNumber: generateOrderNumber(),
            orderDate: new Date().toISOString().split('T')[0],
            expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
            status: 'draft',
            totalAmount: totalAmount,
            notes: `Smart auto-generated draft using preferred vendors. Review and adjust quantities as needed.`,
            items: orderItems,
            createdAt: new Date().toISOString(),
            terms: terms,
            shippingMethod: shippingMethod,
            priority: 'normal'
          };
          
          draftOrders.push(draftOrder);
        }
      }

      // Show the first draft order for review
      if (draftOrders.length > 0) {
        setSelectedOrder(draftOrders[0]);
        setShowPDFModal(true);
      }
      
    } catch (err) {
      setError('Failed to generate auto-draft');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      vendorId: '',
      orderNumber: generateOrderNumber(),
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: '',
      notes: '',
      terms: 'Net 30',
      shippingMethod: 'Standard',
      priority: 'normal'
    });
    setOrderItems([]);
    setSelectedItem(null);
    setFilteredInventoryItems(inventoryItems);
    setNewItemQuantity(1);
    setNewItemCost(0);
    setItemSearchTerm('');
    setShowItemDropdown(false);
  };

  const addSelectedItem = () => {
    if (!selectedItem) return;
    
    const newItem: PurchaseOrderItem = {
      id: Date.now(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      quantity: newItemQuantity,
      unitCost: newItemCost,
      totalCost: newItemQuantity * newItemCost,
      sku: selectedItem.sku,
      description: selectedItem.description
    };
    
    setOrderItems([...orderItems, newItem]);
    setSelectedItem(null);
    setNewItemQuantity(1);
    setNewItemCost(0);
    setItemSearchTerm('');
    setShowItemDropdown(false);
  };

  const addItem = () => {
    const newItem: PurchaseOrderItem = {
      id: Date.now(),
      itemId: 0,
      itemName: '',
      quantity: 1,
      unitCost: 0,
      totalCost: 0
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof PurchaseOrderItem, value: any) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'unitCost') {
      updatedItems[index].totalCost = updatedItems[index].quantity * updatedItems[index].unitCost;
    }
    
    if (field === 'itemId' && value) {
      const selectedItem = inventoryItems.find(item => item.id === parseInt(value));
      if (selectedItem) {
        updatedItems[index].itemName = selectedItem.name;
        updatedItems[index].unitCost = selectedItem.cost;
        updatedItems[index].totalCost = updatedItems[index].quantity * selectedItem.cost;
      }
    }
    
    setOrderItems(updatedItems);
  };

  const handleUpdateStatus = async (orderId: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/purchase-orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await fetchData();
        alert(`Order status updated to ${status}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const handleViewOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setShowPDFModal(true);
  };

  const handlePrintOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setShowPDFModal(true);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#e53935';
      case 'high': return '#ff9800';
      case 'normal': return '#2196f3';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
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
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredOrders = purchaseOrders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (vendorFilter !== 'all' && order.vendorId !== parseInt(vendorFilter)) return false;
    if (priorityFilter !== 'all' && order.priority !== priorityFilter) return false;
    if (searchTerm && !order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.vendorName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 18, color: '#666' }}>Loading purchase orders...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ flex: 1, minHeight: 500, padding: '0 32px' }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            padding: '32px 40px',
            margin: '40px 0',
            color: '#232323',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#333' }}>
                  Purchase Orders
                </h1>
                <div style={{ fontSize: 18, color: '#666' }}>
                  Manage and track all purchase orders in one place
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={handleSmartAutoDraft}
                  style={{
                    background: 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '12px 24px',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  🤖 Smart Auto-Draft
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  style={{
                    background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '12px 24px',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  + New Purchase Order
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: '2px solid #f0f0f0' }}>
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'create', label: 'Create Order', icon: '✏️' },
                { id: 'drafts', label: 'Drafts', icon: '📝' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '12px 20px',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: activeTab === tab.id ? '#6a82fb' : '#666',
                    borderBottom: activeTab === tab.id ? '3px solid #6a82fb' : '3px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Analytics Dashboard */}
                {analytics && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: 20, 
                    marginBottom: 32 
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      borderRadius: 12,
                      padding: 20,
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                        {analytics.totalOrders}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>Total Orders</div>
                    </div>
                    
                    <div style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: '#fff',
                      borderRadius: 12,
                      padding: 20,
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                        {formatCurrency(analytics.totalSpent)}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>Total Spent</div>
                    </div>
                    
                    <div style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: '#fff',
                      borderRadius: 12,
                      padding: 20,
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                        {analytics.pendingOrders}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>Pending Orders</div>
                    </div>
                    
                    <div style={{
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      color: '#fff',
                      borderRadius: 12,
                      padding: 20,
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                        {analytics.receivedOrders}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>Received Orders</div>
                    </div>
                  </div>
                )}

                {/* Filters */}
                <div style={{ 
                  display: 'flex', 
                  gap: 16, 
                  marginBottom: 24, 
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 14,
                      minWidth: 200,
                    }}
                  />
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 14,
                      background: '#fff',
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="received">Received</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  
                  <select
                    value={vendorFilter}
                    onChange={(e) => setVendorFilter(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 14,
                      background: '#fff',
                    }}
                  >
                    <option value="all">All Vendors</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                    ))}
                  </select>
                  
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 14,
                      background: '#fff',
                    }}
                  >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                {/* Orders List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {filteredOrders.map(order => {
                    const vendor = vendors.find(v => v.id === order.vendorId);
                    return (
                      <div key={order.id} style={{
                        background: '#f8f9fa',
                        borderRadius: 12,
                        padding: 20,
                        border: '1px solid #e9ecef',
                        position: 'relative'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                          <div>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#232323', marginBottom: 4 }}>
                              {order.orderNumber}
                            </h3>
                            <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
                              {vendor?.name || order.vendorName}
                            </p>
                          </div>
                          
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 500,
                                background: getStatusColor(order.status),
                                color: '#fff'
                              }}>
                                {order.status.toUpperCase()}
                              </span>
                              {order.priority && (
                                <span style={{
                                  padding: '4px 12px',
                                  borderRadius: 12,
                                  fontSize: 12,
                                  fontWeight: 500,
                                  background: getPriorityColor(order.priority),
                                  color: '#fff'
                                }}>
                                  {order.priority.toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: '#232323' }}>
                              {formatCurrency(order.totalAmount)}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
                          <div>
                            <strong style={{ fontSize: 14, color: '#666' }}>Order Date:</strong>
                            <div style={{ fontSize: 14, color: '#232323' }}>{formatDate(order.orderDate)}</div>
                          </div>
                          <div>
                            <strong style={{ fontSize: 14, color: '#666' }}>Expected Delivery:</strong>
                            <div style={{ fontSize: 14, color: '#232323' }}>{formatDate(order.expectedDelivery)}</div>
                          </div>
                          <div>
                            <strong style={{ fontSize: 14, color: '#666' }}>Items:</strong>
                            <div style={{ fontSize: 14, color: '#232323' }}>{order.items.length} items</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleViewOrder(order)}
                            style={{
                              background: '#4CAF50',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              padding: '6px 12px',
                              fontSize: 12,
                              cursor: 'pointer'
                            }}
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handlePrintOrder(order)}
                            style={{
                              background: '#6a82fb',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              padding: '6px 12px',
                              fontSize: 12,
                              cursor: 'pointer'
                            }}
                          >
                            🖨️ Print
                          </button>
                          
                          {order.status === 'draft' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'sent')}
                              style={{
                                background: '#2196f3',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '6px 12px',
                                fontSize: 12,
                                cursor: 'pointer'
                              }}
                            >
                              📤 Send
                            </button>
                          )}
                          
                          {order.status === 'sent' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                              style={{
                                background: '#4caf50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '6px 12px',
                                fontSize: 12,
                                cursor: 'pointer'
                              }}
                            >
                              ✅ Confirm
                            </button>
                          )}
                          
                          {order.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'received')}
                              style={{
                                background: '#8bc34a',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '6px 12px',
                                fontSize: 12,
                                cursor: 'pointer'
                              }}
                            >
                              📦 Receive
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {filteredOrders.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
                      No purchase orders found matching your criteria.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Create Order Tab */}
            {activeTab === 'create' && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {/* Order Details Section */}
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: '#333', marginBottom: 24 }}>
                      Order Details
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                          Vendor *
                        </label>
                        <select
                          value={formData.vendorId}
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
                    </div>

                    <div style={{ marginTop: 20 }}>
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

                  {/* Items Section */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 600, color: '#333' }}>
                        Order Items
                      </h3>
                    </div>

                    {/* Item Search and Add */}
                    <div style={{ 
                      display: 'flex', 
                      gap: 12, 
                      marginBottom: 24,
                      flexWrap: 'wrap',
                      alignItems: 'flex-end'
                    }}>
                      <div style={{ flex: 1, minWidth: 300 }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                          Select Item
                        </label>
                        <div style={{ position: 'relative' }}>
                          <div
                            onClick={() => setShowItemDropdown(!showItemDropdown)}
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: '2px solid #e0e0e0',
                              borderRadius: 8,
                              fontSize: 14,
                              background: '#fff',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              minHeight: '20px'
                            }}
                          >
                            <span style={{ color: selectedItem ? '#333' : '#999' }}>
                              {selectedItem ? selectedItem.name : 'Select an item...'}
                            </span>
                            <span style={{ fontSize: 12, color: '#666' }}>▼</span>
                          </div>
                          
                          {/* Item Dropdown with Search */}
                          {showItemDropdown && (
                            <div style={{ 
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              right: 0,
                              maxHeight: 400,
                              border: '1px solid #e0e0e0',
                              borderRadius: 8,
                              background: '#fff',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                              zIndex: 1000,
                              marginTop: 4
                            }}>
                              {/* Search Box Inside Dropdown */}
                              <div style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                                <input
                                  type="text"
                                  placeholder="Search items..."
                                  value={itemSearchTerm}
                                  onChange={(e) => {
                                    const term = e.target.value;
                                    setItemSearchTerm(term);
                                    if (term.trim() === '') {
                                      setFilteredInventoryItems(inventoryItems);
                                    } else {
                                      const filteredItems = inventoryItems.filter(item => 
                                        item.name.toLowerCase().includes(term.toLowerCase()) ||
                                        item.sku.toLowerCase().includes(term.toLowerCase()) ||
                                        (item.description && item.description.toLowerCase().includes(term.toLowerCase()))
                                      );
                                      setFilteredInventoryItems(filteredItems);
                                    }
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: 4,
                                    fontSize: 14,
                                    background: '#fff'
                                  }}
                                />
                              </div>
                              
                              {/* Items List */}
                              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                                {filteredInventoryItems.map(item => (
                                  <div
                                    key={item.id}
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setNewItemCost(item.cost);
                                      setItemSearchTerm('');
                                      setShowItemDropdown(false);
                                    }}
                                    style={{
                                      padding: '12px 16px',
                                      cursor: 'pointer',
                                      borderBottom: '1px solid #f0f0f0',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      backgroundColor: selectedItem?.id === item.id ? '#f0f8ff' : '#fff',
                                      transition: 'background-color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = '#f0f8ff';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = selectedItem?.id === item.id ? '#f0f8ff' : '#fff';
                                    }}
                                  >
                                    <div>
                                      <div style={{ fontWeight: 600, color: '#333' }}>{item.name}</div>
                                      <div style={{ fontSize: 12, color: '#666' }}>SKU: {item.sku}</div>
                                      {item.description && (
                                        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                                          {item.description.substring(0, 50)}...
                                        </div>
                                      )}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                      <div style={{ fontWeight: 600, color: '#333' }}>${item.cost}</div>
                                      <div style={{ fontSize: 12, color: '#666' }}>Stock: {item.quantity}</div>
                                    </div>
                                  </div>
                                ))}
                                
                                {filteredInventoryItems.length === 0 && (
                                  <div style={{ 
                                    padding: '12px 16px', 
                                    color: '#666', 
                                    fontSize: 14,
                                    textAlign: 'center'
                                  }}>
                                    No items found
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ minWidth: 120 }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={newItemQuantity}
                          onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
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
                      <div style={{ minWidth: 120 }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                          Unit Cost
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={newItemCost}
                          onChange={(e) => setNewItemCost(parseFloat(e.target.value) || 0)}
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
                      <button
                        onClick={addSelectedItem}
                        disabled={!selectedItem || newItemQuantity <= 0 || newItemCost <= 0}
                        style={{
                          background: !selectedItem || newItemQuantity <= 0 || newItemCost <= 0 ? '#ccc' : '#6a82fb',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '12px 24px',
                          fontSize: 14,
                          cursor: !selectedItem || newItemQuantity <= 0 || newItemCost <= 0 ? 'not-allowed' : 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        + Add Item
                      </button>
                    </div>

                    {/* Selected Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                      {orderItems.map((item, index) => (
                        <div key={item.id} style={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                          gap: 12,
                          padding: 16,
                          background: '#f8f9fa',
                          borderRadius: 8,
                          alignItems: 'center'
                        }}>
                          <div>
                            <div style={{ fontWeight: 600, color: '#333' }}>{item.itemName}</div>
                            <div style={{ fontSize: 12, color: '#666' }}>SKU: {item.sku || 'N/A'}</div>
                          </div>

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

                    {orderItems.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '40px', color: '#666', background: '#f8f9fa', borderRadius: 8 }}>
                        No items added yet. Search and select items above to get started.
                      </div>
                    )}

                    {/* Order Summary */}
                    {orderItems.length > 0 && (
                      <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8 }}>
                        <h4 style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 16 }}>
                          Order Summary
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
                          <span>Total:</span>
                          <span>${orderItems.reduce((sum, item) => sum + item.totalCost, 0).toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setActiveTab('overview')}
                        style={{
                          background: '#f0f0f0',
                          color: '#666',
                          border: 'none',
                          borderRadius: 8,
                          padding: '12px 24px',
                          fontSize: 14,
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateOrder}
                        disabled={!formData.vendorId || orderItems.length === 0}
                        style={{
                          background: !formData.vendorId || orderItems.length === 0 ? '#ccc' : '#4CAF50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '12px 24px',
                          fontSize: 14,
                          cursor: !formData.vendorId || orderItems.length === 0 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Create Purchase Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Drafts Tab */}
            {activeTab === 'drafts' && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#333', marginBottom: 24 }}>
                  Draft Purchase Orders
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {filteredOrders.filter(order => order.status === 'draft').map(order => {
                    const vendor = vendors.find(v => v.id === order.vendorId);
                    return (
                      <div key={order.id} style={{
                        background: '#f8f9fa',
                        borderRadius: 12,
                        padding: 20,
                        border: '1px solid #e9ecef',
                        position: 'relative'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                          <div>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#232323', marginBottom: 4 }}>
                              {order.orderNumber}
                            </h3>
                            <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
                              {vendor?.name || order.vendorName}
                            </p>
                          </div>
                          
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 500,
                                background: getStatusColor(order.status),
                                color: '#fff'
                              }}>
                                DRAFT
                              </span>
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: '#232323' }}>
                              {formatCurrency(order.totalAmount)}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleViewOrder(order)}
                            style={{
                              background: '#4CAF50',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              padding: '6px 12px',
                              fontSize: 12,
                              cursor: 'pointer'
                            }}
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handlePrintOrder(order)}
                            style={{
                              background: '#6a82fb',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              padding: '6px 12px',
                              fontSize: 12,
                              cursor: 'pointer'
                            }}
                          >
                            🖨️ Print
                          </button>
                          
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'sent')}
                            style={{
                              background: '#2196f3',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              padding: '6px 12px',
                              fontSize: 12,
                              cursor: 'pointer'
                            }}
                          >
                            📤 Send Order
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  
                  {filteredOrders.filter(order => order.status === 'draft').length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
                      No draft purchase orders found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {showPDFModal && selectedOrder && (
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
            maxWidth: '90%',
            maxHeight: '90%',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#232323' }}>
                Purchase Order Preview - {selectedOrder.orderNumber}
              </h2>
              <button
                onClick={() => setShowPDFModal(false)}
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
            
            <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 16 }}>
                Purchase Order Preview
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <strong>Order Number:</strong> {selectedOrder.orderNumber}
                </div>
                <div>
                  <strong>Vendor:</strong> {selectedOrder.vendorName}
                </div>
                <div>
                  <strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}
                </div>
                <div>
                  <strong>Expected Delivery:</strong> {formatDate(selectedOrder.expectedDelivery)}
                </div>
                <div>
                  <strong>Total Amount:</strong> {formatCurrency(selectedOrder.totalAmount)}
                </div>
                <div>
                  <strong>Status:</strong> {selectedOrder.status.toUpperCase()}
                </div>
              </div>
              
              <div>
                <strong style={{ display: 'block', marginBottom: 8 }}>Items:</strong>
                {selectedOrder.items.map((item, index) => (
                  <div key={item.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '4px 0',
                    borderBottom: index < selectedOrder.items.length - 1 ? '1px solid #ddd' : 'none'
                  }}>
                    <span>{item.itemName}</span>
                    <span>{item.quantity} × ${item.unitCost.toFixed(2)} = ${item.totalCost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 