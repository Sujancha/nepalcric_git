"use client";

import { useState, useEffect } from "react";
import { Shield, Zap, RefreshCw, Trophy, AlertTriangle, CheckCircle, Flame } from "lucide-react";

interface TeamRow {
  rank: number;
  name: string;
  nameEn: string;
  flag: string;
  played: number;
  won: number;
  lost: number;
  nr: number;
  pts: number;
  nrr: number;
  isNepal?: boolean;
}

interface Fixture {
  id: number;
  opponent: string;
  opponentEn: string;
  opponentFlag: string;
  date: string;
}

interface VoicesProps {
  standings?: TeamRow[];
}

export default function Voices({ standings: initialSimStandings }: VoicesProps) {
  const fallbackStandings: TeamRow[] = [
    { rank: 1, name: "अमेरिका", nameEn: "USA", flag: "🇺🇸", played: 28, won: 19, lost: 9, nr: 0, pts: 38, nrr: 0.762 },
    { rank: 2, name: "स्कटल्याण्ड", nameEn: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", played: 32, won: 16, lost: 10, nr: 6, pts: 38, nrr: 0.631 },
    { rank: 3, name: "ओमान", nameEn: "Oman", flag: "🇴🇲", played: 28, won: 14, lost: 11, nr: 3, pts: 31, nrr: 0.018 },
    { rank: 4, name: "नेदरल्याण्ड्स", nameEn: "Netherlands", flag: "🇳🇱", played: 24, won: 13, lost: 9, nr: 2, pts: 28, nrr: 0.165 },
    { rank: 5, name: "नेपाल", nameEn: "Nepal", flag: "🇳🇵", played: 28, won: 11, lost: 15, nr: 2, pts: 24, nrr: 0.023, isNepal: true },
    { rank: 6, name: "नामिबिया", nameEn: "Namibia", flag: "🇳🇦", played: 28, won: 10, lost: 16, nr: 2, pts: 22, nrr: -0.491 },
    { rank: 7, name: "क्यानडा", nameEn: "Canada", flag: "🇨🇦", played: 24, won: 9, lost: 12, nr: 3, pts: 21, nrr: -0.209 },
    { rank: 8, name: "युएई", nameEn: "UAE", flag: "🇦🇪", played: 24, won: 7, lost: 17, nr: 0, pts: 14, nrr: -1.016 },
  ];

  const initialStandings = initialSimStandings && initialSimStandings.length > 0 ? initialSimStandings : fallbackStandings;

  const fixtures: Fixture[] = [
    { id: 1, opponent: "नामिबिया", opponentEn: "Namibia", opponentFlag: "🇳🇦", date: "खेल १ - २१ जुलाई २०२६" },
    { id: 2, opponent: "नेदरल्याण्ड्स", opponentEn: "Netherlands", opponentFlag: "🇳🇱", date: "खेल २ - २३ जुलाई २०२६" },
    { id: 3, opponent: "नामिबिया", opponentEn: "Namibia", opponentFlag: "🇳🇦", date: "खेल ३ - २७ जुलाई २०२६" },
    { id: 4, opponent: "नेदरल्याण्ड्स", opponentEn: "Netherlands", opponentFlag: "🇳🇱", date: "खेल ४ - २९ जुलाई २०२६" },
  ];

  const [standings, setStandings] = useState<TeamRow[]>(initialStandings);
  const [results, setResults] = useState<{ [key: number]: "win" | "loss" | null }>({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [nepalStatus, setNepalStatus] = useState<{
    rank: number;
    status: "direct" | "playoff" | "critical";
    message: string;
    probability: number; // calculated percentage
  }>({
    rank: 5,
    status: "critical",
    message: "नेपाल हाल पाँचौं स्थानमा छ। सिमुलेसन सुरु गर्न आगामी खेलहरूको नतिजा चयन गर्नुस्।",
    probability: 30,
  });

  // Calculate and sort standings on results change
  useEffect(() => {
    let newStandings = initialStandings.map((t) => ({ ...t }));
    let winsCount = 0;
    let gamesSimulated = 0;

    fixtures.forEach((fix) => {
      const outcome = results[fix.id];
      if (outcome) {
        gamesSimulated += 1;
        const nepalIdx = newStandings.findIndex((t) => t.isNepal);
        const oppIdx = newStandings.findIndex((t) => t.nameEn === fix.opponentEn);

        if (nepalIdx !== -1 && oppIdx !== -1) {
          newStandings[nepalIdx].played += 1;
          newStandings[oppIdx].played += 1;

          if (outcome === "win") {
            winsCount += 1;
            newStandings[nepalIdx].won += 1;
            newStandings[nepalIdx].pts += 2;
            newStandings[nepalIdx].nrr += 0.15; // Simulated NRR boost

            newStandings[oppIdx].lost += 1;
            newStandings[oppIdx].nrr -= 0.15;
          } else {
            newStandings[oppIdx].won += 1;
            newStandings[oppIdx].pts += 2;
            newStandings[oppIdx].nrr += 0.15;

            newStandings[nepalIdx].lost += 1;
            newStandings[nepalIdx].nrr -= 0.15;
          }
        }
      }
    });

    // Sort by Points, then by NRR
    newStandings.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      return b.nrr - a.nrr;
    });

    // Update ranks
    newStandings = newStandings.map((t, idx) => ({ ...t, rank: idx + 1 }));
    setStandings(newStandings);

    // Calculate Nepal's Status
    const finalNepal = newStandings.find((t) => t.isNepal);
    if (finalNepal) {
      const rank = finalNepal.rank;
      let status: "direct" | "playoff" | "critical" = "critical";
      let message = "";
      
      // Calculate dynamic qualification probability
      let probability = 30; // base probability
      if (gamesSimulated > 0) {
        if (winsCount === 4) probability = 100;
        else if (winsCount === 3) probability = 80;
        else if (winsCount === 2) probability = 55;
        else if (winsCount === 1) probability = 30;
        else probability = 10;
      }

      if (gamesSimulated === 0) {
        status = "critical";
        message = "नेपाल हाल पाँचौं स्थानमा छ। सिमुलेसन सुरु गर्न आगामी खेलहरूको नतिजा चयन गर्नुस्।";
      } else if (rank <= 3) {
        status = "direct";
        message = `नेपाल ${rank}औं स्थानमा रहँदै आईसीसी एकदिवसीय विश्वकप छनोटमा सिधै प्रवेश गर्ने समीकरण सुरक्षित गर्यो!`;
      } else if (rank === 4 || rank === 5) {
        status = "playoff";
        message = `नेपाल ${rank}औं स्थानमा रहँदै विश्वकप छनोटका लागि कठिन प्ले-अफ क्वालिफायर चरण खेल्नुपर्नेछ।`;
      } else {
        status = "critical";
        message = `जोखिमपूर्ण अवस्था! नेपाल ${rank}औं स्थानमा रहँदै प्रत्यक्ष छनोटबाट बाहिरिएको छ। ओडीआई मान्यता समेत जोखिममा पर्न सक्छ।`;
      }

      setNepalStatus({ rank, status, message, probability });
    }
  }, [results]);

  const handleOutcome = (fixtureId: number, outcome: "win" | "loss") => {
    setResults((prev) => ({
      ...prev,
      [fixtureId]: prev[fixtureId] === outcome ? null : outcome,
    }));
  };

  const handleReset = () => {
    setResults({ 1: null, 2: null, 3: null, 4: null });
  };

  // SVG parameters for circular probability progress ring
  const radius = 50;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (nepalStatus.probability / 100) * circumference;

  return (
    <section className="py-24 bg-[#07080F] relative overflow-hidden border-b border-white/5 font-sans select-none">
      
      {/* Background glowing gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#C41E3A]/5 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#C9A84C]/5 filter blur-[120px] pointer-events-none" />

      {/* Modern, high-end fine background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(#ffffff 1px, transparent 0)`,
        backgroundSize: "36px 36px"
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Advanced Section Header Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 border-b border-white/5 pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-10 bg-[#C9A84C] animate-pulse" />
              <span className="font-stats font-bold text-[#C9A84C] uppercase tracking-[0.25em] text-[10px]">
                रणनीतिक अङ्क विश्लेषण // LEAGUE-2 TACTICAL SIMULATOR
              </span>
            </div>
            <h2 className="font-display uppercase text-5xl md:text-6xl text-stadium-white leading-none">
              हाम्रो बाटो, हाम्रो गणित: <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C41E3A] via-[#C9A84C] to-[#ffe28a] drop-shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                विश्वकप छनोट सिमुलेटर
              </span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-[#B0B8C8] text-sm md:text-base leading-relaxed">
              आईसीसी विश्वकप लिग-२ (League 2) को शीर्ष ३ टोली सिधै विश्वकप छनोटमा पुग्नेछन्। नेपालको आगामी जुलाई २०२६ मा हुने ४ मुख्य खेलहरू सिमुलेट गर्नुस् र छनोटको समीकरण प्रत्यक्ष अनुभव गर्नुस्।
            </p>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Live Interactive Standings Board (7 Columns) */}
          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-lg p-6 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden group">
            
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />

            <div>
              {/* Telemetry Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-[#C9A84C] drop-shadow-[0_0_6px_rgba(201,168,76,0.4)]" />
                  <span className="font-stats font-bold text-[10px] text-stadium-white uppercase tracking-widest">
                    आईसीसी लिग-२ वर्तमान अङ्क तालिका // STANDINGS
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#10B981] flex items-center gap-1 bg-[#10B981]/5 px-2 py-0.5 rounded-sm border border-[#10B981]/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  DYNAMIC ENGINE
                </span>
              </div>

              {/* Points Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left font-mono text-xs text-[#B0B8C8] border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[9px] text-[#6B7280] uppercase tracking-widest font-bold">
                      <th className="py-3 px-2 text-center w-10">Rank</th>
                      <th className="py-3 px-3">Team</th>
                      <th className="py-3 px-2 text-center w-12">Played</th>
                      <th className="py-3 px-2 text-center w-12">Won</th>
                      <th className="py-3 px-2 text-center w-12">Lost</th>
                      <th className="py-3 px-2 text-center w-16 text-[#C9A84C]">Points</th>
                      <th className="py-3 px-2 text-center w-16">NRR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team) => {
                      const isNepal = team.isNepal;
                      const inTop3 = team.rank <= 3;
                      
                      let rowBg = "hover:bg-white/[0.015]";
                      let borderStyle = "border-b border-white/5";
                      let nepalGlow = "";

                      if (isNepal) {
                        rowBg = "bg-[#C41E3A]/5 hover:bg-[#C41E3A]/8 border-y border-[#C41E3A]/45";
                        nepalGlow = "relative shadow-[0_0_15px_rgba(196,30,58,0.1)]";
                      }

                      return (
                        <tr key={team.nameEn} className={`transition-all duration-300 ${rowBg} ${borderStyle} ${nepalGlow}`}>
                          
                          {/* Rank with stylized badges */}
                          <td className="py-3.5 px-2 text-center font-bold">
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-sm text-[10px] transition-all duration-300 ${
                              inTop3 
                                ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/40 font-black shadow-[0_0_8px_rgba(201,168,76,0.15)]" 
                                : isNepal 
                                  ? "bg-[#C41E3A]/20 text-[#C41E3A] border border-[#C41E3A]/60 font-black"
                                  : "text-[#6B7280] border border-white/5"
                            }`}>
                              {team.rank}
                            </span>
                          </td>

                          {/* Flag + Team Name */}
                          <td className="py-3.5 px-3 font-sans font-bold text-stadium-white flex items-center gap-2">
                            <span className="text-base select-none">{team.flag}</span>
                            <span className={`${isNepal ? "text-[#C9A84C] drop-shadow-[0_0_10px_rgba(201,168,76,0.2)]" : "text-stadium-white"}`}>
                              {team.name}
                            </span>
                            <span className="text-[8.5px] font-mono text-[#6B7280] font-normal uppercase tracking-widest">{team.nameEn}</span>
                            
                            {inTop3 && (
                              <span className="text-[7px] font-mono text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/30 px-1 py-0.5 rounded-sm uppercase tracking-widest font-bold">
                                DIRECT
                              </span>
                            )}
                          </td>

                          {/* Played */}
                          <td className="py-3.5 px-2 text-center text-stadium-white/80">{team.played}</td>
                          
                          {/* Won */}
                          <td className="py-3.5 px-2 text-center text-[#10B981] font-semibold">{team.won}</td>
                          
                          {/* Lost */}
                          <td className="py-3.5 px-2 text-center text-[#C41E3A]/70">{team.lost}</td>
                          
                          {/* Points with neon color */}
                          <td className="py-3.5 px-2 text-center font-black text-[#C9A84C] text-sm drop-shadow-[0_0_6px_rgba(201,168,76,0.15)]">
                            {team.pts}
                          </td>
                          
                          {/* Net Run Rate */}
                          <td className={`py-3.5 px-2 text-center font-bold ${team.nrr >= 0 ? "text-[#10B981]" : "text-[#C41E3A]"}`}>
                            {team.nrr >= 0 ? `+${team.nrr.toFixed(2)}` : team.nrr.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Threshold marker note */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <p className="font-sans text-[10px] text-[#6B7280] leading-relaxed max-w-lg">
                * शीर्ष ३ टोलीहरू आईसीसी पुरुष क्रिकेट विश्वकप क्वालिफायर (ODI World Cup Qualifier) मा प्रवेश गर्छन्। बाँकी टोलीहरू प्ले-अपको दोस्रो कठिन चक्रमा पठाइन्छन्।
              </p>
              <div className="flex items-center gap-2 text-[9px] font-mono font-bold text-[#C9A84C] bg-[#C9A84C]/5 px-3 py-1.5 border border-[#C9A84C]/20 rounded-sm">
                <span>QUALIFICATION MARKS: RANK 1 - 3</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Simulator & Dynamic Visual Outcome telemetry (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Visual Probability Circular Ring Gauges */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between group min-h-[220px]">
              
              <div className="flex justify-between items-start gap-4">
                <div className="max-w-[180px]">
                  <span className="font-stats text-[9px] text-[#B0B8C8]/60 uppercase tracking-widest block mb-2">
                    छनोट विश्लेषण // TELEMETRY
                  </span>
                  
                  {/* Status Headline */}
                  <div className="flex items-center gap-2 mb-2">
                    {nepalStatus.status === "direct" && <CheckCircle className="w-5 h-5 text-[#C9A84C] drop-shadow-[0_0_6px_#C9A84C]" />}
                    {nepalStatus.status === "playoff" && <Zap className="w-5 h-5 text-[#3B82F6] drop-shadow-[0_0_6px_#3B82F6]" />}
                    {nepalStatus.status === "critical" && <AlertTriangle className="w-5 h-5 text-[#C41E3A] drop-shadow-[0_0_6px_#C41E3A]" />}
                    
                    <h3 className={`font-sans font-black text-lg uppercase tracking-wide ${
                      nepalStatus.status === "direct" ? "text-[#C9A84C]" : nepalStatus.status === "playoff" ? "text-[#3B82F6]" : "text-[#C41E3A]"
                    }`}>
                      {nepalStatus.status === "direct" && "प्रत्यक्ष छनोट!"}
                      {nepalStatus.status === "playoff" && "प्ले-अफ रेखा"}
                      {nepalStatus.status === "critical" && "खतराको क्षेत्र"}
                    </h3>
                  </div>

                  <p className="font-sans font-bold text-stadium-white text-xs md:text-sm leading-relaxed">
                    {nepalStatus.message}
                  </p>
                </div>

                {/* Animated Circular Gauge Meter */}
                <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background grey ring */}
                    <circle
                      className="text-white/[0.04]"
                      strokeWidth={stroke}
                      stroke="currentColor"
                      fill="transparent"
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                    {/* Active colored ring */}
                    <circle
                      className={`transition-all duration-[800ms] ease-out ${
                        nepalStatus.status === "direct" 
                          ? "text-[#C9A84C] drop-shadow-[0_0_8px_#C9A84C]" 
                          : nepalStatus.status === "playoff" 
                            ? "text-[#3B82F6] drop-shadow-[0_0_8px_#3B82F6]" 
                            : "text-[#C41E3A] drop-shadow-[0_0_8px_#C41E3A]"
                      }`}
                      strokeWidth={stroke}
                      strokeDasharray={circumference + " " + circumference}
                      style={{ strokeDashoffset }}
                      strokeLinecap="round"
                      fill="transparent"
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                  </svg>
                  {/* Absolute centered percentage text */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-display text-2xl text-stadium-white leading-none">
                      {nepalStatus.probability}%
                    </span>
                    <span className="font-stats text-[7px] text-[#6B7280] uppercase tracking-wider mt-1">
                      PROBABILITY
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Level bar */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[8px] text-[#6B7280] uppercase tracking-widest">
                  QUALIFICATION PROBABILITY GAUGE
                </span>
                <span className={`font-mono text-[8px] font-bold ${
                  nepalStatus.status === "direct" ? "text-[#C9A84C]" : nepalStatus.status === "playoff" ? "text-[#3B82F6]" : "text-[#C41E3A]"
                }`}>
                  RANK {nepalStatus.rank} / 8
                </span>
              </div>

            </div>

            {/* Fixture Simulates console card */}
            <div className="bg-black/40 border border-white/10 rounded-lg p-6 shadow-md backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group">
              <div>
                {/* Controller header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-5">
                  <span className="font-stats font-bold text-[9px] text-[#C9A84C] uppercase tracking-widest">
                    [ खेल परिणाम सिमुलेटर // MATCH SIMULATOR ]
                  </span>
                  
                  {/* Reset outcome triggers */}
                  {Object.values(results).some(v => v !== null) && (
                    <button
                      onClick={handleReset}
                      className="font-mono text-[8px] text-[#C41E3A] uppercase tracking-widest border border-[#C41E3A]/30 bg-[#C41E3A]/5 hover:bg-[#C41E3A] hover:text-stadium-white px-2.5 py-1 rounded-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-bold"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      RESET OPTIONS
                    </button>
                  )}
                </div>

                {/* Fixtures list items */}
                <div className="flex flex-col gap-4">
                  {fixtures.map((fix) => {
                    const result = results[fix.id];
                    return (
                      <div key={fix.id} className="border border-white/5 bg-black/40 p-4 rounded-sm hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-mono text-[8px] text-[#6B7280] uppercase tracking-widest font-bold">
                            {fix.date}
                          </span>
                          <span className="text-sm select-none">{fix.opponentFlag}</span>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                          <span className="font-sans font-black text-stadium-white text-xs md:text-sm">
                            नेपाल VS {fix.opponent}
                          </span>

                          {/* Simulation option triggers */}
                          <div className="flex gap-2.5 w-full md:w-auto">
                            <button
                              onClick={() => handleOutcome(fix.id, "win")}
                              className={`flex-1 md:flex-initial py-2 px-3 border rounded-sm font-stats font-bold text-[8.5px] uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                                result === "win"
                                  ? "bg-[#10B981]/15 border-[#10B981] text-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.25)] font-black"
                                  : "bg-transparent border-white/10 text-stadium-white/50 hover:border-white/20 hover:text-stadium-white"
                              }`}
                            >
                              <Trophy className="w-2.5 h-2.5" />
                              WIN
                            </button>
                            
                            <button
                              onClick={() => handleOutcome(fix.id, "loss")}
                              className={`flex-1 md:flex-initial py-2 px-3 border rounded-sm font-stats font-bold text-[8.5px] uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                                result === "loss"
                                  ? "bg-[#C41E3A]/15 border-[#C41E3A] text-[#C41E3A] shadow-[0_0_12px_rgba(196,30,58,0.25)] font-black"
                                  : "bg-transparent border-white/10 text-stadium-white/50 hover:border-white/20 hover:text-stadium-white"
                              }`}
                            >
                              LOSS
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Console Footer */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[8.5px] font-mono text-[#6B7280]">
                <span>CAMPAIGN LOG: LEAGUE-2 ROADMAP</span>
                <span>CALIBRATED // ACTIVE</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
