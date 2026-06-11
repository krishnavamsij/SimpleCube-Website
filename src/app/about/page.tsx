"use client";

import React, { useRef, useState, useEffect } from "react";

import Image from "next/image";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { DigitalGlobe } from "@/components/digital-globe";
import { Zap, Lightbulb, Users, Target, Shield, Rocket, Gauge } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { aboutContent } from "@/content/about";
import { approachContent } from "@/content/site-content";

/* ─────────────── Icon Map ─────────────── */

const iconMap: Record<string, React.ElementType> = {
    Zap,
    Lightbulb,
    Users,
    Target,
    Shield,
    Rocket
};

/* ─────────────── Animations ─────────────── */
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const viewportOnce = { once: true, margin: "-100px" };

/* ─────────────── Hero Section ─────────────── */

function AboutHero() {
    return (
        <section className="relative overflow-hidden bg-[#030b1e] h-screen min-h-[700px] w-full flex items-center pt-16">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#020918] via-[#020918]/85 to-transparent" />

            {/* 3D Digital Globe (Canvas) */}
            <div className="hidden lg:block absolute top-[10%] right-[-10%] w-[60%] max-w-[900px] aspect-square pointer-events-none z-0">
                <DigitalGlobe />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="w-full lg:w-[60%] max-w-[750px]"
                >
                    <motion.div variants={fadeInUp} className="mb-10">
                        <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 backdrop-blur-md">
                            <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                            WHO WE ARE
                        </span>
                    </motion.div>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-[32px] sm:text-[40px] lg:text-[48px] font-[900] tracking-tight text-white leading-[1.35] mb-10 font-display"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {aboutContent.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl font-medium mb-16 lg:mb-24"
                    >
                        {aboutContent.hero.description}
                    </motion.p>

                    {/* Metrics Bar (Moved to left column) */}
                    <motion.div variants={fadeInUp}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 sm:gap-y-0">
                            {aboutContent.hero.metrics.map((metric, idx) => (
                                <div key={idx} className="flex flex-col items-start border-l border-blue-900/50 pl-5 sm:px-6">
                                    <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">{metric.value}</div>
                                    <div className="text-sm font-medium text-slate-300 whitespace-pre-line leading-tight">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── API Section ─────────────── */

function ApiSection() {
    return (
        <section className="bg-white relative py-16 lg:py-24 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23f1f5f9\\' fill-opacity=\\'0.4\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 z-0"></div>

            <div className="mx-auto max-w-[1400px] px-6 w-full flex flex-col lg:flex-row relative z-20">
                
                {/* Left Hand Side - Content */}
                <div className="w-full lg:w-[35%] flex flex-col justify-center bg-white/60 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 lg:p-0 rounded-3xl z-30 shadow-sm lg:shadow-none border border-slate-100 lg:border-none">
                    <div className="mb-6">
                        <span className="eyebrow text-[#2563eb] bg-[#2563eb]/[0.08] border border-[#2563eb]/25 backdrop-blur-md">
                            <span className="dot bg-[#2563eb]" />
                            OUR FOUNDATION
                        </span>
                    </div>
                    <h2 className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 font-medium">
                        At the core of Hyniva are three defining strengths: <span className="font-semibold text-slate-800">Agility, People and Innovation.</span>
                    </h2>
                    <p className="text-[32px] sm:text-[38px] md:text-4xl lg:text-[46px] font-extrabold text-[#0f172a] leading-[1.15] tracking-tight font-display">
                        We call it the <br className="hidden lg:block"/>
                        <span className="text-[#1e90ff]">Hyniva API.</span>
                    </p>
                </div>

                {/* Right Hand Side - DNA Diagram */}
                <div className="w-full lg:w-[65%] relative flex items-center justify-center mt-12 lg:mt-0 min-h-[500px] lg:min-h-[600px]">
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center"
                    >
                        {/* SVG DNA Canvas */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-16 lg:-translate-y-36">
                            <svg viewBox="0 0 800 750" className="w-full h-full overflow-visible max-h-[480px]">
                                <defs>
                                    <clipPath id="dna-reveal">
                                        <motion.rect 
                                            x="-100" width="1000" height="900"
                                            initial={{ y: 750 }}
                                            variants={{ visible: { y: -100, transition: { duration: 2.5, ease: "easeInOut" } } }}
                                        />
                                    </clipPath>

                                    <linearGradient id="grad-hyniva-front" x1="0" y1="1" x2="0" y2="0">
                                        <stop offset="0%" stopColor="#8b5cf6"/>
                                        <stop offset="50%" stopColor="#10b981"/>
                                        <stop offset="100%" stopColor="#3b82f6"/>
                                    </linearGradient>

                                    <linearGradient id="grad-hyniva-back" x1="0" y1="1" x2="0" y2="0">
                                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8"/>
                                        <stop offset="50%" stopColor="#059669" stopOpacity="0.8"/>
                                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8"/>
                                    </linearGradient>

                                    <filter id="sphere-shade" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                                        <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.6" specularExponent="3" lightingColor="white" result="specOut">
                                            <fePointLight x="-20" y="-20" z="50"/>
                                        </feSpecularLighting>
                                        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
                                        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
                                        <feDropShadow in="litPaint" dx="2" dy="4" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.3" />
                                    </filter>
                                </defs>

                                <g clipPath="url(#dna-reveal)">
                                    {/* Base Pairs (Dense Rungs) */}
                                    {[
                                        { y: 675, w: 35, color: "#8b5cf6" },
                                        { y: 650, w: 65, color: "#8b5cf6" },
                                        { y: 625, w: 100, color: "#9333ea" },
                                        { y: 600, w: 120, color: "#a855f7" },
                                        { y: 575, w: 100, color: "#c084fc" },
                                        { y: 550, w: 65, color: "#d8b4fe" },
                                        { y: 525, w: 35, color: "#e9d5ff" },

                                        { y: 475, w: 35, color: "#a7f3d0" },
                                        { y: 450, w: 65, color: "#34d399" },
                                        { y: 425, w: 100, color: "#10b981" },
                                        { y: 400, w: 120, color: "#059669" },
                                        { y: 375, w: 100, color: "#10b981" },
                                        { y: 350, w: 65, color: "#34d399" },
                                        { y: 325, w: 35, color: "#6ee7b7" },

                                        { y: 275, w: 35, color: "#93c5fd" },
                                        { y: 250, w: 65, color: "#60a5fa" },
                                        { y: 225, w: 100, color: "#3b82f6" },
                                        { y: 200, w: 120, color: "#2563eb" },
                                        { y: 175, w: 100, color: "#3b82f6" },
                                        { y: 150, w: 65, color: "#60a5fa" },
                                        { y: 125, w: 35, color: "#93c5fd" }
                                    ].map((rung, i) => (
                                        <g key={`rung-${i}`}>
                                            <line 
                                                x1={400 - rung.w} y1={rung.y} x2={400 + rung.w} y2={rung.y}
                                                stroke={rung.color} strokeWidth="3" strokeOpacity="0.6"
                                            />
                                            {/* Sphere Rung Ends */}
                                            <circle cx={400 - rung.w} cy={rung.y} r="5.5" fill={rung.color} filter="url(#sphere-shade)" />
                                            <circle cx={400 + rung.w} cy={rung.y} r="5.5" fill={rung.color} filter="url(#sphere-shade)" />
                                            {/* Rung middle dots for texture */}
                                            <line 
                                                x1={400 - rung.w + 12} y1={rung.y} x2={400 + rung.w - 12} y2={rung.y}
                                                stroke={rung.color} strokeWidth="5" strokeLinecap="round" strokeDasharray="0 14" filter="url(#sphere-shade)"
                                            />
                                        </g>
                                    ))}

                                    {/* Back Strand (Dark) - Sphere Cluster */}
                                    <g filter="url(#sphere-shade)">
                                        <path 
                                            d="M 400 700 C 280 630, 280 570, 400 500 C 520 430, 520 370, 400 300 C 280 230, 280 170, 400 100"
                                            fill="none" stroke="url(#grad-hyniva-back)" strokeWidth="18" strokeLinecap="round" strokeDasharray="0 18"
                                        />
                                        <path 
                                            d="M 400 700 C 280 630, 280 570, 400 500 C 520 430, 520 370, 400 300 C 280 230, 280 170, 400 100"
                                            fill="none" stroke="url(#grad-hyniva-back)" strokeWidth="14" strokeLinecap="round" strokeDasharray="0 15" transform="translate(5, 3)"
                                        />
                                        <path 
                                            d="M 400 700 C 280 630, 280 570, 400 500 C 520 430, 520 370, 400 300 C 280 230, 280 170, 400 100"
                                            fill="none" stroke="url(#grad-hyniva-back)" strokeWidth="10" strokeLinecap="round" strokeDasharray="0 12" transform="translate(-4, -4)"
                                        />
                                    </g>

                                    {/* Front Strand (Vibrant) - Sphere Cluster */}
                                    <g filter="url(#sphere-shade)">
                                        <path 
                                            d="M 400 700 C 520 630, 520 570, 400 500 C 280 430, 280 370, 400 300 C 520 230, 520 170, 400 100"
                                            fill="none" stroke="url(#grad-hyniva-front)" strokeWidth="18" strokeLinecap="round" strokeDasharray="0 18"
                                        />
                                        <path 
                                            d="M 400 700 C 520 630, 520 570, 400 500 C 280 430, 280 370, 400 300 C 520 230, 520 170, 400 100"
                                            fill="none" stroke="url(#grad-hyniva-front)" strokeWidth="14" strokeLinecap="round" strokeDasharray="0 15" transform="translate(-5, 4)"
                                        />
                                        <path 
                                            d="M 400 700 C 520 630, 520 570, 400 500 C 280 430, 280 370, 400 300 C 520 230, 520 170, 400 100"
                                            fill="none" stroke="url(#grad-hyniva-front)" strokeWidth="10" strokeLinecap="round" strokeDasharray="0 12" transform="translate(4, -3)"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>

                        {/* Animated Cards Container */}
                        <div className="absolute inset-0 w-full h-full pointer-events-auto max-h-[550px] mx-auto">
                            
                            {/* API Base */}
                            <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                                {/* Dynamic Glow */}
                                <motion.div 
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1, transition: { duration: 1 } }
                                    }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"
                                />
                                <div className="relative z-30 mb-2 mt-12">
                                    <h3 className="text-[48px] lg:text-[56px] leading-none font-black tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-[#0a192f] to-[#1e3a8a] drop-shadow-[0_8px_16px_rgba(37,99,235,0.35)] font-display">
                                        API
                                    </h3>
                                </div>
                                <div className="relative w-[240px] md:w-[280px] h-[60px] z-20">
                                    <div className="absolute -bottom-4 left-[10%] w-[80%] h-[20px] bg-slate-900/15 blur-xl rounded-[100%] z-0"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-[48px] bg-gradient-to-b from-slate-100 to-slate-300 rounded-[100%] shadow-[0_15px_30px_rgba(15,23,42,0.15)] border-b-2 border-slate-300 z-10"></div>
                                    <div className="absolute bottom-[12px] left-0 w-full h-[48px] bg-gradient-to-b from-white via-slate-50 to-slate-100 rounded-[100%] shadow-[inset_0_4px_15px_rgba(255,255,255,1),inset_0_-2px_6px_rgba(15,23,42,0.06)] border border-slate-200 flex items-center justify-center z-20">
                                        <motion.div 
                                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-[100px] h-[16px] bg-blue-500/20 blur-md rounded-[100%]"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-center">
                                    <p className="text-[11px] lg:text-[12px] text-slate-600 font-bold tracking-widest text-center uppercase relative z-30 bg-white/80 px-4 py-2 rounded-full backdrop-blur-md border border-slate-100 shadow-sm whitespace-nowrap">
                                        Our foundation. Enabling everything we do.
                                    </p>
                                </div>
                            </div>

                            {/* Innovation (Purple - Bottom Left) */}
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease: "easeOut" } }
                                }}
                                className="absolute bottom-[25%] left-[2%] sm:left-[8%] lg:left-[5%] w-[180px] sm:w-[220px] flex flex-col items-center lg:items-end text-center lg:text-right group"
                            >
                                <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-white shadow-[0_8px_25px_rgba(124,58,237,0.25)] border border-purple-100 flex items-center justify-center mb-2 relative transition-transform hover:-translate-y-1">
                                    <div className="absolute inset-0 rounded-full border-2 border-purple-200/60 m-[2px]"></div>
                                    <Lightbulb className="w-4 h-4 text-[#7c3aed]" strokeWidth={2} />
                                </div>
                                <h4 className="text-[#7c3aed] font-bold tracking-[0.2em] text-[10px] sm:text-xs mb-2 uppercase">Innovation</h4>
                                <p className="text-[11px] sm:text-[12px] text-slate-600 leading-[1.5] font-medium bg-white/90 p-3 rounded-xl shadow-lg border border-purple-50/50 backdrop-blur-xl relative z-20">
                                    Innovation reflects our technical depth, enabling us to turn <span className="text-[#7c3aed] font-bold">ideas into impact.</span>
                                </p>
                            </motion.div>

                            {/* People (Green - Middle Right) */}
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.6, ease: "easeOut" } }
                                }}
                                className="absolute top-[25%] right-[2%] sm:right-[8%] lg:right-[5%] w-[180px] sm:w-[220px] flex flex-col items-center lg:items-start text-center lg:text-left group"
                            >
                                <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-white shadow-[0_8px_25px_rgba(22,163,74,0.25)] border border-green-100 flex items-center justify-center mb-2 relative transition-transform hover:-translate-y-1">
                                    <div className="absolute inset-0 rounded-full border-2 border-green-200/60 m-[2px]"></div>
                                    <Users className="w-4 h-4 text-[#16a34a]" strokeWidth={2} />
                                </div>
                                <h4 className="text-[#16a34a] font-bold tracking-[0.2em] text-[10px] sm:text-xs mb-2 uppercase">People</h4>
                                <p className="text-[11px] sm:text-[12px] text-slate-600 leading-[1.5] font-medium bg-white/90 p-3 rounded-xl shadow-lg border border-green-50/50 backdrop-blur-xl relative z-20">
                                    People drive outcomes with a deep commitment to <span className="text-[#16a34a] font-bold">customer success.</span>
                                </p>
                            </motion.div>

                            {/* Agility (Blue - Top Left) */}
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.6, ease: "easeOut" } }
                                }}
                                className="absolute -top-[5%] left-[2%] sm:left-[8%] lg:left-[5%] w-[180px] sm:w-[220px] flex flex-col items-center lg:items-end text-center lg:text-right group"
                            >
                                <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-white shadow-[0_8px_25px_rgba(37,99,235,0.25)] border border-blue-100 flex items-center justify-center mb-2 relative transition-transform hover:-translate-y-1">
                                    <div className="absolute inset-0 rounded-full border-2 border-blue-200/60 m-[2px]"></div>
                                    <Gauge className="w-4 h-4 text-[#2563eb]" strokeWidth={2} />
                                </div>
                                <h4 className="text-[#2563eb] font-bold tracking-[0.2em] text-[10px] sm:text-xs mb-2 uppercase">Agility</h4>
                                <p className="text-[11px] sm:text-[12px] text-slate-600 leading-[1.5] font-medium bg-white/90 p-3 rounded-xl shadow-lg border border-blue-50/50 backdrop-blur-xl relative z-20">
                                    Agility powers speed and precision through our <span className="text-[#2563eb] font-bold">Digital Factory</span> model.
                                </p>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────── Leadership Section ─────────────── */

