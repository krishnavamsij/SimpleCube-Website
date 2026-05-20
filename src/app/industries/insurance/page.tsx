"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, Bot, Users, CreditCard, Cloud, Smartphone, TrendingUp, Monitor, Calculator, Shield, RefreshCw, BarChart, Network, Route, BrainCircuit, Zap, LineChart } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { insuranceContent } from "@/content/insurance";
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

function InsuranceHero() {
    return (
        <section className="relative overflow-hidden py-32 pt-44 sm:py-40 sm:pt-52 md:py-48 md:pt-60 lg:py-56 lg:pt-72 flex items-center min-h-screen">
            {/* Background layers */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${insuranceContent.hero.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/85 via-[#040c2c]/80 to-[#02040a]/92" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center space-y-10 md:space-y-12"
                >
                    <motion.div variants={fadeInUp} className="flex justify-center">
                        <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 px-5 py-2 rounded-full text-xs font-bold tracking-[0.25em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                            {insuranceContent.hero.badge}
                        </span>
                    </motion.div>
                    
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.15] tracking-tight font-display max-w-6xl flex flex-col gap-1 sm:gap-2 items-center"
                    >
                        {insuranceContent.hero.title.split(/<br\s*\/?>/).map((part, pIdx) => (
                            <span key={pIdx} className="block lg:whitespace-nowrap" dangerouslySetInnerHTML={{ __html: part }} />
                        ))}
                    </motion.h1>
                    
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto pt-2"
                        dangerouslySetInnerHTML={{ __html: insuranceContent.hero.subtitle }}
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
                {insuranceContent.alternatingSections.map((section, index) => (
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

function InsuranceOfferings() {
    return (
        <section className="py-24 bg-[#ECF6FF]">
            <div className="mx-auto max-w-[1400px] px-6 text-center">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-5xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-extrabold text-[#030B3B] mb-6 uppercase tracking-wide">
                        {insuranceContent.offerings.title}
                    </h2>
                    <p className="text-lg text-slate-700 font-medium">
                        {insuranceContent.offerings.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
                >
                    {insuranceContent.offerings.items.map((item, index) => {
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
        <section className="py-24 bg-[#0A102E] relative overflow-hidden">
            {/* Top Glow matching Why Hyniva */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="mx-auto max-w-[1200px] px-6 text-center relative z-10">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 uppercase tracking-wide">
                        {insuranceContent.impact.title}
                    </h2>
                    <p className="text-lg text-slate-300 font-medium leading-relaxed">
                        {insuranceContent.impact.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {insuranceContent.impact.stats.map((stat, index) => (
                        <motion.div key={index} variants={scrollReveal} className="flex flex-col items-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-display">
                                {stat.value}
                            </div>
                            <div 
                                className="text-base text-slate-300 font-medium text-center"
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
                        {insuranceContent.caseStudies.title}
                    </h2>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
                        {insuranceContent.caseStudies.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {insuranceContent.caseStudies.studies.map((study, index) => {
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
                                    <h3 className="text-[19px] font-extrabold leading-snug mb-4 font-display">
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
                                    
                                    <p className="text-[15px] text-slate-600 font-medium leading-relaxed mb-8 flex-1 line-clamp-3">
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

export default function InsurancePage() {
    return (
        <div className="min-h-screen font-sans text-[#030B3B]">
            <Navbar />
            <main>
                <InsuranceHero />
                <AlternatingSections />
                <InsuranceOfferings />
                <ProvenImpact />
                <CaseStudies />
            </main>
            <Footer />
        </div>
    );
}
