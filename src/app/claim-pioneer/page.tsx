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
        img: '/images/products/ai-assistant-action-user-interacting-with-futuristic-interface-laptop-scaled-450x250.jpg',
        title: 'AI-Driven Claim Assignment',
        desc: 'Assigns claims automatically based on\nadjuster availability, skill, performance, and\nproximity – ensuring fair and efficient distribution',
    },
    {
        img: '/images/products/male-influencer-holds-phone-with-chroma-key-screen-online-presence-scaled-450x250.jpg',
        title: 'Mobile-First Field Execution',
        desc: 'Adjusters manage assignments,\nroutes, photos, notes, and estimate\nsubmissions from a single mobile app',
    },
    {
        img: '/images/products/businessman-holding-hand-icon-user-man-woman-low-poly-polygon-style-internet-icons-interface-foreground-global-network-media-concept-scaled-450x250.jpg',
        title: 'Real-Time Customer Updates',
        desc: 'Customers receive appointment\nconfirmations, adjuster details, ETA, and\nlive tracking updates – reducing follow-up calls.',
    },
    {
        img: '/images/products/industrial-technology-with-industrial-network-connection-scaled-450x250.jpg',
        title: 'Smart Workflow Automation',
        desc: 'From intake to QA review,\nsubmission, and payouts – everything\nruns on an intelligent, connected workflow',
    },
    {
        img: '/images/products/businessman-studying-infographics-performance-metrics-scaled-450x250.jpg',
        title: 'Operations Dashboards',
        desc: 'Real-time visibility into workloads,\nproductivity, SLAs and bottlenecks\nwith insights to improve daily operations',
    },
    {
        img: '/images/products/colleagues-male-entrepreneurs-meeting-room-creative-office-discussing-accounting-trade-scaled-450x250.jpg',
        title: 'Financial Management',
        desc: 'Manage carrier invoices, adjuster\npayments, commissions, and financial\nperformance through a unified dashboard',
    },
]

const outcomes = [
    {
        img: '/images/products/project-management.png',
        title: 'Faster & More Efficient Claim Assignment',
        desc: 'AI-driven routing accelerates assignment and removes delays caused by manual processes.'
    },
    {
        img: '/images/products/coordination.png',
        title: 'Significantly Reduced Manual Coordination Efforts',
        desc: 'Automation replaces phone calls, messages, and spreadsheets — freeing up agency time.'
    },
    {
        img: '/images/products/utilization.png',
        title: 'Improved Adjuster Utilization and Workload Balance',
        desc: 'Balanced workloads ensure adjusters get the right number of assignments, increasing productivity.'
    },
    {
        img: '/images/products/commitment.png',
        title: 'Stronger SLA Adherence and Operational Consistency',
        desc: 'Real-time visibility, automated scheduling, and timely field visits help teams consistently meet SLAs.'
    },
    {
        img: '/images/products/rate.png',
        title: 'Higher Customer Satisfaction & Better NPS',
        desc: 'Live tracking, instant updates, and faster assessments create a smoother customer experience.'
    },
    {
        img: '/images/products/workflow.png',
        title: 'More Predictable & Organized Workflows',
        desc: 'Adjusters experience fewer scheduling conflicts and clearer daily planning, reducing missed appointments.'
    },
]

