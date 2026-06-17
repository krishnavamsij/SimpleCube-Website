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
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, ShieldCheck, Lock, ClipboardCheck } from "lucide-react";
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
   Meet the Experts — full leadership section
   (same as About page, uses aboutContent data)
────────────────────────────────────────── */

// function MeetTheExperts() {
//     return (
//         <section id="meet-the-experts" className="relative bg-gradient-to-br from-[#020918] via-[#061244] to-[#030b1e] py-12 sm:py-16 lg:py-20 text-white scroll-mt-24">
//             <div className="mx-auto max-w-[1400px] px-6 relative z-10">
//                 <motion.div
//                     variants={fadeInUp}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={viewportOnce}
//                     className="text-center mb-12"
//                 >
//                     <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-[900] tracking-tight text-white leading-[1.35]">
//                         Meet the Experts
//                     </h2>
//                 </motion.div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {aboutContent.leadership.team.map((leader, idx) => (
//                         <motion.div
//                             key={idx}
//                             variants={fadeInUp}
//                             initial="hidden"
//                             whileInView="visible"
//                             viewport={viewportOnce}
//                             className="bg-[#06102b] border border-slate-800/80 rounded-xl overflow-hidden flex flex-col group transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/20 hover:border-slate-600"
//                         >
//                             <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#0e182f] to-[#06102b] overflow-hidden">
//                                 {leader.image ? (
//                                     <Image
//                                         src={leader.image}
//                                         alt={leader.name}
//                                         fill
//                                         className="object-cover transition-transform duration-500"
//                                         style={
//                                             leader.name === "Madhu Bandarapu"
//                                                 ? { transform: "scale(1.35) translateY(-2%)", objectPosition: "top", transformOrigin: "top center" }
//                                                 : { objectPosition: "top" }
//                                         }
//                                     />
//                                 ) : (
//                                     <div className="absolute inset-0 flex items-center justify-center">
//                                         <Users className="w-12 h-12 text-slate-600" />
//                                     </div>
//                                 )}
//                                 <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06102b] via-[#06102b]/60 to-transparent pointer-events-none" />
//                             </div>

//                             <div className="p-6 pt-0 flex-1 flex flex-col relative z-10">
//                                 <div className="flex justify-between items-start">
//                                     <div>
//                                         <h3 className="font-bold text-lg md:text-xl text-white mb-1.5">{leader.name}</h3>
//                                         <p className="text-[13px] font-semibold text-[#1e90ff] mb-5">{leader.title}</p>
//                                     </div>
//                                     {(leader as any).linkedin && (
//                                         <a
//                                             href={(leader as any).linkedin}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="transition-opacity hover:opacity-80 mt-1"
//                                             aria-label={`${leader.name} on LinkedIn`}
//                                         >
//                                             <img src="/images/About_Us/linkedin-icon.png" alt="LinkedIn" className="w-6 h-6 object-contain" />
//                                         </a>
//                                     )}
//                                 </div>
//                                 <div className="w-full h-px bg-slate-800/80 mb-5" />
//                                 <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
//                                     {(leader as any).description}
//                                 </p>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }

/* ──────────────────────────────────────────
   Certifications — static badge row
────────────────────────────────────────── */

const certifications = [
    { name: "Agentforce Specialist",       src: "/images/Certifications_Image/Agentforce_Specialist_badge.svg" },
    { name: "AI Associate",                src: "/images/Certifications_Image/AI_Associate.svg" },
    { name: "Data Cloud Consultant",       src: "/images/Certifications_Image/Data_Cloud_Consultant_Badge.svg" },
    { name: "Platform Administrator",      src: "/images/Certifications_Image/Platform_administrator_Badge.svg" },
    { name: "Platform Developer",          src: "/images/Certifications_Image/Platform_developer_Badge.svg" },
    { name: "AWS Cloud Practitioner",      src: "/images/Certifications_Image/AWS_cloud_Practitioner.svg" },
];

