import Link from 'next/link';

const sections = [
  {
    href: '/admin/players',
    label: 'खेलाडीहरू',
    sublabel: 'PLAYERS',
    description: 'खेलाडी प्रोफाइल MD फाइलहरू सम्पादन गर्नुस्',
    accent: '#C41E3A',
  },
  {
    href: '/admin/scoreboard',
    label: 'स्कोरबोर्ड',
    sublabel: 'SCOREBOARD',
    description: 'टूर्नामेन्ट इतिहास र नतिजाहरू',
    accent: '#C9A84C',
  },
  {
    href: '/admin/locker-room',
    label: 'लकर रुम',
    sublabel: 'LOCKER ROOM',
    description: 'भिडियो भल्ट कन्टेन्ट व्यवस्थापन',
    accent: '#C41E3A',
  },
  {
    href: '/admin/stories',
    label: 'कथाहरू',
    sublabel: 'STORIES',
    description: 'सम्पादकीय कथाहरू र लेखहरू',
    accent: '#C9A84C',
  },
];

export default function AdminDashboardPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#07080F', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: '2rem',
                letterSpacing: '0.1em',
                color: '#C41E3A',
                margin: 0,
                lineHeight: 1,
              }}
            >
              NEPALCRIC — एडमिन
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6B7280',
                marginTop: '0.4rem',
              }}
            >
              CONTENT MANAGEMENT
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#6B7280',
                textDecoration: 'none',
              }}
            >
              ← साइटमा फर्किनुस्
            </Link>

            <LogoutButton />
          </div>
        </div>

        {/* Section Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(255,255,255,0.07)`,
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = section.accent;
                  (e.currentTarget as HTMLDivElement).style.background =
                    'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLDivElement).style.background =
                    'rgba(255,255,255,0.03)';
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-barlow), sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: section.accent,
                    margin: '0 0 0.5rem',
                  }}
                >
                  {section.sublabel}
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
                  {section.label}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-mukta), sans-serif',
                    fontSize: '0.875rem',
                    color: '#6B7280',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {section.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            marginTop: '3rem',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.7rem',
            color: '#6B7280',
            textAlign: 'center',
          }}
        >
          परिवर्तनहरू GitHub मार्फत commit हुन्छन् → Vercel auto-deploy
        </p>
      </div>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="GET">
      <button
        type="submit"
        style={{
          background: 'transparent',
          border: '1px solid rgba(196,30,58,0.4)',
          color: '#C41E3A',
          padding: '0.4rem 0.9rem',
          fontFamily: 'var(--font-barlow), sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        लगआउट
      </button>
    </form>
  );
}
