'use client';

import NavBar from '../components/NavBar';
import PDFGenerator from '../components/PDFGenerator';
import ProductionRoadmapPDF from '../components/ProductionRoadmapPDF';
import VisualProductionDoc from '../components/VisualProductionDoc';
import ScreenshotGuide from '../components/ScreenshotGuide';
import AcquisitionPitchDeck from '../components/AcquisitionPitchDeck';

export default function ToolsPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc',
      margin: 0,
      padding: 0
    }}>
      <NavBar />
      
      <div style={{ 
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#232323', 
            marginBottom: '8px' 
          }}>
            Personal Tools
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '16px' 
          }}>
            Private tools and document generators for personal use
          </p>
        </div>

        {/* Tools Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '24px' 
        }}>
          
          {/* PDF Documentation Generator */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#232323',
              marginBottom: '16px'
            }}>
              📄 PDF Documentation Generator
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Generate comprehensive PDF documentation for your projects
            </p>
            <PDFGenerator onGenerate={() => {
              console.log('PDF generated successfully!');
            }} />
          </div>

          {/* Production Roadmap PDF Generator */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#232323',
              marginBottom: '16px'
            }}>
              🗺️ Production Roadmap PDF
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Create detailed production roadmaps and timelines
            </p>
            <ProductionRoadmapPDF onGenerate={() => {
              console.log('Production roadmap PDF generated successfully!');
            }} />
          </div>

          {/* Visual Production Documentation */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#232323',
              marginBottom: '16px'
            }}>
              🎨 Visual Production Documentation
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Generate visual documentation with charts and diagrams
            </p>
            <VisualProductionDoc onGenerate={() => {
              console.log('Visual production documentation generated successfully!');
            }} />
          </div>

          {/* Screenshot Guide */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#232323',
              marginBottom: '16px'
            }}>
              📸 Screenshot Guide
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Create step-by-step screenshot guides and tutorials
            </p>
            <ScreenshotGuide onGenerate={() => {
              console.log('Screenshot guide generated successfully!');
            }} />
          </div>

          {/* Acquisition Pitch Deck */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#232323',
              marginBottom: '16px'
            }}>
              📊 Acquisition Pitch Deck
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Generate professional acquisition and pitch presentations
            </p>
            <AcquisitionPitchDeck onGenerate={() => {
              console.log('Acquisition pitch deck generated successfully!');
            }} />
          </div>

        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: '48px',
          padding: '24px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: '#666', 
            fontSize: '14px',
            margin: 0
          }}>
            🔒 This page is for personal use only. All tools and generated documents are private.
          </p>
        </div>
      </div>
    </div>
  );
} 