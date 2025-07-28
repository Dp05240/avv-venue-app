'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/NavBar';
import { InventoryCategory } from '../types';
import { inventoryApi } from '../../../../services/api';
import CategoryModal from '../components/CategoryModal';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<InventoryCategory | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await inventoryApi.getCategories();
      if (response.data) {
        setCategories(response.data);
      } else {
        setError(response.error || 'Failed to load categories');
      }
    } catch (error) {
      setError('An error occurred while loading categories');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: InventoryCategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (category: InventoryCategory) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"? This action cannot be undone.`)) {
      try {
        const response = await inventoryApi.deleteCategory(category.id);
        if (response.data !== undefined) {
          setCategories(prev => prev.filter(c => c.id !== category.id));
        } else {
          setError(response.error || 'Failed to delete category');
        }
      } catch (error) {
        setError('An error occurred while deleting the category');
      }
    }
  };

  const handleSaveCategory = (category: InventoryCategory) => {
    if (editingCategory) {
      // Update existing category
      setCategories(prev => prev.map(c => c.id === category.id ? category : c));
    } else {
      // Add new category
      setCategories(prev => [...prev, category]);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
        <NavBar />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div>Loading categories...</div>
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
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#232323', marginBottom: '8px' }}>Inventory Categories</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>Manage your inventory categories</p>
          </div>

          {/* Search and Add */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            padding: '24px', 
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Search categories..."
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
            <button
              onClick={handleAddCategory}
              style={{
                background: '#667eea',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Add Category
            </button>
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

          {/* Categories Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {filteredCategories.map(category => (
              <div key={category.id} style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                padding: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#232323',
                    margin: 0
                  }}>
                    {category.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditCategory(category)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#667eea',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#e74c3c',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {category.description && (
                  <p style={{ 
                    color: '#666', 
                    fontSize: '14px', 
                    marginBottom: '12px',
                    lineHeight: '1.5'
                  }}>
                    {category.description}
                  </p>
                )}
                
                <div style={{ 
                  fontSize: '12px', 
                  color: '#9ca3af',
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '12px'
                }}>
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && !loading && (
            <div style={{ 
              textAlign: 'center', 
              padding: '48px', 
              color: '#666',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              {searchTerm ? 'No categories found matching your search.' : 'No categories found. Create your first category to get started.'}
            </div>
          )}
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        onSave={handleSaveCategory}
      />
    </div>
  );
} 