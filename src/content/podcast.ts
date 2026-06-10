export interface PodcastEpisode {
    id: string;
    seriesTitle: string;
    title: string;
    date: string;
    duration: string;
    category: string;
    host: string;
    hostRole?: string;
    guest: string;
    guestRole?: string;
    image: string;
    videoUrl: string;
    description: string;
}

export const podcastContent: {
    hero: {
        description: string;
    };
    episodes: PodcastEpisode[];
} = {
    hero: {
        description:
            "Bringing together Credit Union leaders who are driving real transformation to share insights, experiences and strategies shaping the industry’s future.",
    },

    episodes: [
        {
            id: "cu-next-podcast",
            seriesTitle: "CU Next: Conversations shaping the NEXT era of Credit Unions",
            title: "Scale Trust to Grow Relationships",
            date: "13th May 2026",
            duration: "24 minutes",
            category: "Credit Union Tech",
            host: "Joseph Thomas",
            hostRole: "Advisor, Hyniva | Retired PenFed CIO",
            guest: "Mirella Reznic",
            guestRole: "Chief Executive Officer, Farmers Insurance FCU",
            image: "/images/Podcast/Episode1poster.png",
            videoUrl: "https://www.youtube.com/watch?v=oROwZ4z7Yow",
            description: "Episode #01 Scale Trust to Grow Relationships",
        },
        {
            id: "cu-next-podcast-2",
            seriesTitle: "CU Next: Conversations shaping the NEXT era of Credit Unions",
            title: "Perfect is the Enemy of the Good",
            date: "June 2, 2026",
            duration: "20 minutes",
            category: "Credit Union Tech",
            host: "Joseph Thomas",
            hostRole: "Advisor, Hyniva | Retired PenFed CIO",
            guest: "Ricardo J. Chamorro",
            guestRole: "Executive Vice President, PenFed Credit Union",
            image: "/images/Podcast/Episode2poster.png",
            videoUrl: "https://www.youtube.com/watch?v=QIYDW4DAhnw",
            description: "Episode #02 Perfect is the Enemy of the Good",
        },
    ],
};