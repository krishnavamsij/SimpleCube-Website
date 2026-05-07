/**
 * IT STRATEGY CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the IT Strategy page.
 * It defines the hero section, introduction, services, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining IT Strategy capabilities
 * - services: Array of IT strategy services with icons and descriptions
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/services/it-strategy/page.tsx
 * - Hero content for ITStrategyHero component
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
 * - Services showcase Hyniva's IT strategy expertise
 * - Delivery enablers show technology partnerships
 */

export const itStrategyContent = {
    hero: {
        title: "IT Strategy",
        subtitle: "Technology isn't just a tool - it's the backbone of business innovation. Hyniva crafts IT strategies that align with your goals, combining agile frameworks, digital transformation roadmaps, and enterprise architecture to drive real impact.",
        backgroundImage: "/images/Banner_cards/IT_Strategy.png",
        contactButton: {
            text: "Contact us!",
            href: "/contact",
        },
    },
    intro: {
        title: "At the heart of Hyniva lies a commitment to sculpting high value business strategies. Our mission is to redefine how businesses approach challenges, envision growth, and strategically position themselves.",
        description: "At Hyniva, we firmly believe that the path to sustainable success requires a blend of foresight, adaptability, and strategic decisions. With our rich history of delivering impactful business strategies across diverse industries, here is what sets us apart.",
    },
    services: [
        {
            icon: "Target",
            title: "Agile Methodology",
            description: "Hyniva focuses on Agile methodologies and framework to create a seamless, highly optimized business workflow that enables early change requests, requirement alignment and cost optimization.",
        },
        {
            icon: "Lightbulb",
            title: "Digital Transformation",
            description: "We enable a seamless and efficient digital transformation strategy by leveraging emerging technologies, such as artificial intelligence, cloud computing, and data analytics.",
        },
        {
            icon: "Building",
            title: "Enterprise Architecture",
            description: "We enable planning, designing, deployment and management of the structure and IT operations of an organization to ensure complete alignment with its business goals and objectives.",
        },
        {
            icon: "Search",
            title: "Analysis & Planning",
            description: "Collaboratively, we conduct thorough market analyses, identify key opportunities, and craft a roadmap that aligns with your business goals.",
        },
        {
            icon: "Play",
            title: "Implementation & Execution",
            description: "From resource allocation to risk mitigation, we navigate the complexities of execution, ensuring your strategy is not just a plan but a catalyst for tangible results.",
        },
        {
            icon: "Monitor",
            title: "Monitoring & Adaptation",
            description: "We provide continuous monitoring and adaptation services, ensuring your strategy remains agile and responsive to market dynamics.",
        },
    ],
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
        title: "Ready to get started? Contact us!",
        buttonText: "Let's Go",
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
