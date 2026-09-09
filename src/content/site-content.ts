// =============================================================================
// SimpleCube — Centralized Content Configuration
// Source: SimpleCube Website Content Blueprint (homepage + chrome)
// =============================================================================

export const navContent = {
    brand: { name: "SimpleCube" },
    products: [
        { title: "FinXServe", href: "/products/finxserve" },
        { title: "Claim Pioneer", href: "/products/claim-pioneer" },
        { title: "AIRA", href: "/products/aira" },
        { title: "Hyper", href: "/products/hyper" },
    ],
    industries: [
        { title: "Banking", href: "/industries/banking" },
        { title: "Wealth & Asset Management", href: "/industries/wealth-asset-management" },
        { title: "Insurance", href: "/industries/insurance" },
        { title: "Transportation & Logistics", href: "/industries/transportation-logistics" },
        { title: "Education", href: "/industries/education" },
    ],
    // Top-menu service titles aligned to Content Blueprint §2 (routes unchanged)
    services: [
        {
            category: "Digital Transformation",
            isBold: true,
            href: "/services/digital-transformation",
            items: [
                { title: "Applied AI", href: "/services/digital-transformation/applied-ai" },
                { title: "Data Intelligence", href: "/services/digital-transformation/data-intelligence" },
                { title: "Cloud Migration", href: "/services/digital-transformation/cloud-migration" },
            ]
        },
        {
            category: "Salesforce Integrations & Development",
            isBold: true,
            href: "/services/enterprise-platforms/salesforce",
            items: [
                { title: "Salesforce", href: "/services/enterprise-platforms/salesforce" },
                { title: "Microsoft Services", href: "/services/enterprise-platforms/microsoft-services" },
                { title: "AWS Cloud", href: "/services/enterprise-platforms/aws-cloud-services" },
            ]
        },
        {
            category: "Product Development",
            isBold: true,
            href: "/services/product-engineering",
            items: []
        },
        {
            category: "Custom Software Development",
            isBold: true,
            href: "/services/strategy-consulting",
            items: []
        },
    ],
    insights: [
        { title: "Case Studies", href: "/insights/case-studies" },
        { title: "Podcast", href: "/insights/podcast" },
        { title: "Blogs", href: "/insights/blogs" },
        { title: "News", href: "/insights/news" },
    ],
    about: [
        { title: "About Us", href: "/about" },
        { title: "Our Leadership", href: "/about#leadership" },
        { title: "Careers", href: "/careers" },
    ],
    contact: [
        { title: "Contact Us", href: "/contact" },
    ],
};

// ── Hero Carousel Slides (Blueprint §1 + adapted variants) ───────────────────
// Slide 0 = primary blueprint copy. Slides 1–2 = SimpleCube variants.
export const heroSlides = [
    {
        badge: "Boutique Software Delivery",
        headline: "Complex problems, solved simply.",
        highlightedWords: ["solved simply"],
        subheadline:
            "SimpleCube delivers custom software, Salesforce integrations, and digital transformation solutions. We combine elite technical expertise with a lean, Agile approach to bring your vision to market faster and at a lower cost.",
        stats: [
            { value: "50%", label: "Less Planning\nTime" },
            { value: "40%", label: "Quicker\nDelivery" },
            { value: "30%", label: "Faster\nPOC" },
        ],
    },
    {
        badge: "Custom Software & Salesforce",
        headline: "Custom Software, Salesforce, and Digital Transformation.",
        highlightedWords: ["Digital Transformation"],
        subheadline:
            "SimpleCube turns complex operational bottlenecks into streamlined digital workflows — from bespoke applications to CRM integrations and legacy modernization.",
        stats: [
            { value: "70%", label: "Faster Product\nLaunch" },
            { value: "50%", label: "Lower Cost of\nOwnership" },
            { value: "45+", label: "Happy\nClients" },
        ],
    },
    {
        badge: "Agile Delivery Partners",
        headline: "Lean Teams. Faster Delivery. Lower Cost.",
        highlightedWords: ["Faster Delivery"],
        subheadline:
            "Our focused Texas team pairs senior engineering with Agile sprint cycles so you get enterprise-grade execution without bloated agency overhead.",
        stats: [
            { value: "20–30%", label: "Productivity\nIncrease" },
            { value: "45%", label: "Reduction in\nManual Effort" },
            { value: "50+", label: "Cloud & AI\nExperts" },
        ],
    },
];

export const heroCtas = {
    primary: { label: "Let's Simplify", href: "/contact" },
    secondary: { label: "Explore Our Services", href: "/services" },
};

