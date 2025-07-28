'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)',
      }}
    >
      <div
        style={{
          width: 380,
          padding: '2.5rem 2rem',
          borderRadius: 18,
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 8,
            letterSpacing: 1,
            color: '#333',
          }}
        >
          AV+V Login
        </div>
        <div
          style={{
            fontSize: 16,
            color: '#888',
            marginBottom: 24,
            letterSpacing: 0.5,
          }}
        >
          Welcome back! Please sign in to continue.
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: 18 }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                fontSize: 16,
                outline: 'none',
                background: '#ffffff',
                marginBottom: 4,
                color: '#232323',
                transition: 'border 0.2s',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                fontSize: 16,
                outline: 'none',
                background: '#ffffff',
                marginBottom: 4,
                color: '#232323',
                transition: 'border 0.2s',
              }}
              required
            />
          </div>
          {error && (
            <div style={{ color: '#e74c3c', marginBottom: 16, textAlign: 'center' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 0',
              borderRadius: 8,
              background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: 1,
              boxShadow: '0 2px 8px #fc5c7d22',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Login
          </button>
        </form>
        <div style={{ width: '100%', marginTop: 18, display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: '#6a82fb',
              cursor: 'pointer',
              fontSize: 15,
              textDecoration: 'underline',
              padding: 0,
            }}
            onClick={() => alert('Forgot password functionality coming soon!')}
          >
            Forgot password?
          </button>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: '#fc5c7d',
              cursor: 'pointer',
              fontSize: 15,
              textDecoration: 'underline',
              padding: 0,
            }}
            onClick={() => alert('Sign up functionality coming soon!')}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}