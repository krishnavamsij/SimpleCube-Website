"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { approachContent } from "@/content/site-content";
import { useCountUp } from "@/lib/use-count-up";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

function MetricCard({
    metric,
    index,
}: {
    metric: { value: number; suffix: string; label: string };
    index: number;
}) {
    const { count, ref } = useCountUp(metric.value, 2000);

    // Teal → Cyan gradient accent per card
    const accents = [
        { bar: "from-[#00D4AA] to-[#00A8FF]", text: "from-[#00D4AA] to-[#00A8FF]" },
        { bar: "from-[#00A8FF] to-[#1F35A4]", text: "from-[#00A8FF] to-[#1F35A4]" },
        { bar: "from-[#00D4AA] to-[#1F35A4]", text: "from-[#00D4AA] to-[#1F35A4]" },
    ];
    const accent = accents[index % accents.length];

    return (
        <div
            ref={ref}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
            {/* Left accent bar */}
            <div className={`absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b ${accent.bar}`} />

            <div className="flex items-end justify-between gap-4">
                <div>
                    <span
                        className={`block text-5xl font-black tracking-tight bg-gradient-to-r ${accent.text} bg-clip-text text-transparent sm:text-6xl`}
                    >
                        {count}
                        {metric.suffix}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-slate-300 sm:text-[15px]">
                        {metric.label}
                    </span>
                </div>

                {/* Mini bar chart decoration */}
                <div className="flex items-end gap-[3px] opacity-40">
                    {[40, 65, 50, 80, 60, 95].map((h, i) => (
                        <div
                            key={i}
                            className={`w-[5px] rounded-sm bg-gradient-to-t ${accent.bar}`}
                            style={{ height: `${h * 0.5}px` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Approach() {
    const { label, headline, sub, metrics, cta } = approachContent;
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#030B3B] py-20 sm:py-28">
            {/* Grid overlay — brand visual pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            {/* Radial glow top-right */}
            <motion.div
                style={{ y: bgY }}
                className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00D4AA]/10 blur-[120px]"
            />
            {/* Radial glow bottom-left */}
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#1F35A4]/20 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-[1200px] px-6">
                {/* ── Two-column layout ── */}
                <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">

                    {/* ── Left: Heading + CTA ── */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex-1"
                    >
                        {/* Label pill */}
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4AA]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
                            {label}
                        </span>

                        <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
                            {headline}
                        </h2>

                        <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-[17px]">
                            {sub}
                        </p>

                        {/* Divider with accent */}
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#00D4AA] to-transparent" />
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
                                proven results
                            </span>
                        </div>

                        <Link
                            href={cta.href}
                            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00D4AA] to-[#00A8FF] px-7 py-3.5 text-sm font-bold text-[#030B3B] shadow-lg shadow-[#00D4AA]/20 transition-all hover:shadow-[#00D4AA]/40 hover:scale-[1.02]"
                        >
                            {cta.label}
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </Link>
                    </motion.div>

                    {/* ── Right: Metric cards ── */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-4">
                            {metrics.map((metric, i) => (
                                <motion.div
                                    key={metric.label}
                                    variants={scrollReveal}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                    transition={{ delay: i * 0.12 }}
                                >
                                    <MetricCard metric={metric} index={i} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom caption */}
                        <p className="mt-6 text-center text-xs text-slate-500">
                            Based on 20+ years of enterprise delivery benchmarks
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
