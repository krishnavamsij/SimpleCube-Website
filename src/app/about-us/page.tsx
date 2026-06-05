"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Testimonials } from "@/components/testimonials";
import { scrollReveal, fadeInUp, staggerContainer, viewportOnce, EASE_OUT_QUART } from "@/lib/animations";
import { ArrowUpRightIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─────────────── Leadership Team Data ─────────────── */
const leadershipTeam = [
    {
        name: "Rajesh Kumar",
        title: "Founder & CEO",
        bio: "15+ years of enterprise technology leadership",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
    },
    {
        name: "Priya Sharma",
        title: "Chief Technology Officer",
        bio: "Platform architecture and innovation strategy",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80"
    },
    {
        name: "Anil Gupta",
        title: "Chief Operating Officer",
        bio: "Enterprise delivery and operations excellence",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80"
    },
    {
        name: "Meera Patel",
        title: "VP Product & Strategy",
        bio: "Product vision and strategic partnerships",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
    },
];

/* ─────────────── Timeline Data ─────────────── */
const timeline = [
    {
        year: "2009",
        title: "Foundation",
        description: "Hyniva founded with a vision to simplify enterprise complexity"
    },
    {
        year: "2013",
        title: "First Product Launch",
        description: "Released core platform serving regulated industries"
    },
    {
        year: "2017",
        title: "Scale & Expansion",
        description: "Expanded to 15+ enterprise clients across sectors"
    },
    {
        year: "2020",
        title: "Digital Transformation",
        description: "Launched Digital Factory model for accelerated delivery"
    },
    {
        year: "2023",
        title: "Product Portfolio Growth",
        description: "Launched 4 new products, 220+ applications delivered"
    },
    {
        year: "2025",
        title: "Industry Recognition",
        description: "Recognized as leader in enterprise software delivery"
    },
];

/* ─────────────── Sections Data ─────────────── */
const operationsPillars = [
    {
        title: "Direct Access to Expertise",
        description: "Our model enables direct engagement with senior leaders and domain experts, ensuring faster decisions, clear ownership, and end-to-end accountability."
    },
    {
        title: "Client-Centricity",
        description: "We align closely with our clients' strategic priorities, tailoring every engagement to deliver measurable and sustainable outcomes."
    },
    {
        title: "Transparency & Trust",
        description: "We operate with clarity and candor. From opportunities to risks, we communicate proactively to enable better decisions and stronger partnerships."
    },
    {
        title: "Agility with Impact",
        description: "Our lean structure creates a distinct competitive edge, enabling focused execution and delivering outsized impact."
    },
];

const workProcess = [
    {
        number: "1",
        title: "Discovery",
        description: "We understand your workflows, challenges, systems, and long-term goals before defining the right approach."
    },
    {
        number: "2",
        title: "Strategy & Planning",
        description: "We align on scope, timelines, architecture, and priorities with complete transparency from the start."
    },
    {
        number: "3",
        title: "Build & Iterate",
        description: "Our teams execute in agile cycles with regular demos, rapid feedback, and continuous collaboration."
    },
    {
        number: "4",
        title: "Launch & Evolve",
        description: "We support, optimize, and scale your solution as your business grows, ensuring long-term value."
    },
];

const differentiators = [
    {
        title: "Single-Team Ownership",
        description: "One team owns your engagement from strategy through production, ensuring continuity, clarity, and accountability at every stage."
    },
    {
        title: "Deep Industry Context",
        description: "With over 15 years of experience in regulated industries, we understand the landscape, reducing ramp-up time and accelerating delivery."
    },
    {
        title: "Speed with Structure",
        description: "Our Digital Factory model combines agility with discipline, enabling faster delivery without compromising quality."
    },
    {
        title: "Product and Delivery Mindset",
        description: "We bring the thinking of a product builder and the rigor of an implementation partner, ensuring solutions are both scalable and practical."
    },
];

/* ─────────────── Foundation Component ─────────────── */
function FoundationSection() {
    const foundations = [
        {
            title: "Agility",
            description: "Powers our ability to move with speed and precision through our Digital Factory model."
        },
        {
            title: "People",
            description: "Drive outcomes through ownership, collaboration, and a deep commitment to customer success."
        },
        {
            title: "Innovation",
            description: "Reflects our product engineering mindset and technical depth, enabling us to turn ideas into impact."
        },
    ];

    return (
        <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-b from-white to-slate-50">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-display">
                        Our Foundation
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        At the core of Hyniva are three defining strengths: <span className="font-semibold">Agility, People, and Innovation</span>. We call it the <span className="font-semibold">Hyniva API</span>.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-8 md:grid-cols-3"
                >
                    {foundations.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-300"
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
                            <h3 className="text-2xl font-bold text-slate-900 font-display relative z-10">
                                {item.title}
                            </h3>
                            <p className="mt-4 text-slate-600 leading-relaxed relative z-10">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Key Metrics Component ─────────────── */
function KeyMetrics() {
    const metrics = [
        { value: "220+", label: "Applications\nDelivered" },
        { value: "30+", label: "Enterprise\nClients" },
        { value: "15+", label: "Years of Platform\nPartnerships" },
        { value: "7", label: "Products\nBuilt" },
    ];

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-8 sm:grid-cols-2 md:grid-cols-4"
        >
            {metrics.map((metric, idx) => (
                <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="flex flex-col items-center sm:items-start text-center sm:text-left"
                >
                    <div className="text-4xl sm:text-5xl font-bold text-blue-600 font-display">
                        {metric.value}
                    </div>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium whitespace-pre-line">
                        {metric.label}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    );
}

/* ─────────────── Leadership Section ─────────────── */
function LeadershipSection() {
    return (
        <section className="py-20 sm:py-28 md:py-32 bg-white">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-display">
                        Our Leadership Team
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Deep expertise across technology, product engineering, and enterprise delivery.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                >
                    {leadershipTeam.map((leader, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="group overflow-hidden rounded-lg bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-slate-300 transition-all duration-300"
                        >
                            {/* Grayscale Image */}
                            <div className="relative h-64 overflow-hidden bg-slate-100 group-hover:bg-slate-200 transition-colors">
                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            
                            {/* Info */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-slate-900 font-display">
                                    {leader.name}
                                </h3>
                                <p className="mt-1 text-sm font-semibold text-blue-600">
                                    {leader.title}
                                </p>
                                <p className="mt-3 text-sm text-slate-600">
                                    {leader.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── How We Operate Section ─────────────── */
function HowWeOperateSection() {
    return (
        <section className="py-20 sm:py-28 md:py-32 bg-slate-50">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-display">
                        How We Operate
                    </h2>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-6 md:grid-cols-2"
                >
                    {operationsPillars.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="group flex gap-6 rounded-xl bg-white p-8 shadow-sm hover:shadow-md transition-all border border-slate-200 hover:border-blue-300"
                        >
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                                    <span className="text-lg font-bold text-blue-600 font-display">{idx + 1}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900 font-display">
                                    {pillar.title}
                                </h3>
                                <p className="mt-2 text-slate-600 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── How We Work Section ─────────────── */
function HowWeWorkSection() {
    return (
        <section className="py-20 sm:py-28 md:py-32 bg-white">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-display">
                        How We Work
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        From strategy to scale, built for clarity at every step.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="space-y-8"
                >
                    {workProcess.map((step, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="group relative"
                        >
                            {/* Connector line */}
                            {idx < workProcess.length - 1 && (
                                <div className="absolute left-8 top-24 h-12 w-0.5 bg-gradient-to-b from-blue-300 to-blue-100 hidden sm:block" />
                            )}

                            <div className="flex gap-6 sm:gap-8">
                                {/* Number circle */}
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg group-hover:shadow-xl transition-shadow">
                                        <span className="text-2xl font-bold text-white font-display">{step.number}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-2">
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 text-slate-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Digital Factory Model Section ─────────────── */
function DigitalFactorySection() {
    return (
        <section className="py-20 sm:py-28 md:py-32 bg-slate-50">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-display">
                        Digital Factory Model
                    </h2>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-8 md:grid-cols-2"
                >
                    {[
                        {
                            title: "Structured Agility",
                            points: ["Process discipline", "Quality gates", "Repeatable workflows", "Predictable outcomes"]
                        },
                        {
                            title: "Lean Execution",
                            points: ["Focused teams", "Minimal overhead", "Clear accountability", "Rapid iteration"]
                        }
                    ].map((box, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="rounded-2xl bg-white p-10 shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 font-display">
                                {box.title}
                            </h3>
                            <ul className="mt-8 space-y-4">
                                {box.points.map((point, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-blue-600" />
                                        <span className="text-slate-600">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── What Sets Us Apart Section ─────────────── */
function WhatSetsUsApartSection() {
    return (
        <section className="py-20 sm:py-28 md:py-32 bg-white">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-display">
                        What Sets Us Apart
                    </h2>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-8 md:grid-cols-2"
                >
                    {differentiators.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-8 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg"
                        >
                            <div className="absolute -top-8 -right-8 h-32 w-32 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="relative text-lg font-bold text-slate-900 font-display flex items-start gap-3">
                                <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                {item.title}
                            </h3>
                            <p className="relative mt-4 text-slate-600 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Timeline Section ─────────────── */
function TimelineSection() {
    return (
        <section className="py-20 sm:py-28 md:py-32 bg-slate-50">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-display">
                        Our Journey
                    </h2>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="relative space-y-8"
                >
                    {/* Timeline line */}
                    <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-100 sm:-translate-x-1/2" />

                    {timeline.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className={`relative flex gap-8 sm:gap-0 ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                        >
                            {/* Timeline dot */}
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white border-4 border-blue-600 shadow-lg">
                                    <div className="h-8 w-8 rounded-full bg-blue-600" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 sm:w-1/2 ${idx % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                                <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <span className="text-2xl font-bold text-blue-600 font-display">{item.year}</span>
                                    <h3 className="mt-2 text-lg font-bold text-slate-900 font-display">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-slate-600">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── What We Believe Section ─────────────── */
function WhatWeBelieveSection() {
    return (
        <section className="py-20 sm:py-28 md:py-32 bg-gradient-to-br from-blue-600 to-blue-700">
            <div className="mx-auto max-w-4xl px-6 sm:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display">
                        What We Believe
                    </h2>
                    <p className="mt-8 text-lg sm:text-xl text-blue-50 leading-relaxed">
                        We believe technology should simplify complexity, enable growth, and create meaningful impact. At Hyniva, we build solutions that are practical, scalable, and designed for real-world adoption—combining product thinking, engineering excellence, and long-term partnership in everything we do.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Hero Section ─────────────── */
function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                <div className="absolute -bottom-8 right-10 w-72 h-72 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 py-28 sm:py-32 md:py-40">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Eyebrow */}
                    <motion.div variants={fadeInUp}>
                        <span className="eyebrow text-blue-300 bg-blue-500/10 border border-blue-400/30 backdrop-blur-md">
                            <span className="dot bg-blue-400 shadow-blue-400" />
                            Who We Are
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeInUp}
                        className="mt-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white font-display max-w-4xl"
                    >
                        Where Product Thinking Meets Enterprise Execution
                    </motion.h1>

                    {/* Callout */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-10 sm:mt-12 max-w-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-400/30 rounded-xl p-6 sm:p-8 backdrop-blur-sm"
                    >
                        <p className="text-lg sm:text-xl text-blue-50 leading-relaxed font-medium">
                            Our mission is to simplify enterprise complexity through products and technology services that deliver measurable outcomes and enable organizations to scale with confidence.
                        </p>
                    </motion.div>

                    {/* Metrics */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-16 sm:mt-20"
                    >
                        <KeyMetrics />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Main Page Component ─────────────── */
export default function AboutUsPage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FoundationSection />
            <HowWeOperateSection />
            <HowWeWorkSection />
            <DigitalFactorySection />
            <WhatSetsUsApartSection />
            <LeadershipSection />
            <TimelineSection />
            <WhatWeBelieveSection />
            <Testimonials />
            <Footer />
        </>
    );
}
