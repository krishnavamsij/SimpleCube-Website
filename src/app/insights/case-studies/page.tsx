"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CaseStudyNoResults } from "@/components/case-study-no-results";
import { caseStudiesContent } from "@/content/case-studies";
import { searchCaseStudies, hasNoResults } from "@/lib/case-study-search";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import {
  scrollReveal,
  viewportOnce,
  fadeInUp,
  staggerContainer,
} from "@/lib/animations";

export default function CaseStudiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedCardTags, setExpandedCardTags] = useState<string | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns/popovers when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target;

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }

      if (!(target instanceof Element) || !target.closest("[data-tag-overflow]")) {
        setExpandedCardTags(null);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setExpandedCardTags(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Extract unique tags from case studies
  const tags = useMemo(() => {
    const tagSet = new Set(["All"]);
    caseStudiesContent.studies.forEach((study) => {
      if (study.tags) {
        study.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    const tagArray = Array.from(tagSet);
    // Sort alphabetically with "All" at the top and "Others" at the end
    return tagArray.sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      if (a === "Others") return 1;
      if (b === "Others") return -1;
      return a.localeCompare(b);
    });
  }, []);

  // Filter case studies based on search term and tag using two-layer search
  const filteredStudies = useMemo(() => {
    return searchCaseStudies(caseStudiesContent.studies, searchTerm, selectedTag);
  }, [searchTerm, selectedTag]);

  // Check if we should show the no results message
  const showNoResults = hasNoResults(caseStudiesContent.studies, searchTerm, selectedTag);

  // Handler to clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedTag("All");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#030B3B]">
      <Navbar forceDarkText={true} />

      <main className="pt-28 lg:pt-32 pb-24 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
        {/* ── Page Header ── */}
        <motion.div
          animate="visible"
          variants={staggerContainer}
          className="mb-16 lg:mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 mb-6 sm:mb-8 w-fit"
          >
            <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
            CASE STUDIES
          </motion.div>

          {/* Header Container with Search/Filter */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            {/* Title Side */}
            <div className="lg:w-2/3">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[60px] 2xl:text-[68px] font-black leading-[1.08] tracking-tight text-[#030B3B] mb-6 font-display text-balance"
              >
                Real <span className="text-[#00D4AA]">Results.</span>
                <br />
                Proven <span className="text-[#00D4AA]">Impact.</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="w-full text-base sm:text-lg lg:text-[18.5px] xl:text-xl leading-relaxed text-slate-600 font-medium max-w-2xl whitespace-pre-line"
              >
                {"Discover how Hyniva enables enterprises to modernize\noperations and deliver measurable business impact."}
              </motion.p>
            </div>

            {/* Filter Side */}
            <div className="lg:w-1/3 flex flex-col sm:flex-row gap-4 w-full">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
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

              {/* Tag Dropdown */}
              <div className="relative flex-1" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-4 py-3 text-sm font-medium text-[#030B3B] focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]/50 focus:bg-white cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300/50 text-left"
                >
                  {selectedTag}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto min-w-full no-scrollbar">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTag(tag);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-300 hover:bg-[#1e90ff]/10 hover:translate-x-1 ${
                          selectedTag === tag ? 'bg-[#1e90ff]/10 text-[#1e90ff] translate-x-1' : 'text-[#030B3B]'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Card Grid or No Results ── */}
        {showNoResults ? (
          <CaseStudyNoResults
            searchQuery={searchTerm}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study, idx) => {
            const cardKey = `${study.href}-${idx}`;

            return (
            <motion.div
              key={cardKey}
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="group flex flex-col rounded-[32px] bg-white border border-[#030B3B]/10 overflow-visible transition-all duration-500 hover:-translate-y-2 hover:z-20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative"
            >
              {/* Card Image */}
              <div className="aspect-[1.8/1] overflow-hidden relative m-3 rounded-[24px]">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${study.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-40" />
              </div>

              {/* Card Body */}
              <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                {/* Tags */}
                <div className="min-h-[38px] flex-shrink-0 mb-4 flex items-center">
                  {study.tags && study.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {study.tags.slice(0, 2).map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {study.tags.length > 2 && (
                        <div
                          className="relative inline-flex"
                          data-tag-overflow
                          onMouseEnter={() => setExpandedCardTags(cardKey)}
                          onMouseLeave={() => setExpandedCardTags((current) => current === cardKey ? null : current)}
                        >
                          <button
                            type="button"
                            aria-label={`Show ${study.tags.length - 2} more tags`}
                            aria-expanded={expandedCardTags === cardKey}
                            onClick={() => setExpandedCardTags(expandedCardTags === cardKey ? null : cardKey)}
                            className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 rounded-full cursor-pointer transition-all duration-200 hover:bg-[#1e90ff]/15 hover:border-[#1e90ff]/30 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/25"
                          >
                            +{study.tags.length - 2}
                          </button>
                          {/* Popup */}
                          <AnimatePresence>
                            {expandedCardTags === cardKey && (
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 z-50 mb-2 w-auto max-w-[280px] p-1"
                              >
                                <div className="absolute left-1/2 -translate-x-1/2 top-full h-2 w-full" />
                                <div className="relative flex flex-col gap-1.5 items-center">
                                  {study.tags.slice(2).map((tag, tagIdx) => (
                                    <span
                                      key={tagIdx}
                                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1e90ff] bg-white border border-[#1e90ff]/20 rounded-full shadow-[0_8px_20px_rgba(15,23,42,0.10)]"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Title Wrapper */}
                <div className="mb-3 flex items-start">
                  <h3
                    className="font-display text-[17.5px] sm:text-[18.5px] font-bold text-[#030B3B] leading-[1.3] tracking-tight"
                    dangerouslySetInnerHTML={{ __html: study.title }}
                  />
                </div>

                {/* Callout Content */}
                <p className="text-[13.5px] sm:text-[14px] font-medium text-slate-600 leading-[1.6] mb-6 flex-1">
                  {study.description}
                </p>

                {/* CTA Button */}
                <Link
                  href={study.href}
                  className="flex items-center justify-between w-full py-4 px-6 bg-white border border-[#1e90ff]/20 rounded-2xl text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(30,144,255,0.3)]"
                >
                  Read Case Study
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
            );
          })}
        </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
