import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import ScoreboardStoryClient from "@/components/scoreboard/ScoreboardStoryClient";

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
        title: `${archive.seriesName} (${archive.year}) // स्कोरबोर्ड`,
        description: archive.outcome,
    };
}

// Mapped active player profiles associated with each specific tournament campaign
const ERA_PLAYERS: Record<string, { name: string; id: string }[]> = {
    "t20wc-2014": [
        { name: "सोमपाल कामी", id: "sompal-kami" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "करन केसी", id: "karan-kc" },
    ],
    "odi-status-2018": [
        { name: "सोमपाल कामी", id: "sompal-kami" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "ललित राजवंशी", id: "lalit-rajbanshi" },
    ],
    "cwc-qualifier-2023": [
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "गुल्सन झा", id: "gulshan-jha" },
        { name: "कुशल भुर्तेल", id: "kushal-bhurtel" },
        { name: "आसिफ शेख", id: "aasif-sheikh" },
        { name: "करन केसी", id: "karan-kc" },
        { name: "सोमपाल कामी", id: "sompal-kami" },
        { name: "सन्दीम जोरा", id: "sundeep-jora" },
    ],
    "cwc-league2-2023": [
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "गुल्सन झा", id: "gulshan-jha" },
        { name: "कुशल भुर्तेल", id: "kushal-bhurtel" },
        { name: "आसिफ शेख", id: "aasif-sheikh" },
        { name: "करन केसी", id: "karan-kc" },
        { name: "सोमपाल कामी", id: "sompal-kami" },
    ],
    "acc-premier-2023": [
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "गुल्सन झा", id: "gulshan-jha" },
        { name: "कुशल भुर्तेल", id: "kushal-bhurtel" },
        { name: "आसिफ शेख", id: "aasif-sheikh" },
        { name: "करन केसी", id: "karan-kc" },
        { name: "सोमपाल कामी", id: "sompal-kami" },
    ],
    "t20wc-2024": [
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "दीपेन्द्र सिंह ऐरी", id: "dipendra-singh-airee" },
        { name: "गुल्सन झा", id: "gulshan-jha" },
        { name: "कुशल भुर्तेल", id: "kushal-bhurtel" },
        { name: "आसिफ शेख", id: "aasif-sheikh" },
        { name: "सोमपाल कामी", id: "sompal-kami" },
        { name: "सन्दीम जोरा", id: "sundeep-jora" },
    ],
    "t20wc-2026": [
        { name: "रोहित पौडेल", id: "rohit-paudel" },
        { name: "सन्दीप लामिछाने", id: "sandeep-lamichhane" },
        { name: "दीपेन्द्र सिंह ऐरी", id: "dipendra-singh-airee" },
        { name: "गुल्सन झा", id: "gulshan-jha" },
        { name: "कुशल भुर्तेल", id: "kushal-bhurtel" },
        { name: "आसिफ शेख", id: "aasif-sheikh" },
        { name: "सोमपाल कामी", id: "sompal-kami" },
        { name: "सन्दीम जोरा", id: "sundeep-jora" },
    ],
};

