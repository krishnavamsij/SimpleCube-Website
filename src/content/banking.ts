import { LucideIcon, Bot, Users, CreditCard, Cloud, Smartphone, TrendingUp, Coins } from "lucide-react";

export const bankingContent = {
    hero: {
        badge: "BANKING & FINANCIAL SERVICES",
        title: "Redefining banking through connected, intelligent experiences",
        subtitle: "We help financial institutions deliver real-time, seamless and context-aware journeys across every interaction.",
        backgroundImage: "/images/Industries_Section/Banking_Subpage/herobanneroption.png",
    },
    alternatingSections: [
        {
            title: "Banking Has Moved Beyond Transactions",
            content: [
                "Banking is being reshaped by rapid AI adoption, evolving regulatory expectations and the expansion of financial services into embedded ecosystems. As experiences become more fluid and interconnected, traditional operating models are struggling to keep pace.",
                "Many institutions continue to operate with fragmented data, disconnected platforms and limited readiness for real-time decisioning. The result is slower innovation, inconsistent customer journeys and increasing operational complexity."
            ],
            imagePosition: "left",
            image: "/images/Industries_Section/Banking_Subpage/TheShift.png", 
        },
        {
            title: "What Modern Banking Demands",
            content: [
                "Banking today is defined by how effectively it delivers across every moment of interaction. Customers expect journeys that are immediate, intuitive and continuous whether they begin digitally, move to assisted channels or extend into partner ecosystems.",
                "At the same time, institutions must balance this with the need for security, compliance and operational efficiency, ensuring that every experience is both seamless and trusted."
            ],
            imagePosition: "right",
            image: "/images/Industries_Section/Banking_Subpage/WHATMODERNBANKINGDEMANDS.png",
        },
        {
            title: "Our Approach to Connected Experiences",
            content: [
                "We enable banks to move beyond fragmented transformation by aligning experience, data and platform capabilities into a connected execution model. Instead of addressing these areas in isolation, we bring them together to ensure that every initiative contributes to a unified and measurable outcome.",
                "This approach reduces complexity, accelerates execution and enables consistent experience delivery across the organization."
            ],
            imagePosition: "left",
            image: "/images/Industries_Section/Banking_Subpage/Ourapproach.png",
        }
    ],
    offerings: {
        title: "Our Offerings",
        subtitle: "Our services are designed to address the core transformation priorities shaping modern banking.",
        items: [
            {
                icon: "Bot",
                title: "AI-Powered CX",
                description: "We enable intelligent, personalized banking experiences through AI-driven engagement and conversational experiences that improve responsiveness."
            },
            {
                icon: "Users",
                title: "Customer 360",
                description: "We build unified customer intelligence platforms that provide complete visibility across interactions, enabling insight-led engagement, personalization and better decision-making."
            },
            {
                icon: "CreditCard",
                title: "Payment Integration",
                description: "We design and integrate secure, scalable transactional systems that enable seamless connectivity across banking platforms, payment ecosystems and third-party services."
            },
            {
                icon: "Cloud",
                title: "Cloud Migration",
                description: "We help financial institutions modernize infrastructure through secure and scalable cloud transformation strategies that improve agility, operational efficiency and resilience."
            },
            {
                icon: "Coins",
                title: "Digital Lending",
                description: "We streamline digital lending journeys across pre-qualification, onboarding, documentation and approval workflows to accelerate decisioning and reduce friction across the lifecycle."
            },
            {
                icon: "TrendingUp",
                title: "Cross Sell Initiatives",
                description: "We enable data-driven cross-sell strategies and integrated engagement models that improve customer retention, increase product adoption and strengthen long-term relationships."
            }
        ]
    },
    impact: {
        title: "What We Have Delivered",
        subtitle: "Our experience spans lending, onboarding, customer engagement and platform modernization across banking ecosystems. We help financial institutions accelerate transformation, reduce operational complexity and deliver more connected customer experiences at scale.",
        stats: [
            { value: "24/7", label: "Intelligent Banking <br /> Operations" },
            { value: "~2 Mins", label: "Loan Application <br /> Processing" },
            { value: "99.6%", label: "Autonomous Data Extraction <br /> Accuracy" },
            { value: "70%", label: "Reduction In <br /> Manual Reviews" }
        ]
    },
    caseStudies: {
        title: "Case Studies",
        subtitle: "Real-world implementations that demonstrate how we have enabled banks to transform experiences, accelerate lending and modernize operations at scale.",
        studies: [
            {
                title: "<span class='text-[#3B82F6]'>Autonomous Lending Experience</span> with FinXServe & Agentforce",
                description: "Built an AI-driven lending journey that automates document processing, decisioning and approvals.",
                href: "/insights/case-studies/autonomous-lending-experiences",
                image: "/images/Case_Study/1.png"
            },
            {
                title: "<span class='text-[#3B82F6]'>Faster Loan Processing</span> with Agentforce Document Intelligence",
                description: "Built an AI-powered lending concierge that accelerates loan processing and approvals.",
                href: "/insights/case-studies/instant-loan-processing",
                image: "/images/Case_Study/4.png"
            },
            {
                title: "<span class='text-[#3B82F6]'>Core Banking Transformation</span> on Microsoft",
                description: "50% faster loan approvals and 30% lower costs with Microsoft-led modernization.",
                href: "/insights/case-studies/core-banking-transformation",
                image: "/images/Case_Studies/Optimized/cs-8.png"
            }
        ]
    }
};
