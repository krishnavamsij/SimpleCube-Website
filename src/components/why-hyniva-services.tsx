"use client";

import { motion } from "framer-motion";
import { expertiseContent } from "@/content/site-content";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { Brain, Layers, Briefcase, GraduationCap, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const getIcon = (name: string) => {
    switch (name) {
        case "Brain": return <Brain className="w-5 h-5 text-[#3B82F6]" />;
        case "Layers": return <Layers className="w-5 h-5 text-[#3B82F6]" />;
        case "Briefcase": return <Briefcase className="w-5 h-5 text-[#3B82F6]" />;
        case "GraduationCap": return <GraduationCap className="w-5 h-5 text-[#3B82F6]" />;
        default: return <Brain className="w-5 h-5 text-[#3B82F6]" />;
    }
};

const preventWidow = (text: string) => {
    const lastSpaceIndex = text.lastIndexOf(" ");
    if (lastSpaceIndex === -1) return text;
    return text.substring(0, lastSpaceIndex) + "\u00a0" + text.substring(lastSpaceIndex + 1);
};


export function WhyHynivaServices() {
    const { topBox, bottomBox } = expertiseContent;

    return (
        <section className="bg-white pt-[24px] sm:pt-[32px] lg:pt-[40px] pb-2">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16 flex flex-col gap-3">
                
                {/* ── Top Box: Dark Glowing Container ── */}
                <motion.div 
                    variants={scrollReveal} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={viewportOnce}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[24px] sm:p-[32px] lg:p-[40px]"
                >
                    <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
                        <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                        OUR STRENGTH
                    </div>
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-8 lg:gap-24 lg:grid-cols-[1fr_1.3fr] items-start">
                        {/* Left Side: Headline & Stats */}
                        <div>
                            <h2 className="whitespace-pre-line text-[24px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-[900] text-[#ffffff] tracking-tight leading-[1.1] mb-6 sm:mb-8 lg:mb-12 font-display">
                                {topBox.headline.split(topBox.highlightedWord).map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i < arr.length - 1 && <span className="text-[#00D4AA]">{topBox.highlightedWord}</span>}
                                    </React.Fragment>
                                ))}
                            </h2>
                            
                            <div className="flex flex-col gap-6 sm:gap-12 lg:gap-16">
                                <div className="flex gap-6 sm:grid sm:grid-cols-2 lg:flex lg:gap-16 overflow-x-auto pb-2 sm:pb-0">
                                    {topBox.stats.map((stat, idx) => (
                                        <div key={idx} className="flex flex-row items-center flex-shrink-0 w-full pr-4 sm:pr-12 lg:pr-24">
                                            {/* Text Block */}
                                            <div className="flex flex-col">
                                                <div className="flex items-baseline gap-1 mb-1">
                                                    <span className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-white leading-none font-display">
                                                        {stat.value.replace('+', '')}
                                                    </span>
                                                    {stat.value.includes('+') && (
                                                        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none">+</span>
                                                    )}
                                                </div>
                                                <span className="text-[12px] sm:text-[14px] lg:text-[15px] text-slate-400 font-medium whitespace-pre-line leading-tight max-w-[80px] sm:max-w-none mt-0">
                                                    {stat.label}
                                                </span>
                                            </div>
                                            
                                            {/* Avatars Block */}
                                            <div className="flex -space-x-3 sm:-space-x-4 lg:-space-x-5 ml-5 sm:ml-8 lg:ml-12">
                                                {/* 1 - Hidu (Zoomed 20%, top aligned) */}
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[76px] lg:h-[76px] rounded-full border-3 sm:border-4 border-[#0A102E] overflow-hidden z-10 relative shadow-lg">
                                                    <img src="/images/Our_Services/Experts/Hidu.png" alt="Expert" className="w-full h-full object-cover grayscale scale-[1.2] origin-top transition-all duration-300" />
                                                </div>
                                                {/* 2 - Madhavi (Zoomed 20%, top aligned) */}
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[76px] lg:h-[76px] rounded-full border-3 sm:border-4 border-[#0A102E] overflow-hidden z-20 relative shadow-lg">
                                                    <img src="/images/Our_Services/Experts/Madhavi.png" alt="Expert" className="w-full h-full object-cover grayscale scale-[1.2] origin-top transition-all duration-300" />
                                                </div>
                                                {/* 3 - Madhumalathi (Original) */}
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[76px] lg:h-[76px] rounded-full border-3 sm:border-4 border-[#0A102E] overflow-hidden z-30 relative shadow-lg">
                                                    <img src="/images/Our_Services/Experts/Madhumalathi.png" alt="Expert" className="w-full h-full object-cover grayscale transition-all duration-300" />
                                                </div>
                                                {/* 4 - suraj (Zoomed 20%, top aligned) */}
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[76px] lg:h-[76px] rounded-full border-3 sm:border-4 border-[#0A102E] overflow-hidden z-40 relative shadow-lg">
                                                    <img src="/images/Our_Services/Experts/suraj.png" alt="Expert" className="w-full h-full object-cover grayscale scale-[1.2] origin-top transition-all duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Description & CTA */}
                        <div className="flex flex-col items-start pt-0 lg:pt-0 lg:pl-8">
                            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-semibold leading-relaxed mb-6 sm:mb-8 lg:mb-10 whitespace-pre-line">
                                {topBox.description}
                            </p>
                            <Link 
                                href={topBox.cta.href}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white eyebrow px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3B82F6]/30 w-full sm:w-auto"
                            >
                                {topBox.cta.label}
                                <ArrowRightIcon className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* ── Bottom Box: Subtle Features Container ── */}
                <motion.div 
                    variants={scrollReveal} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={viewportOnce}
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] p-[24px] sm:p-[32px] lg:p-[40px] border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className={`flex flex-col ${idx === 3 ? 'lg:ml-4' : ''}`}>
                                <div className="h-10 w-10 bg-white shadow-sm flex items-center justify-center rounded-xl mb-6 flex-shrink-0">
                                    {getIcon(card.icon)}
                                </div>
                                <h3 className="text-[18px] font-bold text-[#030B3B] mb-3 leading-tight font-display">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-[#030B3B]/80 font-medium leading-relaxed whitespace-pre-line">
                                    {preventWidow(card.description)}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
            </div>
        </section>
    );
}
