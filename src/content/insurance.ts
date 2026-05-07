/**
 * INSURANCE INDUSTRY CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the insurance industry page.
 * It defines the hero section, introduction, capabilities, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining insurance technology transformation
 * - capabilities: Service offerings with icons and descriptions
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/industries/insurance/page.tsx (if implemented)
 * - Hero content for InsuranceHero component
 * - Capabilities services mapped to ServiceCard components
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
 * - Capabilities showcase Hyniva's insurance expertise
 * - Focus on AI, digital transformation, and risk assessment
 */

export const insuranceContent = {
    hero: {
        title: "Insurance",
        subtitle: "AI is transforming insurance—from smarter underwriting to real-time fraud detection. Hyniva helps insurers automate claims, enhance customer servicing, and optimize risk assessment for a streamlined, future-proof industry.",
        backgroundImage: "/images/Banner_cards/Insurance.png",
        contactButton: {
            text: "Contact us!",
            href: "/contact",
        },
    },
    intro: {
        title: "Technology has transformed the insurance landscape, not just enhancing efficiency, but reshaping how insurers perceive, evaluate, and mitigate risks tied to customer profiles. It's not an understatement that this is a revolution in risk management across the board.",
        description: "In a world of unpredictability, spanning lifestyles, personal health, and environmental shifts, providing customers with a simplified experience is paramount. With a wealth of experience in the insurance landscape, Hyniva is your partner in transforming your digital experience. Let's explore how we can insure your digital future.",
    },
    capabilities: {
        title: "Our Capabilities",
        services: [
            {
                icon: "Monitor",
                title: "Digital Servicing",
                description: "Elevate your customer experience with our expertise in crafting fully digital solutions compatible with desktop and mobile platforms to accelerate service times, enhance underwriting margins, and support advanced AI risk modeling.",
            },
            {
                icon: "Calculator",
                title: "Reduce Expenses",
                description: "Enhance efficiency and streamline the closing process by upgrading your vendor management and claims platform. We optimize claims platforms through the integration of lightweight frameworks.",
            },
            {
                icon: "Shield",
                title: "AI Risk Assessment",
                description: "Leverage AI and data analytics for the development and restructuring of your risk assessment models, aiming to enhance loss ratios and maximize servicability.",
            },
        ],
    },
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
        href: "/contact",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
