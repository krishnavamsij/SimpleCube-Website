// =============================================================================
// Hyniva — Centralized Content Configuration
// =============================================================================

export const navContent = {
    brand: { name: "Hyniva" },
    products: [
        { title: "AIRA", href: "/aira", description: "Intelligent automation for financial services with reasoning agents, compliance-by-design, and scalable architecture." },
        { title: "FinXserve", href: "/finxserve", description: "Empowers lenders to launch faster, operate smarter, and deliver frictionless experiences." },
        { title: "Claim Pioneer", href: "/claim-pioneer", description: "Automates end-to-end claim assessment — speed, transparency, and precision." },
        { title: "Hyper", href: "/hyper", description: "Portfolio planner for well-informed investment decisions." },
    ],
    industries: [
        { title: "Banking", href: "/banking" },
        { title: "Wealth & Asset Management", href: "/wealth" },
        { title: "Insurance", href: "/insurance" },
        { title: "Transportation & Logistics", href: "/transportation" },
        { title: "Education", href: "/education" },
    ],
    services: [
        { title: "Digital Transformation", href: "/digital-transformation" },
        { title: "Salesforce", href: "/salesforce" },
        { title: "Microsoft Services", href: "/microsoft" },
        { title: "AWS Cloud", href: "/aws" },
        { title: "Applied AI", href: "/ai" },
        { title: "Data Intelligence", href: "/data" },
        { title: "Product Development", href: "/product-dev" },
        { title: "IT Strategy", href: "/it-strategy" },
        { title: "Cloud Migration", href: "/cloud" },
    ],
    insights: [
        { title: "Case Studies", href: "/case-studies" },
        { title: "Blog", href: "/blog" },
    ],
    about: [
        { title: "About Us", href: "/about" },
        { title: "Our Leadership", href: "/about#leadership" },
        { title: "Careers", href: "/careers" },
    ],
};

// ── Hero Carousel Slides ─────────────────────────────────────────────────────
export const heroSlides = [
    {
        badge: "AI-Powered Software Delivery",
        headline: "Deliver More With the Same Cost",
        highlightedWords: ["More", "Same Cost"],
        subheadline:
            "At Hyniva, we engineer AI-powered delivery models that accelerate timelines while delivering higher quality and measurable impact.",
        stats: [
            { value: "50%", label: "Less Planning Time" },
            { value: "40%", label: "Quicker Delivery" },
            { value: "30%", label: "Faster POC" },
        ],
    },
    {
        badge: "Technology Services & Products",
        headline: "Build in Weeks, Not Months",
        highlightedWords: ["Weeks", "Months"],
        subheadline:
            "From legacy modernization to AI-powered products, Hyniva helps organizations build faster, operate smarter, and scale with confidence.",
        stats: [
            { value: "70%", label: "Faster Product Launch" },
            { value: "50%", label: "Lower Cost of Ownership" },
            { value: "30+", label: "Happy Clients" },
        ],
    },
    {
        badge: "Outcome-Driven Engineering",
        headline: "Your AI-Powered Delivery Partner",
        highlightedWords: ["AI-Powered"],
        subheadline:
            "Our AI-first engineering drives higher productivity and quality while shifting delivery from effort-based to outcome-driven models.",
        stats: [
            { value: "20–30%", label: "Productivity Increase" },
            { value: "45%", label: "Reduction in Manual Effort" },
            { value: "50+", label: "Cloud & AI Experts" },
        ],
    },
];

export const heroCtas = {
    primary: { label: "Discuss Your Project", href: "/contact" },
    secondary: { label: "See Case Studies", href: "/case-studies" },
};

