import { useSearchParams } from "react-router-dom";
import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const PlaylistPage = () => {
	const [searchParams] = useSearchParams();
	const listType = searchParams.get("list") || "";

	// Determine content based on list type
	let title = "Playlist";
	let description = "";
	let videos = [];

	if (listType === "WL") {
		title = "Watch Later";
		description = "Videos you've saved to watch later";
		videos = generateMockVideos(8, "Watch Later");
	} else if (listType === "LL") {
		title = "Liked Videos";
		description = "Videos you've liked";
		videos = generateMockVideos(10, "Liked");
	}

	return <CategoryPage title={title} description={description} videos={videos} />;
};

export default PlaylistPage;
