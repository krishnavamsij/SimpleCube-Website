/**
 * BANKING INDUSTRY CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the banking industry page.
 * It defines the hero section, introduction, services, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining banking transformation
 * - services: Array of banking service offerings with icons and descriptions
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/industries/banking/page.tsx (if implemented)
 * - Hero content for BankingHero component
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
 * - Services showcase Hyniva's banking expertise
 * - Delivery enablers show technology partnerships
 */

export const bankingContent = {
    hero: {
        title: "Banking",
        subtitle: "Banking is no longer just a transaction—it's an experience. Hyniva enables banks to modernize operations with AI-driven fraud detection, digital lending, and seamless payment integrations. Secure, smart, and built for the future.",
        backgroundImage: "/images/2025/02/Banking00.jpg",
        contactButton: {
            text: "Contact us!",
            href: "mailto:connect@hyniva.com",
        },
    },
    intro: {
        title: "The conventional borders of the banking sector are dissolving as financial institutions increasingly transition into virtual realms, laser-focused on technology. This evolution is not merely about adapting, it's a revolution.",
        description: "We understand the challenges consumers face when seeking credit and aim to turn this daunting, time-consuming journey into a reliable and efficient digital experience. Let's explore how Hyniva can help your organization leverage technology to transform your digital banking experience at its core.",
    },
    services: [
        {
            icon: "Bot",
            title: "AI Powered CX",
            description: "Our expertise extends to implementing ChatBots and implementing advanced fraud detection mechanisms, ensuring your banking operations stay at the forefront of innovation and customer satisfaction.",
        },
        {
            icon: "Users",
            title: "Customer 360",
            description: "We can introduce you to the Customer 360 view, a central data warehouse that meticulously tracks every step of the customer experience, generating insightful analytical reports.",
        },
        {
            icon: "CreditCard",
            title: "Payment Integration",
            description: "With our extensive experience in large-scale banking systems and seamless 3rd Party integrations, we excel in rapidly and safely deploying fully customized two-way transactional gateway systems.",
        },
        {
            icon: "Cloud",
            title: "Cloud Migration",
            description: "Our certified cloud experts can analyze, navigate, and seamlessly migrate your systems to the cloud at scale with reduced costs, increased process efficiency and a highly secure infrastructure.",
        },
        {
            icon: "Landmark",
            title: "Digital Lending",
            description: "Empower your customers to pre-qualify, submit documentation, and close their loans entirely online, reducing costs and timelines. Transform your origination process with a focus on customization.",
        },
        {
            icon: "Lightbulb",
            title: "Cross Sell Initiatives",
            description: "We assist you in crafting and seamlessly integrating customized, non-intrusive cross-sell initiatives that are strategically designed to boost customer retention and satisfaction.",
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
        title: "Ready to Start Your Digital Transformation? Send Us An Email Today!",
        buttonText: "Let's Go!",
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
