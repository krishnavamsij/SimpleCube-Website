"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, BarChart3, Cloud, Server, Users, Settings, TrendingUp, Database, Target, Layers, Globe2, Bot, LineChart, CloudUpload } from "lucide-react";
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

            <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-10 pt-16 sm:pb-12 sm:pt-20 lg:pb-16 lg:pt-24">
                    <motion.div
                        variants={animations.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl"
                    >
                        <motion.div variants={animations.fadeInUp} className="flex mb-6">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                DIGITAL TRANSFORMATION
                            </div>
                        </motion.div>
                        <motion.h1
                            variants={animations.fadeInUp}
                            className="mt-6 text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-[900] leading-[1.1] tracking-tight text-white lg:mt-8 font-display"
                        >
                            <span className="whitespace-nowrap">Modernize <span className="text-[#00D4AA]">operations.</span></span><br />
                            <span className="whitespace-nowrap">Elevate <span className="text-[#00D4AA]">experiences.</span></span>
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 max-w-xl lg:mt-10 whitespace-pre-line"
                        >
                            {"Businesses transform to remain relevant, adapting faster to\nshifting markets and evolving user needs."}
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
                        {/* Identical Ambient Glow Container from Enterprise Platforms */}
                        <div className="absolute right-[-12%] lg:right-[-18%] xl:right-[-20%] top-[5%] lg:top-[10%] w-[450px] h-[450px] lg:w-[600px] lg:h-[600px] pointer-events-none flex items-center justify-center">
                            {/* Ambient background glow (increased visibility) */}
                            <div className="absolute left-[15%] top-[20%] w-[300px] h-[450px] bg-[#06b6d4]/30 blur-[80px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[200px] h-[350px] bg-[#8b5cf6]/30 blur-[80px] rounded-full" />
                            
                            {/* Soft radial illumination inside center */}
                            <div className="absolute inset-[20%] bg-gradient-to-tr from-indigo-500/10 to-cyan-400/10 blur-[50px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Abstract CSS Neon Ribbon Illustration - Premium Glass/Linear Style */}
                        <div className="absolute right-[-12%] lg:right-[-18%] xl:right-[-20%] top-[5%] lg:top-[10%] w-[450px] h-[450px] lg:w-[600px] lg:h-[600px] pointer-events-none flex items-center justify-center z-10">

                            {/* Base Glass Ring */}
                            <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />

                            {/* Crisp Indigo/Cyan Outer Edge (Half Circle) */}
                            <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                                <div className="w-full h-full rounded-full border-t-[5px] border-l-[5px] border-transparent border-t-[#06b6d4]/100 border-l-[#06b6d4]/100 transform -rotate-12" />
                            </div>

                            {/* Solid Bright Core Line (Quarter Circle) */}
                            <div className="absolute inset-[10px] animate-[spin_10s_linear_infinite_reverse]">
                                <div className="w-full h-full rounded-full border-l-[3px] border-transparent border-l-[#ffffff]/100 transform -rotate-6" />
                            </div>

                            {/* Deep Magenta/Indigo Sweep (Half Circle) */}
                            <div className="absolute inset-[25px] animate-[spin_6s_linear_infinite]">
                                <div className="w-full h-full rounded-full border-b-[8px] border-l-[8px] border-transparent border-b-[#6366f1]/100 border-l-[#6366f1]/100 transform rotate-15" />
                            </div>
                            
                            {/* Inner Specular Highlight (Half Circle) */}
                            <div className="absolute inset-[30px] animate-[spin_12s_linear_infinite]">
                                <div className="w-full h-full rounded-full border-r-[2px] border-t-[2px] border-transparent border-r-white/100 border-t-white/100 transform rotate-[18deg]" />
                            </div>

                            {/* Smooth Magenta Accent (Pink Half Circle) */}
                            <div className="absolute inset-[45px] animate-[spin_9s_linear_infinite_reverse]">
                                <div className="w-full h-full rounded-full border-t-[7px] border-r-[7px] border-transparent border-t-[#d946ef]/100 border-r-[#d946ef]/100 transform -rotate-25" />
                            </div>

                            {/* Crisp Cyan Inner Border (Quarter Circle) */}
                            <div className="absolute inset-[60px] animate-[spin_5s_linear_infinite]">
                                <div className="w-full h-full rounded-full border-b-[5px] border-transparent border-b-[#22d3ee]/100 transform rotate-5" />
                            </div>
                            
                            {/* Deep Indigo Core Layer (Quarter Circle) */}
                            <div className="absolute inset-[80px] animate-[spin_11s_linear_infinite_reverse]">
                                <div className="w-full h-full rounded-full border-l-[17px] border-transparent border-l-[#4f46e5]/80 transform -rotate-[8deg]" />
                            </div>
                            <div className="absolute inset-[82px] animate-[spin_11s_linear_infinite_reverse]">
                                <div className="w-full h-full rounded-full border-l-[2px] border-transparent border-l-white/80 transform -rotate-[8deg]" />
                            </div>

                            {/* Minimal crossing thread for elegance (Half Circle) */}
                            <div className="absolute inset-[100px] animate-[spin_15s_linear_infinite]">
                                <div className="w-full h-full rounded-full border-t-[2px] border-l-[2px] border-transparent border-t-cyan-200/80 border-l-cyan-200/80 transform rotate-[35deg]" />
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
        <section className="bg-white py-12 lg:py-16">
            <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Illustration Image */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.fadeInUp}
                        className="relative h-[380px] sm:h-[450px] lg:h-[500px] w-full flex items-center justify-center"
                    >
                        <Image
                            src="/images/Our_Services/Digital_Transformation_no_BG.svg"
                            alt="Transformation with Purpose"
                            fill
                            className="object-contain transform-gpu transition-transform duration-700 ease-out hover:scale-105"
                        />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.staggerContainer}
                        className="flex flex-col items-start justify-center"
                    >
                        <motion.div variants={animations.fadeInUp} className="flex mb-6">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                OUR PHILOSOPHY
                            </div>
                        </motion.div>
                        <motion.h2 variants={animations.fadeInUp} className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] xl:text-[40px] font-[900] text-[#030B3B] leading-[1.15] font-display mb-6">
                            Transformation with<br />
                            Purpose
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                            <p>
                                Every transformation initiative begins with a business objective, not a technology decision. Whether the goal is improving customer engagement, streamlining operations or creating new digital services, sustainable transformation comes from aligning strategy, people and technology around measurable outcomes.
                            </p>
                            <p>
                                At Hyniva, we focus on simplifying complexity before introducing new capabilities. This allows organizations to modernize while creating a foundation for continuous innovation.
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
            description: "Legacy systems slow innovation and\nlimit business agility."
        },
        {
            icon: Users,
            description: "Fragmented customer experiences\nweaken engagement and loyalty."
        },
        {
            icon: Database,
            description: "Disconnected enterprise data delays\ninformed decision-making."
        },
        {
            icon: Settings,
            description: "Manual processes reduce efficiency\nand increase operational effort."
        },
        {
            icon: TrendingUp,
            description: "Rising technology costs limit\ninvestment in innovation."
        },
        {
            icon: BrainCircuit,
            description: "AI initiatives struggle without trusted\ndata and modern foundations."
        }
    ];

    return (
        <section className="bg-[#f8fafc] min-h-screen py-16 lg:py-24 flex flex-col justify-center relative overflow-hidden">
            {/* Subtle Dotted background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
            
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animations.staggerContainer}
                    className="text-center max-w-[1240px] mx-auto mb-8 sm:mb-10"
                >
                    <motion.div variants={animations.fadeInUp} className="flex justify-center mb-6">
                        <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px]">
                            <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                            ENTERPRISE REALITY
                        </div>
                    </motion.div>
                    <motion.h2 variants={animations.fadeInUp} className="text-3xl sm:text-4xl lg:text-[40px] font-[900] text-[#030B3B] font-display text-center leading-tight mb-8 sm:mb-10">
                        Why Businesses Must Transform
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="text-slate-600 text-xs sm:text-sm lg:text-[13.5px] xl:text-[14px] leading-relaxed text-center max-w-[1240px] mx-auto whitespace-pre-line">
                        {"Change is no longer driven by technology alone. It's driven by evolving customer expectations, faster market shifts and increasing competitive pressure.\nOrganizations that fail to adapt often find themselves constrained by operational complexity rather than market opportunity."}
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6 w-full">
                    {challenges.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.5 }}
                            className="bg-white rounded-2xl p-5.5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
                        >
                            <div className="flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center bg-[#EFF6FF] text-[#3B82F6] transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-110">
                                <card.icon className="h-5 w-5 transition-colors duration-300" />
                            </div>
                            <p className="text-[13px] sm:text-[13.5px] font-normal text-[#030B3B]/80 leading-[1.35] whitespace-pre-line">
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
function EnableCapabilities() {
    const enablers = [
        {
            title: "Applied AI",
            icon: Bot,
            iconBoxStyle: "bg-[#EFF6FF] text-[#2563EB]",
            hoverStyle: "group-hover:bg-[#2563EB] group-hover:text-white",
            titleHoverStyle: "group-hover:text-[#2563EB]",
            description: "Embed intelligence across business operations with AI-powered automation, intelligent workflows, document processing and enterprise agents that improve productivity and decision-making.",
            href: "/services/digital-transformation/applied-ai"
        },
        {
            title: "Data Intelligence",
            icon: LineChart,
            iconBoxStyle: "bg-[#E6F4F1] text-[#00BBA7]",
            hoverStyle: "group-hover:bg-[#00BBA7] group-hover:text-white",
            titleHoverStyle: "group-hover:text-[#00BBA7]",
            description: "Build trusted data foundations that improve visibility, governance and analytics while enabling AI-ready enterprises capable of making faster, smarter business decisions.",
            href: "/services/digital-transformation/data-intelligence"
        },
        {
            title: "Cloud Migration",
            icon: CloudUpload,
            iconBoxStyle: "bg-[#E0F2FE] text-[#0284C7]",
            hoverStyle: "group-hover:bg-[#0284C7] group-hover:text-white",
            titleHoverStyle: "group-hover:text-[#0284C7]",
            description: "Modernize legacy infrastructure and applications through secure cloud migration strategies that improve scalability, resilience and operational efficiency.",
            href: "/services/digital-transformation/cloud-migration"
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
                            Capabilities <br className="hidden lg:block" />That Enable <br className="hidden lg:block" />Transformation
                        </h2>
                        <p className="text-[13px] text-slate-500 leading-relaxed max-w-[280px]">
                            Transformation isn&apos;t delivered through a single technology. It requires the right combination of intelligence, data and cloud capabilities working together to create a resilient digital foundation.
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
                                <h3 className={`text-[17px] font-bold text-[#030B3B] mb-2.5 ${item.titleHoverStyle} transition-colors duration-300`}>{item.title}</h3>
                                <p className="text-[12.5px] text-slate-500 leading-relaxed mb-6 flex-grow">
                                    {item.description}
                                </p>
                                <Link href={item.href} className="inline-flex items-center gap-1.5 text-[#00D4AA] font-semibold text-[13px] hover:gap-2 transition-all mt-auto">
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
            title: "<span class='text-[#3B82F6]'>Elevating Member Engagement</span> in Modern Banking Operations",
            image: "/images/Case_Studies/Optimized/cs-14.png",
            description: "Delivered real-time lending and engagement through a unified digital experience platform.",
            href: "/insights/case-studies/member-experience-transformation-at-a-leading-credit-union"
        },
        {
            title: "<span class='text-[#3B82F6]'>LWR Modernization</span> for High-Performance Experiences",
            image: "/images/Case_Studies/Optimized/cs-5.png",
            description: "Improved digital experience performance. 2× faster page loads with Lightning Web\u00A0Runtime.",
            href: "/insights/case-studies/lwr-modernization"
        },
        {
            title: "Modernizing Contact Centers with <span class='text-[#3B82F6]'>Intelligent IVR Self-Service</span>",
            image: "/images/Case_Studies/Optimized/cs-3.png",
            description: "Transformed legacy IVR into a Smart Customer Engagement Interaction\u00A0System.",
            href: "/insights/case-studies/intelligent-ivr-self-service"
        }
    ];

    return (
        <section className="bg-[#f8fafc] py-20 lg:py-24">
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
                            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-[900] text-[#030B3B] font-display uppercase tracking-wider mb-3">
                                CASE STUDIES
                            </h2>
                            <p className="text-[13.5px] sm:text-sm text-slate-500 font-normal leading-relaxed max-w-2xl">
                                Real-world implementations demonstrating how we help enterprises evolve through comprehensive digital and cloud transformation.
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
                                            className="font-display text-[17px] sm:text-[18px] font-bold text-[#030B3B] leading-[1.35] tracking-tight mb-3"
                                            dangerouslySetInnerHTML={{ __html: study.title }}
                                        />

                                        <p className="text-[12.5px] font-normal text-slate-500 leading-relaxed mb-6 flex-1">
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
            title: "Business Before\nTechnology",
            description: "Every engagement starts with understanding the business outcomes you're trying to achieve. Technology follows purpose, not the other way around.",
            icon: Target
        },
        {
            title: "Product Thinking in\nEvery Engagement",
            description: "Having built enterprise platforms ourselves, we approach transformation with the mindset of product builders, balancing scalability, usability and long-term evolution.",
            icon: Layers
        },
        {
            title: "Designed for\nAI Adoption",
            description: "We build transformation programs that establish the data, integration and cloud foundations required to support intelligent automation and future AI initiatives.",
            icon: BrainCircuit
        },
        {
            title: "Industry Context\nThat Matters",
            description: "Our teams bring deep domain knowledge across Banking, Insurance, Wealth Management, Education and Logistics, enabling faster delivery with reduced implementation risk.",
            icon: Globe2
        }
    ];

    return (
        <section className="bg-white py-[14px] sm:py-[20px] lg:py-[26px]">
            <div className="mx-auto w-full max-w-[84rem] xl:max-w-[86rem] px-6 md:px-10 lg:px-16 flex flex-col gap-4">

                {/* ── TOP BOX ── */}
                <motion.div
                    variants={animations.fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[24px] sm:p-[32px] lg:p-[42px]"
                >
                    {/* Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-8 lg:gap-12 lg:grid-cols-[1fr_auto] items-start">

                        {/* ── LEFT: Badge + Heading ── */}
                        <div className="flex flex-col items-start">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6 px-3.5 py-1 text-[10px]">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                THE DIFFERENCE
                            </div>
                            <h2 className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[29px] xl:text-[30px] font-[900] text-white tracking-tight leading-[1.18] font-display">
                                Why Organizations<br />
                                Choose <span className="text-white">Hyniva</span> for<br />
                                <span className="text-[#00D4AA]">Digital Transformation</span><span className="text-white">?</span>
                            </h2>
                        </div>

                        {/* ── RIGHT: Stats + CTA ── */}
                        <div className="flex flex-col items-start justify-between gap-5 lg:gap-6 lg:pl-8 w-full pt-0 lg:pt-[44px]">
                            {/* Stats */}
                            <div className="flex items-start justify-start gap-8 sm:gap-10 lg:gap-12 xl:gap-14 w-full">
                                <div className="flex flex-col items-start flex-shrink-0">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">220</span>
                                        <span className="text-[20px] sm:text-[22px] lg:text-[24px] font-black text-white leading-none">+</span>
                                    </div>
                                    <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.4]">
                                        {"Applications\nDelivered"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start flex-shrink-0">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">45</span>
                                        <span className="text-[20px] sm:text-[22px] lg:text-[24px] font-black text-white leading-none">+</span>
                                    </div>
                                    <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.4]">
                                        {"Enterprise\nClients"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start flex-shrink-0">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">5</span>
                                        <span className="text-[18px] sm:text-[20px] lg:text-[22px] font-black text-white leading-none ml-1">Yrs</span>
                                    </div>
                                    <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.4]">
                                        {"Average Tenure\nof Clients"}
                                    </span>
                                </div>
                            </div>
                            {/* CTA */}
                            <div className="pt-2 sm:pt-3 w-full flex justify-start">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold tracking-wider text-[11px] sm:text-[12px] uppercase px-4.5 sm:px-5.5 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] shadow-[0_0_12px_rgba(59,130,246,0.4)] border border-[#3B82F6]/30 w-full sm:w-auto"
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
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] py-5 px-6 sm:py-6 sm:px-8 lg:py-6 lg:px-10 border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                        {bottomBox.map((card, idx) => (
                            /* Box hover animation commented out per request while preserving layout & spacing */
                            <div key={idx} className="flex flex-col p-3 sm:p-4 rounded-2xl">
                                <div className="h-9 w-9 bg-white shadow-sm flex items-center justify-center rounded-xl mb-3 flex-shrink-0">
                                    <card.icon className="w-4.5 h-4.5 text-[#3B82F6]" />
                                </div>
                                <h3 className="text-[14px] font-black text-[#030B3B] mb-3.5 leading-tight font-display whitespace-pre-line">
                                    {card.title}
                                </h3>
                                <p className="text-[11px] lg:text-[11.5px] text-[#030B3B]/75 font-normal leading-[1.6] max-w-[215px] xl:max-w-[225px]">
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

export default function DigitalTransformationPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <DigitalTransformationHero />
                <WhyHyniva />
                <WhatWeTransform />
                <TimelineProcess title="From Vision to Value" />
                <EnableCapabilities />
                <WhyHynivaDT />
                <TransformationInAction />
            </main>
            <Footer />
        </div>
    );
}
