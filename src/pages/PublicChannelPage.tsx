// PublicChannelPage.tsx
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import VideoGrid from "@/components/video/VideoGrid";
import { apiurl } from "@/constants";
import { Channel, Video } from "@/types";

const PublicChannelPage = () => {
	const { handle } = useParams<{ handle: string }>();
	console.log("PublicChannelPage mounted with handle:", handle);
	const [channel, setChannel] = useState<Channel | null>(null);
	const [videos, setVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		console.log("PublicChannelPage mounted");
		console.log("Handle from params:", handle);

		if (!handle) {
			return;
		}

		const fetchChannelAndVideos = async () => {
			try {
				setLoading(true);

				const response = await axios.get(`${apiurl}/channels/${handle}`);
				console.log("API Response:", response.data);

				const fetchedChannel = response.data.data;
				console.log("Fetched Channel:", fetchedChannel);
				setChannel(fetchedChannel);

				// Fetch videos for the channel
				const videosResponse = await axios.get(`${apiurl}/videos?channelId=${fetchedChannel.id}`);
				console.log("Videos Response:", videosResponse.data);

				// Filter videos to only include those where the channel handle matches the provided handle
				const filteredVideos = (videosResponse.data.data.rows || []).filter((video) => video.channel?.id === fetchedChannel.id);
				console.log("Filtered Videos:", filteredVideos);

				setVideos(filteredVideos);
			} catch (err) {
				console.error("Error fetching channel data", err.response?.data || err.message);
				setError("Channel not found ");
			} finally {
				setLoading(false);
			}
		};

		if (handle) fetchChannelAndVideos();
	}, [handle]);

	if (loading) return <div className="text-center py-10">Loading channel...</div>;
	if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
	if (!channel) return <div className="text-center py-10">Channel not found</div>;

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Channel Header */}
			<div className="relative mb-6">
				{/* Banner */}
				<div className="w-full h-40 md:h-60 bg-gray-300 rounded-lg overflow-hidden relative">
					{channel.channelBanner ? (
						<img src={channel.channelBanner} alt={`${channel.name} banner`} className="w-full h-full object-cover" />
					) : (
						<div className="bg-gradient-to-r from-blue-400 to-purple-600 w-full h-full"></div>
					)}
				</div>

				{/* Avatar + Name */}
				<div className="flex items-center gap-4 mt-4">
					<img src={channel.profilePicture || "/default-avatar.png"} alt={channel.name} className="w-20 h-20 rounded-full border-4 border-white" />
					<div>
						<h1 className="text-2xl font-bold">{channel.name}</h1>
						<p className="text-sm text-gray-600">
							{videos.length} videos • Joined {new Date(channel.createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>
			</div>

			{/* Description */}
			{channel.description && (
				<div className="mb-8">
					<h2 className="text-lg font-semibold mb-2">About</h2>
					<p className="text-gray-700">{channel.description}</p>
				</div>
			)}

			{/* Videos Section */}
			<h2 className="text-xl font-semibold mb-4">Videos</h2>
			<VideoGrid videos={videos} />
		</div>
	);
};

export default PublicChannelPage;
