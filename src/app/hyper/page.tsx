'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Faq } from '@/components/faq'
import { hyperFaqs } from '@/content/product-faqs'
import { motion } from "framer-motion"
import { CONTAINER_CLASS } from '@/lib/container-utils'
import { fadeInUp, staggerContainer, scrollStaggerContainer, scrollReveal, viewportOnce } from "@/lib/animations"

const capabilities = [
    {
        img: '/images/products/Guided-Digital-Investment-Journey.png',
        title: 'Guided Digital Investment Journey',
        desc: 'A simple, structured flow that takes investors from goal discovery to personalized recommendations in a seamless digital journey.',
    },
    {
        img: '/images/products/Personalized-Portfolio-Recommendations.png',
        title: 'Personalized Portfolio Recommendations',
        desc: 'Delivers tailored portfolio options using advisor-defined scoring, investment models, and transparent recommendation logic.',
    },
    {
        img: '/images/products/Configurable-Questions-Scoring-Models.png',
        title: 'Configurable Questions & Scoring Models',
        desc: 'Fully customizable questions, scoring rules, and mappings enable advisors to align flows with their strategy and compliance needs.',
    },
    {
        img: '/images/products/Interactive-Simulations-What-If-Analysis.png',
        title: 'Interactive Simulations & What-If Analysis',
        desc: 'Investors can adjust inputs, run real-time simulations, and instantly compare scenarios to make confident investment decisions.',
    },
    {
        img: '/images/products/Automated-Lead-Capture-Nurture-Paths.png',
        title: 'Automated Lead Capture & Nurture Paths',
        desc: 'Undecided users convert into leads with complete questionnaire data, enabling targeted advisor follow-ups and re-engagement.',
    },
    {
        img: '/images/products/Marketing-Flows-Follow-Up-Automation.png',
        title: 'Marketing Flows & Follow-Up Automation',
        desc: 'Automated reminders, triggers, and engagement paths help advisors stay connected and increase conversions efficiently.',
    },
    {
        img: '/images/products/Advisor-Dashboard-with-Actionable-Insights.png',
        title: 'Advisor Dashboard with Actionable Insights',
        desc: 'Advisors get visibility into user behavior, funnel performance, drop-off patterns, and high-intent opportunities to improve outcomes.',
    },
    {
        img: '/images/products/Compliance-Ready-Documentation-Tracking.png',
        title: 'Compliance Ready Documentation & Tracking',
        desc: 'Every step is logged with audit-ready summaries, disclosures, and consistent recommendation trails to reduce compliance risk.',
    },
]

const outcomes = [
    {
        img: '/images/products/conversion-rate-optimizer.png',
        title: 'Higher AUM Through Faster Digital Conversions',
        desc: 'Self-directed flows help prospects move from interest to investment within minutes.',
    },
    {
        img: '/images/products/acquisition.png',
        title: 'Stronger Lead Quality and Lower Acquisition Costs',
        desc: 'Automated insights and questionnaires produce motivated leads at a fraction of traditional marketing spend.',
    },
    {
        img: '/images/products/compliance.png',
        title: 'Consistent Advice That Reduces Compliance Risk',
        desc: 'Every investor receives transparent, audit-ready recommendations aligned with scoring logic.',
    },
    {
        img: '/images/products/market.png',
        title: 'Expanded Market Reach Across Diverse Client Segments',
        desc: 'Digital access enables advisors to attract broader audiences beyond referrals or geography.',
    },
    {
        img: '/images/products/productivity.png',
        title: 'Improved Advisor Productivity and Follow-Up Precision',
        desc: 'Targeted insights allow advisors to prioritize high-intent clients and personalize outreach.',
    },
    {
        img: '/images/products/conversion.png',
        title: 'Data-Driven Tuning for Better Conversions Over Time',
        desc: 'Session analytics reveal behavioural patterns that help advisors optimize flows and engagement.',
    },
]

