'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, scrollReveal, viewportOnce } from "@/lib/animations"

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
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">

                    <div className="flex flex-col lg:flex-row items-center gap-10">

                        {/* LEFT CONTENT - 50% */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center">

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >

                                {/* Eyebrow - Removed */}

                                {/* Logo */}
                                <motion.div variants={fadeInUp} className="mb-7">
                                    <Image
                                        src="/images/products/Hyper_FullLogo_Transparent_NoBuffer-2-300x103.png"
                                        alt="Hyper"
                                        width={260}
                                        height={90}
                                        className="w-[220px] sm:w-[260px] h-auto"
                                    />
                                </motion.div>

                                {/* Heading */}
                                <header className="mb-6">
                                    <motion.h2
                                        variants={fadeInUp}
                                        className="text-[32px] sm:text-[40px] font-bold leading-[1.3] mb-5"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            color: '#345195'
                                        }}
                                    >
                                        Personalized, Scalable
                                        <br />
                                        Digital Investment Journeys.
                                    </motion.h2>

                                    {/* Description */}
                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-[18px] sm:text-[20px] leading-[1.8] text-[#6f6f6f]"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        A modern portfolio planning platform that empowers
                                        advisors and investors with personalized recommendations,
                                        compliance-friendly flows, and seamless digital onboarding.
                                    </motion.p>
                                </header>

                                {/* Button */}
                                <motion.div variants={fadeInUp}>
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-[#345195] text-white px-7 py-3 text-[15px] font-semibold rounded-[4px] transition-all duration-300 hover:bg-[#2b437d]"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        Book a Demo
                                    </Link>
                                </motion.div>

                            </motion.div>
                        </div>

                        {/* RIGHT IMAGE - 50% */}
                        <div className="w-full lg:w-1/2 flex items-center justify-center">

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
                <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
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
            <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#030B49]">
                <div className="max-w-[1250px] mx-auto px-6">

                    {/* Heading */}
                    <header className="text-center mb-10">
                        <h2
                            className="text-[30px] sm:text-[36px] font-bold text-white"
                            style={{
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            Capabilities That Drive Growth
                        </h2>
                    </header>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {capabilities.map((cap, idx) => (
                            <div
                                key={idx}
                                className="overflow-hidden bg-[#040c31] rounded-[6px] transition-all duration-300 hover:-translate-y-1 group"
                            >

                                {/* Image */}
                                <div className="overflow-hidden">
                                    <Image
                                        src={cap.img}
                                        alt={cap.title}
                                        width={322}
                                        height={246}
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="bg-[#040c31] text-center px-5 py-6 min-h-[220px]">

                                    <h3
                                        className="text-[17px] font-bold leading-[1.5] text-white mb-3"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif'
                                        }}
                                    >
                                        {cap.title}
                                    </h3>

                                    <p
                                        className="text-[14px] leading-[1.8] text-white"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif'
                                        }}
                                    >
                                        {cap.desc}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* CEO Vision */}
            <section id="ceo" className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#e9e9e9]">
                <div className="max-w-[1000px] mx-auto px-6">

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
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-5 max-w-[780px] mx-auto">

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
                        <div className="flex-1 text-center md:text-left">

                            <p
                                className="text-[17px] sm:text-[19px] leading-[1.75] font-medium mb-5"
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#6f6f6f'
                                }}
                            >
                                “At Hyniva, our vision is to help wealth managers connect more
                                meaningfully with clients by transforming the investment journey
                                into a personalized, data-driven experience. With Hyper, we
                                empower advisors to scale their reach, build trust through
                                consistent recommendations, and deliver transparent insights
                                that grow AUM while reducing acquisition efforts.”
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
                </div>
            </section>

            {/* Real Business Outcomes */}
            <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#020844]">
                <div className="max-w-[1050px] mx-auto px-6">

                    {/* Heading */}
                    <header className="text-center mb-8">
                        <h2
                            className="text-[28px] sm:text-[32px] font-bold"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#ffffff'
                            }}
                        >
                            Real Business Outcomes
                        </h2>
                    </header>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        {outcomes.map((item, idx) => (
                            <div key={idx}>

                                <div className="bg-white rounded-[6px] p-5 min-h-[230px] transition-all duration-300 hover:-translate-y-1 hover:bg-[#345195] group">

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
                                        className="text-[14px] leading-[1.8] text-black group-hover:text-white transition-colors duration-300"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif'
                                        }}
                                    >
                                        {item.desc}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* CTA Header */}
            <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#e9e9e9]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">

                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >

                        {/* Heading */}
                        <h2
                            className="text-[30px] sm:text-[38px] font-bold leading-[1.3] mb-6"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#345195'
                            }}
                        >
                            Take Control Of Your Growth Digitally
                        </h2>

                        {/* Description */}
                        <div className="max-w-[1050px] mx-auto">
                            <p
                                className="text-[17px] sm:text-[19px] leading-[1.9]"
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#6f6f6f'
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
            <Footer />
        </div>
    )
}

