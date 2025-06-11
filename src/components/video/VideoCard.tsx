import { Link } from "react-router-dom";
import { formatViewCount, getRelativeTime } from "@/utils/helper";
import axios from "axios";
import { apiurl } from "@/constants";
import { useState } from "react";

interface VideoCardProps {
	id: string;
	thumbnail: string;
	title: string;
	channelName?: string;
	handle: string;
	channelAvatar: string;
	views: number;
	timestamp: string;
	duration: string;
	compact?: boolean;
}

const VideoCard = ({
	id,
	thumbnail,
	title,
	channelName = "Unknown Channel",
	handle,
	channelAvatar,
	views,
	timestamp,
	duration,
	compact = false,
}: VideoCardProps) => {
	const [viewCount, setViewCount] = useState<number>(Number(views));

	const incrementView = async () => {
		setViewCount((prev) => prev + 1); // Optimistic UI
		try {
			await axios.post(`${apiurl}/videos/${id}/increment-view`);
		} catch (e) {
			// Optionally: revert UI or show error
		}
	};

	return compact ? (
		// Mobile layout
		<div className="hover-grow flex gap-2">
			<Link to={`/video/${id}`} className="block flex-shrink-0 w-40 h-22" onClick={incrementView}>
				<div className="relative">
					<img src={thumbnail} alt={title} className="w-full h-full max-h-22 object-cover rounded-lg" />
					<span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">{duration}</span>
				</div>
			</Link>
			<div className="flex flex-col flex-1 min-w-0">
				<Link to={`/video/${id}`} onClick={incrementView}>
					<h3 className="font-medium text-sm line-clamp-2 hover:text-red-600 transition-colors duration-200">{title}</h3>
				</Link>
				<Link to={`/channel/${handle}`} className="text-xs text-gray-500 mt-1 hover:text-gray-700">
					{channelName}
				</Link>
				<div className="text-xs text-gray-500">
					{formatViewCount(viewCount)} views • {getRelativeTime(timestamp)}
				</div>
			</div>
		</div>
	) : (
		// Desktop layout
		<div className="hover-grow">
			<Link to={`/video/${id}`} className="block" onClick={incrementView}>
				<div className="relative overflow-hidden rounded-xl">
					<img src={thumbnail} alt={title} className="w-full h-[180px] object-cover transition-all duration-300 hover:scale-105" />
					<span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">{duration}</span>
				</div>
			</Link>
			<div className="flex gap-3 mt-3">
				<Link to={`/channel/${handle}`} className="transition-transform duration-200 hover:scale-110">
					<img src={channelAvatar} alt={channelName} className="w-9 h-9 rounded-full object-cover" />
				</Link>
				<div>
					<Link to={`/video/${id}`} onClick={incrementView}>
						<h3 className="font-medium line-clamp-2 hover:text-red-600 transition-colors duration-200">{title}</h3>
					</Link>
					<Link to={`/channels/@${handle}`} className="text-sm text-gray-500 mt-1 hover:text-gray-700 transition-colors duration-200 block">
						{channelName}
					</Link>
					<div className="text-sm text-gray-500">
						{formatViewCount(viewCount)} views • {getRelativeTime(timestamp)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
