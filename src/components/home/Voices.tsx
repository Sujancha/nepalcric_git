"use client";

export default function Voices() {
    const voices = [
        {
            quote: "टीयुमा खेल्दा लाग्छ, १२औं खेलाडी मैदानमै छ।",
            author: "रोहित पौडेल",
            role: "क्याप्टेन"
        },
        {
            quote: "ग्राउन्डको धुलोले पनि हामीलाई जित्न सिकायो।",
            author: "पारस खड्का",
            role: "पूर्व क्याप्टेन"
        },
        {
            quote: "हाम्रो सपना अब सपना मात्र रहेन, एउटा संकल्प बनिसक्यो।",
            author: "मोन्टी देसाई",
            role: "मुख्य प्रशिक्षक"
        },
        {
            quote: "बाउन्ड्री लाइनमा उभिंदा लाग्छ, पूरा देश मेरै साथमा छ।",
            author: "सन्दीप लामिछाने",
            role: "बलर"
        }
    ];

    return (
        <section className="w-full bg-[#07080F] py-24 relative overflow-hidden border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '12px',
                    color: '#C9A84C',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A84C' }} />
                    <span style={{ letterSpacing: '0' }}>उनीहरूका आवाजहरू</span>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto pl-6">
                <style>{'.voices-scroll::-webkit-scrollbar { display: none; }'}</style>
                <div
                    className="voices-scroll flex snap-x snap-mandatory scroll-smooth overflow-x-auto"
                    style={{
                        gap: '24px',
                        paddingBottom: '16px',
                        paddingLeft: '0',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {voices.map((voice, idx) => (
                        <div
                            key={idx}
                            style={{
                                minWidth: 'clamp(320px, 85vw, 600px)',
                                scrollSnapAlign: 'start',
                                flexShrink: 0,
                                background: 'linear-gradient(135deg, rgba(13,27,42,0.97) 0%, rgba(7,8,15,0.99) 100%)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderTop: '2px solid rgba(196,30,58,0.5)',
                                padding: '48px 40px 40px 40px',
                                minHeight: '280px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '2px',
                                transition: 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)',
                                cursor: 'default'
                            }}
                        >
                            {/* QUOTE WATERMARK */}
                            <div style={{
                                position: 'absolute',
                                top: '16px',
                                left: '28px',
                                fontFamily: 'Georgia, serif',
                                fontSize: '120px',
                                lineHeight: '1',
                                color: 'rgba(196,30,58,0.07)',
                                pointerEvents: 'none',
                                userSelect: 'none',
                                zIndex: 0
                            }}>
                                &ldquo;
                            </div>

                            {/* QUOTE TEXT */}
                            <div style={{
                                fontFamily: 'Mukta, sans-serif',
                                fontWeight: 800,
                                fontSize: 'clamp(20px, 2.8vw, 28px)',
                                lineHeight: '1.4',
                                color: '#FFFFFF',
                                letterSpacing: '0',
                                position: 'relative',
                                zIndex: 1,
                                marginBottom: '32px'
                            }}>
                                {voice.quote}
                            </div>

                            {/* ATTRIBUTION BLOCK */}
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                {/* Crimson line */}
                                <div style={{
                                    width: '32px',
                                    height: '2px',
                                    backgroundColor: '#C41E3A',
                                    marginBottom: '12px'
                                }} />
                                {/* Name */}
                                <div style={{
                                    fontFamily: 'Mukta, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    color: '#FFFFFF',
                                    letterSpacing: '0',
                                    marginBottom: '4px'
                                }}>
                                    {voice.author}
                                </div>
                                {/* Role */}
                                <div style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.4)',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase'
                                }}>
                                    {voice.role}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Padding block so the last item can scroll fully */}
                    <div className="shrink-0 w-6 sm:w-[20vw]" />
                </div>

                {/* UX Scroll Fade (Right Edge) */}
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#07080F] to-transparent pointer-events-none z-20" />
            </div>

            <style jsx global>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
