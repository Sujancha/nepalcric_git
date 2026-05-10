'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface GithubFileResponse {
  content: string;
  sha: string;
  error?: string;
}

interface GithubPutResponse {
  success?: boolean;
  commit?: string;
  error?: string;
}

const FILE_PATH = 'src/app/scoreboard/page.tsx';

export default function ScoreboardEditorPage() {
  const [content, setContent] = useState('');
  const [sha, setSha] = useState('');
  const [loadError, setLoadError] = useState('');
  const [loadingFile, setLoadingFile] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');

  const fetchFile = useCallback(async () => {
    setLoadingFile(true);
    setLoadError('');
    try {
      const res = await fetch(`/api/admin/github?path=${encodeURIComponent(FILE_PATH)}`);
      const data = (await res.json()) as GithubFileResponse;
      if (!res.ok) {
        setLoadError(data.error ?? `फाइल लोड गर्न सकिएन (${res.status})`);
        return;
      }
      setContent(data.content);
      setSha(data.sha);
    } catch {
      setLoadError('नेटवर्क त्रुटि: फाइल लोड हुन सकेन।');
    } finally {
      setLoadingFile(false);
    }
  }, []);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  async function handleSave() {
    if (!sha) return;
    setSaveStatus('saving');
    setSaveError('');
    try {
      const res = await fetch('/api/admin/github', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: FILE_PATH,
          content,
          sha,
          message: 'admin: update scoreboard page',
        }),
      });
      const data = (await res.json()) as GithubPutResponse;
      if (res.ok && data.success) {
        setSaveStatus('saved');
        await fetchFile();
        setTimeout(() => setSaveStatus('idle'), 4000);
      } else {
        setSaveStatus('error');
        setSaveError(data.error ?? `सेभ हुन सकेन (${res.status})`);
      }
    } catch {
      setSaveStatus('error');
      setSaveError('नेटवर्क त्रुटि: सेभ हुन सकेन।');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07080F',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '1.75rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <Link
              href="/admin/dashboard"
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#6B7280',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              ← ड्यासबोर्ड
            </Link>
            <h1
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: '1.5rem',
                letterSpacing: '0.08em',
                color: '#C9A84C',
                margin: 0,
                lineHeight: 1,
              }}
            >
              स्कोरबोर्ड
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: '0.65rem',
                color: '#6B7280',
                marginTop: '0.35rem',
              }}
            >
              {FILE_PATH}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {saveStatus === 'saving' && (
              <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C' }}>
                सेभ हुँदैछ...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ade80' }}>
                सेभ भयो ✓
              </span>
            )}
            {saveStatus === 'error' && (
              <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C41E3A' }}>
                त्रुटि ✗
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={loadingFile || saveStatus === 'saving' || !sha}
              style={{
                background: loadingFile || saveStatus === 'saving' || !sha ? '#6B7280' : '#C41E3A',
                color: '#E8E8E8',
                border: 'none',
                padding: '0.6rem 1.25rem',
                fontFamily: 'var(--font-barlow), sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: loadingFile || saveStatus === 'saving' || !sha ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              सेभ गर्नुस्
            </button>
          </div>
        </div>

        {saveStatus === 'saved' && (
          <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', padding: '0.75rem 1rem', marginBottom: '1rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: '#4ade80' }}>
            Vercel मा प्रकाशित हुँदैछ — १–२ मिनेट लाग्छ
          </div>
        )}

        {loadError && (
          <div style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.3)', padding: '0.75rem 1rem', marginBottom: '1rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: '#C41E3A' }}>
            {loadError}
          </div>
        )}
        {saveStatus === 'error' && saveError && (
          <div style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.3)', padding: '0.75rem 1rem', marginBottom: '1rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: '#C41E3A' }}>
            {saveError}
          </div>
        )}

        {loadingFile ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            लोड हुँदैछ...
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1,
              minHeight: '65vh',
              width: '100%',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#E8E8E8',
              fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", monospace',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              padding: '1.25rem',
              resize: 'vertical',
              outline: 'none',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
        )}

        <p style={{ marginTop: '1.5rem', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>
            ← साइटमा फर्किनुस्
          </Link>
        </p>
      </div>
    </div>
  );
}
