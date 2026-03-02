"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { heroSlides, heroCtas } from "@/content/site-content";
import { Button } from "@/components/ui/button";

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = heroSlides;

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const slide = slides[currentSlide];

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#050d1f]">
            {/* ── Layered background ───────────────────────────────── */}

            {/* Base gradient mesh */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.25),transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(16,185,129,0.12),transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_10%_60%,rgba(59,130,246,0.10),transparent)]" />
            </div>

            {/* Dot grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Animated floating shapes */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Large blue orb */}
                <div className="hero-float-1 absolute -top-20 right-[15%] h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[100px]" />
                {/* Green accent orb */}
                <div className="hero-float-2 absolute bottom-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-emerald-500/8 blur-[80px]" />
                {/* Small cyan orb */}
                <div className="hero-float-3 absolute top-[40%] right-[5%] h-[200px] w-[200px] rounded-full bg-cyan-400/10 blur-[60px]" />

                {/* Geometric lines — horizontal */}
                <svg className="absolute top-[25%] left-0 w-full opacity-[0.04]" height="1" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1" />
                </svg>
                <svg className="absolute top-[55%] left-0 w-full opacity-[0.03]" height="1" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1" />
                </svg>

                {/* Animated diagonal streaks */}
                <div className="hero-streak absolute -right-32 top-[20%] h-px w-[400px] rotate-[30deg] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                <div className="hero-streak-delay absolute -left-20 top-[60%] h-px w-[300px] rotate-[25deg] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

                {/* Corner accent brackets */}
                <div className="absolute bottom-12 right-12 h-20 w-20 border-b border-r border-white/[0.06] rounded-br-xl" />
                <div className="absolute top-24 left-12 h-20 w-20 border-t border-l border-white/[0.06] rounded-tl-xl" />
            </div>

            {/* Vignette overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,13,31,0.6))]" />

            {/* ── Content ──────────────────────────────────────────── */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-6 pb-28 pt-28">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp}>
                            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                {slide.badge}
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={fadeInUp}
                            className="mt-8 max-w-4xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            {slide.headline.split(" ").map((word, i) => {
                                const isHighlighted = slide.highlightedWords?.some((hw) => word.includes(hw));
                                return (
                                    <span key={i}>
                                        {isHighlighted ? (
                                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                                                {word}
                                            </span>
                                        ) : (
                                            word
                                        )}
                                        {" "}
                                    </span>
                                );
                            })}
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={fadeInUp}
                            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300/90 sm:text-lg sm:leading-relaxed"
                        >
                            {slide.subheadline}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
                            <Button size="lg" asChild className="bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40">
                                <Link href={heroCtas.primary.href}>
                                    {heroCtas.primary.label} <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="border-2 border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10">
                                <Link href={heroCtas.secondary.href}>
                                    {heroCtas.secondary.label}
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            variants={fadeInUp}
                            className="mt-16 flex flex-wrap gap-8 border-t border-white/10 pt-10 sm:gap-14"
                        >
                            {slide.stats.map((stat) => (
                                <div key={stat.label}>
                                    <span className="block bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                                        {stat.value}
                                    </span>
                                    <span className="mt-1 block text-xs font-medium text-slate-400 sm:text-sm">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <div className="absolute bottom-10 right-6 flex items-center gap-3 sm:right-8">
                    <button
                        onClick={prevSlide}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
