"use client";

interface DocuBridgeProps {
    index: string;
    text: string;
}

export default function DocuBridge({ index, text }: DocuBridgeProps) {
    return (
        <div className="w-full bg-[#07080F] relative overflow-hidden py-10 border-y border-white/5 flex justify-center items-center">
            {/* Background glowing particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                backgroundImage: `radial-gradient(rgba(201, 168, 76, 0.08) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }} />
            
            {/* Inner frame */}
            <div className="max-w-4xl w-full mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                {/* HUD Tracker Tag */}
                <div className="flex items-center gap-3.5 mb-4 relative">
                    <span className="h-[1px] w-6 bg-[#C9A84C]/40" />
                    <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-ping" />
                        <span className="font-stats font-bold text-[#C9A84C] tracking-[0.25em] text-[8.5px] uppercase drop-shadow-[0_0_6px_rgba(201,168,76,0.3)]">
                            NARRATIVE kD // कडी {index}
                        </span>
                    </div>
                    <span className="h-[1px] w-6 bg-[#C9A84C]/40" />
                </div>

                {/* Dramatic Transition Text in Devanagari (Content Protocol v2 Compliant) */}
                <p className="font-sans font-medium text-stadium-white/80 leading-relaxed text-sm md:text-base max-w-3xl italic tracking-wide">
                    &ldquo;{text}&rdquo;
                </p>

                {/* Bottom design scanner node line */}
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent mt-4" />
            </div>

            {/* Subtle glow nodes */}
            <div className="absolute top-0 left-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
            <div className="absolute bottom-0 right-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C41E3A]/20 to-transparent" />
        </div>
    );
}
