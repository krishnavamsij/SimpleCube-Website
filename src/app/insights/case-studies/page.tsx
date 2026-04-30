"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { caseStudiesContent } from "@/content/case-studies";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { scrollReveal, viewportOnce, fadeInUp, staggerContainer } from "@/lib/animations";

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-[#080c14] font-sans">
            <Navbar />
            
            <main className="pt-32 pb-24 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto">
                {/* ── Page Header ── */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-[1200px] mx-auto mb-16"
                >
                    <motion.div variants={fadeInUp} className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
                        <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                        CASE STUDIES
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-[72px] font-[900] text-white tracking-tight leading-[1.05] mb-8 font-display">
                        Real <span className="text-[#00D4AA]">Results.</span><br />
                        Proven <span className="text-[#00D4AA]">Impact.</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-xl sm:text-2xl text-slate-300 font-medium leading-[1.6] max-w-3xl mb-12">
                        {caseStudiesContent.hero.description}
                    </motion.p>
                </motion.div>

                {/* ── Card Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                    {caseStudiesContent.studies.map((study, idx) => (
                        <motion.div
                            key={idx}
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="group flex flex-col rounded-[24px] bg-[#0f1623] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#3B82F6]/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Card Image */}
                            <div className="h-[220px] overflow-hidden relative">
                                <div 
                                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url('${study.image}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1623] to-transparent opacity-60" />
                            </div>

                            {/* Card Body */}
                            <div className="p-8 flex flex-col flex-1 relative">
                                <h3 
                                    className="font-display text-[22px] font-extrabold text-white leading-[1.3] tracking-tight mb-4 flex-1"
                                    dangerouslySetInnerHTML={{ __html: study.title }}
                                />
                                <p className="text-[15px] font-medium text-slate-400 leading-relaxed mb-8">
                                    {study.description}
                                </p>
                                
                                {/* CTA Button */}
                                <Link
                                    href={study.href}
                                    className="flex items-center justify-between w-full py-4 px-6 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white transition-all duration-300 group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                >
                                    Read Case Study
                                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
