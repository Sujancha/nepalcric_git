import type { Metadata } from 'next';
import AdminBar from '@/components/admin/AdminBar';
import AdminLinkInterceptor from '@/components/admin/AdminLinkInterceptor';

export const metadata: Metadata = {
  title: 'एडमिन | NepalCric',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Intercepts all internal link clicks and keeps URLs under /admin/* */}
      <AdminLinkInterceptor />
      <AdminBar />
      <div style={{ color: '#E8E8E8' }}>
        {children}
      </div>
    </>
  );
}
