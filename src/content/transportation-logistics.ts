/**
 * TRANSPORTATION & LOGISTICS INDUSTRY CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the transportation industry page.
 * It defines the hero section, introduction, services, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining transportation technology transformation
 * - services: Array of transportation service offerings
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/industries/transportation-logistics/page.tsx (if implemented)
 * - Hero content for TransportationHero component
 * - Services array mapped to ServiceCard components
 * - Delivery enablers displayed as partner logos
 * 
 * Notes:
 * - Background images use local storage paths
 * - Contact button links to email for business inquiries
 * - Services showcase Hyniva's transportation expertise
 * - Focus on logistics optimization and digital transformation
 */

export const transportationLogisticsContent = {
    /**
     * Hero section configuration
     * 
     * - title: Hero title
     * - subtitle: Hero subtitle
     * - backgroundImage: Background image path
     * - contactButton: Contact button configuration
     */
    hero: {
        title: "Transportation & Logistics",
        subtitle: "Stay ahead of demand with AI-powered logistics solutions that optimize fleets, streamline inventory, and enhance real-time tracking. Hyniva helps you transform supply chain complexities into seamless, data-driven efficiency.",
        backgroundImage: "/images/Banner_cards/Transport_logistics.png",
        contactButton: {
            /**
             * Contact button configuration
             * 
             * - text: Button text
             * - href: Button link
             */
            text: "Contact us!",
            href: "/contact",
        },
    },
    intro: {
        title: "Navigate the challenges supply & demand of a growing world population with ease and efficiency – embrace technology to revolutionize your transportation and logistical processes. The perfect blend of strategy and technology is your key to a speed boost, keeping you ahead in the game.",
        description: "The transportation and logistics of goods has become easier with better infrastructure and improved vehicle efficiency. However, the ever increasing consumer base demands has introduced challenges in the supply chain, inventory and delivery vehicle management. Bid farewell to legacy technologies and embrace digital transformation for optimized supply chain, inventory, and delivery vehicle management. Let's explore how Hyniva can assist you in this process.",
    },
    capabilities: {
        title: "Our Capabilities",
        services: [
            {
                icon: "Wifi",
                title: "IOT Powered Systems",
                description: "We tie together IOT systems and applications to collect, analyze, and optimize overall business operations for a safer and smarter future.",
            },
            {
                icon: "Monitor",
                title: "Enhanced CX",
                description: "We can help you design, create and deploy user-centric web applications for a comprehensive overview of inventory and delivery timelines.",
            },
            {
                icon: "Truck",
                title: "Fleet Management",
                description: "Revolutionize fleet management and bring tasks like vehicle acquisition, maintenance, fuel management, driver management, and compliance to your fingertips.",
            },
            {
                icon: "BarChart3",
                title: "Data Analytics",
                description: "Leveraging AI, we can enable analytical report generation, insights and performance metrics for each segment of your logistics data.",
            },
        ],
    },
    deliveryEnablers: {
        title: "Delivery Enablers",
        logos: [
            { name: "AWS", src: "/images/2023/11/aws-logocopy120.png" },
            { name: "Microsoft", src: "/images/2023/11/microso-copy120.png" },
            { name: "Salesforce", src: "/images/2023/11/salesforce-logo-copy120.png" },
            { name: "Jira", src: "/images/2023/11/jiraa-copy120.png" },
            { name: "GitHub", src: "/images/2023/11/githu-copy120.png" },
            { name: "Genesys", src: "/images/2023/11/gencopy120.png" },
        ],
    },
    cta: {
        title: "Ready to Start Your Digital Transformation? Contact Us!",
        buttonText: "Let's Go!",
        href: "/contact",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
