"use client";

export default function MatchCenter() {
    // Mock Data for the War Room
    const momentumEvents = [
        { time: "१४.२ ओभर", title: "रोहितको आक्रामक अर्धशतक", desc: "लगातार दुई छक्का प्रहार गर्दै इनिङ्सको शानदार पुनरागमन।", highlight: true },
        { time: "११.५ ओभर", title: "१०० रनको साझेदारी", desc: "प्रारम्भिक झट्का पछि सम्हालिएको इनिङ्सले ल्याएको महत्त्वपूर्ण माइलस्टोन।", highlight: false },
        { time: "८.३ ओभर", title: "सन्दीपको जादुगरी स्पेल", desc: "युएईका मुख्य ब्याट्सम्यानलाई गुगलीको जालमा फसाए।", highlight: true },
        { time: "४.१ ओभर", title: "सुरुवाती झट्का", desc: "पहिलो विकेट गुमाउँदा नेपाली क्याम्पमा चुनौती।", highlight: false },
    ];

    return (
        <div className="w-full min-h-screen bg-[#07080F] text-[#B0B8C8] overflow-hidden selection:bg-[#C41E3A] selection:text-white">

            {/* 1. The 'High Tension' Scoreboard Hero */}
            <section className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center items-center overflow-hidden border-b border-white/5 pt-16">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07080F]/50 to-[#07080F] z-10" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(196,30,58,0.15)_0%,transparent_60%)] z-0 pointer-events-none" />

                {/* CSS Dust Particles for atmosphere */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-20">
                    <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-[#C9A84C] rounded-full blur-[2px] animate-pulse" />
                    <div className="absolute top-[30%] right-[10%] w-3 h-3 bg-[#C41E3A] rounded-full blur-[3px] animate-pulse delay-500" />
                    <div className="absolute bottom-[20%] left-[40%] w-4 h-4 bg-[#C9A84C] rounded-full blur-[4px] animate-pulse delay-1000" />
                </div>

                <div className="relative z-20 flex flex-col items-center justify-center px-4">
                    {/* Teams Label */}
                    <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C41E3A] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C41E3A]"></span>
                            </span>
                            <span className="font-display font-black text-3xl md:text-5xl text-stadium-white tracking-widest uppercase">नेपाल</span>
                        </div>
                        <span className="font-sans font-bold text-[#B0B8C8]/50 text-xl tracking-[0.2em] uppercase mx-4">VS</span>
                        <div className="flex items-center">
                            <span className="font-display font-black text-2xl md:text-4xl text-[#B0B8C8]/60 tracking-widest uppercase line-through decoration-white/20">UAE</span>
                        </div>
                    </div>

                    {/* Massive Score */}
                    <div className="flex items-baseline gap-2 md:gap-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                        <h1 className="font-display font-black text-[7rem] md:text-[12rem] lg:text-[15rem] leading-[0.85] text-stadium-white tracking-[-0.04em]">
                            १८७
                        </h1>
                        <span className="font-display font-black text-6xl md:text-8xl text-[#C41E3A] leading-none">/ ३</span>
                    </div>

                    <div className="flex gap-4 md:gap-8 mt-8 border-t border-white/10 pt-6">
                        <div className="flex flex-col items-center">
                            <span className="font-sans font-bold text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] mb-1">रन रेट</span>
                            <span className="font-display font-bold text-3xl text-stadium-white">९.२</span>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10" />
                        <div className="flex flex-col items-center">
                            <span className="font-sans font-bold text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] mb-1">ओभर</span>
                            <span className="font-display font-bold text-3xl text-stadium-white">१७.४</span>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10" />
                        <div className="flex flex-col items-center">
                            <span className="font-sans font-bold text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] mb-1">लक्ष्य</span>
                            <span className="font-display font-bold text-3xl text-[#B0B8C8]">२३४</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. The Current Partnership (Glassmorphism) - Overlaying the boundary */}
            <section className="max-w-4xl mx-auto px-6 relative z-30 -mt-16 md:-mt-20">
                <div className="bg-[#0D1B2A]/40 border border-[#C9A84C]/20 backdrop-blur-2xl rounded-sm p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
                    {/* Inner gold glow */}
                    <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(201,168,76,0.05)] pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative w-full">
                            <span className="absolute top-0 right-0 md:left-auto flex h-3 w-3 -mt-2 -mr-2 md:-ml-6 md:right-auto z-20">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C9A84C]"></span>
                            </span>
                            <h3 className="font-display font-black text-3xl text-[#C9A84C] drop-shadow-[0_0_10px_rgba(201,168,76,0.5)]">
                                रोहित पौडेल
                            </h3>
                            <span className="font-sans font-bold text-stadium-white text-lg tracking-widest mt-1">७८* (४२)</span>

                            {/* Headshot Fade */}
                            <div className="absolute right-0 bottom-0 top-0 w-32 opacity-20 pointer-events-none md:left-32 md:right-auto" style={{ maskImage: 'linear-gradient(to right, transparent, black 50%, transparent)' }}>
                                {/* Placeholder for Headshot image */}
                                <div className="w-full h-full bg-[#1E3A8A]/50 rounded-full blur-xl" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center shrink-0">
                            <span className="font-sans font-bold text-[#C41E3A] text-xs uppercase tracking-[0.2em] mb-2">साझेदारी</span>
                            <span className="font-display font-black text-5xl text-stadium-white leading-none">६४ <span className="text-xl text-[#B0B8C8]">(२८)</span></span>
                        </div>

                        <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right relative w-full">
                            <h3 className="font-display font-black text-3xl text-stadium-white/80">
                                दीपेन्द्र सिंह
                            </h3>
                            <span className="font-sans font-bold text-[#B0B8C8] text-lg tracking-widest mt-1">२२ (१३)</span>

                            {/* Headshot Fade */}
                            <div className="absolute left-0 bottom-0 top-0 w-32 opacity-10 pointer-events-none md:right-32 md:left-auto" style={{ maskImage: 'linear-gradient(to left, transparent, black 50%, transparent)' }}>
                                {/* Placeholder for Headshot image */}
                                <div className="w-full h-full bg-[#0D1B2A]/50 rounded-full blur-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The 'Momentum' Timeline (Narrative over Data) */}
            <section className="max-w-4xl mx-auto px-6 py-32 relative">
                <div className="flex items-center justify-center gap-4 mb-20">
                    <span className="h-[2px] w-12 bg-[#B0B8C8]/20" />
                    <h2 className="font-ui font-black text-[#B0B8C8]/50 uppercase tracking-[0.2em] text-sm">
                        म्याच मोमेन्टम
                    </h2>
                    <span className="h-[2px] w-12 bg-[#B0B8C8]/20" />
                </div>

                <div className="relative">
                    {/* The Vertical Crimson Spine */}
                    <div className="absolute left-6 md:left-[120px] top-0 bottom-0 w-[2px] bg-[rgba(196,30,58,0.35)] z-0 rounded-full"></div>

                    <div className="flex flex-col gap-16 relative z-10">
                        {momentumEvents.map((event, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-start gap-8 group hover:-translate-y-1 transition-transform duration-500">

                                {/* Timeline Stamp */}
                                <div className="w-24 shrink-0 text-left md:text-right pt-1 hidden md:block">
                                    <span className="font-mono text-[#B0B8C8]/60 font-bold tracking-widest text-sm">{event.time}</span>
                                </div>

                                {/* Pulse Node */}
                                <div className="relative flex items-center shrink-0 w-12 h-12 pt-1 md:pt-0 pl-3 md:pl-0">
                                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transform z-10 transition-all duration-300 ${event.highlight
                                        ? 'bg-stadium-white shadow-[0_0_20px_rgba(201,168,76,0.8)] group-hover:scale-150 group-hover:bg-[#C9A84C]'
                                        : 'bg-[#C41E3A] shadow-[0_0_8px_rgba(196,30,58,0.6)] group-hover:scale-125 group-hover:bg-stadium-white'
                                        }`}>
                                        <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${event.highlight ? 'bg-[#C9A84C]' : 'bg-[#C41E3A]'}`}></div>
                                    </div>
                                    {/* Mobile Timestamp */}
                                    <span className="md:hidden font-mono text-[#B0B8C8]/60 font-bold tracking-widest text-sm ml-6">{event.time}</span>
                                </div>

                                {/* Narrative Card */}
                                <div className="flex-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-sm p-6 ml-10 md:ml-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-[#1E3A8A]/50 transition-colors group-hover:bg-white/10">
                                    <h4 className={`font-display font-black text-2xl lg:text-3xl leading-tight mb-3 transition-colors ${event.highlight ? 'text-[#C9A84C]' : 'text-stadium-white group-hover:text-[#1E3A8A]'}`}>
                                        {event.title}
                                    </h4>
                                    <p className="font-sans text-[#B0B8C8] text-base leading-relaxed">
                                        {event.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute left-6 md:left-[120px] bottom-0 w-3 h-3 -translate-x-[5px] rounded-full bg-[rgba(196,30,58,0.35)] z-0 block translate-y-full" />
                </div>
            </section>
        </div>
    );
}
