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
        <section className="bg-white py-14 sm:py-18">
            <div className="mx-auto max-w-[1200px] px-6">
                {/* Section header — Accenture-style label above cards */}
                <motion.p
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-sm font-semibold text-slate-500"
                >
                    Learn more about the challenges we solve:
                </motion.p>

                {/* 5-column horizontal card grid */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
                >
                    {challenges.map((challenge) => {
                        const Icon = iconMap[challenge.icon];
                        return (
                            <motion.div
                                key={challenge.title}
                                variants={scrollReveal}
                                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200"
                            >
                                {/* Top accent bar on hover */}
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Icon */}
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                                    {Icon && <Icon className="h-5 w-5 text-blue-600" />}
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-bold text-slate-800">
                                    {challenge.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-2 text-xs leading-relaxed text-slate-500">
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
