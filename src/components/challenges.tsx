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
            <div className="mx-auto max-w-[1400px] px-6">
                {/* Section header — Accenture-style label above cards */}
                <motion.h2
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
                >
                    Learn more about the challenges we solve
                </motion.h2>

                {/* 5-column horizontal card grid */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
                >
                    {challenges.map((challenge) => {
                        const Icon = iconMap[challenge.icon];
                        return (
                            <motion.div
                                key={challenge.title}
                                variants={scrollReveal}
                                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200"
                            >
                                {/* Top accent bar on hover */}
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Icon */}
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                                    {Icon && <Icon className="h-7 w-7 text-blue-600" />}
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-bold text-slate-800">
                                    {challenge.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3 text-sm leading-relaxed text-slate-500">
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
