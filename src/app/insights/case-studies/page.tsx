/**
 * CASE STUDIES MODULE
 * 
 * This component displays detailed case studies of Hyniva's work with clients.
 * Each case study showcases real-world implementations and results.
 * 
 * Structure:
 * - Hero section with background image and animated content
 * - Grid layout of case study cards
 * - Individual cards with titles, descriptions, and external links
 * 
 * Features:
 * - Animated components using Framer Motion
 * - Responsive grid layout (2 columns on tablet, 3 on desktop)
 * - External links to detailed case study pages
 * - Consistent styling with site theme
 * 
 * URL: /insights/case-studies (rewritten to /case-studies)
 */

"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { caseStudiesContent } from "@/content/case-studies";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ─────────────── Case Study Card Component ─────────────── */
/**
 * CaseStudyCard - Individual card for displaying a case study
 * 
 * Props:
 * - study: Case study object containing title, description, href, and image
 * - index: Position in the grid for staggered animations
 * 
 * Features:
 * - Hover effects with translation and shadow changes
 * - Linked title for better UX
 * - Gradient button with arrow icon
 * - Animated entry using scrollReveal variant
 * 
 * Data source: caseStudiesContent.studies from /content/case-studies.ts
 */
function CaseStudyCard({
    study,
    index,
}: {
    study: (typeof caseStudiesContent.studies)[number];
    index: number;
}) {
    return (
        <motion.div
            variants={scrollReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <h3 className="mb-4 text-xl font-bold leading-snug text-blue-900">
                <Link href={study.href} className="hover:text-blue-700 transition-colors">
                    {study.title}
                </Link>
            </h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                {study.description}
            </p>
            <div className="mt-auto">
                <Link
                    href={study.href}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-900 to-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                    Explore
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
}

/* ─────────────── Case Studies Hero Section ─────────────── */
/**
 * CaseStudiesHero - Hero section for case studies page
 * 
 * Features:
 * - Background image from caseStudiesContent.hero.backgroundImage
 * - Gradient overlays for text readability
 * - Animated title and subtitle using Framer Motion
 * - Responsive typography scaling
 * - Consistent with other page heroes in the site
 * 
 * Content:
 * - Dynamic title from caseStudiesContent.hero.title
 * - Subtitle and description from content configuration
 * - Dark theme with blue accent colors
 */
function CaseStudiesHero() {
    return (
        <section className="relative overflow-hidden bg-[#030b1e] py-20 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-44 lg:py-36 lg:pt-48">
            {/* Background layers */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${caseStudiesContent.hero.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918]/60 via-[#061244]/40 to-[#030b1e]/60" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#020918]/40 via-[#020918]/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bricolage"
                    >
                        {caseStudiesContent.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-2 text-lg text-slate-200 sm:text-xl"
                    >
                        {caseStudiesContent.hero.subtitle}
                    </motion.p>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 max-w-xl text-base text-slate-300 sm:text-lg"
                    >
                        {caseStudiesContent.hero.description}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Case Studies Grid Component ─────────────── */
/**
 * CaseStudiesGrid - Grid layout for all case studies
 * 
 * Data Source:
 * - sectionTitle: From caseStudiesContent.sectionTitle
 * - studies: Array of case study objects from caseStudiesContent.studies
 * 
 * Layout:
 * - Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * - Staggered animation for cards
 * - Consistent spacing and alignment
 * - Section title with blue theme
 * 
 * Features:
 * - Scroll-triggered animations
 * - Hover effects on individual cards
 * - External links to detailed case study pages
 */
function CaseStudiesGrid() {
    const { sectionTitle, studies } = caseStudiesContent;

    return (
        <section className="bg-[#f8fafc] py-16 sm:py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-blue-900">
                        {sectionTitle}
                    </h2>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {studies.map((study, index) => (
                        <CaseStudyCard key={study.title} study={study} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Main Case Studies Page Component ─────────────── */
/**
 * CaseStudiesPage - Main page component for case studies section
 * 
 * Structure:
 * 1. Navbar - Site navigation
 * 2. Main content area:
 *    - CaseStudiesHero - Hero section with background image
 *    - CaseStudiesGrid - Grid of case study cards
 * 3. Footer - Site footer
 * 
 * Features:
 * - Clean URL: /insights/case-studies (rewritten to /case-studies)
 * - Responsive design across all devices
 * - Smooth animations and transitions
 * - External links to detailed case study pages
 * - Integration with main site navigation
 * 
 * Related files:
 * - /content/case-studies.ts - Case studies data configuration
 * - /insights/page.tsx - Parent insights page
 * - next.config.ts - URL rewrites configuration
 */
export default function CaseStudiesPage() {
    return (
        <>
            <Navbar />
            <main>
                <CaseStudiesHero />
                <CaseStudiesGrid />
            </main>
            <Footer />
        </>
    );
}
