/**
 * AWS CLOUD SERVICES CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the AWS Cloud Services page.
 * It defines the hero section, introduction, services, case studies, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining AWS cloud services
 * - services: Array of AWS service offerings with icons and descriptions
 * - caseStudies: Array of case studies with images and links
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/services/aws-cloud-services/page.tsx
 * - Hero content for AWSCloudServicesHero component
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
 * - Services showcase Hyniva's AWS expertise
 * - Case studies show real-world implementations
 * - Delivery enablers show technology partnerships
 */

export const awsCloudServicesContent = {
    hero: {
        title: "Expert AWS Cloud Solutions",
        subtitle: "Unlock AWS potential with Hyniva's cloud migration, DevOps, data management, and governance solutions. Simplify your journey to a secure, efficient cloud.",
        backgroundImage: "/images/2019/04/blog-intro.jpg",
        contactButton: {
            text: "Contact us!",
            href: "mailto:connect@hyniva.com",
        },
    },
    intro: {
        title: "At Hyniva, we help businesses unlock the full potential of AWS cloud services through expert migration strategies, DevOps automation, data management, and robust governance frameworks.",
        description: "Our AWS-certified architects and engineers bring deep expertise in cloud-native solutions, helping organizations migrate, modernize, and optimize their infrastructure. From strategic cloud adoption to managed services and continuous optimization, we deliver comprehensive AWS solutions that drive scalability, security, and cost efficiency while ensuring compliance and operational excellence.",
    },
    services: [
        {
            icon: "Cloud",
            title: "Cloud Migration",
            description: "Seamlessly migrate your workloads to AWS with minimal downtime. Our proven methodologies ensure smooth transitions from on-premises to cloud, preserving data integrity and business continuity.",
        },
        {
            icon: "Database",
            title: "Data Management",
            description: "Harness the power of AWS data services for advanced analytics, real-time processing, and intelligent insights. We design scalable data architectures that support your growth.",
        },
        {
            icon: "Shield",
            title: "Governance, Risk Compliance",
            description: "Enhance your GRC by leveraging tools to enable real-time monitoring, streamline processes, mitigate business risks and ensure regulation adherence.",
        },
        {
            icon: "Settings",
            title: "DevOps & CI/CD",
            description: "We implement CI/CD pipelines for automated software deployment and integrate DevOps practices to streamline your operations and processes.",
        },
        {
            icon: "Monitor",
            title: "Managed Services",
            description: "Our team consistently monitors your AWS infrastructure, effectively managing routine tasks such as patching, backups, and security updates.",
        },
        {
            icon: "Cpu",
            title: "Infrastructure Design",
            description: "Our experts create scalable, budget-friendly architectures matching your business needs while enhancing existing structures for optimization.",
        },
        {
            icon: "Zap",
            title: "Software Optimization",
            description: "Examining and enhancing the performance of your applications through the utilization of scaling strategies to manage fluctuating workloads across your infrastructure.",
        },
    ],
    caseStudies: [
        {
            title: "5x Increase in Customer Experience",
            type: "Case Study",
            description: "Learn how Hyniva leveraged AWS to help a global investment firm save over half a million dollars annually and transform their customer experience.",
            image: "/images/2026/02/AWS_document-management-system-1.png",
            link: "https://hyniva.com/hyniva-leverages-aws-half-a-million-dollars-savings-annually/",
        },
        {
            title: "Cloud Enabled Efficiency",
            type: "Case Study",
            description: "Hyniva is working with a Fortune 500 investment management company to improve its customer experience by leveraging AI for customer interaction, reducing response times and increasing overall productivity.",
            image: "/images/2026/02/AWS-Enabled-Efficiency.png",
            link: "https://hyniva.com/aws-enabled-efficiency/",
        },
        {
            title: "Impact of Blue Green Strategy",
            type: "Case Study",
            description: "Our client faced significant challenges due to their rigid infrastructure and architecture. Explore how our Blue Green strategy enhanced efficiency and resilience.",
            image: "/images/2024/09/image.png",
            link: "https://www.hyniva.com/blue-green-deployment/",
        },
        {
            title: "The Future of Cloud Computing: AWS Trends",
            type: "Article",
            description: "Cloud computing continues to redefine how businesses operate, offering unmatched scalability, flexibility, and efficiency. As companies increasingly migrate to the cloud, Amazon Web Services (AWS) remains at the forefront of this digital transformation.",
            image: "/images/2024/11/The-Future-of-Cloud-Computing-AWS-Trends-1.png",
            link: "https://www.hyniva.com/the-future-of-cloud-computing-aws-trends/",
        },
        {
            title: "Optimizing AWS Infrastructure Costs for Back-Office Capabilities",
            type: "Article",
            description: "In today's fast-paced digital landscape, businesses are increasingly turning to cloud solutions to enhance their operational efficiency and agility.",
            image: "/images/2024/10/Full-Stack-AWS-Development.png",
            link: "https://www.hyniva.com/optimizing-aws-infrastructure-costs-for-back-office-capabilities/",
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
        title: "Ready to Get Started? Contact us!",
        buttonText: "Let's Go!",
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
