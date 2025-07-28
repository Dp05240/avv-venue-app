'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)',
    }}>
      <div style={{
        textAlign: 'center',
        color: '#fff',
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          AV+V Platform
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9 }}>
          Redirecting to dashboard...
        </p>
      </div>
    </div>
  );
}
