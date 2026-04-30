"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, Wifi, Monitor, Truck, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { transportationLogisticsContent } from "@/content/transportation-logistics";
import {
    scrollReveal,
    scrollStaggerContainer,
    viewportOnce,
    staggerContainer,
    fadeInUp,
} from "@/lib/animations";

/* ─────────────── Icon Map ─────────────── */

const iconMap: Record<string, React.ElementType> = {
    Wifi,
    Monitor,
    Truck,
    BarChart3,
};

/* ─────────────── Service Card ─────────────── */

function ServiceCard({
    service,
    index,
}: {
    service: (typeof transportationLogisticsContent.capabilities.services)[number];
    index: number;
}) {
    const IconComponent = iconMap[service.icon] || Monitor;

    return (
        <motion.div
            variants={scrollReveal}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <IconComponent className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold leading-snug mb-3 text-blue-900">
                {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 flex-1">
                {service.description}
            </p>
        </motion.div>
    );
}

/* ─────────────── Hero Section ─────────────── */

function TransportationHero() {
    return (
        <section className="relative overflow-hidden py-20 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-44 lg:py-36 lg:pt-48">
            {/* Background layers */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${transportationLogisticsContent.hero.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918]/70 via-[#061244]/50 to-[#030b1e]/70" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(52,81,149,0.2)_0%,transparent_65%)]" />
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#020918]/50 via-[#020918]/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bricolage"
                    >
                        {transportationLogisticsContent.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 text-lg text-slate-200 sm:text-xl"
                    >
                        {transportationLogisticsContent.hero.subtitle}
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8"
                    >
                        <Link
                            href={transportationLogisticsContent.hero.contactButton.href}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-900 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                        >
                            {transportationLogisticsContent.hero.contactButton.text}
                            <ArrowUpRightIcon className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Intro Section ─────────────── */

function TransportationIntro() {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-4xl"
                >
                    <h3 className="text-xl font-bold leading-snug sm:text-2xl md:text-3xl mb-4 text-blue-900">
                        {transportationLogisticsContent.intro.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                        {transportationLogisticsContent.intro.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Capabilities Section ─────────────── */

function Capabilities() {
    const { capabilities } = transportationLogisticsContent;

    return (
        <section className="bg-[#f3f3f3] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12"
                >
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-blue-900">
                        {capabilities.title}
                    </h2>
                </motion.div>
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {capabilities.services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Delivery Enablers ─────────────── */

function DeliveryEnablers() {
    const { deliveryEnablers } = transportationLogisticsContent;

    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mb-12"
                >
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-blue-900">
                        {deliveryEnablers.title}
                    </h2>
                </motion.div>
                <motion.div
                    variants={scrollStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center"
                >
                    {deliveryEnablers.logos.map((logo, index) => (
                        <motion.div
                            key={logo.name}
                            variants={scrollReveal}
                            className="flex items-center justify-center"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={100}
                                height={50}
                                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Page ─────────────── */

export default function TransportationLogisticsPage() {
    return (
        <>
            <Navbar />
            <main>
                <TransportationHero />
                <TransportationIntro />
                <Capabilities />
                <DeliveryEnablers />
            </main>
            <Footer />
        </>
    );
}
