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
      {/* 1. Cinematic Hero with live strip */}
      <HeroSection />

      {/* 2. Mandatory Editorial Guard */}
      <ScrollReveal direction="down" delay={0}>
        <MatchPulse />
      </ScrollReveal>

      {/* 3. The Lead Story */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '80px 0 0 0'
      }} />

      <ScrollReveal direction="up" delay={0}>
        <LeadStory
          image="/images/balen_profile.jpg"
          quote="काठमाडौंको हिरो बन्नका लागि, उनले पहिले आफैलाई मेटाउनु पर्यो।"
          name="बालेन्द्र शाह"
          attribution="र्यापर। इन्जिनियर। मेयर। प्रधानमन्त्री-मनोनीत।"
          ctaText="पूरा कथा पढ्नुस् →"
          ctaHref="/balen-shah"
        />
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
