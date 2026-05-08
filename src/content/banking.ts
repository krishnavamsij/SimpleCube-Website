import { LucideIcon, Bot, Users, CreditCard, Cloud, Smartphone, TrendingUp } from "lucide-react";

export const bankingContent = {
    hero: {
        badge: "BANKING",
        title: "Redefining banking through<br />connected, intelligent experiences",
        subtitle: "We help financial institutions deliver real-time, seamless<br />and context-aware journeys across every interaction.",
        backgroundImage: "/images/Industries_Section/Banking_Subpage/herobanneroption.png",
    },
    alternatingSections: [
        {
            title: "THE SHIFT",
            content: [
                "Banking is being reshaped by rapid AI adoption, evolving regulatory expectations and the expansion of financial services into embedded ecosystems. As experiences become more fluid and interconnected, traditional operating models are struggling to keep pace.",
                "Many institutions continue to operate with fragmented data, disconnected platforms and limited readiness for real-time decisioning. The result is slower innovation, inconsistent customer journeys and increasing operational complexity."
            ],
            imagePosition: "left",
            image: "/images/Industries_Section/Banking_Subpage/TheShift.png", 
        },
        {
            title: "WHAT MODERN BANKING DEMANDS",
            content: [
                "Banking today is defined by how effectively it delivers across every moment of interaction. Customers expect journeys that are immediate, intuitive and continuous — whether they begin digitally, move to assisted channels, or extend into partner ecosystems.",
                "At the same time, institutions must balance this with the need for security, compliance and operational efficiency, ensuring that every experience is both seamless and trusted."
            ],
            imagePosition: "right",
            image: "/images/Industries_Section/Banking_Subpage/WHATMODERNBANKINGDEMANDS.png",
        },
        {
            title: "OUR APPROACH",
            content: [
                "We enable banks to move beyond fragmented transformation by aligning experience, data and platform capabilities into a connected execution model. Instead of addressing these areas in isolation, we bring them together to ensure that every initiative contributes to a unified and measurable outcome. This approach reduces complexity, accelerates execution and enables consistent experience delivery across the organization."
            ],
            imagePosition: "left",
            image: "/images/Industries_Section/Banking_Subpage/Ourapproach.png",
        }
    ],
    offerings: {
        title: "BANKING OFFERINGS",
        subtitle: "Our services are designed to address the core transformation priorities shaping modern banking.",
        items: [
            {
                icon: "Bot",
                title: "AI-Powered CX",
                description: "We enable intelligent and personalized banking experiences through AI-driven engagement, conversational interfaces and advanced fraud detection capabilities that improve responsiveness and customer trust."
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
                icon: "Smartphone",
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
        title: "PROVEN IMPACT IN BANKING",
        subtitle: "Our experience spans lending, onboarding, customer engagement and platform modernization across banking ecosystems. By combining deep domain expertise with strong product engineering and execution capabilities, we help financial institutions accelerate transformation, reduce operational complexity and deliver more connected customer experiences at scale.",
        stats: [
            { value: "220+", label: "Applications Delivered" },
            { value: "$500K+", label: "Annual Client Savings" },
            { value: "30+", label: "Enterprise Clients" },
            { value: "50+", label: "Cloud & AI Experts" }
        ]
    },
    caseStudies: {
        title: "CASE STUDIES",
        subtitle: "Real-world implementations that demonstrate how we have enabled banks to transform experiences, accelerate lending and modernize operations at scale.",
        studies: [
            {
                title: "Autonomous Lending Experience<br />with FinXServe & Agentforce",
                titleHighlightIndex: 1, // Highlighting first half
                description: "Built an AI-driven lending journey that automates document processing, decisioning and approvals.",
                href: "/insights/case-studies/autonomous-lending-experiences",
                image: "/images/Case_Study/1.png"
            },
            {
                title: "Faster Loan Processing<br />with Agentforce Document Intelligence",
                titleHighlightIndex: 1, // Highlighting first half
                description: "Loan applications completed in under 2 minutes with AI-driven document intelligence.",
                href: "/insights/case-studies/instant-loan-processing",
                image: "/images/Case_Study/4.png"
            },
            {
                title: "Modernizing Contact Centers with<br />Intelligent IVR Self-Service",
                titleHighlightIndex: 2, // Highlighting second half
                description: "Transformed legacy IVR into a Smart Customer Engagement Interaction System.",
                href: "/insights/case-studies/intelligent-ivr-self-service",
                image: "/images/Case_Study/2.png"
            }
        ]
    }
};
