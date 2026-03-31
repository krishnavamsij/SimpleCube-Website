"use client";

import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { techPartnersContent } from "@/content/site-content";
import Image from "next/image";

// Tighter layout math to fit on a single screen without scroll-through
const HEX_W = 210;
const HEX_H = 182; // roughly 210 / 1.15
const DX = 157.5; // HEX_W * 0.75
const DY = 91; // HEX_H / 2

// Asymmetrical, uneven staircase rising to the right
const mainHexagons = [
    { idx: 3, x: 0, y: DY * 3, scale: 1 },           // FRONTEND
    { idx: 4, x: DX, y: DY * 2, scale: 1.25 },       // BACKEND (scaled up for PHP line)
    { idx: 0, x: DX, y: DY * 4, scale: 1.15 },       // CRM (scaled up for visibility)
    { idx: 5, x: DX * 2, y: DY * 3, scale: 1 },      // QA
    { idx: 1, x: DX * 2, y: DY, scale: 1 },          // CLOUD
    { idx: 2, x: DX * 3, y: DY * 2, scale: 1.05 },   // AI (scaled up slightly)
];

const decorHexagons = [
    // Next to FrontEnd, same line
    { x: -DX * 0.95, y: DY * 3, w: HEX_W * 0.9, h: HEX_H * 0.9, color: "bg-slate-200/50" }, 
    // Small hexagon below FrontEnd
    { x: DX * 0.1, y: DY * 5 + 10, w: HEX_W * 0.6, h: HEX_H * 0.6, color: "bg-slate-300/40" },
    { x: 0, y: DY, w: HEX_W * 0.8, h: HEX_H * 0.8, color: "bg-blue-100/40" },
    { x: DX, y: 0, w: HEX_W, h: HEX_H, color: "bg-slate-100" },
    { x: DX * 2, y: DY * 5, w: HEX_W, h: HEX_H, color: "bg-slate-200/50" },
    { x: DX * 3, y: DY * 4, w: HEX_W, h: HEX_H, color: "bg-sky-100/40" },
    { x: DX * 3, y: 0, w: HEX_W * 0.7, h: HEX_H * 0.7, color: "bg-[#00A8FF]/10" },
    { x: DX * 4, y: DY * 3, w: HEX_W, h: HEX_H, color: "bg-slate-300/40" }, // Bleeding right
    { x: DX * 4, y: DY, w: HEX_W, h: HEX_H, color: "bg-slate-200/60" }, // Bleeding right
    { x: DX * 5, y: DY * 2, w: HEX_W, h: HEX_H, color: "bg-[#1F35A4]/15" } // Far bleed
];

export function TechPartners() {
    return (
        <section className="relative overflow-hidden bg-white py-12 lg:py-16">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:pl-10 lg:pr-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    
                    {/* LHS: Content & Logos */}
                    <div className="w-full lg:w-[48%] relative z-20 shrink-0">
                        <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                            {/* Glowing Eyebrow */}
                            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                                {techPartnersContent.label}
                            </div>
                            
                            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[46px] leading-[1.12] text-slate-900 mb-5">
                                {techPartnersContent.headline}
                            </h2>
                            
                            <p className="text-[17px] sm:text-lg text-slate-600 font-medium leading-[1.6] mb-10 max-w-xl">
                                {techPartnersContent.sub}
                            </p>
                            
                            {/* Partner Logos Strip - Wrapping Enabled */}
                            <div className="flex flex-wrap items-center gap-x-8 sm:gap-x-10 gap-y-7 opacity-95 w-full">
                                {techPartnersContent.partners.map((partner, index) => {
                                    const img = (
                                        <div key={index} className="relative h-9 sm:h-11 w-28 sm:w-32 flex-shrink-0">
                                            <Image
                                                src={partner.src}
                                                alt={partner.name}
                                                fill
                                                className="object-contain object-left"
                                            />
                                        </div>
                                    );
                                    // Force Genesys and Adobe to the second line
                                    return index === 2 
                                        ? [img, <div key="break" className="basis-full h-0" />] 
                                        : img;
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* RHS: Honeycomb Cluster Bleed */}
                    <div className="w-full lg:w-[50%] mt-12 lg:mt-0 relative h-[450px] lg:h-[550px] z-10 pointer-events-none">
                        {/* Wrapper positioned fully to the right to trigger overflow bleeding of extra hexagons */}
                        <div className="absolute inset-0 right-[-100px] lg:right-[-250px] flex items-center justify-start lg:justify-end">
                            <motion.div 
                                className="relative w-[850px] h-[580px] scale-[0.6] sm:scale-75 lg:scale-[0.85] xl:scale-95 origin-left lg:origin-right lg:translate-x-12"
                                variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}
                            >
                                {/* Decorative Structural Hexagons */}
                                {decorHexagons.map((decor, i) => (
                                    <div
                                        key={`decor-${i}`}
                                        className={`absolute ${decor.color}`}
                                        style={{
                                            left: decor.x,
                                            top: decor.y,
                                            width: decor.w,
                                            height: decor.h,
                                            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                                        }}
                                    />
                                ))}

                                {/* Main Geometric Text Hexagons */}
                                {mainHexagons.map((pos) => {
                                    const hex = techPartnersContent.hexagons[pos.idx];
                                    const scaledW = HEX_W * pos.scale;
                                    const scaledH = HEX_H * pos.scale;
                                    const offsetX = (scaledW - HEX_W) / 2;
                                    const offsetY = (scaledH - HEX_H) / 2;
                                    
                                    return (
                                        <div
                                            key={pos.idx}
                                            className={`absolute flex flex-col items-center justify-center text-center px-4 py-8 ${hex.color} shadow-2xl pointer-events-auto transition-transform hover:scale-105 hover:z-50 duration-300`}
                                            style={{
                                                left: pos.x - offsetX,
                                                top: pos.y - offsetY,
                                                width: scaledW,
                                                height: scaledH,
                                                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                                zIndex: pos.scale > 1 ? 20 : 10
                                            }}
                                        >
                                            <h4 className="text-[12px] sm:text-[13.5px] font-black uppercase tracking-[0.18em] mb-2 sm:mb-3 text-white leading-tight">
                                                {hex.title}
                                            </h4>
                                            <ul className="flex flex-col gap-0.5 sm:gap-1 w-full">
                                                {hex.items.map((item, itemIdx) => (
                                                    <li key={itemIdx} className="text-[12px] sm:text-[13px] font-medium text-white/95 leading-tight">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
