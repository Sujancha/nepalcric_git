'use client'

import playersData from '@/lib/playerData.json'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const NEPAL_NAMES: Record<string, string> = {
    "rohit-paudel": "रोहित कुमार पौडेल",
    "dipendra-singh-airee": "दिपेन्द्र सिंह ऐरी",
    "sandeep-lamichhane": "सन्दीप लामिछाने",
    "kushal-bhurtel": "कुशल भुर्तेल",
    "aasif-sheikh": "आसिफ शेख",
    "sompal-kami": "सोमपाल कामी",
    "karan-kc": "करण केसी",
    "aarif-sheikh": "आरिफ शेख",
    "basir-ahamad": "बासिर अहमद",
    "gulshan-jha": "गुलशन झा",
    "nandan-yadav": "नन्दन यादव",
    "lalit-rajbanshi": "ललित राजवंशी",
    "sher-malla": "शेर मल्ल",
    "lokesh-bam": "लोकेश बम",
    "sundeep-jora": "सुन्दीप जोरा"
};

export default function SquadRoster() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Find the currently active player for the dynamic Dossier panel
    const activePlayer = playersData.find(p => p.id === (hoveredId || selectedId)) || null;

    return (
        <section className="relative bg-[#07080F] py-[40px] md:py-[80px] md:pb-[120px]">
            {/* Ghost flag watermark */}
            <div className="absolute top-[40px] right-[-60px] w-[320px] h-[400px] opacity-[0.05] pointer-events-none z-0 text-[320px] leading-none text-[#C41E3A] select-none">
                ◈
            </div>

            {/* Section header */}
            <div className="px-6 md:px-[80px] mb-8 md:mb-[48px] flex items-center gap-4 relative z-10">
                <div className="w-[32px] h-[1px] bg-[#C9A84C]" />
                <span className="font-sans font-bold text-[12px] text-[#C9A84C] tracking-[0.25em] uppercase px-3.5 py-1 border border-[#C9A84C]/30 rounded-full bg-[#C9A84C]/5">
                    अभियान २०२६ // CAMPAIGN 2026
                </span>
                <div className="flex-1 h-[1px] bg-white/5" />
                <span className="font-sans font-bold text-[11px] text-white/25 tracking-[0.15em] hidden md:block uppercase">
                    {playersData.length} योद्धाहरू // WARRIORS
                </span>
            </div>

            {/* Two-Column Gladiator Selection Grid */}
            <div className="px-6 md:px-[80px] grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                
                {/* LEFT COLUMN: Roster List (lg:col-span-7) */}
                <div className="lg:col-span-7 flex flex-col gap-2.5">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(playersData as any[]).map((player, index: number) => {
                        const isHovered = hoveredId === player.id;
                        const isExpanded = expandedId === player.id;

                        // Determine Captain / Vice Captain status
                        const isCaptain = player.position?.toLowerCase().includes('captain') && !player.position?.toLowerCase().includes('vice');
                        const isViceCaptain = player.position?.toLowerCase().includes('vice captain');

                        // Pure Devanagari Name
                        const nepaliName = NEPAL_NAMES[player.id] || player.nepaliName || player.name;

                        // Stat parsing logic
                        const hasStats = Boolean(player.stats?.runs || player.stats?.wickets || player.stats?.t20i?.runs || player.stats?.t20i?.wickets);
                        let displayStatValue = '—';
                        let displayStatLabel = 'DEBUT 2026';

                        if (player.status === 'retired') {
                            displayStatValue = 'सेवानिवृत्त';
                            displayStatLabel = player.retirementYear ? String(player.retirementYear) : 'LEGEND';
                        } else if (hasStats) {
                            displayStatValue = player.stats?.t20i?.wickets
                                ? String(player.stats.t20i.wickets)
                                : (player.stats?.wickets
                                    ? String(player.stats.wickets)
                                    : (player.stats?.t20i?.runs
                                        ? String(player.stats.t20i.runs)
                                        : String(player.stats?.runs ?? '0')));

                            displayStatLabel = (player.stats?.t20i?.wickets || player.stats?.wickets) ? 'विकेट' : 'रन';
                        }

                        return (
                            <Link
                                key={player.id}
                                href={`/squad/${player.id}`}
                                className="bg-white/[0.01] hover:bg-gradient-to-r hover:from-[#c41e3a12] hover:via-[#0d1b2a66] hover:to-transparent border-l-[3px] border-transparent hover:border-[#C41E3A] border border-white/5 rounded-sm transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer no-underline block"
                                style={{
                                    opacity: player.status === 'retired' && !isHovered ? 0.6 : 1,
                                }}
                                onMouseEnter={() => { setHoveredId(player.id); setSelectedId(player.id); }}
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
                                <div className="grid grid-cols-[24px_48px_1fr_auto] md:grid-cols-[40px_64px_1fr_auto_auto] items-center gap-x-4 md:gap-x-5 py-3.5 md:py-4 px-4 md:px-6 transition-all duration-300">

                                    {/* Number */}
                                    <div className="font-sans font-extrabold text-[11px] md:text-[13px] text-white/20 group-hover:text-[#C9A84C] tracking-[0.1em] transition-colors duration-300">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    {/* Avatar Circle */}
                                    <div className="flex justify-center items-center">
                                        <div className={`relative rounded-full overflow-hidden bg-[#0a1120] border-[#C9A84C]/50 transition-all duration-300 flex justify-center items-center ${isHovered ? 'w-[44px] h-[44px] md:w-[48px] md:h-[48px] border-2 shadow-lg shadow-[#C41E3A]/10' : 'w-[36px] h-[36px] md:w-[42px] md:h-[42px] border border-white/10'}`}>
                                            {player.image || player.heroImage ? (
                                                <Image
                                                    src={player.image || player.heroImage}
                                                    alt={nepaliName}
                                                    fill
                                                    className="object-cover saturate-50 hover:saturate-100 transition-all duration-300"
                                                    unoptimized
                                                />
                                            ) : (
                                                <span className={`font-sans font-bold text-[#C9A84C] transition-all duration-300 ${isHovered ? 'text-[14px] md:text-[16px]' : 'text-[12px] md:text-[14px]'}`}>
                                                    {player.name.split(' ').map((n: string) => n[0]).join('')}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Player Devanagari Name & Title */}
                                    <div className="flex flex-col justify-center min-w-0">
                                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-0.5">
                                            <div className="font-sans font-black text-[16px] md:text-[20px] text-white tracking-wide truncate">
                                                {nepaliName}
                                            </div>
                                            {/* Leadership Badges */}
                                            {(isCaptain || isViceCaptain) && (
                                                <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] text-[9px] md:text-[10px] font-sans font-bold px-[6px] py-[1px] rounded-[1px] tracking-wide uppercase">
                                                    {isCaptain ? 'कप्तान' : 'उप-कप्तान'}
                                                </div>
                                            )}

                                            {/* Status Badge */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {player.status === 'injured' && (
                                                    <div className="flex items-center gap-1 bg-[#B45309]/20 border border-[#B45309]/60 text-[#F59E0B] px-1.5 py-0.5 rounded-[1px] font-sans text-[8px] md:text-[9px] font-bold tracking-wider uppercase">
                                                        चोटग्रस्त
                                                    </div>
                                                )}
                                                {player.status === 'suspended' && (
                                                    <div className="bg-[#8B0000]/20 border border-[#8B0000]/60 text-[#EF4444] px-1.5 py-0.5 rounded-[1px] font-sans text-[8px] md:text-[9px] font-bold tracking-wider uppercase">
                                                        निलम्बित
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Poetic Lore/Role tag */}
                                        <div className="font-sans text-[11px] md:text-[12.5px] text-white/40 truncate">
                                            {player.role}
                                        </div>
                                    </div>

                                    {/* Key stat */}
                                    <div className={`text-right pr-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : (hasStats ? 'opacity-40' : 'opacity-100')}`}>
                                        <div className={`font-sans font-black tracking-normal leading-none text-white text-[15px] md:text-[20px] ${!hasStats ? 'text-white/10' : ''}`}>
                                            {displayStatValue}
                                        </div>
                                        <div className="font-sans text-[9px] md:text-[10px] text-white/20 tracking-wider mt-0.5">
                                            {displayStatLabel}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className={`hidden md:block font-sans font-bold text-[16px] text-[#C41E3A] transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-6px]'}`}>
                                        →
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* RIGHT COLUMN: Interactive Dossier Panel (lg:col-span-5) */}
                <div className="lg:col-span-5 hidden lg:block">
                    <div className="sticky top-24 bg-black/40 border border-white/5 rounded-sm p-6 backdrop-blur-xl relative overflow-hidden group shadow-lg min-h-[580px] flex flex-col justify-between">
                        {/* CRT Visual Scanline Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-30">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-[0.12]" />
                            <div className="absolute w-full h-[3px] bg-white/5 top-0 opacity-[0.25] animate-[flickerScanline_8s_linear_infinite]" />
                        </div>

                        {activePlayer ? (
                            // 1. ACTIVE PLAYER DOSSIER STATE
                            <div className="flex flex-col h-full justify-between gap-6 animate-[fadeUpIn_0.3s_both]">
                                <div>
                                    {/* Dossier Header */}
                                    <div className="flex justify-between items-start border-b border-white/5 pb-3.5 mb-4">
                                        <div>
                                            <span className="font-mono text-[9px] text-[#C9A84C] uppercase tracking-widest block mb-0.5">
                                                योद्धा दस्ताबेज // WARRIOR FILE
                                            </span>
                                            <h2 className="font-sans font-black text-2xl text-stadium-white leading-none">
                                                {NEPAL_NAMES[activePlayer.id] || activePlayer.nepaliName || activePlayer.name}
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {activePlayer.status && (
                                                <span className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded-[1px] tracking-wider uppercase bg-white/5 border ${activePlayer.status === 'injured' ? 'text-[#F59E0B] border-[#B45309]/55' : 'text-[#10B981] border-[#047857]/55'}`}>
                                                    {activePlayer.status}
                                                </span>
                                            )}
                                            <button 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedId(null);
                                                    setHoveredId(null);
                                                }}
                                                className="text-[11px] text-[#C41E3A] hover:text-white transition-colors border border-white/10 hover:border-[#C41E3A]/40 rounded-full w-5 h-5 flex items-center justify-center bg-white/5 cursor-pointer z-40 relative font-bold"
                                                title="फाइल बन्द गर्नुहोस् // CLOSE DOSSIER"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Shot Image Frame */}
                                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/5 rounded-sm bg-black/40 mb-4">
                                        <Image
                                            src={activePlayer.heroImage || activePlayer.image || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
                                            alt={activePlayer.name}
                                            fill
                                            className="object-cover saturate-50 hover:saturate-100 transition-all duration-500 contrast-110 brightness-[0.8]"
                                            unoptimized
                                        />
                                    </div>

                                    {/* Tactical Stats Table */}
                                    <div className="bg-[#0b1120]/40 border border-white/5 p-3 rounded-sm mb-4">
                                        <span className="font-mono text-[9px] text-[#B0B8C8]/40 uppercase tracking-widest block mb-2">
                                            करियर तथ्याङ्क // TACTICAL STATS
                                        </span>
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div className="border-r border-white/5 last:border-0">
                                                <div className="font-sans font-black text-white text-[16px]">
                                                    {activePlayer.stats?.t20i?.matches || activePlayer.stats?.odi?.matches || "—"}
                                                </div>
                                                <div className="font-sans text-[9px] text-[#B0B8C8]/40 uppercase tracking-wider mt-0.5">
                                                    खेल संख्या
                                                </div>
                                            </div>
                                            <div className="border-r border-white/5 last:border-0">
                                                <div className="font-sans font-black text-white text-[16px]">
                                                    {activePlayer.stats?.t20i?.runs || activePlayer.stats?.odi?.runs || "—"}
                                                </div>
                                                <div className="font-sans text-[9px] text-[#B0B8C8]/40 uppercase tracking-wider mt-0.5">
                                                    कुल रन
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-sans font-black text-white text-[16px]">
                                                    {activePlayer.stats?.t20i?.wickets || activePlayer.stats?.odi?.wickets || "—"}
                                                </div>
                                                <div className="font-sans text-[9px] text-[#B0B8C8]/40 uppercase tracking-wider mt-0.5">
                                                    कुल विकेट
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Primary Weapon (प्रमुख हतियार) */}
                                    <div className="border-l-2 border-[#C41E3A] bg-[#C41E3A]/[0.02] p-3.5 rounded-r-sm mb-4">
                                        <div className="font-sans font-extrabold text-[12px] text-[#C41E3A] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                                            🎯 प्रमुख हतियार // PRIMARY WEAPON
                                        </div>
                                        <div className="font-sans font-bold text-[13.5px] text-[#E8E8E8] mb-0.5">
                                            {activePlayer.signatureMove || "आक्रमक रणनीति"}
                                        </div>
                                        <p className="font-sans text-[12.5px] text-[#B0B8C8]/70 leading-relaxed m-0">
                                            {activePlayer.signatureArsenal?.[0]?.description || activePlayer.lore || "मैदानमा टोलीलाई जित दिलाउन सक्षम सबैभन्दा घातक रणनीति।"}
                                        </p>
                                    </div>

                                    {/* Declassified Quote Decoder */}
                                    <div className="bg-black/60 border border-white/5 p-3.5 rounded-sm relative overflow-hidden">
                                        <div className="font-mono text-[9px] text-[#C9A84C] uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                            🔒 गोप्प भनाइ // DECLASSIFIED QUOTE
                                        </div>
                                        <p className="font-sans italic text-[12.5px] text-white/80 leading-relaxed m-0 select-text">
                                            “{activePlayer.quote || activePlayer.unreasonableWisdom?.[0] || "मैदानमा अन्तिम बलसम्म लड्नु नै हाम्रो वास्तविक धर्म हो।"}”
                                        </p>
                                    </div>
                                </div>

                                {/* Link to full profile */}
                                <Link 
                                    href={`/squad/${activePlayer.id}`}
                                    className="w-full bg-gradient-to-r from-[#C41E3A] to-[#8B0000] hover:from-[#C9A84C] hover:to-[#B5943B] text-stadium-white text-center font-sans font-bold text-[13px] py-3 rounded-sm shadow-md transition-all duration-300 uppercase tracking-widest no-underline block mt-4"
                                >
                                    पूर्ण फाइल खोल्नुहोस् → // OPEN DOSSIER
                                </Link>
                            </div>
                        ) : (
                            // 2. DEFAULT SQUAD COMMAND CENTER STATE
                            <div className="flex flex-col h-full justify-between gap-6 animate-[fadeUpIn_0.3s_both]">
                                <div>
                                    {/* Command Center Header */}
                                    <div className="flex justify-between items-start border-b border-white/5 pb-3.5 mb-4">
                                        <div>
                                            <span className="font-mono text-[9px] text-[#C9A84C] uppercase tracking-widest block mb-0.5">
                                                नेपाल क्रिकेट कमान्ड सेन्टर // SQUAD BRIEFING
                                            </span>
                                            <h2 className="font-sans font-black text-2xl text-stadium-white leading-none uppercase">
                                                रणनीतिक मुख्यालय // HEADQUARTERS
                                            </h2>
                                        </div>
                                    </div>

                                    {/* TU Stadium Visual Mock Graphic */}
                                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/5 rounded-sm bg-black/50 mb-6 flex justify-center items-center">
                                        {/* Radial pulse grid representing the stadium radar */}
                                        <div className="absolute inset-0 bg-[#07080F]">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] border border-white/5 rounded-full animate-pulse" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] border border-white/5 rounded-full" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] border border-[#C41E3A]/20 rounded-full" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[180px] bg-white/5 rotate-45" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[2px] bg-white/5 -rotate-45" />
                                        </div>
                                        <div className="relative z-10 text-center px-4">
                                            <div className="font-mono text-[9px] text-[#C41E3A] tracking-[0.2em] font-extrabold uppercase mb-1 flex items-center justify-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A] animate-ping" />
                                                RADAR COORDINATES LOCKED
                                            </div>
                                            <div className="font-sans font-black text-[13px] text-white tracking-wide">
                                                टियु अन्तर्राष्ट्रिय क्रिकेट मैदान, कीर्तिपुर
                                            </div>
                                            <div className="font-sans text-[10.5px] text-[#B0B8C8]/40 tracking-wider">
                                                27.6758° N, 85.2817° E
                                            </div>
                                        </div>
                                    </div>

                                    {/* Squad Overview list */}
                                    <div className="space-y-3.5">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="font-sans text-[13px] text-white/50">कुल सक्रिय योद्धाहरू (Active Warriors)</span>
                                            <span className="font-sans font-black text-white text-[15px]">{playersData.length} जना</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="font-sans text-[13px] text-white/50">१२औं गैँडा स्तर (12th Rhino Pressure)</span>
                                            <span className="font-sans font-black text-[#C41E3A] text-[15px]">१३८ dB (Deafening)</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="font-sans text-[13px] text-white/50">मुख्य उद्देश्य (Primary Objective)</span>
                                            <span className="font-sans font-black text-[#C9A84C] text-[13.5px] uppercase">टी-ट्वेन्टी विश्वकप</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <span className="font-sans text-[13px] text-white/50">ड्रेसिङ रुम वातावरण (Culture Status)</span>
                                            <span className="font-sans font-black text-[#10B981] text-[14px]">HAPPY / BELIEF-FOCUSED</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Static prompt */}
                                <div className="border border-white/5 bg-white/[0.01] p-4 rounded-sm text-center">
                                    <p className="font-sans italic text-[12.5px] text-[#B0B8C8]/60 leading-relaxed m-0">
                                        "सूचीमा रहेका कुनै पनि योद्धा माथि माउस लैजानुहोस् (वा ट्याप गर्नुहोस्) र उनीहरूको गोप्य लडाकु दस्ताबेज, प्रमुख हतियार र तथ्याङ्कहरू तुरुन्त डिकोड गर्नुहोस्।"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

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
