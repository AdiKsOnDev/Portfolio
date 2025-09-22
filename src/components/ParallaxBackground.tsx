'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * ParallaxBackground - Enhanced Greek Letters Parallax System
 *
 * Creates a stunning visual background with floating Greek letters that move at different
 * speeds during scrolling, creating a multi-layer parallax effect. Now includes a concentrated
 * cluster of symbols at the top for enhanced visual impact. Optimized for performance
 * with requestAnimationFrame and proper cleanup.
 *
 * Features:
 * - Four distinct parallax layers (0.2x, 0.3x, 0.5x, 0.8x scroll speeds)
 * - Concentrated Greek symbol cluster at top 30% of viewport (0.3x speed)
 * - Dynamic Greek letter generation with random positioning and variations
 * - Mixed symbol sizes and opacities for depth and visual hierarchy
 * - Performance optimizations with throttled scroll events
 * - Intersection Observer for efficiency
 * - Reduced motion accessibility support
 * - Responsive design with viewport-based positioning
 */

interface GreekLetter {
  id: string
  character: string
  x: number
  y: number
  size: number
  rotation: number
  layer: number
  opacity: number
  isCluster?: boolean // New property to identify cluster symbols
}

const GREEK_CHARACTERS = [
  'α',
  'β',
  'γ',
  'δ',
  'ε',
  'ζ',
  'η',
  'θ',
  'λ',
  'μ',
  'π',
  'ρ',
  'σ',
  'τ',
  'φ',
  'χ',
  'ψ',
  'ω',
]

// Parallax layer configurations
const PARALLAX_LAYERS = [
  { speed: 0.2, opacity: 0.15, letterCount: 12 }, // Background layer - more letters
  { speed: 0.5, opacity: 0.2, letterCount: 10 }, // Middle layer - more letters
  { speed: 0.8, opacity: 0.25, letterCount: 8 }, // Foreground layer - more letters
]

// Top cluster configuration for concentrated Greek symbols
const TOP_CLUSTER_CONFIG = {
  speed: 0.3, // Medium parallax speed for natural movement
  letterCount: 15, // Higher density for striking visual impact
  maxY: 30, // Constrain to top 30% of viewport
  sizeRange: { min: 24, max: 64 }, // Mix of small to large symbols
  opacityRange: { min: 0.1, max: 0.25 }, // Subtle but visible
}

