'use client';

import { useState, useEffect, useCallback } from 'react';
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

export default function AdminLockerRoomPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [sha, setSha] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');
  const [showPanel, setShowPanel] = useState(false);

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
    <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative font-sans">

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden flex flex-col justify-end">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            filter: "brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/40 to-transparent" />

        <div className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto pb-16 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
          <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px", display: "block" }}>
            विशेष वृत्तचित्र
          </span>
          <h1 className="text-white text-[clamp(48px,8vw,90px)] leading-[0.9] mb-8" style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }}>
            नेपाली क्रिकेटको इतिहास
          </h1>
          <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 hover:border-[#C41E3A] hover:bg-[#C41E3A]/20 transition-all duration-300 group">
            <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", fontWeight: 700, color: "white" }}>
              पढ्नुस्
            </span>
          </button>
        </div>
      </section>

      {/* Archive Stories */}
      <section className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto mt-12">
        <div className="flex items-center mb-8">
          <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", textTransform: "uppercase", marginRight: "16px", letterSpacing: "0.25em" }}>
            इतिहासको अभिलेख
          </span>
          <div className="flex-grow border-t border-[#C9A84C] opacity-40" />
        </div>

        {loading ? (
          <div style={{ padding: '4rem 0', textAlign: 'center', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280' }}>
            लोड हुँदैछ...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {stories.map((story, idx) => {
              let overlayBg: string | undefined;
              if (idx === 0) overlayBg = "linear-gradient(135deg, rgba(196,30,58,0.35), rgba(0,0,0,0.6))";
              else if (idx === 2) overlayBg = "linear-gradient(135deg, rgba(0,56,147,0.35), rgba(0,0,0,0.6))";
              else if (idx === 3) overlayBg = "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(0,0,0,0.65))";
              else if (idx === 5) overlayBg = "linear-gradient(135deg, rgba(196,30,58,0.2), rgba(0,56,147,0.2))";

              return (
                <div key={story.id} className="flex flex-col group cursor-pointer animate-[dynamicSlideFade_0.6s_cubic-bezier(0.76,0,0.24,1)_both]" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="relative aspect-video rounded-sm overflow-hidden bg-[#0a0f16] border border-white/5 mb-4 shadow-lg">
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] grayscale-[80%] brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-[0.9] group-hover:scale-105"
                      style={{ backgroundImage: `url(${story.thumb})` }}
                    />
                    {overlayBg && (
                      <div className="absolute inset-0 pointer-events-none transition-opacity duration-400 group-hover:opacity-0" style={{ background: overlayBg }} />
                    )}
                  </div>
                  <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>
                    {story.era}
                  </span>
                  <h3
                    className="group-hover:text-[#C9A84C] transition-colors duration-300"
                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.3, marginBottom: "6px" }}
                  >
                    {story.title}
                  </h3>
                  <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "10px" }}>
                    {story.date}
                  </span>
                  <p
                    style={{
                      fontFamily: "Mukta, sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.6,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {story.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Closing Line */}
      <div style={{ textAlign: "center", padding: "80px 0 60px 0" }}>
        <p style={{ fontFamily: "Mukta, sans-serif", fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.18)", margin: 0 }}>
          ती क्षणहरू — जो स्कोरबोर्डमा छैनन् तर हृदयमा छन्।
        </p>
      </div>

      {/* Gold FAB */}
      <button
        onClick={() => setShowPanel(true)}
        title="लकर रुम सम्पादन"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#C9A84C',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
          color: '#07080F',
          fontSize: '22px',
          lineHeight: 1,
          transition: 'transform 150ms ease, box-shadow 150ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(201,168,76,0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.4)';
        }}
      >
        ✏
      </button>

      {/* Backdrop + Slide-in edit panel */}
      {showPanel && (
        <>
          <div
            onClick={() => setShowPanel(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999 }}
          />
          <div
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              width: '480px',
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
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.4rem', letterSpacing: '0.08em', color: '#C41E3A', margin: 0, lineHeight: 1 }}>
                इतिहासको अभिलेख
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={addStory}
                  style={{ background: 'transparent', border: '1px solid rgba(196,30,58,0.4)', color: '#C41E3A', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}
                >
                  + नयाँ
                </button>
                <button
                  onClick={() => setShowPanel(false)}
                  style={{ background: 'transparent', border: 'none', color: '#6B7280', fontSize: '20px', cursor: 'pointer', lineHeight: 1, padding: 0 }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Status banners */}
            <div style={{ padding: '0 20px', flexShrink: 0 }}>
              {saveStatus === 'saved' && (
                <div style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', padding: '0.6rem 0.75rem', marginTop: '0.75rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.8rem', color: '#4ade80' }}>
                  ✓ सेभ भयो — Vercel मा प्रकाशित हुँदैछ (~१ मिनेट)
                </div>
              )}
              {loadError && (
                <div style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.3)', padding: '0.6rem 0.75rem', marginTop: '0.75rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.8rem', color: '#C41E3A' }}>
                  ⚠ {loadError}
                </div>
              )}
              {saveStatus === 'error' && saveError && (
                <div style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.3)', padding: '0.6rem 0.75rem', marginTop: '0.75rem', fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.8rem', color: '#C41E3A' }}>
                  ⚠ {saveError}
                </div>
              )}
            </div>

            {/* Panel body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {loading ? (
                <div style={{ padding: '3rem 0', textAlign: 'center', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280' }}>
                  लोड हुँदैछ...
                </div>
              ) : (
                stories.map((story) => {
                  const isOpen = expandedId === story.id;
                  return (
                    <div key={story.id} style={{ marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
                      <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', cursor: 'pointer', userSelect: 'none' }}
                        onClick={() => setExpandedId(isOpen ? null : story.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', color: '#6B7280', width: '12px', flexShrink: 0 }}>
                            {isOpen ? '▼' : '▶'}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#E8E8E8' }}>
                            {story.title || '(शीर्षक छैन)'}
                          </span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeStory(story.id); }}
                          style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.2rem 0.4rem' }}
                        >
                          ×
                        </button>
                      </div>

                      {isOpen && (
                        <div style={{ padding: '0 1rem 1.25rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ ...sectionStyle, marginTop: '1rem' }}>
                            <label style={labelStyle}>शीर्षक</label>
                            <input type="text" value={story.title} onChange={(e) => updateStory(story.id, 'title', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                          </div>
                          <div style={sectionStyle}>
                            <label style={labelStyle}>मिति</label>
                            <input type="text" value={story.date} onChange={(e) => updateStory(story.id, 'date', e.target.value)} style={{ ...inputStyle, maxWidth: '220px' }} onFocus={focusGold} onBlur={blurDim} />
                          </div>
                          <div style={sectionStyle}>
                            <label style={labelStyle}>युग</label>
                            <input type="text" value={story.era} onChange={(e) => updateStory(story.id, 'era', e.target.value)} style={{ ...inputStyle, maxWidth: '280px' }} onFocus={focusGold} onBlur={blurDim} />
                          </div>
                          <div style={sectionStyle}>
                            <label style={labelStyle}>विवरण</label>
                            <textarea value={story.description} onChange={(e) => updateStory(story.id, 'description', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} onFocus={focusGold} onBlur={blurDim} />
                          </div>
                          <div style={sectionStyle}>
                            <label style={labelStyle}>Thumbnail URL</label>
                            <input type="text" value={story.thumb} onChange={(e) => updateStory(story.id, 'thumb', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Panel footer */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
              <button
                onClick={handleSave}
                disabled={!canSave}
                style={{ ...saveBtnStyle, width: '100%', background: canSave ? '#C41E3A' : '#6B7280', cursor: canSave ? 'pointer' : 'not-allowed' }}
              >
                {saveStatus === 'saving' ? 'सेभ हुँदैछ...' : 'सबै परिवर्तन सेभ गर्नुस् →'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
