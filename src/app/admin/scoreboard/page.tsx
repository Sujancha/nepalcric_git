'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { inputStyle, labelStyle, sectionStyle, saveBtnStyle, cancelBtnStyle } from '../adminStyles';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface ScoreboardData {
  isLive: boolean;
  matchTitle: string;
  matchStatus: string;
  pulseText: string;
}

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

export default function ScoreboardAdminPage() {
  const [data, setData] = useState<ScoreboardData | null>(null);
  const [sha, setSha] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch(`/api/admin/parse-scoreboard`);
      const resData = await res.json();
      if (!res.ok) {
        setLoadError(resData.error ?? `फाइल लोड गर्न सकिएन (${res.status})`);
        return;
      }
      setData(resData.data);
      setSha(resData.sha);
    } catch {
      setLoadError('नेटवर्क त्रुटि: फाइल लोड हुन सकेन।');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSave() {
    if (!sha || !data) return;
    setSaveStatus('saving');
    setSaveError('');
    try {
      const res = await fetch('/api/admin/parse-scoreboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, sha }),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        setSaveStatus('saved');
        await fetchData();
        setTimeout(() => setSaveStatus('idle'), 5000);
      } else {
        setSaveStatus('error');
        setSaveError(resData.error ?? `सेभ हुन सकेन (${res.status})`);
      }
    } catch {
      setSaveStatus('error');
      setSaveError('नेटवर्क त्रुटि: सेभ हुन सकेन।');
    }
  }

  const updateField = (field: keyof ScoreboardData, val: string | boolean) => {
    if (!data) return;
    setData({ ...data, [field]: val });
  };

  const canSave = !loading && !!sha && saveStatus !== 'saving' && data !== null;

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
              स्कोरबोर्ड (Live) सेटिङ्स
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
              content/pages/scoreboard.json
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

        {loading || !data ? (
          <div style={{ padding: '4rem 0', textAlign: 'center', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280' }}>
            लोड हुँदैछ...
          </div>
        ) : (
          <>
            {/* IS LIVE TOGGLE */}
            <div style={{ ...sectionStyle, display: 'flex', alignItems: 'center', gap: '1rem', background: data.isLive ? 'rgba(196,30,58,0.1)' : 'rgba(255,255,255,0.02)', padding: '1rem', border: data.isLive ? '1px solid rgba(196,30,58,0.3)' : '1px solid rgba(255,255,255,0.05)', borderRadius: '4px' }}>
              <input
                type="checkbox"
                id="isLive"
                checked={data.isLive}
                onChange={(e) => updateField('isLive', e.target.checked)}
                style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer', accentColor: '#C41E3A' }}
              />
              <label htmlFor="isLive" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer', color: data.isLive ? '#C41E3A' : '#E8E8E8' }}>
                MATCH IS LIVE (म्याच चलिरहेको छ)
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* MATCH TITLE */}
              <div style={sectionStyle}>
                <label style={labelStyle}>म्याच (Match Title)</label>
                <input
                  type="text"
                  value={data.matchTitle}
                  onChange={(e) => updateField('matchTitle', e.target.value)}
                  placeholder="नेपाल VS UAE"
                  style={inputStyle}
                  onFocus={focusGold}
                  onBlur={blurDim}
                />
              </div>

              {/* MATCH STATUS */}
              <div style={sectionStyle}>
                <label style={labelStyle}>स्थिति (Status / Innings)</label>
                <input
                  type="text"
                  value={data.matchStatus}
                  onChange={(e) => updateField('matchStatus', e.target.value)}
                  placeholder="MATCH IN PROGRESS"
                  style={inputStyle}
                  onFocus={focusGold}
                  onBlur={blurDim}
                />
              </div>
            </div>

            {/* PULSE TEXT */}
            <div style={sectionStyle}>
              <label style={labelStyle}>म्याचको नब्ज (Match Pulse Text)</label>
              <textarea
                value={data.pulseText}
                onChange={(e) => updateField('pulseText', e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={focusGold}
                onBlur={blurDim}
              />
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
              <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
                <button style={cancelBtnStyle}>← ड्यासबोर्ड</button>
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
