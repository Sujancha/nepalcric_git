'use client'

import { useState, useRef } from 'react';

interface ArsenalMove {
    title: string;
    description: string;
}

export default function ArsenalCarouselClient({ arsenal }: { arsenal: ArsenalMove[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const cardWidth = scrollContainerRef.current.clientWidth * 0.85; // rough estimate based on 85vw
            const newIndex = Math.round(scrollLeft / cardWidth);
            setActiveIndex(Math.min(newIndex, arsenal.length - 1));
        }
    };

    return (
        <div className="relative">
            {/* Horizontal Scroll Container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-8 pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
                {arsenal.map((move, index) => (
                    <div
                        key={index}
                        className="flex-none w-[85vw] md:w-auto md:min-w-[340px] snap-center bg-[#07080F] border border-white/5 backdrop-blur-md rounded-none p-8 md:p-10 flex flex-col relative overflow-hidden group transition-all duration-500 hover:border-[#C9A84C]/30"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C41E3A] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" />

                        {/* Subtle left-border accent */}
                        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                        <div className="relative z-10 flex-1">
                            <h3 className="font-display uppercase text-2xl md:text-3xl text-stadium-white mb-3 leading-tight group-hover:text-[#C9A84C] transition-colors duration-300">
                                {move.title}
                            </h3>
                            <div className="h-[1px] w-8 bg-[#C41E3A] mb-6 transition-all duration-500 group-hover:w-16" />
                            <p className="font-sans text-white/70 leading-[1.8] text-sm md:text-base">
                                {move.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Carousel Dots */}
            {arsenal.length > 1 && (
                <div className="flex md:hidden justify-center items-center gap-2 mt-2">
                    {arsenal.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-[#C41E3A]' : 'w-1.5 bg-white/20'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
