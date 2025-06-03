// import { useState, useEffect } from "react";
// import VideoGrid from "../components/video/VideoGrid";
// import { Button } from "../components/ui/button";
// import axios from "axios";
// import ErrorPage from "../components/ui/ErrorPage";
// import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
// import { useIsMobile } from "../hooks/use-mobile";
// import { apiurl } from "@/constants";
// import { formatDuration } from "@/utils/helper";
// import MiniPlayer from "@/components/video/MiniPlayer";

// const categories = ["All", "Gaming", "Music", "React JS", "JavaScript", "TypeScript", "Next.js", "CSS", "Productivity", "Podcast"];

// const HomePage = () => {
// 	const [activeCategory, setActiveCategory] = useState("All");
// 	const [videos, setVideos] = useState([]);
// 	const [loading, setLoading] = useState(true); // Added loading state
// 	const [error, setError] = useState("");
// 	const [miniPlayerVideo, setMiniPlayerVideo] = useState<any>(null);
// 	const isMobile = useIsMobile();

// 	// Check for mini player video on component mount
// 	useEffect(() => {
// 		const storedVideo = localStorage.getItem("homePageVideo");
// 		if (storedVideo) {
// 			setMiniPlayerVideo(JSON.parse(storedVideo));
// 		}
// 	}, []);

// 	useEffect(() => {
// 		const fetchVideos = async () => {
// 			try {
// 				const token = localStorage.getItem("accessToken");
// 				const response = await axios.get(`${apiurl}/videos`, {
// 					headers: { Authorization: `Bearer ${token}` },
// 				});
// 				const mappedVideos = response.data.data.rows.map((video: any) => ({
// 					id: video.id,
// 					thumbnail: video.thumbnail,
// 					title: video.title,
// 					channelName: video.channel?.name || "Unknown Channel",
// 					channelAvatar: video.channel?.profilePicture || "/default-avatar.png",
// 					handle: video.channel?.handle || "",
// 					views: video.views?.toString() || "0",
// 					timestamp: video.createdAt,
// 					duration: formatDuration(video.duration),
// 				}));
// 				setVideos(mappedVideos);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || "Failed to fetch videos");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchVideos();
// 	}, []);

// 	const handleCloseMiniPlayer = () => {
// 		setMiniPlayerVideo(null);
// 		localStorage.removeItem("homePageVideo");
// 	};

// 	return (
// 		<div className="w-full px-4 py-6 md:container md:mx-auto md:py-6">
// 			{/* Mini Player */}
// 			{miniPlayerVideo && <MiniPlayer video={miniPlayerVideo} onClose={handleCloseMiniPlayer} />}
// 			{/* Categories */}
// 			<ScrollArea className="w-full whitespace-nowrap mb-6">
// 				<div className="flex gap-2 pb-2">
// 					{categories.map((category) => (
// 						<Button
// 							key={category}
// 							variant={activeCategory === category ? "default" : "outline"}
// 							className="rounded-full whitespace-nowrap px-3 md:px-4"
// 							size={isMobile ? "sm" : "default"}
// 							onClick={() => setActiveCategory(category)}
// 						>
// 							{category}
// 						</Button>
// 					))}
// 				</div>
// 				<ScrollBar orientation="horizontal" />
// 			</ScrollArea>

// 			{/* Videos */}
// 			{error ? (
// 				<ErrorPage message={error} />
// 			) : loading ? (
// 				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
// 					{Array.from({ length: 8 }).map((_, index) => (
// 						<div key={index} className="animate-pulse flex flex-col">
// 							<div className="aspect-[16/9] bg-muted rounded-lg"></div>
// 							<div className="mt-2 h-4 bg-muted rounded"></div>
// 							<div className="mt-1 h-4 bg-muted rounded w-3/4"></div>
// 						</div>
// 					))}
// 				</div>
// 			) : (
// 				<VideoGrid videos={videos} />
// 			)}
// 		</div>
// 	);
// };

// export default HomePage;

// pages/HomePage.tsx

import { useState, useEffect } from "react";
import VideoGrid from "../components/video/VideoGrid";
import { Button } from "../components/ui/button";
import axios from "axios";
import ErrorPage from "../components/ui/ErrorPage";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { useIsMobile } from "../hooks/use-mobile";
import { apiurl } from "@/constants";
import { formatDuration } from "@/utils/helper";
import MiniPlayer from "@/components/video/MiniPlayer";

const categories = ["All", "Gaming", "Music", "React JS", "JavaScript", "TypeScript", "Next.js", "CSS", "Productivity", "Podcast"];

const HomePage = () => {
	const [activeCategory, setActiveCategory] = useState("All");
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [miniPlayerVideo, setMiniPlayerVideo] = useState<any>(null);
	const isMobile = useIsMobile();

	useEffect(() => {
		const storedVideo = localStorage.getItem("homePageVideo");

		if (storedVideo) {
			try {
				const parsedVideo = JSON.parse(storedVideo);

				if (parsedVideo && typeof parsedVideo === "object" && parsedVideo.id && parsedVideo.title && parsedVideo.thumbnail && parsedVideo.videoUrl) {
					setMiniPlayerVideo(parsedVideo);
				} else {
					localStorage.removeItem("homePageVideo");
				}
			} catch (e) {
				console.error("Failed to parse stored video", e);
				localStorage.removeItem("homePageVideo");
			}
		}
	}, []);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				const response = await axios.get(`${apiurl}/videos`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const mappedVideos = response.data.data.rows.map((video: any) => ({
					id: video.id,
					thumbnail: video.thumbnail,
					title: video.title,
					channelName: video.channel?.name || "Unknown Channel",
					channelAvatar: video.channel?.profilePicture || "/default-avatar.png",
					handle: video.channel?.handle || "",
					views: video.views?.toString() || "0",
					timestamp: video.createdAt,
					duration: formatDuration(video.duration),
				}));
				setVideos(mappedVideos);
			} catch (err: any) {
				setError(err.response?.data?.message || "Failed to fetch videos");
			} finally {
				setLoading(false);
			}
		};

		fetchVideos();
	}, []);

	const handleCloseMiniPlayer = () => {
		setMiniPlayerVideo(null);
		localStorage.removeItem("homePageVideo");
	};

	return (
		<div className="w-full px-4 py-6  md:mx-auto md:py-6 select-none">
			{/* Mini Player */}
			{miniPlayerVideo && <MiniPlayer video={miniPlayerVideo} onClose={handleCloseMiniPlayer} />}

			{/* Categories */}
			<ScrollArea className="w-full whitespace-nowrap mb-6">
				<div className="flex gap-2 pb-2">
					{categories.map((category) => (
						<Button
							key={category}
							variant={activeCategory === category ? "default" : "outline"}
							className="rounded-full whitespace-nowrap px-3 md:px-4"
							size={isMobile ? "sm" : "default"}
							onClick={() => setActiveCategory(category)}
						>
							{category}
						</Button>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>

			{/* Videos */}
			{error ? (
				<ErrorPage message={error} />
			) : loading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className="animate-pulse flex flex-col">
							<div className="aspect-[16/9] bg-muted rounded-lg"></div>
							<div className="mt-2 h-4 bg-muted rounded"></div>
							<div className="mt-1 h-4 bg-muted rounded w-3/4"></div>
						</div>
					))}
				</div>
			) : (
				<VideoGrid videos={videos} />
			)}
		</div>
	);
};

export default HomePage;
