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
import { ArrowUpRightIcon, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Services } from "@/components/services";
import { servicesListingContent } from "@/content/services-listing";
import { staggerContainer, fadeInUp, scrollReveal, viewportOnce } from "@/lib/animations";

/* ──────────────────────────────────────────
   Hero — same dark-blue style as home/about
────────────────────────────────────────── */

function ServicesHero() {
    return (
        <section className="relative overflow-hidden bg-[#030b1e] min-h-[400px] sm:min-h-[450px] lg:min-h-[520px] flex items-center pt-16">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#020918] via-[#020918]/85 to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center text-center w-full"
                >
                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl md:text-[68px] font-[900] leading-[1.08] tracking-tight text-white font-display"
                    >
                        Services
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-6 text-xs sm:text-xl text-slate-300 leading-relaxed font-medium"
                    >
                        {/* Mobile: 3-line split */}
                        <span className="sm:hidden">
                            {servicesListingContent.hero.subtitleMobile.split("<br />").map((line, i, arr) => (
                                <span key={i}>{line.trim()}{i < arr.length - 1 && <br />}</span>
                            ))}
                        </span>
                        {/* Desktop: 2-line split */}
                        <span className="hidden sm:inline">
                            {servicesListingContent.hero.subtitle.split("<br />").map((line, i, arr) => (
                                <span key={i}>{line.trim()}{i < arr.length - 1 && <br />}</span>
                            ))}
                        </span>
                    </motion.div>

                    {/* CTA */}
                    <motion.div variants={fadeInUp} className="mt-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-8 py-4 text-sm font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all duration-300 hover:scale-[1.03]"
                        >
                            Discuss Your Project
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
    return (
        <section className="border-y border-slate-200 bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-[1400px] px-6">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-8">
                    Certifications & Recognitions
                </p>

                {/* Mobile: marquee — Desktop: centered row */}
                <div className="overflow-hidden sm:overflow-visible">
                    <div className="flex flex-nowrap items-center gap-3 sm:gap-5 lg:gap-8 marquee-mobile sm:justify-center sm:w-auto sm:animate-none">
                        {[...certifications, ...certifications].map((cert, i) => (
                            <div
                                key={`${cert.name}-${i}`}
                                className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 ${i >= certifications.length ? 'sm:hidden' : ''}`}
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
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#2563eb] bg-[#2563eb]/[0.08] border border-[#2563eb]/25 rounded-full px-4 py-1.5 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
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
                        className="w-full lg:w-[48%] flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-[600px] aspect-square -ml-4 lg:-ml-8">
                            <Image
                                src="/images/Certifications_Image/services_certify1.png"
                                alt="Hyniva Security Certifications"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------
   Technology & Partners (inline - editable)
------------------------------------------ */

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
        <section className="bg-white py-16 lg:py-20">
            <div className="mx-auto max-w-[1400px] px-6">

                {/* Category Tabs */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:overflow-x-auto sm:no-scrollbar sm:gap-4 mb-14 justify-start lg:justify-center pb-2">
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
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-6 gap-x-4 max-w-6xl mx-auto">
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
                                className={`group flex flex-col items-center rounded-2xl p-3 border transition-all duration-300 ${
                                    isActive
                                        ? "bg-transparent border-transparent scale-105"
                                        : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200"
                                }`}
                            >
                                <div className="relative w-[52px] h-[52px] transition-transform duration-300 group-hover:scale-110">
                                    <Image
                                        src={tech.logo}
                                        alt={tech.name}
                                        fill
                                        unoptimized={tech.format === "SVG"}
                                className="object-contain outline-none"
                                        style={tech.filter ? { filter: tech.filter } : undefined}
                                    />
                                </div>
                                <span className={`mt-2 text-[12px] font-medium text-center transition-colors ${
                                    isActive ? "text-[#2563EB] font-bold" : "text-slate-500 group-hover:text-[#2563EB]"
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
                <TechPartnersSection />
                <CertificationsScroll />
                <DataSecuritySection />
            </main>
            <Footer />
        </>
    );
}