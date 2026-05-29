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
    oppFlag?: string;
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
    // Input format: e.g. "19:45 NPT" or "21:15 NPT"
    try {
        const cleanTime = timeStr.replace(" NPT", "").trim();
        const parts = cleanTime.split(":");
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        
        if (isNaN(hours) || isNaN(minutes)) {
            const nepaliDigits = timeStr.replace(/[0-9]/g, match => '०१२३४५६७८९'[parseInt(match)]);
            return nepaliDigits.replace("NPT", "नेपाली समय");
        }
        
        const isPm = hours >= 12;
        const dispHours = hours % 12 || 12;
        const amPmStr = isPm ? "बेलुकी" : "बिहान";
        const nepaliHours = dispHours.toString().replace(/[0-9]/g, match => '०१२३४५६७८९'[parseInt(match)]);
        const nepaliMinutes = minutes.toString().padStart(2, '0').replace(/[0-9]/g, match => '०१२३४५६७८९'[parseInt(match)]);
        
        return `${amPmStr} ${nepaliHours}:${nepaliMinutes} बजे (नेपाली समय)`;
    } catch(e) {
        const nepaliDigits = timeStr.replace(/[0-9]/g, match => '०१२३४५६७८९'[parseInt(match)]);
        return nepaliDigits.replace("NPT", "नेपाली समय");
    }
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

// ─── PLAYER IMAGE MAPPING ───
const CHAMPION_IMAGES: Record<string, string> = {
    "रोहित पौडेल": "/images/rohit_paudel.jpg",
    "सन्दीप लामिछाने": "/images/sandeep.webp",
    "दीपेन्द्र सिंह ऐरी": "/images/dipendra_airee.jpg",
    "कुशल भुर्तेल": "/images/kushal_bhurtel.webp"
};

// ─── VENUE LOCALIZATION DICTIONARY ───
const VENUE_TRANSLATIONS: Record<string, string> = {
    "King City, Canada": "किङ सिटी, क्यानडा",
    "Dallas, USA": "डलास, संयुक्त राज्य अमेरिका",
    "Windward, St. Vincent": "विन्डवर्ड, सेन्ट भिन्सेन्ट"
};

