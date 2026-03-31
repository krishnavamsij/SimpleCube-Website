"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { servicesContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export function Services() {
    // Because we adjusted the site-content shape, we provide fallbacks just in case
    const label = servicesContent.label;
    const callOutContent = (servicesContent as any).callOutContent || "";
    const metrics = (servicesContent as any).metrics || [];
    const services = servicesContent.services;

    return (
        <section className="bg-[#f8fafc] py-20 sm:py-28 text-slate-900">
            <div className="mx-auto max-w-[1400px] px-6">
                {/* ── Section header ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16 grid gap-12 lg:grid-cols-[1fr_1.2fr]"
                >
                    {/* Left Side: Eyebrow and Heading */}
                    <div>
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3b82f6] bg-[#3b82f6]/[0.08] border border-[#3b82f6]/25 rounded-full px-5 py-1.5 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_8px_#3b82f6] animate-pulse" />
                            {label}
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px] leading-[1.1] text-slate-900">
                            End-to-end<br />
                            technology<br />
                            <span className="text-[#3b82f6]">partnership.</span>
                        </h2>
                    </div>

                    {/* Right Side: Callout and metrics */}
                    <div className="flex flex-col justify-center border-l-[3px] border-[#3b82f6] pl-8 lg:pl-12 py-2">
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
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {metrics.map((metric: any, idx: number) => {
                                const valStr = String(metric.value);
                                const hasPlus = valStr.includes("+");
                                const valNum = hasPlus ? valStr.replace('+', '') : valStr;

                                return (
                                    <div key={idx}>
                                        <div className="flex items-baseline gap-0.5">
                                            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">{valNum}</span>
                                            {hasPlus && (
                                                <span className="text-[#3b82f6] text-3xl sm:text-4xl font-extrabold">+</span>
                                            )}
                                        </div>
                                        <p className="mt-2 text-sm text-slate-500 font-medium leading-snug pr-4 whitespace-pre-line">
                                            {metric.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* ── Stacking Cards ── */}
                <div className="relative mt-20 flex flex-col gap-6 lg:gap-8 pb-[10vh]">
                    {services.map((svc, i) => {
                        return (
                            <div
                                key={svc.num}
                                className="sticky pt-4 lg:pt-8 w-full transition-all duration-300"
                                style={{
                                    // Slight offset to create a stacking effect
                                    top: `calc(10vh + ${i * 40}px)`,
                                    zIndex: i,
                                }}
                            >
                                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
                                    {/* Left: Content */}
                                    <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center relative z-10">
                                        
                                        {/* Stylized background number */}
                                        <div className="absolute -top-10 -left-6 lg:-top-16 lg:-left-12 text-[180px] lg:text-[250px] font-black leading-none text-[#3b82f6]/5 sm:text-slate-100/80 select-none pointer-events-none z-[-1]">
                                            {svc.num}
                                        </div>

                                        <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 mb-6 relative z-10 lg:mt-8">
                                            {svc.title}
                                        </h3>
                                        <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-10">
                                            {svc.description}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-2.5 mb-10">
                                            {svc.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 tracking-wide"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-4">
                                            <Link
                                                href={svc.href}
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-[#3b82f6] hover:bg-slate-50 hover:border-slate-300 transition-all"
                                            >
                                                Explore service <ArrowRightIcon className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Right: Graphic */}
                                    <div className="flex-1 bg-white relative min-h-[300px] lg:min-h-full border-t lg:border-t-0 flex overflow-hidden z-0 rounded-b-[2rem] lg:rounded-b-none lg:rounded-r-[2rem]">
                                        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px]"></div>
                                        
                                        {/* Gradient fade on the left edge to merge image with white background */}
                                        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden lg:block"></div>

                                        {/* Image container aligned with LHS padding (lg:py-16) */}
                                        <div className="relative w-full h-full min-h-[300px] flex p-8 lg:py-16 lg:pr-16 lg:pl-4">
                                            <div className="relative w-full h-full min-h-[250px] lg:min-h-full">
                                                <Image
                                                    src={svc.image}
                                                    alt={svc.title}
                                                    fill
                                                    className={`object-contain object-right lg:object-center transition-transform ${
                                                        i === 1 ? "scale-95 lg:scale-[1.05]" :
                                                        i === 3 ? "scale-125 lg:scale-125" :
                                                        "scale-150 lg:scale-150"
                                                    }`}
                                                />
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

