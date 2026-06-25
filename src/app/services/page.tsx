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
import { CertificationsDiagram } from "@/components/certifications-diagram";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, ShieldCheck, ChevronLeft, ChevronRight, ArrowRightIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Services } from "@/components/services";
import { TechPartners } from "@/components/tech-partners";
import { WhyHynivaServices } from "@/components/why-hyniva-services";
import { servicesListingContent } from "@/content/services-listing";
import useEmblaCarousel from "embla-carousel-react";
import { staggerContainer, fadeInUp, scrollReveal, viewportOnce } from "@/lib/animations";

/* ──────────────────────────────────────────
   Hero — ServicesHero component
────────────────────────────────────────── */

// Simple Icons SVGs → transparent bg → brightness(0) invert(1) = pure white, zero background box
const SVG_STYLE: React.CSSProperties = {
    width: 40,
    height: 40,
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
    display: "block",
};

// PNG with white bg → brightness(0) invert(1) + mix-blend-mode:screen hides the background
const PNG_STYLE: React.CSSProperties = {
    width: 40,
    height: 40,
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
    mixBlendMode: "screen",
    display: "block",
};

// Salesforce: icon + wordmark so the brand is identifiable
function SalesforceChip() {
    return (
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40 }}>
            <img
                src="https://unpkg.com/simple-icons@9/icons/salesforce.svg"
                alt="Salesforce"
                style={SVG_STYLE}
            />
            <span style={{
                position: "absolute",
                color: "#030b1e",
                fontSize: "5.8px",
                fontWeight: 900,
                textAlign: "center",
                lineHeight: 1,
                pointerEvents: "none",
                marginTop: "3px",
                letterSpacing: "-0.02em",
            }}>
                salesforce
            </span>
        </div>
    );
}

const BRANDS = [
    { name: "AWS",          render: () => <img src="https://unpkg.com/simple-icons@9/icons/amazonaws.svg"     alt="AWS"          style={SVG_STYLE} /> },
    { name: "Salesforce",   render: () => <SalesforceChip /> },
    { name: "HTML5",        render: () => <img src="https://unpkg.com/simple-icons@9/icons/html5.svg"         alt="HTML5"        style={SVG_STYLE} /> },
    { name: "Google Cloud", render: () => <img src="https://unpkg.com/simple-icons@9/icons/googlecloud.svg"   alt="Google Cloud" style={SVG_STYLE} /> },
    { name: "Python",       render: () => <img src="https://unpkg.com/simple-icons@9/icons/python.svg"        alt="Python"       style={SVG_STYLE} /> },
    { name: "Java",         render: () => <img src="https://unpkg.com/simple-icons@9/icons/openjdk.svg"       alt="Java"         style={SVG_STYLE} /> },
    { name: "ReactJS",      render: () => <img src="https://unpkg.com/simple-icons@9/icons/react.svg"         alt="ReactJS"      style={SVG_STYLE} /> },
    { name: "Swift",        render: () => <img src="https://unpkg.com/simple-icons@9/icons/swift.svg"         alt="Swift"        style={SVG_STYLE} /> },
    { name: "Azure",        render: () => <img src="https://unpkg.com/simple-icons@9/icons/microsoftazure.svg" alt="Azure"       style={SVG_STYLE} /> },
    { name: "Angular",      render: () => <img src="https://unpkg.com/simple-icons@9/icons/angular.svg"       alt="Angular"      style={SVG_STYLE} /> },
    { name: "Flutter",      render: () => <img src="https://unpkg.com/simple-icons@9/icons/flutter.svg"       alt="Flutter"      style={SVG_STYLE} /> },
    { name: "Figma",        render: () => <img src="https://unpkg.com/simple-icons@9/icons/figma.svg"         alt="Figma"        style={SVG_STYLE} /> },
    { name: "Kotlin",       render: () => <img src="https://unpkg.com/simple-icons@9/icons/kotlin.svg"        alt="Kotlin"       style={SVG_STYLE} /> },
    { name: "TypeScript",   render: () => <img src="https://unpkg.com/simple-icons@9/icons/typescript.svg"    alt="TypeScript"   style={SVG_STYLE} /> },
    { name: "NodeJS",       render: () => <img src="https://unpkg.com/simple-icons@9/icons/nodedotjs.svg"      alt="NodeJS"       style={SVG_STYLE} /> },
    { name: "MS Dynamics",  render: () => <img src="https://unpkg.com/simple-icons@9/icons/microsoft.svg"     alt="MS Dynamics"  style={SVG_STYLE} /> },
    { name: "PHP",          render: () => <img src="https://unpkg.com/simple-icons@9/icons/php.svg"           alt="PHP"          style={SVG_STYLE} /> },
    { name: "Selenium",     render: () => <img src="https://unpkg.com/simple-icons@9/icons/selenium.svg"      alt="Selenium"     style={SVG_STYLE} /> },
    { name: "jQuery",       render: () => <img src="https://unpkg.com/simple-icons@9/icons/jquery.svg"        alt="jQuery"       style={SVG_STYLE} /> },
    { name: "WebdriverIO",  render: () => <img src="https://unpkg.com/simple-icons@9/icons/webdriverio.svg"   alt="WebdriverIO"  style={SVG_STYLE} /> },
];

