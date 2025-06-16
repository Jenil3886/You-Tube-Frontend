// // import { useParams, useNavigate } from "react-router-dom";
// // import { useEffect, useState, useRef, useCallback, useMemo } from "react";
// // import Hls from "hls.js";
// // import axios from "axios";
// // import { apiurl } from "@/constants";
// // import { getRelativeTime, formatViewCount } from "@/utils/helper";
// // import { Button } from "@/components/ui/button";
// // import {
// // 	ThumbsUp,
// // 	Share,
// // 	Download,
// // 	MoreHorizontal,
// // 	ThumbsDown,
// // 	Play,
// // 	Pause,
// // 	Volume2,
// // 	Maximize,
// // 	Shrink,
// // 	Settings,
// // 	Minimize2,
// // 	X,
// // 	MonitorPlay,
// // 	Volume1,
// // } from "lucide-react";
// // import { BiSolidVolumeMute } from "react-icons/bi";
// // import { VideoSkeleton } from "@/components/skeleton";
// // import { useToast } from "@/hooks/use-toast";

// // const VideoPage = () => {
// // 	const { videoId } = useParams();
// // 	const navigate = useNavigate();
// // 	const { toast } = useToast();

// // 	const videoContainerRef = useRef<HTMLDivElement | null>(null);
// // 	const videoRef = useRef<HTMLVideoElement | null>(null);

// // 	const [video, setVideo] = useState<any>(null);
// // 	const [isSubscribed, setIsSubscribed] = useState(false);
// // 	const [commentText, setCommentText] = useState("");
// // 	const [showFullDescription, setShowFullDescription] = useState(false);
// // 	const [isPlaying, setIsPlaying] = useState(false);
// // 	const [currentTime, setCurrentTime] = useState(0);
// // 	const [duration, setDuration] = useState(0);
// // 	const [volume, setVolume] = useState(1);
// // 	const [isMuted, setIsMuted] = useState(false);
// // 	const [isFullScreen, setIsFullScreen] = useState(false);
// // 	const [bufferedEnd, setBufferedEnd] = useState(0);
// // 	const [showMiniPlayer, setShowMiniPlayer] = useState(false);
// // 	const [isVolumeVisible, setIsVolumeVisible] = useState(false);
// // 	const [comments, setComments] = useState<any[]>([]);
// // 	const [commentsLoading, setCommentsLoading] = useState(false);
// // 	const [isLiked, setIsLiked] = useState(false);
// // 	const [likeCount, setLikeCount] = useState(0);

// // 	const fillPercent = isMuted ? 0 : volume * 100;

// // 	const bufferedPercentage = useMemo(() => {
// // 		if (!videoRef.current || !videoRef.current.buffered.length) return 0;
// // 		return (videoRef.current.buffered.end(videoRef.current.buffered.length - 1) / duration) * 100;
// // 	}, [duration, currentTime]);

// // 	const playedPercentage = useMemo(() => (duration ? (currentTime / duration) * 100 : 0), [currentTime, duration]);

// // 	const isMounted = useRef(true);

// // 	useEffect(() => {
// // 		return () => {
// // 			isMounted.current = false;
// // 		};
// // 	}, []);

// // 	const fetchVideo = async () => {
// // 		try {
// // 			const token = localStorage.getItem("accessToken");
// // 			const response = await axios.get(`${apiurl}/videos/${videoId}`, {
// // 				headers: { Authorization: `Bearer ${token}` },
// // 			});
// // 			const v = response.data.data;

// // 			setVideo({
// // 				id: v.id,
// // 				thumbnail: v.thumbnail,
// // 				videoUrl: v.videoFile,
// // 				title: v.title,
// // 				channelId: v.channel?.id,
// // 				channelName: v.channel?.name || "Unknown Channel",
// // 				channelAvatar: v.channel?.profilePicture || "/default-avatar.png",
// // 				subscribers: v.channel?.subscriberCount?.toLocaleString() || "",
// // 				views: v.views?.toLocaleString() || "0",
// // 				timestamp: getRelativeTime(v.createdAt),
// // 				likes: v.likes?.toLocaleString() || "0",
// // 				description: v.description,
// // 				duration: parseFloat(v.duration),
// // 				comments: [],
// // 			});
// // 			setIsSubscribed(v.channel?.isSubscribed === 1);
// // 		} catch (err) {
// // 			console.error("Error fetching video:", err);
// // 			setVideo(null);
// // 		}
// // 	};

// // 	useEffect(() => {
// // 		fetchVideo();
// // 	}, [videoId]);

// // 	useEffect(() => {
// // 		if (video) {
// // 			setLikeCount(Number(video.likes) || 0);
// // 		}
// // 	}, [video]);

// // 	const fetchComments = async () => {
// // 		if (!videoId) return;
// // 		setCommentsLoading(true);
// // 		try {
// // 			const token = localStorage.getItem("accessToken");
// // 			const response = await axios.get(`${apiurl}/comments/${videoId}`, {
// // 				headers: { Authorization: `Bearer ${token}` },
// // 			});
// // 			// Support both array and {comments, count} response
// // 			const data = response.data.data;
// // 			if (Array.isArray(data)) {
// // 				setComments(data);
// // 			} else if (data && Array.isArray(data.comments)) {
// // 				setComments(data.comments);
// // 			} else {
// // 				setComments([]);
// // 			}
// // 		} catch (err) {
// // 			console.error("Error fetching comments:", err);
// // 			setComments([]);
// // 		} finally {
// // 			setCommentsLoading(false);
// // 		}
// // 	};

// // 	const handlePostComment = async () => {
// // 		if (!commentText.trim()) return;
// // 		try {
// // 			const token = localStorage.getItem("accessToken");
// // 			const response = await axios.post(`${apiurl}/comments/${videoId}`, { content: commentText }, { headers: { Authorization: `Bearer ${token}` } });
// // 			setCommentText("");
// // 			setComments((prev) => [response.data.data, ...prev]);
// // 			toast({ title: "Comment added" });
// // 		} catch (err: any) {
// // 			toast({
// // 				title: "Failed to add comment",
// // 				description: err.response?.data?.message || "An error occurred.",
// // 				variant: "destructive",
// // 			});
// // 		}
// // 	};

// // 	useEffect(() => {
// // 		fetchComments();
// // 	}, [videoId]);

// // 	const handleMiniPlayer = () => {
// // 		if (video && video.id) {
// // 			localStorage.setItem(
// // 				"homePageVideo",
// // 				JSON.stringify({
// // 					id: video.id,
// // 					title: video.title,
// // 					thumbnail: video.thumbnail,
// // 					videoUrl: video.videoUrl,
// // 					channelName: video.channelName,
// // 				})
// // 			);
// // 			navigate("/");
// // 			toast({
// // 				title: "Mini player activated",
// // 				description: "Video is now playing on the home page.",
// // 			});
// // 		}
// // 	};

// // 	const setupVideoPlayer = () => {
// // 		const videoElement = videoRef.current;
// // 		if (!video || !video.videoUrl || !videoElement) return;

// // 		let hls: Hls | null = null;

// // 		if (typeof video.duration === "number" && !isNaN(video.duration)) {
// // 			setDuration(video.duration);
// // 		}

// // 		if (Hls.isSupported()) {
// // 			hls = new Hls();
// // 			hls.loadSource(video.videoUrl);
// // 			hls.attachMedia(videoElement);

// // 			hls.on(Hls.Events.MANIFEST_PARSED, () => {
// // 				videoElement.play().catch((err) => {
// // 					console.warn("Autoplay blocked by browser:", err);
// // 					setIsPlaying(false);
// // 				});
// // 			});

