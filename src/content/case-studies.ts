/**
 * CASE STUDIES CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the case studies section.
 * It defines the hero section and individual case study information.
 * 
 * Structure:
 * - hero: Hero section content with title, subtitle, description, and background image
 * - sectionTitle: Title for the main grid section
 * - studies: Array of case study objects with titles, descriptions, and external links
 * 
 * Data Usage:
 * - Used by: /src/app/insights/case-studies/page.tsx
 * - Hero content displayed in CaseStudiesHero component
 * - Studies array mapped to CaseStudyCard components
 * - All href links point to external detailed case study pages
 * 
 * Notes:
 * - Background image path uses local storage (/images/2023/11/section-bg.jpg)
 * - All case study links are external URLs to hyniva.com
 * - Studies are ordered by importance/recency
 * - Each study includes a compelling title and concise description
 */

export const caseStudiesContent = {
    hero: {
        title: "Hyniva's Impact: Case Studies on Cloud, Data & AI Solutions",
        subtitle: "From challenge to transformation.",
        description: "Every engagement started with trust. Every outcome is how we honored it.",
        backgroundImage: "/images/2023/11/section-bg.jpg",
    },
    sectionTitle: "Hyniva In Action",
    studies: [
        {
            title: "Intelligent Lending",
            description: "Built a secure platform to automate loan pre-qualification and routing. Improved speed, accuracy, and conversion rates.",
            href: "https://www.hyniva.com/scaling-a-secure-pre-qualification-loan-routing-platform-with-intelligent-automation/",
        },
        {
            title: "Claims Reimagined",
            description: "Digitized claims processing with a scalable, automated platform. Reduced manual effort and accelerated turnaround time.",
            href: "https://www.hyniva.com/transforming-insurance-claims-operations-with-a-scalable-digital-platform/",
        },
        {
            title: "Zero-Defect Scaling",
            description: "A leading education provider partnered with Hyniva to build a scalable platform — achieving zero-defect delivery at scale.",
            href: "https://www.hyniva.com/scaling-a-multi-portal-education-platform-with-zero-defect-delivery/",
        },
        {
            title: "Legacy to Digital",
            description: "Replaced a legacy system with a scalable, modern case management platform. Improved workflows, visibility, and operational efficiency.",
            href: "https://www.hyniva.com/modernizing-case-management-for-a-community-healthcare-provider-stop/",
        },
        {
            title: "Autonomous Lending",
            description: "Hyniva implemented Agentforce within FinXServe to deliver a conversational lending journey from inquiry to loan application in one seamless interaction.",
            href: "https://www.hyniva.com/autonomous-lending-experiences-with-finxserve-and-agentforce/",
        },
        {
            title: "Voice Authentication",
            description: "Hyniva integrated Pindrop into the contact center to enable passive, multi-factor voice authentication, reducing handle time while strengthening fraud protection.",
            href: "https://www.hyniva.com/engineering-secure-authentication-through-pindrop-integration/",
        },
        {
            title: "AI Loan Processing",
            description: "Hyniva embedded Agentforce-powered document intelligence into FinXServe to automate verification and enable near-instant digital loan approvals.",
            href: "https://www.hyniva.com/agentforce-powered-document-intelligence-for-instant-loan-processing/",
        },
        {
            title: "IVR Modernization",
            description: "Hyniva modernized a wealth management firm's IVR self-service platform, simplifying call routing, improving security, and reducing call handling time.",
            href: "https://www.hyniva.com/modernizing-contact-center-with-ivr-self-service/",
        },
        {
            title: "LWR Modernization",
            description: "Hyniva modernized a credit union's Experience Cloud platform by migrating from Aura to LWR, improving speed, scalability, and mobile performance.",
            href: "https://www.hyniva.com/accelerating-platform-performance-through-lwr-modernization/",
        },
        {
            title: "Cloud Modernization",
            description: "Hyniva transformed legacy CRM into a modern Dynamics 365 platform, improving scalability, efficiency, and user experience for smarter service delivery.",
            href: "https://www.hyniva.com/empowering-enterprises-through-microsoft-powered-modernization/",
        },
        {
            title: "Credit Union CX",
            description: "Lending transformed with FinXForce, unifying digital channels & reducing loan offer times to under 60 seconds—boosting ROI, engagement, & member satisfaction.",
            href: "https://www.hyniva.com/member-experience-transformation-at-a-leading-credit-union/",
        },
        {
            title: "Campaign Reinvented",
            description: "Hyniva created a custom .NET solution for smarter, automated campaign management. The platform drives efficiency, precision and scalability for IT businesses.",
            href: "https://hyniva.com/hyniva-campaign-management/",
        },
        {
            title: "GenAI Boosts Logistics",
            description: "Hyniva's GenAI solution cut load creation time from 20 minutes to seconds for a top logistics firm. It boosted speed, accuracy, and cost savings for software development.",
            href: "https://hyniva.com/engineering-autonomous-load-creation/",
        },
        {
            title: "Zero-Access Migration",
            description: "Hyniva completed a full digital migration in 2 months using only the live site — no backend access. Agile execution and SDET-led quality turned the impossible into enterprise-grade delivery.",
            href: "https://www.hyniva.com/a-race-against-time-that-others-refused-to-run/",
        },
        {
            title: "Digital Logistics",
            description: "Hyniva transformed legacy logistics with Microsoft technologies, enabling real-time tracking, mobile operations, faster performance, and better customer experiences.",
            href: "https://www.hyniva.com/enterprise-modernization-with-microsoft/",
        },
        {
            title: "5x Increase in Customer Experience",
            description: "Learn how Hyniva leveraged AWS to help a global investment firm save over half a million dollars annually, transform their customer experience and increase performance by 5x.",
            href: "https://hyniva.com/hyniva-leverages-aws-half-a-million-dollars-savings-annually/",
        },
        {
            title: "Salesforce Advantage",
            description: "Hyniva reimagined customer support with Salesforce — unifying data, automating workflows, and enabling proactive care for faster resolutions and happier customers.",
            href: "https://www.hyniva.com/scaling-service-operations-with-salesforce/",
        },
        {
            title: "AWS Cloud Efficiency",
            description: "In the heart of technological transformation, Hyniva embarked on a groundbreaking journey with an asset management company, steering them towards unparalleled efficiency and cost effectiveness.",
            href: "https://hyniva.com/aws-enabled-efficiency/",
        },
        {
            title: "Superpowered Data",
            description: "Effectively analyzing and leveraging data can transform your business in unimaginable ways. Learn how Hyniva is helping leading banks and lenders do it, and discover the untapped superpower.",
            href: "https://hyniva.com/data-is-your-superpower/",
        },
        {
            title: "Impact of Blue Green Strategy",
            description: "Our client faced significant challenges due to their rigid infrastructure and architecture. Explore how our Blue Green strategy enhanced efficiency and resilience.",
            href: "https://hyniva.com/blue-green-deployment/",
        },
        {
            title: "AI Transforming Customer Service",
            description: "Hyniva is working with a financial management company to improve its customer experience by leveraging AI for customer interaction and increasing overall productivity.",
            href: "https://hyniva.com/leveraging-ai-to-transform-customer-service/",
        },
        {
            title: "Banking Modernization",
            description: "Hyniva reimagined financial workflows using Microsoft technologies, streamlining loan processing, compliance, and customer onboarding.",
            href: "https://www.hyniva.com/transforming-core-banking-operations-with-microsoft-innovation/",
        },
        {
            title: "CRM Modernization",
            description: "A prominent player in the auto loan aggregation space with nearly two decades of experience, faced a critical juncture of migrating to a new platform in a record time, proving to be a challenge for everyone.",
            href: "https://hyniva.com/modernizing-a-legacy-platform/",
        },
    ],
};
