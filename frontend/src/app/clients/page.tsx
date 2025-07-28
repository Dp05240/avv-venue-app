'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  notes?: string;
  status: 'Active' | 'Inactive' | 'Prospect';
  totalSpent: number;
  lastBooking: string;
  createdAt: string;
  paymentMethod: 'cash' | 'check' | 'card' | 'bank_transfer';
  outstandingBalance: number;
  archived?: boolean;
}

interface Payment {
  id: string;
  clientId: number;
  amount: number;
  method: 'cash' | 'check' | 'card' | 'bank_transfer';
  date: string;
  reference?: string;
  notes?: string;
  status: 'pending' | 'completed' | 'failed';
}

interface Communication {
  id: string;
  clientId: number;
  type: 'text' | 'email' | 'call';
  direction: 'outbound' | 'inbound';
  subject?: string;
  content: string;
  date: string;
  time: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'missed' | 'answered';
}

interface Invoice {
  id: string;
  clientId: number;
  client: string;
  bookingId: string;
  amount: number;
  tax: number;
  total: number;
  due: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
  sent: string;
  notes: string;
  lineItems: InvoiceLineItem[];
  paymentMethod?: string;
  paymentDate?: string;
  createdAt: string;
}

interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// Sample data
const sampleClients: Client[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@acmecorp.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    address: '123 Business St, New York, NY 10001',
    notes: 'Preferred contact method: Email. VIP client with 20% discount.',
    status: 'Active',
    totalSpent: 12500,
    lastBooking: '2024-08-14',
    createdAt: '2024-01-15',
    paymentMethod: 'card',
    outstandingBalance: 0,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techstartup.com',
    phone: '+1 (555) 234-5678',
    company: 'Tech Startup Inc',
    address: '456 Innovation Ave, San Francisco, CA 94102',
    notes: 'Interested in weekend events. Prefers modern venues.',
    status: 'Active',
    totalSpent: 8500,
    lastBooking: '2024-08-25',
    createdAt: '2024-02-20',
    paymentMethod: 'bank_transfer',
    outstandingBalance: 2500,
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@eventpro.com',
    phone: '+1 (555) 345-6789',
    company: 'Event Professionals LLC',
    address: '789 Event Blvd, Los Angeles, CA 90210',
    notes: 'Regular client, prefers phone contact. Corporate events specialist.',
    status: 'Active',
    totalSpent: 18750,
    lastBooking: '2024-09-05',
    createdAt: '2024-03-10',
    paymentMethod: 'check',
    outstandingBalance: 0,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@weddingplanners.com',
    phone: '+1 (555) 456-7890',
    company: 'Wedding Planners Co',
    address: '321 Celebration Dr, Miami, FL 33101',
    notes: 'Specializes in wedding events. Requires early booking confirmations.',
    status: 'Active',
    totalSpent: 9200,
    lastBooking: '2024-07-20',
    createdAt: '2024-04-05',
    paymentMethod: 'cash',
    outstandingBalance: 1800,
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@corporateevents.com',
    phone: '+1 (555) 567-8901',
    company: 'Corporate Events Ltd',
    address: '654 Corporate Way, Chicago, IL 60601',
    notes: 'Large corporate events only. Requires detailed contracts.',
    status: 'Prospect',
    totalSpent: 0,
    lastBooking: '',
    createdAt: '2024-05-12',
    paymentMethod: 'card',
    outstandingBalance: 0,
  },
];

const samplePayments: Payment[] = [
  {
    id: 'PAY-001',
    clientId: 1,
    amount: 2500,
    method: 'card',
    date: '2024-08-15',
    reference: 'TXN-123456',
    notes: 'Payment for August 14th event',
    status: 'completed',
  },
  {
    id: 'PAY-002',
    clientId: 2,
    amount: 1800,
    method: 'bank_transfer',
    date: '2024-08-20',
    reference: 'REF-789012',
    notes: 'Partial payment for September event',
    status: 'completed',
  },
  {
    id: 'PAY-003',
    clientId: 3,
    amount: 3200,
    method: 'check',
    date: '2024-08-10',
    reference: 'CHK-345678',
    notes: 'Check #1234 for annual conference',
    status: 'completed',
  },
];

