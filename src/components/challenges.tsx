"use client";

import { motion } from "framer-motion";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { challengesContent } from "@/content/site-content";
import {
    Construction,
    Clock,
    DollarSign,
    Scale,
    Brain,
    ShieldAlert,
    type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Construction,
    Clock,
    DollarSign,
    Scale,
    Brain,
    ShieldAlert,
};

export function Challenges() {
    const { challenges } = challengesContent;

    return (
        <section className="bg-white py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
                {/* Section header — Accenture-style label above cards */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-4 sm:px-5 py-1.5 mb-4 sm:mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        THE ENTERPRISE REALITY
                    </div>
                    <h2 className="text-[28px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Challenges we <span className="text-[#00D4AA]">solve.</span>
                    </h2>
                </motion.div>

                {/* Responsive card grid: 1 col mobile, 2 cols tablet, 5 cols desktop */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                >
                    {challenges.map((challenge) => {
                        const Icon = iconMap[challenge.icon];
                        return (
                            <motion.div
                                key={challenge.title}
                                variants={scrollReveal}
                                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200"
                            >
                                {/* Top accent bar on hover */}
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Icon */}
                                <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-blue-50">
                                    {Icon && <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#1e90ff]" />}
                                </div>

                                {/* Title */}
                                <h3 className="text-base sm:text-sm font-bold text-slate-800 leading-snug">{challenge.title}</h3>

                                {/* Description */}
                                <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-slate-500">
                                    {challenge.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
