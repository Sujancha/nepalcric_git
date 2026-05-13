"use client";

export default function ContactClient() {
    return (
        <div className="bg-[#07080F] min-h-screen relative overflow-hidden">

            {/* Ghost Flag Watermark */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[120px] opacity-[0.04] select-none">
                    <svg width="600" height="900" viewBox="0 0 200 250" fill="#C41E3A" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40 20 L160 110 L80 110 L180 230 L40 230 Z" />
                    </svg>
                </div>
            </div>

            <main className="relative z-10 max-w-4xl mx-auto px-6 py-32 md:py-48">
                <h1 className="font-sans font-extrabold text-white text-[clamp(64px,10vw,120px)] leading-[0.85] tracking-tight mb-20 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    सम्पर्क
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                    {/* Left: Contact Info */}
                    <div className="flex flex-col gap-12 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_0.2s_both]">
                        <div className="flex flex-col gap-2">
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, color: "#C9A84C", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                                इमेल
                            </span>
                            <a href="mailto:info@nepalcric.com" className="font-mukta text-white/80 text-2xl hover:text-white transition-colors">
                                info@nepalcric.com
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, color: "#C9A84C", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                                स्थान
                            </span>
                            <p className="font-mukta text-white/80 text-2xl">
                                काठमाडौं, नेपाल
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, color: "#C9A84C", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                                सामाजिक सञ्जाल
                            </span>
                            <div className="flex gap-6 mt-2">
                                <a href="https://twitter.com/nepalcric" target="_blank" rel="noopener noreferrer" className="font-mukta text-white/40 text-lg hover:text-white transition-colors" style={{ textDecoration: 'none' }}>ट्विटर</a>
                                <a href="https://instagram.com/nepalcric" target="_blank" rel="noopener noreferrer" className="font-mukta text-white/40 text-lg hover:text-white transition-colors" style={{ textDecoration: 'none' }}>इन्स्टाग्राम</a>
                                <a href="https://facebook.com/nepalcric" target="_blank" rel="noopener noreferrer" className="font-mukta text-white/40 text-lg hover:text-white transition-colors" style={{ textDecoration: 'none' }}>फेसबुक</a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white/5 backdrop-blur-md rounded-md border border-white/10 p-8 md:p-10 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_0.4s_both]">
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col gap-2">
                                <label style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", marginLeft: "4px" }}>
                                    नाम
                                </label>
                                <input
                                    type="text"
                                    className="bg-transparent border-b border-white/10 py-2 px-1 focus:border-[#C41E3A] outline-none text-white font-mukta transition-colors"
                                    placeholder="तपाईंको नाम"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", marginLeft: "4px" }}>
                                    इमेल
                                </label>
                                <input
                                    type="email"
                                    className="bg-transparent border-b border-white/10 py-2 px-1 focus:border-[#C41E3A] outline-none text-white font-mukta transition-colors"
                                    placeholder="इमेल ठेगाना"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", marginLeft: "4px" }}>
                                    सन्देश
                                </label>
                                <textarea
                                    rows={4}
                                    className="bg-transparent border-b border-white/10 py-2 px-1 focus:border-[#C41E3A] outline-none text-white font-mukta transition-colors resize-none"
                                    placeholder="तपाईंको सन्देश..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-6 bg-[#C41E3A] text-white py-4 rounded-sm font-mukta font-bold tracking-widest hover:bg-[#A31830] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                style={{ textTransform: "uppercase" }}
                            >
                                पठाउनुस्
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
