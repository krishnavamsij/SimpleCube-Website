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
    label: "Clients that chose depth over headcount",
    logos: [
        { name: "NASA Federal CU", src: "/logos/nasa-fcu.png" },
        { name: "Apple Federal CU", src: "/logos/apple-fcu.png" },
        { name: "PenFed", src: "/logos/penfed.jpg" },
        { name: "Victory Capital", src: "/logos/victory-capital.png" },
        { name: "Exeter Finance", src: "/logos/exeter-finance.jpeg" },
        { name: "Bank of Guam", src: "/logos/bank-of-guam.svg" },
        { name: "Claim Assist", src: "/logos/claim-assist.webp" },
        { name: "Axos Bank", src: "/logos/AXOS.svg" },
        { name: "Dover Federal", src: "/logos/Dover FCU.svg" },
        { name: "GESA Credit Union", src: "/logos/GESA Credit Union.svg" },
        { name: "Gulf Winds", src: "/logos/Gulf Winds.svg" },
        { name: "Service Credit Union", src: "/logos/Service Credit Union.svg" },
        { name: "Sunset Science Park", src: "/logos/Sunset Science Park.svg" },
        { name: "TCM Bank", src: "/logos/TCM Bank.svg" },
        { name: "Thomaston Savings Bank", src: "/logos/Thomaston.svg" },
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
    headline: "The Digital Factory Model",
    sub: "The developer owns the full lifecycle — from story definition to production support, reducing overhead and increasing accountability at every stage.",
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
    headline: "End-to-end technology partnership.",
    callOutContent: "From the first conversation to live production — one team, full ownership, no handoffs.",
    metrics: [
        { value: "15+", label: "Years of platform \npartnerships" },
        { value: "220+", label: "Enterprise applications \ndelivered" },
        { value: "30+", label: "Clients across \n5 industries" }
    ],
    services: [
        {
            num: "01",
            title: "Digital Transformation",
            description:
                "We rebuild how enterprises operate — modernising legacy systems, reimagining customer experiences, and turning complex change into working software.",
            tags: ["Legacy System Modernisation", "Custom App Development", "UI/UX Redesign", "Process Reengineering", "Zero-Downtime Migration", "Digital Strategy"],
            image: "/images/Our Services/Digital Transformation_no BG.svg",
            href: "/digital-transformation",
        },
        {
            num: "02",
            title: "Enterprise Platforms",
            description:
                "We implement and optimize the platforms your business runs on — and with our 8×8×8 delivery formula, we get you live in weeks, not months.",
            tags: ["Salesforce", "Microsoft Dynamics 365", "Power Platform", "Cloud (Azure / AWS / GCP)", "ERP & CRM Integration", "Advanced Analytics"],
            image: "/images/Our Services/2. Enterprise Platforms.png",
            href: "/salesforce",
        },
        {
            num: "03",
            title: "Product Engineering",
            description:
                "From mobile apps to AI agents — we design, build, test, and ship technology products that work in production, not just in demos.",
            tags: ["Full-Stack Development", "Mobile Engineering", "AI Agents & Automation", "Contact Centre Modernisation", "QA & Test Automation", "DevOps"],
            image: "/images/Our Services/Product Engineering_no BG.svg",
            href: "/product-dev",
        },
        {
            num: "04",
            title: "Strategy Consulting",
            description:
                "Before we write a line of code, we align on where you're going — so your technology investment has a direction, not just a deadline.",
            tags: ["Technology Roadmap", "Enterprise Architecture", "TCO Analysis", "Agile Transformation", "Vendor & Platform Selection", "IT Operating Model"],
            image: "/images/Our Services/Strategy Consulting_no BG.svg",
            href: "/it-strategy",
        },
    ],
};

