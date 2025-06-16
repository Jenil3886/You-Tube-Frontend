import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Volume1, Maximize, Shrink, Settings, MonitorPlay } from "lucide-react";
import { BiSolidVolumeMute } from "react-icons/bi";
import { VideoControlsProps } from "@/types";

export const VideoControls: React.FC<VideoControlsProps> = ({
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
	handleMiniPlayer,
	isSaved,
	saveForLater,
	hoveredTime,
	hoveredThumbnail,
	handleHover,
}) => {
	const [isVolumeVisible, setIsVolumeVisible] = useState<boolean>(false);
	const bufferedPercentage = useMemo(() => (duration ? (bufferedEnd / duration) * 100 : 0), [bufferedEnd, duration]);
	const playedPercentage = useMemo(() => (duration ? (currentTime / duration) * 100 : 0), [currentTime, duration]);
	const fillPercent = isMuted ? 0 : volume * 100;

	const formatTime = (time: number): string => {
		if (!time || isNaN(time)) return "00:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	};

	return (
		<>
			<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<div className="relative w-full h-1 hover:h-[6px] bg-gray-700 rounded-full overflow-hidden cursor-pointer mb-2">
					<div className="absolute top-0 left-0 h-full bg-gray-500" style={{ width: `${bufferedPercentage}%` }} />
					<div className="absolute top-0 left-0 h-full bg-white/70" style={{ width: `${(hoveredTime ? hoveredTime / duration : 0) * 100}%` }} />
					<div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${playedPercentage}%` }} />
					<input
						type="range"
						min="0"
						max={duration || 0}
						value={currentTime}
						onChange={handleSeek}
						onMouseMove={handleHover}
						onMouseLeave={() => {}}
						className="absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
					/>
				</div>
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
							left: `${Math.min(Math.max((hoveredTime ? hoveredTime / duration : 0) * 100, 2.00277), 77.9011)}%`,
						}}
					/>
				)}
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
								style={{ background: `linear-gradient(to right, white ${fillPercent}%, #3b3b3b ${fillPercent}%)` }}
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
						<Button variant="ghost" size="icon" onClick={handleMiniPlayer}>
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
		</>
	);
};
