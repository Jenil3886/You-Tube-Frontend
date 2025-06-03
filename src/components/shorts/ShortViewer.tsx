// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
// 	ChevronUp,
// 	ChevronDown,
// 	ThumbsUp,
// 	ThumbsDown,
// 	MessageSquare,
// 	Share2,
// 	MoreVertical,
// 	Play,
// 	Volume2,
// 	Maximize,
// 	X,
// 	Bookmark,
// 	MonitorSmartphone,
// 	Flag,
// 	MessageCircle,
// } from "lucide-react";
// import { Avatar } from "@/components/ui/avatar";
// import { useToast } from "@/hooks/use-toast";
// import { Switch } from "@/components/ui/switch";
// import ShortComments from "./ShortComments";

// type ShortViewerProps = {
// 	shorts: any[];
// 	activeShortIndex: number;
// 	onClose: () => void;
// 	onNext: () => void;
// 	onPrevious: () => void;
// };

// const ShortViewer = ({ shorts, activeShortIndex, onClose, onNext, onPrevious }: ShortViewerProps) => {
// 	const { toast } = useToast();
// 	const shortContainerRef = useRef<HTMLDivElement>(null);
// 	const touchStartY = useRef<number | null>(null);
// 	const touchEndY = useRef<number | null>(null);
// 	const [isSwiping, setIsSwiping] = useState(false);
// 	const [showControls, setShowControls] = useState(true);
// 	const [isCommentsOpen, setIsCommentsOpen] = useState(false);
// 	const [showMoreOptions, setShowMoreOptions] = useState(false);
// 	const [ambientMode, setAmbientMode] = useState(false);

// 	// Hide controls after a delay
// 	useEffect(() => {
// 		const timer = setTimeout(() => {
// 			if (!isCommentsOpen && !showMoreOptions) {
// 				setShowControls(false);
// 			}
// 		}, 3000);

// 		return () => clearTimeout(timer);
// 	}, [activeShortIndex, isCommentsOpen, showMoreOptions]);

// 	const handleLike = (e: React.MouseEvent) => {
// 		e.stopPropagation();
// 		toast({
// 			title: "Liked short!",
// 			description: "You liked this short video.",
// 		});
// 	};

// 	const handleDislike = (e: React.MouseEvent) => {
// 		e.stopPropagation();
// 		toast({
// 			title: "Disliked short",
// 			description: "You disliked this short video.",
// 		});
// 	};

// 	const handleCommentsToggle = (e?: React.MouseEvent) => {
// 		if (e) e.stopPropagation();
// 		setIsCommentsOpen(!isCommentsOpen);
// 	};

// 	const handleShare = (e: React.MouseEvent) => {
// 		e.stopPropagation();
// 		toast({
// 			title: "Share options",
// 			description: "Share options would appear here.",
// 		});
// 	};

// 	const handleSubscribe = (e: React.MouseEvent) => {
// 		e.stopPropagation();
// 		toast({
// 			title: "Subscribed!",
// 			description: `You've subscribed to ${shorts[activeShortIndex].channelName}.`,
// 		});
// 	};

// 	const handleMoreOptionsToggle = (e?: React.MouseEvent) => {
// 		if (e) e.stopPropagation();
// 		setShowMoreOptions(!showMoreOptions);
// 	};

// 	const handleSaveToPlaylist = (e?: React.MouseEvent) => {
// 		if (e) e.stopPropagation();
// 		setShowMoreOptions(false);
// 		toast({
// 			title: "Saved to playlist",
// 			description: "This short has been saved to your playlist.",
// 		});
// 	};

// 	const toggleAmbientMode = (e?: React.MouseEvent) => {
// 		if (e) e.stopPropagation();
// 		setAmbientMode(!ambientMode);
// 	};

// 	const handleReport = (e?: React.MouseEvent) => {
// 		if (e) e.stopPropagation();
// 		setShowMoreOptions(false);
// 		toast({
// 			title: "Report submitted",
// 			description: "Thank you for your feedback.",
// 		});
// 	};

// 	// Touch handlers for mobile swipe navigation
// 	const handleTouchStart = (e: React.TouchEvent) => {
// 		touchStartY.current = e.touches[0].clientY;
// 		setIsSwiping(true);
// 	};

