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
    const { label, headline, sub, challenges } = challengesContent;

    return (
        <section className="bg-secondary py-20 sm:py-28">
            <div className="mx-auto max-w-[1200px] px-6">
                {/* Header */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                        {label}
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {headline}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {sub}
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {challenges.map((challenge) => {
                        const Icon = iconMap[challenge.icon];
                        return (
                            <motion.div
                                key={challenge.title}
                                variants={scrollReveal}
                                className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                            >
                                {/* Top gradient bar on hover */}
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
                                    {Icon && <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                                </div>
                                <h3 className="text-base font-bold text-foreground">
                                    {challenge.title}
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
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
