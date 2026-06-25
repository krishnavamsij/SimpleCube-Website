// =============================================================================
// Hyniva — Centralized Content Configuration
// =============================================================================

export const navContent = {
    brand: { name: "Hyniva" },
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
            category: "Enterprise Platforms", 
            isBold: true,
            href: "/services/enterprise-platforms",
            items: [
                { title: "Salesforce", href: "/services/enterprise-platforms/salesforce" },
                { title: "Microsoft Services", href: "/services/enterprise-platforms/microsoft-services" },
                { title: "AWS Cloud", href: "/services/enterprise-platforms/aws-cloud-services" },
            ]
        },
        { 
            category: "Product Engineering", 
            isBold: true,
            href: "/services/product-engineering",
            items: [
                { title: "Strategy Consulting", href: "/services/product-engineering/strategy-consulting", isBold: true },
            ]
        },
    ],
    insights: [
        { title: "Case Studies", href: "/insights/case-studies" },
        { title: "CU Tech Podcast", href: "/insights/podcast" },
        { title: "Blogs", href: "/insights/blogs" },
        { title: "News", href: "/insights/news" },
    ],
    about: [
        // UPDATED: Now pointing to local /about page instead of external products.hyniva.com
        { title: "About Us", href: "/about" },
        // About Us page has a #leadership anchor for "Our Leaders" section
        { title: "Our Leadership", href: "/about#leadership" },
        // UPDATED: Careers is now a separate page at /careers
        { title: "Careers", href: "/careers" },
    ],
    // ADDED: Contact Us as standalone navigation item
    contact: [
        { title: "Contact Us", href: "/contact" },
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
            "From legacy modernization to AI-powered products, Hyniva helps organizations build faster, operate smarter and scale with confidence.",
        stats: [
            { value: "70%", label: "Faster Product Launch" },
            { value: "50%", label: "Lower Cost of Ownership" },
            { value: "45+", label: "Happy Clients" },
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
    secondary: { label: "See Case Studies", href: "/insights/case-studies" },
};

// ── Trusted By ───────────────────────────────────────────────────────────────
export const trustContent = {
    label: "Clients that chose depth over headcount",
    logos: [
        { name: "NASA Federal CU", src: "/logos/nasa-fcu.png" },
        { name: "Apple Federal CU", src: "/logos/apple-fcu.png" },
        { name: "PenFed", src: "/logos/Replacement/PenFed.png" },
        { name: "Victory Capital", src: "/logos/victory-capital.png" },
        { name: "Exeter Finance", src: "/logos/Replacement/Exeter.png" },
        { name: "Bank of Guam", src: "/logos/bank-of-guam.svg" },
        { name: "Claim Assist", src: "/logos/Replacement/Claim_Assist.png" },
        { name: "Axos Bank", src: "/logos/AXOS.svg" },
        { name: "Dover Federal", src: "/logos/Dover_FCU.svg" },
        { name: "GESA Credit Union", src: "/logos/GESA_Credit_Union.svg" },
        { name: "Gulf Winds", src: "/logos/Gulf_Winds.svg" },
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
        { name: "Innova Solutions", src: "/logos/Additional/Sypps_innova_solutions.svg" },
        { name: "People Fund", src: "/logos/Additional/People_fund.png", scale: 1.6 },
        { name: "Transtech IT Staffing", src: "/logos/Replacement/TransTech.png", scale: 2.2 },
        { name: "USGB", src: "/logos/Replacement/USGB.png" },
        { name: "Fiserv", src: "/logos/Additional/fiserv-logo-orange-ff6600.svg" },
        { name: "Always Track", src: "/logos/Additional/Always_Track.png" },
        { name: "Westcare", src: "/logos/Westcare.png", scale: 1.6 },
        { name: "Delta", src: "/logos/delta.png", scale: 1.4 },
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
            description: "Lengthy setup and integration dependencies delay project starts.\nOur pre-configured accelerators help teams start building in days.",
        },
        {
            icon: "Clock",
            title: "Missed Milestones",
            description: "Competing priorities and complex systems derail delivery timelines. Our\nAI-powered workflows accelerate execution and keep releases on track.",
        },
        {
            icon: "DollarSign",
            title: "Rising Engineering Costs",
            description: "Growing technology stacks increase development overhead. Our efficient delivery models improve productivity while\nreducing costs.",
        },
        {
            icon: "Scale",
            title: "Growing Technical Debt",
            description: "Legacy systems and fragmented codebases slow innovation. Our standardized frameworks reduce complexity and maintenance effort.",
        },
        {
            icon: "Brain",
            title: "Untapped AI Potential",
            description: "Fragmented data and disconnected systems\nlimit AI adoption. Our enterprise-ready AI\nturns insights into\nbusiness outcomes.",
        },
    ],
};

