import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'एडमिन | NepalCric',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07080F',
        color: '#E8E8E8',
        fontFamily: 'var(--font-mukta), sans-serif',
      }}
    >
      {children}
    </div>
  );
}
