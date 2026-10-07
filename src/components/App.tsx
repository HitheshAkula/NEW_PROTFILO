import { ACHIEVEMENTS, CERTIFICATIONS, EDUCATION, NAV, PROFILE, PROJECTS, SKILLS, SKILL_GROUPS } from '@/lib/data';
import { LenisProvider } from '@/lib/scroll';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/hero/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export function App() {
  return (
    <div className="page-shell">
      <LenisProvider />
      <RevealObserver />
      <Navigation />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <CertificationsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </div>
  );
}