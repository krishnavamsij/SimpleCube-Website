/**
 * PRODUCT DEVELOPMENT CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the Product Development page.
 * It defines the hero section, introduction, services, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining Product Development capabilities
 * - services: Array of product development services with icons and descriptions
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/services/product-development/page.tsx
 * - Hero content for ProductDevelopmentHero component
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
 * - Services showcase Hyniva's product development expertise
 * - Delivery enablers show technology partnerships
 */

export const productDevelopmentContent = {
    hero: {
        title: "Product Development",
        subtitle: "Big ideas deserve bold execution. At Hyniva, we blend creativity, cutting-edge tech, and strategic expertise to build market-defining products. Whether you're starting from scratch or refining an existing solution, we bring your vision to life.",
        backgroundImage: "/images/Banner_cards/Product_development.png",
        contactButton: {
            text: "Contact us!",
            href: "/contact",
        },
    },
    intro: {
        title: "From the moment Hyniva was founded, we set out on a mission to solve complex problems, push the boundaries of technology, and create solutions that create meaningful impact. At Hyniva, innovation isn't just a buzzword - it's ingrained in our DNA.",
        description: "At Hyniva, we believe that successful product development requires a blend of creativity, technical expertise, and unwavering commitment. We have a proven track-record with highly successful products that cater to lending, fintech and education. Every business has a unique value proposition that can be enhanced with technology, here is what sets us apart from other teams.\n\nRegardless of where you stand in your product development journey, we are here to help. Hyniva can be your partner every step of the way in conceptualization all the way to deployment. Here is how our expertise will help you.",
    },
    services: [
        {
            icon: "Cpu",
            title: "Advanced Tech",
            description: "Staying ahead of the technology curve is essential. We leverage the latest tools, frameworks, and platforms to build products that will stand out in today's competitive landscape.",
        },
        {
            icon: "Zap",
            title: "End-to-End Expertise",
            description: "Our experts specialize in design, development, testing, and project management, guaranteeing the realization of your product's maximum potential.",
        },
        {
            icon: "Settings",
            title: "Customized Solutions",
            description: "We understand that one size doesn't fit all. Every product we develop is tailored to your unique needs and objectives, ensuring that your vision remains at the forefront.",
        },
        {
            icon: "PenTool",
            title: "Design Prototyping",
            description: "Our design experts create user-friendly interfaces and experiences, while prototyping allows you to visualize your product's journey.",
        },
        {
            icon: "Headphones",
            title: "360 Support",
            description: "We assist with product deployment and provide continuous support to keep it running smoothly and up-to-date.",
        },
        {
            icon: "CheckCircle",
            title: "Quality Assurance",
            description: "Rigorous testing ensures your product is robust and reliable, providing a seamless user experience.",
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
        href: "/contact",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