export default function HyperPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar forceDarkText={true} />
            
            {/* Hero Section */}
             <section className="pt-[120px] pb-[70px] bg-white">
                <div className={CONTAINER_CLASS}>

                    <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">

                        {/* LEFT CONTENT - 50% */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-start">

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >

                                {/* Eyebrow - Removed */}

                                {/* Logo */}
                                <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
                                    <Image
                                        src="/images/Product_Logos/Hyper.png"
                                        alt="Hyper Logo"
                                        width={260}
                                        height={90}
                                        className="w-full h-auto max-w-[250px] object-contain"
                                        priority
                                    />
                                </motion.div>

                                {/* Heading */}
                                <header className="mb-6">
                                    <motion.h1
                                        variants={fadeInUp}
                                        className="text-[26px] sm:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] font-bold leading-[1.18] mb-5 tracking-tight text-[#345195]"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif'
                                        }}
                                    >
                                        <span className="block">Personalized, Scalable</span>
                                        <span className="block">Digital Investment Journeys.</span>
                                    </motion.h1>

                                    {/* Description */}
                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-base sm:text-lg lg:text-[18px] 2xl:text-[19px] leading-relaxed text-[#666666] font-normal"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        A modern portfolio planning platform that empowers advisors and investors with personalized recommendations, compliance-friendly flows, and seamless digital onboarding.
                                    </motion.p>
                                </header>

                                {/* Button */}
                                <motion.div variants={fadeInUp}>
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-[#345195] text-white px-8 py-3.5 text-sm sm:text-base font-bold rounded-lg transition-all duration-300 hover:bg-[#2b437d]"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        Book a Demo
                                    </Link>
                                </motion.div>

                            </motion.div>
                        </div>

                        {/* RIGHT IMAGE - 50% */}
                        <div className="w-full lg:w-1/2 flex items-start justify-center">

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full"
                            >
                                <Image
                                    src="/images/products/businessmen-put-placing-wood-block-tower-workplace-business-stock-trading-financial-800x491.jpg"
                                    alt="Hyper Platform"
                                    width={800}
                                    height={491}
                                    className="w-full h-auto rounded-[6px] object-cover"
                                    priority
                                />
                            </motion.div>

                        </div>

                    </div>
                </div>
            </section>

            {/* Intro Section */}
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
                                    className="text-[36px] font-bold mb-5 leading-tight text-center"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        color: '#345195',
                                        margin: '0 0 20px'
                                    }}
                                >
                                    Introducing Hyper
                                </h2>

                                <p
                                    className="text-[18px] sm:text-[20px] leading-[1.7] font-normal"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        color: '#6f6f6f',
                                        textAlign: 'left',
                                        margin: 0
                                    }}
                                >
                                    Hyper empowers financial institutions and advisors to deliver
                                    investment experiences that are transparent, personalized, and
                                    built for today's digital-first investor. From guided discovery
                                    to tailored portfolio suggestions, Hyper accelerates growth,
                                    enhances trust, and simplifies decision-making.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities That Drive Growth */}
            <section id="capabilities" className="bg-[#0b1021] py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden">
                <div className={`${CONTAINER_CLASS} flex flex-col lg:flex-row gap-[32px] lg:gap-[60px]`} >
                    {/* LEFT FIXED CONTENT */}
                    <div className="lg:w-[32%] lg:sticky lg:top-[90px] self-start z-10 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-white mb-4 lg:mb-6 leading-tight">
                            Capabilities That Drive Growth
                        </h2>
                        <p className="text-center lg:text-left text-[15px] sm:text-[16px] leading-[1.6] text-slate-300 max-w-sm mx-auto lg:mx-0">
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
                                    background: 'linear-gradient(#040c31, #040c31) padding-box, linear-gradient(320deg, rgba(168, 85, 247, 0.52), rgba(59, 130, 246, 0.53), rgba(12, 16, 43, 0.56)) border-box',
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
                                <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(#040c31, #040c31) padding-box, linear-gradient(320deg, #a855f7, #3b82f6, #00d4aa) border-box', border: '1px solid transparent' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CEO Vision */}
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
                                        “At Hyniva, our vision is to help wealth managers connect more
                                        meaningfully with clients by transforming the investment journey
                                        into a personalized, data-driven experience. With Hyper, we
                                        empower advisors to scale their reach, build trust through
                                        consistent recommendations, and deliver transparent insights
                                        that grow AUM while reducing acquisition efforts.”
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

            {/* Real Business Outcomes */}
            <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#020844]">
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
                            className="text-[28px] sm:text-[32px] font-bold"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#ffffff'
                            }}
                        >
                            Real Business Outcomes
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
                        {outcomes.map((item, idx) => (
                            <motion.div
                                key={idx}
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

            {/* CTA Header */}
            <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#f8f9fa]">
                <div className={`${CONTAINER_CLASS} text-center`}>

                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >

                        {/* Heading */}
                        <h2
                            className="text-[28px] sm:text-[32px] font-bold leading-tight tracking-tight font-display text-[#345195] mb-6 text-center"
                        >
                            Take Control Of Your Growth Digitally
                        </h2>

                        {/* Description */}
                        <div className="max-w-[960px] mx-auto text-center">
                            <p
                                className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-normal leading-relaxed text-gray-700 m-0"
                                style={{
                                    fontFamily: 'Poppins, sans-serif'
                                }}
                            >
                                With Hyper, you’re not just getting software — you’re adopting
                                a smart, scalable investment engine built for advisors who want
                                to grow assets, streamline onboarding, and deliver consistent,
                                compliant, personalized advice to every investor. Start your
                                journey now.
                            </p>
                        </div>

                    </motion.div>

                </div>
            </section>
            <Faq items={hyperFaqs} />
            <Footer />
        </div>
    )
}

