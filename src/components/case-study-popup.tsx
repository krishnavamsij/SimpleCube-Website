"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function CaseStudyPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (hasBeenDismissed || isSubmitted) return;

            const scrollPosition = window.scrollY;
            const heroHeight = window.innerHeight; // Hero banner is ~100vh
            const docHeight = document.body.scrollHeight;
            
            // Calculate how far we've scrolled past the hero banner
            const scrolledPastHero = scrollPosition - heroHeight;
            const contentHeightAfterHero = docHeight - heroHeight - window.innerHeight;

            // Only calculate if we're past the hero section
            if (scrolledPastHero > 0 && contentHeightAfterHero > 0) {
                const scrollPercent = scrolledPastHero / contentHeightAfterHero;
                if (scrollPercent >= 0.25 && !isVisible) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasBeenDismissed, isSubmitted, isVisible]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        try {
            // Send to FormSubmit service silently
            await fetch("https://formsubmit.co/ajax/d060496e42eb4e0c8ea1f70e4b9e4ff5", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Lead: ${formData.get("name")} is interested in Hyniva Insights`,
                    "Inquiry Details": "A visitor has expressed interest in learning more about Hyniva after reading a case study.",
                    "Prospect Name": formData.get("name"),
                    "Company": formData.get("organization"),
                    "Position": formData.get("role"),
                    "Contact Email": formData.get("email"),
                    "_template": "table"
                })
            });
        } catch (error) {
            console.error("Form submission error", error);
        }

        setIsSubmitted(true);
        setTimeout(() => setIsVisible(false), 3000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 0, x: "-50%", translateY: "-50%" }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: "-50%", translateY: "-50%" }}
                    exit={{ opacity: 0, scale: 0.95, y: 0, x: "-50%", translateY: "-50%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed top-1/2 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-[480px] rounded-[16px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] bg-white overflow-hidden flex flex-col font-sans border border-slate-200"
                >
                    {/* Top Section */}
                    <div className="relative bg-gradient-to-br from-[#020c1c] via-[#071a32] to-[#050f20] px-5 pt-5 pb-4">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#1e90ff33_1px,transparent_1px)] bg-[length:24px_24px]" />
                        
                        <button 
                            onClick={() => {
                                setIsVisible(false);
                                setHasBeenDismissed(true);
                            }}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
                        >
                            <X size={14} />
                        </button>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded-full bg-[#1e90ff]/20 flex items-center justify-center text-[#63c2ff]">
                                    <Sparkles size={12} />
                                </div>
                                <span className="text-[10px] font-bold text-[#63c2ff] uppercase tracking-widest">Enjoying this content?</span>
                            </div>
                            <h3 className="text-[22px] font-black text-white leading-[1.15] mb-1.5">
                                Want to learn more?
                            </h3>
                            <p className="text-[12px] text-[#bcd6f5] font-light leading-relaxed">
                                Get insights tailored to your business needs.
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-5 bg-white">
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-4 text-center space-y-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Check size={16} />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold text-slate-900 mb-1">Thank you!</h4>
                                    <p className="text-[12px] text-slate-500">We'll be in touch shortly.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-2.5">
                                <div className="grid grid-cols-2 gap-2.5">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-semibold text-slate-900">Full Name *</label>
                                        <input required name="name" type="text" placeholder="Jane Smith" className="w-full px-3 py-2 rounded-[6px] border border-slate-200 bg-slate-50 text-[12px] outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-semibold text-slate-900">Work Email *</label>
                                        <input required name="email" type="email" placeholder="jane@company.com" className="w-full px-3 py-2 rounded-[6px] border border-slate-200 bg-slate-50 text-[12px] outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-semibold text-slate-900">Organization *</label>
                                        <input required name="organization" type="text" placeholder="Your company" className="w-full px-3 py-2 rounded-[6px] border border-slate-200 bg-slate-50 text-[12px] outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-semibold text-slate-900">Role</label>
                                        <input name="role" type="text" placeholder="e.g. CTO, VP Tech" className="w-full px-3 py-2 rounded-[6px] border border-slate-200 bg-slate-50 text-[12px] outline-none focus:border-[#1e90ff] focus:ring-1 focus:ring-[#1e90ff] transition-all" />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-2 rounded-[6px] bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[13px] font-medium transition-colors">
                                    Get in Touch →
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
