import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { apiurl } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { VideoSkeleton } from "@/components/skeleton";
import { VideoControls } from "@/components/video/VideoControls";
import { VideoInfo } from "@/components/video/VideoInfo";
import { CommentsSection } from "@/components/video/CommentsSection";
import { useVideoData } from "@/hooks/useVideoData";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { CommentType } from "@/types";

const VideoPage = () => {
	const { videoId } = useParams<{ videoId: string }>();
	const navigate = useNavigate();
	const videoContainerRef = useRef<HTMLDivElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const { video, setVideo, isSubscribed, setIsSubscribed } = useVideoData(videoId);
	const {
		isPlaying,
		currentTime,
		duration,
		volume,
		isMuted,
		isFullScreen,
		bufferedEnd,
		playbackRate,
		togglePlayPause,
		handleSeek,
		handleVolumeChange,
		toggleMute,
		toggleFullScreen,
		changePlaybackSpeed,
	} = useVideoPlayer(video, videoRef);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(0);
	const [comments, setComments] = useState<CommentType[]>([]);
	const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
	const [isSaved, setIsSaved] = useState<boolean>(false);
	const [vttData, setVttData] = useState<{ time: number; url: string }[]>([]);
	const [hoveredTime, setHoveredTime] = useState<number | null>(null);
	const [hoveredThumbnail, setHoveredThumbnail] = useState<{ time: number; url: string } | null>(null);
	const { toast } = useToast();

	useEffect(() => {
		if (video) {
			setLikeCount(Number(video.likes) || 0);
			setIsLiked(!!video.isLiked);
			document.title = video.title;
		}
	}, [video]);

	useEffect(() => {
		if (!video) return;
		const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");
		const exists = savedVideos.some((v: any) => v.id === video.id);
		setIsSaved(exists);
	}, [video]);

	useEffect(() => {
		if (!video || !video.id) return;
		const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
		const exists = history.some((v: any) => v.id === video.id);
		if (!exists) {
			history.unshift(video);
			localStorage.setItem("watchHistory", JSON.stringify(history.slice(0, 50)));
		}
	}, [video]);

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

	const handleSubscribe = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			if (!token) return;
			const response = await axios.post(`${apiurl}/subscriptions/c/${video?.channelId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
			const { subscribed, subscriberCount } = response.data?.data;
			setIsSubscribed(subscribed);
			setVideo((prev) => (prev ? { ...prev, subscribers: subscriberCount?.toLocaleString?.() || subscriberCount || "" } : prev));
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

	const handleLike = useCallback(async () => {
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
			await axios.post(`${apiurl}/videos/like/${videoId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
			toast({ title: isLiked ? "Like removed" : "Video liked" });
		} catch (err) {
			setIsLiked((prev) => !prev);
			setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
			console.error("Error liking/disliking video:", err);
			toast({ title: "Failed to like/dislike", variant: "destructive" });
		}
	}, [videoId, isLiked, toast]);

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

	const handleHover = (e: React.MouseEvent<HTMLInputElement>) => {
		if (!video || !video.duration) return;
		const progressBar = e.currentTarget;
		const rect = progressBar.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percent = (x / rect.width) * 100;
		const newHoveredTime = (percent / 100) * video.duration;
		const closestThumbnail = vttData.reduce(
			(closest, thumbnail) => (!closest || Math.abs(newHoveredTime - thumbnail.time) < Math.abs(newHoveredTime - closest.time) ? thumbnail : closest),
			null as { time: number; url: string } | null
		);
		setHoveredTime(newHoveredTime);
		setHoveredThumbnail(closestThumbnail);
	};

	useEffect(() => {
		if (!video?.previewFolder) return;
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
			.catch((error) => console.error("Error fetching VTT file:", error));
	}, [video?.previewFolder]);

	const parseTimecode = (timecode: string): number => {
		const parts = timecode.split(":").map(Number);
		return parts[0] * 3600 + parts[1] * 60 + parts[2];
	};

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
	}, [togglePlayPause, toggleFullScreen, toggleMute, handleLike, changePlaybackSpeed]);

	if (!video) return <VideoSkeleton />;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
					<VideoControls
						isPlaying={isPlaying}
						currentTime={currentTime}
						duration={duration}
						volume={volume}
						isMuted={isMuted}
						isFullScreen={isFullScreen}
						bufferedEnd={bufferedEnd}
						playbackRate={playbackRate}
						togglePlayPause={togglePlayPause}
						handleSeek={handleSeek}
						handleVolumeChange={handleVolumeChange}
						toggleMute={toggleMute}
						toggleFullScreen={toggleFullScreen}
						changePlaybackSpeed={changePlaybackSpeed}
						handleMiniPlayer={handleMiniPlayer}
						isSaved={isSaved}
						saveForLater={saveForLater}
						hoveredTime={hoveredTime}
						hoveredThumbnail={hoveredThumbnail}
						handleHover={handleHover}
					/>
				</div>
				<VideoInfo
					video={video}
					isSubscribed={isSubscribed}
					handleSubscribe={handleSubscribe}
					isLiked={isLiked}
					likeCount={likeCount}
					handleLike={handleLike}
					showFullDescription={showFullDescription}
					setShowFullDescription={setShowFullDescription}
				/>
				<CommentsSection videoId={videoId} comments={comments} setComments={setComments} userAvatar={video.userAvtar} />
			</div>
			<div className="space-y-4">
				<h3 className="text-lg font-medium">Related Videos</h3>
				<p>No related videos yet.</p>
			</div>
		</div>
	);
};

export default VideoPage;
