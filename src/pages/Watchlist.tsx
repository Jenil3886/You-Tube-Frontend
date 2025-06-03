import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const Watchlist = () => {
	// Determine content based on list type
	let title = "Playlist";
	let description = "";
	let videos: any[] = [];

	title = "Watch Later";
	description = "Videos you've saved to watch later";
	videos = generateMockVideos(8, "Watch Later");

	return <CategoryPage title={title} description={description} videos={videos} />;
};

export default Watchlist;
