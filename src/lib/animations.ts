"use client";

import type { Variants } from "framer-motion";

export const EASE_OUT_QUART = [0.25, 0.46, 0.45, 0.94] as const;
export const DURATION = 0.6;
export const STAGGER = 0.1;

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION, ease: EASE_OUT_QUART },
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: DURATION, ease: EASE_OUT_QUART },
    },
};

export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION, ease: EASE_OUT_QUART },
    },
};

export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION, ease: EASE_OUT_QUART },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: DURATION, ease: EASE_OUT_QUART },
    },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: STAGGER,
            delayChildren: 0.1,
        },
    },
};

// Scroll-reveal variants — triggered by whileInView
export const scrollReveal: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE_OUT_QUART },
    },
};

export const scrollRevealLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: EASE_OUT_QUART },
    },
};

export const scrollRevealRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: EASE_OUT_QUART },
    },
};

export const scrollStaggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

// Card hover variant
export const cardHover = {
    rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
    hover: {
        y: -4,
        boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
        transition: { duration: 0.3, ease: EASE_OUT_QUART },
    },
};

// Hero carousel slide
export const heroSlideIn: Variants = {
    enter: { opacity: 0, y: 20 },
    center: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASE_OUT_QUART },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.5, ease: EASE_OUT_QUART },
    },
};

// Viewport trigger defaults
export const viewportOnce = { once: true, margin: "-80px" as const };
