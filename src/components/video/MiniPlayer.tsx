// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { X, Maximize, Minimize, Play, Pause, Volume2, VolumeX } from "lucide-react";
// import { Link } from "react-router-dom";

// interface MiniPlayerProps {
// 	video: {
// 		id: string;
// 		title: string;
// 		channelName: string;
// 		videoUrl: string;
// 		thumbnail: string;
// 	};
// 	onClose: () => void;
// }

// const MiniPlayer = ({ video, onClose }: MiniPlayerProps) => {
// 	const [isMinimized, setIsMinimized] = useState(false);
// 	const [isPlaying, setIsPlaying] = useState(true);
// 	const [isMuted, setIsMuted] = useState(true);
// 	const videoRef = useRef<HTMLVideoElement>(null);
// 	console.log("MiniPlayer video: ======", video.videoUrl);

// 	const handlePlayPause = () => {
// 		if (!videoRef.current) return;

// 		if (isPlaying) {
// 			videoRef.current.pause();
// 		} else {
// 			videoRef.current.play().catch((err) => {
// 				console.warn("Playback failed:", err);
// 			});
// 		}
// 		setIsPlaying(!isPlaying);
// 	};

// 	useEffect(() => {
// 		if (videoRef.current && isPlaying) {
// 			videoRef.current.play().catch((err) => {
// 				console.warn("Autoplay blocked by browser:", err);
// 			});
// 		}
// 	}, [isPlaying]);

// 	return (
// 		<div className={`fixed bottom-4 right-4 z-50 bg-black rounded-lg shadow-2xl transition-all duration-300w-80 h-48`}>
// 			{/* Video Player */}
// 			<div className="relative w-full h-full group">
// 				<video
// 					ref={videoRef}
// 					src={video.videoUrl}
// 					muted={isMuted}
// 					autoPlay
// 					playsInline
// 					loop
// 					className="w-full h-full rounded-t-lg object-cover"
// 					onClick={handlePlayPause}
// 				/>

// 				{/* Controls Overlay */}
// 				<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
// 					{/* Top Controls */}
// 					<div className="absolute top-2 right-2 flex gap-1">
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							className="h-8 w-8 bg-black/60 text-white hover:bg-black/80 rounded-full"
// 							onClick={() => setIsMinimized(!isMinimized)}
// 							aria-label={isMinimized ? "Maximize" : "Minimize"}
// 						>
// 							{isMinimized ? <Maximize size={14} /> : <Minimize size={14} />}
// 						</Button>
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							className="h-8 w-8 bg-black/60 text-white hover:bg-black/80 rounded-full"
// 							onClick={onClose}
// 							aria-label="Close"
// 						>
// 							<X size={14} />
// 						</Button>
// 					</div>

// 					{/* Bottom Controls */}
// 					<div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
// 						<div className="flex items-center gap-2">
// 							<Button
// 								variant="ghost"
// 								size="icon"
// 								className="h-8 w-8 bg-black/60 text-white hover:bg-black/80 rounded-full"
// 								onClick={handlePlayPause}
// 								aria-label={isPlaying ? "Pause" : "Play"}
// 							>
// 								{isPlaying ? <Pause size={14} /> : <Play size={14} />}
// 							</Button>
// 							<Button
// 								variant="ghost"
// 								size="icon"
// 								className="h-8 w-8 bg-black/60 text-white hover:bg-black/80 rounded-full"
// 								onClick={() => {
// 									if (videoRef.current) {
// 										videoRef.current.muted = !isMuted;
// 										setIsMuted(!isMuted);
// 									}
// 								}}
// 								aria-label={isMuted ? "Unmute" : "Mute"}
// 							>
// 								{isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
// 							</Button>
// 						</div>

