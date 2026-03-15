"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { productsContent } from "@/content/site-content";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

function ProductCard({ product }: { product: typeof productsContent.products[0] }) {
    return (
        <motion.div
            variants={scrollReveal}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E1D4E]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#00D4AA]/40 hover:shadow-[0_0_40px_rgba(0,212,170,0.12)]"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1D4E] via-[#0E1D4E]/30 to-transparent" />

                {/* Badge */}
                <span className="absolute left-5 top-5 rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#00D4AA] backdrop-blur-sm">
                    {product.badge}
                </span>
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                    {product.description}
                </p>

                {/* Metrics row */}
                <div className="mt-6 flex gap-6 border-t border-white/10 pt-5">
                    {product.metrics.map((m) => (
                        <div key={m.label}>
                            <span className="block bg-gradient-to-r from-[#00D4AA] to-[#00A8FF] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                                {m.value}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-slate-400">{m.label}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    href={product.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00D4AA] transition-colors hover:text-[#00A8FF]"
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
        <section className="relative overflow-hidden bg-[#030B3B] py-20 sm:py-28">
            {/* Grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-40 right-1/3 h-[500px] w-[500px] rounded-full bg-[#1F35A4]/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#00D4AA]/10 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-[1200px] px-6">
                {/* Header row */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#00D4AA]">
                            {label}
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {headline}
                        </h2>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-[17px]">
                            {sub}
                        </p>
                    </div>

                    {/* Explore all link */}
                    <Link
                        href="/products"
                        className="inline-flex flex-shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-[#00D4AA] transition-colors hover:text-[#00A8FF] sm:self-auto"
                    >
                        All Products <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </Link>
                </motion.div>

                {/* Product cards */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {products.map((p) => (
                        <ProductCard key={p.name} product={p} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