function LeadershipSection() {
    return (
        <section id="leadership" className="bg-[#0b1426] py-[30px] sm:py-[40px] lg:py-[50px] text-white scroll-mt-24">
            <div className="mx-auto max-w-[1400px] px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
                    {/* Left Column - Text */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="w-full lg:w-1/4 pt-4"
                    >
                        <div className="mb-6">
                            <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 backdrop-blur-md">
                                <span className="dot bg-[#1e90ff]" />
                                OUR LEADERSHIP TEAM
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold mb-6 text-white leading-[1.15] tracking-tight whitespace-pre-line">
                            {aboutContent.leadership.sectionTitle}
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                            {aboutContent.leadership.sectionDescription}
                        </p>
                    </motion.div>

                    {/* Right Column - Grid */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {aboutContent.leadership.team.map((leader, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-slate-800">
                                        {leader.image ? (
                                            <Image
                                                src={leader.image}
                                                alt={leader.name}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Users className="w-12 h-12 text-slate-600" />
                                            </div>
                                        )}
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426] via-transparent to-transparent opacity-80"></div>

                                        <div className="absolute bottom-3 left-3 right-3 z-10">
                                            <h3 className="font-bold text-sm sm:text-base leading-tight mb-0.5">{leader.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] sm:text-xs text-blue-400 font-medium truncate pr-2">{leader.title}</p>
                                                {leader.linkedin && (
                                                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors flex-shrink-0">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────── Values Section ─────────────── */

function ValuesSection() {
    return (
        <section className="bg-white py-[30px] sm:py-[40px] lg:py-[50px] relative overflow-hidden">
            {/* Background decorative waves */}
            <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-3xl z-0 pointer-events-none"></div>

            <div className="mx-auto max-w-[1400px] px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column - Text */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <div className="mb-6">
                            <span className="eyebrow text-[#2563eb] bg-[#2563eb]/[0.08] border border-[#2563eb]/25 backdrop-blur-md">
                                <span className="dot bg-[#2563eb]" />
                                OUR VALUES
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold mb-6 text-slate-900 leading-[1.15] tracking-tight whitespace-pre-line">
                            {aboutContent.values.title}
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                            {aboutContent.values.description}
                        </p>
                    </motion.div>

                    {/* Right Column - Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {aboutContent.values.items.map((item, idx) => {
                            const IconComponent = iconMap[item.icon] || Zap;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                    className={`rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${item.colorClass}`}
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${item.iconBgClass} ${item.textColorClass}`}>
                                        <IconComponent className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────── Operations Section ─────────────── */

function OperationsSection() {
    const roles = ["IT Business Analyst", "Manual QA", "Release Manager", "Support Engineer"];

    return (
        <section className="bg-white px-4 sm:px-6 lg:px-8 pt-[30px] sm:pt-[40px] lg:pt-[50px] pb-0">
            <div className="mx-auto max-w-[1400px]">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="bg-[#ECF6FF] rounded-t-[32px] rounded-b-none shadow-lg overflow-hidden"
                >
                    {/* Inner Content - How We Work Section */}
                    <div className="px-6 sm:px-8 lg:px-12 py-[30px] sm:py-[40px] lg:py-[50px]">
                        <div className="text-center mb-16 max-w-4xl mx-auto">
                            <div className="mb-6 flex justify-center">
                                <span className="eyebrow text-[#2563eb] bg-[#2563eb]/[0.08] border border-[#2563eb]/25 backdrop-blur-md">
                                    <span className="dot bg-[#2563eb]" />
                                    HOW WE WORK
                                </span>
                            </div>
                            <h2 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-extrabold text-[#0f172a] mb-6 leading-[1.15] tracking-tight font-display">
                                {aboutContent.operations.howWeOperate.title}
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[17px] text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                                {aboutContent.operations.howWeOperate.description}
                            </p>
                        </div>

                        <div className="relative pt-8 pb-4">
                            {/* Connecting Line */}
                            <div className="absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#10b981] hidden md:block"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12">
                                {aboutContent.operations.howWeOperate.steps.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center relative z-10">
                                        <div className="w-[48px] h-[48px] rounded-full bg-[#2563eb] text-white flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] mb-6 ring-8 ring-[#ECF6FF] font-display">
                                            {idx + 1}
                                        </div>
                                        <h4 className="font-black text-[16px] text-[#030B3B] mb-3 font-display tracking-tight">
                                            {item.title}
                                        </h4>
                                        <div className="text-[13.5px] text-slate-500 font-medium leading-[1.6] w-full max-w-[240px] px-2">
                                            <p className="block">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Digital Factory Section ─────────────── */

function DigitalFactorySection() {
    const roles = ["IT Business Analyst", "Manual QA", "Release Manager", "Support Engineer"];

    return (
        <section className="bg-white px-4 sm:px-6 lg:px-8 pt-6 pb-[30px] sm:pb-[40px] lg:pb-[50px]">
            <div className="mx-auto max-w-[1400px] flex flex-col gap-4">
                <div className="relative overflow-hidden bg-[#030B3B] rounded-b-[32px] rounded-t-none shadow-2xl p-[30px] sm:p-[40px] lg:p-[50px] text-white">
                    {/* Background glow effects */}
                    <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00D4AA]/10 blur-[120px]" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#1F35A4]/20 blur-[100px]" />

                    <div className="relative z-10">
                        {/* ── Header Row: left title + right stat ── */}
                        <motion.div
                            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
                            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 mb-2"
                        >
                            {/* Left: Headline & Callout */}
                            <div className="flex-1 w-full lg:max-w-2xl">
                                <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-extrabold leading-[1.1] tracking-tight text-white mb-4 sm:mb-6 font-display">
                                    Digital Factory <span className="text-[#00D4AA]">Model.</span>
                                </h2>
                                <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium leading-[1.6] sm:leading-[1.7] text-white/70">
                                    The developer owns the full lifecycle enabling <strong className="font-bold text-white">Zero Handoff Friction,</strong><br /> reducing overhead and increasing accountability at every stage.
                                </p>
                            </div>

                            {/* Right: Punch Stat */}
                            <div className="flex flex-col items-center lg:items-end text-center lg:text-right flex-shrink-0 mt-6 lg:mt-0 w-full lg:w-auto">
                                <div className="text-[56px] sm:text-[64px] lg:text-[72px] font-black leading-[0.85] tracking-[-3px] text-white font-display">
                                    40<span className="text-white text-[40px] sm:text-[48px] lg:text-[52px]">%</span>
                                </div>
                                <div className="text-[13px] sm:text-[14px] font-bold mt-2 lg:mt-3 leading-[1.3] text-white/70 tracking-widest uppercase">
                                    faster delivery<br />vs. traditional model
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Roles Eliminated Row ── */}
                        <motion.div
                            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
                            className="mt-8 lg:mt-10 mb-8 lg:mb-10 flex flex-col items-center justify-center gap-6 pt-1"
                        >
                            <span className="text-[11.5px] font-bold tracking-widest text-white/70 text-center uppercase">
                                Roles you no longer need to staff
                            </span>
                            <div className="flex flex-wrap justify-center gap-2.5">
                                {roles.map((role) => (
                                    <span
                                        key={role}
                                        className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-[12.5px] font-semibold text-white/90 shadow-sm font-display uppercase tracking-wider"
                                    >
                                        <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-red-500/50 bg-red-500/20 text-[10px] font-black text-red-400 leading-none flex-shrink-0">✕</span>
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── Planet Wave SVG ── */}
                        <motion.div
                            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
                            className="w-full overflow-x-hidden flex justify-center mt-10 lg:mt-32 mb-[-30px] lg:mb-[-50px]"
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

                            <svg width="100%" viewBox="0 -40 1020 400" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible", display: "block" }}>
                                <defs>
                                    {/* Teal sphere */}
                                    <radialGradient id="hs1" cx="33%" cy="28%" r="64%">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                                        <stop offset="25%" stopColor="#a8f0e8" stopOpacity="0.95" />
                                        <stop offset="60%" stopColor="#00D4AA" stopOpacity="0.88" />
                                        <stop offset="100%" stopColor="#041630" stopOpacity="0.85" />
                                    </radialGradient>
                                    {/* Cyan sphere (hero center) */}
                                    <radialGradient id="hs3" cx="33%" cy="28%" r="64%">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                                        <stop offset="22%" stopColor="#b8e8ff" stopOpacity="0.96" />
                                        <stop offset="58%" stopColor="#00A8FF" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#041630" stopOpacity="0.85" />
                                    </radialGradient>
                                    {/* Navy sphere */}
                                    <radialGradient id="hs2" cx="33%" cy="28%" r="64%">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                                        <stop offset="28%" stopColor="#aab8ff" stopOpacity="0.95" />
                                        <stop offset="65%" stopColor="#1F35A4" stopOpacity="0.88" />
                                        <stop offset="100%" stopColor="#041630" stopOpacity="0.85" />
                                    </radialGradient>
                                    {/* Glow halos */}
                                    <radialGradient id="gh1" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.28" />
                                        <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
                                    </radialGradient>
                                    <radialGradient id="gh2" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#1F35A4" stopOpacity="0.32" />
                                        <stop offset="100%" stopColor="#1F35A4" stopOpacity="0" />
                                    </radialGradient>
                                    <radialGradient id="gh3" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.35" />
                                        <stop offset="100%" stopColor="#00A8FF" stopOpacity="0" />
                                    </radialGradient>
                                    {/* Clip paths */}
                                    <clipPath id="hc1"><circle cx="88" cy="82" r="30" /></clipPath>
                                    <clipPath id="hc2"><circle cx="272" cy="195" r="50" /></clipPath>
                                    <clipPath id="hc3"><circle cx="500" cy="68" r="78" /></clipPath>
                                    <clipPath id="hc4"><circle cx="728" cy="218" r="42" /></clipPath>
                                    <clipPath id="hc5"><circle cx="922" cy="134" r="32" /></clipPath>
                                </defs>

                                {/* Wave shadow */}
                                <motion.path
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    d="M 88 82 C 140 90, 200 203, 272 195 C 344 187, 390 78, 500 68 C 598 60, 660 225, 728 218 C 798 210, 868 140, 922 134"
                                    fill="none" stroke="rgba(0,168,255,0.10)" strokeWidth="5"
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
                                <circle cx="178" cy="158" r="2.2" fill="rgba(0,212,170,0.45)" />
                                <circle cx="388" cy="138" r="1.8" fill="rgba(0,168,255,0.40)" />
                                <circle cx="614" cy="132" r="2.2" fill="rgba(0,212,170,0.42)" />
                                <circle cx="826" cy="164" r="1.8" fill="rgba(0,168,255,0.36)" />

                                {/* Halos */}
                                <circle cx="88" cy="94" r="44" fill="url(#gh1)" opacity="0.7" />
                                <circle cx="272" cy="207" r="66" fill="url(#gh2)" opacity="0.55" />
                                <circle cx="500" cy="82" r="102" fill="url(#gh3)" opacity="0.5" />
                                <circle cx="728" cy="232" r="56" fill="url(#gh1)" opacity="0.55" />
                                <circle cx="922" cy="146" r="46" fill="url(#gh2)" opacity="0.65" />

                                {/* ── Planet 1: Discovery & Planning (teal, small, high) ── */}
                                <g className="hpg hfloat-0" style={{ transformOrigin: "88px 82px" }}>
                                    <text x="88" y="36" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Discovery &amp; Planning</text>
                                    <circle cx="88" cy="82" r="30" fill="url(#hs1)" className="hs" />
                                    <ellipse cx="88" cy="90" rx="28" ry="5.5" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" clipPath="url(#hc1)" />
                                    <text x="88" y="132" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">Developer captures</text>
                                    <text x="88" y="145" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">scope directly.</text>
                                </g>

                                {/* ── Planet 2: Dev Project Planning (navy, medium, low) ── */}
                                <g className="hpg hfloat-1" style={{ transformOrigin: "272px 195px" }}>
                                    <text x="272" y="129" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Dev Project Planning</text>
                                    <circle cx="272" cy="195" r="50" fill="url(#hs2)" className="hs" />
                                    <ellipse cx="272" cy="206" rx="47" ry="9" fill="none" stroke="rgba(100,160,255,0.30)" strokeWidth="1" clipPath="url(#hc2)" />
                                    <text x="272" y="265" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">Developer writes</text>
                                    <text x="272" y="278" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">the user stories.</text>
                                </g>

                                {/* ── Planet 3: Engineering Dev & Quality Automation (cyan, large, peak center) ── */}
                                <g className="hpg hfloat-2" style={{ transformOrigin: "500px 68px" }}>
                                    <text x="500" y="-20" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="12" fontWeight="700" fill="#00A8FF" className="hlabel">Engineering Dev &amp; Quality Automation</text>
                                    <circle cx="500" cy="68" r="78" fill="url(#hs3)" className="hs" />
                                    <ellipse cx="500" cy="82" rx="74" ry="14" fill="none" stroke="rgba(100,160,255,0.25)" strokeWidth="1.5" clipPath="url(#hc3)" />
                                    <text x="500" y="166" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">One engineer owns scope,</text>
                                    <text x="500" y="179" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">code &amp; quality.</text>
                                </g>

                                {/* ── Planet 4: Launch & Iterations (teal, medium, low) ── */}
                                <g className="hpg hfloat-3" style={{ transformOrigin: "728px 218px" }}>
                                    <text x="728" y="162" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Launch &amp; Iterations</text>
                                    <circle cx="728" cy="218" r="42" fill="url(#hs1)" className="hs" />
                                    <ellipse cx="728" cy="228" rx="39" ry="7.5" fill="none" stroke="rgba(100,160,255,0.30)" strokeWidth="1" clipPath="url(#hc4)" />
                                    <text x="728" y="280" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">Same developer</text>
                                    <text x="728" y="293" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">drives every release.</text>
                                </g>

                                {/* ── Planet 5: Support & Product Evolution (navy, small, high) ── */}
                                <g className="hpg hfloat-4" style={{ transformOrigin: "922px 134px" }}>
                                    <text x="922" y="86" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Support &amp; Product Evolution</text>
                                    <circle cx="922" cy="134" r="32" fill="url(#hs2)" className="hs" />
                                    <ellipse cx="922" cy="143" rx="30" ry="5.8" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" clipPath="url(#hc5)" />
                                    <text x="922" y="186" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">Product knowledge</text>
                                    <text x="922" y="199" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">stays with the team.</text>
                                </g>
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}


/* ─────────────── Timeline Section ─────────────── */

function TimelineSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Extract unique years from the timeline dates
    const years = Array.from(new Set(aboutContent.journey.timeline.map(item => item.date.split(' ').pop() || "")));
    const [activeYear, setActiveYear] = useState<string>(years[0] || "");
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollToYear = (year: string) => {
        setActiveYear(year);
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const element = container.querySelector(`[data-year="${year}"]`) as HTMLElement;
        if (element) {
            const scrollLeft = element.offsetLeft - container.offsetLeft - 24;
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    };

    const scrollBy4 = (dir: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 32 : 332;
        container.scrollBy({ left: dir === 'right' ? cardWidth * 4 : -cardWidth * 4, behavior: 'smooth' });
    };

    const updateScrollState = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    };

    // Update active year based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;
            const container = scrollContainerRef.current;
            const elements = container.querySelectorAll('[data-year]');
            let currentYear = activeYear;
            let minDistance = Infinity;

            elements.forEach((el) => {
                const element = el as HTMLElement;
                const distance = Math.abs(element.offsetLeft - container.scrollLeft - container.offsetLeft);
                if (distance < minDistance) {
                    minDistance = distance;
                    currentYear = element.getAttribute('data-year') || "";
                }
            });
            if (currentYear !== activeYear) setActiveYear(currentYear);
            updateScrollState();
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            updateScrollState();
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [activeYear]);

    return (
        <section className="bg-white py-[30px] sm:py-[40px] lg:py-[50px]">
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <h2 className="text-[32px] md:text-5xl font-normal text-slate-900 mb-12">
                    {aboutContent.journey.sectionTitle}
                </h2>

                {/* Year Tabs */}
                <div className="grid grid-cols-4 sm:flex sm:flex-wrap sm:justify-center gap-3 md:gap-4 mb-16">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => scrollToYear(year)}
                            className={`py-2 sm:py-3 md:py-4 px-3 sm:px-5 min-w-[60px] sm:min-w-[85px] border transition-colors focus-visible:outline-none focus-visible:ring-2 rounded-sm font-semibold text-[12px] sm:text-[15px] leading-5 tracking-wider
                                ${activeYear === year
                                    ? 'bg-[#2563eb] text-white border-[#2563eb]'
                                    : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Carousel with side arrows */}
                <div className="flex items-center gap-4">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollBy4('left')}
                        disabled={!canScrollLeft}
                        className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Scroll left"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden flex-1">
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {aboutContent.journey.timeline.map((item, idx) => {
                                const year = item.date.split(' ').pop() || "";
                                // Alternating pattern like DBB Software
                                const isImageTop = idx % 2 === 0;

                                return (
                                    <div
                                        key={idx}
                                        data-year={year}
                                        className="min-w-[85vw] max-w-[85vw] sm:min-w-[calc(50%-16px)] sm:max-w-[calc(50%-16px)] lg:min-w-[calc(25%-24px)] lg:max-w-[calc(25%-24px)] shrink-0 snap-start flex flex-col gap-6 group"
                                    >
                                        <div className={`aspect-square bg-slate-50 rounded-xl overflow-hidden relative shadow-sm border border-slate-100 ${isImageTop ? 'order-1' : 'order-2'}`}>
                                            {/* @ts-ignore */}
                                            {item.image ? (
                                                <Image
                                                    // @ts-ignore
                                                    src={item.image}
                                                    alt={item.date}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex flex-col items-center justify-center p-8 text-center group-hover:scale-105 transition-transform duration-700">
                                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                                                        <span className="text-[#2563eb] font-bold text-xl">{year}</span>
                                                    </div>
                                                    {/* @ts-ignore */}
                                                    <h4 className="font-bold text-slate-800 text-lg leading-snug">{item.title}</h4>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`${isImageTop ? 'order-2' : 'order-1'} flex flex-col justify-end`}>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-2xl font-black text-slate-200">{item.date}</h3>
                                            </div>
                                            {/* @ts-ignore */}
                                            {item.title && <h4 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug">{item.title}</h4>}
                                            {item.description && (
                                                <p className="text-slate-500 leading-relaxed text-[12.5px] font-medium">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollBy4('right')}
                        disabled={!canScrollRight}
                        className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        aria-label="Scroll right"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </div>

            </div>
        </section>
    );
}

/* ─────────────── Main About Page Component ─────────────── */

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                <AboutHero />
                <ApiSection />
                <LeadershipSection />
                <ValuesSection />
                <OperationsSection />
                <DigitalFactorySection />
                <TimelineSection />
            </main>
            <Footer />
        </>
    );
}
