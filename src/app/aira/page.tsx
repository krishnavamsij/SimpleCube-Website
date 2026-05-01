'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    fadeInUp,
    staggerContainer,
} from "@/lib/animations"

const whatMakesDiff = [
    {
        img: '/images/products/Autonomous-reasoning.png',
        title: 'Autonomous Reasoning at Scale',
        desc: 'Executes multi-step reasoning, orchestrates specialized agents, and delivers end-to-end workflows — going beyond answers to drive efficiency, accuracy, and intelligent automation',
    },
    {
        img: '/images/products/Frictionless-Integration-1.png',
        title: 'Frictionless Integration',
        desc: 'At the heart of AIRA is OneAPI — a breakthrough integration framework that reduces onboarding from months to weeks, eliminating costly, complex system integrations.',
    },
    {
        img: '/images/products/Modular-Future-proof-1.png',
        title: 'Modular & Future-Proof',
        desc: 'Pre-built agents for chat, transactions, documents, and omnichannel service - extensible as technology and regulations evolve.',
    },
    {
        img: '/images/products/Bias-aware.png',
        title: 'Bias-Aware, Configurable AI',
        desc: 'Responses are customizable to align with compliance rules, regulatory policies, and institutional brand standards.',
    },
    {
        img: '/images/products/auditing-1.png',
        title: 'Enterprise-Grade Security & Compliance',
        desc: 'Every output is validated through guardrails, compliance engines, and audit trails designed for financial regulation.',
    },
]

const capabilities = [
    {
        img: '/images/products/Omnichannel-Experience-1.png',
        title: 'Omnichannel Experience',
        desc: 'Support for customer interactions across web, mobile, IVR, email, and messaging platforms.',
    },
    {
        img: '/images/products/Intelligent-Document-Processing.png',
        title: 'Intelligent Document Processing',
        desc: 'Automates KYC, compliance, and transaction documentation with real-time validation.',
    },
    {
        img: '/images/products/Visual-Intelligence.png',
        title: 'Visual Intelligence',
        desc: 'Extracts and verifies data from images and video, supporting areas like fraud detection and claims.',
    },
    {
        img: '/images/products/Contextual-Memory-1.png',
        title: 'Contextual Memory',
        desc: 'Retains institutional knowledge and client history for consistent, personalized service.',
    },
    {
        img: '/images/products/Observability-Analytics.png',
        title: 'Observability & Analytics',
        desc: 'Real-time logging, tracing, and metrics to meet regulatory audit and SLA requirements.',
    },
    {
        img: '/images/products/No-Code-Administration.png',
        title: 'No-Code Administration',
        desc: 'Empower business teams to configure workflows, prompts, and compliance guardrails without developer dependency.',
    },
]

const impacts = [
    {
        img: '/images/products/Instant-Always-On-Support-.png',
        title: 'Instant, Always-On Support',
        desc: 'Provides 24/7 intelligent assistance, ensuring clients get critical services and information instantly, without delays.',
    },
    {
        img: '/images/products/Personalized-Client-Interactions-.png',
        title: 'Personalized Client Interactions',
        desc: 'Context-aware responses powered by transaction history and preferences, enabling hyper-personalized experiences.',
    },
    {
        img: '/images/products/Cost-Effective-Operations-.png',
        title: 'Cost-Effective Operations',
        desc: 'Automates routine, high-volume tasks — cutting operational overhead, lowering manual effort, and boosting efficiency across teams and processes.',
    },
    {
        img: '/images/products/Effortless-Scalability-.png',
        title: 'Effortless Scalability',
        desc: 'Handles high client volumes during peak periods without increasing costs or degrading performance.',
    },
    {
        img: '/images/products/Deep-Customer-Insights-.png',
        title: 'Deep Customer Insights',
        desc: 'Unlocks actionable analytics from conversations, helping teams tailor offerings and improve engagement.',
    },
    {
        img: '/images/products/Consistent-Reliable-Information-.png',
        title: 'Consistent, Reliable Information',
        desc: 'Delivers accurate, uniform answers aligned with regulatory standards — reducing errors and escalation.',
    },
]

