/**
 * AboutSection - Enhanced personal information and skills showcase component
 *
 * Displays a two-column responsive layout featuring personal bio content and a skills list.
 * Enhanced with proper semantic structure, ARIA labels, and improved typography hierarchy.
 * Uses CSS Grid for responsive layout and maintains accessibility standards.
 *
 * @returns JSX element containing the about section with bio and skills
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="section bg-background"
      role="region"
      aria-labelledby="about-heading"
    >
      <div className="container-narrow">
        <h2
          id="about-heading"
          className="text-accent font-bold text-center mb-12"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: '1.2',
          }}
        >
          About
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio Content */}
          <div className="space-y-6">
            <p
              className="text-foreground"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                lineHeight: '1.6',
              }}
            >
              A passionate software engineer dedicated to creating meaningful digital experiences
              through thoughtful design and innovative solutions.
            </p>

            <p
              className="text-foreground"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                lineHeight: '1.6',
              }}
            >
              With expertise in modern web technologies and a keen eye for detail, I focus on
              building products that make a difference in people&apos;s lives.
            </p>

            <p
              className="text-foreground"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                lineHeight: '1.6',
              }}
            >
              My approach combines technical excellence with user-centered design principles to
              deliver solutions that are both functional and delightful to use.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3
              className="text-accent font-semibold mb-6"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                lineHeight: '1.3',
              }}
            >
              Skills & Expertise
            </h3>

            <ul className="space-y-4" role="list">
              {[
                'Frontend Development',
                'Full-Stack Engineering',
                'TypeScript & React',
                'Node.js & Python',
                'Modern CSS & Animations',
                'Performance Optimization',
                'Accessibility & UX',
                'Cloud Architecture',
              ].map(skill => (
                <li
                  key={skill}
                  className="text-foreground flex items-center"
                  style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    lineHeight: '1.5',
                  }}
                >
                  <span
                    className="bg-accent rounded-full mr-3 flex-shrink-0"
                    style={{
                      width: '8px',
                      height: '8px',
                    }}
                    aria-hidden="true"
                  ></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
