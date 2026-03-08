"use client";

import { motion } from "motion/react";
import React from "react";

export interface ShinyTextProps {
    children: React.ReactNode;
    speed?: number;
    color?: string;
    shineColor?: string;
    className?: string;
    style?: React.CSSProperties;
}

export function ShinyText({
    children,
    speed = 3,
    color = "#ffffff",
    shineColor = "#3b82f6",
    className = "",
    style = {},
}: ShinyTextProps) {
    return (
        <motion.span
            className={`inline-block whitespace-pre-wrap ${className}`}
            style={{
                ...style,
                backgroundImage: `linear-gradient(120deg, ${color} 30%, ${shineColor} 50%, ${color} 70%)`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
            }}
            animate={{
                backgroundPosition: ["200% center", "-200% center"],
            }}
            transition={{
                repeat: Infinity,
                duration: speed,
                ease: "linear",
            }}
        >
            {children}
        </motion.span>
    );
}
