import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import LockerRoomClient from "@/components/locker-room/LockerRoomClient";

export const metadata: Metadata = {
    title: "नेपाली क्रिकेटको लकर रुम // LOCKER ROOM",
    description: "नेपाली क्रिकेटको इतिहास — ती ऐतिहासिक क्षणहरू र भावुक कथाहरू जो स्कोरबोर्डमा छैनन् तर हृदयमा छन्",
};

interface ArchiveStory {
    id: string;
    title: string;
    date: string;
    era: string;
    description: string;
    thumb: string;
}

// Read the story archive database statically
const storiesRaw = fs.readFileSync(path.join(process.cwd(), "content", "locker-room.json"), "utf8");
const { stories: archiveStories } = JSON.parse(storiesRaw) as { stories: ArchiveStory[] };

export default function LockerRoom() {
    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative overflow-hidden font-sans">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 inset-x-0 h-[80vh] bg-gradient-to-b from-blue-900/10 via-[#07080F]/30 to-transparent pointer-events-none" />

            {/* Cinematic Hero Banner */}
            <section className="relative h-[72vh] w-full overflow-hidden flex flex-col justify-end border-b border-white/5">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: "brightness(0.48) contrast(1.08)",
                    }}
                />
                
                {/* Visual Gritty Vignette and duotone light blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/45 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07080F]/80 via-transparent to-transparent z-10" />

                <div className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto pb-20 animate-[fadeUpIn_0.9s_cubic-bezier(0.76,0,0.24,1)_both]">
                    <span 
                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.32em" }}
                        className="uppercase font-extrabold mb-3.5 block"
                    >
                        विशेष ऐतिहासिक वृत्तचित्र // CINEMATIC STORIES
                    </span>
                    <h1 
                        className="text-white text-[clamp(44px,7vw,84px)] leading-[1.05] tracking-tight mb-8 max-w-4xl"
                        style={{ fontFamily: "Mukta, sans-serif", fontWeight: 900 }}
                    >
                        नेपाली क्रिकेटको गौरवशाली इतिहास
                    </h1>
                    <div className="flex items-center gap-4">
                        <a 
                            href="#history-archive"
                            className="flex items-center gap-3 bg-[#C41E3A] border border-[#C41E3A] px-9 py-4 transition-all duration-300 hover:bg-[#C41E3A]/80 hover:border-[#C41E3A]/80 group text-decoration-none"
                            style={{ borderRadius: "2px" }}
                        >
                            <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "16px", fontWeight: 800, color: "white" }}>
                                इतिहासमा प्रवेश गर्नुस् // ENTER HISTORY
                            </span>
                            <svg className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Archive Stories Heading & Grid */}
            <div id="history-archive" className="relative z-20 pt-16 scroll-mt-12">
                <div className="px-6 lg:px-12 w-full max-w-7xl mx-auto mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 w-full">
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.25em" }}
                            className="uppercase font-bold shrink-0"
                        >
                            इतिहासको आधिकारिक अभिलेख // ARCHIVE NARRATIVES
                        </span>
                        <div className="flex-grow border-t border-white/5 opacity-40" />
                    </div>
                </div>

                {/* Client Side Interactive Grid & Sorting Filters */}
                <LockerRoomClient stories={archiveStories} />
            </div>

            {/* Closing Line */}
            <div style={{ textAlign: "center", padding: "100px 0 60px 0" }} className="relative z-20">
                <p style={{ fontFamily: "Mukta, sans-serif", fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.22)", margin: 0 }}>
                    ती क्षणहरू — जो स्कोरबोर्डमा छैनन् तर प्रत्येक नेपालीको मुटुमा जीवित छन्।
                </p>
            </div>
        </div>
    );
}
