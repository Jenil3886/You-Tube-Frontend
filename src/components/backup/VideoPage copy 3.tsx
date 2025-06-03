// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState, useRef, useCallback } from "react";
// import Hls from "hls.js";
// import axios from "axios";
// import { apiurl } from "@/constants";
// import { getRelativeTime, formatViewCount } from "@/utils/helper";
// import { Button } from "@/components/ui/button";
// import {
// 	ThumbsUp,
// 	Share,
// 	Download,
// 	MoreHorizontal,
// 	ThumbsDown,
// 	Play,
// 	Pause,
// 	Volume2,
// 	Maximize,
// 	Shrink,
// 	Settings,
// 	Minimize2,
// 	X,
// 	MonitorPlay,
// 	Volume1,
// } from "lucide-react";
// import { BiSolidVolumeMute } from "react-icons/bi";
// import { VideoSkeleton } from "@/components/skeleton";
// import { useToast } from "@/hooks/use-toast";

// const VideoPage = () => {
// 	const { videoId } = useParams();
// 	const navigate = useNavigate();
// 	const { toast } = useToast();

// 	const [video, setVideo] = useState<any>(null);
// 	const [isSubscribed, setIsSubscribed] = useState(false);
// 	const videoRef = useRef<HTMLVideoElement | null>(null);
// 	const videoContainerRef = useRef<HTMLDivElement | null>(null);

// 	const [commentText, setCommentText] = useState("");
// 	const [showFullDescription, setShowFullDescription] = useState(false);

// 	// --- Video Player State Variables ---
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const [currentTime, setCurrentTime] = useState(0);
// 	const [duration, setDuration] = useState(0);
// 	const [volume, setVolume] = useState(1);
// 	const [isMuted, setIsMuted] = useState(false);
// 	const [isFullScreen, setIsFullScreen] = useState(false);
// 	const [bufferedEnd, setBufferedEnd] = useState(0);
// 	const [showMiniPlayer, setShowMiniPlayer] = useState(false);

// 	const fillPercent = isMuted ? 0 : volume * 100;

// 	// Track mounted state to avoid state update on unmounted component
// 	const isMounted = useRef(true);

// 	useEffect(() => {
// 		return () => {
// 			isMounted.current = false;
// 		};
// 	}, []);

// 	const handleToggleDescription = () => {
// 		setShowFullDescription(!showFullDescription);
// 	};

// 	useEffect(() => {
// 		const fetchVideo = async () => {
// 			try {
// 				const token = localStorage.getItem("accessToken");
// 				const response = await axios.get(`${apiurl}/videos/${videoId}`, {
// 					headers: { Authorization: `Bearer ${token}` },
// 				});
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
// 					timestamp: getRelativeTime(v.createdAt),
// 					likes: v.likes?.toLocaleString() || "0",
// 					description: v.description,
// 					comments: [],
// 				});
// 				setIsSubscribed(v.channel?.isSubscribed === 1);
// 			} catch (err) {
// 				console.error("Error fetching video:", err);
// 				if (isMounted.current) setVideo(null);
// 			}
// 		};
// 		fetchVideo();
// 	}, [videoId]);

// 	const handleMiniPlayer = () => {
// 		if (video && video.id) {
// 			localStorage.setItem(
// 				"homePageVideo",
// 				JSON.stringify({
// 					id: video.id,
// 					title: video.title,
// 					thumbnail: video.thumbnail,
// 					videoUrl: video.videoUrl,
// 					channelName: video.channelName,
// 				})
// 			);
// 			navigate("/");
// 			toast({
// 				title: "Mini player activated",
// 				description: "Video is now playing on the home page.",
// 			});
// 		}
// 	};

// 	useEffect(() => {
// 		const videoElement = videoRef.current;
// 		if (!video || !video.videoUrl || !videoElement) return;

// 		let hls: Hls | null = null;

// 		if (Hls.isSupported()) {
// 			hls = new Hls();
// 			hls.loadSource(video.videoUrl);
// 			hls.attachMedia(videoElement);
// 			hls.on(Hls.Events.MANIFEST_PARSED, () => {
// 				videoElement.play().catch((err) => {
// 					console.warn("Autoplay blocked by browser:", err);
// 				});
// 			});
// 			hls.on(Hls.Events.ERROR, (event, data) => {
// 				console.error("HLS.js error", event, data);
// 				if (data.fatal) {
// 					switch (data.type) {
// 						case Hls.ErrorTypes.NETWORK_ERROR:
// 							console.log("Network error - retrying manifest load");
// 							hls!.startLoad();
// 							break;
// 						case Hls.ErrorTypes.MEDIA_ERROR:
// 							console.warn("Media error, trying to recover...");
// 							hls!.recoverMediaError();
// 							break;
// 						default:
// 							hls!.destroy();
// 							break;
// 					}
// 				}
// 			});
// 		} else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
// 			videoElement.src = video.videoUrl;
// 			videoElement.addEventListener("loadedmetadata", () => {
// 				videoElement.play().catch((err) => {
// 					console.warn("Safari autoplay blocked:", err);
// 				});
// 			});
// 		}

// 		const handlePlay = () => isMounted.current && setIsPlaying(true);
// 		const handlePause = () => isMounted.current && setIsPlaying(false);
// 		const handleTimeUpdate = () => isMounted.current && setCurrentTime(videoElement.currentTime);
// 		const handleDurationChange = () => isMounted.current && setDuration(videoElement.duration);
// 		const handleVolumeChange = () => {
// 			if (isMounted.current) {
// 				setVolume(videoElement.volume);
// 				setIsMuted(videoElement.muted);
// 			}
// 		};
// 		const handleProgress = () => {
// 			if (isMounted.current && videoElement.buffered.length > 0) {
// 				setBufferedEnd(videoElement.buffered.end(videoElement.buffered.length - 1));
// 			}
// 		};
// 		const handleFullscreenChange = () => {
// 			if (isMounted.current) setIsFullScreen(!!document.fullscreenElement);
// 		};

// 		videoElement.addEventListener("play", handlePlay);
// 		videoElement.addEventListener("pause", handlePause);
// 		videoElement.addEventListener("timeupdate", handleTimeUpdate);
// 		videoElement.addEventListener("durationchange", handleDurationChange);
// 		videoElement.addEventListener("volumechange", handleVolumeChange);
// 		videoElement.addEventListener("progress", handleProgress);
// 		document.addEventListener("fullscreenchange", handleFullscreenChange);

