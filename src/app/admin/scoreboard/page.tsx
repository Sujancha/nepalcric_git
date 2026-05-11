'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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

export default function ScoreboardEditorPage() {
  const [archives, setArchives] = useState<Archive[]>([]);
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
            <h1 style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.75rem', letterSpacing: '0.08em', color: '#C9A84C', margin: 0, lineHeight: 1 }}>
              स्कोरबोर्ड व्यवस्थापन
            </h1>
          </div>
          <button
            onClick={addTournament}
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#C9A84C',
              padding: '0.5rem 1rem',
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            + नयाँ टूर्नामेन्ट थप्नुस्
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
            {archives.map((archive) => {
              const isOpen = expandedId === archive.id;
              return (
                <div
                  key={archive.id}
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
                    onClick={() => setExpandedId(isOpen ? null : archive.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.75rem', color: '#6B7280', width: '12px', flexShrink: 0 }}>
                        {isOpen ? '▼' : '▶'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mukta), sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#E8E8E8' }}>
                        {archive.seriesName || '(नाम छैन)'}
                      </span>
                      {archive.year && (
                        <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontSize: '0.7rem', color: '#C9A84C', letterSpacing: '0.1em' }}>
                          {archive.year}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeTournament(archive.id); }}
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
                        <label style={labelStyle}>Tournament Name (Nepali)</label>
                        <input
                          type="text"
                          value={archive.seriesName}
                          onChange={(e) => updateArchive(archive.id, 'seriesName', e.target.value)}
                          style={inputStyle}
                          onFocus={focusGold}
                          onBlur={blurDim}
                        />
                      </div>

                      <div style={sectionStyle}>
                        <label style={labelStyle}>Year</label>
                        <input
                          type="text"
                          value={archive.year}
                          onChange={(e) => updateArchive(archive.id, 'year', e.target.value)}
                          style={{ ...inputStyle, maxWidth: '160px' }}
                          onFocus={focusGold}
                          onBlur={blurDim}
                        />
                      </div>

                      <div style={sectionStyle}>
                        <label style={labelStyle}>Outcome</label>
                        <input
                          type="text"
                          value={archive.outcome}
                          onChange={(e) => updateArchive(archive.id, 'outcome', e.target.value)}
                          style={inputStyle}
                          onFocus={focusGold}
                          onBlur={blurDim}
                        />
                      </div>

                      {/* Matches */}
                      <div style={sectionStyle}>
                        <label style={labelStyle}>Matches</label>

                        {archive.matches.length > 0 && (
                          <div style={{ marginBottom: '0.75rem' }}>
                            {/* Column headers */}
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 2fr 32px',
                                gap: '0.5rem',
                                marginBottom: '0.35rem',
                              }}
                            >
                              {['Opponent', 'Date', 'Result', ''].map((h, i) => (
                                <span key={i} style={{ ...labelStyle, marginBottom: 0, fontSize: '0.55rem' }}>{h}</span>
                              ))}
                            </div>

                            {archive.matches.map((match, mIdx) => (
                              <div
                                key={mIdx}
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr 2fr 32px',
                                  gap: '0.5rem',
                                  alignItems: 'center',
                                  marginBottom: '0.5rem',
                                }}
                              >
                                <input
                                  type="text"
                                  value={match.opponent}
                                  onChange={(e) => updateMatch(archive.id, mIdx, 'opponent', e.target.value)}
                                  placeholder="स्कटल्यान्ड"
                                  style={inputStyle}
                                  onFocus={focusGold}
                                  onBlur={blurDim}
                                />
                                <input
                                  type="text"
                                  value={match.date}
                                  onChange={(e) => updateMatch(archive.id, mIdx, 'date', e.target.value)}
                                  placeholder="जनवरी"
                                  style={inputStyle}
                                  onFocus={focusGold}
                                  onBlur={blurDim}
                                />
                                <input
                                  type="text"
                                  value={match.result}
                                  onChange={(e) => updateMatch(archive.id, mIdx, 'result', e.target.value)}
                                  placeholder="नेपाल ७ विकेटले विजयी"
                                  style={inputStyle}
                                  onFocus={focusGold}
                                  onBlur={blurDim}
                                />
                                <button
                                  onClick={() => removeMatch(archive.id, mIdx)}
                                  style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1rem', padding: 0, lineHeight: 1 }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => addMatch(archive.id)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#6B7280',
                            padding: '0.35rem 0.75rem',
                            fontFamily: 'var(--font-barlow), sans-serif',
                            fontSize: '0.6rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            borderRadius: 2,
                          }}
                        >
                          + म्याच थप्नुस्
                        </button>
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
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
