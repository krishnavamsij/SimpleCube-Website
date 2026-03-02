"use client";

import { motion } from "framer-motion";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { approachContent } from "@/content/site-content";
import { useCountUp } from "@/lib/use-count-up";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";

function MetricCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const { count, ref } = useCountUp(value, 2000);
    return (
        <div ref={ref} className="text-center">
            <span className="block text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {count}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {suffix}
                </span>
            </span>
            <span className="mt-2 block text-sm font-medium text-slate-400 sm:text-base">
                {label}
            </span>
        </div>
    );
}

export function Approach() {
    const { label, headline, sub, metrics, cta } = approachContent;

    return (
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 sm:py-28">
            <div className="mx-auto max-w-[1200px] px-6">
                {/* Header */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
                        {label}
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {headline}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                        {sub}
                    </p>
                </motion.div>

                {/* Animated metrics */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-16 grid gap-10 sm:grid-cols-3"
                >
                    {metrics.map((metric) => (
                        <motion.div key={metric.label} variants={scrollReveal}>
                            <MetricCounter value={metric.value} suffix={metric.suffix} label={metric.label} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 text-center"
                >
                    <Button size="lg" asChild className="bg-blue-600 text-white shadow-lg hover:bg-blue-500">
                        <Link href={cta.href}>
                            {cta.label} <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
