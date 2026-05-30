"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { StoryFrontmatter } from "@/lib/storyTypes";
import { 
    Cpu, 
    Radio, 
    Terminal, 
    ChevronRight,
    CornerDownRight,
    Sliders,
    Activity,
    Trophy,
    Flame,
    Tv
} from "lucide-react";

interface TelemetryData {
    matrix: string;
    decibel: string;
    location: string;
    quality: string;
    operator: string;
    weaponTitle: string;
    weaponStat: string;
    weaponDesc: string;
    tacticalMetric: string;
    tacticalVal: number;
    timeline: { date: string; event: string }[];
}

const SLUG_TELEMETRY: Record<string, TelemetryData> = {
    "monty-desai-interview": {
        matrix: "ह्याप्पी ड्रेसिङ रुम // HAPPY ROOM",
        decibel: "१३८ db",
        location: "कीर्तिपुर, नेपाल",
        quality: "९९.८% ACTIVE",
        operator: "कमान्डर मोन्टी",
        weaponTitle: "सकारात्मक ड्रेसिङ रुम वातावरण",
        weaponStat: "१२ मध्ये ११ खेलमा जित",
        weaponDesc: "कप्तान रोहित पौडेल र खेलाडीहरूको मानसिक दृढता बढाउन कोरेको मनोवैज्ञानिक ढाँचा।",
        tacticalMetric: "मानसिक स्थिरता सूचक",
        tacticalVal: 98,
        timeline: [
            { date: "फेब्रुअरी २०२३", event: "मुख्य प्रशिक्षकमा नियुक्ति र ८/२४ संकटकालीन सुधार" },
            { date: "मार्च २०२३", event: "ऐतिहासिक ११ जित र ओडीआई मान्यता सुरक्षा" },
            { date: "फेब्रुअरी २०२६", event: "वान्खेडेमा स्कटल्यान्डविरुद्ध ३ विकेटको मुक्ति जित" }
        ]
    },
    "sandeep-googly": {
        matrix: "रहस्यमयी गुगली // THE WRONG'UN",
        decibel: "१३५ db",
        location: "शारजहाँ / दुबई",
        quality: "१००.०% LOCKED",
        operator: "स्पिन कमान्डर सन्दीप",
        weaponTitle: "तेस्रो औंलाको रिस्ट-रिलिज झट्का",
        weaponStat: "४२ म्याचमै १०० ओडीआई विकेट",
        weaponDesc: "८५-९५ कि.मी. को उच्च वेगमा conventional एक्सनबाट फालेर ब्याट्सम्यान झुक्क्याउने अस्त्र।",
        tacticalMetric: "नाडी-कोण लचकता सूचक",
        tacticalVal: 100,
        timeline: [
            { date: "सन् २०१५", event: "भैरहवा ट्यालेन्ट हन्टमा पुबुदुद्वारा असाधारण प्रतिभा पहिचान" },
            { date: "अगस्ट २०१८", event: "नेदरल्यान्ड्सविरुद्ध पहिलो ओडीआई खेल र सनसनीपूर्ण विकेट" },
            { date: "अप्रिल २०२३", event: "४२ म्याचमा १०० ओडीआई विकेटको अभूतपूर्व विश्व कीर्तिमान" }
        ]
    },
    "kushal-mindset": {
        matrix: "निडर ओपनिङ // FEARLESS ATTACK",
        decibel: "१३२ db",
        location: "बुटवल / मेलबर्न",
        quality: "९८.२% MAXIMUM",
        operator: "ओपनिङ हतियार कुशल",
        weaponTitle: "पावरप्ले आक्रामक पुल एन्ड हुक",
        weaponStat: "डेब्युमै लगातार ३ फिफ्टी (विश्व रेकर्ड)",
        weaponDesc: "विरोधी फास्ट बलरहरूको मनोबल पहिलो ओभरमै ध्वस्त पार्ने मनोवैज्ञानिक फ्रन्ट-फुट आक्रमण।",
        tacticalMetric: "ब्याट स्पिड एक्सेलेरेसन सूचक",
        tacticalVal: 95,
        timeline: [
            { date: "अप्रिल २०२१", event: "डेब्यु त्रिदेशीय सिरिजमै लगातार ३ अर्धशतकको विश्व रेकर्ड" },
            { date: "सेप्टेम्बर २०२३", event: "एशिया कपमा भारतविरुद्ध मोहम्मद सामी र सिराजलाई विष्फोटक प्रहार" },
            { date: "फेब्रुअरी २०२६", event: "वान्खेडेको ऐतिहासिक विश्वकप खेलमा स्कटल्यान्डविरुद्ध ३ विकेट जित" }
        ]
    },
    "nepal-vs-south-africa-one-run": {
        matrix: "सेन्ट भिन्सेन्ट त्रासदी // ONE-RUN DRAMA",
        decibel: "१३६ db",
        location: "अर्नोस वेल, सेन्ट भिन्सेन्ट",
        quality: "९९.२% HEARTRATE SPIKE",
        operator: "मैदान र क्रिकेट ग्यालरी",
        weaponTitle: "अन्तिम ओभर रोमाञ्चकता र लडाइँ",
        weaponStat: "८ रन रक्षा र १ रनको क्रुर घाउ",
        weaponDesc: "दक्षिण अफ्रिकाविरुद्ध अन्तिम ६ बलमा जितको लागि आवश्यक ८ रन र अन्तिम बलमा १ रनको क्रुर रन-आउट।",
        tacticalMetric: "तनाव र ढुकढुकी सूचक",
        tacticalVal: 99,
        timeline: [
            { date: "जुन १५, २०२४", event: "दक्षिण अफ्रिकाविरुद्ध ऐतिहासिक ११५ रनको दबाबपूर्ण बलिङ प्रदर्शन" },
            { date: "अन्तिम ओभर", event: "ओट्निल बार्टम्यानविरुद्ध ८ रन चिस्याउने रोमाञ्चक सङ्घर्ष" },
            { date: "अन्तिम बल", event: "गुल्सन झा र डिपेन्द्र ऐरी बीच १ रन चोर्ने असफल प्रयास र त्रासदी" }
        ]
    },
    "karan-kc-valentines-day-miracle": {
        matrix: "भ्यालेन्टाइन डे चमत्कार // DIV-2 REDEMPTION",
        decibel: "१३१ db",
        location: "विन्डहोक, नामिबिया",
        quality: "१००.०% SURVIVAL RATE",
        operator: "संकटमोचक करण केसी",
        weaponTitle: "१०औं विकेटको ऐतिहासिक ५१* साझेदारी",
        weaponStat: "४२* रन (३१ बल) र सन्दीपको ५* रन",
        weaponDesc: "१४४/९ को स्थितिबाट ९ विकेट गुमेको खेलमा क्यानडाविरुद्ध अन्तिम ५१ रन बनाएर विश्वकप छनोट पक्का गर्ने क्षण।",
        tacticalMetric: "नाटकीय जित सम्भावना सूचक",
        tacticalVal: 100,
        timeline: [
            { date: "१४ फेब्रुअरी २०१८", event: "विन्डहोकमा क्यानडाविरुद्ध अन्तिम विकेटका लागि ५१ रनको असम्भव साझेदारी" },
            { date: "मार्च २०१८", event: "जिम्बाब्वे विश्वकप छनोट खेलमा हङकङलाई हराएर ऐतिहासिक पहिलो ओडीआई मान्यता सुरक्षा" },
            { date: "फेब्रुअरी २०२३", event: "नामिबियाविरुद्ध ५/२४ विकेटको विष्फोटक प्रदर्शन र लिग २ को उदय" }
        ]
    },
    "nepal-fans-dallas": {
        matrix: "डलासमा गैँडाहरूको सागर // THE 12TH RHINO",
        decibel: "१३८ db",
        location: "ग्र्यान्ड प्रेरी, डलास, टेक्सास",
        quality: "९९.९% VOCAL PRESSURE",
        operator: "नेपाली क्रिकेट फ्यान सेना",
        weaponTitle: "१०,०००+ फ्यानहरूको स्टेडियम पैक-आउट",
        weaponStat: "९०% स्टेडियम नेपाली झण्डामय",
        weaponDesc: "जुन ४, २०२४ मा नेदरल्यान्ड्सविरुद्ध डलासमा १०,००० भन्दा बढी नेपाली फ्यानहरूले सिर्जना गरेको ऐतिहासिक समर्थक लहर।",
        tacticalMetric: "विपक्षी खेलाडी तनाव सूचक",
        tacticalVal: 94,
        timeline: [
            { date: "जुन ४, २०२४", event: "डलासको ग्र्यान्ड प्रेरी स्टेडियम नेपाली फ्यानहरूले पूर्ण रूपमा कब्जा" },
            { date: "जुन २०२४", event: "नेपाल सरकार र टीयु रङ्गशाला सुधारको लागि दर्शक दबाब" },
            { date: "अक्टोबर २०२६", event: "घरेलु रङ्गशालामा अन्तर्राष्ट्रिय खेलहरूको रोमाञ्चक आयोजना" }
        ]
    }
};

