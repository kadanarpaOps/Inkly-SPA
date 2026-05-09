import type { BasicInfo, RegisterStory } from "../models/stories/StoryModel";

export interface StoryPort {
    getAllGenres(): Promise<BasicInfo[]>;
    registerStory(story: RegisterStory): Promise<void>
}