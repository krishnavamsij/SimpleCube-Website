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


/* ------------------- Page ------------------- */

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main>
                <ServicesIntro />
                <ServicesGrid />
            </main>
            <Footer />
        </>
    );
}
