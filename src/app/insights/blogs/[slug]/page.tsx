"use client";

import { Navbar } from "@/components/navbar";
import "./blogs.css";
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

function formatBlogContent(content: string): string {
  if (!content) return "";

  let formatted = content;

  // Transform <ul> containing <strong> items into premium boxes
  const ulRegex = /<ul>([\s\S]*?)<\/ul>/g;

  formatted = formatted.replace(
    ulRegex,
    (match: string, listContent: string): string => {
      if (listContent.includes("<strong>")) {

        // Match:
        // <li><strong>Heading:</strong> Description</li>
        const liRegex =
          /<li>\s*<strong>([\s\S]*?)<\/strong>([\s\S]*?)<\/li>/g;

        let hasMatches = false;

        const itemsHtml = listContent.replace(
          liRegex,
          (
            _liMatch: string,
            heading: string,
            description: string
          ): string => {
            hasMatches = true;

            // Clean heading
            let cleanHeading = heading.trim();

            // Remove trailing symbols
            if (cleanHeading.endsWith(":")) {
              cleanHeading = cleanHeading
                .slice(0, -1)
                .trim();
            } else if (cleanHeading.endsWith(" -")) {
              cleanHeading = cleanHeading
                .slice(0, -2)
                .trim();
            } else if (cleanHeading.endsWith(" —")) {
              cleanHeading = cleanHeading
                .slice(0, -2)
                .trim();
            }

            // Clean description
            let cleanDesc = description.trim();

            // Remove leading symbols
            if (
              cleanDesc.startsWith(":") ||
              cleanDesc.startsWith("-") ||
              cleanDesc.startsWith("—")
            ) {
              cleanDesc = cleanDesc
                .slice(1)
                .trim();
            }

            return `
              <div class="premium-box">
                <div class="premium-box__header">
                  <span class="premium-box__dot"></span>
                  <h4 class="premium-box__title">
                    ${cleanHeading}
                  </h4>
                </div>

                <p class="premium-box__desc">
                  ${cleanDesc}
                </p>
              </div>
            `;
          }
        );

        if (hasMatches) {
          return `
            <div class="premium-boxes my-8">
              ${itemsHtml}
            </div>
          `;
        }
      }

      return match;
    }
  );

  return formatted;
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
    <div className="min-h-screen bg-white text-[#030B3B] overflow-x-hidden">
      <Navbar forceDarkText={false} />

      {/* ── Hero Section ── */}
      <header className="relative min-h-[380px] md:min-h-[460px] pt-28 pb-20 sm:pb-24 overflow-hidden bg-[#030b1e] flex flex-col items-center justify-center">
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
                <EyebrowButton href="/insights/blogs" className="eyebrow-back-btn">BLOGS</EyebrowButton>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 text-white mb-8 text-sm font-semibold ">
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
                className="hero-title text-[26px] sm:text-[34px] lg:text-[44px] font-black text-white tracking-tight leading-[1.15] mb-6 px-4 sm:px-8 max-w-[1150px] mx-auto cs-line-clamp-2"
                style={{ textTransform: 'none' }}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />

            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-medium text-white tracking-[0.3em] uppercase">SCROLL</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="mx-auto w-full max-w-8xl px-6 sm:px-8 lg:px-12 pt-8 pb-24">
        <div className="flex flex-col items-center">
          {/* Content Column */}
          <div className="w-full lg:w-[85%]">
            {/* Dynamic HTML Content Parsing and Styles Injection */}
            {mounted ? (
              <div
                className="blog-content-wrapper prose max-w-none text-slate-700 leading-relaxed text-[16.5px] font-light"
                dangerouslySetInnerHTML={{ __html: formatBlogContent(post.sections[0].content) }}
              />
            ) : (
              <div className="blog-content-wrapper prose max-w-none text-slate-700 leading-relaxed text-[16.5px] font-light min-h-[500px]" />
            )}
          </div>
        </div>
      </main>

      <RelatedArticles currentSlug={slug} currentTag={post?.tag || ""} />

      <Footer />
    </div>
  );
}
