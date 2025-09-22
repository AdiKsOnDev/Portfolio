'use client'

import { useEffect, useState } from 'react'

/**
 * HeroSection - Enhanced landing section with full viewport height and animations
 *
 * Features a full-height hero section with centered content including name/title,
 * description, and a CSS-animated scroll indicator. Uses modern viewport units
 * for mobile compatibility and implements semantic HTML5 structure with ARIA labels.
 *
 * Key enhancements:
 * - Full viewport height with mobile browser compatibility (100dvh)
 * - CSS-only animations for performance
 * - Proper semantic structure with heading hierarchy
 * - Smooth scroll indicator with continuous animation
 * - Entrance animations with staggered timing
 *
 * @returns JSX element containing the enhanced hero section
 */
export function HeroSection() {
  // Prevent hydration mismatches by ensuring component only renders on client
  // This avoids SSR/client differences for dynamic content like animations
  // and ensures consistent rendering across server and client environments
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Return null during SSR to prevent hydration mismatches
  // Component will re-render on client with mounted=true
  if (!mounted) {
    return null
  }

  const handleScrollClick = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-section" aria-label="Hero section with introduction">
      {/* Hero Content with entrance animations */}
      <div className="container hero-content">
        <h1
          className="hero-title text-accent font-bold mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}
        >
          Adil Afzal
        </h1>

        <p
          className="hero-subtitle text-foreground mb-8 max-w-2xl mx-auto"
          style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            lineHeight: '1.5',
            fontWeight: '400',
          }}
        >
          Software Engineer & Creative Problem Solver
        </p>

        <p
          className="text-foreground max-w-xl mx-auto"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: '1.6',
            opacity: '0.8',
          }}
        >
          Building digital experiences with modern technologies and thoughtful design
        </p>
      </div>

      {/* Enhanced CSS-only scroll indicator */}
      <div
        className="scroll-indicator"
        onClick={handleScrollClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleScrollClick()
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Scroll to next section"
      >
        <div className="scroll-indicator-container">
          <div className="scroll-indicator-dot"></div>
        </div>
      </div>
    </section>
  )
}