// 	const handleTouchMove = (e: React.TouchEvent) => {
// 		if (!isSwiping) return;
// 		touchEndY.current = e.touches[0].clientY;

// 		// Display overlay indicator for swipe direction
// 		if (shortContainerRef.current && touchStartY.current !== null && touchEndY.current !== null) {
// 			const diff = touchStartY.current - touchEndY.current;
// 			if (Math.abs(diff) > 50) {
// 				setShowControls(true);
// 			}
// 		}
// 	};

// 	const handleTouchEnd = () => {
// 		if (touchStartY.current !== null && touchEndY.current !== null) {
// 			const diff = touchStartY.current - touchEndY.current;

// 			// Threshold to determine if swipe was intentional
// 			if (Math.abs(diff) > 100) {
// 				if (diff > 0) {
// 					onNext();
// 				} else {
// 					onPrevious();
// 				}
// 			}
// 		}

// 		touchStartY.current = null;
// 		touchEndY.current = null;
// 		setIsSwiping(false);
// 	};

// 	// Handle wheel events for desktop scrolling between shorts
// 	const handleWheel = (e: React.WheelEvent) => {
// 		if (e.deltaY > 0) {
// 			onNext();
// 		} else {
// 			onPrevious();
// 		}
// 	};

// 	// Handle content click to toggle controls
// 	const handleContentClick = () => {
// 		if (isCommentsOpen || showMoreOptions) {
// 			setIsCommentsOpen(false);
// 			setShowMoreOptions(false);
// 			return;
// 		}
// 		setShowControls((prevState) => !prevState);
// 	};

// 	return (
// 		<div
// 			className="fixed inset-0 bg-black z-50 flex flex-col items-center"
// 			onWheel={handleWheel}
// 			onTouchStart={handleTouchStart}
// 			onTouchMove={handleTouchMove}
// 			onTouchEnd={handleTouchEnd}
// 			onClick={handleContentClick}
// 			ref={shortContainerRef}
// 			onMouseEnter={() => setShowControls(true)}
// 			onMouseLeave={() => {
// 				if (!isCommentsOpen && !showMoreOptions) {
// 					setShowControls(false);
// 				}
// 			}}
// 		>
// 			{/* Short video player */}
// 			<div className="relative w-full h-full max-w-md mx-auto flex flex-col">
// 				{/* Video area */}
// 				<div className={`relative flex-1 bg-gray-900 flex items-center justify-center ${ambientMode ? "bg-opacity-70" : ""}`}>
// 					<img
// 						src={shorts[activeShortIndex].thumbnail}
// 						alt={shorts[activeShortIndex].title}
// 						className={`w-full h-full object-cover ${ambientMode ? "blur-sm" : ""}`}
// 					/>

// 					{/* Video control buttons */}
// 					<div
// 						className={`absolute top-4 left-0 right-0 flex justify-between px-4 transition-opacity duration-300 ${
// 							showControls ? "opacity-100" : "opacity-0"
// 						}`}
// 					>
// 						{/* Left side controls */}
// 						<div className="flex space-x-2">
// 							<Button
// 								variant="ghost"
// 								size="icon"
// 								className="rounded-full bg-black/50 text-white hover:bg-black/70"
// 								onClick={(e) => {
// 									e.stopPropagation();
// 								}}
// 							>
// 								<Play size={20} />
// 							</Button>
// 							<Button
// 								variant="ghost"
// 								size="icon"
// 								className="rounded-full bg-black/50 text-white hover:bg-black/70"
// 								onClick={(e) => {
// 									e.stopPropagation();
// 								}}
// 							>
// 								<Volume2 size={20} />
// 							</Button>
// 						</div>

// 						{/* Right side controls */}
// 						<div>
// 							<Button
// 								variant="ghost"
// 								size="icon"
// 								className="rounded-full bg-black/50 text-white hover:bg-black/70"
// 								onClick={(e) => {
// 									e.stopPropagation();
// 								}}
// 							>
// 								<Maximize size={20} />
// 							</Button>
// 						</div>
// 					</div>

