"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { ctaContent } from "@/content/site-content";
import Link from "next/link";

export function CtaBanner() {
    const { label, headline, sub, cta } = ctaContent;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const section = canvas.parentElement;
        if (!section) return;

        let animationFrameId: number;

        function resize() {
            canvas!.width = section!.offsetWidth;
            canvas!.height = section!.offsetHeight;
        }
        resize();

        // ── BRAND COLORS ──
        const TEAL = 'rgba(0,212,170,';
        const CYAN = 'rgba(0,168,255,';
        const TEAL2 = 'rgba(0,212,212,';

        // ── PARTICLE COLUMNS ──
        const COLS = 48;
        const particles: any[] = [];

        function initParticles() {
            particles.length = 0;
            const colW = canvas!.width / COLS;
            for (let c = 0; c < COLS; c++) {
                const count = Math.floor(Math.random() * 6) + 2;
                for (let i = 0; i < count; i++) {
                    const color = Math.random() > 0.5 ? TEAL : (Math.random() > 0.5 ? CYAN : TEAL2);
                    particles.push({
                        x: colW * c + colW * 0.5 + (Math.random() - 0.5) * colW * 0.6,
                        y: canvas!.height + Math.random() * canvas!.height,
                        vy: -(0.3 + Math.random() * 0.7),
                        r: Math.random() * 1.8 + 0.5,
                        opacity: Math.random() * 0.5 + 0.1,
                        color,
                        fadeY: canvas!.height * (0.15 + Math.random() * 0.45),
                    });
                }
            }
        }
        initParticles();

        const handleResize = () => {
            resize();
            initParticles();
        };
        window.addEventListener("resize", handleResize);

        let last = 0;
        function loop(ts: number) {
            const dt = ts - last;
            last = ts;

            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            const w = canvas!.width;
            const h = canvas!.height;

            for (const p of particles) {
                p.y += p.vy;
                if (p.y < -10) {
                    p.y = h + Math.random() * 60;
                }
                const heightFade = Math.max(0, Math.min(1, (p.y - p.fadeY) / (h * 0.25)));
                const alpha = p.opacity * heightFade;
                if (alpha < 0.005) continue;
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx!.fillStyle = p.color + alpha + ')';
                ctx!.fill();
            }

            animationFrameId = requestAnimationFrame(loop);
        }
        animationFrameId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full px-6 py-20 pb-20 sm:py-28 lg:px-8">
            <section 
                className="relative overflow-hidden w-full max-w-[1400px] mx-auto rounded-[28px] shadow-2xl"
                style={{ background: "linear-gradient(135deg, #030B3B 0%, #0E1D4E 35%, #0a2060 60%, #030B3B 100%)" }}
            >
                <div className="absolute w-[500px] h-[500px] pointer-events-none z-[1] bottom-[-160px] left-[-80px]" style={{ background: "radial-gradient(ellipse, rgba(0,212,170,0.2) 0%, transparent 65%)" }} />
                <div className="absolute w-[420px] h-[360px] pointer-events-none z-[1] top-[-100px] right-[-60px]" style={{ background: "radial-gradient(ellipse, rgba(0,168,255,0.13) 0%, transparent 65%)" }} />
                
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[2]" />

                <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-16 pt-16 pb-20 sm:pt-20 sm:pb-24">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-col items-center w-full">
                        
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 rounded-full px-5 py-1.5 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff] animate-pulse" />
                            {label}
                        </div>

                        <h2 className="font-extrabold text-[#ffffff] text-[32px] sm:text-5xl lg:text-[50px] leading-[1.08] tracking-tight mb-6 w-full max-w-none lg:whitespace-nowrap">
                            {headline.split("simplify").map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[#00D4AA] to-[#00A8FF]">simplify</em>}
                                </React.Fragment>
                            ))}
                        </h2>

                        <p className="text-[21px] font-medium text-white/60 leading-[1.65] max-w-[640px] mb-12">
                            {sub.split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                            ))}
                        </p>

                        <Link
                            href={cta.href}
                            className="group inline-flex items-center justify-center gap-2.5 font-bold text-[15px] px-10 py-[18px] transition-all duration-300 hover:-translate-y-1 tracking-[-0.2px] rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3b82f6]/30 hover:opacity-90 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]"
                        >
                            {cta.label}
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>

                    </motion.div>
                </div>
            </section>
        </div>
    );
}
