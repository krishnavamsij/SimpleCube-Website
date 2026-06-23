"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqContent } from "@/content/site-content";

export function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-[40px] sm:py-[60px] lg:py-[80px]">
            <div className="mx-auto max-w-[1024px] px-6">
                <div className="flex flex-col items-center text-center mb-10 lg:mb-12">
                    <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-4 sm:px-5 py-1.5 mb-4 sm:mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        FAQ
                    </div>
                    <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-tight text-[#030B3B] leading-[1.1]">
                        Frequently Asked <span className="text-[#00D4AA]">Questions</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqContent.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div 
                                key={index} 
                                className="bg-[#f8f9fa] rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleOpen(index)}
                                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-transparent transition-colors hover:bg-slate-50 focus:outline-none"
                                >
                                    <span className="font-bold text-base sm:text-lg text-slate-800 pr-8 tracking-tight">
                                        {faq.question}
                                    </span>
                                    <span className="flex-shrink-0 text-slate-400">
                                        {isOpen ? <Minus className="w-5 h-5 text-[#1e90ff]" /> : <Plus className="w-5 h-5 text-[#1e90ff]" />}
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-slate-600 text-base sm:text-lg leading-relaxed">
                                                {faq.answer}
                                            </div>
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
