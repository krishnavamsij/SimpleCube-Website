"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, Bot, Users, CreditCard, Cloud, Smartphone, TrendingUp, Monitor, Calculator, Shield, RefreshCw, BarChart, Network, Route, BrainCircuit, Zap, LineChart } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/faq";
import { wealthAssetManagementFaqs } from "@/content/industry-faqs";
import { wealthAssetManagementContent } from "@/content/wealth-asset-management";
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
    LineChart
};

function WealthHero() {
    return (
        <section className="relative overflow-hidden py-20 pt-28 sm:py-40 sm:pt-52 md:py-48 md:pt-60 lg:py-56 lg:pt-72 flex items-center min-h-screen">
            {/* Background layers */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${wealthAssetManagementContent.hero.backgroundImage}')` }}
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
                        <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 px-5 py-2 rounded-full text-xs font-bold tracking-[0.25em] flex items-center gap-2 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                            {wealthAssetManagementContent.hero.badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bricolage w-full mx-auto text-center [&_br]:hidden sm:[&_br]:inline"
                        dangerouslySetInnerHTML={{ __html: wealthAssetManagementContent.hero.title }}
                    />

                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 text-base sm:text-lg md:text-[17px] lg:text-[18px] 2xl:text-[20px] text-slate-200 w-full mx-auto pt-2 text-center [&_br]:hidden sm:[&_br]:inline"
                        dangerouslySetInnerHTML={{ __html: wealthAssetManagementContent.hero.subtitle }}
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
                {wealthAssetManagementContent.alternatingSections.map((section, index) => (
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
                            <h2 className="text-3xl font-extrabold text-[#030B3B] mb-8 uppercase tracking-wide">
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

function WealthOfferings() {
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
                    <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold text-[#030B3B] mb-6 tracking-tight leading-[1.1]">
                        {wealthAssetManagementContent.offerings.title}
                    </h2>
                    <p className="text-base sm:text-lg lg:text-[18px] 2xl:text-[20px] text-slate-700 font-medium leading-[1.6]">
                        {wealthAssetManagementContent.offerings.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
                >
                    {wealthAssetManagementContent.offerings.items.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || Bot;
                        return (
                            <motion.div
                                key={index}
                                variants={scrollReveal}
                                className="bg-white rounded-[24px] p-8 border border-[#030B3B]/10 hover:border-[#1e90ff]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#ECF6FF] flex items-center justify-center text-[#1e90ff] mb-6 border border-[#1e90ff]/10 group-hover:bg-[#1e90ff] group-hover:text-white transition-colors duration-300">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <h3 className="text-[19px] font-bold text-[#030B3B] mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
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
                    className="max-w-6xl mx-auto mb-16 md:mb-20 text-left md:text-center px-4"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-8 uppercase tracking-wide">
                        {wealthAssetManagementContent.impact.title}
                    </h2>
                    <p
                        className="text-base md:text-lg text-slate-300 font-medium leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: wealthAssetManagementContent.impact.subtitle }}
                    />
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8"
                >
                    {wealthAssetManagementContent.impact.stats.map((stat, index) => (
                        <motion.div key={index} variants={scrollReveal} className="flex flex-col items-start md:items-center text-left md:text-center">
                            <div
                                className="text-[13px] leading-tight sm:text-base md:text-xl lg:text-2xl font-extrabold text-white mb-2 sm:mb-3 md:mb-4 font-display text-left md:text-center sm:leading-snug md:leading-normal"
                                dangerouslySetInnerHTML={{ __html: stat.value }}
                            />
                            <div
                                className="text-[9px] leading-[1.2] sm:text-[12px] md:text-[14px] lg:text-[15px] text-slate-300 font-medium sm:leading-snug md:leading-relaxed text-left md:text-center"
                                dangerouslySetInnerHTML={{ __html: stat.label }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function CaseStudies() {
    if (!wealthAssetManagementContent.caseStudies.studies || wealthAssetManagementContent.caseStudies.studies.length === 0) {
        return null;
    }

    return (
        <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#f8fafc]">
            <div className={CONTAINER_CLASS}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#030B3B] mb-6 uppercase tracking-wide">
                        {wealthAssetManagementContent.caseStudies.title}
                    </h2>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
                        {wealthAssetManagementContent.caseStudies.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {wealthAssetManagementContent.caseStudies.studies.map((study, index) => {
                        const parts = study.title.split("<br />");
                        const firstLine = parts[0] || "";
                        const secondLine = parts[1] || "";

                        return (
                            <motion.div
                                key={index}
                                variants={scrollReveal}
                                className="group flex flex-col rounded-[32px] bg-[#ECF5FF] p-6 border border-[#030B3B]/5 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(30,144,255,0.08)] hover:-translate-y-1 h-full"
                            >
                                {/* Rounded Image container */}
                                <div className="h-[230px] w-full relative rounded-[24px] overflow-hidden bg-white mb-6">
                                    {study.image && (
                                        <Image
                                            src={study.image}
                                            alt={study.title.replace("<br />", " ")}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-103"
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1">
                                    <h3 className="font-display text-[17px] sm:text-[18px] font-bold text-[#030B3B] leading-[1.35] tracking-tight mb-3 line-clamp-none">
                                        {study.titleHighlightIndex === 1 ? (
                                            <>
                                                <span className="text-[#1e90ff]">{firstLine}</span>
                                                {secondLine && (
                                                    <>
                                                        <br />
                                                        <span className="text-[#030B3B]">{secondLine}</span>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-[#030B3B]">{firstLine}</span>
                                                {secondLine && (
                                                    <>
                                                        <br />
                                                        <span className="text-[#1e90ff]">{secondLine}</span>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </h3>

                                    <p className="text-[15px] text-slate-600 font-normal leading-relaxed mb-8 flex-1 line-clamp-3">
                                        {study.description}
                                    </p>

                                    <Link
                                        href={study.href}
                                        className="bg-white rounded-[20px] py-4 px-6 flex justify-between items-center border border-white shadow-sm hover:shadow-md transition-all group"
                                    >
                                        <span className="text-[14px] font-extrabold text-[#1e90ff]">
                                            Read Case Study
                                        </span>
                                        <ArrowRightIcon className="w-5 h-5 text-[#1e90ff] transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default function WealthAssetManagementPage() {
    return (
        <div className="min-h-screen font-sans text-[#030B3B]">
            <Navbar />
            <main>
                <WealthHero />
                <AlternatingSections />
                <WealthOfferings />
                <ProvenImpact />
                <CaseStudies />
                <Faq items={wealthAssetManagementFaqs} />
            </main>
            <Footer />
        </div>
    );
}
