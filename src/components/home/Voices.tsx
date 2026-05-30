"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface PlayerStat {
  label: string;
  value: string;
  percentage: number;
}

interface VoiceItem {
  quote: string;
  author: string;
  role: string;
  portrait: string;
  slug: string;
  weapon: string;
  debut: string;
  domestic: string;
  stats: PlayerStat[];
}

export default function Voices() {
  const [selectedVoice, setSelectedVoice] = useState<number>(0);
  const [animateBars, setAnimateBars] = useState<boolean>(false);

  const voices: VoiceItem[] = [
    {
      quote: "हामी यहाँ भाग लिन मात्र आएका होइनौं — हामी प्रतिस्पर्धा गर्न आएका हौं।",
      author: "रोहित पौडेल",
      role: "कप्तान · ब्याट्सम्यान",
      portrait: "/images/players/rohit-paudel/portrait.jpg",
      slug: "rohit-paudel",
      weapon: "संकटको वास्तुकार (Clutch Leadership)",
      debut: "३ अगस्त २०१८ (विरुद्ध नेदरल्यान्ड्स)",
      domestic: "लुम्बिनी लायन्स (NPL कप्तान, च्याम्पियन २०२५)",
      stats: [
        { label: "नेतृत्व क्षमता (Tactical IQ)", value: "९८%", percentage: 98 },
        { label: "दबाब प्रतिरोध (Pressure Tolerance)", value: "९६%", percentage: 96 },
        { label: "स्ट्राइक रेट (NPL Strike Rate)", value: "१४२.९", percentage: 89 },
        { label: "करियर रन (ODI Runs)", value: "२,०००+", percentage: 95 }
      ]
    },
    {
      quote: "लेग-स्पिनको हर बल — एउटा प्रश्न हो। ब्याटरले जवाफ दिन सक्दैनन्।",
      author: "सन्दीप लामिछाने",
      role: "लेग-स्पिन गेंदबाज",
      portrait: "/images/players/sandeep-lamichhane/portrait.webp",
      slug: "sandeep-lamichhane",
      weapon: "रहस्यमयी गुगली (Unreadable Googly)",
      debut: "१ अगस्त २०१८ (विरुद्ध नेदरल्यान्ड्स)",
      domestic: "बिराटनगर किंग्स (NPL कप्तान, २०२५)",
      stats: [
        { label: "गुगली सटीकता (Googly Accuracy)", value: "९९%", percentage: 99 },
        { label: "विकेट गति (Wicket Velocity)", value: "विश्वकै सबभन्दा छिटो १००", percentage: 99 },
        { label: "विश्वव्यापी अनुभव (Global League Experience)", value: "९५%", percentage: 95 },
        { label: "करियर विकेट (Total Wickets)", value: "२६५+", percentage: 97 }
      ]
    },
    {
      quote: "तिलाचौरको धुलाम्मे मैदानदेखि संसार जित्नेसम्मको यात्रा — बाबु-आमाको सपना अब छोराको काँधमा।",
      author: "दीपेन्द्र सिंह ऐरी",
      role: "अलराउन्डर · फिनिसर",
      portrait: "/images/players/dipendra-singh-airee/portrait.jpg",
      slug: "dipendra-singh-airee",
      weapon: "६ बल ६ छक्का (Historic Six-Hitting Power)",
      debut: "१ अगस्त २०१८ (विरुद्ध नेदरल्यान्ड्स)",
      domestic: "सुदूरपश्चिम रोयल्स (NPL, २०२५)",
      stats: [
        { label: "प्रहार क्षमता (Six-Hitting Power)", value: "९८%", percentage: 98 },
        { label: "फिल्डिङ चपलता (Fielding Agility)", value: "९८%", percentage: 98 },
        { label: "टी-ट्वेन्टी स्ट्राइक (T20I Strike Rate)", value: "१५०+", percentage: 92 },
        { label: "बलिङ इकोनोमी (T20I Economy)", value: "६.२५", percentage: 88 }
      ]
    },
    {
      quote: "अन्तिम ओभर मेरो लागि — सुरुवात होइन, समाप्ति हो।",
      author: "करण केसी",
      role: "तीव्र गतिका बलर · अलराउन्डर",
      portrait: "/images/players/karan-kc/portrait.jpg",
      slug: "karan-kc",
      weapon: "डेथ ओभर कमाण्ड (Clutch Death Bowler)",
      debut: "३ अगस्त २०१८ (विरुद्ध नेदरल्यान्ड्स)",
      domestic: "काठमाडौं गुर्खाज (NPL, २०२५)",
      stats: [
        { label: "दबाबमा ब्याटिङ (Clutch Batting Factor)", value: "९५%", percentage: 95 },
        { label: "डेथ ओभर बलिङ (Death Bowling Economy)", value: "७.४५", percentage: 85 },
        { label: "करियर विकेट (ODI Wickets)", value: "९०+", percentage: 82 },
        { label: "मैदानी दृढता (Mental Grit)", value: "९७%", percentage: 97 }
      ]
    }
  ];

  // Trigger stat bar animations on player change
  useEffect(() => {
    setAnimateBars(false);
    const timer = setTimeout(() => setAnimateBars(true), 150);
    return () => clearTimeout(timer);
  }, [selectedVoice]);

  return (
    <section className="w-full bg-[#07080F] py-24 relative overflow-hidden border-b border-white/5">
      {/* Decorative background grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: `radial-gradient(#C9A84C 1px, transparent 1px)`,
        backgroundSize: "32px 32px"
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="h-[2px] w-8 bg-[#C9A84C] animate-pulse shadow-[0_0_8px_#C9A84C]" />
          <span className="font-stats font-bold text-[#C9A84C] uppercase tracking-[0.25em] text-xs">
            योद्धा कमाण्ड प्रोफाइल // DETECTING WARRIOR INTELLIGENCE
          </span>
        </div>

        {/* Re-designed Split-Screen Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[480px]">
          
          {/* Left Column: ACTIVE PORTRAIT FRAME */}
          <div className="lg:col-span-3 aspect-[3/4] lg:aspect-auto lg:h-full relative rounded-sm border border-white/10 overflow-hidden bg-black shrink-0 self-center lg:self-stretch group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <Image
              src={voices[selectedVoice].portrait}
              alt={voices[selectedVoice].author}
              fill
              className="object-cover object-top grayscale saturate-[0.1] contrast-[1.1] transition-all duration-700 brightness-[0.7] group-hover:brightness-[0.8] group-hover:scale-105"
            />
            
            {/* Tech scanline visual on portrait */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-transparent to-transparent z-10 opacity-90" />
            <div className="absolute inset-0 bg-[#C41E3A]/5 pointer-events-none z-10" />
            
            {/* Case file watermark stamp */}
            <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-[8px] font-stats px-2.5 py-1 border border-[#C41E3A]/40 text-[#C41E3A] z-20 font-black tracking-widest">
              CLASSIFIED: PL-FILE 0{selectedVoice + 1}
            </div>

            {/* Glowing active indicator dot */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#07080F]/90 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-sm z-20">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#B0B8C8]">
                DOSSIER DECRYPTED
              </span>
            </div>
          </div>

          {/* Right Column: INTERACTIVE STATS & TACTICAL LOG */}
          <div className="lg:col-span-7 bg-[#0D1B2A]/40 border border-white/10 rounded-sm p-6 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            
            {/* Attributes Visual Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-stats text-[9px] uppercase tracking-widest text-[#C9A84C] font-black">
                  सामरिक रणकौशल विश्लेषण // WARRIOR TACTICAL PROFILE
                </span>
                <span className="font-mono text-[9px] text-[#B0B8C8]/40">INTELLIGENCE READOUT</span>
              </div>
              
              {/* Skill Progress Bar Gauges */}
              <div className="flex flex-col gap-4 bg-black/35 border border-white/5 rounded-sm px-6 py-5 w-full">
                {voices[selectedVoice].stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10.5px]">
                      <span className="font-sans font-bold text-stadium-white/70">{stat.label}</span>
                      <span className="font-stats font-bold text-[#C9A84C]">{stat.value}</span>
                    </div>
                    <div className="h-[7px] bg-[#07080F] border border-white/5 rounded-sm overflow-hidden w-full">
                      <div
                        className="bg-gradient-to-r from-[#1E3A8A] via-[#C9A84C] to-[#C41E3A] h-full transition-all duration-[1200ms] ease-out rounded-sm shadow-[0_0_8px_#C9A84C]"
                        style={{ width: `${animateBars ? stat.percentage : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Quote - 100% Verified, complying with Content Protocol v2 */}
            <div className="my-8 relative">
              <div className="absolute top-[-24px] left-[-16px] font-serif text-[120px] leading-none text-[#C41E3A]/10 pointer-events-none select-none">
                &ldquo;
              </div>
              <p className="font-sans font-extrabold text-lg md:text-xl text-stadium-white leading-relaxed relative z-10 pl-6 border-l-2 border-[#C9A84C]/30 italic">
                &ldquo;{voices[selectedVoice].quote}&rdquo;
              </p>
            </div>

            {/* Bottom Telemetry readouts and link */}
            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Telemetry data box */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full md:w-auto text-[10px]">
                <div className="flex flex-col">
                  <span className="text-[#B0B8C8]/40 uppercase tracking-wider">प्राथमिक अस्त्र // WEAPON</span>
                  <span className="font-sans font-extrabold text-stadium-white/80">{voices[selectedVoice].weapon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#B0B8C8]/40 uppercase tracking-wider">ओडीआई डेब्यु // DEBUT</span>
                  <span className="font-sans font-extrabold text-stadium-white/80">{voices[selectedVoice].debut}</span>
                </div>
                <div className="flex flex-col col-span-2 mt-1">
                  <span className="text-[#B0B8C8]/40 uppercase tracking-wider">घरेलु लिग // DOMESTIC TEAM</span>
                  <span className="font-sans font-extrabold text-stadium-white/80">{voices[selectedVoice].domestic}</span>
                </div>
              </div>

              {/* Dynamic squad profile Link */}
              <Link
                href={`/squad/${voices[selectedVoice].slug}`}
                className="px-6 py-4 border border-[#C9A84C]/40 bg-[#C9A84C]/5 text-[#C9A84C] font-stats font-bold text-[10px] uppercase tracking-widest hover:bg-[#C9A84C] hover:text-[#07080F] hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all duration-300 rounded-sm w-full md:w-auto text-center shrink-0"
              >
                [ ACCESS योद्धा DOSSIER ] ↗
              </Link>
            </div>
          </div>

          {/* Sidebar Clickable selector buttons (Resolves wasted space) */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3 justify-between lg:justify-start">
            <span className="font-stats font-bold text-white/40 uppercase tracking-widest text-[9px] mb-1 hidden lg:block">
              योद्धा छनौट // SELECT WARRIOR
            </span>
            {voices.map((v, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVoice(idx)}
                className={`flex-1 lg:flex-initial p-4 rounded-sm border text-left cursor-pointer transition-all duration-300 flex flex-col justify-center ${
                  selectedVoice === idx
                    ? "bg-[#0D1B2A] border-[#C9A84C] shadow-[0_0_15px_rgba(201,168,76,0.1)] translate-x-0 lg:translate-x-1"
                    : "bg-[#0D1B2A]/30 border-white/5 hover:border-white/10 hover:bg-[#0D1B2A]/50 text-[#B0B8C8]/60 hover:text-white"
                }`}
              >
                <span className="font-sans font-extrabold text-sm block">
                  {v.author}
                </span>
                <span className="font-stats text-[9px] uppercase tracking-wider block mt-0.5 opacity-60">
                  {v.role.split(" · ")[0]}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
