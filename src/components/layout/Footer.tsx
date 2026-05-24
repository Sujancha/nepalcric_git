"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="w-full bg-[#07080F] border-t border-white/5 py-24 px-6 md:px-12 flex flex-col items-center">
            {/* Faded Ghost Logo */}
            <div className="flex flex-col items-center gap-4 opacity-20 hover:opacity-40 transition-opacity duration-700 mb-12 group cursor-default">
                <div className="text-[#C41E3A] text-[40px] group-hover:scale-110 transition-transform duration-500">◈</div>
                <div className="font-barlow font-bold uppercase text-[32px] tracking-[0.2em] text-white">
                    NEPAL<span className="text-[#C41E3A]">CRIC</span>
                </div>
            </div>

            {/* Devanagari Copyright */}
            <p className="font-mukta text-[#B0B8C8]/40 text-sm mb-12 tracking-wide">
                © २०२६ नेपालक्रिक। सर्वाधिकार सुरक्षित।
            </p>

            {/* Dimmed Legal Links */}
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                <Link href="/contact" className="font-stats text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-[#C9A84C] transition-colors">
                    सम्पर्क
                </Link>
                <Link href="/terms" className="font-stats text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-[#C9A84C] transition-colors">
                    नियम र सर्त
                </Link>
                <Link href="/privacy" className="font-stats text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-[#C9A84C] transition-colors">
                    गोपनीयता नीति
                </Link>
            </div>
        </footer>
    );
}