// ── Trusted By ───────────────────────────────────────────────────────────────
export const trustContent = {
    label: "Clients that chose depth over headcount",
    logos: [
        { name: "NASA Federal CU", src: "/logos/nasa-fcu.png" },
        { name: "Apple Federal CU", src: "/logos/apple-fcu.png" },
        { name: "PenFed", src: "/logos/Replacement/PenFed.png" },
        { name: "Victory Capital", src: "/logos/victory-capital.png" },
        { name: "Baker Hill", src: "/logos/BakerHill.png", scale: 1.2, margin: "0 14px" },
        { name: "Exeter Finance", src: "/logos/Replacement/Exeter.png" },
        { name: "Abdul Kalam School", src: "/Final client logos_Eazyschool/Final client logos_Eazyschool/Adbul.png", scale: 1.8 },
        { name: "Bank of Guam", src: "/logos/bank-of-guam.svg" },
        { name: "Claim Assist", src: "/logos/Replacement/Claim_Assist.png" },
        { name: "AAA", src: "/logos/AAA_logo.png", scale: 1.4 },
        { name: "Axos Bank", src: "/logos/AXOS.svg" },
        { name: "Dover Federal", src: "/logos/Dover_FCU.svg" },
        { name: "GESA Credit Union", src: "/logos/GESA_Credit_Union.svg" },
        { name: "Gulf Winds", src: "/logos/Gulf_Winds.svg" },
        { name: "Joseph School", src: "/Final client logos_Eazyschool/Final client logos_Eazyschool/Joseph.png", scale: 1.8 },
        { name: "Service Credit Union", src: "/logos/Service_Credit_Union.svg" },
        { name: "Sunset Science Park", src: "/logos/Sunset_Science_Park.svg" },
        { name: "TCM Bank", src: "/logos/Replacement/TCM_Bank.png" },
        { name: "Thomaston Savings Bank", src: "/logos/Thomaston.svg" },
        { name: "Tresl", src: "/logos/Tresl.svg" },
        { name: "Veteran", src: "/logos/Veteran_Loan_Fund.png", scale: 1.5 },
        { name: "WECU", src: "/logos/WECU.svg" },
        { name: "3rd Millennium Classrooms", src: "/logos/Additional/3rd_Millennium_Classrooms.svg" },
        { name: "Amalgam", src: "/logos/Additional/Amalgam.svg" },
        { name: "Guam Power Authority", src: "/logos/Additional/Guam_Power_Authority.svg" },
        { name: "Guam Waterworks Authority", src: "/logos/Additional/Guam_Waterworks_Authority.svg" },
        { name: "Leonardo247", src: "/logos/Replacement/leonardo.png" },
        { name: "NLB Services", src: "/logos/Additional/Nlb_services.svg" },
        { name: "Vivekananda School", src: "/Final client logos_Eazyschool/Final client logos_Eazyschool/Vivekananda.png", scale: 1.8 },
        { name: "Innova Solutions", src: "/logos/Additional/Sypps_innova_solutions.svg" },
        { name: "People Fund", src: "/logos/Additional/People_fund.png", scale: 1.6 },
        { name: "Transtech IT Staffing", src: "/logos/Replacement/TransTech.png", scale: 2.2 },
        { name: "USGB", src: "/logos/Replacement/USGB.png" },
        { name: "Fiserv", src: "/logos/Additional/fiserv-logo-orange-ff6600.svg" },
        { name: "Always Track", src: "/logos/Additional/Always_Track.png" },
        { name: "Sarojini School", src: "/Final client logos_Eazyschool/Final client logos_Eazyschool/sarojini.png", scale: 1.8 },
        { name: "Westcare", src: "/logos/Westcare.png", scale: 1.6 },
        { name: "Delta", src: "/logos/delta.png", scale: 1.4 },
        { name: "Allcat", src: "/logos/Allcat.png" },
    ],
};

// ── Challenges ───────────────────────────────────────────────────────────────
export const challengesContent = {
    label: "",
    headline: "",
    sub: "",
    challenges: [
        {
            icon: "Construction",
            title: "Off-the-Shelf Gaps",
            description: "Packaged software rarely fits nuanced business rules. We architect bespoke solutions that align to how your teams actually operate.",
        },
        {
            icon: "Clock",
            title: "Bloated Agency Timelines",
            description: "Large agencies add layers of account managers and slow handoffs. Our lean Agile sprints keep senior engineers close to the work.",
        },
        {
            icon: "DollarSign",
            title: "Inflated Delivery Costs",
            description: "High overhead drives up quotes without improving outcomes. SimpleCube’s boutique model reduces cost while accelerating time-to-market.",
        },
        {
            icon: "Scale",
            title: "Legacy System Drag",
            description: "Outdated infrastructure and manual processes stall growth. We modernize systems and digitize workflows without disrupting operations.",
        },
        {
            icon: "Brain",
            title: "Disconnected Tools & Data",
            description: "CRM, APIs, and internal systems often stay siloed. We integrate Salesforce and third-party platforms for unified visibility and automation.",
        },
    ],
};

