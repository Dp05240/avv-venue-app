'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { inventoryApi } from '../../../services/api';
import { InventoryItem, InventoryCategory } from './types';
import ItemModal from './components/ItemModal';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add'>('add');
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    lowStockCount: 0,
    alertCount: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, categoriesResponse, statsResponse] = await Promise.all([
        inventoryApi.getItems(),
        inventoryApi.getCategories(),
        inventoryApi.getInventoryStats()
      ]);

      if (itemsResponse.data) {
        setItems(itemsResponse.data);
      }
      if (categoriesResponse.data) {
        setCategories(categoriesResponse.data);
      }
      if (statsResponse.data) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      setError('An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleSaveItem = (item: InventoryItem) => {
    if (selectedItem) {
      // Update existing item
      setItems(prev => prev.map(i => i.id === item.id ? item : i));
    } else {
      // Add new item
      setItems(prev => [...prev, item]);
    }
    // Reload stats
    loadData();
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.categoryId.toString() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesLowStock = !lowStockOnly || item.quantity <= item.minQuantity;

    return matchesSearch && matchesCategory && matchesStatus && matchesLowStock;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return { color: '#10b981', background: '#10b98120' };
      case 'inactive': return { color: '#6b7280', background: '#f3f4f6' };
      case 'discontinued': return { color: '#e74c3c', background: '#fee2e2' };
      default: return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  const getQuantityColor = (quantity: number, minQuantity: number) => {
    if (quantity <= minQuantity) return '#e74c3c';
    if (quantity <= minQuantity * 1.5) return '#f59e0b';
    return '#10b981';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading inventory...</div>
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
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>Inventory Management</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>Manage your venue's equipment and supplies</p>
          </div>

          {/* Navigation Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px', 
            marginBottom: '32px' 
          }}>
            <a href="/operations/inventory/items" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: '#dbeafe', 
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📦</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>Items</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Manage inventory items</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/operations/inventory/categories" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: '#dcfce7', 
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>🏷️</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>Categories</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Organize items by category</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/operations/inventory/transactions" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: '#fef3c7', 
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📊</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>Transactions</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Track inventory movements</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/operations/inventory/alerts" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: '#fee2e2', 
                    borderRadius: '8px',
                    marginRight: '16px'
                  }}>
                    <span style={{ fontSize: '24px' }}>🔔</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#232323', marginBottom: '4px' }}>Alerts</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>View system alerts</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px', 
            marginBottom: '32px' 
          }}>
            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  padding: '12px', 
                  background: '#dbeafe', 
                  borderRadius: '8px',
                  marginRight: '16px'
                }}>
                  <span style={{ fontSize: '24px' }}>📦</span>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#666', marginBottom: '4px' }}>Total Items</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#232323' }}>{stats.totalItems}</p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  padding: '12px', 
                  background: '#dcfce7', 
                  borderRadius: '8px',
                  marginRight: '16px'
                }}>
                  <span style={{ fontSize: '24px' }}>💰</span>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#666', marginBottom: '4px' }}>Total Value</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#232323' }}>${stats.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  padding: '12px', 
                  background: '#fee2e2', 
                  borderRadius: '8px',
                  marginRight: '16px'
                }}>
                  <span style={{ fontSize: '24px' }}>⚠️</span>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#666', marginBottom: '4px' }}>Low Stock</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#232323' }}>{stats.lowStockCount}</p>
                </div>
              </div>
            </div>

            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
              padding: '24px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  padding: '12px', 
                  background: '#fef3c7', 
                  borderRadius: '8px',
                  marginRight: '16px'
                }}>
                  <span style={{ fontSize: '24px' }}>🔔</span>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#666', marginBottom: '4px' }}>Alerts</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#232323' }}>{stats.alertCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px', 
            marginBottom: '24px' 
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px' 
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search</label>
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  <input
                    type="checkbox"
                    checked={lowStockOnly}
                    onChange={(e) => setLowStockOnly(e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  Low Stock Only
                </label>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            overflow: 'hidden' 
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#232323' }}>Recent Inventory Items</h2>
                <button 
                  onClick={handleAddItem}
                  style={{
                    background: '#667eea',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Add Item
                </button>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Item</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>SKU</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Quantity</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Cost</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.slice(0, 10).map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#232323' }}>{item.name}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.brand}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>{item.sku}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>{item.categoryName}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          fontSize: '14px', 
                          fontWeight: '500', 
                          color: getQuantityColor(item.quantity, item.minQuantity)
                        }}>
                          {item.quantity}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>${item.cost.toFixed(2)}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          display: 'inline-flex',
                          padding: '4px 8px',
                          fontSize: '12px',
                          fontWeight: '500',
                          borderRadius: '4px',
                          ...getStatusColor(item.status)
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500' }}>
                        <button
                          onClick={() => handleViewItem(item)}
                          style={{ 
                            color: '#667eea', 
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            marginRight: '12px'
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditItem(item)}
                          style={{ 
                            color: '#10b981', 
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '48px', 
                color: '#666'
              }}>
                No items found. Add your first item to get started.
              </div>
            )}

            {filteredItems.length > 10 && (
              <div style={{ 
                padding: '16px 24px', 
                borderTop: '1px solid #e5e7eb',
                textAlign: 'center'
              }}>
                <a 
                  href="/operations/inventory/items"
                  style={{
                    color: '#667eea',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  View all items →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        onSave={handleSaveItem}
        mode={modalMode}
      />
    </div>
  );
} 