'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { inputStyle, labelStyle, sectionStyle, saveBtnStyle, cancelBtnStyle } from '../adminStyles';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
type ActiveTab = 'fans' | 'chants';

interface Fan {
  name: string;
  city: string;
  memory: string;
  chant: string;
  fullStory?: string;
}

interface Chant {
  nepali: string;
  tivrata: string;
}

interface FanZoneData {
  fans: Fan[];
  chants: Chant[];
}

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

function newFan(): Fan {
  return { name: '', city: '', memory: '', chant: '', fullStory: '' };
}

function newChant(): Chant {
  return { nepali: '', tivrata: 'उच्च' };
}

export default function AdminFanZonePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('fans');
  const [data, setData] = useState<FanZoneData | null>(null);
  const [sha, setSha] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');
  const [fanExpanded, setFanExpanded] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch('/api/admin/parse-fanzone');
      const resData = await res.json();
      if (!res.ok) { setLoadError(resData.error ?? `फाइल लोड गर्न सकिएन (${res.status})`); return; }
      setData(resData.data);
      setSha(resData.sha);
    } catch { setLoadError('नेटवर्क त्रुटि: फाइल लोड हुन सकेन।'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleSave() {
    if (!sha || !data) return;
    setSaveStatus('saving');
    setSaveError('');
    try {
      const res = await fetch('/api/admin/parse-fanzone', {
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
    } catch { setSaveStatus('error'); setSaveError('नेटवर्क त्रुटि: सेभ हुन सकेन।'); }
  }

  const canSave = !loading && !!sha && !!data && saveStatus !== 'saving';

  const updateFan = (idx: number, field: keyof Fan, val: string) => {
    if (!data) return;
    const fans = data.fans.map((f, i) => i === idx ? { ...f, [field]: val } : f);
    setData({ ...data, fans });
  };

  const updateChant = (idx: number, field: keyof Chant, val: string) => {
    if (!data) return;
    const chants = data.chants.map((c, i) => i === idx ? { ...c, [field]: val } : c);
    setData({ ...data, chants });
  };

  // ── Tab: FANS (Repurposed to Historic Milestones) ──
  const FansTab = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          "ऐतिहासिक क्षणहरू" ग्यालरीमा देखिने गौरवशाली माइलस्टोनहरू
        </p>
        <button
          onClick={() => { if (!data) return; setData({ ...data, fans: [...data.fans, newFan()] }); setFanExpanded(data.fans.length); }}
          style={{ background: 'transparent', border: '1px solid rgba(196,30,58,0.5)', color: '#C41E3A', padding: '0.4rem 1rem', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}
        >+ नयाँ क्षण थप्नुस्</button>
      </div>

      {data?.fans.map((fan, idx) => {
        const isOpen = fanExpanded === idx;
        return (
          <div key={idx} style={{ marginBottom: '0.6rem', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', cursor: 'pointer', userSelect: 'none' }}
              onClick={() => setFanExpanded(isOpen ? null : idx)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: '#6B7280', fontSize: '0.65rem', width: '10px' }}>{isOpen ? '▼' : '▶'}</span>
                <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#E8E8E8' }}>{fan.name || '(शीर्षक छैन)'}</span>
                {fan.city && <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{fan.city}</span>}
              </div>
              <button onClick={(e) => { e.stopPropagation(); if (!data) return; setData({ ...data, fans: data.fans.filter((_, i) => i !== idx) }); if (fanExpanded === idx) setFanExpanded(null); }}
                style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>
            {isOpen && (
              <div style={{ padding: '0.25rem 1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={sectionStyle}>
                    <label style={labelStyle}>ऐतिहासिक क्षणको शीर्षक</label>
                    <input type="text" value={fan.name} onChange={e => updateFan(idx, 'name', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} placeholder="उदा: २०१४ टी-२० विश्वकप पदार्पण" />
                  </div>
                  <div style={sectionStyle}>
                    <label style={labelStyle}>स्थान र वर्ष / मिति</label>
                    <input type="text" value={fan.city} onChange={e => updateFan(idx, 'city', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} placeholder="उदा: चटगाउँ, बंगलादेश" />
                  </div>
                </div>
                <div style={sectionStyle}>
                  <label style={labelStyle}>विस्तृत विवरण (Description)</label>
                  <textarea value={fan.memory} onChange={e => updateFan(idx, 'memory', e.target.value)}
                    rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} onFocus={focusGold} onBlur={blurDim} placeholder="ऐतिहासिक क्षणको विस्तृत जानकारी लेख्नुहोस्..." />
                </div>
                <div style={sectionStyle}>
                  <label style={labelStyle}>पूर्ण ऐतिहासिक कथा (Full Narrative/Story)</label>
                  <textarea value={fan.fullStory ?? ''} onChange={e => updateFan(idx, 'fullStory', e.target.value)}
                    rows={6} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} onFocus={focusGold} onBlur={blurDim} placeholder="ऐतिहासिक क्षणको पूर्ण कथा/रोमाञ्चक विवरण यहाँ लेख्नुहोस्..." />
                </div>
                <div style={sectionStyle}>
                  <label style={labelStyle}>उपाधि / वर्ग ट्याग</label>
                  <input type="text" value={fan.chant} onChange={e => updateFan(idx, 'chant', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} placeholder="उदा: विश्वकप इतिहास" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  // ── Tab: CHANTS ──
  const ChantsTab = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          "मैदानको आवाज" section मा देखिने नारा तालिका
        </p>
        <button
          onClick={() => { if (!data) return; setData({ ...data, chants: [...data.chants, newChant()] }); }}
          style={{ background: 'transparent', border: '1px solid rgba(196,30,58,0.5)', color: '#C41E3A', padding: '0.4rem 1rem', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}
        >+ नयाँ नारा</button>
      </div>

      {data?.chants.map((chant, idx) => (
        <div key={idx} style={{ marginBottom: '0.5rem', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 1rem', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
          <input type="text" value={chant.nepali} onChange={e => updateChant(idx, 'nepali', e.target.value)}
            style={{ ...inputStyle, margin: 0, padding: '0.5rem 0', fontSize: '1rem' }} onFocus={focusGold} onBlur={blurDim} placeholder="नारा लेख्नुस्..." />
          <select value={chant.tivrata} onChange={e => updateChant(idx, 'tivrata', e.target.value)}
            style={{ ...inputStyle, margin: 0, padding: '0.5rem 0.25rem', width: '100px', cursor: 'pointer' }} onFocus={focusGold} onBlur={blurDim}>
            <option value="उच्चतम" style={{ background: '#07080F' }}>उच्चतम</option>
            <option value="उच्च" style={{ background: '#07080F' }}>उच्च</option>
            <option value="मध्यम" style={{ background: '#07080F' }}>मध्यम</option>
          </select>
          <button onClick={() => { if (!data) return; setData({ ...data, chants: data.chants.filter((_, i) => i !== idx) }); }}
            style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>
      ))}
    </>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#07080F', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.75rem', letterSpacing: '0.08em', color: '#E8E8E8', margin: 0, lineHeight: 1 }}>
              फ्यान जोन
            </h1>
            <p style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.6rem', color: '#6B7280', marginTop: '0.35rem', margin: '0.35rem 0 0 0' }}>
              content/pages/fanzone.json
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {saveStatus === 'saving' && <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C' }}>सेभ हुँदैछ...</span>}
            {saveStatus === 'saved' && <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ade80' }}>✓ सेभ भयो</span>}
            {saveStatus === 'error' && <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C41E3A' }}>⚠ त्रुटि</span>}
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

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2rem' }}>
          {([['fans', 'ऐतिहासिक क्षणहरू', 'Historic Moments'], ['chants', 'मैदानको आवाज', 'Chant Board']] as [ActiveTab, string, string][]).map(([tab, label, sub]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                background: 'transparent', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer',
                fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: activeTab === tab ? '#E8E8E8' : 'rgba(255,255,255,0.4)',
                borderBottom: activeTab === tab ? '2px solid #C41E3A' : '2px solid transparent',
                marginBottom: '-1px', transition: 'color 200ms',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px',
              }}>
              {label}
              <span style={{ fontSize: '0.55rem', color: activeTab === tab ? '#C9A84C' : '#6B7280', textTransform: 'none', letterSpacing: '0' }}>{sub}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '4rem 0', textAlign: 'center', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280' }}>
            लोड हुँदैछ...
          </div>
        ) : (
          <>
            {activeTab === 'fans' ? <FansTab /> : <ChantsTab />}

            {/* Save + Back */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
                <button style={cancelBtnStyle}>← ड्यासबोर्ड</button>
              </Link>
              <button onClick={handleSave} disabled={!canSave}
                style={{ ...saveBtnStyle, background: canSave ? '#C41E3A' : '#6B7280', cursor: canSave ? 'pointer' : 'not-allowed' }}>
                ✓ सेभ गर्नुस्
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