// ── Approach / Metrics (Blueprint §4 — Technical Expertise & Agile) ──────────
export const approachContent = {
    label: "Technical Expertise & Agile Methodology",
    headline: "Agile Delivery Model",
    sub: "We don't just write code; we engineer scalable solutions. Our stack and Agile SDLC culture ensure high performance, security, and enterprise scalability with continuous client touchpoints.",
    metrics: [
        { value: 50, suffix: "%", label: "Reduction in Development Time" },
        { value: 30, suffix: "%", label: "Faster POC & Prototype Stages" },
        { value: 50, suffix: "%", label: "Less Planning Time" },
    ],
    cta: { label: "See Our Approach", href: "/about" },
};

// ── Services (Blueprint §2) ──────────────────────────────────────────────────
export const servicesContent = {
    label: "Our Services",
    headline: "We turn complexity into digital workflows.",
    callOutContent: "Custom software, Salesforce, product development, and digital transformation — delivered with boutique precision.",
    metrics: [
        { value: "15+", label: "Years of platform \npartnerships" },
        { value: "220+", label: "Enterprise applications \ndelivered" },
        { value: "45+", label: "Clients across \n5 industries" }
    ],
    services: [
        {
            num: "01",
            title: "Custom Software Development",
            description:
                "Off-the-shelf software rarely fits. We architect bespoke solutions — digital applications, internal portals, and data-routing systems — aligned to your business rules and operational goals.",
            tags: ["Bespoke Applications", "Internal Portals", "Data Routing", "Business Rules", "Full-Stack Dev", "Integrations"],
            image: "/images/Our_Services/Strategy_Consulting_no_BG.svg",
            href: "/services/strategy-consulting",
        },
        {
            num: "02",
            title: "Salesforce Integrations & Development",
            description:
                "Maximize your CRM investment. Complex Salesforce ecosystems, custom lead routing, state lookups, and API connections that automate sales workflows and unify data visibility.",
            tags: ["Salesforce", "Lead Routing", "API Integrations", "Automation", "CRM Optimization", "Unified Data"],
            image: "/images/Our_Services/2_Enterprise_Platforms.png",
            href: "/services/enterprise-platforms/salesforce",
        },
        {
            num: "03",
            title: "Product Development",
            description:
                "From ideation to launch, we partner across the full SDLC. Iterative delivery gets your MVP to market quickly, then supports real-world feedback and data-driven enhancements.",
            tags: ["SDLC", "MVP", "Full-Stack", "QA & Automation", "DevOps", "Iteration"],
            image: "/images/Our_Services/Product_Engineering_no_BG.png",
            href: "/services/product-engineering",
        },
        {
            num: "04",
            title: "Digital Transformation",
            description:
                "Legacy systems slowing you down? We digitize manual processes, modernize infrastructure, and migrate data to secure environments to future-proof your business.",
            tags: ["Legacy Modernization", "Process Digitization", "Cloud Migration", "Data Security", "Infrastructure", "Future-Proofing"],
            image: "/images/Our_Services/Digital_Transformation_no_BG.svg",
            href: "/services/digital-transformation",
        },
    ],
};

