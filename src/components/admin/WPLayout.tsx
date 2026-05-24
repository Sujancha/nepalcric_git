'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, Image as ImageIcon, Settings, LogOut, ExternalLink, Calendar, Activity, Film } from 'lucide-react';

const SIDEBAR_LINKS = [
  { href: '/admin/dashboard', label: 'ड्यासबोर्ड', icon: LayoutDashboard },
  { href: '/admin/players', label: 'खेलाडीहरू', icon: Users },
  { href: '/admin/stories', label: 'कथाहरू', icon: BookOpen },
  { href: '/admin/match-day', label: 'म्याच डे', icon: Calendar },
  { href: '/admin/scoreboard', label: 'स्कोरबोर्ड (Live)', icon: Activity },
  { href: '/admin/locker-room', label: 'लकर रुम', icon: Film },
  { href: '/admin/media', label: 'मिडिया (Media)', icon: ImageIcon },
  { href: '/admin/settings', label: 'सेटिङ्स', icon: Settings },
];

export default function WPLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't wrap the login page in the WP layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#0f111a] text-[#E8E8E8] overflow-hidden font-sans">
      {/* Sidebar (WordPress Style) */}
      <aside className="w-64 bg-[#07080f] border-r border-white/10 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1E3A8A] flex items-center justify-center border border-[#C41E3A]">
              <span className="font-bebas text-lg text-white pt-1">NC</span>
            </div>
            <span className="font-bebas text-xl tracking-wider text-white pt-1">NEPALCRIC<span className="text-[#C41E3A]">.</span></span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-[#1E3A8A]/20 text-[#C41E3A]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#C41E3A]' : ''} />
                <span className="font-medium text-sm tracking-wide">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
          <Link 
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
            <span className="font-medium text-sm tracking-wide">साइट हेर्नुहोस्</span>
          </Link>
          <a 
            href="/api/admin/logout"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm tracking-wide">लगआउट</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0f111a]">
        {/* Topbar */}
        <header className="h-16 border-b border-white/10 bg-[#07080f]/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="capitalize">{pathname.split('/').filter(Boolean).join(' / ')}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#C41E3A] flex items-center justify-center text-sm font-bold text-white">
              A
            </div>
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
