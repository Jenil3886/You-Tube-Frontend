import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Filter, ChevronDown, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiurl } from "@/constants";
import { formatDuration } from "@/utils/helper";
import { useVideoUploadContext } from "@/context/VideoUploadContext";
import LoadingState from "@/components/video/LoadingState";
import ErrorState from "@/components/video/ErrorState";
import EmptyState from "@/components/video/EmptyState";
import VideoCard from "./VideoCard";
import VideoTable from "./VideoTable";
import UploadingVideoCard from "@/components/video/UploadingVideoCard";
import { ApiVideo, Video } from "@/types";

// Types

// Filter Options Type
type FilterOption = "all" | "public" | "private" | "byViews" | "byDate";

// Filter Options Configuration
const filterOptions: { value: FilterOption; label: string }[] = [
	{ value: "all", label: "All Videos" },
	{ value: "public", label: "Public Videos" },
	{ value: "private", label: "Private Videos" },
	{ value: "byViews", label: "Sort by Views" },
	{ value: "byDate", label: "Sort by Date" },
];

// Utility Functions
const mapApiVideos = (videos: ApiVideo[], currentUserId: string): Video[] =>
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
			duration: formatDuration(Number(video.duration)), // Fix: ensure number
			visibility: video.visibility || "Public",
			commentCount: video.commentCount ?? 0,
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

const VideosTab = () => {
	const [videos, setVideos] = useState<Video[]>([]);
	const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
	const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filter, setFilter] = useState<FilterOption>("all");
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const navigate = useNavigate();
	const { uploadingVideos } = useVideoUploadContext();

	// Helper type guard for Axios error
	function isAxiosError(error: unknown): error is { response: { data: { message?: string } } } {
		return (
			typeof error === "object" &&
			error !== null &&
			"response" in error &&
			typeof (error as { response?: unknown }).response === "object" &&
			(error as { response?: unknown }).response !== null &&
			"data" in (error as { response: { data?: unknown } }).response
		);
	}

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
		} catch (err) {
			let msg = "Failed to fetch videos or user info";
			if (isAxiosError(err) && err.response.data && typeof err.response.data.message === "string") {
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
	}, [filter, videos]);

	const handleSelectVideo = (id: string, checked: boolean) => {
		setSelectedVideos((prev) => (checked ? [...prev, id] : prev.filter((videoId) => videoId !== id)));
	};

	const handleDeleteSelected = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				setError("User is not authenticated.");
				setIsDeleteDialogOpen(false);
				return;
			}
			const deleteResults = await Promise.allSettled(
				selectedVideos.map((id) =>
					axios.delete(`${apiurl}/videos/${id}`, {
						headers: { Authorization: `Bearer ${token}` },
					})
				)
			);
			const successfulDeletes = selectedVideos.filter((_, i) => deleteResults[i].status === "fulfilled");
			const updatedVideos = videos.filter((video) => !successfulDeletes.includes(video.id));
			setVideos(updatedVideos);
			setFilteredVideos(filterVideos(updatedVideos, filter));
			setSelectedVideos([]);
			setIsDeleteDialogOpen(false);
			const failedCount = deleteResults.filter((res) => res.status === "rejected").length;
			if (failedCount > 0) {
				setError(`${failedCount} video(s) could not be deleted.`);
			}
		} catch (err) {
			let msg = "Failed to delete videos";
			if (isAxiosError(err) && err.response.data && typeof err.response.data.message === "string") {
				msg = err.response.data.message;
			}
			setError(msg);
			setIsDeleteDialogOpen(false);
		}
	};

	const handleFilterSelect = (value: FilterOption) => {
		setFilter(value);
	};

	// Merge real and temporary videos for display
	const tempUploadingVideos: Video[] = Object.values(uploadingVideos).map((temp) => ({
		id: temp.id,
		thumbnail: "/default-thumbnail.png",
		title: temp.title,
		channelName: "You",
		channelAvatar: "/default-avatar.png",
		handle: "",
		views: "0",
		timestamp: temp.timestamp,
		duration: "0:00",
		visibility: "Private",
		commentCount: 0,
		isTemporary: true,
		progress: temp.progress ?? 0,
	}));
	const mergedVideos = [...filteredVideos, ...tempUploadingVideos];
	const uploadingCount = tempUploadingVideos.length;

	if (loading) return <LoadingState />;
	if (error) return <ErrorState message={error} />;
	if (!videos.length && uploadingCount === 0) return <EmptyState onUpload={() => navigate("/upload")} />;

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-full">
			<div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2" aria-label="Filter videos">
								<Filter className="h-4 w-4" />
								Filter
								<ChevronDown className="h-4 w-4 ml-1" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-40">
							{filterOptions.map((option) => (
								<DropdownMenuItem key={option.value} onSelect={() => handleFilterSelect(option.value)} className="text-xs sm:text-sm">
									{option.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					{selectedVideos.length > 0 && (
						<Button
							variant="destructive"
							size="sm"
							className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2"
							onClick={() => setIsDeleteDialogOpen(true)}
							aria-label="Delete selected videos"
						>
							<Trash2 className="h-4 w-4" />
							Delete
						</Button>
					)}
				</div>
			</div>
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the selected {selectedVideos.length} video
							{selectedVideos.length > 1 ? "s" : ""}.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDeleteSelected} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<VideoTable videos={mergedVideos} selectedVideos={selectedVideos} onSelectVideo={handleSelectVideo} uploadingCount={uploadingCount} />
			<div className="md:hidden space-y-4">
				{/* Show skeleton cards for uploading videos */}
				{tempUploadingVideos.map((_, i) => (
					<UploadingVideoCard key={`uploading-card-${i}`} />
				))}
				{/* Show real and temp videos */}
				{mergedVideos.map((video) => (
					<VideoCard key={video.id} video={video} isSelected={selectedVideos.includes(video.id)} onSelectVideo={handleSelectVideo} />
				))}
			</div>
		</div>
	);
};

export default VideosTab;
