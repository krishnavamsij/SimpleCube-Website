"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Layers, Activity, LayoutDashboard, BrainCircuit, Workflow, Rocket } from "lucide-react";
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
function ProductEngineeringHero() {
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
                            Product<br />
                            Engineering
                        </motion.h1>
                        <motion.p
                            variants={animations.fadeInUp}
                            className="mt-8 w-full text-lg leading-relaxed text-slate-300 sm:text-xl font-medium max-w-xl lg:mt-12"
                        >
                            Design. Build. Scale. <span className="text-[#00D4AA]">Engineer what's next.</span>
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
                        {/* Geometric Wireframe Illustration - High Fidelity */}
                        <div className="absolute right-[-20%] lg:right-[-10%] top-[10%] lg:top-[15%] w-[650px] h-[400px] lg:w-[900px] lg:h-[550px] pointer-events-none flex items-center justify-center">
                            
                            {/* Ambient background glow */}
                            <div className="absolute left-[10%] top-[20%] w-[400px] h-[300px] bg-[#00F0FF]/15 blur-[100px] rounded-full" />
                            <div className="absolute right-[20%] top-[30%] w-[350px] h-[250px] bg-[#D946EF]/15 blur-[100px] rounded-full" />
                            <div className="absolute left-[40%] top-[10%] w-[300px] h-[400px] bg-[#2563EB]/15 blur-[100px] rounded-full" />

                            <svg viewBox="0 0 1000 500" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="globalGrad" x1="100" y1="250" x2="930" y2="250" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#00F0FF" />
                                        <stop offset="35%" stopColor="#00A3FF" />
                                        <stop offset="65%" stopColor="#2563EB" />
                                        <stop offset="100%" stopColor="#D946EF" />
                                    </linearGradient>
                                </defs>

                                <g transform="rotate(-25, 500, 250)">
                                    {/* Axis Line */}
                                    <line x1="50" y1="250" x2="980" y2="250" stroke="url(#globalGrad)" strokeWidth="2" strokeDasharray="6 8" opacity="0.9" />

                                    {/* Main Shapes */}
                                    <g stroke="url(#globalGrad)" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
                                        
                                        {/* Square Box */}
                                        <g fill="url(#globalGrad)" fillOpacity="0.04">
                                            {/* Back face */}
                                            <polygon points="190,145 190,305 250,325 250,165" />
                                            {/* Front face */}
                                            <polygon points="170,160 170,320 230,340 230,180" />
                                            {/* Connecting lines */}
                                            <line x1="170" y1="160" x2="190" y2="145" />
                                            <line x1="170" y1="320" x2="190" y2="305" />
                                            <line x1="230" y1="340" x2="250" y2="325" />
                                            <line x1="230" y1="180" x2="250" y2="165" />
                                        </g>

                                        {/* Disk */}
                                        <g fill="url(#globalGrad)" fillOpacity="0.04">
                                            <ellipse cx="370" cy="250" rx="30" ry="85" />
                                            <ellipse cx="350" cy="250" rx="30" ry="85" />
                                            <line x1="350" y1="165" x2="370" y2="165" />
                                            <line x1="350" y1="335" x2="370" y2="335" />
                                        </g>

                                        {/* Cylinder */}
                                        <g fill="url(#globalGrad)" fillOpacity="0.04">
                                            <ellipse cx="670" cy="250" rx="35" ry="70" />
                                            <ellipse cx="490" cy="250" rx="35" ry="70" />
                                            <line x1="490" y1="180" x2="670" y2="180" />
                                            <line x1="490" y1="320" x2="670" y2="320" />
                                        </g>

                                        {/* Cone */}
                                        <g fill="url(#globalGrad)" fillOpacity="0.04">
                                            <ellipse cx="810" cy="250" rx="35" ry="70" />
                                            <line x1="810" y1="180" x2="960" y2="250" />
                                            <line x1="810" y1="320" x2="960" y2="250" />
                                            {/* Inner detail */}
                                            <ellipse cx="890" cy="250" rx="15" ry="32" fill="none" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
                                        </g>

                                    </g>

                                    {/* Markers on Axis */}
                                    <g stroke="url(#globalGrad)" strokeWidth="2.5" opacity="1">
                                        <line x1="206" y1="250" x2="214" y2="250" />
                                        <line x1="210" y1="246" x2="210" y2="254" />
                                        
                                        <line x1="356" y1="250" x2="364" y2="250" />
                                        <line x1="360" y1="246" x2="360" y2="254" />

                                        <line x1="576" y1="250" x2="584" y2="250" />
                                        <line x1="580" y1="246" x2="580" y2="254" />

                                        <line x1="806" y1="250" x2="814" y2="250" />
                                        <line x1="810" y1="246" x2="810" y2="254" />

                                        <circle cx="960" cy="250" r="4" fill="url(#globalGrad)" stroke="none" />
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
                        className="relative h-[450px] lg:h-[600px] w-full rounded-2xl overflow-hidden p-[20px] group"
                    >
                        <Image
                            src="/images/Our_Services/Product_Engineering_no_BG.png"
                            alt="Product Engineering UI"
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
                            Why Hyniva for Product Engineering?
                        </motion.h2>
                        <motion.div variants={animations.fadeInUp} className="mt-6 space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                Building successful products requires more than writing code. It demands balancing user expectations, technical complexity, and business priorities while maintaining speed, quality, and reliability.
                            </p>
                            <p>
                                Hyniva combines product thinking, modern engineering practices, and AI-enabled development capabilities to help organizations accelerate delivery, reduce technical debt, and transform ideas into products that create lasting business value. We focus on building scalable, resilient, and production-ready solutions that continue to evolve alongside changing business needs.
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
            title: "Digital Products",
            description: "Designing and developing customer-facing applications, enterprise solutions, and digital experiences that solve meaningful business challenges and create measurable value.",
            image: "/images/digital-transformation/enterprise_systems_blocks_v3.png",
            scaleClass: "scale-[1.25] group-hover:scale-[1.35]"
        },
        {
            title: "Intelligent Experiences",
            description: "Embedding AI, automation, and conversational capabilities into products to deliver intuitive, personalized, and engaging user interactions.",
            image: "/images/digital-transformation/digital_experiences_ui_v2.png",
            scaleClass: "scale-[1.25] group-hover:scale-[1.35]"
        },
        {
            title: "Engineering Operations",
            description: "Modernizing delivery pipelines, quality processes, and operational practices to improve release velocity, reliability, and scalability.",
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
                        Engineering products built for adoption and growth.
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
            title: "Product Development",
            icon: Rocket,
            iconBg: "bg-purple-500/20",
            iconColor: "text-purple-400",
            description: "Combining experience design, full-stack engineering, quality assurance, DevOps, and AI-powered development practices to create products that perform in production and evolve alongside changing business requirements."
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
                        Product development built for scale.
                    </motion.h2>
                    <motion.p variants={animations.fadeInUp} className="mt-6 text-lg text-slate-300 max-w-4xl">
                        From ideation and architecture to engineering and continuous optimization, Hyniva helps organizations build digital products designed for reliability, scalability, and long-term evolution.
                    </motion.p>
                </motion.div>

                {/* Single card view since there's only one product development enabler mentioned */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

/* ------------------- Engineering In Action Section ------------------- */
function EngineeringInAction() {
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
                            Turning ideas into products that perform in production.
                        </motion.h2>
                        <motion.p variants={animations.fadeInUp} className="mt-6 text-slate-600 leading-relaxed mb-4">
                            Successful products are measured by adoption, reliability, and business impact. Hyniva helps organizations move from concepts and prototypes to production-ready solutions that scale, evolve, and deliver measurable value.
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
                            Real-world implementations demonstrating how we help enterprises build innovative products from the ground up.
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
export default function ProductEngineeringPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <ProductEngineeringHero />
                <WhyHyniva />
                <WhatWeTransform />
                <EnterpriseEnablement />
                <EngineeringInAction />
            </main>
            <Footer />
        </div>
    );
}
