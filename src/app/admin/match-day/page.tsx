'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { inputStyle, labelStyle, sectionStyle, saveBtnStyle, cancelBtnStyle } from '../adminStyles';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface Fixture {
  id: string;
  date: string;
  time: string;
  nepaliName: string;
  venue: string;
  format: string;
  threat: number;
  threatLevel: string;
  threatColor: string;
  weapon: string;
  danger: string;
  h2h: string;
}

interface MatchDayData {
  targetDate: string;
  fixtures: Fixture[];
}

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

export default function MatchDayAdminPage() {
  const [data, setData] = useState<MatchDayData | null>(null);
  const [sha, setSha] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch(`/api/admin/parse-match-day`);
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
      const res = await fetch('/api/admin/parse-match-day', {
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

  const updateTargetDate = (val: string) => {
    if (!data) return;
    setData({ ...data, targetDate: val });
  };

  const updateFixture = (idx: number, field: keyof Fixture, val: string | number) => {
    if (!data) return;
    const newFixtures = [...data.fixtures];
    newFixtures[idx] = { ...newFixtures[idx], [field]: val };
    setData({ ...data, fixtures: newFixtures });
  };

  const addFixture = () => {
    if (!data) return;
    const newId = String(data.fixtures.length + 1).padStart(2, '0');
    setData({
      ...data,
      fixtures: [
        ...data.fixtures,
        {
          id: newId,
          date: '',
          time: '',
          nepaliName: '',
          venue: '',
          format: 'ओडीआई',
          threat: 50,
          threatLevel: 'MEDIUM',
          threatColor: '#C9A84C',
          weapon: '',
          danger: '',
          h2h: ''
        }
      ]
    });
  };

  const removeFixture = (idx: number) => {
    if (!data) return;
    const newFixtures = data.fixtures.filter((_, i) => i !== idx);
    setData({ ...data, fixtures: newFixtures });
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
              म्याच डे सेटिङ्स
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
              content/pages/match-day.json
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
            {/* Countdown Target Date */}
            <div style={sectionStyle}>
              <label style={labelStyle}>काउन्टडाउन टाइमर (Target Date - ISO Format)</label>
              <input
                type="text"
                value={data.targetDate}
                onChange={(e) => updateTargetDate(e.target.value)}
                placeholder="2026-03-15T10:00:00+05:45"
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurDim}
              />
              <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>Format: YYYY-MM-DDTHH:MM:SS+05:45 (Nepal Time)</p>
            </div>

            <h3 style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '1rem', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
              फिक्स्चरहरू (Fixtures)
            </h3>

            {/* Fixtures List */}
            {data.fixtures.map((fixture, idx) => (
              <div key={idx} style={{ ...sectionStyle, padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', color: '#6B7280', letterSpacing: '0.2em' }}>MISSION #{fixture.id}</span>
                  <button onClick={() => removeFixture(idx)} style={{ background: 'transparent', border: 'none', color: '#C41E3A', cursor: 'pointer', fontSize: '12px' }}>हटाउनुस्</button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>विपक्षी (Nepali Name)</label>
                    <input type="text" value={fixture.nepaliName} onChange={(e) => updateFixture(idx, 'nepaliName', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                  <div>
                    <label style={labelStyle}>मिति (Date)</label>
                    <input type="text" value={fixture.date} onChange={(e) => updateFixture(idx, 'date', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>समय (Time)</label>
                    <input type="text" value={fixture.time} onChange={(e) => updateFixture(idx, 'time', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                  <div>
                    <label style={labelStyle}>स्थान (Venue)</label>
                    <input type="text" value={fixture.venue} onChange={(e) => updateFixture(idx, 'venue', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                  <div>
                    <label style={labelStyle}>फरम्याट (Format)</label>
                    <input type="text" value={fixture.format} onChange={(e) => updateFixture(idx, 'format', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>खतरा मिटर (Threat %)</label>
                    <input type="number" value={fixture.threat} onChange={(e) => updateFixture(idx, 'threat', parseInt(e.target.value))} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                  <div>
                    <label style={labelStyle}>खतरा स्तर (Level)</label>
                    <input type="text" value={fixture.threatLevel} onChange={(e) => updateFixture(idx, 'threatLevel', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                  <div>
                    <label style={labelStyle}>खतरा रङ (Color)</label>
                    <input type="text" value={fixture.threatColor} onChange={(e) => updateFixture(idx, 'threatColor', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>हाम्रो हतियार (Our Weapon)</label>
                    <input type="text" value={fixture.weapon} onChange={(e) => updateFixture(idx, 'weapon', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                  <div>
                    <label style={labelStyle}>खतरनाक खेलाडी (Danger)</label>
                    <input type="text" value={fixture.danger} onChange={(e) => updateFixture(idx, 'danger', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>हेड-टु-हेड (Head to Head)</label>
                  <input type="text" value={fixture.h2h} onChange={(e) => updateFixture(idx, 'h2h', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                </div>
              </div>
            ))}

            <button
              onClick={addFixture}
              style={{
                background: 'transparent',
                border: '1px dashed rgba(255,255,255,0.2)',
                color: '#C9A84C',
                padding: '1rem',
                width: '100%',
                fontFamily: 'var(--font-barlow), sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginBottom: '2rem'
              }}
            >
              + नयाँ फिक्स्चर थप्नुस्
            </button>

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