export function ParallaxBackground() {
  const [letters, setLetters] = useState<GreekLetter[]>([])
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [documentHeight, setDocumentHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const lastScrollTime = useRef<number>(0)

  /**
   * Generate random Greek letters with positioning and styling variations
   * Distributed across the entire document height for full-page coverage
   * Now includes a concentrated cluster at the top for enhanced visual impact
   */
  const generateLetters = useCallback((): GreekLetter[] => {
    const newLetters: GreekLetter[] = []
    const pageHeight = Math.max(
      documentHeight,
      typeof window !== 'undefined' ? window.innerHeight * 3 : 3000
    ) // Ensure minimum coverage
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800

    // Generate regular scattered letters across the page
    PARALLAX_LAYERS.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.letterCount; i++) {
        const letter: GreekLetter = {
          id: `${layerIndex}-${i}`,
          character: GREEK_CHARACTERS[Math.floor(Math.random() * GREEK_CHARACTERS.length)],
          x: Math.random() * 100, // Percentage of viewport width
          y: Math.random() * pageHeight, // Distribute across entire page height
          size: Math.random() * 40 + 60, // 60px to 100px
          rotation: Math.random() * 30 - 15, // -15 to +15 degrees
          layer: layerIndex,
          opacity: layer.opacity,
          isCluster: false,
        }
        newLetters.push(letter)
      }
    })

    // Generate concentrated cluster at the top (hero section area)
    const clusterMaxY = (viewportHeight * TOP_CLUSTER_CONFIG.maxY) / 100
    for (let i = 0; i < TOP_CLUSTER_CONFIG.letterCount; i++) {
      // Create natural clustering with some spread
      const clusterCenterX = 20 + Math.random() * 60 // Avoid extreme edges
      const clusterCenterY = Math.random() * clusterMaxY
      
      // Add some randomness around cluster center for organic feel
      const spreadX = (Math.random() - 0.5) * 40 // ±20% spread
      const spreadY = (Math.random() - 0.5) * (clusterMaxY * 0.6) // Vertical spread within cluster area
      
      const size = TOP_CLUSTER_CONFIG.sizeRange.min + 
                   Math.random() * (TOP_CLUSTER_CONFIG.sizeRange.max - TOP_CLUSTER_CONFIG.sizeRange.min)
      
      const opacity = TOP_CLUSTER_CONFIG.opacityRange.min + 
                     Math.random() * (TOP_CLUSTER_CONFIG.opacityRange.max - TOP_CLUSTER_CONFIG.opacityRange.min)

      const clusterLetter: GreekLetter = {
        id: `cluster-${i}`,
        character: GREEK_CHARACTERS[Math.floor(Math.random() * GREEK_CHARACTERS.length)],
        x: Math.max(5, Math.min(95, clusterCenterX + spreadX)), // Keep within viewport bounds
        y: Math.max(0, clusterCenterY + spreadY),
        size: size,
        rotation: Math.random() * 40 - 20, // Slightly more rotation variation for dynamism
        layer: 3, // Special layer index for cluster
        opacity: opacity,
        isCluster: true,
      }
      newLetters.push(clusterLetter)
    }

    return newLetters
  }, [documentHeight])

  /**
   * Throttled scroll handler for performance optimization
   */
  const handleScroll = useCallback(() => {
    const now = performance.now()
    if (now - lastScrollTime.current < 16) return // Limit to ~60fps

    lastScrollTime.current = now

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    animationRef.current = requestAnimationFrame(() => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY)
      }
    })
  }, [])

  /**
   * Check for reduced motion preference
   */
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  /**
   * Update document height and regenerate letters when content changes
   */
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateDocumentHeight = () => {
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.scrollHeight,
        document.body.offsetHeight
      )
      setDocumentHeight(height)
    }

    // Initial height calculation
    updateDocumentHeight()

    // Update on window resize and content changes
    const resizeObserver = new ResizeObserver(updateDocumentHeight)
    resizeObserver.observe(document.body)

    window.addEventListener('resize', updateDocumentHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDocumentHeight)
    }
  }, [])

  /**
   * Setup scroll listeners and intersection observer
   */
  useEffect(() => {
    if (prefersReducedMotion) return

    // Initialize letters when document height is known
    if (documentHeight > 0) {
      setLetters(generateLetters())
    }

    // Setup intersection observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [generateLetters, prefersReducedMotion, documentHeight])

  /**
   * Add/remove scroll listeners based on visibility
   */
  useEffect(() => {
    if (typeof window === 'undefined' || !isVisible || prefersReducedMotion) return

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, handleScroll, prefersReducedMotion])

  /**
   * Calculate letter transform based on scroll position and layer speed
   * Special handling for cluster symbols with their own parallax speed
   */
  const getLetterTransform = (letter: GreekLetter): string => {
    if (prefersReducedMotion) {
      return `translate(${letter.x}vw, ${letter.y}px) rotate(${letter.rotation}deg)`
    }

    // Use cluster speed for cluster symbols, otherwise use layer speed
    const layerSpeed = letter.isCluster 
      ? TOP_CLUSTER_CONFIG.speed 
      : PARALLAX_LAYERS[letter.layer].speed
    const translateY = letter.y - scrollY * layerSpeed

    return `translate(${letter.x}vw, ${translateY}px) rotate(${letter.rotation}deg)`
  }

  if (prefersReducedMotion) {
    return null // Respect reduced motion preference
  }

  return (
    <div
      ref={containerRef}
      className="parallax-background"
      aria-hidden="true" // Decorative element, hidden from screen readers
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${Math.max(documentHeight, typeof window !== 'undefined' ? window.innerHeight : 800)}px`,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {letters.map(letter => (
        <div
          key={letter.id}
          className="greek-letter"
          style={{
            position: 'absolute',
            fontSize: `${letter.size}px`,
            color: 'var(--color-foreground)',
            opacity: letter.opacity,
            transform: getLetterTransform(letter),
            fontWeight: 300,
            userSelect: 'none',
            fontFamily: 'Times, "Times New Roman", Georgia, serif', // Greek-inspired serif font
            transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
            willChange: 'transform', // Optimize for animations
          }}
        >
          {letter.character}
        </div>
      ))}
    </div>
  )
}
