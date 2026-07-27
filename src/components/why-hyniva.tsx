"use client";

import { motion } from "framer-motion";
import { whyHynivaContent } from "@/content/site-content";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { UsersRound, Globe2, Zap, Activity } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CONTAINER_CLASS } from "@/lib/container-utils";

const getIcon = (name: string) => {
    switch (name) {
        case "UsersRound": return <UsersRound className="w-5 h-5 text-[#3B82F6]" />;
        case "Globe2": return <Globe2 className="w-5 h-5 text-[#3B82F6]" />;
        case "Zap": return <Zap className="w-5 h-5 text-[#3B82F6]" />;
        case "Activity": return <Activity className="w-5 h-5 text-[#3B82F6]" />;
        default: return <Activity className="w-5 h-5 text-[#3B82F6]" />;
    }
};

export function WhyHyniva() {
    const { topBox, bottomBox } = whyHynivaContent;

    return (
        <section className="bg-white py-[14px] sm:py-[20px] lg:py-[26px]">
            <div className="mx-auto w-full max-w-[82rem] px-6 md:px-10 lg:px-16 flex flex-col gap-4">
                
                {/* ── Top Box: Dark Glowing Container ── */}
                <motion.div 
                    variants={scrollReveal} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={viewportOnce}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[20px] sm:p-[28px] lg:p-[36px]"
                >
                    <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
                        <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                        WHY HYNIVA
                    </div>
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-8 lg:gap-16 lg:grid-cols-2 items-center">
                        {/* Left Side: Headline & Stats */}
                        <div>
                            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-[900] text-[#ffffff] tracking-tight leading-[1.1] mb-4 sm:mb-6 lg:mb-8 font-display">
                                {topBox.headline.split(topBox.highlightedWord).map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i < arr.length - 1 && <span className="text-[#00D4AA]">{topBox.highlightedWord}</span>}
                                    </React.Fragment>
                                ))}
                            </h2>
                            
                            <div className="flex flex-col gap-6 sm:gap-12 lg:gap-16">
                                <div className="flex flex-wrap gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
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
                        <div className="flex flex-col items-start pt-4 lg:pt-0 lg:pl-16">
                            <p className="text-base sm:text-lg lg:text-lg text-slate-300 font-semibold leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-lg">
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
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] pt-[20px] pb-[16px] px-[20px] sm:pt-[28px] sm:pb-[20px] sm:px-[28px] lg:pt-[36px] lg:pb-[20px] lg:px-[36px] border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="h-8 w-8 bg-white shadow-sm flex items-center justify-center rounded-lg mb-2 flex-shrink-0">
                                    {getIcon(card.icon)}
                                </div>
                                <h3 className="text-[14px] font-black text-[#030B3B] mb-1.5 leading-tight font-display">
                                    {card.title}
                                </h3>
                                <p className="text-[11px] lg:text-[11.5px] text-[#030B3B]/80 font-medium leading-[1.65] whitespace-pre-line">
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
