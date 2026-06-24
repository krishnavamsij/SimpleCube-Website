"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, BarChart3, Cloud } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-2 pt-12 sm:pb-2 sm:pt-16 md:pb-2 md:pt-16 lg:pb-4 lg:pt-16">
                    <motion.div
                        variants={animations.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl"
                    >
                        <motion.h1
                            variants={animations.fadeInUp}
                            className="mt-10 text-4xl font-[900] leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[68px] lg:mt-14 font-display"
                        >
                            Digital<br />
                            Transformation
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-lg leading-relaxed text-slate-300 sm:text-xl font-medium max-w-xl lg:mt-12"
                        >
                            Transform Today. <span className="text-[#00D4AA]">Lead Tomorrow.</span>
                        </motion.p>
                        <motion.div variants={animations.fadeInUp} className="mt-10 lg:mt-16">
                            <Link
                                href="/contact"
                                className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] border border-[#3B82F6]/30 rounded-full font-bold px-8 h-14 inline-flex items-center justify-center transition-all duration-300"
                            >
                                Request a Demo
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
                        {/* Abstract CSS Neon Ribbon Illustration - Premium Glass/Linear Style */}
                        <div className="absolute right-[-15%] lg:right-[-20%] top-[5%] lg:top-[10%] w-[450px] h-[450px] lg:w-[650px] lg:h-[650px] pointer-events-none flex items-center justify-center">
                            
                            {/* Ambient background glow (increased visibility) */}
                            <div className="absolute left-[15%] top-[20%] w-[300px] h-[450px] bg-[#06b6d4]/30 blur-[80px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[200px] h-[350px] bg-[#8b5cf6]/30 blur-[80px] rounded-full" />
                            
                            {/* Soft radial illumination inside center */}
                            <div className="absolute inset-[20%] bg-gradient-to-tr from-indigo-500/10 to-cyan-400/10 blur-[50px] rounded-full mix-blend-screen" />

                            {/* Base Glass Ring */}
                            <div className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-tr from-white/10 to-transparent backdrop-blur-md transform -rotate-12" />

                            {/* Crisp Indigo/Cyan Outer Edge */}
                            <div className="absolute inset-0 rounded-full border-l-[8px] border-t-[3px] border-[#06b6d4]/100 shadow-[-10px_0_30px_rgba(6,182,212,0.6)] transform -rotate-12 scale-y-105" />

                            {/* Solid Bright Core Line */}
                            <div className="absolute inset-[10px] rounded-full border-l-[5px] border-[#ffffff]/100 shadow-[-5px_0_15px_rgba(255,255,255,0.8)] transform -rotate-6 scale-x-95" />

                            {/* Deep Magenta/Indigo Sweep */}
                            <div className="absolute inset-[25px] rounded-full border-l-[16px] border-b-[6px] border-[#6366f1]/100 shadow-[-15px_10px_40px_rgba(99,102,241,0.7)] transform rotate-15" />
                            
                            {/* Inner Specular Highlight */}
                            <div className="absolute inset-[30px] rounded-full border-l-[3px] border-white/100 shadow-[-2px_0_5px_rgba(255,255,255,0.9)] transform rotate-[18deg] scale-y-110" />

                            {/* Smooth Magenta Accent */}
                            <div className="absolute inset-[45px] rounded-full border-l-[10px] border-t-[3px] border-[#d946ef]/100 shadow-[-10px_-5px_30px_rgba(217,70,239,0.7)] transform -rotate-25 scale-x-105" />

                            {/* Crisp Cyan Inner Border */}
                            <div className="absolute inset-[60px] rounded-full border-l-[8px] border-[#22d3ee]/100 shadow-[-5px_0_20px_rgba(34,211,238,0.7)] transform rotate-5 scale-y-105" />
                            
                            {/* Deep Indigo Core Layer */}
                            <div className="absolute inset-[80px] rounded-full border-l-[24px] border-[#4f46e5]/80 blur-[3px] shadow-[-10px_0_30px_rgba(79,70,229,0.6)] transform -rotate-[8deg]" />
                            <div className="absolute inset-[82px] rounded-full border-l-[3px] border-white/80 transform -rotate-[8deg]" />

                            {/* Minimal crossing thread for elegance */}
                            <div className="absolute inset-[100px] rounded-[45%] border-l-[3px] border-cyan-200/80 transform rotate-[35deg] scale-110" />

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
                            src="/images/Our_Services/Digital_Transformation_no_BG.svg"
                            alt="Connected Enterprise UI"
                            fill
                            className="object-contain scale-110 lg:scale-125 transform-gpu origin-center transition-transform duration-700 ease-out group-hover:scale-[1.15] lg:group-hover:scale-[1.35] group-hover:-translate-y-2"
                        />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.staggerContainer}
                    >
                        <motion.span variants={animations.fadeInUp} className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                            WHY HYNIVA
                        </motion.span>
                        <motion.h2 variants={animations.fadeInUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                            Why Hyniva for Digital Transformation?
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="mt-6 space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                Digital transformation is not simply about adopting new technologies. It is about creating connected enterprises that can adapt faster, operate smarter, and deliver better experiences.
                            </p>
                            <p>
                                Hyniva brings together strategic thinking, engineering excellence, and platform expertise to help organizations modernize legacy environments, streamline operations, and accelerate innovation. Our focus is on delivering transformation initiatives that create measurable business impact while building a foundation for long-term growth.
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
    const cards = [
        {
            title: "Enterprise Systems",
            description: "Modernizing legacy environments through cloud enablement, platform integration, infrastructure transformation, and scalable technology foundations that support future growth.",
            image: "/images/digital-transformation/enterprise_systems_blocks_v3.png",
            scaleClass: "scale-[1.25] group-hover:scale-[1.35]"
        },
        {
            title: "Digital Experiences",
            description: "Creating intuitive customer and employee experiences that improve engagement, simplify interactions, and strengthen connections across digital touchpoints.",
            image: "/images/digital-transformation/digital_experiences_ui_v2.png",
            scaleClass: "scale-[1.25] group-hover:scale-[1.35]"
        },
        {
            title: "Products & Operations",
            description: "Building intelligent applications, connected workflows, and modern operational platforms that improve efficiency, accelerate delivery, and enable continuous innovation.",
            image: "/images/digital-transformation/products_operations_gears_v4.png",
            scaleClass: "scale-[1.1] group-hover:scale-[1.2]"
        }
    ];

    return (
        <section className="bg-[#f8fafc] pt-16 pb-24 lg:pt-20 lg:pb-24 relative overflow-hidden">
            {/* Dotted background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
            
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animations.staggerContainer}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.span variants={animations.fadeInUp} className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                        WHAT WE TRANSFORM
                    </motion.span>
                    <motion.h2 variants={animations.fadeInUp} className="mt-[20px] text-3xl sm:text-4xl font-bold text-slate-900">
                        Building the foundations for sustainable transformation.
                    </motion.h2>
                    <motion.div variants={animations.fadeInUp} className="mt-6 flex justify-center">
                        <div className="h-1.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group flex flex-col h-full"
                        >
                            <div className="h-56 w-full relative mb-4 flex items-center justify-center overflow-hidden">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className={`object-contain drop-shadow-xl transition-transform duration-500 ${card.scaleClass || "scale-[1.25] group-hover:scale-[1.35]"}`}
                                />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                {card.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-0 flex-grow">
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
            icon: BrainCircuit,
            iconBg: "bg-purple-500/20",
            iconColor: "text-purple-400",
            description: "Embedding intelligence into business processes, customer experiences, and operational workflows to improve efficiency, adaptability, and decision-making."
        },
        {
            title: "Data Intelligence",
            icon: BarChart3,
            iconBg: "bg-teal-500/20",
            iconColor: "text-teal-400",
            description: "Transforming enterprise data into actionable insights that improve visibility, support strategy, and enable smarter business decisions."
        },
        {
            title: "Cloud Migration",
            icon: Cloud,
            iconBg: "bg-blue-500/20",
            iconColor: "text-blue-400",
            description: "Modernizing infrastructure and applications through secure, scalable, and cloud-native environments designed for performance and growth."
        }
    ];

    return (
        <section className="bg-[#030b1e] py-24 relative overflow-hidden">
            {/* Dark mode background accents */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/50 to-[#030b1e]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1)_0%,transparent_60%)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animations.staggerContainer}
                    className="mb-16"
                >
                    <motion.span variants={animations.fadeInUp} className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                        ENTERPRISE ENABLEMENT
                    </motion.span>
                    <motion.h2 variants={animations.fadeInUp} className="mt-4 text-3xl sm:text-4xl font-bold text-white max-w-2xl">
                        Technology enablers for intelligent, future-ready businesses.
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="mt-6 text-lg text-slate-300 max-w-4xl">
                        Successful transformation requires the right technology foundation. Hyniva helps organizations accelerate innovation through cloud, data, and AI-driven capabilities designed to support agility, resilience, and long-term business value.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {enablers.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="bg-white/5 backdrop-blur-sm rounded-[24px] p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className={`h-14 w-14 rounded-xl ${item.iconBg} flex items-center justify-center mb-6 border border-white/5`}>
                                <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                {item.description}
                            </p>
                            <Link href="#" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                                Learn More <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------- Transformation In Action Section ------------------- */
function TransformationInAction() {
    const caseStudies = [
        {
            title: "Advancing at scale: Seamless AWS cloud operations",
            image: "/images/2025/10/cloud-computing-networking-technology-concept-man-showing-digital-screen-with-cloud-diagram-businessman-background-represents-global-support-innovation-scaled.jpg",
            description: "How we helped modernize global infrastructure with robust AWS cloud solutions."
        },
        {
            title: "Smart manufacturing with Applied AI Document Intelligence",
            image: "/images/2025/10/document-management-system-dms-digital-online-document-database-paperless-office-businessman-touch-folder-icon-with-process-automation-efficiently-manage-files-planning-strategy-scaled.jpg",
            description: "Implementing AI-driven document intelligence to streamline manufacturing workflows."
        },
        {
            title: "Accelerating transformation at Microsoft",
            image: "/images/Case_Studies/8. CoreBankingTransformationonMicrosoft.png",
            description: "Driving operational excellence and cloud transformation on Microsoft Azure."
        }
    ];

    return (
        <section className="bg-[#f8fafc] py-24">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={animations.staggerContainer}
                        className="lg:w-1/3"
                    >
                        <motion.span variants={animations.fadeInUp} className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                            TRANSFORMATION IN ACTION
                        </motion.span>
                        <motion.h2 variants={animations.fadeInUp} className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                            Turning transformation initiatives into business value.
                        </motion.h2>
                        <motion.p variants={animations.fadeInUp} className="mt-6 text-slate-600 leading-relaxed mb-4">
                            Every transformation journey should create measurable impact. Our focus extends beyond implementing technology to helping organizations improve agility, strengthen customer experiences, streamline operations, and unlock new opportunities for growth.
                        </motion.p>
                        <motion.p variants={animations.fadeInUp} className="text-slate-600 leading-relaxed mb-10">
                            By aligning business objectives with technology execution, we help enterprises move from modernization efforts to meaningful transformation outcomes.
                        </motion.p>

                    </motion.div>

                    {/* Right Column - Case Studies */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={animations.staggerContainer}
                        className="lg:w-2/3"
                    >
                        <motion.h3 variants={animations.fadeInUp} className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-wide">
                            CASE STUDIES
                        </motion.h3>
                        <motion.p variants={animations.fadeInUp} className="text-sm text-slate-500 mb-8 max-w-2xl">
                            Real-world implementations demonstrating how we help enterprises evolve through comprehensive digital and cloud transformation.
                        </motion.p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {caseStudies.map((study, idx) => (
                                <motion.div 
                                    key={idx}
                                    variants={animations.fadeInUp}
                                    className="group flex flex-col rounded-[24px] bg-[#ECF6FF] border border-[#030B3B]/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative h-full"
                                >
                                    {/* Card Image */}
                                    <div className="aspect-[1.5/1] overflow-hidden relative m-2.5 rounded-[18px] bg-white">
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
                                    <div className="p-5 pt-3 flex flex-col flex-1 relative z-10">
                                        <h4
                                            className="font-display text-[15px] font-bold text-[#030B3B] leading-[1.4] tracking-tight mb-3 line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: study.title }}
                                        />

                                        <p className="text-[13px] font-medium text-[#030B3B]/70 leading-relaxed mb-6 flex-1 line-clamp-3">
                                            {study.description}
                                        </p>

                                        <Link
                                            href="/insights/case-studies"
                                            className="flex items-center justify-between w-full py-3 px-4 bg-white border border-[#1e90ff]/20 rounded-[14px] text-xs font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(30,144,255,0.3)] mt-auto"
                                        >
                                            Read Case Study
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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


/* ------------------- Page ------------------- */
export default function DigitalTransformationPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <DigitalTransformationHero />
                <WhyHyniva />
                <WhatWeTransform />
                <EnterpriseEnablement />
                <TransformationInAction />
            </main>
            <Footer />
        </div>
    );
}
