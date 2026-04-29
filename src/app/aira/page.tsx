"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
    Brain,
    Plug,
    Shield,
    Eye,
    MessagesSquare,
    FileSearch,
    BarChart3,
    Settings2,
    Boxes,
    Clock,
    UserCheck,
    TrendingDown,
    Lightbulb,
    Scale,
    ArrowUpRightIcon,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    fadeInUp,
    staggerContainer,
} from "@/lib/animations";

/* ─────────────── Data ─────────────── */

const differentiators = [
    {
        icon: Brain,
        title: "Autonomous Reasoning at Scale",
        description:
            "Executes multi-step reasoning, orchestrates specialized agents, and delivers end-to-end workflows — going beyond answers to drive efficiency, accuracy, and intelligent automation",
    },
    {
        icon: Plug,
        title: "Frictionless Integration",
        description:
            "At the heart of AIRA is OneAPI — a breakthrough integration framework that reduces onboarding from months to weeks, eliminating costly, complex system integrations.",
    },
    {
        icon: Boxes,
        title: "Modular & Future-Proof",
        description:
            "Pre-built agents for chat, transactions, documents, and omnichannel service - extensible as technology and regulations evolve.",
    },
    {
        icon: Scale,
        title: "Bias-Aware, Configurable AI",
        description:
            "Responses are customizable to align with compliance rules, regulatory policies, and institutional brand standards.",
    },
    {
        icon: Shield,
        title: "Enterprise-Grade Security & Compliance",
        description:
            "Every output is validated through guardrails, compliance engines, and audit trails designed for financial regulation.",
    },
];

const capabilities = [
    {
        icon: MessagesSquare,
        title: "Omnichannel Experience",
        description: "Support for customer interactions across web, mobile, IVR, email, and messaging platforms.",
    },
    {
        icon: FileSearch,
        title: "Intelligent Document Processing",
        description: "Automates KYC, compliance, and transaction documentation with real-time validation.",
    },
    {
        icon: Eye,
        title: "Visual Intelligence",
        description: "Extracts and verifies data from images and video, supporting areas like fraud detection and claims.",
    },
    {
        icon: UserCheck,
        title: "Contextual Memory",
        description: "Retains institutional knowledge and client history for consistent, personalized service.",
    },
    {
        icon: BarChart3,
        title: "Observability & Analytics",
        description: "Real-time logging, tracing, and metrics to meet regulatory audit and SLA requirements.",
    },
    {
        icon: Settings2,
        title: "No-Code Administration",
        description: "Empower business teams to configure workflows, prompts, and compliance guardrails without developer dependency.",
    },
];

const impacts = [
    {
        icon: Clock,
        title: "Instant, Always-On Support",
        description: "Provides 24/7 intelligent assistance, ensuring clients get critical services and information instantly, without delays.",
    },
    {
        icon: UserCheck,
        title: "Personalized Client Interactions",
        description: "Context-aware responses powered by transaction history and preferences, enabling hyper-personalized experiences.",
    },
    {
        icon: TrendingDown,
        title: "Cost-Effective Operations",
        description: "Automates routine, high-volume tasks — cutting operational overhead, lowering manual effort, and boosting efficiency across teams and processes.",
    },
];

/* ─────────────── Hero ─────────────── */

function AiraHero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={ref} className="relative min-h-screen overflow-hidden">
            {/* Background image */}
            <motion.div style={{ y: imageY }} className="absolute inset-x-0 inset-y-0 lg:left-1/2 lg:w-1/2">
                <Image src="/images/Product Images/AIRA.gif" alt="" fill priority className="object-cover lg:object-contain" />
            </motion.div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 via-indigo-800/85 to-purple-900/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 pt-24 pb-20">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <motion.span
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        AI / Automation Product
                    </motion.span>

                    <motion.h1
                        variants={fadeInUp}
                        className="mt-8 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
                        style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                        Autonomous Intelligent<br />Reasoning Agent
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                        The enterprise-ready AI platform built for financial institutions — delivering accuracy, execution, and compliance at scale
                    </motion.p>

                    <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
                        <Button size="lg" asChild className="bg-white text-blue-700 font-bold shadow-xl hover:bg-blue-50">
                            <Link href="/contact">
                                Get Started <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="border-2 border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                            <Link href="#capabilities">See Capabilities</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Intro ─────────────── */

