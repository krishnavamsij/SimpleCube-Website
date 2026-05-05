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
                            <motion.div variants={fadeInUp} className="flex justify-center mb-10">
                                <Link
                                    href="/insights/blog"
                                    className="group"
                                >
                                    <EyebrowButton>BLOG</EyebrowButton>
                                </Link>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 text-white mb-8 text-sm font-medium font-display">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#1e90ff]" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e90ff]/10 text-[#63c2ff] border border-[#1e90ff]/20">
                                    <Tag className="w-3 h-3" />
                                    {post.tag}
                                </div>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-4xl sm:text-5xl lg:text-[52px] font-normal text-[#e8f0ff] tracking-tight leading-[1.18] mb-8"
                                style={{ fontFamily: "'DM Serif Display', serif" }}
                                dangerouslySetInnerHTML={{ __html: post.title.replace('Agent-Led Future', '<span class="text-white italic">Agent-Led Future</span>') }}
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
            <main className="mx-auto w-full max-w-[740px] px-6 pt-8 pb-24">
                <div className="flex flex-col items-center">
                    {/* Content Column */}
                    <div className="w-full">
                        <div className="space-y-8">
                            {post.sections.map((section, idx) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-40 group w-full"
                                >
                                    {section.title && (
                                        <div className="mb-8">
                                            <h2 className="text-2xl sm:text-[26px] font-bold text-[#0a0f1e] leading-[1.3] text-left" style={{ fontFamily: "'DM Serif Display', serif" }}>{section.title}</h2>
                                        </div>
                                    )}

                                    <div
                                        className="blog-content font-sans text-[16px] font-normal leading-[1.8] text-[#374151] text-left
                                        [&_p]:mb-6 
                                        [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3
                                        [&_li]:flex [&_li]:gap-3.5 [&_li]:items-start [&_li]:text-[#374151] [&_li]:text-[16px] [&_li]:leading-[1.8]
                                        [&_strong]:text-[#111827] [&_strong]:font-semibold
                                        [&_em]:text-[#1e90ff] [&_em]:italic
                                        [&_a]:text-[#1e90ff] [&_a]:underline [&_a]:font-medium
                                        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#111827] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-serif"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>


            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                .blog-content li {
                    position: relative;
                    padding-left: 20px;
                }
                .blog-content li::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 11px;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: #1e90ff;
                    opacity: 0.6;
                }
                .feature-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin: 24px 0;
                }
                .feature-card {
                    background: white;
                    border: 1px solid #eef2f6;
                    border-radius: 12px;
                    padding: 20px 24px;
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
                }
                .feature-card:hover {
                    border-color: #1e90ff33;
                    box-shadow: 0 8px 24px rgba(30,144,255,0.08);
                    transform: translateX(4px);
                }
                .feature-card__dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #1e90ff;
                    flex-shrink: 0;
                    margin-top: 10px;
                    opacity: 0.6;
                }
                .feature-card__content strong {
                    display: block;
                    font-size: 16px;
                    color: #111827;
                    margin-bottom: 4px;
                }
                .feature-card__content p {
                    font-size: 15px;
                    color: #4b5563;
                    line-height: 1.6;
                    margin-bottom: 0 !important;
                }
                .cta-mini {
                    background: #f8fafc;
                    border-left: 4px solid #1e90ff;
                    padding: 20px 24px;
                    border-radius: 0 12px 12px 0;
                    margin-top: 40px;
                }
                .cta-mini p {
                    margin-bottom: 0 !important;
                    font-size: 15px;
                }
                /* ─── Premium Trend Cards (Specific to AWS/Cloud Trends) ─── */
                .trend-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    margin: 32px 0;
                }
                .trend-card {
                    border: 1px solid #eef2f6;
                    border-radius: 16px;
                    overflow: hidden;
                    background: white;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }
                .trend-card__header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 20px 24px;
                    background: #0a0f1e;
                    position: relative;
                    overflow: hidden;
                }
                .trend-card__header::before {
                    content: "";
                    position: absolute; inset: 0;
                    background-image: 
                        linear-gradient(rgba(30,144,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(30,144,255,0.1) 1px, transparent 1px);
                    background-size: 30px 30px;
                    opacity: 0.4;
                }
                .trend-card__icon {
                    position: relative; z-index: 1;
                    width: 36px; height: 36px;
                    border-radius: 10px;
                    background: rgba(30,144,255,0.2);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    color: #63c2ff;
                }
                .trend-card__title {
                    position: relative; z-index: 1;
                    font-family: 'DM Serif Display', serif;
                    font-size: 19px;
                    color: #e8f0ff;
                    line-height: 1.3;
                }
                .trend-card__body {
                    background: white;
                }
                .trend-card__row {
                    padding: 20px 24px;
                    border-bottom: 1px solid #f1f5f9;
                }
                .trend-card__row:last-child { border-bottom: none; }
                .trend-card__row-label {
                    font-family: var(--font-display), sans-serif;
                    font-size: 10px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    font-weight: 700;
                    margin-bottom: 8px;
                    display: block;
                }
                .trend-card__row-label--trend   { color: #94a3b8; }
                .trend-card__row-label--hyniva  { color: #1e90ff; }
                .trend-card__row-text {
                    font-size: 15px;
                    color: #4b5563;
                    line-height: 1.7;
                }
                /* ─── Premium CTA Banner ─── */
                .cta-banner {
                    margin-top: 60px;
                    background: #0a0f1e;
                    border-radius: 20px;
                    padding: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 32px;
                    position: relative;
                    overflow: hidden;
                }
                .cta-banner::before {
                    content: "";
                    position: absolute; inset: 0;
                    background-image: 
                        linear-gradient(rgba(30,144,255,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(30,144,255,0.08) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                .cta-banner__content { position: relative; z-index: 1; }
                .cta-banner__kicker {
                    font-family: var(--font-display), sans-serif;
                    display: block;
                    font-size: 10px;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: #63c2ff;
                    margin-bottom: 12px;
                    font-weight: 700;
                }
                .cta-banner__title {
                    font-family: 'DM Serif Display', serif;
                    font-size: 28px;
                    color: #e8f0ff;
                    line-height: 1.2;
                    margin-bottom: 12px;
                    font-weight: 400;
                }
                .cta-banner__desc {
                    font-size: 15px;
                    color: rgba(232, 240, 255, 0.6);
                    margin-bottom: 0 !important;
                }
                .cta-banner__button {
                    position: relative; z-index: 1;
                    display: inline-flex;
                    align-items: center;
                    padding: 14px 28px;
                    background: #1e90ff;
                    color: white;
                    font-size: 15px;
                    font-weight: 600;
                    border-radius: 12px;
                    text-decoration: none !important;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                    box-shadow: 0 4px 15px rgba(30,144,255,0.3);
                }
                .cta-banner__button:hover {
                    background: #0077e6;
                    box-shadow: 0 8px 25px rgba(30,144,255,0.5);
                    transform: translateY(-2px);
                }
                .stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin: 32px 0;
                }
                .stat-card {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 24px;
                    text-align: center;
                    transition: all 0.3s ease;
                }
                .stat-card:hover {
                    background: white;
                    border-color: #1e90ff;
                    box-shadow: 0 10px 30px -10px rgba(30,144,255,0.2);
                    transform: translateY(-2px);
                }
                .stat-card__number {
                    font-family: 'DM Serif Display', serif;
                    font-size: 36px;
                    color: #1e90ff;
                    line-height: 1;
                    margin-bottom: 8px;
                }
                .stat-card__label {
                    font-family: var(--font-display), sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    color: #64748b;
                    line-height: 1.4;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .pullquote {
                    margin: 40px 0;
                    border-left: 4px solid #1e90ff;
                    padding: 8px 0 8px 32px;
                    background: #f8fafc;
                    border-radius: 0 12px 12px 0;
                }
                .pullquote__text {
                    font-family: 'DM Serif Display', serif;
                    font-size: 22px;
                    line-height: 1.6;
                    color: #030b3b;
                    font-style: italic;
                }
                @media (max-width: 768px) {
                    .stats {
                        grid-template-columns: 1fr;
                    }
                    .cta-banner {
                        flex-direction: column;
                        padding: 32px;
                        text-align: center;
                    }
                }
            ` }} />
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