// ── Products ─────────────────────────────────────────────────────────────────
export const productsContent = {
    label: "Our Products",
    headline: "Product innovation is in our DNA.",
    subheadline: "Seven products born from decades of enterprise delivery, proving our domain knowledge extends beyond implementation.",
    rightCallout: "Two of our flagship products were acquired by industry leaders — Fiserv and SavvyMoney. A testament to what enterprise depth produces when it becomes a product.",
    logos: [
        { industry: "LENDING", name: "iLENDX", src: "/images/Product_Logos/Compressed/iLendX.png", acquiredBy: "Fiserv", acquiredByUrl: "https://www.fiserv.com/" },
        { industry: "FINANCIAL INSTITUTION", name: "CreditSnap", src: "/images/Product_Logos/Compressed/Credit_Snap.png", acquiredBy: "SavvyMoney", acquiredByUrl: "https://www.savvymoney.com/" },
        { industry: "FINANCIAL INSTITUTION", name: "FinXServe", src: "/images/Product_Logos/Compressed/FinXServe.png" },
        { industry: "INSURANCE", name: "Claim Pioneer", src: "/images/Product_Logos/PNG/ClaimPioneerWhiteNew.png" },
        { industry: "FINANCIAL INSTITUTION", name: "AIRA", src: "/images/Product_Logos/Compressed/AIRA.png" },
        { industry: "WEALTH MANAGEMENT", name: "Hyper", src: "/images/Product_Logos/Compressed/Hyper.png" },
        { industry: "EDUCATION", name: "EazySchool", src: "/images/Product_Logos/Compressed/EazySchool.png" },
    ],
    products: [
        {
            num: "01",
            title: "FinXServe",
            tags: ["Financial Institutions"],
            description: "Salesforce-native omnichannel experience orchestration layer that sits above your existing core banking system and underwriting platforms to unify and streamline consumer acquisition for loans, cards and deposits.",
            image: "/images/Product_Images/FINXSERVE.gif",
            href: "/products/finxserve",
        },
        {
            num: "02",
            title: "Claim Pioneer",
            tags: ["Insurance"],
            description: "End-to-end claims automation from intake to closure. AI-driven assignment, mobile-first field execution and real-time visibility into every step of the claim's lifecycle, all in one connected workflow.",
            image: "/images/Product_Images/Claim_pioneer.gif",
            href: "/products/claim-pioneer",
        },
        {
            num: "03",
            title: "AIRA",
            tags: ["Financial Institutions", "Insurance"],
            description: "The first enterprise-ready AI platform combining autonomous reasoning, compliance-first design and OneAPI integration into one scalable platform institutions can trust for mission-critical decisions.",
            image: "/images/Product_Images/Compressed/AIRA.gif",
            href: "/products/aira",
        },
        {
            num: "04",
            title: "Hyper",
            tags: ["Wealth Management"],
            description: "A digital investment journey platform that takes investors from goal discovery to personalized portfolio recommendations helping advisors scale AUM and reduce acquisition costs.",
            image: "/images/Product_Images/Hyper.gif",
            href: "/products/hyper",

        },
    ],
};

// ── Case Studies ─────────────────────────────────────────────────────────────
export const caseStudiesContent = {
    label: "Case Studies",
    headline: "From challenge to transformation.",
    highlightedWord: "transformation.",
    sub: "Every engagement started with trust. Every outcome is how we honored it.",
    studies: [
        {
            title: "*Autonomous Lending Experience*\nwith FinXServe & Agentforce",
            description: "Built an AI-driven lending journey that automates document processing, decisioning and\u00A0approvals.",
            image: "/images/Case_Study/1.png",
            href: "/insights/case-studies/autonomous-lending-experiences",
        },
        {
            title: "Modernizing Contact Centers\nwith *Intelligent IVR Self-Service*",
            description: "Transformed legacy IVR into a Smart Customer Engagement Interaction\u00A0System.",
            image: "/images/Case_Study/2.png",
            href: "/insights/case-studies/intelligent-ivr-self-service",
        },
        {
            title: "*Autonomous Freight Operations*\nwith GenAI",
            description: "Reduced load creation time by 98% and costs by 99.5% using GenAI-driven\u00A0automation.",
            image: "/images/Case_Study/3.png",
            href: "/insights/case-studies/autonomous-freight-operations",
        },
        {
            title: "*Faster Loan Processing with*\nAgentforce Document Intelligence",
            description: "Built an AI-powered lending concierge that accelerates loan processing and\u00A0approvals.",
            image: "/images/Case_Study/4.png",
            href: "/insights/case-studies/instant-loan-processing",
        },
        {
            title: "*Enterprise CRM Modernization*\non Microsoft Cloud",
            description: "Transformed a legacy CRM into a cloud-native Microsoft ecosystem with zero\u00A0downtime.",
            image: "/images/Case_Study/5.png",
            href: "/insights/case-studies/microsoft-crm-modernization",
        },
        {
            title: "Rapid Reverse-Engineered\n*Website Migration*",
            description: "Delivered a full website migration in 2 months with zero downtime—without backend\u00A0access.",
            image: "/images/Case_Study/6.png",
            href: "/insights/case-studies/aem-migration",
        },
        {
            title: "*AWS-Powered Document*\nPlatform Transformation",
            description: "Saved $500K annually and improved performance by 5× with serverless AWS\u00A0modernization.",
            image: "/images/Case_Study/7.png",
            href: "/insights/case-studies/hyniva-leverages-aws-half-a-million-dollars-savings-annually",
        },
        {
            title: "*Core Banking Transformation*\non Microsoft",
            description: "Accelerated loan approvals by 50% and reduced operational costs by 30% with Microsoft-led\u00A0modernization.",
            image: "/images/Case_Study/8.png",
            href: "/insights/case-studies/core-banking-transformation",
        },
    ],
};

