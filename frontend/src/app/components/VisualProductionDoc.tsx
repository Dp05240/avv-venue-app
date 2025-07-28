'use client';

import React from 'react';

interface VisualProductionDocProps {
  onGenerate?: () => void;
}

const VisualProductionDoc: React.FC<VisualProductionDocProps> = ({ onGenerate }) => {
  const generateVisualDoc = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AV+V Venue Management System - Visual Production Documentation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #1e293b; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
          h2 { color: #374151; margin-top: 30px; }
          h3 { color: #4b5563; margin-top: 20px; }
          .section { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1; }
          .section-title { color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
          .screenshot { background: #e2e8f0; padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center; }
          .screenshot-title { color: #374151; font-weight: bold; margin-bottom: 10px; }
          .screenshot-placeholder { background: #cbd5e1; padding: 40px; border-radius: 6px; margin: 10px 0; color: #64748b; font-style: italic; }
          .feature-list { margin-left: 20px; }
          .feature-item { margin: 5px 0; }
          .tech-spec { background: #f0fdf4; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #22c55e; }
          .tech-spec-title { color: #166534; font-weight: bold; }
          .production-goal { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #f59e0b; }
          .production-goal-title { color: #d97706; font-weight: bold; }
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
        <h2>Visual Production Documentation</h2>
        <p><strong>Complete System Walkthrough with Screenshots and Technical Specifications</strong></p>
        <p><em>Generated: ${new Date().toLocaleDateString()}</em></p>

        <div class="toc">
          <h3>Table of Contents</h3>
          <div class="toc-item">1. System Overview</div>
          <div class="toc-item">2. Dashboard Interface</div>
          <div class="toc-item">3. Client Management System</div>
          <div class="toc-item">4. Booking Management</div>
          <div class="toc-item">5. Venue Management</div>
          <div class="toc-item">6. Operations Hub</div>
          <div class="toc-item">7. Financial Management</div>
          <div class="toc-item">8. Settings & Configuration</div>
          <div class="toc-item">9. Technical Architecture</div>
          <div class="toc-item">10. Production Requirements</div>
        </div>

        <div class="section">
          <div class="section-title">1. SYSTEM OVERVIEW</div>
          <p><strong>Platform:</strong> Modern web-based venue management system built with Next.js, TypeScript, and React</p>
          <p><strong>Target Users:</strong> Venue owners, event managers, and administrative staff</p>
          <p><strong>Core Purpose:</strong> Streamline venue operations including bookings, client management, financial tracking, and operational oversight</p>
          
          <div class="tech-spec">
            <div class="tech-spec-title">Current Technology Stack:</div>
            <div class="feature-list">
              <div class="feature-item">• Frontend: Next.js 15, TypeScript, React</div>
              <div class="feature-item">• Styling: Tailwind CSS with custom design system</div>
              <div class="feature-item">• Backend: Node.js, Express.js, PostgreSQL</div>
              <div class="feature-item">• Authentication: JWT-based system</div>
              <div class="feature-item">• State Management: React hooks and context API</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">2. DASHBOARD INTERFACE</div>
          
          <div class="screenshot">
            <div class="screenshot-title">Main Dashboard - Real-time Overview</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Dashboard showing revenue metrics, active bookings, venue utilization, 
              quick actions, recent activities, and weather widget]
            </div>
          </div>

          <h3>Dashboard Components & Functions:</h3>
          
          <div class="production-goal">
            <div class="production-goal-title">Revenue Metrics Section:</div>
            <div class="feature-list">
              <div class="feature-item">• Today's Revenue: Live calculation of daily earnings</div>
              <div class="feature-item">• Active Bookings: Real-time count of confirmed events</div>
              <div class="feature-item">• Venue Utilization: Percentage of venue capacity in use</div>
              <div class="feature-item">• Pending Payments: Outstanding balances to be collected</div>
              <div class="feature-item">• Customer Satisfaction: Average rating from client feedback</div>
              <div class="feature-item">• Maintenance Alerts: Number of pending maintenance tasks</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Quick Actions Panel:</div>
            <div class="feature-list">
              <div class="feature-item">• New Booking: One-click booking creation</div>
              <div class="feature-item">• Check Availability: Instant venue availability view</div>
              <div class="feature-item">• Send Invoice: Generate and send invoices</div>
              <div class="feature-item">• Schedule Maintenance: Create maintenance work orders</div>
              <div class="feature-item">• Add Client: Register new clients</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Recent Activities Feed:</div>
            <div class="feature-list">
              <div class="feature-item">• Real-time activity updates</div>
              <div class="feature-item">• Booking confirmations and changes</div>
              <div class="feature-item">• Payment notifications</div>
              <div class="feature-item">• System alerts and maintenance updates</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Production Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Real-time data updates via WebSocket connections</div>
              <div class="feature-item">• Interactive charts using Chart.js or D3.js</div>
              <div class="feature-item">• Weather API integration for venue-specific forecasts</div>
              <div class="feature-item">• Responsive design for all device sizes</div>
              <div class="feature-item">• Performance optimization for sub-2-second load times</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">3. CLIENT MANAGEMENT SYSTEM</div>
          
          <div class="screenshot">
            <div class="screenshot-title">Client List with Search and Filter</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Client table showing name, email, phone, status, outstanding balance, 
              invoices, and action buttons with search/filter functionality]
            </div>
          </div>

          <div class="screenshot">
            <div class="screenshot-title">Client Details Sidebar</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Right-side panel showing client profile, payment history, 
              booking history, communication logs, and action buttons]
            </div>
          </div>

          <h3>Client Management Features:</h3>
          
          <div class="production-goal">
            <div class="production-goal-title">Client Profile Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Complete client information storage</div>
              <div class="feature-item">• Contact history and communication logs</div>
              <div class="feature-item">• Payment history and outstanding balances</div>
              <div class="feature-item">• Booking history and preferences</div>
              <div class="feature-item">• Client status tracking (active, archived, VIP)</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Payment Processing:</div>
            <div class="feature-list">
              <div class="feature-item">• Multiple payment methods (cash, credit card, bank transfer)</div>
              <div class="feature-item">• Payment tracking and status updates</div>
              <div class="feature-item">• Outstanding balance monitoring</div>
              <div class="feature-item">• Payment history and receipts</div>
              <div class="feature-item">• Refund processing capabilities</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Communication Hub:</div>
            <div class="feature-list">
              <div class="feature-item">• Email integration with templates</div>
              <div class="feature-item">• SMS notifications via Twilio</div>
              <div class="feature-item">• Message history and tracking</div>
              <div class="feature-item">• Automated communication workflows</div>
              <div class="feature-item">• Communication preferences management</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Production Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Stripe/PayPal payment gateway integration</div>
              <div class="feature-item">• SendGrid/Twilio for email/SMS communication</div>
              <div class="feature-item">• Real-time payment status updates</div>
              <div class="feature-item">• Advanced search with filters and sorting</div>
              <div class="feature-item">• Data export capabilities (CSV, PDF)</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">4. BOOKING MANAGEMENT</div>
          
          <div class="screenshot">
            <div class="screenshot-title">Booking Calendar - Monthly View</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Interactive calendar showing booked dates, available slots, 
              color-coded events, and booking details on hover]
            </div>
          </div>

          <div class="screenshot">
            <div class="screenshot-title">Booking Details Modal</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Modal showing event details, client information, 
              service add-ons, pricing, and action buttons]
            </div>
          </div>

          <h3>Booking System Features:</h3>
          
          <div class="production-goal">
            <div class="production-goal-title">Calendar Interface:</div>
            <div class="feature-list">
              <div class="feature-item">• Monthly, weekly, and daily view options</div>
              <div class="feature-item">• Drag-and-drop booking creation</div>
              <div class="feature-item">• Color-coded events by status</div>
              <div class="feature-item">• Conflict detection and prevention</div>
              <div class="feature-item">• Calendar blocks for maintenance</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Event Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Complete event information capture</div>
              <div class="feature-item">• Service add-ons (catering, AV, decorations)</div>
              <div class="feature-item">• Pricing calculation and adjustments</div>
              <div class="feature-item">• Special requirements and notes</div>
              <div class="feature-item">• Booking status tracking</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Availability Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Real-time availability checking</div>
              <div class="feature-item">• Automatic conflict detection</div>
              <div class="feature-item">• Capacity management per venue</div>
              <div class="feature-item">• Booking approval workflows</div>
              <div class="feature-item">• Waitlist management</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Production Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• FullCalendar.js or similar calendar library</div>
              <div class="feature-item">• Real-time availability updates</div>
              <div class="feature-item">• Email confirmation system</div>
              <div class="feature-item">• Mobile-responsive calendar interface</div>
              <div class="feature-item">• Integration with external calendar systems</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">5. VENUE MANAGEMENT</div>
          
          <div class="screenshot">
            <div class="screenshot-title">Venue Overview Dashboard</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Venue cards showing name, type, capacity, current status, 
              next booking, and quick action buttons]
            </div>
          </div>

          <div class="screenshot">
            <div class="screenshot-title">Venue Details Page</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Detailed venue information including photos, specifications, 
              amenities, operating hours, and space breakdown]
            </div>
          </div>

          <h3>Venue Management Features:</h3>
          
          <div class="production-goal">
            <div class="production-goal-title">Venue Profiles:</div>
            <div class="feature-list">
              <div class="feature-item">• Complete venue information management</div>
              <div class="feature-item">• Photo gallery and virtual tours</div>
              <div class="feature-item">• Capacity specifications (seated, standing, banquet)</div>
              <div class="feature-item">• Technical specifications (power, internet, AV)</div>
              <div class="feature-item">• Amenities and services list</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Space Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Individual space tracking within venues</div>
              <div class="feature-item">• Capacity monitoring per space</div>
              <div class="feature-item">• Amenity assignment per space</div>
              <div class="feature-item">• Floor plan visualization</div>
              <div class="feature-item">• Equipment allocation tracking</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Operating Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Operating hours configuration</div>
              <div class="feature-item">• Maintenance scheduling</div>
              <div class="feature-item">• Cleaning schedules</div>
              <div class="feature-item">• Staff assignment per venue</div>
              <div class="feature-item">• Venue status tracking</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Production Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Image upload and management system</div>
              <div class="feature-item">• Interactive floor plan editor</div>
              <div class="feature-item">• Real-time status updates</div>
              <div class="feature-item">• Multi-venue management capabilities</div>
              <div class="feature-item">• Venue comparison analytics</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">6. OPERATIONS HUB</div>
          
          <div class="screenshot">
            <div class="screenshot-title">Operations Dashboard</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Operations overview showing inventory status, maintenance alerts, 
              supplier information, and operational metrics]
            </div>
          </div>

          <div class="screenshot">
            <div class="screenshot-title">Inventory Management Interface</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Inventory table showing items, categories, stock levels, 
              suppliers, and transaction history]
            </div>
          </div>

          <h3>Operations Management Features:</h3>
          
          <div class="production-goal">
            <div class="production-goal-title">Inventory Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Item categorization and organization</div>
              <div class="feature-item">• Real-time stock level tracking</div>
              <div class="feature-item">• Low stock alerts and notifications</div>
              <div class="feature-item">• Transaction history and audit trail</div>
              <div class="feature-item">• Cost tracking and pricing management</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Maintenance Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Work order creation and tracking</div>
              <div class="feature-item">• Preventive maintenance scheduling</div>
              <div class="feature-item">• Equipment condition monitoring</div>
              <div class="feature-item">• Vendor coordination and management</div>
              <div class="feature-item">• Maintenance cost tracking</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Supplier Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Supplier database and contact information</div>
              <div class="feature-item">• Purchase order management</div>
              <div class="feature-item">• Contract tracking and renewal alerts</div>
              <div class="feature-item">• Performance evaluation and ratings</div>
              <div class="feature-item">• Cost comparison and analysis</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Production Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Barcode/QR code scanning capabilities</div>
              <div class="feature-item">• Automated reorder point calculations</div>
              <div class="feature-item">• Integration with supplier APIs</div>
              <div class="feature-item">• Mobile inventory management</div>
              <div class="feature-item">• Advanced reporting and analytics</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">7. FINANCIAL MANAGEMENT</div>
          
          <div class="screenshot">
            <div class="screenshot-title">Financial Dashboard</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Financial overview showing revenue, expenses, profit margins, 
              outstanding balances, and financial trends]
            </div>
          </div>

          <div class="screenshot">
            <div class="screenshot-title">Invoice Generation Interface</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Invoice creation form with line items, tax calculations, 
              payment terms, and professional formatting]
            </div>
          </div>

          <h3>Financial Management Features:</h3>
          
          <div class="production-goal">
            <div class="production-goal-title">Revenue Tracking:</div>
            <div class="feature-list">
              <div class="feature-item">• Real-time revenue analytics</div>
              <div class="feature-item">• Revenue breakdown by source</div>
              <div class="feature-item">• Trend analysis and forecasting</div>
              <div class="feature-item">• Performance comparison reports</div>
              <div class="feature-item">• Profit margin calculations</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Payment Processing:</div>
            <div class="feature-list">
              <div class="feature-item">• Multiple payment gateway integration</div>
              <div class="feature-item">• Automated payment processing</div>
              <div class="feature-item">• Payment status tracking</div>
              <div class="feature-item">• Refund and adjustment handling</div>
              <div class="feature-item">• Payment reconciliation</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Invoice Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Professional invoice generation</div>
              <div class="feature-item">• Customizable invoice templates</div>
              <div class="feature-item">• Automated invoice sending</div>
              <div class="feature-item">• Payment reminder system</div>
              <div class="feature-item">• Invoice tracking and history</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Production Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Stripe/PayPal payment gateway integration</div>
              <div class="feature-item">• PDF invoice generation</div>
              <div class="feature-item">• Email invoice delivery system</div>
              <div class="feature-item">• Financial reporting and analytics</div>
              <div class="feature-item">• Tax calculation and reporting</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">8. SETTINGS & CONFIGURATION</div>
          
          <div class="screenshot">
            <div class="screenshot-title">System Settings Dashboard</div>
            <div class="screenshot-placeholder">
              [SCREENSHOT: Settings overview with tabs for business settings, 
              user management, notifications, integrations, and system configuration]
            </div>
          </div>

          <h3>Configuration Management Features:</h3>
          
          <div class="production-goal">
            <div class="production-goal-title">Business Settings:</div>
            <div class="feature-list">
              <div class="feature-item">• Company information and branding</div>
              <div class="feature-item">• Operating hours and availability</div>
              <div class="feature-item">• Pricing policies and rate structures</div>
              <div class="feature-item">• Booking policies and terms</div>
              <div class="feature-item">• Tax configuration and rates</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">User Management:</div>
            <div class="feature-list">
              <div class="feature-item">• Role-based access control</div>
              <div class="feature-item">• User permissions and restrictions</div>
              <div class="feature-item">• User activity monitoring</div>
              <div class="feature-item">• Password policies and security</div>
              <div class="feature-item">• Multi-factor authentication</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">System Configuration:</div>
            <div class="feature-list">
              <div class="feature-item">• Notification settings and preferences</div>
              <div class="feature-item">• Integration configuration</div>
              <div class="feature-item">• Backup and recovery settings</div>
              <div class="feature-item">• Performance monitoring</div>
              <div class="feature-item">• Security and compliance settings</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Production Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Granular permission system</div>
              <div class="feature-item">• Audit logging and monitoring</div>
              <div class="feature-item">• Automated backup systems</div>
              <div class="feature-item">• Security compliance features</div>
              <div class="feature-item">• System health monitoring</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">9. TECHNICAL ARCHITECTURE</div>
          
          <div class="tech-spec">
            <div class="tech-spec-title">Frontend Architecture:</div>
            <div class="feature-list">
              <div class="feature-item">• Next.js 15 with App Router</div>
              <div class="feature-item">• TypeScript for type safety</div>
              <div class="feature-item">• React with hooks and context</div>
              <div class="feature-item">• Tailwind CSS for styling</div>
              <div class="feature-item">• Responsive design principles</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Backend Architecture:</div>
            <div class="feature-list">
              <div class="feature-item">• Node.js with Express.js</div>
              <div class="feature-item">• PostgreSQL database with Prisma ORM</div>
              <div class="feature-item">• JWT authentication system</div>
              <div class="feature-item">• RESTful API design</div>
              <div class="feature-item">• WebSocket for real-time updates</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Infrastructure Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Vercel for frontend deployment</div>
              <div class="feature-item">• Railway for backend hosting</div>
              <div class="feature-item">• PostgreSQL database hosting</div>
              <div class="feature-item">• Redis for caching and sessions</div>
              <div class="feature-item">• CDN for static assets</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">10. PRODUCTION REQUIREMENTS</div>
          
          <div class="production-goal">
            <div class="production-goal-title">Performance Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Page load times < 2 seconds</div>
              <div class="feature-item">• 99.9% uptime guarantee</div>
              <div class="feature-item">• Support for 1000+ concurrent users</div>
              <div class="feature-item">• Mobile-responsive design</div>
              <div class="feature-item">• Cross-browser compatibility</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Security Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• HTTPS encryption throughout</div>
              <div class="feature-item">• Data encryption at rest and in transit</div>
              <div class="feature-item">• Regular security audits</div>
              <div class="feature-item">• GDPR compliance features</div>
              <div class="feature-item">• Two-factor authentication</div>
            </div>
          </div>

          <div class="production-goal">
            <div class="production-goal-title">Scalability Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• Horizontal scaling capabilities</div>
              <div class="feature-item">• Database optimization</div>
              <div class="feature-item">• Caching strategies</div>
              <div class="feature-item">• Load balancing</div>
              <div class="feature-item">• Auto-scaling infrastructure</div>
            </div>
          </div>

          <div class="tech-spec">
            <div class="tech-spec-title">Development Team Requirements:</div>
            <div class="feature-list">
              <div class="feature-item">• 1 Full-Stack Developer (Next.js, Node.js)</div>
              <div class="feature-item">• 1 Backend Developer (Express, PostgreSQL)</div>
              <div class="feature-item">• 1 UI/UX Designer (React, Tailwind)</div>
              <div class="feature-item">• 1 DevOps Engineer (Deployment, Infrastructure)</div>
              <div class="feature-item">• 1 QA Tester (Testing, Quality Assurance)</div>
            </div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 40px; text-align: center;">
          <button onclick="window.print()" style="padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
            Download Visual Production Documentation PDF
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
        📸 Visual Production Documentation
      </h3>
      <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>
        Generate a visual production document with screenshots and detailed explanations of each system component for development teams.
      </p>
      <button
        onClick={generateVisualDoc}
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
        📸 Generate Visual Production Documentation PDF
      </button>
    </div>
  );
};

export default VisualProductionDoc; 