import { getAllGenresRequest, pageTagsRequest, registerStoryRequest } from "../../infrastructure/api/requests/stories.request";
import type { PageResponse } from "../domain/models/common/PaginationModels";
import type { BasicInfo, RegisterStory } from "../domain/models/stories/StoryModel";
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

    async registerStory(story: RegisterStory): Promise<void> {
        const response = await registerStoryRequest(story);
        return response;
    }

}
