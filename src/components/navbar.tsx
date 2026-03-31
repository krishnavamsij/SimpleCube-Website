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
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
                    : "bg-transparent"
            )}
        >
            <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
                {/* Logo — white (inverted) on dark hero, full brand color when scrolled */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logos/Hyniva logo for light background.svg"
                        alt="Hyniva"
                        width={140}
                        height={40}
                        className={cn(
                            "h-12 w-auto transition-all duration-300",
                            scrolled ? "" : "brightness-0 invert"
                        )}
                        priority
                    />
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-1 lg:flex">
                    {dropdownItems.map((group) => (
                        <div
                            key={group.label}
                            className="relative"
                            onMouseEnter={() => setOpenDropdown(group.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button className={cn(
                                "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                scrolled
                                    ? "text-muted-foreground hover:text-foreground"
                                    : "text-white/80 hover:text-white"
                            )}>
                                {group.label}
                                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openDropdown === group.label && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {openDropdown === group.label && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.15 }}
                                        className={cn(
                                            "absolute top-full left-0 mt-1 rounded-xl border border-border bg-card p-2 shadow-xl",
                                            group.label === "Services" ? "w-[280px]" : "w-[260px]",
                                            group.label === "Products" && "w-[340px]"
                                        )}
                                    >
                                        {group.items.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                                            >
                                                <span className="text-sm font-medium text-card-foreground">{item.title}</span>
                                                {item.desc && (
                                                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground line-clamp-2">{item.desc}</p>
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
                <div className="hidden items-center gap-3 lg:flex">
                    <Button asChild className="bg-blue-600 text-white hover:bg-blue-500">
                        <Link href="/contact">Contact Us</Link>
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
                                <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-500">
                                    <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
