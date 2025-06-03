import CategoryPage from "@/components/category/CategoryPage";
import { generateMockVideos } from "@/data/mockVideos";

const shoppingVideos = generateMockVideos(16, "Shopping");

const shoppingFilters = ["All", "Tech", "Fashion", "Home", "Beauty", "Deals", "Reviews"];

const ShoppingPage = () => {
	return <CategoryPage title="Shopping" description="Product reviews and recommendations" filters={shoppingFilters} videos={shoppingVideos} />;
};

export default ShoppingPage;
