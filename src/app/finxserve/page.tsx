'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'

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
        width: 220,
        height: 250,
        dot: '/images/products/first-1.png'
    },
    {
        image: '/images/products/LargeMutualFund.png',
        text: 'Third-largest credit union leveraged our Salesforce<br/>expertise to achieve digital transformation goals',
        width: 220,
        height: 250,
        dot: '/images/products/second-1.png'
    }
]

export default function FinxservePage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="min-h-screen bg-white" style={{ scrollPaddingTop: '120px' }}>
            <Navbar />

            {/* Hero Banner Section */}
            <section className="relative pt-[120px] pb-16 bg-[#030b49]">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <div className="flex flex-wrap -mx-[15px] items-center min-h-[400px]">
                        <div className="w-full md:w-1/2 px-[15px] z-10 relative">
                            <Image 
                                src="/images/products/Artboard-15@2x-scaled.png"
                                alt="Artboard 15"
                                width={231}
                                height={97}
                                className="mb-6"
                            />
                            <h2 className="text-[40px] font-medium leading-[46px] text-white mb-[15px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Frictionless Consumer<br/>
                                Lending Experience.<br/>
                                Native to Salesforce.
                            </h2>
                            <h6 className="text-[14px] font-normal leading-[21px] text-white mb-[30px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Designed for lenders who believe experience closes more loans than systems.
                            </h6>
                            <div className="flex flex-wrap items-center gap-[20px]">
                                <Link
                                    href="/contact"
                                    className="inline-block bg-[#f9f9f9] text-[#020202] px-[19px] py-[12px] text-[12px] font-medium leading-[29px] border-[3px] border-white rounded-[6px] transition-colors hover:bg-transparent hover:text-white"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    Book a Demo
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-block bg-transparent text-white px-[19px] py-[12px] text-[12px] font-medium leading-[29px] border-[3px] border-white rounded-[6px] transition-colors hover:bg-white/10"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                    See How It Work
                                </Link>
                            </div>
                        </div>
                        {/* Background slider content right side */}
                        <div className="hidden md:block absolute right-0 top-[15%] w-[45%] h-[80%] z-0 overflow-hidden">
                            <div className="relative w-full h-full flex items-center justify-center">
                                {heroSlides.map((slide, index) => (
                                    <div 
                                        key={index} 
                                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    >
                                        <Image 
                                            src={slide.image} 
                                            alt={`Slide ${index + 1}`} 
                                            width={slide.width} 
                                            height={slide.height} 
                                            className="absolute top-[20px] mt-8 object-contain" 
                                            style={{ maxHeight: '70%' }}
                                        />
                                        <div className="absolute bottom-[20%] text-center px-4 w-full flex flex-col items-center">
                                            <p 
                                                className="text-[14px] font-normal leading-[21px] text-white mb-4" 
                                                style={{ fontFamily: 'Roboto, sans-serif' }}
                                                dangerouslySetInnerHTML={{ __html: slide.text }}
                                            />
                                            <Image 
                                                src={slide.dot} 
                                                alt="Slide indicator" 
                                                width={32} 
                                                height={13} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section id="intro" className="py-20 bg-white">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <motion.div 
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex flex-wrap -mx-[15px]"
                    >
                        <div className="w-full md:w-1/2 px-[15px]">
                            <header className="mb-[20px]">
                                <h2 className="text-[35px] font-medium leading-[45px] text-[#222222]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    FinXServe — Powering the Future of Digital Banking Experience
                                </h2>
                            </header>
                            <p className="text-[15px] font-normal leading-[25px] text-[#666666] mb-[20px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                FinXServe is a Salesforce-native digital banking experience platform that enables financial institutions to modernize without replacing their core systems, unifying lending, deposits, and member engagement through a single intelligent experience layer.
                            </p>
                            <p className="text-[15px] font-normal leading-[25px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                FinXServe’s vision is to deliver deeply personalized member experiences that fuel responsible growth, strengthen compliance and trust, and accelerate innovation at lower operational cost on a trusted, scalable platform. Built by banking experts with over two decades of transformation experience, FinXServe helps institutions turn digital experiences into seamless connected journey — without disruption.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 px-[15px] flex items-center justify-center mt-10 md:mt-0">
                            <div className="border border-gray-200 shadow-sm p-1">
                                <Image src="/images/products/Artboard-1@2x-1.png" alt="FinXServe Intro" width={600} height={400} className="w-full h-auto" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Capabilities (Dark Wrapper Grid) */}
            <section id="capabilities" className="bg-[#030B49] py-[85px] overflow-hidden">
                <div className="max-w-[1500px] mx-auto px-4 lg:px-[60px] flex flex-col lg:flex-row gap-[60px]">
                    {/* LEFT FIXED CONTENT */}
                    <div className="lg:w-[32%] lg:sticky lg:top-[120px] self-start z-10">
                        <h2 className="text-[48px] font-bold text-white mb-[25px] leading-[1.2]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Capabilities That<br/>Drive Growth
                        </h2>
                        <p className="text-[18px] leading-[1.7] text-[#cfd5e2]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Driving faster launches, lower costs, and frictionless journeys across every
                            channel. Built by banking experts.
                        </p>
                    </div>

                    {/* RIGHT GRID (Scrollable) */}
                    <div className="lg:w-[68%] lg:max-h-[660px] lg:overflow-y-auto pr-[10px] pt-[20px] custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                        {capabilities.map((cap, idx) => (
                            <div 
                                key={idx} 
                                className="group relative rounded-[18px] p-[30px] min-h-[420px] transition-all duration-300" 
                                style={{ 
                                    background: 'linear-gradient(#030B49) padding-box, linear-gradient(320deg, rgba(94, 181, 70, 0.52), rgba(87, 136, 73, 0.53), rgba(41, 79, 31, 0.56)) border-box', 
                                    border: '1px solid transparent' 
                                }}
                            >
                                <h3 className="text-[18px] text-white font-bold mb-[12px] relative z-10" style={{ fontFamily: 'Roboto, sans-serif' }}>{cap.title}</h3>
                                <p className="text-[16px] leading-[1.6] text-[#cfd5e2] mb-[20px] relative z-10" style={{ fontFamily: 'Roboto, sans-serif' }}>{cap.desc}</p>
                                
                                <div className="mt-auto relative z-10 overflow-hidden rounded-[10px]">
                                    <Image 
                                        src={cap.img} 
                                        alt={cap.title} 
                                        width={400} 
                                        height={250} 
                                        className="w-full h-auto rounded-[10px] opacity-80 transition-transform duration-500 group-hover:-translate-y-3" 
                                    />
                                </div>

                                {/* Hover Effect Gradient Overlay */}
                                <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(#030B49) padding-box, linear-gradient(320deg, #5EB546, #578849, #294F1F) border-box', border: '1px solid transparent' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CEO Vision */}
            <section id="ceo" className="py-20 bg-[#f9f9f9]">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
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
                                    “We envision a future where every Credit Union leads with intelligence and empathy — where technology doesn’t complicate, but connects. FinXServe was built to unify digital banking journeys on Salesforce, transforming complexity into clarity and every interaction into a personalized experience. This is how modern finance grows — seamlessly, securely, and sustainably.”
                                </p>
                                <h6 className="text-[16px] font-normal leading-[26px] text-[#222222]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    <strong>Sreeram Jadapolu,</strong><br/>
                                    <strong>Founder & CEO, Hyniva</strong>
                                </h6>
                            </div>
                            <div className="hidden md:block md:w-1/6 px-[15px]"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tangible Business Value */}
            <section id="enterprise" className="py-20 bg-[#0b1021]">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <header className="mb-[40px]">
                            <h2 className="text-[35px] font-medium leading-[45px] text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Tangible Business Value
                            </h2>
                            <h6 className="text-[15px] font-medium leading-[25px] text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                FinXServe transforms results at every stage of the member and lender journey
                            </h6>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px] pt-[24px] pb-[2px]">
                            {values.map((item, idx) => (
                                <div key={idx} className="group rounded-[18px] p-[30px] text-left transition-all duration-350 transform hover:-translate-y-[8px] relative" style={{ background: 'linear-gradient(#030B49) padding-box, linear-gradient(320deg, rgba(94, 181, 70, 0.52), rgba(87, 136, 73, 0.53), rgba(41, 79, 31, 0.56)) border-box', border: '1px solid transparent' }}>
                                    <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(#030B49) padding-box, linear-gradient(320deg, #5EB546, #578849, #294F1F) border-box', border: '1px solid transparent' }}></div>
                                    <div className="mb-[20px] relative z-10 w-[90px]">
                                        <Image src={item.img} alt={item.title} width={90} height={90} className="w-full h-auto" />
                                    </div>
                                    <h3 className="text-[20px] font-bold text-white mb-[10px] relative z-10" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.title}</h3>
                                    <p className="text-[15px] leading-[1.6] text-[#c7c7c7] relative z-10" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Two Decades */}
            <section className="py-20 bg-white">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <motion.div 
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex flex-wrap -mx-[15px] items-center"
                    >
                        <div className="w-full md:w-1/2 px-[15px] mb-8 md:mb-0">
                            <div className="border border-gray-200 shadow-sm p-1">
                                <Image src="/images/products/twodecades.png" alt="Two Decades" width={600} height={400} className="w-full h-auto" />
                            </div>
                        </div>
                        <div className="w-full md:w-5/12 md:offset-1/12 px-[15px]">
                            <header className="mb-[20px]">
                                <h2 className="text-[35px] font-medium leading-[45px] text-[#222222] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    Two Decades of Financial & Salesforce Expertise
                                </h2>
                                <h6 className="text-[15px] font-medium leading-[25px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    FinXServe was born from Hyniva’s deep legacy in building banking platforms and transforming Credit Unions and Banks on Salesforce. With proven cross-cloud expertise — Financial Services, Experience, Data, Marketing, and Loyalty Clouds — our certified teams architect secure, scalable, and compliant Salesforce ecosystems that power FinXServe’s speed, intelligence, and reliability.
                                </h6>
                            </header>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="py-20 bg-[#f9f9f9]">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <header className="mb-[40px]">
                            <h2 className="text-[35px] font-medium leading-[45px] text-[#345195]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Case Studies
                            </h2>
                        </header>
                        <div className="flex flex-wrap -mx-[15px]">
                            {caseStudies.map((cs, idx) => (
                                <div key={idx} className="w-full md:w-1/3 px-[15px] mb-[30px]">
                                    <div className="bg-white h-full shadow flex flex-col">
                                        <div className="relative">
                                            <Link href={cs.link}>
                                                <Image src={cs.img} alt={cs.title} width={400} height={250} className="w-full h-auto object-cover" />
                                            </Link>
                                        </div>
                                        <div className="p-[30px] flex flex-col flex-grow">
                                            <h5 className="text-[20px] font-medium leading-[30px] text-[#222222] mb-[10px]" style={{ fontFamily: 'Roboto, sans-serif' }}>{cs.title}</h5>
                                            <p className="text-[15px] font-normal leading-[25px] text-[#666666] mb-[20px] flex-grow" style={{ fontFamily: 'Roboto, sans-serif' }}>{cs.desc}</p>
                                            <div className="mt-auto">
                                                <Link href={cs.link} className="inline-block bg-[#00529b] text-white px-[20px] py-[10px] text-[14px] font-medium rounded transition-colors hover:bg-[#004080]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final Section (Reimagined Banking) */}
            <section id="customer" className="py-20 bg-white">
                <div className="max-w-[1240px] mx-auto px-[15px]">
                    <motion.div 
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex flex-wrap -mx-[15px] items-center"
                    >
                        <div className="w-full md:w-1/2 px-[15px] mb-10 md:mb-0">
                            <div className="shadow-lg border border-gray-100 p-1">
                                <Image 
                                    src="/images/products/fin_con.jpg" 
                                    alt="FinXServe Reimagined" 
                                    width={800} 
                                    height={500} 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-[15px]">
                            <div className="md:pl-10">
                                <header className="mb-[40px]">
                                    <h2 className="text-[35px] font-medium leading-[45px] text-[#222222] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        We didn’t just remove friction from lending — we reimagined how people experience banking.
                                    </h2>
                                    <h6 className="text-[18px] font-medium leading-[28px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        Ready to redefine your digital banking journey?
                                    </h6>
                                </header>
                                <div className="flex">
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-[#345195] text-white px-[35px] py-[15px] text-[15px] font-medium rounded transition-colors hover:bg-[#283d71]"
                                        style={{ fontFamily: 'Roboto, sans-serif' }}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{__html: `
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

