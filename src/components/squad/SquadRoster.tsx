'use client'

import playersData from '@/lib/playerData.json'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function SquadRoster() {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [expandedId, setExpandedId] = useState<string | null>(null)

    return (
        <section className="relative bg-[#07080F] py-[80px] md:pb-[120px]">
            {/* Ghost flag watermark */}
            <div className="absolute top-[40px] right-[-60px] w-[320px] h-[400px] opacity-[0.07] pointer-events-none z-0 text-[320px] leading-none text-[#C41E3A] select-none">
                ◈
            </div>

            {/* Section header */}
            <div className="px-6 md:px-[80px] mb-8 md:mb-[48px] flex items-center gap-4 relative z-10">
                <div className="w-[32px] h-[1px] bg-[#C9A84C]" />
                <span className="font-display text-[12px] text-[#C9A84C] tracking-[0.25em] uppercase px-3 py-1 border border-[#C9A84C]/30 rounded-full bg-[#C9A84C]/5">
                    CAMPAIGN 2026
                </span>
                <div className="flex-1 h-[1px] bg-white/5" />
                <span className="font-display text-[11px] text-white/25 tracking-[0.15em] hidden md:block">
                    {playersData.length} WARRIORS
                </span>
            </div>

            {/* Player roster */}
            <div className="flex flex-col gap-[2px] relative z-10">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(playersData as any[]).map((player, index: number) => {
                    const isHovered = hoveredId === player.id;
                    const isExpanded = expandedId === player.id;
                    const isDesktopHovered = isHovered; // Hover logic for desktop

                    // Determine Captain / Vice Captain status
                    const isCaptain = player.position?.toLowerCase().includes('captain') && !player.position?.toLowerCase().includes('vice');
                    const isViceCaptain = player.position?.toLowerCase().includes('vice captain');

                    // Stat parsing logic
                    const hasStats = Boolean(player.stats?.runs || player.stats?.wickets || player.stats?.t20i?.runs || player.stats?.t20i?.wickets);
                    let displayStatValue = '—';
                    let displayStatLabel = 'DEBUT 2026';

                    if (player.status === 'retired') {
                        displayStatValue = 'RETIRED';
                        displayStatLabel = player.retirementYear ? String(player.retirementYear) : 'LEGEND';
                    } else if (hasStats) {
                        displayStatValue = player.stats?.t20i?.wickets
                            ? String(player.stats.t20i.wickets)
                            : (player.stats?.wickets
                                ? String(player.stats.wickets)
                                : (player.stats?.t20i?.runs
                                    ? String(player.stats.t20i.runs)
                                    : String(player.stats?.runs ?? '0')));

                        displayStatLabel = (player.stats?.t20i?.wickets || player.stats?.wickets) ? 'WICKETS' : 'RUNS';
                    }

                    return (
                        <Link
                            key={player.id}
                            href={`/squad/${player.id}`}
                            className="bg-transparent hover:bg-gradient-to-r hover:from-[#c41e3a14] hover:via-[#0d1b2a99] hover:to-transparent border-l-[3px] border-transparent hover:border-[#C41E3A] border-b border-b-white/5 transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer no-underline block"
                            style={{
                                opacity: player.status === 'retired' && !isHovered ? 0.6 : 1,
                            }}
                            onMouseEnter={() => setHoveredId(player.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={(e) => {
                                // On mobile, first tap expands lore, second navigates
                                if (window.innerWidth <= 768) {
                                    if (!isExpanded) {
                                        e.preventDefault();
                                        setExpandedId(player.id);
                                    }
                                }
                            }}
                        >
                            <div className="grid grid-cols-[24px_48px_1fr_auto] md:grid-cols-[60px_80px_1fr_auto_auto] items-center gap-x-4 md:gap-x-6 py-4 md:py-5 px-6 md:px-[80px] hover:py-6 transition-all duration-400">

                                {/* 1. Number */}
                                <div className="font-display text-[11px] md:text-[13px] text-white/20 group-hover:text-[#C9A84C] tracking-[0.1em] transition-colors duration-400">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* 2. Photo / Initial Circle */}
                                <div className="flex justify-center items-center">
                                    <div className={`relative rounded-full overflow-hidden bg-[#1a1a2e] border-[#C9A84C]/50 transition-all duration-300 flex justify-center items-center ${isHovered ? 'w-[44px] h-[44px] md:w-[56px] md:h-[56px] border-2' : 'w-[36px] h-[36px] md:w-[48px] md:h-[48px] border border-white/10'}`}>
                                        {player.image || player.heroImage ? (
                                            <Image
                                                src={player.image || player.heroImage}
                                                alt={player.name}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <span className={`font-display text-[#C9A84C] font-bold transition-all duration-300 ${isHovered ? 'text-[16px] md:text-[20px]' : 'text-[14px] md:text-[16px]'}`}>
                                                {player.name.split(' ').map((n: string) => n[0]).join('')}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 3. Player Name & Lore/Role Toggle */}
                                <div className="relative top-[2px] flex flex-col justify-center">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                                        <div className="font-display text-[clamp(18px,4vw,36px)] font-bold text-white tracking-[0.05em] uppercase leading-[1.1]">
                                            {player.name}
                                        </div>
                                        {/* Leadership Badges */}
                                        {(isCaptain || isViceCaptain) && (
                                            <div className="bg-[#C9A84C]/10 border border-[#C9A84C] text-[#C9A84C] text-[9px] md:text-[10px] font-display font-bold px-[6px] py-[2px] rounded-[2px] tracking-[0.1em]">
                                                {isCaptain ? 'C' : 'VC'}
                                            </div>
                                        )}

                                        {/* Status & Achievement Badges */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {player.status === 'injured' && (
                                                <div className="flex items-center gap-1 bg-[#B45309] text-white px-1.5 py-0.5 rounded-[2px] font-display text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
                                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[8px] h-[8px] md:w-2 md:h-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                    INJURED
                                                </div>
                                            )}
                                            {player.status === 'suspended' && (
                                                <div className="bg-[#8B0000] text-white px-1.5 py-0.5 rounded-[2px] font-display text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
                                                    SUSPENDED
                                                </div>
                                            )}
                                            {/* Achievement Tags */}
                                            {player.achievements && player.achievements.length > 0 && (
                                                <div className="hidden md:flex bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] px-1.5 py-0.5 rounded-[2px] font-display text-[10px] font-bold tracking-[0.15em] uppercase items-center gap-1">
                                                    {player.achievements[0]}
                                                    {player.achievements.length > 1 && (
                                                        <span className="text-[#C9A84C]/50 ml-0.5">+{player.achievements.length - 1}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Role & Lore Container */}
                                    <div className="relative overflow-hidden w-full flex flex-col md:block" style={{ height: 'auto', minHeight: '24px' }}>
                                        {/* Original Role Label */}
                                        <div className={`
                                            font-sans text-[12px] md:text-[13px] text-white/30 tracking-normal
                                            md:absolute md:top-0 md:left-0 md:w-full
                                            transition-all duration-250 ease-out
                                            ${isDesktopHovered ? 'md:translate-y-[-100%] md:opacity-0' : 'md:translate-y-0 md:opacity-100'}
                                            ${isExpanded ? 'hidden' : 'hidden md:block'}
                                        `}>
                                            {player.role}
                                        </div>

                                        {/* Lore Sentence */}
                                        <div className={`
                                            font-sans flex items-center italic text-[12px] md:text-[13.5px] text-[#C9A84C] tracking-normal
                                            md:absolute md:top-0 md:left-0 w-full min-h-[24px]
                                            transition-all duration-300 ease-in-out
                                            md:whitespace-nowrap md:text-ellipsis md:overflow-hidden
                                            ${isDesktopHovered ? 'md:translate-y-0 md:opacity-100' : 'md:translate-y-[100%] md:opacity-0'}
                                            ${isExpanded ? 'opacity-100 max-h-[100px] mt-1' : 'opacity-0 max-h-0 md:max-h-none md:mt-0'}
                                            block md:block
                                        `}>
                                            {player.lore || player.keyMoment}
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Key stat */}
                                <div className={`text-right transition-opacity duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${isHovered ? 'opacity-100' : (hasStats ? 'opacity-30' : 'opacity-100')}`}>
                                    <div className={`font-display font-bold tracking-[0.02em] leading-none text-white ${player.status === 'retired' ? 'text-[1.2rem] md:text-[clamp(24px,3vw,36px)]' : 'text-[1.5rem] md:text-[clamp(28px,3.5vw,48px)]'} ${!hasStats ? 'text-white/15' : ''}`}>
                                        {displayStatValue}
                                    </div>
                                    <div className={`font-display text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-0.5 md:mt-1 ${hasStats ? 'text-white/35' : 'text-[#C9A84C]'}`}>
                                        {displayStatLabel}
                                    </div>
                                </div>

                                {/* 5. Arrow (hidden on mobile) */}
                                <div className={`hidden md:block font-display text-[20px] text-[#C41E3A] transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-8px]'}`}>
                                    →
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Closing line */}
            <div className="text-center pt-[60px] md:pt-[80px] px-6">
                <p className="font-sans italic text-[clamp(14px,1.6vw,17px)] text-white/20 tracking-normal m-0">
                    यी योद्धाहरू मैदानमा मात्र होइन — इतिहासमा लेखिन्छन्।
                </p>
            </div>
        </section>
    )
}
