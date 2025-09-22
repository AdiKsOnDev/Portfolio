'use client'

import { useState } from 'react'

/**
 * Form data structure for contact form state management
 */
interface ContactFormData {
  /** Contact person's name */
  name: string
  /** Contact person's email address */
  email: string
  /** Message content from the contact person */
  message: string
}

/**
 * ContactSection - Contact form and social links component
 *
 * Provides a two-column layout with contact information/social links on the left
 * and a functional contact form on the right. Implements controlled form inputs
 * with proper validation and accessibility features.
 *
 * GLASS MORPHISM DESIGN DECISIONS:
 * - backdrop-filter: blur(10px): Creates depth separation between form and background
 *   without completely obscuring the Greek letter parallax effect. 10px provides
 *   sufficient blur for readability while maintaining visual connection to the background.
 * - backgroundColor: rgba(255, 255, 255, 0.08): Subtle white overlay that enhances
 *   text contrast without blocking the minimalist aesthetic. 8% opacity provides
 *   enough background without overwhelming the clean design.
 * - Border treatments: border-accent/10 creates subtle definition that strengthens
 *   on hover (accent/20) for clear interactive feedback.
 *
 * FORM UX RATIONALE:
 * - Two-column name/email layout: Reduces perceived form length while maintaining
 *   optimal input field width for usability. Collapses to single column on mobile.
 * - Enhanced focus states: border-accent with bg-accent/10 provides clear visual
 *   feedback that doesn't interfere with the glass effect aesthetic.
 * - Transform hover effects: Scale and visual feedback create modern interaction
 *   patterns that feel responsive and polished.
 *
 * @returns JSX element containing the contact section with form and social links
 */
export function ContactSection() {
  // Form state management using controlled inputs for better UX
  // Maintains form data in component state for validation and submission
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })

  /**
   * Handles form submission and integration with email services
   *
   * Currently logs to console for development purposes. In production,
   * this should integrate with email services like:
   * - EmailJS for client-side email sending
   * - Formspree for form handling service
   * - Custom API endpoint for server-side processing
   * - Netlify Forms for static site form handling
   *
   * @param e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Replace with actual email service integration
    // Example integrations:
    // - EmailJS: emailjs.send('service_id', 'template_id', formData)
    // - Custom API: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    console.log('Form submitted:', formData)

    // Reset form state after successful submission
    // In production, only reset after confirming successful send
    setFormData({ name: '', email: '', message: '' })
  }

  /**
   * Handles form input changes with proper TypeScript typing
   *
   * Uses dynamic property access to update the correct form field
   * based on the input's name attribute, enabling reusable change handler
   *
   * @param e - Input change event from form fields
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section
      id="contact"
      className="section bg-background"
      role="region"
      aria-labelledby="contact-heading"
    >
      <div className="container-narrow">
        <h2
          id="contact-heading"
          className="text-accent font-bold text-center mb-12"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: '1.2',
          }}
        >
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-accent font-bold mb-6"
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 1.75rem)',
                  lineHeight: '1.3',
                }}
              >
                Let&apos;s Connect
              </h3>

              <p
                className="text-foreground leading-relaxed mb-8"
                style={{
                  fontSize: 'clamp(1.125rem, 2.8vw, 1.25rem)',
                  lineHeight: '1.7',
                }}
              >
                I&apos;m passionate about advancing AI/ML research and building innovative automation solutions. 
                Whether you&apos;re interested in research collaboration, have an AI project in mind, 
                or want to discuss conventional code practices in machine learning, I&apos;d love to connect.
              </p>

              <div className="space-y-4">
                <div
                  className="text-foreground"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                    lineHeight: '1.6',
                  }}
                >
                  <strong className="text-accent">Response Time:</strong> Usually within 24 hours
                </div>
                <div
                  className="text-foreground"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                    lineHeight: '1.6',
                  }}
                >
                  <strong className="text-accent">Best for:</strong> AI/ML research collaboration, 
                  automation projects, technical discussions, academic partnerships
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4
                className="text-accent font-semibold mb-6"
                style={{
                  fontSize: 'clamp(1.125rem, 2.8vw, 1.25rem)',
                  lineHeight: '1.4',
                }}
              >
                Connect With Me
              </h4>
              <nav className="space-y-6" aria-label="Contact and social media links">
                <a
                  href="mailto:adil.alizada@research.example.com"
                  className="group flex items-center text-foreground hover:text-accent transition-all duration-300 p-4 rounded-lg border border-transparent hover:border-accent/20 hover:bg-accent/5"
                  aria-label="Send email to Adil Alizada"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mr-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm opacity-70">adil.alizada@research.example.com</div>
                  </div>
                </a>
                <a
                  href="https://linkedin.com/in/adilalizada"
                  className="group flex items-center text-foreground hover:text-accent transition-all duration-300 p-4 rounded-lg border border-transparent hover:border-accent/20 hover:bg-accent/5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Adil Alizada's LinkedIn profile (opens in new tab)"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mr-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2h-2a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm opacity-70">Professional network</div>
                  </div>
                </a>
                <a
                  href="https://github.com/adilalizada"
                  className="group flex items-center text-foreground hover:text-accent transition-all duration-300 p-4 rounded-lg border border-transparent hover:border-accent/20 hover:bg-accent/5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Adil Alizada's GitHub profile (opens in new tab)"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mr-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-sm opacity-70">ML/AI research & code</div>
                  </div>
                </a>
              </nav>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-accent/5 rounded-2xl p-8 border border-accent/10">
            <h3
              className="text-accent font-bold mb-6"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                lineHeight: '1.3',
              }}
            >
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-accent font-semibold mb-3"
                    style={{
                      fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-foreground/20 rounded-xl text-accent placeholder-foreground/50 focus:border-accent focus:outline-none transition-all duration-300 hover:border-foreground/30"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                      backdropFilter: 'blur(10px)',
                    }}
                    placeholder="Your full name"
                    aria-describedby="name-help"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-accent font-semibold mb-3"
                    style={{
                      fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-foreground/20 rounded-xl text-accent placeholder-foreground/50 focus:border-accent focus:outline-none transition-all duration-300 hover:border-foreground/30"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                      backdropFilter: 'blur(10px)',
                    }}
                    placeholder="your.email@example.com"
                    aria-describedby="email-help"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-accent font-semibold mb-3"
                  style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 border-2 border-foreground/20 rounded-xl text-accent placeholder-foreground/50 focus:border-accent focus:outline-none transition-all duration-300 hover:border-foreground/30 resize-none"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                    lineHeight: '1.6',
                    backdropFilter: 'blur(10px)',
                  }}
                  placeholder="Tell me about your AI/ML project, research collaboration idea, automation needs, or just say hello..."
                  aria-describedby="message-help"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-accent text-background py-4 px-8 rounded-xl font-bold hover:bg-accent/90 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background flex items-center justify-center gap-2"
                  style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                  }}
                >
                  <span>Send Message</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="sm:flex-none px-8 py-4 border-2 border-accent/30 text-accent rounded-xl font-semibold hover:border-accent hover:bg-accent/10 transition-all duration-300"
                  style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                  }}
                  onClick={() => setFormData({ name: '', email: '', message: '' })}
                >
                  Clear
                </button>
              </div>

              <div className="pt-4 border-t border-foreground/10">
                <p
                  className="text-foreground/70 text-center"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                    lineHeight: '1.5',
                  }}
                >
                  Your information is secure and will never be shared. I typically respond within 24
                  hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
