import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "लकर रुम",
    description: "नेपाली क्रिकेटको इतिहास — ती क्षणहरू जो स्कोरबोर्डमा छैनन् तर हृदयमा छन्",
};

const archiveStories = [
    {
        id: "story-01",
        title: "ढाकाको त्यो बिहान — नेपालको पहिलो विश्वकप",
        date: "मार्च २०१४",
        era: "पारस खड्का युग",
        description: "सन् २०१४। बङ्गलादेशको राजधानी ढाकामा नेपाल पहिलोपटक आईसीसी विश्वकपमा उत्रियो। पारस खड्काको नेतृत्वमा — सगर पुन, शक्ति गौचन, बसन्त रेग्मी — ती नामहरू जो नेपाली क्रिकेटको पहिलो अध्यायका नायक हुन्। अन्तर्राष्ट्रिय मञ्चमा आफ्नो अस्तित्व सिद्ध गर्न निस्केको एउटा देश।",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "story-02",
        title: "बसन्त रेग्मी — नेपालको पहिलो आगो",
        date: "२०१०–२०१८",
        era: "पायोनियर युग",
        description: "एउटा पेस बलर जसले नेपाललाई सिकायो कि ब्याटर डराउन सक्छन्। बसन्त रेग्मीको नाम सुन्दा — ती सबै वर्षहरू याद आउँछन् जब नेपाली क्रिकेट संसारको नक्सामा आफ्नो ठाउँ खोज्दैथियो। उनको हर ओभरमा एउटा सन्देश थियो: हामी सिर्फ भाग लिन आएका होइनौं।",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "story-03",
        title: "शक्ति गौचन — वो स्पिन जुन संसारले देख्यो",
        date: "२०१२–२०१८",
        era: "पायोनियर युग",
        description: "जब सन्दीप लामिछाने आउनुभन्दा अगाडि, शक्ति गौचनको बल नेपाली स्पिनको चिनारी थियो। ती वर्षहरू — जब नेपालको स्कोर थाहा पाउन रेडियो सुन्नुपर्थ्यो, इन्टरनेट हुँदैनथ्यो — ती वर्षहरूमा उनले देशको झण्डा बोकेर मैदानमा उत्रिए।",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "story-04",
        title: "पारस खड्का — एउटा युगको अन्त्य",
        date: "२०२१",
        era: "पारस खड्का युग",
        description: "नेपाली क्रिकेटको सबैभन्दा लामो कप्तानीको अन्त्य। पारस खड्काले नेपालको ओडीआई मान्यताको यात्रामा नेतृत्व गरे — अनगिन्ती पराजय, गिनती नगरिने संघर्ष, र अन्तमा सन् २०१८ को त्यो ऐतिहासिक दिन जब नेपालले पहिलो आधिकारिक ओडीआई खेल्यो। उनी खेलाडी मात्र थिएनन् — उनी एउटा आन्दोलन थिए।",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "story-05",
        title: "१ अगस्त, २०१८ — वह दिन जब इतिहास लेखियो",
        date: "अगस्त १, २०१८",
        era: "ओडीआई युग",
        description: "नेपालको पहिलो आधिकारिक एकदिवसीय अन्तर्राष्ट्रिय। नेदरल्यान्ड्सविरुद्ध। त्यस दिन मैदानमा उत्रिएका ११ जनाले मात्र होइन — नेपाली क्रिकेटको दुई दशकको संघर्षले इतिहासको दरवाजा खोल्यो। पारस खड्का, सन्दीप लामिछाने, ज्ञानेन्द्र मल्ल — ती नाम जो त्यो पहिलो एघारमा थिए।",
        thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "story-06",
        title: "डलासको त्यो रात — एक रन र सिङ्गो देश",
        date: "जुन २०२४",
        era: "विश्वकप युग",
        description: "टी-ट्वेन्टी विश्वकप २०२४। नेपाल बनाम दक्षिण अफ्रिका। अन्तिम बल। एक रन। डलासको त्यो रात — जुन नेपाली क्रिकेट इतिहासमा सधैं बस्नेछ। हारको गणित भन्छ: एक रन कम। मैदानको सत्य भन्छ: नेपालले दक्षिण अफ्रिकालाई त्यो रात एउटा कुरा बुझायो — हामी आइसक्यौं।",
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
                        नेपाली क्रिकेटको इतिहास
                    </h1>
                    <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 hover:border-[#C41E3A] hover:bg-[#C41E3A]/20 transition-all duration-300 group">
                        <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", fontWeight: 700, color: "white" }}>
                            पढ्नुस्
                        </span>
                    </button>
                </div>
            </section>

            {/* Archive Stories */}
            <section className="relative z-20 px-6 lg:px-12 w-full max-w-7xl mx-auto mt-12">
                <div className="flex items-center mb-8">
                    <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", textTransform: "uppercase", marginRight: "16px", letterSpacing: "0.25em" }}>
                        इतिहासको अभिलेख
                    </span>
                    <div className="flex-grow border-t border-[#C9A84C] opacity-40" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {archiveStories.map((story, idx) => {
                        let overlayBg: string | undefined;
                        if (idx === 0) overlayBg = "linear-gradient(135deg, rgba(196,30,58,0.35), rgba(0,0,0,0.6))";
                        else if (idx === 2) overlayBg = "linear-gradient(135deg, rgba(0,56,147,0.35), rgba(0,0,0,0.6))";
                        else if (idx === 3) overlayBg = "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(0,0,0,0.65))";
                        else if (idx === 5) overlayBg = "linear-gradient(135deg, rgba(196,30,58,0.2), rgba(0,56,147,0.2))";

                        return (
                            <div key={story.id} className="flex flex-col group cursor-pointer animate-[dynamicSlideFade_0.6s_cubic-bezier(0.76,0,0.24,1)_both]" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="relative aspect-video rounded-sm overflow-hidden bg-[#0a0f16] border border-white/5 mb-4 shadow-lg">
                                    <div
                                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] grayscale-[80%] brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-[0.9] group-hover:scale-105"
                                        style={{ backgroundImage: `url(${story.thumb})` }}
                                    />
                                    {overlayBg && (
                                        <div className="absolute inset-0 pointer-events-none transition-opacity duration-400 group-hover:opacity-0" style={{ background: overlayBg }} />
                                    )}
                                </div>
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>
                                    {story.era}
                                </span>
                                <h3
                                    className="group-hover:text-[#C9A84C] transition-colors duration-300"
                                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.3, marginBottom: "6px" }}
                                >
                                    {story.title}
                                </h3>
                                <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "10px" }}>
                                    {story.date}
                                </span>
                                <p
                                    style={{
                                        fontFamily: "Mukta, sans-serif",
                                        fontSize: "14px",
                                        color: "rgba(255,255,255,0.45)",
                                        lineHeight: 1.6,
                                        margin: 0,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {story.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Closing Line */}
            <div style={{ textAlign: "center", padding: "80px 0 60px 0" }}>
                <p style={{ fontFamily: "Mukta, sans-serif", fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.18)", margin: 0 }}>
                    ती क्षणहरू — जो स्कोरबोर्डमा छैनन् तर हृदयमा छन्।
                </p>
            </div>
        </div>
    );
}
