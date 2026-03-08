"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedStatCardProps {
    label: string;
    value: string;
}

export default function AnimatedStatCard({ label, value }: AnimatedStatCardProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const valueStr = String(value);
    const isDecimal = valueStr.includes('.');
    const isRatio = valueStr.includes('/');

    // Parse the target numeric value if possible
    const targetValue = isRatio ? parseInt(valueStr.split('/')[0]) : parseFloat(valueStr);
    const hasNumericSuffix = !isRatio && isNaN(parseFloat(valueStr)) === false && valueStr.replace(/[0-9.]/g, '').length > 0;
    const suffix = valueStr.replace(/[0-9.]/g, '');

    useEffect(() => {
        const currentRef = elementRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    if (currentRef) observer.unobserve(currentRef);
                }
            },
            { threshold: 0.1 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    useEffect(() => {
        if (!isVisible || isNaN(targetValue) || isRatio) return;

        let startTime: number;
        const duration = 1800; // 1800ms

        // Custom cubic bezier easing function (0.76, 0, 0.24, 1)
        const easeCubicBezier = (t: number) => {
            const y1 = 0; const y2 = 1;
            // A precise approximation for our counts, primarily ease-in-out
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            const easedProgress = easeCubicBezier(percentage);
            const currentCount = easedProgress * targetValue;

            setCount(isDecimal ? parseFloat(currentCount.toFixed(2)) : Math.floor(currentCount));

            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                setCount(targetValue);
            }
        };

        window.requestAnimationFrame(step);
    }, [isVisible, targetValue, isDecimal, isRatio]);

    const displayValue = isRatio || isNaN(targetValue)
        ? value
        : (isDecimal ? count.toFixed(2) : count.toString()) + (hasNumericSuffix ? suffix : '');

    return (
        <div
            ref={elementRef}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center transform hover:-translate-y-2 hover:border-[rgba(196,30,58,0.25)] hover:shadow-[0_0_24px_rgba(196,30,58,0.12)] transition-all duration-300 relative z-10 group"
        >
            <span className="font-stats tracking-[0.15em] text-[#C9A84C] uppercase text-[12px] mb-4">
                {label.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="font-display font-black text-5xl md:text-6xl text-stadium-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] tracking-[-0.02em] group-hover:text-[#C41E3A] transition-colors duration-300">
                {displayValue}
            </span>
        </div>
    );
}
