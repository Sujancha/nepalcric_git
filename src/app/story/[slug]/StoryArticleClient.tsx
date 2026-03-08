"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StoryArticleClient({ story }: { story: any }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-[#07080F] min-h-screen text-[#B0B8C8] selection:bg-[#C41E3A] selection:text-white">
            {/* 1. The Parallax Hero */}
            <div className="relative h-[80vh] md:h-screen w-full overflow-hidden border-b border-white/5">
                <div
                    className="absolute inset-0 w-full h-full object-cover scale-110"
                    style={{
                        transform: `translateY(${scrollY * 0.4}px) scale(1.05)`,
                        transition: "transform 0.1s cubic-bezier(0,0,0.5,1)"
                    }}
                >
                    <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-[#07080F] via-[#07080F]/60 to-transparent z-10" />
                    <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover saturate-50"
                    />
                </div>

                {/* Hero Content (Anchored to bottom) */}
                <div className="absolute inset-0 flex flex-col justify-end px-6 pb-20 md:pb-32 z-20 max-w-5xl mx-auto w-full">
                    <span className="font-sans font-bold text-[#C9A84C] uppercase tracking-widest text-sm mb-6 block drop-shadow-md animate-[fadeUpIn_1s_ease-out_both]">
                        {story.date}
                    </span>
                    <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-stadium-white leading-[1.05] tracking-[-0.03em] drop-shadow-2xl animate-[fadeUpIn_1s_ease-out_0.2s_both] mb-8">
                        {story.title}
                    </h1>

                    <div className="flex items-center gap-6 animate-[fadeUpIn_1s_ease-out_0.4s_both]">
                        <div className="w-12 h-12 rounded-full border border-[#C9A84C]/50 overflow-hidden bg-black/50 shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                            {/* Author Icon Placeholder */}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-sans font-bold text-[#C9A84C] text-lg lg:text-xl uppercase tracking-wider">{story.author}</span>
                            <span className="font-sans font-semibold text-[#B0B8C8]/60 text-xs tracking-widest uppercase">खेलाडीको डायरीबाट</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. The Deep Read Container */}
            <article className="relative z-30 pt-16 pb-32">
                <div className="max-w-3xl mx-auto px-6">

                    {/* Social Share Mock */}
                    <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-8">
                        <Link href="/" className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-[#B0B8C8] hover:text-white transition-colors flex items-center gap-2">
                            <span className="w-6 h-[1px] bg-white/30" />
                            आर्टिकल संग्रहमा फर्कनुस्
                        </Link>
                    </div>

                    <div className="font-sans text-xl md:text-2xl text-[#B0B8C8] leading-loose space-y-8 md:space-y-12">

                        <p className="first-letter:font-display first-letter:text-7xl first-letter:text-[#C41E3A] first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
                            क्रिकेट मैदानको बीचमा उभिंदा लाग्छ, यो केवल २२ यार्डको पिच होइन। यो त लाखौं नेपालीको सपना, आशा र सङ्घर्षको मञ्च हो। जब म ब्याट समातेर क्रीजमा जान्छु, म एक्लो हुन्न। मलाई पूरा देशले हेरिरहेको हुन्छ।
                        </p>

                        <p>
                            त्यो दिन युएईविरुद्धको म्याचमा दबाब सानो थिएन। लक्ष्य ठूलो थियो, विकेट गुम्दै थिए, र रन रेटले आकाश छुँदै थियो। तर ड्रेसिङ रुममा एउटा फरक ऊर्जा थियो। हामीले एकअर्कालाई हेर्‍यौं र भन्यौं, 'यो मात्र एउटा खेल हो, तर हाम्रा लागि यो जीवन हो।' त्यो ओभर... त्यो अन्तिम ओभरले क्रिकेटको इतिहास मात्र लेखेन, हाम्रो भविष्य पनि कोर्‍यो।
                        </p>

                        {/* 3. The 'Breakout' Pull Quotes */}
                        <blockquote className="relative my-20 -mx-6 md:-mx-16 lg:-mx-24 pl-8 md:pl-12 py-6 border-l-4 border-[#C9A84C] bg-gradient-to-r from-white/[0.03] to-transparent">
                            <span className="absolute top-0 left-6 font-display font-black text-[6rem] leading-none text-[#C9A84C]/20 select-none pointer-events-none -mt-8">
                                "
                            </span>
                            <p className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-stadium-white leading-[1.2] tracking-[-0.02em] drop-shadow-lg relative z-10">
                                हामीलाई थाहा थियो कि हामीसँग गुमाउन केही छैन, तर जित्नका लागि पूरा विश्व छ। त्यो क्षणमा सबै डरहरू हराए, र बाँकी रह्यो त केवल एउटा संकल्प—जसरी भए पनि जित्ने।
                            </p>
                        </blockquote>

                        <p>
                            जब बल बलरको हातबाट निस्कियो, समय रोकिए जस्तो लाग्यो। ब्याट र बलको सम्पर्कको त्यो आवाज... त्यो आवाजले मैदानमा रहेका हजारौं फ्यानहरूको मुटुको धड्कनलाई प्रतिध्वनित गर्यो। बल बाउन्ड्री पार गर्दा जुन गर्जन सुनियो, त्यो केवल खुसी थिएन, त्यो वर्षौंको सङ्घर्षपछिको मुक्ति थियो।
                        </p>

                        <p>
                            नेपाली क्रिकेटको यो यात्रा अझै लामो छ। हामी अझै सिक्दैछौं, अझै बढ्दैछौं। तर एउटा कुरा पक्का छ: अब हामी पछाडि फर्केर हेर्ने छैनौं। किनकि हाम्रा अगाडि खुल्ला आकाश छ, र हामी उड्न तयार छौं।
                        </p>

                    </div>
                </div>
            </article>

            {/* Recommended Context */}
            <div className="border-t border-white/5 bg-[#0D1B2A] py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#07080F] to-transparent opacity-50 pointer-events-none" />
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <span className="font-ui font-black text-[#C9A84C] uppercase tracking-widest text-sm drop-shadow-[0_0_8px_rgba(201,168,76,0.3)] mb-8 block text-center">
                        थप पढ्नुस्
                    </span>
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-sm p-8 group cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="font-sans font-bold text-[#1E3A8A] text-[10px] uppercase tracking-[0.15em] mb-4 block">अन्तर्वार्ता</span>
                        <h4 className="font-display font-black text-3xl text-stadium-white leading-tight group-hover:text-[#1E3A8A] transition-colors mb-2">
                            कुशल भुर्तेलको आक्रामक शैली पछाडिको मानसिकता
                        </h4>
                        <span className="font-sans font-semibold text-[#B0B8C8] text-sm uppercase tracking-wider">३ मिनेटको पढाइ</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
