"use client";

import Image from "next/image";
import Link from "next/link";

export default function StoriesGrid() {
    return (
        <section id="stories" className="w-full bg-[#07080F] px-6 py-24 relative z-20 border-b border-white/5 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Hook Section Title - Netflix Style Open Loop */}
                <div className="flex items-center gap-4 mb-12">
                    <span className="h-[2px] w-12 bg-[#C9A84C] shadow-[0_0_8px_#C9A84C]" />
                    <span className="font-stats font-bold text-[#C9A84C] uppercase tracking-widest text-xs drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                        ड्रेसिङ रुमका ती वर्गीकृत रहस्यहरू: जसले हारलाई संकल्पमा र आँसुलाई इतिहासमा बदल्यो
                    </span>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">

                    {/* Card 1: Lead Story — Monty Desai interview */}
                    <Link
                        href="/story/monty-desai-interview"
                        className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-sm min-h-[400px] md:min-h-0 block border border-white/10"
                        style={{ textDecoration: 'none' }}
                    >
                        <Image
                            src="/images/monty.jpg"
                            alt="Lead Story"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 saturate-[0.1] group-hover:saturate-[0.8] contrast-125 brightness-[0.7]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/40 to-transparent opacity-95 transition-opacity duration-500 z-10 mix-blend-multiply group-hover:opacity-85" />

                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="font-stats font-black text-[#C41E3A] text-[10px] uppercase tracking-[0.2em] mb-3 block">
                                बन्द कोठाभित्रको सत्य // MISSION CHRONICLE
                            </span>
                            <h3 className="font-sans font-black text-3xl md:text-5xl text-stadium-white leading-[1.15] mb-4 drop-shadow-lg group-hover:text-[#C9A84C] transition-colors">
                                &ldquo;त्यो एउटा बल जसले देशको भाग्य बदल्यो: प्रशिक्षक मोन्टी देसाईको गुप्त योजना र नेपाली क्रिकेटको स्वर्णिम भविष्य&rdquo;
                            </h3>
                            <p className="font-sans font-medium text-[#B0B8C8] text-sm md:text-base leading-relaxed line-clamp-3 max-w-2xl">
                                मुख्य प्रशिक्षक मोन्टी देसाईले नेपाली क्रिकेटको नवयुग र युवा खेलाडीहरूको क्षमताको भित्री रहस्य खोल्छन्। चरम दबाबको घडीमा उनले कोरेको रणनीति र विश्वकपको त्यो १ रनको घाउलाई शक्तिमा बदल्ने उनको गुप्त योजना के थियो?
                            </p>
                        </div>
                    </Link>

                    {/* Card 2: Sandeep's Googly analysis with BREATHTAKING ACTION BACKGROUND IMAGE */}
                    <Link
                        href="/story/sandeep-googly"
                        className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-sm min-h-[280px] md:min-h-0 block border border-white/10"
                        style={{ textDecoration: 'none' }}
                    >
                        <Image
                            src="/images/players/sandeep-lamichhane/action.webp"
                            alt="Sandeep Googly"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 saturate-[0.1] group-hover:saturate-[0.7] contrast-125 brightness-[0.6]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/50 to-transparent opacity-95 z-10 group-hover:opacity-85 transition-opacity" />

                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="font-stats font-black text-[#C9A84C] text-[9px] uppercase tracking-[0.2em] mb-2 block">
                                बलरको रहस्यमयी अस्त्र // TACTICAL WEAPON DECRYPTED
                            </span>
                            <h4 className="font-sans font-black text-xl md:text-2xl text-stadium-white leading-snug group-hover:text-[#C9A84C] transition-colors mb-3">
                                सन्दीपको त्यो रहस्यमयी गुगली: ब्याट्सम्यानलाई धराशायी बनाउने औंलाको जादू
                            </h4>
                            <span className="font-stats text-[#B0B8C8]/60 text-[9px] uppercase tracking-widest block">
                                ५ मिनेटको विश्लेषण पढाइ ↗
                            </span>
                        </div>
                    </Link>

                    {/* Card 3: Kushal's mindset interview with BREATHTAKING ACTION BACKGROUND IMAGE */}
                    <Link
                        href="/story/kushal-mindset"
                        className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-sm min-h-[280px] md:min-h-0 block border border-white/10"
                        style={{ textDecoration: 'none' }}
                    >
                        <Image
                            src="/images/players/kushal-bhurtel/action.jpg"
                            alt="Kushal Mindset"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 saturate-[0.1] group-hover:saturate-[0.7] contrast-125 brightness-[0.6]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/50 to-transparent opacity-95 z-10 group-hover:opacity-85 transition-opacity" />

                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="font-stats font-black text-[#C41E3A] text-[9px] uppercase tracking-[0.2em] mb-2 block">
                                योद्धाको मनोविज्ञान // INTEL TRANSCRIPT
                            </span>
                            <h4 className="font-sans font-black text-xl md:text-2xl text-stadium-white leading-snug group-hover:text-[#C9A84C] transition-colors mb-3">
                                अन्तहीन आक्रमण: कुशल भुर्तेलको निडर ब्याटिङ पछाडिको मनोवैज्ञानिक रणनीति
                            </h4>
                            <span className="font-stats text-[#B0B8C8]/60 text-[9px] uppercase tracking-widest block">
                                ३ मिनेटको अन्तर्वार्ता पढाइ ↗
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
