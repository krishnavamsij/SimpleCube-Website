"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { heroSlides, heroCtas } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { HeroPuzzle } from "@/components/hero-puzzle";

// GIF per slide — removed as unused in current high-fidelity 3D hero


// Triangle layout: card 0 = top full-width, card 1 = bottom-left, card 2 = bottom-right
const cardPositions = [
    { top: 0, left: 0, right: 0, height: "54%", bottom: "auto", width: "auto" },
    { bottom: 0, left: 0, top: "auto", height: "43%", width: "48.5%", right: "auto" },
    { bottom: 0, right: 0, top: "auto", height: "43%", width: "48.5%", left: "auto" },
];

export function HeroCarousel() {
    const slides = heroSlides;
    // Set to the 'Build in Weeks, Not Months' slide index
    const currentSlide = 1;
    const slide = slides[currentSlide];

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#030b1e]">
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

            {/* Two-column layout */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center px-6 lg:flex-row lg:gap-0">
                {/* ── LHS: Text ── */}
                <div className="flex w-full flex-col justify-center pb-10 pt-28 lg:w-1/2 lg:pb-12 lg:pr-10 lg:pt-28">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="hero-content"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Badge / Eyebrow */}
                            <motion.div variants={fadeInUp}>
                                <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 backdrop-blur-md">
                                    <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                                    AI-powered Software Delivery
                                </span>
                            </motion.div>
 
                            {/* Headline */}
                            <motion.h1
                                variants={fadeInUp}
                                className="mt-10 text-4xl font-[900] leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[68px] lg:mt-14 font-display"
                            >
                                Build in <span className="text-[#00D4AA]">weeks,</span><br />
                                not <span className="text-[#00D4AA]">months.</span>
                            </motion.h1>
 
                            {/* Subheadline */}
                            <motion.p
                                variants={fadeInUp}
                                className="mt-8 w-full text-lg leading-relaxed text-slate-300 sm:text-xl font-medium max-w-xl lg:mt-12"
                            >
                                We combine deep industry knowledge, proven engineering models and the platforms your business already runs on. So you get outcomes, not overhead.
                            </motion.p>

                            {/* Hero Metrics Row */}
                            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-10 sm:gap-14 lg:mt-16 lg:gap-24">
                                {[
                                    { value: "50%", label: "Less Planning\nTime" },
                                    { value: "40%", label: "Quicker\nDelivery" },
                                    { value: "30%", label: "Faster\nPOC" }
                                ].map((stat, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <div className="flex items-baseline gap-1 mb-2">
                                            <span className="text-3xl sm:text-4xl font-[900] text-white leading-none font-display">
                                                {stat.value.replace('%', '')}
                                            </span>
                                            <span className="text-2xl sm:text-3xl font-black text-white leading-none">%</span>
                                        </div>
                                        <span className="text-[14px] sm:text-[15px] text-slate-400 font-medium whitespace-pre-line leading-tight">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
 
                            {/* CTAs */}
                            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4 lg:mt-16">
                                <Button size="lg" asChild className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] border border-[#3B82F6]/30 rounded-full font-bold px-8 h-14">
                                    <Link href={heroCtas.primary.href}>
                                        {heroCtas.primary.label} <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-2 border-white/40 bg-white/10 text-white font-semibold backdrop-blur-sm hover:bg-transparent hover:border-white/40 hover:text-[#3B82F6] transition-all duration-300 rounded-full px-8 h-14">
                                    <Link href={heroCtas.secondary.href}>
                                        {heroCtas.secondary.label}
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── RHS: Single High-Fidelity Animation ── */}
                <div className="relative hidden lg:flex lg:mt-0 lg:h-auto lg:min-h-screen lg:w-1/2 lg:items-center lg:justify-center">
                    <HeroPuzzle />
                </div>
            </div>

            {/* Navigation arrows and indicators removed for static hero */}
        </section>
    );
}
