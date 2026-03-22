"use client";

import Image from "next/image";

export default function StoriesGrid() {
    return (
        <section className="w-full bg-[#07080F] px-6 py-24 relative z-20 border-b border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <span className="h-[2px] w-12 bg-[#C9A84C]" />
                    <span className="font-ui font-black text-[#C9A84C] uppercase tracking-widest text-sm drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                        विशेष कथाहरू
                    </span>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                    {/* Card 1: Lead Story */}
                    <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-sm min-h-[400px] md:min-h-0">
                        <Image
                            src="/images/monty.jpg"
                            alt="Lead Story"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 saturate-50 group-hover:saturate-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/40 to-transparent opacity-90 transition-opacity duration-500 z-10 mix-blend-multiply group-hover:opacity-80" />

                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="font-display font-black text-4xl md:text-5xl text-stadium-white leading-[1.1] mb-4 drop-shadow-lg group-hover:text-[#C41E3A] transition-colors">
                                &ldquo;हाम्रो लक्ष्य विश्वकप मात्र होइन, पुस्ता निर्माण हो।&rdquo;
                            </h3>
                            <p className="font-sans font-medium text-[#B0B8C8] line-clamp-2 max-w-xl">
                                मुख्य प्रशिक्षक मोन्टी देसाईले नेपाली क्रिकेटको भविष्य र नयाँ खेलाडीहरूको सम्भावनाबारे खुलेर कुरा गरे।
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="md:col-span-1 md:row-span-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-sm p-6 flex flex-col justify-between relative overflow-hidden group hover:bg-white/10 transition-colors cursor-pointer min-h-[200px]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                        <div className="relative z-10">
                            <span className="font-ui font-bold text-[#C9A84C] text-[10px] uppercase tracking-[0.15em] mb-4 block">
                                विश्लेषण
                            </span>
                            <h4 className="font-display font-black text-2xl text-stadium-white leading-tight group-hover:text-[#C9A84C] transition-colors">
                                सन्दीपको गुगली: विज्ञान र कला
                            </h4>
                        </div>
                        <span className="font-sans text-[#B0B8C8]/60 text-xs font-semibold uppercase tracking-widest relative z-10">
                            ५ मिनेटको पढाइ
                        </span>
                    </div>

                    {/* Card 3 */}
                    <div className="md:col-span-1 md:row-span-1 bg-[#0D1B2A] border border-white/10 rounded-sm p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#1E3A8A]/50 transition-colors cursor-pointer min-h-[200px]">
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#1E3A8A] blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
                        <div className="relative z-10">
                            <span className="font-ui font-bold text-[#1E3A8A] text-[10px] uppercase tracking-[0.15em] mb-4 block">
                                अन्तर्वार्ता
                            </span>
                            <h4 className="font-display font-black text-2xl text-stadium-white leading-tight group-hover:text-[#1E3A8A] transition-colors">
                                कुशल भुर्तेलको आक्रामक शैली पछाडिको मानसिकता
                            </h4>
                        </div>
                        <span className="font-sans text-[#B0B8C8]/60 text-xs font-semibold uppercase tracking-widest relative z-10">
                            ३ मिनेटको पढाइ
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
