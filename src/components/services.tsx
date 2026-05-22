"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { servicesContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export function Services() {
    const label = servicesContent.label;
    const callOutContent = (servicesContent as any).callOutContent || "";
    const metrics = (servicesContent as any).metrics || [];
    const services = servicesContent.services;

    return (
        <section className="bg-[#f8fafc] py-[30px] sm:py-[40px] lg:py-[50px] text-slate-900">
            <div className="mx-auto max-w-[1400px] px-6">

                {/* ── Section Header ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-8 grid gap-12 lg:grid-cols-[1fr_1.2fr]"
                >
                    {/* Left Side */}
                    <div>
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                            {label}
                        </div>

                        <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-tight leading-[1.1] text-slate-900">
                            End-to-end
                            <br />
                            technology
                            <br />
                            <span className="text-[#00D4AA]">
                                partnership.
                            </span>
                        </h2>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col justify-center border-l-[3px] border-[#00D4AA] pl-8 lg:pl-12 py-2">
                        <p className="text-xl sm:text-2xl text-slate-700 font-medium leading-[1.6] mb-12 max-w-2xl">
                            {callOutContent.split("—").map(
                                (
                                    part: string,
                                    i: number,
                                    arr: string[]
                                ) => (
                                    <span key={i}>
                                        {part.trim()}

                                        {i < arr.length - 1 && (
                                            <>
                                                &nbsp;—
                                                <br className="hidden sm:block mt-1" />
                                            </>
                                        )}
                                    </span>
                                )
                            )}
                        </p>

                        <div className="grid grid-cols-3 gap-4 sm:gap-8">
                            {metrics.map((metric: any, idx: number) => {
                                const valStr = String(metric.value);
                                const hasPlus = valStr.includes("+");
                                const valNum = hasPlus
                                    ? valStr.replace("+", "")
                                    : valStr;

                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-start text-left"
                                    >
                                        <div className="flex items-baseline justify-start gap-0.5">
                                            <span className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                                                {valNum}
                                            </span>

                                            {hasPlus && (
                                                <span className="text-slate-900 text-xl sm:text-4xl font-extrabold">
                                                    +
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-sm text-slate-500 font-semibold leading-snug whitespace-pre-line max-w-[120px] sm:max-w-none">
                                            {metric.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* ── Stacking Cards ── */}
                <div className="relative mt-16 lg:mt-20 flex flex-col gap-5 lg:gap-8 pb-[8vh]">
                    {services.map((svc, i) => {
                        return (
                            <div
                                key={svc.num}
                                className="lg:sticky w-full"
                                style={{
                                    top: `calc(90px + ${i * 34}px)`,
                                    zIndex: 10 + i,
                                }}
                            >
                                <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

                                    {/* subtle grid bg */}
                                    <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:28px_28px]" />

                                    <div className="relative flex flex-col lg:flex-row min-h-[520px]">

                                        {/* LEFT CONTENT */}
                                        <div className="relative flex flex-1 flex-col justify-center p-7 sm:p-10 lg:p-16 overflow-hidden">

                                            {/* Huge Number - GREY */}
                                            <div className="pointer-events-none absolute -top-10 left-0 text-[120px] sm:text-[160px] lg:text-[240px] font-black leading-none text-slate-300/30">
                                                {svc.num}
                                            </div>

                                            {/* REMOVED EYEBROW BADGE */}

                                            {/* Title */}
                                            <h3 className="relative z-10 text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight tracking-tight text-slate-900">
                                                {svc.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="relative z-10 mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
                                                {svc.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="relative z-10 mt-8 flex flex-wrap gap-2.5">
                                                {svc.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-wide text-slate-600"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <div className="relative z-10 mt-10">
                                                <Link
                                                    href={svc.href}
                                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_35px_rgba(37,99,235,0.35)]"
                                                >
                                                    Explore service
                                                    <ArrowRightIcon className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* RIGHT IMAGE */}
                                        <div className="hidden lg:block relative flex-1 min-h-[280px] lg:min-h-full overflow-hidden bg-gradient-to-br from-slate-50 to-white">

                                            {/* soft glow */}
                                            <div className="absolute right-[-20%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#3b82f6]/10 blur-3xl" />

                                            {/* left fade */}
                                            <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-white to-transparent lg:block z-10" />

                                            <div className="relative flex h-full items-center justify-center p-6 sm:p-8 lg:p-14">
                                                <div className="relative h-[260px] w-full sm:h-[320px] lg:h-full">

                                                    <Image
                                                        src={svc.image}
                                                        alt={svc.title}
                                                        fill
                                                        className={`object-contain transition-transform duration-700 lg:group-hover:scale-[1.03]
                                                        ${
                                                            i === 1
                                                                ? "lg:scale-125"
                                                                : i === 2
                                                                ? "lg:scale-[1.15]"
                                                                : i === 3
                                                                ? "lg:scale-125"
                                                                : "lg:scale-[1.35]"
                                                        }
                                                    `}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}