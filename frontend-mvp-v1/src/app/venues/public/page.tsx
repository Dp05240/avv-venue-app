'use client';
import React from 'react';

const venue = {
  name: 'Grand Hall',
  type: 'Banquet Hall',
  address: '123 Main St, Cityville',
  contactPhone: '+1 555-123-4567',
  contactEmail: 'info@grandhall.com',
  description: 'A beautiful venue for weddings, galas, and corporate events. Features a spacious main hall, modern amenities, and a dedicated staff.',
  photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  operatingHours: '9:00 AM - 11:00 PM',
  timeZone: 'America/New_York',
  checkIn: '2:00 PM',
  checkOut: '11:00 PM',
  maxCapacity: 300,
  seatedCapacity: 200,
  banquetCapacity: 150,
  parkingCapacity: 50,
  dimensions: { length: 40, width: 20, height: 6, totalArea: 800 },
  powerSupply: '100A, 3-phase',
  outlets: '20 standard, 4 industrial',
  generator: 'Yes (50kW backup)',
  internet: 'Fiber, 500Mbps, guest WiFi',
  lighting: 'LED, dimmable, 4 zones',
  av: 'In-house audio, 2 projectors, 4 wireless mics',
  hvac: 'Central HVAC, programmable',
  amenities: ['WiFi', 'AV', 'Parking', 'Kitchen', 'Bar', 'Accessibility'],
  accessibility: 'Wheelchair ramps, accessible restrooms',
  bookingPolicy: '50% deposit required. Free cancellation up to 30 days before event.',
  houseRules: 'No outside catering. No smoking indoors. Music off by midnight.',
  insurance: 'Event insurance required for all bookings.',
  manager: 'Jane Doe',
  supportContact: '+1 555-987-6543',
};

export default function VenuePublicPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa', fontFamily: 'Inter, Arial, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(31,38,135,0.10)', padding: 0, overflow: 'hidden' }}>
        <img src={venue.photo} alt={venue.name} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
        <div style={{ padding: 32 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#232323', marginBottom: 8 }}>{venue.name}</h1>
          <div style={{ fontSize: 20, color: '#6a82fb', fontWeight: 600, marginBottom: 8 }}>{venue.type}</div>
          <div style={{ fontSize: 16, color: '#888', marginBottom: 18 }}>{venue.address}</div>
          <div style={{ fontSize: 17, color: '#232323', marginBottom: 18 }}>{venue.description}</div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            {venue.amenities.map((a, i) => (
              <span key={i} style={{ background: '#f5f6fa', color: '#6a82fb', borderRadius: 8, padding: '6px 14px', fontWeight: 600, fontSize: 15, border: '1px solid #e0e0e0' }}>{a}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 24 }}>
            <div>
              <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Max Capacity</div>
              <div style={{ color: '#444' }}>{venue.maxCapacity} standing</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Seated Capacity</div>
              <div style={{ color: '#444' }}>{venue.seatedCapacity}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Banquet Capacity</div>
              <div style={{ color: '#444' }}>{venue.banquetCapacity}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Parking</div>
              <div style={{ color: '#444' }}>{venue.parkingCapacity} cars</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Dimensions</div>
              <div style={{ color: '#444' }}>{venue.dimensions.length}m x {venue.dimensions.width}m x {venue.dimensions.height}m</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Total Area</div>
              <div style={{ color: '#444' }}>{venue.dimensions.totalArea} m²</div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Operating Hours</div>
            <div style={{ color: '#444' }}>{venue.operatingHours} ({venue.timeZone})</div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Contact</div>
            <div style={{ color: '#444' }}>Phone: {venue.contactPhone}</div>
            <div style={{ color: '#444' }}>Email: {venue.contactEmail}</div>
            <div style={{ color: '#444' }}>Manager: {venue.manager}</div>
            <div style={{ color: '#444' }}>Support: {venue.supportContact}</div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Booking Policy</div>
            <div style={{ color: '#444', whiteSpace: 'pre-line' }}>{venue.bookingPolicy}</div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>House Rules</div>
            <div style={{ color: '#444', whiteSpace: 'pre-line' }}>{venue.houseRules}</div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Insurance/Legal Requirements</div>
            <div style={{ color: '#444', whiteSpace: 'pre-line' }}>{venue.insurance}</div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', color: '#aaa', fontSize: 14, marginTop: 32, marginBottom: 16 }}>
        Powered by AV+V Venue Platform
      </div>
    </div>
  );
} 