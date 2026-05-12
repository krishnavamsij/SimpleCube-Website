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
            className="bg-[#0a0f1e] py-20 text-center sm:py-28 relative overflow-hidden"
        >
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(30,111,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,.07) 1px, transparent 1px)]" style={{ backgroundSize: '36px 36px' }} />
            </div>

            <div className="relative z-10 mx-auto max-w-[800px] px-6">
                {/* Large quote mark */}
                <span className="mb-6 block text-6xl leading-none font-bold text-white opacity-20 sm:text-7xl">
                    "
                </span>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
                    >
                        <p className="text-xl font-medium leading-relaxed text-white italic sm:text-2xl lg:text-3xl">
                            {testimonial.quote}
                        </p>
                        <p className="mt-8 text-[15px] text-blue-300">
                            <strong className="text-blue-200 font-bold">{testimonial.author}</strong>
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
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    i === current ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
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
