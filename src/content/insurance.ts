import { LucideIcon, Monitor, Calculator, Shield, Bot, Users, Cloud, RefreshCw, BarChart } from "lucide-react";

export const insuranceContent = {
    hero: {
        badge: "INSURANCE",
        title: "Redefining insurance operations through<br />AI-driven claims orchestration",
        subtitle: "Automated claim assignment, intelligent field coordination and<br />real-time servicing across the insurance lifecycle.",
        backgroundImage: "/images/insurance/hero-banner.png",
    },
    alternatingSections: [
        {
            title: "INSURANCE HAS MOVED BEYOND POLICY MANAGEMENT",
            content: [
                "Insurance organizations are under growing pressure to modernize operations amid rising customer expectations, catastrophic event volumes, and increasing regulatory complexity.",
                "Yet many insurers still rely on fragmented workflows, manual claim assignment, and disconnected field coordination that slow execution and limit operational visibility.",
                "As AI and automation adoption accelerates, insurers are shifting toward connected claims ecosystems that enable faster coordination, intelligent decisioning, and more responsive servicing across the claims lifecycle."
            ],
            imagePosition: "left",
            image: "/images/insurance/image-1.png", 
        },
        {
            title: "WHAT MODERN INSURANCE DEMANDS",
            content: [
                "Modern insurance is defined by how efficiently organizations can assess risk, coordinate claims and deliver responsive customer experiences at scale.",
                "Insurers today require intelligent claims routing, automated workflow execution, real-time operational visibility and connected servicing experiences that reduce friction across every stage of the process.",
                "Customers increasingly expect transparent communication, live status updates, faster resolutions and seamless digital interactions without constant follow-ups.",
                "At the same time, organizations must improve execution consistency while managing growing claim volumes, distributed field operations and increasingly complex workflows."
            ],
            imagePosition: "right",
            image: "/images/insurance/image-2.png", 
        },
        {
            title: "OUR APPROACH TO CONNECTED INSURANCE OPERATIONS",
            content: [
                "We help insurers modernize claims operations through AI-driven orchestration, intelligent automation, and real-time operational visibility.",
                "Our approach connects intake, assignment, field coordination, communication, assessment, and settlement into a unified operational ecosystem that reduces manual effort and improves execution speed.",
                "Claims are automatically routed using intelligent workload balancing based on adjuster availability, schedules, proximity, and operational priorities. Automated notifications, live tracking, and real-time communication enable faster coordination, seamless customer experiences, and more efficient claims resolution."
            ],
            imagePosition: "left",
            image: "/images/insurance/image-3.png",
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
                title: "Intelligent Claims Assignment & Routing",
                description: "We enable automated claim distribution, workload balancing and real-time field coordination based on adjuster availability, schedules and operational priorities."
            },
            {
                icon: "Smartphone",
                title: "Digital Claims Servicing",
                description: "We deliver connected servicing experiences with automated notifications, live tracking, seamless scheduling and real-time communication across the claims journey."
            },
            {
                icon: "BrainCircuit",
                title: "AI-Driven Risk & Decisioning",
                description: "We implement intelligent assessment and decisioning capabilities that improve underwriting accuracy, operational consistency and execution outcomes."
            },
            {
                icon: "Zap",
                title: "Claims Workflow Automation",
                description: "We modernize claims and servicing operations through workflow automation that reduces manual effort and accelerates turnaround times."
            },
            {
                icon: "LineChart",
                title: "Operational Visibility & Analytics",
                description: "We provide real-time dashboards and operational insights that improve SLA tracking, operational monitoring, performance visibility and decision-making across claims operations."
            }
        ]
    },
    impact: {
        title: "WHAT WE HAVE DELIVERED IN INSURANCE",
        subtitle: "Our experience is grounded in building and scaling connected insurance operations that improve claims coordination, servicing efficiency and operational visibility. From intelligent claims assignment and adjuster orchestration to automated workflows and real-time communication, we help insurers modernize execution across the entire claims lifecycle .",
        stats: [
            { value: "60%", label: "Faster claims processing" },
            { value: "40%", label: "Improvement in operational efficiency" },
            { value: "80%", label: "Reduction in manual coordination effort" },
            { value: "100%", label: "Real-time claims visibility" }
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
