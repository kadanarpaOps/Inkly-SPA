import type { PageResponse } from '../../../core/domain/models/common/PaginationModels';
import type { BasicInfo, RegisterStory, StoryInfo, UpdateStory, UserFilters } from '../../../core/domain/models/stories/StoryModel';
import httpClient from '../config/axios.instance';

export const getAllGenresRequest = async (): Promise<BasicInfo[]> => {
    const response = await httpClient.get(`api/genre`);
    return response.data;
}

export const pageTagsRequest = async (offset: number, limit: number, tagName: string): Promise<PageResponse<BasicInfo>> => {
    const response = await httpClient.get(`api/tag/search`, {
        params: { offset, limit, tagName }
    });
    return response.data;
}

export const getStoriesRequest = async (filters: UserFilters) : Promise<PageResponse<StoryInfo>> => {
    const response = await httpClient.get(`api/story/search`, {
        params: filters
    });
    return response.data;
}

export const getAuthUserStoriesRequest = async (filters: UserFilters, userId: string): Promise<PageResponse<StoryInfo>> => {
    const response = await httpClient.get(`api/story/search/${userId}`, {
        params: filters
    });
    return response.data;
}

export const getAuthUserSavedStoriesRequest = async (filters: UserFilters, userId: string): Promise<PageResponse<StoryInfo>> => {
    const response = await httpClient.get(`api/favorite/search/${userId}`, {
        params: filters
    });
    return response.data;
}

export const getStoryByIdRequest = async (storyId: string): Promise<StoryInfo> => {
    const response = await httpClient.get(`api/story/id/${storyId}`);
    return response.data;
}

export const getLastModifiedStoryRequest = async (userId: string): Promise<StoryInfo> => {
    const response = await httpClient.get(`api/story/last-modified/${userId}`);
    return response.data;
}

export const registerStoryRequest = async (story: RegisterStory): Promise<void> => {
    const response = await httpClient.post(`api/story/create`, story, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const updateStoryRequest = async (story: UpdateStory, storyId: string): Promise<void> => {
    const response = await httpClient.put(`api/story/update/${storyId}`, story);
    return response.data;
}

export const toggleStoryHiddenRequest = async (storyId: string): Promise<void> => {
    const response = await httpClient.patch(`api/story/toggle-hidden/${storyId}`);
    return response.data;
}

export const deleteStoryRequest = async (storyId: string): Promise<void> => {
    const response = await httpClient.delete(`api/story/delete/${storyId}`);
    return response.data;
}

export const updateStoryCoverRequest = async (image: File, storyId: string): Promise<void> => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await httpClient.patch(`api/story/cover/${storyId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const deleteStoryCoverRequest = async (storyId: string): Promise<void> => {
    const response = await httpClient.delete(`api/story/cover/${storyId}`);
    return response.data;
}

export const updateStoryTags = async (tagNames: string[], storyId: string): Promise<void> => {
    const response = await httpClient.put(`api/story/update/${storyId}/tags`, {
        tagNames
    });
    return response.data;
}
