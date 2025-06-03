import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const LikedVideos = () => {
	// Determine content based on list type
	let title = "Playlist";
	let description = "";
	let videos: any[] = [];

	title = "Liked Videos";
	description = "Videos you've liked";
	videos = generateMockVideos(10, "Liked");

	return <CategoryPage title={title} description={description} videos={videos} />;
};

export default LikedVideos;
