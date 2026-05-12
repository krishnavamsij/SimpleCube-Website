"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { caseStudiesContent } from "@/content/case-studies";
import { motion } from "framer-motion";
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
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  // Filter case studies based on search term and tag
  const filteredStudies = useMemo(() => {
    return caseStudiesContent.studies.filter((study) => {
      const title = study.title.replace(/<[^>]*>/g, ""); // Remove HTML tags for search
      const matchesSearch =
        searchTerm === "" ||
        title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag =
        selectedTag === "All" ||
        (study.tags && study.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#030B3B]">
      <Navbar forceDarkText={true} />

      <main className="pt-32 pb-24 mx-auto w-full max-w-[1400px] px-6">
        {/* ── Page Header ── */}
        <motion.div
          animate="visible"
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8 w-fit"
          >
            <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
            CASE STUDIES
          </motion.div>

          {/* Header Container with Search/Filter */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            {/* Title Side */}
            <div className="lg:w-2/3">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-[72px] font-[900] text-[#030B3B] tracking-tight leading-[1.05] mb-6 font-display"
              >
                Real <span className="text-[#00D4AA]">Results.</span>
                <br />
                Proven <span className="text-[#00D4AA]">Impact.</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="w-full text-lg leading-relaxed text-slate-600 sm:text-xl font-medium max-w-4xl"
              >
                Discover how Hyniva enables enterprises to modernize
                <br className="hidden sm:block" />
                operations and deliver measurable business impact.
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
                  className="w-full px-4 py-3 pr-10 text-sm font-medium text-[#030B3B] bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6]/50 focus:bg-white placeholder:text-[#9CA3AF] transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300/50"
                />
              </div>

              {/* Tag Dropdown */}
              <div className="relative flex-1" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-4 py-3 text-sm font-medium text-[#030B3B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6]/50 focus:bg-white cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300/50 text-left"
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
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-300 hover:bg-[#3B82F6]/10 hover:translate-x-1 ${
                          selectedTag === tag ? 'bg-[#3B82F6]/10 text-[#3B82F6] translate-x-1' : 'text-[#030B3B]'
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

        {/* ── Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study, idx) => (
            <motion.div
              key={idx}
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="group flex flex-col rounded-[32px] bg-[#ECF6FF] border border-[#030B3B]/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative"
            >
              {/* Card Image */}
              <div className="aspect-[1.8/1] overflow-hidden relative m-3 rounded-[24px] bg-white">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${study.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#ECF6FF]/20 to-transparent opacity-40" />
              </div>

              {/* Card Body */}
              <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                {/* Tags */}
                {study.tags && study.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3
                  className="font-display text-[21px] font-bold text-[#030B3B] leading-[1.4] tracking-tight mb-4 flex-1"
                  dangerouslySetInnerHTML={{ __html: study.title }}
                />
                <p className="text-[15px] font-medium text-[#030B3B]/70 leading-relaxed mb-8">
                  {study.description}
                </p>

                {/* CTA Button */}
                <Link
                  href={study.href}
                  className="flex items-center justify-between w-full py-4 px-6 bg-white border border-[#1e90ff]/20 rounded-2xl text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
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
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