// 		return () => {
// 			if (hls && Hls.isSupported()) hls.destroy();
// 			if (videoElement) {
// 				videoElement.removeEventListener("play", handlePlay);
// 				videoElement.removeEventListener("pause", handlePause);
// 				videoElement.removeEventListener("timeupdate", handleTimeUpdate);
// 				videoElement.removeEventListener("durationchange", handleDurationChange);
// 				videoElement.removeEventListener("volumechange", handleVolumeChange);
// 				videoElement.removeEventListener("progress", handleProgress);
// 			}
// 			document.removeEventListener("fullscreenchange", handleFullscreenChange);
// 		};
// 	}, [video]);

// 	const handleScroll = useCallback(() => {
// 		if (!videoContainerRef.current || isFullScreen || !isPlaying) return;
// 		const rect = videoContainerRef.current.getBoundingClientRect();
// 		const shouldShow = rect.bottom < 0;
// 		if (shouldShow !== showMiniPlayer && isMounted.current) {
// 			setShowMiniPlayer(shouldShow);
// 		}
// 	}, [isFullScreen, isPlaying, showMiniPlayer]);

// 	useEffect(() => {
// 		window.addEventListener("scroll", handleScroll);
// 		return () => window.removeEventListener("scroll", handleScroll);
// 	}, [handleScroll]);

// 	// Handlers
// 	const handleSubscribe = async (isSubscribing: boolean) => {
// 		try {
// 			const token = localStorage.getItem("accessToken");
// 			if (!token) {
// 				console.error("Authentication token not found.");
// 				return;
// 			}
// 			if (isSubscribing) {
// 				await axios.post(
// 					`${apiurl}/subscriptions/c/${video.channelId}`,
// 					{},
// 					{
// 						headers: { Authorization: `Bearer ${token}` },
// 					}
// 				);
// 			} else {
// 				await axios.delete(`${apiurl}/subscriptions/c/${video.channelId}`, {
// 					headers: { Authorization: `Bearer ${token}` },
// 				});
// 			}
// 			setIsSubscribed(!isSubscribed);
// 		} catch (error) {
// 			console.error("Subscription failed", error);
// 		}
// 	};

// 	const togglePlayPause = () => {
// 		if (videoRef.current) {
// 			if (isPlaying) {
// 				videoRef.current.pause();
// 			} else {
// 				videoRef.current.play();
// 			}
// 			setIsPlaying(!isPlaying);
// 		}
// 	};

// 	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (videoRef.current) {
// 			const seekTime = parseFloat(e.target.value);
// 			videoRef.current.currentTime = seekTime;
// 			setCurrentTime(seekTime);
// 		}
// 	};

// 	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (videoRef.current) {
// 			const newVolume = parseFloat(e.target.value);
// 			videoRef.current.volume = newVolume;
// 			setVolume(newVolume);
// 			setIsMuted(newVolume === 0);
// 			videoRef.current.muted = newVolume === 0;
// 		}
// 	};

// 	const toggleMute = () => {
// 		if (videoRef.current) {
// 			const willBeMuted = !isMuted;
// 			videoRef.current.muted = willBeMuted;
// 			setIsMuted(willBeMuted);
// 			if (!willBeMuted && videoRef.current.volume === 0) {
// 				videoRef.current.volume = 0.5;
// 				setVolume(0.5);
// 			}
// 		}
// 	};

// 	const toggleFullScreen = () => {
// 		if (videoRef.current) {
// 			if (!document.fullscreenElement) {
// 				videoRef.current.requestFullscreen().catch((err) => {
// 					console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
// 				});
// 			} else {
// 				document.exitFullscreen();
// 			}
// 		}
// 	};

// 	const formatTime = (time: number) => {
// 		if (isNaN(time) || time < 0) return "00:00";
// 		const minutes = Math.floor(time / 60);
// 		const seconds = Math.floor(time % 60);
// 		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
// 	};

// 	const closeMiniPlayer = () => {
// 		if (isMounted.current) setShowMiniPlayer(false);
// 	};

// 	const scrollToVideo = () => {
// 		if (videoContainerRef.current && isMounted.current) {
// 			videoContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
// 			setShowMiniPlayer(false);
// 		}
// 	};

// 	if (!video) {
// 		return <VideoSkeleton />;
// 	}

// 	const controlsOverlayClasses =
// 		"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

// 	return (
// 		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// 			<div className="lg:col-span-2">
// 				{/* Main Video Player Container */}
// 				<div
// 					ref={videoContainerRef}
// 					className={`aspect-video bg-black w-full rounded-xl overflow-hidden relative group transition-all duration-300 ${
// 						showMiniPlayer ? "fixed bottom-4 right-4 z-50 w-80 h-48 shadow-lg" : ""
// 					}`}
// 				>
// 					<video
// 						ref={videoRef}
// 						muted={isMuted}
// 						poster={video.thumbnail}
// 						className="w-full h-full object-contain"
// 						onClick={togglePlayPause}
// 						onDoubleClick={toggleFullScreen}
// 					>
// 						Your browser does not support the video tag.
// 					</video>

// 					{/* Custom Controls Overlay */}
// 					<div className={controlsOverlayClasses}>
// 						{/* Progress Bar */}
// 						<div className="w-full h-1 bg-gray-700 rounded-full mb-2 relative cursor-pointer">
// 							<div className="absolute h-full bg-gray-500 rounded-full" style={{ width: `${(bufferedEnd / duration) * 100}%` }}></div>
// 							<input
// 								type="range"
// 								min="0"
// 								max={duration || 0}
// 								value={currentTime}
// 								onChange={handleSeek}
// 								className="w-full h-full absolute top-0 left-0 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow"
// 								style={{
// 									background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(currentTime / duration) * 100}%, #4b5563 ${
// 										(currentTime / duration) * 100
// 									}%, #4b5563 100%)`,
// 								}}
// 							/>
// 						</div>

