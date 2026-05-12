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
import Link from "next/link";
import { EyebrowButton } from "@/components/ui/eyebrow-button";

/* ─────────────────────────── Related News Component ─────────────────────────── */
function RelatedNews({ currentSlug, currentTag }: { currentSlug: string; currentTag: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const related = React.useMemo(() => {
        const allNews = blogContent.posts.filter(p => {
            const postSlug = p.href.split('/').pop();
            return p.isNews && postSlug !== currentSlug;
        });
        const sameTag = allNews.filter(p => p.tag === currentTag);
        const otherTag = allNews.filter(p => p.tag !== currentTag);
        return [...sameTag, ...otherTag].slice(0, 6);
    }, [currentSlug, currentTag]);

    const checkScroll = () => {
        if (containerRef.current) {
            setCanScrollLeft(containerRef.current.scrollLeft > 0);
            setCanScrollRight(
                containerRef.current.scrollLeft <
                containerRef.current.scrollWidth - containerRef.current.clientWidth
            );
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = 400;
            containerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            checkScroll();
            return () => container.removeEventListener('scroll', checkScroll);
        }
    }, [related]);

    if (related.length === 0) {
        return null;
    }

    return (
        <section className="bg-[#F8FAFC] border-t border-[#030B3B]/10 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-[1400px] px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#030B3B] leading-snug">Related News</h3>
                        <p className="text-slate-400 mt-2 font-medium text-sm sm:text-base">Stay updated with the latest from Hyniva</p>
                    </div>
                    <div className="flex gap-3">
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
                <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory -mx-6 px-6 sm:px-0"
                    ref={containerRef}
                >
                    {related.map((post, idx) => (
                        <div
                            key={idx}
                            className="group flex-shrink-0 w-full sm:w-[calc(33.333%-16px)] bg-white rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-lg hover:border-[#1e90ff]/20 transition-all duration-300 snap-start"
                        >
                            <div className="relative h-[180px] sm:h-[200px] overflow-hidden rounded-t-2xl">
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
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.date}
                                </div>
                                <h5 className="text-base sm:text-lg font-bold text-[#030B3B] leading-snug line-clamp-2 mb-4 group-hover:text-[#1e90ff] transition-colors">
                                    {post.title}
                                </h5>
                                <Link
                                    href={post.href}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e90ff] text-white text-sm font-semibold rounded-lg hover:bg-[#0077e6] transition-colors shadow-sm hover:shadow-md"
                                >
                                    Read News
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function NewsDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const post = blogDetails[slug as keyof typeof blogDetails];

    const [activeSection, setActiveSection] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
            <header className="relative pt-24 pb-28 bg-[#0a0f1e] overflow-hidden flex flex-col items-center">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-[#1e90ff] rounded-full blur-[90px]" />
                    <div className="absolute bottom-0 right-[-80px] w-[400px] h-[400px] bg-[#1e90ff] rounded-full blur-[90px]" />
                </div>

                <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10 text-center">
                    <div className="w-full max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="flex justify-center mb-10">
                                <EyebrowButton href="/insights/news">NEWS</EyebrowButton>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 text-[#1e90ff] mb-8 text-sm font-medium font-display">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.date}
                                </div>
                                {/* Tags are optional in news detail but we can keep it if they exist in data */}
                                {post.tag && (
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20">
                                        <Tag className="w-3 h-3" />
                                        {post.tag}
                                    </div>
                                )}
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-[26px] sm:text-[34px] lg:text-[44px] font-[900] font-display text-white tracking-tight leading-[1.15] mb-6 px-4 sm:px-8 max-w-[1150px] mx-auto cs-line-clamp-2"
                                style={{ textTransform: 'none' }}
                                dangerouslySetInnerHTML={{ __html: post.title }}
                            />

                            {post.subtitle && (
                                <motion.p
                                    variants={fadeInUp}
                                    className="text-xl sm:text-2xl text-white font-medium leading-relaxed max-w-5xl mx-auto tracking-wide px-8"
                                >
                                    {post.subtitle}
                                </motion.p>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[10px] font-medium text-white tracking-[0.3em] uppercase">SCROLL</span>
                    <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12 pt-8 pb-24">
                <div className="flex flex-col items-center">
                    {/* Content Column */}
                    <div className="w-full lg:w-[85%]">
                        <div className="space-y-8">
                            {post.sections.map((section, idx) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-40 group w-full"
                                    suppressHydrationWarning
                                >
                                    {section.title && (
                                        <div className="mb-8">
                                            <h2 className="text-2xl sm:text-[26px] font-bold text-[#0a0f1e] leading-[1.2] text-left font-display">{section.title}</h2>
                                        </div>
                                    )}

                                    {mounted ? (
                                        <div
                                            className="blog-content font-sans text-[16px] font-normal leading-[1.8] text-[#374151] text-left
                                            [&_div]:mb-6 
                                            [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3
                                            [&_li]:flex [&_li]:gap-3.5 [&_li]:items-start [&_li]:text-[#374151] [&_li]:text-[16px] [&_li]:leading-[1.8]
                                            [&_strong]:text-[#111827] [&_strong]:font-semibold
                                            [&_em]:text-[#1e90ff] [&_em]:italic
                                            [&_a]:text-[#1e90ff] [&_a]:underline [&_a]:font-medium
                                            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#111827] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-display
                                            [&_svg]:w-9 [&_svg]:h-9"
                                            dangerouslySetInnerHTML={{ __html: section.content }}
                                        />
                                    ) : (
                                        <div className="min-h-[40px]" />
                                    )}
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <RelatedNews currentSlug={slug} currentTag={post?.tag || ""} />

            <Footer />

            <style suppressHydrationWarning dangerouslySetInnerHTML={{
                __html: `
                /* ─── GLOBAL STANDARDS ─── */
                p { font-size: 16px; font-weight: 300; color: #4a5568; line-height: 1.8; margin-bottom: 24px; }
                h2 { font-family: var(--font-display), serif; font-size: clamp(26px, 4vw, 36px); color: #0a0f1e; margin: 48px 0 24px; line-height: 1.2; font-weight: 700; }
                em { font-style: normal; color: white !important; } 
                .blog-content em { font-style: normal; color: inherit; }
                strong { font-weight: 600; color: #0a0f1e; }
                .blog-content ul li::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 9px; }

                /* Reuse styles from blog if needed, but these are the basics */
                ` }} />
        </div>
    );
}