// 						<Link to={`/video/${video.id}`} onClick={onClose}>
// 							<Button variant="ghost" size="icon" className="h-8 w-8 bg-black/60 text-white hover:bg-black/80 rounded-full" title="Go to full video">
// 								<Maximize size={14} />
// 							</Button>
// 						</Link>
// 					</div>
// 				</div>
// 				{/* Video Info */}
// 				{!isMinimized && (
// 					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
// 						<h4 className="text-white text-sm font-medium line-clamp-1">{video.title}</h4>
// 						<p className="text-white/80 text-xs">{video.channelName}</p>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default MiniPlayer;

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion
import Hls from "hls.js";
import { Button } from "@/components/ui/button";
import { X, Maximize, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

interface MiniPlayerProps {
	video: {
		id: string;
		title: string;
		channelName: string;
		videoUrl: string; // Should be .m3u8 URL
		thumbnail: string;
	};
	onClose: () => void;
}

const MiniPlayer = ({ video, onClose }: MiniPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [position, setPosition] = useState({
		x: window.innerWidth - 320,
		y: window.innerHeight - 192,
	}); // Default bottom-right
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const hlsRef = useRef<Hls | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// Setup video on mount
	useEffect(() => {
		const setupVideo = async () => {
			const videoElement = videoRef.current;
			if (!videoElement) return;

			if (Hls.isSupported() && video.videoUrl.includes(".m3u8")) {
				const hls = new Hls();
				hls.loadSource(video.videoUrl);
				hls.attachMedia(videoElement);
				hlsRef.current = hls;

				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					setIsPlaying(true);
					videoElement.play().catch((err) => {
						console.warn("Autoplay blocked:", err);
					});
				});

				hls.on(Hls.Events.ERROR, (event, data) => {
					console.error("HLS.js Error:", event, data);
				});
			} else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
				videoElement.src = video.videoUrl;
				videoElement.addEventListener("loadedmetadata", () => {
					videoElement.play().catch((err) => {
						console.warn("Safari autoplay blocked:", err);
					});
				});
			} else {
				alert("This browser does not support HLS.");
			}
		};

		setupVideo();

		return () => {
			if (hlsRef.current) hlsRef.current.destroy();
			if (videoRef.current) videoRef.current.pause();
		};
	}, [video]);

	const togglePlayPause = () => {
		const videoElement = videoRef.current;
		if (!videoElement) return;
		if (isPlaying) {
			videoElement.pause();
		} else {
			videoElement.play().catch((err) => console.warn("Playback failed:", err));
		}
		setIsPlaying(!isPlaying);
	};

	const toggleMute = () => {
		const videoElement = videoRef.current;
		if (videoElement) {
			const newMutedState = !isMuted;
			videoElement.muted = newMutedState;
			setIsMuted(newMutedState);
		}
	};

	// Snap to nearest corner
	const snapToCorner = () => {
		const container = containerRef.current;
		if (!container) return;

		const width = container.offsetWidth;
		const height = container.offsetHeight;

		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;

		let closestCorner = { x: 0, y: 0 };

		if (position.x < centerX && position.y < centerY) {
			closestCorner = { x: 0, y: 0 }; // Top-left
		} else if (position.x >= centerX && position.y < centerY) {
			closestCorner = { x: window.innerWidth - width, y: 0 }; // Top-right
		} else if (position.x < centerX && position.y >= centerY) {
			closestCorner = { x: 0, y: window.innerHeight - height }; // Bottom-left
		} else {
			closestCorner = { x: window.innerWidth - width, y: window.innerHeight - height }; // Bottom-right
		}

		setPosition(closestCorner);
	};

	// Handle drag end
	const handleDragEnd = () => {
		snapToCorner();
	};

	// Animation variants for the mini-player
	const playerVariants = {
		hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.2, ease: "easeOut" },
		},
	};

	// Animation variants for controls
	const controlsVariants = {
		hidden: { opacity: 0, transition: { duration: 0.2 } },
		visible: { opacity: 1, transition: { duration: 0.2 } },
	};

	return (
		<AnimatePresence>
			<motion.div
				ref={containerRef}
				className="fixed z-50 bg-black rounded-lg shadow-2xl w-80 h-48 overflow-hidden cursor-move"
				style={{ x: position.x, y: position.y }}
				drag // Enable Framer Motion drag
				dragMomentum={false} // Disable momentum for precise control
				dragConstraints={{
					left: 0,
					right: window.innerWidth - 320,
					top: 0,
					bottom: window.innerHeight - 192,
				}} // Keep within viewport
				onDragEnd={handleDragEnd}
				variants={playerVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
				transition={{ type: "spring", stiffness: 100, damping: 20 }}
			>
				{/* Video Player */}
				<video ref={videoRef} muted={isMuted} playsInline controls={false} className="w-full h-full object-cover" onClick={togglePlayPause} />

				{/* Controls Overlay */}
				<motion.div className="absolute inset-0 bg-black/20" variants={controlsVariants} initial="hidden" whileHover="visible">
					<motion.div className="flex items-center justify-center h-full" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
						<Button
							variant="ghost"
							size="icon"
							className="h-12 w-12 bg-black/60 text-white rounded-full"
							onClick={togglePlayPause}
							aria-label={isPlaying ? "Pause" : "Play"}
						>
							{isPlaying ? <Pause size={24} /> : <Play size={24} />}
						</Button>
					</motion.div>

					<motion.div className="absolute top-2 right-2" whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 bg-black/60 text-white rounded-full"
							onClick={toggleMute}
							aria-label={isMuted ? "Unmute" : "Mute"}
						>
							{isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
						</Button>
					</motion.div>

					<motion.div className="absolute top-2 left-2" whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
						<Button variant="ghost" size="icon" className="h-8 w-8 bg-black/60 text-white rounded-full" onClick={onClose}>
							<X size={16} />
						</Button>
					</motion.div>

					<Link to={`/video/${video.id}`} onClick={onClose}>
						<motion.div className="absolute bottom-2 right-2" whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
							<Button variant="ghost" size="icon" className="h-8 w-8 bg-black/60 text-white rounded-full">
								<Maximize size={16} />
							</Button>
						</motion.div>
					</Link>
				</motion.div>

				{/* Video Info Overlay */}
				<motion.div
					className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.3 }}
				>
					<h4 className="text-white text-sm font-medium line-clamp-1">{video.title}</h4>
					<p className="text-white/80 text-xs">{video.channelName}</p>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default MiniPlayer;
