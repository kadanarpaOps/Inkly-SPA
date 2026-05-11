import { useEffect, useState, type ReactNode } from "react";
import { StoryService } from "../../../core/use-cases/StoryUseCases";
import type { BasicInfo, RegisterStory, StoryInfo } from "../../../core/domain/models/stories/StoryModel";
import executeTask from "../utils/TaskExecutor";
import { StoriesContext, type StoriesContextType } from "../StoriesContext";

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
    // Searching
    const [storiesForAllUsers, setStoriesForAllUsers] = useState<StoryInfo[] | null>(null);
    const [storiesAuthUser, setStoriesAuthUser] = useState<StoryInfo[] | null>(null);
    const [savedStoriesAuthUser, setSavedStoriesAuthUser] = useState<StoryInfo[] | null>(null);
    // Refresh Info per modification
    const [modifiedStories, setModifiedStories] = useState<boolean>(false);

    // Business Methods
    const pageTags = async (offset: number, limit: number, tagName: string) => {
        const response = await storiesService.pageTags(offset, limit, tagName);
        return response;
    }

    const createStory = async (storyData: RegisterStory): Promise<boolean> => {
        setError(null);
        const response = await executeTask(() => storiesService.registerStory(storyData), setLoading, setError);
        if (!response) return false;
        return true;
    }

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
        storiesForAllUsers,
        storiesAuthUser,
        savedStoriesAuthUser,
        modifiedStories,
        createStory,
        pageTags,
    }

    return (
        <StoriesContext.Provider value={exportValues}>{children}</StoriesContext.Provider>
    )

}

export default StoriesProvider;
