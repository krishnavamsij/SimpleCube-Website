/**
 * WEALTH & ASSET MANAGEMENT INDUSTRY CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the wealth management industry page.
 * It defines the hero section, introduction, services, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining wealth management transformation
 * - services: Array of wealth management service offerings
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/industries/wealth-asset-management/page.tsx (if implemented)
 * - Hero content for WealthHero component
 * - Services array mapped to ServiceCard components
 * - Delivery enablers displayed as partner logos
 * 
 * Notes:
 * - Background images use local storage paths
 * - Contact button links to email for business inquiries
 * - Services showcase Hyniva's wealth management expertise
 * - Focus on digital transformation and customer experience
 */

export const wealthAssetManagementContent = {
    /**
     * Hero section configuration
     * 
     * Contains title, subtitle, background image, and contact button data
     */
    hero: {
        /**
         * Hero title
         */
        title: "Wealth & Asset Management",
        /**
         * Hero subtitle
         */
        subtitle: "Reimagine wealth management with AI-driven insights, robo-advisors, and seamless digital experiences. From portfolio management to blockchain integration, Hyniva helps financial firms innovate, adapt, and thrive in a digital-first world.",
        /**
         * Background image path
         */
        backgroundImage: "/images/2019/04/shop-intro.jpg",
        /**
         * Contact button configuration
         */
        contactButton: {
            /**
             * Contact button text
             */
            text: "Contact us!",
            /**
             * Contact button link (email address)
             */
            href: "mailto:connect@hyniva.com",
        },
    },
    intro: {
        title: "Embark on a new era of wealth and asset management, where the landscape is reshaped by the transformative power of software technology.",
        description: "From personalized strategies to data-driven insights, the future of financial success begins with innovation. We can help you navigate the challenges of transitioning to the digital future. Let's explore how Hyniva can help you make that digital leap.",
    },
    services: [
        {
            icon: "Bot",
            title: "Robo Advisor",
            description: "Integrate AI powered robo-adviory features to drastically reduce customer response times and provide personalized investment suggestions to customers.",
        },
        {
            icon: "TrendingUp",
            title: "Portfolio Management",
            description: "We design and develop customized portfolio management systems, leveraging risk assessment tools that enable streamlined customer experiences.",
        },
        {
            icon: "Users",
            title: "CRM Systems",
            description: "We create tailored CRM solutions or enable seamless transitions to 3rd Party systems to enable efficient tracking, management and provide personalized servicing for your customers.",
        },
        {
            icon: "Monitor",
            title: "Digital Experience",
            description: "Transition to a full digital experience across Desktop and Mobile solutions to provide a streamlined experience for back-office teams and end customers.",
        },
        {
            icon: "Bitcoin",
            title: "Crypto Integration",
            description: "Explore opportunities to integrate blockchain and cryptocurrency technologies securely to provide a unique investment options for customer segments.",
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
        title: "Ready to Start Your Digital Transformation? Contact Us!",
        buttonText: "Let's Go!",
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
