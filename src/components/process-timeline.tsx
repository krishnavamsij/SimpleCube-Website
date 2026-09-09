"use client";

import { motion } from "framer-motion";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { processContent } from "@/content/site-content";

export function ProcessTimeline() {
    const { label, headline, sub, steps } = processContent;

    return (
        <section className="bg-background py-20 sm:py-28">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
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

                {/* Steps */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className={`relative mt-16 grid gap-0 sm:grid-cols-2 ${
                        steps.length === 3 ? "lg:grid-cols-3" : 
                        steps.length === 5 ? "lg:grid-cols-5" : 
                        "lg:grid-cols-4"
                    }`}
                >
                    {/* Connecting line (desktop) */}
                    <div 
                        className="pointer-events-none absolute top-7 hidden h-0.5 bg-gradient-to-r from-[#135498] to-emerald-500 lg:block"
                        style={{
                            left: `${(0.5 / Math.max(1, steps.length)) * 100}%`,
                            right: `${(0.5 / Math.max(1, steps.length)) * 100}%`
                        }}
                    />

                    {steps.map((step) => (
                        <motion.div
                            key={step.num}
                            variants={scrollReveal}
                            className="relative px-4 py-6 text-center lg:py-0"
                        >
                            {/* Step number circle */}
                            <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-background bg-gradient-to-br from-[#135498] to-blue-700 shadow-lg shadow-blue-600/20">
                                <span className="text-lg font-extrabold text-white">
                                    {step.num}
                                </span>
                            </div>

                            <h4 className="text-base font-bold text-foreground">
                                {step.title}
                            </h4>
                            <p className="mx-auto mt-2 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
