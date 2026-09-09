"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Users, Target, Shield, Rocket, type LucideIcon } from "lucide-react";

/* ─────────────── Types & Shared Feature Data ─────────────── */

export interface WhyWorkWithUsFeature {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    accentColor: "blue" | "green" | "purple" | "orange";
    pastelBg: string;
    pastelBadgeBg: string;
    iconColor: string;
    whiteBadgeBg?: string;
}

export const whyWorkWithUsFeatures: WhyWorkWithUsFeature[] = [
    {
        id: "expertise",
        title: "Direct Access to Expertise",
        description:
            "Our model enables direct engagement with senior leaders and domain experts, ensuring faster decisions, clear ownership, and end-to-end accountability.",
        icon: Users,
        accentColor: "blue",
        pastelBg: "bg-[#E8ECFB]",
        pastelBadgeBg: "bg-[#D5E0FA]",
        iconColor: "text-[#135498]",
        whiteBadgeBg: "bg-slate-50",
    },
    {
        id: "client-centricity",
        title: "Client-Centricity",
        description:
            "We align closely with our clients' strategic priorities, tailoring every engagement to deliver measurable and sustainable outcomes.",
        icon: Target,
        accentColor: "green",
        pastelBg: "bg-[#E9FBF1]",
        pastelBadgeBg: "bg-[#D1F6E2]",
        iconColor: "text-[#10B981]",
        whiteBadgeBg: "bg-slate-50",
    },
    {
        id: "transparency-trust",
        title: "Transparency & Trust",
        description:
            "We operate with clarity and candor. From opportunities to risks, we communicate proactively to enable better decisions and stronger partnerships.",
        icon: Shield,
        accentColor: "purple",
        pastelBg: "bg-[#F3EEFB]",
        pastelBadgeBg: "bg-[#E6DBF8]",
        iconColor: "text-[#9333EA]",
        whiteBadgeBg: "bg-slate-50",
    },
    {
        id: "agility-impact",
        title: "Agility with Impact",
        description:
            "Our lean structure creates a distinct competitive edge, enabling focused execution and delivering outsized impact.",
        icon: Rocket,
        accentColor: "orange",
        pastelBg: "bg-[#FEF3E7]",
        pastelBadgeBg: "bg-[#FDE4CB]",
        iconColor: "text-[#EA580C]",
        whiteBadgeBg: "bg-slate-50",
    },
];

/* ─────────────── Animation Variants ─────────────── */

const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.21, 0.47, 0.32, 0.98],
        },
    },
};

const viewportConfig = { once: true, margin: "-60px" };

/* ─────────────── Feature Card Component ─────────────── */

export function FeatureCard({
    feature,
    variant = "pastel",
}: {
    feature: WhyWorkWithUsFeature;
    variant?: "pastel" | "white";
}) {
    const Icon = feature.icon;
    const isPastel = variant === "pastel";

    return (
        <motion.div
            variants={cardItemVariants}
            className={`group relative flex flex-col rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 cursor-default ${
                isPastel
                    ? `${feature.pastelBg} border-0 shadow-none`
                    : "bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300/90"
            }`}
        >
            {/* Circular Icon Badge (~56px / w-14 h-14) */}
            <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isPastel
                        ? feature.pastelBadgeBg
                        : "bg-slate-50 border border-slate-100"
                }`}
            >
                <Icon
                    className={`w-7 h-7 stroke-[1.8] ${feature.iconColor}`}
                    aria-hidden="true"
                />
            </div>

            {/* Bold Dark Navy Heading */}
            <h3 className="text-xl font-bold text-[#0A2F52] font-display mb-3 tracking-tight leading-snug">
                {feature.title}
            </h3>

            {/* Gray Body Paragraph */}
            <p className="text-slate-600 leading-relaxed font-medium text-[14px] sm:text-[14.5px]">
                {feature.description}
            </p>
        </motion.div>
    );
}

/* ─────────────── Feature Grid (Reusable 2x2 Grid) ─────────────── */

export function FeatureGrid({
    features = whyWorkWithUsFeatures,
    variant = "pastel",
    className = "",
}: {
    features?: WhyWorkWithUsFeature[];
    variant?: "pastel" | "white";
    className?: string;
}) {
    return (
        <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 ${className}`}
        >
            {features.map((feature) => (
                <FeatureCard
                    key={`${variant}-${feature.id}`}
                    feature={feature}
                    variant={variant}
                />
            ))}
        </motion.div>
    );
}

/* ─────────────── Main "Why Work With Us" Side-by-Side Comparison Section ─────────────── */

export interface WhyWorkWithUsProps {
    heading?: string;
    subheading?: string;
    eyebrowText?: string;
    showColumnLabels?: boolean;
    leftColumnLabel?: string;
    rightColumnLabel?: string;
    features?: WhyWorkWithUsFeature[];
}

export function WhyWorkWithUs({
    heading = "Why work with us",
    subheading = "Built on direct relationships, agile execution, and enterprise-grade rigor to deliver measurable results.",
    eyebrowText = "WHY WORK WITH US",
    showColumnLabels = true,
    leftColumnLabel = "Colored / Pastel Variant",
    rightColumnLabel = "White / Clean Variant",
    features = whyWorkWithUsFeatures,
}: WhyWorkWithUsProps) {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                {/* Section Header */}
                <div className="text-left lg:text-center max-w-3xl lg:mx-auto mb-12 sm:mb-16">
                    {eyebrowText && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportConfig}
                            transition={{ duration: 0.5 }}
                            className="flex justify-start lg:justify-center mb-4"
                        >
                            <div className="eyebrow text-[#3886CE] bg-[#3886CE]/10 border border-[#3886CE]/20 px-3.5 py-1 text-[11px]">
                                <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
                                {eyebrowText}
                            </div>
                        </motion.div>
                    )}

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.55, delay: 0.05 }}
                        className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0A2F52] font-display mb-4 leading-[1.15] tracking-tight"
                    >
                        {heading}
                    </motion.h2>

                    {subheading && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportConfig}
                            transition={{ duration: 0.55, delay: 0.1 }}
                            className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium"
                        >
                            {subheading}
                        </motion.p>
                    )}
                </div>

                {/* Two Columns Layout: Side by Side on Desktop, Stacked on Mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
                    {/* LEFT COLUMN: Pastel / Colored Variant Grid */}
                    <div className="flex flex-col">
                        {showColumnLabels && (
                            <div className="flex items-center justify-between mb-4 px-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#3886CE]" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        {leftColumnLabel}
                                    </span>
                                </div>
                                <span className="text-[11px] font-semibold text-slate-400">
                                    Tinted Backgrounds
                                </span>
                            </div>
                        )}
                        <FeatureGrid features={features} variant="pastel" />
                    </div>

                    {/* RIGHT COLUMN: White Variant Grid */}
                    <div className="flex flex-col">
                        {showColumnLabels && (
                            <div className="flex items-center justify-between mb-4 px-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        {rightColumnLabel}
                                    </span>
                                </div>
                                <span className="text-[11px] font-semibold text-slate-400">
                                    Neutral White + Soft Shadow
                                </span>
                            </div>
                        )}
                        <FeatureGrid features={features} variant="white" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyWorkWithUs;
