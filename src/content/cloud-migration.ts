/**
 * CLOUD MIGRATION CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the Cloud Migration page.
 * It defines the hero section, introduction, services, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining Cloud Migration capabilities
 * - services: Array of cloud migration services with icons and descriptions
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/cloud-migration/page.tsx
 * - Hero content for CloudMigrationHero component
 * - Services array mapped to ServiceCard components
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
 * - Services showcase Hyniva's cloud migration expertise
 * - Delivery enablers show technology partnerships
 */

export const cloudMigrationContent = {
    hero: {
        title: "Cloud Migration",
        subtitle: "Your journey to the cloud starts here. From intelligent cloud architecture to cost-optimized strategies, Hyniva ensures seamless cloud adoption with security, agility, and performance at the core.",
        backgroundImage: "/images/Banner_cards/Cloud_Migration.png",
        contactButton: {
            text: "Contact us!",
            href: "/contact",
        },
    },
    intro: {
        title: "Embrace the unstoppable wave of digital transformation as the world moves to the cloud. Cloud migration might seem daunting, but we're here to simplify the process and unleash the true power of cloud computing.",
        description: "At Hyniva, we see cloud migration as a pivotal stride in your digital transformation journey. Unlock the potential with our team of certified cloud experts guiding you through your cloud transformation journey.",
    },
    services: [
        {
            icon: "Zap",
            title: "DevOps Automation",
            description: "By leveraging AI capabilities, we can streamline your DevOps workflows such as code deployment and testing to ensure your agile development processes are efficient.",
        },
        {
            icon: "DollarSign",
            title: "Cost Optimization",
            description: "Our AI-powered recommendations for cloud strategy and configurations will enable your organization to cut down operational and overhead costs by using large scale cloud solutions from AWS, Azure etc.",
        },
        {
            icon: "Box",
            title: "Architecture Design",
            description: "We develop an optimized cloud architecture with a core focus on your business specific operations, ensuring that applications run efficiently, securely, and take full advantage of AWS cloud-native features.",
        },
        {
            icon: "Cloud",
            title: "Smart Cloud",
            description: "Our team of certified experts with a core specialization in AWS based cloud solutions will provide comprehensive support, proactive monitoring, & effective management of your cloud operations.",
        },
        {
            icon: "ArrowRight",
            title: "Application Migration",
            description: "Adapt and migrate applications to the cloud, ensuring they are compatible with the chosen cloud platform and optimized for performance.",
        },
    ],
    deliveryEnablers: {
        title: "Delivery Enablers",
        logos: [
            { name: "AWS", src: "/images/2023/11/aws-logocopy120.png" },
            { name: "Microsoft", src: "/images/2023/11/microso-copy120.png" },
            { name: "Salesforce", src: "/images/2023/11/salesforce-logo-copy120.png" },
            { name: "Jira", src: "/images/2023/11/jiraa-copy120.png" },
            { name: "Genesys", src: "/images/2023/11/gencopy120.png" },
        ],
    },
    cta: {
        title: "Ready to get started? Contact us!",
        buttonText: "Let's Go!",
        buttonHref: "mailto:kvjadapolu@simplecube.co",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
