"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface Fan {
    name: string;
    city: string;
    memory: string;
    chant: string;
}

interface Chant {
    nepali: string;
    tivrata: string;
}

// Seismograph waveform bars — client-only, stable heights via seed
const WAVE_HEIGHTS = [30,80,45,65,20,95,50,75,35,88,60,40,72,28,85,55,42,90,38,70,48,82,25,68,92,33,78,52,62,44];

function HeroWaveform() {
    return (
        <div className="fz-waveform">
            {WAVE_HEIGHTS.map((h, i) => (
                <div
                    key={i}
                    className="fz-bar"
                    style={{
                        height: `${h}%`,
                        animationDelay: `${-(i * 0.07)}s`,
                    }}
                />
            ))}
        </div>
    );
}

const FZ_STYLES = `
    .fz-waveform {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        opacity: 0.15;
        mix-blend-mode: screen;
        pointer-events: none;
    }
    .fz-bar {
        width: 3px;
        background: linear-gradient(to top, #C41E3A, #ff6b6b);
        box-shadow: 0 0 8px rgba(196,30,58,0.9);
        animation: fzPulse 2s ease-in-out infinite alternate;
        border-radius: 2px;
    }
    @keyframes fzPulse {
        0%   { transform: scaleY(0.4); opacity: 0.3; }
        100% { transform: scaleY(1.6); opacity: 1; }
    }
    @keyframes fzFadeOut {
        0%   { opacity: 1; visibility: visible; }
        100% { opacity: 0; visibility: hidden; }
    }
    @keyframes fzWordIn {
        0%   { opacity: 0; transform: scale(0.96) translateY(8px); }
        20%  { opacity: 1; transform: scale(1)    translateY(0);    }
        80%  { opacity: 1; transform: scale(1)    translateY(0);    }
        100% { opacity: 0; transform: scale(1.04) translateY(-6px); }
    }
    @keyframes fzUp {
        from { opacity: 0; transform: translateY(40px); }
        to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes fzRumble {
        0%   { transform: translate(0,0)     rotate(0deg);   }
        20%  { transform: translate(3px,2px)  rotate(0.4deg); }
        40%  { transform: translate(-2px,-2px) rotate(-0.4deg); }
        60%  { transform: translate(2px,-1px)  rotate(0.3deg); }
        80%  { transform: translate(-1px,3px)  rotate(-0.3deg); }
        100% { transform: translate(0,0)     rotate(0deg);   }
    }
    .fz-tunnel {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: #020205;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fzFadeOut 0.8s ease-in-out 2.6s forwards;
    }
    .fz-tunnel-text {
        font-family: Mukta, sans-serif;
        font-size: clamp(16px, 3vw, 28px);
        color: rgba(255,255,255,0.75);
        text-align: center;
        padding: 0 24px;
        letter-spacing: 0.04em;
        animation: fzWordIn 2.4s ease-in-out 0.3s forwards;
        opacity: 0;
    }
    .fz-hero-text {
        animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3s both;
    }
    .fz-chants { animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3.2s both; }
    .fz-pulse  { animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3.4s both; }
    .fz-wall   { animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3.6s both; }
    .fz-climax { animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3.8s both; }
    .fz-rumbling { animation: fzRumble 0.08s linear infinite; }
    .fz-chant-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 0;
        border-top: 1px solid rgba(255,255,255,0.05);
        position: relative;
        overflow: hidden;
        cursor: default;
    }
    .fz-chant-row::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, rgba(196,30,58,0.08), transparent 60%);
        transform: translateX(-100%);
        transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
    }
    .fz-chant-row:hover::before { transform: translateX(0); }
    .fz-chant-text {
        font-family: Mukta, sans-serif;
        font-weight: 800;
        font-size: clamp(28px, 5vw, 60px);
        color: rgba(255,255,255,0.22);
        line-height: 1;
        transition: color 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        transform-origin: left center;
        position: relative;
        z-index: 1;
    }
    .fz-chant-row:hover .fz-chant-text {
        color: rgba(255,255,255,0.95);
        transform: translateX(12px) scale(1.02);
    }
    .fz-chant-badge {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.3em;
        opacity: 0;
        transform: translateX(12px);
        transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
        position: relative;
        z-index: 1;
    }
    .fz-chant-row:hover .fz-chant-badge {
        opacity: 1;
        transform: translateX(0);
    }
    .fz-fan-card {
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        cursor: pointer;
        height: 360px;
        background: #0A0C14;
    }
    .fz-fan-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.25;
        filter: grayscale(0.8);
        transition: opacity 0.7s ease, filter 0.7s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .fz-fan-card:hover .fz-fan-img {
        opacity: 0.55;
        filter: grayscale(0.1);
        transform: scale(1.05);
    }
    .fz-fan-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.4) 70%, transparent);
        transition: background 0.5s ease;
    }
    .fz-fan-card:hover .fz-fan-overlay {
        background: linear-gradient(to top, rgba(8,0,0,0.97) 40%, rgba(4,0,0,0.6) 70%, transparent);
    }
    .fz-fan-content {
        position: absolute;
        inset: 0;
        padding: 28px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .fz-fan-memory {
        font-family: Mukta, sans-serif;
        font-size: 16px;
        line-height: 1.65;
        color: rgba(255,255,255,0.88);
        margin-bottom: 20px;
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.5s ease 0.12s, transform 0.5s ease 0.12s;
    }
    .fz-fan-card:hover .fz-fan-memory {
        opacity: 1;
        transform: translateY(0);
    }
    .fz-fan-meta {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 14px;
        transform: translateY(8px);
        transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
    }
    .fz-fan-card:hover .fz-fan-meta { transform: translateY(0); }
    .fz-fan-name {
        font-family: 'Barlow Condensed', sans-serif;
        font-weight: 700;
        font-size: 14px;
        color: white;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }
    .fz-fan-city {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 11px;
        color: #C9A84C;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        margin-top: 3px;
    }
    .fz-hold-btn {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        border: 1px solid rgba(196,30,58,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        cursor: pointer;
        transition: border-color 0.4s, background 0.4s, transform 0.3s;
        position: relative;
        z-index: 10;
        -webkit-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }
    .fz-hold-btn:hover {
        border-color: rgba(196,30,58,0.7);
        background: rgba(196,30,58,0.06);
    }
    .fz-hold-btn.fz-holding {
        transform: scale(0.88);
        border-color: #C41E3A;
        background: rgba(196,30,58,0.15);
    }
    .fz-hold-inner {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid rgba(196,30,58,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
    }
    .fz-holding .fz-hold-inner {
        background: #C41E3A;
        box-shadow: 0 0 40px rgba(196,30,58,1), 0 0 80px rgba(196,30,58,0.5);
        transform: scale(1.12);
    }
    .fz-hold-label {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 11px;
        letter-spacing: 0.3em;
        color: rgba(196,30,58,0.8);
        text-transform: uppercase;
        transition: color 0.3s;
    }
    .fz-holding .fz-hold-label { color: white; }
    .fz-commentary {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    .fz-commentary.visible { opacity: 1; }
    .fz-commentary-text {
        font-family: 'Bebas Neue', sans-serif;
        font-size: clamp(48px, 8vw, 110px);
        color: white;
        text-align: center;
        line-height: 0.9;
        letter-spacing: -0.01em;
        text-shadow: 0 0 40px rgba(196,30,58,0.8), 0 4px 30px rgba(0,0,0,0.8);
        padding: 0 20px;
    }
    .fz-section-label {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 12px;
        color: #C9A84C;
        text-transform: uppercase;
        letter-spacing: 0.25em;
        margin-right: 16px;
        white-space: nowrap;
    }
    .fz-divider {
        flex-grow: 1;
        border: none;
        border-top: 1px solid rgba(201,168,76,0.2);
    }
    .fz-pulse-bar {
        position: relative;
        height: 64px;
        width: 100%;
        background: #11131C;
        border-radius: 9999px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: inset 0 2px 12px rgba(0,0,0,0.6);
    }
    .fz-pulse-spinner {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(59,130,246,0.75);
        transition: width 0.7s cubic-bezier(0.16,1,0.3,1);
    }
    .fz-pulse-pacers {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background: rgba(196,30,58,0.75);
        transition: width 0.7s cubic-bezier(0.16,1,0.3,1);
    }
    .fz-pulse-handle {
        position: absolute;
        top: 0;
        height: 100%;
        width: 8px;
        background: white;
        box-shadow: 0 0 18px rgba(255,255,255,0.9);
        transform: translateX(-50%);
        transition: left 0.7s cubic-bezier(0.16,1,0.3,1);
        border-radius: 4px;
    }
    .fz-pulse-labels {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 28px;
        pointer-events: none;
    }
    .fz-pulse-lbl {
        font-family: 'Barlow Condensed', sans-serif;
        font-weight: 700;
        font-size: 13px;
        color: white;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        text-shadow: 0 1px 6px rgba(0,0,0,0.8);
    }
`;

