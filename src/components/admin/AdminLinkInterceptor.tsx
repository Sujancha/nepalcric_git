'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Pages that have admin mirror routes under /admin/*
const MIRRORED = [
    '/',
    '/squad',
    '/scoreboard',
    '/locker-room',
    '/match-day',
    '/kathaharu',
    '/fanzone',
    '/balen-shah',
];

function hasMirror(href: string): boolean {
    if (href === '/') return true;
    return MIRRORED.some(
        (p) => p !== '/' && (href === p || href.startsWith(p + '/'))
    );
}

/**
 * Intercepts all internal link clicks on admin pages and rewrites them
 * to their /admin/* equivalent so the admin never leaves admin mode.
 *
 * Uses the capture phase so it fires before Next.js's own Link handler.
 */
export default function AdminLinkInterceptor() {
    const router = useRouter();
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin') ?? false;

    useEffect(() => {
        if (!isAdmin) return;

        const handleClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            // Only handle relative site links
            if (
                !href.startsWith('/') ||
                href.startsWith('/admin') ||
                href.startsWith('/api') ||
                href.startsWith('/_next')
            ) return;

            if (hasMirror(href)) {
                e.preventDefault();
                e.stopPropagation();
                const dest = href === '/' ? '/admin' : '/admin' + href;
                router.push(dest);
            }
            // Links without a mirror (contact, terms, privacy, /story/*) navigate normally
        };

        // Capture phase fires before Next.js's synthetic event handler
        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [isAdmin, router]);

    return null;
}
