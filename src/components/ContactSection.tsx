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

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3
              className="text-accent font-semibold mb-6"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                lineHeight: '1.3',
              }}
            >
              Let&apos;s Connect
            </h3>

            <p
              className="text-foreground mb-8"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                lineHeight: '1.6',
              }}
            >
              I&apos;m always interested in new opportunities and collaborations. Feel free to reach
              out if you&apos;d like to discuss a project or just say hello.
            </p>

            {/* Social Links */}
            <nav className="space-y-4" aria-label="Contact and social media links">
              <a
                href="mailto:adil.afzal@example.com"
                className="flex items-center text-foreground hover:text-accent transition-colors"
                aria-label="Send email to Adil Afzal"
              >
                <span className="w-6 h-6 mr-3" aria-hidden="true">
                  📧
                </span>
                adil.afzal@example.com
              </a>
              <a
                href="https://linkedin.com/in/adilafzal"
                className="flex items-center text-foreground hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Adil Afzal's LinkedIn profile (opens in new tab)"
              >
                <span className="w-6 h-6 mr-3" aria-hidden="true">
                  💼
                </span>
                LinkedIn
              </a>
              <a
                href="https://github.com/adilafzal"
                className="flex items-center text-foreground hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Adil Afzal's GitHub profile (opens in new tab)"
              >
                <span className="w-6 h-6 mr-3" aria-hidden="true">
                  🔗
                </span>
                GitHub
              </a>
            </nav>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
            <div>
              <label
                htmlFor="name"
                className="block text-accent font-medium mb-2"
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-foreground/30 rounded-lg text-accent placeholder-foreground/50 focus:border-accent focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                }}
                placeholder="Your name"
                aria-describedby="name-help"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-accent font-medium mb-2"
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-foreground/30 rounded-lg text-accent placeholder-foreground/50 focus:border-accent focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                }}
                placeholder="your.email@example.com"
                aria-describedby="email-help"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-accent font-medium mb-2"
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-foreground/30 rounded-lg text-accent placeholder-foreground/50 focus:border-accent focus:outline-none transition-colors resize-none"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                }}
                placeholder="Your message..."
                aria-describedby="message-help"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-background py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
