# Hyniva Web Application - Project Architecture Overview

## Project Overview & Architecture Pattern

### Framework & Architecture
- **Framework**: Next.js 16 with App Router
- **Pattern**: Component-based architecture with centralized content management
- **Rendering**: Server Components by default with selective Client Components
- **Language**: TypeScript with strict type enforcement

### Styling & UI
- **Styling**: TailwindCSS v4 with custom design system
- **Theme**: Dark/light mode support via next-themes
- **Fonts**: Inter, Bricolage Grotesque, Geist Mono
- **Icons**: Lucide React icon library

### State Management & Animation
- **State Management**: React hooks with local state
- **Animation**: Framer Motion for advanced animations and scroll effects
- **Data Flow**: Props-based data flow from centralized content

## Entry Points & Routing Logic

### Application Entry Points
- **Root Layout**: `src/app/layout.tsx` - Global layout wrapper with theme provider
- **Home Page**: `src/app/page.tsx` - Main landing page
- **AIRA Product Page**: `src/app/aira/page.tsx` - Dedicated product page

### Routing Structure
```
src/app/
├── layout.tsx          # Root layout wrapper
├── page.tsx           # Homepage (/)
├── aira/
│   └── page.tsx       # AIRA product page (/aira)
└── globals.css        # Global styles
```

### Routing Pattern
- **Framework**: Next.js App Router with file-based routing
- **External Links**: Product pages redirect to `products.hyniva.com` domain
- **Route Organization**: Simple flat structure with dedicated product routes

## Core Components Structure

### Layout Components
- **Navbar** (`src/components/navbar.tsx`): Sticky navigation with dropdown menus and scroll effects
- **Footer** (`src/components/footer.tsx`): Comprehensive footer with links and information

### Homepage Components (Render Order)
1. **HeroCarousel** (`src/components/hero-carousel.tsx`) - Animated hero section with stats
2. **TrustBar** (`src/components/trust-bar.tsx`) - Client logos showcase
3. **Challenges** (`src/components/challenges.tsx`) - Problem statement section
4. **Approach** (`src/components/approach.tsx`) - Methodology presentation
5. **Services** (`src/components/services.tsx`) - Services overview
6. **ProductsShowcase** (`src/components/products-showcase.tsx`) - Product cards
7. **Industries** (`src/components/industries.tsx`) - Target industries
8. **CaseStudies** (`src/components/case-studies.tsx`) - Success stories
9. **WhyHyniva** (`src/components/why-hyniva.tsx`) - Value proposition
10. **TechPartners** (`src/components/tech-partners.tsx`) - Technology partners
11. **VoiceOfCustomer** (`src/components/voice-of-customer.tsx`) - Testimonials

### UI Components
- **Button** (`src/components/ui/button.tsx`) - Reusable button component
- **ModeToggle** (`src/components/ui/mode-toggle.tsx`) - Dark/light theme switcher

### Additional Components
- **CTABanner** (`src/components/cta-banner.tsx`) - Call-to-action banner
- **HeroPuzzle** (`src/components/hero-puzzle.tsx`) - Alternative hero component
- **ProcessTimeline** (`src/components/process-timeline.tsx`) - Process visualization
- **Stats** (`src/components/stats.tsx`) - Statistics display
- **TechStack** (`src/components/tech-stack.tsx`) - Technology stack showcase
- **Testimonials** (`src/components/testimonials.tsx`) - Customer testimonials

## Content Management Strategy

### Centralized Content Architecture
- **Content Hub**: `src/content/site-content.ts` - Single source of truth for all site content
- **Navigation**: Structured nav content with products, services, industries
- **Hero Content**: Carousel slides and CTAs managed centrally
- **Data Structure**: TypeScript interfaces for type-safe content management

### Content Organization
```typescript
// Key content structures in site-content.ts
export const navContent = {
  brand: { name: "Hyniva" },
  products: [...],      // Product listings
  industries: [...],    // Industry focus areas
  services: [...],      // Service offerings
  insights: [...],      // Content and resources
  about: [...]          // Company information
};

export const heroSlides = [...];     // Hero carousel content
export const trustContent = {...};   // Client logos and trust indicators
```

### Content Management Benefits
- **Single Source of Truth**: Eliminates hardcoded strings in components
- **Type Safety**: TypeScript interfaces ensure content consistency
- **Maintainability**: Centralized updates propagate across all components
- **Reusability**: Content objects can be shared across multiple components

## Technical Stack

### Core Technologies
- **Frontend Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4
- **Package Manager**: pnpm

### Development & Build Tools
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript compiler
- **Deployment**: AWS Amplify

### Libraries & Dependencies
- **Animation**: Framer Motion 12.34.0
- **Theme**: next-themes 0.4.6
- **Icons**: Lucide React 0.563.0
- **Utilities**: clsx 2.1.1, tailwind-merge 3.4.0
- **Carousels**: embla-carousel-react 8.6.0
- **Component Variants**: class-variance-authority 0.7.1

### Configuration Files
- **Next.js Config**: `next.config.ts` - Image optimization and build settings
- **TypeScript Config**: `tsconfig.json` - Strict TypeScript configuration
- **Tailwind Config**: TailwindCSS v4 configuration
- **Amplify Config**: `amplify.yml` - Deployment pipeline configuration

## Project Purpose & Key Features

### Business Purpose
The Hyniva corporate website serves as a marketing and lead generation platform designed to:
- Showcase Hyniva's technology services and AI-powered products
- Generate qualified leads through strategic CTAs and contact forms
- Build brand credibility through case studies and client testimonials
- Provide comprehensive information about AI, cloud, and digital transformation services

### Key Features
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Advanced Animations**: Smooth scroll-triggered animations using Framer Motion
- **Theme Switching**: Dark/light mode support with system preference detection
- **SEO Optimization**: Comprehensive metadata and OpenGraph configuration
- **Image Optimization**: External domain image optimization for performance
- **Component Architecture**: Reusable, maintainable component structure
- **Content Management**: Centralized content system for easy updates
- **Performance**: Server Components by default with selective client-side interactivity

### Target Audience
- Enterprise clients seeking AI and cloud transformation services
- Financial services industry (banking, wealth management, insurance)
- Technology decision makers evaluating service providers
- Potential employees exploring career opportunities

### Business Value Proposition
- **AI-Powered Delivery**: Demonstrates expertise in artificial intelligence solutions
- **Industry Specialization**: Focus on financial services and regulated industries
- **Proven Track Record**: Client logos and case studies build credibility
- **Comprehensive Services**: Full-stack technology services from strategy to implementation
