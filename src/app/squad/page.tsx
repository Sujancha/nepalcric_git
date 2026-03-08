"use client";

import { useEffect, useState } from "react";
import SquadRoster from "@/components/squad/SquadRoster";

export default function SquadPage() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#07080F]">
            {/* Cinematic Parallax Hero */}
            <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden border-b border-white/5">
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        transform: `translateY(${scrollY * 0.4}px)`,
                        transition: "transform 0.1s cubic-bezier(0,0,0.5,1)"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/50 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Squad Atmosphere"
                        className="w-full h-full object-cover saturate-50 opacity-60"
                    />
                </div>

                {/* Hero Content anchored to bottom */}
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 z-20 flex flex-col items-center justify-end text-center">
                    <span className="font-sans font-bold text-[#C9A84C] uppercase tracking-[0.2em] text-sm mb-4 block drop-shadow-md animate-[fadeUpIn_1s_ease-out_both]">
                        द स्क्वाड
                    </span>
                    <h1 className="font-sans font-extrabold text-6xl md:text-8xl lg:text-9xl text-stadium-white leading-none tracking-[-0.04em] drop-shadow-2xl animate-[fadeUpIn_1s_ease-out_0.2s_both]">
                        हाम्रा <span className="text-[#C41E3A]">योद्धाहरू</span>
                    </h1>
                </div>
            </div>

            {/* Injected Player Roster Component */}
            <div className="relative z-30">
                <SquadRoster />
            </div>
        </div>
    );
}
