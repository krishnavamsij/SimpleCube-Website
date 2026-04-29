/**
 * EDUCATION INDUSTRY CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the education industry page.
 * It defines the hero section, introduction, services, delivery enablers, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and contact button
 * - intro: Introduction section explaining education technology transformation
 * - services: Array of education service offerings
 * - deliveryEnablers: Technology partners and platforms used
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/industries/education/page.tsx (if implemented)
 * - Hero content for EducationHero component
 * - Services array mapped to ServiceCard components
 * - Delivery enablers displayed as partner logos
 * 
 * Notes:
 * - Background images use local storage paths
 * - Contact button links to email for business inquiries
 * - Services showcase Hyniva's education expertise
 * - Focus on EazySchool product and digital transformation
 */

export const educationContent = {
    hero: {
        title: "Education",
        subtitle: "Revolutionize education with cloud-based learning, virtual classrooms, and automated administration. Hyniva's solutions make learning more accessible, interactive, and efficient—empowering students, educators, and institutions alike.",
        backgroundImage: "/images/2025/03/Education.jpg",
        contactButton: {
            text: "Contact us!",
            href: "mailto:connect@hyniva.com",
        },
    },
    intro: {
        title: "Technology has brought about a paradigm shift in education, making it more dynamic, accessible, and tailored to individual educational organizations.",
        description: "Hyniva has extensive experience in the education sector, and has revolutionized school administration with EazySchool. Learn how our product expertise can help you digitally transform your educational institute.",
    },
    services: [
        {
            title: "Learning Management System",
            description: "Learning Management Systems (LMS) can enable students to access educational resources, lectures, and assignments remotely increasing flexibility.",
            icon: "Notepad",
        },
        {
            title: "Automated Administration",
            description: "Fully automate day to day tasks such as registration, grading, and resource allocation to increase productivity for educators and administrators, allowing them to focus on quality and strategy.",
            icon: "Robot",
        },
        {
            title: "Virtual Classrooms",
            description: "Leverage & implement video conferencing tools, collaboration platforms, and virtual reality applications to enhance the online learning experience, fostering engagement and interactivity",
            icon: "Blackboard",
        },
        {
            title: "Cloud Transformation",
            description: "Upgrade your infrastructure to cut down overhead costs. Cloud computing enables simple storage & access to educational resources to create a seamless experience for your school ecosystem.",
            icon: "PeopleOnCloud",
        },
    ],
    cta: {
        title: "Ready to Start Your Digital Transformation? Send Us An Email Today!",
        buttonText: "Let's Go!",
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "/images/2019/04/contact-classic.jpg",
    },
};
