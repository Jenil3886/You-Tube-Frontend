// import { getRelativeTime } from "@/utils/helper";
// import { Link } from "react-router-dom";

// interface VideoCardProps {
// 	id: string;
// 	thumbnail: string;
// 	title: string;
// 	channelName?: string;
// 	channelAvatar: string;
// 	views: string;
// 	timestamp: string;
// 	duration: string;
// 	compact?: boolean;
// }

// const VideoCard = ({ id, thumbnail, title, channelName, channelAvatar, views, timestamp, duration, compact = false }: VideoCardProps) => {
// 	return compact ? (
// 		// Mobile/compact layout
// 		<div className="hover-grow flex gap-2">
// 			<Link to={`/video/${id}`} className="block flex-shrink-0 w-40 h-22">
// 				<div className="relative">
// 					<img src={thumbnail} alt={title} className="w-full h-full max-h-22 object-cover rounded-lg transition-all-medium" />
// 					<span className="video-duration">{duration}</span>
// 				</div>
// 			</Link>
// 			<div className="flex flex-col flex-1 min-w-0">
// 				<Link to={`/video/${id}`}>
// 					<h3 className="font-medium text-sm line-clamp-2 transition-colors duration-200 hover:text-youtube-red">{title}</h3>
// 				</Link>

// 				<Link
// 					to={`/channel/${channelName.toLowerCase().replace(/\s+/g, "")}`}
// 					className="text-xs text-muted-foreground mt-1 hover:text-foreground transition-colors duration-200"
// 				>
// 					{channelName}
// 				</Link>
// 				<div className="text-xs text-muted-foreground">
// 					{views} views • {getRelativeTime(timestamp)}
// 				</div>
// 			</div>
// 		</div>
// 	) : (
// 		// Desktop layout
// 		<div className="hover-grow">
// 			<Link to={`/video/${id}`} className="block">
// 				<div className="relative overflow-hidden rounded-xl">
// 					<img src={thumbnail} alt={title} className="w-full h-[180px] object-cover transition-all duration-300 hover:scale-105" />
// 					<span className="video-duration">{duration}</span>
// 				</div>
// 			</Link>
// 			<div className="flex gap-3 mt-3">
// 				<Link to={`/channel/${channelName.toLowerCase().replace(/\s+/g, "")}`} className="transition-transform duration-200 hover:scale-110">
// 					<img src={channelAvatar} alt={channelName || "Channel"} className="w-9 h-9 rounded-full" />
// 				</Link>
// 				<div>
// 					<Link to={`/video/${id}`}>
// 						<h3 className="font-medium line-clamp-2 transition-colors duration-200 hover:text-youtube-red">{title}</h3>
// 					</Link>
// 					<Link
// 						to={`/channel/${channelName?.toLowerCase().replace(/\s+/g, "") || ""}`}
// 						className="text-sm text-muted-foreground mt-1 hover:text-foreground transition-colors duration-200"
// 					>
// 						{channelName || "Unknown Channel"}
// 					</Link>
// 					<div className="text-sm text-muted-foreground">
// 						{views} views • {timestamp}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default VideoCard;

// import { formatViewCount } from "@/utils/helper";
// import { Link } from "react-router-dom";

// interface VideoCardProps {
// 	id: string;
// 	thumbnail: string;
// 	title: string;
// 	channelName?: string;
// 	handle: string;
// 	channelAvatar: string;
// 	views: string;
// 	timestamp: string;
// 	duration: string;
// 	compact?: boolean;
// }

// // Helper function to convert timestamp to relative time
// const getRelativeTime = (dateString: string): string => {
// 	const inputDate = new Date(dateString);
// 	const now = new Date();

// 	const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

// 	const intervals: { [key: string]: number } = {
// 		year: 31536000,
// 		month: 2592000,
// 		day: 86400,
// 		hour: 3600,
// 		minute: 60,
// 	};

// 	for (const [unit, secondsInUnit] of Object.entries(intervals)) {
// 		const count = Math.floor(diffInSeconds / secondsInUnit);
// 		if (count >= 1) {
// 			return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
// 		}
// 	}

// 	return "Just now";
// };