// ── Trusted By ───────────────────────────────────────────────────────────────
export const trustContent = {
    label: "Trusted by financial institutions, fintechs & enterprises",
    logos: [
        { name: "CreditSnap", src: "/logos/creditsnap.png" },
        { name: "iLendX", src: "/logos/ilendx.png" },
        { name: "NASA Federal CU", src: "/logos/nasa-fcu.png" },
        { name: "Apple Federal CU", src: "/logos/apple-fcu.png" },
        { name: "PenFed", src: "/logos/penfed.jpg" },
        { name: "Victory Capital", src: "/logos/victory-capital.png" },
        { name: "Exeter Finance", src: "/logos/exeter-finance.jpeg" },
        { name: "Bank of Guam", src: "/logos/bank-of-guam.svg" },
        { name: "Claim Assist", src: "/logos/claim-assist.webp" },
        { name: "Axos Bank", src: "/logos/Axos Bank.svg" },
        { name: "Dover Federal", src: "/logos/Dover Federal .svg" },
        { name: "GESA Credit Union", src: "/logos/GESA Credit Union.svg" },
        { name: "Gulf Winds", src: "/logos/Gulf Winds.svg" },
        { name: "Service Credit Union", src: "/logos/Service Credit Union.svg" },
        { name: "Sunset Science Park", src: "/logos/Sunset Science park.svg" },
        { name: "TCM Bank", src: "/logos/TCM Bank.svg" },
        { name: "Thomaston Savings Bank", src: "/logos/Thomaston Savings Bank.svg" },
        { name: "Tresl", src: "/logos/Tresl.svg" },
        { name: "Veteran", src: "/logos/Veteran.svg" },
        { name: "WECU", src: "/logos/WECU.svg" },
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
            title: "Slow Kickoffs",
            description:
                "Start development faster with pre-configured environments eliminating lengthy setup and getting teams building in days.",
        },
        {
            icon: "Clock",
            title: "Missed Milestones",
            description:
                "Stay on schedule with AI-accelerated workflows shortening development cycles and keeping releases on track.",
        },
        {
            icon: "DollarSign",
            title: "Rising Engineering Costs",
            description:
                "Reduce operational costs with expert teams and efficient delivery models outperforming in-house builds.",
        },
        {
            icon: "Scale",
            title: "Growing Technical Debt",
            description:
                "Standardize development with proven frameworks reducing fragmented codebases and inconsistent practices.",
        },
        {
            icon: "Brain",
            title: "Untapped AI Potential",
            description:
                "Unlock the value of your data with AI platforms turning insights into automated business outcomes.",
        },
    ],
};

// ── Approach / Metrics ───────────────────────────────────────────────────────
export const approachContent = {
    label: "The Hyniva Approach",
    headline: "Our AI-Accelerated Delivery Model",
    sub: "We've distilled 20+ years of enterprise delivery expertise into AI-accelerated workflows, making project setup simpler and delivery 30-50% faster.",
    metrics: [
        { value: 50, suffix: "%", label: "Reduction in Development Time" },
        { value: 30, suffix: "%", label: "Faster POC & Prototype Stages" },
        { value: 50, suffix: "%", label: "Less Planning Time" },
    ],
    cta: { label: "See Our Approach", href: "/about" },
};

