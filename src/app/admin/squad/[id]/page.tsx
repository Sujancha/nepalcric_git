import { notFound } from "next/navigation";
import Image from "next/image";
import CinematicHeroClient from "@/components/squad/CinematicHeroClient";
import playersData from "@/lib/playerData.json";
import PlayerChatbot from '@/components/squad/PlayerChatbot';
import PlayerStatsClient from "@/components/squad/PlayerStatsClient";
import ArsenalCarouselClient from "@/components/squad/ArsenalCarouselClient";
import { getPlayerMarkdown, PlayerMdData } from "@/lib/getPlayerMarkdown";
import PlayerEditFAB from "@/components/admin/PlayerEditFAB";

export default async function AdminPlayerProfile({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const player = playersData.find((p) => p.id === id);
    if (!player) {
        notFound();
    }

    const mdData: PlayerMdData | null = getPlayerMarkdown(id);

    if (!mdData) {
        return (
            <div className="w-full bg-[#07080F] min-h-screen flex items-center justify-center px-6">
                <div className="max-w-lg text-center border border-[#C41E3A]/40 bg-[#0D1B2A] rounded-2xl p-12">
                    <span className="font-display text-[#C41E3A] text-6xl block mb-6">404</span>
                    <h1 className="font-display text-stadium-white text-3xl tracking-widest uppercase mb-4">
                        MD File Not Found
                    </h1>
                    <p className="font-sans text-[#B0B8C8] text-sm leading-relaxed mb-6">
                        No markdown file found at{" "}
                        <code className="text-[#C9A84C] font-mono text-xs">
                            content/players/{id}.md
                        </code>
                    </p>
                    <p className="font-mono text-[#B0B8C8]/40 text-xs uppercase tracking-widest">
                        Player ID: {id}
                    </p>
                </div>
                <PlayerEditFAB id={id} nameEn={player.name} />
            </div>
        );
    }

    const loreParagraphs: string[] = mdData.lore_ne
        ? mdData.lore_ne.split('\n').filter(line => line.trim() !== '')
        : [];

    const placeholderPattern = /\/images\/players\/[^/]+\/[1-5]\.webp$/;
    const inlineImages: string[] = (mdData.images ?? []).filter(
        (src) => src && !placeholderPattern.test(src)
    );

    const imageCount = inlineImages.length;
    const interval = imageCount > 0 ? Math.max(4, Math.floor(loreParagraphs.length / (imageCount + 1))) : 0;

    type LoreItem =
        | { kind: 'paragraph'; text: string; index: number }
        | { kind: 'image'; src: string; imageIndex: number };

    const loreContent: LoreItem[] = [];
    let imgIdx = 0;
    loreParagraphs.forEach((line, i) => {
        loreContent.push({ kind: 'paragraph', text: line, index: i });
        if (interval > 0 && (i + 1) % interval === 0 && imgIdx < imageCount) {
            loreContent.push({ kind: 'image', src: inlineImages[imgIdx], imageIndex: imgIdx });
            imgIdx++;
        }
    });

    return (
        <div className="w-full bg-[#07080F] min-h-screen">

            <CinematicHeroClient player={player} mdData={mdData} />

            {mdData.hero_quote && (
                <section className="py-24 max-w-5xl mx-auto px-6 relative z-10 w-full overflow-hidden">
                    <div className="flex items-center gap-4 mb-16 opacity-70">
                        <span className="h-px flex-1 bg-[#B0B8C8]/20" />
                        <h2 className="font-mono font-bold text-[#C9A84C] uppercase tracking-[0.3em] text-sm md:text-base">
                            उद्धरण
                        </h2>
                        <span className="h-px flex-1 bg-[#B0B8C8]/20" />
                    </div>

                    <blockquote className="w-full relative bg-[#0D1B2A] border-l-8 border-[#C41E3A] rounded-r-2xl p-10 md:p-14 lg:p-16 shadow-[0_20px_40px_rgba(0,0,0,0.6)] group">
                        <span className="absolute -top-10 left-4 text-white font-display font-black text-[16rem] leading-none select-none opacity-[0.04]">
                            &ldquo;
                        </span>
                        <div className="relative z-10 w-full">
                            <p
                                className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl text-stadium-white leading-[1.35] mb-8"
                                lang="ne"
                            >
                                &ldquo;{mdData.hero_quote}&rdquo;
                            </p>
                            <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
                                <span className="font-stats font-bold italic text-[#C9A84C] text-[15px]" lang="ne">
                                    — {mdData.name_ne}
                                </span>
                            </div>
                        </div>
                    </blockquote>
                </section>
            )}

            <section className="bg-[#0D1B2A] py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 flex flex-col">
                        <div className="flex items-center gap-4 mb-16 opacity-70">
                            <span className="h-px flex-1 bg-[#B0B8C8]/20" />
                            <h2 className="font-mono font-bold text-[#C9A84C] uppercase tracking-[0.3em] text-sm md:text-base">
                                पूर्ण कथा
                            </h2>
                            <span className="h-px flex-1 bg-[#B0B8C8]/20" />
                        </div>

                        {loreContent.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                {loreContent.map((item, i) => {
                                    if (item.kind === 'image') {
                                        return (
                                            <div
                                                key={`img-${item.imageIndex}`}
                                                className="relative w-full my-10 overflow-hidden group"
                                                style={{ aspectRatio: '16/9' }}
                                            >
                                                <Image
                                                    src={item.src}
                                                    alt={`${mdData.name_ne ?? ''} — ${item.imageIndex + 1}`}
                                                    fill
                                                    className="object-cover grayscale-[70%] group-hover:grayscale-0 transition-all duration-700 ease-out"
                                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/60 via-transparent to-transparent pointer-events-none" />
                                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C41E3A]/40 group-hover:bg-[#C41E3A]/80 transition-colors duration-500" />
                                            </div>
                                        );
                                    }

                                    const trimmed = item.text.trim();

                                    if (trimmed.startsWith('"') || trimmed.startsWith('“')) {
                                        return (
                                            <blockquote key={i} className="relative border-l-4 border-[#C9A84C] pl-8 py-5 my-2 bg-gradient-to-r from-[#C9A84C]/8 to-transparent">
                                                <span className="absolute top-2 left-2 text-5xl text-[#C9A84C]/20 font-serif leading-none select-none" aria-hidden="true">&ldquo;</span>
                                                <p className="font-sans italic text-[#E8E8E8] text-base md:text-[17px] leading-[1.9] tracking-wide" lang="ne">
                                                    {trimmed}
                                                </p>
                                            </blockquote>
                                        );
                                    }

                                    if (trimmed.startsWith('—')) {
                                        return (
                                            <p key={i} className="font-sans italic text-[#C9A84C] text-sm pl-8 -mt-3" lang="ne">
                                                {trimmed}
                                            </p>
                                        );
                                    }

                                    if (!trimmed.endsWith('।')) {
                                        return (
                                            <div key={i} className="mt-16 pt-8 border-t border-white/5">
                                                <h3 className="font-sans font-black text-[#C41E3A] text-2xl md:text-3xl leading-snug tracking-tight" lang="ne">
                                                    {trimmed}
                                                </h3>
                                            </div>
                                        );
                                    }

                                    if (trimmed.length < 30) {
                                        return (
                                            <p key={i} className="font-sans font-black text-white text-2xl md:text-3xl tracking-tight mt-8 mb-4" lang="ne">
                                                {trimmed}
                                            </p>
                                        );
                                    }

                                    return (
                                        <p key={i} className="font-sans text-[#B0B8C8] text-sm md:text-[15px] leading-[1.85]" lang="ne">
                                            {trimmed}
                                        </p>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="font-sans text-[#B0B8C8]/40 text-sm italic">
                                lore_ne field is empty in the markdown file.
                            </p>
                        )}
                    </div>

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

            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(player as any).timeline && (player as any).timeline.length > 0 && (
                <section className="bg-[#07080F] py-24 border-t border-white/5 relative overflow-hidden">
                    <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none opacity-5 flex justify-center">
                        <span className="font-display font-black text-[20rem] leading-none text-stadium-white whitespace-nowrap">
                            संघर्ष
                        </span>
                    </div>
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-crimson-red to-[#07080F] opacity-80 z-20" />

                    <div className="max-w-5xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="font-mono font-bold text-3xl md:text-5xl text-stadium-white tracking-[0.3em] uppercase">
                                स्ट्रगलको <span className="text-[#C41E3A]">टाइमलाइन</span>
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(196,30,58,0.35)] transform md:-translate-x-1/2"></div>
                            <div className="flex flex-col gap-12 md:gap-16">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {(player as any).timeline?.map((event: { tier?: string; highlight?: boolean; year: string; title: string; quote?: string; content?: string; description?: string }, index: number) => {
                                    const isLandmark = event.tier === 'landmark' || event.highlight;
                                    return (
                                        <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-4 md:gap-8 group`}>
                                            <div className={`absolute left-[20px] md:left-1/2 w-3 h-3 rounded-full transform -translate-x-[5px] md:-translate-x-[5px] mt-8 md:mt-0 z-10 ${isLandmark ? 'bg-[#C9A84C]' : 'bg-[#C41E3A]'}`}>
                                                <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${isLandmark ? 'bg-[#C9A84C]' : 'bg-[#C41E3A]'}`}></div>
                                            </div>
                                            <div className="hidden md:block md:w-1/2"></div>
                                            <div className="pl-[52px] md:pl-0 w-full md:w-1/2">
                                                <div className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/[0.06] transition-colors duration-300 ease-in-out group-hover:border-[rgba(201,168,76,0.3)] relative overflow-hidden ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'} ${isLandmark ? 'border-l-4 border-[#C9A84C]' : 'border-l-4 border-[#C41E3A] md:border-l-0'}`}>
                                                    {isLandmark && (
                                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#C9A84C]/20 transition-colors duration-500" />
                                                    )}
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
                                                                <p className="font-sans text-[#B0B8C8] italic text-lg leading-relaxed">
                                                                    &ldquo;{event.quote}&rdquo;
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

            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(player as any).signatureArsenal && (player as any).signatureArsenal.length > 0 && (
                <section className="bg-[#0D1B2A] py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
                            <span className="inline-block w-16 h-1 bg-[#C41E3A] mb-6" />
                            <h2 className="font-mono font-bold text-3xl md:text-5xl text-stadium-white tracking-[0.3em] uppercase">
                                प्रमुख <span className="text-[#C41E3A]">हतियार</span>
                            </h2>
                        </div>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <ArsenalCarouselClient arsenal={(player as any).signatureArsenal} />
                    </div>
                </section>
            )}

            <PlayerStatsClient player={player} />

            {/* Floating edit button */}
            <PlayerEditFAB id={id} nameEn={player.name} />
        </div>
    );
}