// ── Approach / Metrics ───────────────────────────────────────────────────────
export const approachContent = {
    label: "The Hyniva Approach",
    headline: "Digital Factory Model",
    sub: "The developer owns the full lifecycle enabling Zero Handoff Friction, reducing overhead\u00A0and\u00A0increasing accountability at every stage.",
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
        { value: "45+", label: "Clients across \n5 industries" }
    ],
    services: [
        {
            num: "01",
            title: "Digital Transformation",
            description:
                "We rebuild how enterprises operate by modernizing legacy systems, reimagining customer experiences and turning complex change into working software.",
            tags: ["Legacy System Modernization", "Custom App Development", "UI/UX Redesign", "Process Reengineering", "Zero-Downtime Migration", "Digital Strategy"],
            image: "/images/Our_Services/Digital_Transformation_no_BG.svg",
            href: "/services/digital-transformation",
        },
        {
            num: "02",
            title: "Enterprise Platforms",
            description:
                "We implement and optimize the platforms your business runs on and with our 8×8×8 delivery formula, we get you live in weeks, not months.",
            tags: ["Salesforce", "Microsoft Dynamics 365", "Power Platform", "Cloud (Azure / AWS / GCP)", "ERP & CRM Integration", "Advanced Analytics"],
            image: "/images/Our_Services/2_Enterprise_Platforms.png",
            href: "/services/salesforce",
        },
        {
            num: "03",
            title: "Product Engineering",
            description:
                "From mobile apps to AI agents, we design, build, test and ship technology products that work in production, not just in demos.",
            tags: ["Full-Stack Development", "Mobile Engineering", "AI Agents & Automation", "Contact Centre Modernization", "QA & Test Automation", "DevOps"],
            image: "/images/Our_Services/Product_Engineering_no_BG.png",
            href: "/services/product-engineering",
        },
        {
            num: "04",
            title: "Strategy Consulting",
            description:
                "Before we write a line of code, we align on where you're going. So your technology investment has a direction, not just a deadline.",
            tags: ["Technology Roadmap", "Enterprise Architecture", "TCO Analysis", "Agile Transformation", "Vendor & Platform Selection", "IT Operating Model"],
            image: "/images/Our_Services/Strategy_Consulting_no_BG.svg",
            href: "/services/strategy-consulting",
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

// ── Why Hyniva ─────────────────────────────────────────────────────────────
export const whyHynivaContent = {
    topBox: {
        headline: "Why Hyniva?",
        highlightedWord: "Hyniva?",
        stats: [
            { value: "220+", label: "Applications\nDelivered" },
            { value: "45+", label: "Enterprise\nClients" },
            { value: "250+", label: "Certified\nExperts" }
        ],
        description: "When you work with Hyniva, you get a team that understands your industry and stays accountable from strategy to delivery.",
        boldWords: ["understands your industry", "stays accountable"],
        cta: { label: "Know More →", href: "/about" }
    },
    bottomBox: [
        {
            icon: "UsersRound",
            title: "Zero Handoff",
            description: "One team owns your\nengagement from strategy\nto production. No handoffs,\nno context loss."
        },
        {
            icon: "Globe2",
            title: "Industry Depth",
            description: "15+ years inside regulated\nindustries. We spend less\ntime learning and more\ntime building."
        },
        {
            icon: "Zap",
            title: "Delivery at Speed",
            description: "Our 8×8×8 formula and Digital Factory model consistently deliver outcomes 40% faster than traditional approaches."
        },
        {
            icon: "Activity",
            title: "Built for Outcomes",
            description: "Combining industry expertise, product thinking, and execution discipline in every engagement."
        }
    ]
};

// ── Expertise Section (for Services/About pages) ─────────────────────────────
export const expertiseContent = {
    topBox: {
        headline: "Expertise Behind Every Engagement",
        highlightedWord: "Every Engagement",
        stats: [
            { value: "250+", label: "Certified\nProfessionals" }
        ],
        description: "Our experts continuously expand their capabilities\nacross AI, cloud, data and enterprise platforms to\nsolve today's challenges and prepare for\ntomorrow's opportunities.",
        boldWords: [],
        cta: { label: "About Us", href: "/about" },
        imagePlaceholder: "/images/expertise/professionals.png"
    },
    bottomBox: [
        {
            icon: "Calendar",
            title: "AI-Ready Talent",
            description: "Exploring, adopting, and applying the latest advancements in generative AI, intelligent automation, and intelligent agents to solve complex business challenges.",
            imagePlaceholder: "/images/expertise/ai-talent.png"
        },
        {
            icon: "CircleArrowRight",
            title: "Platform Specialists",
            description: "Certified across Salesforce, AWS, Microsoft, and leading enterprise ecosystems to accelerate implementation, innovation, and adoption.",
            imagePlaceholder: "/images/expertise/platform-specialists.png"
        },
        {
            icon: "Star",
            title: "Industry Experience",
            description: "Hands-on experience delivering enterprise solutions that address operational, regulatory, and customer experience challenges across highly regulated industries.",
            imagePlaceholder: "/images/expertise/industry-experience.png"
        },
        {
            icon: "CalendarCheck",
            title: "Continuous Learning Culture",
            description: "Innovation thrives when learning never stops. We invest in certifications, emerging technologies, and experimentation to keep our teams ahead of what's next.",
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
        { title: "AI & Data", items: ["Copilot / Azure OpenAI", "Salesforce Data Cloud", "Python / ML", "Data Lake / Analytics"] },
        { title: "Frontend", items: ["React / Angular", "React Native / Flutter", "Swift / Kotlin", "Figma / UX Design"] },
        { title: "Backend", items: ["Java / Node.js / Python", "ASP.NET / TypeScript", "Microservices", "REST / GraphQL APIs", "Mendix"] },
        { title: "QA & DevOps", items: ["Selenium / ContextQA", "CI/CD Pipelines", "Docker / Kubernetes", "Genesys Contact Center"] },
    ],
};

// ── Technology & Partners ────────────────────────────────────────────────────
export const techPartnersContent = {
    label: "Our Technology & Partners",
    headline: "Built on the platforms you already trust",
    sub: "Our teams are certified and experienced across the platforms that power modern enterprises. So there's no ramp-up time and no translation layer between your goals and our delivery.",
    partners: [
        { name: "Salesforce", src: "/images/Partners_Logo/Salesforce.com_logo.svg.png" },
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
            logo: "/images/Partners_Logo/Salesforce.com_logo.svg.png"
        },
        {
            title: "AWS",
            items: ["Microsoft Azure", "Amazon AWS", "Google Cloud"],
            color: "bg-[#00A8FF]",
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
            logo: "/images/Partners_Logo/Salesforce.com_logo.svg.png"
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
            industry: "Lending & Fintech",
            quote: "Hyniva demonstrated a clear understanding of our goals and helped us transform a manual, fragmented prequalification process into an intuitive, algorithm-driven experience. The resulting loan application process is not only faster but built on\u00A0a\u00A0scalable, cost-efficient stack that positions us perfectly for\u00A0future\u00A0growth.",
            author: "Gustavo Lasala",
            designation: "President and CEO",
            company: "PeopleFund",
            image: "/images/voc/gustavo_transparent.png",
            logo: "/logos/Additional/People_fund.png",
            result: "Built an intelligent lending platform that reduced loan prequalification from <span class='text-[#1e90ff] font-semibold'>days to minutes.</span>",
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
            result: "Reduced manual freight paperwork through Intelligent Document Processing with <span class='text-[#1e90ff] font-semibold'>99.69% accuracy.</span>",
            caseStudyHref: "/insights/case-studies/autonomous-freight-operations",
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

// ── CTA ──────────────────────────────────────────────────────────────────────
export const ctaContent = {
    label: "Let's Talk",
    headline: "Ready to simplify your enterprise?",
    sub: "Let's start with a 30-minute discovery call. No commitment,\nno sales pitch. Just a real conversation about your challenges.",
    cta: { label: "Schedule a free consultation", href: "/contact" },
};

// ── Footer ───────────────────────────────────────────────────────────────────
export const footerContent = {
    description: "We partner with enterprises to simplify complexity, accelerate outcomes and deliver scalable technology solutions built for real-world impact.",
    sections: [
        {
            title: "Services",
            links: [
                { title: "Digital Transformation", href: "/services/digital-transformation" },
                { title: "Enterprise Platforms", href: "/services/enterprise-platforms" },
                { title: "Product Engineering", href: "/services/product-engineering" },
                { title: "Strategy Consulting", href: "/services/product-engineering/strategy-consulting" },
            ],
        },
        {
            title: "Products",
            links: [
                { title: "FinXServe", href: "/products/finxserve" },
                { title: "Claim Pioneer", href: "/products/claim-pioneer" },
                { title: "AIRA", href: "/products/aira" },
                { title: "Hyper", href: "/products/hyper" },
            ],
        },
        {
            title: "Company",
            links: [
                { title: "About Hyniva", href: "/about" },
                { title: "Case Studies", href: "/insights/case-studies" },
                { title: "Careers", href: "/careers" },
                { title: "Privacy Policy", href: "/privacy-policy" },
            ],
        },
    ],
    offices: [
        { country: "United States", address: "13333 Blanco Road, Suite 206, San Antonio,\nTexas - 78216" },
        { country: "India", address: "The Cube Karle Town Center, 5th Floor,\nNagavara Village, Bengaluru, KA - 560045" },
    ],
    linkedin: "https://www.linkedin.com/company/hyniva/",
    email: "connect@hyniva.com",
};

// ── FAQ ──────────────────────────────────────────────────────────────────────
export const faqContent = [
    {
        question: "What is Hyniva?",
        answer: "Hyniva is a technology consulting and product engineering company that helps organizations transform through artificial intelligence, enterprise platforms, cloud technologies and modern software engineering. Founded in 2007, Hyniva combines over two decades of industry expertise with a proven product engineering heritage, helping organizations accelerate innovation, modernize operations and achieve measurable business outcomes."
    },
    {
        question: "Why do organizations choose Hyniva as a technology partner?",
        answer: "Organizations choose Hyniva because it combines the agility of a product company with the expertise of a technology consulting partner. Backed by more than 20 years of industry experience, Hyniva has delivered transformation programs across banking, credit unions, insurance, wealth management, logistics and education while helping clients accelerate delivery, reduce complexity and unlock greater value from their technology investments."
    },
    {
        question: "How can enterprises accelerate digital transformation initiatives?",
        answer: "Successful digital transformation requires modernizing legacy systems, improving data accessibility, automating business processes and creating connected customer experiences. Hyniva helps organizations accelerate transformation through AI-powered solutions, cloud modernization, enterprise platforms and product engineering services that move initiatives from strategy to execution faster and with lower risk."
    },
    {
        question: "How can organizations move from AI experimentation to business value?",
        answer: "Many organizations successfully pilot AI initiatives but struggle to scale them across the enterprise. Creating business value from AI requires strong data foundations, system integration, governance and clearly defined outcomes. Hyniva helps organizations operationalize AI through AIRA, its Agentic AI platform, along with intelligent automation, document intelligence, workflow orchestration and enterprise integrations that embed AI directly into business operations."
    },
    {
        question: "How can businesses modernize legacy systems without disrupting operations?",
        answer: "Legacy modernization is most effective when approached as a phased transformation rather than a complete replacement. Organizations can reduce risk through cloud migration, application modernization, API-led integration and process automation strategies. Hyniva helps businesses modernize technology environments while maintaining operational continuity through proven delivery frameworks, modernization accelerators and enterprise integration expertise."
    },
    {
        question: "How can enterprises accelerate software delivery?",
        answer: "Accelerating software delivery requires more than adding developers. Hyniva's Digital Factory model combines AI-assisted development, reusable accelerators, automation and cross-functional teams that own the entire software lifecycle. This approach reduces handoffs, improves accountability and helps organizations deliver solutions significantly faster while maintaining quality, governance and scalability."
    },
    {
        question: "How can AI improve operational efficiency and customer experiences?",
        answer: "Artificial intelligence helps organizations automate repetitive tasks, improve decision-making, streamline workflows and deliver more personalized customer experiences. Hyniva helps enterprises apply AI through intelligent agents, document intelligence, conversational AI, predictive analytics and workflow automation solutions that improve productivity while enhancing customer engagement."
    },
    {
        question: "What makes a digital transformation initiative successful?",
        answer: "Successful digital transformation initiatives align technology investments with business objectives, customer needs and operational priorities. Organizations that combine modern platforms, process automation, data-driven decision-making and change management are better positioned to achieve sustainable outcomes. Hyniva leverages over 20 years of industry expertise and proven delivery methodologies to help clients execute transformation programs that deliver measurable business value."
    },
    {
        question: "How can organizations build and launch digital products faster?",
        answer: "Organizations can accelerate product delivery by combining domain expertise, modern engineering practices, reusable accelerators and cross-functional product teams. Hyniva brings a product engineering mindset shaped by building seven enterprise software products, including CreditSnap and iLendX, which were successfully acquired by SavvyMoney and Fiserv. This experience enables Hyniva to help organizations move from concept to market faster, reduce delivery risk and build scalable digital products that deliver long-term business value."
    },
    {
        question: "How can enterprises adopt AI responsibly and at scale?",
        answer: "Responsible AI adoption requires governance, transparency, security, compliance and continuous monitoring. Organizations must ensure AI solutions align with business objectives while protecting customer data and maintaining trust. Hyniva helps enterprises implement scalable AI frameworks, governance models, and enterprise-grade AI solutions that balance innovation with compliance, enabling organizations to deploy AI confidently across the business."
    }
];
