"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { podcastContent, PodcastEpisode } from "@/content/podcast";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, X, User, Users } from "lucide-react";
import { scrollReveal, viewportOnce, fadeInUp, staggerContainer } from "@/lib/animations";

// Helper to convert any YouTube share/watch URL into an iframe-embeddable format
const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return "";
    // Already an embed URL — return as-is
    if (url.includes("youtube.com/embed/")) return url;
    // youtu.be short links
    if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        if (parts[1]) {
            const videoId = parts[1].split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
    }
    // Standard watch URLs
    if (url.includes("youtube.com/watch")) {
        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get("v");
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        } catch {
            const match = url.match(/[?&]v=([^&]+)/);
            if (match) return `https://www.youtube.com/embed/${match[1]}`;
        }
    }
    return url;
};

export default function PodcastPage() {
    const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

    return (
        <div className="min-h-screen bg-white font-sans text-[#030B3B] overflow-x-hidden">
            <Navbar forceDarkText={true} />

            <main className="pt-28 sm:pt-32 pb-16 sm:pb-24 mx-auto w-full max-w-[1400px] px-4 sm:px-6">
                {/* ── Page Header ── */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-20"
                >
                    <motion.div variants={fadeInUp} className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 mb-8 w-fit">
                        <span className="dot bg-[#1e90ff] shadow-[#1e90ff] animate-pulse" />
                        PODCAST
                    </motion.div>

                    {/* Header Container */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8">
                        {/* Title & Description */}
                        <div className="lg:w-2/3">
                            <motion.h1
                                variants={fadeInUp}
                                className="text-4xl sm:text-5xl lg:text-[72px] font-[900] text-[#030B3B] tracking-tight leading-[1.05] mb-6 font-display"
                                dangerouslySetInnerHTML={{ __html: podcastContent.hero.title }}
                            />
                            <motion.p
                                variants={fadeInUp}
                                className="w-full text-lg leading-relaxed text-slate-600 sm:text-xl font-medium max-w-4xl"
                            >
                                Explore our technical briefings, industry roundtables, and interviews with credit union leaders and AI pioneers.
                            </motion.p>
                        </div>

                        {/* Channel Link */}
                        <motion.div variants={fadeInUp} className="shrink-0">
                            <a
                                href="https://www.youtube.com/@hynivapodcast1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1e90ff]/10 border border-[#1e90ff]/20 text-[#1e90ff] text-sm font-bold transition-all duration-300 hover:bg-[#1e90ff] hover:text-white hover:shadow-[0_0_20px_rgba(30,144,255,0.3)]"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                Visit Podcast Channel
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── Card Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {podcastContent.episodes.map((episode) => (
                        <motion.div
                            key={episode.id}
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            onClick={() => setSelectedEpisode(episode)}
                            className="group flex flex-col rounded-[32px] bg-[#ECF6FF] border border-[#030B3B]/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative cursor-pointer"
                        >
                            {/* Card Video Thumbnail Container */}
                            <div className="aspect-[1.8/1] overflow-hidden relative m-3 rounded-[24px] bg-white">
                                <div
                                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url('${encodeURI(episode.image)}')` }}
                                />
                                {/* Soft Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#ECF6FF]/20 to-transparent opacity-40" />

                                {/* Glassmorphic Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/20 border border-white/40 shadow-2xl backdrop-blur-md text-white transition-all duration-500 scale-90 group-hover:scale-100 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:shadow-[0_0_30px_rgba(30,144,255,0.6)]">
                                        <Play className="w-5 h-5 fill-white stroke-none ml-1 transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                </div>

                                {/* Duration Badge (Bottom-Right) */}
                                <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-lg">
                                    <Clock className="w-3 h-3 text-[#00D4AA]" />
                                    {episode.duration}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                                {/* Meta Row */}
                                <div className="flex items-center gap-3 mb-4 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                                    <span className="text-[#1e90ff] font-bold">{episode.category}</span>
                                    <span className="text-slate-300">•</span>
                                    <span>{episode.date}</span>
                                </div>

                                {/* Title */}
                                <h3
                                    className="font-display text-[21px] font-bold text-[#030B3B] leading-[1.4] tracking-tight mb-8 flex-1"
                                    dangerouslySetInnerHTML={{ __html: episode.title }}
                                />

                                {/* CTA Button — opens YouTube directly in a new tab */}
                                <div className="mt-auto">
                                    <a
                                        href="https://www.youtube.com/watch?v=oROwZ4z7Yow"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center justify-between w-full py-4 px-6 bg-white border border-[#1e90ff]/20 rounded-2xl text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                    >
                                        Watch Episode
                                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* ── Video Lightbox Modal ── */}
            <AnimatePresence>
                {selectedEpisode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEpisode(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg cursor-pointer"
                    >
                        {/* Fixed Close Button */}
                        <button
                            onClick={() => setSelectedEpisode(null)}
                            className="fixed top-6 right-6 z-[110] p-3 rounded-full bg-slate-950/60 text-white/80 hover:bg-slate-950/85 hover:text-white transition-all duration-200 border border-white/10 backdrop-blur-sm shadow-xl hover:scale-110"
                            aria-label="Close video player"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 30, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-3xl bg-slate-900 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto cursor-default"
                        >
                            {/* Responsive 16:9 iframe container */}
                            <div className="relative w-full aspect-video bg-black">
                                <iframe
                                    src={`${getYouTubeEmbedUrl(selectedEpisode.videoUrl)}?autoplay=1`}
                                    title={selectedEpisode.title}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>

                            {/* Modal Details */}
                            <div className="p-6 bg-slate-950 text-white">
                                <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1e90ff] bg-[#1e90ff]/10 px-2.5 py-1 rounded-md border border-[#1e90ff]/20">
                                        {selectedEpisode.category}
                                    </span>
                                    <span>•</span>
                                    <span>{selectedEpisode.date}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 text-[#00D4AA]">
                                        <Clock className="w-3 h-3" /> {selectedEpisode.duration}
                                    </span>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-tight text-white mb-3">
                                    {selectedEpisode.title}
                                </h2>

                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                                    {selectedEpisode.description}
                                </p>

                                {/* Host / Guest Metadata */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <User className="w-4 h-4 text-[#00D4AA] shrink-0" />
                                        <span><strong className="text-white">Host:</strong> {selectedEpisode.host}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Users className="w-4 h-4 text-[#1e90ff] shrink-0" />
                                        <span><strong className="text-white">Guest:</strong> {selectedEpisode.guest}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
