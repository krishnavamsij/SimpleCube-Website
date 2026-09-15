"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
    { label: "Overview", href: "/#why-simplecube" },
    { label: "Services", href: "/#core-expertise" },
    { label: "Careers", href: "/#careers-section" },
] as const;

export function Navbar({ forceDarkText = false }: { forceDarkText?: boolean }) {
    void forceDarkText;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isLightChrome = scrolled || mobileOpen;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const linkClassName = () =>
        cn(
            "rounded-full transition-all uppercase tracking-tight",
            scrolled ? "px-2 py-1 text-[11px] font-bold" : "px-2.5 py-1.5 text-sm font-bold",
            isLightChrome ? "text-slate-600 hover:text-slate-900" : "text-white/90 hover:text-white",
        );

    return (
        <>
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            <motion.header
                initial={false}
                animate={{
                    width: mobileOpen ? "100%" : scrolled ? "85%" : "100%",
                    maxWidth: mobileOpen ? "100%" : scrolled ? "660px" : "100%",
                    left: scrolled && !mobileOpen ? "50%" : "0%",
                    x: scrolled && !mobileOpen ? "-50%" : "0%",
                    top: mobileOpen ? 0 : scrolled ? 14 : 0,
                    borderRadius: mobileOpen ? "0 0 2rem 2rem" : scrolled ? "9999px" : "0px",
                    backgroundColor: mobileOpen
                        ? "#ffffff"
                        : scrolled
                          ? "rgba(255, 255, 255, 0.75)"
                          : "#135498",
                    borderWidth: mobileOpen || scrolled ? "1px" : "0px",
                    borderColor: mobileOpen
                        ? "rgba(226, 232, 240, 0.8)"
                        : scrolled
                          ? "rgba(255, 255, 255, 0.4)"
                          : "transparent",
                    boxShadow: mobileOpen
                        ? "0 20px 30px -10px rgba(0, 0, 0, 0.12)"
                        : scrolled
                          ? "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)"
                          : "0 4px 16px rgba(10, 47, 82, 0.18)",
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.32, 0.72, 0, 1],
                }}
                className="fixed z-50 backdrop-blur-xl"
                style={{ position: "fixed" }}
            >
                <div className="relative w-full">
                    <nav
                        className={cn(
                            "flex w-full items-center transition-all duration-300",
                            scrolled && !mobileOpen ? "h-[46px] px-4" : "h-[64px] px-6 md:px-10 lg:px-16",
                        )}
                    >
                        <Link href="/" className="flex shrink-0 items-center">
                            <Image
                                src={
                                    isLightChrome
                                        ? "/logos/simplecube/logo-blue.png"
                                        : "/logos/simplecube/logo-white.png"
                                }
                                alt="SimpleCube"
                                width={180}
                                height={42}
                                className={cn(
                                    "transition-all duration-500",
                                    scrolled && !mobileOpen ? "h-[22px] w-auto" : "h-9 w-auto",
                                )}
                                priority
                            />
                        </Link>

                        <div className="flex-1" />

                        <div className="relative hidden items-center gap-0 lg:flex">
                            {navLinks.map((link) => (
                                <Link key={link.label} href={link.href} className={linkClassName()}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex-1" />

                        <div className="hidden shrink-0 items-center lg:flex">
                            <Link href="/contact">
                                <button
                                    className={cn(
                                        "relative flex cursor-pointer items-center justify-center rounded-full border-none font-black uppercase tracking-wide transition-all duration-300",
                                        scrolled ? "h-7 px-3.5 text-[10px]" : "h-9 px-5 text-[12px]",
                                        isLightChrome ? "text-white" : "text-[#135498]",
                                    )}
                                    style={{
                                        background: isLightChrome ? "#135498" : "#ffffff",
                                        boxShadow: isLightChrome
                                            ? "0 2px 8px rgba(19,84,152,0.3)"
                                            : "0 2px 8px rgba(10,47,82,0.15)",
                                    }}
                                    onMouseEnter={(e) => {
                                        const btn = e.currentTarget as HTMLButtonElement;
                                        if (isLightChrome) {
                                            btn.style.background = "#0F427A";
                                            btn.style.boxShadow = "0 4px 12px rgba(19,84,152,0.5)";
                                        } else {
                                            btn.style.background = "#F5F9FC";
                                            btn.style.boxShadow = "0 4px 12px rgba(10,47,82,0.2)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const btn = e.currentTarget as HTMLButtonElement;
                                        if (isLightChrome) {
                                            btn.style.background = "#135498";
                                            btn.style.boxShadow = "0 2px 8px rgba(19,84,152,0.3)";
                                        } else {
                                            btn.style.background = "#ffffff";
                                            btn.style.boxShadow = "0 2px 8px rgba(10,47,82,0.15)";
                                        }
                                    }}
                                >
                                    CONTACT US
                                </button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 lg:hidden">
                            <button
                                className={cn("p-2", isLightChrome ? "text-slate-900" : "text-white")}
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </nav>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden rounded-b-[2rem] border-t border-slate-100 bg-white lg:hidden"
                        >
                            <div className="max-h-[70vh] divide-y divide-slate-100 overflow-y-auto px-6 py-3">
                                {navLinks.map((link) => (
                                    <div key={link.label} className="py-3">
                                        <Link
                                            href={link.href}
                                            className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-[#135498]"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </div>
                                ))}
                                <div className="pb-6 pt-3">
                                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                                        <Button className="w-full rounded-full bg-[#135498] text-[12px] font-black uppercase tracking-wide text-white hover:bg-[#0F427A]">
                                            CONTACT US
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
