"use client";

import { motion } from "framer-motion";
import { EyebrowButton } from "@/components/ui/eyebrow-button";
import { CaseStudyMetric } from "@/content/case-study-details";
import React from "react";
import {
    Zap,
    BarChart3,
    Target,
    ShieldCheck,
    Clock,
    Settings,
    Users,
    Globe,
    Brain,
    Activity,
    Construction,
    Scale,
    ShieldAlert,
    DollarSign,
    Rocket,
    Lock,
    Phone,
    TrendingUp,
    TrendingDown,
    Layout,
    Briefcase,
    Database,
    CheckCircle2,
    Timer,
    Key,
    ClipboardList,
    Check,
    MapPin,
    Smartphone,
    Link,
    Package,
    Search,
    FileText,
    Mic,
    Cloud,
    RefreshCw,
    User,
    Bot,
    Hourglass,
    Monitor,
    OctagonAlert,
    Building,
    Puzzle,
    Undo2,
    HardDrive,
    ScrollText,
    Plus,
    FolderOpen,
    Files,
    Map as LucideMap,
    Shield,
    Sparkles,
    CircleDollarSign,
    Building2,
    Star,
    Gem,
    Banknote,
    Handshake,
    Link2,
    type LucideIcon
} from "lucide-react";

interface CaseStudyHeroProps {
    title: string;
    summary: string;
    metrics: CaseStudyMetric[];
    summaryMaxWidth?: string;
}

const iconMap: Record<string, any> = {
    "🚀": Rocket,
    "⚡": Zap,
    "💰": CircleDollarSign,
    "📈": TrendingUp,
    "📉": TrendingDown,
    "🔄": RefreshCw,
    "⏱️": Clock,
    "⏲️": Timer,
    "🎯": Target,
    "👥": Users,
    "🏗️": Building2,
    "✨": Sparkles,
    "🌟": Star,
    "💎": Gem,
    "💸": Banknote,
    "🤝": Handshake,
    "🔭": Search,
    "☁️": Cloud,
    "👤": User,
    "🤖": Bot,
    "⏳": Hourglass,
    "🖥️": Monitor,
    "🖥": Monitor,
    "🐌": Clock,
    "🐢": Clock,
    "↑": TrendingUp,
    "↓": TrendingDown,
    "🛑": OctagonAlert,
    "🏛️": Building,
    "🧩": Puzzle,
    "🔗": Link2,
    "↩": Undo2,
    "💾": HardDrive,
    "📜": ScrollText,
    "➕": Plus,
    "📂": FolderOpen,
    "📊": BarChart3,
    "🌐": Globe,
    "🧠": Brain,
    "⚖️": Scale,
    "👔": Briefcase,
    "🗄️": Database,
    "⚙️": Settings,
    "⚙": Settings,
    "🛡️": ShieldCheck,
    "🛡": Shield,
    "🗂️": Files,
    "🗺️": LucideMap,
    "🗺": LucideMap,
    "✦": Sparkles,
    "😓": Users,
    "⚠": ShieldAlert,
    "⚠️": ShieldAlert,
    "🚫": ShieldAlert,
    "✅": CheckCircle2,
    "🔌": Zap,
    "✓": Check,
    "📅": Clock,
    "🕐": Clock,
    "📞": Phone,
    "🔀": Activity,
    "🔑": Key,
    "📋": ClipboardList,
    "📄": FileText,
    "🔍": Search,
    "📦": Package,
    "📱": Smartphone,
    "📍": MapPin,
    "🎙️": Mic,
    "🎙": Mic,
    "🎨": Layout,
    "🛠️": Construction,
    "📖": ScrollText,
    "🔐": Lock,
};

const StandardIcon = ({ icon, className = "" }: { icon: string, className?: string }) => {
    const Icon = iconMap[icon];
    return (
        <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#0a102e] border border-[#1e90ff]/30 flex items-center justify-center shadow-[0_0_20px_rgba(30,144,255,0.15)] transition-all duration-300 hover:border-[#1e90ff]/60 hover:shadow-[0_0_25px_rgba(30,144,255,0.25)] ${className}`}>
            {Icon ? (
                <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#1e90ff] fill-[#1e90ff]/20" strokeWidth={2.5} />
            ) : (
                <span className="text-lg sm:text-xl">{icon}</span>
            )}
        </div>
    );
};

