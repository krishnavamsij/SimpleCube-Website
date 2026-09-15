"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, X, Upload, MapPin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JobListings } from "@/components/job-listings";
import { jobOpenings } from "@/content/job-openings";

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

interface CountryCode {
  iso: string;
  code: string;
  country: string;
}

const getCountryFlag = (iso: string) =>
  iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

const countryCodeData = [
  ["AF", "+93", "Afghanistan"],
  ["AL", "+355", "Albania"],
  ["DZ", "+213", "Algeria"],
  ["AS", "+1", "American Samoa"],
  ["AD", "+376", "Andorra"],
  ["AO", "+244", "Angola"],
  ["AI", "+1", "Anguilla"],
  ["AG", "+1", "Antigua and Barbuda"],
  ["AR", "+54", "Argentina"],
  ["AM", "+374", "Armenia"],
  ["AW", "+297", "Aruba"],
  ["AU", "+61", "Australia"],
  ["AT", "+43", "Austria"],
  ["AZ", "+994", "Azerbaijan"],
  ["BS", "+1", "Bahamas"],
  ["BH", "+973", "Bahrain"],
  ["BD", "+880", "Bangladesh"],
  ["BB", "+1", "Barbados"],
  ["BY", "+375", "Belarus"],
  ["BE", "+32", "Belgium"],
  ["BZ", "+501", "Belize"],
  ["BJ", "+229", "Benin"],
  ["BM", "+1", "Bermuda"],
  ["BT", "+975", "Bhutan"],
  ["BO", "+591", "Bolivia"],
  ["BA", "+387", "Bosnia and Herzegovina"],
  ["BW", "+267", "Botswana"],
  ["BR", "+55", "Brazil"],
  ["BN", "+673", "Brunei"],
  ["BG", "+359", "Bulgaria"],
  ["BF", "+226", "Burkina Faso"],
  ["BI", "+257", "Burundi"],
  ["KH", "+855", "Cambodia"],
  ["CM", "+237", "Cameroon"],
  ["CA", "+1", "Canada"],
  ["CV", "+238", "Cape Verde"],
  ["KY", "+1", "Cayman Islands"],
  ["CF", "+236", "Central African Republic"],
  ["TD", "+235", "Chad"],
  ["CL", "+56", "Chile"],
  ["CN", "+86", "China"],
  ["CO", "+57", "Colombia"],
  ["KM", "+269", "Comoros"],
  ["CG", "+242", "Congo"],
  ["CD", "+243", "Congo, Democratic Republic"],
  ["CK", "+682", "Cook Islands"],
  ["CR", "+506", "Costa Rica"],
  ["CI", "+225", "Cote d'Ivoire"],
  ["HR", "+385", "Croatia"],
  ["CU", "+53", "Cuba"],
  ["CY", "+357", "Cyprus"],
  ["CZ", "+420", "Czech Republic"],
  ["DK", "+45", "Denmark"],
  ["DJ", "+253", "Djibouti"],
  ["DM", "+1", "Dominica"],
  ["DO", "+1", "Dominican Republic"],
  ["EC", "+593", "Ecuador"],
  ["EG", "+20", "Egypt"],
  ["SV", "+503", "El Salvador"],
  ["GQ", "+240", "Equatorial Guinea"],
  ["ER", "+291", "Eritrea"],
  ["EE", "+372", "Estonia"],
  ["ET", "+251", "Ethiopia"],
  ["FK", "+500", "Falkland Islands"],
  ["FO", "+298", "Faroe Islands"],
  ["FJ", "+679", "Fiji"],
  ["FI", "+358", "Finland"],
  ["FR", "+33", "France"],
  ["GF", "+594", "French Guiana"],
  ["PF", "+689", "French Polynesia"],
  ["GA", "+241", "Gabon"],
  ["GM", "+220", "Gambia"],
  ["GE", "+995", "Georgia"],
  ["DE", "+49", "Germany"],
  ["GH", "+233", "Ghana"],
  ["GI", "+350", "Gibraltar"],
  ["GR", "+30", "Greece"],
  ["GL", "+299", "Greenland"],
  ["GD", "+1", "Grenada"],
  ["GP", "+590", "Guadeloupe"],
  ["GU", "+1", "Guam"],
  ["GT", "+502", "Guatemala"],
  ["GN", "+224", "Guinea"],
  ["GW", "+245", "Guinea-Bissau"],
  ["GY", "+592", "Guyana"],
  ["HT", "+509", "Haiti"],
  ["HN", "+504", "Honduras"],
  ["HK", "+852", "Hong Kong"],
  ["HU", "+36", "Hungary"],
  ["IS", "+354", "Iceland"],
  ["IN", "+91", "India"],
  ["ID", "+62", "Indonesia"],
  ["IR", "+98", "Iran"],
  ["IQ", "+964", "Iraq"],
  ["IE", "+353", "Ireland"],
  ["IL", "+972", "Israel"],
  ["IT", "+39", "Italy"],
  ["JM", "+1", "Jamaica"],
  ["JP", "+81", "Japan"],
  ["JO", "+962", "Jordan"],
  ["KZ", "+7", "Kazakhstan"],
  ["KE", "+254", "Kenya"],
  ["KI", "+686", "Kiribati"],
  ["KW", "+965", "Kuwait"],
  ["KG", "+996", "Kyrgyzstan"],
  ["LA", "+856", "Laos"],
  ["LV", "+371", "Latvia"],
  ["LB", "+961", "Lebanon"],
  ["LS", "+266", "Lesotho"],
  ["LR", "+231", "Liberia"],
  ["LY", "+218", "Libya"],
  ["LI", "+423", "Liechtenstein"],
  ["LT", "+370", "Lithuania"],
  ["LU", "+352", "Luxembourg"],
  ["MO", "+853", "Macau"],
  ["MK", "+389", "North Macedonia"],
  ["MG", "+261", "Madagascar"],
  ["MW", "+265", "Malawi"],
  ["MY", "+60", "Malaysia"],
  ["MV", "+960", "Maldives"],
  ["ML", "+223", "Mali"],
  ["MT", "+356", "Malta"],
  ["MH", "+692", "Marshall Islands"],
  ["MQ", "+596", "Martinique"],
  ["MR", "+222", "Mauritania"],
  ["MU", "+230", "Mauritius"],
  ["MX", "+52", "Mexico"],
  ["FM", "+691", "Micronesia"],
  ["MD", "+373", "Moldova"],
  ["MC", "+377", "Monaco"],
  ["MN", "+976", "Mongolia"],
  ["ME", "+382", "Montenegro"],
  ["MS", "+1", "Montserrat"],
  ["MA", "+212", "Morocco"],
  ["MZ", "+258", "Mozambique"],
  ["MM", "+95", "Myanmar"],
  ["NA", "+264", "Namibia"],
  ["NR", "+674", "Nauru"],
  ["NP", "+977", "Nepal"],
  ["NL", "+31", "Netherlands"],
  ["NC", "+687", "New Caledonia"],
  ["NZ", "+64", "New Zealand"],
  ["NI", "+505", "Nicaragua"],
  ["NE", "+227", "Niger"],
  ["NG", "+234", "Nigeria"],
  ["NU", "+683", "Niue"],
  ["KP", "+850", "North Korea"],
  ["MP", "+1", "Northern Mariana Islands"],
  ["NO", "+47", "Norway"],
  ["OM", "+968", "Oman"],
  ["PK", "+92", "Pakistan"],
  ["PW", "+680", "Palau"],
  ["PS", "+970", "Palestine"],
  ["PA", "+507", "Panama"],
  ["PG", "+675", "Papua New Guinea"],
  ["PY", "+595", "Paraguay"],
  ["PE", "+51", "Peru"],
  ["PH", "+63", "Philippines"],
  ["PL", "+48", "Poland"],
  ["PT", "+351", "Portugal"],
  ["PR", "+1", "Puerto Rico"],
  ["QA", "+974", "Qatar"],
  ["RE", "+262", "Reunion"],
  ["RO", "+40", "Romania"],
  ["RU", "+7", "Russia"],
  ["RW", "+250", "Rwanda"],
  ["WS", "+685", "Samoa"],
  ["SM", "+378", "San Marino"],
  ["ST", "+239", "Sao Tome and Principe"],
  ["SA", "+966", "Saudi Arabia"],
  ["SN", "+221", "Senegal"],
  ["RS", "+381", "Serbia"],
  ["SC", "+248", "Seychelles"],
  ["SL", "+232", "Sierra Leone"],
  ["SG", "+65", "Singapore"],
  ["SK", "+421", "Slovakia"],
  ["SI", "+386", "Slovenia"],
  ["SB", "+677", "Solomon Islands"],
  ["SO", "+252", "Somalia"],
  ["ZA", "+27", "South Africa"],
  ["KR", "+82", "South Korea"],
  ["SS", "+211", "South Sudan"],
  ["ES", "+34", "Spain"],
  ["LK", "+94", "Sri Lanka"],
  ["KN", "+1", "Saint Kitts and Nevis"],
  ["LC", "+1", "Saint Lucia"],
  ["PM", "+508", "Saint Pierre and Miquelon"],
  ["VC", "+1", "Saint Vincent and the Grenadines"],
  ["SD", "+249", "Sudan"],
  ["SR", "+597", "Suriname"],
  ["SZ", "+268", "Eswatini"],
  ["SE", "+46", "Sweden"],
  ["CH", "+41", "Switzerland"],
  ["SY", "+963", "Syria"],
  ["TW", "+886", "Taiwan"],
  ["TJ", "+992", "Tajikistan"],
  ["TZ", "+255", "Tanzania"],
  ["TH", "+66", "Thailand"],
  ["TL", "+670", "Timor-Leste"],
  ["TG", "+228", "Togo"],
  ["TO", "+676", "Tonga"],
  ["TT", "+1", "Trinidad and Tobago"],
  ["TN", "+216", "Tunisia"],
  ["TR", "+90", "Turkey"],
  ["TM", "+993", "Turkmenistan"],
  ["TC", "+1", "Turks and Caicos Islands"],
  ["TV", "+688", "Tuvalu"],
  ["UG", "+256", "Uganda"],
  ["UA", "+380", "Ukraine"],
  ["AE", "+971", "United Arab Emirates"],
  ["GB", "+44", "United Kingdom"],
  ["US", "+1", "United States"],
  ["UY", "+598", "Uruguay"],
  ["UZ", "+998", "Uzbekistan"],
  ["VU", "+678", "Vanuatu"],
  ["VA", "+379", "Vatican City"],
  ["VE", "+58", "Venezuela"],
  ["VN", "+84", "Vietnam"],
  ["VG", "+1", "Virgin Islands, British"],
  ["VI", "+1", "Virgin Islands, U.S."],
  ["YE", "+967", "Yemen"],
  ["ZM", "+260", "Zambia"],
  ["ZW", "+263", "Zimbabwe"],
] as const;

