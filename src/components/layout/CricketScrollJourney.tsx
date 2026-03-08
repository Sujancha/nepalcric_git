"use client";

import { useEffect, useState, useRef } from "react";

export default function CricketScrollJourney() {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState(1000); // Default placeholder
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateHeight = () => {
            if (containerRef.current) {
                setSvgHeight(containerRef.current.clientHeight);
            }
        };

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            // If the page isn't scrollable, do nothing
            if (documentHeight <= windowHeight) {
                setScrollPercentage(0);
                return;
            }

            let scrolled = (scrollTop / (documentHeight - windowHeight));
            scrolled = Math.max(0, Math.min(1, scrolled)); // Clamp exactly between 0 and 1
            setScrollPercentage(scrolled);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", () => {
            updateHeight();
            handleScroll();
        }, { passive: true });

        // Wait for DOM layout settling, then calculate the dynamic path height
        setTimeout(() => {
            updateHeight();
            handleScroll();
        }, 100);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    // SSR Guard to prevent hydration mismatches
    if (!isMounted) return null;

    const ch = Math.max(svgHeight, 100); // Container Height
    const startY = 20;
    const endY = ch - 30;
    const w = 48; // Explicit width of container
    const centerX = w / 2; // Center anchor point (24)

    return (
        <div
            ref={containerRef}
            className="fixed top-0 right-2 md:right-8 w-12 h-screen pointer-events-none z-50 py-24 hidden lg:block"
            aria-hidden="true"
        >
            <svg
                className="absolute inset-0 w-full h-full overflow-visible"
            >
                {/* Background pitch line/dim connector */}
                {/* Swings out to X=48, giving an impressive "inswing" delivery path */}
                <path
                    d={`M ${centerX} ${startY} Q ${w} ${ch * 0.5} ${centerX} ${endY}`}
                    fill="none"
                    stroke="currentColor"
                    className="text-slate-dark/10"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />

                {/* Drawn Journey Line - The Ball's Track */}
                <path
                    d={`M ${centerX} ${startY} Q ${w} ${ch * 0.5} ${centerX} ${endY}`}
                    fill="none"
                    stroke="#D32F2F" // crimson-red
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset={100 - (scrollPercentage * 100)}
                    className="drop-shadow-[0_0_8px_rgba(211,47,47,0.7)] transition-all duration-75 ease-out"
                />
            </svg>

            {/* Top Anchor: Bowler's Crease */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-dark/20 rounded-full shadow-sm`}
                style={{ top: `${startY}px` }}
            ></div>

            {/* The moving ball */}
            {(() => {
                const t = scrollPercentage;
                // Bezier X calculation aligning with the Q curve path: X(t) = (1-t)^2*P0 + 2(1-t)t*P1 + t^2*P2
                // Where P0=24, P1=48, P2=24.
                // Formula distills exactly to: xOffset = 48 * t * (1 - t);
                const xOffset = 48 * t * (1 - t);
                return (
                    <div
                        className="absolute w-6 h-6 shadow-[0_4px_10px_rgba(0,0,0,0.5)] rounded-full z-10"
                        style={{
                            left: `calc(50% + ${xOffset}px)`,
                            top: `calc(${startY}px + ${scrollPercentage} * (${endY - startY}px))`,
                            transform: `translate(-50%, -50%) rotate(${scrollPercentage * 1440}deg)`,
                            transition: "none"
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" fill="#D32F2F" />
                            <circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.4" />
                            {/* Seamless Seam */}
                            <path d="M8 4.5A9.5 9.5 0 0 0 8 19.5" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.9" strokeLinecap="round" />
                            <path d="M16 4.5A9.5 9.5 0 0 1 16 19.5" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.9" strokeLinecap="round" />
                        </svg>
                    </div>
                );
            })()}

            {/* Bottom Anchor: Stumps */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-end justify-center gap-[3px]" style={{ top: `${endY}px` }}>
                <div className="w-[3px] h-8 bg-slate-dark/30 rounded-t-sm"></div>
                <div className="w-[3px] h-8 bg-slate-dark/30 rounded-t-sm"></div>
                <div className="w-[3px] h-8 bg-slate-dark/30 rounded-t-sm"></div>
                {/* Bails */}
                <div className="absolute top-[0px] flex gap-[1px] translate-y-[-2px] -ml-[0.5px]">
                    <div className="w-2.5 h-[3px] bg-slate-dark/50 rounded-full"></div>
                    <div className="w-2.5 h-[3px] bg-slate-dark/50 rounded-full"></div>
                </div>
                {/* Visual impact effect when ball reaches stumps */}
                <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-crimson-red blur-xl transition-all duration-300 pointer-events-none ${scrollPercentage >= 0.99 ? 'opacity-80 scale-150' : 'opacity-0 scale-50'
                        }`}
                />
            </div>

        </div>
    );
}
