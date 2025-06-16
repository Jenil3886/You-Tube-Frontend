import { useState, useEffect } from "react";
import axios from "axios";
import { apiurl } from "@/constants";
import { getRelativeTime } from "@/utils/helper";
import { useToast } from "@/hooks/use-toast";
import { VideoType } from "@/types";

export const useVideoData = (videoId: string | undefined) => {
	const { toast } = useToast();
	const [video, setVideo] = useState<VideoType | null>(null);
	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

	const fetchVideo = async () => {
		if (!videoId) return;
		try {
			const token = localStorage.getItem("accessToken");
			const response = await axios.get(`${apiurl}/videos/${videoId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const v = response.data.data;
			setVideo({
				id: v.id,
				thumbnail: v.thumbnail,
				videoUrl: v.videoFile,
				title: v.title,
				channelName: v.channel?.name || "Unknown Channel",
				channelAvatar: v.channel?.profilePicture || "/default-avatar.png",
				channelId: v.channel?.id,
				subscribers: v.channel?.subscriberCount?.toLocaleString() || "",
				views: v.views?.toLocaleString() || "0",
				timestamp: getRelativeTime(v.createdAt),
				likes: v.likes?.toLocaleString() || "0",
				description: v.description,
				duration: parseFloat(v.duration),
				comments: [],
				previewFolder: v.previewFolder,
				userAvtar: v.owner?.avatar,
				isLiked: v.isLiked === true,
			});
			setIsSubscribed(v.channel?.isSubscribed === 1);
		} catch (err) {
			console.error("Error fetching video:", err);
			setVideo(null);
			toast({
				title: "Error",
				description: "Failed to load video data",
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		fetchVideo();
	}, [videoId]);

	return { video, setVideo, isSubscribed, setIsSubscribed, fetchVideo };
};
