"use client";

import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { ctaContent } from "@/content/site-content";
import Link from "next/link";

export function CtaBanner() {
    const { headline, sub, cta } = ctaContent;

    return (
        <motion.section
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 text-center text-white sm:py-28"
        >
            <div className="mx-auto max-w-[700px] px-6">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    {headline}
                </h2>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-blue-100 sm:text-lg">
                    {sub}
                </p>
                <Link
                    href={cta.href}
                    className="mt-10 inline-block rounded-lg bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                    {cta.label}
                </Link>
            </div>
        </motion.section>
    );
}
