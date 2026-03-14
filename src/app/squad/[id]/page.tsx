import { notFound } from "next/navigation";
import Image from "next/image";
import { ShinyText } from "@/components/ui/ShinyText";
import CinematicHeroClient from "@/components/squad/CinematicHeroClient";
import playersData from "@/lib/playerData.json";
import PlayerChatbot from '@/components/squad/PlayerChatbot';
import PlayerStatsClient from "@/components/squad/PlayerStatsClient";
import ArsenalCarouselClient from "@/components/squad/ArsenalCarouselClient";

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

            {/* 2. The Origin Story & Quotes (Editorial Typography) */}
            <section className="py-24 max-w-5xl mx-auto px-6 relative z-10 w-full overflow-hidden">
                <div className="flex items-center gap-4 mb-16 opacity-70">
                    <span className="h-px flex-1 bg-[#B0B8C8]/20" />
                    <h2 className="font-mono font-bold text-[#C9A84C] uppercase tracking-[0.3em] text-sm md:text-base">
                        सुरुवाती कथा
                    </h2>
                    <span className="h-px flex-1 bg-[#B0B8C8]/20" />
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Magazine-style massive drop-cap effect and lead-in sentence */}
                    {Array.isArray(player.originStory) ? (
                        player.originStory.map((paragraph: string, index: number) => {
                            if (index === 0) {
                                // Match the first sentence ending with a Nepali full stop (।) or a regular period (.)
                                const match = paragraph.match(/^([^.।!?]*[.।!?]+)(.*)/);
                                if (match) {
                                    const firstChar = paragraph.charAt(0);
                                    const restOfFirstSentence = match[1].substring(1);
                                    const restOfParagraph = match[2];
                                    return (
                                        <p key={index} className="font-sans text-[#B0B8C8] text-sm md:text-[15px] leading-[1.8] mb-12">
                                            <span className="float-left text-6xl md:text-7xl font-display font-black text-[#C41E3A] mr-4 mt-2 leading-none select-none">
                                                {firstChar}
                                            </span>
                                            <span className="text-[18px] text-white/90">
                                                {restOfFirstSentence}
                                            </span>
                                            {restOfParagraph}
                                        </p>
                                    );
                                }
                                return (
                                    <p key={index} className="font-sans text-[#B0B8C8] text-sm md:text-[15px] leading-[1.8] mb-12">
                                        <span className="float-left text-6xl md:text-7xl font-display font-black text-[#C41E3A] mr-4 mt-2 leading-none select-none">
                                            {paragraph.charAt(0)}
                                        </span>
                                        <span className="text-[18px] text-white/90">
                                            {paragraph.substring(1)}
                                        </span>
                                    </p>
                                );
                            } else {
                                return (
                                    <p key={index} className="font-sans text-[#B0B8C8] text-sm md:text-[15px] leading-[1.8] mb-12">
                                        {paragraph}
                                    </p>
                                );
                            }
                        })
                    ) : (
                        <p className="font-sans text-[#B0B8C8] text-sm md:text-[15px] leading-[1.8] mb-12">
                            {player.originStory}
                        </p>
                    )}
                </div>

                {/* Quotes Section */}
                {player.quotes && player.quotes.length > 0 && (
                    <div className="mt-24 w-full">
                        {/* Featured Quote */}
                        {player.quotes.filter((q: any) => q.featured).map((quote: any, i: number) => (
                            <blockquote key={`feat-${i}`} className="w-full relative bg-[#0D1B2A] border-l-8 border-[#C41E3A] rounded-r-2xl p-10 md:p-14 lg:p-16 mb-16 shadow-[0_20px_40px_rgba(0,0,0,0.6)] group">
                                <span className="absolute -top-10 left-4 text-white font-display font-black text-[16rem] leading-none select-none opacity-[0.04]">
                                    "
                                </span>
                                <div className="relative z-10 w-full">
                                    <p className="font-display italic text-2xl md:text-3xl lg:text-4xl text-stadium-white leading-[1.25] mb-8">
                                        "{quote.quote}"
                                    </p>
                                    <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                                        <span className="font-sans font-bold italic text-[#C9A84C] text-[15px]">{quote.context}</span>
                                        <span className="font-sans text-[#B0B8C8]/60 text-xs md:text-sm">{quote.date}</span>
                                    </div>
                                </div>
                            </blockquote>
                        ))}

                        {/* Secondary Quotes (Literary Journal Grid) */}
                        {player.quotes.filter((q: any) => !q.featured).length > 0 && (
                            <div className="w-full relative px-4 md:px-0">
                                <div className="flex flex-col gap-12 md:gap-14 max-w-3xl mx-auto">
                                    {player.quotes.filter((q: any) => !q.featured).slice(0, 3).map((quote: any, i: number) => (
                                        <blockquote key={`sec-${i}`} className="border-l-2 border-[#C9A84C] pl-6 md:pl-10 flex flex-col transition-all duration-300">
                                            <p className="font-sans italic text-white/75 text-base md:text-lg leading-[1.8] mb-6">
                                                "{quote.quote}"
                                            </p>
                                            <span className="font-stats font-bold text-[#C9A84C] text-[10px] md:text-xs uppercase tracking-[0.2em]">
                                                {quote.context} {quote.date && `• ${quote.date}`}
                                            </span>
                                        </blockquote>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
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
                    <div className="lg:col-span-4 relative mt-12 lg:mt-0 pt-10 lg:pt-0 border-t border-[#C9A84C]/30 lg:border-t-0 w-full">
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
            {/* NEW: 2.6 Timeline of Resilience (Conditional) */}
            {player.timeline && player.timeline.length > 0 && (
                <section className="bg-[#07080F] py-24 border-t border-white/5 relative overflow-hidden">
                    {/* Decorative Background Text */}
                    <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-5 flex justify-center">
                        <span className="font-display font-black text-[20rem] leading-none text-stadium-white whitespace-nowrap">
                            संघर्ष
                        </span>
                    </div>

                    {/* Red scroll-line on the right edge */}
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-crimson-red to-[#07080F] opacity-80 z-20" />

                    <div className="max-w-5xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="font-mono font-bold text-3xl md:text-5xl text-stadium-white tracking-[0.3em] uppercase">
                                स्ट्रगलको <span className="text-[#C41E3A]">टाइमलाइन</span>
                            </h2>
                        </div>

                        <div className="relative">
                            {/* The Vertical Line (Red) */}
                            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(196,30,58,0.35)] transform md:-translate-x-1/2"></div>

                            <div className="flex flex-col gap-12 md:gap-16">
                                {player.timeline.map((event: any, index: number) => {
                                    const isLandmark = event.tier === 'landmark' || event.highlight;
                                    return (
                                        <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-4 md:gap-8 group`}>

                                            {/* Pulse Node (Gold for Landmark, Red otherwise) */}
                                            <div className={`absolute left-[20px] md:left-1/2 w-3 h-3 rounded-full transform -translate-x-[5px] md:-translate-x-[5px] mt-8 md:mt-0 z-10 ${isLandmark
                                                ? 'bg-[#C9A84C]'
                                                : 'bg-[#C41E3A]'
                                                }`}>
                                                <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${isLandmark ? 'bg-[#C9A84C]' : 'bg-[#C41E3A]'}`}></div>
                                            </div>

                                            {/* Empty spacer for alternating layout */}
                                            <div className="hidden md:block md:w-1/2"></div>

                                            {/* Content Card (Cinematic Dark Glassmorphism) */}
                                            <div className="pl-[52px] md:pl-0 w-full md:w-1/2">
                                                <div className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/[0.06] transition-colors duration-300 ease-in-out group-hover:border-[rgba(201,168,76,0.3)] relative overflow-hidden ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'} ${isLandmark ? 'border-l-4 border-[#C9A84C]' : 'border-l-4 border-[#C41E3A] md:border-l-0'}`}>

                                                    {/* Background Glow */}
                                                    {isLandmark && (
                                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#C9A84C]/20 transition-colors duration-500" />
                                                    )}

                                                    {/* Ghost year: absolute, sits behind text */}
                                                    <div className="absolute top-2 right-2 md:-top-4 md:-right-4 z-0 pointer-events-none select-none">
                                                        <span className="font-display font-black text-[4rem] md:text-[6rem] leading-none tracking-tighter text-stadium-white opacity-[0.06] transform scale-80 origin-top-right block">
                                                            {event.year}
                                                        </span>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <h3 className={`font-mono uppercase tracking-[0.3em] text-2xl md:text-3xl mb-4 leading-relaxed ${isLandmark ? 'text-[#C9A84C]' : 'text-stadium-white'}`}>
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
                                                            {event.content || event.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* NEW: 2.7 Signature Arsenal Grid */}
            {(player as any).signatureArsenal && (player as any).signatureArsenal.length > 0 && (
                <section className="bg-[#0D1B2A] py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
                            <span className="inline-block w-16 h-1 bg-[#C41E3A] mb-6" />
                            <h2 className="font-mono font-bold text-3xl md:text-5xl text-stadium-white tracking-[0.3em] uppercase">
                                प्रमुख <span className="text-[#C41E3A]">हतियार</span>
                            </h2>
                        </div>

                        <ArsenalCarouselClient arsenal={(player as any).signatureArsenal} />
                    </div>
                </section>
            )}

            {/* 3. Visual-Heavy Stats Center (Re-engineered with Tabs & Records) */}
            <PlayerStatsClient player={player} />

        </div>
    );
}
