"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function ScoreboardArchive() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const archives = [
        {
            id: "t20-wc-qualifier-2026",
            seriesName: "T20 WC ASIA QUALIFIER",
            year: "2026",
            outcome: "नेपाल अपराजित (च्याम्पियन)",
            matches: [
                { opponent: "युएई", date: "NOV 05", result: "नेपाल ८ विकेटले विजयी" },
                { opponent: "ओमान", date: "NOV 03", result: "नेपाल सुपर ओभरमा विजयी" },
                { opponent: "मलेसिया", date: "NOV 01", result: "नेपाल ६५ रनले विजयी" }
            ]
        },
        {
            id: "cwc-league-2-2026",
            seriesName: "CWC LEAGUE 2",
            year: "2026",
            outcome: "नेपाल २-१ ले विजयी",
            matches: [
                { opponent: "ओमान", date: "MAR 14", result: "नेपाल ५ विकेटले विजयी" },
                { opponent: "क्यानडा", date: "MAR 12", result: "क्यानडा २१ रनले विजयी" },
                { opponent: "ओमान", date: "MAR 10", result: "नेपाल ४ विकेटले विजयी" }
            ]
        },
        {
            id: "acc-premier-cup-2026",
            seriesName: "ACC PREMIER CUP",
            year: "2026",
            outcome: "नेपाल सेमिफाइनलमा रोकियो",
            matches: [
                { opponent: "युएई", date: "MAY 15", result: "युएई १० विकेटले विजयी (सेमिफाइनल)" },
                { opponent: 'हङकङ', date: "MAY 12", result: "नेपाल ८ विकेटले विजयी" },
                { opponent: "मलेसिया", date: "MAY 10", result: "नेपाल ६ विकेटले विजयी" }
            ]
        },
        {
            id: "tri-series-2026",
            seriesName: "NEPAL T20I TRI-SERIES",
            year: "2026",
            outcome: "नेपाल फाइनलमा पराजित",
            matches: [
                { opponent: "नेदरल्यान्ड्स", date: "APR 20", result: "नेदरल्यान्ड्स ४ विकेटले विजयी (फाइनल)" },
                { opponent: "नेदरल्यान्ड्स", date: "APR 18", result: "नेपाल २ विकेटले विजयी" },
                { opponent: "नामिबिया", date: "APR 15", result: "नेपाल ११ रनले विजयी" }
            ]
        }
    ];

    if (!mounted) return null;

    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative">
            <Head>
                <title>स्कोरबोर्ड | NepalCric</title>
                <meta name="description" content="विगतका युद्धहरू - Scoreboard Archive" />
            </Head>

            {/* Global Atmosphere: Dual radial gradient & Ghost Flag */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                             radial-gradient(circle at 15% 90%, rgba(196,30,58,0.08), transparent 55%),
                             radial-gradient(circle at 85% 10%, rgba(0,56,147,0.08), transparent 50%)
                         `
                    }}
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[120px] opacity-[0.06] select-none">
                    <svg width="600" height="900" viewBox="0 0 200 250" fill="#C41E3A" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40 20 L160 110 L80 110 L180 230 L40 230 Z" />
                    </svg>
                </div>
            </div>

            {/* HERO SECTION */}
            <section className="relative h-[45vh] w-full overflow-hidden flex flex-col justify-end pb-12 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[120px] after:bg-gradient-to-t after:from-[#07080F] after:to-transparent after:z-10">
                {/* Desaturated Crowd Background */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: 'grayscale(100%)',
                        opacity: 0.20
                    }}
                />

                <div className="relative z-20 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-start animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px', color: '#C9A84C', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px' }}>
                        विगतका युद्धहरू
                    </span>
                    <h1 className="text-white text-[clamp(64px,10vw,140px)] leading-[0.85] tracking-tight" style={{ fontFamily: 'Mukta, sans-serif', fontWeight: 800, letterSpacing: '[-0.04em]' }}>
                        स्कोरबोर्ड
                    </h1>
                </div>
            </section>

            {/* THE CAMPAIGN GRID */}
            <section className="relative z-20 px-6 lg:px-12 w-full max-w-[1400px] mx-auto mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {archives.map((series, idx) => (
                        <div
                            key={series.id}
                            className="group relative flex flex-col p-8 md:p-10 overflow-hidden cursor-default transition-all duration-500 ease-out animate-[dynamicSlideFade_0.6s_cubic-bezier(0.76,0,0.24,1)_both]"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderTop: series.outcome.includes('अपराजित') || series.outcome.includes('विजयी') ? '3px solid rgba(201,168,76,0.7)' : '3px solid rgba(196,30,58,0.6)',
                                borderLeft: '3px solid transparent', // Ready for hover
                                animationDelay: `${idx * 0.15}s`
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.borderLeftColor = '#C41E3A';
                                el.style.boxShadow = '0 0 30px rgba(196,30,58,0.1)';
                                el.style.backgroundColor = 'rgba(255,255,255,0.07)';
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.borderLeftColor = 'transparent';
                                el.style.boxShadow = 'none';
                                el.style.backgroundColor = 'rgba(255,255,255,0.05)';
                            }}
                        >
                            {/* Ghost Year Number */}
                            <div className="absolute -bottom-6 -right-4 pointer-events-none select-none"
                                style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontWeight: 900,
                                    fontSize: 'clamp(120px, 15vw, 180px)',
                                    lineHeight: 1,
                                    color: 'rgba(255,255,255,0.03)',
                                    zIndex: 0
                                }}
                            >
                                {series.year}
                            </div>

                            <div className="relative z-10 w-full">
                                {/* Series Heading */}
                                <div className="mb-2">
                                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                        {series.seriesName}
                                    </span>
                                </div>
                                <h2 className="mb-8" style={{ fontFamily: 'Mukta, sans-serif', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '[-0.02em]', lineHeight: 1.1 }}>
                                    <span style={{ letterSpacing: '0' }}>{series.outcome}</span>
                                </h2>

                                {/* Matches List */}
                                <div className="flex flex-col w-full">
                                    {series.matches.map((match, matchIdx) => (
                                        <div
                                            key={matchIdx}
                                            className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-[rgba(255,255,255,0.06)] last:border-0 group-hover:border-[rgba(255,255,255,0.1)] transition-colors duration-300"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2 md:mb-0">
                                                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '12px', color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase', minWidth: '50px' }}>
                                                    {match.date}
                                                </span>
                                                <span style={{ fontFamily: 'Mukta, sans-serif', fontSize: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0' }}>
                                                    vs {match.opponent}
                                                </span>
                                            </div>
                                            <div className="text-left md:text-right w-full md:w-auto mt-1 md:mt-0">
                                                <span style={{ fontFamily: 'Mukta, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0' }}>
                                                    {match.result}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing Atmospheric Line */}
            <div style={{ textAlign: 'center', padding: '80px 0 60px 0' }}>
                <p style={{
                    fontFamily: 'Mukta, sans-serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(14px, 1.6vw, 17px)',
                    color: 'rgba(255,255,255,0.18)',
                    letterSpacing: '0',
                    margin: 0
                }}>
                    हर हार पनि इतिहास हो — हर जित पनि किंवदन्ती।
                </p>
            </div>

            <style jsx global>{`
            @keyframes fadeUpIn {
                from {opacity: 0; transform: translateY(20px); }
                to {opacity: 1; transform: translateY(0); }
            }
            @keyframes dynamicSlideFade {
                from {opacity: 0; transform: translateX(-15px) translateY(10px); }
                to {opacity: 1; transform: translateX(0) translateY(0); }
            }
        `}</style>
        </div >
    );
}
