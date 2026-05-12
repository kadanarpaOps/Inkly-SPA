import { createContext } from "react";
import type { BasicInfo, RegisterStory, StoryInfo, UserFilters } from "../../core/domain/models/stories/StoryModel";
import type { PageResponse } from "../../core/domain/models/common/PaginationModels";

export interface StoriesContextType {
    // Basics
    loading: boolean;
    error: string | null;
    // Genres
    genres: BasicInfo[] | null;
    // Searching
    storiesForAllUsers: StoryInfo[] | null;
    storiesAuthUser: StoryInfo[] | null;
    savedStoriesAuthUser: StoryInfo[] | null;
    // Refresh Info per modification
    modifiedStories: boolean;
    // Rest Methods
    pageTags: (offset: number, limit: number, tagName: string) => Promise<PageResponse<BasicInfo>>
    createStory: (story: RegisterStory) => Promise<boolean>;
    loadStoriesForAuthUser: (filters: UserFilters) => Promise<PageResponse<StoryInfo>>;
}

export const StoriesContext = createContext<StoriesContextType | null>(null);