/* ── Chip positions only (no brand assignment — brands are shuffled at runtime) ── */

// Seeded pseudo-random (deterministic across hydration for position/animation props)
function seededRand(seed: number) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

interface ChipPos {
    id:    number;
    left:  string;
    top:   string;
    bx:    string;
    by:    string;
    dx:    string;
    dy:    string;
    dur:   string;
    delay: string;
}

// 12 fixed positions spread across the hero, avoiding the ~20-80% vertical centre band and keeping top positions below navbar
const EXPLICIT_POS = [
    // ── Far Left ──
    { x:  6, y: 50 },
    { x: 11, y: 26 },
    { x:  8, y: 80 },
    // ── Near-Left ──
    { x: 19, y: 20 },
    { x: 21, y: 91 },
    // ── Centre top & bottom ──
    { x: 38, y: 20 },
    { x: 62, y: 21 },
    { x: 40, y: 92 },
    { x: 60, y: 93 },
    // ── Near-Right ──
    { x: 79, y: 20 },
    { x: 81, y: 90 },
    // ── Far Right ──
    { x: 88, y: 38 },
];

function buildChipPositions(): ChipPos[] {
    return EXPLICIT_POS.map(({ x, y }, idx) => {
        const seed  = idx * 137;
        // Start from center middle (behind text) instead of bottom
        const bx    = `${50 - x}vw`;
        const by    = `${50 - y}vh`;  // Changed from 105 to 50 (middle of viewport)
        const side  = x < 50 ? -1 : 1;
        // Increase horizontal movement, reduce vertical to emphasize left/right motion
        const dx    = side * Math.round(40 + seededRand(seed + 2) * 30);
        const dy    = Math.round(-10 + seededRand(seed + 1) * 20);  // Smaller vertical drift
        const dur   = (7.0 + seededRand(seed + 3) * 3.0).toFixed(1);
        
        // Create wave pattern: logos come in groups/waves
        // Group logos into 3 waves based on index
        const wave = Math.floor(idx / 4);  // 4 logos per wave
        const waveDelay = wave * 0.8;  // Each wave starts 0.8s after previous
        const withinWaveDelay = (idx % 4) * 0.15;  // Slight stagger within each wave
        const delay = (waveDelay + withinWaveDelay).toFixed(2);

        return {
            id:    idx,
            left:  `${x}%`,
            top:   `${y}%`,
            bx,
            by,
            dx:    `${dx}px`,
            dy:    `${dy}px`,
            dur:   `${dur}s`,
            delay: `${delay}s`,
        };
    });
}

// Positions are fixed; only brand assignment shuffles each cycle
const CHIP_POSITIONS = buildChipPositions();

