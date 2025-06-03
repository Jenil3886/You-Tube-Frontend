import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const gamingVideos = generateMockVideos(16, "Gaming");

const gamingFilters = ["All", "Minecraft", "Fortnite", "Roblox", "Call of Duty", "GTA V", "League of Legends"];

const GamingPage = () => {
	return <CategoryPage title="Gaming" description="Live streams and gaming content" filters={gamingFilters} videos={gamingVideos} />;
};

export default GamingPage;