// Country codes and location data
const countryCodes: CountryCode[] = countryCodeData.map(([iso, code, country]) => ({
  iso,
  code,
  country,
}));

const defaultCountryCode = countryCodes.find((country) => country.iso === "US") ?? countryCodes[0];

// Helper function to get country code based on job region
const getCountryCodeByRegion = (region?: string): CountryCode => {
  const regionMap: Record<string, string> = {
    "us": "US",      // USA (+1)
    "canada": "CA",  // Canada (+1)
    "india": "IN",   // India (+91)
    "uk": "GB",      // UK (+44)
  };

  const isoCode = regionMap[region?.toLowerCase() || "us"] || "IN";
  return countryCodes.find((country) => country.iso === isoCode) || defaultCountryCode;
};

const getPhoneValidationError = (value: string, country: CountryCode) => {
  const phoneDigits = value.replace(/\D/g, "");

  if (!value.trim()) return "Phone number is required";
  if (!phoneDigits) return "Please enter digits only for phone number";

  const countryCodeDigits = country.code.replace(/\D/g, "");
  const maxNationalDigits = 15 - countryCodeDigits.length;

  if (phoneDigits.length < 4 || phoneDigits.length > maxNationalDigits) {
    return `Please enter a valid ${country.country} phone number`;
  }

  if (country.iso === "IN") {
    if (phoneDigits.length !== 10) return "Indian mobile numbers must be 10 digits";
    if (phoneDigits.startsWith("0")) return "Please enter 10 digits without leading zero";
  }

  return "";
};

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

