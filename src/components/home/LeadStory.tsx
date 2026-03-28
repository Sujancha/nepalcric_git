import Link from "next/link";
import Image from "next/image";

interface LeadStoryProps {
    image: string;
    quote: string;
    name: string;
    attribution: string;
    ctaText: string;
    ctaHref: string;
}

export default function LeadStory({ image, quote, name, attribution, ctaText, ctaHref }: LeadStoryProps) {
    return (
        <section className="w-full bg-[#07080F] border-b border-white/5 relative overflow-hidden flex flex-col lg:flex-row min-h-screen">
            {/* Left side: Dramatic full-bleed photo */}
            <div className="w-full lg:w-[55%] aspect-[4/3] lg:aspect-auto lg:min-h-screen relative group cursor-pointer overflow-hidden">
                {/* Right-edge blend into content */}
                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#07080F] to-transparent z-10 hidden lg:block" />
                {/* Bottom blend for mobile */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07080F] to-transparent z-10 lg:hidden" />

                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        priority
                        className="object-cover object-top transition-transform duration-[12s] ease-out group-hover:scale-105"
                        style={{ filter: 'brightness(0.75) contrast(1.05) saturate(0.6)' }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#111111]">
                        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', opacity: 0.5 }}>
                            {name}
                        </span>
                    </div>
                )}
            </div>

            {/* Right side: Editorial Content */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-24 lg:py-0 relative z-20">
                {/* Label */}
                <div className="flex items-center gap-4 mb-10">
                    <span className="h-[2px] w-12 bg-[#C9A84C]" />
                    <span className="font-ui font-black text-[#C9A84C] uppercase tracking-widest text-xs drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                        आजको कथा
                    </span>
                </div>

                {/* Hero headline — no quote marks, pure statement */}
                <h2 className="font-display font-black text-[#F0EDE8] leading-[1.0] mb-6 tracking-[-0.02em] drop-shadow-xl animate-[fadeUpIn_1s_ease-out_both]"
                    style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}>
                    {quote}
                </h2>

                {/* Attribution */}
                <div className="flex flex-col gap-1 mb-12 pl-1 animate-[fadeUpIn_1s_ease-out_0.2s_both]">
                    <span className="font-sans font-bold text-stadium-white text-lg">{name}</span>
                    <span className="font-sans text-[#B0B8C8] text-sm tracking-wider">{attribution}</span>
                </div>

                {/* CTA */}
                <div className="animate-[fadeUpIn_1s_ease-out_0.4s_both]">
                    <Link
                        href={ctaHref}
                        className="relative inline-flex px-10 py-5 bg-transparent border-2 border-[#C9A84C]/40 text-[#C9A84C] font-ui font-bold uppercase tracking-widest text-sm overflow-hidden group hover:border-[#C9A84C] transition-colors duration-300"
                    >
                        <div className="absolute inset-0 bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500 ease-out z-0" />
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-[#07080F] transition-colors duration-300">
                            {ctaText}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
