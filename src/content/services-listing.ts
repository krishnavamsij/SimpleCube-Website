/**
 * SERVICES LISTING CONTENT CONFIGURATION
 *
 * This file contains all the content data for the services listing page.
 * It defines the hero section, introduction, services grid, and CTA.
 *
 * Structure:
 * - hero: Hero section with title, subtitle, and background image
 * - intro: Introduction section explaining services expertise
 * - services: Array of service offerings with icons, descriptions, and links
 * - cta: Call-to-action section for business inquiries
 *
 * Data Usage:
 * - Used by: /src/app/services/page.tsx
 * - Hero content for ServicesHero component
 * - Services array mapped to ServiceCard components
 * - CTA content for ServicesCTA component
 *
 * Service Object Structure:
 * - icon: Lucide React icon component
 * - title: Service display name
 * - description: Brief service description
 * - href: Link to detailed service page
 *
 * Notes:
 * - Background images use local storage paths
 * - Services showcase Hyniva's main service offerings
 * - Each service links to its detailed page
 */

import {
    Cpu,
    Cloud,
    Shield,
    Database,
    Lightbulb,
    Map,
    Radio,
    Code,
    BarChart,
    Settings
} from "lucide-react";

export const servicesListingContent = {
    hero: {
        title: "ENTERPRISE-GRADE TECHNOLOGY SERVICES",
        subtitle: "From legacy modernization to AI-powered innovation, Hyniva delivers comprehensive technology services that transform businesses and accelerate growth.",
        subtitleMobile: "From legacy modernization to AI-powered innovation, Hyniva delivers comprehensive technology services that transform businesses and accelerate growth.",
        backgroundImage: "/images/Our_Services/Digital_Transformation_no_BG.svg",
    },
    intro: {
        title: "Transform Your Business with Our Expert Services",
        description: "Our comprehensive suite of services is designed to address every aspect of your digital transformation journey. Whether you need to modernize legacy systems, implement cutting-edge AI solutions, or optimize your cloud infrastructure, our expert teams are ready to deliver measurable results.",
    },
    services: [
        {
            icon: Cpu,
            title: "Digital Transformation",
            description: "Comprehensive digital transformation services including legacy system modernization, cloud migration, and workflow optimization.",
            href: "/services/digital-transformation",
        },
        {
            icon: Settings,
            title: "Salesforce",
            description: "Salesforce implementation, customization, and optimization services for maximum ROI with CRM, automation, and analytics.",
            href: "/services/enterprise-platforms/salesforce",
        },
        {
            icon: Cloud,
            title: "Cloud Migration",
            description: "Strategic cloud migration and adoption services to enhance scalability, security, and cost-effectiveness.",
            href: "/services/digital-transformation/cloud-migration",
        },
        {
            icon: Shield,
            title: "CyberSecurity Compliance",
            description: "Robust cybersecurity and data protection measures to ensure alignment with industry standards.",
            href: "/services/cybersecurity",
        },
        {
            icon: Database,
            title: "Data Intelligence",
            description: "Advanced data analytics and intelligence solutions to drive informed decision-making.",
            href: "/services/digital-transformation/data-intelligence",
        },
        {
            icon: Lightbulb,
            title: "Applied AI",
            description: "Cutting-edge AI solutions and machine learning implementations to automate and optimize processes.",
            href: "/services/digital-transformation/applied-ai",
        },
        {
            icon: Code,
            title: "Product Development",
            description: "End-to-end product development services from concept to deployment and maintenance.",
            href: "/services/product-development",
        },
        {
            icon: Map,
            title: "IT Strategy",
            description: "Strategic IT consulting and roadmap development to align technology with business goals.",
            href: "/services/it-strategy",
        },
        {
            icon: Settings,
            title: "Enterprise Platforms",
            description: "Implementation and optimization of enterprise platforms including Microsoft solutions and other enterprise systems.",
            href: "/services/enterprise-platforms/microsoft-services",
        },
    ],
    cta: {
        title: "Ready to Transform Your Business? Let's Talk!",
        buttonText: "Get Started",
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
