"use client";

import { useEffect, useState } from "react";

export default function MatchPulse() {
    // Simulate live match state for Phase 1 requirements
    const isLiveMatch = true;
    const [isStale, setIsStale] = useState(false);

    useEffect(() => {
        // Mock timestamp check constraint: 
        // We set the lastUpdated time to 30 mins ago. If it were > 45, it would fall back.
        const lastUpdated = new Date(Date.now() - 30 * 60000); // 30 mins ago
        const now = new Date();
        const diffMinutes = (now.getTime() - lastUpdated.getTime()) / 60000;

        if (diffMinutes > 45) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsStale(true);
        }
    }, []);

    if (!isLiveMatch) return null;

    return (
        <section className="w-full bg-[#07080F] px-6 py-12 relative z-20">
            <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-4 mb-6">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C9A84C]"></span>
                    </span>
                    <h3 className="font-ui font-black text-[#C9A84C] uppercase tracking-widest text-sm drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                        म्याचको नब्ज
                    </h3>
                </div>

                {!isStale ? (
                    <p className="font-sans text-[#B0B8C8] text-lg leading-relaxed max-w-3xl">
                        नेपालले बलिङमा सानदार सुरुवात गर्दै युएईका टप अर्डरलाई ध्वस्त बनाएको छ। दीपेन्द्र सिंह ऐरीको स्पीन ट्रयापले ब्याट्सम्यानलाई खुल्न दिएको छैन, रन रेट निरन्तर दबाबमा छ।
                    </p>
                ) : (
                    <p className="font-sans font-bold text-stadium-white text-xl uppercase tracking-wider opacity-60">
                        Match in Progress...
                    </p>
                )}
            </div>
        </section>
    );
}
