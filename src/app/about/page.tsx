/**
 * ABOUT US PAGE
 * 
 * This component displays comprehensive information about Hyniva.
 * Features dynamic section rendering with smooth animations.
 * 
 * Structure:
 * - Hero section with background image and animated content
 * - Introduction section with mission and key metrics
 * - Core Values grid showcasing company principles
 * - Leadership Team section with executive profiles
 * - CTA section encouraging career applications
 * 
 * Features:
 * - Animated components using Framer Motion
 * - Responsive grid layouts
 * - Section navigation with scroll effects
 * - Leadership profiles with images and bios
 * - Consistent styling with site theme
 * 
 * URL: /about
 * Navigation:
 * - Our Leaders link navigates to #leadership section or /about#leadership
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, Zap, Lightbulb, Users, Target, Shield, Globe, Linkedin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { aboutContent } from "@/content/about";
import { useCountUp } from "@/lib/use-count-up";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ─────────────── Icon Map ─────────────── */

const iconMap: Record<string, React.ElementType> = {
    Zap,
    Lightbulb,
    Users,
    Target,
    Shield,
    Globe,
};

/* ─────────────── History Timeline Component ─────────────── */

function HistoryTimeline() {
    const { history } = aboutContent;

    return (
        <section className="timeline-section">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="timeline-title"
                    style={{ color: '#345195' }}
                >
                    {history.sectionTitle}
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="timeline-subtitle"
                    style={{ color: '#345195' }}
                >
                    {history.sectionSubtitle}
                </motion.p>

                <div className="timeline">
                    {history.timeline.map((item, index) => (
                        <motion.div
                            key={item.year}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={index * 0.1}
                            className={`timeline-item ${index % 2 === 0 ? '' : 'right'}`}
                        >
                            <div className="timeline-content">
                                <div className="timeline-year" style={{ color: '#345195' }}>{item.year}</div>
                                <h4 className="timeline-item-title" style={{ color: '#345195' }}>{item.title}</h4>
                                <p className="timeline-description" style={{ color: '#345195' }}>{item.description}</p>
                                <div className="timeline-icon">
                                    {item.image ? (
                                        <div className="icon-image">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="icon-box">
                                            {item.emoji}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
                                                    
/* ─────────────── Value Card Component ─────────────── */

function ValueCard({
    value,
    index,
}: {
    value: (typeof aboutContent.values)[number];
    index: number;
}) {
    // Check if the icon is an iconsmind class (contains "iconsmind-")
    const isIconsmind = value.icon.includes('iconsmind-');

    return (
        <motion.div
            variants={scrollReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                {isIconsmind ? (
                    <i className={`${value.icon} text-2xl text-blue-600`}></i>
                ) : (
                    // Fallback to Lucide icons if iconsmind not available
                    (() => {
                        const IconComponent = iconMap[value.icon] || Zap;
                        return <IconComponent className="h-8 w-8 text-blue-600" />;
                    })()
                )}
            </div>
            <h3 className="text-lg font-bold leading-snug mb-3 text-blue-900">
                {value.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 flex-1">
                {value.description}
            </p>
        </motion.div>
    );
}

/* ─────────────── Leader Card Component ─────────────── */

function LeaderCard({
    leader,
    index,
}: {
    leader: (typeof aboutContent.leadership.team)[number];
    index: number;
}) {
    return (
        <motion.div
            variants={scrollReveal}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
            {/* Leader Image at Top */}
            <div className="flex justify-center mb-4">
                <div className="relative w-20 h-20 bg-slate-100 rounded-full overflow-hidden">
                    {leader.image ? (
                        <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            <Users className="h-6 w-6" />
                        </div>
                    )}
                </div>
            </div>

            {/* Leader Info Below Image */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {leader.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-2">
                    {leader.title}
                </p>
                <p className="text-sm text-slate-500 mb-3">
                    {leader.specialization}
                </p>
                <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {leader.bio}
                </p>
                {/* LinkedIn Link */}
                {leader.linkedin && (
                    <div className="mt-4 flex justify-center">
                        <a
                            href={leader.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded"
                        >
                            <span className="text-xs font-bold text-blue-600">in</span>
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/* ─────────────── Animated Counter Component ─────────────── */

function AnimatedCounter({
    stat,
}: {
    stat: (typeof aboutContent.intro.highlights)[number];
}) {
    const { count, ref } = useCountUp(parseInt(stat.metric), 2000, true);

    return (
        <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center px-2 py-4"
            ref={ref}
        >
            {/* Icon — fixed size, always same height */}
            <div className="mb-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-50">
                <i className={`${stat.icon} text-2xl`} style={{ color: stat.iconColor }}></i>
            </div>
            {/* Number — fixed line height so all numbers sit at same level */}
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 leading-none mb-2">
                {count.toLocaleString()}{stat.suffix}
            </p>
            {/* Label — fixed height = exactly 2 lines so ALL cards are consistent */}
            <p
                className="text-xs sm:text-sm text-slate-600 w-full"
                style={{
                    whiteSpace: "pre-line",
                    height: "2.8em",
                    lineHeight: "1.4em",
                    overflow: "hidden",
                }}
            >
                {stat.label}
            </p>
        </motion.div>
    );
}

/* ─────────────── About Hero Section ─────────────── */

function AboutHero() {
    return (
        <section className="relative overflow-hidden py-16 pt-24 sm:py-20 sm:pt-32 md:py-24 md:pt-40 lg:py-28 lg:pt-44 xl:py-32 xl:pt-48">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${aboutContent.hero.backgroundImage}')` }}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-white font-bricolage leading-tight"
                    >
                        {aboutContent.hero.title}
                    </motion.h1>
                                    </motion.div>
            </div>
        </section>
    );
}

function AboutIntro() {
    return (
        <section className="bg-white py-12 sm:py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* 50-50 Layout: Content Left, Image Right */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-8xl mb-8 sm:mb-12 lg:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
                >
                    {/* Content - Left Side */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-4 sm:mb-6 text-blue-900">
                            {aboutContent.intro.title}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-600">
                            {aboutContent.intro.description}
                        </p>
                    </div>

                    {/* Image - Right Side */}
                    {aboutContent.intro.valuesImage && (
                        <div className="order-1 lg:order-2">
                            <Image
                                src={aboutContent.intro.valuesImage}
                                alt="Hyniva Values"
                                width={800}
                                height={522}
                                className="rounded-lg shadow-lg w-full h-auto object-cover"
                            />
                        </div>
                    )}
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
                >
                    {aboutContent.intro.highlights.map((stat, index) => (
                        <AnimatedCounter key={index} stat={stat} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Core Values Section ─────────────── */

function CoreValues() {
    return (
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-4 text-blue-900">
                        Our Values
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
                        These principles guide everything we do, from how we work with clients to how we support our teams.
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                    {aboutContent.values.map((value, index) => (
                        <ValueCard key={value.title} value={value} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Leadership Section ─────────────── */

function Leadership() {
    return (
        <section id="leadership" className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-blue-900 mb-4">
                        {aboutContent.leadership.sectionTitle}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                        {aboutContent.leadership.sectionDescription}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center"
                >
                    {aboutContent.leadership.team.map((leader, index) => (
                        <LeaderCard key={leader.name} leader={leader} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Main About Page Component ─────────────── */

/**
 * AboutPage - Main page component for About Us section
 * 
 * Structure:
 * 1. Navbar - Site navigation
 * 2. Main content area:
 *    - AboutHero - Hero section with background image
 *    - AboutIntro - Introduction section with mission and metrics
 *    - CoreValues - Grid of core company values
 *    - Leadership - Team leadership profiles (scrollable section)
 *    - AboutCTA - Call-to-action section
 * 3. Footer - Site footer
 * 
 * Features:
 * - Clean URL: /about
 * - Responsive design across all devices
 * - Smooth animations and transitions
 * - Leadership section with ID for anchor navigation (#leadership)
 * - Integration with main site navigation
 * 
 * Related files:
 * - /content/about.ts - About page data configuration
 * - Navigation: "Our Leaders" link points to /about#leadership
 */


export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                <AboutHero />
                <AboutIntro />
                <CoreValues />
                <Leadership />
                <HistoryTimeline />
            </main>
            <Footer />
        </>
    );
}
