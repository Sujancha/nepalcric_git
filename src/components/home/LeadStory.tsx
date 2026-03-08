import Image from "next/image";

export default function LeadStory() {
    return (
        <section className="w-full bg-[#07080F] border-b border-white/5 relative overflow-hidden flex flex-col lg:flex-row">
            {/* Left side: Dramatic full-bleed photo */}
            <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto min-h-[500px] lg:min-h-[80vh] relative group cursor-pointer overflow-hidden border-r border-[#152336]">
                {/* Dark overlay for edge blending */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07080F] to-transparent z-10 lg:bg-gradient-to-r lg:from-transparent lg:to-[#07080F]" />

                <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Lead Story Image"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-110 saturate-50 group-hover:saturate-100"
                />
            </div>

            {/* Right side: Editorial Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-20 lg:p-24 relative z-20">
                <div className="flex items-center gap-4 mb-8">
                    <span className="h-[2px] w-12 bg-[#C9A84C]" />
                    <span className="font-ui font-black text-[#C9A84C] uppercase tracking-widest text-sm drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                        आजको कथा
                    </span>
                </div>

                <h2 className="font-display font-black text-5xl md:text-6xl text-stadium-white leading-[1.1] mb-8 tracking-[-0.04em] drop-shadow-xl animate-[fadeUpIn_1s_ease-out_both]">
                    "त्यो अन्तिम ओभर, जसले सङ्घर्षको परिभाषा बदल्यो।"
                </h2>

                <div className="flex items-center gap-4 mb-16 animate-[fadeUpIn_1s_ease-out_0.2s_both]">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] bg-[#152336]">
                        {/* Placeholder for author */}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-sans font-bold text-stadium-white">दीपेन्द्र सिंह ऐरी</span>
                        <span className="font-sans text-[#B0B8C8] text-sm uppercase tracking-wider font-semibold">खेलाडीको डायरीबाट</span>
                    </div>
                </div>

                <div className="animate-[fadeUpIn_1s_ease-out_0.4s_both]">
                    <button className="relative px-8 py-4 bg-transparent border-2 border-stadium-white/20 text-stadium-white font-ui font-bold uppercase tracking-widest text-sm overflow-hidden group hover:border-transparent transition-colors duration-300">
                        <div className="absolute inset-0 bg-stadium-white w-0 group-hover:w-full transition-all duration-500 ease-out z-0" />
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-[#07080F] transition-colors duration-300">
                            पूरा कथा पढ्नुस्
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
