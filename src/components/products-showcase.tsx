"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { productsContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, Landmark, Shield, TrendingUp, GraduationCap, Truck } from "lucide-react";

const getTagIcon = (tag: string) => {
    if (tag.includes("Financial")) return <Landmark className="w-3.5 h-3.5 text-[#3b82f6]" />;
    if (tag.includes("Insurance")) return <Shield className="w-3.5 h-3.5 text-[#3b82f6]" />;
    if (tag.includes("Wealth")) return <TrendingUp className="w-3.5 h-3.5 text-[#3b82f6]" />;
    if (tag.includes("Education")) return <GraduationCap className="w-3.5 h-3.5 text-[#3b82f6]" />;
    if (tag.includes("Logistics") || tag.includes("Transportation")) return <Truck className="w-3.5 h-3.5 text-[#3b82f6]" />;
    return <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></div>;
};

export function ProductsShowcase() {
    const { label, headline, subheadline, rightCallout, logos, products } = productsContent;

    return (
        <section className="relative bg-[#030B3B] text-white">
            <div className="mx-auto max-w-[1400px] px-6 pt-12 sm:pt-16">
                {/* ── Section header ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-16 lg:mb-24"
                >
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3b82f6] bg-[#3b82f6]/[0.08] border border-[#3b82f6]/25 rounded-full px-5 py-1.5 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_8px_#3b82f6] animate-pulse" />
                        {label}
                    </div>
                    
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 relative">
                        {/* Left Side: Headline, and Subheadline */}
                        <div className="lg:pr-12">
                            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px] leading-[1.1] text-white mb-8">
                                Product innovation<br />
                                is in our <span className="text-[#3b82f6]">DNA.</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                                {subheadline}
                            </p>
                        </div>

                        {/* Right Side: Callout text */}
                        <div className="flex flex-col justify-center lg:items-end w-full">
                            <div className="border-l-[2px] border-[#3b82f6] pl-6 py-2 lg:max-w-[480px] w-full mr-auto lg:mr-0">
                                <p className="text-lg text-slate-400 font-medium leading-[1.7] max-w-[480px]">
                                    Two of our flagship products were acquired by industry leaders — <span className="font-black text-white px-0.5">Fiserv</span> and <span className="font-black text-white px-0.5">SavvyMoney</span> <br className="hidden lg:block"/>— a testament to what enterprise depth produces when it becomes a product.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Logo Ribbon Footprint ── */}
                <div className="mt-16 lg:mt-20 pt-10 border-t border-white/10 w-full mb-16 lg:mb-32 relative">
                    <div className="flex flex-row items-center justify-start lg:justify-between gap-12 lg:gap-8 overflow-x-auto scrollbar-none pb-4">
                        {logos.map((logo, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-3 min-w-[140px] lg:min-w-[120px]">
                                <div className="h-10 lg:h-12 relative w-[140px] lg:w-[150px] opacity-90 transition-opacity flex-shrink-0">
                                    <Image src={logo.src} alt={logo.name} fill className="object-contain object-center" />
                                </div>
                                {logo.acquiredBy && (
                                    <div className="inline-flex items-center gap-1 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-[9px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap">
                                        <ArrowUpRightIcon className="w-3 h-3" /> {logo.acquiredBy}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Stacked Products Sticky Layout ── */}
            {/* Using native CSS sticky sequentially so each card overlaps the previous one precisely as requested. */}
            <div className="mx-auto max-w-[1400px] px-6">
                <div className="relative w-full overflow-visible pb-10 lg:pb-24 mt-10 lg:mt-0">
                    {products.map((p, i) => (
                        <div 
                            key={p.num} 
                            className="sticky w-full"
                            style={{
                                top: "12vh",
                                zIndex: i * 10,
                                paddingBottom: i === products.length - 1 ? "0" : "15vh", // Allows scroll padding between stacks
                            }}
                        >
                            {/* 
                                Card Wrapper
                                - Solid background bg-[#081236], preventing transparency overlap
                                - Align to right boundary of page layout (lg:ml-auto)
                                - Starts a bit far from left boundary via (lg:w-[94%])
                                - Right looks "cut" via rounded-r-none
                            */}
                            <div 
                                className="bg-[#081236] rounded-[2rem] lg:rounded-l-[3.5rem] lg:rounded-r-none shadow-[0_-25px_60px_rgba(0,0,0,0.6)] border border-white/5 lg:border-r-0 overflow-hidden flex flex-col lg:flex-row min-h-[500px] lg:h-[76vh] relative mr-[-50vw] lg:mr-0"
                                style={{
                                    width: 'calc(100vw - max(24px, calc((100vw - 1400px) / 2)))',
                                    maxWidth: 'none'
                                }}
                            >
                                
                                {/* Left: Content */}
                                <div className="flex-1 px-8 py-10 lg:pl-16 lg:pr-10 xl:pl-28 xl:pr-16 flex flex-col justify-center relative z-10 w-full lg:w-1/2">
                                    <h3 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold tracking-tight text-white mb-8">
                                        {p.title}
                                    </h3>
                                    
                                    {/* Capsule Tags with Icons */}
                                    <div className="flex flex-wrap gap-3 mb-10">
                                        {p.tags.map((tag) => (
                                            <div
                                                key={tag}
                                                className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-xs font-semibold text-slate-300 tracking-wide flex items-center gap-2.5 backdrop-blur-sm"
                                            >
                                                {getTagIcon(tag)}
                                                {tag}
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-lg sm:text-xl lg:text-[22px] text-slate-300 leading-relaxed max-w-xl mb-12">
                                        {p.description}
                                    </p>
                                    
                                    <Link
                                        href={p.href}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#3b82f6] text-white text-sm font-bold shadow-md hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all w-max"
                                    >
                                        Explore Product <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                </div>

                                {/* Right: Seamless Image Container */}
                                <div className="w-full lg:w-1/2 relative flex items-center lg:items-end justify-center lg:justify-end overflow-visible">
                                    <div className="relative w-full h-[300px] lg:w-[130%] lg:h-[130%] lg:mr-[-10%] lg:mb-[-10%] hover:scale-105 transition-transform duration-700 ease-out origin-bottom-right">
                                        <Image src={p.image} alt={p.title} fill className="object-contain p-8 lg:p-0 drop-shadow-2xl" />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
