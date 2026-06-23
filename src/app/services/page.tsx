/**
 * SERVICES PAGE
 *
 * Hero banner (same dark-blue style as home/about) followed by
 * the <Services /> stacking-cards component from the homepage.
 *
 * URL: /services
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Services } from "@/components/services";
import { TechPartners } from "@/components/tech-partners";
import { WhyHynivaServices } from "@/components/why-hyniva-services";
import { servicesListingContent } from "@/content/services-listing";
import useEmblaCarousel from "embla-carousel-react";
import { staggerContainer, fadeInUp, scrollReveal, viewportOnce } from "@/lib/animations";

/* ──────────────────────────────────────────
   Hero — same dark-blue style as home/about
────────────────────────────────────────── */

function ServicesHero() {
    return (
        <section className="relative overflow-hidden py-16 pt-28 sm:py-32 sm:pt-48 md:py-40 md:pt-56 lg:py-48 lg:pt-64">
            {/* Background layers - matching landing page gradient with centered radial glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-10"
                >
                    {/* Eyebrow Badge */}
                    <motion.div variants={fadeInUp} className="flex justify-center">
                        <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 backdrop-blur-md px-5 py-2 rounded-full text-xs font-bold tracking-[0.25em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                            SERVICES
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.15] tracking-tight font-display w-full lg:whitespace-nowrap mx-auto text-center [&_br]:hidden sm:[&_br]:inline"
                        dangerouslySetInnerHTML={{ __html: "Building resilient, intelligent <br />enterprises for what's next" }}
                    />

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-6xl mx-auto text-center"
                        dangerouslySetInnerHTML={{ __html: "Technology decisions today shape how organizations compete tomorrow. We help organizations modernize operations, accelerate innovation, and create experiences that drive sustainable growth." }}
                    />

                    {/* CTA Button */}
                    <motion.div variants={fadeInUp}>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-8 py-4 text-sm font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all duration-300 hover:scale-[1.03]"
                        >
                            Discuss your project
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────
   Certifications — static badge row
────────────────────────────────────────── */

const certifications = [
    { name: "Agentforce Specialist",   src: "/images/Certifications_Image/Agentforce_Specialist_badge.svg" },
    { name: "AI Associate",            src: "/images/Certifications_Image/AI_Associate.svg" },
    { name: "Data Cloud Consultant",   src: "/images/Certifications_Image/Data_Cloud_Consultant_Badge.svg" },
    { name: "Platform Administrator",  src: "/images/Certifications_Image/Platform_administrator_Badge.svg" },
    { name: "Platform Developer",      src: "/images/Certifications_Image/Platform_developer_Badge.svg" },
    { name: "AWS DevOps Engineer",     src: "/images/Certifications_Image/AWS_Certified_DevOps_Engineer_Professional.png" },
    { name: "AWS Solutions Architect", src: "/images/Certifications_Image/AWS_Certified_Solutions_Architect_Associate.png" },
    { name: "AWS Cloud Practitioner",  src: "/images/Certifications_Image/AWS_cloud_Practitioner.svg" },
];

function CertificationsScroll() {
    // Duplicate certifications for seamless infinite scroll
    const duplicatedCertifications = [...certifications, ...certifications];

    return (
        <section className="border-y border-slate-200 bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-[1400px] px-6">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-8">
                    Certifications & Recognitions
                </p>

                {/* Marquee container with fade edges */}
                <div className="marquee-fade overflow-hidden">
                    <div 
                        className="animate-marquee flex w-max items-center gap-8 sm:gap-10 lg:gap-14 px-6" 
                        style={{ "--marquee-duration": "20s" } as React.CSSProperties}
                    >
                        {duplicatedCertifications.map((cert, i) => (
                            <div
                                key={`${cert.name}-${i}`}
                                className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center"
                            >
                                <Image
                                    src={cert.src}
                                    alt={cert.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────
   Data Security & Compliance Section
   — LHS: text  |  RHS: hexagonal visual
────────────────────────────────────────── */

/* ── SVG geometry helpers ── */
const VB_W = 620;
const VB_H = 560;

// Centre hex
const CX = 295;
const CY = 255;
const CR = 105; // vertex radius

// Satellite hex radius
const SR = 80;

// Satellite centres
const ISO_X = 455;
const ISO_Y = 120;

const SEC_X = 100;
const SEC_Y = 320;

const SOC_X = 455;
const SOC_Y = 390;

/** Regular hexagon points, flat-top orientation */
function hexPoints(cx: number, cy: number, r: number): string {
    return Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 180) * (60 * i - 30);
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
}

/** Point along the line from (x1,y1) to (x2,y2) at fraction t */
function along(x1: number, y1: number, x2: number, y2: number, t: number) {
    return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t };
}

/**
 * AbsHex — absolutely positions a div centred over a hexagon
 * described in SVG viewBox coordinates, so it scales with the SVG.
 */
interface AbsHexProps {
    cx: number;
    cy: number;
    r: number;
    vbW: number;
    vbH: number;
    children: React.ReactNode;
}

function AbsHex({ cx, cy, r, vbW, vbH, children }: AbsHexProps) {
    return (
        <div
            className="absolute flex items-center justify-center pointer-events-none"
            style={{
                left:   `${((cx - r) / vbW) * 100}%`,
                top:    `${((cy - r) / vbH) * 100}%`,
                width:  `${((r * 2)  / vbW) * 100}%`,
                height: `${((r * 2)  / vbH) * 100}%`,
            }}
        >
            {children}
        </div>
    );
}

function DataSecuritySection() {
    return (
        <section className="bg-white py-6 sm:py-10 lg:py-12 border-t border-slate-100">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    {/* ── LEFT — text content ── */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="w-full lg:w-[52%]"
                    >
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-4 py-1.5 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] animate-pulse" />
                            Security & Compliance
                        </div>

                        <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5">
                            Your data is safe.<br />
                            <span className="text-[#2563eb] mt-4 inline-block">We engineer it that way.</span>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
                            Security is not an afterthought at Hyniva — it is built into every layer of our
                            delivery model. From SOC 2 compliance to zero-trust architecture, we uphold the
                            highest standards so your data, your clients, and your reputation stay protected.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">Trusted by 45+ Enterprise Clients</h3>
                        <p className="text-sm text-slate-500 max-w-xl">
                            From financial institutions to Fortune 500s, organizations trust Hyniva to handle
                            their most sensitive workloads securely and compliantly.
                        </p>
                    </motion.div>

                    {/* ── RIGHT — security certification image ── */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="w-full lg:w-[48%] relative"
                    >
                        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
                            <Image
                                src="/images/Certifications_Image/services_certify1.png"
                                alt="Hyniva Security Certifications"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------
   Work That Speaks - Projects Carousel
----------------------------------------- */

function WorkThatSpeaks() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", () => setCurrent(emblaApi.selectedScrollSnap()));
    }, [emblaApi]);

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    return (
        <section className="bg-white py-10 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
                {/* ── Header ── */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12"
                >
                    <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] font-extrabold tracking-tight text-slate-900 leading-tight">
                        Work that speaks
                    </h2>

                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-[28px] sm:text-[36px] font-black leading-none tracking-tight text-[#2563EB]">220+</span>
                        <span className="text-sm sm:text-base font-semibold text-[#2563EB] uppercase tracking-widest">Enterprise applications delivered</span>
                    </div>
                </motion.div>

                {/* ── Carousel ── */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {servicesProjectsData.map((study, idx) => (
                            <div key={idx} className="min-w-0 flex-[0_0_100%]">
                                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                                    <div className="w-full lg:w-[55%]">
                                        <h3 className="text-[22px] sm:text-[28px] font-bold text-slate-900 leading-snug mb-6">
                                            {study.title}
                                        </h3>
                                        <div className="mb-5">
                                            <p className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Challenge:</p>
                                            <p className="text-slate-600 text-base leading-relaxed">{study.challenge}</p>
                                        </div>
                                        <div className="mb-5">
                                            <p className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Solution:</p>
                                            <ul className="space-y-1.5">
                                                {study.solution.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-600 text-base">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-6">
                                            <p className="text-base font-bold text-slate-900 mb-3">Result:</p>
                                            <div className="rounded-2xl px-6 py-5 flex items-start gap-4" style={{ backgroundColor: '#00D4AA' }}>
                                                <span className="text-2xl shrink-0 mt-0.5">♛</span>
                                                <p className="text-slate-900 text-base font-semibold leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: study.result.replace(
                                                            /(\d[\d,+%\-x\.]*\s*(?:Lighthouse|faster|month|integrations|version|score|per\s+month)?[\w\s]*)/gi,
                                                            '<strong>$1</strong>'
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <Link
                                                href={servicesProjectsData[current].href}
                                                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white transition-all duration-300"
                                            >
                                                Explore more
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-[45%] flex flex-col gap-4">
                                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                                            <Image
                                                src={study.image}
                                                alt={study.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={scrollPrev} aria-label="Previous case study" className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button onClick={scrollNext} aria-label="Next case study" className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------
   Technology & Partners (inline - editable)
----------------------------------------- */

function TechPartnersSection() {
    const [activeCategory, setActiveCategory] = useState(
        techShowcaseData[0].category
    );
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const allTechs = techShowcaseData.flatMap((cat) =>
        cat.technologies.map((tech) => ({ ...tech, category: cat.category }))
    );

    const activeTechNames = new Set(
        techShowcaseData
            .find((c) => c.category === activeCategory)
            ?.technologies.map((t) => t.name) ?? []
    );

    return (
        <section className="bg-[#ECF6FF] pt-6 pb-16 lg:pt-8 lg:pb-20">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">

                {/* Header */}
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-12 mb-12">
                    <div className="shrink-0 md:w-[25%]">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                            Our <span className="text-[#2563EB]">Tech Stack</span>
                        </h2>
                    </div>
                    <div className="ml-auto md:w-[62%]">
                        <p className="text-base text-slate-600 leading-relaxed">
                            Each project requires a tailored approach and the appropriate tech stack to ensure timely delivery and clean code. So here&apos;s what our engineers use to bring product ideas to life.
                        </p>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="max-w-6xl mx-auto grid grid-cols-2 gap-2 sm:flex sm:overflow-x-auto sm:no-scrollbar sm:justify-between mb-14 pb-2 w-full">
                    {techShowcaseData.map((category) => (
                        <button
                            key={category.category}
                            onClick={() => setActiveCategory(category.category)}
                            className={`px-2 sm:px-7 py-3 rounded-xl text-[11px] sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 border sm:shrink-0 ${
                                activeCategory === category.category
                                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-lg"
                                    : "bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                            }`}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>

                {/* Logos — mobile: only active, desktop: all */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-4 gap-x-3 max-w-6xl mx-auto">
                    {allTechs
                        .filter((tech) => !isMobile || activeTechNames.has(tech.name))
                        .map((tech) => {
                            const isActive = activeTechNames.has(tech.name);
                            return (
                            <a
                                key={`${tech.category}-${tech.name}`}
                                href={tech.page}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative flex flex-col items-center justify-center transition-all duration-300 ${
                                    isActive
                                        ? "bg-white rounded-2xl px-2 py-3 border border-[#2563EB]/30 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#2563EB]/50 hover:scale-105"
                                        : "p-3"
                                }`}
                            >
                                <div className={`relative w-[40px] h-[40px] transition-transform duration-300 ${
                                    isActive ? "group-hover:scale-125" : ""
                                }`}>
                                    <Image
                                        src={tech.logo}
                                        alt={tech.name}
                                        fill
                                        unoptimized={tech.format === "SVG"}
                                        className="object-contain outline-none"
                                        style={tech.filter ? { filter: tech.filter } : undefined}
                                    />
                                </div>
                                <span className={`mt-1.5 text-[11px] font-medium text-center transition-colors ${
                                    isActive ? "text-[#2563EB] font-bold" : "text-slate-500"
                                }`}>
                                    {tech.name}
                                </span>
                            </a>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------
   Tech Showcase data
------------------------------------------ */
interface TechItem {
    name: string;
    logo: string;
    page: string;
    format: string;
    filter?: string;
}

interface TechCategory {
    category: string;
    technologies: TechItem[];
}

const techShowcaseData: TechCategory[] = [
    {
        category: "Digital Experience",
        technologies: [
            { name: "Figma",        logo: "/tech_logos/Figma.png",       page: "https://www.figma.com",          format: "PNG" },
            { name: "Adobe XD",     logo: "https://unpkg.com/simple-icons@9/icons/adobexd.svg",   page: "https://www.adobe.com/products/xd.html", format: "SVG", filter: "invert(26%) sepia(89%) saturate(1400%) hue-rotate(270deg) brightness(90%)" },
            { name: "ReactJS",      logo: "/tech_logos/ReactJS.png",     page: "https://react.dev",              format: "PNG" },
            { name: "Angular",      logo: "/tech_logos/Angular.png",     page: "https://angular.io",             format: "PNG" },
            { name: "HTML",         logo: "/tech_logos/HTML5.png",       page: "https://html.spec.whatwg.org",   format: "PNG" },
            { name: "CSS",          logo: "/tech_logos/CSS3.png",        page: "https://www.w3.org/Style/CSS/",  format: "PNG" },
            { name: "JavaScript",   logo: "/tech_logos/JavaScript.png",  page: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", format: "PNG" },
            { name: "jQuery",       logo: "/tech_logos/jQuery.png",      page: "https://jquery.com",             format: "PNG" },
            { name: "Next.js",      logo: "https://unpkg.com/simple-icons@9/icons/nextdotjs.svg", page: "https://nextjs.org", format: "SVG", filter: "invert(0%)" },
            { name: "React Native", logo: "/tech_logos/React_Native.png",page: "https://reactnative.dev",        format: "PNG" },
            { name: "Flutter",      logo: "/tech_logos/Flutter.png",     page: "https://flutter.dev",            format: "PNG" },
            { name: "Swift",        logo: "/tech_logos/Swift.png",       page: "https://www.swift.org",          format: "PNG" },
            { name: "Kotlin",       logo: "/tech_logos/Kotlin.png",      page: "https://kotlinlang.org",         format: "PNG" },
        ],
    },
    {
        category: "Application Development",
        technologies: [
            { name: "Java",          logo: "/tech_logos/Java.png",       page: "https://www.java.com",               format: "PNG" },
            { name: ".NET",          logo: "/tech_logos/ASP.Net.png",    page: "https://dotnet.microsoft.com",       format: "PNG" },
            { name: "Node.js",       logo: "/tech_logos/NodeJS.png",     page: "https://nodejs.org",                 format: "PNG" },
            { name: "PHP",           logo: "/tech_logos/PHP.png",        page: "https://www.php.net",                format: "PNG" },
            { name: "Python",        logo: "/tech_logos/Python.png",     page: "https://www.python.org",             format: "PNG" },
            { name: "TypeScript",    logo: "/tech_logos/TypeScript.png", page: "https://www.typescriptlang.org",     format: "PNG" },
            { name: "Backend APIs",  logo: "https://unpkg.com/simple-icons@9/icons/fastapi.svg",    page: "https://fastapi.tiangolo.com",  format: "SVG", filter: "invert(44%) sepia(98%) saturate(400%) hue-rotate(130deg) brightness(95%)" },
            { name: "Microservices", logo: "https://unpkg.com/simple-icons@9/icons/docker.svg",     page: "https://microservices.io",      format: "SVG", filter: "invert(39%) sepia(93%) saturate(500%) hue-rotate(185deg) brightness(100%)" },
        ],
    },
    {
        category: "Enterprise Platforms",
        technologies: [
            { name: "Salesforce",     logo: "/tech_logos/Salesforce.png",     page: "https://www.salesforce.com",     format: "PNG" },
            { name: "MS Dynamics",    logo: "/tech_logos/MS_Dynamics.png",    page: "https://dynamics.microsoft.com", format: "PNG" },
            { name: "Genesys",        logo: "/tech_logos/Genesys.png",        page: "https://www.genesys.com",        format: "PNG" },
            { name: "Amazon Connect", logo: "/tech_logos/AWS.png",            page: "https://aws.amazon.com/connect/",format: "PNG" },
            { name: "Mendix",         logo: "/tech_logos/Mendix.png",         page: "https://www.mendix.com",         format: "PNG" },
        ],
    },
    {
        category: "Cloud & Infrastructure",
        technologies: [
            { name: "AWS",          logo: "/tech_logos/AWS.png",          page: "https://aws.amazon.com",       format: "PNG" },
            { name: "Azure",        logo: "/tech_logos/Azure.png",        page: "https://azure.microsoft.com",  format: "PNG" },
            { name: "Google Cloud", logo: "/tech_logos/Google_Cloud.png", page: "https://cloud.google.com",     format: "PNG" },
        ],
    },
    {
        category: "Quality Engineering",
        technologies: [
            { name: "Selenium",    logo: "/tech_logos/Selenium.png",    page: "https://www.selenium.dev",    format: "PNG" },
            { name: "PactumJS",    logo: "/tech_logos/PactumJS.png",    page: "https://pactumjs.github.io",  format: "PNG" },
            { name: "WebdriverIO", logo: "/tech_logos/WebdriverIO.png", page: "https://webdriver.io",        format: "PNG" },
            { name: "ContextQA",   logo: "/tech_logos/ContextQA.png",   page: "https://contextqa.com",       format: "PNG" },
        ],
    },
    {
        category: "AI / ML",
        technologies: [
            { name: "Generative AI",      logo: "https://unpkg.com/simple-icons@9/icons/openai.svg",        page: "https://openai.com",                  format: "SVG", filter: "invert(15%) sepia(5%) saturate(200%) hue-rotate(0deg) brightness(20%)" },
            { name: "Intelligent Search", logo: "https://unpkg.com/simple-icons@9/icons/elasticsearch.svg",  page: "https://www.elastic.co",              format: "SVG", filter: "invert(70%) sepia(80%) saturate(600%) hue-rotate(10deg) brightness(105%)" },
            { name: "Conversational AI",  logo: "https://unpkg.com/simple-icons@9/icons/dialogflow.svg",     page: "https://cloud.google.com/dialogflow", format: "SVG", filter: "invert(44%) sepia(98%) saturate(400%) hue-rotate(190deg) brightness(100%)" },
            { name: "Computer Vision",    logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg", page: "https://opencv.org", format: "SVG" },
            { name: "Recommendations",    logo: "https://unpkg.com/simple-icons@9/icons/tensorflow.svg",     page: "https://www.tensorflow.org",          format: "SVG", filter: "invert(55%) sepia(80%) saturate(600%) hue-rotate(360deg) brightness(100%)" },
        ],
    },
];

/* ──────────────────────────────────────────
   NEW: Projects Carousel data
────────────────────────────────────────── */

interface ProjectStudy {
    title: string;
    image: string;
    challenge: string;
    solution: string[];
    result: string;
    href: string;
}

const servicesProjectsData: ProjectStudy[] = [
    {
        title: "Autonomous Lending Experience with FinXServe and Agentforce",
        image: "/images/Case_Studies/Optimized/cs-1.png",
        challenge: "Built an AI-driven lending journey that automates document processing, decisioning and approvals.",
        solution: [
            "Designed an AI-powered lending concierge with Agentforce.",
            "Automated document processing and verification workflows.",
            "Integrated real-time decisioning and approval systems.",
            "Deployed role-based dashboards for lending teams.",
        ],
        result: "80% faster time-to-market and 70% faster loan processing with near-instant digital approvals.",
        href: "/insights/case-studies/autonomous-lending-experiences",
    },
    {
        title: "Faster Loan Processing with Agentforce Document Intelligence",
        image: "/images/Case_Studies/Optimized/cs-2.png",
        challenge: "A leading bank needed to accelerate loan processing with intelligent document automation and verification.",
        solution: [
            "Implemented Agentforce-powered document intelligence for verification.",
            "Automated document extraction and classification workflows.",
            "Integrated with existing loan origination systems.",
            "Built real-time approval and exception handling flows.",
        ],
        result: "70% reduction in document processing time with near-instant digital loan approvals.",
        href: "/insights/case-studies/instant-loan-processing",
    },
    {
        title: "Modernizing Contact Centers with Intelligent IVR Self-Service",
        image: "/images/Case_Studies/Optimized/cs-3.png",
        challenge: "A legacy IVR system was causing long wait times and poor customer satisfaction scores.",
        solution: [
            "Transformed legacy IVR into a Smart Customer Engagement Interaction System.",
            "Implemented intelligent call routing with natural language understanding.",
            "Built self-service flows for common banking inquiries.",
            "Integrated real-time sentiment analysis for escalation.",
        ],
        result: "Significant reduction in average handle time and improved customer satisfaction across all channels.",
        href: "/insights/case-studies/intelligent-ivr-self-service",
    },
    {
        title: "Autonomous Freight Operations with GenAI",
        image: "/images/Case_Studies/Optimized/cs-4.png",
        challenge: "A logistics provider was manually creating loads, leading to high operational costs and slow turnaround times.",
        solution: [
            "Deployed GenAI-driven automation for load creation.",
            "Built intelligent routing and optimization algorithms.",
            "Integrated real-time tracking and visibility systems.",
            "Automated dispatch and scheduling workflows.",
        ],
        result: "98% reduction in load creation time and 99.5% cost reduction through GenAI-driven automation.",
        href: "/insights/case-studies/autonomous-freight-operations",
    },
    {
        title: "Frictionless Customer Authentication for Secure Banking",
        image: "/images/Case_Studies/Optimized/cs-7.png",
        challenge: "A bank needed to modernize contact center authentication to reduce fraud and improve customer experience.",
        solution: [
            "Integrated Pindrop voice biometrics for passive multi-factor authentication.",
            "Built seamless authentication workflows across channels.",
            "Implemented real-time fraud detection and prevention.",
            "Reduced average handle time with frictionless verification.",
        ],
        result: "Reduced authentication time while strengthening fraud protection across all contact center channels.",
        href: "/insights/case-studies/customer-authentication",
    },
    {
        title: "Cost-Optimized Document Platform on AWS",
        image: "/images/Case_Studies/Optimized/cs-22.png",
        challenge: "A wealth management firm needed to reduce licensing costs while scaling document management capabilities.",
        solution: [
            "Architected a serverless document platform on AWS.",
            "Migrated from legacy licensing model to pay-as-you-go.",
            "Built automated document processing and storage pipelines.",
            "Implemented enterprise-grade security and compliance controls.",
        ],
        result: "Zero licensing costs with scalable document management, saving hundreds of thousands annually.",
        href: "/insights/case-studies/cost-optimized-document-platform-on-aws",
    },
    {
        title: "Intelligent School Administration for Modern Institutions",
        image: "/images/Case_Studies/Eazyschool_admin.png",
        challenge: "Educational institutions needed a unified platform to manage administration, attendance, and communications.",
        solution: [
            "Built a comprehensive school management platform.",
            "Automated attendance tracking and reporting workflows.",
            "Integrated parent-teacher communication channels.",
            "Deployed role-based dashboards for administrators and teachers.",
        ],
        result: "Streamlined administrative operations with real-time visibility and automated workflows across institutions.",
        href: "/insights/case-studies/eazyschool-admin",
    },
    {
        title: "Transforming Claims Operations with a Scalable Digital Platform",
        image: "/images/Case_Studies/Optimized/cs-17.png",
        challenge: "An insurance group needed to modernize claims processing with real-time visibility and faster settlements.",
        solution: [
            "Designed a unified digital claims platform.",
            "Automated claims intake and validation workflows.",
            "Built real-time processing and visibility dashboards.",
            "Implemented scalable architecture for future growth.",
        ],
        result: "Unified claims workflows with real-time processing and visibility for faster settlements and improved customer satisfaction.",
        href: "/insights/case-studies/transforming-insurance-claims-operations-with-a-scalable-digital-platform",
    },
];

/* ──────────────────────────────────────────
   NEW: Projects Carousel component
────────────────────────────────────────── */

/* ──────────────────────────────────────────
   Page
────────────────────────────────────────── */

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main>
                <ServicesHero />
                <div id="our-services" className="scroll-mt-20">
                    <Services />
                </div>
                <TechPartners />
                <TechPartnersSection />
                <DataSecuritySection />
                <WhyHyniva />
                <CertificationsScroll />
                <WorkThatSpeaks />
            </main>
            <Footer />
        </>
    );
}