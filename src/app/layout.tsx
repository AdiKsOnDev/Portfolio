import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

/**
 * Inter font configuration with optimal loading strategy
 *
 * Uses 'swap' display strategy for improved Core Web Vitals performance:
 * - Fallback font displays immediately while Inter loads
 * - Provides variable font support via CSS custom property
 * - Only loads Latin subset for optimal bundle size
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/**
 * Viewport configuration for responsive design and PWA compatibility
 *
 * Sets up proper mobile viewport handling and theme color for:
 * - Consistent responsive behavior across devices
 * - Browser chrome theming (matches accent color #131313)
 * - Prevents unwanted zoom behavior on mobile devices
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#131313', // Matches design system accent color
}

/**
 * SEO and social media metadata configuration
 *
 * Comprehensive metadata setup including:
 * - Primary SEO tags (title, description, keywords)
 * - OpenGraph protocol for social media sharing
 * - Twitter Card optimization for enhanced social presence
 * - Author attribution and content categorization
 */
export const metadata: Metadata = {
  title: 'Greek Portfolio - Minimalist Design',
  description:
    'A minimalist portfolio website featuring Greek letter parallax effects and elegant content presentation.',
  keywords: ['portfolio', 'minimalist', 'greek letters', 'parallax', 'design'],
  authors: [{ name: 'Portfolio Owner' }],
  openGraph: {
    title: 'Greek Portfolio - Minimalist Design',
    description:
      'A minimalist portfolio website featuring Greek letter parallax effects and elegant content presentation.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greek Portfolio - Minimalist Design',
    description:
      'A minimalist portfolio website featuring Greek letter parallax effects and elegant content presentation.',
  },
}

/**
 * RootLayout - Next.js app router root layout component
 *
 * Configures global application settings and provides the base HTML structure
 * for all pages in the application. This component wraps all page content and
 * establishes the foundation for:
 *
 * - Font loading and CSS custom property configuration
 * - SEO metadata and social media optimization
 * - Viewport settings for responsive design
 * - Base HTML structure with semantic elements
 * - Global CSS and design system initialization
 *
 * The layout uses Next.js 15 App Router conventions and implements performance
 * optimizations including variable font loading and proper meta tag configuration.
 *
 * @param children - React components representing page content to render within the layout
 * @returns Complete HTML document structure with configured head and body elements
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
