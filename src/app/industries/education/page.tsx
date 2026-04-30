"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Bot, Monitor, Cloud, ArrowUpRightIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { educationContent } from "@/content/education";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ─────────────── Icon Map ─────────────── */

const iconMap: Record<string, React.ElementType> = {
    Notepad: BookOpen,
    Robot: Bot,
    Blackboard: Monitor,
    PeopleOnCloud: Cloud,
};

/* ─────────────── Service Card (WordPress key-icon-box style) ─────────────── */

function ServiceCard({
    service,
    index,
}: {
    service: (typeof educationContent.services)[number];
    index: number;
}) {
    const IconComponent = iconMap[service.icon] || BookOpen;

    return (
        <motion.div
            variants={scrollReveal}
            className="key-icon-box icon-default icon-top cont-left ib-hover-1 group flex flex-col bg-white border border-[#e8e8e8] rounded-[4px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF3D42]"
        >
            <div className="ib-wrapper flex flex-col p-6 min-h-[354px]">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                    <IconComponent className="h-8 w-8 text-red-600" />
                </div>
                <h5 className="service-heading text-lg font-bold leading-snug mb-3 text-blue-900">
                    {service.title}
                </h5>
                <p className="text-sm leading-relaxed text-slate-600 flex-1">
                    {service.description}
                </p>
            </div>
        </motion.div>
    );
}

/* ─────────────── Hero Section ─────────────── */

function EducationHero() {
    return (
        <section className="relative overflow-hidden py-20 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-44 lg:py-36 lg:pt-48">
            {/* Background layers */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${educationContent.hero.backgroundImage}')` }}
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
                        {educationContent.hero.title}
                    </motion.h1>
                    <motion.h6
                        variants={fadeInUp}
                        className="mt-4 text-lg text-slate-200 sm:text-xl font-normal"
                    >
                        {educationContent.hero.subtitle}
                    </motion.h6>
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8"
                    >
                        <Link
                            href={educationContent.hero.contactButton.href}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-900 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                        >
                            {educationContent.hero.contactButton.text}
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Intro Section ─────────────── */

function EducationIntro() {
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
                        {educationContent.intro.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                        {educationContent.intro.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Services Grid ─────────────── */

function ServicesGrid() {
    const { services } = educationContent;

    return (
        <section className="bg-[#f3f3f3] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-12"
                >
                    {services.slice(0, 3).map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </motion.div>
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-12"
                >
                    {services.slice(3).map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index + 3} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Page ─────────────── */

export default function EducationPage() {
    return (
        <>
            <Navbar />
            <main>
                <EducationHero />
                <EducationIntro />
                <ServicesGrid />
            </main>
            <Footer />
        </>
    );
}
