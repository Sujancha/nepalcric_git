"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllStories, StoryFrontmatter } from "@/lib/getStories";

export default function StoryArticleClient({ story, htmlContent }: { story: StoryFrontmatter, htmlContent: string }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const stories = getAllStories();
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
                    <Image
                        src={story.heroImage}
                        alt={story.title}
                        fill
                        className="object-cover saturate-50"
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

                        <div 
                            className="story-content" 
                            dangerouslySetInnerHTML={{ __html: htmlContent }} 
                        />
                    </div>
                </div>
            </article>

            <style jsx global>{`
                /* Story HTML Content Styling */
                .story-content p {
                    margin-bottom: 2rem;
                }
                .story-content p:first-of-type {
                    font-family: var(--font-display), sans-serif;
                    font-size: 1.5rem;
                }
                .story-content p:first-of-type::first-letter {
                    font-family: var(--font-display), sans-serif;
                    font-size: 4.5rem;
                    color: #C41E3A;
                    margin-right: 0.75rem;
                    float: left;
                    line-height: 1;
                }
                
                .story-content h3 {
                    display: flex;
                    justify-content: center;
                    margin: 4rem 0;
                    font-family: var(--font-display), sans-serif;
                    font-weight: 900;
                    font-size: 2.25rem;
                    color: #E8E8E8;
                    text-transform: uppercase;
                    letter-spacing: -0.05em;
                    text-align: center;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding: 1.5rem 3rem;
                }
                
                @media (min-width: 768px) {
                    .story-content h3 {
                        font-size: 3.75rem;
                    }
                }
                
                .story-content img {
                    width: 100%;
                    height: auto;
                    margin: 4rem 0;
                    border-radius: 0.125rem;
                    border: 1px solid rgba(255,255,255,0.05);
                    filter: grayscale(30%);
                    transition: filter 0.7s;
                }
                
                .story-content img:hover {
                    filter: grayscale(0%);
                }
                
                .story-content .custom-pull-quote {
                    position: relative;
                    margin: 5rem -1.5rem;
                    padding: 2rem 2rem 2rem 2rem;
                    border-left: 4px solid #C9A84C;
                    background: linear-gradient(to right, rgba(255,255,255,0.03), transparent);
                }
                
                @media (min-width: 768px) {
                    .story-content .custom-pull-quote {
                        margin: 5rem -4rem;
                        padding-left: 3rem;
                    }
                }
                
                @media (min-width: 1024px) {
                    .story-content .custom-pull-quote {
                        margin: 5rem -6rem;
                    }
                }
                
                .story-content .custom-pull-quote::before {
                    content: "“";
                    position: absolute;
                    top: 0;
                    left: 1.5rem;
                    font-family: var(--font-display), sans-serif;
                    font-weight: 900;
                    font-size: 6rem;
                    line-height: 1;
                    color: rgba(201,168,76,0.2);
                    user-select: none;
                    pointer-events: none;
                    margin-top: -2rem;
                }
                
                .story-content .custom-pull-quote p:first-child {
                    font-family: var(--font-display), sans-serif;
                    font-weight: 900;
                    font-size: 1.875rem;
                    color: #E8E8E8;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                    margin-bottom: 0;
                    position: relative;
                    z-index: 10;
                }
                
                @media (min-width: 768px) {
                    .story-content .custom-pull-quote p:first-child {
                        font-size: 2.25rem;
                    }
                }
                
                @media (min-width: 1024px) {
                    .story-content .custom-pull-quote p:first-child {
                        font-size: 3rem;
                    }
                }
                
                .story-content .custom-pull-quote p:last-child {
                    display: block;
                    margin-top: 1.5rem;
                    font-family: var(--font-sans), sans-serif;
                    font-weight: 700;
                    color: #C9A84C;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0;
                }
            `}</style>

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
