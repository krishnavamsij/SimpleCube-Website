"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { caseStudyDetails, CaseStudyMetric, CaseStudySection } from "@/content/case-study-details";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

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
    Layout,
    Briefcase,
    CheckCircle2,
    Database,
    type LucideIcon 
} from "lucide-react";

// --- Components ---

const iconMap: Record<string, LucideIcon> = {
    // Emojis to Lucide mapping
    "🚀": Rocket,
    "⚡": Zap,
    "💰": DollarSign,
    "⏲️": Clock,
    "📊": BarChart3,
    "🎯": Target,
    "🛡️": ShieldCheck,
    "⚙️": Settings,
    "👥": Users,
    "🌐": Globe,
    "🧠": Brain,
    "📈": Activity,
    "🏗️": Construction,
    "⚖️": Scale,
    "⚠️": ShieldAlert,
    "✨": Rocket,
    "📅": Clock,
    "✅": CheckCircle2,
    "🗂️": Layout,
    "👔": Briefcase,
    "🔗": Globe,
    "🔀": Activity,
    "🔍": Target,
    "🗄️": Database,
    "📄": Layout,
    "💬": Activity,
    "👂": Activity,
    "🧩": Layout,
    "🏢": Briefcase,
    "📍": Target,
    "🕰️": Clock,
    "💹": BarChart3,
    "🔄": Activity,
    "🚫": ShieldAlert,
    "😓": ShieldAlert,
    "🔭": Target,
    "🌟": Rocket,
    "📱": Globe,
    "💻": Globe,
    "🔑": ShieldCheck,
    "💎": Rocket,
    "💸": DollarSign,
    "🤝": Users,
    "🛠️": Construction,
    "📉": Activity,
    "🎨": Layout,
    "📖": Layout,
};

const MetricIcon = ({ icon }: { icon: string }) => {
    const Icon = iconMap[icon];
    if (Icon) return <Icon className="w-5 h-5 text-[#1e90ff]" />;
    return <span className="text-xl">{icon}</span>;
};

const SectionHeader = ({ num, tag, isFirst }: { num?: string, tag?: string, isFirst?: boolean }) => (
    <div className="relative">
        {/* Vertical line connector */}
        {!isFirst && (
            <div className="absolute -top-32 left-4 w-[1.5px] h-32 bg-gradient-to-b from-[#1e90ff]/0 via-[#1e90ff]/20 to-[#1e90ff]/40" />
        )}
        <div className="flex items-center gap-5 mb-8">
            {num && (
                <div className="w-8 h-8 rounded-full bg-[#1e90ff] flex items-center justify-center text-white font-black text-[12px] shrink-0 shadow-[0_6px_16px_rgba(30,144,255,0.4)] z-10 relative">
                    {num}
                </div>
            )}
            {tag && <span className="text-[#1e90ff] font-black text-[11px] uppercase tracking-[0.3em]">{tag}</span>}
        </div>
    </div>
);

