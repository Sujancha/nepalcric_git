"use client";

import { useState } from "react";
import Image from "next/image";

export default function FanSpotlight() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [caption, setCaption] = useState("");

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleUpload = () => {
        if (!caption.trim()) return;
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setIsUploadModalOpen(false);
                setCaption("");
            }, 2000); // Close after 2 seconds of success state
        }, 1500); // Fake upload delay
    };

    // Swapped all image sources to completely unique, non-overlapping Unsplash IDs
    const fans = [
        { 
            title: "बिहान ४ बजेको लाइन", 
            tag: "समर्पण", 
            span: "md:col-span-2 md:row-span-2 lg:col-span-1", 
            glowClass: "group-hover:border-[#C9A84C] group-hover:shadow-[0_0_24px_rgba(201,168,76,0.3)]", 
            accentItem: "bg-[#C9A84C]", 
            img: "https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
        { 
            title: "टीयुका अनुहारहरू", 
            tag: "समुदाय", 
            span: "md:col-span-1", 
            glowClass: "group-hover:border-[#1E3A8A] group-hover:shadow-[0_0_24px_rgba(30,58,138,0.3)]", 
            accentItem: "bg-[#1E3A8A]", 
            img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
        { 
            title: "काठमाडौंको आँशु", 
            tag: "भावना", 
            span: "md:col-span-1", 
            glowClass: "group-hover:border-[#C41E3A] group-hover:shadow-[0_0_24px_rgba(196,30,58,0.3)]", 
            accentItem: "bg-[#C41E3A]", 
            img: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
        { 
            title: "पुस्ताहरूको विश्वास", 
            tag: "विरासत", 
            span: "md:col-span-2 md:row-span-1", 
            glowClass: "group-hover:border-[#10B981] group-hover:shadow-[0_0_24px_rgba(16,185,129,0.3)]", 
            accentItem: "bg-[#10B981]", 
            img: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
    ];

    return (
        <section className="py-24 bg-[#07080F] relative overflow-hidden border-t border-white/5 font-sans select-none">
            {/* TU Ground Background Animation */}
            <Image
                src="/images/tu_ground.gif"
                alt="TU Cricket Ground"
                fill
                className="object-cover opacity-[0.04] pointer-events-none mix-blend-overlay"
                unoptimized
            />

            {/* Subtle light background grids */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{
                backgroundImage: `radial-gradient(rgba(201,168,76,0.03) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-3">
                            <span className="h-[2px] w-8 bg-[#C9A84C] animate-pulse" />
                            <span className="font-stats font-bold text-[#C9A84C] uppercase tracking-[0.25em] text-xs">
                                नेपाली क्रिकेट फ्यान क्लब // THE 12TH RHINO: FAN ZONE
                            </span>
                        </div>
                        <h2 className="font-display uppercase text-5xl md:text-6xl text-stadium-white mb-4 leading-none">
                            १२औँ गैँडाको गर्जन: <span className="text-[#C9A84C] drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]">रङ्गशालाको असली शक्ति</span>
                        </h2>
                        <p className="font-sans text-[#B0B8C8] text-base md:text-lg leading-relaxed max-w-xl">
                            यो रङ्गशालामा उर्लिने नेपाली फ्यानहरूको सामूहिक ऊर्जा र अटूट समर्थनको वास्तविक ग्यालरी हो। बिहान ४ बजेदेखि लाइनमा उभिनेदेखि लिएर मुटुको धड्कन रोकिने क्षणसम्म, खेलाडीहरूको पछाडि उभिने असली शक्ति तपाईंहरू नै हो।
                        </p>
                    </div>
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="px-8 py-4 border border-[#C9A84C]/50 text-stadium-white rounded bg-transparent font-stats font-bold tracking-widest uppercase text-xs hover:bg-[#C9A84C] hover:text-[#07080F] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:border-[#C9A84C] transition-all duration-300 animate-[fadeUpIn_1s_ease-out_0.4s_both] cursor-pointer">
                        [ आफ्नो पल सेयर गर्नुस् // SHARE YOUR MOMENT ]
                    </button>
                </div>

                {/* Highly modern, non-overlapping cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-[250px] lg:auto-rows-[300px] animate-[fadeUpIn_1s_ease-out_0.6s_both] relative z-10">
                    {fans.map((fan, i) => {
                        let classifiedTag = fan.tag;
                        if (i === 0) classifiedTag = "समर्पण // SYSTEM: DEDICATION";
                        if (i === 1) classifiedTag = "समुदाय // SYSTEM: COMMUNITY";
                        if (i === 2) classifiedTag = "भावना // SYSTEM: EMOTION";
                        if (i === 3) classifiedTag = "विरासत // SYSTEM: LEGACY";

                        return (
                          <div
                            key={i}
                            className={`group relative rounded-sm overflow-hidden cursor-pointer border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-2 ${fan.span} bg-[#07080F] ${fan.glowClass}`}
                          >
                            {/* Desaturated Background Image - Highly visible now */}
                            <Image
                              src={fan.img}
                              alt={fan.title}
                              fill
                              className="object-cover opacity-75 grayscale saturate-[0.25] group-hover:grayscale-0 group-hover:saturate-100 group-hover:opacity-100 group-hover:scale-103 transition-all duration-700"
                            />
                            {/* Bottom-heavy Gradient scrim (Zero blackout, maximum legibility) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07080F]/95 via-black/30 to-transparent transition-opacity duration-500 z-10" />

                            {/* Simple system label tags */}
                            <div className="absolute top-6 left-6 px-3 py-1.5 bg-[#07080F]/90 backdrop-blur-md rounded-sm border border-white/10 font-mono text-stadium-white text-[8px] uppercase tracking-widest font-bold shadow-lg z-20 group-hover:bg-[#C41E3A]/10 group-hover:border-[#C41E3A]/40 transition-colors">
                              {classifiedTag}
                            </div>

                            {/* Text content sits at the bottom */}
                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 z-20">
                              <h3 className="font-sans font-black uppercase text-xl md:text-2xl text-stadium-white mb-3 drop-shadow-md group-hover:text-[#C9A84C] transition-colors leading-tight">
                                {fan.title}
                              </h3>
                              <div className={`h-[2.5px] w-12 ${fan.accentItem} transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 shadow-[0_0_10px_currentColor]`} />
                            </div>
                          </div>
                        );
                    })}
                </div>
            </div>

            {/* The 12th Rhino Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Dark Backdrop with blur */}
                    <div
                        className="absolute inset-0 bg-[#07080F]/90 backdrop-blur-xl"
                        onClick={() => !isUploading && !isSuccess && setIsUploadModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-[#0D1B2A] border border-[#C9A84C]/20 rounded p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transform animate-in zoom-in duration-300 z-50">

                        <button
                            onClick={() => !isUploading && !isSuccess && setIsUploadModalOpen(false)}
                            className="absolute top-4 right-4 text-[#B0B8C8] hover:text-[#C41E3A] transition-colors cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="font-display uppercase text-4xl text-stadium-white">
                                आफ्नो पल <span className="text-[#C41E3A] drop-shadow-[0_0_10px_#C41E3A]">सेयर गर्नुस्</span>
                            </h3>
                            <p className="font-sans text-[#B0B8C8] mt-2 text-[15px]">तपाईंको उत्कृष्ट क्रिकेटिङ पल यहाँ सेयर गर्नुस्</p>
                        </div>

                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-500">
                                <div className="w-16 h-16 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(201,168,76,0.5)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#C9A84C]"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <h4 className="font-display uppercase text-3xl text-stadium-white">अपलोड सफल भयो!</h4>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {/* Drag and Drop Zone */}
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative h-40 w-full rounded border border-dashed flex flex-col items-center justify-center transition-all duration-300 ${dragActive ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-white/20 bg-black/40 hover:border-white/40'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mb-3 ${dragActive ? 'text-[#C9A84C]' : 'text-[#B0B8C8]'}`}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                    <span className="font-sans font-medium text-sm text-stadium-white/80">
                                        फोटो तान्नुहोस् र यहाँ छोड्नुहोस्
                                    </span>
                                    <span className="font-sans text-xs text-[#B0B8C8] mt-1">
                                        वा ब्राउज गर्न क्लिक गर्नुहोस्
                                    </span>
                                </div>

                                {/* Caption Input */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="caption" className="font-sans font-bold text-[#C9A84C] text-xs uppercase tracking-widest">
                                        क्याप्सन लेख्नुस्
                                    </label>
                                    <input
                                        type="text"
                                        id="caption"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        placeholder="यो पल किन विशेष छ?..."
                                        className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-stadium-white font-sans text-sm focus:outline-none focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] transition-all"
                                    />
                                </div>

                                {/* Upload Button */}
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading || !caption.trim()}
                                    className="w-full py-4 rounded bg-[#07080F] border border-[#C41E3A] hover:bg-[#C41E3A] text-stadium-white font-sans font-bold tracking-widest text-sm uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-white/10 disabled:hover:bg-transparent flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(196,30,58,0)] hover:shadow-[0_0_20px_rgba(196,30,58,0.4)] cursor-pointer"
                                >
                                    {isUploading ? (
                                        <>
                                            <span className="w-4 h-4 rounded-full border-2 border-stadium-white/20 border-t-stadium-white animate-spin"></span>
                                            अपलोड हुँदैछ...
                                        </>
                                    ) : (
                                        'अपलोड गर्नुस्'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
