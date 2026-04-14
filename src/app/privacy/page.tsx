import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "गोपनीयता नीति",
    description: "नेपालक्रिकको गोपनीयता नीति",
};

export default function PrivacyPage() {
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
                <h1 className="font-sans font-extrabold text-white text-[clamp(52px,8vw,100px)] leading-[0.85] tracking-tight mb-20 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    गोपनीयता नीति
                </h1>

                <div className="flex flex-col gap-12 animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_0.2s_both]">
                    <section className="flex flex-col gap-4">
                        <h2 className="font-mukta font-bold text-white text-2xl tracking-tight">१. तथ्याङ्क सङ्कलन</h2>
                        <p className="font-mukta text-white/70 text-lg leading-relaxed">
                            नेपालक्रिकले तपाइँको अनुभव सुधार्नका लागि सामान्य ब्राउजिङ तथ्याङ्कहरू सङ्कलन गर्दछ। यसमा तपाइँको डिभाइसको जानकारी, ब्राउजरको प्रकार र तपाइँले हाम्रो वेबसाइटमा बिताउनुभएको समय समावेश हुन सक्छ।
                        </p>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="font-mukta font-bold text-white text-2xl tracking-tight">२. कुकीजको प्रयोग</h2>
                        <p className="font-mukta text-white/70 text-lg leading-relaxed">
                            हामी राम्रो युजर इन्टरफेस र सुविधाहरू प्रदान गर्नका लागि कुकीजहरू प्रयोग गर्दछौं। तपाइँले आफ्नो ब्राउजरको सेटिङबाट कुकीजहरू बन्द गर्न सक्नुहुन्छ, यद्यपि यसले वेबसाइटका केही सुविधाहरूमा असर पार्न सक्छ।
                        </p>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="font-mukta font-bold text-white text-2xl tracking-tight">३. तथ्याङ्क सुरक्षा</h2>
                        <p className="font-mukta text-white/70 text-lg leading-relaxed">
                            हामी तपाइँको जानकारी सुरक्षित राख्नका लागि उच्च स्तरको सुरक्षा प्रणाली प्रयोग गर्दछौं। तपाइँको व्यक्तिगत जानकारी हाम्रो अनुमति बिना तेस्रो पक्षलाई बिक्री वा साझेदारी गरिने छैन।
                        </p>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="font-mukta font-bold text-white text-2xl tracking-tight">४. सम्पर्क</h2>
                        <p className="font-mukta text-white/70 text-lg leading-relaxed">
                            यदि तपाइँसँग हाम्रो गोपनीयता नीतिका बारेमा कुनै प्रश्नहरू छन् भने, कृपया हामीलाई सम्पर्क पृष्ठ मार्फत सम्पर्क गर्नुहोला।
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
