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
        <section className="bg-white py-[30px] sm:py-[40px] lg:py-[50px] text-slate-900">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">

                {/* ── Section Header ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-8 grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-12"
                >
                    {/* Left Side */}
                    <div className="md:col-span-5">
                        <h2 className="text-[32px] sm:text-[40px] md:text-[42px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight leading-[1.1] text-slate-900">
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
                    <div className="flex flex-col justify-center md:col-span-7 border-l-[3px] border-[#00D4AA] pl-6 md:pl-8 lg:pl-12 py-2">
                        <p className="text-base sm:text-lg md:text-[17px] lg:text-[18px] 2xl:text-[20px] text-slate-700 font-medium leading-[1.6] mb-8 md:mb-10 max-w-2xl">
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

                        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8">
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
                                            <span className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-black text-slate-900 font-display">
                                                {valNum}
                                            </span>

                                            {hasPlus && (
                                                <span className="text-slate-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-black font-display">
                                                    +
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-500 font-semibold leading-snug whitespace-normal sm:whitespace-pre-line">
                                            {metric.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* ── Stacking Cards ── */}
                <div className="relative mt-12 md:mt-16 lg:mt-20 flex flex-col gap-5 lg:gap-8 pb-[8vh]">
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

                                    <div className="relative flex flex-col md:flex-row min-h-[460px] md:min-h-[480px] lg:min-h-[520px]">

                                        {/* LEFT CONTENT */}
                                        <div className="relative flex flex-1 flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-16 overflow-hidden">

                                            {/* Huge Number - GREY */}
                                            <div className="pointer-events-none absolute -top-10 left-0 text-[100px] sm:text-[140px] md:text-[180px] lg:text-[240px] font-black leading-none text-slate-300/30">
                                                {svc.num}
                                            </div>


                                            {/* Title */}
                                            <h3 className="relative z-10 text-2xl sm:text-3xl md:text-3xl lg:text-[30px] font-extrabold leading-tight tracking-tight text-slate-900">
                                                {svc.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="relative z-10 mt-4 md:mt-6 max-w-xl text-xs sm:text-sm lg:text-[15px] font-medium leading-[1.7] text-slate-600">
                                                {svc.description}
                                            </p>

                                             {/* Tags */}
                                            <div className="relative z-10 mt-6 md:mt-8 flex flex-wrap gap-1.5 sm:gap-2">
                                                {svc.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs lg:text-[13px] font-semibold tracking-normal text-slate-600"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <div className="relative z-10 mt-8 md:mt-10">
                                                <Link
                                                    href={svc.href}
                                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_35px_rgba(37,99,235,0.35)]"
                                                >
                                                    Explore service
                                                    <ArrowRightIcon className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* RIGHT IMAGE */}
                                        <div className="hidden md:block relative flex-1 min-h-[260px] md:min-h-full overflow-hidden bg-gradient-to-br from-slate-50 to-white">

                                            {/* soft glow */}
                                            <div className="absolute right-[-20%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#3b82f6]/10 blur-3xl" />

                                            {/* left fade */}
                                            <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-white to-transparent md:block z-10" />

                                            <div className="relative flex flex-col h-full items-center justify-center p-6 sm:p-8 md:p-10 lg:p-14">
                                                <div className="relative h-[240px] w-full sm:h-[280px] md:h-[320px] lg:h-full z-10">

                                                    <Image
                                                        src={svc.image}
                                                        alt={svc.title}
                                                        fill
                                                        className={`object-contain transition-transform duration-700 md:group-hover:scale-[1.03]
                                                        ${
                                                            i === 1
                                                                ? "md:scale-110 lg:scale-125"
                                                                : i === 2
                                                                ? "md:scale-[1.01] lg:scale-[1.02] lg:-translate-y-4"
                                                                : i === 3
                                                                ? "md:scale-110 lg:scale-125"
                                                                : "md:scale-[1.2] lg:scale-[1.35]"
                                                        }
                                                    `}
                                                    />
                                                </div>
                                                <div
                                                    className={`pointer-events-none absolute bottom-0 right-0 z-20 text-[40px] sm:text-[60px] md:text-[52px] lg:text-[68px] xl:text-[82px] 2xl:text-[92px] font-black leading-[0.82] text-slate-400/35 text-right tracking-tight select-none ${
                                                        svc.num === "03" ? "-translate-y-3 sm:-translate-y-4 md:-translate-y-5 lg:-translate-y-6" : ""
                                                    }`}
                                                >
                                                    {svc.num === "01" ? "Transform" : 
                                                     svc.num === "02" ? "Connect" : 
                                                     svc.num === "03" ? "Build" : 
                                                     svc.num === "04" ? "Guide" : ""}
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