// 					{/* Swipe indicator overlays - visible during swipe */}
// 					{isSwiping && touchStartY.current !== null && touchEndY.current !== null && (
// 						<>
// 							{touchStartY.current - touchEndY.current > 50 && (
// 								<div className="absolute inset-0 bg-black/30 flex items-center justify-center animate-fade-in">
// 									<ChevronDown className="w-16 h-16 text-white/80" />
// 								</div>
// 							)}
// 							{touchEndY.current - touchStartY.current > 50 && (
// 								<div className="absolute inset-0 bg-black/30 flex items-center justify-center animate-fade-in">
// 									<ChevronUp className="w-16 h-16 text-white/80" />
// 								</div>
// 							)}
// 						</>
// 					)}

// 					{/* Navigation overlay with fade animation */}
// 					<div className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
// 						{/* Close button */}
// 						<div className="p-4 self-start">
// 							<Button
// 								variant="ghost"
// 								size="icon"
// 								className="rounded-full bg-black/50 text-white hover:bg-black/70"
// 								onClick={(e) => {
// 									e.stopPropagation();
// 									onClose();
// 								}}
// 							>
// 								<X size={20} />
// 							</Button>
// 						</div>

// 						{/* Previous/Next buttons - now hidden for cleaner UI, use swipe/keyboard instead */}
// 						<div className="flex-1 flex items-center">
// 							<div
// 								className="flex-1 h-full"
// 								onClick={(e) => {
// 									e.stopPropagation();
// 									onPrevious();
// 								}}
// 							></div>
// 							<div
// 								className="flex-1 h-full"
// 								onClick={(e) => {
// 									e.stopPropagation();
// 									onNext();
// 								}}
// 							></div>
// 						</div>

// 						{/* Title and controls */}
// 						<div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
// 							<h3 className="text-white font-medium mb-2">{shorts[activeShortIndex].title}</h3>
// 							<div className="flex items-center justify-between">
// 								<div className="flex items-center gap-2">
// 									<Avatar>
// 										<img src={shorts[activeShortIndex].channelAvatar} alt={shorts[activeShortIndex].channelName} />
// 									</Avatar>
// 									<span className="text-white font-medium">{shorts[activeShortIndex].channelName}</span>
// 								</div>
// 								<Button size="sm" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={(e) => handleSubscribe(e)}>
// 									Subscribe
// 								</Button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Action buttons */}
// 				<div
// 					className={`absolute right-4 bottom-20 flex flex-col gap-6 items-center transition-opacity duration-300 ${
// 						showControls ? "opacity-100" : "opacity-0"
// 					}`}
// 				>
// 					<div className="flex flex-col items-center gap-1">
// 						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleLike}>
// 							<ThumbsUp size={20} />
// 						</Button>
// 						<span className="text-white text-xs">{(shorts[activeShortIndex].likes / 1000).toFixed(1)}K</span>
// 					</div>
// 					<div className="flex flex-col items-center gap-1">
// 						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleDislike}>
// 							<ThumbsDown size={20} />
// 						</Button>
// 						<span className="text-white text-xs">Dislike</span>
// 					</div>
// 					<div className="flex flex-col items-center gap-1">
// 						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleCommentsToggle}>
// 							<MessageSquare size={20} />
// 						</Button>
// 						<span className="text-white text-xs">{shorts[activeShortIndex].comments}</span>
// 					</div>
// 					<div className="flex flex-col items-center gap-1">
// 						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleShare}>
// 							<Share2 size={20} />
// 						</Button>
// 						<span className="text-white text-xs">Share</span>
// 					</div>
// 					<div className="flex flex-col items-center gap-1">
// 						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleMoreOptionsToggle}>
// 							<MoreVertical size={20} />
// 						</Button>
// 						<span className="text-white text-xs">More</span>
// 					</div>
// 					<div className="flex flex-col items-center gap-1">
// 						<Avatar className="h-9 w-9 border border-white">
// 							<img src={shorts[activeShortIndex].channelAvatar} alt={shorts[activeShortIndex].channelName} />
// 						</Avatar>
// 					</div>
// 				</div>

