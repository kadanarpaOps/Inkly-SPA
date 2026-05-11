import type { PageResponse } from "../models/common/PaginationModels";
import type { BasicInfo, RegisterStory } from "../models/stories/StoryModel";

export interface StoryPort {
    getAllGenres(): Promise<BasicInfo[]>;
    pageTags(offset: number, limit: number, tagName: string): Promise<PageResponse<BasicInfo>>;
    registerStory(story: RegisterStory): Promise<void>
}