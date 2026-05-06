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

/* ─────────────────────────── Related Articles Component ─────────────────────────── */
function RelatedArticles({ currentSlug, currentTag }: { currentSlug: string; currentTag: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const related = React.useMemo(() => {
        const allPosts = blogContent.posts.filter(p => {
            const postSlug = p.href.split('/').pop();
            return postSlug !== currentSlug;
        });
        const sameTag = allPosts.filter(p => p.tag === currentTag);
        const otherTag = allPosts.filter(p => p.tag !== currentTag);
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
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#030B3B] leading-snug">Related Articles</h3>
                        <p className="text-slate-400 mt-2 font-medium text-sm sm:text-base">Continue exploring insights from the Hyniva team</p>
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
                                    Read More
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

            <RelatedArticles currentSlug={slug} currentTag={post?.tag || ""} />

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
                    margin-top: 36px;
                    background: #0a0f1e;
                    border-radius: 14px;
                    padding: 36px 32px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    position: relative;
                    overflow: hidden;
                }
                .stats::before {
                    content: '';
                    position: absolute; inset: 0;
                    background-image: 
                        linear-gradient(rgba(30,144,255,0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(30,144,255,0.07) 1px, transparent 1px);
                    background-size: 28px 28px;
                }
                .stat {
                    position: relative; z-index: 1;
                    text-align: center;
                }
                .stat__value {
                    font-family: 'DM Serif Display', serif;
                    font-size: clamp(26px, 3.5vw, 38px);
                    color: #63c2ff;
                    line-height: 1;
                    margin-bottom: 8px;
                }
                .stat__label {
                    font-size: 13px;
                    font-weight: 300;
                    color: rgba(200,220,245,.65);
                    line-height: 1.5;
                }
                /* ─── BENEFIT CARDS ─── */
                .benefits {
                    margin-top: 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .benefit-card {
                    border: 1px solid #eef2f6;
                    border-radius: 14px;
                    overflow: hidden;
                }
                .benefit-card__header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 18px 22px;
                    background: #f7f8fc;
                    border-bottom: 1px solid #eef2f6;
                }
                .benefit-card__icon {
                    width: 34px; height: 34px;
                    border-radius: 9px;
                    background: rgba(30,144,255,.1);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .benefit-card__icon svg { width: 16px; height: 16px; }
                .benefit-card__title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #0a0f1e;
                    flex: 1;
                }
                .benefit-card__metric {
                    font-size: 12px;
                    font-weight: 600;
                    color: #1e6fff;
                    background: rgba(30,144,255,.08);
                    border: 1px solid rgba(30,144,255,.18);
                    border-radius: 100px;
                    padding: 4px 12px;
                    white-space: nowrap;
                    flex-shrink: 0;
                }
                .benefit-card__body {
                    padding: 18px 22px;
                    font-size: 15px;
                    font-weight: 300;
                    color: #4a5568;
                    line-height: 1.8;
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
                /* ─── STRATEGY CARDS ─── */
                .strategies {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    margin-top: 28px;
                }
                .strategy-card {
                    display: flex;
                    gap: 20px;
                    align-items: flex-start;
                    background: #f7f8fc;
                    border: 1px solid #eef2f6;
                    border-radius: 12px;
                    padding: 22px 24px;
                }
                .strategy-card__tag {
                    background: #0a0f1e;
                    color: #63c2ff;
                    font-size: 10px;
                    font-weight: 500;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    border-radius: 6px;
                    padding: 5px 10px;
                    flex-shrink: 0;
                    white-space: nowrap;
                    margin-top: 2px;
                }
                .strategy-card__body {
                    flex: 1;
                }
                .strategy-card__title {
                    font-size: 15px;
                    font-weight: 500;
                    color: #0a0f1e;
                    margin-bottom: 5px;
                }
                .strategy-card__desc {
                    font-size: 15px;
                    font-weight: 300;
                    color: #4a5568;
                    line-height: 1.7;
                }
                /* ─── CAPABILITY CARDS ─── */
                .capabilities {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    margin-top: 28px;
                }
                .cap-card {
                    background: white;
                    border: 1px solid #eef2f6;
                    border-radius: 16px;
                    overflow: hidden;
                    position: relative;
                    padding: 24px 22px;
                    display: flex;
                    flex-direction: column;
                }
                .cap-card::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    background: #1e90ff;
                    border-radius: 16px 16px 0 0;
                }
                .cap-card__icon {
                    font-size: 24px;
                    margin-bottom: 12px;
                    line-height: 1;
                    flex-shrink: 0;
                }
                .cap-card__title {
                    font-size: 14.5px;
                    font-weight: 500;
                    color: #0a0f1e;
                    margin-bottom: 7px;
                }
                .cap-card__desc {
                    font-size: 14px;
                    font-weight: 300;
                    color: #4a5568;
                    line-height: 1.65;
                }
                @media (max-width: 768px) {
                    .cap-card {
                        padding: 20px 18px;
                    }
                    .cap-card__icon {
                        font-size: 20px;
                        margin-bottom: 10px;
                    }
                    .cap-card__title {
                        font-size: 13px;
                        margin-bottom: 6px;
                    }
                    .cap-card__desc {
                        font-size: 13px;
                        line-height: 1.6;
                    }
                }
                }
                /* ─── PROBLEMS GRID ─── */
                .problems {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    margin-top: 28px;
                    border: 1px solid #eef2f6;
                    border-radius: 12px;
                    overflow: hidden;
                }
                /* ─── EVENT CARDS ─── */
                .event-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-top: 28px;
                }
                .event-card {
                    background: white;
                    border: 1px solid #eef2f6;
                    border-radius: 12px;
                    padding: 20px;
                    position: relative;
                }
                .event-card__date {
                    font-size: 12px;
                    color: #6eb3ff;
                    font-weight: 500;
                    margin-bottom: 8px;
                    font-family: var(--font-display), sans-serif;
                }
                .event-card__title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #0a0f1e;
                    margin-bottom: 8px;
                    font-family: var(--font-display), sans-serif;
                }
                .event-card__desc {
                    font-size: 14px;
                    color: #4a5568;
                    line-height: 1.6;
                }
                .problem-row {
                    display: grid;
                    grid-template-columns: 44px 1fr;
                    border-bottom: 1px solid #eef2f6;
                }
                .problem-row:last-child { border-bottom: none; }
                .problem-row:nth-child(even) { background: #f7f8fc; }
                .problem-row__num {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'DM Serif Display', serif;
                    font-size: 15px;
                    color: #1e90ff;
                }
                .problem-row__body {
                    padding: 16px 20px 16px 4px;
                }
                .problem-row__title {
                    font-size: 14px;
                    font-weight: 500;
                    color: #0a0f1e;
                    margin-bottom: 3px;
                }
                .problem-row__desc {
                    font-size: 14.5px;
                    font-weight: 300;
                    color: #4a5568;
                    line-height: 1.65;
                }
                /* ─── VISION CARDS ─── */
                .vision {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    margin-top: 28px;
                }
                .vision-card {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 20px;
                    align-items: flex-start;
                    border: 1px solid #eef2f6;
                    border-radius: 12px;
                    overflow: hidden;
                }
                .vision-card__index {
                    background: #0a0f1e;
                    color: #6eb3ff;
                    font-family: 'DM Serif Display', serif;
                    font-size: 18px;
                    width: 52px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 22px;
                    align-self: stretch;
                }
                .vision-card__body {
                    padding: 20px 22px 20px 0;
                }
                .vision-card__title {
                    font-size: 15px;
                    font-weight: 500;
                    color: #0a0f1e;
                    margin-bottom: 5px;
                }
                .vision-card__desc {
                    font-size: 15px;
                    font-weight: 300;
                    color: #4a5568;
                    line-height: 1.7;
                }
                .vision-card__example {
                    margin-top: 10px;
                    padding: 10px 14px;
                    background: #f7f8fc;
                    border-left: 3px solid #1e90ff;
                    border-radius: 4px;
                    font-size: 13.5px;
                    font-weight: 300;
                    color: #8492a6;
                    line-height: 1.6;
                }
                .vision-card__example span {
                    font-weight: 500;
                    color: #4a5568;
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
                    .strategy-card {
                        flex-direction: column;
                        gap: 10px;
                    }
                    .problem-row {
                        grid-template-columns: 1fr;
                    }
                    .problem-row__num {
                        padding-top: 16px;
                        padding-left: 20px;
                    }
                    .problem-row__body {
                        padding: 4px 20px 16px 20px;
                    }
                    .vision-card {
                        grid-template-columns: 44px 1fr;
                    }
                    .vision-card__index {
                        padding-top: 16px;
                        padding-left: 20px;
                    }
                    .vision-card__body {
                        padding: 4px 20px 16px 20px;
                    }
                }
            ` }} />
        </div>
    );
}



