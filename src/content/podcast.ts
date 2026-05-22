export interface PodcastEpisode {
    id: string;
    title: string;
    date: string;
    duration: string;
    category: string;
    host: string;
    guest: string;
    image: string;
    videoUrl: string; // YouTube embed ID or full video URL
    description: string;
}

export const podcastContent: {
    hero: { title: string; description: string };
    episodes: PodcastEpisode[];
} = {
    hero: {
        title: "Conversations on <span class='text-[#00D4AA]'>Innovation.</span>",
        description: "Listen and watch Hyniva's leaders and guest industry experts discuss the future of AI, enterprise platforms, cloud, and digital transformation.",
    },
    episodes: [
        {
            id: "cu-next-podcast",
            title: "CU NEXT Podcast: Voices Driving Credit Union Innovation",
            date: "APR 23, 2026",
            duration: "45:20",
            category: "Credit Union Tech",
            host: "John Mitchell (Hyniva CEO)",
            guest: "Sarah Jenkins (NASA Federal CU VP of Technology)",
            image: "/images/Podcast/CU_Next_Podcast.png",
            videoUrl: "https://www.youtube.com/embed/oROwZ4z7Yow", // Official Hyniva video
            description: "Explore the core technologies and cultural innovations driving the next generation of credit unions, with a focus on member experience optimization and legacy modernization.",
        },
        /* Remaining mock episodes commented out for now as requested
        {
            id: "agentforce-future",
            title: "Agentforce: The Future of Autonomous Customer Service",
            date: "MAR 15, 2026",
            duration: "28:15",
            category: "Artificial Intelligence",
            host: "David Lee (AI Practice Lead)",
            guest: "Marc Benioff (Guest Panelist)",
            image: "/images/Blogs/Optimized/blog-3.png",
            videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
            description: "An in-depth conversation about Salesforce's new Agentforce framework and how autonomous AI agents are revolutionizing contact center efficiency and end-to-end customer journeys.",
        },
        {
            id: "experience-cloud-lwr",
            title: "Why Financial Institutions Modernize Experience Cloud with LWR",
            date: "FEB 02, 2026",
            duration: "35:40",
            category: "Salesforce FSC",
            host: "Robert Garcia (Enterprise Architect)",
            guest: "Emily Chen (Chief Digital Officer, Apple Federal CU)",
            image: "/images/Blogs/Optimized/blog-2.png",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Discover why credit unions and banking institutions are choosing Salesforce's Lightning Web Runtime (LWR) for higher speed, advanced performance, and premium custom portal security.",
        },
        {
            id: "cloud-migration-aws",
            title: "AWS Serverless: Saving Half a Million Annually in Document Intelligence",
            date: "JAN 12, 2026",
            duration: "32:10",
            category: "AWS Cloud",
            host: "Srinivas Raju (AWS Practice Director)",
            guest: "James Anderson (AWS Financial Services Solutions Lead)",
            image: "/images/Blogs/Optimized/blog-1.png",
            videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
            description: "A detailed breakdown of how migrating to serverless AWS architecture saved an enterprise financial institution $500,000 annually while improving processing speeds by 5x.",
        },
        */
    ],
};
