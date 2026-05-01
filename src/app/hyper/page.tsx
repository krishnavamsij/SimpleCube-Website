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
            <section className="pt-[150px] pb-16">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <div className="flex flex-wrap -mx-[15px]">
                        <div className="w-full md:w-1/2 px-[15px] flex flex-col justify-center">
                            <motion.div 
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >
                                <motion.div variants={fadeInUp} className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8 w-fit">
                                    <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                    HYPER PLATFORM
                                </motion.div>
                                <motion.div variants={fadeInUp} className="mb-8">
                                    <Image 
                                        src="/images/products/Hyper_FullLogo_Transparent_NoBuffer-2-300x103.png" 
                                        alt="Hyper" 
                                        width={300} 
                                        height={103} 
                                        className="border border-transparent"
                                    />
                                </motion.div>
                                <header className="mb-[32px]">
                                    <motion.h2 variants={fadeInUp} className="text-[35px] font-medium leading-[45px] text-[#222222] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        Personalized, Scalable Digital Investment Journeys.
                                    </motion.h2>
                                    <motion.h6 variants={fadeInUp} className="text-[15px] font-medium leading-[25px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        A modern portfolio planning platform that empowers advisors and investors with personalized recommendations, compliance-friendly flows, and seamless digital onboarding.
                                    </motion.h6>
                                </header>
                                <motion.div variants={fadeInUp}>
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-[#00529b] text-white px-[25px] py-[12px] text-[15px] font-medium rounded shadow hover:bg-[#004080] transition-colors"
                                        style={{ fontFamily: 'Roboto, sans-serif' }}
                                    >
                                        Book a Demo
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="w-full md:w-1/2 px-[15px] mt-10 md:mt-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Image 
                                    src="/images/products/businessmen-put-placing-wood-block-tower-workplace-business-stock-trading-financial-800x491.jpg" 
                                    alt="Hyper Platform" 
                                    width={800} 
                                    height={491} 
                                    className="w-full h-auto border border-gray-200 shadow-sm"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8 text-center">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                        <h2 className="text-3xl font-bold text-[#345195] mb-[30px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Introducing Hyper
                        </h2>
                        <div className="max-w-[800px] mx-auto text-left">
                            <p className="text-[15px] text-gray-700 leading-[26px] m-0" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Hyper empowers financial institutions and advisors to deliver investment experiences that are transparent, personalized, and built for today’s digital-first investor. From guided discovery to tailored portfolio suggestions, Hyper accelerates growth, enhances trust, and simplifies decision-making.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Capabilities That Drive Growth */}
            <section className="py-20 bg-[#0b1021]">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <header className="text-center mb-[32px]">
                        <h2 className="text-[35px] font-medium leading-[45px] text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Capabilities That Drive Growth
                        </h2>
                    </header>

                    <div className="flex flex-wrap -mx-[15px]">
                        {capabilities.map((cap, idx) => (
                            <div key={idx} className="w-full md:w-1/4 sm:w-1/2 px-[15px] mb-[64px] last:mb-0 md:last:mb-[64px]">
                                <div className="flex flex-col items-center">
                                    <div className="mb-[32px] w-[130px] h-[130px] rounded-full overflow-hidden border border-gray-600 flex items-center justify-center bg-white/5">
                                        <Image src={cap.img} alt={cap.title} width={80} height={80} className="object-contain" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[18px] font-medium leading-[28px] text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                            {cap.title}
                                        </h3>
                                        <h6 className="text-[14px] font-normal leading-[24px] text-[#c7c7c7] whitespace-pre-line" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                            {cap.desc}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CEO Vision */}
            <section id="ceo" className="py-20 bg-[#f9f9f9]">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <header className="text-center mb-12">
                        <h2 className="text-[35px] font-medium leading-[45px] text-[#345195]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            CEO's Vision
                        </h2>
                    </header>
                    <div className="flex flex-wrap -mx-[15px]">
                        <div className="hidden md:block md:w-1/6 px-[15px]"></div>
                        <div className="w-full md:w-2/12 px-[15px] mb-8 md:mb-0 flex justify-center">
                            <div className="pt-[10px]">
                                <Image src="/images/products/Sreeram-_Plain-Background-414437.png" alt="Sreeram Jadapolu" width={200} height={200} className="border border-gray-300" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-[15px]">
                            <p className="text-[15px] font-normal leading-[25px] text-[#666666] mb-[20px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                “At Hyniva, our vision is to help wealth managers connect more meaningfully with clients by transforming the investment journey into a personalized, data-driven experience. With Hyper, we empower advisors to scale their reach, build trust through consistent recommendations, and deliver transparent insights that grow AUM while reducing acquisition efforts.”
                            </p>
                            <h6 className="text-[16px] font-normal leading-[26px] text-[#222222]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                <strong>Sreeram Jadapolu,</strong><br/>
                                <strong>Founder & CEO, Hyniva</strong>
                            </h6>
                        </div>
                        <div className="hidden md:block md:w-1/6 px-[15px]"></div>
                    </div>
                </div>
            </section>

            {/* Real Business Outcomes */}
            <section className="py-20 bg-[#0b1021]">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <header className="text-center mb-[40px]">
                        <h2 className="text-[35px] font-medium leading-[45px] text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Real Business Outcomes
                        </h2>
                    </header>
                    <div className="flex flex-wrap -mx-[15px]">
                        {outcomes.map((item, idx) => (
                            <div key={idx} className="w-full md:w-1/3 px-[15px] mb-[30px]">
                                <div className="bg-white p-[30px] rounded shadow hover:shadow-lg transition-shadow h-full">
                                    <div className="mb-[20px] max-w-[80px]">
                                        <Image src={item.img} alt={item.title} width={512} height={512} className="w-full h-auto" />
                                    </div>
                                    <h6 className="text-[18px] font-medium leading-[26px] text-[#000000] mb-[10px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        {item.title}
                                    </h6>
                                    <p className="text-[15px] font-normal leading-[25px] text-[#000000]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Header */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-[1240px] mx-auto px-[15px] text-center">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                        <h2 className="text-[35px] font-bold leading-[45px] text-[#030B3B] uppercase mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Take control of your growth. Digitally.
                        </h2>
                        <div className="max-w-[1000px] mx-auto">
                            <p className="text-[16px] font-normal leading-[26px] text-[#6d6d6d]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                With Hyper, you’re not just getting software — you’re adopting a smart, scalable investment engine built for advisors who want to grow assets, streamline onboarding, and deliver consistent, compliant, personalized advice to every investor. Start your journey now.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Green Card CTA */}
            <section className="py-20 lg:py-24 bg-white">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <div className="flex justify-center">
                        <motion.div 
                            variants={scrollReveal} 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={viewportOnce}
                            className="w-full max-w-[850px] bg-[#578849] p-10 lg:p-16 rounded-[15px] text-center shadow-xl"
                        >
                            <h2 className="text-[30px] md:text-[35px] font-bold text-white uppercase mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Ready to level up your investment-flows with Hyper?
                            </h2>
                            <p className="text-[17px] font-normal leading-[28px] text-white/90 mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Book a demo today to see how Hyper can transform your advisory business, automate client acquisition, and scale AUM growth.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link
                                    href="/contact"
                                    className="bg-white text-[#578849] px-[35px] py-[15px] text-[16px] font-bold rounded shadow-lg transition-all hover:bg-gray-100"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    GET STARTED
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-transparent text-white border-2 border-white px-[35px] py-[13px] text-[16px] font-bold rounded transition-colors hover:bg-white hover:text-[#578849]"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    CONTACT US
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

