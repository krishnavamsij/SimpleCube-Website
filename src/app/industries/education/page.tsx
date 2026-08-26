"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Users, CreditCard, Cloud, Smartphone, TrendingUp, Monitor, Calculator, Shield, RefreshCw, BarChart, Network, Route, BrainCircuit, Zap, LineChart, BookOpen, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/faq";
import { educationFaqs } from "@/content/industry-faqs";
import { educationContent } from "@/content/education";
import { caseStudiesContent } from "@/content/case-studies";
import { CONTAINER_CLASS } from "@/lib/container-utils";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Bot,
    Users,
    CreditCard,
    Cloud,
    Smartphone,
    TrendingUp,
    Monitor,
    Calculator,
    Shield,
    RefreshCw,
    BarChart,
    Network,
    Route,
    BrainCircuit,
    Zap,
    LineChart,
    BookOpen,
    GraduationCap
};

function EducationHero() {
    return (
        <section className="relative overflow-hidden py-20 pt-28 sm:py-40 sm:pt-52 md:py-48 md:pt-60 lg:py-56 lg:pt-72 flex items-center min-h-screen">
            {/* Background layers */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${educationContent.hero.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/85 via-[#040c2c]/80 to-[#02040a]/92" />

            {/* Content */}
            <div className={`relative z-10 ${CONTAINER_CLASS} text-center`}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center space-y-6 sm:space-y-10 md:space-y-12"
                >
                    <motion.div variants={fadeInUp} className="flex justify-center">
                        <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 px-5 py-2 rounded-full text-xs font-bold tracking-[0.25em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                            {educationContent.hero.badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bricolage w-full max-w-5xl mx-auto text-center"
                        dangerouslySetInnerHTML={{ __html: educationContent.hero.title }}
                    />

                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 text-base sm:text-lg md:text-[17px] lg:text-[18px] 2xl:text-[20px] text-slate-200 w-full max-w-3xl mx-auto pt-2 text-center"
                        dangerouslySetInnerHTML={{ __html: educationContent.hero.subtitle }}
                    />
                </motion.div>
            </div>
        </section>
    );
}

function AlternatingSections() {
    return (
        <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-white">
            <div className={`${CONTAINER_CLASS} space-y-32`}>
                {educationContent.alternatingSections.map((section, index) => (
                    <motion.div
                        key={index}
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className={`flex flex-col lg:flex-row gap-16 items-center ${section.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}
                    >
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="aspect-[4/3] rounded-[32px] bg-slate-100 overflow-hidden relative shadow-md">
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-[21px] sm:text-3xl md:text-[32px] font-extrabold text-[#030B3B] mb-6 sm:mb-8 leading-[1.25]">
                                {section.title}
                            </h2>
                            <div className="space-y-6">
                                {section.content.map((paragraph, pIndex) => (
                                    <p key={pIndex} className="text-[17px] text-slate-600 font-medium leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function EducationOfferings() {
    return (
        <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#ECF6FF]">
            <div className={`${CONTAINER_CLASS} text-left md:text-center`}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-5xl mx-auto mb-10"
                >
                    <h2 className="text-[29px] sm:text-[45px] lg:text-[45px] 2xl:text-[53px] font-extrabold text-[#030B3B] mb-6 tracking-tight leading-[1.1] sm:whitespace-nowrap">
                        {educationContent.offerings.title}
                    </h2>
                    <p className="text-base sm:text-lg lg:text-[18px] 2xl:text-[20px] text-slate-700 font-medium leading-[1.6]">
                        {educationContent.offerings.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 text-left"
                >
                    {educationContent.offerings.items.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || BookOpen;
                        return (
                            <motion.div
                                key={index}
                                variants={scrollReveal}
                                className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#030B3B]/06 shadow-[0_10px_35px_rgba(3,11,59,0.03)] hover:border-[#1e90ff]/20 hover:shadow-[0_20px_50px_rgba(3,11,59,0.06)] transition-all duration-300 group flex flex-col h-full"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#ECF6FF] flex items-center justify-center text-[#1e90ff] mb-6 border border-[#1e90ff]/20 group-hover:bg-[#1e90ff] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <h3 
                                    className="text-[16px] sm:text-[17px] lg:text-[15px] xl:text-[18px] 2xl:text-[19px] font-bold text-[#030B3B] mb-4 w-full"
                                    title={item.title}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-[15px] xl:text-[16px] text-slate-600 font-medium leading-relaxed flex-1">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

function ProvenImpact() {
    return (
        <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#0A102E] relative overflow-hidden">
            {/* Top Glow matching Why Hyniva */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

            <div className={`${CONTAINER_CLASS} text-left md:text-center relative z-10`}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-3xl lg:max-w-4xl mx-auto mb-10 md:mb-16 text-left md:text-center px-4"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 md:mb-6">
                        {educationContent.impact.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium leading-relaxed">
                        {educationContent.impact.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                >
                    {educationContent.impact.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={scrollReveal}
                            className="flex flex-col items-center text-center p-5 sm:p-6 bg-white/[0.04] sm:bg-transparent rounded-2xl border border-white/10 sm:border-none backdrop-blur-sm"
                        >
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 sm:mb-3 font-display text-center">
                                {stat.value}
                            </div>
                            <div
                                className="text-xs sm:text-[13px] md:text-[14px] lg:text-[15px] text-slate-300 font-medium leading-relaxed text-center [&_br]:hidden sm:[&_br]:inline"
                                dangerouslySetInnerHTML={{ __html: stat.label }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

const educationCaseStudySlugs = [
    'eazyschool-admin',
    'education-platform-engineering',
    'eazyschool-government-education-management',
]

const caseStudies = educationCaseStudySlugs
    .map(slug => caseStudiesContent.studies.find(study => study.href.includes(slug)))
    .filter((study): study is NonNullable<typeof study> => Boolean(study))

function CaseStudies() {
    const [expandedCardTags, setExpandedCardTags] = useState<string | null>(null);

    if (!caseStudies || caseStudies.length === 0) {
        return null;
    }

    return (
        <section className="py-20 lg:py-24 bg-[#f8fafc]">
            <div className={CONTAINER_CLASS}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <header className="mb-14 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-[900] text-[#030B3B] font-display mb-3">
                            {educationContent.caseStudies.title}
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
                            {educationContent.caseStudies.subtitle}
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {caseStudies.map((study, idx) => {
                            const cardKey = `${study.href}-${idx}`;
                            return (
                                <div
                                    key={cardKey}
                                    className="group flex flex-col rounded-[32px] bg-white border border-[#030B3B]/10 overflow-visible transition-all duration-500 hover:-translate-y-2 hover:z-20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative h-full justify-between"
                                >
                                    {/* Card Image */}
                                    <div className="aspect-[1.8/1] overflow-hidden relative m-2.5 sm:m-3 rounded-[20px] sm:rounded-[24px]">
                                        <div
                                            className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                            style={{ backgroundImage: `url('${study.image}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-40" />
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 sm:p-8 pt-3 sm:pt-4 flex flex-col flex-1 relative z-10">
                                        {/* Tags */}
                                        <div className="min-h-[34px] sm:min-h-[38px] flex-shrink-0 mb-3 sm:mb-4 flex items-center">
                                            {study.tags && study.tags.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                                    {study.tags.slice(0, 2).map((tag, tagIdx) => (
                                                        <span
                                                            key={tagIdx}
                                                            className="px-2.5 sm:px-3 py-1 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {study.tags.length > 2 && (
                                                        <div
                                                            className="relative inline-flex"
                                                            data-tag-overflow
                                                            onMouseEnter={() => setExpandedCardTags(cardKey)}
                                                            onMouseLeave={() => setExpandedCardTags((current) => current === cardKey ? null : current)}
                                                        >
                                                            <button
                                                                type="button"
                                                                aria-label={`Show ${study.tags.length - 2} more tags`}
                                                                aria-expanded={expandedCardTags === cardKey}
                                                                onClick={() => setExpandedCardTags(expandedCardTags === cardKey ? null : cardKey)}
                                                                className="px-2.5 sm:px-3 py-1 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 rounded-full cursor-pointer transition-all duration-200 hover:bg-[#1e90ff]/15 hover:border-[#1e90ff]/30 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/25"
                                                            >
                                                                +{study.tags.length - 2}
                                                            </button>
                                                            {/* Popup */}
                                                            <AnimatePresence>
                                                                {expandedCardTags === cardKey && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                                                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                                                        className="absolute bottom-full left-1/2 -translate-x-1/2 z-50 mb-2 w-auto max-w-[280px] p-1"
                                                                    >
                                                                        <div className="absolute left-1/2 -translate-x-1/2 top-full h-2 w-full" />
                                                                        <div className="relative flex flex-col gap-1.5 items-center">
                                                                            {study.tags.slice(2).map((tag, tagIdx) => (
                                                                                <span
                                                                                    key={tagIdx}
                                                                                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-white border border-[#1e90ff]/20 rounded-full shadow-[0_8px_20px_rgba(15,23,42,0.10)]"
                                                                                >
                                                                                    {tag}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Title Wrapper */}
                                        <div className="mb-2.5 sm:mb-3 flex items-start">
                                            <h3
                                                className="font-display text-[16px] sm:text-[18.5px] font-bold text-[#030B3B] leading-[1.35] tracking-tight"
                                                dangerouslySetInnerHTML={{ __html: study.title }}
                                            />
                                        </div>

                                        {/* Callout Content */}
                                        <p className="text-[13.5px] sm:text-[14px] font-normal text-slate-600 leading-[1.65] mb-5 sm:mb-6 flex-1">
                                            {study.description}
                                        </p>

                                        {/* CTA Button */}
                                        <Link
                                            href={study.href}
                                            className="flex items-center justify-between w-full py-3.5 sm:py-4 px-5 sm:px-6 bg-white border border-[#1e90ff]/20 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(30,144,255,0.3)] mt-auto"
                                        >
                                            Read Case Study
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default function EducationPage() {
    return (
        <div className="min-h-screen font-sans text-[#030B3B]">
            <Navbar />
            <main>
                <EducationHero />
                <AlternatingSections />
                <EducationOfferings />
                <ProvenImpact />
                <CaseStudies />
                <Faq items={educationFaqs} />
            </main>
            <Footer />
        </div>
    );
}