/** Fisher-Yates shuffle returning a NEW array */
function shuffled<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function ServicesHero() {
    const [isMounted, setIsMounted] = useState(false);
    const [chipBrands, setChipBrands] = useState<number[]>([]);

    useEffect(() => {
        setIsMounted(true);
        // Generate initial unique random brands for each position
        const availableIndices = Array.from({ length: BRANDS.length }, (_, i) => i);
        const shuffledAvailable = shuffled(availableIndices);
        const initial = CHIP_POSITIONS.map((_, idx) => shuffledAvailable[idx % BRANDS.length]);
        setChipBrands(initial);
    }, []);

    const handleAnimationIteration = (chipIdx: number) => {
        setChipBrands((prev) => {
            if (prev.length === 0) return prev;
            const next = [...prev];
            const currentBrand = prev[chipIdx];
            
            // Find which brands are currently not visible on any of the chips
            const activeBrands = new Set(prev);
            const unusedBrands = BRANDS.map((_, i) => i).filter(i => !activeBrands.has(i));
            
            let newBrand = currentBrand;
            if (unusedBrands.length > 0) {
                newBrand = unusedBrands[Math.floor(Math.random() * unusedBrands.length)];
            } else {
                const alternatives = BRANDS.map((_, i) => i).filter(i => i !== currentBrand);
                newBrand = alternatives[Math.floor(Math.random() * alternatives.length)];
            }
            
            next[chipIdx] = newBrand;
            return next;
        });
    };

    return (
        <section className="relative overflow-hidden py-16 pt-28 sm:py-32 sm:pt-48 md:py-40 md:pt-56 lg:py-48 lg:pt-64 bg-[#030b1e]">
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

            {/* Scatter-fade keyframe — per spec:
                 0→28%  : fast pop-out, tiny→full size
                 28→100%: continuous slow shrink + fade outward (no frozen hold)
            */}
            <style dangerouslySetInnerHTML={{ __html: `
                .scatter-chip {
                    position: absolute;
                    width: 72px;
                    height: 72px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: popInOut var(--dur) linear infinite both;
                    animation-delay: var(--delay);
                    z-index: 1;
                    pointer-events: none;
                    will-change: transform, opacity;
                    opacity: 0;
                }
                @keyframes popInOut {
                    /* ── Phase 1: pop out from the shared launch point (0 → 28%) ── */
                    0% {
                        opacity: 0;
                        transform: translate(var(--bx), var(--by)) scale(0.05);
                    }
                    12% {
                        opacity: 0.85;
                        transform: translate(calc(var(--bx) * 0.4), calc(var(--by) * 0.4)) scale(1.08);
                    }
                    28% {
                        opacity: 1;
                        transform: translate(0px, 0px) scale(1);
                    }
                    /* ── Phase 2: continuous shrink + drift + fade, no pause (28 → 100%) ── */
                    55% {
                        opacity: 0.72;
                        transform: translate(calc(var(--dx) * 0.35), calc(var(--dy) * 0.35)) scale(0.7);
                    }
                    78% {
                        opacity: 0.35;
                        transform: translate(calc(var(--dx) * 0.7), calc(var(--dy) * 0.7)) scale(0.38);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(var(--dx), var(--dy)) scale(0.05);
                    }
                }
            `}} />

            {/* Chips — positions fixed, brands shuffle on animation iteration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
                {isMounted && CHIP_POSITIONS.map((pos, idx) => {
                    const brandIdx = chipBrands[idx];
                    if (brandIdx === undefined) return null;
                    const brand = BRANDS[brandIdx];
                    if (!brand) return null;
                    return (
                        <div
                            key={pos.id}
                            className="scatter-chip hidden md:flex"
                            style={{
                                left: pos.left,
                                top:  pos.top,
                                "--bx":    pos.bx,
                                "--by":    pos.by,
                                "--dx":    pos.dx,
                                "--dy":    pos.dy,
                                "--dur":   pos.dur,
                                "--delay": pos.delay,
                            } as React.CSSProperties}
                            onAnimationIteration={() => handleAnimationIteration(idx)}
                        >
                            {brand.render()}
                        </div>
                    );
                })}
            </div>


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
        <section className="bg-white pt-4 pb-10 sm:pt-6 sm:pb-14">
            <div className="mx-auto max-w-[1400px] px-6">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-8">
                    Certifications
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
                        className="w-full lg:w-[48%] relative flex items-center justify-center"
                    >
                        <div className="w-full">
                            <CertificationsDiagram />
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
                <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-16 mb-12">
                    <div className="w-full lg:w-[55%] flex items-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                            Enterprise <span className="text-[#00D4AA]">Impact</span><br className="hidden sm:block" />
                            Delivered By Our <span className="text-[#00D4AA]">Experts<span className="text-[#00D4AA]">.</span></span>
                        </h2>
                    </div>
                    <div className="w-full lg:w-[45%] flex items-stretch">
                        <div className="w-[3px] sm:w-1 bg-[#00D4AA] shrink-0 mr-6 rounded-full"></div>
                        <div className="flex items-center">
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
                                Over 220 Projects<br />
                                Delivered Successfully
                            </h3>
                        </div>
                    </div>
                </div>

                {/* ── Carousel ── */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {servicesProjectsData.map((study, idx) => (
                            <div key={idx} className="min-w-0 flex-[0_0_100%]">
                                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
                                    <div className="w-full lg:w-[55%] flex flex-col justify-between">
                                        <div>
                                            <h3 className="whitespace-pre-line text-[22px] sm:text-[28px] font-bold text-slate-900 leading-snug mb-6">
                                            {study.title}
                                        </h3>
                                        <div className="mb-6">
                                            <p className="text-base font-bold text-slate-900 mb-2">Challenge</p>
                                            <p className="whitespace-pre-line text-slate-600 text-sm leading-relaxed">{study.challenge}</p>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-base font-bold text-slate-900 mb-3">Solution</p>
                                            <ul className="space-y-2">
                                                {study.solution.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        </div>
                                        <div className="mt-8 lg:mt-auto pt-4">
                                            <p className="text-lg font-bold text-slate-900 mb-3">Result:</p>
                                            <div className="bg-[#1e90ff]/5 border border-[#1e90ff]/20 rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl"
                                                    dangerouslySetInnerHTML={{
                                                        __html: study.result.replace(
                                                            /(\d[\d,+%\-x\.]*\s*(?:Lighthouse|faster|month|integrations|version|score|per\s+month)?[\w\s]*)/gi,
                                                            '<span class="text-[#1e90ff] font-bold">$1</span>'
                                                        )
                                                    }}
                                                />
                                                <Link
                                                    href={study.href}
                                                    className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1e40af] hover:scale-105 transition-all shadow-md"
                                                >
                                                    Read More <ArrowRightIcon className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-[45%] flex flex-col justify-between">
                                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                                            <Image
                                                src={study.image}
                                                alt={study.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-4 mt-8 lg:mt-auto pt-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={scrollPrev} aria-label="Previous case study" className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors bg-slate-50/50">
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <button onClick={scrollNext} aria-label="Next case study" className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors bg-slate-50/50">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="text-[11px] font-light tracking-[2px] text-slate-400">
                                                <span className="text-[#00D4AA] font-medium">{(idx + 1).toString().padStart(2, '0')}</span> / {servicesProjectsData.length.toString().padStart(2, '0')}
                                            </div>
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
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [shuffledTechs, setShuffledTechs] = useState<any[]>([]);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);

        // Shuffle tech items client-side
        const techs = techShowcaseData.flatMap((cat) =>
            cat.technologies.map((tech) => ({ ...tech, category: cat.category }))
        );
        for (let i = techs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [techs[i], techs[j]] = [techs[j], techs[i]];
        }
        setShuffledTechs(techs);

        return () => mq.removeEventListener("change", handler);
    }, []);

    const activeTechNames = new Set(
        techShowcaseData
            .find((c) => c.category === activeCategory)
            ?.technologies.map((t) => t.name) ?? []
    );

    return (
        <section className="bg-[#ECF6FF] pt-12 sm:pt-16 lg:pt-20 pb-8 lg:pb-10">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">

                {/* Header */}
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-6 mb-8">
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
                <div className="max-w-6xl mx-auto grid grid-cols-2 gap-3 sm:flex sm:flex-nowrap sm:overflow-x-auto sm:no-scrollbar sm:justify-between mb-8 pb-2 w-full">
                    {techShowcaseData.map((category) => (
                        <button
                            key={category.category}
                            onClick={() => setActiveCategory(category.category)}
                            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300 border sm:shrink-0 ${
                                activeCategory === category.category
                                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                                    : "bg-white text-slate-800 border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB]"
                            }`}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>

                {/* Logos — mobile: only active, desktop: all */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
                    {shuffledTechs
                        .filter((tech) => !isMobile || activeCategory === null || activeTechNames.has(tech.name))
                        .map((tech) => {
                            const isCategorySelected = activeCategory !== null;
                            const isHighlighted = isCategorySelected && activeTechNames.has(tech.name);
                            
                            let containerClass = "p-3";
                            if (isCategorySelected) {
                                if (isHighlighted) {
                                    containerClass = "bg-white/40 rounded-xl px-2 py-3 border border-blue-300";
                                } else {
                                    containerClass = "p-3";
                                }
                            }

                            return (
                            <a
                                key={`${tech.category}-${tech.name}`}
                                href={tech.page}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative flex flex-col items-center justify-center transition-all duration-300 ${containerClass}`}
                            >
                                <div 
                                    className="relative w-[60px] h-[40px] transition-transform duration-300 group-hover:scale-110"
                                    style={{ mixBlendMode: "multiply", ...(tech.filter ? { filter: tech.filter } : {}) }}
                                >
                                    <Image
                                        src={tech.logo}
                                        alt={tech.name}
                                        fill
                                        unoptimized={tech.format === "SVG"}
                                        className="object-contain outline-none"
                                    />
                                </div>
                                <span className={`mt-2 text-[11px] font-medium text-center transition-transform duration-300 group-hover:scale-105 ${
                                    isHighlighted ? "text-[#2563EB] font-bold" : "text-slate-500"
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
            { name: "Genesys",        logo: "/tech_logos/GENESYS-1.png",        page: "https://www.genesys.com",        format: "PNG" },
            { name: "Amazon Connect", logo: "/tech_logos/AWS.png",            page: "https://aws.amazon.com/connect/",format: "PNG" },
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
            { name: "Generative AI",      logo: "/images/ai-icons/gen.png",             page: "https://openai.com",                  format: "PNG" },
            { name: "Intelligent Search", logo: "/images/ai-icons/is.png",              page: "https://www.elastic.co",              format: "PNG" },
            { name: "Conversational AI",  logo: "/images/ai-icons/ai.png",              page: "https://cloud.google.com/dialogflow", format: "PNG" },
            { name: "Computer Vision",    logo: "/images/ai-icons/computervs.png",      page: "https://opencv.org",                  format: "PNG" },
            { name: "Recommendations",    logo: "/images/ai-icons/recomendations.png",  page: "https://www.tensorflow.org",          format: "PNG" },
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
        title: "Autonomous Lending Experience with\nFinXServe & Agentforce",
        image: "/images/Case_Studies/Optimized/cs-1.png",
        challenge: "Traditional lending processes relied heavily on loan officers to answer borrower questions, collect documents and guide applicants through the loan journey, creating delays and limiting scalability.",
        solution: [
            "Built Intelligent Lending Concierge to engage applicants throughout the process.",
            "Provide personalized recommendations based on their borrowing needs and eligibility.",
            "Automated document collection, follow-ups and application progression.",
            "Enabled a self-service lending experience across digital channels.",
        ],
        result: "Delivered personalized borrower guidance through an intelligent lending concierge, accelerating product launches by 80%.",
        href: "/insights/case-studies/autonomous-lending-experiences",
    },
    {
        title: "Modernizing Contact Centers with\nIntelligent IVR Self-Service",
        image: "/images/Case_Studies/Optimized/cs-3.png",
        challenge: "A large percentage of inbound calls involved routine account inquiries, increasing\nagent workload and extending customer wait times.",
        solution: [
            "Automated high-volume inquiries through intelligent self-service IVR workflows.",
            "Created guided IVR journeys for balance inquiries, account information and service requests.",
            "Integrated voice authentication to securely verify customers before service delivery.",
            "Routed only complex requests to agents while resolving routine inquiries automatically.",
        ],
        result: "Reduced routine agent interactions through intelligent IVR self-service, improving call handling efficiency by 30%.",
        href: "/insights/case-studies/intelligent-ivr-self-service",
    },
    {
        title: "Autonomous Freight Operations\nwith GenAI",
        image: "/images/Case_Studies/Optimized/cs-4.png",
        challenge: "Freight teams spent significant time manually reviewing shipment documents, extracting\ndata and creating loads, resulting in delays and operational inefficiencies.",
        solution: [
            "Implemented Intelligent Document Processing to automatically classify freight documents.",
            "Extracted shipment details from rate confirmations, bills of lading and carrier documents.",
            "Validated extracted data against operational rules and freight workflows.",
            "Automated load creation and reduced manual data entry across freight operations.",
        ],
        result: "Reduced manual freight paperwork through Intelligent Document Processing with 99.69% accuracy.",
        href: "/insights/case-studies/autonomous-freight-operations",
    },
    {
        title: "Faster Loan Processing with\nAgentforce Document Intelligence",
        image: "/images/Case_Studies/Optimized/cs-2.png",
        challenge: "Manual document reviews and verification processes delayed loan approvals and\ncreated friction for borrowers.",
        solution: [
            "Deployed AI-powered document intelligence for loan document processing.",
            "Automated document classification, extraction and validation.",
            "Enabled real-time identity verification and data checks.",
            "Streamlined the lending workflow from application to decision.",
        ],
        result: "Accelerated lending decisions through AI-powered document intelligence, completing loan applications in under 2 minutes.",
        href: "/insights/case-studies/instant-loan-processing",
    },
    {
        title: "Cost-Optimized Document\nPlatform on AWS",
        image: "/images/Case_Studies/Optimized/cs-22.png",
        challenge: "An enterprise document management platform faced rising infrastructure costs, limited\nscalability and increasing maintenance overhead.",
        solution: [
            "Migrated the document platform to AWS cloud infrastructure.",
            "Optimized storage and compute resources based on usage patterns.",
            "Automated deployment, monitoring and scaling processes.",
            "Modernized the platform architecture for improved efficiency and resilience.",
        ],
        result: "Reduced infrastructure costs by over 50% through a cloud-native document management platform on AWS.",
        href: "/insights/case-studies/cost-optimized-document-platform-on-aws",
    },
    {
        title: "Frictionless Customer Authentication\nfor Secure Banking",
        image: "/images/Case_Studies/Optimized/cs-7.png",
        challenge: "A financial institution needed to strengthen security while eliminating the friction of\npasswords, security questions and lengthy verification processes.",
        solution: [
            "Implemented voice biometric authentication for customer verification.",
            "Introduced passive identity verification during customer interactions.",
            "Integrated authentication seamlessly into IVR journeys.",
            "Automated customer verification without relying on traditional credentials.",
        ],
        result: "Eliminated password-based verification through voice biometric authentication for a faster, frictionless customer experience.",
        href: "/insights/case-studies/customer-authentication",
    },
    {
        title: "Intelligent School Administration\nfor Modern Institutions",
        image: "/images/Case_Studies/Eazyschool_admin.png",
        challenge: "Schools relied on disconnected systems and manual processes that made administration,\nreporting and communication inefficient.",
        solution: [
            "Built a unified platform to centralize school administration activities.",
            "Automated attendance, reporting and academic management workflows.",
            "Connected teachers, administrators, students and parents on a single platform.",
            "Improved visibility into academic and operational performance.",
        ],
        result: "Reduced administrative workload by 80% through a unified platform connecting school operations, teachers and parents.",
        href: "/insights/case-studies/eazyschool-admin",
    },
    {
        title: "Transforming Claims Operations with a\nScalable Digital Platform",
        image: "/images/Case_Studies/Optimized/cs-17.png",
        challenge: "Claims teams relied on disconnected systems and manual coordination to assign, track\nand process claims, limiting visibility and slowing resolution times.",
        solution: [
            "Built a unified digital platform to manage the end-to-end claims lifecycle.",
            "Automated claim intake, assignment, approvals and workflow orchestration.",
            "Enabled real-time visibility into claim status, workloads and operational performance.",
            "Equipped field teams with mobile-first capabilities for inspections, updates and documentation.",
        ],
        result: "Accelerated claims processing through end-to-end digital claims orchestration with real-time operational visibility.",
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
                <WhyHynivaServices />
                <CertificationsScroll />
                <WorkThatSpeaks />
            </main>
            <Footer />
        </>
    );
}