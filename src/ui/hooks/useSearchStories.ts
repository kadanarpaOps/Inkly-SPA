import { useState, useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storySearchSchema, type StorySearchFormValues } from "../schemas/stories/search.schema";
import { useStories } from "./useStories";
import { useAuth } from "./useAuth";
import type { StoryInfo } from "../../core/domain/models/stories/StoryModel";
import type { PageResponse } from "../../core/domain/models/common/PaginationModels";

type SearchType = "explore" | "saved" | "myStories";

interface UseSearchStoriesReturn {
    searchForm: UseFormReturn<StorySearchFormValues>;
    results: PageResponse<StoryInfo> | null;
    loading: boolean;
    handleSearch: (values: StorySearchFormValues) => Promise<void>;
    resetSearch: () => void;
}

export const useSearchStories = (searchType: SearchType): UseSearchStoriesReturn => {
    const { loadPublishedStories, loadStoriesForAuthUser, loadAuthUserFavorites } = useStories();
    const { authUser } = useAuth();
    
    const [results, setResults] = useState<PageResponse<StoryInfo> | null>(null);
    const [loading, setLoading] = useState(false);

    const searchForm = useForm<StorySearchFormValues>({
        resolver: zodResolver(storySearchSchema),
        defaultValues: {
            offset: 0,
            limit: 12,
            title: null,
            genreName: null,
            secondaryGenreName: null,
            status: null,
            tagNames: null,
            newestFirst: false,
        },
    });

    const handleSearch = useCallback(
        async (values: StorySearchFormValues) => {
            if (!authUser && (searchType === "saved" || searchType === "myStories")) {
                console.error("User must be authenticated for this search type");
                return;
            }

            setLoading(true);

            try {
                // Build StoryFilters object, removing null/undefined values
                const filters = {
                    offset: values.offset,
                    limit: values.limit,
                    ...(values.title && { title: values.title }),
                    ...(values.genreName && { genreName: values.genreName }),
                    ...(values.secondaryGenreName && { secondaryGenreName: values.secondaryGenreName }),
                    ...(values.status && { status: values.status }),
                    ...(values.tagNames && values.tagNames.length > 0 && { tagNames: values.tagNames }),
                    ...(values.newestFirst && { newestFirst: values.newestFirst }),
                };

                let response: PageResponse<StoryInfo>;

                if (searchType === "explore") {
                    response = await loadPublishedStories(filters);
                } else if (searchType === "myStories") {
                    response = await loadStoriesForAuthUser(filters, authUser!.userId);
                } else if (searchType === "saved") {
                    response = await loadAuthUserFavorites(filters, authUser!.userId);
                } else {
                    throw new Error("Invalid search type");
                }

                setResults(response);
            } catch (error) {
                console.error("Search error:", error);
                setResults(null);
            } finally {
                setLoading(false);
            }
        },
        [searchType, authUser, loadPublishedStories, loadStoriesForAuthUser, loadAuthUserFavorites]
    );

    const resetSearch = useCallback(() => {
        searchForm.reset({
            offset: 0,
            limit: 12,
            title: null,
            genreName: null,
            secondaryGenreName: null,
            status: null,
            tagNames: null,
            newestFirst: false,
        });
        setResults(null);
    }, [searchForm]);

    return {
        searchForm,
        results,
        loading,
        handleSearch,
        resetSearch,
    };
};
