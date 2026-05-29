"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StoryLink {
    title: string;
    id: string;
}

interface PlayerLocker {
    id: string;
    name: string;
    role: string;
    number: string;
    era: string;
    relicName: string;
    relicDescription: string;
    relicDetail: string;
    confessionTitle: string;
    confessionText: string;
    profileSlug: string;
    glowColor: string; // Legend Gold or Active Rhino Blue glow accents
    relatedStories: StoryLink[];
}

const PLAYERS_LOCKERS: PlayerLocker[] = [
    {
        id: "paras",
        name: "पारस खड्का",
        role: "अलराउन्डर / कप्तान",
        number: "७७",
        era: "पारस खड्का युग",
        relicName: "रातो ब्यान्डेना र ऐतिहासिक ब्याट",
        relicDescription: "चटगाउँको त्यो ऐतिहासिक बिहान मैदानमा छिर्नु अघि निधारमा बाँधिएको भाग्यशाली रातो रङ।",
        relicDetail: "निधारमा बाँधिएको यो रातो कपडा केवल फेसन थिएन, यो त नेपाली क्रिकेटको अनन्त आगो र जितको भोक थियो। जब पारसले यसलाई कस्दथे, ड्रेसिङ रुममा सन्नाटा छाउँथ्यो।",
        confessionTitle: "चटगाउँको ड्रेसिङ रुम",
        confessionText: "चटगाउँ पुरै हल्लिरहेको थियो। ड्रेसिङ रुमभित्रको हावा पसिना र त्रासको गन्धले निसासलाग्दो बनेको थियो। भर्खरका कलिला भाइहरू जुत्ताको तुना बाँध्दा काँपिरहेका थिए, उनीहरूका हात काँपेको मैले स्पष्ट देखेँ। मैले उनीहरू सबैलाई जर्सीमा समातेर नजिक तानें, र उनीहरूको आँखामा हेरेर चिच्याएँ—'हामी यहाँ कसैसँग सम्मान माग्न आएका होइनौं। हामी त उनीहरूको हातबाट सम्मान खोस्न आएका हौं। आज यो चटगाउँको मैदान नेपाली सिंहहरूको गर्जाहटले थर्किनुपर्छ!' जब मैले निधारमा त्यो भाग्यशाली रातो ब्यान्डेना कसेँ, उनीहरूको डर पुरै आगोमा बदलियो।",
        profileSlug: "sompal-kami",
        glowColor: "rgba(201, 168, 76, 0.25)", // Legend Gold
        relatedStories: [
            { title: "चटगाउँको त्यो बिहान — पहिलो विश्वकप", id: "story-01" },
            { title: "पारस खड्का — एउटा युगको अन्त्य", id: "story-04" },
            { title: "३ अगस्ट २०१८ — पहिलो ओडीआई जित", id: "story-05" }
        ]
    },
    {
        id: "sompal",
        name: "सोमपाल कामी",
        role: "तीव्र गतिको बलर",
        number: "१०",
        era: "पायोनियर युग / ओडीआई युग",
        relicName: "पंजाबका ती हातले सिलाएका स्पाइक्स",
        relicDescription: "पैसाको अभावमा पञ्जाबको गल्ली क्रिकेट खेल्दा साथीहरूसँग मागेर सिलाएको पहिलो जुत्ता।",
        relicDetail: "गुल्मी एक्सप्रेसको तीब्र बेगको सुरुवाती बिन्दु यही जुत्ता हो। चोट र पैतलाको दुखाइका बाबजुद सोमपालले यसै जुत्तामा नेपाली क्रिकेटको तीव्र आगो बालेका थिए।",
        confessionTitle: "पञ्जाबको त्यो धुलो",
        confessionText: "पञ्जाबको धुलाम्य र तप्त सडकमा अरुको फाटेको जुत्ता सुई-धागोले हातैले सिलाएर बलिङ गर्दा मानिसहरू मलाई हेरेर हाँस्थे। भन्थे—'एउटा मजदुरको छोरो कहिल्यै देशको लागि खेल्न सक्दैन।' तर तीव्र गति मेरो एक मात्र भाषा थियो। काठमाडौं ओर्लिँदा मसँग केवल एउटा च्यातिएको झोला र कहिल्यै नमर्ने सपना थियो। टियू मैदानको क्रिजमा दौडिँदा मेरो काँध दुखाइले चिच्याउँथ्यो, तर मैले बल फ्याँक्दा मेरो पुरै आत्मा निस्किन्थ्यो। मेरो गति केवल एक नम्बर थिएन, त्यो मेरो अभाव र अपमानविरुद्धको आक्रोश थियो।",
        profileSlug: "sompal-kami",
        glowColor: "rgba(30, 58, 138, 0.25)", // Active Rhino Blue
        relatedStories: [
            { title: "३ अगस्ट २०१८ — पहिलो ओडीआई जित", id: "story-05" },
            { title: "सेन्ट भिन्सेन्टको त्यो रात — एक रन पराजय", id: "story-06" },
            { title: "सोमपाल र करण: एक दशकको अटूट युद्ध", id: "story-13" }
        ]
    },
    {
        id: "rohit",
        name: "रोहित पौडेल",
        role: "ब्याट्सम्यान / कप्तान",
        number: "१७",
        era: "ओडीआई युग / विश्वकप युग",
        relicName: "पसिनाले भिजेको नीलो क्याप",
        relicDescription: "नेतृत्वको गह्रौं बोझ र इतिहासकै सबैभन्दा रोमान्चक जितहरूको साक्षी कप्तानी क्याप।",
        relicDetail: "मात्र १७ वर्षको उमेरमा राष्ट्रिय टोलीको कप्तानी सम्हाल्दा रोहितले सामना गरेको शंका र दबाबको प्रतीक। यसको हरेक धागोमा पसिना र कीर्तिपुरको माटो मिसिएको छ।",
        confessionTitle: "नेतृत्वको त्यो पहिलो रात",
        confessionText: "म केवल १७ वर्षको थिएँ, र उनीहरूले मेरो टाउकोमा निलो कप्तानी क्याप राखिदिए। बाहिर मानिसहरू साउती गर्थे—'उ निकै सानो छ, दबाबमा तुरुन्तै टुट्नेछ।' सेन्ट भिन्सेन्टमा जब हामी दक्षिण अफ्रिकासँग मात्र एक रनले पराजित भयौं, त्यो ड्रेसिङ रुम मसानघाट जस्तै सन्नाटा थियो। म वासरुमभित्र छिरेर चुकुल लगाएँ, र चिसो भित्तामा निधार टेकाएर सास रोकिउन्जेल रोएँ। म भक्कानिएँ, तर एउटा कप्तान कहिल्यै आफ्ना खेलाडीको अगाडि रुन सक्दैन। मैले आँसु पुछें, आफ्नो छाती चौडा पारें, र फेरि एउटा हिमाल झैं उभिएर मेरो टोलीका भाइहरूलाई अँगालो हाल्न बाहिर निस्किएँ। हामी आज असफल भयौं, तर हामी फेरि उठ्नेछौं।",
        profileSlug: "rohit-paudel",
        glowColor: "rgba(30, 58, 138, 0.25)", // Active Rhino Blue
        relatedStories: [
            { title: "सेन्ट भिन्सेन्टको त्यो रात — एक रन पराजय", id: "story-06" },
            { title: "रोहित पौडेल — द रोअर अफ द राइनोज", id: "story-12" }
        ]
    },
    {
        id: "sandeep",
        name: "सन्दीप लामिछाने",
        role: "लेग स्पिनर",
        number: "२५",
        era: "ओडीआई युग / विश्वकप युग",
        relicName: "जादुमयी रिस्ट ब्यान्ड",
        relicDescription: "विश्वस्तरीय ब्याटरहरूलाई घुमाउने त्यो जादुमयी नाडीमा बाँधिने कालो धागो र ब्यान्ड।",
        relicDetail: "यसै रिस्ट ब्यान्डले बाँधिएको नाडीबाट फुत्किने गुगलीले विश्व क्रिकेटका ठूला-ठूला ब्याट्सम्यानहरूको गिल्ली उडाएको थियो। यसमा नेपाली स्पिनको बलियो गौरव लुकेको छ।",
        confessionTitle: "गुगलीको भौतिक विज्ञान",
        confessionText: "मेरो औंलाबाट बल रिलिज हुने बित्तिकै पुरै रंगशालामा एक सेकेन्डका लागि शून्यता छाउँछ। मेरो नाडी घुमाउनु भनेको गुरुत्वाकर्षण विरुद्धको एउटा सानो युद्ध लड्नु जस्तै हो। मानिसहरू मेरो लेग-स्पिनको जादु देख्छन्, तर मेरो चोर औंलाको रगताम्मे फोका र भैरहवाको त्यो टन्टलापुर ४२ डिग्री घाममा एक्लै १० घण्टासम्म एउटै स्पटमा बल फ्याँकिरहने मेरो पागलपन कसैले देख्दैनन्। मेरो हरेक गुगली एक हिसाब गरिएको बुलेट हो। जब त्यो मिडल स्टम्प हावामा फनफनी घुमेर उड्छ, त्यो भाग्य होइन—त्यो त मेरो कडा र सम्झौताहीन पागलपन हो।",
        profileSlug: "sandeep-lamichhane",
        glowColor: "rgba(30, 58, 138, 0.25)", // Active Rhino Blue
        relatedStories: [
            { title: "३ अगस्ट २०१८ — पहिलो ओडीआई जित", id: "story-05" },
            { title: "सन्दीपको गुगली: विश्वलाई चकित पार्ने नाडी", id: "story-09" }
        ]
    },
    {
        id: "dipendra",
        name: "दीपेन्द्र सिंह ऐरी",
        role: "अलराउन्डर",
        number: "२१",
        era: "विश्वकप युग",
        relicName: "६ छक्का प्रहार गरेको ग्रिप टेप",
        relicDescription: "हाङझाउमा ९ बलमै अर्धशतक र ओमानमा लगातार ६ छक्का हान्दा ब्याटमा बेरिएको ग्रिप।",
        relicDetail: "कञ्चनपुरको त्यो खाली परीक्षा पाना छोडेर क्रिकेट रोजेका दीपेन्द्रको आक्रामक ब्याटिङ र बलियो आत्मविश्वासी पन्जाको प्रतीक।",
        confessionTitle: "खाली परीक्षा पाना",
        confessionText: "कक्षा ११ को बोर्ड परीक्षाको दिन, त्यो उत्तरपुस्तिकामा एक अक्षर पनि नलेखी म खाली कोरा पाना छोडेर एनपीएलको मैदानमा निस्किएँ। आमा ढोकामा रोइरहनुभएको थियो, समाजले मलाई बिग्रिएको केटो भन्थ्यो। तर मेरो भाग्य कापीको पानामा होइन, पीचको लम्बाइमा लेखिनु थियो। जब मैले ओमानमा त्यो छैटौं छक्का प्रहार गरेँ, हरेक प्रहार मेरो योग्यतामा शंका गर्नेहरूको छातीमा बजारिएको ढुङ्गा जस्तै थियो। ६ बल। ६ आगोका गोला। पुरै रंगशाला ध्वस्त भयो र मलाई लाग्यो—मेरो परीक्षा सफल भयो।",
        profileSlug: "dipendra-singh-airee",
        glowColor: "rgba(30, 58, 138, 0.25)", // Active Rhino Blue
        relatedStories: [
            { title: "सेन्ट भिन्सेन्टको त्यो रात — एक रन पराजय", id: "story-06" },
            { title: "दीपेन्द्र सिंह ऐरी: रेकर्ड तोड्ने कञ्चनपुरको केटो", id: "story-07" },
            { title: "ओमानको ६ छक्का", id: "story-14" }
        ]
    },
    {
        id: "shakti",
        name: "शक्ति गौचन",
        role: "लेग स्पिनर / स्पिनर",
        number: "२",
        era: "पायोनियर युग",
        relicName: "ऐतिहासिक ह्याट्रिक बल र टियूको माटो",
        relicDescription: "सिनियर नेपाली टोलीबाट ऐतिहासिक पहिलो ह्याट्रिक लिँदा मलेसियामा फालिएको बल।",
        relicDetail: "नेपाली स्पिनको पितामह मानिने शक्तिको कसिलो बलिङ र विकेट लिएपछि चिल झैं मैदानभरि कुद्ने उनको ऐतिहासिक निस्वार्थ गौरवको साक्षी माटो।",
        confessionTitle: "चिल झैं त्यो दौड",
        confessionText: "हाम्रो समयमा खेल्ने मैदान थिएन, ब्याट फुत्किँदा टेपले बेरेर खेल्थ्यौं, मलेसिया जाँदा लोकल बसमा कोचिएर गयौं र एउटै बोटलको पानी बाँडेर पियौं। तर जब मैले डेनमार्कविरुद्ध ऐतिहासिक ह्याट्रिक लिएँ, म चिल झैं दुवै पखेटा फैलाएर मैदानभरि कुदेँ। मेरो काँधमा तीन करोड नेपालीहरूको मुटुको धड्कन थियो। हामीले हाम्रो रगत र पसिनाले नेपाली क्रिकेटको जग खनेका हौं, ताकि आजका भाइहरूले विश्वकपको मञ्चमा हिमाल झैं उच्च भएर उड्न सकून्। मेरो यो दौड कहिल्यै रोकिने छैन।",
        profileSlug: "sompal-kami",
        glowColor: "rgba(201, 168, 76, 0.22)", // Legend Gold
        relatedStories: [
            { title: "चटगाउँको त्यो बिहान — पहिलो विश्वकप", id: "story-01" },
            { title: "शक्ति गौचन — त्यो स्पिन जुन संसारले देख्यो", id: "story-03" }
        ]
    }
];

