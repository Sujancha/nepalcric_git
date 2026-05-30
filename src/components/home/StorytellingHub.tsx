"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Film, Volume2, Shield, Flame, Activity } from "lucide-react";

interface FilmChapter {
  id: string;
  chapterCode: string;
  title: string;
  subtitle: string;
  quote: string;
  speaker: string;
  description: string;
  image: string;
  thumb: string;
  videoId: string;
  slug: string;
  telemetry: { label: string; value: number }[];
}

export default function StorytellingHub({ stories }: { stories?: any }) {
  const [selectedChapter, setSelectedChapter] = useState<number>(2); // Default to Shakti Gauchan for high passion
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Overhauled chapters to present 4 completely different, unheralded player legends
  // Swapped all image sources to completely unique, non-overlapping Unsplash IDs
  const chapters: FilmChapter[] = [
    {
      id: "chap-01",
      chapterCode: "REEL_01: NEW_ZEALAND_02",
      title: "पाकिस्तान विरुद्ध ऐतिहासिक बिदाइ — न्यूजील्याण्ड २००२",
      subtitle: "अध्याय १ // यु-१९ विश्वकप ऐतिहासिक जित",
      quote: "हामी यहाँ केवल भाग लिन आएका होइनौं — हामी विश्वलाई हराउन सक्छौं भनेर देखाउन आएका हौं।",
      speaker: "विनोद दास (कप्तान)",
      description: "सन् २००२ को न्यूजील्याण्डको चिसो जाडो। यु-१९ विश्वकपमा नेपालले क्रिकेट महाशक्ति पाकिस्तानलाई ३० रनले स्तब्ध पार्दै पहिलो पटक अन्तर्राष्ट्रिय मञ्चमा तहल्का मच्चायो। कप्तान विनोद दासको असाधारण बलिङ र नेतृत्वले नेपाली क्रिकेटको स्वर्णिम जग खडा गरेको त्यो ऐतिहासिक रात।",
      image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      videoId: "cV5pgrkDkY4",
      slug: "story-08",
      telemetry: [
        { label: "टिम मनोबल (Team Morale)", value: 90 },
        { label: "मानसिक दबाब (Pressure Index)", value: 95 },
        { label: "सामरिक अनुशासन (Tactical Discipline)", value: 92 }
      ]
    },
    {
      id: "chap-02",
      chapterCode: "REEL_02: MALAYSIA_12",
      title: "बसन्त रेग्मीको अन्तिम ओभर — डेनमार्क २०१२",
      subtitle: "अध्याय २ // मलेसिया संकटकालिन ओभर रक्षा",
      quote: "जब कप्तान पारसले मलाई अन्तिम बल सुम्पिए, मेरो दिमागमा डर थिएन, केवल देशको झण्डा थियो।",
      speaker: "बसन्त रेग्मी",
      description: "२०१२ को मलेसिया फाइनल। डेनमार्कलाई जित्न अन्तिम ओभरमा मात्र ४ रन आवश्यक थियो। देब्रेहाते स्पिनर बसन्त रेग्मीले असाधारण र संयमित बलिङ गर्दै मात्र २ रन दिएर नेपाललाई एक विकेटको ऐतिहासिक जित दिलाए, जसले नेपालको डिभिजन यात्रालाई असाधारण उचाइमा पुर्‍यायो।",
      image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      videoId: "cV5pgrkDkY4",
      slug: "story-02",
      telemetry: [
        { label: "टिम मनोबल (Team Morale)", value: 95 },
        { label: "मानसिक दबाब (Pressure Index)", value: 99 },
        { label: "सामरिक अनुशासन (Tactical Discipline)", value: 94 }
      ]
    },
    {
      id: "chap-03",
      chapterCode: "REEL_03: KIRTIPUR_12",
      title: "शक्ति गौचनको जादुमयी ह्याट्रिक — कीर्तिपुरको चिल गर्जन",
      subtitle: "अध्याय ३ // चामत्कारिक स्पिन ह्याट्रिक",
      quote: "विकेट लिएपछि मेरो त्यो चिल जस्तै पखेटा फिँजाएर कुदेको दौड नेपाली फ्यानहरूको अटूट मायाको आभार थियो।",
      speaker: "शक्ति गौचन",
      description: "सिनियर नेपाली टोलीको इतिहासमै पहिलो ह्याट्रिक। शक्ति गौचनले डेनमार्क विरुद्ध ९ ओभरमा ८ मेडन राख्दै मात्र २ रन दिएर ३ विकेट लिएको त्यो जादुमयी बलिङ स्पेल, जसले विपक्षी ब्याट्सम्यानहरूलाई क्रिजमा चल्न समेत दिएन।",
      image: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      videoId: "cV5pgrkDkY4",
      slug: "story-03",
      telemetry: [
        { label: "टिम मनोबल (Team Morale)", value: 94 },
        { label: "मानसिक दबाब (Pressure Index)", value: 75 },
        { label: "सामरिक अनुशासन (Tactical Discipline)", value: 98 }
      ]
    },
    {
      id: "chap-04",
      chapterCode: "REEL_04: OMAN_24",
      title: "दीपेन्द्रको ६ बलमा ६ छक्का — ओमानको महाविस्फोट",
      subtitle: "अध्याय ४ // विश्व रेकर्ड कीर्तिमान",
      quote: "मैले पहिलो तीन बलमा छक्का प्रहार गरेपछि मलाई लाग्यो आज म इतिहास सिर्जना गर्न सक्छु, र अन्तिम बलमा ब्याट घुमाउँदा त्यो पूरा भयो।",
      speaker: "दीपेन्द्र सिंह ऐरी",
      description: "अप्रिल २०२४ को ओमान मैदान। कतार विरुद्ध दीपेन्द्र सिंह ऐरीले एकै ओभरको ६ बलमा लगातार ६ छक्का प्रहार गर्दै युवराज सिंह र कीरोन पोलार्ड जस्ता विश्वका महानतम ब्याट्सम्यानहरूको क्लबमा आफ्नो नाम लेखाउँदै नेपाली क्रिकेटको नयाँ तागत प्रदर्शन गरे।",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      videoId: "cV5pgrkDkY4",
      slug: "story-14",
      telemetry: [
        { label: "टिम मनोबल (Team Morale)", value: 99 },
        { label: "मानसिक दबाब (Pressure Index)", value: 90 },
        { label: "सामरिक अनुशासन (Tactical Discipline)", value: 96 }
      ]
    }
  ];

  // Typewriter effect on chapter description change
  useEffect(() => {
    setIsTyping(true);
    setTypewriterText("");
    const targetText = chapters[selectedChapter].description;
    let i = 0;
    
    const timer = setInterval(() => {
      if (i < targetText.length) {
        setTypewriterText((prev) => prev + targetText.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [selectedChapter]);

  // Stat bars animate on load/switch
  useEffect(() => {
    setAnimateBars(false);
    const timer = setTimeout(() => setAnimateBars(true), 150);
    return () => clearTimeout(timer);
  }, [selectedChapter]);

  const openVideo = (videoId: string) => {
    setActiveVideo(videoId);
    requestAnimationFrame(() => setIsAnimating(true));
  };

  const closeVideo = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => setActiveVideo(null), 400);
  }, []);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo, closeVideo]);

  return (
    <section id="stories" className="py-24 bg-[#07080F] border-b border-t border-white/5 mt-1 scroll-mt-20 relative overflow-hidden font-sans select-none">
      
      {/* Ambient Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, #C9A84C 1.5px, transparent 1.5px)`,
        backgroundSize: "32px 32px"
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="h-[2px] w-8 bg-[#C9A84C] animate-pulse shadow-[0_0_8px_#C9A84C]" />
              <span className="font-stats font-bold text-[#C9A84C] uppercase tracking-[0.25em] text-xs">
                खेलका गुप्त कथाहरू // LOCKER ROOM TAPE VAULT
              </span>
            </div>
            <h2 className="font-display uppercase text-5xl md:text-6xl text-stadium-white">
              बन्द कोठाभित्रको सत्य: <span className="text-[#C41E3A] drop-shadow-[0_0_15px_rgba(196,30,58,0.4)]">ड्रेसिङ रुमका गोप्य क्षण</span>
            </h2>
            <p className="font-sans text-[#B0B8C8] mt-4 text-base md:text-lg max-w-3xl leading-relaxed">
              मैदानको २२ यार्ड बाहिर, बन्द कोठाहरूमा खेलाडीहरूले भोगेका मानसिक उतारचढाव, निराशा र विजय उत्सवका ती वास्तविक र भावुक कथाहरू — जसले खेलको इतिहासलाई सधैंका लागि परिवर्तन गरिदियो।
            </p>
          </div>
        </div>

        {/* 16:9 Monitor & Dossier Grid split console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Widescreen Cinematic Film Monitor (7 Columns) */}
          <div className="lg:col-span-7 bg-[#0D1B2A]/20 border border-white/10 rounded-sm overflow-hidden relative flex flex-col justify-between group shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
            
            {/* Ambient Overlay lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none z-10" />
            <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent animate-[scan_7s_linear_infinite] z-20 pointer-events-none" />

            {/* Top Widescreen HUD strip */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-md relative z-30 text-[9px] font-mono text-stadium-white/40">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C41E3A] animate-ping" />
                <span className="text-[#C9A84C] font-bold uppercase tracking-wider">{chapters[selectedChapter].chapterCode}</span>
              </div>
              <span className="tracking-widest">REEL RECORDER: CALIBRATED // ACTIVE</span>
            </div>

            {/* Widescreen Film Screen container (Grayscale-to-Color zoom on hover) */}
            <div className="relative w-full aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
              <Image
                src={chapters[selectedChapter].image}
                alt={chapters[selectedChapter].title}
                fill
                className="object-cover grayscale saturate-[0.1] contrast-[1.08] transition-all duration-[1.2s] ease-out group-hover:scale-103 group-hover:grayscale-0 group-hover:saturate-[0.8] brightness-[0.42] group-hover:brightness-[0.52]"
              />

              {/* Glowing play overlay trigger button */}
              <div className="absolute z-20 flex flex-col items-center justify-center">
                <button
                  onClick={() => openVideo(chapters[selectedChapter].videoId)}
                  className="w-16 h-16 border border-white/50 text-stadium-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:scale-110 hover:bg-[#C41E3A] hover:border-[#C41E3A] hover:shadow-[0_0_30px_#C41E3A] transition-all duration-500 backdrop-blur-sm cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className="ml-1"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                </button>
                <span className="font-stats font-bold text-stadium-white/70 text-[9px] tracking-[0.2em] mt-4 block">
                  [ PLAY HISTORIC REEL // भिडियो हेर्नुहोस् ]
                </span>
              </div>

              {/* Tiny bottom-right equalizers sound indicators */}
              <div className="absolute bottom-5 right-5 z-20 flex items-end gap-1 h-4 opacity-40 group-hover:opacity-75 transition-opacity">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-[#C9A84C] rounded-full animate-[soundWave_1.2s_ease-in-out_infinite]"
                    style={{
                      height: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Widescreen HUD strip */}
            <div className="p-4 border-t border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-md relative z-30 text-[8px] font-mono text-stadium-white/30">
              <span>TIMECODE: 00:45:12 / 01:24:08 // FPS: 24</span>
              <span>RESOLVE: 1080P // AUDIO TRACK: STEREO</span>
            </div>
          </div>

          {/* RIGHT: Director's Dossier Panel (5 Columns) */}
          <div className="lg:col-span-5 bg-[#0D1B2A]/30 border border-white/10 rounded-sm p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm relative overflow-hidden">
            
            {/* Top Classified header */}
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5 text-[8.5px] font-mono text-stadium-white/40">
                <span className="uppercase tracking-widest text-[#C41E3A] font-bold">DECIDED FILM JOURNAL // TIER-1</span>
                <span>STATUS: STABLE</span>
              </div>

              {/* Chapter title and era */}
              <span className="font-stats text-[9.5px] text-[#C9A84C] font-black uppercase tracking-widest block mb-1">
                {chapters[selectedChapter].subtitle}
              </span>
              <h3 className="font-display uppercase text-3xl text-stadium-white leading-tight mb-4 tracking-wide">
                {chapters[selectedChapter].title.split(" — ")[0]}
              </h3>

              {/* Verified Speech quotation container */}
              <div className="border-l-[3px] border-[#C9A84C] pl-4 py-1.5 mb-5 my-3 relative bg-white/2 border border-white/5 rounded-sm">
                <span className="absolute top-[-10px] left-[-6px] font-serif text-[42px] text-[#C41E3A]/10 pointer-events-none select-none">
                  &ldquo;
                </span>
                <p className="font-sans font-black text-stadium-white text-[13.5px] italic leading-relaxed">
                  &ldquo;{chapters[selectedChapter].quote}&rdquo;
                </p>
                <span className="font-mono text-[7.5px] text-[#B0B8C8]/60 uppercase tracking-widest block mt-2.5">
                  — {chapters[selectedChapter].speaker}
                </span>
              </div>

              {/* Typewriter paced narrative logs */}
              <div className="min-h-[96px] mb-6">
                <p className="font-sans text-[#B0B8C8] text-xs md:text-sm leading-relaxed">
                  {typewriterText}
                  {isTyping && <span className="inline-block w-1 h-3.5 bg-[#C9A84C] ml-1 animate-pulse" />}
                </p>
              </div>

              {/* Telemetry skill metrics gauges */}
              <div className="flex flex-col gap-3.5 bg-black/25 border border-white/5 rounded-sm px-4 py-4 w-full text-[9px]">
                {chapters[selectedChapter].telemetry.map((bar, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center font-stats">
                      <span className="text-stadium-white/60">{bar.label}</span>
                      <span className="font-bold text-[#C9A84C]">{bar.value}%</span>
                    </div>
                    <div className="h-1 bg-[#07080F] rounded-sm overflow-hidden w-full">
                      <div
                        className="bg-gradient-to-r from-[#C41E3A] to-[#C9A84C] h-full transition-all duration-[1200ms] ease-out rounded-sm"
                        style={{ width: `${animateBars ? bar.value : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom links */}
            <div className="pt-5 mt-6 border-t border-white/5 flex justify-between items-center gap-4 text-[9px]">
              <span className="font-mono text-[#B0B8C8]/30">LOG-REEL: #{chapters[selectedChapter].id.toUpperCase()}</span>
              <Link
                href={`/locker-room`}
                className="px-5 py-2.5 bg-[#C9A84C]/5 border border-[#C9A84C]/35 text-[#C9A84C] font-stats font-bold text-[8.5px] uppercase tracking-widest hover:bg-[#C9A84C] hover:text-[#07080F] hover:shadow-[0_0_12px_rgba(201,168,76,0.3)] transition-all duration-300 rounded-sm"
              >
                [ OPEN DEEP ARCHIVES ] ↗
              </Link>
            </div>

          </div>

        </div>

        {/* BOTTOM: Horizontal Sprocket Film Strip Timeline */}
        <div className="mt-10 bg-black/40 border border-white/5 p-6 rounded-sm shadow-[0_20px_45px_rgba(0,0,0,0.6)] relative overflow-hidden">
          
          {/* Top Film Sprocket hole dashes */}
          <div className="flex justify-between px-2 opacity-25 font-mono text-[7px] tracking-[0.7em] text-white/50 select-none border-b border-white/5 pb-2.5 mb-5 w-full overflow-hidden">
            ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto relative z-10">
            {chapters.map((chap, idx) => {
              const isSelected = selectedChapter === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedChapter(idx)}
                  className={`relative h-[95px] rounded-sm overflow-hidden border transition-all duration-500 cursor-pointer shadow-lg group ${
                    isSelected ? "border-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.15)]" : "border-white/5 hover:border-white/20"
                  }`}
                >
                  {/* Thumbnail Image background */}
                  <Image
                    src={chap.thumb}
                    alt={chap.title}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      isSelected ? "grayscale-0 scale-103 brightness-[0.5]" : "grayscale saturate-[0.1] brightness-[0.35] group-hover:brightness-[0.45] group-hover:scale-103 group-hover:grayscale-0 group-hover:saturate-[0.5]"
                    }`}
                  />

                  {/* Glass layout overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 z-10 bg-black/40 hover:bg-black/20 transition-all duration-300">
                    <span className="font-stats text-[7.5px] text-[#C9A84C] font-black uppercase tracking-widest block mb-0.5">
                      अध्याय ०{idx + 1}
                    </span>
                    <h4 className="font-sans font-black text-[12.5px] text-stadium-white leading-tight truncate">
                      {chap.title.split(" — ")[0]}
                    </h4>
                  </div>

                  {/* Pulsing Target Dot on Selected Frame */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 z-20 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C41E3A]" />
                      <span className="absolute h-4 w-4 rounded-full border border-[#C41E3A]/40 animate-ping" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Film Sprocket hole dashes */}
          <div className="flex justify-between px-2 opacity-25 font-mono text-[7px] tracking-[0.7em] text-white/50 select-none border-t border-white/5 pt-2.5 mt-5 w-full overflow-hidden">
            ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪
          </div>

        </div>

      </div>

      {/* Cinematic Lightbox Modal */}
      {activeVideo && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-[#07080F]/95 transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeVideo}
        >
          <button
            onClick={closeVideo}
            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white hover:text-[#C41E3A] transition-colors z-[110] cursor-pointer"
            aria-label="Close video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>

          <div
            className={`w-full max-w-5xl aspect-video bg-black shadow-[0_0_40px_rgba(196,30,58,0.15)] relative overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${isAnimating ? 'scale-100' : 'scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="Cinematic Playback"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </section>
  );
}
