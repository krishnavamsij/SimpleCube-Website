"use client";

import Image from "next/image";
import { trustContent } from "@/content/site-content";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";

export function TrustBar() {
    const { label, logos } = trustContent;

    return (
        <motion.section
            id="trust-bar-section"
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border-t border-slate-200 bg-white py-[30px] sm:py-[40px] lg:py-[50px]"
        >
            <div className="mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {label}
                </p>
            </div>

            {/* Marquee container */}
            <div className="marquee-fade overflow-hidden">
                <div className="animate-marquee flex w-max items-center gap-14 px-6" style={{ "--marquee-duration": "40s" } as React.CSSProperties}>
                    {[...logos, ...logos].map((logo, i) => (
                        <div
                            key={`${logo.name}-${i}`}
                            className="flex h-20 flex-shrink-0 items-center justify-center"
                            style={{
                                ...("margin" in logo && logo.margin ? { margin: logo.margin } : {}),
                            }}
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={150}
                                height={52}
                                className="h-9 w-auto max-w-[150px] object-contain opacity-100 transition-all duration-300 sm:h-11"
                                style={logo.scale ? { transform: `scale(${logo.scale})` } : {}}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