// Hyper-Detailed 9-Act Tournament Narrative contexts with complete factual and pronoun purges applied
const TOURNAMENT_CONTEXT: Record<string, string> = {
    "t20wc-2014": "चटगाउँको त्यो ओस भरिएको बिहान — जब नेपाल पहिलोपटक विश्व क्रिकेटको सबैभन्दा ठूलो मञ्चमा उत्रियो, कप्तान पारस खड्काले ड्रेसिङ रुममा भनेका थिए: 'हामी भाग लिन आएका होइनौं।' त्यो वाक्यले नेपाली क्रिकेटको भाग्य सधैंका लागि परिवर्तन गरिदियो। चटगाउँको मैदानमा खेलिएका हङकङ, बङ्गलादेश र अफगानिस्तान विरुद्धका म्याचहरू सिंगो राष्ट्रको दुई दशक लामो संघर्षको प्रतिफल थिए। जितेन्द्र मुखियाको उत्कृष्ट कसिलो बलिङ र शक्तिको त्यो पखेटा फैलाएर मैदानभरि कुदेको बालसुलभ खुसीयाली नेपाली क्रिकेट इतिहासको अमूल्य सम्पत्ति बन्यो।",
    "odi-status-2018": "नेपालको ओडीआई मान्यता — १ अगस्ट २०१८। नेदरल्यान्ड्सको भीआरए क्रिकेट मैदानमा जब नेपाली खेलाडीहरू पहिलोपटक सेतो जर्सीमा मैदानमा उत्रिए, त्यो केवल ११ जनाको टोली थिएन — नेपाली क्रिकेटको दुई दशक लामो मौन रोदन र संघर्षको मुक्ति थियो। ३ अगस्टको ऐतिहासिक दोस्रो ओडीआईमा नेपालले नेदरल्यान्ड्सलाई मात्र १ रनले पराजित गर्दै पहिलो अन्तर्राष्ट्रिय विजय हासिल गर्दा कप्तान पारस खड्काले मैदानमै ढलेर रोएका थिए। त्यो क्षणले साबित गर्‍यो कि नेपाल अब यो उच्च स्तरमा लड्न र जित्न सक्षम भइसकेको छ।",
    "cwc-qualifier-2023": "विश्वकपमा ऐतिहासिक छनोट — कप्तान रोहित पौडेलको नेतृत्वमा नेपालले साबित गर्‍यो कि एसिया छनोटको हर खेल एउटा युद्ध हो। कीर्तिपुरको मैदानमा ओमानविरुद्धको सुपर ओभरको त्यो रोमांचक फाइनलदेखि मल्पानीमा युएईलाई ८ विकेटले हराएर १० वर्षपछि पुन: टी-ट्वेन्टी विश्वकपमा पुग्ने ऐतिहासिक ढोका खोलेको सेमिफाइनल खेल नेपाली फ्यानहरूको मुटुको धड्कन बनेको थियो। खेलाडीहरूको रगत-पसिना र राष्ट्रिय गर्वको त्यो एउटा असाधारण लडाईं थियो।",
    "cwc-league2-2023": "सीडब्ल्यूसी लिग २ को ऐतिहासिक ११ खेलको विजय यात्रा — रोहित पौडेलको नेतृत्वमा नेपाली टोलीले लगातार ११ खेल जित्दै जुन असम्भव विजय यात्रा तय गर्‍यो, त्यसले नेपाली खेलकुद इतिहासको सबैभन्दा ठूलो पुनरागमनलाई बुझाउँछ। कीर्तिपुरको प्रत्येक खेलमा १० औं हजार प्रशंसकहरू चिसो र धुलोको प्रवाह नगरी पीचका वरिपरि लामबद्ध भएका थिए। अन्तिम खेलमा युएईलाई डीएलएस प्रणाली अन्तर्गत ९ रनले हराउँदा रंगशालामा खुसीको आँसु बगेको थियो, जसले नेपाली क्रिकेटको विष्फोटक क्षमतालाई सिद्ध गर्‍यो।",
    "acc-premier-2023": "एसीसी प्रिमियर कप च्याम्पियन — नेपाल एसिया कपका लागि छनोट भयो। काठमाडौंका गल्लीहरू र कीर्तिपुरको रंगशालामा फाइनल खेलमा युएईलाई ७ विकेटले धुलो चटाउँदा सिंगो देश दीपावलीको जश्नमा डुबेको थियो। ललित राजवंशीको उत्कृष्ट कसिलो स्पिन स्पेल र कुशल भुर्तेलको संयमित ब्याटिङले नेपाललाई एसियाको सबैभन्दा ठूलो मञ्चमा भारत र पाकिस्तान जस्ता दिग्गज टोलीहरूसँग भिड्न लैग्यो, जुन एउटा सिङ्गो पुस्ताको सपनाको सुनौलो सुरुवात थियो।",
    "t20wc-2024": "एक रनको त्यो पीडा — सेन्ट भिन्सेन्ट, क्यारिबियन। जुन २०२४। आईसीसी टी-ट्वेन्टी विश्वकप २०२४ को समूह चरणमा दक्षिण अफ्रिकाविरुद्धको खेलमा नेपाल मात्र १ रनले चुक्यो, तर सिंगो विश्वको मुटु जित्यो। कुशल भुर्तेलको ४ विकेट र दीपेन्द्रको ३ विकेटको जादुमयी स्पेलले दक्षिण अफ्रिकालाई ११५ रनमा बाँध्यो। अन्तिम बलमा गुलशन झा रनआउट हुँदा अर्नोस भेल स्टेडियममा छाएको सन्नाटा र खेलाडीहरूको आँसु नेपाली वीरताको सबैभन्दा गौरवशाली कथा बन्यो।",
    "t20wc-2026": "१२ वर्षपछि वानखेडेमा इतिहास — नेपालले आफ्नो पहिलो टी-ट्वेन्टी विश्वकप जित दर्ता गर्‍यो। मुम्बईको ऐतिहासिक वानखेडे रंगशालामा स्कटल्यान्डलाई ७ विकेटले धुलो चटाउँदा कप्तान रोहित पौडेलले ब्याट उठाएर आकाशतिर हेरेका थिए — त्यो एउटा पुस्ताको अधुरो सपनाको भव्य पूर्तिका रूपमा इतिहासको स्वर्णिम पानामा सदाका लागि कुँदियो।",
};