// 						{/* Bottom Controls Bar */}
// 						<div className="flex items-center justify-between text-white text-sm">
// 							<div className="flex items-center gap-3">
// 								<Button variant="ghost" size="icon" onClick={togglePlayPause} className="hover:bg-white/20">
// 									{isPlaying ? <Pause size={20} /> : <Play size={20} />}
// 								</Button>
// 								<div className="flex items-center gap-1">
// 									<Button
// 										variant="ghost"
// 										size="icon"
// 										onClick={toggleMute}
// 										className="hover:bg-white/20 text-white"
// 										title={isMuted ? "Unmute" : "Mute"}
// 									>
// 										{isMuted || volume === 0 ? <BiSolidVolumeMute /> : volume <= 0.5 ? <Volume1 size={20} /> : <Volume2 size={20} />}
// 									</Button>
// 									<input
// 										type="range"
// 										min="0"
// 										max="1"
// 										step="0.01"
// 										value={isMuted ? 0 : volume}
// 										onChange={handleVolumeChange}
// 										style={{
// 											background: `linear-gradient(to right, white ${fillPercent}%, #3b3b3b ${fillPercent}%)`,
// 										}}
// 										className="w-24 h-1 appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
// 									/>
// 								</div>
// 								<span>
// 									{formatTime(currentTime)} / {formatTime(duration)}
// 								</span>
// 							</div>
// 							<div className="flex items-center gap-2">
// 								{showMiniPlayer && (
// 									<Button variant="ghost" size="icon" onClick={scrollToVideo} className="hover:bg-white/20">
// 										<Minimize2 size={20} className="rotate-180" />
// 									</Button>
// 								)}
// 								<Button
// 									variant="ghost"
// 									size="icon"
// 									className="bg-black/60 text-white hover:bg-black/80 rounded-full z-10"
// 									onClick={handleMiniPlayer}
// 									title="Mini player"
// 								>
// 									<MonitorPlay size={20} />
// 								</Button>
// 								<Button variant="ghost" size="icon" className="hover:bg-white/20">
// 									<Settings size={20} />
// 								</Button>
// 								{!showMiniPlayer && (
// 									<Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hover:bg-white/20">
// 										{isFullScreen ? <Shrink size={20} /> : <Maximize size={20} />}
// 									</Button>
// 								)}
// 							</div>
// 						</div>
// 					</div>

// 					{showMiniPlayer && (
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							onClick={closeMiniPlayer}
// 							className="absolute top-2 right-2 z-10 text-white opacity-70 hover:opacity-100"
// 						>
// 							<X size={16} />
// 						</Button>
// 					)}
// 				</div>

// 				{/* Video Info */}
// 				<h1 className="text-xl font-bold mt-4">{video.title}</h1>
// 				<div className="flex flex-wrap justify-between items-center mt-4">
// 					<div className="flex items-center gap-4">
// 						<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
// 						<div>
// 							<h3>{video.channelName}</h3>
// 							<span className="text-sm text-gray-500">{video.subscribers} subscribers</span>
// 						</div>
// 						<Button variant={isSubscribed ? "outline" : "default"} onClick={() => handleSubscribe(!isSubscribed)}>
// 							{isSubscribed ? "Subscribed" : "Subscribe"}
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

// 				<div className="bg-secondary text-white rounded-xl my-2 p-4">
// 					<div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
// 						<span>{formatViewCount(video.views)} views</span>
// 						<span>• {video.timestamp}</span>
// 					</div>
// 					<div className="mt-2 space-y-1">
// 						<p className={`whitespace-pre-line ${showFullDescription ? "" : "line-clamp-3"}`}>{video.description}</p>
// 						<button className="text-blue-400 font-medium mt-1" onClick={handleToggleDescription}>
// 							{showFullDescription ? "Show less" : "Show more"}
// 						</button>
// 					</div>
// 				</div>

// 				<div className="mt-6">
// 					<h3 className="text-lg font-medium mb-4">{video.comments.length} Comments</h3>
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
// 			<div className="space-y-4">
// 				<h3 className="text-lg font-medium">Related Videos</h3>
// 				<p>No related videos yet.</p>
// 			</div>
// 		</div>
// 	);
// };

// export default VideoPage;

///

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Hls from "hls.js";
import axios from "axios";
import { apiurl } from "@/constants";
import { getRelativeTime, formatViewCount } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import {
	ThumbsUp,
	Share,
	Download,
	MoreHorizontal,
	ThumbsDown,
	Play,
	Pause,
	Volume2,
	Maximize,
	Shrink,
	Settings,
	Minimize2,
	X,
	MonitorPlay,
	Volume1,
} from "lucide-react";
import { BiSolidVolumeMute } from "react-icons/bi";
import { VideoSkeleton } from "@/components/skeleton";
import { useToast } from "@/hooks/use-toast";

