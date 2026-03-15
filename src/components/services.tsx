"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { servicesContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

export function Services() {
    const { label, headline, sub, services } = servicesContent;
    const [activeIndex, setActiveIndex] = useState(0);
    const active = services[activeIndex];

    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-[1200px] px-6">
                {/* ── Section header ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-14"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1F35A4]">
                        {label}
                    </p>
                    <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        {headline}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
                        {sub}
                    </p>
                </motion.div>

                {/* ── Two-column: Tabs + Content ── */}
                <div className="flex flex-col gap-0 lg:flex-row lg:gap-0 lg:rounded-2xl lg:border lg:border-slate-200 lg:overflow-hidden lg:shadow-sm">

                    {/* ── Left: vertical tab list ── */}
                    <div className="flex flex-col lg:w-[300px] lg:flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50">
                        {services.map((svc, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <button
                                    key={svc.num}
                                    onClick={() => setActiveIndex(i)}
                                    className={`group relative flex items-center gap-4 px-6 py-5 text-left transition-all duration-200 ${
                                        isActive
                                            ? "bg-white"
                                            : "hover:bg-white/70"
                                    }`}
                                >
                                    {/* Active left accent bar */}
                                    <div
                                        className={`absolute inset-y-0 left-0 w-[3px] rounded-r-sm bg-gradient-to-b from-[#00D4AA] to-[#1F35A4] transition-opacity duration-200 ${
                                            isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                    />

                                    {/* Number */}
                                    <span
                                        className={`text-sm font-bold tabular-nums transition-colors ${
                                            isActive ? "text-[#1F35A4]" : "text-slate-400 group-hover:text-slate-600"
                                        }`}
                                    >
                                        {svc.num}
                                    </span>

                                    {/* Title */}
                                    <span
                                        className={`text-sm font-semibold leading-tight transition-colors ${
                                            isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                                        }`}
                                    >
                                        {svc.title}
                                    </span>

                                    {isActive && (
                                        <ArrowUpRightIcon className="ml-auto h-4 w-4 flex-shrink-0 text-[#1F35A4]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* ── Right: active service content ── */}
                    <div className="relative flex-1 overflow-hidden bg-white">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/7] w-full overflow-hidden bg-slate-100">
                                    <Image
                                        src={active.image}
                                        alt={active.title}
                                        fill
                                        className="object-cover transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                                    {/* Number badge */}
                                    <span className="absolute left-6 bottom-5 rounded-lg bg-[#1F35A4] px-3 py-1.5 text-sm font-bold text-white shadow">
                                        {active.num}
                                    </span>
                                </div>

                                {/* Text content */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                                        {active.title}
                                    </h3>
                                    <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-[17px]">
                                        {active.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {active.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href={active.href}
                                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F35A4] transition-colors hover:text-[#00A8FF]"
                                    >
                                        Learn more <ArrowUpRightIcon className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
