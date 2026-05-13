import type z from "zod";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useStories } from "../../hooks/useStories";
import { useEffect, useRef, useState } from "react";
import type { StatusNames, StoryInfo, UpdateStory } from "../../../core/domain/models/stories/StoryModel";
import { Check, Info, List, Pencil, RotateCcw, Trash } from "lucide-react";
import { getRandomCover } from "../utils/covers.util";
import ImageCropperModal from "../../components/images/ImageCropperModal";
import { updateSchema } from "../../schemas/stories/stories.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectCategoryModal from "../../components/stories/SelectCategoryModal";
import { GenreIcon } from "../../components/stories/GenresIcons";

type UpdateFormValues = z.infer<typeof updateSchema>;

const EditStory = () => {

  // Use Navigate
  const navigate = useNavigate();
  // Use Auth
  const { authUser } = useAuth();
  // Use Stories
  const { loading, loadStoryById, updateStory, updateStoryCover, deleteStoryCover } = useStories();
  // Extract storyId from the URI
  const { storyId } = useParams<{ storyId: string}>();
  // Find Story Details
  const [ story, setStory ] = useState<StoryInfo | null>(null);
  useEffect(() => {
    const loadStory = async () => {
      if (storyId && authUser) {
        const responseStory = await loadStoryById(storyId);
        if (responseStory === null) {
          navigate("*");
        }
        if (responseStory.userId !== authUser.userId) {
          navigate("/forbidden")
        }
        setStory(responseStory);
      }
    };
    loadStory();
  }, [authUser, storyId, loadStoryById, navigate]);
  // Modify Story
  const [ modifiedStory, setModifiedStory ] = useState<boolean>(false);
  useEffect(() => {
    const refreshStory = async () => {
      if (storyId && modifiedStory === true) {
        const refreshedStory = await loadStoryById(storyId);
        setStory(refreshedStory);
        setModifiedStory(false);
      }
    }
    refreshStory();
  }, [storyId, loadStoryById, modifiedStory]);

  // Use Form and IsEditing Values...
  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: zodResolver(updateSchema)
  });
  const [ isEditingTitle, setIsEditingTitle ] = useState<boolean>(false);
  const [ isEditingDescription, setIsEditingDescription ] = useState<boolean>(false);
  const [ editingGenreOrSubgenre, setEditingGenreOrSubgenre ] = useState<"genre" | "subgenre" | null>(null);

  useEffect(() => {
    if (story) {
      reset({
        title: story?.title,
        description: story?.description,
        genreName: story?.genre.name,
        secondaryGenreName: story?.secondaryGenre.name,
        status: story?.status,
      });
    }
  }, [story, reset]);

  const onSubmit = async (data: UpdateFormValues): Promise<boolean> => {
    if (story) {
      console.log("Llegó al onSubmit");
      const updateRequest: UpdateStory = { ...data, status: data.status as StatusNames };
      const success = await updateStory(updateRequest, story.id);
      if (success) setModifiedStory(true);
      return success;
    }
    return false;
  }

  const handleGenreOrSubgenreUpdate = async (genreName : string) => {
    const fieldToUpdate = editingGenreOrSubgenre === "genre" ? "genreName" : "secondaryGenreName";
    setValue(fieldToUpdate, genreName);
    
    setEditingGenreOrSubgenre(null);
    console.log("Llegó al handleGenre");
    handleSubmit(onSubmit)();
  }

  // Modify Cover
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [ selectedCover, setSelectedCover ] = useState<string | null>(null);
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => setSelectedCover(reader.result as string);
    }
  }
  const handleCoverUpdate = async (blob: Blob) => {
    if (story && authUser) {
      const coverFile = new File([blob], "cover.jpg", { type: "image/jpeg" });
      const success = await updateStoryCover(coverFile, story.id);
      console.log(success);
      if (success) {
        setSelectedCover(null);
        setModifiedStory(true);
      }
    }
  }
  const handleDeleteCover = async () => {
    if (story && authUser) {
      const success = await deleteStoryCover(story.id);
      if (success) {
        setModifiedStory(true);
      }
    }
  }

  return (
    <main className="relative h-full">
      {selectedCover && (
          <ImageCropperModal
              image={selectedCover}
              aspect={2/3}
              onCropComplete={handleCoverUpdate}
              onCancel={() => setSelectedCover(null)}
              loading={loading}
          />
      )}

      { editingGenreOrSubgenre && (
        <SelectCategoryModal
          onSelect={(value: string) => {
            handleGenreOrSubgenreUpdate(value);
            handleSubmit(async(data) => onSubmit(data));
          }}
          onCancel={() => setEditingGenreOrSubgenre(null)}
          repeatedGenres={[story!.genre.name, story!.secondaryGenre.name]}
        />
      )}

      { story && !modifiedStory ? (
        <div className="p-8 md:p-14 md:px-30 max-w-7xl mx-auto ">
          <section className="relative" id="info">
            <nav className="absolute -top-4 right-0 flex flex-col gap-2 z-10">
              <a href="#info" className="p-4 rounded-xl text-on-surface-variant hover:bg-primary-container hover:text-on-primary hover:shadow-lg hover:shadow-primary-container/10 transition-all" title="Basic Info">
                <Info size={20} />
              </a>
              <a href="#chapters" className="p-4 rounded-xl text-on-surface-variant hover:bg-primary-container hover:text-on-primary hover:shadow-lg hover:shadow-primary-container/10 transition-all" title="Chapters">
                <List size={20} />
              </a>
            </nav>
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/** Modify Cover */}
              <div className="group relative w-full max-w-[320px] aspect-2/3 rounded-xl overflow-hidden shadow-2xl shadow-black/40 bg-surface-container-highest flex-shrink-0">
                <img
                  src={story.coverUrl ? story.coverUrl : getRandomCover()}
                  alt="Portada de la Historia"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                  <button
                    onClick={() => coverInputRef.current?.click()}
                    className="bg-several-light cursor-pointer text-surface px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <span className="text-lg">
                      <Pencil size={20} fill="currentColor" />
                    </span>
                    Cambiar
                  </button>
                  {/** Input to select Image */}
                  <input
                      type="file"
                      ref={coverInputRef}
                      className="hidden"
                      accept="image/png, image/jpeg"
                      onChange={handleCoverChange}
                  />
                  {/** Delete Image */}
                  <button
                    onClick={() => handleDeleteCover()}
                    className="bg-primary-container cursor-pointer text-surface px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <span className="text-lg">
                      <Trash size={20} fill="currentColor" />
                    </span>
                    Eliminar
                  </button>
                </div>
              </div>
              {/** Modify Title and Description */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {!isEditingTitle ? (
                      <h1
                        onClick={() => setIsEditingTitle(true)}
                        className="text-5xl font-display font-extrabold py-3 tracking-tight text-fujiWhite group cursor-pointer inline-flex items-center gap-4 transition-all"
                      >
                        {story.title}
                        <span className="text-primary/40 group-hover:text-primary transition-colors">
                          <Pencil size={24} />
                        </span>
                      </h1>
                    ) : (
                      <div className="inline-flex items-center gap-4 w-130">
                        <input
                          {...register("title")}
                          type="text"
                          className="text-5xl font-display font-extrabold tracking-tight bg-transparent border-b-2 border-global/60 text-fujiWhite outline-none w-full animate-in fade-in duration-300"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSubmit(async (data) => {
                              const success = await onSubmit(data);
                              if (success) setIsEditingTitle(false);
                            })}
                            className="text-primary/40 hover:text-primary transition-colors cursor-pointer"
                          >
                            <Check size={24} />
                          </button>
                          <button
                            onClick={() => {
                              setValue("title", story?.title);
                              setIsEditingTitle(false);
                            }}
                            className="text-primary/40 hover:text-primary transition-colors cursor-pointer"
                          >
                            <RotateCcw size={24} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-140">
                    <button
                      onClick={() => setEditingGenreOrSubgenre("genre")}
                      className="cursor-pointer flex items-center justify-between bg-surface-container-low px-6 py-4 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface" type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-primary/60">
                          <GenreIcon name={story.genre.name} size={24} />
                        </span>
                        {story.genre.name}
                      </span>
                    </button>
                    <button
                      onClick={() => setEditingGenreOrSubgenre("subgenre")}
                      className="cursor-pointer flex items-center justify-between bg-surface-container-low px-6 py-4 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface" type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-primary/60">
                          <GenreIcon name={story.secondaryGenre.name} size={24} />
                        </span>
                        {story.secondaryGenre.name}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="loading-button" />
        </div>
      )}
    </main>
  )
}

export default EditStory;
