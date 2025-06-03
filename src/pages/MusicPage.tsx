import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const musicVideos = generateMockVideos(16, "Music");

const musicFilters = ["All", "Charts", "Albums", "Singles", "Genres", "Moods", "New releases"];

const MusicPage = () => {
	return <CategoryPage title="Music" description="Latest hits, playlists, and music videos" filters={musicFilters} videos={musicVideos} />;
};

export default MusicPage;