// const VideoCard = ({
// 	id,
// 	thumbnail,
// 	title,
// 	channelName = "Unknown Channel",
// 	handle,
// 	channelAvatar,
// 	views,
// 	timestamp,
// 	duration,
// 	compact = false,
// }: VideoCardProps) => {
// 	return compact ? (
// 		// Mobile/compact layout
// 		<div className="hover-grow flex gap-2">
// 			<Link to={`/video/${id}`} className="block flex-shrink-0 w-40 h-22">
// 				<div className="relative">
// 					<img src={thumbnail} alt={title} className="w-full h-full max-h-22 object-cover rounded-lg transition-all duration-300" />
// 					<span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded"> {duration}</span>
// 				</div>
// 			</Link>
// 			<div className="flex flex-col flex-1 min-w-0">
// 				<Link to={`/video/${id}`}>
// 					<h3 className="font-medium text-sm line-clamp-2 hover:text-red-600 transition-colors duration-200">{title}</h3>
// 				</Link>

// 				<Link
// 					to={`/channel/${channelName.toLowerCase().replace(/\s+/g, "")}`}
// 					className="text-xs text-gray-500 mt-1 hover:text-gray-700 transition-colors duration-200"
// 				>
// 					{channelName}
// 				</Link>
// 				<div className="text-xs text-gray-500">
// 					{views} views • {getRelativeTime(timestamp)}
// 				</div>
// 			</div>
// 		</div>
// 	) : (
// 		// Desktop layout
// 		<div className="hover-grow">
// 			<Link to={`/video/${id}`} className="block">
// 				<div className="relative overflow-hidden rounded-xl">
// 					<img src={thumbnail} alt={title} className="w-full h-[180px] object-cover transition-all duration-300 hover:scale-105" />
// 					<span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">{duration}</span>
// 				</div>
// 			</Link>
// 			<div className="flex gap-3 mt-3">
// 				<Link to={`/channel/${channelName.toLowerCase().replace(/\s+/g, "")}`} className="transition-transform duration-200 hover:scale-110">
// 					<img src={channelAvatar} alt={channelName} className="w-9 h-9 rounded-full object-cover" />
// 				</Link>
// 				<div>
// 					<Link to={`/video/${id}`}>
// 						<h3 className="font-medium line-clamp-2 hover:text-red-600 transition-colors duration-200">{title}</h3>
// 					</Link>

// 					<Link to={`/channels/@${handle}`} className="text-sm text-gray-500 mt-1 hover:text-gray-700 transition-colors duration-200 block">
// 						{channelName}
// 					</Link>
// 					<div className="text-sm text-gray-500">
// 						{formatViewCount(views)} views • {getRelativeTime(timestamp)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default VideoCard;

import { Link } from "react-router-dom";
import { formatViewCount, getRelativeTime } from "@/utils/helper";
import { ThumbsUp } from "lucide-react";

interface VideoCardProps {
	id: string;
	thumbnail: string;
	title: string;
	channelName?: string;
	handle: string;
	channelAvatar: string;
	views: string;
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
	return compact ? (
		// Mobile layout
		<div className="hover-grow flex gap-2">
			<Link to={`/video/${id}`} className="block flex-shrink-0 w-40 h-22">
				<div className="relative">
					<img src={thumbnail} alt={title} className="w-full h-full max-h-22 object-cover rounded-lg" />
					<span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">{duration}</span>
				</div>
			</Link>
			<div className="flex flex-col flex-1 min-w-0">
				<Link to={`/video/${id}`}>
					<h3 className="font-medium text-sm line-clamp-2 hover:text-red-600 transition-colors duration-200">{title}</h3>
				</Link>
				<Link to={`/channel/${handle}`} className="text-xs text-gray-500 mt-1 hover:text-gray-700">
					{channelName}
				</Link>
				<div className="text-xs text-gray-500">
					{formatViewCount(views)} views • {getRelativeTime(timestamp)}
				</div>
			</div>
		</div>
	) : (
		// Desktop layout
		<div className="hover-grow">
			<Link to={`/video/${id}`} className="block">
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
					<Link to={`/video/${id}`}>
						<h3 className="font-medium line-clamp-2 hover:text-red-600 transition-colors duration-200">{title}</h3>
					</Link>
					<Link to={`/channels/@${handle}`} className="text-sm text-gray-500 mt-1 hover:text-gray-700 block">
						{channelName}
					</Link>
					<div className="text-sm text-gray-500">
						{formatViewCount(views)} views • {getRelativeTime(timestamp)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
