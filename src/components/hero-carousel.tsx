"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { heroSlides, heroCtas } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { HeroPuzzle } from "@/components/hero-puzzle";
import { CONTAINER_CLASS } from "@/lib/container-utils";

export function HeroCarousel() {
    const slides = heroSlides;
    // Set to the 'Build in Weeks, Not Months' slide index
    const currentSlide = 1;

    return (
        <section id="hero-section" className="relative min-h-screen overflow-hidden bg-[#030b1e]">
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

            {/* Two-column layout with standardized container */}
            <div className={`relative z-10 flex min-h-screen flex-col items-center lg:flex-row lg:gap-0 ${CONTAINER_CLASS}`}>
                {/* ── LHS: Text ── */}
                <div className="flex w-full flex-col justify-center pb-2 pt-24 sm:pb-4 sm:pt-28 md:pb-4 md:pt-32 lg:w-1/2 lg:pb-6 lg:pr-10 lg:pt-20 xl:pt-24 2xl:pt-28">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="hero-content"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Badge / Eyebrow */}
                            <motion.div variants={fadeInUp}>
                                <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 backdrop-blur-md text-[9px] xl:text-[10px]">
                                    <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                                    AI-powered Software Delivery
                                </span>
                            </motion.div>
 
                            {/* Headline */}
                            <motion.h1
                                variants={fadeInUp}
                                className="mt-8 xl:mt-10 2xl:mt-14 text-4xl font-[900] leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[68px] font-display text-balance"
                            >
                                Build in <span className="text-[#00D4AA]">weeks,</span><br />
                                not <span className="text-[#00D4AA]">months.</span>
                            </motion.h1>
 
                            {/* Subheadline */}
                            <motion.p
                                variants={fadeInUp}
                                className="mt-6 xl:mt-8 2xl:mt-12 w-full text-base sm:text-lg lg:text-lg 2xl:text-xl leading-relaxed text-slate-300 font-medium max-w-3xl"
                            >
                                Powered by 20+ years of experience across multiple industries, we focus on delivering business outcomes without adding complexity or overhead.
                            </motion.p>

                            {/* Hero Metrics Row */}
                            <motion.div 
                                variants={fadeInUp} 
                                className="mt-8 xl:mt-10 2xl:mt-16 grid grid-cols-3 gap-x-2 gap-y-4 sm:flex sm:flex-row sm:flex-nowrap sm:items-start sm:gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 w-full sm:w-auto"
                            >
                                {[
                                    { value: "50%", label: "Less Planning\nTime" },
                                    { value: "40%", label: "Quicker\nDelivery" },
                                    { value: "30%", label: "Faster\nPOC" }
                                ].map((stat, idx) => (
                                    <div key={idx} className="flex flex-col items-start text-left sm:items-start sm:text-left w-full sm:w-auto">
                                        <div className="flex items-baseline justify-start gap-0.5 mb-1 sm:mb-2 xl:mb-3">
                                            <span className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-[900] text-white leading-none font-display">
                                                {stat.value.replace('%', '')}
                                            </span>
                                            <span className="text-lg sm:text-2xl lg:text-2xl xl:text-3xl font-black text-white leading-none">%</span>
                                        </div>
                                        <span className="text-[10px] sm:text-[12px] lg:text-[13px] xl:text-[15px] text-slate-400 font-semibold whitespace-pre-line leading-[1.4]">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
 
                            {/* CTAs */}
                            <motion.div variants={fadeInUp} className="mt-8 xl:mt-10 2xl:mt-16 flex flex-wrap gap-3 xl:gap-4">
                                <Button size="lg" asChild className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] border border-[#3B82F6]/30 rounded-full font-bold px-6 xl:px-8 h-12 xl:h-14 text-sm xl:text-base">
                                    <Link href={heroCtas.primary.href}>
                                        {heroCtas.primary.label} <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-2 border-white/40 bg-white/10 text-white font-semibold backdrop-blur-sm hover:bg-transparent hover:border-white/40 hover:text-[#3B82F6] transition-all duration-300 rounded-full px-6 xl:px-8 h-12 xl:h-14 text-sm xl:text-base">
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
