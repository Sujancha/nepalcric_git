'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Full-bleed image break (parallax desktop / fade mobile) ── */
function ImageBreak({ src, caption }: { src: string; caption: string }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [offset, setOffset] = useState(0);       // parallax translateY
    const [fadeIn, setFadeIn] = useState(false);   // mobile fade trigger

    useEffect(() => {
        const el = wrapperRef.current;
        const img = imgRef.current;
        if (!el || !img) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;

        // ── Mobile: fade-in via IntersectionObserver ──────────────────────────
        const fadeObserver = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setFadeIn(true); fadeObserver.disconnect(); } },
            { threshold: 0.15 }
        );
        fadeObserver.observe(el);

        if (reducedMotion) return () => fadeObserver.disconnect();

        // ── Desktop: parallax via scroll listener ─────────────────────────────
        const handleScroll = () => {
            if (!isDesktop()) return;
            const rect = el.getBoundingClientRect();
            const viewH = window.innerHeight;
            // progress: -1 (element bottom at top of vp) → +1 (element top at bottom of vp)
            const progress = (rect.top + rect.height / 2 - viewH / 2) / (viewH / 2 + rect.height / 2);
            const clampedOffset = Math.max(-30, Math.min(30, progress * 0.4 * 75));
            setOffset(clampedOffset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // set initial position

        return () => {
            fadeObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={wrapperRef} style={{ margin: '3.5em 0 0 0', overflowX: 'hidden' }}>
            <div style={{
                position: 'relative', width: '100vw', left: '50%',
                transform: 'translateX(-50%)', height: 'clamp(300px, 60vh, 640px)', overflow: 'hidden',
            }}>
                <img
                    ref={imgRef}
                    src={src}
                    alt={caption}
                    loading="lazy"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '120%',        // extra height for parallax travel room
                        top: '-10%',           // centre the oversized image
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        transform: `translateY(${offset}px)`,
                        transition: 'opacity 0.5s ease-out',
                        opacity: fadeIn ? 1 : 0.6,
                        willChange: 'transform',
                    }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.7) 0%, transparent 30%, transparent 70%, rgba(10,10,10,0.7) 100%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.6) 100%)', pointerEvents: 'none' }} />
            </div>
            <p className="font-stats text-[11px] italic tracking-[0.05em] text-[#C9A84C]/65 text-center mt-4 max-w-[780px] mx-auto px-6">{caption}</p>
        </div>
    );
}

/* ── Section wrapper ── */
function Section({ label, children, first = false }: { label: string; children: React.ReactNode; first?: boolean }) {
    return (
        <section className={`bg-[#0A0A0A] pb-[80px] px-6 ${first ? '' : 'border-t border-white/5'} overflow-x-hidden`}>
            <div className="max-w-[780px] mx-auto pt-[60px] md:pt-[100px] mb-14 flex items-center gap-4">
                <div className="w-8 h-[1px] bg-[#C9A84C]" />
                <span className="font-stats text-[11px] font-bold tracking-[0.05em] uppercase text-[#C9A84C]">{label}</span>
            </div>
            <div className="max-w-[780px] mx-auto font-sans leading-[1.85] text-[#F0EDE8]" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.15rem)' }}>
                {children}
            </div>
        </section>
    );
}

/* ── Pull quote ── */
function PullQuote({ children, attribution }: { children: React.ReactNode; attribution: string }) {
    return (
        <FadeIn>
            <blockquote className="my-[3em] pl-6 border-l-[3px] border-[#C9A84C]">
                <p className="font-sans italic leading-[1.75] text-[#F0EDE8] mb-3" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)' }}>{children}</p>
                <cite className="font-stats text-[11px] text-[#C9A84C] tracking-[0.15em] uppercase not-italic">{attribution}</cite>
            </blockquote>
        </FadeIn>
    );
}

/* ── Isolated line ── */
function Isolated({ children, gold = false, large = false }: { children: React.ReactNode; gold?: boolean; large?: boolean }) {
    if (large) {
        return (
            <FadeIn>
                <p className={`font-display tracking-[0.02em] uppercase my-[3.5em] leading-[1.0] ${gold ? 'text-[#C9A84C]' : 'text-[#F0EDE8]'}`}
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    {children}
                </p>
            </FadeIn>
        );
    }
    return (
        <FadeIn>
            <p className={`font-sans italic my-[3em] ${gold ? 'text-[#C9A84C]' : 'text-white/75'}`}>
                {children}
            </p>
        </FadeIn>
    );
}

