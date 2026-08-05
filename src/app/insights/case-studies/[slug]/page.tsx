"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { caseStudyDetails, CaseStudyMetric, CaseStudySection } from "@/content/case-study-details";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CaseStudyPopup } from "@/components/CaseStudyPopup";
import { EyebrowButton } from "@/components/ui/eyebrow-button";
import { CaseStudyHero } from "@/components/case-study-hero";
import { useScrollTabSync } from "@/hooks/useScrollTabSync";

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

// --- Components ---


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
        <div className={`flex items-center justify-center ${className}`}>
            {Icon ? (
                <Icon className="w-9 h-9 text-[#1e90ff] fill-[#1e90ff]/15" strokeWidth={2.5} />
            ) : (
                <span className="text-3xl">{icon}</span>
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
            <div className="flex items-center gap-3 sm:gap-5 mb-5 sm:mb-8">
                {num && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1e90ff] flex items-center justify-center text-white font-normal font-sans text-[11px] sm:text-[12px] shrink-0 shadow-[0_6px_16px_rgba(30,144,255,0.4)] z-10 relative">
                        {num}
                    </div>
                )}
                {tag && <span className="text-[#1e90ff] font-semibold text-[11px] sm:text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-sans">{tag}</span>}
            </div>
        </div>
    );
};

