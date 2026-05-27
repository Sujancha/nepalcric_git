"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ScoreboardStoryClientProps {
    dbValue: string;
    series: string;
}

const SSC_STYLES = `
    /* ── BROADCAST VOLTAGE METER ── */
    .ssc-seismo-bars {
        display: flex;
        align-items: flex-end;
        gap: 3px;
        height: 24px;
    }
    .ssc-seismo-bar {
        width: 3px;
        background: #C41E3A;
        border-radius: 9999px;
        transform-origin: bottom center;
        animation: sscSeismoWave 1.4s ease-in-out infinite alternate;
    }
    @keyframes sscSeismoWave {
        0% { transform: scaleY(0.15); opacity: 0.4; }
        100% { transform: scaleY(1.3); opacity: 1; }
    }

    /* ── AMBIENT FLOATING EMBERS ── */
    .ssc-embers-container {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
        opacity: 0.4;
    }
    .ssc-ember {
        position: absolute;
        bottom: -15px;
        width: 3px;
        height: 3px;
        background: #C9A84C;
        border-radius: 50%;
        box-shadow: 0 0 6px #C9A84C, 0 0 10px #C41E3A;
        animation: sscFloatEmber 3.5s infinite linear;
    }
    @keyframes sscFloatEmber {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        15% { opacity: 0.9; }
        85% { opacity: 0.7; }
        100% { transform: translateY(-220px) translateX(var(--ember-drift, 20px)) scale(0); opacity: 0; }
    }
`;

export default function ScoreboardStoryClient({ dbValue, series }: ScoreboardStoryClientProps) {
    const router = useRouter();
    const [pageTransitioning, setPageTransitioning] = useState<boolean>(false);

    // Haptic feedback navigation loops
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
            <style dangerouslySetInnerHTML={{ __html: SSC_STYLES }} />

            {/* Ambient Ember particles on detail page */}
            <div className="ssc-embers-container">
                {[...Array(6)].map((_, i) => {
                    const randomDrift = -40 + Math.random() * 80;
                    const randomLeft = 5 + Math.random() * 90;
                    const randomDelay = Math.random() * 3;
                    return (
                        <div
                            key={i}
                            className="ssc-ember"
                            style={{
                                left: `${randomLeft}%`,
                                animationDelay: `${randomDelay}s`,
                                "--ember-drift": `${randomDrift}px`,
                            } as React.CSSProperties}
                        />
                    );
                })}
            </div>

            {/* Telemetry connector bridge */}
            <div className="hidden" id="ssc-telemetry-bridge" data-db={dbValue} data-series={series} />
        </div>
    );
}
