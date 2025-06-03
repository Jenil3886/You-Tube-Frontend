import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const sportsVideos = generateMockVideos(16, "Sports");

const sportsFilters = ["All", "Football", "Basketball", "Tennis", "Cricket", "Baseball", "Formula 1"];

const SportsPage = () => {
	return <CategoryPage title="Sports" description="Highlights, live games, and sports updates" filters={sportsFilters} videos={sportsVideos} />;
};

export default SportsPage;
