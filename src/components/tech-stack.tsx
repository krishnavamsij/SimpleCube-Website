"use client";

import { motion } from "framer-motion";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { techContent } from "@/content/site-content";
import { ShieldCheck } from "lucide-react";

export function TechStack() {
    const { label, headline, sub, certification, groups } = techContent;

    return (
        <section className="bg-background py-20 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-16">
                    {/* Left column — text */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                            {label}
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            {headline}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            {sub}
                        </p>
                        <div className="mt-7 inline-flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
                            <ShieldCheck className="h-5 w-5 text-accent" />
                            {certification}
                        </div>
                    </motion.div>

                    {/* Right column — tech grid */}
                    <motion.div
                        variants={scrollStaggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {groups.map((group) => (
                            <motion.div
                                key={group.title}
                                variants={scrollReveal}
                                className="rounded-xl border border-border bg-card p-5"
                            >
                                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">
                                    {group.title}
                                </h4>
                                <ul className="space-y-1.5">
                                    {group.items.map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
