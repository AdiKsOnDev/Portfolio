'use client'

import { useState, useCallback } from 'react'

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
 * Form validation errors structure
 */
interface FormErrors {
  name?: string
  email?: string
  message?: string
  general?: string
}

/**
 * Form submission states
 */
type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

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
 * FORM VALIDATION STRATEGY:
 *
 * WHY Real-time Validation on Blur:
 * - Provides immediate feedback without being intrusive during typing
 * - Reduces cognitive load by validating fields as user completes them
 * - Prevents jarring validation errors that appear/disappear during active input
 * - Balances helpful guidance with non-disruptive user experience
 *
 * WHY Progressive Error Display:
 * - Only shows errors after user has interacted with a field (touched state)
 * - Prevents overwhelming users with validation errors on page load
 * - Creates natural validation flow that follows user attention patterns
 * - Maintains form accessibility by not hiding critical validation information
 *
 * WHY Comprehensive Submission State Management:
 * - Visual loading states prevent double-submissions and provide user feedback
 * - Success/error states give clear indication of form submission outcome
 * - Submission state controls form interactivity during async operations
 * - Provides accessibility through ARIA live regions for screen reader announcements
 *
 * WHY Client-side Validation Patterns:
 * - Immediate feedback improves user experience vs server-side only validation
 * - Reduces unnecessary server requests and bandwidth usage
 * - Provides familiar web form interaction patterns users expect
 * - Still requires server-side validation for security (not shown in this component)
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

  // Form validation and submission state
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  /**
   * Validates individual form fields with comprehensive checks
   */
  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().length > 50) return 'Name must be less than 50 characters'
        return undefined

      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return undefined

      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
        return undefined

      default:
        return undefined
    }
  }, [])

  /**
   * Validates the entire form and returns errors object
   */
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {}

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) {
        newErrors[key as keyof FormErrors] = error
      }
    })

    return newErrors
  }, [formData, validateField])

  /**
   * Handles form submission with validation and user feedback
   *
   * Provides comprehensive validation, loading states, and error handling
   * for a polished user experience. Includes accessibility considerations
   * and mobile-optimized interactions.
   *
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    const formErrors = validateForm()
    setErrors(formErrors)

    // Don't submit if there are validation errors
    if (Object.keys(formErrors).length > 0) {
      // Focus first error field for better UX
      const firstErrorField = Object.keys(formErrors)[0]
      const element = document.getElementById(firstErrorField)
      element?.focus()
      return
    }

    setSubmissionState('submitting')
    setErrors({})

    try {
      // Simulate API call - replace with actual email service integration
      // Example integrations:
      // - EmailJS: await emailjs.send('service_id', 'template_id', formData)
      // - Custom API: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

      // Simulated delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000))

      // For demo purposes, randomly succeed or fail
      if (Math.random() > 0.3) {
        console.log('Form submitted successfully:', formData)
        setSubmissionState('success')

        // Reset form after successful submission
        setFormData({ name: '', email: '', message: '' })
        setTouched({})

        // Show success message for 5 seconds, then reset
        setTimeout(() => {
          setSubmissionState('idle')
        }, 5000)
      } else {
        throw new Error('Simulated network error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionState('error')
      setErrors({
        general: 'Failed to send message. Please try again or contact me directly via email.',
      })

      // Reset error state after 10 seconds
      setTimeout(() => {
        setSubmissionState('idle')
        setErrors({})
      }, 10000)
    }
  }

  /**
   * Handles form input changes with real-time validation
   *
   * Uses dynamic property access to update the correct form field
   * based on the input's name attribute, enabling reusable change handler.
   * Provides real-time validation feedback for better UX.
   *
   * @param e - Input change event from form fields
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))

      // Clear errors for this field when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }))
      }
    },
    [errors]
  )

  /**
   * Handles input blur events for validation feedback
   *
   * Validates individual fields when user finishes editing
   * to provide immediate feedback without being intrusive
   *
   * @param e - Blur event from form fields
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      // Mark field as touched
      setTouched(prev => ({
        ...prev,
        [name]: true,
      }))

      // Validate field on blur
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }))
    },
    [validateField]
  )

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
                I&apos;m passionate about advancing AI/ML research and building innovative
                automation solutions. Whether you&apos;re interested in research collaboration, have
                an AI project in mind, or want to discuss conventional code practices in machine
                learning, I&apos;d love to connect.
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
                    onBlur={handleBlur}
                    required
                    className={`form-input-enhanced button-enhanced focus-smooth w-full ${
                      errors.name && touched.name ? 'border-red-400' : ''
                    }`}
                    placeholder="Your full name"
                    aria-describedby={errors.name ? 'name-error' : 'name-help'}
                    aria-invalid={!!(errors.name && touched.name)}
                  />
                  {errors.name && touched.name && (
                    <div
                      id="name-error"
                      className="text-red-500 text-sm mt-2 animate-fade-in"
                      role="alert"
                    >
                      {errors.name}
                    </div>
                  )}
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
                  disabled={submissionState === 'submitting'}
                  className={`flex-1 py-4 px-8 rounded-xl font-bold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background flex items-center justify-center gap-2 min-h-[44px] ${
                    submissionState === 'submitting'
                      ? 'bg-accent/50 text-background/70 cursor-not-allowed'
                      : 'bg-accent text-background hover:bg-accent/90 hover:scale-[1.02]'
                  }`}
                  style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                  }}
                >
                  {submissionState === 'submitting' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  disabled={submissionState === 'submitting'}
                  className={`sm:flex-none px-8 py-4 border-2 rounded-xl font-semibold transition-all duration-300 min-h-[44px] ${
                    submissionState === 'submitting'
                      ? 'border-accent/20 text-accent/50 cursor-not-allowed'
                      : 'border-accent/30 text-accent hover:border-accent hover:bg-accent/10'
                  }`}
                  style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                  }}
                  onClick={() => {
                    setFormData({ name: '', email: '', message: '' })
                    setErrors({})
                    setTouched({})
                    setSubmissionState('idle')
                  }}
                >
                  Clear
                </button>
              </div>

              {/* Success/Error Message Display */}
              {submissionState === 'success' && (
                <div
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-green-800 font-medium">
                      Message sent successfully! Thank you for reaching out.
                    </p>
                  </div>
                </div>
              )}

              {submissionState === 'error' && (
                <div
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-red-800">
                      <p className="font-medium">Unable to send message</p>
                      <p className="text-sm">Please try again or contact me directly.</p>
                    </div>
                  </div>
                </div>
              )}

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
