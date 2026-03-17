"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { approachContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

const roles = ["Business Analyst", "Manual QA", "Release Manager", "Support Engineer"];

export function Approach() {
    const { label, headline, sub, cta } = approachContent;
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#030B3B] py-14 sm:py-20">
            {/* Grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <motion.div style={{ y: bgY }} className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00D4AA]/10 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#1F35A4]/20 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">

                {/* ── Header Row: left title + right stat ── */}
                <motion.div
                    variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}
                    className="flex items-start justify-between gap-8 mb-3"
                >
                    {/* Left */}
                    <div className="flex-1">
                        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#00D4AA] mb-2.5">{label}</p>
                        <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl">
                            {headline}
                        </h2>
                        <p className="mt-2 text-sm font-semibold text-white/70">
                            Lean Engineering Approach.{" "}
                            <span className="text-[#00D4AA]">Zero Handoff Friction.</span>
                        </p>
                    </div>
                    {/* Right — punch stat */}
                    <div className="text-right pt-1 flex-shrink-0">
                        <div className="text-[62px] font-black leading-none tracking-[-3px] text-white">
                            40<span className="text-[#00D4AA] text-[46px]">%</span>
                        </div>
                        <div className="text-[13px] font-semibold text-white/40 mt-1 leading-snug">
                            faster delivery<br />vs. traditional model
                        </div>
                    </div>
                </motion.div>

                {/* Sub sentence */}
                <motion.p
                    variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}
                    className="text-sm text-white/38 leading-[1.75] mb-16 max-w-2xl"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                >
                    {sub}
                </motion.p>

                {/* ── Planet Wave SVG ── */}
                <motion.div
                    variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}
                    className="w-full"
                >
                    <style>{`
                        @keyframes hFloat0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                        @keyframes hFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                        @keyframes hFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
                        @keyframes hFloat3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
                        @keyframes hFloat4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
                        .hpg { cursor:pointer; }
                        .hpg:hover .hs { filter: brightness(1.25) drop-shadow(0 0 14px rgba(0,212,170,0.6)); }
                        .hpg:hover .hlabel { fill:#00D4AA; }
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
                                <stop offset="60%"  stopColor="#00D4AA" stopOpacity="0.88"/>
                                <stop offset="100%" stopColor="#041630" stopOpacity="0.85"/>
                            </radialGradient>
                            {/* Cyan sphere (hero center) */}
                            <radialGradient id="hs3" cx="33%" cy="28%" r="64%">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
                                <stop offset="22%"  stopColor="#b8e8ff" stopOpacity="0.96"/>
                                <stop offset="58%"  stopColor="#00A8FF" stopOpacity="0.9"/>
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
                                <stop offset="0%"   stopColor="#00D4AA" stopOpacity="0.28"/>
                                <stop offset="100%" stopColor="#00D4AA" stopOpacity="0"/>
                            </radialGradient>
                            <radialGradient id="gh2" cx="50%" cy="50%" r="50%">
                                <stop offset="0%"   stopColor="#1F35A4" stopOpacity="0.32"/>
                                <stop offset="100%" stopColor="#1F35A4" stopOpacity="0"/>
                            </radialGradient>
                            <radialGradient id="gh3" cx="50%" cy="50%" r="50%">
                                <stop offset="0%"   stopColor="#00A8FF" stopOpacity="0.35"/>
                                <stop offset="100%" stopColor="#00A8FF" stopOpacity="0"/>
                            </radialGradient>
                            {/* Clip paths */}
                            <clipPath id="hc1"><circle cx="88"  cy="82"  r="30"/></clipPath>
                            <clipPath id="hc2"><circle cx="272" cy="195" r="50"/></clipPath>
                            <clipPath id="hc3"><circle cx="500" cy="68"  r="78"/></clipPath>
                            <clipPath id="hc4"><circle cx="728" cy="218" r="42"/></clipPath>
                            <clipPath id="hc5"><circle cx="922" cy="134" r="32"/></clipPath>
                        </defs>

                        {/* Wave shadow */}
                        <path d="M 88 82 C 140 90, 200 203, 272 195 C 344 187, 390 78, 500 68 C 598 60, 660 225, 728 218 C 798 210, 868 140, 922 134"
                            fill="none" stroke="rgba(0,168,255,0.10)" strokeWidth="5"/>
                        {/* Wave main */}
                        <path d="M 88 82 C 140 90, 200 203, 272 195 C 344 187, 390 78, 500 68 C 598 60, 660 225, 728 218 C 798 210, 868 140, 922 134"
                            fill="none" stroke="rgba(120,170,255,0.30)" strokeWidth="1.8"/>
                        {/* Wave sheen */}
                        <path d="M 88 79 C 140 87, 200 199, 272 191 C 344 183, 390 74, 500 64 C 598 56, 660 221, 728 214 C 798 206, 868 136, 922 130"
                            fill="none" stroke="rgba(210,230,255,0.10)" strokeWidth="1"/>

                        {/* Sparkles */}
                        <circle cx="178" cy="158" r="2.2" fill="rgba(0,212,170,0.45)"/>
                        <circle cx="388" cy="138" r="1.8" fill="rgba(0,168,255,0.40)"/>
                        <circle cx="614" cy="132" r="2.2" fill="rgba(0,212,170,0.42)"/>
                        <circle cx="826" cy="164" r="1.8" fill="rgba(0,168,255,0.36)"/>

                        {/* Halos */}
                        <circle cx="88"  cy="94"  r="44"  fill="url(#gh1)" opacity="0.7"/>
                        <circle cx="272" cy="207" r="66"  fill="url(#gh2)" opacity="0.55"/>
                        <circle cx="500" cy="82"  r="102" fill="url(#gh3)" opacity="0.5"/>
                        <circle cx="728" cy="232" r="56"  fill="url(#gh1)" opacity="0.55"/>
                        <circle cx="922" cy="146" r="46"  fill="url(#gh2)" opacity="0.65"/>

                        {/* ── Planet 1: Discovery & Planning (teal, small, high) ── */}
                        <g className="hpg hfloat-0" style={{ transformOrigin: "88px 82px" }}>
                            <text x="88" y="36" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Discovery &amp; Planning</text>
                            <circle cx="88" cy="82" r="30" fill="url(#hs1)" className="hs"/>
                            <ellipse cx="88" cy="90" rx="28" ry="5.5" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" clipPath="url(#hc1)"/>
                            <text x="88" y="132" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">Developer captures</text>
                            <text x="88" y="145" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">scope directly.</text>
                        </g>

                        {/* ── Planet 2: Dev Project Planning (navy, medium, low) ── */}
                        <g className="hpg hfloat-1" style={{ transformOrigin: "272px 195px" }}>
                            <text x="272" y="129" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Dev Project Planning</text>
                            <circle cx="272" cy="195" r="50" fill="url(#hs2)" className="hs"/>
                            <ellipse cx="272" cy="206" rx="47" ry="9" fill="none" stroke="rgba(100,160,255,0.30)" strokeWidth="1" clipPath="url(#hc2)"/>
                            <text x="272" y="265" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">Developer writes</text>
                            <text x="272" y="278" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">the user stories.</text>
                        </g>

                        {/* ── Planet 3: Engineering Dev & Quality Automation (cyan, large, peak center) ── */}
                        <g className="hpg hfloat-2" style={{ transformOrigin: "500px 68px" }}>
                            <text x="500" y="-20" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="12" fontWeight="700" fill="#00A8FF" className="hlabel">Engineering Dev &amp; Quality Automation</text>
                            <circle cx="500" cy="68" r="78" fill="url(#hs3)" className="hs"/>
                            <ellipse cx="500" cy="82" rx="74" ry="14" fill="none" stroke="rgba(100,160,255,0.25)" strokeWidth="1.5" clipPath="url(#hc3)"/>
                            <text x="500" y="166" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">One engineer owns scope,</text>
                            <text x="500" y="179" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">code &amp; quality.</text>
                        </g>

                        {/* ── Planet 4: Launch & Iterations (teal, medium, low) ── */}
                        <g className="hpg hfloat-3" style={{ transformOrigin: "728px 218px" }}>
                            <text x="728" y="162" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Launch &amp; Iterations</text>
                            <circle cx="728" cy="218" r="42" fill="url(#hs1)" className="hs"/>
                            <ellipse cx="728" cy="228" rx="39" ry="7.5" fill="none" stroke="rgba(100,160,255,0.30)" strokeWidth="1" clipPath="url(#hc4)"/>
                            <text x="728" y="280" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">Same developer</text>
                            <text x="728" y="293" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">drives every release.</text>
                        </g>

                        {/* ── Planet 5: Support & Product Evolution (navy, small, high) ── */}
                        <g className="hpg hfloat-4" style={{ transformOrigin: "922px 134px" }}>
                            <text x="922" y="86" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Support &amp; Product Evolution</text>
                            <circle cx="922" cy="134" r="32" fill="url(#hs2)" className="hs"/>
                            <ellipse cx="922" cy="143" rx="30" ry="5.8" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" clipPath="url(#hc5)"/>
                            <text x="922" y="186" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">Product knowledge</text>
                            <text x="922" y="199" textAnchor="middle" fontFamily="Roboto,sans-serif" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.35)">stays with the team.</text>
                        </g>
                    </svg>
                </motion.div>

                {/* ── Roles Eliminated Row ── */}
                <motion.div
                    variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce}
                    className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/[0.07] pt-8"
                >
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/28 whitespace-nowrap flex-shrink-0"
                        style={{ color: "rgba(255,255,255,0.28)" }}>
                        Roles you no longer need to staff
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                        {roles.map((role) => (
                            <span
                                key={role}
                                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12.5px] font-semibold text-white/55"
                                style={{ color: "rgba(255,255,255,0.55)" }}
                            >
                                <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-red-500/35 bg-red-500/15 text-[10px] font-black text-red-400 leading-none flex-shrink-0">✕</span>
                                {role}
                            </span>
                        ))}
                    </div>
                    <Link
                        href={cta.href}
                        className="ml-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D4AA] to-[#00A8FF] px-6 py-2.5 text-sm font-bold text-[#030B3B] shadow-lg shadow-[#00D4AA]/20 transition-all hover:shadow-[#00D4AA]/40 hover:scale-[1.02] flex-shrink-0"
                    >
                        {cta.label} <ArrowUpRightIcon className="h-4 w-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
