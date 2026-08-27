"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, BarChart3, Cloud, Server, Users, Settings, TrendingUp, Database, Target, Layers, Globe2, Compass, Link2Off, Map, ShieldAlert, Shield } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TimelineProcess } from "@/components/timeline-process";
import { Faq } from "@/components/faq";
import { strategyConsultingFaqs } from "@/content/service-faqs";

const animations: any = {
    fadeInUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    },
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }
};

/* ------------------- Hero Section ------------------- */
function DigitalTransformationHero() {
    return (
        <section className="relative overflow-hidden bg-[#030b1e] flex items-center">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(37,99,235,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020918] via-[#020918]/60 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-10 pt-[110px] sm:pb-10 sm:pt-[120px] lg:pb-6 lg:pt-20">
                    <motion.div
                        variants={animations.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        <motion.div variants={animations.fadeInUp} className="flex mb-6">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px]">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                STRATEGY CONSULTING
                            </div>
                        </motion.div>
                        <motion.h1
                            variants={animations.fadeInUp}
                            className="mt-6 text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-[900] leading-[1.1] tracking-tight text-white lg:mt-8 font-display"
                        >
                            <span className="inline-block whitespace-nowrap">Shape <span className="text-[#00D4AA]">direction.</span></span><br className="hidden sm:block" />{" "}
                            <span className="inline-block whitespace-nowrap">Accelerate <span className="text-[#00D4AA]">execution.</span></span>
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 max-w-2xl lg:mt-10"
                        >
                            Businesses define strategies to align business priorities, guide technology investments and create a practical path forward.
                        </motion.p>
                        <motion.div variants={animations.fadeInUp} className="mt-10 lg:mt-12">
                            <Link
                                href="/contact"
                                className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] border border-[#3B82F6]/30 rounded-full font-bold px-8 h-14 inline-flex items-center justify-center transition-all duration-300"
                            >
                                Talk to Our Experts
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative hidden lg:flex items-center justify-end h-[380px] lg:h-[420px] w-full"
                    >
                        <div className="absolute right-[-3%] lg:right-[-6%] xl:right-[-8%] top-[2%] lg:top-[5%] w-[360px] h-[360px] lg:w-[460px] lg:h-[460px] pointer-events-none flex items-center justify-center">
                            {/* Ambient background glow (matching enterprise platforms) */}
                            <div className="absolute left-[15%] top-[20%] w-[240px] h-[350px] bg-[#06b6d4]/30 blur-[80px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[160px] h-[260px] bg-[#8b5cf6]/30 blur-[80px] rounded-full" />
                            <div className="absolute inset-[20%] bg-gradient-to-tr from-indigo-500/10 to-cyan-400/10 blur-[50px] rounded-full mix-blend-screen" />
                            <div className="strategy-visual w-full h-full relative flex items-center justify-center">
                                <div className="atom" style={{ transform: "translateX(20px) translateY(-20px) scale(1.35)" }}>
                                    {/* Orbit 1 */}
                                    <div className="atom-orbit orbit-1">
                                        <div className="orbit-path">
                                            <div className="atom-electron"></div>
                                        </div>
                                    </div>

                                    {/* Orbit 2 */}
                                    <div className="atom-orbit orbit-2">
                                        <div className="orbit-path">
                                            <div className="atom-electron"></div>
                                        </div>
                                    </div>

                                    {/* Orbit 3 */}
                                    <div className="atom-orbit orbit-3">
                                        <div className="orbit-path">
                                            <div className="atom-electron"></div>
                                        </div>
                                    </div>

                                    {/* Orbit 4 Force Refresh */}
                                    <div className="atom-orbit orbit-4">
                                        <div className="orbit-path">
                                            <div className="atom-electron"></div>
                                        </div>
                                    </div>

                                    {/* Nucleus */}
                                    <div className="atom-nucleus">
                                        <div className="nucleus-ring-2"></div>
                                        <div className="nucleus-ring"></div>
                                        <div className="nucleus-core"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ------------------- Why Hyniva Section ------------------- */
function WhyHyniva() {
    return (
        <section className="bg-white py-10 sm:py-12 lg:py-0">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16 py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center my-0 py-0">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.fadeInUp}
                        className="relative h-[180px] sm:h-[320px] lg:h-[420px] w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto flex items-center justify-center my-auto self-center mt-3 sm:mt-8 lg:mt-12"
                    >
                        <Image
                            src="/images/Our_Services/Strategy_Consulting_no_BG.svg"
                            alt="Connected Enterprise UI"
                            fill
                            className="object-contain object-center transform-gpu transition-transform duration-700 ease-out hover:scale-105"
                        />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.staggerContainer}
                        className="flex flex-col items-start justify-center self-center order-first lg:order-last"
                    >
                        <motion.div variants={animations.fadeInUp} className="flex mb-6">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                OUR PHILOSOPHY
                            </div>
                        </motion.div>
                        <motion.h2 variants={animations.fadeInUp} className="text-[20px] sm:text-3xl md:text-[34px] lg:text-[36px] xl:text-[40px] font-[900] text-[#030B3B] leading-[1.15] font-display mb-6 whitespace-nowrap sm:whitespace-normal">
                            Strategy with Purpose
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                            <p>
                                The most successful organizations don't move faster because they do more. They move faster because they focus on the right priorities at the right time.
                            </p>
                            <p>
                                At Hyniva, we help leaders evaluate opportunities, balance technology investments and create actionable roadmaps that translate strategic direction into meaningful progress.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ------------------- What We Transform Section ------------------- */
function WhatWeTransform() {
    const challenges = [
        {
            icon: Target,
            description: "Business priorities compete for limited resources."
        },
        {
            icon: Compass,
            description: "Technology investments lack strategic alignment."
        },
        {
            icon: Link2Off,
            description: "Disconnected initiatives create duplicated effort."
        },
        {
            icon: Map,
            description: "Unclear roadmaps slow decision-making."
        },
        {
            icon: ShieldAlert,
            description: "Shifting priorities increase execution risk."
        },
        {
            icon: Shield,
            description: "Lack of governance reduces execution momentum."
        }
    ];

    return (
        <section className="bg-[#f8fafc] pt-20 pb-16 lg:pt-20 lg:pb-24 relative overflow-hidden">
            {/* Dotted background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animations.staggerContainer}
                    className="text-left lg:text-center max-w-[1240px] lg:mx-auto mb-10 sm:mb-12"
                >
                    <motion.div variants={animations.fadeInUp} className="flex justify-start lg:justify-center mb-6">
                        <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px]">
                            <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                            ENTERPRISE REALITY
                        </div>
                    </motion.div>
                    <motion.h2 variants={animations.fadeInUp} className="text-3xl sm:text-4xl lg:text-[40px] font-[900] text-[#030B3B] font-display text-left lg:text-center leading-tight mb-6">
                        Why Right Strategy Matters
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="text-slate-600 text-base sm:text-lg leading-relaxed text-left lg:text-center max-w-[1100px] lg:mx-auto">
                        <span className="block">
                            Execution loses momentum when decisions are made in isolation, priorities continually shift,
                        </span>
                        <span className="block mt-1">
                            and teams lack a shared direction. The right strategy brings alignment before action.
                        </span>
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300 group flex items-start gap-5"
                        >
                            <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <card.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <p className="text-slate-700 leading-relaxed font-medium text-[16px]">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------- Enterprise Enablement Section ------------------- */
function EnterpriseEnablement() {
    const enablers = [
        {
            title: "Enterprise Platforms",
            icon: Server,
            iconBg: "bg-blue-50 group-hover:bg-blue-500",
            iconColor: "text-blue-600 group-hover:text-white",
            description: "Salesforce, Microsoft and AWS expertise that guides platform strategy and architecture decisions."
        },
        {
            title: "Digital Innovation",
            icon: Cloud,
            iconBg: "bg-teal-50 group-hover:bg-teal-500",
            iconColor: "text-teal-600 group-hover:text-white",
            description: "AI, automation, cloud and data expertise that helps organizations identify the right opportunities for modernization."
        },
        {
            title: "Product & Engineering",
            icon: Settings,
            iconBg: "bg-sky-50 group-hover:bg-sky-500",
            iconColor: "text-sky-600 group-hover:text-white",
            description: "Product engineering and solution architecture expertise that ensures every strategy is practical, scalable and ready for execution."
        }
    ];

    return (
        <section className="bg-white py-20 lg:py-24 relative overflow-hidden border-t border-slate-100">
            {/* Subtle background accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.04)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                    {/* Left Sidebar Text */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={animations.fadeInUp}
                        className="lg:w-[28%] flex flex-col pt-2"
                    >
                        <div className="flex mb-5">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px]">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                THE ENABLERS
                            </div>
                        </div>
                        <h2 className="text-2xl lg:text-[30px] font-bold text-[#030B3B] font-display mb-4 leading-[1.2]">
                            Expertise <br className="hidden lg:block" />That Informs <br className="hidden lg:block" />Strategy
                        </h2>
                        <p className="text-[13px] text-slate-500 leading-relaxed max-w-[280px]">
                            Strategic advice is only as good as the expertise behind it. We bring practical knowledge in engineering, integration and automation to help shape roadmaps that are technically feasible and focused on business value.
                        </p>
                    </motion.div>

                    {/* Right Grid */}
                    <div className="lg:w-[72%] grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-6">
                        {enablers.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="bg-white rounded-2xl p-6 xl:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-100/80 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group"
                            >
                                <div className={`h-16 w-16 rounded-2xl ${item.iconBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                                    <item.icon strokeWidth={1.5} className={`h-7 w-7 ${item.iconColor} transition-colors duration-300`} />
                                </div>
                                <h3 className="text-[17px] font-bold text-[#030B3B] mb-2.5 transition-colors duration-300">{item.title}</h3>
                                <p className="text-[12.5px] text-slate-500 leading-relaxed mb-6 flex-grow">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------- Transformation In Action Section ------------------- */
function TransformationInAction() {
    const caseStudies = [
        {
            title: "Rapid Reverse-Engineered <span class='text-[#3B82F6]'>Website Migration</span>",
            image: "/images/Case_Studies/Optimized/cs-6.png",
            description: "A fast-paced migration and modernization of a complex website using reverse engineering strategies.",
            href: "/insights/case-studies/aem-migration"
        },
        {
            title: "Turning Enterprise Data into a <span class='text-[#3B82F6]'>Strategic Intelligence Engine</span>",
            image: "/images/Case_Studies/Optimized/cs-9.png",
            description: "Built a strategic intelligence engine powered by scalable data architectures.",
            href: "/insights/case-studies/enterprise-data-intelligence"
        },
        {
            title: "<span class='text-[#3B82F6]'>Modernizing Case Management</span> for a Community Healthcare Provider",
            image: "/images/Case_Studies/Optimized/cs-12.png",
            description: "Delivered a modern, compliant case management system for a healthcare provider.",
            href: "/insights/case-studies/modernizing-case-management-for-a-community-healthcare-provider-stop"
        }
    ];

    return (
        <section className="bg-[#f8fafc] py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div>
                    {/* Case Studies Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={animations.staggerContainer}
                        className="w-full"
                    >
                        <motion.div variants={animations.fadeInUp}>
                            <header className="mb-14 lg:mb-16">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-[#030B3B] mb-6">
                                    Case Studies
                                </h2>
                                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
                                    Real-world implementations demonstrating how we help enterprises evolve through comprehensive digital and cloud transformation.
                                </p>
                            </header>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {caseStudies.map((study, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={animations.fadeInUp}
                                    className="group flex flex-col rounded-[28px] bg-[#EEF5FF] border border-blue-100/60 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl relative h-full justify-between"
                                >
                                    {/* Card Image */}
                                    <div className="aspect-[1.75/1] overflow-hidden relative rounded-[20px] bg-white mb-5 shadow-xs">
                                        {study.image && (
                                            <Image
                                                src={study.image}
                                                alt={study.title.replace(/<[^>]*>/g, "")}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="px-2 pb-1 flex flex-col flex-1 relative z-10">
                                        <h3
                                            className="font-display text-[17px] sm:text-[18px] font-extrabold text-[#030B3B] leading-[1.3] tracking-tight mb-2.5"
                                            dangerouslySetInnerHTML={{ __html: study.title }}
                                        />

                                        <p className="text-[13px] lg:text-[13.5px] font-medium text-slate-500 leading-relaxed mb-6 flex-1">
                                            {study.description}
                                        </p>

                                        <Link
                                            href={study.href}
                                            className="flex items-center justify-between w-full py-3.5 px-5 bg-white text-[#2563EB] border border-blue-200/70 rounded-xl text-[13px] font-bold shadow-xs transition-all duration-300 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white mt-auto"
                                        >
                                            Read Case Study
                                            <svg
                                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ------------------- Why Hyniva DT Section ------------------- */
function WhyHynivaDT() {
    const bottomBox = [
        {
            title: "Strategy Grounded\nin Delivery",
            description: "Our recommendations are shaped by real experience, ensuring every strategy is practical, achievable and aligned with execution realities.",
            icon: Target
        },
        {
            title: "Technology-Informed\nAdvisory",
            description: "Our consultants work alongside architects, engineers and platform specialists, bringing technical depth to every strategic decision.",
            icon: BrainCircuit
        },
        {
            title: "Independent\nPerspective",
            description: "We recommend technologies, platforms and approaches based on business fit, long-term sustainability and implementation success—not vendor preference.",
            icon: Globe2
        },
        {
            title: "From Planning\nto Partnership",
            description: "We stay engaged beyond strategy, helping organizations refine decisions, navigate change and maintain alignment as initiatives move into execution.",
            icon: Users
        }
    ];

    return (
        <section className="bg-white py-[14px] sm:py-[20px] lg:py-[26px]">
            <div className="mx-auto w-full max-w-[84rem] xl:max-w-[86rem] px-6 md:px-10 lg:px-16 flex flex-col gap-6">
                {/* ── Top Box: Dark Glowing Container ── */}
                <motion.div
                    variants={animations.fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[24px] sm:p-[32px] lg:p-[42px]"
                >
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-8 md:gap-12 md:grid-cols-[1fr_auto] items-start">
                        {/* ── LEFT: Badge + Heading ── */}
                        <div className="flex flex-col items-start">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6 px-3.5 py-1 text-[10px]">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                THE DIFFERENCE
                            </div>
                            <h2 className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-[900] text-white tracking-tight leading-[1.18] font-display">
                                <span className="block">Why Organizations</span>
                                <span className="block">Choose Hyniva for</span>
                                <span className="text-[#00D4AA] block">Strategy Consulting?</span>
                            </h2>
                        </div>

                        {/* Right Side: Metrics & CTA */}
                        <div className="flex flex-col items-start justify-between gap-5 md:gap-6 md:pl-8 w-full pt-0 md:pt-[44px]">
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap items-start justify-start sm:gap-8 lg:gap-10 xl:gap-12 w-full">
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[22px] xs:text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">220</span>
                                        <span className="text-[16px] xs:text-[20px] sm:text-[22px] lg:text-[24px] font-black text-white leading-none">+</span>
                                    </div>
                                    <span className="text-[10px] xs:text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.3] sm:leading-[1.4]">
                                        {"Solutions\nDelivered"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[22px] xs:text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">18</span>
                                        <span className="text-[16px] xs:text-[20px] sm:text-[22px] lg:text-[24px] font-black text-white leading-none">+</span>
                                    </div>
                                    <span className="text-[10px] xs:text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.3] sm:leading-[1.4]">
                                        {"Years of Tech\nConsulting"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[22px] xs:text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">45</span>
                                        <span className="text-[16px] xs:text-[20px] sm:text-[22px] lg:text-[24px] font-black text-white leading-none">+</span>
                                    </div>
                                    <span className="text-[10px] xs:text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.3] sm:leading-[1.4]">
                                        {"Enterprise\nClients"}
                                    </span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="pt-2 sm:pt-3 w-full flex justify-start">
                                <Link
                                    href="/about-us"
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold tracking-wider text-[11px] sm:text-[12px] uppercase px-4.5 sm:px-5.5 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] shadow-[0_0_12px_rgba(59,130,246,0.4)] border border-[#3B82F6]/30 w-full sm:w-auto"
                                >
                                    <span>KNOW MORE</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Bottom Box: Subtle Features Container ── */}
                <motion.div
                    variants={animations.fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] py-[24px] sm:py-[32px] lg:py-[42px] px-[24px] sm:px-[32px] lg:px-[42px] border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-6 xl:gap-10 xl:gap-12">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="h-9 w-9 bg-white shadow-sm flex items-center justify-center rounded-full mb-4 flex-shrink-0">
                                    <card.icon className="w-4.5 h-4.5 text-[#3B82F6]" />
                                </div>
                                <h3 className="text-[15px] lg:text-[16px] font-black text-[#030B3B] mb-2 leading-tight font-display whitespace-pre-line">
                                    {card.title}
                                </h3>
                                <p className="text-[12px] lg:text-[13px] text-[#030B3B]/80 font-medium leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

const strategySteps = [
    {
        num: "01",
        title: "Discover",
        desc: "Evaluate current business landscape, opportunities and constraints to establish a clear starting point.",
        angle: 45
    },
    {
        num: "02",
        title: "Align",
        desc: "Bring stakeholders, priorities and technology decisions together around a shared strategic direction.",
        angle: -30
    },
    {
        num: "03",
        title: "Plan",
        desc: "Define practical roadmaps, governance models and measurable milestones for successful execution.",
        angle: 120
    },
    {
        num: "04",
        title: "Guide",
        desc: "Provide ongoing strategic advisory that helps initiatives stay aligned as priorities and conditions evolve.",
        angle: -80
    }
];

/* ------------------- Page ------------------- */
export default function StrategyConsultingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <DigitalTransformationHero />
                <WhyHyniva />
                <WhatWeTransform />
                <TimelineProcess
                    eyebrow="OUR APPROACH"
                    title="From Strategy to Execution"
                    description="Every successful transformation begins with informed decisions. Our approach helps organizations create alignment, establish direction and maintain momentum from planning through execution."
                    steps={strategySteps}
                />
                <EnterpriseEnablement />
                <WhyHynivaDT />
                <TransformationInAction />
                <Faq items={strategyConsultingFaqs} />
            </main>
            <Footer />
        </div>
    );
}
