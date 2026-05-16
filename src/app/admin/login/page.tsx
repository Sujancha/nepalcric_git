'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Redirect back to where the user was trying to go, or dashboard
        const callbackUrl = searchParams.get('callbackUrl');
        router.push(callbackUrl || '/admin/');
      } else {
        const data = (await res.json()) as { error?: string };
        if (data.error?.includes('misconfiguration') || data.error?.includes('not set')) {
          setError('Vercel मा ADMIN_PASSWORD environment variable सेट गर्नुहोस् र redeploy गर्नुहोस्।');
        } else {
          setError('गलत पासवर्ड — फेरि प्रयास गर्नुस्।');
        }
      }
    } catch {
      setError('सर्भरमा समस्या भयो। फेरि प्रयास गर्नुस्।');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07080F',
        padding: '1.5rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '380px' }}>
        {/* Logo */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '2.25rem', letterSpacing: '0.1em', color: '#C41E3A', margin: 0, lineHeight: 1 }}>
            NEPALCRIC
          </h1>
          <p style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B7280', marginTop: '0.5rem' }}>
            ADMIN ACCESS
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label
              htmlFor="password"
              style={{ display: 'block', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '0.75rem' }}
            >
              पासवर्ड
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #6B7280',
                borderRadius: 0,
                padding: '0.5rem 0',
                color: '#E8E8E8',
                fontSize: '1rem',
                fontFamily: 'var(--font-mukta), sans-serif',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C9A84C')}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = '#6B7280')}
            />
          </div>

          {error && (
            <p style={{ color: '#C41E3A', fontSize: '0.82rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mukta), sans-serif', lineHeight: 1.5 }}>
              ⚠ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#6B7280' : '#C41E3A',
              color: '#E8E8E8',
              border: 'none',
              padding: '0.8rem 1.5rem',
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'प्रवेश हुँदैछ...' : 'प्रवेश गर्नुस्'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#07080F' }} />}>
      <LoginForm />
    </Suspense>
  );
}
