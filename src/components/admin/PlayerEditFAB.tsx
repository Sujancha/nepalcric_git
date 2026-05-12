'use client';

import { useState, useEffect, useRef } from 'react';

interface ParsePlayerResponse {
  heroQuote: string;
  excerptNe: string;
  loreNe: string;
  images: string[];
  sha: string;
  error?: string;
}

interface PlayerEditFABProps {
  id: string;
  nameEn?: string;
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  color: '#E8E8E8',
  fontFamily: "'Mukta', sans-serif",
  fontSize: '14px',
  padding: '6px 0',
  outline: 'none',
  resize: 'none',
  transition: 'border-bottom-color 150ms ease',
};

const labelBase: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: '9px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#6B7280',
  marginBottom: '6px',
};

export default function PlayerEditFAB({ id, nameEn }: PlayerEditFABProps) {
  const [showPanel, setShowPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroQuote, setHeroQuote] = useState('');
  const [excerptNe, setExcerptNe] = useState('');
  const [loreNe, setLoreNe] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [sha, setSha] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPanel) return;
    setLoading(true);
    setSaveStatus('idle');
    setSaveError('');

    fetch(`/api/admin/parse-player?id=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((data: ParsePlayerResponse) => {
        if (data.error) {
          setSaveError(data.error);
        } else {
          setHeroQuote(data.heroQuote ?? '');
          setExcerptNe(data.excerptNe ?? '');
          setLoreNe(data.loreNe ?? '');
          setImages(data.images ?? []);
          setSha(data.sha ?? '');
        }
      })
      .catch((err) => setSaveError(err instanceof Error ? err.message : 'लोड गर्न सकिएन'))
      .finally(() => setLoading(false));
  }, [showPanel, id]);

  async function handleSave() {
    if (!sha) return;
    setSaveStatus('saving');
    setSaveError('');
    try {
      const res = await fetch('/api/admin/parse-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, heroQuote, excerptNe, loreNe, images, sha }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (res.ok && data.success) {
        setSaveStatus('saved');
        setTimeout(() => {
          setShowPanel(false);
          setSaveStatus('idle');
        }, 2000);
      } else {
        setSaveStatus('error');
        setSaveError(data.error ?? `सेभ हुन सकेन (${res.status})`);
      }
    } catch (err) {
      setSaveStatus('error');
      setSaveError(err instanceof Error ? err.message : 'नेटवर्क त्रुटि');
    }
  }

  function addImage() {
    if (images.length >= 5) return;
    setImages([...images, '']);
  }

  function removeImage(idx: number) {
    setImages(images.filter((_, i) => i !== idx));
  }

  function updateImage(idx: number, val: string) {
    setImages(images.map((img, i) => (i === idx ? val : img)));
  }

  const canSave = !loading && !!sha && saveStatus !== 'saving';

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setShowPanel(true)}
        title="Edit Player"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#C41E3A',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(196,30,58,0.4)',
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          color: '#fff',
          fontSize: '22px',
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(196,30,58,0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(196,30,58,0.4)';
        }}
      >
        ✏
      </button>

      {/* Backdrop + Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            onClick={() => setShowPanel(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 999,
            }}
          />

          {/* Slide-in panel */}
          <div
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              width: '420px',
              maxWidth: '100vw',
              background: '#0D1B2A',
              borderLeft: '1px solid rgba(196,30,58,0.3)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              transform: 'translateX(0)',
              transition: 'transform 300ms cubic-bezier(0.76,0,0.24,1)',
            }}
          >
            {/* Panel header */}
            <div
              style={{
                padding: '20px 20px 16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Mukta', sans-serif",
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#C41E3A',
                    margin: '0 0 4px 0',
                  }}
                >
                  ✏ खेलाडी सम्पादन
                </h2>
                {nameEn && (
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: '11px',
                      color: '#6B7280',
                      letterSpacing: '0.1em',
                      margin: 0,
                      textTransform: 'uppercase',
                    }}
                  >
                    {nameEn}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowPanel(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#6B7280',
                  fontSize: '20px',
                  cursor: 'pointer',
                  lineHeight: 1,
                  padding: '0 0 0 8px',
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            {/* Panel body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {loading ? (
                <div
                  style={{
                    padding: '3rem 0',
                    textAlign: 'center',
                    fontFamily: "'Mukta', sans-serif",
                    fontSize: '14px',
                    color: '#6B7280',
                  }}
                >
                  लोड हुँदैछ...
                </div>
              ) : (
                <>
                  {/* Hero Quote */}
                  <div>
                    <label style={labelBase}>HERO QUOTE</label>
                    <input
                      type="text"
                      value={heroQuote}
                      onChange={(e) => setHeroQuote(e.target.value)}
                      style={inputBase}
                      onFocus={focusGold}
                      onBlur={blurDim}
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label style={labelBase}>संक्षिप्त</label>
                    <textarea
                      value={excerptNe}
                      onChange={(e) => setExcerptNe(e.target.value)}
                      rows={3}
                      style={inputBase}
                      onFocus={focusGold}
                      onBlur={blurDim}
                    />
                  </div>

                  {/* Full lore */}
                  <div>
                    <label style={labelBase}>पूर्ण कथा</label>
                    <textarea
                      value={loreNe}
                      onChange={(e) => setLoreNe(e.target.value)}
                      rows={18}
                      style={{ ...inputBase, fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}
                      onFocus={focusGold}
                      onBlur={blurDim}
                    />
                  </div>

                  {/* Images */}
                  <div>
                    <label style={labelBase}>तस्बिरहरू</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {images.map((img, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="text"
                            value={img}
                            onChange={(e) => updateImage(idx, e.target.value)}
                            placeholder="/images/players/..."
                            style={{ ...inputBase, flex: 1 }}
                            onFocus={focusGold}
                            onBlur={blurDim}
                          />
                          <button
                            onClick={() => removeImage(idx)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#6B7280',
                              cursor: 'pointer',
                              fontSize: '16px',
                              lineHeight: 1,
                              padding: '0 4px',
                              flexShrink: 0,
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {images.length < 5 && (
                        <button
                          onClick={addImage}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#6B7280',
                            padding: '6px 12px',
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: '10px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            borderRadius: 2,
                            alignSelf: 'flex-start',
                            marginTop: '4px',
                          }}
                        >
                          + तस्बिर थप्नुस्
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Panel footer */}
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <button
                onClick={handleSave}
                disabled={!canSave}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: canSave ? '#C41E3A' : '#6B7280',
                  border: 'none',
                  color: '#fff',
                  fontFamily: "'Mukta', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: canSave ? 'pointer' : 'not-allowed',
                  borderRadius: 2,
                  transition: 'background 150ms ease',
                }}
              >
                {saveStatus === 'saving' ? 'सेभ हुँदैछ...' : 'सेभ गर्नुस्'}
              </button>

              {/* Status text */}
              {saveStatus === 'saved' && (
                <p
                  style={{
                    fontFamily: "'Mukta', sans-serif",
                    fontSize: '12px',
                    color: '#4ade80',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  ✓ सेभ भयो — Vercel मा प्रकाशित हुँदैछ
                </p>
              )}
              {saveStatus === 'error' && saveError && (
                <p
                  style={{
                    fontFamily: "'Mukta', sans-serif",
                    fontSize: '12px',
                    color: '#C41E3A',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  ⚠ {saveError}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