export default function CaseStudyDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const study = caseStudyDetails[slug as keyof typeof caseStudyDetails];

    if (!study) {
        return notFound();
    }

    // Extract section IDs for the new hook
    const sectionIds = study.sections.map(section => section.id);
    const { activeTabIndex, scrollToTab } = useScrollTabSync({
        sectionIds,
    });
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                                    <div className="text-[32px] font-normal text-[#1e90ff]/18 leading-none shrink-0 w-9 font-sans">
                                        {item.num || '✦'}
                                    </div>
                                    <div className="pt-1 flex-1">
                                        <h4 className="text-[14px] font-semibold text-[#111827] mb-2 font-sans leading-[1.4]">{item.title}</h4>
                                        {item.bullets && (
                                            <div className="flex flex-col gap-2">
                                                {item.bullets.map((bullet: string, bulletIdx: number) => (
                                                    <div key={bulletIdx} className="flex gap-2.5 items-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shrink-0 mt-1.5 opacity-60" />
                                                        <p className="cs-content text-[13.5px] font-light text-[#6b7280] leading-[1.65] leading-relaxed flex-1">{bullet}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {item.desc && <p className="cs-content text-[13.5px] font-light text-[#6b7280] leading-[1.65] leading-relaxed">{item.desc}</p>}
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
                                    <h4 className="text-[14px] font-semibold text-[#111827] mb-[5px] text-center font-sans">{item.title}</h4>
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
                                        <div className="text-[clamp(20px,2.2vw,28px)] font-bold text-[#1e90ff] leading-none shrink-0 min-w-[64px] font-sans">
                                            {item.value}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[14px] font-semibold text-[#111827] leading-[1.3] font-sans">{item.label}</div>
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

            {/* ── Standardized Hero Section ── */}
            <CaseStudyHero
                title={study.title}
                summary={study.summary}
                metrics={study.metrics}
                summaryMaxWidth={slug === 'modernizing-case-management-for-a-community-healthcare-provider-stop' ? 'max-w-[900px]' : slug === 'scaling-a-secure-pre-qualification-loan-routing-platform-with-intelligent-automation' ? 'max-w-[900px]' : slug === 'aem-migration' ? 'max-w-[900px]' : slug === 'eazyschool-admin' ? 'max-w-[780px]' : undefined}
            />

            {/* ── Content Navigator ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 py-3 sm:py-4 lg:py-6 transition-all duration-500">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="w-full lg:w-[85%] mx-auto">
                        <div className="flex items-center justify-start gap-2 sm:gap-3 lg:gap-4 overflow-x-auto no-scrollbar">
                            {study.sections.filter(s => s.title).map((section, filteredIdx) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (filteredIdx === 2) {
                                            window.dispatchEvent(new CustomEvent('thirdTabClicked', {
                                                detail: { source: 'tab-click', sectionId: section.id }
                                            }));
                                        }
                                        const target = document.querySelector(`#${section.id}`);
                                        if (target) {
                                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }}
                                    className={`px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-[12px] font-bold font-sans transition-all duration-200 whitespace-nowrap border ${activeTabIndex === sectionIds.indexOf(section.id)
                                        ? "bg-[#1e90ff] text-white border-[#1e90ff]"
                                        : "bg-transparent border-transparent text-[#6b7280] hover:text-[#1e90ff]"
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
            <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
                <div className="w-full lg:w-[85%] mx-auto space-y-14">
                    {study.sections.map((section, idx) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32"
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
                h1 em, .banner h1 em { font-style: normal; color: #00D4AA; font-family: var(--font-display), serif; font-weight: 700; text-shadow: 0 0 48px rgba(0,212,170,0.3); }
                .font-display { font-family: var(--font-display), serif; }
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

                @media (max-width: 640px) {
                    .cs-content,
                    .cs-content p {
                        font-size: 15px !important;
                        line-height: 1.7 !important;
                    }
                    .solution-group {
                        padding: 16px 18px;
                    }
                    .solution-card {
                        padding: 14px 16px;
                        gap: 12px;
                    }
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

                /* ── Comparison Table Styling ── */
                .comparison-table-wrapper {
                    margin-top: 32px;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                    border: 1px solid #e5e7eb;
                }
                .comparison-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: inherit;
                }
                .comparison-table__header {
                    background: #1B3A5C;
                    color: #ffffff;
                    font-size: 15px;
                    font-weight: 700;
                    padding: 16px 24px;
                    text-align: left;
                    width: 50%;
                    letter-spacing: 0.02em;
                }
                .comparison-table__header--left {
                    border-right: 1px solid rgba(255,255,255,0.15);
                }
                .comparison-table__row--even {
                    background: #ffffff;
                }
                .comparison-table__row--odd {
                    background: #f0f4f8;
                }
                .comparison-table__cell {
                    padding: 16px 24px;
                    font-size: 14px;
                    color: #374151;
                    line-height: 1.6;
                    vertical-align: top;
                    border-bottom: 1px solid #e5e7eb;
                }
                .comparison-table__cell:first-child {
                    border-right: 1px solid #e5e7eb;
                }
                .comparison-table__cell--highlight {
                    font-weight: 600;
                    color: #111827;
                }
                .comparison-table__row:last-child .comparison-table__cell {
                    border-bottom: none;
                }
                @media (max-width: 640px) {
                    .comparison-table__header {
                        font-size: 13px;
                        padding: 12px 14px;
                    }
                    .comparison-table__cell {
                        font-size: 13px;
                        padding: 12px 14px;
                    }
                }

                /* ── Benefits Table Styling ── */
                .benefits-table-wrapper {
                    margin-top: 32px;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
                    border: 1px solid #e5e7eb;
                }
                .benefits-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: inherit;
                }

                .benefits-table__row--even {
                    background: #ffffff;
                }
                .benefits-table__row--odd {
                    background: #f8fafc;
                }
                .benefits-table__cell {
                    padding: 18px 24px;
                    font-size: 15px;
                    color: #475569;
                    line-height: 1.6;
                    vertical-align: middle;
                    border-bottom: 1px solid #e2e8f0;
                }
                .benefits-table__cell--num {
                    width: 80px;
                    text-align: center;
                }
                .benefits-num-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #1B3A5C;
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 14px;
                    box-shadow: 0 4px 10px rgba(27, 58, 92, 0.2);
                }
                .benefits-table__cell--benefit {
                    width: 35%;
                    font-weight: 700;
                    color: #1B3A5C;
                }
                .benefits-table__cell--desc {
                    width: 55%;
                    font-weight: 300;
                }
                .benefits-table__row:last-child .benefits-table__cell {
                    border-bottom: none;
                }
                @media (max-width: 640px) {
                    .benefits-table__cell {
                        font-size: 13px;
                        padding: 12px 14px;
                    }
                    .benefits-num-badge {
                        width: 26px;
                        height: 26px;
                        font-size: 12px;
                    }
                }
            `}</style>
        </div>
    );
}




