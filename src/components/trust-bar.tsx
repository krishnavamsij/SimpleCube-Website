"use client";

import Image from "next/image";
import { trustContent } from "@/content/site-content";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";

export function TrustBar() {
    const { label, logos } = trustContent;
    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos];

    return (
        <motion.section
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border-b border-border bg-card py-8 sm:py-10"
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {label}
                </p>
            </div>

            {/* Marquee container */}
            <div className="marquee-fade overflow-hidden">
                <div className="animate-marquee flex w-max items-center gap-12 px-6" style={{ "--marquee-duration": "35s" } as React.CSSProperties}>
                    {duplicatedLogos.map((logo, i) => (
                        <div
                            key={`${logo.name}-${i}`}
                            className="flex h-12 flex-shrink-0 items-center"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={140}
                                height={48}
                                className="h-8 w-auto max-w-[140px] object-contain sm:h-10"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
