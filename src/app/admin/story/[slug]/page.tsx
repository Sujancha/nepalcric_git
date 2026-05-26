'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { inputStyle, labelStyle, sectionStyle, saveBtnStyle, cancelBtnStyle } from '../../adminStyles';
import AdminEditor from '@/components/admin/AdminEditor';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface ParsedStory {
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  heroImage: string;
  featured: boolean;
  lede: string;
  htmlContent: string;
  sha: string;
  error?: string;
}

interface CommitResponse {
  success?: boolean;
  commit?: string;
  error?: string;
  detail?: string;
}

function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = '#C9A84C';
}
function blurDim(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)';
}

export default function StoryEditorPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [lede, setLede] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [sha, setSha] = useState('');

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState('');

  const fetchStory = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch(`/api/admin/parse-story?id=${encodeURIComponent(slug)}`);
      const data = (await res.json()) as ParsedStory;
      if (!res.ok) {
        setLoadError(data.error ?? `फाइल लोड गर्न सकिएन (${res.status})`);
        return;
      }
      setTitle(data.title ?? '');
      setSubtitle(data.subtitle ?? '');
      setCategory(data.category ?? '');
      setDate(data.date ?? '');
      setReadTime(data.readTime ?? '');
      setHeroImage(data.heroImage ?? '');
      setFeatured(data.featured ?? false);
      setLede(data.lede ?? '');
      setHtmlContent(data.htmlContent ?? '');
      setSha(data.sha);
    } catch {
      setLoadError('नेटवर्क त्रुटि: फाइल लोड हुन सकेन।');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  async function handleSave() {
    if (!sha) return;
    setSaveStatus('saving');
    setSaveError('');
    try {
      const res = await fetch('/api/admin/parse-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: slug,
          title,
          subtitle,
          category,
          date,
          readTime,
          heroImage,
          featured,
          lede,
          htmlContent,
          sha
        }),
      });
      const data = (await res.json()) as CommitResponse;
      if (res.ok && data.success) {
        setSaveStatus('saved');
        await fetchStory();
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
              href="/admin/stories"
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
              ← कथाहरू
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
              {title || slug}
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
              content/stories/{slug}.md
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
            {/* TITLE & SUBTITLE */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, ...sectionStyle, marginBottom: 0 }}>
                <label style={labelStyle}>शीर्षक (Title)</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={inputStyle}
                  onFocus={focusGold}
                  onBlur={blurDim}
                />
              </div>
            </div>

            <div style={sectionStyle}>
              <label style={labelStyle}>उप-शीर्षक (Subtitle)</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurDim}
              />
            </div>

            {/* CATEGORY & DATE & READ TIME */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, ...sectionStyle, marginBottom: 0 }}>
                <label style={labelStyle}>वर्ग (Category)</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={focusGold}
                  onBlur={blurDim}
                >
                  <option value="" style={{ background: '#07080F' }}>छान्नुहोस्...</option>
                  <option value="अन्तर्वार्ता" style={{ background: '#07080F' }}>अन्तर्वार्ता</option>
                  <option value="कथा" style={{ background: '#07080F' }}>कथा</option>
                  <option value="प्रोफाइल" style={{ background: '#07080F' }}>प्रोफाइल</option>
                  <option value="म्याच रिपोर्ट" style={{ background: '#07080F' }}>म्याच रिपोर्ट</option>
                  <option value="विश्लेषण" style={{ background: '#07080F' }}>विश्लेषण</option>
                  <option value="पर्दा पछाडि" style={{ background: '#07080F' }}>पर्दा पछाडि</option>
                </select>
              </div>
              <div style={{ flex: 1, ...sectionStyle, marginBottom: 0 }}>
                <label style={labelStyle}>मिति (Date)</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={inputStyle}
                  onFocus={focusGold}
                  onBlur={blurDim}
                />
              </div>
              <div style={{ flex: 1, ...sectionStyle, marginBottom: 0 }}>
                <label style={labelStyle}>पढ्ने समय (Read Time)</label>
                <select
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={focusGold}
                  onBlur={blurDim}
                >
                  <option value="" style={{ background: '#07080F' }}>छान्नुहोस्...</option>
                  <option value="१ मिनेटको" style={{ background: '#07080F' }}>१ मिनेटको</option>
                  <option value="२ मिनेटको" style={{ background: '#07080F' }}>२ मिनेटको</option>
                  <option value="३ मिनेटको" style={{ background: '#07080F' }}>३ मिनेटको</option>
                  <option value="४ मिनेटको" style={{ background: '#07080F' }}>४ मिनेटको</option>
                  <option value="५ मिनेटको" style={{ background: '#07080F' }}>५ मिनेटको</option>
                  <option value="७ मिनेटको" style={{ background: '#07080F' }}>७ मिनेटको</option>
                  <option value="१० मिनेटको" style={{ background: '#07080F' }}>१० मिनेटको</option>
                </select>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div style={sectionStyle}>
              <label style={labelStyle}>मुख्य तस्बिर (Hero Image URL)</label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurDim}
              />
            </div>

            {/* FEATURED TOGGLE */}
            <div style={{ ...sectionStyle, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer', accentColor: '#C41E3A' }}
              />
              <label htmlFor="featured" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>
                विशेष सामग्री (Featured Story)
              </label>
            </div>

            {/* LEDE */}
            <div style={sectionStyle}>
              <label style={labelStyle}>सार (Lede - Grid Description)</label>
              <textarea
                value={lede}
                onChange={(e) => setLede(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={focusGold}
                onBlur={blurDim}
              />
            </div>

            {/* CONTENT (Rich Text Editor) */}
            <div style={{...sectionStyle, maxWidth: '100%'}}>
              <label style={labelStyle}>पूर्ण कथा (Story Content — Rich Text)</label>
              <AdminEditor 
                content={htmlContent} 
                onChange={(html) => setHtmlContent(html)} 
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
              <Link href="/admin/stories" style={{ textDecoration: 'none' }}>
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
