import type { PageResponse } from "../models/common/PaginationModels";
import type { BasicInfo, LastModifiedStory, RegisterStory, StoryInfo, UpdateStory, UserFilters } from "../models/stories/StoryModel";

export interface StoryPort {
    getAllGenres(): Promise<BasicInfo[]>;
    pageTags(offset: number, limit: number, tagName: string): Promise<PageResponse<BasicInfo>>;
    getStories(filters: UserFilters): Promise<PageResponse<StoryInfo>>;
    getAuthUserStories(filters: UserFilters, userId: string): Promise<PageResponse<StoryInfo>>;
    getAuthUserSavedStories(filters: UserFilters, userId: string): Promise<PageResponse<StoryInfo>>;
    getStoryById(storyId: string): Promise<StoryInfo>;
    getLastModifiedStory(userId: string): Promise<LastModifiedStory>;
    registerStory(story: RegisterStory): Promise<void>
    updateStory(story: UpdateStory, storyId: string): Promise<void>;
    toggleStoryHidden(storyId: string): Promise<void>;
    deleteStory(storyId: string): Promise<void>;
    updateStoryCover(image: File, storyId: string): Promise<void>;
    deleteStoryCover(storyId: string): Promise<void>;
    updateStoryTags(tagNames: string[], storyId: string ): Promise<void>;
    //Favorites
    addToFavorites(userId: string, storyId: string): Promise<void>;
    removeFromFavorites(userId: string, storyId: string): Promise<void>;
    existsFromFavorites(userId: string, storyId: string): Promise<void>;
}
