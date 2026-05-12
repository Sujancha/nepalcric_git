'use client';

import { useState, useEffect, useCallback } from 'react';
import { inputStyle, labelStyle, sectionStyle, saveBtnStyle } from '../adminStyles';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface Match {
  opponent: string;
  date: string;
  result: string;
}

interface Archive {
  id: string;
  seriesName: string;
  year: string;
  outcome: string;
  matches: Match[];
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

const FILE_PATH = 'content/scoreboard.json';

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

function newArchive(): Archive {
  return {
    id: `tournament-${Date.now()}`,
    seriesName: '',
    year: '',
    outcome: '',
    matches: [],
  };
}

function newMatch(): Match {
  return { opponent: '', date: '', result: '' };
}

export default function AdminScoreboardPage() {
  const [archives, setArchives] = useState<Archive[]>([]);
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
      const parsed = JSON.parse(data.content) as { archives: Archive[] };
      setArchives(parsed.archives ?? []);
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
      const jsonContent = JSON.stringify({ archives }, null, 2);
      const res = await fetch('/api/admin/github', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: FILE_PATH,
          content: jsonContent,
          sha,
          message: 'admin: update scoreboard archives',
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

  function addTournament() {
    const entry = newArchive();
    setArchives([entry, ...archives]);
    setExpandedId(entry.id);
  }

  function removeTournament(id: string) {
    setArchives(archives.filter((a) => a.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  function updateArchive(id: string, field: keyof Omit<Archive, 'matches' | 'id'>, value: string) {
    setArchives(archives.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  }

  function addMatch(archiveId: string) {
    setArchives(
      archives.map((a) =>
        a.id === archiveId ? { ...a, matches: [...a.matches, newMatch()] } : a
      )
    );
  }

  function removeMatch(archiveId: string, matchIdx: number) {
    setArchives(
      archives.map((a) =>
        a.id === archiveId
          ? { ...a, matches: a.matches.filter((_, i) => i !== matchIdx) }
          : a
      )
    );
  }

  function updateMatch(archiveId: string, matchIdx: number, field: keyof Match, value: string) {
    setArchives(
      archives.map((a) =>
        a.id === archiveId
          ? {
              ...a,
              matches: a.matches.map((m, i) => (i === matchIdx ? { ...m, [field]: value } : m)),
            }
          : a
      )
    );
  }

  const canSave = !loading && !!sha && saveStatus !== 'saving';

  return (
    <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative">

      {/* Global Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 90%, rgba(196,30,58,0.08), transparent 55%),
              radial-gradient(circle at 85% 10%, rgba(0,56,147,0.08), transparent 50%)
            `,
          }}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[120px] opacity-[0.06] select-none">
          <svg width="600" height="900" viewBox="0 0 200 250" fill="#C41E3A" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 20 L160 110 L80 110 L180 230 L40 230 Z" />
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[45vh] w-full overflow-hidden flex flex-col justify-end pb-12 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[120px] after:bg-gradient-to-t after:from-[#07080F] after:to-transparent after:z-10">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            filter: "grayscale(100%)",
            opacity: 0.2,
          }}
        />
        <div className="relative z-20 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-start animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
          <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "13px", color: "#C9A84C", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "12px" }}>
            विगतका युद्धहरू
          </span>
          <h1 className="text-white text-[clamp(64px,10vw,140px)] leading-[0.85] tracking-tight" style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }}>
            स्कोरबोर्ड
          </h1>
        </div>
      </section>

      {/* Campaign Grid */}
      <section className="relative z-20 px-6 lg:px-12 w-full max-w-[1400px] mx-auto mt-8">
        {loading ? (
          <div style={{ padding: '4rem 0', textAlign: 'center', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280' }}>
            लोड हुँदैछ...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {archives.map((series, idx) => (
              <div
                key={series.id}
                className="group relative flex flex-col p-8 md:p-10 overflow-hidden cursor-default transition-all duration-500 ease-out animate-[dynamicSlideFade_0.6s_cubic-bezier(0.76,0,0.24,1)_both] hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(196,30,58,0.1)]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderTop: series.outcome.includes("जित") || series.outcome.includes("विजयी") || series.outcome.includes("च्याम्पियन")
                    ? "3px solid rgba(201,168,76,0.7)"
                    : "3px solid rgba(196,30,58,0.6)",
                  animationDelay: `${idx * 0.15}s`,
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent transition-colors duration-500 group-hover:bg-[#C41E3A]" />
                <div
                  className="absolute -bottom-6 -right-4 pointer-events-none select-none"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(120px, 15vw, 180px)",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.03)",
                    zIndex: 0,
                  }}
                >
                  {series.year}
                </div>

                <div className="relative z-10 w-full">
                  <div className="mb-2">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      {series.seriesName}
                    </span>
                  </div>
                  <h2 className="mb-8" style={{ fontFamily: "Mukta, sans-serif", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>
                    {series.outcome}
                  </h2>

                  <div className="flex flex-col w-full">
                    {series.matches.map((match, matchIdx) => (
                      <div
                        key={matchIdx}
                        className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-[rgba(255,255,255,0.06)] last:border-0 group-hover:border-[rgba(255,255,255,0.1)] transition-colors duration-300"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 md:mb-0">
                          <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.15em", minWidth: "80px" }}>
                            {match.date}
                          </span>
                          <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                            विरुद्ध {match.opponent}
                          </span>
                        </div>
                        <div className="text-left md:text-right w-full md:w-auto mt-1 md:mt-0">
                          <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
                            {match.result}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Closing Line */}
      <div style={{ textAlign: "center", padding: "80px 0 60px 0" }}>
        <p style={{ fontFamily: "Mukta, sans-serif", fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.18)", margin: 0 }}>
          हर हार पनि इतिहास हो — हर जित पनि किंवदन्ती।
        </p>
      </div>

      {/* Gold FAB */}
      <button
        onClick={() => setShowPanel(true)}
        title="स्कोरबोर्ड सम्पादन"
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
              <div>
                <h2 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.4rem', letterSpacing: '0.08em', color: '#C9A84C', margin: 0, lineHeight: 1 }}>
                  स्कोरबोर्ड व्यवस्थापन
                </h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={addTournament}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(201,168,76,0.4)',
                    color: '#C9A84C',
                    padding: '0.4rem 0.8rem',
                    fontFamily: 'var(--font-barlow), sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: 2,
                  }}
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
                archives.map((archive) => {
                  const isOpen = expandedId === archive.id;
                  return (
                    <div
                      key={archive.id}
                      style={{ marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', borderRadius: 2 }}
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', cursor: 'pointer', userSelect: 'none' }}
                        onClick={() => setExpandedId(isOpen ? null : archive.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', color: '#6B7280', width: '12px', flexShrink: 0 }}>
                            {isOpen ? '▼' : '▶'}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#E8E8E8' }}>
                            {archive.seriesName || '(नाम छैन)'}
                          </span>
                          {archive.year && (
                            <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.65rem', color: '#C9A84C', letterSpacing: '0.1em' }}>
                              {archive.year}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeTournament(archive.id); }}
                          style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.2rem 0.4rem' }}
                        >
                          ×
                        </button>
                      </div>

                      {isOpen && (
                        <div style={{ padding: '0 1rem 1.25rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ ...sectionStyle, marginTop: '1rem' }}>
                            <label style={labelStyle}>Tournament Name</label>
                            <input type="text" value={archive.seriesName} onChange={(e) => updateArchive(archive.id, 'seriesName', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                          </div>
                          <div style={sectionStyle}>
                            <label style={labelStyle}>Year</label>
                            <input type="text" value={archive.year} onChange={(e) => updateArchive(archive.id, 'year', e.target.value)} style={{ ...inputStyle, maxWidth: '120px' }} onFocus={focusGold} onBlur={blurDim} />
                          </div>
                          <div style={sectionStyle}>
                            <label style={labelStyle}>Outcome</label>
                            <input type="text" value={archive.outcome} onChange={(e) => updateArchive(archive.id, 'outcome', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                          </div>
                          <div style={sectionStyle}>
                            <label style={labelStyle}>Matches</label>
                            {archive.matches.length > 0 && (
                              <div style={{ marginBottom: '0.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 24px', gap: '0.4rem', marginBottom: '0.25rem' }}>
                                  {['प्रतिद्वन्द्वी', 'मिति', 'नतिजा', ''].map((h, i) => (
                                    <span key={i} style={{ ...labelStyle, marginBottom: 0, fontSize: '0.5rem' }}>{h}</span>
                                  ))}
                                </div>
                                {archive.matches.map((match, mIdx) => (
                                  <div key={mIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 24px', gap: '0.4rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                                    <input type="text" value={match.opponent} onChange={(e) => updateMatch(archive.id, mIdx, 'opponent', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                                    <input type="text" value={match.date} onChange={(e) => updateMatch(archive.id, mIdx, 'date', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                                    <input type="text" value={match.result} onChange={(e) => updateMatch(archive.id, mIdx, 'result', e.target.value)} style={inputStyle} onFocus={focusGold} onBlur={blurDim} />
                                    <button onClick={() => removeMatch(archive.id, mIdx)} style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '14px', padding: 0, lineHeight: 1 }}>×</button>
                                  </div>
                                ))}
                              </div>
                            )}
                            <button
                              onClick={() => addMatch(archive.id)}
                              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#6B7280', padding: '0.3rem 0.6rem', fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}
                            >
                              + म्याच थप्नुस्
                            </button>
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
