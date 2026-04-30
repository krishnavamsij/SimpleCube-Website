/**
 * SERVICES MODULE
 * 
 * This component displays all services that Hyniva offers.
 * Each service showcases expertise and specialized solutions for that area.
 * 
 * Structure:
 * - Hero section with background image and animated content
 * - Introduction section explaining service expertise
 * - Grid layout of service cards
 * - CTA section with call-to-action button
 * 
 * Features:
 * - Animated components using Framer Motion
 * - Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
 * - Service cards with descriptions and explore buttons
 * - Background images with gradient overlays
 * - Consistent styling with site theme
 * 
 * URL: /services
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { servicesListingContent } from "@/content/services-listing";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ------------------- Service Card Component ------------------- */

function ServiceCard({
    service,
    index,
}: {
    service: (typeof servicesListingContent.services)[number];
    index: number;
}) {
    return (
        <motion.div
            variants={scrollReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <service.icon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold leading-snug mb-3 text-blue-900">
                {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 flex-1 mb-4">
                {service.description}
            </p>
            <Link
                href={service.href}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
                Explore
                <ArrowUpRightIcon className="h-3 w-3" />
            </Link>
        </motion.div>
    );
}

/* ------------------- Hero Section ------------------- */

function ServicesHero() {
    return (
        <section className="relative overflow-hidden py-20 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-44 lg:py-36 lg:pt-48">
            {/* Background layers */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${servicesListingContent.hero.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918]/70 via-[#061244]/50 to-[#030b1e]/70" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(52,81,149,0.2)_0%,transparent_65%)]" />
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#020918]/50 via-[#020918]/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bricolage"
                    >
                        {servicesListingContent.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 text-lg text-slate-200 sm:text-xl"
                    >
                        {servicesListingContent.hero.subtitle}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Intro Section ------------------- */

function ServicesIntro() {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-4xl"
                >
                    <h3 className="text-xl font-bold leading-snug sm:text-2xl md:text-3xl mb-4 text-blue-900">
                        {servicesListingContent.intro.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                        {servicesListingContent.intro.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Services Grid ------------------- */

function ServicesGrid() {
    const { services } = servicesListingContent;

    return (
        <section className="bg-[#f3f3f3] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((service: (typeof servicesListingContent.services)[number], index: number) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- CTA Section ------------------- */

function ServicesCTA() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-24">
            {/* Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${servicesListingContent.cta.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#345195]/80 via-[#2563EB]/70 to-[#345195]/80" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center"
                >
                    <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl font-bricolage">
                        {servicesListingContent.cta.title}
                    </h3>
                    <div className="mt-8 flex justify-center">
                        <Link
                            href={servicesListingContent.cta.buttonHref}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900 shadow-lg transition-all hover:shadow-xl hover:scale-105"
                        >
                            {servicesListingContent.cta.buttonText}
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Page ------------------- */

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main>
                <ServicesHero />
                <ServicesIntro />
                <ServicesGrid />
                <ServicesCTA />
            </main>
            <Footer />
        </>
    );
}
