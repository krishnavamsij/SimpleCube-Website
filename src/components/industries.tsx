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
        description: "Transforming operations and policy administration with automation, AI assignment and real-time visibility across end-to-end claims lifecycle.",
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
        description: "Enabling connected ecosystems that simplify admin operations, strengthen parent-teacher communication and support better learning outcomes.",
        image: "/images/Industries_Section/Education.png",
        bgColor: "#EAF8FF",
        href: "/industries/education"
    }
];

function IndustryCard({ industry, index }: { industry: typeof INDUSTRIES_DATA[0], index: number }) {
    // Staggered vertical offset (Cards 2 and 4 shifted down) - Desktop only
    const isOffset = index % 2 === 1;
    const [isActive, setIsActive] = useState(false);

    return (
        <Link 
            href={industry.href}
            className={`group relative w-full border border-[#0A2F52]/10 rounded-[32px] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer ${isOffset ? "lg:mt-12" : ""}`}
            style={{ backgroundColor: industry.bgColor }}
            onTouchStart={() => setIsActive(!isActive)}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            {/* Industry Title: STATIC (Always Visible) */}
            <div className="px-4 sm:px-5 lg:px-6 xl:px-7 pt-4 sm:pt-5 lg:pt-5 xl:pt-7 pb-2 z-30" style={{ backgroundColor: industry.bgColor }}>
                <h3 className="text-[15px] sm:text-base lg:text-[18px] font-extrabold text-[#0A2F52] leading-[1.2]">
                    {industry.title}
                </h3>
            </div>

            <div className="relative h-[250px] sm:h-[260px] md:h-[250px] lg:h-[240px] w-full overflow-hidden" style={{ backgroundColor: industry.bgColor }}>
                {/* Front: Image (Always visible, Disappears on Hover/Active) */}
                <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${isActive ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100"}`}>
                    <div className="relative h-full w-full">
                        {/* Seamless Fog Blend into custom Industry background */}
                        <div 
                            className="absolute inset-0 z-10 opacity-95 pointer-events-none" 
                            style={{ 
                                background: `linear-gradient(to top, ${industry.bgColor} 0%, ${industry.bgColor}33 70%, transparent 100%)` 
                            }} 
                        />
                        <div 
                            className="absolute inset-0 z-10 pointer-events-none" 
                            style={{ 
                                background: `linear-gradient(to right, ${industry.bgColor}1A, transparent, ${industry.bgColor}1A)` 
                            }} 
                        />
                        
                        <Image
                            src={industry.image}
                            alt={industry.title}
                            fill
                            className="object-cover object-center"
                            style={{ objectPosition: index === 1 ? 'center 20%' : 'center center' }}
                        />
                    </div>
                </div>

                {/* Content: Hidden by default, Appears on Hover/Active */}
                <div className={`absolute inset-0 flex flex-col px-4 sm:px-5 lg:px-6 xl:px-7 pt-2 pb-4 sm:pb-5 lg:pb-6 transition-all duration-500 ease-in-out ${isActive ? "opacity-100" : "opacity-0"}`}>
                    <p className="text-[#0A2F52]/90 text-[12px] sm:text-[13px] lg:text-[14px] font-medium leading-[1.6]">
                        {industry.description}
                    </p>
                    
                    <div className="mt-auto flex justify-end">
                        <span className="flex items-center gap-1 text-[13px] font-extrabold text-[#3886CE] group-hover:text-[#3886CE] transition-colors">
                            Expand
                            <span className="text-lg leading-none mb-0.5">›</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function Industries() {
    return (
        <section className="bg-[#ECF6FF] py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16 w-full">
                {/* Hero Content Grid - Increased spacing for better flow */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-12 sm:mb-16 lg:mb-28">
                    {/* Left: Branding & Headline */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="md:col-span-7"
                    >
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3886CE] bg-[#3886CE]/10 border border-[#3886CE]/25 rounded-full px-5 py-1.5 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3886CE] shadow-[0_0_8px_#3886CE] animate-pulse" />
                            INDUSTRIES WE SERVE
                        </div>
                        <h2 className="text-[32px] sm:text-[44px] lg:text-[44px] 2xl:text-[52px] font-black tracking-tight text-[#0A2F52] leading-[1.1] font-display text-balance">
                            Deep domain expertise,<br className="hidden md:block" />
                            built over <span className="text-[#3886CE]">decades.</span>
                        </h2>
                    </motion.div>

                    {/* Right: Callout Description - Shifted right */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="md:col-span-5 md:col-start-8 pt-4 md:pt-[60px]"
                    >
                        <div className="flex gap-6 border-l-[3px] border-[#3886CE] pl-6 md:pl-8">
                            <p className="text-base md:text-[16px] lg:text-[18px] 2xl:text-[20px] font-medium leading-relaxed text-slate-600/90 max-w-[460px]">
                                We know your compliance requirements, your legacy constraints and your competitive pressures — not from research, but from years inside these industries.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Industries Cards - Mobile: 1 column, Tablet: 3 columns, Desktop: 5 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 items-start">
                    {INDUSTRIES_DATA.map((industry, index) => (
                        <motion.div
                            key={industry.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportOnce}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={index === 4 ? "sm:col-span-2 md:col-span-1" : ""}
                        >
                            <IndustryCard industry={industry} index={index} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

