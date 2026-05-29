"use client";

import { useEffect, useState } from "react";

export interface Fixture {
    id: string;
    date: string;
    time: string;
    nepaliName: string;
    venue: string;
    format: string;
    threat: number;
    threatLevel: string;
    threatColor: string;
    weapon: string;
    danger: string;
    h2h: string;
}

export interface MatchDayData {
    targetDate: string;
    fixtures: Fixture[];
}

interface ChronicleDetail {
    story: string;
    championName: string;
    championDesc: string;
    dangerName: string;
    dangerDesc: string;
    battlefieldQuote: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 📖 VISCERAL SPORTS-DOCUMENTARY CHRONICLES (nepalCRIC EXCLUSIVE DOSSIERS)
// ─────────────────────────────────────────────────────────────────────────────

const CHRONICLES_DICT: { [key: string]: ChronicleDetail } = {
    "01": {
        story: "क्यानडाको माटोमा वीर गोर्खाहरू पहिलो पटक ओर्लिँदा हावामा एउटा फरक खालको तनाव हुनेछ। कप्तान रोहित पौडेलको काँधमा सिंगो देशको आशा मात्र होइन, इतिहास रच्ने र विश्वलाई आफ्नो उपस्थितिको आभास गराउने ठूलो दबाब हुनेछ। चिसो हावा र नौलो पीचको चुनौतीलाई सामना गर्दै विजय हासिल गर्नु नै आजको अग्निपरीक्षा हुनेछ।",
        championName: "रोहित पौडेल",
        championDesc: "कप्तानी दबाब र मध्यक्रमको बलियो आधार",
        dangerName: "साद बिन जफर",
        dangerDesc: "चतुर स्पिनर र कसिलो बलिङका पर्याय",
        battlefieldQuote: "मैदानमा छिर्दा संशय हटाउनुस्, हामी केवल जित्नका लागि बनेका हौं।"
    },
    "02": {
        story: "ओमानविरुद्धको त्यो आगो ओकल्ने टक्कर। मैदानमा तीब्र बेगका सोमपाल कामी र करण केसीको अटूट लडाईं चल्नेछ। ओमानका आक्रामक कप्तान आकिब इलियासको ब्याटलाई रोक्न र टियू मैदानको क्रिजमा नेपाली स्पिनको आधिपत्य जमाउन सन्दीप लामिछानेको नाडीबाट निस्कने जादुमयी गुगली नै हाम्रो अचूक ब्रह्मास्त्र बन्नेछ।",
        championName: "सन्दीप लामिछाने",
        championDesc: "विश्वस्तरीय स्पिन र जादुमयी गुगलीका नायक",
        dangerName: "आकिब इलियास",
        dangerDesc: "विस्फोटक अलराउन्डर र म्याच विनर",
        battlefieldQuote: "जब मेरो नाडी घुम्छ, गुरुत्वाकर्षण आफैं लत्रिनेछ।"
    },
    "03": {
        story: "दोस्रो मुठभेड, जहाँ बदला र प्रतिष्ठाको लडाईं अझ घनीभूत हुनेछ। पहिलो खेलको गल्तीहरू सुधार्दै, दीपेन्द्र सिंह ऐरीको विष्फोटक अलराउन्ड प्रदर्शनले विरोधी स्टार निकोलस किर्टनको गल्ली उडाउनेछ। पीचको २२ गज नै हाम्रो साम्राज्य हुनेछ र हरेक बाउन्ड्री सिंहहरूको गर्जाहट बन्नेछ।",
        championName: "दीपेन्द्र सिंह ऐरी",
        championDesc: "विष्फोटक अलराउन्डर र अविश्वसनीय फिल्डर",
        dangerName: "निकोलस किर्टन",
        dangerDesc: "क्यानडाका मुख्य म्याच विनर ब्याट्सम्यान",
        battlefieldQuote: "६ बल। ६ छक्का। मेरो ब्याटले इतिहासको सिमाना कोर्छ।"
    },
    "04": {
        story: "ओमानविरुद्धको दोस्रो भिडन्त। कुशल मल्लको आक्रामक ब्याटिङले विरोधी स्पिनर जिशान मकसूदको कसिलो बलिङलाई ध्वस्त पार्नेछ। यो केवल एउटा क्रिकेट खेल होइन, हाम्रो आत्म-सम्मान र नेपाली क्रिकेट गौरवको अन्तिम रक्षा हो, जहाँ गल्तीको कुनै स्थान हुने छैन, जहाँ हरेक प्रहार निर्णायक बन्नेछ।",
        championName: "कुशल मल्ल",
        championDesc: "विष्फोटक बायाँ हाते ब्याट्सम्यान र उपयोगी स्पिनर",
        dangerName: "जिशान मकसूद",
        dangerDesc: "ओमानका अनुभवी पूर्व कप्तान र चतुर स्पिनर",
        battlefieldQuote: "डरलाई ड्रेसिङ रुममै छोडेर आउनुस्, क्रिज हाम्रो हो।"
    },
    "05": {
        story: "डलासको त्यो तातो घाम, जहाँ टी-ट्वेन्टी विश्वकपमा हामीले बेहोरेको हारको बदला लिन सिंहहरू मैदानमा ओर्लिनेछन्। कुशल भुर्तेलको ओपनिङ विष्फोटक प्रहारले अमेरिकाको सौरभ नेत्रावलकरको धारिलो बलिङलाई निस्तेज पार्नेछ। बदलाको यो ऐतिहासिक मौका हुनेछ, जहाँ हामी गुमेको गौरव फर्काउनेछौं।",
        championName: "कुशल भुर्तेल",
        championDesc: "आक्रामक ओपनर र असाधारण म्याच विनर",
        dangerName: "सौरभ नेत्रावलकर",
        dangerDesc: "सटीक स्विङ र घातक बायाँ हाते तीब्र बलर",
        battlefieldQuote: "डलासको हारको ऋण चुकाउन, हामी क्रिजमा आगो बाल्नेछौं।"
    },
    "06": {
        story: "स्कटल्यान्डविरुद्धको महायुद्ध। गुलशन झाको तीब्र गति र मध्यक्रमको लचकताले स्कटल्यान्डका कप्तान रिची बेरिंग्टनको घातक प्रहारलाई रोक्नेछ। कीर्तिपुरको माटोको ऋण चुकाउने र विश्वकपको मञ्चमा हिमाल झैं उच्च भएर उभिने यो अन्तिम र स्वर्णिय मौका हुनेछ, जहाँ सिंगो राष्ट्र एकजुट भएर गर्जिनेछ।",
        championName: "गुलशन झा",
        championDesc: "युवा सनसनी, प्रभावशाली अलराउन्डर",
        dangerName: "रिची बेरिंग्टन",
        dangerDesc: "अनुभवी कप्तान र मध्यक्रमका खम्बा",
        battlefieldQuote: "जब युवा जोश मैदानमा गर्जिन्छ, हिमाल हल्लिनेछ।"
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 🌐 DEVANAGARI LOCALIZATION UTILITIES (अगस्ट STANDARD CALENDAR COMPLIANCE)
// ─────────────────────────────────────────────────────────────────────────────

export function parseFixtureDate(dateStr: string, timeStr: string): Date | null {
    try {
        const months: { [key: string]: number } = {
            JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
            JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
        };
        const parts = dateStr.trim().split(/\s+/);
        if (parts.length < 2) return null;
        
        const monthAbbr = parts[0].toUpperCase();
        const dayNum = parseInt(parts[1], 10);
        
        const monthIndex = months[monthAbbr];
        if (monthIndex === undefined || isNaN(dayNum)) return null;
        
        const timeParts = timeStr.replace(" NPT", "").split(":");
        const hours = timeParts[0] ? parseInt(timeParts[0], 10) : 0;
        const minutes = timeParts[1] ? parseInt(timeParts[1], 10) : 0;
        
        const year = 2026;
        
        // Force synchronous global countdown exactly in Nepal Standard Time (NPT, UTC+5:45)
        const utcDate = Date.UTC(year, monthIndex, dayNum, hours, minutes);
        const nptOffsetMs = 345 * 60 * 1000;
        return new Date(utcDate - nptOffsetMs);
    } catch (e) {
        return null;
    }
}

export function formatNepaliDate(dateStr: string): string {
    const monthsMap: { [key: string]: string } = {
        JAN: "जनवरी",
        FEB: "फेब्रुअरी",
        MAR: "मार्च",
        APR: "अप्रिल",
        MAY: "मे",
        JUN: "जुन",
        JUL: "जुलाई",
        AUG: "अगस्ट",
        SEP: "सेप्टेम्बर",
        OCT: "अक्टोबर",
        NOV: "नोभेम्बर",
        DEC: "डिसेम्बर"
    };
    
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length < 2) return dateStr;
    
    const englishMonth = parts[0].toUpperCase();
    const nepaliMonth = monthsMap[englishMonth] || englishMonth;
    
    const englishDay = parts[1];
    const nepaliDay = englishDay.replace(/[0-9]/g, match => '०१२३४५६७८९'[parseInt(match)]);
    
    return `${nepaliMonth} ${nepaliDay}`;
}

export function formatNepaliTime(timeStr: string): string {
    const nepaliDigits = timeStr.replace(/[0-9]/g, match => '०१२३४५६७८९'[parseInt(match)]);
    return nepaliDigits.replace("NPT", "नेपाली समय (NPT)");
}

export function formatNumberToNepali(num: number | string): string {
    return num.toString().replace(/[0-9]/g, match => '०१२३४५६७८९'[parseInt(match)]);
}

// ─────────────────────────────────────────────────────────────────────────────
// 🏴 COUNTRY FLAG MAPPING  (flagcdn.com — ISO 3166-1 alpha-2)
// ─────────────────────────────────────────────────────────────────────────────

/** Maps each fixture ID → { np: Nepal ISO, opp: Opponent ISO } */
const FLAG_MAP: Record<string, { np: string; opp: string }> = {
    "01": { np: "np", opp: "ca" },     // Nepal vs Canada
    "02": { np: "np", opp: "om" },     // Nepal vs Oman
    "03": { np: "np", opp: "ca" },     // Nepal vs Canada (return)
    "04": { np: "np", opp: "om" },     // Nepal vs Oman (return)
    "05": { np: "np", opp: "us" },     // Nepal vs USA
    "06": { np: "np", opp: "gb-sct" }, // Nepal vs Scotland
};

/**
 * FlagImg — renders a country flag with a gentle breeze-wave animation.
 * The `side` prop controls the perspective-tilt direction so both flags
 * lean slightly inward toward the VS centre, creating a face-off feel.
 */
function FlagImg({ code, side, size = 44 }: { code: string; side: "left" | "right"; size?: number }) {
    const tilt = side === "left" ? "rotateY(8deg)" : "rotateY(-8deg)";
    return (
        <div
            style={{
                width: Math.round(size * 1.5),
                height: size,
                borderRadius: 4,
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "0 6px 24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)",
                transform: `perspective(280px) ${tilt}`,
                animation: "flagWave 5s ease-in-out infinite",
                animationDelay: side === "left" ? "0s" : "0.8s",
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`https://flagcdn.com/w80/${code}.png`}
                alt={code.toUpperCase()}
                width={Math.round(size * 1.5)}
                height={size}
                style={{ width: "100%", height: "100%", objectFit: code === "np" ? "contain" : "cover", display: "block" }}
                loading="eager"
            />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// THE JUMBOTRON BROADCAST BATTLEFIELD SHOWCASE
// ─────────────────────────────────────────────────────────────────────────────

export default function MatchDayClient({ data }: { data: MatchDayData }) {
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [copied, setCopied] = useState(false);
    const [selectedMatchId, setSelectedMatchId] = useState<string>("");
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<"chronicle" | "weapon" | "danger" | "h2h">("chronicle");
    const [sweepActive, setSweepActive] = useState(false);
    
    interface Particle {
        width: string; height: string; left: string; top: string;
        animation: string; animationDelay: string;
    }
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        // CSS Dust Particles setup (matches homepage style)
        setParticles([...Array(30)].map(() => ({
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `floatDust ${Math.random() * 15 + 15}s linear infinite`,
            animationDelay: `-${Math.random() * 30}s`,
        })));

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ── TWO-PASS RENDERING PATTERN FOR 100% HYDRATION SAFETY ──
    const referenceClock = mounted ? new Date() : new Date("2026-05-28T00:00:00+05:45");

    const resolvedFixtures = data.fixtures.map(f => {
        const fixtureDate = parseFixtureDate(f.date, f.time) || new Date(`${f.date} 2026`);
        return {
            ...f,
            past: fixtureDate < referenceClock,
            timestamp: fixtureDate.getTime()
        };
    }).sort((a, b) => a.timestamp - b.timestamp);

    const upcomingFixtures = resolvedFixtures.filter(f => !f.past);

    // Dynamic Default Match Node Auto-Selection on Mount
    useEffect(() => {
        if (mounted && !selectedMatchId && resolvedFixtures.length > 0) {
            const upcoming = resolvedFixtures.filter(f => !f.past);
            if (upcoming.length > 0) {
                setSelectedMatchId(upcoming[0].id);
            } else {
                setSelectedMatchId(resolvedFixtures[0].id);
            }
        }
    }, [mounted, resolvedFixtures, selectedMatchId]);

    // Active Selection details
    const activeMatchId = selectedMatchId || (resolvedFixtures[0]?.id ?? "");
    const activeMatch = resolvedFixtures.find(f => f.id === activeMatchId) || resolvedFixtures[0];

    const opponentName = activeMatch 
        ? activeMatch.nepaliName.replace("विरुद्ध", "") 
        : "प्रतिद्वन्द्वी";

    // Visceral Chronicles resolution
    const activeChronicle = CHRONICLES_DICT[activeMatch.id] || {
        story: "नेपाली क्रिकेट टोलीको गौरवशाली यात्राको एउटा महत्वपूर्ण मुठभेड।",
        championName: activeMatch.weapon,
        championDesc: "मैदानमा मुख्य भूमिका",
        dangerName: activeMatch.danger,
        dangerDesc: "प्रतिद्वन्द्वी शक्ति",
        battlefieldQuote: "जीतको संकल्प बोकेर सिंहहरू मैदानमा ओर्लिनेछन्।"
    };

    // Dynamic countdown target clock linked strictly to the active focused match
    const [timeLeft, setTimeLeft] = useState({
        days: "००",
        hours: "००",
        minutes: "००",
        seconds: "००"
    });

    useEffect(() => {
        if (!mounted || !activeMatch || activeMatch.past) {
            setTimeLeft({ days: "००", hours: "००", minutes: "००", seconds: "००" });
            return;
        }

        const targetTime = activeMatch.timestamp;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetTime - now;

            if (diff < 0) {
                clearInterval(timer);
                setTimeLeft({ days: "००", hours: "००", minutes: "००", seconds: "००" });
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
    }, [mounted, activeMatch]);

    const completedMissions = resolvedFixtures.filter(f => f.past).length;
    const totalMissions = resolvedFixtures.length;

    const handleShare = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Tabs for Jumbotron layer projector switcher
    const dossierTabs = [
        { id: "chronicle", label: "०१ // रणभूमि गाथा", sub: "THE CLASH SAGA" },
        { id: "weapon", label: "०२ // वीरको ब्रह्मास्त्र", sub: "WARRIOR PROFILE" },
        { id: "danger", label: "०३ // शत्रुको संहारक", sub: "CHALLENGER TELEMETRY" },
        { id: "h2h", label: "०४ // ऐतिहासिक टक्कर", sub: "TECTONIC DATA" }
    ] as const;

    // Helper to render the circular NPT Countdown compass
    const renderCountdownOrb = () => {
        return (
            <div className="relative flex flex-col items-center justify-center bg-[#05080f]/95 border border-[#C9A84C]/25 rounded-full w-[210px] h-[210px] shadow-[0_0_50px_rgba(201,168,76,0.15),inset_0_0_20px_rgba(201,168,76,0.06)] select-none p-4 text-center transition-all duration-500 hover:border-[#D32F2F]/40 hover:shadow-[0_0_55px_rgba(211,47,47,0.18)] animate-[vsPulse_3s_ease-in-out_infinite]">
                
                {/* Rotating gear radar lines */}
                <div className="absolute inset-2 border border-dashed border-white/5 rounded-full animate-[sbSpotlightSpin_30s_linear_infinite] pointer-events-none" />
                <div className="absolute inset-4 border border-white/5 rounded-full pointer-events-none" />
                
                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.22em" }} className="text-[#C9A84C] font-black uppercase tracking-widest block mb-2.5">
                    {activeMatch.past ? "समाप्त मिशन" : "LIVE NPT COUNTDOWN"}
                </span>

                {activeMatch.past ? (
                    <div className="flex flex-col items-center">
                        <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-[28px] text-[#C9A84C] tracking-wide leading-none">✓ सम्पन्न</span>
                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8.5px", letterSpacing: "0.1em" }} className="text-white/35 uppercase mt-1">HISTORIC CLASH</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 justify-center mb-3">
                        <div className="flex flex-col items-center">
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-white text-[20px] font-black leading-none">{timeLeft.days}</span>
                            <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "8px" }} className="text-[#C9A84C] font-extrabold uppercase mt-0.5 tracking-wider">दिन</span>
                        </div>
                        <span style={{ fontFamily: "Barlow, sans-serif" }} className="text-white/15 text-[14px] font-bold pb-2">:</span>
                        
                        <div className="flex flex-col items-center">
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-white text-[20px] font-black leading-none">{timeLeft.hours}</span>
                            <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "8px" }} className="text-[#C9A84C] font-extrabold uppercase mt-0.5 tracking-wider">घण्टा</span>
                        </div>
                        <span style={{ fontFamily: "Barlow, sans-serif" }} className="text-white/15 text-[14px] font-bold pb-2">:</span>
                        
                        <div className="flex flex-col items-center">
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-white text-[20px] font-black leading-none">{timeLeft.minutes}</span>
                            <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "8px" }} className="text-[#C9A84C] font-extrabold uppercase mt-0.5 tracking-wider">मिनेट</span>
                        </div>
                        <span style={{ fontFamily: "Barlow, sans-serif" }} className="text-white/15 text-[14px] font-bold pb-2">:</span>
                        
                        <div className="flex flex-col items-center">
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-white text-[20px] font-black leading-none">{timeLeft.seconds}</span>
                            <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "8px" }} className="text-[#C9A84C] font-extrabold uppercase mt-0.5 tracking-wider">सेकेन्ड</span>
                        </div>
                    </div>
                )}

                {/* VS Emblem / Live marker */}
                <div className="flex items-center gap-1.5 mt-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${activeMatch.past ? "bg-[#C9A84C]" : "bg-[#D32F2F] animate-pulse"}`} />
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8.5px", letterSpacing: "0.15em" }} className="text-white/50 uppercase font-black">
                        NEPAL VS {opponentName}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#07080F] min-h-screen text-white selection:bg-[#D32F2F] selection:text-white pb-32 relative overflow-hidden">

            {/* ── AMBIENT FLOODLIGHT FLARES & FLOATING DUST ── */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                             radial-gradient(circle at 50% -15%, rgba(201, 168, 76, 0.15) 0%, rgba(30, 58, 138, 0.08) 50%, transparent 80%),
                             radial-gradient(circle at 15% 90%, rgba(211,47,47,0.06), transparent 55%),
                             radial-gradient(circle at 85% 10%, rgba(30,58,138,0.04), transparent 50%)
                         `
                    }}
                />
                
                {/* 30 Floating Dust Particles */}
                {mounted && particles.map((style, i) => (
                    <div
                        key={i}
                        className="absolute bg-[#C9A84C]/15 rounded-full"
                        style={style}
                    />
                ))}
            </div>

            {/* ── PREMIUM CINEMATIC PARALLAX COVER ── */}
            <section className="relative h-[55vh] min-h-[480px] w-full overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-[240px] after:bg-gradient-to-t after:from-[#07080F] after:to-transparent after:z-10 flex items-end pb-28">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-top animate-ken-burns"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: 'grayscale(30%) brightness(0.24) saturate(80%)',
                        transform: `translateY(${scrollY * 0.3}px)`,
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#07080F]/40 via-transparent to-[#07080F] z-1" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", letterSpacing: "0.3em" }} className="text-[#C9A84C] font-black uppercase tracking-widest block mb-3 animate-[fadeUpIn_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
                            CAMPAIGN 2026 // आगामी युद्धहरू
                        </span>
                        <h1 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-white text-[56px] md:text-[80px] leading-none tracking-tight animate-[dynamicFadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
                            म्याच डे
                        </h1>
                        <span style={{ fontFamily: "Barlow, sans-serif" }} className="text-white/40 text-[16px] font-medium tracking-wide mt-2 block animate-[fadeUpIn_0.8s_cubic-bezier(0.16,1,0.3,1)_0.4s_both]">
                            नेपाल क्रिकेट टोलीको खेल तालिका र रणभूमि गाथा
                        </span>
                    </div>

                    <div className="flex items-center gap-6 border-l border-white/10 pl-6 select-none animate-[fadeUpIn_0.8s_cubic-bezier(0.16,1,0.3,1)_0.6s_both]">
                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                            {formatNumberToNepali(completedMissions)}/{formatNumberToNepali(totalMissions)} मिशन पूरा
                        </span>
                    </div>
                </div>
            </section>

            {/* ── 📚 THE STADIUM JUMBOTRON BROADCAST BATTLEFIELD DECK (SPOTLIGHT REDESIGN) ── */}
            <section className="relative z-20 max-w-6xl mx-auto px-6 mb-20 -mt-20 select-none animate-[dynamicFadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.8s_both]">
                
                {/* Dossier Pinned Header Bar */}
                <div className="w-full flex items-center justify-between bg-black/60 backdrop-blur-md px-5 py-3 border border-white/5 border-b-0 rounded-t-sm text-[9.5px] font-bold text-white/30 tracking-widest uppercase">
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[#D32F2F] rounded-full animate-pulse" />
                        JUMBOTRON TELEMETRY CORE // युद्ध कक्ष प्रोजेक्टर
                    </span>
                    <span className="text-[#C9A84C] cursor-pointer hover:text-white transition-colors" onClick={handleShare}>
                        {copied ? "✓ LINK COPIED" : "SHARE BROADCAST DECK ↗"}
                    </span>
                </div>

                {/* Curved Jumbotron Case Container */}
                <div className="w-full bg-[#090c15]/80 backdrop-blur-xl border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.06)] rounded-b-sm overflow-hidden p-6 md:p-10 flex flex-col gap-6 relative">
                    
                    {/* Stadium light sweep animation overlay */}
                    {sweepActive && (
                        <div className="light-sweep-overlay" />
                    )}

                    {/* ═══════════════════════════════════════════════════════ */}
                    {/* ★  THE MATCHUP IDENTITY PLATE — THE FIRST THING SEEN  ★ */}
                    {/* ═══════════════════════════════════════════════════════ */}
                    <div className="w-full flex flex-col items-center justify-center gap-0 pt-2 pb-4 border-b border-white/5 relative overflow-hidden">
                        {/* Ghost background country names */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 flex items-center justify-between pointer-events-none select-none overflow-hidden px-4"
                        >
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(80px,14vw,180px)", color: "rgba(30,58,138,0.05)", lineHeight: 1, fontWeight: 900 }}>नेपाल</span>
                            <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "clamp(80px,14vw,180px)", color: "rgba(201,168,76,0.04)", lineHeight: 1, fontWeight: 900 }}>{opponentName}</span>
                        </div>

                        {/* Format + date pill */}
                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", letterSpacing: "0.28em" }} className="text-[#C9A84C]/70 font-black uppercase tracking-widest mb-3">
                            {activeMatch.format} &nbsp;·&nbsp; {formatNepaliDate(activeMatch.date)}, २०२६ &nbsp;·&nbsp; {activeMatch.venue}
                        </span>

                        {/* THE CLASH PLATE */}
                        <div className="flex items-center justify-center gap-4 md:gap-8 w-full relative z-10">

                            {/* ── NEPAL SIDE ── */}
                            <div className="flex flex-col items-end gap-2 flex-1 min-w-0">
                                <div className="flex justify-end">
                                    <FlagImg
                                        code={FLAG_MAP[activeMatch.id]?.np ?? "np"}
                                        side="left"
                                        size={42}
                                    />
                                </div>
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.22em" }} className="text-[#D32F2F]/70 font-black uppercase tracking-widest">
                                    हाम्रो टोली
                                </span>
                                <h2
                                    style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900, fontSize: "clamp(32px,6vw,72px)", lineHeight: 1 }}
                                    className="text-white tracking-tight text-right leading-none m-0"
                                >
                                    नेपाल
                                </h2>
                            </div>

                            {/* ── VS DIVIDER ── */}
                            <div className="flex flex-col items-center shrink-0 gap-1">
                                <div className="h-12 md:h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                                <div className="relative flex items-center justify-center">
                                    <div className={`absolute w-10 h-10 rounded-full border ${
                                        activeMatch.past
                                            ? "border-[#C9A84C]/30"
                                            : "border-[#D32F2F]/50 animate-[vsPulse_2s_ease-in-out_infinite]"
                                    }`} />
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 900 }} className="text-white/90 text-[18px] md:text-[22px] tracking-tight relative z-10">
                                        VS
                                    </span>
                                </div>
                                <div className="h-12 md:h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                            </div>

                            {/* ── OPPONENT SIDE ── */}
                            <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                                <div className="flex justify-start">
                                    <FlagImg
                                        code={FLAG_MAP[activeMatch.id]?.opp ?? "xx"}
                                        side="right"
                                        size={42}
                                    />
                                </div>
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.22em" }} className="text-[#C9A84C]/70 font-black uppercase tracking-widest">
                                    विपक्षी टोली
                                </span>
                                <h2
                                    style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900, fontSize: "clamp(32px,6vw,72px)", lineHeight: 1 }}
                                    className="text-white/80 tracking-tight text-left leading-none m-0 truncate"
                                >
                                    {opponentName}
                                </h2>
                            </div>

                        </div>

                        {/* Time countdown strip */}
                        {!activeMatch.past && (
                            <div className="flex items-center gap-3 mt-5 bg-[#D32F2F]/8 border border-[#D32F2F]/15 px-5 py-2 rounded-sm">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D32F2F] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D32F2F]" />
                                </span>
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", letterSpacing: "0.18em" }} className="text-white/50 font-black uppercase">
                                    खेल सुरु हुनमा&nbsp;
                                </span>
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "15px" }} className="text-white font-black">
                                    {timeLeft.days}<span className="text-white/30 mx-0.5">d</span> {timeLeft.hours}<span className="text-white/30 mx-0.5">h</span> {timeLeft.minutes}<span className="text-white/30 mx-0.5">m</span> {timeLeft.seconds}<span className="text-white/30 mx-0.5">s</span>
                                </span>
                            </div>
                        )}
                        {activeMatch.past && (
                            <div className="flex items-center gap-2 mt-5 bg-[#C9A84C]/8 border border-[#C9A84C]/20 px-5 py-2 rounded-sm">
                                <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-[#C9A84C] text-[13px] uppercase tracking-wider">यो मुकाबला सम्पन्न भयो</span>
                            </div>
                        )}
                    </div>
                    {/* 2. DYNAMIC TABS SELECTOR */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10 max-w-4xl mx-auto mt-12 mb-16 select-none">
                        {dossierTabs.map((tab) => {
                            const isTabActive = selectedTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`flex flex-col items-center justify-center py-4 px-3 md:px-4 border text-center transition-all duration-300 relative group cursor-pointer ${
                                        isTabActive
                                            ? "bg-[#0b1222] border-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.08)]" 
                                            : "bg-white/[0.01] border-white/5 hover:border-white/15 hover:bg-white/[0.02]"
                                    }`}
                                >
                                    {/* Filmstrip corner brackets */}
                                    <div className="absolute top-1.5 left-1.5 w-1 h-1 border-t border-l border-white/10 group-hover:border-[#C9A84C]/50 transition-colors" />
                                    <div className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-white/10 group-hover:border-[#C9A84C]/50 transition-colors" />
                                    <div className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-white/10 group-hover:border-[#C9A84C]/50 transition-colors" />
                                    <div className="absolute bottom-1.5 right-1.5 w-1 h-1 border-b border-r border-white/10 group-hover:border-[#C9A84C]/50 transition-colors" />

                                    <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className={`text-[13.5px] md:text-[14.5px] ${
                                        isTabActive ? "text-[#C9A84C]" : "text-white/60"
                                    }`}>
                                        {tab.label}
                                    </span>
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8px", letterSpacing: "0.15em" }} className="text-white/20 mt-0.5 tracking-widest block uppercase font-black">
                                        {tab.sub}
                                    </span>

                                    {/* Dynamic sweep flare when active */}
                                    {isTabActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A84C]/5 to-transparent -translate-x-full animate-[sweepEffect_1.8s_infinite]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* 3. MULTI-LAYERED PROJECTED VIEWPORTS */}
                    <div className="min-h-[320px] flex flex-col justify-center relative">
                        
                        {selectedTab === "chronicle" && (
                            <div className="space-y-4 animate-[dynamicFadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9.5px", letterSpacing: "0.2em" }} className="text-[#C9A84C] font-black uppercase block">
                                    रणभूमि गाथा // CLASH SAGA
                                </span>
                                <div className="border-l-2 border-[#D32F2F] pl-4">
                                    <h3 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-white text-[22px] md:text-[26px] leading-snug m-0">
                                        {activeChronicle.battlefieldQuote}
                                    </h3>
                                </div>
                                <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#B0B8C8] text-[15px] leading-relaxed text-justify m-0">
                                    {activeChronicle.story}
                                </p>
                            </div>
                        )}

                        {selectedTab === "weapon" && (
                            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-center animate-[dynamicFadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
                                {/* Nepal Profile card (Left Wing) */}
                                <div className="lg:col-span-5 bg-gradient-to-br from-[#0b1222]/90 to-[#05070d]/90 border border-white/5 p-6 md:p-8 rounded-sm relative overflow-hidden h-[280px] flex flex-col justify-between">
                                    <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "160px", color: "rgba(30, 58, 138, 0.03)" }} className="absolute -bottom-16 -right-6 font-black select-none pointer-events-none z-0">
                                        #१७
                                    </div>
                                    <div className="relative z-10">
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.2em" }} className="text-[#D32F2F] font-black uppercase tracking-widest block mb-2">
                                            OUR CHAMPION // मुख्य योद्धा
                                        </span>
                                        <h3 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-white text-[28px] leading-none mb-2">
                                            {activeChronicle.championName}
                                        </h3>
                                        <span style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#C41E3A] text-[13px] block font-bold">
                                            {activeChronicle.championDesc}
                                        </span>
                                    </div>
                                    <div className="relative z-10 bg-[rgba(196,30,58,0.03)] border border-[rgba(196,30,58,0.12)] p-4 rounded-sm">
                                        <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#B0B8C8] text-[13px] leading-relaxed m-0 text-justify">
                                            विपक्षी बलरहरूका लागि यमराज जस्तै विष्फोटक ब्याट्सम्यान र घातक स्पिनर। छ बलमा छक्का प्रहार गर्न सक्ने असाधारण क्षमता र विश्वस्तरीय फिल्डिङले यिनलाई आधुनिक क्रिकेटको सर्वोत्कृष्ट अलराउन्डर सावित गर्छ।
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 flex justify-center">
                                    {renderCountdownOrb()}
                                </div>
                            </div>
                        )}

                        {selectedTab === "danger" && (
                            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-center animate-[dynamicFadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
                                {/* Opponent profile card (Right Wing) */}
                                <div className="lg:col-span-5 bg-gradient-to-br from-[#1c1811]/90 to-[#07080f]/90 border border-white/5 p-6 md:p-8 rounded-sm relative overflow-hidden h-[280px] flex flex-col justify-between">
                                    <div style={{ fontFamily: "Mukta, sans-serif", fontSize: "140px", color: "rgba(201, 168, 76, 0.02)" }} className="absolute -bottom-16 -right-6 font-black select-none pointer-events-none z-0">
                                        {opponentName}
                                    </div>
                                    <div className="relative z-10">
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.2em" }} className="text-[#C9A84C] font-black uppercase tracking-widest block mb-2">
                                            RIVAL THREAT // विपक्षी खतरा चेतावनी
                                        </span>
                                        <h3 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-white text-[28px] leading-none mb-2">
                                            {activeChronicle.dangerName}
                                        </h3>
                                        <span style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#D32F2F] text-[13px] block font-bold">
                                            {activeChronicle.dangerDesc}
                                        </span>
                                    </div>
                                    <div className="relative z-10 bg-[rgba(211,47,47,0.03)] border border-[rgba(211,47,47,0.12)] p-4 rounded-sm">
                                        <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#B0B8C8] text-[13px] leading-relaxed m-0 text-justify">
                                            विपक्षी टोलीको सबैभन्दा ठूलो म्याच विनर र मुख्य हतियार। कसिलो बलिङ वा विष्फोटक ब्याटिङले यिनले कुनै पनि समय खेलको दिशा बदल्न सक्छन्। यिनलाई सुरुमै घेराबन्दीमा पारेर पन्छाउनु नेपाली टोलीको पहिलो र मुख्य गुरुत्तर दायित्व हुनेछ।
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 flex justify-center">
                                    {renderCountdownOrb()}
                                </div>
                            </div>
                        )}

                        {selectedTab === "h2h" && (
                            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-center animate-[dynamicFadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
                                {/* Bento data grid */}
                                <div className="lg:col-span-5 space-y-4">
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9.5px", letterSpacing: "0.2em" }} className="text-[#C9A84C] font-black uppercase block">
                                        रणभूमि इतिहास र रेकर्ड // ARCHIVE METRICS
                                    </span>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white/[0.01] border border-white/5 p-4 rounded-sm">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8px", letterSpacing: "0.1em" }} className="text-white/30 uppercase block mb-1">मुकाबला रेकर्ड // H2H</span>
                                            <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-[#C9A84C] text-[18px] block">{activeMatch.h2h}</span>
                                        </div>
                                        <div className="bg-white/[0.01] border border-white/5 p-4 rounded-sm">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8px", letterSpacing: "0.1em" }} className="text-white/30 uppercase block mb-1">खेलको ढाँचा // FORMAT</span>
                                            <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-white text-[18px] block">{activeMatch.format}</span>
                                        </div>
                                        <div className="bg-white/[0.01] border border-white/5 p-4 rounded-sm">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8px", letterSpacing: "0.1em" }} className="text-white/30 uppercase block mb-1">मैदान मैदान // VENUE</span>
                                            <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-white text-[16px] block truncate">{activeMatch.venue}</span>
                                        </div>
                                    </div>
                                    <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#B0B8C8] text-[13.5px] leading-relaxed text-justify m-0">
                                        इतिहास साक्षी छ कि नेपाली क्रिकेटको यो युद्धमा दुवै टोलीले रगत र पसिना बगाएका छन्। यो खेल पुरानो हिसाब चुक्ता गर्ने र हिमालको सिंह झैं गर्जने अर्को अवसर हो।
                                    </p>
                                </div>
                                <div className="lg:col-span-2 flex justify-center">
                                    {renderCountdownOrb()}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Telemetry info footer */}
                    <div className="w-full bg-[#05070c]/95 border-t border-white/5 px-8 py-5 rounded-sm flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-semibold text-white/40 tracking-wider">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 text-center md:text-left">
                            <span className="uppercase"><span className="text-white/20 mr-1.5">LOC //</span> <strong className="text-white/80 font-bold">{activeMatch.venue}</strong></span>
                            <span className="hidden md:inline text-white/10">|</span>
                            <span className="uppercase"><span className="text-white/20 mr-1.5">DATE //</span> <strong className="text-[#C9A84C] font-bold">{formatNepaliDate(activeMatch.date)}, २०२६</strong></span>
                            <span className="hidden md:inline text-white/10">|</span>
                            <span className="uppercase"><span className="text-white/20 mr-1.5">TIME //</span> <strong className="text-white/80 font-bold">{formatNepaliTime(activeMatch.time).replace("नेपाली समय (NPT)", "NPT")}</strong></span>
                        </div>
                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", letterSpacing: "0.15em" }} className="font-black uppercase tracking-wider text-center md:text-right">
                            H2H RECORD // <span className="text-[#C41E3A] ml-1.5">{activeMatch.h2h}</span>
                        </span>
                    </div>

                </div>
            </section>

            {/* ── 🗺️ RESTORED & UPGRADED INTERACTIVE MATCH CARDS GRID (ROSTER) ── */}
            <section className="max-w-6xl mx-auto px-6 relative z-10 select-none animate-[dynamicFadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_1.0s_both]">
                
                <div className="flex items-center gap-4 mb-10">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", letterSpacing: "0.25em" }} className="text-[#C9A84C] font-black uppercase tracking-wider shrink-0">
                        युद्ध अभियान श्रृंखला // CAMPAIGN TIMELINE
                    </span>
                    <div className="flex-grow border-t border-white/5 opacity-40" />
                </div>

                {/* Minimalist manifest-style vertical match timeline */}
                <div className="flex flex-col gap-3 max-w-5xl mx-auto">
                    {resolvedFixtures.map((fix) => {
                        const isCompleted = fix.past;
                        const isActiveSelection = fix.id === activeMatchId;

                        return (
                            <div
                                key={fix.id}
                                onClick={() => {
                                    setSelectedMatchId(fix.id);
                                    setSelectedTab("chronicle");
                                    if (typeof navigator !== "undefined" && navigator.vibrate) {
                                        navigator.vibrate([10, 5, 10]);
                                    }
                                }}
                                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:py-4 md:px-8 cursor-pointer transition-all duration-300 border-l-[3px] rounded-sm bg-[#090d16]/30 ${
                                    isActiveSelection 
                                        ? "border-l-[#C9A84C] bg-white/[0.03] border-white/10 shadow-[0_4px_20px_rgba(201,168,76,0.03)]" 
                                        : "border-l-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                                } border-t border-r border-b`}
                            >
                                {/* Left side: Mission ID, status indicator, date & format */}
                                <div className="flex items-center gap-6 shrink-0">
                                    <div className="flex items-center gap-2.5">
                                        <span className={`h-1.5 w-1.5 rounded-full ${
                                            isCompleted ? "bg-white/20" : "bg-[#D32F2F] animate-pulse"
                                        }`} />
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", letterSpacing: "0.15em" }} className="text-white/40 font-black uppercase">
                                            M_{fix.id}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-[#C9A84C]/90 text-[13px] leading-tight">
                                            {formatNepaliDate(fix.date)}
                                        </span>
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8.5px", letterSpacing: "0.05em" }} className="text-white/30 uppercase mt-0.5 tracking-wider font-semibold">
                                            {fix.format}
                                        </span>
                                    </div>
                                </div>

                                {/* Center: Matchup and Venue */}
                                <div className="flex-1 min-w-0 md:px-6">
                                    <h3 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-white text-[16px] md:text-[18px] leading-snug m-0">
                                        नेपाल <span className="text-[#C41E3A] mx-1.5">vs</span> {fix.nepaliName.replace("विरुद्ध", "")}
                                    </h3>
                                    <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-white/30 text-[12px] m-0 mt-0.5 truncate max-w-md">
                                        {fix.venue}
                                    </p>
                                </div>

                                {/* Right side: Monospace Time & clean status tag */}
                                <div className="flex items-center justify-between md:justify-end gap-5 shrink-0">
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", letterSpacing: "0.05em" }} className="text-white/40 font-bold uppercase md:text-right">
                                        {formatNepaliTime(fix.time).replace("नेपाली समय (NPT)", "NPT")}
                                    </span>

                                    {isCompleted ? (
                                        <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "9.5px", letterSpacing: "0.08em" }} className="text-[#C9A84C] font-black uppercase border border-[#C9A84C]/25 bg-[#C9A84C]/5 px-2.5 py-0.5 rounded-sm tracking-wider">
                                            सम्पन्न
                                        </span>
                                    ) : (
                                        <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "9.5px", letterSpacing: "0.08em" }} className="text-[#D32F2F] font-black uppercase border border-[#D32F2F]/25 bg-[#D32F2F]/5 px-2.5 py-0.5 rounded-sm tracking-wider">
                                            आगामी
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── FOOTER SLOGAN ── */}
            <div className="mt-28 pt-20 pb-6 flex justify-center relative z-10 select-none">
                <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.05em", textAlign: "center", display: "block" }}>
                    जब घण्टी बज्छ, मैदान बोल्छ । // WHEN THE BELL RINGS, THE CRUSADE BEGINS.
                </span>
            </div>

            {/* ── PREMIUM SPORTS-DOCUMENTARY ANIMATION KEYFRAMES ── */}
            <style jsx global>{`
                /* Premium Scrollbars */
                ::-webkit-scrollbar {
                    width: 5px;
                    height: 5px;
                }
                ::-webkit-scrollbar-track {
                    background: #07080F;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(30, 58, 138, 0.4);
                    border-radius: 99px;
                    border: 1px solid rgba(255, 255, 255, 0.02);
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(211, 47, 47, 0.5);
                }
                html, body {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(30, 58, 138, 0.4) #07080F;
                }

                @keyframes floatDust {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(-80px) translateX(30px); opacity: 0; }
                }

                @keyframes ken-burns {
                    0% { transform: scale(1.0); }
                    100% { transform: scale(1.05); }
                }

                @keyframes vsPulse {
                    0%, 100% { 
                        transform: scale(1); 
                        box-shadow: 0 0 35px rgba(201, 168, 76, 0.15), inset 0 0 15px rgba(201, 168, 76, 0.05); 
                        border-color: rgba(201, 168, 76, 0.25);
                    }
                    50% { 
                        transform: scale(1.015); 
                        box-shadow: 0 0 45px rgba(211, 47, 47, 0.18), inset 0 0 20px rgba(211, 47, 47, 0.08); 
                        border-color: rgba(211, 47, 47, 0.35);
                    }
                }

                @keyframes sweepEffect {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes lightSweep {
                    0% { transform: translate(-100%, -100%) rotate(-45deg); opacity: 0; }
                    50% { opacity: 0.6; }
                    100% { transform: translate(100%, 100%) rotate(-45deg); opacity: 0; }
                }

                .light-sweep-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom right, transparent, rgba(201, 168, 76, 0.2) 50%, transparent);
                    z-index: 30;
                    pointer-events: none;
                    transform: translate(-100%, -100%) rotate(-45deg);
                    animation: lightSweep 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes dynamicFadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeUpIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

        </div>
    );
}
