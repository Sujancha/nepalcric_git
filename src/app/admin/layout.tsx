import type { Metadata } from 'next';
import AdminBar from '@/components/admin/AdminBar';

export const metadata: Metadata = {
  title: 'एडमिन | NepalCric',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminBar />
      <div style={{ color: '#E8E8E8' }}>
        {children}
      </div>
    </>
  );
}
