import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UploadingVideoRow from "@/components/video/UploadingVideoRow";
import { formatDateToDDMMYYYY } from "@/utils/helper";
import { LucideYoutube } from "lucide-react";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineChat, MdOutlineInsertChart } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

interface VideoTableProps {
	videos: any[];
	selectedVideos: string[];
	onSelectVideo: (id: string, checked: boolean) => void;
	uploadingCount?: number;
}

const VideoTable = ({ videos, selectedVideos, onSelectVideo, uploadingCount = 0 }: VideoTableProps) => {
	const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

	const navigate = useNavigate();

	return (
		<div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm transform md:translate-x-0 [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600">
			<table className="min-w-full divide-y divide-border">
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
				<tbody className="divide-y divide-border">
					{uploadingCount > 0 && Array.from({ length: uploadingCount }).map((_, i) => <UploadingVideoRow key={`uploading-row-${i}`} />)}
					{videos.map((video) => (
						<tr
							key={video.id}
							onMouseEnter={() => setHoveredRowId(video.id)}
							onMouseLeave={() => setHoveredRowId(null)}
							className="hover:bg-muted/50 transition-colors h-[110px]"
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

export default VideoTable;