const sampleCommunications: Communication[] = [
  {
    id: '1',
    clientId: 1,
    type: 'email',
    direction: 'outbound',
    subject: 'Event Details Confirmation',
    content: 'Hi John, confirming your event details for next week...',
    date: '2024-01-15',
    time: '10:30 AM',
    status: 'read',
  },
  {
    id: '2',
    clientId: 1,
    type: 'text',
    direction: 'inbound',
    content: 'Thanks! Looking forward to the event.',
    date: '2024-01-15',
    time: '11:45 AM',
    status: 'delivered',
  },
  {
    id: '3',
    clientId: 1,
    type: 'call',
    direction: 'outbound',
    content: 'Discussed venue setup requirements',
    date: '2024-01-14',
    time: '2:15 PM',
    status: 'answered',
  },
  {
    id: '4',
    clientId: 1,
    type: 'email',
    direction: 'outbound',
    subject: 'Invoice #1234',
    content: 'Please find attached invoice for your recent booking...',
    date: '2024-01-10',
    time: '9:00 AM',
    status: 'sent',
  },
];

const sampleInvoices: Invoice[] = [
  {
    id: 'INV-1001',
    clientId: 1,
    client: 'John Smith',
    bookingId: 'BK-001',
    amount: 1200,
    tax: 120,
    total: 1320,
    due: '2024-08-01',
    status: 'Paid',
    sent: '2024-07-20',
    notes: 'Deposit for August event.',
    lineItems: [
      { id: '1', description: 'Venue Rental - Main Hall', quantity: 1, unitPrice: 800, amount: 800 },
      { id: '2', description: 'Catering Services', quantity: 1, unitPrice: 400, amount: 400 },
    ],
    paymentMethod: 'Credit Card',
    paymentDate: '2024-07-25',
    createdAt: '2024-07-15',
  },
  {
    id: 'INV-1002',
    clientId: 2,
    client: 'Sarah Johnson',
    bookingId: 'BK-002',
    amount: 800,
    tax: 80,
    total: 880,
    due: '2024-07-25',
    status: 'Paid',
    sent: '2024-07-10',
    notes: 'Full payment for July booking.',
    lineItems: [
      { id: '1', description: 'Venue Rental - Garden Room', quantity: 1, unitPrice: 600, amount: 600 },
      { id: '2', description: 'Audio/Visual Equipment', quantity: 1, unitPrice: 200, amount: 200 },
    ],
    paymentMethod: 'Bank Transfer',
    paymentDate: '2024-07-15',
    createdAt: '2024-07-05',
  },
  {
    id: 'INV-1003',
    clientId: 3,
    client: 'Michael Brown',
    bookingId: 'BK-003',
    amount: 1500,
    tax: 150,
    total: 1650,
    due: '2024-07-15',
    status: 'Paid',
    sent: '2024-07-01',
    notes: 'Balance for conference.',
    lineItems: [
      { id: '1', description: 'Venue Rental - Rooftop', quantity: 1, unitPrice: 1000, amount: 1000 },
      { id: '2', description: 'Technical Support', quantity: 8, unitPrice: 62.5, amount: 500 },
    ],
    paymentMethod: 'Check',
    paymentDate: '2024-07-10',
    createdAt: '2024-06-25',
  },
  {
    id: 'INV-1004',
    clientId: 4,
    client: 'Emily Davis',
    bookingId: 'BK-004',
    amount: 1800,
    tax: 180,
    total: 1980,
    due: '2024-08-15',
    status: 'Overdue',
    sent: '2024-07-20',
    notes: 'Wedding reception services.',
    lineItems: [
      { id: '1', description: 'Venue Rental - Garden Room', quantity: 1, unitPrice: 1200, amount: 1200 },
      { id: '2', description: 'Wedding Decoration', quantity: 1, unitPrice: 600, amount: 600 },
    ],
    createdAt: '2024-07-15',
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [payments, setPayments] = useState<Payment[]>(samplePayments);
  const [communications, setCommunications] = useState<Communication[]>(sampleCommunications);
  const [invoices, setInvoices] = useState<Invoice[]>(sampleInvoices);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive' | 'Prospect'>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'totalSpent' | 'lastBooking' | 'outstandingBalance'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editingClient, setEditingClient] = useState<Partial<Client>>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<Invoice | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    method: 'card' as 'cash' | 'card' | 'bank_transfer',
    reference: '',
    notes: ''
  });
  const [emailForm, setEmailForm] = useState({
    subject: '',
    content: ''
  });
  const [messageForm, setMessageForm] = useState({
    content: ''
  });

  // Filter clients
  const filteredClients = clients.filter(client => {
    if (!showArchived && client.archived) return false;
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];
    
    if (sortBy === 'name') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    } else if (sortBy === 'lastBooking') {
      aValue = aValue ? new Date(aValue).getTime() : 0;
      bValue = bValue ? new Date(bValue).getTime() : 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setShowSidebar(true);
  };

  const handlePayment = (clientId: number, paymentData: Omit<Payment, 'id' | 'clientId'>) => {
    const newPayment: Payment = {
      id: `PAY-${Date.now()}`,
      clientId,
      ...paymentData,
    };
    setPayments([...payments, newPayment]);
    setClients(clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          outstandingBalance: Math.max(0, client.outstandingBalance - paymentData.amount),
        };
      }
      return client;
    }));
    alert(`Payment of $${paymentData.amount} processed successfully!`);
  };

  const handleSaveClient = () => {
    if (editingClient.name && editingClient.email && editingClient.phone) {
      const newClient: Client = {
        ...editingClient as Client,
        id: Math.max(...clients.map(c => c.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
        lastBooking: '',
        totalSpent: 0,
        outstandingBalance: 0,
        status: editingClient.status || 'Active',
        paymentMethod: 'card',
      };
      setClients([...clients, newClient]);
      setEditingClient({});
      alert('Client created successfully!');
      setShowSidebar(false);
    } else {
      alert('Please fill in all required fields (Name, Email, Phone)');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Inactive': return '#6b7280';
      case 'Prospect': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case 'Active': return '#ecfdf5';
      case 'Inactive': return '#f3f4f6';
      case 'Prospect': return '#fffbeb';
      default: return '#f3f4f6';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return '💵';
      case 'check': return '🏦';
      case 'card': return '💳';
      case 'bank_transfer': return '🏛️';
      default: return '💰';
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return '#10b981';
      case 'Sent': return '#6366f1';
      case 'Draft': return '#6b7280';
      case 'Overdue': return '#ef4444';
      case 'Cancelled': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getInvoiceStatusBackgroundColor = (status: string) => {
    switch (status) {
      case 'Paid': return '#ecfdf5';
      case 'Sent': return '#eef2ff';
      case 'Draft': return '#f3f4f6';
      case 'Overdue': return '#fef2f2';
      case 'Cancelled': return '#f3f4f6';
      default: return '#f3f4f6';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      
      <div style={{ padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
            Client Management
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            Manage your clients, track payments, and monitor outstanding balances.
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px', 
          marginBottom: '32px' 
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
              }}>
                <span style={{ color: '#fff', fontSize: '20px' }}>👥</span>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>
                  {clients.length}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>Total Clients</div>
              </div>
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
              }}>
                <span style={{ color: '#fff', fontSize: '20px' }}>💰</span>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>
                  ${clients.reduce((sum, client) => sum + client.totalSpent, 0).toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>Total Revenue</div>
              </div>
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
              }}>
                <span style={{ color: '#fff', fontSize: '20px' }}>⚠️</span>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>
                  ${clients.reduce((sum, client) => sum + client.outstandingBalance, 0).toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>Outstanding Balance</div>
              </div>
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
              }}>
                <span style={{ color: '#fff', fontSize: '20px' }}>📊</span>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>
                  {clients.filter(c => c.status === 'Active').length}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>Active Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                minWidth: '250px',
                outline: 'none'
              }}
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                background: '#fff',
                outline: 'none'
              }}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Prospect">Prospect</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSelectedClient(null);
              setEditingClient({});
              setShowSidebar(true);
            }}
            style={{
              padding: '12px 24px',
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Add Client
          </button>
        </div>

        {/* Archived Filter */}
        <div style={{ margin: '16px 0' }}>
          <label style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
            <input
              type="checkbox"
              checked={showArchived}
              onChange={e => setShowArchived(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Show Archived Clients
          </label>
        </div>

        {/* Clients Table */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            background: '#f8fafc',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              Clients ({filteredClients.length})
            </h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSortBy('name');
                    setSortOrder(sortBy === 'name' && sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  >
                    Client Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    borderBottom: '1px solid #e2e8f0',
                  }}>
                    Contact
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    borderBottom: '1px solid #e2e8f0',
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSortBy('totalSpent');
                    setSortOrder(sortBy === 'totalSpent' && sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  >
                    Total Spent {sortBy === 'totalSpent' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSortBy('outstandingBalance');
                    setSortOrder(sortBy === 'outstandingBalance' && sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  >
                    Outstanding {sortBy === 'outstandingBalance' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    borderBottom: '1px solid #e2e8f0',
                  }}>
                    Invoices
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    borderBottom: '1px solid #e2e8f0',
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <tr
                    key={client.id}
                    style={{
                      background: index % 2 === 0 ? '#fff' : '#f8fafc',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? '#fff' : '#f8fafc';
                    }}
                    onClick={() => handleClientSelect(client)}
                  >
                    <td style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #e2e8f0',
                    }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
                          {client.name}
                          {client.archived && (
                            <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600 }}>📁 Archived</span>
                          )}
                        </div>
                        {client.company && (
                          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                            {client.company}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #e2e8f0',
                    }}>
                      <div>
                        <div style={{ fontSize: '14px', color: '#1e293b' }}>
                          {client.email}
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                          {client.phone}
                        </div>
                      </div>
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #e2e8f0',
                    }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: getStatusBackgroundColor(client.status),
                        color: getStatusColor(client.status),
                        textTransform: 'capitalize',
                      }}>
                        {client.status}
                      </span>
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'right',
                    }}>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
                        ${client.totalSpent.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        {getPaymentMethodIcon(client.paymentMethod)} {client.paymentMethod.replace('_', ' ')}
                      </div>
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'right',
                    }}>
                      {client.outstandingBalance > 0 ? (
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#ef4444' }}>
                          ${client.outstandingBalance.toLocaleString()}
                        </div>
                      ) : (
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#10b981' }}>
                          Paid
                        </div>
                      )}
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'center',
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {invoices.filter(inv => inv.clientId === client.id).slice(0, 2).map(invoice => (
                          <button
                            key={invoice.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowInvoiceModal(invoice);
                            }}
                            style={{
                              padding: '4px 8px',
                              background: getInvoiceStatusBackgroundColor(invoice.status),
                              color: getInvoiceStatusColor(invoice.status),
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            📄 {invoice.id}
                          </button>
                        ))}
                        {invoices.filter(inv => inv.clientId === client.id).length > 2 && (
                          <span style={{ fontSize: '12px', color: '#64748b' }}>
                            +{invoices.filter(inv => inv.clientId === client.id).length - 2} more
                          </span>
                        )}
                        {invoices.filter(inv => inv.clientId === client.id).length === 0 && (
                          <span style={{ fontSize: '12px', color: '#64748b' }}>No invoices</span>
                        )}
                      </div>
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'center',
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClientSelect(client);
                        }}
                        style={{
                          padding: '8px 16px',
                          background: '#6366f1',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 && (
            <div style={{
              padding: '48px 24px',
              textAlign: 'center',
              color: '#64748b',
              fontSize: '16px',
            }}>
              {searchTerm || statusFilter !== 'all' 
                ? 'No clients found matching your filters.' 
                : 'No clients found. Add your first client to get started.'}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      {showSidebar && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 400,
          height: '100vh',
          background: '#fff',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '24px', 
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {selectedClient && (
                <button
                  onClick={() => {
                    setClients(clients.map(c => 
                      c.id === selectedClient.id 
                        ? { ...c, archived: !c.archived }
                        : c
                    ));
                    alert(selectedClient.archived ? 'Client unarchived successfully!' : 'Client archived successfully!');
                  }}
                  style={{
                    padding: '6px 10px',
                    background: selectedClient.archived ? '#10b981' : '#f59e0b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                  title={selectedClient.archived ? 'Unarchive Client' : 'Archive Client'}
                >
                  {selectedClient.archived ? '📂' : '📁'}
                  {selectedClient.archived ? 'Unarchive' : 'Archive'}
                </button>
              )}
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: 0 }}>
                {selectedClient ? selectedClient.name : 'Add New Client'}
              </h2>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                color: '#64748b',
                cursor: 'pointer',
                padding: 4,
                borderRadius: 4
              }}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {selectedClient ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Client Info */}
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>Client Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Name</div>
                      <div style={{ fontSize: 16, color: '#1e293b' }}>{selectedClient.name}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Email</div>
                      <div style={{ fontSize: 16, color: '#1e293b' }}>{selectedClient.email}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Phone</div>
                      <div style={{ fontSize: 16, color: '#1e293b' }}>{selectedClient.phone}</div>
                    </div>
                    {selectedClient.company && (
                      <div>
                        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Company</div>
                        <div style={{ fontSize: 16, color: '#1e293b' }}>{selectedClient.company}</div>
                      </div>
                    )}
                    {selectedClient.address && (
                      <div>
                        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Address</div>
                        <div style={{ fontSize: 16, color: '#1e293b' }}>{selectedClient.address}</div>
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Status</div>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: 20,
                        fontSize: 14,
                        fontWeight: 600,
                        background: getStatusBackgroundColor(selectedClient.status),
                        color: getStatusColor(selectedClient.status)
                      }}>
                        {selectedClient.status}
                      </span>
                    </div>
                    {selectedClient.notes && (
                      <div>
                        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Notes</div>
                        <div style={{ fontSize: 16, color: '#1e293b' }}>{selectedClient.notes}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Financial Summary */}
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>Financial Summary</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
                      <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Total Spent</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#1e293b' }}>${selectedClient.totalSpent.toLocaleString()}</div>
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
                      <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>Outstanding Balance</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: selectedClient.outstandingBalance > 0 ? '#ef4444' : '#10b981' }}>
                        {selectedClient.outstandingBalance > 0 ? `$${selectedClient.outstandingBalance.toLocaleString()}` : 'Paid'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>Actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button
                      onClick={() => {
                        setPaymentForm({
                          amount: selectedClient.outstandingBalance.toString(),
                          method: 'card',
                          reference: '',
                          notes: ''
                        });
                        setShowPaymentModal(true);
                      }}
                      style={{
                        padding: '12px 16px',
                        background: '#6366f1',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      💳 Process Payment
                    </button>
                    <button
                      onClick={() => {
                        setEmailForm({
                          subject: '',
                          content: ''
                        });
                        setShowEmailModal(true);
                      }}
                      style={{
                        padding: '12px 16px',
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      📧 Send Email
                    </button>
                    <button
                      onClick={() => {
                        setMessageForm({
                          content: ''
                        });
                        setShowMessageModal(true);
                      }}
                      style={{
                        padding: '12px 16px',
                        background: '#f59e0b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      💬 Send Message
                    </button>

                  </div>
                </div>

                {/* Communication History */}
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>Communication History</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {communications.filter(c => c.clientId === selectedClient.id).map(comm => (
                      <div key={comm.id} style={{
                        background: '#f8fafc',
                        borderRadius: 8,
                        padding: 12,
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>
                            {comm.type === 'email' ? '📧' : comm.type === 'text' ? '💬' : '📞'} {comm.type}
                          </span>
                          <span style={{ fontSize: 12, color: '#64748b' }}>{comm.date} {comm.time}</span>
                        </div>
                        <div style={{ fontSize: 14, color: '#64748b' }}>
                          {comm.direction === 'outbound' ? '→' : '←'} {comm.content}
                        </div>
                        {comm.subject && (
                          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                            Subject: {comm.subject}
                          </div>
                        )}
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                          Status: <span style={{ 
                            color: comm.status === 'read' ? '#10b981' : 
                                   comm.status === 'delivered' ? '#f59e0b' : 
                                   comm.status === 'sent' ? '#6366f1' : '#ef4444',
                            fontWeight: 600 
                          }}>
                            {comm.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {communications.filter(c => c.clientId === selectedClient.id).length === 0 && (
                      <div style={{ color: '#64748b', fontSize: 14 }}>No communication history yet.</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Add New Client Form */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editingClient.name || ''}
                    onChange={(e) => setEditingClient({...editingClient, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 16,
                      outline: 'none'
                    }}
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={editingClient.email || ''}
                    onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 16,
                      outline: 'none'
                    }}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={editingClient.phone || ''}
                    onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 16,
                      outline: 'none'
                    }}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                    Company
                  </label>
                  <input
                    type="text"
                    value={editingClient.company || ''}
                    onChange={(e) => setEditingClient({...editingClient, company: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 16,
                      outline: 'none'
                    }}
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                    Status
                  </label>
                  <select
                    value={editingClient.status || 'Active'}
                    onChange={(e) => setEditingClient({...editingClient, status: e.target.value as any})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 16,
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Prospect">Prospect</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    value={editingClient.notes || ''}
                    onChange={(e) => setEditingClient({...editingClient, notes: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 8,
                      border: '1px solid #d1d5db',
                      fontSize: 16,
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    placeholder="Add notes about this client..."
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                  <button
                    onClick={() => setShowSidebar(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#f3f4f6',
                      color: '#64748b',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClient}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#6366f1',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Create Client
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedClient && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            width: 500,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>
                Process Payment
              </h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: 4,
                  borderRadius: 4
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, color: '#64748b', marginBottom: 8 }}>Client</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b' }}>{selectedClient.name}</div>
              <div style={{ fontSize: 14, color: '#ef4444', marginTop: 4 }}>
                Outstanding Balance: ${selectedClient.outstandingBalance.toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                  Payment Amount *
                </label>
                <input
                  type="number"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Enter payment amount"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                  Payment Method *
                </label>
                <div style={{ display: 'flex', gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentForm.method === 'cash'}
                      onChange={(e) => setPaymentForm({...paymentForm, method: e.target.value as any})}
                    />
                    <span style={{ fontSize: 16 }}>💵 Cash</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentForm.method === 'card'}
                      onChange={(e) => setPaymentForm({...paymentForm, method: e.target.value as any})}
                    />
                    <span style={{ fontSize: 16 }}>💳 Credit Card</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentForm.method === 'bank_transfer'}
                      onChange={(e) => setPaymentForm({...paymentForm, method: e.target.value as any})}
                    />
                    <span style={{ fontSize: 16 }}>🏛️ Bank Transfer</span>
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                  Reference Number
                </label>
                <input
                  type="text"
                  value={paymentForm.reference}
                  onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Transaction reference or check number"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({...paymentForm, notes: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Additional notes about this payment..."
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f3f4f6',
                    color: '#64748b',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (paymentForm.amount && parseFloat(paymentForm.amount) > 0) {
                      handlePayment(selectedClient.id, {
                        amount: parseFloat(paymentForm.amount),
                        method: paymentForm.method,
                        date: new Date().toISOString().split('T')[0],
                        reference: paymentForm.reference,
                        notes: paymentForm.notes,
                        status: 'completed'
                      });
                      setShowPaymentModal(false);
                      setPaymentForm({ amount: '', method: 'card', reference: '', notes: '' });
                    } else {
                      alert('Please enter a valid payment amount');
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#6366f1',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Process Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && selectedClient && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            width: 600,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>
                Send Email
              </h2>
              <button
                onClick={() => setShowEmailModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: 4,
                  borderRadius: 4
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, color: '#64748b', marginBottom: 8 }}>To</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b' }}>{selectedClient.email}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                  Subject *
                </label>
                <input
                  type="text"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 16,
                    outline: 'none'
                  }}
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                  Message *
                </label>
                <textarea
                  rows={8}
                  value={emailForm.content}
                  onChange={(e) => setEmailForm({...emailForm, content: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Write your email message here..."
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => setShowEmailModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f3f4f6',
                    color: '#64748b',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (emailForm.subject && emailForm.content) {
                      const newComm: Communication = {
                        id: `COMM-${Date.now()}`,
                        clientId: selectedClient.id,
                        type: 'email',
                        direction: 'outbound',
                        subject: emailForm.subject,
                        content: emailForm.content,
                        date: new Date().toISOString().split('T')[0],
                        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                        status: 'sent'
                      };
                      setCommunications([...communications, newComm]);
                      setShowEmailModal(false);
                      setEmailForm({ subject: '', content: '' });
                      alert('Email sent successfully!');
                    } else {
                      alert('Please fill in both subject and message');
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedClient && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            width: 500,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>
                Send Message
              </h2>
              <button
                onClick={() => setShowMessageModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: 4,
                  borderRadius: 4
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, color: '#64748b', marginBottom: 8 }}>To</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b' }}>{selectedClient.phone}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                  Message *
                </label>
                <textarea
                  rows={6}
                  value={messageForm.content}
                  onChange={(e) => setMessageForm({...messageForm, content: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Write your message here..."
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => setShowMessageModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f3f4f6',
                    color: '#64748b',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (messageForm.content) {
                      const newComm: Communication = {
                        id: `COMM-${Date.now()}`,
                        clientId: selectedClient.id,
                        type: 'text',
                        direction: 'outbound',
                        content: messageForm.content,
                        date: new Date().toISOString().split('T')[0],
                        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                        status: 'sent'
                      };
                      setCommunications([...communications, newComm]);
                      setShowMessageModal(false);
                      setMessageForm({ content: '' });
                      alert('Message sent successfully!');
                    } else {
                      alert('Please enter a message');
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#f59e0b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Preview Modal */}
      {showInvoiceModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            width: 800,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>
                Invoice Preview - {showInvoiceModal.id}
              </h2>
              <button
                onClick={() => setShowInvoiceModal(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: 4,
                  borderRadius: 4
                }}
              >
                ✕
              </button>
            </div>

            {/* Invoice Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: 32,
              paddingBottom: 24,
              borderBottom: '2px solid #e2e8f0'
            }}>
              <div>
                <h3 style={{ fontSize: 28, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
                  AV+V Venues
                </h3>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
                  123 Venue Street<br />
                  Event City, EC 12345<br />
                  Phone: (555) 123-4567<br />
                  Email: info@avvvenues.com
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
                  INVOICE
                </div>
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>
                  Invoice #: {showInvoiceModal.id}
                </div>
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>
                  Date: {showInvoiceModal.createdAt}
                </div>
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>
                  Due: {showInvoiceModal.due}
                </div>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  background: getInvoiceStatusBackgroundColor(showInvoiceModal.status),
                  color: getInvoiceStatusColor(showInvoiceModal.status),
                  textTransform: 'capitalize',
                }}>
                  {showInvoiceModal.status}
                </span>
              </div>
            </div>

            {/* Bill To */}
            <div style={{ marginBottom: 32 }}>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 12 }}>
                Bill To:
              </h4>
              <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>
                {showInvoiceModal.client}<br />
                Booking ID: {showInvoiceModal.bookingId}
              </div>
            </div>

            {/* Line Items */}
            <div style={{ marginBottom: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 0', textAlign: 'left', fontSize: 14, fontWeight: 600, color: '#374151' }}>
                      Description
                    </th>
                    <th style={{ padding: '12px 0', textAlign: 'center', fontSize: 14, fontWeight: 600, color: '#374151' }}>
                      Qty
                    </th>
                    <th style={{ padding: '12px 0', textAlign: 'right', fontSize: 14, fontWeight: 600, color: '#374151' }}>
                      Unit Price
                    </th>
                    <th style={{ padding: '12px 0', textAlign: 'right', fontSize: 14, fontWeight: 600, color: '#374151' }}>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showInvoiceModal.lineItems.map((item, index) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 0', fontSize: 14, color: '#374151' }}>
                        {item.description}
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'center', fontSize: 14, color: '#374151' }}>
                        {item.quantity}
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'right', fontSize: 14, color: '#374151' }}>
                        ${item.unitPrice.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'right', fontSize: 14, color: '#374151' }}>
                        ${item.amount.toLocaleString()}
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
              marginBottom: 32
            }}>
              <div style={{ width: 300 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0',
                  fontSize: 14,
                  color: '#64748b'
                }}>
                  <span>Subtotal:</span>
                  <span>${showInvoiceModal.amount.toLocaleString()}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0',
                  fontSize: 14,
                  color: '#64748b'
                }}>
                  <span>Tax (10%):</span>
                  <span>${showInvoiceModal.tax.toLocaleString()}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '12px 0',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1e293b',
                  borderTop: '2px solid #e2e8f0'
                }}>
                  <span>Total:</span>
                  <span>${showInvoiceModal.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {showInvoiceModal.notes && (
              <div style={{ marginBottom: 32 }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 12 }}>
                  Notes:
                </h4>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
                  {showInvoiceModal.notes}
                </div>
              </div>
            )}

            {/* Payment Info */}
            {showInvoiceModal.paymentMethod && (
              <div style={{ marginBottom: 32 }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 12 }}>
                  Payment Information:
                </h4>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
                  Method: {showInvoiceModal.paymentMethod}<br />
                  Date: {showInvoiceModal.paymentDate}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowInvoiceModal(null)}
                style={{
                  padding: '12px 24px',
                  background: '#f3f4f6',
                  color: '#64748b',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Simulate sending invoice
                  alert('Invoice sent successfully!');
                  setShowInvoiceModal(null);
                }}
                style={{
                  padding: '12px 24px',
                  background: '#6366f1',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Send Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}