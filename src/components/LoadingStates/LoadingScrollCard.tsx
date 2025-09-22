'use client'

import React from 'react'

/**
 * Loading state props for scroll card skeleton
 */
interface LoadingScrollCardProps {
  /** Show loading state for project or publication card */
  variant?: 'project' | 'publication'
  /** Number of skeleton cards to show */
  count?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * LoadingScrollCard - Papyrus-themed skeleton loading state
 *
 * Provides authentic loading experience that matches the ancient Greek
 * manuscript aesthetic with papyrus texture shimmer effects.
 *
 * DESIGN STRATEGY:
 * - Maintains scroll card visual structure during loading
 * - Papyrus-textured shimmer effect creates seamless transition
 * - Staggered animations prevent jarring simultaneous loads
 * - Respects reduced motion preferences for accessibility
 *
 * PERFORMANCE CONSIDERATIONS:
 * - CSS-only animations minimize JavaScript overhead
 * - Single component handles multiple card types efficiently
 * - Optimized for mobile with reduced complexity on smaller screens
 */
export function LoadingScrollCard({
  variant = 'project',
  count = 1,
  className = '',
}: LoadingScrollCardProps) {
  const cards = Array.from({ length: count }, (_, index) => (
    <div
      key={`loading-${index}`}
      className={`scroll-card scroll-card--visible ${className}`}
      style={{
        animationDelay: `${index * 150}ms`, // Staggered loading effect
      }}
    >
      {/* Scroll roll top */}
      <div className="scroll-card__roll scroll-card__roll--top loading-papyrus" />

      {/* Main scroll content */}
      <div className="scroll-card__content">
        {/* Greek meander border */}
        <div className="scroll-card__border scroll-card__border--top loading-papyrus" />

        {/* Content area */}
        <div className="scroll-card__inner">
          {variant === 'project' ? <ProjectSkeletonContent /> : <PublicationSkeletonContent />}
        </div>

        {/* Greek meander border */}
        <div className="scroll-card__border scroll-card__border--bottom loading-papyrus" />
      </div>

      {/* Scroll roll bottom */}
      <div className="scroll-card__roll scroll-card__roll--bottom loading-papyrus" />
    </div>
  ))

  return <>{cards}</>
}

/**
 * Project card skeleton content
 */
function ProjectSkeletonContent() {
  return (
    <>
      {/* Project number placeholder */}
      <div className="absolute top-4 right-6">
        <div className="w-14 h-14 rounded-full loading-skeleton" />
      </div>

      {/* Project header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-0.5 loading-skeleton" />
          <div className="w-32 h-8 loading-skeleton rounded" />
          <div className="flex-1 h-0.5 loading-skeleton" />
        </div>
      </div>

      {/* Project description */}
      <div className="mb-6 space-y-3">
        <div className="w-full h-4 loading-skeleton rounded" />
        <div className="w-5/6 h-4 loading-skeleton rounded" />
        <div className="w-4/6 h-4 loading-skeleton rounded" />
      </div>

      {/* Technology section */}
      <div className="mb-6">
        <div className="w-24 h-5 loading-skeleton rounded mb-4" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="w-16 h-8 loading-skeleton rounded-full" />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4 border-t border-opacity-20">
        <div className="w-24 h-10 loading-skeleton rounded-full" />
        <div className="w-20 h-10 loading-skeleton rounded-full" />
      </div>

      {/* Project seal placeholder */}
      <div className="absolute bottom-4 right-6">
        <div className="w-10 h-10 rounded-full loading-skeleton" />
      </div>
    </>
  )
}

/**
 * Publication card skeleton content
 */
function PublicationSkeletonContent() {
  return (
    <>
      {/* Publication header */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-20 h-10 loading-skeleton rounded" />
        <div className="w-16 h-8 loading-skeleton rounded" />
      </div>

      {/* Publication title */}
      <div className="text-center mb-6">
        <div className="w-full h-1 loading-skeleton mb-4" />
        <div className="w-4/5 h-6 loading-skeleton rounded mx-auto mb-2" />
        <div className="w-3/5 h-6 loading-skeleton rounded mx-auto" />
        <div className="w-full h-1 loading-skeleton mt-4" />
      </div>

      {/* Authors and journal */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="w-20 h-4 loading-skeleton rounded mb-2" />
          <div className="w-3/4 h-4 loading-skeleton rounded" />
        </div>
        <div>
          <div className="w-16 h-4 loading-skeleton rounded mb-2" />
          <div className="w-2/3 h-4 loading-skeleton rounded" />
        </div>
      </div>

      {/* Abstract */}
      <div className="mb-6">
        <div className="w-20 h-4 loading-skeleton rounded mb-3" />
        <div className="bg-opacity-20 p-4 rounded border-l-4 border-opacity-30">
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={`h-3 loading-skeleton rounded ${i === 3 ? 'w-3/4' : 'w-full'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mb-6">
        <div className="w-20 h-4 loading-skeleton rounded mb-3" />
        <div className="bg-opacity-20 p-4 rounded border border-opacity-20">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="text-center">
                <div className="w-8 h-6 loading-skeleton rounded mx-auto mb-1" />
                <div className="w-12 h-3 loading-skeleton rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4 border-t border-opacity-20">
        <div className="w-20 h-8 loading-skeleton rounded-full" />
        <div className="w-16 h-8 loading-skeleton rounded-full" />
      </div>

      {/* Publication seal placeholder */}
      <div className="absolute bottom-4 left-6">
        <div className="w-8 h-8 rounded-full loading-skeleton" />
      </div>
    </>
  )
}

/**
 * Error state component for failed loading
 */
interface ErrorScrollCardProps {
  /** Error message to display */
  message?: string
  /** Retry function */
  onRetry?: () => void
  /** Error type for different styling */
  type?: 'network' | 'data' | 'generic'
  /** Additional CSS classes */
  className?: string
}

export function ErrorScrollCard({
  message = 'Failed to load content',
  onRetry,
  type = 'generic',
  className = '',
}: ErrorScrollCardProps) {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return '📡'
      case 'data':
        return '📄'
      default:
        return '⚠'
    }
  }

  const getErrorTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Error'
      case 'data':
        return 'Data Error'
      default:
        return 'Loading Error'
    }
  }

  return (
    <div className={`scroll-card scroll-card--visible ${className}`}>
      {/* Scroll roll top */}
      <div className="scroll-card__roll scroll-card__roll--top" />

      {/* Main scroll content */}
      <div className="scroll-card__content">
        {/* Greek meander border */}
        <div className="scroll-card__border scroll-card__border--top" />

        {/* Error content */}
        <div className="scroll-card__inner">
          <div className="error-state">
            <div className="text-4xl mb-4" aria-hidden="true">
              {getErrorIcon()}
            </div>
            <h3 className="font-ancient text-xl mb-2 text-accent">{getErrorTitle()}</h3>
            <p className="text-foreground mb-6 text-center">{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="button-primary magnetic-hover focus-smooth"
                aria-label={`Retry loading content. Previous error: ${message}`}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>
            )}
          </div>
        </div>

        {/* Greek meander border */}
        <div className="scroll-card__border scroll-card__border--bottom" />
      </div>

      {/* Scroll roll bottom */}
      <div className="scroll-card__roll scroll-card__roll--bottom" />
    </div>
  )
}
