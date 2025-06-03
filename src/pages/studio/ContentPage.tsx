import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
	InspirationTab,
	LiveTab,
	PlaylistsTab,
	PodcastsTab,
	PostsTab,
	PromotionsTab,
	ShortsTab,
	VideosTab,
	ContentTabsList,
} from "@/pages/studio/content/index";

// Import tab components

// Main ContentPage component
const ContentPage = () => {
	const [activeTab, setActiveTab] = useState("videos");
	const location = useLocation();
	const navigate = useNavigate();

	// Get active tab from URL hash
	useEffect(() => {
		const hash = location.hash.replace("#", "");
		if (hash) {
			setActiveTab(hash);
		}
	}, [location]);

	// Update URL hash when tab changes
	useEffect(() => {
		navigate(`/studio/content#${activeTab}`, { replace: true });
	}, [activeTab, navigate]);

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-6">Channel content</h1>

			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<ContentTabsList activeTab={activeTab} />

				<TabsContent value="inspiration">
					<InspirationTab />
				</TabsContent>
				<TabsContent value="videos">
					<VideosTab />
				</TabsContent>
				<TabsContent value="shorts">
					<ShortsTab />
				</TabsContent>
				<TabsContent value="live">
					<LiveTab />
				</TabsContent>
				<TabsContent value="posts">
					<PostsTab />
				</TabsContent>
				<TabsContent value="playlists">
					<PlaylistsTab />
				</TabsContent>
				<TabsContent value="podcasts">
					<PodcastsTab />
				</TabsContent>
				<TabsContent value="promotions">
					<PromotionsTab />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ContentPage;
