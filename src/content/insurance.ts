import { LucideIcon, Monitor, Calculator, Shield, Bot, Users, Cloud, RefreshCw, BarChart } from "lucide-react";

export const insuranceContent = {
    hero: {
        badge: "INSURANCE",
        title: "Modern insurance depends on connected<br />and intelligent claims operations",
        subtitle: "Faster decisions, streamlined claims execution, and real-time<br />servicing across the insurance lifecycle.",
        backgroundImage: "/images/insurance/hero-banner.png",
    },
    alternatingSections: [
        {
            title: "INSURANCE HAS MOVED BEYOND POLICY MANAGEMENT",
            content: [
                "Insurance companies are under increasing pressure to modernize core systems and scale AI adoption in an environment shaped by rising regulatory complexity, cyber risk, and evolving customer expectations.",
                "At the same time, fragmented workflows, disconnected claims operations, and limited real-time visibility continue to slow execution and increase operational overhead.",
                "Insurers must translate growing investments in AI, data, and automation into measurable business outcomes while improving responsiveness, operational efficiency, and customer trust across every interaction."
            ],
            imagePosition: "left",
            image: "/images/insurance/image-1.png", 
        },
        {
            title: "WHAT MODERN INSURANCE DEMANDS",
            content: [
                "Modern insurance is defined by how efficiently organizations can assess risk, coordinate claims, and deliver responsive customer experiences at scale.",
                "Insurers expect faster underwriting, intelligent claims routing, seamless servicing, and real-time visibility across the claims lifecycle. Customers increasingly expect transparent communication, quicker resolutions, and frictionless digital experiences throughout the process.",
                "At the same time, organizations must ensure operational consistency, compliance, and scalability while managing growing volumes and increasingly complex workflows."
            ],
            imagePosition: "right",
            image: "/images/insurance/image-2.png", 
        },
        {
            title: "OUR APPROACH",
            content: [
                "We enable insurers to move beyond disconnected workflows by aligning claims operations, servicing platforms, and AI-driven decisioning into a connected execution model.",
                "Instead of treating underwriting, claims processing, communication, and field operations as isolated functions, we bring them together into a unified operational ecosystem that improves visibility, coordination, and execution speed.",
                "This approach helps insurers reduce operational friction, accelerate claims resolution, improve decision accuracy, and deliver more consistent customer experiences across the insurance lifecycle."
            ],
            imagePosition: "left",
            image: "/images/insurance/image-3.png",
        }
    ],
    offerings: {
        title: "INSURANCE OFFERINGS",
        subtitle: "Our services are designed to address the core operational and transformation priorities shaping modern insurance.",
        items: [
            {
                icon: "Network",
                title: "Claims Orchestration",
                description: "We streamline and automate claims coordination across intake, assignment, assessment, review, and settlement workflows."
            },
            {
                icon: "Route",
                title: "Intelligent Claims Routing",
                description: "We enable real-time assignment and workload balancing to improve adjuster utilization, responsiveness, and operational efficiency."
            },
            {
                icon: "Smartphone",
                title: "Digital Claims Servicing",
                description: "We deliver connected servicing experiences with real-time communication, live status visibility, and seamless customer interactions."
            },
            {
                icon: "BrainCircuit",
                title: "AI-Driven Risk & Decisioning",
                description: "We implement intelligent risk assessment and decisioning capabilities that improve underwriting accuracy and operational outcomes."
            },
            {
                icon: "Zap",
                title: "Claims Workflow Automation",
                description: "We modernize claims and servicing operations through workflow automation, reducing manual effort and accelerating turnaround time."
            },
            {
                icon: "LineChart",
                title: "Operational Visibility & Analytics",
                description: "We provide real-time dashboards and operational insights that improve monitoring, performance tracking, and decision-making across claims operations."
            }
        ]
    },
    impact: {
        title: "PROVEN IN INSURANCE",
        subtitle: "Our experience is grounded in building and scaling connected insurance operations that improve claims coordination, servicing efficiency, and operational visibility. From intelligent claims assignment and adjuster orchestration to automated workflows and real-time communication, we help insurers modernize execution across the claims lifecycle.",
        stats: [
            { value: "60%", label: "Faster Claims Processing" },
            { value: "40%", label: "Operational Efficiency Gain" },
            { value: "80%", label: "Reduction in Manual Work" },
            { value: "100%", label: "Real-Time Claims Visibility" }
        ]
    },
    caseStudies: {
        title: "CASE STUDIES",
        subtitle: "Real-world implementations that demonstrate how we have enabled insurers to transform experiences, accelerate claims and modernize operations at scale.",
        studies: [
            {
                title: "Automated Claims Experience<br />with Agentforce",
                titleHighlightIndex: 1,
                description: "Built an AI-driven claims journey that automates document processing, decisioning and approvals.",
                href: "/insights/case-studies/automated-claims",
                image: "/images/Case_Study/1.png"
            },
            {
                title: "Faster Underwriting<br />with Document Intelligence",
                titleHighlightIndex: 1,
                description: "Underwriting processes completed in minutes with AI-driven data extraction.",
                href: "/insights/case-studies/faster-underwriting",
                image: "/images/Case_Study/4.png"
            },
            {
                title: "Modernizing Customer Service<br />with Intelligent Self-Service",
                titleHighlightIndex: 2,
                description: "Transformed legacy support into a Smart Customer Engagement Interaction System.",
                href: "/insights/case-studies/insurance-self-service",
                image: "/images/Case_Study/2.png"
            }
        ]
    }
};
