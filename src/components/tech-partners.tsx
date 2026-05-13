"use client";

import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { techPartnersContent } from "@/content/site-content";
import Image from "next/image";

// Tighter layout math to fit on a single screen without scroll-through
const CONTENT_W = 235;
const CONTENT_H = 203.5; 
const DX = 176.25; // CONTENT_W * 0.75
const DY = 101.75; // CONTENT_H / 2

// Decor hexagons retain their original smaller base size
const DECOR_W = 210;
const DECOR_H = 182;

// Standard symmetrical mathematical grid mapping perfectly to user's diagram
const mainHexagons = [
    { idx: 3, x: 0, y: DY * 3 },        // FRONTEND
    { idx: 4, x: DX, y: DY * 2 },       // BACKEND
    { idx: 0, x: DX, y: DY * 4 },       // CRM & PLATFORMS
    { idx: 1, x: DX * 2, y: DY },       // CLOUD
    { idx: 5, x: DX * 2, y: DY * 3 },   // QA & DEVOPS
    { idx: 2, x: DX * 3, y: DY * 2 },   // AI & DATA
];

const decorHexagons = [
    // Core decor mapped nodes
    { x: -DX * 1.15, y: DY * 3, w: DECOR_W * 0.85, h: DECOR_H * 0.85, color: "bg-slate-200/50" }, // Far left of frontend
    { x: 0, y: DY * 5, w: DECOR_W * 0.75, h: DECOR_H * 0.75, color: "bg-blue-100/40" },    // Below frontend (fixed spacing)
    { x: -DX, y: DY * 2, w: DECOR_W * 0.7, h: DECOR_H * 0.7, color: "bg-[#00D4AA]/10" },   // Top left of Frontend
    { x: 0, y: DY, w: DECOR_W * 0.8, h: DECOR_H * 0.8, color: "bg-slate-100" },            // Top left of Backend
    { x: DX, y: 0, w: DECOR_W, h: DECOR_H, color: "bg-sky-100/40" },                       // Top left of Cloud
    { x: DX * 3, y: 0, w: DECOR_W * 0.6, h: DECOR_H * 0.6, color: "bg-slate-200/60" },     // Top right of Cloud
    { x: DX * 4, y: DY, w: DECOR_W * 0.9, h: DECOR_H * 0.9, color: "bg-slate-200/40" },    // Far top right
    { x: DX * 4, y: DY * 3, w: DECOR_W * 0.9, h: DECOR_H * 0.9, color: "bg-[#1F35A4]/15" },// Far bottom right
    { x: DX * 3, y: DY * 4, w: DECOR_W * 0.75, h: DECOR_H * 0.75, color: "bg-slate-300/30" }, // Below AI (fixed spacing)
    { x: DX * 2, y: DY * 5, w: DECOR_W * 0.7, h: DECOR_H * 0.7, color: "bg-[#1e90ff]/10" },   // Below QA

    // Floating visually smaller tiny boxes
    { x: -DX * 1.2, y: DY * 5.5, w: DECOR_W * 0.35, h: DECOR_H * 0.35, color: "bg-slate-200/60" }, // Tiny bottom left
    { x: -DX * 0.5, y: -DY * 0.2, w: DECOR_W * 0.25, h: DECOR_H * 0.25, color: "bg-slate-300/50" }, // Tiny top left
    { x: DX * 1.8, y: -DY * 1.2, w: DECOR_W * 0.3, h: DECOR_H * 0.3, color: "bg-sky-100/60" },      // Tiny above Cloud
    { x: DX * 4.2, y: -DY * 0.2, w: DECOR_W * 0.25, h: DECOR_H * 0.25, color: "bg-slate-200/60" },  // Tiny top right
    { x: DX * 4.5, y: DY * 4.5, w: DECOR_W * 0.3, h: DECOR_H * 0.3, color: "bg-slate-300/40" },    // Tiny bottom right
];

export function TechPartners() {
    return (
        <section className="relative overflow-hidden bg-white py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:pl-10 lg:pr-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    
                    {/* LHS: Content & Logos */}
                    <div className="w-full lg:w-[48%] relative z-20 shrink-0">
                        <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                            {/* Glowing Eyebrow */}
                            <div className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 mb-6">
                                <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                                {techPartnersContent.label}
                            </div>
                            
                            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[56px] leading-[1.1] text-slate-900 mb-5 max-w-xl">
                                Built on the platforms<br /> 
                                you already <span className="text-[#00D4AA]">trust</span>
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
                        <div className="absolute inset-0 right-[-30px] lg:right-[-60px] flex items-center justify-start lg:justify-end">
                            <motion.div 
                                className="relative w-[1000px] h-[750px] scale-[0.55] sm:scale-[0.70] lg:scale-[0.80] xl:scale-[0.85] origin-left lg:origin-right lg:-translate-y-8"
                                variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}
                            >
                                {/* Decorative Structural Hexagons */}
                                {decorHexagons.map((decor, i) => {
                                    const ox = (CONTENT_W - decor.w) / 2;
                                    const oy = (CONTENT_H - decor.h) / 2;
                                    return (
                                        <div
                                            key={`decor-${i}`}
                                            className={`absolute ${decor.color}`}
                                            style={{
                                                left: decor.x + ox,
                                                top: decor.y + oy,
                                                width: decor.w,
                                                height: decor.h,
                                                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                                            }}
                                        />
                                    );
                                })}

                                {/* Main Geometric Text Hexagons */}
                                {mainHexagons.map((pos) => {
                                    const hex = techPartnersContent.hexagons[pos.idx];
                                    
                                    return (
                                        <div
                                            key={pos.idx}
                                            className={`absolute flex flex-col items-center justify-center text-center px-4 py-8 ${hex.color} shadow-2xl pointer-events-auto transition-transform hover:scale-105 hover:z-50 duration-300`}
                                            style={{
                                                left: pos.x,
                                                top: pos.y,
                                                width: CONTENT_W,
                                                height: CONTENT_H,
                                                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                                zIndex: 10
                                            }}
                                        >
                                            <div className={`flex flex-col items-center w-full justify-center ${pos.idx === 0 ? "translate-y-2.5" : ""}`}>
                                                <h4 className="text-[14px] sm:text-[15.5px] font-black uppercase tracking-[0.1em] mb-2 sm:mb-3 text-white leading-tight px-1 text-center">
                                                    {hex.title}
                                                </h4>
                                                <ul className="flex flex-col gap-0.5 sm:gap-1 w-full text-center">
                                                {hex.items.map((item, itemIdx) => (
                                                    <li key={itemIdx} className="text-[13px] sm:text-[14px] font-medium text-white/95 leading-tight">
                                                        {item}
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>
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
