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
                                PRODUCT ENGINEERING
                            </div>
                        </motion.div>
                        <motion.h1
                            variants={animations.fadeInUp}
                            className="mt-6 text-4xl font-[900] leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[54px] lg:text-[60px] xl:text-[64px] lg:mt-8 font-display"
                        >
                            <span className="whitespace-nowrap">Engineer <span className="text-[#00D4AA]">products.</span></span><br />
                            <span className="whitespace-nowrap">Deliver <span className="text-[#00D4AA]">lasting value.</span></span>
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-lg leading-relaxed text-slate-300 sm:text-xl max-w-2xl lg:mt-10"
                        >
                            Businesses build digital products to solve today's challenges<br />
                            while creating the flexibility to meet tomorrow's opportunities.
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
                        {/* Ambient Glow Container from Enterprise Platforms */}
                        <div className="absolute right-[-15%] lg:right-[-20%] top-[5%] lg:top-[10%] w-[450px] h-[450px] lg:w-[650px] lg:h-[650px] pointer-events-none flex items-center justify-center">
                            {/* Ambient background glow (increased visibility) */}
                            <div className="absolute left-[15%] top-[20%] w-[300px] h-[450px] bg-[#06b6d4]/30 blur-[80px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[200px] h-[350px] bg-[#8b5cf6]/30 blur-[80px] rounded-full" />
                            {/* Soft radial illumination inside center */}
                            <div className="absolute inset-[20%] bg-gradient-to-tr from-indigo-500/10 to-cyan-400/10 blur-[50px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Geometric Wireframe Illustration - High Fidelity */}
                        <div className="absolute right-[-10%] lg:right-[-10%] top-[10%] lg:top-[15%] w-[600px] h-[400px] lg:w-[850px] lg:h-[600px] pointer-events-none flex items-center justify-center z-10">

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

                                <g transform="translate(500, 250) rotate(-45) scale(1.15, 1.35) translate(-500, -250)">
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
                            src="/images/Our_Services/Product_Engineering_no_BG.png"
                            alt="Product Engineering UI"
                            fill
                            className="object-contain scale-100 lg:scale-110 transform-gpu origin-center transition-transform duration-700 ease-out group-hover:scale-105 lg:group-hover:scale-[1.15] group-hover:-translate-y-2"
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
                            Build with Purpose
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="mt-6 space-y-6 text-lg text-slate-600 leading-relaxed">
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
                        Why Great Products Continue to Evolve
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="mt-6 text-[17px] text-slate-600 leading-relaxed w-full">
                        Customer expectations continue to rise while technology, competition and market demands <br className="hidden md:block"/>change faster than ever. Products that fail to evolve gradually lose relevance.
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
                            Capabilities <br className="hidden lg:block" />That Power <br className="hidden lg:block" />Modern Products
                        </h2>
                        <p className="text-[17px] text-slate-600 leading-relaxed">
                            Modern products are shaped by engineering, AI and automation working together. Our capabilities help organizations accelerate product delivery and continuously introduce new value throughout the product lifecycle.
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
                                Real-world implementations demonstrating how we help enterprises build innovative products from the ground up that perform in production.
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
                                <span className="text-[#00D4AA]">Product Engineering?</span>
                            </h2>
                        </div>

                        {/* Right Side: Metrics & CTA */}
                        <div className="flex flex-col lg:pl-16 lg:mt-[72px]">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8 mb-10">
                                <div className="flex flex-col">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">17</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Years of Product<br/>Innovation</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">7</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Enterprise<br/>Products Built</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[36px] lg:text-[44px] font-black text-white leading-none mb-3 font-display">2</div>
                                    <div className="text-slate-300 text-[15px] sm:text-base font-medium leading-snug">Products Successfully<br/>Acquired</div>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Link 
                                    href="/about"
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
export default function ProductEngineeringPage() {
    const processSteps = [
        {
          num: "01",
          title: "Envision",
          desc: <>Establish a clear product vision,<br/>success metrics and roadmap aligned<br/>with customer and business goals.</>,
          angle: 45
        },
        {
          num: "02",
          title: "Engineer",
          desc: <>Build secure, scalable product<br/>capabilities with quality<br/>engineered into every release.</>,
          angle: -30
        },
        {
          num: "03",
          title: "Elevate",
          desc: <>Use customer feedback, analytics<br/>and real-world usage to continuously<br/>improve product experiences.</>,
          angle: 120
        },
        {
          num: "04",
          title: "Expand",
          desc: <>Introduce new capabilities,<br/>integrations and enhancements that keep<br/>products relevant as markets evolve.</>,
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
