"use client";

import { useEffect, useState } from "react";

export default function MatchDayClient() {
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [copied, setCopied] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Countdown Timer State
    const [timeLeft, setTimeLeft] = useState({
        days: "०",
        hours: "०",
        minutes: "०",
        seconds: "०"
    });

    useEffect(() => {
        if (!mounted) return;

        const targetDate = new Date('2026-03-15T10:00:00+05:45').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff < 0) {
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const formatNepali = (num: number) => num.toString().padStart(2, '0').replace(/[0-9]/g, match => '०१२३४५६७८९'[parseInt(match)]);

            setTimeLeft({
                days: formatNepali(days),
                hours: formatNepali(hours),
                minutes: formatNepali(minutes),
                seconds: formatNepali(seconds)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [mounted]);

    const initialFixtures = [
        { id: "01", date: "SEP 16", time: "19:45 NPT", nepaliName: "क्यानडाविरुद्ध", venue: "King City, Canada", format: "ODI", threat: 75, threatLevel: "HIGH", threatColor: "#C41E3A", weapon: "Rohit Paudel", danger: "Saad Bin Zafar", h2h: "Nepal 3-1 Canada" },
        { id: "02", date: "SEP 18", time: "19:45 NPT", nepaliName: "ओमानविरुद्ध", venue: "King City, Canada", format: "ODI", threat: 85, threatLevel: "HIGH", threatColor: "#C41E3A", weapon: "Sandeep Lamichhane", danger: "Aqib Ilyas", h2h: "Nepal 4-3 Oman" },
        { id: "03", date: "SEP 22", time: "19:45 NPT", nepaliName: "क्यानडाविरुद्ध", venue: "King City, Canada", format: "ODI", threat: 75, threatLevel: "HIGH", threatColor: "#C41E3A", weapon: "Dipendra Singh Airee", danger: "Nicholas Kirton", h2h: "Nepal 3-1 Canada" },
        { id: "04", date: "SEP 24", time: "19:45 NPT", nepaliName: "ओमानविरुद्ध", venue: "King City, Canada", format: "ODI", threat: 85, threatLevel: "HIGH", threatColor: "#C41E3A", weapon: "Kushal Malla", danger: "Zeeshan Maqsood", h2h: "Nepal 4-3 Oman" },
        { id: "05", date: "OCT 25", time: "21:15 NPT", nepaliName: "अमेरकाविरुद्ध", venue: "Dallas, USA", format: "ODI", threat: 90, threatLevel: "CRITICAL", threatColor: "#C41E3A", weapon: "Kushal Bhurtel", danger: "Saurabh Netravalkar", h2h: "Nepal 3-2 USA" },
        { id: "06", date: "OCT 27", time: "21:15 NPT", nepaliName: "स्कटल्यान्डविरुद्ध", venue: "Dallas, USA", format: "ODI", threat: 80, threatLevel: "HIGH", threatColor: "#C41E3A", weapon: "Gulshan Jha", danger: "Richie Berrington", h2h: "Nepal 3-3 Scotland" }
    ];

    // Determine past status based on real current date
    const today = new Date();

    // Sort chronologically and determine past status
    const fixtures = initialFixtures.map(f => {
        const fixtureDate = new Date(`${f.date} 2026`);
        return { ...f, past: fixtureDate < today, timestamp: fixtureDate.getTime() };
    }).sort((a, b) => a.timestamp - b.timestamp);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative">

            {/* 4. Global Atmosphere: Dual radial gradient & Ghost Flag */}
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

            {/* 2. THE PARALLAX HEADER — "THE STAGE IS SET" */}
            <section className="relative h-[58vh] w-full overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-[80px] after:bg-gradient-to-t after:from-[#07080F] after:to-transparent after:z-10">
                {/* Layer 1: Dark stadium background */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover md:bg-fixed"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: 'grayscale(40%) brightness(0.35)',
                        transform: `translateY(${scrollY * 0.4}px)`,
                    }}
                />

                {/* Layer 4: Text Anchored Bottom-Left */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-12 pb-12 w-full max-w-7xl mx-auto">
                    <span className="font-barlow font-bold text-[#C9A84C] text-[12px] tracking-[0.3em] uppercase block mb-4 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                        FIXTURES · 2026
                    </span>

                    <div className="relative inline-block w-max">
                        <h1 className="font-display font-black text-white text-[clamp(80px,12vw,160px)] leading-[0.85] tracking-tight animate-[dynamicFadeUp_0.8s_cubic-bezier(0.76,0,0.24,1)_0.2s_both]">
                            म्याच डे
                        </h1>
                        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(196,30,58,0.25)_0%,transparent_60%)] animate-[dynamicFadeUp_0.8s_cubic-bezier(0.76,0,0.24,1)_0.2s_both]" />
                    </div>

                    <span className="font-barlow font-medium text-white/45 text-[18px] block mt-2 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_0.5s_both]" style={{ letterSpacing: '0' }}>
                        नेपालका आगामी युद्धहरू
                    </span>
                </div>

                {/* Layer 5: Campaign Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full z-30 px-6 md:px-12 pb-8 max-w-7xl mx-auto left-1/2 -translate-x-1/2 flex items-center justify-between">
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '11px', color: '#C9A84C', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                        CAMPAIGN 2026
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                        <span onClick={() => document.getElementById('mission-00')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{ color: '#C41E3A', fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s ease' }} className="hover:opacity-100 opacity-80">●</span>
                        <span onClick={() => document.getElementById('mission-02')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s ease' }} className="hover:opacity-100 opacity-80">○</span>
                        <span onClick={() => document.getElementById('mission-03')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s ease' }} className="hover:opacity-100 opacity-80">○</span>
                        <span onClick={() => document.getElementById('mission-04')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s ease' }} className="hover:opacity-100 opacity-80">○</span>
                        <span onClick={() => document.getElementById('mission-05')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s ease' }} className="hover:opacity-100 opacity-80">○</span>
                        <span onClick={() => document.getElementById('mission-06')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s ease' }} className="hover:opacity-100 opacity-80">○</span>
                    </div>
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0' }}>
                        १/६ मिशन पूरा
                    </span>
                </div>
            </section>

            {/* 3. THE 'NEXT BATTLE' FEATURE CARD */}
            <section className="w-full relative z-10 animate-[dynamicFadeUp_0.8s_cubic-bezier(0.76,0,0.24,1)_0.9s_both] px-6">
                <div
                    className="max-w-5xl mx-auto w-full py-8 md:py-[48px] px-8 md:px-[80px] bg-[linear-gradient(135deg,rgba(13,27,42,0.98)_0%,rgba(7,8,15,0.99)_60%,rgba(196,30,58,0.07)_100%)] border border-[rgba(196,30,58,0.25)] backdrop-blur-[16px] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(196,30,58,0.08)]"
                    style={{ borderLeft: '3px solid #C41E3A' }}
                >
                    {/* Top Strip */}
                    <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto border-b border-[rgba(255,255,255,0.05)] pb-4">
                        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '11px', color: '#C9A84C', letterSpacing: '0', textTransform: 'uppercase' }}>अर्को मिशन</span>
                        <div className="flex items-center gap-4">
                            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>MISSION #02</span>
                            <span
                                onClick={handleShare}
                                style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: '10px',
                                    letterSpacing: '0.15em',
                                    color: copied ? '#C9A84C' : 'rgba(255,255,255,0.25)',
                                    cursor: 'pointer',
                                    transition: 'color 0.3s ease',
                                    userSelect: 'none'
                                }}
                            >
                                {copied ? '✓ COPIED' : 'SHARE ↗'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 max-w-7xl mx-auto">

                        {/* Column 1: NEPAL */}
                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                            <span className="font-barlow font-bold text-[#C9A84C] text-[12px] tracking-[0.3em] uppercase block mb-1">NPL</span>
                            <h2 className="font-display font-black text-white text-[clamp(40px,5vw,72px)] leading-[0.9] mb-1 relative z-20" style={{ letterSpacing: '0' }}>नेपाल</h2>
                            <span className="font-barlow font-medium text-[rgba(255,255,255,0.35)] text-[10px] tracking-wider uppercase mb-8">घरेलु टोली</span>

                            {/* Weapon Box */}
                            <div className="bg-[rgba(196,30,58,0.08)] border border-[rgba(196,30,58,0.2)] px-4 py-3 w-full max-w-[280px]">
                                <span className="font-barlow font-bold text-[#C41E3A] text-[10px] uppercase block mb-2" style={{ letterSpacing: '0' }}>⚔ हाम्रो हतियार</span>
                                <span className="font-sans font-semibold text-white text-[16px] block leading-tight">Rohit Paudel</span>
                                <span className="font-barlow font-medium text-[rgba(255,255,255,0.4)] text-[12px] uppercase block mt-1">Captain · Middle Order</span>
                            </div>
                        </div>

                        {/* Column 2: CENTER (Glassmorphic Anchor) */}
                        <div className="shrink-0 flex flex-col items-center relative z-20 mt-8 md:mt-0 bg-white/5 backdrop-blur-md rounded-md border border-white/10 p-6 md:p-8">
                            <span className="font-barlow font-black text-[#C9A84C] text-[clamp(60px,8vw,100px)] leading-none tracking-[-0.02em] block mb-1" style={{ animation: 'vsPulse 3s ease-in-out infinite' }}>VS</span>
                            <span className="font-barlow font-medium text-white/40 text-[12px] uppercase block mb-6">ICC T20I &middot; 2026</span>

                            {/* Countdown Timer */}
                            <div className="flex flex-col items-center mb-8">
                                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0', marginBottom: '8px' }}>म्याच सुरु हुन</span>
                                <div className="flex items-center gap-4 text-center">
                                    {!mounted ? (
                                        <div style={{ visibility: 'hidden' }} className="font-barlow font-bold text-white text-[32px]">00:00:00:00</div>
                                    ) : (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="font-barlow font-bold text-white text-[32px] transition-opacity duration-100">{timeLeft.days}</span>
                                                <span className="font-barlow font-bold text-[#C9A84C] text-[10px] uppercase" style={{ letterSpacing: '0' }}>दिन</span>
                                            </div>
                                            <span className="font-barlow font-bold text-[#C9A84C] text-[32px] pb-[18px] opacity-30">:</span>
                                            <div className="flex flex-col">
                                                <span className="font-barlow font-bold text-white text-[32px] transition-opacity duration-100">{timeLeft.hours}</span>
                                                <span className="font-barlow font-bold text-[#C9A84C] text-[10px] uppercase" style={{ letterSpacing: '0' }}>घण्टा</span>
                                            </div>
                                            <span className="font-barlow font-bold text-[#C9A84C] text-[32px] pb-[18px] opacity-30">:</span>
                                            <div className="flex flex-col">
                                                <span className="font-barlow font-bold text-white text-[32px] transition-opacity duration-100">{timeLeft.minutes}</span>
                                                <span className="font-barlow font-bold text-[#C9A84C] text-[10px] uppercase" style={{ letterSpacing: '0' }}>मिनेट</span>
                                            </div>
                                            <span className="font-barlow font-bold text-[#C9A84C] text-[32px] pb-[18px] opacity-30">:</span>
                                            <div className="flex flex-col">
                                                <span className="font-barlow font-bold text-white text-[32px] transition-opacity duration-100">{timeLeft.seconds}</span>
                                                <span className="font-barlow font-bold text-[#C9A84C] text-[10px] uppercase" style={{ letterSpacing: '0' }}>सेकेन्ड</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0', marginTop: '8px' }}>बाँकी छ</span>
                            </div>

                            {/* Threat Meter */}
                            <div className="w-full max-w-[240px] flex flex-col items-center">
                                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>
                                    THREAT LEVEL
                                </span>
                                <div className="w-full h-[4px] bg-[rgba(255,255,255,0.1)] rounded-[2px] overflow-hidden mb-2">
                                    <div
                                        className="h-full bg-[linear-gradient(90deg,#C9A84C,#C41E3A)] rounded-[2px]"
                                        style={{ width: mounted ? '80%' : '0%', transition: 'width 1.5s cubic-bezier(0.76,0,0.24,1)' }}
                                    />
                                </div>
                                <span className="font-barlow font-bold text-[#C41E3A] text-[11px] uppercase tracking-wider">HIGH</span>
                                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>
                                    <span style={{ letterSpacing: '0' }}>सम्पादक मूल्यांकन</span>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: OPPONENT */}
                        <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right relative z-20 mt-8 md:mt-0">
                            <span className="font-barlow font-bold text-[rgba(255,255,255,0.35)] text-[12px] tracking-[0.3em] uppercase block mb-1">CAN</span>
                            <h2 className="font-display font-black text-[rgba(255,255,255,0.85)] text-[clamp(40px,5vw,72px)] leading-[0.9] mb-1" style={{ letterSpacing: '0' }}>क्यानडा</h2>
                            <span className="font-barlow font-medium text-[rgba(255,255,255,0.35)] text-[10px] tracking-wider uppercase mb-8">प्रतिद्वन्द्वी</span>

                            {/* Danger Box */}
                            <div className="bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)] px-4 py-3 w-full max-w-[280px] text-center md:text-right">
                                <span className="font-barlow font-bold text-[#C9A84C] text-[10px] uppercase block mb-2" style={{ letterSpacing: '0' }}>⚠ खतरनाक खेलाडी</span>
                                <span className="font-sans font-semibold text-white text-[16px] block leading-tight">Saad Bin Zafar</span>
                                <span className="font-barlow font-medium text-[rgba(255,255,255,0.4)] text-[12px] uppercase block mt-1">Captain · Spinner</span>
                            </div>
                        </div>

                    </div>

                    <div style={{ textAlign: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', padding: '12px 0 0 0' }}>
                        ⚔ <span style={{ letterSpacing: '0' }}>हाम्रो हतियार</span>
                        &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                        ⚠ <span style={{ letterSpacing: '0' }}>खतरनाक खेलाडी</span>
                    </div>

                    {/* Venue & H2H Strip */}
                    <div className="mt-12 pt-5 border-t border-[rgba(255,255,255,0.06)] flex flex-col justify-center items-center max-w-7xl mx-auto">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
                                <span className="font-barlow font-medium text-[rgba(255,255,255,0.4)] text-[13px] tracking-wider text-center md:text-left">
                                    TU Cricket Ground, Kathmandu &nbsp;&middot;&nbsp; 15 March 2026 &nbsp;&middot;&nbsp; 10:00 NPT
                                </span>
                                <span className="font-barlow font-medium text-[13px] tracking-[0.1em] text-center md:text-right">
                                    <span className="text-[rgba(255,255,255,0.4)] mr-2">HEAD TO HEAD:</span>
                                    <span className="text-[#C9A84C]">Nepal 3</span>
                                    <span className="text-[rgba(255,255,255,0.3)] mx-2">-</span>
                                    <span className="text-[rgba(255,255,255,0.4)]">UAE 2</span>
                                </span>
                            </div>
                            <div style={{ fontFamily: 'Mukta, sans-serif', fontStyle: 'italic', fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '10px', letterSpacing: '0', textAlign: 'center' }}>
                                "इतिहास हाम्रो पक्षमा छ।"
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. THE 'FUTURE CLASHES' ROSTER -> CAMPAIGN MAP */}
            <section className="max-w-7xl mx-auto px-6 mt-12 relative z-10" style={{ paddingBottom: '60px' }}>
                <div className="flex items-center mb-8">
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '12px', color: '#C9A84C', letterSpacing: '0.25em', textTransform: 'uppercase', marginRight: '24px' }}>बाँकी मिशनहरू</span>
                    <div className="flex-grow border-t border-[#C9A84C] opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fixtures.map((fix, idx) => {
                        const isHovered = !fix.past && hoveredCard === fix.id;
                        return (
                            <div
                                key={fix.id}
                                id={`mission-${fix.id}`}
                                onMouseEnter={() => setHoveredCard(fix.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className="flex flex-col relative rounded-[2px] p-[24px_28px] cursor-pointer animate-[dynamicSlideFade_0.6s_cubic-bezier(0.76,0,0.24,1)_both]"
                                style={{
                                    borderTop: `2px solid ${fix.threatColor}`,
                                    borderLeft: `1px solid ${isHovered ? 'rgba(196,30,58,0.3)' : 'rgba(255,255,255,0.07)'}`,
                                    borderRight: `1px solid ${isHovered ? 'rgba(196,30,58,0.3)' : 'rgba(255,255,255,0.07)'}`,
                                    borderBottom: `1px solid ${isHovered ? 'rgba(196,30,58,0.3)' : 'rgba(255,255,255,0.07)'}`,
                                    background: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                                    transition: 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)',
                                    opacity: fix.id === "00" ? 0.28 : 1,
                                    filter: fix.id === "00" ? 'grayscale(1)' : 'none',
                                    pointerEvents: fix.id === "00" ? 'none' : 'auto',
                                    animationDelay: `${idx * 0.1}s`
                                }}
                            >
                                {fix.id === "02" && (
                                    <div style={{ position: 'absolute', top: '16px', right: '16px', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)', padding: '3px 8px', backgroundColor: 'rgba(201,168,76,0.06)' }}>
                                        ★ <span style={{ letterSpacing: '0' }}>निर्णायक</span>
                                    </div>
                                )}
                                {/* Mission Top Row */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-barlow font-medium text-[rgba(255,255,255,0.3)] text-[11px] uppercase tracking-wider">
                                        MISSION #{fix.id}
                                    </span>
                                    <span className="font-barlow font-bold text-[#C9A84C] text-[13px] uppercase tracking-wider">
                                        {fix.date} &middot; {fix.time}
                                    </span>
                                </div>

                                <div className="w-full border-t border-[rgba(255,255,255,0.05)] mb-4" />

                                {/* Opponent & Format Row */}
                                <div className="flex justify-between items-end mb-4">
                                    <span className="font-sans font-semibold text-white text-[24px] leading-none" style={{ letterSpacing: '0' }}>{fix.nepaliName}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="font-barlow text-[10px] text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.15)] px-[8px] py-[2px] rounded-sm uppercase tracking-wider">
                                            {fix.format}
                                        </span>
                                        {fix.past && (
                                            <span className="font-sans font-bold text-[10px] text-white bg-[#C41E3A] px-2 py-1 rounded-sm uppercase tracking-wider">
                                                सकियो
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Mini Threat Meter */}
                                <div className="flex items-center gap-4 mb-5">
                                    <span className="font-barlow font-medium text-[rgba(255,255,255,0.4)] text-[11px] uppercase tracking-wider w-[50px] shrink-0">THREAT</span>
                                    <div className="flex-1 h-[3px] bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: mounted ? `${fix.threat}%` : '0%', background: fix.threatColor, transition: 'width 1.5s cubic-bezier(0.76,0,0.24,1)' }}
                                        />
                                    </div>
                                    <span className="font-barlow font-bold text-[11px] uppercase tracking-wider w-[60px] text-right" style={{ color: fix.threatColor }}>{fix.threatLevel}</span>
                                </div>

                                {/* Intel Lines */}
                                <div className="flex flex-col gap-2 mb-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[12px] opacity-80">⚔</span>
                                        <span className="font-barlow text-[rgba(255,255,255,0.7)] text-[13px] tracking-wide">{fix.weapon}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[12px] text-[#C9A84C] opacity-80">⚠</span>
                                        <span className="font-barlow text-[13px] tracking-wide" style={{ color: isHovered ? 'rgba(255,255,255,1.0)' : 'rgba(201,168,76,0.8)', transition: 'color 0.3s cubic-bezier(0.76, 0, 0.24, 1)' }}>{fix.danger}</span>
                                    </div>
                                </div>

                                {/* Bottom Row */}
                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                                    <span className="font-barlow text-[rgba(255,255,255,0.3)] text-[12px] tracking-wide truncate pr-4">{fix.venue}</span>
                                    {!fix.past && (
                                        <span className="font-sans font-bold text-[#C41E3A] text-[12px] uppercase whitespace-nowrap" style={{ letterSpacing: '0', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s cubic-bezier(0.76, 0, 0.24, 1)' }}>विवरण &rarr;</span>
                                    )}
                                </div>

                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 5. BOTTOM ATMOSPHERE — THE VOID */}
            <div className="mt-20 pt-20 pb-10 flex justify-center relative z-10">
                <span style={{ fontFamily: 'Mukta, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0', textAlign: 'center', display: 'block' }}>
                    जब घण्टी बज्छ, मैदान बोल्छ।
                </span>
            </div>

            <style jsx global>{`
                @keyframes vsPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.03); opacity: 0.85; }
                }
                @keyframes dynamicFadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes dynamicSlideFade {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