const LOCKER_ROW_STYLES = `
    /* ── CINEMATIC CONSOLE CONTAINER ── */
    .museum-console-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
    }
    @media (min-width: 1024px) {
        .museum-console-container {
            flex-direction: row;
            align-items: stretch;
            min-height: 520px;
        }
    }
    
    /* ── DYNAMIC LEFT PORTRAIT SHOWCASE ── */
    .cinematic-left-pane {
        flex: 1;
        background: linear-gradient(135deg, #0e1625 0%, #04070b 100%);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        padding: 2.2rem;
        box-shadow: 
            0 12px 36px rgba(0,0,0,0.7),
            inset 0 1px 0 rgba(255,255,255,0.06);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    /* Neon glow backdrop inside Left Showcase */
    .cinematic-left-pane::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 10% 20%, var(--glow-rgb, rgba(201,168,76,0.04)) 0%, transparent 60%);
        pointer-events: none;
        z-index: 1;
        transition: all 0.6s ease;
    }
    
    /* ── RIGHT TABS DIRECRORY PANEL ── */
    .tabs-right-pane {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
    }
    @media (min-width: 1024px) {
        .tabs-right-pane {
            width: 38%;
            justify-content: flex-start;
        }
    }
    
    /* ── LATCH TAG TAB BUTTONS ── */
    .latch-tag-btn {
        width: 100%;
        background: linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.02) 100%);
        border: 1px solid rgba(255, 255, 255, 0.04);
        padding: 1.15rem 1.4rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
        position: relative;
    }
    .latch-tag-btn:hover {
        border-color: rgba(201, 168, 76, 0.25);
        background: rgba(255,255,255,0.03);
        transform: translateX(4px);
    }
    .latch-tag-btn.active {
        border-color: var(--tab-border, #C9A84C);
        background: linear-gradient(90deg, rgba(201, 168, 76, 0.05) 0%, rgba(255,255,255,0.02) 100%);
        box-shadow: 
            0 8px 24px rgba(0,0,0,0.5),
            0 0 15px var(--hover-glow, rgba(201, 168, 76, 0.12));
        transform: translateX(8px);
    }
    
    /* Active indicator stripe */
    .latch-tag-btn::after {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        bottom: 20%;
        width: 3px;
        background: var(--tab-border, #C9A84C);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .latch-tag-btn.active::after {
        opacity: 1;
    }

    /* Cassette reel spin animation */
    .cassette-reel {
        width: 24px;
        height: 24px;
        border: 3px dashed rgba(201, 168, 76, 0.5);
        border-radius: 50%;
        animation: spinReel 2.5s linear infinite;
        animation-play-state: paused;
    }
    .cassette-playing .cassette-reel {
        animation-play-state: running;
    }
    @keyframes spinReel {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .confession-scroller {
        scrollbar-width: thin;
        scrollbar-color: rgba(201, 168, 76, 0.3) rgba(0, 0, 0, 0.25);
    }
    .confession-scroller::-webkit-scrollbar {
        width: 3.5px;
    }
    .confession-scroller::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.25);
    }
    .confession-scroller::-webkit-scrollbar-thumb {
        background: rgba(201, 168, 76, 0.3);
        border-radius: 99px;
    }
    
    /* Slide in active console columns animations */
    .console-slide-in {
        animation: consoleSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes consoleSlide {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
`;

