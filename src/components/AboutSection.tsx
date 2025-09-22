/**
 * AboutSection - Enhanced personal information and skills showcase component
 *
 * Displays a two-column responsive layout featuring personal bio content and a skills list.
 * Enhanced with proper semantic structure, ARIA labels, and improved typography hierarchy.
 * Uses CSS Grid for responsive layout and maintains accessibility standards.
 *
 * RESPONSIVE DESIGN DECISIONS:
 * - lg:grid-cols-2 breakpoint: Ensures adequate reading width on mobile (single column)
 *   while utilizing desktop space efficiently (two columns). The 1024px breakpoint
 *   prevents cramped content on tablet devices.
 * - clamp() typography: Provides fluid scaling that maintains readability across all
 *   device sizes. Minimum sizes ensure mobile accessibility, maximum sizes prevent
 *   oversized text on large displays.
 * - 16-unit gap: Based on 8px design system (128px), provides sufficient visual
 *   separation between bio and skills sections for clear content distinction.
 *
 * ACCESSIBILITY RATIONALE:
 * - Semantic HTML structure with proper heading hierarchy (h2 → h3 → h4)
 * - ARIA labelledby connects section to heading for screen readers
 * - Skills organized in logical categories for cognitive accessibility
 * - Color contrast maintained with foreground/accent color system
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

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio Content */}
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p
                className="text-foreground text-lg leading-relaxed"
                style={{
                  fontSize: 'clamp(1.125rem, 2.8vw, 1.25rem)',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                }}
              >
                An AI/ML Engineer and Researcher passionate about conventional code and automation.
                Dedicated to advancing the frontiers of artificial intelligence through rigorous research
                and practical applications that solve real-world problems.
              </p>

              <p
                className="text-foreground leading-relaxed"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                }}
              >
                With deep expertise in machine learning algorithms, automation systems, and software
                engineering best practices, I focus on developing AI solutions that are both
                innovative and practical. My work emphasizes clean code, robust automation, and
                reproducible research methodologies.
              </p>

              <p
                className="text-foreground leading-relaxed"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  lineHeight: '1.7',
                }}
              >
                My approach combines rigorous scientific methodology with engineering excellence to
                deliver AI systems that are reliable, scalable, and maintainable. I believe great
                AI emerges from understanding both the mathematical foundations and practical
                implementation challenges.
              </p>
            </div>

            {/* Call to Action */}
            <div className="pt-6 border-t border-foreground/10">
              <p
                className="text-foreground/80 text-sm leading-relaxed"
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  fontStyle: 'italic',
                }}
              >
                &quot;Conventional code and thoughtful automation are the foundation of
                reliable AI systems.&quot;
              </p>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-accent font-semibold mb-8"
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 1.75rem)',
                  lineHeight: '1.3',
                }}
              >
                Skills & Expertise
              </h3>

              {/* Technical Skills */}
              <div className="space-y-6">
                <div>
                  <h4
                    className="text-accent font-medium mb-4"
                    style={{
                      fontSize: 'clamp(1.125rem, 2.8vw, 1.25rem)',
                      lineHeight: '1.4',
                    }}
                  >
                    Machine Learning & AI
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP'].map(
                      skill => (
                        <div
                          key={skill}
                          className="flex items-center text-foreground"
                          style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            lineHeight: '1.5',
                          }}
                        >
                          <span
                            className="bg-accent rounded-full mr-3 flex-shrink-0"
                            style={{
                              width: '6px',
                              height: '6px',
                            }}
                            aria-hidden="true"
                          ></span>
                          {skill}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4
                    className="text-accent font-medium mb-4"
                    style={{
                      fontSize: 'clamp(1.125rem, 2.8vw, 1.25rem)',
                      lineHeight: '1.4',
                    }}
                  >
                    Programming & Tools
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Python & PyTorch',
                      'TensorFlow & Keras',
                      'MLOps & AutoML',
                      'Data Engineering',
                    ].map(skill => (
                      <div
                        key={skill}
                        className="flex items-center text-foreground"
                        style={{
                          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                          lineHeight: '1.5',
                        }}
                      >
                        <span
                          className="bg-accent rounded-full mr-3 flex-shrink-0"
                          style={{
                            width: '6px',
                            height: '6px',
                          }}
                          aria-hidden="true"
                        ></span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4
                    className="text-accent font-medium mb-4"
                    style={{
                      fontSize: 'clamp(1.125rem, 2.8vw, 1.25rem)',
                      lineHeight: '1.4',
                    }}
                  >
                    Research & Automation
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Research Methodology',
                      'CI/CD & Automation',
                      'Code Quality & Testing',
                    ].map(skill => (
                      <div
                        key={skill}
                        className="flex items-center text-foreground"
                        style={{
                          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                          lineHeight: '1.5',
                        }}
                      >
                        <span
                          className="bg-accent rounded-full mr-3 flex-shrink-0"
                          style={{
                            width: '6px',
                            height: '6px',
                          }}
                          aria-hidden="true"
                        ></span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Years of Experience */}
            <div className="pt-6 border-t border-foreground/10">
              <div className="text-center">
                <div
                  className="text-accent font-bold mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    lineHeight: '1.1',
                  }}
                >
                  5+
                </div>
                <p
                  className="text-foreground"
                  style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    lineHeight: '1.5',
                  }}
                >
                  Years of Professional Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
