"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            setProgress(totalHeight > 0 ? scrollY / totalHeight : 0);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return progress;
}

const navLinks = [
    { name: "पेभिलियन", href: "/" },
    { name: "कथाहरू", href: "/kathaharu" },
    { name: "म्याच डे", href: "/match-day" },
    { name: "द स्क्वाड", href: "/squad" },
    { name: "स्कोरबोर्ड", href: "/scoreboard" },
    { name: "लकर रुम", href: "/locker-room" },
    { name: "फ्यान जोन", href: "/fanzone" },
];

export default function Navbar() {
    const pathname = usePathname();
    const scrollProgress = useScrollProgress();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isLiveMatch = true;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-300"
                style={{
                    background: scrolled ? "rgba(7,8,15,0.95)" : "transparent",
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(196,30,58,0.30)" : "1px solid transparent",
                }}
            >
                {/* Three-zone layout */}
                <div className="h-full flex items-center justify-between px-6 lg:px-12">

                    {/* LEFT — Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        {/* Diamond SVG */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L16 8L8 16L0 8Z" fill="#C41E3A" />
                        </svg>
                        <span
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 800,
                                fontSize: "20px",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                lineHeight: 1,
                            }}
                        >
                            <span style={{ color: "#ffffff" }}>NEPAL</span>
                            <span style={{ color: "#C41E3A" }}>CRIC</span>
                        </span>
                    </Link>

                    {/* CENTER — Nav links (desktop only) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="nav-link group relative py-1"
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 500,
                                        fontSize: "13px",
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        color: isActive ? "#E8E8E8" : "rgba(232,232,232,0.60)",
                                        transition: "color 200ms",
                                    }}
                                >
                                    {link.name}
                                    {/* Underline — permanent if active, slides in on hover */}
                                    <span
                                        className="absolute bottom-0 left-0 h-[1px] bg-[#C41E3A] transition-all duration-200"
                                        style={{
                                            width: isActive ? "100%" : "0%",
                                        }}
                                        aria-hidden="true"
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT — Live indicator + hamburger */}
                    <div className="flex items-center gap-4">
                        {/* Live indicator */}
                        {isLiveMatch && (
                            <div className="hidden md:flex items-center gap-[6px]">
                                <span
                                    className="animate-pulse"
                                    style={{
                                        display: "block",
                                        width: "7px",
                                        height: "7px",
                                        borderRadius: "50%",
                                        backgroundColor: "#C41E3A",
                                    }}
                                />
                                <span
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 500,
                                        fontSize: "11px",
                                        letterSpacing: "0.25em",
                                        textTransform: "uppercase",
                                        color: "#C41E3A",
                                    }}
                                >
                                    LIVE
                                </span>
                            </div>
                        )}

                        {/* Hamburger (mobile only) */}
                        <button
                            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <span className="block w-5 h-[1.5px] bg-[#E8E8E8]" />
                            <span className="block w-5 h-[1.5px] bg-[#E8E8E8]" />
                            <span className="block w-5 h-[1.5px] bg-[#E8E8E8]" />
                        </button>
                    </div>
                </div>

                {/* Scroll progress bar — sits at bottom edge of navbar */}
                <div
                    className="absolute bottom-0 left-0 h-[2px] bg-[#C41E3A] transition-none pointer-events-none"
                    style={{ width: `${scrollProgress * 100}%` }}
                    aria-hidden="true"
                />
            </nav>

            {/* Mobile full-screen overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col"
                    style={{
                        background: "rgba(7,8,15,0.98)",
                        backdropFilter: "blur(16px)",
                    }}
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 h-[60px] shrink-0">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0L16 8L8 16L0 8Z" fill="#C41E3A" />
                            </svg>
                            <span
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 800,
                                    fontSize: "20px",
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    lineHeight: 1,
                                }}
                            >
                                <span style={{ color: "#ffffff" }}>NEPAL</span>
                                <span style={{ color: "#C41E3A" }}>CRIC</span>
                            </span>
                        </Link>

                        {/* Close button */}
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="w-8 h-8 flex items-center justify-center text-[#E8E8E8]"
                            aria-label="Close menu"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L17 17M17 1L1 17" stroke="#E8E8E8" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Staggered nav links */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-8">
                        {navLinks.map((link, i) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="mobile-nav-link"
                                    style={{
                                        fontFamily: "'Mukta', sans-serif",
                                        fontWeight: 800,
                                        fontSize: "28px",
                                        color: isActive ? "#E8E8E8" : "rgba(232,232,232,0.55)",
                                        animationDelay: `${i * 50}ms`,
                                    }}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            <style>{`
                /* Hover underline slide-in from left */
                .nav-link:hover {
                    color: #E8E8E8 !important;
                }
                .nav-link:hover span {
                    width: 100% !important;
                }

                /* Mobile link stagger animation */
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .mobile-nav-link {
                    opacity: 0;
                    animation: fadeSlideUp 300ms ease forwards;
                }
            `}</style>
        </>
    );
}
