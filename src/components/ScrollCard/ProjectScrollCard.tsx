import React from 'react'
import { ScrollCard } from './ScrollCard'

/**
 * Project data structure for scroll card display
 */
export interface ProjectData {
  /** Unique project identifier */
  id: number
  /** Project display title */
  title: string
  /** Brief project description explaining key features or purpose */
  description: string
  /** Array of technology tags used in the project */
  tags: string[]
}

/**
 * Props for ProjectScrollCard component
 */
export interface ProjectScrollCardProps {
  /** Project data to display */
  project: ProjectData
  /** Index for staggered animations */
  index?: number
  /** Additional CSS classes */
  className?: string
  /** Animation delay override */
  animationDelay?: number
}

/**
 * ProjectScrollCard - Ancient scroll-themed project showcase component
 * 
 * Displays project information in an authentic ancient scroll design with:
 * - Project title as scroll header with decorative flourishes
 * - Technology tags styled as clay tablets
 * - Description in ink-style typography
 * - Action buttons as ancient Greek symbols/wax seals
 * 
 * Features Greek cultural elements while maintaining modern usability.
 */
export function ProjectScrollCard({
  project,
  index = 0,
  className = '',
  animationDelay,
}: ProjectScrollCardProps) {
  const defaultDelay = animationDelay ?? index * 150

  return (
    <ScrollCard
      className={`project-scroll-card ${className}`}
      animationDelay={defaultDelay}
      role="article"
      ariaLabelledby={`project-title-${project.id}`}
    >
      {/* Project Number - Ancient Greek Numeral Style */}
      <div className="project-scroll-card__number" aria-hidden="true">
        <div className="project-scroll-card__number-inner">
          {String(project.id).padStart(2, '0')}
        </div>
      </div>

      {/* Main Project Content */}
      <div className="project-scroll-card__content">
        {/* Project Title with Decorative Flourishes */}
        <div className="project-scroll-card__header">
          <div className="project-scroll-card__flourish project-scroll-card__flourish--left" aria-hidden="true" />
          <h3
            id={`project-title-${project.id}`}
            className="project-scroll-card__title"
          >
            {project.title}
          </h3>
          <div className="project-scroll-card__flourish project-scroll-card__flourish--right" aria-hidden="true" />
        </div>

        {/* Project Description - Ink Style Typography */}
        <div className="project-scroll-card__description">
          <p className="project-scroll-card__description-text">
            {project.description}
          </p>
        </div>

        {/* Technology Tags - Clay Tablet Style */}
        <div className="project-scroll-card__technologies">
          <h4 className="project-scroll-card__tech-label">
            {/* Greek amphora symbol (⚱) represents ancient storage vessels used for scrolls and knowledge */}
            {/* Culturally appropriate choice that connects technology concepts to ancient wisdom preservation */}
            <span className="project-scroll-card__tech-icon" aria-hidden="true">⚱</span>
            Technologies
          </h4>
          <ul
            className="project-scroll-card__tech-list"
            aria-label={`Technologies used in ${project.title}`}
          >
            {project.tags.map((tag, tagIndex) => (
              <li key={tag} className="project-scroll-card__tech-item">
                <span
                  className="project-scroll-card__tech-tag"
                  style={{
                    animationDelay: `${defaultDelay + (tagIndex * 100)}ms`,
                  }}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons - Ancient Greek Symbol Style */}
        <div className="project-scroll-card__actions">
          <button
            className="project-scroll-card__action project-scroll-card__action--primary"
            aria-label={`View ${project.title} project details`}
          >
            <span className="project-scroll-card__action-icon" aria-hidden="true">
              
            </span>
            <span className="project-scroll-card__action-text">View Project</span>
            <svg
              className="project-scroll-card__action-arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          
          <button
            className="project-scroll-card__action project-scroll-card__action--secondary"
            aria-label={`View ${project.title} source code`}
          >
            <span className="project-scroll-card__action-icon" aria-hidden="true">
              
            </span>
            <span className="project-scroll-card__action-text">Source Code</span>
          </button>
        </div>
      </div>

      {/* Wax Seal Decoration */}
      <div className="project-scroll-card__seal" aria-hidden="true">
        <div className="project-scroll-card__seal-inner">
          {/* Omega (Ω) symbol represents "the end" or completion in Greek, symbolizing finished projects */}
          {/* Ancient Greek letter chosen to emphasize project completion and mastery */}
          <span className="project-scroll-card__seal-symbol">Ω</span>
        </div>
      </div>
    </ScrollCard>
  )
}