// ── Why SimpleCube (Blueprint §3) ────────────────────────────────────────────
export const whyHynivaContent = {
    topBox: {
        headline: "Why SimpleCube?",
        highlightedWord: "SimpleCube?",
        stats: [
            { value: "220+", label: "Applications\nDelivered" },
            { value: "45+", label: "Enterprise\nClients" },
            { value: "250+", label: "Certified\nExperts" }
        ],
        description: "Bigger agencies often mean bloated budgets, account shuffling, and communication silos. SimpleCube was built to be fundamentally different — boutique attention with enterprise-grade execution.",
        boldWords: ["fundamentally different", "boutique attention"],
        cta: { label: "Know More →", href: "/about" }
    },
    bottomBox: [
        {
            icon: "UsersRound",
            title: "Boutique Attention",
            description: "Our focused team size means you work\ndirectly with senior developers and\nleadership — personalized focus on\nyour project."
        },
        {
            icon: "Zap",
            title: "Cost-Effective Agility",
            description: "Lean structure reduces overhead.\nCoupled with Agile SDLC, we deliver\nrapid iterations and faster\ntime-to-market."
        },
        {
            icon: "Activity",
            title: "Full-Stack Mastery",
            description: "Deep expertise across Angular, React,\nNode.js, and Java — the right tool for\nyour specific technical challenge."
        },
        {
            icon: "Globe2",
            title: "Texas Roots",
            description: "Founded and operated in Texas, we\nbecome a seamless extension of your\nteam — enterprise execution with\nsmall-team partnership."
        }
    ]
};

// ── Expertise Section (for Services/About pages) ─────────────────────────────
export const expertiseContent = {
    topBox: {
        headline: "Technical Expertise\n& Agile Delivery",
        highlightedWord: "Agile Delivery",
        stats: [
            { value: "250+", label: "Certified\nProfessionals" }
        ],
        description: "We don't just write code; we engineer scalable solutions. Our stack is curated for high performance, security, and enterprise scalability — delivered with continuous client touchpoints.",
        boldWords: [],
        cta: { label: "About Us", href: "/about" },
        imagePlaceholder: "/images/expertise/professionals.png"
    },
    bottomBox: [
        {
            icon: "Brain",
            title: "Frontend Technologies",
            description: "Highly responsive, intuitive interfaces using Angular and React — a flawless experience across devices and browsers.",
            imagePlaceholder: "/images/expertise/ai-talent.png"
        },
        {
            icon: "Layers",
            title: "Backend & Architecture",
            description: "Robust server-side logic and APIs with Java, Node.js, and enterprise frameworks designed for heavy data loads and concurrency.",
            imagePlaceholder: "/images/expertise/platform-specialists.png"
        },
        {
            icon: "Briefcase",
            title: "Salesforce & CRM",
            description: "Complex Salesforce ecosystems, custom routing, and third-party integrations that automate workflows and unify data visibility.",
            imagePlaceholder: "/images/expertise/industry-experience.png"
        },
        {
            icon: "GraduationCap",
            title: "Agile SDLC Culture",
            description: "Continuous integration, rapid sprint cycles, and regular client touchpoints — transparency that prevents scope creep.",
            imagePlaceholder: "/images/expertise/learning-culture.png"
        }
    ]
};

// ── Industries ───────────────────────────────────────────────────────────────
export const industriesContent = {
    label: "Industries We Serve",
    headline: "Deep domain expertise,\nbuilt over decades.",
    highlightedWord: "decades.",
    sub: "We know your compliance requirements, your legacy constraints and your competitive pressures — not from research, but from years inside these industries.",
    industries: [
        { icon: "Landmark", title: "Banking & Credit Unions" },
        { icon: "TrendingUp", title: "Wealth & Asset Management" },
        { icon: "Shield", title: "Insurance" },
        { icon: "Truck", title: "Transportation & Logistics" },
        { icon: "GraduationCap", title: "Education" },
    ],
};

// ── Process Timeline ─────────────────────────────────────────────────────────
export const processContent = {
    label: "How We Work",
    headline: "From discovery to delivery — no surprises",
    sub: "We say what we do and do what we say. Our structured delivery model eliminates bureaucracy and keeps you directly connected to our experts.",
    steps: [
        {
            num: 1,
            title: "Discovery",
            description: "We understand your business goals, existing systems and constraints before proposing anything.",
        },
        {
            num: 2,
            title: "Strategy & Scope",
            description: "A clear roadmap with transparent cost, timeline and risk — no padded estimates, no surprises.",
        },
        {
            num: 3,
            title: "Agile Delivery",
            description: "Direct access to our engineers and SMEs. Weekly demos. Decisions made fast.",
        },
        {
            num: 4,
            title: "Launch & Scale",
            description: "We don't hand off and disappear — we support, optimize and grow with you.",
        },
    ],
};

