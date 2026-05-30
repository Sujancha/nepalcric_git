"use client";

import Link from "next/link";
import Image from "next/image";

interface LeadStoryProps {
    image: string;
    quote: string;
    name: string;
    attribution: string;
    ctaText: string;
    ctaHref: string;
    description?: string;
}

export default function LeadStory({ image, quote, name, attribution, ctaText, ctaHref, description }: LeadStoryProps) {
    return (
        <section className="w-full min-h-screen bg-[#07080F] relative overflow-hidden flex flex-col justify-between p-6 md:p-12 lg:p-16 border-b border-white/5">
            {/* Cinematic Scanning Line Grid */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/45 to-transparent z-30" />
            <div className="absolute inset-y-0 left-12 w-[1px] bg-gradient-to-b from-transparent via-[#C9A84C]/10 to-transparent hidden lg:block z-10" />

            {/* FULL-BLEED CINEMATIC BACKGROUND IMAGE (Grayscale-to-color high-contrast) */}
            <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        priority
                        className="object-cover object-top transition-transform duration-[20s] ease-out scale-105"
                        style={{ filter: 'brightness(0.32) contrast(1.2) saturate(0.25)' }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#07080F]" />
                )}
                
                {/* Edge-to-edge dark gradient scrims for perfect typography contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#07080F] via-black/75 to-transparent z-10 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-black/85 to-transparent z-10 md:hidden" />
                
                {/* Grid Scanning Lines Overlay */}
                <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none" style={{
                    backgroundImage: `radial-gradient(#C9A84C 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }} />
            </div>

            {/* TOP HUD BAR */}
            <div className="relative z-20 flex justify-between items-center w-full border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <span className="font-stats font-bold text-stadium-white/40 tracking-widest text-[8px] uppercase">
                        NEPALCRIC // REPORT: #DOS-01
                    </span>
                </div>
                
                {/* Pulsing Target Beacon */}
                <div className="flex items-center gap-2 bg-black/45 border border-white/10 px-3 py-1.5 rounded-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C41E3A] animate-ping" />
                    <span className="font-mono text-[7px] uppercase tracking-widest text-[#B0B8C8]/80 font-bold">
                        LIVE INTEL CALIBRATION
                    </span>
                </div>
            </div>

            {/* MAIN CONTENT AREA: Floating Glassmorphic Terminal */}
            <div className="relative z-20 max-w-3xl w-full flex flex-col my-auto pt-10 md:pt-16 pr-0 md:pr-10">
                {/* Gold accent tag */}
                <div className="flex items-center gap-4 mb-6 relative">
                    <span className="h-[2px] w-8 bg-[#C9A84C] shadow-[0_0_8px_#C9A84C]" />
                    <span className="font-stats font-black text-[#C9A84C] uppercase tracking-widest text-[9.5px] drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                        CLASSIFIED DOSSIER // आजको सनसनीखेज कथा
                    </span>
                </div>

                {/* Cinematic Glowing Headline */}
                <h1 className="font-sans font-black leading-[1.1] mb-6 tracking-tight drop-shadow-2xl animate-[fadeUpIn_1s_ease-out_both] bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F0EDE8] to-[#C9A84C]/90"
                    style={{ fontSize: 'clamp(2.2rem, 4.4vw, 4.4rem)' }}>
                  &ldquo;{quote}&rdquo;
                </h1>

                {/* Attribution Roster */}
                <div className="flex flex-col gap-1 mb-6 pl-1 animate-[fadeUpIn_1s_ease-out_0.2s_both]">
                    <span className="font-sans font-extrabold text-stadium-white text-lg md:text-xl">{name}</span>
                    <span className="font-stats text-[#C9A84C] text-[9.5px] uppercase tracking-widest font-bold mt-1">
                        {attribution}
                    </span>
                </div>

                {/* Description Narrative Paragraph - complies with Content Protocol v2 */}
                {description && (
                    <p className="font-sans text-[#B0B8C8]/90 text-sm md:text-base leading-relaxed mb-8 pl-4 border-l border-[#C41E3A] py-1 bg-black/20 backdrop-blur-sm pr-4 rounded-r-sm animate-[fadeUpIn_1s_ease-out_0.3s_both]">
                        {description}
                    </p>
                )}

                {/* Interactive Dossier Telemetry Grid */}
                <div className="grid grid-cols-3 gap-6 max-w-md border border-white/5 bg-black/30 backdrop-blur-sm rounded-sm p-4 mb-8 text-[9px] animate-[fadeUpIn_1s_ease-out_0.4s_both]">
                    <div className="flex flex-col">
                      <span className="text-[#B0B8C8]/40 uppercase tracking-wider">टारगेट कोड // CODE</span>
                      <span className="font-mono font-bold text-[#C9A84C] mt-0.5">BALEN-40</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#B0B8C8]/40 uppercase tracking-wider">विशेषता // TARGET</span>
                      <span className="font-sans font-extrabold text-stadium-white/80 mt-0.5">रंगशाला कूटनीति</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#B0B8C8]/40 uppercase tracking-wider">सुरक्षा तह // STATUS</span>
                      <span className="font-mono font-bold text-[#C41E3A] mt-0.5">TIER-1 CLASSIFIED</span>
                    </div>
                </div>

                {/* CTA Button with scanning hover glow */}
                <div className="animate-[fadeUpIn_1s_ease-out_0.5s_both]">
                    <Link
                        href={ctaHref}
                        className="relative inline-flex px-8 py-4.5 bg-[#C9A84C]/5 border border-[#C9A84C]/45 text-[#C9A84C] font-stats font-bold uppercase tracking-widest text-[11px] overflow-hidden group hover:border-[#C9A84C] hover:shadow-[0_0_25px_rgba(201,168,76,0.35)] transition-all duration-300 rounded-sm"
                    >
                        <div className="absolute inset-0 bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500 ease-out z-0" />
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-[#07080F] transition-colors duration-300">
                            {ctaText}
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1.5 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </span>
                    </Link>
                </div>
            </div>

            {/* BOTTOM HUD BAR */}
            <div className="relative z-20 flex justify-between items-center w-full border-t border-white/5 pt-4 text-[8px] font-mono text-stadium-white/30">
                <span>COORD: 27.7172° N, 85.3240° E (KATHMANDU)</span>
                <span>SYSTEM THREAT: ZERO DETECTED</span>
            </div>
        </section>
    );
}
