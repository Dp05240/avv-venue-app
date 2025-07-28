'use client';

import React, { useState, useEffect } from 'react';
import { InventoryItem, InventoryCategory } from '../types';
import { inventoryApi } from '../../../../services/api';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: InventoryItem | null;
  onSave: (item: InventoryItem) => void;
  mode?: 'view' | 'edit' | 'add';
}

export default function ItemModal({ isOpen, onClose, item, onSave, mode = 'add' }: ItemModalProps) {
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    brand: '',
    description: '',
    sku: '',
    categoryId: 0,
    quantity: 0,
    minQuantity: 0,
    maxQuantity: 0,
    cost: 0,
    rentalFees: 0,
    specs: '',
    notes: '',
    location: '',
    supplier: '',
    supplierContact: '',
    status: 'active',
    reorderMark: 0,
    reorderVendor: '',
    preferredVendorId: 0,
  });

  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCategories();
      if (item) {
        setFormData(item);
      } else {
        setFormData({
          name: '',
          brand: '',
          description: '',
          sku: '',
          categoryId: 0,
          quantity: 0,
          minQuantity: 0,
          maxQuantity: 0,
          cost: 0,
          rentalFees: 0,
          specs: '',
          notes: '',
          location: '',
          supplier: '',
          supplierContact: '',
          status: 'active',
          reorderMark: 0,
          reorderVendor: '',
        });
      }
      setIsEditing(mode === 'edit');
    }
  }, [isOpen, item, mode]);

  const loadCategories = async () => {
    try {
      const [categoriesResponse, vendorsResponse] = await Promise.all([
        inventoryApi.getCategories(),
        fetch('http://localhost:4000/api/vendors')
      ]);
      
      if (categoriesResponse.data) {
        setCategories(categoriesResponse.data);
      }
      
      if (vendorsResponse.ok) {
        const vendorsData = await vendorsResponse.json();
        setVendors(vendorsData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const itemData = {
        ...formData,
        venueId: 1, // Default venue ID - should come from context
      } as Omit<InventoryItem, 'id' | 'categoryName' | 'createdAt' | 'updatedAt'>;

      let response;
      if (item) {
        response = await inventoryApi.updateItem(item.id, itemData);
      } else {
        response = await inventoryApi.createItem(itemData);
      }

      if (response.data) {
        onSave(response.data);
        onClose();
      } else {
        setError(response.error || 'Failed to save item');
      }
    } catch (error) {
      setError('An error occurred while saving the item');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
        padding: '24px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#232323' }}>
            {isEditing ? 'Edit Item' : item ? 'View Item Details' : 'Add New Item'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Item Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku || ''}
                onChange={handleInputChange}
                required
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Category *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId || ''}
                onChange={handleInputChange}
                required
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'pointer' : 'default',
                }}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity || ''}
                onChange={handleInputChange}
                required
                min="0"
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Minimum Quantity *
              </label>
              <input
                type="number"
                name="minQuantity"
                value={formData.minQuantity || ''}
                onChange={handleInputChange}
                required
                min="0"
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Cost ($)
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Rental Fees ($)
              </label>
              <input
                type="number"
                name="rentalFees"
                value={formData.rentalFees || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status || 'active'}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'pointer' : 'default',
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={3}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                background: isEditing ? '#ffffff' : '#f9fafb',
                cursor: isEditing ? 'text' : 'default',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Specifications
            </label>
            <textarea
              name="specs"
              value={formData.specs || ''}
              onChange={handleInputChange}
              rows={3}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                background: isEditing ? '#ffffff' : '#f9fafb',
                cursor: isEditing ? 'text' : 'default',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Supplier
              </label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Supplier Contact
              </label>
              <input
                type="text"
                name="supplierContact"
                value={formData.supplierContact || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Preferred Vendor
              </label>
              <select
                name="preferredVendorId"
                value={formData.preferredVendorId || 0}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              >
                <option value={0}>Select Preferred Vendor</option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name} - {vendor.contactPerson}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Reorder Vendor (Fallback)
              </label>
              <input
                type="text"
                name="reorderVendor"
                value={formData.reorderVendor || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter vendor name as fallback"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: isEditing ? '#ffffff' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleInputChange}
              rows={3}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                background: isEditing ? '#ffffff' : '#f9fafb',
                cursor: isEditing ? 'text' : 'default',
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#e74c3c', marginBottom: '16px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            {!isEditing && item && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #667eea',
                  borderRadius: '6px',
                  background: '#fff',
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: '#fff',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              {isEditing ? 'Cancel' : 'Close'}
            </button>
            {isEditing && (
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#667eea',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Saving...' : (item ? 'Update Item' : 'Add Item')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 