function getLocalizedVenue(venue: string): string {
    return VENUE_TRANSLATIONS[venue] || venue;
}

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
        { id: "chronicle", num: "०१", label: "महा-भिडन्त", sub: "THE BATTLEFRONT" },
        { id: "weapon", num: "०२", label: "हाम्रा योद्धाहरू", sub: "WARRIOR DOSSIER" },
        { id: "danger", num: "०३", label: "विपक्षी खतरा", sub: "THREAT DETECTED" },
        { id: "h2h", num: "०४", label: "भिडन्त इतिहास", sub: "HEAD-TO-HEAD" }
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
                            {activeMatch.format} &nbsp;·&nbsp; {formatNepaliDate(activeMatch.date)}, २०२६ &nbsp;·&nbsp; {getLocalizedVenue(activeMatch.venue)}
                        </span>

                        {/* THE CLASH PLATE */}
                        <div className="flex items-center justify-center gap-4 md:gap-8 w-full relative z-10">

                            {/* ── NEPAL SIDE ── */}
                            <div className="flex flex-col items-end gap-2 flex-1 min-w-0">
                                <div className="flex justify-end">
                                    <FlagImg
                                        code="np"
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
                                        code={activeMatch.oppFlag || FLAG_MAP[activeMatch.id]?.opp || "xx"}
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
                                <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "14px", fontWeight: 800 }} className="text-white tracking-wide">
                                    {timeLeft.days} दिन &nbsp;&middot;&nbsp; {timeLeft.hours} घण्टा &nbsp;&middot;&nbsp; {timeLeft.minutes} मिनेट &nbsp;&middot;&nbsp; {timeLeft.seconds} सेकेन्ड
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

                                    {/* Mini stacked index tag at the top */}
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.1em" }} className={`mb-1.5 px-2 py-0.5 border rounded-sm font-black transition-colors ${
                                        isTabActive 
                                            ? "text-[#C9A84C] border-[#C9A84C]/30 bg-[#C9A84C]/5" 
                                            : "text-white/30 border-white/5 bg-white/[0.01] group-hover:border-white/10"
                                    }`}>
                                        {tab.num}
                                    </span>

                                    <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className={`text-[14.5px] md:text-[15.5px] transition-colors ${
                                        isTabActive ? "text-[#C9A84C]" : "text-white/70 group-hover:text-white"
                                    }`}>
                                        {tab.label}
                                    </span>
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8.5px", letterSpacing: "0.15em" }} className="text-white/20 mt-1 tracking-widest block uppercase font-black">
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
                                    महा-भिडन्त विवरण // THE BATTLEFRONT
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
                                
                                {/* 🖼️ Player Photo/Tac Dossier Frame Column */}
                                <div className="lg:col-span-3 flex justify-center">
                                    <div className="relative w-[240px] h-[310px] bg-[#05070d] border border-white/10 rounded-sm overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)] group select-none">
                                        
                                        {/* Corner cut overlays (Tactical Gold Border) */}
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C9A84C] z-20" />
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C9A84C] z-20" />
                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C9A84C] z-20" />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C9A84C] z-20" />
                                        
                                        {/* Golden tactical sweep line */}
                                        <div className="absolute inset-x-0 h-[1.5px] bg-[#C9A84C]/45 top-0 shadow-[0_0_8px_#C9A84C] z-20 animate-[sweepEffect_2.2s_infinite]" />

                                        {CHAMPION_IMAGES[activeMatch.weapon] ? (
                                            <>
                                                {/* Sleek tactical dark vignette and multiply overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent z-10" />
                                                <div className="absolute inset-0 bg-[#1E3A8A]/10 mix-blend-multiply z-10 pointer-events-none" />
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={CHAMPION_IMAGES[activeMatch.weapon]} 
                                                    alt={activeMatch.weapon}
                                                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700 select-none"
                                                />
                                            </>
                                        ) : (
                                            /* Holographic Classified Tactical Wireframe Avatar */
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0b1222] to-[#04060b] select-none">
                                                {/* Rotating radar graphic */}
                                                <div className="relative w-36 h-36 border border-dashed border-[#1E3A8A]/30 rounded-full flex items-center justify-center animate-[sbSpotlightSpin_20s_linear_infinite]">
                                                    <div className="w-28 h-28 border border-white/5 rounded-full flex items-center justify-center" />
                                                    <div className="absolute top-0 w-2.5 h-2.5 bg-[#1E3A8A] rounded-full animate-ping" />
                                                    <div className="absolute bottom-0 w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
                                                </div>
                                                
                                                {/* Holographic fingerprints/scanlines */}
                                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />
                                                
                                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", letterSpacing: "0.2em" }} className="text-[#C9A84C] font-black uppercase mt-6 tracking-widest text-center animate-pulse">
                                                    CLASSIFIED SIGNAL IDENT
                                                </span>
                                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.12em" }} className="text-white/20 uppercase mt-1 tracking-wider text-center">
                                                    INTEL SECURE // THREAT ANALYSIS
                                                </span>
                                            </div>
                                        )}

                                        {/* Status Telemetry Banner */}
                                        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/5 rounded-sm select-none">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8.5px", letterSpacing: "0.15em" }} className="text-[#C9A84C] font-black uppercase">
                                                WARRIOR DOSSIER //
                                            </span>
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px" }} className="text-white/80 font-black uppercase">
                                                {activeMatch.format}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 📋 Warrior Description & Tactical Attributes Gauge Sheets */}
                                <div className="lg:col-span-4 space-y-5">
                                    <div className="border-l-2 border-[#C9A84C] pl-4 space-y-1">
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.22em" }} className="text-[#C9A84C] font-black uppercase block tracking-widest">
                                            OUR MATCH WINNER // हाम्रा योद्धाहरू
                                        </span>
                                        <h3 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-white text-[28px] leading-none mb-1">
                                            {activeChronicle.championName}
                                        </h3>
                                        <span style={{ fontFamily: "Mukta, sans-serif" }} className="text-white/40 text-[13px] block font-bold">
                                            {activeChronicle.championDesc}
                                        </span>
                                    </div>

                                    <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#B0B8C8] text-[14.5px] leading-relaxed text-justify m-0">
                                        {activeMatch.id === "01" && "नेपाली ब्याटिङ लाइनअपको मेरुदण्ड। रोहित पौडेल कठिन परिस्थितिमा संयमित भएर क्रिजमा टिकिरहने र आवश्यकता अनुसार गियर परिवर्तन गरी विपक्षी बलिङलाई ध्वस्त पार्न सक्ने कुशल म्याच विनर हुन्। कप्तानी भूमिकामा यिनको रणनीतिक सुझबुझ र धैर्य नै हाम्रो पहिलो भरोसा हो।"}
                                        {activeMatch.id === "02" && "विश्वस्तरिय स्पिनका जादूगर। सन्दीप लामिछानेको नाडीबाट फुत्किने जादुमयी लेग-स्पिन र तीब्र गतिको गुगली विपक्षी ब्याट्सम्यानहरूका लागि सधैं रहस्य बन्ने गर्छ। यिनको सटिक बलिङ र बीचका ओभरहरूमा लगातार विकेट झार्ने असाधारण खुबीले जुनसुकै क्षण खेललाई नेपालको कब्जामा ल्याउँछ।"}
                                        {activeMatch.id === "03" && "मैदानमा आगो ओकल्ने नेपाली क्रिकेटको सर्वोत्कृष्ट अलराउन्डर। ६ बलमा ६ छक्का प्रहार गरेर इतिहासको सिमाना कोरेका दीपेन्द्र सिंह ऐरी विष्फोटक ब्याटिङ, कसिलो अफ-स्पिन, र चील झैं छिटो दौडने फिल्डिङका साथ खेलको जुनसुकै मोडमा विपक्षीलाई निस्तेज पार्न सक्षम छन्।"}
                                        {activeMatch.id === "04" && "विष्फोटक बायाँ हाते ब्याट्सम्यान र घातक स्पिनर। कुशल मल्लको ब्याट जब मैदानमा चल्छ, विपक्षी बलरहरू दिशाहीन हुन पुग्छन्। यिनको तीव्र आक्रामक प्रहार र महत्वपूर्ण मोडहरूमा साझेदारी तोड्ने स्पिन बलिङले विपक्षी शिविरमा सधैं त्रास र सनसनी फैलाउँछ।"}
                                        {activeMatch.id === "05" && "नेपाली ओपनिङ ब्याटिङका मुख्य हतियार। कुशल भुर्तेलको विष्फोटक ब्याटिङ र मैदानका सबै दिशामा बाउन्ड्री प्रहार गर्न सक्ने बहुमुखी प्रहार क्षमताले सुरुवाती पावरप्लेमै नेपाललाई विशाल गति दिन्छ। यिनको आक्रामक शैली र उच्च आत्मविश्वासले विपक्षी टोलीको बलियो रणनीतिलाई पहिलो ओभरमै निस्तेज पार्छ।"}
                                        {activeMatch.id === "06" && "नेपाली क्रिकेटका युवा सनसनी र बहुप्रतिभाशाली तीव्र गतिका अलराउन्डर। गुलशन झा मध्यक्रममा कडा र विष्फोटक प्रहार गर्न सक्ने ब्याटिङ क्षमता र कसिलो बायाँ हाते तीब्र बलिङका साथ जुनसुकै परिस्थितिमा पनि निर्णायक बन्न सक्छन्। यिनको युवा उर्जा र साहस नै नेपाली क्रिकेटको भविष्य हो।"}
                                    </p>

                                    {/* 📊 Tactical Attributes Dashboard Gauges */}
                                    <div className="bg-[#05070c]/90 border border-white/5 p-5 rounded-sm space-y-4 relative overflow-hidden select-none">
                                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.008)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />
                                        
                                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.15em" }} className="text-white/30 font-black uppercase">TACTICAL ATTRIBUTES // लडाकु क्षमता</span>
                                            <span className="text-[#C9A84C] text-[10px] font-black uppercase animate-pulse">ACTIVE FEED</span>
                                        </div>

                                        {/* Attribute 1 */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span className="text-white/60 tracking-wider">
                                                    {activeMatch.id === "01" && "LEADERSHIP INTELLIGENCE // कप्तानी रणनीतिक स्तर"}
                                                    {activeMatch.id === "02" && "SPIN VARIATION RADAR // स्पिन विविधता"}
                                                    {activeMatch.id === "03" && "STRIKE POTENTIAL ENERGY // ब्याटिङ विष्फोटक स्तर"}
                                                    {activeMatch.id === "04" && "EXPLOSIVE CAPACITY // तीव्र प्रहार दर"}
                                                    {activeMatch.id === "05" && "STRIKE ENERGY // पावरप्ले गति"}
                                                    {activeMatch.id === "06" && "PACE VELOCITY // तीव्र बलिङ गति"}
                                                </span>
                                                <span className="text-[#C9A84C]">
                                                    {activeMatch.id === "01" && "९८%"}
                                                    {activeMatch.id === "02" && "९९%"}
                                                    {activeMatch.id === "03" && "९७%"}
                                                    {activeMatch.id === "04" && "९६%"}
                                                    {activeMatch.id === "05" && "९५%"}
                                                    {activeMatch.id === "06" && "९०%"}
                                                </span>
                                            </div>
                                            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#C9A84C] rounded-full" 
                                                    style={{ width: activeMatch.id === "01" ? "98%" : activeMatch.id === "02" ? "99%" : activeMatch.id === "03" ? "97%" : activeMatch.id === "04" ? "96%" : activeMatch.id === "05" ? "95%" : "90%" }} 
                                                />
                                            </div>
                                        </div>

                                        {/* Attribute 2 */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span className="text-white/60 tracking-wider">
                                                    {activeMatch.id === "01" && "ANCHOR INTEGRITY // क्रिजको अडान"}
                                                    {activeMatch.id === "02" && "CRUTCH WICKETS TELEMETRY // मुख्य विकेट लिने दर"}
                                                    {activeMatch.id === "03" && "FIELDING RADIUS RATE // फिल्डिङ कभरेज क्षेत्र"}
                                                    {activeMatch.id === "04" && "CLUTCH COEFFICIENT // कठिन परिस्थिति योगदान"}
                                                    {activeMatch.id === "05" && "FIELDING RADUS // फिल्डिङ गति"}
                                                    {activeMatch.id === "06" && "EXPLOSIVE STRIKE RANGE // फिनिसिङ क्षमता"}
                                                </span>
                                                <span className="text-white/80">
                                                    {activeMatch.id === "01" && "९५%"}
                                                    {activeMatch.id === "02" && "९६%"}
                                                    {activeMatch.id === "03" && "९८%"}
                                                    {activeMatch.id === "04" && "९०%"}
                                                    {activeMatch.id === "05" && "९२%"}
                                                    {activeMatch.id === "06" && "८८%"}
                                                </span>
                                            </div>
                                            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#1E3A8A] rounded-full" 
                                                    style={{ width: activeMatch.id === "01" ? "95%" : activeMatch.id === "02" ? "96%" : activeMatch.id === "03" ? "98%" : activeMatch.id === "04" ? "90%" : activeMatch.id === "05" ? "92%" : "88%" }} 
                                                />
                                            </div>
                                        </div>

                                        {/* Attribute 3 */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span className="text-white/60 tracking-wider">
                                                    {activeMatch.id === "01" && "STRIKE RATE ENERGY // ब्याटिङ गति"}
                                                    {activeMatch.id === "02" && "PRESSURE RESISTANCE // दबाब प्रतिरोध"}
                                                    {activeMatch.id === "03" && "GAME CHANGE COEFFICIENT // खेल परिवर्तन दर"}
                                                    {activeMatch.id === "04" && "SPIN TACTICAL STRENGTH // स्पिन विकेट योगदान"}
                                                    {activeMatch.id === "05" && "MATCH WINNER RATIO // म्याच विनर दर"}
                                                    {activeMatch.id === "06" && "YOUTH ENERGY INDEX // युवा हिम्मत स्तर"}
                                                </span>
                                                <span className="text-[#C41E3A]">
                                                    {activeMatch.id === "01" && "८८%"}
                                                    {activeMatch.id === "02" && "९२%"}
                                                    {activeMatch.id === "03" && "९५%"}
                                                    {activeMatch.id === "04" && "८५%"}
                                                    {activeMatch.id === "05" && "९४%"}
                                                    {activeMatch.id === "06" && "९५%"}
                                                </span>
                                            </div>
                                            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#C41E3A] rounded-full" 
                                                    style={{ width: activeMatch.id === "01" ? "88%" : activeMatch.id === "02" ? "92%" : activeMatch.id === "03" ? "95%" : activeMatch.id === "04" ? "85%" : activeMatch.id === "05" ? "94%" : "95%" }} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === "danger" && (
                            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-center animate-[dynamicFadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
                                
                                {/* 🖼️ Opponent Classified Threat Dossier Column */}
                                <div className="lg:col-span-3 flex justify-center">
                                    <div className="relative w-[240px] h-[310px] bg-[#0c0805] border border-white/10 rounded-sm overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)] group select-none">
                                        
                                        {/* Tactical warning border */}
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C41E3A] z-20" />
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/10 z-20" />
                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/10 z-20" />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C41E3A] z-20" />
                                        
                                        {/* Glowing target crosshair */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#C41E3A]/20 rounded-full flex items-center justify-center animate-[vsPulse_2.5s_ease-in-out_infinite]">
                                            <div className="w-24 h-24 border border-dashed border-[#C41E3A]/15 rounded-full flex items-center justify-center" />
                                            <div className="absolute w-4 h-[1.5px] bg-[#C41E3A]" />
                                            <div className="absolute h-4 w-[1.5px] bg-[#C41E3A]" />
                                        </div>

                                        {/* Holographic fingerprints/scanlines */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(211,47,47,0.025)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />

                                        {/* Dynamic radar scanner line */}
                                        <div className="absolute inset-x-0 h-[1.5px] bg-[#C9A84C]/40 top-0 shadow-[0_0_8px_#C9A84C] z-20 animate-[sweepEffect_2.5s_infinite]" />

                                        {/* Dark silhouette profile placeholder */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1c0808] to-[#04060b] select-none">
                                            <div className="relative w-36 h-36 border border-[#C41E3A]/30 rounded-full flex items-center justify-center bg-black/60 shadow-[0_0_30px_rgba(211,47,47,0.08)]">
                                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white/10 animate-[vsPulse_3s_ease-in-out_infinite]">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                            
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", letterSpacing: "0.2em" }} className="text-[#C41E3A] font-black uppercase mt-6 tracking-widest text-center animate-pulse">
                                                CLASSIFIED ENEMY TARGET
                                            </span>
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.12em" }} className="text-[#C9A84C] font-black uppercase mt-1 tracking-wider text-center">
                                                THREAT IDENT: {activeMatch.danger.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Status Telemetry Banner */}
                                        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-black/75 backdrop-blur-md px-3 py-1.5 border border-white/5 rounded-sm select-none">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8.5px", letterSpacing: "0.15em" }} className="text-[#C41E3A] font-black uppercase">
                                                TARGET TELEMETRY //
                                            </span>
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px" }} className="text-white/80 font-black uppercase">
                                                {activeMatch.format}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 📋 Threat Description & Attributes Matrix */}
                                <div className="lg:col-span-4 space-y-5">
                                    <div className="border-l-2 border-[#C41E3A] pl-4 space-y-1">
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.22em" }} className="text-[#C41E3A] font-black uppercase block tracking-widest">
                                            RIVAL THREAT MATRIX // विपक्षी मुख्य खतरा
                                        </span>
                                        <h3 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-white text-[28px] leading-none mb-1">
                                            {activeChronicle.dangerName}
                                        </h3>
                                        <span style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#C41E3A] text-[13px] block font-bold">
                                            {activeChronicle.dangerDesc}
                                        </span>
                                    </div>

                                    <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#B0B8C8] text-[14.5px] leading-relaxed text-justify m-0">
                                        {activeMatch.id === "01" && "क्यानडाका चतुर कप्तान र विश्वस्तरीय बायाँ हाते स्पिनर। साद बिन जफर कसिलो बलिङका साथै क्रिजको अवस्था बुझेर विपक्षी ब्याट्सम्यानलाई धरापमा पार्न खप्पिस छन्। यिनको अनुभव र दबावपूर्ण स्थितिमा खेलको दिशा परिवर्तन गर्ने क्षमता हाम्रा लागि गम्भीर चुनौती हो।"}
                                        {activeMatch.id === "02" && "ओमानका विष्फोटक अलराउन्डर र मुख्य स्तम्भ। आकिब इलियास आक्रामक ब्याटिङका साथै आफ्नो स्पिन बलिङले कुनै पनि बेला साझेदारी तोड्न माहिर छन्। यिनको विष्फोटक शैली र मैदानमा रहने आक्रामक उर्जालाई छिट्टै घेराबन्दीमा पार्नु नेपाली टोलीको पहिलो चुनौती हुनेछ।"}
                                        {activeMatch.id === "03" && "क्यानडाका प्रमुख ब्याट्सम्यान र म्याच विनर। निकोलस किर्टन मध्यक्रममा लगातार बलियो साझेदारी बनाउने र पावरप्लेपछि तीव्र गतिमा रन बटुल्न असाधारण क्षमता राख्छन्। यिनको विकेट समयमै नझारे नेपाली बलिङमा ठूलो दबाव सिर्जना हुन सक्छ।"}
                                        {activeMatch.id === "04" && "ओमानका अनुभवी र चतुर स्पिन अलराउन्डर। जिशान मकसूद दबाबको अवस्थामा विकेट रोक्न र आफ्नो अनुभवी बलिङ र ब्याटिङले नेपाललाई अप्ठ्यारोमा पार्न सक्ने म्याच विनर हुन्। यिनको सटिक स्पिन रणनीतिलाई सुरुमै असफल पार्नुपर्छ।"}
                                        {activeMatch.id === "05" && "संयुक्त राज्य अमेरिकाका मुख्य तीब्र गतिका बलर। सौरभ नेत्रावलकर सटीक इन-स्विंग र मृत्यु ओभर (Death Overs) मा अचूक योर्कर प्रहार करना सिपालु छन्। विश्वकपमा नेपाललाई अप्ठ्यारोमा पारेका यिनको बलिङलाई निस्तेज पार्न नेपाली ओपनरहरू सतर्क हुनुपर्नेछ।"}
                                        {activeMatch.id === "06" && "स्कटल्यान्डका अनुभवी कप्तान र मध्यक्रमका खम्बा। रिची बेरिंग्टन दबाब झेल्दै कठिन इनिङ्स खेल्न र कप्तानी सुझबुझका साथ खेल नियन्त्रणमा लिन खप्पिस छन्। यिनलाई सस्तोमै आउट गर्नु हाम्रो जीतका लागि अनिवार्य सर्त हो।"}
                                    </p>

                                    {/* 📊 Threat Attributes Matrix Dashboard */}
                                    <div className="bg-[#0c0505]/95 border border-[#D32F2F]/20 p-5 rounded-sm space-y-4 relative overflow-hidden select-none">
                                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.008)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />
                                        
                                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.15em" }} className="text-[#D32F2F] font-black uppercase">THREAT ASSESSMENT // विपक्षी खतरा स्तर</span>
                                            <span className="text-[#D32F2F] text-[10px] font-black uppercase animate-pulse">WAR TARGET</span>
                                        </div>

                                        {/* Threat Attribute 1 */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span className="text-white/60 tracking-wider">
                                                    THREAT INDEX // समग्र खतरा गुणांक
                                                </span>
                                                <span className="text-[#D32F2F]">
                                                    {activeMatch.id === "01" && "९२%"}
                                                    {activeMatch.id === "02" && "९६%"}
                                                    {activeMatch.id === "03" && "९०%"}
                                                    {activeMatch.id === "04" && "९२%"}
                                                    {activeMatch.id === "05" && "९७%"}
                                                    {activeMatch.id === "06" && "९४%"}
                                                </span>
                                            </div>
                                            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#D32F2F] rounded-full" 
                                                    style={{ width: activeMatch.id === "01" ? "92%" : activeMatch.id === "02" ? "96%" : activeMatch.id === "03" ? "90%" : activeMatch.id === "04" ? "92%" : activeMatch.id === "05" ? "97%" : "94%" }} 
                                                />
                                            </div>
                                        </div>

                                        {/* Threat Attribute 2 */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span className="text-white/60 tracking-wider">
                                                    {activeMatch.id === "01" && "SPIN STABILIZATION // स्पिन नियन्त्रण क्षमता"}
                                                    {activeMatch.id === "02" && "EXPLOSIVE ATTACK // ब्याटिङ प्रहार स्तर"}
                                                    {activeMatch.id === "03" && "BOUNDARY VELOCITY // चौका प्रहार दर"}
                                                    {activeMatch.id === "04" && "SPIN TACTICAL DEPTH // स्पिन जाल रणनीति"}
                                                    {activeMatch.id === "05" && "SWING SPEED PRECISION // इन-स्विंग सटीक स्तर"}
                                                    {activeMatch.id === "06" && "MIDDLE ORDER INTEGRITY // मध्यक्रम ब्याटिङ बल"}
                                                </span>
                                                <span className="text-[#D32F2F]">
                                                    {activeMatch.id === "01" && "९०%"}
                                                    {activeMatch.id === "02" && "९५%"}
                                                    {activeMatch.id === "03" && "८८%"}
                                                    {activeMatch.id === "04" && "९१%"}
                                                    {activeMatch.id === "05" && "९६%"}
                                                    {activeMatch.id === "06" && "९२%"}
                                                </span>
                                            </div>
                                            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#D32F2F] rounded-full" 
                                                    style={{ width: activeMatch.id === "01" ? "90%" : activeMatch.id === "02" ? "95%" : activeMatch.id === "03" ? "88%" : activeMatch.id === "04" ? "91%" : activeMatch.id === "05" ? "96%" : "92%" }} 
                                                />
                                            </div>
                                        </div>

                                        {/* Threat Attribute 3 */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span className="text-[#D32F2F] tracking-wider">
                                                    INTEL COUNTERMEASURE // रणनीतिक प्रत्याक्रमण रणनीति
                                                </span>
                                                <span className="text-[#D32F2F]">
                                                    {activeMatch.id === "01" && "८५% -- TACTICAL SIEGE"}
                                                    {activeMatch.id === "02" && "९२% -- SPIN CORRIDOR"}
                                                    {activeMatch.id === "03" && "८५% -- PRESSURE COVER"}
                                                    {activeMatch.id === "04" && "९५% -- SEAM ASSAULT"}
                                                    {activeMatch.id === "05" && "९४% -- BOUNDARY SIEGE"}
                                                    {activeMatch.id === "06" && "९५% -- PACE SURGE"}
                                                </span>
                                            </div>
                                            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#D32F2F] rounded-full" 
                                                    style={{ width: activeMatch.id === "01" ? "85%" : activeMatch.id === "02" ? "92%" : activeMatch.id === "03" ? "85%" : activeMatch.id === "04" ? "95%" : activeMatch.id === "05" ? "94%" : "95%" }} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === "h2h" && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-[dynamicFadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
                                
                                {/* Tactical Compare Dossier Column (8 cols) */}
                                <div className="lg:col-span-8 space-y-5">
                                    <div className="border-l-2 border-[#C9A84C] pl-4 space-y-1">
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", letterSpacing: "0.22em" }} className="text-[#C9A84C] font-black uppercase block tracking-widest">
                                            COMBAT FIELD ANALYSIS // भिडन्त इतिहास र रेकर्ड
                                        </span>
                                        <h3 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-white text-[28px] leading-none mb-1">
                                            द्वन्द्व इतिहास
                                        </h3>
                                        <span style={{ fontFamily: "Mukta, sans-serif" }} className="text-white/40 text-[13px] block font-bold">
                                            नेपाल र {opponentName} बिचको ऐतिहासिक तुलनात्मक स्थिति
                                        </span>
                                    </div>

                                    {/* High-Fidelity Tactical Compare Matrix */}
                                    <div className="bg-[#05070c]/90 border border-white/5 p-6 rounded-sm space-y-5 relative overflow-hidden select-none">
                                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.008)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />

                                        {/* H2H Duel Header */}
                                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9.5px", letterSpacing: "0.15em" }} className="text-[#C9A84C] font-black uppercase">TACTICAL COMPARISON GRID</span>
                                            <span className="text-[#D32F2F] text-[10px] font-black uppercase tracking-wider animate-pulse">RECORD IDENT: {activeMatch.h2h}</span>
                                        </div>

                                        {/* Compare Metric 1: H2H Split Meter */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[11px] font-bold text-white/70">
                                                <span className="tracking-wide">NEPAL FORCE STRENGTH</span>
                                                <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-[#C9A84C]">H2H RECORD</span>
                                                <span className="tracking-wide">{opponentName.toUpperCase()} FORCE STRENGTH</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {/* Left side: Nepal strength */}
                                                <div className="flex-1 h-[6px] bg-[#1E3A8A] rounded-l-full relative overflow-hidden">
                                                    <div className="absolute right-0 top-0 bottom-0 bg-white/20 w-[10%]" />
                                                </div>
                                                {/* Center metric pill */}
                                                <div style={{ fontFamily: "Mukta, sans-serif", fontSize: "11px", fontWeight: 800 }} className="px-3 py-0.5 border border-white/10 rounded-full text-white bg-black/60 shrink-0">
                                                    {activeMatch.h2h}
                                                </div>
                                                {/* Right side: Opponent strength */}
                                                <div className="flex-1 h-[6px] bg-[#D32F2F] rounded-r-full relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 bg-white/20 w-[15%]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Compare Metric 2: Format & Venue Integrity */}
                                        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                            <div className="bg-white/[0.01] border border-white/5 px-4 py-3 rounded-sm">
                                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8px", letterSpacing: "0.1em" }} className="text-white/30 uppercase block mb-1">खेल ढाँचा // MATCH FORMAT</span>
                                                <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-white text-[15px] block">{activeMatch.format}</span>
                                            </div>
                                            <div className="bg-white/[0.01] border border-white/5 px-4 py-3 rounded-sm">
                                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8px", letterSpacing: "0.1em" }} className="text-white/30 uppercase block mb-1">भिडन्त मैदान // COMBAT GROUND</span>
                                                <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-white text-[14px] block truncate">{getLocalizedVenue(activeMatch.venue)}</span>
                                            </div>
                                        </div>

                                        {/* Compare Metric 3: Narrative summary paragraph */}
                                        <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#B0B8C8] text-[13.5px] leading-relaxed text-justify mt-2 m-0">
                                            इतिहास साक्षी छ कि नेपाली क्रिकेटको यो युद्धमा दुवै टोलीले रगत र पसिना बगाएका छन्। यो खेल पुरानो हिसाब चुक्ता गर्ने, हिमालको सिंह झैं गर्जने र २२ गजको पीचमा आफ्नो साम्राज्य खडा गर्ने ऐतिहासिक मौका हो।
                                        </p>
                                    </div>
                                </div>

                                {/* Radial Countdown Orb Column (4 cols) */}
                                <div className="lg:col-span-4 flex justify-center">
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

            {/* ── 🗺️ VISCERAL TECTONIC COMBAT JOURNEY TIMELINE (CAMPAIGN TIMELINE) ── */}
            <section className="max-w-6xl mx-auto px-6 relative z-10 select-none animate-[dynamicFadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_1.0s_both] pb-20">
                
                <div className="flex items-center gap-4 mb-14">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", letterSpacing: "0.25em" }} className="text-[#C9A84C] font-black uppercase tracking-wider shrink-0">
                        युद्ध अभियान श्रृंखला // CAMPAIGN TIMELINE
                    </span>
                    <div className="flex-grow border-t border-white/5 opacity-40" />
                </div>

                {/* Tactical Vertical Timeline Track Container */}
                <div className="relative max-w-4xl mx-auto pl-12 md:pl-16">
                    
                    {/* Glowing active visual campaign progress cable line */}
                    <div className="absolute left-[20px] md:left-[26px] top-6 bottom-6 w-[2px] bg-white/5 z-0 pointer-events-none">
                        <div 
                            className="bg-gradient-to-b from-[#C9A84C] via-[#1E3A8A] to-[#D32F2F] w-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(201,168,76,0.35)]"
                            style={{ height: `${(completedMissions / totalMissions) * 100}%` }}
                        />
                    </div>

                    <div className="flex flex-col gap-8 w-full">
                        {resolvedFixtures.map((fix) => {
                            const isCompleted = fix.past;
                            const isActiveSelection = fix.id === activeMatchId;

                            // Translate venue to Devanagari using our helper
                            const localizedVenue = getLocalizedVenue(fix.venue);
                            
                            // Format time nicely in Devanagari 12-hour format
                            const localizedTime = formatNepaliTime(fix.time);

                            // Determine if we should inject a stage header before this item
                            let phaseHeader = null;
                            if (fix.id === "01") {
                                phaseHeader = (
                                    <div className="relative -left-6 md:-left-8 flex items-center gap-4 mb-4 select-none animate-[fadeUpIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
                                        <div className="shrink-0 px-3 py-1 border border-[#C9A84C]/30 bg-[#C9A84C]/5 rounded-sm">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", letterSpacing: "0.15em" }} className="text-[#C9A84C] font-black uppercase">
                                                PHASE ०१ // एसिया-क्यानडा त्रिकोणात्मक श्रृंखला
                                            </span>
                                        </div>
                                        <div className="flex-grow h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                                    </div>
                                );
                            } else if (fix.id === "05") {
                                phaseHeader = (
                                    <div className="relative -left-6 md:-left-8 flex items-center gap-4 mb-4 mt-6 select-none animate-[fadeUpIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
                                        <div className="shrink-0 px-3 py-1 border border-[#D32F2F]/30 bg-[#D32F2F]/5 rounded-sm">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", letterSpacing: "0.15em" }} className="text-[#D32F2F] font-black uppercase">
                                                PHASE ०२ // विश्वकप बदला भिडन्त
                                            </span>
                                        </div>
                                        <div className="flex-grow h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                                    </div>
                                );
                            } else if (fix.id === "06") {
                                phaseHeader = (
                                    <div className="relative -left-6 md:-left-8 flex items-center gap-4 mb-4 mt-6 select-none animate-[fadeUpIn_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
                                        <div className="shrink-0 px-3 py-1 border border-[#1E3A8A]/30 bg-[#1E3A8A]/10 rounded-sm">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10px", letterSpacing: "0.15em" }} className="text-white/80 font-black uppercase">
                                                PHASE ०३ // लिग-२ च्याम्पियनशिप महा-संग्राम
                                            </span>
                                        </div>
                                        <div className="flex-grow h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                                    </div>
                                );
                            }

                            return (
                                <div key={fix.id} className="w-full flex flex-col">
                                    {phaseHeader}
                                    <div
                                        onClick={() => {
                                            setSelectedMatchId(fix.id);
                                            setSelectedTab("chronicle");
                                            if (typeof navigator !== "undefined" && navigator.vibrate) {
                                                navigator.vibrate([10, 5, 10]);
                                            }
                                        }}
                                        className="relative flex items-center w-full group/item"
                                    >
                                        
                                        {/* 🔘 The Tectonic circular node on the timeline path */}
                                        <div className="absolute left-[-40px] md:left-[-49px] z-10 flex items-center justify-center w-10 h-10 select-none pointer-events-none">
                                            {isActiveSelection ? (
                                                <div className="relative flex items-center justify-center">
                                                    {/* Double pulsing rings for selected/active */}
                                                    <span className="absolute w-7 h-7 bg-[#C41E3A]/20 border border-[#C41E3A]/40 rounded-full animate-ping" />
                                                    <span className="absolute w-5 h-5 bg-[#C9A84C]/35 rounded-full" />
                                                    <span className="relative w-2.5 h-2.5 bg-[#C41E3A] rounded-full border border-white/30" />
                                                </div>
                                            ) : isCompleted ? (
                                                <div className="relative flex items-center justify-center">
                                                    {/* Golden solid completed node */}
                                                    <span className="w-5 h-5 bg-[#07080F] border-2 border-[#C9A84C]/60 rounded-full flex items-center justify-center">
                                                        <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="relative flex items-center justify-center">
                                                    {/* Muted future node */}
                                                    <span className="w-4 h-4 bg-[#07080F] border border-white/10 rounded-full flex items-center justify-center">
                                                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* 📦 The Tactical Campaign Card */}
                                        <div
                                            className={`flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 w-full cursor-pointer transition-all duration-300 rounded-sm relative overflow-hidden bg-gradient-to-br from-[#090d16]/30 to-[#04060b]/40 border ${
                                                isActiveSelection 
                                                    ? "border-[#C9A84C] bg-white/[0.03] shadow-[0_15px_40px_rgba(201,168,76,0.06)] scale-[1.01]" 
                                                    : "border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                                            }`}
                                        >
                                            
                                            {/* Tactical Corner Brackets */}
                                            <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l transition-colors duration-300 ${
                                                isActiveSelection ? "border-[#C9A84C]" : "border-white/10 group-hover/item:border-white/20"
                                            }`} />
                                            <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r transition-colors duration-300 ${
                                                isActiveSelection ? "border-[#C9A84C]" : "border-white/10 group-hover/item:border-white/20"
                                            }`} />
                                            <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l transition-colors duration-300 ${
                                                isActiveSelection ? "border-[#C9A84C]" : "border-white/10 group-hover/item:border-white/20"
                                            }`} />
                                            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r transition-colors duration-300 ${
                                                isActiveSelection ? "border-[#C9A84C]" : "border-white/10 group-hover/item:border-white/20"
                                            }`} />

                                            {/* Background radar grid pattern for selected match */}
                                            {isActiveSelection && (
                                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(201,168,76,0.01)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none" />
                                            )}

                                            {/* 1. OVERLAPPING TILTED FLAG FACEOFF DUEL (THE FLAG INTEGRATION) */}
                                            <div className="flex items-center gap-4 shrink-0">
                                                
                                                {/* Flag Faceoff Container */}
                                                <div className="relative flex items-center w-[95px] h-[48px] select-none pointer-events-none shrink-0">
                                                    {/* Nepal Flag (Left - Inward Tilt) */}
                                                    <div className="absolute left-0 z-10">
                                                        <FlagImg
                                                            code="np"
                                                            side="left"
                                                            size={26}
                                                        />
                                                    </div>
                                                    
                                                    {/* Tactical VS Overlay divider ring */}
                                                    <div style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="absolute left-[36px] z-20 flex items-center justify-center w-5 h-5 bg-[#05070c] border border-white/10 text-white text-[9.5px] font-black rounded-full shadow-[0_0_10px_black]">
                                                        VS
                                                    </div>

                                                    {/* Opponent Flag (Right - Inward Tilt) */}
                                                    <div className="absolute right-0 z-10">
                                                        <FlagImg
                                                            code={fix.oppFlag || FLAG_MAP[fix.id]?.opp || "xx"}
                                                            side="right"
                                                            size={26}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Mission Index & Format details */}
                                                <div className="flex flex-col">
                                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10.5px", letterSpacing: "0.15em" }} className={`font-black uppercase tracking-wider block ${
                                                        isActiveSelection ? "text-[#C41E3A]" : isCompleted ? "text-[#C9A84C]" : "text-white/30"
                                                    }`}>
                                                        MISSION #{fix.id} {isCompleted ? "// HISTORY" : "// FUTURE"}
                                                    </span>
                                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8.5px", letterSpacing: "0.05em" }} className="text-white/30 uppercase mt-0.5 tracking-wider font-black">
                                                        {fix.format} CHAMPIONSHIP
                                                    </span>
                                                </div>
                                            </div>

                                            {/* 2. MATCHUP TITLE AND LOCALIZED VENUE */}
                                            <div className="flex-1 min-w-0 md:px-6">
                                                <h3 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-white text-[17px] md:text-[19px] leading-snug m-0">
                                                    नेपाल <span className="text-white/40 mx-1.5 font-normal">विरुद्ध</span> {fix.nepaliName.replace("विरुद्ध", "")}
                                                </h3>
                                                
                                                {/* Localized Devanagari Venue */}
                                                <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "12px" }} className="text-white/35 block mt-0.5 font-bold">
                                                    {localizedVenue}
                                                </span>
                                            </div>

                                            {/* 3. LOCALIZED DATE-TIME & STATUS BADGES */}
                                            <div className="flex flex-col md:items-end justify-center gap-2.5 shrink-0">
                                                {/* Fully Localized Date & Time (All Devanagari, no English mixed!) */}
                                                <div className="flex flex-col md:items-end leading-tight">
                                                    <span style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }} className="text-[#C9A84C] text-[13px]">
                                                        {formatNepaliDate(fix.date)}
                                                    </span>
                                                    <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "10.5px" }} className="text-white/30 mt-0.5">
                                                        {localizedTime}
                                                    </span>
                                                </div>

                                                {/* Status Badge */}
                                                {isCompleted ? (
                                                    <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "9.5px", letterSpacing: "0.08em" }} className="text-[#C9A84C] font-black uppercase border border-[#C9A84C]/25 bg-[#C9A84C]/5 px-3 py-0.5 rounded-sm tracking-wider w-max select-none pointer-events-none">
                                                        सम्पन्न
                                                    </span>
                                                ) : (
                                                    <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "9.5px", letterSpacing: "0.08em" }} className="text-[#D32F2F] font-black uppercase border border-[#D32F2F]/25 bg-[#D32F2F]/5 px-3 py-0.5 rounded-sm tracking-wider w-max select-none pointer-events-none">
                                                        आगामी
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
