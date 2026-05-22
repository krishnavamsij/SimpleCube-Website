/**
 * INSIGHTS MODULE
 * 
 * This module handles the insights section of the Hyniva website.
 * It provides a centralized hub for case studies, blog posts, and industry insights.
 * 
 * Structure:
 * - Main insights page (/insights) - Overview of all content types
 * - Case studies (/insights/case-studies) - Detailed customer success stories
 * - Blogs (/insights/blogs) - Thought leadership and technical articles
 * 
 * Features:
 * - Clean URL structure with rewrites in next.config.ts
 * - Responsive grid layout for content cards
 * - Animated components for better user experience
 * - Navigation integration with main site structure
 */

"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRightIcon, BookOpen, FileText, PlayCircle } from "lucide-react";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ─────────────── Insight Card Component ─────────────── */
/**
 * InsightCard - Reusable card component for displaying insight content
 * 
 * Props:
 * - title: Card title (e.g., "Case Studies", "Blog")
 * - description: Brief description of the content type
 * - href: Link to the detailed page
 * - icon: Lucide React icon component
 * - bgColor: Tailwind background color class
 * - borderColor: CSS color for borders and accents
 * 
 * Used in: InsightsGrid component
 */
function InsightCard({
    title,
    description,
    href,
    icon: Icon,
    bgColor,
    borderColor,
}: {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    bgColor: string;
    borderColor: string;
}) {
    return (
        <motion.div
            variants={scrollReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            style={{ borderColor }}
        >
            <div className={`flex-1 p-8 ${bgColor}`}>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                    <Icon className="h-8 w-8" style={{ color: borderColor }} />
                </div>
                <h3 className="mb-4 text-2xl font-bold leading-snug text-slate-900">
                    {title}
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                    {description}
                </p>
            </div>
            <div className="p-6 bg-white">
                <Link
                    href={href}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    style={{ 
                        backgroundColor: borderColor,
                        color: 'white'
                    }}
                >
                    Explore
                    <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}

/* ─────────────── Insights Hero Section ─────────────── */
/**
 * InsightsHero - Hero section for the insights landing page
 * 
 * Features:
 * - Dark background with gradient overlays for visual depth
 * - Animated title and description using Framer Motion
 * - Responsive typography scaling across device sizes
 * - Consistent with other page heroes in the site
 * 
 * Content:
 * - Main title: "Insights & Resources"
 * - Description: Explains the purpose of the insights section
 * - Background: Dark theme matching site design system
 */
function InsightsHero() {
    return (
        <section className="relative overflow-hidden bg-[#030b1e] py-20 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-44 lg:py-36 lg:pt-48">
            {/* Background layers */}
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
                        Insights & Resources
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 max-w-2xl text-lg text-slate-200 sm:text-xl"
                    >
                        Explore our case studies, blog posts, and industry insights. Access content both from the main navigation and organized within the insights section.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Insights Grid Component ─────────────── */
/**
 * InsightsGrid - Grid layout displaying all insight content types
 * 
 * Data Structure:
 * Each insight object contains:
 * - title: Display name for the content type
 * - description: Brief explanation of what users will find
 * - href: Link to the detailed content page
 * - icon: Lucide React icon for visual representation
 * - bgColor: Tailwind background color for card styling
 * - borderColor: Theme color for borders and accents
 * 
 * Layout:
 * - Responsive grid (1 column on mobile, 2 on desktop)
 * - Animated cards with hover effects
 * - Consistent spacing and alignment
 */
function InsightsGrid() {
    const insights = [
        {
            title: "Case Studies",
            description: "Real-world examples of how we've helped organizations overcome complex challenges and achieve their digital transformation goals.",
            href: "/insights/case-studies",
            icon: FileText,
            bgColor: "bg-blue-50",
            borderColor: "#1e90ff",
        },
        {
            title: "Blogs",
            description: "Thought leadership, industry trends, and technical insights from our team of experts on Salesforce, AWS, AI, and digital transformation.",
            href: "/insights/blogs",
            icon: BookOpen,
            bgColor: "bg-blue-50",
            borderColor: "#1e90ff",
        },
        {
            title: "News",
            description: "Explore the latest news, strategic announcements, technology updates and milestones from Hyniva.",
            href: "/insights/news",
            icon: FileText,
            bgColor: "bg-blue-50",
            borderColor: "#1e90ff",
        },
        {
            title: "Podcast",
            description: "Listen and watch Hyniva's leaders and industry experts discuss the future of AI, enterprise platforms, and credit union innovation.",
            href: "/insights/podcast",
            icon: PlayCircle,
            bgColor: "bg-blue-50",
            borderColor: "#1e90ff",
        },
    ];

    return (
        <section className="bg-[#f8fafc] py-16 sm:py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12 text-center"
                >
                    <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-blue-900">
                        Explore Our Content
                    </h2>
                    <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                        Access our insights from both the main navigation and the insights section. Choose your preferred viewing location.
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
                >
                    {insights.map((insight) => (
                        <InsightCard key={insight.title} {...insight} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Main Insights Page Component ─────────────── */
/**
 * InsightsPage - Main page component for the insights section
 * 
 * Structure:
 * 1. Navbar - Site navigation with insights integration
 * 2. Main content area:
 *    - InsightsHero - Hero section with title and description
 *    - InsightsGrid - Grid of content type cards
 * 3. Footer - Site footer with links and information
 * 
 * Features:
 * - Clean URL: /insights
 * - Responsive design across all devices
 * - Smooth animations and transitions
 * - Integrated with site navigation structure
 * 
 * Related files:
 * - /insights/case-studies/page.tsx - Case studies listing
 * - /insights/blogs/page.tsx - Blog posts listing
 * - next.config.ts - URL rewrites for clean paths
 */
export default function InsightsPage() {
    return (
        <>
            <Navbar />
            <main>
                <InsightsHero />
                <InsightsGrid />
            </main>
            <Footer />
        </>
    );
}
