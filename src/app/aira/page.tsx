'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Faq } from '@/components/faq'
import { airaFaqs } from '@/content/product-faqs'
import { Button } from '@/components/ui/button'
import { CONTAINER_CLASS } from '@/lib/container-utils'
import { motion } from 'framer-motion'
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
        <>
            {/* ─────────────────────────────────────────────────────────────
                MOBILE HERO
            ───────────────────────────────────────────────────────────── */}
            <section className="w-full bg-[#051136] pt-[95px] pb-8 px-4 md:hidden overflow-hidden relative">
                <div className="w-full max-w-[100%] mx-auto relative z-10">

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center text-center"
                    >

                        {/* Logo */}
                        <motion.div variants={fadeInUp} className="mb-6">
                            <Image
                                src="/logos/Artboard.png"
                                alt="AIRA Logo"
                                width={180}
                                height={60}
                                priority
                                className="w-[150px] h-auto object-contain"
                            />
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            variants={fadeInUp}
                            className="
                    text-white
                    font-bold
                    text-[19px]
                    leading-[1.2]
                    mb-5
                    max-w-[310px]
                    mx-auto
                "
                            style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                            Autonomous Intelligent<br />Reasoning Agent
                        </motion.h1>

                        {/* Paragraph */}
                        <motion.p
                            variants={fadeInUp}
                            className="
                    text-white/80
                    text-[14px]
                    leading-[1.7]
                    mb-8
                    max-w-[320px]
                    mx-auto
                "
                            style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                            The enterprise-ready AI platform built<br />
                            for financial institutions — delivering<br />
                            accuracy, execution, and compliance at scale
                        </motion.p>

                        {/* Button */}
                        <motion.div variants={fadeInUp}>
                            <Button
                                asChild
                                className="
                        bg-white
                        text-black
                        hover:bg-gray-100
                        uppercase
                        rounded-none
                        px-8
                        py-3
                        text-[12px]
                        font-semibold
                        shadow-lg
                    "
                            >
                                <Link href="/contact">
                                    Get Started
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Video */}
                        <motion.div
                            variants={fadeInUp}
                            className="mt-10 w-full flex justify-center"
                        >
                            <Image
                                src="/images/Product_Images/AIRA_HERO_BANNER_GRAPHIC.gif"
                                alt="AIRA Animation"
                                width={320}
                                height={320}
                                unoptimized
                                className="
                        w-full
                        max-w-[320px]
                        h-auto
                        object-cover
                    "
                            />
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* ─────────────────────────────────────────────────────────────
                DESKTOP & TABLET HERO
            ───────────────────────────────────────────────────────────── */}
            <section className="relative w-full overflow-hidden bg-[#051136] hidden md:block">

                {/* Animation on right side */}
                <div className="absolute inset-y-0 right-0 z-0 flex items-center justify-end w-1/2 pr-2 md:pr-4 lg:pr-8 xl:pr-12 pointer-events-none">
                    <div className="relative w-full max-w-[380px] md:max-w-[460px] lg:max-w-[680px] xl:max-w-[780px] 2xl:max-w-[860px] aspect-square flex items-center justify-center scale-110 lg:scale-120 origin-right translate-x-12 md:translate-x-24 lg:translate-x-[110px] xl:translate-x-[90px]">
                        
                        <Image
                            src="/images/Product_Images/AIRA_HERO_BANNER_GRAPHIC.gif"
                            alt="AIRA Animation"
                            width={860}
                            height={860}
                            unoptimized
                            priority
                            className="w-full h-auto relative z-10"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex items-center min-h-[520px] md:min-h-[560px] lg:min-h-screen">
                    <div className={CONTAINER_CLASS}>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="w-full max-w-[550px] md:max-w-[580px] lg:max-w-[700px] flex flex-col justify-center items-start text-left relative z-20 py-10 md:py-12 lg:py-16"
                        >

                            {/* Logo */}
                            <motion.div variants={fadeInUp} className="mb-4 sm:mb-6">
                                <Image
                                    src="/logos/Artboard.png"
                                    alt="AIRA Logo"
                                    width={260}
                                    height={90}
                                    priority
                                    className="w-[160px] md:w-[180px] lg:w-[220px] h-auto object-contain"
                                />
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                variants={fadeInUp}
                                className="text-white font-black leading-[1.1] tracking-tight mb-6 md:mb-8 w-full text-3xl md:text-[34px] lg:text-[52px] xl:text-[60px]"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                                Autonomous Intelligent<br />Reasoning Agent
                            </motion.h1>

                            {/* Paragraph */}
                            <motion.p
                                variants={fadeInUp}
                                className="text-slate-300 font-medium leading-relaxed mb-8 md:mb-10 w-full text-sm md:text-base lg:text-[18px] max-w-[640px]"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                                The enterprise-ready AI platform built for financial institutions — delivering accuracy, execution, and compliance at scale
                            </motion.p>

                            {/* Button */}
                            <motion.div variants={fadeInUp}>
                                <Button
                                    asChild
                                    className="
                                        bg-white
                                        text-black
                                        hover:bg-gray-100
                                        uppercase
                                        rounded-none
                                        px-6
                                        py-3.5
                                        text-[12px]
                                        font-semibold
                                        shadow-lg
                                        w-fit
                                    "
                                >
                                    <Link href="/contact">
                                        Get Started
                                    </Link>
                                </Button>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}

