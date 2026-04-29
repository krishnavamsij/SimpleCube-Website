/**
 * BLOG CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the blog section.
 * It defines the hero section and individual blog post information.
 * 
 * Structure:
 * - hero: Hero section content with title, subtitle, description, and background image
 * - sectionTitle: Title for the main grid section
 * - posts: Array of blog post objects with metadata and content
 * 
 * Data Usage:
 * - Used by: /src/app/insights/blog/page.tsx
 * - Hero content displayed in BlogHero component
 * - Posts array mapped to BlogCard components
 * - All href links point to external detailed blog post pages
 * 
 * Post Object Structure:
 * - title: Blog post title
 * - excerpt: Brief summary of the content
 * - date: Publication date in "Month DD, YYYY" format
 * - author: Author name (currently all "Hyniva")
 * - image: Path to featured image in /images directory
 * - href: External URL to the full blog post
 * 
 * Notes:
 * - Background image path uses local storage (/images/2023/11/section-bg.jpg)
 * - All blog post links are external URLs to products.hyniva.com
 * - Posts are ordered chronologically (newest first)
 * - Image paths follow year/month naming convention
 * - Excerpts are truncated versions of full content
 */

export const blogContent = {
    hero: {
        title: "Hyniva Blogs: Salesforce, AWS, Company News & Culture",
        subtitle: "Insights and innovations from our team.",
        description: "Explore Hyniva's blogs on Salesforce, AWS, company updates, and Digital insights. Stay informed with the latest trends in Tech.",
        backgroundImage: "/images/2023/11/section-bg.jpg",
    },
    sectionTitle: "Latest Insights",
    posts: [
        {
            title: "Hyniva's vision for harnessing Salesforce Customer 360 Innovations for our clients",
            excerpt: "In an increasingly competitive market, businesses are constantly seeking ways to deepen their understanding of customers and enhance engagement. Salesforce's [...]",
            date: "October 14, 2024",
            author: "Hyniva",
            image: "/images/2024/10/Customer-360-Innovations.png",
            href: "https://products.hyniva.com/hynivas-vision-for-harnessing-salesforce-customer-360-innovations-for-our-clients/",
        },
        {
            title: "Salesforce Unveils Agentforce: A Game-Changer in Customer Service",
            excerpt: "In an era where customer expectations are at an all-time high, businesses are constantly seeking innovative solutions to enhance their [...]",
            date: "October 3, 2024",
            author: "Hyniva",
            image: "/images/2024/10/Agentforce_Customer-service.png",
            href: "https://products.hyniva.com/salesforce-unveils-agentforce-a-game-changer-in-customer-service/",
        },
        {
            title: "Overcoming Business Challenges with Salesforce",
            excerpt: "In today's fast-paced market, organizations face numerous challenges that can hinder growth and efficiency. From customer retention to data management, [...]",
            date: "September 18, 2024",
            author: "Hyniva",
            image: "/images/2024/09/Salesforce.png",
            href: "https://products.hyniva.com/overcoming-business-challenges-with-salesforce/",
        },
        {
            title: "AI – Empowering Financial Institutions",
            excerpt: "Artificial Intelligence (AI) is changing at a rapid pace, and businesses across all industries are trying to identify the best [...]",
            date: "September 16, 2024",
            author: "Hyniva",
            image: "/images/2024/09/Artificial-Intelligence_Finance-sector-2.png",
            href: "https://products.hyniva.com/ai-empowering-financial-institutions/",
        },
        {
            title: "Hyniva Celebrates the Launch of Its New Branch!",
            excerpt: "The inauguration of Hyniva's Global Delivery Headquarters near Manyata Tech Park in Bangalore was truly special, featuring a ribbon-cutting ceremony, [...]",
            date: "August 27, 2024",
            author: "Hyniva",
            image: "/images/2024/08/DKHP5846-scaled.jpg",
            href: "https://products.hyniva.com/hyniva-celebrates-the-launch-of-its-new-branch/",
        },
        {
            title: "Hyniva achieves SOC 2 Certification!",
            excerpt: "A Testament to Our Commitment to Security and Data Integrity We at Hyniva are thrilled to share that we are [...]",
            date: "April 11, 2024",
            author: "Hyniva",
            image: "/images/2024/04/1712699115972.jpeg",
            href: "https://products.hyniva.com/hyniva-achieves-soc-2-certification/",
        },
        {
            title: "Generative AI – Why it's a Game Changer",
            excerpt: "Every industry has been proactively interested in Large Language Models (LLM) and Generative AI in the past few years. Generative [...]",
            date: "March 27, 2024",
            author: "Hyniva",
            image: "/images/2024/02/AdobeStock_474498018-scaled.jpeg",
            href: "https://products.hyniva.com/generative-ai-why-its-a-game-changer/",
        },
        {
            title: "Perpetually in Motion – The Digital Factory",
            excerpt: "Up till a few years ago, the Software Development Life Cycle (SDLC) was based on a few models, but the [...]",
            date: "December 13, 2023",
            author: "Hyniva",
            image: "/images/2023/11/photobox4.jpg",
            href: "https://products.hyniva.com/perpetually-in-motion-the-digital-factory/",
        },
        {
            title: "Hyniva is a Proud Member of GSAC!",
            excerpt: "We are thrilled to announce that Hyniva has officially joined the Greater San Antonio Chamber of Commerce, and we couldn't [...]",
            date: "December 13, 2023",
            author: "Hyniva",
            image: "/images/2023/12/Greater-SA-Stickers-05-1.png",
            href: "https://products.hyniva.com/hyniva-is-a-proud-member-of-greater-san-antonio-chamber-of-commerce/",
        },
        {
            title: "Hyniva is Officially a \"Great Place to Work\"!",
            excerpt: "We're Thrilled to Share Exciting News! At Hyniva, we are overjoyed to announce a significant achievement that speaks volumes about [...]",
            date: "December 13, 2023",
            author: "Hyniva",
            image: "/images/2023/12/Amazing_Culture.png",
            href: "https://products.hyniva.com/hyniva-is-officially-a-great-place-to-work/",
        },
    ],
};
