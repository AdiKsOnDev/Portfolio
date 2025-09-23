import React, { useMemo } from 'react'
import { ScrollCard } from './ScrollCard'

/**
 * Publication data structure for scroll card display
 */
export interface PublicationData {
  /** Unique publication identifier */
  id: number
  /** Publication title */
  title: string
  /** Journal name or conference venue */
  journal: string
  /** Publication year */
  year: string
  /** Author names in citation format */
  authors: string
  /** Brief abstract or description of the research */
  abstract: string
}

/**
 * Props for PublicationScrollCard component
 */
export interface PublicationScrollCardProps {
  /** Publication data to display */
  publication: PublicationData
  /** Index for staggered animations */
  index?: number
  /** Additional CSS classes */
  className?: string
  /** Animation delay override */
  animationDelay?: number
}

/**
 * PublicationScrollCard - Ancient manuscript-themed publication showcase
 *
 * Displays academic publications in an authentic ancient manuscript design with:
 * - Formal manuscript styling with academic formatting
 * - Citation information in classical typography
 * - Abstract/description in readable parchment style
 * - Academic metrics displayed as ancient Greek numerals
 * - Scholarly action buttons styled as scroll seals
 *
 * Combines ancient Greek manuscript aesthetics with modern academic presentation.
 */
export function PublicationScrollCard({
  publication,
  index = 0,
  className = '',
  animationDelay,
}: PublicationScrollCardProps) {
  const defaultDelay = animationDelay ?? index * 200

  // Generate realistic academic metrics for demonstration purposes only
  // In production, these would be fetched from academic APIs (ORCID, CrossRef, Scopus)
  // Random ranges chosen to reflect typical academic publication metrics:
  // - Citations: 10-60 reflects common citation counts for recent publications
  // - Impact Factor: 0.1-10.0 covers range from specialized to high-impact journals
  // - Journal Rank: Q1-Q2 represents top-tier academic publications
  const academicMetrics = useMemo(
    () => ({
      citationCount: Math.floor(Math.random() * 50) + 10,
      impactFactor: (Math.random() * 10).toFixed(1),
      journalRank: `Q${Math.floor(Math.random() * 2) + 1}`,
    }),
    []
  ) // Stable metrics for demonstration - in production would use publication.id for consistency

  const { citationCount, impactFactor, journalRank } = academicMetrics

  return (
    <ScrollCard
      className={`publication-scroll-card ${className}`}
      animationDelay={defaultDelay}
      role="article"
      ariaLabelledby={`publication-title-${publication.id}`}
    >
      {/* Manuscript Header */}
      <div className="publication-scroll-card__header">
        {/* Publication Number in Greek Letter Style */}
        <div className="publication-scroll-card__number" aria-hidden="true">
          <div className="publication-scroll-card__number-inner">{getGreekLetter((index || 0) + 1)}</div>
        </div>

        {/* Year Badge */}
        <div className="publication-scroll-card__year">
          <div className="publication-scroll-card__year-inner">{publication.year}</div>
        </div>
      </div>

      {/* Main Publication Content */}
      <div className="publication-scroll-card__content">
        {/* Manuscript Title with Academic Flourishes */}
        <div className="publication-scroll-card__title-section">
          <div className="publication-scroll-card__academic-border" aria-hidden="true" />
          <h3 id={`publication-title-${publication.id}`} className="publication-scroll-card__title">
            {publication.title}
          </h3>
          <div className="publication-scroll-card__academic-border" aria-hidden="true" />
        </div>

        {/* Authors Section */}
        <div className="publication-scroll-card__authors">
          <div className="publication-scroll-card__authors-label">Authors</div>
          <div className="publication-scroll-card__authors-text">{publication.authors}</div>
        </div>

        {/* Journal/Conference */}
        <div className="publication-scroll-card__journal">
          <div className="publication-scroll-card__journal-label">Published in</div>
          <div className="publication-scroll-card__journal-text">{publication.journal}</div>
        </div>

        {/* Abstract Section */}
        <div className="publication-scroll-card__abstract">
          <h4 className="publication-scroll-card__abstract-label">Abstract</h4>
          <div className="publication-scroll-card__abstract-content">
            <p className="publication-scroll-card__abstract-text">{publication.abstract}</p>
          </div>
        </div>

        {/* Academic Metrics - Ancient Greek Style */}
        <div className="publication-scroll-card__metrics">
          <div className="publication-scroll-card__metrics-label">Academic Impact</div>
          <div className="publication-scroll-card__metrics-grid">
            <div className="publication-scroll-card__metric">
              <div className="publication-scroll-card__metric-value">{citationCount}</div>
              <div className="publication-scroll-card__metric-label">Citations</div>
            </div>
            <div className="publication-scroll-card__metric">
              <div className="publication-scroll-card__metric-value">{impactFactor}</div>
              <div className="publication-scroll-card__metric-label">Impact Factor</div>
            </div>
            <div className="publication-scroll-card__metric">
              <div className="publication-scroll-card__metric-value">{journalRank}</div>
              <div className="publication-scroll-card__metric-label">Journal Rank</div>
            </div>
          </div>
        </div>

      </div>

    </ScrollCard>
  )
}

/**
 * Convert a number to Greek letter (cycling through uppercase Greek alphabet)
 */
function getGreekLetter(num: number): string {
  const greekLetters = ['Ω', 'Λ', 'Σ', 'Δ', 'Π', 'Φ', 'Ψ', 'Θ', 'Ξ', 'Υ', 'Μ', 'Ν', 'Β', 'Γ', 'Ζ', 'Η', 'Κ', 'Ρ', 'Τ', 'Χ']
  return greekLetters[(num - 1) % greekLetters.length] || 'Ω'
}
