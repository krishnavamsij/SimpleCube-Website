"use client";

import { motion } from "framer-motion";
import { whyHynivaContent } from "@/content/site-content";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { UsersRound, Globe2, Zap, Activity } from "lucide-react";
import Link from "next/link";
import React from "react";

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
        <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-[1200px] flex flex-col gap-4">
                
                {/* ── Top Box: Dark Glowing Container ── */}
                <motion.div 
                    variants={scrollReveal} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={viewportOnce}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-10 sm:p-16 lg:p-20"
                >
                    <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
                        <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                        WHY HYNIVA
                    </div>
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24 items-center">
                        {/* Left Side: Headline & Stats */}
                        <div>
                            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-[900] text-[#ffffff] tracking-tight leading-[1.05] mb-12 font-display">
                                {topBox.headline.split(topBox.highlightedWord).map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i < arr.length - 1 && <span className="text-[#00D4AA]">{topBox.highlightedWord}</span>}
                                    </React.Fragment>
                                ))}
                            </h2>
                            
                            <div className="flex gap-12 sm:gap-16">
                                {topBox.stats.map((stat, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <div className="flex items-baseline gap-1 mb-2">
                                            <span className="text-3xl sm:text-4xl font-[900] text-white leading-none font-display">
                                                {stat.value.replace('+', '')}
                                            </span>
                                            {stat.value.includes('+') && (
                                                <span className="text-2xl sm:text-3xl font-black text-[#00D4AA] leading-none">+</span>
                                            )}
                                        </div>
                                        <span className="text-[14px] sm:text-[15px] text-slate-400 font-medium whitespace-pre-line leading-tight">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Description & CTA */}
                        <div className="flex flex-col items-start pt-4 lg:pt-0">
                            <p className="text-lg sm:text-xl text-slate-300 font-semibold leading-relaxed mb-10">
                                {topBox.description}
                            </p>
                            <Link 
                                href={topBox.cta.href}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white eyebrow px-8 py-3.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3B82F6]/30"
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
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] p-10 sm:p-14 lg:p-16 border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {bottomBox.map((card, idx) => (
                            <div key={idx} className={`flex flex-col ${idx > 0 ? "pt-8 sm:pt-0 sm:pl-8 lg:pl-8" : ""}`}>
                                <div className="h-10 w-10 bg-white shadow-sm flex items-center justify-center rounded-xl mb-6 flex-shrink-0">
                                    {getIcon(card.icon)}
                                </div>
                                <h3 className="text-[18px] font-black text-[#030B3B] mb-3 leading-tight font-display">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-[#030B3B]/80 font-medium leading-relaxed whitespace-pre-line">
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
