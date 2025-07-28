import jsPDF from 'jspdf';

interface PDFContent {
  title: string;
  sections: Array<{
    heading: string;
    content: string[];
    subsections?: Array<{
      subheading: string;
      content: string[];
    }>;
  }>;
}

export const generateProductDocumentationPDF = () => {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  const lineHeight = 7;
  const sectionSpacing = 15;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, y: number, fontSize: number = 12) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    return y + (lines.length * lineHeight);
  };

  // Helper function to add heading
  const addHeading = (text: string, y: number, fontSize: number = 16) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, y);
    doc.setFont('helvetica', 'normal');
    return y + lineHeight + 5;
  };

  // Helper function to add subheading
  const addSubheading = (text: string, y: number) => {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    return y + lineHeight + 3;
  };

  // Title Page
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AV+V Venue Management System', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Product Documentation', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 30;
  doc.setFontSize(12);
  doc.text('Complete Guide to Features and Usage', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });

  // Add new page for table of contents
  doc.addPage();
  yPosition = 20;

  // Table of Contents
  yPosition = addHeading('Table of Contents', yPosition);
  yPosition += 10;

  const tocItems = [
    '1. System Overview',
    '2. Dashboard Features',
    '3. Client Management',
    '4. Booking System',
    '5. Venue Management',
    '6. Operations Hub',
    '7. Financial Management',
    '8. Settings & Configuration',
    '9. User Management',
    '10. Technical Architecture',
    '11. API Documentation',
    '12. Deployment Guide'
  ];

  tocItems.forEach((item, index) => {
    doc.text(item, margin, yPosition);
    yPosition += lineHeight;
  });

  // Add new page for system overview
  doc.addPage();
  yPosition = 20;

  // System Overview
  yPosition = addHeading('1. System Overview', yPosition);
  yPosition += 5;

  const overviewText = [
    'The AV+V Venue Management System is a comprehensive platform designed to streamline all aspects of venue operations. Built with modern web technologies including Next.js, TypeScript, and React, the system provides an intuitive interface for managing clients, bookings, venues, and operations.',
    '',
    'Key Features:',
    '• Real-time dashboard with live metrics',
    '• Comprehensive client management with payment tracking',
    '• Advanced booking system with calendar integration',
    '• Multi-venue support with detailed space management',
    '• Complete operations hub for inventory and maintenance',
    '• Financial management with invoice generation',
    '• User management with role-based access control'
  ];

  overviewText.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for dashboard
  doc.addPage();
  yPosition = 20;

  // Dashboard Features
  yPosition = addHeading('2. Dashboard Features', yPosition);
  yPosition += 5;

  yPosition = addSubheading('2.1 Real-time Metrics', yPosition);
  const dashboardMetrics = [
    'The dashboard provides real-time insights into venue performance:',
    '',
    '• Today\'s Revenue: Live tracking of daily earnings',
    '• Active Bookings: Current number of confirmed events',
    '• Venue Utilization: Percentage of venue capacity in use',
    '• Pending Payments: Outstanding balances to be collected',
    '• Customer Satisfaction: Average rating from client feedback',
    '• Maintenance Alerts: Number of pending maintenance tasks'
  ];

  dashboardMetrics.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('2.2 Quick Actions', yPosition);
  const quickActions = [
    'Quick access to common tasks:',
    '',
    '• New Booking: Create a new event booking',
    '• Check Availability: View venue availability calendar',
    '• Send Invoice: Generate and send invoices to clients',
    '• Schedule Maintenance: Create maintenance work orders',
    '• Add Client: Register new clients in the system'
  ];

  quickActions.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for client management
  doc.addPage();
  yPosition = 20;

  // Client Management
  yPosition = addHeading('3. Client Management', yPosition);
  yPosition += 5;

  yPosition = addSubheading('3.1 Client Overview', yPosition);
  const clientOverview = [
    'The client management system provides comprehensive tools for managing client relationships:',
    '',
    '• Client Profiles: Complete client information and history',
    '• Payment Tracking: Monitor payment history and outstanding balances',
    '• Communication Hub: Email and message management',
    '• Invoice Management: Generate and track invoices',
    '• Booking History: View all past and upcoming events',
    '• Client Status: Track client activity and engagement'
  ];

  clientOverview.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('3.2 Payment Processing', yPosition);
  const paymentFeatures = [
    'Advanced payment management capabilities:',
    '',
    '• Multiple Payment Methods: Cash, credit card, bank transfer',
    '• Payment Tracking: Real-time payment status updates',
    '• Invoice Generation: Automated invoice creation',
    '• Outstanding Balance Tracking: Monitor unpaid amounts',
    '• Payment History: Complete transaction records',
    '• Refund Management: Process refunds and adjustments'
  ];

  paymentFeatures.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for booking system
  doc.addPage();
  yPosition = 20;

  // Booking System
  yPosition = addHeading('4. Booking System', yPosition);
  yPosition += 5;

  yPosition = addSubheading('4.1 Calendar View', yPosition);
  const calendarFeatures = [
    'Interactive calendar interface for booking management:',
    '',
    '• Monthly/Weekly/Daily Views: Flexible calendar display options',
    '• Event Visualization: Color-coded events by status',
    '• Drag & Drop: Easy event rescheduling',
    '• Quick Booking: One-click booking creation',
    '• Conflict Detection: Automatic availability checking',
    '• Calendar Blocks: Reserve dates for maintenance or private events'
  ];

  calendarFeatures.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('4.2 Booking Details', yPosition);
  const bookingDetails = [
    'Comprehensive booking information management:',
    '',
    '• Event Information: Date, time, space, attendees',
    '• Client Details: Contact information and requirements',
    '• Service Add-ons: Catering, AV, decorations, security',
    '• Financial Information: Pricing, deposits, payments',
    '• Special Requirements: Custom needs and accommodations',
    '• Status Tracking: Confirmed, pending, completed, cancelled'
  ];

  bookingDetails.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for venue management
  doc.addPage();
  yPosition = 20;

  // Venue Management
  yPosition = addHeading('5. Venue Management', yPosition);
  yPosition += 5;

  yPosition = addSubheading('5.1 Venue Information', yPosition);
  const venueInfo = [
    'Complete venue profile management:',
    '',
    '• Basic Information: Name, type, address, contact details',
    '• Capacity Management: Seated, standing, and banquet capacities',
    '• Technical Specifications: Power, internet, AV equipment',
    '• Amenities: Available services and facilities',
    '• Operating Hours: Business hours and availability',
    '• Policies: Booking policies, house rules, insurance requirements'
  ];

  venueInfo.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('5.2 Space Management', yPosition);
  const spaceManagement = [
    'Individual space management within venues:',
    '',
    '• Space Profiles: Detailed information for each area',
    '• Capacity Tracking: Real-time availability monitoring',
    '• Amenity Management: Services available in each space',
    '• Status Updates: Available, booked, maintenance',
    '• Floor Plans: Visual representation of venue layout',
    '• Equipment Assignment: AV and technical equipment allocation'
  ];

  spaceManagement.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for operations
  doc.addPage();
  yPosition = 20;

  // Operations Hub
  yPosition = addHeading('6. Operations Hub', yPosition);
  yPosition += 5;

  yPosition = addSubheading('6.1 Inventory Management', yPosition);
  const inventoryFeatures = [
    'Comprehensive inventory tracking system:',
    '',
    '• Item Categories: Organized inventory by type and function',
    '• Stock Levels: Real-time quantity tracking',
    '• Low Stock Alerts: Automatic notifications for reordering',
    '• Transaction History: Complete audit trail of movements',
    '• Supplier Management: Vendor information and contact details',
    '• Cost Tracking: Purchase costs and rental pricing'
  ];

  inventoryFeatures.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('6.2 Maintenance Management', yPosition);
  const maintenanceFeatures = [
    'Preventive and reactive maintenance tracking:',
    '',
    '• Work Orders: Create and track maintenance tasks',
    '• Preventive Maintenance: Scheduled maintenance routines',
    '• Equipment Tracking: Monitor equipment condition and history',
    '• Vendor Coordination: Manage external service providers',
    '• Cost Tracking: Monitor maintenance expenses',
    '• Safety Compliance: Ensure regulatory requirements are met'
  ];

  maintenanceFeatures.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for financial management
  doc.addPage();
  yPosition = 20;

  // Financial Management
  yPosition = addHeading('7. Financial Management', yPosition);
  yPosition += 5;

  yPosition = addSubheading('7.1 Revenue Tracking', yPosition);
  const revenueFeatures = [
    'Comprehensive financial management tools:',
    '',
    '• Revenue Analytics: Track income by period and source',
    '• Payment Processing: Multiple payment method support',
    '• Invoice Generation: Professional invoice creation',
    '• Outstanding Balances: Monitor unpaid amounts',
    '• Financial Reports: P&L, cash flow, and revenue reports',
    '• Tax Management: Automated tax calculations and reporting'
  ];

  revenueFeatures.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('7.2 Cost Management', yPosition);
  const costFeatures = [
    'Expense tracking and cost control:',
    '',
    '• Operating Costs: Track venue operating expenses',
    '• Maintenance Costs: Monitor equipment and facility maintenance',
    '• Inventory Costs: Track inventory purchases and depreciation',
    '• Labor Costs: Monitor staff and contractor expenses',
    '• Cost Analytics: Analyze cost trends and optimization opportunities',
    '• Budget Management: Set and track budget targets'
  ];

  costFeatures.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for settings
  doc.addPage();
  yPosition = 20;

  // Settings & Configuration
  yPosition = addHeading('8. Settings & Configuration', yPosition);
  yPosition += 5;

  yPosition = addSubheading('8.1 Business Settings', yPosition);
  const businessSettings = [
    'Customizable business configuration:',
    '',
    '• Company Information: Name, contact details, branding',
    '• Operating Hours: Business hours and availability settings',
    '• Pricing Policies: Rate structures and payment terms',
    '• Booking Policies: Cancellation and deposit requirements',
    '• Tax Configuration: Tax rates and reporting settings',
    '• Currency Settings: Multi-currency support'
  ];

  businessSettings.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('8.2 System Configuration', yPosition);
  const systemConfig = [
    'System-wide configuration options:',
    '',
    '• User Management: Role-based access control',
    '• Notification Settings: Email and SMS configuration',
    '• Integration Settings: Third-party service connections',
    '• Backup Configuration: Data backup and recovery settings',
    '• Security Settings: Authentication and authorization',
    '• API Configuration: External system integrations'
  ];

  systemConfig.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for technical architecture
  doc.addPage();
  yPosition = 20;

  // Technical Architecture
  yPosition = addHeading('9. Technical Architecture', yPosition);
  yPosition += 5;

  yPosition = addSubheading('9.1 Technology Stack', yPosition);
  const techStack = [
    'Modern, scalable technology architecture:',
    '',
    '• Frontend: Next.js 15 with TypeScript and React',
    '• Styling: Tailwind CSS with custom design system',
    '• State Management: React hooks and context API',
    '• Backend: Node.js with Express.js framework',
    '• Database: PostgreSQL with Prisma ORM',
    '• Authentication: JWT-based authentication system',
    '• Deployment: Vercel for frontend, Railway for backend',
    '• Monitoring: Real-time performance monitoring'
  ];

  techStack.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('9.2 System Architecture', yPosition);
  const systemArchitecture = [
    'Scalable and maintainable system design:',
    '',
    '• Microservices Architecture: Modular service design',
    '• RESTful API: Standardized API endpoints',
    '• Real-time Updates: WebSocket connections for live data',
    '• Caching Strategy: Redis for performance optimization',
    '• Security: HTTPS, CORS, and input validation',
    '• Error Handling: Comprehensive error management',
    '• Logging: Structured logging for debugging',
    '• Testing: Unit and integration test coverage'
  ];

  systemArchitecture.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for API documentation
  doc.addPage();
  yPosition = 20;

  // API Documentation
  yPosition = addHeading('10. API Documentation', yPosition);
  yPosition += 5;

  yPosition = addSubheading('10.1 Core Endpoints', yPosition);
  const apiEndpoints = [
    'RESTful API endpoints for system integration:',
    '',
    '• /api/clients - Client management operations',
    '• /api/bookings - Booking system operations',
    '• /api/venues - Venue management operations',
    '• /api/inventory - Inventory management operations',
    '• /api/payments - Payment processing operations',
    '• /api/reports - Analytics and reporting data',
    '• /api/users - User management operations',
    '• /api/settings - System configuration operations'
  ];

  apiEndpoints.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('10.2 Authentication', yPosition);
  const authInfo = [
    'Secure API authentication system:',
    '',
    '• JWT Tokens: Stateless authentication',
    '• Role-based Access: Granular permission control',
    '• API Keys: Secure external integrations',
    '• Rate Limiting: Protection against abuse',
    '• CORS Configuration: Cross-origin resource sharing',
    '• Input Validation: Comprehensive data validation'
  ];

  authInfo.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add new page for deployment
  doc.addPage();
  yPosition = 20;

  // Deployment Guide
  yPosition = addHeading('11. Deployment Guide', yPosition);
  yPosition += 5;

  yPosition = addSubheading('11.1 Environment Setup', yPosition);
  const envSetup = [
    'Production deployment configuration:',
    '',
    '• Environment Variables: Secure configuration management',
    '• Database Setup: PostgreSQL installation and configuration',
    '• SSL Certificates: HTTPS security implementation',
    '• Domain Configuration: Custom domain setup',
    '• CDN Setup: Content delivery network configuration',
    '• Monitoring: Application performance monitoring'
  ];

  envSetup.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  yPosition += 10;
  yPosition = addSubheading('11.2 Deployment Process', yPosition);
  const deploymentProcess = [
    'Automated deployment workflow:',
    '',
    '• CI/CD Pipeline: Automated build and deployment',
    '• Database Migrations: Schema updates and data migration',
    '• Backup Strategy: Automated data backup procedures',
    '• Rollback Procedures: Emergency rollback capabilities',
    '• Health Checks: System health monitoring',
    '• Performance Optimization: Load balancing and caching'
  ];

  deploymentProcess.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Add final page with contact information
  doc.addPage();
  yPosition = 20;

  yPosition = addHeading('12. Support & Contact', yPosition);
  yPosition += 10;

  const supportInfo = [
    'For technical support and questions:',
    '',
    '• Email: support@avvvenues.com',
    '• Phone: +1 (555) 123-4567',
    '• Documentation: https://docs.avvvenues.com',
    '• API Reference: https://api.avvvenues.com',
    '• Community: https://community.avvvenues.com',
    '',
    'System Requirements:',
    '• Modern web browser (Chrome, Firefox, Safari, Edge)',
    '• Internet connection for real-time features',
    '• Minimum screen resolution: 1024x768',
    '• Recommended: 4GB RAM, 2GHz processor'
  ];

  supportInfo.forEach(text => {
    yPosition = addWrappedText(text, yPosition);
    yPosition += 2;
  });

  // Save the PDF
  doc.save('AVV-Venue-Management-System-Documentation.pdf');
};

export default generateProductDocumentationPDF; 