const VideoPage = () => {
	const { videoId } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();

	const videoContainerRef = useRef<HTMLDivElement | null>(null);
	const [video, setVideo] = useState<any>(null);
	const [isSubscribed, setIsSubscribed] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const [commentText, setCommentText] = useState("");
	const [showFullDescription, setShowFullDescription] = useState(false);

	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [bufferedEnd, setBufferedEnd] = useState(0);
	const [showMiniPlayer, setShowMiniPlayer] = useState(false);

	const fillPercent = isMuted ? 0 : volume * 100;

	// Track mounted state to avoid state update on unmounted component
	const isMounted = useRef(true);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	const playedPercentage = useMemo(() => (duration ? (currentTime / duration) * 100 : 0), [currentTime, duration]);

	const handleToggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	useEffect(() => {
		const fetchVideo = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				const response = await axios.get(`${apiurl}/videos/${videoId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const v = response.data.data;
				console.log("Backend video data:", v); // Debug the raw data
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
					timestamp: getRelativeTime(v.createdAt),
					likes: v.likes?.toLocaleString() || "0",
					description: v.description,
					duration: parseFloat(v.duration), // Parse the string to a number
					comments: [],
				});
				setIsSubscribed(v.channel?.isSubscribed === 1);
			} catch (err) {
				console.error("Error fetching video:", err);
				if (isMounted.current) setVideo(null);
			}
		};
		fetchVideo();
	}, [videoId]);

	const handleMiniPlayer = () => {
		if (video && video.id) {
			localStorage.setItem(
				"homePageVideo",
				JSON.stringify({
					id: video.id,
					title: video.title,
					thumbnail: video.thumbnail,
					videoUrl: video.videoUrl,
					channelName: video.channelName,
				})
			);
			navigate("/");
			toast({
				title: "Mini player activated",
				description: "Video is now playing on the home page.",
			});
		}
	};

	useEffect(() => {
		const videoElement = videoRef.current;
		if (!video || !video.videoUrl || !videoElement) {
			console.log("Video setup skipped: ", { video, videoUrl: video?.videoUrl, videoElement });
			return;
		}

		console.log("Video setup started ======", { videoElement, videoUrl: video.videoUrl });

		let hls: Hls | null = null;

		// Set initial duration from backend as a fallback
		if (typeof video.duration === "number" && !isNaN(video.duration) && isMounted.current) {
			setDuration(video.duration);
			console.log("Using backend duration as fallback:", video.duration);
		} else {
			console.warn("Invalid backend duration:", video.duration);
		}

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(video.videoUrl);
			hls.attachMedia(videoElement);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				console.log("HLS manifest parsed, attempting to play...");
				videoElement.play().catch((err) => {
					console.warn("Autoplay blocked by browser:", err);
					setIsPlaying(false);
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
			videoElement.src = video.videoUrl;
			videoElement.addEventListener("loadedmetadata", () => {
				console.log("Safari metadata loaded, attempting to play...");
				videoElement.play().catch((err) => {
					console.warn("Safari autoplay blocked:", err);
					setIsPlaying(false);
				});
			});
		}

		const handlePlay = () => {
			if (isMounted.current) {
				setIsPlaying(true);
				console.log("Video playing");
			}
		};
		const handlePause = () => {
			if (isMounted.current) {
				setIsPlaying(false);
				console.log("Video paused");
			}
		};
		const handleTimeUpdate = () => {
			if (isMounted.current) {
				setCurrentTime(videoElement.currentTime);
				console.log("Current time:", videoElement.currentTime);
			}
		};
		const handleDurationChange = () => {
			if (isMounted.current && videoElement.duration) {
				setDuration(videoElement.duration);
				console.log("Duration set from video element:", videoElement.duration);
			}
		};
		const handleVolumeChange = () => {
			if (isMounted.current) {
				setVolume(videoElement.volume);
				setIsMuted(videoElement.muted);
				console.log("Volume changed:", { volume: videoElement.volume, muted: videoElement.muted });
			}
		};
		const handleProgress = () => {
			if (isMounted.current && videoElement.buffered.length > 0) {
				setBufferedEnd(videoElement.buffered.end(videoElement.buffered.length - 1));
				console.log("Buffered end:", videoElement.buffered.end(videoElement.buffered.length - 1));
			}
		};
		const handleFullscreenChange = () => {
			if (isMounted.current) {
				setIsFullScreen(!!document.fullscreenElement);
				console.log("Fullscreen changed:", !!document.fullscreenElement);
			}
		};

		videoElement.addEventListener("play", handlePlay);
		videoElement.addEventListener("pause", handlePause);
		videoElement.addEventListener("timeupdate", handleTimeUpdate);
		videoElement.addEventListener("durationchange", handleDurationChange);
		videoElement.addEventListener("volumechange", handleVolumeChange);
		videoElement.addEventListener("progress", handleProgress);
		document.addEventListener("fullscreenchange", handleFullscreenChange);

		// Log metadata loading for debugging
		videoElement.addEventListener("loadedmetadata", () => {
			if (isMounted.current) {
				console.log("Metadata loaded, duration:", videoElement.duration);
				if (videoElement.duration && !isNaN(videoElement.duration)) {
					setDuration(videoElement.duration);
					console.log("Duration set on loadedmetadata:", videoElement.duration);
				} else {
					console.warn("No valid duration in metadata, using backend duration:", video.duration);
					if (typeof video.duration === "number" && !isNaN(video.duration)) {
						setDuration(video.duration);
					} else {
						console.error("Backend duration is invalid:", video.duration);
					}
				}
			}
		});

		return () => {
			if (hls && Hls.isSupported()) hls.destroy();
			if (videoElement) {
				videoElement.removeEventListener("play", handlePlay);
				videoElement.removeEventListener("pause", handlePause);
				videoElement.removeEventListener("timeupdate", handleTimeUpdate);
				videoElement.removeEventListener("durationchange", handleDurationChange);
				videoElement.removeEventListener("volumechange", handleVolumeChange);
				videoElement.removeEventListener("progress", handleProgress);
				videoElement.removeEventListener("loadedmetadata", handleDurationChange);
			}
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, [video]);
	const handleScroll = useCallback(() => {
		if (!videoContainerRef.current || isFullScreen || !isPlaying) return;
		const rect = videoContainerRef.current.getBoundingClientRect();
		const shouldShow = rect.bottom < 0;
		if (shouldShow !== showMiniPlayer && isMounted.current) {
			setShowMiniPlayer(shouldShow);
		}
	}, [isFullScreen, isPlaying, showMiniPlayer]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// Handlers
	const handleSubscribe = async (isSubscribing: boolean) => {
		try {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				console.error("Authentication token not found.");
				return;
			}
			if (isSubscribing) {
				await axios.post(
					`${apiurl}/subscriptions/c/${video.channelId}`,
					{},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
			} else {
				await axios.delete(`${apiurl}/subscriptions/c/${video.channelId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
			}
			setIsSubscribed(!isSubscribed);
		} catch (error) {
			console.error("Subscription failed", error);
		}
	};

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current
					.play()
					.then(() => {
						setIsPlaying(true);
						console.log("Play triggered successfully");
					})
					.catch((err) => {
						console.error("Play failed:", err);
						setIsPlaying(false);
					});
			} else {
				videoRef.current.pause();
				setIsPlaying(false);
				console.log("Pause triggered");
			}
		} else {
			console.error("Video element not found");
		}
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (videoRef.current) {
			const seekTime = parseFloat(e.target.value);
			videoRef.current.currentTime = seekTime;
			setCurrentTime(seekTime);
			console.log("Seek to:", seekTime);
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (videoRef.current) {
			const newVolume = parseFloat(e.target.value);
			videoRef.current.volume = newVolume;
			setVolume(newVolume);
			setIsMuted(newVolume === 0);
			videoRef.current.muted = newVolume === 0;
			console.log("Volume set to:", newVolume);
		}
	};

	const toggleMute = () => {
		if (videoRef.current) {
			const willBeMuted = !isMuted;
			videoRef.current.muted = willBeMuted;
			setIsMuted(willBeMuted);
			if (!willBeMuted && videoRef.current.volume === 0) {
				videoRef.current.volume = 0.5;
				setVolume(0.5);
			}
			console.log("Mute toggled:", willBeMuted);
		}
	};

	const toggleFullScreen = () => {
		if (videoRef.current) {
			if (!document.fullscreenElement) {
				videoRef.current.requestFullscreen().catch((err) => {
					console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
				});
			} else {
				document.exitFullscreen();
			}
		}
	};

	const formatTime = (time: number) => {
		if (isNaN(time) || time < 0) return "00:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	};

	const closeMiniPlayer = () => {
		if (isMounted.current) setShowMiniPlayer(false);
	};

	const scrollToVideo = () => {
		if (videoContainerRef.current && isMounted.current) {
			videoContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
			setShowMiniPlayer(false);
		}
	};

	if (!video) {
		return <VideoSkeleton />;
	}

	const controlsOverlayClasses =
		"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div className="lg:col-span-2">
				{/* Main Video Player Container */}
				<div
					ref={videoContainerRef}
					className={`aspect-video bg-black w-full rounded-xl overflow-hidden relative group transition-all duration-300 ${
						showMiniPlayer ? "fixed bottom-4 right-4 z-50 w-80 h-48 shadow-lg" : ""
					}`}
				>
					<video
						ref={videoRef}
						muted={isMuted}
						poster={video.thumbnail}
						className="w-full h-full object-contain"
						onClick={togglePlayPause}
						onDoubleClick={toggleFullScreen}
					>
						Your browser does not support the video tag.
					</video>

					{/* Custom Controls Overlay */}
					<div className={controlsOverlayClasses}>
						{/* Progress Bar */}
						<div className="w-full h-1 bg-gray-700 rounded-full mb-2 relative cursor-pointer">
							<div className="absolute h-full bg-gray-500 rounded-full" style={{ width: `${(bufferedEnd / duration) * 100}%` }}></div>
							<input
								type="range"
								min="0"
								max={duration || 0}
								value={currentTime}
								onChange={handleSeek}
								className="w-full h-full absolute top-0 left-0 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow"
								style={{
									background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(currentTime / duration) * 100}%, #4b5563 ${
										(currentTime / duration) * 100
									}%, #4b5563 100%)`,
								}}
							/>
						</div>

						{/* Bottom Controls Bar */}
						<div className="flex items-center justify-between text-white text-sm">
							<div className="flex items-center gap-3">
								<Button variant="ghost" size="icon" onClick={togglePlayPause} className="hover:bg-white/20">
									{isPlaying ? <Pause size={20} /> : <Play size={20} />}
								</Button>
								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon"
										onClick={toggleMute}
										className="hover:bg-white/20 text-white"
										title={isMuted ? "Unmute" : "Mute"}
									>
										{isMuted || volume === 0 ? <BiSolidVolumeMute /> : volume <= 0.5 ? <Volume1 size={20} /> : <Volume2 size={20} />}
									</Button>
									<input
										type="range"
										min="0"
										max="1"
										step="0.01"
										value={isMuted ? 0 : volume}
										onChange={handleVolumeChange}
										style={{
											background: `linear-gradient(to right, white ${fillPercent}%, #3b3b3b ${fillPercent}%)`,
										}}
										className="w-24 h-1 appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
									/>
								</div>
								<span>
									{formatTime(currentTime)} / {formatTime(duration)}
								</span>
							</div>
							<div className="flex items-center gap-2">
								{showMiniPlayer && (
									<Button variant="ghost" size="icon" onClick={scrollToVideo} className="hover:bg-white/20">
										<Minimize2 size={20} className="rotate-180" />
									</Button>
								)}
								<Button
									variant="ghost"
									size="icon"
									className="bg-black/60 text-white hover:bg-black/80 rounded-full z-10"
									onClick={handleMiniPlayer}
									title="Mini player"
								>
									<MonitorPlay size={20} />
								</Button>
								<Button variant="ghost" size="icon" className="hover:bg-white/20">
									<Settings size={20} />
								</Button>
								{!showMiniPlayer && (
									<Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hover:bg-white/20">
										{isFullScreen ? <Shrink size={20} /> : <Maximize size={20} />}
									</Button>
								)}
							</div>
						</div>
					</div>

					{showMiniPlayer && (
						<Button
							variant="ghost"
							size="icon"
							onClick={closeMiniPlayer}
							className="absolute top-2 right-2 z-10 text-white opacity-70 hover:opacity-100"
						>
							<X size={16} />
						</Button>
					)}
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

				<div className="bg-secondary text-white rounded-xl my-2 p-4">
					<div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
						<span>{formatViewCount(video.views)} views</span>
						<span>• {video.timestamp}</span>
					</div>
					<div className="mt-2 space-y-1">
						<p className={`whitespace-pre-line ${showFullDescription ? "" : "line-clamp-3"}`}>{video.description}</p>
						<button className="text-blue-400 font-medium mt-1" onClick={handleToggleDescription}>
							{showFullDescription ? "Show less" : "Show more"}
						</button>
					</div>
				</div>

				<div className="mt-6">
					<h3 className="text-lg font-medium mb-4">{video.comments.length} Comments</h3>
					<div className="flex gap-4 mb-6">
						<img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Your avatar" className="w-10 h-10 rounded-full" />
						<div className="flex-1">
							<input
								type="text"
								placeholder="Add a comment..."
								className="w-full bg-transparent border-b border-secondary outline-none pb-2 focus:border-primary"
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
							/>
							<div className="flex justify-end gap-2 mt-2">
								<Button variant="ghost" onClick={() => setCommentText("")}>
									Cancel
								</Button>
								<Button
									disabled={!commentText.trim()}
									onClick={() => {
										console.log("Comment submitted:", commentText);
										setCommentText("");
									}}
								>
									Comment
								</Button>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-6">
						{video.comments.map((comment: any) => (
							<div key={comment.id} className="flex gap-4">
								<img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
								<div>
									<div className="flex items-center gap-2">
										<span className="font-medium">{comment.user}</span>
										<span className="text-sm text-muted-foreground">{comment.timestamp}</span>
									</div>
									<p className="mt-1">{comment.text}</p>
									<div className="flex items-center gap-2 mt-2">
										<Button variant="ghost" size="sm" className="h-8 px-2">
											<ThumbsUp size={16} className="mr-2" />
											{comment.likes}
										</Button>
										<Button variant="ghost" size="sm" className="h-8 px-2">
											<ThumbsDown size={16} />
										</Button>
										<Button variant="ghost" size="sm" className="h-8 px-2">
											Reply
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="space-y-4">
				<h3 className="text-lg font-medium">Related Videos</h3>
				<p>No related videos yet.</p>
			</div>
		</div>
	);
};

export default VideoPage;

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState, useRef, useCallback } from "react";
// import Hls from "hls.js";
// import axios from "axios";
// import { apiurl } from "@/constants";
// import { getRelativeTime, formatViewCount } from "@/utils/helper";
// import { Button } from "@/components/ui/button";
// import {
// 	ThumbsUp,
// 	Share,
// 	Download,
// 	MoreHorizontal,
// 	ThumbsDown,
// 	Play,
// 	Pause,
// 	Volume2,
// 	Maximize,
// 	Shrink,
// 	Settings,
// 	Minimize2,
// 	X,
// 	MonitorPlay,
// 	Volume1,
// } from "lucide-react";
// import { BiSolidVolumeMute } from "react-icons/bi";
// import { VideoSkeleton } from "@/components/skeleton";
// import { useToast } from "@/hooks/use-toast";

