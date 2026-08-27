"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/faq";
import { claimPioneerFaqs } from "@/content/product-faqs";
import { motion } from "framer-motion";
import { CONTAINER_CLASS } from "@/lib/container-utils";
import {
  fadeInUp,
  staggerContainer,
  scrollReveal,
  viewportOnce,
} from "@/lib/animations";

const capabilities = [
  {
    img: "/images/products/ai-assistant-action-user-interacting-with-futuristic-interface-laptop-scaled-450x250.jpg",
    title: "AI-Driven Claim Assignment",
    desc: "Assigns claims automatically based on adjuster availability, skill, performance, and proximity – ensuring fair and efficient distribution",
  },
  {
    img: "/images/products/male-influencer-holds-phone-with-chroma-key-screen-online-presence-scaled-450x250.jpg",
    title: "Mobile-First Field Execution",
    desc: "Adjusters manage assignments, routes, photos, notes, and estimate submissions from a single mobile app",
  },
  {
    img: "/images/products/businessman-holding-hand-icon-user-man-woman-low-poly-polygon-style-internet-icons-interface-foreground-global-network-media-concept-scaled-450x250.jpg",
    title: "Real-Time Customer Updates",
    desc: "Customers receive appointment confirmations, adjuster details, ETA, and live tracking updates – reducing follow-up calls.",
  },
  {
    img: "/images/products/industrial-technology-with-industrial-network-connection-scaled-450x250.jpg",
    title: "Smart Workflow Automation",
    desc: "From intake to QA review, submission, and payouts – everything runs on an intelligent, connected workflow",
  },
  {
    img: "/images/products/businessman-studying-infographics-performance-metrics-scaled-450x250.jpg",
    title: "Operations Dashboards",
    desc: "Real-time visibility into workloads, productivity, SLAs and bottlenecks with insights to improve daily operations",
  },
  {
    img: "/images/products/colleagues-male-entrepreneurs-meeting-room-creative-office-discussing-accounting-trade-scaled-450x250.jpg",
    title: "Financial Management",
    desc: "Manage carrier invoices, adjuster payments, commissions, and financial performance through a unified dashboard",
  },
];

const outcomes = [
  {
    img: "/images/products/project-management.png",
    title: "Faster & More Efficient Claim Assignment",
    desc: "AI-driven routing accelerates assignment and removes delays caused by manual processes.",
  },
  {
    img: "/images/products/coordination.png",
    title: "Significantly Reduced Manual Coordination Efforts",
    desc: "Automation replaces phone calls, messages, and spreadsheets — freeing up agency time.",
  },
  {
    img: "/images/products/utilization.png",
    title: "Improved Adjuster Utilization and Workload Balance",
    desc: "Balanced workloads ensure adjusters get the right number of assignments, increasing productivity.",
  },
  {
    img: "/images/products/commitment.png",
    title: "Stronger SLA Adherence and Operational Consistency",
    desc: "Real-time visibility, automated scheduling, and timely field visits help teams consistently meet SLAs.",
  },
  {
    img: "/images/products/rate.png",
    title: "Higher Customer Satisfaction & Better NPS",
    desc: "Live tracking, instant updates, and faster assessments create a smoother customer experience.",
  },
  {
    img: "/images/products/workflow.png",
    title: "More Predictable & Organized Workflows",
    desc: "Adjusters experience fewer scheduling conflicts and clearer daily planning, reducing missed appointments.",
  },
];

