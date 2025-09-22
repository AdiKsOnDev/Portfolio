/**
 * Project data structure for portfolio display
 */
interface ProjectData {
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
 * WorkSection - Enhanced portfolio projects showcase component
 *
 * Displays a responsive grid of project cards featuring technology stacks,
 * descriptions, and interactive hover effects. Enhanced with proper semantic
 * structure, ARIA labels, and improved typography hierarchy for accessibility.
 *
 * @returns JSX element containing the work section with project cards grid
 */
export function WorkSection() {
  // Project portfolio data with more realistic project information
  // Each project includes representative technologies and detailed descriptions
  const projects: ProjectData[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with modern payment integration, real-time inventory management, and responsive design for optimal user experience across all devices.',
      tags: ['React', 'TypeScript', 'Node.js', 'Stripe'],
    },
    {
      id: 2,
      title: 'Portfolio Analytics Dashboard',
      description:
        'Interactive data visualization platform featuring real-time analytics, customizable charts, and comprehensive reporting tools for business intelligence.',
      tags: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    },
    {
      id: 3,
      title: 'Task Management System',
      description:
        'Collaborative project management application with real-time updates, team coordination features, and advanced workflow automation capabilities.',
      tags: ['Next.js', 'Socket.io', 'MongoDB', 'Redis'],
    },
    {
      id: 4,
      title: 'AI Content Generator',
      description:
        'Machine learning-powered content creation tool with natural language processing, automated optimization, and multi-platform publishing support.',
      tags: ['Python', 'TensorFlow', 'FastAPI', 'AWS'],
    },
  ]

  return (
    <section
      id="work"
      className="section bg-background"
      role="region"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <h2
          id="work-heading"
          className="text-accent font-bold text-center mb-12"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: '1.2',
          }}
        >
          Work & Projects
        </h2>

        <ul className="grid md:grid-cols-2 gap-8 list-none">
          {projects.map(project => (
            <li key={project.id}>
              <article
                className="border border-foreground/20 rounded-lg p-6 hover:border-accent/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <h3
                  className="text-accent font-semibold mb-3"
                  style={{
                    fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                    lineHeight: '1.3',
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-foreground mb-4"
                  style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    lineHeight: '1.6',
                  }}
                >
                  {project.description}
                </p>

                <ul
                  className="flex flex-wrap gap-2 list-none"
                  aria-label={`Technologies used in ${project.title}`}
                >
                  {project.tags.map(tag => (
                    <li key={tag}>
                      <span
                        className="px-3 py-1 text-accent rounded-full"
                        style={{
                          backgroundColor: 'rgba(19, 19, 19, 0.1)',
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                          fontWeight: '500',
                        }}
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
