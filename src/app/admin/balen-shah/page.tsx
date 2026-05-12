import Link from 'next/link';

export default function AdminBalenShahPage() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07080F',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(201,168,76,0.2)',
          background: 'rgba(201,168,76,0.04)',
          padding: '3rem',
        }}
      >
        <div
          style={{
            width: '2px',
            height: '40px',
            background: '#C9A84C',
            margin: '0 auto 2rem auto',
          }}
        />
        <h1
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: '1.6rem',
            letterSpacing: '0.1em',
            color: '#C9A84C',
            margin: '0 0 1rem 0',
          }}
        >
          बालेन्द्र शाहको कथा
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-mukta), sans-serif',
            fontSize: '0.9rem',
            color: '#6B7280',
            lineHeight: 1.7,
            margin: '0 0 2rem 0',
          }}
        >
          यो पृष्ठ सम्पादनको लागि बन्द छ। बालेन्द्र शाहको कथा एक विशेष सिनेम्याटिक अनुभव हो — यसलाई सिधै सार्वजनिक पृष्ठमा हेर्नुस्।
        </p>
        <Link
          href="/balen-shah"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-barlow), sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            textDecoration: 'none',
            border: '1px solid rgba(201,168,76,0.3)',
            padding: '0.5rem 1.25rem',
            transition: 'border-color 150ms ease, color 150ms ease',
          }}
        >
          सार्वजनिक पृष्ठमा जानुस् →
        </Link>
      </div>
    </div>
  );
}
