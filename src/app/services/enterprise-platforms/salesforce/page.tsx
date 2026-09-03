"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Settings,
    Smartphone,
    BarChart3,
    Cloud,
    Shield,
    ArrowRight,
    Sliders,
    Network,
    Database,
    Gauge,
    ShieldCheck,
    Boxes,
    Rocket,
    Zap
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { salesforceContent } from "@/content/salesforce";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ------------------- Icon Map ------------------- */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Users: Users,
    Settings: Settings,
    Smartphone: Smartphone,
    BarChart3: BarChart3,
    Cloud: Cloud,
    Shield: Shield,
};


/* ------------------- 3D Salesforce Cloud Illustration ------------------- */

function Salesforce3DCloud() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(15);
    const [rotateY, setRotateY] = useState(-25);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        // Map mouse position to dynamic tilt angles (adding up to +/- 12 deg tilt)
        const tiltX = -(mouseY / (height / 2)) * 12;
        const tiltY = (mouseX / (width / 2)) * 12;

        setRotateX(15 + tiltX);
        setRotateY(-25 + tiltY);
    };

    const handleMouseLeave = () => {
        // Smoothly restore base left-facing tilt
        setRotateX(15);
        setRotateY(-25);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] flex items-center justify-center cursor-pointer pointer-events-auto"
            style={{ perspective: "1200px" }}
        >
            <motion.div
                animate={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    y: [0, -12, 0] // Continuous bobbing float
                }}
                transition={{
                    rotateX: { type: "spring", stiffness: 90, damping: 18 },
                    rotateY: { type: "spring", stiffness: 90, damping: 18 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
                className="relative w-[280px] h-[196px] sm:w-[350px] sm:h-[245px] lg:w-[400px] lg:h-[280px]"
            >
                {/* 30 stacked layers to construct the 3D depth */}
                {Array.from({ length: 30 }).map((_, i) => {
                    const isFront = i === 0;
                    const translateZ = -i * 1.3; // 1.3px layer spacing
                    return (
                        <div
                            key={i}
                            className="absolute inset-0"
                            style={{
                                transform: `translateZ(${translateZ}px)`,
                                transformStyle: "preserve-3d",
                                pointerEvents: "none"
                            }}
                        >
                            <svg
                                viewBox="-10 -10 293 211"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-full h-full overflow-visible ${isFront ? "drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] drop-shadow-[0_4px_12px_rgba(37,99,235,0.2)]" : ""}`}
                            >
                                <defs>
                                    {/* Front face dark blue theme gradient */}
                                    <linearGradient id={`frontCloudGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#0a1236" />
                                        <stop offset="50%" stopColor="#142560" />
                                        <stop offset="100%" stopColor="#030612" />
                                    </linearGradient>
                                    {/* 3D Extrusion depth gradient matching 'Talk to Our Experts' CTA button (#3B82F6) */}
                                    <linearGradient id={`depthCloudGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4382f6" />
                                        <stop offset="50%" stopColor="#3B82F6" />
                                        <stop offset="100%" stopColor="#2e72f0" />
                                    </linearGradient>
                                </defs>
                                {/* Salesforce Cloud Shape */}
                                <path
                                    d="m113 21.3c8.78-9.14 21-14.8 34.5-14.8 18 0 33.6 10 42 24.9a58 58 0 0 1 23.7-5.05c32.4 0 58.7 26.5 58.7 59.2s-26.3 59.2-58.7 59.2c-3.96 0-7.82-0.398-11.6-1.15-7.35 13.1-21.4 22-37.4 22a42.7 42.7 0 0 1-18.8-4.32c-7.45 17.5-24.8 29.8-45 29.8-21.1 0-39-13.3-45.9-32a45.1 45.1 0 0 1-9.34 0.972c-25.1 0-45.4-20.6-45.4-45.9 0-17 9.14-31.8 22.7-39.8a52.6 52.6 0 0 1-4.35-21c0-29.2 23.7-52.8 52.9-52.8 17.1 0 32.4 8.15 42 20.8"
                                    fill={isFront ? `url(#frontCloudGrad-${i})` : `url(#depthCloudGrad-${i})`}
                                    stroke="#3B82F6"
                                    strokeWidth={isFront ? 1.5 : 0.8}
                                />
                                {/* Exact Authentic Salesforce Logo Typography & Exact Scale */}
                                {isFront && (
                                    <g fill="#FFFFFF">
                                        <path d="m39.4 99.3c-0.171 0.446 0.061 0.539 0.116 0.618 0.511 0.37 1.03 0.638 1.55 0.939 2.78 1.47 5.4 1.9 8.14 1.9 5.58 0 9.05-2.97 9.05-7.75v-0.094c0-4.42-3.92-6.03-7.58-7.18l-0.479-0.155c-2.77-0.898-5.16-1.68-5.16-3.5v-0.093c0-1.56 1.4-2.71 3.56-2.71 2.4 0 5.26 0.799 7.09 1.81 0 0 0.542 0.35 0.739-0.173 0.107-0.283 1.04-2.78 1.14-3.06 0.106-0.293-0.08-0.514-0.271-0.628-2.1-1.28-5-2.15-8-2.15l-0.557 2e-3c-5.11 0-8.68 3.09-8.68 7.51v0.095c0 4.66 3.94 6.18 7.62 7.23l0.592 0.184c2.68 0.824 5 1.54 5 3.42v0.094c0 1.73-1.51 3.02-3.93 3.02-0.941 0-3.94-0.016-7.19-2.07-0.393-0.229-0.617-0.394-0.92-0.579-0.16-0.097-0.56-0.272-0.734 0.252l-1.1 3.06m81.7 0c-0.171 0.446 0.061 0.539 0.118 0.618 0.509 0.37 1.03 0.638 1.55 0.939 2.78 1.47 5.4 1.9 8.14 1.9 5.58 0 9.05-2.97 9.05-7.75v-0.094c0-4.42-3.91-6.03-7.58-7.18l-0.479-0.155c-2.77-0.898-5.16-1.68-5.16-3.5v-0.093c0-1.56 1.4-2.71 3.56-2.71 2.4 0 5.25 0.799 7.09 1.81 0 0 0.542 0.35 0.74-0.173 0.106-0.283 1.04-2.78 1.13-3.06 0.107-0.293-0.08-0.514-0.27-0.628-2.1-1.28-5-2.15-8-2.15l-0.558 2e-3c-5.11 0-8.68 3.09-8.68 7.51v0.095c0 4.66 3.94 6.18 7.62 7.23l0.591 0.184c2.69 0.824 5 1.54 5 3.42v0.094c0 1.73-1.51 3.02-3.93 3.02-0.943 0-3.95-0.016-7.19-2.07-0.393-0.229-0.623-0.387-0.921-0.579-0.101-0.064-0.572-0.248-0.733 0.252l-1.1 3.06m55.8-9.36c0 2.7-0.504 4.83-1.49 6.34-0.984 1.49-2.47 2.22-4.54 2.22s-3.55-0.724-4.52-2.21c-0.977-1.5-1.47-3.64-1.47-6.34 0-2.7 0.496-4.82 1.47-6.31 0.968-1.48 2.44-2.19 4.52-2.19s3.56 0.717 4.54 2.19c0.992 1.49 1.49 3.61 1.49 6.31m4.66-5.01c-0.459-1.55-1.17-2.91-2.12-4.05-0.951-1.14-2.15-2.06-3.58-2.72-1.42-0.665-3.1-1-5-1s-3.57 0.337-5 1c-1.42 0.664-2.63 1.58-3.58 2.72-0.948 1.14-1.66 2.5-2.12 4.05-0.455 1.54-0.686 3.22-0.686 5.01 0 1.79 0.231 3.47 0.686 5.01 0.457 1.55 1.17 2.91 2.12 4.05 0.951 1.14 2.16 2.05 3.58 2.7 1.43 0.648 3.11 0.978 5 0.978 1.89 0 3.57-0.33 4.99-0.978 1.42-0.648 2.63-1.56 3.58-2.7 0.949-1.14 1.66-2.5 2.12-4.05 0.454-1.54 0.685-3.22 0.685-5.01 0-1.78-0.231-3.47-0.685-5.01m38.3 12.8c-0.153-0.453-0.595-0.282-0.595-0.282-0.677 0.259-1.4 0.499-2.17 0.619-0.776 0.122-1.64 0.183-2.55 0.183-2.25 0-4.05-0.671-5.33-2-1.29-1.33-2.01-3.47-2-6.37 7e-3 -2.64 0.645-4.62 1.79-6.14 1.13-1.5 2.87-2.28 5.17-2.28 1.92 0 3.39 0.223 4.93 0.705 0 0 0.365 0.159 0.54-0.322 0.409-1.13 0.711-1.94 1.15-3.18 0.124-0.355-0.18-0.505-0.291-0.548-0.604-0.236-2.03-0.623-3.11-0.786-1.01-0.154-2.18-0.234-3.5-0.234-1.96 0-3.7 0.335-5.19 0.999-1.49 0.663-2.75 1.58-3.75 2.72-1 1.14-1.76 2.5-2.27 4.05-0.505 1.54-0.76 3.23-0.76 5.02 0 3.86 1.04 6.99 3.1 9.28 2.06 2.3 5.16 3.46 9.2 3.46 2.39 0 4.84-0.483 6.6-1.18 0 0 0.336-0.162 0.19-0.554l-1.15-3.16m8.15-10.4c0.223-1.5 0.634-2.75 1.28-3.72 0.967-1.48 2.44-2.29 4.51-2.29 2.07 0 3.44 0.814 4.42 2.29 0.65 0.975 0.934 2.27 1.04 3.72l-11.3-2e-3zm15.7-3.3c-0.397-1.49-1.38-3-2.02-3.69-1.02-1.09-2.01-1.86-3-2.28a11.5 11.5 0 0 0-4.52-0.917c-1.97 0-3.76 0.333-5.21 1.01-1.45 0.682-2.67 1.61-3.63 2.77-0.959 1.16-1.68 2.53-2.14 4.1-0.46 1.55-0.692 3.25-0.692 5.03 0 1.82 0.241 3.51 0.715 5.04 0.479 1.54 1.25 2.89 2.29 4.01 1.04 1.13 2.37 2.01 3.97 2.63 1.59 0.615 3.52 0.934 5.73 0.927 4.56-0.015 6.96-1.03 7.94-1.58 0.175-0.098 0.34-0.267 0.134-0.754l-1.03-2.89c-0.158-0.431-0.594-0.275-0.594-0.275-1.13 0.422-2.73 1.18-6.48 1.17-2.45-4e-3 -4.26-0.727-5.4-1.86-1.16-1.16-1.74-2.85-1.83-5.25l15.8 0.012s0.416-4e-3 0.459-0.41c0.017-0.168 0.541-3.24-0.471-6.79zm-142 3.3c0.223-1.5 0.635-2.75 1.28-3.72 0.968-1.48 2.44-2.29 4.51-2.29 2.07 0 3.44 0.814 4.42 2.29 0.649 0.975 0.933 2.27 1.04 3.72l-11.3-2e-3zm15.7-3.3c-0.396-1.49-1.38-3-2.02-3.69-1.02-1.09-2.01-1.86-3-2.28a11.5 11.5 0 0 0-4.52-0.917c-1.97 0-3.76 0.333-5.21 1.01-1.45 0.682-2.67 1.61-3.63 2.77-0.957 1.16-1.68 2.53-2.14 4.1-0.459 1.55-0.69 3.25-0.69 5.03 0 1.82 0.239 3.51 0.716 5.04 0.478 1.54 1.25 2.89 2.28 4.01 1.04 1.13 2.37 2.01 3.97 2.63 1.59 0.615 3.51 0.934 5.73 0.927 4.56-0.015 6.96-1.03 7.94-1.58 0.174-0.098 0.34-0.267 0.133-0.754l-1.03-2.89c-0.159-0.431-0.595-0.275-0.595-0.275-1.13 0.422-2.73 1.18-6.48 1.17-2.44-4e-3 -4.26-0.727-5.4-1.86-1.16-1.16-1.74-2.85-1.83-5.25l15.8 0.012s0.416-4e-3 0.459-0.41c0.017-0.168 0.541-3.24-0.472-6.79zm-49.8 13.6c-0.619-0.494-0.705-0.615-0.91-0.936-0.313-0.483-0.473-1.17-0.473-2.05 0-1.38 0.46-2.38 1.41-3.05-0.01 2e-3 1.36-1.18 4.58-1.14a32 32 0 0 1 4.28 0.365v7.17h2e-3s-2 0.431-4.26 0.567c-3.21 0.193-4.63-0.924-4.62-0.921zm6.28-11.1c-0.64-0.047-1.47-0.07-2.46-0.07-1.35 0-2.66 0.168-3.88 0.498-1.23 0.332-2.34 0.846-3.29 1.53a7.63 7.63 0 0 0-2.29 2.6c-0.559 1.04-0.844 2.26-0.844 3.64 0 1.4 0.243 2.61 0.723 3.6a6.54 6.54 0 0 0 2.06 2.47c0.877 0.638 1.96 1.11 3.21 1.39 1.24 0.283 2.64 0.426 4.18 0.426 1.62 0 3.23-0.136 4.79-0.399a95.1 95.1 0 0 0 3.97-0.772c0.526-0.121 1.11-0.28 1.11-0.28 0.39-0.099 0.36-0.516 0.36-0.516l-9e-3 -14.4c0-3.16-0.844-5.51-2.51-6.96-1.66-1.45-4.09-2.18-7.24-2.18-1.18 0-3.09 0.16-4.23 0.389 0 0-3.44 0.668-4.86 1.78 0 0-0.312 0.192-0.142 0.627l1.12 3c0.139 0.389 0.518 0.256 0.518 0.256s0.119-0.047 0.259-0.13c3.03-1.65 6.87-1.6 6.87-1.6 1.7 0 3.02 0.345 3.9 1.02 0.861 0.661 1.3 1.66 1.3 3.76v0.667c-1.35-0.196-2.6-0.309-2.6-0.309zm127-8.13a0.428 0.428 0 0 0-0.237-0.568c-0.269-0.102-1.61-0.385-2.64-0.449-1.98-0.124-3.08 0.21-4.07 0.654-0.978 0.441-2.06 1.15-2.66 1.97l-2e-3 -1.92c0-0.264-0.187-0.477-0.453-0.477h-4.04c-0.262 0-0.452 0.213-0.452 0.477v23.5a0.48 0.48 0 0 0 0.479 0.479h4.14a0.479 0.479 0 0 0 0.478-0.479v-11.8c0-1.58 0.174-3.15 0.521-4.14 0.342-0.979 0.807-1.76 1.38-2.32a4.79 4.79 0 0 1 1.95-1.17 7.68 7.68 0 0 1 2.12-0.298c0.825 0 1.73 0.212 1.73 0.212 0.304 0.034 0.473-0.152 0.576-0.426 0.271-0.721 1.04-2.88 1.19-3.31" />
                                        <path d="M162.201 67.548a13.258 13.258 0 0 0-1.559-.37 12.217 12.217 0 0 0-2.144-.166c-2.853 0-5.102.806-6.681 2.398-1.568 1.58-2.635 3.987-3.17 7.154l-.193 1.069h-3.581s-.437-.018-.529.459l-.588 3.28c-.041.314.094.51.514.508h3.486l-3.537 19.743c-.277 1.59-.594 2.898-.945 3.889-.346.978-.684 1.711-1.1 2.243-.403.515-.785.894-1.444 1.115-.544.183-1.17.267-1.856.267-.382 0-.89-.064-1.265-.139-.375-.074-.57-.158-.851-.276 0 0-.409-.156-.57.254-.131.335-1.06 2.89-1.17 3.206-.112.312.045.558.243.629.464.166.809.272 1.441.421.878.207 1.618.22 2.311.22 1.452 0 2.775-.204 3.872-.6 1.104-.399 2.065-1.094 2.915-2.035.919-1.015 1.497-2.078 2.05-3.528.547-1.437 1.013-3.221 1.386-5.3l3.554-20.109h5.196s.438.016.529-.459l.588-3.28c.041-.314-.093-.51-.515-.508h-5.043c.025-.114.254-1.888.833-3.558.247-.713.712-1.288 1.106-1.683a3.273 3.273 0 0 1 1.321-.822 5.48 5.48 0 0 1 1.693-.244c.475 0 .941.057 1.296.131.489.104.679.159.807.197.514.157.583.005.684-.244l1.206-3.312c.124-.356-.178-.506-.29-.55m-70.474 34.117c0 .264-.188.479-.452.479h-4.183c-.265 0-.453-.215-.453-.479V67.997c0-.263.188-.476.453-.476h4.183c.264 0 .452.213.452.476v33.668" />
                                    </g>
                                )}
                            </svg>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}

/* ------------------- Hero Section ------------------- */

function SalesforceHero() {
    return (
        <section className="relative overflow-hidden bg-[#030b1e] flex items-center border-b border-[#3B82F6]/30">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(37,99,235,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020918] via-[#020918]/60 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-10 pt-[110px] sm:pb-10 sm:pt-[120px] lg:pb-12 lg:pt-20">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl"
                    >
                        <motion.div variants={fadeInUp} className="flex mb-6">
                            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                                <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                                {salesforceContent.hero.eyebrow}
                            </div>
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="mt-6 text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-[900] leading-[1.1] tracking-tight text-white lg:mt-8 font-display"
                        >
                            Go Beyond <span className="text-[#00D4AA]">CRM.</span><br className="hidden sm:block" />{" "}
                            Engineer for <span className="text-[#00D4AA]">Growth.</span>
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="mt-8 w-full text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 max-w-2xl lg:mt-10"
                        >
                            {salesforceContent.hero.subtitle}
                        </motion.p>
                        <motion.div variants={fadeInUp} className="mt-10 lg:mt-12">
                            <Link
                                href={salesforceContent.hero.contactButton.href}
                                className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] border border-[#3B82F6]/30 rounded-full font-bold px-8 h-14 inline-flex items-center justify-center transition-all duration-300"
                            >
                                {salesforceContent.hero.contactButton.text}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative hidden lg:flex items-center justify-center h-[380px] lg:h-[420px] w-full"
                    >
                        {/* Ambient Glow Container */}
                        <div className="absolute w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] pointer-events-none flex items-center justify-center">
                            {/* Ambient background glow */}
                            <div className="absolute left-[15%] top-[20%] w-[260px] h-[360px] bg-[#06b6d4]/15 blur-[90px] rounded-full" />
                            <div className="absolute left-[30%] top-[30%] w-[160px] h-[260px] bg-[#8b5cf6]/15 blur-[90px] rounded-full" />

                            {/* Soft radial illumination inside center */}
                            <div className="absolute inset-[25%] bg-gradient-to-tr from-indigo-500/5 to-cyan-400/5 blur-[60px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Interactive 3D Salesforce Cloud */}
                        <div className="absolute w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] flex items-center justify-center z-10">
                            <Salesforce3DCloud />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ------------------- Intro Section ------------------- */

/* ------------------- 3D Illustrations for Reality Cards ------------------- */

function CloudsIllustration() {
    return (
        <svg viewBox="0 0 100 100" className="w-28 h-28">
            <path d="M25 65a12 12 0 0 1 2-23.8A16 16 0 0 1 57 33a12 12 0 0 1 18 10 12 12 0 0 1-5 22H25z" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 75a10 10 0 0 1 1-19.8A13 13 0 0 1 66 48a10 10 0 0 1 15 8 10 10 0 0 1-4 19H40z" fill="#00D4AA" fillOpacity="0.2" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35 50h30" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="35" cy="50" r="3" fill="#3B82F6" />
            <circle cx="65" cy="50" r="3" fill="#00D4AA" />
        </svg>
    );
}

function CogIllustration() {
    return (
        <svg viewBox="0 0 100 100" className="w-28 h-28">
            <circle cx="50" cy="50" r="14" fill="none" stroke="#3B82F6" strokeWidth="3" />
            <path d="M50 20v10M50 70v10M20 50h10M70 50h10M29 29l7 7M64 64l7 7M71 29l-7 7M36 64l-7 7" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M50 36v-16M36 50H20M50 64v16" stroke="#00D4AA" strokeWidth="2" strokeDasharray="2 2" />
            <circle cx="50" cy="15" r="4" fill="#00D4AA" />
            <circle cx="15" cy="50" r="4" fill="#00D4AA" />
            <circle cx="50" cy="85" r="4" fill="#3B82F6" />
            <path d="M60 40l18-10v15" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
            <circle cx="78" cy="30" r="3.5" fill="#2563EB" />
        </svg>
    );
}

function SprawlIllustration() {
    return (
        <svg viewBox="0 0 100 100" className="w-28 h-28">
            <rect x="15" y="25" width="20" height="12" rx="2" fill="none" stroke="#3B82F6" strokeWidth="2" />
            <rect x="15" y="44" width="20" height="12" rx="2" fill="none" stroke="#3B82F6" strokeWidth="2" />
            <rect x="15" y="63" width="20" height="12" rx="2" fill="none" stroke="#3B82F6" strokeWidth="2" />
            <rect x="65" y="44" width="20" height="12" rx="2" fill="none" stroke="#00D4AA" strokeWidth="2" />
            <path d="M35 31h15v16h15" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M35 50h30" fill="none" stroke="#00D4AA" strokeWidth="2" />
            <path d="M35 69h15V53h15" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="50" cy="47" r="3" fill="#2563EB" />
            <circle cx="50" cy="53" r="3" fill="#00D4AA" />
        </svg>
    );
}

function DataIllustration() {
    return (
        <svg viewBox="0 0 100 100" className="w-28 h-28">
            <ellipse cx="50" cy="25" rx="18" ry="6" fill="none" stroke="#3B82F6" strokeWidth="2" />
            <path d="M32 25v15c0 3.3 8 6 18 6s18-2.7 18-6V25" fill="none" stroke="#3B82F6" strokeWidth="2" />
            <path d="M32 40v15c0 3.3 8 6 18 6s18-2.7 18-6V40" fill="none" stroke="#00D4AA" strokeWidth="2" />
            <ellipse cx="50" cy="72" rx="28" ry="8" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="22" cy="72" r="4.5" fill="#3B82F6" />
            <circle cx="78" cy="72" r="4.5" fill="#00D4AA" />
            <circle cx="50" cy="80" r="3" fill="#2563EB" />
            <path d="M50 56v10M22 72l20-8M78 72l-20-8" stroke="#E2E8F0" strokeWidth="1.5" />
        </svg>
    );
}

function PressureIllustration() {
    return (
        <svg viewBox="0 0 100 100" className="w-28 h-28">
            <path d="M20 70A35 35 0 0 1 80 70" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 15A35 35 0 0 1 80 70" fill="none" stroke="#00D4AA" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="70" r="6" fill="#3B82F6" />
            <path d="M50 70l20-40" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
            <path d="M82 25l5 8h-9z" fill="#00D4AA" />
            <path d="M68 18l7 6-5 4z" fill="#3B82F6" />
        </svg>
    );
}

function ShieldIllustration() {
    return (
        <svg viewBox="0 0 100 100" className="w-28 h-28">
            <path d="M30 20h40v15c0 18-20 35-20 35S30 53 30 35V20z" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M50 20v50M30 35h40M34 50h32" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.3" />
            <rect x="42" y="38" width="16" height="12" rx="1.5" fill="#00D4AA" />
            <path d="M46 38v-4c0-2.2 1.8-4 4-4s4 1.8 4 4v4" fill="none" stroke="#00D4AA" strokeWidth="2" />
            <circle cx="50" cy="14" r="3.5" fill="#3B82F6" />
            <circle cx="22" cy="35" r="3" fill="#00D4AA" />
            <circle cx="78" cy="35" r="3" fill="#00D4AA" />
        </svg>
    );
}

/* ------------------- Enterprise Reality Section ------------------- */

const realityCards = [
    {
        id: 1,
        title: "Multiple-Cloud Complexity",
        description: "Multiple Salesforce clouds and teams can make experiences, processes and data harder to connect.",
        icon: Cloud,
    },
    {
        id: 2,
        title: "Uncontrolled Customization",
        description: "Business-specific customizations can create dependencies that make upgrades and future changes harder.",
        icon: Sliders,
    },
    {
        id: 3,
        title: "Integration Sprawl",
        description: "Growing connections across enterprise systems can create fragile dependencies and maintenance overhead.",
        icon: Network,
    },
    {
        id: 4,
        title: "Data Model Complexity",
        description: "Data across Salesforce orgs, clouds and external systems can make a unified customer view difficult.",
        icon: Database,
    },
    {
        id: 5,
        title: "Constant Change Pressure",
        description: "Frequent business changes can be difficult to implement across configurations, integrations and dependencies.",
        icon: Gauge,
    },
    {
        id: 6,
        title: "Scaling Governance",
        description: "Growing Salesforce adoption requires stronger architecture, security and governance without slowing innovation.",
        icon: ShieldCheck,
    },
];

function SalesforceIntro() {
    return (
        <section className="relative overflow-hidden bg-white py-14 lg:py-20">
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">

                {/* Header Container */}
                <div className="text-left lg:text-center max-w-[1240px] lg:mx-auto mb-12 lg:mb-16">
                    {/* Eyebrow */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex justify-start lg:justify-center mb-6"
                    >
                        <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px]">
                            <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                            ENTERPRISE REALITY
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#030B3B] font-display text-left lg:text-center mb-5 leading-tight"
                    >
                        Salesforce can scale. So can complexity.
                    </motion.h2>

                    {/* Callout content in 2 balanced lines within heading */}
                    <motion.p
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="text-slate-600 text-base sm:text-lg leading-relaxed text-left lg:text-center max-w-2xl lg:max-w-[800px] lg:mx-auto"
                    >
                        What starts as a focused Salesforce implementation can evolve into a complex enterprise environment. Without the right architecture and discipline, that complexity can make Salesforce harder to scale and change.
                    </motion.p>
                </div>

                {/* Cards Grid: 3 in a row with generous width for 1-line headings beside icon */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-[1240px] mx-auto pb-6"
                >
                    {realityCards.map((card) => {
                        const IconComponent = card.icon;
                        return (
                            <motion.div
                                key={card.id}
                                variants={scrollReveal}
                                className="group relative flex flex-col justify-start overflow-hidden rounded-[20px] border border-slate-100 bg-white p-5 sm:p-5.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(37,99,235,0.08)] hover:border-blue-200/80 h-full"
                            >
                                {/* Top accent bar on hover */}
                                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Icon beside Heading — both on same line */}
                                <div className="flex items-center gap-3 sm:gap-3.5 mb-3.5 min-w-0">
                                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-blue-50/90 border border-blue-100/70 flex-shrink-0 transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-105 shadow-xs">
                                        <IconComponent className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-blue-600 transition-colors duration-300 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-[#030B3B] text-[14.5px] sm:text-[15px] lg:text-[15.5px] xl:text-[16px] font-bold font-display leading-tight tracking-tight transition-colors duration-300 group-hover:text-blue-600 whitespace-nowrap">
                                        {card.title}
                                    </h3>
                                </div>

                                {/* Content */}
                                <p className="text-slate-600 text-[13px] sm:text-[13.5px] lg:text-[14px] font-medium leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}

/* ------------------- Capabilities Hover Card Component ------------------- */

function CapabilitiesHoverCard({
    title,
    tagline,
    description,
    imageSrc,
    imagePosition = "center center",
    imageScale = 1,
    imageOffsetY = 0,
    edgeBlend = false,
    bgColor,
    isDark,
    className = "",
}: {
    title: string;
    tagline: string;
    description: string;
    imageSrc: string;
    imagePosition?: string;
    imageScale?: number;
    imageOffsetY?: string | number;
    edgeBlend?: boolean;
    bgColor: string;
    isDark: boolean;
    className?: string;
}) {
    const [isHovered, setIsHovered] = useState(false);

    const titleColor = isDark ? "text-white" : "text-[#060d2e]";
    const taglineColor = isDark ? "text-slate-200" : "text-slate-700";
    const descColor = isDark ? "text-slate-300" : "text-slate-600";
    const ctaColor = isDark ? "text-[#00D4AA]" : "text-blue-600";

    const transformStyles = [
        imageScale !== 1 ? `scale(${imageScale})` : "",
        imageOffsetY ? `translateY(${typeof imageOffsetY === "number" ? `${imageOffsetY}px` : imageOffsetY})` : "",
    ].filter(Boolean).join(" ");

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(prev => !prev)}
            style={{ background: bgColor }}
            className={`group relative h-[340px] lg:h-[370px] w-full overflow-hidden rounded-[24px] border ${isDark ? "border-white/8" : "border-black/6"
                } shadow-xl transition-shadow duration-500 cursor-pointer ${isDark
                    ? "hover:shadow-[0_8px_40px_rgba(59,130,246,0.22)]"
                    : "hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]"
                } ${className}`}
        >
            {/* BG IMAGE — fills entire card, fades out on hover */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? "opacity-0" : "opacity-100"
                    }`}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    style={{
                        objectPosition: imagePosition,
                        transform: transformStyles || undefined,
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />

                {/* Vignette: fades hard image edges into the card's own bg color */}
                {edgeBlend && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            boxShadow: `inset 0 0 60px 40px ${bgColor.startsWith("linear") || bgColor.startsWith("radial")
                                ? isDark ? "#05060d" : "#a0a1af"
                                : bgColor
                                }`,
                        }}
                    />
                )}

                {/* Soft gradient so text at top stays readable over image */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: isDark
                            ? "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%)"
                            : edgeBlend
                                ? "linear-gradient(to bottom, rgba(184,184,197,0.45) 0%, transparent 40%)"
                                : "linear-gradient(to bottom, rgba(255,255,255,0.75) 0%, transparent 42%)",
                    }}
                />
            </div>

            {/* ALL TEXT — normal flow, always on top of image */}
            <div className="relative z-10 flex flex-col px-6 pt-6 pb-8 sm:px-7 sm:pt-7 sm:pb-9 lg:px-8 lg:pt-8 lg:pb-10 h-full">
                {/* Title — always visible */}
                <h3 className={`text-[17px] sm:text-[18px] lg:text-[19px] font-extrabold leading-[1.25] ${titleColor}`}>
                    {title}
                </h3>

                {/* Description + CTA — revealed on hover */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? "mt-6 max-h-52 opacity-100" : "mt-0 max-h-0 opacity-0"
                        }`}
                >
                    <p className={`text-[13px] sm:text-[14px] font-medium leading-[1.7] ${descColor}`}>
                        {description}
                    </p>
                    <div className={`mt-4 flex items-center gap-1.5 font-semibold text-[12px] sm:text-[13px] tracking-wide ${ctaColor}`}>
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </div>
    );
}



const capabilities: Array<{
    number: string;
    title: string;
    tagline: string;
    description: string;
    imageSrc: string;
    imagePosition?: string;
    imageScale?: number;
    imageOffsetY?: string | number;
    edgeBlend?: boolean;
    bgColor: string;
    isDark: boolean;
}> = [
        {
            number: "01.",
            title: "Salesforce Strategy & Architecture",
            tagline: "Design a Salesforce foundation built for scale.",
            description: "Architecture strategy, org rationalization, platform modernization, data architecture and governance aligned to business priorities.",
            imageSrc: "/Salesforce/1.png",
            imagePosition: "center center",
            imageScale: 1.08,
            imageOffsetY: "30px",
            edgeBlend: true,
            bgColor: "linear-gradient(135deg, #b8b8c5 0%, #a4a5b3 50%, #888a99 100%)",
            isDark: false,
        },
        {
            number: "02.",
            title: "Salesforce Cloud Transformation",
            tagline: "Connect Salesforce clouds to transform customer and business journeys.",
            description: "Design and implementation across Financial Services Cloud, Service Cloud, Experience Cloud, Data Cloud, Marketing Cloud, Loyalty Cloud and other Salesforce capabilities.",
            imageSrc: "/Salesforce/2.png",
            imagePosition: "center center",
            imageScale: 1.08,
            imageOffsetY: "30px",
            edgeBlend: true,
            bgColor: "#05060d",
            isDark: true,
        },
        {
            number: "03.",
            title: "Customer & Digital Experience",
            tagline: "Turn Salesforce into connected digital experiences.",
            description: "Web, mobile, self-service, portals and conversational experiences that connect customers, employees and Salesforce processes.",
            imageSrc: "/Salesforce/3.png",
            bgColor: "#f2f5f6",
            isDark: false,
        },
        {
            number: "04.",
            title: "Integration & Connectivity",
            tagline: "Connect Salesforce with the systems your business runs on.",
            description: "Enterprise integration across core platforms, legacy applications and third-party systems to create connected processes and experiences.",
            imageSrc: "/Salesforce/4.png",
            bgColor: "#0d151e",
            isDark: true,
        },
        {
            number: "05.",
            title: "Platform Engineering & SecOps",
            tagline: "Build, secure and evolve Salesforce with confidence.",
            description: "Platform engineering, security, governance, monitoring and operational capabilities that support a resilient Salesforce environment.",
            imageSrc: "/Salesforce/6.png",
            bgColor: "#fdfffe",
            isDark: false,
        },
        {
            number: "06.",
            title: "Data, AI & Agentforce",
            tagline: "Turn Salesforce data into intelligent action.",
            description: "Data Cloud, Einstein, Agentforce and intelligent automation that bring context, insight and AI-powered interactions into everyday workflows.",
            imageSrc: "/Salesforce/5.png",
            bgColor: "#02050e",
            isDark: true,
        },
    ];

/* ------------------- Salesforce Capabilities Section ------------------- */

function SalesforceCapabilities() {
    return (
        <section className="relative overflow-hidden bg-[#01040e] pt-12 lg:pt-16 pb-12 lg:pb-16">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#01030a] via-[#01061c]/95 to-[#01040e]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                {/* Header container */}
                <div className="text-left lg:text-center max-w-[1240px] lg:mx-auto mb-10 lg:mb-14">
                    {/* Eyebrow */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex justify-start lg:justify-center mb-6"
                    >
                        <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px]">
                            <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                            OUR CAPABILITIES
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white font-display text-left lg:text-center mb-6 leading-tight"
                    >
                        Engineering Salesforce across every layer.
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="text-slate-300 text-base sm:text-lg leading-relaxed text-left lg:text-center max-w-2xl lg:max-w-[800px] lg:mx-auto font-medium"
                    >
                        From platform strategy and cloud transformation to experiences, integration, data and AI, we bring the expertise to design and engineer Salesforce around your business.
                    </motion.p>
                </div>

                {/* Cards Grid: 3 in a straight row, reduced width, generous spacing */}
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-[1020px] mx-auto"
                >
                    {capabilities.map((cap) => {
                        return (
                            <CapabilitiesHoverCard
                                key={cap.title}
                                title={cap.title}
                                tagline={cap.tagline}
                                description={cap.description}
                                imageSrc={cap.imageSrc}
                                imagePosition={cap.imagePosition}
                                imageScale={cap.imageScale}
                                imageOffsetY={cap.imageOffsetY}
                                edgeBlend={cap.edgeBlend}
                                bgColor={cap.bgColor}
                                isDark={cap.isDark}
                            />
                        );
                    })}
                </motion.div>


            </div>
        </section>
    );
}



/* ------------------- Salesforce Outcomes Section ------------------- */

const outcomeMetrics = [
    { value: "60%", label: "Faster Delivery", icon: Gauge },
    { value: "40%", label: "Cost Optimization", icon: BarChart3 },
    { value: "55%", label: "Faster Case Resolution", icon: Users },
    { value: "80%", label: "Faster Integration", icon: Network },
];

const outcomeBoxes = [
    {
        title: "A 360° View of Every Customer",
        description: "Connect customer information, interactions and relationships across Salesforce to give teams the context they need at every touchpoint.",
        icon: Users,
    },
    {
        title: "Frictionless Digital Journeys",
        description: "Bring web, mobile, self-service and conversational experiences together so customers can move seamlessly from engagement to action.",
        icon: Smartphone,
    },
    {
        title: "Intelligent Business Processes",
        description: "Connect applications, verification, documents, workflows and decisioning to simplify complex processes and accelerate outcomes.",
        icon: Settings,
    },
    {
        title: "Smarter Service",
        description: "Bring customer context, workflows, automation and AI together to help service teams resolve needs more intelligently.",
        icon: ShieldCheck,
    },
    {
        title: "Personalized Engagement",
        description: "Use connected data and intelligent journeys to make every interaction more relevant across sales, marketing and service.",
        icon: BarChart3,
    },
    {
        title: "AI-Powered Operations",
        description: "Put data, automation and Agentforce to work across everyday processes to augment teams and enable faster, smarter decisions.",
        icon: Cloud,
    },
];

function SalesforceOutcomes() {
    return (
        <section className="relative bg-white">
            {/* ── Image + Metrics upper strip ── */}
            <div className="relative h-[430px] sm:h-[380px] lg:h-[420px] overflow-hidden">
                {/* Background image */}
                <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80"
                    alt="Salesforce team collaboration"
                    className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020918]/80 via-[#030b1e]/75 to-[#020918]/90" />

                {/* Metrics */}
                <div className="relative z-10 h-full flex items-center justify-center">
                    <motion.div
                        variants={scrollStaggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 lg:gap-20 px-4 sm:px-6 md:px-10"
                    >
                        {outcomeMetrics.map((m) => {
                            const Icon = m.icon;
                            return (
                                <motion.div
                                    key={m.label}
                                    variants={scrollReveal}
                                    className="flex flex-col items-center gap-1.5 sm:gap-2 text-center"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 mb-0.5 sm:mb-1">
                                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D4AA]" />
                                    </div>
                                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
                                        {m.value}
                                    </span>
                                    <span className="text-xs sm:text-sm lg:text-base font-medium text-slate-300 leading-tight">
                                        {m.label}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* ── White card overlapping the image ── */}
            <div className="relative z-10 mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-12 -mt-12 sm:-mt-20 pb-4 sm:pb-6">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="bg-white rounded-[24px] sm:rounded-[32px] border border-slate-200/70 shadow-[0_4px_32px_rgba(0,0,0,0.08)] px-5 sm:px-12 lg:px-16 pt-8 sm:pt-12 pb-8 sm:pb-12"
                >
                    {/* Heading & callout */}
                    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
                        <motion.h2
                            variants={scrollReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#030B3B] font-display leading-tight"
                        >
                            See what Salesforce can look like when Hyniva engineers it.
                        </motion.h2>
                    </div>

                    {/* 6 outcome boxes */}
                    <motion.div
                        variants={scrollStaggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
                    >
                        {outcomeBoxes.map((box) => {
                            const Icon = box.icon;
                            return (
                                <motion.div
                                    key={box.title}
                                    variants={scrollReveal}
                                    className="group flex flex-col items-center text-center rounded-[20px] border border-blue-200/70 bg-transparent p-5 sm:p-6 shadow-none transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/40 hover:-translate-y-0.5"
                                >
                                    <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-blue-50/80 border border-blue-100/60 mb-3">
                                        <Icon className="w-5 h-5 text-[#2563EB] transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    {/* Title: kept to 1 line via font size — no wrapping */}
                                    <h3 className="font-display text-[14px] sm:text-[15px] font-bold text-[#030B3B] leading-tight tracking-tight group-hover:text-[#2563EB] transition-colors duration-300 mb-2 sm:whitespace-nowrap">
                                        {box.title}
                                    </h3>
                                    {/* Description: consistent 4-line height via line-clamp */}
                                    <p className="text-slate-600 text-[12.5px] sm:text-[13px] font-medium leading-[1.65] line-clamp-4">
                                        {box.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Salesforce Delivery Model & Enablers Section ------------------- */

const deliveryTiers = [
    {
        number: "8",
        unit: "WEEKS",
        heading: "8 WEEKS",
        title: "IMPLEMENTATION",
        line1: "Complex Salesforce initiatives",
        line2Prefix: "and new ",
        line2Bold: "business processes.",
        theme: {
            headingColor: "text-[#9333ea]",
            cardBorder: "border-purple-100/80",
            cardShadow: "shadow-[0_4px_16px_rgba(147,51,234,0.06)]",
            stemBorder: "border-[#9333ea]",
            stemDot: "bg-[#9333ea] shadow-[0_0_6px_1.5px_rgba(147,51,234,0.75)]",
        },
    },
    {
        number: "8",
        unit: "DAYS",
        heading: "8 DAYS",
        title: "MODIFICATION",
        line1: "New workflows, service processes",
        line2Prefix: "and ",
        line2Bold: "business enhancements.",
        theme: {
            headingColor: "text-[#2563eb]",
            cardBorder: "border-blue-100/80",
            cardShadow: "shadow-[0_4px_16px_rgba(37,99,235,0.06)]",
            stemBorder: "border-[#2563eb]",
            stemDot: "bg-[#2563eb] shadow-[0_0_6px_1.5px_rgba(37,99,235,0.75)]",
        },
    },
    {
        number: "8",
        unit: "HOURS",
        heading: "8 HOURS",
        title: "ADMINISTRATION",
        line1: "Configuration changes, access,",
        line2Prefix: "reports and ",
        line2Bold: "platform updates.",
        theme: {
            headingColor: "text-[#0284c7]",
            cardBorder: "border-cyan-100/80",
            cardShadow: "shadow-[0_4px_16px_rgba(2,132,199,0.06)]",
            stemBorder: "border-[#00c8d6]",
            stemDot: "bg-[#00c8d6] shadow-[0_0_6px_1.5px_rgba(0,200,214,0.75)]",
        },
    },
];

const deliveryEnablerBoxes = [
    {
        title: "Reusable Accelerators",
        description: "Pre-built Salesforce components, frameworks and connectors reduce repetitive development and speed implementation.",
        icon: Boxes,
        colorClass: "bg-[#f0f5ff] border-[#e2ecff]",
        textColorClass: "text-[#3b82f6]",
        iconBgClass: "bg-[#e2ecff]",
    },
    {
        title: "Low-Code / No-Code",
        description: "Configurable business processes allow teams to adapt workflows and rules without waiting for extensive development cycles.",
        icon: Sliders,
        colorClass: "bg-[#f0fdf4] border-[#dcfce7]",
        textColorClass: "text-[#10b981]",
        iconBgClass: "bg-[#dcfce7]",
    },
    {
        title: "API-First Integration",
        description: "Reusable connectors and API-first integration frameworks simplify connections across Salesforce and enterprise systems.",
        icon: Network,
        colorClass: "bg-[#faf5ff] border-[#f3e8ff]",
        textColorClass: "text-[#a855f7]",
        iconBgClass: "bg-[#f3e8ff]",
    },
    {
        title: "Automated Delivery",
        description: "CI/CD, DevSecOps and automated testing help move changes through development and deployment with greater speed and consistency.",
        icon: Rocket,
        colorClass: "bg-[#FEF3E7] border-[#FDE4CB]",
        textColorClass: "text-[#ea580c]",
        iconBgClass: "bg-[#FDE4CB]",
    },
];

function SalesforceDeliverySection() {
    return (
        <section className="relative overflow-hidden bg-white pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24">
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                {/* Header Container */}
                <div className="text-left lg:text-center max-w-[1240px] lg:mx-auto mb-10 sm:mb-12">
                    {/* Eyebrow */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="flex justify-start lg:justify-center mb-5"
                    >
                        <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3.5 py-1 text-[11px] font-bold">
                            <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                            HOW WE DELIVER CHANGE
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#030B3B] font-display text-left lg:text-center mb-4 leading-[1.18] tracking-tight"
                    >
                        Reengineering the pace of Salesforce delivery.
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="text-slate-600 text-base sm:text-lg leading-relaxed text-left lg:text-center max-w-3xl lg:max-w-[820px] lg:mx-auto font-medium"
                    >
                        Our 8×8×8 delivery model turns Salesforce changes into a predictable, accelerated path from idea to production.
                    </motion.p>
                </div>

                {/* 2-Column Dashboard Layout: LHS (Delivery Framework Visual) + RHS (Core Capabilities) */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-14 xl:gap-10 items-center justify-center max-w-[1240px] mx-auto">
                    {/* LHS: Delivery Framework Visual Container */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="xl:col-span-6 flex items-center justify-center xl:justify-end relative w-full"
                    >
                        {/* Visual + 3 Text Items Body */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-stretch w-full max-w-[500px] sm:max-w-[510px] h-auto sm:h-[460px] relative gap-0">
                            {/* Figure-8 SVG Graphic */}
                            <div className="relative flex items-center justify-center w-[240px] sm:w-[270px] h-[320px] sm:h-[460px] flex-shrink-0">
                                <svg
                                    viewBox="0 0 884 1200"
                                    className="w-full h-full overflow-visible"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <defs>
                                        <linearGradient id="pageTopGrad" x1="0%" y1="75%" x2="100%" y2="25%">
                                            <stop offset="0%" stopColor="#1c6df8" />
                                            <stop offset="22%" stopColor="#3252f7" />
                                            <stop offset="48%" stopColor="#6b38f6" />
                                            <stop offset="72%" stopColor="#9938f7" />
                                            <stop offset="100%" stopColor="#c955fb" />
                                        </linearGradient>

                                        <linearGradient id="pageBotGrad" x1="10%" y1="100%" x2="90%" y2="0%">
                                            <stop offset="0%" stopColor="#00e5be" />
                                            <stop offset="26%" stopColor="#00cce0" />
                                            <stop offset="54%" stopColor="#0c98f2" />
                                            <stop offset="82%" stopColor="#186cf6" />
                                            <stop offset="100%" stopColor="#1452eb" />
                                        </linearGradient>

                                        {/* Top Ring Mask: Center 442, 415, ends with a clear gap above y=570 */}
                                        <mask id="pageTopRingMask" maskUnits="userSpaceOnUse">
                                            <rect x="-200" y="-200" width="1300" height="770" fill="white" />
                                            <circle cx="442" cy="415" r="130" fill="black" />
                                        </mask>

                                        {/* Bottom Ring Mask: Center 442, 775, starts with a clear gap below y=610 */}
                                        <mask id="pageBotRingMask" maskUnits="userSpaceOnUse">
                                            <rect x="-200" y="610" width="1300" height="1000" fill="white" />
                                            <circle cx="442" cy="775" r="150" fill="black" />
                                        </mask>

                                        {/* Top Donut Tracing Mask: Traces Upper Donut Arch independently with clean gap */}
                                        <mask id="pageTopTraceMask" maskUnits="userSpaceOnUse">
                                            <rect x="-200" y="-200" width="1300" height="1600" fill="black" />
                                            <path
                                                d="M 565 570 C 605 525, 630 475, 630 415 A 188 188 0 0 0 254 415 C 254 475, 279 525, 319 570"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="190"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                pathLength="1000"
                                                strokeDasharray="1000 1000"
                                                strokeDashoffset="1000"
                                            >
                                                <animate
                                                    attributeName="stroke-dashoffset"
                                                    values="1000; 0; -1000"
                                                    keyTimes="0; 0.5; 1"
                                                    dur="4.5s"
                                                    repeatCount="indefinite"
                                                    calcMode="spline"
                                                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                                                />
                                            </path>
                                        </mask>

                                        {/* Bottom Donut Tracing Mask: Traces Lower Donut Cup independently with clean gap */}
                                        <mask id="pageBotTraceMask" maskUnits="userSpaceOnUse">
                                            <rect x="-200" y="-200" width="1300" height="1600" fill="black" />
                                            <path
                                                d="M 565 610 C 610 655, 657 710, 657 775 A 215 215 0 0 1 227 775 C 227 710, 274 655, 319 610"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="190"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                pathLength="1000"
                                                strokeDasharray="1000 1000"
                                                strokeDashoffset="1000"
                                            >
                                                <animate
                                                    attributeName="stroke-dashoffset"
                                                    values="1000; 0; -1000"
                                                    keyTimes="0; 0.5; 1"
                                                    dur="4.5s"
                                                    begin="0.3s"
                                                    repeatCount="indefinite"
                                                    calcMode="spline"
                                                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                                                />
                                            </path>
                                        </mask>

                                        <filter id="pageTopShadow" x="-30%" y="-30%" width="170%" height="170%">
                                            <feDropShadow dx="10" dy="16" stdDeviation="22" floodColor="#5520cf" floodOpacity="0.25" />
                                        </filter>
                                        <filter id="pageBotShadow" x="-30%" y="-30%" width="170%" height="170%">
                                            <feDropShadow dx="10" dy="16" stdDeviation="22" floodColor="#0565be" floodOpacity="0.22" />
                                        </filter>

                                        <filter id="pageGlowAccent" x="-60%" y="-60%" width="220%" height="220%">
                                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>

                                        {/* Orb Gradients */}
                                        <radialGradient id="orbHaloGrad" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#8c50ff" stopOpacity="0.5" />
                                            <stop offset="40%" stopColor="#3cb4ff" stopOpacity="0.35" />
                                            <stop offset="100%" stopColor="#3cb4ff" stopOpacity="0.3" />
                                        </radialGradient>

                                        <radialGradient id="orbGlassGrad" cx="35%" cy="25%" r="65%">
                                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                                            <stop offset="35%" stopColor="#e0d5ff" stopOpacity="0.55" />
                                            <stop offset="70%" stopColor="#a885ff" stopOpacity="0.45" />
                                            <stop offset="100%" stopColor="#00d4be" stopOpacity="0.5" />
                                        </radialGradient>

                                        <radialGradient id="orbMidGrad" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                                            <stop offset="55%" stopColor="#f0e6ff" stopOpacity="0.85" />
                                            <stop offset="85%" stopColor="#d9f0ff" stopOpacity="0.9" />
                                            <stop offset="100%" stopColor="#c5f8ff" stopOpacity="0.95" />
                                        </radialGradient>
                                    </defs>

                                    {/* Schematic Background Rings & Dotted Lines */}
                                    <motion.g
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 0.95 }}
                                        transition={{ duration: 1.2, delay: 0.15 }}
                                        viewport={viewportOnce}
                                    >
                                        {/* Top Donut Concentric Schematic Orbit Arcs */}
                                        <path d="M 165 415 A 277 277 0 0 1 442 138" fill="none" stroke="#705bf5" strokeWidth="1.2" opacity="0.4" />
                                        <path d="M 132 415 A 310 310 0 0 1 442 105" fill="none" stroke="#5b6cf6" strokeWidth="1.0" opacity="0.3" />

                                        {/* Bottom Donut Concentric Schematic Orbit Arcs (matching top donut) */}
                                        <path d="M 132 775 A 310 310 0 0 0 442 1085" fill="none" stroke="#00c8d6" strokeWidth="1.2" opacity="0.4" />
                                        <path d="M 97 775 A 345 345 0 0 0 442 1120" fill="none" stroke="#00e5be" strokeWidth="1.0" opacity="0.3" />

                                        {/* Top Dotted Arc joining Top Dot */}
                                        <path d="M 142 340 A 280 280 0 0 1 742 340 L 884 340" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeDasharray="2 6" strokeLinecap="round" opacity="0.9" />

                                        {/* Middle Dotted Line joining Center Circle to Middle Dot */}
                                        <path d="M 557 590 L 884 590" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeDasharray="2 6" strokeLinecap="round" opacity="0.9" />

                                        {/* Bottom Dotted Arc joining Bottom Dot */}
                                        <path d="M 142 840 A 300 300 0 0 0 742 840 L 884 840" fill="none" stroke="#00c8d6" strokeWidth="1.8" strokeDasharray="2 6" strokeLinecap="round" opacity="0.9" />

                                        <circle cx="195" cy="180" r="5" fill="#256cf8" opacity="0.95" filter="url(#pageGlowAccent)" />
                                        <circle cx="135" cy="495" r="3" fill="#5045ea" opacity="0.8" />
                                        <circle cx="230" cy="685" r="4.5" fill="#00c8d6" opacity="0.9" filter="url(#pageGlowAccent)" />
                                        <circle cx="165" cy="885" r="5" fill="#00e5be" opacity="0.95" filter="url(#pageGlowAccent)" />
                                    </motion.g>

                                    {/* Top Donut Arch - Separated, with internal tracing line */}
                                    <g mask="url(#pageTopTraceMask)" filter="url(#pageTopShadow)">
                                        <circle cx="442" cy="415" r="245" fill="url(#pageTopGrad)" mask="url(#pageTopRingMask)" />
                                        <circle cx="442" cy="415" r="187.5" fill="none" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.4" mask="url(#pageTopRingMask)" />
                                    </g>

                                    {/* Bottom Donut U-Cup - Separated, with matching internal tracing line */}
                                    <g mask="url(#pageBotTraceMask)" filter="url(#pageBotShadow)">
                                        <circle cx="442" cy="775" r="280" fill="url(#pageBotGrad)" mask="url(#pageBotRingMask)" />
                                        <circle cx="442" cy="775" r="215" fill="none" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.4" mask="url(#pageBotRingMask)" />
                                    </g>

                                    {/* Glowing Light Tracer Bead 1: Leading the Top Donut Tracing from Purple Right */}
                                    <circle r="10" fill="#ffffff" filter="url(#pageGlowAccent)">
                                        <animateMotion
                                            path="M 565 570 C 605 525, 630 475, 630 415 A 188 188 0 0 0 254 415 C 254 475, 279 525, 319 570"
                                            dur="4.5s"
                                            repeatCount="indefinite"
                                            calcMode="spline"
                                            keySplines="0.4 0 0.2 1"
                                            keyTimes="0; 1"
                                            keyPoints="0; 1"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0; 1; 1; 0"
                                            keyTimes="0; 0.1; 0.9; 1"
                                            dur="4.5s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>

                                    {/* Glowing Light Tracer Bead 2: Leading the Bottom Donut Tracing from Blue Right */}
                                    <circle r="10" fill="#ffffff" filter="url(#pageGlowAccent)">
                                        <animateMotion
                                            path="M 565 610 C 610 655, 657 710, 657 775 A 215 215 0 0 1 227 775 C 227 710, 274 655, 319 610"
                                            dur="4.5s"
                                            begin="0.3s"
                                            repeatCount="indefinite"
                                            calcMode="spline"
                                            keySplines="0.4 0 0.2 1"
                                            keyTimes="0; 1"
                                            keyPoints="0; 1"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0; 1; 1; 0"
                                            keyTimes="0; 0.1; 0.9; 1"
                                            dur="4.5s"
                                            begin="0.3s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>

                                    {/* Stationary Center Glass Lens Orb - Exact Center (442, 590) with Synchronized Subtle Breathing */}
                                    <g transform="translate(442, 590)">
                                        <g>
                                            <animateTransform
                                                attributeName="transform"
                                                type="scale"
                                                values="0.92; 1.05; 0.92"
                                                keyTimes="0; 0.5; 1"
                                                dur="4.5s"
                                                repeatCount="indefinite"
                                                calcMode="spline"
                                                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                                            />
                                            <animate
                                                attributeName="opacity"
                                                values="0.9; 1; 0.9"
                                                keyTimes="0; 0.5; 1"
                                                dur="4.5s"
                                                repeatCount="indefinite"
                                                calcMode="spline"
                                                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                                            />

                                            {/* Ambient Halo Glow */}
                                            <circle cx="0" cy="0" r="160" fill="url(#orbHaloGrad)" filter="url(#pageGlowAccent)" opacity="0.6" />

                                            {/* Glass Outer Disc */}
                                            <circle cx="0" cy="0" r="135" fill="url(#orbGlassGrad)" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="3" filter="url(#pageTopShadow)" />
                                            
                                            {/* Glass Sheen */}
                                            <path d="M -80 -75 A 105 105 0 0 1 45 -95 A 85 65 0 0 0 -80 -75" fill="rgba(255, 255, 255, 0.75)" opacity="0.85" />

                                            {/* Mid Disc */}
                                            <circle cx="0" cy="0" r="75" fill="url(#orbMidGrad)" stroke="#ffffff" strokeWidth="3.5" />

                                            {/* Glowing Core */}
                                            <circle cx="0" cy="0" r="32" fill="#ffffff" filter="url(#pageGlowAccent)">
                                                <animate attributeName="r" values="30; 35; 30" dur="3s" repeatCount="indefinite" />
                                            </circle>

                                            {/* Glints */}
                                            <circle cx="-62" cy="0" r="5.5" fill="#38bdf8" filter="url(#pageGlowAccent)" />
                                            <circle cx="48" cy="42" r="4.5" fill="#ffffff" filter="url(#pageGlowAccent)" />
                                        </g>
                                    </g>
                                </svg>
                            </div>

                            {/* 3 Connected Tiers */}
                            <div className="w-full sm:w-auto sm:flex-1 sm:min-w-[210px] sm:max-w-[230px] h-auto sm:h-[460px] relative z-10 flex flex-col gap-5 sm:gap-0 mt-6 sm:mt-0 px-2 sm:px-0">
                                {/* Bound Vertical Dotted Track (desktop/tablet only) */}
                                <div
                                    className="hidden sm:block absolute left-[6px] top-[130px] h-[192px] w-[2px] -translate-x-1/2 border-l-[1.75px] border-dotted border-[#818cf8] pointer-events-none z-[2]"
                                    aria-hidden="true"
                                />

                                {deliveryTiers.map((tier, index) => {
                                    const yPositions = ["sm:top-[130px]", "sm:top-[226px]", "sm:top-[322px]"];
                                    return (
                                        <div
                                            key={tier.heading}
                                            className={`flex items-start sm:items-center w-full relative sm:absolute sm:left-0 sm:right-0 ${yPositions[index]} sm:-translate-y-1/2`}
                                        >
                                            {/* Stem Connector with Dot (desktop/tablet only) */}
                                            <div className="hidden sm:flex items-center w-[24px] flex-shrink-0 relative z-[4] mt-1 sm:mt-0">
                                                <div className="relative flex items-center justify-center w-3 h-3 flex-shrink-0 z-[5]">
                                                    <div className={`absolute w-[1.2px] h-[14px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${tier.theme.stemBorder} border-l`} />
                                                    <div className={`w-2 h-2 rounded-full relative z-[3] ${tier.theme.stemDot}`} />
                                                </div>
                                                <div className={`flex-1 h-[1.5px] border-t-[1.5px] ${tier.theme.stemBorder} opacity-90`} />
                                            </div>

                                            {/* Left-Aligned Text Content in 2 balanced lines */}
                                            <div className="flex-1 relative sm:pl-3 flex flex-col items-start text-left">
                                                {/* Left-Aligned Heading */}
                                                <h4 className={`text-[12px] sm:text-[13px] font-extrabold tracking-[0.18em] ${tier.theme.headingColor} uppercase mb-1 font-display text-left`}>
                                                    {tier.heading}
                                                </h4>

                                                {/* Left-Aligned Description in exactly 2 lines */}
                                                <div className="text-[12px] sm:text-[12.5px] text-slate-600 leading-[1.4] font-medium text-left">
                                                    <span className="block sm:whitespace-nowrap">{tier.line1}</span>
                                                    <span className="block sm:whitespace-nowrap">
                                                        {tier.line2Prefix}
                                                        <strong className="font-bold text-slate-800">{tier.line2Bold}</strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* RHS: Core Capabilities (4 Cards matching About Us page) */}
                    <div className="xl:col-span-6 flex flex-col justify-center w-full max-w-[640px] mx-auto xl:mx-0">
                        {/* 2x2 Grid matching About Us Values */}
                        <motion.div
                            variants={scrollStaggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 h-full"
                        >
                            {deliveryEnablerBoxes.map((box) => {
                                const IconComponent = box.icon;
                                return (
                                    <motion.div
                                        key={box.title}
                                        variants={scrollReveal}
                                        className={`rounded-2xl p-5 sm:p-5.5 lg:p-6 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-start cursor-default ${box.colorClass}`}
                                    >
                                        <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 flex-shrink-0 ${box.iconBgClass} ${box.textColorClass}`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-[17px] sm:text-[18px] font-bold mb-2.5 text-slate-900 font-display tracking-tight leading-snug">
                                            {box.title}
                                        </h3>
                                        <p className="text-slate-600 text-[13px] sm:text-[13.5px] leading-[1.6] font-medium">
                                            {box.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------- Why Hyniva for Salesforce Section ------------------- */

const whyHynivaSalesforceCards = [
    {
        title: "Multi-Cloud Expertise",
        description: "Deep expertise across Salesforce clouds, connecting capabilities across the platform to create cohesive enterprise solutions.",
        icon: Cloud,
    },
    {
        title: "Engineering Depth",
        description: "Salesforce architects, engineers and product specialists equipped to solve complex platform, integration and modernization challenges.",
        icon: Users,
    },
    {
        title: "Accelerated Delivery",
        description: "Reusable IP, pre-built frameworks and the 8×8×8 model help move Salesforce initiatives from development to production faster.",
        icon: Zap,
    },
    {
        title: "PlatformSecOps",
        description: "Security, governance, DevSecOps and continuous operations built into the Salesforce platform lifecycle.",
        icon: ShieldCheck,
    },
];

function SalesforceWhyHyniva() {
    return (
        <section className="bg-white py-[16px] sm:py-[24px] lg:py-[32px]">
            <div className="mx-auto w-full max-w-[96rem] px-4 sm:px-10 lg:px-16 flex flex-col gap-6">
                {/* ── Top Box: Dark Glowing Container ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="relative overflow-hidden rounded-t-[32px] rounded-b-none bg-[#0A102E] shadow-2xl p-[20px] sm:p-[36px] lg:p-[48px]"
                >
                    <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
                        <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
                        THE DIFFERENCE
                    </div>
                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35)_0%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 grid gap-8 lg:gap-16 lg:grid-cols-12 items-start">
                        {/* Left Side: Headline & Stats */}
                        <div className="lg:col-span-6">
                            <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] xl:text-[42px] font-[900] text-white tracking-tight leading-[1.15] mb-4 sm:mb-6 lg:mb-8 font-display">
                                <span className="block">Why Hyniva for</span>
                                <span className="text-[#00D4AA] block lg:whitespace-nowrap">Salesforce Partnership?</span>
                            </h2>

                            <div className="flex flex-col gap-6 sm:gap-10 lg:gap-16">
                                <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-6 xl:gap-8 w-full">
                                    {/* 120+ Delivery Experts */}
                                    <div className="flex flex-col flex-shrink-0">
                                        <div className="flex items-baseline gap-1 mb-2">
                                            <span className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-white leading-none font-display">
                                                120
                                            </span>
                                            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none">+</span>
                                        </div>
                                        <span className="text-[11px] sm:text-[12.5px] lg:text-[13.5px] text-slate-400 font-medium leading-[1.35]">
                                            Salesforce<br />Delivery Experts
                                        </span>
                                    </div>

                                    {/* 10 Years Expertise */}
                                    <div className="flex flex-col flex-shrink-0">
                                        <div className="flex items-baseline gap-1 mb-2">
                                            <span className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-white leading-none font-display">
                                                10
                                            </span>
                                        </div>
                                        <span className="text-[11px] sm:text-[12.5px] lg:text-[13.5px] text-slate-400 font-medium leading-[1.35]">
                                            Years of Salesforce<br />Expertise
                                        </span>
                                    </div>

                                    {/* 30+ Engagements */}
                                    <div className="flex flex-col flex-shrink-0">
                                        <div className="flex items-baseline gap-1 mb-2">
                                            <span className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-white leading-none font-display">
                                                30
                                            </span>
                                            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none">+</span>
                                        </div>
                                        <span className="text-[11px] sm:text-[12.5px] lg:text-[13.5px] text-slate-400 font-medium leading-[1.35]">
                                            Salesforce<br />Engagements
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Description & CTA */}
                        <div className="flex flex-col items-start pt-2 lg:pt-0 lg:col-span-6 lg:pl-6 xl:pl-10">
                            <p className="text-base sm:text-lg lg:text-[18.5px] text-slate-300 font-medium leading-[1.7] mb-6 sm:mb-8 lg:mb-10 max-w-[540px]">
                                An engineering-led Salesforce partner with deep multi-cloud expertise, reusable IP and enterprise-scale delivery capabilities.
                            </p>
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white eyebrow px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-[#3B82F6]/30 w-full sm:w-auto"
                            >
                                {salesforceContent.hero ? "KNOW MORE →" : "KNOW MORE →"}
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* ── Bottom Box: Subtle Features Container ── */}
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="rounded-b-[32px] rounded-t-none bg-[#ECF6FF] pt-[28px] pb-[24px] px-[24px] sm:pt-[34px] sm:pb-[28px] sm:px-[36px] lg:pt-[42px] lg:pb-[34px] lg:px-[48px] border border-[#ECF6FF]/80 drop-shadow-sm"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
                        {whyHynivaSalesforceCards.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <div key={idx} className="flex flex-col">
                                    <div className="h-10 w-10 bg-white shadow-sm flex items-center justify-center rounded-xl mb-3.5 flex-shrink-0 border border-[#3B82F6]/10">
                                        <Icon className="w-5 h-5 text-[#3B82F6]" />
                                    </div>
                                    <h3 className="text-[15px] lg:text-[16px] font-black text-[#030B3B] mb-2 leading-tight tracking-tight font-display">
                                        {card.title}
                                    </h3>
                                    <p className="text-[13px] lg:text-[13.5px] text-slate-600 font-medium leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------- Salesforce AgentExchange Section ------------------- */

function SalesforceAgentExchangeSection() {
    return (
        <section className="bg-white relative py-[36px] sm:py-[46px] lg:py-[60px] overflow-hidden">
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
                    {/* LHS: Content */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="lg:col-span-5 flex flex-col justify-center gap-6 sm:gap-7"
                    >
                        {/* Heading in exactly 2 lines — font sized to fit within col-span-5 */}
                        <h2 className="text-[26px] sm:text-[28px] md:text-[30px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px] font-extrabold text-[#030B3B] leading-[1.22] tracking-tight font-display">
                            <span className="block">Built for Salesforce.</span>
                            <span className="text-[#2563EB] block">Trusted on AgentExchange.</span>
                        </h2>

                        {/* Callout content */}
                        <p className="text-[13.5px] sm:text-[14px] lg:text-[15px] text-slate-600 font-medium leading-relaxed">
                            Hyniva has taken its Salesforce engineering expertise beyond implementations to build and launch a Salesforce-native product on AgentExchange.
                        </p>

                        {/* CTA Button */}
                        <div>
                            <Link
                                href="https://appexchange.salesforce.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-[13px] sm:text-[14px] font-semibold px-6 sm:px-7 py-3 rounded-full transition-all duration-300 hover:opacity-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] shadow-[0_4px_12px_rgba(37,99,235,0.3)] border border-[#3B82F6]/30 group w-fit"
                            >
                                View on AgentExchange
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* RHS: Salesforce AgentExchange Showcase Image */}
                    <motion.div
                        variants={scrollReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="lg:col-span-7 relative flex items-center justify-center"
                    >
                        <div className="w-full max-w-[580px] sm:max-w-[640px] lg:max-w-[680px] mx-auto relative group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/Salesforce/agentexchange.png"
                                alt="Hyniva Data Exchange Hub on Salesforce AgentExchange"
                                className="w-full h-auto object-contain select-none transition-transform duration-700 group-hover:scale-[1.02]"
                                loading="eager"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ------------------- Case Studies Section ------------------- */

const salesforceCaseStudies = [
    {
        title: "<span class='text-[#3B82F6]'>Autonomous Lending Experience</span> with FinXServe & Agentforce",
        image: "/images/Case_Studies/Optimized/cs-1.png",
        description: "Built an AI-driven lending journey that automates document processing, decisioning and approvals.",
        href: "/insights/case-studies/autonomous-lending-experiences",
    },
    {
        title: "Modernizing Contact Centers with <span class='text-[#3B82F6]'>Intelligent IVR Self-Service</span>",
        image: "/images/Case_Studies/Optimized/cs-3.png",
        description: "Transformed legacy IVR into a Smart Customer Engagement Interaction System.",
        href: "/insights/case-studies/intelligent-ivr-self-service",
    },
    {
        title: "<span class='text-[#3B82F6]'>Frictionless Customer Authentication</span> for Secure Banking",
        image: "/images/Case_Studies/Optimized/cs-7.png",
        description: "Modernized contact center authentication with Pindrop voice biometrics.",
        href: "/insights/case-studies/customer-authentication",
    },
];

function CaseStudiesSection() {
    return (
        <section className="bg-[#f8fafc] py-[30px] sm:py-[40px] lg:py-[50px]">
            <div className="relative z-10 mx-auto max-w-[96rem] px-6 md:px-10 lg:px-16">
                <div>
                    {/* Case Studies Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        variants={scrollStaggerContainer}
                        className="w-full"
                    >
                        <motion.div
                            variants={scrollReveal}
                            className="mb-14 lg:mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#030B3B] mb-6 font-display">
                                Case Studies
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
                                Real-world implementations demonstrating how we help enterprises evolve through comprehensive digital and cloud transformation.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {salesforceCaseStudies.map((study, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={scrollReveal}
                                    className="group flex flex-col rounded-[28px] bg-[#EEF5FF] border border-blue-100/60 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl relative h-full justify-between"
                                >
                                    {/* Card Image */}
                                    <div className="aspect-[1.75/1] overflow-hidden relative rounded-[20px] bg-white mb-5 shadow-xs">
                                        {study.image && (
                                            <Image
                                                src={study.image}
                                                alt={study.title.replace(/<[^>]*>/g, "")}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="px-2 pb-1 flex flex-col flex-1 relative z-10">
                                        <h3
                                            className="font-display text-[16px] sm:text-[18.5px] font-bold text-[#030B3B] leading-[1.35] tracking-tight mb-2.5 sm:mb-3"
                                            dangerouslySetInnerHTML={{ __html: study.title }}
                                        />

                                        <p className="text-[13.5px] sm:text-[14px] font-normal text-slate-600 leading-[1.65] mb-5 sm:mb-6 flex-1">
                                            {study.description}
                                        </p>

                                        <Link
                                            href={study.href}
                                            className="flex items-center justify-between w-full py-3.5 px-5 bg-white text-[#2563EB] border border-blue-200/70 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all duration-300 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white mt-auto"
                                        >
                                            Read Case Study
                                            <svg
                                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ------------------- Page ------------------- */

export default function SalesforcePage() {
    return (
        <>
            <Navbar />
            <main>
                <SalesforceHero />
                <SalesforceIntro />
                <SalesforceCapabilities />
                <SalesforceOutcomes />
                <SalesforceDeliverySection />
                <SalesforceWhyHyniva />
                <SalesforceAgentExchangeSection />
                <CaseStudiesSection />
            </main>
            <Footer />
        </>
    );
}
