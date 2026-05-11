import type { PageResponse } from '../../../core/domain/models/common/PaginationModels';
import type { BasicInfo, RegisterStory } from '../../../core/domain/models/stories/StoryModel';
import httpClient from '../config/axios.instance';

export const getAllGenresRequest = async (): Promise<BasicInfo[]> => {
    const response = await httpClient.get(`api/genre`);
    return response.data;
}

export const pageTagsRequest = async (offset: number, limit: number, tagName: string): Promise<PageResponse<BasicInfo>> => {
    const response = await httpClient.get(`api/tag/search`, {
        params: { offset, limit, tagName }
    });

    return { data: response.data.tags, meta: response.data.meta };
}

export const registerStoryRequest = async (story: RegisterStory): Promise<void> => {
    const response = await httpClient.post(`api/story/create`, story, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}
