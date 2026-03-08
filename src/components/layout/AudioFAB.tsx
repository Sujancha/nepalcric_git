"use client";

import { useState } from "react";

export default function AudioFAB() {
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    return (
        <div className="fixed bottom-24 md:bottom-8 right-6 z-50">
            <div className="relative group">
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${isPlayingAudio ? 'bg-crimson-red opacity-60 scale-150 animate-pulse' : 'bg-rhino-blue opacity-30 scale-100 group-hover:opacity-100 group-hover:bg-crimson-red'}`} />

                {/* Main Floating Button */}
                <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className={`relative flex items-center gap-3 h-14 rounded-full px-4 pr-5 shadow-2xl transition-all duration-300 border backdrop-blur-md overflow-hidden ${isPlayingAudio
                        ? 'bg-crimson-red border-crimson-red/50 text-stadium-white translate-y-[-4px]'
                        : 'bg-slate-dark/80 border-stadium-white/10 text-stadium-white/80 hover:border-stadium-white/30 hover:bg-slate-dark hover:text-stadium-white'
                        }`}
                >
                    {isPlayingAudio ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[pulse_1s_ease-in-out_infinite]"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" x2="17" y1="9" y2="15" /><line x1="17" x2="23" y1="9" y2="15" /></svg>
                    )}

                    <div className="flex flex-col items-start justify-center">
                        <span className="font-ui text-[10px] font-bold uppercase tracking-widest leading-none text-stadium-white/60">
                            {isPlayingAudio ? "Now Playing" : "Ambient"}
                        </span>
                        <span className="font-display text-[16px] tracking-wide leading-none mt-1">
                            TU Stadium
                        </span>
                    </div>

                    {/* Equalizer animation when playing */}
                    {isPlayingAudio && (
                        <div className="absolute right-0 bottom-0 h-10 w-10 flex items-center justify-center gap-[2px] opacity-20 pointer-events-none">
                            <div className="w-1 h-3 bg-stadium-white animate-[bounce_1s_ease-in-out_infinite]" />
                            <div className="w-1 h-5 bg-stadium-white animate-[bounce_1.2s_ease-in-out_infinite]" />
                            <div className="w-1 h-4 bg-stadium-white animate-[bounce_0.8s_ease-in-out_infinite]" />
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
