import Link from 'next/link';
import Image from 'next/image';

export default function JourneyArchives() {
    const journeys = [
        { id: "sandeep-lamichhane", name: "सन्दीप लामिछाने", subtitle: "सियाङ्जाको आगो, विश्वको भय", image: "/images/sandeep.webp" },
        { id: "dipendra-singh-airee", name: "दीपेन्द्र सिंह ऐरी", subtitle: "नौ बलमा इतिहास बदल्नेवाला", image: "/images/dipendra_airee.jpg" },
        { id: "kushal-bhurtel", name: "कुशल भुर्तेल", subtitle: "पावरप्लेको बाघ, बुटवलको गौरव", image: "/images/kushal_bhurtel.webp" },
        { id: "rohit-paudel", name: "रोहित पौडेल", subtitle: "बीस वर्षमा काँधमा देश", image: "/images/rohit_paudel.jpg" },
    ];

    return (
        <section className="py-24 bg-[#0D1B2A] relative overflow-hidden border-t border-white/5 border-b mt-1">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="text-center mb-16">
                    <span className="font-sans font-bold text-[#C9A84C] uppercase tracking-widest text-sm mb-4 block animate-[fadeUpIn_1s_ease-out_both]">
                        लकर रुमभित्र
                    </span>
                    <h2 className="font-display uppercase text-5xl md:text-6xl text-stadium-white animate-[fadeUpIn_1s_ease-out_0.2s_both]">
                        अविस्मरणीय <span className="text-[#B0B8C8]">यात्राहरू</span>
                    </h2>
                    <p className="font-sans text-[#B0B8C8] text-lg mt-6 max-w-2xl mx-auto animate-[fadeUpIn_1s_ease-out_0.4s_both]">
                        तथ्याङ्क रेकर्डमा छन् — तर कथाहरू यहाँ छन्। ती मान्छेहरूका, जसले देशको नाम बोकेर मैदानमा उत्रिए।
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {journeys.map((journey, i) => (
                        <Link
                            key={i}
                            href={`/squad/${journey.id}`}
                            className="group relative h-[450px] w-full rounded-sm overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 block flex-shrink-0"
                            style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(201, 168, 76, 0.2)',
                                backdropFilter: 'blur(12px)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}
                        >
                            {/* Hover Gold Glow Effect */}
                            <div className="absolute inset-0 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/80 transition-colors duration-500 z-30 pointer-events-none rounded-sm shadow-[inset_0_0_20px_rgba(201,168,76,0)] group-hover:shadow-[inset_0_0_30px_rgba(201,168,76,0.2)]" />

                            {/* Image Container with precise bounding box */}
                            <div className="absolute inset-x-2 top-2 bottom-[140px] bg-black/40 overflow-hidden mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700">
                                <Image
                                    src={journey.image}
                                    fill
                                    priority={i < 4}
                                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90 grayscale group-hover:grayscale-0"
                                    alt={journey.name}
                                />
                            </div>

                            {/* Shadow Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />

                            {/* Text Focus with Glassmorphism */}
                            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                                <span className="font-sans font-bold text-[#C9A84C] text-[11px] uppercase mb-2 block tracking-[0.1em] opacity-80 group-hover:opacity-100 transition-opacity">
                                    सुरुवाती कथा
                                </span>
                                <h3 className="font-display uppercase text-3xl text-stadium-white leading-tight mb-4 drop-shadow-md">
                                    {journey.subtitle}
                                </h3>
                                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                                    <span className="font-sans text-[#B0B8C8] font-medium group-hover:text-stadium-white transition-colors">{journey.name}</span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#C9A84C] transition-colors border border-white/10 group-hover:border-[#C9A84C]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#07080F]"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/kathaharu" className="relative inline-block px-8 py-4 bg-transparent border border-[#C9A84C]/50 font-sans font-medium text-stadium-white hover:text-[#07080F] hover:bg-[#C9A84C] hover:border-[#C9A84C] shadow-[0_0_15px_rgba(201,168,76,0)] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all overflow-hidden group">
                        <span className="relative z-10 uppercase tracking-widest text-sm text-[13px]">सबै कथाहरू हेर्नुस्</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
