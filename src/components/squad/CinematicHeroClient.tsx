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
            className="relative w-full h-[70vh] flex items-end pb-16 overflow-hidden bg-slate-dark"
        >
            {/* Step 2: Mouse-Tracked Cinematic Spotlight */}
            <div
                className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 mix-blend-color-dodge"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 80%)`,
                }}
            />

            {/* Layer 1: Ghost Text (Solid-State Depth) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] z-0 pointer-events-none w-full flex justify-center">
                <span className="font-display font-black text-[15vw] leading-none tracking-[-0.05em] uppercase text-slate-50 opacity-5 blur-sm select-none">
                    {firstName}
                </span>
            </div>

            {/* Layer 2: Middle Image with Parallax & Cutout Mask */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    transform: `translateY(${scrollY * 0.2}px)`,
                }}
            >
                {player.heroImage ? (
                    <Image
                        src={player.heroImage}
                        alt={`${player.name} Hero`}
                        fill
                        className="object-cover object-[center_20%] opacity-60 mix-blend-screen"
                        style={{
                            // Strict mask-image to fade edges for a cutout feel if it's a solid photo
                            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                        }}
                        priority
                    />
                ) : (
                    <Image
                        src="/images/tu_ground.gif"
                        alt="Fallback Hero"
                        fill
                        className="object-cover object-[center_20%] opacity-40 mix-blend-screen"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                        }}
                        priority
                        unoptimized
                    />
                )}
            </div>

            {/* Cinematic Vignette Overlay Stack (Below Foreground Text) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)' }}
            />
            {/* Localized 'Fog' Overlay (Behind Foreground Text) */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-90 backdrop-blur-sm bg-slate-950/20" />

            {/* Layer 2: Foreground Text & Information */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 translate-y-5">
                <div>
                    <div className="flex gap-3 mb-4 flex-wrap">
                        <span className="inline-block px-4 py-1.5 backdrop-blur-lg border border-white/10 bg-gradient-to-b from-red-600 to-red-800 drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] text-stadium-white font-display font-extrabold text-sm tracking-normal uppercase rounded relative z-30">
                            {player.role}
                        </span>
                        {player.id === 'dipendra-singh-airee' && (
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-lg border border-white/10 bg-gradient-to-b from-red-600 to-red-800 drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] text-stadium-white font-display font-extrabold text-sm tracking-normal uppercase rounded relative z-30">
                                वर्ल्ड रेकर्ड
                            </span>
                        )}
                        {player.id === 'kushal-bhurtel' && (
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-lg border border-white/10 bg-gradient-to-b from-red-600 to-red-800 drop-shadow-[0_0_12px_rgba(220,38,38,0.6)] text-stadium-white font-display font-extrabold text-sm tracking-normal uppercase rounded relative z-30">
                                बुटवल बोस
                            </span>
                        )}
                    </div>

                    {/* Premium Atmospheric Solid-State Typography */}
                    <div className="relative z-20 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-92">
                        <h1
                            className="font-display font-extrabold text-7xl md:text-9xl leading-[0.85] tracking-[-0.04em] uppercase text-transparent bg-clip-text"
                            style={{
                                backgroundImage: `linear-gradient(to bottom, #FFFFFF 0%, #888888 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {player.name}
                        </h1>
                    </div>
                </div>

                <div className="max-w-xs border-l-4 border-crimson-red pl-6 pb-2 relative z-30">
                    <p className="font-sans font-medium text-xl text-stadium-white/80 italic leading-relaxed">
                        "{player.quote}"
                    </p>
                </div>
            </div>
        </section>
    );
}