export default function ClaimPioneerPage() {
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
                                    CLAIM PIONEER
                                </motion.div>
                                <motion.div variants={fadeInUp} className="mb-8">
                                    <Image 
                                        src="/images/products/Claim-Pioneer-e1764916989437-300x137.jpeg" 
                                        alt="Claim Pioneer" 
                                        width={300} 
                                        height={137} 
                                        className="border border-gray-200"
                                    />
                                </motion.div>
                                <header className="mb-[32px]">
                                    <motion.h2 variants={fadeInUp} className="text-[35px] font-medium leading-[45px] text-[#222222] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        Automate. Adjust. Achieve.
                                    </motion.h2>
                                    <motion.h6 variants={fadeInUp} className="text-[15px] font-medium leading-[25px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        Transforming every step of the claims journey with automation to boost speed, accuracy, and customer satisfaction.
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
                                    src="/images/products/image-2.jpeg" 
                                    alt="Claim Pioneer" 
                                    width={800} 
                                    height={536} 
                                    className="w-full h-auto border border-gray-200"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reimagining Claims */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8 text-center">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                        <h2 className="text-3xl font-bold text-[#345195] mb-[30px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Reimagining Claims with Intelligent Automation
                        </h2>
                        <div className="max-w-[800px] mx-auto text-left">
                            <p className="text-[15px] text-gray-700 leading-[26px] m-0" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                The future of claims is fast, automated, and intelligence driven. Traditional manual assignment and follow-ups create delays, biased routing, and customer frustration. Claim Pioneer brings automation and real-time visibility to every step of the claim's lifecycle, from intake to closure. With built-in AI assignment, live tracking, and end-to-end workflow automation, agencies can scale operations, reduce overhead, and consistently deliver high-quality claim outcomes.
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
                            <div key={idx} className="w-full md:w-1/3 px-[15px] mb-[64px] last:mb-0 md:last:mb-[64px]">
                                <div className="flex flex-col items-center">
                                    <div className="mb-[32px] w-full border border-gray-600 rounded">
                                        <Image src={cap.img} alt={cap.title} width={450} height={250} className="w-full h-auto rounded" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[20px] font-medium leading-[30px] text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                            {cap.title}
                                        </h3>
                                        <h6 className="text-[15px] font-medium leading-[25px] text-white whitespace-pre-line" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
                                “The insurance industry is undergoing a fundamental shift toward automation, mobility, and customer-first experiences. Claim Pioneer reflects our vision of building technology that removes friction, eliminates bias, and empowers every stakeholder – from agencies to adjusters to customers. <strong>Our goal is simple: </strong>deliver a claims ecosystem where speed, transparency, and fairness are the norm, not the exception. With Claim Pioneer, we’re enabling the next era of intelligent, scalable claims operations.”
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

            {/* End-to-End Claim Assessment Workflow */}
            <section className="py-20 bg-white">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <header className="text-center mb-12">
                        <h2 className="text-[35px] font-medium leading-[45px] text-[#345196]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            End-to-End Claim Assessment Workflow
                        </h2>
                    </header>
                    <div className="flex justify-center border border-gray-200">
                        <Image src="/images/products/Artboard-1@2x-scaled-1440x900.png" alt="Workflow" width={1440} height={900} className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* Business Outcomes */}
            <section className="py-20 bg-[#0b1021]">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <header className="text-center mb-[40px]">
                        <h2 className="text-[35px] font-medium leading-[45px] text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Business Outcomes
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

            {/* Transforming Every Step */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8 text-center">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                        <h2 className="text-3xl font-bold text-[#345195] mb-[30px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Transforming Every Step of the Claims Journey
                        </h2>
                        <div className="max-w-[800px] mx-auto text-left">
                            <p className="text-[15px] text-gray-700 leading-[26px] m-0" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Claim Pioneer simplifies the complex world of claims by combining automation, mobility, intelligence, and transparency into one powerful platform. Whether you’re managing everyday claims or responding to catastrophic events, the platform ensures faster outcomes, lower operational costs, and a dramatically better experience for everyone involved.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* CTA Header */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-[1240px] mx-auto px-[15px] text-center">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                        <h2 className="text-[35px] font-bold leading-[45px] text-[#030B3B] uppercase mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Take control of your claims. Digitally.
                        </h2>
                        <div className="max-w-[1000px] mx-auto">
                            <p className="text-[16px] font-normal leading-[26px] text-[#6d6d6d]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Automation, fairness, and speed — all in one system. Claim Pioneer brings automation and real-time visibility to every step of the claim's lifecycle, from intake to closure.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Red Card CTA */}
            <section className="py-20 lg:py-24 bg-white">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <div className="flex justify-center">
                        <motion.div 
                            variants={scrollReveal} 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={viewportOnce}
                            className="w-full max-w-[850px] bg-[#ed3137] p-10 lg:p-16 rounded-[15px] text-center shadow-xl"
                        >
                            <h2 className="text-[30px] md:text-[35px] font-bold text-white uppercase mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Ready to Transform Your Claims Operations?
                            </h2>
                            <p className="text-[17px] font-normal leading-[28px] text-white/90 mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Book a demo today to see how Claim Pioneer can transform your claims journey, automate assignment, and scale operations.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link
                                    href="/contact"
                                    className="bg-white text-[#ed3137] px-[35px] py-[15px] text-[16px] font-bold rounded shadow-lg transition-all hover:bg-gray-100"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    GET STARTED
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-transparent text-white border-2 border-white px-[35px] py-[13px] text-[16px] font-bold rounded transition-colors hover:bg-white hover:text-[#ed3137]"
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