// ── Services ─────────────────────────────────────────────────────────────────
export const servicesContent = {
    label: "Our Services",
    headline: "End-to-end technology partnerships",
    sub: "We cover the full spectrum — from strategy through delivery — so you have one trusted partner, not a patchwork of vendors.",
    services: [
        {
            num: "01",
            title: "Digital Transformation",
            description:
                "We rebuild how enterprises operate — modernising legacy systems, reimagining customer experiences, and delivering change at a speed most firms only promise.",
            tags: ["Legacy System Modernisation", "Custom App Development", "UI/UX Redesign", "Process Reengineering", "Zero-Downtime Migration", "Digital Strategy"],
            image: "/images/digital-transformation.png",
            href: "/digital-transformation",
        },
        {
            num: "02",
            title: "Enterprise Platforms",
            description:
                "Deep expertise across the platforms enterprises run on — implemented faster and with less friction through our proprietary 8×8×8 delivery model.",
            tags: ["Salesforce", "Microsoft Dynamics 365", "Power Platform", "Cloud (Azure / AWS / GCP)", "ERP & CRM Integration", "Advanced Analytics"],
            image: "/images/enterprise-platforms.png",
            href: "/salesforce",
        },
        {
            num: "03",
            title: "Product Engineering",
            description:
                "From mobile apps to AI agents — we design, build, test, and support technology products across the full stack, with end-to-end ownership from brief to deployment.",
            tags: ["Full-Stack Development", "Mobile Engineering", "AI Agents & Automation", "Contact Centre Modernisation", "QA & Test Automation", "DevOps"],
            image: "/images/product-engineering.png",
            href: "/product-dev",
        },
        {
            num: "04",
            title: "Strategy Consulting",
            description:
                "Before we write a line of code, we align on where you're going — so your technology investment has a direction, not just a deadline.",
            tags: ["Technology Roadmap", "Enterprise Architecture", "TCO Analysis", "Agile Transformation", "Vendor & Platform Selection", "IT Operating Model"],
            image: "/images/strategy-consulting.png",
            href: "/it-strategy",
        },
    ],
};

// ── Products ─────────────────────────────────────────────────────────────────
export const productsContent = {
    label: "Our Products",
    headline: "Built from experience. Ready to deploy.",
    sub: "We don't just consult — we build. Our products come pre-configured with industry best practices, cutting implementation time dramatically.",
    products: [
        {
            badge: "Financial Services",
            name: "FinXServe",
            description:
                "A Salesforce-native digital banking platform for credit unions and FIs. Modernize lending, deposits, and member journeys without starting from scratch.",
            metrics: [
                { value: "80%", label: "Faster Time-to-Market" },
                { value: "50%", label: "Lower Cost of Ownership" },
            ],
            image: "/images/finxserve.png",
            href: "/finxserve",
        },
        {
            badge: "AI / Automation",
            name: "Autonomous AI Agent",
            description:
                "An intelligent reasoning agent for 24/7 omnichannel customer support — not just chatbots, but agents that understand, reason, and resolve.",
            metrics: [
                { value: "24/7", label: "Always-On Support" },
                { value: "↓ Ops", label: "High-Volume Automation" },
            ],
            image: "/images/ai-agent.png",
            href: "/aira",
        },
        {
            badge: "Insurance",
            name: "Claims Platform",
            description:
                "A next-generation claims management system with AI-driven orchestration — from intake to payout, fully automated and audit-ready.",
            metrics: [
                { value: "40%", label: "Faster Claim Settlement" },
                { value: "20%", label: "Lower Op. Cost" },
            ],
            image: "/images/claims-platform.png",
            href: "/claim-pioneer",
        },
    ],
};

// ── Case Studies ─────────────────────────────────────────────────────────────
export const caseStudiesContent = {
    label: "Client Results",
    headline: "Real problems. Measurable results.",
    sub: "We've helped build two products that were acquired by industry leaders. Here's what else we've delivered.",
    studies: [
        {
            industry: "Financial Services · Salesforce",
            title: "Modernized lending & member experience for a regional credit union",
            description:
                "Implemented Salesforce Financial Service Cloud with a custom Experience Cloud portal — unifying voice, email, chat, and mobile for 360° member visibility.",
            results: [
                { value: "55%", label: "Faster Case Closures" },
                { value: "40%", label: "Better First Call Resolution" },
                { value: "30%", label: "Drop in Handle Time" },
            ],
            image: "/images/case-study-finance.png",
            href: "#",
        },
        {
            industry: "Insurance · AI Automation",
            title: "Transformed catastrophic claims processing from manual to zero-touch",
            description:
                "Built a next-gen claims platform replacing spreadsheets and siloed tools — intelligent assignment engine, real-time dashboards, mobile-first field execution.",
            results: [
                { value: "40%", label: "Faster Claim Settlement" },
                { value: "25%", label: "Higher Adjuster Productivity" },
                { value: "20%", label: "Lower Op. Cost" },
            ],
            image: "/images/case-study-insurance.png",
            href: "#",
        },
    ],
};

