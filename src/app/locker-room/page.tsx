import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "लकर रुम",
    description: "ड्रेसिङ रुमको कथा — एक्सक्लुसिभ लकर रुम सामग्री",
};

const vaultVideos = [
    {
        id: "vid-01",
        title: "ड्रेसिङ रुमको कथा: क्यानडा विरुद्धको जित पछि",
        duration: "४:१५",
        date: "१४ मार्च २०२६",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "vid-02",
        title: "सन्दीपको जादु: पाँच विकेट, एउटा ओभर, एउटा देश",
        duration: "३:४०",
        date: "१० मार्च २०२६",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "vid-03",
        title: "मुख्य प्रशिक्षकको अन्तिम सन्देश",
        duration: "२:५५",
        date: "०९ मार्च २०२६",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "vid-04",
        title: "१२औं खेलाडी: टियू ग्राउन्डको हुटिंग",
        duration: "५:२०",
        date: "०५ मार्च २०२६",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "vid-05",
        title: "रोहित पौडेल: कप्तानको अडान, देशको भार",
        duration: "६:१०",
        date: "०१ मार्च २०२६",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "vid-06",
        title: "बिहानको नेट: पसिना, प्रतिज्ञा, र एउटा बल",
        duration: "३:०५",
        date: "२८ फेब्रुअरी २०२६",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
];

export default function LockerRoom() {
    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative font-sans">

            {/* Hero Section */}
            <section className="relative h-[70vh] w-full overflow-hidden flex flex-col justify-end">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: "brightness(0.6)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/40 to-transparent" />

                <div className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto pb-16 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px", display: "block" }}>
                        विशेष वृत्तचित्र
                    </span>
                    <h1 className="text-white text-[clamp(48px,8vw,90px)] leading-[0.9] mb-8" style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800 }}>
                        ड्रेसिङ रुमको कथा
                    </h1>
                    <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 hover:border-[#C41E3A] hover:bg-[#C41E3A]/20 transition-all duration-300 group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", fontWeight: 700, color: "white" }}>
                            हेर्नुस्
                        </span>
                    </button>
                </div>
            </section>

            {/* Video Vault */}
            <section className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto mt-12">
                <div className="flex items-center mb-8">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", textTransform: "uppercase", marginRight: "16px", letterSpacing: "0.25em" }}>
                        दृश्य भण्डार
                    </span>
                    <div className="flex-grow border-t border-[#C9A84C] opacity-40" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {vaultVideos.map((video, idx) => {
                        let overlayBg: string | undefined;
                        let customFilter: string | undefined;
                        if (idx === 0) overlayBg = "linear-gradient(135deg, rgba(196,30,58,0.35), rgba(0,0,0,0.6))";
                        else if (idx === 2) overlayBg = "linear-gradient(135deg, rgba(0,56,147,0.35), rgba(0,0,0,0.6))";
                        else if (idx === 3) overlayBg = "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(0,0,0,0.65))";
                        else if (idx === 4) customFilter = "grayscale(0.6) brightness(0.7)";
                        else if (idx === 5) overlayBg = "linear-gradient(135deg, rgba(196,30,58,0.2), rgba(0,56,147,0.2))";

                        return (
                            <div key={video.id} className="flex flex-col group cursor-pointer animate-[dynamicSlideFade_0.6s_cubic-bezier(0.76,0,0.24,1)_both]" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="relative aspect-video rounded-sm overflow-hidden bg-[#0a0f16] border border-white/5 mb-4 shadow-lg">
                                    <div
                                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${!customFilter ? "grayscale-[80%] brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-[0.9]" : ""} group-hover:scale-105`}
                                        style={{
                                            backgroundImage: `url(${video.thumb})`,
                                            ...(customFilter ? { filter: customFilter } : {}),
                                        }}
                                    />
                                    {overlayBg && (
                                        <div className="absolute inset-0 pointer-events-none transition-opacity duration-400 group-hover:opacity-0" style={{ background: overlayBg }} />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110 group-hover:bg-[#C41E3A]/80 group-hover:border-[#C41E3A]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "2px" }}>
                                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <h3
                                    className="group-hover:text-[#C9A84C] transition-colors duration-300"
                                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.3, marginBottom: "6px" }}
                                >
                                    {video.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                                        {video.date}
                                    </span>
                                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>•</span>
                                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                                        {video.duration}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Closing Line */}
            <div style={{ textAlign: "center", padding: "80px 0 60px 0" }}>
                <p style={{ fontFamily: "Mukta, sans-serif", fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.18)", margin: 0 }}>
                    क्यामेराले ती क्षणहरू बचाउँछ — जुन शब्दले बयान गर्न सक्दैन।
                </p>
            </div>
        </div>
    );
}
