import { useState } from "react";
import { useStories } from "../../hooks/useStories";
import { useSearchStories } from "../../hooks/useSearchStories";
import { useNavigate } from "react-router";
import { useWatch } from "react-hook-form";
import type { StatusNames } from "../../../core/domain/models/stories/StoryModel";
import SelectCategoryModal from "../../components/stories/SelectCategoryModal";
import SelectNewStatusModal from "../../components/stories/SelectNewStatusModal";
import { GenreIcon } from "../../components/stories/GenresIcons";
import { Bolt, Cog, LineSquiggle, Plus, RotateCcw, Search } from "lucide-react";
import { StatusIcon } from "../../components/stories/StatusesIcons";
import type { searchSchema } from "../../schemas/stories/stories.schema";
import type z from "zod";

type SearchFormValues = z.infer<typeof searchSchema>;

export default function ExploreStories() {
    
    // Use Navigate
    const navigate = useNavigate();
    // Use Stories
    const { loading, loadPublishedStories, loadAuthUserFavorites } = useStories();
    // Use Search Stories
    const { searchForm, resultStories, handleSearch, resetSearch } = useSearchStories({ loadStories: loadPublishedStories });
    // Use Form
    const { register, handleSubmit, reset, control, setValue } = searchForm;

    // Watch for real time values
    const currentGenre = useWatch({ control, name: "genreName" });
    const currentSubgenre = useWatch({ control, name: "secondaryGenreName" });
    const currentStatus = useWatch({ control, name: "status" });
    const currentTags = useWatch({ control, name: "tagNames" });
    const currentPage = useWatch({ control, name: "offset"})
    const currentPageSize = useWatch({ control, name: "limit"})

    // Select Search Genre or Subgenre
    const [ isSelectingGenreOrSubgenre, setIsSelectingGenreOrSubgenre ] = useState<"genre" | "subgenre" | null>(null);
    const [ isSelectingStatus, setIsSelectingStatus ] = useState<boolean>(false);
    // Handle Selections
    const handleSelectGenre = (value: string) => {
      if (isSelectingGenreOrSubgenre === "genre") setValue("genreName", value);
      if (isSelectingGenreOrSubgenre === "subgenre") setValue("secondaryGenreName", value);
      setIsSelectingGenreOrSubgenre(null)
    };
    const handleSelectStatus = (value: StatusNames) => {
        console.log(value)
        setValue("status", value);
        setIsSelectingStatus(false);
    };

    // Use Effect for default search

    // Handle Submit
    const onSubmit = async (data: SearchFormValues) => {
        data.offset = 0;
        await handleSearch(data);
    }

    return (
        <main className="relative w-full">
            { isSelectingGenreOrSubgenre && (
                <SelectCategoryModal
                    onSelect={(value: string) => {handleSelectGenre(value)}}
                    onCancel={() => setIsSelectingGenreOrSubgenre(null)}
                    repeatedGenres={isSelectingGenreOrSubgenre === "genre" ? (currentSubgenre !== null ? [currentSubgenre!] : []) : (currentGenre !== null ? [currentGenre!] : [])}
                />
            )}
            { isSelectingStatus && (
                <SelectNewStatusModal
                    onSelect={(value: string) => {
                        handleSelectStatus(value as StatusNames);
                    }}
                    onCancel={() => setIsSelectingStatus(false)}
                    repeatedStatus={[currentStatus ? currentStatus! : ""]}
                />
            )}
            <div className="min-h-screen max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-center">
                    <div className="col-span-1">
                        <label className="text-md font-semibold tracking-wide text-primary/80 uppercase ml-3 mb-3 flex items-center gap-3">
                            Género Principal
                            { currentGenre && (
                                <button
                                  onClick={() => {
                                    setValue("genreName", null);
                                  }}
                                  className="text-primary/40 hover:text-primary transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={20} />
                                </button>
                            )}
                        </label>
                        <button
                            onClick={() => setIsSelectingGenreOrSubgenre("genre")}
                            className="cursor-pointer w-full flex items-center justify-between bg-surface-container-low glass-ghost px-6 py-4 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface" type="button"
                        >
                        <span className="flex items-center gap-3">
                            <span className="text-primary/60">
                            {currentGenre ? (
                                <GenreIcon name={currentGenre} size={24} />
                            ) : (
                                <Cog size={24} />
                            )}
                            </span>
                            {currentGenre || "Seleccionar Género"}
                        </span>
                        <span className="text-primary/60">
                            <Plus size={20} />
                        </span>
                        </button>
                    </div>
                    <div className="col-span-1">
                        <label className="text-md font-semibold tracking-wide text-primary/80 uppercase ml-3 mb-3 flex items-center gap-3">
                            Género Secundario
                            { currentSubgenre && (
                                <button
                                  onClick={() => {
                                    setValue("secondaryGenreName", null);
                                  }}
                                  className="text-primary/40 hover:text-primary transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={20} />
                                </button>
                            )}
                        </label>
                        <button
                            onClick={() => setIsSelectingGenreOrSubgenre("subgenre")}
                            className="cursor-pointer w-full flex items-center justify-between bg-surface-container-low glass-ghost px-6 py-4 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface" type="button"
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-primary/60">
                                {currentSubgenre ? (
                                    <GenreIcon name={currentSubgenre} size={24} />
                                ) : (
                                    <Bolt size={24} />
                                )}
                                </span>
                                {currentSubgenre || "Seleccionar Subgénero"}
                            </span>
                            <span className="text-primary/60">
                                <Plus size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="col-span-1">
                        <label className="text-md font-semibold tracking-wide text-primary/80 uppercase ml-3 mb-3 flex items-center gap-3">
                            Estado
                            { currentStatus && (
                                <button
                                  onClick={() => {
                                    setValue("status", null);
                                  }}
                                  className="text-primary/40 hover:text-primary transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={20} />
                                </button>
                            )}
                        </label>
                        <button
                            onClick={() => setIsSelectingStatus(true)}
                            className="cursor-pointer w-full flex items-center justify-between bg-surface-container-low glass-ghost px-6 py-4 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface" type="button"
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-primary/60">
                                {currentStatus ? (
                                    <StatusIcon name={currentStatus} size={24} />
                                ) : (
                                    <LineSquiggle size={24} />
                                )}
                                </span>
                                {currentStatus?.replace("_", " ") || "Seleccionar Estado"}
                            </span>
                            <span className="text-primary/60">
                                <Plus size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={() => { resetSearch(); reset(); }} className="px-4 py-2 rounded-lg border border-toolbar-bg/10 text-global hover:bg-toolbar-bg/5 transition cursor-pointer">
                            Limpiar
                        </button>
                        <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg border border-toolbar-bg/10 text-global hover:bg-toolbar-bg/5 transition cursor-pointer">
                            <Search size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );

}
