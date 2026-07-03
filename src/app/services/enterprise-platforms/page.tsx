"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, BarChart3, Cloud, Server, Users, Settings, TrendingUp, Database, Target, Layers, Globe2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TimelineProcess } from "@/components/timeline-process";

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

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-10 pt-16 sm:pb-12 sm:pt-20 lg:pb-16 lg:pt-24">
                    <motion.div
                        variants={animations.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        <motion.div variants={animations.fadeInUp} className="flex mb-6">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                ENTERPRISE PLATFORMS
                            </div>
                        </motion.div>
                        <motion.h1
                            variants={animations.fadeInUp}
                            className="mt-6 text-4xl font-[900] leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[54px] lg:text-[60px] xl:text-[64px] lg:mt-8 font-display"
                        >
                            <span className="whitespace-nowrap">Unify <span className="text-[#00D4AA]">platforms.</span></span><br />
                            <span className="whitespace-nowrap">Power the <span className="text-[#00D4AA]">enterprise.</span></span>
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-lg leading-relaxed text-slate-300 sm:text-xl max-w-2xl lg:mt-10"
                        >
                            Businesses connect platforms, people and information to build the digital backbone for a more responsive enterprise.
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
                        className="relative hidden lg:flex items-center justify-end h-[450px] w-full"
                    >
                        {/* Identical Ambient Glow Container from Digital Transformation */}
                        <div className="absolute right-[-15%] lg:right-[-20%] top-[5%] lg:top-[10%] w-[450px] h-[450px] lg:w-[650px] lg:h-[650px] pointer-events-none flex items-center justify-center">
                            {/* Ambient background glow (increased visibility) */}
                            <div className="absolute left-[15%] top-[20%] w-[300px] h-[450px] bg-[#06b6d4]/30 blur-[80px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[200px] h-[350px] bg-[#8b5cf6]/30 blur-[80px] rounded-full" />
                            {/* Soft radial illumination inside center */}
                            <div className="absolute inset-[20%] bg-gradient-to-tr from-indigo-500/10 to-cyan-400/10 blur-[50px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Abstract Glass Blocks Illustration - Crisp Line Art Style */}
                        <div className="absolute right-[-15%] lg:right-[-25%] top-[-5%] lg:top-[-5%] w-[500px] h-[500px] lg:w-[750px] lg:h-[750px] pointer-events-none flex items-center justify-center [perspective:1200px]">

                            {/* Isometric Container */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="relative w-full h-full flex items-center justify-center [transform:rotateX(60deg)_rotateZ(-45deg)] [transform-style:preserve-3d]"
                            >
                                {/* Block 1 (Large Base Platform) - Crisp Cyan */}
                                <motion.div 
                                    initial={{ z: 0, opacity: 0 }}
                                    animate={{ z: 20, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                    className="absolute top-[20%] left-[20%] w-[35%] h-[35%] rounded-2xl border border-[#06b6d4]/60 border-l-[5px] border-t-[3px] border-l-[#06b6d4] border-t-[#06b6d4]/80 bg-[#06b6d4]/10"
                                >
                                </motion.div>

                                {/* Block 2 (Medium Accent Block) - Deep Magenta */}
                                <motion.div 
                                    initial={{ z: 0, opacity: 0 }}
                                    animate={{ z: 60, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                                    className="absolute bottom-[25%] right-[25%] w-[25%] h-[25%] rounded-xl border border-[#d946ef]/60 border-l-[6px] border-t-[3px] border-l-[#d946ef] border-t-[#d946ef]/80 bg-[#d946ef]/10"
                                >
                                </motion.div>

                                {/* Block 3 (Floating Core Slabs) - Bright White */}
                                <motion.div 
                                    initial={{ z: 0, opacity: 0 }}
                                    animate={{ z: 100, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                                    className="absolute top-[35%] left-[45%] w-[20%] h-[20%] rounded-xl border border-white/60 border-l-[5px] border-t-[3px] border-l-[#ffffff] border-t-white/80 bg-white/10"
                                >
                                </motion.div>

                                {/* Block 4 (High Floating Small Cube) - Deep Indigo */}
                                <motion.div 
                                    initial={{ z: 0, opacity: 0 }}
                                    animate={{ z: 140, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                                    className="absolute bottom-[20%] left-[30%] w-[12%] h-[12%] rounded-lg border border-[#4f46e5]/60 border-l-[8px] border-b-[3px] border-l-[#4f46e5] border-b-[#4f46e5]/80 bg-[#4f46e5]/20"
                                >
                                </motion.div>

                                {/* Block 5 (Additional Blue Accent) - Bright Blue */}
                                <motion.div 
                                    initial={{ z: 0, opacity: 0 }}
                                    animate={{ z: 80, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                    className="absolute top-[15%] right-[20%] w-[18%] h-[18%] rounded-xl border border-[#3b82f6]/60 border-l-[5px] border-t-[3px] border-l-[#3b82f6] border-t-[#3b82f6]/80 bg-[#3b82f6]/10"
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
        <section className="bg-white pt-5 pb-0 lg:pt-5 lg:pb-0">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.fadeInUp}
                        className="relative h-[450px] lg:h-[600px] w-full rounded-2xl overflow-hidden p-[20px] group"
                    >
                        <Image
                            src="/images/Our_Services/2_Enterprise_Platforms.png"
                            alt="Enterprise Platforms Architecture"
                            fill
                            className="object-contain scale-100 lg:scale-110 transform-gpu origin-center transition-transform duration-700 ease-out group-hover:scale-[1.05] lg:group-hover:scale-[1.15] group-hover:-translate-y-2"
                        />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.staggerContainer}
                        className="flex flex-col justify-center h-full -mt-8 lg:-mt-12"
                    >
                        <motion.div variants={animations.fadeInUp} className="flex mb-4">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                OUR PHILOSOPHY
                            </div>
                        </motion.div>
                        <motion.h2 variants={animations.fadeInUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                            Connected by Design
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="mt-6 space-y-6 text-lg text-slate-600 leading-relaxed">
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
            icon: Server,
            description: "Disconnected platforms create disconnected business processes."
        },
        {
            icon: Database,
            description: "Data spread across systems limits enterprise visibility."
        },
        {
            icon: Settings,
            description: "Manual handoffs slow business operations and productivity."
        },
        {
            icon: Users,
            description: "Inconsistent user experiences reduce platform adoption."
        },
        {
            icon: BrainCircuit,
            description: "Point-to-point integrations increase complexity and maintenance."
        },
        {
            icon: TrendingUp,
            description: "Platform investments deliver less value when systems remain isolated."
        }
    ];

    return (
        <section className="bg-[#f8fafc] pt-16 pb-24 lg:pt-20 lg:pb-24 relative overflow-hidden">
            {/* Dotted background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
            
            <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animations.staggerContainer}
                    className="text-center max-w-[1200px] mx-auto mb-10"
                >
                    <motion.div variants={animations.fadeInUp} className="flex justify-center mb-6">
                        <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                            <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                            ENTERPRISE REALITY
                        </div>
                    </motion.div>
                    <motion.h2 variants={animations.fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900">
                        Why Connected Platforms Matter
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="mt-6 text-[17px] text-slate-600 leading-relaxed w-full max-w-3xl mx-auto">
                        Enterprise platforms often evolve independently over time, creating disconnected environments that become increasingly difficult to manage.
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
            title: "Salesforce",
            icon: BrainCircuit,
            iconBg: "bg-blue-50 group-hover:bg-blue-500",
            iconColor: "text-blue-600 group-hover:text-white",
            description: "Create connected customer experiences with CRM, Financial Services Cloud, Service Cloud, Experience Cloud and AI-powered automation."
        },
        {
            title: "Microsoft Services",
            icon: BarChart3,
            iconBg: "bg-teal-50 group-hover:bg-teal-500",
            iconColor: "text-teal-600 group-hover:text-white",
            description: "Empower employees with modern workplace solutions, business applications, data platforms and intelligent productivity tools across the Microsoft ecosystem."
        },
        {
            title: "AWS Cloud",
            icon: Cloud,
            iconBg: "bg-sky-50 group-hover:bg-sky-500",
            iconColor: "text-sky-600 group-hover:text-white",
            description: "Build secure, scalable cloud environments that accelerate innovation, improve resilience and support enterprise applications at scale."
        }
    ];

    return (
        <section className="bg-white py-24 relative overflow-hidden border-t border-slate-100">
            {/* Subtle background accents for white theme */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05)_0%,transparent_60%)]" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">
                    {/* Left Sidebar Text */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={animations.fadeInUp}
                        className="lg:w-[25%] flex flex-col pt-4"
                    >
                        <div className="flex mb-6">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                THE ENABLERS
                            </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                            Platforms <br className="hidden lg:block" />That Power <br className="hidden lg:block" />Enterprise Growth
                        </h2>
                        <p className="text-[17px] text-slate-600 leading-relaxed">
                            Every enterprise depends <br className="hidden md:block"/>on platforms that support different <br/>parts of the business. We help organizations bring them together into a secure, scalable environment where each platform strengthens the value of the others.
                        </p>
                    </motion.div>

                    {/* Right Grid */}
                    <div className="lg:w-[75%] grid grid-cols-1 md:grid-cols-3 gap-6">
                        {enablers.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                            >
                                <div className={`h-24 w-24 rounded-2xl ${item.iconBg} flex items-center justify-center mb-8 transition-colors duration-500`}>
                                    <item.icon strokeWidth={1.5} className={`h-12 w-12 ${item.iconColor} transition-colors duration-500`} />
                                </div>
                                <h3 className="text-[20px] font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-[14px] text-slate-600 leading-relaxed mb-8 flex-grow">
                                    {item.description}
                                </p>
                                <Link href="#" className="inline-flex items-center gap-2 text-[#00D4AA] font-semibold text-[14px] hover:text-[#00b38f] transition-colors mt-auto">
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
            title: "Cost-Optimized <span class='text-[#3B82F6]'>Document Platform</span> on AWS",
            image: "/images/Case_Studies/Optimized/cs-22.png",
            description: "Reduced costs to zero licensing while scaling document management on AWS.",
            href: "/insights/case-studies/cost-optimized-document-platform-on-aws"
        },
        {
            title: "<span class='text-[#3B82F6]'>Intelligent Service Operations</span> on Salesforce",
            image: "/images/Case_Studies/Optimized/cs-13.png",
            description: "Enabled faster, smarter customer support through unified service operations on Salesforce.",
            href: "/insights/case-studies/scaling-service-operations-with-salesforce"
        },
        {
            title: "<span class='text-[#3B82F6]'>Enterprise CRM Modernization</span> on Microsoft Cloud",
            image: "/images/Case_Studies/Optimized/cs-18.png",
            description: "Transformed a legacy CRM into a cloud-native Microsoft ecosystem with zero downtime.",
            href: "/insights/case-studies/microsoft-crm-modernization"
        }
    ];

    return (
        <section className="bg-[#f8fafc] py-24">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div>
                    {/* Case Studies */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={animations.staggerContainer}
                        className="w-full"
                    >
                        <motion.div
                            variants={animations.fadeInUp}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#030B3B] mb-6 uppercase tracking-wide">
                                CASE STUDIES
                            </h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
                                Real implementations demonstrating how modern enterprise platforms unlock operational efficiency, integration, and business resilience.
                            </p>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {caseStudies.map((study, idx) => (
                                <motion.div 
                                    key={idx}
                                    variants={animations.fadeInUp}
                                    className="group flex flex-col rounded-[32px] bg-[#ECF6FF] border border-[#030B3B]/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative h-full"
                                >
                                    {/* Card Image */}
                                    <div className="aspect-[1.8/1] overflow-hidden relative m-3 rounded-[24px] bg-white">
                                        {study.image && (
                                            <Image
                                                src={study.image}
                                                alt={study.title.replace(/<[^>]*>/g, "")}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#ECF6FF]/20 to-transparent opacity-40" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                                        <h3
                                            className="font-display text-[21px] font-bold text-[#030B3B] leading-[1.4] tracking-tight mb-4 flex-1"
                                            dangerouslySetInnerHTML={{ __html: study.title }}
                                        />

                                        <p className="text-[15px] font-medium text-[#030B3B]/70 leading-relaxed mb-8 flex-1">
                                            {study.description}
                                        </p>

                                        <Link
                                            href={study.href}
                                            className="flex items-center justify-between w-full py-4 px-6 bg-white border border-[#1e90ff]/20 rounded-2xl text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(30,144,255,0.3)]"
                                        >
                                            Read Case Study
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
        <section className="bg-white px-6 py-[30px] sm:py-[40px] lg:py-[50px] lg:px-8">
            <div className="mx-auto max-w-[1200px] flex flex-col gap-4">
                {/* ── Top Box: Dark Glowing Container ── */}
                <motion.div 
                    variants={animations.fadeInUp}
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[30px] sm:p-[40px] lg:p-[50px]"
                >
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-12 lg:gap-16 lg:grid-cols-2 items-start">
                        {/* Left Side */}
                        <div className="flex flex-col items-start">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                THE DIFFERENCE
                            </div>
                            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-[900] text-[#ffffff] tracking-tight leading-[1.2] mb-0 font-display">
                                Why Organizations<br/>
                                Choose Hyniva for <br/>
                                <span className="text-[#00D4AA]">Enterprise Platforms?</span>
                            </h2>
                        </div>

                        {/* Right Side: Metrics & CTA */}
                        <div className="flex flex-col lg:pl-16 lg:mt-[72px]">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8 mb-10">
                                <div className="flex flex-col">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">3</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Strategic<br/>Partnerships</div>
                                </div>
                                <div className="flex flex-col relative -left-[20px]">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">150+</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Platform<br/>Implementations</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">99.9%</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Platform<br/>Availability</div>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Link 
                                    href="/about-us"
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white eyebrow px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3B82F6]/30 w-full sm:w-auto"
                                >
                                    KNOW MORE <ArrowRight className="h-4 w-4" />
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
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] p-[30px] sm:p-[40px] lg:p-[50px] border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="h-10 w-10 bg-white shadow-sm flex items-center justify-center rounded-xl mb-6 flex-shrink-0">
                                    <card.icon className="w-5 h-5 text-[#3B82F6]" />
                                </div>
                                <h3 className="text-[18px] font-black text-[#030B3B] mb-3 leading-tight font-display whitespace-pre-line">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-[#030B3B]/80 font-medium leading-relaxed whitespace-pre-line">
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
                    title="Connect with Purpose"
                    description={<>Successful platform initiatives extend beyond implementation. Our approach aligns platforms, integrations and workflows <br/>into a cohesive operating environment that simplifies operations and maximizes the value of every technology investment.</>}
                    steps={[
                        {
                            num: "01",
                            title: "Assess",
                            desc: <>Understand the current<br/>platform landscape and identify opportunities<br/>for consolidation and integration.</>,
                            angle: 45
                        },
                        {
                            num: "02",
                            title: "Integrate",
                            desc: <>Connect enterprise<br/>applications and establish reliable,<br/>scalable interactions across systems.</>,
                            angle: -30
                        },
                        {
                            num: "03",
                            title: "Orchestrate",
                            desc: <>Coordinate data,<br/>workflows and intelligent automation<br/>to create a unified operating model.</>,
                            angle: 120
                        },
                        {
                            num: "04",
                            title: "Optimize",
                            desc: <>Continuously extend<br/>platform capabilities while strengthening<br/>governance, performance and adoption.</>,
                            angle: 210
                        }
                    ]}
                />
                <EnterpriseEnablement />
                <WhyHynivaEP />
                <TransformationInAction />
            </main>
            <Footer />
        </div>
    );
}
