"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogDetails, BlogDetail } from "@/content/blog-details";
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
                <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory"
                    ref={containerRef}
                >
                    {related.map((post, idx) => (
                        <div
                            key={idx}
                            className="group flex-shrink-0 w-full sm:w-[calc(33.333%-16px)] bg-white rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-lg hover:border-[#1e90ff]/20 transition-all duration-300 snap-start flex flex-col justify-between"
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
                            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
                                        <Clock className="w-3.5 h-3.5" />
                                        {post.date}
                                    </div>
                                    <h5
                                        className="text-base sm:text-lg font-bold text-[#030B3B] leading-snug line-clamp-2 min-h-[2.8em] mb-4 group-hover:text-[#1e90ff] transition-colors flex items-start"
                                        dangerouslySetInnerHTML={{ __html: post.title }}
                                    />
                                </div>
                                <Link
                                    href={post.href}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e90ff] text-white text-sm font-semibold rounded-lg hover:bg-[#0077e6] transition-colors shadow-sm hover:shadow-md w-fit mt-auto"
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
    const post = blogDetails[slug as keyof typeof blogDetails] as BlogDetail;

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
                                <EyebrowButton href="/insights/news">NEWS</EyebrowButton>
                            </motion.div>

                            {!post.bannerBadge && (
                                <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 text-white mb-8 text-sm font-normal">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[#1e90ff]" />
                                        {post.date}
                                    </div>
                                    {/* Tag removed per user request */}
                                </motion.div>
                            )}

                            <motion.h1
                                variants={fadeInUp}
                                className="hero-title text-[26px] sm:text-[34px] lg:text-[44px] font-[900] font-display text-white tracking-tight leading-[1.15] mb-6 px-4 sm:px-8 max-w-[1150px] mx-auto"
                                style={{ textTransform: 'none', fontFamily: 'var(--font-display), serif' }}
                                dangerouslySetInnerHTML={{ __html: post.title }}
                            />
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
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {section.title && (
                                            <div className="mb-8">
                                                <h2 className="text-2xl sm:text-[26px] font-bold text-[#0a0f1e] leading-[1.2] text-left font-display">{section.title}</h2>
                                            </div>
                                        )}

                                        {mounted ? (
                                            <div
                                                className="blog-content font-sans text-[16px] font-normal leading-[1.8] text-[#374151] text-left"
                                                dangerouslySetInnerHTML={{ __html: section.content }}
                                            />
                                        ) : (
                                            <div className="min-h-[40px]" />
                                        )}
                                    </motion.div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <RelatedNews currentSlug={slug} currentTag={post?.tag || ""} />

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                /* ─── GLOBAL STANDARDS (Scoped to Article Content) ─── */
                .blog-content p { font-size: 16.5px; font-weight: 300; color: #4a5568; line-height: 1.9; margin-bottom: 24px; }
                .blog-content h2 { font-family: var(--font-display), serif; font-size: clamp(20px, 2.4vw, 26px); color: #0a0f1e; margin: 52px 0 16px; line-height: 1.3; font-weight: 400; }
                .hero-title em { font-style: normal; color: white !important; } 
                .blog-content em { font-style: italic; color: #1e6fff; }
                .blog-content strong { font-weight: 600; color: #0a0f1e; }
                .blog-content ul { margin-top: 14px; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
                .blog-content ul li { display: flex; gap: 14px; align-items: flex-start; font-size: 16px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .blog-content ul li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 9px; }

                /* ─── LISTEN CARDS ─── */
                .listen-cards { margin-top: 24px; display: flex; flex-direction: column; gap: 12px; }
                .listen-card { display: flex; align-items: center; gap: 16px; border: 1px solid #e4e8f0; border-radius: 12px; padding: 18px 22px; background: #f7f8fc; text-decoration: none; transition: border-color .2s, box-shadow .2s; }
                .listen-card:hover { border-color: rgba(30,111,255,.3); box-shadow: 0 4px 20px rgba(30,111,255,.07); }
                .listen-card__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .listen-card__icon--yt { background: rgba(255,0,0,.1); }
                .listen-card__icon--sp { background: rgba(29,185,84,.1); }
                .listen-card__icon--ap { background: rgba(150,90,255,.1); }
                .listen-card__icon svg { width: 22px; height: 22px; }
                .listen-card__platform { font-size: 13.5px; font-weight: 600; color: #0a0f1e; margin-bottom: 2px; text-align: left; }
                .listen-card__label { font-size: 13px; font-weight: 300; color: #4a5568; text-align: left; }
                .listen-card__arrow { margin-left: auto; flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: rgba(30,111,255,.08); border: 1px solid rgba(30,111,255,.18); display: flex; align-items: center; justify-content: center; }
                .listen-card__arrow svg { width: 13px; height: 13px; }

                /* ─── BANNER COMPONENTS ─── */
                .banner__badge { display: inline-block; font-size: 10px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; color: white; border: 1px solid rgba(255,255,255,.3); border-radius: 100px; padding: 6px 16px; margin-bottom: 24px; }

                /* ─── TRUST CRITERIA ─── */
                .criteria { margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; }
                .criterion { display: flex; align-items: center; gap: 8px; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 100px; padding: 8px 16px; font-size: 13.5px; font-weight: 400; color: #1c2535; }
                .criterion__dot { width: 7px; height: 7px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; }

                /* ─── TYPE COMPARISON ─── */
                .type-compare { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
                .type-card { border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px 22px; background: #f7f8fc; }
                .type-card--active { border-color: rgba(30,111,255,.35); background: rgba(30,111,255,.04); }
                .type-card__label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #1e6fff; font-weight: 500; margin-bottom: 10px; }
                .type-card__title { font-family: var(--font-display), serif; font-size: 18px; color: #0a0f1e; margin-bottom: 10px; }
                .type-card__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                /* ─── PROCESS STEPS ─── */
                .process { margin-top: 24px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
                .process-step { display: flex; gap: 16px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 20px 22px; }
                .process-step__icon { width: 36px; height: 36px; border-radius: 9px; background: rgba(30,111,255,.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .process-step__icon svg { width: 16px; height: 16px; }
                .process-step__title { font-size: 14px; font-weight: 600; color: #0a0f1e; margin-bottom: 4px; }
                .process-step__body { font-size: 14.5px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                /* ─── BENEFITS GRID ─── */
                .benefits { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
                @media (max-width: 768px) { .benefits { grid-template-columns: 1fr; } }
                .benefit { border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px 20px; background: #f7f8fc; }
                .benefit__title { font-size: 14px; font-weight: 600; color: #0a0f1e; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
                .benefit__body { font-size: 14px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                .benefit-card { display: flex; gap: 20px; align-items: flex-start; border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px 22px; background: #f7f8fc; }
                .benefit-card__bar { width: 4px; background: #1e6fff; border-radius: 2px; flex-shrink: 0; align-self: stretch; }
                .benefit-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 5px; }
                .benefit-card__body { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.75; }

                /* ─── HIGHLIGHT CARDS ─── */
                .highlights { margin-top: 40px; display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
                .highlight-card { display: flex; gap: 20px; align-items: flex-start; border: 1px solid #e4e8f0; border-radius: 14px; padding: 24px 24px; background: #f7f8fc; }
                .highlight-card__icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(30,111,255,.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .highlight-card__icon svg { width: 20px; height: 20px; }
                .highlight-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 6px; }
                .highlight-card__body { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.75; }

                /* ─── MILESTONE CARDS ─── */
                .milestones { display: flex; flex-direction: column; gap: 16px; margin-top: 28px; margin-bottom: 24px; }
                .milestone { display: flex; gap: 24px; align-items: flex-start; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px 28px; }
                .milestone__icon { font-size: 28px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
                .milestone__title { font-size: 15px; font-weight: 500; color: #1c2535; margin-bottom: 6px; }
                .milestone__desc { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }

                /* ─── PILLARS ─── */
                .pillars { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 24px; }
                .pillar { border: 1px solid #e4e8f0; border-radius: 12px; padding: 24px 20px; background: #f7f8fc; text-align: center; }
                .pillar__icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(30,111,255,.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; flex-shrink: 0; }
                .pillar__icon svg { width: 20px; height: 20px; }
                .pillar__title { font-size: 14px; font-weight: 600; color: #0a0f1e; margin-bottom: 6px; }
                .pillar__body { font-size: 13.5px; font-weight: 300; color: #4a5568; line-height: 1.65; }

                /* ─── VALUE CARDS ─── */
                .values { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
                .value-card { display: flex; gap: 20px; align-items: flex-start; border: 1px solid #e4e8f0; border-radius: 12px; padding: 22px 22px; background: #f7f8fc; }
                .value-card__num { width: 34px; height: 34px; border-radius: 50%; background: #1e6fff; color: #fff; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .value-card__title { font-size: 15px; font-weight: 600; color: #0a0f1e; margin-bottom: 5px; }
                .value-card__body { font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.75; }

                /* ─── PULLQUOTE ─── */
                .pullquote { margin: 40px 0; padding: 4px 0 4px 32px; margin-bottom: 32px; border-left: 4px solid #1e90ff; }
                .pullquote__text { font-family: var(--font-display), serif; font-size: 18px; font-style: normal; color: #0a0f1e; line-height: 1.6; }

                /* ─── IMAGE GRID ─── */
                .image-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 48px 0; width: 100%; }
                .image-wrapper { border-radius: 16px; overflow: hidden; box-shadow: 0 4px 25px rgba(0,0,0,0.06); background: #f8fafc; aspect-ratio: 1/1; position: relative; width: 100%; }
                .image-wrapper img { width: 100%; height: 100%; display: block; object-fit: cover; }
                @media (max-width: 768px) { 
                    .image-grid { grid-template-columns: 1fr; gap: 16px; } 
                    .image-wrapper { aspect-ratio: 4/3; }
                }

                .quote-block { margin-top: 48px; background: #0a0f1e; border-radius: 14px; padding: 40px 36px; position: relative; overflow: hidden; margin-bottom: 24px; }
                .quote-block::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 28px 28px; }
                .quote-block__mark { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: 64px; color: #1e6fff; line-height: .8; margin-bottom: 12px; opacity: .6; }
                .quote-block__text { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(17px, 2.2vw, 22px); font-style: italic; color: #c8d9f5; line-height: 1.55; margin-bottom: 20px; }
                .quote-block__author { position: relative; z-index: 1; font-size: 13px; font-weight: 500; color: #6eb3ff; letter-spacing: .3px; }

                /* ─── THANK YOU & ONGOING STRIPS ─── */
                .thankyou { margin-top: 48px; background: #f7f8fc; border: 1px solid #e4e8f0; border-radius: 14px; padding: 48px 36px; position: relative; overflow: hidden; text-align: center; margin-bottom: 24px; }
                .thankyou__icon { font-size: 32px; margin-bottom: 16px; position: relative; z-index: 1; }
                .thankyou__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(20px, 2.4vw, 24px); color: #0a0f1e; margin-bottom: 14px; font-weight: 500; }
                .thankyou__body { position: relative; z-index: 1; font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.8; max-width: 580px; margin: 0 auto; }

                .ongoing { margin-top: 48px; border: 1px solid #e4e8f0; border-radius: 14px; padding: 32px 28px; background: #f7f8fc; margin-bottom: 24px; }
                .ongoing__title { font-family: var(--font-display), serif; font-size: 20px; color: #0a0f1e; margin-bottom: 18px; }
                .ongoing__list { display: flex; flex-direction: column; gap: 10px; }
                .ongoing__item { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .ongoing__item::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 9px; }

                /* ─── CTA ─── */
                .cta { margin-top: 72px; background: #0a0f1e; border-radius: 16px; padding: 52px 48px; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; position: relative; overflow: hidden; }
                .cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px); background-size: 36px 36px; }
                .cta__text { position: relative; z-index: 1; text-align: left; }
                .cta__kicker { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #6eb3ff; margin-bottom: 10px; }
                .cta__heading { font-family: var(--font-display), serif; font-size: clamp(20px, 2.4vw, 27px); color: #eef4ff; line-height: 1.25; margin-bottom: 8px; }
                .cta__sub { font-size: 14px; font-weight: 300; color: rgba(200,220,245,.6); }
                .cta__btn { position: relative; z-index: 1; display: inline-block; padding: 14px 30px; background: #1e6fff; color: #fff; font-size: 14px; font-weight: 500; border-radius: 8px; text-decoration: none; transition: all .2s; white-space: nowrap; }
                .cta__btn:hover { background: #1a5fe0; box-shadow: 0 0 28px rgba(30,111,255,.4); transform: translateY(-2px); }

                /* ─── DAY CARDS ─── */
                .day-card { border: 1px solid #e4e8f0; border-radius: 14px; overflow: hidden; margin-top: 32px; }
                .day-card__header { background: #f8fafc; padding: 18px 24px; display: flex; align-items: center; gap: 14px; position: relative; overflow: hidden; border-bottom: 1px solid #e4e8f0; }
                .day-card__header::before { display: none; }
                .day-card__badge { position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 50%; background: rgba(30,111,255,.12); border: 1.5px solid rgba(30,111,255,.3); color: #1e6fff; font-size: 12px; font-weight: 700; letter-spacing: .3px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .day-card__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(16px, 2vw, 20px); font-weight: 600; color: #0a0f1e; }
                .day-card__body { padding: 22px 24px; background: #ffffff; }
                .day-card__body p { font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.85; margin-bottom: 16px; }
                .day-card__body ul { padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 9px; }
                .day-card__body ul li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .day-card__body ul li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 8px; }

                /* ─── AIRA BLOCK ─── */
                .aira-block { margin-top: 32px; border: 1px solid rgba(30,111,255,.25); border-radius: 14px; overflow: hidden; }
                .aira-block__header { background: #0a0f1e; padding: 24px 28px; position: relative; overflow: hidden; }
                .aira-block__header::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(30,111,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.08) 1px, transparent 1px); background-size: 24px 24px; }
                .aira-block__orb { position: absolute; width: 320px; height: 320px; border-radius: 50%; background: rgba(30,111,255,.18); filter: blur(70px); top: -130px; right: -70px; pointer-events: none; }
                .aira-block__title { position: relative; z-index: 1; font-family: var(--font-display), serif; font-size: clamp(17px, 2.2vw, 21px); font-weight: 400; color: #e8f0ff; line-height: 1.3; }
                .aira-block__sub { position: relative; z-index: 1; font-size: 14px; font-weight: 300; color: rgba(200,220,245,.65); line-height: 1.65; margin-top: 6px; }
                .aira-block__body { padding: 20px 28px; background: #ffffff; }
                .aira-block__body p { font-size: 15.5px; font-weight: 300; color: #4a5568; line-height: 1.85; margin-bottom: 16px; }
                .aira-block__link { display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 500; color: #1e6fff; text-decoration: underline; text-underline-offset: 3px; margin-bottom: 18px; transition: opacity .2s; }
                .aira-block__link:hover { opacity: .75; }
                .aira-block__link svg { width: 13px; height: 13px; }
                .aira-block__body ul { padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 9px; }
                .aira-block__body ul li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; font-weight: 300; color: #4a5568; line-height: 1.7; }
                .aira-block__body ul li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #1e6fff; flex-shrink: 0; margin-top: 8px; }

                @media (max-width: 768px) {
                    .type-compare, .benefits, .pillars { grid-template-columns: 1fr; }
                    .milestone { flex-direction: column; gap: 12px; }
                    .cta { padding: 36px 24px; flex-direction: column; text-align: center; }
                    .cta__text { text-align: center; }
                    .day-card__header { padding: 16px 20px; }
                    .day-card__body { padding: 18px 20px; }
                    .aira-block__header { padding: 20px 22px; }
                    .aira-block__body { padding: 18px 22px; }
                }

                @keyframes shimmerSweep {
                    0%   { left: -100%; opacity: 0; }
                    20%  { opacity: 1; }
                    80%  { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
                @keyframes scrollLine {
                    0%   { transform:scaleY(0); transform-origin:top;    opacity:1; }
                    50%  { transform:scaleY(1); transform-origin:top;    opacity:1; }
                    51%  { transform:scaleY(1); transform-origin:bottom; }
                    100% { transform:scaleY(0); transform-origin:bottom; opacity:0; }
                }
                ` }} />
        </div>
    );
}
