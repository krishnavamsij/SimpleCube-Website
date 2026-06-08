"use client";

import React, { useRef, useState, useEffect } from "react";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Zap, Lightbulb, Users, Target, Shield, Rocket, Gauge } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { aboutContent } from "@/content/about";

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
        <section className="relative overflow-hidden bg-[#040b16] pt-32 pb-24 lg:pt-48 lg:pb-32">
            {/* Globe Graphic (Image) */}
            <div className="absolute top-[5%] lg:top-[10%] right-[-10%] lg:right-[5%] w-[100%] lg:w-[45%] max-w-[650px] aspect-square pointer-events-none z-0 opacity-60 lg:opacity-100">
                <Image src="/globe-smooth.png" alt="Global Network" fill className="object-contain scale-110" priority />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl"
                >
                    <motion.div variants={fadeInUp} className="mb-4 inline-block text-xs font-bold tracking-wider text-blue-400 uppercase">
                        WHO WE ARE
                    </motion.div>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {aboutContent.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl"
                    >
                        {aboutContent.hero.description}
                    </motion.p>
                </motion.div>
            </div>

            {/* Metrics Bar */}
            <div className="relative z-20 mt-16 lg:mt-32 mx-auto w-full max-w-[1400px] px-6">
                <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="bg-[#0b1426]/80 backdrop-blur-md border border-blue-900/30 rounded-xl p-8 shadow-2xl"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-blue-900/50">
                        {aboutContent.hero.metrics.map((metric, idx) => (
                            <div key={idx} className={`flex flex-col items-center text-center ${idx === 0 ? '' : 'pl-8'}`}>
                                <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">{metric.value}</div>
                                <div className="text-sm font-medium text-slate-300 whitespace-pre-line leading-tight">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── API Section ─────────────── */

function ApiSection() {
    return (
        <section className="bg-white py-24 relative overflow-hidden">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                    
                    {/* Left Hand Side - Illustration */}
                    <motion.div 
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="w-full lg:w-[65%] relative flex justify-center py-6"
                    >
                        <div className="relative w-full max-w-[800px] flex flex-col items-center pt-4 pb-8">
                            
                            {/* Background Waves - Moved inside the Plate Assembly for perfect centering */}
                            
                            {/* Top row with 3 items */}
                            <div className="flex justify-between w-full relative z-20">
                                {/* Agility */}
                                <div className="flex flex-col items-center w-[32%] text-center">
                                    <div className="w-[72px] h-[72px] rounded-full bg-white shadow-[0_8px_25px_rgba(37,99,235,0.12)] border border-blue-50 flex items-center justify-center mb-5 relative group transition-transform hover:-translate-y-1">
                                        <div className="absolute inset-0 rounded-full border border-blue-100 m-[3px]"></div>
                                        <Gauge className="w-7 h-7 text-[#2563eb]" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-[#2563eb] font-bold tracking-widest text-sm mb-3 uppercase">Agility</h4>
                                    <div className="w-8 h-[2px] bg-[#2563eb] mx-auto mb-4 opacity-30"></div>
                                    <p className="text-[12px] text-[#475569] leading-relaxed">
                                        Agility powers our ability to move with speed and precision through our <span className="text-[#2563eb] font-semibold">Digital Factory</span> model.
                                    </p>
                                </div>

                                {/* People */}
                                <div className="flex flex-col items-center w-[32%] text-center">
                                    <div className="w-[72px] h-[72px] rounded-full bg-white shadow-[0_8px_25px_rgba(22,163,74,0.12)] border border-green-50 flex items-center justify-center mb-5 relative group transition-transform hover:-translate-y-1">
                                        <div className="absolute inset-0 rounded-full border border-green-100 m-[3px]"></div>
                                        <Users className="w-7 h-7 text-[#16a34a]" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-[#16a34a] font-bold tracking-widest text-sm mb-3 uppercase">People</h4>
                                    <div className="w-8 h-[2px] bg-[#16a34a] mx-auto mb-4 opacity-30"></div>
                                    <p className="text-[12px] text-[#475569] leading-relaxed">
                                        People drive outcomes through ownership, collaboration, and a deep commitment to <span className="text-[#16a34a] font-semibold">customer success.</span>
                                    </p>
                                </div>

                                {/* Innovation */}
                                <div className="flex flex-col items-center w-[32%] text-center">
                                    <div className="w-[72px] h-[72px] rounded-full bg-white shadow-[0_8px_25px_rgba(124,58,237,0.12)] border border-purple-50 flex items-center justify-center mb-5 relative group transition-transform hover:-translate-y-1">
                                        <div className="absolute inset-0 rounded-full border border-purple-100 m-[3px]"></div>
                                        <Lightbulb className="w-7 h-7 text-[#7c3aed]" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-[#7c3aed] font-bold tracking-widest text-sm mb-3 uppercase">Innovation</h4>
                                    <div className="w-8 h-[2px] bg-[#7c3aed] mx-auto mb-4 opacity-30"></div>
                                    <p className="text-[12px] text-[#475569] leading-relaxed">
                                        Innovation reflects our product engineering mindset and technical depth, enabling us to turn <span className="text-[#7c3aed] font-semibold">ideas into impact.</span>
                                    </p>
                                </div>
                            </div>

                            {/* Connecting Lines SVG */}
                            <div className="w-full h-[160px] mt-2 relative z-10">
                                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 160">
                                    {/* Glow effect lines */}
                                    <path d="M 100,0 C 100,80 300,100 300,150" fill="none" stroke="url(#grad-blue)" strokeWidth="6" strokeLinecap="round" className="opacity-30 blur-[2px]" />
                                    <path d="M 300,0 L 300.1,150" fill="none" stroke="url(#grad-green)" strokeWidth="6" strokeLinecap="round" className="opacity-30 blur-[2px]" />
                                    <path d="M 500,0 C 500,80 300,100 300,150" fill="none" stroke="url(#grad-purple)" strokeWidth="6" strokeLinecap="round" className="opacity-30 blur-[2px]" />

                                    {/* Main solid lines */}
                                    <path d="M 100,0 C 100,80 300,100 300,150" fill="none" stroke="url(#grad-blue)" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M 300,0 L 300.1,150" fill="none" stroke="url(#grad-green)" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M 500,0 C 500,80 300,100 300,150" fill="none" stroke="url(#grad-purple)" strokeWidth="2" strokeLinecap="round" />
                                    
                                    {/* Nodes on paths */}
                                    <circle cx="150" cy="55" r="2.5" fill="#2563eb" />
                                    <circle cx="220" cy="115" r="2.5" fill="#2563eb" />
                                    
                                    <circle cx="300" cy="60" r="2.5" fill="#16a34a" />
                                    <circle cx="300" cy="115" r="2.5" fill="#16a34a" />

                                    <circle cx="450" cy="55" r="2.5" fill="#7c3aed" />
                                    <circle cx="380" cy="115" r="2.5" fill="#7c3aed" />

                                    <defs>
                                        <linearGradient id="grad-blue" x1="100" y1="0" x2="300" y2="150" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
                                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
                                        </linearGradient>
                                        <linearGradient id="grad-green" x1="300" y1="0" x2="300.1" y2="150" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.9" />
                                            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.1" />
                                        </linearGradient>
                                        <linearGradient id="grad-purple" x1="500" y1="0" x2="300" y2="150" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.9" />
                                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/* Floating API & Plate Assembly */}
                            <div className="relative z-20 flex flex-col items-center mt-[-40px]">
                                
                                {/* Background Waves perfectly centered at the ground level of the 5:1 plate */}
                                <div className="absolute top-[108px] left-1/2 -translate-x-1/2 w-0 h-0 flex items-center justify-center pointer-events-none z-0">
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[72px] rounded-[100%] border-[1.5px] border-blue-200/80 shadow-[inset_0_0_15px_rgba(37,99,235,0.03)] opacity-100"></div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[112px] rounded-[100%] border-[1.5px] border-slate-300/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.02)] opacity-70"></div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[152px] rounded-[100%] border-[1.5px] border-slate-200/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.02)] opacity-40"></div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[960px] h-[192px] rounded-[100%] border-[1.5px] border-slate-200/40 shadow-[inset_0_0_15px_rgba(0,0,0,0.02)] opacity-15"></div>
                                </div>

                                {/* Floating API Text */}
                                <div className="relative z-30 mb-2">
                                    <h3 className="text-[52px] leading-none font-black tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-[#0a192f] to-[#1e3a8a] drop-shadow-[0_8px_16px_rgba(37,99,235,0.25)]">
                                        API
                                    </h3>
                                </div>

                                {/* 3D Plate Underneath (Strict 5:1 Aspect Ratio) */}
                                <div className="relative w-[320px] h-[80px] z-20">
                                    {/* Ground shadow */}
                                    <div className="absolute -bottom-4 left-[10%] w-[80%] h-[20px] bg-slate-900/10 blur-xl rounded-[100%] z-0"></div>
                                    
                                    {/* Plate Rim / Bottom Ellipse (5:1) */}
                                    <div className="absolute bottom-0 left-0 w-full h-[64px] bg-gradient-to-b from-slate-100 to-slate-300 rounded-[100%] shadow-[0_15px_30px_rgba(15,23,42,0.1)] border-b-2 border-slate-300 z-10"></div>
                                    
                                    {/* Plate Top Surface / Top Ellipse (5:1) */}
                                    <div className="absolute bottom-[16px] left-0 w-full h-[64px] bg-gradient-to-b from-white via-slate-50 to-slate-100 rounded-[100%] shadow-[inset_0_4px_15px_rgba(255,255,255,1),inset_0_-2px_6px_rgba(15,23,42,0.06)] border border-slate-200 flex items-center justify-center z-20">
                                        {/* Faint blue reflection directly under the API text */}
                                        <div className="w-[120px] h-[25px] bg-blue-500/10 blur-md rounded-[100%]"></div>
                                    </div>
                                </div>
                                <p className="text-[14px] text-slate-500 mt-6 font-medium tracking-wide">Our foundation. Enabling everything we do.</p>
                            </div>

                        </div>
                    </motion.div>

                    {/* Right Hand Side - Content */}
                    <motion.div 
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="w-full lg:w-[35%] lg:pl-8"
                    >
                        <div className="text-sm font-bold tracking-widest text-[#2563eb] mb-6 uppercase">
                            OUR FOUNDATION
                        </div>
                        <h2 className="text-2xl md:text-[26px] lg:text-[28px] font-extrabold mb-8 text-[#0f172a] leading-[1.3] tracking-tight">
                            At the core of Hyniva<br />
                            are three defining strengths:<br />
                            <span className="text-[#2563eb]">Agility, People and Innovation.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed tracking-wide">
                            We call it the Hyniva API.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

/* ─────────────── Leadership Section ─────────────── */

function LeadershipSection() {
    return (
        <section className="bg-[#0b1426] py-24 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
                    {/* Left Column - Text */}
                    <motion.div 
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="lg:w-1/4 pt-4"
                    >
                        <div className="text-xs font-bold tracking-widest text-blue-400 mb-4 uppercase">OUR LEADERSHIP TEAM</div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight whitespace-pre-line">
                            {aboutContent.leadership.sectionTitle}
                        </h2>
                        <div className="w-12 h-1 bg-blue-500 mb-6"></div>
                        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
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
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
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
        <section className="bg-white py-24 relative overflow-hidden">
            {/* Background decorative waves */}
            <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-3xl z-0 pointer-events-none"></div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Column - Text */}
                    <motion.div 
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <div className="text-xs font-bold tracking-widest text-blue-600 mb-4 uppercase">OUR VALUES</div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 leading-tight whitespace-pre-line">
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
    return (
        <section className="bg-[#f0f9ff] py-24 pb-32">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                
                {/* Top: How We Operate White Card */}
                <div className="bg-white rounded-[2rem] p-10 sm:p-16 shadow-sm border border-slate-100 max-w-5xl mx-auto mb-16">
                    <div className="text-center mb-12">
                        <div className="text-[15px] font-black tracking-widest text-[#0f172a] uppercase">
                            HOW WE OPERATE
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
                        {aboutContent.operations.howWeOperate.map((item, idx) => {
                            const IconComponent = iconMap[item.icon] || Zap;
                            return (
                                <div key={idx} className="flex flex-col items-start">
                                    <div className="text-[#2563eb] mb-5">
                                        <IconComponent className="w-[30px] h-[30px]" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-bold text-[14px] text-slate-900 mb-3 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-[12px] text-slate-500 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom: Digital Factory Graphic */}
                    <motion.div 
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="bg-[#0b1426] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl"
                    >
                        {/* 3D Sphere Background Effect */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            {/* Lines */}
                            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid slice">
                                <path d="M 100,200 Q 300,300 500,200 T 900,100" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                                <path d="M 200,100 Q 400,200 600,100 T 800,200" fill="none" stroke="#10b981" strokeWidth="2" className="opacity-30" />
                            </svg>
                        </div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                            <div className="max-w-md">
                                <div className="text-xs text-blue-400 font-bold tracking-widest uppercase mb-2">OUR FRAMEWORK</div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                    <span className="text-white">Digital Factory </span>
                                    <span className="text-emerald-400">Model.</span>
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {aboutContent.operations.digitalFactory.description}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl md:text-6xl font-black text-white">{aboutContent.operations.digitalFactory.stat}</div>
                                <div className="text-xs text-slate-400 max-w-[150px] mt-2 ml-auto leading-tight">
                                    {aboutContent.operations.digitalFactory.statLabel}
                                </div>
                            </div>
                        </div>

                        {/* ── Roles Eliminated Row ── */}
                        <motion.div
                            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
                            className="mt-6 lg:mt-8 mb-6 lg:mb-8 flex flex-col items-center justify-center gap-6 pt-1"
                        >
                            <span className="text-[11.5px] font-bold tracking-widest text-white/70 text-center uppercase">
                                Roles you no longer need to staff
                            </span>
                            <div className="flex flex-wrap justify-center gap-2.5">
                                {["IT Business Analyst", "Manual QA", "Release Manager", "Support Engineer"].map((role) => (
                                    <span
                                        key={role}
                                        className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-[12.5px] font-semibold text-white/90 shadow-sm uppercase tracking-wider"
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
                            className="w-full flex justify-center mt-12 lg:mt-24 mb-[-30px] lg:mb-[-50px] relative z-10"
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

                                {/* ── Planet 1: Discovery & Planning ── */}
                                <g className="hpg hfloat-0" style={{ transformOrigin: "88px 82px" }}>
                                    <text x="88" y="36" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Discovery &amp; Planning</text>
                                    <circle cx="88" cy="82" r="30" fill="url(#hs1)" className="hs"/>
                                    <ellipse cx="88" cy="90" rx="28" ry="5.5" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" clipPath="url(#hc1)"/>
                                    <text x="88" y="132" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">Developer captures</text>
                                    <text x="88" y="145" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">scope directly.</text>
                                </g>

                                {/* ── Planet 2: Dev Project Planning ── */}
                                <g className="hpg hfloat-1" style={{ transformOrigin: "272px 195px" }}>
                                    <text x="272" y="129" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Dev Project Planning</text>
                                    <circle cx="272" cy="195" r="50" fill="url(#hs2)" className="hs"/>
                                    <ellipse cx="272" cy="206" rx="47" ry="9" fill="none" stroke="rgba(100,160,255,0.30)" strokeWidth="1" clipPath="url(#hc2)"/>
                                    <text x="272" y="265" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">Developer writes</text>
                                    <text x="272" y="278" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">the user stories.</text>
                                </g>

                                {/* ── Planet 3: Engineering Dev & Quality Automation ── */}
                                <g className="hpg hfloat-2" style={{ transformOrigin: "500px 68px" }}>
                                    <text x="500" y="-20" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="12" fontWeight="700" fill="#00A8FF" className="hlabel">Engineering Dev &amp; Quality Automation</text>
                                    <circle cx="500" cy="68" r="78" fill="url(#hs3)" className="hs"/>
                                    <ellipse cx="500" cy="82" rx="74" ry="14" fill="none" stroke="rgba(100,160,255,0.25)" strokeWidth="1.5" clipPath="url(#hc3)"/>
                                    <text x="500" y="166" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">One engineer owns scope,</text>
                                    <text x="500" y="179" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">code &amp; quality.</text>
                                </g>

                                {/* ── Planet 4: Launch & Iterations ── */}
                                <g className="hpg hfloat-3" style={{ transformOrigin: "728px 218px" }}>
                                    <text x="728" y="162" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Launch &amp; Iterations</text>
                                    <circle cx="728" cy="218" r="42" fill="url(#hs1)" className="hs"/>
                                    <ellipse cx="728" cy="228" rx="39" ry="7.5" fill="none" stroke="rgba(100,160,255,0.30)" strokeWidth="1" clipPath="url(#hc4)"/>
                                    <text x="728" y="280" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">Same developer</text>
                                    <text x="728" y="293" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">drives every release.</text>
                                </g>

                                {/* ── Planet 5: Support & Product Evolution ── */}
                                <g className="hpg hfloat-4" style={{ transformOrigin: "922px 134px" }}>
                                    <text x="922" y="86" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="11" fontWeight="700" fill="#00D4AA" className="hlabel">Support &amp; Product Evolution</text>
                                    <circle cx="922" cy="134" r="32" fill="url(#hs2)" className="hs"/>
                                    <ellipse cx="922" cy="143" rx="30" ry="5.8" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" clipPath="url(#hc5)"/>
                                    <text x="922" y="186" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">Product knowledge</text>
                                    <text x="922" y="199" textAnchor="middle" fontFamily="var(--font-inter, sans-serif)" fontSize="10" fontWeight="400" fill="rgba(255,255,255,0.85)">stays with the team.</text>
                                </g>
                            </svg>
                        </motion.div>

                    </motion.div>
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

    const scrollToYear = (year: string) => {
        setActiveYear(year);
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const element = container.querySelector(`[data-year="${year}"]`) as HTMLElement;
        if (element) {
            const scrollLeft = element.offsetLeft - container.offsetLeft - 24; // padding offset
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
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
        };
        
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [activeYear]);

    return (
        <section className="bg-white py-24 md:py-32">
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
                <div className="flex justify-between sm:justify-center gap-3 md:gap-4 flex-wrap mb-16">
                    {years.map(year => (
                        <button 
                            key={year}
                            onClick={() => scrollToYear(year)}
                            className={`py-3 md:py-4 px-5 min-w-[85px] border transition-colors focus-visible:outline-none focus-visible:ring-2 rounded-sm font-semibold text-[15px] leading-5 tracking-wider
                                ${activeYear === year 
                                    ? 'bg-[#2563eb] text-white border-[#2563eb]' 
                                    : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Carousel */}
                <div className="overflow-hidden relative -mx-4 px-4 sm:mx-0 sm:px-0">
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
                                    className="min-w-[280px] max-w-[320px] shrink-0 snap-start flex flex-col gap-6 group"
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
                                        {item.title && <h4 className="text-[16px] font-bold text-slate-900 mb-3 leading-snug">{item.title}</h4>}
                                        {item.description && (
                                            <p className="text-slate-600 leading-relaxed text-[13px] font-medium">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
                <TimelineSection />
            </main>
            <Footer />
        </>
    );
}
