'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CONTAINER_CLASS } from '@/lib/container-utils'
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
        <>
            {/* ─────────────────────────────────────────────────────────────
                MOBILE HERO
            ───────────────────────────────────────────────────────────── */}
            <section className="w-full bg-[#081138] pt-[95px] pb-8 px-4 md:hidden overflow-hidden">
                <div className="w-full max-w-[100%] mx-auto">

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
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="
                        w-full
                        max-w-[320px]
                        h-auto
                        object-contain
                        mix-blend-screen
                    "
                                style={{
                                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)',
                                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)',
                                }}
                            >
                                <source
                                    src="/images/Product_Images/AIRA HERO BANNER GRAPHIC.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* ─────────────────────────────────────────────────────────────
                DESKTOP & TABLET HERO
            ───────────────────────────────────────────────────────────── */}
            <section className="relative w-full overflow-hidden bg-[#020918] hidden md:block">

                {/* Animation on right side - small size, no overflow, blended with background */}
                <div className="absolute inset-y-0 right-0 z-0 flex items-center justify-end w-1/2 pr-0 md:pr-4 lg:pr-6 pointer-events-none overflow-hidden">
                    <div className="relative w-full max-w-[300px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[480px] aspect-square flex items-center justify-center translate-x-6 md:translate-x-10 lg:translate-x-12">
                        {/* Ambient soft glow matching page theme */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,81,149,0.35)_0%,transparent_65%)] rounded-full blur-2xl pointer-events-none" />

                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-contain relative z-10 mix-blend-screen"
                            style={{
                                maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 55%)',
                                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 55%)',
                            }}
                        >
                            <source
                                src="/images/Product_Images/AIRA HERO BANNER GRAPHIC.mp4"
                                type="video/mp4"
                            />
                        </video>
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
            <div className={CONTAINER_CLASS}>
                <div className="flex justify-center">
                    <div className="w-full lg:w-9/12">
                        <motion.div
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="bg-white rounded-[18px] px-6 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8 shadow-sm text-left"
                        >
                            <h2
                                className="text-[24px] sm:text-[36px] font-bold mb-4 leading-tight"
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#345195',
                                    margin: '0 0 15px'
                                }}
                            >
                                Introducing AIRA
                            </h2>

                            <p
                                className="text-[14px] sm:text-[18px] leading-[1.6] font-normal"
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#6f6f6f',
                                    textAlign: 'left',
                                    margin: 0
                                }}
                            >
                                AIRA (Autonomous Intelligent Reasoning Agent) is the first enterprise-ready AI
                                platform for financial services that unifies autonomous reasoning, compliance-first
                                design, and OneAPI integration. By combining these capabilities in a single solution,
                                AIRA delivers safe, explainable, and scalable intelligence—empowering institutions to
                                innovate at speed while maintaining trust and regulatory rigor.
                            </p>
                        </motion.div>
                    </div>
                </div>
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
        <section id="capabilities" className="bg-[#0b1021] pt-[15px] sm:pt-[20px] lg:pt-[25px] pb-[30px] sm:pb-[40px] lg:pb-[50px]">
            <div className={CONTAINER_CLASS}>
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-8 sm:mb-[50px]">
                    <h2 className="text-white text-2xl sm:text-3xl lg:text-[34px] font-bold mb-2 sm:mb-[10px] leading-tight">
                        Key Capabilities
                    </h2>
                    <h6 className="text-white/90 text-lg sm:text-xl font-medium">
                        AIRA brings a financial-services lens to every capability
                    </h6>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-[24px] sm:gap-[30px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                    {capabilities.map((cap, idx) => (
                        <motion.div
                            key={idx}
                            variants={scrollReveal}
                            className="group flex flex-col rounded-[12px] overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-lg"
                        >
                            <div className="w-full h-auto overflow-hidden">
                                <Image src={cap.img} alt={cap.title} width={800} height={450} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="bg-[#040c31] p-5 sm:p-6 text-center flex-grow flex flex-col items-center">
                                <h5 className="text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-white mb-[12px] leading-tight">{cap.title}</h5>
                                <p className="text-white/90 text-[13px] sm:text-[14px] leading-[1.6] m-0">{cap.desc}</p>
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
        <section id="ceo" className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#e9e9e9]">
            <div className={CONTAINER_CLASS}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >

                    {/* Heading */}
                    <header className="text-center mb-8">
                        <h2
                            className="text-[28px] sm:text-[32px] font-bold leading-tight"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#345195'
                            }}
                        >
                            CEO’s Vision
                        </h2>
                    </header>

                    {/* Content */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 max-w-[780px] mx-auto">

                        {/* Image */}
                        <div className="w-[160px] shrink-0">
                            <Image
                                src="/images/products/Sreeram-_Plain-Background-414437.png"
                                alt="Sreeram Jadapolu"
                                width={160}
                                height={200}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-left">

                            <p
                                className="text-[17px] sm:text-[19px] leading-[1.75] font-medium mb-5"
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#6f6f6f'
                                }}
                            >
                                “When we built AIRA, our vision was clear: AI that financial institutions
                                can finally trust with mission-critical decisions. AIRA combines
                                reasoning, compliance, and OneAPI-powered integration into a single,
                                scalable platform. It’s not just about solving today’s challenges — it’s
                                about empowering the industry to reimagine what’s possible with GenAI
                                for customers, regulators, and institutions alike.”
                            </p>

                            <h6
                                className="text-[17px] sm:text-[18px] font-bold mb-1"
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#345195'
                                }}
                            >
                                Sreeram Jadapolu,
                            </h6>

                            <p
                                className="text-[15px] font-normal"
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#6f6f6f'
                                }}
                            >
                                Founder & CEO, Hyniva
                            </p>

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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {impacts.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={scrollReveal}
                            className="bg-white rounded-[6px] p-5 min-h-[230px] transition-all duration-300 hover:-translate-y-1 hover:bg-[#345195] group border border-white"
                        >

                            {/* Icon */}
                            <div className="mb-4">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={42}
                                    height={42}
                                    className="object-contain transition duration-300 group-hover:brightness-0 group-hover:invert"
                                />
                            </div>

                            {/* Title */}
                            <h6
                                className="text-[16px] font-bold mb-3 leading-[1.5] text-black group-hover:text-white transition-colors duration-300"
                                style={{
                                    fontFamily: 'Poppins, sans-serif'
                                }}
                            >
                                {item.title}
                            </h6>

                            {/* Description */}
                            <p
                                className="text-[14px] leading-[1.8] m-0 text-black group-hover:text-white transition-colors duration-300"
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
            <div className={`${CONTAINER_CLASS} text-center`}>
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
            <Footer />
        </main>
    )
}
