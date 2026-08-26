"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Landmark, Shield, TrendingUp, GraduationCap, Truck, Play, X } from "lucide-react";
import { scrollReveal, viewportOnce, EASE_OUT_QUART } from "@/lib/animations";
import { vocContent } from "@/content/site-content";
import Image from "next/image";

const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        if (parts[1]) {
            const videoId = parts[1].split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
    }
    if (url.includes("youtube.com/watch")) {
        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get("v");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } catch {
            const match = url.match(/[?&]v=([^&]+)/);
            if (match) {
                return `https://www.youtube.com/embed/${match[1]}`;
            }
        }
    }
    return url;
};

const getTagIcon = (tag: string) => {
    if (tag.includes("Lending") || tag.includes("Fintech") || tag.includes("Financial") || tag.includes("Credit")) return <Landmark className="w-4 h-4 text-[#1e90ff]" />;
    if (tag.includes("Insurance")) return <Shield className="w-4 h-4 text-[#1e90ff]" />;
    if (tag.includes("Wealth")) return <TrendingUp className="w-4 h-4 text-[#1e90ff]" />;
    if (tag.includes("Education")) return <GraduationCap className="w-4 h-4 text-[#1e90ff]" />;
    if (tag.includes("Logistics") || tag.includes("Transportation")) return <Truck className="w-4 h-4 text-[#1e90ff]" />;
    return <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff]"></div>;
};

