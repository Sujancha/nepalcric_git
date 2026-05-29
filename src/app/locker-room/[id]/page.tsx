import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import LockerStoryClient from "@/components/locker-room/LockerStoryClient";

interface LockerStory {
    id: string;
    title: string;
    date: string;
    era: string;
    description: string;
    thumb: string;
}

function getStories(): LockerStory[] {
    const raw = fs.readFileSync(path.join(process.cwd(), "content", "locker-room.json"), "utf8");
    return (JSON.parse(raw) as { stories: LockerStory[] }).stories;
}

export async function generateStaticParams() {
    const stories = getStories();
    return stories.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const stories = getStories();
    const story = stories.find((s) => s.id === id);
    if (!story) return { title: "लकर रुम" };
    return {
        title: `${story.title} // लकर रुम`,
        description: story.description.slice(0, 140) + "...",
    };
}

// Comprehensive Era player links referencing actual active players in our squad database
const ERA_PLAYERS: Record<string, { name: string; id: string }[]> = {
    "पारस खड्का युग": [
        { name: "सोमपाल कामी", id: "sompal-kami" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "करन केसी", id: "karan-kc" },
    ],
    "पायोनियर युग": [
        { name: "सोमपाल कामी", id: "sompal-kami" },
        { name: "ललित राजवंशी", id: "lalit-rajbanshi" },
        { name: "करन केसी", id: "karan-kc" },
    ],
    "ओडीआई युग": [
        { name: "सोमपाल कामी", id: "sompal-kami" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "ललित राजवंशी", id: "lalit-rajbanshi" },
    ],
    "विश्वकप युग": [
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "दीपेन्द्र सिंह ऐरी", id: "dipendra-singh-airee" },
        { name: "गुल्सन झा", id: "gulshan-jha" },
        { name: "कुशल भुर्तेल", id: "kushal-bhurtel" },
        { name: "आसिफ शेख", id: "aasif-sheikh" },
        { name: "सन्दीम जोरा", id: "sundeep-jora" },
    ],
};

// Seed db telemetry noise levels based on story ID to simulate live broadcasting
const STORY_TELEMETRY: Record<string, { db: string; frequency: string; location: string }> = {
    "story-01": { db: "१३२db", frequency: "१०४.२ MHz", location: "चटगाउँ, बङ्गलादेश" },
    "story-02": { db: "१२४db", frequency: "९८.६ MHz", location: "क्वालालम्पुर, मलेसिया" },
    "story-03": { db: "१२८db", frequency: "१०१.४ MHz", location: "क्वालालम्पुर, मलेसिया" },
    "story-04": { db: "१३५db", frequency: "१०७.१ MHz", location: "दुबई, युएई" },
    "story-05": { db: "१३१db", frequency: "१०२.८ MHz", location: "भीआरए मैदान, एमस्टेलभिन" },
    "story-06": { db: "१३३db", frequency: "१०५.६ MHz", location: "अर्नोस भेल, सेन्ट भिन्सेन्ट" },
    "story-07": { db: "१२०db", frequency: "९६.४ MHz", location: "टियू क्रिकेट मैदान, कीर्तिपुर" },
    "story-08": { db: "१२२db", frequency: "९७.८ MHz", location: "लिंकन, न्यूजील्याण्ड" },
    "story-09": { db: "१३६db", frequency: "१०८.० MHz", location: "कोलकाता/दिल्ली, भारत" },
    "story-10": { db: "१३०db", frequency: "१०२.१ MHz", location: "आईसीसी एकेडेमी, दुबई" },
    "story-11": { db: "११५db", frequency: "९४.२ MHz", location: "हाम्रो सानो कोठा, नेपाल" },
    "story-12": { db: "१२६db", frequency: "९९.४ MHz", location: "काठमाडौं, नेपाल" },
    "story-13": { db: "१३४db", frequency: "१०६.३ MHz", location: "टियू क्रिकेट मैदान, कीर्तिपुर" },
    "story-14": { db: "१३७db", frequency: "१०७.९ MHz", location: "अल अमरात, ओमान" },
};