// const VideoPage = () => {
// 	const { videoId } = useParams();
// 	const navigate = useNavigate();
// 	const { toast } = useToast();

// 	const [video, setVideo] = useState<any>(null);
// 	const [isSubscribed, setIsSubscribed] = useState(false);
// 	const videoRef = useRef<HTMLVideoElement | null>(null);
// 	const videoContainerRef = useRef<HTMLDivElement | null>(null);

// 	const [commentText, setCommentText] = useState("");
// 	const [showFullDescription, setShowFullDescription] = useState(false);

// 	// --- Video Player State Variables ---
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const [currentTime, setCurrentTime] = useState(0);
// 	const [duration, setDuration] = useState(0);
// 	const [volume, setVolume] = useState(1);
// 	const [isMuted, setIsMuted] = useState(false);
// 	const [isFullScreen, setIsFullScreen] = useState(false);
// 	const [bufferedEnd, setBufferedEnd] = useState(0);
// 	const [showMiniPlayer, setShowMiniPlayer] = useState(false);

// 	const fillPercent = isMuted ? 0 : volume * 100;

// 	// Track mounted state to avoid state update on unmounted component
// 	const isMounted = useRef(true);

// 	useEffect(() => {
// 		return () => {
// 			isMounted.current = false;
// 		};
// 	}, []);

