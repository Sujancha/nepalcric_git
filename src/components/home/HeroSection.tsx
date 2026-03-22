"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [mounted, setMounted] = useState(false);
    interface Particle {
        width: string; height: string; left: string; top: string;
        animation: string; animationDelay: string;
    }
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showPreloader, setShowPreloader] = useState(true);

    // Simulate live match state for Phase 1 requirements
    const isLiveMatch = false;

    useEffect(() => {
        if (sessionStorage.getItem('hasVisited')) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowPreloader(false);
        } else {
            const timer = setTimeout(() => {
                setShowPreloader(false);
                sessionStorage.setItem('hasVisited', 'true');
            }, 2300);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        setParticles([...Array(40)].map(() => ({
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `floatDust ${Math.random() * 15 + 15}s linear infinite`,
            animationDelay: `-${Math.random() * 30}s`,
        })));
    }, []);

    return (
        <section className="relative w-full h-[calc(100vh-4rem)] bg-[#07080F] overflow-hidden flex items-center justify-center">
            {isLiveMatch && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(196,30,58,0.06)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    transition: 'opacity 1s ease'
                }} />
            )}
            {/* 1. THE GOOSEBUMPS PRELOADER */}
            {showPreloader && (
                <div className="fixed inset-0 z-[9999] bg-[#07080F] flex items-center justify-center pointer-events-none animate-[preloaderOverlayFade_3s_linear_forwards]">
                    <svg width="200" height="250" viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M40 20 L160 110 L80 110 L180 230 L40 230 Z"
                            stroke="#C41E3A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="1500"
                            strokeDashoffset="1500"
                            className="animate-[traceDraw_1.6s_cubic-bezier(0.76,0,0.24,1)_forwards]"
                        />
                    </svg>
                </div>
            )}

            {/* 3. THE AMBIENT CRIMSON VOID (Layered Lighting) */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{
                background: `
                    radial-gradient(circle at 15% 90%, rgba(196,30,58,0.18), transparent 55%),
                    radial-gradient(circle at 85% 10%, rgba(0,56,147,0.08), transparent 50%)
                `
            }} />

            {/* 2. THE GHOST WATERMARK */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[120px] z-0 pointer-events-none opacity-[0.09] select-none">
                <svg width="600" height="900" viewBox="0 0 200 250" fill="#FF2244" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20 L160 110 L80 110 L180 230 L40 230 Z" />
                </svg>
            </div>
            {/* Background Image with Ken Burns */}
            <Image
                onLoad={() => setIsVideoLoaded(true)}
                fill
                className={`object-cover object-top z-0 transition-opacity duration-1000 animate-ken-burns ${isVideoLoaded ? 'opacity-50 saturate-50' : 'opacity-0'}`}
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Night Cricket Stadium Atmosphere"
            />

            {/* Dark Gradient Overlay for Cinematic Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#07080F]/95 z-10" />

            {/* Pure CSS Dust Particles */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {mounted && particles.map((style, i) => (
                    <div
                        key={i}
                        className="absolute bg-[#C9A84C]/20 rounded-full"
                        style={style}
                    />
                ))}
            </div>

            {/* Hero Content Wrapper (Cinematic Fade In) */}
            <div className="absolute inset-0 z-20 animate-[cinematicFadeIn_3s_linear_forwards] flex flex-col items-center justify-center w-full pointer-events-none">
                {/* Content */}
                <div className="relative text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-8 pointer-events-auto">
                    {isLiveMatch ? (
                        <h1 style={{
                            fontFamily: 'Mukta, sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(52px, 10vw, 120px)',
                            lineHeight: 1.05,
                            color: '#FFFFFF',
                            letterSpacing: '0',
                            margin: 0
                        }}>
                            आज <span style={{ color: '#C41E3A' }}>नेपालको</span> दिन हो।
                        </h1>
                    ) : (
                        <h1 style={{
                            fontFamily: 'Mukta, sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(52px, 10vw, 120px)',
                            lineHeight: 1.05,
                            color: '#FFFFFF',
                            letterSpacing: '0',
                            margin: 0,
                            textAlign: 'center'
                        }}>
                            <span className="block animate-[fadeUpIn_1s_ease-out_2.2s_both] text-white/40 text-[clamp(18px,2.5vw,28px)] uppercase tracking-[0.3em] font-barlow mb-4">T20 World Cup 2024</span>
                            नेपाल VS <span style={{ color: '#C41E3A' }}>दक्षिण अफ्रिका</span>
                        </h1>
                    )}

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#B0B8C8] font-sans drop-shadow-md animate-[fadeUpIn_1s_ease-out_3s_both] text-center">
                        सेन्ट भिन्सेन्टको त्यो ऐतिहासिक रात र १ रनको त्यो साहसिक हार, जसले विश्व क्रिकेटको मन जित्यो।
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 animate-[fadeUpIn_1s_cubic-bezier(0.76,0,0.24,1)_4.4s_both]">
                        {isLiveMatch ? (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '32px',
                                marginTop: '8px'
                            }}>
                                <a href="/scoreboard" style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    color: '#C41E3A',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid rgba(196,30,58,0.4)',
                                    paddingBottom: '2px',
                                    transition: 'border-color 0.3s cubic-bezier(0.76,0,0.24,1), color 0.3s cubic-bezier(0.76,0,0.24,1)'
                                }}
                                    onMouseEnter={e => {
                                        (e.target as HTMLElement).style.borderColor = '#C41E3A'
                                            ; (e.target as HTMLElement).style.color = '#FFFFFF'
                                    }}
                                    onMouseLeave={e => {
                                        (e.target as HTMLElement).style.borderColor = 'rgba(196,30,58,0.4)'
                                            ; (e.target as HTMLElement).style.color = '#C41E3A'
                                    }}>
                                    <span style={{ letterSpacing: '0' }}>म्याच हेर्नुस् →</span>
                                </a>
                                <a href="/match-day" style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    color: 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                                    paddingBottom: '2px',
                                    transition: 'color 0.3s cubic-bezier(0.76,0,0.24,1), border-color 0.3s cubic-bezier(0.76,0,0.24,1)'
                                }}
                                    onMouseEnter={e => {
                                        (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.9)'
                                            ; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
                                            ; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'
                                    }}>
                                    <span style={{ letterSpacing: '0' }}>म्याच डे →</span>
                                </a>
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '32px',
                                marginTop: '8px'
                            }}>
                                <Link href="/#stories" style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    color: 'rgba(255,255,255,0.75)',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid rgba(255,255,255,0.25)',
                                    paddingBottom: '2px',
                                    transition: 'color 0.3s cubic-bezier(0.76,0,0.24,1), border-color 0.3s cubic-bezier(0.76,0,0.24,1)'
                                }}
                                    onMouseEnter={e => {
                                        (e.target as HTMLElement).style.color = '#FFFFFF'
                                            ; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.6)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)'
                                            ; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'
                                    }}>
                                    <span style={{ letterSpacing: '0' }}>कथाहरू पढ्नुस् →</span>
                                </Link>
                                <a href="/match-day" style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    color: '#C41E3A',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid rgba(196,30,58,0.4)',
                                    paddingBottom: '2px',
                                    transition: 'color 0.3s cubic-bezier(0.76,0,0.24,1), border-color 0.3s cubic-bezier(0.76,0,0.24,1)'
                                }}
                                    onMouseEnter={e => {
                                        (e.target as HTMLElement).style.color = '#FFFFFF'
                                            ; (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.6)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.target as HTMLElement).style.color = '#C41E3A'
                                            ; (e.target as HTMLElement).style.borderColor = 'rgba(196,30,58,0.4)'
                                    }}>
                                    <span style={{ letterSpacing: '0' }}>म्याच डे →</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Live Match Strip (Conditional) */}
            {isLiveMatch && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#C41E3A',
                    padding: '10px 80px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 10
                }}>
                    {/* Pulsing dot */}
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        animation: 'livePulse 2s ease-in-out infinite',
                        flexShrink: 0
                    }} />
                    {/* Live text */}
                    <span style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        color: '#FFFFFF',
                        textTransform: 'uppercase'
                    }}>
                        LIVE
                    </span>
                    <span style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.7)',
                        letterSpacing: '0.1em'
                    }}>
                        ·
                    </span>
                    <span style={{
                        fontFamily: 'Mukta, sans-serif',
                        fontSize: '14px',
                        color: '#FFFFFF',
                        letterSpacing: '0'
                    }}>
                        नेपाल VS UAE · MATCH IN PROGRESS
                    </span>
                    <span style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.7)',
                        letterSpacing: '0.1em',
                        marginLeft: 'auto'
                    }}>
                        ·
                    </span>
                    <a href="/scoreboard" style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: '13px',
                        color: '#FFFFFF',
                        letterSpacing: '0.15em',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        opacity: 0.9,
                        borderBottom: '1px solid rgba(255,255,255,0.4)'
                    }}>
                        म्याचको सारांश हेर्नुस् →
                    </a>
                </div>
            )}
            <style>{`
                @keyframes livePulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.85); }
                }
            `}</style>
        </section>
    );
}
