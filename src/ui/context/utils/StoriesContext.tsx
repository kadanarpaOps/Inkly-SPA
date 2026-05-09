import { createContext } from "react";
import type { BasicInfo, StoryInfo } from "../../../core/domain/models/stories/StoryModel";

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

}

export const StoriesContext = createContext<StoriesContextType | null>(null);
