"use client";

import { motion } from "framer-motion";
import { expertiseContent } from "@/content/site-content";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { Brain, Layers, Briefcase, GraduationCap, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const getIcon = (name: string) => {
    switch (name) {
        case "Brain": return <Brain className="w-5 h-5 text-[#3886CE]" />;
        case "Layers": return <Layers className="w-5 h-5 text-[#3886CE]" />;
        case "Briefcase": return <Briefcase className="w-5 h-5 text-[#3886CE]" />;
        case "GraduationCap": return <GraduationCap className="w-5 h-5 text-[#3886CE]" />;
        default: return <Brain className="w-5 h-5 text-[#3886CE]" />;
    }
};



export function WhyHynivaServices() {
    const { topBox, bottomBox } = expertiseContent;

    return (
        <section className="bg-white pt-[16px] sm:pt-[24px] lg:pt-[32px] pb-2">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16 flex flex-col gap-3">
                
                {/* ── Top Box: Dark Glowing Container ── */}
                <motion.div 
                    variants={scrollReveal} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={viewportOnce}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[20px] sm:p-[28px] lg:p-[32px]"
                >
                    <div className="eyebrow text-[#3886CE] bg-[#3886CE]/10 border border-[#3886CE]/20 mb-6">
                        <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
                        OUR STRENGTH
                    </div>
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(56,134,206,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-8 lg:gap-12 xl:gap-24 lg:grid-cols-2 xl:grid-cols-[1fr_1.3fr] items-start">
                        {/* Left Side: Headline & Stats */}
                        <div>
                            <h2 className="whitespace-pre-line text-[22px] sm:text-[28px] md:text-[32px] lg:text-[34px] xl:text-[38px] font-[900] text-[#ffffff] tracking-tight leading-[1.1] mb-4 sm:mb-6 lg:mb-8 font-display">
                                {topBox.headline.split(topBox.highlightedWord).map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i < arr.length - 1 && <span className="text-[#3886CE]">{topBox.highlightedWord}</span>}
                                    </React.Fragment>
                                ))}
                            </h2>
                            
                            <div className="flex flex-col gap-6 sm:gap-12 lg:gap-16">
                                <div className="flex gap-6 sm:grid sm:grid-cols-2 lg:flex lg:gap-8 xl:gap-16 overflow-x-auto pb-2 sm:pb-0">
                                    {topBox.stats.map((stat, idx) => (
                                        <div key={idx} className="flex flex-row items-center flex-shrink-0 w-full pr-4 sm:pr-12 lg:pr-4 xl:pr-24">
                                            {/* Text Block */}
                                            <div className="flex flex-col">
                                                <div className="flex items-baseline gap-1 mb-1">
                                                    <span className="text-xl sm:text-2xl lg:text-3xl font-[900] text-white leading-none font-display">
                                                        {stat.value.replace('+', '')}
                                                    </span>
                                                    {stat.value.includes('+') && (
                                                        <span className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-none">+</span>
                                                    )}
                                                </div>
                                                <span className="text-[11px] sm:text-[13px] lg:text-[14px] text-slate-400 font-medium whitespace-normal sm:whitespace-pre-line leading-tight max-w-[120px] sm:max-w-none mt-0">
                                                    {stat.label}
                                                </span>
                                            </div>
                                            
                                            {/* Avatars Block */}
                                            <div className="flex -space-x-2.5 sm:-space-x-3 lg:-space-x-3 xl:-space-x-4 ml-4 sm:ml-6 lg:ml-5 xl:ml-8">
                                                {/* 1 - Hidu (Zoomed 20%, top aligned) */}
                                                <div className="w-11 h-11 sm:w-13 sm:h-13 lg:w-[48px] lg:h-[48px] xl:w-[60px] xl:h-[60px] rounded-full border-3 sm:border-4 border-[#0A102E] overflow-hidden z-10 relative shadow-lg">
                                                    <img src="/images/Our_Services/Experts/Hidu.png" alt="Expert" className="w-full h-full object-cover grayscale scale-[1.2] origin-top transition-all duration-300" />
                                                </div>
                                                {/* 2 - Madhavi (Zoomed 20%, top aligned) */}
                                                <div className="w-11 h-11 sm:w-13 sm:h-13 lg:w-[48px] lg:h-[48px] xl:w-[60px] xl:h-[60px] rounded-full border-3 sm:border-4 border-[#0A102E] overflow-hidden z-20 relative shadow-lg">
                                                    <img src="/images/Our_Services/Experts/Madhavi.png" alt="Expert" className="w-full h-full object-cover grayscale scale-[1.2] origin-top transition-all duration-300" />
                                                </div>
                                                {/* 3 - Madhumalathi (Original) */}
                                                <div className="w-11 h-11 sm:w-13 sm:h-13 lg:w-[48px] lg:h-[48px] xl:w-[60px] xl:h-[60px] rounded-full border-3 sm:border-4 border-[#0A102E] overflow-hidden z-30 relative shadow-lg">
                                                    <img src="/images/Our_Services/Experts/Madhumalathi.png" alt="Expert" className="w-full h-full object-cover grayscale transition-all duration-300" />
                                                </div>
                                                {/* 4 - suraj (Zoomed 20%, top aligned) */}
                                                <div className="w-11 h-11 sm:w-13 sm:h-13 lg:w-[48px] lg:h-[48px] xl:w-[60px] xl:h-[60px] rounded-full border-3 sm:border-4 border-[#0A102E] overflow-hidden z-40 relative shadow-lg">
                                                    <img src="/images/Our_Services/Experts/suraj.png" alt="Expert" className="w-full h-full object-cover grayscale scale-[1.2] origin-top transition-all duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Description & CTA */}
                        <div className="flex flex-col items-start pt-0 lg:pt-0 lg:pl-0 xl:pl-8">
                            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-semibold leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                                {topBox.description}
                            </p>
                            <Link 
                                href={topBox.cta.href}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3886CE] to-[#135498] text-white eyebrow px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(56,134,206,0.8)] shadow-[0_0_15px_rgba(56,134,206,0.5)] border border-[#3886CE]/30 w-full sm:w-auto"
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
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] p-[20px] sm:p-[28px] lg:p-[32px] border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 xl:gap-10">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="h-9 w-9 bg-white shadow-sm flex items-center justify-center rounded-xl mb-4 flex-shrink-0">
                                    {getIcon(card.icon)}
                                </div>
                                <h3 className="text-[16px] font-bold text-[#0A2F52] mb-2 leading-tight font-display">
                                    {card.title}
                                </h3>
                                <p className="text-[13px] text-[#0A2F52]/80 font-medium leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
            </div>
        </section>
    );
}
