"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
    Boxes,
    Cloud,
    Database,
    Gauge,
    Users,
    type LucideIcon,
} from "lucide-react";
import { challengesSolveContent } from "@/content/site-content";
import { CONTAINER_CLASS } from "@/lib/container-utils";
import { HighlightedHeadline } from "@/components/ui/highlighted-headline";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";

const trackIcons: Record<string, LucideIcon> = {
    "crm-data": Database,
    velocity: Gauge,
    "team-structure": Users,
    infrastructure: Cloud,
};

type Track = (typeof challengesSolveContent.tracks)[number];

function FlipCard({
    track,
    flipped,
    onToggle,
}: {
    track: Track;
    flipped: boolean;
    onToggle: () => void;
}) {
    const Icon = trackIcons[track.id] ?? Boxes;

    const handleActivate = () => {
        // Fine-pointer desktops flip via CSS hover; tap/keyboard still toggle for touch
        if (typeof window !== "undefined") {
            const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            if (canHover) return;
        }
        onToggle();
    };

    return (
        <div
            className="group [perspective:1200px] h-full min-h-[260px] sm:min-h-[280px] cursor-pointer"
            onClick={handleActivate}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle();
                }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={`${track.track}: ${flipped ? track.fix.headline : track.friction.headline}. Activate to flip.`}
        >
            <div
                className={`relative h-full w-full transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] ${
                    flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                } lg:group-hover:[transform:rotateY(180deg)]`}
            >
                {/* Front — Friction (theme white) */}
                <div className="absolute inset-0 flex flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 [backface-visibility:hidden] shadow-[0_12px_40px_rgba(10,47,82,0.12)]">
                    <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500">
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-bold tracking-[1.5px] uppercase text-rose-600 font-display">
                            {track.friction.tag}
                        </span>
                    </div>

                    <p className="mb-1.5 text-[11px] font-bold tracking-[2px] uppercase text-slate-400 font-display">
                        {track.track}
                    </p>
                    <h3 className="text-[15px] sm:text-[16px] font-black leading-tight tracking-tight text-[#0A2F52] font-display mb-2">
                        {track.friction.headline}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] leading-relaxed font-medium text-slate-500 flex-1">
                        {track.friction.body}
                    </p>

                    <p className="mt-3 text-[10px] font-semibold tracking-[1.5px] uppercase text-slate-400 lg:hidden">
                        Tap to reveal fix
                    </p>
                </div>

                {/* Back — SimpleCube Fix (primary fill pops from ink section) */}
                <div
                    className="absolute inset-0 flex flex-col rounded-2xl border border-[#3886CE]/60 bg-[#135498] p-4 sm:p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_16px_40px_rgba(10,47,82,0.45),0_0_28px_rgba(56,134,206,0.28)]"
                >
                    <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-white/40 via-[#3886CE] to-white/20"
                        aria-hidden
                    />
                    <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </div>
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-[#3886CE] px-3 py-1.5 text-[10px] font-black tracking-[1.5px] uppercase text-white font-display shadow-[0_4px_14px_rgba(56,134,206,0.55)]">
                            {track.fix.tag}
                        </span>
                    </div>

                    <p className="mb-1.5 text-[11px] font-bold tracking-[2px] uppercase text-[#A8D4F5] font-display">
                        {track.track}
                    </p>
                    <h3 className="text-[15px] sm:text-[16px] font-black leading-tight tracking-tight text-white font-display mb-2">
                        {track.fix.headline}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] leading-relaxed font-medium text-white/80 flex-1">
                        {track.fix.body}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function ChallengesSolve() {
    const { headline, highlightedWord, sub, tracks } = challengesSolveContent;
    const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());

    const toggleCard = useCallback((id: string) => {
        // Desktop uses hover; click/tap still toggles for touch + keyboard
        setFlippedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    return (
        <section
            id="challenges-section"
            className="relative border-t border-white/10 py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden"
            style={{
                background:
                    "linear-gradient(180deg, #0A2F52 0%, #0F3A63 42%, #135498 100%)",
            }}
        >
            {/* Soft secondary atmosphere */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(56,134,206,0.2) 0%, transparent 55%), radial-gradient(ellipse 55% 40% at 90% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)",
                }}
                aria-hidden
            />

            <div className={`relative ${CONTAINER_CLASS}`}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-8 sm:mb-10 max-w-3xl"
                >
                    <h2 className="text-[28px] sm:text-[44px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-white leading-[1.1] font-display">
                        <HighlightedHeadline
                            headline={headline}
                            highlightedWord={highlightedWord}
                            highlightClassName="text-[#3886CE]"
                        />
                    </h2>
                    <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                        {sub}
                    </p>
                </motion.div>

                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
                    style={{ perspective: 1200 }}
                >
                    {tracks.map((track) => (
                        <motion.div key={track.id} variants={scrollReveal} className="h-full">
                            <FlipCard
                                track={track}
                                flipped={flippedIds.has(track.id)}
                                onToggle={() => toggleCard(track.id)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
