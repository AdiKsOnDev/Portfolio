"use client"

import React, { useEffect, useRef, useState } from 'react'

/**
 * Base props for all scroll card variants
 */
export interface BaseScrollCardProps {
  /** Content to display in the scroll header area */
  children: React.ReactNode
  /** Additional CSS classes for customization */
  className?: string
  /** Enable animation when card enters viewport */
  animate?: boolean
  /** Animation delay in milliseconds */
  animationDelay?: number
  /** ARIA role for accessibility */
  role?: string
  /** ARIA labelledby attribute */
  ariaLabelledby?: string
}

/**
 * Ancient scroll card container with papyrus styling and Greek ornamental borders.
 * 
 * DESIGN PHILOSOPHY:
 * Balances authentic ancient Greek manuscript aesthetics with modern web accessibility.
 * Visual metaphor of unrolling papyrus creates engaging user experience while maintaining
 * semantic HTML structure for assistive technologies.
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - CSS-only papyrus texture reduces image dependencies
 * - IntersectionObserver prevents unnecessary animations
 * - Transform-based animations leverage GPU acceleration
 * - Reduced motion preferences respected for accessibility
 * 
 * CULTURAL ELEMENTS:
 * - Papyrus texture evokes ancient knowledge preservation
 * - Greek meander borders reference classical architectural motifs
 * - Scroll physics simulate authentic parchment behavior
 * 
 * ACCESSIBILITY STRATEGY:
 * - ARIA landmarks for screen reader navigation
 * - Semantic HTML structure independent of visual styling
 * - Reduced motion support for users with vestibular disorders
 * - High contrast ratios maintained throughout
 */
export function ScrollCard({
  children,
  className = '',
  animate = true,
  animationDelay = 0,
  role = 'article',
  ariaLabelledby,
}: BaseScrollCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!animate || hasAnimated) return

    // IntersectionObserver configured with specific performance optimizations:
    // - threshold: 0.1 ensures animation triggers when scroll is 10% visible, providing smooth UX
    // - rootMargin: '50px 0px -50px 0px' creates a trigger zone above viewport for proactive loading
    // - 50px top margin: starts animation before element enters viewport for seamless experience
    // - -50px bottom margin: prevents accidental re-triggers when scrolling quickly
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Animation delay creates staggered reveals for natural reading flow
            setTimeout(() => {
              setIsVisible(true)
              setHasAnimated(true)
            }, animationDelay)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% visible - optimal for early animation start
        rootMargin: '50px 0px -50px 0px', // Expand detection zone for smoother experience
      }
    )

    const element = cardRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [animate, animationDelay, hasAnimated])

  return (
    <div
      ref={cardRef}
      role={role}
      aria-labelledby={ariaLabelledby}
      className={`scroll-card ${animate ? (isVisible ? 'scroll-card--visible' : 'scroll-card--hidden') : 'scroll-card--no-animation'} ${className}`}
      style={{
        animationDelay: animate ? `${animationDelay}ms` : '0ms',
      }}
    >
      {/* Scroll roll top */}
      <div className="scroll-card__roll scroll-card__roll--top" aria-hidden="true" />
      
      {/* Main scroll content */}
      <div className="scroll-card__content">
        {/* Greek meander border */}
        <div className="scroll-card__border scroll-card__border--top" aria-hidden="true" />
        
        {/* Content area */}
        <div className="scroll-card__inner">
          {children}
        </div>
        
        {/* Greek meander border */}
        <div className="scroll-card__border scroll-card__border--bottom" aria-hidden="true" />
      </div>
      
      {/* Scroll roll bottom */}
      <div className="scroll-card__roll scroll-card__roll--bottom" aria-hidden="true" />
      
      {/* Parchment flutter overlay */}
      <div className="scroll-card__flutter" aria-hidden="true" />
    </div>
  )
}

/**
 * Hook to provide scroll card animation utilities
 */
export function useScrollCardAnimation(delay: number = 0) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Reusable intersection observer for scroll-triggered animations
    // Configuration optimized for natural scroll behavior and performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Delay ensures animations respect staggered timing
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      {
        threshold: 0.1, // Early trigger for smooth animation entry
        rootMargin: '50px 0px -50px 0px', // Predictive loading zone
      }
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [delay])

  return { isVisible, elementRef }
}