// ── Tech Stack ───────────────────────────────────────────────────────────────
export const techContent = {
    label: "Our Technology",
    headline: "Built on the platforms you already trust",
    sub: "We're experts in the tools your team uses — Salesforce, Microsoft, AWS, Azure — so there's no ramp-up time and no translation layer between your goals and our work.",
    certification: "ISO 27001:2013 Certified",
    groups: [
        { title: "CRM & ERP", items: ["Salesforce FSC", "MS Dynamics 365", "Business Central", "Power Platform"] },
        { title: "Cloud", items: ["Microsoft Azure", "Amazon AWS", "Google Cloud", "Azure DevOps"] },
        { title: "AI & Data", items: ["Copilot", "ChatGPT", "Claude", "Antigravity"] },
        { title: "Frontend", items: ["React / Angular", "React Native / Flutter", "Swift / Kotlin", "Figma / UX Design"] },
        { title: "Backend", items: ["Java / Node.js / Python", "ASP.NET / TypeScript", "Microservices", "REST / GraphQL APIs", "Mendix"] },
        { title: "QA & DevOps", items: ["Selenium / ContextQA", "CI/CD Pipelines", "Docker / Kubernetes", "Genesys Contact Center"] },
    ],
};

// ── Technology & Partners ────────────────────────────────────────────────────
export const techPartnersContent = {
    label: "TECHNOLOGY & PARTNERS",
    headline: "Built on the platforms you already trust",
    sub: "Our teams are certified and experienced across the platforms that power modern enterprises. So there's no ramp-up time and no translation layer between your goals and our delivery.",
    partners: [
        { name: "Salesforce", src: "/images/Partners_Logo/salesforce white.png" },
        { name: "AWS", src: "/images/Partners_Logo/Amazon_Web_Services_Logo.svg.png" },
        { name: "Microsoft", src: "/images/Partners_Logo/Microsoft_logo_(2012).svg.png" },
        { name: "Genesys", src: "/images/Partners_Logo/GENESYS_logo_FullColor_rgb_png-1024x189.webp" },
        { name: "Adobe", src: "/images/Partners_Logo/Adobe_Corporate_Logo.png" }
    ],
    hexagons: [
        {
            title: "Salesforce",
            items: ["Salesforce FSC", "MS Dynamics 365", "Power Platform", "Genesys"],
            color: "bg-[#1F36A4]",
            logo: "/images/Partners_Logo/salesforce white.png"
        },
        {
            title: "AWS",
            items: ["Microsoft Azure", "Amazon AWS", "Google Cloud"],
            color: "bg-[#3886CE]",
            logo: "/images/Partners_Logo/Amazon_Web_Services_Logo.svg.png"
        },
        {
            title: "Microsoft",
            items: ["Copilot / Azure OpenAI", "Salesforce Data Cloud", "Python / ML", "Data Lake / Analytics"],
            color: "bg-[#064834]",
            logo: "/images/Partners_Logo/Microsoft_logo_(2012).svg.png"
        },
        {
            title: "Genesys",
            items: ["React / Angular", "React Native / Flutter", "Swift / Kotlin", "UI/UX Design"],
            color: "bg-[#0D9488]",
            logo: "/images/Partners_Logo/GENESYS_logo_FullColor_rgb_png-1024x189.webp"
        },
        {
            title: "Adobe",
            items: ["ASP.Net / TypeScript", "Java / Node.js / Python / PHP", "Microservices", "REST / GraphQL APIs"],
            color: "bg-[#1e1b4b]",
            logo: "/images/Partners_Logo/Adobe_Corporate_Logo.png"
        },
        {
            title: "Salesforce",
            items: ["Salesforce FSC", "MS Dynamics 365", "Power Platform", "Genesys"],
            color: "bg-[#1F36A4]",
            logo: "/images/Partners_Logo/salesforce white.png"
        }
    ],
};

