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
        <section className="bg-white py-[16px] sm:py-[24px] lg:py-[32px]">
            <div className="mx-auto w-full max-w-[90rem] px-6 md:px-10 lg:px-16 flex flex-col gap-6">
                
                {/* ── Top Box: Dark Glowing Container ── */}
                <motion.div 
                    variants={scrollReveal} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={viewportOnce}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[24px] sm:p-[36px] lg:p-[48px]"
                >
                    <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
                        <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                        WHY HYNIVA
                    </div>
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-12 items-start">
                        {/* Left Side: Headline & Stats */}
                        <div className="md:col-span-6 lg:col-span-6">
                            <h2 className="text-[28px] sm:text-[36px] md:text-[36px] lg:text-[52px] font-[900] text-[#ffffff] tracking-tight leading-[1.1] mb-4 sm:mb-6 lg:mb-8 font-display">
                                {topBox.headline.split(topBox.highlightedWord).map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i < arr.length - 1 && <span className="text-[#00D4AA]">{topBox.highlightedWord}</span>}
                                    </React.Fragment>
                                ))}
                            </h2>
                            
                            <div className="flex flex-col gap-6 sm:gap-12 lg:gap-16">
                                <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-6 lg:gap-12 w-full">
                                    {topBox.stats.map((stat, idx) => (
                                        <div key={idx} className="flex flex-col flex-shrink-0">
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-[900] text-white leading-none font-display">
                                                    {stat.value.replace('+', '')}
                                                </span>
                                                {stat.value.includes('+') && (
                                                    <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-white leading-none">+</span>
                                                )}
                                            </div>
                                            <span className="text-[11px] sm:text-[13px] md:text-[13px] lg:text-[15px] text-slate-400 font-medium whitespace-normal leading-tight">
                                                {stat.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Description & CTA */}
                        <div className="flex flex-col items-start pt-4 md:pt-0 md:col-span-6 lg:col-span-6 md:pl-4 lg:pl-6 xl:pl-10">
                            <p className="text-base sm:text-lg md:text-[17px] lg:text-[18.5px] text-slate-300 font-medium leading-[1.7] mb-6 sm:mb-8 lg:mb-10 max-w-[460px] lg:max-w-[480px]">
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
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] pt-[24px] pb-[20px] px-[24px] sm:pt-[32px] sm:pb-[24px] sm:px-[36px] lg:pt-[40px] lg:pb-[32px] lg:px-[48px] border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6 lg:gap-12 xl:gap-16">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="h-9 w-9 bg-white shadow-sm flex items-center justify-center rounded-xl mb-3 flex-shrink-0 border border-[#3B82F6]/10">
                                    {getIcon(card.icon)}
                                </div>
                                <h3 className="text-[15px] lg:text-[16px] font-black text-[#030B3B] mb-2 leading-tight font-display">
                                    {card.title}
                                </h3>
                                <p className="text-[12px] lg:text-[13px] text-[#030B3B]/80 font-medium leading-relaxed">
                                    {card.description.replace(/\n/g, ' ')}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
            </div>
        </section>
    );
}