export default function LockerRow() {
    const router = useRouter();
    const [activePlayer, setActivePlayer] = useState<string>("paras");
    const [activeTape, setActiveTape] = useState<string | null>(null);

    const activeLocker = PLAYERS_LOCKERS.find(pl => pl.id === activePlayer)!;
    const isTapePlaying = activeTape === activeLocker.id;

    // Handle interactive split-screen tab click
    const handleTabClick = (id: string) => {
        if (activePlayer === id) return;
        
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(30);
        }

        // Trigger mechanical lock latch and clang sound
        if (typeof window !== "undefined" && (window as any).playLockerSound) {
            (window as any).playLockerSound(true);
        }

        setActivePlayer(id);
        setActiveTape(null);
    };

    const playTape = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([15, 10, 15]);
        }
        setActiveTape(activeTape === id ? null : id);
    };

    const handleStoryRoute = (e: React.MouseEvent, storyId: string) => {
        e.stopPropagation();
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(15);
        }
        router.push(`/locker-room/${storyId}`); // Snappy instant routing
    };

    return (
        <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 mb-20 scroll-mt-20">
            <style dangerouslySetInnerHTML={{ __html: LOCKER_ROW_STYLES }} />

            <div className="flex items-center gap-4 mb-10">
                <span 
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.25em" }}
                    className="uppercase font-bold shrink-0"
                >
                    ड्रेसिङ रुम स्मृति कन्सोल // DRESSING ROOM CINEMATIC CONSOLE
                </span>
                <div className="flex-grow border-t border-white/5 opacity-40" />
            </div>

            {/* Cinematic Split-Screen Console Panel Wrapper */}
            <div className="museum-console-container">
                
                {/* ── LEFT PANE: DYNAMIC DOCUMENTARY HERO COVER SHOWCASE (62% Width) ── */}
                <div 
                    className="cinematic-left-pane"
                    style={{ 
                        "--glow-rgb": activeLocker.glowColor 
                    } as React.CSSProperties}
                >
                    {/* Huge suspended jersey number floating in background */}
                    <div 
                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 900 }} 
                        className="text-[12rem] md:text-[18rem] leading-none text-white/[0.02] absolute -bottom-10 -right-6 pointer-events-none select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.01)] z-1"
                    >
                        #{activeLocker.number}
                    </div>

                    {/* Console Header details */}
                    <div key={`header-${activeLocker.id}`} className="console-slide-in flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-5 z-10 relative">
                        <div>
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "10.5px", color: "#C9A84C", letterSpacing: "0.2em" }} className="uppercase font-extrabold block mb-0.5">
                                {activeLocker.era}
                            </span>
                            <h2 style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }} className="text-white text-[32px] md:text-[38px] leading-none m-0 tracking-wide">
                                {activeLocker.name}
                            </h2>
                        </div>
                        
                        <div className="flex flex-col md:items-end select-none">
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-[#C41E3A] text-[13px] font-black tracking-widest uppercase">
                                {activeLocker.role}
                            </span>
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-white/30 text-[12px] font-black tracking-wide mt-0.5">
                                JERSEY #{activeLocker.number}
                            </span>
                        </div>
                    </div>

                    {/* Console Columns details */}
                    <div key={`content-${activeLocker.id}`} className="console-slide-in grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative mt-6 flex-grow">
                        
                        {/* COLUMN A: Legacy Relic Narrative & Cassette tape confession */}
                        <div className="flex flex-col justify-between h-full gap-5 border-b md:border-b-0 md:border-r border-white/5 pb-5 md:pb-0 md:pr-6">
                            <div className="space-y-2">
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.15em" }} className="uppercase font-bold block">
                                    ड्रेसिङ रुम अवशेष // LEGACY RELIC
                                </span>
                                <h5 style={{ fontFamily: "Mukta, sans-serif" }} className="text-[#C9A84C] text-[15.5px] font-black leading-tight m-0">
                                    {activeLocker.relicName}
                                </h5>
                                <p style={{ fontFamily: "Mukta, sans-serif" }} className="text-[11px] text-[#B0B8C8]/85 leading-relaxed text-justify">
                                    {activeLocker.relicDetail}
                                </p>
                            </div>

                            {/* Cassette confessions deck player */}
                            <div className="mt-2">
                                {isTapePlaying ? (
                                    <div className="bg-black/90 p-3 rounded border border-[#C9A84C]/35 space-y-1.5 animate-[fadeUpIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-1">
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "8px", color: "#C9A84C" }} className="uppercase font-bold tracking-wider animate-pulse flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full animate-ping" />
                                                TAPE MONITOR ACTIVE
                                            </span>
                                            <button 
                                                onClick={(e) => playTape(e, activeLocker.id)}
                                                className="text-[9px] text-[#C41E3A] hover:underline font-extrabold cursor-pointer"
                                            >
                                                SHUT DECK
                                            </button>
                                        </div>
                                        <p style={{ fontFamily: "Mukta, sans-serif" }} className="confession-scroller text-[10.5px] text-white/95 leading-relaxed max-h-20 overflow-y-auto pr-1 text-justify italic font-medium">
                                            "{activeLocker.confessionText}"
                                        </p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={(e) => playTape(e, activeLocker.id)}
                                        className="w-full flex items-center justify-between bg-white/[0.01] border border-white/5 hover:border-[#C9A84C]/30 px-3 py-2.5 rounded-sm transition-all group/btn cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2.5 animate-pulse">
                                            <div className="cassette-reel">
                                                <div className="w-1.5 h-1.5 bg-black rounded-full m-auto mt-1.5" />
                                            </div>
                                            <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "11px" }} className="text-white/60 group-hover/btn:text-white font-bold transition-colors">
                                                ड्रेसिङ रुम कन्फेसनेल (Tape Player)
                                            </span>
                                        </div>
                                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-[#C9A84C] group-hover/btn:translate-y-[0.5px] transition-transform" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* COLUMN B: Related Historical Match Stories list & profile button */}
                        <div className="flex flex-col justify-between h-full gap-5 md:pl-2">
                            <div className="space-y-3">
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.15em" }} className="uppercase font-extrabold block">
                                    सम्बन्धित ऐतिहासिक कथाहरू // MATCH ARCHIVES
                                </span>
                                
                                <div className="flex flex-col gap-2.5">
                                    {activeLocker.relatedStories.map((story) => (
                                        <button
                                            key={story.id}
                                            onClick={(e) => handleStoryRoute(e, story.id)}
                                            className="w-full text-left bg-white/[0.01] hover:bg-[#C41E3A]/10 border border-white/5 hover:border-[#C41E3A]/40 px-3 py-2.5 rounded-sm transition-all duration-300 group/link flex items-center justify-between cursor-pointer"
                                        >
                                            <span 
                                                style={{ fontFamily: "Mukta, sans-serif", fontSize: "11.5px", fontWeight: 700 }}
                                                className="text-white/75 group-hover/link:text-white transition-colors truncate pr-2"
                                            >
                                                {story.title}
                                            </span>
                                            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white/30 group-hover/link:text-[#C9A84C] group-hover/link:translate-x-0.5 transform transition-all" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={`/squad/${activeLocker.profileSlug}`}
                                className="inline-flex items-center justify-between bg-white/[0.02] border border-white/10 hover:border-blue-500/40 text-white/55 hover:text-white px-5 py-3 rounded-sm transition-all text-decoration-none text-[12px] font-bold group/linkbtn w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span>खेलाडीको आधिकारिक प्रोफाइल हेर्नुस्</span>
                                <svg className="w-4 h-4 transform transition-transform group-hover/linkbtn:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>

                    </div>
                </div>

                {/* ── RIGHT PANE: INTERACTIVE PLAYER SELECTOR DIRECTORY TABS (38% Width) ── */}
                <div className="tabs-right-pane">
                    {PLAYERS_LOCKERS.map((locker) => {
                        const isActive = activePlayer === locker.id;
                        return (
                            <div
                                key={locker.id}
                                className={`latch-tag-btn ${isActive ? "active" : ""}`}
                                onClick={() => handleTabClick(locker.id)}
                                style={{ 
                                    "--tab-border": locker.glowColor.includes("201") ? "#C9A84C" : "#1E3A8A",
                                    "--hover-glow": locker.glowColor.replace(/[^,]+(?=\))/, '0.15')
                                } as React.CSSProperties}
                            >
                                <div className="flex items-center gap-4">
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className={`text-[20px] font-black leading-none ${
                                        isActive ? "text-[#C9A84C]" : "text-white/30"
                                    }`}>
                                        #{locker.number}
                                    </span>
                                    
                                    <div className="text-left">
                                        <h4 
                                            style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }}
                                            className={`text-[16px] leading-tight m-0 tracking-wide transition-colors ${
                                                isActive ? "text-white" : "text-white/60"
                                            }`}
                                        >
                                            {locker.name}
                                        </h4>
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9.5px" }} className="text-white/30 tracking-wider uppercase block mt-0.5">
                                            {locker.era.split(" ")[0]} युग
                                        </span>
                                    </div>
                                </div>

                                {/* Glowing pulsating active LED dot */}
                                <div className="flex items-center gap-2 select-none">
                                    {isActive ? (
                                        <>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-ping" />
                                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C9A84C" }} className="uppercase font-bold tracking-widest">
                                                ACTIVE
                                            </span>
                                        </>
                                    ) : (
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.2)" }} className="uppercase font-bold tracking-widest group-hover:text-white/40 transition-colors">
                                            SELECT
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
