import HeroSection from "@/components/home/HeroSection";
import LeadStory from "@/components/home/LeadStory";
import MatchPulse from "@/components/home/MatchPulse";
import StoriesGrid from "@/components/home/StoriesGrid";
import Voices from "@/components/home/Voices";
import StorytellingHub from "@/components/home/StorytellingHub";
import FanSpotlight from "@/components/home/FanSpotlight";
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Home() {
  return (
    <div className="w-full bg-[#07080F]">
      {/* 1. Balen Shah Takeover — Full-screen hero */}
      <LeadStory
        image="/images/balen_profile.jpg"
        quote="तहखानाको र्‍यापर। देशको प्रधानमन्त्री।"
        name="बालेन्द्र शाह"
        attribution="नेपालको ४० औं प्रधानमन्त्री। पहिलो मधेशी। सबैभन्दा कान्छो।"
        ctaText="पूरा कथा पढ्नुस् →"
        ctaHref="/balen-shah"
      />

      {/* 2. Cinematic Cricket Hero */}
      <HeroSection />

      {/* 3. Editorial Guard */}
      <ScrollReveal direction="down" delay={0}>
        <MatchPulse />
      </ScrollReveal>

      {/* 4. The Magazine Grid */}
      <ScrollReveal direction="up" delay={0.05}>
        <StoriesGrid />
      </ScrollReveal>

      {/* 5. Voices (Horizontal Scroll) */}
      <ScrollReveal direction="left" delay={0}>
        <Voices />
      </ScrollReveal>

      {/* 6. Locker Room */}
      <ScrollReveal direction="up" delay={0}>
        <StorytellingHub />
      </ScrollReveal>

      {/* 7. Premium Fan Photography Grid */}
      <ScrollReveal direction="up" delay={0.05}>
        <FanSpotlight />
      </ScrollReveal>

      {/* 8. Closing Mantra */}
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
