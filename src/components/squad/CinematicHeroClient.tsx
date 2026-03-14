"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface CinematicHeroClientProps {
    player: any; // We receive the player object from the server component
}

export default function CinematicHeroClient({ player }: CinematicHeroClientProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Extract first name for the massive background layer
    const firstName = player.name.split(" ")[0];

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-screen md:min-h-0 md:h-[80vh] flex flex-col justify-end md:flex-row md:items-end pt-[50vh] md:pt-0 pb-12 md:pb-16 bg-[#07080F] overflow-hidden md:overflow-hidden"
        >
            {/* Step 2: Mouse-Tracked Cinematic Spotlight */}
            <div
                className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 mix-blend-color-dodge"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 80%)`,
                }}
            />

            {/* Layer 2: Hero Image (Full Bleed, Sharp) */}
            <div
                className="absolute top-0 left-0 w-full h-[60vh] md:h-full md:inset-0 z-10 pointer-events-none"
                style={{
                    transform: `translateY(${scrollY * 0.15}px)`,
                }}
            >
                {player.heroImage ? (
                    <Image
                        src={player.heroImage}
                        alt={`${player.name} Hero`}
                        fill
                        className="object-cover object-top opacity-90"
                        priority
                    />
                ) : (
                    <Image
                        src="/images/tu_ground.gif"
                        alt="Fallback Hero"
                        fill
                        className="object-cover object-center opacity-40 mix-blend-screen"
                        priority
                        unoptimized
                    />
                )}
            </div>

            {/* Cinematic Vignette Overlay Stack (Below Foreground Text) */}
            <div className="absolute top-0 left-0 w-full h-[60vh] md:h-full md:inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/90 to-transparent z-10 pointer-events-none" />
            <div
                className="absolute top-0 left-0 w-full h-[60vh] md:h-full md:inset-0 z-10 pointer-events-none hidden md:block"
                style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(7,8,15,0.6) 100%)' }}
            />
            {/* Localized 'Fog' Overlay for legibility */}
            <div className="absolute top-0 left-0 w-full h-[60vh] md:h-full md:inset-0 z-10 pointer-events-none opacity-50 bg-[#07080F]/20" />

            {/* Red scroll-line on the right edge */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-crimson-red to-[#07080F] opacity-80 z-20 hidden md:block" />

            {/* Layer 3: Foreground Text & Information */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 translate-y-0 md:translate-y-5">
                {/* Left Side: Lore and Identity */}
                <div className="flex-1 max-w-4xl">
                    <div className="flex flex-col items-start gap-2 mb-6">
                        {/* Row 1: Role pill + special labels */}
                        <div className="flex gap-3 flex-wrap">
                            {player.status === 'retired' ? (
                                <span className="inline-flex items-center px-4 py-1.5 backdrop-blur-lg border border-[#C9A84C]/50 bg-[#07080F]/80 text-[#C9A84C] font-display font-bold text-[10px] tracking-[0.2em] uppercase rounded-[2px] relative z-30">
                                    RETIRED {player.retirementYear ? `· ${player.retirementYear}` : ''}
                                </span>
                            ) : (
                                <span className="inline-block px-4 py-1.5 backdrop-blur-lg border border-red-500/20 bg-crimson-red/90 drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] text-white font-display font-extrabold text-sm tracking-normal uppercase rounded-[2px] relative z-30">
                                    {player.role}
                                </span>
                            )}
                            {player.id === 'dipendra-singh-airee' && player.status !== 'retired' && (
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-lg border border-red-500/20 bg-crimson-red/90 drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] text-white font-display font-extrabold text-sm tracking-normal uppercase rounded-[2px] relative z-30">
                                    वर्ल्ड रेकर्ड
                                </span>
                            )}
                            {player.id === 'kushal-bhurtel' && player.status !== 'retired' && (
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-lg border border-red-500/20 bg-crimson-red/90 drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] text-white font-display font-extrabold text-sm tracking-normal uppercase rounded-[2px] relative z-30">
                                    बुटवल बोस
                                </span>
                            )}
                        </div>

                        {/* Row 2: Status Badges & Achievements (Vertical Stack) */}
                        <div className="flex flex-col items-start gap-1.5 relative z-30 mt-1">
                            {player.status === 'injured' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B45309] text-white font-display font-bold text-[10px] tracking-[0.2em] uppercase rounded-[2px]">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    INJURED
                                </span>
                            )}
                            {player.status === 'suspended' && (
                                <span className="inline-block px-3 py-1 bg-[#8B0000] text-white font-display font-bold text-[10px] tracking-[0.2em] uppercase rounded-[2px]">
                                    SUSPENDED
                                </span>
                            )}
                            {player.achievements && player.achievements.map((ach: string, i: number) => (
                                <span key={i} className="inline-flex items-center px-3 py-1 border border-[#C9A84C]/30 bg-[rgba(201,168,76,0.1)] text-[#C9A84C] font-display font-bold text-[10px] tracking-[0.2em] uppercase rounded-[2px] shadow-[inset_0_0_8px_rgba(201,168,76,0.05)]">
                                    {ach}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Small Devanagari Name */}
                    {player.nepaliName && (
                        <h2 className="font-sans font-bold text-2xl md:text-3xl text-[#C9A84C] mb-1 drop-shadow-md tracking-wide">
                            {player.nepaliName}
                        </h2>
                    )}

                    {/* Premium Atmospheric Solid-State Typography */}
                    <div className="relative z-20 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] opacity-100 mb-4 md:mb-6">
                        <h1 className="font-display font-extrabold text-[clamp(2.5rem,10vw,4rem)] md:text-[8.5rem] leading-[0.9] md:leading-[0.85] tracking-[-0.04em] uppercase text-white">
                            {player.name}
                        </h1>
                    </div>

                    {/* Micro-stats Pills */}
                    {player.microStats && player.microStats.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                            {player.microStats.map((stat: string, idx: number) => (
                                <div key={idx} className="flex items-center">
                                    <span className="font-stats font-bold text-[#C9A84C] text-sm md:text-lg tracking-[0.1em] uppercase drop-shadow-md">
                                        {stat}
                                    </span>
                                    {idx < player.microStats.length - 1 && (
                                        <span className="text-[#C9A84C]/40 ml-3 md:ml-4 text-xs md:text-sm">•</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Lore Sentence */}
                    {player.lore && (
                        <p className="font-sans font-light italic text-white/95 text-lg md:text-xl leading-relaxed drop-shadow-md max-w-2xl mt-2">
                            {player.lore}
                        </p>
                    )}
                </div>

                {/* Right Side: Quote Block (pushed down) */}
                <div className="w-full md:max-w-sm border-l-4 border-crimson-red pl-4 md:pl-6 pb-0 relative z-30 self-start md:self-end mt-2 md:mt-0 mb-4 md:mb-2">
                    <p className="font-sans font-medium text-lg md:text-xl text-white/80 italic leading-relaxed drop-shadow-md">
                        "{player.quote}"
                    </p>
                </div>
            </div>
        </section>
    );
}
