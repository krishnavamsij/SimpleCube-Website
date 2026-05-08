"use client";

import { motion } from 'framer-motion';

interface TabNavigationProps {
  tabs: string[];
  activeTabIndex: number;
  onTabClick: (index: number) => void;
}

export function TabNavigation({ tabs, activeTabIndex, onTabClick }: TabNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-4 overflow-x-auto no-scrollbar">
      {tabs.map((tab, index) => (
        <motion.button
          key={index}
          onClick={() => onTabClick(index)}
          className={`px-4 py-1.5 rounded-full text-[12px] font-bold font-sans transition-all duration-200 whitespace-nowrap border ${
            activeTabIndex === index
              ? "bg-[#1e90ff] text-white border-[#1e90ff]"
              : "bg-white border-[#e5e7eb] text-[#6b7280] hover:bg-[#1e90ff] hover:border-[#1e90ff] hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab}
        </motion.button>
      ))}
    </div>
  );
}
