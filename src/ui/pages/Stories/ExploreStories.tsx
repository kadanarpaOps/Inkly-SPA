import { useStories } from "../../hooks/useStories";

export default function ExploreStories() {
    
    // Use Stories
    const { loading, } = useStories();

    return (
        <h1>
            Explore Stories
        </h1>
    );
}
