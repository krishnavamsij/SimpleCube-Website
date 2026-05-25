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
        title: "CU Next: Conversations shaping the NEXT era of <span class='text-[#00D4AA]'>Credit Unions</span>",
        description: "Bringing together Credit Union leaders who are driving real transformation to share insights, experiences and strategies shaping the industry’s future.",
    },
    episodes: [
        {
            id: "cu-next-podcast",
            title: "Episode #01 - Scale Trust to Grow Relationships",
            date: "13th May 2026",
            duration: "24 minutes",
            category: "Credit Union Tech",
            host: "Joseph Thomas",
            guest: "Mirada Resnic",
            image: "/images/Podcast/CU_Next_Podcast.png",
            videoUrl: "https://www.youtube.com/embed/oROwZ4z7Yow", // Official Hyniva video
            description: "Episode #01 Scale Trust to Grow Relationships",
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
