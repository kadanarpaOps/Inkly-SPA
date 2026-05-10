
export const statusNames = {
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    ABANDONED: "ABANDONED",
    PAUSED: "PAUSED",
} as const

type StatusNames = typeof statusNames[keyof typeof statusNames];

export interface BasicInfo {
    id: string;
    name: string;
}

export interface StoryInfo {
    title: string;
    description: string;
    coverUrl: string;
    genre: BasicInfo;
    secondaryGenre: BasicInfo;
    tags: BasicInfo[];
    userId: string;
    // Average Rating
    totalRating: number;
    // User that has Rated
    ratingCount: number;
    totalChapters: number;
    totalViews: number;
    totalFavorites: number;
    status: StatusNames;
    createdAt: Date;
    updatedAt: Date;
}

export interface RegisterStory {
    title: string;
    description: string;
    genreName: string;
    secondaryGenreName: string;
    tagNames: string [] | null;
    userId: string;
    image: File | null;
}

export interface UpdateStory {
    title: string;
    description: string;
    genreName: string;
    secondaryGenreName: string;
    status: StatusNames;
}

export interface UpdateTags {
    tagNames: string[];
}
