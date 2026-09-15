"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Landmark, type LucideIcon } from "lucide-react";
import { careersHomeContent } from "@/content/site-content";
import { jobOpenings } from "@/content/job-openings";
import { JobListings } from "@/components/job-listings";
import { scrollReveal, viewportOnce } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { HighlightedHeadline } from "@/components/ui/highlighted-headline";
import { CONTAINER_CLASS } from "@/lib/container-utils";

const iconMap: Record<string, LucideIcon> = {
    Landmark,
};

type CareerPoint = (typeof careersHomeContent.points)[number];

function FeaturedTile({ point, body }: { point: CareerPoint; body: string }) {
    const Icon = iconMap[point.icon];
    const image = "image" in point ? point.image : undefined;

    return (
        <motion.article
            variants={scrollReveal}
            className="group relative overflow-hidden rounded-2xl flex"
        >
            {image && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.06 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 1200px"
                        priority={false}
                    />
                </motion.div>
            )}

            <div
                className="absolute inset-0 bg-gradient-to-br from-[#0A2F52]/92 via-[#135498]/88 to-[#0A2F52]/78"
                aria-hidden
            />
            <div
                className="absolute inset-0 bg-gradient-to-r from-[#0A2F52]/55 via-transparent to-transparent"
                aria-hidden
            />

            <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
                aria-hidden
            />

            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent"
                aria-hidden
            />

            <div className="relative z-10 p-5 sm:p-6 lg:p-7 w-full">
                <div className="max-w-3xl">
                    <div className="mb-3 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                        {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
                    </div>
                    <h3 className="text-[22px] sm:text-[28px] lg:text-[32px] font-black text-white leading-tight tracking-tight font-display">
                        {point.title}
                    </h3>
                    <p className="mt-3 text-[14px] sm:text-[15px] lg:text-base text-white/80 font-medium leading-relaxed max-w-3xl">
                        {body}
                    </p>
                </div>
            </div>
        </motion.article>
    );
}

export function CareersHome() {
    const router = useRouter();
    const { headline, highlightedWord, description, points, cta } = careersHomeContent;
    const [expandedJob, setExpandedJob] = useState<string | null>(null);

    const featured = points.find((p) => "featured" in p && p.featured) ?? points[0];

    const toggleJob = (jobId: string) => {
        setExpandedJob((current) => (current === jobId ? null : jobId));
    };

    const handleApply = (jobTitle: string) => {
        const job = jobOpenings.find((opening) => opening.title === jobTitle);
        if (job) {
            router.push(`/careers?job=${job.id}&apply=1`);
            return;
        }
        router.push("/careers");
    };

    return (
        <section
            id="careers-section"
            className="relative border-t border-[#135498]/10 bg-white py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden scroll-mt-20"
        >
            <div
                className="absolute inset-y-0 left-0 w-1 sm:w-1.5 bg-gradient-to-b from-[#135498] to-[#3886CE] pointer-events-none"
                aria-hidden
            />
            <div
                className="absolute inset-0 bg-[#135498]/[0.035] pointer-events-none"
                aria-hidden
            />

            <div className={`relative ${CONTAINER_CLASS}`}>
                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-3xl"
                >
                    <h2 className="text-[28px] sm:text-[44px] lg:text-[44px] 2xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.1] whitespace-normal break-words max-w-full">
                        <HighlightedHeadline
                            headline={headline}
                            highlightedWord={highlightedWord}
                        />
                    </h2>
                </motion.div>

                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-10"
                >
                    <FeaturedTile point={featured} body={description} />
                </motion.div>

                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-10 max-w-5xl"
                >
                    <JobListings
                        jobs={jobOpenings}
                        expandedJob={expandedJob}
                        onToggleJob={toggleJob}
                        onApply={handleApply}
                    />
                </motion.div>

                <motion.div
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="mt-8 sm:mt-10"
                >
                    <Button
                        size="lg"
                        asChild
                        className="bg-[#135498] text-white hover:bg-[#0F427A] border border-transparent rounded-full font-bold px-6 xl:px-8 h-12 xl:h-14 text-sm xl:text-base shadow-[0_4px_14px_rgba(19,84,152,0.28)]"
                    >
                        <Link href={cta.href}>
                            {cta.label} <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
