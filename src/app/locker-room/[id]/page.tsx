import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";

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
        title: story.title,
        description: story.description.slice(0, 120),
    };
}

// Era → relevant squad player links
const ERA_PLAYERS: Record<string, { name: string; id: string }[]> = {
    "विश्वकप युग": [
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "कुशल भुर्तेल", id: "kushal-bhurtel" },
    ],
    "ओडीआई युग": [
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "रोहित पौडेल", id: "rohit-paudel" },
    ],
};

// Cinematic context by id
const STORY_CONTEXT: Record<string, string> = {
    "story-01": "ढाकाको त्यो बिहान — जब नेपाल पहिलोपटक विश्व क्रिकेटको सबैभन्दा ठूलो मञ्चमा उत्रियो, पारस खड्काले ड्रेसिङ रुममा भनेका थिए: 'हामी भाग लिन आएका होइनौं।' त्यो वाक्यले नेपाली क्रिकेटको अर्को दशक परिभाषित गर्‍यो।",
    "story-02": "बसन्त रेग्मीको पहिलो अन्तर्राष्ट्रिय विकेट — जब सेतो धर्तीमा रातो बल हावामा घुम्यो र एउटा ब्याट्सम्यान हतप्रभ भएर फर्कियो, त्यो नेपाली गेंदबाजीको नयाँ भाषाको जन्म थियो।",
    "story-03": "शक्ति गौचनको हर बल एउटा प्रश्न थियो — क्या तिमीले थाहा पाउछौ कि नेपालमा पनि स्पिन छ? संसारले त्यो उत्तर बिस्तारै बुझ्न थाल्यो।",
    "story-04": "पारस खड्काको बिदाइ एउटा युगको अन्त्य थिएन — यो एउटा नयाँ अध्यायको आधारशिला थियो। उनले बनाएको जगमाथि आज रोहित पौडेलको पुस्ताले उभिएको छ।",
    "story-05": "१ अगस्त, २०१८ — नेपालले पहिलोपटक सेतो जर्सीमा आधिकारिक एकदिवसीय खेल्यो। त्यो दिन सिर्फ एउटा खेल थिएन — त्यो दुई दशकको प्रतीक्षाको उत्तर थियो।",
    "story-06": "डलासको त्यो रात — एक रन। सिर्फ एक रन। तर त्यो एक रनमा नेपालको सिङ्गो सपना थियो, र संसारले देख्यो कि सपना र हकिकतको दूरी कति पातलो हुन सक्छ।",
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
    const context = STORY_CONTEXT[story.id];

    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative font-sans">

            {/* Cinematic Hero — 50vh */}
            <section className="relative h-[50vh] w-full overflow-hidden flex flex-col justify-end">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: "grayscale(80%) brightness(0.5)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/50 to-transparent" />

                <div className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto pb-12 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    <span
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "11px",
                            color: "#C9A84C",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            marginBottom: "12px",
                            display: "block",
                        }}
                    >
                        {story.era}
                    </span>
                    <h1
                        style={{
                            fontFamily: "Mukta, sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(40px,6vw,80px)",
                            color: "#FFFFFF",
                            lineHeight: 1.05,
                            marginBottom: "12px",
                        }}
                    >
                        {story.title}
                    </h1>
                    <span
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "13px",
                            color: "#6B7280",
                            letterSpacing: "0.1em",
                            display: "block",
                            marginBottom: "20px",
                        }}
                    >
                        {story.date}
                    </span>
                    <Link
                        href="/locker-room"
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "12px",
                            color: "#6B7280",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            transition: "color 0.2s",
                        }}
                        className="hover:text-[#E8E8E8]"
                    >
                        ← इतिहासको अभिलेख
                    </Link>
                </div>
            </section>

            {/* Story Body */}
            <article className="relative z-10 max-w-3xl mx-auto px-6 py-24">

                {/* Opening pullquote */}
                <blockquote
                    className="mb-12"
                    style={{
                        borderLeft: "3px solid #C9A84C",
                        paddingLeft: "24px",
                        margin: "0 0 48px 0",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "Mukta, sans-serif",
                            fontSize: "clamp(20px,2.5vw,26px)",
                            fontWeight: 700,
                            color: "#E8E8E8",
                            lineHeight: 1.5,
                            fontStyle: "italic",
                        }}
                    >
                        {story.description.split("।")[0]}।
                    </p>
                </blockquote>

                {/* Full description */}
                <div
                    style={{
                        fontFamily: "Mukta, sans-serif",
                        fontSize: "18px",
                        color: "#B0B8C8",
                        lineHeight: 1.85,
                    }}
                >
                    {story.description}
                </div>

                {/* Cinematic context paragraph */}
                {context && (
                    <>
                        <div
                            style={{
                                height: "1px",
                                background: "rgba(255,255,255,0.08)",
                                margin: "48px 0",
                            }}
                        />
                        <p
                            style={{
                                fontFamily: "Mukta, sans-serif",
                                fontSize: "17px",
                                color: "rgba(176,184,200,0.75)",
                                lineHeight: 1.85,
                                fontStyle: "italic",
                            }}
                        >
                            {context}
                        </p>
                    </>
                )}

                {/* Era players */}
                {eraPlayers.length > 0 && (
                    <>
                        <div
                            style={{
                                height: "1px",
                                background: "rgba(255,255,255,0.08)",
                                margin: "48px 0 32px",
                            }}
                        />
                        <div>
                            <span
                                style={{
                                    fontFamily: "Barlow Condensed, sans-serif",
                                    fontSize: "11px",
                                    color: "#C9A84C",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    display: "block",
                                    marginBottom: "20px",
                                }}
                            >
                                यो युगका खेलाडीहरू
                            </span>
                            <div className="flex flex-wrap gap-3">
                                {eraPlayers.map((player) => (
                                    <Link
                                        key={player.id}
                                        href={`/squad/${player.id}`}
                                        className="group"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            backdropFilter: "blur(8px)",
                                            padding: "10px 16px",
                                            textDecoration: "none",
                                            transition: "border-color 0.2s, background 0.2s",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "Mukta, sans-serif",
                                                fontSize: "15px",
                                                fontWeight: 600,
                                                color: "#E8E8E8",
                                            }}
                                            className="group-hover:text-[#C9A84C] transition-colors"
                                        >
                                            {player.name}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#6B7280" }}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </article>

            {/* Bottom navigation */}
            <nav className="relative z-10 max-w-3xl mx-auto px-6 pb-16">
                <div
                    style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.08)",
                        marginBottom: "32px",
                    }}
                />
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {prevStory ? (
                        <Link
                            href={`/locker-room/${prevStory.id}`}
                            style={{
                                fontFamily: "Barlow Condensed, sans-serif",
                                fontSize: "12px",
                                color: "#6B7280",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                            }}
                            className="hover:text-[#C9A84C] transition-colors"
                        >
                            ← {prevStory.title}
                        </Link>
                    ) : (
                        <span />
                    )}
                    {nextStory ? (
                        <Link
                            href={`/locker-room/${nextStory.id}`}
                            style={{
                                fontFamily: "Barlow Condensed, sans-serif",
                                fontSize: "12px",
                                color: "#6B7280",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                            }}
                            className="hover:text-[#C9A84C] transition-colors"
                        >
                            {nextStory.title} →
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
                <div className="text-center mt-8">
                    <Link
                        href="/locker-room"
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "11px",
                            color: "#6B7280",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}
                        className="hover:text-[#C9A84C] transition-colors"
                    >
                        ← इतिहासको अभिलेखमा फर्किनुस्
                    </Link>
                </div>
            </nav>
        </div>
    );
}
