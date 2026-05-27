"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Match {
    opponent: string;
    date: string;
    result: string;
}

interface Archive {
    id: string;
    seriesName: string;
    year: string;
    outcome: string;
    matches: Match[];
}

interface ScoreboardClientProps {
    archives: Archive[];
}

const SB_STYLES = `
    /* ── TECTONIC ASYMMETRIC SLANTED FRAMES ── */
    .sb-tectonic-card-0 { clip-path: polygon(0 1.5%, 100% 0, 98.5% 97%, 1% 100%); }
    .sb-tectonic-card-1 { clip-path: polygon(1% 0, 99% 2%, 100% 100%, 0 97%); }
    .sb-tectonic-card-2 { clip-path: polygon(0 0, 100% 1%, 98.5% 98.5%, 1.5% 97%); }
    .sb-tectonic-card-3 { clip-path: polygon(1.5% 1%, 100% 0, 99% 100%, 0 98%); }
    .sb-tectonic-card-4 { clip-path: polygon(0 2%, 98.5% 0, 100% 97%, 1% 99%); }
    .sb-tectonic-card-5 { clip-path: polygon(1% 0, 100% 1.5%, 98.5% 99%, 0 97.5%); }

    /* ── DUOTONE STADIUM OVERLAY ── */
    .sb-campaign-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(30, 58, 138, 0.48) 0%, rgba(196, 30, 58, 0.48) 100%);
        mix-blend-mode: color;
        opacity: 0.95;
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 10;
        pointer-events: none;
    }
    .sb-campaign-card:hover::before {
        opacity: 0;
    }

    /* ── DUST EMBER ANIMATIONS ── */
    .sb-embers-container {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 15;
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    .sb-campaign-card:hover .sb-embers-container {
        opacity: 0.65;
    }
    .sb-ember {
        position: absolute;
        bottom: -12px;
        width: 3.5px;
        height: 3.5px;
        background: #C9A84C;
        border-radius: 50%;
        box-shadow: 0 0 6px #C9A84C, 0 0 12px #C41E3A;
        animation: sbFloatEmber 2.5s infinite linear;
    }
    @keyframes sbFloatEmber {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 0.8; }
        100% { transform: translateY(-140px) translateX(var(--ember-drift, 20px)) scale(0); opacity: 0; }
    }

    /* ── MINI SEISMOGRAPH DB TELEMETRY ── */
    .sb-card-seismo {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(2, 2, 5, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 3px 8px;
        border-radius: 3px;
        backdrop-filter: blur(4px);
        opacity: 0.35;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 20;
    }
    .sb-campaign-card:hover .sb-card-seismo {
        opacity: 1;
        border-color: rgba(201, 168, 76, 0.3);
        box-shadow: 0 0 8px rgba(201, 168, 76, 0.15);
    }
    .sb-seismo-db {
        font-family: monospace;
        font-size: 9px;
        font-weight: 700;
        color: #C9A84C;
        letter-spacing: 0.05em;
    }
    .sb-seismo-bars {
        display: flex;
        align-items: flex-end;
        gap: 2px;
        height: 10px;
    }
    .sb-seismo-bar {
        width: 1.5px;
        height: 100%;
        background: #C41E3A;
        border-radius: 9999px;
        transform-origin: bottom center;
        animation: sbSeismoIdle 1.2s ease-in-out infinite alternate;
        animation-play-state: paused;
    }
    .sb-campaign-card:hover .sb-seismo-bar {
        animation-play-state: running;
        animation-name: sbSeismoActive;
    }
    @keyframes sbSeismoIdle {
        0% { transform: scaleY(0.2); }
        100% { transform: scaleY(0.4); }
    }
    @keyframes sbSeismoActive {
        0% { transform: scaleY(0.3); }
        100% { transform: scaleY(1); }
    }

    /* ── FILTER DOT GLOW ── */
    .sb-filter-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #C9A84C;
        box-shadow: 0 0 6px #C9A84C, 0 0 12px #C9A84C;
    }

    /* ── STADIUM AMBIENT LIGHTS ── */
    .sb-spotlight {
        position: absolute;
        top: -15%;
        left: -15%;
        width: 130%;
        height: 130%;
        background: radial-gradient(circle at 70% 30%, rgba(30, 58, 138, 0.15) 0%, rgba(196, 30, 58, 0.04) 40%, transparent 65%);
        pointer-events: none;
        z-index: 1;
        animation: sbSpotlightSpin 40s linear infinite;
    }
    @keyframes sbSpotlightSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* ── STADIUM LENS FOCUS TRANSITION ── */
    .sb-focus-overlay {
        position: fixed;
        inset: 0;
        background: radial-gradient(circle, rgba(7, 8, 15, 0.25) 0%, rgba(7, 8, 15, 0.98) 100%);
        backdrop-filter: blur(0px);
        opacity: 0;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.6s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .sb-focus-overlay.active {
        backdrop-filter: blur(24px) grayscale(100%);
        opacity: 1;
        pointer-events: auto;
    }
    .sb-focus-spinner {
        width: 44px;
        height: 44px;
        border: 2px solid rgba(201, 168, 76, 0.1);
        border-top-color: #C9A84C;
        border-radius: 50%;
        animation: sbSpin 1s linear infinite;
        box-shadow: 0 0 15px rgba(201,168,76,0.15);
    }
    @keyframes sbSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default function ScoreboardClient({ archives }: ScoreboardClientProps) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string>("सबै अभियानहरू");
    const [transitioning, setTransitioning] = useState<boolean>(false);

    const categories = ["सबै अभियानहरू", "विश्वकप यात्रा", "एकदिवसीय यात्रा", "एसीसी / एशिया कप"];

    // Filter campaigns based on category matches
    const filteredArchives = archives.filter((archive) => {
        if (selectedCategory === "सबै अभियानहरू") return true;
        if (selectedCategory === "विश्वकप यात्रा") return archive.seriesName.includes("विश्वकप");
        if (selectedCategory === "एकदिवसीय यात्रा") return archive.seriesName.includes("ओडीआई") || archive.seriesName.includes("लिग २") || archive.seriesName.includes("सीडब्ल्यूसी");
        if (selectedCategory === "एसीसी / एशिया कप") return archive.seriesName.includes("एसीसी") || archive.seriesName.includes("प्रिमियर") || archive.seriesName.includes("एशिया");
        return true;
    });

    const handleCardClick = (archiveId: string) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([15, 10, 15]); // Physical tactile switch hum
        }
        setTransitioning(true);
        setTimeout(() => {
            router.push(`/scoreboard/${archiveId}`);
        }, 600); // Cinematic 600ms pacing delay
    };

    // Bento spans for visual asymmetry on desktop, collapse on mobile
    const getCardSpan = (idx: number) => {
        if (idx === 0) return "col-span-1 md:col-span-2 md:h-[350px]";
        if (idx === 1) return "col-span-1 md:row-span-2 md:h-[724px]";
        if (idx === 2) return "col-span-1 md:h-[350px]";
        if (idx === 3) return "col-span-1 md:col-span-2 md:h-[350px]";
        return "col-span-1 md:h-[350px]";
    };

    return (
        <div className="relative z-10 w-full">
            <style dangerouslySetInnerHTML={{ __html: SB_STYLES }} />

            {/* Stadium Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <div className="sb-spotlight" />
                <div className="absolute top-1/4 left-1/3 w-[70%] h-[320px] bg-gradient-to-r from-blue-900/10 via-red-950/5 to-transparent blur-[130px]" />
            </div>

            {/* Cinematic Lens Focus Overlay */}
            <div className={`sb-focus-overlay ${transitioning ? "active" : ""}`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="sb-focus-spinner" />
                    <span 
                        style={{ fontFamily: "Mukta, sans-serif" }} 
                        className="text-[#C9A84C]/90 text-[13px] tracking-[0.25em] uppercase font-bold animate-pulse"
                    >
                        स्कोरबोर्ड लोड हुँदैछ... // ACCESSING SCOREBOARD
                    </span>
                </div>
            </div>

            {/* Horizontal Campaign Selector Bar */}
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 mb-12 relative z-30">
                <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-4">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`relative flex items-center gap-2.5 px-6 py-2.5 bg-white/[0.02] border transition-all duration-300 group cursor-pointer ${
                                    isActive 
                                        ? "border-[#C9A84C] bg-white/[0.04] text-[#C9A84C]" 
                                        : "border-white/5 hover:border-white/20 text-[#B0B8C8]/60 hover:text-white"
                                }`}
                                style={{ borderRadius: "2px" }}
                            >
                                {isActive && <div className="sb-filter-dot" />}
                                <span 
                                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "14px", fontWeight: 700 }}
                                    className="tracking-wide"
                                >
                                    {cat}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bento Grid Campaigns Collage */}
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
                    {filteredArchives.map((archive, idx) => {
                        const cardSpan = getCardSpan(idx % 5);
                        
                        // Seed specific DB broadcast values
                        const dbLevels = ["१३१db", "१२८db", "१३४db", "१२६db", "१३२db"];
                        const dbLevel = dbLevels[idx % dbLevels.length];

                        // Seed distinct seismograph bar animation delays
                        const seismoDelays = [
                            [-0.4, -0.2, -0.8, -0.1, -0.6],
                            [-0.1, -0.7, -0.3, -0.9, -0.2],
                            [-0.5, -0.1, -0.6, -0.4, -0.8]
                        ];
                        const delays = seismoDelays[idx % seismoDelays.length];

                        // Custom background photos (cricket theme)
                        const BACKGROUNDS = [
                            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        ];
                        const bgImg = BACKGROUNDS[idx % BACKGROUNDS.length];

                        // Color theme border based on victory
                        const isVictory = archive.outcome.includes("जित") || archive.outcome.includes("विजयी") || archive.outcome.includes("च्याम्पियन");

                        return (
                            <div
                                key={archive.id}
                                onClick={() => handleCardClick(archive.id)}
                                className={`sb-campaign-card sb-tectonic-card-${idx % 6} ${cardSpan} h-[350px] relative rounded-sm overflow-hidden border bg-[#0a0f16]/40 shadow-xl group cursor-pointer transition-all duration-500`}
                                style={{
                                    borderTopWidth: "3px",
                                    borderTopColor: isVictory ? "rgba(201, 168, 76, 0.7)" : "rgba(196, 30, 58, 0.6)",
                                    borderLeftColor: "rgba(255,255,255,0.05)",
                                    borderRightColor: "rgba(255,255,255,0.05)",
                                    borderBottomColor: "rgba(255,255,255,0.05)"
                                }}
                            >
                                {/* Background cover image */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-cover bg-center grayscale-[75%] brightness-[0.4] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:brightness-[0.6] group-hover:scale-103"
                                    style={{ backgroundImage: `url(${bgImg})` }}
                                />

                                {/* Visual vignette gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/55 to-transparent z-10 pointer-events-none" />

                                {/* Ghost Year behind */}
                                <div
                                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "160px", color: "rgba(255,255,255,0.02)", pointerEvents: "none" }}
                                    className="absolute -bottom-10 -right-5 font-black select-none z-10 select-none"
                                >
                                    {archive.year}
                                </div>

                                {/* Floating Gold Embers Particles */}
                                <div className="sb-embers-container">
                                    {[...Array(5)].map((_, ei) => {
                                        const randomDrift = -30 + Math.random() * 60;
                                        const randomLeft = 10 + Math.random() * 80;
                                        const randomDelay = Math.random() * 1.5;
                                        return (
                                            <div
                                                key={ei}
                                                className="sb-ember"
                                                style={{
                                                    left: `${randomLeft}%`,
                                                    animationDelay: `${randomDelay}s`,
                                                    "--ember-drift": `${randomDrift}px`,
                                                } as React.CSSProperties}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Play icon overlay */}
                                <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white/10 bg-black/60 flex items-center justify-center opacity-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 group-hover:border-[#C9A84C]/50">
                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: "9px", height: "9px", color: "#C9A84C" }} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                    </svg>
                                </div>

                                {/* Overlay content */}
                                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end h-full">
                                    <span 
                                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: isVictory ? "#C9A84C" : "#C41E3A", letterSpacing: "0.22em" }} 
                                        className="uppercase font-extrabold mb-1.5 inline-block"
                                    >
                                        {archive.seriesName} · {archive.year}
                                    </span>
                                    <h3 
                                        style={{ fontFamily: "Mukta, sans-serif", fontSize: "22px", fontWeight: 900, lineHeight: 1.2 }}
                                        className="text-white group-hover:text-[#C9A84C] transition-colors duration-300 mb-4 max-w-lg"
                                    >
                                        {archive.outcome}
                                    </h3>
                                    
                                    <div className="flex items-center justify-between gap-4 mt-1 border-t border-white/5 pt-3">
                                        <span 
                                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}
                                            className="font-bold tracking-widest uppercase"
                                        >
                                            म्याच विवरण हेर्नुस् // VIEW SCORES
                                        </span>

                                        {/* Mini Seismograph db meter */}
                                        <div className="sb-card-seismo">
                                            <span className="sb-seismo-db">{dbLevel}</span>
                                            <div className="sb-seismo-bars">
                                                {delays.map((d, bi) => (
                                                    <div
                                                        key={bi}
                                                        className="sb-seismo-bar"
                                                        style={{
                                                            height: `${40 + bi * 15}%`,
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