function AiraHero() {
    return (
        <section className="relative h-[515px] md:h-[600px] lg:h-[700px] w-full overflow-hidden flex items-center">
            {/* Background video */}
            <div className="absolute inset-0 z-0">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="object-cover w-full h-full"
                >
                    <source src="/images/products/HERO-PAGE-.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 lg:px-8 py-12 md:py-0">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-[650px] md:max-w-[550px] text-center md:text-left mx-auto md:mx-0">
                    <motion.div variants={fadeInUp} className="mb-8 hidden md:block">
                        <Image src="/images/products/dummy.png" alt="AIRA" width={200} height={60} className="opacity-0" />
                    </motion.div>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-white mb-6 text-3xl sm:text-4xl md:text-5xl leading-tight font-medium"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                        Autonomous Intelligent Reasoning Agent
                    </motion.h1>
                    <motion.p 
                        variants={fadeInUp} 
                        className="text-white mb-8 text-lg sm:text-xl font-normal leading-relaxed max-w-[480px] mx-auto md:mx-0"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                        The enterprise-ready AI platform built for financial institutions — delivering accuracy, execution, and compliance at scale
                    </motion.p>
                    <motion.div variants={fadeInUp} className="flex justify-center md:justify-start">
                        <Button asChild style={{ backgroundColor: "#ffffff", color: "#000000", fontFamily: "Roboto, sans-serif", fontSize: "15px", fontWeight: 600, padding: "12px 25px", borderRadius: "0px", height: "auto" }} className="hover:bg-gray-100 transition-colors uppercase shadow-lg">
                            <Link href="/contact">Get Started</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

function AiraIntro() {
    return (
        <section className="bg-white py-[60px] lg:py-[80px]">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
                <div className="flex justify-center">
                    <div className="w-full lg:w-10/12">
                        <motion.div 
                            variants={scrollReveal} 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={viewportOnce} 
                            className="bg-[#f8f9fa] p-8 sm:p-10 lg:p-16 rounded-[15px] text-center shadow-sm border border-gray-100"
                        >
                            <h2 className="text-[#345195] text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Introducing AIRA
                            </h2>
                            <h6 className="text-[#666666] text-base sm:text-lg leading-relaxed font-normal m-0" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                AIRA (Autonomous Intelligent Reasoning Agent) is the first enterprise-ready AI platform for financial services that unifies autonomous reasoning, compliance-first design, and OneAPI integration. By combining these capabilities in a single solution, AIRA delivers safe, explainable, and scalable intelligence—empowering institutions to innovate at speed while maintaining trust and regulatory rigor.
                            </h6>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function AiraDifferentiators() {
    return (
        <section className="bg-[#f8f9fa] py-[60px] lg:py-[80px]">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-[50px]">
                    <h2 className="text-[#345195] text-3xl font-bold">
                        What Makes AIRA Different
                    </h2>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-6 sm:gap-[30px]"
                >
                    {/* First Row items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-[30px]">
                        {whatMakesDiff.slice(0, 2).map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={scrollReveal}
                                className="bg-white p-6 sm:p-8 rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="mb-[20px]">
                                    <Image src={item.img} alt={item.title} width={80} height={80} className="object-contain" />
                                </div>
                                <h6 className="text-lg font-bold text-[#000000] mb-[15px]">{item.title}</h6>
                                <p className="text-[#000000] text-[15px] leading-relaxed m-0">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Remaining items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[30px]">
                        {whatMakesDiff.slice(2).map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={scrollReveal}
                                className="bg-white p-6 sm:p-8 rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="mb-[20px]">
                                    <Image src={item.img} alt={item.title} width={80} height={80} className="object-contain" />
                                </div>
                                <h6 className="text-lg font-bold text-[#000000] mb-[15px]">{item.title}</h6>
                                <p className="text-[#000000] text-[15px] leading-relaxed m-0">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function AiraCapabilities() {
    return (
        <section id="capabilities" className="bg-[#0b1021] py-[60px] lg:py-[80px]">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-[50px]">
                    <h2 className="text-white text-3xl font-bold mb-[10px]">
                        Key Capabilities
                    </h2>
                    <h6 className="text-white text-base font-normal">
                        AIRA brings a financial-services lens to every capability
                    </h6>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3"
                >
                    {capabilities.map((cap, idx) => (
                        <motion.div
                            key={idx}
                            variants={scrollReveal}
                            className="group flex flex-col"
                        >
                            <div className="w-full h-auto">
                                <Image src={cap.img} alt={cap.title} width={800} height={450} className="w-full h-auto object-cover" />
                            </div>
                            <div className="bg-[#040c31] p-6 sm:p-[30px] text-center flex-grow flex flex-col items-center">
                                <h5 className="text-lg sm:text-[20px] font-bold text-white mb-[15px] leading-tight">{cap.title}</h5>
                                <p className="text-white text-[15px] leading-relaxed m-0">{cap.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function CeoVision() {
    return (
        <section id="ceo" className="py-20 bg-[#f9f9f9]">
            <div className="max-w-[1240px] mx-auto px-[15px]">
                <header className="text-center mb-12">
                    <h2 className="text-[35px] font-medium leading-[45px] text-[#345195]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        CEO's Vision
                    </h2>
                </header>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 justify-center max-w-[900px] mx-auto">
                    <div className="w-[180px] sm:w-[200px] shrink-0">
                        <Image 
                            src="/images/products/Sreeram-_Plain-Background-414437.png" 
                            alt="Sreeram Jadapolu" 
                            width={200} 
                            height={200} 
                            className="border border-gray-300 rounded-lg shadow-md w-full h-auto" 
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-base sm:text-[17px] font-normal leading-relaxed text-[#666666] mb-6 italic" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            “When we built AIRA, our vision was clear: AI that financial institutions can finally trust with mission-critical decisions. AIRA combines reasoning, compliance, and OneAPI-powered integration into a single, scalable platform. It's not just about solving today's challenges — it's about empowering the industry to reimagine what's possible with GenAI for customers, regulators, and institutions alike.”
                        </p>
                        <h6 className="text-lg font-bold text-[#222222]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Sreeram Jadapolu
                        </h6>
                        <p className="text-sm text-gray-500 font-medium">
                            Founder & CEO, Hyniva
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function EnterpriseImpact() {
    return (
        <section className="bg-white py-[60px] lg:py-[80px]">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-[50px]">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Enterprise Impact
                    </h2>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3"
                >
                    {impacts.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={scrollReveal}
                            className="bg-white p-6 sm:p-[30px] rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className="mb-[20px]">
                                <Image src={item.img} alt={item.title} width={60} height={60} className="object-contain" />
                            </div>
                            <h6 className="text-lg font-bold text-[#000000] mb-[15px]">{item.title}</h6>
                            <p className="text-[#000000] text-[15px] leading-relaxed m-0">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function CustomerCentric() {
    return (
        <section className="bg-[#f8f9fa] py-[60px] lg:py-[80px]">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8 text-center">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                    <h2 className="text-3xl font-bold text-[#345195] mb-[30px]">
                        Customer-Centric by Design
                    </h2>
                    <div className="max-w-[800px] mx-auto text-left">
                        <p className="text-[15px] text-[#6d6d6d] leading-[26px] m-0">
                            "At Hyniva, we know AI adoption in financial services is not a one-time project — it's an ongoing journey. AIRA was designed to scale with that journey, adapting to evolving regulations, shifting customer expectations, and expanding technology landscapes. With modular agents, built-in compliance, and no-code configurability, institutions can start with targeted use cases and expand seamlessly — without re-engineering legacy systems or risking regulatory setbacks."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function AiraCta() {
    return (
        <motion.section
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-white py-[60px] lg:py-[80px]"
        >
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full max-w-[850px]">
                        <div className="bg-[#ed3137] p-8 sm:p-10 lg:p-16 rounded-[15px] text-center shadow-xl">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-[15px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Reimagine financial services with AIRA
                            </h2>
                            <h6 className="text-base sm:text-lg text-white font-normal mb-[40px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                The Autonomous Intelligent Reasoning Agent.
                            </h6>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-[20px]">
                                <Button asChild style={{ backgroundColor: "#ffffff", color: "#000000", fontSize: "14px", fontWeight: 600, padding: "12px 30px", borderRadius: "0px", height: "auto", border: "none" }} className="hover:bg-gray-100 transition-colors uppercase w-full sm:w-auto">
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                                <Button asChild style={{ backgroundColor: "transparent", color: "#ffffff", fontSize: "14px", fontWeight: 600, padding: "12px 30px", borderRadius: "0px", height: "auto", border: "2px solid #ffffff" }} className="hover:bg-white/10 transition-colors uppercase w-full sm:w-auto">
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default function AiraPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <AiraHero />
            <AiraIntro />
            <AiraDifferentiators />
            <AiraCapabilities />
            <CeoVision />
            <EnterpriseImpact />
            <CustomerCentric />
            <AiraCta />
            <Footer />
        </main>
    )
}
