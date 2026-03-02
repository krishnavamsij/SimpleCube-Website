"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollReveal, viewportOnce, EASE_OUT_QUART } from "@/lib/animations";
import { testimonialsContent } from "@/content/site-content";

export function Testimonials() {
    const { testimonials } = testimonialsContent;
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        if (testimonials.length <= 1) return;
        const timer = setInterval(next, 8000);
        return () => clearInterval(timer);
    }, [next, testimonials.length]);

    const testimonial = testimonials[current];

    return (
        <motion.section
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 text-center sm:py-28"
        >
            <div className="mx-auto max-w-[800px] px-6">
                {/* Quote mark */}
                <span className="mb-6 block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-7xl leading-none font-bold text-transparent opacity-60 sm:text-8xl">
                    &ldquo;
                </span>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
                    >
                        <p className="text-xl font-light leading-relaxed text-slate-200 sm:text-2xl lg:text-3xl">
                            {testimonial.quote}
                        </p>
                        <p className="mt-8 text-sm text-slate-400">
                            <strong className="text-white">{testimonial.author}</strong>
                            {" — "}
                            {testimonial.company}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Dots */}
                {testimonials.length > 1 && (
                    <div className="mt-10 flex justify-center gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-white" : "w-2 bg-white/40"
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.section>
    );
}
