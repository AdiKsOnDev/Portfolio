# Greek Portfolio - Minimalist Design

A modern, minimalist portfolio website built with Next.js, featuring clean typography, responsive design, and a Greek-inspired aesthetic. The project emphasizes simplicity, accessibility, and performance while providing a professional platform for showcasing work and publications.

## Features

- **Server-side Rendering**: Built with Next.js 15 for optimal performance and SEO
- **Type Safety**: Full TypeScript implementation for robust development
- **Custom Design System**: Tailwind CSS with carefully crafted Greek-inspired color palette
- **Responsive Design**: Mobile-first approach ensuring seamless experience across all devices
- **Accessibility Focused**: WCAG compliant implementation with semantic HTML and proper ARIA attributes
- **Performance Optimized**: Minimal bundle size with efficient hydration patterns
- **Modern Architecture**: Component-based structure with clean separation of concerns
- **Greek Letters Parallax**: Stunning three-layer parallax background with floating Greek letters
- **Enhanced Content Sections**: Professional layout with glass morphism effects and fluid typography
- **Interactive Forms**: Contact form with validation and social media integration

## Design System

### Color Palette

The color scheme draws inspiration from ancient Greek marble and parchment:

- **Background** (`#EEE4E3`): Warm marble white evoking ancient parchment textures
- **Accent** (`#131313`): Deep charcoal black ensuring high contrast (4.5:1 ratio) for accessibility
- **Foreground** (`#BBB8B3`): Muted gray for secondary text and subtle elements

### Typography

- **Font**: Inter with variable font loading for optimal performance
- **Scaling**: Fluid responsive typography using clamp() functions
- **Hierarchy**: Clear typographic scale with custom hero sizes

### Spacing

- **Base Unit**: 8px grid system for consistent rhythm
- **Custom Utilities**: Extended spacing scale (18, 22) for precise layouts
- **Responsive**: Adaptive spacing that scales with viewport size

### Enhanced Visual Effects (Iteration 4)

- **Glass Morphism**: Subtle backdrop-blur effects for depth and modern aesthetics
- **Parallax Background**: Three-layer Greek letter system with GPU-accelerated animations
- **Fluid Typography**: Advanced clamp() functions for seamless cross-device scaling
- **Interactive Hover States**: Transform effects and visual feedback for enhanced UX

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks for code quality
- `npm run lint:fix` - Automatically fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without making changes
- `npm run type-check` - Run TypeScript compiler checks without emitting files

### Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata and font configuration
│   ├── page.tsx           # Main page composition
│   └── globals.css        # Global styles, design system variables, and enhanced effects
└── components/
    ├── HeroSection.tsx        # Landing section with scroll indicator
    ├── ParallaxBackground.tsx # Greek letters parallax system with three-layer animation
    ├── AboutSection.tsx       # Enhanced personal info with two-column layout and skills
    ├── WorkSection.tsx        # Project portfolio with interactive cards and hover effects
    ├── PublicationsSection.tsx # Academic publications with citation formatting
    └── ContactSection.tsx     # Contact form with glass morphism and social links
```

### Development Guidelines

1. **Component Architecture**: Each component is self-contained with clear prop interfaces
2. **Styling**: Use Tailwind classes with semantic color variables (accent, background, foreground)
3. **Accessibility**: Ensure proper semantic HTML, ARIA labels, and keyboard navigation
4. **Performance**: Implement proper hydration patterns and optimize bundle size
5. **Type Safety**: Maintain strict TypeScript compliance with proper interface definitions

## Iteration 4 Enhancements

The latest iteration introduces significant content section improvements:

### Enhanced Components

#### AboutSection

- **Two-column responsive layout** with proper mobile stacking
- **Skills categorization** into Frontend, Backend, and Specializations
- **Professional bio content** with improved typography hierarchy
- **Inspirational quote section** with subtle visual separation

#### WorkSection

- **Interactive project cards** with sophisticated hover effects
- **Project numbering system** for better visual organization
- **Technology tags** with enhanced styling and hover states
- **Action buttons** with icons for "View Project" and "Source Code"

#### PublicationsSection

- **Academic citation formatting** following standard publication styles
- **Impact metrics display** with realistic citation counts and journal rankings
- **Enhanced readability** with proper typography scaling
- **Action links** for PDF downloads and research data access

#### ContactSection

- **Glass morphism form design** with backdrop blur effects
- **Two-column form layout** for name/email fields
- **Enhanced social links** with icon containers and hover animations
- **Professional messaging** about response times and contact purposes

### Technical Improvements

- **SSR-safe implementation** with proper window object guards
- **Enhanced glass morphism effects** using backdrop-filter for depth
- **Fluid typography system** with advanced clamp() functions
- **Improved accessibility** with comprehensive ARIA labels and semantic structure
- **Performance optimized** hover effects and animations

## Technical Requirements

- **Node.js**: Version 18.17 or higher
- **Package Manager**: npm 9.0 or higher
- **Browser Support**: Modern browsers with ES2017+ support

## Build and Deployment

The project is optimized for deployment on platforms like Vercel, Netlify, or any static hosting service:

```bash
# Build for production
npm run build

# Start production server locally
npm run start
```

## Customization

### Updating Content

- Edit component files in `src/components/` to update portfolio content
- Modify `src/app/layout.tsx` for SEO metadata and site configuration
- Update design system variables in `src/app/globals.css` and `tailwind.config.js`

### Adding Sections

1. Create new component in `src/components/`
2. Add proper TypeScript interfaces and JSDoc documentation
3. Import and include in `src/app/page.tsx`
4. Update navigation if needed

### Design System Modifications

- Color palette: Update `tailwind.config.js` colors object
- Typography: Modify font configuration in `layout.tsx` and Tailwind config
- Spacing: Extend spacing scale in Tailwind configuration

## Browser Compatibility

- Chrome 88+
- Firefox 84+
- Safari 14+
- Edge 88+

## License

This project is licensed under the ISC License - see the package.json file for details.
