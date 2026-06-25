"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, Globe, Monitor, Database, Users, Brain, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { microsoftServicesContent } from "@/content/microsoft-services";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ------------------- Icon Map ------------------- */

const iconMap: Record<string, React.ElementType> = {
    Globe: Globe,
    Monitor: Monitor,
    Database: Database,
    Users: Users,
    Brain: Brain,
};

/* ------------------- Service Card ------------------- */

function ServiceCard({
    service,
    index,
}: {
    service: (typeof microsoftServicesContent.services)[number];
    index: number;
}) {
    // Direct icon mapping to ensure it works
    const getIcon = (iconName: string) => {
        switch(iconName) {
            case 'Globe': return Globe;
            case 'Monitor': return Monitor;
            case 'Database': return Database;
            case 'Users': return Users;
            case 'Brain': return Brain;
            default: return Globe;
        }
    };
    
    const IconComponent = getIcon(service.icon);

    return (
        <motion.div
            variants={scrollReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <IconComponent className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold leading-snug mb-3 text-blue-900">
                {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 flex-1">
                {service.description}
            </p>
        </motion.div>
    );
}

/* ------------------- Case Study Card ------------------- */

function CaseStudyCard({
    caseStudy,
    index,
}: {
    caseStudy: (typeof microsoftServicesContent.caseStudies)[number];
    index: number;
}) {
    return (
        <motion.div
            variants={scrollReveal}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {caseStudy.type}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-red-600 transition-colors">
                    {caseStudy.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {caseStudy.description}
                </p>
                <Link
                    href={caseStudy.link}
                    className="inline-flex items-center gap-2 text-blue-900 font-semibold text-sm hover:text-red-600 transition-colors"
                >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}

/* ------------------- Hero Section ------------------- */

function MicrosoftServicesHero() {
    return (
        <section className="relative overflow-hidden py-20 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-44 lg:py-36 lg:pt-48">
            {/* Background layers */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${microsoftServicesContent.hero.backgroundImage}')` }}
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
                        {microsoftServicesContent.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 text-lg text-slate-200 sm:text-xl"
                    >
                        {microsoftServicesContent.hero.subtitle}
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8"
                    >
                        <Link
                            href={microsoftServicesContent.hero.contactButton.href}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-900 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                        >
                            {microsoftServicesContent.hero.contactButton.text}
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Intro Section ------------------- */

function MicrosoftServicesIntro() {
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
                        {microsoftServicesContent.intro.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                        {microsoftServicesContent.intro.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Services Grid ------------------- */

function ServicesGrid() {
    const { services } = microsoftServicesContent;

    return (
        <section className="bg-[#f3f3f3] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12"
                >
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-blue-900">
                        Our Capabilities
                    </h2>
                </motion.div>
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Case Studies Section ------------------- */

function CaseStudiesSection() {
    const { caseStudies } = microsoftServicesContent;

    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12"
                >
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-blue-900">
                        Case Studies
                    </h2>
                </motion.div>
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                    {caseStudies.map((caseStudy, index) => (
                        <CaseStudyCard key={caseStudy.title} caseStudy={caseStudy} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Delivery Enablers ------------------- */

function DeliveryEnablers() {
    const { deliveryEnablers } = microsoftServicesContent;

    return (
        <section className="bg-[#f3f3f3] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12"
                >
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-blue-900">
                        {deliveryEnablers.title}
                    </h2>
                </motion.div>
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center"
                >
                    {deliveryEnablers.logos.map((logo, index) => (
                        <motion.div
                            key={logo.name}
                            variants={scrollReveal}
                            className="flex items-center justify-center"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={100}
                                height={50}
                                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}


/* ------------------- Page ------------------- */

export default function MicrosoftServicesPage() {
    return (
        <>
            <Navbar />
            <main>
                <MicrosoftServicesHero />
                <MicrosoftServicesIntro />
                <ServicesGrid />
                <CaseStudiesSection />
                <DeliveryEnablers />
            </main>
            <Footer />
        </>
    );
}