// 				{/* More options menu */}
// 				{showMoreOptions && (
// 					<div className="absolute right-16 bottom-40 bg-black/90 rounded-lg p-2 min-w-[240px] animate-fade-in" onClick={(e) => e.stopPropagation()}>
// 						<div className="flex flex-col text-white">
// 							<button className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md text-left">
// 								<MessageCircle className="h-5 w-5" />
// 								<span>Description</span>
// 							</button>
// 							<button className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md text-left" onClick={(e) => handleSaveToPlaylist(e)}>
// 								<Bookmark className="h-5 w-5" />
// 								<span>Save to playlist</span>
// 							</button>
// 							<div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md">
// 								<MonitorSmartphone className="h-5 w-5" />
// 								<span className="flex-1">Ambient mode</span>
// 								<Switch checked={ambientMode} onCheckedChange={() => toggleAmbientMode()} />
// 							</div>
// 							<button className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md text-left" onClick={(e) => handleReport(e)}>
// 								<Flag className="h-5 w-5" />
// 								<span>Report</span>
// 							</button>
// 						</div>
// 					</div>
// 				)}

// 				{/* Navigation arrows - improved visibility */}
// 				{activeShortIndex > 0 && showControls && (
// 					<Button
// 						variant="ghost"
// 						size="icon"
// 						className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full bg-black/60 text-white hover:bg-black/80 shadow-lg animate-fade-in"
// 						onClick={(e) => {
// 							e.stopPropagation();
// 							onPrevious();
// 						}}
// 					>
// 						<ChevronUp size={24} />
// 					</Button>
// 				)}
// 				{activeShortIndex < shorts.length - 1 && showControls && (
// 					<Button
// 						variant="ghost"
// 						size="icon"
// 						className="absolute left-1/2 bottom-28 -translate-x-1/2 rounded-full bg-black/60 text-white hover:bg-black/80 shadow-lg animate-fade-in"
// 						onClick={(e) => {
// 							e.stopPropagation();
// 							onNext();
// 						}}
// 					>
// 						<ChevronDown size={24} />
// 					</Button>
// 				)}

// 				{/* Short position indicator */}
// 				<div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-1">
// 					{shorts.slice(Math.max(0, activeShortIndex - 2), Math.min(shorts.length, activeShortIndex + 3)).map((_, idx) => {
// 						const actualIndex = Math.max(0, activeShortIndex - 2) + idx;
// 						return (
// 							<div
// 								key={`indicator-${actualIndex}`}
// 								className={`h-1 rounded-full transition-all ${actualIndex === activeShortIndex ? "w-6 bg-white" : "w-3 bg-white/40"}`}
// 							></div>
// 						);
// 					})}
// 				</div>

// 				{/* Comments slide-up panel */}
// 				<ShortComments isOpen={isCommentsOpen} onOpenChange={setIsCommentsOpen} shortId={shorts[activeShortIndex].id} />
// 			</div>
// 		</div>
// 	);
// };

// export default ShortViewer;

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	ChevronUp,
	ChevronDown,
	ThumbsUp,
	ThumbsDown,
	MessageSquare,
	Share2,
	MoreVertical,
	Play,
	Volume2,
	Maximize,
	X,
	Bookmark,
	MonitorSmartphone,
	Flag,
	MessageCircle,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import ShortComments from "./ShortComments";

type ShortViewerProps = {
	shorts: any[];
	activeShortIndex: number;
	onClose: () => void;
	onNext: () => void;
	onPrevious: () => void;
};

