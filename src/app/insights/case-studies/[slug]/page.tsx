"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { caseStudyDetails, CaseStudyMetric, CaseStudySection } from "@/content/case-study-details";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CaseStudyPopup } from "@/components/case-study-popup";
import { EyebrowButton } from "@/components/ui/eyebrow-button";

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
    type LucideIcon
} from "lucide-react";

// --- Components ---

const iconMap: Record<string, LucideIcon> = {
    "🚀": Rocket,
    "⚡": Zap,
    "💰": DollarSign,
    "📈": TrendingUp,
    "📉": TrendingDown,
    "🔄": Activity,
    "⏱️": Timer,
    "⏲️": Timer,
    "🎯": Target,
    "👥": Users,
    "🏗️": Construction,
    "✨": Rocket,
    "🌟": Rocket,
    "💎": Rocket,
    "💸": DollarSign,
    "🤝": Users,
    "🛠️": Construction,
    "🎨": Layout,
    "📖": Layout,
    "🔐": Lock,
    "🎙️": Mic,
    "🎙": Mic,
    "📍": MapPin,
    "📱": Smartphone,
    "🔗": Link,
    "📦": Package,
    "🔍": Search,
    "📄": FileText,
    "🔑": Key,
    "📋": ClipboardList,
    "✓": Check,
    "📅": Clock,
    "🕐": Clock,
    "📞": Phone,
    "🔀": Activity,
    "🚫": ShieldAlert,
    "⚠️": ShieldAlert,
    "⚠": ShieldAlert,
    "✅": CheckCircle2,
    "🔌": Zap,
    "🐢": Clock,
    "↑": TrendingUp,
    "↓": TrendingDown,
    "🔭": Search,
    "☁️": Cloud,
    "🔁": RefreshCw,
    "👤": User,
    "🤖": Bot,
    "⏳": Hourglass,
    "🖥️": Monitor,
    "🖥": Monitor,
    "🐌": Clock,
    "🛑": OctagonAlert,
    "🏛️": Building,
    "🧩": Puzzle,
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
};

const StandardIcon = ({ icon, className = "" }: { icon: string, className?: string }) => {
    const Icon = iconMap[icon];
    return (
        <div className={`w-9 h-9 rounded-[8px] bg-[rgba(30,144,255,0.08)] border border-[rgba(30,144,255,0.15)] flex items-center justify-center ${className}`}>
            {Icon ? (
                <Icon className="w-4 h-4 text-[#1e90ff]" />
            ) : (
                <span className="text-base">{icon}</span>
            )}
        </div>
    );
};

const MetricIcon = ({ icon }: { icon: string }) => {
    return <StandardIcon icon={icon} className="mb-5" />;
};

