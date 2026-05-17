import { deleteStoryCoverRequest, deleteStoryRequest, getAllGenresRequest, getAuthUserSavedStoriesRequest, getAuthUserStoriesRequest, getLastModifiedStoryRequest, getStoriesRequest, getStoryByIdRequest, pageTagsRequest, registerStoryRequest, toggleStoryHiddenRequest, updateStoryCoverRequest, updateStoryRequest, updateStoryTags } from "../../infrastructure/api/requests/stories.request";
import type { PageResponse } from "../domain/models/common/PaginationModels";
import type { BasicInfo, LastModifiedStory, RegisterStory, StoryInfo, UpdateStory, UserFilters } from "../domain/models/stories/StoryModel";
import type { StoryPort } from "../domain/ports/StoriesPort";

export class StoryService implements StoryPort {
    async getAllGenres(): Promise<BasicInfo[]> {
        const allGenres = await getAllGenresRequest();
        return allGenres;
    }

    async pageTags(offset: number, limit: number, tagName: string): Promise<PageResponse<BasicInfo>> {
        const pagedTags = await pageTagsRequest(offset, limit, tagName);
        return pagedTags;
    }

    async getStories(filters: UserFilters): Promise<PageResponse<StoryInfo>> {
        const pagedStories = await getStoriesRequest(filters);
        return pagedStories;
    }

    async getAuthUserStories(filters: UserFilters, userId: string): Promise<PageResponse<StoryInfo>> {
        const pagedStories = await getAuthUserStoriesRequest(filters, userId);
        return pagedStories;
    }

    async getAuthUserSavedStories(filters: UserFilters, userId: string): Promise<PageResponse<StoryInfo>> {
        const pagedStories = await getAuthUserSavedStoriesRequest(filters, userId);
        return pagedStories;
    }

    async getStoryById(storyId: string): Promise<StoryInfo> {
        const story = await getStoryByIdRequest(storyId);
        return story;
    }

    async getLastModifiedStory(userId: string): Promise<LastModifiedStory> {
        const story = await getLastModifiedStoryRequest(userId);
        return story;
    }

    async registerStory(story: RegisterStory): Promise<void> {
        const response = await registerStoryRequest(story);
        return response;
    }

    async updateStory(story: UpdateStory, storyId: string): Promise<void> {
        const response = await updateStoryRequest(story, storyId);
        return response;
    }

    async toggleStoryHidden(storyId: string): Promise<void> {
        const response = await toggleStoryHiddenRequest(storyId);
        return response;
    }

    async deleteStory(storyId: string): Promise<void> {
        const response = await deleteStoryRequest(storyId);
        return response;
    }

    async updateStoryCover(image: File, storyId: string): Promise<void> {
        const response = await updateStoryCoverRequest(image, storyId);
        return response;
    }

    async deleteStoryCover(storyId: string): Promise<void> {
        const response = await deleteStoryCoverRequest(storyId);
        return response;
    }

    async updateStoryTags(tagNames: string[], storyId: string): Promise<void> {
        const response = await updateStoryTags(tagNames, storyId);
        return response;
    }

}
