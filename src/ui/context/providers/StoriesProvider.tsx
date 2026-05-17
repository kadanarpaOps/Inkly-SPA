import { useCallback, useEffect, useState, type ReactNode } from "react";
import { StoryService } from "../../../core/use-cases/StoryUseCases";
import type { BasicInfo, LastModifiedStory, RegisterStory, StoryInfo, UpdateStory, UserFilters } from "../../../core/domain/models/stories/StoryModel";
import executeTask from "../utils/TaskExecutor";
import { StoriesContext, type StoriesContextType } from "../StoriesContext";
import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";

type Props = {
    children: ReactNode;
}

const storiesService = new StoryService();

function StoriesProvider({ children }: Props) {
    // Basics
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // Genres
    const [genres, setGenres] = useState<BasicInfo[] | null>(null);

    // Business Methods
    const pageTags = async (offset: number, limit: number, tagName: string) => {
        const response = await executeTask(() => storiesService.pageTags(offset, limit, tagName), setLoading, setError);
        return response as PageResponse<BasicInfo>;
    };

    const createStory = async (storyData: RegisterStory): Promise<boolean> => {
        const response = await executeTask(() => storiesService.registerStory(storyData), setLoading, setError);
        if (!response) return false;
        return true;
    };

    const updateStory = async (storyData: UpdateStory, storyId: string): Promise<boolean> => {
        const response = await executeTask(() => storiesService.updateStory(storyData, storyId), setLoading, setError);
        if (!response) return false;
        return true;
    }

    const updateStoryCover = async (file: File, storyId: string): Promise<boolean> => {
        const response = await executeTask(() => storiesService.updateStoryCover(file, storyId), setLoading, setError);
        if (!response) return false;
        return true;
    };

    const deleteStoryCover = async (storyId: string): Promise<boolean> => {
        const response = await executeTask(() => storiesService.deleteStoryCover(storyId), setLoading, setError);
        if (!response) return false;
        return true;
    };

    const loadStoriesForAuthUser = useCallback(async (filters: UserFilters, userId: string) => {
        const response = await executeTask(() => storiesService.getAuthUserStories(filters, userId), setLoading, setError) as PageResponse<StoryInfo>;
        return response;
    }, []);

    const loadStoryById = useCallback(async (storyId: string) => {
        const response = await executeTask(() => storiesService.getStoryById(storyId), setLoading, setError) as StoryInfo;
        return response;
    }, []);

    const loadLastModifiedStoryForAuthUser = useCallback(async (userId: string) => {
        const response = await executeTask(() => storiesService.getLastModifiedStory(userId), setLoading, setError) as LastModifiedStory;
        return response;
    }, []);

    /** useEffects */
    // Load all Genres
    useEffect(() => {
        const loadAllGenres = async () => {
            const response = await executeTask(() => storiesService.getAllGenres(), setLoading, setError);
            setGenres(response);
        }
        loadAllGenres();
    }, []);

    // Export Values
    const exportValues: StoriesContextType = {
        loading,
        error,
        genres,
        createStory,
        updateStory,
        updateStoryCover,
        deleteStoryCover,
        pageTags,
        loadStoriesForAuthUser,
        loadStoryById,
    }

    return (
        <StoriesContext.Provider value={exportValues}>{children}</StoriesContext.Provider>
    )

}

export default StoriesProvider;
