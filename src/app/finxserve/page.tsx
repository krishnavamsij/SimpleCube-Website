'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Faq } from '@/components/faq'
import { finxserveFaqs } from '@/content/product-faqs'
import { caseStudiesContent } from '@/content/case-studies'
import { AnimatePresence, motion } from 'framer-motion'
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

const finxserveCaseStudySlugs = [
    'autonomous-lending-experiences',
    'instant-loan-processing',
    'member-experience-transformation-at-a-leading-credit-union',
]

const caseStudies = finxserveCaseStudySlugs
    .map(slug => caseStudiesContent.studies.find(study => study.href.includes(slug)))
    .filter((study): study is NonNullable<typeof study> => Boolean(study))

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
    const [expandedCardTags, setExpandedCardTags] = useState<string | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target;
            if (!(target instanceof Element) || !target.closest("[data-tag-overflow]")) {
                setExpandedCardTags(null);
            }
        }
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setExpandedCardTags(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch w-full relative min-h-[400px]">
                        <div className="w-full z-10 relative text-center md:text-left flex flex-col justify-between">
                            <div>
                                <Image
                                    src="/images/products/Artboard-15@2x-scaled.png"
                                    alt="FinXServe Logo"
                                    width={231}
                                    height={97}
                                    className="mb-8 mx-auto md:ml-0"
                                />
                                <h1 className="text-2xl sm:text-[26px] md:text-[24px] lg:text-[42px] xl:text-[46px] 2xl:text-[50px] font-bold leading-[1.2] text-white mb-6 tracking-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    Frictionless Consumer<br />
                                    Lending Experience.<br />
                                    Native to Salesforce.
                                </h1>
                                <p className="text-base sm:text-lg lg:text-[18px] 2xl:text-[19px] font-normal leading-[1.6] text-white/90 mb-8 max-w-[520px] md:max-w-[460px] lg:max-w-[480px] mx-auto md:mx-0" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    Designed for lenders who believe experience closes more loans than systems.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center bg-[#f9f9f9] text-[#020202] px-8 py-3.5 text-sm sm:text-base font-bold rounded-lg transition-all hover:bg-transparent hover:text-white border-2 border-white text-center"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    Book a Demo
                                </Link>
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent text-white px-8 py-3.5 text-sm sm:text-base font-bold rounded-lg transition-all hover:bg-white/10 border-2 border-white text-center"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    See How It Works
                                </Link>
                            </div>
                        </div>
                        {/* Background slider content right side */}
                        <div className="relative z-0 mt-2 h-[380px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:h-[400px] md:mt-0 md:h-full md:rounded-none md:border-0 md:bg-transparent flex flex-col md:overflow-visible">
                            <div className="relative w-full h-full">
                                {heroSlides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 flex flex-col transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    >
                                        <div className="flex h-full w-full flex-col justify-between px-3 py-2 sm:px-4 md:py-2">
                                            <div className="flex-1 flex items-center justify-center md:items-start md:pt-4">
                                                <Image
                                                    src={slide.image}
                                                    alt={`Slide ${index + 1}`}
                                                    width={slide.width}
                                                    height={slide.height}
                                                    className="h-auto max-h-[180px] w-[260px] max-w-full object-contain sm:max-h-[210px] sm:w-[320px] md:max-h-[270px] md:w-[410px] lg:max-h-[320px] lg:w-[500px]"
                                                />
                                            </div>
                                            <div className="mt-2 w-full max-w-[500px] text-center md:mt-3 mx-auto">
                                                {/* Interactive Two Dots Indicator above text content */}
                                                <div className="flex items-center justify-center gap-2 mb-3">
                                                    {heroSlides.map((_, dotIdx) => (
                                                        <button
                                                            key={dotIdx}
                                                            onClick={() => setCurrentSlide(dotIdx)}
                                                            aria-label={`Go to slide ${dotIdx + 1}`}
                                                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                                                                currentSlide === dotIdx 
                                                                    ? "w-7 h-2.5 bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                                                                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p
                                                    className="text-[13px] sm:text-[15px] md:text-[18px] font-medium leading-[1.45] sm:leading-[1.5] md:leading-[1.65] tracking-tight text-white/95"
                                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                                    dangerouslySetInnerHTML={{ __html: slide.text }}
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
                                    className="text-[32px] sm:text-[40px] font-bold leading-[1.3] tracking-tight font-display"
                                    style={{
                                        color: '#345195'
                                    }}
                                >
                                    FinXServe — Powering The Future Of Digital Banking Experience
                                </h2>
                            </header>
                            <p className="text-base sm:text-lg font-medium leading-relaxed text-[#666666] mb-6">
                                FinXServe is a Salesforce-native digital banking experience platform that enables financial institutions to modernize without replacing their core systems, unifying lending, deposits, and member engagement through a single intelligent experience layer.
                            </p>
                            <p className="text-base sm:text-lg font-medium leading-relaxed text-[#666666]">
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
                                    background: 'linear-gradient(#030B49, #030B49) padding-box, linear-gradient(320deg, rgba(94, 181, 70, 0.52), rgba(87, 136, 73, 0.53), rgba(41, 79, 31, 0.56)) border-box',
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
                                <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(#030B49, #030B49) padding-box, linear-gradient(320deg, #5EB546, #578849, #294F1F) border-box', border: '1px solid transparent' }}></div>
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
                                        “We envision a future where every Credit Union leads with intelligence
                                        and empathy — where technology doesn’t complicate, but connects.
                                        FinXServe was built to unify digital banking journeys on Salesforce,
                                        transforming complexity into clarity and every interaction into a
                                        personalized experience. This is how modern finance grows —
                                        seamlessly, securely, and sustainably.”
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
                            <p className="text-lg sm:text-xl font-normal leading-relaxed text-white/80" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
                                        className="text-[32px] sm:text-[40px] font-bold leading-[1.3] mb-6 tracking-tight font-display"
                                        style={{
                                            color: '#345195'
                                        }}
                                    >
                                        Two Decades of Financial &
                                        <br />
                                        Salesforce Expertise
                                    </h2>
                                    <p className="text-base sm:text-lg font-medium leading-relaxed text-[#666666]">
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {caseStudies.map((study, idx) => {
                                const cardKey = `${study.href}-${idx}`;
                                return (
                                    <div
                                        key={cardKey}
                                        className="group flex flex-col rounded-[32px] bg-white border border-[#030B3B]/10 overflow-visible transition-all duration-500 hover:-translate-y-2 hover:z-20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative h-full justify-between"
                                    >
                                        {/* Card Image */}
                                        <div className="aspect-[1.8/1] overflow-hidden relative m-2.5 sm:m-3 rounded-[20px] sm:rounded-[24px]">
                                            <div
                                                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                                style={{ backgroundImage: `url('${study.image}')` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-40" />
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-5 sm:p-8 pt-3 sm:pt-4 flex flex-col flex-1 relative z-10">
                                            {/* Tags */}
                                            <div className="min-h-[34px] sm:min-h-[38px] flex-shrink-0 mb-3 sm:mb-4 flex items-center">
                                                {study.tags && study.tags.length > 0 && (
                                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                                        {study.tags.slice(0, 2).map((tag, tagIdx) => (
                                                            <span
                                                                key={tagIdx}
                                                                className="px-2.5 sm:px-3 py-1 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 rounded-full"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {study.tags.length > 2 && (
                                                            <div
                                                                className="relative inline-flex"
                                                                data-tag-overflow
                                                                onMouseEnter={() => setExpandedCardTags(cardKey)}
                                                                onMouseLeave={() => setExpandedCardTags((current) => current === cardKey ? null : current)}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    aria-label={`Show ${study.tags.length - 2} more tags`}
                                                                    aria-expanded={expandedCardTags === cardKey}
                                                                    onClick={() => setExpandedCardTags(expandedCardTags === cardKey ? null : cardKey)}
                                                                    className="px-2.5 sm:px-3 py-1 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 rounded-full cursor-pointer transition-all duration-200 hover:bg-[#1e90ff]/15 hover:border-[#1e90ff]/30 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/25"
                                                                >
                                                                    +{study.tags.length - 2}
                                                                </button>
                                                                {/* Popup */}
                                                                <AnimatePresence>
                                                                    {expandedCardTags === cardKey && (
                                                                        <motion.div
                                                                            initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                            exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                                                            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                                                            className="absolute bottom-full left-1/2 -translate-x-1/2 z-50 mb-2 w-auto max-w-[280px] p-1"
                                                                        >
                                                                            <div className="absolute left-1/2 -translate-x-1/2 top-full h-2 w-full" />
                                                                            <div className="relative flex flex-col gap-1.5 items-center">
                                                                                {study.tags.slice(2).map((tag, tagIdx) => (
                                                                                    <span
                                                                                        key={tagIdx}
                                                                                        className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-white border border-[#1e90ff]/20 rounded-full shadow-[0_8px_20px_rgba(15,23,42,0.10)]"
                                                                                    >
                                                                                        {tag}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Title Wrapper */}
                                            <div className="mb-2.5 sm:mb-3 flex items-start">
                                                <h3
                                                    className="font-display text-[16px] sm:text-[18.5px] font-bold text-[#030B3B] leading-[1.35] tracking-tight"
                                                    dangerouslySetInnerHTML={{ __html: study.title }}
                                                />
                                            </div>

                                            {/* Callout Content */}
                                            <p className="text-[13.5px] sm:text-[14px] font-normal text-slate-600 leading-[1.65] mb-5 sm:mb-6 flex-1">
                                                {study.description}
                                            </p>

                                            {/* CTA Button */}
                                            <Link
                                                href={study.href}
                                                className="flex items-center justify-between w-full py-3.5 sm:py-4 px-5 sm:px-6 bg-white border border-[#1e90ff]/20 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(30,144,255,0.3)] mt-auto"
                                            >
                                                Read Case Study
                                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
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

            <Faq items={finxserveFaqs} />

            <Footer />
        </main>
    )
}

