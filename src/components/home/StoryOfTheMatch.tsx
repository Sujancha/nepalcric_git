"use client";

import { useState } from "react";
import Link from "next/link";

export default function StoryOfTheMatch() {
    const [hypeLevel, setHypeLevel] = useState(0);
    const [flags, setFlags] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    const handleHype = () => {
        setHypeLevel(prev => prev + 1);

        // Create a new flag with a random offset for the animation
        const newFlagId = Date.now();
        const randomXOffset = Math.floor(Math.random() * 40) - 20; // -20px to 20px
        const randomRotate = Math.floor(Math.random() * 30) - 15; // -15deg to 15deg

        setFlags(prev => [...prev, {
            id: newFlagId,
            style: {
                '--x-offset': `${randomXOffset}px`,
                '--rotate': `${randomRotate}deg`
            } as React.CSSProperties
        }]);

        // Cleanup flag after animation (1s)
        setTimeout(() => {
            setFlags(prev => prev.filter(f => f.id !== newFlagId));
        }, 1000);
    };
    return (
        <section className="py-24 bg-[#07080F] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Massive Image Layout with Cinematic Treatment */}
                <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group border border-white/5">
                    <div className="absolute inset-0 bg-[#0D1B2A] flex items-center justify-center">
                        {/* Real project will use Next Image here */}
                        <span className="text-[#B0B8C8]/30 font-display tracking-widest uppercase text-xl">Iconic Match Photo</span>
                    </div>

                    {/* Cinematic blue-teal color shift overlay */}
                    <div className="absolute inset-0 bg-[#0D1B2A]/30 mix-blend-color z-10 pointer-events-none" />

                    {/* Dark Vignette edges */}
                    <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] z-20 pointer-events-none" />

                    {/* Subtle slow zoom on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Narrative Content */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="h-[1px] w-12 bg-[#C9A84C] shrink-0 opacity-50" />
                        <span className="font-sans font-bold text-[#C9A84C] uppercase tracking-widest text-sm">
                            म्याचको कथा
                        </span>
                    </div>

                    <h2 className="font-display uppercase tracking-[0em] text-4xl md:text-5xl lg:text-6xl text-stadium-white leading-[1.1] mb-8 animate-[fadeUpIn_1s_ease-out_both] drop-shadow-lg">
                        "जब ग्राउण्डमा हुटिङ सुरु भयो, हामीलाई थाहा थियो, अब हामी हार्दैनौँ।"
                    </h2>

                    <p className="font-sans text-[#B0B8C8] text-lg md:text-xl leading-relaxed mb-10 max-w-xl pr-6 border-l-[1px] border-[#C9A84C] pl-6 animate-[fadeUpIn_1s_ease-out_0.2s_both]">
                        २०,००० फ्यानहरूको गर्जनबीच टीयु क्रिकेट ग्राउण्डमा, रोहित पौडेलले यस्तो इनिङ्स खेले जुन वर्षौंसम्म याद गरिनेछ। कम लक्ष्यको रक्षा गर्दै, बलिङ आक्रमणले यस्तो दबाब बनायो कि विपक्षी टोलीले एक-एक रनको लागि तड्पिनु पर्यो।
                    </p>

                    <div className="flex items-center gap-6 animate-[fadeUpIn_1s_ease-out_0.4s_both]">
                        <div className="w-14 h-14 rounded-full bg-[#0D1B2A] border border-[#C9A84C]/30 shrink-0 flex items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(201,168,76,0.1)]">
                            <span className="text-[#C9A84C] text-xs font-bold">RP</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-sans font-semibold text-stadium-white text-lg">रोहित पौडेल</span>
                            <span className="font-sans text-[#B0B8C8] text-sm">क्याप्टेन, नेपाल नेशनल टिम</span>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-[fadeUpIn_1s_ease-out_0.6s_both]">
                        <Link href="/squad/kushal-bhurtel">
                            <button
                                onClick={handleHype}
                                className="relative px-8 py-4 bg-transparent text-[#C41E3A] border border-[#C41E3A]/50 rounded font-sans font-bold uppercase tracking-wider overflow-hidden group hover:bg-[#C41E3A] hover:text-stadium-white hover:border-[#C41E3A] transition-colors duration-300 shadow-[0_0_15px_rgba(196,30,58,0.2)] active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
                                    गैंडालाई सपोर्ट गर्नुस् {hypeLevel > 0 && `(${hypeLevel})`}
                                </span>

                                {/* Spawned Animated Flags */}
                                {flags.map(flag => (
                                    <div
                                        key={flag.id}
                                        style={flag.style}
                                        className="absolute left-1/2 top-1/2 -ml-3 -mt-3 w-6 h-6 animate-[hypeFloat_1s_ease-out_forwards] pointer-events-none z-20"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-stadium-white">
                                            <path d="M4 2v20h2V4h14l-4.5 4.5L20 13H6v-2h9.5l-2.5-2.5L15.5 6H6V2H4z" />
                                        </svg>
                                    </div>
                                ))}
                            </button>
                        </Link>

                        <div className="flex items-center gap-4 text-[#B0B8C8] group cursor-pointer w-fit">
                            <span className="font-sans font-bold uppercase tracking-wider text-sm group-hover:text-[#C9A84C] transition-colors">म्याच रिपोर्ट पढ्नुस्</span>
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C] transition-all transform group-hover:translate-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
