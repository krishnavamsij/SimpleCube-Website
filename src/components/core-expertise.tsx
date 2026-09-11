"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { coreExpertiseContent } from "@/content/site-content";
import { CONTAINER_CLASS } from "@/lib/container-utils";
import { HighlightedHeadline } from "@/components/ui/highlighted-headline";
import { scrollReveal, viewportOnce } from "@/lib/animations";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CoreExpertise() {
    const reduceMotion = useReducedMotion() ?? false;
    const { overline, headline, highlightedWord, sub, domains } = coreExpertiseContent;
    const [activeId, setActiveId] = useState(domains[0]?.id ?? "");
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [pill, setPill] = useState({ left: 0, width: 0 });

    const active = domains.find((d) => d.id === activeId) ?? domains[0];
    const activeIndex = Math.max(
        0,
        domains.findIndex((d) => d.id === activeId)
    );

    useLayoutEffect(() => {
        const el = tabRefs.current[activeIndex];
        if (!el) return;
        setPill({ left: el.offsetLeft, width: el.offsetWidth });
    }, [activeIndex]);

    useEffect(() => {
        const onResize = () => {
            const el = tabRefs.current[activeIndex];
            if (!el) return;
            setPill({ left: el.offsetLeft, width: el.offsetWidth });
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [activeIndex]);

    return (
        <section
            id="core-expertise"
            className="relative border-t border-[#135498]/10 bg-[#F8FAFC] py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden"
        >
            {/* Blueprint grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-100"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(19,84,152,0.07) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                }}
                aria-hidden
            />

            <div className={`relative ${CONTAINER_CLASS}`}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
                >
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3886CE] bg-[#3886CE]/[0.08] border border-[#3886CE]/25 rounded-full px-4 sm:px-5 py-1.5 mb-4 sm:mb-5 font-display">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3886CE]" />
                        {overline}
                    </div>
                    <h2 className="text-[28px] sm:text-[40px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-[#0A2F52] leading-[1.12] font-display">
                        <HighlightedHeadline
                            headline={headline}
                            highlightedWord={highlightedWord}
                            highlightClassName="text-[#135498]"
                        />
                    </h2>
                    <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                        {sub}
                    </p>
                </motion.div>

                {/* Pill navigation */}
                <div className="flex justify-center mb-8 sm:mb-10">
                    <div
                        className="relative flex flex-wrap justify-center gap-1 sm:gap-0 sm:flex-nowrap w-full max-w-4xl rounded-2xl sm:rounded-full border border-[#E2E8F0] bg-white/80 p-1.5 shadow-sm backdrop-blur-sm"
                        role="tablist"
                        aria-label="Core expertise domains"
                    >
                        <motion.div
                            className="pointer-events-none absolute top-1.5 bottom-1.5 hidden sm:block rounded-full bg-[#135498] shadow-[0_8px_20px_rgba(19,84,152,0.25)]"
                            initial={false}
                            animate={{ left: pill.left, width: pill.width }}
                            transition={
                                reduceMotion
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 380, damping: 34 }
                            }
                            aria-hidden
                        />
                        {domains.map((domain, i) => {
                            const isActive = domain.id === activeId;
                            return (
                                <button
                                    key={domain.id}
                                    ref={(node) => {
                                        tabRefs.current[i] = node;
                                    }}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveId(domain.id)}
                                    className={`relative z-10 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 text-[11px] sm:text-[12px] lg:text-[13px] font-bold rounded-full transition-colors duration-200 ${
                                        isActive
                                            ? "text-white bg-[#135498] sm:bg-transparent"
                                            : "text-slate-600 hover:text-[#135498] border border-[#E2E8F0] sm:border-transparent bg-white sm:bg-transparent"
                                    }`}
                                >
                                    {domain.pill}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Blueprint deck */}
                <div className="relative min-h-[320px]">
                    <Image
                        src="/logos/simplecube/mark.svg"
                        alt=""
                        width={180}
                        height={180}
                        className="pointer-events-none absolute -bottom-4 -right-2 sm:right-4 w-28 sm:w-40 opacity-[0.06] select-none"
                        aria-hidden
                    />

                    <AnimatePresence mode="wait">
                        {active && (
                            <motion.div
                                key={active.id}
                                role="tabpanel"
                                initial={
                                    reduceMotion
                                        ? { opacity: 1 }
                                        : { opacity: 0, y: 4 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                exit={
                                    reduceMotion
                                        ? { opacity: 0 }
                                        : { opacity: 0, y: -4 }
                                }
                                transition={{ duration: 0.2, ease: EASE }}
                            >
                                <p className="text-center text-[13px] sm:text-sm text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
                                    {active.focus}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                                    {active.cards.map((card) => (
                                        <article
                                            key={card.title}
                                            className="group relative flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3886CE] hover:shadow-[0_12px_24px_-6px_rgba(19,84,152,0.08)]"
                                        >
                                            <div className="mb-4">
                                                <h3 className="text-[14px] lg:text-[15px] font-black text-[#0A2F52] leading-tight tracking-tight font-display">
                                                    {card.title}
                                                </h3>
                                            </div>

                                            <ul className="flex flex-col gap-2 mt-auto">
                                                {card.items.map((item) => (
                                                    <li key={item}>
                                                        <span className="inline-flex max-w-full rounded-lg bg-[rgba(56,134,206,0.08)] px-2.5 py-1.5 text-[12px] lg:text-[13px] font-medium leading-snug text-[#135498]">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </article>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
