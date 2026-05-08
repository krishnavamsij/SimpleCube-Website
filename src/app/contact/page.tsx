"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { contactContent } from "@/content/contact";
import { motion } from "framer-motion";
import React from "react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Mail, Phone, Linkedin, MapPin, Send, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to form on page load
    useEffect(() => {
        const timer = setTimeout(() => {
            const formSection = document.getElementById('contact-form');
            if (formSection) {
                // Calculate offset to account for fixed navbar
                const navbarHeight = 80; // Approximate navbar height
                const elementPosition = formSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Auto-focus the name input after scrolling
                setTimeout(() => {
                    if (nameInputRef.current) {
                        nameInputRef.current.focus();
                    }
                }, 800); // Wait for smooth scroll to complete
            }
        }, 2500); // Set delay to 2.5 seconds per user request

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            await fetch("https://formsubmit.co/ajax/d060496e42eb4e0c8ea1f70e4b9e4ff5", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Corporate Inquiry: ${data.name} via Hyniva Contact`,
                    "Inquiry Overview": "This user is interested to know more about Hyniva",
                    "Contact Name": data.name,
                    "Organization": data.organization,
                    "Email Address": data.email,
                    "Phone": data.phone || "Not Provided",
                    "Industry": data.industry,
                    "Message": data.message,
                    "_template": "table"
                })
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Form submission error", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#030B3B]">
            <Navbar />
            
            <main>
                {/* ── Hero Section (Dark Gradient with Animated Blobs) ── */}
                <section className="relative pt-28 pb-24 overflow-hidden bg-[#030b1e]">
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
                    
                    {/* Animated Blobs for Depth and Modernity */}
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-blob" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] animate-blob animation-delay-4000" />

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
                                    GET IN TOUCH
                                </span>
                            </motion.div>
                            
                            <motion.h1 
                                variants={fadeInUp}
                                className="text-5xl sm:text-6xl lg:text-[80px] font-[900] text-white tracking-tight leading-[1.05] mb-10 font-display"
                                dangerouslySetInnerHTML={{ __html: contactContent.hero.title }}
                            />
                            
                            <motion.p 
                                variants={fadeInUp}
                                className="mx-auto max-w-3xl text-xl sm:text-2xl text-slate-300 font-medium leading-relaxed mb-0"
                            >
                                {contactContent.hero.description}
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Content Section (White Background) ── */}
                <section className="pt-20 pb-32 bg-white relative">
                    <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
                        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
                            
                            {/* Left Column: Details */}
                            <div className="w-full lg:w-[50%] lg:sticky lg:top-32">
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                >
                                    <motion.h2 
                                        variants={fadeInUp}
                                        className="text-4xl lg:text-[54px] font-[900] text-[#030B3B] tracking-tight leading-tight mb-10 font-display"
                                        dangerouslySetInnerHTML={{ __html: contactContent.body.title }}
                                    />
                                    
                                    <motion.p 
                                        variants={fadeInUp}
                                        className="text-xl text-slate-600 font-medium leading-relaxed mb-16 max-w-xl"
                                    >
                                        {contactContent.body.description}
                                    </motion.p>

                                    {/* Contact Methods */}
                                    <motion.div variants={fadeInUp} className="space-y-8 mb-20">
                                        {[
                                            { icon: Mail, label: "EMAIL", value: contactContent.body.contactInfo.email, href: `mailto:${contactContent.body.contactInfo.email}` },
                                            { icon: Phone, label: "HR & CAREERS", value: contactContent.body.contactInfo.hr, href: `mailto:${contactContent.body.contactInfo.hr}` },
                                            { icon: Linkedin, label: "LINKEDIN", value: contactContent.body.contactInfo.linkedin, href: `https://${contactContent.body.contactInfo.linkedin}` }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-6 group">
                                                <div className="w-14 h-14 rounded-2xl bg-[#F0F7FF] border border-blue-100 flex items-center justify-center text-[#3B82F6] transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                                                    <item.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                                    <a href={item.href} target={idx === 2 ? "_blank" : undefined} className="text-lg font-bold text-[#030B3B] hover:text-[#3B82F6] transition-colors decoration-2 underline-offset-4 hover:underline">
                                                        {item.value}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>

                                    {/* Address Cards */}
                                    <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="p-10 rounded-[40px] bg-[#F8FBFF] border border-blue-50 hover:border-blue-200 transition-all duration-300 group">
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="text-3xl group-hover:scale-125 transition-transform">🇺🇸</span>
                                                <h4 className="text-xs font-bold text-[#3B82F6] uppercase tracking-[0.2em]">{contactContent.body.offices.us.title}</h4>
                                            </div>
                                            <p 
                                                className="text-[17px] font-semibold text-[#030B3B] leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: contactContent.body.offices.us.address }}
                                            />
                                        </div>

                                        <div className="p-10 rounded-[40px] bg-[#F8FBFF] border border-blue-50 hover:border-blue-200 transition-all duration-300 group">
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="text-3xl group-hover:scale-125 transition-transform">🇮🇳</span>
                                                <h4 className="text-xs font-bold text-[#3B82F6] uppercase tracking-[0.2em]">{contactContent.body.offices.india.title}</h4>
                                            </div>
                                            <p 
                                                className="text-[17px] font-semibold text-[#030B3B] leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: contactContent.body.offices.india.address }}
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Right Column: Form Card (Premium Design) */}
                            <div className="w-full lg:w-[50%]">
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                    className="p-10 lg:p-16 rounded-[48px] border border-slate-100 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.08)] h-full flex flex-col relative overflow-hidden"
                                >
                                    {/* Subtle decorative elements inside form card */}
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
                                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50" />

                                    <div className="relative z-10">
                                        <div className="mb-14">
                                            <h3 className="text-4xl font-[900] text-[#030B3B] mb-5 font-display leading-tight">
                                                {contactContent.form.title}
                                            </h3>
                                            <p className="text-lg font-medium text-slate-500 leading-relaxed">
                                                {isSubmitted ? "Your message has been sent successfully. We'll get back to you soon!" : "Fill in the form below and our team will get in touch with you within 24 hours."}
                                            </p>
                                        </div>
                                        
                                        {isSubmitted ? (
                                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                                <motion.div 
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-8"
                                                >
                                                    <Check className="w-12 h-12" />
                                                </motion.div>
                                                <h4 className="text-3xl font-bold text-[#030B3B] mb-4">Message Sent!</h4>
                                                <p className="text-lg text-slate-500 mb-12">Thank you for reaching out. We've received your inquiry and will be in touch shortly.</p>
                                                <button 
                                                    onClick={() => setIsSubmitted(false)}
                                                    className="px-8 py-4 rounded-2xl bg-[#030B3B] text-white font-bold hover:bg-blue-600 transition-all"
                                                >
                                                    Send another message
                                                </button>
                                            </div>
                                        ) : (
                                            <form id="contact-form" onSubmit={handleSubmit} className="space-y-10 flex-1 flex flex-col">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                                    <div className="flex flex-col gap-4">
                                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Name *</label>
                                                        <input 
                                                            ref={nameInputRef}
                                                            required 
                                                            name="name" 
                                                            type="text" 
                                                            placeholder="Jane Smith" 
                                                            className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-lg text-[#030B3B] transition-all placeholder:text-slate-300 placeholder:font-medium" 
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Organization *</label>
                                                        <input required name="organization" type="text" placeholder="Company Name" className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-lg text-[#030B3B] transition-all placeholder:text-slate-300 placeholder:font-medium" />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                                    <div className="flex flex-col gap-4">
                                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Email *</label>
                                                        <input required name="email" type="email" placeholder="jane@company.com" className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-lg text-[#030B3B] transition-all placeholder:text-slate-300 placeholder:font-medium" />
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Phone Number</label>
                                                        <input name="phone" type="tel" placeholder="+1 (000) 000-0000" className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-lg text-[#030B3B] transition-all placeholder:text-slate-300 placeholder:font-medium" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Industry</label>
                                                    <div className="relative">
                                                        <select name="industry" className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-lg text-[#030B3B] transition-all appearance-none cursor-pointer">
                                                            <option value="">Select your industry</option>
                                                            <option>Banking</option>
                                                            <option>Wealth & Asset Management</option>
                                                            <option>Insurance</option>
                                                            <option>Transportation & Logistics</option>
                                                            <option>Education</option>
                                                            <option>Others</option>
                                                        </select>
                                                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-1">What do you need help with? *</label>
                                                    <textarea required name="message" rows={5} placeholder="Tell us about your goals..." className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none font-bold text-lg text-[#030B3B] transition-all resize-none placeholder:text-slate-300 placeholder:font-medium" />
                                                </div>

                                                <button 
                                                    disabled={isSubmitting}
                                                    type="submit" 
                                                    className="w-full py-6 rounded-[24px] bg-[#2563EB] text-white font-[900] text-xl hover:bg-[#1D4ED8] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(37,99,235,0.25)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                                >
                                                    {isSubmitting ? "Sending Inquiry..." : contactContent.form.submitButton}
                                                    {!isSubmitting && <Send className="w-6 h-6" />}
                                                </button>
                                            </form>
                                        )}
                                    </div>
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