// // 			hls.on(Hls.Events.ERROR, (event, data) => {
// // 				console.error("HLS.js error", event, data);
// // 				if (data.fatal) {
// // 					switch (data.type) {
// // 						case Hls.ErrorTypes.NETWORK_ERROR:
// // 							hls!.startLoad();
// // 							break;
// // 						case Hls.ErrorTypes.MEDIA_ERROR:
// // 							hls!.recoverMediaError();
// // 							break;
// // 						default:
// // 							hls!.destroy();
// // 							break;
// // 					}
// // 				}
// // 			});
// // 		} else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
// // 			videoElement.src = video.videoUrl;
// // 			videoElement.addEventListener("loadedmetadata", () => {
// // 				videoElement.play().catch((err) => {
// // 					console.warn("Safari autoplay blocked:", err);
// // 					setIsPlaying(false);
// // 				});
// // 			});
// // 		}

// // 		const handlePlay = () => setIsPlaying(true);
// // 		const handlePause = () => setIsPlaying(false);
// // 		const handleTimeUpdate = () => setCurrentTime(videoElement.currentTime);
// // 		const handleDurationChange = () => setDuration(isNaN(videoElement.duration) ? 0 : videoElement.duration);
// // 		const handleVolumeChange = () => {
// // 			setVolume(videoElement.volume);
// // 			setIsMuted(videoElement.muted);
// // 		};
// // 		const handleProgress = () => {
// // 			if (videoElement.buffered.length > 0) {
// // 				setBufferedEnd(videoElement.buffered.end(videoElement.buffered.length - 1));
// // 			}
// // 		};
// // 		const handleFullscreenChange = () => setIsFullScreen(!!document.fullscreenElement);

// // 		videoElement.addEventListener("play", handlePlay);
// // 		videoElement.addEventListener("pause", handlePause);
// // 		videoElement.addEventListener("timeupdate", handleTimeUpdate);
// // 		videoElement.addEventListener("durationchange", handleDurationChange);
// // 		videoElement.addEventListener("volumechange", handleVolumeChange);
// // 		videoElement.addEventListener("progress", handleProgress);
// // 		document.addEventListener("fullscreenchange", handleFullscreenChange);

// // 		videoElement.addEventListener("loadedmetadata", () => {
// // 			if (videoElement.duration && !isNaN(videoElement.duration)) {
// // 				setDuration(videoElement.duration);
// // 			}
// // 		});

// // 		return () => {
// // 			if (hls && Hls.isSupported()) hls.destroy();
// // 			if (videoElement) {
// // 				videoElement.removeEventListener("play", handlePlay);
// // 				videoElement.removeEventListener("pause", handlePause);
// // 				videoElement.removeEventListener("timeupdate", handleTimeUpdate);
// // 				videoElement.removeEventListener("durationchange", handleDurationChange);
// // 				videoElement.removeEventListener("volumechange", handleVolumeChange);
// // 				videoElement.removeEventListener("progress", handleProgress);
// // 			}
// // 			document.removeEventListener("fullscreenchange", handleFullscreenChange);
// // 		};
// // 	};

// // 	useEffect(setupVideoPlayer, [video]);

// // 	const handleScroll = useCallback(() => {
// // 		if (!videoContainerRef.current || isFullScreen || !isPlaying) return;
// // 		const rect = videoContainerRef.current.getBoundingClientRect();
// // 		const shouldShow = rect.bottom < 0;
// // 		if (shouldShow !== showMiniPlayer && isMounted.current) {
// // 			setShowMiniPlayer(shouldShow);
// // 		}
// // 	}, [isFullScreen, isPlaying, showMiniPlayer]);

// // 	useEffect(() => {
// // 		window.addEventListener("scroll", handleScroll);
// // 		return () => window.removeEventListener("scroll", handleScroll);
// // 	}, [handleScroll]);

// // 	const handleSubscribe = async () => {
// // 		try {
// // 			const token = localStorage.getItem("accessToken");
// // 			if (!token) return;

// // 			const response = await axios.post(
// // 				`${apiurl}/subscriptions/c/${video.channelId}`,
// // 				{},
// // 				{
// // 					headers: { Authorization: `Bearer ${token}` },
// // 				}
// // 			);

// // 			const subscribed = response.data?.data?.subscribed;
// // 			const subscriberCount = response.data?.data?.subscriberCount;
// // 			setIsSubscribed(subscribed);
// // 			// Update the video.subscribers count in state
// // 			setVideo((prev: any) => prev ? { ...prev, subscribers: subscriberCount?.toLocaleString?.() || subscriberCount || "" } : prev);

// // 			toast({
// // 				title: subscribed ? "Subscribed" : "Unsubscribed",
// // 				description: subscribed ? "You have subscribed to this channel." : "You have unsubscribed from this channel.",
// // 			});
// // 		} catch (error: any) {
// // 			toast({
// // 				title: "Subscription failed",
// // 				description: error.response?.data?.message || "An error occurred.",
// // 				variant: "destructive",
// // 			});
// // 		}
// // 	};

// // 	const togglePlayPause = () => {
// // 		if (videoRef.current) {
// // 			if (videoRef.current.paused) {
// // 				videoRef.current
// // 					.play()
// // 					.then(() => setIsPlaying(true))
// // 					.catch(() => setIsPlaying(false));
// // 			} else {
// // 				videoRef.current.pause();
// // 				setIsPlaying(false);
// // 			}
// // 		}
// // 	};

// // 	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
// // 		if (videoRef.current) {
// // 			const seekTime = parseFloat(e.target.value);
// // 			videoRef.current.currentTime = seekTime;
// // 			setCurrentTime(seekTime);
// // 		}
// // 	};

// // 	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // 		if (videoRef.current) {
// // 			const newVolume = parseFloat(e.target.value);
// // 			videoRef.current.volume = newVolume;
// // 			setVolume(newVolume);
// // 			setIsMuted(newVolume === 0);
// // 			videoRef.current.muted = newVolume === 0;
// // 		}
// // 	};

// // 	const toggleMute = () => {
// // 		if (videoRef.current) {
// // 			const willBeMuted = !isMuted;
// // 			videoRef.current.muted = willBeMuted;
// // 			setIsMuted(willBeMuted);
// // 			if (!willBeMuted && videoRef.current.volume === 0) {
// // 				videoRef.current.volume = 0.5;
// // 				setVolume(0.5);
// // 			}
// // 		}
// // 	};

// // 	const toggleFullScreen = () => {
// // 		if (videoRef.current) {
// // 			if (!document.fullscreenElement) {
// // 				videoRef.current.requestFullscreen().catch((err) => console.error(err));
// // 			} else {
// // 				document.exitFullscreen();
// // 			}
// // 		}
// // 	};

// // 	const formatTime = (time: number): string => {
// // 		if (isNaN(time) || time < 0) return "00:00";
// // 		const minutes = Math.floor(time / 60);
// // 		const seconds = Math.floor(time % 60);
// // 		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
// // 	};

// // 	const closeMiniPlayer = () => setShowMiniPlayer(false);
// // 	const scrollToVideo = () => {
// // 		if (videoContainerRef.current) {
// // 			videoContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
// // 			setShowMiniPlayer(false);
// // 		}
// // 	};

// // 	const handleLike = async () => {
// // 		if (!videoId) return;
// // 		try {
// // 			const token = localStorage.getItem("accessToken");
// // 			if (!token) {
// // 				toast({ title: "Login required", description: "Please login to like videos.", variant: "destructive" });
// // 				return;
// // 			}
// // 			setIsLiked((prev) => !prev);
// // 			setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
// // 			await axios.post(`${apiurl}/videos/like/${videoId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
// // 			toast({ title: isLiked ? "Like removed" : "Video liked" });
// // 		} catch (err) {
// // 			setIsLiked((prev) => !prev);
// // 			setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
// // 			toast({ title: "Failed to like/dislike", variant: "destructive" });
// // 		}
// // 	};

// // 	const controlsOverlayClasses =
// // 		"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

// // 	if (!video) return <VideoSkeleton />;

// // 	return (
// // 		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // 			{/* Main Video Player */}
// // 			<div className="lg:col-span-2">
// // 				<div
// // 					ref={videoContainerRef}
// // 					className={`aspect-video bg-black w-full rounded-xl overflow-hidden relative group transition-all duration-300 ${
// // 						showMiniPlayer ? "fixed bottom-4 right-4 z-50 w-80 h-48 shadow-lg" : ""
// // 					}`}
// // 				>
// // 					<video
// // 						ref={videoRef}
// // 						muted={isMuted}
// // 						poster={video.thumbnail}
// // 						className="w-full h-full object-contain"
// // 						onClick={togglePlayPause}
// // 						onDoubleClick={toggleFullScreen}
// // 					>
// // 						Your browser does not support the video tag.
// // 					</video>

