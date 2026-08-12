"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqContent } from "@/content/site-content";

export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqProps {
    items?: FaqItem[];
    badgeText?: string;
    title?: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export function Faq({ items = faqContent, badgeText = "FAQ", title, className = "", containerClassName = "max-w-[800px]" }: FaqProps = {}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`bg-white pt-[10px] sm:pt-[15px] lg:pt-[20px] pb-[30px] sm:pb-[40px] lg:pb-[50px] ${className}`}>
            <div className={`mx-auto px-6 ${containerClassName}`}>

                {/* Header — centered */}
                <div className="flex flex-col items-center text-center mb-10 lg:mb-12">
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        {badgeText}
                    </div>
                    <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-tight text-[#030B3B] leading-[1.1] lg:whitespace-nowrap">
                        {title || <>Frequently Asked <span className="text-[#00D4AA]">Questions</span></>}
                    </h2>
                </div>

                {/* Accordion — very light card rows with gaps, matching reference */}
                <div className="space-y-3">
                    {items.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="bg-[#f8f9fa] rounded-2xl border border-slate-100 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleOpen(index)}
                                    className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:py-5 text-left focus:outline-none hover:bg-slate-50 transition-colors duration-150"
                                >
                                    <span className="text-[14px] sm:text-[15px] font-bold text-slate-800 leading-snug tracking-tight">
                                        {faq.question}
                                    </span>
                                    {/* Plain blue + / − icon */}
                                    <span className="flex-shrink-0 text-[#1e90ff]">
                                        {isOpen
                                            ? <Minus className="w-5 h-5" />
                                            : <Plus className="w-5 h-5" />
                                        }
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-5 pb-5 text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
