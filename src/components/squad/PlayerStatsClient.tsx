"use client";

import { useState } from "react";
import AnimatedStatCard from "./AnimatedStatCard";

interface StatSet {
    runs?: number;
    average?: number;
    strikeRate?: number;
    wickets?: number;
    bestBowling?: string;
}

interface PlayerProp {
    stats?: {
        odi?: StatSet;
        t20i?: StatSet;
        runs?: number;
        average?: number;
        strikeRate?: number;
        wickets?: number;
    };
    records?: string[];
    iccRanking?: string;
}

interface PlayerStatsClientProps {
    player: PlayerProp;
}

export default function PlayerStatsClient({ player }: PlayerStatsClientProps) {
    const [activeTab, setActiveTab] = useState<"odi" | "t20i">("odi");

    const stats = player.stats?.[activeTab];
    const hasStats = !!stats;

    return (
        <section className="py-24 bg-[#07080F] border-t border-white/5 relative overflow-hidden">
            {/* Decorative background logo slice */}
            <div className="absolute -right-[60px] top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
                <span className="font-display font-black text-[42rem] leading-none text-stadium-white select-none">C</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <h2
                    className="font-bold text-[12px] tracking-[0.2em] text-[#C9A84C] mb-8 uppercase text-center"
                    style={{ fontFamily: 'var(--font-barlow, sans-serif)' }}
                >
                    CAREER HIGHLIGHTS
                </h2>

                {/* Section 1 - FORMAT TABS */}
                {player.stats && player.stats.odi && player.stats.t20i && (
                    <div className="flex justify-center mb-10">
                        <div className="flex bg-[#1a1a2e]/50 rounded-full p-1 border border-white/5 backdrop-blur-sm">
                            <button
                                onClick={() => setActiveTab("odi")}
                                className={`px-8 py-2.5 rounded-full font-sans font-bold text-sm tracking-wider uppercase transition-all duration-300 ${activeTab === "odi"
                                        ? "bg-[#C41E3A] text-white shadow-[0_0_15px_rgba(196,30,58,0.5)]"
                                        : "text-[#B0B8C8] hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                ODI
                            </button>
                            <button
                                onClick={() => setActiveTab("t20i")}
                                className={`px-8 py-2.5 rounded-full font-sans font-bold text-sm tracking-wider uppercase transition-all duration-300 ${activeTab === "t20i"
                                        ? "bg-[#C41E3A] text-white shadow-[0_0_15px_rgba(196,30,58,0.5)]"
                                        : "text-[#B0B8C8] hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                T20I
                            </button>
                        </div>
                    </div>
                )}

                {/* Section 2 - STAT TILES */}
                {hasStats ? (
                    <div className="flex flex-wrap justify-center items-stretch gap-6 mb-12">
                        {/* Always show Runs, Average, Strike Rate */}
                        <div className="flex-1 min-w-[140px] max-w-[240px]">
                            <AnimatedStatCard label="Runs" value={stats.runs?.toString() || "0"} />
                        </div>
                        <div className="flex-1 min-w-[140px] max-w-[240px]">
                            <AnimatedStatCard label="Average" value={stats.average?.toString() || "0"} />
                        </div>
                        <div className="flex-1 min-w-[140px] max-w-[240px]">
                            <AnimatedStatCard label="Strike Rate" value={stats.strikeRate?.toString() || "0"} />
                        </div>

                        {/* Gracefully show Wickets & Best Bowling only if wickets exist and > 0 */}
                        {stats.wickets !== undefined && stats.wickets !== null && stats.wickets > 0 && (
                            <>
                                <div className="flex-1 min-w-[140px] max-w-[240px]">
                                    <AnimatedStatCard label="Wickets" value={stats.wickets.toString()} />
                                </div>
                                {stats.bestBowling && (
                                    <div className="flex-1 min-w-[140px] max-w-[240px]">
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center transform hover:-translate-y-2 hover:border-[rgba(196,30,58,0.25)] hover:shadow-[0_0_24px_rgba(196,30,58,0.12)] transition-all duration-300 relative z-10 group h-full">
                                            <span className="font-stats tracking-[0.15em] text-[#C9A84C] uppercase text-[12px] mb-4">
                                                Best Bowling
                                            </span>
                                            <span className="font-display font-black text-5xl md:text-6xl text-stadium-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] tracking-[-0.02em] group-hover:text-[#C41E3A] transition-colors duration-300">
                                                {stats.bestBowling}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    // Fallback to old stats format if no odi/t20i split exists
                    <div className="flex flex-wrap justify-center items-stretch gap-6 mb-12">
                        {player.stats?.runs && (
                            <div className="flex-1 min-w-[140px] max-w-[240px]">
                                <AnimatedStatCard label="Runs" value={player.stats.runs.toString()} />
                            </div>
                        )}
                        {player.stats?.average && (
                            <div className="flex-1 min-w-[140px] max-w-[240px]">
                                <AnimatedStatCard label="Average" value={player.stats.average.toString()} />
                            </div>
                        )}
                        {player.stats?.strikeRate && (
                            <div className="flex-1 min-w-[140px] max-w-[240px]">
                                <AnimatedStatCard label="Strike Rate" value={player.stats.strikeRate.toString()} />
                            </div>
                        )}
                        {player.stats?.wickets && (
                            <div className="flex-1 min-w-[140px] max-w-[240px]">
                                <AnimatedStatCard label="Wickets" value={player.stats.wickets.toString()} />
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mt-12">
                    {/* Section 3 - WORLD RECORDS STRIP */}
                    <div className="w-full lg:flex-1">
                        {player.records && player.records.length > 0 && (
                            <div className="bg-[#C9A84C]/10 border-l-4 border-[#C9A84C] py-4 px-6 md:px-8 rounded-r-lg inline-block w-full backdrop-blur-sm">
                                <ul className="space-y-3">
                                    {player.records.map((record: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-[#C9A84C] mr-3 mt-1 text-xs">◆</span>
                                            <span className="font-stats font-semibold tracking-wide text-white uppercase text-sm md:text-base leading-relaxed">
                                                {record}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Section 4 - ICC RANKING BADGE */}
                    {player.iccRanking && (
                        <div className="shrink-0 flex flex-col items-end">
                            <div className="bg-[#1a1a2e] border border-[#C9A84C] rounded-full px-6 py-2.5 shadow-[0_0_15px_rgba(201,168,76,0.15)] flex items-center mb-1">
                                <span className="font-sans font-bold text-[#C9A84C] text-[11px] md:text-[13px] tracking-wider uppercase">
                                    {player.iccRanking.split(' (')[0]}
                                </span>
                            </div>
                            {player.iccRanking.includes('(as of') && (
                                <span className="text-[#B0B8C8]/60 text-[10px] md:text-xs font-sans italic pr-2">
                                    {player.iccRanking.match(/\(([^)]+)\)/)?.[1] || ""}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
