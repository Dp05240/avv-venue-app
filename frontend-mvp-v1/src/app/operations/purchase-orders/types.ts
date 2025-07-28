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

export interface InventoryCategory {
  id: number;
  name: string;
  description?: string;
  venueId: number;
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

export interface Vendor {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  notes?: string;
  preferredPaymentTerms?: string;
  preferredShippingMethod?: string;
  rating?: number;
  isActive?: boolean;
  createdAt: string;
}

export interface PurchaseOrder {
  id: number;
  vendorId: number;
  vendorName: string;
  orderNumber: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'draft' | 'sent' | 'confirmed' | 'received' | 'cancelled';
  totalAmount: number;
  notes?: string;
  items: PurchaseOrderItem[];
  createdAt: string;
  terms?: string;
  shippingMethod?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  approvedBy?: string;
  approvedAt?: string;
  sentAt?: string;
  receivedAt?: string;
}

export interface PurchaseOrderItem {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  sku?: string;
  description?: string;
}

export interface PurchaseOrderApproval {
  id: number;
  orderId: number;
  approverId: number;
  approverName: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PurchaseOrderHistory {
  id: number;
  orderId: number;
  action: 'created' | 'sent' | 'confirmed' | 'received' | 'cancelled' | 'updated';
  performedBy: string;
  performedAt: string;
  notes?: string;
}

export interface VendorPerformance {
  vendorId: number;
  vendorName: string;
  totalOrders: number;
  totalSpent: number;
  averageDeliveryTime: number;
  onTimeDeliveryRate: number;
  qualityRating: number;
  lastOrderDate: string;
}

export interface BudgetAnalysis {
  categoryId: number;
  categoryName: string;
  budgetedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  utilizationRate: number;
  month: string;
  year: number;
} 