// ── Industries ───────────────────────────────────────────────────────────────
export const industriesContent = {
    label: "Industries We Serve",
    headline: "Deep domain expertise across regulated industries",
    sub: "We understand your compliance requirements, your data sensitivities, and your competitive landscape — before we write a single line of code.",
    industries: [
        { icon: "Landmark", title: "Banking & Credit Unions" },
        { icon: "TrendingUp", title: "Lending & Fintech" },
        { icon: "BarChart3", title: "Asset & Wealth Management" },
        { icon: "Shield", title: "Insurance" },
        { icon: "Truck", title: "Manufacturing & Logistics" },
        { icon: "Cpu", title: "Technology & Media" },
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
            description: "We understand your business goals, existing systems, and constraints before proposing anything.",
        },
        {
            num: 2,
            title: "Strategy & Scope",
            description: "A clear roadmap with transparent cost, timeline, and risk — no padded estimates, no surprises.",
        },
        {
            num: 3,
            title: "Agile Delivery",
            description: "Direct access to our engineers and SMEs. Weekly demos. Decisions made fast.",
        },
        {
            num: 4,
            title: "Launch & Scale",
            description: "We don't hand off and disappear — we support, optimize, and grow with you.",
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
        { title: "AI & Data", items: ["Copilot / Azure OpenAI", "Salesforce Data Cloud", "Python / ML", "Data Lake / Analytics"] },
        { title: "Frontend", items: ["React / Angular", "React Native / Flutter", "Swift / Kotlin", "Figma / UX Design"] },
        { title: "Backend", items: ["Java / Node.js / Python", "ASP.NET / TypeScript", "Microservices", "REST / GraphQL APIs"] },
        { title: "QA & DevOps", items: ["Selenium / ContextQA", "CI/CD Pipelines", "Docker / Kubernetes", "Genesys Contact Center"] },
    ],
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

// ── CTA ──────────────────────────────────────────────────────────────────────
export const ctaContent = {
    headline: "Ready to simplify your enterprise?",
    sub: "Let's start with a 30-minute discovery call — no commitment, no sales pitch. Just a real conversation about your challenges.",
    cta: { label: "Schedule a Discovery Call", href: "mailto:connect@hyniva.com" },
};

// ── Footer ───────────────────────────────────────────────────────────────────
export const footerContent = {
    description: "Simplifying enterprises through innovative products and trusted technology services. Based in San Antonio, TX — serving clients nationwide and in India.",
    sections: [
        {
            title: "Services",
            links: [
                { title: "Digital Transformation", href: "/digital-transformation" },
                { title: "Enterprise Platforms", href: "/salesforce" },
                { title: "Product Engineering", href: "/product-dev" },
                { title: "Strategy Consulting", href: "/it-strategy" },
            ],
        },
        {
            title: "Products",
            links: [
                { title: "FinXServe", href: "/finxserve" },
                { title: "AI Agent", href: "/aira" },
                { title: "Claims Platform", href: "/claim-pioneer" },
                { title: "Hyper", href: "/hyper" },
            ],
        },
        {
            title: "Company",
            links: [
                { title: "About Hyniva", href: "/about" },
                { title: "Case Studies", href: "/case-studies" },
                { title: "Careers", href: "/careers" },
                { title: "Contact", href: "/contact" },
            ],
        },
    ],
    offices: [
        { country: "United States", address: "13333 Blanco Road, Suite 206, San Antonio, Texas - 78216" },
        { country: "India", address: "The Cube Karle Town Center, Building No.5, 5th Floor, Nagavara Village, Bengaluru, KA - 560045" },
    ],
    linkedin: "https://www.linkedin.com/company/hyniva/",
    email: "connect@hyniva.com",
};
