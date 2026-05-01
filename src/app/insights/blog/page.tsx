"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogContent } from "@/content/blog";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { scrollReveal, viewportOnce, fadeInUp, staggerContainer } from "@/lib/animations";

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[#080d16] font-sans text-white">
            <Navbar forceDarkText={false} />
            
            <main className="pt-40 pb-24 mx-auto w-full max-w-[1400px] px-6">
                {/* ── Page Header ── */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-20 max-w-4xl"
                >
                    <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#1e90ff]">BLOG</span>
                    </motion.div>
                    
                    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8f0ff] tracking-tight leading-[1.1] mb-8 font-display">
                        Our Digital <br />
                        <span className="italic text-[#63c2ff]">Thoughts.</span>
                    </motion.h1>
                    
                    <motion.p 
                        variants={fadeInUp} 
                        className="text-lg leading-relaxed text-[#a0b9e6]/60 max-w-2xl font-light"
                    >
                        Insights, perspectives, and expertise from the Hyniva team on AI, Salesforce, AWS, Microsoft, and the future of enterprise transformation.
                    </motion.p>
                </motion.div>

                {/* ── Card Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogContent.posts.map((post, idx) => (
                        <motion.div
                            key={idx}
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="group flex flex-col rounded-[24px] bg-[#0f1623] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.55)] hover:border-[#1e90ff]/20 relative"
                        >
                            {/* Card Image */}
                            <div className="h-[200px] overflow-hidden relative m-3 rounded-[12px] bg-[#080d16]">
                                <div 
                                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url('${post.image}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1623]/40 to-transparent opacity-60" />
                            </div>

                            {/* Card Body */}
                            <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                                {/* Meta Row */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[11px] font-normal text-[#a0c3f0]/45 tracking-tight">{post.date}</span>
                                    <span className="px-2.5 py-0.5 rounded-full bg-[#1e90ff]/10 border border-[#1e90ff]/20 text-[10px] font-bold tracking-widest text-[#1e90ff] uppercase">{post.tag}</span>
                                </div>

                                <h3 
                                    className="font-display text-[19px] font-bold text-[#eef5ff] leading-[1.3] tracking-tight mb-8 flex-1"
                                    dangerouslySetInnerHTML={{ __html: post.title.replace(/\*(.*?)\*/g, "<em>$1</em>") }}
                                />
                                
                                {/* CTA Button */}
                                <Link
                                    href={post.href}
                                    className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-transparent border border-[#1e90ff]/30 rounded-full text-[13px] font-medium text-[#c8e1ff]/80 transition-all duration-300 group-hover:bg-[#1e90ff]/10 group-hover:border-[#1e90ff]/55 group-hover:text-white group-hover:gap-4"
                                >
                                    Read Article
                                    <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
            
            <style jsx global>{`
                h3 em {
                    font-style: italic;
                    color: #63c2ff;
                }
            `}</style>
        </div>
    );
}
