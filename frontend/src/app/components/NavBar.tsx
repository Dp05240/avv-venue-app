'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Venues', href: '/venues' },
  { label: 'Operations', href: '/operations' },
  { label: 'Clients', href: '/clients' },
  { label: 'Bookings', href: '/bookings' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    } catch (e) {
      // Ignore errors
    }
    router.push('/login');
  }

  return (
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

      {/* Message Icon */}
      <button
        style={{
          background: 'none',
          border: 'none',
          marginRight: 18,
          cursor: 'pointer',
          position: 'relative',
        }}
        title="Messages"
        onClick={() => alert('Messaging coming soon!')}
      >
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Notification Icon */}
      <button
        style={{
          background: 'none',
          border: 'none',
          marginRight: 18,
          cursor: 'pointer',
          position: 'relative',
        }}
        title="Notifications"
        onClick={() => alert('Notifications coming soon!')}
      >
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="12" cy="20" r="1.5" fill="#fff"/>
        </svg>
      </button>

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
              onClick={() => alert('Profile editing coming soon!')}
            >
              Edit Profile
            </button>
            <button
              style={dropdownBtnStyle}
              onClick={() => alert('Settings coming soon!')}
            >
              Settings
            </button>
            <button
              style={dropdownBtnStyle}
              onClick={() => alert('Admin panel coming soon!')}
            >
              Admin
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