// // 					{/* Custom Controls Overlay */}
// // 					<div className={controlsOverlayClasses}>
// // 						{/* Buffered & Played Progress Bar */}
// // 						<div className="relative w-full h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer mb-2 group">
// // 							<div className="absolute top-0 left-0 h-full bg-gray-500" style={{ width: `${bufferedPercentage}%` }} />
// // 							<div className="absolute top-0 left-0 h-full bg-red-500 " style={{ width: `${playedPercentage}%` }} />
// // 							<input
// // 								type="range"
// // 								min="0"
// // 								max={duration || 0}
// // 								value={currentTime}
// // 								onChange={handleSeek}
// // 								// className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
// // 								className="
// //                                 absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10
// //                                 [&::-webkit-slider-thumb]:appearance-none
// //                                 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
// //                                 [&::-webkit-slider-thumb]:rounded-full
// //                                 [&::-webkit-slider-thumb]:bg-yellow-500
// //                                 [&::-webkit-slider-thumb]:cursor-pointer
// //                                 [&::-webkit-slider-thumb]:shadow-md`
// //                                 "
// // 							/>
// // 						</div>

// // 						{/* Bottom Controls */}
// // 						<div className="flex items-center justify-between text-white text-sm">
// // 							<div className="flex items-center gap-3">
// // 								<Button variant="ghost" size="icon" onClick={togglePlayPause}>
// // 									{isPlaying ? <Pause size={20} /> : <Play size={20} />}
// // 								</Button>
// // 								<div className="flex items-center gap-1">
// // 									<Button
// // 										variant="ghost"
// // 										size="icon"
// // 										onMouseEnter={() => setIsVolumeVisible(true)}
// // 										onMouseLeave={() => setIsVolumeVisible(false)}
// // 										onClick={toggleMute}
// // 									>
// // 										{isMuted || volume === 0 ? <BiSolidVolumeMute /> : volume <= 0.5 ? <Volume1 size={20} /> : <Volume2 size={20} />}
// // 									</Button>
// // 									<input
// // 										type="range"
// // 										min="0"
// // 										max="1"
// // 										step="0.01"
// // 										value={isMuted ? 0 : volume}
// // 										onChange={handleVolumeChange}
// // 										onMouseEnter={() => setIsVolumeVisible(true)}
// // 										onMouseLeave={() => setIsVolumeVisible(false)}
// // 										style={{
// // 											background: `linear-gradient(to right, white ${fillPercent}%, #3b3b3b ${fillPercent}%)`,
// // 										}}
// // 										className={`${
// // 											isVolumeVisible ? "block" : "hidden"
// // 										} w-16 h-[3px] appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full`}
// // 									/>
// // 								</div>
// // 								<span>
// // 									{formatTime(currentTime)} / {formatTime(duration)}
// // 								</span>
// // 							</div>
// // 							<div className="flex items-center gap-2">
// // 								{showMiniPlayer && (
// // 									<Button variant="ghost" size="icon" onClick={scrollToVideo}>
// // 										<Minimize2 size={20} className="rotate-180" />
// // 									</Button>
// // 								)}
// // 								<Button variant="ghost" size="icon" onClick={handleMiniPlayer}>
// // 									<MonitorPlay size={20} />
// // 								</Button>
// // 								<Button variant="ghost" size="icon">
// // 									<Settings size={20} />
// // 								</Button>
// // 								{!showMiniPlayer && (
// // 									<Button variant="ghost" size="icon" onClick={toggleFullScreen}>
// // 										{isFullScreen ? <Shrink size={20} /> : <Maximize size={20} />}
// // 									</Button>
// // 								)}
// // 							</div>
// // 						</div>
// // 					</div>

// // 					{showMiniPlayer && (
// // 						<Button
// // 							variant="ghost"
// // 							size="icon"
// // 							onClick={closeMiniPlayer}
// // 							className="absolute top-2 right-2 z-10 text-white opacity-70 hover:opacity-100"
// // 						>
// // 							<X size={16} />
// // 						</Button>
// // 					)}
// // 				</div>

// // 				{/* Video Info Below Player */}
// // 				<h1 className="text-xl font-bold mt-4">{video.title}</h1>
// // 				<div className="flex flex-wrap justify-between items-center mt-4">
// // 					<div className="flex items-center gap-4">
// // 						<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
// // 						<div>
// // 							<h3>{video.channelName}</h3>
// // 							<span className="text-sm text-gray-500">{video.subscribers} subscribers</span>
// // 						</div>
// // 						<Button variant={isSubscribed ? "outline" : "default"} onClick={handleSubscribe}>
// // 							{isSubscribed ? "Subscribed" : "Subscribe"}
// // 						</Button>
// // 					</div>
// // 					<div className="flex gap-2 mt-4 sm:mt-0">
// // 						<div className="flex rounded-full overflow-hidden border">
// // 							<Button variant="ghost" className="rounded-r-none border-r" onClick={handleLike} aria-label="Like video">
// // 								<ThumbsUp size={18} className="mr-2" />
// // 								{likeCount}
// // 							</Button>
// // 							<Button variant="ghost" className="rounded-l-none">
// // 								<ThumbsDown size={18} />
// // 							</Button>
// // 						</div>
// // 						<Button variant="outline" className="rounded-full">
// // 							<Share size={18} className="mr-2" />
// // 							Share
// // 						</Button>
// // 						<Button variant="outline" className="rounded-full">
// // 							<Download size={18} className="mr-2" />
// // 							Download
// // 						</Button>
// // 						<Button variant="outline" size="icon" className="rounded-full">
// // 							<MoreHorizontal size={18} />
// // 						</Button>
// // 					</div>
// // 				</div>

// // 				<div className="bg-secondary text-white rounded-xl my-2 p-4">
// // 					<div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
// // 						<span>{formatViewCount(video.views)} views</span>
// // 						<span>• {video.timestamp}</span>
// // 					</div>
// // 					<div className="mt-2 space-y-1">
// // 						<p className={`whitespace-pre-line ${showFullDescription ? "" : "line-clamp-3"}`}>{video.description}</p>
// // 						<button className="text-blue-400 font-medium mt-1" onClick={() => setShowFullDescription(!showFullDescription)}>
// // 							{showFullDescription ? "Show less" : "Show more"}
// // 						</button>
// // 					</div>
// // 				</div>

// // 				{/* Comments Section */}
// // 				<div className="mt-6">
// // 					<h3 className="text-lg font-medium mb-4">{comments.length} Comments</h3>
// // 					<div className="flex gap-4 mb-6">
// // 						<img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Your avatar" className="w-10 h-10 rounded-full" />
// // 						<div className="flex-1">
// // 							<input
// // 								type="text"
// // 								placeholder="Add a comment..."
// // 								className="w-full bg-transparent border-b border-secondary outline-none pb-2 focus:border-primary"
// // 								value={commentText}
// // 								onChange={(e) => setCommentText(e.target.value)}
// // 							/>
// // 							<div className="flex justify-end gap-2 mt-2">
// // 								<Button variant="ghost" onClick={() => setCommentText("")}>
// // 									Cancel
// // 								</Button>
// // 								<Button disabled={!commentText.trim()} onClick={handlePostComment}>
// // 									Comment
// // 								</Button>
// // 							</div>
// // 						</div>
// // 					</div>
// // 					{commentsLoading ? (
// // 						<p>Loading comments...</p>
// // 					) : comments.length === 0 ? (
// // 						<p className="text-gray-400">No comments yet.</p>
// // 					) : (
// // 						<div className="space-y-4">
// // 							{comments.map((c) => (
// // 								<div key={c.id} className="flex gap-4 items-start">
// // 									<img
// // 										src={c.owner?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
// // 										alt={c.owner?.name || "User"}
// // 										className="w-8 h-8 rounded-full"
// // 									/>
// // 									<div>
// // 										<div className="font-semibold">{c.owner?.name || "User"}</div>
// // 										<div className="text-sm text-gray-300">{c.content}</div>
// // 										<div className="text-xs text-gray-500 mt-1">{getRelativeTime(c.createdAt)}</div>
// // 									</div>
// // 								</div>
// // 							))}
// // 						</div>
// // 					)}
// // 				</div>
// // 			</div>

