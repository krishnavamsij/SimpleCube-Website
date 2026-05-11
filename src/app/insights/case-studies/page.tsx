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
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from case studies
  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    caseStudiesContent.studies.forEach((study) => {
      // Extract category from title - look for patterns like "AI-Powered", "Microsoft", "AWS", etc.
      const title = study.title.replace(/<[^>]*>/g, ""); // Remove HTML tags
      if (title.includes("AI-Powered")) cats.add("AI");
      if (title.includes("Microsoft")) cats.add("Microsoft");
      if (title.includes("AWS")) cats.add("AWS");
      if (title.includes("LWR")) cats.add("Salesforce");
      if (title.includes("Agentforce")) cats.add("Salesforce");
      if (title.includes("FinXserve")) cats.add("Banking");
      if (title.includes("CRM")) cats.add("CRM");
      // Default to 'Other' if no specific category found
      if (
        !title.includes("AI-Powered") &&
        !title.includes("Microsoft") &&
        !title.includes("AWS") &&
        !title.includes("LWR") &&
        !title.includes("Agentforce") &&
        !title.includes("FinXserve") &&
        !title.includes("CRM")
      ) {
        cats.add("Other");
      }
    });
    return Array.from(cats);
  }, []);

  // Filter case studies based on search term and category
  const filteredStudies = useMemo(() => {
    return caseStudiesContent.studies.filter((study) => {
      const title = study.title.replace(/<[^>]*>/g, ""); // Remove HTML tags for search
      const matchesSearch =
        searchTerm === "" ||
        title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "AI" && title.includes("AI-Powered")) ||
        (selectedCategory === "Microsoft" && title.includes("Microsoft")) ||
        (selectedCategory === "AWS" && title.includes("AWS")) ||
        (selectedCategory === "Salesforce" &&
          (title.includes("LWR") || title.includes("Agentforce"))) ||
        (selectedCategory === "Banking" && title.includes("FinXserve")) ||
        (selectedCategory === "CRM" && title.includes("CRM")) ||
        (selectedCategory === "Other" &&
          !title.includes("AI-Powered") &&
          !title.includes("Microsoft") &&
          !title.includes("AWS") &&
          !title.includes("LWR") &&
          !title.includes("Agentforce") &&
          !title.includes("FinXserve") &&
          !title.includes("CRM"));

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
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
            <div className="lg:w-1/3 flex gap-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 text-base font-medium text-[#030B3B] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent placeholder:text-[#9CA3AF] transition-all duration-200"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-6 py-3 pr-12 text-base font-medium text-[#030B3B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent cursor-pointer transition-all duration-200"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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
