"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navContent } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { AiraChatbot } from "@/components/AiraChatbot";

export function Navbar({ forceDarkText = false }: { forceDarkText?: boolean }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const dropdownItems: { label: string; items: { title: string; href: string; desc?: string }[] }[] = [
        { label: "Products", items: navContent.products.map(p => ({ title: p.title, href: p.href })) },
        { label: "Services", items: navContent.services.map(s => ({ title: s.title, href: s.href })) },
        { label: "Industries", items: navContent.industries.map(i => ({ title: i.title, href: i.href })) },
        { label: "Insights", items: navContent.insights.map(i => ({ title: i.title, href: i.href })) },
        {
            label: "About",
            items: [
                ...navContent.about.map(a => ({ title: a.title, href: a.href })),
                { title: "Contact Us", href: "/contact" },
            ],
        },
    ];

    return (
        <motion.header
            initial={false}
            animate={{
                width: scrolled ? "82%" : "100%",
                maxWidth: scrolled ? "820px" : "1400px",
                height: scrolled ? 52 : 64,
                top: scrolled ? 16 : 0,
                borderRadius: scrolled ? "9999px" : "0px",
                backgroundColor: scrolled || forceDarkText ? "rgba(255, 255, 255, 0.92)" : "rgba(3, 11, 59, 0)",
                borderWidth: scrolled || forceDarkText ? "1px" : "0px",
                borderColor: "rgba(255, 255, 255, 0.12)",
                boxShadow: scrolled ? "0 15px 30px rgba(0,0,0,0.1)" : "none",
            }}
            transition={{
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1],
            }}
            className="fixed z-50 left-1/2 -translate-x-1/2 backdrop-blur-xl"
        >
            <nav className="mx-auto flex h-full w-full items-center px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/logos/Hyniva_logo_for_light_background.svg"
                        alt="Hyniva"
                        width={120}
                        height={32}
                        className={cn(
                            "transition-all duration-500",
                            scrolled ? "h-[26px] w-auto" : "h-9 w-auto",
                            !(scrolled || forceDarkText) && "brightness-0 invert"
                        )}
                        priority
                    />
                </Link>

                {/* Spacer 1 */}
                <motion.div
                    className="flex-1"
                    animate={{ width: scrolled ? 16 : "auto" }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                />

                {/* Desktop nav */}
                <div className="hidden items-center lg:flex gap-0">
                    {dropdownItems.map((group) => (
                        <div
                            key={group.label}
                            className="relative"
                            onMouseEnter={() => setOpenDropdown(group.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button className={cn(
                                "flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-colors uppercase tracking-tight",
                                scrolled ? "text-[12px] font-bold" : "text-sm font-bold",
                                (scrolled || forceDarkText) ? "text-slate-600 hover:text-[#2563EB]" : "text-white/90 hover:text-white"
                            )}>
                                {group.label}
                                <ChevronDown className={cn("h-3 w-3 transition-transform opacity-50", openDropdown === group.label && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {openDropdown === group.label && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className={cn(
                                            "absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
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

                {/* Spacer 2 */}
                <motion.div
                    className="flex-1"
                    animate={{ width: scrolled ? 16 : "auto" }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                />

                {/* Desktop CTA — AIRA Chatbot pill */}
                <div className="hidden lg:flex items-center shrink-0">
                    <AiraChatbot scrolled={scrolled} />
                </div>

                {/* Mobile toggle */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button className={cn(
                        "p-2",
                        (scrolled || forceDarkText) ? "text-slate-900" : "text-white"
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
                        className="border-t border-slate-100 bg-white lg:hidden overflow-hidden rounded-b-[2rem]"
                    >
                        <div className="max-h-[70vh] overflow-y-auto divide-y divide-slate-100 px-6 py-3">
                            {dropdownItems.map((group) => (
                                <div key={group.label} className="py-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{group.label}</p>
                                    <div className="space-y-1">
                                        {group.items.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-3 pb-6">
                                <Button asChild className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.5)] border-0 rounded-full h-12 font-black uppercase">
                                    <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
