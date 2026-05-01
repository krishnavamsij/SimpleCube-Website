"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { caseStudyDetails } from "@/content/case-study-details";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CaseStudyDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const study = caseStudyDetails[slug];

    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, [study]);

    if (!study) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white font-sans text-[#030B3B]">
            <Navbar forceDarkText={false} />

            {/* ── Hero Section ── */}
            <header className="relative pt-32 pb-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/images/2023/11/section-bg.jpg')" }}>
                {/* Dark Overlay for contrast */}
                <div className="absolute inset-0 bg-[#030B3B]/80" />
                
                <div className="mx-auto w-full max-w-[1400px] px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 text-white">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="flex-1"
                        >
                            <motion.div variants={fadeInUp} className="mb-6">
                                <Link 
                                    href="/insights/case-studies"
                                    className="inline-flex items-center text-sm font-bold text-[#3B82F6] hover:text-[#2563EB] transition-colors gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    BACK TO CASE STUDIES
                                </Link>
                            </motion.div>

                            <motion.h1 
                                variants={fadeInUp}
                                className="text-4xl sm:text-5xl lg:text-6xl font-[900] text-white tracking-tight leading-[1.1] mb-0 font-display"
                            >
                                {study.title}
                            </motion.h1>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:max-w-md pb-2"
                        >
                            <p className="text-xl text-white/80 font-medium leading-relaxed">
                                {study.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* ── Horizontal Sticky Navigator ── */}
            <nav className="sticky top-[64px] lg:top-[70px] z-40 bg-white border-b border-[#030B3B]/10 py-0 shadow-md transition-all duration-300">
                <div className="mx-auto w-full max-w-[1400px] px-6">
                    <div className="flex items-center lg:justify-center justify-start gap-8 overflow-x-auto no-scrollbar py-4">
                        {study.sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`text-[13px] uppercase tracking-wider font-bold whitespace-nowrap transition-all relative py-2 ${
                                    activeSection === section.id 
                                    ? "text-[#3B82F6]" 
                                    : "text-[#030B3B]/50 hover:text-[#030B3B]"
                                }`}
                            >
                                {section.title}
                                {activeSection === section.id && (
                                    <motion.div 
                                        layoutId="activeTab"
                                        className="absolute bottom-[-16px] left-0 right-0 h-1 bg-[#3B82F6] rounded-t-full"
                                    />
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* ── Main Content ── */}
            <main className="mx-auto w-full max-w-[1400px] px-6 py-24">
                <div className="space-y-32">
                    {study.sections.map((section, idx) => (
                        <section 
                            key={section.id} 
                            id={section.id}
                            className="scroll-mt-40 group"
                        >
                            <div className="flex flex-col items-center max-w-4xl mx-auto">
                                {/* Text Content */}
                                <div className="w-full text-left">
                                    <div className="flex items-center justify-center gap-4 mb-8">
                                        <div className="w-12 h-1 bg-[#3B82F6] rounded-full" />
                                        <h2 className="text-3xl font-[800] text-[#030B3B] tracking-tight text-center">{section.title}</h2>
                                        <div className="w-12 h-1 bg-[#3B82F6] rounded-full" />
                                    </div>
                                    
                                    <div 
                                        className="text-lg leading-relaxed text-slate-600 space-y-6 
                                        [&_p]:mb-4 
                                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-3
                                        [&_li]:text-slate-600
                                        [&_strong]:text-[#030B3B] [&_strong]:font-bold
                                        [&_a]:text-[#3B82F6] [&_a]:underline [&_a]:font-medium"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                </div>

                                {/* Centered Image/Visual (Only for the first section and if unique) */}
                                {(idx === 0 && study.heroImage && study.heroImage !== "/images/2023/11/section-bg.jpg") && (
                                    <div className="w-full max-w-5xl mt-16 mx-auto">
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            className="rounded-[40px] overflow-hidden bg-[#F8FAFC] border border-[#030B3B]/5 p-4 shadow-2xl shadow-blue-500/5 transition-transform duration-500 hover:scale-[1.01]"
                                        >
                                            <img 
                                                src={study.heroImage} 
                                                alt={study.title}
                                                className="w-full h-auto rounded-[32px] object-cover"
                                            />
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}

                    {/* ── Call to Action Bottom ── */}
                    <section className="p-12 sm:p-20 rounded-[64px] bg-[#030B3B] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6] rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/3 group-hover:opacity-20 transition-opacity duration-700" />
                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">Ready to achieve similar results?</h2>
                            <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto font-medium">
                                Join the leading financial institutions and enterprises that trust Hyniva for their digital transformation.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <a 
                                    href="mailto:connect@hyniva.com"
                                    className="px-12 py-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/25 min-w-[220px] text-lg"
                                >
                                    Discuss Your Project
                                </a>
                                <Link 
                                    href="/case-studies"
                                    className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all min-w-[220px] text-lg"
                                >
                                    Back to All Stories
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
