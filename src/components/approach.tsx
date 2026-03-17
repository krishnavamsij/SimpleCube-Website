"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { approachContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

// Planet wave data — 5 stages on a bezier wave path (Hyniva brand colors)
const planets = [
    { cx: 88,  cy: 82,  r: 30, label: "Discovery",    sub: "Plan fast,\nscope early",   gid: "p1", above: true  },
    { cx: 272, cy: 195, r: 50, label: "Dev Planning",  sub: "Developer-led\nstories",      gid: "p2", above: false },
    { cx: 500, cy: 68,  r: 78, label: "Engineering",   sub: "Full lifecycle\nownership",    gid: "p3", above: true  },
    { cx: 728, cy: 218, r: 42, label: "Launch",        sub: "Same dev,\nevery release",   gid: "p4", above: false },
    { cx: 922, cy: 134, r: 32, label: "Support",       sub: "Knowledge\nstays in team",   gid: "p5", above: true  },
];

export function Approach() {
    const { label, headline, sub, cta } = approachContent;
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#030B3B] py-20 sm:py-28">
            {/* Grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <motion.div
                style={{ y: bgY }}
                className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00D4AA]/10 blur-[120px]"
            />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#1F35A4]/20 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6">
                {/* ── Top: Heading ── */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 mb-14">
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="max-w-xl"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4AA]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
                            {label}
                        </span>
                        <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
                            {headline}
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-[17px]">
                            {sub}
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#00D4AA] to-transparent" />
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">proven results</span>
                        </div>
                        <Link
                            href={cta.href}
                            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00D4AA] to-[#00A8FF] px-7 py-3.5 text-sm font-bold text-[#030B3B] shadow-lg shadow-[#00D4AA]/20 transition-all hover:shadow-[#00D4AA]/40 hover:scale-[1.02]"
                        >
                            {cta.label}
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>

                {/* ── Planet Wave Diagram ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="relative w-full overflow-visible"
                >
                    <style>{`
                        @keyframes floatA { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
                        @keyframes floatB { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
                        @keyframes floatC { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
                        @keyframes pulse-glow { 0%,100% { opacity: 0.5; r: 44; } 50% { opacity: 0.85; r: 58; } }
                        .planet-group { cursor: pointer; }
                        .planet-group:hover .planet-sphere { filter: brightness(1.3) drop-shadow(0 0 18px #00D4AA88); }
                        .planet-group:hover .planet-label { fill: #00D4AA; }
                        .f-a { animation: floatA 6s ease-in-out infinite; }
                        .f-b { animation: floatB 8s ease-in-out infinite; }
                        .f-c { animation: floatC 7s ease-in-out infinite 1s; }
                        .f-d { animation: floatB 9s ease-in-out infinite 2s; }
                        .f-e { animation: floatA 6.5s ease-in-out infinite 0.5s; }
                    `}</style>

                    <svg
                        width="100%"
                        viewBox="0 0 1020 310"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ overflow: "visible", display: "block" }}
                    >
                        <defs>
                            {/* Hyniva teal sphere gradient */}
                            <radialGradient id="hs1" cx="33%" cy="28%" r="64%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
                                <stop offset="25%"  stopColor="#a8f0e8" stopOpacity="0.95"/>
                                <stop offset="60%"  stopColor="#00D4AA" stopOpacity="0.9"/>
                                <stop offset="100%" stopColor="#030B3B" stopOpacity="0.85"/>
                            </radialGradient>
                            {/* Hyniva cyan sphere gradient (larger center planet) */}
                            <radialGradient id="hs3" cx="33%" cy="28%" r="64%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
                                <stop offset="22%"  stopColor="#b8e8ff" stopOpacity="0.96"/>
                                <stop offset="58%"  stopColor="#00A8FF" stopOpacity="0.92"/>
                                <stop offset="100%" stopColor="#030B3B" stopOpacity="0.85"/>
                            </radialGradient>
                            {/* Hyniva navy sphere gradient */}
                            <radialGradient id="hs2" cx="33%" cy="28%" r="64%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
                                <stop offset="28%"  stopColor="#aab8ff" stopOpacity="0.95"/>
                                <stop offset="65%"  stopColor="#1F35A4" stopOpacity="0.9"/>
                                <stop offset="100%" stopColor="#030B3B" stopOpacity="0.85"/>
                            </radialGradient>
                            {/* Glow halos — teal */}
                            <radialGradient id="gh1" cx="50%" cy="50%" r="50%">
                                <stop offset="0%"   stopColor="#00D4AA" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#00D4AA" stopOpacity="0"/>
                            </radialGradient>
                            {/* Glow halo — cyan (large center) */}
                            <radialGradient id="gh3" cx="50%" cy="50%" r="50%">
                                <stop offset="0%"   stopColor="#00A8FF" stopOpacity="0.35"/>
                                <stop offset="100%" stopColor="#00A8FF" stopOpacity="0"/>
                            </radialGradient>
                            {/* Clip paths for equator rings */}
                            <clipPath id="hc1"><circle cx="88"  cy="82"  r="30"/></clipPath>
                            <clipPath id="hc2"><circle cx="272" cy="195" r="50"/></clipPath>
                            <clipPath id="hc3"><circle cx="500" cy="68"  r="78"/></clipPath>
                            <clipPath id="hc4"><circle cx="728" cy="218" r="42"/></clipPath>
                            <clipPath id="hc5"><circle cx="922" cy="134" r="32"/></clipPath>
                        </defs>

                        {/* ── Wave paths ── */}
                        {/* Shadow wave */}
                        <path d="M 88 82 C 140 90, 200 203, 272 195 C 344 187, 390 78, 500 68 C 598 60, 660 225, 728 218 C 798 210, 868 140, 922 134"
                            fill="none" stroke="rgba(0,212,170,0.08)" strokeWidth="6"/>
                        {/* Main wave */}
                        <path d="M 88 82 C 140 90, 200 203, 272 195 C 344 187, 390 78, 500 68 C 598 60, 660 225, 728 218 C 798 210, 868 140, 922 134"
                            fill="none" stroke="rgba(0,212,170,0.28)" strokeWidth="1.8"/>
                        {/* Highlight wave */}
                        <path d="M 88 79 C 140 87, 200 199, 272 191 C 344 183, 390 74, 500 64 C 598 56, 660 221, 728 214 C 798 206, 868 136, 922 130"
                            fill="none" stroke="rgba(0,168,255,0.12)" strokeWidth="1"/>

                        {/* Sparkle dots */}
                        <circle cx="178" cy="158" r="2.2" fill="rgba(0,212,170,0.5)"/>
                        <circle cx="388" cy="138" r="1.8" fill="rgba(0,168,255,0.45)"/>
                        <circle cx="614" cy="132" r="2.2" fill="rgba(0,212,170,0.48)"/>
                        <circle cx="826" cy="164" r="1.8" fill="rgba(0,168,255,0.4)"/>

                        {/* ── Glow halos ── */}
                        <circle cx="88"  cy="94"  r="44"  fill="url(#gh1)" opacity="0.7"/>
                        <circle cx="272" cy="207" r="66"  fill="url(#gh1)" opacity="0.55"/>
                        <circle cx="500" cy="82"  r="102" fill="url(#gh3)" opacity="0.5"/>
                        <circle cx="728" cy="232" r="56"  fill="url(#gh1)" opacity="0.55"/>
                        <circle cx="922" cy="146" r="46"  fill="url(#gh1)" opacity="0.65"/>

                        {/* ── Planet 1: Discovery (teal, float-a) ── */}
                        <g className="planet-group f-a" style={{ transformOrigin: "88px 82px" }}>
                            <text x="88" y="32" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="11" fontWeight="700" fill="#00D4AA" className="planet-label">Discovery &amp; Planning</text>
                            <circle cx="88" cy="82" r="30" fill="url(#hs1)" className="planet-sphere"/>
                            <ellipse cx="88" cy="90" rx="28" ry="5.5" fill="none" stroke="rgba(0,212,170,0.35)" strokeWidth="1" clipPath="url(#hc1)"/>
                            <text x="88" y="130" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">Plan fast,</text>
                            <text x="88" y="142" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">scope early</text>
                        </g>

                        {/* ── Planet 2: Dev Planning (navy, float-b) ── */}
                        <g className="planet-group f-b" style={{ transformOrigin: "272px 195px" }}>
                            <text x="272" y="128" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="11" fontWeight="700" fill="#00D4AA" className="planet-label">Dev Planning</text>
                            <circle cx="272" cy="195" r="50" fill="url(#hs2)" className="planet-sphere"/>
                            <ellipse cx="272" cy="206" rx="47" ry="9" fill="none" stroke="rgba(0,168,255,0.3)" strokeWidth="1" clipPath="url(#hc2)"/>
                            <text x="272" y="263" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">Developer-led</text>
                            <text x="272" y="275" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">stories</text>
                        </g>

                        {/* ── Planet 3: Engineering (cyan, float-c — CENTER HERO) ── */}
                        <g className="planet-group f-c" style={{ transformOrigin: "500px 68px" }}>
                            <text x="500" y="-18" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="12" fontWeight="700" fill="#00A8FF" className="planet-label">Engineering &amp; Quality</text>
                            <circle cx="500" cy="68" r="78" fill="url(#hs3)" className="planet-sphere"/>
                            <ellipse cx="500" cy="82" rx="74" ry="14" fill="none" stroke="rgba(0,168,255,0.25)" strokeWidth="1.5" clipPath="url(#hc3)"/>
                            <text x="500" y="163" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">Full lifecycle</text>
                            <text x="500" y="175" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">ownership</text>
                        </g>

                        {/* ── Planet 4: Launch (teal, float-d) ── */}
                        <g className="planet-group f-d" style={{ transformOrigin: "728px 218px" }}>
                            <text x="728" y="162" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="11" fontWeight="700" fill="#00D4AA" className="planet-label">Launch &amp; Iteration</text>
                            <circle cx="728" cy="218" r="42" fill="url(#hs1)" className="planet-sphere"/>
                            <ellipse cx="728" cy="228" rx="39" ry="7.5" fill="none" stroke="rgba(0,212,170,0.3)" strokeWidth="1" clipPath="url(#hc4)"/>
                            <text x="728" y="278" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">Same dev,</text>
                            <text x="728" y="290" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">every release</text>
                        </g>

                        {/* ── Planet 5: Support (navy, float-e) ── */}
                        <g className="planet-group f-e" style={{ transformOrigin: "922px 134px" }}>
                            <text x="922" y="85" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="11" fontWeight="700" fill="#00D4AA" className="planet-label">Support &amp; Evolution</text>
                            <circle cx="922" cy="134" r="32" fill="url(#hs2)" className="planet-sphere"/>
                            <ellipse cx="922" cy="143" rx="30" ry="5.8" fill="none" stroke="rgba(0,212,170,0.35)" strokeWidth="1" clipPath="url(#hc5)"/>
                            <text x="922" y="183" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">Knowledge</text>
                            <text x="922" y="195" textAnchor="middle" fontFamily="Roboto, sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.38)">stays in team</text>
                        </g>
                    </svg>
                </motion.div>

                {/* Bottom caption */}
                <p className="mt-6 text-center text-xs text-slate-500">
                    Based on 20+ years of enterprise delivery benchmarks
                </p>
            </div>
        </section>
    );
}