export function CaseStudyHero({ title, summary, metrics, summaryMaxWidth }: CaseStudyHeroProps) {
    return (
        <section className="relative z-40 min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
            {/* Reference-accurate Background - Standardized with Contact Us */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.15)_0%,transparent_65%)]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:40px_40px]" />

            {/* Background Blobs */}
            <div className="absolute w-[650px] h-[650px] -left-40 -top-40 rounded-full bg-[radial-gradient(circle,rgba(10,70,180,0.15)_0%,transparent_65%)] blur-[80px] pointer-events-none" />
            <div className="absolute w-[600px] h-[600px] -right-32 -bottom-40 rounded-full bg-[radial-gradient(circle,rgba(30,144,255,0.12)_0%,transparent_62%)] blur-[80px] pointer-events-none" />

            {/* Corner Brackets */}
            <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#1e90ff48] z-20" />
            <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-[#1e90ff48] z-20" />
            <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-[#1e90ff48] z-20" />
            <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#1e90ff48] z-20" />

            <div className="relative z-10 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto text-center">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-6 sm:mb-8 md:mb-10 relative z-60"
                    >
                        <EyebrowButton>CASE STUDY</EyebrowButton>
                    </motion.div>

                    {/* Hero Heading - Exactly 2 lines enforced */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-black tracking-tight leading-[1.15] mb-3 sm:mb-4 md:mb-5 font-sans cs-line-clamp-2 max-w-5xl mx-auto"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />

                    {/* Hero Description - Exactly 2 lines enforced */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className={`text-[16px] md:text-[16px] text-white/90 font-light leading-relaxed mx-auto mb-10 sm:mb-12 md:mb-16 cs-line-clamp-2 ${summaryMaxWidth || 'max-w-3xl'}`}
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />

                    {/* Metric Cards - Single Row Layout */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-5xl mx-auto relative pt-8 sm:pt-10 md:pt-12"
                    >
                        {/* Top Shimmer Line */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#1e90ff20]">
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1e90ff] to-transparent opacity-40"
                                style={{
                                    width: '30%',
                                    left: '-30%',
                                    animation: 'shimmerSweep 4s linear infinite'
                                }}
                            />
                        </div>

                        {metrics.map((metric, idx) => (
                            <div key={idx} className="relative py-5 sm:py-7 md:py-8 px-1.5 sm:px-3 md:px-4 group cursor-default hover:bg-[#1e90ff0d] transition-all duration-300 rounded-b-xl overflow-hidden">
                                {/* Hover glow wash */}
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(30,144,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="flex flex-col items-center relative z-10">
                                    {/* Top Icon - Single Line */}
                                    <StandardIcon icon={metric.icon} className="mb-2 sm:mb-3 md:mb-4" />
                                    
                                    {/* Main Number - Centered - Force 1 line with smaller font */}
                                    <div className="text-[18px] sm:text-[22px] lg:text-[28px] font-bold text-white tracking-tight leading-none mb-2 sm:mb-3 font-display group-hover:text-[#63c2ff] group-hover:drop-shadow-[0_0_30px_#63c2ff80] transition-all duration-300 text-center px-2 sm:px-1 overflow-hidden">
                                        {metric.value}
                                    </div>
                                    
                                    {/* Divider */}
                                    <div className="w-5 sm:w-7 h-[2px] bg-gradient-to-r from-[#1e90ff] to-[#63c2ff] opacity-40 mb-2 sm:mb-3 group-hover:w-9 sm:group-hover:w-11 group-hover:opacity-100 transition-all duration-300" />
                                    
                                    {/* Supporting Text - Exactly 2 lines enforced - Show all text without truncation */}
                                    <div className="flex flex-col justify-center text-center max-w-[150px] sm:max-w-[160px] text-[10px] sm:text-[11px] lg:text-[11px] font-medium text-white mx-auto cs-force-2-lines-safe" dangerouslySetInnerHTML={{ __html: metric.label }} />
                                </div>

                                {/* Divider */}
                                {idx < metrics.length - 1 && (
                                    <div className="absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-gradient-to-b from-transparent via-[#1e90ff48] to-transparent md:block hidden" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                <span className="text-[10px] font-medium text-white tracking-[0.3em] uppercase">SCROLL</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmerSweep {
                    0%   { left: -100%; opacity: 0; }
                    20%  { opacity: 1; }
                    80%  { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
                @keyframes scrollLine {
                    0%   { transform:scaleY(0); transform-origin:top;    opacity:1; }
                    50%  { transform:scaleY(1); transform-origin:top;    opacity:1; }
                    51%  { transform:scaleY(1); transform-origin:bottom; }
                    100% { transform:scaleY(0); transform-origin:bottom; opacity:0; }
                }
                /* Case study title color & line-clamp overrides */
                h1.cs-line-clamp-2 {
                    color: #1e90ff !important; /* Blue for regular text */
                    display: -webkit-box !important;
                    -webkit-line-clamp: 2 !important;
                    -webkit-box-orient: vertical !important;
                    overflow: hidden !important;
                }
                h1.cs-line-clamp-2 em {
                    color: #ffffff !important; /* White for emphasized parts */
                }
                /* More specific overrides for h1 only */
                h1.cs-line-clamp-2 em,
                h1.cs-line-clamp-2 .em,
                h1.cs-line-clamp-2 [class*="em"] {
                    color: #ffffff !important; /* White for emphasized parts */
                }
                h1.cs-line-clamp-2:not(em):not([class*="em"]) {
                    color: #00D4AA !important; /* Green for regular text */
                }
                /* White text override for specific spans */
                h1.cs-line-clamp-2 .text-white,
                h1.cs-line-clamp-2 span.text-white {
                    color: #ffffff !important; /* White for marked spans */
                }
                /* Summary text - enforce 2 line clamp */
                p.cs-line-clamp-2 {
                    display: -webkit-box !important;
                    -webkit-line-clamp: 2 !important;
                    -webkit-box-orient: vertical !important;
                    overflow: hidden !important;
                }
                /* Metric labels - strictly formatted to 2 lines max */
                .cs-force-2-lines-safe {
                    display: -webkit-box !important;
                    -webkit-line-clamp: 2 !important;
                    -webkit-box-orient: vertical !important;
                    overflow: hidden !important;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    line-height: 1.3;
                    max-height: 2.6em;
                }
                `
            }} />
        </section>
    );
}
