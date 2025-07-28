export interface InventoryCategory {
  id: number;
  name: string;
  description?: string;
  venueId: number;
  createdAt: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  brand: string;
  description?: string;
  sku: string;
  categoryId: number;
  categoryName: string;
  venueId: number;
  quantity: number;
  minQuantity: number;
  maxQuantity?: number;
  cost: number;
  rentalFees: number;
  specs: string;
  notes?: string;
  location?: string;
  supplier?: string;
  supplierContact?: string;
  lastRestocked?: string;
  expiryDate?: string;
  status: 'active' | 'inactive' | 'discontinued';
  reorderMark: number;
  reorderVendor: string;
  preferredVendorId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryTransaction {
  id: number;
  itemId: number;
  itemName: string;
  type: 'in' | 'out' | 'adjustment' | 'damage' | 'expiry';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  reference?: string;
  notes?: string;
  performedBy: string;
  createdAt: string;
}

export interface InventoryAlert {
  id: number;
  itemId: number;
  itemName: string;
  type: 'low_stock' | 'expiry' | 'overstock' | 'damage';
  message: string;
  isRead: boolean;
  createdAt: string;
} 