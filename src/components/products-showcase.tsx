"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { productsContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

function ProductCard({ product }: { product: typeof productsContent.products[0] }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);

    return (
        <motion.div
            ref={ref}
            variants={scrollReveal}
            className="group"
        >
            {/* Image with zoom-on-scroll */}
            <motion.div
                style={{ scale: imageScale, opacity: imageOpacity }}
                className="relative overflow-hidden rounded-xl border border-slate-700"
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                    {/* Badge overlay */}
                    <span className="absolute top-4 left-4 rounded-full bg-blue-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-300 backdrop-blur-sm border border-blue-400/20">
                        {product.badge}
                    </span>

                    {/* Metrics at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 flex gap-6 p-5">
                        {product.metrics.map((m) => (
                            <div key={m.label}>
                                <span className="block bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                                    {m.value}
                                </span>
                                <span className="text-[11px] text-slate-300">{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Text below */}
            <div className="mt-5">
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{product.description}</p>
                <Link
                    href={product.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
                >
                    Explore Product <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
            </div>
        </motion.div>
    );
}

export function ProductsShowcase() {
    const { label, headline, sub, products } = productsContent;

    return (
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 sm:py-28">
            <div className="mx-auto max-w-[1200px] px-6">
                {/* Header */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
                        {label}
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {headline}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                        {sub}
                    </p>
                </motion.div>

                {/* Product cards */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {products.map((p) => (
                        <ProductCard key={p.name} product={p} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