const ShortViewer = ({ shorts, activeShortIndex, onClose, onNext, onPrevious }: ShortViewerProps) => {
	const { toast } = useToast();
	const shortContainerRef = useRef<HTMLDivElement>(null);
	const touchStartY = useRef<number | null>(null);
	const touchEndY = useRef<number | null>(null);
	const [isSwiping, setIsSwiping] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [isCommentsOpen, setIsCommentsOpen] = useState(false);
	const [showMoreOptions, setShowMoreOptions] = useState(false);
	const [ambientMode, setAmbientMode] = useState(false);

	// Hide controls after a delay unless comments or more options are open
	useEffect(() => {
		const timer = setTimeout(() => {
			if (!isCommentsOpen && !showMoreOptions) {
				setShowControls(false);
			}
		}, 3000);
		return () => clearTimeout(timer);
	}, [activeShortIndex, isCommentsOpen, showMoreOptions]);

	// Like handler
	const handleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		toast({ title: "Liked short!", description: "You liked this short video." });
	};

	// Dislike handler
	const handleDislike = (e: React.MouseEvent) => {
		e.stopPropagation();
		toast({ title: "Disliked short", description: "You disliked this short video." });
	};

	// Toggle comments
	const handleCommentsToggle = (e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		setIsCommentsOpen(!isCommentsOpen);
	};

	// Share handler
	const handleShare = (e: React.MouseEvent) => {
		e.stopPropagation();
		toast({ title: "Share options", description: "Share options would appear here." });
	};

	// Subscribe handler
	const handleSubscribe = (e: React.MouseEvent) => {
		e.stopPropagation();
		toast({
			title: "Subscribed!",
			description: `You've subscribed to ${shorts[activeShortIndex].channelName}.`,
		});
	};

	// Toggle more options menu
	const handleMoreOptionsToggle = (e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		setShowMoreOptions(!showMoreOptions);
	};

	// Save to playlist
	const handleSaveToPlaylist = (e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		setShowMoreOptions(false);
		toast({ title: "Saved to playlist", description: "This short has been saved to your playlist." });
	};

	// Ambient mode toggle
	const toggleAmbientMode = (e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		setAmbientMode(!ambientMode);
	};

	// Report handler
	const handleReport = (e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		setShowMoreOptions(false);
		toast({ title: "Report submitted", description: "Thank you for your feedback." });
	};

	// Touch handlers for mobile swipe navigation
	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartY.current = e.touches[0].clientY;
		setIsSwiping(true);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isSwiping) return;
		touchEndY.current = e.touches[0].clientY;
		if (touchStartY.current !== null && touchEndY.current !== null) {
			const diff = touchStartY.current - touchEndY.current;
			if (Math.abs(diff) > 50) {
				setShowControls(true);
			}
		}
	};

	const handleTouchEnd = () => {
		if (touchStartY.current !== null && touchEndY.current !== null) {
			const diff = touchStartY.current - touchEndY.current;
			if (Math.abs(diff) > 100) {
				if (diff > 0) onNext();
				else onPrevious();
			}
		}
		touchStartY.current = null;
		touchEndY.current = null;
		setIsSwiping(false);
	};

	// Handle wheel scroll (desktop)
	const handleWheel = (e: React.WheelEvent) => {
		if (e.deltaY > 0) onNext();
		else onPrevious();
	};

	// Handle video area click to toggle controls
	const handleContentClick = () => {
		if (isCommentsOpen || showMoreOptions) {
			setIsCommentsOpen(false);
			setShowMoreOptions(false);
			return;
		}
		setShowControls((prev) => !prev);
	};

	return (
		<div
			className="fixed inset-0 bg-black z-50 flex flex-col items-center"
			onWheel={handleWheel}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onClick={handleContentClick}
			ref={shortContainerRef}
			onMouseEnter={() => setShowControls(true)}
			onMouseLeave={() => {
				if (!isCommentsOpen && !showMoreOptions) setShowControls(false);
			}}
		>
			{/* Short Video Area */}
			<div className="relative w-full h-full max-w-md mx-auto flex flex-col">
				<div className={`relative flex-1 bg-gray-900 ${ambientMode ? "bg-opacity-70" : ""}`}>
					<img
						src={shorts[activeShortIndex].thumbnail}
						alt={shorts[activeShortIndex].title}
						className={`w-full h-full object-cover ${ambientMode ? "blur-sm" : ""}`}
					/>

					{/* Top Control Bar */}
					<div
						className={`absolute top-0 left-0 right-0 px-4 py-2 flex justify-between transition-opacity duration-300 ${
							showControls ? "opacity-100" : "opacity-0"
						}`}
					>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full bg-black/50 text-white hover:bg-black/70"
							onClick={(e) => {
								e.stopPropagation();
								onClose();
							}}
						>
							<X size={20} />
						</Button>

						<div className="flex space-x-2">
							<Button variant="ghost" size="icon" className="text-white" onClick={(e) => e.stopPropagation()}>
								<Play size={20} />
							</Button>
							<Button variant="ghost" size="icon" className="text-white" onClick={(e) => e.stopPropagation()}>
								<Volume2 size={20} />
							</Button>
							<Button variant="ghost" size="icon" className="text-white" onClick={(e) => e.stopPropagation()}>
								<Maximize size={20} />
							</Button>
						</div>
					</div>

					{/* Bottom Controls */}
					<div
						className={`absolute bottom-20 right-4 flex flex-col gap-6 items-center transition-opacity duration-300 ${
							showControls ? "opacity-100" : "opacity-0"
						}`}
					>
						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleLike}>
							<ThumbsUp size={20} />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleDislike}>
							<ThumbsDown size={20} />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleCommentsToggle}>
							<MessageSquare size={20} />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleShare}>
							<Share2 size={20} />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full bg-black/50 text-white hover:bg-black/70" onClick={handleMoreOptionsToggle}>
							<MoreVertical size={20} />
						</Button>
						<Avatar className="h-9 w-9 border border-white">
							<img src={shorts[activeShortIndex].channelAvatar} alt={shorts[activeShortIndex].channelName} />
						</Avatar>
					</div>

					{/* Swipe Indicator Overlays */}
					{isSwiping && touchStartY.current !== null && touchEndY.current !== null && (
						<>
							{touchStartY.current - touchEndY.current > 50 && (
								<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
									<ChevronDown className="w-16 h-16 text-white/80" />
								</div>
							)}
							{touchEndY.current - touchStartY.current > 50 && (
								<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
									<ChevronUp className="w-16 h-16 text-white/80" />
								</div>
							)}
						</>
					)}

					{/* More Options Menu */}
					{showMoreOptions && (
						<div className="absolute right-16 bottom-40 bg-black/90 rounded-lg p-2 min-w-[240px]" onClick={(e) => e.stopPropagation()}>
							<div className="flex flex-col text-white">
								<button className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md text-left">
									<MessageCircle className="h-5 w-5" /> <span>Description</span>
								</button>
								<button className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md text-left" onClick={handleSaveToPlaylist}>
									<Bookmark className="h-5 w-5" /> <span>Save to playlist</span>
								</button>
								<div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md">
									<MonitorSmartphone className="h-5 w-5" />
									<span className="flex-1">Ambient mode</span>
									<Switch checked={ambientMode} onCheckedChange={toggleAmbientMode} />
								</div>
								<button className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-md text-left" onClick={handleReport}>
									<Flag className="h-5 w-5" /> <span>Report</span>
								</button>
							</div>
						</div>
					)}

					{/* Navigation Arrows */}
					{activeShortIndex > 0 && showControls && (
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full bg-black/60 text-white hover:bg-black/80 shadow-lg"
							onClick={(e) => {
								e.stopPropagation();
								onPrevious();
							}}
						>
							<ChevronUp size={24} />
						</Button>
					)}
					{activeShortIndex < shorts.length - 1 && showControls && (
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-1/2 bottom-28 -translate-x-1/2 rounded-full bg-black/60 text-white hover:bg-black/80 shadow-lg"
							onClick={(e) => {
								e.stopPropagation();
								onNext();
							}}
						>
							<ChevronDown size={24} />
						</Button>
					)}

					{/* Short Position Indicator */}
					<div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-1">
						{shorts.slice(Math.max(0, activeShortIndex - 2), Math.min(shorts.length, activeShortIndex + 3)).map((_, idx) => {
							const actualIndex = Math.max(0, activeShortIndex - 2) + idx;
							return (
								<div
									key={`indicator-${actualIndex}`}
									className={`h-1 rounded-full transition-all ${actualIndex === activeShortIndex ? "w-6 bg-white" : "w-3 bg-white/40"}`}
								/>
							);
						})}
					</div>
				</div>

				{/* Comments Panel */}
				<ShortComments isOpen={isCommentsOpen} onOpenChange={setIsCommentsOpen} shortId={shorts[activeShortIndex].id} />
			</div>
		</div>
	);
};

export default ShortViewer;
