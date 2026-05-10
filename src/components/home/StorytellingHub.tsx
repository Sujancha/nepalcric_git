"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function StorytellingHub() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const openVideo = (videoId: string) => {
        setActiveVideo(videoId);
        // Small delay to ensure display: block is applied before animation toggles
        requestAnimationFrame(() => setIsAnimating(true));
    };

    const closeVideo = useCallback(() => {
        setIsAnimating(false);
        // Wait for 400ms exit animation to complete before destroying instance
        setTimeout(() => setActiveVideo(null), 400);
    }, []);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeVideo();
        };
        if (activeVideo) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeVideo, closeVideo]);

    const stories = [
        {
            type: "विश्वकप",
            title: "एक रन: डलासको त्यो रात जब नेपालले विश्वलाई रुवायो",
            date: "जुन १५, २०२४",
            span: "md:col-span-2 md:row-span-2",
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            slug: "nepal-vs-south-africa-one-run",
            isPlayable: false
        },
        {
            type: "म्याच कथा",
            title: "मायाको दिन, करणको जादु",
            date: "फेब्रुअरी १४, २०२३",
            span: "md:col-span-1 md:row-span-1",
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            slug: "karan-kc-valentines-day-miracle",
            isPlayable: false,
        },
        {
            type: "न्युज",
            title: "नेपाली फ्यानको सागर: सेन्ट भिन्सेन्टमा 'होम अवे फ्रम होम'",
            date: "१ हप्ता अघि",
            span: "md:col-span-1 md:row-span-1",
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            isPlayable: false,
        },
        {
            type: "ट्रेनिङ",
            title: "सोमपाल र करण: एक दशकको अटूट युद्ध",
            date: "२ हप्ता अघि",
            span: "md:col-span-2 md:row-span-1",
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            isPlayable: true,
            videoId: "video-2"
        }
    ];

    return (
        <section id="stories" className="py-24 bg-[#07080F] border-b border-t border-white/5 mt-1 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                    <div>
                        <h2 className="font-display uppercase text-5xl md:text-6xl text-stadium-white animate-[fadeUpIn_1s_ease-out_both]">
                            लकर रुमका <span className="text-[#C41E3A] drop-shadow-[0_0_15px_rgba(196,30,58,0.5)]">कथाहरू</span>
                        </h2>
                        <p className="font-sans text-[#B0B8C8] mt-4 text-lg animate-[fadeUpIn_1s_ease-out_0.2s_both]">मैदानमा भएका ती क्षणहरू — जुन स्कोरबोर्डमा देखिँदैनन्, तर सधैं बस्छन्।</p>
                    </div>
                </div>

                {/* CSS Grid Masonry-style layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] animate-[fadeUpIn_1s_ease-out_0.6s_both]">
                    {stories.map((story, i) => {
                        const CardContent = (
                            <>
                                {/* Image/Thumbnail Placeholder */}
                                <div className={`relative w-full ${story.span.includes("row-span-2") ? "h-2/3" : "h-48"} border-b border-white/5 group-hover:border-[#C41E3A] transition-colors overflow-hidden`}>

                                    {/* Real Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        style={{ backgroundImage: `url(${story.image})` }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-[#C41E3A]/20 transition-colors z-10" />

                                    {story.isPlayable && (
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <div className="w-14 h-14 border-2 border-white/70 text-stadium-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:bg-[#C41E3A] group-hover:border-[#C41E3A] group-hover:shadow-[0_0_25px_#C41E3A] transition-all duration-500 backdrop-blur-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tag */}
                                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-[#C9A84C] font-sans font-bold text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-sm border border-white/10 z-30">
                                        {story.type}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col justify-between flex-grow bg-gradient-to-b from-[#0D1B2A] to-black/40">
                                    <h3 className="font-display uppercase text-xl md:text-2xl text-stadium-white leading-tight group-hover:text-[#C9A84C] transition-colors drop-shadow-md">
                                        {story.title}
                                    </h3>
                                    <span className="font-sans text-[#B0B8C8]/60 text-xs font-bold uppercase tracking-widest mt-4">
                                        {story.date}
                                    </span>
                                </div>
                            </>
                        );

                        if (story.isPlayable) {
                            return (
                                <div
                                    key={i}
                                    className={`group relative rounded-sm overflow-hidden border border-white/5 bg-[#0D1B2A] flex flex-col transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer ${story.span}`}
                                    onClick={() => story.videoId && openVideo(story.videoId)}
                                >
                                    {CardContent}
                                </div>
                            );
                        }

                        if (story.slug) {
                            return (
                                <Link
                                    key={i}
                                    href={`/story/${story.slug}`}
                                    className={`group relative rounded-sm overflow-hidden border border-white/5 bg-[#0D1B2A] flex flex-col transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer ${story.span}`}
                                >
                                    {CardContent}
                                </Link>
                            );
                        }

                        return (
                            <div
                                key={i}
                                className={`group relative rounded-sm overflow-hidden border border-white/5 bg-[#0D1B2A] flex flex-col transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${story.span}`}
                            >
                                {CardContent}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Cinematic Lightbox Modal */}
            {activeVideo && (
                <div
                    className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-[#07080F]/95 transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                    onClick={closeVideo}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeVideo}
                        className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white hover:text-[#C41E3A] transition-colors z-[110]"
                        aria-label="Close video"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>

                    {/* Desktop Video Container */}
                    <div
                        className={`w-full max-w-5xl aspect-video bg-black shadow-[0_0_40px_rgba(196,30,58,0.15)] relative overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${isAnimating ? 'scale-100' : 'scale-95'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Placeholder for YouTube Embed */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-ui font-black text-white/20 uppercase tracking-[0.2em] text-2xl">
                                Cinematic Playback ({activeVideo})
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
