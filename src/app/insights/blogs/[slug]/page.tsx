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
            return !p.isNews && postSlug !== currentSlug;
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
                        <p className="text-slate-400 mt-2 font-medium text-sm sm:text-base">Continue exploring insights from the {/* spell-checker:disable */}Hyniva{/* spell-checker:enable */} team</p>
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
                                    alt={post.title.replace(/<[^>]*>/g, '')}
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
                                <h5
                                    className="text-base sm:text-lg font-bold text-[#030B3B] leading-snug line-clamp-2 mb-4 group-hover:text-[#1e90ff] transition-colors"
                                    dangerouslySetInnerHTML={{ __html: post.title }}
                                />
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

export default function BlogsDetailPage() {
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
            <header className="relative pt-24 pb-28 overflow-hidden bg-[#030b1e] flex flex-col items-center">
                {/* Background layers - Standardized with Contact Us */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
                <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.15)_0%,transparent_65%)]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:40px_40px]" />

                <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10 text-center">
                    <div className="w-full max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="flex justify-center mb-10">
                                <EyebrowButton href="/insights/blogs">BLOG</EyebrowButton>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 text-white mb-8 text-sm font-bold font-display">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#1e90ff]" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20">
                                    <Tag className="w-3 h-3 text-[#1e90ff]" />
                                    {post.tag}
                                </div>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="hero-title text-[26px] sm:text-[34px] lg:text-[44px] font-[900] font-display text-white tracking-tight leading-[1.15] mb-6 px-4 sm:px-8 max-w-[1150px] mx-auto cs-line-clamp-2"
                                style={{ textTransform: 'none' }}
                                dangerouslySetInnerHTML={{ __html: post.title }}
                            />

                            {post.subtitle && (
                                <motion.p
                                    variants={fadeInUp}
                                    className="text-xl sm:text-2xl text-white font-bold leading-relaxed max-w-5xl mx-auto tracking-wide px-8"
                                >
                                    {post.subtitle}
                                </motion.p>
                            )}

                            <motion.div
                                variants={fadeInUp}
                                className="mt-12 flex flex-col items-center gap-4 opacity-60"
                            >
                                <span className="text-[10px] font-bold text-white tracking-[0.4em] uppercase">SCROLL TO READ</span>
                                <div className="w-[1px] h-12 bg-gradient-to-b from-[#1e90ff] to-transparent animate-pulse" />
                            </motion.div>
                        </motion.div>
                    </div>
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
                                >
                                    {section.title && (
                                        <div className="mb-8">
                                            <h2 className="text-2xl sm:text-[26px] font-bold text-[#0a0f1e] leading-[1.2] text-left font-display">{section.title}</h2>
                                        </div>
                                    )}

                                    {mounted ? (
                                        <div
                                            className="blog-content-wrapper font-sans text-[16px] font-normal leading-[1.8] text-[#374151] text-left"
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

            <RelatedArticles currentSlug={slug} currentTag={post?.tag || ""} />

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                /* ─── GLOBAL STANDARDS ─── */
                .blog-content-wrapper { font-family: var(--font-sans), sans-serif; }
                .blog-content-wrapper div { margin-bottom: 24px; }
                .blog-content-wrapper p { font-size: 16.5px; font-weight: 400; color: #4a5568; line-height: 1.8; margin-bottom: 24px; font-family: var(--font-sans), sans-serif; }
                .blog-content-wrapper p:last-child { margin-bottom: 0; }
                .blog-content-wrapper h2 { font-family: var(--font-display), serif; font-size: clamp(26px, 4vw, 36px); color: #0a0f1e; margin: 48px 0 24px; line-height: 1.2; font-weight: 700; }
                .blog-content-wrapper h3 { font-family: var(--font-display), serif; font-size: clamp(20px, 3vw, 26px); color: #0a0f1e; margin: 32px 0 16px; line-height: 1.2; font-weight: 700; }
                .hero-title em { font-style: normal; color: white !important; } /* Branding consistency for titles */
                .blog-content-wrapper em { font-style: italic; color: #1e90ff; }
                .blog-content-wrapper strong { font-weight: 600; color: #0a0f1e; }
                .blog-content-wrapper a { color: #1e90ff; text-decoration: underline; font-weight: 500; }
                
                .blog-content-wrapper ul { margin-bottom: 32px; list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 14px; }
                .blog-content-wrapper ul li { display: flex; gap: 14px; align-items: flex-start; font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.7; font-family: var(--font-sans), sans-serif; }
                .blog-content-wrapper ul li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 10px; }
                .blog-content-wrapper svg { width: 36px; height: 36px; }

                /* ─── CAPABILITY CARDS ─── */
                .blog-content-wrapper .capabilities { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
                .blog-content-wrapper .cap-card { border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px 28px; background: #f7f8fc; position: relative; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .cap-card__title { font-family: var(--font-sans), sans-serif; font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 8px; letter-spacing: .1px; }
                .blog-content-wrapper .cap-card__body { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.75; margin-bottom: 0; }

                /* ─── OUTCOME STRIP ─── */
                .blog-content-wrapper .outcomes { margin-top: 48px; background: #f7f8fc; border-radius: 12px; padding: 36px 32px; border: 1px solid #e4e8f0; margin-bottom: 0; }
                .blog-content-wrapper .outcomes__title { font-family: var(--font-display), serif; font-size: 22px; color: #0a0f1e; margin-bottom: 24px; font-weight: 700; }
                .blog-content-wrapper .outcomes__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 0; }
                .blog-content-wrapper .outcome-item { display: flex; align-items: flex-start; gap: 12px; font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.6; margin-bottom: 0; }
                .blog-content-wrapper .outcome-item__dot { width: 8px; height: 8px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 8px; }

                /* ─── PREMIUM FEATURE CARDS ─── */
                .blog-content-wrapper .feature-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 32px 0; }
                .blog-content-wrapper .feature-cards.vertical { display: flex; flex-direction: column; gap: 16px; }
                .blog-content-wrapper .feature-card { background: white; border: 1px solid #eef2f6; border-radius: 12px; padding: 24px; display: flex; align-items: flex-start; gap: 16px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border-top: 3px solid #1e6fff; margin-bottom: 0; }
                .blog-content-wrapper .feature-card:hover { border-color: #1e90ff66; box-shadow: 0 12px 32px rgba(30,144,255,0.12); transform: translateY(-2px); }
                .blog-content-wrapper .feature-card__dot { display: none; }
                .blog-content-wrapper .feature-card__content strong { display: block; font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 10px; }
                .blog-content-wrapper .feature-card__content p { font-size: 15.5px; font-weight: 400; color: #4b5563; line-height: 1.75; margin-bottom: 0 !important; }

                /* ─── MINI CTA (LinkedIn) ─── */
                .blog-content-wrapper .cta-mini { background: #f8fafc; padding: 20px 24px; border-radius: 0 12px 12px 0; margin-top: 40px; margin-bottom: 0; }
                .blog-content-wrapper .cta-mini p { margin-bottom: 0 !important; font-size: 15px; }
                
                @media (max-width: 768px) {
                    .blog-content-wrapper .pillars, .blog-content-wrapper .stats, .blog-content-wrapper .feature-cards, .blog-content-wrapper .trend-cards, .blog-content-wrapper .benefits, .blog-content-wrapper .contrast, .blog-content-wrapper .type-compare, .blog-content-wrapper .diff-cards, .blog-content-wrapper .outcomes__grid { grid-template-columns: 1fr !important; }
                    .blog-content-wrapper .innovations { gap: 12px; }
                    /* spell-checker:disable */
                    .blog-content-wrapper .inno-card { padding: 20px; }
                    .blog-content-wrapper .inno-card__num { width: 28px; height: 28px; font-size: 12px; margin-bottom: 12px; }
                    .blog-content-wrapper .inno-card__body { gap: 12px; }
                    .blog-content-wrapper .inno-card__title { font-size: 14px; margin-bottom: 6px; }
                    .blog-content-wrapper .inno-card__desc { font-size: 13.5px; line-height: 1.6; }
                }
                /* ─── COMPARE TABLES ─── */
                .blog-content-wrapper .compare { margin-top: 32px; border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 24px; }
                .blog-content-wrapper .compare__header { display: grid; grid-template-columns: 1fr 1fr 1fr; background: #0a0f1e; margin-bottom: 0; }
                .blog-content-wrapper .compare__header div { padding: 14px 20px; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #6eb3ff; margin-bottom: 0; }
                .blog-content-wrapper .compare__header div:not(:last-child) { border-right: 1px solid rgba(255,255,255,.08); }
                .blog-content-wrapper .compare__row { display: grid; grid-template-columns: 1fr 1fr 1fr; border-top: 1px solid #e4e8f0; margin-bottom: 0; }
                .blog-content-wrapper .compare__row:nth-child(even) { background: #f7f8fc; }
                .blog-content-wrapper .compare__cell { padding: 16px 20px; font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.6; margin-bottom: 0; }
                .blog-content-wrapper .compare__cell:not(:last-child) { border-right: 1px solid #e4e8f0; }
                .blog-content-wrapper .compare__cell--label { font-weight: 600; color: #0a0f1e; }
                .blog-content-wrapper .compare__cell--positive { color: #1e6fff; }

                /* ─── JOURNEY STEPS ─── */
                .blog-content-wrapper .journey { margin-top: 32px; display: flex; flex-direction: column; gap: 0; position: relative; margin-bottom: 24px; }
                .blog-content-wrapper .journey::before { content: ''; position: absolute; left: 19px; top: 24px; bottom: 24px; width: 2px; background: linear-gradient(to bottom, #1e6fff, rgba(30,111,255,.15)); }
                .blog-content-wrapper .journey-step { display: flex; gap: 20px; align-items: flex-start; padding: 0 0 28px; position: relative; margin-bottom: 0; }
                .blog-content-wrapper .journey-step:last-child { padding-bottom: 0; }
                .blog-content-wrapper .journey-step__num { width: 40px; height: 40px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; z-index: 1; }
                .blog-content-wrapper .journey-step__content { padding-top: 8px; margin-bottom: 0; }
                .blog-content-wrapper .journey-step__title { font-size: 16px; font-weight: 700; color: #0a0f1e; margin-bottom: 6px; font-family: var(--font-sans), sans-serif; }
                .blog-content-wrapper .journey-step__body { font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.75; margin-bottom: 0; }

                /* ─── STATS STRIP ─── */
                .blog-content-wrapper .stats { margin-top: 48px; background: #0a0f1e; border-radius: 14px; padding: 40px 36px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; position: relative; overflow: hidden; margin-bottom: 24px; }
                .blog-content-wrapper .stats::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 36px 36px; }
                .blog-content-wrapper .stat { position: relative; z-index: 1; text-align: center; margin-bottom: 0; }
                .blog-content-wrapper .stat__value { font-family: var(--font-display), serif; font-size: clamp(28px, 3.5vw, 40px); color: #6eb3ff; line-height: 1; margin-bottom: 12px; font-weight: 700; }
                .blog-content-wrapper .stat__label { font-size: 14px; font-weight: 500; color: rgba(200,220,245,.8); line-height: 1.5; margin-bottom: 0; }

                /* ─── BENEFITS GRID ─── */
                .blog-content-wrapper .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 28px; margin-bottom: 24px; }
                .blog-content-wrapper .benefit-card { background: var(--surface, #f7f8fc); border: 1px solid var(--border, #e4e8f0); border-radius: 12px; padding: 24px 22px; margin-bottom: 0; }
                .blog-content-wrapper .benefit-card__label { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--blue, #1e6fff); margin-bottom: 8px; }
                .blog-content-wrapper .benefit-card__desc { font-size: 15px; font-weight: 400; color: var(--sub, #4a5568); line-height: 1.8; margin-bottom: 0; }

                /* ─── TREND CARDS ─── */
                .blog-content-wrapper .trends { margin-top: 40px; display: flex; flex-direction: column; gap: 24px; margin-bottom: 24px; }
                .blog-content-wrapper .trend-card { border: 1px solid var(--border, #e4e8f0); border-radius: 14px; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .trend-card__header { display: flex; align-items: center; gap: 14px; padding: 20px 24px; background: var(--ink, #0a0f1e); position: relative; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .trend-card__header::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
                .blog-content-wrapper .trend-card__icon { position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 10px; background: rgba(30,111,255,.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .blog-content-wrapper .trend-card__icon svg { width: 18px; height: 18px; }
                .blog-content-wrapper .trend-card__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(17px, 2vw, 22px); font-weight: 600; color: #ffffff; line-height: 1.3; margin-bottom: 0; }
                .blog-content-wrapper .trend-card__body { background: var(--white, #ffffff); margin-bottom: 0; }
                .blog-content-wrapper .trend-card__row { padding: 18px 24px; border-bottom: 1px solid var(--border, #e4e8f0); margin-bottom: 0; }
                .blog-content-wrapper .trend-card__row:last-child { border-bottom: none; }
                .blog-content-wrapper .trend-card__row-label { font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 8px; }
                .blog-content-wrapper .trend-card__row-label--trend { color: #1e6fff; }
                .blog-content-wrapper .trend-card__row-label--hyniva { color: #1e6fff; }
                .blog-content-wrapper .trend-card__row-text { font-size: 15px; font-weight: 400; color: var(--sub, #4a5568); line-height: 1.8; margin-bottom: 0; }

                /* ─── STAT CARDS ─── */
                .blog-content-wrapper .stat-card { background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px; }
                .blog-content-wrapper .stat-card__number { font-family: var(--font-display), serif; font-size: 32px; color: #1e6fff; margin-bottom: 8px; font-weight: 700; }
                .blog-content-wrapper .stat-card__label { font-size: 14px; font-weight: 400; color: #4a5568; line-height: 1.5; margin-bottom: 0; }

                /* ─── PULLQUOTE ─── */
                .blog-content-wrapper .pullquote { margin: 40px 0; padding: 4px 0 4px 32px; margin-bottom: 32px; border-left: 4px solid #1e90ff; }
                .blog-content-wrapper .pullquote__text { font-family: var(--font-display), serif; font-size: 20px; font-style: normal; font-weight: 600; color: #0a0f1e; line-height: 1.6; margin-bottom: 0; }

                /* ─── IMAGE GRID ─── */
                .blog-content-wrapper .image-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 48px 0; width: 100%; }
                .blog-content-wrapper .image-wrapper { border-radius: 16px; overflow: hidden; box-shadow: 0 4px 25px rgba(0,0,0,0.06); background: #f8fafc; aspect-ratio: 4/3; margin-bottom: 0; width: 100%; }
                .blog-content-wrapper .image-wrapper img { width: 100%; height: 100%; display: block; object-fit: cover; }
                @media (max-width: 768px) { 
                    .blog-content-wrapper .image-grid { grid-template-columns: 1fr; gap: 16px; } 
                    .blog-content-wrapper .image-wrapper { aspect-ratio: 16/9; } 
                }

                /* ─── STRATEGY CARDS ─── */
                .blog-content-wrapper .strategies { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; margin-bottom: 24px; }
                .blog-content-wrapper .strategy-card { display: flex; gap: 20px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px 24px; margin-bottom: 0; }
                .blog-content-wrapper .strategy-card__tag { background: #0a0f1e; color: #6eb3ff; font-family: var(--font-sans), sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px; padding: 6px 12px; flex-shrink: 0; white-space: nowrap; margin-top: 2px; }
                .blog-content-wrapper .strategy-card__title { font-family: var(--font-sans), sans-serif; font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 5px; }
                .blog-content-wrapper .strategy-card__desc { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }

                /* ─── FEATURE PILLS ─── */
                .blog-content-wrapper .features { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 28px; margin-bottom: 24px; }
                .blog-content-wrapper .feature-card { background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px; border-top: 3px solid #1e6fff; margin-bottom: 0; }
                .blog-content-wrapper .feature-card__title { font-family: var(--font-sans), sans-serif; font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 7px; }
                .blog-content-wrapper .feature-card__desc { font-size: 14.5px; font-weight: 400; color: #4a5568; line-height: 1.65; margin-bottom: 0; }

                /* ─── VISION CARDS ─── */
                .blog-content-wrapper .vision { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; margin-bottom: 24px; }
                .blog-content-wrapper .vision-card { display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: flex-start; border: 1px solid #e4e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .vision-card__index { background: #0a0f1e; color: #6eb3ff; font-family: var(--font-display), serif; font-size: 18px; width: 52px; display: flex; align-items: flex-start; justify-content: center; padding-top: 22px; align-self: stretch; font-weight: 700; margin-bottom: 0; }
                .blog-content-wrapper .vision-card__body { padding: 20px 22px 20px 0; margin-bottom: 0; }
                .blog-content-wrapper .vision-card__title { font-family: var(--font-sans), sans-serif; font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 5px; }
                .blog-content-wrapper .vision-card__desc { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }
                .blog-content-wrapper .vision-card__example { margin-top: 10px; padding: 10px 14px; background: #f7f8fc; border-radius: 4px; font-size: 14px; font-weight: 400; color: #8492a6; line-height: 1.6; margin-bottom: 0; }
                .blog-content-wrapper .vision-card__example span { font-weight: 600; color: #4a5568; }

                /* ─── OTHER COMPONENTS ─── */
                .blog-content-wrapper .cap-list { margin-top: 24px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
                .blog-content-wrapper .cap-item { display: flex; gap: 14px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 10px; padding: 18px 20px; margin-bottom: 0; }
                .blog-content-wrapper .cap-item__icon { width: 32px; height: 32px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .cap-item__icon svg { width: 16px; height: 16px; }
                .blog-content-wrapper .cap-item__text { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }
                .blog-content-wrapper .cap-item__text strong { font-weight: 600; color: #0a0f1e; display: block; margin-bottom: 2px; font-size: 15px; }

                .blog-content-wrapper .challenge-block { margin-top: 48px; display: flex; flex-direction: column; gap: 40px; margin-bottom: 24px; }
                .blog-content-wrapper .challenge { border: 1px solid #e4e8f0; border-radius: 16px; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .challenge__header { background: #0a0f1e; padding: 20px 28px; display: flex; align-items: center; gap: 16px; position: relative; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .challenge__header::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
                .blog-content-wrapper .challenge__num { position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .challenge__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(18px, 2vw, 22px); font-weight: 600; color: #e8f0ff; line-height: 1.3; margin-bottom: 0; }
                .blog-content-wrapper .challenge__body { padding: 24px 28px; background: #ffffff; margin-bottom: 0; }
                .blog-content-wrapper .challenge__problem { font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.8; margin-bottom: 24px; }
                .blog-content-wrapper .solution-label { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #1e6fff; font-weight: 700; margin-bottom: 16px; display: block; }
                .blog-content-wrapper .challenge__solutions { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
                .blog-content-wrapper .solution-item { display: flex; gap: 12px; align-items: flex-start; font-size: 15.5px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }
                .blog-content-wrapper .solution-item::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 9px; }

                .blog-content-wrapper .highlights { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
                .blog-content-wrapper .highlight-card { display: flex; gap: 18px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 20px 22px; margin-bottom: 0; }
                .blog-content-wrapper .highlight-card__icon { width: 34px; height: 34px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .highlight-card__icon svg { width: 18px; height: 18px; }
                .blog-content-wrapper .highlight-card__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 6px; }
                .blog-content-wrapper .highlight-card__body { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }

                .blog-content-wrapper .thankyou { margin-top: 48px; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 24px; }
                .blog-content-wrapper .thankyou__title { font-family: var(--font-display), serif; font-size: 26px; font-weight: 700; color: #0a0f1e; margin-bottom: 16px; }
                .blog-content-wrapper .thankyou__body { font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.8; max-width: 500px; margin: 0 auto; }

                .blog-content-wrapper .ongoing { margin-top: 48px; border: 1px solid #e4e8f0; border-radius: 14px; padding: 32px 28px; background: #f7f8fc; margin-bottom: 24px; }
                .blog-content-wrapper .ongoing__title { font-family: var(--font-display), serif; font-size: 22px; font-weight: 700; color: #0a0f1e; margin-bottom: 20px; }
                .blog-content-wrapper .ongoing__list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 0; }
                .blog-content-wrapper .ongoing__item { display: flex; gap: 12px; align-items: flex-start; font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }
                .blog-content-wrapper .ongoing__item::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 9px; }

                .blog-content-wrapper .section-block { margin-top: 48px; display: flex; flex-direction: column; gap: 32px; margin-bottom: 24px; }
                .blog-content-wrapper .block-card { border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .block-card__header { display: flex; align-items: center; gap: 14px; padding: 20px 24px; background: #f7f8fc; border-bottom: 1px solid #e4e8f0; margin-bottom: 0; }
                .blog-content-wrapper .block-card__num { width: 32px; height: 32px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .block-card__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 0; }
                .blog-content-wrapper .block-card__body { padding: 20px 24px; background: #ffffff; margin-bottom: 0; }
                .blog-content-wrapper .block-card__body p { font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.8; margin-bottom: 0; }

                .blog-content-wrapper .tool-cards { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; margin-bottom: 0; }
                .blog-content-wrapper .tool-card { border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .tool-card__header { display: flex; align-items: center; gap: 14px; padding: 18px 24px; background: #f7f8fc; border-bottom: 1px solid #e4e8f0; margin-bottom: 0; }
                .blog-content-wrapper .tool-card__num { width: 30px; height: 30px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .tool-card__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 0; }
                .blog-content-wrapper .tool-card__body { padding: 20px 24px; font-size: 15.5px; font-weight: 400; color: #4a5568; line-height: 1.8; margin-bottom: 0; }

                .blog-content-wrapper .insight-grid { margin-top: 24px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 0; }
                .blog-content-wrapper .insight-item { display: flex; gap: 16px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 10px; padding: 18px 20px; position: relative; margin-bottom: 0; }
                .blog-content-wrapper .insight-item.compact { padding: 10px 20px 8px; }
                .blog-content-wrapper .insight-item.compact .insight-item__body { margin-bottom: 0 !important; line-height: 1.5; }
                .blog-content-wrapper .insight-item div { margin-bottom: 0 !important; }
                .blog-content-wrapper .insight-item__dot { display: none; }
                .blog-content-wrapper .insight-item__title { font-size: 17px; font-weight: 700; color: #0a0f1e; margin-bottom: 6px !important; }
                .blog-content-wrapper .insight-item__body { font-size: 15.5px; font-weight: 400; color: #4a5568; line-height: 1.75; margin-bottom: 0; }

                /* Large text for specific sections */
                .blog-content-wrapper .large-label { font-size: 1.25rem !important; font-weight: 700 !important; margin-bottom: 12px !important; display: block; }
                .blog-content-wrapper .large-list { font-size: 1.15rem !important; line-height: 1.6 !important; }
                .blog-content-wrapper .large-text { font-size: 1.15rem !important; line-height: 1.6 !important; }

                .blog-content-wrapper .quote-block { margin: 48px 0; background: #0a0f1e; border-radius: 16px; padding: 40px 48px; position: relative; overflow: hidden; text-align: center; }
                .blog-content-wrapper .quote-block::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.06) 1px, transparent 1px); background-size: 30px 30px; }
                .blog-content-wrapper .quote-block__mark { font-family: var(--font-display), serif; font-size: 80px; line-height: 1; color: rgba(30,111,255,.2); margin-bottom: -40px; }
                .blog-content-wrapper .quote-block__text { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(18px, 2.5vw, 22px); color: #e8f0ff; line-height: 1.5; margin-bottom: 24px; font-style: normal; font-weight: 600; }
                .blog-content-wrapper .quote-block__author { position: relative; z-index: 1; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: #6eb3ff; font-weight: 600; margin-bottom: 0; }
                
                /* ─── MILESTONES (Great Place to Work) ─── */
                .blog-content-wrapper .milestones { margin-top: 32px; display: flex; flex-direction: column; gap: 24px; margin-bottom: 0; }
                .blog-content-wrapper .milestone { display: flex; gap: 20px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px; margin-bottom: 0; }
                .blog-content-wrapper .milestone__icon { font-size: 28px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
                .blog-content-wrapper .milestone__title { font-size: 20px; font-weight: 700; color: #0a0f1e; margin-bottom: 10px; }
                .blog-content-wrapper .milestone__desc { font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.8; margin-bottom: 0; }

                .blog-content-wrapper .soc-benefit-card { display: flex; gap: 16px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 20px 22px; margin-bottom: 16px; }
                .blog-content-wrapper .soc-benefit-card__bar { width: 4px; height: 40px; background: #1e6fff; border-radius: 10px; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .soc-benefit-card__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 6px; }
                .blog-content-wrapper .soc-benefit-card__body { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }

                .blog-content-wrapper .gratitude { margin-top: 48px; border-top: 1px solid #e4e8f0; padding-top: 40px; text-align: center; margin-bottom: 0; }
                .blog-content-wrapper .gratitude__title { font-family: var(--font-display), serif; font-size: 30px; font-weight: 700; color: #0a0f1e; margin-bottom: 20px; }
                .blog-content-wrapper .gratitude__body { font-size: 16.5px; font-weight: 400; color: #4a5568; line-height: 1.9; max-width: 600px; margin: 0 auto; }

                .blog-content-wrapper .pillars { margin-top: 32px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 0; }
                .blog-content-wrapper .pillar { background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px 20px; text-align: center; margin-bottom: 0; }
                .blog-content-wrapper .pillar__icon { width: 40px; height: 40px; background: rgba(30,111,255,.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
                .blog-content-wrapper .pillar__icon svg { width: 20px; height: 20px; }
                .blog-content-wrapper .pillar__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 10px; }
                .blog-content-wrapper .pillar__body { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }

                .blog-content-wrapper .app-cards { margin-top: 32px; display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 0; }
                .blog-content-wrapper .app-card { border: 1px solid #e4e8f0; border-radius: 14px; background: #f7f8fc; padding: 24px; margin-bottom: 0; }
                .blog-content-wrapper .app-card__header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
                .blog-content-wrapper .app-card__num { width: 30px; height: 30px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .app-card__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 0; }
                .blog-content-wrapper .app-card__body { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.75; margin-bottom: 0; }

                .blog-content-wrapper .impact-items { margin-top: 32px; display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 0; }
                .blog-content-wrapper .impact-item { display: flex; gap: 16px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 20px 22px; margin-bottom: 0; }
                .blog-content-wrapper .impact-item__bar { width: 4px; height: 40px; background: #1e6fff; border-radius: 10px; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .impact-item__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 6px; }
                .blog-content-wrapper .impact-item__body { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }

                .blog-content-wrapper .contrast { margin-top: 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 0; }
                .blog-content-wrapper .contrast-card { border-radius: 16px; padding: 32px 28px; border: 1px solid #e4e8f0; margin-bottom: 0; }
                .blog-content-wrapper .contrast-card--light { background: #f7f8fc; }
                .blog-content-wrapper .contrast-card--dark { background: #0a0f1e; border-color: #0a0f1e; }
                .blog-content-wrapper .contrast-card__label { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #1e6fff; font-weight: 700; margin-bottom: 14px; display: block; }
                .blog-content-wrapper .contrast-card__title { font-family: var(--font-display), serif; font-size: 22px; font-weight: 700; color: #0a0f1e; margin-bottom: 14px; }
                .blog-content-wrapper .contrast-card--dark .contrast-card__title { color: #e8f0ff; }
                .blog-content-wrapper .contrast-card__body { font-size: 15.5px; font-weight: 400; color: #4a5568; line-height: 1.75; margin-bottom: 0; }
                .blog-content-wrapper .contrast-card--dark .contrast-card__body { color: rgba(200,220,245,.65); }

                .blog-content-wrapper .diff-cards { margin-top: 32px; display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 0; }
                .blog-content-wrapper .diff-card { border: 1px solid #e4e8f0; border-radius: 14px; background: #f7f8fc; padding: 24px; margin-bottom: 0; }
                .blog-content-wrapper .diff-card__header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
                .blog-content-wrapper .diff-card__icon { width: 34px; height: 34px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .diff-card__icon svg { width: 16px; height: 16px; }
                .blog-content-wrapper .diff-card__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 0; }
                .blog-content-wrapper .diff-card__body { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.75; margin-bottom: 0; }

                .blog-content-wrapper .values { margin-top: 32px; display: flex; flex-direction: column; gap: 14px; margin-bottom: 0; }

/* ─── INNOVATION CARDS ─── */
/* spell-checker:disable */
.blog-content-wrapper .innovations { margin-top: 32px; display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 0; }
.blog-content-wrapper .inno-card { border: 1px solid #e4e8f0; border-radius: 14px; background: #f7f8fc; padding: 24px; transition: all 0.3s ease; display: flex; gap: 14px; align-items: flex-start; margin-bottom: 0; }
.blog-content-wrapper .inno-card:hover { border-color: #1e90ff33; box-shadow: 0 8px 24px rgba(30,144,255,0.08); transform: translateY(-2px); }
.blog-content-wrapper .inno-card__num { width: 34px; height: 34px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
.blog-content-wrapper .inno-card__body { flex: 1; margin-bottom: 0; }
.blog-content-wrapper .inno-card__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 8px; line-height: 1.4; }
.blog-content-wrapper .inno-card__desc { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.75; margin-top: 4px; margin-bottom: 0; }
/* spell-checker:enable */
.blog-content-wrapper .value-card { display: flex; gap: 20px; align-items: flex-start; border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px; background: #f7f8fc; margin-bottom: 0; }
.blog-content-wrapper .value-card__num { width: 34px; height: 34px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
.blog-content-wrapper .value-card__title { font-size: 16px; font-weight: 600; color: #0a0f1e; margin-bottom: 6px; }
.blog-content-wrapper .value-card__body { font-size: 15px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }

.blog-content-wrapper .thankyou--dark { margin-top: 48px; background: #0a0f1e; border-radius: 16px; padding: 48px; text-align: center; position: relative; overflow: hidden; margin-bottom: 0; }
.blog-content-wrapper .thankyou--dark::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
.blog-content-wrapper .thankyou--dark__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: 26px; font-weight: 700; color: #e8f0ff; margin-bottom: 18px; }
.blog-content-wrapper .thankyou--dark__body { position: relative; z-index: 1; font-size: 16px; font-weight: 400; color: rgba(200,220,245,.7); line-height: 1.8; max-width: 500px; margin: 0 auto; }

                /* ─── CHALLENGE CARDS ─── */
                .blog-content-wrapper .challenges { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; margin-bottom: 0; }
                .blog-content-wrapper .challenge-card { border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; background: white; margin-bottom: 0; }
                .blog-content-wrapper .challenge-card__header { display: flex; align-items: center; gap: 16px; padding: 20px 24px; background: #0a0f1e; position: relative; overflow: hidden; margin-bottom: 0; }
                .blog-content-wrapper .challenge-card__header::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
                .blog-content-wrapper .challenge-card__num { position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-bottom: 0; }
                .blog-content-wrapper .challenge-card__title { position: relative; z-index: 1; font-family: var(--font-sans), sans-serif; font-size: clamp(18px, 2vw, 22px); font-weight: 600; color: #e8f0ff; line-height: 1.3; margin-bottom: 0; }
                .blog-content-wrapper .challenge-card__body { padding: 24px; background: white; margin-bottom: 0; }
                .blog-content-wrapper .challenge-row { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
                .blog-content-wrapper .challenge-row:last-child { margin-bottom: 0; }
                .blog-content-wrapper .challenge-row__label { font-size: 16px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #1e6fff; margin-bottom: 10px; display: block; }
                .blog-content-wrapper .challenge-row__text { font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }
                .blog-content-wrapper .banner__badge { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: white; border: 1px solid rgba(255,255,255,.3); border-radius: 100px; padding: 6px 16px; margin-bottom: 24px; }
                .blog-content-wrapper .stat-pill__icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; margin-bottom: 0; }
                .blog-content-wrapper .stat-pill__text { font-size: 14px; font-weight: 400; color: #4a5568; line-height: 1.6; margin-bottom: 0; }

                /* ─── STAT BOX FOR SOC 2 BLOG ─── */
                .blog-content-wrapper .stat-box { background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px; margin: 32px 0; display: flex; align-items: flex-start; gap: 16px; }
                .blog-content-wrapper .stat-box__icon { width: 40px; height: 40px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; margin-bottom: 0; }
                .blog-content-wrapper .stat-box__content { flex: 1; margin-bottom: 0; }
                .blog-content-wrapper .stat-box__text { font-size: 16px; font-weight: 400; color: #4a5568; line-height: 1.7; margin-bottom: 0; }

                 ` }} />

        </div>
    );
}