// Seed db telemetry noise levels based on campaign ID
const TOURNAMENT_TELEMETRY: Record<string, { db: string; frequency: string; location: string }> = {
    "t20wc-2014": { db: "१३२db", frequency: "१०४.२ MHz", location: "चटगाउँ, बङ्गलादेश" },
    "odi-status-2018": { db: "१२४db", frequency: "९८.६ MHz", location: "एमस्टेलभिन, नेदरल्यान्ड्स" },
    "cwc-qualifier-2023": { db: "१३८db", frequency: "१०७.१ MHz", location: "मूलपानी/कीर्तिपुर" },
    "cwc-league2-2023": { db: "१४१db", frequency: "१०७.८ MHz", location: "कीर्तिपुर रंगशाला" },
    "acc-premier-2023": { db: "१३७db", frequency: "१०५.६ MHz", location: "कीर्तिपुर, काठमाडौं" },
    "t20wc-2024": { db: "१३३db", frequency: "१०३.४ MHz", location: "सेन्ट भिन्सेन्ट, क्यारिबियन" },
    "t20wc-2026": { db: "१३५db", frequency: "१०६.२ MHz", location: "वानखेडे, मुम्बई" },
};

function getResultColor(result: string): string {
    if (result.includes("विजयी") || result.includes("जित") || result.includes("च्याम्पियन")) {
        return "#C9A84C"; // Gold for Victory
    }
    if (result.includes("पराजित") || result.includes("हार")) {
        return "#C41E3A"; // Crimson for Defeat
    }
    return "rgba(255,255,255,0.45)";
}