export default async function LockerStoryDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const stories = getStories();
    const storyIndex = stories.findIndex((s) => s.id === id);
    if (storyIndex === -1) notFound();

    const story = stories[storyIndex];
    const prevStory = storyIndex > 0 ? stories[storyIndex - 1] : null;
    const nextStory = storyIndex < stories.length - 1 ? stories[storyIndex + 1] : null;
    const eraPlayers = ERA_PLAYERS[story.era] ?? [];
    const telemetry = STORY_TELEMETRY[story.id] ?? { db: "१२८db", frequency: "१००.० MHz", location: "नेपाल" };

    // Split the hyper-detailed 9-Act description into individual paragraphs representing documentary segments
    const paragraphs = story.description.split("\n\n").filter(Boolean);
    const coldOpen = paragraphs[0]; // Act 1
    const bodyActs = paragraphs.slice(1); // Acts 2 to 9

    // Dynamic Cinematic Loop navigation: if at the end of stories, loop back to the first story
    const upNextStory = nextStory || stories[0];

    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative overflow-hidden font-sans">
            
            {/* Locker Room Ambient Embers & Particle Triggers */}
            <LockerStoryClient dbValue={telemetry.db} era={story.era} />

            {/* Parallax Graded Header — 52vh */}
            <section className="relative h-[52vh] w-full overflow-hidden flex flex-col justify-end border-b border-white/5">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${story.thumb})`,
                        filter: "brightness(0.38) contrast(1.05)",
                    }}
                />
                
                {/* Visual vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/45 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07080F]/90 via-transparent to-transparent z-10" />

                <div className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto pb-12 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    <div className="flex items-center gap-3 mb-3">
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.3em" }}
                            className="uppercase font-extrabold"
                        >
                            {story.era}
                        </span>
                        <div className="w-1 h-1 bg-[#C41E3A] rounded-full" />
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em" }}
                            className="uppercase font-semibold"
                        >
                            {story.date}
                        </span>
                    </div>

                    <h1
                        style={{
                            fontFamily: "Mukta, sans-serif",
                            fontWeight: 900,
                            fontSize: "clamp(34px, 5.5vw, 68px)",
                            color: "#FFFFFF",
                            lineHeight: 1.1,
                        }}
                        className="mb-6 max-w-4xl tracking-tight"
                    >
                        {story.title}
                    </h1>

                    <Link
                        href="/locker-room"
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.45)",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}
                        className="inline-flex items-center gap-2 hover:text-[#C9A84C] transition-colors group"
                    >
                        <span className="transform transition-transform duration-300 group-hover:-translate-x-1.5 inline-block">←</span> 
                        इतिहासको आधिकारिक अभिलेख // RETURN TO ARCHIVE
                    </Link>
                </div>
            </section>

            {/* Main Content Layout Grid */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* LEFT COLUMN: Sticky Broadcast Telemetry & Key Squad Connections (lg:col-span-4) */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-28 space-y-8">
                            
                            {/* Broadcast Telemetry Dossier */}
                            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-sm backdrop-blur-md space-y-5">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <span 
                                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.15em" }}
                                        className="uppercase font-bold"
                                    >
                                        प्रसारण विवरण // DOSSIER METRICS
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full animate-ping" />
                                        <span 
                                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C41E3A", letterSpacing: "0.1em" }}
                                            className="uppercase font-extrabold"
                                        >
                                            SIGNAL ACTIVE
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label style={{ fontFamily: "Mukta, sans-serif" }} className="text-[11px] text-white/40 block mb-1">ऐतिहासिक स्थल</label>
                                        <span style={{ fontFamily: "Mukta, sans-serif" }} className="text-[14px] text-white font-bold">{telemetry.location}</span>
                                    </div>
                                    <div>
                                        <label style={{ fontFamily: "Mukta, sans-serif" }} className="text-[11px] text-white/40 block mb-1">प्रसारण फ्रिक्वेन्सी</label>
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-[14px] text-white font-bold tracking-wide">{telemetry.frequency}</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                                    <div>
                                        <label style={{ fontFamily: "Mukta, sans-serif" }} className="text-[11px] text-white/40 block mb-1">भावनात्मक तीव्रता (Volume)</label>
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#C9A84C" }} className="text-[20px] font-extrabold tracking-tight">{telemetry.db}</span>
                                    </div>
                                    
                                    {/* Sidebar Live Seismograph Waveform */}
                                    <div className="lsc-seismo-bars">
                                        {[...Array(6)].map((_, bi) => (
                                            <div
                                                key={bi}
                                                className="lsc-seismo-bar"
                                                style={{
                                                    height: `${40 + bi * 12}%`,
                                                    animationDelay: `${-bi * 0.15}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Related Squad Figures */}
                            {eraPlayers.length > 0 && (
                                <div className="space-y-4">
                                    <span 
                                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.22em" }}
                                        className="uppercase font-bold block"
                                    >
                                        यो युगका खेलाडीहरू // KEY FIGURES
                                    </span>
                                    
                                    <div className="flex flex-col gap-2.5">
                                        {eraPlayers.map((player) => (
                                            <Link
                                                key={player.id}
                                                href={`/squad/${player.id}`}
                                                className="group flex items-center justify-between bg-white/[0.02] border border-white/5 px-5 py-4 hover:border-[#C9A84C]/40 hover:bg-white/[0.04] transition-all duration-300 text-decoration-none"
                                                style={{ borderRadius: "2px" }}
                                            >
                                                <span 
                                                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "16px", fontWeight: 700 }}
                                                    className="text-white group-hover:text-[#C9A84C] transition-colors"
                                                >
                                                    {player.name}
                                                </span>
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    width="14" 
                                                    height="14" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2.5" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    className="text-white/20 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#C9A84C]"
                                                >
                                                    <path d="M5 12h14" />
                                                    <path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </aside>

                    {/* RIGHT COLUMN: The 9-Act Immersive Story (lg:col-span-8) */}
                    <article className="lg:col-span-8 space-y-8">
                        
                        {/* Act 1: The Cold Open (Massive gold quote block) */}
                        {coldOpen && (
                            <blockquote className="border-l-4 border-[#C9A84C] pl-6 py-1 mb-10 bg-[#C9A84C]/[0.01]">
                                <p 
                                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 700, color: "#E8E8E8", lineHeight: 1.55 }}
                                    className="italic"
                                >
                                    {coldOpen}
                                </p>
                            </blockquote>
                        )}

                        {/* Remaining Acts formatted beautifully with drop-in dividers */}
                        <div className="space-y-6">
                            {bodyActs.map((para, pIdx) => (
                                <div key={pIdx}>
                                    <p 
                                        style={{ fontFamily: "Mukta, sans-serif", fontSize: "17.5px", color: "rgba(176, 184, 200, 0.88)", lineHeight: 1.88 }}
                                        className="mb-6 font-medium text-justify"
                                    >
                                        {para}
                                    </p>
                                    
                                    {/* Subtitle break lines for high production document look */}
                                    {pIdx === 2 && (
                                        <div className="my-8 flex items-center justify-center gap-3 opacity-20">
                                            <div className="w-1.5 h-1.5 bg-[#C9A84C] rotate-45" />
                                            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
                                            <div className="w-1.5 h-1.5 bg-[#C9A84C] rotate-45" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </article>
                </div>
            </main>

            {/* CINEMATIC NAVIGATION LOOP SYSTEM */}
            <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 mt-12 pb-16">
                <div className="border-t border-white/5 pt-12 mb-8" />
                
                {/* 1. UP NEXT: Large Landscape duotone countdown banner */}
                <span 
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.22em" }}
                    className="uppercase font-bold block mb-4"
                >
                    अर्को ऐतिहासिक फाइल // UP NEXT IN HISTORY
                </span>
                
                <Link
                    href={`/locker-room/${upNextStory.id}`}
                    className="group relative block w-full h-[220px] rounded-sm overflow-hidden border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-500 mb-12 text-decoration-none"
                >
                    {/* Graded cover background image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center grayscale-[55%] brightness-[0.38] transition-all duration-700 group-hover:scale-103 group-hover:grayscale-0 group-hover:brightness-[0.52]" 
                        style={{ backgroundImage: `url(${upNextStory.thumb})` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07080F]/90 via-[#07080F]/60 to-transparent z-10 pointer-events-none" />
                    
                    <div className="absolute inset-y-0 left-0 p-8 md:p-12 z-20 flex flex-col justify-center">
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.28em" }}
                            className="uppercase font-black mb-2.5 block"
                        >
                            {upNextStory.era}
                        </span>
                        <h3 
                            style={{ fontFamily: "Mukta, sans-serif", fontSize: "clamp(20px, 3.5vw, 30px)", fontWeight: 900, lineHeight: 1.2 }}
                            className="text-white group-hover:text-[#C9A84C] transition-colors mb-2"
                        >
                            {upNextStory.title}
                        </h3>
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}
                            className="font-bold tracking-wide"
                        >
                            {upNextStory.date} · पढ्न ट्याप गर्नुहोस् // TAP TO ENTER
                        </span>
                    </div>

                    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/70 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:border-[#C9A84C]/60 transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: "12px", height: "12px", color: "#C9A84C" }} xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                    </div>
                </Link>

                {/* 2. EXPLORE THE CRICKET UNIVERSE: A premium spotlit bento navigation grid */}
                <span 
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.22em" }}
                    className="uppercase font-bold block mb-5"
                >
                    नेपाली क्रिकेटको ब्रह्माण्ड // EXPLORE THE UNIVERSE
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Link A: Fan Zone */}
                    <Link
                        href="/fanzone"
                        className="group relative h-[150px] bg-white/[0.01] border border-white/5 hover:border-[#C41E3A]/40 p-6 flex flex-col justify-end rounded-sm transition-all duration-300 text-decoration-none"
                    >
                        <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#C41E3A] animate-pulse" />
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C41E3A", letterSpacing: "0.2em" }}
                            className="uppercase font-extrabold mb-1"
                        >
                            फ्यानहरू र गर्जाहट // FAN ZONE
                        </span>
                        <h4 style={{ fontFamily: "Mukta, sans-serif" }} className="text-white text-[17px] font-extrabold m-0 group-hover:text-[#C41E3A] transition-colors">
                            फ्यान जोनमा प्रवेश गर्नुस् →
                        </h4>
                    </Link>

                    {/* Link B: Active Squad */}
                    <Link
                        href="/squad"
                        className="group relative h-[150px] bg-white/[0.01] border border-white/5 hover:border-[#C9A84C]/40 p-6 flex flex-col justify-end rounded-sm transition-all duration-300 text-decoration-none"
                    >
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.2em" }}
                            className="uppercase font-extrabold mb-1"
                        >
                            राष्ट्रिय टोली // NATIONAL SQUAD
                        </span>
                        <h4 style={{ fontFamily: "Mukta, sans-serif" }} className="text-white text-[17px] font-extrabold m-0 group-hover:text-[#C9A84C] transition-colors">
                            सक्रिय स्क्वाड हेर्नुस् →
                        </h4>
                    </Link>

                    {/* Link C: Match Center */}
                    <Link
                        href="/match-day"
                        className="group relative h-[150px] bg-white/[0.01] border border-white/5 hover:border-blue-500/30 p-6 flex flex-col justify-end rounded-sm transition-all duration-300 text-decoration-none"
                    >
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#3B82F6", letterSpacing: "0.2em" }}
                            className="uppercase font-extrabold mb-1"
                        >
                            लाइभ स्कोरकार्ड // LIVE CENTER
                        </span>
                        <h4 style={{ fontFamily: "Mukta, sans-serif" }} className="text-white text-[17px] font-extrabold m-0 group-hover:text-blue-400 transition-colors">
                            लाइभ म्याच सेन्टर →
                        </h4>
                    </Link>

                </div>

                {/* Back to archive index */}
                <div className="text-center mt-12">
                    <Link
                        href="/locker-room"
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.4)",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}
                        className="hover:text-[#C9A84C] transition-colors border border-white/5 bg-white/[0.01] px-8 py-3 rounded-full hover:border-[#C9A84C]/30 hover:bg-white/[0.03]"
                    >
                        ← लकर रुमको मुख्य टनेलमा फर्किनुस्
                    </Link>
                </div>
            </section>
        </div>
    );
}
