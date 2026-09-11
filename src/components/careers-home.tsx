"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Landmark, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { careersHomeContent } from "@/content/site-content";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { HighlightedHeadline } from "@/components/ui/highlighted-headline";
import { CONTAINER_CLASS } from "@/lib/container-utils";

const iconMap: Record<string, LucideIcon> = {
    Landmark,
    Sparkles,
    Zap,
};

type CareerPoint = (typeof careersHomeContent.points)[number];

function FeaturedTile({ point }: { point: CareerPoint }) {
    const Icon = iconMap[point.icon];
    const image = "image" in point ? point.image : undefined;

    return (
        <motion.article
            variants={scrollReveal}
            className="group relative md:col-span-2 overflow-hidden rounded-2xl min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] flex"
        >
            {/* Atmosphere: complex systems / architecture */}
            {image && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.06 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 1200px"
                        priority={false}
                    />
                </motion.div>
            )}

            {/* Brand wash + readability gradient */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#0A2F52]/92 via-[#135498]/88 to-[#0A2F52]/78"
                aria-hidden
            />
            <div
                className="absolute inset-0 bg-gradient-to-r from-[#0A2F52]/55 via-transparent to-transparent"
                aria-hidden
            />

            {/* Subtle blueprint grid */}
            <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
                aria-hidden
            />

            {/* Soft light sweep on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent"
                aria-hidden
            />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 p-6 sm:p-8 lg:p-10 w-full">
                <div className="max-w-xl">
                    <div className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                        {Icon && <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />}
                    </div>
                    <h3 className="text-[22px] sm:text-[28px] lg:text-[32px] font-black text-white leading-tight tracking-tight font-display">
                        {point.title}
                    </h3>
                    <p className="mt-3 text-[14px] sm:text-[15px] lg:text-base text-white/80 font-medium leading-relaxed max-w-lg">
                        {point.description}
                    </p>
                </div>

                <div
                    className="hidden sm:block self-end pb-1 text-[11px] font-bold tracking-[2px] uppercase text-white/45 font-display"
                    aria-hidden
                >
                    Featured
                </div>
            </div>
        </motion.article>
    );
}

function SquareTile({
    point,
    accent,
}: {
    point: CareerPoint;
    accent: "ai" | "speed";
}) {
    const Icon = iconMap[point.icon];
    const isAi = accent === "ai";

    return (
        <motion.article
            variants={scrollReveal}
            className={`group relative overflow-hidden rounded-2xl min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] flex flex-col justify-between p-6 sm:p-7 lg:p-8 border transition-all duration-300 hover:-translate-y-0.5 ${
                isAi
                    ? "bg-[#F0F6FC] border-[#135498]/15 hover:border-[#135498]/35 hover:shadow-[0_16px_40px_rgba(19,84,152,0.12)]"
                    : "bg-white border-slate-200 hover:border-[#3886CE]/40 hover:shadow-[0_16px_40px_rgba(56,134,206,0.12)]"
            }`}
        >
            {/* Corner accent */}
            <div
                className={`absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 opacity-60 group-hover:opacity-100 ${
                    isAi ? "bg-[#3886CE]/20" : "bg-[#135498]/15"
                }`}
                aria-hidden
            />

            <div className="relative">
                <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                        isAi ? "bg-[#135498] text-white" : "bg-[#e8f1fa] text-[#3886CE]"
                    }`}
                >
                    {Icon && <Icon className="h-6 w-6" />}
                </div>
                <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-black text-[#0A2F52] leading-tight tracking-tight font-display">
                    {point.title}
                </h3>
            </div>

            <p className="relative mt-4 text-[13px] sm:text-[14px] text-slate-600 font-medium leading-relaxed">
                {point.description}
            </p>

            {/* Bottom edge accent */}
            <div
                className={`absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                    isAi
                        ? "bg-gradient-to-r from-[#135498] to-[#3886CE]"
                        : "bg-gradient-to-r from-[#3886CE] to-[#135498]"
                }`}
                aria-hidden
            />
        </motion.article>
    );
}

export function CareersHome() {
    const { headline, highlightedWord, description, points, cta } = careersHomeContent;

    const featured = points.find((p) => "featured" in p && p.featured) ?? points[0];
    const secondary = points.filter((p) => p !== featured);
    const accents: Array<"ai" | "speed"> = ["ai", "speed"];

    return (
        <section
            id="careers-section"
            className="relative border-t border-[#135498]/10 bg-white py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden"
        >
            <div
                className="absolute inset-y-0 left-0 w-1 sm:w-1.5 bg-gradient-to-b from-[#135498] to-[#3886CE] pointer-events-none"
                aria-hidden
            />
            <div
                className="absolute inset-0 bg-[#135498]/[0.035] pointer-events-none"
                aria-hidden
            />

            <div className={`relative ${CONTAINER_CLASS}`}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-3xl"
                >
                    <h2 className="text-[28px] sm:text-[44px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.1] whitespace-normal break-words max-w-full">
                        <HighlightedHeadline
                            headline={headline}
                            highlightedWord={highlightedWord}
                        />
                    </h2>
                    <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                {/* Asymmetric bento */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5"
                >
                    <FeaturedTile point={featured} />
                    {secondary.map((point, i) => (
                        <SquareTile
                            key={point.title}
                            point={point}
                            accent={accents[i] ?? "speed"}
                        />
                    ))}
                </motion.div>

                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-10"
                >
                    <Button
                        size="lg"
                        asChild
                        className="bg-[#135498] text-white hover:bg-[#0F427A] border border-transparent rounded-full font-bold px-6 xl:px-8 h-12 xl:h-14 text-sm xl:text-base shadow-[0_4px_14px_rgba(19,84,152,0.28)]"
                    >
                        <Link href={cta.href}>
                            {cta.label} <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
