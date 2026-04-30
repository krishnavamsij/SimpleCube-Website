/**
 * DATA INTELLIGENCE CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the Data Intelligence page.
 * It defines the hero section, introduction, services, case studies, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining Data Intelligence capabilities
 * - services: Array of data service offerings with icons and descriptions
 * - caseStudies: Array of case studies with images and links
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/services/data-intelligence/page.tsx
 * - Hero content for DataIntelligenceHero component
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
 * - Services showcase Hyniva's data expertise
 * - Case studies show real-world implementations
 * - Delivery enablers show technology partnerships
 */

export const dataIntelligenceContent = {
    hero: {
        title: "Data Intelligence",
        subtitle: "Turn raw data into powerful insights with Hyniva's cutting-edge analytics solutions. Our AI-driven approach to data warehousing, visualization, and machine learning empowers smarter decisions, sharper strategies, and unstoppable growth.",
        backgroundImage: "/images/2019/04/blog-intro.jpg",
        contactButton: {
            text: "Contact us!",
            href: "mailto:connect@hyniva.com",
        },
    },
    intro: {
        title: "Unravel the power of data for strategic intelligence. Hyniva pioneers analytics solutions, transforming raw information into actionable insights.",
        description: "Adopt the conviction that effective business intelligence requires a synergy of data analytics, technological finesse, and unwavering commitment. Hyniva boasts an impressive track record in delivering revolutionary analytics solutions across various industries.",
    },
    services: [
        {
            icon: "Database",
            title: "IDM Services",
            description: "Our services encompass Industry Data Model (IDM) solutions, enhancing businesses with efficiency in data management processes and seamless data integration.",
        },
        {
            icon: "HardDrive",
            title: "Data Warehousing",
            description: "Our expertise lies in creating secure, meticulously structured solutions through the integration of diverse data sources, aiming to empower our clients with strategic business intelligence.",
        },
        {
            icon: "Brain",
            title: "Machine Learning",
            description: "Hyniva optimizes data intelligence through the utilization of innovative machine learning models, enabling predictive analysis and anomaly detection.",
        },
        {
            icon: "BarChart3",
            title: "Data Visualization",
            description: "Create custom reports and dashboards that provide powerful data insights to enable strategic business intelligence.",
        },
    ],
    caseStudies: [
        {
            title: "Superpowered Data",
            type: "Case Study",
            description: "Effectively leveraging data can transform your business in unimaginable ways. Learn how Hyniva is helping customers utilize, analyze and leverage their data. Discover your untapped superpower.",
            image: "/images/2026/02/Superpowered-data.png",
            link: "https://hyniva.com/data-is-your-superpower/",
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
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
