"use client";

import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { techPartnersContent } from "@/content/site-content";
import Image from "next/image";

/* =========================
   RESPONSIVE HONEYCOMB MATH
========================= */

const CONTENT_W = 240;
const CONTENT_H = 208;

const DX = 180;
const DY = 104;

/* Decorative Hexagons */
const DECOR_W = 210;
const DECOR_H = 182;

/* Main Honeycomb Grid */
const mainHexagons = [
    { idx: 3, x: DX, y: DY * 4 },       // FRONTEND (Adobe moved to removed position)
    { idx: 4, x: DX, y: DY * 2 },       // BACKEND
    { idx: 1, x: DX * 2, y: DY },       // CLOUD
    { idx: 5, x: DX * 2, y: DY * 3 },   // QA & DEVOPS (Salesforce)
    { idx: 2, x: DX * 3, y: DY * 2 },   // AI & DATA
];

/* Background Decorative Elements */
const decorHexagons = [
    { x: -DX * 0.8, y: DY * 4.2, w: DECOR_W * 0.85, h: DECOR_H * 0.85, color: "bg-slate-200/50" },
    { x: 0, y: DY * 5, w: DECOR_W * 0.75, h: DECOR_H * 0.75, color: "bg-blue-100/40" },
    { x: -DX * 0.2, y: DY * 2.5, w: DECOR_W * 0.7, h: DECOR_H * 0.7, color: "bg-[#00D4AA]/10" },
    { x: DX * 0.15, y: DY, w: DECOR_W * 0.8, h: DECOR_H * 0.8, color: "bg-slate-100" },
    { x: DX * 1.15, y: 0, w: DECOR_W, h: DECOR_H, color: "bg-sky-100/40" },
    { x: DX * 3.15, y: 0, w: DECOR_W * 0.6, h: DECOR_H * 0.6, color: "bg-slate-200/60" },
    { x: DX * 4.15, y: DY, w: DECOR_W * 0.9, h: DECOR_H * 0.9, color: "bg-slate-200/40" },
    { x: DX * 4.15, y: DY * 3, w: DECOR_W * 0.9, h: DECOR_H * 0.9, color: "bg-[#1F35A4]/15" },
    { x: DX * 3.15, y: DY * 4, w: DECOR_W * 0.75, h: DECOR_H * 0.75, color: "bg-slate-300/30" },
    { x: DX * 2.15, y: DY * 5, w: DECOR_W * 0.7, h: DECOR_H * 0.7, color: "bg-[#1e90ff]/10" },

    // Tiny Floating Decor
    { x: -DX * 1.2, y: DY * 5.5, w: DECOR_W * 0.35, h: DECOR_H * 0.35, color: "bg-slate-200/60" },
    { x: -DX * 0.5, y: -DY * 0.2, w: DECOR_W * 0.25, h: DECOR_H * 0.25, color: "bg-slate-300/50" },
    { x: DX * 1.95, y: -DY * 1.2, w: DECOR_W * 0.3, h: DECOR_H * 0.3, color: "bg-sky-100/60" },
    { x: DX * 4.35, y: -DY * 0.2, w: DECOR_W * 0.25, h: DECOR_H * 0.25, color: "bg-slate-200/60" },
    { x: DX * 4.65, y: DY * 4.5, w: DECOR_W * 0.3, h: DECOR_H * 0.3, color: "bg-slate-300/40" },
];

export function TechPartners() {
    return (
        <section className="relative overflow-hidden bg-white pt-[24px] sm:pt-[50px] lg:pt-[70px] pb-[8px] sm:pb-[15px] lg:pb-[20px]">

            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">

                    {/* =========================
                       LEFT SIDE CONTENT
                    ========================= */}

                    <div className="w-full lg:w-[46%] relative z-20">

                        <motion.div
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                        >

                            {/* Eyebrow */}
                            <div className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 mb-6">
                                <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                                {techPartnersContent.label}
                            </div>

                            {/* Heading */}
                            <h2 className="text-[32px] sm:text-[44px] lg:text-[56px] font-extrabold tracking-tight leading-[1.05] text-slate-900 mb-5 max-w-xl">
                                Built on the platforms
                                <br />
                                you already{" "}
                                <span className="text-[#00D4AA]">
                                    trust.
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="text-[17px] sm:text-lg text-slate-600 font-medium leading-[1.7] mb-10 max-w-xl">
                                {techPartnersContent.sub}
                            </p>



                        </motion.div>
                    </div>

                    {/* =========================
                       RIGHT SIDE HONEYCOMB
                    ========================= */}

                    <div className="relative w-full lg:w-[52%] flex justify-start overflow-visible -ml-12 sm:-ml-6 md:-ml-8 lg:-ml-4 xl:-ml-12 2xl:-ml-20 pl-0 sm:pl-2 md:pl-4 lg:pl-0">

                        <motion.div
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="
                                relative
                                w-full
                                max-w-[600px]
                                sm:max-w-[760px]
                                h-[290px]
                                sm:h-[400px]
                                md:h-[500px]
                                lg:h-[560px]
                                xl:h-[640px]
                                overflow-visible
                                lg:-translate-x-4
                                xl:-translate-x-8
                            "
                        >

                            {/* CENTER WRAPPER */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <div
                                    className="
                                        relative
                                        scale-[0.32]
                                        sm:scale-[0.45]
                                        md:scale-[0.60]
                                        lg:scale-[0.70]
                                        xl:scale-[0.80]
                                        origin-center
                                        mx-auto
                                    "
                                    style={{
                                        width: "1050px",
                                        height: "820px",
                                    }}
                                >

                                    {/* Decorative Hexagons */}
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
                                                    clipPath:
                                                        "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                                    zIndex: 1,
                                                }}
                                            />
                                        );
                                    })}

                                    {/* Main Honeycomb */}
                                    {mainHexagons.map((pos) => {
                                        const hex = techPartnersContent.hexagons[pos.idx] as {
                                            title: string;
                                            items: string[];
                                            color: string;
                                            logo?: string;
                                        };

                                        return (
                                            <div
                                                key={pos.idx}
                                                className={`absolute flex flex-col items-center justify-center text-center ${hex.color} shadow-2xl transition-transform duration-300 hover:scale-105 hover:z-50`}
                                                style={{
                                                    left: pos.x,
                                                    top: pos.y,
                                                    width: CONTENT_W,
                                                    height: CONTENT_H,
                                                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                                    zIndex: 10,
                                                }}
                                            >
                                                <div className="flex flex-col items-center justify-center w-full px-6">
                                                    {hex.logo && (
                                                        <div className="relative w-[85%] h-[70px]">
                                                            <Image
                                                                src={hex.logo}
                                                                alt={hex.title}
                                                                fill
                                                                className={`object-contain brightness-0 invert ${hex.title === 'Salesforce' ? 'scale-125' : ''}`}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}