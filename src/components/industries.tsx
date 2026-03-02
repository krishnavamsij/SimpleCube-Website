"use client";

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
    const { label, headline, sub, industries } = industriesContent;

    return (
        <section className="bg-muted/30 py-20 sm:py-28">
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

                {/* Industry chips */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-12 flex flex-wrap gap-3"
                >
                    {industries.map((industry) => {
                        const Icon = iconMap[industry.icon];
                        return (
                            <motion.div
                                key={industry.title}
                                variants={scrollReveal}
                                className="flex cursor-default items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary hover:shadow-sm"
                            >
                                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                                {industry.title}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