// // 			{/* Related Videos Sidebar */}
// // 			<div className="space-y-4">
// // 				<h3 className="text-lg font-medium">Related Videos</h3>
// // 				<p>No related videos yet.</p>
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export default VideoPage;

// ///////////////////////////////////////////////////////

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState, useRef, useMemo } from "react";
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
// 	MonitorPlay,
// 	Volume1,
// } from "lucide-react";
// import { BiSolidVolumeMute } from "react-icons/bi";
// import { VideoSkeleton } from "@/components/skeleton";
// import { useToast } from "@/hooks/use-toast";
// interface CommentType {
// 	id: number;
// 	content: string;
// 	createdAt: string;
// 	owner?: {
// 		name?: string;
// 		avatar?: string;
// 	};
// }

// interface VideoType {
// 	id: number;
// 	thumbnail: string;
// 	videoUrl: string;
// 	title: string;
// 	channelId: number;
// 	channelName: string;
// 	channelAvatar: string;
// 	subscribers: string | number;
// 	views: string;
// 	timestamp: string;
// 	likes: string;
// 	description: string;
// 	duration: number;
// 	comments: CommentType[];
// 	previewFolder: string;
// 	userAvtar: string;
// 	isLiked: boolean;
// }

// const VideoPage = () => {
// 	const { videoId } = useParams<{ videoId: string }>();
// 	const navigate = useNavigate();
// 	const { toast } = useToast();

// 	const videoContainerRef = useRef<HTMLDivElement | null>(null);
// 	const videoRef = useRef<HTMLVideoElement | null>(null);

// 	const [video, setVideo] = useState<VideoType | null>(null);
// 	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
// 	const [commentText, setCommentText] = useState<string>("");
// 	const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
// 	const [isPlaying, setIsPlaying] = useState<boolean>(false);
// 	const [currentTime, setCurrentTime] = useState<number>(0);
// 	const [duration, setDuration] = useState<number>(0);
// 	const [volume, setVolume] = useState<number>(1);
// 	const [isMuted, setIsMuted] = useState<boolean>(false);
// 	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
// 	const [bufferedEnd, setBufferedEnd] = useState<number>(0);
// 	const [comments, setComments] = useState<CommentType[]>([]);
// 	const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
// 	const [isLiked, setIsLiked] = useState<boolean>(false);
// 	const [likeCount, setLikeCount] = useState<number>(0);

// 	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

// 	const [isVolumeVisible, setIsVolumeVisible] = useState<boolean>(false);
// 	const [vttData, setVttData] = useState<{ time: number; url: string }[]>([]);
// 	const [hoveredTime, setHoveredTime] = useState<number | null>(null);
// 	const [hoveredThumbnail, setHoveredThumbnail] = useState<{
// 		time: number;
// 		url: string;
// 	} | null>(null);

// 	const fillPercent = isMuted ? 0 : volume * 100;

// 	// Fetch video data
// 	const fetchVideo = async () => {
// 		try {
// 			const token = localStorage.getItem("accessToken");
// 			const response = await axios.get(`${apiurl}/videos/${videoId}`, {
// 				headers: { Authorization: `Bearer ${token}` },
// 			});
// 			const v = response.data.data;
// 			setVideo({
// 				id: v.id,
// 				thumbnail: v.thumbnail,
// 				videoUrl: v.videoFile,
// 				title: v.title,
// 				channelId: v.channel?.id,
// 				channelName: v.channel?.name || "Unknown Channel",
// 				channelAvatar: v.channel?.profilePicture || "/default-avatar.png",
// 				subscribers: v.channel?.subscriberCount?.toLocaleString() || "",
// 				views: v.views?.toLocaleString() || "0",
// 				timestamp: getRelativeTime(v.createdAt),
// 				likes: v.likes?.toLocaleString() || "0",
// 				description: v.description,
// 				duration: parseFloat(v.duration),
// 				comments: [],
// 				previewFolder: v.previewFolder,
// 				userAvtar: v.owner?.avatar,

// 				isLiked: v.isLiked === true,
// 			});
// 			setIsSubscribed(v.channel?.isSubscribed === 1);
// 		} catch (err) {
// 			console.error("Error fetching video:", err);
// 			setVideo(null);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchVideo();
// 	}, [videoId]);

// 	useEffect(() => {
// 		if (video) {
// 			setLikeCount(Number(video.likes) || 0);
// 			setIsLiked(!!video.isLiked);
// 		}
// 	}, [video]);

// 	// Fetch comments
// 	const fetchComments = async () => {
// 		if (!videoId) return;
// 		setCommentsLoading(true);
// 		try {
// 			const token = localStorage.getItem("accessToken");
// 			const response = await axios.get(`${apiurl}/comments/${videoId}`, {
// 				headers: { Authorization: `Bearer ${token}` },
// 			});
// 			const data = response.data.data;
// 			if (Array.isArray(data)) {
// 				setComments(data);
// 			} else if (data && Array.isArray(data.comments)) {
// 				setComments(data.comments);
// 			} else {
// 				setComments([]);
// 			}
// 		} catch (err: any) {
// 			console.error("Error fetching comments:", err);
// 			setComments([]);
// 		} finally {
// 			setCommentsLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchComments();
// 	}, [videoId]);

// 	// Setup video player with HLS
// 	const setupVideoPlayer = () => {
// 		const videoElement = videoRef.current;
// 		if (!video || !video.videoUrl || !videoElement) return;
// 		let hls: Hls | null = null;
// 		if (Hls.isSupported()) {
// 			hls = new Hls();
// 			hls.loadSource(video.videoUrl);
// 			hls.attachMedia(videoElement);
// 			hls.on(Hls.Events.MANIFEST_PARSED, () => {
// 				videoElement!.play().catch(() => setIsPlaying(false));
// 			});
// 			hls.on(Hls.Events.ERROR, (_, data) => {
// 				if (data.fatal) {
// 					switch (data.type) {
// 						case Hls.ErrorTypes.NETWORK_ERROR:
// 							hls!.startLoad();
// 							break;
// 						case Hls.ErrorTypes.MEDIA_ERROR:
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
// 			videoElement.addEventListener("loadedmetadata", () => videoElement.play().catch(() => setIsPlaying(false)));
// 		}
// 		const handlePlay = () => setIsPlaying(true);
// 		const handlePause = () => setIsPlaying(false);
// 		const handleTimeUpdate = () => videoElement && setCurrentTime(videoElement.currentTime);
// 		const handleDurationChange = () => videoElement && setDuration(isNaN(videoElement.duration) ? 0 : videoElement.duration);
// 		const handleVolumeChange = () => {
// 			if (videoElement) {
// 				setVolume(videoElement.volume);
// 				setIsMuted(videoElement.muted);
// 			}
// 		};
// 		const handleProgress = () => {
// 			if (videoElement && videoElement.buffered.length > 0) {
// 				setBufferedEnd(videoElement.buffered.end(videoElement.buffered.length - 1));
// 			}
// 		};
// 		const handleFullscreenChange = () => setIsFullScreen(!!document.fullscreenElement);
// 		videoElement.addEventListener("play", handlePlay);
// 		videoElement.addEventListener("pause", handlePause);
// 		videoElement.addEventListener("timeupdate", handleTimeUpdate);
// 		videoElement.addEventListener("durationchange", handleDurationChange);
// 		videoElement.addEventListener("volumechange", handleVolumeChange);
// 		videoElement.addEventListener("progress", handleProgress);
// 		document.addEventListener("fullscreenchange", handleFullscreenChange);
// 		return () => {
// 			if (hls && Hls.isSupported()) hls.destroy();
// 			videoElement.removeEventListener("play", handlePlay);
// 			videoElement.removeEventListener("pause", handlePause);
// 			videoElement.removeEventListener("timeupdate", handleTimeUpdate);
// 			videoElement.removeEventListener("durationchange", handleDurationChange);
// 			videoElement.removeEventListener("volumechange", handleVolumeChange);
// 			videoElement.removeEventListener("progress", handleProgress);
// 			document.removeEventListener("fullscreenchange", handleFullscreenChange);
// 		};
// 	};

