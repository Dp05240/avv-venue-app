'use client';

import React from 'react';

interface ProductionRoadmapPDFProps {
  onGenerate?: () => void;
}

const ProductionRoadmapPDF: React.FC<ProductionRoadmapPDFProps> = ({ onGenerate }) => {
  const generateRoadmapPDF = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AV+V Venue Management System - Production Roadmap</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #1e293b; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
          h2 { color: #374151; margin-top: 30px; }
          h3 { color: #4b5563; margin-top: 20px; }
          .phase { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1; }
          .phase-title { color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
          .objective { background: #e0f2fe; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .objective-title { color: #0369a1; font-weight: bold; }
          .feature-list { margin-left: 20px; }
          .feature-item { margin: 5px 0; }
          .deliverable { background: #f0fdf4; padding: 10px; border-radius: 4px; margin: 5px 0; border-left: 3px solid #22c55e; }
          .timeline { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .timeline-title { color: #d97706; font-weight: bold; }
          .budget { background: #fef2f2; padding: 10px; border-radius: 4px; margin: 5px 0; border-left: 3px solid #ef4444; }
          .budget-title { color: #dc2626; font-weight: bold; }
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
        <h2>Production Roadmap & Development Plan</h2>
        <p><strong>Complete Development Strategy for Production Launch</strong></p>
        <p><em>Generated: ${new Date().toLocaleDateString()}</em></p>

        <div class="toc">
          <h3>Table of Contents</h3>
          <div class="toc-item">1. Project Overview</div>
          <div class="toc-item">2. Phase 1: Core Features (MVP) - 8-10 Weeks</div>
          <div class="toc-item">3. Phase 2: Advanced Features - 6-8 Weeks</div>
          <div class="toc-item">4. Phase 3: AI & Mobile Features - 6-8 Weeks</div>
          <div class="toc-item">5. Timeline Summary</div>
          <div class="toc-item">6. Budget Breakdown</div>
          <div class="toc-item">7. Success Metrics</div>
          <div class="toc-item">8. Development Team Requirements</div>
        </div>

        <div class="phase">
          <div class="phase-title">1. PROJECT OVERVIEW</div>
          <p><strong>Objective:</strong> Transform the current prototype into a production-ready venue management system with comprehensive features for competitive advantage.</p>
          
          <div class="timeline">
            <div class="timeline-title">Current Status:</div>
            <div class="feature-list">
              <div class="feature-item">✅ Frontend: Next.js, TypeScript, React (80% complete)</div>
              <div class="feature-item">✅ Backend: Node.js, Express, PostgreSQL (70% complete)</div>
              <div class="feature-item">✅ Basic Features: Dashboard, clients, bookings (60% complete)</div>
              <div class="feature-item">❌ Missing: Payment integration, email/SMS, mobile apps, AI features</div>
            </div>
          </div>

          <div class="budget">
            <div class="budget-title">Total Investment Required:</div>
            <div class="feature-list">
              <div class="feature-item">💰 Phase 1: $20,000-25,000</div>
              <div class="feature-item">💰 Phase 2: $25,000-30,000</div>
              <div class="feature-item">💰 Phase 3: $30,000-35,000</div>
              <div class="feature-item">💰 Total: $75,000-90,000</div>
            </div>
          </div>
        </div>

        <div class="phase">
          <div class="phase-title">2. PHASE 1: CORE FEATURES (MVP) - 8-10 WEEKS</div>
          
          <div class="objective">
            <div class="objective-title">Objective:</div>
            <p>Complete the foundation with essential features for basic venue operations</p>
          </div>

          <h3>2.1 Authentication & User Management (Week 1-2)</h3>
          <div class="deliverable">
            <strong>Current Status:</strong> Basic login implemented
          </div>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ JWT Authentication - Secure login/logout</div>
              <div class="feature-item">✅ Role-based Access - Admin, Staff, Client roles</div>
              <div class="feature-item">✅ Password Reset - Email-based recovery</div>
              <div class="feature-item">✅ Session Management - Remember me, auto-logout</div>
              <div class="feature-item">✅ User Profiles - Edit personal information</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Complete authentication system, User role management, Password security features, Profile management interface
          </div>

          <h3>2.2 Dashboard Enhancement (Week 2-3)</h3>
          <div class="deliverable">
            <strong>Current Status:</strong> Basic dashboard with metrics
          </div>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Real-time Metrics - Live revenue, bookings, occupancy</div>
              <div class="feature-item">✅ Interactive Charts - Revenue trends, booking patterns</div>
              <div class="feature-item">✅ Quick Actions - One-click booking, client creation</div>
              <div class="feature-item">✅ Recent Activities - Latest system activities</div>
              <div class="feature-item">✅ Weather Integration - Real weather data for venues</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Enhanced dashboard with live data, Interactive analytics charts, Quick action buttons, Activity feed
          </div>

          <h3>2.3 Client Management Completion (Week 3-4)</h3>
          <div class="deliverable">
            <strong>Current Status:</strong> Basic client list and details
          </div>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Client Profiles - Complete client information</div>
              <div class="feature-item">✅ Payment Tracking - Payment history, outstanding balances</div>
              <div class="feature-item">✅ Communication Hub - Email and SMS integration</div>
              <div class="feature-item">✅ Invoice Management - Generate and track invoices</div>
              <div class="feature-item">✅ Client Search & Filter - Advanced search capabilities</div>
              <div class="feature-item">✅ Client Archive - Archive inactive clients</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Complete client management system, Payment tracking interface, Communication tools, Invoice generation system
          </div>

          <h3>2.4 Booking System Enhancement (Week 4-6)</h3>
          <div class="deliverable">
            <strong>Current Status:</strong> Basic booking calendar
          </div>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Advanced Calendar - Monthly/weekly/daily views</div>
              <div class="feature-item">✅ Drag & Drop Booking - Easy event scheduling</div>
              <div class="feature-item">✅ Conflict Detection - Automatic availability checking</div>
              <div class="feature-item">✅ Booking Details - Complete event information</div>
              <div class="feature-item">✅ Service Add-ons - Catering, AV, decorations</div>
              <div class="feature-item">✅ Booking Status - Confirmed, pending, cancelled</div>
              <div class="feature-item">✅ Calendar Blocks - Reserve dates for maintenance</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Enhanced booking calendar, Event management system, Service add-on interface, Booking status tracking
          </div>

          <h3>2.5 Venue Management (Week 6-7)</h3>
          <div class="deliverable">
            <strong>Current Status:</strong> Basic venue information
          </div>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Venue Profiles - Complete venue information</div>
              <div class="feature-item">✅ Space Management - Individual space details</div>
              <div class="feature-item">✅ Capacity Tracking - Real-time availability</div>
              <div class="feature-item">✅ Amenity Management - Available services</div>
              <div class="feature-item">✅ Operating Hours - Business hours configuration</div>
              <div class="feature-item">✅ Floor Plans - Visual venue layout</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Complete venue management system, Space allocation interface, Capacity tracking, Venue configuration tools
          </div>

          <h3>2.6 Operations Hub (Week 7-8)</h3>
          <div class="deliverable">
            <strong>Current Status:</strong> Basic inventory and maintenance
          </div>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Inventory Management - Item tracking, stock levels</div>
              <div class="feature-item">✅ Maintenance Tracking - Work orders, schedules</div>
              <div class="feature-item">✅ Supplier Management - Vendor information</div>
              <div class="feature-item">✅ Transaction History - Complete audit trail</div>
              <div class="feature-item">✅ Low Stock Alerts - Automatic notifications</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Inventory management system, Maintenance tracking interface, Supplier management, Alert system
          </div>

          <h3>2.7 Financial Management (Week 8-9)</h3>
          <div class="deliverable">
            <strong>Current Status:</strong> Basic payment tracking
          </div>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Payment Processing - Stripe/PayPal integration</div>
              <div class="feature-item">✅ Revenue Analytics - Income tracking and reports</div>
              <div class="feature-item">✅ Invoice Generation - Professional invoice creation</div>
              <div class="feature-item">✅ Outstanding Balances - Payment tracking</div>
              <div class="feature-item">✅ Financial Reports - P&L, cash flow reports</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Payment processing system, Financial reporting interface, Invoice generation, Revenue analytics
          </div>

          <h3>2.8 Settings & Configuration (Week 9-10)</h3>
          <div class="deliverable">
            <strong>Current Status:</strong> Basic settings
          </div>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Business Settings - Company information, policies</div>
              <div class="feature-item">✅ System Configuration - User management, notifications</div>
              <div class="feature-item">✅ Tax Configuration - Tax rates and reporting</div>
              <div class="feature-item">✅ Currency Settings - Multi-currency support</div>
              <div class="feature-item">✅ Backup Configuration - Data backup settings</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Complete settings interface, Business configuration tools, System administration, Data management
          </div>
        </div>

        <div class="phase">
          <div class="phase-title">3. PHASE 2: ADVANCED FEATURES - 6-8 WEEKS</div>
          
          <div class="objective">
            <div class="objective-title">Objective:</div>
            <p>Add sophisticated features for competitive advantage</p>
          </div>

          <h3>3.1 API Development (Week 1-2)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ RESTful API - Complete API documentation</div>
              <div class="feature-item">✅ Authentication - API key management</div>
              <div class="feature-item">✅ Rate Limiting - API usage controls</div>
              <div class="feature-item">✅ Webhook Support - Real-time notifications</div>
              <div class="feature-item">✅ Third-party Integrations - External system connections</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Complete API documentation, API authentication system, Integration endpoints, Webhook functionality
          </div>

          <h3>3.2 Advanced Analytics (Week 2-4)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Revenue Analytics - Advanced financial reporting</div>
              <div class="feature-item">✅ Booking Analytics - Booking patterns and trends</div>
              <div class="feature-item">✅ Customer Analytics - Client behavior analysis</div>
              <div class="feature-item">✅ Operational Analytics - Efficiency metrics</div>
              <div class="feature-item">✅ Custom Reports - User-defined reports</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Advanced analytics dashboard, Custom reporting tools, Data visualization, Export functionality
          </div>

          <h3>3.3 Multi-venue Features (Week 4-5)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Multi-venue Dashboard - Cross-venue analytics</div>
              <div class="feature-item">✅ Venue Comparison - Performance comparison</div>
              <div class="feature-item">✅ Centralized Management - Unified control panel</div>
              <div class="feature-item">✅ Venue-specific Settings - Individual configurations</div>
              <div class="feature-item">✅ Cross-venue Bookings - Multi-location events</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Multi-venue management system, Cross-venue analytics, Centralized control panel, Venue comparison tools
          </div>

          <h3>3.4 Advanced Integrations (Week 5-6)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Accounting Software - QuickBooks, Xero integration</div>
              <div class="feature-item">✅ Email Marketing - Mailchimp, SendGrid</div>
              <div class="feature-item">✅ CRM Systems - Salesforce, HubSpot</div>
              <div class="feature-item">✅ Event Platforms - Eventbrite, Cvent</div>
              <div class="feature-item">✅ Social Media - Instagram, Facebook integration</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Third-party integrations, Data synchronization, Automated workflows, Integration management
          </div>

          <h3>3.5 White-label Features (Week 6-7)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Custom Branding - Logo, colors, fonts</div>
              <div class="feature-item">✅ Domain Customization - Custom domains</div>
              <div class="feature-item">✅ Email Branding - Custom email templates</div>
              <div class="feature-item">✅ Invoice Branding - Custom invoice design</div>
              <div class="feature-item">✅ Client Portal - Branded client interface</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> White-label system, Branding customization, Custom domains, Branded communications
          </div>

          <h3>3.6 Advanced Security (Week 7-8)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Two-Factor Authentication - Enhanced security</div>
              <div class="feature-item">✅ SSO Integration - Single sign-on</div>
              <div class="feature-item">✅ Data Encryption - End-to-end encryption</div>
              <div class="feature-item">✅ Audit Logging - Complete activity tracking</div>
              <div class="feature-item">✅ GDPR Compliance - Data protection</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Enhanced security features, Compliance tools, Audit logging system, Data protection
          </div>
        </div>

        <div class="phase">
          <div class="phase-title">4. PHASE 3: AI & MOBILE FEATURES - 6-8 WEEKS</div>
          
          <div class="objective">
            <div class="objective-title">Objective:</div>
            <p>Add cutting-edge features for market leadership</p>
          </div>

          <h3>4.1 AI-Powered Features (Week 1-3)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Smart Pricing - Dynamic pricing recommendations</div>
              <div class="feature-item">✅ Demand Forecasting - Booking prediction</div>
              <div class="feature-item">✅ Automated Workflows - Smart task automation</div>
              <div class="feature-item">✅ Conflict Resolution - AI booking optimization</div>
              <div class="feature-item">✅ Customer Insights - Behavior analysis</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> AI recommendation engine, Predictive analytics, Automated workflows, Smart pricing system
          </div>

          <h3>4.2 Mobile Applications (Week 3-6)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ iOS App - Native iPhone application</div>
              <div class="feature-item">✅ Android App - Native Android application</div>
              <div class="feature-item">✅ Offline Functionality - Work without internet</div>
              <div class="feature-item">✅ Push Notifications - Real-time alerts</div>
              <div class="feature-item">✅ Mobile Payments - Contactless transactions</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Native mobile applications, Offline functionality, Push notification system, Mobile payment integration
          </div>

          <h3>4.3 Advanced Reporting (Week 6-7)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Executive Dashboards - High-level insights</div>
              <div class="feature-item">✅ Custom Reports - User-defined analytics</div>
              <div class="feature-item">✅ Scheduled Reports - Automated reporting</div>
              <div class="feature-item">✅ Data Export - Multiple format support</div>
              <div class="feature-item">✅ Real-time Alerts - Instant notifications</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Advanced reporting system, Custom analytics, Automated reporting, Data export tools
          </div>

          <h3>4.4 Enterprise Features (Week 7-8)</h3>
          <div class="deliverable">
            <strong>Production Goals:</strong>
            <div class="feature-list">
              <div class="feature-item">✅ Multi-tenant Architecture - SaaS platform</div>
              <div class="feature-item">✅ Advanced Permissions - Granular access control</div>
              <div class="feature-item">✅ Custom Integrations - API development</div>
              <div class="feature-item">✅ Dedicated Support - Priority assistance</div>
              <div class="feature-item">✅ Custom Training - User education</div>
            </div>
          </div>
          <div class="deliverable">
            <strong>Deliverables:</strong> Multi-tenant system, Advanced permissions, Custom integration tools, Enterprise support
          </div>
        </div>

        <div class="phase">
          <div class="phase-title">5. TIMELINE SUMMARY</div>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f1f5f9;">
              <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: left;">Phase</th>
              <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: left;">Duration</th>
              <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: left;">Focus</th>
              <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: left;">Budget</th>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">Phase 1</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">8-10 weeks</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">Core MVP</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">$20,000-25,000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">Phase 2</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">6-8 weeks</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">Advanced Features</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">$25,000-30,000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">Phase 3</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">6-8 weeks</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">AI & Mobile</td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;">$30,000-35,000</td>
            </tr>
            <tr style="background: #fef3c7;">
              <td style="border: 1px solid #cbd5e1; padding: 12px;"><strong>Total</strong></td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;"><strong>20-26 weeks</strong></td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;"><strong>Complete System</strong></td>
              <td style="border: 1px solid #cbd5e1; padding: 12px;"><strong>$75,000-90,000</strong></td>
            </tr>
          </table>
        </div>

        <div class="phase">
          <div class="phase-title">6. SUCCESS METRICS</div>
          
          <h3>Technical Metrics:</h3>
          <div class="feature-list">
            <div class="feature-item">✅ 100% feature completion per phase</div>
            <div class="feature-item">✅ Zero critical bugs in production</div>
            <div class="feature-item">✅ 99.9% uptime for live system</div>
            <div class="feature-item">✅ < 2 second page load times</div>
            <div class="feature-item">✅ Mobile responsive on all devices</div>
          </div>

          <h3>Business Metrics:</h3>
          <div class="feature-list">
            <div class="feature-item">✅ User adoption > 80% within 30 days</div>
            <div class="feature-item">✅ Customer satisfaction > 4.5/5 stars</div>
            <div class="feature-item">✅ Feature usage > 70% of implemented features</div>
            <div class="feature-item">✅ Support tickets < 5% of user base</div>
            <div class="feature-item">✅ Revenue generation within 3 months of launch</div>
          </div>
        </div>

        <div class="phase">
          <div class="phase-title">7. DEVELOPMENT TEAM REQUIREMENTS</div>
          
          <h3>Phase 1 Team (8-10 weeks):</h3>
          <div class="feature-list">
            <div class="feature-item">👨‍💻 1 Full-Stack Developer (India) - $3,000/month</div>
            <div class="feature-item">🎨 1 UI/UX Designer (India) - $2,000/month</div>
            <div class="feature-item">📊 1 QA Tester (India) - $1,500/month</div>
            <div class="feature-item">📋 1 Project Manager (India) - $2,500/month</div>
          </div>

          <h3>Phase 2 Team (6-8 weeks):</h3>
          <div class="feature-list">
            <div class="feature-item">👨‍💻 1 Full-Stack Developer (India) - $3,000/month</div>
            <div class="feature-item">🔧 1 Backend Developer (India) - $2,500/month</div>
            <div class="feature-item">📊 1 QA Tester (India) - $1,500/month</div>
            <div class="feature-item">📋 1 Project Manager (India) - $2,500/month</div>
          </div>

          <h3>Phase 3 Team (6-8 weeks):</h3>
          <div class="feature-list">
            <div class="feature-item">📱 1 Mobile Developer (India) - $3,500/month</div>
            <div class="feature-item">🤖 1 AI/ML Developer (India) - $4,000/month</div>
            <div class="feature-item">📊 1 QA Tester (India) - $1,500/month</div>
            <div class="feature-item">📋 1 Project Manager (India) - $2,500/month</div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 40px; text-align: center;">
          <button onclick="window.print()" style="padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
            Download Production Roadmap PDF
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
        🚀 Production Roadmap PDF
      </h3>
      <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>
        Generate a comprehensive production roadmap with detailed phases, timelines, budgets, and deliverables for development teams.
      </p>
      <button
        onClick={generateRoadmapPDF}
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
        🚀 Generate Production Roadmap PDF
      </button>
    </div>
  );
};

export default ProductionRoadmapPDF; 