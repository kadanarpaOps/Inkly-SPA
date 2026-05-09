import type { BasicInfo, RegisterStory } from '../../../core/domain/models/stories/StoryModel';
import httpClient from '../config/axios.instance';

export const getAllGenresRequest = async (): Promise<BasicInfo[]> => {
    const response = await httpClient.get(`api/genre`);
    return response.data;
}

export const registerStoryRequest = async (story: RegisterStory): Promise<void> => {
    const response = await httpClient.post(`api/stories`, story, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}
