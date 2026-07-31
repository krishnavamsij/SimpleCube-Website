'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { CONTAINER_CLASS } from '@/lib/container-utils'
import { ArrowRight } from 'lucide-react'

const capabilities = [
    { img: '/images/products/1-Cross-Sell-Pre-Approval-Offers@2xu.png', title: 'Cross-Sell & Pre-Approval Offers', desc: 'Smart pre-qualifications, contextual ancillary products, and targeted lead generation at the right journey step.' },
    { img: '/images/products/2-Dynamic-Application-Intake@2xu.png', title: 'Dynamic Application Intake', desc: 'Adaptive digital journeys for cross-sell, pre-approval, and marketing-driven applications across channels.' },
    { img: '/images/products/3-Omnichannel@2xu.png', title: 'Omni-Channel Engagement', desc: 'Consistent, personalized member communication across SMS, email, and chat for a unified experience.' },
    { img: '/images/products/4-Conversational-Application-Journey_1@2x.png', title: 'Conversational Application Journey', desc: 'Customers can start and continue their loan application journey across digital, branch, phone, and partner channels.' },
    { img: '/images/products/5BusinessProcess-Agility@2xu.png', title: 'Business Process Agility', desc: 'Pre-built, configurable workflows assembled from modular processes to accelerate business transformation.' },
    { img: '/images/products/6Underwriting-Integration_Enablement@2xu.png', title: 'Core Systems Integration Enablement', desc: 'Salesforce-native framework enabling connectivity across core banking, underwriting, and third-party systems.' },
    { img: '/images/products/7Connected-Ecosystem-Integration@2xu.png', title: 'Connected Ecosystem Integration', desc: 'Unified data connectivity across core banking, fintech platforms, and partner ecosystems through secure APIs.' },
    { img: '/images/products/8-Intelligent-Document-Management@2x-1.png', title: 'Intelligent Document Processor (IDP)', desc: 'Automatically extracts data, executes business rules, and clears documents with minimal manual review.' },
]

const scrollReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const viewportOnce = { once: true, amount: 0.2 };

const values = [
    { img: '/images/products/1.-Higher@2x-scaled.png', title: 'Higher Conversion Rates', desc: 'Deliver guided, pre-filled applications and instant loan offers that turn interest into action — driving faster approvals and higher conversion.' },
    { img: '/images/products/2.-frictionless@2x-scaled.png', title: 'Frictionless Digital Journeys', desc: 'Enable seamless, transparent member journeys that allow real-time re-entry, progress tracking, and cross-channel continuity.' },
    { img: '/images/products/3.-Stronger@2x-scaled.png', title: 'Stronger Trust & Retention', desc: 'Build member loyalty through secure, consistent, and hyper-personalized experiences across every channel and product line.' },
    { img: '/images/products/4.-faster-closure@2x-scaled.png', title: 'Rapid Application Closures', desc: 'Empower underwriters with AI-driven tracking and smart queues — boosting efficiency by up to 40% and accelerating loan decisions.' },
    { img: '/images/products/5.-Accelerated-Rollouts@2x-scaled.png', title: 'Faster Product Launches', desc: 'Launch new lending and banking products up to 80% faster using prebuilt workflows, reusable assets, and configurable components.' },
    { img: '/images/products/6.-Optimized-Cost-of-Ownership@2x-scaled.png', title: 'Optimized Cost of Ownership', desc: 'Consolidate vendors and infrastructure with one Salesforce-native platform — cutting operational complexity and total cost of ownership by 40%.' },
]

const caseStudies = [
    {
        img: '/images/products/Blog-Post-Loan-Agentforce-800x540.png',
        title: 'Reimagining Loan Applications with Voice and Chat',
        desc: 'How FinXserve and Salesforce Agentforce are Transforming the Lending Experience.',
        link: '/insights/case-studies/autonomous-lending-experiences'
    },
    {
        img: '/images/products/Agentforce-Powered-Document-Intelligence-for-Instant-Loan-Processing.jpg',
        title: 'AI Loan Processing',
        desc: 'Hyniva embedded Agentforce-powered document intelligence into FinXServe to automate verification and enable near-instant digital loan approvals.',
        link: '/insights/case-studies/instant-loan-processing'
    },
    {
        img: '/images/products/Credit-Union-CX-e1771481017710.png',
        title: 'Credit Union CX',
        desc: 'Lending transformed with FinXForce, unifying digital channels & reducing loan offer times to under 60 seconds—boosting ROI, engagement, & member satisfaction.',
        link: '/insights/case-studies/member-experience-transformation-at-a-leading-credit-union'
    }
]

