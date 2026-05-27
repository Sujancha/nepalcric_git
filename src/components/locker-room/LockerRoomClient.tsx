"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ArchiveStory {
    id: string;
    title: string;
    date: string;
    era: string;
    description: string;
    thumb: string;
}

interface LockerRoomClientProps {
    stories: ArchiveStory[];
}

const LR_STYLES = `
    /* ── TECTONIC ASYMMETRIC SLANTED FRAMES ── */
    .lr-tectonic-card-0 { clip-path: polygon(0 1.5%, 100% 0, 98.5% 97%, 1% 100%); }
    .lr-tectonic-card-1 { clip-path: polygon(1% 0, 99% 2%, 100% 100%, 0 97%); }
    .lr-tectonic-card-2 { clip-path: polygon(0 0, 100% 1%, 98.5% 98.5%, 1.5% 97%); }
    .lr-tectonic-card-3 { clip-path: polygon(1.5% 1%, 100% 0, 99% 100%, 0 98%); }
    .lr-tectonic-card-4 { clip-path: polygon(0 2%, 98.5% 0, 100% 97%, 1% 99%); }
    .lr-tectonic-card-5 { clip-path: polygon(1% 0, 100% 1.5%, 98.5% 99%, 0 97.5%); }

    /* ── DUOTONE STADIUM OVERLAY ── */
    .lr-story-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(30, 58, 138, 0.5) 0%, rgba(196, 30, 58, 0.5) 100%);
        mix-blend-mode: color;
        opacity: 0.9;
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 10;
        pointer-events: none;
    }
    .lr-story-card:hover::before {
        opacity: 0;
    }

    /* ── DUST EMBER ANIMATIONS ── */
    .lr-embers-container {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 15;
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    .lr-story-card:hover .lr-embers-container {
        opacity: 0.7;
    }
    .lr-ember {
        position: absolute;
        bottom: -12px;
        width: 3.5px;
        height: 3.5px;
        background: #C9A84C;
        border-radius: 50%;
        box-shadow: 0 0 6px #C9A84C, 0 0 12px #C41E3A;
        animation: lrFloatEmber 2.4s infinite linear;
    }
    @keyframes lrFloatEmber {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 0.8; }
        100% { transform: translateY(-140px) translateX(var(--ember-drift, 25px)) scale(0); opacity: 0; }
    }

    /* ── MINI SEISMOGRAPH DB TELEMETRY ── */
    .lr-card-seismo {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(2, 2, 5, 0.82);
        border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 3px 8px;
        border-radius: 3px;
        backdrop-filter: blur(4px);
        opacity: 0.35;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 20;
    }
    .lr-story-card:hover .lr-card-seismo {
        opacity: 1;
        border-color: rgba(201, 168, 76, 0.3);
        box-shadow: 0 0 8px rgba(201, 168, 76, 0.15);
    }
    .lr-seismo-db {
        font-family: monospace;
        font-size: 9px;
        font-weight: 700;
        color: #C9A84C;
        letter-spacing: 0.05em;
    }
    .lr-seismo-bars {
        display: flex;
        align-items: flex-end;
        gap: 2px;
        height: 10px;
    }
    .lr-seismo-bar {
        width: 1.5px;
        height: 100%;
        background: #C41E3A;
        border-radius: 9999px;
        transform-origin: bottom center;
        animation: lrSeismoIdle 1.2s ease-in-out infinite alternate;
        animation-play-state: paused;
    }
    .lr-story-card:hover .lr-seismo-bar {
        animation-play-state: running;
        animation-name: lrSeismoActive;
    }
    @keyframes lrSeismoIdle {
        0% { transform: scaleY(0.2); }
        100% { transform: scaleY(0.4); }
    }
    @keyframes lrSeismoActive {
        0% { transform: scaleY(0.3); }
        100% { transform: scaleY(1); }
    }

    /* ── ERA SELECTOR GLOW ── */
    .lr-era-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #C9A84C;
        box-shadow: 0 0 6px #C9A84C, 0 0 12px #C9A84C;
        transition: transform 0.3s ease;
    }

    /* ── STADIUM SPOTLIGHT ROTATION ── */
    .lr-spotlight {
        position: absolute;
        top: -20%;
        left: -10%;
        width: 120%;
        height: 140%;
        background: radial-gradient(circle at 30% 20%, rgba(30, 58, 138, 0.12) 0%, rgba(196, 30, 58, 0.03) 45%, transparent 70%);
        pointer-events: none;
        z-index: 1;
        animation: lrSpotlightSpin 30s linear infinite;
    }
    @keyframes lrSpotlightSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* ── CINEMATIC LENS FOCUS TRANSITION ── */
    .lr-focus-overlay {
        position: fixed;
        inset: 0;
        background: radial-gradient(circle, rgba(7, 8, 15, 0.2) 0%, rgba(7, 8, 15, 0.98) 100%);
        backdrop-filter: blur(0px);
        opacity: 0;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.6s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .lr-focus-overlay.active {
        backdrop-filter: blur(24px) grayscale(100%);
        opacity: 1;
        pointer-events: auto;
    }
    .lr-focus-spinner {
        width: 44px;
        height: 44px;
        border: 2px solid rgba(201, 168, 76, 0.1);
        border-top-color: #C9A84C;
        border-radius: 50%;
        animation: lrSpin 1s linear infinite;
        box-shadow: 0 0 15px rgba(201,168,76,0.15);
    }
    @keyframes lrSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default function LockerRoomClient({ stories }: LockerRoomClientProps) {
    const router = useRouter();
    const [selectedEra, setSelectedEra] = useState<string>("सबै कथाहरू");
    const [transitioning, setTransitioning] = useState<boolean>(false);

    // List of unique eras extracted from stories
    const eras = ["सबै कथाहरू", ...Array.from(new Set(stories.map((s) => s.era)))];

    // Filter stories based on selected Era
    const filteredStories = selectedEra === "सबै कथाहरू" 
        ? stories 
        : stories.filter((s) => s.era === selectedEra);

    // Handles premium focal route transitions
    const handleCardClick = (storyId: string) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([15, 10, 15]); // Physical dual haptic tick
        }
        setTransitioning(true);
        setTimeout(() => {
            router.push(`/locker-room/${storyId}`);
        }, 600000 / 1000); // Perfect 600ms pacing delay
    };

    // Card spans generator mapping strictly to tectonic asymmetry on desktop and collapse on mobile
    const getCardSpan = (idx: number) => {
        if (idx === 0) return "col-span-1 md:col-span-2 md:h-[340px]";
        if (idx === 1) return "col-span-1 md:row-span-2 md:h-[704px]";
        if (idx === 2) return "col-span-1 md:h-[340px]";
        if (idx === 3) return "col-span-1 md:col-span-2 md:h-[340px]";
        if (idx === 4) return "col-span-1 md:h-[340px]";
        return "col-span-1 md:col-span-2 md:h-[340px]";
    };

    return (
        <div className="relative z-10 w-full">
            <style dangerouslySetInnerHTML={{ __html: LR_STYLES }} />

            {/* Stadium Ambient Backdrop */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <div className="lr-spotlight" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gradient-to-r from-blue-900/10 via-red-950/5 to-transparent blur-[120px]" />
            </div>

            {/* Cinematic Lens Focus Overlay */}
            <div className={`lr-focus-overlay ${transitioning ? "active" : ""}`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="lr-focus-spinner" />
                    <span 
                        style={{ fontFamily: "Mukta, sans-serif" }} 
                        className="text-[#C9A84C]/90 text-[13px] tracking-[0.25em] uppercase font-bold animate-pulse"
                    >
                        इतिहास खोल्दै... // ENTERING STORY
                    </span>
                </div>
            </div>

            {/* Horizontal Era Selector Bar */}
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 mb-12 relative z-30">
                <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-4">
                    {eras.map((era) => {
                        const isActive = selectedEra === era;
                        return (
                            <button
                                key={era}
                                onClick={() => setSelectedEra(era)}
                                className={`relative flex items-center gap-2.5 px-6 py-2.5 bg-white/[0.02] border transition-all duration-300 group cursor-pointer ${
                                    isActive 
                                        ? "border-[#C9A84C] bg-white/[0.04] text-[#C9A84C]" 
                                        : "border-white/5 hover:border-white/20 text-[#B0B8C8]/60 hover:text-white"
                                }`}
                                style={{ borderRadius: "2px" }}
                            >
                                {isActive && <div className="lr-era-dot" />}
                                <span 
                                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "14px", fontWeight: 700 }}
                                    className="tracking-wide"
                                >
                                    {era}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bento Grid Stories Collage */}
            <section className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto">
                <div 
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "24px",
                        gridAutoFlow: "dense"
                    }}
                    className="md:grid-cols-3"
                >
                    {filteredStories.map((story, idx) => {
                        const cardSpan = getCardSpan(idx % 6);
                        
                        // Seed specific DB values to simulate live broadcast data
                        const dbLevels = ["१३२db", "१२४db", "१२८db", "१३५db", "१३१db", "१३३db"];
                        const dbLevel = dbLevels[idx % dbLevels.length];

                        // Seed distinct seismograph bar animation delays
                        const seismoDelays = [
                            [-0.2, -0.7, -0.4, -0.9, -0.1],
                            [-0.5, -0.1, -0.8, -0.3, -0.6],
                            [-0.1, -0.4, -0.2, -0.7, -0.5]
                        ];
                        const delays = seismoDelays[idx % seismoDelays.length];

                        return (
                            <div
                                key={story.id}
                                onClick={() => handleCardClick(story.id)}
                                className={`lr-story-card lr-tectonic-card-${idx % 6} ${cardSpan} h-[340px] relative rounded-sm overflow-hidden border border-white/5 bg-[#0a0f16]/40 shadow-xl group cursor-pointer transition-all duration-500 hover:border-[#C9A84C]/40 hover:scale-[1.02]`}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-cover bg-center grayscale-[65%] brightness-[0.55] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:brightness-[0.75] group-hover:scale-105"
                                    style={{ backgroundImage: `url(${story.thumb})` }}
                                />

                                {/* Gritty overlay vignette */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/45 to-transparent z-10 pointer-events-none" />

                                {/* Floating Gold Embers Particles */}
                                <div className="lr-embers-container">
                                    {[...Array(5)].map((_, ei) => {
                                        const randomDrift = -30 + Math.random() * 60;
                                        const randomLeft = 10 + Math.random() * 80;
                                        const randomDelay = Math.random() * 1.5;
                                        return (
                                            <div
                                                key={ei}
                                                className="lr-ember"
                                                style={{
                                                    left: `${randomLeft}%`,
                                                    animationDelay: `${randomDelay}s`,
                                                    "--ember-drift": `${randomDrift}px`,
                                                } as React.CSSProperties}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Cinematic play plus badge overlay */}
                                <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white/10 bg-black/60 flex items-center justify-center opacity-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 group-hover:border-[#C9A84C]/50">
                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: "10px", height: "10px", color: "#C9A84C" }} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                    </svg>
                                </div>

                                {/* Dynamic Telemetry Overlay (Bottom Left) */}
                                <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end h-full">
                                    <span 
                                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.22em" }} 
                                        className="uppercase font-bold mb-1.5 inline-block"
                                    >
                                        {story.era}
                                    </span>
                                    <h3 
                                        style={{ fontFamily: "Mukta, sans-serif", fontSize: "20px", fontWeight: 800, lineHeight: 1.25 }}
                                        className="text-white group-hover:text-[#C9A84C] transition-colors duration-300 mb-2"
                                    >
                                        {story.title}
                                    </h3>
                                    
                                    <div className="flex items-center justify-between gap-4 mt-1 border-t border-white/5 pt-3">
                                        <span 
                                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}
                                            className="font-bold tracking-wide"
                                        >
                                            {story.date}
                                        </span>

                                        {/* Mini Seismograph db meter */}
                                        <div className="lr-card-seismo">
                                            <span className="lr-seismo-db">{dbLevel}</span>
                                            <div className="lr-seismo-bars">
                                                {delays.map((d, bi) => (
                                                    <div
                                                        key={bi}
                                                        className="lr-seismo-bar"
                                                        style={{
                                                            height: `${35 + bi * 15}%`,
                                                            animationDelay: `${d}s`,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
