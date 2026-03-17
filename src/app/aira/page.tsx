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
            "Executes multi-step reasoning, orchestrates specialized agents, and delivers end-to-end workflows — going beyond answers to drive efficiency, accuracy, and intelligent automation.",
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
            "Pre-built agents for chat, transactions, documents, and omnichannel service — extensible as technology and regulations evolve.",
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
        description: "Provides 24/7 intelligent assistance, ensuring clients get critical services and information instantly.",
    },
    {
        icon: UserCheck,
        title: "Personalized Client Interactions",
        description: "Context-aware responses powered by transaction history and preferences, enabling hyper-personalized experiences.",
    },
    {
        icon: TrendingDown,
        title: "Cost-Effective Operations",
        description: "Automates routine, high-volume tasks — cutting operational overhead and boosting efficiency across teams.",
    },
    {
        icon: Lightbulb,
        title: "Proactive Financial Guidance",
        description: "Offers personalized, real-time financial insights that help clients make smarter decisions.",
    },
    {
        icon: Shield,
        title: "Regulatory Confidence",
        description: "Built-in compliance engine that adapts to changing regulations — audit-ready from day one.",
    },
    {
        icon: BarChart3,
        title: "Data-Driven Decision Making",
        description: "Surfaces operational and customer insights that drive strategic improvements and revenue growth.",
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
            <motion.div style={{ y: imageY }} className="absolute inset-0">
                <Image src="/images/ai-agent.png" alt="" fill priority className="object-cover" />
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
                        className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
                        style={{ fontFamily: "var(--font-bricolage)" }}
                    >
                        AIRA
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="mt-2 text-xl font-medium text-white/80 sm:text-2xl">
                        Autonomous Intelligent Reasoning Agent
                    </motion.p>
                    <motion.p variants={fadeInUp} className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                        The enterprise-ready AI platform built for financial institutions — delivering accuracy, execution, and compliance at scale.
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
        <section className="bg-background py-20 sm:py-28">
            <div className="mx-auto max-w-[800px] px-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Introducing AIRA</p>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        The first enterprise-ready AI platform for financial services
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        AIRA (Autonomous Intelligent Reasoning Agent) unifies autonomous reasoning, compliance-first design, and OneAPI integration. By combining these capabilities in a single solution, AIRA delivers safe, explainable, and scalable intelligence — empowering institutions to innovate at speed while maintaining trust and regulatory rigor.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Differentiators ─────────────── */

function AiraDifferentiators() {
    return (
        <section className="bg-secondary py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Why AIRA</p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        What Makes AIRA Different
                    </h2>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {differentiators.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={scrollReveal}
                            className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                        >
                            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
                                <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
        <section id="capabilities" className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Platform</p>
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
        <section className="bg-background py-20 sm:py-28">
            <div className="mx-auto max-w-[900px] px-6">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="flex flex-col items-center gap-10 sm:flex-row"
                >
                    {/* Avatar placeholder */}
                    <div className="flex-shrink-0">
                        <div className="h-28 w-28 overflow-hidden rounded-2xl border-2 border-border bg-muted shadow-lg">
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
                                <span className="text-3xl font-bold text-white">SJ</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">CEO&apos;s Vision</p>
                        <blockquote className="mt-3 text-base leading-relaxed text-muted-foreground italic sm:text-lg">
                            &ldquo;When we built AIRA, our vision was clear: AI that financial institutions can finally trust with mission-critical decisions. AIRA combines reasoning, compliance, and OneAPI-powered integration into a single, scalable platform. It&apos;s not just about solving today&apos;s challenges — it&apos;s about empowering the industry to reimagine what&apos;s possible with GenAI.&rdquo;
                        </blockquote>
                        <p className="mt-4 text-sm font-bold text-foreground">Sreeram Jadapolu</p>
                        <p className="text-sm text-muted-foreground">Founder &amp; CEO, Hyniva</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Enterprise Impact ─────────────── */

function EnterpriseImpact() {
    return (
        <section className="bg-secondary py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Results</p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Enterprise Impact
                    </h2>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {impacts.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={scrollReveal}
                            className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                        >
                            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950">
                                <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
