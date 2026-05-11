'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { inputStyle, labelStyle, sectionStyle, saveBtnStyle } from '../adminStyles';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface Story {
  id: string;
  title: string;
  date: string;
  era: string;
  description: string;
  thumb: string;
}

interface GithubFileResponse {
  content: string;
  sha: string;
  error?: string;
}

interface GithubPutResponse {
  success?: boolean;
  error?: string;
}

const FILE_PATH = 'content/locker-room.json';

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

function newStory(): Story {
  return {
    id: `story-${Date.now()}`,
    title: '',
    date: '',
    era: '',
    description: '',
    thumb: '',
  };
}

export default function LockerRoomEditorPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [sha, setSha] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch(`/api/admin/github?path=${encodeURIComponent(FILE_PATH)}`);
      const data = (await res.json()) as GithubFileResponse;
      if (!res.ok) {
        setLoadError(data.error ?? `फाइल लोड गर्न सकिएन (${res.status})`);
        return;
      }
      const parsed = JSON.parse(data.content) as { stories: Story[] };
      setStories(parsed.stories ?? []);
      setSha(data.sha);
    } catch (err) {
      setLoadError(`लोड त्रुटि: ${err instanceof Error ? err.message : 'अज्ञात'}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSave() {
    if (!sha) return;
    setSaveStatus('saving');
    setSaveError('');
    try {
      const jsonContent = JSON.stringify({ stories }, null, 2);
      const res = await fetch('/api/admin/github', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: FILE_PATH,
          content: jsonContent,
          sha,
          message: 'admin: update locker room stories',
        }),
      });
      const data = (await res.json()) as GithubPutResponse;
      if (res.ok && data.success) {
        setSaveStatus('saved');
        await fetchData();
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

  function addStory() {
    const entry = newStory();
    setStories([entry, ...stories]);
    setExpandedId(entry.id);
  }

  function removeStory(id: string) {
    setStories(stories.filter((s) => s.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  function updateStory(id: string, field: keyof Omit<Story, 'id'>, value: string) {
    setStories(stories.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  }

  const canSave = !loading && !!sha && saveStatus !== 'saving';

  return (
    <div style={{ minHeight: '100vh', background: '#07080F', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
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
              href="/admin/dashboard"
              style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}
            >
              ← ड्यासबोर्ड
            </Link>
            <h1 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.75rem', letterSpacing: '0.08em', color: '#C41E3A', margin: 0, lineHeight: 1 }}>
              इतिहासको अभिलेख
            </h1>
          </div>
          <button
            onClick={addStory}
            style={{
              background: 'transparent',
              border: '1px solid rgba(196,30,58,0.4)',
              color: '#C41E3A',
              padding: '0.5rem 1rem',
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            + नयाँ कथा थप्नुस्
          </button>
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
            {stories.map((story) => {
              const isOpen = expandedId === story.id;
              return (
                <div
                  key={story.id}
                  style={{
                    marginBottom: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 2,
                  }}
                >
                  {/* Accordion header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1.25rem',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                    onClick={() => setExpandedId(isOpen ? null : story.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', color: '#6B7280', width: '12px', flexShrink: 0 }}>
                        {isOpen ? '▼' : '▶'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#E8E8E8' }}>
                        {story.title || '(शीर्षक छैन)'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeStory(story.id); }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#6B7280',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-barlow), sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.5rem',
                      }}
                      title="हटाउनुस्"
                    >
                      🗑 हटाउनुस्
                    </button>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div style={{ padding: '0 1.25rem 1.5rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

                      <div style={{ ...sectionStyle, marginTop: '1.25rem' }}>
                        <label style={labelStyle}>शीर्षक</label>
                        <input
                          type="text"
                          value={story.title}
                          onChange={(e) => updateStory(story.id, 'title', e.target.value)}
                          placeholder="ढाकाको त्यो बिहान — नेपालको पहिलो विश्वकप"
                          style={inputStyle}
                          onFocus={focusGold}
                          onBlur={blurDim}
                        />
                      </div>

                      <div style={sectionStyle}>
                        <label style={labelStyle}>मिति</label>
                        <input
                          type="text"
                          value={story.date}
                          onChange={(e) => updateStory(story.id, 'date', e.target.value)}
                          placeholder="मार्च २०१४"
                          style={{ ...inputStyle, maxWidth: '260px' }}
                          onFocus={focusGold}
                          onBlur={blurDim}
                        />
                      </div>

                      <div style={sectionStyle}>
                        <label style={labelStyle}>युग</label>
                        <input
                          type="text"
                          value={story.era}
                          onChange={(e) => updateStory(story.id, 'era', e.target.value)}
                          placeholder="पारस खड्का युग"
                          style={{ ...inputStyle, maxWidth: '320px' }}
                          onFocus={focusGold}
                          onBlur={blurDim}
                        />
                      </div>

                      <div style={sectionStyle}>
                        <label style={labelStyle}>विवरण</label>
                        <textarea
                          value={story.description}
                          onChange={(e) => updateStory(story.id, 'description', e.target.value)}
                          rows={4}
                          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                          onFocus={focusGold}
                          onBlur={blurDim}
                        />
                      </div>

                      <div style={sectionStyle}>
                        <label style={labelStyle}>Thumbnail URL</label>
                        <input
                          type="text"
                          value={story.thumb}
                          onChange={(e) => updateStory(story.id, 'thumb', e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          style={inputStyle}
                          onFocus={focusGold}
                          onBlur={blurDim}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Save button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '0.5rem' }}>
              <button
                onClick={handleSave}
                disabled={!canSave}
                style={{
                  ...saveBtnStyle,
                  background: canSave ? '#C41E3A' : '#6B7280',
                  cursor: canSave ? 'pointer' : 'not-allowed',
                }}
              >
                {saveStatus === 'saving' ? 'सेभ हुँदैछ...' : 'सबै परिवर्तन सेभ गर्नुस् →'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
