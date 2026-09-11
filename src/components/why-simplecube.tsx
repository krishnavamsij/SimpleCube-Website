"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    AlertTriangle,
    Building2,
    Cloud,
    Hourglass,
    Package,
    Sparkles,
    Users,
    type LucideIcon,
} from "lucide-react";
import { whySimpleCubeContent } from "@/content/site-content";
import { CONTAINER_CLASS } from "@/lib/container-utils";
import { HighlightedHeadline } from "@/components/ui/highlighted-headline";
import { scrollReveal, viewportOnce } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
    Sparkles,
    Users,
    Cloud,
    Building2,
    Hourglass,
    Package,
};

type HighlightSide = "advantage" | "traditional";

const RESET_DELAY_MS = 450;
const EASE_ENGINEERED = [0.16, 1, 0.3, 1] as const;
const MOTION = { duration: 0.3, ease: EASE_ENGINEERED };

function getTraditionalIcon(title: string): LucideIcon {
    switch (title) {
        case "Account Shuffling":
            return Building2;
        case "Bloated Timelines":
            return Hourglass;
        case "Siloed Expertise":
            return Package;
        default:
            return AlertTriangle;
    }
}

export function WhySimpleCube() {
    const reduceMotion = useReducedMotion() ?? false;
    const { headline, highlightedWord, description, columns, rows } = whySimpleCubeContent;

    const [side, setSide] = useState<HighlightSide>("advantage");
    const [pinned, setPinned] = useState<HighlightSide | null>(null);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearResetTimer = useCallback(() => {
        if (resetTimer.current) {
            clearTimeout(resetTimer.current);
            resetTimer.current = null;
        }
    }, []);

    const setHighlight = useCallback(
        (next: HighlightSide) => {
            if (pinned) return;
            clearResetTimer();
            setSide(next);
        },
        [pinned, clearResetTimer]
    );

    const scheduleReset = useCallback(() => {
        if (pinned) return;
        clearResetTimer();
        resetTimer.current = setTimeout(() => {
            setSide("advantage");
            resetTimer.current = null;
        }, RESET_DELAY_MS);
    }, [pinned, clearResetTimer]);

    useEffect(() => () => clearResetTimer(), [clearResetTimer]);

    const effectiveSide = pinned ?? side;
    const isAdvantage = effectiveSide === "advantage";
    const t = reduceMotion ? { duration: 0 } : MOTION;

    const selectSide = (next: HighlightSide) => {
        clearResetTimer();
        setPinned(next);
        setSide(next);
    };

    return (
        <section
            id="why-simplecube"
            className="relative overflow-hidden border-t border-[#135498]/10 bg-[#F5F9FC] py-[30px] sm:py-[40px] lg:py-[50px]"
            onMouseLeave={scheduleReset}
        >
            <div className={`relative ${CONTAINER_CLASS}`}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center mb-8 sm:mb-10"
                >
                    <h2 className="text-[28px] sm:text-[44px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-[#0A2F52] leading-[1.1] font-display">
                        <HighlightedHeadline
                            headline={headline}
                            highlightedWord={highlightedWord}
                            highlightClassName="text-[#135498]"
                        />
                    </h2>
                    <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                {/* Segmented pill — visual affordance (hover + tap) */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div
                        className="relative flex w-full max-w-[480px] rounded-full border border-[#135498]/20 bg-white/70 p-1.5 shadow-sm backdrop-blur-sm"
                        role="group"
                        aria-label="Compare SimpleCube and Traditional Agencies"
                    >
                        <motion.div
                            className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-gradient-to-r from-[#135498] to-[#3886CE] shadow-[0_8px_24px_rgba(19,84,152,0.3)]"
                            initial={false}
                            animate={{ x: isAdvantage ? 0 : "100%" }}
                            transition={t}
                        />
                        <button
                            type="button"
                            onMouseEnter={() => setHighlight("advantage")}
                            onFocus={() => setHighlight("advantage")}
                            onClick={() => selectSide("advantage")}
                            className={`relative z-10 w-1/2 py-2.5 sm:py-3 px-2 text-[11px] sm:text-[13px] font-bold transition-colors duration-300 ${
                                isAdvantage ? "text-white" : "text-slate-500 hover:text-slate-700"
                            }`}
                            aria-pressed={isAdvantage}
                        >
                            {columns.advantage}
                        </button>
                        <button
                            type="button"
                            onMouseEnter={() => setHighlight("traditional")}
                            onFocus={() => setHighlight("traditional")}
                            onClick={() => selectSide("traditional")}
                            className={`relative z-10 w-1/2 py-2.5 sm:py-3 px-2 text-[11px] sm:text-[13px] font-bold transition-colors duration-300 ${
                                !isAdvantage ? "text-white" : "text-slate-500 hover:text-slate-700"
                            }`}
                            aria-pressed={!isAdvantage}
                        >
                            {columns.traditional}
                        </button>
                    </div>
                </div>

                {/* Comparison stage */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="relative rounded-2xl border border-slate-200/80 bg-white/50 p-1.5 sm:p-2 overflow-hidden"
                >
                    {/* Sliding glass highlight (desktop equal columns) */}
                    <motion.div
                        className="pointer-events-none absolute z-[1] top-2 bottom-2 hidden lg:block w-[calc(50%-10px)] rounded-xl border border-[#00d4aa] bg-white/55 backdrop-blur-[2px]"
                        style={{
                            boxShadow:
                                "0 10px 30px -10px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 0 24px rgba(0, 212, 170, 0.08)",
                        }}
                        initial={false}
                        animate={{
                            left: isAdvantage ? 8 : "calc(50% + 2px)",
                        }}
                        transition={t}
                        aria-hidden
                    />

                    {/* Inactive-side blur veils */}
                    <motion.div
                        className="pointer-events-none absolute z-[2] top-2 bottom-2 left-2 hidden w-[calc(50%-10px)] rounded-xl bg-slate-100/20 backdrop-blur-[1.5px] lg:block"
                        animate={{ opacity: isAdvantage ? 0 : 1 }}
                        transition={t}
                        aria-hidden
                    />
                    <motion.div
                        className="pointer-events-none absolute z-[2] top-2 bottom-2 right-2 hidden w-[calc(50%-10px)] rounded-xl bg-slate-100/25 backdrop-blur-[1.5px] lg:block"
                        animate={{ opacity: !isAdvantage ? 0 : 1 }}
                        transition={t}
                        aria-hidden
                    />

                    {/* Header row — equal columns */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 border-b border-[#135498]/10">
                        <motion.div
                            className="px-5 sm:px-7 lg:px-8 xl:px-10 py-4 sm:py-5 border-b lg:border-b-0 lg:border-r border-[#135498]/10"
                            onMouseEnter={() => setHighlight("advantage")}
                            animate={{ opacity: isAdvantage ? 1 : 0.62 }}
                            transition={t}
                        >
                            <span
                                className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase font-display ${
                                    isAdvantage ? "text-[#135498]" : "text-slate-500"
                                }`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        isAdvantage
                                            ? "bg-[#00d4aa] shadow-[0_0_8px_rgba(0,212,170,0.55)]"
                                            : "bg-slate-300"
                                    }`}
                                />
                                {columns.advantage}
                            </span>
                        </motion.div>
                        <motion.div
                            className="px-5 sm:px-7 lg:px-8 xl:px-10 py-4 sm:py-5 bg-slate-50/40"
                            onMouseEnter={() => setHighlight("traditional")}
                            animate={{ opacity: !isAdvantage ? 1 : 0.62 }}
                            transition={t}
                        >
                            <span
                                className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase font-display ${
                                    !isAdvantage ? "text-slate-600" : "text-slate-500"
                                }`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        !isAdvantage ? "bg-amber-500" : "bg-amber-400/70"
                                    }`}
                                />
                                {columns.traditional}
                            </span>
                        </motion.div>
                    </div>

                    {/* Paired point rows — shared row height keeps sides horizontally aligned */}
                    {rows.map((row, idx) => {
                        const AdvantageIcon = iconMap[row.icon] ?? Users;
                        const TraditionalIcon = getTraditionalIcon(row.traditional.title);
                        const isLast = idx === rows.length - 1;

                        return (
                            <div
                                key={row.advantage.title}
                                className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 items-stretch ${
                                    isLast ? "" : "border-b border-[#135498]/10"
                                }`}
                            >
                                <motion.div
                                    className="flex gap-4 h-full px-5 sm:px-7 lg:px-8 xl:px-10 py-5 sm:py-6 border-b lg:border-b-0 lg:border-r border-[#135498]/10"
                                    onMouseEnter={() => setHighlight("advantage")}
                                    animate={{ opacity: isAdvantage ? 1 : 0.62 }}
                                    transition={t}
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-[#dbeafe] text-blue-600 ring-1 ring-blue-100/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                                        <AdvantageIcon className="h-6 w-6" strokeWidth={1.75} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3
                                            className={`text-[14px] lg:text-[15px] font-black font-display tracking-tight leading-tight mb-2 ${
                                                isAdvantage ? "text-[#0A2F52]" : "text-slate-500"
                                            }`}
                                        >
                                            {row.advantage.title}
                                        </h3>
                                        <p
                                            className={`text-[12px] lg:text-[13px] leading-relaxed font-medium ${
                                                isAdvantage ? "text-slate-600" : "text-slate-500"
                                            }`}
                                        >
                                            {row.advantage.body}
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex gap-4 h-full px-5 sm:px-7 lg:px-8 xl:px-10 py-5 sm:py-6 bg-slate-50/30"
                                    onMouseEnter={() => setHighlight("traditional")}
                                    animate={{ opacity: !isAdvantage ? 1 : 0.62 }}
                                    transition={t}
                                >
                                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                        <TraditionalIcon className="h-6 w-6" strokeWidth={1.5} />
                                        <span
                                            className="pointer-events-none absolute inset-[11px] rotate-[-28deg] border-t border-slate-400/70"
                                            aria-hidden
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3
                                            className={`text-[14px] lg:text-[15px] font-black font-display tracking-tight leading-tight mb-2 text-slate-500 ${
                                                isAdvantage
                                                    ? "line-through decoration-slate-400/80"
                                                    : ""
                                            }`}
                                        >
                                            {row.traditional.title}
                                        </h3>
                                        <p className="text-[12px] lg:text-[13px] leading-relaxed font-medium text-slate-500">
                                            {row.traditional.body}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