// 	useEffect(setupVideoPlayer, [video]);

// 	// Progress bar percentages
// 	const bufferedPercentage = useMemo(() => {
// 		if (!videoRef.current || !videoRef.current.buffered.length) return 0;
// 		return (videoRef.current.buffered.end(videoRef.current.buffered.length - 1) / duration) * 100;
// 	}, [duration]);

// 	const playedPercentage = useMemo(() => (duration ? (currentTime / duration) * 100 : 0), [currentTime, duration]);

// 	// Mini-player logic
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
// 			toast({ title: "Mini player activated" });
// 		}
// 	};

// 	// Subscribe handler
// 	const handleSubscribe = async () => {
// 		try {
// 			const token = localStorage.getItem("accessToken");
// 			if (!token) return;

// 			const response = await axios.post(
// 				`${apiurl}/subscriptions/c/${video.channelId}`,
// 				{},
// 				{
// 					headers: { Authorization: `Bearer ${token}` },
// 				}
// 			);

// 			const subscribed = response.data?.data?.subscribed;
// 			const subscriberCount = response.data?.data?.subscriberCount;
// 			setIsSubscribed(subscribed);
// 			// Update the video.subscribers count in state
// 			setVideo((prev: any) => (prev ? { ...prev, subscribers: subscriberCount?.toLocaleString?.() || subscriberCount || "" } : prev));

// 			toast({
// 				title: subscribed ? "Subscribed" : "Unsubscribed",
// 				description: subscribed ? "You have subscribed to this channel." : "You have unsubscribed from this channel.",
// 			});
// 		} catch (error: any) {
// 			toast({
// 				title: "Subscription failed",
// 				description: error.response?.data?.message || "An error occurred.",
// 				variant: "destructive",
// 			});
// 		}
// 	};

// 	const handleLike = async () => {
// 		if (!videoId) return;
// 		try {
// 			const token = localStorage.getItem("accessToken");
// 			if (!token) {
// 				toast({
// 					title: "Login required",
// 					description: "Please login to like videos.",
// 					variant: "destructive",
// 				});
// 				return;
// 			}
// 			setIsLiked((prev) => !prev);
// 			setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
// 			await axios.post(
// 				`${apiurl}/videos/like/${videoId}`,
// 				{},
// 				{
// 					headers: { Authorization: `Bearer ${token}` },
// 				}
// 			);
// 			toast({ title: isLiked ? "Like removed" : "Video liked" });
// 		} catch (err) {
// 			setIsLiked((prev) => !prev);
// 			setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
// 			toast({
// 				title: "Failed to like/dislike",
// 				variant: "destructive",
// 			});
// 		}
// 	};

// 	const togglePlayPause = () => {
// 		if (videoRef.current) {
// 			videoRef.current.paused ? videoRef.current.play().then(() => setIsPlaying(true)) : videoRef.current.pause();
// 			setIsPlaying(!videoRef.current.paused);
// 		}
// 	};

// 	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const seekTime = parseFloat(e.target.value);
// 		if (videoRef.current) {
// 			videoRef.current.currentTime = seekTime;
// 			setCurrentTime(seekTime);
// 		}
// 	};

// 	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const newVolume = parseFloat(e.target.value);
// 		if (videoRef.current) {
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
// 			!document.fullscreenElement ? videoRef.current.requestFullscreen() : document.exitFullscreen();
// 		}
// 	};

// 	const formatTime = (time: number): string => {
// 		if (!time || isNaN(time)) return "00:00";
// 		const minutes = Math.floor(time / 60);
// 		const seconds = Math.floor(time % 60);
// 		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
// 	};

// 	// Post comment
// 	const handlePostComment = async () => {
// 		if (!commentText.trim()) return;
// 		try {
// 			const token = localStorage.getItem("accessToken");
// 			const response = await axios.post(
// 				`${apiurl}/comments/${videoId}`,
// 				{ content: commentText },
// 				{
// 					headers: { Authorization: `Bearer ${token}` },
// 				}
// 			);
// 			setCommentText("");
// 			setComments((prev) => [response.data.data, ...prev]);
// 			toast({ title: "Comment added" });
// 		} catch (err: any) {
// 			toast({
// 				title: "Failed to add comment",
// 				description: err.response?.data?.message || "An error occurred while posting comment.",
// 				variant: "destructive",
// 			});
// 		}
// 	};

// 	// Fetch and parse VTT file
// 	useEffect(() => {
// 		if (video?.previewFolder) {
// 			axios
// 				.get(video.previewFolder)
// 				.then((response) => {
// 					const lines = response.data.split("\n");
// 					const vttData: { time: number; url: string }[] = [];
// 					let currentLine = 0;
// 					while (currentLine < lines.length) {
// 						if (lines[currentLine].trim() === "") {
// 							currentLine++;
// 							continue;
// 						}
// 						const timecodes = lines[currentLine].split(" --> ");
// 						if (timecodes.length === 2) {
// 							const start = parseTimecode(timecodes[0]);
// 							const imageUrl = lines[currentLine + 1].trim();
// 							vttData.push({ time: start, url: imageUrl });
// 							currentLine += 2;
// 						} else {
// 							currentLine++;
// 						}
// 					}
// 					setVttData(vttData);
// 				})
// 				.catch((error) => {
// 					console.error("Error fetching VTT file:", error);
// 				});
// 		}
// 	}, [video?.previewFolder]);

// 	const parseTimecode = (timecode: string): number => {
// 		const parts = timecode.split(":").map(Number);
// 		return parts[0] * 3600 + parts[1] * 60 + parts[2];
// 	};

// 	// Handle progress bar hover
// 	const handleHover = (e: React.MouseEvent<HTMLInputElement>) => {
// 		if (!video || !video.duration) return;
// 		const progressBar = e.currentTarget;
// 		const rect = progressBar.getBoundingClientRect();
// 		const x = e.clientX - rect.left;
// 		const percent = (x / rect.width) * 100;
// 		const newHoveredTime = (percent / 100) * video.duration;

// 		// Find the closest thumbnail in VTT data
// 		const closestThumbnail = vttData.reduce((closest, thumbnail) => {
// 			if (!closest || Math.abs(newHoveredTime - thumbnail.time) < Math.abs(newHoveredTime - closest.time)) {
// 				return thumbnail;
// 			}
// 			return closest;
// 		}, null);

// 		if (closestThumbnail) {
// 			setHoveredTime(newHoveredTime);
// 			setHoveredThumbnail(closestThumbnail);
// 		} else {
// 			setHoveredThumbnail(null);
// 		}
// 	};

// 	useEffect(() => {
// 		if (!isSettingsOpen) return;

// 		const handleClickOutside = (event: MouseEvent) => {
// 			const dropdown = document.querySelector(".settings-dropdown");
// 			if (dropdown && !dropdown.contains(event.target as Node)) {
// 				setIsSettingsOpen(false);
// 			}
// 		};

// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => document.removeEventListener("mousedown", handleClickOutside);
// 	}, [isSettingsOpen]);

// 	if (!video) return <VideoSkeleton />;

// 	return (
// 		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// 			{/* Main Video Player */}
// 			<div className="lg:col-span-2">
// 				<div ref={videoContainerRef} className={`relative aspect-video bg-black w-full rounded-xl overflow-hidden group  `}>
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

