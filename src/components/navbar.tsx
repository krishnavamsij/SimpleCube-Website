"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navContent } from "@/content/site-content";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const dropdownItems: { label: string; items: { title: string; href: string; desc?: string }[] }[] = [
        { label: "Products", items: navContent.products.map(p => ({ title: p.title, href: p.href, desc: p.description })) },
        { label: "Services", items: navContent.services.map(s => ({ title: s.title, href: s.href })) },
        { label: "Industries", items: navContent.industries.map(i => ({ title: i.title, href: i.href })) },
        { label: "Insights", items: navContent.insights.map(i => ({ title: i.title, href: i.href })) },
        { label: "About", items: navContent.about.map(a => ({ title: a.title, href: a.href })) },
    ];

    return (
        <motion.header
            initial={false}
            animate={{
                width: scrolled ? "95%" : "100%",
                maxWidth: scrolled ? "1200px" : "100%",
                top: scrolled ? 20 : 0,
                borderRadius: scrolled ? "9999px" : "0px",
                x: scrolled ? "-50%" : "0%",
                left: scrolled ? "50%" : "0%",
                right: scrolled ? "auto" : "0",
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
            }}
            className={cn(
                "fixed z-50 transition-colors duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    : "bg-transparent"
            )}
        >
            <nav className="mx-auto flex h-16 max-w-[1400px] w-full items-center justify-between px-6">
                {/* Logo — white (inverted) on dark hero, full brand color when scrolled */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logos/Hyniva logo for light background.svg"
                        alt="Hyniva"
                        width={140}
                        height={40}
                        className={cn(
                            "h-10 w-auto transition-all duration-300",
                            scrolled ? "" : "brightness-0 invert"
                        )}
                        priority
                    />
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-1 lg:flex ml-8">
                    {dropdownItems.map((group) => (
                        <div
                            key={group.label}
                            className="relative"
                            onMouseEnter={() => setOpenDropdown(group.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button className={cn(
                                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors uppercase tracking-tight",
                                scrolled
                                    ? "text-slate-600 hover:text-[#2563EB]"
                                    : "text-white/90 hover:text-white"
                            )}>
                                {group.label}
                                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform opacity-50", openDropdown === group.label && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {openDropdown === group.label && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className={cn(
                                            "absolute top-[calc(100%+8px)] left-0 rounded-2xl border border-slate-100 bg-white p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
                                            group.label === "Services" ? "w-[280px]" : "w-[260px]",
                                            group.label === "Products" && "w-[340px]"
                                        )}
                                    >
                                        {group.items.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="group block rounded-xl px-4 py-3 transition-all hover:bg-slate-50"
                                            >
                                                <span className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">{item.title}</span>
                                                {item.desc && (
                                                    <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">{item.desc}</p>
                                                )}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden items-center lg:flex">
                    <Button asChild className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)] border-0 rounded-full px-7 h-10 font-bold transition-all hover:scale-105 active:scale-95">
                        <Link href="https://www.hyniva.com/contact">Contact Us</Link>
                    </Button>
                </div>

                {/* Mobile toggle */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button className={cn(
                        "p-2",
                        scrolled ? "text-foreground" : "text-white"
                    )} onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-border bg-background lg:hidden overflow-hidden"
                    >
                        <div className="divide-y divide-border px-6 py-3">
                            {dropdownItems.map((group) => (
                                <div key={group.label} className="py-3">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{group.label}</p>
                                    <div className="space-y-1">
                                        {group.items.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-3">
                                <Button asChild className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] border border-[#3B82F6]/30 rounded-full">
                                    <Link href="https://www.hyniva.com/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