// ── Voice of Customer ────────────────────────────────────────────────────────
export const vocContent = {
    label: "Customer Stories",
    headline: "In their own words.",
    highlightedWords: ["own words."],
    testimonials: [
        {
            industry: "Credit Union",
            quote: "Hyniva does a really good job of integrating with the folks they work with. They’re more focused, they’re realizing what you need, and they’re helping you meet your goals. Some of the smaller, more boutique-type companies can add real value to you, and Hyniva is a great example of that kind of partnership.",
            author: "Rickey Burks",
            designation: "Former SVP, CTO & CIO",
            company: "USAA",
            image: "/images/voc/rickey_burks.jpg",
            logo: "/images/voc/USAA_logo.png",
            result: "Shared strategic insights on technology partnerships and ecosystem integration on <span class='text-[#3886CE] font-semibold'>CU NEXT Podcast.</span>",
            videoUrl: "https://hyniva-web.s3.us-east-1.amazonaws.com/site-videos/rickey_burks_testimonial.mp4",
            hoverVideoUrl: "https://hyniva-web.s3.us-east-1.amazonaws.com/site-videos/rickey-testimonial.mp4",
            videoQuote: "Big is not always better. What matters is finding the right strategic partner, one that integrates seamlessly with your existing ecosystem and grows with you.",
        },
        {
            industry: "Lending & Fintech",
            quote: "Hyniva demonstrated a clear understanding of our goals and helped us transform a manual, fragmented prequalification process into an intuitive, algorithm-driven experience. The resulting loan application process is not only faster but built on\u00A0a\u00A0scalable, cost-efficient stack that positions us perfectly for\u00A0future\u00A0growth.",
            author: "Gustavo Lasala",
            designation: "President and CEO",
            company: "PeopleFund",
            image: "/images/voc/gustavo_transparent.png",
            logo: "/logos/Additional/People_fund.png",
            result: "Built an intelligent lending platform that reduced loan prequalification from <span class='text-[#3886CE] font-semibold'>days to minutes.</span>",
            caseStudyHref: "/insights/case-studies/scaling-a-secure-pre-qualification-loan-routing-platform-with-intelligent-automation",
        },
        {
            industry: "Transportation & Logistics",
            quote: "We’ve partnered with Hyniva for the past three years. Their expertise in software management and development has significantly enhanced our operations, allowing us to focus on\u00A0our\u00A0core business. The team's dedication to maintaining and improving our systems has made a remarkable impact on our growth and efficiency.",
            author: "Jose Zamora",
            designation: "Founder and CEO",
            company: "Always Track",
            image: "/images/voc/jose_zamora.png",
            logo: "/logos/Additional/Always_Track.png",
            result: "Reduced manual freight paperwork through Intelligent Document Processing with <span class='text-[#3886CE] font-semibold'>99.69% accuracy.</span>",
            caseStudyHref: "/insights/case-studies/autonomous-freight-operations",
        },
        {
            industry: "Education",
            quote: "Hyniva demonstrated exceptional ownership and consistently delivered high\u2011quality work even as our requirements evolved. Their focus on creating a modular, future\u2011ready architecture has enabled us to grow the platform without significant rework. They have truly become a trusted long\u2011term product partner.",
            author: "Rob Kraft",
            designation: "Founder and CEO",
            company: "CA Infosec",
            image: "/images/voc/Rob_kraft_transparent.png",
            logo: "/logos/Additional/CA_infosec.png",
            result: "Transformed fragmented academic operations into a <span class='text-[#3886CE] font-semibold'>single unified education platform</span> that connected every stakeholder.",
            caseStudyHref: "https://www.hyniva.com/insights/case-studies/education-platform-engineering",
        },
    ]
};

// ── Testimonials ─────────────────────────────────────────────────────────────

export const testimonialsContent = {
    testimonials: [
        {
            quote: "Hyniva doesn't feel like a vendor — they feel like a partner who genuinely cares about our outcomes. The direct access to their leadership made every decision faster and every result better.",
            author: "Chief Technology Officer",
            company: "Regional Financial Institution",
        },
        {
            quote: "Their AI-first approach transformed our delivery pipeline. We went from monthly releases to weekly deployments with significantly fewer defects. The ROI was immediate and measurable.",
            author: "VP of Engineering",
            company: "Fortune 500 Insurance Provider",
        },
    ],
};

// ── Stats ────────────────────────────────────────────────────────────────────
export const statsContent = {
    stats: [
        { value: "20+", label: "Years of Experience" },
        { value: "$500K+", label: "Annual Client Savings" },
        { value: "50+", label: "Cloud & AI Experts" },
        { value: "5", label: "Products in Market" },
    ],
};

// ── CTA (Blueprint §6) ───────────────────────────────────────────────────────
export const ctaContent = {
    label: "Let's Talk",
    headline: "Ready to Build Something Incredible?",
    highlightedWord: "Incredible?",
    sub: "Schedule a free technical discovery call with our leadership team today. Let's discuss your unique challenges and map out a custom digital strategy.",
    cta: { label: "Schedule a free consultation", href: "/contact" },
};

