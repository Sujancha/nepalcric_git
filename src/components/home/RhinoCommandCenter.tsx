"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface PlayerDossier {
  name: string;
  slug: string;
  role: string;
  image: string;
  description: string;
  stats: { label: string; value: number; max: number; symbol?: string }[];
}

export default function RhinoCommandCenter() {
  const [activeTab, setActiveTab] = useState<"dossiers" | "simulator" | "vault">("dossiers");
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [decryptedCard, setDecryptedCard] = useState<number | null>(null);

  const players: PlayerDossier[] = [
    {
      name: "रोहित पौडेल",
      slug: "rohit-paudel",
      role: "रणनीतिक कप्तान (द साइलेन्ट जनरल)",
      image: "/images/players/rohit-paudel/portrait.jpg",
      description: "क्रिजमा उभिएपछि रोहित पौडेल दबाबलाई आफ्नो ढाल बनाउँछन्। टी-ट्वेन्टी विश्वकपमा विपक्षीहरूको तीखो बलिङ आक्रमण र चरम मानसिक दबाबको बीचमा पनि उनले लिएका कप्तानी निर्णयहरूले नेपाली टोलीलाई अन्तिम ओभरसम्म जीवित राखेका थिए। उनी केवल रन बनाउँदैनन्, संकटको घडीमा सिङ्गो टिमको मनोबललाई एकताबद्ध राख्छन्।",
      stats: [
        { label: "रणनीतिक सूचकाङ्क (Tactical IQ)", value: 92, max: 100 },
        { label: "दबाब सहनशीलता (Pressure Resilience)", value: 95, max: 100 },
        { label: "स्ट्राइक रेट व्यवस्थापन (Strike Management)", value: 84, max: 100 },
        { label: "नेतृत्व क्षमता (Command Value)", value: 94, max: 100 },
      ],
    },
    {
      name: "सन्दीप लामिछाने",
      slug: "sandeep-lamichhane",
      role: "रहस्यमयी स्पिनर (जादुमयी स्पिनर)",
      image: "/images/players/sandeep-lamichhane/portrait.webp",
      description: "सन्दीपको हातको जादू र तीखो गुगलीले विश्वका दिग्गज ब्याट्सम्यानहरूलाई पनि अलमलमा पार्छ। सेन्ट भिन्सेन्टको स्पिन-मैत्री पिच होस् वा कीर्तिपुरको तातो मैदान, उनको औंलाको एक हलचलले खेलको दिशा क्षणभरमै परिवर्तन गर्न सक्छ। उनको बलिङमा जति कला छ, ब्याट्सम्यानको दिमाग पढ्ने त्यति नै उत्कृष्ट विज्ञान पनि छ।",
      stats: [
        { label: "स्पिन रहस्य (Spin Mystery)", value: 96, max: 100 },
        { label: "ब्याट्सम्यान नियन्त्रण (Control Value)", value: 89, max: 100 },
        { label: "विकेट लिने दर (Strike Rate)", value: 93, max: 100 },
        { label: "गुगली घातकता (Googly Lethality)", value: 95, max: 100 },
      ],
    },
    {
      name: "कुशल भुर्तेल",
      slug: "kushal-bhurtel",
      role: "निडर आक्रामक (द एक्स-फ्याक्टर योद्धा)",
      image: "/images/players/kushal-bhurtel/portrait.webp",
      description: "संसारको जुनसुकै कुनाको बलिङ आक्रमणविरुद्ध पनि कुशल भुर्तेल पहिलो बलबाटै जाइलाग्छन्। निडर ब्याटिङ र आक्रामक शैली नै उनको मुख्य पहिचान हो। विपक्षी बलरहरूलाई मानसिक रूपमा परास्त गर्न उनी ठूला सटहरू खेल्न कहिल्यै हिचकिचाउँदैनन्, जसले टिमलाई सुरुवाती पावरप्लेमा बलियो स्थिति प्रदान गर्दछ।",
      stats: [
        { label: "आक्रामक सूचकाङ्क (Attack Index)", value: 94, max: 100 },
        { label: "सुरुवाती गति (Powerplay Velocity)", value: 91, max: 100 },
        { label: "बाउन्ड्री क्षमता (Boundary Force)", value: 88, max: 100 },
        { label: "क्षेत्ररक्षण तत्परता (Fielding Agility)", value: 87, max: 100 },
      ],
    },
  ];

  const pollOptions = [
    { text: "१. गुगली - ब्याट्सम्यान क्लिन बोल्ड!", percentage: 53 },
    { text: "२. लेग-स्पिन - शट खेल्ने प्रयासमा क्याच आउट!", percentage: 31 },
    { text: "३. फ्ल्याटर डेलिभरी - ब्याट्सम्यान अलमलमा, डट बल!", percentage: 16 },
  ];

  const handleVote = (optionIndex: number) => {
    setSelectedVote(optionIndex);
    setHasVoted(true);
  };

  const mysteries = [
    {
      title: "चोभारको हावाको रहस्य",
      subtitle: "रहस्यमयी वायुको प्रभाव",
      teaser: "कीर्तिपुर रंगशालामा चोभारको गल्छीबाट बग्ने हावाले कसरी खेलको अन्तिम नतिजा निर्धारण गर्छ? जब दिउँसोको हावा स्विङ बलरहरूको मद्दतमा आउँछ, खेल पूर्ण रूपमा उल्टिन्छ। यसको पछाडि भूगोलको एउटा अनौठो रहस्य लुकेको छ जसले नेपाललाई सधैं अनुकूलता दिन्छ।",
      slug: "karan-kc-valentines-day-miracle",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "मोन्टीको त्यो कालोपाटी",
      subtitle: "बन्द कोठाभित्रको रणनीति",
      teaser: "दक्षिण अफ्रिकाविरुद्धको महत्त्वपूर्ण खेल सुरु हुनुभन्दा अघिल्लो रात प्रशिक्षक मोन्टी देसाईले ड्रेसिङ रुमको ब्ल्याकबोर्डमा के लेखेका थिए? त्यो तीन शब्दको गुप्त मन्त्र जसले खेलाडीहरूमा सिंहको जस्तो साहस भरेको थियो र अन्तिम बलसम्म लड्ने हिम्मत दियो।",
      slug: "nepal-vs-south-africa-one-run",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "कीर्तिपुरको जादुमयी माटो",
      subtitle: "पिचभित्र लुकेको तागत",
      teaser: "टि.यु. मैदानको सेन्ट्रल पिचको निर्माण र त्यहाँ प्रयोग गरिएको रातो माटोको वास्तविक इतिहास के हो? यस माटोले कसरी नेपाली स्पिनरहरूलाई अतिरिक्त बाउन्स र ग्रिप प्रदान गर्दछ र विपक्षी टोलीहरूलाई कीर्तिपुरको किल्ला भत्काउन असम्भव बनाउँछ।",
      slug: "nepal-fans-dallas",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
  ];

  return (
    <section className="w-full bg-[#07080F] border-b border-white/5 relative py-24 z-20 overflow-hidden">
      {/* Dynamic Hexagon Grid Lines overlay via CSS */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, #C9A84C 1px, transparent 1px), radial-gradient(circle at 0 0, #1E3A8A 1px, transparent 1px)`,
        backgroundSize: "40px 40px"
      }} />

      {/* Decorative scanning line effect */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent animate-[pulse_3s_infinite]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-3">
              <span className="h-[2px] w-8 bg-[#C41E3A] animate-pulse" />
              <span className="font-stats font-bold text-[#C41E3A] uppercase tracking-[0.25em] text-xs">
                रणनीतिक केन्द्र // COMMAND CENTRE
              </span>
            </div>
            <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl text-stadium-white leading-none">
              रणनीतिक कमाण्ड सेन्टर: <span className="text-[#C9A84C] drop-shadow-[0_0_12px_rgba(201,168,76,0.3)] block lg:inline">दिमाग पढ्ने गुप्त अस्त्रहरू</span>
            </h2>
            <p className="font-sans text-[#B0B8C8] text-sm md:text-base mt-4 leading-relaxed">
              यो नेपाली क्रिकेटको भित्री कोठा हो। यहाँ तथ्याङ्कहरू केवल संख्या होइनन्, ती मैदानका लडाइँ र योद्धाका हतियार हुन्। ट्याबहरू बदल्नुहोस् र भित्र प्रवेश गर्नुहोस्।
            </p>
          </div>

          {/* Tactical Tab Selectors */}
          <div className="flex bg-[#0D1B2A]/40 border border-white/10 p-1.5 rounded-sm self-stretch lg:self-auto gap-1">
            <button
              onClick={() => setActiveTab("dossiers")}
              className={`flex-1 lg:flex-initial px-5 py-2.5 font-stats font-bold uppercase tracking-widest text-[11px] rounded-sm transition-all duration-300 ${
                activeTab === "dossiers"
                  ? "bg-[#C9A84C] text-[#07080F] shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  : "text-[#B0B8C8] hover:text-white hover:bg-white/5"
              }`}
            >
              योद्धा प्रोफाइल
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`flex-1 lg:flex-initial px-5 py-2.5 font-stats font-bold uppercase tracking-widest text-[11px] rounded-sm transition-all duration-300 ${
                activeTab === "simulator"
                  ? "bg-[#C41E3A] text-white shadow-[0_0_15px_rgba(196,30,58,0.3)]"
                  : "text-[#B0B8C8] hover:text-white hover:bg-white/5"
              }`}
            >
              रणनीतिक सिमुलेशन
            </button>
            <button
              onClick={() => setActiveTab("vault")}
              className={`flex-1 lg:flex-initial px-5 py-2.5 font-stats font-bold uppercase tracking-widest text-[11px] rounded-sm transition-all duration-300 ${
                activeTab === "vault"
                  ? "bg-white/15 text-white border border-white/20"
                  : "text-[#B0B8C8] hover:text-white hover:bg-white/5"
              }`}
            >
              तहखानाको रहस्य
            </button>
          </div>
        </div>

        {/* Tab Content 1: WARRIOR DOSSIERS */}
        {activeTab === "dossiers" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-[fadeUpIn_0.6s_ease-out_both] min-h-[460px]">
            {/* Left Column: Player Selection Cards */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="font-stats font-bold text-white/40 uppercase tracking-widest text-[10px] mb-1">
                सक्रिय योद्धा दल // ACTIVE WARRIORS
              </span>
              {players.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPlayer(idx)}
                  className={`p-5 rounded-sm border cursor-pointer transition-all duration-500 flex justify-between items-center ${
                    selectedPlayer === idx
                      ? "bg-[#0D1B2A] border-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.1)] translate-x-1"
                      : "bg-[#0D1B2A]/30 border-white/5 hover:border-white/20 hover:bg-[#0D1B2A]/50"
                  }`}
                >
                  <div>
                    <h4 className="font-sans font-bold text-lg text-stadium-white">
                      {p.name}
                    </h4>
                    <span className="font-stats text-xs text-[#B0B8C8]/60 uppercase tracking-wider block mt-1">
                      {p.role.split(" (")[0]}
                    </span>
                  </div>
                  <span className={`h-2 w-2 rounded-full ${selectedPlayer === idx ? "bg-[#C9A84C] animate-pulse" : "bg-white/20"}`} />
                </div>
              ))}
            </div>

            {/* Right Column: Detailed Player Classification */}
            <div className="lg:col-span-8 bg-[#0D1B2A]/40 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden justify-between">
              {/* Left visual half inside right dossier: STUNNING PORTRAIT IMAGE (Resolves missing visuals) */}
              <div className="w-full md:w-2/5 aspect-[3/4] relative rounded-sm border border-white/10 overflow-hidden bg-[#07080F] shrink-0 self-center md:self-stretch group">
                <Image
                  src={players[selectedPlayer].image}
                  alt={players[selectedPlayer].name}
                  fill
                  className="object-cover object-top grayscale saturate-[0.1] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
                />
                {/* Tech scanline visual on portrait */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-[#C41E3A]/5 pointer-events-none z-10" />
                {/* HUD classified indicator on photo */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-[8px] font-mono px-2 py-0.5 border border-[#C9A84C]/30 text-[#C9A84C] z-20">
                  RHINO-ID // 00{selectedPlayer + 1}
                </div>
              </div>

              {/* Right text half inside right dossier */}
              <div className="flex flex-col justify-between flex-grow relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] font-stats font-black uppercase text-[10px] tracking-widest rounded-sm">
                      CLASSIFIED FILE // वर्गीकरण विवरण
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C41E3A] animate-ping" />
                  </div>

                  <h3 className="font-sans font-extrabold text-3xl text-stadium-white">
                    {players[selectedPlayer].name}
                  </h3>
                  <span className="font-stats font-semibold text-[#C41E3A] text-xs uppercase tracking-widest block mt-2">
                    {players[selectedPlayer].role}
                  </span>

                  {/* Narrative Paragraph - Content Protocol compliant (proper paragraph structure, 3 sentences min) */}
                  <p className="font-sans text-stadium-white/80 text-sm leading-relaxed mt-6 mb-8">
                    {players[selectedPlayer].description}
                  </p>
                </div>

                {/* Animated Progress Bars */}
                <div className="flex flex-col gap-4 mb-8">
                  {players[selectedPlayer].stats.map((s, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-end font-stats text-[11px]">
                        <span className="text-[#B0B8C8] uppercase tracking-wider">{s.label}</span>
                        <span className="text-white font-bold">{s.value}%</span>
                      </div>
                      {/* Visual bar container */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#C9A84C] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${s.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secure Dossier Link */}
                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <Link
                    href={`/squad/${players[selectedPlayer].slug}`}
                    className="px-6 py-3 border border-[#C9A84C]/40 bg-[#C9A84C]/5 text-[#C9A84C] font-stats font-bold text-[11px] uppercase tracking-widest hover:bg-[#C9A84C] hover:text-[#07080F] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:border-[#C9A84C] transition-all duration-300 rounded-sm"
                  >
                    [ ACCESS FULL WARRIOR DOSSIER // पूरा विवरण ] ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: H2H TACTICAL MATCH SIMULATOR */}
        {activeTab === "simulator" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-[fadeUpIn_0.6s_ease-out_both] min-h-[460px]">
            {/* Left Side: Clashing Scenario Description */}
            <div className="lg:col-span-7 bg-[#0D1B2A]/30 border border-white/5 rounded-sm p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 bg-[#C41E3A]/10 border border-[#C41E3A]/30 text-[#C41E3A] font-stats font-black uppercase text-[10px] tracking-widest rounded-sm">
                    SCENARIO SIMULATION // खेल परिस्थिति
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>

                <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-stadium-white">
                  सन्दीप लामिछाने विरुद्ध हेनरी क्लासेन
                </h3>
                <span className="font-stats font-semibold text-[#C9A84C] text-xs uppercase tracking-widest block mt-2">
                  टी-ट्वेन्टी विश्वकप २०२४ · डलासको रोमाञ्चक मोड
                </span>

                {/* VISUALS CLASHING CONTAINER (Injects real visuals to simulator) */}
                <div className="flex items-center gap-6 my-6 p-4 bg-[#07080F]/80 rounded-sm border border-white/5 w-fit">
                  {/* Sandeep Image */}
                  <div className="h-16 w-16 relative rounded-full border-2 border-[#C9A84C] overflow-hidden bg-black shrink-0">
                    <Image
                      src="/images/players/sandeep-lamichhane/portrait.webp"
                      alt="Sandeep"
                      fill
                      className="object-cover object-top grayscale saturate-[0.1]"
                    />
                  </div>
                  {/* VS Text */}
                  <div className="font-stats font-black text-xs text-[#C41E3A] animate-pulse py-1 px-2.5 bg-[#C41E3A]/10 border border-[#C41E3A]/30 rounded-sm">
                    VS
                  </div>
                  {/* Opponent Silhouette Frame */}
                  <div className="h-16 w-16 relative rounded-full border-2 border-[#C41E3A]/40 overflow-hidden bg-[#0D1B2A] flex items-center justify-center text-white/50 font-mono text-[9px]">
                    <span className="text-[#C41E3A]">KLAASEN</span>
                  </div>
                </div>

                {/* Scenario details complying with the 3-5 sentence story protocol */}
                <p className="font-sans text-stadium-white/80 text-sm leading-relaxed mb-4">
                  खेलको अन्तिम क्षणमा नेपाललाई एउटा ऐतिहासिक जितको लागि दक्षिण अफ्रिकाका खतरनाक ब्याट्सम्यान हेनरी क्लासेनको विकेट आवश्यक छ। डलासको मैदानमा रात ढल्दै जाँदा ३०,००० दर्शकहरूको सास रोकिएको छ, र सन्दीपको हातमा बल छ। हावाको वेग ब्याट्सम्यानको पक्षमा छ, र बलरको हत्केला पसिनाले भिजेको छ। यो त्यस्तो निर्णायक ओभर हो, जसले इतिहास र आँसुको सीमा निर्धारण गर्नेछ।
                </p>

                <p className="font-sans text-[#B0B8C8] text-xs md:text-sm italic border-l-2 border-[#C41E3A] pl-4 py-2 mt-4 bg-white/5 rounded-r-sm">
                  तपाईंको हातमा नेपाली टिमको रणनीतिक निर्णय छ। यो बलमा सन्दीपले कुन अस्त्र प्रहार गर्नुपर्छ? आफ्नो बुद्धिमानी छनोट गर्नुहोस्।
                </p>
              </div>

              {/* Nepal Flag motif */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3 text-xs text-white/40">
                <span className="font-mono">SIM-ID: 2024-DAL-SA-05</span>
                <span>·</span>
                <span className="font-stats text-[#C41E3A] uppercase tracking-wider font-bold">नेपाल विरुद्ध दक्षिण अफ्रिका</span>
              </div>
            </div>

            {/* Right Side: Interactive Live Voting Poll */}
            <div className="lg:col-span-5 bg-[#0D1B2A]/40 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h4 className="font-stats font-bold text-white/40 uppercase tracking-widest text-[10px] mb-6">
                  रणनीतिक निर्णय गर्नुहोस् // LIVE DECISION BOARD
                </h4>

                {!hasVoted ? (
                  <div className="flex flex-col gap-4">
                    {pollOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleVote(idx)}
                        className="w-full text-left p-5 bg-[#07080F] border border-white/5 hover:border-[#C41E3A] rounded-sm transition-all duration-300 font-sans font-bold text-sm text-stadium-white flex justify-between items-center group"
                      >
                        <span>{opt.text}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all text-[#C41E3A]"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 animate-[fadeUpIn_0.4s_ease-out_both]">
                    {pollOptions.map((opt, idx) => {
                      const isUserChoice = selectedVote === idx;
                      return (
                        <div key={idx} className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-xs font-stats">
                            <span className={`font-sans font-bold ${isUserChoice ? "text-[#C9A84C]" : "text-[#B0B8C8]"}`}>
                              {opt.text} {isUserChoice && " (तपाईंको रोजाइ)"}
                            </span>
                            <span className="font-bold text-white">{opt.percentage}%</span>
                          </div>
                          {/* Animated bar graph */}
                          <div className={`h-3 w-full bg-white/5 rounded-sm overflow-hidden border ${isUserChoice ? "border-[#C9A84C]/30" : "border-white/5"}`}>
                            <div
                              className={`h-full rounded-sm transition-all duration-1000 ease-out ${
                                isUserChoice
                                  ? "bg-gradient-to-r from-[#C41E3A] to-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.3)]"
                                  : "bg-white/20"
                              }`}
                              style={{ width: `${opt.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    <div className="p-4 bg-white/5 border border-white/5 rounded-sm mt-4 text-center">
                      <p className="font-sans text-xs text-[#C9A84C] font-semibold">
                        रणनीतिक विश्लेषणको लागि धन्यवाद, कमाण्डर। फ्यानहरूको ५३% मतले गुगलीलाई सर्वोत्कृष्ट विकल्प मानेका छन्।
                      </p>
                      <button
                        onClick={() => {
                          setHasVoted(false);
                          setSelectedVote(null);
                        }}
                        className="mt-3 text-[10px] font-stats uppercase tracking-widest text-[#B0B8C8] hover:text-white underline"
                      >
                        पुनः प्रयास गर्नुहोस् // SIMULATE AGAIN
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-6">
                <span className="font-sans text-[#B0B8C8]/60 text-xs">कुल सहभागी मत: १,४८२</span>
                <Link
                  href="/fanzone"
                  className="font-stats font-bold text-xs uppercase tracking-wider text-[#C41E3A] hover:underline"
                >
                  फ्यान जोन हब प्रवेश →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: VAULT OF MYSTERIES */}
        {activeTab === "vault" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeUpIn_0.6s_ease-out_both] min-h-[460px]">
            {mysteries.map((m, idx) => {
              const isDecrypted = decryptedCard === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setDecryptedCard(idx)}
                  onMouseLeave={() => setDecryptedCard(null)}
                  className={`bg-[#0D1B2A]/40 border rounded-sm p-6 flex flex-col justify-between min-h-[420px] relative overflow-hidden transition-all duration-500 ${
                    isDecrypted ? "border-[#C9A84C] shadow-[0_0_25px_rgba(201,168,76,0.15)] -translate-y-2" : "border-white/10"
                  }`}
                >
                  {/* Subtle classified grid pattern inside cards */}
                  <div className="absolute inset-0 pointer-events-none bg-grid opacity-[0.02]" />

                  {/* Top Header */}
                  <div>
                    {/* Visual Image Header */}
                    <div className="relative w-full h-40 rounded-sm overflow-hidden mb-5 border border-white/5 group">
                      <Image
                        src={m.image}
                        alt={m.title}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          isDecrypted ? "scale-105 grayscale-0 brightness-90" : "grayscale saturate-[0.1] brightness-[0.7]"
                        }`}
                      />
                      {/* Glowing scanning HUD lines */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-transparent to-transparent z-10" />
                      
                      {/* Visual Overlay Tag */}
                      <div className="absolute bottom-3 left-3 bg-[#07080F]/90 border border-[#C9A84C]/30 text-[#C9A84C] font-mono text-[7px] tracking-widest px-2 py-0.5 rounded-sm">
                        INTEL FILE // CRYPT-0{idx+1}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="font-stats text-[9px] uppercase tracking-widest text-[#C9A84C] font-black">
                        {m.subtitle}
                      </span>
                      <span className={`h-2 w-2 rounded-full ${isDecrypted ? "bg-[#C9A84C] animate-ping" : "bg-[#C41E3A]"}`} />
                    </div>

                    <h3 className="font-sans font-extrabold text-xl md:text-2xl text-stadium-white mb-4 group-hover:text-[#C9A84C] transition-colors leading-tight">
                      {m.title}
                    </h3>

                    {/* Paragraph - Content Protocol compliant paragraph structures (3 sentences min) */}
                    <p className="font-sans text-stadium-white/70 text-xs md:text-sm leading-relaxed mb-6">
                      {m.teaser}
                    </p>
                  </div>

                  {/* Bottom Decrypt/Access CTA */}
                  <div className="pt-4 border-t border-white/5 flex justify-end">
                    <Link
                      href={m.slug ? `/story/${m.slug}` : "/locker-room"}
                      className={`w-full text-center py-2.5 border text-[10px] font-stats font-bold uppercase tracking-widest transition-all duration-300 rounded-sm ${
                        isDecrypted
                          ? "bg-[#C9A84C] border-[#C9A84C] text-[#07080F] shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                          : "border-white/20 text-[#B0B8C8] bg-transparent"
                      }`}
                    >
                      {isDecrypted ? "[ DECRYPT CLASSIFIED SECRETS // रहस्य हेर्नुहोस् ]" : "[ COLD STORAGE WAITING // डिक्रिप्ट गर्नुहोस् ]"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
