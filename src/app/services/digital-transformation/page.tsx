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
                                DIGITAL TRANSFORMATION
                            </div>
                        </motion.div>
                        <motion.h1
                            variants={animations.fadeInUp}
                            className="mt-6 text-4xl font-[900] leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[54px] lg:text-[60px] xl:text-[64px] lg:mt-8 font-display"
                        >
                            <span className="whitespace-nowrap">Modernize <span className="text-[#00D4AA]">operations.</span></span><br />
                            <span className="whitespace-nowrap">Elevate <span className="text-[#00D4AA]">experiences.</span></span>
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-lg leading-relaxed text-slate-300 sm:text-xl max-w-xl lg:mt-10"
                        >
                            Businesses transform to remain relevant, adapting faster to shifting markets and evolving user needs.
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
                        <div className="absolute right-[-15%] lg:right-[-20%] top-[5%] lg:top-[10%] w-[450px] h-[450px] lg:w-[650px] lg:h-[650px] pointer-events-none flex items-center justify-center">
                            {/* Ambient background glow (increased visibility) */}
                            <div className="absolute left-[15%] top-[20%] w-[300px] h-[450px] bg-[#06b6d4]/30 blur-[80px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[200px] h-[350px] bg-[#8b5cf6]/30 blur-[80px] rounded-full" />
                            
                            {/* Soft radial illumination inside center */}
                            <div className="absolute inset-[20%] bg-gradient-to-tr from-indigo-500/10 to-cyan-400/10 blur-[50px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Abstract CSS Neon Ribbon Illustration - Premium Glass/Linear Style */}
                        <div className="absolute right-[-15%] lg:right-[-20%] top-[5%] lg:top-[10%] w-[450px] h-[450px] lg:w-[650px] lg:h-[650px] pointer-events-none flex items-center justify-center z-10">

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
        <section className="bg-white pt-5 pb-0 lg:pt-5 lg:pb-0">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.fadeInUp}
                        className="relative h-[450px] lg:h-[600px] w-full rounded-2xl overflow-hidden p-[20px] group mt-8 lg:mt-12"
                    >
                        <Image
                            src="/images/Our_Services/Digital_Transformation_no_BG.svg"
                            alt="Connected Enterprise UI"
                            fill
                            className="object-contain scale-110 lg:scale-125 transform-gpu origin-center transition-transform duration-700 ease-out group-hover:scale-[1.15] lg:group-hover:scale-[1.35] group-hover:-translate-y-2"
                        />
                        {/* Gradient masks to bury image edges when zoomed */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
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
                            Transformation with Purpose
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="mt-6 space-y-6 text-lg text-slate-600 leading-relaxed">
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
            description: "Legacy systems slow innovation and limit business agility."
        },
        {
            icon: Users,
            description: "Fragmented customer experiences weaken engagement and loyalty."
        },
        {
            icon: Database,
            description: "Disconnected enterprise data delays informed decision-making."
        },
        {
            icon: Settings,
            description: "Manual processes reduce efficiency and increase operational effort."
        },
        {
            icon: TrendingUp,
            description: "Rising technology costs limit investment in innovation."
        },
        {
            icon: BrainCircuit,
            description: "AI initiatives struggle without trusted data and modern foundations."
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
                        Why Businesses Must Transform
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="mt-6 text-[17px] text-slate-600 leading-relaxed w-full">
                        Change is no longer driven by technology alone. It&apos;s driven by evolving customer expectations, faster market shifts and increasing <br className="hidden md:block"/>competitive pressure. Organizations that fail to adapt often find themselves constrained by operational complexity rather than market opportunity.
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
            title: "Applied AI",
            icon: Bot,
            iconBg: "bg-blue-50 group-hover:bg-blue-500",
            iconColor: "text-blue-600 group-hover:text-white",
            description: "Embed intelligence across business operations with AI-powered automation, intelligent workflows, document processing and enterprise agents that improve productivity and decision-making.",
            href: "/services/digital-transformation/applied-ai"
        },
        {
            title: "Data Intelligence",
            icon: LineChart,
            iconBg: "bg-teal-50 group-hover:bg-teal-500",
            iconColor: "text-teal-600 group-hover:text-white",
            description: "Build trusted data foundations that improve visibility, governance and analytics while enabling AI-ready enterprises capable of making faster, smarter business decisions.",
            href: "/services/digital-transformation/data-intelligence"
        },
        {
            title: "Cloud Migration",
            icon: CloudUpload,
            iconBg: "bg-sky-50 group-hover:bg-sky-500",
            iconColor: "text-sky-600 group-hover:text-white",
            description: "Modernize legacy infrastructure and applications through secure cloud migration strategies that improve scalability, resilience and operational efficiency.",
            href: "/services/digital-transformation/cloud-migration"
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
                            Capabilities <br className="hidden lg:block" />That Enable <br className="hidden lg:block" />Transformation
                        </h2>
                        <p className="text-[17px] text-slate-600 leading-relaxed">
                            Transformation isn't delivered through a single technology. It requires the right combination of intelligence, data and cloud capabilities working together to create a resilient digital foundation.
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
                                <Link href={item.href} className="inline-flex items-center gap-2 text-[#00D4AA] font-semibold text-[14px] hover:text-[#00b38f] transition-colors mt-auto">
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
                                Real-world implementations demonstrating how we help enterprises evolve through comprehensive digital and cloud transformation.
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

/* ------------------- Why Hyniva DT Section ------------------- */
function WhyHynivaDT() {
    const bottomBox = [
        {
            title: "Business Before Technology",
            description: "Every engagement starts with understanding the business outcomes you're trying to achieve. Technology follows purpose, not the other way around.",
            icon: Target
        },
        {
            title: "Product Thinking\nin Every Engagement",
            description: "Having built enterprise\nplatforms ourselves, we approach transformation with the mindset\nof product builders, balancing scalability, usability and\nlong-term evolution.",
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
                                Choose <span className="text-[#00D4AA]">Hyniva</span> for <br/>
                                Digital Transformation<span className="text-[#00D4AA]">?</span>
                            </h2>
                        </div>

                        {/* Right Side: Metrics & CTA */}
                        <div className="flex flex-col lg:pl-16 lg:mt-[72px]">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8 mb-10">
                                <div className="flex flex-col">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">220+</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Applications<br/>Delivered</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">45+</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Enterprise<br/>Clients</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">5 Yrs</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Average Tenure<br/>of Clients</div>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Link 
                                    href="/contact"
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
export default function DigitalTransformationPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <DigitalTransformationHero />
                <WhyHyniva />
                <WhatWeTransform />
                <TimelineProcess title="From Vision to Value" />
                <EnterpriseEnablement />
                <WhyHynivaDT />
                <TransformationInAction />
            </main>
            <Footer />
        </div>
    );
}
