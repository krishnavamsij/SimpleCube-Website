/**
 * BLOG MODULE
 * 
 * This component displays blog posts and thought leadership content from Hyniva.
 * Each blog post showcases expertise, insights, and industry trends.
 * 
 * Structure:
 * - Hero section with background image and animated content
 * - Grid layout of blog post cards
 * - Individual cards with images, titles, excerpts, and metadata
 * 
 * Features:
 * - Animated components using Framer Motion
 * - Responsive grid layout (2 columns on tablet, 3 on desktop)
 * - External links to detailed blog posts
 * - Image hover effects with scale transformation
 * - Author and date metadata
 * 
 * URL: /insights/blog (rewritten to /blog)
 */

"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogContent } from "@/content/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ─────────────── Blog Hero Section ─────────────── */
/**
 * BlogHero - Hero section for blog page
 * 
 * Features:
 * - Background image from blogContent.hero.backgroundImage
 * - Gradient overlays for text readability
 * - Animated title and subtitle using Framer Motion
 * - Responsive typography scaling
 * - Consistent with other page heroes in the site
 * 
 * Content:
 * - Dynamic title from blogContent.hero.title
 * - Subtitle and description from content configuration
 * - Dark theme with blue accent colors
 */
function BlogHero() {
    return (
        <section className="relative overflow-hidden bg-[#030b1e] py-20 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-44 lg:py-36 lg:pt-48">
            {/* Background layers */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${blogContent.hero.backgroundImage}')` }}
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
                        {blogContent.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-2 text-lg text-slate-200 sm:text-xl"
                    >
                        {blogContent.hero.subtitle}
                    </motion.p>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 max-w-xl text-base text-slate-300 sm:text-lg"
                    >
                        {blogContent.hero.description}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Blog Card Component ─────────────── */
/**
 * BlogCard - Individual card for displaying a blog post
 * 
 * Props:
 * - post: Blog post object containing title, excerpt, image, date, author, and href
 * - index: Position in the grid for staggered animations
 * 
 * Features:
 * - Image with hover scale effect
 * - Linked title and image for better UX
 * - Author and date metadata
 * - Excerpt text with fixed height
 * - "Read more" link with arrow icon
 * - Animated entry using scrollReveal variant
 * 
 * Data source: blogContent.posts from /content/blog.ts
 */
function BlogCard({
    post,
    index,
}: {
    post: (typeof blogContent.posts)[number];
    index: number;
}) {
    return (
        <motion.div
            variants={scrollReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="overflow-hidden">
                <Link href={post.href} className="block">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 text-sm text-slate-500">
                    {post.date}
                </div>
                <h3 className="mb-3 text-xl font-bold leading-snug text-blue-900">
                    <Link href={post.href} className="hover:text-blue-700 transition-colors">
                        {post.title}
                    </Link>
                </h3>
                <div className="mb-4 text-sm text-slate-500">
                    <Link href="https://products.hyniva.com/author/hyniva/" className="hover:text-blue-600 transition-colors">
                        {post.author}
                    </Link>
                </div>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
                    {post.excerpt}
                </p>
                <div className="mt-auto">
                    <Link
                        href={post.href}
                        className="inline-flex items-center text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors"
                    >
                        Read more
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────── Blog Grid Component ─────────────── */
/**
 * BlogGrid - Grid layout for all blog posts
 * 
 * Data Source:
 * - sectionTitle: From blogContent.sectionTitle
 * - posts: Array of blog post objects from blogContent.posts
 * 
 * Layout:
 * - Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * - Staggered animation for cards
 * - Consistent spacing and alignment
 * - Section title with blue theme
 * 
 * Features:
 * - Scroll-triggered animations
 * - Hover effects on images and cards
 * - External links to detailed blog posts
 * - Author and date metadata display
 */
function BlogGrid() {
    const { sectionTitle, posts } = blogContent;

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
                    {posts.map((post, index) => (
                        <BlogCard key={post.title} post={post} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Main Blog Page Component ─────────────── */
/**
 * BlogPage - Main page component for blog section
 * 
 * Structure:
 * 1. Navbar - Site navigation
 * 2. Main content area:
 *    - BlogHero - Hero section with background image
 *    - BlogGrid - Grid of blog post cards
 * 3. Footer - Site footer
 * 
 * Features:
 * - Clean URL: /insights/blog (rewritten to /blog)
 * - Responsive design across all devices
 * - Smooth animations and transitions
 * - External links to detailed blog posts
 * - Image hover effects and metadata display
 * - Integration with main site navigation
 * 
 * Related files:
 * - /content/blog.ts - Blog posts data configuration
 * - /insights/page.tsx - Parent insights page
 * - next.config.ts - URL rewrites configuration
 */
export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main>
                <BlogHero />
                <BlogGrid />
            </main>
            <Footer />
        </>
    );
}
