"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, BarChart3, Cloud, Server, Users, Settings, TrendingUp, Database, Target, Layers, Globe2, LayoutGrid, Link2Off, EyeOff, Clock, UserMinus, GitFork, Unplug } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TimelineProcess } from "@/components/timeline-process";
import { Faq } from "@/components/faq";
import { enterprisePlatformsFaqs } from "@/content/service-faqs";

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
        <section className="relative overflow-hidden bg-[#0A2F52] flex items-center">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#0A2F52]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(19,84,152,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020918] via-[#020918]/60 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-10 pt-[110px] sm:pb-10 sm:pt-[120px] lg:pb-12 lg:pt-20">
                    <motion.div
                        variants={animations.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl"
                    >
                        <motion.div variants={animations.fadeInUp} className="flex mb-6">
                            <div className="eyebrow text-[#3886CE] bg-[#3886CE]/10 border border-[#3886CE]/20">
                                <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
                                ENTERPRISE PLATFORMS
                            </div>
                        </motion.div>
                        <motion.h1
                            variants={animations.fadeInUp}
                            className="mt-6 text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-[900] leading-[1.1] tracking-tight text-white lg:mt-8 font-display"
                        >
                            <span className="inline-block whitespace-nowrap">Unify <span className="text-[#3886CE]">platforms.</span></span><br className="hidden sm:block" />{" "}
                            <span className="inline-block whitespace-nowrap">Power the <span className="text-[#3886CE]">enterprise.</span></span>
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 max-w-2xl lg:mt-10"
                        >
                            Businesses connect platforms, people and information to build the digital backbone for a more responsive enterprise.
                        </motion.p>
                        <motion.div variants={animations.fadeInUp} className="mt-10 lg:mt-12">
                            <Link
                                href="/contact"
                                className="bg-gradient-to-r from-[#3886CE] to-[#135498] text-white hover:opacity-90 shadow-[0_0_15px_rgba(56,134,206,0.5)] hover:shadow-[0_0_25px_rgba(56,134,206,0.8)] border border-[#3886CE]/30 rounded-full font-bold px-8 h-14 inline-flex items-center justify-center transition-all duration-300"
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
                        {/* Identical Ambient Glow Container from Digital Transformation */}
                        <div className="absolute right-[-6%] lg:right-[-10%] xl:right-[-12%] top-[5%] lg:top-[8%] w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] pointer-events-none flex items-center justify-center">
                            {/* Ambient background glow (increased visibility) */}
                            <div className="absolute left-[15%] top-[20%] w-[280px] h-[400px] bg-[#06b6d4]/30 blur-[80px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[180px] h-[300px] bg-[#8b5cf6]/30 blur-[80px] rounded-full" />
                            {/* Soft radial illumination inside center */}
                            <div className="absolute inset-[20%] bg-gradient-to-tr from-[#3886CE]/10 to-cyan-400/10 blur-[50px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Abstract Glass Blocks Illustration - Crisp Line Art Style */}
                        <div className="absolute right-[-6%] lg:right-[-12%] xl:right-[-14%] top-[0%] lg:top-[5%] w-[380px] h-[380px] lg:w-[520px] lg:h-[520px] pointer-events-none flex items-center justify-center [perspective:1200px]">

                            {/* Isometric Container */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="relative w-full h-full flex items-center justify-center [transform:rotateX(60deg)_rotateZ(-45deg)] [transform-style:preserve-3d]"
                            >
                                {/* Block 1 (Large Base Platform) - Crisp Cyan */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ z: [20, 35, 20], opacity: [0, 1, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                                    className="absolute top-[20%] left-[20%] w-[35%] h-[35%] rounded-2xl border border-[#06b6d4]/60 border-l-[5px] border-t-[3px] border-l-[#06b6d4] border-t-[#06b6d4]/80 bg-[#06b6d4]/10"
                                >
                                </motion.div>

                                {/* Block 2 (Medium Accent Block) - Deep Magenta */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ z: [60, 75, 60], opacity: [0, 1, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute bottom-[25%] right-[25%] w-[25%] h-[25%] rounded-xl border border-[#d946ef]/60 border-l-[6px] border-t-[3px] border-l-[#d946ef] border-t-[#d946ef]/80 bg-[#d946ef]/10"
                                >
                                </motion.div>

                                {/* Block 3 (Floating Core Slabs) - Bright White */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ z: [100, 120, 100], opacity: [0, 1, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                    className="absolute top-[35%] left-[45%] w-[20%] h-[20%] rounded-xl border border-white/60 border-l-[5px] border-t-[3px] border-l-[#ffffff] border-t-white/80 bg-white/10"
                                >
                                </motion.div>

                                {/* Block 4 (High Floating Small Cube) - Deep Indigo */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ z: [140, 155, 140], opacity: [0, 1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                                    className="absolute bottom-[20%] left-[30%] w-[12%] h-[12%] rounded-lg border border-[#4f46e5]/60 border-l-[8px] border-b-[3px] border-l-[#4f46e5] border-b-[#4f46e5]/80 bg-[#4f46e5]/20"
                                >
                                </motion.div>

                                {/* Block 5 (Additional Blue Accent) - Bright Blue */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ z: [80, 95, 80], opacity: [0, 1, 0] }}
                                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                                    className="absolute top-[15%] right-[20%] w-[18%] h-[18%] rounded-xl border border-[#3886CE]/60 border-l-[5px] border-t-[3px] border-l-[#3886CE] border-t-[#3886CE]/80 bg-[#3886CE]/10"
                                >
                                </motion.div>

                            </motion.div>
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
        <section className="bg-white py-10 sm:py-12 lg:py-5">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.fadeInUp}
                        className="relative h-[180px] sm:h-[320px] lg:h-[420px] w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto flex items-center justify-center self-center mt-3 sm:mt-8 lg:mt-12"
                    >
                        <Image
                            src="/images/Our_Services/2_Enterprise_Platforms.png"
                            alt="Enterprise Platforms Architecture"
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
                            <div className="eyebrow text-[#3886CE] bg-[#3886CE]/10 border border-[#3886CE]/20">
                                <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
                                OUR PHILOSOPHY
                            </div>
                        </motion.div>
                        <motion.h2 variants={animations.fadeInUp} className="text-[20px] sm:text-3xl md:text-[34px] lg:text-[36px] xl:text-[40px] font-[900] text-[#0A2F52] leading-[1.15] font-display mb-6 whitespace-nowrap sm:whitespace-normal">
                            Connect with Purpose
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                            <p>
                                Enterprise platforms shouldn't operate in isolation. Their true value comes from creating a connected digital backbone that enables information to flow seamlessly across the business.
                            </p>
                            <p>
                                At Hyniva, we help organizations bring enterprise platforms together into a single operating model where systems, processes and people work as one. The result is greater consistency, stronger governance and technology that supports the business instead of operating alongside it.
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
            icon: Link2Off,
            description: "Disconnected platforms create fragmented business processes."
        },
        {
            icon: EyeOff,
            description: "Data spread across systems limits enterprise visibility."
        },
        {
            icon: Clock,
            description: "Manual handoffs slow business operations and productivity."
        },
        {
            icon: UserMinus,
            description: "Inconsistent user experiences reduce platform adoption."
        },
        {
            icon: GitFork,
            description: "Point-to-point integrations increase technical complexity."
        },
        {
            icon: Unplug,
            description: "Platform investments deliver less value when systems remain isolated."
        }
    ];

    return (
        <section className="bg-[#f8fafc] pt-20 pb-16 lg:py-24 relative overflow-hidden">
            {/* Subtle Dotted background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
            
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animations.staggerContainer}
                    className="text-left lg:text-center max-w-[1240px] lg:mx-auto mb-10 sm:mb-12"
                >
                    <motion.div variants={animations.fadeInUp} className="flex justify-start lg:justify-center mb-6">
                        <div className="eyebrow text-[#3886CE] bg-[#3886CE]/10 border border-[#3886CE]/20 px-3.5 py-1 text-[11px]">
                            <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
                            ENTERPRISE REALITY
                        </div>
                    </motion.div>
                    <motion.h2 variants={animations.fadeInUp} className="text-3xl sm:text-4xl lg:text-[40px] font-[900] text-[#0A2F52] font-display text-left lg:text-center leading-tight mb-6">
                        Why Connected Platforms Matter
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="text-slate-600 text-base sm:text-lg leading-relaxed text-left lg:text-center max-w-3xl lg:mx-auto">
                        Enterprise platforms deliver their full value only when integrated into a unified ecosystem. Isolated systems create operational silos, increase maintenance overhead and hinder real-time decision-making across the enterprise.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {challenges.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.5 }}
                            className="bg-white rounded-[20px] p-5.5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-4.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
                        >
                            <div className="flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center bg-[#EFF6FF] text-[#3886CE] transition-all duration-300 group-hover:bg-[#135498] group-hover:text-white group-hover:scale-105">
                                <card.icon className="h-5 w-5 transition-colors duration-300" />
                            </div>
                            <p className="text-[13.5px] sm:text-[14px] font-medium text-[#0A2F52]/80 leading-relaxed">
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
            title: "Salesforce",
            icon: Users,
            iconBoxStyle: "bg-[#EFF6FF] text-[#135498]",
            hoverStyle: "group-hover:bg-[#135498] group-hover:text-white",
            titleHoverStyle: "group-hover:text-[#135498]",
            description: "Create connected customer experiences with CRM, Financial Services Cloud, Service Cloud, Experience Cloud and AI-powered automation.",
            href: "/services/enterprise-platforms/salesforce"
        },
        {
            title: "Microsoft Services",
            icon: LayoutGrid,
            iconBoxStyle: "bg-[#E6F4F1] text-[#00BBA7]",
            hoverStyle: "group-hover:bg-[#00BBA7] group-hover:text-white",
            titleHoverStyle: "group-hover:text-[#00BBA7]",
            description: "Empower employees with modern workplace solutions, business applications, data platforms and intelligent productivity tools across the Microsoft ecosystem.",
            href: "/services/enterprise-platforms/microsoft-services"
        },
        {
            title: "AWS Cloud",
            icon: Cloud,
            iconBoxStyle: "bg-[#E0F2FE] text-[#0284C7]",
            hoverStyle: "group-hover:bg-[#0284C7] group-hover:text-white",
            titleHoverStyle: "group-hover:text-[#0284C7]",
            description: "Build secure, scalable cloud environments that accelerate innovation, improve resilience and support enterprise applications at scale.",
            href: "/services/enterprise-platforms/aws-cloud-services"
        }
    ];

    return (
        <section className="bg-white py-20 lg:py-24 relative overflow-hidden border-t border-slate-100">
            {/* Subtle background accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,134,206,0.04)_0%,transparent_60%)] pointer-events-none" />

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
                            <div className="eyebrow text-[#3886CE] bg-[#3886CE]/10 border border-[#3886CE]/20 px-3.5 py-1 text-[11px]">
                                <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
                                THE ENABLERS
                            </div>
                        </div>
                        <h2 className="text-2xl lg:text-[30px] font-bold text-[#0A2F52] font-display mb-4 leading-[1.2]">
                            Platforms <br className="hidden lg:block" />That Power <br className="hidden lg:block" />Enterprise Growth
                        </h2>
                        <p className="text-[13px] text-slate-500 leading-relaxed max-w-[280px]">
                            Every enterprise depends on platforms that support different parts of the business. We help organizations bring them together into a secure, scalable environment where each platform strengthens the value of the others.
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
                                <div className={`h-16 w-16 rounded-2xl ${item.iconBoxStyle} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${item.hoverStyle}`}>
                                    <item.icon strokeWidth={1.5} className="h-7 w-7 transition-colors duration-300" />
                                </div>
                                <h3 className={`text-[17px] font-bold text-[#0A2F52] mb-2.5 ${item.titleHoverStyle} transition-colors duration-300`}>{item.title}</h3>
                                <p className="text-[12.5px] text-slate-500 leading-relaxed mb-6 flex-grow">
                                    {item.description}
                                </p>
                                <Link href={item.href} className="inline-flex items-center gap-1.5 text-[#3886CE] font-semibold text-[13px] hover:gap-2 transition-all mt-auto">
                                    Learn More <ArrowRight className="h-4 w-4" />
                                </Link>
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
            title: "Cost-Optimized <span class='text-[#3886CE]'>Document Platform</span> on AWS",
            image: "/images/Case_Studies/Optimized/cs-22.png",
            description: "Reduced costs to zero licensing while scaling document management on AWS.",
            href: "/insights/case-studies/cost-optimized-document-platform-on-aws"
        },
        {
            title: "<span class='text-[#3886CE]'>Intelligent Service Operations</span> on Salesforce",
            image: "/images/Case_Studies/Optimized/cs-13.png",
            description: "Enabled faster, smarter customer support through unified service operations on Salesforce.",
            href: "/insights/case-studies/scaling-service-operations-with-salesforce"
        },
        {
            title: "<span class='text-[#3886CE]'>Enterprise CRM Modernization</span> on Microsoft Cloud",
            image: "/images/Case_Studies/Optimized/cs-18.png",
            description: "Transformed a legacy CRM into a cloud-native Microsoft ecosystem with zero downtime.",
            href: "/insights/case-studies/microsoft-crm-modernization"
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
                        <motion.div
                            variants={animations.fadeInUp}
                            className="mb-14 lg:mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A2F52] mb-6">
                                Case Studies
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
                                Real implementations demonstrating how modern enterprise platforms unlock operational efficiency, integration, and business resilience.
                            </p>
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
                                            className="font-display text-[17px] sm:text-[18px] font-extrabold text-[#0A2F52] leading-[1.3] tracking-tight mb-2.5"
                                            dangerouslySetInnerHTML={{ __html: study.title }}
                                        />

                                        <p className="text-[13px] lg:text-[13.5px] font-medium text-slate-500 leading-relaxed mb-6 flex-1">
                                            {study.description}
                                        </p>

                                        <Link
                                            href={study.href}
                                            className="flex items-center justify-between w-full py-3.5 px-5 bg-white text-[#135498] border border-blue-200/70 rounded-xl text-[13px] font-bold shadow-xs transition-all duration-300 group-hover:bg-[#135498] group-hover:border-[#135498] group-hover:text-white mt-auto"
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

/* ------------------- Why Hyniva EP Section ------------------- */
function WhyHynivaEP() {
    const bottomBox = [
        {
            title: "Platform-Agnostic\nPerspective",
            description: "We recommend the right combination of platforms based on business needs rather than technology preferences.",
            icon: Target
        },
        {
            title: "Integration-First\nThinking",
            description: "We design connected ecosystems where applications, data and workflows operate as one, maximizing the value of every platform investment.",
            icon: Layers
        },
        {
            title: "Industry-Focused\nImplementation",
            description: "Our experience across Banking, Insurance, Wealth Management, Education and Logistics enables faster delivery with industry-specific best practices.",
            icon: Globe2
        },
        {
            title: "Continuous Platform\nOptimization",
            description: "Enterprise platforms aren't static. We continuously refine, extend and optimize platform capabilities to improve adoption, governance and long-term value.",
            icon: TrendingUp
        }
    ];

    return (
        <section className="bg-white py-[14px] sm:py-[20px] lg:py-[26px]">
            <div className="mx-auto w-full max-w-[84rem] xl:max-w-[86rem] px-6 md:px-10 lg:px-16 flex flex-col gap-6">

                {/* ── TOP BOX ── */}
                <motion.div
                    variants={animations.fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[24px] sm:p-[32px] lg:p-[42px]"
                >
                    {/* Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(56,134,206,0.35)_0%,transparent_70%)] pointer-events-none" />

                    {/* Stack on phones + tablets (incl. iPad Pro 1024); side-by-side from md */}
                    <div className="relative z-10 grid gap-8 md:gap-12 md:grid-cols-[1fr_auto] items-start">

                        {/* ── LEFT: Badge + Heading ── */}
                        <div className="flex flex-col items-start min-w-0">
                            <div className="eyebrow text-[#3886CE] bg-[#3886CE]/10 border border-[#3886CE]/20 mb-6 px-3.5 py-1 text-[10px]">
                                <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
                                THE DIFFERENCE
                            </div>
                            <h2 className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-[900] text-white tracking-tight leading-[1.18] font-display">
                                <span className="block">Why Organizations</span>
                                <span className="block">Choose Hyniva for</span>
                                <span className="text-[#3886CE] block">Enterprise Platforms?</span>
                            </h2>
                        </div>

                        {/* ── RIGHT: Stats + CTA ── */}
                        <div className="flex flex-col items-start justify-between gap-5 md:gap-6 md:pl-8 w-full pt-0 md:pt-[44px] min-w-0">
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3 sm:gap-6 xl:gap-10 xl:gap-12 w-full">
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[22px] xs:text-[26px] sm:text-[30px] xl:text-[32px] font-[900] text-white leading-none font-display">3</span>
                                    </div>
                                    <span className="text-[10px] xs:text-[11px] sm:text-[11.5px] xl:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.3] sm:leading-[1.4]">
                                        {"Strategic\nPartnerships"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[22px] xs:text-[26px] sm:text-[30px] xl:text-[32px] font-[900] text-white leading-none font-display">150</span>
                                        <span className="text-[16px] xs:text-[20px] sm:text-[22px] xl:text-[24px] font-black text-white leading-none">+</span>
                                    </div>
                                    <span className="text-[10px] xs:text-[11px] sm:text-[11.5px] xl:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.3] sm:leading-[1.4]">
                                        {"Platform\nImplementations"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[22px] xs:text-[26px] sm:text-[30px] xl:text-[32px] font-[900] text-white leading-none font-display">99.9</span>
                                        <span className="text-[14px] xs:text-[18px] sm:text-[20px] xl:text-[22px] font-black text-white leading-none ml-0.5">%</span>
                                    </div>
                                    <span className="text-[10px] xs:text-[11px] sm:text-[11.5px] xl:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.3] sm:leading-[1.4]">
                                        {"Platform\nAvailability"}
                                    </span>
                                </div>
                            </div>
                            {/* CTA */}
                            <div className="pt-2 sm:pt-3 w-full flex justify-start">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3886CE] to-[#135498] text-white font-bold tracking-wider text-[11px] sm:text-[12px] uppercase px-4.5 sm:px-5.5 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(56,134,206,0.7)] shadow-[0_0_12px_rgba(56,134,206,0.4)] border border-[#3886CE]/30 w-full sm:w-auto"
                                >
                                    <span>KNOW MORE</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* ── BOTTOM BOX ── */}
                <motion.div
                    variants={animations.fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] py-[24px] sm:py-[32px] xl:py-[42px] px-[24px] sm:px-[32px] xl:px-[42px] border border-[#ECF6FF]/80 drop-shadow-sm overflow-hidden"
                >
                    {/* 1 col phone · 2 col tablet (iPad Mini/Air/Pro) · 4 col desktop xl+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-6 xl:gap-10 xl:gap-12">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className="flex flex-col min-w-0 text-left">
                                <div className="h-9 w-9 bg-white shadow-sm flex items-center justify-center rounded-full mb-4 flex-shrink-0">
                                    <card.icon className="w-4.5 h-4.5 text-[#3886CE]" />
                                </div>
                                <h3 className="text-[14px] sm:text-[15px] xl:text-[16px] font-black text-[#0A2F52] mb-2 leading-tight font-display whitespace-pre-line">
                                    {card.title}
                                </h3>
                                <p className="text-[12px] sm:text-[13px] xl:text-[13px] text-[#0A2F52]/80 font-medium leading-relaxed">
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

/* ------------------- Page ------------------- */
export default function EnterprisePlatformsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <DigitalTransformationHero />
                <WhyHyniva />
                <WhatWeTransform />
                <TimelineProcess 
                    eyebrow="OUR APPROACH"
                    title="From Platforms to Performance"
                    description="Successful platform initiatives extend beyond implementation. Our approach aligns platforms, integrations and workflows into a cohesive operating environment that simplifies operations and maximizes the value of every technology investment."
                    steps={[
                        {
                            num: "01",
                            title: "Assess",
                            desc: <>Understand the current platform landscape and identify opportunities for consolidation and integration.</>,
                            angle: 45
                        },
                        {
                            num: "02",
                            title: "Integrate",
                            desc: <>Connect enterprise applications and establish reliable, scalable interactions across systems.</>,
                            angle: -30
                        },
                        {
                            num: "03",
                            title: "Orchestrate",
                            desc: <>Coordinate data, workflows and intelligent automation to create a unified operating model.</>,
                            angle: 120
                        },
                        {
                            num: "04",
                            title: "Optimize",
                            desc: <>Continuously extend platform capabilities while strengthening governance, performance and adoption.</>,
                            angle: 210
                        }
                    ]}
                />
                <EnterpriseEnablement />
                <WhyHynivaEP />
                <TransformationInAction />
                <Faq items={enterprisePlatformsFaqs} />
            </main>
            <Footer />
        </div>
    );
}
