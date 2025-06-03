import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const trendingVideos = generateMockVideos(16, "Trending");

const trendingFilters = ["All", "Music", "Gaming", "Movies", "News", "Live", "Sports"];

const TrendingPage = () => {
	return <CategoryPage title="Trending" description="See what's trending across YouTube" filters={trendingFilters} videos={trendingVideos} />;
};

export default TrendingPage;
