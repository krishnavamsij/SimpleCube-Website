"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { heroSlides, heroCtas } from "@/content/site-content";
import { Button } from "@/components/ui/button";

// Image clusters per slide — each slide gets 3 stacked/offset images on the RHS
const heroImageClusters = [
    [
        { src: "/images/hero-bg-1.png", alt: "AI-Powered Delivery" },
        { src: "/images/enterprise-platforms.png", alt: "Enterprise Engineering" },
        { src: "/images/product-engineering.png", alt: "Product Engineering" },
    ],
    [
        { src: "/images/digital-transformation.png", alt: "Digital Transformation" },
        { src: "/images/product-engineering.png", alt: "Product Engineering" },
        { src: "/images/strategy-consulting.png", alt: "Strategy & Consulting" },
    ],
    [
        { src: "/images/strategy-consulting.png", alt: "Strategy & Consulting" },
        { src: "/images/hero-bg-1.png", alt: "AI Delivery" },
        { src: "/images/enterprise-platforms.png", alt: "Enterprise Platforms" },
    ],
];

function RHSImageCluster({ images }: { images: { src: string; alt: string }[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Each image zooms at a different rate — layered floating depth effect
    const scale0 = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.12]);
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1.10, 1, 0.88]);
    const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.06]);
    const y0 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
    const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-20, 50]);
    const scales = [scale0, scale1, scale2];
    const ys = [y0, y1, y2];

    // Offset classes: top card upper-right, middle card center-left, bottom card lower-right
    const offsetClasses = [
        "mr-0 ml-auto w-[88%]",         // top: slightly right
        "ml-6 w-[82%] -mt-6",           // middle: offset left, overlaps top
        "ml-auto mr-4 w-[76%] -mt-4",    // bottom: offset right, overlaps middle
    ];

    return (
        <div ref={ref} className="relative flex h-full items-center justify-center">
            {/* Decorative glow blobs */}
            <div className="pointer-events-none absolute -top-24 right-8 h-80 w-80 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-10 h-60 w-60 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 left-4 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />

            <div className="relative w-full px-4">
                {images.map((img, i) => (
                    <motion.div
                        key={img.src + i}
                        style={{ scale: scales[i], y: ys[i] }}
                        className={`relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ${offsetClasses[i]}`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={520}
                            height={340}
                            className="aspect-[3/2] w-full object-cover"
                            priority={i === 0}
                        />
                        {/* Gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                        {/* Subtle border glow */}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

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
    const images = heroImageClusters[currentSlide % heroImageClusters.length];

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#030b1e]">
            {/* ── Deep dark gradient background (richer navy-black) ─── */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            {/* Radial glow on RHS for the image cluster area */}
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
            {/* Subtle animated noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
            }} />
            {/* Left-side gradient so LHS text is always legible */}
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#020918] via-[#020918]/85 to-transparent" />

            {/* ── Two-column layout ────────────────────────────────────── */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col items-center px-6 lg:flex-row lg:gap-0">

                {/* ── LHS: Content (50% width) ─────────────────────────── */}
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
                                className="mt-8 text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
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
                                className="mt-6 w-full text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed"
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

                            {/* Stats row */}
                            <motion.div
                                variants={fadeInUp}
                                className="mt-14 flex flex-wrap gap-8 border-t border-white/15 pt-8 sm:gap-10"
                            >
                                {slide.stats.map((stat) => (
                                    <div key={stat.label}>
                                        <span className="block text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
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
                </div>

                {/* ── RHS: Image Cluster (50% width) ──────────────────── */}
                <div className="hidden w-full lg:flex lg:w-1/2 lg:min-h-screen lg:items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`images-${currentSlide}`}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full"
                        >
                            <RHSImageCluster images={images} />
                        </motion.div>
                    </AnimatePresence>
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
