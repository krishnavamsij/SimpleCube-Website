"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navContent } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { CONTAINER_CLASS } from "@/lib/container-utils";

export function Navbar({ forceDarkText = false }: { forceDarkText?: boolean }) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseEnter = (label: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    const dropdownItems: { 
        label: string; 
        href?: string; 
        items?: { title: string; href: string; desc?: string; isBold?: boolean }[];
        categories?: { category: string; isBold?: boolean; href?: string; items: { title: string; href: string; isBold?: boolean }[] }[];
    }[] = [
        { label: "Products", items: navContent.products.map(p => ({ title: p.title, href: p.href })) },
        { 
            label: "Services", 
            href: "/services", 
            categories: navContent.services as any
        },
        { label: "Industries", items: navContent.industries.map(i => ({ title: i.title, href: i.href })) },
        { label: "Insights", items: navContent.insights.map(i => ({ title: i.title, href: i.href })) },
        {
            label: "About",
            items: [
                ...navContent.about.map(a => ({ title: a.title, href: a.href })),
            ],
        },
    ];

    // Get the max-width from CONTAINER_CLASS for navbar width calculation
    const maxContainerWidth = CONTAINER_CLASS.includes("max-w-[96rem]") ? "96rem" 
        : CONTAINER_CLASS.includes("max-w-6xl") ? "72rem" 
        : CONTAINER_CLASS.includes("max-w-5xl") ? "64rem"
        : CONTAINER_CLASS.match(/max-w-\[([^\]]+)\]/)?.[1] || "96rem";

    return (
        <>
            {/* Dark Backdrop Overlay */}
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
                    width: mobileOpen ? "100%" : (scrolled ? "85%" : "100%"),
                    maxWidth: mobileOpen ? "100%" : (scrolled ? "660px" : maxContainerWidth),
                    top: mobileOpen ? 0 : (scrolled ? 14 : 0),
                    borderRadius: mobileOpen ? "0 0 2rem 2rem" : (scrolled ? "9999px" : "0px"),
                    backgroundColor: mobileOpen ? "#ffffff" : (scrolled ? "rgba(255, 255, 255, 0.75)" : forceDarkText ? "rgba(255, 255, 255, 0.92)" : "rgba(3, 11, 59, 0)"),
                    borderWidth: mobileOpen || scrolled || forceDarkText ? "1px" : "0px",
                    borderColor: mobileOpen ? "rgba(226, 232, 240, 0.8)" : (scrolled ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.12)"),
                    boxShadow: mobileOpen ? "0 20px 30px -10px rgba(0, 0, 0, 0.12)" : (scrolled ? "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)" : "none"),
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.32, 0.72, 0, 1],
                }}
                className="fixed z-50 left-1/2 -translate-x-1/2 backdrop-blur-xl"
                style={{ position: "fixed" }}
            >
                <div className="relative w-full">
                <nav className={cn(
                    "flex w-full items-center transition-all duration-300",
                    scrolled && !mobileOpen ? "h-[46px] px-4" : "h-[64px] px-6 md:px-10 lg:px-16"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/logos/Hyniva_logo_for_light_background.svg"
                            alt="Hyniva"
                            width={120}
                            height={32}
                            className={cn(
                                "transition-all duration-500",
                                scrolled && !mobileOpen ? "h-[22px] w-auto" : "h-9 w-auto",
                                !(mobileOpen || scrolled || forceDarkText) && "brightness-0 invert"
                            )}
                            priority
                        />
                    </Link>

                    {/* Spacer 1 */}
                    <div className="flex-1" />

                    {/* Desktop nav */}
                    <div className="hidden items-center lg:flex gap-0 relative">
                        {dropdownItems.map((group) => {
                            const isServices = group.label === "Services";
                            const isActive = isServices || (group.href && (pathname === group.href || (group.href !== "/" && pathname?.startsWith(group.href))));

                            return (
                                <div
                                    key={group.label}
                                    className={group.label === "Services" ? "static" : "relative"}
                                    onMouseEnter={() => handleMouseEnter(group.label)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {group.href ? (
                                        <Link
                                            href={group.href}
                                            className={cn(
                                                "flex items-center gap-1 rounded-full transition-all uppercase tracking-tight",
                                                scrolled ? "px-2 py-1 text-[11px] font-bold" : "px-2.5 py-1.5 text-sm font-bold",
                                                (isActive || openDropdown === group.label)
                                                    ? (scrolled || forceDarkText
                                                        ? "text-slate-600 underline underline-offset-4 decoration-2 decoration-slate-600"
                                                        : "text-white underline underline-offset-4 decoration-2 decoration-white")
                                                    : (scrolled || forceDarkText ? "text-slate-600 hover:text-slate-900" : "text-white/90 hover:text-white")
                                            )}
                                        >
                                            {group.label}
                                            <ChevronDown className={cn(
                                                scrolled ? "h-2.5 w-2.5" : "h-3 w-3",
                                                "transition-transform",
                                                (isActive || openDropdown === group.label)
                                                    ? (scrolled || forceDarkText ? "opacity-70 text-slate-600" : "opacity-100 text-white")
                                                    : "opacity-50",
                                                openDropdown === group.label && "rotate-180"
                                            )} />
                                        </Link>
                                    ) : (
                                        <button className={cn(
                                            "flex items-center gap-1 rounded-full transition-colors uppercase tracking-tight",
                                            scrolled ? "px-2 py-1 text-[11px] font-bold" : "px-2.5 py-1.5 text-sm font-bold",
                                            (isActive || openDropdown === group.label)
                                                ? (scrolled || forceDarkText
                                                    ? "text-slate-600 underline underline-offset-4 decoration-2 decoration-slate-600"
                                                    : "text-white underline underline-offset-4 decoration-2 decoration-white")
                                                : (scrolled || forceDarkText ? "text-slate-600 hover:text-slate-900" : "text-white/90 hover:text-white")
                                        )}>
                                            {group.label}
                                            <ChevronDown className={cn(
                                                scrolled ? "h-2.5 w-2.5" : "h-3 w-3",
                                                "transition-transform",
                                                (isActive || openDropdown === group.label)
                                                    ? (scrolled || forceDarkText ? "opacity-70 text-slate-600" : "opacity-100 text-white")
                                                    : "opacity-50",
                                                openDropdown === group.label && "rotate-180"
                                            )} />
                                        </button>
                                    )}
                                <AnimatePresence>
                                    {openDropdown === group.label && group.label !== "Services" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className={cn(
                                                "absolute top-[calc(100%+8px)] rounded-2xl border border-slate-100 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-2.5 max-w-[90vw]",
                                                group.label === "About" ? "left-auto right-0 translate-x-0 w-[260px]" : "left-1/2 -translate-x-1/2 w-[260px]",
                                                group.label === "Products" && "w-[340px]"
                                            )}
                                        >
                                            {group.categories ? (
                                                <div className="grid grid-cols-3 gap-8">
                                                    {group.categories.map((cat) => (
                                                        <div key={cat.category} className="space-y-3">
                                                            <div className={cn(
                                                                "px-0 py-0 text-slate-900",
                                                                cat.isBold && "text-[15px] font-bold"
                                                            )}>
                                                                {cat.category}
                                                            </div>
                                                            {cat.items.map((item) => (
                                                                <Link
                                                                    key={item.title}
                                                                    href={item.href}
                                                                    className="group block rounded-lg px-0 py-1.5 transition-all hover:text-[#2563EB]"
                                                                >
                                                                    <span className={cn(
                                                                        "text-[14px] text-slate-700 group-hover:text-[#2563EB] transition-colors",
                                                                        item.isBold && "font-bold text-slate-900"
                                                                    )}>{item.title}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : group.items ? (
                                                group.items.map((item) => (
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
                                                ))
                                            ) : null}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                    </div>

                    {/* Spacer 2 */}
                    <div className="flex-1" />

                    {/* Desktop CTA — Contact Us */}
                    <div className="hidden lg:flex items-center shrink-0">
                        <Link href="/contact">
                            <button
                                className={cn(
                                    "relative flex items-center justify-center rounded-full font-black text-white border-none cursor-pointer transition-all duration-300 uppercase tracking-wide",
                                    scrolled ? "h-7 px-3.5 text-[10px]" : "h-9 px-5 text-[12px]"
                                )}
                                style={{
                                    background: "#2563eb",
                                    boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8";
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(37,99,235,0.5)";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLButtonElement).style.background = "#2563eb";
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(37,99,235,0.3)";
                                }}
                            >
                                CONTACT US
                            </button>
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button className={cn(
                            "p-2",
                            (mobileOpen || scrolled || forceDarkText) ? "text-slate-900" : "text-white"
                        )} onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>

            {/* Services Dropdown - positioned relative to header */}
            <AnimatePresence>
                {openDropdown === "Services" && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "absolute top-[calc(100%+8px)] rounded-2xl border border-slate-100 bg-white px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
                            scrolled ? "left-0 w-full" : "left-1/2 -translate-x-1/2 w-[90%] max-w-[900px]"
                        )}
                        onMouseEnter={() => handleMouseEnter("Services")}
                        onMouseLeave={handleMouseLeave}
                        style={{ pointerEvents: "auto" }}
                    >
                        <div className="grid grid-cols-3 gap-8">
                            {(() => {
                                const categories = dropdownItems.find(d => d.label === "Services")?.categories || [];
                                const columns = [
                                    categories[0] ? [categories[0]] : [],
                                    categories[1] ? [categories[1]] : [],
                                    [categories[2], categories[3]].filter(Boolean),
                                ];
                                return columns.map((col, colIdx) => (
                                    <div key={colIdx} className="space-y-6">
                                        {col.map((cat) => (
                                            <div key={cat.category} className="space-y-1.5">
                                                {cat.href ? (
                                                    <Link
                                                        href={cat.href}
                                                        className={cn(
                                                            "block px-0 py-0 text-slate-900 hover:text-[#2563EB] transition-colors mb-4",
                                                            cat.isBold && "text-[15px] font-bold"
                                                        )}
                                                    >
                                                        {cat.category}
                                                    </Link>
                                                ) : (
                                                    <div className={cn(
                                                        "px-0 py-0 text-slate-900 mb-4",
                                                        cat.isBold && "text-[15px] font-bold"
                                                    )}>
                                                        {cat.category}
                                                    </div>
                                                )}
                                                {cat.items.map((item) => (
                                                    <Link
                                                        key={item.title}
                                                        href={item.href}
                                                        className="group block rounded-lg px-0 py-0.5 transition-all hover:text-[#2563EB]"
                                                    >
                                                        <span className={cn(
                                                            "text-slate-700 group-hover:text-[#2563EB] transition-colors",
                                                            item.isBold ? "text-[15px] font-bold text-slate-900" : "text-[14px]"
                                                        )}>{item.title}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ));
                            })()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>

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
                            {dropdownItems.map((group) => {
                                const isServices = group.label === "Services";
                                const isActive = isServices || (group.href && (pathname === group.href || (group.href !== "/" && pathname?.startsWith(group.href))));
                                return (
                                <div key={group.label} className="py-3">
                                    {group.href ? (
                                        <Link
                                            href={group.href}
                                            className={cn(
                                                "text-[10px] font-black uppercase tracking-widest mb-2 block transition-colors",
                                                isActive ? "text-[#2563eb]" : "text-slate-400 hover:text-[#2563eb]"
                                            )}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {group.label}
                                        </Link>
                                    ) : (
                                        <p className={cn(
                                            "text-[10px] font-black uppercase tracking-widest mb-2",
                                            isActive ? "text-[#2563eb]" : "text-slate-400"
                                        )}>{group.label}</p>
                                    )}
                                    {group.categories ? (
                                        <div className="space-y-3">
                                            {group.categories.map((cat) => (
                                                <div key={cat.category} className="space-y-1">
                                                    {cat.href ? (
                                                        <Link
                                                            href={cat.href}
                                                            className={cn(
                                                                "block px-2 py-1 text-[10px] uppercase tracking-wide hover:text-[#2563EB]",
                                                                cat.isBold ? "text-slate-950 font-black" : "text-slate-600 font-bold"
                                                            )}
                                                            onClick={() => setMobileOpen(false)}
                                                        >
                                                            {cat.category}
                                                        </Link>
                                                    ) : (
                                                        <div className={cn(
                                                            "px-2 py-1 text-[10px] uppercase tracking-wide",
                                                            cat.isBold ? "text-slate-950 font-black" : "text-slate-600 font-bold"
                                                        )}>
                                                            {cat.category}
                                                        </div>
                                                    )}
                                                    {cat.items.map((item) => (
                                                        <Link
                                                            key={item.title}
                                                            href={item.href}
                                                            className={cn(
                                                                "block rounded-md hover:bg-slate-50",
                                                                item.isBold 
                                                                    ? "px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600" 
                                                                    : "px-3 py-2 text-sm text-slate-700"
                                                            )}
                                                            onClick={() => setMobileOpen(false)}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ) : group.items ? (
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
                                    ) : null}
                                </div>
                            ); })}
                            <div className="pt-3 pb-6">
                                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                                    <Button className="w-full rounded-full bg-[#2563eb] text-white font-black hover:bg-[#1d4ed8] uppercase text-[12px] tracking-wide">
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
