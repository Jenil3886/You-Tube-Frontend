import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { apiurl } from "@/constants";
import { formatDuration } from "@/utils/helper";

// Types
interface Video {
	id: string;
	thumbnail: string;
	title: string;
	channelName: string;
	channelAvatar: string;
	handle: string;
	views: string;
	timestamp: string;
	duration: string;
	visibility: string;
}

interface ApiVideo {
	id: string;
	thumbnail: string;
	title: string;
	channel?: {
		id: string;
		name: string;
		profilePicture?: string;
		handle?: string;
	};
	views?: number;
	createdAt: string;
	duration: string;
	visibility?: string;
}

type FilterOption = "all" | "public" | "private" | "byViews" | "byDate";

// Utility Functions
export const mapApiVideos = (videos: ApiVideo[], currentUserId: string): Video[] =>
	videos
		.filter((video) => video.channel?.id === currentUserId)
		.map((video) => ({
			id: video.id,
			thumbnail: video.thumbnail,
			title: video.title,
			channelName: video.channel?.name || "Unknown Channel",
			channelAvatar: video.channel?.profilePicture || "/default-avatar.png",
			handle: video.channel?.handle || "",
			views: video.views?.toString() || "0",
			timestamp: video.createdAt,
			duration: formatDuration(Number(video.duration)),
			visibility: video.visibility || "Public",
		}));

const filterVideos = (videos: Video[], filter: FilterOption): Video[] => {
	switch (filter) {
		case "public":
			return videos.filter((video) => video.visibility === "Public");
		case "private":
			return videos.filter((video) => video.visibility === "Private");
		case "byViews":
			return [...videos].sort((a, b) => parseInt(b.views) - parseInt(a.views));
		case "byDate":
			return [...videos].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
		case "all":
		default:
			return videos;
	}
};

const useVideos = () => {
	const [videos, setVideos] = useState<Video[]>([]);
	const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
	const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filter, setFilter] = useState<FilterOption>("all");

	const fetchVideos = useCallback(async () => {
		try {
			setLoading(true);
			setError("");
			const token = localStorage.getItem("accessToken");

			const [channelResponse, videoResponse] = await Promise.all([
				axios.get(`${apiurl}/channels/me`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
				axios.get(`${apiurl}/videos`, {
					headers: { Authorization: `Bearer ${token}` },
				}),
			]);

			const currentUserId = channelResponse.data.data.id;
			const mappedVideos = mapApiVideos(videoResponse.data.data.rows, currentUserId);
			setVideos(mappedVideos);
			setFilteredVideos(mappedVideos);
			setSelectedVideos([]);
		} catch (err: unknown) {
			let msg = "Failed to fetch videos or user info";
			if (axios.isAxiosError(err) && err.response?.data && typeof err.response.data.message === "string") {
				msg = err.response.data.message;
			}
			setError(msg);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchVideos();
	}, [fetchVideos]);

	useEffect(() => {
		setFilteredVideos(filterVideos(videos, filter));
		setSelectedVideos((prev) => prev.filter((id) => filteredVideos.some((video) => video.id === id)));
	}, [filter, videos]);

	const handleSelectVideo = (id: string, checked: boolean) => {
		setSelectedVideos((prev) => (checked ? [...prev, id] : prev.filter((videoId) => videoId !== id)));
	};

	const handleDeleteSelected = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			await Promise.all(
				selectedVideos.map((id) =>
					axios.delete(`${apiurl}/videos/${id}`, {
						headers: { Authorization: `Bearer ${token}` },
					})
				)
			);
			const updatedVideos = videos.filter((video) => !selectedVideos.includes(video.id));
			setVideos(updatedVideos);
			setFilteredVideos(filterVideos(updatedVideos, filter));
			setSelectedVideos([]);
			return true;
		} catch (err: unknown) {
			setError(err.response?.data?.message || "Failed to delete videos");
			return false;
		}
	};

	const handleFilterSelect = (value: FilterOption) => {
		setFilter(value);
	};

	return {
		videos,
		filteredVideos,
		selectedVideos,
		loading,
		error,
		filter,
		handleSelectVideo,
		handleDeleteSelected,
		handleFilterSelect,
		fetchVideos,
	};
};

export type { Video };
export default useVideos;
