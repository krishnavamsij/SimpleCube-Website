"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Briefcase, X, Upload, Star, Shield, Users, MapPin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface JobPosition {
  id: string;
  requestId?: string;
  title: string;
  location: string;
  type?: string;
  description?: string;
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

const jobOpenings: JobPosition[] = [
  {
    id: "engagement-manager",
    requestId: "HYU2026004",
    title: "Engagement Manager",
    location: "Tysons, Virginia (Onsite – 5 Days/Week)",
    jobDuties: [
      "Own end-to-end delivery of multiple projects/programs while ensuring quality, budget, and timeline adherence",
      "Build and maintain strong relationships with clients, serving as the primary point of contact for delivery and account-related activities",
      "Manage customer expectations, identify business opportunities, and drive account growth",
      "Lead project planning, execution, risk management, issue resolution, and change management",
      "Collaborate with cross-functional teams including Engineering, QA, Product, Infrastructure, and Business stakeholders",
      "Monitor project health using KPIs, delivery metrics, and governance frameworks",
      "Ensure successful resource planning, utilization, and capacity management",
      "Drive continuous process improvement and delivery excellence using Agile and/or Waterfall methodologies",
      "Conduct regular client reviews, status meetings, executive reporting, and steering committee presentations",
      "Identify and mitigate project risks while ensuring proactive communication with stakeholders",
      "Mentor and coach project managers and delivery teams to improve performance and delivery maturity",
      "Support pre-sales activities, solution discussions, estimation, and proposal development when required",
      "Ensure compliance with organizational processes, quality standards, and governance models"
    ],
    qualifications: {
      degree: "Bachelor's or Master's degree in Computer Science, Engineering, Business, or related field",
      experience: "15+ Years",
    },
    skillsRequired: [
      "15+ years of overall IT experience with significant experience in Engagement Management",
      "Proven experience in Account Management, Project Management, and Delivery Management",
      "Strong client-facing and stakeholder management skills",
      "Experience managing enterprise-scale projects and distributed delivery teams",
      "Excellent leadership, negotiation, communication, and presentation skills",
      "Expertise in project planning, budgeting, forecasting, and financial management",
      "Strong understanding of Agile, Scrum, Waterfall, and hybrid delivery methodologies",
      "Experience in risk management, escalation management, and governance",
      "Ability to manage multiple projects and priorities simultaneously",
      "Strong analytical, problem-solving, and decision-making skills",
      "PMP, PMI-ACP, Scrum Master, or Prince2 certification (Preferred)",
      "Experience working with enterprise clients in a consulting or services environment (Preferred)",
      "Knowledge of cloud technologies (AWS, Azure, or GCP) is a plus",
      "Familiarity with DevOps practices and digital transformation initiatives is preferred",
      "MBA or equivalent management qualification is an added advantage"
    ],
    region: "us",
  },
  {
    id: "pega-developer",
    requestId: "HYC2026001",
    title: "PEGA Developer",
    location: "Toronto, ON (Onsite)",
    jobDuties: [
      "Design and develop PEGA applications aligned with insurance business processes",
      "Collaborate with cross-functional teams to translate business requirements into technical solutions",
      "Ensure adherence to PEGA best practices, guardrails, and performance standards",
      "Develop and support PEGA integrations and workflows",
      "Lead development activities, conduct code reviews, and mentor junior developers",
      "Participate in Agile ceremonies and support end-to-end project delivery",
      "Troubleshoot and resolve application issues while ensuring scalability and performance"
    ],
    qualifications: {
      degree: "PEGA CSSA Certification is required",
      experience: "8–10 Years",
    },
    skillsRequired: [
      "8–10 years of hands-on PEGA development experience",
      "Strong expertise in: PEGA Architecture, Case Management, Integrations",
      "PEGA LSA Certification preferred",
      "Strong understanding of enterprise application development and Agile methodologies",
      "Insurance domain experience",
      "Experience with large-scale PEGA implementations",
      "Strong understanding of performance optimization and PEGA best practices",
      "Excellent communication and problem-solving skills",
      "Ability to work independently and manage development deliverables"
    ],
    region: "us",
  },
  {
    id: "sap-s4hana-vertex-o-consultant",
    requestId: "HYC2026002",
    title: "SAP S/4HANA Vertex O Consultant",
    location: "Remote (Anywhere from Canada)",
    jobDuties: [
      "Configure and integrate Vertex O Series with SAP S/4HANA for real-time tax calculation",
      "Set up tax codes, jurisdictions, and mapping between SAP and Vertex",
      "Work with business teams to gather tax requirements and ensure compliance",
      "Support end-to-end processes across SD (Order-to-Cash) and FI modules",
      "Perform unit testing, UAT support, and troubleshoot tax-related issues",
      "Collaborate with technical teams on interfaces and enhancements"
    ],
    qualifications: {
      degree: "Not specified",
      experience: "Not specified",
    },
    skillsRequired: [
      "Strong experience with SAP S/4HANA (SD and/or FI modules)",
      "Hands-on experience with Vertex O Series integration and configuration",
      "Knowledge of indirect taxes (Sales & Use Tax, VAT, GST)",
      "Experience in system integration and testing",
      "Experience in S/4HANA implementation or migration projects",
      "Familiarity with North American tax regulations",
      "Prior experience in Vertex upgrades or support",
      "Good communication and stakeholder management skills"
    ],
    region: "us",
  },
  {
    id: "radar-rating-expert",
    requestId: "HYC2026003",
    title: "RADAR Rating Expert (Guidewire)",
    location: "Calgary (AB), Edmonton (AB), Vancouver (BC), Winnipeg (MB), London/Toronto (ON), Montreal (QC), and Moncton (NB) – Onsite",
    jobDuties: [
      "Design, configure, and maintain RADAR rating models in production environments",
      "Build and manage RADAR algorithms, routines, and calculation logic",
      "Implement factor-based pricing models",
      "Manage rate versioning, effective dating, and rate change history within RADAR",
      "Create, configure, and maintain RADAR rate tables and rating factors",
      "Perform impact analysis for all rate table and factor changes",
      "Execute and support testing, validation, and reconciliation of rating logic",
      "Integrate RADAR rating with Guidewire PolicyCenter",
      "Implement rating logic for Coverage, Deductible, Limit changes",
      "Design and implement strict validation rules and error handling within RADAR",
      "Coordinate with forms and documents teams to ensure rated premiums and values are correctly reflected",
      "Provide technical leadership on RADAR factor modeling and rating best practices"
    ],
    qualifications: {
      degree: "Bachelor’s degree in Computer Science, Engineering, Mathematics, Actuarial Science OR equivalent professional experience",
      experience: "15+ years required",
    },
    skillsRequired: [
      "Minimum 10 years of Guidewire experience, with significant production focus on RADAR",
      "Deep, hands-on RADAR experience (Rate tables, Factor-based models, Algorithms)",
      "Proven experience integrating RADAR with Guidewire PolicyCenter",
      "Strong understanding of Insurance pricing concepts, rating structures, regulatory constraints",
      "Demonstrated ability to analyze and resolve complex rating issues and perform impact analysis",
      "Hands-on experience with Personal Property line of business rating models is REQUIRED"
    ],
    region: "us",
  },
  {
    id: "senior-salesforce-developer",
    requestId: "HYU2026001",
    title: "Senior Salesforce Developer",
    location: "Tyson, VA (USA)",
    jobDuties: [
      "Design and implement solutions using Salesforce Data 360 for unified and scalable customer data management",
      "Build and configure AI-driven agents using Agentforce, including Agent Builder and Prompt Builder",
      "Implement Salesforce Einstein AI features to enable automation and intelligent insights",
      "Design and manage Omni-Channel routing and messaging for seamless customer interactions",
      "Collaborate with business and technical teams to translate requirements into scalable Salesforce solutions",
      "Integrate Data 360, AI, and messaging capabilities within the Salesforce ecosystem",
      "Ensure system performance, scalability, and adherence to Salesforce best practices",
      "Support end-to-end delivery including testing, deployment, and production support"
    ],
    qualifications: {
      degree: "Salesforce certifications (Administrator, Platform Developer, or AI-related certifications)",
      experience: "8–10 Years",
    },
    skillsRequired: [
      "8–10 years of Salesforce experience",
      "Strong hands-on experience with Salesforce Data 360 (CDP concepts)",
      "Proven experience in Agentforce, Agent Builder, and Prompt Builder",
      "Strong knowledge of Einstein AI features and Salesforce AI capabilities",
      "Hands-on experience with Omni-Channel routing and messaging implementation",
      "Strong understanding of Salesforce architecture and integrations",
      "Experience working in Agile delivery environments",
      "Experience in customer service, CRM transformation, or contact center projects",
      "Exposure to large-scale Salesforce implementations",
      "Strong understanding of AI-driven workflows, automation, and personalization strategies",
      "Excellent communication, analytical, and problem-solving skills"
    ],
    region: "us",
  },
  {
    id: "data-governance-technical-consultant",
    requestId: "HYC2026004",
    title: "Data Governance Technical Consultant (Collibra)",
    location: "Vancouver, BC / Calgary, AB (Onsite)",
    jobDuties: [
      "Implement and configure Collibra aligned with enterprise data governance strategy",
      "Support pilot implementation for critical datasets",
      "Perform current-state assessment and solution design review",
      "Design metadata models and governance frameworks",
      "Configure workflows, domains, communities, and asset relationships in Collibra",
      "Enable integration with Databricks Unity Catalog and Azure ecosystem tools",
      "Implement metadata ingestion pipelines and automation processes",
      "Configure RBAC and governance workflows",
      "Support data lineage implementation and validation",
      "Define and monitor data quality rules and metrics",
      "Create technical documentation and provide knowledge transfer sessions",
      "Support Dev/Test/Prod deployment processes and governance automation"
    ],
    qualifications: {
      degree: "Not specified",
      experience: "7+ Years",
    },
    skillsRequired: [
      "Hands-on experience with Collibra Data Intelligence Cloud and/or On-prem",
      "Experience with Data Catalog, Business Glossary, Data Lineage, and Data Helpdesk",
      "Workflow development using Collibra workflow engine and RBAC configuration",
      "Metadata Management (Business/technical metadata, classification, CDEs)",
      "Experience with Databricks Unity Catalog and Azure Databricks ecosystem",
      "Experience with Collibra REST APIs, Import APIs, and metadata ingestion automation",
      "End-to-end data lineage implementation and data quality framework",
      "Strong communication and stakeholder management skills",
      "Experience working in Agile delivery environments",
      "Experience with Dev/Test/Prod deployment practices",
      "Vancouver local candidates highly preferred; Calgary candidates may also be considered",
      "Enterprise-scale governance architecture experience"
    ],
    region: "us",
  },
  {
    id: "service-designer",
    requestId: "HYC2026005",
    title: "Service Designer",
    location: "Alberta, Canada (Remote with occasional onsite travel)",
    jobDuties: [
      "Apply human-centered design methodologies to improve services and user experiences",
      "Conduct user research, field studies, and behavioral analysis",
      "Lead and participate in co-design workshops and stakeholder engagement sessions",
      "Develop journey maps, service blueprints, and process maps",
      "Create, test, and validate prototypes and service concepts",
      "Translate user needs and business goals into actionable service design strategies",
      "Define and refine user stories and support Agile backlog activities",
      "Conduct usability testing and analyze findings to improve services",
      "Measure service performance and provide data-driven recommendations",
      "Collaborate with business, technical, and product teams",
      "Support organizational change management and service adoption initiatives"
    ],
    qualifications: {
      degree: "Not specified",
      experience: "8+ Years",
    },
    skillsRequired: [
      "Minimum 2+ years of experience in service design research and related deliverables",
      "Minimum 3+ years of experience working in or with public sector organizations",
      "Minimum 2+ years of experience working within Agile cross-functional teams",
      "Strong understanding of human-centered design methodologies",
      "Experience conducting user research and insights analysis",
      "Experience creating journey maps, service blueprints, and other design artifacts",
      "Strong facilitation and stakeholder engagement skills",
      "Experience with usability testing and prototype validation",
      "Experience supporting digital transformation and large-scale service design projects",
      "Experience with change management and service adoption strategies",
      "Ability to work collaboratively across multidisciplinary teams",
      "Strong communication, analytical, and problem-solving skills"
    ],
    region: "us",
  },
  {
    id: "training-specialist-dras",
    requestId: "HYC2026006",
    title: "Training Specialist (DRAS – Digital Regulatory Assurance System)",
    location: "Edmonton, Alberta (Hybrid – Mostly Remote)",
    jobDuties: [
      "Develop training materials including user guides, job aids, presentations, and scenario-based learning content",
      "Translate system functionality and business processes into easy-to-understand training resources",
      "Maintain and update training documentation based on system enhancements and user feedback",
      "Collaborate with SMEs and business stakeholders to validate training accuracy and effectiveness",
      "Deliver virtual training sessions using platforms such as Microsoft Teams",
      "Facilitate participant engagement and provide post-training support and follow-up",
      "Identify knowledge gaps and recommend continuous training improvements",
      "Organize and maintain training materials within centralized repositories",
      "Support communication and adoption activities related to system implementation"
    ],
    qualifications: {
      degree: "Bachelor’s degree or diploma with relevant training and instructional experience",
      experience: "5+ Years",
    },
    skillsRequired: [
      "Minimum 5+ years of experience developing training materials and technical documentation",
      "Minimum 5+ years of experience delivering virtual training sessions",
      "Minimum 5+ years of experience managing multiple priorities within tight deadlines",
      "Strong technical writing and instructional design skills",
      "Experience creating user-friendly documentation and process-based learning content",
      "Strong facilitation, presentation, and communication skills",
      "Experience collaborating with SMEs, leadership teams, and stakeholders",
      "Experience in change management and communication planning",
      "Experience in business process documentation and workflow mapping",
      "Experience using feedback analytics to improve training effectiveness",
      "Familiarity with regulatory or government environments",
      "Strong organizational and time management skills"
    ],
    region: "us",
  },
  {
    id: "genesys-cloud-cx",
    requestId: "HYU2026002",
    title: "Genesys Cloud CX – Admin, Developer",
    location: "San Antonio, TX Or Tyson, VA(On-site)",
    jobDuties: [
      "Work closely with business stakeholders to gather functional requirements and analyze system issues",
      "Analyze call flows, routing logic, and omnichannel customer journeys to identify bottlenecks and optimization opportunities",
      "Review contact center performance metrics and recommend process improvements",
      "Provide guidance on Genesys Cloud CX and omnichannel platform capabilities",
      "Configure and manage Genesys Cloud CX platform components (Queues, Architect, Routing, Skills, Permissions)",
      "Support user provisioning and platform governance",
      "Perform ongoing platform maintenance and environment support",
      "Design, develop, and maintain IVR workflows using Genesys Architect",
      "Configure and optimize omnichannel engagement channels (Voice, Chat, Email, SMS, Social)",
      "Implement integrations with external systems using REST APIs, web services, AWS Lambda, and Data Actions",
      "Support AI chatbot and NLP-driven customer interaction flows",
      "Monitor contact center system health and performance using Genesys Analytics",
      "Investigate issues related to call routing and digital interaction failures",
      "Support batch job maintenance and automation processes using Python"
    ],
    qualifications: {
      degree: "Not specified",
      experience: "8+ years on Genesys platforms",
    },
    skillsRequired: [
      "8+ years of experience working with Genesys platforms, preferably Genesys Cloud CX",
      "Strong expertise in Architect, routing strategies, queues, skills, and call flow administration",
      "Experience creating, optimizing, and troubleshooting Architect call flows",
      "Experience implementing and supporting omnichannel customer engagement solutions",
      "Knowledge of voice, chat, email, SMS, chatbot, and social media support channels",
      "Experience with REST APIs, Data Actions, and external integrations",
      "Basic to intermediate programming/scripting skills in: Python, Node.js, AWS Lambda",
      "Experience with AI chatbots and NLP programming",
      "Understanding of FSC (Financial Services Cloud) and Voice Cloud environments",
      "Ability to work in Agile environments with two-week sprint cycles",
      "3–5 years of experience across multiple contact center platforms (NICE, AWS Connect) nice to have",
      "Experience in cloud migration and contact center modernization projects nice to have"
    ],
    region: "us",
  },
  {
    id: "salesforce-developer",
    requestId: "HYI2026002",
    title: "Salesforce Developer",
    location: "Bengaluru, India",
    jobDuties: [
      "Design and develop scalable solutions on the Salesforce platform using Apex, Visualforce, and Lightning (LWC).",
      "Customize Salesforce applications including Sales Cloud and Service Cloud.",
      "Build and maintain integrations with external systems using REST/SOAP APIs.",
      "Develop Lightning Web Components (LWC) for modern UI experiences.",
      "Design and Build Flows: Create and maintain record-triggered, scheduled, and screen flows.",
      "Perform data migration and data management using tools like Data Loader.",
      "Write unit tests and ensure high code coverage.",
      "Troubleshoot and resolve issues in production and sandbox environments.",
      "Collaborate with business analysts, admins, and stakeholders to gather requirements.",
      "Participate in code reviews and follow best practices for secure and efficient coding.",
      "Support deployment activities using CI/CD tools."
    ],
    qualifications: {
      degree: "Not specified",
      experience: "5 to 7 Years",
    },
    skillsRequired: [
      "5–7 years of hands-on Salesforce development experience",
      "Strong expertise in Apex (Triggers, Classes, Batch Apex, Scheduled Jobs), Lightning Web Components (LWC), SOQL & SOSL",
      "Experience with Salesforce configuration: Workflows, Process Builder, Flow, Validation Rules, Profiles, Permission Sets",
      "Integration experience using REST/SOAP APIs",
      "Hands-on experience working in Agile/Scrum teams",
      "Proficient in using JIRA to manage user stories, tasks, bugs",
      "Familiarity with version control systems (Git, Bitbucket, etc.)",
      "Knowledge of CI/CD tools (Jenkins, Copado, Gearset, etc.)",
      "Understanding of Salesforce Governor Limits and optimization techniques.",
      "Knowledge of Salesforce Agent Platform (Agent force)."
    ],
    region: "india",
  },
  {
    id: "genesys-cloud-cx-specialist",
    requestId: "HYI2026001",
    title: "Genesys Cloud CX Integration Specialist",
    location: "Bengaluru, India",
    jobDuties: [
      "Design and architect Genesys Cloud CX platform to integrate seamlessly with Salesforce Financial Services Cloud and Service Cloud Voice",
      "Develop comprehensive integration architecture using CX Cloud from Genesys packages (Core Services, Voice, Digital and AI, WEM, and Outbound)",
      "Create detailed technical documentation including call flows, data mapping, API integration patterns, and system architecture diagrams",
      "Design omnichannel routing strategies, IVR workflows, and intelligent call distribution logic within Genesys Architect",
      "Install, configure, and deploy CX Cloud from Genesys for Salesforce integration packages",
      "Build or migrate call flows using Genesys Architect including IVR menus, data actions, and script orchestration",
      "Configure Genesys Cloud APIs to synchronize data with Salesforce objects (Accounts, Contacts, Cases, Financial Accounts, etc.)",
      "Implement skills-based routing, queue management, and workforce engagement management (WEM) capabilities",
      "Configure screen pops, click-to-dial, automatic call logging, and CTI functionality within Salesforce",
      "Set up omnichannel capabilities including voice, chat, email, SMS, and social media integration",
      "Develop custom data actions and API integrations between Genesys Cloud and Salesforce using REST/SOAP APIs",
      "Create custom scripts and automation using Genesys Cloud scripting tools",
      "Design and implement intelligent routing strategies based on customer data, agent skills, and business rules",
      "Configure quality management, analytics, and reporting dashboards",
      "Implement workforce management (WEM) solutions for forecasting, scheduling, and adherence",
      "Set up outbound campaign management for proactive customer engagement",
      "Optimize IVR experiences using voice analytics and customer journey mapping"
    ],
    qualifications: {
      degree: "Bachelor's degree in Computer Science, Information Technology or related field (or equivalent practical experience)",
      experience: "5+ Years",
    },
    skillsRequired: [
      "5+ years of hands-on experience with Genesys Cloud CX platform",
      "5+ years designing and implementing complex Genesys integrations with CRM systems",
      "2+ years working with Salesforce integrations (Financial Services Cloud and/or Service Cloud Voice preferred)",
      "Experience integrating Genesys with Financial Service Cloud is required",
      "Proven track record implementing contact center solutions in regulated industries (Financial Services, Healthcare, or Insurance)",
      "Expertise in Genesys Architect (call flow design, IVR configuration, data actions)",
      "Proficiency with CX Cloud from Genesys packages (Core Services, Voice, Digital and AI, WEM, Outbound)",
      "Deep knowledge of Genesys Cloud APIs (Platform API, Analytics API, Routing API)",
      "Experience with Genesys Scripting and custom integrations",
      "Knowledge of Workforce Engagement Management (WEM) - forecasting, scheduling, quality management",
      "Expertise in omnichannel routing and queue management",
      "Experience with voice analytics and speech/text analytics",
      "Familiarity with Genesys Cloud Developer Tools and SDKs",
      "Knowledge of Salesforce FSC data model and Service Cloud Voice configuration is a strong advantage",
      "Strong awareness of contact center best practices"
    ],
    region: "india",
  },
  {
    id: "guidewire-integration-lead-developer",
    requestId: "HYC2026007",
    title: "Guidewire Integration Lead Developer",
    location: "Idaho (USA / Canada) – Remote",
    type: "Long Term Contract",
    description: "We are seeking a highly experienced Guidewire Integration Lead Developer with strong expertise in PolicyCenter integrations and rating. The ideal candidate will lead design and development of complex integrations, drive best practices, and ensure high-quality delivery in a Guidewire Cloud environment.",
    jobDuties: [
      "Lead the design, development, and implementation of Guidewire PolicyCenter integrations",
      "Architect and develop real-time and batch integrations using Guidewire Integration frameworks (Gosu, Messaging, Web Services, APIs)",
      "Work closely with business and technical teams to understand requirements and translate them into scalable solutions",
      "Drive rating integrations and support configuration (preferred)",
      "Ensure adherence to Guidewire best practices, coding standards, and performance guidelines",
      "Lead code reviews, mentor junior developers, and provide technical guidance",
      "Troubleshoot and resolve production issues, ensuring minimal business impact",
      "Collaborate with cross-functional teams including QA, DevOps, and business stakeholders"
    ],
    qualifications: {
      degree: "ACE Certification (Mammoth release or later)",
      experience: "10+ Years",
    },
    skillsRequired: [
      "10+ years of overall IT experience",
      "Strong hands-on experience in Guidewire PolicyCenter Integration development",
      "Expertise in Gosu, Integration APIs, Messaging, SOAP/REST Web Services",
      "Experience with Guidewire Rating (preferred but highly valued)",
      "Solid understanding of Guidewire data model and integration patterns",
      "Experience working in Guidewire Cloud environment",
      "ACE Certification (Mammoth release or later)"
    ],
    region: "us",
    howToApply: "Updated Resume\nVisa / Work Authorization\nCurrent Location\nAvailability\nExpected Rate\nLinkedIn Profile",
  },
  {
    id: "salesforce-data-360-agentforce-consultant",
    requestId: "HYU2026003",
    title: "Salesforce Data 360 & AgentForce Consultant",
    location: "Tyson, VA (OR) San Antonio, TX (USA)",
    type: "Full-Time",
    description: "We are seeking an experienced Salesforce Data 360 & AgentForce Consultant with strong expertise in Salesforce ecosystem solutions, AI-driven customer engagement, and omnichannel service platforms. The ideal candidate will have hands-on experience with Salesforce Data Cloud (Data 360), AgentForce, Agent Builder, Prompt Builder, Einstein AI capabilities, and Omni-Channel routing and messaging solutions.",
    jobDuties: [
      "Design, configure, and implement Salesforce Data 360 / Data Cloud solutions",
      "Configure and support AgentForce capabilities within Salesforce environments",
      "Develop and optimize AI-powered workflows using Agent Builder and Prompt Builder",
      "Implement and manage Einstein AI features for automation, recommendations, and customer insights",
      "Configure Omni-Channel routing, messaging, and case assignment workflows",
      "Support customer engagement across voice, chat, email, SMS, and digital channels",
      "Integrate Salesforce solutions with enterprise systems and third-party applications",
      "Collaborate with business and technical teams to gather requirements and define scalable solutions",
      "Develop and maintain technical documentation and process workflows",
      "Support system testing, troubleshooting, deployment, and post-production activities",
      "Participate in Agile ceremonies and continuous improvement initiatives"
    ],
    qualifications: {
      degree: "Salesforce certifications in Administrator, Service Cloud, AI Specialist, or Data Cloud Consultant (Preferred)",
      experience: "8+ Years",
    },
    skillsRequired: [
      "8+ years of experience working with Salesforce platforms and CRM solutions",
      "Strong experience with Salesforce Data 360 / Data Cloud implementation and administration",
      "Hands-on experience with AgentForce platform capabilities",
      "Experience configuring Agent Builder and Prompt Builder functionalities",
      "Strong understanding of Salesforce Service Cloud and customer engagement solutions",
      "Experience with Einstein AI features (recommendations, predictive insights, generated prompts, workflows)",
      "Experience with Omni-Channel routing and messaging configuration (Chat, Email, SMS)",
      "Experience with Salesforce APIs, REST/SOAP APIs, and middleware integrations",
      "Strong understanding of security, permissions, and role-based access controls",
      "Salesforce certifications (Administrator, Service Cloud, AI Specialist, Data Cloud Consultant preferred)"
    ],
    region: "us",
  },
  {
    id: "salesforce-solution-architect",
    requestId: "HYU2026005",
    title: "Salesforce Solution Architect",
    location: "Tysons, VA",
    type: "Full-Time",
    description: "We are seeking an experienced Solution Architect with a strong background in Salesforce platforms, MuleSoft integration services, Financial Services Cloud, Data Cloud, and Service Cloud. The ideal candidate will possess deep expertise in designing scalable enterprise solutions and a solid understanding of Agentic Architecture and AI-driven business processes.",
    jobDuties: [
      "Design and architect end-to-end enterprise solutions leveraging Salesforce ecosystem products, including Financial Services Cloud, Service Cloud, and Data Cloud",
      "Lead the architecture and implementation of MuleSoft-based integration solutions across enterprise applications and platforms",
      "Define scalable, secure, and maintainable solution architectures aligned with business objectives and enterprise standards",
      "Provide technical leadership and architectural guidance throughout the project lifecycle",
      "Collaborate with business stakeholders to gather requirements and translate them into technical solutions",
      "Drive solution design reviews, architecture governance, and best practices",
      "Evaluate and incorporate Agentic Architecture concepts and AI-driven capabilities into enterprise solutions where applicable",
      "Work closely with development, QA, DevOps, and business teams to ensure successful solution delivery",
      "Create and maintain architecture documentation, integration patterns, data models, and technical roadmaps",
      "Support strategic technology decisions and future-state architecture planning"
    ],
    qualifications: {
      degree: "Bachelor's or Master's degree in Computer Science, Information Technology, Engineering, or a related field",
      experience: "15+ Years",
    },
    skillsRequired: [
      "15+ years of experience in enterprise application architecture and solution design",
      "Strong hands-on experience with Salesforce platform architecture",
      "Expertise in Financial Services Cloud, Service Cloud, and Data Cloud",
      "Extensive experience designing and implementing MuleSoft integration solutions",
      "Strong understanding of API-led connectivity, microservices, and enterprise integration patterns",
      "Solid knowledge of Agentic Architecture and AI-enabled solution frameworks",
      "Experience with cloud-native architectures and enterprise data management",
      "Strong stakeholder management and communication skills",
      "Proven ability to lead cross-functional teams and complex enterprise initiatives",
      "Experience creating architecture artifacts, solution blueprints, and technical design documentation",
      "Salesforce Architect certifications (Application Architect, System Architect, or CTA preferred)",
      "MuleSoft Certified Architect or related certifications (Preferred)",
      "Experience in financial services, banking, lending, collections, or servicing domains (Preferred)",
      "Basic understanding of collections and servicing business processes (Preferred)",
      "Experience with AI, automation, and intelligent workflow solutions (Preferred)",
      "Familiarity with Agile delivery methodologies and DevOps practices (Preferred)"
    ],
    region: "us",
  },
  {
    id: "tosca-automation-engineer",
    requestId: "HYC2026008",
    title: "Tosca Automation Engineer",
    location: "Toronto, Canada (Remote – Ontario / Nova Scotia preferred)",
    type: "Permanent",
    description: "We are seeking an experienced Tosca Automation Engineer to design, build, and maintain scalable automation suites across UI, API, and data layers. The role focuses on building reusable automation frameworks, managing test data, and integrating automated test cases into CI/CD pipelines in a fast-paced delivery environment.",
    jobDuties: [
      "Design and execute automated test cases including regression, functional, and end-to-end business process testing using Tosca",
      "Design, develop, and maintain Tosca automation scripts",
      "Implement and maintain automation frameworks for functional, regression, and integration testing",
      "Create and manage Tosca workspace, components, test design sheets, modules, classes, RTB, and libraries",
      "Build automation frameworks from scratch where required",
      "Develop and maintain test data strategies including Tosca Data Integrity and DB validation",
      "Perform PDF comparisons and data validation using Tosca tools",
      "Collaborate with BA, Dev, and QA teams for requirement traceability",
      "Troubleshoot automation failures and optimize scripts",
      "Support CI/CD integration using DevOps tools"
    ],
    qualifications: {
      degree: "Tosca Automation Specialist I & II / Test Design Specialist certification (Preferred)",
      experience: "6–10 Years",
    },
    skillsRequired: [
      "6–10 years of test automation experience",
      "3+ years of hands-on experience with Tosca framework",
      "Strong experience in Tosca Data Integrity (DI)",
      "Experience in test case design, modules, test design sheets, RTB, and libraries",
      "Strong troubleshooting and debugging skills",
      "Experience in Agile / BDD environments",
      "Experience with CI/CD tools like GitLab and Jenkins",
      "Strong SQL skills",
      "Insurance domain experience (Preferred)",
      "Experience working in onshore/offshore models"
    ],
    region: "us",
    howToApply: "Updated Resume\nCurrent Location\nWork Authorization\nAvailability\nExpected Rate\nLinkedIn Profile",
  },
  {
    id: "digital-architect",
    requestId: "HYC2026009",
    title: "Digital Architect",
    location: "Remote within Canada (Occasional travel within Alberta if required)",
    type: "Contract",
    description: "We are seeking an experienced Digital Architect to support large-scale digital transformation, service innovation, modernization, and enterprise architecture initiatives within a public sector environment. The Digital Architect will work closely with cross-functional agile product teams to design and deliver secure, scalable, citizen-centric digital services aligned with enterprise architecture standards and modern software engineering practices.",
    jobDuties: [
      "Lead solution architecture and technical design for digital service delivery initiatives",
      "Develop scalable, secure, and user-centric architecture solutions aligned with enterprise standards and agile delivery principles",
      "Analyze existing systems, identify modernization opportunities, and define future-state architecture",
      "Provide architecture recommendations, technical discovery support, prototypes, and feasibility assessments",
      "Assess solution impacts, dependencies, risks, and integration considerations",
      "Guide cross-functional agile product teams through iterative delivery and sprint-based execution",
      "Support backlog refinement, sprint planning, technical prioritization, and release management activities",
      "Provide technical leadership, mentorship, architecture governance, and code review guidance",
      "Contribute hands-on development support when required to implement technical tasks and user stories",
      "Ensure alignment with coding standards, reusable components, common platforms, and enterprise architecture principles",
      "Design and manage APIs, RESTful services, and system integrations",
      "Define system boundaries, integration patterns, and service interaction strategies",
      "Support modernization and incremental transformation of legacy systems into modern cloud-enabled digital platforms",
      "Identify opportunities for reuse of common services, components, and enterprise capabilities",
      "Support implementation of CI/CD pipelines, automated testing, and secure development practices",
      "Contribute to containerization, orchestration, infrastructure-as-code, and cloud-native architecture initiatives",
      "Ensure architectural alignment with security, compliance, scalability, and operational requirements",
      "Translate technical concepts into clear business-friendly communication for technical and non-technical stakeholders",
      "Prepare architecture documentation, diagrams, presentations, and technical materials",
      "Collaborate with business teams, leadership, architects, developers, UX/service designers, and operational stakeholders",
      "Participate in continuous improvement of architecture practices, standards, and governance processes"
    ],
    qualifications: {
      degree: "Bachelor's degree in Computer Science, Information Technology, Engineering, or related field. Equivalent experience may be considered.",
      experience: "5+ Years",
    },
    skillsRequired: [
      "5+ years of experience as a Software or Digital Architect leading architecture, design, and delivery of enterprise digital solutions",
      "5+ years leading or supporting cross-functional agile product delivery teams",
      "4+ years experience defining and communicating solution architecture to both technical and non-technical audiences",
      "5+ years strong communication and stakeholder engagement experience",
      "2+ years experience working with teams applying UX design, service design, or human-centered design approaches",
      "Strong experience with software architecture, enterprise integration, and digital service delivery",
      "Experience designing and managing RESTful APIs and enterprise integrations",
      "Experience with cloud platforms (Azure, AWS, GCP), microservices, containerization, and modern application architectures",
      "Experience implementing CI/CD pipelines and DevSecOps practices",
      "Experience modernizing legacy systems into scalable digital platforms",
      "Experience with relational and non-relational databases",
      "Understanding of secure development practices and architecture governance",
      "Experience working within public sector digital transformation environments (Nice to Have)",
      "Experience with citizen-centric digital services and enterprise modernization initiatives (Nice to Have)",
      "Experience with cloud-native platforms, infrastructure-as-code, and orchestration technologies (Nice to Have)",
      "Experience supporting enterprise architecture governance and standards development (Nice to Have)",
      "Exposure to compliance, security clearance, or regulated environments (Nice to Have)"
    ],
    region: "us",
    howToApply: "Updated Resume\nCurrent Location\nWork Authorization\nAvailability\nExpected Rate\nLinkedIn Profile",
  },
  {
    id: "qa-automation-engineer",
    requestId: "HYC2026010",
    title: "QA Automation Engineer",
    location: "Remote within Canada (Occasional travel to Edmonton, Alberta if required)",
    type: "Contract",
    description: "We are seeking experienced QA Automation Engineers to support large-scale digital transformation, service innovation, and modernization initiatives within a public sector environment. The QA Automation Engineer will work closely with cross-functional agile product teams to ensure high-quality delivery of modern digital services through automation, testing strategy, and quality engineering best practices.",
    jobDuties: [
      "Design, develop, and maintain automated test frameworks and automation test suites",
      "Create automation test plans, test cases, and test scenarios for digital applications and services",
      "Implement end-to-end, regression, functional, API, load, performance, and security testing strategies",
      "Develop reusable automation components and support automation scalability across projects",
      "Support Behavior Driven Development (BDD) and Test Driven Development (TDD) practices",
      "Collaborate with developers, product owners, business analysts, and QA teams in agile sprint-based delivery environments",
      "Participate in backlog refinement, sprint planning, testing cycles, and release activities",
      "Ensure continuous quality validation throughout the software development lifecycle",
      "Build and maintain automation scripts integrated with CI/CD pipelines",
      "Support automated reporting, test metrics collection, and quality dashboards",
      "Contribute to automation standards, reusable frameworks, and testing best practices",
      "Perform API testing and validation for integrated digital services",
      "Design and execute load testing, performance testing, and security testing scenarios",
      "Identify defects, analyze root causes, and collaborate with development teams for resolution",
      "Prepare and maintain automation documentation, test artifacts, reports, and testing metrics",
      "Support quality governance, defect tracking, and testing standards across projects"
    ],
    qualifications: {
      degree: "Bachelor's degree in Computer Science, Information Technology, Engineering, or related field. Equivalent experience may be considered.",
      experience: "4+ Years",
    },
    skillsRequired: [
      "4+ years experience creating and modifying automation test scripts",
      "3+ years experience preparing automation test plans and automation testing strategies",
      "3+ years experience working with automation testing frameworks",
      "2+ years experience with GitHub or version control tools",
      "3+ years experience with performance testing, load testing, security testing, or end-to-end testing",
      "2+ years hands-on coding experience developing automation scripts",
      "Strong experience with QA automation tools and frameworks (Selenium, Cypress, Playwright)",
      "Experience developing and executing automated test suites",
      "Experience working in Agile/Scrum environments",
      "Strong debugging and analytical skills",
      "Familiarity with CI/CD-integrated testing practices",
      "Experience with API testing tools and frameworks (Nice to Have)",
      "Experience with Cypress (Nice to Have)",
      "Experience with Cucumber and/or Gherkin (Nice to Have)",
      "Experience with Jira Xray (Nice to Have)",
      "Experience establishing automation testing metrics and reporting dashboards (Nice to Have)",
      "Experience implementing QA automation standards and best practices (Nice to Have)",
      "Experience supporting User Acceptance Testing (UAT) for large enterprise applications (Nice to Have)",
      "Public sector or large enterprise digital transformation experience (Nice to Have)"
    ],
    region: "us",
    howToApply: "Updated Resume\nCurrent Location\nWork Authorization\nAvailability\nExpected Rate\nLinkedIn Profile",
  },
  {
    id: "senior-data-architect-ai",
    requestId: "HYC2026011",
    title: "Senior Data Architect / AI Data Architect",
    location: "Remote within Canada (Occasional travel to Edmonton, Alberta if required)",
    type: "Long-Term Contract",
    description: "We are seeking an experienced Senior Data Architect / AI Data Architect to support enterprise data modernization, AI enablement, and digital transformation initiatives within a large public sector environment. This role will lead architecture strategy, enterprise data platform design, AI-enabled data product development, and secure data integration initiatives across modern cloud and hybrid ecosystems.",
    jobDuties: [
      "Lead the design and implementation of enterprise and solution architectures for modern data platforms and AI-enabled data products",
      "Translate business goals and strategic priorities into scalable, secure, and high-performing data architecture solutions",
      "Define enterprise data models, semantic layers, architecture standards, and best practices",
      "Provide architectural leadership for cloud, hybrid, and modern data ecosystems",
      "Design and support scalable data products within Data Fabric and Data Mesh environments",
      "Define and implement secure data sharing frameworks, integration patterns, data linkage strategies, and interoperability solutions",
      "Support AI-enabled and agentic data solution architectures, orchestration frameworks, and proof-of-concept initiatives",
      "Design architectures supporting machine learning, advanced analytics, and AI-driven data products",
      "Establish and promote best practices for data governance, metadata management, data quality, data security, privacy controls, information management, and secure data exchange",
      "Ensure alignment with enterprise security, compliance, and Responsible AI standards",
      "Support enterprise data strategy and governance initiatives across cloud and hybrid environments",
      "Lead discovery sessions, workshops, architecture reviews, and stakeholder discussions",
      "Collaborate with leadership, architects, engineers, scientists, analysts, and product teams",
      "Present architecture recommendations, roadmaps, and technical strategies to senior stakeholders and steering committees",
      "Facilitate alignment across business, technical, governance, and operational teams",
      "Review solution designs, pipelines, integration strategies, and architecture deliverables for scalability, performance, and optimization",
      "Support modernization initiatives involving cloud migration, AI enablement, and enterprise data transformation",
      "Evaluate emerging technologies and recommend innovative approaches for scalable data delivery",
      "Coach and mentor team members on architecture practices, data governance, and AI-enabled solutions"
    ],
    qualifications: {
      degree: "Degree, Diploma, or Certification in Computer Science, Information Technology, Engineering, Data Management, or related discipline.",
      experience: "5+ Years",
    },
    skillsRequired: [
      "5+ years experience defining technical architecture, data integration, and enterprise solution architectures",
      "5+ years experience designing, planning, implementing, and supporting enterprise infrastructure and data platforms",
      "5+ years experience across multiple architecture domains including business, application, technology, and data architecture",
      "5+ years experience modeling complex business processes and translating them into scalable architecture solutions",
      "3+ years experience communicating complex data and architecture concepts to technical and non-technical stakeholders",
      "Strong experience with enterprise data architecture and cloud data platforms",
      "Experience with Snowflake, Microsoft Azure, Cloudera, or similar big data/cloud platforms",
      "Experience with data integration, metadata management, semantic modeling, and data governance frameworks",
      "Experience with AI-enabled architectures, advanced analytics, machine learning enablement, and agentic frameworks",
      "Experience with secure data sharing, privacy controls, and enterprise data security practices",
      "Experience designing scalable and reusable enterprise data products (Nice to Have)",
      "Experience supporting machine learning, AI, and advanced analytics architectures (Nice to Have)",
      "Experience with Responsible AI principles and governance frameworks (Nice to Have)",
      "Experience with enterprise architecture frameworks such as TOGAF (Nice to Have)",
      "Experience developing training materials and enabling teams on architecture and governance standards (Nice to Have)",
      "Experience working in public sector or highly regulated environments (Nice to Have)",
      "Experience leading workshops, architecture reviews, and stakeholder engagement initiatives (Nice to Have)"
    ],
    region: "us",
    howToApply: "Updated Resume\nCurrent Location\nWork Authorization\nAvailability\nExpected Rate\nLinkedIn Profile",
  },
  {
    id: "business-analyst-banking",
    requestId: "HYI2026003",
    title: "Business Analyst (Banking Domain)",
    location: "Bangalore, India (Work From Office)",
    jobDuties: [
      "Gather, analyze, and document business requirements",
      "Create User Stories, Acceptance Criteria, BRDs, FRDs, and Use Cases",
      "Work closely with business stakeholders and project teams",
      "Conduct workshops and requirement elicitation sessions",
      "Collaborate with US clients and stakeholders to understand business needs",
      "Support Agile ceremonies and backlog management activities",
      "Assist with UAT planning, execution, and issue resolution",
      "Ensure requirements are accurately captured and communicated throughout the project lifecycle"
    ],
    qualifications: {
      degree: "Not specified",
      experience: "7+ Years",
      immediateJoinee: true,
    },
    skillsRequired: [
      "7+ years of Business Analysis experience",
      "Strong Banking / Financial Services domain expertise",
      "Hands-on experience in requirement gathering, analysis, and documentation",
      "Expertise in User Stories, Acceptance Criteria, BRDs, FRDs, and Use Cases",
      "Strong understanding of Agile/Scrum methodologies",
      "Experience working directly with US clients and stakeholders",
      "Proficiency with Jira, Confluence, and related collaboration tools",
      "Excellent communication, analytical, and stakeholder management skills",
      "Experience supporting workshops, requirement sessions, and UAT activities",
      "Experience in digital banking or banking transformation programs (Nice to Have)",
      "Exposure to regulatory and compliance-driven initiatives (Nice to Have)",
      "Strong business process improvement and stakeholder engagement experience (Nice to Have)"
    ],
    region: "india",
  },
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
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
          error = "Please enter a valid portfolio or GitHub URL";
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
      newErrors.portfolio = "Please enter a valid portfolio or GitHub URL";
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

  const uploadResumeWithProgress = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const formDataToUpload = new FormData();
      formDataToUpload.append("resume", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload-resume");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText) as {
            url?: string;
            error?: string;
          };

          if (xhr.status >= 200 && xhr.status < 300 && response.url) {
            setUploadProgress(100);
            resolve(response.url);
            return;
          }

          reject(new Error(response.error || "Resume upload failed."));
        } catch {
          reject(new Error("Resume upload failed."));
        }
      };

      xhr.onerror = () => reject(new Error("Network error while uploading resume."));
      xhr.send(formDataToUpload);
    });

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
        <section className="relative pt-32 pb-32 min-h-[80vh] flex flex-col justify-center overflow-hidden bg-[#030b1e]">
          {/* Background layers - Matching contact page aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
          <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(30,144,255,0.16) 1px, transparent 1px)`,
              backgroundSize: '38px 38px'
            }}
          />

          <div className="relative z-10 w-full max-w-full mx-auto text-center px-4">
            <div className="flex justify-center mb-6">
              <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 backdrop-blur-md">
                <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                Careers
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[900] leading-[1.1] tracking-tight text-white mb-6 font-display">
              Join the team where<br /><span className="text-[#00D4AA]">Talent meets Purpose</span>
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
                          {job.requestId && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1e6fff]/[0.05] text-[#1e6fff]">
                              <span className="font-semibold">Job ID:</span> {job.requestId}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1e6fff]/[0.05] text-[#1e6fff]">
                            <Briefcase className="w-3 h-3" />
                            {job.type || "Full-Time"}
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
                              {job.description || "We are looking for talented professionals to join our team. This role offers excellent growth opportunities and the chance to work on exciting projects."}
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
                                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-none"></span>
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Application Requirements */}
                          {job.howToApply && (
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-blue-600">
                                Application Requirements
                              </h4>
                              <p className="text-sm text-slate-700 leading-relaxed mb-3 font-semibold text-slate-800">
                                Please share suitable profiles with:
                              </p>
                              <ul className="space-y-2">
                                {job.howToApply.split("\n").map((req, idx) => (
                                  <li key={idx} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-none"></span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

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
                    Don&apos;t see the right role?
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
                    Send us an <span className="text-[#00D4AA]">Open Application</span>
                  </h3>
                  <p className="text-slate-400 max-w-sm text-base font-normal leading-relaxed">
                    We&apos;re always on the lookout for exceptional talent. Share your profile and we&apos;ll be in touch.
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
                    {isSubmitting && uploadProgress > 0 && (
                      <p className="mt-2 text-xs text-[#1e6fff] text-center font-medium">
                        Uploading resume... {uploadProgress}%
                      </p>
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