// ── Footer ───────────────────────────────────────────────────────────────────
export const footerContent = {
    description: "Founded and operated in Texas, SimpleCube is a boutique software delivery partner — custom software, Salesforce integrations, and digital transformation with lean, Agile execution.",
    sections: [
        {
            title: "Services",
            links: [
                { title: "Digital Transformation", href: "/services/digital-transformation" },
                { title: "Salesforce Integrations & Development", href: "/services/enterprise-platforms/salesforce" },
                { title: "Product Development", href: "/services/product-engineering" },
                { title: "Custom Software Development", href: "/services/strategy-consulting" },
            ],
        },
        // Products footer column temporarily hidden from this build
        // {
        //     title: "Products",
        //     links: [
        //         { title: "FinXServe", href: "/products/finxserve" },
        //         { title: "Claim Pioneer", href: "/products/claim-pioneer" },
        //         { title: "AIRA", href: "/products/aira" },
        //         { title: "Hyper", href: "/products/hyper" },
        //     ],
        // },
        {
            title: "Company",
            links: [
                { title: "About SimpleCube", href: "/about" },
                // { title: "Case Studies", href: "/insights/case-studies" },
                { title: "Careers", href: "/careers" },
                // { title: "Privacy Policy", href: "/privacy-policy" },
            ],
        },
    ],
    offices: [
        {
            country: "United States",
            address: "9901 I-10 W, Suite 800,\nSan Antonio, Texas - 78260",
        },
        // India office temporarily hidden from this build
        // { country: "India", address: "The Cube Karle Town Center, 5th Floor,\nNagavara Village, Bengaluru, KA - 560045" },
    ],
    linkedin: "https://www.linkedin.com/company/simplecube-llc",
    email: "kvjadapolu@simplecube.co",
    phone: "+1-210-913-3929",
};

// ── FAQ (commented out on homepage; copy updated for SimpleCube) ─────────────
export const faqContent = [
    {
        question: "What is SimpleCube?",
        answer: "SimpleCube is a Texas-based boutique software development agency that delivers custom software, Salesforce integrations, product development, and digital transformation. We combine elite technical expertise with a lean, Agile approach so businesses get enterprise-level execution with personalized partnership."
    },
    {
        question: "Why do organizations choose SimpleCube as a technology partner?",
        answer: "Organizations choose SimpleCube to avoid bloated agency budgets, account shuffling, and communication silos. Our focused team works directly with senior developers and leadership, delivering faster iterations at a lower cost while staying accountable from discovery through launch."
    },
    {
        question: "How can enterprises accelerate digital transformation initiatives?",
        answer: "Successful digital transformation requires digitizing manual processes, modernizing outdated infrastructure, and migrating data to secure environments. SimpleCube guides organizations through that journey with practical engineering, integrations, and Agile delivery that moves initiatives from strategy to working software faster."
    },
    {
        question: "What custom software does SimpleCube build?",
        answer: "We architect bespoke solutions from the ground up — multi-stage digital applications, internal portals, and complex data-routing systems — so the final product aligns with your business rules and operational goals rather than forcing you into off-the-shelf constraints."
    },
    {
        question: "How does SimpleCube work with Salesforce?",
        answer: "We specialize in complex Salesforce ecosystems, custom lead routing, advanced state-lookup parameters, and mapping table designs. By connecting Salesforce with internal tools and third-party APIs, we automate sales workflows and provide unified data visibility across the organization."
    },
    {
        question: "How can enterprises accelerate software delivery?",
        answer: "Accelerating delivery requires more than adding developers. SimpleCube’s Agile framework uses continuous integration, rapid sprint cycles, and regular client touchpoints to prevent scope creep and keep the product aligned with evolving business needs — without large-agency overhead."
    },
    {
        question: "What technologies does SimpleCube use?",
        answer: "Our stack is curated for performance, security, and scalability. Frontend work centers on Angular and React; backend and architecture use Java, Node.js, and other enterprise-grade frameworks designed for heavy data loads and concurrency."
    },
    {
        question: "What makes a digital transformation initiative successful?",
        answer: "Successful initiatives align technology with business objectives, customer needs, and operational priorities. Combining modern platforms, process automation, and change-ready delivery helps create sustainable outcomes — the approach SimpleCube brings to every engagement."
    },
    {
        question: "How can organizations build and launch digital products faster?",
        answer: "From ideation to launch, we partner across the full Software Development Life Cycle. Our iterative process helps your MVP reach the market quickly, then supports real-world feedback and rapid, data-driven feature enhancements."
    },
    {
        question: "Where is SimpleCube based?",
        answer: "SimpleCube is founded and operated in Texas. We are a close-knit collective of software engineers, CRM specialists, and product strategists — built to deliver enterprise-level technical execution with the dedicated partnership of a small team."
    }
];
