/**
 * MICROSOFT SERVICES CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the Microsoft Services page.
 * It defines the hero section, introduction, services, case studies, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining Microsoft services
 * - services: Array of Microsoft service offerings with icons and descriptions
 * - caseStudies: Array of case studies with images and links
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/services/microsoft-services/page.tsx
 * - Hero content for MicrosoftServicesHero component
 * - Services array mapped to ServiceCard components
 * - Case studies displayed as carousel or grid
 * - Delivery enablers displayed as partner logos
 * 
 * Service Object Structure:
 * - icon: Lucide React icon name
 * - title: Service display name
 * - description: Detailed service description
 * 
 * Notes:
 * - Background images use local storage paths
 * - Contact button links to email for business inquiries
 * - Services showcase Hyniva's Microsoft expertise
 * - Case studies show real-world implementations
 * - Delivery enablers show technology partnerships
 */

export const microsoftServicesContent = {
    hero: {
        title: "Microsoft Services",
        subtitle: "Power business transformation with Microsoft's enterprise ecosystem. At Hyniva, we unlock the full potential of Microsoft technologies-spanning Azure, Dynamics 365, Power Platform, and Microsoft 365-to drive agility, innovation, and growth.",
        backgroundImage: "/images/Banner_cards/Microsoft_services.png",
        contactButton: {
            text: "Contact us!",
            href: "/contact",
        },
    },
    intro: {
        title: "At Hyniva, we unlock the full potential of Microsoft technologies-spanning Azure, Dynamics 365, Power Platform, and Microsoft 365-to drive agility, innovation, and growth.",
        description: "In today's digital-first world, Microsoft solutions form the backbone of enterprise transformation. From cloud adoption and modern workplace solutions to CRM/ERP modernization and advanced analytics, Hyniva empowers businesses to maximize value from Microsoft's ecosystem. Our team combines deep domain expertise with a proven track record of Microsoft implementations across industries, enabling organizations to accelerate digital transformation, optimize operations, and deliver superior customer experiences.",
    },
    services: [
        {
            icon: "Globe",
            title: "Web & Cloud Apps",
            description: "Seamlessly migrate, modernize, and manage workloads on Microsoft Azure. We specialize in cloud-native app development, infra modernization, and advanced security.",
        },
        {
            icon: "Monitor",
            title: "Dynamics 365",
            description: "We implement and customize Dynamics 365 to streamline business processes, unify customer data, and optimize operations for sales, service, finance, and supply chain.",
        },
        {
            icon: "Database",
            title: "Power Platform",
            description: "Leverage low-code solutions for data-driven insights, process automation, and rapid application development-empowering citizen developers and enterprise teams alike.",
        },
        {
            icon: "Users",
            title: "Microsoft 365",
            description: "Transform collaboration and productivity with Microsoft 365. From Teams enablement to SharePoint modernization, we create secure, connected workplaces.",
        },
        {
            icon: "Brain",
            title: "Azure Data & AI",
            description: "Unlock intelligent insights with Azure Synapse, AI services, and AI Agents. We enable advanced analytics, machine learning, prompt engineering, and predictive capabilities.",
        },
    ],
    caseStudies: [
        {
            title: "Digital Logistics",
            type: "Case Study",
            description: "Hyniva transformed legacy logistics with Microsoft technologies, enabling real-time tracking, mobile operations, faster performance, and better customer experiences.",
            image: "/images/2026/02/Digital-Logistics.png",
            link: "/insights/case-studies/logistics-platform-modernization-with-microsoft",
        },
        {
            title: "Banking Modernization",
            type: "Case Study",
            description: "Hyniva reimagined financial workflows using Microsoft technologies, streamlining loan processing, compliance, and customer onboarding.",
            image: "/images/2026/02/core-banking-Modernization.png",
            link: "/insights/case-studies/transforming-core-banking-operations-with-microsoft-innovation",
        },
        {
            title: "Cloud Modernization",
            type: "Case Study",
            description: "Hyniva transformed legacy CRM into a modern Dynamics 365 platform, improving scalability, efficiency, and user experience for smarter service delivery.",
            image: "/images/2026/02/Cloud-Modernization.png",
            link: "/insights/case-studies/empowering-enterprises-through-microsoft-powered-modernization",
        },
        {
            title: "Campaign Reinvented",
            type: "Case Study",
            description: "Hyniva created a custom .NET solution for smarter, automated campaign management. The platform drives efficiency, precision and scalability for IT businesses.",
            image: "/images/2026/02/Campaign-Management.png",
            link: "/insights/case-studies/hyniva-campaign-management",
        },
    ],
    deliveryEnablers: {
        title: "Delivery Enablers",
        logos: [
            { name: "AWS", src: "/images/2023/11/aws-logocopy120.png" },
            { name: "Microsoft", src: "/images/2023/11/microso-copy120.png" },
            { name: "Jira", src: "/images/2023/11/jiraa-copy120.png" },
            { name: "GitHub", src: "/images/2023/11/githu-copy120.png" },
            { name: "Genesys", src: "/images/2023/11/gencopy120.png" },
        ],
    },
    cta: {
        title: "Ready to Get Started? Contact us!",
        buttonText: "Let's Go!",
        href: "/contact",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