const heroSlides = [
    {
        image: '/images/products/Third-largestCreditUnion.png',
        text: 'Large mutual fund company achieved better ROI<br/>using Our Salesforce accelerators',
        width: 480,
        height: 530,
        dot: '/images/products/first-1.png'
    },
    {
        image: '/images/products/LargeMutualFund.png',
        text: 'Third-largest credit union leveraged our Salesforce<br/>expertise to achieve digital transformation goals',
        width: 480,
        height: 530,
        dot: '/images/products/second-1.png'
    }
]

export default function FinxservePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const NAVBAR_HEIGHT = 120; // 120px for main navbar only

        const handleScroll = () => {
            const sections = ['intro', 'capabilities', 'ceo', 'enterprise', 'customer'];
            const scrollPosition = window.scrollY + NAVBAR_HEIGHT + 1;

            // Walk sections in reverse so the last matching one wins
            // (handles edge case at very bottom of page)
            let found = '';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && scrollPosition >= element.offsetTop) {
                    found = section;
                }
            }
            setActiveSection(found);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // run once on mount to set initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="relative pt-[110px] pb-16 bg-[#030b49] overflow-hidden">
                <div className={CONTAINER_CLASS}>
                    <div className="flex flex-col md:flex-row items-center min-h-[400px] gap-12">
                        <div className="w-full md:w-1/2 z-10 relative text-center md:text-left">
                            <Image
                                src="/images/products/Artboard-15@2x-scaled.png"
                                alt="FinXServe Logo"
                                width={231}
                                height={97}
                                className="mb-8 mx-auto md:ml-0"
                            />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-white mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Frictionless Consumer<br />
                                Lending Experience.<br />
                                Native to Salesforce.
                            </h1>
                            <p className="text-base sm:text-lg font-normal leading-relaxed text-white/90 mb-10 max-w-[500px] mx-auto md:mx-0" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Designed for lenders who believe experience closes more loans than systems.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-block bg-[#f9f9f9] text-[#020202] px-8 py-4 text-sm font-semibold rounded-lg transition-all hover:bg-transparent hover:text-white border-2 border-white text-center"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    Book a Demo
                                </Link>
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-block bg-transparent text-white px-8 py-4 text-sm font-semibold rounded-lg transition-all hover:bg-white/10 border-2 border-white text-center"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    See How It Works
                                </Link>
                            </div>
                        </div>
                        {/* Background slider content right side */}
                        <div className="relative z-0 mt-2 h-[350px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:h-[370px] md:absolute md:right-0 md:top-[12%] md:mt-0 md:h-[76%] md:w-[52%] md:rounded-none md:border-0 md:bg-transparent">
                            <div className="relative w-full h-full flex items-center justify-center">
                                {heroSlides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    >
                                        <div className="flex h-full w-full flex-col items-center justify-center px-3 py-5 sm:px-4 md:pt-2 md:pb-4">
                                            <Image
                                                src={slide.image}
                                                alt={`Slide ${index + 1}`}
                                                width={slide.width}
                                                height={slide.height}
                                                className="h-auto max-h-[190px] w-[280px] max-w-full object-contain sm:max-h-[220px] sm:w-[330px] md:max-h-[300px] md:w-[430px] lg:max-h-[360px] lg:w-[540px]"
                                            />
                                            <div className="mt-3 w-full max-w-[500px] text-center md:mt-6">
                                                <p
                                                    className="text-[13px] sm:text-[16px] md:text-[19px] font-medium leading-[1.45] sm:leading-[1.55] md:leading-[1.75] tracking-tight text-white/95 mb-3 md:mb-4"
                                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                                    dangerouslySetInnerHTML={{ __html: slide.text }}
                                                />
                                                <Image
                                                    src={slide.dot}
                                                    alt="Slide indicator"
                                                    width={32}
                                                    height={13}
                                                    className="mx-auto"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="intro" className="py-[30px] sm:py-[40px] lg:py-[50px] bg-white">
                <div className={CONTAINER_CLASS}>

                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex flex-col md:flex-row items-center gap-12"
                    >
                        <div className="w-full md:w-1/2 text-left">
                            <header className="mb-6">
                                <h2
                                    className="text-[32px] sm:text-[40px] font-bold leading-[1.3]"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        color: '#345195'
                                    }}
                                >
                                    FinXServe — Powering The Future Of Digital Banking Experience
                                </h2>
                            </header>
                            <p className="text-base sm:text-lg font-normal leading-relaxed text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                FinXServe is a Salesforce-native digital banking experience platform that enables financial institutions to modernize without replacing their core systems, unifying lending, deposits, and member engagement through a single intelligent experience layer.
                            </p>
                            <p className="text-base sm:text-lg font-normal leading-relaxed text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                FinXServe’s vision is to deliver deeply personalized member experiences that fuel responsible growth, strengthen compliance and trust, and accelerate innovation at lower operational cost on a trusted, scalable platform. Built by banking experts with over two decades of transformation experience, FinXServe helps institutions turn digital experiences into seamless connected journey — without disruption.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 flex items-center justify-center">
                            <div className="border border-gray-100 shadow-xl p-1 rounded-lg overflow-hidden">
                                <Image src="/images/products/Artboard-1@2x-1.png" alt="FinXServe Intro" width={600} height={400} className="w-full h-auto" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="capabilities" className="bg-[#030B49] py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden">
                <div className={`${CONTAINER_CLASS} flex flex-col lg:flex-row gap-[60px]`} >
                    {/* LEFT FIXED CONTENT */}
                    <div className="lg:w-[32%] lg:sticky lg:top-[90px] self-start z-10 text-center lg:text-left -mt-3 lg:-mt-5">
                        <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-black text-white mb-6 leading-tight">
                            Capabilities That Drive Growth
                        </h2>
                        <p className="text-left text-[15px] sm:text-[16px] leading-[1.6] text-slate-300 max-w-sm">
                            Driving faster launches, lower costs, and frictionless journeys across every channel. Built by banking experts.
                        </p>
                    </div>
 
                    {/* RIGHT GRID (Scrollable) */}
                    <div className="lg:w-[68%] lg:max-h-[660px] lg:overflow-y-auto pr-[10px] pt-[20px] custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-[30px] items-stretch">
                        {capabilities.map((cap, idx) => (
                            <div
                                key={idx}
                                className="group relative rounded-[18px] flex flex-col pt-[30px] px-[30px] pb-[20px] transition-all duration-300"
                                style={{
                                    background: 'linear-gradient(#030B49) padding-box, linear-gradient(320deg, rgba(94, 181, 70, 0.52), rgba(87, 136, 73, 0.53), rgba(41, 79, 31, 0.56)) border-box',
                                    border: '1px solid transparent'
                                }}
                            >
                                {/* Title */}
                                <h3 className="text-[17px] sm:text-[18px] leading-snug text-white font-bold mb-[12px] relative z-10">{cap.title}</h3>

                                {/* Description */}
                                <p className="text-[15px] sm:text-base font-medium leading-[1.7] text-slate-300 mb-[20px] relative z-10">{cap.desc}</p>

                                {/* Image — sits directly below description */}
                                <div className="relative z-10 rounded-[10px] overflow-hidden">
                                    <Image
                                        src={cap.img}
                                        alt={cap.title}
                                        width={400}
                                        height={220}
                                        className="w-full h-auto rounded-[10px] opacity-80 transition-transform duration-500 group-hover:-translate-y-2 object-cover"
                                    />
                                </div>

                                {/* Hover Effect Gradient Overlay */}
                                <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(#030B49) padding-box, linear-gradient(320deg, #5EB546, #578849, #294F1F) border-box', border: '1px solid transparent' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                                    “We envision a future where every Credit Union leads with intelligence
                                    and empathy — where technology doesn’t complicate, but connects.
                                    FinXServe was built to unify digital banking journeys on Salesforce,
                                    transforming complexity into clarity and every interaction into a
                                    personalized experience. This is how modern finance grows —
                                    seamlessly, securely, and sustainably.”
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

            <section id="enterprise" className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#030B3B]">
                <div className={CONTAINER_CLASS}>
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <header className="mb-10 text-center md:text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Tangible Business Value
                            </h2>
                            <p className="text-base sm:text-lg font-normal leading-relaxed text-white/80" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                FinXServe transforms results at every stage of the member and lender journey
                            </p>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px] pt-[24px] pb-[2px]">
                            {values.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group rounded-[18px] p-[30px] text-left transition-all duration-300 transform hover:-translate-y-[8px] relative flex flex-col"
                                    style={{
                                        background: 'linear-gradient(#030B49) padding-box, linear-gradient(320deg, rgba(94, 181, 70, 0.52), rgba(87, 136, 73, 0.53), rgba(41, 79, 31, 0.56)) border-box',
                                        border: '1px solid transparent'
                                    }}
                                >
                                    {/* Hover border overlay */}
                                    <div
                                        className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(#030B49) padding-box, linear-gradient(320deg, #5EB546, #578849, #294F1F) border-box',
                                            border: '1px solid transparent'
                                        }}
                                    />

                                    {/* Image — centered, large, like the reference */}
                                    <div className="relative z-10 w-full flex items-center justify-center mb-[28px] min-h-[180px]">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            width={220}
                                            height={180}
                                            className="object-contain max-h-[180px] w-auto"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-[18px] font-bold text-white mb-[10px] relative z-10"
                                        style={{ fontFamily: 'Roboto, sans-serif' }}
                                    >
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="text-[15px] leading-[1.6] text-[#c7c7c7] relative z-10"
                                        style={{ fontFamily: 'Roboto, sans-serif' }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-white">
                <div className={CONTAINER_CLASS}>
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="w-full md:w-1/2">
                                <div className="border border-gray-100 shadow-xl p-1 rounded-lg overflow-hidden">
                                    <Image src="/images/products/twodecades.png" alt="Two Decades" width={600} height={400} className="w-full h-auto" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 text-left">
                                <header className="mb-6">
                                    <h2
                                        className="text-2xl sm:text-3xl font-bold leading-[1.3] mb-6"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            color: '#345195'
                                        }}
                                    >
                                        Two Decades of Financial &
                                        <br />
                                        Salesforce Expertise
                                    </h2>
                                    <p className="text-base sm:text-lg font-normal leading-relaxed text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        FinXServe was born from Hyniva’s deep legacy in building banking platforms and transforming Credit Unions and Banks on Salesforce. With proven cross-cloud expertise — Financial Services, Experience, Data, Marketing, and Loyalty Clouds — our certified teams architect secure, scalable, and compliant Salesforce ecosystems that power FinXServe’s speed, intelligence, and reliability.
                                    </p>
                                </header>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 lg:py-24 bg-[#f8fafc]">
                <div className={CONTAINER_CLASS}>
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <header className="mb-14 lg:mb-16">
                            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-[900] text-[#030B3B] font-display uppercase tracking-wider mb-3">
                                CASE STUDIES
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
                                Real-world implementations demonstrating how we help enterprises evolve through comprehensive digital and cloud transformation.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {caseStudies.map((cs, idx) => (
                                <div
                                    key={idx}
                                    className="group flex flex-col rounded-[28px] bg-[#EEF5FF] border border-blue-100/60 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl relative h-full justify-between"
                                >
                                    {/* Card Image */}
                                    <div className="aspect-[1.75/1] overflow-hidden relative rounded-[20px] bg-white mb-5 shadow-xs">
                                        <Image
                                            src={cs.img}
                                            alt={cs.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="px-2 pb-1 flex flex-col flex-1 relative z-10">
                                        <h3
                                            className="font-display text-[17px] sm:text-[18px] font-bold text-[#030B3B] leading-[1.35] tracking-tight mb-3 line-clamp-2 min-h-[2.7em]"
                                            dangerouslySetInnerHTML={{ __html: cs.title }}
                                        />

                                        <p className="text-[12.5px] font-normal text-slate-500 leading-relaxed mb-6 flex-1 line-clamp-2 min-h-[3.2em]">
                                            {cs.desc}
                                        </p>

                                        <Link
                                            href={cs.link}
                                            className="flex items-center justify-between w-full py-3.5 px-5 bg-white text-[#2563EB] border border-blue-200/70 rounded-xl text-[13px] font-bold shadow-xs transition-all duration-300 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white mt-auto"
                                        >
                                            Read Case Study
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="customer" className="py-[30px] sm:py-[40px] lg:py-[50px] bg-white">
                <div className={CONTAINER_CLASS}>
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex flex-col md:flex-row items-center gap-12"
                    >
                        <div className="w-full md:w-1/2">
                            <div className="shadow-2xl border border-gray-100 p-1 rounded-xl overflow-hidden">
                                <Image
                                    src="/images/products/fin_con.jpg"
                                    alt="FinXServe Reimagined"
                                    width={800}
                                    height={500}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 text-left">
                            <header className="mb-10">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight text-[#222222] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    We didn’t just remove friction from lending — we reimagined how people experience banking.
                                </h2>
                                <p className="text-lg sm:text-xl font-medium leading-relaxed text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    Ready to redefine your digital banking journey?
                                </p>
                            </header>
                            <div className="flex justify-center md:justify-start">
                                <Link
                                    href="/contact"
                                    className="inline-block bg-[#345195] text-white px-10 py-4 text-base font-semibold rounded-lg shadow-lg transition-all hover:bg-[#283d71] hover:-translate-y-1"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #24ff8f;
                    border-radius: 20px;
                }
            `}} />

            <Footer />
        </main>
    )
}