// 	const handleToggleDescription = () => {
// 		setShowFullDescription(!showFullDescription);
// 	};

// 	useEffect(() => {
// 		const fetchVideo = async () => {
// 			try {
// 				const token = localStorage.getItem("accessToken");
// 				const response = await axios.get(`${apiurl}/videos/${videoId}`, {
// 					headers: { Authorization: `Bearer ${token}` },
// 				});
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
// 					timestamp: getRelativeTime(v.createdAt),
// 					likes: v.likes?.toLocaleString() || "0",
// 					description: v.description,
// 					duration: v.duration, // This is for reference, but we'll use videoElement.duration
// 					comments: [],
// 				});
// 				setIsSubscribed(v.channel?.isSubscribed === 1);
// 			} catch (err) {
// 				console.error("Error fetching video:", err);
// 				if (isMounted.current) setVideo(null);
// 			}
// 		};
// 		fetchVideo();
// 	}, [videoId]);

// 	const handleMiniPlayer = () => {
// 		if (video && video.id) {
// 			localStorage.setItem(
// 				"homePageVideo",
// 				JSON.stringify({
// 					id: video.id,
// 					title: video.title,
// 					thumbnail: video.thumbnail,
// 					videoUrl: video.videoUrl,
// 					channelName: video.channelName,
// 				})
// 			);
// 			navigate("/");
// 			toast({
// 				title: "Mini player activated",
// 				description: "Video is now playing on the home page.",
// 			});
// 		}
// 	};

// 	useEffect(() => {
// 		const videoElement = videoRef.current;
// 		if (!video || !video.videoUrl || !videoElement) {
// 			console.log("Video setup skipped: ", { video, videoUrl: video?.videoUrl, videoElement });
// 			return;
// 		}

// 		console.log("video setup started ======", { videoElement });

// 		let hls: Hls | null = null;

// 		if (Hls.isSupported()) {
// 			hls = new Hls();
// 			hls.loadSource(video.videoUrl);
// 			hls.attachMedia(videoElement);
// 			hls.on(Hls.Events.MANIFEST_PARSED, () => {
// 				console.log("HLS manifest parsed, attempting to play...");
// 				videoElement.play().catch((err) => {
// 					console.warn("Autoplay blocked by browser:", err);
// 					setIsPlaying(false);
// 				});
// 			});
// 			hls.on(Hls.Events.ERROR, (event, data) => {
// 				console.error("HLS.js error", event, data);
// 				if (data.fatal) {
// 					switch (data.type) {
// 						case Hls.ErrorTypes.NETWORK_ERROR:
// 							console.log("Network error - retrying manifest load");
// 							hls!.startLoad();
// 							break;
// 						case Hls.ErrorTypes.MEDIA_ERROR:
// 							console.warn("Media error, trying to recover...");
// 							hls!.recoverMediaError();
// 							break;
// 						default:
// 							hls!.destroy();
// 							break;
// 					}
// 				}
// 			});
// 		} else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
// 			videoElement.src = video.videoUrl;
// 			videoElement.addEventListener("loadedmetadata", () => {
// 				videoElement.play().catch((err) => {
// 					console.warn("Safari autoplay blocked:", err);
// 					setIsPlaying(false);
// 				});
// 			});
// 		}

// 		const handlePlay = () => {
// 			if (isMounted.current) {
// 				setIsPlaying(true);
// 				console.log("Video playing");
// 			}
// 		};
// 		const handlePause = () => {
// 			if (isMounted.current) {
// 				setIsPlaying(false);
// 				console.log("Video paused");
// 			}
// 		};
// 		const handleTimeUpdate = () => {
// 			if (isMounted.current) {
// 				setCurrentTime(videoElement.currentTime);
// 				console.log("Current time:", videoElement.currentTime);
// 			}
// 		};
// 		const handleDurationChange = () => {
// 			if (isMounted.current) {
// 				setDuration(videoElement.duration); // Use videoElement.duration instead of video.duration
// 				console.log("Duration set:", videoElement.duration);
// 			}
// 		};