export default function FanZoneClient({ fans, chants }: { fans: Fan[]; chants: Chant[] }) {
    const [mounted, setMounted]     = useState(false);
    const [holding, setHolding]     = useState(false);
    const [pulseVal, setPulseVal]   = useState(50);

    useEffect(() => { setMounted(true); }, []);

    const startHold = useCallback(() => {
        setHolding(true);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([60, 40, 60]);
        }
    }, []);

    const stopHold = useCallback(() => { setHolding(false); }, []);

    const handleBarClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPulseVal(((e.clientX - rect.left) / rect.width) * 100);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: FZ_STYLES }} />

            <div className={`bg-[#07080F] min-h-screen pb-32 relative${holding ? " fz-rumbling" : ""}`}>

                {/* ── TUNNEL WALK ENTRY ── */}
                <div className="fz-tunnel">
                    <p className="fz-tunnel-text">
                        हामी मैदान बाहिर हुन्छौं,<br />तर खेल हाम्रो मुटुमा हुन्छ।
                    </p>
                </div>

                {/* ── GLOBAL ATMOSPHERE ── */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0" style={{
                        background: `radial-gradient(circle at 15% 90%, rgba(196,30,58,${holding ? "0.18" : "0.07"}), transparent 55%),
                                     radial-gradient(circle at 85% 10%, rgba(0,56,147,0.07), transparent 50%)`,
                        transition: "background 0.8s ease",
                    }} />
                </div>

                {/* ── HERO: THE RICHTER SCALE ── */}
                <section className="relative w-full flex flex-col justify-end overflow-hidden" style={{ height: "68vh" }}>
                    <HeroWaveform />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/75 to-transparent z-10" />

                    <div className="fz-hero-text relative z-20 px-6 lg:px-16 w-full max-w-7xl mx-auto pb-16">
                        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"13px", color:"#C41E3A", letterSpacing:"0.4em", textTransform:"uppercase", display:"block", marginBottom:"16px", textShadow:"0 0 12px rgba(196,30,58,0.6)" }}>
                            THE 12TH RHINO — FAN ZONE
                        </span>
                        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(72px,12vw,156px)", lineHeight:"0.88", letterSpacing:"-0.01em", color:"white", textShadow:"0 8px 40px rgba(0,0,0,0.6)", margin:0 }}>
                            THE ROAR<br />OF THE<br />RHINOS
                        </h1>
                    </div>
                </section>

                {/* ── CHANTS: SOUNDSCAPES ── */}
                <section className="fz-chants relative z-20 px-6 lg:px-16 w-full max-w-7xl mx-auto mt-20">
                    <div style={{ display:"flex", alignItems:"center", marginBottom:"40px" }}>
                        <span className="fz-section-label">मैदानको आवाज // THE CHANTS</span>
                        <hr className="fz-divider" />
                    </div>

                    <div>
                        {chants.map((chant, idx) => (
                            <div key={idx} className="fz-chant-row">
                                <span className="fz-chant-text">{chant.nepali}</span>
                                <span
                                    className="fz-chant-badge"
                                    style={{ color: chant.tivrata === "उच्चतम" ? "#C41E3A" : "#C9A84C" }}
                                >
                                    {chant.tivrata}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FAN PULSE: TUG OF WAR ── */}
                <section className="fz-pulse relative z-20 px-6 lg:px-16 w-full max-w-7xl mx-auto mt-36">
                    <div style={{ background:"#0A0C14", border:"1px solid rgba(255,255,255,0.05)", borderRadius:"8px", padding:"clamp(28px,5vw,56px)", position:"relative", overflow:"hidden" }}>
                        <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"linear-gradient(to right,rgba(59,130,246,0.5),transparent,rgba(196,30,58,0.5))" }} />

                        <div style={{ textAlign:"center", marginBottom:"36px" }}>
                            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"12px", color:"#C9A84C", letterSpacing:"0.25em", textTransform:"uppercase", display:"block", marginBottom:"10px" }}>
                                Fan Pulse — Live Poll
                            </span>
                            <h3 style={{ fontFamily:"Mukta,sans-serif", fontWeight:800, fontSize:"clamp(20px,4vw,38px)", color:"white", margin:0 }}>
                                आजको खेल कसको हातमा?
                            </h3>
                            <p style={{ fontFamily:"Mukta,sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.35)", marginTop:"6px" }}>
                                Who commands the middle overs?
                            </p>
                        </div>

                        <div className="fz-pulse-bar" onClick={handleBarClick}>
                            <div className="fz-pulse-spinner" style={{ width:`${pulseVal}%` }} />
                            <div className="fz-pulse-pacers" style={{ width:`${100-pulseVal}%` }} />
                            <div className="fz-pulse-handle" style={{ left:`${pulseVal}%` }} />
                            <div className="fz-pulse-labels">
                                <span className="fz-pulse-lbl">🌀 Spinners</span>
                                <span className="fz-pulse-lbl">Pacers ⚡</span>
                            </div>
                        </div>

                        <div style={{ display:"flex", justifyContent:"space-between", marginTop:"12px", padding:"0 4px" }}>
                            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"22px", fontWeight:700, color:"rgba(59,130,246,0.85)" }}>
                                {Math.round(pulseVal)}%
                            </span>
                            <span style={{ fontFamily:"Mukta,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.3)", alignSelf:"flex-end", paddingBottom:"3px" }}>
                                क्लिक गरेर आफ्नो मत दिनुस्
                            </span>
                            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"22px", fontWeight:700, color:"rgba(196,30,58,0.85)" }}>
                                {Math.round(100-pulseVal)}%
                            </span>
                        </div>
                    </div>
                </section>

                {/* ── FAN WALL: DEVOTION GALLERY ── */}
                <section className="fz-wall relative z-20 px-6 lg:px-16 w-full max-w-7xl mx-auto mt-36">
                    <div style={{ display:"flex", alignItems:"center", marginBottom:"40px" }}>
                        <span className="fz-section-label">फ्यान पर्खाल // DEVOTION GALLERY</span>
                        <hr className="fz-divider" />
                    </div>

                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px" }}>
                        {fans.map((fan, idx) => {
                            // Stable, cinematic picsum IDs that won't be stock-sports-generic
                            const IMG_IDS = [160,214,247,338,374,430,493,508,513,524,542,578,581,633,639,656,683,690,735,740];
                            const imgId = IMG_IDS[idx % IMG_IDS.length];
                            const isWide = idx === 0 || (fans.length > 4 && idx === Math.floor(fans.length / 2));

                            return (
                                <div
                                    key={idx}
                                    className="fz-fan-card"
                                    style={{ gridColumn: isWide ? "span 2" : "span 1" }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className="fz-fan-img"
                                        src={`https://picsum.photos/id/${imgId}/900/600`}
                                        alt="Fan backdrop"
                                        draggable={false}
                                    />
                                    <div className="fz-fan-overlay" />

                                    <div className="fz-fan-content">
                                        <p className="fz-fan-memory">"{fan.memory}"</p>
                                        <div className="fz-fan-meta">
                                            <div>
                                                <div className="fz-fan-name">{fan.name}</div>
                                                <div className="fz-fan-city">{fan.city}</div>
                                            </div>
                                            <div style={{ fontFamily:"Mukta,sans-serif", fontSize:"13px", color:"#C9A84C", fontWeight:700, fontStyle:"italic" }}>
                                                {fan.chant}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── CLIMAX: HOLD TO FEEL ── */}
                <section className="fz-climax relative z-20 w-full flex flex-col items-center justify-center mt-48 mb-16 min-h-[44vh]">

                    {/* Commentary Reveal */}
                    <div className={`fz-commentary${holding ? " visible" : ""}`}>
                        <p className="fz-commentary-text">
                            AND NEPAL<br />QUALIFIES FOR<br />THE WORLD CUP!
                        </p>
                    </div>

                    {/* Pulsing Ring Decoration */}
                    <div
                        style={{
                            position:"absolute",
                            width: holding ? "300px" : "180px",
                            height: holding ? "300px" : "180px",
                            borderRadius:"50%",
                            border:`1px solid rgba(196,30,58,${holding ? "0.5" : "0.15"})`,
                            transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)",
                            pointerEvents:"none",
                        }}
                    />

                    {/* Hold Button */}
                    <button
                        className={`fz-hold-btn${holding ? " fz-holding" : ""}`}
                        onMouseDown={startHold}
                        onMouseUp={stopHold}
                        onMouseLeave={stopHold}
                        onTouchStart={startHold}
                        onTouchEnd={stopHold}
                        aria-label="Hold to feel the roar"
                    >
                        <div className="fz-hold-inner">
                            <span className="fz-hold-label">HOLD</span>
                        </div>
                    </button>

                    <p style={{ fontFamily:"Mukta,sans-serif", fontSize:"13px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:"28px", transition:"opacity 0.4s", opacity: holding ? 0 : 1 }}>
                        गर्जाहट महसुस गर्न थिचिराख्नुस्
                    </p>
                </section>

                {/* Closing fade */}
                <div style={{ textAlign:"center", padding:"60px 0 40px 0" }}>
                    <p style={{ fontFamily:"Mukta,sans-serif", fontStyle:"italic", fontSize:"clamp(13px,1.4vw,16px)", color:"rgba(255,255,255,0.12)", margin:0 }}>
                        जब स्टेडियम गर्जन्छ — त्यो आवाज हाम्रो हो।
                    </p>
                </div>
            </div>
        </>
    );
}