// ── Products ─────────────────────────────────────────────────────────────────
export const productsContent = {
    label: "Our Products",
    headline: "Product innovation is in our DNA.",
    subheadline: "Seven products born from decades of enterprise delivery — proving our domain knowledge extends beyond implementation.",
    rightCallout: "Two of our flagship products were acquired by industry leaders — Fiserv and SavvyMoney — a testament to what enterprise depth produces when it becomes a product.",
    logos: [
        { industry: "LENDING", name: "iLENDX", src: "/images/Product Logos /ILendX.svg", acquiredBy: "Fiserv" },
        { industry: "FINANCIAL INSTITUTION", name: "CreditSnap", src: "/images/Product Logos /Credit Snap white.png", acquiredBy: "SavvyMoney" },
        { industry: "EDUCATION", name: "EazySchool", src: "/images/Product Logos /EazySchool White.png" },
        { industry: "WEALTH MANAGEMENT", name: "Hyper", src: "/images/Product Logos /Hyper white PNG.png" },
        { industry: "FINANCIAL INSTITUTION", name: "FinXServe", src: "/images/Product Logos /FinXServe White.png" },
        { industry: "INSURANCE", name: "Claim Pioneer", src: "/images/Product Logos /Claim Pioneer White.png" },
        { industry: "FINANCIAL INSTITUTION", name: "AIRA", src: "/images/Product Logos /AIRA white.png" },
    ],
    products: [
        {
            num: "01",
            title: "FinXServe",
            tags: ["Financial Institutions"],
            description: "Salesforce-native omnichannel experience orchestration layer that sits above your existing core banking system and underwriting platforms to unify and streamline consumer acquisition for loans, cards, and deposits.",
            image: "/images/Product Images/1. Finxserve.svg",
            href: "/finxserve",
        },
        {
            num: "02",
            title: "AIRA",
            tags: ["Financial Institutions", "Insurance"],
            description: "The first enterprise-ready AI platform — combining autonomous reasoning, compliance-first design, and OneAPI integration into one scalable platform institutions can trust for mission-critical decisions.",
            image: "/images/Product Images/AIRA.svg",
            href: "/aira",
        },
        {
            num: "03",
            title: "Claim Pioneer",
            tags: ["Insurance"],
            description: "End-to-end claims automation — from intake to closure. AI-driven assignment, mobile-first field execution, and real-time visibility into every step of the claim’s lifecycle, all in one connected workflow.",
            image: "/images/Product Images/Claim pioneer.svg",
            href: "/claim-pioneer",
        },
        {
            num: "04",
            title: "Hyper",
            tags: ["Wealth Management"],
            description: "A digital investment journey platform that takes investors from goal discovery to personalised portfolio recommendations - helping advisors scale AUM and reduce acquisition costs.",
            image: "/images/Product Images/hyper.svg",
            href: "/hyper",
        },
    ],
};

// ── Case Studies ─────────────────────────────────────────────────────────────
export const caseStudiesContent = {
    label: "Customer Stories",
    headline: "From challenge to transformation.",
    highlightedWord: "transformation.",
    sub: "Every engagement started with trust. Every outcome is how we honoured it.",
    studies: [
        {
            title: "Autonomous Lending Experience\nwith *FinXServe & Agentforce*",
            description: "Built an AI-driven lending journey that automates document processing, decisioning and approvals.",
            image: "/images/Case Study/1. Autonomous Lending Experience with FinXServe and Agentforce.png",
            href: "#",
        },
        {
            title: "Modernizing Contact Centers with\n*Intelligent IVR Self-Service*",
            description: "Transformed legacy IVR into a Smart Customer Engagement Interaction System.",
            image: "/images/Case Study/2. Modernizing Contact Centers with Intelligent IVR Self-Service.png",
            href: "#",
        },
        {
            title: "Autonomous Freight Operations\nwith *GenAI*",
            description: "Reduced load creation time by 98% and costs by 99.5% using GenAI-driven automation.",
            image: "/images/Case Study/3. Autonomous Freight Operations with GenAI.png",
            href: "#",
        },
        {
            title: "Instant Loan with\n*Agentforce-Powered* Document Intelligence",
            description: "Loan applications completed in under 2 minutes with AI-driven document intelligence.",
            image: "/images/Case Study/4. Accelerate Loan Processing with Agentforce-Powered Document Intelligence.png",
            href: "#",
        },
        {
            title: "Enterprise CRM Modernization\non *Microsoft Cloud*",
            description: "Transformed a legacy CRM into a cloud-native Microsoft ecosystem with zero downtime.",
            image: "/images/Case Study/5. Enterprise CRM Modernization on Microsoft Cloud.png",
            href: "#",
        },
        {
            title: "Rapid Reverse-Engineered\n*Website Migration*",
            description: "Delivered a full website migration in 2 months with zero downtime—without backend access.",
            image: "/images/Case Study/6. Rapid Reverse-Engineered Website Migration.png",
            href: "#",
        },
        {
            title: "AWS-Powered Document\n*Platform Transformation*",
            description: "Saved $500K annually and improved performance by 5× with serverless AWS modernization.",
            image: "/images/Case Study/7. AWS-Powered Document Platform Transformation.png",
            href: "#",
        },
        {
            title: "Core Banking Transformation\non *Microsoft*",
            description: "Accelerated loan approvals by 50% and reduced operational costs by 30% with Microsoft-led modernization.",
            image: "/images/Case Study/8. Core Banking Transformation on Microsoft.png",
            href: "#",
        },
    ],
};

