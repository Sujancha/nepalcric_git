"use client";

import { useState, useEffect } from "react";

export default function StorytellingHub() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeVideo();
        };
        if (activeVideo) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeVideo]);

    const openVideo = (videoId: string) => {
        setActiveVideo(videoId);
        // Small delay to ensure display: block is applied before animation toggles
        requestAnimationFrame(() => setIsAnimating(true));
    };

    const closeVideo = () => {
        setIsAnimating(false);
        // Wait for 400ms exit animation to complete before destroying instance
        setTimeout(() => setActiveVideo(null), 400);
    };
    const stories = [
        {
            type: "म्याच हाइलाइट्स",
            title: "युएईविरुद्धको त्यो सास रोक्ने अन्तिम ओभर",
            date: "२ दिन अघि",
            span: "md:col-span-2 md:row-span-2",
            image: "bg-slate-dark", // Placeholder for actual image
            isPlayable: true,
            videoId: "video-1"
        },
        {
            type: "पर्दा पछाडि",
            title: "लकर रुमभित्र: म्याच अघिको माहोल",
            date: "५ दिन अघि",
            span: "md:col-span-1 md:row-span-1",
            image: "bg-[#0D1B2A]",
            isPlayable: false,
        },
        {
            type: "न्युज",
            title: "विश्वकप छनोटका लागि स्क्वाड घोषणा",
            date: "१ हप्ता अघि",
            span: "md:col-span-1 md:row-span-1",
            image: "bg-slate-dark/80",
            isPlayable: false,
        },
        {
            type: "ट्रेनिङ",
            title: "सन्दीपको स्पिन मास्टरक्लास",
            date: "२ हप्ता अघि",
            span: "md:col-span-2 md:row-span-1",
            image: "bg-rhino-blue",
            isPlayable: true,
            videoId: "video-2"
        }
    ];

    return (
        <section className="py-24 bg-[#07080F] border-b border-t border-white/5 mt-1">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                    <div>
                        <h2 className="font-display uppercase text-5xl md:text-6xl text-stadium-white animate-[fadeUpIn_1s_ease-out_both]">
                            लकर रुमका <span className="text-[#C41E3A] drop-shadow-[0_0_15px_rgba(196,30,58,0.5)]">कथाहरू</span>
                        </h2>
                        <p className="font-sans text-[#B0B8C8] mt-4 text-lg animate-[fadeUpIn_1s_ease-out_0.2s_both]">ताजा खबर, हाइलाइट्स, र पर्दा पछाडिका विशेष झलकहरू।</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 font-sans font-bold text-sm tracking-widest uppercase text-[#B0B8C8] hover:text-[#C9A84C] transition-colors pb-1 border-b-[1px] border-white/20 hover:border-[#C9A84C] animate-[fadeUpIn_1s_ease-out_0.4s_both]">
                        सबै भिडियोहरू हेर्नुस्
                    </button>
                </div>

                {/* CSS Grid Masonry-style layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] animate-[fadeUpIn_1s_ease-out_0.6s_both]">
                    {stories.map((story, i) => (
                        <div
                            key={i}
                            className={`group relative rounded-sm overflow-hidden border border-white/5 bg-[#0D1B2A] flex flex-col transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${story.span} ${story.isPlayable ? 'cursor-pointer' : 'cursor-default'}`}
                            onClick={() => story.isPlayable && story.videoId && openVideo(story.videoId)}
                        >
                            {/* Image/Thumbnail Placeholder */}
                            <div className={`relative w-full ${story.span.includes("row-span-2") ? "h-2/3" : "h-48"} ${story.image} border-b border-white/5 group-hover:border-[#C41E3A] transition-colors overflow-hidden`}>

                                {/* Background Zoom Effect */}
                                <div className="absolute inset-0 bg-black/20 group-hover:scale-105 transition-transform duration-700" />

                                {story.isPlayable && (
                                    <>
                                        {/* Cinematic Red Gradient on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#C41E3A]/80 via-[#C41E3A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-colors z-20">
                                            {/* Minimal Outline Play Button */}
                                            <div className="w-14 h-14 border-2 border-white/70 text-stadium-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:bg-[#C41E3A] group-hover:border-[#C41E3A] group-hover:shadow-[0_0_25px_#C41E3A] transition-all duration-500 backdrop-blur-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                                            </div>
                                        </div>
                                    </>
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
                        </div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <button className="w-full mt-8 md:hidden py-4 border border-[#C9A84C]/50 text-stadium-white rounded bg-transparent font-sans font-bold uppercase tracking-widest text-sm hover:bg-[#C9A84C] hover:text-[#07080F] transition-all duration-300">
                    सबै भिडियोहरू हेर्नुस्
                </button>
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
