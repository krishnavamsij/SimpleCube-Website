"use client";

import { motion } from "framer-motion";
import { scrollReveal, scrollStaggerContainer, viewportOnce } from "@/lib/animations";
import { statsContent } from "@/content/site-content";

export function Stats() {
    const { stats } = statsContent;

    return (
        <section className="bg-background py-16 sm:py-20">
            <motion.div
                variants={scrollStaggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mx-auto grid max-w-[1200px] gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {stats.map((stat) => (
                    <motion.div
                        key={stat.label}
                        variants={scrollReveal}
                        className="text-center"
                    >
                        <span className="block text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                            {stat.value}
                        </span>
                        <span className="mt-2 block text-sm font-medium text-muted-foreground">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
