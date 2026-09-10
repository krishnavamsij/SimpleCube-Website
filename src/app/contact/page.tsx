"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { contactContent } from "@/content/contact";
import { motion } from "framer-motion";
import React from "react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Mail, Phone, Linkedin, Send, Check } from "lucide-react";
import { useState } from "react";
import { event } from "@/lib/gtag";

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/send-contact", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone || "",
                    organization: data.organization,
                    industry: data.industry,
                    message: data.message,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to send message");
            }

            event({
                action: 'submit',
                category: 'Contact',
                label: 'Contact Us Form'
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Form submission error", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-foreground">
            <Navbar />

            <main>
                {/* ── Hero Section ── */}
                <section className="relative overflow-hidden bg-[#F5F9FC]">
                    {/* Soft brand wash — same as homepage hero */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F5F9FC] to-[#E8F1F8]" />
                    <div className="absolute inset-y-0 right-0 w-[60%] bg-[radial-gradient(ellipse_at_70%_45%,rgba(19,84,152,0.12)_0%,rgba(56,134,206,0.06)_35%,transparent_70%)]" />
                    <div className="absolute bottom-0 left-0 w-[50%] h-[45%] bg-[radial-gradient(ellipse_at_20%_100%,rgba(19,84,152,0.04)_0%,transparent_60%)]" />

                    <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                        <div className="flex w-full flex-col justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:w-1/2 lg:pt-32 lg:pb-28 lg:pr-10">
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.h1
                                    variants={fadeInUp}
                                    className="mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 text-[2rem] font-black leading-[1.12] tracking-tight text-[#0A2F52] sm:text-[2.5rem] lg:text-[44px] xl:text-[52px] 2xl:text-[58px] font-display"
                                >
                                    <span className="whitespace-nowrap">{contactContent.hero.title}</span>
                                    <br />
                                    <span className="whitespace-nowrap text-[#135498]">{contactContent.hero.highlightedWord}</span>
                                </motion.h1>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── Content Section ── */}
                <section className="py-20 bg-white">
                    <div className="mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16">
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                            {/* Left Column: Details */}
                            <div className="w-full lg:w-[45%]">
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                >
                                    <motion.h2
                                        variants={fadeInUp}
                                        className="text-[12px] sm:text-[15px] lg:text-[16px] xl:text-[17px] font-[900] text-foreground tracking-tight leading-[1.2] mb-6 font-display"
                                        dangerouslySetInnerHTML={{ __html: contactContent.body.title }}
                                    />

                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-base text-slate-600 font-medium leading-relaxed mb-10"
                                    >
                                        {contactContent.body.description}
                                    </motion.p>

                                    {/* Contact Methods */}
                                    <motion.div variants={fadeInUp} className="space-y-6 mb-16">
                                        <div className="flex items-center gap-5 group cursor-pointer rounded-2xl hover:bg-slate-50 transition-all py-3">
                                            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-accent border border-[#3886CE]/10 flex items-center justify-center text-[#3886CE] group-hover:bg-[#3886CE] group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:scale-110">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">EMAIL</p>
                                                <a href={`mailto:${contactContent.body.contactInfo.email}`} className="text-[17px] font-medium text-foreground hover:text-[#3886CE] transition-colors block">
                                                    {contactContent.body.contactInfo.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5 group cursor-pointer rounded-2xl hover:bg-slate-50 transition-all py-3">
                                            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-accent border border-[#3886CE]/10 flex items-center justify-center text-[#3886CE] group-hover:bg-[#3886CE] group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:scale-110">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">PHONE</p>
                                                <a href={`tel:${(contactContent.body.contactInfo.phone || "").replace(/[^+0-9]/g, "")}`} className="text-[17px] font-medium text-foreground hover:text-[#3886CE] transition-colors block">
                                                    {contactContent.body.contactInfo.phone}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-5 group cursor-pointer rounded-2xl hover:bg-slate-50 transition-all py-3">
                                            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-accent border border-[#3886CE]/10 flex items-center justify-center text-[#3886CE] group-hover:bg-[#3886CE] group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:scale-110">
                                                <Linkedin className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">LINKEDIN</p>
                                                <a href={`https://${contactContent.body.contactInfo.linkedin}`} target="_blank" className="text-[17px] font-medium text-foreground hover:text-[#3886CE] transition-colors block">
                                                    {contactContent.body.contactInfo.linkedin}
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Address Cards */}
                                    <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-4 sm:gap-6 max-w-md">
                                        <div className="p-6 rounded-[28px] bg-accent border border-border flex flex-col hover:bg-[#e8f1fa] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default group">
                                            <div className="flex items-center gap-2.5 mb-4 h-[18px]">
                                                {/* eslint-disable-next-line @next/next/no-img-element -- external CDN flag SVG */}
                                                <img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/us.svg" alt="United States flag" className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm" />
                                                <h4 className="text-[11px] font-bold text-[#3886CE] uppercase tracking-widest leading-[18px]">{contactContent.body.offices.us.title}</h4>
                                            </div>
                                            <p
                                                className="text-[14px] font-medium text-foreground leading-[1.5]"
                                                dangerouslySetInnerHTML={{ __html: contactContent.body.offices.us.address }}
                                            />
                                        </div>

                                        {/* India address temporarily hidden from this build
                                        <div className="p-6 rounded-[28px] bg-accent border border-border flex flex-col hover:bg-[#e8f1fa] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default group">
                                            <div className="flex items-center gap-2.5 mb-4 h-[18px]">
                                                <img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/in.svg" alt="India flag" className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm" />
                                                <h4 className="text-[11px] font-bold text-[#3886CE] uppercase tracking-widest leading-[18px]">{contactContent.body.offices.india.title}</h4>
                                            </div>
                                            <p
                                                className="text-[14px] font-medium text-foreground leading-[1.5]"
                                                dangerouslySetInnerHTML={{ __html: contactContent.body.offices.india.address }}
                                            />
                                        </div>
                                        */}
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Right Column: Form Card */}
                            <div className="w-full lg:w-[55%]">
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                    className="p-5 sm:p-8 lg:p-10 rounded-[28px] sm:rounded-[40px] border border-border bg-white shadow-[0_30px_100px_rgba(0,0,0,0.06)] h-full flex flex-col"
                                >
                                    <div className="mb-6">
                                        <h3 className="text-2xl sm:text-3xl font-[900] text-foreground mb-3 font-display leading-[1.2]">
                                            {contactContent.form.title}
                                        </h3>
                                        <p className="text-[15px] font-medium text-slate-500 leading-relaxed">
                                            {isSubmitted ? "Your message has been sent successfully. We'll get back to you soon!" : "Fill in the form below and we'll get in touch with you — no obligations."}
                                        </p>
                                    </div>

                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center py-20 text-center flex-1"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-8 shadow-[0_10px_30px_rgba(34,197,94,0.2)]"
                                            >
                                                <Check className="w-12 h-12" />
                                            </motion.div>
                                            <h4 className="text-3xl font-[900] text-foreground mb-3 font-display">Message Sent Successfully!</h4>
                                            <p className="text-slate-500 mb-10 text-lg max-w-sm">Thank you for reaching out. Our team usually responds within 24 hours.</p>
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="px-8 py-3 rounded-xl border-2 border-[#135498] text-[#135498] font-bold hover:bg-[#135498] hover:text-white transition-all"
                                            >
                                                Send another message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form id="contact-form" onSubmit={handleSubmit} className="space-y-8 flex-1 flex flex-col">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Name *</label>
                                                    <input
                                                        required
                                                        name="name"
                                                        type="text"
                                                        placeholder="Jane Smith"
                                                        className="w-full px-6 py-4 bg-white border border-border rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium text-[15px] text-foreground transition-all placeholder:text-slate-300 shadow-sm"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Organization *</label>
                                                    <input required name="organization" type="text" placeholder="Your company or institution" className="w-full px-6 py-4 bg-white border border-border rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium text-[15px] text-foreground transition-all placeholder:text-slate-300 shadow-sm" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Email *</label>
                                                    <input required name="email" type="email" placeholder="jane@company.com" className="w-full px-6 py-4 bg-white border border-border rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium text-[15px] text-foreground transition-all placeholder:text-slate-300 shadow-sm" />
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Phone Number</label>
                                                    <input name="phone" type="tel" placeholder="+1 (000) 000-0000" className="w-full px-6 py-4 bg-white border border-border rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium text-[15px] text-foreground transition-all placeholder:text-slate-300 shadow-sm" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">Industry</label>
                                                <select name="industry" className="w-full px-6 py-4 bg-white border border-border rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium text-[15px] text-foreground transition-all appearance-none cursor-pointer shadow-sm">
                                                    <option value="">Select your industry</option>
                                                    <option>Banking</option>
                                                    <option>Wealth &amp; Asset Management</option>
                                                    <option>Insurance</option>
                                                    <option>Transportation &amp; Logistics</option>
                                                    <option>Education</option>
                                                    <option>Others</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest px-1">What do you need help with? *</label>
                                                <textarea required name="message" rows={4} placeholder="Tell us about your goals, challenges, or what you'd like to achieve..." className="w-full px-6 py-4 bg-white border border-border rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium text-[15px] text-foreground transition-all resize-none placeholder:text-slate-300 shadow-sm" />
                                            </div>

                                            <button
                                                disabled={isSubmitting}
                                                type="submit"
                                                className="w-full py-5 rounded-[22px] bg-gradient-to-r from-[#135498] to-[#0F427A] text-white font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(19,84,152,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                                            >
                                                {isSubmitting ? "Sending..." : contactContent.form.submitButton}
                                                {!isSubmitting && <Send className="w-5 h-5" />}
                                            </button>
                                        </form>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer hideCta />
        </div>
    );
}
