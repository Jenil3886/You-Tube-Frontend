import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import { VideoType } from "@/types";
import { set } from "react-hook-form";

export const useVideoPlayer = (video: VideoType | null, videoRef: React.RefObject<HTMLVideoElement>) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [volume, setVolume] = useState<number>(1);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
	const [bufferedEnd, setBufferedEnd] = useState<number>(0);
	const [playbackRate, setPlaybackRate] = useState<number>(1);

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

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current
					.play()
					.then(() => setIsPlaying(true))
					.catch(() => setIsPlaying(false));
			} else {
				videoRef.current.pause();
				// setIsPlaying(!videoRef.current.paused);
				setIsPlaying(false);
			}
		}
	};

	// const togglePlayPause = () => {
	// 	if (videoRef.current) {
	// 		if (videoRef.current.paused) {
	// 			videoRef.current
	// 				.play()
	// 				.then(() => setIsPlaying(true))
	// 				.catch(() => setIsPlaying(false));
	// 		} else {
	// 			videoRef.current.pause();
	// 			setIsPlaying(false);
	// 		}
	// 	}
	// };

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
			if (!document.fullscreenElement) {
				videoRef.current.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	};

	const changePlaybackSpeed = (speed: number) => {
		if (videoRef.current) {
			videoRef.current.playbackRate = speed;
			setPlaybackRate(speed);
		}
	};

	return {
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
	};
};
