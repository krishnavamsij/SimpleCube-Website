"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { podcastContent, PodcastEpisode } from "@/content/podcast";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, X, User, Users } from "lucide-react";
import {
    scrollReveal,
    viewportOnce,
    fadeInUp,
    staggerContainer,
} from "@/lib/animations";

// Helper to convert YouTube URL to embed format
const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return "";

    if (url.includes("youtube.com/embed/")) return url;

    if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        if (parts[1]) {
            const videoId = parts[1].split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
    }

    if (url.includes("youtube.com/watch")) {
        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get("v");

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } catch {
            const match = url.match(/[?&]v=([^&]+)/);

            if (match) {
                return `https://www.youtube.com/embed/${match[1]}`;
            }
        }
    }

    return url;
};

export default function PodcastPage() {
    const [selectedEpisode, setSelectedEpisode] =
        useState<PodcastEpisode | null>(null);

    return (
        <div className="min-h-screen bg-white font-sans text-[#030B3B] overflow-x-hidden">
            <Navbar forceDarkText={true} />

            <main className="pt-28 sm:pt-32 pb-16 sm:pb-24 mx-auto w-full max-w-[1400px] px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-10"
                >
                    {/* Eyebrow */}
                    <motion.div
                        variants={fadeInUp}
                        className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 mb-0 w-fit"
                    >
                        <span className="dot bg-[#1e90ff] shadow-[#1e90ff] animate-pulse" />
                        CU TECH PODCAST
                    </motion.div>

                    {/* Header Content */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-2 sm:gap-8">
                        {/* Left Content */}
                        <div className="lg:w-2/3 flex flex-col gap-0">
                            {/* Logo */}
                            <motion.div variants={fadeInUp} className="-mt-4 sm:-mt-6">
                                <Image
                                    src="/images/Podcast/CU_Next_Podcast_logo.png"
                                    alt="CU NEXT Podcast"
                                    width={400}
                                    height={150}
                                    priority
                                    className="w-auto max-w-[250px] sm:max-w-[320px] lg:max-w-[380px] h-auto object-contain -ml-2"
                                />
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                variants={fadeInUp}
                                className="w-full text-lg leading-relaxed text-slate-600 sm:text-xl font-medium max-w-4xl -mt-4 sm:-mt-6"
                            >
                                {podcastContent.hero.description}
                            </motion.p>
                        </div>

                        {/* Button */}
                        <motion.div variants={fadeInUp} className="shrink-0">
                            <a
                                href="https://www.youtube.com/@hynivapodcast1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1e90ff]/10 border border-[#1e90ff]/20 text-[#1e90ff] text-sm font-bold transition-all duration-300 hover:bg-[#1e90ff] hover:text-white hover:shadow-[0_0_20px_rgba(30,144,255,0.3)]"
                            >
                                Visit Podcast Channel
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Podcast Cards */}
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
                            {/* Thumbnail */}
                            <div className="aspect-[1.8/1] overflow-hidden relative m-1 rounded-[24px] bg-white">
                                <div
                                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url('${encodeURI(
                                            episode.image
                                        )}')`,
                                    }}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#ECF6FF]/20 to-transparent opacity-40" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/20 border border-white/40 shadow-2xl backdrop-blur-md text-white transition-all duration-500 scale-90 group-hover:scale-100 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:shadow-[0_0_30px_rgba(30,144,255,0.6)]">
                                        <Play className="w-5 h-5 fill-white stroke-none ml-1 transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                </div>


                            </div>

                            {/* Card Content */}
                            <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                                {/* Meta */}
                                <div className="flex items-center gap-3 mb-4 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                                    <span className="text-[#1e90ff] font-bold">
                                        {episode.category}
                                    </span>

                                    <span className="text-slate-300">•</span>

                                    <span>{episode.date}</span>
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-[21px] font-bold text-[#030B3B] leading-[1.4] tracking-tight mb-8 flex-1">
                                    {episode.title}
                                </h3>

                                {/* Button */}
                                <div className="mt-auto">
                                    <a
                                        href="https://www.youtube.com/watch?v=oROwZ4z7Yow"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center justify-between w-full py-4 px-6 bg-white border border-[#1e90ff]/20 rounded-2xl text-sm font-bold text-[#1e90ff] transition-all duration-300 group-hover:bg-[#1e90ff] group-hover:border-[#1e90ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                    >
                                        Watch Episode

                                        <svg
                                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Modal */}
            <AnimatePresence>
                {selectedEpisode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEpisode(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg cursor-pointer"
                    >
                        {/* Close */}
                        <button
                            onClick={() => setSelectedEpisode(null)}
                            className="fixed top-6 right-6 z-[110] p-3 rounded-full bg-slate-950/60 text-white/80 hover:bg-slate-950/85 hover:text-white transition-all duration-200 border border-white/10 backdrop-blur-sm shadow-xl hover:scale-110"
                            aria-label="Close video player"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Modal Box */}
                        <motion.div
                            initial={{ scale: 0.95, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 30, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-3xl bg-slate-900 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto cursor-default"
                        >
                            {/* Video */}
                            <div className="relative w-full aspect-video bg-black">
                                <iframe
                                    src={`${getYouTubeEmbedUrl(
                                        selectedEpisode.videoUrl
                                    )}?autoplay=1`}
                                    title={selectedEpisode.title}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>

                            {/* Details */}
                            <div className="p-6 bg-slate-950 text-white">
                                <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1e90ff] bg-[#1e90ff]/10 px-2.5 py-1 rounded-md border border-[#1e90ff]/20">
                                        {selectedEpisode.category}
                                    </span>

                                    <span>•</span>

                                    <span>{selectedEpisode.date}</span>

                                    <span>•</span>

                                    <span className="flex items-center gap-1 text-[#00D4AA]">
                                        <Clock className="w-3 h-3" />
                                        {selectedEpisode.duration}
                                    </span>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-tight text-white mb-3">
                                    {selectedEpisode.title}
                                </h2>

                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                                    {selectedEpisode.description}
                                </p>

                                {/* Host / Guest */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm">
                                    {/* Host */}
                                    <div className="flex flex-col gap-1 text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-[#00D4AA] shrink-0" />

                                            <span>
                                                <strong className="text-white">
                                                    Host:
                                                </strong>{" "}
                                                {selectedEpisode.host}
                                            </span>
                                        </div>

                                        {selectedEpisode.hostRole && (
                                            <span className="text-[11px] text-slate-400 pl-6">
                                                {selectedEpisode.hostRole}
                                            </span>
                                        )}
                                    </div>

                                    {/* Guest */}
                                    <div className="flex flex-col gap-1 text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-[#1e90ff] shrink-0" />

                                            <span>
                                                <strong className="text-white">
                                                    Guest:
                                                </strong>{" "}
                                                {selectedEpisode.guest}
                                            </span>
                                        </div>

                                        {selectedEpisode.guestRole && (
                                            <span className="text-[11px] text-slate-400 pl-6">
                                                {selectedEpisode.guestRole}
                                            </span>
                                        )}
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