"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollReveal, viewportRepeat } from "@/lib/animations";
import { approachContent } from "@/content/site-content";
import { CONTAINER_CLASS } from "@/lib/container-utils";

const roles = ["Account Manager Layers", "Junior Bench Handoffs", "Status-Meeting Overhead", "Rigid Change Queues"];

const steps = [
    {
        number: "01",
        title: "Discovery & Sprint Planning",
        description: "Scope captured with senior engineers directly.",
        color: "text-[#3886CE]",
        bgColor: "bg-[#3886CE]/10",
        borderColor: "border-[#3886CE]/30 shadow-[0_0_10px_rgba(56,134,206,0.15)]",
    },
    {
        number: "02",
        title: "Frontend Engineering",
        description: "Responsive UIs in Angular and React.",
        color: "text-[#3886CE]",
        bgColor: "bg-[#3886CE]/10",
        borderColor: "border-[#3886CE]/30 shadow-[0_0_10px_rgba(30,144,255,0.15)]",
    },
    {
        number: "03",
        title: "Backend & Architecture",
        description: "Robust APIs with Java, Node.js & more.",
        color: "text-[#3886CE]",
        bgColor: "bg-[#3886CE]/10",
        borderColor: "border-[#3886CE]/30 shadow-[0_0_10px_rgba(56,134,206,0.15)]",
        isHero: true,
    },
    {
        number: "04",
        title: "Agile Delivery Sprints",
        description: "Rapid cycles with continuous client touchpoints.",
        color: "text-[#3886CE]",
        bgColor: "bg-[#3886CE]/10",
        borderColor: "border-[#3886CE]/30 shadow-[0_0_10px_rgba(56,134,206,0.15)]",
    },
    {
        number: "05",
        title: "Launch & Iteration",
        description: "MVP to market, then data-driven enhancements.",
        color: "text-[#3886CE]",
        bgColor: "bg-[#3886CE]/10",
        borderColor: "border-[#3886CE]/30 shadow-[0_0_10px_rgba(30,144,255,0.15)]",
    },
];

const lineGradients = [
    "from-[#3886CE]/40 to-[#3886CE]/40",
    "from-[#3886CE]/40 to-[#3886CE]/40",
    "from-[#3886CE]/40 to-[#3886CE]/40",
    "from-[#3886CE]/40 to-[#3886CE]/40",
];

