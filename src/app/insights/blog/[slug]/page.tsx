"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogDetails } from "@/content/blog-details";
import { blogContent } from "@/content/blog";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ArrowLeft, Clock, User, Tag, ChevronLeft, ChevronRight, MessageSquare, Send } from "lucide-react";
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
        <div className="min-h-screen bg-white font-sans text-[#030B3B]">
            <Navbar forceDarkText={false} />

            {/* ── Hero Section ── */}
            <header className="relative pt-32 pb-20 bg-[#030B3B] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3B82F6] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
                </div>
                
                <div className="mx-auto w-full max-w-[1400px] px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="mb-8">
                                <Link 
                                    href="/insights/blog"
                                    className="inline-flex items-center text-sm font-bold text-[#3B82F6] hover:text-white transition-colors gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    BACK TO BLOG
                                </Link>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-white/60 mb-8 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#3B82F6]" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#3B82F6]" />
                                    {post.author}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                                    <Tag className="w-3 h-3" />
                                    {post.tag}
                                </div>
                            </motion.div>

                            <motion.h1 
                                variants={fadeInUp}
                                className="text-4xl sm:text-5xl lg:text-7xl font-[900] text-white tracking-tight leading-[1.1] mb-8 font-display"
                            >
                                {post.title}
                            </motion.h1>

                            {post.subtitle && (
                                <motion.p 
                                    variants={fadeInUp}
                                    className="text-xl sm:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl"
                                >
                                    {post.subtitle}
                                </motion.p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* ── Horizontal Sticky Navigator ── */}
            {post.sections.length > 1 && (
                <nav className="sticky top-[64px] lg:top-[70px] z-40 bg-white/80 backdrop-blur-md border-b border-[#030B3B]/10 py-0 shadow-sm transition-all duration-300">
                    <div className="mx-auto w-full max-w-[1400px] px-6">
                        <div className="flex items-center lg:justify-center justify-start gap-8 overflow-x-auto no-scrollbar py-4">
                            {post.sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className={`text-[13px] uppercase tracking-wider font-bold whitespace-nowrap transition-all relative py-2 ${
                                        activeSection === section.id 
                                        ? "text-[#3B82F6]" 
                                        : "text-[#030B3B]/50 hover:text-[#030B3B]"
                                    }`}
                                >
                                    {section.title}
                                    {activeSection === section.id && (
                                        <motion.div 
                                            layoutId="activeTabBlog"
                                            className="absolute bottom-[-16px] left-0 right-0 h-1 bg-[#3B82F6] rounded-t-full"
                                        />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>
            )}

            {/* ── Main Content ── */}
            <main className="mx-auto w-full max-w-[1400px] px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Content Column */}
                    <div className="flex-1 max-w-4xl mx-auto">
                        <div className="space-y-24">
                            {post.sections.map((section, idx) => (
                                <section 
                                    key={section.id} 
                                    id={section.id}
                                    className="scroll-mt-40 group"
                                >
                                    <div className="flex items-center justify-center gap-4 mb-10">
                                        <div className="w-12 h-1.5 bg-[#3B82F6] rounded-full" />
                                        <h2 className="text-3xl font-[800] text-[#030B3B] tracking-tight text-center">{section.title}</h2>
                                        <div className="w-12 h-1.5 bg-[#3B82F6] rounded-full" />
                                    </div>
                                    
                                    <div 
                                        className="text-xl leading-relaxed text-slate-600 space-y-8 text-left
                                        [&_p]:mb-6 
                                        [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:mb-8 [&_ul]:space-y-4
                                        [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:mb-8 [&_ol]:space-y-4
                                        [&_li]:text-slate-600 [&_li]:pl-2
                                        [&_strong]:text-[#030B3B] [&_strong]:font-[700]
                                        [&_a]:text-[#3B82F6] [&_a]:underline [&_a]:font-semibold
                                        [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#030B3B] [&_h3]:mt-12 [&_h3]:mb-6
                                        [&_img]:w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:my-8 [&_img]:shadow-lg [&_img]:border [&_img]:border-slate-100"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />

                                    {idx === 0 && post.heroImage && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="mt-16 rounded-[40px] overflow-hidden border border-[#030B3B]/5 shadow-2xl shadow-blue-500/5 group-hover:scale-[1.01] transition-transform duration-500"
                                        >
                                            <img 
                                                src={post.heroImage} 
                                                alt={post.title}
                                                className="w-full h-auto object-cover max-h-[600px]"
                                            />
                                        </motion.div>
                                    )}
                                </section>
                            ))}
                        </div>

                        {/* ── Footer CTA ── */}
                        <section className="mt-20 sm:mt-32 p-8 sm:p-12 md:p-20 rounded-[32px] sm:rounded-[64px] bg-[#F8FAFC] border border-[#030B3B]/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#3B82F6] rounded-full blur-[80px] sm:blur-[100px] opacity-[0.03] -translate-y-1/2 translate-x-1/3" />
                            <div className="relative z-10 text-center">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#030B3B]">Enjoyed this insight?</h2>
                                <p className="text-slate-600 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto font-medium">
                                    Subscribe to our newsletter to receive the latest perspectives on AI and digital transformation directly in your inbox.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link 
                                        href="/contact"
                                        className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 text-center"
                                    >
                                        Get in Touch
                                    </Link>
                                    <Link 
                                        href="/insights/blog"
                                        className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#030B3B] border border-[#030B3B]/10 rounded-2xl font-bold hover:bg-[#030B3B] hover:text-white transition-all text-center"
                                    >
                                        Explore More Blogs
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* ── Related Articles ── */}
            <RelatedArticles currentSlug={slug} currentTag={post.tag} />

            {/* ── Comment Form ── */}
            <CommentSection />

            <Footer />
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
                                <h5 className="text-base sm:text-lg font-bold text-[#030B3B] leading-snug group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                                    {post.title}
                                </h5>
                                <span className="inline-flex items-center gap-1.5 mt-4 text-xs sm:text-sm font-bold text-[#3B82F6] group-hover:gap-3 transition-all">
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

/* ─────────────────────────── Comment Section Component ─────────────────────────── */
function CommentSection() {
    const [formData, setFormData] = useState({ comment: '', name: '', email: '', website: '', saveCookies: false });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="bg-white border-t border-[#030B3B]/5 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-[900px] px-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                    <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-[#3B82F6]" />
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-[800] text-[#030B3B] tracking-tight">Leave a Reply</h3>
                </div>
                <p className="text-slate-500 mb-8 text-sm sm:text-base">Your email address will not be published. Required fields are marked <span className="text-red-500">*</span></p>

                {submitted ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="p-6 sm:p-8 bg-green-50 border border-green-200 rounded-2xl text-center"
                    >
                        <p className="text-green-700 font-bold text-base sm:text-lg">Thank you for your comment!</p>
                        <p className="text-green-600 mt-2 text-sm sm:text-base">Your comment is awaiting moderation.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        {/* Comment */}
                        <div>
                            <label htmlFor="comment" className="block text-sm sm:text-base font-bold text-[#030B3B] mb-2">
                                Comment <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows={6}
                                required
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-[#030B3B]/10 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 outline-none transition-all text-[#030B3B] bg-[#F8FAFC] resize-vertical text-sm sm:text-base"
                                placeholder="Share your thoughts..."
                            />
                        </div>

                        {/* Name + Email row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                            <div>
                                <label htmlFor="author" className="block text-sm sm:text-base font-bold text-[#030B3B] mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-[#030B3B]/10 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 outline-none transition-all text-[#030B3B] bg-[#F8FAFC] text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm sm:text-base font-bold text-[#030B3B] mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-[#030B3B]/10 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 outline-none transition-all text-[#030B3B] bg-[#F8FAFC] text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Website */}
                        <div>
                            <label htmlFor="url" className="block text-sm sm:text-base font-bold text-[#030B3B] mb-2">Website</label>
                            <input
                                type="url"
                                id="url"
                                name="url"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-[#030B3B]/10 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 outline-none transition-all text-[#030B3B] bg-[#F8FAFC] text-sm sm:text-base"
                            />
                        </div>

                        {/* Save cookies checkbox */}
                        <div className="flex items-start gap-3 mt-4">
                            <input
                                type="checkbox"
                                id="save-cookies"
                                checked={formData.saveCookies}
                                onChange={(e) => setFormData({ ...formData, saveCookies: e.target.checked })}
                                className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-[#030B3B]/20 text-[#3B82F6] focus:ring-[#3B82F6]/20 flex-shrink-0 cursor-pointer"
                            />
                            <label htmlFor="save-cookies" className="text-xs sm:text-sm text-slate-500 cursor-pointer leading-relaxed">
                                Save my name, email, and website in this browser for the next time I comment.
                            </label>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 text-sm sm:text-base"
                            >
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                Post Comment
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
