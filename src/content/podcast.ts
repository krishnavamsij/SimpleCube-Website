export interface PodcastEpisode {
    id: string;
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
            title: "Episode #01 - Scale Trust to Grow Relationships",
            date: "13th May 2026",
            duration: "24 minutes",
            category: "Credit Union Tech",
            host: "Joseph Thomas",
            hostRole: "Advisor, Hyniva | Retired PenFed CIO",
            guest: "Mirella Reznic",
            guestRole: "Chief Executive Officer, Farmers Insurance FCU",
            image: "/images/Podcast/Episode1poster.png",
            videoUrl: "https://www.youtube.com/embed/oROwZ4z7Yow",
            description: "Episode #01 Scale Trust to Grow Relationships",
        },
    ],
};