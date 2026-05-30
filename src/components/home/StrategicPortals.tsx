"use client";

import Link from "next/link";
import Image from "next/image";

interface PortalCard {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  tag: string;
}

export default function StrategicPortals() {
  const portals: PortalCard[] = [
    {
      title: "योद्धा दल",
      subtitle: "THE GLORIOUS SQUAD // CLASSIFIED ROSTER",
      description: "नेपालका सर्वश्रेष्ठ क्रिकेट योद्धाहरूको सैन्य-शैली वर्गीकरण। रोहित पौडेल, सन्दीप लामिछाने र कुशल भुर्तेल जस्ता खेलाडीहरूको भित्री रणनीतिक विश्लेषण र वर्गीकृत युद्ध विवरण सुरक्षित गर्नुहोस्।",
      href: "/squad",
      image: "/images/players/rohit-paudel/hero.webp",
      tag: "योद्धा प्रोफाइल // ROSTER STATUS"
    },
    {
      title: "खेल इतिहास",
      subtitle: "THE SCOREBOARD CENTRE // TOURNAMENT ARCHIVES",
      description: "नेपाली क्रिकेटको इतिहास बदल्ने ती महान् भिडन्तहरू। टी-ट्वेन्टी विश्वकपदेखि एसिया कपसम्मका ती प्रत्येक बल, विकेट र गौरवशाली ओभरहरूको कडा तथ्याङ्क विवरण र पूर्ण स्कोरबोर्ड अभिलेख।",
      href: "/scoreboard",
      image: "/images/tu_ground.gif",
      tag: "खेल तथ्याङ्क // CORE METRICS"
    },
    {
      title: "स्टोरी लकर",
      subtitle: "THE LOCKER ROOM // SECRET REELS & TALES",
      description: "मैदानबाहिर ड्रेसिङ रुमका बन्द कोठाहरूमा रचिएका गुप्त योजनाहरू। जब ३०,००० दर्शकको आँखा र टिभी क्यामेरा बन्द हुन्छन्, तब सुरु हुने खेलाडीहरूको वास्तविक संघर्ष र नलेखिएका कथाहरू।",
      href: "/locker-room",
      image: "/images/monty.jpg",
      tag: "तहखाना रहस्य // VAULT ACCESS"
    },
    {
      title: "फ्यान जोन हब",
      subtitle: "THE FAN ZONE // 12TH RHINO OPERATIONS",
      description: "१२औं गैंडाको सामूहिक विष्फोटक उर्जा। लाइभ खेल सिमुलेशन, रणनीतिक पोलहरूमा मतदान र रंगशालामा ३०,००० दर्शकको आँखाले देखेका पलहरूको अविश्वसनीय प्रमाण संकलन।",
      href: "/fanzone",
      image: "/images/players/sandeep-lamichhane/hero.webp",
      tag: "कम्युनिटी पोल // FAN STATISTICS"
    }
  ];

  return (
    <section className="w-full bg-[#07080F] py-24 relative border-t border-white/5 overflow-hidden">
      {/* Visual cybernetic guidelines overlay */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C41E3A]/45 to-transparent z-10 animate-pulse" />
      <div className="absolute inset-y-0 left-12 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block z-0" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hook Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="h-[2px] w-8 bg-[#C9A84C] animate-pulse shadow-[0_0_8px_#C9A84C]" />
          <span className="font-stats font-bold text-[#C9A84C] uppercase tracking-[0.25em] text-xs">
            रणनीतिक मार्गहरू // CAMPAIGN PORTAL NETWORK
          </span>
        </div>

        {/* 4-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((p, idx) => (
            <Link
              key={idx}
              href={p.href}
              className="group relative rounded-sm overflow-hidden border border-white/10 bg-[#0D1B2A]/30 flex flex-col justify-between min-h-[380px] transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A84C]/50 hover:shadow-[0_20px_50px_rgba(201,168,76,0.15)] cursor-pointer"
            >
              {/* Background desaturated action-shot image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover grayscale saturate-[0.1] brightness-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500" />
              </div>

              {/* Top Section */}
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#C9A84C] px-2 py-0.5 border border-[#C9A84C]/30 bg-black/60 backdrop-blur-sm rounded-sm">
                    {p.tag}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C41E3A] animate-ping" />
                </div>

                <h3 className="font-sans font-black text-2xl text-stadium-white leading-tight group-hover:text-[#C9A84C] transition-colors mb-3">
                  {p.title}
                </h3>
                <span className="font-stats font-semibold text-[#C41E3A] text-[9px] uppercase tracking-widest block mb-4">
                  {p.subtitle.split(" // ")[0]}
                </span>
                
                {/* Description complying with Content Protocol proper paragraphs (3 sentences) */}
                <p className="font-sans text-[#B0B8C8]/80 text-xs md:text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Bottom Action CTA Link */}
              <div className="p-6 pt-0 relative z-10">
                <div className="w-full text-center py-3 border border-white/10 text-[10px] font-stats font-bold uppercase tracking-widest bg-black/40 group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] group-hover:text-[#07080F] transition-all duration-300 rounded-sm">
                  [ SECURE ACCESS PATH // प्रवेश गर्नुहोस् ] ↗
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
