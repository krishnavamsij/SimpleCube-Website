"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { heroSlides, heroCtas } from "@/content/site-content";
import { Button } from "@/components/ui/button";

// GIF per slide — index matches slide index
const slideGifs = [
    "/images/1.gif",
    "https://media.giphy.com/media/3oKIPrzoi6rbZc4aDC/giphy.gif", // slide 2 placeholder
    "/images/3.gif",
];

// Triangle layout: card 0 = top full-width, card 1 = bottom-left, card 2 = bottom-right
const cardPositions = [
    { top: 0, left: 0, right: 0, height: "54%", bottom: "auto", width: "auto" },
    { bottom: 0, left: 0, top: "auto", height: "43%", width: "48.5%", right: "auto" },
    { bottom: 0, right: 0, top: "auto", height: "43%", width: "48.5%", left: "auto" },
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
        const timer = setInterval(nextSlide, 10000);
        return () => clearInterval(timer);
    }, [nextSlide]);

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
                <div className="flex w-full flex-col justify-center pb-28 pt-32 lg:w-1/2 lg:pb-24 lg:pr-10 lg:pt-28">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${currentSlide}`}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Badge */}
                            <motion.div variants={fadeInUp}>
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    {slide.badge}
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                variants={fadeInUp}
                                className="mt-8 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
                            >
                                {slide.headline.split(" ").map((word, i) => {
                                    const isHighlighted = slide.highlightedWords?.some((hw) => word.includes(hw));
                                    return (
                                        <span key={i}>
                                            {isHighlighted ? (
                                                <span className="text-[#00D4AA] drop-shadow-sm">{word}</span>
                                            ) : (
                                                word
                                            )}{" "}
                                        </span>
                                    );
                                })}
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                variants={fadeInUp}
                                className="mt-6 w-full text-base leading-relaxed text-slate-300 sm:text-lg"
                            >
                                {slide.subheadline}
                            </motion.p>

                            {/* CTAs */}
                            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
                                <Button size="lg" asChild className="bg-white text-blue-700 font-bold shadow-xl shadow-blue-900/20 hover:bg-blue-50">
                                    <Link href={heroCtas.primary.href}>
                                        {heroCtas.primary.label} <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-2 border-white/40 bg-white/8 text-white font-semibold backdrop-blur-sm hover:border-white/60 hover:bg-white/15">
                                    <Link href={heroCtas.secondary.href}>
                                        {heroCtas.secondary.label}
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── RHS: Triangle GIF cluster ── */}
                <div className="hidden w-full lg:flex lg:w-1/2 lg:min-h-screen lg:items-center">
                    <div className="relative w-full" style={{ height: "520px" }}>
                        {/* Glow blobs */}
                        <div className="pointer-events-none absolute -top-16 right-8 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-0 right-10 h-56 w-56 rounded-full bg-[#00D4AA]/10 blur-3xl" />

                        {slideGifs.map((gif, i) => {
                            const isActive = currentSlide === i;
                            const pos = cardPositions[i];

                            return (
                                <motion.div
                                    key={i}
                                    className="absolute overflow-hidden rounded-2xl"
                                    style={{ ...pos }}
                                    animate={{
                                        scale: isActive ? 1.15 : 0.85,
                                        opacity: isActive ? 1 : 0.45,
                                        zIndex: isActive ? 20 : 10,
                                    }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    // eslint-disable-next-line @next/next/no-img-element
                                >
                                    {/* Active ring highlight */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                                        animate={{
                                            boxShadow: isActive
                                                ? "0 0 0 2px rgba(0,212,170,0.7), 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,170,0.15)"
                                                : "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4)",
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={gif}
                                        alt={`Slide ${i + 1} preview`}
                                        className="h-full w-full object-contain bg-black/5"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

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
                        className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/35"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
