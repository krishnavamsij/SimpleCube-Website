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
            category: "Podcast",
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
            date: "2nd June 2026",
            duration: "20 minutes",
            category: "Podcast",
            host: "Joseph Thomas",
            hostRole: "Advisor, Hyniva | Retired PenFed CIO",
            guest: "Ricardo J. Chamorro",
            guestRole: "Executive Vice President, PenFed Credit Union",
            image: "/images/Podcast/Episode2poster.png",
            videoUrl: "https://www.youtube.com/watch?v=QIYDW4DAhnw",
            description: "Episode #02 Perfect is the Enemy of the Good",
        },
        {
            id: "cu-next-podcast-3",
            seriesTitle: "CU Next: Conversations shaping the NEXT era of Credit Unions",
            title: "Don't Put No in Innovation",
            date: "1st July 2026",
            duration: "36 minutes",
            category: "Podcast",
            host: "Joseph Thomas",
            hostRole: "Advisor, Hyniva | Retired PenFed CIO",
            guest: "Rickey Burks",
            guestRole: "Former SVP Chief Technology and Innovation Officer at USAA",
            image: "/images/Podcast/Episode3poster.png",
            videoUrl: "https://www.youtube.com/watch?v=dgVirnkI5Us",
            description: "Episode #03 Don't Put No in Innovation",
        },
        {
            id: "cu-next-podcast-4",
            seriesTitle: "CU Next: Conversations shaping the NEXT era of Credit Unions",
            title: "Agility vs Agile",
            date: "14th July 2026",
            duration: "32 minutes",
            category: "Podcast",
            host: "Joseph Thomas",
            hostRole: "Advisor, Hyniva | Retired PenFed CIO",
            guest: "Michael Levine",
            guestRole: "Technology Advisor & Author, Former SVP US Bank",
            image: "/images/Podcast/Episode4poster.png",
            videoUrl: "https://www.youtube.com/watch?v=GL94YaV95jc",
            description: "Episode #04 Agility vs Agile",
        },
    ],
};