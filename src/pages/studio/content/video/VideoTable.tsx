import { formatDateToDDMMYYYY } from "@/utils/helper";
import { Video } from "@/hooks/useVideos";

const VideoTable = ({
	videos,
	selectedVideos,
	onSelectVideo,
}: {
	videos: Video[];
	selectedVideos: string[];
	onSelectVideo: (id: string, checked: boolean) => void;
}) => (
	<div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
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
					<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Comments</th>
					<th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">
						Likes (vs dislikes)
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-border">
				{videos.map((video) => (
					<tr key={video.id} className="hover:bg-muted/50 transition-colors">
						<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
							<input
								type="checkbox"
								className="rounded border-gray-300 focus:ring-primary h-4 w-4"
								aria-label={`Select video ${video.title}`}
								checked={selectedVideos.includes(video.id)}
								onChange={(e) => onSelectVideo(video.id, e.target.checked)}
							/>
						</td>
						<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap flex items-center gap-3">
							<img src={video.thumbnail} alt={video.title} className="w-16 h-9 sm:w-20 sm:h-12 object-cover rounded-md aspect-video" />
							<div className="min-w-0">
								<p className="font-medium text-sm sm:text-base truncate max-w-[200px] sm:max-w-[300px]">{video.title}</p>
								<p className="text-xs sm:text-sm text-muted-foreground truncate">{video.channelName}</p>
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
			</tbody>
		</table>
	</div>
);

export default VideoTable;