// 		const handleVolumeChange = () => {
// 			if (isMounted.current) {
// 				setVolume(videoElement.volume);
// 				setIsMuted(videoElement.muted);
// 				console.log("Volume changed:", { volume: videoElement.volume, muted: videoElement.muted });
// 			}
// 		};
// 		const handleProgress = () => {
// 			if (isMounted.current && videoElement.buffered.length > 0) {
// 				setBufferedEnd(videoElement.buffered.end(videoElement.buffered.length - 1));
// 				console.log("Buffered end:", videoElement.buffered.end(videoElement.buffered.length - 1));
// 			}
// 		};
// 		const handleFullscreenChange = () => {
// 			if (isMounted.current) {
// 				setIsFullScreen(!!document.fullscreenElement);
// 				console.log("Fullscreen changed:", !!document.fullscreenElement);
// 			}
// 		};

// 		videoElement.addEventListener("play", handlePlay);
// 		videoElement.addEventListener("pause", handlePause);
// 		videoElement.addEventListener("timeupdate", handleTimeUpdate);
// 		videoElement.addEventListener("durationchange", handleDurationChange);
// 		videoElement.addEventListener("volumechange", handleVolumeChange);
// 		videoElement.addEventListener("progress", handleProgress);
// 		document.addEventListener("fullscreenchange", handleFullscreenChange);

// 		// Ensure duration is set after metadata is loaded
// 		videoElement.addEventListener("loadedmetadata", () => {
// 			if (isMounted.current) {
// 				setDuration(videoElement.duration);
// 				console.log("Duration set on loadedmetadata:", videoElement.duration);
// 			}
// 		});

// 		return () => {
// 			if (hls && Hls.isSupported()) hls.destroy();
// 			if (videoElement) {
// 				videoElement.removeEventListener("play", handlePlay);
// 				videoElement.removeEventListener("pause", handlePause);
// 				videoElement.removeEventListener("timeupdate", handleTimeUpdate);
// 				videoElement.removeEventListener("durationchange", handleDurationChange);
// 				videoElement.removeEventListener("volumechange", handleVolumeChange);
// 				videoElement.removeEventListener("progress", handleProgress);
// 				videoElement.removeEventListener("loadedmetadata", handleDurationChange);
// 			}
// 			document.removeEventListener("fullscreenchange", handleFullscreenChange);
// 		};
// 	}, [video]);

// 	const handleScroll = useCallback(() => {
// 		if (!videoContainerRef.current || isFullScreen || !isPlaying) return;
// 		const rect = videoContainerRef.current.getBoundingClientRect();
// 		const shouldShow = rect.bottom < 0;
// 		if (shouldShow !== showMiniPlayer && isMounted.current) {
// 			setShowMiniPlayer(shouldShow);
// 		}
// 	}, [isFullScreen, isPlaying, showMiniPlayer]);

// 	useEffect(() => {
// 		window.addEventListener("scroll", handleScroll);
// 		return () => window.removeEventListener("scroll", handleScroll);
// 	}, [handleScroll]);

// 	// Handlers
// 	const handleSubscribe = async (isSubscribing: boolean) => {
// 		try {
// 			const token = localStorage.getItem("accessToken");
// 			if (!token) {
// 				console.error("Authentication token not found.");
// 				return;
// 			}
// 			if (isSubscribing) {
// 				await axios.post(
// 					`${apiurl}/subscriptions/c/${video.channelId}`,
// 					{},
// 					{
// 						headers: { Authorization: `Bearer ${token}` },
// 					}
// 				);
// 			} else {
// 				await axios.delete(`${apiurl}/subscriptions/c/${video.channelId}`, {
// 					headers: { Authorization: `Bearer ${token}` },
// 				});
// 			}
// 			setIsSubscribed(!isSubscribed);
// 		} catch (error) {
// 			console.error("Subscription failed", error);
// 		}
// 	};

// 	const togglePlayPause = () => {
// 		if (videoRef.current) {
// 			if (videoRef.current.paused) {
// 				videoRef.current
// 					.play()
// 					.then(() => {
// 						setIsPlaying(true);
// 						console.log("Play triggered successfully");
// 					})
// 					.catch((err) => {
// 						console.error("Play failed:", err);
// 						setIsPlaying(false);
// 					});
// 			} else {
// 				videoRef.current.pause();
// 				setIsPlaying(false);
// 				console.log("Pause triggered");
// 			}
// 		} else {
// 			console.error("Video element not found");
// 		}
// 	};

// 	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (videoRef.current) {
// 			const seekTime = parseFloat(e.target.value);
// 			videoRef.current.currentTime = seekTime;
// 			setCurrentTime(seekTime);
// 			console.log("Seek to:", seekTime);
// 		}
// 	};

// 	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (videoRef.current) {
// 			const newVolume = parseFloat(e.target.value);
// 			videoRef.current.volume = newVolume;
// 			setVolume(newVolume);
// 			setIsMuted(newVolume === 0);
// 			videoRef.current.muted = newVolume === 0;
// 			console.log("Volume set to:", newVolume);
// 		}
// 	};

// 	const toggleMute = () => {
// 		if (videoRef.current) {
// 			const willBeMuted = !isMuted;
// 			videoRef.current.muted = willBeMuted;
// 			setIsMuted(willBeMuted);
// 			if (!willBeMuted && videoRef.current.volume === 0) {
// 				videoRef.current.volume = 0.5;
// 				setVolume(0.5);
// 			}
// 			console.log("Mute toggled:", willBeMuted);
// 		}
// 	};

// 	const toggleFullScreen = () => {
// 		if (videoRef.current) {
// 			if (!document.fullscreenElement) {
// 				videoRef.current.requestFullscreen().catch((err) => {
// 					console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
// 				});
// 			} else {
// 				document.exitFullscreen();
// 			}
// 		}
// 	};

// 	const formatTime = (time: number) => {
// 		if (isNaN(time) || time < 0) return "00:00";
// 		const minutes = Math.floor(time / 60);
// 		const seconds = Math.floor(time % 60);
// 		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
// 	};

