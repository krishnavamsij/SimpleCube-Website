"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { caseStudiesContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

function CaseStudyCard({ study, index }: { study: typeof caseStudiesContent.studies[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const isReversed = index % 2 === 1;

    return (
        <motion.div
            ref={ref}
            variants={scrollReveal}
            className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}
        >
            {/* Image side */}
            <motion.div
                style={{ y: imageY }}
                className="relative w-full lg:w-1/2"
            >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-xl">
                    <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>
            </motion.div>

            {/* Content side */}
            <div className="w-full lg:w-1/2">
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    {study.industry}
                </span>
                <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-foreground sm:text-2xl">
                    {study.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {study.description}
                </p>

                {/* Results */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                    {study.results.map((r) => (
                        <div key={r.label} className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
                            <span className="block text-2xl font-extrabold text-blue-600 dark:text-emerald-400 sm:text-3xl">
                                {r.value}
                            </span>
                            <span className="mt-1 block text-[11px] font-medium leading-tight text-muted-foreground">
                                {r.label}
                            </span>
                        </div>
                    ))}
                </div>

                <Link
                    href={study.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Read Case Study <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
            </div>
        </motion.div>
    );
}

export function CaseStudies() {
    const { label, headline, sub, studies } = caseStudiesContent;

    return (
        <section className="bg-secondary py-20 sm:py-28">
            <div className="mx-auto max-w-[1200px] px-6">
                {/* Header */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                        {label}
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {headline}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {sub}
                    </p>
                </motion.div>

                {/* Case study rows */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-20 space-y-24"
                >
                    {studies.map((study, i) => (
                        <CaseStudyCard key={study.title} study={study} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
