/**
 * Contact Us Page Content Configuration
 *
 * This file contains all content for the Contact Us page including:
 * - Hero section with background image
 * - Contact form details
 * - Office locations and contact information
 * - Footer content with links and certifications
 *
 * Notes:
 * - Background image path matches WordPress site
 * - Contact form fields and validation
 * - Office addresses for US and India locations
 * - Social media links and certifications
 */

export const contactContent = {
    hero: {
        title: "Contact Us",
        subtitle: "Discover the Hyniva Difference",
        description: "Empower your business for the digital future with our dedicated expertise. From cutting-edge technology integration to strategic digital cloud transformation, we pave the way for your success. Elevate your business, embrace innovation, and thrive in the digital landscape.",
        backgroundImage: "/images/2023/11/section-bg.jpg",
    },
    contactForm: {
        title: "Send us an email",
        subtitle: "We endeavour to answer all enquiries within 24 hours on business days.",
        fields: {
            name: {
                placeholder: "Your name",
                required: true,
                type: "text"
            },
            email: {
                placeholder: "Your email",
                required: true,
                type: "email"
            },
            message: {
                placeholder: "Your message",
                required: false,
                type: "textarea"
            }
        },
        submitButton: "Send message"
    },
    differenceImage: {
        src: "/images/2024/06/THe-Hyniva-Difference.jpg",
        alt: "The Hyniva Difference",
        width: 800,
        height: 348
    },
    offices: {
        us: {
            title: "United States",
            icon: "fa-solid fa-location-dot",
            address: "13333 Blanco Road, Suite 206<br>San Antonio, Texas - 78216"
        },
        india: {
            title: "India",
            icon: "fa-solid fa-location-dot",
            address: "The Cube Karle Town Center, Building No.5, 5th Floor Nagavara Village<br>Bengaluru, KA - 560045"
        }
    },
    footer: {
        logo: {
            src: "/logos/Hyniva_logo_for_light_background.svg",
            alt: "Hyniva Logo",
            width: 300,
            height: 60
        },
        social: {
            title: "Follow Us",
            links: [
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/company/hyniva/",
                    icon: "fab fa-linkedin-square"
                }
            ]
        },
        industries: {
            title: "Industries",
            links: [
                { name: "Banking", url: "/industries/banking" },
                { name: "Wealth & Asset Management", url: "/industries/wealth-asset-management" },
                { name: "Insurance", url: "/industries/insurance" },
                { name: "Transportation & Logistics", url: "/industries/transportation-logistics" },
                { name: "Education", url: "/industries/education" }
            ]
        },
        services: {
            title: "Services",
            links: [
                { name: "Digital Transformation", url: "/services/digital-transformation" },
                { name: "Salesforce", url: "/services/salesforce" },
                { name: "Microsoft Services", url: "/services/microsoft-services" },
                { name: "AWS Cloud", url: "/services/aws-cloud-services" },
                { name: "Applied AI", url: "/services/applied-ai" },
                { name: "Data Intelligence", url: "/services/data" },
                { name: "Product Development", url: "/services/product-development" },
                { name: "IT Strategy", url: "/services/business-it-strategy" }
            ]
        },
        products: {
            title: "PRODUCTS",
            links: [
                { name: "AIRA", url: "/products/aira" },
                { name: "FinXserve", url: "https://products.hyniva.com/finxserve/" },
                { name: "Claim Pioneer", url: "https://products.hyniva.com/claim-pioneer/" },
                { name: "Hyper", url: "https://products.hyniva.com/hyper/" }
            ]
        },
        about: {
            title: "About",
            links: [
                { name: "About Us", url: "/about" },
                { name: "Careers", url: "/careers" },
                { name: "Contact Us", url: "/contact" },
                { name: "Case Studies", url: "/case-studies" },
                { name: "Blog", url: "/blog" },
                { name: "Privacy Policy", url: "/privacy-policy" }
            ]
        },
        memberships: {
            title: "Proud Member",
            images: [
                { src: "/images/2024/06/Greater-SA.jpg", alt: "Greater San Antonio", width: "38%" },
                { src: "/images/2024/06/North-SA-Chamber.jpg", alt: "North San Antonio Chamber", width: "38%" }
            ]
        },
        certifications: {
            title: "CERTIFIED BY",
            images: [
                { src: "/images/2024/06/Certified.jpg", alt: "Certified", width: "40%" },
                {
                    src: "/images/2026/01/Certification-Badge-scaled.png",
                    alt: "Great Place to Work Certification",
                    width: "30%",
                    link: "https://www.greatplacetowork.in/great/company/hyniva-consulting-services-private-limited"
                }
            ]
        }
    }
};
