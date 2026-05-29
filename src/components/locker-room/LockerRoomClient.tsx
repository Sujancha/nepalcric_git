"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LockerSoundscape from "./LockerSoundscape";
import LockerRow from "./LockerRow";

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
    /* ── STADIUIM AMBIENT SPOTLIGHT ROTATION ── */
    .lr-spotlight {
        position: absolute;
        top: -20%;
        left: -10%;
        width: 120%;
        height: 140%;
        background: radial-gradient(circle at 30% 20%, rgba(30, 58, 138, 0.08) 0%, rgba(196, 30, 58, 0.02) 45%, transparent 70%);
        pointer-events: none;
        z-index: 1;
        animation: lrSpotlightSpin 40s linear infinite;
    }
    @keyframes lrSpotlightSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* ── ERA SELECTOR ACTIVE DOT ── */
    .lr-era-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #C9A84C;
        box-shadow: 0 0 8px #C9A84C;
    }
`;

export default function LockerRoomClient({ stories }: LockerRoomClientProps) {
    const router = useRouter();
    const [selectedEra, setSelectedEra] = useState<string>("सबै कथाहरू");

    // List of unique eras extracted from stories
    const eras = ["सबै कथाहरू", ...Array.from(new Set(stories.map((s) => s.era)))];

    // Filter stories based on selected Era
    const filteredStories = selectedEra === "सबै कथाहरू" 
        ? stories 
        : stories.filter((s) => s.era === selectedEra);

    // Instant routing transition
    const handleCardClick = (storyId: string) => {
        router.push(`/locker-room/${storyId}`);
    };

    return (
        <div className="relative z-10 w-full">
            <style dangerouslySetInnerHTML={{ __html: LR_STYLES }} />

            {/* Stadium Ambient Backdrop */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <div className="lr-spotlight" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gradient-to-r from-blue-900/5 via-red-950/2 to-transparent blur-[120px]" />
            </div>

            {/* Headless Soundscape (procedurally generates tactile click/clangs on locker interaction) */}
            <LockerSoundscape />

            {/* Interactive 3D Swinging Player Locker Cabinets */}
            <LockerRow />

            {/* Era Filter Selector Bar */}
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 mb-12 relative z-30">
                <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-4">
                    {eras.map((era) => {
                        const isActive = selectedEra === era;
                        return (
                            <button
                                key={era}
                                onClick={() => setSelectedEra(era)}
                                className={`relative flex items-center gap-2.5 px-6 py-2.5 bg-white/[0.01] border transition-all duration-300 group cursor-pointer ${
                                    isActive 
                                        ? "border-[#C9A84C] bg-white/[0.03] text-[#C9A84C]" 
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

            {/* Symmetrical, Premium Stories Grid */}
            <section className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStories.map((story) => {
                        return (
                            <div
                                key={story.id}
                                onClick={() => handleCardClick(story.id)}
                                className="group relative h-[280px] rounded-sm overflow-hidden border border-white/5 bg-[#0a0f16]/30 shadow-lg cursor-pointer transition-all duration-500 hover:border-[#C9A84C]/30 hover:scale-[1.01]"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-cover bg-center grayscale-[20%] brightness-[0.5] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:brightness-[0.6] group-hover:scale-105"
                                    style={{ backgroundImage: `url(${story.thumb})` }}
                                />

                                {/* Subtle bottom gradient overlay for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/40 to-transparent z-10 pointer-events-none" />

                                {/* Play button indicator overlay (shows on hover) */}
                                <div className="absolute top-4 right-4 z-20 w-7 h-7 rounded-full border border-white/10 bg-black/50 flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:border-[#C9A84C]/45">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[#C9A84C]" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                    </svg>
                                </div>

                                {/* Text Content */}
                                <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end h-full">
                                    <span 
                                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10.5px", color: "#C9A84C", letterSpacing: "0.2em" }} 
                                        className="uppercase font-bold mb-1 block"
                                    >
                                        {story.era}
                                    </span>
                                    
                                    <h3 
                                        style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", fontWeight: 800, lineHeight: 1.3 }}
                                        className="text-white group-hover:text-[#C9A84C] transition-colors duration-300 mb-2.5"
                                    >
                                        {story.title}
                                    </h3>
                                    
                                    <div className="flex items-center justify-between border-t border-white/5 pt-2.5 mt-0.5">
                                        <span 
                                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}
                                            className="font-bold tracking-wider"
                                        >
                                            {story.date}
                                        </span>
                                        
                                        <span 
                                            style={{ fontFamily: "Mukta, sans-serif", fontSize: "11px" }}
                                            className="text-[#C9A84C]/0 group-hover:text-[#C9A84C]/90 font-bold transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                                        >
                                            कथा पढ्नुहोस् →
                                        </span>
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
