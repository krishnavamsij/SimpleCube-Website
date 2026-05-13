"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogContent } from "@/content/blog";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { scrollReveal, viewportOnce, fadeInUp, staggerContainer } from "@/lib/animations";

export default function BlogsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter blog posts based on search query only
    const filteredPosts = useMemo(() => {
        return blogContent.posts
            .filter(post => !post.isNews) // Only show regular blog posts
            .filter(post => {
                const title = post.title.replace(/<[^>]*>/g, ''); // Remove HTML tags for search
                const matchesSearch = searchQuery === '' || title.toLowerCase().includes(searchQuery.toLowerCase());
                
                return matchesSearch;
            });
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-white font-sans text-[#030B3B] overflow-x-hidden">
            <Navbar forceDarkText={true} />
            
            <main className="pt-28 sm:pt-32 pb-16 sm:pb-24 mx-auto w-full max-w-[1400px] px-4 sm:px-6">
                {/* ── Page Header ── */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-20"
                >
                    <motion.div variants={fadeInUp} className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 mb-8 w-fit">
                        <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                        BLOGS
                    </motion.div>
                    
                    {/* Header Container with Search/Filter */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8">
                        {/* Title Side */}
                        <div className="lg:w-2/3">
                            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-[72px] font-[900] text-[#030B3B] tracking-tight leading-[1.05] mb-6 font-display" dangerouslySetInnerHTML={{ __html: blogContent.hero.title }} />
                            <motion.p 
                                variants={fadeInUp} 
                                className="w-full text-lg leading-relaxed text-slate-600 sm:text-xl font-medium max-w-4xl"
                            >
                                Insights, perspectives, and expertise from Hyniva team on AI, Salesforce,<br className="hidden sm:block" />
                                AWS, Microsoft, and future of enterprise transformation.
                            </motion.p>
                        </div>

                        {/* Filter Side */}
                        <div className="w-full lg:w-[300px]">
                            {/* Search Bar */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-3 py-2 pr-10 text-sm font-medium text-[#030B3B] bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e90ff] focus:border-transparent placeholder:text-[#9CA3AF] transition-all duration-200"
                                />
                                {/* <svg 
                                    className="absolute right-4 top-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-2a2 2 0 00-2 2v12a2 2 0 002 2h-4l-4 4m0 0l-4-4m4-4H3" />
                                </svg> */}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Card Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, idx) => (
                        <motion.div
                            key={idx}
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="group flex flex-col rounded-[32px] bg-[#ECF6FF] border border-[#030B3B]/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative"
                        >
                            {/* Card Image */}
                            <div className="aspect-[1.8/1] overflow-hidden relative m-3 rounded-[24px] bg-white">
                                <div 
                                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url('${encodeURI(post.image)}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#ECF6FF]/20 to-transparent opacity-40" />
                            </div>

                            {/* Card Body */}
                            <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                                {/* Meta Row: Date & Industry Eyebrow */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span className="text-[10px] font-bold text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 px-2 py-0.5 rounded-full uppercase tracking-widest leading-none flex items-center">
                                        {post.tag}
                                    </span>
                                </div>

                                <h3 
                                    className="font-display text-[21px] font-bold text-[#030B3B] leading-[1.4] tracking-tight mb-8 flex-1"
                                    dangerouslySetInnerHTML={{ __html: post.title }}
                                />
                                
                                {/* CTA Button */}
                                <Link
                                    href={post.href}
                                    className="flex items-center justify-between w-full py-4 px-6 bg-white border border-[#1e90ff]/20 rounded-2xl text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                >
                                    Read Article
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
