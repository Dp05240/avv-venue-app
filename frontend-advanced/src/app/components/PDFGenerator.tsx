'use client';

import React from 'react';

interface PDFGeneratorProps {
  onGenerate?: () => void;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ onGenerate }) => {
  const generatePDF = () => {
    // Create a simple PDF using browser's print functionality
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AV+V Venue Management System - Product Documentation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #1e293b; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
          h2 { color: #374151; margin-top: 30px; }
          h3 { color: #4b5563; margin-top: 20px; }
          .feature-list { margin-left: 20px; }
          .feature-item { margin: 5px 0; }
          .section { margin-bottom: 30px; }
          .toc { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .toc-item { margin: 5px 0; }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>AV+V Venue Management System</h1>
        <h2>Product Documentation</h2>
        <p><strong>Complete Guide to Features and Usage</strong></p>
        <p><em>Generated: ${new Date().toLocaleDateString()}</em></p>

        <div class="toc">
          <h3>Table of Contents</h3>
          <div class="toc-item">1. System Overview</div>
          <div class="toc-item">2. Dashboard Features</div>
          <div class="toc-item">3. Client Management</div>
          <div class="toc-item">4. Booking System</div>
          <div class="toc-item">5. Venue Management</div>
          <div class="toc-item">6. Operations Hub</div>
          <div class="toc-item">7. Financial Management</div>
          <div class="toc-item">8. Settings & Configuration</div>
          <div class="toc-item">9. Technical Architecture</div>
          <div class="toc-item">10. API Documentation</div>
          <div class="toc-item">11. Deployment Guide</div>
          <div class="toc-item">12. Support & Contact</div>
        </div>

        <div class="section">
          <h2>1. System Overview</h2>
          <p>The AV+V Venue Management System is a comprehensive platform designed to streamline all aspects of venue operations. Built with modern web technologies including Next.js, TypeScript, and React, the system provides an intuitive interface for managing clients, bookings, venues, and operations.</p>
          
          <h3>Key Features:</h3>
          <div class="feature-list">
            <div class="feature-item">• Real-time dashboard with live metrics</div>
            <div class="feature-item">• Comprehensive client management with payment tracking</div>
            <div class="feature-item">• Advanced booking system with calendar integration</div>
            <div class="feature-item">• Multi-venue support with detailed space management</div>
            <div class="feature-item">• Complete operations hub for inventory and maintenance</div>
            <div class="feature-item">• Financial management with invoice generation</div>
            <div class="feature-item">• User management with role-based access control</div>
          </div>
        </div>

        <div class="section">
          <h2>2. Dashboard Features</h2>
          
          <h3>2.1 Real-time Metrics</h3>
          <p>The dashboard provides real-time insights into venue performance:</p>
          <div class="feature-list">
            <div class="feature-item">• Today's Revenue: Live tracking of daily earnings</div>
            <div class="feature-item">• Active Bookings: Current number of confirmed events</div>
            <div class="feature-item">• Venue Utilization: Percentage of venue capacity in use</div>
            <div class="feature-item">• Pending Payments: Outstanding balances to be collected</div>
            <div class="feature-item">• Customer Satisfaction: Average rating from client feedback</div>
            <div class="feature-item">• Maintenance Alerts: Number of pending maintenance tasks</div>
          </div>

          <h3>2.2 Quick Actions</h3>
          <p>Quick access to common tasks:</p>
          <div class="feature-list">
            <div class="feature-item">• New Booking: Create a new event booking</div>
            <div class="feature-item">• Check Availability: View venue availability calendar</div>
            <div class="feature-item">• Send Invoice: Generate and send invoices to clients</div>
            <div class="feature-item">• Schedule Maintenance: Create maintenance work orders</div>
            <div class="feature-item">• Add Client: Register new clients in the system</div>
          </div>
        </div>

        <div class="section">
          <h2>3. Client Management</h2>
          
          <h3>3.1 Client Overview</h3>
          <p>The client management system provides comprehensive tools for managing client relationships:</p>
          <div class="feature-list">
            <div class="feature-item">• Client Profiles: Complete client information and history</div>
            <div class="feature-item">• Payment Tracking: Monitor payment history and outstanding balances</div>
            <div class="feature-item">• Communication Hub: Email and message management</div>
            <div class="feature-item">• Invoice Management: Generate and track invoices</div>
            <div class="feature-item">• Booking History: View all past and upcoming events</div>
            <div class="feature-item">• Client Status: Track client activity and engagement</div>
          </div>

          <h3>3.2 Payment Processing</h3>
          <p>Advanced payment management capabilities:</p>
          <div class="feature-list">
            <div class="feature-item">• Multiple Payment Methods: Cash, credit card, bank transfer</div>
            <div class="feature-item">• Payment Tracking: Real-time payment status updates</div>
            <div class="feature-item">• Invoice Generation: Automated invoice creation</div>
            <div class="feature-item">• Outstanding Balance Tracking: Monitor unpaid amounts</div>
            <div class="feature-item">• Payment History: Complete transaction records</div>
            <div class="feature-item">• Refund Management: Process refunds and adjustments</div>
          </div>
        </div>

        <div class="section">
          <h2>4. Booking System</h2>
          
          <h3>4.1 Calendar View</h3>
          <p>Interactive calendar interface for booking management:</p>
          <div class="feature-list">
            <div class="feature-item">• Monthly/Weekly/Daily Views: Flexible calendar display options</div>
            <div class="feature-item">• Event Visualization: Color-coded events by status</div>
            <div class="feature-item">• Drag & Drop: Easy event rescheduling</div>
            <div class="feature-item">• Quick Booking: One-click booking creation</div>
            <div class="feature-item">• Conflict Detection: Automatic availability checking</div>
            <div class="feature-item">• Calendar Blocks: Reserve dates for maintenance or private events</div>
          </div>

          <h3>4.2 Booking Details</h3>
          <p>Comprehensive booking information management:</p>
          <div class="feature-list">
            <div class="feature-item">• Event Information: Date, time, space, attendees</div>
            <div class="feature-item">• Client Details: Contact information and requirements</div>
            <div class="feature-item">• Service Add-ons: Catering, AV, decorations, security</div>
            <div class="feature-item">• Financial Information: Pricing, deposits, payments</div>
            <div class="feature-item">• Special Requirements: Custom needs and accommodations</div>
            <div class="feature-item">• Status Tracking: Confirmed, pending, completed, cancelled</div>
          </div>
        </div>

        <div class="section">
          <h2>5. Venue Management</h2>
          
          <h3>5.1 Venue Information</h3>
          <p>Complete venue profile management:</p>
          <div class="feature-list">
            <div class="feature-item">• Basic Information: Name, type, address, contact details</div>
            <div class="feature-item">• Capacity Management: Seated, standing, and banquet capacities</div>
            <div class="feature-item">• Technical Specifications: Power, internet, AV equipment</div>
            <div class="feature-item">• Amenities: Available services and facilities</div>
            <div class="feature-item">• Operating Hours: Business hours and availability</div>
            <div class="feature-item">• Policies: Booking policies, house rules, insurance requirements</div>
          </div>

          <h3>5.2 Space Management</h3>
          <p>Individual space management within venues:</p>
          <div class="feature-list">
            <div class="feature-item">• Space Profiles: Detailed information for each area</div>
            <div class="feature-item">• Capacity Tracking: Real-time availability monitoring</div>
            <div class="feature-item">• Amenity Management: Services available in each space</div>
            <div class="feature-item">• Status Updates: Available, booked, maintenance</div>
            <div class="feature-item">• Floor Plans: Visual representation of venue layout</div>
            <div class="feature-item">• Equipment Assignment: AV and technical equipment allocation</div>
          </div>
        </div>

        <div class="section">
          <h2>6. Operations Hub</h2>
          
          <h3>6.1 Inventory Management</h3>
          <p>Comprehensive inventory tracking system:</p>
          <div class="feature-list">
            <div class="feature-item">• Item Categories: Organized inventory by type and function</div>
            <div class="feature-item">• Stock Levels: Real-time quantity tracking</div>
            <div class="feature-item">• Low Stock Alerts: Automatic notifications for reordering</div>
            <div class="feature-item">• Transaction History: Complete audit trail of movements</div>
            <div class="feature-item">• Supplier Management: Vendor information and contact details</div>
            <div class="feature-item">• Cost Tracking: Purchase costs and rental pricing</div>
          </div>

          <h3>6.2 Maintenance Management</h3>
          <p>Preventive and reactive maintenance tracking:</p>
          <div class="feature-list">
            <div class="feature-item">• Work Orders: Create and track maintenance tasks</div>
            <div class="feature-item">• Preventive Maintenance: Scheduled maintenance routines</div>
            <div class="feature-item">• Equipment Tracking: Monitor equipment condition and history</div>
            <div class="feature-item">• Vendor Coordination: Manage external service providers</div>
            <div class="feature-item">• Cost Tracking: Monitor maintenance expenses</div>
            <div class="feature-item">• Safety Compliance: Ensure regulatory requirements are met</div>
          </div>
        </div>

        <div class="section">
          <h2>7. Financial Management</h2>
          
          <h3>7.1 Revenue Tracking</h3>
          <p>Comprehensive financial management tools:</p>
          <div class="feature-list">
            <div class="feature-item">• Revenue Analytics: Track income by period and source</div>
            <div class="feature-item">• Payment Processing: Multiple payment method support</div>
            <div class="feature-item">• Invoice Generation: Professional invoice creation</div>
            <div class="feature-item">• Outstanding Balances: Monitor unpaid amounts</div>
            <div class="feature-item">• Financial Reports: P&L, cash flow, and revenue reports</div>
            <div class="feature-item">• Tax Management: Automated tax calculations and reporting</div>
          </div>

          <h3>7.2 Cost Management</h3>
          <p>Expense tracking and cost control:</p>
          <div class="feature-list">
            <div class="feature-item">• Operating Costs: Track venue operating expenses</div>
            <div class="feature-item">• Maintenance Costs: Monitor equipment and facility maintenance</div>
            <div class="feature-item">• Inventory Costs: Track inventory purchases and depreciation</div>
            <div class="feature-item">• Labor Costs: Monitor staff and contractor expenses</div>
            <div class="feature-item">• Cost Analytics: Analyze cost trends and optimization opportunities</div>
            <div class="feature-item">• Budget Management: Set and track budget targets</div>
          </div>
        </div>

        <div class="section">
          <h2>8. Settings & Configuration</h2>
          
          <h3>8.1 Business Settings</h3>
          <p>Customizable business configuration:</p>
          <div class="feature-list">
            <div class="feature-item">• Company Information: Name, contact details, branding</div>
            <div class="feature-item">• Operating Hours: Business hours and availability settings</div>
            <div class="feature-item">• Pricing Policies: Rate structures and payment terms</div>
            <div class="feature-item">• Booking Policies: Cancellation and deposit requirements</div>
            <div class="feature-item">• Tax Configuration: Tax rates and reporting settings</div>
            <div class="feature-item">• Currency Settings: Multi-currency support</div>
          </div>

          <h3>8.2 System Configuration</h3>
          <p>System-wide configuration options:</p>
          <div class="feature-list">
            <div class="feature-item">• User Management: Role-based access control</div>
            <div class="feature-item">• Notification Settings: Email and SMS configuration</div>
            <div class="feature-item">• Integration Settings: Third-party service connections</div>
            <div class="feature-item">• Backup Configuration: Data backup and recovery settings</div>
            <div class="feature-item">• Security Settings: Authentication and authorization</div>
            <div class="feature-item">• API Configuration: External system integrations</div>
          </div>
        </div>

        <div class="section">
          <h2>9. Technical Architecture</h2>
          
          <h3>9.1 Technology Stack</h3>
          <p>Modern, scalable technology architecture:</p>
          <div class="feature-list">
            <div class="feature-item">• Frontend: Next.js 15 with TypeScript and React</div>
            <div class="feature-item">• Styling: Tailwind CSS with custom design system</div>
            <div class="feature-item">• State Management: React hooks and context API</div>
            <div class="feature-item">• Backend: Node.js with Express.js framework</div>
            <div class="feature-item">• Database: PostgreSQL with Prisma ORM</div>
            <div class="feature-item">• Authentication: JWT-based authentication system</div>
            <div class="feature-item">• Deployment: Vercel for frontend, Railway for backend</div>
            <div class="feature-item">• Monitoring: Real-time performance monitoring</div>
          </div>

          <h3>9.2 System Architecture</h3>
          <p>Scalable and maintainable system design:</p>
          <div class="feature-list">
            <div class="feature-item">• Microservices Architecture: Modular service design</div>
            <div class="feature-item">• RESTful API: Standardized API endpoints</div>
            <div class="feature-item">• Real-time Updates: WebSocket connections for live data</div>
            <div class="feature-item">• Caching Strategy: Redis for performance optimization</div>
            <div class="feature-item">• Security: HTTPS, CORS, and input validation</div>
            <div class="feature-item">• Error Handling: Comprehensive error management</div>
            <div class="feature-item">• Logging: Structured logging for debugging</div>
            <div class="feature-item">• Testing: Unit and integration test coverage</div>
          </div>
        </div>

        <div class="section">
          <h2>10. API Documentation</h2>
          
          <h3>10.1 Core Endpoints</h3>
          <p>RESTful API endpoints for system integration:</p>
          <div class="feature-list">
            <div class="feature-item">• /api/clients - Client management operations</div>
            <div class="feature-item">• /api/bookings - Booking system operations</div>
            <div class="feature-item">• /api/venues - Venue management operations</div>
            <div class="feature-item">• /api/inventory - Inventory management operations</div>
            <div class="feature-item">• /api/payments - Payment processing operations</div>
            <div class="feature-item">• /api/reports - Analytics and reporting data</div>
            <div class="feature-item">• /api/users - User management operations</div>
            <div class="feature-item">• /api/settings - System configuration operations</div>
          </div>

          <h3>10.2 Authentication</h3>
          <p>Secure API authentication system:</p>
          <div class="feature-list">
            <div class="feature-item">• JWT Tokens: Stateless authentication</div>
            <div class="feature-item">• Role-based Access: Granular permission control</div>
            <div class="feature-item">• API Keys: Secure external integrations</div>
            <div class="feature-item">• Rate Limiting: Protection against abuse</div>
            <div class="feature-item">• CORS Configuration: Cross-origin resource sharing</div>
            <div class="feature-item">• Input Validation: Comprehensive data validation</div>
          </div>
        </div>

        <div class="section">
          <h2>11. Deployment Guide</h2>
          
          <h3>11.1 Environment Setup</h3>
          <p>Production deployment configuration:</p>
          <div class="feature-list">
            <div class="feature-item">• Environment Variables: Secure configuration management</div>
            <div class="feature-item">• Database Setup: PostgreSQL installation and configuration</div>
            <div class="feature-item">• SSL Certificates: HTTPS security implementation</div>
            <div class="feature-item">• Domain Configuration: Custom domain setup</div>
            <div class="feature-item">• CDN Setup: Content delivery network configuration</div>
            <div class="feature-item">• Monitoring: Application performance monitoring</div>
          </div>

          <h3>11.2 Deployment Process</h3>
          <p>Automated deployment workflow:</p>
          <div class="feature-list">
            <div class="feature-item">• CI/CD Pipeline: Automated build and deployment</div>
            <div class="feature-item">• Database Migrations: Schema updates and data migration</div>
            <div class="feature-item">• Backup Strategy: Automated data backup procedures</div>
            <div class="feature-item">• Rollback Procedures: Emergency rollback capabilities</div>
            <div class="feature-item">• Health Checks: System health monitoring</div>
            <div class="feature-item">• Performance Optimization: Load balancing and caching</div>
          </div>
        </div>

        <div class="section">
          <h2>12. Support & Contact</h2>
          <p>For technical support and questions:</p>
          <div class="feature-list">
            <div class="feature-item">• Email: support@avvvenues.com</div>
            <div class="feature-item">• Phone: +1 (555) 123-4567</div>
            <div class="feature-item">• Documentation: https://docs.avvvenues.com</div>
            <div class="feature-item">• API Reference: https://api.avvvenues.com</div>
            <div class="feature-item">• Community: https://community.avvvenues.com</div>
          </div>

          <h3>System Requirements:</h3>
          <div class="feature-list">
            <div class="feature-item">• Modern web browser (Chrome, Firefox, Safari, Edge)</div>
            <div class="feature-item">• Internet connection for real-time features</div>
            <div class="feature-item">• Minimum screen resolution: 1024x768</div>
            <div class="feature-item">• Recommended: 4GB RAM, 2GHz processor</div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 40px; text-align: center;">
          <button onclick="window.print()" style="padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
            Download as PDF
          </button>
        </div>
      </body>
      </html>
    `;

    // Create a new window with the content
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(content);
      newWindow.document.close();
      
      // Trigger print after a short delay
      setTimeout(() => {
        newWindow.print();
      }, 500);
    }

    if (onGenerate) {
      onGenerate();
    }
  };

  return (
    <div style={{
      padding: '20px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      margin: '20px 0'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>
        📄 Product Documentation PDF
      </h3>
      <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>
        Generate a comprehensive PDF document containing all system features, technical specifications, and usage guidelines.
      </p>
      <button
        onClick={generatePDF}
        style={{
          padding: '12px 24px',
          background: '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        📄 Generate Product Documentation PDF
      </button>
    </div>
  );
};

export default PDFGenerator; 