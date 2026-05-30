"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface ChapterItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  teaser: string;
  image: string;
  date: string;
  stat: string;
  slug: string;
}

export default function HeroSection({ scoreboardData }: { scoreboardData?: any }) {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hasVisited")) {
      setShowPreloader(false);
    } else {
      const timer = setTimeout(() => {
        setShowPreloader(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chapters: ChapterItem[] = [
    {
      id: "chapter-01",
      index: "अध्याय १",
      title: "पहिलो गर्जन",
      subtitle: "विश्वकप डेब्यु // मार्च २०१४",
      teaser: "चटगाउँको त्यो ऐतिहासिक बिहान, जहाँ कप्तान पारस खड्काले १५,००० दर्शकको गर्जनबीच नेपालको पहिलो विश्वकपको विजयी यात्रा सुरुवात गरेका थिए। अभाव र संघर्षको जगबाट अन्तर्राष्ट्रिय मञ्चमा नेपालको पहिलो छाप।",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "चटगाउँ, २०१४",
      stat: "८० रनको विशाल जित",
      slug: "story-01"
    },
    {
      id: "chapter-02",
      index: "अध्याय २",
      title: "प्रतिबन्ध र ओडीआई हैसियत",
      subtitle: "कालो बादल र उज्यालो // २०१६–२०१९",
      teaser: "सरकारी हस्तक्षेपले क्यान निलम्बनमा हुँदा, बिना तलब र सुविधाहरू पसिना बगाउँदै जिम्बाब्वेको तातो मैदानमा नेपालले पहिलो पटक ऐतिहासिक एकदिवसीय (ODI) मान्यता प्राप्त गरेको रात।",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "जिम्बाब्वे, २०१८",
      stat: "३ वर्षको निलम्बन लडाइँ",
      slug: "story-12"
    },
    {
      id: "chapter-03",
      index: "अध्याय ३",
      title: "डलास र सेन्ट भिन्सेन्टको घाउ",
      subtitle: "एक रनको कठोर पीडा // जुन २०२४",
      teaser: "डलास र सेन्ट भिन्सेन्टको त्यो क्रुर १ रनको पराजय, जहाँ नेपाल ऐतिहासिक जितको यति नजिक पुगेर पनि फर्कनु पर्यो — तर टेस्ट राष्ट्रहरूलाई उनीहरूकै मैदानमा दिएको दह्रो चुनौती।",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "सेन्ट भिन्सेन्ट, २०२४",
      stat: "१ रनको ऐतिहासिक टक्कर",
      slug: "story-06"
    },
    {
      id: "chapter-04",
      index: "अध्याय ४",
      title: "वान्खेडेको बदला र मुक्ति",
      subtitle: "१२ वर्षपछिको विश्वकप जित // फेब्रुअरी २०२६",
      teaser: "वान्खेडेको ग्यालरीमा नेपाली फ्यानको चिच्याहटबीच स्कटल्यान्डलाई ३ विकेटले पराजित गर्दै, कप्तान रोहित पौडेलको टोलीले ११ वर्ष ११ महिनाको लामो प्रतीक्षा तोडेको ऐतिहासिक रात।",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "वान्खेडे, २०२६",
      stat: "१२ वर्षपछिको स्वर्णिम जित",
      slug: "story-05"
    }
  ];

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] bg-[#07080F] overflow-hidden flex flex-col justify-between py-16 px-6 md:px-12 lg:px-16 border-b border-white/5">
      
      {/* 1. GOOSEBUMPS PRELOADER */}
      {showPreloader && (
        <div className="fixed inset-0 z-[9999] bg-[#07080F] flex items-center justify-center pointer-events-none animate-[preloaderOverlayFade_3s_linear_forwards]">
          <svg width="200" height="250" viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M40 20 L160 110 L80 110 L180 230 L40 230 Z"
              stroke="#C41E3A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1500"
              strokeDashoffset="1500"
              className="animate-[traceDraw_1.6s_cubic-bezier(0.76,0,0.24,1)_forwards]"
            />
          </svg>
        </div>
      )}

      {/* Decorative scanning line grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, #C9A84C 1px, transparent 1px)`,
        backgroundSize: "28px 28px"
      }} />

      {/* SECTION HEADER */}
      <div className="relative z-20 max-w-4xl mb-12 animate-[fadeUpIn_1s_ease-out_both]">
        <div className="flex items-center gap-4 mb-3">
          <span className="h-[2px] w-8 bg-[#C9A84C] animate-pulse shadow-[0_0_8px_#C9A84C]" />
          <span className="font-stats font-bold text-[#C9A84C] uppercase tracking-[0.25em] text-[10px]">
            रणमैदानको वृत्तचित्र अध्याय // THE RHINO CHRONICLES: CHAPTER SELECTOR
          </span>
        </div>
        <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl text-stadium-white leading-none">
          रंगशालाको सपनादेखि <span className="text-[#C41E3A] drop-shadow-[0_0_15px_rgba(196,30,58,0.4)]">वान्खेडेको इतिहाससम्म:</span> चार स्वर्णिम मोड
        </h2>
        <p className="font-sans text-[#B0B8C8] text-sm md:text-base mt-4 max-w-3xl leading-relaxed">
          बालेन्द्र शाहको रंगशालाको गुप्त कूटनीतिपछि नेपाली क्रिकेटको वास्तविक महासंग्राम सुरु हुन्छ। ती चार ऐतिहासिक लडाइँ र स्वर्णिम मोडहरू — जसले हामीलाई अभावको हिलोबाट वान्खेडेको फ्लडलाइटसम्म पुर्‍यायो।
        </p>
      </div>

      {/* INTERACTIVE DOCUMENTARY TIMELINE CHAPTER GRID */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-4 gap-6 w-full flex-grow min-h-[380px] items-stretch animate-[fadeUpIn_1s_ease-out_0.2s_both]">
        {chapters.map((ch, idx) => {
          const isActive = activeChapter === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveChapter(idx)}
              onMouseLeave={() => setActiveChapter(null)}
              className={`group relative rounded-sm border overflow-hidden cursor-pointer bg-black/40 flex flex-col justify-between p-6 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                isActive
                  ? "border-[#C9A84C] flex-[1.4] translate-y-[-8px] shadow-[0_0_30px_rgba(201,168,76,0.15)]"
                  : "border-white/5 hover:border-white/20"
              }`}
              style={{ flex: isActive ? "1.4" : "1" }}
            >
              {/* Background desaturated-to-color Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={ch.image}
                  alt={ch.title}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    isActive ? "scale-105 grayscale-0 brightness-[0.4]" : "grayscale saturate-[0.1] brightness-[0.25]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10" />
              </div>

              {/* Top classified metrics */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="font-stats font-bold text-[#C9A84C] text-[10px] tracking-wider uppercase bg-[#07080F]/90 border border-[#C9A84C]/30 px-2.5 py-1 rounded-sm shadow-md">
                  {ch.index}
                </span>
                <span className="font-mono text-[8px] text-[#B0B8C8]/30">T-FILE 0{idx+1}</span>
              </div>

              {/* Bottom Details (Expands smoothly on active hover) */}
              <div className="relative z-10 mt-20">
                <span className="font-stats text-[9px] uppercase tracking-widest text-[#C41E3A] font-black block mb-1">
                  {ch.subtitle}
                </span>
                <h3 className="font-sans font-black text-xl lg:text-2xl text-stadium-white leading-tight mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                  {ch.title}
                </h3>

                {/* The dynamic drawer teaser */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isActive ? "max-h-[140px] opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}>
                  <p className="font-sans text-[#B0B8C8]/90 text-xs md:text-sm leading-relaxed mb-4 border-l border-[#C9A84C]/35 pl-3 py-0.5">
                    {ch.teaser}
                  </p>
                  
                  {/* Visual stat badge */}
                  <div className="flex justify-between items-center bg-black/45 border border-white/5 p-2 rounded-sm mb-4 text-[9px]">
                    <span className="text-[#B0B8C8]/50 uppercase tracking-widest">निर्णायक क्षण // STAT</span>
                    <span className="font-sans font-bold text-[#C9A84C]">{ch.stat}</span>
                  </div>

                  <Link
                    href={`/locker-room/${ch.slug}`}
                    className="w-full block text-center py-2.5 bg-[#C9A84C] text-[#07080F] font-stats font-bold uppercase tracking-widest text-[9px] rounded-sm hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  >
                    [ ACCESS CHAPTER TAPE ] ↗
                  </Link>
                </div>
              </div>

              {/* Glowing visual indicators at card bottom */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C9A84C]/35 to-transparent transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500" />
            </div>
          );
        })}
      </div>

      {/* BOTTOM HUD PANEL */}
      <div className="relative z-20 flex justify-between items-center w-full border-t border-white/5 pt-6 mt-12 text-[8px] font-mono text-stadium-white/20 animate-[fadeUpIn_1s_ease-out_0.4s_both]">
        <span>TIMELINE READOUT: २०१४ - २०२६ // SECURE DATABASE SYSTEM</span>
        <span>COORD CALIBRATION: ACTIVE MAP INTERSECTION</span>
      </div>
    </section>
  );
}
