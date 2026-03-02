"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { servicesContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

function ServiceCard({ service, index }: { service: typeof servicesContent.services[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const isReversed = index % 2 === 1;

    return (
        <motion.div
            ref={ref}
            variants={scrollReveal}
            className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}
        >
            {/* Image */}
            <motion.div
                style={{ y: imageY }}
                className="relative w-full overflow-hidden rounded-2xl lg:w-1/2"
            >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    {/* Number badge */}
                    <span className="absolute bottom-4 left-4 rounded-lg bg-blue-600/90 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
                        {service.num}
                    </span>
                </div>
            </motion.div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {service.description}
                </p>
                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Learn more <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
            </div>
        </motion.div>
    );
}

export function Services() {
    const { label, headline, sub, services } = servicesContent;

    return (
        <section className="bg-background py-20 sm:py-28">
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

                {/* Service rows */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-20 space-y-24"
                >
                    {services.map((service, i) => (
                        <ServiceCard key={service.num} service={service} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