const DEFAULT_TELEMETRY: TelemetryData = {
    matrix: "ऐतिहासिक प्रतिलिपि // TACTICAL DOSSIER",
    decibel: "१३४ db",
    location: "नेपाल क्रिकेट आर्काइभ",
    quality: "९९.०% ONLINE",
    operator: "नेपालक्रिक सिस्टम",
    weaponTitle: "रणनीतिक लडाईं र इतिहास",
    weaponStat: "१२ वर्षको स्वर्णिम लडाइँ",
    weaponDesc: "नेपाली क्रिकेटका संकटकालीन घुम्तीहरू र विश्वकपसम्म पुग्ने दृढ संकल्पको चक्र।",
    tacticalMetric: "सङ्घर्ष र दृढता सूचक",
    tacticalVal: 96,
    timeline: [
        { date: "मार्च २०१४", event: "चटगाउँमा पहिलो विश्वकप जित र अन्तर्राष्ट्रिय मञ्चमा गर्जन" },
        { date: "जुन २०२४", event: "सेन्ट भिन्सेन्टमा दक्षिण अफ्रिकाविरुद्ध १ रनको कठोर घाउ" },
        { date: "फेब्रुअरी २०२६", event: "वान्खेडे स्टेडियम मुम्बईमा बदला र अन्तिम स्वर्णिम मुक्ति" }
    ]
};

// Rich visual maps for adding photos directly into the editorial flow
const SLUG_VISUALS: Record<string, { src: string, caption: string }> = {
    "sandeep-googly": {
        src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        caption: "क्रीजमा बलिङ एक्सनको त्यो जादुमयी रिस्ट-रिलिज र वेग डेलिभरी क्षण"
    },
    "monty-desai-interview": {
        src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        caption: "मुख्य प्रशिक्षक मोन्टी देसाई — ड्रेसिङ रुममा खेलाडीहरूको आत्म-विश्वास बढाउँदै"
    },
    "kushal-mindset": {
        src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        caption: "कुशल भुर्तेल — मैदानमा निडर र आक्रामक रूपमा बलरमाथि प्रहार गर्दै"
    },
    "nepal-vs-south-africa-one-run": {
        src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        caption: "सेन्ट भिन्सेन्टको ऐतिहासिक खेलमैदान — जहाँ १ रनको क्रुर पराजय त्रासदी बन्यो"
    },
    "karan-kc-valentines-day-miracle": {
        src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        caption: "१०औं विकेटको चमत्कारिक जितपछि टिमको ऐतिहासिक विजय र भावुक आलिङ्गन"
    },
    "nepal-fans-dallas": {
        src: "https://images.unsplash.com/photo-1513829096999-4978602294fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        caption: "डलासमा नेपाली फ्यानहरूले सिर्जना गरेको ऐतिहासिक रातो र नीलो सागर"
    }
};

