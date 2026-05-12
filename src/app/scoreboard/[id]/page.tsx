import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";

interface Match {
    opponent: string;
    date: string;
    result: string;
}

interface Archive {
    id: string;
    seriesName: string;
    year: string;
    outcome: string;
    matches: Match[];
}

function getArchives(): Archive[] {
    const raw = fs.readFileSync(path.join(process.cwd(), "content", "scoreboard.json"), "utf8");
    return (JSON.parse(raw) as { archives: Archive[] }).archives;
}

export async function generateStaticParams() {
    const archives = getArchives();
    return archives.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const archives = getArchives();
    const archive = archives.find((a) => a.id === id);
    if (!archive) return { title: "स्कोरबोर्ड" };
    return {
        title: `${archive.seriesName} — ${archive.year}`,
        description: archive.outcome,
    };
}

// Cinematic context per tournament
const TOURNAMENT_CONTEXT: Record<string, string> = {
    "t20wc-2014": "पहिलो पटक विश्व मञ्चमा पाइला टेक्दा, पारस खड्काको टोलीले संसारलाई देखायो कि नेपाली क्रिकेट सिर्फ सपना होइन — यो एउटा जीवित यात्रा हो। ढाकाको त्यो ओस भरिएको बिहान, नेपालको झण्डा जुन पहिलोपटक आईसीसी विश्वकपमा फरफराएको थियो — त्यो क्षण दुई दशकको संघर्षको प्रतिफल थियो।",
    "odi-status-2018": "इतिहास रचिएको त्यो दिन — १ अगस्त, २०१८। नेपालले पहिलोपटक आधिकारिक एकदिवसीय अन्तर्राष्ट्रिय खेल्यो। नेदरल्यान्ड्सविरुद्धको त्यो खेलमा सिर्फ ११ जना मैदानमा थिएनन् — नेपाली क्रिकेटको सिङ्गो इतिहास उत्रिएको थियो।",
    "cwc-qualifier-2023": "विश्वकपमा ऐतिहासिक छनोट — रोहित पौडेलको नेतृत्वमा नेपालले साबित गर्‍यो कि एसिया छनोटको हर खेल एउटा युद्ध हो। सुपर ओभरसम्म पुग्दा पनि, नेपालले सम्मानसहित लड्यो।",
    "cwc-league2-2023": "सीडब्ल्यूसी लिग २ मा नेपालको प्रदर्शन — ११ मध्ये ११ जित। रोहितको नेतृत्वमा टोलीले जुन तालमेल देखायो, त्यसले भन्यो: असम्भव भनेको सिर्फ एउटा शब्द हो।",
    "acc-premier-2023": "एसीसी प्रिमियर कप च्याम्पियन — नेपालले एसिया कपमा प्रवेश गर्‍यो। फाइनलमा युएईलाई हराउँदा, काठमाडौंका गल्लीहरूमा जस्तो जश्न मनाइयो जस्तो वर्षौंदेखि मनाइएको थिएन।",
    "t20wc-2024": "एक रनको त्यो पीडा — डलास, टेक्सास। जुन २०२४। दक्षिण अफ्रिकाविरुद्धको त्यो खेलमा नेपाल एक रनले चुक्यो, तर विश्वको मन जित्यो। त्यो हार इतिहासमा सबैभन्दा गौरवशाली पराजयहरूमध्ये एक बन्यो।",
    "t20wc-2026": "१२ वर्षपछि वानखेडेमा इतिहास — नेपालले आफ्नो पहिलो टी-ट्वेन्टी विश्वकप जित दर्ता गर्‍यो। स्कटल्यान्डलाई हराउँदा, रोहित पौडेलले ब्याट उठाएर आकाशतिर हेरे — त्यो एउटा पुस्ताको सपनाको पूर्ति थियो।",
};

function getResultColor(result: string): string {
    if (result.includes("विजयी") || result.includes("जित") || result.includes("च्याम्पियन")) {
        return "#C9A84C";
    }
    if (result.includes("पराजित") || result.includes("हार")) {
        return "#C41E3A";
    }
    return "#6B7280";
}

