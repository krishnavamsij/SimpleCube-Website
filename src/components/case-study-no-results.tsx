"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface CaseStudyNoResultsProps {
  searchQuery: string;
  onClearSearch?: () => void;
}

export function CaseStudyNoResults({
  searchQuery,
  onClearSearch,
}: CaseStudyNoResultsProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 px-6"
    >
      {/* Single Clean Icon */}
      <div className="mb-6">
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
            <circle cx="18" cy="18" r="3" strokeWidth={2} />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-bold text-[#030B3B] mb-3 text-center">
        Not seeing what you need?
      </h3>

      {/* Tighter Copy */}
      <p className="text-[#64748b] text-center mb-6 max-w-lg text-sm">
        Tell AIRA what you're trying to achieve and it will guide you to the most relevant solutions, case studies and expertise.
      </p>

      {/* AIRA Pill Button - matching Contact Us button size */}
      <button
        onClick={() => {
          // Open chatbot
          window.dispatchEvent(new CustomEvent("aira:open"));
        }}
        className="group relative inline-flex items-center justify-center rounded-full font-black text-white border-none cursor-pointer transition-all overflow-visible uppercase tracking-wide h-9 px-5 text-[12px] bg-[#2563eb] hover:bg-[#1d4ed8] shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_0_2px_1px_rgba(59,130,246,1),0_0_8px_2px_rgba(59,130,246,0.8),0_0_20px_4px_rgba(59,130,246,0.5),0_0_40px_8px_rgba(59,130,246,0.3),0_4px_12px_rgba(37,99,235,0.5)]"
        style={{ minWidth: '110px' }}
      >
        {/* AIRA Text Logo - Centered */}
        <img 
          src="/aira-text.png" 
          alt="AIRA" 
          className="h-4 object-contain brightness-0 invert"
        />
      </button>
    </motion.div>
  );
}
