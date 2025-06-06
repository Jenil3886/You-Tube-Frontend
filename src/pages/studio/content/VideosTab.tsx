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
import { Filter, Upload, ChevronDown, Trash2, LucideYoutube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiurl, FRONTEND_URL } from "@/constants";
import { formatDateToDDMMYYYY, formatDuration } from "@/utils/helper";
import { FaPencilAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MdOutlineChat, MdOutlineInsertChart } from "react-icons/md";

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
	commentCount: number; // <-- add this
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
	commentCount?: number; // <-- add this
}

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
			duration: formatDuration(video.duration),
			visibility: video.visibility || "Public",
			commentCount: video.commentCount ?? 0, // <-- use backend value
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

// Components
// const LoadingState = () => (
// 	<div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] space-y-6">
// 		<div className="flex items-center justify-center space-x-2">
// 			<span className="sr-only">Loading...</span>
// 			<div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:.1s]"></div>
// 			<div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:.2s]"></div>
// 			<div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:.3s]"></div>
// 		</div>
// 		<p className="text-base sm:text-lg text-muted-foreground font-medium ">Hold on! We're fetching your videos...</p>
// 	</div>
// );
const LoadingState = () => (
	<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
		{/* Header Placeholder */}
		<div className="mb-6 flex justify-between items-center">
			<div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded loading-shimmer"></div>
			<div className="flex gap-2">
				<div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded loading-shimmer"></div>
				<div className="h-8 w-16 bg-destructive/20 rounded loading-shimmer"></div>
			</div>
		</div>

		{/* Desktop Table Skeleton */}
		<div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
			<table className="min-w-full divide-y divide-border">
				<thead className="bg-muted/50">
					<tr>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12"></th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[30%]">Video</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Visibility</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Restrictions</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Date ↓</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Views</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Comments</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Likes (vs dislikes)</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{[...Array(6)].map((_, idx) => (
						<tr key={idx} className="hover:bg-muted/50 transition-colors">
							<td className="px-4 py-3 whitespace-nowrap">
								<div className="h-4 w-4 rounded border border-gray-300 bg-gray-100 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap flex items-center gap-3">
								<div className="w-20 h-12 sm:w-24 sm:h-14 bg-gray-200 dark:bg-gray-700 rounded-md aspect-video loading-shimmer"></div>
								<div className="space-y-2">
									<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 sm:w-48 loading-shimmer"></div>
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 loading-shimmer"></div>
								</div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 loading-shimmer"></div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>

		{/* Mobile Cards Skeleton */}
		<div className="md:hidden space-y-4">
			{[...Array(4)].map((_, idx) => (
				<div key={idx} className="border rounded-lg p-4 shadow-sm loading-shimmer">
					<div className="flex items-start gap-3">
						<div className="mt-1 h-4 w-4 rounded border border-gray-300 bg-gray-100 loading-shimmer"></div>
						<div className="w-full space-y-3">
							<div className="flex gap-2">
								<div className="h-12 w-20 bg-gray-200 dark:bg-gray-700 rounded-md aspect-video loading-shimmer"></div>
								<div className="flex-1 space-y-2 min-w-0">
									<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 loading-shimmer"></div>
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 loading-shimmer"></div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer"></div>
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer"></div>
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer"></div>
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer"></div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

const ErrorState = ({ message }: { message: string }) => (
	<div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
		<p className="text-base sm:text-lg text-red-500">{message}</p>
	</div>
);

const EmptyState = ({ onUpload }: { onUpload: () => void }) => (
	<div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12">
		<div className="w-full max-w-md text-center">
			<div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-6">
				<svg viewBox="0 0 200 200" className="text-blue-400" fill="currentColor">
					<path d="M80 40c-11 0-20 9-20 20v80c0 11 9 20 20 20h40c11 0 20-9 20-20V60c0-11-9-20-20-20H80zm0 20h40v80H80V60z" />
					<rect x="50" y="80" width="40" height="60" />
					<path d="M140 100c11 0 20-9 20-20s-9-20-20-20-20 9-20 20 9 20 20 20z" />
				</svg>
			</div>
			<p className="text-base sm:text-lg md:text-xl mb-6">No content available</p>
			<Button onClick={onUpload} className="flex items-center gap-2 text-xs sm:text-sm px-4 py-2" variant="secondary" aria-label="Upload videos">
				<Upload className="w-4 h-4" />
				Upload videos
			</Button>
		</div>
	</div>
);

const VideoTable = ({
	videos,
	selectedVideos,
	onSelectVideo,
}: {
	videos: Video[];
	selectedVideos: string[];
	onSelectVideo: (id: string, checked: boolean) => void;
}) => {
	const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

	const navigate = useNavigate();

	return (
		<div className="hidden md:block overflow-x-auto border rounded-lg  transform md:translate-x-0 [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 shadow-sm">
			<table className="min-w-full divide-y divide-border">
				{/* Table Head */}
				<thead className="bg-muted/50">
					<tr>
						<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">
							<input
								type="checkbox"
								className="rounded border-gray-300 focus:ring-primary h-4 w-4"
								aria-label="Select all videos"
								checked={videos.length > 0 && selectedVideos.length === videos.length}
								onChange={(e) => videos.forEach((video) => onSelectVideo(video.id, e.target.checked))}
							/>
						</th>
						<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[30%]">Video</th>
						<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">
							Visibility
						</th>
						<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">
							Restrictions
						</th>
						<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Date ↓</th>
						<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Views</th>
						<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">
							Comments
						</th>
						<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">
							Likes (vs dislikes)
						</th>
					</tr>
				</thead>

				{/* Table Body */}
				{/* <tbody className="divide-y divide-border">
					{videos.map((video) => (
						<tr
							key={video.id}
							className="hover:bg-muted/50 transition-colors h-[110x]"
							onMouseEnter={() => setHoveredRowId(video.id)}
							onMouseLeave={() => setHoveredRowId(null)}
						>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
								<input
									type="checkbox"
									className="rounded border-gray-300 focus:ring-primary h-4 w-4"
									aria-label={`Select video ${video.title}`}
									checked={selectedVideos.includes(video.id)}
									onChange={(e) => onSelectVideo(video.id, e.target.checked)}
								/>
							</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap flex items-start gap-3">
								<img src={video.thumbnail} alt={video.title} className="w-32 h-[75px] object-cover rounded-md aspect-video" />
								<div className="min-w-0 flex flex-col justify-between">
									<div>
										<p className="font-medium text-sm sm:text-base truncate max-w-[200px] sm:max-w-[200px]">{video.title}</p>
										<p className="text-xs sm:text-sm text-muted-foreground truncate">{video.channelName}</p>
									</div>
									Icons with Tooltip - Only Show on Row Hover
									{hoveredRowId === video.id && (
										<TooltipProvider>
											<div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
												<Tooltip>
													<TooltipTrigger asChild>
														<div
															className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer"
															onClick={() => navigate(`/studio/edit/${video.id}`)}
														>
															<FaPencilAlt className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Edit Video</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
															<MdOutlineInsertChart className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Analytics</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
															<MdOutlineChat className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Comments</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
															<LucideYoutube className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Share on YouTube</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
															<SlOptionsVertical className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>More Options</p>
													</TooltipContent>
												</Tooltip>
											</div>
										</TooltipProvider>
									)}
								</div>
							</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">{video.visibility}</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">None</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">{formatDateToDDMMYYYY(video.timestamp)}</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">{video.views}</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">0</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">0 / 0</td>
						</tr>
					))}
				</tbody> */}

				<tbody className="divide-y divide-border">
					{videos.map((video) => (
						<tr
							key={video.id}
							className="hover:bg-muted/50 transition-colors h-[110px]"
							onMouseEnter={() => setHoveredRowId(video.id)}
							onMouseLeave={() => setHoveredRowId(null)}
						>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap w-[5%]">
								<input
									type="checkbox"
									className="rounded border-gray-300 focus:ring-primary h-4 w-4"
									aria-label={`Select video ${video.title}`}
									checked={selectedVideos.includes(video.id)}
									onChange={(e) => onSelectVideo(video.id, e.target.checked)}
								/>
							</td>
							<td className="w-[35%]">
								<div className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap flex items-start gap-3">
									<img src={video.thumbnail} alt={video.title} className="w-32 h-[75px] object-cover rounded-md aspect-video" />
									<div className="min-w-0 flex flex-col justify-between">
										<div>
											<p className="font-medium text-sm sm:text-base truncate max-w-[200px] sm:max-w-[200px]">{video.title}</p>
											<p className="text-xs sm:text-sm text-muted-foreground truncate">{video.channelName}</p>
										</div>

										{/* Icons with Tooltip - Only Show on Row Hover */}
										{hoveredRowId === video.id && (
											<div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mt-2">
												<Tooltip>
													<TooltipTrigger asChild>
														<div
															className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer"
															onClick={() => navigate(`/studio/edit/${video.id}`)}
														>
															<FaPencilAlt className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Edit Video</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
															<MdOutlineInsertChart className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Analytics</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
															<MdOutlineChat className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Comments</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
															<LucideYoutube className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Share on YouTube</p>
													</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
															<SlOptionsVertical className="h-4 w-4 hover:text-primary transition-colors" />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>More Options</p>
													</TooltipContent>
												</Tooltip>
											</div>
										)}
									</div>
								</div>
							</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm w-[10%]">{video.visibility}</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm w-[10%]">None</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm w-[10%]">{formatDateToDDMMYYYY(video.timestamp)}</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm w-[10%]">{video.views}</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm w-[10%]">{video.commentCount}</td>
							<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm w-[10%]">0 / 0</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const VideoCard = ({
	video,
	isSelected,
	onSelectVideo,
}: {
	video: Video;
	isSelected: boolean;
	onSelectVideo: (id: string, checked: boolean) => void;
}) => {
	const [showIcons, setShowIcons] = useState(false);
	const navigate = useNavigate();

	return (
		<div
			className="border rounded-lg p-4 hover:bg-muted/50 transition-colors shadow-sm"
			onMouseEnter={() => setShowIcons(true)}
			onMouseLeave={() => setShowIcons(false)}
		>
			<div className="flex items-start gap-3">
				<input
					type="checkbox"
					className="rounded border-gray-300 focus:ring-primary h-4 w-4 mt-1"
					aria-label={`Select video ${video.title}`}
					checked={isSelected}
					onChange={(e) => onSelectVideo(video.id, e.target.checked)}
				/>
				<img src={video.thumbnail} alt={video.title} className="w-20 h-12 sm:w-24 sm:h-14 object-cover rounded-md aspect-video" />
				<div className="flex-1 min-w-0">
					<p className="font-medium text-sm sm:text-base truncate">{video.title}</p>
					<p className="text-xs sm:text-sm text-muted-foreground truncate">{video.channelName}</p>
				</div>
			</div>

			{showIcons && (
				<TooltipProvider>
					<div className="mt-3 flex items-center gap-4">
						<Tooltip>
							<TooltipTrigger asChild>
								<div
									className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer"
									onClick={() => navigate(`/studio/edit/${video.id}`)}
								>
									<FaPencilAlt className="h-4 w-4 hover:text-primary transition-colors" />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Edit Video</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
									<MdOutlineInsertChart className="h-4 w-4 hover:text-primary transition-colors" />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Analytics</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
									<MdOutlineChat className="h-4 w-4 hover:text-primary transition-colors" />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Comments</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
									<a href={`${FRONTEND_URL}/video/${video.id}`}>
										<LucideYoutube className="h-4 w-4 hover:text-primary transition-colors" />
									</a>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>view on YouTube</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
									<SlOptionsVertical className="h-4 w-4 hover:text-primary transition-colors" />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>More Options</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>
			)}

			<div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
				<div>
					<span className="font-medium">Date:</span> {formatDateToDDMMYYYY(video.timestamp)}
				</div>
				<div>
					<span className="font-medium">Views:</span> {video.views}
				</div>
				<div>
					<span className="font-medium">Visibility:</span> {video.visibility}
				</div>
				<div>
					<span className="font-medium">Restrictions:</span> None
				</div>
				<div>
					<span className="font-medium">Comments:</span> {video.commentCount}
				</div>
				<div>
					<span className="font-medium">Likes:</span> 0 / 0
				</div>
			</div>
		</div>
	);
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
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to fetch videos or user info");
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

	// const handleDeleteSelected = async () => {
	// 	try {
	// 		const token = localStorage.getItem("accessToken");
	// 		await Promise.all(
	// 			selectedVideos.map((id) =>
	// 				axios.delete(`${apiurl}/videos/${id}`, {
	// 					headers: { Authorization: `Bearer ${token}` },
	// 				})
	// 			)
	// 		);
	// 		const updatedVideos = videos.filter((video) => !selectedVideos.includes(video.id));
	// 		setVideos(updatedVideos);
	// 		setFilteredVideos(filterVideos(updatedVideos, filter));
	// 		setSelectedVideos([]);
	// 		setIsDeleteDialogOpen(false);
	// 	} catch (err: any) {
	// 		setError(err.response?.data?.message || "Failed to delete videos");
	// 		setIsDeleteDialogOpen(false);
	// 	}
	// };

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
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to delete videos");
			setIsDeleteDialogOpen(false);
		}
	};

	const handleFilterSelect = (value: FilterOption) => {
		setFilter(value);
	};

	if (loading) return <LoadingState />;
	if (error) return <ErrorState message={error} />;
	if (!videos.length) return <EmptyState onUpload={() => navigate("/upload")} />;

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
			<VideoTable videos={filteredVideos} selectedVideos={selectedVideos} onSelectVideo={handleSelectVideo} />
			<div className="md:hidden space-y-4">
				{filteredVideos.map((video) => (
					<VideoCard key={video.id} video={video} isSelected={selectedVideos.includes(video.id)} onSelectVideo={handleSelectVideo} />
				))}
			</div>
		</div>
	);
};

export default VideosTab;