// ── Why Hyniva ─────────────────────────────────────────────────────────────
export const whyHynivaContent = {
    topBox: {
        headline: "Why Hyniva?",
        highlightedWord: "Hyniva?",
        stats: [
            { value: "220+", label: "Applications\nDelivered" },
            { value: "30+", label: "Enterprise\nClients" },
            { value: "100+", label: "Certified\nExperts" }
        ],
        description: "When you work with Hyniva, you get a team that already knows your industry, owns the full lifecycle, and measures success by what goes live — not what gets proposed.",
        boldWords: ["already knows your industry", "measures success by what goes live"],
        cta: { label: "Know More →", href: "/about" }
    },
    bottomBox: [
        {
            icon: "UsersRound",
            title: "Zero Handoff",
            description: "One team owns your engagement from strategy to production — no handoffs, no context loss."
        },
        {
            icon: "Globe2",
            title: "Industry Depth",
            description: "15+ years inside regulated industries — we spend less time learning and more time building."
        },
        {
            icon: "Zap",
            title: "Delivery at Speed",
            description: "Our 8×8×8 formula and Digital Factory Model deliver 40% faster than traditional models. Consistently."
        },
        {
            icon: "Activity",
            title: "Built for Outcomes",
            description: "A product builder's mindset and an implementer's discipline — in every engagement."
        }
    ]
};

// ── Industries ───────────────────────────────────────────────────────────────
export const industriesContent = {
    label: "Industries We Serve",
    headline: "Deep domain expertise,\nbuilt over decades.",
    highlightedWord: "decades.",
    sub: "We know your compliance requirements, your legacy constraints, and your competitive pressures — not from research, but from years inside these industries.",
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

// ── Technology & Partners ────────────────────────────────────────────────────
export const techPartnersContent = {
    label: "Our Technology & Partners",
    headline: "Built on the platforms you already trust",
    sub: "Our teams are certified and experienced across the platforms that power modern enterprises — so there's no ramp-up time and no translation layer between your goals and our delivery.",
    partners: [
        { name: "Salesforce", src: "/images/Partners Logo/Salesforce.com_logo.svg.png" },
        { name: "AWS", src: "/images/Partners Logo/Amazon_Web_Services_Logo.svg.png" },
        { name: "Microsoft", src: "/images/Partners Logo/Microsoft_logo_(2012).svg.png" },
        { name: "Genesys", src: "/images/Partners Logo/GENESYS_logo_FullColor_rgb_png-1024x189.webp" },
        { name: "Adobe", src: "/images/Partners Logo/Adobe_Corporate_Logo.png" }
    ],
    hexagons: [
        { 
            title: "CRM & PLATFORMS", 
            items: ["Salesforce FSC", "MS Dynamics 365", "Power Platform", "Genesys"], 
            color: "bg-[#1F35A4]" 
        },
        { 
            title: "CLOUD", 
            items: ["Microsoft Azure", "Amazon AWS", "Google Cloud"], 
            color: "bg-[#00A8FF]" 
        },
        { 
            title: "AI & DATA", 
            items: ["Copilot / Azure OpenAI", "Salesforce Data Cloud", "Python / ML", "Data Lake / Analytics"], 
            color: "bg-[#008f72]" 
        },
        { 
            title: "FRONTEND", 
            items: ["React / Angular", "React Native / Flutter", "Swift / Kotlin", "UI/UX Design"], 
            color: "bg-[#0D9488]" 
        },
        { 
            title: "BACKEND", 
            items: ["ASP.Net / TypeScript", "Java / Node.js / Python / PHP", "Microservices", "REST / GraphQL APIs"], 
            color: "bg-[#1e1b4b]" 
        },
        { 
            title: "QA & DEVOPS", 
            items: ["Selenium / ContextQA", "CI/CD Pipelines", "Docker / Kubernetes", "Azure DevOps"], 
            color: "bg-[#0f172a]" 
        }
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
    label: "Let's Talk",
    headline: "Ready to simplify your enterprise?",
    sub: "Let's start with a 30-minute discovery call — no commitment,\nno sales pitch. Just a real conversation about your challenges.",
    cta: { label: "Schedule a free consultation", href: "mailto:connect@hyniva.com" },
};

// ── Footer ───────────────────────────────────────────────────────────────────
export const footerContent = {
    description: "We partner with enterprises to simplify complexity, accelerate outcomes, and deliver scalable technology solutions built for real-world impact.",
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
                { title: "AIRA", href: "/aira" },
                { title: "Claim Pioneer", href: "/claim-pioneer" },
                { title: "Hyper", href: "/hyper" },
            ],
        },
        {
            title: "Company",
            links: [
                { title: "About Hyniva", href: "/about" },
                { title: "Case Studies", href: "/case-studies" },
                { title: "Careers", href: "/careers" },
                { title: "Privacy Policy", href: "/privacy" },
            ],
        },
    ],
    offices: [
        { country: "United States", address: "13333 Blanco Road, Suite 206, San Antonio, Texas - 78216" },
        { country: "India", address: "The Cube Karle Town Center, Building No.5, 5th Floor,\nNagavara Village, Bengaluru, KA - 560045" },
    ],
    linkedin: "https://www.linkedin.com/company/hyniva/",
    email: "connect@hyniva.com",
};
