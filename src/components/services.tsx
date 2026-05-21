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
                {/* ── Section header ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-8 grid gap-12 lg:grid-cols-[1fr_1.2fr]"
                >
                    {/* Left Side: Eyebrow and Heading */}
                    <div>
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                            {label}
                        </div>
                        <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-tight leading-[1.1] text-slate-900">
                            End-to-end<br />
                            technology<br />
                            <span className="text-[#00D4AA]">partnership.</span>
                        </h2>
                    </div>

                    {/* Right Side: Callout and metrics */}
                    <div className="flex flex-col justify-center border-l-[3px] border-[#00D4AA] pl-8 lg:pl-12 py-2">
                        <p className="text-xl sm:text-2xl text-slate-700 font-medium leading-[1.6] mb-12 max-w-2xl">
                            {callOutContent.split('—').map((part: string, i: number, arr: string[]) => (
                                <span key={i}>
                                    {part.trim()}
                                    {i < arr.length - 1 && (
                                        <>
                                            &nbsp;—<br className="hidden sm:block mt-1" />
                                        </>
                                    )}
                                </span>
                            ))}
                        </p>

                        <div className="grid grid-cols-3 gap-4 sm:gap-8">
                            {metrics.map((metric: any, idx: number) => {
                                const valStr = String(metric.value);
                                const hasPlus = valStr.includes("+");
                                const valNum = hasPlus ? valStr.replace('+', '') : valStr;

                                return (
                                    <div key={idx} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                                        <div className="flex items-baseline justify-center sm:justify-start gap-0.5">
                                            <span className="text-2xl sm:text-4xl font-extrabold text-slate-900">{valNum}</span>
                                            {hasPlus && (
                                                <span className="text-slate-900 text-xl sm:text-4xl font-extrabold">+</span>
                                            )}
                                        </div>
                                        <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-sm text-slate-500 font-semibold leading-snug whitespace-pre-line max-w-[90px] sm:max-w-none">
                                            {metric.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* ── Sticky Stacking Cards (All Screens - Overlapping) ── */}
                <div className="relative mt-8 pb-6">
                    {services.map((svc, i) => (
                        <div
                            key={svc.num}
                            className="sticky relative w-full overflow-hidden mb-0"
                            style={{
                                top: "0",
                                zIndex: i + 1,
                                paddingBottom: "0",
                            }}
                        >
                            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[460px] lg:min-h-[100vh] relative w-full">
                                {/* Left: Content */}
                                <div className="flex-1 p-7 sm:p-[40px] lg:p-[50px] flex flex-col justify-start lg:justify-center relative z-10 w-full lg:w-1/2">
                                    {/* Stylized background number */}
                                    <div className="absolute -top-8 -left-4 lg:-top-16 lg:-left-12 text-[160px] lg:text-[250px] font-black leading-none text-slate-100/80 select-none pointer-events-none z-[-1]">
                                        {svc.num}
                                    </div>

                                    <h3 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 mb-4 lg:mb-6 relative z-10 lg:mt-8">
                                        {svc.title}
                                    </h3>
                                    <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-6 lg:mb-10">
                                        {svc.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 lg:mb-10">
                                        {svc.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-slate-50 border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 tracking-wide"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div>
                                        <Link
                                            href={svc.href}
                                            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3b82f6]/30 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all"
                                        >
                                            Explore service <ArrowRightIcon className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Right: Graphic — desktop only */}
                                <div className="hidden lg:flex flex-1 bg-white relative min-h-full overflow-hidden z-0 rounded-r-[2rem] w-1/2">
                                    <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px]"></div>
                                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                                    <div className="relative w-full h-full min-h-[300px] flex p-[50px] pl-[25px]">
                                        <div className="relative w-full h-full min-h-full">
                                            <Image
                                                src={svc.image}
                                                alt={svc.title}
                                                fill
                                                className={`object-contain object-center transition-transform ${
                                                    i === 1 ? "scale-95 lg:scale-[1.05]" :
                                                    i === 2 ? "scale-[1.20] lg:scale-[1.20]" :
                                                    i === 3 ? "scale-125 lg:scale-125" :
                                                    "scale-150 lg:scale-150"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
