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
                className="relative overflow-hidden w-full max-w-[1400px] mx-auto rounded-[28px] shadow-2xl bg-[#030B3B]"
            >
                <div className="absolute w-[600px] h-[600px] pointer-events-none z-[1] bottom-[-200px] left-[-100px]" style={{ background: "radial-gradient(ellipse, rgba(0,212,170,0.25) 0%, transparent 70%)" }} />
                <div className="absolute w-[500px] h-[450px] pointer-events-none z-[1] top-[-120px] right-[-80px]" style={{ background: "radial-gradient(ellipse, rgba(0,168,255,0.18) 0%, transparent 70%)" }} />
                
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[2]" />

                <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-16 pt-16 pb-20 sm:pt-20 sm:pb-24">
                    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-col items-center w-full">
                        
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3B82F6] bg-[#0A123A] border border-[#1E3A8A] rounded-full px-5 py-1.5 mb-8 sm:mb-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
                            {label}
                        </div>

                        <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#ffffff] leading-[1.1] tracking-tight mb-8 w-full max-w-none">
                            {headline.split("simplify").map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4AA] to-[#3B82F6]">simplify</span>}
                                </React.Fragment>
                            ))}
                        </h2>

                        <p className="text-base sm:text-lg md:text-[16px] lg:text-[17.5px] xl:text-[19px] 2xl:text-[20px] font-medium text-white/70 leading-relaxed md:leading-[1.65] lg:leading-[1.7] xl:leading-[1.75] max-w-[680px] mb-12 px-2 sm:px-0">
                            {sub.split("Just a real conversation about your challenges.").map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className="block mt-1">
                                            Just a real conversation about your challenges.
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </p>

                        <Link
                            href={cta.href}
                            className="group relative inline-flex items-center justify-center gap-3 font-bold text-[14px] px-8 py-3.5 transition-all duration-300 hover:-translate-y-1 tracking-[-0.2px] rounded-full bg-[#3B82F6] text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.6)]"
                        >
                            {cta.label}
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
