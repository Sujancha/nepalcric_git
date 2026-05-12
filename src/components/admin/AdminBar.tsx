'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'पेभिलियन', href: '/admin/' },
  { label: 'द स्क्वाड', href: '/admin/squad' },
  { label: 'स्कोरबोर्ड', href: '/admin/scoreboard' },
  { label: 'लकर रुम', href: '/admin/locker-room' },
  { label: 'म्याच डे', href: '/admin/match-day' },
];

export default function AdminBar() {
  const pathname = usePathname();

  if (pathname === '/admin/login') return null;

  const isActive = (href: string) => {
    if (href === '/admin/') return pathname === '/admin' || pathname === '/admin/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <style>{`
        @keyframes adminPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .admin-pulse-dot {
          animation: adminPulse 2s ease-in-out infinite;
        }
        .admin-nav-link {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 150ms ease;
          white-space: nowrap;
        }
        .admin-nav-link:hover {
          color: rgba(255,255,255,1);
        }
        .admin-nav-link.active {
          color: #C9A84C;
        }
        @media (max-width: 767px) {
          .admin-bar-nav { display: none !important; }
          .admin-bar-settings { display: none !important; }
        }
      `}</style>
      <div
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 200,
          height: '36px',
          width: '100%',
          background: 'rgba(7,8,15,0.98)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(196,30,58,0.5)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        {/* Left side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          {/* Pulsing dot */}
          <div
            className="admin-pulse-dot"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#C41E3A',
              flexShrink: 0,
            }}
          />
          {/* ADMIN label */}
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C41E3A',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            ADMIN
          </span>
          {/* Divider */}
          <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '10px', flexShrink: 0 }}>|</span>
          {/* Current path */}
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '11px',
              color: '#6B7280',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {pathname}
          </span>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* Nav links — hidden on mobile */}
          <nav className="admin-bar-nav" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-nav-link${isActive(link.href) ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Settings link */}
          <span className="admin-bar-settings" style={{ color: 'rgba(255,255,255,0.12)', fontSize: '10px' }}>|</span>
          <Link
            href="/admin/dashboard"
            className="admin-bar-settings admin-nav-link"
            title="ड्यासबोर्ड"
          >
            ⚙
          </Link>

          {/* Separator */}
          <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '10px' }}>|</span>

          {/* Logout */}
          <a
            href="/api/admin/logout"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C41E3A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            LOGOUT
          </a>
        </div>
      </div>
    </>
  );
}
