"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";

const INDUSTRIES_DATA = [
    {
        title: "Banking & Credit Unions",
        description: "Modernizing how financial institutions acquire, serve and retain customers — from digital lending to member experience.",
        image: "/images/Industries_Section/Banks_and_Credit_Unions.png",
        bgColor: "#ECF4FD",
        href: "/industries/banking"
    },
    {
        title: "Wealth & Asset Management",
        description: "Helping wealth managers and advisors deliver personalized, compliant investment experiences that grow AUM and deepen client relationships.",
        image: "/images/Industries_Section/Wealth_and_Asset_Management.png",
        bgColor: "#E0F2FD",
        href: "/industries/wealth-asset-management"
    },
    {
        title: "Insurance",
        description: "Transforming claims operations and policy administration with automation, AI assignment and real-time visibility across the full claims lifecycle.",
        image: "/images/Industries_Section/Insurance.png",
        bgColor: "#EAF6FE",
        href: "/industries/insurance"
    },
    {
        title: "Transportation & Logistics",
        description: "Building the platforms that keep fleets moving, shipments tracked and operations connected — from warehouse to last-mile delivery.",
        image: "/images/Industries_Section/Transportation_and_Logistics.png",
        bgColor: "#E3F4FE",
        href: "/industries/transportation-logistics"
    },
    {
        title: "Education",
        description: "Enabling institutions to streamline administration, improve student outcomes and scale operations through purpose-built technology.",
        image: "/images/Industries_Section/Education.png",
        bgColor: "#EAF8FF",
        href: "/industries/education"
    }
];

function IndustryCard({ industry, index }: { industry: typeof INDUSTRIES_DATA[0], index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    // Staggered vertical offset (Cards 2 and 4 shifted down)
    const isOffset = index % 2 === 1;

    return (
        <Link 
            href={industry.href}
            className={`group relative h-[340px] w-full border border-[#030B3B]/10 rounded-[32px] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col block ${isOffset ? "mt-12" : ""}`}
            style={{ backgroundColor: industry.bgColor }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Industry Title: STATIC (Always Visible) - Now Integrated with Seamless Background */}
            <div className="p-7 pb-2 z-30" style={{ backgroundColor: industry.bgColor }}>
                <h3 className="text-[18px] font-[800] text-[#030B3B] leading-[1.2]">
                    {industry.title}
                </h3>
            </div>

            <div className="relative flex-1 px-8 pb-8 h-full" style={{ backgroundColor: industry.bgColor }}>
                {/* Front: Image (Disappears on Hover) */}
                <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${isHovered ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}`}>
                    <div className="relative h-full w-full">
                        {/* Seamless Fog Blend into custom Industry background */}
                        <div 
                            className="absolute inset-0 z-10 opacity-95" 
                            style={{ 
                                background: `linear-gradient(to t, ${industry.bgColor} 0%, ${industry.bgColor}33 70%, transparent 100%)` 
                            }} 
                        />
                        <div 
                            className="absolute inset-0 z-10" 
                            style={{ 
                                background: `linear-gradient(to r, ${industry.bgColor}1A, transparent, ${industry.bgColor}1A)` 
                            }} 
                        />
                        
                        <Image
                            src={industry.image}
                            alt={industry.title}
                            fill
                            className="object-cover object-bottom opacity-100"
                        />
                    </div>
                </div>

                {/* Content: Appears on Hover - Aligned to Image Top Margin */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-full flex flex-col pt-2"
                        >
                            <p className="text-[#030B3B]/80 text-[14px] leading-relaxed font-medium">
                                {industry.description}
                            </p>
                            
                            <div className="mt-auto flex justify-end">
                                <span className="flex items-center gap-1 text-[13px] font-extrabold text-[#1e90ff] hover:text-[#00D4AA] transition-colors">
                                    Expand
                                    <span className="text-lg leading-none mb-0.5">›</span>
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Link>
    );
}

export function Industries() {
    return (
        <section className="bg-[#ECF6FF] py-[30px] sm:py-[40px] lg:py-[50px] min-h-screen flex items-center overflow-hidden">
            <div className="mx-auto max-w-[1440px] px-8 w-full">
                {/* Hero Content Grid - Increased spacing for better flow */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-28">
                    {/* Left: Branding & Headline */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="lg:col-span-7"
                    >
                        <div className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/25 mb-8">
                            <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                            INDUSTRIES WE SERVE
                        </div>
                        <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-[900] tracking-tight text-[#030B3B] leading-[1.1] font-display">
                            Deep domain expertise,<br />
                            built over <span className="text-[#00D4AA]">decades.</span>
                        </h2>
                    </motion.div>

                    {/* Right: Callout Description - Shifted right */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="lg:col-span-4 lg:col-start-9 pt-4 lg:pt-16"
                    >
                        <div className="flex gap-6 border-l-[3px] border-[#00D4AA] pl-8">
                            <p className="text-lg sm:text-xl font-medium leading-relaxed text-slate-600/90">
                                We know your compliance requirements, your legacy constraints and your competitive pressures — not from research, but from years inside these industries.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Industries 5-Column Grid with Staggered Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
                    {INDUSTRIES_DATA.map((industry, index) => (
                        <motion.div
                            key={industry.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportOnce}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <IndustryCard industry={industry} index={index} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

