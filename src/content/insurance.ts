import { LucideIcon, Monitor, Calculator, Shield, Bot, Users, Cloud, RefreshCw, BarChart } from "lucide-react";

export const insuranceContent = {
    hero: {
        badge: "INSURANCE",
        title: "Redefining insurance operations through <br />AI-driven claims orchestration",
        subtitle: "Automated claim assignment, intelligent field coordination and <br />real-time servicing across the insurance lifecycle.",
        backgroundImage: "/images/Industries_Section/Insurance_Subpage/Hero Banner.png",
    },
    alternatingSections: [
        {
            title: "INSURANCE HAS MOVED BEYOND POLICY MANAGEMENT",
            content: [
                "Insurance organizations are under increasing pressure to modernize operations amid rising customer expectations, catastrophic event volumes, regulatory complexity and growing operational costs. Yet many insurers still rely on fragmented workflows, manual claim assignment and disconnected field coordination that slow execution and limit operational visibility.",
                "As AI and automation adoption accelerates, insurers are rethinking how claims operations, servicing and field coordination are managed at scale."
            ],
            imagePosition: "left",
            image: "/images/Industries_Section/Insurance_Subpage/INSURANCEHASMOVEDBEYONDPOLICYMANAGEMENT.png", 
        },
        {
            title: "WHAT MODERN INSURANCE DEMANDS",
            content: [
                "Modern insurance requires faster claims resolution, intelligent operational visibility and seamless customer servicing across every stage of the claims lifecycle.",
                "Insurers must improve adjuster utilization, streamline coordination across distributed teams and enable real-time communication while managing growing claim volumes and increasingly complex workflows. At the same time, customers expect transparent updates, faster resolutions and frictionless digital experiences during critical moments."
            ],
            imagePosition: "right",
            image: "/images/Industries_Section/Insurance_Subpage/WHATMODERNINSURANCEDEMANDS.png", 
        },
        {
            title: "OUR APPROACH TO CONNECTED INSURANCE OPERATIONS",
            content: [
                "We help insurers modernize claims operations through AI-driven orchestration, intelligent automation and connected operational workflows. Our approach unifies intake, assignment, field coordination, communication, assessment and settlement into a connected ecosystem that improves execution speed and reduces manual effort across the claims lifecycle.",
                "Using intelligent workload balancing, automated routing, live tracking and real-time communication, we help insurers accelerate claims resolution, improve operational efficiency and deliver more responsive customer experiences."
            ],
            imagePosition: "left",
            image: "/images/Industries_Section/Insurance_Subpage/OURAPPROACHTOCONNECTED INSURANCEOPERATIONS.png",
        }
    ],
    offerings: {
        title: "OUR OFFERINGS",
        subtitle: "Our services are designed to address the core operational and transformation priorities shaping modern insurance.",
        items: [
            {
                icon: "Network",
                title: "Claims Orchestration",
                description: "We streamline and automate claims coordination across intake, assignment, assessment, review and settlement workflows."
            },
            {
                icon: "Route",
                title: "Intelligent Claims Routing",
                description: "We enable automated claim distribution, workload balancing and real-time field coordination based on adjuster availability and operational priorities."
            },
            {
                icon: "Smartphone",
                title: "Digital Claims Servicing",
                description: "We deliver connected servicing experiences with automated notifications, live tracking, seamless scheduling and real-time communication."
            },
            {
                icon: "BrainCircuit",
                title: "AI-Driven Risk & Decisioning",
                description: "We implement intelligent assessment and decisioning capabilities that improve underwriting accuracy, operational efficiency and outcomes."
            },
            {
                icon: "Zap",
                title: "Claims Workflow Automation",
                description: "We modernize claims and servicing operations through workflow automation that reduces manual effort and accelerates turnaround times."
            },
            {
                icon: "LineChart",
                title: "Operational Visibility & Analytics",
                description: "We provide real-time dashboards and operational insights that improve SLA tracking, performance visibility and claims decision-making."
            }
        ]
    },
    impact: {
        title: "WHAT WE HAVE DELIVERED",
        subtitle: "Our experience spans connected insurance operations across claims coordination, servicing and operational visibility. We help insurers modernize execution through intelligent claims assignment, automated workflows and real-time communication across the claims lifecycle.",
        stats: [
            { value: "60%", label: "Faster claims<br />processing" },
            { value: "40%", label: "Improvement in<br />operational efficiency" },
            { value: "80%", label: "Reduction in manual<br />coordination effort" },
            { value: "100%", label: "Real-time claims<br />visibility" }
        ]
    },
    caseStudies: {
        title: "CASE STUDIES",
        subtitle: "Real-world implementations that demonstrate how we have enabled insurers to transform experiences, accelerate claims and modernize operations at scale.",
        studies: [
            {
                title: "Transforming Claims Operations<br />with a Scalable Digital Platform",
                titleHighlightIndex: 1,
                description: "Unified claims workflows with real-time processing and visibility for faster settlements.",
                href: "/insights/case-studies/transforming-insurance-claims-operations-with-a-scalable-digital-platform",
                image: "/images/Case_Studies/Optimized/cs-17.png"
            },
            {
                title: "AI-Powered Customer Support<br />Automation",
                titleHighlightIndex: 1,
                description: "Deployed an AI chatbot to improve response times and reduce support effort.",
                href: "/insights/case-studies/ai-customer-support-automation",
                image: "/images/Case_Studies/23. AI-PoweredCustomerSupportAutomation.png"
            }
        ]
    }
};