export default function ClaimPioneerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar forceDarkText={true} />

      {/* Hero Section */}
      <section className="pt-[110px] lg:pt-[120px] pb-8 lg:pb-12">
        <div className={CONTAINER_CLASS}>
          <div className="flex flex-wrap items-start">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 px-4 flex flex-col justify-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {/* Logo */}
                <motion.div variants={fadeInUp} className="mb-6 -mt-12 sm:-mt-14 lg:-mt-[58px]">
                  <div className="w-full max-w-[280px] sm:max-w-[320px]">
                    <Image
                      src="/images/Product_Logos/Claim_pioneer.png"
                      alt="Claim Pioneer Logo"
                      width={320}
                      height={146}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </motion.div>

                {/* Heading */}
                <header className="mb-6">
                  <motion.h2
                    variants={fadeInUp}
                    className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-[1.15] text-[#345195] mb-3 sm:whitespace-nowrap"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    AUTOMATE. ADJUST. ACHIEVE.
                  </motion.h2>

                  <motion.p
                    variants={fadeInUp}
                    className="text-[16px] sm:text-[17px] font-medium leading-[1.7] text-[#666666]"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Transforming every step of the claims journey with automation to boost speed, accuracy, and customer satisfaction.
                  </motion.p>
                </header>

                {/* Button */}
                <motion.div variants={fadeInUp}>
                  <Link
                    href="/contact"
                    className="inline-block bg-[#00529b] text-white px-[25px] py-[12px] text-[15px] font-medium rounded shadow hover:bg-[#004080] transition-colors"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Book a Demo
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 px-4 flex justify-center mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <Image
                  src="/images/products/image-2.jpeg"
                  alt="Claim Pioneer"
                  width={800}
                  height={536}
                  priority
                  className="w-full h-auto object-cover rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Reimagining Claims */}
      <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#f8f9fa]">
        <div className={`${CONTAINER_CLASS} text-center`}>
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2
              className="text-[28px] sm:text-[32px] font-bold text-[#345195] mb-[24px] leading-tight font-display tracking-tight"
            >
              Reimagining Claims with Intelligent Automation
            </h2>
            <div className="max-w-[960px] mx-auto text-center">
              <p
                className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-normal text-gray-700 leading-relaxed m-0"
              >
                The future of claims is fast, automated, and intelligence
                driven. Traditional manual assignment and follow-ups create
                delays, biased routing, and customer frustration. Claim Pioneer
                brings automation and real-time visibility to every step of the
                claim's lifecycle, from intake to closure. With built-in AI
                assignment, live tracking, and end-to-end workflow automation,
                agencies can scale operations, reduce overhead, and consistently
                deliver high-quality claim outcomes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities That Drive Growth */}
      <section id="capabilities" className="bg-[#030B3B] py-[30px] sm:py-[40px] lg:py-[50px] overflow-hidden">
        <div className={`${CONTAINER_CLASS} flex flex-col lg:flex-row gap-[32px] lg:gap-[60px]`} >
          {/* LEFT FIXED CONTENT */}
          <div className="lg:w-[32%] lg:sticky lg:top-[90px] self-start z-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-white mb-4 lg:mb-6 leading-tight">
              Capabilities That Drive Growth
            </h2>
            <p className="text-center md:text-left text-[15px] sm:text-[16px] leading-[1.6] text-slate-300 max-w-sm mx-auto md:mx-0">
              Driving faster launches, lower costs, and frictionless journeys across every channel. Built by banking experts.
            </p>
          </div>

          {/* RIGHT GRID (Scrollable) */}
          <div className="lg:w-[68%] lg:max-h-[660px] lg:overflow-y-auto pr-[10px] pt-0 lg:pt-[20px] custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-[24px] lg:gap-[30px] items-stretch">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="group relative rounded-[18px] flex flex-col pt-[30px] px-[30px] pb-[20px] transition-all duration-300"
                style={{
                  background: 'linear-gradient(#030B3B, #030B3B) padding-box, linear-gradient(320deg, rgba(30, 144, 255, 0.52), rgba(0, 82, 155, 0.53), rgba(3, 11, 59, 0.56)) border-box',
                  border: '1px solid transparent'
                }}
              >
                {/* Title */}
                <h3 className="text-[17px] sm:text-[18px] leading-snug text-white font-bold mb-[12px] relative z-10">{cap.title}</h3>

                {/* Description */}
                <p className="text-[15px] sm:text-base font-medium leading-[1.7] text-slate-300 mb-[20px] relative z-10">{cap.desc}</p>

                {/* Image — sits directly below description */}
                <div className="relative z-10 rounded-[10px] overflow-hidden aspect-[16/9] w-full mt-auto">
                  <Image
                    src={cap.img}
                    alt={cap.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-[10px] opacity-80 transition-transform duration-500 group-hover:-translate-y-2 object-cover"
                  />
                </div>

                {/* Hover Effect Gradient Overlay */}
                <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(#030B3B, #030B3B) padding-box, linear-gradient(320deg, #1e90ff, #00529b, #00d4aa) border-box', border: '1px solid transparent' }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Vision */}
      <section
        id="ceo"
        className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#e9e9e9]"
      >
        <div className={CONTAINER_CLASS}>
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="max-w-[840px] mx-auto text-left">
              {/* Heading */}
              <header className="mb-6 text-left">
                <h2
                  className="text-[28px] sm:text-[32px] font-bold leading-tight tracking-tight font-display text-left"
                  style={{
                    color: "#345195",
                  }}
                >
                  CEO’s Vision
                </h2>
              </header>

              {/* Content */}
              <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-10 w-full">
                {/* Image: matching height of content */}
                <div className="relative w-full md:w-[260px] lg:w-[280px] shrink-0 self-stretch rounded-[16px] overflow-hidden min-h-[240px]">
                  <Image
                    src="/images/products/Sreeram-_Plain-Background-414437.png"
                    alt="Sreeram Jadapolu"
                    fill
                    className="object-cover object-top rounded-[16px]"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 text-left flex flex-col justify-between py-1">
                  <p className="text-[17px] sm:text-[19px] leading-[1.75] font-medium mb-6 text-[#6f6f6f]">
                    “With Claim Pioneer, our goal was to bring transparency and efficiency to a process
                    that has traditionally been slow and frustrating. By automating claim assignment,
                    enabling mobile-first field execution, and providing real-time updates to customers,
                    Claim Pioneer transforms claims management from a bottleneck into a competitive
                    advantage. This is how modern insurance operations scale — through speed, accuracy,
                    and trust.”
                  </p>

                  <div>
                    <h6
                      className="text-[17px] sm:text-[18px] font-bold mb-0.5 tracking-tight font-display"
                      style={{
                        color: "#345195",
                      }}
                    >
                      Sreeram Jadapolu,
                    </h6>

                    <p className="text-[15px] font-medium text-[#6f6f6f]">
                      Founder & CEO, Hyniva
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* End-to-End Claim Assessment Workflow */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 bg-white">
        <div className={CONTAINER_CLASS}>
          <header className="text-center mb-1">
            <h2
              className="text-[28px] sm:text-[32px] font-bold text-[#345196]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              End-to-End Claim Assessment Workflow
            </h2>
          </header>
          <div className="flex justify-center -mb-8 sm:-mb-12 lg:-mb-16">
            <Image
              src="/images/products/Artboard-1@2x-scaled-1440x900.png"
              alt="Workflow"
              width={1440}
              height={900}
              className="w-full h-auto shadow-none"
            />
          </div>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="bg-[#030B3B] py-[30px] sm:py-[40px] lg:py-[50px]">
        <div className={CONTAINER_CLASS}>
          {/* Heading */}
          <div className="text-center mb-8">
            <h2
              className="text-[28px] sm:text-[32px] font-bold text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Business Outcomes
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[10px] p-6 min-h-[230px] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl border border-white/10 cursor-pointer overflow-hidden"
              >
                {/* Icon */}
                <div className="mb-4">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={42}
                    height={42}
                    className="object-contain"
                  />
                </div>

                {/* Title */}
                <h6
                  className="text-[16px] font-bold mb-3 leading-[1.5] text-slate-900"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {item.title}
                </h6>

                {/* Description */}
                <p
                  className="text-[14px] leading-[1.8] text-slate-600"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transforming Every Step */}
      <section className="py-[30px] sm:py-[40px] lg:py-[50px] bg-[#f8f9fa]">
        <div className={`${CONTAINER_CLASS} text-center`}>
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2
              className="text-[28px] sm:text-[32px] font-bold text-[#345195] mb-[24px] leading-tight font-display tracking-tight"
            >
              Transforming Every Step of the Claims Journey
            </h2>
            <div className="max-w-[960px] mx-auto text-center">
              <p
                className="text-lg md:text-xl lg:text-2xl xl:text-[24px] font-normal text-gray-700 leading-relaxed m-0"
              >
                Claim Pioneer simplifies the complex world of claims by
                combining automation, mobility, intelligence, and transparency
                into one powerful platform. Whether you're managing everyday
                claims or responding to catastrophic events, the platform
                ensures faster outcomes, lower operational costs, and a
                dramatically better experience for everyone involved.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Faq items={claimPioneerFaqs} />

      <Footer />
    </div>
  );
}
