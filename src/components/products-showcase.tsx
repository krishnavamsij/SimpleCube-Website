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

    const mediaNode = p.image.includes('.mp4') ? (
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
            <div className="w-full h-full" /> /* Placeholder while GIF src resets */
        )
    ) : (
        <Image src={p.image} alt={p.title} fill className="object-contain" />
    );

    return (
        <div ref={ref} className="w-full lg:w-[55%] relative flex items-center justify-center overflow-visible h-full">
            {/*
             * Mobile / tablet (< lg): render a compact image strip above the text column.
             * The outer card is flex-col on small screens, so this renders first (top).
             * Desktop (≥ lg): this container is part of the side-by-side flex-row layout.
             */}
            <div className="relative w-full h-[220px] sm:h-[280px] lg:h-full flex items-center justify-center p-[20px] sm:p-[30px] lg:py-[20px] lg:pl-[20px] lg:pr-0 hover:scale-[1.02] transition-transform duration-700 ease-out">
                {mediaNode}
            </div>
        </div>
    );
};

export function ProductsShowcase() {
    const { label, headline, subheadline, rightCallout, logos, products } = productsContent;

    return (
        <section className="relative bg-[#030B3B] text-white pt-[30px] pb-[20px] sm:pt-[40px] sm:pb-[30px] lg:pt-[50px] lg:pb-[30px]">
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
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

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative items-start">
                        {/* Left Side: Headline and Subheadline — spans 7 cols */}
                        <div className="lg:col-span-7">
                            <h2 className="text-[32px] sm:text-[44px] lg:text-[44px] 2xl:text-[50px] font-extrabold tracking-tight leading-[1.08] text-white mb-5">
                                Product innovation<br />
                                is in our <span className="text-[#00D4AA]">DNA.</span>
                            </h2>
                            <p className="text-sm sm:text-base lg:text-[13.5px] xl:text-[14px] text-slate-400 font-normal leading-[1.5] max-w-[460px] xl:max-w-[480px]">
                                {subheadline}
                            </p>
                        </div>

                        {/* Right Side: Callout text — spans 5 cols, aligned to right grid line with 5 lines */}
                        <div className="lg:col-span-5 lg:col-start-8 flex justify-start lg:justify-end w-full">
                            <div className="relative pl-6 w-fit">
                                <span className="absolute left-0 top-[3px] bottom-[3px] w-[2px] bg-[#00D4AA] rounded-full" />
                                <p className="text-base sm:text-lg lg:text-[17.5px] xl:text-[19px] 2xl:text-[20px] text-slate-300 font-medium leading-relaxed lg:leading-[1.7] xl:leading-[1.75]">
                                    Two of our flagship products were<br className="hidden lg:inline" />
                                    acquired by industry leaders — <span className="font-bold text-white">Fiserv</span><br className="hidden lg:inline" />
                                    and <span className="font-bold text-white">SavvyMoney</span>. A testament to<br className="hidden lg:inline" />
                                    what enterprise depth produces when<br className="hidden lg:inline" />
                                    it becomes a product.
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
                                <div key={i} className="flex-shrink-0 flex flex-col items-center justify-start w-[130px]">
                                    {/* Logo Image */}
                                    <div className="h-[50px] relative w-full opacity-95 mb-2.5">
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
                    <div className="hidden lg:flex flex-row items-start justify-between pb-12 w-full pt-4">
                        {logos.map((logo, i) => (
                            <div key={i} className="flex flex-col items-center justify-start relative flex-shrink-0">
                                <div className="h-14 lg:h-[66px] xl:h-[72px] relative w-[8.25rem] lg:w-[9.5rem] xl:w-[10.75rem] opacity-95 transition-opacity">
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
            {/*
             * lg:pl-[calc(max(4rem,(100%-1536px)/2+4rem))]
             * The 1536px here mirrors max-w-[96rem].
             */}
            <div className="w-full pl-6 md:pl-10 lg:pr-0 lg:pl-[calc(max(4rem,(100%-1536px)/2+4rem))]">
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
                                {/*
                                 * On mobile/tablet (< lg): ProductImageContainer renders first (top strip)
                                 * because the card is flex-col. The content column sits below it.
                                 * On desktop (≥ lg): card is flex-row — image is on the right, content left.
                                 */}

                                {/* Left: Content */}
                                {/*
                                 * overflow-y-auto guard: if a card's content (title + tags + description + CTA)
                                 * intrinsically exceeds 75vh − 20vh padding (≈ 55vh), the content scrolls
                                 * within the column rather than forcing the card taller and breaking the
                                 * sticky-stacking scroll effect.
                                 */}
                                <div className="flex-1 px-[30px] sm:px-[40px] lg:px-[50px] pt-[40px] pb-[40px] sm:pt-[50px] sm:pb-[50px] lg:pt-[10vh] lg:pb-[10vh] lg:pl-[50px] lg:pr-[40px] xl:pl-[70px] xl:pr-[50px] flex flex-col justify-center relative z-10 w-full lg:w-[45%] lg:overflow-y-auto">
                                    <h3 className="text-3xl sm:text-4xl lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-white mb-10 lg:mb-12">
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

                                    <p className="text-sm lg:text-[15px] font-medium leading-[1.7] text-slate-300 max-w-xl mb-14 lg:mb-16">
                                        {p.description}
                                    </p>

                                    <Link
                                        href={p.href}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3b82f6]/30 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all w-max"
                                    >
                                        Explore Product <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                </div>

                                {/* Right (lg+) / Top (< lg): Seamless Image Container with Lazy Load GIF / video player */}
                                <ProductImageContainer p={p} />

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
