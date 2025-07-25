'use client';

import NavBar from '../components/NavBar';
import CalendarSidebar from '../components/CalendarSidebar';
import { useState } from 'react';
import { useRef } from 'react';

type Message = {
  sender: string;
  text: string;
  attachment?: {
    name?: string;
    url?: string;
    type?: string;
  } | null;
};

const sampleStats = [
  { label: 'Total Bookings', value: 42 },
  { label: 'Active Venues', value: 5 },
  { label: 'Upcoming Events', value: 8 },
  { label: 'Pending Payments', value: '$2,300' },
];

const sampleBookings = [
  { event: 'Wedding Reception', client: 'John & Jane', date: '2024-07-15', venue: 'Grand Hall' },
  { event: 'Corporate Gala', client: 'Acme Corp', date: '2024-07-20', venue: 'Skyline Terrace' },
  { event: 'Birthday Bash', client: 'Emily R.', date: '2024-07-22', venue: 'Garden Room' },
];

const eventSpaces = [
  {
    name: 'Space 1',
    event: 'Mr. Timothy',
    customerId: 234,
    status: 'Cleaning',
    reservation: '4PM - 11PM',
    earlyAccess: '2PM',
    amenities: ['Bathroom', 'Electricity', 'Lights', 'In-house audio system', 'Projectors'],
    notes: 'special customer',
  },
  {
    name: 'Space 2',
    event: 'Trade Show Meetup',
    customerId: 144,
    status: 'Production',
    reservation: '6PM - 11PM',
    earlyAccess: '4PM',
    amenities: ['Bathroom', 'Electricity', 'Lights', 'In-house audio system', 'Projectors'],
    notes: 'Business Account',
  },
];

export default function DashboardPage() {
  // Add state for chat messages
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'Alice', text: 'Welcome to the team chat!' },
    { sender: 'Bob', text: 'Let’s sync up at 2pm.' },
  ]);
  const [input, setInput] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim() || attachment) {
      setMessages([
        ...messages,
        {
          sender: 'You',
          text: input,
          attachment: attachmentPreview ? { name: attachment?.name, url: attachmentPreview, type: attachment?.type } : null,
        },
      ]);
      setInput('');
      setAttachment(null);
      setAttachmentPreview(null);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = ev => setAttachmentPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setAttachmentPreview('');
      }
    }
  }

  function handleCameraChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFileChange(e);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
        <CalendarSidebar />
        {/* Main content with analytics and bookings */}
        <div style={{ flex: 1, minHeight: 500, padding: '0 32px' }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            padding: '32px 40px',
            margin: '40px 0',
            color: '#232323',
          }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#333' }}>
              AV+V Dashboard
            </h1>
            <div style={{ fontSize: 18, color: '#666', marginBottom: 24 }}>
              Welcome to your event and venue management platform.
            </div>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
              {sampleStats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    flex: '1 1 180px',
                    background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)',
                    color: '#fff',
                    borderRadius: 12,
                    padding: '24px 20px',
                    boxShadow: '0 2px 8px #fc5c7d22',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: 160,
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{stat.value}</div>
                  <div style={{ fontSize: 16, opacity: 0.9 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            {/* Recent Bookings Table */}
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, color: '#444' }}>
                Recent Bookings
              </h2>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: '#fff',
                borderRadius: 10,
                overflow: 'hidden',
                color: '#222',
                fontSize: 16,
              }}>
                <thead>
                  <tr style={{ background: '#e0e7ff', color: '#333' }}>
                    <th style={{ padding: 12, textAlign: 'left' }}>Event</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Client</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Venue</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleBookings.map((b, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: 12 }}>{b.event}</td>
                      <td style={{ padding: 12 }}>{b.client}</td>
                      <td style={{ padding: 12 }}>{b.date}</td>
                      <td style={{ padding: 12 }}>{b.venue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Venue Status Sidebar */}
        <div style={{
          width: 340,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          marginLeft: 32,
          minHeight: 500,
        }}>
          {eventSpaces.map((space, idx) => (
            <div key={idx} style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 4px 16px rgba(31,38,135,0.08)',
              padding: '24px 20px 20px 20px',
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 0,
              color: '#232323',
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#6a82fb', marginBottom: 6 }}>{space.name}</div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 2 }}>{space.event} <span style={{ color: '#aaa', fontWeight: 400 }}>(Customer ID: {space.customerId})</span></div>
              <div style={{ fontSize: 15, marginBottom: 8 }}><b>Status:</b> <span style={{ color: space.status === 'Cleaning' ? '#f4b400' : '#34a853', fontWeight: 600 }}>{space.status}</span></div>
              <div style={{ fontSize: 15, marginBottom: 2 }}><b>Reservation Frame:</b> {space.reservation}</div>
              <div style={{ fontSize: 15, marginBottom: 2 }}><b>Early Access Time:</b> {space.earlyAccess}</div>
              <div style={{ fontSize: 15, marginBottom: 2 }}><b>Amenities:</b> {space.amenities.join(', ')}</div>
              <div style={{ fontSize: 15, marginTop: 8, color: '#6a82fb' }}><b>Client Notes:</b> {space.notes}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}