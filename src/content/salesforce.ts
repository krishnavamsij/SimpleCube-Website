/**
 * SALESFORCE SERVICE CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the Salesforce service page.
 * It defines the hero section, introduction, services, case studies, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining Salesforce services
 * - services: Array of Salesforce service offerings with icons and descriptions
 * - caseStudies: Array of case studies with images and links
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/services/salesforce/page.tsx
 * - Hero content for SalesforceHero component
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
 * - Services showcase Hyniva's Salesforce expertise
 * - Case studies show real-world implementations
 * - Delivery enablers show technology partnerships
 */

export const salesforceContent = {
    hero: {
        eyebrow: "SALESFORCE",
        title: "Go Beyond CRM. Engineer for Growth.",
        subtitle: "We build Salesforce as a connected, scalable enterprise platform for customer experiences, operations, data and AI.",
        backgroundImage: "/images/2024/09/nature-landscape-background-1-scaled-e1726749512428.jpg",
        contactButton: {
            text: "Talk to Our Experts",
            href: "/contact",
        },
    },
    intro: {
        title: "Transform Your Business with Hyniva Salesforce Accelerator Solutions",
        description: "In today's competitive market, businesses need powerful CRM solutions to deepen customer understanding and enhance engagement. Hyniva's Salesforce expertise helps you leverage the full potential of Salesforce to streamline operations, automate workflows, and deliver exceptional customer experiences. From initial implementation to advanced customization, we provide comprehensive Salesforce solutions tailored to your unique business needs.",
    },
    services: [
        {
            icon: "Users",
            title: "Salesforce CRM Implementation",
            description: "Design and implement comprehensive Salesforce CRM solutions that centralize customer data, streamline sales processes, and enhance team collaboration for improved business performance.",
        },
        {
            icon: "Settings",
            title: "Workflow Automation",
            description: "Automate repetitive business processes with Salesforce Flow and Process Builder to increase efficiency, reduce manual errors, and enable teams to focus on high-value activities.",
        },
        {
            icon: "Smartphone",
            title: "Mobile Integration",
            description: "Extend Salesforce capabilities to mobile devices with custom mobile apps and responsive interfaces, ensuring your team can access critical data anytime, anywhere.",
        },
        {
            icon: "BarChart3",
            title: "Analytics & Insights",
            description: "Leverage Salesforce Analytics and Einstein AI to gain deep insights into customer behavior, sales trends, and business performance for data-driven decision making.",
        },
        {
            icon: "Cloud",
            title: "Experience Cloud",
            description: "Create personalized digital experiences for customers, partners, and employees with Salesforce Experience Cloud portals that integrate seamlessly with your CRM data.",
        },
        {
            icon: "Shield",
            title: "Security & Compliance",
            description: "Implement robust security measures and ensure compliance with industry regulations while maintaining data integrity and protecting sensitive customer information.",
        },
    ],
    caseStudies: [
        {
            title: "Salesforce Customer 360 Innovations for our clients",
            type: "Article",
            description: "In an increasingly competitive market, businesses are constantly seeking ways to deepen their understanding of customers and enhance engagement.",
            image: "/images/2024/10/Customer-360-1-1.png",
            link: "/insights/blogs/hynivas-vision-for-harnessing-salesforce-customer-360-innovations-for-our-clients",
        },
        {
            title: "Overcoming Obstacles with Salesforce",
            type: "Article",
            description: "In today's fast-paced market, organizations face numerous challenges that can hinder growth and efficiency. Learn how Salesforce can be leveraged to overcome these obstacles to maximize ROI.",
            image: "/images/2024/09/Salesforce.png",
            link: "/insights/blogs/overcoming-business-challenges-with-salesforce",
        },
        {
            title: "Salesforce Advantage",
            type: "Case Study",
            description: "Hyniva reimagined customer support with Salesforce - unifying data, automating workflows, and enabling proactive care for faster resolutions and happier customers.",
            image: "/images/2025/09/Salesforce-VCM.png",
            link: "/insights/case-studies/scaling-service-operations-with-salesforce",
        },
        {
            title: "IVR Modernization",
            type: "Case Study",
            description: "Hyniva modernized a wealth management firm's IVR self-service platform, simplifying call routing, improving security, and reducing call handling time.",
            image: "/images/2026/02/Modernizing-IVR-for-CC-scaled.jpg",
            link: "/insights/case-studies/intelligent-ivr-self-service",
        },
        {
            title: "LWR Modernization",
            type: "Case Study",
            description: "Hyniva modernized a credit union's Experience Cloud platform by migrating from Aura to LWR, improving speed, scalability and performance.",
            image: "/images/2026/02/Lwr-modernization.png",
            link: "/insights/case-studies/lwr-modernization",
        },
        {
            title: "Credit Union CX",
            type: "Case Study",
            description: "Lending transformed with FinXForce, unifying digital channels & reducing loan offer times to under 60 seconds - boosting ROI, engagement, & member satisfaction.",
            image: "/images/2026/02/Credit-Union-CX-e1771481017710.png",
            link: "/insights/case-studies/member-experience-transformation-at-a-leading-credit-union",
        },
        {
            title: "Contact Center Modernization with Agentforce",
            type: "Article",
            description: "Salesforce Agentforce connects fragmented contact center journeys by supporting customers, MSRs, and operations end to end - reducing wait times, manual effort, and resolution delays.",
            image: "/images/2026/01/Firefly_Gemini-Flash_A-hyper-realistic-emotionally-positive-image-of-a-customer-completing-a-customer-ser-792046.png",
            link: "/insights/blogs/modernizing-the-contact-center-with-ai-agents-from-fragmented-interactions-to-connected-journeys",
        },
        {
            title: "Experience Cloud Modernization with LWR",
            type: "Article",
            description: "Financial institutions are adopting LWR to improve performance, scalability, and digital experience delivery on Salesforce Experience Cloud.",
            image: "/images/2026/02/Lwr-modernization.png",
            link: "/insights/blogs/why-financial-institutions-are-modernizing-salesforce-experience-cloud-with-lwr",
        },
        {
            title: "AI Loan Processing",
            type: "Case Study",
            description: "Hyniva embedded Agentforce-powered document intelligence into FinXServe to automate verification and enable near-instant digital loan approvals.",
            image: "/images/2026/02/Agentforce-Powered-Document-Intelligence-for-Instant-Loan-Processing.jpg",
            link: "/insights/case-studies/instant-loan-processing",
        },
        {
            title: "Voice Authentication",
            type: "Case Study",
            description: "Hyniva integrated Pindrop into the contact center to enable passive, multi-factor voice authentication, reducing handle time while strengthening fraud protection.",
            image: "/images/2026/02/Pindrop-Integration.png",
            link: "/insights/case-studies/customer-authentication",
        },
    ],
    deliveryEnablers: {
        title: "Delivery Enablers",
        logos: [
            { name: "Salesforce", src: "/images/2023/11/salesforce-logo-copy120.png" },
            { name: "AWS", src: "/images/2023/11/aws-logocopy120.png" },
            { name: "Microsoft", src: "/images/2023/11/microso-copy120.png" },
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