export default function StoryArticleClient({ 
    story, 
    htmlContent, 
    allStories, 
    currentSlug,
    storiesContent = {}
}: { 
    story: StoryFrontmatter, 
    htmlContent: string, 
    allStories: StoryFrontmatter[], 
    currentSlug: string,
    storiesContent?: Record<string, string>
}) {
    // Dynamic Swapping State variables (Netflix Rabbit-hole Mode)
    const [activeSlug, setActiveSlug] = useState(currentSlug);
    const [transitioning, setTransitioning] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [tacticalDecoded, setTacticalDecoded] = useState(true);
    
    // Track specific simulator states
    // A. Sandeep wrong'un simulator
    const [wristAngle, setWristAngle] = useState(85); // 45 to 90 deg
    const [ballSpeed, setBallSpeed] = useState(88); // 80 to 100 km/h
    
    // B. Monty trust mixer
    const [beliefVal, setBeliefVal] = useState(90);
    const [focusVal, setFocusVal] = useState(95);
    const [joyVal, setJoyVal] = useState(85);

    // C. Kushal over aggression
    const [strikeOver, setStrikeOver] = useState(3); // 1 to 6
    const [pullIntent, setPullIntent] = useState(90); // 0 to 100

    // D. South Africa Stepper over (19.1 - 19.6)
    const [activeBallIndex, setActiveBallIndex] = useState(5); // start on final ball 19.6

    // E. Canada Valentines Day Partnership aggregator
    const [karanAggression, setKaranAggression] = useState("fearless"); // defensive, balanced, fearless
    const [sandeepRotation, setSandeepRotation] = useState(80); // percentage

    // F. Dallas crowd attendance slider
    const [attendanceVal, setAttendanceVal] = useState(12500); // 5000 to 15000

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Live Swapping Function with dynamic Glitch transition trigger
    const handleDossierSwap = (newSlug: string) => {
        if (newSlug === activeSlug) return;
        setTransitioning(true);

        setTimeout(() => {
            setActiveSlug(newSlug);
            window.history.pushState(null, "", `/story/${newSlug}`);
            setTransitioning(false);
            const mainHeader = document.getElementById("dossier-main-container");
            if (mainHeader) {
                mainHeader.scrollIntoView({ behavior: "smooth" });
            }
        }, 400); // PERFECT glitch sweep duration
    };

    // Grab current data from active states
    const activeStory = allStories.find(s => s.slug === activeSlug) || story;
    const activeHtml = storiesContent[activeSlug] || htmlContent;
    const telemetry = SLUG_TELEMETRY[activeSlug] ?? DEFAULT_TELEMETRY;
    const activeVisual = SLUG_VISUALS[activeSlug];

    // Filter dynamic adjacent stories for continuous loops
    const recommendedStories = allStories
        .filter(s => s.slug !== activeSlug)
        .slice(0, 3);

    // Dynamic Swapping side channel switcher listing all 6 files
    const allChannelsList = allStories;

    // ────────────────────────────────────────────────────────
    // TACTICAL WIDGET GRAPHICS RENDER ENGINE (CLEAN & PROFESSIONAL)
    // ────────────────────────────────────────────────────────
    const renderTacticalSimulator = () => {
        switch (activeSlug) {
            case "sandeep-googly":
                const isGoogly = wristAngle > 75;
                const turnAngleDegrees = isGoogly ? ((wristAngle - 75) * 0.15).toFixed(1) : "- " + ((75 - wristAngle) * 0.12).toFixed(1);
                const curveControlX = 110;
                const curveControlY = isGoogly ? 90 : 130;
                const endX = 260;
                const endY = isGoogly ? 160 : 70;

                return (
                    <div className="bg-[#0D1B2A]/40 border border-white/5 p-4 rounded-sm animate-[fadeUpIn_0.3s_both] space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="font-stats font-bold text-[9.5px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1.5">
                                नाडी-कोण सिमुलेटर // GOOGLY DYNAMICS
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Sliders */}
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-mono">
                                        <span className="text-[#6B7280]">नाडी रिलिज कोण (WRIST ANGLE)</span>
                                        <span className="text-[#C9A84C] font-bold">{wristAngle}°</span>
                                    </div>
                                    <input 
                                        type="range" min="45" max="90" value={wristAngle}
                                        onChange={(e) => setWristAngle(Number(e.target.value))}
                                        className="w-full accent-[#C9A84C] h-1 bg-white/5 rounded-full outline-none cursor-pointer"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-mono">
                                        <span className="text-[#6B7280]">रिलिज गति (DELIVERY SPEED)</span>
                                        <span className="text-[#C9A84C] font-bold">{ballSpeed} km/h</span>
                                    </div>
                                    <input 
                                        type="range" min="80" max="100" value={ballSpeed}
                                        onChange={(e) => setBallSpeed(Number(e.target.value))}
                                        className="w-full accent-[#C41E3A] h-1 bg-white/5 rounded-full outline-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* SVG Pitch Canvas */}
                            <div className="relative bg-black/40 border border-white/5 h-36 rounded-sm overflow-hidden flex flex-col justify-between p-3 select-none">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                                    <line x1="20" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                                    <rect x="28" y="70" width="4" height="60" fill="rgba(255,255,255,0.08)" />
                                    <rect x="268" y="70" width="4" height="60" fill="rgba(255,255,255,0.08)" />
                                    <line x1="30" y1="85" x2="30" y2="115" stroke="#C9A84C" strokeWidth="1.5" />
                                    <line x1="270" y1="85" x2="270" y2="115" stroke={isGoogly ? "#C41E3A" : "#10B981"} strokeWidth="1.5" />
                                    <circle cx="180" cy="100" r="3" fill="#C9A84C" />
                                    <path 
                                        d={`M 30 100 Q ${curveControlX} ${curveControlY} 180 100 T ${endX} ${endY}`} 
                                        fill="none" 
                                        stroke={isGoogly ? "#C41E3A" : "#10B981"} 
                                        strokeWidth="2" 
                                        strokeDasharray="4,2" 
                                    />
                                    <circle cx={endX} cy={endY} r="3" fill="#fff" />
                                </svg>

                                <div className="relative z-10 mt-auto flex justify-between items-end font-mono text-[9px] text-[#B0B8C8]">
                                    <div>
                                        <span className="text-[#6B7280] block text-[7px] uppercase">SPIN TYPE</span>
                                        <span className={`font-bold ${isGoogly ? "text-[#C41E3A]" : "text-[#10B981]"}`}>
                                            {isGoogly ? "गुगली // GOOGLY" : "लेगब्रेक // LEGBREAK"}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[#6B7280] block text-[7px] uppercase">TURN DEGREE</span>
                                        <span className="text-stadium-white font-bold">{turnAngleDegrees}° {isGoogly ? "IN" : "OUT"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "monty-desai-interview":
                const cohesionIndex = Math.min(100, Math.round((beliefVal * 0.4) + (focusVal * 0.4) + (joyVal * 0.2)));
                
                let cultureQuote = "प्रारम्भिक चरण: कमान्डर मोन्टीको प्रणाली भर्खरै लागू हुँदैछ।";
                if (cohesionIndex >= 70 && cohesionIndex < 90) {
                    cultureQuote = "सकारात्मक वातावरण: मोन्टीको 'वन-बल ब्याटल' मन्त्र सफल। १२ मध्ये ११ जितको रेकर्ड।";
                } else if (cohesionIndex >= 90) {
                    cultureQuote = "एकता: 'ह्याप्पी ड्रेसिङ रुम' पूर्ण क्रियाशील। कप्तान रोहित पौडेलको नेतृत्वमा बलियो संगठन।";
                }

                return (
                    <div className="bg-[#0D1B2A]/40 border border-white/5 p-4 rounded-sm animate-[fadeUpIn_0.3s_both] space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="font-stats font-bold text-[9.5px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1.5">
                                ड्रेसिङ रुम सूचक // COHESION INDEX
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Sliders */}
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-mono">
                                        <span className="text-[#6B7280]">सामूहिक विश्वास (BELIEF)</span>
                                        <span className="text-[#C9A84C] font-bold">{beliefVal}%</span>
                                    </div>
                                    <input 
                                        type="range" min="30" max="100" value={beliefVal}
                                        onChange={(e) => setBeliefVal(Number(e.target.value))}
                                        className="w-full accent-[#C9A84C] h-1 bg-white/5 rounded-full outline-none cursor-pointer"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-mono">
                                        <span className="text-[#6B7280]">एक बल फोकस (FOCUS)</span>
                                        <span className="text-[#C41E3A] font-bold">{focusVal}%</span>
                                    </div>
                                    <input 
                                        type="range" min="30" max="100" value={focusVal}
                                        onChange={(e) => setFocusVal(Number(e.target.value))}
                                        className="w-full accent-[#C41E3A] h-1 bg-white/5 rounded-full outline-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Radial Progress Graphic */}
                            <div className="bg-black/40 border border-white/5 p-3 rounded-sm flex items-center gap-4">
                                <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
                                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path className="text-white/5" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path className="text-[#C9A84C] transition-all duration-300" strokeDasharray={`${cohesionIndex}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <span className="font-mono text-[10px] font-bold text-stadium-white">{cohesionIndex}%</span>
                                </div>

                                <div className="space-y-0.5">
                                    <span className="font-sans font-bold text-stadium-white text-[11px] block">
                                        {cohesionIndex < 70 ? "मर्यादित // MODEST" : cohesionIndex < 90 ? "ऐतिहासिक लिग २ // HISTORIC" : "गर्जन // THE ROAR"}
                                    </span>
                                    <p className="font-sans text-[10px] text-[#B0B8C8]/80 leading-tight m-0">
                                        {cultureQuote}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "kushal-mindset":
                const boundaryProb = Math.min(100, Math.round((pullIntent * 0.7) + (strikeOver * 4)));
                const stressLevel = Math.min(100, Math.round((pullIntent * 0.95)));

                return (
                    <div className="bg-[#0D1B2A]/40 border border-white/5 p-4 rounded-sm animate-[fadeUpIn_0.3s_both] space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="font-stats font-bold text-[9.5px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1.5">
                                पावरप्ले विश्लेषण // POWERPLAY INTENT
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono">
                                    <span className="text-[#6B7280]">पुल शट तीव्रता (PULL/HOOK INTENT)</span>
                                    <span className="text-[#C41E3A] font-bold">{pullIntent}%</span>
                                </div>
                                <input 
                                    type="range" min="20" max="100" value={pullIntent}
                                    onChange={(e) => setPullIntent(Number(e.target.value))}
                                    className="w-full accent-[#C41E3A] h-1 bg-white/5 rounded-full outline-none cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                                <div className="bg-black/40 border border-white/5 p-2 rounded-sm">
                                    <span className="text-[#6B7280] block text-[7px]">BOUNDARY PROB</span>
                                    <span className="font-black text-[#10B981] text-sm">{boundaryProb}%</span>
                                </div>
                                <div className="bg-black/40 border border-white/5 p-2 rounded-sm">
                                    <span className="text-[#6B7280] block text-[7px]">BOWLER STRESS</span>
                                    <span className="font-black text-[#C41E3A] text-sm">{stressLevel}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "nepal-vs-south-africa-one-run":
                const overDetails = [
                    { ball: "१९.१", event: "डट बल", needed: "८ रन", detail: "बार्टम्यानको योर्कर लेन्थ बललाई गुल्सनले प्रहार गर्न सकेनन्।", tension: 88 },
                    { ball: "१९.२", event: "चौका!", needed: "४ रन", detail: "फुल टस बललाई कट गर्दै थड म्यानमा चौका प्रहार।", tension: 94 },
                    { ball: "१९.३", event: "२ रन", needed: "२ रन", detail: "डिप मिड-विकेटमा प्रहार गरी दुई रन पुरा।", tension: 97 },
                    { ball: "१९.४", event: "डट बल", needed: "२ रन", detail: "अफ-स्टम्प बाहिरको बाउन्सर। गुल्सन बिट।", tension: 99 },
                    { ball: "१९.५", event: "डट बल", needed: "२ रन", detail: "फेरि सर्ट डेलिभरी। गुल्सनले प्रहार गर्न सकेनन्।", tension: 100 },
                    { ball: "१९.६", event: "रन-आउट", needed: "१ रन हार", detail: "गुल्सन बिट, बाइ रन दौडिँदा डी ककद्वारा क्लासेनको काँधमार्फत रन-आउट।", tension: 100 }
                ];
                const currentBall = overDetails[activeBallIndex];

                return (
                    <div className="bg-[#0D1B2A]/40 border border-white/5 p-4 rounded-sm animate-[fadeUpIn_0.3s_both] space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="font-stats font-bold text-[9.5px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1.5">
                                सेन्ट भिन्सेन्ट रोमाञ्चकता // FINAL OVER TRACKER
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="grid grid-cols-6 gap-1 bg-white/5 p-1 rounded-sm">
                                {overDetails.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveBallIndex(index)}
                                        className={`py-1 text-center font-mono text-[9px] font-black rounded-sm cursor-pointer transition-all ${
                                            activeBallIndex === index 
                                                ? "bg-[#C41E3A] text-white" 
                                                : "text-white/40 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        {item.ball}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-black/40 border border-white/5 p-3 rounded-sm space-y-2">
                                <div className="flex justify-between items-baseline font-mono text-[9px] text-[#6B7280]">
                                    <span className="text-stadium-white font-bold">बल {currentBall.ball} — {currentBall.event}</span>
                                    <span className="text-[#C9A84C] font-extrabold">{currentBall.needed}</span>
                                </div>
                                <p className="font-sans text-[11px] text-[#B0B8C8] leading-relaxed m-0">
                                    {currentBall.detail}
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case "karan-kc-valentines-day-miracle":
                let survivalProb = 10;
                let strategyText = "जित सम्भावना मात्र १०%: ९ विकेट गुमेको अन्तिम विकेट संकट।";

                if (karanAggression === "fearless") {
                    survivalProb = 100;
                    strategyText = "चमत्कार: 'निडर' सक्रिय! करण केसीको ४२* रन (३१ बल, ४ छक्का) र सन्दीपको ५* रनको असम्भव जित।";
                } else if (karanAggression === "balanced") {
                    survivalProb = 55;
                    strategyText = "संतुलित: दबाब कायम, स्ट्राइक रोटेशन सुस्त।";
                } else {
                    survivalProb = 25;
                    strategyText = "रक्षात्मक: डट बलको संख्या बढ्यो, जित टाढिँदै।";
                }

                return (
                    <div className="bg-[#0D1B2A]/40 border border-white/5 p-4 rounded-sm animate-[fadeUpIn_0.3s_both] space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="font-stats font-bold text-[9.5px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1.5">
                                १० औं विकेट चमत्कार // PARTNERSHIP SIMULATOR
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] text-[#6B7280] uppercase tracking-wider block font-mono">करण केसी रणनीति (KARAN INTENT)</label>
                                <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-sm">
                                    {["defensive", "balanced", "fearless"].map((strategy) => (
                                        <button
                                            key={strategy}
                                            onClick={() => setKaranAggression(strategy)}
                                            className={`py-1 text-center font-mono text-[8px] uppercase tracking-wider font-extrabold rounded-sm cursor-pointer transition-all ${
                                                karanAggression === strategy 
                                                    ? "bg-[#C9A84C] text-black font-black" 
                                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            {strategy}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 p-3 rounded-sm space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-[#6B7280]">WIN PROBABILITY:</span>
                                    <span className="text-[#10B981] font-black">{survivalProb}%</span>
                                </div>
                                <p className="font-sans text-[11px] text-[#B0B8C8] leading-relaxed m-0">
                                    {strategyText}
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case "nepal-fans-dallas":
                const calculatedDb = Math.min(138, Math.round(90 + (attendanceVal * 0.0035)));
                const netherlandsDistress = Math.min(100, Math.round(30 + (calculatedDb * 0.45)));

                return (
                    <div className="bg-[#0D1B2A]/40 border border-white/5 p-4 rounded-sm animate-[fadeUpIn_0.3s_both] space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="font-stats font-bold text-[9.5px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1.5">
                                फ्यान गर्जन सूचक // crowd decibel rating
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono">
                                    <span className="text-[#6B7280]">नेपाली दर्शक संख्या (ATTENDANCE)</span>
                                    <span className="text-[#C9A84C] font-bold">{attendanceVal.toLocaleString()}</span>
                                </div>
                                <input 
                                    type="range" min="5000" max="15000" value={attendanceVal}
                                    onChange={(e) => setAttendanceVal(Number(e.target.value))}
                                    className="w-full accent-[#C9A84C] h-1 bg-white/5 rounded-full outline-none cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono bg-black/40 border border-white/5 p-2 rounded-sm">
                                <div>
                                    <span className="text-[#6B7280] block text-[7px]">DECIBEL LEVEL</span>
                                    <span className="font-black text-[#C9A84C]">{calculatedDb} dB</span>
                                </div>
                                <div>
                                    <span className="text-[#6B7280] block text-[7px]">OPP DISTRESS</span>
                                    <span className="font-black text-[#C41E3A]">{netherlandsDistress}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-[#07080F] min-h-screen text-[#B0B8C8] selection:bg-[#C41E3A] selection:text-white pb-32 relative overflow-hidden font-sans">
            
            {/* Visual Glitch Noise Overlay during CRT swaps */}
            {transitioning && (
                <div className="fixed inset-0 bg-[#07080F] z-[9999] flex flex-col items-center justify-center pointer-events-auto">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.2] bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] animate-[flickerScanline_0.15s_infinite]" />
                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none animate-[flickerWhiteNoise_0.08s_infinite]" />
                    
                    <div className="relative z-10 text-center space-y-4">
                        <span className="font-mono text-stadium-white text-xs uppercase tracking-[0.3em] font-black block animate-pulse">
                            DECRYPTING ARCHIVE FILE...
                        </span>
                        <div className="w-36 h-0.5 bg-white/5 mx-auto rounded-full overflow-hidden">
                            <div className="h-full bg-[#C9A84C] animate-[glitchBar_0.4s_ease-out_both]" />
                        </div>
                    </div>
                </div>
            )}

            {/* Background glowing gradients (Extremely subtle, clean) */}
            <div className="absolute top-0 left-[-10%] w-[50%] h-[30%] rounded-full bg-[#C41E3A]/2 filter blur-[150px] pointer-events-none" />
            <div className="absolute top-[40%] right-[-10%] w-[45%] h-[40%] rounded-full bg-[#C9A84C]/2 filter blur-[150px] pointer-events-none" />

            {/* 1. CINEMATIC PARALLAX HERO */}
            <div id="dossier-main-container" className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden border-b border-white/5">
                <div
                    className="absolute inset-0 w-full h-full object-cover scale-110"
                    style={{
                        transform: `translateY(${scrollY * 0.3}px) scale(1.02)`,
                        transition: "transform 0.05s linear"
                    }}
                >
                    <Image
                        src={activeStory.heroImage}
                        alt={activeStory.title}
                        fill
                        className="object-cover saturate-[0.25] brightness-[0.3] contrast-[1.05]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/45 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07080F]/90 via-transparent to-transparent z-10" />
                </div>

                {/* Hero HUD Details */}
                <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:pb-16 z-20 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-2 mb-3">
                        <Radio className="w-3 h-3 text-[#C41E3A] animate-pulse" />
                        <span className="font-stats font-bold text-[#C9A84C] uppercase tracking-[0.2em] text-[9px] drop-shadow-[0_0_8px_#C9A84C]">
                            {activeStory.category} // TACTICAL ARCHIVE
                        </span>
                    </div>

                    <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-stadium-white leading-[1.1] tracking-tight max-w-4xl mb-4">
                        {activeStory.title}
                    </h1>

                    <p className="font-sans font-medium text-stadium-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
                        {activeStory.subtitle}
                    </p>
                </div>
            </div>

            {/* 2. THE THREE-COLUMN INTEGRATED CLEAN GRID */}
            <main className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* LEFT COLUMN: Deep Read Content (lg:col-span-8) */}
                    <article className="lg:col-span-8 space-y-8">
                        
                        {/* Dossier Lede Block */}
                        <div className="bg-[#C41E3A]/5 border-l-3 border-[#C41E3A] p-5 md:p-6 rounded-sm">
                            <span className="font-mono text-[8px] text-[#C41E3A] uppercase tracking-wider block mb-1 font-bold">
                                // LEDE INTRODUCTION BRIEFING
                            </span>
                            <p className="font-display font-bold text-stadium-white text-lg md:text-xl leading-relaxed italic m-0">
                                {activeStory.lede}
                            </p>
                        </div>

                        {/* CURATED DYNAMIC INLINE VISUAL (Adds photos directly into story context) */}
                        {activeVisual && (
                            <div className="border border-white/5 p-2 rounded-sm bg-black/30 my-6 animate-[fadeUpIn_0.4s_both]">
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm">
                                    <Image
                                        src={activeVisual.src}
                                        alt={activeVisual.caption}
                                        fill
                                        className="object-cover saturate-50 contrast-110 brightness-[0.75]"
                                    />
                                </div>
                                <span className="font-sans text-[11px] text-[#B0B8C8]/60 text-center block mt-2.5 italic">
                                    {activeVisual.caption}
                                </span>
                            </div>
                        )}

                        {/* Clean Declassified Content Block */}
                        <div 
                            className="story-content font-sans text-[#B0B8C8]/90 leading-relaxed text-justify space-y-6" 
                            dangerouslySetInnerHTML={{ __html: activeHtml }} 
                        />

                    </article>

                    {/* RIGHT COLUMN: Telemetry HUD & Bento Widgets (lg:col-span-4) */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        
                        {/* THE SUPERMARKET CHANNEL SWITCHER DRAWER (CRT ACTIVE MONITORS - CLEAN) */}
                        <div className="bg-black/40 border border-white/5 rounded-sm p-4 backdrop-blur-xl relative overflow-hidden group shadow-lg">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-2.5">
                                <span className="font-stats font-bold text-[9px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1">
                                    वर्गीकृत फाइल सूची // ACTIVE DOSSIERS
                                </span>
                            </div>

                            <div className="space-y-1.5">
                                {allChannelsList.map((ch, idx) => {
                                    const isActive = ch.slug === activeSlug;
                                    let borderTheme = "border-white/5 hover:border-white/10";
                                    let textTheme = "text-[#B0B8C8]/60 hover:text-stadium-white";
                                    
                                    if (isActive) {
                                        borderTheme = "border-[#C9A84C]/40 bg-[#C9A84C]/5";
                                        textTheme = "text-[#C9A84C]";
                                    }

                                    return (
                                        <div
                                            key={ch.slug}
                                            onClick={() => handleDossierSwap(ch.slug)}
                                            className={`p-2.5 rounded-sm border cursor-pointer select-none transition-all flex justify-between items-center ${borderTheme} ${textTheme}`}
                                        >
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className={`font-mono text-[9px] font-black ${isActive ? "text-[#C9A84C]" : "text-white/10"}`}>
                                                    0{idx+1}
                                                </span>
                                                <div className="truncate">
                                                    <span className="font-sans font-bold text-[12px] block truncate leading-none">
                                                        {ch.title.split(":")[0]}
                                                    </span>
                                                </div>
                                            </div>
                                            {isActive ? (
                                                <div className="w-1 h-1 bg-[#C9A84C] rounded-full shrink-0 ml-2 animate-pulse" />
                                            ) : (
                                                <CornerDownRight className="w-2.5 h-2.5 text-white/10" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Dynamic Intelligence Dossier */}
                        <div className="bg-black/40 border border-white/5 rounded-sm p-4 backdrop-blur-xl relative overflow-hidden group shadow-lg">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-2.5">
                                <span className="font-stats font-bold text-[9px] text-[#C9A84C] uppercase tracking-widest flex items-center gap-1">
                                    वर्गीकृत फाइल विवरण // INTEL TELEMETRY
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5 text-[11px] leading-tight mb-4">
                                <div>
                                    <label className="text-[9px] text-[#6B7280] uppercase tracking-wider block mb-0.5">ऐतिहासिक म्याट्रिक्स</label>
                                    <span className="font-sans font-bold text-stadium-white tracking-wide">{telemetry.matrix}</span>
                                </div>
                                <div>
                                    <label className="text-[9px] text-[#6B7280] uppercase tracking-wider block mb-0.5">तीव्रता स्तर</label>
                                    <span className="font-mono font-bold text-[#C9A84C] tracking-wide">{telemetry.decibel}</span>
                                </div>
                                <div>
                                    <label className="text-[9px] text-[#6B7280] uppercase tracking-wider block mb-0.5">मैदान</label>
                                    <span className="font-sans font-bold text-stadium-white">{telemetry.location}</span>
                                </div>
                                <div>
                                    <label className="text-[9px] text-[#6B7280] uppercase tracking-wider block mb-0.5">संकेत गुणस्तर</label>
                                    <span className="font-mono font-bold text-[#10B981]">{telemetry.quality}</span>
                                </div>
                            </div>

                            {/* Decrypt Tactical Simulator Bento Widget */}
                            {renderTacticalSimulator() && (
                                <div className="border-t border-white/5 pt-3.5 mt-3.5 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-stats font-bold text-[8.5px] text-[#C9A84C] uppercase tracking-widest">
                                            रणनीतिक विश्लेषण // DATA SIMULATION
                                        </span>
                                    </div>
                                    {renderTacticalSimulator()}
                                </div>
                            )}

                            {/* Vertical Timeline Milestones */}
                            <div className="border-t border-white/5 pt-3.5 mt-3.5 space-y-3.5">
                                <span className="font-stats font-bold text-[8.5px] text-[#C41E3A] uppercase tracking-widest block">
                                    महत्वपूर्ण घटनाहरू // MILESTONES
                                </span>
                                
                                <div className="space-y-3 pl-3 border-l border-white/5 relative">
                                    {telemetry.timeline.map((item, key) => (
                                        <div key={key} className="relative group/time">
                                            <div className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-black border border-white/20" />
                                            <span className="font-mono text-[8.5px] text-[#C9A84C] font-extrabold uppercase block mb-0.5">
                                                {item.date}
                                            </span>
                                            <p className="font-sans text-[10.5px] text-[#B0B8C8] leading-tight m-0">
                                                {item.event}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

            {/* 3. THE "RHINO NEXUS" COMPLETE SUPERMARKET RABBIT HOLE */}
            <section className="relative z-30 border-t border-white/5 bg-[#080a13] py-20 scroll-mt-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    
                    {/* Header */}
                    <div className="flex flex-col items-center justify-center text-center mb-12 space-y-2">
                        <span className="font-stats font-bold text-[9px] text-[#C9A84C] uppercase tracking-[0.2em] block">
                            हाम्रो रगत, हाम्रो पसिना // EXPLORE THE RHINO NEXUS
                        </span>
                        
                        <h2 className="font-display font-black text-3xl md:text-4xl text-stadium-white leading-none uppercase max-w-2xl">
                            त्यो सुनौलो ग्यालरी जसमा तपाईं हराउन चाहनुहुन्छ
                        </h2>
                        
                        <p className="font-sans text-[#6B7280] text-xs max-w-md leading-relaxed">
                            नेपाली क्रिकेटका ती अनगिन्ती स्वर्णिम पलहरू, अनपेक्षित रेकर्डहरू र संघर्षको इतिहास। एकपछि अर्को फाइल खोलेर नेपाल क्रिकेटको गहिराइमा डुब्नुस्।
                        </p>
                    </div>

                    {/* Bento Grid layout of Recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                        {recommendedStories.map((rec, key) => {
                            let borderGlow = "hover:border-[#C9A84C]/20";
                            let tagColor = "text-[#C9A84C] bg-[#C9A84C]/5 border-[#C9A84C]/10";
                            
                            if (rec.category.includes("विश्लेषण")) {
                                borderGlow = "hover:border-[#3B82F6]/20";
                                tagColor = "text-[#3B82F6] bg-[#3B82F6]/5 border-[#3B82F6]/10";
                            } else if (rec.category.includes("अन्तर्वार्ता")) {
                                borderGlow = "hover:border-[#C41E3A]/20";
                                tagColor = "text-[#C41E3A] bg-[#C41E3A]/5 border-[#C41E3A]/10";
                            }

                            return (
                                <div
                                    key={rec.slug}
                                    onClick={() => handleDossierSwap(rec.slug)}
                                    className={`group relative bg-black/40 border border-white/5 rounded-sm p-5 md:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg text-decoration-none min-h-[300px] overflow-hidden cursor-pointer ${borderGlow}`}
                                >
                                    <div className="absolute inset-0 z-0 select-none">
                                        <Image
                                            src={rec.heroImage}
                                            alt={rec.title}
                                            fill
                                            className="object-cover transition-all duration-500 group-hover:scale-[1.02] saturate-[0.15] contrast-110 brightness-[0.2]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                                    </div>

                                    {/* Top Tagging */}
                                    <div className="relative z-10 flex justify-between items-center mb-6">
                                        <span className={`font-mono text-[8px] font-black uppercase tracking-widest border px-1.5 py-0.5 rounded-sm ${tagColor}`}>
                                            {rec.category.split(" ")[0]}
                                        </span>
                                    </div>

                                    {/* Bottom Title, Date */}
                                    <div className="relative z-10 space-y-2">
                                        <span className="font-mono text-[8px] text-[#B0B8C8]/40 font-bold block tracking-widest uppercase">
                                            // {rec.date} · {rec.readTime}
                                        </span>
                                        
                                        <h4 className="font-sans font-bold text-lg text-stadium-white leading-snug group-hover:text-[#C9A84C] transition-colors">
                                            {rec.title}
                                        </h4>

                                        <p className="font-sans text-[11px] text-[#B0B8C8]/50 leading-relaxed line-clamp-2 max-w-sm">
                                            {rec.lede}
                                        </p>

                                        <div className="flex items-center gap-1 pt-1.5 text-[#C9A84C] group-hover:text-[#C41E3A] transition-colors">
                                            <span className="font-stats font-bold text-[8.5px] uppercase tracking-widest">फाइल खोल्नुस्</span>
                                            <ChevronRight className="w-3 h-3 transform transition-transform group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Return back home CTA */}
                    <div className="text-center mt-12 select-none">
                        <Link
                            href="/"
                            style={{
                                fontFamily: "Barlow Condensed, sans-serif",
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.45)",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                            }}
                            className="inline-flex items-center gap-1.5 hover:text-[#C9A84C] transition-all border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] px-6 py-2.5 rounded-full hover:border-[#C9A84C]/20 shadow-sm"
                        >
                            ← मुख्य टनेलमा फर्किनुस् // RETURN TO BASE STATION
                        </Link>
                    </div>

                </div>
            </section>

            {/* Custom CSS overrides for clean and professional typography */}
            <style jsx global>{`
                .story-content p {
                    margin-bottom: 1.4rem;
                    font-family: var(--font-sans), sans-serif;
                    font-size: 1.05rem;
                    color: rgba(220, 225, 235, 0.88);
                    line-height: 1.7;
                    font-weight: 400;
                }
                .story-content p:first-of-type {
                    font-family: var(--font-sans), sans-serif;
                    font-size: 1.15rem;
                    color: #E8E8E8;
                    line-height: 1.7;
                    font-weight: 600;
                    margin-bottom: 1.8rem;
                }
                
                .story-content h3 {
                    font-family: var(--font-sans), sans-serif;
                    font-weight: 800;
                    font-size: 1.45rem;
                    color: #C41E3A;
                    margin: 2.6rem 0 1.2rem 0;
                    position: relative;
                    padding-left: 1rem;
                    line-height: 1.3;
                    letter-spacing: normal;
                }
                .story-content h3::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 12%;
                    bottom: 12%;
                    width: 3.5px;
                    background-color: #C9A84C;
                    border-radius: 2px;
                }
                
                .story-content img {
                    width: 100%;
                    height: auto;
                    margin: 2.5rem 0;
                    border-radius: 2px;
                    border: 1px solid rgba(255,255,255,0.05);
                    filter: grayscale(30%) saturate(0.9);
                    transition: all 0.5s ease;
                }
                .story-content img:hover {
                    filter: grayscale(0%) saturate(1);
                    border-color: rgba(201, 168, 76, 0.2);
                }
                
                .story-content .custom-pull-quote {
                    position: relative;
                    margin: 2.2rem 0;
                    padding: 1.2rem 1.6rem;
                    border-left: 3px solid #C41E3A;
                    background: rgba(196, 30, 58, 0.03);
                }
                
                .story-content .custom-pull-quote p:first-child {
                    font-family: var(--font-display), sans-serif;
                    font-weight: 700;
                    font-size: 1.3rem;
                    color: #E8E8E8;
                    line-height: 1.4;
                    margin-bottom: 0.4rem;
                }
                
                .story-content .custom-pull-quote p:last-child {
                    display: block;
                    margin-top: 0.4rem;
                    font-family: var(--font-sans), sans-serif;
                    font-weight: 600;
                    color: #C9A84C;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 0;
                }

                @keyframes flickerScanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }

                @keyframes flickerWhiteNoise {
                    0% { transform: translate(0, 0); }
                    10%{ transform: translate(-1px, 2px); }
                    20%{ transform: translate(2px, -1px); }
                    30%{ transform: translate(-2px, 1px); }
                    40%{ transform: translate(1px, -2px); }
                    50%{ transform: translate(-1px, 2px); }
                    60%{ transform: translate(2px, -1px); }
                    70%{ transform: translate(-2px, 1px); }
                    80%{ transform: translate(1px, -2px); }
                    90%{ transform: translate(-1px, 2px); }
                    100%{ transform: translate(0, 0); }
                }

                @keyframes glitchBar {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
}
