"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LockerStoryClientProps {
    dbValue: string;
    era: string;
}

const LSC_STYLES = `
    /* ── BROADCAST VOLTAGE METER ── */
    .lsc-seismo-bars {
        display: flex;
        align-items: flex-end;
        gap: 3px;
        height: 24px;
    }
    .lsc-seismo-bar {
        width: 3px;
        background: #C41E3A;
        border-radius: 9999px;
        transform-origin: bottom center;
        animation: lscSeismoWave 1.4s ease-in-out infinite alternate;
    }
    @keyframes lscSeismoWave {
        0% { transform: scaleY(0.15); opacity: 0.4; }
        100% { transform: scaleY(1.3); opacity: 1; }
    }

    /* ── AMBIENT FLOATING EMBERS ── */
    .lsc-embers-container {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
        opacity: 0.4;
    }
    .lsc-ember {
        position: absolute;
        bottom: -15px;
        width: 3px;
        height: 3px;
        background: #C9A84C;
        border-radius: 50%;
        box-shadow: 0 0 6px #C9A84C, 0 0 10px #C41E3A;
        animation: lscFloatEmber 3.5s infinite linear;
    }
    @keyframes lscFloatEmber {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        15% { opacity: 0.9; }
        85% { opacity: 0.7; }
        100% { transform: translateY(-220px) translateX(var(--ember-drift, 20px)) scale(0); opacity: 0; }
    }

    /* ── TELEMETRY RING PULSE ── */
    .lsc-telemetry-ring {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .lsc-telemetry-ring::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px dashed rgba(201, 168, 76, 0.2);
        border-radius: 50%;
        animation: lscSpin 15s linear infinite;
    }
    @keyframes lscSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default function LockerStoryClient({ dbValue, era }: LockerStoryClientProps) {
    const router = useRouter();
    const [pageTransitioning, setPageTransitioning] = useState<boolean>(false);

    // Vibration triggers for tactile ticks on navigation clicks
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([15, 10, 15]);
        }
        setPageTransitioning(true);
        setTimeout(() => {
            router.push(href);
        }, 300);
    };

    return (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: LSC_STYLES }} />

            {/* Ambient Ember particles on detail page */}
            <div className="lsc-embers-container">
                {[...Array(6)].map((_, i) => {
                    const randomDrift = -40 + Math.random() * 80;
                    const randomLeft = 5 + Math.random() * 90;
                    const randomDelay = Math.random() * 3;
                    return (
                        <div
                            key={i}
                            className="lsc-ember"
                            style={{
                                left: `${randomLeft}%`,
                                animationDelay: `${randomDelay}s`,
                                "--ember-drift": `${randomDrift}px`,
                            } as React.CSSProperties}
                        />
                    );
                })}
            </div>

            {/* Interactive sidebar telemetry bindings inside parent layouts */}
            <div className="hidden" id="lsc-telemetry-bridge" data-db={dbValue} data-era={era} />
        </div>
    );
}
