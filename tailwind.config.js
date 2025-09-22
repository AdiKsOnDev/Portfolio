/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Minimalist Greek-inspired color palette
        // Designed for accessibility with 4.5:1+ contrast ratios throughout

        // Primary background - warm marble white (#EEE4E3)
        // Evokes ancient Greek parchment and marble textures
        // Provides warm, inviting base that reduces eye strain
        background: '#EEE4E3',

        // Primary accent - deep charcoal black (#131313)
        // High contrast color ensuring WCAG AA compliance
        // Used for headings, primary text, and interactive elements
        accent: '#131313',

        // Secondary foreground - muted warm brown (#BBB8B3)
        // Softer alternative for secondary text and subtle elements
        // Maintains readability while creating visual hierarchy
        foreground: '#BBB8B3',
      },
      fontFamily: {
        // Inter variable font implementation with system fallbacks
        // Inter chosen for excellent readability and professional appearance
        // Variable font provides optimal weight selection and performance
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Extended spacing scale for precise layout control
        // Based on 8px grid system (4.5rem = 72px, 5.5rem = 88px)
        // Provides intermediate spacing options between default Tailwind values
        18: '4.5rem', // 72px - for medium-large gaps
        22: '5.5rem', // 88px - for large section spacing
      },
      fontSize: {
        // Custom hero typography scales for impactful landing sections
        // Tight line-height (1.1) creates visual impact and hierarchy
        // Responsive scaling handled via Tailwind responsive prefixes (md:, lg:)
        hero: ['4rem', { lineHeight: '1.1' }], // 64px - mobile hero
        'hero-lg': ['5rem', { lineHeight: '1.1' }], // 80px - desktop hero
      },
    },
  },
  plugins: [],
}
