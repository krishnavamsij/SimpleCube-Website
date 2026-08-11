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
                setGifSrc(p.image);
            } else if (p.image.includes('.mp4') && videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => { });
            }
        } else {
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
            <div className="w-full h-full" />
        )
    ) : (
        <Image src={p.image} alt={p.title} fill className="object-contain" />
    );

    return (
        <div ref={ref} className="w-full md:w-1/2 lg:w-[55%] flex-shrink-0 relative flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-full py-4 md:py-6">
            <div className="relative w-full h-[240px] sm:h-[280px] md:h-full flex items-center justify-center p-4 sm:p-6 md:p-6 lg:p-8 hover:scale-[1.02] transition-transform duration-700 ease-out">
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

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 relative items-start">
                        {/* Left Side: Headline and Subheadline — spans 7 cols */}
                        <div className="md:col-span-7">
                            <h2 className="text-[32px] sm:text-[40px] md:text-[42px] lg:text-[44px] 2xl:text-[50px] font-extrabold tracking-tight leading-[1.08] text-white mb-5">
                                Product innovation<br />
                                is in our <span className="text-[#00D4AA]">DNA.</span>
                            </h2>
                            <p className="text-sm sm:text-base md:text-[13.5px] lg:text-[13.5px] xl:text-[14px] text-slate-400 font-normal leading-[1.5] max-w-[460px] xl:max-w-[480px]">
                                {subheadline}
                            </p>
                        </div>

                        {/* Right Side: Callout text — spans 5 cols, aligned to right grid line */}
                        <div className="md:col-span-5 md:col-start-8 flex justify-start md:justify-end w-full">
                            <div className="relative pl-6 w-fit">
                                <span className="absolute left-0 top-[3px] bottom-[3px] w-[2px] bg-[#00D4AA] rounded-full" />
                                <p className="text-base sm:text-lg md:text-[16px] lg:text-[17.5px] xl:text-[19px] 2xl:text-[20px] text-slate-300 font-medium leading-relaxed md:leading-[1.65] lg:leading-[1.7] xl:leading-[1.75]">
                                    Two of our flagship products were{" "}
                                    <br className="hidden xl:inline" />
                                    acquired by industry leaders —{" "}
                                    <span className="font-bold text-white">Fiserv</span>{" "}
                                    <br className="hidden xl:inline" />
                                    and <span className="font-bold text-white">SavvyMoney</span>. A testament to{" "}
                                    <br className="hidden xl:inline" />
                                    what enterprise depth produces when{" "}
                                    <br className="hidden xl:inline" />
                                    it becomes a product.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Logo Ribbon Footprint ── */}
                <div className="mt-8 lg:mt-12 pt-8 border-t border-white/10 w-full mb-12 lg:mb-16 relative">

                    {/* Mobile (< sm): seamless auto-scroll marquee — no scrollbar */}
                    <div className="sm:hidden marquee-fade overflow-hidden pb-6 pt-2">
                        <div
                            className="animate-marquee flex w-max items-start gap-8"
                            style={{ "--marquee-duration": "24s" } as React.CSSProperties}
                        >
                            {[...logos, ...logos].map((logo, i) => (
                                <div key={i} className="flex-shrink-0 flex flex-col items-center justify-between w-[130px] h-[85px]">
                                    <div className="h-[50px] relative w-full opacity-95">
                                        <Image src={logo.src} alt={logo.name} fill className="object-contain object-center" />
                                    </div>
                                    <div className="h-[22px] flex items-center justify-center">
                                        {logo.acquiredBy && (
                                            logo.acquiredByUrl ? (
                                                <a
                                                    href={logo.acquiredByUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-0.5 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap hover:bg-[#3b82f6]/20 transition-colors duration-200 cursor-pointer z-10"
                                                >
                                                    <ArrowUpRightIcon className="w-2 h-2" /> {logo.acquiredBy}
                                                </a>
                                            ) : (
                                                <div className="inline-flex items-center gap-0.5 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap">
                                                    <ArrowUpRightIcon className="w-2 h-2" /> {logo.acquiredBy}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tablet & Desktop (≥ sm): static perfectly aligned grid */}
                    <div className="hidden sm:grid grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 items-center justify-items-center w-full pt-4 pb-4">
                        {logos.map((logo, i) => (
                            <div key={i} className="flex flex-col items-center justify-between w-full h-[90px] md:h-[95px] lg:h-[100px]">
                                {/* Logo Image Slot */}
                                <div className="h-[52px] sm:h-[56px] md:h-[60px] lg:h-[64px] relative w-full max-w-[130px] opacity-95 transition-opacity">
                                    <Image src={logo.src} alt={logo.name} fill className="object-contain object-center" />
                                </div>
                                {/* Acquisition Badge Slot */}
                                <div className="h-[24px] flex items-center justify-center">
                                    {logo.acquiredBy && (
                                        logo.acquiredByUrl ? (
                                            <a
                                                href={logo.acquiredByUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2.5 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap hover:bg-[#3b82f6]/20 transition-colors duration-200 cursor-pointer z-10"
                                            >
                                                <ArrowUpRightIcon className="w-2.5 h-2.5" /> {logo.acquiredBy}
                                            </a>
                                        ) : (
                                            <div className="inline-flex items-center gap-1 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2.5 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-[#3b82f6] whitespace-nowrap">
                                                <ArrowUpRightIcon className="w-2.5 h-2.5" /> {logo.acquiredBy}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* ── Stacked Products Sticky Layout (All Screens - Overlapping) ── */}
            <div className="w-full px-6 md:px-10 lg:pr-0 lg:pl-[calc(max(4rem,(100%-1536px)/2+4rem))]">
                <div className="relative w-full overflow-visible pb-6 lg:pb-4 mt-10 lg:mt-0">
                    {products.map((p, i) => (
                        <div
                            key={p.num}
                            className={`sticky relative w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] lg:rounded-l-[3.5rem] lg:rounded-r-none mb-0 ${i === products.length - 1 ? 'lg:mb-0' : 'md:mb-[5vh] lg:mb-[10vh]'}`}
                            style={{
                                top: "0",
                                zIndex: i * 10,
                                paddingBottom: "0",
                            }}
                        >
                            <div
                                className="bg-[#081236] rounded-[2rem] md:rounded-[2.5rem] lg:rounded-l-[3.5rem] lg:rounded-r-none shadow-[0_-25px_60px_rgba(0,0,0,0.6)] border border-white/5 lg:border-r-0 overflow-hidden flex flex-col md:flex-row items-stretch min-h-[460px] md:min-h-[480px] lg:min-h-[560px] xl:min-h-[75vh] relative w-full"
                            >
                                {/* Left: Content */}
                                <div className="w-full md:w-1/2 lg:w-[45%] flex-shrink-0 px-[24px] sm:px-[35px] md:px-[36px] lg:pl-[40px] lg:pr-[30px] pt-[32px] pb-[32px] sm:pt-[44px] sm:pb-[44px] lg:py-[44px] xl:py-[10vh] xl:pl-[80px] xl:pr-[50px] flex flex-col justify-center relative z-10 md:overflow-y-auto">
                                    <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-[42px] 2xl:text-[50px] font-extrabold tracking-tight text-white mb-6 sm:mb-8 lg:mb-12">
                                        {p.title}
                                    </h3>

                                    {/* Capsule Tags with Icons */}
                                    <div className="flex flex-wrap gap-2.5 sm:gap-3.5 mb-8 sm:mb-10 lg:mb-14">
                                        {p.tags.map((tag) => (
                                            <div
                                                key={tag}
                                                className="rounded-full bg-white/5 border border-white/10 px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold text-slate-300 tracking-wide flex items-center gap-2 backdrop-blur-sm"
                                            >
                                                {getTagIcon(tag)}
                                                {tag}
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-base sm:text-lg md:text-[16px] lg:text-[17.5px] xl:text-[19px] font-medium leading-[1.75] text-slate-300 max-w-xl mb-10 sm:mb-12 lg:mb-16">
                                        {p.description}
                                    </p>

                                    <Link
                                        href={p.href}
                                        className="inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3b82f6]/30 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all w-max"
                                    >
                                        Explore Product <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                </div>

                                {/* Right (md+) / Top (< md): Seamless Image Container */}
                                <ProductImageContainer p={p} />

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
