"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { contactContent } from "@/content/contact";
import { motion } from "framer-motion";
import React from "react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Mail, Phone, Linkedin, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-[#030B3B]">
            <Navbar />
            
            <main>
                {/* ── Hero Section (Dark Gradient) ── */}
                <section className="relative pt-48 pb-32 overflow-hidden bg-[#030b1e]">
                    {/* Background layers - Matching homepage aesthetics */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
                    <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    
                    <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
                                <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20">
                                    <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                                    CONTACT US
                                </span>
                            </motion.div>
                            
                            <motion.h1 
                                variants={fadeInUp}
                                className="text-4xl sm:text-5xl lg:text-[68px] font-[900] text-white tracking-tight leading-[1.08] mb-12 font-display"
                                dangerouslySetInnerHTML={{ __html: contactContent.hero.title }}
                            />
                            
                            <motion.p 
                                variants={fadeInUp}
                                className="mx-auto max-w-3xl text-lg sm:text-xl text-slate-300 font-medium leading-relaxed"
                            >
                                {contactContent.hero.description}
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Content Section (White Background) ── */}
                <section className="py-24 bg-white">
                    <div className="mx-auto max-w-[1400px] px-6">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                            
                            {/* Left Column: Details */}
                            <div className="w-full lg:w-[42%]">
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                >
                                    <motion.h2 
                                        variants={fadeInUp}
                                        className="text-3xl lg:text-[42px] font-[900] text-[#030B3B] tracking-tight leading-tight mb-8 font-display"
                                        dangerouslySetInnerHTML={{ __html: contactContent.body.title }}
                                    />
                                    
                                    <motion.p 
                                        variants={fadeInUp}
                                        className="text-lg text-slate-600 font-medium leading-relaxed mb-12"
                                    >
                                        {contactContent.body.description}
                                    </motion.p>

                                    {/* Contact Methods */}
                                    <motion.div variants={fadeInUp} className="space-y-6 mb-16">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-[#ECF6FF] border border-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">EMAIL</p>
                                                <a href={`mailto:${contactContent.body.contactInfo.email}`} className="text-[17px] font-bold text-[#030B3B] hover:text-[#3B82F6] transition-colors">
                                                    {contactContent.body.contactInfo.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-[#ECF6FF] border border-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">HR & CAREERS</p>
                                                <a href={`mailto:${contactContent.body.contactInfo.hr}`} className="text-[17px] font-bold text-[#030B3B] hover:text-[#3B82F6] transition-colors">
                                                    {contactContent.body.contactInfo.hr}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-[#ECF6FF] border border-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                                                <Linkedin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">LINKEDIN</p>
                                                <a href={`https://${contactContent.body.contactInfo.linkedin}`} target="_blank" className="text-[17px] font-bold text-[#030B3B] hover:text-[#3B82F6] transition-colors">
                                                    {contactContent.body.contactInfo.linkedin}
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Address Cards */}
                                    <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="p-8 rounded-[32px] bg-[#ECF6FF] border border-[#030B3B]/5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-2xl">🇺🇸</span>
                                                <h4 className="text-[11px] font-bold text-[#3B82F6] uppercase tracking-widest">{contactContent.body.offices.us.title}</h4>
                                            </div>
                                            <p className="text-[15px] font-bold text-[#030B3B] leading-relaxed">
                                                {contactContent.body.offices.us.address}
                                            </p>
                                        </div>

                                        <div className="p-8 rounded-[32px] bg-[#ECF6FF] border border-[#030B3B]/5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-2xl">🇮🇳</span>
                                                <h4 className="text((11px)] font-bold text-[#3B82F6] uppercase tracking-widest">{contactContent.body.offices.india.title}</h4>
                                            </div>
                                            <p className="text-[15px] font-bold text-[#030B3B] leading-relaxed">
                                                {contactContent.body.offices.india.address}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Right Column: Form Card */}
                            <div className="w-full lg:w-[58%]">
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                    className="p-10 lg:p-14 rounded-[40px] border border-[#030B3B]/5 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.06)]"
                                >
                                    <h3 className="text-3xl font-[900] text-[#030B3B] mb-10 font-display">
                                        {contactContent.form.title}
                                    </h3>
                                    
                                    <form className="space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="flex flex-col gap-2.5">
                                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Name *</label>
                                                <input type="text" placeholder="Jane Smith" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] outline-none font-bold text-[15px] text-[#030B3B] transition-all placeholder:text-slate-400 placeholder:font-medium" />
                                            </div>
                                            <div className="flex flex-col gap-2.5">
                                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Organization *</label>
                                                <input type="text" placeholder="Your company or institution" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] outline-none font-bold text-[15px] text-[#030B3B] transition-all placeholder:text-slate-400 placeholder:font-medium" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="flex flex-col gap-2.5">
                                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Email *</label>
                                                <input type="email" placeholder="jane@company.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] outline-none font-bold text-[15px] text-[#030B3B] transition-all placeholder:text-slate-400 placeholder:font-medium" />
                                            </div>
                                            <div className="flex flex-col gap-2.5">
                                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Phone Number</label>
                                                <input type="tel" placeholder="+1 (000) 000-0000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] outline-none font-bold text-[15px] text-[#030B3B] transition-all placeholder:text-slate-400 placeholder:font-medium" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Industry</label>
                                            <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] outline-none font-bold text-[15px] text-[#030B3B] transition-all appearance-none cursor-pointer">
                                                <option className="text-slate-400">Select your industry</option>
                                                <option>Financial Services</option>
                                                <option>Healthcare & Life Sciences</option>
                                                <option>Logistics, Transportation & Supply Chain</option>
                                                <option>Insurance</option>
                                                <option>Education</option>
                                                <option>Retail & Consumer Goods</option>
                                                <option>Manufacturing & Industrial</option>
                                                <option>Media & Telecommunications</option>
                                                <option>Energy & Utilities</option>
                                                <option>Real Estate & Construction</option>
                                                <option>Travel, Hospitality & Leisure</option>
                                                <option>Professional & Business Services</option>
                                                <option>Agriculture & Food Production</option>
                                                <option>Public Sector & Government</option>
                                                <option>Others</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">What do you need help with? *</label>
                                            <textarea rows={4} placeholder="Tell us about your goals, challenges, or what you'd like to achieve..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] outline-none font-bold text-[15px] text-[#030B3B] transition-all resize-none placeholder:text-slate-400 placeholder:font-medium" />
                                        </div>

                                        <button className="w-full py-5 rounded-[20px] bg-[#2563EB] text-white font-bold text-lg hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
                                            {contactContent.form.submitButton}
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
