'use client';

import React from 'react';

interface AcquisitionPitchDeckProps {
  onGenerate?: () => void;
}

const AcquisitionPitchDeck: React.FC<AcquisitionPitchDeckProps> = ({ onGenerate }) => {
  const generatePitchDeck = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AV+V Venue Management System - Acquisition Pitch Deck</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #1e293b; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
          h2 { color: #374151; margin-top: 30px; }
          h3 { color: #4b5563; margin-top: 20px; }
          .section { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1; }
          .section-title { color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
          .pitch-point { background: #e0f2fe; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .pitch-point-title { color: #0369a1; font-weight: bold; }
          .case-study { background: #f0fdf4; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #22c55e; }
          .case-study-title { color: #166534; font-weight: bold; }
          .acquisition-example { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #f59e0b; }
          .acquisition-example-title { color: #d97706; font-weight: bold; }
          .strategy { background: #fef2f2; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #ef4444; }
          .strategy-title { color: #dc2626; font-weight: bold; }
          .feature-list { margin-left: 20px; }
          .feature-item { margin: 5px 0; }
          .toc { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .toc-item { margin: 5px 0; }
          .highlight { background: #fef3c7; padding: 10px; border-radius: 4px; margin: 5px 0; border-left: 3px solid #f59e0b; }
          .highlight-title { color: #d97706; font-weight: bold; }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>AV+V Venue Management System</h1>
        <h2>Acquisition Pitch Deck & Strategic Partnership Guide</h2>
        <p><strong>Complete Guide to Selling Your Venue Management Solution</strong></p>
        <p><em>Generated: ${new Date().toLocaleDateString()}</em></p>

        <div class="toc">
          <h3>Table of Contents</h3>
          <div class="toc-item">1. Executive Summary</div>
          <div class="toc-item">2. Market Opportunity</div>
          <div class="toc-item">3. Solution Overview</div>
          <div class="toc-item">4. Competitive Advantage</div>
          <div class="toc-item">5. Target Companies</div>
          <div class="toc-item">6. Real Acquisition Examples</div>
          <div class="toc-item">7. Revenue Models</div>
          <div class="toc-item">8. Approach Strategies</div>
          <div class="toc-item">9. Due Diligence Preparation</div>
          <div class="toc-item">10. Action Plan</div>
        </div>

        <div class="section">
          <div class="section-title">1. EXECUTIVE SUMMARY</div>
          
          <div class="pitch-point">
            <div class="pitch-point-title">The Opportunity:</div>
            <div class="feature-list">
              <div class="feature-item">• Modern venue management system built in 6 days</div>
              <div class="feature-item">• Next.js, TypeScript, real-time features</div>
              <div class="feature-item">• Comprehensive venue operations platform</div>
              <div class="feature-item">• Ready for immediate deployment and scaling</div>
              <div class="feature-item">• Proven concept with working prototype</div>
            </div>
          </div>

          <div class="highlight">
            <div class="highlight-title">Why Companies Should Acquire:</div>
            <div class="feature-list">
              <div class="feature-item">🚀 <strong>Faster Time to Market:</strong> 6 months vs 2 years development</div>
              <div class="feature-item">💰 <strong>Cost Savings:</strong> $500K-2M in development costs</div>
              <div class="feature-item">🎯 <strong>Proven Concept:</strong> Working prototype with real features</div>
              <div class="feature-item">📈 <strong>Market Ready:</strong> Immediate deployment capability</div>
              <div class="feature-item">🏆 <strong>Competitive Edge:</strong> Modern tech stack and features</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">2. MARKET OPPORTUNITY</div>
          
          <div class="pitch-point">
            <div class="pitch-point-title">Venue Management Market Size:</div>
            <div class="feature-list">
              <div class="feature-item">• Global venue management market: $15.2 billion (2023)</div>
              <div class="feature-item">• Expected CAGR: 12.3% (2024-2030)</div>
              <div class="feature-item">• Event management software: $8.9 billion market</div>
              <div class="feature-item">• Hospitality management: $6.3 billion market</div>
              <div class="feature-item">• Growing demand for integrated solutions</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">Market Drivers:</div>
            <div class="feature-list">
              <div class="feature-item">• Post-pandemic event industry recovery</div>
              <div class="feature-item">• Digital transformation in hospitality</div>
              <div class="feature-item">• Demand for real-time operations management</div>
              <div class="feature-item">• Multi-venue chain expansion</div>
              <div class="feature-item">• AI and automation adoption</div>
            </div>
          </div>

          <div class="highlight">
            <div class="highlight-title">Competitive Landscape:</div>
            <div class="feature-list">
              <div class="feature-item">• Eventbrite: $2.5B market cap, expanding venue services</div>
              <div class="feature-item">• Cvent: $4.4B acquisition by Blackstone</div>
              <div class="feature-item">• Legacy systems: Outdated, difficult to integrate</div>
              <div class="feature-item">• Market gap: Modern, integrated venue management</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">3. SOLUTION OVERVIEW</div>
          
          <div class="pitch-point">
            <div class="pitch-point-title">Core Features:</div>
            <div class="feature-list">
              <div class="feature-item">✅ Real-time dashboard with live metrics</div>
              <div class="feature-item">✅ Comprehensive client management with payment tracking</div>
              <div class="feature-item">✅ Advanced booking system with calendar integration</div>
              <div class="feature-item">✅ Multi-venue support with detailed space management</div>
              <div class="feature-item">✅ Complete operations hub for inventory and maintenance</div>
              <div class="feature-item">✅ Financial management with invoice generation</div>
              <div class="feature-item">✅ User management with role-based access control</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">Technology Stack:</div>
            <div class="feature-list">
              <div class="feature-item">• Frontend: Next.js 15, TypeScript, React</div>
              <div class="feature-item">• Backend: Node.js, Express.js, PostgreSQL</div>
              <div class="feature-item">• Authentication: JWT-based system</div>
              <div class="feature-item">• Real-time: WebSocket connections</div>
              <div class="feature-item">• Deployment: Vercel, Railway</div>
            </div>
          </div>

          <div class="highlight">
            <div class="highlight-title">Scalability & Integration:</div>
            <div class="feature-list">
              <div class="feature-item">• API-first design for easy integration</div>
              <div class="feature-item">• Microservices architecture</div>
              <div class="feature-item">• Cloud-native deployment</div>
              <div class="feature-item">• Third-party integration ready</div>
              <div class="feature-item">• Multi-tenant capability</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">4. COMPETITIVE ADVANTAGE</div>
          
          <div class="pitch-point">
            <div class="pitch-point-title">vs Eventbrite:</div>
            <div class="feature-list">
              <div class="feature-item">✅ Modern tech stack vs legacy systems</div>
              <div class="feature-item">✅ Real-time operations vs batch processing</div>
              <div class="feature-item">✅ Multi-venue management vs single venue focus</div>
              <div class="feature-item">✅ Integrated operations vs separate modules</div>
              <div class="feature-item">✅ AI-ready architecture vs basic automation</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">vs Cvent:</div>
            <div class="feature-list">
              <div class="feature-item">✅ Faster implementation (6 days vs 6 months)</div>
              <div class="feature-item">✅ Lower cost of ownership</div>
              <div class="feature-item">✅ Modern user experience</div>
              <div class="feature-item">✅ Mobile-first design</div>
              <div class="feature-item">✅ Cloud-native architecture</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">vs Legacy Systems:</div>
            <div class="feature-list">
              <div class="feature-item">✅ Web-based vs on-premise</div>
              <div class="feature-item">✅ Real-time updates vs manual sync</div>
              <div class="feature-item">✅ API integration vs closed systems</div>
              <div class="feature-item">✅ Modern UI/UX vs outdated interfaces</div>
              <div class="feature-item">✅ Scalable architecture vs limited growth</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">5. TARGET COMPANIES</div>
          
          <div class="pitch-point">
            <div class="pitch-point-title">Event Management Platforms:</div>
            <div class="feature-list">
              <div class="feature-item">• Eventbrite (NYSE: EB) - $2.5B market cap</div>
              <div class="feature-item">• Cvent (acquired by Blackstone for $4.4B)</div>
              <div class="feature-item">• Bizzabo - Growing event tech platform</div>
              <div class="feature-item">• Hopin - Virtual/hybrid event platform</div>
              <div class="feature-item">• Whova - Event management software</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">CRM & Business Software:</div>
            <div class="feature-list">
              <div class="feature-item">• Salesforce (NYSE: CRM) - $200B+ market cap</div>
              <div class="feature-item">• HubSpot (NYSE: HUBS) - $25B market cap</div>
              <div class="feature-item">• Zoho - Business software suite</div>
              <div class="feature-item">• Monday.com (NASDAQ: MNDY) - $8B market cap</div>
              <div class="feature-item">• Asana (NYSE: ASAN) - $4B market cap</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">Multi-Venue Holdings:</div>
            <div class="feature-list">
              <div class="feature-item">• Live Nation Entertainment (NYSE: LYV) - $20B market cap</div>
              <div class="feature-item">• AEG Presents - 100+ venues globally</div>
              <div class="feature-item">• MSG Entertainment (NYSE: MSGE) - $4B market cap</div>
              <div class="feature-item">• Oak View Group - Arena and stadium management</div>
              <div class="feature-item">• Marriott International (NASDAQ: MAR) - $60B market cap</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">6. REAL ACQUISITION EXAMPLES</div>
          
          <div class="acquisition-example">
            <div class="acquisition-example-title">Cvent Acquisition by Blackstone (2023)</div>
            <div class="feature-list">
              <div class="feature-item">💰 <strong>Deal Value:</strong> $4.4 billion</div>
              <div class="feature-item">🎯 <strong>Business:</strong> Event management software</div>
              <div class="feature-item">📈 <strong>Revenue:</strong> $900M+ annual revenue</div>
              <div class="feature-item">🏢 <strong>Buyer:</strong> Blackstone private equity</div>
              <div class="feature-item">💡 <strong>Strategy:</strong> Expand event tech portfolio</div>
            </div>
          </div>

          <div class="acquisition-example">
            <div class="acquisition-example-title">Eventbrite Acquires Ticketscript (2017)</div>
            <div class="feature-list">
              <div class="feature-item">💰 <strong>Deal Value:</strong> $200 million</div>
              <div class="feature-item">🎯 <strong>Business:</strong> Event ticketing platform</div>
              <div class="feature-item">📈 <strong>Revenue:</strong> $50M+ annual revenue</div>
              <div class="feature-item">🏢 <strong>Buyer:</strong> Eventbrite</div>
              <div class="feature-item">💡 <strong>Strategy:</strong> Expand European market presence</div>
            </div>
          </div>

          <div class="acquisition-example">
            <div class="acquisition-example-title">Salesforce Acquires Slack (2021)</div>
            <div class="feature-list">
              <div class="feature-item">💰 <strong>Deal Value:</strong> $27.7 billion</div>
              <div class="feature-item">🎯 <strong>Business:</strong> Team collaboration platform</div>
              <div class="feature-item">📈 <strong>Revenue:</strong> $900M+ annual revenue</div>
              <div class="feature-item">🏢 <strong>Buyer:</strong> Salesforce</div>
              <div class="feature-item">💡 <strong>Strategy:</strong> Expand collaboration capabilities</div>
            </div>
          </div>

          <div class="acquisition-example">
            <div class="acquisition-example-title">HubSpot Acquires The Hustle (2021)</div>
            <div class="feature-list">
              <div class="feature-item">💰 <strong>Deal Value:</strong> $27 million</div>
              <div class="feature-item">🎯 <strong>Business:</strong> Newsletter and media company</div>
              <div class="feature-item">📈 <strong>Revenue:</strong> $20M+ annual revenue</div>
              <div class="feature-item">🏢 <strong>Buyer:</strong> HubSpot</div>
              <div class="feature-item">💡 <strong>Strategy:</strong> Expand content marketing capabilities</div>
            </div>
          </div>

          <div class="acquisition-example">
            <div class="acquisition-example-title">Monday.com Acquires Wrike (2021)</div>
            <div class="feature-list">
              <div class="feature-item">💰 <strong>Deal Value:</strong> $400 million</div>
              <div class="feature-item">🎯 <strong>Business:</strong> Project management software</div>
              <div class="feature-item">📈 <strong>Revenue:</strong> $140M+ annual revenue</div>
              <div class="feature-item">🏢 <strong>Buyer:</strong> Monday.com</div>
              <div class="feature-item">💡 <strong>Strategy:</strong> Expand enterprise capabilities</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">7. REVENUE MODELS</div>
          
          <div class="strategy">
            <div class="strategy-title">Option 1: Licensing Model</div>
            <div class="feature-list">
              <div class="feature-item">💰 <strong>Single License:</strong> $50,000-100,000</div>
              <div class="feature-item">💰 <strong>Multi-site License:</strong> $200,000-500,000</div>
              <div class="feature-item">💰 <strong>Enterprise License:</strong> $1,000,000+</div>
              <div class="feature-item">💰 <strong>Annual Maintenance:</strong> 15-20% of license fee</div>
              <div class="feature-item">🎯 <strong>Best For:</strong> Large enterprises, multi-venue chains</div>
            </div>
          </div>

          <div class="strategy">
            <div class="strategy-title">Option 2: SaaS Partnership</div>
            <div class="feature-list">
              <div class="feature-item">💰 <strong>Revenue Share:</strong> 30-50% of subscription revenue</div>
              <div class="feature-item">💰 <strong>White-label Fee:</strong> $25,000-50,000 setup</div>
              <div class="feature-item">💰 <strong>Monthly Platform Fee:</strong> $5,000-15,000</div>
              <div class="feature-item">💰 <strong>Custom Development:</strong> $150-300/hour</div>
              <div class="feature-item">🎯 <strong>Best For:</strong> Tech companies, SaaS platforms</div>
            </div>
          </div>

          <div class="strategy">
            <div class="strategy-title">Option 3: Acquisition</div>
            <div class="feature-list">
              <div class="feature-item">💰 <strong>Early Stage:</strong> $2-5 million</div>
              <div class="feature-item">💰 <strong>Growth Stage:</strong> $10-25 million</div>
              <div class="feature-item">💰 <strong>Mature Stage:</strong> $50-100 million+</div>
              <div class="feature-item">💰 <strong>Revenue Multiple:</strong> 5-15x annual revenue</div>
              <div class="feature-item">🎯 <strong>Best For:</strong> Strategic buyers, private equity</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">8. APPROACH STRATEGIES</div>
          
          <div class="pitch-point">
            <div class="pitch-point-title">Direct Outreach Methods:</div>
            <div class="feature-list">
              <div class="feature-item">📧 <strong>LinkedIn:</strong> Connect with CTOs, Product Managers, VPs</div>
              <div class="feature-item">📧 <strong>Cold Emails:</strong> Personalized pitches to decision makers</div>
              <div class="feature-item">📧 <strong>Industry Events:</strong> Event tech conferences, trade shows</div>
              <div class="feature-item">📧 <strong>Warm Introductions:</strong> Network through industry contacts</div>
              <div class="feature-item">📧 <strong>Investor Connections:</strong> Through VCs and angel investors</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">Partnership Approaches:</div>
            <div class="feature-list">
              <div class="feature-item">🤝 <strong>Integration Partners:</strong> Offer to integrate with their platforms</div>
              <div class="feature-item">🤝 <strong>Channel Partners:</strong> Let them resell your solution</div>
              <div class="feature-item">🤝 <strong>Technology Partners:</strong> Joint development opportunities</div>
              <div class="feature-item">🤝 <strong>Strategic Alliances:</strong> Co-marketing and co-selling</div>
              <div class="feature-item">🤝 <strong>White-label Solutions:</strong> Custom branding for their clients</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">Pitch Deck Elements:</div>
            <div class="feature-list">
              <div class="feature-item">📊 <strong>Problem Statement:</strong> Current venue management challenges</div>
              <div class="feature-item">💡 <strong>Solution Overview:</strong> Your platform capabilities</div>
              <div class="feature-item">📈 <strong>Market Opportunity:</strong> Size and growth potential</div>
              <div class="feature-item">🏆 <strong>Competitive Advantage:</strong> Why your solution is better</div>
              <div class="feature-item">💰 <strong>Revenue Potential:</strong> Financial projections and models</div>
              <div class="feature-item">🚀 <strong>Implementation Plan:</strong> Timeline and integration strategy</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">9. DUE DILIGENCE PREPARATION</div>
          
          <div class="case-study">
            <div class="case-study-title">Technical Due Diligence:</div>
            <div class="feature-list">
              <div class="feature-item">✅ <strong>Code Quality:</strong> Clean, documented, maintainable code</div>
              <div class="feature-item">✅ <strong>Architecture:</strong> Scalable, modern tech stack</div>
              <div class="feature-item">✅ <strong>Security:</strong> Authentication, encryption, compliance</div>
              <div class="feature-item">✅ <strong>Performance:</strong> Load testing, optimization</div>
              <div class="feature-item">✅ <strong>API Documentation:</strong> Complete API specs</div>
            </div>
          </div>

          <div class="case-study">
            <div class="case-study-title">Business Due Diligence:</div>
            <div class="feature-list">
              <div class="feature-item">✅ <strong>Market Validation:</strong> Customer interviews, surveys</div>
              <div class="feature-item">✅ <strong>Financial Model:</strong> Revenue projections, unit economics</div>
              <div class="feature-item">✅ <strong>Competitive Analysis:</strong> Detailed competitor research</div>
              <div class="feature-item">✅ <strong>Intellectual Property:</strong> Patents, trademarks, trade secrets</div>
              <div class="feature-item">✅ <strong>Team Background:</strong> Founder experience, technical expertise</div>
            </div>
          </div>

          <div class="case-study">
            <div class="case-study-title">Legal Due Diligence:</div>
            <div class="feature-list">
              <div class="feature-item">✅ <strong>Corporate Structure:</strong> Proper legal entity setup</div>
              <div class="feature-item">✅ <strong>Contracts:</strong> Customer agreements, vendor contracts</div>
              <div class="feature-item">✅ <strong>Intellectual Property:</strong> IP ownership, licensing</div>
              <div class="feature-item">✅ <strong>Compliance:</strong> GDPR, data protection, industry regulations</div>
              <div class="feature-item">✅ <strong>Employment:</strong> Employee contracts, equity agreements</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">10. ACTION PLAN</div>
          
          <div class="highlight">
            <div class="highlight-title">Phase 1: Preparation (2-3 months)</div>
            <div class="feature-list">
              <div class="feature-item">📋 <strong>Complete MVP:</strong> Add payment integration, email/SMS</div>
              <div class="feature-item">📋 <strong>Get Early Customers:</strong> 5-10 venue owners using the system</div>
              <div class="feature-item">📋 <strong>Create Case Studies:</strong> Document ROI and success stories</div>
              <div class="feature-item">📋 <strong>Build Documentation:</strong> Technical specs, API documentation</div>
              <div class="feature-item">📋 <strong>Legal Setup:</strong> Proper corporate structure, IP protection</div>
            </div>
          </div>

          <div class="highlight">
            <div class="highlight-title">Phase 2: Market Validation (3-6 months)</div>
            <div class="feature-list">
              <div class="feature-item">📊 <strong>Industry Recognition:</strong> Speak at conferences, write articles</div>
              <div class="feature-item">📊 <strong>Partnership Discussions:</strong> Approach potential partners</div>
              <div class="feature-item">📊 <strong>Customer Success:</strong> Focus on customer retention and growth</div>
              <div class="feature-item">📊 <strong>Revenue Generation:</strong> Prove sustainable business model</div>
              <div class="feature-item">📊 <strong>Media Coverage:</strong> Get featured in industry publications</div>
            </div>
          </div>

          <div class="highlight">
            <div class="highlight-title">Phase 3: Exit Strategy (6-12 months)</div>
            <div class="feature-list">
              <div class="feature-item">🎯 <strong>Strategic Partnerships:</strong> Formalize partnership agreements</div>
              <div class="feature-item">🎯 <strong>Acquisition Talks:</strong> Engage with potential acquirers</div>
              <div class="feature-item">🎯 <strong>Due Diligence:</strong> Prepare for technical and business review</div>
              <div class="feature-item">🎯 <strong>Negotiation:</strong> Structure the best deal for your situation</div>
              <div class="feature-item">🎯 <strong>Closing:</strong> Complete the transaction and transition</div>
            </div>
          </div>

          <div class="pitch-point">
            <div class="pitch-point-title">Key Success Factors:</div>
            <div class="feature-list">
              <div class="feature-item">✅ <strong>Prove Market Demand:</strong> Real customers, real revenue</div>
              <div class="feature-item">✅ <strong>Demonstrate Technology:</strong> Working, scalable solution</div>
              <div class="feature-item">✅ <strong>Show Competitive Advantage:</strong> Unique features, modern tech</div>
              <div class="feature-item">✅ <strong>Build Relationships:</strong> Network with potential acquirers</div>
              <div class="feature-item">✅ <strong>Prepare Documentation:</strong> Due diligence ready</div>
            </div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 40px; text-align: center;">
          <button onclick="window.print()" style="padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
            Download Acquisition Pitch Deck PDF
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
        🚀 Acquisition Pitch Deck
      </h3>
      <p style={{ margin: '0 0 16px 0', color: '#64748b' }}>
        Generate a comprehensive pitch deck and acquisition guide with real examples of tech company acquisitions and strategic partnerships.
      </p>
      <button
        onClick={generatePitchDeck}
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
        🚀 Generate Acquisition Pitch Deck PDF
      </button>
    </div>
  );
};

export default AcquisitionPitchDeck; 