function CareersPageContent() {
  const searchParams = useSearchParams();
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCountry, setSelectedCountry] = useState(defaultCountryCode);
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
    
    // Find the job and set country code and job ID based on region
    const job = jobOpenings.find(j => j.title === jobTitle);
    if (job) {
      if (job.region) {
        const countryCode = getCountryCodeByRegion(job.region);
        setSelectedCountry(countryCode);
      }
      setSelectedJobId(job.requestId || "");
    } else {
      setSelectedCountry(defaultCountryCode);
      setSelectedJobId("");
    }
    
    setModalOpen(true);
    setFormSubmitted(false);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const jobId = searchParams.get("job");
    if (!jobId || !jobOpenings.some((job) => job.id === jobId)) return;

    setExpandedJob(jobId);

    if (searchParams.get("apply") === "1") {
      const job = jobOpenings.find((opening) => opening.id === jobId);
      if (job) {
        openModal(job.title);
      }
    }
  }, [searchParams]);

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
    setUploadProgress(0);
    setSubmitError("");
    
    // Reset country code based on selected job
    const job = jobOpenings.find(j => j.title === selectedJob);
    if (job && job.region) {
      const countryCode = getCountryCodeByRegion(job.region);
      setSelectedCountry(countryCode);
    } else {
      setSelectedCountry(defaultCountryCode);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
    resetForm();
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let { value } = e.target;

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
        error = getPhoneValidationError(value, selectedCountry);
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
        if (value.trim() && !/\d/.test(value)) error = "Please enter a valid amount (e.g. 18,00,000)";
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
          error = "Please enter a valid portfolio URL";
        }
        break;
      case 'coverNote':
        // Cover Note is optional - no validation needed
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
    // Expected CTC is optional - no validation needed
    if (!formData.noticePeriod) newErrors.noticePeriod = "Please select your notice period";
    if (!formData.skills.trim()) newErrors.skills = "Please mention your key skills";
    // Cover Note is optional - no validation needed
    if (!resumeFile) newErrors.resume = "Please upload your resume";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone.trim()) {
      const phoneError = getPhoneValidationError(formData.phone, selectedCountry);
      if (phoneError) newErrors.phone = phoneError;
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
      newErrors.portfolio = "Please enter a valid portfolio URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = new Set(["pdf", "doc", "docx"]);
      const maxSize = 5 * 1024 * 1024;

      if (!fileExtension || !allowedExtensions.has(fileExtension)) {
        setErrors((prev) => ({
          ...prev,
          resume: "Only PDF, DOC, and DOCX files are allowed.",
        }));
        setResumeFile(null);
        setResumeFileName("");
        e.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          resume: "Resume file must be 5MB or smaller.",
        }));
        setResumeFile(null);
        setResumeFileName("");
        e.target.value = "";
        return;
      }

      setResumeFile(file);
      setResumeFileName(file.name);
      setErrors((prev) => ({ ...prev, resume: "" }));
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

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);

    if (formData.phone.trim()) {
      const phoneError = getPhoneValidationError(formData.phone, country);
      setErrors((prev) => ({ ...prev, phone: phoneError }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();

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
    setSubmitError("");
    setUploadProgress(0);

    try {
      if (!resumeFile) {
        throw new Error("Please upload your resume.");
      }

      // Create FormData for submission to the careers email API
      const formDataToSend = new FormData();
      formDataToSend.append("name", `${formData.firstName} ${formData.lastName}`.trim());
      formDataToSend.append("email", formData.email);
      formDataToSend.append("role", selectedJob);
      formDataToSend.append("jobId", selectedJobId);
      formDataToSend.append("ctc", formData.currentCTC);
      formDataToSend.append("skills", formData.skills);
      formDataToSend.append("location", formData.location);
      
      // Get the job's region/location for email routing
      const job = jobOpenings.find(j => j.title === selectedJob);
      if (job) {
        formDataToSend.append("jobLocation", job.location); // Job posting location
        formDataToSend.append("jobRegion", job.region || ""); // Job region (us/india)
      }
      
      formDataToSend.append("resume", resumeFile);

      const response = await fetch("/api/send-careers", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit application.");
      }

      setFormSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-32 min-h-[80vh] flex flex-col justify-center overflow-hidden bg-[#0A2F52]">
          {/* Background layers - Matching contact page aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#0A2F52]" />
          <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(19,84,152,0.18)_0%,transparent_65%)]" />
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#135498]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#e8f1fa]0/5 rounded-full blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(30,144,255,0.16) 1px, transparent 1px)`,
              backgroundSize: '38px 38px'
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-[900] leading-[1.1] tracking-tight text-white mb-6 font-display">
              Join the team where<br className="hidden sm:block" />{" "}<span className="text-[#3886CE]">Talent meets Purpose</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 font-normal max-w-3xl mx-auto">
              Be part of a team that solves complex problems, builds intelligent systems and drives real transformation across industries.
            </p>
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

            <JobListings
              jobs={jobOpenings}
              expandedJob={expandedJob}
              onToggleJob={toggleJob}
              onApply={openModal}
            />
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
            <div className="bg-gradient-to-r from-[#0A2F52] to-[#1a1f2e] px-5 sm:px-10 py-8 rounded-t-3xl relative border-b border-gray-100">
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
                    <div className="text-sm font-bold tracking-wider uppercase text-[#135498] mb-4">
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
                        <div className={`relative flex items-stretch h-11 border rounded-xl bg-white overflow-visible transition-all duration-200 shadow-sm ${errors.phone ? 'border-red-300 ring-2 ring-red-500/10' : 'border-gray-200 focus-within:border-[#1e6fff] focus-within:ring-2 focus-within:ring-[#1e6fff]/10 hover:border-gray-300'
                          }`}>
                          <div className="relative border-r border-slate-100 bg-slate-50/50">
                            <button
                              type="button"
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="h-full flex items-center gap-2 px-3 rounded-l-xl hover:bg-slate-100 transition-colors duration-200 outline-none"
                            >
                              <span
                                className="flex h-4 w-5 items-center justify-center text-base leading-none"
                                aria-hidden="true"
                              >
                                {getCountryFlag(selectedCountry.iso)}
                              </span>
                              <span className="text-xs font-medium text-gray-700">{selectedCountry.code}</span>
                              <ChevronDown className="w-3 h-3 text-gray-400" />
                            </button>
                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl z-[80] max-h-72 overflow-y-auto py-1.5">
                                {countryCodes.map((country) => (
                                  <button
                                    key={country.iso}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors duration-150 text-left"
                                  >
                                    <span
                                      className="flex h-4 w-5 shrink-0 items-center justify-center text-base leading-none"
                                      aria-hidden="true"
                                    >
                                      {getCountryFlag(country.iso)}
                                    </span>
                                    <div className="flex-1">
                                      <div className="text-xs font-medium text-gray-900 leading-tight">{country.country}</div>
                                      <div className="text-[10px] text-gray-500">{country.code}</div>
                                    </div>
                                    {selectedCountry.iso === country.iso && (
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
                    <div className="text-sm font-bold tracking-wider uppercase text-[#135498] mb-4">
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
                        {errors.experience && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.experience}</p>
                        )}
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
                        {errors.relevantExp && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.relevantExp}</p>
                        )}
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
                        {errors.currentCTC && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.currentCTC}</p>
                        )}
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
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm transition-all duration-200 ${errors.noticePeriod ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1e6fff] hover:border-gray-300'
                            }`}
                          required
                        >
                          <option value="">Select notice period</option>
                          <option>Immediately available</option>
                          <option>15 days</option>
                          <option>30 days</option>
                          <option>60 days</option>
                          <option>90 days+</option>
                        </select>
                        {errors.noticePeriod && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.noticePeriod}</p>
                        )}
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
                    <div className="text-sm font-bold tracking-wider uppercase text-[#135498] mb-4">
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
                          className={`w-full h-11 px-4 border rounded-xl bg-white focus:ring-2 focus:ring-[#1e6fff]/10 outline-none text-sm placeholder:text-xs placeholder:text-gray-400 transition-all duration-200 ${errors.skills ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1e6fff]'
                            }`}
                          required
                        />
                        {errors.skills && (
                          <p className="mt-1 text-xs text-red-500 ml-1">{errors.skills}</p>
                        )}
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
                            Portfolio (optional)
                          </label>
                          <input
                            type="url"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="yourportfolio.com"
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
                    <div className="text-sm font-bold tracking-wider uppercase text-[#135498] mb-4">
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
                    {isSubmitting && uploadProgress > 0 && (
                      <p className="mt-2 text-xs text-[#1e6fff] text-center font-medium">
                        Uploading resume... {uploadProgress}%
                      </p>
                    )}
                  </div>

                  {/* Cover Note */}
                  <div className="space-y-3 pt-2">
                    <div className="text-sm font-bold tracking-wider uppercase text-[#135498] mb-4">
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
                      />
                      <div className="absolute bottom-2 right-3 text-[10px] font-medium text-gray-400">
                        {formData.coverNote.length}/500
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    {submitError && (
                      <p className="mb-3 text-xs text-red-500 text-center font-medium">
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-[#1e6fff] to-[#1a5fe0] text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-3">
                      Securely submitted to SimpleCube Recruitment Team
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
                      Your application has been successfully submitted to our team. We&apos;ll be in touch with you shortly.
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

export default function CareersPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="min-h-screen bg-white" />
          <Footer />
        </>
      }
    >
      <CareersPageContent />
    </Suspense>
  );
}
