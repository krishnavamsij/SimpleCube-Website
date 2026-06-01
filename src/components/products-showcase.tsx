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
                videoRef.current.play().catch(() => { });
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
        <div ref={ref} className="hidden lg:flex w-full lg:w-[55%] relative items-center justify-center overflow-visible h-full">

            <div className="relative w-full h-[350px] lg:h-full flex items-center justify-center p-[30px] sm:p-[40px] lg:py-[20px] lg:pl-[20px] lg:pr-0 hover:scale-[1.02] transition-transform duration-700 ease-out">
                {p.image.includes('.mp4') ? (
                    <video
                        ref={videoRef}
                        src={p.image}
                        muted
                        loop
                        playsInline
                        className="max-w-full max-h-full object-contain"
                    />
                ) : p.image.includes('.gif') ? (
                    gifSrc ? (
                        <img src={gifSrc} alt={p.title} className="max-w-full max-h-full object-contain" />
                    ) : (
                        <div className="w-full h-full" /> // Placeholder while reset
                    )
                ) : (
                    <Image src={p.image} alt={p.title} fill className="object-contain" />
                )}
            </div>
        </div>
    );
};

export function ProductsShowcase() {
    const { label, headline, subheadline, rightCallout, logos, products } = productsContent;

    return (
        <section className="relative bg-[#030B3B] text-white pt-[30px] pb-[20px] sm:pt-[40px] sm:pb-[30px] lg:pt-[50px] lg:pb-[30px]">
            <div className="mx-auto max-w-[1400px] px-6">
                {/* ── Section header ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-8 lg:mb-12"
                >
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        {label}
                    </div>

                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 relative">
                        {/* Left Side: Headline and Subheadline */}
                        <div className="lg:pr-12">
                            <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-tight leading-[1.1] text-white mb-8">
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
                <div className="mt-8 lg:mt-12 pt-8 border-t border-white/10 w-full mb-12 lg:mb-16 relative">

                    {/* Mobile: seamless auto-scroll marquee — no scrollbar */}
                    <div className="lg:hidden marquee-fade overflow-hidden pb-8 pt-4">
                        <div
                            className="animate-marquee flex w-max items-start gap-8"
                            style={{ "--marquee-duration": "28s" } as React.CSSProperties}
                        >
                            {[...logos, ...logos].map((logo, i) => (
                                <div key={i} className="flex-shrink-0 flex flex-col items-center justify-start w-[120px]">
                                    {/* Logo Image */}
                                    <div className="h-10 relative w-full opacity-95 mb-2.5">
                                        <Image src={logo.src} alt={logo.name} fill className="object-contain object-center" />
                                    </div>
                                    {/* Conditionally Render Badge underneath matching logo */}
                                    {logo.acquiredBy ? (
                                        logo.acquiredByUrl ? (
                                            <a 
                                                href={logo.acquiredByUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="inline-flex items-center gap-0.5 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap mt-1 hover:bg-[#3b82f6]/20 transition-colors duration-200 cursor-pointer z-10"
                                            >
                                                <ArrowUpRightIcon className="w-2 h-2" /> {logo.acquiredBy}
                                            </a>
                                        ) : (
                                            <div className="inline-flex items-center gap-0.5 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap mt-1">
                                                <ArrowUpRightIcon className="w-2 h-2" /> {logo.acquiredBy}
                                            </div>
                                        )
                                    ) : (
                                        /* Spacer to keep vertical baseline alignment across elements in the marquee */
                                        <div className="h-5 w-full" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop: static centered layout with acquired-by badges */}
                    <div className="hidden lg:flex flex-row items-start justify-start xl:justify-center flex-nowrap gap-6 xl:gap-4 pb-12 w-full pt-4">
                        {logos.map((logo, i) => (
                            <div key={i} className="flex flex-col items-center justify-start relative flex-shrink-0">
                                <div className="h-12 lg:h-16 relative w-[160px] lg:w-[180px] xl:w-[185px] opacity-95 transition-opacity">
                                    <Image src={logo.src} alt={logo.name} fill className="object-contain object-center" />
                                </div>
                                {logo.acquiredBy && (
                                    logo.acquiredByUrl ? (
                                        <a 
                                            href={logo.acquiredByUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="absolute top-full mt-2 inline-flex items-center gap-1 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-[9px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap hover:bg-[#3b82f6]/20 transition-colors duration-200 cursor-pointer z-10"
                                        >
                                            <ArrowUpRightIcon className="w-3 h-3" /> {logo.acquiredBy}
                                        </a>
                                    ) : (
                                        <div className="absolute top-full mt-2 inline-flex items-center gap-1 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-[9px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap">
                                            <ArrowUpRightIcon className="w-3 h-3" /> {logo.acquiredBy}
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* ── Stacked Products Sticky Layout (All Screens - Overlapping) ── */}
            <div className="w-full pl-6 pr-6 lg:pr-0 lg:pl-[calc(max(1.5rem,(100%-1400px)/2+1.5rem))]">
                <div className="relative w-full overflow-visible pb-6 lg:pb-4 mt-10 lg:mt-0">
                    {products.map((p, i) => (
                        <div
                            key={p.num}
                            className={`sticky relative w-full overflow-hidden rounded-[2rem] lg:rounded-l-[3.5rem] lg:rounded-r-none mb-0 ${i === products.length - 1 ? 'lg:mb-0' : 'lg:mb-[10vh]'}`}
                            style={{
                                top: "0",
                                zIndex: i * 10,
                                paddingBottom: "0",
                            }}
                        >
                            {/* 
                                Card Wrapper
                                - Solid background bg-[#081236], preventing transparency overlap
                                - Overflow hidden to clip any peeking content
                                - Proper z-index layering for complete coverage
                            */}
                            <div
                                className="bg-[#081236] rounded-[2rem] lg:rounded-l-[3.5rem] lg:rounded-r-none shadow-[0_-25px_60px_rgba(0,0,0,0.6)] border border-white/5 lg:border-r-0 overflow-hidden flex flex-col lg:flex-row min-h-[460px] lg:min-h-[75vh] relative"
                                style={{
                                    width: '100%'
                                }}
                            >

                                {/* Left: Content */}
                                <div className="flex-1 px-[30px] sm:px-[40px] lg:px-[50px] pt-[40px] pb-[40px] sm:pt-[50px] sm:pb-[50px] lg:pt-[10vh] lg:pb-[10vh] lg:pl-[50px] lg:pr-[40px] xl:pl-[70px] xl:pr-[50px] flex flex-col justify-center relative z-10 w-full lg:w-[45%]">
                                    <h3 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold tracking-tight text-white mb-10 lg:mb-12">
                                        {p.title}
                                    </h3>

                                    {/* Capsule Tags with Icons */}
                                    <div className="flex flex-wrap gap-3 mb-12 lg:mb-14">
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

                                    <p className="text-lg sm:text-xl lg:text-[22px] text-slate-300 leading-relaxed max-w-xl mb-14 lg:mb-16">
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
