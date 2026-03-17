"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { footerContent } from "@/content/site-content";

export function Footer() {
    const { description, sections, offices, linkedin, email } = footerContent;

    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
            <div className="mx-auto max-w-[1400px] px-6 py-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center">
                            <Image
                                src="/logos/Hyniva logo for light background.svg"
                                alt="Hyniva"
                                width={140}
                                height={40}
                                className="h-12 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed">
                            {description}
                        </p>

                        {/* Offices */}
                        <div className="mt-6 space-y-3">
                            {offices.map((office) => (
                                <div key={office.country} className="flex items-start gap-2 text-xs">
                                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                                    <span>
                                        <strong className="text-slate-200">{office.country}</strong>
                                        <br />
                                        {office.address}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="mt-5 flex gap-3">
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-slate-500 hover:text-white">
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a href={`mailto:${email}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-slate-500 hover:text-white">
                                <Mail className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                                {section.title}
                            </h5>
                            <ul className="space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.title}>
                                        <Link
                                            href={link.href}
                                            className="text-sm transition-colors hover:text-white"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs sm:flex-row">
                    <span>© {new Date().getFullYear()} Hyniva. All rights reserved.</span>
                    <span>{email}</span>
                </div>
            </div>
        </footer>
    );
}
