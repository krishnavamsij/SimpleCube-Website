"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { caseStudyDetails, CaseStudyMetric, CaseStudySection } from "@/content/case-study-details";
import { motion, AnimatePresence } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// --- Components ---

const MetricIcon = ({ icon }: { icon: string }) => {
    return <span className="text-xl">{icon}</span>;
};

const SectionHeader = ({ num, tag }: { num?: string, tag?: string }) => (
    <div className="flex items-center gap-3 mb-10">
        {num && (
            <div className="w-8 h-8 rounded-full bg-[#1e90ff] flex items-center justify-center text-white font-bold text-[12px] shrink-0 shadow-[0_4px_10px_rgba(30,144,255,0.3)]">
                {num}
            </div>
        )}
        {tag && <span className="text-[#1e90ff] font-bold text-[12px] uppercase tracking-[0.2em]">{tag}</span>}
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
            { threshold: 0.3, rootMargin: "-100px 0px -40% 0px" }
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
                    <div className="space-y-6">
                        {content.body && <div className="text-[17px] text-slate-600 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="space-y-5">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex gap-6 p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#1e90ff]/40 hover:shadow-xl transition-all duration-500 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f4f6fa] border border-slate-200 flex items-center justify-center text-[#1e90ff] font-bold text-[19px] group-hover:bg-[#1e90ff] group-hover:text-white transition-all duration-500">
                                        {item.num}
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-[19px] font-bold text-[#111827] mb-2">{item.title}</h4>
                                        <p className="text-[16px] text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'feature-grid':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="text-[17px] text-slate-600 leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#1e90ff]/30 transition-all duration-500">
                                    <div className="w-13 h-13 rounded-xl bg-[#1e90ff]/10 flex items-center justify-center text-2xl mb-6 text-[#1e90ff]">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-[19px] font-bold text-[#111827] mb-3">{item.title}</h4>
                                    <p className="text-[16px] text-slate-600 leading-relaxed font-medium">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'impact-strip':
                return (
                    <div className="space-y-8">
                        {content.body && <div className="text-[17px] text-slate-600 leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-100 text-center flex flex-col items-center group hover:border-[#1e90ff]/20 hover:shadow-xl transition-all duration-500">
                                    <div className="text-[34px] font-bold text-[#1e90ff] mb-2">{item.value}</div>
                                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">{item.label}</div>
                                    <p className="text-[14px] font-medium text-slate-500 leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'outcome-list':
                return (
                    <div className="space-y-6">
                        {content.body && <div className="text-[17px] text-slate-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="space-y-5">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shrink-0" />
                                    <span className="text-[17px] font-semibold text-[#111827]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'future-tags':
                return (
                    <div className="space-y-6">
                        {content.body && <div className="text-[17px] text-slate-600 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: content.body }} />}
                        <div className="flex flex-wrap gap-4">
                            {content.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#f4f6fa] border border-slate-200 text-[16px] font-bold text-[#111827] hover:border-[#1e90ff]/30 transition-all">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e90ff]" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div 
                        className="text-[18px] leading-relaxed text-slate-600 space-y-6 [&_strong]:text-[#111827] [&_strong]:font-bold [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-4" 
                        dangerouslySetInnerHTML={{ __html: content }} 
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f6fa] font-sans text-[#111827] selection:bg-[#1e90ff]/30 selection:text-[#111827]">
            <Navbar forceDarkText={scrolled} />

            {/* ── Banner Section (Image 1) ── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#030b1e]">
                {/* Background layers from Home Page */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
                <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />
                
                {/* Dots Pattern */}
                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle, #1e90ff 1px, transparent 1px)', backgroundSize: '38px 38px' }} />

                <div className="mx-auto w-full max-w-[1400px] px-6 relative z-10 py-20 text-center">
                    <div className="max-w-5xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center justify-center gap-3 mb-10"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff]" />
                            <span className="text-[11px] font-bold text-white/50 uppercase tracking-[0.4em] flex items-center gap-3">
                                CASE STUDY <span className="text-white/20">·</span> <span dangerouslySetInnerHTML={{ __html: study.eyebrow.toUpperCase() }} />
                            </span>
                            <div className="h-[1px] w-12 bg-white/10" />
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white tracking-tight leading-[1.1] mb-10 font-display"
                            dangerouslySetInnerHTML={{ __html: study.title }}
                        />

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-base md:text-[19px] text-[#a0c3f0]/60 font-medium leading-relaxed max-w-3xl mx-auto mb-20"
                        >
                            {study.summary}
                        </motion.p>

                        {/* Metrics Strip (Image 1 Format) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-wrap items-center justify-center gap-0 max-w-6xl mx-auto border-t border-white/5 pt-20"
                        >
                            {study.metrics.map((metric, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="flex flex-col items-center px-10 lg:px-16">
                                        <div className="w-13 h-13 rounded-full bg-[#1e90ff]/10 flex items-center justify-center mb-7 border border-[#1e90ff]/30 shadow-[0_0_20px_rgba(30,144,255,0.15)]">
                                            <MetricIcon icon={metric.icon} />
                                        </div>
                                        <div className="text-[52px] font-bold text-white tracking-tighter leading-none mb-4 font-display">{metric.value}</div>
                                        <div className="text-[12px] font-bold text-white/40 uppercase tracking-[0.15em]">{metric.label}</div>
                                    </div>
                                    {idx < study.metrics.length - 1 && (
                                        <div className="hidden lg:block w-[1px] h-28 bg-white/10" />
                                    )}
                                </React.Fragment>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                    <span className="text-[11px] font-bold text-white/20 tracking-[0.7em] uppercase">SCROLL</span>
                    <motion.div 
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-[1px] h-10 bg-gradient-to-b from-[#1e90ff]/50 to-transparent"
                    />
                </div>
            </section>

            {/* ── Content Navigator (Image 2) ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 py-6 transition-all duration-500">
                <div className="mx-auto w-full max-w-[1400px] px-6">
                    <div className="flex items-center justify-center gap-4 overflow-x-auto no-scrollbar">
                        {study.sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`px-7 py-3 rounded-full text-[14px] font-bold tracking-tight transition-all duration-300 whitespace-nowrap ${
                                    activeSection === section.id 
                                    ? "bg-[#1e90ff] text-white shadow-[0_10px_25px_rgba(30,144,255,0.35)]" 
                                    : "bg-white border border-slate-200 text-slate-500 hover:border-[#1e90ff]/30 hover:text-[#111827]"
                                }`}
                            >
                                {section.title || section.id}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="mx-auto w-full max-w-[1400px] px-6 py-28">
                <div className="max-w-4xl mx-auto space-y-28">
                    {study.sections.map((section, idx) => (
                        <section 
                            key={section.id} 
                            id={section.id}
                            className="scroll-mt-36"
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
                                />
                                
                                <div className="mt-6">
                                    {renderSectionContent(section)}
                                </div>
                            </motion.div>
                            {idx < study.sections.length - 1 && <div className="h-[1px] w-full bg-slate-200 mt-28 mb-28 opacity-60" />}
                        </section>
                    ))}
                </div>
            </main>

            <Footer />
            
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                h1 em, .banner h1 em { font-style: italic; color: #63c2ff; font-family: 'Playfair Display', serif; font-weight: 500; }
                .font-display { font-family: 'Playfair Display', serif; }
            `}</style>
        </div>
    );
}




