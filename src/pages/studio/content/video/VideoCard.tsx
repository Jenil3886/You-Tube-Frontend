import { formatDateToDDMMYYYY } from "@/utils/helper";
import { Video } from "@/hooks/useVideos";

const VideoCard = ({
	video,
	isSelected,
	onSelectVideo,
}: {
	video: Video;
	isSelected: boolean;
	onSelectVideo: (id: string, checked: boolean) => void;
}) => (
	<div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors shadow-sm">
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
				<span className="font-medium">Comments:</span> 0
			</div>
			<div>
				<span className="font-medium">Likes:</span> 0 / 0
			</div>
		</div>
	</div>
);

export default VideoCard;