// 					<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// 						{/* Buffered & Played Progress Bar */}
// 						<div className="relative w-full h-1 hover:h-[6px] bg-gray-700 rounded-full overflow-hidden cursor-pointer mb-2">
// 							<div className="absolute top-0 left-0 h-full bg-gray-500" style={{ width: `${bufferedPercentage}%` }} />
// 							<div className="absolute top-0 left-0 h-full bg-white/70" style={{ width: `${(hoveredTime / video.duration) * 100}%` }} />
// 							<div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${playedPercentage}%` }} />
// 							<input
// 								type="range"
// 								min="0"
// 								max={duration || 0}
// 								value={currentTime}
// 								onChange={handleSeek}
// 								onMouseMove={handleHover}
// 								onMouseLeave={() => {
// 									setHoveredThumbnail(null);
// 									setHoveredTime(null);
// 								}}
// 								className="absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
// 							/>
// 						</div>

// 						{/* Hover Preview */}
// 						{hoveredThumbnail && (
// 							<div
// 								className="absolute inset-0 pointer-events-none max-w-[180px] max-h-[110px] bg-black/50 rounded-lg border-2 border-white/90"
// 								style={{
// 									backgroundImage: `url(${hoveredThumbnail.url})`,
// 									backgroundSize: "cover",
// 									backgroundPosition: "center",
// 									backgroundRepeat: "no-repeat",
// 									bottom: "0px",
// 									top: "-110px",
// 									// left: `${(hoveredTime / video.duration) * 100 - 11}%`,
// 									// left: `${Math.min(Math.max((hoveredTime / video.duration) * 100 - 9, 2.00277), 67.9011)}%`,
// 									left: `${Math.min(Math.max((hoveredTime / video.duration) * 100, 2.00277), 77.9011)}%`,
// 								}}
// 							/>
// 						)}
// 						{/* Hover Preview */}

// 						{/* Bottom Controls */}
// 						<div className="flex items-center justify-between text-white text-sm">
// 							<div className="flex items-center gap-3">
// 								<Button variant="ghost" size="icon" onClick={togglePlayPause}>
// 									{isPlaying ? <Pause size={20} /> : <Play size={20} />}
// 								</Button>
// 								<div className="flex items-center gap-1">
// 									<Button
// 										variant="ghost"
// 										size="icon"
// 										onMouseEnter={() => setIsVolumeVisible(true)}
// 										onMouseLeave={() => setIsVolumeVisible(false)}
// 										onClick={toggleMute}
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
// 										onMouseEnter={() => setIsVolumeVisible(true)}
// 										onMouseLeave={() => setIsVolumeVisible(false)}
// 										style={{
// 											background: `linear-gradient(to right, white ${fillPercent}%, #3b3b3b ${fillPercent}%)`,
// 										}}
// 										className={`${
// 											isVolumeVisible ? "block" : "hidden"
// 										} w-16 h-[3px] appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full`}
// 									/>
// 								</div>
// 								<span>
// 									{formatTime(currentTime)} / {formatTime(duration)}
// 								</span>
// 							</div>
// 							<div className="flex items-center gap-2">
// 								<Button variant="ghost" size="icon" onClick={handleMiniPlayer}>
// 									<MonitorPlay size={20} />
// 								</Button>
// 								<Button variant="ghost" size="icon">
// 									<Settings size={20} />
// 								</Button>

// 								{/* <SettingsDropdown /> */}

// 								<Button variant="ghost" size="icon" onClick={toggleFullScreen}>
// 									{isFullScreen ? <Shrink size={20} /> : <Maximize size={20} />}
// 								</Button>
// 							</div>
// 						</div>
// 					</div>
// 					{/* Render Settings Dropdown if open */}
// 				</div>

// 				{/* Video Info Below Player */}
// 				<h1 className="text-xl font-bold mt-4">{video.title}</h1>
// 				<div className="flex flex-wrap justify-between items-center mt-4">
// 					<div className="flex items-center gap-4">
// 						<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
// 						<div>
// 							<h3>{video.channelName}</h3>
// 							<span className="text-sm text-gray-500">{video.subscribers} subscribers</span>
// 						</div>
// 						<Button variant={isSubscribed ? "outline" : "default"} onClick={handleSubscribe}>
// 							{isSubscribed ? "Subscribed" : "Subscribe"}
// 						</Button>
// 					</div>
// 					<div className="flex gap-2 mt-4 sm:mt-0">
// 						<div className="flex rounded-full overflow-hidden border">
// 							{/* <Button variant="ghost" className="rounded-r-none border-r" onClick={handleLike}>
// 								<ThumbsUp size={18} className="mr-2" />
// 								{likeCount}
// 							</Button> */}

// 							<Button variant="ghost" className="rounded-r-none border-r" onClick={handleLike}>
// 								<ThumbsUp size={18} className="mr-2" fill={isLiked ? "blue" : "none"} stroke={isLiked ? "blue" : "currentColor"} />
// 								{likeCount}
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
// 						<button className="text-blue-400 font-medium mt-1" onClick={() => setShowFullDescription(!showFullDescription)}>
// 							{showFullDescription ? "Show less" : "Show more"}
// 						</button>
// 					</div>
// 				</div>
// 				{/* Comments Section */}
// 				<div className="mt-6">
// 					<h3 className="text-lg font-medium mb-4">{comments.length} Comments</h3>
// 					<div className="flex gap-4 mb-6">
// 						<img src={video.userAvtar} alt="your avatar" className="w-10 h-10 rounded-full" />
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
// 								<Button disabled={!commentText.trim()} onClick={handlePostComment}>
// 									Comment
// 								</Button>
// 							</div>
// 						</div>
// 					</div>
// 					{commentsLoading ? (
// 						<p>Loading comments...</p>
// 					) : comments.length === 0 ? (
// 						<p className="text-gray-400">No comments yet.</p>
// 					) : (
// 						<div className="space-y-4">
// 							{comments.map((c) => (
// 								<div key={c.id} className="flex gap-4 items-start">
// 									<img
// 										src={c.owner?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
// 										alt={c.owner?.name || "User"}
// 										className="w-8 h-8 rounded-full"
// 									/>
// 									<div>
// 										<div className="font-semibold">{c.owner?.name || "Anonymous"}</div>
// 										<div className="text-sm text-gray-300">{c.content}</div>
// 										<div className="text-xs text-gray-500 mt-1">{getRelativeTime(c.createdAt)}</div>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 			{/* Related Videos Sidebar */}
// 			<div className="space-y-4">
// 				<h3 className="text-lg font-medium">Related Videos</h3>
// 				<p>No related videos yet.</p>
// 			</div>
// 		</div>
// 	);
// };

// export default VideoPage;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
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
	MonitorPlay,
	Volume1,
} from "lucide-react";
import { BiSolidVolumeMute } from "react-icons/bi";
import { VideoSkeleton } from "@/components/skeleton";
import { useToast } from "@/hooks/use-toast";
import { CommentType, VideoType } from "@/types";

