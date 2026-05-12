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

export default function BlogDetailPage() {
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
                                <EyebrowButton href="/insights/blog">BLOG</EyebrowButton>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 text-[#1e90ff] mb-8 text-sm font-medium font-display">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20">
                                    <Tag className="w-3 h-3" />
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
                                            [&_svg]:w-9 [&_svg]:h-9
                                            [&_.use-cases]:mt-12 [&_.use-cases]:flex [&_.use-cases]:flex-col [&_.use-cases]:gap-7
                                            [&_.use-case]:border [&_.use-case]:border-[#e4e8f0] [&_.use-case]:rounded-[14px] [&_.use-case]:overflow-hidden [&_.use-case]:shadow-sm
                                            [&_.use-case__header]:flex [&_.use-case__header]:items-center [&_.use-case__header]:gap-3.5 [&_.use-case__header]:p-5 [&_.use-case__header]:bg-[#0a0f1e] [&_.use-case__header]:relative [&_.use-case__header]:overflow-hidden
                                            [&_.use-case__title]:relative [&_.use-case__title]:z-10 [&_.use-case__title]:font-serif [&_.use-case__title]:text-[clamp(15px,1.8vw,19px)] [&_.use-case__title]:font-normal [&_.use-case__title]:text-[#e8f0ff] [&_.use-case__title]:leading-[1.3]
                                            [&_.use-case__body]:bg-white
                                            [&_.use-case__row]:p-5 [&_.use-case__row]:border-b [&_.use-case__row]:border-[#e4e8f0]
                                            [&_.use-case__row-label]:text-[10px] [&_.use-case__row-label]:tracking-[2.5px] [&_.use-case__row-label]:uppercase [&_.use-case__row-label]:font-semibold [&_.use-case__row-label]:mb-2
                                            [&_.use-case__row-label--challenge]:text-[#8492a6]
                                            [&_.use-case__row-label--solution]:text-[#1e6fff]
                                            [&_.use-case__row-text]:text-[15px] [&_.use-case__row-text]:font-light [&_.use-case__row-text]:text-[#4a5568] [&_.use-case__row-text]:leading-[1.8]
                                            [&_.tool-cards]:mt-12 [&_.tool-cards]:flex [&_.tool-cards]:flex-col [&_.tool-cards]:gap-7
                                            [&_.tool-card]:border [&_.tool-card]:border-[#e4e8f0] [&_.tool-card]:rounded-[14px] [&_.tool-card]:overflow-hidden [&_.tool-card]:shadow-sm
                                            [&_.tool-card__header]:flex [&_.tool-card__header]:items-center [&_.tool-card__header]:gap-3.5 [&_.tool-card__header]:p-5 [&_.tool-card__header]:bg-[#0a0f1e] [&_.tool-card__header]:relative [&_.tool-card__header]:overflow-hidden
                                            [&_.tool-card__num]:relative [&_.tool-card__num]:z-10 [&_.tool-card__num]:w-9 [&_.tool-card__num]:h-9 [&_.tool-card__num]:rounded-[10px] [&_.tool-card__num]:bg-[rgba(30,111,255,0.25)] [&_.tool-card__num]:flex [&_.tool-card__num]:items-center [&_.tool-card__num]:justify-center [&_.tool-card__num]:flex-shrink-0 [&_.tool-card__num]:font-serif [&_.tool-card__num]:text-[clamp(15px,1.8vw,19px)] [&_.tool-card__num]:font-normal [&_.tool-card__num]:text-[#e8f0ff] [&_.tool-card__num]:leading-[1.3]
                                            [&_.tool-card__title]:relative [&_.tool-card__title]:z-10 [&_.tool-card__title]:font-serif [&_.tool-card__title]:text-[clamp(15px,1.8vw,19px)] [&_.tool-card__title]:font-normal [&_.tool-card__title]:text-[#e8f0ff] [&_.tool-card__title]:leading-[1.3]
                                            [&_.tool-card__body]:bg-white [&_.tool-card__body]:p-5 [&_.tool-card__body]:text-[15px] [&_.tool-card__body]:font-light [&_.tool-card__body]:text-[#4a5568] [&_.tool-card__body]:leading-[1.8]"
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

            <style suppressHydrationWarning dangerouslySetInnerHTML={{
                __html: `
                /* ─── GLOBAL STANDARDS ─── */
                p { font-size: 16px; font-weight: 300; color: #4a5568; line-height: 1.8; margin-bottom: 24px; }
                h2 { font-family: var(--font-display), serif; font-size: clamp(26px, 4vw, 36px); color: #0a0f1e; margin: 48px 0 24px; line-height: 1.2; font-weight: 700; }
                .hero-title em { font-style: normal; color: white !important; } /* Branding consistency for titles */
                .blog-content em { font-style: normal; color: inherit; } /* No italics in content as requested */
                strong { font-weight: 600; color: #0a0f1e; }
                .blog-content ul li::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 9px; }

                /* ─── CAPABILITY CARDS ─── */
                .capabilities { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
                .cap-card { border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px 28px; background: #f7f8fc; position: relative; overflow: hidden; }
                                .cap-card__title { font-family: var(--font-sans), sans-serif; font-size: 14px; font-weight: 600; color: #0a0f1e; margin-bottom: 8px; letter-spacing: .1px; }
                .cap-card__body { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.75; }

                /* ─── OUTCOME STRIP ─── */
                .outcomes { margin-top: 48px; background: #f7f8fc; border-radius: 12px; padding: 36px 32px; border: 1px solid #e4e8f0; }
                .outcomes__title { font-family: var(--font-display), serif; font-size: 18px; color: #0a0f1e; margin-bottom: 20px; }
                .outcomes__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
                .outcome-item { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.6; }
                .outcome-item__dot { width: 8px; height: 8px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 7px; }

                /* ─── PREMIUM FEATURE CARDS ─── */
                /* ─── PREMIUM FEATURE CARDS ─── */
                .feature-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 32px 0; }
                .feature-cards.vertical { display: flex; flex-direction: column; gap: 16px; }
                .feature-card { background: white; border: 1px solid #eef2f6; border-radius: 12px; padding: 24px; display: flex; align-items: flex-start; gap: 16px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border-top: 3px solid #1e6fff; }
                .feature-card:hover { border-color: #1e90ff66; box-shadow: 0 12px 32px rgba(30,144,255,0.12); transform: translateY(-2px); }
                .feature-card__dot { display: none; }
                .feature-card__content strong { display: block; font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 10px; }
                .feature-card__content p { font-size: 15.5px; font-weight: 300; color: #4b5563; line-height: 1.75; margin-bottom: 0 !important; }

                /* ─── MINI CTA (LinkedIn) ─── */
                .cta-mini { background: #f8fafc; padding: 20px 24px; border-radius: 0 12px 12px 0; margin-top: 40px; }
                .cta-mini p { margin-bottom: 0 !important; font-size: 15px; }
                
                @media (max-width: 768px) {
                    .pillars, .stats, .feature-cards, .trend-cards, .benefits, .contrast, .type-compare, .diff-cards { grid-template-columns: 1fr !important; }
                    .innovations { gap: 12px; }
                    /* spell-checker:disable */
                    .inno-card { padding: 20px; }
                    .inno-card__num { width: 28px; height: 28px; font-size: 12px; margin-bottom: 12px; }
                    .inno-card__body { gap: 12px; }
                    .inno-card__title { font-size: 14px; margin-bottom: 6px; }
                    .inno-card__desc { font-size: 13.5px; line-height: 1.6; }
                /* ─── COMPARE TABLES ─── */
                .compare { margin-top: 32px; border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 24px; }
                .compare__header { display: grid; grid-template-columns: 1fr 1fr 1fr; background: #0a0f1e; }
                .compare__header div { padding: 14px 20px; font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #6eb3ff; }
                .compare__header div:not(:last-child) { border-right: 1px solid rgba(255,255,255,.08); }
                .compare__row { display: grid; grid-template-columns: 1fr 1fr 1fr; border-top: 1px solid #e4e8f0; }
                .compare__row:nth-child(even) { background: #f7f8fc; }
                .compare__cell { padding: 16px 20px; font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.6; }
                .compare__cell:not(:last-child) { border-right: 1px solid #e4e8f0; }
                .compare__cell--label { font-weight: 500; color: #0a0f1e; }
                .compare__cell--positive { color: #1e6fff; }

                /* ─── JOURNEY STEPS ─── */
                .journey { margin-top: 32px; display: flex; flex-direction: column; gap: 0; position: relative; margin-bottom: 24px; }
                .journey::before { content: ''; position: absolute; left: 19px; top: 24px; bottom: 24px; width: 2px; background: linear-gradient(to bottom, #1e6fff, rgba(30,111,255,.15)); }
                .journey-step { display: flex; gap: 20px; align-items: flex-start; padding: 0 0 28px; position: relative; }
                .journey-step:last-child { padding-bottom: 0; }
                .journey-step__num { width: 40px; height: 40px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; z-index: 1; }
                .journey-step__content { padding-top: 8px; }
                .journey-step__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 6px; }
                .journey-step__body { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.75; }

                /* ─── STATS STRIP ─── */
                .stats { margin-top: 48px; background: #0a0f1e; border-radius: 14px; padding: 40px 36px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; position: relative; overflow: hidden; margin-bottom: 24px; }
                .stats::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 36px 36px; }
                .stat { position: relative; z-index: 1; text-align: center; }
                .stat__value { font-family: var(--font-display), serif; font-size: clamp(28px, 3.5vw, 40px); color: #6eb3ff; line-height: 1; margin-bottom: 8px; }
                .stat__label { font-size: 13px; font-weight: 300; color: rgba(200,220,245,.65); line-height: 1.5; }

                /* ─── BENEFITS GRID ─── */
                .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 28px; margin-bottom: 24px; }
                .benefit-card { background: var(--surface, #f7f8fc); border: 1px solid var(--border, #e4e8f0); border-radius: 12px; padding: 24px 22px; }
                .benefit-card__label { font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--blue, #1e6fff); margin-bottom: 8px; }
                .benefit-card__desc { font-size: 15px; font-weight: 300; color: var(--sub, #4a5568); line-height: 1.8; }

                /* ─── TREND CARDS ─── */
                .trends { margin-top: 40px; display: flex; flex-direction: column; gap: 24px; margin-bottom: 24px; }
                .trend-card { border: 1px solid var(--border, #e4e8f0); border-radius: 14px; overflow: hidden; }
                .trend-card__header { display: flex; align-items: center; gap: 14px; padding: 20px 24px; background: var(--ink, #0a0f1e); position: relative; overflow: hidden; }
                .trend-card__header::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
                .trend-card__icon { position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 10px; background: rgba(30,111,255,.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .trend-card__icon svg { width: 18px; height: 18px; }
                .trend-card__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(17px, 2vw, 22px); font-weight: 600; color: #ffffff; line-height: 1.3; }
                .trend-card__body { background: var(--white, #ffffff); }
                .trend-card__row { padding: 18px 24px; border-bottom: 1px solid var(--border, #e4e8f0); }
                .trend-card__row:last-child { border-bottom: none; }
                .trend-card__row-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 8px; }
                .trend-card__row-label--trend { color: #1e6fff; font-weight: 700; }
                .trend-card__row-label--hyniva { color: #1e6fff; font-weight: 700; }
                .trend-card__row-text { font-size: 15px; font-weight: 300; color: var(--sub, #4a5568); line-height: 1.8; }

                /* ─── STAT CARDS ─── */
                .stat-card { background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px; }
                .stat-card__number { font-family: var(--font-display), serif; font-size: 32px; color: #1e6fff; margin-bottom: 8px; }
                .stat-card__label { font-size: 13px; font-weight: 300; color: #4a5568; line-height: 1.5; }

                /* ─── PULLQUOTE ─── */
                .pullquote { margin: 40px 0; padding: 8px 32px; margin-bottom: 24px; }
                .pullquote__text { font-family: var(--font-display), serif; font-size: 20px; font-style: normal; color: #0a0f1e; line-height: 1.5; }

                /* ─── STRATEGY CARDS ─── */
                .strategies { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; margin-bottom: 24px; }
                .strategy-card { display: flex; gap: 20px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px 24px; }
                .strategy-card__tag { background: #0a0f1e; color: #6eb3ff; font-family: var(--font-sans), sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px; padding: 6px 12px; flex-shrink: 0; white-space: nowrap; margin-top: 2px; }
                .strategy-card__title { font-family: var(--font-sans), sans-serif; font-size: 15px; font-weight: 500; color: #0a0f1e; margin-bottom: 5px; }
                .strategy-card__desc { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                /* ─── FEATURE PILLS ─── */
                .features { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 28px; margin-bottom: 24px; }
                .feature-card { background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px; border-top: 3px solid #1e6fff; }
                .feature-card__title { font-family: var(--font-sans), sans-serif; font-size: 14px; font-weight: 500; color: #0a0f1e; margin-bottom: 7px; }
                .feature-card__desc { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.65; }

                /* ─── VISION CARDS ─── */
                .vision { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; margin-bottom: 24px; }
                .vision-card { display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: flex-start; border: 1px solid #e4e8f0; border-radius: 12px; overflow: hidden; }
                .vision-card__index { background: #0a0f1e; color: #6eb3ff; font-family: var(--font-display), serif; font-size: 18px; width: 52px; display: flex; align-items: flex-start; justify-content: center; padding-top: 22px; align-self: stretch; }
                .vision-card__body { padding: 20px 22px 20px 0; }
                .vision-card__title { font-family: var(--font-sans), sans-serif; font-size: 15px; font-weight: 500; color: #0a0f1e; margin-bottom: 5px; }
                .vision-card__desc { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .vision-card__example { margin-top: 10px; padding: 10px 14px; background: #f7f8fc; border-radius: 4px; font-size: 13.5px; font-weight: 300; color: #8492a6; line-height: 1.6; }
                .vision-card__example span { font-weight: 500; color: #4a5568; }

                /* ─── OTHER COMPONENTS ─── */
                .cap-list { margin-top: 24px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
                .cap-item { display: flex; gap: 14px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 10px; padding: 18px 20px; }
                .cap-item__icon { width: 32px; height: 32px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .cap-item__icon svg { width: 16px; height: 16px; }
                .cap-item__text { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .cap-item__text strong { font-weight: 600; color: #0a0f1e; display: block; margin-bottom: 2px; font-size: 14px; }

                .challenge-block { margin-top: 48px; display: flex; flex-direction: column; gap: 40px; margin-bottom: 24px; }
                .challenge { border: 1px solid #e4e8f0; border-radius: 16px; overflow: hidden; }
                .challenge__header { background: #0a0f1e; padding: 20px 28px; display: flex; align-items: center; gap: 16px; position: relative; overflow: hidden; }
                .challenge__header::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
                .challenge__num { position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .challenge__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(16px, 2vw, 20px); font-weight: 400; color: #e8f0ff; line-height: 1.3; }
                .challenge__body { padding: 24px 28px; background: #ffffff; }
                .challenge__problem { font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.8; margin-bottom: 20px; }
                .solution-label { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #1e6fff; font-weight: 700; margin-bottom: 12px; display: block; }
                .challenge__solutions { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
                .solution-item { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .solution-item::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 9px; }

                .highlights { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
                .highlight-card { display: flex; gap: 18px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 20px 22px; }
                .highlight-card__icon { width: 34px; height: 34px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .highlight-card__icon svg { width: 18px; height: 18px; }
                .highlight-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 4px; }
                .highlight-card__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                .thankyou { margin-top: 48px; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 24px; }
                .thankyou__title { font-family: var(--font-display), serif; font-size: 24px; color: #0a0f1e; margin-bottom: 12px; }
                .thankyou__body { font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.8; max-width: 500px; margin: 0 auto; }

                .ongoing { margin-top: 48px; border: 1px solid #e4e8f0; border-radius: 14px; padding: 32px 28px; background: #f7f8fc; margin-bottom: 24px; }
                .ongoing__title { font-family: var(--font-display), serif; font-size: 20px; color: #0a0f1e; margin-bottom: 18px; }
                .ongoing__list { display: flex; flex-direction: column; gap: 10px; }
                .ongoing__item { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .ongoing__item::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 9px; }

                .section-block { margin-top: 48px; display: flex; flex-direction: column; gap: 32px; margin-bottom: 24px; }
                .block-card { border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; }
                .block-card__header { display: flex; align-items: center; gap: 14px; padding: 20px 24px; background: #f7f8fc; border-bottom: 1px solid #e4e8f0; }
                .block-card__num { width: 32px; height: 32px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .block-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; }
                .block-card__body { padding: 20px 24px; background: #ffffff; }
                .block-card__body p { font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.8; }

                .tool-cards { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
                .tool-card { border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; }
                .tool-card__header { display: flex; align-items: center; gap: 14px; padding: 18px 24px; background: #f7f8fc; border-bottom: 1px solid #e4e8f0; }
                .tool-card__num { width: 30px; height: 30px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .tool-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; }
                .tool-card__body { padding: 20px 24px; font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.8; }

                .insight-grid { margin-top: 24px; display: flex; flex-direction: column; gap: 12px; }
                .insight-item { display: flex; gap: 16px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 10px; padding: 18px 20px; position: relative; }
                .insight-item.compact { padding: 10px 20px 8px; }
                .insight-item.compact .insight-item__body { margin-bottom: 0 !important; line-height: 1.5; }
                .insight-item div { margin-bottom: 0 !important; }
                .insight-item__dot { display: none; }
                .insight-item__title { font-size: 17px; font-weight: 700; color: #0a0f1e; margin-bottom: 4px !important; }
                .insight-item__body { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.75; }

                /* Large text for specific sections */
                .large-label { font-size: 1.25rem !important; font-weight: 700 !important; margin-bottom: 12px !important; display: block; }
                .large-list { font-size: 1.15rem !important; line-height: 1.6 !important; }
                .large-text { font-size: 1.15rem !important; line-height: 1.6 !important; }

                .highlights { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }
                .highlight-card { display: flex; gap: 18px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 20px 22px; }
                .highlight-card__icon { width: 34px; height: 34px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .highlight-card__icon svg { width: 18px; height: 18px; }
                .highlight-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 4px; }
                .highlight-card__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                .quote-block { margin: 48px 0; background: #0a0f1e; border-radius: 16px; padding: 40px 48px; position: relative; overflow: hidden; text-align: center; }
                .quote-block::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.06) 1px, transparent 1px); background-size: 30px 30px; }
                .quote-block__mark { font-family: var(--font-display), serif; font-size: 80px; line-height: 1; color: rgba(30,111,255,.2); margin-bottom: -40px; }
                .quote-block__text { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(18px, 2.5vw, 22px); color: #e8f0ff; line-height: 1.5; margin-bottom: 20px; font-style: normal; }
                .quote-block__author { position: relative; z-index: 1; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #6eb3ff; font-weight: 500; }
                
                /* ─── MILESTONES (Great Place to Work) ─── */
                .milestones { margin-top: 32px; display: flex; flex-direction: column; gap: 24px; }
                .milestone { display: flex; gap: 20px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px; }
                .milestone__icon { display: none; }
                .milestone__title { font-size: 20px; font-weight: 700; color: #0a0f1e; margin-bottom: 8px; }
                .milestone__desc { font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.8; }

                .thankyou { margin-top: 48px; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 16px; padding: 40px; text-align: center; }
                .thankyou__icon { font-size: 32px; margin-bottom: 16px; }
                .thankyou__title { font-family: var(--font-display), serif; font-size: 24px; color: #0a0f1e; margin-bottom: 12px; }
                .thankyou__body { font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.8; max-width: 500px; margin: 0 auto; }

                .soc-benefit-card { display: flex; gap: 16px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 20px 22px; margin-bottom: 12px; }
                .soc-benefit-card__bar { width: 4px; height: 40px; background: #1e6fff; border-radius: 10px; flex-shrink: 0; }
                .soc-benefit-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 4px; }
                .soc-benefit-card__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                .gratitude { margin-top: 48px; border-top: 1px solid #e4e8f0; padding-top: 40px; text-align: center; }
                .gratitude__title { font-family: var(--font-display), serif; font-size: 28px; color: #0a0f1e; margin-bottom: 16px; }
                .gratitude__body { font-size: 16px; font-weight: 300; color: #4a5568; line-height: 1.9; max-width: 600px; margin: 0 auto; }

                .pillars { margin-top: 32px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
                .pillar { background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px 20px; text-align: center; }
                .pillar__icon { width: 40px; height: 40px; background: rgba(30,111,255,.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
                .pillar__icon svg { width: 20px; height: 20px; }
                .pillar__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 8px; }
                .pillar__body { font-size: 14px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                .app-cards { margin-top: 32px; display: grid; grid-template-columns: 1fr; gap: 16px; }
                .app-card { border: 1px solid #e4e8f0; border-radius: 14px; background: #f7f8fc; padding: 24px; }
                .app-card__header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
                .app-card__num { width: 28px; height: 28px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .app-card__title { font-size: 15.5px; font-weight: 600; color: #0a0f1e; }
                .app-card__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.75; }

                .impact-items { margin-top: 32px; display: grid; grid-template-columns: 1fr; gap: 16px; }
                .impact-item { display: flex; gap: 16px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 20px 22px; }
                .impact-item__bar { width: 4px; height: 40px; background: #1e6fff; border-radius: 10px; flex-shrink: 0; }
                .impact-item__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 4px; }
                .impact-item__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                .contrast { margin-top: 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .contrast-card { border-radius: 16px; padding: 32px 28px; border: 1px solid #e4e8f0; }
                .contrast-card--light { background: #f7f8fc; }
                .contrast-card--dark { background: #0a0f1e; border-color: #0a0f1e; }
                .contrast-card__label { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #1e6fff; font-weight: 700; margin-bottom: 12px; display: block; }
                .contrast-card__title { font-family: var(--font-display), serif; font-size: 20px; color: #0a0f1e; margin-bottom: 12px; }
                .contrast-card--dark .contrast-card__title { color: #e8f0ff; }
                .contrast-card__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.75; }
                .contrast-card--dark .contrast-card__body { color: rgba(200,220,245,.65); }

                .diff-cards { margin-top: 32px; display: grid; grid-template-columns: 1fr; gap: 16px; }
                .diff-card { border: 1px solid #e4e8f0; border-radius: 14px; background: #f7f8fc; padding: 24px; }
                .diff-card__header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
                .diff-card__icon { width: 34px; height: 34px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .diff-card__icon svg { width: 16px; height: 16px; }
                .diff-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; }
                .diff-card__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.75; }

                .values { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }

/* ─── INNOVATION CARDS ─── */
/* spell-checker:disable */
.innovations { margin-top: 32px; display: grid; grid-template-columns: 1fr; gap: 16px; }
.inno-card { border: 1px solid #e4e8f0; border-radius: 14px; background: #f7f8fc; padding: 24px; transition: all 0.3s ease; display: flex; gap: 12px; align-items: flex-start; }
.inno-card:hover { border-color: #1e90ff33; box-shadow: 0 8px 24px rgba(30,144,255,0.08); transform: translateY(-2px); }
.inno-card__num { display: none; }
.inno-card__body { flex: 1; }
.inno-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 8px; line-height: 1.4; }
.inno-card__desc { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.75; margin-top: 4px; }
/* spell-checker:enable */
.value-card { display: flex; gap: 20px; align-items: flex-start; border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px; background: #f7f8fc; }
.value-card__num { width: 34px; height: 34px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.value-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 4px; }
.value-card__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.7; }

.thankyou--dark { margin-top: 48px; background: #0a0f1e; border-radius: 16px; padding: 48px; text-align: center; position: relative; overflow: hidden; }
.thankyou--dark::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
.thankyou--dark__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: 24px; color: #e8f0ff; margin-bottom: 14px; }
.thankyou--dark__body { position: relative; z-index: 1; font-size: 15.5px; font-weight: 300; color: rgba(200,220,245,.7); line-height: 1.8; max-width: 500px; margin: 0 auto; }

                /* ─── CHALLENGE CARDS ─── */
                .challenges { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
                .challenge-card { border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; background: white; }
                .challenge-card__header { display: flex; align-items: center; gap: 16px; padding: 20px 24px; background: #0a0f1e; position: relative; overflow: hidden; }
                .challenge-card__header::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
                .challenge-card__num { position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .challenge-card__title { position: relative; z-index: 1; font-family: var(--font-sans), sans-serif; font-size: clamp(16px, 2vw, 20px); font-weight: 600; color: #e8f0ff; line-height: 1.3; }
                .challenge-card__body { padding: 24px; background: white; }
                .challenge-row { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
                .challenge-row:last-child { margin-bottom: 0; }
                .challenge-row__label { font-size: 16px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #1e6fff; margin-bottom: 8px; display: block; }
                .challenge-row__text { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .stat-pill { display: inline-flex; align-items: flex-start; gap: 10px; background: rgba(30,111,255,.05); border: 1px solid rgba(30,111,255,.18); border-radius: 10px; padding: 12px 16px; margin-top: 8px; }
                .stat-pill__icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; }
                .stat-pill__text { font-size: 13.5px; font-weight: 300; color: #4a5568; line-height: 1.6; }

                /* ─── STAT BOX FOR SOC 2 BLOG ─── */
                .stat-box { background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px; margin: 32px 0; display: flex; align-items: flex-start; gap: 16px; }
                .stat-box__icon { width: 40px; height: 40px; background: rgba(30,111,255,.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; }
                .stat-box__content { flex: 1; }
                .stat-box__text { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                /* ─── CTA ─── */
                .cta { margin-top: 72px; background: #0a0f1e; border-radius: 16px; padding: 52px 48px; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; position: relative; overflow: hidden; }
                .cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 36px 36px; }
                .cta__text { position: relative; z-index: 1; text-align: left; }
                .cta__kicker { font-family: var(--font-sans), sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #6eb3ff; margin-bottom: 10px; }
                .cta__heading { font-family: var(--font-display), serif; font-size: clamp(20px, 2.4vw, 27px); color: #eef4ff; line-height: 1.25; margin-bottom: 8px; }
                .cta__sub { font-family: var(--font-sans), sans-serif; font-size: 14px; font-weight: 300; color: rgba(200,220,245,.6); }
                .cta__btn { position: relative; z-index: 1; display: inline-block; padding: 14px 30px; background: #1e6fff; color: #fff; font-family: var(--font-sans), sans-serif; font-size: 14px; font-weight: 500; border-radius: 8px; text-decoration: none; transition: all .2s; white-space: nowrap; }
                .cta__btn:hover { background: #1a5fe0; box-shadow: 0 0 28px rgba(30,111,255,.4); transform: translateY(-2px); }
                                @media (max-width: 768px) { .cta { padding: 36px 24px; flex-direction: column; text-align: center; } .cta__text { text-align: center; } }
                ` }} />
        </div>
    );
}
