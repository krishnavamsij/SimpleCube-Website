"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, Bot, Users, CreditCard, Cloud, Smartphone, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { bankingContent } from "@/content/banking";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
    Bot,
    Users,
    CreditCard,
    Cloud,
    Smartphone,
    TrendingUp,
};

function BankingHero() {
    return (
        <section className="relative overflow-hidden py-24 pt-36 sm:py-32 sm:pt-48 md:py-40 md:pt-56">
            {/* Background layers */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${bankingContent.hero.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020918]/80 via-[#061244]/60 to-[#030b1e]" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
                        <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                            {bankingContent.hero.badge}
                        </span>
                    </motion.div>
                    
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.1] mb-8 tracking-tight font-display"
                        dangerouslySetInnerHTML={{ __html: bankingContent.hero.title }}
                    />
                    
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto"
                        dangerouslySetInnerHTML={{ __html: bankingContent.hero.subtitle }}
                    />
                </motion.div>
            </div>
        </section>
    );
}

function AlternatingSections() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-[1200px] px-6 space-y-32">
                {bankingContent.alternatingSections.map((section, index) => (
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
                            <div className="aspect-[4/3] rounded-[32px] bg-slate-200 overflow-hidden relative">
                                {/* Placeholder for actual images later */}
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

function BankingOfferings() {
    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="mx-auto max-w-[1400px] px-6 text-center">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-extrabold text-[#030B3B] mb-6 uppercase tracking-wide">
                        {bankingContent.offerings.title}
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        {bankingContent.offerings.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
                >
                    {bankingContent.offerings.items.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || Bot;
                        return (
                            <motion.div
                                key={index}
                                variants={scrollReveal}
                                className="bg-white rounded-[24px] p-8 border border-slate-200 hover:border-[#1e90ff]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 group"
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
        <section className="py-24 bg-[#030b1e] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            
            <div className="mx-auto max-w-[1200px] px-6 text-center relative z-10">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 uppercase tracking-wide">
                        {bankingContent.impact.title}
                    </h2>
                    <p className="text-lg text-slate-300 font-medium leading-relaxed">
                        {bankingContent.impact.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {bankingContent.impact.stats.map((stat, index) => (
                        <motion.div key={index} variants={scrollReveal} className="flex flex-col items-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-display">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function CaseStudies() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-[1400px] px-6">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#030B3B] mb-6 uppercase tracking-wide">
                        {bankingContent.caseStudies.title}
                    </h2>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
                        {bankingContent.caseStudies.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {bankingContent.caseStudies.studies.map((study, index) => (
                        <motion.div
                            key={index}
                            variants={scrollReveal}
                            className="group flex flex-col rounded-[24px] bg-white border border-[#030B3B]/10 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="h-[200px] relative overflow-hidden bg-slate-100">
                                {study.image && (
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${study.badge === 'Article' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                                        {study.badge}
                                    </span>
                                </div>
                                <h3 className="text-[19px] font-bold text-[#030B3B] leading-snug mb-4">
                                    {study.title}
                                </h3>
                                <p className="text-[15px] text-slate-600 font-medium leading-relaxed mb-8 flex-1 line-clamp-3">
                                    {study.description}
                                </p>
                                
                                <Link
                                    href={study.href}
                                    className="flex items-center gap-2 text-[13px] font-bold text-[#1e90ff] uppercase tracking-wider group-hover:gap-3 transition-all"
                                >
                                    Read More <ArrowRightIcon className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default function BankingPage() {
    return (
        <div className="min-h-screen font-sans text-[#030B3B]">
            <Navbar />
            <main>
                <BankingHero />
                <AlternatingSections />
                <BankingOfferings />
                <ProvenImpact />
                <CaseStudies />
            </main>
            <Footer />
        </div>
    );
}
