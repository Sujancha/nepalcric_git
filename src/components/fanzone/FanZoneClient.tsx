"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface Fan {
    name: string;
    city: string;
    memory: string;
    chant: string;
    fullStory?: string;
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
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s;
        opacity: 1;
        visibility: visible;
    }
    .fz-tunnel.fz-tunnel-fadeout {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
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
    .fz-tunnel-skip {
        position: absolute;
        bottom: 40px;
        right: 40px;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.4);
        font-family: var(--font-barlow), sans-serif;
        font-weight: 700;
        font-size: 11px;
        letter-spacing: 0.15em;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 52;
    }
    .fz-tunnel-skip:hover {
        border-color: #C9A84C;
        color: #ffffff;
        box-shadow: 0 0 15px rgba(201, 168, 76, 0.2);
        background: rgba(201, 168, 76, 0.05);
    }
    .fz-hero-text {
        animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3s both;
    }
    .fz-chants { animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3.2s both; }
    .fz-pulse  { animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3.4s both; }
    .fz-wall   { animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3.6s both; }
    .fz-climax { animation: fzUp 1s cubic-bezier(0.16,1,0.3,1) 3.8s both; }
    .fz-rumbling { animation: fzRumble 0.08s linear infinite; }

    /* ── STADIUM SOUL BUTTONS ── */
    .fz-emotion-btn {
        display: flex;
        flex-direction: column;
        padding: 24px 28px;
        border: 1px solid rgba(255,255,255,0.04);
        background: rgba(10,12,20,0.5);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        text-align: left;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(20px);
    }
    .fz-emotion-btn::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background: transparent;
        transition: background 0.4s, box-shadow 0.4s;
    }
    .fz-emotion-btn:hover {
        background: rgba(255,255,255,0.02);
        transform: translateX(4px);
    }
    .fz-emotion-btn.active-suspense {
        border-color: rgba(201,168,76,0.25);
        background: rgba(201,168,76,0.07);
        box-shadow: 0 10px 40px rgba(201,168,76,0.12);
    }
    .fz-emotion-btn.active-suspense::after {
        background: #C9A84C;
        box-shadow: 0 0 15px #C9A84C;
    }
    .fz-emotion-btn.active-eruption {
        border-color: rgba(196,30,58,0.25);
        background: rgba(196,30,58,0.07);
        box-shadow: 0 10px 40px rgba(196,30,58,0.12);
    }
    .fz-emotion-btn.active-eruption::after {
        background: #C41E3A;
        box-shadow: 0 0 15px #C41E3A;
    }
    .fz-emotion-btn.active-pride {
        border-color: rgba(59,130,246,0.25);
        background: rgba(59,130,246,0.07);
        box-shadow: 0 10px 40px rgba(59,130,246,0.12);
    }
    .fz-emotion-btn.active-pride::after {
        background: #3B82F6;
        box-shadow: 0 0 15px #3B82F6;
    }
    .fz-emotion-title {
        font-family: Mukta, sans-serif;
        font-weight: 900;
        font-size: clamp(24px, 3vw, 30px);
        line-height: 1.1;
        color: rgba(255,255,255,0.25);
        transition: color 0.4s, transform 0.4s;
    }
    .fz-emotion-btn:hover .fz-emotion-title {
        color: rgba(255,255,255,0.65);
    }
    .fz-emotion-btn.active-suspense .fz-emotion-title { color: #C9A84C; }
    .fz-emotion-btn.active-eruption .fz-emotion-title { color: #C41E3A; }
    .fz-emotion-btn.active-pride .fz-emotion-title { color: #3B82F6; }

    .fz-emotion-panel {
        background: #090A10;
        border: 1px solid rgba(255,255,255,0.04);
        border-radius: 6px;
        padding: clamp(28px, 6vw, 56px);
        min-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }

    /* Waveform classes for emotion panel */
    .fz-eq-bars-compact {
        display: flex;
        align-items: flex-end;
        gap: 3.5px;
        height: 60px;
        width: 100%;
        margin-top: 40px;
    }
    .fz-eq-bar-c {
        flex-grow: 1;
        border-radius: 9999px;
        transform-origin: bottom center;
        transition: height 0.6s cubic-bezier(0.16,1,0.3,1), background 0.6s ease, box-shadow 0.6s ease;
    }
    .fz-eq-bar-c.suspense {
        background: #C9A84C;
        box-shadow: 0 0 6px rgba(201,168,76,0.5);
        animation: fzEqSuspense 2.4s ease-in-out infinite alternate;
    }
    .fz-eq-bar-c.eruption {
        background: #C41E3A;
        box-shadow: 0 0 14px rgba(196,30,58,0.85);
        animation: fzEqEruption 0.45s ease-in-out infinite alternate;
    }
    .fz-eq-bar-c.pride {
        background: #3B82F6;
        box-shadow: 0 0 8px rgba(59,130,246,0.6);
        animation: fzEqPride 1.6s ease-in-out infinite alternate;
    }

    @keyframes fzEqSuspense {
        0% { transform: scaleY(0.05); }
        75% { transform: scaleY(0.08); }
        88% { transform: scaleY(0.7); }
        100% { transform: scaleY(0.05); }
    }
    @keyframes fzEqEruption {
        0% { transform: scaleY(0.1); }
        100% { transform: scaleY(1.35); }
    }
    @keyframes fzEqPride {
        0% { transform: scaleY(0.15); }
        100% { transform: scaleY(0.75); }
    }

    /* ── NETFLIX SHOWCASE CHAPTER CARDS ── */
    .fz-fan-card {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        cursor: pointer;
        background: #090A10;
        border: 1px solid rgba(255,255,255,0.04);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        will-change: transform, clip-path, box-shadow;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .fz-fan-card:hover {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
        border-color: rgba(201,168,76,0.35);
        box-shadow: 0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(201,168,76,0.08);
        transform: translateY(-10px) scale(1.025) rotate(0.4deg);
        z-index: 10;
    }
    .fz-fan-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.36;
        filter: grayscale(1) contrast(1.3) brightness(0.6);
        transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 0;
    }
    .fz-fan-card:hover .fz-fan-img {
        opacity: 0.88;
        filter: grayscale(0) contrast(1.1) brightness(1.1);
        transform: scale(1.08);
    }
    .fz-fan-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(5,6,10,0.98) 25%, rgba(5,6,10,0.7) 60%, transparent 100%);
        transition: background 0.6s ease;
        z-index: 2;
    }
    .fz-fan-card:hover .fz-fan-overlay {
        background: linear-gradient(to top, rgba(5,6,10,0.99) 35%, rgba(5,6,10,0.85) 65%, transparent 100%);
    }
    .fz-fan-content {
        position: absolute;
        inset: 0;
        padding: 32px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        z-index: 3;
    }
    .fz-fan-memory {
        font-family: Mukta, sans-serif;
        font-size: 15px;
        line-height: 1.7;
        color: rgba(255,255,255,0.7);
        margin-bottom: 24px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s;
    }
    .fz-fan-card:hover .fz-fan-memory {
        opacity: 1;
        transform: translateY(0);
    }
    .fz-fan-meta {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-top: 1px solid rgba(255,255,255,0.06);
        padding-top: 18px;
        transform: translateY(10px);
        transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s;
    }
    .fz-fan-card:hover .fz-fan-meta {
        transform: translateY(0);
        border-top-color: rgba(201,168,76,0.3);
    }
    .fz-fan-name {
        font-family: Mukta, sans-serif;
        font-weight: 800;
        font-size: 18px;
        color: rgba(255,255,255,0.85);
        letter-spacing: -0.01em;
        transition: color 0.4s;
    }
    .fz-fan-card:hover .fz-fan-name {
        color: white;
    }
    .fz-fan-city {
        font-family: Mukta, sans-serif;
        font-size: 11px;
        font-weight: 700;
        color: #C9A84C;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-top: 4px;
    }
    
    /* 🔊 Play/Plus Icon at top-right of chapter card */
    .fz-fan-badge-play {
        position: absolute;
        top: 24px;
        right: 24px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.15);
        background: rgba(10,12,20,0.6);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.35;
        transform: scale(0.9);
        transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
        z-index: 3;
    }
    .fz-fan-card:hover .fz-fan-badge-play {
        opacity: 1;
        transform: scale(1);
        border-color: #C9A84C;
        background: rgba(201,168,76,0.15);
        box-shadow: 0 0 15px rgba(201,168,76,0.3);
    }

    /* ── DUAL GLOWING SEISMIC PULSE BAR ── */
    .fz-pulse-bar {
        position: relative;
        height: 52px;
        width: 100%;
        background: #08090E;
        border: 1px solid rgba(255,255,255,0.03);
        border-radius: 9999px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: inset 0 4px 20px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.01);
        transition: border-color 0.4s;
        touch-action: none;
    }
    .fz-pulse-bar:hover {
        border-color: rgba(255,255,255,0.08);
    }
    .fz-pulse-bar.fz-pulse-locked {
        cursor: default;
        pointer-events: none;
        border-color: rgba(201, 168, 76, 0.15);
    }
    .fz-pulse-spinner {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: linear-gradient(to right, rgba(30,58,138,0.85), rgba(59,130,246,0.8));
        box-shadow: 0 0 25px rgba(59,130,246,0.4);
        transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .fz-pulse-pacers {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background: linear-gradient(to left, rgba(136,19,47,0.85), rgba(196,30,58,0.8));
        box-shadow: 0 0 25px rgba(196,30,58,0.4);
        transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .fz-pulse-handle {
        position: absolute;
        top: 0;
        height: 100%;
        width: 6px;
        background: #ffffff;
        box-shadow: 0 0 25px #ffffff, 0 0 50px rgba(255,255,255,0.6);
        transform: translateX(-50%);
        transition: left 0.8s cubic-bezier(0.16,1,0.3,1);
        border-radius: 9999px;
        z-index: 3;
        animation: fzNeonHum 1.5s ease-in-out infinite alternate;
    }
    @keyframes fzNeonHum {
        0% { opacity: 0.8; box-shadow: 0 0 15px #fff; }
        100% { opacity: 1; box-shadow: 0 0 30px #fff, 0 0 45px rgba(255,255,255,0.8); }
    }

    .fz-waving-flag {
        width: 32px;
        height: 38px;
        opacity: 0.25;
        transform-origin: left center;
        transition: opacity 0.8s ease;
    }
    .fz-waving-flag.suspense {
        animation: fzFlagWaveSlow 4s ease-in-out infinite;
        opacity: 0.25;
    }
    .fz-waving-flag.eruption {
        animation: fzFlagWaveFast 1s ease-in-out infinite;
        opacity: 0.6;
    }
    .fz-waving-flag.pride {
        animation: fzFlagWaveNormal 2.4s ease-in-out infinite;
        opacity: 0.4;
    }

    @keyframes fzFlagWaveSlow {
        0%   { transform: rotate(0deg) skewY(1deg) scale(1); }
        50%  { transform: rotate(1.5deg) skewY(-1deg) scale(1.02); }
        100% { transform: rotate(0deg) skewY(1deg) scale(1); }
    }
    @keyframes fzFlagWaveFast {
        0%   { transform: rotate(0deg) skewY(4deg) scale(0.96); }
        50%  { transform: rotate(-3deg) skewY(-4deg) scale(1.06); }
        100% { transform: rotate(0deg) skewY(4deg) scale(0.96); }
    }
    @keyframes fzFlagWaveNormal {
        0%   { transform: rotate(0deg) skewY(2.5deg) scale(1); }
        50%  { transform: rotate(-1.5deg) skewY(-2.5deg) scale(1.04); }
        100% { transform: rotate(0deg) skewY(2.5deg) scale(1); }
    }

    /* ── CINEMATIC STORY MODAL STYLES ── */
    .fz-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 100;
        background: rgba(2, 2, 5, 0.88);
        backdrop-filter: blur(20px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: fzModalFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .fz-modal-container {
        position: relative;
        background: #08090f;
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        width: 100%;
        max-width: 1080px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 60px rgba(201, 168, 76, 0.04);
        animation: fzModalZoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        z-index: 101;
    }
    .fz-modal-container::-webkit-scrollbar {
        width: 6px;
    }
    .fz-modal-container::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.01);
    }
    .fz-modal-container::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
    .fz-modal-container::-webkit-scrollbar-thumb:hover {
        background: #C9A84C;
    }
    .fz-modal-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 10% 10%, rgba(201, 168, 76, 0.05), transparent 45%), radial-gradient(circle at 90% 90%, rgba(196, 30, 58, 0.05), transparent 45%);
        pointer-events: none;
        z-index: 1;
    }
    .fz-modal-close {
        position: absolute;
        top: 24px;
        right: 24px;
        background: rgba(10, 12, 20, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.6);
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 20;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(8px);
    }
    .fz-modal-close:hover {
        background: rgba(196, 30, 58, 0.2);
        border-color: #C41E3A;
        color: white;
        transform: scale(1.08) rotate(90deg);
        box-shadow: 0 0 20px rgba(196, 30, 58, 0.5);
    }
    .fz-modal-grid {
        display: grid;
        grid-template-columns: 44% 56%;
        min-height: 580px;
        position: relative;
        z-index: 2;
    }
    @media (max-width: 860px) {
        .fz-modal-grid {
            grid-template-columns: 1fr;
        }
        .fz-modal-left {
            height: 320px;
        }
    }
    .fz-modal-left {
        position: relative;
        overflow: hidden;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
        background: #020205;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .fz-modal-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.45;
        filter: grayscale(0.1) contrast(1.15) brightness(0.75);
        transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .fz-modal-container:hover .fz-modal-image {
        transform: scale(1.04);
    }
    .fz-modal-image-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(8, 9, 15, 1) 0%, rgba(8, 9, 15, 0.65) 50%, transparent 100%);
        z-index: 2;
    }
    .fz-modal-image-text {
        position: relative;
        z-index: 3;
        padding: 40px;
    }
    .fz-modal-tag {
        font-family: Mukta, sans-serif;
        font-size: 11px;
        font-weight: 700;
        color: #C9A84C;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        display: inline-block;
        margin-bottom: 14px;
        background: rgba(201, 168, 76, 0.1);
        padding: 4px 12px;
        border-radius: 2px;
        border: 1px solid rgba(201, 168, 76, 0.15);
    }
    .fz-modal-left-title {
        font-family: Mukta, sans-serif;
        font-weight: 900;
        font-size: clamp(24px, 3.5vw, 36px);
        color: white;
        line-height: 1.15;
        margin: 0;
    }
    .fz-modal-left-city {
        font-family: Mukta, sans-serif;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.45);
        margin-top: 8px;
        margin-bottom: 0;
        letter-spacing: 0.02em;
    }
    .fz-modal-right {
        padding: 48px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #08090f;
    }
    @media (max-width: 640px) {
        .fz-modal-right {
            padding: 36px 24px;
        }
    }
    .fz-modal-category {
        font-family: var(--font-barlow), sans-serif;
        font-size: 10px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.35);
        letter-spacing: 0.2em;
        text-transform: uppercase;
    }
    .fz-modal-title {
        font-family: Mukta, sans-serif;
        font-weight: 900;
        font-size: clamp(28px, 4vw, 40px);
        color: white;
        margin-top: 10px;
        margin-bottom: 22px;
        line-height: 1.2;
    }
    .fz-modal-divider {
        width: 70px;
        height: 2px;
        background: linear-gradient(to right, #C9A84C, transparent);
        margin-bottom: 28px;
    }
    .fz-modal-quote {
        font-family: Mukta, sans-serif;
        font-size: clamp(15px, 2vw, 17px);
        line-height: 1.75;
        font-style: italic;
        color: rgba(255, 255, 255, 0.85);
        border-left: 3px solid #C9A84C;
        padding-left: 20px;
        margin: 0 0 32px 0;
        background: rgba(255, 255, 255, 0.015);
        padding-top: 14px;
        padding-bottom: 14px;
        padding-right: 14px;
        border-radius: 0 4px 4px 0;
    }
    .fz-modal-story-text {
        font-family: Mukta, sans-serif;
        font-size: clamp(14px, 1.8vw, 16.5px);
        line-height: 1.9;
        color: rgba(255, 255, 255, 0.68);
        font-weight: 400;
        max-height: 380px;
        overflow-y: auto;
        padding-right: 8px;
    }
    .fz-modal-story-text::-webkit-scrollbar {
        width: 4px;
    }
    .fz-modal-story-text::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.01);
    }
    .fz-modal-story-text::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
    }
    .fz-modal-story-text::-webkit-scrollbar-thumb:hover {
        background: #C9A84C;
    }
    @keyframes fzModalFadeIn {
        from { opacity: 0; backdrop-filter: blur(0px); background: rgba(2, 2, 5, 0); }
        to { opacity: 1; backdrop-filter: blur(20px); background: rgba(2, 2, 5, 0.88); }
    }
    @keyframes fzModalZoomIn {
        from { opacity: 0; transform: scale(0.95) translateY(10px); filter: blur(4px); }
        to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
    }

    /* ── CLIMAX HOLD BUTTON & COMMENTARY STYLES ── */
    .fz-hold-btn {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: rgba(10, 12, 20, 0.6);
        border: 2px solid rgba(196, 30, 58, 0.25);
        box-shadow: 0 0 20px rgba(196, 30, 58, 0.1), inset 0 0 20px rgba(196, 30, 58, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(8px);
    }
    .fz-hold-btn::before {
        content: '';
        position: absolute;
        inset: 6px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(196, 30, 58, 0.25) 0%, transparent 75%);
        transition: opacity 0.4s;
        opacity: 0.5;
    }
    .fz-hold-btn:hover {
        border-color: rgba(196, 30, 58, 0.6);
        box-shadow: 0 0 35px rgba(196, 30, 58, 0.3), inset 0 0 30px rgba(196, 30, 58, 0.15);
        transform: scale(1.05);
    }
    .fz-hold-btn.fz-holding {
        border-color: #C41E3A;
        box-shadow: 0 0 60px rgba(196, 30, 58, 0.9), inset 0 0 45px rgba(196, 30, 58, 0.6);
        transform: scale(0.92);
        background: rgba(196, 30, 58, 0.18);
    }
    .fz-hold-inner {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .fz-hold-label {
        font-family: Mukta, sans-serif;
        font-weight: 900;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.55);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        transition: color 0.4s, transform 0.4s;
    }
    .fz-hold-btn:hover .fz-hold-label {
        color: white;
    }
    .fz-hold-btn.fz-holding .fz-hold-label {
        color: #C41E3A;
        transform: scale(1.08);
        text-shadow: 0 0 10px rgba(196, 30, 58, 0.6);
    }
    .fz-commentary {
        position: absolute;
        top: 40px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-30px);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        z-index: 5;
    }
    .fz-commentary.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    .fz-commentary-text {
        font-family: Mukta, sans-serif;
        font-weight: 900;
        font-size: clamp(36px, 5.5vw, 68px);
        line-height: 1.25;
        text-align: center;
        color: #ffffff;
        text-shadow: 0 0 35px rgba(196, 30, 58, 0.85), 0 0 70px rgba(196, 30, 58, 0.4);
        margin: 0;
        letter-spacing: -0.01em;
    }
    @keyframes fzRotateDashed {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
    }
    .fz-ring-dashed-rotating {
        animation: fzRotateDashed 15s linear infinite;
    }
    @keyframes fzPulseRing {
        0% { transform: scale(1); opacity: 0.35; }
        50% { transform: scale(1.08); opacity: 0.75; }
        100% { transform: scale(1); opacity: 0.35; }
    }
    .fz-ring-pulse {
        animation: fzPulseRing 1.8s ease-in-out infinite;
    }
    @keyframes fzRadialRipple {
        0% { transform: scale(0.85); opacity: 0.4; }
        50% { transform: scale(1.15); opacity: 0.75; }
        100% { transform: scale(0.85); opacity: 0.4; }
    }
    .fz-hold-btn.fz-holding::before {
        animation: fzRadialRipple 1.6s ease-in-out infinite;
    }

    /* ── TECTONIC ASYMMETRIC SLANTED FRAMES ── */
    .fz-tectonic-card-0 { clip-path: polygon(0 1.5%, 100% 0, 98.5% 97%, 1% 100%); }
    .fz-tectonic-card-1 { clip-path: polygon(1% 0, 99% 2%, 100% 100%, 0 97%); }
    .fz-tectonic-card-2 { clip-path: polygon(0 0, 100% 1%, 98.5% 98.5%, 1.5% 97%); }
    .fz-tectonic-card-3 { clip-path: polygon(1.5% 1%, 100% 0, 99% 100%, 0 98%); }
    .fz-tectonic-card-4 { clip-path: polygon(0 2%, 98.5% 0, 100% 97%, 1% 99%); }
    .fz-tectonic-card-5 { clip-path: polygon(1% 0, 100% 1.5%, 98.5% 99%, 0 97.5%); }

    /* ── DUOTONE STADIUM OVERLAY ── */
    .fz-fan-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(30, 58, 138, 0.48) 0%, rgba(196, 30, 58, 0.48) 100%);
        mix-blend-mode: color;
        opacity: 0.9;
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1;
        pointer-events: none;
    }
    .fz-fan-card:hover::before {
        opacity: 0;
    }

    /* ── CINEMATIC DUST EMBERS ── */
    .fz-embers-container {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    .fz-fan-card:hover .fz-embers-container {
        opacity: 0.6;
    }
    .fz-ember {
        position: absolute;
        bottom: -10px;
        width: 4px;
        height: 4px;
        background: #C9A84C;
        border-radius: 50%;
        box-shadow: 0 0 8px #C9A84C, 0 0 15px #C41E3A;
        animation: fzFloatEmber 2.5s infinite linear;
    }
    @keyframes fzFloatEmber {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 0.8; }
        100% { transform: translateY(-130px) translateX(var(--ember-drift, 20px)) scale(0); opacity: 0; }
    }

    /* ── MINI SEISMOGRAPH & BROADCAST DB ── */
    .fz-card-seismo {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(2, 2, 5, 0.72);
        border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 4px 10px;
        border-radius: 4px;
        backdrop-filter: blur(4px);
        transform: translateY(0);
        opacity: 0.38;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 4;
        margin-top: 12px;
    }
    .fz-fan-card:hover .fz-card-seismo {
        opacity: 1;
        border-color: rgba(201, 168, 76, 0.3);
        box-shadow: 0 0 10px rgba(201, 168, 76, 0.15);
    }
    .fz-seismo-db {
        font-family: monospace;
        font-size: 10px;
        font-weight: 700;
        color: #C9A84C;
        letter-spacing: 0.05em;
    }
    .fz-seismo-bars {
        display: flex;
        align-items: flex-end;
        gap: 2.5px;
        height: 12px;
    }
    .fz-seismo-bar {
        width: 2px;
        height: 100%;
        background: #C41E3A;
        border-radius: 9999px;
        transform-origin: bottom center;
        animation: fzSeismoIdle 1.2s ease-in-out infinite alternate;
        animation-play-state: paused;
    }
    .fz-fan-card:hover .fz-seismo-bar {
        animation-play-state: running;
        animation-name: fzSeismoActive;
    }
    @keyframes fzSeismoIdle {
        0% { transform: scaleY(0.25); }
        100% { transform: scaleY(0.45); }
    }
    @keyframes fzSeismoActive {
        0% { transform: scaleY(0.15); }
        100% { transform: scaleY(1.35); }
    }

    /* ── CINEMATIC CATEGORY SELECTOR ── */
    .fz-category-tab {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.28);
        font-family: Mukta, sans-serif;
        font-weight: 900;
        font-size: clamp(20px, 3vw, 28px);
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        padding: 12px 24px;
        text-transform: uppercase;
    }
    .fz-category-tab:hover {
        color: rgba(255, 255, 255, 0.85);
    }
    .fz-category-tab.active {
        color: #ffffff;
        text-shadow: 0 0 25px rgba(255, 255, 255, 0.25);
    }
    .fz-category-sub {
        font-family: var(--font-barlow), sans-serif;
        font-weight: 700;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: rgba(255, 255, 255, 0.16);
        margin-top: 6px;
        transition: color 0.5s;
    }
    .fz-category-tab.active .fz-category-sub {
        color: #C9A84C;
    }
    .fz-category-dot {
        position: absolute;
        top: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .fz-category-tab.active .fz-category-dot {
        opacity: 1;
        transform: scale(1);
    }
    .fz-category-dot.crimson {
        background: #C41E3A;
        box-shadow: 0 0 10px #C41E3A, 0 0 20px #C41E3A;
    }
    .fz-category-dot.gold {
        background: #C9A84C;
        box-shadow: 0 0 10px #C9A84C, 0 0 20px #C9A84C;
    }

`;

const EMOTIONS = {
    suspense: {
        title: "धैर्य",
        subtitle: "दशकको सबैभन्दा लामो १ सेकेन्ड",
        story: "जब बलर कुद्न सुरु गर्छ, कीर्तिपुरको ३०,००० को भीडमा सन्नाटा छाउँछ। सबैको श्वास रोकिन्छ। सल्लाका रुखमा चढेका फ्यानदेखि प्यारापिटसम्म, केवल बलको चहलपहल मात्र देखिन्छ। यो सन्नाटा डर होइन, यो करोडौं मुटुको साझा धड्कन हो।",
        tag: "सस्पेंस // SILENCE",
        color: "#C9A84C",
        glow: "rgba(201,168,76,0.5)",
        bgImg: "https://picsum.photos/id/292/900/600", // Stark gritty cricket field look
    },
    eruption: {
        title: "गर्जाहट",
        subtitle: "जब सल्लाका रुखहरू हल्लिन्छन्",
        story: "विकेट झर्छ वा बल सीमा रेखा बाहिर उड्छ—कीर्तिपुर ज्वालामुखी जस्तै फुट्छ! रातो र निलो जर्सीको समुद्र जुरुक्क उठ्छ। सल्लाका रुखहरू फ्यानको भारले होइन, स्टेडियमको गर्जाहटले काँप्छन्। यो आवाज केवल ताली होइन, यो एक सिंगो राष्ट्रको गर्जन हो।",
        tag: "विजय // ERUPTION",
        color: "#C41E3A",
        glow: "rgba(196,30,58,0.6)",
        bgImg: "https://picsum.photos/id/1043/900/600", // Roaring outdoor crowd scale
    },
    pride: {
        title: "गौरव",
        subtitle: "आँसु र साझा छाती",
        story: "जीत वा हार, जब खेलाडीहरू मैदानबाट बाहिरिन्छन्, फ्यानहरू उठेर ताली बजाउँछन्। कसैको आँखामा आँसु हुन्छ, कसैको अनुहारमा गर्व। नेपालका लागि क्रिकेट खेल मात्र होइन, यो त हाम्रो देशको नाम विश्वको मानचित्रमा गर्वका साथ लेखाउने बलियो माध्यम हो।",
        tag: "गर्व र आँसु // PRIDE",
        color: "#3B82F6",
        glow: "rgba(59,130,246,0.6)",
        bgImg: "https://picsum.photos/id/374/900/600", // Grand team spirit / flag scale texture
    }
};

export default function FanZoneClient({ fans, chants, fanCraze }: { fans: Fan[]; chants: Chant[]; fanCraze: Fan[] }) {
    const [mounted, setMounted]     = useState(false);
    const [holding, setHolding]     = useState(false);
    const [pulseVal, setPulseVal]   = useState(50);
    const [emotionalState, setEmotionalState] = useState<'suspense' | 'eruption' | 'pride'>('suspense');
    const [selectedMilestone, setSelectedMilestone] = useState<Fan | null>(null);
    const [activeCategory, setActiveCategory] = useState<'matches' | 'devotion'>('matches');
    const [showIntro, setShowIntro] = useState(false);
    const [introFade, setIntroFade] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [hasVotedPulse, setHasVotedPulse] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load previously recorded voted pulse value
        const savedPulse = localStorage.getItem("nepalcric_pulse_val");
        if (savedPulse) {
            setPulseVal(parseFloat(savedPulse));
            setHasVotedPulse(true);
        }

        const hasVisited = localStorage.getItem("nepalcric_fanzone_visited");
        if (!hasVisited) {
            setShowIntro(true);
            const fadeTimer = setTimeout(() => {
                setIntroFade(true);
            }, 2600);
            const unmountTimer = setTimeout(() => {
                setShowIntro(false);
                localStorage.setItem("nepalcric_fanzone_visited", "true");
            }, 3400);
            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(unmountTimer);
            };
        }
    }, []);

    const handleSkipIntro = useCallback(() => {
        setIntroFade(true);
        localStorage.setItem("nepalcric_fanzone_visited", "true");
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(15);
        }
        setTimeout(() => {
            setShowIntro(false);
        }, 300);
    }, []);

    const startHold = useCallback(() => {
        setHolding(true);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([60, 40, 60]);
        }
    }, []);

    const stopHold = useCallback(() => { setHolding(false); }, []);

    const updatePulseFromCoords = useCallback((clientX: number, currentTarget: HTMLDivElement) => {
        if (hasVotedPulse) return;
        const rect = currentTarget.getBoundingClientRect();
        const rawPct = ((clientX - rect.left) / rect.width) * 100;
        const boundedPct = Math.max(0, Math.min(100, rawPct));
        const roundedPulse = Math.round(boundedPct);
        setPulseVal(roundedPulse);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(4);
        }
    }, [hasVotedPulse]);

    const handlePulseStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (hasVotedPulse) return;
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        updatePulseFromCoords(clientX, e.currentTarget);
    }, [hasVotedPulse, updatePulseFromCoords]);

    const handlePulseMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || hasVotedPulse) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        updatePulseFromCoords(clientX, e.currentTarget);
    }, [isDragging, hasVotedPulse, updatePulseFromCoords]);

    const handlePulseEnd = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            setHasVotedPulse(true);
            localStorage.setItem("nepalcric_pulse_val", pulseVal.toString());
            if (typeof navigator !== "undefined" && navigator.vibrate) {
                navigator.vibrate([15, 10, 15]);
            }
        }
    }, [isDragging, pulseVal]);

    if (!mounted) return null;

    const activeEmotion = EMOTIONS[emotionalState];

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: FZ_STYLES }} />

            <div className={`bg-[#07080F] min-h-screen pb-32 relative${holding ? " fz-rumbling" : ""}`} style={{ transition: "all 0.8s ease" }}>
                <div className="fz-grain-overlay" />

                {/* ── TUNNEL WALK ENTRY ── */}
                {showIntro && (
                    <div className={`fz-tunnel${introFade ? " fz-tunnel-fadeout" : ""}`}>
                        <p className="fz-tunnel-text">
                            हामी मैदान बाहिर हुन्छौं,<br />तर खेल हाम्रो मुटुमा हुन्छ।
                        </p>
                        <button
                            onClick={handleSkipIntro}
                            className="fz-tunnel-skip"
                            aria-label="इन्ट्रो छोड्नुहोस्"
                        >
                            स्किप गर्नुहोस् // SKIP INTRO
                        </button>
                    </div>
                )}

                {/* ── GLOBAL ATMOSPHERE (BREATHING SHIFTING GLOW) ── */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0" style={{
                        background: holding
                            ? `radial-gradient(circle at 50% 50%, rgba(196,30,58,0.22), transparent 60%)`
                            : emotionalState === 'suspense'
                            ? `radial-gradient(circle at 50% 50%, rgba(201,168,76,0.08), transparent 55%), radial-gradient(circle at 15% 90%, rgba(196,30,58,0.03), transparent 50%)`
                            : emotionalState === 'eruption'
                            ? `radial-gradient(circle at 50% 50%, rgba(196,30,58,0.12), transparent 55%), radial-gradient(circle at 85% 10%, rgba(0,56,147,0.04), transparent 50%)`
                            : `radial-gradient(circle at 50% 50%, rgba(59,130,246,0.11), transparent 55%), radial-gradient(circle at 15% 90%, rgba(196,30,58,0.04), transparent 50%)`,
                        transition: "background 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }} />
                </div>

                {/* ── HERO: THE RICHTER SCALE ── */}
                <section className="relative w-full flex flex-col justify-end overflow-hidden" style={{ height: "68vh" }}>
                    <HeroWaveform />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/75 to-transparent z-10" />

                    <div className="fz-hero-text relative z-20 px-6 lg:px-16 w-full max-w-7xl mx-auto pb-16">
                        <span style={{ fontFamily:"Mukta,sans-serif", fontSize:"14px", fontWeight:700, color:"#C41E3A", letterSpacing:"0.2em", textTransform:"uppercase", display:"block", marginBottom:"16px", textShadow:"0 0 12px rgba(196,30,58,0.6)" }}>
                            १२औं गैंडा — फ्यान जोन
                        </span>
                        <h1 style={{ fontFamily:"Mukta,sans-serif", fontWeight:900, fontSize:"clamp(60px,10vw,130px)", lineHeight:"0.95", letterSpacing:"-0.01em", color:"white", textShadow:"0 8px 40px rgba(0,0,0,0.6)", margin:0 }}>
                            गैँडाहरूको<br />गर्जाहट
                        </h1>
                    </div>
                </section>

                {/* ── SOUL OF KIRTIPUR: INTERACTIVE SPECTRA ── */}
                <section className="fz-chants relative z-20 px-6 lg:px-16 w-full max-w-7xl mx-auto mt-24">
                    <div style={{ display:"flex", alignItems:"center", marginBottom:"40px" }}>
                        <span className="fz-section-label">कीर्तिपुरको आत्मा // THE SOUL OF KIRTIPUR</span>
                        <hr className="fz-divider" />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                        
                        {/* Left Column: Emotion Selection Panels */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {(Object.keys(EMOTIONS) as Array<keyof typeof EMOTIONS>).map((key) => {
                                const item = EMOTIONS[key];
                                const isActive = emotionalState === key;
                                const activeClass = isActive ? ` active-${key}` : "";
                                return (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setEmotionalState(key);
                                            if (typeof navigator !== "undefined" && navigator.vibrate) {
                                                navigator.vibrate(25);
                                            }
                                        }}
                                        className={`fz-emotion-btn${activeClass}`}
                                    >
                                        <span style={{
                                            fontFamily: "var(--font-barlow), sans-serif",
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            letterSpacing: "0.15em",
                                            color: isActive ? item.color : "rgba(255,255,255,0.3)",
                                            textTransform: "uppercase",
                                            marginBottom: "4px"
                                        }}>
                                            {item.tag}
                                        </span>
                                        <span className="fz-emotion-title">
                                            {item.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Column: Dynamic Shifting Poetic Board */}
                        <div className="fz-emotion-panel" style={{ '--panel-glow': activeEmotion.glow } as React.CSSProperties}>
                            
                            {/* Cinematic Image Backdrop (cross-fades seamlessly) */}
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                zIndex: 1,
                                opacity: 0.12,
                                backgroundImage: `url(${activeEmotion.bgImg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "grayscale(1) contrast(1.25)",
                                transition: "background-image 0.8s ease, opacity 0.8s ease",
                                pointerEvents: "none"
                            }} />

                            {/* Dark Gradient Overlay to guarantee text legibility */}
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                zIndex: 1,
                                background: "linear-gradient(to top, #0A0C14 20%, rgba(10,12,20,0.88) 60%, rgba(10,12,20,0.4) 100%)",
                                pointerEvents: "none"
                            }} />

                            {/* Stylized Waving Nepal Flag Outline */}
                            <svg
                                className={`fz-waving-flag ${emotionalState}`}
                                viewBox="0 0 30 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ position: "absolute", top: "28px", right: "28px", zIndex: 3 }}
                            >
                                {/* Double Triangle Crimson Body */}
                                <path
                                    d="M2 2 L26 18 L11 18 L26 34 L2 34 Z"
                                    fill="rgba(196, 30, 58, 0.18)"
                                    stroke={activeEmotion.color}
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                    style={{ transition: "stroke 0.8s ease" }}
                                />
                                {/* Accent Stroke */}
                                <path
                                    d="M2 2 L26 18 L11 18 L26 34 L2 34 Z"
                                    stroke="rgba(255, 255, 255, 0.2)"
                                    strokeWidth="0.75"
                                    strokeLinejoin="round"
                                />
                                {/* Crescent Moon */}
                                <path
                                    d="M6 10 C6 10 9 10 9 8 C9 6 6 6 6 6 C6 6 7.5 7.5 6 10 Z"
                                    fill="white"
                                    opacity="0.85"
                                />
                                {/* Sun */}
                                <circle
                                    cx="7"
                                    cy="26"
                                    r="2.5"
                                    fill="white"
                                    opacity="0.85"
                                />
                            </svg>

                            <div style={{ position: "relative", zIndex: 2 }}>
                                <span style={{
                                    fontFamily: "Mukta, sans-serif",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: activeEmotion.color,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    transition: "color 0.5s ease"
                                }}>
                                    {activeEmotion.tag}
                                </span>
                                <h2 style={{
                                    fontFamily: "Mukta, sans-serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(24px, 4vw, 36px)",
                                    color: "white",
                                    marginTop: "12px",
                                    marginBottom: "16px",
                                    lineHeight: 1.2
                                }}>
                                    {activeEmotion.title} ({activeEmotion.subtitle})
                                </h2>
                                <p style={{
                                    fontFamily: "Mukta, sans-serif",
                                    fontSize: "clamp(15px, 1.8vw, 17px)",
                                    lineHeight: "1.8",
                                    color: "rgba(255,255,255,0.72)",
                                    margin: 0,
                                    fontWeight: 400
                                }}>
                                    {activeEmotion.story}
                                </p>
                            </div>

                            {/* 📈 Dynamic Atmospheric Equalizer Waves */}
                            <div className="fz-eq-bars-compact" style={{ position: "relative", zIndex: 2 }}>
                                {[...Array(34)].map((_, i) => {
                                    const h = 20 + Math.sin(i * 0.3) * 30 + Math.random() * 20;
                                    return (
                                        <div
                                            key={i}
                                            className={`fz-eq-bar-c ${emotionalState}`}
                                            style={{
                                                height: `${Math.max(10, Math.min(100, h))}%`,
                                                animationDelay: `${-i * 0.05}s`
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </section>

                {/* ── FAN PULSE: TUG OF WAR ── */}
                <section className="fz-pulse relative z-20 px-6 lg:px-16 w-full max-w-7xl mx-auto mt-36">
                    <div style={{ background:"#090A10", border:"1px solid rgba(255,255,255,0.04)", borderRadius:"8px", padding:"clamp(28px,5vw,56px)", position:"relative", overflow:"hidden", boxShadow:"0 20px 40px rgba(0,0,0,0.5)" }}>
                        <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"linear-gradient(to right,rgba(59,130,246,0.4),transparent,rgba(196,30,58,0.4))" }} />

                        <div style={{ textAlign:"center", marginBottom:"36px" }}>
                            <span style={{ fontFamily:"Mukta,sans-serif", fontSize:"12px", color:"#C9A84C", letterSpacing:"0.2em", textTransform:"uppercase", display:"block", marginBottom:"10px" }}>
                                फ्यान पल्स — प्रत्यक्ष जनमत
                            </span>
                            <h3 style={{ fontFamily:"Mukta,sans-serif", fontWeight:800, fontSize:"clamp(20px,4vw,38px)", color:"white", margin:0 }}>
                                नेपालको असली शक्ति के हो?
                            </h3>
                            <p style={{ fontFamily:"Mukta,sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.35)", marginTop:"6px" }}>
                                ब्याटिङको शक्ति कि बलिङको धार?
                            </p>
                        </div>

                        {/* Audited Scoreboard Digital Metrics */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", padding: "0 8px" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "11px", fontWeight: 700, color: "rgba(59,130,246,0.85)", letterSpacing: "0.15em", textTransform: "uppercase" }}>🔴 बलिङको धार</span>
                                <span style={{ fontFamily: "monospace", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "white", textShadow: "0 0 20px rgba(59,130,246,0.5)", lineHeight: 1, marginTop: "4px" }}>
                                    {Math.round(pulseVal)}%
                                </span>
                            </div>

                            <span style={{
                                fontFamily: "Mukta, sans-serif",
                                fontSize: "12px",
                                color: hasVotedPulse ? "#C9A84C" : "rgba(255,255,255,0.22)",
                                letterSpacing: "0.05em",
                                paddingBottom: "8px",
                                fontStyle: "italic",
                                textShadow: hasVotedPulse ? "0 0 10px rgba(201,168,76,0.35)" : "none",
                                transition: "all 0.5s ease"
                            }}>
                                {hasVotedPulse ? "✓ मत दर्ता भयो // VOTE RECORDED" : "तान्नुहोस् वा ट्याप गर्नुहोस् // DRAG OR TAP"}
                            </span>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "11px", fontWeight: 700, color: "rgba(196,30,58,0.85)", letterSpacing: "0.15em", textTransform: "uppercase" }}>ब्याटिङको शक्ति 🏏</span>
                                <span style={{ fontFamily: "monospace", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "white", textShadow: "0 0 20px rgba(196,30,58,0.5)", lineHeight: 1, marginTop: "4px" }}>
                                    {Math.round(100-pulseVal)}%
                                </span>
                            </div>
                        </div>

                        {/* Interactive Cylinder glowing track with Drag Support and Mobile Scrolling prevention */}
                        <div
                            className={`fz-pulse-bar${hasVotedPulse ? " fz-pulse-locked" : ""}`}
                            onMouseDown={handlePulseStart}
                            onMouseMove={handlePulseMove}
                            onMouseUp={handlePulseEnd}
                            onMouseLeave={handlePulseEnd}
                            onTouchStart={handlePulseStart}
                            onTouchMove={handlePulseMove}
                            onTouchEnd={handlePulseEnd}
                            style={{ touchAction: hasVotedPulse ? "auto" : "none" }}
                        >
                            <div className="fz-pulse-spinner" style={{ width:`${pulseVal}%` }} />
                            <div className="fz-pulse-pacers" style={{ width:`${100-pulseVal}%` }} />
                            {!hasVotedPulse && (
                                <div className="fz-pulse-handle" style={{ left:`${pulseVal}%` }} />
                            )}
                        </div>
                    </div>
                </section>



                {/* ── FAN WALL: DEVOTION GALLERY ── */}
                <section className="fz-wall relative z-20 px-6 lg:px-16 w-full max-w-7xl mx-auto mt-36">
                    <div style={{ display:"flex", alignItems:"center", marginBottom:"36px" }}>
                        <span className="fz-section-label">ऐतिहासिक क्षणहरू // गौरवशाली यात्रा</span>
                        <hr className="fz-divider" />
                    </div>

                    {/* Cinematic Category Selector */}
                    <div className="flex items-center justify-center gap-6 mb-20 relative z-30">
                        <button
                            onClick={() => {
                                setActiveCategory('matches');
                                if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(20);
                            }}
                            className={`fz-category-tab ${activeCategory === 'matches' ? 'active' : ''}`}
                        >
                            <span className="fz-category-dot crimson" />
                            मैदानको लडाईं
                            <span className="fz-category-sub">MOMENTS ON THE PITCH</span>
                        </button>
                        <div className="w-[1px] h-[30px] bg-white/10 hidden md:block" />
                        <button
                            onClick={() => {
                                setActiveCategory('devotion');
                                if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(20);
                            }}
                            className={`fz-category-tab ${activeCategory === 'devotion' ? 'active' : ''}`}
                        >
                            <span className="fz-category-dot gold" />
                            प्रशंसकको पागलपन
                            <span className="fz-category-sub">CRAZE OF THE 12TH RHINO</span>
                        </button>
                    </div>

                    {/* Tectonic Asymmetric Slanted Bento Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "24px",
                            gridAutoFlow: "dense"
                        }}
                        className="md:grid-cols-3"
                    >
                        {(activeCategory === 'matches' ? fans : fanCraze).map((fan, idx) => {
                            // Stable, cinematic picsum IDs that won't be stock-sports-generic
                            const IMG_IDS = [160,214,247,338,374,430,493,508,513,524,542,578,581,633,639,656,683,690,735,740];
                            const imgId = IMG_IDS[idx % IMG_IDS.length];
                            
                            // Responsive card grid layouts to form a breathtaking tectonic bento collage on desktop, and a clean scrollable list on mobile
                            const getCardGridSpan = (activeCat: 'matches' | 'devotion', cIdx: number) => {
                                if (activeCat === 'matches') {
                                    if (cIdx === 0) return "col-span-1 md:col-span-2 row-span-1 h-[340px] md:h-[340px]";
                                    if (cIdx === 1) return "col-span-1 md:row-span-2 h-[340px] md:h-[704px]";
                                    if (cIdx === 2) return "col-span-1 h-[340px] md:h-[340px]";
                                    if (cIdx === 3) return "col-span-1 md:col-span-2 row-span-1 h-[340px] md:h-[340px]";
                                    return "col-span-1 h-[340px] md:h-[340px]";
                                } else {
                                    if (cIdx === 0) return "col-span-1 md:row-span-2 h-[340px] md:h-[704px]";
                                    if (cIdx === 1) return "col-span-1 md:col-span-2 row-span-1 h-[340px] md:h-[340px]";
                                    if (cIdx === 2) return "col-span-1 h-[340px] md:h-[340px]";
                                    if (cIdx === 3) return "col-span-1 h-[340px] md:h-[340px]";
                                    return "col-span-1 md:col-span-2 row-span-1 h-[340px] md:h-[340px]";
                                }
                            };

                            return (
                                <div
                                    key={idx}
                                    className={`fz-fan-card fz-tectonic-card-${idx % 6} ${getCardGridSpan(activeCategory, idx)}`}
                                    onClick={() => {
                                        if (typeof navigator !== "undefined" && navigator.vibrate) {
                                            navigator.vibrate([15, 10, 15]); // A premium ultra-light tactile tick
                                        }
                                        setSelectedMilestone(fan);
                                    }}
                                >
                                    {/* Netflix Play/Plus badge */}
                                    <div className="fz-fan-badge-play">
                                        <svg viewBox="0 0 24 24" fill="none" style={{ width: "11px", height: "11px", color: "#C9A84C" }} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                        </svg>
                                    </div>

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className="fz-fan-img"
                                        src={`https://picsum.photos/id/${imgId}/900/600`}
                                        alt="Fan backdrop"
                                        draggable={false}
                                    />
                                    <div className="fz-fan-overlay" />

                                    {/* Dynamic Cinematic Floating Embers */}
                                    <div className="fz-embers-container">
                                        {[...Array(6)].map((_, ei) => {
                                            const randomDrift = -35 + Math.random() * 70;
                                            const randomLeft = 10 + Math.random() * 80;
                                            const randomDelay = Math.random() * 2;
                                            return (
                                                <div
                                                    key={ei}
                                                    className="fz-ember"
                                                    style={{
                                                        left: `${randomLeft}%`,
                                                        animationDelay: `${randomDelay}s`,
                                                        '--ember-drift': `${randomDrift}px`
                                                    } as React.CSSProperties}
                                                />
                                            );
                                        })}
                                    </div>

                                    <div className="fz-fan-content">
                                        <p className="fz-fan-memory">"{fan.memory}"</p>
                                        <div className="fz-fan-meta">
                                            <div>
                                                <div className="fz-fan-name">{fan.name}</div>
                                                <div className="fz-fan-city">{fan.city}</div>
                                            </div>
                                            
                                            {/* Dynamic mini-seismograph db indicator */}
                                            <div className="fz-card-seismo">
                                                <span className="fz-seismo-db">{fan.chant}</span>
                                                <div className="fz-seismo-bars">
                                                    {[...Array(5)].map((_, bi) => (
                                                        <div key={bi} className="fz-seismo-bar" style={{ animationDelay: `${-bi * 0.15}s` }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── CLIMAX: HOLD TO FEEL ── */}
                <section className="fz-climax relative z-20 w-full flex flex-col items-center justify-start mt-48 mb-16 min-h-[580px] md:min-h-[640px]">

                    {/* Commentary Reveal */}
                    <div className={`fz-commentary${holding ? " visible" : ""}`}>
                        <p className="fz-commentary-text">
                            र नेपाल<br />विश्वकपका लागि<br />छनोट भयो!
                        </p>
                    </div>

                    {/* Button & Ring Wrapper to completely isolate from top commentary */}
                    <div className="relative flex items-center justify-center w-[400px] h-[400px] mt-[160px] md:mt-[200px] z-10">
                        {/* Double Pulsing Ring Decorations */}
                        <div
                            className={holding ? "fz-ring-pulse" : ""}
                            style={{
                                position:"absolute",
                                width: holding ? "320px" : "200px",
                                height: holding ? "320px" : "200px",
                                borderRadius:"50%",
                                border:`2px solid rgba(196,30,58,${holding ? "0.6" : "0.12"})`,
                                boxShadow: holding ? "0 0 35px rgba(196,30,58,0.4)" : "none",
                                transition:"width 0.8s cubic-bezier(0.16,1,0.3,1), height 0.8s cubic-bezier(0.16,1,0.3,1), border-color 0.8s",
                                pointerEvents:"none",
                                zIndex: 1
                            }}
                        />
                        <div
                            className={holding ? "fz-ring-dashed-rotating" : ""}
                            style={{
                                position:"absolute",
                                width: holding ? "400px" : "250px",
                                height: holding ? "400px" : "250px",
                                borderRadius:"50%",
                                border:`1px dashed rgba(196,30,58,${holding ? "0.35" : "0.06"})`,
                                transition:"width 1.2s cubic-bezier(0.16,1,0.3,1), height 1.2s cubic-bezier(0.16,1,0.3,1), border-color 1.2s",
                                pointerEvents:"none",
                                zIndex: 1,
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
                            aria-label="गर्जाहट महसुस गर्न थिचिराख्नुस्"
                        >
                            <div className="fz-hold-inner">
                                <span className="fz-hold-label">थिच्नुहोस्</span>
                            </div>
                        </button>
                    </div>

                    <p style={{ fontFamily:"Mukta,sans-serif", fontSize:"13px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:"36px", transition:"opacity 0.4s", opacity: holding ? 0 : 1 }}>
                        गर्जाहट महसुस गर्न थिचिराख्नुस्
                    </p>
                </section>

                {/* Closing fade */}
                <div style={{ textAlign:"center", padding:"60px 0 40px 0" }}>
                    <p style={{ fontFamily:"Mukta,sans-serif", fontStyle:"italic", fontSize:"clamp(13px,1.4vw,16px)", color:"rgba(255,255,255,0.12)", margin:0 }}>
                        जब स्टेडियम गर्जन्छ — त्यो आवाज हाम्रो हो।
                    </p>
                </div>

                {/* ── CINEMATIC DETAILED STORY MODAL ── */}
                {selectedMilestone && (
                    <div className="fz-modal-overlay" onClick={() => setSelectedMilestone(null)}>
                        <div className="fz-modal-container" onClick={e => e.stopPropagation()}>
                            {/* Film Grain & Dynamic Radial glow matching modal theme */}
                            <div className="fz-grain-overlay" />
                            <div className="fz-modal-glow" />

                            {/* Close button */}
                            <button className="fz-modal-close" onClick={() => setSelectedMilestone(null)} aria-label="बन्द गर्नुहोस्">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px" }}>
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <div className="fz-modal-grid">
                                {/* Left column: Styled cinematic visual cover */}
                                <div className="fz-modal-left">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`https://picsum.photos/id/${((fans.indexOf(selectedMilestone) !== -1 ? fans.indexOf(selectedMilestone) : fanCraze.indexOf(selectedMilestone)) !== -1 ? [160,214,247,338,374,430,493,508,513,524,542,578,581,633,639,656,683,690,735,740][(fans.indexOf(selectedMilestone) !== -1 ? fans.indexOf(selectedMilestone) : fanCraze.indexOf(selectedMilestone)) % 20] : 374)}/900/600`}
                                        alt={selectedMilestone.name}
                                        className="fz-modal-image"
                                        draggable={false}
                                    />
                                    <div className="fz-modal-image-overlay" />
                                    <div className="fz-modal-image-text">
                                        <span className="fz-modal-tag">{selectedMilestone.chant}</span>
                                        <h3 className="fz-modal-left-title">{selectedMilestone.name}</h3>
                                        <p className="fz-modal-left-city">{selectedMilestone.city}</p>
                                    </div>
                                </div>

                                {/* Right column: Detailed documentary story */}
                                <div className="fz-modal-right">
                                    <span className="fz-modal-category">गौरवशाली इतिहास // THE HISTORICAL STORY</span>
                                    <h2 className="fz-modal-title">{selectedMilestone.name}</h2>
                                    <div className="fz-modal-divider" />
                                    
                                    {/* Subtitle / memory snippet */}
                                    <blockquote className="fz-modal-quote">
                                        "{selectedMilestone.memory}"
                                    </blockquote>

                                    {/* Complete detailed narrative story */}
                                    <div className="fz-modal-story-text">
                                        {selectedMilestone.fullStory ? (
                                            selectedMilestone.fullStory.split('\n').map((para, pidx) => (
                                                <p key={pidx} style={{ marginBottom: "16px" }}>{para}</p>
                                            ))
                                        ) : (
                                            <p>{selectedMilestone.memory}</p>
                                        )}
                                    </div>

                                    {/* Exclusive brand stamp watermark */}
                                    <div style={{ marginTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontFamily: "Mukta, sans-serif", fontSize: "11px", color: "#C9A84C", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>nepalCRIC आधिकारिक वृत्तचित्र</span>
                                        <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>DOC-ID: {fans.indexOf(selectedMilestone) !== -1 ? `M-${fans.indexOf(selectedMilestone) + 1}` : `D-${fanCraze.indexOf(selectedMilestone) + 1}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
