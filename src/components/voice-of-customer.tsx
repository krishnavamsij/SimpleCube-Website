"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Landmark, Shield, TrendingUp, GraduationCap, Truck } from "lucide-react";
import { scrollReveal, viewportOnce, EASE_OUT_QUART } from "@/lib/animations";
import { vocContent } from "@/content/site-content";
import Image from "next/image";

const getTagIcon = (tag: string) => {
    if (tag.includes("Lending") || tag.includes("Fintech") || tag.includes("Financial")) return <Landmark className="w-4 h-4 text-[#1e90ff]" />;
    if (tag.includes("Insurance")) return <Shield className="w-4 h-4 text-[#1e90ff]" />;
    if (tag.includes("Wealth")) return <TrendingUp className="w-4 h-4 text-[#1e90ff]" />;
    if (tag.includes("Education")) return <GraduationCap className="w-4 h-4 text-[#1e90ff]" />;
    if (tag.includes("Logistics") || tag.includes("Transportation")) return <Truck className="w-4 h-4 text-[#1e90ff]" />;
    return <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff]"></div>;
};

export function VoiceOfCustomer() {
    const { label, headline, highlightedWords, testimonials } = vocContent;
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => setCurrent((prev) => (prev + 1) % testimonials.length), [testimonials.length]);
    
    // Auto-rotate every 10 seconds
    useEffect(() => {
        const timer = setInterval(next, 10000);
        return () => clearInterval(timer);
    }, [next]);

    const active = testimonials[current];

    return (
        <section className="bg-white pt-[10px] pb-[30px] sm:pt-[20px] sm:pb-[40px] lg:pt-[20px] lg:pb-[50px] relative overflow-hidden min-h-[750px] flex flex-col justify-center">
            
            {/* ── Background: Prominent Semi-Circles (Reverted) ── */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[55%] left-[70%] -translate-y-1/2 w-full h-full flex items-center justify-center">
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
                                width: `${i * 380}px`, 
                                height: `${i * 380}px` 
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-6 w-full relative z-10 pb-8">
                
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
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                        >
                            {/* Left Side: Industry & Quote (Strictly Left Aligned to Logo Margin) */}
                            <div className="flex flex-col items-start space-y-10 pt-4 lg:col-span-7">
                                <div className="inline-flex items-center gap-2.5 rounded-full bg-[#1e90ff]/5 border border-[#1e90ff]/20 px-6 py-3 text-xs font-semibold text-[#1e90ff] tracking-wide">
                                    {getTagIcon(active.industry)}
                                    {active.industry}
                                </div>
                                
                                <div className="relative">
                                    <p className="text-xl sm:text-2xl font-normal leading-relaxed text-[#030B3B] relative z-10 text-left">
                                        &ldquo;{active.quote}&rdquo;
                                    </p>
                                </div>

                                <div className="pt-2 w-full">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#1e90ff]/5 border border-[#1e90ff]/20 w-full">
                                        <p 
                                            className="text-sm sm:text-base text-[#030B3B] font-medium leading-relaxed flex-1"
                                            dangerouslySetInnerHTML={{ __html: active.result as string }}
                                        />
                                        <a 
                                            href={active.caseStudyHref}
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold text-xs shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-[#3B82F6]/30 transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] group uppercase tracking-wide shrink-0 whitespace-nowrap"
                                        >
                                            View Case Study
                                            <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Profile & Branding (Strictly Right Aligned to Contact Us Margin) */}
                            <div className="relative flex flex-col items-center lg:items-end w-full lg:-mt-12 lg:col-span-5">
                                {/* Wrapper to ensure image and text align perfectly to each other's center and prevent horizontal scrollbar */}
                                <div className="flex flex-col items-center lg:mr-12">
                                    <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                                        
                                        {/* ── Radiating Image Glow (Synced with Background) ── */}
                                        {[0, 1].map((i) => (
                                            <motion.div
                                                key={i}
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

                                        <div className="relative w-full h-full overflow-hidden rounded-full ring-4 ring-white shadow-2xl bg-slate-900/5 z-10">
                                            <Image 
                                                src={active.image} 
                                                alt={active.author} 
                                                fill 
                                                className="object-contain object-top scale-100" 
                                                priority
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* RHS Info — Centered to image */}
                                    <div className="mt-8 text-center flex flex-col items-center">
                                        <div className="space-y-1">
                                            <h4 className="text-2xl sm:text-3xl font-bold text-[#030B3B] leading-tight-tight tracking-tight">{active.author}</h4>
                                            <p className="text-slate-500 font-semibold text-base sm:text-lg">
                                                {active.designation}
                                            </p>
                                        </div>
                                        
                                        {/* Company logo — Minimized gap */}
                                        {active.logo && (
                                            <div className="relative h-14 sm:h-16 w-48 sm:w-52 mt-0 transition-all duration-300 opacity-90 group-hover:opacity-100">
                                                <Image 
                                                    src={active.logo} 
                                                    alt={active.company} 
                                                    fill 
                                                    className="object-contain object-center"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                i === current ? "w-10 bg-[#1e90ff]" : "w-1.5 bg-[#1e90ff]/20"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
