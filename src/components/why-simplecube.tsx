"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Hourglass,
    Layers,
    Package,
    Users,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { whySimpleCubeContent } from "@/content/site-content";
import { CONTAINER_CLASS } from "@/lib/container-utils";
import { HighlightedHeadline } from "@/components/ui/highlighted-headline";

const iconMap: Record<string, LucideIcon> = {
    Users,
    Zap,
    Layers,
    Building2,
    Hourglass,
    Package,
};

export function WhySimpleCube() {
    const [isSimpleCube, setIsSimpleCube] = useState(true);
    const { headline, highlightedWord, description, columns, rows } = whySimpleCubeContent;

    const cardData = rows.map((row) => ({
        title: isSimpleCube ? row.advantage.title : row.traditional.title,
        desc: isSimpleCube ? row.advantage.body : row.traditional.body,
        icon: iconMap[isSimpleCube ? row.icon : getTraditionalIcon(row.traditional.title)] ?? Users,
    }));

    return (
        <section
            id="why-simplecube"
            className={`relative overflow-hidden border-t border-[#135498]/10 py-[30px] sm:py-[40px] lg:py-[50px] transition-colors duration-500 ${
                isSimpleCube ? "bg-[#F5F9FC]" : "bg-[#F3F4F6]"
            }`}
        >
            <div className={`relative ${CONTAINER_CLASS}`}>
                <div className="text-center mb-10 sm:mb-12">
                    <h2 className="text-[28px] sm:text-[44px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-[#0A2F52] leading-[1.1] font-display">
                        <HighlightedHeadline
                            headline={headline}
                            highlightedWord={highlightedWord}
                            highlightClassName={`transition-colors duration-500 ${
                                isSimpleCube ? "text-[#135498]" : "text-slate-500"
                            }`}
                        />
                    </h2>
                    <p
                        className={`mt-4 sm:mt-5 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed transition-colors duration-500 ${
                            isSimpleCube ? "text-slate-600" : "text-slate-500"
                        }`}
                    >
                        {description}
                    </p>
                </div>

                {/* Toggle Switch */}
                <div className="flex justify-center mb-12 sm:mb-16">
                    <div
                        className={`relative flex w-full max-w-[420px] cursor-pointer rounded-full border p-1.5 shadow-sm transition-all duration-500 ${
                            isSimpleCube
                                ? "border-[#135498]/25 bg-[#135498]/[0.06]"
                                : "border-slate-300 bg-slate-200/80"
                        }`}
                    >
                        <motion.div
                            className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full transition-colors duration-500 ${
                                isSimpleCube
                                    ? "bg-gradient-to-r from-[#135498] to-[#3886CE] shadow-[0_8px_24px_rgba(19,84,152,0.35)]"
                                    : "bg-slate-500 shadow-[0_4px_14px_rgba(15,23,42,0.15)]"
                            }`}
                            initial={false}
                            animate={{ x: isSimpleCube ? 0 : "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            type="button"
                            onClick={() => setIsSimpleCube(true)}
                            className={`relative z-10 w-1/2 py-3 text-[11px] sm:text-[13px] font-bold transition-colors ${
                                isSimpleCube
                                    ? "text-white"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                            aria-pressed={isSimpleCube}
                        >
                            {columns.advantage}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsSimpleCube(false)}
                            className={`relative z-10 w-1/2 py-3 text-[11px] sm:text-[13px] font-bold transition-colors ${
                                !isSimpleCube
                                    ? "text-white"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                            aria-pressed={!isSimpleCube}
                        >
                            {columns.traditional}
                        </button>
                    </div>
                </div>

                {/* Content Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {cardData.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={`${isSimpleCube ? "sc" : "agency"}-${idx}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                    className={`group relative overflow-hidden rounded-xl border p-6 sm:p-8 transition-all duration-300 ${
                                        isSimpleCube
                                            ? "border-slate-200 bg-white shadow-sm hover:border-[#135498]/30 hover:shadow-[0_12px_32px_rgba(19,84,152,0.12)]"
                                            : "border-slate-300 bg-slate-100/90 shadow-inner hover:border-slate-400"
                                    }`}
                                >
                                    {isSimpleCube && (
                                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#135498] to-[#3886CE] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    )}

                                    <div
                                        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
                                            isSimpleCube
                                                ? "bg-[#e8f1fa] text-[#135498]"
                                                : "bg-slate-200 text-slate-500"
                                        }`}
                                    >
                                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                                    </div>
                                    <h3
                                        className={`text-[16px] sm:text-lg font-black mb-3 font-display tracking-tight transition-colors duration-300 ${
                                            isSimpleCube ? "text-[#0A2F52]" : "text-slate-600"
                                        }`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className={`text-[13px] sm:text-sm leading-relaxed font-medium transition-colors duration-300 ${
                                            isSimpleCube ? "text-slate-500" : "text-slate-500"
                                        }`}
                                    >
                                        {item.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function getTraditionalIcon(title: string): string {
    switch (title) {
        case "Account Shuffling":
            return "Building2";
        case "Bloated Timelines":
            return "Hourglass";
        case "Siloed Expertise":
            return "Package";
        default:
            return "Building2";
    }
}
