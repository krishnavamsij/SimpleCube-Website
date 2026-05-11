"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Briefcase, X, Upload, Star, Shield, Users, Phone, MapPin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface JobPosition {
  id: string;
  title: string;
  location: string;
  jobDuties: string[];
  qualifications: {
    degree: string;
    experience: string;
    immediateJoinee?: boolean;
  };
  skillsRequired: string[];
  region?: string;
  howToApply?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  relevantExp: string;
  currentCompany: string;
  currentRole: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  workMode: string;
  skills: string;
  linkedIn: string;
  portfolio: string;
  coverNote: string;
}

// Country codes and location data
const countryCodes = [
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
];

const cities = [
  // India
  'Bangalore, Karnataka, India',
  'Mumbai, Maharashtra, India',
  'Delhi, Delhi, India',
  'Hyderabad, Telangana, India',
  'Chennai, Tamil Nadu, India',
  'Pune, Maharashtra, India',
  'Kolkata, West Bengal, India',
  'Ahmedabad, Gujarat, India',
  'Jaipur, Rajasthan, India',
  'Lucknow, Uttar Pradesh, India',
  // United States
  'New York, New York, USA',
  'San Francisco, California, USA',
  'Los Angeles, California, USA',
  'Seattle, Washington, USA',
  'Boston, Massachusetts, USA',
  'Austin, Texas, USA',
  'Chicago, Illinois, USA',
  'Denver, Colorado, USA',
  'Miami, Florida, USA',
  'Washington, DC, USA',
  // United Kingdom
  'London, England, UK',
  'Manchester, England, UK',
  'Birmingham, England, UK',
  'Edinburgh, Scotland, UK',
  'Glasgow, Scotland, UK',
  // Canada
  'Toronto, Ontario, Canada',
  'Vancouver, British Columbia, Canada',
  'Montreal, Quebec, Canada',
  'Calgary, Alberta, Canada',
  'Ottawa, Ontario, Canada',
  // Australia
  'Sydney, New South Wales, Australia',
  'Melbourne, Victoria, Australia',
  'Brisbane, Queensland, Australia',
  'Perth, Western Australia, Australia',
  'Adelaide, South Australia, Australia',
  // Singapore
  'Singapore, Singapore',
  // UAE
  'Dubai, UAE',
  'Abu Dhabi, UAE',
  'Sharjah, UAE',
];

