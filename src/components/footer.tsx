"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { footerContent, ctaContent } from "@/content/site-content";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { CONTAINER_CLASS } from "@/lib/container-utils";

export function Footer() {
  const { label, headline, sub, cta } = ctaContent;
  const { sections, offices, linkedin, email } = footerContent;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation logic from previously existing CtaBanner
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

    const TEAL = "rgba(0,212,170,";
    const CYAN = "rgba(0,168,255,";
    const TEAL2 = "rgba(0,212,212,";

    const COLS = 48;
    const particles: any[] = [];

    function initParticles() {
      particles.length = 0;
      const colW = canvas!.width / COLS;
      for (let c = 0; c < COLS; c++) {
        const count = Math.floor(Math.random() * 6) + 2;
        for (let i = 0; i < count; i++) {
          const color =
            Math.random() > 0.5 ? TEAL : Math.random() > 0.5 ? CYAN : TEAL2;
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
        const heightFade = Math.max(
          0,
          Math.min(1, (p.y - p.fadeY) / (h * 0.25)),
        );
        const alpha = p.opacity * heightFade;
        if (alpha < 0.005) continue;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color + alpha + ")";
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
    <footer id="site-footer" className="relative overflow-hidden w-full bg-[#030B3B] text-white">
      {/* Background glowing ellipses */}
      <div
        className="absolute w-[1000px] h-[1000px] pointer-events-none z-[1] bottom-[-200px] left-[-300px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,212,170,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute w-[800px] h-[800px] pointer-events-none z-[1] top-[10%] right-[-150px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,168,255,0.12) 0%, transparent 70%)",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
      />

      <div className={`relative z-10 flex flex-col min-h-screen justify-center py-[30px] sm:py-[40px] lg:py-[50px] ${CONTAINER_CLASS}`}>
        {/* ── LET'S TALK CTA SECTION ── */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center w-full mb-8 sm:mb-12 mt-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3B82F6] bg-[#0A123A] border border-[#1E3A8A] rounded-full px-5 py-1.5 mb-8 sm:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
            {label}
          </div>

          <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.1] tracking-tight mb-8 text-left sm:text-center">
            {headline.split("simplify").map((part, i, arr) => (
              <React.Fragment key={i}>
                <span className="text-white">{part}</span>
                {i < arr.length - 1 && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4AA] to-[#3B82F6]">
                    simplify
                  </span>
                )}
              </React.Fragment>
            ))}
          </h2>

          <p className="text-[18px] sm:text-[21px] font-medium text-white/70 leading-[1.65] max-w-[720px] mb-12 text-left sm:text-center">
            {sub.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>

          <Link
            href={cta.href}
            className="group relative inline-flex items-center justify-center gap-3 font-bold text-[14px] px-8 py-3.5 transition-all duration-300 hover:-translate-y-1 tracking-[-0.2px] rounded-full bg-[#3B82F6] text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.6)]"
          >
            {cta.label}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>

        {/* ── SEPARATOR LINE FROM LOGO TO COMPANY ── */}
        <div className="w-full border-t border-white/10 my-4 sm:my-6"></div>

        {/* ── FOOTER LINKS & BRAND ── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8 pb-4 mt-auto">
          {/* Brand */}
          <div className="w-full lg:max-w-sm">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/Hyniva_partial_colour_1.svg"
                alt="Hyniva"
                width={240}
                height={68}
                className="h-16 sm:h-20 w-auto"
              />
            </Link>

            {/* Offices */}
            <div className="mt-8 space-y-4">
              {offices.map((office) => (
                <div key={office.country} className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00D4AA]" />
                  <span className="text-sm">
                    <strong className="text-white">{office.country}</strong>
                    <br />
                    <span className="whitespace-pre-line leading-relaxed text-white/70">
                      {office.address}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-8 flex gap-3">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns area */}
          <div className="flex flex-col gap-8 lg:w-auto lg:ml-auto">
            <div className="flex flex-wrap gap-12 sm:gap-16 lg:gap-16 xl:gap-24 w-full">
              {sections.map((section) => (
                <div key={section.title} className="min-w-[120px] text-left">
                  <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-white text-left">
                    {section.title}
                  </h5>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.title} className="text-left">
                        <Link
                          href={link.href}
                          className="text-sm text-white/60 transition-colors hover:text-white hover:font-medium text-left"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer Badges & Certifications - starts exactly from Services left align to right */}
            <div className="flex flex-row flex-wrap gap-10 sm:gap-20 border-t border-white/10 pt-6 mt-2 w-full text-left">
              <div className="text-left">
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/60 text-left">
                  Proud Member
                </h4>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <Image
                    src="/images/Footer/Greater_San_Antonio_Member_logo.png"
                    alt="Greater San Antonio Chamber"
                    width={100}
                    height={100}
                    className="h-16 sm:h-20 w-auto object-contain"
                  />
                  <Image
                    src="/images/Footer/North-SA-Chamber.png"
                    alt="North San Antonio Chamber Member"
                    width={100}
                    height={100}
                    className="h-16 sm:h-20 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="ml-0 sm:ml-4 text-left">
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/60 text-left">
                  Certified By
                </h4>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {/* DUNS Registered Seal */}
                  <iframe
                    id="Iframe1"
                    src="https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=874090808"
                    width="114"
                    height="97"
                    scrolling="no"
                    style={{ 
                      border: 'none', 
                      backgroundColor: 'transparent',
                      display: 'block'
                    }}
                    title="DUNS Registered Seal"
                  />
                  <Image
                    src="/images/Footer/SOC.png"
                    alt="SOC"
                    width={100}
                    height={100}
                    className="h-16 sm:h-20 w-auto object-contain"
                  />
                  <Image
                    src="/images/Footer/ISO.png"
                    alt="ISO Certification"
                    width={100}
                    height={100}
                    className="h-16 sm:h-20 w-auto object-contain"
                  />
                  <Image
                    src="/images/Footer/Certification_Badge_without_Background.png"
                    alt="Great Place to Work Certification"
                    width={100}
                    height={100}
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
