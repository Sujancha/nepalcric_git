import HeroSection from "@/components/home/HeroSection";
import RhinoCommandCenter from "@/components/home/RhinoCommandCenter";
import LeadStory from "@/components/home/LeadStory";
import MatchPulse from "@/components/home/MatchPulse";
import StoriesGrid from "@/components/home/StoriesGrid";
import Voices from "@/components/home/Voices";
import StorytellingHub from "@/components/home/StorytellingHub";
import FanSpotlight from "@/components/home/FanSpotlight";
import StrategicPortals from "@/components/home/StrategicPortals";
import ScrollReveal from '@/components/ui/ScrollReveal';
import DocuBridge from "@/components/ui/DocuBridge";
import fs from "fs";
import path from "path";

export default function Home() {
  const scoreboardPath = path.join(process.cwd(), "content", "pages", "scoreboard.json");
  const scoreboardData = JSON.parse(fs.readFileSync(scoreboardPath, "utf8"));

  const lockerRoomPath = path.join(process.cwd(), "content", "pages", "locker-room.json");
  const lockerRoomData = JSON.parse(fs.readFileSync(lockerRoomPath, "utf8"));

  return (
    <div className="w-full bg-[#07080F]">
      {/* 1. Balen Shah Takeover — Full-screen hero */}
      <LeadStory
        image="/images/balen_profile.jpg"
        quote="त्यो रात जब सिंहदरबार थर्कियो: र्‍याप संगीतको तहखानादेखि सिंहदरबारको सिंहासनसम्म बालेन्द्र शाहको गुप्त कूटनीति"
        name="बालेन्द्र शाह"
        attribution="नेपालको ४० औं प्रधानमन्त्री। पहिलो मधेशी। सबैभन्दा कान्छो।"
        description="नेपालको राजनीतिक र सामाजिक इतिहासमा यस्तो रोमाञ्चक मोड पहिले कहिल्यै आएको थिएन। र्‍यापरदेखि काठमाडौंको मेयर हुँदै सिंहदरबारको शक्ति केन्द्रसम्मको यो अनौठो यात्रा कसरी सम्भव भयो? सिंहदरबारको बन्द कोठाभित्र रंगशाला निर्माणको लागि रचिएको त्यो गुप्त कूटनीति र रंगशालाको सपनाको वास्तविक रहस्य खोल्दै..."
        ctaText="पूरा कथा पढ्नुस् →"
        ctaHref="/balen-shah"
      />

      {/* Docu-Bridge 1: Balen Shah -> Dallas 1-Run Drama */}
      <DocuBridge
        index="०१"
        text="काठमाडौँको सडकदेखि सिंहदरबारसम्म रंगशालाको सपना त जाग्यो, तर नेपाली क्रिकेटको वास्तविक परीक्षा डलासको त्यो क्रुर र तातो मैदानमा हुँदै थियो, जहाँ केवल एक रनले इतिहासको दिशा परिवर्तन गरिदियो..."
      />

      {/* 2. Cinematic Cricket Hero */}
      <HeroSection scoreboardData={scoreboardData} />

      {/* Docu-Bridge 2: Dallas Drama -> MatchPulse (Live Action & Countdown) */}
      <DocuBridge
        index="०२"
        text="डलासको त्यो पीडादायी एक रन इतिहास बनिसक्यो, तर समय कहिल्यै रोकिँदैन। अर्को महाभिठन्तको घडी नजिकिँदै छ, र रणमैदान फेरि तात्ने तरखरमा छ..."
      />

      {/* 3. MatchPulse (Live Match / Countdown) */}
      <ScrollReveal direction="down" delay={0}>
        <MatchPulse scoreboardData={scoreboardData} />
      </ScrollReveal>

      {/* Docu-Bridge 3: MatchPulse -> Rhino Command Center (Tactical Headquarters) */}
      <DocuBridge
        index="०३"
        text="जब युद्धको घडी नजिकिन्छ, भावनाले मात्र पुग्दैन। हामीले रणनीतिक मुख्यालयभित्र पसेर योद्धाहरूको क्षमता र भिडन्तको कूटनीति बुझ्नुपर्छ..."
      />

      {/* 4. Rhino command center tactical battle station */}
      <ScrollReveal direction="up" delay={0.1}>
        <RhinoCommandCenter />
      </ScrollReveal>

      {/* Docu-Bridge 4: Rhino Command Center -> StoriesGrid (Dressing Room Chronicles) */}
      <DocuBridge
        index="०४"
        text="तथ्याङ्क र रणनीतिक गेजहरूले त केवल खेलको बाहिरी रूप देखाउँछन्। तर खेलाडीहरूको वास्तविक चरित्र ती बन्द कोठाभित्रको संघर्ष र रगतले लेखेको हुन्छ..."
      />

      {/* 5. The Magazine Grid */}
      <ScrollReveal direction="up" delay={0.05}>
        <StoriesGrid />
      </ScrollReveal>

      {/* Docu-Bridge 5: StoriesGrid -> Voices (Warrior Testimonials Spotlight) */}
      <DocuBridge
        index="०५"
        text="ड्रेसिङ रुमका ती वर्गीकृत रहस्यहरू खोल्न, हामीले प्रत्यक्ष रूपमा ती योद्धाहरूको साक्षी र कमाण्डरहरूको आवाज सुन्नुपर्छ जो मैदानको आगोमा उभिएका थिए..."
      />

      {/* 6. Voices (Spotlight Tactical Attributes Terminal) */}
      <ScrollReveal direction="left" delay={0}>
        <Voices standings={scoreboardData.standings || []} />
      </ScrollReveal>

      {/* Docu-Bridge 6: Voices -> StorytellingHub (Locker Room Film Archives) */}
      <DocuBridge
        index="०६"
        text="योद्धाहरूको साक्षी त प्रमाण मात्र हो, तर नेपाली क्रिकेटका ती महान् र निर्णायक पलहरूको पूर्ण इतिहास लकर रुमका ती पुराना र सुरक्षित फिल्म रिलहरूमा लुकेको छ..."
      />

      {/* 7. Locker Room */}
      <ScrollReveal direction="up" delay={0}>
        <StorytellingHub stories={lockerRoomData.stories} />
      </ScrollReveal>

      {/* Docu-Bridge 7: StorytellingHub -> Fan Spotlight (Witness Evidence corkboard) */}
      <DocuBridge
        index="०७"
        text="खेलाडीहरूको यो इतिहास अपूर्ण छ, यदि हामीले त्यो शक्तिलाई हेरेनौं जसले तिनीहरूलाई काँधमा बोक्यो। बिहान ४ बजेदेखि लाइनमा उभिएर देशको धड्कन बनेका १२औं गैँडाहरूका साक्षी प्रमाणहरू..."
      />

      {/* 8. Premium Fan Photography Grid */}
      <ScrollReveal direction="up" delay={0.05}>
        <FanSpotlight />
      </ScrollReveal>

      {/* Docu-Bridge 8: Fan Spotlight -> Strategic Bento Portals */}
      <DocuBridge
        index="०८"
        text="सबै प्रमाणहरू सङ्कलन भइसके, वर्गीकरण पूरा भयो। अब यो अभियानको पूर्ण रणनीतिक नक्सा तपाईंको अगाडि छ। आफ्नो बाटो रोज्नुहोस् र यो रहस्यको गहिराइमा पस्नुहोस्..."
      />

      {/* 9. Strategic campaign map navigation bento grid */}
      <ScrollReveal direction="up" delay={0.05}>
        <StrategicPortals />
      </ScrollReveal>

      {/* 10. Closing Mantra */}
      <ScrollReveal direction="up" delay={0.1}>
        <div style={{
          width: '100%',
          padding: '60px 0 80px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'transparent'
        }}>
          <p style={{
            fontFamily: 'Mukta, sans-serif',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0',
            textAlign: 'center',
            margin: '0',
            padding: '0 24px'
          }}>
            यो खेल सकिँदैन — यो खेल सधैं जारी छ।
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
