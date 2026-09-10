"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { heroSlides, heroCtas } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { HeroPuzzle } from "@/components/hero-puzzle";

export function HeroCarousel() {
    const slides = heroSlides;
    // Primary blueprint slide (index 0); variants retained in heroSlides for future rotation
    const currentSlide = 0;
    const slide = slides[currentSlide];

    return (
        <section id="hero-section" className="relative min-h-dvh flex items-center overflow-hidden bg-[#F5F9FC]">
            {/* Soft brand wash — light primary tint, stronger behind the cube */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F5F9FC] to-[#E8F1F8]" />
            <div className="absolute inset-y-0 right-0 w-[60%] bg-[radial-gradient(ellipse_at_70%_45%,rgba(19,84,152,0.12)_0%,rgba(56,134,206,0.06)_35%,transparent_70%)]" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[45%] bg-[radial-gradient(ellipse_at_20%_100%,rgba(19,84,152,0.04)_0%,transparent_60%)]" />

            {/* Two-column layout with standardized container */}
            <div className="relative z-10 flex flex-col items-center lg:flex-row lg:gap-0 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                {/* ── LHS: Text ── */}
                <div className="flex w-full flex-col justify-center pt-24 pb-8 sm:pt-28 md:pt-32 lg:w-1/2 lg:min-h-screen lg:pt-20 lg:pb-0 lg:pr-10 relative z-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="hero-content"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                             {/* Badge temporarily hidden from this build */}
                             {/*
                            <motion.div variants={fadeInUp}>
                                <span className="inline-flex items-center gap-2 text-[9px] xl:text-[10px] font-bold tracking-[2px] uppercase text-[#135498] bg-[#135498]/[0.08] border border-[#135498]/20 rounded-full px-5 py-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#135498]" />
                                    {slide.badge.toUpperCase()}
                                </span>
                            </motion.div>
                             */}
 
                            {/* Headline */}
                            <motion.h1
                                variants={fadeInUp}
                                className="mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 text-[2rem] font-black leading-[1.12] tracking-tight text-[#0A2F52] sm:text-[2.5rem] lg:text-[44px] xl:text-[52px] 2xl:text-[58px] font-display"
                            >
                                <span className="whitespace-nowrap">Complex problems,</span>
                                <br />
                                <span className="whitespace-nowrap text-[#135498]">solved simply.</span>
                            </motion.h1>
 
                            {/* Subheadline / Callout Content */}
                            <motion.p
                                variants={fadeInUp}
                                className="mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 w-full text-base sm:text-lg lg:text-[18px] 2xl:text-xl leading-relaxed text-slate-600 font-medium max-w-2xl"
                            >
                                {slide.subheadline}
                            </motion.p>

                            {/* Hero Metrics temporarily hidden
                            <motion.div 
                                variants={fadeInUp} 
                                className="mt-10 lg:mt-14 xl:mt-18 2xl:mt-22 flex flex-row flex-nowrap items-start justify-start gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-28 2xl:gap-32 w-full sm:w-auto"
                            >
                                {slide.stats.map((stat, idx) => (
                                    <div key={idx} className="flex flex-col items-start text-left shrink-0">
                                        <div className="flex items-baseline justify-start gap-1 mb-1.5 sm:mb-2.5 xl:mb-3">
                                            <span className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] 2xl:text-[46px] font-black text-[#0A2F52] leading-none font-display">
                                                {stat.value.replace('%', '').replace('+', '')}
                                            </span>
                                            {stat.value.includes('%') && (
                                            <span className="text-base sm:text-lg lg:text-[18px] xl:text-[22px] 2xl:text-[26px] font-black text-[#0A2F52] leading-none">%</span>
                                            )}
                                            {stat.value.includes('+') && (
                                            <span className="text-base sm:text-lg lg:text-[18px] xl:text-[22px] 2xl:text-[26px] font-black text-[#0A2F52] leading-none">+</span>
                                            )}
                                        </div>
                                        <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-bold text-slate-500 whitespace-pre-line leading-[1.4]">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                            */}
 
                            <motion.div variants={fadeInUp} className="mt-10 lg:mt-12 xl:mt-16 2xl:mt-20 flex flex-wrap gap-3 xl:gap-4">
                                <Button size="lg" asChild className="bg-[#135498] text-white hover:bg-[#0F427A] border border-transparent rounded-full font-bold px-6 xl:px-8 h-12 xl:h-14 text-sm xl:text-base shadow-[0_4px_14px_rgba(19,84,152,0.28)]">
                                    <Link href={heroCtas.primary.href}>
                                        {heroCtas.primary.label} <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </motion.div>
                            {/* Secondary CTA temporarily hidden
                                <Button size="lg" variant="outline" asChild className="border border-[#135498]/35 bg-white text-[#135498] hover:bg-[#135498]/[0.06] hover:border-[#135498]/50 transition-all duration-300 rounded-full px-6 xl:px-8 h-12 xl:h-14 text-sm xl:text-base">
                                    <Link href={heroCtas.secondary.href}>
                                        {heroCtas.secondary.label}
                                    </Link>
                                </Button>
                            */}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── RHS: Single High-Fidelity Animation ── */}
                <div className="relative flex w-full min-h-[40vh] mt-8 lg:mt-0 lg:h-auto lg:min-h-screen lg:w-1/2 lg:items-center lg:justify-center pb-12 lg:pb-0 lg:translate-x-6 xl:translate-x-12">
                    <HeroPuzzle />
                </div>
            </div>

            {/* Navigation arrows and indicators removed for static hero */}
        </section>
    );
}
