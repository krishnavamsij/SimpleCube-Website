"use client";

import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { techPartnersContent } from "@/content/site-content";
import Image from "next/image";

/* =========================
   RESPONSIVE HONEYCOMB MATH
========================= */

const CONTENT_W = 210;
const CONTENT_H = 182;

const DX = 158;
const DY = 91;

/* Decorative Hexagons */
const DECOR_W = 190;
const DECOR_H = 165;

/* Main Honeycomb Grid */
const mainHexagons = [
    { idx: 3, x: 0, y: DY * 3 },        // FRONTEND
    { idx: 4, x: DX, y: DY * 2 },       // BACKEND
    { idx: 0, x: DX, y: DY * 4 },       // CRM & PLATFORMS
    { idx: 1, x: DX * 2, y: DY },       // CLOUD
    { idx: 5, x: DX * 2, y: DY * 3 },   // QA & DEVOPS
    { idx: 2, x: DX * 3, y: DY * 2 },   // AI & DATA
];

/* Background Decorative Elements */
const decorHexagons = [
    { x: -DX * 1.15, y: DY * 3, w: DECOR_W * 0.85, h: DECOR_H * 0.85, color: "bg-slate-200/50" },
    { x: 0, y: DY * 5, w: DECOR_W * 0.75, h: DECOR_H * 0.75, color: "bg-blue-100/40" },
    { x: -DX, y: DY * 2, w: DECOR_W * 0.7, h: DECOR_H * 0.7, color: "bg-[#00D4AA]/10" },
    { x: 0, y: DY, w: DECOR_W * 0.8, h: DECOR_H * 0.8, color: "bg-slate-100" },
    { x: DX, y: 0, w: DECOR_W, h: DECOR_H, color: "bg-sky-100/40" },
    { x: DX * 3, y: 0, w: DECOR_W * 0.6, h: DECOR_H * 0.6, color: "bg-slate-200/60" },
    { x: DX * 4, y: DY, w: DECOR_W * 0.9, h: DECOR_H * 0.9, color: "bg-slate-200/40" },
    { x: DX * 4, y: DY * 3, w: DECOR_W * 0.9, h: DECOR_H * 0.9, color: "bg-[#1F35A4]/15" },
    { x: DX * 3, y: DY * 4, w: DECOR_W * 0.75, h: DECOR_H * 0.75, color: "bg-slate-300/30" },
    { x: DX * 2, y: DY * 5, w: DECOR_W * 0.7, h: DECOR_H * 0.7, color: "bg-[#1e90ff]/10" },

    // Tiny Floating Decor
    { x: -DX * 1.2, y: DY * 5.5, w: DECOR_W * 0.35, h: DECOR_H * 0.35, color: "bg-slate-200/60" },
    { x: -DX * 0.5, y: -DY * 0.2, w: DECOR_W * 0.25, h: DECOR_H * 0.25, color: "bg-slate-300/50" },
    { x: DX * 1.8, y: -DY * 1.2, w: DECOR_W * 0.3, h: DECOR_H * 0.3, color: "bg-sky-100/60" },
    { x: DX * 4.2, y: -DY * 0.2, w: DECOR_W * 0.25, h: DECOR_H * 0.25, color: "bg-slate-200/60" },
    { x: DX * 4.5, y: DY * 4.5, w: DECOR_W * 0.3, h: DECOR_H * 0.3, color: "bg-slate-300/40" },
];

export function TechPartners() {
    return (
        <section className="relative overflow-hidden bg-white py-[40px] sm:py-[50px] lg:py-[70px]">

            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

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

                            {/* Partner Logos */}
                            <div className="flex flex-wrap items-center gap-x-8 sm:gap-x-10 gap-y-7 opacity-95 w-full">

                                {techPartnersContent.partners.map((partner, index) => {
                                    const img = (
                                        <div
                                            key={index}
                                            className="relative h-9 sm:h-11 w-28 sm:w-32 flex-shrink-0"
                                        >
                                            <Image
                                                src={partner.src}
                                                alt={partner.name}
                                                fill
                                                className="object-contain object-left"
                                            />
                                        </div>
                                    );

                                    return index === 2
                                        ? [img, <div key="break" className="basis-full h-0" />]
                                        : img;
                                })}
                            </div>

                        </motion.div>
                    </div>

                    {/* =========================
                       RIGHT SIDE HONEYCOMB
                    ========================= */}

                    <div className="relative w-full lg:w-[52%] flex justify-center overflow-visible">

                        <motion.div
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="
                                relative
                                w-full
                                max-w-[760px]
                                h-[420px]
                                sm:h-[520px]
                                md:h-[620px]
                                lg:h-[680px]
                                overflow-visible
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
                                        scale-[0.40]
                                        sm:scale-[0.55]
                                        md:scale-[0.68]
                                        lg:scale-[0.78]
                                        xl:scale-[0.9]
                                        origin-center
                                        mx-auto
                                    "
                                    style={{
                                        width: "950px",
                                        height: "760px",
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
                                                }}
                                            />
                                        );
                                    })}

                                    {/* Main Honeycomb */}
                                    {mainHexagons.map((pos) => {
                                        const hex = techPartnersContent.hexagons[pos.idx];

                                        return (
                                            <div
                                                key={pos.idx}
                                                className={`
                                                    absolute
                                                    flex
                                                    flex-col
                                                    items-center
                                                    justify-center
                                                    text-center
                                                    px-4
                                                    py-8
                                                    ${hex.color}
                                                    shadow-2xl
                                                    transition-transform
                                                    duration-300
                                                    hover:scale-105
                                                    hover:z-50
                                                `}
                                                style={{
                                                    left: pos.x,
                                                    top: pos.y,
                                                    width: CONTENT_W,
                                                    height: CONTENT_H,
                                                    clipPath:
                                                        "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                                }}
                                            >

                                                <div className="flex flex-col items-center justify-center w-full">

                                                    <h4 className="text-[14px] sm:text-[15px] font-black uppercase tracking-[0.1em] mb-3 text-white leading-tight">
                                                        {hex.title}
                                                    </h4>

                                                    <ul className="flex flex-col gap-1 w-full text-center">
                                                        {hex.items.map((item, itemIdx) => (
                                                            <li
                                                                key={itemIdx}
                                                                className="text-[13px] sm:text-[14px] font-medium text-white/95 leading-tight"
                                                            >
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>

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