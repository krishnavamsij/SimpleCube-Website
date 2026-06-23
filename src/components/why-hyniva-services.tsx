"use client";

import { motion } from "framer-motion";
import { expertiseContent } from "@/content/site-content";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { Calendar, Star, Calendar as CalendarAlt } from "lucide-react";
import Link from "next/link";
import React from "react";

const getIcon = (name: string) => {
    switch (name) {
        case "Calendar": return <Calendar className="w-5 h-5 text-[#3B82F6]" />;
        case "CircleArrowRight": return (
            <div className="relative w-5 h-5 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2" fill="none"/>
                    <path d="M9 12L11 14L11 10L9 12Z M13 12L15 14L15 10L13 12Z" fill="#3B82F6"/>
                    <path d="M9 10L11 12L9 14 M13 10L15 12L13 14" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        );
        case "Star": return <Star className="w-5 h-5 text-[#3B82F6]" />;
        case "CalendarCheck": return <CalendarAlt className="w-5 h-5 text-[#3B82F6]" />;
        default: return <Calendar className="w-5 h-5 text-[#3B82F6]" />;
    }
};

export function WhyHynivaServices() {
    const { topBox, bottomBox } = expertiseContent;

    return (
        <section className="bg-white px-6 py-[24px] sm:py-[32px] lg:py-[40px] lg:px-8">
            <div className="mx-auto max-w-[1200px] flex flex-col gap-3">
                
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
                        WHY HYNIVA
                    </div>
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-8 lg:gap-24 lg:grid-cols-[1fr_1.3fr] items-center">
                        {/* Left Side: Headline & Stats */}
                        <div>
                            <h2 className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-[900] text-[#ffffff] tracking-tight leading-[1.1] mb-6 sm:mb-8 lg:mb-12 font-display">
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
                                        <div key={idx} className="flex flex-col flex-shrink-0">
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-white leading-none font-display">
                                                    {stat.value.replace('+', '')}
                                                </span>
                                                {stat.value.includes('+') && (
                                                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none">+</span>
                                                )}
                                            </div>
                                            <span className="text-[12px] sm:text-[14px] lg:text-[15px] text-slate-400 font-medium whitespace-pre-line leading-tight max-w-[80px] sm:max-w-none">
                                                {stat.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Description & CTA */}
                        <div className="flex flex-col items-start pt-4 lg:pt-0">
                            <p className="text-[14px] sm:text-[16px] lg:text-[17px] text-slate-300 font-semibold leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                                {topBox.description}
                            </p>
                            <Link 
                                href={topBox.cta.href}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white eyebrow px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3B82F6]/30 w-full sm:w-auto"
                            >
                                {topBox.cta.label}
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
                            <div key={idx} className="flex flex-col">
                                <div className="h-10 w-10 flex items-center justify-center mb-3 flex-shrink-0">
                                    {getIcon(card.icon)}
                                </div>
                                <h3 className="text-[18px] font-black text-[#030B3B] mb-2 leading-tight font-display">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-[#030B3B]/80 font-medium leading-[1.5]">
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
