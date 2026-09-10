"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { footerContent, ctaContent } from "@/content/site-content";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { CONTAINER_CLASS } from "@/lib/container-utils";
import { HighlightedHeadline } from "@/components/ui/highlighted-headline";

export function Footer({ hideCta = false }: { hideCta?: boolean }) {
  const { headline, highlightedWord, sub, cta } = ctaContent;
  const { sections, offices, linkedin, email, phone } = footerContent;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Rising isometric cubes (brand primary / secondary)
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

    // Secondary #3886CE / Primary #135498 — same mix as prior dots
    const SECONDARY = "rgba(56,134,206,";
    const PRIMARY = "rgba(19,84,152,";

    type CubeParticle = {
      x: number;
      y: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      fadeY: number;
      rot: number;
      rotSpeed: number;
    };

    const COLS = 48;
    const particles: CubeParticle[] = [];

    function initParticles() {
      particles.length = 0;
      const colW = canvas!.width / COLS;
      for (let c = 0; c < COLS; c++) {
        const count = Math.floor(Math.random() * 6) + 2;
        for (let i = 0; i < count; i++) {
          const color =
            Math.random() > 0.5
              ? SECONDARY
              : Math.random() > 0.5
                ? PRIMARY
                : SECONDARY;
          particles.push({
            x: colW * c + colW * 0.5 + (Math.random() - 0.5) * colW * 0.6,
            y: canvas!.height + Math.random() * canvas!.height,
            vy: -(0.3 + Math.random() * 0.7),
            size: Math.random() * 2.2 + 1.4,
            opacity: Math.random() * 0.5 + 0.12,
            color,
            fadeY: canvas!.height * (0.15 + Math.random() * 0.45),
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (0.004 + Math.random() * 0.01) * (Math.random() > 0.5 ? 1 : -1),
          });
        }
      }
    }
    initParticles();

    const PITCH = 0.55; // isometric-ish tilt
    const cosP = Math.cos(PITCH);
    const sinP = Math.sin(PITCH);

    // Vertex order: bit0=x, bit1=y, bit2=z → ±1
    const FACES: number[][] = [
      [0, 1, 3, 2], // -Z
      [4, 5, 7, 6], // +Z
      [0, 2, 6, 4], // -X
      [1, 5, 7, 3], // +X
      [0, 1, 5, 4], // -Y
      [2, 3, 7, 6], // +Y
    ];
    // Face shade multipliers (top brightest)
    const FACE_SHADE = [0.55, 0.7, 0.45, 0.85, 0.35, 1];

    function drawCube(
      cx: number,
      cy: number,
      size: number,
      rotY: number,
      colorPrefix: string,
      alpha: number,
    ) {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const projected: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < 8; i++) {
        const lx = i & 1 ? 1 : -1;
        const ly = i & 2 ? 1 : -1;
        const lz = i & 4 ? 1 : -1;
        // Rotate around Y
        const x1 = lx * cosY - lz * sinY;
        const z1 = lx * sinY + lz * cosY;
        const y1 = ly;
        // Pitch around X for isometric view
        const y2 = y1 * cosP - z1 * sinP;
        const z2 = y1 * sinP + z1 * cosP;
        projected.push({
          x: cx + x1 * size,
          y: cy + y2 * size,
          z: z2,
        });
      }

      const faces = FACES.map((idxs, fi) => {
        const pts = idxs.map((j) => projected[j]);
        const depth = (pts[0].z + pts[1].z + pts[2].z + pts[3].z) / 4;
        return { pts, depth, shade: FACE_SHADE[fi] };
      });

      faces.sort((a, b) => a.depth - b.depth);

      for (const face of faces) {
        const a = alpha * face.shade;
        if (a < 0.004) continue;
        ctx!.beginPath();
        ctx!.moveTo(face.pts[0].x, face.pts[0].y);
        for (let i = 1; i < 4; i++) ctx!.lineTo(face.pts[i].x, face.pts[i].y);
        ctx!.closePath();
        ctx!.fillStyle = colorPrefix + a + ")";
        ctx!.fill();
      }
    }

    const handleResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    function loop() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const h = canvas!.height;

      for (const p of particles) {
        p.y += p.vy;
        p.rot += p.rotSpeed;
        if (p.y < -16) {
          p.y = h + Math.random() * 60;
          p.rot = Math.random() * Math.PI * 2;
        }
        const heightFade = Math.max(
          0,
          Math.min(1, (p.y - p.fadeY) / (h * 0.25)),
        );
        const alpha = p.opacity * heightFade;
        if (alpha < 0.005) continue;
        drawCube(p.x, p.y, p.size, p.rot, p.color, alpha);
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
    <footer
      id="site-footer"
      className="relative overflow-hidden w-full bg-[#0A2F52] text-white"
      /* Restore original Inter metrics — Andika reads smaller at the same px sizes */
      style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}
    >
      {/* Background glowing ellipses */}
      <div
        className="absolute w-[1000px] h-[1000px] pointer-events-none z-[1] bottom-[-200px] left-[-300px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56,134,206,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute w-[800px] h-[800px] pointer-events-none z-[1] top-[10%] right-[-150px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56,134,206,0.12) 0%, transparent 70%)",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
      />

      <div className={`relative z-10 flex flex-col min-h-0 py-8 sm:py-10 lg:py-[50px] pb-10 sm:pb-16 lg:pb-[120px] ${CONTAINER_CLASS} ${hideCta ? "" : "lg:min-h-screen lg:justify-center"}`}>
        {/* ── LET'S TALK CTA SECTION ── */}
        {!hideCta && (
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center w-full mb-8 sm:mb-12 lg:mt-auto"
        >
          {/* Badge temporarily hidden from this build
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-[#3886CE] bg-[#0A2F52] border border-[#135498] rounded-full px-5 py-1.5 mb-8 sm:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3886CE] shadow-[0_0_8px_#3886CE]" />
            {label}
          </div>
          */}

          <h2
            className="text-[30px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.15] tracking-tight mb-6 sm:mb-8 text-center"
            style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}
          >
            <HighlightedHeadline
              headline={headline}
              highlightedWord={highlightedWord || "Incredible?"}
              partClassName="text-white"
              highlightClassName="text-[#135498]"
            />
          </h2>

          <p className="text-sm sm:text-base md:text-[16px] lg:text-[17.5px] xl:text-[19px] 2xl:text-[20px] font-medium text-white/70 leading-relaxed md:leading-[1.65] lg:leading-[1.7] xl:leading-[1.75] max-w-[680px] mb-6 sm:mb-12 text-center px-4 sm:px-0">
            {sub}
          </p>

          <Link
            href={cta.href}
            className="group relative inline-flex items-center justify-center gap-3 font-bold text-[14px] px-8 py-3.5 transition-all duration-300 hover:-translate-y-1 tracking-[-0.2px] rounded-full bg-[#135498] text-white shadow-[0_10px_30px_rgba(19,84,152,0.4)] hover:shadow-[0_15px_40px_rgba(19,84,152,0.6)]"
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
        )}

        {/* ── SEPARATOR LINE FROM LOGO TO COMPANY ── */}
        {!hideCta && (
        <div className="w-full border-t border-white/10 my-4 sm:my-6"></div>
        )}

        {/* ── FOOTER LINKS & BRAND ── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between pb-4 lg:mt-auto">
          {/* Brand */}
          <div className="w-full lg:max-w-sm">
            <Link href="/" className="inline-flex items-center">
              {/* SimpleCube white mark for dark footer (BrandBoard) — original logo scale */}
              <Image
                src="/logos/simplecube/logo-white.png"
                alt="SimpleCube"
                width={240}
                height={68}
                className="h-16 sm:h-20 w-auto"
              />
            </Link>

            {/* Offices */}
            <div className="mt-8 space-y-4">
              {offices.map((office) => (
                <div key={office.country} className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#3886CE]" />
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
              {phone && (
                <a
                  href={`tel:${phone.replace(/[^+0-9]/g, "")}`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
                  aria-label={phone}
                >
                  <Phone className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Link columns area */}
          <div className="flex flex-col gap-8 lg:pr-16 xl:pr-20">
            <div className="grid grid-cols-2 gap-8 sm:flex sm:flex-wrap sm:gap-16 lg:gap-16 xl:gap-24 w-full">
              {sections.map((section) => (
                <div key={section.title} className="min-w-0 sm:min-w-[120px] text-left">
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

            {/* Proud Member / Certified By temporarily hidden from this build */}
            {/*
            <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-6 sm:gap-8 lg:gap-12 xl:gap-16 border-t border-white/10 pt-6 mt-2 w-full text-left">
              <div className="flex flex-col text-left shrink-0">
                <h4 className="mb-3 sm:mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">
                  Proud Member
                </h4>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5">
                  <Image
                    src="/images/Footer/Greater_San_Antonio_Member_logo.png"
                    alt="Greater San Antonio Chamber"
                    width={100}
                    height={100}
                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                  <Image
                    src="/images/Footer/North-SA-Chamber.png"
                    alt="North San Antonio Chamber Member"
                    width={100}
                    height={100}
                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col text-left shrink-0 max-w-full">
                <h4 className="mb-3 sm:mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">
                  Certified By
                </h4>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5">
                  <Image
                    src="/images/Footer/D&b.png"
                    alt="D&B Registered"
                    width={100}
                    height={100}
                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                  <Image
                    src="/images/Footer/SOC.png"
                    alt="SOC 2 Type II Certified"
                    width={100}
                    height={100}
                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                  <Image
                    src="/images/Footer/ISO.png"
                    alt="ISO Certified"
                    width={100}
                    height={100}
                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                  <Image
                    src="/images/Footer/Certification_Badge_without_Background.png"
                    alt="Great Place to Work Certified"
                    width={100}
                    height={100}
                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </footer>
  );
}
