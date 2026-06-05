/**
 * ABOUT US CONTENT CONFIGURATION
 * 
 * This file contains all the content data for the About Us page.
 * It defines the hero section, introduction, core values, leadership team, and CTA.
 * 
 * Structure:
 * - hero: Hero section with title, subtitle, background image
 * - intro: Introduction explaining Hyniva's mission and vision
 * - values: Array of core company values with descriptions and icons
 * - leadership: Leadership team members with bios and images
 * - cta: Call-to-action section for business inquiries
 * 
 * Data Usage:
 * - Used by: /src/app/about/page.tsx
 * - Hero content for AboutHero component
 * - Values array mapped to ValueCard components
 * - Leadership array mapped to LeaderCard components
 * - Provides seamless navigation between sections
 * 
 * Notes:
 * - Leadership section can be navigated to via /about#leadership or /about/leaders
 * - Content is organized for progressive revelation (hero → intro → values → leaders)
 * - All images should be stored in /public/images/about/
 */

export const aboutContent = {
    hero: {
        title: "About us",
        backgroundImage: "/images/2023/11/section-bg.jpg",
    },
    intro: {
        title: "Our Values",
        description: "At the heart of our identity lie three pillars of strength, Agility, Innovation and People. We fondly call it the Hyniva API, fueling our enterprise and driving quality, reliability and mutual success. Agility fuels the relentless efficiency of our Digital Factory, propelling us forward at an unmatched pace. Innovation, the very essence of our roots, is vividly manifested in our profound product expertise. Above all, our success is eternally indebted to the vibrant tapestry of talent that is our people—uniting, driving, and embodying the spirit of our collective triumph.",
        valuesImage: "/images/2023/12/Hyniva-Values.png",
        highlights: [
            {
                metric: "220",
                label: "Applications\nDelivered",
                suffix: "+",
                icon: "iconsmind-Administrator iconsmind-People",
                iconColor: "#ff3d42"
            },
            {
                metric: "7",
                label: "Products\nDelivered",
                suffix: "",
                icon: "iconsmind-Data-Clock iconsmind-Database",
                iconColor: "#ff3d42"
            },
            {
                metric: "4000",
                label: "Man Years of\nExperience",
                suffix: "+",
                icon: "iconsmind-Compass iconsmind-Design",
                iconColor: "#ff3d42"
            },
            {
                metric: "15",
                label: "Years of Partnership with\nPlatform Vendors",
                suffix: "",
                icon: "iconsmind-Handshake iconsmind-Network",
                iconColor: "#ff3d42"
            },
            {
                metric: "45",
                label: "Happy\nClients",
                suffix: "+",
                icon: "iconsmind-Happy iconsmind-Smile",
                iconColor: "#ff3d42"
            }
        ]
    },
    values: [
        {
            icon: "iconsmind-Compass iconsmind-Design",
            title: "Agility",
            description: "Agility fuels the relentless efficiency of our Digital Factory, propelling us forward at an unmatched pace.",
        },
        {
            icon: "iconsmind-Light-Bulb",
            title: "Innovation",
            description: "Innovation, the very essence of our roots, is vividly manifested in our profound product expertise.",
        },
        {
            icon: "iconsmind-Administrator iconsmind-People",
            title: "People",
            description: "Above all, our success is eternally indebted to the vibrant tapestry of talent that is our people—uniting, driving, and embodying the spirit of our collective triumph.",
        },
    ],
    leadership: {
        sectionTitle: "Our Leadership Team",
        sectionDescription: "Meet the visionary leaders driving innovation and excellence at Hyniva",
        team: [
            {
                name: "Sreeram Jadapolu",
                title: "Founder & CEO",
                bio: "Hyniva was founded by Sreeram Jadapolu, a seasoned software veteran with over 3 decades of experience. His leadership is characterized by a deep commitment to client satisfaction, a relentless pursuit of innovation, and a profound understanding of the unique challenges within each industry segment Hyniva serves.",
                image: "/images/2025/06/Sreeram_Enhanced.jpg",
                specialization: "Leadership, Client Satisfaction, Innovation",
                linkedin: "https://www.linkedin.com/in/jsreeram",
            },
            {
                name: "Madhu Bandarapu",
                title: "Chief Delivery Officer",
                bio: "Bringing 25+ years of expertise in large-scale delivery, including legacy modernization, digital transformation, and managed services. Proven leadership in BFSI, Healthcare, and CMT industries. Madhu is skilled in solution consulting, business strategy, and driving client-centric outcomes.",
                image: "/images/2025/06/Madhu_Enhanced-e1749169084846.jpg",
                specialization: "Large-Scale Delivery, Digital Transformation, Client Success",
                linkedin: "https://www.linkedin.com/in/madhu-bandarapu-0a10b621/",
            },
            {
                name: "Joseph Thomas",
                title: "Senior Advisor",
                bio: "Joseph is a seasoned technology leader with a track record of delivering multi-million-dollar initiatives for Fortune 500 companies. He is recognized for aligning technology strategy with business goals and delivering secure, scalable, and cost-effective solutions.",
                image: "/images/2025/09/Joe-Thomas_Enhanced.png",
                specialization: "Technology Strategy, Business Alignment, Enterprise Solutions",
                linkedin: "https://www.linkedin.com/in/joseph-t-086b2918/",
            },
            {
                name: "Rickey Burks",
                title: "Advisory Board Member",
                bio: "Rickey is a seasoned leader in the technology and business consulting industry. With a career spanning over 40 years, he brings a wealth of knowledge and expertise to Hyniva's board. His visionary approach to technology, business strategy, and leadership has been instrumental in steering the company to new heights.",
                image: "/images/2025/06/Rickey_Enhanced.jpg",
                specialization: "Technology Consulting, Business Strategy, Leadership",
                linkedin: "http://www.linkedin.com/in/rickeyburks/",
            },
            {
                name: "Luther Branham",
                title: "Advisory Board Member",
                bio: "Luther is a proven, results-oriented builder of innovative organizations in the financial services and technology industries, having held executive leadership roles with top organizations such as Bank One/ Chase and USAA. His passion for building and nurturing tech companies brings immense value to business strategy.",
                image: "/images/2025/09/LutherBranham.jpg",
                specialization: "Financial Services, Technology Innovation, Business Strategy",
                linkedin: "https://www.linkedin.com/in/lgbranham/",
            },
            {
                name: "John Calef",
                title: "VP of Product Management",
                bio: "For over 25 years, John has worked in various leadership roles, rolling up his sleeves to create high-quality IT systems in the domains of military intelligence, banking, investments, and property management. With 10+ years in the area of product development, he identifies and builds solutions that position clients for maximum success.",
                image: "/images/2025/06/John_Enhanced.jpg",
                specialization: "Product Development, IT Systems, Client Solutions",
                linkedin: "https://www.linkedin.com/in/john-calef-7b6784b9/",
            },
            {
                name: "Venkatadri Naidu G",
                title: "Director",
                bio: "With two decades in the software industry, Mr. Venkatadri Naidu is a leader in delivering solutions across Salesforce CRM, web, & mobile applications. His 10+ years in Project & Product Management, along with expertise in AI & ML, Delivery Management, highlight his dedication to innovation & project success.",
                image: "/images/2025/06/Venkatadri_Enhanced.jpg",
                specialization: "Salesforce CRM, AI & ML, Project Management",
                linkedin: "https://www.linkedin.com/in/venkatadri/",
            },
            {
                name: "Srinivas Thumati",
                title: "Director of Application Delivery",
                bio: "Srinivas is seasoned software leader with over 17 years of experience in PnC Insurance, Banking, Consumer Lending, & Connected Vehicles. He has successfully led & contributed to major projects at esteemed companies such as USAA, TCS, Rackspace, SiriusXM, and CreditSnap, driving innovation and delivering impactful results.",
                image: "/images/2025/09/Srinivas_Thumati.jpg",
                specialization: "Application Delivery, Insurance, Banking, Connected Vehicles",
                linkedin: "http://www.linkedin.com/in/srinivasa-rao-thumati-632405141/",
            },
        ],
    },
    history: {
        sectionTitle: "Our History",
        sectionSubtitle: "A decade of innovation, growth, and transformation",
        timeline: [
            {
                year: "2007",
                title: "Founding",
                description: "Hyniva was founded in 2007 as \"Upper Room Technologies\", taking its roots in Chennai and marking the beginning of its journey in the field of IT and Business Consulting.",
                icon: "fas fa-home",
                emoji: "🏢"
            },
            {
                year: "2009",
                title: "First SaaS Product Launch",
                description: "MediaFusion was our first SaaS product, a digital media platform specifically designed for churches to stream audio, video and live sessions.",
                image: "/images/2025/07/2009.Saas-product.png"
            },
            {
                year: "2012",
                title: "EazySchool",
                description: "First Product launch - EazySchool, a cutting-edge school management suite that streamlined administration operations and primed nearly 50 schools for digital transformation across India.",
                icon: "fas fa-user-graduate",
                emoji: "🎓"
            },
            {
                year: "2013",
                title: "Rebranding & Expansion",
                description: "Company Rebrand as Hyniva. We started operations in San Antonio, Texas to better serve our banking and insurance customers.",
                icon: "fas fa-building",
                emoji: "🌍"
            },
            {
                year: "2014",
                title: "iLendX Framework",
                description: "Hyniva collaborated with iLendX to create the iLendX framework that enabled a fully digital lending experience with compliance support.",
                image: "/images/2025/07/2014.iLendX-Framework.png"
            },
            {
                year: "2017",
                title: "CreditSnap",
                description: "First FinTech Product launch - CreditSnap, a revolutionary omni-channel platform that pre-qualified borrowers with \"no credit impact\" and streamlined the origination process.",
                image: "/images/2025/07/2017.CreditSnap.png"
            },
            {
                year: "2022",
                title: "Hyper",
                description: "First Portfolio Recommendation Engine launch - Partnered with Large Investment Management and launched a portfolio recommendation engine to help customers understand their investment strategy option.",
                image: "/images/2025/07/2022.Hyper_.png"
            },
            {
                year: "2023",
                title: "Great Place to Work Certified",
                description: "Hyniva is officially Great Place to Work certified. This was a milestone and testament to Hyniva's core values and committment to creating a positive work environment.",
                image: "/images/2025/07/2023.Great-Place-to-work-Certified.png"
            },
            {
                year: "2024",
                title: "Salesforce Next-Digital Experience Product",
                description: "Hyniva released its Salesforce Next-Digital Experience Product to market, harnessing the power of AI to streamline the user experience and strength data security.",
                image: "/images/2025/07/2024.Salesforce-Next-Digital-Experience-Product.png"
            },
            {
                year: "2025",
                title: "SOC 2 Type II Compliance Achieved",
                description: "Hyniva is now SOC 2 Type II compliant — reaffirming our commitment to the highest standards of security, privacy, and data integrity. This milestone reflects the strength of our internal controls and dedication to protecting client data across all operations.",
                image: "/images/2025/07/2025.SOC2-Cerified.png"
            }
        ]
    },
    cta: {
        title: "Ready to Start Your Digital Transformation?",
        subtitle: "Send Us An Email Today!",
        buttonText: "Let's Go!",
        buttonHref: "mailto:connect@hyniva.com",
        backgroundImage: "",
    },
};
