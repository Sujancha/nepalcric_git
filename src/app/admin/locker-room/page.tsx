'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { inputStyle, labelStyle, sectionStyle, saveBtnStyle, cancelBtnStyle } from '../adminStyles';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
type ActiveTab = 'archive' | 'featured';

// ─── ARCHIVE story (locker-room page) ───
interface ArchiveStory {
  id: string;
  title: string;
  date: string;
  era: string;
  description: string;
  thumb: string;
}

// ─── FEATURED story (homepage Storytelling Hub) ───
interface FeaturedStory {
  type: string;
  title: string;
  date: string;
  span: string;
  image: string;
  slug: string;
  isPlayable: boolean;
  videoId: string;
}

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

function newArchiveStory(): ArchiveStory {
  return { id: `story-${Date.now()}`, title: '', date: '', era: '', description: '', thumb: '' };
}

function newFeaturedStory(): FeaturedStory {
  return { type: '', title: '', date: '', span: 'md:col-span-1 md:row-span-1', image: '', slug: '', isPlayable: false, videoId: '' };
}

const SPAN_OPTIONS = [
  { label: '1×1 (Normal)', value: 'md:col-span-1 md:row-span-1' },
  { label: '2×1 (Wide)', value: 'md:col-span-2 md:row-span-1' },
  { label: '2×2 (Hero)', value: 'md:col-span-2 md:row-span-2' },
];

