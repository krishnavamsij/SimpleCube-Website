"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // For Next.js App Router

interface FormData {
  name: string;
  email: string;
  organization: string;
  role: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  organization?: string;
  role?: string;
}

interface CaseStudyPopupProps {
  onThirdSectionReached?: () => void;
}

/**
 * FIXED CaseStudyPopup Component
 * Properly resets state when navigating between case study pages
 */
export function CaseStudyPopup({ 
  onThirdSectionReached
}: CaseStudyPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    role: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  // Get current pathname to detect page changes
  const pathname = usePathname();

  // Reset state when navigating to a different page
  useEffect(() => {
    queueMicrotask(() => {
      setIsVisible(false);
      setHasBeenDismissed(false);
      setIsSubmitted(false);
      setIsSending(false);
      setSubmitError("");
      setFormData({
        name: '',
        email: '',
        organization: '',
        role: ''
      });
      setFormErrors({});
    });
  }, [pathname]);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  // Listen for third section trigger
  useEffect(() => {
    if (!mounted || hasBeenDismissed || isSubmitted) return;

    const handleThirdSectionReached = () => {
      setIsVisible(true);
      onThirdSectionReached?.();
    };

    const handleThirdTabClicked = () => {
      if (!hasBeenDismissed && !isSubmitted) {
        setIsVisible(true);
      }
    };

    // Add event listeners
    window.addEventListener('thirdSectionReached', handleThirdSectionReached as EventListener);
    window.addEventListener('thirdTabClicked', handleThirdTabClicked as EventListener);

    return () => {
      window.removeEventListener('thirdSectionReached', handleThirdSectionReached as EventListener);
      window.removeEventListener('thirdTabClicked', handleThirdTabClicked as EventListener);
    };
  }, [mounted, hasBeenDismissed, isSubmitted, onThirdSectionReached]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      errors.name = 'Name must be less than 50 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    } else if (formData.email.length > 100) {
      errors.email = 'Email must be less than 100 characters';
    }

    if (!formData.organization.trim()) {
      errors.organization = 'Organization is required';
    } else if (formData.organization.length < 2) {
      errors.organization = 'Organization must be at least 2 characters';
    } else if (formData.organization.length > 100) {
      errors.organization = 'Organization must be less than 100 characters';
    }

    if (formData.role.trim() && formData.role.length < 2) {
      errors.role = 'Role must be at least 2 characters';
    } else if (formData.role.length > 50) {
      errors.role = 'Role must be less than 50 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSending(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/send-casestudy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send enquiry.");
      }

      setIsSubmitted(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (error) {
      console.error("Form submission error", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99]"
            style={{ pointerEvents: 'none' }}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[calc(100%-2rem)] max-w-[480px] rounded-[16px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] bg-white overflow-hidden flex flex-col font-sans border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Section */}
            <div className="relative bg-gradient-to-br from-[#020c1c] via-[#071a32] to-[#050f20] px-5 pt-5 pb-4">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#3886CE33_1px,transparent_1px)] bg-[length:24px_24px]" />

              <div className="relative z-10">
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-4 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 mb-1">Thank you!</h4>
                    <p className="text-[12px] text-slate-500">We&apos;ll be in touch shortly.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-900">Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={handleInputChange}
                        maxLength={50}
                        className={`w-full px-3 py-2 rounded-[6px] border bg-slate-50 text-[12px] outline-none transition-all ${
                          formErrors.name
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-200 focus:border-[#3886CE] focus:ring-1 focus:ring-[#3886CE]'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-red-500 mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-900">Work Email *</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        maxLength={100}
                        className={`w-full px-3 py-2 rounded-[6px] border bg-slate-50 text-[12px] outline-none transition-all ${
                          formErrors.email
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-200 focus:border-[#3886CE] focus:ring-1 focus:ring-[#3886CE]'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-red-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-900">Organization *</label>
                      <input
                        name="organization"
                        type="text"
                        placeholder="Your company"
                        value={formData.organization}
                        onChange={handleInputChange}
                        maxLength={100}
                        className={`w-full px-3 py-2 rounded-[6px] border bg-slate-50 text-[12px] outline-none transition-all ${
                          formErrors.organization
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-200 focus:border-[#3886CE] focus:ring-1 focus:ring-[#3886CE]'
                        }`}
                      />
                      {formErrors.organization && (
                        <p className="text-[10px] text-red-500 mt-1">{formErrors.organization}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-900">Role</label>
                      <input
                        name="role"
                        type="text"
                        placeholder="e.g. CTO, VP Tech"
                        value={formData.role}
                        onChange={handleInputChange}
                        maxLength={50}
                        className={`w-full px-3 py-2 rounded-[6px] border bg-slate-50 text-[12px] outline-none transition-all ${
                          formErrors.role
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-200 focus:border-[#3886CE] focus:ring-1 focus:ring-[#3886CE]'
                        }`}
                      />
                      {formErrors.role && (
                        <p className="text-[10px] text-red-500 mt-1">{formErrors.role}</p>
                      )}
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-[11px] text-red-500 text-center">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-[#3886CE] text-white text-[14px] font-semibold py-3 rounded-[8px] hover:bg-[#1e7edd] transition-colors duration-200"
                  >
                    {isSending ? "Sending..." : "Get Started"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
