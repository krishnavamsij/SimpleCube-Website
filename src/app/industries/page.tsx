/**
 * INDUSTRIES MODULE
 * 
 * This component displays all industries that Hyniva serves.
 * Each industry showcases expertise and specialized solutions for that sector.
 * 
 * Structure:
 * - Hero section with background image and animated content
 * - Introduction section explaining industry expertise
 * - Grid layout of industry cards
 * 
 * Features:
 * - Animated components using Framer Motion
 * - Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
 * - Industry cards with descriptions and explore buttons
 * - Background images with gradient overlays
 * - Consistent styling with site theme
 * 
 * URL: /industries
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { industriesListingContent } from "@/content/industries-listing";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ─────────────── Industry Card Component ─────────────── */
/**
 * IndustryCard - Individual card for displaying an industry
 * 
 * Props:
 * - industry: Industry object containing title, description, and href
 * - index: Position in the grid for staggered animations
 * 
 * Features:
 * - Hover effects with translation and shadow changes
 * - Gradient button with arrow icon
 * - Animated entry using scrollReveal variant
 * - Responsive button sizing
 * 
 * Data source: industriesListingContent.industries from /content/industries-listing.ts
 */
function IndustryCard({
    industry,
    index,
}: {
    industry: (typeof industriesListingContent.industries)[number];
    index: number;
}) {
    return (
        <motion.div
            variants={scrollReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold leading-snug text-[#0A2F52]">
                    {industry.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {industry.description}
                </p>
                <div className="mt-5">
                    <Link
                        href={industry.href}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0A2F52] to-[#135498] px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
                    >
                        Explore
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────── Industries Hero Section ─────────────── */
/**
 * IndustriesHero - Hero section for industries page
 * 
 * Features:
 * - Background image from industriesListingContent.hero.backgroundImage
 * - Gradient overlays for text readability
 * - Animated title and description using Framer Motion
 * - Responsive typography scaling
 * - Consistent with other page heroes in the site
 * 
 * Content:
 * - Dynamic title from industriesListingContent.hero.title
 * - Description from content configuration
 * - Dark theme with blue accent colors
 */
function IndustriesHero() {
    return (
        <section className="relative overflow-hidden py-20 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-44 lg:py-36 lg:pt-48">
            {/* Background layers */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${industriesListingContent.hero.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918]/70 via-[#061244]/50 to-[#0A2F52]/70" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(52,81,149,0.2)_0%,transparent_65%)]" />
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#020918]/50 via-[#020918]/30 to-transparent" />

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
                        {industriesListingContent.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 max-w-2xl text-lg text-slate-200 sm:text-xl"
                    >
                        {industriesListingContent.hero.description}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Industries Introduction Section ─────────────── */
/**
 * IndustriesIntro - Introduction section explaining industry expertise
 * 
 * Features:
 * - Clean white background
 * - Centered content layout
 * - Animated title and description
 * - Responsive typography
 * 
 * Content:
 * - Title from industriesListingContent.intro.title
 * - Description from industriesListingContent.intro.description
 * - Explains Hyniva's cross-industry expertise
 */
function IndustriesIntro() {
    return (
        <section className="bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center"
                >
                    <h3 className="text-xl font-bold leading-snug sm:text-2xl md:text-3xl text-[#0A2F52]">
                        {industriesListingContent.intro.title}
                    </h3>
                    <p className="mt-4 max-w-4xl mx-auto text-base leading-relaxed text-slate-600 sm:text-lg">
                        {industriesListingContent.intro.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Industries Grid Component ─────────────── */
/**
 * IndustriesGrid - Grid layout for all industries
 * 
 * Data Source:
 * - industries: Array of industry objects from industriesListingContent.industries
 * 
 * Layout:
 * - Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * - Staggered animation for cards
 * - Consistent spacing and alignment
 * - Light gray background (#f8fafc)
 * 
 * Features:
 * - Scroll-triggered animations
 * - Hover effects on individual cards
 * - Industry cards with explore buttons
 */
function IndustriesGrid() {
    const { industries } = industriesListingContent;

    return (
        <section className="bg-[#f8fafc] py-16 sm:py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                    {industries.map((industry, index) => (
                        <IndustryCard key={industry.title} industry={industry} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Main Industries Page Component ─────────────── */
/**
 * IndustriesPage - Main page component for industries section
 * 
 * Structure:
 * 1. Navbar - Site navigation
 * 2. Main content area:
 *    - IndustriesHero - Hero section with background image
 *    - IndustriesIntro - Introduction section
 *    - IndustriesGrid - Grid of industry cards
 * 3. Footer - Site footer
 * 
 * Features:
 * - Clean URL: /industries
 * - Responsive design across all devices
 * - Smooth animations and transitions
 * - Industry expertise showcase
 * - Integration with main site navigation
 * 
 * Related files:
 * - /content/industries-listing.ts - Industries data configuration
 * - Individual industry pages (if implemented)
 * - next.config.ts - URL configuration
 */
export default function IndustriesPage() {
    return (
        <>
            <Navbar />
            <main>
                <IndustriesHero />
                <IndustriesIntro />
                <IndustriesGrid />
            </main>
            <Footer />
        </>
    );
}
