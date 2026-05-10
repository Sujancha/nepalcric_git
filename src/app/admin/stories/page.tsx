import Link from 'next/link';

export default function AdminStoriesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#07080F', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div>
            <Link
              href="/admin/dashboard"
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
              ← ड्यासबोर्ड
            </Link>
            <h1
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: '1.75rem',
                letterSpacing: '0.08em',
                color: '#C9A84C',
                margin: 0,
                lineHeight: 1,
              }}
            >
              कथाहरू
            </h1>
          </div>
        </div>

        {/* Placeholder */}
        <div
          style={{
            background: 'rgba(201,168,76,0.05)',
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '3rem 2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '1rem',
            }}
          >
            COMING SOON
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-mukta), sans-serif',
              fontWeight: 800,
              fontSize: '1.5rem',
              color: '#E8E8E8',
              margin: '0 0 0.75rem',
            }}
          >
            कथाहरू व्यवस्थापन
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mukta), sans-serif',
              fontSize: '0.9rem',
              color: '#6B7280',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            आउँदो जल्दै — सम्पादकीय कथाहरू सिधै यहाँबाट थप्न र सम्पादन गर्न सकिनेछ।
          </p>
        </div>

        <p
          style={{
            marginTop: '2.5rem',
            fontFamily: 'var(--font-barlow), sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#6B7280',
            textAlign: 'center',
          }}
        >
          <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>
            ← साइटमा फर्किनुस्
          </Link>
        </p>
      </div>
    </div>
  );
}
