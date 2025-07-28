'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SmartNotifications from './SmartNotifications';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Venues', href: '/venues' },
  { label: 'Operations', href: '/operations' },
  { label: 'Clients', href: '/clients' },
  { label: 'Bookings', href: '/bookings' },
  { label: 'Settings', href: '/settings' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [messagingOpen, setMessagingOpen] = useState(false);
  const [messagingTab, setMessagingTab] = useState<'quick'>('quick');
  const [quickComposeOpen, setQuickComposeOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [activeForm, setActiveForm] = useState<'text' | 'email'>('text');
  const messagingDrawerRef = useRef<HTMLDivElement>(null);
  const quickComposeRef = useRef<HTMLDivElement>(null);

  // Accessibility: Focus trap for drawer
  useEffect(() => {
    if (messagingOpen && messagingDrawerRef.current) {
      messagingDrawerRef.current.focus();
    }
  }, [messagingOpen]);
  useEffect(() => {
    if (quickComposeOpen && quickComposeRef.current) {
      quickComposeRef.current.focus();
    }
  }, [quickComposeOpen]);
  // Escape key to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (quickComposeOpen) setQuickComposeOpen(false);
        else if (messagingOpen) setMessagingOpen(false);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [messagingOpen, quickComposeOpen]);

  // Mock recent clients for quick contact
  const recentClients = [
    { id: 1, name: 'John Smith', email: 'john@acmecorp.com', phone: '+1 (555) 123-4567', company: 'Acme Corporation' },
    { id: 2, name: 'Emily Davis', email: 'emily@weddingplanners.com', phone: '+1 (555) 456-7890', company: 'Wedding Planners Co' },
    { id: 3, name: 'Michael Brown', email: 'michael@eventpro.com', phone: '+1 (555) 345-6789', company: 'Event Professionals LLC' },
  ];

  // Handle sending text message
  const sendTextMessage = () => {
    if (messageText.trim() && selectedClient) {
      const client = recentClients.find(c => c.id === selectedClient);
      // Log the message to communication history
      const newMessage = {
        id: Date.now().toString(),
        type: 'text' as const,
        direction: 'outbound' as const,
        content: messageText.trim(),
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent' as const,
      };
      
      // In a real app, this would be saved to a database
      console.log('Text message logged:', newMessage);
      
      alert(`Text message sent to ${client?.name} at ${client?.phone}: ${messageText}`);
      setMessageText('');
      setSelectedClient(null);
      setActiveForm('text');
    }
  };

  // Handle sending email
  const sendEmail = () => {
    if (emailSubject.trim() && emailBody.trim() && selectedClient) {
      const client = recentClients.find(c => c.id === selectedClient);
      // Log the email to communication history
      const newEmail = {
        id: Date.now().toString(),
        type: 'email' as const,
        direction: 'outbound' as const,
        subject: emailSubject.trim(),
        content: emailBody.trim(),
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent' as const,
      };
      
      // In a real app, this would be saved to a database
      console.log('Email logged:', newEmail);
      
      alert(`Email sent to ${client?.name} at ${client?.email}\nSubject: ${emailSubject}\nBody: ${emailBody}`);
      setEmailSubject('');
      setEmailBody('');
      setSelectedClient(null);
      setActiveForm('text');
    }
  };

  // Responsive: Detect mobile (simple window width check)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

  // Context-aware placeholder: e.g., pre-fill recipient if on client/booking page (not implemented, just a comment)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleLogout() {
    setDropdownOpen(false);
    try {
      await fetch('http://localhost:4000/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // Ignore errors
    }
    router.push('/login');
  }

  return (
    <>

      {/* Quick Compose Mini-Modal */}
      {quickComposeOpen && (
        <div
          ref={quickComposeRef}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 2300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={e => {
            if (e.target === quickComposeRef.current) setQuickComposeOpen(false);
          }}
        >
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            minWidth: 280,
            maxWidth: '90vw',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            position: 'relative',
          }}>
            <button
              onClick={() => setQuickComposeOpen(false)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}
              title="Close"
            >×</button>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Quick Compose</h3>
            <select style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}>
              <option value="direct">Direct Message</option>
              <option value="email">Email</option>
            </select>
            <input
              type="text"
              placeholder="Recipient (phone or email)"
              style={{ width: '100%', marginBottom: 10, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14 }}
            />
            <textarea
              placeholder="Type your message..."
              rows={3}
              style={{ width: '100%', marginBottom: 10, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button
                onClick={() => setQuickComposeOpen(false)}
                style={{ padding: '8px 18px', border: '1px solid #d1d5db', borderRadius: 6, background: '#fff', color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
              >Cancel</button>
              <button
                style={{ padding: '8px 18px', border: 'none', borderRadius: 6, background: '#667eea', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
                onClick={() => setQuickComposeOpen(false)}
              >Send</button>
            </div>
          </div>
        </div>
      )}
      {/* Messaging Drawer/Bottom Sheet */}
      {messagingOpen && (
        <div
          ref={messagingDrawerRef}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          style={{
            position: 'fixed',
            top: isMobile ? 'auto' : 0,
            bottom: 0,
            right: isMobile ? 0 : 0,
            left: isMobile ? 0 : 'auto',
            height: isMobile ? 320 : '100vh',
            width: isMobile ? '100vw' : 400,
            maxWidth: '100vw',
            background: '#fff',
            boxShadow: isMobile ? '0 -4px 24px rgba(0,0,0,0.10)' : '-4px 0 24px rgba(0,0,0,0.10)',
            zIndex: 2100,
            display: 'flex',
            flexDirection: 'column',
            borderTopLeftRadius: isMobile ? 16 : 12,
            borderTopRightRadius: isMobile ? 16 : 0,
            borderBottomLeftRadius: isMobile ? 0 : 12,
            outline: 'none',
            transition: 'right 0.2s, bottom 0.2s',
          }}
        >
          {/* Tabs at top */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '18px 24px 10px 24px',
            background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)',
            borderTopLeftRadius: isMobile ? 16 : 12,
            borderTopRightRadius: isMobile ? 16 : 0,
            boxShadow: '0 2px 8px #fc5c7d22',
            borderBottom: '1px solid #eee',
          }}>
            <div style={{
              display: 'flex',
              gap: 10,
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 24,
              padding: 4,
              boxShadow: '0 1px 4px #fc5c7d11',
            }}>
              <div style={{
                background: '#fff',
                color: '#6a82fb',
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 20,
                padding: '8px 22px',
                boxShadow: '0 2px 8px #fc5c7d22',
              }}>Quick Contact</div>
            </div>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => setMessagingOpen(false)}
              style={{ background: 'none', border: 'none', fontSize: 22, color: '#fff', cursor: 'pointer', marginLeft: 18 }}
              title="Close"
              aria-label="Close messaging panel"
            >×</button>
          </div>
          {/* Content */}
          <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {messagingTab === 'quick' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#232323', marginBottom: 8 }}>Client Messaging</h2>
                <div style={{ marginBottom: 10, color: '#888', fontSize: 14 }}>
                  Quick access to recent clients for messaging.<br/>
                  <span style={{ color: '#fc5c7d' }}>(Demo UI only)</span>
                </div>
                {selectedClient === null ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {recentClients.map((client) => (
                    <div key={client.id} style={{
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      padding: 12,
                      boxShadow: '0 1px 4px #e0e7eb11',
                    }}>
                      <div style={{ fontWeight: 600, fontSize: 16, color: '#232323', marginBottom: 4 }}>
                        {client.name}
                      </div>
                      <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                        {client.company}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          style={{
                            padding: '6px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: 6,
                            background: '#fff',
                            color: '#374151',
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                          onClick={() => {
                            setSelectedClient(client.id);
                            setActiveForm('text');
                          }}
                        >
                          📱 Text
                        </button>
                        <button
                          style={{
                            padding: '6px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: 6,
                            background: '#fff',
                            color: '#374151',
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                          onClick={() => {
                            setSelectedClient(client.id);
                            setActiveForm('email');
                          }}
                        >
                          📧 Email
                        </button>
                        <button
                          style={{
                            padding: '6px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: 6,
                            background: '#fff',
                            color: '#374151',
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                          onClick={() => alert(`Call ${client.name} at ${client.phone}`)}
                        >
                          📞 Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(() => {
                      const client = recentClients.find(c => c.id === selectedClient);
                      return (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <button
                              onClick={() => setSelectedClient(null)}
                              style={{
                                padding: '4px 8px',
                                border: 'none',
                                background: 'transparent',
                                color: '#666',
                                cursor: 'pointer',
                                fontSize: 16,
                              }}
                            >
                              ← Back
                            </button>
                            <div style={{ fontWeight: 600, fontSize: 16, color: '#232323' }}>
                              Message {client?.name}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                            <button
                              style={{
                                padding: '8px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: 6,
                                background: activeForm === 'text' ? '#6366f1' : '#fff',
                                color: activeForm === 'text' ? '#fff' : '#374151',
                                fontSize: 14,
                                fontWeight: 500,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setActiveForm('text');
                              }}
                            >
                              📱 Text Message
                            </button>
                            <button
                              style={{
                                padding: '8px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: 6,
                                background: activeForm === 'email' ? '#6366f1' : '#fff',
                                color: activeForm === 'email' ? '#fff' : '#374151',
                                fontSize: 14,
                                fontWeight: 500,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setActiveForm('email');
                              }}
                            >
                              📧 Email
                            </button>
                          </div>

                          {/* Text Message Form */}
                          {activeForm === 'text' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                                Message to {client?.phone}
                              </label>
                              <textarea
                                placeholder="Type your message here..."
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                rows={4}
                                style={{
                                  width: '100%',
                                  padding: '10px 12px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: 8,
                                  fontSize: 15,
                                  resize: 'vertical',
                                  background: '#fff',
                                  outline: 'none',
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setSelectedClient(null)}
                                style={{
                                  padding: '8px 16px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: 6,
                                  background: '#fff',
                                  color: '#374151',
                                  fontSize: 14,
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={sendTextMessage}
                                disabled={!messageText.trim()}
                                style={{
                                  padding: '8px 16px',
                                  border: 'none',
                                  borderRadius: 6,
                                  background: messageText.trim() ? '#667eea' : '#e5e7eb',
                                  color: messageText.trim() ? '#fff' : '#aaa',
                                  fontSize: 14,
                                  fontWeight: 500,
                                  cursor: messageText.trim() ? 'pointer' : 'not-allowed',
                                }}
                              >
                                Send Text
                              </button>
                            </div>
                          </div>
                          )}

                          {/* Email Form */}
                          {activeForm === 'email' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                                Subject
                              </label>
                              <input
                                type="text"
                                placeholder="Email subject..."
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                style={{
                                  width: '100%',
                                  padding: '10px 12px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: 8,
                                  fontSize: 15,
                                  background: '#fff',
                                  outline: 'none',
                                }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                                Message to {client?.email}
                              </label>
                              <textarea
                                placeholder="Type your email here..."
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                rows={6}
                                style={{
                                  width: '100%',
                                  padding: '10px 12px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: 8,
                                  fontSize: 15,
                                  resize: 'vertical',
                                  background: '#fff',
                                  outline: 'none',
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setSelectedClient(null)}
                                style={{
                                  padding: '8px 16px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: 6,
                                  background: '#fff',
                                  color: '#374151',
                                  fontSize: 14,
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={sendEmail}
                                disabled={!emailSubject.trim() || !emailBody.trim()}
                                style={{
                                  padding: '8px 16px',
                                  border: 'none',
                                  borderRadius: 6,
                                  background: (emailSubject.trim() && emailBody.trim()) ? '#667eea' : '#e5e7eb',
                                  color: (emailSubject.trim() && emailBody.trim()) ? '#fff' : '#aaa',
                                  fontSize: 14,
                                  fontWeight: 500,
                                  cursor: (emailSubject.trim() && emailBody.trim()) ? 'pointer' : 'not-allowed',
                                }}
                              >
                                Send Email
                              </button>
                            </div>
                          </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {/* NavBar */}
      <nav
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)',
          padding: '0 0 0 24px',
          display: 'flex',
          alignItems: 'center',
          height: 60,
          boxShadow: '0 2px 8px #fc5c7d22',
          marginBottom: 32,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 22, color: '#fff', marginRight: 40, letterSpacing: 1 }}>
          AV+V
        </div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: pathname === item.href ? '#fff' : '#f3e9f7',
              background: pathname === item.href ? 'rgba(255,255,255,0.18)' : 'none',
              borderRadius: 8,
              padding: '8px 18px',
              marginRight: 8,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {item.label}
          </Link>
        ))}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Messaging Dropdown Button */}
        <div style={{ position: 'relative', marginRight: 18 }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            title="Messaging"
            onClick={() => setMessagingOpen(true)}
            aria-label="Open messaging panel"
          >
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Smart Notifications */}
        <div style={{ marginRight: 18 }}>
          <SmartNotifications 
            onNotificationClick={(notification) => {
              console.log('Notification clicked:', notification);
            }}
            onMarkAsRead={(notificationId) => {
              console.log('Marked as read:', notificationId);
            }}
            onDismiss={(notificationId) => {
              console.log('Dismissed:', notificationId);
            }}
          />
        </div>

        {/* User Avatar & Dropdown */}
        <div style={{ position: 'relative', marginRight: 24 }} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 0,
            }}
            title="Profile"
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 2px 8px #fc5c7d22',
              }}
            >
              A
            </div>
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 48,
                background: '#fff',
                borderRadius: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                minWidth: 180,
                zIndex: 100,
                padding: '8px 0',
              }}
            >
              <div style={{ padding: '10px 20px', color: '#333', fontWeight: 600, borderBottom: '1px solid #eee' }}>
                admin
              </div>
              <button
                style={dropdownBtnStyle}
                onClick={() => router.push('/profile')}
              >
                Profile
              </button>
              <button
                style={{ ...dropdownBtnStyle, color: '#fc5c7d', borderTop: '1px solid #eee' }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

const dropdownBtnStyle: React.CSSProperties = {
  width: '100%',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  padding: '10px 20px',
  fontSize: 16,
  color: '#444',
  cursor: 'pointer',
  transition: 'background 0.2s',
  outline: 'none',
};

const messagingTabBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#fff',
  fontWeight: 500,
  fontSize: 16,
  padding: '14px 0',
  cursor: 'pointer',
  borderRadius: 0,
  outline: 'none',
  transition: 'background 0.2s',
};
const messagingTabBtnActive: React.CSSProperties = {
  ...messagingTabBtn,
  background: 'rgba(255,255,255,0.18)',
  color: '#fff',
  fontWeight: 700,
};