const VideoPage = () => {
	const { videoId } = useParams<{ videoId: string }>();
	const navigate = useNavigate();
	const { toast } = useToast();

	const videoContainerRef = useRef<HTMLDivElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const [video, setVideo] = useState<VideoType | null>(null);
	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
	const [commentText, setCommentText] = useState<string>("");
	const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [volume, setVolume] = useState<number>(1);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
	const [bufferedEnd, setBufferedEnd] = useState<number>(0);
	const [comments, setComments] = useState<CommentType[]>([]);
	const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(0);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isVolumeVisible, setIsVolumeVisible] = useState<boolean>(false);
	const [vttData, setVttData] = useState<{ time: number; url: string }[]>([]);
	const [hoveredTime, setHoveredTime] = useState<number | null>(null);
	const [hoveredThumbnail, setHoveredThumbnail] = useState<{
		time: number;
		url: string;
	} | null>(null);
	const [playbackRate, setPlaybackRate] = useState<number>(1);
	const [isSaved, setIsSaved] = useState<boolean>(false);

	const fillPercent = isMuted ? 0 : volume * 100;

	// Fetch video data
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
				channelName: v.channel?.name || "Unknown Channel",
				channelAvatar: v.channel?.profilePicture || "/default-avatar.png",
				channelId: v.channel?.id,
				subscribers: v.channel?.subscriberCount?.toLocaleString() || "",
				views: v.views?.toLocaleString() || "0",
				timestamp: getRelativeTime(v.createdAt),
				likes: v.likes?.toLocaleString() || "0",
				description: v.description,
				duration: parseFloat(v.duration),
				comments: [],
				previewFolder: v.previewFolder,
				userAvtar: v.owner?.avatar,
				isLiked: v.isLiked === true,
			});
			setIsSubscribed(v.channel?.isSubscribed === 1);
		} catch (err) {
			console.error("Error fetching video:", err);
			setVideo(null);
		}
	};

	useEffect(() => {
		fetchVideo();
	}, [videoId]);

	useEffect(() => {
		if (video) {
			setLikeCount(Number(video.likes) || 0);
			setIsLiked(!!video.isLiked);
		}
	}, [video]);

	// Load saved status
	useEffect(() => {
		if (!video) return;
		const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");
		const exists = savedVideos.some((v: any) => v.id === video.id);
		setIsSaved(exists);
	}, [video]);

	// Track history
	useEffect(() => {
		if (!video || !video.id) return;
		const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
		const exists = history.some((v: any) => v.id === video.id);
		if (!exists) {
			history.unshift(video);
			localStorage.setItem("watchHistory", JSON.stringify(history.slice(0, 50)));
		}
	}, [video]);

	useEffect(() => {
		if (!isSettingsOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const dropdown = document.querySelector(".settings-dropdown");
			if (dropdown && !dropdown.contains(event.target as Node)) {
				setIsSettingsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isSettingsOpen]);

	// Fetch comments
	const fetchComments = async () => {
		if (!videoId) return;
		setCommentsLoading(true);
		try {
			const token = localStorage.getItem("accessToken");
			const response = await axios.get(`${apiurl}/comments/${videoId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = response.data.data;
			if (Array.isArray(data)) {
				setComments(data);
			} else if (data && Array.isArray(data.comments)) {
				setComments(data.comments);
			} else {
				setComments([]);
			}
		} catch (err: any) {
			console.error("Error fetching comments:", err);
			setComments([]);
		} finally {
			setCommentsLoading(false);
		}
	};

	useEffect(() => {
		fetchComments();
	}, [videoId]);

	useEffect(() => {
		if (video?.title) {
			document.title = video.title;
		}
	}, [video]);

	// Setup video player with HLS
	const setupVideoPlayer = () => {
		const videoElement = videoRef.current;
		if (!video || !video.videoUrl || !videoElement) return;

		let hls: Hls | null = null;

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(video.videoUrl);
			hls.attachMedia(videoElement);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				videoElement!.play().catch(() => setIsPlaying(false));
			});

			hls.on(Hls.Events.ERROR, (_, data) => {
				if (data.fatal) {
					switch (data.type) {
						case Hls.ErrorTypes.NETWORK_ERROR:
							hls!.startLoad();
							break;
						case Hls.ErrorTypes.MEDIA_ERROR:
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
			videoElement.addEventListener("loadedmetadata", () => videoElement.play().catch(() => setIsPlaying(false)));
		}

		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);
		const handleTimeUpdate = () => videoElement && setCurrentTime(videoElement.currentTime);
		const handleDurationChange = () => videoElement && setDuration(isNaN(videoElement.duration) ? 0 : videoElement.duration);
		const handleVolumeChange = () => {
			if (videoElement) {
				setVolume(videoElement.volume);
				setIsMuted(videoElement.muted);
			}
		};
		const handleProgress = () => {
			if (videoElement && videoElement.buffered.length > 0) {
				setBufferedEnd(videoElement.buffered.end(videoElement.buffered.length - 1));
			}
		};
		const handleFullscreenChange = () => setIsFullScreen(!!document.fullscreenElement);

		videoElement.addEventListener("play", handlePlay);
		videoElement.addEventListener("pause", handlePause);
		videoElement.addEventListener("timeupdate", handleTimeUpdate);
		videoElement.addEventListener("durationchange", handleDurationChange);
		videoElement.addEventListener("volumechange", handleVolumeChange);
		videoElement.addEventListener("progress", handleProgress);
		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			if (hls && Hls.isSupported()) hls.destroy();
			videoElement.removeEventListener("play", handlePlay);
			videoElement.removeEventListener("pause", handlePause);
			videoElement.removeEventListener("timeupdate", handleTimeUpdate);
			videoElement.removeEventListener("durationchange", handleDurationChange);
			videoElement.removeEventListener("volumechange", handleVolumeChange);
			videoElement.removeEventListener("progress", handleProgress);
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	};

	useEffect(setupVideoPlayer, [video]);

	// Progress bar percentages
	const bufferedPercentage = useMemo(() => {
		if (!videoRef.current || !videoRef.current.buffered.length) return 0;
		return (videoRef.current.buffered.end(videoRef.current.buffered.length - 1) / duration) * 100;
	}, [duration]);

	const playedPercentage = useMemo(() => (duration ? (currentTime / duration) * 100 : 0), [currentTime, duration]);

	// Mini-player logic
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
			toast({ title: "Mini player activated" });
		}
	};

	// Subscribe handler
	const handleSubscribe = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			if (!token) return;
			const response = await axios.post(
				`${apiurl}/subscriptions/c/${video?.channelId}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const subscribed = response.data?.data?.subscribed;
			const subscriberCount = response.data?.data?.subscriberCount;
			setIsSubscribed(subscribed);
			setVideo((prev: any) =>
				prev
					? {
							...prev,
							subscribers: subscriberCount?.toLocaleString?.() || subscriberCount || "",
					  }
					: prev
			);
			toast({
				title: subscribed ? "Subscribed" : "Unsubscribed",
				description: subscribed ? "You have subscribed to this channel." : "You have unsubscribed from this channel.",
			});
		} catch (error: any) {
			toast({
				title: "Subscription failed",
				description: error.response?.data?.message || "An error occurred.",
				variant: "destructive",
			});
		}
	};

	const handleLike = async () => {
		if (!videoId) return;
		try {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				toast({
					title: "Login required",
					description: "Please login to like videos.",
					variant: "destructive",
				});
				return;
			}
			setIsLiked((prev) => !prev);
			setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
			await axios.post(
				`${apiurl}/videos/like/${videoId}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			toast({ title: isLiked ? "Like removed" : "Video liked" });
		} catch (err) {
			setIsLiked((prev) => !prev);
			setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
			toast({ title: "Failed to like/dislike", variant: "destructive" });
		}
	};

	const togglePlayPause = () => {
		if (videoRef.current) {
			videoRef.current.paused ? videoRef.current.play().then(() => setIsPlaying(true)) : videoRef.current.pause();
			setIsPlaying(!videoRef.current.paused);
		}
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const seekTime = parseFloat(e.target.value);
		if (videoRef.current) {
			videoRef.current.currentTime = seekTime;
			setCurrentTime(seekTime);
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		if (videoRef.current) {
			videoRef.current.volume = newVolume;
			setVolume(newVolume);
			setIsMuted(newVolume === 0);
			videoRef.current.muted = newVolume === 0;
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
		}
	};

	const toggleFullScreen = () => {
		if (videoRef.current) {
			!document.fullscreenElement ? videoRef.current.requestFullscreen() : document.exitFullscreen();
		}
	};

	const enterPiP = async () => {
		try {
			if (videoRef.current && "requestPictureInPicture" in videoRef.current) {
				await videoRef.current.requestPictureInPicture();
			}
		} catch (err) {
			toast({ title: "Picture-in-Picture not supported or already open." });
		}
	};

	const changePlaybackSpeed = (speed: number) => {
		if (videoRef.current) {
			videoRef.current.playbackRate = speed;
			setPlaybackRate(speed);
		}
	};

	const saveForLater = () => {
		if (!video) return;
		const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");

		if (isSaved) {
			const filtered = savedVideos.filter((v: any) => v.id !== video.id);
			localStorage.setItem("savedVideos", JSON.stringify(filtered));
			setIsSaved(false);
			toast({ title: "Removed from Saved Videos" });
		} else {
			savedVideos.unshift(video);
			localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
			setIsSaved(true);
			toast({ title: "Added to Saved Videos" });
		}
	};

	const formatTime = (time: number): string => {
		if (!time || isNaN(time)) return "00:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	};

	// Post comment
	const handlePostComment = async () => {
		if (!commentText.trim()) return;
		try {
			const token = localStorage.getItem("accessToken");
			const response = await axios.post(
				`${apiurl}/comments/${videoId}`,
				{ content: commentText },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setCommentText("");
			setComments((prev) => [response.data.data, ...prev]);
			toast({ title: "Comment added" });
		} catch (err: any) {
			toast({
				title: "Failed to add comment",
				description: err.response?.data?.message || "An error occurred while posting comment.",
				variant: "destructive",
			});
		}
	};

	// Fetch and parse VTT file
	useEffect(() => {
		if (video?.previewFolder) {
			axios
				.get(video.previewFolder)
				.then((response) => {
					const lines = response.data.split("\n");
					const vttData: { time: number; url: string }[] = [];
					let currentLine = 0;
					while (currentLine < lines.length) {
						if (lines[currentLine].trim() === "") {
							currentLine++;
							continue;
						}
						const timecodes = lines[currentLine].split(" --> ");
						if (timecodes.length === 2) {
							const start = parseTimecode(timecodes[0]);
							const imageUrl = lines[currentLine + 1].trim();
							vttData.push({ time: start, url: imageUrl });
							currentLine += 2;
						} else {
							currentLine++;
						}
					}
					setVttData(vttData);
				})
				.catch((error) => {
					console.error("Error fetching VTT file:", error);
				});
		}
	}, [video?.previewFolder]);

	const parseTimecode = (timecode: string): number => {
		const parts = timecode.split(":").map(Number);
		return parts[0] * 3600 + parts[1] * 60 + parts[2];
	};

	// Handle progress bar hover
	const handleHover = (e: React.MouseEvent<HTMLInputElement>) => {
		if (!video || !video.duration) return;
		const progressBar = e.currentTarget;
		const rect = progressBar.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percent = (x / rect.width) * 100;
		const newHoveredTime = (percent / 100) * video.duration;

		const closestThumbnail = vttData.reduce((closest, thumbnail) => {
			if (!closest || Math.abs(newHoveredTime - thumbnail.time) < Math.abs(newHoveredTime - closest.time)) {
				return thumbnail;
			}
			return closest;
		}, null);

		if (closestThumbnail) {
			setHoveredTime(newHoveredTime);
			setHoveredThumbnail(closestThumbnail);
		} else {
			setHoveredThumbnail(null);
		}
	};

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!videoRef.current) return;

			switch (e.key) {
				case " ":
					e.preventDefault();
					togglePlayPause();
					break;
				case "ArrowLeft":
					videoRef.current.currentTime -= 5;
					break;
				case "ArrowRight":
					videoRef.current.currentTime += 5;
					break;
				case "k":
					togglePlayPause();
					break;
				case "f":
					toggleFullScreen();
					break;
				case "m":
					toggleMute();
					break;
				case "l":
					handleLike();
					break;
				case "+":
				case "=":
					changePlaybackSpeed(1.5);
					break;
				case "-":
					changePlaybackSpeed(0.5);
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	if (!video) return <VideoSkeleton />;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Main Video Player */}
			<div className="lg:col-span-2">
				<div ref={videoContainerRef} className="relative aspect-video bg-black w-full rounded-xl overflow-hidden group">
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
					<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						{/* Buffered & Played Progress Bar */}
						<div className="relative w-full h-1 hover:h-[6px] bg-gray-700 rounded-full overflow-hidden cursor-pointer mb-2">
							<div className="absolute top-0 left-0 h-full bg-gray-500" style={{ width: `${bufferedPercentage}%` }} />
							<div className="absolute top-0 left-0 h-full bg-white/70" style={{ width: `${(hoveredTime / video.duration) * 100}%` }} />
							<div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${playedPercentage}%` }} />
							<input
								type="range"
								min="0"
								max={duration || 0}
								value={currentTime}
								onChange={handleSeek}
								onMouseMove={handleHover}
								onMouseLeave={() => {
									setHoveredThumbnail(null);
									setHoveredTime(null);
								}}
								className="absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
							/>
						</div>

						{/* Hover Thumbnail Preview */}
						{hoveredThumbnail && (
							<div
								className="absolute inset-0 pointer-events-none max-w-[180px] max-h-[110px] bg-black/50 rounded-lg border-2 border-white/90"
								style={{
									backgroundImage: `url(${hoveredThumbnail.url})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									bottom: "0px",
									top: "-110px",
									left: `${Math.min(Math.max((hoveredTime / video.duration) * 100, 2.00277), 77.9011)}%`,
								}}
							/>
						)}

						{/* Bottom Controls */}
						<div className="flex items-center justify-between text-white text-sm">
							<div className="flex items-center gap-3">
								<Button variant="ghost" size="icon" onClick={togglePlayPause}>
									{isPlaying ? <Pause size={20} /> : <Play size={20} />}
								</Button>
								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon"
										onMouseEnter={() => setIsVolumeVisible(true)}
										onMouseLeave={() => setIsVolumeVisible(false)}
										onClick={toggleMute}
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
										onMouseEnter={() => setIsVolumeVisible(true)}
										onMouseLeave={() => setIsVolumeVisible(false)}
										style={{
											background: `linear-gradient(to right, white ${fillPercent}%, #3b3b3b ${fillPercent}%)`,
										}}
										className={`${
											isVolumeVisible ? "block" : "hidden"
										} w-16 h-[3px] appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full`}
									/>
								</div>
								<span>
									{formatTime(currentTime)} / {formatTime(duration)}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="icon"
									// onClick={enterPiP}
									onClick={handleMiniPlayer}
								>
									<MonitorPlay size={20} />
								</Button>
								<Button variant="ghost" size="icon" onClick={saveForLater}>
									{isSaved ? "Saved" : "Save"}
								</Button>
								<Button variant="ghost" size="icon">
									<Settings size={20} />
								</Button>
								<Button variant="ghost" size="icon" onClick={toggleFullScreen}>
									{isFullScreen ? <Shrink size={20} /> : <Maximize size={20} />}
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Playback Speed Buttons */}
				<div className="flex mt-2 space-x-2">
					{[0.5, 1, 1.5, 2].map((speed) => (
						<button
							key={speed}
							className={`text-sm px-2 py-1 rounded ${playbackRate === speed ? "bg-primary text-white" : "bg-gray-700"}`}
							onClick={() => changePlaybackSpeed(speed)}
						>
							{speed}x
						</button>
					))}
				</div>

				{/* Video Info Below Player */}
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

				{/* Comments Section */}
				<div className="mt-6">
					<h3 className="text-lg font-medium mb-4">{comments.length} Comments</h3>
					<div className="flex gap-4 mb-6">
						<img src={video.userAvtar} alt="your avatar" className="w-10 h-10 rounded-full" />
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
								<Button disabled={!commentText.trim()} onClick={handlePostComment}>
									Comment
								</Button>
							</div>
						</div>
					</div>
					{commentsLoading ? (
						<p>Loading comments...</p>
					) : comments.length === 0 ? (
						<p className="text-gray-400">No comments yet.</p>
					) : (
						<div className="space-y-4">
							{comments.map((c) => (
								<div key={c.id} className="flex gap-4 items-start">
									<img
										src={c.owner?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
										alt={c.owner?.name || "User"}
										className="w-8 h-8 rounded-full"
									/>
									<div>
										<div className="font-semibold">{c.owner?.name || "Anonymous"}</div>
										<div className="text-sm text-gray-300">{c.content}</div>
										<div className="text-xs text-gray-500 mt-1">{getRelativeTime(c.createdAt)}</div>
									</div>
								</div>
							))}
						</div>
					)}
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
