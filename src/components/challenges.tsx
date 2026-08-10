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
        <section id="challenges-section" className="bg-[#f8f9fa] py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                {/* Section header */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-4 sm:px-5 py-1.5 mb-4 sm:mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        THE ENTERPRISE REALITY
                    </div>
                    <h2 className="text-[28px] sm:text-[44px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Challenges we <span className="text-[#00D4AA]">solve.</span>
                    </h2>
                </motion.div>

                {/* Card grid */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 lg:gap-3.5 xl:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                >
                    {challenges.map((challenge) => {
                        const Icon = iconMap[challenge.icon];
                        return (
                            <motion.div
                                key={challenge.title}
                                variants={scrollReveal}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 xl:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200 h-full"
                            >
                                {/* Top accent bar on hover */}
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Icon */}
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 flex-shrink-0">
                                    {Icon && <Icon className="h-6 w-6 text-[#1e90ff]" />}
                                </div>

                                {/* Title */}
                                <h3 className="text-[14px] lg:text-[15px] font-black text-[#030B3B] leading-tight mb-2 tracking-tight whitespace-nowrap flex-shrink-0 font-display">
                                    {challenge.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[12px] lg:text-[13px] text-slate-500 font-medium leading-relaxed flex-grow max-w-none">
                                    {/* @ts-ignore */}
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
