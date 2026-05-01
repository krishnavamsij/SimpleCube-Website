/**
 * CAREERS CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the Careers page.
 * It defines the hero section, benefits, open positions, and company culture.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image, and CTA button
 * - intro: Introduction explaining why to join Hyniva
 * - benefits: Array of employee benefits and perks
 * - culture: Company culture highlights
 * - departments: Career paths by department
 * - values: How Hyniva's values translate to work experience
 * - cta: Call-to-action section for applications
 * 
 * Data Usage:
 * - Used by: /src/app/careers/page.tsx
 * - Hero content for CareersHero component
 * - Benefits array mapped to BenefitCard components
 * - Department cards for different career paths
 * - Culture showcase for employer branding
 * 
 * Notes:
 * - This is a standalone page, separate from About Us
 * - Focus on attracting top talent with clear career paths
 * - All images should be stored in /public/images/careers/
 * - Links to job board or careers portal should be configured here
 */

export const careersContent = {
    hero: {
        title: "Careers",
        subtitle: "",
        backgroundImage: "images/2023/11/section-bg.jpg",
    },
    benefits: [
        {
            icon: "Heart",
            title: "Health & Wellness",
            description: "Comprehensive health insurance, mental wellness programs, and gym memberships to support your wellbeing.",
        },
        {
            icon: "TrendingUp",
            title: "Learning & Development",
            description: "Annual training budget, certification programs, and mentorship opportunities to advance your career.",
        },
        {
            icon: "Home",
            title: "Flexible Work",
            description: "Work from anywhere with flexible schedules that respect work-life balance and personal commitments.",
        },
        {
            icon: "Users",
            title: "Collaborative Culture",
            description: "Work with brilliant minds in a supportive environment where your ideas matter and collaboration thrives.",
        },
        {
            icon: "Gift",
            title: "Competitive Compensation",
            description: "Competitive salaries, performance bonuses, and equity options in a fast-growing company.",
        },
        {
            icon: "Globe",
            title: "Global Opportunities",
            description: "Opportunities to work across our offices in the US and India, with potential for global projects.",
        },
        {
            icon: "Zap",
            title: "Innovation Time",
            description: "20% time to work on innovative projects and explore emerging technologies that interest you.",
        },
        {
            icon: "Award",
            title: "Career Growth",
            description: "Clear career paths, regular promotions, and opportunities to lead teams and shape company direction.",
        },
    ],
    culture: {
        title: "Our Culture at a Glance",
        description: "",
        highlights: []
    },
    departments: [],
    jobOpenings: [
        {
            id: "senior-php-developer",
            title: "Senior PHP Developer - Bangalore",
            location: "Bangalore, India",
            type: "Full-time",
            experience: "5-8 Years",
            category: "Engineering",
            description: "Design, develop, and configure software programs based on client specifications. Work with development teams and product managers to ideate software solutions.",
            responsibilities: [
                "Design, develop, and configure software programs based on the client specifications",
                "Work with development teams and product managers to ideate software solutions",
                "Design client-side and server-side architecture",
                "Develop and manage well-functioning databases and applications",
                "Write effective APIs",
                "Perform testing and bug fixing. Develop web pages and client side validation by typescript tags"
            ],
            requirements: [
                "Qualification: BE/B.Tech/M.Tech/MCA/M.Sc. Computers",
                "Experience: 5-8 Years",
                "Proficiency in Core PHP, and PHP based MVC frameworks (Yii/ Laravel)",
                "Development of PHP based web applications, APIs",
                "Strong knowledge of the common PHP or web server exploits and their solutions",
                "Good understanding of web application development best practices, performance optimization etc",
                "Experience in full stack technologies (HTML, CSS, JavaScript, Jquery)",
                "Knowledge of Server Management and familiar with Amazon Web Services",
                "Proficient to handle cloud based operations for server, DB (Rackspace, AWS)",
                "Able to work effectively on a team as well as individually"
            ],
            applicationEmail: "hr@hyniva.com",
            referenceText: "Must reference 'Senior PHP Developer' when applying"
        },
        {
            id: "senior-nodejs-developer",
            title: "Senior NodeJS - Bangalore",
            location: "Bangalore, India",
            type: "Full-time",
            experience: "8-10 Years",
            category: "Engineering",
            description: "5+ years of recent related web application development experience with ReactJs and Node JS. Web or mobile application development work experience using HTML5, CSS3, and JavaScript.",
            responsibilities: [
                "5+ years of recent related web application development experience with ReactJs and Node JS",
                "Web or mobile application development work experience using HTML5, CSS3, and JavaScript",
                "Hands on experience with AWS installation, Lamda functions / serverless technologies",
                "Ability and desire to learn and work with new languages and technologies as needed",
                "Mentor junior team members and help them with technical difficulties"
            ],
            requirements: [
                "Masters in Computer Applications or Bachelor's Degree in Computer Science Engineering",
                "Experience: 8-10 Years",
                "Immediate Joinee",
                "Proficient in JavaScript, Node JS, Express JS",
                "Good Exposure in AWS Lambda, Server less, API Gateway, Dynamo DB",
                "Familiarity with HTML & CSS",
                "Excellent verbal communication skills",
                "Good problem-solving skills",
                "Able to work in a team as well as individually",
                "Good Analytical skills"
            ],
            applicationEmail: "hr@hyniva.com",
            referenceText: "Must reference 'Senior NodeJS Developer' when applying"
        }
    ],
    testimonials: [],
    cta: {
        title: "Ready to Join Hyniva?",
        subtitle: "Take the next step in your career journey.",
        buttonText: "Explore Open Positions",
        buttonHref: "#job-openings",
    },
    jobListings: {
        title: "India",
        jobs: [
            {
                id: "1732242843954-05a4600a-4479",
                title: "Senior PHP Developer - Bangalore",
                icon: "fas fa-laptop-code",
                jobDuties: [
                    "Design, develop, and configure software programs based on the client specifications.",
                    "Work with development teams and product managers to ideate software solutions.",
                    "Design client-side and server-side architecture.",
                    "Develop and manage well-functioning databases and applications.",
                    "Write effective APIs.",
                    "Perform testing and bug fixing. Develop web pages and client side validation by typescript tags."
                ],
                candidateRequirements: {
                    qualification: "BE/B.Tech/M.Tech/MCA/M.Sc. Computers",
                    experience: "5 – 8 Years"
                },
                skillsRequired: [
                    "Proficiency in Core PHP, and PHP based MVC frameworks (Yii/ Laravel)",
                    "Development of PHP based web applications, APIs",
                    "Strong knowledge of the common PHP or web server exploits and their solutions.",
                    "Good understanding of web application development best practices, performance optimization etc.",
                    "Experience in full stack technologies (HTML, CSS, JavaScript, Jquery)",
                    "Knowledge of Server Management and familiar with Amazon Web Services",
                    "Proficient to handle cloud based operations for server, DB (Rackspace, AWS).",
                    "Able to work effectively on a team as well as individually"
                ],
                email: "hr@hyniva.com",
                reference: "Senior PHP Developer"
            },
            {
                id: "1704265921143-56541d3d-095f",
                title: "Senior NodeJS - Bangalore",
                icon: "fas fa-laptop-code",
                jobDescription: [
                    "5+ years of recent related web application development experience with ReactJs and Node JS",
                    "Web or mobile application development work experience using HTML5, CSS3, and JavaScript",
                    "Hands on experience with AWS installation, Lamda functions / serverless technologies",
                    "Ability and desire to learn and work with new languages and technologies as needed",
                    "Mentor junior team members and help them with technical difficulties"
                ],
                candidateRequirements: {
                    qualification: "Masters in Computer Applications or Bachelor's Degree in Computer Science Engineering",
                    experience: "8 – 10 Years",
                    additional: "Immediate Joinee"
                },
                skillsRequired: [
                    "Proficient in JavaScript, Node JS, Express JS",
                    "Good Exposure in AWS Lambda, Server less, API Gateway, Dynamo DB",
                    "Familiarity with HTML & CSS.",
                    "Excellent verbal communication skills.",
                    "Good problem-solving skills.",
                    "Able to work in a team as well as individually",
                    "Good Analytical skills."
                ],
                email: "hr@hyniva.com",
                reference: "Senior NodeJS Developer"
            }
        ]
    }
};
