"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { productsContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, Landmark, Shield, TrendingUp, GraduationCap, Truck } from "lucide-react";

const getTagIcon = (tag: string) => {
    if (tag.includes("Financial")) return <Landmark className="w-3.5 h-3.5 text-[#1e90ff]" />;
    if (tag.includes("Insurance")) return <Shield className="w-3.5 h-3.5 text-[#1e90ff]" />;
    if (tag.includes("Wealth")) return <TrendingUp className="w-3.5 h-3.5 text-[#1e90ff]" />;
    if (tag.includes("Education")) return <GraduationCap className="w-3.5 h-3.5 text-[#1e90ff]" />;
    if (tag.includes("Logistics") || tag.includes("Transportation")) return <Truck className="w-3.5 h-3.5 text-[#1e90ff]" />;
    return <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff]"></div>;
};

const ProductImageContainer = ({ p }: { p: any }) => {
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.4 });
    const [gifSrc, setGifSrc] = useState("");

    useEffect(() => {
        if (isInView) {
            if (p.image.includes('.gif')) {
                // Remove the timestamp to allow browser caching. 
                // GIFs will still play from the beginning if the browser handles it, 
                // or we can use a more efficient way if needed.
                setGifSrc(p.image);
            } else if (p.image.includes('.mp4') && videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {});
            }
        } else {
            // We keep the gifSrc to avoid re-triggering a download when it comes back into view
            // but we can pause it if we were using a video. 
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isInView, p.image]);

    return (
        <div ref={ref} className="w-full lg:w-1/2 relative flex items-center lg:items-center justify-center lg:justify-center overflow-visible h-full">
            {/* Targeted Soft Edge Fog */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#081236] via-[#081236]/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#081236] via-[#081236]/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#081236] via-[#081236]/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081236] via-[#081236]/90 to-transparent z-20 pointer-events-none"></div>

            <div className="relative w-full h-[350px] lg:h-[90%] flex items-center justify-center p-6 lg:p-12 hover:scale-[1.02] transition-transform duration-700 ease-out">
                {p.image.includes('.mp4') ? (
                    <video 
                        ref={videoRef}
                        src={p.image} 
                        muted 
                        loop 
                        playsInline 
                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                    />
                ) : p.image.includes('.gif') ? (
                    gifSrc ? (
                        <img src={gifSrc} alt={p.title} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                    ) : (
                        <div className="w-full h-full" /> // Placeholder while reset
                    )
                ) : (
                    <Image src={p.image} alt={p.title} fill className="object-contain drop-shadow-2xl" />
                )}
            </div>
        </div>
    );
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
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        {label}
                    </div>
                    
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 relative">
                        {/* Left Side: Headline and Subheadline */}
                        <div className="lg:pr-12">
                            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px] leading-[1.1] text-white mb-8">
                                Product innovation<br />
                                is in our <span className="text-[#00D4AA]">DNA.</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                                {subheadline}
                            </p>
                        </div>

                        {/* Right Side: Callout text */}
                        <div className="flex flex-col justify-center lg:items-end w-full">
                            <div className="border-l-[2px] border-[#00D4AA] pl-6 py-2 lg:max-w-[480px] w-full mr-auto lg:mr-0">
                                <p className="text-xl sm:text-2xl text-slate-400 font-medium leading-[1.6] max-w-[480px]">
                                    Two of our flagship products were acquired by industry leaders — <span className="font-black text-white px-0.5">Fiserv</span> and <span className="font-black text-white px-0.5">SavvyMoney</span>. A testament to what enterprise depth produces when it becomes a product.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Logo Ribbon Footprint ── */}
                <div className="mt-16 lg:mt-20 pt-10 border-t border-white/10 w-full mb-16 lg:mb-32 relative">
                    <div className="flex flex-row items-center justify-start xl:justify-center overflow-x-auto flex-nowrap gap-4 lg:gap-6 xl:gap-4 pb-10 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {logos.map((logo, i) => (
                            <div key={i} className="flex flex-col items-center justify-center relative flex-shrink-0">
                                {/* Adjusted bounds and gaps to guarantee all 7 fit within 1440px without cropping or negative center-overflows */}
                                <div className="h-12 lg:h-16 relative w-[160px] lg:w-[180px] xl:w-[185px] opacity-95 transition-opacity">
                                    <Image src={logo.src} alt={logo.name} fill className="object-contain object-center" />
                                </div>
                                {logo.acquiredBy && (
                                    <div className="absolute top-full mt-2 inline-flex items-center gap-1 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-[9px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap">
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
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3b82f6]/30 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all w-max"
                                    >
                                        Explore Product <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                </div>

                                {/* Right: Seamless Image Container with Lazy Load GIF player */}
                                <ProductImageContainer p={p} />
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
