"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Landmark, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { careersHomeContent } from "@/content/site-content";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { HighlightedHeadline } from "@/components/ui/highlighted-headline";
import { CONTAINER_CLASS } from "@/lib/container-utils";

const iconMap: Record<string, LucideIcon> = {
    Landmark,
    Sparkles,
    Zap,
};

export function CareersHome() {
    const { headline, highlightedWord, description, points, cta } = careersHomeContent;

    return (
        <section
            id="careers-section"
            className="relative border-t border-[#135498]/10 bg-white py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden"
        >
            {/* Left-edge brand accent + soft primary warmth */}
            <div
                className="absolute inset-y-0 left-0 w-1 sm:w-1.5 bg-gradient-to-b from-[#135498] to-[#3886CE] pointer-events-none"
                aria-hidden
            />
            <div
                className="absolute inset-0 bg-[#135498]/[0.035] pointer-events-none"
                aria-hidden
            />

            <div className={`relative ${CONTAINER_CLASS}`}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-3xl"
                >
                    <h2 className="text-[28px] sm:text-[44px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.1] whitespace-normal break-words max-w-full">
                        <HighlightedHeadline
                            headline={headline}
                            highlightedWord={highlightedWord}
                        />
                    </h2>
                    <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 lg:gap-4 xl:gap-5 grid-cols-1 md:grid-cols-3"
                >
                    {points.map((point) => {
                        const Icon = iconMap[point.icon];
                        return (
                            <motion.div
                                key={point.title}
                                variants={scrollReveal}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 lg:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200 h-full"
                            >
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#135498] to-[#3886CE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f1fa] flex-shrink-0">
                                    {Icon && <Icon className="h-6 w-6 text-[#3886CE]" />}
                                </div>

                                <h3 className="text-[14px] lg:text-[15px] font-black text-[#0A2F52] leading-tight mb-2 tracking-tight font-display">
                                    {point.title}
                                </h3>
                                <p className="text-[12px] lg:text-[13px] text-slate-500 font-medium leading-relaxed">
                                    {point.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-10"
                >
                    <Button
                        size="lg"
                        asChild
                        className="bg-[#135498] text-white hover:bg-[#0F427A] border border-transparent rounded-full font-bold px-6 xl:px-8 h-12 xl:h-14 text-sm xl:text-base shadow-[0_4px_14px_rgba(19,84,152,0.28)]"
                    >
                        <Link href={cta.href}>
                            {cta.label} <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
