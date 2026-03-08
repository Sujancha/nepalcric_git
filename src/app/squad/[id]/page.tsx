import { notFound } from "next/navigation";
import Image from "next/image";
import { ShinyText } from "@/components/ui/ShinyText";
import CinematicHeroClient from "@/components/squad/CinematicHeroClient";
import playersData from "@/lib/playerData.json";
import AnimatedStatCard from "@/components/squad/AnimatedStatCard";
import PlayerChatbot from '@/components/squad/PlayerChatbot';

// In Next.js 15+, params is a Promise
export default async function PlayerProfile({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // 1. Fetch data from mock database
    const player = playersData.find((p) => p.id === id);

    if (!player) {
        notFound();
    }

    return (
        <div className="w-full bg-[#07080F] min-h-screen">

            {/* 1. Cinematic Hero Client Component (Layers, Parallax, Mouse Spotlight) */}
            <CinematicHeroClient player={player} />

            {/* 2. The Origin Story (Editorial Typography) */}
            <section className="py-24 max-w-4xl mx-auto px-6 relative z-10">
                <div className="flex items-center gap-4 mb-12 opacity-70">
                    <span className="h-px flex-1 bg-[#B0B8C8]/20" />
                    <h2 className="font-mono font-bold text-[#C9A84C] uppercase tracking-[0.3em] text-sm md:text-base">
                        सुरुवाती कथा
                    </h2>
                    <span className="h-px flex-1 bg-[#B0B8C8]/20" />
                </div>

                {/* Magazine-style massive drop-cap effect using first-letter */}
                {Array.isArray(player.originStory) ? (
                    player.originStory.map((paragraph: string, index: number) => (
                        <div key={index}>
                            <p className={`font-sans text-[#B0B8C8] text-xl leading-relaxed md:text-2xl md:leading-[1.8] mb-12 ${index === 0 ? 'first-letter:float-left first-letter:text-7xl first-letter:font-display first-letter:font-black first-letter:text-[#C41E3A] first-letter:mr-4 first-letter:mt-2' : ''}`}>
                                {paragraph}
                            </p>
                            {/* Unreasonable Wisdom Quotes Interspersed */}
                            {player.unreasonableWisdom && player.unreasonableWisdom[index] && (
                                <blockquote className="my-16 pl-8 md:pl-12 border-l-8 border-[#C41E3A] bg-[#0D1B2A] py-10 pr-8 relative rounded-r-2xl overflow-hidden shadow-sm">
                                    <span className="absolute -top-6 left-2 text-[#C41E3A]/10 font-display font-black text-[12rem] leading-none select-none">"</span>
                                    <p className="font-display uppercase tracking-wide text-3xl md:text-4xl lg:text-5xl text-stadium-white leading-[1.2] relative z-10">
                                        "{player.unreasonableWisdom[index]}"
                                    </p>
                                    <span className="block mt-8 font-ui font-bold text-[#C9A84C] uppercase tracking-widest text-sm">— अनरिज़नेबल विजडम</span>
                                </blockquote>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="font-sans text-[#B0B8C8] text-xl leading-relaxed md:text-2xl md:leading-[1.8] first-letter:float-left first-letter:text-7xl first-letter:font-display first-letter:font-black first-letter:text-[#C41E3A] first-letter:mr-4 first-letter:mt-2">
                        {player.originStory}
                    </p>
                )}
            </section>

            {/* NEW: 2.5 The Bio-Scroll & AI Discovery Sidebar */}
            <section className="bg-[#0D1B2A] py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Bio-Scroll (Long-form Deep Story) */}
                    <div className="lg:col-span-8 flex flex-col gap-16">
                        {player.deepStory?.map((story: any, index: number) => (
                            <div key={story.era ?? index} className="flex flex-col gap-6">
                                <h3 className="font-mono uppercase text-2xl md:text-3xl tracking-[0.3em] text-stadium-white border-l-4 border-[#C41E3A] pl-4 leading-normal">
                                    {story.title}
                                </h3>

                                <p className="font-sans text-lg leading-[1.8] text-[#B0B8C8]">
                                    {story.content}
                                </p>

                                {/* Visual Breakpoints / Placeholders between sections */}
                                {index !== player.deepStory.length - 1 && (
                                    <div className="my-12 w-full">
                                        <div className="relative w-full h-[600px] md:h-[700px] xl:h-[800px] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] group border border-white/5 border-r-2 border-[#C41E3A]">
                                            <Image
                                                src={(story as any).image || player.image || "/images/tu_ground.gif"}
                                                alt={`Iconic Match Photo - ${story.title}`}
                                                fill
                                                className="object-cover opacity-80 mix-blend-lighten transition-all duration-1000 scale-110 group-hover:scale-100 grayscale-[50%] group-hover:grayscale-0 relative z-0"
                                                unoptimized={!player.image && !(story as any).image}
                                            />
                                        </div>
                                        <p className="font-sans text-sm text-[#B0B8C8]/50 mt-4 italic text-center">
                                            क्याप्सन: {story.title} बाट अर्को च्याप्टरसम्मको यात्रा।
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Column: AI Discovery Sidebar (Sticky) */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-24">
                            <PlayerChatbot
                                playerId={player.id}
                                playerName={player.name}
                                playerRole={player.role}
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* NEW: 2.6 Timeline of Resilience (Conditional) */}
            {player.timeline && player.timeline.length > 0 && (
                <section className="bg-[#07080F] py-24 border-t border-white/5 relative overflow-hidden">
                    {/* Decorative Background Text */}
                    <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-5 flex justify-center">
                        <span className="font-display font-black text-[20rem] leading-none text-stadium-white whitespace-nowrap">
                            संघर्ष
                        </span>
                    </div>

                    <div className="max-w-5xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="font-mono font-bold text-3xl md:text-5xl text-stadium-white tracking-[0.3em] uppercase">
                                स्ट्रगलको <span className="text-[#C41E3A]">टाइमलाइन</span>
                            </h2>
                        </div>

                        <div className="relative">
                            {/* The Vertical Line (Gold) */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(196,30,58,0.35)] transform md:-translate-x-1/2"></div>

                            <div className="flex flex-col gap-16">
                                {player.timeline.map((event: any, index: number) => (
                                    <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 group hover:-translate-y-1 transition-transform duration-500`}>

                                        {/* Pulse Node (Crimson Red) */}
                                        <div className={`absolute left-8 md:left-1/2 w-3 h-3 rounded-full transform -translate-x-[5px] md:-translate-x-[5px] mt-6 md:mt-0 z-10 group-hover:scale-125 transition-all duration-300 ${event.highlight
                                            ? 'bg-stadium-white shadow-[0_0_20px_rgba(201,168,76,0.8)] group-hover:bg-[#C9A84C]'
                                            : 'bg-[#C41E3A] shadow-[0_0_8px_rgba(196,30,58,0.6)] group-hover:bg-stadium-white'
                                            }`}>
                                            <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${event.highlight ? 'bg-[#C9A84C]' : 'bg-[#C41E3A]'}`}></div>
                                        </div>

                                        {/* Empty spacer for alternating layout */}
                                        <div className="hidden md:block md:w-1/2"></div>

                                        {/* Content Card (Cinematic Dark Glassmorphism) */}
                                        <div className="pl-20 md:pl-0 md:w-1/2 w-full">
                                            <div className={`bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-[#C9A84C]/20 shadow-lg group-hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-all duration-300 relative overflow-hidden ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                                                } ${event.highlight ? 'bg-[#C9A84C]/10 border-[#C9A84C]/50 shadow-[0_0_40px_rgba(201,168,76,0.2)]' : ''
                                                }`}>
                                                {/* Highlight Background Glow */}
                                                {event.highlight && (
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#C9A84C]/20 transition-colors duration-500" />
                                                )}

                                                <span className={`font-display font-black text-7xl block mb-2 leading-none tracking-tighter ${event.highlight ? 'text-[#C9A84C]/30' : 'text-stadium-white/10'
                                                    }`}>
                                                    {event.year}
                                                </span>
                                                <h3 className="font-mono uppercase tracking-[0.3em] text-2xl md:text-3xl text-stadium-white mb-6 leading-relaxed">
                                                    {event.title}
                                                </h3>

                                                {event.quote && (
                                                    <blockquote className="border-l-4 border-[#C41E3A] pl-6 my-6 bg-[#0D1B2A]/80 py-4 pr-4 rounded-r-lg">
                                                        <p className="font-sans text-[#B0B8C8] italic text-lg leading-relaxed first-letter:float-left first-letter:text-6xl first-letter:font-display first-letter:font-black first-letter:text-[#C41E3A] first-letter:mr-3 first-letter:mt-1">
                                                            "{event.quote}"
                                                        </p>
                                                    </blockquote>
                                                )}

                                                <p className="font-sans text-[#B0B8C8] text-base leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* NEW: 2.7 Signature Arsenal Grid */}
            {(player as any).signatureArsenal && (player as any).signatureArsenal.length > 0 && (
                <section className="bg-[#0D1B2A] py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-16 flex flex-col items-center text-center">
                            <span className="inline-block w-16 h-1 bg-[#C41E3A] mb-6" />
                            <h2 className="font-mono font-bold text-3xl md:text-5xl text-stadium-white tracking-[0.3em] uppercase">
                                प्रमुख <span className="text-[#C41E3A]">हतियार</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {(player as any).signatureArsenal.map((move: any, index: number) => (
                                <div key={index} className="bg-[linear-gradient(135deg,rgba(196,30,58,0.05),transparent_60%)] border border-white/10 backdrop-blur-md rounded-2xl p-10 flex flex-col relative overflow-hidden group shadow-[inset_0_1px_0_rgba(201,168,76,0.08),0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_0_rgba(201,168,76,0.08),0_20px_40px_rgba(0,0,0,0.8)] hover:-translate-y-2 transition-all duration-500">
                                    <div className="absolute inset-0 bg-[#C41E3A]/0 group-hover:bg-[#C41E3A]/5 transition-colors duration-500" />
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#C41E3A] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                                    <div className="relative z-10 flex-1">
                                        <h3 className="font-display uppercase text-3xl text-stadium-white mb-6 leading-tight group-hover:text-[#C41E3A] transition-colors">
                                            {move.title}
                                        </h3>
                                        <div className="h-1 w-12 bg-[#C41E3A] mb-8 transition-all duration-300 group-hover:w-24" />
                                        <p className="font-sans text-[#B0B8C8] leading-relaxed text-lg">
                                            {move.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 3. Visual-Heavy Stats Center */}
            <section className="py-24 bg-[#07080F] border-t border-white/5 relative overflow-hidden">
                {/* Decorative background logo slice */}
                <div className="absolute -right-[60px] top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
                    <span className="font-display font-black text-[42rem] leading-none text-stadium-white select-none">C</span>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h2
                        className="font-bold text-[12px] tracking-[0.2em] text-[#C9A84C] mb-8 uppercase text-center"
                        style={{ fontFamily: 'var(--font-barlow, sans-serif)' }}
                    >
                        CAREER HIGHLIGHTS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Signature Move Callout (Fallback) */}
                        {!(player as any).signatureArsenal && (
                            <div className="col-span-1 md:col-span-2 bg-[#C41E3A] rounded-2xl p-10 flex flex-col justify-between shadow-[0_20px_40px_rgba(196,30,58,0.2)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10">
                                    <span className="font-ui font-bold text-stadium-white/60 tracking-widest uppercase text-sm mb-4 block">प्रमुख हतियार</span>
                                    <h3 className="font-display uppercase text-4xl md:text-5xl text-stadium-white leading-tight">
                                        {player.signatureMove}
                                    </h3>
                                </div>
                                <div className="relative z-10 mt-12 pt-6 border-t border-stadium-white/20">
                                    <span className="font-ui font-semibold text-stadium-white tracking-widest uppercase text-xs mb-2 block">टर्निङ पोइन्ट</span>
                                    <p className="font-sans font-semibold text-stadium-white/90 text-lg">
                                        {player.keyMoment}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Dynamic Stats Map */}
                        {Object.entries(player.stats).map(([key, value]) => (
                            <AnimatedStatCard key={key} label={key} value={value as string} />
                        ))}

                    </div>
                </div>
            </section>

        </div>
    );
}
