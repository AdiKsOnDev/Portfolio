import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { WorkSection } from '@/components/WorkSection'
import { PublicationsSection } from '@/components/PublicationsSection'
import { ContactSection } from '@/components/ContactSection'
import { ParallaxBackground } from '@/components/ParallaxBackground'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Greek Letters Parallax Background - positioned behind all content */}
      <ParallaxBackground />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-background focus:rounded"
      >
        Skip to main content
      </a>

      {/* Main page structure with semantic HTML5 and ARIA landmarks */}
      <main id="main-content" aria-label="Portfolio content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <PublicationsSection />
        <ContactSection />
      </main>
    </div>
  )
}
