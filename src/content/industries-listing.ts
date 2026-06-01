/**
 * INDUSTRIES LISTING CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the industries section.
 * It defines the hero section, introduction, industry listings, and CTA.
 * 
 * Structure:
 * - hero: Hero section content with title, description, and background image
 * - intro: Introduction section with title and detailed description
 * - industries: Array of industry objects with titles, descriptions, and links
 * - cta: Call-to-action section with title, button, and background image
 * 
 * Data Usage:
 * - Used by: /src/app/industries/page.tsx
 * - Hero content displayed in IndustriesHero component
 * - Industries array mapped to IndustryCard components
 * - CTA content displayed in IndustriesCTA component
 * 
 * Industry Object Structure:
 * - title: Industry display name
 * - description: Brief overview of Hyniva's expertise in that industry
 * - href: Link to detailed industry page (internal or external)
 * 
 * Notes:
 * - Background images use local storage paths
 * - Some industry links are internal (/industries/...), others external
 * - Industries are ordered strategically by importance
 * - CTA button links to email contact for business inquiries
 */

export const industriesListingContent = {
    hero: {
        title: "Industries",
        description: "Every Industry is ever-evolving and meets new challenges. We are here to help you navigate the landscape & succeed.",
        backgroundImage: "/images/2024/09/INFINITE-CONNECTIONS-BOUNDLESS-POTENTIAL-bg.jpg",
    },
    intro: {
        title: "Every Industry is ever-evolving and meets new challenges. We are here to help you navigate the landscape & succeed.",
        description: "At Hyniva, we dedicate ourselves to delivering superior solutions and exceptional experiences, meticulously crafted to address the distinctive needs of specific industry sectors. Discover the Hyniva Difference and accelerate your business transformation by exploring our tailored offerings designed to exceed the expectations of your industry.",
    },
    industries: [
        {
            title: "Wealth Management",
            description: "Revolutionize wealth & asset management with Hyniva. From seamless portfolio tracking to personalized financial insights, learn how our technology-driven solutions empower your business.",
            href: "/industries/wealth-asset-management",
        },
        {
            title: "Banking",
            description: "In the era of digitally empowered borrowers, expectations have soared, demanding a seamless fusion of technology, and user-centric experiences to boost customer satisfaction.",
            href: "/industries/banking",
        },
        {
            title: "Transportation",
            description: "Navigate the challenges supply & demand of a growing world population with ease and efficiency – embrace technology to revolutionize your transportation.",
            href: "/industries/transportation-logistics",
        },
        {
            title: "Insurance",
            description: "Technology has transformed the insurance landscape, not just enhancing efficiency, but reshaping how insurers perceive, evaluate, and mitigate risks tied to customer profiles.",
            href: "/industries/insurance",
        },
        {
            title: "Education",
            description: "Hyniva has extensive expertise in the education sector & has revolutionized school administration with EazySchool. Learn how we can help you on your digital journey.",
            href: "/industries/education",
        },
        {
            title: "Lending",
            description: "Our innovation meets efficiency to drive seamless processes, robust risk management, and unparalleled customer experiences in the lending industry.",
            href: "/products/finxserve",
        },
    ],
    cta: {
        title: "Ready to Start Your Digital Transformation? Send Us An Email Today!",
        buttonText: "Let's Go!",
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "/images/2023/11/section-bg.jpg",
    },
};
