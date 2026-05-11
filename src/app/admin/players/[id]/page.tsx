'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { inputStyle, labelStyle, sectionStyle, saveBtnStyle, cancelBtnStyle } from '../../adminStyles';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface ParsedPlayer {
  heroQuote: string;
  excerptNe: string;
  loreNe: string;
  images: string[];
  sha: string;
  rawContent: string;
  error?: string;
}

interface CommitResponse {
  success?: boolean;
  commit?: string;
  error?: string;
  detail?: string;
}

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

export default function PlayerEditorPage() {
  const params = useParams();
  const id = params.id as string;

  const [heroQuote, setHeroQuote] = useState('');
  const [excerptNe, setExcerptNe] = useState('');
  const [loreNe, setLoreNe] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [sha, setSha] = useState('');
  const [playerName, setPlayerName] = useState('');

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');

  const fetchPlayer = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch(`/api/admin/parse-player?id=${encodeURIComponent(id)}`);
      const data = (await res.json()) as ParsedPlayer;
      if (!res.ok) {
        setLoadError(data.error ?? `फाइल लोड गर्न सकिएन (${res.status})`);
        return;
      }
      setHeroQuote(data.heroQuote ?? '');
      setExcerptNe(data.excerptNe ?? '');
      setLoreNe(data.loreNe ?? '');
      setImages(Array.isArray(data.images) ? data.images : []);
      setSha(data.sha);
      // Derive display name from id
      setPlayerName(
        id
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      );
    } catch {
      setLoadError('नेटवर्क त्रुटि: फाइल लोड हुन सकेन।');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlayer();
  }, [fetchPlayer]);

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
      const data = (await res.json()) as CommitResponse;
      if (res.ok && data.success) {
        setSaveStatus('saved');
        await fetchPlayer();
        setTimeout(() => setSaveStatus('idle'), 5000);
      } else {
        setSaveStatus('error');
        setSaveError(data.error ?? `सेभ हुन सकेन (${res.status})`);
      }
    } catch {
      setSaveStatus('error');
      setSaveError('नेटवर्क त्रुटि: सेभ हुन सकेन।');
    }
  }

  function addImage() {
    if (images.length >= 5) return;
    setImages([...images, '']);
  }

  function updateImage(idx: number, val: string) {
    const next = [...images];
    next[idx] = val;
    setImages(next);
  }

  function removeImage(idx: number) {
    setImages(images.filter((_, i) => i !== idx));
  }

  const canSave = !loading && !!sha && saveStatus !== 'saving';

  return (
    <div style={{ minHeight: '100vh', background: '#07080F', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <Link
              href="/admin/players"
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
              ← खेलाडीहरू
            </Link>
            <h1
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: '1.75rem',
                letterSpacing: '0.08em',
                color: '#E8E8E8',
                margin: 0,
                lineHeight: 1,
              }}
            >
              {playerName || id}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: '0.6rem',
                color: '#6B7280',
                marginTop: '0.35rem',
                margin: '0.35rem 0 0 0',
              }}
            >
              content/players/{id}.md
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
                ✓ सेभ भयो
              </span>
            )}
            {saveStatus === 'error' && (
              <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C41E3A' }}>
                ⚠ त्रुटि
              </span>
            )}
          </div>
        </div>

        {/* Status banners */}
        {saveStatus === 'saved' && (
          <div style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: '#4ade80' }}>
            ✓ सेभ भयो — Vercel मा प्रकाशित हुँदैछ (~१ मिनेट)
          </div>
        )}
        {loadError && (
          <div style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.3)', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: '#C41E3A' }}>
            ⚠ {loadError}
          </div>
        )}
        {saveStatus === 'error' && saveError && (
          <div style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.3)', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: '#C41E3A' }}>
            ⚠ {saveError}
          </div>
        )}

        {loading ? (
          <div style={{ padding: '4rem 0', textAlign: 'center', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280' }}>
            लोड हुँदैछ...
          </div>
        ) : (
          <>
            {/* HERO QUOTE */}
            <div style={sectionStyle}>
              <label style={labelStyle}>Hero Quote</label>
              <input
                type="text"
                value={heroQuote}
                onChange={(e) => setHeroQuote(e.target.value)}
                placeholder="हामी यहाँ भाग लिन मात्र आएका होइनौं"
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurDim}
              />
            </div>

            {/* EXCERPT */}
            <div style={sectionStyle}>
              <label style={labelStyle}>संक्षिप्त (Squad grid caption)</label>
              <textarea
                value={excerptNe}
                onChange={(e) => setExcerptNe(e.target.value)}
                rows={3}
                placeholder="नवलपरासीको रातो माटोबाट उदय भएको..."
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={focusGold}
                onBlur={blurDim}
              />
            </div>

            {/* LORE */}
            <div style={sectionStyle}>
              <label style={labelStyle}>पूर्ण कथा (Player Story — Nepali)</label>
              <textarea
                value={loreNe}
                onChange={(e) => setLoreNe(e.target.value)}
                rows={24}
                spellCheck={false}
                style={{
                  ...inputStyle,
                  fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", monospace',
                  fontSize: '0.82rem',
                  lineHeight: 1.7,
                  resize: 'vertical',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  padding: '0.75rem 0',
                }}
                onFocus={focusGold}
                onBlur={blurDim}
              />
            </div>

            {/* IMAGES */}
            <div style={sectionStyle}>
              <label style={labelStyle}>तस्बिरहरू</label>
              {images.map((img, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => updateImage(idx, e.target.value)}
                    placeholder="/images/players/rohit-paudel/1.webp"
                    style={{ ...inputStyle, flex: 1 }}
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
                      fontFamily: 'var(--font-barlow), sans-serif',
                      fontSize: '0.9rem',
                      padding: '0 0.25rem',
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                    title="हटाउनुस्"
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
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#6B7280',
                    padding: '0.4rem 1rem',
                    fontFamily: 'var(--font-barlow), sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    borderRadius: 2,
                  }}
                >
                  + तस्बिर थप्नुस्
                </button>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <Link href="/admin/players" style={{ textDecoration: 'none' }}>
                <button style={cancelBtnStyle}>← छोड्नुस्</button>
              </Link>
              <button
                onClick={handleSave}
                disabled={!canSave}
                style={{
                  ...saveBtnStyle,
                  background: canSave ? '#C41E3A' : '#6B7280',
                  cursor: canSave ? 'pointer' : 'not-allowed',
                }}
              >
                ✓ सेभ गर्नुस्
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
