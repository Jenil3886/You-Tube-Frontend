import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef } from "react";
import VideoCard from "./VideoCard";

interface VideoGridProps {
	videos: {
		id: string;
		thumbnail: string;
		title: string;
		channelName: string;
		handle: string;
		channelAvatar: string;
		views: string;
		timestamp: string;
		duration: string;
	}[];
}

const VideoGrid = ({ videos }: VideoGridProps) => {
	const isMobile = useIsMobile();
	const gridRef = useRef<HTMLDivElement>(null);

	// Apply staggered animation to videos when component mounts
	useEffect(() => {
		const videoElements = gridRef.current?.children;
		if (!videoElements) return;

		Array.from(videoElements).forEach((video, index) => {
			const element = video as HTMLElement;
			element.style.opacity = "0";
			element.style.transform = "translateY(20px)";

			setTimeout(() => {
				element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
				element.style.opacity = "1";
				element.style.transform = "translateY(0)";
			}, 100 * index); // Staggered timing
		});
	}, [videos]);

	return (
		<div ref={gridRef} className={`grid gap-2 sm:gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
			{videos.map((video) => (
				<VideoCard key={video.id} {...video} compact={isMobile} channelName={video.channelName || "Unknown Channel"} handle={video.handle} />
			))}
		</div>
	);
};

export default VideoGrid;
