"use client";

import { useEffect, useState } from "react";

export default function FanZoneClient() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const fans = [
        { name: "प्रकाश श्रेष्ठ", city: "काठमाडौं", memory: "२०१६ मा नेपालले वेस्ट इन्डिजलाई हराएको दिन म रोएँ। त्यो आँशु खुशीको थियो।", chant: "नेपाल! नेपाल!" },
        { name: "सुनिता तामाङ", city: "पोखरा", memory: "सन्दीपले पहिलो आईपीएल खेलेको दिन हाम्रो पूरा मोहल्ला टिभीको अगाडि बस्यो।", chant: "जित्छौं हामी!" },
        { name: "रमेश थापा", city: "बुटवल", memory: "विश्वकप छनोटमा ओमानलाई हराएपछि सडकमा नाचेको याद अझै छ।", chant: "हाम्रो नेपाल!" },
        { name: "अञ्जली गुरुङ", city: "धरान", memory: "रोहितले कप्तानी लिएको दिनदेखि टिम फरक लाग्छ — परिपक्व, आत्मविश्वासी।", chant: "रोहित! रोहित!" },
        { name: "विकास यादव", city: "जनकपुर", memory: "दिपेन्द्रको ६ छक्का — त्यो ओभर हेर्दा शरीरमा झनझनी आयो।", chant: "छक्का! छक्का!" },
        { name: "मीना राई", city: "इलाम", memory: "पहिलो पटक त्रिभुवन मैदानमा नेपालको खेल हेर्न गएँ — त्यो अनुभव शब्दमा भन्न सकिँदैन।", chant: "नेपाल जिन्दाबाद!" },
    ];

    const chants = [
        { nepali: "नेपाल! नेपाल!", tivrata: "उच्चतम" },
        { nepali: "जित्छौं हामी, जित्छौं हामी!", tivrata: "उच्च" },
        { nepali: "हाम्रो रगत रातो छ!", tivrata: "उच्च" },
        { nepali: "१२औं गैंडा — मैदान हल्लाउँछौं!", tivrata: "उच्चतम" },
    ];

    if (!mounted) return null;

    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative font-sans">

            {/* Global Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(circle at 15% 90%, rgba(196,30,58,0.08), transparent 55%),
                            radial-gradient(circle at 85% 10%, rgba(0,56,147,0.08), transparent 50%)
                        `,
                    }}
                />
                <div className="absolute right-0 top-0 opacity-[0.07] select-none text-[#C41E3A] text-8xl md:text-[200px] leading-none text-right pt-8 pr-12">
                    ◈
                </div>
            </div>

            {/* Hero */}
            <section className="relative w-full overflow-hidden flex flex-col justify-end" style={{ height: "50vh" }}>
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        filter: "grayscale(0.7) brightness(0.5)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/60 to-transparent" />

                <div className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto pb-12 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "8px", display: "block" }}>
                        १२औं गैंडा
                    </span>
                    <h1 className="text-white leading-none mb-2" style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800, fontSize: "clamp(56px, 8vw, 96px)" }}>
                        फ्यान जोन
                    </h1>
                    <p style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.5)", fontStyle: "italic", margin: 0 }}>
                        यो मैदान तिम्रो हो।
                    </p>
                </div>
            </section>

            {/* Fan Wall */}
            <section className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto mt-16">
                <div className="flex items-center mb-8">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", textTransform: "uppercase", marginRight: "16px", letterSpacing: "0.25em" }}>
                        फ्यान पर्खाल
                    </span>
                    <div className="flex-grow border-t border-[#C9A84C] opacity-40" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fans.map((fan, idx) => (
                        <div
                            key={idx}
                            className="relative group overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] animate-[dynamicSlideFade_0.6s_cubic-bezier(0.76,0,0.24,1)_both]"
                            style={{
                                background: "linear-gradient(135deg, rgba(13,27,42,0.9), rgba(7,8,15,0.95))",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "2px",
                                padding: "28px",
                                animationDelay: `${idx * 0.1}s`,
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.borderLeft = "3px solid rgba(196,30,58,0.6)";
                                el.style.background = "linear-gradient(135deg, rgba(20,40,60,0.9), rgba(10,12,20,0.95))";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.borderLeft = "1px solid rgba(255,255,255,0.06)";
                                el.style.background = "linear-gradient(135deg, rgba(13,27,42,0.9), rgba(7,8,15,0.95))";
                            }}
                        >
                            <div style={{ fontFamily: "Georgia, serif", fontSize: "72px", color: "rgba(196,30,58,0.08)", position: "absolute", top: "-10px", left: "16px", lineHeight: 1, pointerEvents: "none" }}>
                                &ldquo;
                            </div>
                            <div className="relative z-10 flex flex-col h-full pt-4">
                                <p className="flex-grow mb-6 pt-2" style={{ fontFamily: "Mukta, sans-serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                                    {fan.memory}
                                </p>
                                <div className="pt-4 flex justify-between items-end border-t border-[rgba(255,255,255,0.06)]">
                                    <div>
                                        <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "14px", color: "white" }}>{fan.name}</div>
                                        <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{fan.city}</div>
                                    </div>
                                    <div style={{ fontFamily: "Mukta, sans-serif", fontSize: "13px", color: "#C9A84C", fontWeight: 700 }}>
                                        {fan.chant}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Chant Board */}
            <section className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto mt-24">
                <div className="flex items-center mb-6">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", textTransform: "uppercase", marginRight: "16px", letterSpacing: "0.25em" }}>
                        मैदानको आवाज
                    </span>
                    <div className="flex-grow border-t border-[#C9A84C] opacity-40" />
                </div>

                <div className="flex flex-col">
                    {chants.map((chant, idx) => (
                        <div
                            key={idx}
                            className="group flex justify-between items-center py-8 border-b border-[rgba(255,255,255,0.05)] transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-default animate-[dynamicSlideFade_0.6s_cubic-bezier(0.76,0,0.24,1)_both]"
                            style={{ borderLeft: "3px solid transparent", paddingLeft: "16px", marginLeft: "-19px", animationDelay: `${0.4 + idx * 0.15}s` }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.borderLeftColor = "#C41E3A";
                                const nepaliText = el.querySelector(".nepali-chant") as HTMLElement;
                                if (nepaliText) nepaliText.style.color = "rgba(255,255,255,0.9)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.borderLeftColor = "transparent";
                                const nepaliText = el.querySelector(".nepali-chant") as HTMLElement;
                                if (nepaliText) nepaliText.style.color = "white";
                            }}
                        >
                            <div className="nepali-chant transition-colors duration-400" style={{ fontFamily: "Mukta, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", color: "white", lineHeight: 1.1 }}>
                                {chant.nepali}
                            </div>
                            <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "11px", color: chant.tivrata === "उच्चतम" ? "#C41E3A" : "#C9A84C", letterSpacing: "0.2em" }}>
                                {chant.tivrata}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing Line */}
            <div style={{ textAlign: "center", padding: "100px 0 60px 0" }}>
                <p style={{ fontFamily: "Mukta, sans-serif", fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.18)", margin: 0 }}>
                    जब स्टेडियम गर्जन्छ — त्यो आवाज हाम्रो हो।
                </p>
            </div>

            <style jsx global>{`
                @keyframes fadeUpIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes dynamicSlideFade {
                    from { opacity: 0; transform: translateX(-15px) translateY(10px); }
                    to { opacity: 1; transform: translateX(0) translateY(0); }
                }
            `}</style>
        </div>
    );
}