export default function CaseStudyDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const study = caseStudyDetails[slug];

    const [activeSection, setActiveSection] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "-100px 0px -40% 0px" }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [study]);

    if (!study) {
        return notFound();
    }

    const renderSectionContent = (section: CaseStudySection) => {
        const { type, content } = section;

        switch (type) {
            case 'approach-list':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="text-[17px] text-slate-600 font-light leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="flex flex-col gap-5">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex gap-7 bg-[#ECF6FF] border border-[#ECF6FF]/80 rounded-[14px] p-8 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 group">
                                    <div className="text-[36px] font-bold text-[#1e90ff]/20 leading-none shrink-0 w-12 font-display">
                                        {item.num}
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-[17px] font-bold text-[#111827] mb-3">{item.title}</h4>
                                        {item.desc && <p className="text-[15px] text-slate-500 font-light leading-relaxed">{item.desc}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'feature-grid':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="text-[17px] text-slate-600 font-light leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="bg-[#ECF6FF] border border-[#ECF6FF]/80 rounded-[14px] p-7 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                                    <div className="w-11 h-11 rounded-lg bg-[#1e90ff]/10 flex items-center justify-center text-lg mb-5 border border-[#1e90ff]/10">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-[15px] font-bold text-[#111827] mb-2">{item.title}</h4>
                                    <p className="text-[14.5px] text-slate-500 font-light leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'impact-strip':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="text-[17px] text-slate-600 font-light leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-slate-200 gap-[1px] rounded-2xl overflow-hidden border border-slate-200">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="bg-[#ECF6FF] p-8 flex flex-col gap-2">
                                    <div className="text-[42px] font-bold text-[#1e90ff] leading-none font-display">{item.value}</div>
                                    <div className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">{item.label}</div>
                                    <p className="text-[12px] text-slate-400 font-light mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'outcome-list':
                return (
                    <div className="space-y-6">
                        {content.body && <div className="text-[17px] text-slate-600 font-light leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="space-y-4">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-[#1e90ff] shrink-0 mt-2.5 opacity-70" />
                                    <span className="text-[17px] font-light text-slate-600" dangerouslySetInnerHTML={{ __html: item }} />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'future-tags':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="text-[17px] text-slate-600 font-light leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="flex flex-wrap gap-3">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#ECF6FF] border border-[#ECF6FF]/80 text-[14.5px] font-medium text-slate-600 hover:border-[#1e90ff] hover:text-[#1e90ff] transition-all cursor-default">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] opacity-50" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div 
                        className="text-[17px] font-light leading-[1.85] text-slate-600 space-y-6 [&_strong]:text-[#111827] [&_strong]:font-semibold [&_p]:mb-8" 
                        dangerouslySetInnerHTML={{ __html: content }} 
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#111827]">
            <Navbar forceDarkText={scrolled} />

            {/* ── Banner Section (Image 1 Style) ── */}
            <section className="relative h-screen min-h-[720px] flex flex-col items-center justify-center overflow-hidden">
                {/* Reference-accurate Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#020c1c] via-[#071a32] to-[#050f20]" />
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,#1e90ff1a_1px,transparent_1px)] bg-[length:38px_38px]" />
                
                {/* Background Blobs */}
                <div className="absolute w-[650px] h-[650px] -left-40 -top-40 rounded-full bg-[radial-gradient(circle,rgba(10,70,180,0.15)_0%,transparent_65%)] blur-[80px] pointer-events-none" />
                <div className="absolute w-[600px] h-[600px] -right-32 -bottom-40 rounded-full bg-[radial-gradient(circle,rgba(30,144,255,0.12)_0%,transparent_62%)] blur-[80px] pointer-events-none" />
                
                {/* Scanning Shimmer */}
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#63c2ff80] to-transparent animate-[shimmerSweep_7s_ease-in-out_infinite] pointer-events-none" />

                {/* Corner Brackets */}
                <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#1e90ff48] z-20" />
                <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-[#1e90ff48] z-20" />
                <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-[#1e90ff48] z-20" />
                <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#1e90ff48] z-20" />

                <div className="relative z-10 w-full max-w-[1000px] px-8 text-center pt-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-3 mb-10"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_10px_#1e90ff] animate-pulse" />
                        <span className="text-[11px] font-bold text-[#63c2ff] uppercase tracking-[0.4em] flex items-center gap-3">
                            CASE STUDY
                        </span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-[28px] md:text-[38px] lg:text-[52px] font-black text-[#edf5ff] tracking-tight leading-[1.15] mb-8 font-display"
                        dangerouslySetInnerHTML={{ __html: study.title }}
                    />

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-[14px] md:text-[16px] text-[#bcd6f5b8] font-light leading-relaxed max-w-2xl mx-auto mb-16"
                    >
                        {study.summary}
                    </motion.p>

                    {/* Metrics Strip (Grid Layout) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-5xl mx-auto relative pt-12"
                    >
                        {/* Glow line above metrics */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1e90ff40] to-transparent" />
                        
                        {study.metrics.map((metric, idx) => (
                            <div key={idx} className="relative py-10 px-4 group cursor-default hover:bg-[#1e90ff0d] transition-all duration-300 rounded-b-xl overflow-hidden">
                                {/* Hover glow wash */}
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(30,144,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                
                                <div className="flex flex-col items-center relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-[#1e90ff12] border border-[#1e90ff33] flex items-center justify-center mb-5 group-hover:border-[#63c2ff8c] group-hover:bg-[#1e90ff26] group-hover:shadow-[0_0_20px_rgba(30,144,255,0.22)] transition-all duration-300">
                                        <MetricIcon icon={metric.icon} />
                                    </div>
                                    <div className="text-[32px] lg:text-[42px] font-bold text-white tracking-tight leading-none mb-3 font-display group-hover:text-[#63c2ff] group-hover:drop-shadow-[0_0_30px_#63c2ff80] transition-all duration-300">{metric.value}</div>
                                    <div className="w-7 h-[2px] bg-gradient-to-r from-[#1e90ff] to-[#63c2ff] opacity-40 mb-3 group-hover:w-11 group-hover:opacity-100 transition-all duration-300" />
                                    <div className="text-[12px] font-medium text-[#cde4ffd6] leading-tight max-w-[120px] mx-auto">{metric.label}</div>
                                </div>

                                {/* Divider */}
                                {idx < study.metrics.length - 1 && (
                                    <div className="absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-gradient-to-b from-transparent via-[#1e90ff48] to-transparent md:block hidden" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[10px] font-medium text-[#63c2ff5c] tracking-[0.3em] uppercase">SCROLL</span>
                    <div className="w-[1px] h-10 bg-gradient-to-b from-[#63c2ff70] to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
                </div>
            </section>

            {/* ── Content Navigator ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 py-6 transition-all duration-500">
                <div className="mx-auto w-full max-w-[1000px] px-8">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        {study.sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`px-5 py-2.5 rounded-full text-[12.5px] font-semibold tracking-tight transition-all duration-300 whitespace-nowrap border ${
                                    activeSection === section.id 
                                    ? "bg-[#1e90ff] text-white border-[#1e90ff] shadow-[0_8px_20px_rgba(30,144,255,0.3)]" 
                                    : "bg-white border-slate-200 text-slate-400 hover:border-[#1e90ff] hover:text-[#1e90ff]"
                                }`}
                            >
                                {section.title || section.id}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="mx-auto w-full max-w-[1000px] px-8 py-24">
                <div className="max-w-3xl mx-auto space-y-20">
                    {study.sections.map((section, idx) => (
                        <section 
                            key={section.id} 
                            id={section.id}
                            className="scroll-mt-32"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                <SectionHeader 
                                    num={(idx + 1).toString().padStart(2, '0')} 
                                    tag={section.title || section.id} 
                                    isFirst={idx === 0}
                                />
                                
                                <div className="mt-8">
                                    {renderSectionContent(section)}
                                </div>
                            </motion.div>
                            {idx < study.sections.length - 1 && <div className="h-[1px] w-full bg-slate-200 mt-20 opacity-60" />}
                        </section>
                    ))}
                </div>
            </main>

            <Footer />
            
            <style jsx global>{`
                @keyframes shimmerSweep {
                    0%   { top: -2%;  opacity: 0; }
                    8%   { opacity: 1; }
                    92%  { opacity: 1; }
                    100% { top: 102%; opacity: 0; }
                }
                @keyframes scrollLine {
                    0%   { transform:scaleY(0); transform-origin:top;    opacity:1; }
                    50%  { transform:scaleY(1); transform-origin:top;    opacity:1; }
                    51%  { transform:scaleY(1); transform-origin:bottom; }
                    100% { transform:scaleY(0); transform-origin:bottom; opacity:0; }
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                h1 em, .banner h1 em { font-style: italic; color: #00D4AA; font-family: 'Playfair Display', serif; font-weight: 500; text-shadow: 0 0 48px rgba(0,212,170,0.3); }
                .font-display { font-family: 'Playfair Display', serif; }
                p { margin-bottom: 2rem; }
            `}</style>
        </div>
    );
}




