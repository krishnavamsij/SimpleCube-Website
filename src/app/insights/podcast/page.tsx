"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { podcastContent, PodcastEpisode } from "@/content/podcast";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, X, User, Users, Volume2, VolumeX } from "lucide-react";
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
    const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.0;
            videoRef.current.muted = false; // Try playing unmuted so the voice plays on hover
            videoRef.current.play().then(() => {
                setIsMuted(false);
            }).catch((err) => {
                console.warn("Unmuted podcast hover play failed, attempting muted:", err);
                if (videoRef.current) {
                    videoRef.current.muted = true; // Fallback to muted if blocked by browser policy
                    videoRef.current.play().then(() => {
                        setIsMuted(true);
                    }).catch((err2) => {
                        console.error("Muted podcast hover play failed too:", err2);
                    });
                }
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.muted = true;
            setIsMuted(true);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            const newMuted = !videoRef.current.muted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#030B3B] overflow-x-hidden">
            <Navbar forceDarkText={true} />

            <main className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 mx-auto w-full max-w-[96rem] px-4 sm:px-8 lg:px-12">
                {/* Header Section - Modern Left-Right Aligned Design */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="w-full max-w-[1240px] mx-auto mb-6"
                >
                    {/* Eyebrow - Left Aligned */}
                    <motion.div
                        variants={fadeInUp}
                        className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 rounded-full px-4 py-1 text-xs font-semibold tracking-wider flex items-center gap-2 w-fit relative z-10 mb-3 sm:mb-4"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#1e90ff] animate-pulse" />
                        PODCAST
                    </motion.div>

                    {/* Logo and Content Row */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
                        {/* Left Side: Logo + LinkedIn */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center gap-4 shrink-0 md:-mt-10"
                        >
                            <Image
                                src="/images/Podcast/CU_Next_Podcast_logo.png"
                                alt="CU NEXT Podcast"
                                width={700}
                                height={280}
                                priority
                                className="h-24 sm:h-32 lg:h-36 w-auto object-contain"
                            />

                            <a
                                href="https://www.linkedin.com/company/cu-next/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit CU Next on LinkedIn"
                                className="inline-flex h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 items-center justify-center translate-y-2 transition-all duration-300 hover:translate-y-1 hover:scale-110"
                            >
                                <Image
                                    src="/images/linkedin (3).png"
                                    alt="LinkedIn"
                                    width={36}
                                    height={36}
                                    className="h-full w-full object-contain"
                                />
                            </a>
                        </motion.div>

                        {/* Right Side: Description Content + Button below it */}
                        <div className="flex flex-col items-start md:items-end text-left md:text-right gap-3 max-w-[550px]">
                            {/* Description - slightly larger font size, right-aligned on desktop, constrained to two-liner wrap */}
                            <motion.p
                                variants={fadeInUp}
                                className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium max-w-[530px]"
                            >
                                Bringing together Credit Union leaders who are driving real transformation to share insights, experiences and strategies shaping the industry&apos;s future.
                            </motion.p>

                            {/* Button */}
                            <motion.div variants={fadeInUp}>
                                <a
                                    href="https://www.youtube.com/@hynivapodcast1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-white border border-[#1e90ff]/30 px-6 py-2.5 text-sm font-semibold text-[#1e90ff] shadow-sm transition-all duration-300 hover:bg-[#1e90ff] hover:text-white hover:border-[#1e90ff] hover:shadow-[0_4px_20px_rgba(30,144,255,0.25)]"
                                >
                                    <span>Visit Podcast Channel</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Video Trailer Banner (Exact Podcast_trailer.png design with Hover Video) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={fadeInUp}
                    className="mb-6 sm:mb-8 flex justify-center w-full max-w-[900px] mx-auto"
                >
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => setIsTrailerModalOpen(true)}
                        className="relative w-full cursor-pointer bg-transparent border-0 outline-none shadow-none rounded-[24px] sm:rounded-[28px] overflow-hidden"
                    >
                        {/* Trailer Thumbnail — full image, no crop */}
                        <Image
                            src="/images/Podcast/podcast_thumbnail.png"
                            alt="CU NEXT Trailer"
                            width={1024}
                            height={481}
                            priority
                            className="w-full h-auto object-contain rounded-[24px] sm:rounded-[28px] block"
                        />

                        {/* Video Layer (Plays cleanly on hover with 0 shift & 0 grey border) */}
                        <video
                            ref={videoRef}
                            src="/videos/podcast_trailer_recap.mp4"
                            loop
                            muted={isMuted}
                            playsInline
                            preload="metadata"
                            onLoadedMetadata={(e) => {
                                e.currentTarget.playbackRate = 1.0;
                            }}
                            className={`absolute inset-0 w-full h-full object-cover rounded-[24px] sm:rounded-[28px] pointer-events-none transition-opacity duration-200 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                        />

                        {/* Volume Button Overlay */}
                        {isHovered && (
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-6 right-6 z-30 p-2 rounded-full bg-black/60 text-white/90 hover:bg-black/85 hover:text-white transition-all duration-200 border border-white/20 backdrop-blur-md shadow-lg hover:scale-110"
                                aria-label={isMuted ? "Unmute trailer" : "Mute trailer"}
                            >
                                {isMuted ? (
                                    <VolumeX className="w-4 h-4" />
                                ) : (
                                    <Volume2 className="w-4 h-4" />
                                )}
                            </button>
                        )}

                        {/* Play Button Overlay (Visible only on mobile/tablet) */}
                        <div className="absolute inset-0 flex lg:hidden items-center justify-center pointer-events-none z-10">
                            <div className={`rounded-full flex items-center justify-center bg-white/20 border border-white/40 shadow-2xl backdrop-blur-md text-white transition-all duration-300 ${
                                isHovered ? "scale-90 opacity-0" : "scale-100 opacity-100"
                            } w-12 h-12 sm:w-16 sm:h-16`}>
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white stroke-none ml-0.5 sm:ml-1" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Section Header: Latest Episodes (Flex row layout to prevent overlap on mobile) */}
                <div className="relative flex flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 w-full max-w-[1240px] mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#030B3B] tracking-tight">
                        Latest Episodes
                    </h2>

                    <a
                        href="https://www.youtube.com/@hynivapodcast1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1e90ff] hover:text-[#0066cc] transition-colors shrink-0"
                    >
                        <span>View all Episodes</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* Podcast Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1240px] mx-auto">
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
                                        backgroundImage: `url('${encodeURI(episode.image)}')`,
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
                                <h3 className="font-display text-[18px] sm:text-xl font-bold text-[#030B3B] leading-[1.3] tracking-tight mb-8 flex-1">
                                    {episode.title}
                                </h3>

                                {/* Button */}
                                <div className="mt-auto">
                                    <a
                                        href={episode.videoUrl}
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

            {/* Trailer Video Modal (Opens on Trailer Card Click) */}
            <AnimatePresence>
                {isTrailerModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsTrailerModalOpen(false)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg cursor-pointer"
                    >
                        <button
                            onClick={() => setIsTrailerModalOpen(false)}
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
                            className="relative w-full max-w-4xl bg-slate-900 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] max-h-[90vh] cursor-default"
                        >
                            <div className="relative w-full aspect-video bg-black">
                                <iframe
                                    src={`${getYouTubeEmbedUrl(podcastContent.trailer?.videoUrl || "https://www.youtube.com/watch?v=w_bhmjRtS3s")}?autoplay=1`}
                                    title={podcastContent.trailer?.title || "What's Next in Credit Unions?"}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>

                            <div className="p-6 bg-slate-950 text-white">
                                <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-md border border-[#10B981]/20">
                                        TRAILER
                                    </span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white mb-2">
                                    {podcastContent.trailer?.title || "What's Next in Credit Unions?"}
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    {podcastContent.trailer?.description || "Real Conversations. Real Impact. A preview of the insights, ideas and inspiration waiting on CUNEXT."}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Episode Modal (YouTube Player) */}
            <AnimatePresence>
                {selectedEpisode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEpisode(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg cursor-pointer"
                    >
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
                            <div className="relative w-full aspect-video bg-black">
                                <iframe
                                    src={`${getYouTubeEmbedUrl(selectedEpisode.videoUrl)}?autoplay=1`}
                                    title={selectedEpisode.seriesTitle}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>

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
                                    {selectedEpisode.seriesTitle}
                                </h2>

                                <p className="text-slate-400 text-xs sm:text-[16px] leading-relaxed mb-5">
                                    {selectedEpisode.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm">
                                    <div className="flex flex-col gap-1 text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-[#00D4AA] shrink-0" />
                                            <span>
                                                <strong className="text-white">Host:</strong> {selectedEpisode.host}
                                            </span>
                                        </div>
                                        {selectedEpisode.hostRole && (
                                            <span className="text-[11px] text-slate-400 pl-6">
                                                {selectedEpisode.hostRole}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1 text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-[#1e90ff] shrink-0" />
                                            <span>
                                                <strong className="text-white">Guest:</strong> {selectedEpisode.guest}
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

