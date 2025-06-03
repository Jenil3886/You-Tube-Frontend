import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const newsVideos = generateMockVideos(16, "News");

const newsFilters = ["All", "Top Stories", "Politics", "Business", "Technology", "Entertainment", "World"];

const NewsPage = () => {
	return <CategoryPage title="News" description="Breaking news and top stories" filters={newsFilters} videos={newsVideos} />;
};

export default NewsPage;
