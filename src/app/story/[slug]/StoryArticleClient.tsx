"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Section, stories } from "@/lib/storiesData";

export default function StoryArticleClient({ story }: { story: any }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Get recommended story (next in list or first if last)
    const currentIndex = stories.findIndex(s => s.slug === story.slug);
    const recoStory = stories[(currentIndex + 1) % stories.length];

    return (
        <div className="bg-[#07080F] min-h-screen text-[#B0B8C8] selection:bg-[#C41E3A] selection:text-white">
            {/* 1. The Parallax Hero */}
            <div className="relative h-[80vh] md:h-screen w-full overflow-hidden border-b border-white/5">
                <div
                    className="absolute inset-0 w-full h-full object-cover scale-110"
                    style={{
                        transform: `translateY(${scrollY * 0.4}px) scale(1.05)`,
                        transition: "transform 0.1s cubic-bezier(0,0,0.5,1)"
                    }}
                >
                    <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-[#07080F] via-[#07080F]/60 to-transparent z-10" />
                    <img
                        src={story.heroImage}
                        alt={story.title}
                        className="w-full h-full object-cover saturate-50"
                    />
                </div>

                {/* Hero Content (Anchored to bottom) */}
                <div className="absolute inset-0 flex flex-col justify-end px-6 pb-20 md:pb-32 z-20 max-w-5xl mx-auto w-full">
                    <span className="font-sans font-bold text-[#C9A84C] uppercase tracking-widest text-sm mb-6 block drop-shadow-md animate-[fadeUpIn_1s_ease-out_both]">
                        {story.category} • {story.date}
                    </span>
                    <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-stadium-white leading-[1.05] tracking-[-0.03em] drop-shadow-2xl animate-[fadeUpIn_1s_ease-out_0.2s_both] mb-8">
                        {story.title}
                    </h1>

                    <div className="flex flex-col gap-2 animate-[fadeUpIn_1s_ease-out_0.4s_both]">
                        <span className="font-sans font-medium text-stadium-white/80 text-xl md:text-2xl leading-relaxed max-w-2xl">
                            {story.subtitle}
                        </span>
                        <div className="h-[2px] w-12 bg-[#C41E3A] mt-4" />
                    </div>
                </div>
            </div>

            {/* 2. The Deep Read Container */}
            <article className="relative z-30 pt-16 pb-32">
                <div className="max-w-3xl mx-auto px-6">

                    {/* Navigation Back */}
                    <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
                        <Link href="/" className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-[#B0B8C8] hover:text-white transition-colors flex items-center gap-2">
                            <span className="w-6 h-[1px] bg-white/30" />
                            मुखपृष्ठमा फर्कनुस्
                        </Link>
                        <span className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">
                            {story.readTime} पढाइ
                        </span>
                    </div>

                    <div className="font-sans text-xl md:text-2xl text-[#B0B8C8] leading-loose space-y-12">

                        {/* Lede Section */}
                        <div className="font-display font-bold text-stadium-white text-2xl md:text-3xl border-l-2 border-[#C41E3A] pl-8 py-2 mb-16">
                            {story.lede}
                        </div>

                        {story.content.map((section: Section, idx: number) => {
                            switch (section.type) {
                                case 'paragraph':
                                    return (
                                        <p key={idx} className={idx === 0 ? "first-letter:font-display first-letter:text-7xl first-letter:text-[#C41E3A] first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest" : ""}>
                                            {section.text}
                                        </p>
                                    );
                                case 'pullquote':
                                    return (
                                        <blockquote key={idx} className="relative my-20 -mx-6 md:-mx-16 lg:-mx-24 pl-8 md:pl-12 py-8 border-l-4 border-[#C9A84C] bg-gradient-to-r from-white/[0.03] to-transparent">
                                            <span className="absolute top-0 left-6 font-display font-black text-[6rem] leading-none text-[#C9A84C]/20 select-none pointer-events-none -mt-8">
                                                "
                                            </span>
                                            <p className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-stadium-white leading-[1.2] tracking-[-0.02em] drop-shadow-lg relative z-10">
                                                {section.text}
                                            </p>
                                            {section.attribution && (
                                                <cite className="block mt-6 font-sans font-bold text-[#C9A84C] text-sm uppercase tracking-widest not-italic">
                                                    {section.attribution}
                                                </cite>
                                            )}
                                        </blockquote>
                                    );
                                case 'isolated':
                                    return (
                                        <div key={idx} className="flex justify-center my-16">
                                            <span className="font-display font-black text-4xl md:text-6xl text-stadium-white uppercase tracking-tighter text-center border-y border-white/10 py-6 px-12">
                                                {section.text}
                                            </span>
                                        </div>
                                    );
                                case 'imagebreak':
                                    return (
                                        <div key={idx} className="relative my-24 -mx-6 md:-mx-16 lg:-mx-24 aspect-[21/9] overflow-hidden rounded-sm border border-white/5">
                                            <img
                                                src={section.image}
                                                alt={section.caption || "Story Image"}
                                                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                                            />
                                            {section.caption && (
                                                <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10">
                                                    <span className="font-sans text-[10px] text-white/70 uppercase tracking-widest">{section.caption}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })}

                    </div>
                </div>
            </article>

            {/* Recommended Context */}
            {recoStory && (
                <div className="border-t border-white/5 bg-[#0D1B2A] py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#07080F] to-transparent opacity-50 pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-6 relative z-10">
                        <span className="font-ui font-black text-[#C9A84C] uppercase tracking-widest text-sm drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] mb-8 block text-center">
                            अर्को कथा
                        </span>
                        <Link href={`/story/${recoStory.slug}`} className="block bg-white/5 border border-white/10 backdrop-blur-md rounded-sm p-8 group cursor-pointer hover:bg-white/10 transition-colors">
                            <span className="font-sans font-bold text-[#C41E3A] text-[10px] uppercase tracking-[0.15em] mb-4 block">{recoStory.category}</span>
                            <h4 className="font-display font-black text-3xl text-stadium-white leading-tight group-hover:text-[#C9A84C] transition-colors mb-2">
                                {recoStory.title}
                            </h4>
                            <span className="font-sans font-semibold text-[#B0B8C8] text-sm uppercase tracking-wider">{recoStory.readTime}को पढाइ</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