// 	const closeMiniPlayer = () => {
// 		if (isMounted.current) setShowMiniPlayer(false);
// 	};

// 	const scrollToVideo = () => {
// 		if (videoContainerRef.current && isMounted.current) {
// 			videoContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
// 			setShowMiniPlayer(false);
// 		}
// 	};

// 	if (!video) {
// 		return <VideoSkeleton />;
// 	}

// 	const controlsOverlayClasses =
// 		"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

// 	return (
// 		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// 			<div className="lg:col-span-2">
// 				{/* Main Video Player Container */}
// 				<div
// 					ref={videoContainerRef}
// 					className={`aspect-video bg-black w-full rounded-xl overflow-hidden relative group transition-all duration-300 ${
// 						showMiniPlayer ? "fixed bottom-4 right-4 z-50 w-80 h-48 shadow-lg" : ""
// 					}`}
// 				>
// 					<video
// 						ref={videoRef}
// 						muted={isMuted}
// 						poster={video.thumbnail}
// 						className="w-full h-full object-contain"
// 						onClick={togglePlayPause}
// 						onDoubleClick={toggleFullScreen}
// 					>
// 						Your browser does not support the video tag.
// 					</video>

// 					{/* Custom Controls Overlay */}
// 					<div className={controlsOverlayClasses}>
// 						{/* Progress Bar */}
// 						<div className="w-full h-1 bg-gray-700 rounded-full mb-2 relative cursor-pointer">
// 							<div className="absolute h-full bg-gray-500 rounded-full" style={{ width: `${(bufferedEnd / duration) * 100}%` }}></div>
// 							<input
// 								type="range"
// 								min="0"
// 								max={duration || 0}
// 								value={currentTime}
// 								onChange={handleSeek}
// 								className="w-full h-full absolute top-0 left-0 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow"
// 								style={{
// 									background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(currentTime / duration) * 100}%, #4b5563 ${
// 										(currentTime / duration) * 100
// 									}%, #4b5563 100%)`,
// 								}}
// 							/>
// 						</div>

// 						{/* Bottom Controls Bar */}
// 						<div className="flex items-center justify-between text-white text-sm">
// 							<div className="flex items-center gap-3">
// 								<Button variant="ghost" size="icon" onClick={togglePlayPause} className="hover:bg-white/20">
// 									{isPlaying ? <Pause size={20} /> : <Play size={20} />}
// 								</Button>
// 								<div className="flex items-center gap-1">
// 									<Button
// 										variant="ghost"
// 										size="icon"
// 										onClick={toggleMute}
// 										className="hover:bg-white/20 text-white"
// 										title={isMuted ? "Unmute" : "Mute"}
// 									>
// 										{isMuted || volume === 0 ? <BiSolidVolumeMute /> : volume <= 0.5 ? <Volume1 size={20} /> : <Volume2 size={20} />}
// 									</Button>
// 									<input
// 										type="range"
// 										min="0"
// 										max="1"
// 										step="0.01"
// 										value={isMuted ? 0 : volume}
// 										onChange={handleVolumeChange}
// 										style={{
// 											background: `linear-gradient(to right, white ${fillPercent}%, #3b3b3b ${fillPercent}%)`,
// 										}}
// 										className="w-24 h-1 appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
// 									/>
// 								</div>
// 								<span>
// 									{formatTime(currentTime)} / {formatTime(duration)}
// 								</span>
// 							</div>
// 							<div className="flex items-center gap-2">
// 								{showMiniPlayer && (
// 									<Button variant="ghost" size="icon" onClick={scrollToVideo} className="hover:bg-white/20">
// 										<Minimize2 size={20} className="rotate-180" />
// 									</Button>
// 								)}
// 								<Button
// 									variant="ghost"
// 									size="icon"
// 									className="bg-black/60 text-white hover:bg-black/80 rounded-full z-10"
// 									onClick={handleMiniPlayer}
// 									title="Mini player"
// 								>
// 									<MonitorPlay size={20} />
// 								</Button>
// 								<Button variant="ghost" size="icon" className="hover:bg-white/20">
// 									<Settings size={20} />
// 								</Button>
// 								{!showMiniPlayer && (
// 									<Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hover:bg-white/20">
// 										{isFullScreen ? <Shrink size={20} /> : <Maximize size={20} />}
// 									</Button>
// 								)}
// 							</div>
// 						</div>
// 					</div>

// 					{showMiniPlayer && (
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							onClick={closeMiniPlayer}
// 							className="absolute top-2 right-2 z-10 text-white opacity-70 hover:opacity-100"
// 						>
// 							<X size={16} />
// 						</Button>
// 					)}
// 				</div>

// 				{/* Video Info */}
// 				<h1 className="text-xl font-bold mt-4">{video.title}</h1>
// 				<div className="flex flex-wrap justify-between items-center mt-4">
// 					<div className="flex items-center gap-4">
// 						<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
// 						<div>
// 							<h3>{video.channelName}</h3>
// 							<span className="text-sm text-gray-500">{video.subscribers} subscribers</span>
// 						</div>
// 						<Button variant={isSubscribed ? "outline" : "default"} onClick={() => handleSubscribe(!isSubscribed)}>
// 							{isSubscribed ? "Subscribed" : "Subscribe"}
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

// 				<div className="bg-secondary text-white rounded-xl my-2 p-4">
// 					<div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
// 						<span>{formatViewCount(video.views)} views</span>
// 						<span>• {video.timestamp}</span>
// 					</div>
// 					<div className="mt-2 space-y-1">
// 						<p className={`whitespace-pre-line ${showFullDescription ? "" : "line-clamp-3"}`}>{video.description}</p>
// 						<button className="text-blue-400 font-medium mt-1" onClick={handleToggleDescription}>
// 							{showFullDescription ? "Show less" : "Show more"}
// 						</button>
// 					</div>
// 				</div>

// 				<div className="mt-6">
// 					<h3 className="text-lg font-medium mb-4">{video.comments.length} Comments</h3>
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
// 			<div className="space-y-4">
// 				<h3 className="text-lg font-medium">Related Videos</h3>
// 				<p>No related videos yet.</p>
// 			</div>
// 		</div>
// 	);
// };

// export default VideoPage;
