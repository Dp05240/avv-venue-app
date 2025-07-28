'use client';

import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import type { Vendor, PurchaseOrder, InventoryItem } from '../purchase-orders/types';

interface VendorAnalytics {
  totalVendors: number;
  totalSpent: number;
  activeVendors: number;
  averageOrderValue: number;
  topVendors: Array<{
    vendorId: number;
    vendorName: string;
    totalOrders: number;
    totalSpent: number;
    averageDeliveryTime: number;
    lastOrderDate: string;
  }>;
}

interface VendorHistory {
  orderId: number;
  orderNumber: string;
  orderDate: string;
  items: Array<{
    itemId: number;
    itemName: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
  }>;
  totalAmount: number;
  status: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [analytics, setAnalytics] = useState<VendorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // UI States
  const [activeTab, setActiveTab] = useState<'overview' | 'add'>('overview');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [vendorHistory, setVendorHistory] = useState<VendorHistory[]>([]);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    notes: '',
    preferredPaymentTerms: 'Net 30',
    preferredShippingMethod: 'Standard',
    rating: 5,
    isActive: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [vendorsRes, ordersRes, itemsRes, analyticsRes] = await Promise.all([
        fetch('http://localhost:4000/api/vendors'),
        fetch('http://localhost:4000/api/purchase-orders'),
        fetch('http://localhost:4000/api/inventory/items'),
        fetch('http://localhost:4000/api/vendors/analytics')
      ]);

      if (vendorsRes.ok) setVendors(await vendorsRes.json());
      if (ordersRes.ok) setPurchaseOrders(await ordersRes.json());
      if (itemsRes.ok) setInventoryItems(await itemsRes.json());
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVendor = async () => {
    if (!formData.name || !formData.contactPerson || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchData();
        setActiveTab('overview');
        resetForm();
        alert('Vendor created successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      alert('Failed to create vendor');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      notes: '',
      preferredPaymentTerms: 'Net 30',
      preferredShippingMethod: 'Standard',
      rating: 5,
      isActive: true
    });
  };

  const handleViewVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    
    // Get vendor's purchase history
    const vendorOrders = purchaseOrders.filter(order => order.vendorId === vendor.id);
    const history: VendorHistory[] = vendorOrders.map(order => ({
      orderId: order.id,
      orderNumber: order.orderNumber,
      orderDate: order.orderDate,
      items: order.items,
      totalAmount: order.totalAmount,
      status: order.status
    }));
    
