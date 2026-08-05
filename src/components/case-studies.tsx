"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { caseStudiesContent } from "@/content/site-content";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export function CaseStudies() {
    const { label, headline, highlightedWord, sub, studies } = caseStudiesContent;
    
    // We only need the embla refs and APIs, along with selectedIndex.
    // Ensure that it's safe if it has < 3 items, but the user explicitly has 8.
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
    const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);
    const scrollTo = useCallback((index: number) => { if (emblaApi) emblaApi.scrollTo(index); }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="bg-white py-[1.875rem] sm:py-[2.5rem] lg:py-[3.125rem] tracking-[-0.01em] overflow-hidden flex flex-col justify-center">
            <div className="mx-auto w-full">
                
                {/* ── Section header ── */}
                <div className="mx-auto w-full max-w-5xl px-6 mb-16 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 text-[0.6875rem] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                        {label}
                    </div>
                    
                    <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[44px] 2xl:text-[52px] font-extrabold text-[#0f172a] leading-[1.1] tracking-tight mb-6 sm:whitespace-nowrap">
                        {headline.split(highlightedWord || "").map((part, i, arr) => (
                            <React.Fragment key={i}>
                                {part}
                                {i < arr.length - 1 && <span className="text-[#00D4AA] pr-1">{highlightedWord}</span>}
                            </React.Fragment>
                        ))}
                    </h2>

                    <p className="text-base sm:text-lg lg:text-[18px] 2xl:text-[20px] font-medium text-slate-500 leading-[1.7] md:whitespace-nowrap">
                        {sub}
                    </p>
                </div>

                {/* ── Carousel wrapper ── */}
                <div className="relative w-full">
                    {/* Embla Viewport */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex select-none touch-pan-y" style={{ WebkitTapHighlightColor: "transparent" }}>
                            {studies.map((study, index) => {
                                const isActive = index === selectedIndex;

                                return (
                                    <div
                                        key={index}
                                        className="relative flex-none w-full sm:w-[max(58.75rem,70vw)] lg:w-[58.75rem] px-3 sm:px-4 cursor-pointer"
                                        onClick={() => scrollTo(index)}
                                    >
                                        <div 
                                            className={`relative w-full h-[23.75rem] sm:h-[27.5rem] lg:h-[31.25rem] rounded-[1.25rem] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform
                                            ${isActive 
                                                ? "scale-100 opacity-100 brightness-100 shadow-[0_28px_72px_rgba(0,0,0,0.2),0_0_0_1px_rgba(30,144,255,0.12)]" 
                                                : "scale-[0.88] opacity-55 brightness-75 shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
                                            }`}
                                        >
                                            {/* Background Image */}
                                            <div 
                                                className={`absolute inset-0 bg-cover bg-bottom bg-no-repeat transition-transform duration-700 ease-out
                                                ${isActive ? "scale-100" : "scale-[1.04]"}`}
                                                style={{ backgroundImage: `url('${study.image}')` }}
                                            />
                                            
                                            {/* Gradient Overlay precisely mapped from provided HTML */}
                                            <div 
                                                className="absolute inset-0"
                                                style={{
                                                    background: "linear-gradient(to top, rgba(3,10,24,0.97) 0%, rgba(3,10,24,0.90) 20%, rgba(3,10,24,0.65) 38%, rgba(3,10,24,0.15) 56%, transparent 70%)"
                                                }}
                                            />

                                            {/* Left accent strip */}
                                            <div 
                                                className={`absolute left-0 top-[16%] bottom-[16%] w-[0.1875rem] rounded-r-[3px] transition-opacity duration-400
                                                ${isActive ? "opacity-100" : "opacity-0"}`}
                                                style={{ background: "linear-gradient(to bottom, transparent, #1e90ff 30%, #63c2ff 65%, transparent)" }}
                                            />

                                            {/* Corner brackets */}
                                            <div className={`absolute top-4 left-4 w-[1.125rem] h-[1.125rem] border-t border-l border-[#1e90ff]/35 transition-opacity duration-400 ${isActive ? "opacity-100" : "opacity-0"}`} />
                                            <div className={`absolute top-4 right-4 w-[1.125rem] h-[1.125rem] border-t border-r border-[#1e90ff]/35 transition-opacity duration-400 ${isActive ? "opacity-100" : "opacity-0"}`} />
                                            <div className={`absolute bottom-4 left-4 w-[1.125rem] h-[1.125rem] border-b border-l border-[#1e90ff]/35 transition-opacity duration-400 ${isActive ? "opacity-100" : "opacity-0"}`} />
                                            <div className={`absolute bottom-4 right-4 w-[1.125rem] h-[1.125rem] border-b border-r border-[#1e90ff]/35 transition-opacity duration-400 ${isActive ? "opacity-100" : "opacity-0"}`} />

                                            {/* Top Right CTA */}
                                            <div className={`absolute top-6 right-6 sm:top-8 sm:right-8 z-20 transition-all duration-400 delay-[300ms]
                                                ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                                                <a href={study.href} className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-[#030b3b]/60 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1e90ff] hover:border-[#1e90ff] hover:gap-3.5 transition-all shadow-lg">
                                                    Read Case Study <ArrowRightIcon className="w-3.5 h-3.5" />
                                                </a>
                                            </div>

                                            {/* Content */}
                                            <div className="absolute bottom-0 left-0 right-0 flex flex-col p-6 sm:px-10 sm:pb-8 sm:pt-0 z-10 translate-y-2">
                                                <h3 className={`text-lg sm:text-[1.75rem] lg:text-[1.875rem] font-extrabold text-[#edf5ff] leading-[1.18] tracking-tight mb-3 transition-transform duration-500 delay-100 line-clamp-none md:line-clamp-2 min-h-[2.6rem] sm:min-h-[4rem] lg:min-h-[4.5rem]
                                                    ${isActive ? "translate-y-0" : "translate-y-3"}`}>
                                                    {study.title.split("*").map((part, i) => (
                                                        <React.Fragment key={i}>
                                                            {i % 2 !== 0 ? (
                                                                <span className="text-[#63c2ff] drop-shadow-[0_0_30px_rgba(99,194,255,0.28)]">{part}</span>
                                                            ) : (
                                                                part.split("\n").map((line, j, arr) => (
                                                                    <React.Fragment key={j}>
                                                                        {line}
                                                                        {j < arr.length - 1 && <br />}
                                                                    </React.Fragment>
                                                                ))
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </h3>
                                                
                                                <p className={`text-xs sm:text-[0.875rem] font-normal text-[#b4d2f8]/80 leading-[1.7] mb-0 sm:mb-2 max-w-[35rem] transition-all duration-400 delay-200 line-clamp-none md:line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]
                                                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                                    {study.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Controls ── */}
                <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 pb-2">
                    {/* Nav arrows */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={scrollPrev}
                            className="w-11 h-11 rounded-full bg-[#f3f4f6] border border-[#e5e7eb] text-[#374151] flex items-center justify-center hover:bg-[#1e90ff] hover:border-[#1e90ff] hover:text-white hover:scale-105 transition-all opacity-100"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-11 h-11 rounded-full bg-[#f3f4f6] border border-[#e5e7eb] text-[#374151] flex items-center justify-center hover:bg-[#1e90ff] hover:border-[#1e90ff] hover:text-white hover:scale-105 transition-all opacity-100"
                        >
                            <ArrowRightIcon className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Count */}
                    <div className="mt-2 text-[0.6875rem] font-light text-[#9ca3af] tracking-[2px]">
                        <strong className="text-[#00D4AA] font-medium">{String(selectedIndex + 1).padStart(2, '0')}</strong> / {String(studies.length).padStart(2, '0')}
                    </div>
                </div>

            </div>
        </section>
    );
}