/* ── Audio embed player (YouTube version) ── */
function AudioEmbed({ title, artist, year, videoId }: { title: string; artist: string; year: string; videoId: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="my-8 transition-all duration-500 ease-in-out"
            style={{
                background: 'rgba(201, 168, 76, 0.08)',
                border: `1px solid ${expanded ? 'rgba(201, 168, 76, 0.4)' : 'rgba(201, 168, 76, 0.3)'}`,
                borderRadius: expanded ? '16px' : '9999px',
                overflow: 'hidden',
            }}
        >
            {/* Header / Pill */}
            <div
                className="flex items-center gap-4 px-5 py-3 cursor-pointer select-none"
                onClick={() => setExpanded(!expanded)}
            >
                {/* Play/Stop Button */}
                <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: '#C9A84C' }}
                >
                    {expanded ? (
                        <div className="w-3 h-3 bg-black" />
                    ) : (
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1" />
                    )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                    <div className="font-stats text-[12px] tracking-[0.1em] uppercase text-[#C9A84C] truncate">{title}</div>
                    <div className="font-stats text-[10px] text-white/40 truncate">{artist} • {year}</div>
                </div>

                {/* Status Label */}
                <div className="font-stats text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] pr-2">
                    सुन्नुस्
                </div>
            </div>

            {/* Expandable Content (YouTube) */}
            <div
                style={{
                    maxHeight: expanded ? '1000px' : '0',
                    opacity: expanded ? 1 : 0,
                    transition: 'all 0.4s ease-out'
                }}
            >
                <div className="p-2 pt-0 px-2 pb-4">
                    <div className="relative w-full rounded-lg overflow-hidden bg-black/40" style={{ paddingBottom: '56.25%', height: 0 }}>
                        {expanded && (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>
                    <p className="font-sans italic text-[11px] text-white/40 text-center mt-3">
                        {title} — {artist}को पहिलो गीत। {year}।
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── Story companion AI section ── */
function StoryCompanion() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [displayed, setDisplayed] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Typing effect
    useEffect(() => {
        if (!answer) { setDisplayed(''); return; }
        setDisplayed('');
        let i = 0;
        const tick = setInterval(() => {
            i++;
            setDisplayed(answer.slice(0, i));
            if (i >= answer.length) {
                clearInterval(tick);
                setHasInteracted(true);
            }
        }, 30);
        return () => clearInterval(tick);
    }, [answer]);

    const handleSubmit = async () => {
        if (!question.trim()) {
            setShake(true);
            setTimeout(() => setShake(false), 600);
            return;
        }
        setLoading(true);
        setAnswer('');
        setError('');
        try {
            const res = await fetch('/api/balen-companion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });
            const data = await res.json();
            if (!res.ok || data.error) throw new Error();
            setAnswer(data.answer);
        } catch {
            setError('अहिले जवाफ दिन सकिएन।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-[100px] pb-[120px] px-6 bg-transparent">
            <div className="max-w-[600px] mx-auto">

                {/* Section label */}
                <div className="mb-14 flex items-center justify-center gap-4">
                    <div className="w-8 h-[1px] bg-[#C9A84C]" />
                    <span className="font-stats text-[11px] font-bold tracking-[0.1em] uppercase text-[#C9A84C]">
                        कथासँग अझ गहिरो जानुस्
                    </span>
                    <div className="w-8 h-[1px] bg-[#C9A84C]" />
                </div>

                {/* Intro text */}
                <div className="text-center mb-12">
                    <h3 className="font-sans italic text-white/50 leading-[1.8] mb-3" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)' }}>
                        यो कथाले तपाईंमा कुनै प्रश्न जगायो?
                    </h3>
                    <p className="font-stats text-[10px] tracking-[0.2em] uppercase text-white/30">
                        नेपाली वा अंग्रेजीमा सोध्नुस्
                    </p>
                </div>

                {/* Input Area */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
                        placeholder="उनका बुबाले के कविता लेख्थे?"
                        className="w-full bg-transparent font-sans text-white text-[1.1rem] py-4 outline-none transition-all duration-300"
                        style={{
                            borderBottom: shake ? '1px solid #D32F2F' : '1px solid rgba(255,255,255,0.15)',
                            borderColor: (!shake && question) ? 'rgba(201,168,76,0.4)' : undefined,
                            animation: shake ? 'shakeBorder 0.6s ease' : 'none',
                            fontStyle: question ? 'normal' : 'italic'
                        }}
                        onFocus={e => { if (!shake) e.currentTarget.style.borderBottomColor = 'rgba(201,168,76,0.6)'; }}
                        onBlur={e => { if (!shake) e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.15)'; }}
                    />

                    {!hasInteracted && !loading && !displayed && (
                        <div className="text-center mt-3 opacity-20 font-stats text-[10px] tracking-[0.1em] uppercase animate-pulse">
                            Enter थिच्नुस्
                        </div>
                    )}

                    <style>{`
                        @keyframes shakeBorder { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-4px)} 40%,80%{transform:translateX(4px)} }
                        @keyframes pulseDiamond { from { opacity: 0.2; transform: scale(0.9); } to { opacity: 1; transform: scale(1.1); } }
                    `}</style>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center mt-8">
                        <span className="text-[#C9A84C] text-[1.2rem]" style={{ animation: 'pulseDiamond 1.5s ease-in-out infinite alternate' }}>
                            ◆
                        </span>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="mt-8 text-center text-white/30 italic font-sans text-[0.9rem]">
                        {error}
                    </div>
                )}

                {/* Response Area */}
                {displayed && !loading && (
                    <div className="mt-12 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <div className="flex gap-4">
                            <span className="text-[#C9A84C] text-[1.1rem] mt-1 shrink-0">◆</span>
                            <div className="space-y-6">
                                <p className="font-sans leading-[1.9] text-white/85 text-[1.15rem]">
                                    {displayed}
                                </p>

                                {displayed === answer && (
                                    <p className="font-stats text-[10px] tracking-[0.1em] uppercase text-white/30 italic transition-opacity duration-1000">
                                        — NepalCric AI • बालेन शाहको कथामा आधारित
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Scroll-triggered fade-in wrapper ── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return (
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms` }}>
            {children}
        </div>
    );
}

/* ── Body paragraph ── */
function P({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
    return <p className={`mb-[1.8em] ${muted ? 'italic text-white/60' : ''}`}>{children}</p>;
}

export default function BalenShahClient() {
    const [navVisible, setNavVisible] = useState(false);
    const [copyDone, setCopyDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setNavVisible(true), 3000);
        const handleScroll = () => { if (window.scrollY > 10) setNavVisible(true); };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll); };
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopyDone(true);
            setTimeout(() => setCopyDone(false), 2000);
        });
    };

    return (
        <div className="w-full min-h-screen bg-[#0A0A0A] text-[#F0EDE8] overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>

            {/* ── FLOATING NAV ── */}
            <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 md:px-10 py-4 border-b border-[#C9A84C]/10"
                style={{ opacity: navVisible ? 1 : 0, transition: 'opacity 0.8s ease', pointerEvents: navVisible ? 'auto' : 'none', background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)' }}>
                <Link href="/" className="font-stats text-[13px] text-[#C9A84C] no-underline tracking-[0.2em] uppercase">← nepalCRIC</Link>
                <span className="font-stats text-[11px] text-white/30 tracking-[0.15em] uppercase">आजको कथा</span>
            </div>

            {/* ══ HERO ══ */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/balen_profile.jpg"
                        alt="बालेन्द्र शाह"
                        fill
                        priority
                        className="object-cover object-top"
                        style={{ filter: 'brightness(0.35) contrast(1.1) grayscale(0.4)' }}
                    />
                </div>
                <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.08]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
                <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.85) 100%)' }} />
                <div className="relative z-[2] text-center max-w-[780px]">
                    <h1 className="font-display tracking-[0.02em] uppercase text-[#F0EDE8] leading-[1.0] mb-12" style={{ fontSize: 'clamp(2.8rem, 10vw, 8rem)' }}>
                        उनले आफैलाई<br />मेटाए —<br />तिनीहरूलाई बचाउनका लागि।
                    </h1>
                    <div className="w-[120px] h-[1px] bg-[#C9A84C] mx-auto mb-8" />
                    <p className="font-sans italic text-white/60 leading-[1.7] mb-5" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                        बालेन्द्र शाह — र्यापर। इन्जिनियर। मेयर। प्रधानमन्त्री-मनोनीत।
                    </p>
                    <p className="font-stats text-[11px] text-[#C9A84C] tracking-[0.25em] uppercase mb-16">१५ मिनेटको पढाइ</p>
                    <div className="flex justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'chevronPulse 2s ease-in-out infinite' }}>
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </div>
                <style>{`@keyframes chevronPulse { 0%,100%{opacity:0.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(6px)} }`}</style>
            </section>

            {/* ══ SECTION 1 — सुरुवात ══ */}
            <Section label="सुरुवात" first={true}>
                <P>
                    <span className="float-left font-display text-[#C9A84C] mr-[10px] mt-[4px] leading-[0.85]" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)' }}>२</span>
                    ०१३। काठमाडौंको एउटा भूमिगत तहखाना। भित्ता कम्पित थिए। सस्तो सिगरेटको धुँवा र पसिनाको गन्धले हावा भारी थियो। ठेलमठेल भिडको बीचमा एउटा युवक माइक्रोफोन समातेर उभिएको थियो — कालो आयताकार चश्मा, अनुहार आधा अँध्यारोमा। प्रतिस्पर्धीले कराएर पङ्क्ति हाने। पहाडी उच्चजातीय सुविधाभोगीको रूपमा उनलाई सम्बोधन गरे।
                </P>
                <p className="mb-[1.8em] clear-left">
                    यो &ldquo;रअ बार्ज&rdquo; थियो — नेपाली हिप-हपको त्यो भूमिगत अखडा जुन दिवंगत यामा बुद्धले खडा गरेका थिए, जहाँ राति मात्र साँचो कुरा बोलिन्थ्यो। यहाँ कुनै पार्टी थिएन, कुनै झण्डा थिएन — यहाँ थियो केवल माइक्रोफोन र साहस।
                </p>
                <P>त्यो रात, एउटा नयाँ अनुहार मञ्चमा उभियो। कालो आयताकार चश्मा। ढाड सोझो। हातमा माइक्रोफोन। प्रतिद्वन्द्वी थिए — लिटल ग्रिजल (निशेश महर्जन)। भिड पर्खिरहेको थियो।</P>
                <Isolated>बालेनले बोले।</Isolated>
                <PullQuote attribution="— बालेन्द्र शाह, Raw Barz, २०१३">
                    &ldquo;नेप-हपको हिस्ट्री मा, तैंले जस्तो रिबटल कसैले खाएको थिएन — हिस्ट्री भनेको फेरिने चिज हो भाइ, बालेन अहिलेसम्म आएको थिएन।&rdquo;
                </PullQuote>
                <P>तहखानामा एक क्षण सन्नाटा थियो। त्यसपछि आवाज उठ्यो।</P>
                <P>यो केवल एउटा ब्याटल जितेको थिएन। यो एउटा मान्छेले आफ्नो भविष्य तेस्रो पुरुषमा लेखिरहेको थियो — &ldquo;बालेन आएको थिएन। अब आयो।&rdquo; ती शब्दहरू त्यो रात तहखानाको भित्तामा बजे। एक दशकपछि — झापाको मतगणना केन्द्रको स्क्रिनमा जब अङ्कहरू देखिए — तहखानामा भनिएको त्यो भविष्यवाणी इतिहास भइसकेको थियो।</P>
                <Isolated>र त्यो मौन — त्यो एकल, पीडादायी मौन — नै उनको सबैभन्दा ठूलो रहस्य बन्यो।</Isolated>
                <P>तपाईंलाई थाहा छ — आफ्नो नाम अलि फरक तरिकाले उच्चारण गर्दा कति राहत मिल्छ।</P>
                <P>यो कायरता थिएन। यो बाँच्नको गणित थियो। महोत्तरीको जरा भएका मधेशी केटा। बुबा आयुर्वेदिक डाक्टर। परिवार काठमाडौं सरेको — सरकारी जागिरको कारण। शहरले उनलाई स्वीकार गर्यो — तर सर्त राखेर। त्यो सर्त थियो — आफ्नो आधा पहिचान लुकाउनु। उनले त्यो सर्त मानेर भित्र प्रवेश गरे। र भित्र पुगेपछि — व्यवस्थाको जग हल्लाए।</P>
                <P>जुन केटाले एसएलसी परीक्षासम्म राम्रोसँग लेख्न सकेका थिएनन् — उनले ५० वर्षको राजनीतिक वंशको गणितीय सफाया गरे। तर त्यो कसरी भयो? त्यसका लागि पहिले त्यो केटालाई चिन्नु पर्छ — माइक्रोफोन समाउनुभन्दा अघि। मञ्चमा उक्लनुभन्दा अघि। नेपाल चिन्नुभन्दा अघि।</P>
                <Isolated>उनले आफैलाई मेटाए — तिनीहरूलाई बचाउनका लागि।</Isolated>
            </Section>

            {/* ══ SECTION 2 — बाल्यकाल ══ */}
            <Section label="बाल्यकाल">
                <P>१९९०। नारदेवी। काठमाडौं। सँघुरा ईंटाले बनेका गल्लीहरू। मन्दिरका घण्टीहरू। बिहानको आरतीको धुपको गन्ध — जो हावामा घुलेर टोलभरि फैलिन्थ्यो। यो त्यो काठमाडौं थियो जुन अझै आफ्नो थियो। अझै सास फेर्न सक्थ्यो। यहीँ, एउटा आयुर्वेदिक डाक्टरको घरमा, चार भाइबहिनीमा सबैभन्दा कान्छो छोरो जन्मियो — बालेन्द्र शाह।</P>
                <P>उनका बुबा राम नारायण शाह सरकारी अस्पतालमा काम गर्थे — नारदेवी आयुर्वेदिक अस्पताल। महोत्तरीबाट काठमाडौं आएका। सरल मान्छे। तलब खाने जागिरे। तर भित्रैबाट कवि। साँझ घर फर्केपछि उनी कविता लेख्थे। सानो बालेन त्यो हेर्थे — बुबाको कलम चल्दा के हुन्छ, के बाहिर निस्कन्छ, त्यो अक्षरहरूले के बोल्छन् भनेर।</P>
                <ImageBreak src="/images/balen_earlyyouthday.avif" caption="काठमाडौं — उनको बाल्यकालको सहर" />
                <Isolated>कक्षाकोठामा उनी एक छाया मात्र थिए।</Isolated>
                <P>विद्यालय उनलाई कहिल्यै आफ्नो लागेन। त्यो रटाइ। त्यो अनुशासन। त्यो &ldquo;डाक्टर वा इन्जिनियर बन&rdquo; भन्ने एउटै सपना सुनाउने व्यवस्था। तेस्रो कक्षासम्म उनी नियमित जान पनि थिएनन्। एसएलसी परीक्षाको समयसम्म पनि उनले आफैं स्वीकार गरे — &ldquo;मलाई राम्रोसँग लेख्न आउँदैनथ्यो।&rdquo; तर विद्यालयबाहिर उनको शिक्षा चलिरहेको थियो।</P>
                <P>बुबाले उनलाई सरकारी मन्त्रालयका कार्यालयहरूमा लैजान्थे। सिंहदरबारका ती लामा गलियारा। ढोकाबाहिर कुर्सीमा घण्टौं पर्खने मान्छेहरू। धुलो जमेका फाइलका थाक। चिया पिउँदै आफ्नो काम मिलाउन खोज्ने अनुहारहरू। सानो बालेन त्यो प्रतीक्षालयको कुनामा बस्थे — चुपचाप, हेर्थे, बुझ्थे। त्यो बालकले त्यहाँ के देख्यो? व्यवस्थाको थकान। आम मान्छेको बेइज्जती। शक्तिशालीहरूको अहंकार। र एउटा देश — जो आफ्नै नागरिकलाई भार ठान्थ्यो।</P>
                <P>विद्यालयको बसको धमिलो सिसाबाट उनी काठमाडौंको सडक हेर्थे। त्यहाँ देख्थे — च्यातिएका लुगा लगाएका बालबालिका, फोहोरका थुप्रोमा केही खोज्दै हिँड्ने सानासाना हातहरू, जसले कहिल्यै विद्यालयको ढोका देखेका थिएनन्। उनको छाती भारी हुन्थ्यो। यो रिस थियो। यो पीडा थियो। यो त्यो असहाय भावना थियो — जब तपाईंले अन्याय देख्नुहुन्छ तर केही गर्न सक्नुहुन्न।</P>
                <P muted>तपाईंलाई पनि याद छ — त्यही सडक। त्यही सिसा। त्यही रिस।</P>
                <P>नवौं कक्षामा — बुबाको कविता लेख्ने बानीलाई उनले आफ्नो तरिकाले हतियार बनाए। कलम उठाएनन्। माइक्रोफोन उठाए। र लेखे — पहिलो गीत।</P>
                <Isolated large gold>&ldquo;सडक बालक।&rdquo;</Isolated>
                <AudioEmbed title="सडक बालक" artist="बालेन्द्र शाह" year="२००३" videoId="cV5pgrkDkY4" />
                <P>तर त्यो गीत गाएको एक दशकपछि — २०७२ सालको भूकम्पले नेपाललाई हल्लाउँदा — उनले आफ्नो ल्यापटप र स्ट्रक्चरल इन्जिनियरिङको ज्ञान बोकेर गोरखा र मेलम्चीका भत्किएका गाउँहरूमा पुगे। त्यहाँ उनले देखे — व्यवस्थाले मान्छेलाई कसरी छोड्छ। भत्किएका घरहरू। कुर्दा थाकेका मान्छे। र नेताहरू — फोटो खिचाएर हिँड्ने। त्यो बेला उनले बुझे: बाहिरबाट कराएर मात्र सिस्टम सुध्रिँदैन — भित्रैबाट छिर्नुपर्छ। इन्जिनियरिङ नक्साबाट राजनीतिक नक्शातर्फको त्यो मोड उनको जीवनको सबैभन्दा ठूलो मोड थियो।</P>
                <P>त्यो गीत ती बालबालिकाका लागि थियो — जसलाई बसको सिसाबाट हेर्दै उनको मन रोएको थियो। त्यो गीत त्यो व्यवस्थाविरुद्धको पहिलो प्रहार थियो — कुनै राजनीतिक दलबिना, कुनै मञ्चबिना, कुनै समर्थनबिना। एउटा किशोरको एक्लो आवाज। तर त्यो आवाजमा एउटा सहर बोलेको थियो।</P>
                <PullQuote attribution="— बालेन्द्र शाह">
                    &ldquo;काठमाडौंको एउटा छुट्टै सुगन्ध छ। मन्दिरहरूमा आरतीको धुप, घण्टीको आवाज, चाडपर्वको रंग — यहाँ सधैं संगीत गुञ्जिरहेको जस्तो लाग्छ। आजका केटाकेटीलाई म आफूले देखेको काठमाडौं देखाउन चाहन्छु। काठमाडौंको असली सुगन्धसँग दुनियाँलाई परिचित गराउन चाहन्छु।&rdquo;
                </PullQuote>
                <P>त्यो सुगन्ध उनले कहिल्यै बिर्सेनन्। न त्यो सडकका बालबालिका। न त्यो प्रतीक्षालयको कठोर कुर्सी। ती सबै स्मृतिहरू — वर्षौं पछि — बुलडोजर र मतपत्रमा रूपान्तरित भए।</P>
            </Section>

            {/* ══ SECTION 3 — संघर्षका चरणहरू ══ */}
            <Section label="संघर्षका चरणहरू">
                <ImageBreak src="/images/balen1.jpg" caption="२०२२ — अभियानका शुरुका दिनहरू" />
                <P>त्यसअघि — बेङ्गलोर। कर्नाटक। भारत। स्ट्रक्चरल इन्जिनियरिङमा मास्टर्स गर्दैगर्दा, एउटा नेपाली केटो रातको कम्प्युटर स्क्रिनमा घरको खबर पढिरहेको थियो — भूकम्पको पुनर्निर्माण ढिलो भइरहेको छ, नेताहरू उही, व्यवस्था उही। अनि उसले टाइप गर्यो: &ldquo;मलाई देश कसरी बनाउने थाहा छ। अर्को पटक आफैंलाई भोट हाल्छु।&rdquo; त्यो पोस्टमा पहिलो कमेन्ट गर्ने थिए — सुनिल लम्साल, इन्जिनियरिङका साथी, जसले पछि काठमाडौं महानगरमा पूर्वाधार विज्ञको रूपमा काम गरे। यो केवल एउटा पोस्ट थिएन — यो पढेलेखेका मान्छेहरूको गठबन्धनको सुरुवात थियो।</P>
                <p className="mt-[3.5em] mb-[1.8em]">
                    ४ मे २०१७। २७ वर्षीय इन्जिनियर बालेन्द्र शाह मतदान केन्द्र पुगे। मतपत्र हेरे। तिनै अनुहार। तिनै वंश। तिनै दलहरू जसले दशकौंदेखि काठमाडौंलाई आफ्नो सम्पत्ति ठानेका थिए। २०१५ को भूकम्पमा भत्किएका २,५०० घरहरूको संरचनागत क्षति नाप्दै हिँडेका उनले देखेको थियो — व्यवस्थाले कसरी आम मान्छेलाई छोड्छ।
                </p>
                <P>उनले मत हालेनन्। घर फर्के। फेसबुक खोले। लेखे —</P>
                <PullQuote attribution="— बालेन्द्र शाह, ४ मे २०१७">
                    &ldquo;अर्को पटक मत हाल्छु — आफैलाई। किनभने मलाई थाहा छ देश कसरी बनाउने।&rdquo;
                </PullQuote>
                <P>पाँच वर्ष बिते। ती पाँच वर्षमा उनले चुप लागेनन्। भारतको कर्नाटकमा संरचनागत इन्जिनियरिङमा स्नातकोत्तर गरे। काठमाडौं फर्के। र्याप गरे। &ldquo;बलिदान&rdquo; लेखे। &ldquo;नेपाल हाँसेको...&rdquo; लेखे। भूमिगत मञ्चहरूमा उभिए। र भित्रभित्रै — गणित गर्दै रहे।</P>
                <P>१७ डिसेम्बर २०२१। फेसबुकमा एउटा पोस्ट — मेयर पदका लागि उम्मेदवारी घोषणा। कुनै पार्टीको झण्डा थिएन। कुनै नेताको आशीर्वाद थिएन। कुनै ठूलो कोष थिएन। थियो भने — एउटा दृष्टिकोण। एउटा स्कुटर। र भाइ।</P>
                <P>पुराना नेताहरूले करोडौं खर्चेर लाउडस्पिकरमा र्याली गरे। पोस्टर टाँसे। बसका छानामा चढे। बालेनले त्यसो गरेनन्। उनले &ldquo;रुट्स अफ नेपाल बन्द&rdquo; जस्ता सोसल मिडिया पेजहरू र सेलिब्रेटीहरूको सपोर्ट लिए — युवाहरूको मोबाइल स्क्रिनमा सिधै पुगे। परम्परागत मिडियाले उनलाई बेवास्ता गर्यो, उनले परम्परागत मिडियाको वास्ता गरेनन्। र उनको ९०,८३५ को भविष्यवाणी? यो जादु थिएन। इन्जिनियरले हिसाब गरेको थियो — वडावार जनसंख्या, भोटर टर्नआउटको ट्रेन्ड, युवा मतदाताको अनुमानित प्रतिशत। नेताहरू हाँसे। इन्जिनियरले गणित गरिरहेको थियो।</P>
                <P>सुरुका दिनहरू निर्मम थिए। काठमाडौंका धुलाम्मे चोकहरूमा उनी उभिन्थे — सस्तो माइक्रोफोन हातमा। पर्चाहरू बाँड्थे। बोल्थे। पर्खन्थे। उनका प्रमुख सहयोगी शिशिर बञ्जाराले पछि सम्झे — &ldquo;सुरुका दिनहरूमा बालेन भाइसँगै स्कुटरमा आउँथे — माइक्रोफोन र पर्चा बोकेर। कहिलेकाहीं चोकमा हामी पाँच जना मात्र हुन्थ्यौं।&rdquo;</P>
                <Isolated>पाँच जना।</Isolated>
                <PullQuote attribution="— बालेन्द्र शाह, बेङ्गलोर, २०१७">
                    &ldquo;मलाई देश कसरी बनाउने थाहा छ। अर्को पटक आफैंलाई भोट हाल्छु।&rdquo;
                </PullQuote>
                <P>पुरानो व्यवस्थाले बेवास्ता मात्र गरेन — खुलेआम हाँसे। दुई पटकका पूर्व मेयर केशव स्थापितले प्रचार अभियानमै उनको जातीय पहिचानमाथि प्रहार गरे। सार्वजनिक मञ्चबाट &ldquo;अन्तर्राष्ट्रिय ठग&rdquo; भने।</P>
                <P>उनले जवाफ दिएनन्। रिसाएनन्। चश्माको पछाडि के थियो — कसैलाई थाहा भएन। भूमिगत तहखानामा जसरी मौन रहे — त्यसरी नै यहाँ पनि। मौन उनको हतियार थियो।</P>
                <P>तर भूमिगत सञ्जालमा केही हुँदै थियो। उनका संगीत प्रशंसकहरू सामाजिक सञ्जालमा जम्मा हुन थाले। युवा सञ्जालहरूले उनको पक्षमा अभियान चलाए। &ldquo;अब युवाको पालो&rdquo; भन्ने नारा फैलियो। पाँच जनाको भिड बिस्तारै बढ्न थाल्यो।</P>
                <P>बालेनले एउटा सार्वजनिक घोषणा गरे — उनी ठ्याक्कै ९०,८३५ मत पाउनेछन्। नेताहरू फेरि हाँसे। इन्जिनियरले गणित गरिरहेको थियो।</P>
                <Isolated large gold>&ldquo;भ्रष्टाचारीलाई सेक्ने, बाआमालाई टेक्ने।&rdquo;</Isolated>
                <Isolated>पाँच जना।<br />एउटा स्कुटर।<br />एउटा देशको सपना।</Isolated>
            </Section>

            {/* ══ SECTION 4 — अँध्यारो रात ══ */}
            <Section label="अँध्यारो रात">
                <ImageBreak src="/images/balen_theKTMmayor.webp" caption="काठमाडौंका मेयर — परिवर्तन र विवादको बीचमा" />
                <p className="mt-[3.5em] mb-[1.8em]">
                    जित्नु सजिलो थियो। शासन गर्नु — त्यो अर्कै कुरा थियो। मेयरको कुर्सीमा बस्नेबित्तिकै उनलाई थाहा भयो — काठमाडौं भनेको एउटा शहर मात्र होइन। यो दशकौंको भ्रष्टाचार, अव्यवस्था, र निहित स्वार्थहरूको जटिल जालो हो। र त्यो जालो काट्न खोज्दा — जालोले नै तपाईंलाई बाँध्छ।
                </p>
                <P>पहिलो युद्ध फोहोरसँग थियो। बाँचरेदाण्डा र सिसडोल फोहोर व्यवस्थापन स्थल। काठमाडौंको सबैभन्दा पुरानो, सबैभन्दा जटिल समस्या। बालेनले डेढ महिनासम्म प्रत्येक दिन त्यो ठाउँ र कार्यालयबीच दौडे। समाधान खोजे। भेटेनन्। किनभने फोहोरको राजनीति फोहोरभन्दा पनि गन्हाउँथ्यो।</P>
                <P>उनका सल्लाहकारले पछि स्वीकार गरे — &ldquo;फोहोरमा यति धेरै राजनीति थियो कि यदि उनले अझ धेरै प्रयास गरेको भए उनको पूरै राजनीतिक जीवन नै संकटमा पर्थ्यो। सबै जना फोहोर व्यवस्थापनमा अवरोध गर्न एकजुट थिए।&rdquo;</P>
                <Isolated>पहिलो पटक। उनले हार मानेका थिए।</Isolated>
                <P>तर त्यसपछि उनले अर्कै युद्ध सुरु गरे। अगस्त २०२२ मा उनले स्थानीय सरकार सञ्चालन ऐन २०७४ लाई हतियार बनाए। बुद्धनगरको अल्फा बेटा कम्प्लेक्स। खिचापोखरीको आरबी कम्प्लेक्स। न्यू रोडको सुरज आर्केड। एकपछि अर्को — भत्काइए। उनले शक्तिशालीहरूलाई छोडेनन्। नर्भिक अस्पताललाई २४ घण्टाको अल्टिमेटम दिए।</P>
                <P>तर शासन भनेको केवल फोहोर र भवन होइन। राष्ट्र भनेको त्यसको भूगोल र इज्जत पनि हो। जब भारतले नेपाली भूभाग समेटेर &ldquo;सांस्कृतिक नक्सा&rdquo; निकाल्यो — बालेनले आफ्नो मेयरको कार्यालयमा &ldquo;ग्रेटर नेपाल&rdquo; को नक्सा झुण्ड्याइदिए। इन्डियामा पढेको मान्छे, इन्डियामा मास्टर्स गरेको — तर देशको भूभागको प्रश्नमा झुकेनन्। र चीनले नेपालको चुच्चे नक्सा नसमेटेको विरोधमा उनले आफ्नो चीन भ्रमण नै रद्द गरिदिए। दुवै छिमेकीलाई एउटै सन्देश — &ldquo;नेपाल फर्स्ट।&rdquo; यति मात्र।</P>
                <P>अप्रिल २०२३ मा उनले संघीय सरकारविरुद्ध नै युद्ध छेडे। सिंहदरबारका १४ वटा मन्त्रालयहरूको फोहोर उठाउन बन्द गराए। सिंहदरबार आफ्नै फोहोरमा डुब्न थाल्यो। नेकपा-एमालेका सांसद महेश बास्नेतले धम्की दिए — &ldquo;तपाईंले जुन तरिका अपनाउनुभयो — त्यही तरिका अरूले पनि तपाईंविरुद्ध अपनाउन थाले भने पछि गाह्रो हुन्छ।&rdquo;</P>
                <PullQuote attribution="— बालेन्द्र शाह, फेसबुक">
                    &ldquo;महानगरको गाडी रोकियो भने सिंहदरबारमा आगो लगाइदिन्छु, याद राख चोर सरकार।&rdquo;
                </PullQuote>
                <P>बालेनले जवाफ दिएनन्।</P>
                <P>तर यी सबै युद्धहरूको बीचमा — सबैभन्दा गहिरो घाउ अर्कैतिरबाट आयो। जुन मान्छेले &ldquo;सडक बालक&rdquo; लेखेका थिए — जुन मान्छेले गरिबहरूको पीडामा गीत बनाएका थिए — उनैले नोभेम्बर २०२२ मा नगर प्रहरीलाई लखेटाए। बाँसका लाठी। सुन्धाराका सडक व्यापारीहरूको सामान जफत। बागमती किनारका गरिब बस्तीहरू भत्काइए। एक्काइस जना घाइते भए।</P>
                <P>विरोध थियो। विवाद थियो। आलोचना थियो। तर संख्या बोल्थ्यो। उनको कार्यकालमा — अतिक्रमणमा परेको २०८ रोपनी सार्वजनिक जग्गा महानगरले फिर्ता पायो। त्यो जग्गाको मूल्य — करिब तेईस अर्ब रुपैयाँ। पुराना नेताहरूले बेचेको जमिन। धनीहरूले कब्जा गरेको जमिन। बालेनले फिर्ता ल्याएको जमिन। कार्यकर्ता र आलोचकहरू बोलिरहेका थिए। बुलडोजर काम गरिरहेको थियो।</P>
                <Isolated>२०८ रोपनी।<br />तेईस अर्ब।<br />काठमाडौंको जमिन — फिर्ता।</Isolated>
                <P>अर्जुन भट्टराई — एक सडक व्यापारी, जसको टाउकोमा लाठी परेको थियो — उनले भने —</P>
                <PullQuote attribution="— अर्जुन भट्टराई, सडक व्यापारी">
                    &ldquo;चुनावअघि मेयरले हामीलाई ठाउँ मिलाइदिन्छु भनेका थिए। पछि हामीले रोजीरोटी माग्दा टाउको फुट्यो। अन्तमा थाहा भयो — जितिसकेपछि नेताहरूले गरिबलाई बिर्सिदा रहेछन्।&rdquo;
                </PullQuote>
                <P>कार्यकर्ता &lsquo;इह&rsquo; नगर कार्यालयबाहिर १९९ घण्टा मूक उभिए। उनले भने — &ldquo;सत्य बाहिर आयो। नयाँ मान्छेहरूले पुरानाको जस्तै गल्ती गर्ने अधिकार पाउँदैनन्।&rdquo;</P>
                <P>फेब्रुअरी २०२३ मा उनले फेसबुकमा लेखे — आफूलाई पद छोड्न दबाब दिइँदैछ। दबाब कानुनी थिएन। मनोवैज्ञानिक थियो।</P>
                <P>मेयर भएको दिनदेखि उनले नेपाली मीडियामा एउटा पनि आधिकारिक अन्तर्वार्ता दिएनन्। पुराना नेताहरू दिनदिनै क्यामेराको अगाडि जान्थे — आफ्नो भ्यालु घटाउँथे। बालेनले आफ्नो कम्युनिकेसन आफैं कन्ट्रोल गरे — फेसबुकमार्फत, सिधै जनतासँग, बिचौलियाबिना। &ldquo;रहस्यमय।&rdquo; पत्रकारहरूले भने। तर रहस्य थिएन। अनुशासन थियो।</P>
                <P>र डिसेम्बर २०२५ मा — प्रधानमन्त्रीको अभियान सुरु गर्नुभन्दा ठिक अघि — उनका बुबा राम नारायण शाह बिते।</P>
                <Isolated>बुबा छैनन्।</Isolated>
            </Section>

            {/* ══ SECTION 5 — पुनर्जन्म ══ */}
            <Section label="पुनर्जन्म">
                <ImageBreak src="/images/balen_afterwinning2026election.jpg" caption="५ मार्च २०२६ — झापा-५ मा जितपछि" />
                <P>तर जित मतगणना केन्द्रमा मात्र हुँदैन। कहिलेकाहीं जित सडकमा पनि लेखिन्छ — रगतले। सेप्टेम्बर २०२५। नेपालका सडकहरूमा जेन-जी उत्रिए। विद्रोह। आक्रोश। न्याय माग्ने आवाजहरू। सरकारले ताकी-ताकी गोली हान्यो। सत्तर सात जनाले ज्यान गुमाए। त्यो रात बालेनले फेसबुक खोले। लेखे: &ldquo;तँ नेता त के मान्छे पनि बन्न सकिनस्, आतंकवादी होस्।&rdquo; जब पूरै व्यवस्था मौन थियो — एउटा मान्छेको आवाज सडकसम्म पुग्यो। पुरानो सत्ता ढल्यो। र बालेन — एउटा सहरको मेयरबाट — देशको आशाको प्रतीक बने।</P>
                <PullQuote attribution="— बालेन्द्र शाह, सेप्टेम्बर २०२५">
                    &ldquo;तँ नेता त के मान्छे पनि बन्न सकिनस्, आतंकवादी होस्।&rdquo;
                </PullQuote>
                <p className="mt-[3.5em] mb-[1.8em]">
                    २६ मे २०२२। राति। काठमाडौंको मतगणना केन्द्र। फ्लोरोसेन्ट बत्तीको चिसो उज्यालो। कुर्सीमा बसेका अधिकारीहरू। कागजका थुप्राहरू। र एउटा डिजिटल बोर्ड — जसमा अङ्कहरू बिस्तारै अपडेट हुँदै थिए। कोठाभरि सन्नाटा थियो।
                </p>
                <P>त्यसपछि बोर्डमा एउटा सङ्ख्या देखियो —</P>
                <Isolated large gold>बालेन शाह — ६१,७६७</Isolated>
                <P>सिर्जना सिंह — ३८,३४१ &nbsp;·&nbsp; केशव स्थापित — ३८,११७ &nbsp;·&nbsp; २३,४२६ मतको अन्तरले जित।</P>
                <P>सिर्जना सिंह — नेपाली काँग्रेसकी उम्मेदवार। प्रकाश मान सिंहकी पत्नी। गणेशमान सिंहकी बुहारी। वंशवादी राजनीतिको प्रतीक। केशव स्थापित — दुई पटकका पूर्व मेयर। सार्वजनिक मञ्चबाट &ldquo;अन्तर्राष्ट्रिय ठग&rdquo; भन्ने मान्छे। दुवैलाई — एक ३२ वर्षीय र्यापर इन्जिनियरले — धुलो चटायो।</P>
                <P>बाहिर काठमाडौं जागिसकेको थियो। युवाहरू घरबाहिर निस्किएका थिए — हातमा लाउरो। नाराहरू आकाश चिरेर गए। बालेन मतगणना केन्द्रबाहिर निस्किए। कालो सुट। कालो चश्मा। अनुहारमा कुनै उत्सव थिएन।</P>
                <Isolated>एकपटक। बिस्तारै। टाउको हल्लाए।</Isolated>
                <P>बाहिर हजारौं युवाको चिच्याहट आकाश चिर्यो। भित्र उनले सोचे — यो मेरो जित होइन। यो सत्तर सात जनाको जित हो जो अब छैनन्। त्यसैले त उनले र्याली गरेनन्। उत्सव मनाएनन्। सहिदहरूको स्मृतिमा मौन रहे। र त्यो मौनले — त्यो संयमले — उनलाई पुराना नेताहरूभन्दा अलग देखायो। चुनावभर उनले कहिल्यै &ldquo;म जित्छु&rdquo; भनेनन्। सधैं &ldquo;हामी जित्छौं&rdquo; भने — किनभने उनलाई थाहा थियो, एउटा मान्छे मर्छ, विचार मर्दैन।</P>
                <PullQuote attribution="— बालेन्द्र शाह, २६ मे २०२२">
                    &ldquo;हामीले यो चुनाव परिणामलाई आफ्नो दृष्टिकोण र एजेन्डा स्थापित गर्ने सुरुवातको रूपमा लिएका छौं। काठमाडौं हाम्रो परिवार थियो, छ र रहनेछ। अब हामी मिलेर काठमाडौंलाई विश्वकै सुन्दर र उत्कृष्ट शहर बनाउनेछौं।&rdquo;
                </PullQuote>
                <P muted>तपाईंले त्यो रात फोनको स्क्रिनमा ती अङ्कहरू हेर्नुभयो — विदेशको कुनै कोठामा, मध्यरातको एकान्तमा। र पहिलो पटक — धेरै वर्षपछि — घर फर्किन मन लाग्यो।</P>
                <P>चार पटकका प्रधानमन्त्री। झापाबाट छ पटक संसद। तीस वर्षको एकछत्र राज। केपी शर्मा ओली। उनलाई त्यो निर्वाचन क्षेत्रमा जित्न एउटा-दुई सभा गर्दा पुग्थ्यो — अनि पुरै देशभर अरू उम्मेदवारको प्रचारमा हिँड्थे। २०२२ मा पनि उनले सुरुङमा एउटा सभा गरेर भने थिए: &ldquo;मेरो निर्वाचन क्षेत्रमा कुनै समस्या छैन।&rdquo; कसैलाई शंका थिएन।</P>
                <P>तर सेप्टेम्बर २०२५ मा — जब उनकै सरकारले सत्तर सात जनाको ज्यान लियो — झापाको हावा बदलिन थाल्यो।</P>
                <P>बालेनसँग सजिलो ठाउँहरू थिए। काठमाडौंमा जित्न सकिन्थ्यो — उनको ब्रान्ड, उनको प्रशंसक, उनको शहर। तर जब सोधियो — किन झापा-५?</P>
                <PullQuote attribution="— बालेन्द्र शाह">
                    &ldquo;किनभने जेन-जीलाई न्याय दिन मैले कानुनी रूपमा गर्न सक्ने यही मात्र थियो।&rdquo;
                </PullQuote>
                <P>सत्तर सात जनाले ज्यान दिएका थिए। उनीहरूको सपनाको कर्जा चुकाउन — बालेनले सबैभन्दा कठिन ठाउँ रोजे। ओलीले झापामा नै बस्नुपर्यो। घरघर गएर भोट माग्नुपर्यो। चार पटकका प्रधानमन्त्रीले आफ्नो गढमा भोट माग्नु — त्यो दृश्य नै परिवर्तनको संकेत थियो।</P>
                <P>मार्च ७, २०२६। साँझ ६ बजेर ८ मिनेट। झापा-५ को मतगणना केन्द्र। स्क्रिनमा अङ्कहरू देखिए।</P>
                <Isolated large gold>बालेन शाह — ६८,३४८<br />केपी शर्मा ओली — १८,७३४</Isolated>
                <P>बाहिर समर्थकहरूले &ldquo;रातो र चन्द्र सूर्य&rdquo; गाउन थाले। &ldquo;यो जित कसको? बालेनको!&rdquo; नारा आकाश चिर्यो। बालेन बाहिर निस्किए। हातमा नेपालको राष्ट्रिय झण्डा। र एउटा पोस्टर — &ldquo;यो तपाईंको जित हो।&rdquo;</P>
                <P>ती ६८,३४८ मत — नेपालको संसदीय चुनावको इतिहासमा कसैले पनि पाएको सबैभन्दा धेरै मत। यसअघिको रेकर्ड ओलीले नै त्यही निर्वाचन क्षेत्रबाट सन् २०१७ मा बनाएका थिए। बालेनले ओलीलाई मात्र हराएनन्। उनले ओलीकै रेकर्ड तोडे — उनकै घरमा गएर। उनकै हतियारले।</P>
                <Isolated>अजेय देवताहरू पनि रगत बगाउँछन्।</Isolated>
            </Section>

            {/* ══ SECTION 6 — फिर्ती ══ */}
            <Section label="फिर्ती">
                <ImageBreak src="/images/balen2_afterwinningtheelection.avif" caption="नेपाल — अब उनको हातमा" />
                <p className="mt-[3.5em] mb-[1.8em]">
                    उनी अब ढुङ्गा हान्ने मान्छे होइनन्। उनीसँग अब किल्लाको साँचो छ। तर साँचो हातमा लिँदा — भार थाहा हुन्छ।
                </p>
                <P>नेपालको इतिहास हेर्नुस् — ३५ वर्षमा ३१ प्रधानमन्त्री। संगीतका कुर्सीहरू। तिनै अनुहार। तिनै परिवार। तिनै दलहरू। त्यो खेल मार्च २०२६ मा सकियो। ३५ वर्षीय बालेन्द्र शाह — मधेशी समुदायबाट नेपालको पहिलो प्रधानमन्त्री-मनोनीत। पहाडी उच्चजातीय वर्चस्वको २५० वर्षे अलिखित नियम — एकै झट्कामा भाँचियो।</P>
                <P>तर बालेन जान्थे — अनुहार फेरेर काम हुँदैन। ओलीले राजीनामा दिँदा, अन्तरिम सरकार बन्दा — दुवै पटक उनले एउटै कुरा भने: &ldquo;संसद विघटन।&rdquo; किनभने पुरानो संसद रहिरह्यो भने नयाँ प्रधानमन्त्री आए पनि पुराना खेलाडीहरू पर्दा पछाडि उही रहन्छन्। बुलडोजरले संरचना मात्र भत्काउँछ — सिस्टम भत्काउन नयाँ जनादेश चाहिन्छ। इन्जिनियरले गणित गरेको थियो। १६५ प्रत्यक्ष। ११० समानुपातिक। देशको नक्सा — वडावडादेखि।</P>
                <P>तर यो विजयको मिठास पूर्ण थिएन। किनभने जुन मान्छेले उनलाई त्यो प्रतीक्षालयको कुनामा लिएर जान्थे — जसले कविता लेख्थे — जसले बीउ रोपेका थिए — उनी थिएनन्। डिसेम्बर २०२५ मा राम नारायण शाह बिते। बुबाले छोराले प्रधानमन्त्री बन्ने दिन कहिल्यै देखेनन्।</P>
                <Isolated>बुबा छैनन्।</Isolated>
                <P>यो पीडा — यो एउटा विशेष किसिमको पीडा हो। जब तपाईं आफ्नो सबैभन्दा ठूलो जित हासिल गर्नुहुन्छ — र फर्केर हेर्दा — जसलाई देखाउन सबैभन्दा बढी चाहनुहुन्थ्यो — उनी छैनन्। तपाईंलाई पनि थाहा छ यो भार।</P>
                <P>सेप्टेम्बर २०२५ मा — जब ७७ युवा सडकमा मारिए — उनले युवाहरूलाई सन्देश दिए —</P>
                <PullQuote attribution="— बालेन्द्र शाह">
                    &ldquo;प्रिय युवा पुस्ता, तिम्रो हत्यारा सत्तामुक्त भयो। अब तिम्रो पुस्ताले देश चलाउनु पर्छ। तयार हौ।&rdquo;
                </PullQuote>
                <P>२० वर्षीय आयुष भट्टराईले भने — &ldquo;हामीले तपाईंलाई विश्वास गर्यौं। अब त्यो विश्वासमाथि नखेल्नुहोस्। हामी तपाईंलाई माया गर्छौं, बालेन।&rdquo;</P>
                <P>२५ वर्षीया विपना ओली कुवेतबाट फर्किइन् — झापा-५ मा मत हाल्न मात्र। उनले भनिन् — &ldquo;म कति समय कुवेतमा काम गर्छु भन्ने कुरा बालेनको जित र उनले बनाउने नीतिहरूमा भर पर्छ।&rdquo;</P>
                <P>उनले पार्टीका &ldquo;झोले&rdquo; कार्यकर्ताहरूलाई होइन — पढेलेखेका विज्ञहरूको सर्कलमा विश्वास गरे। बेङ्गलोरका साथी सुनिल लम्साल — इन्जिनियर — महानगरको पूर्वाधार विज्ञ बने। आफ्नो क्षेत्रको मान्छे। जसले काम गर्न जान्छ, गफ दिन होइन। यो परम्परागत राजनीतिबाट पूर्णतः फरक थियो। बालेनको आधार थियो — के गर्न जान्छस्?</P>
                <Isolated>एउटा वाक्य। एउटा २५ वर्षीया केटीको एउटा वाक्य। जसमा लाखौं नेपालीको सपना थियो।</Isolated>
                <P>उनी सन्त होइनन्। उनी मसीहा होइनन्। उनी एउटा मान्छे हुन् — जसले असम्भव ठाउँबाट सुरु गरे। जसले हरेक पटक ढलेर उठे। जसले आफ्नो पहिचानको मूल्य तिरेर यहाँसम्म आए।</P>
                <P>सानोमा जुन केटाले लेख्न जानेका थिएनन् — उनले देशको भाग्य लेख्ने जिम्मेवारी पाएका छन्। जुन केटाले प्रतीक्षालयको कुनामा बसेर व्यवस्थाको सडाँध सुँघेका थिए — उनी अब त्यही व्यवस्थाका मालिक छन्।</P>
                <P>यो कथा बालेन्द्र शाहको मात्र होइन। यो कुवेतमा झोला बाँध्दै गरेकी त्यो केटीको कथा हो — जसलाई पहिलो पटक लाग्यो, देशले फिर्ता बोलाउला। यो काठमाडौंको सडकमा उभिएको त्यो विद्यार्थीको कथा हो — जसले बुझ्यो, आफ्नो आवाज लाठीभन्दा बलियो छ। यो त्यो पीडादायी, सुन्दर बोधको कथा हो —</P>
                <Isolated>कुनै मसीहा आउँदैन।</Isolated>
                <P>व्यवस्था तब मात्र बदलिन्छ — जब त्यसले तोडेका मान्छेहरूले त्यसलाई फिर्ता तोड्ने निर्णय गर्छन्। बालेन शाहले प्रमाणित गरे — अजेय देवताहरू पनि रगत बगाउँछन्।</P>
            </Section>

            {/* ══ CLOSING ══ */}
            <div className="bg-[#0A0A0A] border-t border-white/5 pt-[100px] pb-[40px] px-6 text-center">
                <FadeIn>
                    <p className="font-sans text-[#B0B8C8] leading-[1.85] max-w-[680px] mx-auto mb-16 text-base md:text-[1.05rem]">
                        तपाईंलाई थाहा छ — जब एउटा पुस्ता उठ्छ, इतिहास फेरिन्छ। सत्तर सात जना ज्यान दिए। एउटा मान्छेले सबैभन्दा कठिन ठाउँ रोजेर लड्यो। यो उनको मात्र अग्नि परीक्षा होइन। यो हामी सबैको। उनले प्रमाण दिए कि &ldquo;राजाको छोरा मात्र राजा बन्छ&rdquo; भन्ने कुरा झूठ हो।
                    </p>
                    <p className="font-display tracking-[0.02em] uppercase text-[#C9A84C] mx-auto" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.05 }}>
                        बाँकी — तपाईंको हातमा छ।
                    </p>
                </FadeIn>
            </div>

            {/* ══ SHARE SECTION ══ */}
            <div className="bg-[#0A0A0A] pb-[120px] px-6 text-center">
                <p className="font-stats text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] mb-8">
                    यो कथा अर्को नेपालीसँग साझा गर्नुस्
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
                    {[
                        { id: 'whatsapp', label: 'ह्वाट्सएप', onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank') },
                        { id: 'facebook', label: 'फेसबुक', onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank') },
                        { id: 'copy', label: copyDone ? 'कपी भयो ✓' : 'लिंक कपी गर्नुस्', onClick: handleCopy },
                    ].map(({ id, label, onClick }) => (
                        <button
                            key={id === 'copy' ? 'copy-link-button' : id}
                            onClick={onClick}
                            className="font-stats text-[12px] tracking-[0.15em] uppercase text-[#C9A84C] border border-[#C9A84C]/40 px-6 py-3 bg-transparent hover:bg-[#C9A84C]/8 hover:border-[#C9A84C] transition-all duration-300 cursor-pointer w-full sm:w-auto text-center"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ══ STORY COMPANION ══ */}
            <StoryCompanion />

        </div>
    );
}