const jobOpenings: JobPosition[] = [
  {
    id: "engagement-manager",
    title: "Engagement Manager / Business Development Manager",
    location: "Washington, DC / Tysons Corner, VA (Onsite)",
    jobDuties: [
      "Serve as the primary point of contact for key accounts, managing ongoing engagements and identifying upsell and cross-sell opportunities",
      "Manage end-to-end client engagement lifecycle — project kickoff, resource alignment, milestone tracking, risk mitigation, and post-deployment support",
      "Develop a deep understanding of client needs and continuously propose tailored solutions to solve business challenges",
      "Monitor and report on project health, financials, and client satisfaction metrics",
      "Contribute to expanding the client base by identifying new opportunities, qualifying leads, and collaborating with delivery and leadership teams to close deals",
    ],
    qualifications: {
      degree: "Not specified",
      experience: "Mid-Senior level",
    },
    skillsRequired: [
      "Mid-Senior level experience in IT services, consulting, or financial services",
      "Proven track record in client relationship management and business development",
      "Strong communication skills and executive presence",
      "Experience in BFSI or Public Sector verticals preferred",
    ],
    region: "us",
  },
  {
    id: "it-sales-executive",
    title: "IT Sales Executive / Sales Lead – Banking & Financial Services",
    location: "USA (Remote or Onsite)",
    jobDuties: [
      "Develop and execute aggressive sales strategies to drive new business acquisition and revenue growth in the Financial Services vertical",
      "Build and maintain C-suite relationships with key clients",
      "Lead end-to-end sales efforts from prospecting to closure",
      "Collaborate with internal stakeholders to deliver solutions that address client needs",
      "Drive revenue growth through strategic account management and new logo acquisition",
    ],
    qualifications: {
      degree: "Not specified",
      experience: "Mid-Senior level",
    },
    skillsRequired: [
      "Proven track record in IT services sales, especially within BFSI vertical",
      "Deep client relationships at CXO, SVP, and VP levels",
      "Strong understanding of technology solutions and consulting services",
      "Excellent communication, negotiation, and presentation skills",
    ],
    region: "us",
  },
  {
    id: "software-developer-12139",
    title: "Software Developer — JOB ID: 12139",
    location: "San Antonio, TX (Travel may be required)",
    jobDuties: [
      "Design, develop, test, and maintain software applications using PHP and Microservices utilizing technologies like REST APIs, Kibana, Jira, and Git",
      "Participate in all phases of the Software Development Life Cycle (SDLC)",
      "Create and update technical documentation — flowcharts, diagrams, and code comments",
      "Ensure software components are reliable and perform as expected; identify and address issues",
      "Adhere to data handling and security guidelines to protect confidential information",
      "Work in a tight-knit engineering team to integrate software components and meet project goals",
    ],
    qualifications: {
      degree: "Bachelor's degree in CS, Engineering, IT or related field",
      experience: "At least 60 months (5 years)",
    },
    skillsRequired: [
      "Proficiency in PHP, Microservices, REST APIs",
      "Experience with Kibana, Jira, Git",
    ],
    region: "us",
  },
  {
    id: "mendix-lead-developer",
    title: "Mendix Lead Developer",
    location: "Bengaluru, India",
    jobDuties: [
      "Lead a team of developers and engineers to build, customize, and deploy applications on the Mendix low-code platform",
      "Collaborate with stakeholders to gather requirements and translate them into technical solutions",
      "Oversee the architecture and design of Mendix applications ensuring scalability, performance, and maintainability",
      "Provide hands-on development support, code reviews, and mentor junior developers",
      "Identify and resolve complex technical issues and optimize Mendix applications for maximum efficiency",
      "Stay up to date with the latest Mendix features, updates, and best practices",
    ],
    qualifications: {
      degree: "Not specified",
      experience: "Mid-Senior level",
    },
    skillsRequired: [
      "Proven experience with Mendix platform development",
      "Strong leadership and team management skills",
      "Experience designing scalable, maintainable low-code architectures",
      "Excellent communication and stakeholder management skills",
    ],
    region: "india",
  },
  {
    id: "reactjs-nodejs-fresher",
    title: "ReactJS / NodeJS Developer — Fresher",
    location: "Bengaluru, India",
    jobDuties: [],
    qualifications: {
      degree: "Masters in Computer Applications or Bachelor's Degree in Computer Science Engineering",
      experience: "Entry Level",
    },
    skillsRequired: [
      "Knowledge of ReactJS and/or NodeJS fundamentals",
      "Excellent communication skills and a good team player",
      "Eagerness to learn and grow in a collaborative environment",
    ],
    region: "india",
    howToApply: "Send your resume to hr@hyniva.com with the subject line: \"ReactJS / NodeJS Fresher\"",
  },
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[1]); // Default to India
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    relevantExp: "",
    currentCompany: "",
    currentRole: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    workMode: "",
    skills: "",
    linkedIn: "",
    portfolio: "",
    coverNote: "",
  });

  const toggleJob = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const openModal = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setModalOpen(true);
    setFormSubmitted(false);
    document.body.style.overflow = "hidden";
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      experience: "",
      relevantExp: "",
      currentCompany: "",
      currentRole: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      workMode: "",
      skills: "",
      linkedIn: "",
      portfolio: "",
      coverNote: "",
    });
    setErrors({});
    setResumeFile(null);
    setResumeFileName("");
    setFormSubmitted(false);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
    resetForm();
  };

  useEffect(() => {
    // Reset form on component mount and page refresh
    resetForm();

    const handleBeforeUnload = () => {
      resetForm();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      resetForm();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // Proactively block alphabets for CTC fields
    if (name === 'currentCTC' || name === 'expectedCTC') {
      // Allow only numbers, commas, periods, and currency symbols
      value = value.replace(/[^0-9,.$]/g, '');
    }

    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case 'firstName':
        if (!value.trim()) error = "First name is required";
        break;
      case 'lastName':
        if (!value.trim()) error = "Last name is required";
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Please enter a valid email address";
        break;
      case 'phone':
        if (!value.trim()) error = "Phone number is required";
        else {
          const phoneDigits = value.replace(/\D/g, '');
          if (selectedCountry.code === "+91") {
            if (phoneDigits.length !== 10) error = "Indian mobile numbers must be 10 digits";
            else if (value.startsWith('0')) error = "Please enter 10 digits without leading zero";
          } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
            error = "Please enter a valid phone number";
          }
        }
        break;
      case 'location':
        if (!value.trim()) error = "Location is required";
        break;
      case 'experience':
        if (!value) error = "Please select total experience";
        break;
      case 'relevantExp':
        if (!value) error = "Please select relevant experience";
        break;
      case 'currentCTC':
        if (!value.trim()) error = "Current CTC is required";
        else if (!/\d/.test(value)) error = "Please enter a valid amount (e.g. 12,00,000)";
        break;
      case 'expectedCTC':
        if (!value.trim()) error = "Expected CTC is required";
        else if (!/\d/.test(value)) error = "Please enter a valid amount (e.g. 18,00,000)";
        break;
      case 'noticePeriod':
        if (!value) error = "Please select your notice period";
        break;
      case 'skills':
        if (!value.trim()) error = "Please mention your key skills";
        break;
      case 'linkedIn':
        if (value.trim() && !value.toLowerCase().includes('linkedin.com')) {
          error = "Please enter a valid LinkedIn profile URL";
        }
        break;
      case 'portfolio':
        if (value.trim() && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(value)) {
          error = "Please enter a valid portfolio or GitHub URL";
        }
        break;
      case 'coverNote':
        if (!value.trim()) error = "Please tell us why you want to join Hyniva";
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Only validate essential fields
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.experience) newErrors.experience = "Please select total experience";
    if (!formData.relevantExp) newErrors.relevantExp = "Please select relevant experience";
    if (!formData.currentCTC.trim()) newErrors.currentCTC = "Current CTC is required";
    if (!formData.expectedCTC.trim()) newErrors.expectedCTC = "Expected CTC is optional";
    if (!formData.noticePeriod) newErrors.noticePeriod = "Please select your notice period";
    if (!formData.skills.trim()) newErrors.skills = "Please mention your key skills";
    if (!formData.coverNote.trim()) newErrors.coverNote = "Please tell us why you want to join Hyniva";
    if (!resumeFile) newErrors.resume = "Please upload your resume";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (selectedCountry.code === "+91") {
        if (phoneDigits.length !== 10) {
          newErrors.phone = "Indian mobile numbers must be 10 digits";
        } else if (formData.phone.startsWith('0')) {
          newErrors.phone = "Please enter 10 digits without leading zero";
        }
      } else {
        if (phoneDigits.length < 7 || phoneDigits.length > 15) {
          newErrors.phone = "Please enter a valid phone number";
        }
      }
    }

    // Experience validation simplified
    if (formData.experience && formData.relevantExp) {
      const expOrder = ["Fresher (0 years)", "Less than 1 year", "1 – 2 years", "3 – 5 years", "6 – 8 years", "9 – 12 years", "12+ years"];
      const totalExpIndex = expOrder.indexOf(formData.experience);
      const relevantExpIndex = expOrder.indexOf(formData.relevantExp);

      if (totalExpIndex !== -1 && relevantExpIndex !== -1 && relevantExpIndex > totalExpIndex) {
        newErrors.relevantExp = "Relevant experience cannot be more than total experience";
      }
    }

    // URL validations
    if (formData.linkedIn && !formData.linkedIn.toLowerCase().includes('linkedin.com')) {
      newErrors.linkedIn = "Please enter a valid LinkedIn profile URL";
    }
    if (formData.portfolio && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(formData.portfolio)) {
      newErrors.portfolio = "Please enter a valid portfolio or GitHub URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, location: value });

    // Clear error for this field when user starts typing
    if (errors.location) {
      setErrors({ ...errors, location: "" });
    }

    // Filter location suggestions
    if (value.length > 2) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    setFormData({ ...formData, location });
    setShowLocationSuggestions(false);
    setLocationSuggestions([]);
  };

  const handleCountrySelect = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();
    console.log('Form validation result:', isValid);
    console.log('Form errors:', errors);

    if (!isValid) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create form dynamically
      const form = document.createElement("form");
      form.action = "https://formsubmit.co/hr@hyniva.com";
      form.method = "POST";
      form.enctype = "multipart/form-data";

      // Use hidden iframe to prevent redirect
      const iframeName = "formSubmitFrame_" + Date.now();
      const iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      form.target = iframeName;

      // 2. Add hidden fields helper
      const addField = (name: string, value: string) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      // Professional Email Configuration
      addField("_subject", `[Hyniva Careers] New Application: ${selectedJob} - ${formData.firstName} ${formData.lastName}`);
      addField("_captcha", "false");
      addField("_template", "table");
      addField("_replyto", formData.email);
      addField("_honey", ""); // Spam protection

      // Formal Applicant Data
      addField("APPLICANT FULL NAME", `${formData.firstName} ${formData.lastName}`);
      addField("TARGET POSITION", selectedJob);
      addField("CONTACT EMAIL", formData.email);
      addField("CONTACT PHONE", `${selectedCountry.code} ${formData.phone}`);
      addField("CURRENT LOCATION", formData.location);
      addField("TOTAL EXPERIENCE", formData.experience);
      addField("RELEVANT EXPERIENCE", formData.relevantExp);
      addField("CURRENT COMPANY", formData.currentCompany || 'N/A');
      addField("CURRENT DESIGNATION", formData.currentRole || 'N/A');
      addField("CURRENT ANNUAL CTC", formData.currentCTC);
      addField("EXPECTED ANNUAL CTC", formData.expectedCTC);
      addField("NOTICE PERIOD", formData.noticePeriod);
      addField("PREFERRED WORK MODE", formData.workMode || 'N/A');
      addField("KEY SKILLS", formData.skills);
      addField("LINKEDIN PROFILE", formData.linkedIn || 'N/A');
      addField("PORTFOLIO / GITHUB", formData.portfolio || 'N/A');
      addField("COVER NOTE / MESSAGE", formData.coverNote);

      // 3. Attach Resume
      if (resumeFile) {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.name = "attachment";
        fileInput.style.display = "none";

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(resumeFile);
        fileInput.files = dataTransfer.files;

        form.appendChild(fileInput);
      }

      // 4. Submit
      document.body.appendChild(form);
      form.submit();

      // Listen for completion
      iframe.onload = () => {
        setTimeout(() => {
          setFormSubmitted(true);
          setIsSubmitting(false);
          if (document.body.contains(form)) document.body.removeChild(form);
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
        }, 1000);
      };

      // Fallback timeout
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          setFormSubmitted(true);
          setIsSubmitting(false);
          if (document.body.contains(form)) document.body.removeChild(form);
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
        }
      }, 5000);

    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-[#0a0f1e] overflow-hidden pt-32 pb-32 px-6 flex items-center justify-center">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-[#1e90ff] rounded-full blur-[90px]" />
            <div className="absolute bottom-0 right-[-80px] w-[400px] h-[400px] bg-[#1e90ff] rounded-full blur-[90px]" />
          </div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle, rgba(30,111,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 backdrop-blur-md">
                <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                Careers
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[900] leading-[1.1] tracking-tight text-white mb-6 font-display">
              Join the meet where<br /><span className="text-[#00D4AA]">Talent meets Purpose</span>
            </h1>

            <p className="text-base leading-relaxed text-slate-300 sm:text-lg font-normal max-w-3xl mx-auto mb-14">
              Be part of a team that solves complex problems, builds intelligent systems and drives real transformation across industries.
            </p>

            {/* Premium Pillars */}
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { icon: Star, label: "Great Place to Work® Certified" },
                { icon: Shield, label: "Innovation-Driven Work" },
                { icon: Users, label: "People-First Culture" }
              ].map((pill, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300">
                  <pill.icon className="w-5 h-5 text-[#1e90ff]" />
                  {pill.label}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
            <span className="text-[10px] font-medium text-white tracking-[0.3em] uppercase">SCROLL</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-5 sm:px-8 max-w-5xl">

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-sm text-gray-500 font-medium">Filter:</span>
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${filter === "all"
                    ? "border-[#1e6fff] text-[#1e6fff] bg-[rgba(30,111,255,0.06)]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
              >
                All Openings
              </button>
              <button
                onClick={() => setFilter("us")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${filter === "us"
                    ? "border-[#1e6fff] text-[#1e6fff] bg-[rgba(30,111,255,0.06)]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
              >
                United States
              </button>
              <button
                onClick={() => setFilter("india")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${filter === "india"
                    ? "border-[#1e6fff] text-[#1e6fff] bg-[rgba(30,111,255,0.06)]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
              >
                India
              </button>
              <button
                onClick={() => setFilter("remote")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${filter === "remote"
                    ? "border-[#1e6fff] text-[#1e6fff] bg-[rgba(30,111,255,0.06)]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
              >
                Remote
              </button>
            </div>

            {/* Section Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a0f1e] mb-6">
              Current Openings
            </h2>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobOpenings
                .filter((job) => {
                  if (filter === "all") return true;
                  if (filter === "us") return job.region === "us";
                  if (filter === "india") return job.region === "india";
                  if (filter === "remote") return job.location.toLowerCase().includes("remote");
                  return true;
                })
                .map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg"
                  >
                    {/* Job Header */}
                    <button
                      onClick={() => toggleJob(job.id)}
                      className="w-full px-4 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-4 bg-white hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex-1 text-left">
                        <h3 className="text-lg sm:text-xl font-semibold text-[#0a0f1e] mb-3 group-hover:text-[#1e6fff] transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1e6fff]/[0.05] text-[#1e6fff]">
                            <Briefcase className="w-3 h-3" />
                            Full-Time
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-50 text-gray-500">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${expandedJob === job.id ? 'bg-[#1e6fff] text-white shadow-lg shadow-[#1e6fff]/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-500 ${expandedJob === job.id ? 'rotate-180' : ''
                            }`}
                        />
                      </div>
                    </button>

                    {/* Job Details - Expandable */}
                    {expandedJob === job.id && (
                      <div className="bg-white px-4 sm:px-8 py-6 sm:py-8 border-t border-gray-200">
                        <div className="space-y-6">
                          {/* About the Role */}
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-blue-600">
                              About the Role
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              We are looking for talented professionals to join our team. This role offers excellent growth opportunities and the chance to work on exciting projects.
                            </p>
                          </div>

                          {/* Key Responsibilities */}
                          {job.jobDuties.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-blue-600">
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-3">
                                {job.jobDuties.map((duty, idx) => (
                                  <li key={idx} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-none"></span>
                                    <span>{duty}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Requirements */}
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-blue-600">
                              Requirements
                            </h4>
                            <ul className="space-y-4">
                              <li className="flex gap-4 text-sm text-slate-700 items-baseline">
                                <span className="flex-shrink-0 font-bold text-[#1e6fff] w-28 uppercase tracking-wide text-[10px]">Qualification</span>
                                <span className="font-medium text-slate-900">{job.qualifications.degree}</span>
                              </li>
                              <li className="flex gap-4 text-sm text-slate-700 items-baseline">
                                <span className="flex-shrink-0 font-bold text-[#1e6fff] w-28 uppercase tracking-wide text-[10px]">Experience</span>
                                <span className="font-medium text-slate-900">{job.qualifications.experience}</span>
                              </li>
                              {job.qualifications.immediateJoinee && (
                                <li className="pt-2">
                                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Immediate Hiring
                                  </span>
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* Skills Required */}
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-blue-600">
                              Required Skills
                            </h4>
                            <ul className="space-y-2.5">
                              {job.skillsRequired.map((skill, idx) => (
                                <li key={idx} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-none"></span>
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-8 mt-4 border-t border-slate-100">
                            <button
                              onClick={() => openModal(job.title)}
                              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#1e6fff] text-white font-bold rounded-xl hover:bg-[#1a5fe0] transition-all duration-300 shadow-lg shadow-[#1e6fff]/20 hover:shadow-[#1e6fff]/30 hover:-translate-y-0.5"
                            >
                              Apply for this Position
                              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Open Application Section */}
            <div className="mt-16 bg-[#0a0f1e] rounded-2xl p-6 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `
                  linear-gradient(rgba(30,111,255,0.07) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(30,111,255,0.07) 1px, transparent 1px)
                `,
                backgroundSize: '36px 36px'
              }} />

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#6eb3ff] mb-4">
                    <div className="w-6 h-[1px] bg-[#6eb3ff]/50" />
                    Don't see the right role?
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
                    Send us an <span className="text-[#00D4AA]">Open Application</span>
                  </h3>
                  <p className="text-slate-400 max-w-sm text-base font-normal leading-relaxed">
                    We're always on the lookout for exceptional talent. Share your profile and we'll be in touch.
                  </p>
                </div>
                <button
                  onClick={() => openModal("Open Application")}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#1e6fff] text-white font-bold rounded-2xl hover:bg-[#1a5fe0] transition-all duration-300 whitespace-nowrap shadow-xl shadow-[#1e6fff]/20 hover:shadow-[#1e6fff]/40 hover:-translate-y-1"
                >
                  Submit Profile
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <style dangerouslySetInnerHTML={{
            __html: `
            .custom-modal-scrollbar::-webkit-scrollbar {
              width: 5px;
            }
            .custom-modal-scrollbar::-webkit-scrollbar-track {
              background: transparent;
              margin: 10px 0;
            }
            .custom-modal-scrollbar::-webkit-scrollbar-thumb {
              background: #e2e8f0;
              border-radius: 10px;
            }
            .custom-modal-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #cbd5e1;
            }
          `}} />
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a0f1e] to-[#1a1f2e] px-5 sm:px-10 py-8 rounded-t-3xl relative border-b border-gray-100">
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `
                  linear-gradient(rgba(30,111,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(30,111,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px'
              }} />

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6eb3ff] mb-1.5 opacity-80">
                    Applying for Position
                  </div>
                  <div className="text-xl font-bold text-white leading-tight">
                    {selectedJob}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Please fill out the details below to complete your application.
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200 ml-6"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto custom-modal-scrollbar p-5 sm:p-10">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                  {/* Personal Information */}
                  <div className="space-y-3">
                    <div className="text-sm font-bold tracking-wider uppercase text-blue-600 mb-4">
                      Personal Information
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="First name"
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200 shadow-sm ${errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                            }`}
                          required
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Last name"
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200 shadow-sm ${errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                            }`}
                          required
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="your.email@example.com"
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200 shadow-sm ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                            }`}
                          required
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.email}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Phone Number *
                        </label>
                        <div className={`flex items-stretch h-11 border rounded-xl bg-white overflow-hidden transition-all duration-200 shadow-sm ${errors.phone ? 'border-red-300 ring-2 ring-red-500/10' : 'border-gray-200 focus-within:border-[#1e6fff] focus-within:ring-2 focus-within:ring-[#1e6fff]/10 hover:border-gray-300'
                          }`}>
                          <div className="relative border-r border-slate-100 bg-slate-50/50">
                            <button
                              type="button"
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="h-full flex items-center gap-2 px-3 hover:bg-slate-100 transition-colors duration-200 outline-none"
                            >
                              <span className="text-sm">{selectedCountry.flag}</span>
                              <span className="text-xs font-medium text-gray-700">{selectedCountry.code}</span>
                              <ChevronDown className="w-3 h-3 text-gray-400" />
                            </button>
                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto py-1.5">
                                {countryCodes.map((country, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors duration-150 text-left"
                                  >
                                    <span className="text-base">{country.flag}</span>
                                    <div className="flex-1">
                                      <div className="text-xs font-medium text-gray-900 leading-tight">{country.country}</div>
                                      <div className="text-[10px] text-gray-500">{country.code}</div>
                                    </div>
                                    {selectedCountry.code === country.code && (
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#1e6fff]" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="98765 43210"
                            className="flex-1 px-4 bg-transparent outline-none text-sm text-gray-900 placeholder:text-xs placeholder:text-gray-400"
                            required
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-700 ml-1">
                        Current Location *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleLocationChange}
                          onBlur={handleBlur}
                          placeholder="City, State, Country"
                          className={`w-full h-11 px-4 pr-10 border rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200 shadow-sm ${errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                            }`}
                          required
                        />
                        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        {showLocationSuggestions && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                            {locationSuggestions.map((city, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => handleLocationSelect(city)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors duration-150 text-left"
                              >
                                <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{city}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-xs text-red-500 ml-1">{errors.location}</p>
                      )}
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="space-y-3 pt-2">
                    <div className="text-sm font-bold tracking-wider uppercase text-blue-600 mb-4">
                      Professional Details
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Total Experience *
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm transition-all duration-200 ${errors.experience ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                            }`}
                          required
                        >
                          <option value="">Select experience</option>
                          <option>Fresher (0 years)</option>
                          <option>Less than 1 year</option>
                          <option>1 – 2 years</option>
                          <option>3 – 5 years</option>
                          <option>6 – 8 years</option>
                          <option>9 – 12 years</option>
                          <option>12+ years</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Relevant Experience *
                        </label>
                        <select
                          name="relevantExp"
                          value={formData.relevantExp}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm transition-all duration-200 ${errors.relevantExp ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                            }`}
                          required
                        >
                          <option value="">Select relevant experience</option>
                          <option>Fresher (0 years)</option>
                          <option>Less than 1 year</option>
                          <option>1 – 2 years</option>
                          <option>3 – 5 years</option>
                          <option>6 – 8 years</option>
                          <option>9 – 12 years</option>
                          <option>12+ years</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Current / Last Company
                        </label>
                        <input
                          type="text"
                          name="currentCompany"
                          value={formData.currentCompany}
                          onChange={handleInputChange}
                          placeholder="Current company name"
                          className="w-full h-11 px-4 border border-gray-200 rounded-xl bg-white focus:border-[#1e6fff] focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Current / Last Role
                        </label>
                        <input
                          type="text"
                          name="currentRole"
                          value={formData.currentRole}
                          onChange={handleInputChange}
                          placeholder="Current job title"
                          className="w-full h-11 px-4 border border-gray-200 rounded-xl bg-white focus:border-[#1e6fff] focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Current CTC *
                        </label>
                        <input
                          type="text"
                          name="currentCTC"
                          value={formData.currentCTC}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g. 12,00,000"
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200 ${errors.currentCTC ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1e6fff]'
                            }`}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Expected CTC
                        </label>
                        <input
                          type="text"
                          name="expectedCTC"
                          value={formData.expectedCTC}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g. 18,00,000"
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200 ${errors.expectedCTC ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1e6fff]'
                            }`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Notice Period *
                        </label>
                        <select
                          name="noticePeriod"
                          value={formData.noticePeriod}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className="w-full h-11 px-4 border border-gray-200 rounded-xl bg-white outline-none text-sm transition-all duration-200"
                          required
                        >
                          <option value="">Select notice period</option>
                          <option>Immediately available</option>
                          <option>15 days</option>
                          <option>30 days</option>
                          <option>60 days</option>
                          <option>90 days+</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Preferred Work Mode
                        </label>
                        <select
                          name="workMode"
                          value={formData.workMode}
                          onChange={handleInputChange}
                          className="w-full h-11 px-4 border border-gray-200 rounded-xl bg-white outline-none text-sm transition-all duration-200"
                        >
                          <option value="">Select work mode</option>
                          <option>Onsite</option>
                          <option>Remote</option>
                          <option>Hybrid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Links */}
                  <div className="space-y-3 pt-2">
                    <div className="text-sm font-bold tracking-wider uppercase text-blue-600 mb-4">
                      Skills & Links
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-700 ml-1">
                          Key Skills *
                        </label>
                        <input
                          type="text"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g. React, Node.js, AWS"
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200 ${errors.skills ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
                            }`}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-gray-700 ml-1">
                            LinkedIn Profile URL
                          </label>
                          <input
                            type="url"
                            name="linkedIn"
                            value={formData.linkedIn}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="linkedin.com/in/..."
                            className={`w-full h-11 px-4 border rounded-xl bg-white text-sm placeholder:text-xs placeholder:text-gray-400 outline-none transition-all duration-200 ${errors.linkedIn ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                              }`}
                          />
                          {errors.linkedIn && (
                            <p className="mt-1 text-xs text-red-500 ml-1">{errors.linkedIn}</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-medium text-gray-700 ml-1">
                            Portfolio / GitHub (optional)
                          </label>
                          <input
                            type="url"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="github.com/..."
                            className={`w-full h-11 px-4 border rounded-xl bg-white text-sm placeholder:text-xs placeholder:text-gray-400 outline-none transition-all duration-200 ${errors.portfolio ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                              }`}
                          />
                          {errors.portfolio && (
                            <p className="mt-1 text-xs text-red-500 ml-1">{errors.portfolio}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-3 pt-2">
                    <div className="text-sm font-bold tracking-wider uppercase text-blue-600 mb-4">
                      Resume Upload *
                    </div>
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all bg-white ${errors.resume ? 'border-red-300 bg-red-50/20' : 'border-gray-200 hover:border-[#1e6fff] hover:bg-gray-50/50'
                      }`}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resumeFile"
                      />
                      <label htmlFor="resumeFile" className="cursor-pointer">
                        <Upload className={`w-10 h-10 mx-auto mb-3 ${errors.resume ? 'text-red-400' : 'text-gray-400'}`} />
                        <div className="text-sm text-gray-600 font-medium">Click to upload your resume</div>
                        <div className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX — max 5MB</div>
                        {resumeFileName && (
                          <div className="mt-3 text-xs text-[#1e6fff] font-medium bg-[#1e6fff]/5 py-1.5 px-3 rounded-lg inline-block">
                            {resumeFileName}
                          </div>
                        )}
                      </label>
                    </div>
                    {errors.resume && (
                      <p className="mt-2 text-xs text-red-500 text-center font-medium">{errors.resume}</p>
                    )}
                  </div>

                  {/* Cover Note */}
                  <div className="space-y-3 pt-2">
                    <div className="text-sm font-bold tracking-wider uppercase text-blue-600 mb-4">
                      Cover Note
                    </div>
                    <div className="relative">
                      <textarea
                        name="coverNote"
                        value={formData.coverNote}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Why do you want to join Hyniva?"
                        rows={3}
                        maxLength={500}
                        className={`w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 resize-none transition-all duration-200 ${errors.coverNote ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
                          }`}
                        required
                      />
                      <div className="absolute bottom-2 right-3 text-[10px] font-medium text-gray-400">
                        {formData.coverNote.length}/500
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-[#1e6fff] to-[#1a5fe0] text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-3">
                      Securely submitted to Hyniva Recruitment Team
                    </p>
                  </div>
                </form>
              ) : (
                /* Success State */
                <div className="text-center py-8 px-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-5 shadow-sm">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Thank You!
                  </h3>
                  <div className="max-w-xs mx-auto mb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Your application has been successfully submitted to our team. We'll be in touch with you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-3 bg-[#1e6fff] text-white font-semibold rounded-xl hover:bg-[#1a5fe0] transition-colors duration-200"
                  >
                    Submit Another Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
