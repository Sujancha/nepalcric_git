"use client";

import Head from "next/head";

export default function TermsPage() {
    return (
        <div className="bg-[#07080F] min-h-screen relative overflow-hidden">
            <Head>
                <title>नियम र सर्त | NepalCric</title>
            </Head>

            {/* Ghost Flag Watermark */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[120px] opacity-[0.04] select-none">
                    <svg width="600" height="900" viewBox="0 0 200 250" fill="#C41E3A" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40 20 L160 110 L80 110 L180 230 L40 230 Z" />
                    </svg>
                </div>
            </div>

            <main className="relative z-10 max-w-4xl mx-auto px-6 py-32 md:py-48">
                <h1 className="font-sans font-extrabold text-white text-[clamp(52px,8vw,100px)] leading-[0.85] tracking-tight mb-20 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    नियम र सर्त
                </h1>

                <div className="flex flex-col gap-12 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_0.2s_both]">
                    <section className="flex flex-col gap-4">
                        <h2 className="font-mukta font-bold text-white text-2xl tracking-tight">१. स्वीकृत जानकारी</h2>
                        <p className="font-mukta text-white/70 text-lg leading-relaxed">
                            नेपालक्रिक वेबसाइट प्रयोग गर्नुभएकोमा धन्यवाद। यो वेबसाइट प्रयोग गर्दा तपाईं यहाँ उल्लेखित नियम र सर्तहरूसँग सहमत हुनुहुन्छ भन्ने मानिनेछ। यदि तपाईं यी सर्तहरूसँग सहमत हुनुहुन्न भने, कृपया यो वेबसाइट प्रयोग नगर्नुहोला।
                        </p>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="font-mukta font-bold text-white text-2xl tracking-tight">२. सामग्रीको अधिकार</h2>
                        <p className="font-mukta text-white/70 text-lg leading-relaxed">
                            यस वेबसाइटमा प्रकाशित सबै सामग्रीहरू, फोटो, भिडियो, र पाठहरू नेपालक्रिकको स्वामित्वमा रहेका छन्। यी सामग्रीहरू हाम्रो पूर्व अनुमति बिना अन्यत्र कपी वा पुन: प्रकाशन गर्न कडा मनाही छ।
                        </p>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="font-mukta font-bold text-white text-2xl tracking-tight">३. प्रयोगकर्ताको आचरण</h2>
                        <p className="font-mukta text-white/70 text-lg leading-relaxed">
                            वेबसाइट प्रयोग गर्दा तपाईंले कुनै पनि गैरकानुनी वा आपत्तिजनक गतिविधिमा संलग्न नहुने प्रतिबद्धता जनाउनुपर्नेछ। हामी कुनै पनि समयमा बिना सूचना प्रयोगकर्ताको पहुँच रद्द गर्ने अधिकार सुरक्षित राख्दछौं।
                        </p>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="font-mukta font-bold text-white text-2xl tracking-tight">४. नियममा परिवर्तन</h2>
                        <p className="font-mukta text-white/70 text-lg leading-relaxed">
                            हामीले यी नियमहरू कुनै पनि समयमा परिवर्तन गर्न सक्छौं। वेबसाइटको अपडेट गरिएको सर्तहरू हेर्नु प्रयोगकर्ताको जिम्मेवारी हुनेछ। निरन्तर प्रयोगले तपाईं नयाँ सर्तहरूसँग सहमत हुनुहुन्छ भन्ने जनाउँछ।
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