export function Approach() {
    const { label, headline, sub } = approachContent;
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#0A2F52] py-[30px] sm:py-[40px] lg:py-[50px]">

            <motion.div style={{ y: bgY }} className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#3886CE]/10 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#1F35A4]/20 blur-[100px]" />

            <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">

                {/* ── Header Row: left title + right stat ── */}
                <motion.div
                    variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportRepeat}
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 mb-2"
                >
                    {/* Left: Headline & Callout */}
                    <div className="flex-1 w-full lg:max-w-2xl">
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3886CE] bg-[#3886CE]/[0.08] border border-[#3886CE]/25 rounded-full px-4 sm:px-5 py-1.5 mb-4 sm:mb-6 font-display">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3886CE] shadow-[0_0_8px_#3886CE] animate-pulse" />
                            {label}
                        </div>
                        <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] 2xl:text-[52px] font-extrabold leading-[1.1] tracking-tight text-white mb-4 sm:mb-6 font-display">
                            {headline.split("Model").map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && <span className="text-[#3886CE]">Model.</span>}
                                </span>
                            ))}
                        </h2>
                        <p className="text-[15px] font-medium leading-[1.7] text-white/70">
                            {sub}
                        </p>
                    </div>

                    {/* Right: Punch Stat (Top Aligned to Label) */}
                    <div className="flex flex-col items-center lg:items-end text-center lg:text-right flex-shrink-0 mt-6 lg:mt-0 w-full lg:w-auto">
                        <div className="text-[56px] sm:text-[64px] lg:text-[72px] font-black leading-[0.85] tracking-[-3px] text-white font-display">
                            40<span className="text-white text-[40px] sm:text-[48px] lg:text-[52px]">%</span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold mt-2 lg:mt-3 leading-[1.3] text-white/70 font-display tracking-[2px] uppercase text-balance">
                            faster delivery vs. traditional model
                        </div>
                    </div>
                </motion.div>

                {/* ── Roles Eliminated Row (Moved directly above spheres) ── */}
                <motion.div
                    variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportRepeat}
                    className="mt-10 lg:mt-12 mb-8 lg:mb-10 flex flex-col items-center justify-center gap-5 pt-1"
                >
                    <span className="font-display text-[10px] sm:text-[11px] font-bold tracking-[2px] uppercase text-white/70 text-center">
                        What large agencies typically add
                    </span>
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {roles.map((role) => (
                            <span
                                key={role}
                                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-[11px] font-semibold text-white/90 shadow-sm font-display uppercase tracking-wider"
                            >
                                <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-red-500/50 bg-red-500/20 text-[10px] font-black text-red-400 leading-none flex-shrink-0">✕</span>
                                {role}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* ── Mobile/Tablet Stacked List ── */}
                <motion.div
                    variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportRepeat}
                    className="lg:hidden w-full max-w-xl mx-auto mt-12 flex flex-col gap-6 px-4"
                >
                    <div className="relative flex flex-col gap-8">
                        {steps.map((step, idx) => (
                            <div key={step.number} className="relative flex gap-4 sm:gap-6 items-start group">
                                <div className="flex flex-col items-center flex-shrink-0 self-stretch relative">
                                    <div className={`relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 ${step.borderColor} ${step.color} font-bold text-sm sm:text-base font-display flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110`}>
                                        <div className="absolute inset-0 bg-[#0A2F52] rounded-full -z-10" />
                                        <div className={`absolute inset-0 ${step.bgColor} rounded-full -z-10`} />
                                        {step.number}
                                    </div>
                                    {/* Connecting line segment */}
                                    {idx < steps.length - 1 && (
                                        <div className={`absolute w-[2px] left-1/2 -translate-x-1/2 top-10 sm:top-12 bottom-[-32px] bg-gradient-to-b z-0 ${lineGradients[idx]}`} />
                                    )}
                                </div>
                                <div className="flex-1 pt-1 sm:pt-2 min-w-0 text-left">
                                    <h3 className={`text-[15px] sm:text-[17px] font-bold font-display leading-tight mb-1.5 text-left ${step.isHero ? 'text-[#3886CE]' : 'text-white'} transition-colors duration-300 group-hover:text-[#3886CE]`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/70 font-medium text-left">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Planet Wave SVG ── */}
                <motion.div
                    variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportRepeat}
                    className="w-full hidden lg:flex justify-center mt-20 lg:mt-32 mb-[-30px] lg:mb-[-50px]"
                >
                    <style>{`
                        @keyframes hFloat0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                        @keyframes hFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                        @keyframes hFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
                        @keyframes hFloat3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
                        @keyframes hFloat4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
                        .hpg { cursor:pointer; }
                        .hpg:hover .hs { filter: brightness(1.25) drop-shadow(0 0 14px rgba(56,134,206,0.6)); }
                        .hpg:hover .hlabel { fill:#3886CE; }
                        .hfloat-0 { animation: hFloat0 5s ease-in-out infinite 0s; }
                        .hfloat-1 { animation: hFloat1 6s ease-in-out infinite 0.8s; }
                        .hfloat-2 { animation: hFloat2 4.5s ease-in-out infinite 1.6s; }
                        .hfloat-3 { animation: hFloat3 5.5s ease-in-out infinite 0.4s; }
                        .hfloat-4 { animation: hFloat4 4.8s ease-in-out infinite 1.2s; }
                    `}</style>

                    <svg width="100%" viewBox="0 0 1020 360" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible", display: "block" }}>
                        <defs>
                            {/* Teal sphere */}
                            <radialGradient id="hs1" cx="33%" cy="28%" r="64%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
                                <stop offset="25%"  stopColor="#a8f0e8" stopOpacity="0.95"/>
                                <stop offset="60%"  stopColor="#3886CE" stopOpacity="0.88"/>
                                <stop offset="100%" stopColor="#041630" stopOpacity="0.85"/>
                            </radialGradient>
                            {/* Cyan sphere (hero center) */}
                            <radialGradient id="hs3" cx="33%" cy="28%" r="64%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
                                <stop offset="22%"  stopColor="#b8e8ff" stopOpacity="0.96"/>
                                <stop offset="58%"  stopColor="#3886CE" stopOpacity="0.9"/>
                                <stop offset="100%" stopColor="#041630" stopOpacity="0.85"/>
                            </radialGradient>
                            {/* Navy sphere */}
                            <radialGradient id="hs2" cx="33%" cy="28%" r="64%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
                                <stop offset="28%"  stopColor="#aab8ff" stopOpacity="0.95"/>
                                <stop offset="65%"  stopColor="#1F35A4" stopOpacity="0.88"/>
                                <stop offset="100%" stopColor="#041630" stopOpacity="0.85"/>
                            </radialGradient>
                            {/* Glow halos */}
                            <radialGradient id="gh1" cx="50%" cy="50%" r="50%">
                                <stop offset="0%"   stopColor="#3886CE" stopOpacity="0.28"/>
                                <stop offset="100%" stopColor="#3886CE" stopOpacity="0"/>
                            </radialGradient>
                            <radialGradient id="gh2" cx="50%" cy="50%" r="50%">
                                <stop offset="0%"   stopColor="#1F35A4" stopOpacity="0.32"/>
                                <stop offset="100%" stopColor="#1F35A4" stopOpacity="0"/>
                            </radialGradient>
                            <radialGradient id="gh3" cx="50%" cy="50%" r="50%">
                                <stop offset="0%"   stopColor="#3886CE" stopOpacity="0.35"/>
                                <stop offset="100%" stopColor="#3886CE" stopOpacity="0"/>
                            </radialGradient>
                            {/* Clip paths */}
                            <clipPath id="hc1"><circle cx="88"  cy="82"  r="30"/></clipPath>
                            <clipPath id="hc2"><circle cx="272" cy="195" r="50"/></clipPath>
                            <clipPath id="hc3"><circle cx="500" cy="68"  r="78"/></clipPath>
                            <clipPath id="hc4"><circle cx="728" cy="218" r="42"/></clipPath>
                            <clipPath id="hc5"><circle cx="922" cy="134" r="32"/></clipPath>
                        </defs>

                        {/* Wave shadow */}
                        <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 88 82 C 140 90, 200 203, 272 195 C 344 187, 390 78, 500 68 C 598 60, 660 225, 728 218 C 798 210, 868 140, 922 134"
                            fill="none" stroke="rgba(56,134,206,0.10)" strokeWidth="5"
                        />
                        {/* Wave main */}
                        <motion.path 
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 88 82 C 140 90, 200 203, 272 195 C 344 187, 390 78, 500 68 C 598 60, 660 225, 728 218 C 798 210, 868 140, 922 134"
                            fill="none" stroke="rgba(120,170,255,0.30)" strokeWidth="1.8"
                        />
                        {/* Wave sheen */}
                        <motion.path 
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 88 79 C 140 87, 200 199, 272 191 C 344 183, 390 74, 500 64 C 598 56, 660 221, 728 214 C 798 206, 868 136, 922 130"
                            fill="none" stroke="rgba(210,230,255,0.10)" strokeWidth="1"
                        />

                        {/* Sparkles */}
                        <circle cx="178" cy="158" r="2.2" fill="rgba(56,134,206,0.45)"/>
                        <circle cx="388" cy="138" r="1.8" fill="rgba(56,134,206,0.40)"/>
                        <circle cx="614" cy="132" r="2.2" fill="rgba(56,134,206,0.42)"/>
                        <circle cx="826" cy="164" r="1.8" fill="rgba(56,134,206,0.36)"/>

                        {/* Halos */}
                        <circle cx="88"  cy="94"  r="44"  fill="url(#gh1)" opacity="0.7"/>
                        <circle cx="272" cy="207" r="66"  fill="url(#gh2)" opacity="0.55"/>
                        <circle cx="500" cy="82"  r="102" fill="url(#gh3)" opacity="0.5"/>
                        <circle cx="728" cy="232" r="56"  fill="url(#gh1)" opacity="0.55"/>
                        <circle cx="922" cy="146" r="46"  fill="url(#gh2)" opacity="0.65"/>

                        {/* ── Planet 1: Discovery & Sprint Planning ── */}
                        <g className="hpg hfloat-0" style={{ transformOrigin: "88px 82px" }}>
                            <text x="88" y="36" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontWeight="700" fill="#3886CE" className="hlabel">Discovery &amp; Sprint Planning</text>
                            <circle cx="88" cy="82" r="30" fill="url(#hs1)" className="hs"/>
                            <ellipse cx="88" cy="90" rx="28" ry="5.5" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" clipPath="url(#hc1)"/>
                            <text x="88" y="132" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">Senior engineers</text>
                            <text x="88" y="145" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">capture scope.</text>
                        </g>

                        {/* ── Planet 2: Frontend Engineering ── */}
                        <g className="hpg hfloat-1" style={{ transformOrigin: "272px 195px" }}>
                            <text x="272" y="129" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontWeight="700" fill="#3886CE" className="hlabel">Frontend Engineering</text>
                            <circle cx="272" cy="195" r="50" fill="url(#hs2)" className="hs"/>
                            <ellipse cx="272" cy="206" rx="47" ry="9" fill="none" stroke="rgba(100,160,255,0.30)" strokeWidth="1" clipPath="url(#hc2)"/>
                            <text x="272" y="265" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">Angular &amp; React</text>
                            <text x="272" y="278" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">responsive UIs.</text>
                        </g>

                        {/* ── Planet 3: Backend & Architecture ── */}
                        <g className="hpg hfloat-2" style={{ transformOrigin: "500px 68px" }}>
                            <text x="500" y="-20" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="12" fontWeight="700" fill="#3886CE" className="hlabel">Backend &amp; Architecture</text>
                            <circle cx="500" cy="68" r="78" fill="url(#hs3)" className="hs"/>
                            <ellipse cx="500" cy="82" rx="74" ry="14" fill="none" stroke="rgba(100,160,255,0.25)" strokeWidth="1.5" clipPath="url(#hc3)"/>
                            <text x="500" y="166" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">Java, Node.js &amp; APIs</text>
                            <text x="500" y="179" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">built for scale.</text>
                        </g>

                        {/* ── Planet 4: Agile Delivery Sprints ── */}
                        <g className="hpg hfloat-3" style={{ transformOrigin: "728px 218px" }}>
                            <text x="728" y="162" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontWeight="700" fill="#3886CE" className="hlabel">Agile Delivery Sprints</text>
                            <circle cx="728" cy="218" r="42" fill="url(#hs1)" className="hs"/>
                            <ellipse cx="728" cy="228" rx="39" ry="7.5" fill="none" stroke="rgba(100,160,255,0.30)" strokeWidth="1" clipPath="url(#hc4)"/>
                            <text x="728" y="280" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">Rapid cycles with</text>
                            <text x="728" y="293" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">client touchpoints.</text>
                        </g>

                        {/* ── Planet 5: Launch & Iteration ── */}
                        <g className="hpg hfloat-4" style={{ transformOrigin: "922px 134px" }}>
                            <text x="922" y="86" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontWeight="700" fill="#3886CE" className="hlabel">Launch &amp; Iteration</text>
                            <circle cx="922" cy="134" r="32" fill="url(#hs2)" className="hs"/>
                            <ellipse cx="922" cy="143" rx="30" ry="5.8" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" clipPath="url(#hc5)"/>
                            <text x="922" y="186" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">MVP to market,</text>
                            <text x="922" y="199" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.7)">then iterate fast.</text>
                        </g>
                    </svg>
                </motion.div>


            </div>
        </section>
    );
}
