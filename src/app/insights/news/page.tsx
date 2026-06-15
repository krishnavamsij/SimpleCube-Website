"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogNoResults } from "@/components/blog-no-results";
import { blogContent } from "@/content/blog";
import { searchBlogs, hasNoResults } from "@/lib/blog-search";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { scrollReveal, viewportOnce, fadeInUp, staggerContainer } from "@/lib/animations";

export default function NewsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Get only news posts
    const newsPosts = useMemo(() => {
        return blogContent.posts.filter(post => post.isNews);
    }, []);

    // Filter news posts using the search utility
    const filteredPosts = useMemo(() => {
        return searchBlogs(newsPosts, searchQuery);
    }, [newsPosts, searchQuery]);

    // Never show no results for news - always show all news posts
    const showNoResults = false;

    // Handler to clear search
    const handleClearSearch = () => {
        setSearchQuery('');
    };

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
                        NEWS
                    </motion.div>
                    
                    {/* Header Container */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8">
                        {/* Title & Description */}
                        <div className="lg:w-2/3">
                            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-[72px] font-[900] text-[#030B3B] tracking-tight leading-[1.05] mb-6 font-display">
                                Highlights that <span className='text-[#00D4AA]'>matter.</span>
                            </motion.h1>
                            <motion.p 
                                variants={fadeInUp} 
                                className="w-full text-lg leading-relaxed text-slate-600 sm:text-xl font-medium max-w-4xl"
                            >
                                Explore the latest news, strategic announcements, technology updates <br className="hidden sm:block" />
                                and milestones from Hyniva.
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
                                    className="w-full px-4 py-3 pl-11 pr-10 text-sm font-medium text-[#030B3B] bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]/50 focus:bg-white placeholder:text-[#9CA3AF] transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300/50"
                                />
                                {/* Search Icon */}
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-[#9CA3AF]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                {/* Clear Button */}
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                                        aria-label="Clear search"
                                    >
                                        <svg
                                            className="w-4 h-4 text-[#9CA3AF] hover:text-[#030B3B]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Card Grid or No Results ── */}
                {showNoResults ? (
                    <BlogNoResults
                        searchQuery={searchQuery}
                        onClearSearch={handleClearSearch}
                        type="news"
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, idx) => (
                        <motion.div
                            key={idx}
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="group flex flex-col rounded-[32px] bg-white border border-[#030B3B]/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative"
                        >
                            {/* Card Image */}
                            <div className="aspect-[1.8/1] overflow-hidden relative m-3 rounded-[24px]">
                                <div 
                                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url('${encodeURI(post.image)}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-40" />
                            </div>

                            {/* Card Body */}
                            <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                                {/* Meta Row: Date Only (Tags removed as per request) */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{post.date}</span>
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
                                    Read News
                                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
