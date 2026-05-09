import { getAllGenresRequest, registerStoryRequest } from "../../infrastructure/api/requests/stories.request";
import type { BasicInfo, RegisterStory } from "../domain/models/stories/StoryModel";
import type { StoryPort } from "../domain/ports/StoriesPort";

export class StoryService implements StoryPort {

    async getAllGenres(): Promise<BasicInfo[]> {
        const allGenres = await getAllGenresRequest();
        return allGenres;
    }

    async registerStory(story: RegisterStory): Promise<void> {
        const response = await registerStoryRequest(story);
        return response;
    }

}
