import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

interface PlayerMeta {
  id: string;
  name_ne: string;
  name_en: string;
  status: string;
  role: string;
}

function getPlayers(): PlayerMeta[] {
  const playersDir = path.join(process.cwd(), 'content', 'players');

  if (!fs.existsSync(playersDir)) return [];

  const files = fs.readdirSync(playersDir).filter((f) => f.endsWith('.md'));

  return files
    .map((filename) => {
      const id = filename.replace(/\.md$/, '');
      try {
        const raw = fs.readFileSync(path.join(playersDir, filename), 'utf8');
        const { data } = matter(raw);
        return {
          id,
          name_ne: (data.name_ne as string) ?? id,
          name_en: (data.name_en as string) ?? id,
          status: (data.status as string) ?? 'UNKNOWN',
          role: (data.role as string) ?? '',
        };
      } catch {
        return { id, name_ne: id, name_en: id, status: 'UNKNOWN', role: '' };
      }
    })
    .sort((a, b) => a.name_en.localeCompare(b.name_en));
}

export default function AdminPlayersPage() {
  const players = getPlayers();

  return (
    <div style={{ minHeight: '100vh', background: '#07080F', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-bebas), sans-serif',
                fontSize: '1.75rem',
                letterSpacing: '0.1em',
                color: '#C41E3A',
                margin: 0,
                lineHeight: 1,
              }}
            >
              खेलाडीहरू
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6B7280',
                marginTop: '0.35rem',
              }}
            >
              {players.length} PLAYERS
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#6B7280',
              textDecoration: 'none',
            }}
          >
            ← ड्यासबोर्ड
          </Link>
        </div>

        {/* Player list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {players.map((player) => (
            <Link
              key={player.id}
              href={`/admin/players/${player.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'border-color 0.2s, background 0.2s',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#C41E3A';
                  (e.currentTarget as HTMLDivElement).style.background =
                    'rgba(196,30,58,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLDivElement).style.background =
                    'rgba(255,255,255,0.03)';
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mukta), sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#E8E8E8',
                      display: 'block',
                    }}
                  >
                    {player.name_ne}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-barlow), sans-serif',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                    }}
                  >
                    {player.name_en}
                    {player.role ? ` · ${player.role}` : ''}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-barlow), sans-serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      border: `1px solid ${player.status === 'ACTIVE' ? '#C41E3A' : player.status === 'RETIRED' ? '#C9A84C' : '#6B7280'}`,
                      color:
                        player.status === 'ACTIVE'
                          ? '#C41E3A'
                          : player.status === 'RETIRED'
                          ? '#C9A84C'
                          : '#6B7280',
                    }}
                  >
                    {player.status}
                  </span>
                  <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
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
