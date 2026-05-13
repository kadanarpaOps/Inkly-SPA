import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useStories } from "../../hooks/useStories";
import { useEffect, useState } from "react";
import type { StoryInfo } from "../../../core/domain/models/stories/StoryModel";

const EditStory = () => {

  // Use Navigate
  const navigate = useNavigate();
  // Use Auth
  const { authUser } = useAuth();
  // Use Stories
  const { loadStoryById } = useStories();
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
  return (
    <main className="relative h-full">
      { story ? (
        
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="loading-button" />
        </div>
      )}
    </main>
  )
}

export default EditStory