    setVendorHistory(history);
    setShowVendorModal(true);
  };

  const getVendorRating = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
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

  const getVendorStats = (vendorId: number) => {
    const vendorOrders = purchaseOrders.filter(order => order.vendorId === vendorId);
    const totalOrders = vendorOrders.length;
    const totalSpent = vendorOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
    const lastOrder = vendorOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())[0];
    
    return {
      totalOrders,
      totalSpent,
      avgOrderValue,
      lastOrderDate: lastOrder ? formatDate(lastOrder.orderDate) : 'Never'
    };
  };

  const filteredVendors = vendors.filter(vendor => {
    if (searchTerm && !vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (statusFilter === 'active' && !vendor.isActive) return false;
    if (statusFilter === 'inactive' && vendor.isActive) return false;
    return true;
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 18, color: '#666' }}>Loading vendors...</div>
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
                  Vendor Management
                </h1>
                <div style={{ fontSize: 18, color: '#666' }}>
                  Manage vendors and track purchase history
                </div>
              </div>
              <button
                onClick={() => setActiveTab('add')}
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
                + Add Vendor
              </button>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: '2px solid #f0f0f0' }}>
              {[
                { id: 'overview', label: 'Vendors', icon: '🏢' },
                { id: 'add', label: 'Add Vendor', icon: '➕' }
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
                        {analytics.totalVendors}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>Total Vendors</div>
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
                        {analytics.activeVendors}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>Active Vendors</div>
                    </div>
                    
                    <div style={{
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      color: '#fff',
                      borderRadius: 12,
                      padding: 20,
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                        {formatCurrency(analytics.averageOrderValue)}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>Avg Order Value</div>
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
                    placeholder="Search vendors..."
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
                    <option value="all">All Vendors</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>

                {/* Vendors List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {filteredVendors.map(vendor => {
                    const stats = getVendorStats(vendor.id);
                    return (
                      <div key={vendor.id} style={{
                        background: '#f8f9fa',
                        borderRadius: 12,
                        padding: 20,
                        border: '1px solid #e9ecef',
                        position: 'relative'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                          <div>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#232323', marginBottom: 4 }}>
                              {vendor.name}
                            </h3>
                            <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
                              {vendor.contactPerson} • {vendor.email}
                            </p>
                            <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0 0' }}>
                              {vendor.phone} • {vendor.address}
                            </p>
                            <div style={{ marginTop: 8 }}>
                              {getVendorRating(vendor.rating || 5)}
                            </div>
                          </div>
                          
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                              <span style={{
                                padding: '4px 12px',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 500,
                                background: vendor.isActive ? '#4caf50' : '#e53935',
                                color: '#fff'
                              }}>
                                {vendor.isActive ? 'ACTIVE' : 'INACTIVE'}
                              </span>
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: '#232323' }}>
                              {formatCurrency(stats.totalSpent)}
                            </div>
                            <div style={{ fontSize: 12, color: '#666' }}>
                              {stats.totalOrders} orders
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
                          <div>
                            <strong style={{ fontSize: 14, color: '#666' }}>Total Orders:</strong>
                            <div style={{ fontSize: 14, color: '#232323' }}>{stats.totalOrders}</div>
                          </div>
                          <div>
                            <strong style={{ fontSize: 14, color: '#666' }}>Total Spent:</strong>
                            <div style={{ fontSize: 14, color: '#232323' }}>{formatCurrency(stats.totalSpent)}</div>
                          </div>
                          <div>
                            <strong style={{ fontSize: 14, color: '#666' }}>Avg Order Value:</strong>
                            <div style={{ fontSize: 14, color: '#232323' }}>{formatCurrency(stats.avgOrderValue)}</div>
                          </div>
                          <div>
                            <strong style={{ fontSize: 14, color: '#666' }}>Last Order:</strong>
                            <div style={{ fontSize: 14, color: '#232323' }}>{stats.lastOrderDate}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleViewVendor(vendor)}
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
                            👁️ View History
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  
                  {filteredVendors.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
                      No vendors found matching your criteria.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Add Vendor Tab */}
            {activeTab === 'add' && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#333', marginBottom: 24 }}>
                  Add New Vendor
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: 8,
                        fontSize: 14,
                        background: '#fff'
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: 8,
                        fontSize: 14,
                        background: '#fff'
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: 8,
                        fontSize: 14,
                        background: '#fff'
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
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
                      Rating
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: 8,
                        fontSize: 14,
                        background: '#fff'
                      }}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                      <option value={4}>⭐⭐⭐⭐ Good</option>
                      <option value={3}>⭐⭐⭐ Average</option>
                      <option value={2}>⭐⭐ Fair</option>
                      <option value={1}>⭐ Poor</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                      Preferred Payment Terms
                    </label>
                    <select
                      value={formData.preferredPaymentTerms}
                      onChange={(e) => setFormData({...formData, preferredPaymentTerms: e.target.value})}
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
                      Preferred Shipping Method
                    </label>
                    <select
                      value={formData.preferredShippingMethod}
                      onChange={(e) => setFormData({...formData, preferredShippingMethod: e.target.value})}
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

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#333' }}>
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: 8,
                        fontSize: 14,
                        background: '#fff',
                        resize: 'vertical'
                      }}
                    />
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
                      placeholder="Additional notes about this vendor..."
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#333' }}>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        style={{ width: 16, height: 16 }}
                      />
                      Active Vendor
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'flex-end' }}>
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
                    onClick={handleCreateVendor}
                    disabled={!formData.name || !formData.contactPerson || !formData.email}
                    style={{
                      background: !formData.name || !formData.contactPerson || !formData.email ? '#ccc' : '#4CAF50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '12px 24px',
                      fontSize: 14,
                      cursor: !formData.name || !formData.contactPerson || !formData.email ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Create Vendor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor History Modal */}
      {showVendorModal && selectedVendor && (
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
                {selectedVendor.name} - Purchase History
              </h2>
              <button
                onClick={() => setShowVendorModal(false)}
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
            
            <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 16 }}>
                Vendor Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <strong>Contact:</strong> {selectedVendor.contactPerson}
                </div>
                <div>
                  <strong>Email:</strong> {selectedVendor.email}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedVendor.phone}
                </div>
                <div>
                  <strong>Rating:</strong> {getVendorRating(selectedVendor.rating || 5)}
                </div>
                <div>
                  <strong>Address:</strong> {selectedVendor.address}
                </div>
                <div>
                  <strong>Status:</strong> 
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 500,
                    background: selectedVendor.isActive ? '#4caf50' : '#e53935',
                    color: '#fff',
                    marginLeft: 8
                  }}>
                    {selectedVendor.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 16 }}>
                Purchase History ({vendorHistory.length} orders)
              </h3>
              
              {vendorHistory.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {vendorHistory.map(order => (
                    <div key={order.orderId} style={{
                      background: '#f8f9fa',
                      borderRadius: 8,
                      padding: 16,
                      border: '1px solid #e9ecef'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div>
                          <h4 style={{ fontSize: 16, fontWeight: 600, color: '#333', margin: 0 }}>
                            {order.orderNumber}
                          </h4>
                          <p style={{ fontSize: 14, color: '#666', margin: '4px 0 0 0' }}>
                            {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>
                            {formatCurrency(order.totalAmount)}
                          </div>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 500,
                            background: order.status === 'received' ? '#4caf50' : 
                                       order.status === 'confirmed' ? '#2196f3' : 
                                       order.status === 'sent' ? '#ff9800' : '#e53935',
                            color: '#fff'
                          }}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <strong style={{ fontSize: 14, color: '#666' }}>Items:</strong>
                        <div style={{ marginTop: 8 }}>
                          {order.items.map(item => (
                            <div key={item.itemId} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '8px 12px',
                              background: '#fff',
                              borderRadius: 4,
                              marginBottom: 4
                            }}>
                              <span style={{ color: '#333' }}>{item.itemName}</span>
                              <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#666' }}>
                                <span>Qty: {item.quantity}</span>
                                <span>${item.unitCost.toFixed(2)}</span>
                                <span style={{ fontWeight: 600, color: '#333' }}>
                                  {formatCurrency(item.totalCost)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  No purchase history found for this vendor.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 