export function VoiceOfCustomer() {
    const { label, headline, highlightedWords, testimonials } = vocContent;
    const [current, setCurrent] = useState(0);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const hoverVideoRef = useRef<HTMLVideoElement>(null);

    const next = useCallback(() => setCurrent((prev) => (prev + 1) % testimonials.length), [testimonials.length]);

    // Reset hover state on slide change
    useEffect(() => {
        setIsHovered(false);
    }, [current]);

    // Auto-rotate every 10 seconds unless video modal is open or image is hovered
    useEffect(() => {
        if (isVideoModalOpen || isHovered) return;
        const timer = setInterval(next, 10000);
        return () => clearInterval(timer);
    }, [next, isVideoModalOpen, isHovered]);

    const active = testimonials[current] as any;

    const handleMouseEnter = () => {
        if (active.hoverVideoUrl || active.videoUrl) {
            setIsHovered(true);
            if (hoverVideoRef.current) {
                if (hoverVideoRef.current.currentTime < 4.0) {
                    hoverVideoRef.current.currentTime = 4.5;
                }
                hoverVideoRef.current.playbackRate = 1.0;
                hoverVideoRef.current.muted = false; // Try playing unmuted so the voice plays on hover
                hoverVideoRef.current.play().catch((err) => {
                    console.warn("Unmuted VOC hover play failed, attempting muted:", err);
                    if (hoverVideoRef.current) {
                        hoverVideoRef.current.muted = true; // Fallback to muted if blocked by browser policy
                        hoverVideoRef.current.play().catch((err2) => {
                            console.error("Muted VOC hover play failed too:", err2);
                        });
                    }
                });
            }
        }
    };

    const handleMouseLeave = () => {
        if (active.hoverVideoUrl || active.videoUrl) {
            setIsHovered(false);
            if (hoverVideoRef.current) {
                hoverVideoRef.current.pause();
                hoverVideoRef.current.muted = true;
            }
        }
    };

    return (
        <section className="bg-white pt-[10px] pb-[30px] sm:pt-[20px] sm:pb-[40px] lg:pt-[20px] lg:pb-[50px] relative overflow-hidden min-h-0 lg:min-h-[600px] xl:min-h-[750px] flex flex-col justify-center">

            {/* ── Background: Prominent Semi-Circles (Beside Image on Mobile) ── */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[68%] lg:top-[55%] left-[60%] lg:left-[70%] -translate-y-1/2 w-full h-full flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.25 }}
                            transition={{
                                delay: i * 0.25,
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                            className="absolute rounded-full border-[2px] border-[#1e90ff]/30"
                            style={{
                                width: `min(${i * 380}px, 90vw)`,
                                height: `min(${i * 380}px, 90vw)`
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16 w-full relative z-10 pb-16 lg:pb-8">

                {/* Header */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="flex flex-col items-center text-center mb-12 lg:mb-16"
                >
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        Customer Stories
                    </div>
                    <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-tight text-[#030B3B] leading-[1.1] max-w-2xl relative z-10">
                        {headline.split(" ").map((word, i) => {
                            const pureWord = word.replace(/[.,]/g, "").toLowerCase();
                            const isHighlighted = highlightedWords.some(hw => hw.toLowerCase().includes(pureWord));
                            return (
                                <span key={i} className={isHighlighted ? "text-[#00D4AA]" : ""}>
                                    {word}{" "}
                                </span>
                            );
                        })}
                    </h2>
                </motion.div>

                {/* Carousel Content */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[460px]"
                        >
                            {/* Left Side: Industry & Quote (Strictly Left Aligned to Logo Margin) */}
                            <div className="flex flex-col items-start space-y-8 pt-4 lg:col-span-8">
                                <div className="inline-flex items-center gap-2.5 rounded-full bg-[#1e90ff]/5 border border-[#1e90ff]/20 px-6 py-3 text-xs font-semibold text-[#1e90ff] tracking-wide">
                                    {getTagIcon(active.industry)}
                                    {active.industry}
                                </div>

                                <div className="relative min-h-[100px] flex items-center">
                                    <p className="text-lg md:text-xl lg:text-2xl xl:text-[26px] font-medium leading-relaxed text-[#030B3B] relative z-10 text-left max-w-[92%]">
                                        &ldquo;{active.quote}&rdquo;
                                    </p>
                                </div>


                                {active.result && (
                                    <div className="pt-2 w-full max-w-[92%]">
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#1e90ff]/5 border border-[#1e90ff]/20 w-full min-h-[96px]">
                                            <p
                                                className="text-sm sm:text-base text-[#030B3B] font-medium leading-relaxed flex-1"
                                                dangerouslySetInnerHTML={{ __html: active.result as string }}
                                            />
                                            {active.videoUrl ? (
                                                <button
                                                    onClick={() => setIsVideoModalOpen(true)}
                                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold text-xs shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-[#3B82F6]/30 transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] group uppercase tracking-wide shrink-0 whitespace-nowrap"
                                                >
                                                    <Play className="w-3.5 h-3.5 fill-white stroke-none group-hover:scale-110 transition-transform" />
                                                    Watch Video
                                                </button>
                                            ) : active.caseStudyHref ? (
                                                <a
                                                    href={active.caseStudyHref}
                                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold text-xs shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-[#3B82F6]/30 transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] group uppercase tracking-wide shrink-0 whitespace-nowrap"
                                                >
                                                    View Case Study
                                                    <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Profile & Branding */}
                            <div className="relative flex flex-col items-center w-full lg:col-span-4 lg:pl-8 lg:pr-8">
                                {/* Wrapper to ensure image and text align perfectly to each other's center and prevent horizontal scrollbar */}
                                <div className="flex flex-col items-center w-full">
                                    <div
                                        className={`relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] aspect-square ${active.videoUrl ? "cursor-pointer group" : ""
                                            }`}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => {
                                            if (active.videoUrl) {
                                                setIsVideoModalOpen(true);
                                            }
                                        }}
                                    >

                                        {/* ── Radiating Image Glow (Synced with Background) ── */}
                                        {[0, 1].map((i) => (
                                            <motion.div
                                                key={`glow-${current}-${i}`}
                                                initial={{ scale: 1, opacity: 0.5 }}
                                                animate={{ scale: 1.4, opacity: 0 }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    delay: i * 1.25,
                                                    ease: "easeOut"
                                                }}
                                                className="absolute inset-0 rounded-full bg-[#1e90ff]/20 blur-2xl z-0"
                                            />
                                        ))}

                                        <div className="relative w-full h-full overflow-hidden rounded-full ring-4 ring-white shadow-2xl bg-transparent z-10">
                                            <Image
                                                src={active.image}
                                                alt={active.author}
                                                fill
                                                className={`object-cover object-center scale-105 transition-opacity duration-300 ${active.videoUrl && isHovered ? "opacity-0" : "opacity-100"
                                                    }`}
                                                priority
                                            />

                                            {(active.hoverVideoUrl || active.videoUrl) && (active.hoverVideoUrl || active.videoUrl).toLowerCase().includes(".mp4") && (
                                                <video
                                                    ref={hoverVideoRef}
                                                    src={active.hoverVideoUrl || active.videoUrl ? encodeURI(active.hoverVideoUrl || active.videoUrl) : undefined}
                                                    loop
                                                    muted
                                                    playsInline
                                                    preload="metadata"
                                                    className={`absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-300 ${isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                                        }`}
                                                />
                                            )}

                                            {/* Play Button Overlay (fades out while video plays on hover) */}
                                            {active.videoUrl && (
                                                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-20 ${isHovered ? "opacity-0 pointer-events-none" : "opacity-100 bg-black/20 group-hover:bg-black/30"
                                                    }`}>
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-white border border-white/80 shadow-[0_0_30px_rgba(0,0,0,0.3)] text-[#1e90ff] transition-all duration-300 scale-95 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(30,144,255,0.6)]">
                                                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#1e90ff] stroke-none ml-1 transition-transform duration-300 group-hover:scale-110" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* RHS Info — Centered to image */}
                                    <div className="mt-8 text-center flex flex-col items-center justify-start min-h-[110px]">
                                        <div className="space-y-1">
                                            <h4 className="text-2xl sm:text-3xl font-bold text-[#030B3B] leading-tight tracking-tight">{active.author}</h4>
                                            <p className="text-slate-500 font-semibold text-base sm:text-lg">
                                                {active.designation}
                                            </p>
                                        </div>

                                        {/* Company logo */}
                                        {active.logo ? (
                                            <div className="mt-3 flex items-center justify-center h-12">
                                                <img
                                                    src={active.logo}
                                                    alt={active.company || active.author}
                                                    className="h-10 sm:h-12 w-auto max-w-[150px] object-contain opacity-90"
                                                />
                                            </div>
                                        ) : (
                                            <div className="mt-3 h-12" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Indicators */}
                <div className="relative lg:absolute mt-8 lg:mt-0 lg:bottom-4 left-0 lg:left-1/2 w-full lg:w-auto flex justify-center lg:-translate-x-1/2 gap-3 z-30">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-[#1e90ff]" : "w-1.5 bg-[#1e90ff]/20"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Video Modal (Opens like podcast) */}
            <AnimatePresence>
                {isVideoModalOpen && active.videoUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVideoModalOpen(false)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg cursor-pointer"
                    >
                        <button
                            onClick={() => setIsVideoModalOpen(false)}
                            className="fixed top-6 right-6 z-[110] p-3 rounded-full bg-slate-950/60 text-white/80 hover:bg-slate-950/85 hover:text-white transition-all duration-200 border border-white/10 backdrop-blur-sm shadow-xl hover:scale-110"
                            aria-label="Close video player"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 30, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-slate-900 rounded-[28px] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col cursor-default"
                        >
                            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                                {active.videoUrl.toLowerCase().includes(".mp4") ? (
                                    <video
                                        src={active.videoUrl}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <iframe
                                        src={`${getYouTubeEmbedUrl(active.videoUrl)}?autoplay=1`}
                                        title={`${active.author} - ${active.company || 'Podcast'}`}
                                        className="absolute inset-0 w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                )}
                            </div>

                            <div className="p-6 bg-slate-950 text-white">
                                <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1e90ff] bg-[#1e90ff]/10 px-2.5 py-1 rounded-md border border-[#1e90ff]/20">
                                        {active.industry}
                                    </span>
                                    <span>•</span>
                                    <span className="text-slate-300">CU NEXT PODCAST</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-1">
                                    {active.author}
                                </h3>
                                <p className="text-slate-400 text-sm font-medium mb-3">
                                    {active.designation}
                                </p>
                                <p className="text-slate-300 text-sm italic leading-relaxed">
                                    &ldquo;{active.videoQuote || active.quote}&rdquo;
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}


