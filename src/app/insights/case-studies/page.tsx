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
        <div className="min-h-screen bg-white font-sans text-[#030B3B]">
            <Navbar forceDarkText={true} />
            
            <main className="pt-32 pb-24 mx-auto w-full max-w-[1400px] px-6">
                {/* ── Page Header ── */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-20"
                >
                    <motion.div variants={fadeInUp} className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
                        <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                        CASE STUDIES
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-[72px] font-[900] text-[#030B3B] tracking-tight leading-[1.05] mb-12 font-display">
                        Real <span className="text-[#00D4AA]">Results.</span><br />
                        Proven <span className="text-[#00D4AA]">Impact.</span>
                    </motion.h1>
                    <motion.p 
                        variants={fadeInUp} 
                        className="w-full text-lg leading-relaxed text-slate-600 sm:text-xl font-medium max-w-4xl"
                    >
                        Discover how Hyniva enables enterprises to modernize<br className="hidden sm:block" />
                        operations and deliver measurable business impact.
                    </motion.p>
                </motion.div>

                {/* ── Card Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudiesContent.studies.map((study, idx) => (
                        <motion.div
                            key={idx}
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="group flex flex-col rounded-[32px] bg-[#ECF6FF] border border-[#030B3B]/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative"
                        >
                            {/* Card Image */}
                            <div className="h-[220px] overflow-hidden relative m-3 rounded-[24px] bg-white">
                                <div 
                                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url('${encodeURI(study.image)}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#ECF6FF]/20 to-transparent opacity-40" />
                            </div>

                            {/* Card Body */}
                            <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                                <h3 
                                    className="font-sans text-[21px] font-bold text-[#030B3B] leading-[1.4] tracking-tight mb-4 flex-1"
                                    dangerouslySetInnerHTML={{ __html: study.title }}
                                />
                                <p className="text-[15px] font-medium text-[#030B3B]/70 leading-relaxed mb-8">
                                    {study.description}
                                </p>
                                
                                {/* CTA Button */}
                                <Link
                                    href={study.href}
                                    className="flex items-center justify-between w-full py-4 px-6 bg-white border border-[#1e90ff]/20 rounded-2xl text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
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
