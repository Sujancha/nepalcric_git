import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { stories } from "@/lib/storiesData";

export const metadata: Metadata = {
    title: "कथाहरू",
    description: "नेपाली क्रिकेटका ती क्षणहरू जो इतिहास बने",
};

export default function StoriesArchivePage() {
    const featuredStories = stories.filter(s => s.featured);
    const allStories = stories;

    return (
        <div className="bg-[#07080F] min-h-screen text-[#B0B8C8] selection:bg-[#C41E3A] selection:text-white pb-32">

            {/* 1. Cinematic Hero */}
            <section className="relative h-[60vh] w-full overflow-hidden flex flex-col justify-center items-center text-center px-6">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: 'brightness(0.3) contrast(1.2)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#07080F]/80 via-[#07080F]/40 to-[#07080F]" />

                <div className="relative z-10 animate-[fadeUpIn_1s_ease-out_both]">
                    <h1 className="font-display font-black text-7xl md:text-9xl text-stadium-white uppercase tracking-tight mb-4 drop-shadow-2xl">
                        कथाहरू
                    </h1>
                    <p className="font-sans italic text-white/50 text-xl md:text-2xl tracking-wide">
                        नेपाली क्रिकेटका ती क्षणहरू जो इतिहास बने
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-20 relative z-20">

                {/* 2. Balen Shah Special Card */}
                <div className="max-w-[900px] mx-auto mb-32 group">
                    <Link href="/balen-shah">
                        <div className="bg-[#0A0A0A] border border-[#C9A84C]/30 p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 hover:border-[#C41E3A] hover:bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_50px_rgba(196,30,58,0.1)]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-20 bg-[#C9A84C]/50 group-hover:bg-[#C41E3A] transition-colors" />

                            <span className="font-sans font-bold text-[#C9A84C] text-[10px] uppercase tracking-[0.3em] mb-8">
                                विशेष कथा
                            </span>

                            <h2 className="font-display font-black text-4xl md:text-6xl text-stadium-white uppercase mb-6 leading-none">
                                उनले आफैलाई मेटाए
                            </h2>

                            <p className="font-sans text-[#B0B8C8]/80 text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed">
                                बालेन्द्र शाह — र्यापर। इन्जिनियर। मेयर। प्रधानमन्त्री-मनोनीत।
                            </p>

                            <span className="font-sans font-bold text-[#C41E3A] text-sm uppercase tracking-widest border-b border-[#C41E3A] pb-1 group-hover:text-white group-hover:border-white transition-all">
                                पूरा कथा पढ्नुस् →
                            </span>
                        </div>
                    </Link>
                </div>

                {/* 3. Featured Stories Grid */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <h3 className="font-display font-black text-3xl text-stadium-white uppercase tracking-wider">विशेष सामग्री</h3>
                        <div className="h-[1px] flex-grow bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {featuredStories.map((story) => (
                            <Link key={story.slug} href={`/story/${story.slug}`} className="group relative block aspect-[16/10] overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-[#C9A84C] transition-all duration-500">
                                <Image
                                    src={story.heroImage}
                                    alt={story.title}
                                    fill
                                    className="object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <span className="font-sans font-bold text-[#C41E3A] text-[10px] uppercase tracking-widest mb-3">{story.category}</span>
                                    <h4 className="font-display font-black text-3xl text-stadium-white uppercase mb-3 leading-tight">{story.title}</h4>
                                    <p className="font-sans text-white/60 text-sm line-clamp-2 mb-4">{story.lede}</p>
                                    <span className="font-sans font-bold text-white/30 text-[9px] uppercase tracking-widest">{story.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 4. All Stories List */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <h3 className="font-display font-black text-3xl text-stadium-white uppercase tracking-wider">सबै कथाहरू</h3>
                        <div className="h-[1px] flex-grow bg-white/10" />
                    </div>

                    <div className="space-y-12">
                        {allStories.map((story) => (
                            <Link key={story.slug} href={`/story/${story.slug}`} className="group flex flex-col md:flex-row gap-8 items-start hover:translate-x-2 transition-transform duration-300">
                                <div className="relative w-full md:w-64 aspect-video overflow-hidden border border-white/5">
                                    <Image
                                        src={story.heroImage}
                                        alt={story.title}
                                        fill
                                        className="object-cover grayscale-[80%] group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="flex-grow pt-2 border-b border-white/5 pb-10 w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-sans font-bold text-[#C9A84C]/60 text-[9px] uppercase tracking-widest">{story.category}</span>
                                        <span className="font-sans font-bold text-white/20 text-[9px] uppercase tracking-widest">{story.date}</span>
                                    </div>
                                    <h4 className="font-display font-black text-2xl text-stadium-white uppercase mb-2 group-hover:text-[#C41E3A] transition-colors">{story.title}</h4>
                                    <p className="font-sans text-[#B0B8C8] text-base leading-relaxed line-clamp-2">{story.lede}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
