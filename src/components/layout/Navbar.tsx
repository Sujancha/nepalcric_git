"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShinyText } from "@/components/ui/ShinyText";

export default function Navbar() {
    const pathname = usePathname();

    // LIVE STATE — must match HeroSection.tsx isLiveMatch value
    const isLiveMatch = true;

    const navLinks = [
        { name: "पेभिलियन", href: "/" },
        { name: "कथाहरू", href: "/kathaharu" },
        { name: "म्याच डे", href: "/match-day" },
        { name: "द स्क्वाड", href: "/squad" },
        { name: "स्कोरबोर्ड", href: "/scoreboard" },
        { name: "लकर रुम", href: "/locker-room" },
        { name: "फ्यान जोन", href: "/fanzone" },
    ];

    return (
        <>
            {/* 4. THE DEEP SKY NAVBAR */}
            <nav
                className="fixed top-0 left-0 right-0 z-50 bg-[#07080F]/85 backdrop-blur-[20px] backdrop-saturate-[180%] h-[60px] hidden md:flex items-center justify-between px-6 lg:px-12 transition-colors"
                style={{
                    borderBottom: isLiveMatch
                        ? '1px solid rgba(196,30,58,0.5)'
                        : '1px solid rgba(0,56,147,0.6)'
                }}
            >
                {/* Logo & Live Indicator */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        {/* Architectural Editorial Logo */}
                        <div className="flex items-center gap-2">
                            <span className="text-[#C41E3A] text-[18px]">◈</span>
                            <span className="font-barlow font-bold uppercase text-[22px] tracking-[0.05em] text-white">
                                NEPAL<span className="text-[#C41E3A]">CRIC</span>
                            </span>
                        </div>
                    </Link>

                    {isLiveMatch && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginLeft: '16px'
                        }}>
                            <div style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                backgroundColor: '#C41E3A',
                                animation: 'livePulse 2s ease-in-out infinite'
                            }} />
                            <span style={{
                                fontFamily: 'Barlow Condensed, sans-serif',
                                fontSize: '11px',
                                letterSpacing: '0.25em',
                                color: '#C41E3A',
                                textTransform: 'uppercase'
                            }}>
                                LIVE
                            </span>
                        </div>
                    )}
                </div>

                {/* Main Navigation Links */}
                <div className="hidden md:flex items-center gap-1 lg:gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`h-[60px] flex items-center px-4 font-sans font-medium text-[15px] pt-[3px] transition-all duration-250 ease-in-out ${isActive
                                    ? "text-white border-b-[3px] border-[#C41E3A]"
                                    : "text-white/55 hover:text-white border-b-[3px] border-transparent"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3">
                    {/* Removed Dark Mode Toggle since the site is fully dark/cinematic now */}
                </div>

            </nav>

            {/* Dynamic Island Mobile Bottom Nav (Visible only on Mobile) */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#07080F]/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-8 w-[90%] max-w-[360px] justify-between">

                <Link href="/" className={`${pathname === '/' ? 'text-[#C9A84C] drop-shadow-[0_1px_0_rgba(0,56,147,0.6)]' : 'text-[#B0B8C8] hover:text-stadium-white'} flex flex-col items-center gap-1 transition-colors group`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={pathname === '/' ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    <span className="font-sans text-[10px] uppercase">पेभिलियन</span>
                </Link>

                <Link href="/match-day" className="relative text-[#C41E3A] flex flex-col items-center gap-1 transition-colors group animate-[livePulse_2s_ease-in-out_infinite]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                    <span className="font-sans text-[10px] font-bold uppercase">म्याच डे</span>
                </Link>

                <Link href="/squad" className={`${pathname === '/squad' ? 'text-[#C9A84C] drop-shadow-[0_1px_0_rgba(0,56,147,0.6)]' : 'text-[#B0B8C8] hover:text-stadium-white'} flex flex-col items-center gap-1 transition-colors group`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={pathname === '/squad' ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    <span className="font-sans text-[10px] uppercase">स्क्वाड</span>
                </Link>

                <Link href="/fanzone" className={`${pathname === '/fanzone' ? 'text-[#C9A84C] drop-shadow-[0_1px_0_rgba(0,56,147,0.6)]' : 'text-[#B0B8C8] hover:text-stadium-white'} flex flex-col items-center gap-1 transition-colors group`}>
                    <div className="w-6 h-6 rounded-full bg-[#1E3A8A]/30 border border-[#1E3A8A] flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                        <span className="text-stadium-white text-[10px] font-display uppercase leading-none">Me</span>
                    </div>
                    <span className="font-sans text-[10px] uppercase">जोन</span>
                </Link>

            </div>

            <style>{`
                @keyframes livePulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.85); }
                }
            `}</style>
        </>
    );
}
