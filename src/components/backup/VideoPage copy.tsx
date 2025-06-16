import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import axios from "axios";
import { apiurl } from "@/constants";
import { getRelativeTime } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Share, Download, MoreHorizontal, ThumbsDown } from "lucide-react";

const VideoPage = () => {
	const { videoId } = useParams();
	const [video, setVideo] = useState<any>(null);
	const [isSubscribed, setIsSubscribed] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	// Fetch video data
	useEffect(() => {
		const fetchVideo = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				const response = await axios.get(`${apiurl}/videos/${videoId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const v = response.data.data;

				setVideo({
					id: v.id,
					thumbnail: v.thumbnail,
					videoUrl: v.videoFile,
					title: v.title,
					channelId: v.channel?.id,
					channelName: v.channel?.name || "Unknown Channel",
					channelAvatar: v.channel?.profilePicture || "/default-avatar.png",
					subscribers: v.channel?.subscriberCount?.toLocaleString() || "",
					views: v.views?.toLocaleString() || "0",
					timestamp: v.createdAt,
					likes: v.likes?.toLocaleString() || "0",
					description: v.description,
				});

				setIsSubscribed(v.channel?.isSubscribed === 1);
			} catch (err) {
				console.error("Error fetching video:", err);
				setVideo(null);
			}
		};

		fetchVideo();
	}, [videoId]);

	// Load HLS video
	useEffect(() => {
		const videoElement = videoRef.current;

		if (!video || !video.videoUrl || !videoElement) return;

		let hls: Hls | null = null;

		if (Hls.isSupported()) {
			hls = new Hls();

			hls.loadSource(video.videoUrl);
			hls.attachMedia(videoElement);

			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				videoElement!.play().catch((err) => {
					console.warn("Autoplay blocked by browser:", err);
				});
			});

			hls.on(Hls.Events.ERROR, (event, data) => {
				console.error("HLS.js error", event, data);
				if (data.fatal) {
					switch (data.type) {
						case Hls.ErrorTypes.NETWORK_ERROR:
							console.log("Network error - retrying manifest load");
							hls!.startLoad();
							break;
						case Hls.ErrorTypes.MEDIA_ERROR:
							console.warn("Media error, trying to recover...");
							hls!.recoverMediaError();
							break;
						default:
							hls!.destroy();
							break;
					}
				}
			});
		} else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
			// Safari native support
			videoElement.src = video.videoUrl;
			videoElement.addEventListener("loadedmetadata", () => {
				videoElement!.play().catch((err) => {
					console.warn("Safari autoplay blocked:", err);
				});
			});
		}

		return () => {
			if (hls && Hls.isSupported()) {
				hls.destroy();
			}
		};
	}, [video]);

	const handleSubscribe = async (isSubscribing: boolean) => {
		try {
			if (isSubscribing) {
				await axios.post(`${apiurl}/subscriptions/c/${video.channelId}`);
			} else {
				await axios.delete(`${apiurl}/subscriptions/c/${video.channelId}`);
			}
			setIsSubscribed(!isSubscribed);
		} catch (error) {
			console.error("Subscription failed", error);
		}
	};

	if (!video) {
		return <div>Loading...</div>;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div className="lg:col-span-2">
				{/* Video Player */}
				<div className="aspect-video bg-black w-full rounded-xl overflow-hidden">
					<video ref={videoRef} controls muted poster={video.thumbnail} className="w-full h-full">
						Your browser does not support the video tag.
					</video>
				</div>

				{/* Video Info */}
				<h1 className="text-xl font-bold mt-4">{video.title}</h1>
				<div className="flex flex-wrap justify-between items-center mt-4">
					<div className="flex items-center gap-4">
						<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
						<div>
							<h3>{video.channelName}</h3>
							<span className="text-sm text-gray-500">{video.subscribers} subscribers</span>
						</div>
						<Button variant={isSubscribed ? "outline" : "default"} onClick={() => handleSubscribe(!isSubscribed)}>
							{isSubscribed ? "Subscribed" : "Subscribe"}
						</Button>
					</div>
					<div className="flex gap-2 mt-4 sm:mt-0">
						<div className="flex rounded-full overflow-hidden border">
							<Button variant="ghost" className="rounded-r-none border-r">
								<ThumbsUp size={18} className="mr-2" />
								{video.likes}
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

				{/* Description */}
				<div className="bg-secondary/50 rounded-xl p-4 mt-4">
					<div className="flex gap-2">
						<span className="font-medium">{video.views} views</span>
						<span className="font-medium">{getRelativeTime(video.timestamp)}</span>
					</div>
					<p className="mt-2 whitespace-pre-line">{video.description}</p>
				</div>
			</div>

			{/* Related Videos Sidebar */}
			<div className="space-y-4">
				<h3 className="text-lg font-medium">Related Videos</h3>
				<p>No related videos yet.</p>
			</div>
		</div>
	);
};

export default VideoPage;
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react";
// import VideoSkeleton from "@/components/skeleton/video";
// import axios from "axios";
// import { apiurl } from "@/constants";
// import { SubscriptionDropdown } from "@/components/dropdowns";
// import Hls from "hls.js";

// const VideoPage = () => {
// 	const { videoId } = useParams();
// 	const [video, setVideo] = useState<any>(null);
// 	const [isSubscribed, setIsSubscribed] = useState(false);
// 	const [commentText, setCommentText] = useState("");
// 	const relatedVideos: any[] = [];

// 	useEffect(() => {
// 		const fetchVideo = async () => {
// 			try {
// 				const response = await axios.get(`${apiurl}/videos/${videoId}`);
// 				const v = response.data.data;
// 				setVideo({
// 					id: v.id,
// 					thumbnail: v.thumbnail,
// 					videoUrl: v.videoFile,
// 					title: v.title,
// 					channelId: v.channel?.id,
// 					channelName: v.channel?.name || "Unknown Channel",
// 					channelAvatar: v.channel?.profilePicture || "/default-avatar.png",
// 					subscribers: v.channel?.subscriberCount?.toLocaleString() || "",
// 					views: v.views?.toLocaleString() || "0",
// 					timestamp: new Date(v.createdAt).toLocaleDateString(),
// 					likes: v.likes?.toLocaleString() || "0",
// 					description: v.description,
// 					comments: [],
// 				});
// 				setIsSubscribed(v.channel?.isSubscribed === 1);
// 			} catch (err) {
// 				console.error(err);
// 				setVideo(null);
// 			}
// 		};
// 		fetchVideo();
// 	}, [videoId]);

// 	// const handleSubscribe = async () => {
// 	// 	try {
// 	// 		await axios.post(`${apiurl}/subscriptions/c/${video.channelId}`);
// 	// 		setIsSubscribed((prev) => !prev);
// 	// 	} catch (error) {
// 	// 		console.error("Subscription failed", error);
// 	// 	}
// 	// };

// 	const handleSubscribe = async (isSubscribing: boolean) => {
// 		try {
// 			if (isSubscribing) {
// 				await axios.post(`${apiurl}/subscriptions/c/${video.channelId}`);
// 			} else {
// 				await axios.delete(`${apiurl}/subscriptions/c/${video.channelId}`);
// 			}
// 			setIsSubscribed(!isSubscribed);
// 		} catch (error) {
// 			console.error("Subscription failed", error);
// 		}
// 	};

// 	// ...

// 	useEffect(() => {
// 		let hls: Hls;

// 		if (video && video.videoUrl) {
// 			const videoElement = document.getElementById("videoPlayer") as HTMLVideoElement;

// 			if (Hls.isSupported()) {
// 				hls = new Hls();
// 				hls.loadSource(video.videoUrl);
// 				hls.attachMedia(videoElement);
// 				hls.on(Hls.Events.MANIFEST_PARSED, () => videoElement.play());
// 			} else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
// 				// Fallback for Safari (which supports HLS natively)
// 				videoElement.src = video.videoUrl;
// 				videoElement.addEventListener("loadedmetadata", () => videoElement.play());
// 			}
// 		}

// 		return () => {
// 			if (hls) {
// 				hls.destroy();
// 			}
// 		};
// 	}, [video]);

// 	if (!video) {
// 		return <VideoSkeleton />;
// 	}

// 	return (
// 		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// 			<div className="lg:col-span-2">
// 				{/* Video player */}
// 				<div className="aspect-video bg-black w-full rounded-xl overflow-hidden">
// 					{/* <iframe
// 						className="w-full h-full"
// 						src={video.videoUrl}
// 						title={video.title}
// 						frameBorder="0"
// 						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 						allowFullScreen
// 					></iframe> */}

// 					<iframe
// 						className="w-full h-full"
// 						src={video.videoUrl}
// 						title={video.title}
// 						frameBorder="0"
// 						loading="lazy"
// 						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 						allowFullScreen
// 						referrerPolicy="no-referrer-when-downgrade"
// 					></iframe>
// 				</div>

// 				{/* Video info */}
// 				<h1 className="text-xl font-bold mt-4">{video.title}</h1>

// 				<div className="flex flex-wrap justify-between items-center mt-4">
// 					<div className="flex items-center gap-4">
// 						<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
// 						<div>
// 							<h3 className="font-medium">{video.channelName}</h3>
// 							<span className="text-sm text-muted-foreground">{video.subscribers} subscribers</span>
// 						</div>
// 						<Button
// 							variant={isSubscribed ? "outline" : "default"}
// 							className={`rounded-full ${isSubscribed ? "flex gap-2" : ""}`}
// 							onClick={() => handleSubscribe(!isSubscribed)}
// 						>
// 							{isSubscribed ? (
// 								<SubscriptionDropdown
// 									isSubscribed={isSubscribed}
// 									onUnsubscribe={() => handleSubscribe(false)} // Pass unsubscribe logic
// 								/>
// 							) : (
// 								"Subscribe"
// 							)}
// 						</Button>
// 					</div>

// 					<div className="flex gap-2 mt-4 sm:mt-0">
// 						<div className="flex rounded-full overflow-hidden border">
// 							<Button variant="ghost" className="rounded-r-none border-r">
// 								<ThumbsUp size={18} className="mr-2" />
// 								{video.likes}
// 							</Button>
// 							<Button variant="ghost" className="rounded-l-none">
// 								<ThumbsDown size={18} />
// 							</Button>
// 						</div>

// 						<Button variant="outline" className="rounded-full">
// 							<Share size={18} className="mr-2" />
// 							Share
// 						</Button>

// 						<Button variant="outline" className="rounded-full">
// 							<Download size={18} className="mr-2" />
// 							Download
// 						</Button>

// 						<Button variant="outline" size="icon" className="rounded-full">
// 							<MoreHorizontal size={18} />
// 						</Button>
// 					</div>
// 				</div>

// 				{/* Video description */}
// 				<div className="bg-secondary/50 rounded-xl p-4 mt-4">
// 					<div className="flex gap-2">
// 						<span className="font-medium">{video.views} views</span>
// 						<span className="font-medium">{video.timestamp}</span>
// 					</div>
// 					<p className="mt-2 whitespace-pre-line">{video.description}</p>
// 				</div>

// 				{/* Comments */}
// 				<div className="mt-6">
// 					<h3 className="text-lg font-medium mb-4">{video.comments.length} Comments</h3>

// 					{/* Comment input */}
// 					<div className="flex gap-4 mb-6">
// 						<img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Your avatar" className="w-10 h-10 rounded-full" />
// 						<div className="flex-1">
// 							<input
// 								type="text"
// 								placeholder="Add a comment..."
// 								className="w-full bg-transparent border-b border-secondary outline-none pb-2 focus:border-primary"
// 								value={commentText}
// 								onChange={(e) => setCommentText(e.target.value)}
// 							/>

// 							<div className="flex justify-end gap-2 mt-2">
// 								<Button variant="ghost" onClick={() => setCommentText("")}>
// 									Cancel
// 								</Button>
// 								<Button
// 									disabled={!commentText.trim()}
// 									onClick={() => {
// 										console.log("Comment submitted:", commentText);
// 										setCommentText("");
// 									}}
// 								>
// 									Comment
// 								</Button>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Comment list */}
// 					<div className="flex flex-col gap-6">
// 						{video.comments.map((comment: any) => (
// 							<div key={comment.id} className="flex gap-4">
// 								<img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
// 								<div>
// 									<div className="flex items-center gap-2">
// 										<span className="font-medium">{comment.user}</span>
// 										<span className="text-sm text-muted-foreground">{comment.timestamp}</span>
// 									</div>
// 									<p className="mt-1">{comment.text}</p>
// 									<div className="flex items-center gap-2 mt-2">
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											<ThumbsUp size={16} className="mr-2" />
// 											{comment.likes}
// 										</Button>
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											<ThumbsDown size={16} />
// 										</Button>
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											Reply
// 										</Button>
// 									</div>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Related videos */}
// 			<div className="space-y-4">
// 				<h3 className="text-lg font-medium">Related Videos</h3>
// 				{relatedVideos.map((video) => (
// 					<div key={video.id} className="flex gap-2">
// 						<div className="relative flex-shrink-0">
// 							<img src={video.thumbnail} alt={video.title} className="w-40 h-24 object-cover rounded-lg" />
// 							<span className="video-duration">{video.duration}</span>
// 						</div>
// 						<div className="flex-1">
// 							<h4 className="font-medium line-clamp-2 text-sm">{video.title}</h4>
// 							<p className="text-xs text-muted-foreground mt-1">{video.channelName}</p>
// 							<p className="text-xs text-muted-foreground">
// 								{video.views} views • {video.timestamp}
// 							</p>
// 						</div>
// 					</div>https://res.cloudinary.com/dldr5bnyz/raw/upload/v1748062188/hls_videos/95662bc1-1cba-4bd5-b231-4921c655ad62/qvklx1m1mrrafco4xl4v.m3u8
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default VideoPage;

// import { useParams } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { apiurl } from "@/constants";
// import { Button } from "@/components/ui/button";
// import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react";
// import { SubscriptionDropdown } from "@/components/dropdowns";
// import VideoSkeleton from "@/components/skeleton/video";
// import Hls from "hls.js";

// const VideoPage = () => {
// 	const { videoId } = useParams();
// 	const [video, setVideo] = useState<any>(null);
// 	const [isSubscribed, setIsSubscribed] = useState(false);
// 	const [commentText, setCommentText] = useState("");
// 	const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
// 	const [uploadProgress, setUploadProgress] = useState<{
// 		stage: string;
// 		progress: number;
// 	} | null>(null);

// 	const videoRef = useRef<HTMLVideoElement>(null);

// 	useEffect(() => {
// 		const fetchVideo = async () => {
// 			try {
// 				const response = await axios.get(`${apiurl}/videos/${videoId}`);
// 				const v = response.data.data;

// 				setVideo({
// 					id: v.id,
// 					thumbnail: v.thumbnail,
// 					videoUrl: v.videoFile, // Array of URLs
// 					title: v.title,
// 					channelId: v.channel?.id,
// 					channelName: v.channel?.name || "Unknown Channel",
// 					channelAvatar: v.channel?.profilePicture || "/default-avatar.png",
// 					subscribers: v.channel?.subscriberCount?.toLocaleString() || "",
// 					views: v.views?.toLocaleString() || "0",
// 					timestamp: new Date(v.createdAt).toLocaleDateString(),
// 					likes: v.likes?.toLocaleString() || "0",
// 					description: v.description,
// 					comments: [],
// 				});

// 				setIsSubscribed(v.channel?.isSubscribed === 1);
// 			} catch (err) {
// 				console.error(err);
// 				setVideo(null);
// 			}
// 		};

// 		fetchVideo();
// 	}, [videoId]);

// 	// Socket.io Progress Listener
// 	useEffect(() => {
// 		socket.on("uploadProgress", (data) => {
// 			setUploadProgress(data);
// 		});

// 		return () => {
// 			socket.off("uploadProgress");
// 		};
// 	}, []);

// 	// HLS Video Player Component
// 	useEffect(() => {
// 		if (!video || !Array.isArray(video.videoUrl)) return;

// 		// Create M3U8 playlist from segments
// 		const m3u8Content = `
// #EXTM3U
// #EXT-X-VERSION:3
// #EXT-X-TARGETDURATION:10
// #EXT-X-MEDIA-SEQUENCE:0
// ${video.videoUrl
// 	.map((url, i) => {
// 		return `#EXTINF:10.0,\nsegment_${String(i).padStart(3, "0")}.ts`;
// 	})
// 	.join("\n")}
// #EXT-X-ENDLIST
// `;

// 		const blob = new Blob([m3u8Content.trim()], { type: "application/x-mpegURL" });
// 		const playlistUrl = URL.createObjectURL(blob);

// 		if (Hls.isSupported()) {
// 			const hls = new Hls();
// 			hls.loadSource(playlistUrl);
// 			hls.attachMedia(videoRef.current);
// 			hls.on(Hls.Events.MANIFEST_PARSED, () => {
// 				videoRef.current?.play().catch((err) => {
// 					console.error("Autoplay blocked:", err);
// 				});
// 			});

// 			return () => {
// 				hls.destroy();
// 				URL.revokeObjectURL(playlistUrl);
// 			};
// 		} else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
// 			// For Safari
// 			videoRef.current.src = playlistUrl;
// 			videoRef.current.addEventListener("loadedmetadata", () => {
// 				videoRef.current?.play().catch((err) => {
// 					console.error("Autoplay blocked:", err);
// 				});
// 			});
// 		}
// 	}, [video]);

// 	const handleSubscribe = async (isSubscribing: boolean) => {
// 		try {
// 			if (isSubscribing) {
// 				await axios.post(`${apiurl}/subscriptions/c/${video.channelId}`);
// 			} else {
// 				await axios.delete(`${apiurl}/subscriptions/c/${video.channelId}`);
// 			}
// 			setIsSubscribed(!isSubscribed);
// 		} catch (error) {
// 			console.error("Subscription failed", error);
// 		}
// 	};

// 	if (!video) {
// 		return <VideoSkeleton />;
// 	}

// 	return (
// 		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// 			<div className="lg:col-span-2">
// 				{/* Video player */}
// 				<div className="aspect-video bg-black w-full rounded-xl overflow-hidden relative">
// 					{uploadProgress && (
// 						<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white z-10">
// 							<div className="text-center">
// 								<p>{uploadProgress.stage === "segmenting" ? "Processing..." : "Uploading..."}</p>
// 								<progress value={uploadProgress.progress} max="100" className="w-full h-2 mt-2" />
// 								<span className="block mt-1">{uploadProgress.progress.toFixed(2)}%</span>
// 							</div>
// 						</div>
// 					)}
// 					<video ref={videoRef} controls muted poster={video.thumbnail} className="w-full h-full" />
// 				</div>

// 				{/* Video info */}
// 				<h1 className="text-xl font-bold mt-4">{video.title}</h1>

// 				<div className="flex flex-wrap justify-between items-center mt-4">
// 					<div className="flex items-center gap-4">
// 						<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
// 						<div>
// 							<h3 className="font-medium">{video.channelName}</h3>
// 							<span className="text-sm text-muted-foreground">{video.subscribers} subscribers</span>
// 						</div>
// 						<Button
// 							variant={isSubscribed ? "outline" : "default"}
// 							className={`rounded-full ${isSubscribed ? "flex gap-2" : ""}`}
// 							onClick={() => handleSubscribe(!isSubscribed)}
// 						>
// 							{isSubscribed ? <SubscriptionDropdown isSubscribed={isSubscribed} onUnsubscribe={() => handleSubscribe(false)} /> : "Subscribe"}
// 						</Button>
// 					</div>

// 					<div className="flex gap-2 mt-4 sm:mt-0">
// 						<div className="flex rounded-full overflow-hidden border">
// 							<Button variant="ghost" className="rounded-r-none border-r">
// 								<ThumbsUp size={18} className="mr-2" />
// 								{video.likes}
// 							</Button>
// 							<Button variant="ghost" className="rounded-l-none">
// 								<ThumbsDown size={18} />
// 							</Button>
// 						</div>

// 						<Button variant="outline" className="rounded-full">
// 							<Share size={18} className="mr-2" />
// 							Share
// 						</Button>

// 						<Button variant="outline" className="rounded-full">
// 							<Download size={18} className="mr-2" />
// 							Download
// 						</Button>

// 						<Button variant="outline" size="icon" className="rounded-full">
// 							<MoreHorizontal size={18} />
// 						</Button>
// 					</div>
// 				</div>

// 				{/* Video description */}
// 				<div className="bg-secondary/50 rounded-xl p-4 mt-4">
// 					<div className="flex gap-2">
// 						<span className="font-medium">{video.views} views</span>
// 						<span className="font-medium">{video.timestamp}</span>
// 					</div>
// 					<p className="mt-2 whitespace-pre-line">{video.description}</p>
// 				</div>

// 				{/* Comments */}
// 				<div className="mt-6">
// 					<h3 className="text-lg font-medium mb-4">{video.comments.length} Comments</h3>

// 					{/* Comment input */}
// 					<div className="flex gap-4 mb-6">
// 						<img src="https://randomuser.me/api/portraits/lego/1.jpg " alt="Your avatar" className="w-10 h-10 rounded-full" />
// 						<div className="flex-1">
// 							<input
// 								type="text"
// 								placeholder="Add a comment..."
// 								className="w-full bg-transparent border-b border-secondary outline-none pb-2 focus:border-primary"
// 								value={commentText}
// 								onChange={(e) => setCommentText(e.target.value)}
// 							/>

// 							<div className="flex justify-end gap-2 mt-2">
// 								<Button variant="ghost" onClick={() => setCommentText("")}>
// 									Cancel
// 								</Button>
// 								<Button
// 									disabled={!commentText.trim()}
// 									onClick={() => {
// 										console.log("Comment submitted:", commentText);
// 										setCommentText("");
// 									}}
// 								>
// 									Comment
// 								</Button>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Comment list */}
// 					<div className="flex flex-col gap-6">
// 						{video.comments.map((comment: any) => (
// 							<div key={comment.id} className="flex gap-4">
// 								<img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
// 								<div>
// 									<div className="flex items-center gap-2">
// 										<span className="font-medium">{comment.user}</span>
// 										<span className="text-sm text-muted-foreground">{comment.timestamp}</span>
// 									</div>
// 									<p className="mt-1">{comment.text}</p>
// 									<div className="flex items-center gap-2 mt-2">
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											<ThumbsUp size={16} className="mr-2" />
// 											{comment.likes}
// 										</Button>
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											<ThumbsDown size={16} />
// 										</Button>
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											Reply
// 										</Button>
// 									</div>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Related videos */}
// 			<div className="space-y-4">
// 				<h3 className="text-lg font-medium">Related Videos</h3>
// 				{relatedVideos.map((v) => (
// 					<div key={v.id} className="flex gap-2">
// 						<div className="relative flex-shrink-0">
// 							<img src={v.thumbnail} alt={v.title} className="w-40 h-24 object-cover rounded-lg" />
// 							<span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">{v.duration}</span>
// 						</div>
// 						<div className="flex-1">
// 							<h4 className="font-medium line-clamp-2 text-sm">{v.title}</h4>
// 							<p className="text-xs text-muted-foreground mt-1">{v.channelName}</p>
// 							<p className="text-xs text-muted-foreground">
// 								{v.views} views • {v.timestamp}
// 							</p>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default VideoPage;

// import React, { useEffect, useState } from "react";
// import Hls from "hls.js";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { apiurl } from "@/constants";

// const VideoPage = () => {
// 	const { videoId } = useParams();
// 	const [video, setVideo] = useState(null);

// 	useEffect(() => {
// 		const fetchVideo = async () => {
// 			try {
// 				const res = await axios.get(`${apiurl}/videos/${videoId}`);
// 				const data = res.data.data;

// 				setVideo({
// 					id: data.id,
// 					title: data.title,
// 					description: data.description,
// 					thumbnail: data.thumbnail,
// 					videoUrl: data.videoFile, // this is the .m3u8 URL now
// 					channelName: data.channel?.name || "Unknown Channel",
// 					channelAvatar: data.channel?.profilePicture || "/default-avatar.png",
// 				});
// 			} catch (err) {
// 				console.error("Failed to fetch video:", err);
// 			}
// 		};

// 		fetchVideo();
// 	}, [videoId]);

// 	useEffect(() => {
// 		let hlsInstance;

// 		if (video && video.videoUrl && typeof video.videoUrl === "string" && Hls.isSupported()) {
// 			const videoElement = document.getElementById("videoPlayer");

// 			hlsInstance = new Hls();
// 			hlsInstance.loadSource(video.videoUrl); // Must be a string like "https://cloudinary.com/output.m3u8 "
// 			hlsInstance.attachMedia(videoElement);

// 			hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
// 				videoElement.play().catch((err) => console.error("Autoplay failed:", err));
// 			});

// 			hlsInstance.on(Hls.Events.ERROR, (event, data) => {
// 				console.error("HLS.js error:", event, data);
// 			});
// 		} else {
// 			console.warn("Invalid or missing video URL", video?.videoUrl);
// 		}

// 		return () => {
// 			if (hlsInstance) {
// 				hlsInstance.destroy();
// 			}
// 		};
// 	}, [video]);

// 	if (!video) return <div>Loading...</div>;

// 	return (
// 		<div style={{ maxWidth: "960px", margin: "auto" }}>
// 			<h2>{video.title}</h2>
// 			<video id="videoPlayer" controls poster={video.thumbnail} style={{ width: "100%", height: "auto" }}></video>
// 			<p>{video.description}</p>
// 			<div>
// 				<strong>Channel:</strong> {video.channelName}
// 			</div>
// 		</div>
// 	);
// };

// export default VideoPage;