function AiraIntro() {
    return (
        <section className="bg-slate-50 dark:bg-slate-900 py-16 sm:py-24">
            <div className="mx-auto max-w-[1000px] px-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-left bg-white dark:bg-slate-950 shadow-xl border border-border/50 rounded-3xl p-10 md:p-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-[#3b5998] dark:text-blue-400 sm:text-4xl">
                        Introducing AIRA
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        AIRA (Autonomous Intelligent Reasoning Agent) is the first enterprise-ready AI platform for financial services that unifies autonomous reasoning, compliance-first design, and OneAPI integration. By combining these capabilities in a single solution, AIRA delivers safe, explainable, and scalable intelligence—empowering institutions to innovate at speed while maintaining trust and regulatory rigor.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Differentiators ─────────────── */

function AiraDifferentiators() {
    return (
        <section className="bg-slate-50 dark:bg-slate-900 pb-16 sm:pb-24 pt-8">
            <div className="mx-auto max-w-[1400px] px-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-[#3b5998] dark:text-blue-400 sm:text-4xl lg:text-5xl">
                        What Makes AIRA Different
                    </h2>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {differentiators.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={scrollReveal}
                            className="group relative overflow-hidden text-center sm:text-left rounded-xl bg-white dark:bg-slate-950 p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="mb-6 flex sm:justify-start justify-center">
                                <item.icon className="h-10 w-10 text-foreground" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Key Capabilities ─────────────── */

function AiraCapabilities() {
    return (
        <section id="capabilities" className="bg-[#0b1021] py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-16">
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Key Capabilities
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
                        AIRA brings a financial-services lens to every capability
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {capabilities.map((cap) => (
                        <motion.div
                            key={cap.title}
                            variants={scrollReveal}
                            className="group rounded-xl border border-slate-700 bg-slate-800/50 p-7 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-800"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10">
                                <cap.icon className="h-6 w-6 text-cyan-400" />
                            </div>
                            <h3 className="text-base font-bold text-white">{cap.title}</h3>
                            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{cap.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── CEO Vision ─────────────── */

function CeoVision() {
    return (
        <section className="bg-slate-50 dark:bg-slate-900 py-20 sm:py-28">
            <div className="mx-auto max-w-[900px] px-6 text-center sm:text-left flex flex-col items-center">
                <p className="text-3xl font-extrabold tracking-tight text-[#3b5998] dark:text-blue-400 mb-10">CEO's Vision</p>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="flex flex-col items-center gap-10 sm:flex-row"
                >
                    <div className="flex-shrink-0">
                        <div className="h-44 w-40 overflow-hidden bg-muted relative">
                            {/* Avatar placeholder, replace with real image if found */}
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-400 to-slate-600">
                                <span className="text-3xl font-bold text-white">SJ</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <blockquote className="text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                            “When we built AIRA, our vision was clear: AI that financial institutions can finally trust with mission-critical decisions. AIRA combines reasoning, compliance, and OneAPI-powered integration into a single, scalable platform. It's not just about solving today's challenges — it's about empowering the industry to reimagine what's possible with GenAI for customers, regulators, and institutions alike.”
                        </blockquote>
                        <p className="mt-4 text-base font-bold text-[#3b5998] dark:text-blue-400">Sreeram Jadapolu,</p>
                        <p className="text-base text-muted-foreground">Founder & CEO, Hyniva</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Enterprise Impact ─────────────── */

function EnterpriseImpact() {
    return (
        <section className="bg-[#0b1021] py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Enterprise Impact
                    </h2>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 grid gap-6 sm:grid-cols-3"
                >
                    {impacts.map((item, index) => (
                        <motion.div
                            key={item.title}
                            variants={scrollReveal}
                            className={`group relative overflow-hidden rounded-xl p-8 shadow-sm transition-all duration-300 ${index === 1 ? 'bg-[#3b5998] text-white' : 'bg-white text-foreground'
                                }`}
                        >
                            <div className="mb-6 flex">
                                <item.icon className="h-10 w-10 opacity-80" strokeWidth={1} />
                            </div>
                            <h3 className="text-lg font-medium">{item.title}</h3>
                            <p className={`mt-3 text-sm leading-relaxed ${index === 1 ? 'text-white/90' : 'text-muted-foreground'}`}>{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── CTA ─────────────── */

function AiraCta() {
    return (
        <motion.section
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center text-white sm:py-28"
        >
            <div className="mx-auto max-w-[700px] px-6">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    Ready to Transform Your Customer Experience?
                </h2>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-blue-100 sm:text-lg">
                    See how AIRA can deliver intelligent, compliant, always-on support for your institution.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/contact"
                        className="inline-block rounded-lg bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        Request a Demo
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-block rounded-lg border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20"
                    >
                        Talk to Sales
                    </Link>
                </div>
            </div>
        </motion.section>
    );
}

/* ─────────────── Page ─────────────── */

export default function AiraPage() {
    return (
        <>
            <Navbar />
            <AiraHero />
            <AiraIntro />
            <AiraDifferentiators />
            <AiraCapabilities />
            <CeoVision />
            <EnterpriseImpact />
            <AiraCta />
            <Footer />
        </>
    );
}
