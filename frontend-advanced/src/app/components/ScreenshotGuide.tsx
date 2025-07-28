'use client';

import React from 'react';

interface ScreenshotGuideProps {
  onGenerate?: () => void;
}

const ScreenshotGuide: React.FC<ScreenshotGuideProps> = ({ onGenerate }) => {
  const generateScreenshotGuide = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AV+V Venue Management System - Screenshot Guide</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #1e293b; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
          h2 { color: #374151; margin-top: 30px; }
          h3 { color: #4b5563; margin-top: 20px; }
          .section { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1; }
          .section-title { color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
          .screenshot-guide { background: #e0f2fe; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .screenshot-guide-title { color: #0369a1; font-weight: bold; }
          .instructions { background: #f0fdf4; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #22c55e; }
          .instructions-title { color: #166534; font-weight: bold; }
          .highlight { background: #fef3c7; padding: 10px; border-radius: 4px; margin: 5px 0; border-left: 3px solid #f59e0b; }
          .highlight-title { color: #d97706; font-weight: bold; }
          .feature-list { margin-left: 20px; }
          .feature-item { margin: 5px 0; }
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
        <h2>Comprehensive Screenshot Guide</h2>
        <p><strong>Step-by-Step Instructions for Capturing System Screenshots</strong></p>
        <p><em>Generated: ${new Date().toLocaleDateString()}</em></p>

        <div class="toc">
          <h3>Table of Contents</h3>
          <div class="toc-item">1. Screenshot Preparation</div>
          <div class="toc-item">2. Dashboard Screenshots</div>
          <div class="toc-item">3. Client Management Screenshots</div>
          <div class="toc-item">4. Booking System Screenshots</div>
          <div class="toc-item">5. Venue Management Screenshots</div>
          <div class="toc-item">6. Operations Hub Screenshots</div>
          <div class="toc-item">7. Financial Management Screenshots</div>
          <div class="toc-item">8. Settings & Configuration Screenshots</div>
          <div class="toc-item">9. Mobile Responsiveness Screenshots</div>
          <div class="toc-item">10. Screenshot Organization</div>
        </div>

        <div class="section">
          <div class="section-title">1. SCREENSHOT PREPARATION</div>
          
          <div class="instructions">
            <div class="instructions-title">Before Taking Screenshots:</div>
            <div class="feature-list">
              <div class="feature-item">• Ensure your browser window is maximized (1920x1080 or higher)</div>
              <div class="feature-item">• Clear browser cache and refresh the page</div>
              <div class="feature-item">• Use Chrome DevTools to simulate different screen sizes</div>
              <div class="feature-item">• Take screenshots in PNG format for best quality</div>
              <div class="feature-item">• Use descriptive filenames (e.g., "dashboard-main-view.png")</div>
            </div>
          </div>

          <div class="highlight">
            <div class="highlight-title">Recommended Tools:</div>
            <div class="feature-list">
              <div class="feature-item">• Chrome DevTools (F12) for responsive testing</div>
              <div class="feature-item">• Built-in screenshot tools (Cmd+Shift+4 on Mac, Snipping Tool on Windows)</div>
              <div class="feature-item">• Browser extensions like "Full Page Screen Capture"</div>
              <div class="feature-item">• Screen recording software for interactive demos</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">2. DASHBOARD SCREENSHOTS</div>
          
          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Dashboard - Main View</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Complete dashboard with all metrics visible</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Revenue metrics, active bookings, venue utilization, quick actions</div>
              <div class="feature-item">📱 <strong>Responsive:</strong> Take screenshots at 1920px, 1366px, 768px, and 375px widths</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Ensure all metrics show realistic data, not placeholder values</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Dashboard - Quick Actions</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Quick actions panel with all buttons visible</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> New Booking, Check Availability, Send Invoice, Schedule Maintenance</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show hover states and active states if possible</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Dashboard - Recent Activities</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Recent activities feed with multiple entries</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Activity types, timestamps, user actions</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Include different types of activities (bookings, payments, maintenance)</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Dashboard - Weather Widget</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Weather widget with current conditions</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Temperature, weather icon, location, forecast</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show different weather conditions if possible</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">3. CLIENT MANAGEMENT SCREENSHOTS</div>
          
          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Client List - Main View</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Complete client table with search and filters</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Client names, emails, status, outstanding balances, action buttons</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show multiple clients with different statuses (active, archived)</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Client Details - Sidebar</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Right-side client details panel</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Client profile, payment history, booking history, communication logs</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show client with multiple bookings and payment history</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Payment Modal</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Payment processing modal with all payment options</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Cash, credit card, bank transfer options, amount fields</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show form validation and error states</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Communication Forms</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Email and message composition forms</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Subject, message body, recipient selection, send buttons</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show template selection and attachment options</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">4. BOOKING SYSTEM SCREENSHOTS</div>
          
          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Calendar - Monthly View</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Full calendar with multiple bookings visible</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Booked dates, available slots, color-coded events</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show different booking statuses (confirmed, pending, cancelled)</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Calendar - Weekly View</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Weekly calendar view with detailed time slots</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Time slots, event details, duration indicators</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show overlapping bookings and conflict detection</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Booking Details Modal</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Complete booking details form</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Event information, client details, service add-ons, pricing</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show form with all fields filled and validation</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Service Add-ons</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Service selection interface</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Catering, AV equipment, decorations, security options</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show pricing for each service and total calculation</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">5. VENUE MANAGEMENT SCREENSHOTS</div>
          
          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Venue Overview</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Venue cards showing all venues</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Venue names, types, capacities, current status</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show venues with different statuses (available, occupied, maintenance)</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Venue Details Page</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Complete venue information page</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Photos, specifications, amenities, operating hours</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show venue with multiple photos and detailed specifications</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Space Management</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Individual space breakdown within venues</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Space names, capacities, amenities, availability</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show floor plan or space layout if available</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">6. OPERATIONS HUB SCREENSHOTS</div>
          
          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Operations Dashboard</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Operations overview with all metrics</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Inventory status, maintenance alerts, supplier information</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show operational metrics and alerts</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Inventory Management</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Inventory table with all items</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Item names, categories, stock levels, suppliers</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show items with low stock alerts and different categories</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Maintenance Tracking</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Maintenance work orders and schedules</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Work order details, status, assigned staff, costs</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show different maintenance statuses (pending, in progress, completed)</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Supplier Management</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Supplier database and contact information</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Supplier names, contact details, services, ratings</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show supplier performance ratings and contract information</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">7. FINANCIAL MANAGEMENT SCREENSHOTS</div>
          
          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Financial Dashboard</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Financial overview with all metrics</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Revenue, expenses, profit margins, outstanding balances</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show financial trends and charts</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Invoice Generation</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Invoice creation interface</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Line items, tax calculations, payment terms</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show professional invoice formatting</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Payment Processing</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Payment gateway integration</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Payment methods, transaction status, receipts</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show successful payment confirmation</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">8. SETTINGS & CONFIGURATION SCREENSHOTS</div>
          
          <div class="screenshot-guide">
            <div class="screenshot-guide-title">System Settings</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Settings dashboard with all tabs</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Business settings, user management, notifications</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show different setting categories</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">User Management</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> User roles and permissions interface</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> User list, role assignments, permissions</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show different user roles and access levels</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Integration Settings</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Third-party integration configuration</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> API keys, connection status, settings</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show connected and disconnected integrations</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">9. MOBILE RESPONSIVENESS SCREENSHOTS</div>
          
          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Mobile Dashboard</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Dashboard on mobile devices (375px width)</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Responsive layout, mobile navigation, touch-friendly buttons</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Use Chrome DevTools device simulation</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Mobile Booking</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Booking interface on mobile</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Touch-friendly calendar, form inputs, mobile navigation</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show mobile-specific features like swipe gestures</div>
            </div>
          </div>

          <div class="screenshot-guide">
            <div class="screenshot-guide-title">Tablet View</div>
            <div class="feature-list">
              <div class="feature-item">📸 <strong>What to capture:</strong> Interface on tablet devices (768px width)</div>
              <div class="feature-item">🎯 <strong>Key elements:</strong> Optimized layout for medium screens</div>
              <div class="feature-item">💡 <strong>Tips:</strong> Show how the interface adapts to tablet screens</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">10. SCREENSHOT ORGANIZATION</div>
          
          <div class="instructions">
            <div class="instructions-title">File Naming Convention:</div>
            <div class="feature-list">
              <div class="feature-item">• dashboard-main-view-1920px.png</div>
              <div class="feature-item">• client-list-with-search.png</div>
              <div class="feature-item">• booking-calendar-monthly-view.png</div>
              <div class="feature-item">• venue-details-page.png</div>
              <div class="feature-item">• operations-inventory-management.png</div>
              <div class="feature-item">• financial-dashboard.png</div>
              <div class="feature-item">• settings-user-management.png</div>
              <div class="feature-item">• mobile-dashboard-375px.png</div>
            </div>
          </div>

          <div class="highlight">
            <div class="highlight-title">Folder Structure:</div>
            <div class="feature-list">
              <div class="feature-item">📁 screenshots/</div>
              <div class="feature-item">  📁 dashboard/</div>
              <div class="feature-item">  📁 clients/</div>
              <div class="feature-item">  📁 bookings/</div>
              <div class="feature-item">  📁 venues/</div>
              <div class="feature-item">  📁 operations/</div>
              <div class="feature-item">  📁 financial/</div>
              <div class="feature-item">  📁 settings/</div>
              <div class="feature-item">  📁 mobile/</div>
            </div>
          </div>

          <div class="instructions">
            <div class="instructions-title">Quality Checklist:</div>
            <div class="feature-list">
              <div class="feature-item">✅ Screenshots are clear and high resolution</div>
              <div class="feature-item">✅ All important UI elements are visible</div>
              <div class="feature-item">✅ Realistic data is displayed (not placeholder text)</div>
              <div class="feature-item">✅ Multiple screen sizes are captured</div>
              <div class="feature-item">✅ File names are descriptive and organized</div>
              <div class="feature-item">✅ Screenshots show different states (empty, filled, error)</div>
            </div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 40px; text-align: center;">
          <button onclick="window.print()" style="padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
            Download Screenshot Guide PDF
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
        📸 Screenshot Guide
      </h3>
      <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>
        Generate a comprehensive screenshot guide with detailed instructions for capturing each system component.
      </p>
      <button
        onClick={generateScreenshotGuide}
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
        📸 Generate Screenshot Guide PDF
      </button>
    </div>
  );
};

export default ScreenshotGuide; 