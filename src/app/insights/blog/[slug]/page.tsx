"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogDetails } from "@/content/blog-details";
import { blogContent } from "@/content/blog";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ArrowLeft, Clock, User, Tag, ChevronLeft, ChevronRight, MessageSquare, Send, Eye, Cloud } from "lucide-react";
import { CaseStudyPopup } from "@/components/case-study-popup";
import Link from "next/link";

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const post = blogDetails[slug];

    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, [post]);

    if (!post) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white font-sans text-[#030B3B] overflow-x-hidden">
            <Navbar forceDarkText={false} />

            {/* ── Hero Section ── */}
            <header className="relative pt-32 pb-20 bg-[#0a0f1e] overflow-hidden flex flex-col items-center">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-[#1e90ff] rounded-full blur-[90px]" />
                    <div className="absolute bottom-0 right-[-80px] w-[400px] h-[400px] bg-[#1e90ff] rounded-full blur-[90px]" />
                </div>

                <div className="mx-auto w-full max-w-[860px] px-6 relative z-10 text-center">
                    <div className="w-full">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-10">
                                <Link
                                    href="/insights/blog"
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_10px_#1e90ff] animate-pulse group-hover:scale-110 transition-transform" />
                                    <span className="text-[11px] font-bold text-[#63c2ff] uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                                        BLOG
                                    </span>
                                </Link>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 text-white mb-8 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#1e90ff]" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e90ff]/10 text-[#63c2ff] border border-[#1e90ff]/20">
                                    <Cloud className="w-3 h-3" />
                                    {post.tag}
                                </div>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-4xl sm:text-5xl lg:text-[52px] font-normal text-[#e8f0ff] tracking-tight leading-[1.18] mb-8"
                                style={{ fontFamily: "'DM Serif Display', serif" }}
                                dangerouslySetInnerHTML={{ __html: post.title.replace('Agent-Led Future', '<span class="text-[#00D4AA] italic">Agent-Led Future</span>') }}
                            />

                            {post.subtitle && (
                                <motion.p
                                    variants={fadeInUp}
                                    className="text-xl sm:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl mx-auto"
                                >
                                    {post.subtitle}
                                </motion.p>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[10px] font-medium text-[#63c2ff] tracking-[0.3em] uppercase">SCROLL</span>
                    <div className="w-[1px] h-10 bg-gradient-to-b from-[#63c2ff] to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="mx-auto w-full max-w-[740px] px-6 py-24">
                <div className="flex flex-col items-center">
                    {/* Content Column */}
                    <div className="w-full">
                        <div className="space-y-16">
                            {post.sections.map((section, idx) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-40 group w-full"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-2xl sm:text-[26px] font-bold text-[#0a0f1e] leading-[1.3] text-left" style={{ fontFamily: "'DM Serif Display', serif" }}>{section.title}</h2>
                                    </div>

                                    <div
                                        className="font-sans text-[17px] font-light leading-[1.85] text-[#475569] text-left
                                        [&_p]:mb-8 
                                        [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5
                                        [&_li]:flex [&_li]:gap-3.5 [&_li]:items-start [&_li]:text-[#475569] [&_li]:text-[17px] [&_li]:leading-[1.85]
                                        [&_li::before]:content-[''] [&_li::before]:w-1.5 [&_li::before]:h-1.5 [&_li::before]:rounded-full [&_li::before]:bg-[#00D4AA] [&_li::before]:flex-shrink-0 [&_li::before]:mt-[11px]
                                        [&_strong]:text-[#0a0f1e] [&_strong]:font-semibold
                                        [&_em]:text-[#00D4AA] [&_em]:italic
                                        [&_a]:text-[#00D4AA] [&_a]:underline [&_a]:font-medium
                                        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#0a0f1e] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-serif"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Related Articles ── */}
            <RelatedArticles currentSlug={slug} currentTag={post.tag} />



            <Footer />
            <CaseStudyPopup />
        </div>
    );
}

/* ─────────────────────────── Related Articles Component ─────────────────────────── */
function RelatedArticles({ currentSlug, currentTag }: { currentSlug: string; currentTag: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Get related posts: same tag first, then others, excluding current
    const related = React.useMemo(() => {
        const allPosts = blogContent.posts.filter(p => {
            const postSlug = p.href.split('/').pop();
            return postSlug !== currentSlug;
        });
        const sameTag = allPosts.filter(p => p.tag === currentTag);
        const otherTag = allPosts.filter(p => p.tag !== currentTag);
        return [...sameTag, ...otherTag].slice(0, 6);
    }, [currentSlug, currentTag]);

    const updateScrollButtons = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        updateScrollButtons();
        const el = scrollRef.current;
        if (el) el.addEventListener('scroll', updateScrollButtons);
        return () => { if (el) el.removeEventListener('scroll', updateScrollButtons); };
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const amount = window.innerWidth < 640 ? 280 : 340;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    };

    if (related.length === 0) return null;

    return (
        <section className="bg-[#F8FAFC] border-t border-[#030B3B]/5 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-[1400px] px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
                    <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-[800] text-[#030B3B] tracking-tight">Related Articles</h3>
                        <p className="text-slate-500 mt-2 font-medium text-sm sm:text-base">Continue exploring insights from the Hyniva team</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="w-12 h-12 rounded-full border border-[#030B3B]/10 flex items-center justify-center hover:bg-[#030B3B] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="w-12 h-12 rounded-full border border-[#030B3B]/10 flex items-center justify-center hover:bg-[#030B3B] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0"
                >
                    {related.map((post, idx) => (
                        <Link
                            key={idx}
                            href={post.href}
                            className="group flex-shrink-0 w-[280px] sm:w-[340px] bg-white rounded-2xl border border-[#030B3B]/5 overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 snap-start hover:-translate-y-1"
                        >
                            <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-[#030B3B] backdrop-blur-sm">
                                        {post.tag}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 sm:p-6">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-3 font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.date}
                                </div>
                                <h5 className="text-base sm:text-lg font-bold text-[#030B3B] leading-snug group-hover:text-[#00D4AA] transition-colors line-clamp-2">
                                    {post.title}
                                </h5>
                                <span className="inline-flex items-center gap-1.5 mt-4 text-xs sm:text-sm font-bold text-[#00D4AA] group-hover:gap-3 transition-all">
                                    Read more <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


