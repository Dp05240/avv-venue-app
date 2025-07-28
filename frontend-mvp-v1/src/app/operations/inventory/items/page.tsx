'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import { InventoryItem, InventoryCategory } from '../types';
import { inventoryApi } from '../../../../services/api';
import ItemModal from '../components/ItemModal';

export default function ItemsPage() {
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

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-menu]')) {
        const menus = document.querySelectorAll('[id^="menu-"]');
        menus.forEach(menu => {
          (menu as HTMLElement).style.display = 'none';
        });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, categoriesResponse] = await Promise.all([
        inventoryApi.getItems(),
        inventoryApi.getCategories()
      ]);

      if (itemsResponse.data) {
        setItems(itemsResponse.data);
      }
      if (categoriesResponse.data) {
        setCategories(categoriesResponse.data);
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

  const handleDeleteItem = async (item: InventoryItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
      try {
        const response = await inventoryApi.deleteItem(item.id);
        if (response.data !== undefined) {
          setItems(prev => prev.filter(i => i.id !== item.id));
        } else {
          setError(response.error || 'Failed to delete item');
        }
      } catch (error) {
        setError('An error occurred while deleting the item');
      }
    }
  };

  const handleSaveItem = (item: InventoryItem) => {
    if (selectedItem) {
      // Update existing item
      setItems(prev => prev.map(i => i.id === item.id ? item : i));
    } else {
      // Add new item
      setItems(prev => [...prev, item]);
    }
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
          <div>Loading items...</div>
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
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>Inventory Items</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>Manage your inventory items</p>
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
              gap: '16px',
              marginBottom: '16px'
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
              </div>
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

          {/* Items Table */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            overflow: 'hidden' 
          }}>
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
                  {filteredItems.map(item => (
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
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#232323' }}>
                        ${item.cost.toFixed(2)}
                      </td>
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
                        <div style={{ position: 'relative', display: 'inline-block' }} data-menu>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const menu = document.getElementById(`menu-${item.id}`);
                              if (menu) {
                                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                              }
                            }}
                            style={{ 
                              color: '#6b7280', 
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '18px',
                              padding: '4px'
                            }}
                          >
                            ⋮
                          </button>
                          <div
                            id={`menu-${item.id}`}
                            style={{
                              display: 'none',
                              position: 'absolute',
                              right: 0,
                              top: '100%',
                              background: '#fff',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                              zIndex: 10,
                              minWidth: '120px'
                            }}
                          >
                            <button
                              onClick={() => {
                                document.getElementById(`menu-${item.id}`)!.style.display = 'none';
                                handleEditItem(item);
                              }}
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px 12px',
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#374151'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f9fafb';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'none';
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                document.getElementById(`menu-${item.id}`)!.style.display = 'none';
                                handleDeleteItem(item);
                              }}
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px 12px',
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#e74c3c'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#fef2f2';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'none';
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
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
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || lowStockOnly 
                  ? 'No items found matching your filters.' 
                  : 'No items found. Add your first item to get started.'}
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