const SectionHeader = ({ num, tag, hide }: { num?: string, tag?: string, isFirst?: boolean, hide?: boolean }) => {
    if (hide) return null;
    return (
        <div className="relative">
            <div className="flex items-center gap-5 mb-8">
                {num && (
                    <div className="w-8 h-8 rounded-full bg-[#1e90ff] flex items-center justify-center text-white font-normal font-sans text-[12px] shrink-0 shadow-[0_6px_16px_rgba(30,144,255,0.4)] z-10 relative">
                        {num}
                    </div>
                )}
                {tag && <span className="text-[#1e90ff] font-normal text-[11px] uppercase tracking-[0.3em] font-sans">{tag}</span>}
            </div>
        </div>
    );
};

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
                        const sectionId = entry.target.id;
                        // Map sub-sections to their parent section for navigation
                        let activeId = sectionId;
                        if (sectionId.startsWith('solutions-')) {
                            activeId = 'solutions';
                        }
                        setActiveSection(activeId);
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
                        {content.body && <div className="cs-content mb-6" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="flex flex-col gap-5">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex gap-5 bg-white border border-[#e5e7eb] rounded-[10px] p-[22px_24px] transition-all duration-200 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)]">
                                    <div className="text-[32px] font-normal text-[#1e90ff]/18 leading-none shrink-0 w-9 font-display">
                                        {item.num || '✦'}
                                    </div>
                                    <div className="pt-1 flex-1">
                                        <h4 className="text-[14px] font-semibold text-[#111827] mb-2 font-sans leading-[1.4]">{item.title}</h4>
                                        {item.bullets && (
                                            <div className="flex flex-col gap-2">
                                                {item.bullets.map((bullet: string, bulletIdx: number) => (
                                                    <div key={bulletIdx} className="flex gap-2.5 items-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shrink-0 mt-1.5 opacity-60" />
                                                        <p className="cs-content text-[13.5px] font-light text-[#6b7280] leading-[1.65] flex-1">{bullet}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {item.desc && <p className="cs-content text-[13.5px] font-light text-[#6b7280] leading-[1.65]">{item.desc}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {content.footer && <div className="cs-content mt-8" dangerouslySetInnerHTML={{ __html: content.footer }} />}
                    </div>
                );
            case 'feature-grid':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="cs-content mb-6" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="bg-white border border-[#e5e7eb] rounded-[10px] p-5 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
                                    <div className="flex flex-col items-center justify-center mb-3">
                                        <StandardIcon icon={item.icon} />
                                    </div>
                                    <h4 className="text-[13px] font-semibold text-[#111827] mb-[5px] text-center">{item.title}</h4>
                                    <p className="text-[13px] font-light leading-[1.6] text-[#374151] text-center">{item.text}</p>
                                </div>
                            ))}
                        </div>
                        {content.footer && <div className="cs-content mt-8" dangerouslySetInnerHTML={{ __html: content.footer }} />}
                    </div>
                );
            case 'impact-strip':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="cs-content mb-6" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mt-7">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="bg-white border border-[#e5e7eb] rounded-[12px] p-[22px_24px] flex gap-[18px] items-start transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#1e90ff] to-[#63c2ff] rounded-l-[3px_0_0_3px]" />
                                    {iconMap[item.value] ? (
                                        <div className="flex flex-col items-center justify-center shrink-0 min-w-[64px]">
                                            <StandardIcon icon={item.value} />
                                        </div>
                                    ) : (
                                        <div className="text-[clamp(20px,2.2vw,28px)] font-bold text-[#1e90ff] leading-none shrink-0 min-w-[64px] font-display">
                                            {item.value}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[13px] font-semibold text-[#111827] leading-[1.3]">{item.label}</div>
                                        {item.desc && <p className="text-[12.5px] font-light leading-[1.55] text-[#6b7280]">{item.desc}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {content.footer && <div className="cs-content mt-8" dangerouslySetInnerHTML={{ __html: content.footer }} />}
                    </div>
                );
            case 'outcome-list':
                return (
                    <div className="space-y-6">
                        {content.body && <div className="cs-content mb-4" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="space-y-3">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-[#1e90ff] shrink-0 mt-2 opacity-70" />
                                    <span className="text-[16px] font-light text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                                </div>
                            ))}
                        </div>
                        {content.footer && <div className="cs-content mt-6" dangerouslySetInnerHTML={{ __html: content.footer }} />}
                    </div>
                );
            case 'future-tags':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="cs-content mb-6" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="flex flex-wrap gap-3">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-[14px] font-medium text-slate-600 hover:border-[#1e90ff] hover:text-[#1e90ff] hover:bg-[#1e90ff0a] transition-all cursor-default">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] opacity-50" />
                                    {item}
                                </div>
                            ))}
                        </div>
                        {content.footer && <div className="cs-content mt-8" dangerouslySetInnerHTML={{ __html: content.footer }} />}
                    </div>
                );
            case 'tech-tags':
                return (
                    <div className="cs-content">
                        {content.body && <div dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="tech-tags">
                            {content.items.map((item: any, idx: number) => (
                                <span key={idx} className="tech-tag">{item}</span>
                            ))}
                        </div>
                    </div>
                );
            case 'text':
                return (
                    <div className="cs-content">
                        <div dangerouslySetInnerHTML={{ __html: content.body || content }} />
                    </div>
                );
            default:
                return (
                    <div className="cs-content">
                        {content.body && <div dangerouslySetInnerHTML={{ __html: content.body }} />}
                        {typeof content === "string" && <div dangerouslySetInnerHTML={{ __html: content }} />}
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#111827]" style={{ scrollBehavior: 'smooth' }}>
            <Navbar forceDarkText={scrolled} />

            {/* ── Banner Section (Image 1 Style) ── */}
            <section className="relative h-screen min-h-[720px] flex flex-col items-center justify-center overflow-hidden">
                {/* Reference-accurate Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#020c1c] via-[#071a32] to-[#050f20]" />
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,#1e90ff1a_1px,transparent_1px)] bg-[length:38px_38px]" />

                {/* Background Blobs */}
                <div className="absolute w-[650px] h-[650px] -left-40 -top-40 rounded-full bg-[radial-gradient(circle,rgba(10,70,180,0.15)_0%,transparent_65%)] blur-[80px] pointer-events-none" />
                <div className="absolute w-[600px] h-[600px] -right-32 -bottom-40 rounded-full bg-[radial-gradient(circle,rgba(30,144,255,0.12)_0%,transparent_62%)] blur-[80px] pointer-events-none" />



                {/* Corner Brackets */}
                <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#1e90ff48] z-20" />
                <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-[#1e90ff48] z-20" />
                <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-[#1e90ff48] z-20" />
                <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#1e90ff48] z-20" />

                <div className="relative z-10 w-full max-w-[1000px] px-8 mx-auto text-center pt-20">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center mb-10"
                        >
                            <EyebrowButton>CASE STUDY</EyebrowButton>
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

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-5xl mx-auto relative pt-12"
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


                            {study.metrics.map((metric, idx) => (
                                <div key={idx} className="relative py-10 px-4 group cursor-default hover:bg-[#1e90ff0d] transition-all duration-300 rounded-b-xl overflow-hidden">
                                    {/* Hover glow wash */}
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(30,144,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="flex flex-col items-center relative z-10">
                                        <MetricIcon icon={metric.icon} />
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
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                            {study.sections.filter(s => s.title).map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const target = document.querySelector(`#${section.id}`);
                                        if (target) {
                                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }}
                                    className={`px-4 py-1.5 rounded-full text-[12px] font-medium font-sans transition-all duration-200 whitespace-nowrap border ${activeSection === section.id
                                        ? "bg-[#1e90ff] text-white border-[#1e90ff]"
                                        : "bg-white border-[#e5e7eb] text-[#6b7280] hover:bg-[#1e90ff] hover:border-[#1e90ff] hover:text-white"
                                        }`}
                                >
                                    {section.title || section.id}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="mx-auto w-full max-w-[1000px] px-8 py-16">
                <div className="max-w-3xl mx-auto space-y-14">
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
                                    hide={!section.title}
                                />

                                <div className="mt-8">
                                    {renderSectionContent(section)}
                                </div>
                            </motion.div>
                            {idx < study.sections.length - 1 && study.sections[idx + 1].title && <div className="h-[1px] w-full bg-slate-200 mt-14 opacity-60" />}
                            {idx < study.sections.length - 1 && !study.sections[idx + 1].title && <div className="mt-12" />}
                        </section>
                    ))}
                </div>
            </main>

            <Footer />
            <CaseStudyPopup />

            <style jsx global>{`
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
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                h1 em, .banner h1 em { font-style: italic; color: #00D4AA; font-family: 'Playfair Display', serif; font-weight: 500; text-shadow: 0 0 48px rgba(0,212,170,0.3); }
                .font-display { font-family: 'Playfair Display', serif; }
                p { margin-bottom: 1.25rem; }

                /* ── Case Study Unified Body Typography ── */
                .cs-content,
                .cs-content p {
                    font-size: 17px !important;
                    font-weight: 300 !important;
                    color: #475569 !important;
                    line-height: 1.85 !important;
                }
                .cs-content p {
                    margin-bottom: 1.25rem;
                }
                .cs-content strong {
                    color: #111827 !important;
                    font-weight: 600 !important;
                }

                
                /* ── Solution Group Styling ── */
                .solution-group {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 10px;
                    padding: 22px 24px;
                    margin-top: 20px;
                    transition: box-shadow 0.2s;
                }
                .solution-group:hover {
                    box-shadow: 0 6px 24px rgba(0,0,0,0.07);
                }
                .solution-group__label {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 2.5px;
                    text-transform: uppercase;
                    color: #1e90ff;
                    margin-bottom: 14px;
                }
                .solution-group__bullets {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .solution-group__bullet {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                    font-size: 13.5px;
                    font-weight: 300;
                    color: #374151;
                    line-height: 1.65;
                }
                .solution-group__bullet::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #1e90ff;
                    flex-shrink: 0;
                    margin-top: 7px;
                    opacity: 0.6;
                }

                /* ── Solution Card Styling ── */
                .solution-card {
                    background: white;
                    border: 1px solid #eef2f6;
                    border-radius: 12px;
                    padding: 18px 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 12px;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
                }
                .solution-card:hover {
                    box-shadow: 0 8px 24px rgba(30,144,255,0.08);
                    border-color: #1e90ff33;
                    transform: translateX(4px);
                }
                .solution-card__sparkle {
                    color: #1e90ff;
                    font-size: 22px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    background: #1e90ff0a;
                    border-radius: 50%;
                    text-shadow: 0 0 10px rgba(30,144,255,0.3);
                }
                .solution-card__text {
                    font-size: 15px;
                    font-weight: 600;
                    color: #111827;
                    line-height: 1.4;
                }

                /* ── Core Banking Specific Sub-points Styling ── */
                .cs-content.core-banking-sub {
                    font-size: 15px !important;
                    color: #6b7280 !important;
                    line-height: 1.5 !important;
                    position: relative;
                    padding-left: 12px !important;
                    margin-top: 4px !important;
                    font-weight: normal !important;
                }
                .cs-content.core-banking-sub::before {
                    content: '•';
                    color: #1e90ff !important;
                    font-weight: bold;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                /* ── Salesforce Specific Sub-points Styling ── */
                .cs-content.salesforce-sub {
                    font-size: 15px !important;
                    color: #6b7280 !important;
                    line-height: 1.5 !important;
                    position: relative;
                    padding-left: 12px !important;
                    margin-top: 4px !important;
                    font-weight: normal !important;
                }
                .cs-content.salesforce-sub::before {
                    content: '•';
                    color: #1e90ff !important;
                    font-weight: bold;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                /* ── Approach List Styling ── */
                .approach-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .approach-item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 16px;
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    padding: 20px 24px;
                    transition: all 0.2s ease;
                }
                .approach-item:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .approach-item__header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .approach-item__num {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1e90ff;
                    flex-shrink: 0;
                }
                .approach-item__content {
                    flex: 1;
                }
                .approach-item__title {
                    font-size: 15px;
                    font-weight: 500;
                    color: #111827;
                    line-height: 1.4;
                }
                .approach-item__bullets {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding-left: 52px;
                }
                .approach-item__bullet {
                    font-size: 14px;
                    color: #6b7280;
                    line-height: 1.6;
                    position: relative;
                }
                .approach-item__bullet::before {
                    content: '•';
                    color: #1e90ff;
                    font-weight: bold;
                    position: absolute;
                    left: -16px;
                }
                
                /* ── Tech Tags Styling ── */
                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 20px;
                }
                .tech-tag {
                    font-size: 11.5px;
                    font-weight: 500;
                    color: #1e90ff;
                    background: rgba(30,144,255,0.07);
                    border: 1px solid rgba(30,144,255,0.18);
                    border-radius: 100px;
                    padding: 5px 13px;
                }

                /* ── Tech Bullets Styling ── */
                .tech-bullets {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 24px;
                    background: #ECF6FF;
                    border: 1px solid #ECF6FF;
                    border-radius: 14px;
                    padding: 24px;
                }
                .tech-bullet {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }
                .tech-bullet__dot {
                    width: 8px;
                    height: 8px;
                    background: #1e90ff;
                    border-radius: 50%;
                    flex-shrink: 0;
                    margin-top: 6px;
                }
                .tech-bullet span {
                    font-size: 14px;
                    color: #374151;
                    line-height: 1.5;
                }
                .tech-bullet strong {
                    color: #111827;
                    font-weight: 600;
                }

                /* ── Impact Highlights Styling ── */
                .impact-highlights {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-top: 32px;
                }
                @media (max-width: 1024px) {
                    .impact-highlights {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 640px) {
                    .impact-highlights {
                        grid-template-columns: 1fr;
                    }
                }
                .impact-card {
                    display: flex;
                    gap: 16px;
                    padding: 24px;
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .impact-card::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: linear-gradient(to bottom, #1e90ff, #63c2ff);
                    border-radius: 3px 0 0 3px;
                }
                .impact-card:hover {
                    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
                    transform: translateY(-2px);
                }
                .impact-card__stat {
                    font-size: 32px;
                    font-weight: 700;
                    color: #1e90ff;
                    line-height: 1;
                    min-width: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .impact-card__content {
                    flex: 1;
                }
                .impact-card__label {
                    font-size: 16px;
                    font-weight: 600;
                    color: #111827;
                    margin-bottom: 8px;
                }
                .impact-card__desc {
                    font-size: 14px;
                    color: #6b7280;
                    line-height: 1.5;
                }

                /* ── Outcome List Styling ── */
                .outcome-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-top: 16px;
                }
                .outcome-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }
                .outcome-item__dot {
                    width: 8px;
                    height: 8px;
                    background: #1e90ff;
                    border-radius: 50%;
                    flex-shrink: 0;
                    margin-top: 6px;
                }
                .outcome-item div:last-child {
                    font-size: 14px;
                    color: #374151;
                    line-height: 1.5;
                }
                .outcome-item strong {
                    color: #111827;
                    font-weight: 600;
                }

                /* ── Solution Image Styling ── */
                .solution-image {
                    margin-top: 32px;
                    text-align: center;
                }
                .solution-image img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                    border: 1px solid #e5e7eb;
                }
            `}</style>
        </div>
    );
}