export default async function ScoreboardDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const archives = getArchives();
    const archiveIndex = archives.findIndex((a) => a.id === id);
    if (archiveIndex === -1) notFound();

    const series = archives[archiveIndex];
    const prevSeries = archiveIndex > 0 ? archives[archiveIndex - 1] : null;
    const nextSeries = archiveIndex < archives.length - 1 ? archives[archiveIndex + 1] : null;
    const context = TOURNAMENT_CONTEXT[series.id];

    const isWin =
        series.outcome.includes("जित") ||
        series.outcome.includes("विजयी") ||
        series.outcome.includes("च्याम्पियन");
    const outcomeColor = isWin ? "#C9A84C" : "#C41E3A";

    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative">

            {/* Global Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(circle at 15% 90%, rgba(196,30,58,0.08), transparent 55%),
                            radial-gradient(circle at 85% 10%, rgba(0,56,147,0.08), transparent 50%)
                        `,
                    }}
                />
            </div>

            {/* Hero — 40vh */}
            <section className="relative h-[40vh] w-full overflow-hidden flex flex-col justify-end pb-12">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: "grayscale(100%)",
                        opacity: 0.15,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/60 to-transparent" />

                <div className="relative z-20 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-start animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    <span
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "11px",
                            color: "#C9A84C",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                            display: "block",
                        }}
                    >
                        {series.seriesName}
                    </span>
                    <div
                        style={{
                            fontFamily: "Mukta, sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(48px,7vw,100px)",
                            color: "#FFFFFF",
                            lineHeight: 0.9,
                            marginBottom: "12px",
                        }}
                    >
                        {series.year}
                    </div>
                    <p
                        style={{
                            fontFamily: "Mukta, sans-serif",
                            fontWeight: 700,
                            fontSize: "clamp(18px,2.5vw,26px)",
                            color: outcomeColor,
                            lineHeight: 1.3,
                            marginBottom: "20px",
                            maxWidth: "600px",
                        }}
                    >
                        {series.outcome}
                    </p>
                    <Link
                        href="/scoreboard"
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "12px",
                            color: "#6B7280",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}
                        className="hover:text-[#E8E8E8] transition-colors"
                    >
                        ← स्कोरबोर्ड
                    </Link>
                </div>
            </section>

            {/* Match Results */}
            <section className="relative z-10 max-w-4xl mx-auto px-6 py-24">

                <div className="flex items-center mb-10">
                    <span
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "11px",
                            color: "#C9A84C",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            marginRight: "16px",
                            flexShrink: 0,
                        }}
                    >
                        म्याचहरू
                    </span>
                    <div style={{ flexGrow: 1, height: "1px", background: "rgba(201,168,76,0.3)" }} />
                </div>

                <div className="flex flex-col">
                    {series.matches.map((match, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: "24px 0",
                                borderBottom: idx < series.matches.length - 1
                                    ? "1px solid rgba(255,255,255,0.06)"
                                    : "none",
                            }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                                    <span
                                        style={{
                                            fontFamily: "Barlow Condensed, sans-serif",
                                            fontSize: "12px",
                                            color: "#C9A84C",
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            minWidth: "80px",
                                        }}
                                    >
                                        {match.date}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Mukta, sans-serif",
                                            fontSize: "20px",
                                            fontWeight: 700,
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        नेपाल बनाम {match.opponent}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        style={{
                                            fontFamily: "Mukta, sans-serif",
                                            fontSize: "15px",
                                            fontWeight: 600,
                                            color: getResultColor(match.result),
                                        }}
                                    >
                                        {match.result}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Context paragraph */}
                {context && (
                    <>
                        <div
                            style={{
                                height: "1px",
                                background: "rgba(255,255,255,0.08)",
                                margin: "48px 0 40px",
                            }}
                        />
                        <div className="flex items-center mb-8">
                            <span
                                style={{
                                    fontFamily: "Barlow Condensed, sans-serif",
                                    fontSize: "11px",
                                    color: "#C9A84C",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    marginRight: "16px",
                                    flexShrink: 0,
                                }}
                            >
                                सन्दर्भ
                            </span>
                            <div style={{ flexGrow: 1, height: "1px", background: "rgba(201,168,76,0.3)" }} />
                        </div>
                        <p
                            style={{
                                fontFamily: "Mukta, sans-serif",
                                fontSize: "18px",
                                color: "#B0B8C8",
                                lineHeight: 1.85,
                                fontStyle: "italic",
                            }}
                        >
                            {context}
                        </p>
                    </>
                )}
            </section>

            {/* Bottom navigation */}
            <nav className="relative z-10 max-w-4xl mx-auto px-6 pb-16">
                <div
                    style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.08)",
                        marginBottom: "32px",
                    }}
                />
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {prevSeries ? (
                        <Link
                            href={`/scoreboard/${prevSeries.id}`}
                            style={{
                                fontFamily: "Barlow Condensed, sans-serif",
                                fontSize: "12px",
                                color: "#6B7280",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                            }}
                            className="hover:text-[#C9A84C] transition-colors"
                        >
                            ← {prevSeries.seriesName} {prevSeries.year}
                        </Link>
                    ) : (
                        <span />
                    )}
                    {nextSeries ? (
                        <Link
                            href={`/scoreboard/${nextSeries.id}`}
                            style={{
                                fontFamily: "Barlow Condensed, sans-serif",
                                fontSize: "12px",
                                color: "#6B7280",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                            }}
                            className="hover:text-[#C9A84C] transition-colors"
                        >
                            {nextSeries.seriesName} {nextSeries.year} →
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
                <div className="text-center mt-8">
                    <Link
                        href="/scoreboard"
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "11px",
                            color: "#6B7280",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}
                        className="hover:text-[#C9A84C] transition-colors"
                    >
                        ← स्कोरबोर्डमा फर्किनुस्
                    </Link>
                </div>
            </nav>
        </div>
    );
}