function CertificationsScroll() {
    return (
        <section className="border-y border-slate-200 bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-[1400px] px-6">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-8">
                    Certifications & Recognitions
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-10">
                    {certifications.map((cert, i) => (
                        <div
                            key={cert.name}
                            className={`relative h-20 sm:h-28 lg:h-36 w-[100px] sm:w-[130px] lg:w-[160px] p-2 ${i === 5 ? 'lg:w-[200px] lg:h-38' : ''}`}
                        >
                            <Image
                                src={cert.src}
                                alt={cert.name}
                                fill
                                className={`object-contain ${i === 5 ? 'object-left' : ''}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
/* ──────────────────────────────────────────
   Security & Compliance Hexagon Visuals
────────────────────────────────────────── */

interface HexagonProps {
    className?: string;
    strokeColor?: string;
    fillColor?: string;
    strokeWidth?: number;
    shadowId?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

function Hexagon({
    className = "",
    strokeColor = "#3B82F6",
    fillColor = "none",
    strokeWidth = 2,
    shadowId,
    style,
    children,
}: HexagonProps) {
    return (
        <div className={className} style={style}>
            <svg
                viewBox="0 0 100 115"
                className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(59,130,246,0.06)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {shadowId && (
                    <defs>
                        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.1" />
                        </filter>
                    </defs>
                )}
                <polygon
                    points="50,5 95,30 95,85 50,110 5,85 5,30"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    filter={shadowId ? `url(#${shadowId})` : undefined}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {children}
            </div>
        </div>
    );
}

function SecurityComplianceVisual() {
    return (
        <div
            className="relative w-full max-w-[560px] mx-auto"
            style={{ aspectRatio: "5 / 4" }}
        >
            <svg
                viewBox="0 0 500 420"
                className="absolute inset-0 w-full h-full"
            >
                <defs>
                    <linearGradient
                        id="scCenterGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#18BFFF" />
                        <stop offset="55%" stopColor="#3777FF" />
                        <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>

                    <linearGradient
                        id="scBorder"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#52D3FF" />
                        <stop offset="100%" stopColor="#4B6CFF" />
                    </linearGradient>

                    <filter id="hexShadow">
                        <feDropShadow
                            dx="0"
                            dy="18"
                            stdDeviation="22"
                            floodColor="#2563eb"
                            floodOpacity=".18"
                        />
                    </filter>
                </defs>

                {/* BACKGROUND BRACES */}
                <text
                    x="90"
                    y="230"
                    fontSize="120"
                    fill="#D9FAFF"
                    opacity=".15"
                >
                    {"{"}
                </text>

                <text
                    x="390"
                    y="230"
                    fontSize="120"
                    fill="#D9FAFF"
                    opacity=".15"
                >
                    {"}"}
                </text>

                {/* Decorative */}
                <polygon
                    points="175,125 240,160 240,235 175,270 110,235 110,160"
                    stroke="#DDEAFF"
                    fill="none"
                />

                <polygon
                    points="325,125 390,160 390,235 325,270 260,235 260,160"
                    stroke="#DDEAFF"
                    fill="none"
                />

                {/* CENTER */}
                <polygon
                    points="
                    250,88
                    350,145
                    350,255
                    250,312
                    150,255
                    150,145
                "
                    fill="url(#scCenterGrad)"
                    filter="url(#hexShadow)"
                />

                {/* TOP */}
                <polygon
                    points="
                    395,60
                    455,95
                    455,175
                    395,210
                    335,175
                    335,95
                "
                    fill="white"
                    stroke="url(#scBorder)"
                    strokeWidth="2"
                />

                {/* LEFT */}
                <polygon
                    points="
                    110,250
                    170,285
                    170,365
                    110,400
                    50,365
                    50,285
                "
                    fill="white"
                    stroke="url(#scBorder)"
                    strokeWidth="2"
                />

                {/* RIGHT */}
                <polygon
                    points="
                    390,250
                    450,285
                    450,365
                    390,400
                    330,365
                    330,285
                "
                    fill="white"
                    stroke="url(#scBorder)"
                    strokeWidth="2"
                />

                {/* TOP ICON */}
                <path
                    d="M395 112 L406 123 L425 100"
                    stroke="#3BB8FF"
                    strokeWidth="3"
                />

                {/* LEFT ICON */}
                <circle
                    cx="130"
                    cy="315"
                    r="18"
                    stroke="#3BB8FF"
                    strokeWidth="3"
                />

                <line
                    x1="143"
                    y1="328"
                    x2="158"
                    y2="344"
                    stroke="#3BB8FF"
                    strokeWidth="3"
                />

                {/* RIGHT ICON */}
                <path
                    d="
                    M390 295
                    L420 308
                    L420 335
                    Q420 355 390 370
                    Q360 355 360 335
                    L360 308 Z
                "
                    stroke="#4F66FF"
                    strokeWidth="3"
                    fill="none"
                />

                {/* LABELS */}
                <text
                    x="395"
                    y="188"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#2E74FF"
                >
                    VERIFIED STANDARDS
                </text>

                <text
                    x="110"
                    y="378"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#2E74FF"
                >
                    AUDITED & VALIDATED
                </text>

                <text
                    x="390"
                    y="378"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#4F46E5"
                >
                    TRUST & TRANSPARENCY
                </text>
            </svg>

            {/* HEX CLIPPED CERTIFICATE */}
            <div
                className="absolute z-10 overflow-hidden"
                style={{
                    left: "50%",
                    top: "50%",
                    width: "28%",
                    aspectRatio: "1",
                    transform: "translate(-50%, -50%)",
                    clipPath:
                        "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                    filter:
                        "drop-shadow(0 12px 32px rgba(37,99,235,.18))",
                }}
            >
                <Image
                    src="/images/Certifications_Image/Certified.svg"
                    alt="Certification"
                    fill
                    className="object-cover"
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(20,184,255,.08), rgba(79,70,229,.08))",
                    }}
                />
            </div>
        </div>
    );
}

/* ------------------------------------------
   Data Security Trust Section
------------------------------------------ */

function DataSecuritySection() {
    return (
        <section className="bg-[#f8fafc] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* LEFT — text content */}
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
                            Security is not an afterthought at Hyniva — it is built into every layer of our delivery model. From SOC 2 compliance to zero-trust architecture, we uphold the highest standards so your data, your clients, and your reputation stay protected.
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">Trusted by 45+ Enterprise Clients</h3>
                        <p className="text-sm text-slate-500 max-w-xl">
                            From financial institutions to Fortune 500s, organizations trust Hyniva to handle their most sensitive workloads securely and compliantly.
                        </p>
                    </motion.div>

                    {/* RIGHT — key certifications */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="w-full lg:w-[48%] flex flex-col lg:pt-6 items-start"
                    >
                        <p className="text-[12px] font-bold uppercase tracking-[2px] text-slate-400 mb-8 w-full text-left pl-4">
                            Certifications
                        </p>

                        <div className="flex items-center justify-start -ml-4 lg:ml-0 gap-0">
                            <div className="relative h-44 w-52">
                                <Image src="/images/Certifications_Image/ISO.png" alt="ISO Certified" fill className="object-left object-contain" />
                            </div>
                            <div className="relative h-44 w-52 -ml-4">
                                <Image src="/images/Certifications_Image/Certified.png" alt="SOC 2 Certified" fill className="object-left object-contain mix-blend-multiply" />
                            </div>
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

    const active = techShowcaseData.find(
        (item) => item.category === activeCategory
    )!;

    return (
        <section className="bg-white py-16 lg:py-20">
            <div className="mx-auto max-w-[1400px] px-6">

                {/* Category Tabs */}
                <div className="flex overflow-x-auto no-scrollbar gap-4 mb-14 justify-start lg:justify-center pb-2">

                    {techShowcaseData.map((category) => (
                        <button
                            key={category.category}
                            onClick={() => setActiveCategory(category.category)}
                            className={`px-7 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                                activeCategory === category.category
                                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-lg"
                                    : "bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                            }`}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-12 gap-x-10 justify-items-start max-w-6xl mx-auto">

                    {active.technologies.map((tech) => (
                        <a
                            key={tech.name}
                            href={tech.page}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center"
                        >
                            <div className="relative w-[72px] h-[72px] transition-all duration-300 group-hover:scale-110">
                                <Image
                                    src={tech.logo}
                                    alt={tech.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <span className="mt-3 text-sm font-medium text-slate-600 text-center group-hover:text-[#2563EB] transition-colors">
                                {tech.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------
   Tech Showcase — tabbed logo accordion
------------------------------------------ */
interface TechItem {
    name: string;
    logo: string;
    page: string;
    format: string;
}

interface TechCategory {
    category: string;
    technologies: TechItem[];
}

const techShowcaseData: TechCategory[] = [
    {
        category: "UI/UX",
        technologies: [
            { name: "ReactJS", logo: "/tech_logos/ReactJS.png", page: "https://react.dev", format: "PNG" },
            { name: "Angular", logo: "/tech_logos/Angular.png", page: "https://angular.io", format: "PNG" },
            { name: "HTML5", logo: "/tech_logos/HTML5.png", page: "https://html.spec.whatwg.org", format: "PNG" },
            { name: "CSS3", logo: "/tech_logos/CSS3.png", page: "https://www.w3.org/Style/CSS/", format: "PNG" },
            { name: "JavaScript", logo: "/tech_logos/JavaScript.png", page: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", format: "PNG" },
            { name: "jQuery", logo: "/tech_logos/jQuery.png", page: "https://jquery.com", format: "PNG" },
            { name: "Figma", logo: "/tech_logos/Figma.png", page: "https://www.figma.com", format: "PNG" },
        ],
    },
    {
        category: "Mobile",
        technologies: [
            { name: "React Native", logo: "/tech_logos/React_Native.png", page: "https://reactnative.dev", format: "PNG" },
            { name: "Flutter", logo: "/tech_logos/Flutter.png", page: "https://flutter.dev", format: "PNG" },
            { name: "Swift", logo: "/tech_logos/Swift.png", page: "https://www.swift.org", format: "PNG" },
            { name: "Kotlin", logo: "/tech_logos/Kotlin.png", page: "https://kotlinlang.org", format: "PNG" },
        ],
    },
    {
        category: "Back End",
        technologies: [
            { name: "Java", logo: "/tech_logos/Java.png", page: "https://www.java.com", format: "PNG" },
            { name: "NodeJS", logo: "/tech_logos/NodeJS.png", page: "https://nodejs.org", format: "PNG" },
            { name: "PHP", logo: "/tech_logos/PHP.png", page: "https://www.php.net", format: "PNG" },
            { name: "Python", logo: "/tech_logos/Python.png", page: "https://www.python.org", format: "PNG" },
            { name: "ASP.Net", logo: "/tech_logos/ASP.Net.png", page: "https://dotnet.microsoft.com", format: "PNG" },
            { name: "TypeScript", logo: "/tech_logos/TypeScript.png", page: "https://www.typescriptlang.org", format: "PNG" },
        ],
    },
    {
        category: "CRM",
        technologies: [
            { name: "Salesforce", logo: "/tech_logos/Salesforce.png", page: "https://www.salesforce.com", format: "PNG" },
            { name: "MS Dynamics", logo: "/tech_logos/MS_Dynamics.png", page: "https://dynamics.microsoft.com", format: "PNG" },
            { name: "Business Central", logo: "/tech_logos/Business_Central.png", page: "https://dynamics.microsoft.com/business-central", format: "PNG" },
        ],
    },
    {
        category: "Infrastructure",
        technologies: [
            { name: "Google Cloud", logo: "/tech_logos/Google_Cloud.png", page: "https://cloud.google.com", format: "PNG" },
            { name: "AWS", logo: "/tech_logos/AWS.png", page: "https://aws.amazon.com", format: "PNG" },
            { name: "Azure", logo: "/tech_logos/Azure.png", page: "https://azure.microsoft.com", format: "PNG" },
        ],
    },
    {
        category: "Test Automation",
        technologies: [
            { name: "Selenium", logo: "/tech_logos/Selenium.png", page: "https://www.selenium.dev", format: "PNG" },
            { name: "PactumJS", logo: "/tech_logos/PactumJS.png", page: "https://pactumjs.github.io", format: "PNG" },
            { name: "WebdriverIO", logo: "/tech_logos/WebdriverIO.png", page: "https://webdriver.io", format: "PNG" },
            { name: "ContextQA", logo: "/tech_logos/ContextQA.png", page: "https://contextqa.com", format: "PNG" },
        ],
    },
    {
        category: "Contact Center",
        technologies: [
            { name: "Genesys", logo: "/tech_logos/Genesys.png", page: "https://www.genesys.com", format: "PNG" },
        ],
    },
    {
        category: "Low Code / No Code",
        technologies: [
            { name: "Mendix", logo: "/tech_logos/Mendix.png", page: "https://www.mendix.com", format: "PNG" },
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
                {/* <MeetTheExperts /> */}
                <CertificationsScroll />
                <DataSecuritySection />
            </main>
            <Footer />
        </>
    );
}
