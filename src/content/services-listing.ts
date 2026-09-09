/**
 * SERVICES LISTING CONTENT — SimpleCube
 * Source: SimpleCube Website Content Blueprint (§2)
 */

import {
    Cpu,
    Cloud,
    Code,
    Settings
} from "lucide-react";

export const servicesListingContent = {
    hero: {
        title: "BOUTIQUE SOFTWARE DELIVERY SERVICES",
        subtitle: "We turn complex operational bottlenecks into streamlined digital workflows — custom software, Salesforce, product development, and digital transformation.",
        subtitleMobile: "We turn complex operational bottlenecks into streamlined digital workflows — custom software, Salesforce, product development, and digital transformation.",
        backgroundImage: "/images/Our_Services/Digital_Transformation_no_BG.svg",
    },
    intro: {
        title: "Services Built for Growing Businesses",
        description: "SimpleCube delivers enterprise-level technical execution with boutique attention. Whether you need bespoke software, Salesforce depth, full SDLC product partnership, or digital transformation, our lean Texas team stays close to the work.",
    },
    services: [
        {
            icon: Code,
            title: "Custom Software Development",
            description: "Bespoke applications, internal portals, and data-routing systems architected to your business rules and operational goals.",
            href: "/services/strategy-consulting",
        },
        {
            icon: Settings,
            title: "Salesforce Integrations & Development",
            description: "Complex Salesforce ecosystems, custom lead routing, and API connections that automate workflows and unify data.",
            href: "/services/enterprise-platforms/salesforce",
        },
        {
            icon: Cpu,
            title: "Product Development",
            description: "Full SDLC partnership from ideation to launch — MVP to market quickly, then iterative, data-driven enhancements.",
            href: "/services/product-engineering",
        },
        {
            icon: Cloud,
            title: "Digital Transformation",
            description: "Digitize manual processes, modernize infrastructure, and migrate to secure environments to future-proof your business.",
            href: "/services/digital-transformation",
        },
    ],
    cta: {
        title: "Ready to Build Something Incredible?",
        buttonText: "Discuss Your Project",
        buttonHref: "mailto:kvjadapolu@simplecube.co",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
