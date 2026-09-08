/**
 * APPLIED AI CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the Applied AI page.
 * It defines the hero section, introduction, services, case studies, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining Applied AI capabilities
 * - services: Array of AI service offerings with icons and descriptions
 * - caseStudies: Array of case studies with images and links
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/services/applied-ai/page.tsx
 * - Hero content for AppliedAIHero component
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
 * - Services showcase Hyniva's AI expertise
 * - Case studies show real-world implementations
 * - Delivery enablers show technology partnerships
 */

export const appliedAIContent = {
    hero: {
        title: "Applied AI",
        subtitle: "AI isn't the future-it's the now. From AI-powered chatbots to predictive analytics and document automation, Hyniva helps you harness the power of artificial intelligence to work smarter, faster, and more efficiently than ever before.",
        backgroundImage: "/images/Banner_cards/Applied_AI.png",
        contactButton: {
            text: "Contact us!",
            href: "/contact",
        },
    },
    intro: {
        title: "AI and its associated technologies have become transformative forces, reshaping industries and poised for even greater acceleration in adoption.",
        description: "As AI advances continually, businesses may feel overwhelmed or uncertain about harnessing its potential for increased productivity and outcomes. At Hyniva, our seasoned team possesses extensive experience and expertise to guide you in strategically integrating AI technology, revolutionizing your business workflows with confidence.",
    },
    services: [
        {
            icon: "MessageCircle",
            title: "AI Chatbots",
            description: "We implement NLP based chatbots to create automated and interactive customer experiences that enable instant responses, drastically reduced operational costs and increased productivity.",
        },
        {
            icon: "Cpu",
            title: "Process Automation",
            description: "We use AI to enhance process automation by intelligently analyzing data, predicting patterns, and optimizing workflows, streamlining operations for greater efficiency and productivity.",
        },
        {
            icon: "FileText",
            title: "Document Automation",
            description: "Enable document automation with swift analysis, categorization, and information extraction to increase efficiency and accuracy in your business workflow.",
        },
    ],
    caseStudies: [
        {
            title: "GenAI Boosts Logistics",
            type: "Case Study",
            description: "Hyniva's GenAI solution cut load creation time from 20 minutes to seconds for a top logistics firm. It boosted speed, accuracy, and cost savings for software development.",
            image: "/images/2025/07/GenAI-Architecture.png",
            link: "https://www.hyniva.com/engineering-autonomous-load-creation/",
        },
        {
            title: "AI Transforming Customer Service",
            type: "Case Study",
            description: "Hyniva is working with a financial management company to improve its customer experience by leveraging AI for customer interaction and increasing overall productivity.",
            image: "/images/2026/02/AI-to-Customer-Support.png",
            link: "https://www.hyniva.com/leveraging-ai-to-transform-customer-service/",
        },
        {
            title: "Generative AI - Why it's a Game Changer",
            type: "Article",
            description: "Every industry has been proactively interested in Large Language Models (LLM) and Generative AI in the past few years.",
            image: "/images/2024/09/DATA-UNLEASHED-banner-bg.jpg",
            link: "https://www.hyniva.com/generative-ai-why-its-a-game-changer/",
        },
        {
            title: "AI - Empowering Financial Institutions",
            type: "Article",
            description: "Artificial Intelligence (AI) is changing at a rapid pace, and businesses across all industries are trying to identify the best AI solution that can boost their growth.",
            image: "/images/2024/09/Artificial-Intelligence_Finance-sector-2.png",
            link: "https://www.hyniva.com/ai-empowering-financial-institutions/",
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
        title: "Ready to Get Started? Contact us!",
        buttonText: "Let's Go!",
        href: "/contact",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