export default function AdminLockerRoomPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('archive');

  // ── Archive state ──
  const [archiveStories, setArchiveStories] = useState<ArchiveStory[]>([]);
  const [archiveSha, setArchiveSha] = useState('');
  const [archiveExpanded, setArchiveExpanded] = useState<string | null>(null);

  // ── Featured state ──
  const [featuredStories, setFeaturedStories] = useState<FeaturedStory[]>([]);
  const [featuredSha, setFeaturedSha] = useState('');
  const [featuredExpanded, setFeaturedExpanded] = useState<number | null>(null);

  // ── Shared state ──
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch('/api/admin/parse-locker-room');
      const data = await res.json();
      if (!res.ok) { setLoadError(data.error ?? `फाइल लोड गर्न सकिएन (${res.status})`); return; }
      setArchiveStories(data.archive?.stories ?? []);
      setArchiveSha(data.archiveSha ?? '');
      setFeaturedStories(data.featured?.stories ?? []);
      setFeaturedSha(data.featuredSha ?? '');
    } catch { setLoadError('नेटवर्क त्रुटि: फाइल लोड हुन सकेन।'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleSave(target: 'archive' | 'featured') {
    const sha = target === 'archive' ? archiveSha : featuredSha;
    if (!sha) return;
    setSaveStatus('saving');
    setSaveError('');
    try {
      const data = target === 'archive' ? { stories: archiveStories } : { stories: featuredStories };
      const res = await fetch('/api/admin/parse-locker-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, data, sha }),
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

  const canSave = !loading && saveStatus !== 'saving';

  // ── Tab: ARCHIVE ──
  const ArchiveTab = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          /locker-room पृष्ठमा देखिने ऐतिहासिक कथाहरू
        </p>
        <button
          onClick={() => { const s = newArchiveStory(); setArchiveStories([s, ...archiveStories]); setArchiveExpanded(s.id); }}
          style={{ background: 'transparent', border: '1px solid rgba(196,30,58,0.5)', color: '#C41E3A', padding: '0.4rem 1rem', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}
        >+ नयाँ कथा</button>
      </div>

      {archiveStories.map((story) => {
        const isOpen = archiveExpanded === story.id;
        return (
          <div key={story.id} style={{ marginBottom: '0.6rem', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', cursor: 'pointer', userSelect: 'none' }}
              onClick={() => setArchiveExpanded(isOpen ? null : story.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: '#6B7280', fontSize: '0.65rem', width: '10px' }}>{isOpen ? '▼' : '▶'}</span>
                <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#E8E8E8' }}>{story.title || '(शीर्षक छैन)'}</span>
                {story.era && <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{story.era}</span>}
              </div>
              <button onClick={(e) => { e.stopPropagation(); setArchiveStories(archiveStories.filter(s => s.id !== story.id)); if (archiveExpanded === story.id) setArchiveExpanded(null); }}
                style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>
            {isOpen && (
              <div style={{ padding: '0.25rem 1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {([['title', 'शीर्षक'], ['era', 'युग'], ['date', 'मिति'], ['thumb', 'Thumbnail URL']] as [keyof ArchiveStory, string][]).map(([field, lbl]) => (
                  <div key={field} style={sectionStyle}>
                    <label style={labelStyle}>{lbl}</label>
                    <input type="text" value={story[field] as string} onChange={e => setArchiveStories(archiveStories.map(s => s.id === story.id ? { ...s, [field]: e.target.value } : s))}
                      style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                  </div>
                ))}
                <div style={sectionStyle}>
                  <label style={labelStyle}>विवरण</label>
                  <textarea value={story.description} onChange={e => setArchiveStories(archiveStories.map(s => s.id === story.id ? { ...s, description: e.target.value } : s))}
                    rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} onFocus={focusGold} onBlur={blurDim} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => handleSave('archive')} disabled={!canSave}
          style={{ ...saveBtnStyle, background: canSave ? '#C41E3A' : '#6B7280', cursor: canSave ? 'pointer' : 'not-allowed' }}>
          ✓ अभिलेख सेभ गर्नुस्
        </button>
      </div>
    </>
  );

  // ── Tab: FEATURED ──
  const FeaturedTab = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          Homepage "लकर रुमका कथाहरू" ग्रिडमा देखिने फिचर्ड कथाहरू
        </p>
        <button
          onClick={() => { const s = newFeaturedStory(); setFeaturedStories([...featuredStories, s]); setFeaturedExpanded(featuredStories.length); }}
          style={{ background: 'transparent', border: '1px solid rgba(196,30,58,0.5)', color: '#C41E3A', padding: '0.4rem 1rem', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}
        >+ नयाँ कार्ड</button>
      </div>

      {featuredStories.map((story, idx) => {
        const isOpen = featuredExpanded === idx;
        return (
          <div key={idx} style={{ marginBottom: '0.6rem', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', cursor: 'pointer', userSelect: 'none' }}
              onClick={() => setFeaturedExpanded(isOpen ? null : idx)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: '#6B7280', fontSize: '0.65rem', width: '10px' }}>{isOpen ? '▼' : '▶'}</span>
                <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#E8E8E8' }}>{story.title || '(शीर्षक छैन)'}</span>
                {story.type && <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{story.type}</span>}
                {story.isPlayable && <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.55rem', color: '#4ade80', letterSpacing: '0.1em', textTransform: 'uppercase' }}>▶ VIDEO</span>}
              </div>
              <button onClick={(e) => { e.stopPropagation(); setFeaturedStories(featuredStories.filter((_, i) => i !== idx)); if (featuredExpanded === idx) setFeaturedExpanded(null); }}
                style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>
            {isOpen && (
              <div style={{ padding: '0.25rem 1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                  {([['type', 'वर्ग (Tag)'], ['title', 'शीर्षक'], ['date', 'मिति'], ['slug', 'Slug (for link)']] as [keyof FeaturedStory, string][]).map(([field, lbl]) => (
                    <div key={field} style={{ ...sectionStyle, gridColumn: field === 'title' ? '1 / -1' : 'auto' }}>
                      <label style={labelStyle}>{lbl}</label>
                      <input type="text" value={story[field] as string} onChange={e => setFeaturedStories(featuredStories.map((s, i) => i === idx ? { ...s, [field]: e.target.value } : s))}
                        style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                    </div>
                  ))}
                </div>
                <div style={sectionStyle}>
                  <label style={labelStyle}>Image URL</label>
                  <input type="text" value={story.image} onChange={e => setFeaturedStories(featuredStories.map((s, i) => i === idx ? { ...s, image: e.target.value } : s))}
                    style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                  <div style={sectionStyle}>
                    <label style={labelStyle}>Grid Size (Span)</label>
                    <select value={story.span} onChange={e => setFeaturedStories(featuredStories.map((s, i) => i === idx ? { ...s, span: e.target.value } : s))}
                      style={{ ...inputStyle, cursor: 'pointer' }} onFocus={focusGold} onBlur={blurDim}>
                      {SPAN_OPTIONS.map(o => <option key={o.value} value={o.value} style={{ background: '#07080F' }}>{o.label}</option>)}
                    </select>
                  </div>
                  <div style={sectionStyle}>
                    <label style={labelStyle}>Video ID (if playable)</label>
                    <input type="text" value={story.videoId} onChange={e => setFeaturedStories(featuredStories.map((s, i) => i === idx ? { ...s, videoId: e.target.value } : s))}
                      style={inputStyle} onFocus={focusGold} onBlur={blurDim} placeholder="e.g. dQw4w9WgXcQ" />
                  </div>
                </div>
                <div style={sectionStyle}>
                  <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={story.isPlayable} onChange={e => setFeaturedStories(featuredStories.map((s, i) => i === idx ? { ...s, isPlayable: e.target.checked } : s))}
                      style={{ width: '1.1rem', height: '1.1rem', accentColor: '#C41E3A', cursor: 'pointer' }} />
                    <span>Video प्लेयर देखाउनुस् (isPlayable)</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => handleSave('featured')} disabled={!canSave}
          style={{ ...saveBtnStyle, background: canSave ? '#C41E3A' : '#6B7280', cursor: canSave ? 'pointer' : 'not-allowed' }}>
          ✓ Homepage ग्रिड सेभ गर्नुस्
        </button>
      </div>
    </>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#07080F', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.75rem', letterSpacing: '0.08em', color: '#E8E8E8', margin: 0, lineHeight: 1 }}>
              लकर रुम
            </h1>
            <p style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: '0.6rem', color: '#6B7280', marginTop: '0.35rem', margin: '0.35rem 0 0 0' }}>
              content/locker-room.json · content/pages/locker-room.json
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
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2rem', gap: '0' }}>
          {([['archive', 'इतिहासको अभिलेख', '/locker-room'], ['featured', 'Homepage ग्रिड', 'Storytelling Hub']] as [ActiveTab, string, string][]).map(([tab, label, sub]) => (
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
          activeTab === 'archive' ? <ArchiveTab /> : <FeaturedTab />
        )}

        {/* Back link */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/admin/dashboard" style={{ textDecoration: 'none' }}>
            <button style={cancelBtnStyle}>← ड्यासबोर्ड</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
