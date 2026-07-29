"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Layers, Activity, LayoutDashboard, BrainCircuit, Workflow, Rocket, Server, Users, Database, Target, Globe2 } from "lucide-react";
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
function ProductEngineeringHero() {
    return (
        <section className="relative overflow-hidden bg-[#030b1e] flex items-center">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(37,99,235,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020918] via-[#020918]/60 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-8 pt-12 sm:pb-10 sm:pt-16 lg:pb-12 lg:pt-20">
                    <motion.div
                        variants={animations.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        <motion.div variants={animations.fadeInUp} className="flex mb-6">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px]">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                PRODUCT ENGINEERING
                            </div>
                        </motion.div>
                        <motion.h1
                            variants={animations.fadeInUp}
                            className="mt-6 text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-[900] leading-[1.1] tracking-tight text-white lg:mt-8 font-display"
                        >
                            <span className="whitespace-nowrap">Engineer <span className="text-[#00D4AA]">products.</span></span><br />
                            <span className="whitespace-nowrap">Deliver <span className="text-[#00D4AA]">lasting value.</span></span>
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 max-w-2xl lg:mt-10"
                        >
                            Businesses build digital products to solve today's challenges while creating the flexibility to meet tomorrow's opportunities.
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
                        {/* Ambient Glow Container from Enterprise Platforms */}
                        <div className="absolute right-[-14%] lg:right-[-18%] xl:right-[-22%] top-[5%] lg:top-[8%] w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] pointer-events-none flex items-center justify-center">
                            {/* Ambient background glow (increased visibility) */}
                            <div className="absolute left-[15%] top-[20%] w-[280px] h-[400px] bg-[#06b6d4]/30 blur-[80px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[180px] h-[300px] bg-[#8b5cf6]/30 blur-[80px] rounded-full" />
                            {/* Soft radial illumination inside center */}
                            <div className="absolute inset-[20%] bg-gradient-to-tr from-indigo-500/10 to-cyan-400/10 blur-[50px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Geometric Wireframe Illustration - High Fidelity */}
                        <div className="absolute right-[-14%] lg:right-[-18%] xl:right-[-22%] top-[8%] lg:top-[12%] w-[480px] h-[320px] lg:w-[680px] lg:h-[480px] pointer-events-none flex items-center justify-center z-10">

                            <svg viewBox="-50 -50 1100 600" className="w-full h-full relative z-10 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="globalGrad" x1="100" y1="250" x2="930" y2="250" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#00F0FF" />
                                        <stop offset="35%" stopColor="#00A3FF" />
                                        <stop offset="65%" stopColor="#2563EB" />
                                        <stop offset="100%" stopColor="#D946EF" />
                                    </linearGradient>
                                    <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
                                        <stop offset="20%" stopColor="#FFFFFF" stopOpacity="1" />
                                        <stop offset="80%" stopColor="#FFFFFF" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>

                                <g transform="translate(500, 250) rotate(-45) scale(0.98, 1.15) translate(-500, -250)">
                                    {/* Axis Line - Wavy Path */}
                                    <path className="pe-path-flow" d="M 50 250 C 210 250, 260 250, 290 250 C 365 250, 355 150, 440 150 C 540 150, 530 325, 670 325 C 755 325, 725 150, 810 150 C 895 150, 980 150, 980 150" stroke="url(#whiteGrad)" strokeWidth="2" strokeDasharray="6 8" fill="none" opacity="0.9" />

                                    {/* Main Shapes */}
                                    <g stroke="url(#globalGrad)" strokeLinejoin="round" strokeLinecap="round">
                                        
                                        {/* Square Box (Y=250) - Moved Right (+120px X) */}
                                        <g className="pe-shape-1" fill="url(#globalGrad)" fillOpacity="0.35" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
                                            <polygon points="270,145 270,305 330,325 330,165" strokeWidth="1.5" />
                                            <polygon points="250,160 250,320 310,340 310,180" strokeWidth="4" />
                                            <line x1="250" y1="160" x2="270" y2="145" strokeWidth="1.5" />
                                            <line x1="250" y1="320" x2="270" y2="305" strokeWidth="1.5" />
                                            <line x1="310" y1="340" x2="330" y2="325" strokeWidth="4" />
                                            <line x1="310" y1="180" x2="330" y2="165" strokeWidth="1.5" />
                                        </g>

                                        {/* Disk (Y=150) - Moved Right (+40px X) */}
                                        <g className="pe-shape-2" fill="url(#globalGrad)" fillOpacity="0.35" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
                                            {/* Front Ellipse */}
                                            <path d="M 450,65 A 30,85 0 0,0 450,235" strokeWidth="4" />
                                            <path d="M 450,65 A 30,85 0 0,1 450,235" strokeWidth="1.5" />
                                            {/* Back Ellipse */}
                                            <path d="M 430,65 A 30,85 0 0,0 430,235" strokeWidth="4" />
                                            <path d="M 430,65 A 30,85 0 0,1 430,235" strokeWidth="1.5" />
                                            <line x1="430" y1="65" x2="450" y2="65" strokeWidth="1.5" />
                                            <line x1="430" y1="235" x2="450" y2="235" strokeWidth="4" />
                                        </g>

                                        {/* Cylinder (Y=325) - Moved Right (+90px X) and Up Right (-25px Y) */}
                                        <g className="pe-shape-3" fill="url(#globalGrad)" fillOpacity="0.35" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
                                            {/* Right Ellipse */}
                                            <path d="M 760,255 A 35,70 0 0,0 760,395" strokeWidth="4" />
                                            <path d="M 760,255 A 35,70 0 0,1 760,395" strokeWidth="1.5" />
                                            {/* Left Ellipse */}
                                            <path d="M 580,255 A 35,70 0 0,0 580,395" strokeWidth="4" />
                                            <path d="M 580,255 A 35,70 0 0,1 580,395" strokeWidth="1.5" />
                                            <line x1="580" y1="255" x2="760" y2="255" strokeWidth="1.5" />
                                            <line x1="580" y1="395" x2="760" y2="395" strokeWidth="4" />
                                        </g>

                                        {/* Cone (Y=150) */}
                                        <g className="pe-shape-4" fill="url(#globalGrad)" fillOpacity="0.35" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
                                            {/* Base Ellipse */}
                                            <path d="M 810,80 A 35,70 0 0,0 810,220" strokeWidth="4" />
                                            <path d="M 810,80 A 35,70 0 0,1 810,220" strokeWidth="1.5" />
                                            <line x1="810" y1="80" x2="960" y2="150" strokeWidth="1.5" />
                                            <line x1="810" y1="220" x2="960" y2="150" strokeWidth="4" />
                                            {/* Inner detail */}
                                            <ellipse cx="890" cy="150" rx="15" ry="32" fill="none" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
                                        </g>

                                    </g>

                                    {/* Markers on Axis */}
                                    <g stroke="url(#globalGrad)" strokeWidth="2.5" opacity="1">
                                        <g className="pe-shape-1">
                                            <line x1="286" y1="250" x2="294" y2="250" />
                                            <line x1="290" y1="246" x2="290" y2="254" />
                                        </g>
                                        
                                        <g className="pe-shape-2">
                                            <line x1="436" y1="150" x2="444" y2="150" />
                                            <line x1="440" y1="146" x2="440" y2="154" />
                                        </g>

                                        {/* Cylinder Marker (Moved Up Right) */}
                                        <g className="pe-shape-3">
                                            <line x1="666" y1="325" x2="674" y2="325" />
                                            <line x1="670" y1="321" x2="670" y2="329" />
                                        </g>

                                        <g className="pe-shape-4">
                                            <line x1="806" y1="150" x2="814" y2="150" />
                                            <line x1="810" y1="146" x2="810" y2="154" />
                                            <circle cx="960" cy="150" r="4" fill="url(#globalGrad)" stroke="none" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
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
        <section className="bg-white py-8 lg:py-12">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={animations.fadeInUp}
                        className="relative h-[280px] sm:h-[320px] lg:h-[380px] w-full flex items-center justify-center"
                    >
                        <Image
                            src="/images/Our_Services/Product_Engineering_no_BG.png"
                            alt="Product Engineering UI"
                            fill
                            className="object-contain transform-gpu transition-transform duration-700 ease-out hover:scale-105"
                        />
                    </motion.div>
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
                            Build with Purpose
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                            <p>
                                Successful products aren't measured by their launch but by their ability to adapt, improve and continue delivering value over time.
                            </p>
                            <p>
                                Whether you're creating a new digital product, modernizing an existing platform or expanding product capabilities, long-term success comes from balancing customer needs, engineering excellence and continuous innovation.
                            </p>
                            <p>
                                At Hyniva, we engineer products with a long-term perspective, combining product thinking with modern engineering practices to help organizations build solutions that scale, evolve and remain relevant.
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
            icon: Activity,
            description: "Slow product releases delay market opportunities."
        },
        {
            icon: Code,
            description: "Technical debt limits product evolution."
        },
        {
            icon: Users,
            description: "Inconsistent user experiences reduce adoption."
        },
        {
            icon: Layers,
            description: "Legacy architectures restrict scalability."
        },
        {
            icon: LayoutDashboard,
            description: "Quality issues impact customer confidence."
        },
        {
            icon: BrainCircuit,
            description: "Growing product complexity slows innovation."
        }
    ];

    return (
        <section className="bg-[#f8fafc] py-16 lg:py-24 relative overflow-hidden">
            {/* Subtle Dotted background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
            
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animations.staggerContainer}
                    className="text-center max-w-[1240px] mx-auto mb-10 sm:mb-12"
                >
                    <motion.div variants={animations.fadeInUp} className="flex justify-center mb-6">
                        <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px]">
                            <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                            ENTERPRISE REALITY
                        </div>
                    </motion.div>
                    <motion.h2 variants={animations.fadeInUp} className="text-3xl sm:text-4xl lg:text-[40px] font-[900] text-[#030B3B] font-display text-center leading-tight mb-6">
                        Why Product Engineering Matters
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="text-slate-600 text-base sm:text-lg leading-relaxed text-center max-w-[1100px] mx-auto">
                        Building products requires balancing speed with long-term engineering rigor. When product development is fragmented, execution slows and user experience suffers.
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
                            className="bg-white rounded-[24px] p-7 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
                        >
                            <div className="flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center bg-[#EFF6FF] text-[#3B82F6] transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-105">
                                <card.icon className="h-6 w-6 transition-colors duration-300" />
                            </div>
                            <p className="text-sm sm:text-[15px] font-medium text-[#030B3B]/80 leading-relaxed">
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
            title: "Product Engineering",
            icon: Rocket,
            iconBg: "bg-blue-50 group-hover:bg-blue-500",
            iconColor: "text-blue-600 group-hover:text-white",
            description: "Build scalable web, mobile and enterprise products using modern architectures designed for performance, security and long-term maintainability."
        },
        {
            title: "AI & Intelligent Automation",
            icon: BrainCircuit,
            iconBg: "bg-teal-50 group-hover:bg-teal-500",
            iconColor: "text-teal-600 group-hover:text-white",
            description: "Embed AI, intelligent workflows and automation into digital products to streamline operations, improve decision-making and create smarter user experiences."
        },
        {
            title: "Cloud & DevSecOps",
            icon: Workflow,
            iconBg: "bg-purple-50 group-hover:bg-purple-500",
            iconColor: "text-purple-600 group-hover:text-white",
            description: "Accelerate product delivery through cloud-native development, DevSecOps practices and automated CI/CD pipelines that improve reliability, security and release velocity."
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
                            Capabilities <br className="hidden lg:block" />That Power <br className="hidden lg:block" />Modern Products
                        </h2>
                        <p className="text-[13px] text-slate-500 leading-relaxed max-w-[280px]">
                            Modern products are shaped by engineering, AI and automation working together. Our capabilities help organizations accelerate product delivery and continuously introduce new value throughout the product lifecycle.
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
            title: "Autonomous Lending Experience with FinXServe & Agentforce",
            image: "/images/Case_Studies/Optimized/cs-14.png",
            description: "How we helped modernize global infrastructure with robust AWS cloud solutions.",
            href: "/insights/case-studies/autonomous-lending-experience"
        },
        {
            title: "Scalable Multi-Portal Platform for Complex Education Workflows",
            image: "/images/Case_Studies/Optimized/cs-1.png",
            description: "Implementing AI-driven document intelligence to streamline manufacturing workflows.",
            href: "/insights/case-studies/scalable-multi-portal-platform"
        },
        {
            title: "Transforming Claims Operations with a Scalable Digital Platform",
            image: "/images/Case_Studies/Optimized/cs-10.png",
            description: "Driving operational excellence and cloud transformation on Microsoft Azure.",
            href: "/insights/case-studies/transforming-claims-operations"
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
                            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
                                Real-world implementations demonstrating how we help enterprises build innovative products from the ground up that perform in production.
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
                                            className="font-display text-[15px] sm:text-[16px] font-bold text-[#030B3B] leading-[1.35] tracking-tight mb-3"
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

/* ------------------- Why Hyniva PE Section ------------------- */
function WhyHynivaPE() {
    const bottomBox = [
        {
            title: "Product Thinking from Day One",
            description: "We approach every engagement with the mindset of product builders, balancing customer needs, engineering quality and long-term value.",
            icon: Target
        },
        {
            title: "Engineering Beyond Delivery",
            description: "Our teams take ownership beyond development, helping products evolve through continuous improvements, performance optimization and new capabilities.",
            icon: Layers
        },
        {
            title: "Proven Product Experience",
            description: "We've built, launched and scaled enterprise products including solutions that have been successfully acquired, bringing practical product experience to every engagement.",
            icon: BrainCircuit
        },
        {
            title: "AI-Enabled\nEngineering",
            description: "We combine modern engineering with AI and intelligent automation to accelerate development, improve quality and help teams deliver faster.",
            icon: Globe2
        }
    ];

    return (
        <section className="bg-white py-[14px] sm:py-[20px] lg:py-[26px]">
            <div className="mx-auto w-full max-w-[84rem] xl:max-w-[86rem] px-6 md:px-10 lg:px-16 flex flex-col">
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
                                <span className="text-[#00D4AA]">Product Engineering?</span>
                            </h2>
                        </div>

                        {/* Right Side: Metrics & CTA */}
                        <div className="flex flex-col items-start justify-between gap-5 lg:gap-6 lg:pl-8 w-full pt-0 lg:pt-[44px]">
                            {/* Stats */}
                            <div className="flex items-start justify-start gap-8 sm:gap-10 lg:gap-12 xl:gap-14 w-full">
                                <div className="flex flex-col items-start flex-shrink-0">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">17</span>
                                    </div>
                                    <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.4]">
                                        {"Years of Product\nInnovation"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start flex-shrink-0">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">7</span>
                                    </div>
                                    <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.4]">
                                        {"Enterprise\nProducts Built"}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start flex-shrink-0">
                                    <div className="flex items-baseline gap-0.5 mb-1">
                                        <span className="text-[26px] sm:text-[30px] lg:text-[32px] font-[900] text-white leading-none font-display">2</span>
                                    </div>
                                    <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-400 font-medium whitespace-pre-line leading-[1.4]">
                                        {"Products Successfully\nAcquired"}
                                    </span>
                                </div>
                            </div>
                            
                            {/* CTA */}
                            <div className="pt-2 sm:pt-3 w-full flex justify-start">
                                <Link 
                                    href="/about"
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="h-9 w-9 bg-white shadow-sm flex items-center justify-center rounded-full mb-4 flex-shrink-0">
                                    <card.icon className="w-4.5 h-4.5 text-[#3B82F6]" />
                                </div>
                                <h3 className="text-[14px] font-black text-[#030B3B] mb-3.5 leading-tight font-display whitespace-pre-line">
                                    {card.title}
                                </h3>
                                <p className="text-[11px] lg:text-[11.5px] text-[#030B3B]/75 font-normal leading-[1.6]">
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
export default function ProductEngineeringPage() {
    const processSteps = [
        {
          num: "01",
          title: "Envision",
          desc: "Establish a clear product vision, success metrics and roadmap aligned with customer and business goals.",
          angle: 45
        },
        {
          num: "02",
          title: "Engineer",
          desc: "Build secure, scalable product capabilities with quality engineered into every release.",
          angle: -30
        },
        {
          num: "03",
          title: "Elevate",
          desc: "Use customer feedback, analytics and real-world usage to continuously improve product experiences.",
          angle: 120
        },
        {
          num: "04",
          title: "Expand",
          desc: "Introduce new capabilities, integrations and enhancements that keep products relevant as markets evolve.",
          angle: -80
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <ProductEngineeringHero />
                <WhyHyniva />
                <WhatWeTransform />
                <TimelineProcess 
                    eyebrow="OUR APPROACH"
                    title="From Ideas to Impact"
                    description={<>Every successful product goes through a continuous cycle of learning, building, refining and expanding. Our approach helps organizations deliver products that remain valuable as customer expectations and business priorities evolve.</>}
                    steps={processSteps}
                />
                <EnterpriseEnablement />
                <WhyHynivaPE />
                <TransformationInAction />
            </main>
            <Footer />
        </div>
    );
}
