"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { heroSlides, heroCtas } from "@/content/site-content";
import { Button } from "@/components/ui/button";

const heroBgImages = [
    "/images/hero-bg-1.png",
    "/images/digital-transformation.png",
    "/images/strategy-consulting.png",
];

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
    const bgImage = heroBgImages[currentSlide % heroBgImages.length];

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* ── Scrolling Background Image ──────────────────────── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={bgImage}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* ── Blue gradient overlay for readability ────────────── */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 via-blue-700/80 to-indigo-800/85" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />

            {/* ── Content ──────────────────────────────────────────── */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-6 pb-28 pt-28">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${currentSlide}`}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp}>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
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
                                            <span className="text-yellow-300 drop-shadow-sm">
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
                            className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg sm:leading-relaxed"
                        >
                            {slide.subheadline}
                        </motion.p>

                        {/* CTAs — Bright style */}
                        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
                            <Button size="lg" asChild className="bg-white text-blue-700 font-bold shadow-xl shadow-blue-900/20 hover:bg-blue-50">
                                <Link href={heroCtas.primary.href}>
                                    {heroCtas.primary.label} <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="border-2 border-white/50 bg-white/10 text-white font-semibold backdrop-blur-sm hover:border-white/70 hover:bg-white/20">
                                <Link href={heroCtas.secondary.href}>
                                    {heroCtas.secondary.label}
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            variants={fadeInUp}
                            className="mt-16 flex flex-wrap gap-8 border-t border-white/20 pt-10 sm:gap-14"
                        >
                            {slide.stats.map((stat) => (
                                <div key={stat.label}>
                                    <span className="block text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                        {stat.value}
                                    </span>
                                    <span className="mt-1 block text-xs font-medium text-white/60 sm:text-sm">
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
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 hover:text-white"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 hover:text-white"
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
                            className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
