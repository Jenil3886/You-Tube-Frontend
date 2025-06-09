import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { LucideYoutube } from "lucide-react";
import { MdOutlineChat, MdOutlineInsertChart } from "react-icons/md";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FRONTEND_URL } from "@/constants";
import { formatDateToDDMMYYYY } from "@/utils/helper";
import UploadingVideoCard from "@/components/video/UploadingVideoCard";

interface VideoCardProps {
	video: any;
	isSelected: boolean;
	onSelectVideo: (id: string, checked: boolean) => void;
}

const VideoCard = ({ video, isSelected, onSelectVideo }: VideoCardProps) => {
	const [showIcons, setShowIcons] = useState(false);
	const navigate = useNavigate();
	if (video.isTemporary) {
		return <UploadingVideoCard progress={video.progress} />;
	}
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
								<p>View on YouTube</p>
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

export default VideoCard;
