"use client";

import React from "react";
import { motion } from "framer-motion";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { industriesContent } from "@/content/site-content";
import {
    Landmark,
    TrendingUp,
    BarChart3,
    Shield,
    Truck,
    Cpu,
    GraduationCap,
    type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Landmark,
    TrendingUp,
    BarChart3,
    Shield,
    Truck,
    Cpu,
    GraduationCap,
};

export function Industries() {
    const { label, headline, highlightedWord, sub, industries } = industriesContent;

    return (
        <section className="bg-[#ECF6FF] py-24 sm:py-32">
            <div className="mx-auto max-w-[1400px] px-6">
                {/* Header */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-3xl"
                >
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3b82f6] bg-[#3b82f6]/[0.08] border border-[#3b82f6]/25 rounded-full px-5 py-1.5 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_8px_#3b82f6] animate-pulse" />
                        {label}
                    </div>
                    <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[#030B3B] sm:text-5xl lg:text-[56px] leading-[1.1] whitespace-pre-line">
                        {headline.split(highlightedWord).map((part, i, arr) => (
                            <React.Fragment key={i}>
                                {part}
                                {i < arr.length - 1 && <span className="text-[#3b82f6]">{highlightedWord}</span>}
                            </React.Fragment>
                        ))}
                    </h2>
                    <p className="mt-6 text-lg sm:text-xl font-medium leading-relaxed text-slate-700">
                        {sub}
                    </p>
                </motion.div>

                {/* Industry chips */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-12 flex flex-wrap gap-y-5 gap-x-4 max-w-[900px]"
                >
                    {industries.map((industry, i) => {
                        const Icon = iconMap[industry.icon];
                        const isActive = i === 0;
                        return (
                            <motion.div
                                key={industry.title}
                                variants={scrollReveal}
                                className={`flex cursor-default items-center gap-3 rounded-full border px-6 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                                    isActive 
                                        ? "bg-[#030B3B] border-[#030B3B] text-white shadow-sm"
                                        : "bg-white/70 border-[#030B3B]/10 text-[#030B3B] hover:bg-white hover:border-[#3b82f6]/40"
                                }`}
                            >
                                {Icon && <Icon className={`h-5 w-5 ${isActive ? "text-[#3b82f6]" : "text-[#3b82f6]"}`} />}
                                {industry.title}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
