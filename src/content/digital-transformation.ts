/**
 * DIGITAL TRANSFORMATION SERVICE CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the digital transformation service page.
 * It defines the hero section, introduction, services, case studies, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining digital transformation
 * - services: Array of digital transformation service offerings with icons and descriptions
 * - caseStudies: Array of case studies with images and links
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/digital-transformation/page.tsx
 * - Hero content for DigitalTransformationHero component
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
 * - Services showcase Hyniva's digital transformation expertise
 * - Case studies show real-world implementations
 * - Delivery enablers show technology partnerships
 */

export const digitalTransformationContent = {
    hero: {
        title: "Digital Transformation",
        subtitle: "The digital revolution waits for no oneembrace change with Hyniva. Whether modernizing legacy systems, migrating to the cloud, or optimizing workflows, we tailor transformation strategies that future-proof your business.",
        backgroundImage: "/images/Banner_cards/Digital_Transformation.png",
        contactButton: {
            text: "Contact us!",
            href: "/contact",
        },
    },
    intro: {
        title: "The world is accelerating toward a fully digital future that demands change.",
        description: "Navigating the endless possibilities of a digital experience can be daunting, but with Hyniva as your strategic ally, we simplify the complexities for you. Our expertise lies in customized solutions and products that match with your distinctive business necessities, guaranteeing a innovation and growth. Here is a glimpse of the services we offer.",
    },
    services: [
        {
            icon: "Windows",
            title: "Custom Applications",
            description: "Design and implement powerful user-centric solutions that streamline workflows, increase productivity and boost customer satisfaction.",
        },
        {
            icon: "Maps",
            title: "Digital Strategy",
            description: "We assess your current business workflow and goals to formulate a digital strategy that identifies and utilizes unique opportunities to boost your business growth.",
        },
        {
            icon: "Security",
            title: "CyberSecurity Compliance",
            description: "Implement robust cybersecurity and data protection measures to ensure you are aligned with industry standards.",
        },
        {
            icon: "Music",
            title: "Legacy System Modernization",
            description: "We transform and modernize your legacy systems for improved performance, features, flexibility and experience.",
        },
        {
            icon: "Cloud",
            title: "Cloud Migration",
            description: "We strategically enable cloud migration and adoption to enhance scalability, security, flexibility and reliability and cost-effectiveness.",
        },
    ],
    caseStudies: [
        {
            title: "Legacy System Modernization",
            type: "Case Study",
            description: "Tresl, a prominent player in the auto loan aggregation space with nearly two decades of experience, faced a critical juncture with its legacy system technology. Tresl confronted a pressing need for innovation and scalability.",
            image: "/images/2026/02/Legacy-System-Modernization.png",
            link: "/insights/case-studies/modernizing-a-legacy-platform",
        },
        {
            title: "Zero-Access Migration",
            type: "Case Study",
            description: "Hyniva completed a full digital migration in 2 months using only the live site no backend access. Agile execution and SDET-led quality turned the impossible into enterprise-grade delivery.",
            image: "/images/2026/02/Zero-Access-Migration-.png",
            link: "/insights/case-studies/a-race-against-time-that-others-refused-to-run",
        },
        {
            title: "Empowering Credit Unions to Thrive in a Digital Era",
            type: "Article",
            description: "Credit unions have long been trusted for their personalized financial services, but the evolving digital landscape presents significant challenges.",
            image: "/images/2025/04/Empowering-Credit-Unions.png",
            link: "/insights/blogs/empowering-credit-unions-to-thrive-in-a-digital-era",
        },
        {
            title: "Accelerating Digital Transformation at Credit Unions",
            type: "Article",
            description: "Credit unions have long been an integral part of financial services, offering members personalized banking experiences, competitive rates, and a strong sense of community.",
            image: "/images/2025/03/Copy-of-Credit-Unions-.png",
            link: "/insights/blogs/accelerating-digital-transformation-at-credit-unions",
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
        buttonText: "Let's Go!",
        href: "/contact",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