export default async function ScoreboardDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const archives = getArchives();
    const archiveIndex = archives.findIndex((a) => a.id === id);
    if (archiveIndex === -1) notFound();

    const series = archives[archiveIndex];
    const prevSeries = archiveIndex > 0 ? archives[archiveIndex - 1] : null;
    const nextSeries = archiveIndex < archives.length - 1 ? archives[archiveIndex + 1] : null;
    const eraPlayers = ERA_PLAYERS[series.id] ?? [];
    const telemetry = TOURNAMENT_TELEMETRY[series.id] ?? { db: "१२८db", frequency: "१००.० MHz", location: "नेपाल" };
    const context = TOURNAMENT_CONTEXT[series.id];

    // Splitting context into acts (Cold Open vs descriptive body)
    const contextParagraphs = context ? context.split("। ").filter(Boolean) : [];
    const coldOpen = contextParagraphs.slice(0, 2).join("। ") + "।";
    const restContext = contextParagraphs.slice(2).join("। ") + (contextParagraphs.length > 2 ? "।" : "");

    // Infinite Cinematic Navigation Loop back-linking
    const upNextSeries = nextSeries || archives[0];

    const isWin =
        series.outcome.includes("जित") ||
        series.outcome.includes("विजयी") ||
        series.outcome.includes("च्याम्पियन");
    const outcomeColor = isWin ? "#C9A84C" : "#C41E3A";

    return (
        <div className="bg-[#07080F] min-h-screen selection:bg-[#C41E3A] selection:text-white pb-32 relative overflow-hidden font-sans">
            
            {/* Ambient Ember particles on detail page */}
            <ScoreboardStoryClient dbValue={telemetry.db} series={series.seriesName} />

            {/* Parallax Graded Header — 50vh */}
            <section className="relative h-[50vh] w-full overflow-hidden flex flex-col justify-end border-b border-white/5 pb-10">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                        filter: "brightness(0.35) contrast(1.05) grayscale(100%)",
                    }}
                />
                
                {/* Visual vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/45 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07080F]/90 via-transparent to-transparent z-10" />

                <div className="relative z-20 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-start animate-[fadeUpIn_0.8s_cubic-bezier(0.76,0,0.24,1)_both]">
                    <span
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "11px",
                            color: "#C9A84C",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            marginBottom: "10px",
                            display: "block",
                        }}
                    >
                        {series.seriesName}
                    </span>
                    <div
                        style={{
                            fontFamily: "Mukta, sans-serif",
                            fontWeight: 900,
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
                            fontWeight: 800,
                            fontSize: "clamp(18px,2.5vw,26px)",
                            color: outcomeColor,
                            lineHeight: 1.3,
                            marginBottom: "20px",
                            maxWidth: "700px",
                        }}
                    >
                        {series.outcome}
                    </p>
                    <Link
                        href="/scoreboard"
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.45)",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}
                        className="inline-flex items-center gap-2 hover:text-[#C9A84C] transition-colors group"
                    >
                        <span className="transform transition-transform duration-300 group-hover:-translate-x-1.5 inline-block">←</span> 
                        स्कोरबोर्ड अभिलेख // SCOREBOARD ARCHIVES
                    </Link>
                </div>
            </section>

            {/* Main Campaign Dossier Grid */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* LEFT COLUMN: Telemetry sidebar & squad links (lg:col-span-4) */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-28 space-y-8">
                            
                            {/* Broadcast Telemetry Dossier */}
                            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-sm backdrop-blur-md space-y-5">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <span 
                                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.15em" }}
                                        className="uppercase font-bold"
                                    >
                                        युद्ध मापन विवरण // TELEMETRY
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#C41E3A] rounded-full animate-ping" />
                                        <span 
                                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C41E3A", letterSpacing: "0.1em" }}
                                            className="uppercase font-extrabold"
                                        >
                                            SIGNAL ACTIVE
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label style={{ fontFamily: "Mukta, sans-serif" }} className="text-[11px] text-white/40 block mb-1">मुख्य रणभूमि</label>
                                        <span style={{ fontFamily: "Mukta, sans-serif" }} className="text-[14px] text-white font-bold">{telemetry.location}</span>
                                    </div>
                                    <div>
                                        <label style={{ fontFamily: "Mukta, sans-serif" }} className="text-[11px] text-white/40 block mb-1">प्रसारण फ्रिक्वेन्सी</label>
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif" }} className="text-[14px] text-white font-bold tracking-wide">{telemetry.frequency}</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                                    <div>
                                        <label style={{ fontFamily: "Mukta, sans-serif" }} className="text-[11px] text-white/40 block mb-1">दर्शक गर्जाहट (Peak Volume)</label>
                                        <span style={{ fontFamily: "Barlow Condensed, sans-serif", color: "#C9A84C" }} className="text-[20px] font-extrabold tracking-tight">{telemetry.db}</span>
                                    </div>
                                    
                                    {/* Sidebar Live Seismograph Waveform */}
                                    <div className="ssc-seismo-bars">
                                        {[...Array(6)].map((_, bi) => (
                                            <div
                                                key={bi}
                                                className="ssc-seismo-bar"
                                                style={{
                                                    height: `${40 + bi * 12}%`,
                                                    animationDelay: `${-bi * 0.15}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Related Squad Connections */}
                            {eraPlayers.length > 0 && (
                                <div className="space-y-4">
                                    <span 
                                        style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.22em" }}
                                        className="uppercase font-bold block"
                                    >
                                        यो युगका खेलाडीहरू // KEY FIGURES
                                    </span>
                                    
                                    <div className="flex flex-col gap-2.5">
                                        {eraPlayers.map((player) => (
                                            <Link
                                                key={player.id}
                                                href={`/squad/${player.id}`}
                                                className="group flex items-center justify-between bg-white/[0.02] border border-white/5 px-5 py-4 hover:border-[#C9A84C]/40 hover:bg-white/[0.04] transition-all duration-300 text-decoration-none"
                                                style={{ borderRadius: "2px" }}
                                            >
                                                <span 
                                                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "16px", fontWeight: 700 }}
                                                    className="text-white group-hover:text-[#C9A84C] transition-colors"
                                                >
                                                    {player.name}
                                                </span>
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    width="14" 
                                                    height="14" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2.5" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    className="text-white/20 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#C9A84C]"
                                                >
                                                    <path d="M5 12h14" />
                                                    <path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </aside>

                    {/* RIGHT COLUMN: Matches list & Tournament Context (lg:col-span-8) */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* High-Fidelity Broadcast Scorecard */}
                        <div className="space-y-4">
                            <span 
                                style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.22em" }}
                                className="uppercase font-bold block"
                            >
                                युद्ध म्याच रेकर्ड // SCORECARD RECORD
                            </span>

                            <div className="flex flex-col gap-3">
                                {series.matches.map((match, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white/[0.01] border border-white/5 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                                            <span 
                                                style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.15em" }}
                                                className="uppercase font-bold shrink-0 min-w-[90px]"
                                            >
                                                {match.date}
                                            </span>
                                            
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#C41E3A] animate-pulse" />
                                                <span 
                                                    style={{ fontFamily: "Mukta, sans-serif", fontSize: "18px", fontWeight: 800 }}
                                                    className="text-white"
                                                >
                                                    नेपाल बनाम {match.opponent}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="md:text-right">
                                            <span 
                                                style={{ fontFamily: "Mukta, sans-serif", fontSize: "15px", fontWeight: 700, color: getResultColor(match.result) }}
                                                className="uppercase tracking-wide inline-block px-3 py-1 rounded-[2px] bg-white/[0.02]"
                                            >
                                                {match.result}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tournament 9-Act Context */}
                        {context && (
                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <span 
                                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.22em" }}
                                    className="uppercase font-bold block"
                                >
                                    ऐतिहासिक पृष्ठभूमि // TOURNAMENT NARRATIVE
                                </span>

                                {/* Cold Open Gold Block */}
                                {coldOpen && (
                                    <blockquote className="border-l-4 border-[#C9A84C] pl-6 py-1 bg-[#C9A84C]/[0.01] mb-6">
                                        <p 
                                            style={{ fontFamily: "Mukta, sans-serif", fontSize: "20px", fontWeight: 700, color: "#E8E8E8", lineHeight: 1.5 }}
                                            className="italic"
                                        >
                                            {coldOpen}
                                        </p>
                                    </blockquote>
                                )}

                                {/* Remaining context */}
                                {restContext && (
                                    <p 
                                        style={{ fontFamily: "Mukta, sans-serif", fontSize: "17.5px", color: "rgba(176, 184, 200, 0.88)", lineHeight: 1.85 }}
                                        className="text-justify font-medium"
                                    >
                                        {restContext}
                                    </p>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {/* CINEMATIC NAVIGATION LOOP SYSTEM */}
            <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 mt-12 pb-16">
                <div className="border-t border-white/5 pt-12 mb-8" />
                
                {/* 1. UP NEXT: Large Landscape duotone countdown banner */}
                <span 
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.22em" }}
                    className="uppercase font-bold block mb-4"
                >
                    अर्को ऐतिहासिक अभियान // UP NEXT IN CAMPAIGNS
                </span>
                
                <Link
                    href={`/scoreboard/${upNextSeries.id}`}
                    className="group relative block w-full h-[220px] rounded-sm overflow-hidden border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-500 mb-12 text-decoration-none"
                >
                    {/* Graded cover background image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center grayscale-[55%] brightness-[0.38] transition-all duration-700 group-hover:scale-103 group-hover:grayscale-0 group-hover:brightness-[0.52]" 
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07080F]/90 via-[#07080F]/60 to-transparent z-10 pointer-events-none" />
                    
                    <div className="absolute inset-y-0 left-0 p-8 md:p-12 z-20 flex flex-col justify-center">
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.28em" }}
                            className="uppercase font-black mb-2.5 block"
                        >
                            {upNextSeries.seriesName}
                        </span>
                        <h3 
                            style={{ fontFamily: "Mukta, sans-serif", fontSize: "clamp(20px, 3.5vw, 30px)", fontWeight: 900, lineHeight: 1.2 }}
                            className="text-white group-hover:text-[#C9A84C] transition-colors mb-2"
                        >
                            {upNextSeries.outcome}
                        </h3>
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}
                            className="font-bold tracking-wide"
                        >
                            सन {upNextSeries.year} · स्कोरबोर्ड हेर्नुस् // TAP TO ACCESS
                        </span>
                    </div>

                    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/70 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:border-[#C9A84C]/60 transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: "12px", height: "12px", color: "#C9A84C" }} xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                    </div>
                </Link>

                {/* 2. EXPLORE THE CRICKET UNIVERSE: A premium spotlit bento navigation grid */}
                <span 
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.22em" }}
                    className="uppercase font-bold block mb-5"
                >
                    नेपाली क्रिकेटको ब्रह्माण्ड // EXPLORE THE UNIVERSE
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Link A: Fan Zone */}
                    <Link
                        href="/fanzone"
                        className="group relative h-[150px] bg-white/[0.01] border border-white/5 hover:border-[#C41E3A]/40 p-6 flex flex-col justify-end rounded-sm transition-all duration-300 text-decoration-none"
                    >
                        <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#C41E3A] animate-pulse" />
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C41E3A", letterSpacing: "0.2em" }}
                            className="uppercase font-extrabold mb-1"
                        >
                            फ्यानहरू र गर्जाहट // FAN ZONE
                        </span>
                        <h4 style={{ fontFamily: "Mukta, sans-serif" }} className="text-white text-[17px] font-extrabold m-0 group-hover:text-[#C41E3A] transition-colors">
                            फ्यान जोनमा प्रवेश गर्नुस् →
                        </h4>
                    </Link>

                    {/* Link B: Active Squad */}
                    <Link
                        href="/squad"
                        className="group relative h-[150px] bg-white/[0.01] border border-white/5 hover:border-[#C9A84C]/40 p-6 flex flex-col justify-end rounded-sm transition-all duration-300 text-decoration-none"
                    >
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.2em" }}
                            className="uppercase font-extrabold mb-1"
                        >
                            राष्ट्रिय टोली // NATIONAL SQUAD
                        </span>
                        <h4 style={{ fontFamily: "Mukta, sans-serif" }} className="text-white text-[17px] font-extrabold m-0 group-hover:text-[#C9A84C] transition-colors">
                            सक्रिय स्क्वाड हेर्नुस् →
                        </h4>
                    </Link>

                    {/* Link C: Locker Room */}
                    <Link
                        href="/locker-room"
                        className="group relative h-[150px] bg-white/[0.01] border border-white/5 hover:border-yellow-600/30 p-6 flex flex-col justify-end rounded-sm transition-all duration-300 text-decoration-none"
                    >
                        <span 
                            style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.2em" }}
                            className="uppercase font-extrabold mb-1"
                        >
                            ऐतिहासिक कथाहरू // LOCKER ROOM
                        </span>
                        <h4 style={{ fontFamily: "Mukta, sans-serif" }} className="text-white text-[17px] font-extrabold m-0 group-hover:text-[#C9A84C] transition-colors">
                            लकर रुममा प्रवेश गर्नुस् →
                        </h4>
                    </Link>

                </div>

                {/* Back to archive index */}
                <div className="text-center mt-12">
                    <Link
                        href="/scoreboard"
                        style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.4)",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}
                        className="hover:text-[#C9A84C] transition-colors border border-white/5 bg-white/[0.01] px-8 py-3 rounded-full hover:border-[#C9A84C]/30 hover:bg-white/[0.03]"
                    >
                        ← स्कोरबोर्डको मुख्य टनेलमा फर्किनुस्
                    </Link>
                </div>
            </section>
        </div>
    );
}
