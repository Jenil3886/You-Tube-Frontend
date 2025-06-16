import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react";
import { VideoInfoProps } from "@/types";
import { formatViewCount } from "@/utils/helper";

export const VideoInfo: React.FC<VideoInfoProps> = ({
	video,
	isSubscribed,
	handleSubscribe,
	isLiked,
	likeCount,
	handleLike,
	showFullDescription,
	setShowFullDescription,
}) => (
	<>
		<h1 className="text-xl font-bold mt-4">{video.title}</h1>
		<div className="flex flex-wrap justify-between items-center mt-4">
			<div className="flex items-center gap-4">
				<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
				<div>
					<h3>{video.channelName}</h3>
					<span className="text-sm text-gray-500">{video.subscribers} subscribers</span>
				</div>
				<Button variant={isSubscribed ? "outline" : "default"} onClick={handleSubscribe}>
					{isSubscribed ? "Subscribed" : "Subscribe"}
				</Button>
			</div>
			<div className="flex gap-2 mt-4 sm:mt-0">
				<div className="flex rounded-full overflow-hidden border">
					<Button variant="ghost" className="rounded-r-none border-r" onClick={handleLike}>
						<ThumbsUp size={18} className="mr-2" fill={isLiked ? "blue" : "none"} stroke={isLiked ? "blue" : "currentColor"} />
						{likeCount}
					</Button>
					<Button variant="ghost" className="rounded-l-none">
						<ThumbsDown size={18} />
					</Button>
				</div>
				<Button variant="outline" className="rounded-full">
					<Share size={18} className="mr-2" />
					Share
				</Button>
				<Button variant="outline" className="rounded-full">
					<Download size={18} className="mr-2" />
					Download
				</Button>
				<Button variant="outline" size="icon" className="rounded-full">
					<MoreHorizontal size={18} />
				</Button>
			</div>
		</div>
		<div className="bg-secondary text-white rounded-xl my-2 p-4">
			<div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
				<span>{formatViewCount(video.views)} views</span>
				<span>• {video.timestamp}</span>
			</div>
			<div className="mt-2 space-y-1">
				<p className={`whitespace-pre-line ${showFullDescription ? "" : "line-clamp-3"}`}>{video.description}</p>
				<button className="text-blue-400 font-medium mt-1" onClick={() => setShowFullDescription(!showFullDescription)}>
					{showFullDescription ? "Show less" : "Show more"}
				</button>
			</div>
		</div>
	</>
);