function AiraIntro() {
    return (
        <section className="bg-[#e9e9e9] py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className={`${CONTAINER_CLASS} text-center flex flex-col items-center justify-center`}>
                <motion.div 
                    variants={scrollReveal} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={viewportOnce}
                >
                    <h2 className="text-[28px] sm:text-[32px] font-bold text-[#345195] mb-[24px] leading-tight font-display tracking-tight text-center">
                        Introducing AIRA
                    </h2>
                    <div className="max-w-[960px] mx-auto text-center">
                        <p className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-normal text-gray-700 leading-relaxed m-0 text-center">
                            AIRA (Autonomous Intelligent Reasoning Agent) is the first enterprise-ready AI
                            platform for financial services that unifies autonomous reasoning, compliance-first
                            design, and OneAPI integration. By combining these capabilities in a single solution,
                            AIRA delivers safe, explainable, and scalable intelligence—empowering institutions to
                            innovate at speed while maintaining trust and regulatory rigor.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function AiraDifferentiators() {
    return (
        <section className="bg-[#f8f9fa] py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className={CONTAINER_CLASS}>
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-8 sm:mb-[50px]">
                    <h2 className="text-[#345195] text-2xl sm:text-3xl font-bold">
                        What Makes AIRA Different
                    </h2>
                </motion.div>

                <div className="grid gap-6 sm:gap-[30px]">
                    {/* First Row items */}
                    <motion.div
                        variants={scrollStaggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-[30px]"
                    >
                        {whatMakesDiff.slice(0, 2).map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={scrollReveal}
                                className="bg-white p-6 sm:p-8 rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
                            >
                                <div className="mb-[20px]">
                                    <Image src={item.img} alt={item.title} width={80} height={80} className="object-contain" />
                                </div>
                                <h6 className="text-[20px] font-bold text-[#000000] mb-[15px]">{item.title}</h6>
                                <p className="text-[#000000] text-[15px] leading-relaxed m-0">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                    {/* Remaining items */}
                    <motion.div
                        variants={scrollStaggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-[30px]"
                    >
                        {whatMakesDiff.slice(2).map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={scrollReveal}
                                className="bg-white p-6 sm:p-8 rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
                            >
                                <div className="mb-[20px]">
                                    <Image src={item.img} alt={item.title} width={80} height={80} className="object-contain" />
                                </div>
                                <h6 className="text-[20px] font-bold text-[#000000] mb-[15px]">{item.title}</h6>
                                <p className="text-[#000000] text-[15px] leading-relaxed m-0">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function AiraCapabilities() {
    return (
        <section id="capabilities" className="bg-[#0b1021] py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden">
            <div className={`${CONTAINER_CLASS} flex flex-col lg:flex-row gap-[32px] lg:gap-[60px]`} >
                {/* LEFT FIXED CONTENT */}
                <div className="lg:w-[32%] lg:sticky lg:top-[90px] self-start z-10 text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-white mb-4 lg:mb-6 leading-tight">
                        Key Capabilities
                    </h2>
                    <p className="text-center md:text-left text-[15px] sm:text-[16px] leading-[1.6] text-slate-300 max-w-sm mx-auto md:mx-0">
                        Driving faster launches, lower costs, and frictionless journeys across every channel. Built by banking experts.
                    </p>
                </div>

                {/* RIGHT GRID (Scrollable) */}
                <div className="lg:w-[68%] lg:max-h-[660px] lg:overflow-y-auto pr-[10px] pt-0 lg:pt-[20px] custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-[24px] lg:gap-[30px] items-stretch">
                    {capabilities.map((cap, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-[18px] flex flex-col pt-[30px] px-[30px] pb-[20px] transition-all duration-300"
                            style={{
                                background: 'linear-gradient(#040c31, #040c31) padding-box, linear-gradient(320deg, rgba(30, 144, 255, 0.52), rgba(79, 70, 229, 0.53), rgba(12, 16, 43, 0.56)) border-box',
                                border: '1px solid transparent'
                            }}
                        >
                            {/* Title */}
                            <h3 className="text-[17px] sm:text-[18px] leading-snug text-white font-bold mb-[12px] relative z-10">{cap.title}</h3>

                            {/* Description */}
                            <p className="text-[15px] sm:text-base font-medium leading-[1.7] text-slate-300 mb-[20px] relative z-10">{cap.desc}</p>

                            {/* Image — sits directly below description */}
                            <div className="relative z-10 rounded-[10px] overflow-hidden aspect-[16/9] w-full mt-auto">
                                <Image
                                    src={cap.img}
                                    alt={cap.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="rounded-[10px] opacity-80 transition-transform duration-500 group-hover:-translate-y-2 object-cover"
                                />
                            </div>

                            {/* Hover Effect Gradient Overlay */}
                            <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(#040c31, #040c31) padding-box, linear-gradient(320deg, #3886CE, #4f46e5, #9333ea) border-box', border: '1px solid transparent' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CeoVision() {
    return (
        <section id="ceo" className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#e9e9e9]">
            <div className={CONTAINER_CLASS}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >

                    <div className="max-w-[840px] mx-auto text-left">
                        {/* Heading */}
                        <header className="mb-6 text-left">
                            <h2
                                className="text-[28px] sm:text-[32px] font-bold leading-tight tracking-tight font-display text-left"
                                style={{
                                    color: '#345195'
                                }}
                            >
                                CEO’s Vision
                            </h2>
                        </header>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-10 w-full">

                            {/* Image: matching height of content */}
                            <div className="relative w-full md:w-[260px] lg:w-[280px] shrink-0 self-stretch rounded-[16px] overflow-hidden min-h-[240px]">
                                <Image
                                    src="/images/products/Sreeram-_Plain-Background-414437.png"
                                    alt="Sreeram Jadapolu"
                                    fill
                                    className="object-cover object-top rounded-[16px]"
                                />
                            </div>

                            {/* Text */}
                            <div className="flex-1 text-left flex flex-col justify-between py-1">

                                <p
                                    className="text-[17px] sm:text-[19px] leading-[1.75] font-medium mb-6 text-[#6f6f6f]"
                                >
                                    “When we built AIRA, our vision was clear: AI that financial institutions
                                    can finally trust with mission-critical decisions. AIRA combines
                                    reasoning, compliance, and OneAPI-powered integration into a single,
                                    scalable platform. It’s not just about solving today’s challenges — it’s
                                    about empowering the industry to reimagine what’s possible with GenAI
                                    for customers, regulators, and institutions alike.”
                                </p>

                                <div>
                                    <h6
                                        className="text-[17px] sm:text-[18px] font-bold mb-0.5 tracking-tight font-display"
                                        style={{
                                            color: '#345195'
                                        }}
                                    >
                                        Sreeram Jadapolu,
                                    </h6>

                                    <p
                                        className="text-[15px] font-medium text-[#6f6f6f]"
                                    >
                                        Founder & CEO, Hyniva
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
function EnterpriseImpact() {
    return (
        <section id="enterprize" className="bg-[#020844] py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className={CONTAINER_CLASS}>

                {/* Heading */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center mb-8"
                >
                    <h2
                        className="text-[24px] sm:text-[32px] font-bold"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#ffffff'
                        }}
                    >
                        Enterprise Impact
                    </h2>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {impacts.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={scrollReveal}
                            className="bg-white rounded-[10px] p-6 min-h-[230px] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl border border-white/10 cursor-pointer overflow-hidden"
                        >

                            {/* Icon */}
                            <div className="mb-4">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </div>

                            {/* Title */}
                            <h6
                                className="text-[16px] font-bold mb-3 leading-[1.5] text-slate-900"
                                style={{
                                    fontFamily: 'Poppins, sans-serif'
                                }}
                            >
                                {item.title}
                            </h6>

                            {/* Description */}
                            <p
                                className="text-[14px] leading-[1.8] text-slate-600"
                                style={{
                                    fontFamily: 'Poppins, sans-serif'
                                }}
                            >
                                {item.desc}
                            </p>

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function CustomerCentric() {
    return (
        <section className="bg-[#f8f9fa] py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className={`${CONTAINER_CLASS} text-center flex flex-col items-center justify-center`}>
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                    <h2 className="text-[28px] sm:text-[32px] font-bold text-[#345195] mb-[24px] leading-tight font-display tracking-tight text-center">
                        Customer-Centric by Design
                    </h2>
                    <div className="max-w-[960px] mx-auto text-center">
                        <p className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-normal text-gray-700 leading-relaxed m-0 text-center">
                            At Hyniva, we know AI adoption in financial services is not a one-time project — it's an ongoing journey. AIRA was designed to scale with that journey, adapting to evolving regulations, shifting customer expectations, and expanding technology landscapes. With modular agents, built-in compliance, and no-code configurability, institutions can start with targeted use cases and expand seamlessly — without re-engineering legacy systems or risking regulatory setbacks.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
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
            <Faq items={airaFaqs} />
            <Footer />
        </main>
    )
}
