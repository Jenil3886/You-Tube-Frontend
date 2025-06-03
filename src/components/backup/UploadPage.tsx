// import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Globe, Lock, Settings, UploadCloud, Users } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from "axios";
// import { apiurl } from "@/constants";

// const UploadPage = () => {
// 	const [videoTitle, setVideoTitle] = useState("");
// 	const [videoDescription, setVideoDescription] = useState("");
// 	const [privacy, setPrivacy] = useState("public");
// 	const [uploading, setUploading] = useState(false);
// 	const [videoFile, setVideoFile] = useState<File | null>(null);
// 	const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
// 	const [thumbnailPreview, setThumbnailPreview] = useState("");
// 	const [videoDuration, setVideoDuration] = useState("");
// 	const [currentMessage, setCurrentMessage] = useState(0);

// 	const { toast } = useToast();

// 	// Motivational messages for the loader
// 	const messages = [
// 		"Crafting your video experience...",
// 		"Transmitting to the cloud...",
// 		"Polishing your masterpiece...",
// 		"Syncing with the universe...",
// 	];

// 	// Cycle through messages every 2.5 seconds
// 	useEffect(() => {
// 		if (uploading) {
// 			const interval = setInterval(() => {
// 				setCurrentMessage((prev) => (prev + 1) % messages.length);
// 			}, 2500);
// 			return () => clearInterval(interval);
// 		}
// 	}, [uploading]);

// 	// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 	// 	if (e.target.files && e.target.files[0]) {
// 	// 		setVideoFile(e.target.files[0]);
// 	// 		toast({
// 	// 			title: "Video selected",
// 	// 			description: `${e.target.files[0].name} (${(e.target.files[0].size / 1024 / 1024).toFixed(2)} MB)`,
// 	// 		});
// 	// 	}
// 	// };

// 	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files && e.target.files[0]) {
// 			const selectedFile = e.target.files[0];
// 			setVideoFile(selectedFile);
// 			try {
// 				const duration = await getVideoDuration(selectedFile);
// 				setVideoDuration(duration); // Auto set duration
// 				toast({
// 					title: "Video selected",
// 					description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB), Duration: ${duration}`,
// 				});
// 			} catch (err) {
// 				toast({
// 					title: "Failed to read duration",
// 					description: "Please enter the duration manually.",
// 					variant: "destructive",
// 				});
// 			}
// 		}
// 	};

// 	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files && e.target.files[0]) {
// 			const file = e.target.files[0];
// 			setThumbnailFile(file);
// 			const reader = new FileReader();
// 			reader.onloadend = () => {
// 				setThumbnailPreview(reader.result as string);
// 			};
// 			reader.readAsDataURL(file);
// 		}
// 	};

// 	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 	};

// 	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// 			setVideoFile(e.dataTransfer.files[0]);
// 			toast({
// 				title: "Video selected",
// 				description: `${e.dataTransfer.files[0].name} (${(e.dataTransfer.files[0].size / 1024 / 1024).toFixed(2)} MB)`,
// 			});
// 		}
// 	};

// 	const handleCancelUpload = () => {
// 		setUploading(false);
// 		toast({
// 			title: "Upload cancelled",
// 			description: "The video upload has been stopped.",
// 		});
// 	};

// 	const getVideoDuration = (file: File): Promise<string> => {
// 		return new Promise((resolve, reject) => {
// 			const video = document.createElement("video");
// 			video.preload = "metadata";
// 			video.onloadedmetadata = () => {
// 				window.URL.revokeObjectURL(video.src); // Clean up memory
// 				const durationInSeconds = video.duration;
// 				const minutes = Math.floor(durationInSeconds / 60);
// 				const seconds = Math.floor(durationInSeconds % 60);
// 				resolve(`${minutes}:${seconds.toString().padStart(2, "0")}`);
// 			};
// 			video.onerror = (e) => {
// 				reject("Error reading video metadata");
// 			};
// 			video.src = URL.createObjectURL(file);
// 		});
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		// if (!videoFile || !videoDuration) {
// 		// 	toast({
// 		// 		title: "Missing fields",
// 		// 		description: "Please provide a video file and duration",
// 		// 		variant: "destructive",
// 		// 	});
// 		// 	return;
// 		// }
// 		if (!videoFile) {
// 			toast({
// 				title: "Missing fields",
// 				description: "Please provide a video file and duration",
// 				variant: "destructive",
// 			});
// 			return;
// 		}

// 		setUploading(true);
// 		try {
// 			const formData = new FormData();
// 			formData.append("title", videoTitle);
// 			formData.append("description", videoDescription);
// 			formData.append("privacy", privacy);
// 			formData.append("videoFile", videoFile);
// 			formData.append("duration", videoDuration);
// 			if (thumbnailFile) {
// 				formData.append("thumbnail", thumbnailFile);
// 			}

// 			const response = await axios.post(`${apiurl}/videos`, formData, {
// 				headers: {
// 					"Content-Type": "multipart/form-data",
// 				},
// 				withCredentials: true,
// 			});

// 			toast({
// 				title: "Upload successful",
// 				description: `Your video "${response.data.data.title}" has been uploaded successfully.`,
// 			});
// 			setVideoTitle("");
// 			setVideoDescription("");
// 			setVideoFile(null);
// 			setThumbnailFile(null);
// 			setThumbnailPreview("");
// 			setVideoDuration("");
// 		} catch (error: any) {
// 			toast({
// 				title: "Upload failed",
// 				description: error.response?.data?.error || "An error occurred during the upload process.",
// 				variant: "destructive",
// 			});
// 		} finally {
// 			setUploading(false);
// 		}
// 	};

// 	return (
// 		<div className="container max-w-4xl mx-auto py-8">
// 			<Card>
// 				<CardHeader>
// 					<CardTitle className="text-2xl">Upload video</CardTitle>
// 					<CardDescription>Upload a video to share with your audience</CardDescription>
// 				</CardHeader>

// 				{uploading && (
// 					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
// 						{/* Particle Background */}
// 						<div className="absolute inset-0 overflow-hidden">
// 							<div className="particle" />
// 							<div className="particle" />
// 							<div className="particle" />
// 							<div className="particle" />
// 						</div>
// 						<div className="relative flex flex-col items-center p-10 bg-gray-900/95 rounded-2xl shadow-2xl shadow-cyan-500/50 max-w-md w-full animate-zoom-in">
// 							{/* 3D Rotating Cube */}
// 							<div className="cube-wrapper mb-6">
// 								<div className="cube">
// 									<div className="face front bg-cyan-500/80" />
// 									<div className="face back bg-cyan-500/80" />
// 									<div className="face right bg-cyan-500/80" />
// 									<div className="face left bg-cyan-500/80" />
// 									<div className="face top bg-cyan-500/80" />
// 									<div className="face bottom bg-cyan-500/80" />
// 								</div>
// 							</div>
// 							<h2 className="text-2xl font-bold text-white mb-3 animate-text-glow">{messages[currentMessage]}</h2>
// 							<p className="text-sm text-gray-400 text-center mb-6">Your video is being processed with cutting-edge tech. Stay tuned!</p>
// 							<Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20" onClick={handleCancelUpload}>
// 								Cancel Upload
// 							</Button>
// 						</div>
// 					</div>
// 				)}

// 				<form onSubmit={handleSubmit}>
// 					<CardContent className="space-y-6">
// 						{!videoFile ? (
// 							<div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center" onDragOver={handleDragOver} onDrop={handleDrop}>
// 								<div className="flex flex-col items-center">
// 									<UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
// 									<h3 className="text-lg font-medium mb-2">Drag and drop video files to upload</h3>
// 									<p className="text-sm text-gray-500 mb-4">Your videos will be private until you publish them</p>
// 									<label className="cursor-pointer">
// 										<span className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">SELECT FILES</span>
// 										<Input type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
// 									</label>
// 								</div>
// 							</div>
// 						) : (
// 							<>
// 								<div className="space-y-4">
// 									<div>
// 										<label className="block text-sm font-medium mb-1">Title (required)</label>
// 										<Input
// 											value={videoTitle}
// 											onChange={(e) => setVideoTitle(e.target.value)}
// 											placeholder="Add a title that describes your video"
// 											required
// 										/>
// 									</div>

// 									<div>
// 										<label className="block text-sm font-medium mb-1">Description</label>
// 										<Textarea
// 											value={videoDescription}
// 											onChange={(e) => setVideoDescription(e.target.value)}
// 											placeholder="Tell viewers about your video"
// 											rows={5}
// 										/>
// 									</div>

// 									{/* <div>
// 										<label className="block text-sm font-medium mb-1">Duration (required)</label>
// 										<Input type="text" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} placeholder="e.g., 10:15" required />
// 									</div> */}

// 									{videoFile && (
// 										<div className="text-sm text-gray-600">
// 											Detected Duration: <span className="font-medium">{videoDuration}</span>
// 										</div>
// 									)}

// 									<div>
// 										<label className="block text-sm font-medium mb-1">Thumbnail</label>
// 										<div className="flex items-center gap-4">
// 											<div className="relative w-40 h-24 miraculously bg-gray-100 rounded-md overflow-hidden">
// 												{thumbnailPreview ? (
// 													<img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
// 												) : (
// 													<div className="flex items-center justify-center h-full">
// 														<span className="text-xs text-gray-500">No thumbnail</span>
// 													</div>
// 												)}
// 											</div>
// 											<label className="cursor-pointer">
// 												<span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition">Upload thumbnail</span>
// 												<Input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
// 											</label>
// 										</div>
// 									</div>

// 									<div>
// 										<label className="block text-sm font-medium mb-1">Visibility</label>
// 										<div className="space-y-2">
// 											<div className="flex items-center p-3 border rounded-md">
// 												<input
// 													type="radio"
// 													id="public"
// 													name="privacy"
// 													value="public"
// 													checked={privacy === "public"}
// 													onChange={() => setPrivacy("public")}
// 													className="mr-3"
// 												/>
// 												<label htmlFor="public" className="flex items-center">
// 													<Globe className="w-5 h-5 mr-2" />
// 													<div>
// 														<div className="font-medium">Public</div>
// 														<div className="text-sm text-gray-500">Everyone can watch your video</div>
// 													</div>
// 												</label>
// 											</div>

// 											<div className="flex items-center p-3 border rounded-md">
// 												<input
// 													type="radio"
// 													id="unlisted"
// 													name="privacy"
// 													value="unlisted"
// 													checked={privacy === "unlisted"}
// 													onChange={() => setPrivacy("unlisted")}
// 													className="mr-3"
// 												/>
// 												<label htmlFor="unlisted" className="flex items-center">
// 													<Users className="w-5 h-5 mr-2" />
// 													<div>
// 														<div className="font-medium">Unlisted</div>
// 														<div className="text-sm text-gray-500">Anyone with the link can watch</div>
// 													</div>
// 												</label>
// 											</div>

// 											<div className="flex items-center p-3 border rounded-md">
// 												<input
// 													type="radio"
// 													id="private"
// 													name="privacy"
// 													value="private"
// 													checked={privacy === "private"}
// 													onChange={() => setPrivacy("private")}
// 													className="mr-3"
// 												/>
// 												<label htmlFor="private" className="flex items-center">
// 													<Lock className="w-5 h-5 mr-2" />
// 													<div>
// 														<div className="font-medium">Private</div>
// 														<div className="text-sm text-gray-500">Only you can watch</div>
// 													</div>
// 												</label>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</>
// 						)}
// 					</CardContent>

// 					{videoFile && (
// 						<CardFooter className="border-t p-4 flex justify-between items-center">
// 							<Button variant="outline" type="button">
// 								<Settings className="w-4 h-4 mr-2" />
// 								Advanced settings
// 							</Button>
// 							<div className="flex gap-3">
// 								<Button variant="outline" type="button">
// 									Save draft
// 								</Button>
// 								<Button type="submit" disabled={!videoTitle || uploading}>
// 									{uploading ? "Uploading..." : "Upload"}
// 								</Button>
// 							</div>
// 						</CardFooter>
// 					)}
// 				</form>
// 			</Card>

// 			{/* Inline CSS for animations and particle effects */}
// 			<style jsx>{`
// 				/* Particle Background */
// 				.particle {
// 					position: absolute;
// 					border-radius: 50%;
// 					background: rgba(0, 255, 255, 0.4);
// 					animation: particle-move 10s infinite ease-in-out;
// 					pointer-events: none;
// 				}
// 				.particle:nth-child(1) {
// 					width: 20px;
// 					height: 20px;
// 					top: 10%;
// 					left: 20%;
// 					animation-delay: 0s;
// 				}
// 				.particle:nth-child(2) {
// 					width: 15px;
// 					height: 15px;
// 					top: 50%;
// 					left: 70%;
// 					animation-delay: 2s;
// 				}
// 				.particle:nth-child(3) {
// 					width: 25px;
// 					height: 25px;
// 					top: 80%;
// 					left: 30%;
// 					animation-delay: 4s;
// 				}
// 				.particle:nth-child(4) {
// 					width: 10px;
// 					height: 10px;
// 					top: 30%;
// 					left: 90%;
// 					animation-delay: 6s;
// 				}
// 				@keyframes particle-move {
// 					0%,
// 					100% {
// 						transform: translateY(0) scale(1);
// 						opacity: 0.8;
// 					}
// 					50% {
// 						transform: translateY(-50px) scale(1.5);
// 						opacity: 0.3;
// 					}
// 				}

// 				/* 3D Cube Animation */
// 				.cube-wrapper {
// 					perspective: 1000px;
// 					width: 80px;
// 					height: 80px;
// 				}
// 				.cube {
// 					position: relative;
// 					width: 100%;
// 					height: 100%;
// 					transform-style: preserve-3d;
// 					animation: cube-spin 6s linear infinite;
// 				}
// 				.face {
// 					position: absolute;
// 					width: 80px;
// 					height: 80px;
// 					border: 2px solid rgba(0, 255, 255, 0.8);
// 					box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
// 				}
// 				.front {
// 					transform: translateZ(40px);
// 				}
// 				.back {
// 					transform: translateZ(-40px) rotateY(180deg);
// 				}
// 				.right {
// 					transform: rotateY(90deg) translateZ(40px);
// 				}
// 				.left {
// 					transform: rotateY(-90deg) translateZ(40px);
// 				}
// 				.top {
// 					transform: rotateX(90deg) translateZ(40px);
// 				}
// 				.bottom {
// 					transform: rotateX(-90deg) translateZ(40px);
// 				}
// 				@keyframes cube-spin {
// 					0% {
// 						transform: rotateX(0deg) rotateY(0deg);
// 					}
// 					100% {
// 						transform: rotateX(360deg) rotateY(360deg);
// 					}
// 				}

// 				/* Text Glow Animation */
// 				@keyframes text-glow {
// 					0%,
// 					100% {
// 						text-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3);
// 					}
// 					50% {
// 						text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5);
// 					}
// 				}
// 				.animate-text-glow {
// 					animation: text-glow 2s ease-in-out infinite;
// 				}

// 				/* Zoom In Animation */
// 				@keyframes zoom-in {
// 					0% {
// 						opacity: 0;
// 						transform: scale(0.8);
// 					}
// 					100% {
// 						opacity: 1;
// 						transform: scale(1);
// 					}
// 				}
// 				.animate-zoom-in {
// 					animation: zoom-in 0.6s ease-out;
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default UploadPage;

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Globe, Lock, Settings, UploadCloud, Users } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from "axios";
// import { apiurl } from "@/constants";
// import { io, Socket } from "socket.io-client";

// const socket = io("http://localhost:8000", {
// 	transports: ["websocket"], // Agar polling na chale to websocket force karein
// 	reconnection: true,
// 	reconnectionAttempts: Infinity,
// 	randomizationFactor: 0.5,
// 	auth: {
// 		token: localStorage.getItem("token") || "",
// 	},
// });
// const UploadPage = () => {
// 	const [videoTitle, setVideoTitle] = useState("");
// 	const [videoDescription, setVideoDescription] = useState("");
// 	const [privacy, setPrivacy] = useState("public");
// 	const [uploading, setUploading] = useState(false);
// 	const [videoFile, setVideoFile] = useState(null);
// 	const [thumbnailFile, setThumbnailFile] = useState(null);
// 	const [thumbnailPreview, setThumbnailPreview] = useState("");
// 	const [videoDuration, setVideoDuration] = useState("");
// 	const [currentMessage, setCurrentMessage] = useState(0);
// 	const [progress, setProgress] = useState(0);
// 	const [status, setStatus] = useState("");
// 	const [socketId, setSocketId] = useState("");

// 	const { toast } = useToast();

// 	const messages = [
// 		"Crafting your video experience...",
// 		"Transmitting to the cloud...",
// 		"Polishing your masterpiece...",
// 		"Syncing with the universe...",
// 	];

// 	useEffect(() => {
// 		if (uploading) {
// 			const interval = setInterval(() => {
// 				setCurrentMessage((prev) => (prev + 1) % messages.length);
// 			}, 2500);
// 			return () => clearInterval(interval);
// 		}
// 	}, [uploading]);

// 	// Socket setup
// 	useEffect(() => {
// 		socket.on("connect", () => {
// 			setSocketId(socket.id);
// 		});

// 		socket.on("uploadProgress", ({ percent, status }) => {
// 			setProgress(percent);
// 			setStatus(status);
// 		});

// 		socket.on("uploadComplete", (data) => {
// 			toast({
// 				title: "Success",
// 				description: data.message || "Video uploaded successfully!",
// 			});
// 		});

// 		socket.on("uploadError", (error) => {
// 			toast({
// 				title: "Upload Failed",
// 				description: error.message || "Something went wrong during upload.",
// 				variant: "destructive",
// 			});
// 		});

// 		return () => {
// 			socket.off("uploadProgress");
// 			socket.off("uploadComplete");
// 			socket.off("uploadError");
// 		};
// 	}, []);

// 	const getVideoDuration = (file: File): Promise<string> => {
// 		return new Promise((resolve, reject) => {
// 			const video = document.createElement("video");
// 			video.preload = "metadata";
// 			video.onloadedmetadata = () => {
// 				window.URL.revokeObjectURL(video.src); // Clean up memory
// 				const durationInSeconds = video.duration;
// 				const minutes = Math.floor(durationInSeconds / 60);
// 				const seconds = Math.floor(durationInSeconds % 60);
// 				resolve(`${minutes}:${seconds.toString().padStart(2, "0")}`);
// 			};
// 			video.onerror = (e) => {
// 				reject("Error reading video metadata");
// 			};
// 			video.src = URL.createObjectURL(file);
// 		});
// 	};

// 	const handleFileChange = async (e) => {
// 		if (e.target.files && e.target.files[0]) {
// 			const selectedFile = e.target.files[0];
// 			setVideoFile(selectedFile);
// 			try {
// 				const duration = await getVideoDuration(selectedFile);
// 				setVideoDuration(duration);
// 				toast({
// 					title: "Video selected",
// 					description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB), Duration: ${duration}`,
// 				});
// 			} catch (err) {
// 				toast({
// 					title: "Failed to read duration",
// 					description: "Please enter the duration manually.",
// 					variant: "destructive",
// 				});
// 			}
// 		}
// 	};

// 	const handleThumbnailChange = (e) => {
// 		if (e.target.files && e.target.files[0]) {
// 			const file = e.target.files[0];
// 			setThumbnailFile(file);
// 			const reader = new FileReader();
// 			reader.onloadend = () => {
// 				setThumbnailPreview(reader.result);
// 			};
// 			reader.readAsDataURL(file);
// 		}
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!videoFile) {
// 			toast({
// 				title: "Missing fields",
// 				description: "Please provide a video file",
// 				variant: "destructive",
// 			});
// 			return;
// 		}

// 		setUploading(true);

// 		try {
// 			const formData = new FormData();
// 			formData.append("title", videoTitle);
// 			formData.append("description", videoDescription);
// 			formData.append("privacy", privacy);
// 			formData.append("videoFile", videoFile);
// 			formData.append("duration", videoDuration);
// 			if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
// 			formData.append("socketId", socketId); // Pass socket ID

// 			const response = await axios.post(`${apiurl}/videos`, formData, {
// 				headers: {
// 					"Content-Type": "multipart/form-data",
// 				},
// 				withCredentials: true,
// 			});

// 			toast({
// 				title: "Upload successful",
// 				description: `Your video "${response.data.data.title}" has been uploaded successfully.`,
// 			});

// 			// Reset form
// 			setVideoTitle("");
// 			setVideoDescription("");
// 			setVideoFile(null);
// 			setThumbnailFile(null);
// 			setThumbnailPreview("");
// 			setVideoDuration("");
// 		} catch (error) {
// 			toast({
// 				title: "Upload failed",
// 				description: error.response?.data?.error || "An error occurred during the upload process.",
// 				variant: "destructive",
// 			});
// 		} finally {
// 			setUploading(false);
// 		}
// 	};

// 	return (
// 		<div className="container max-w-4xl mx-auto py-8">
// 			<Card>
// 				<CardHeader>
// 					<CardTitle className="text-2xl">Upload Video</CardTitle>
// 					<CardDescription>Upload a video to share with your audience</CardDescription>
// 				</CardHeader>

// 				{/* Loader Modal */}
// 				{uploading && (
// 					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
// 						<div className="relative flex flex-col items-center p-10 bg-gray-900/95 rounded-2xl shadow-2xl shadow-cyan-500/50 max-w-md w-full animate-zoom-in">
// 							<h2 className="text-2xl font-bold text-white mb-3">{messages[currentMessage]}</h2>
// 							<p className="text-sm text-gray-400 text-center mb-6">Your video is being processed with cutting-edge tech. Stay tuned!</p>

// 							{/* Progress Bar */}
// 							<div className="w-full bg-gray-700 rounded-full h-2 mb-4">
// 								<div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
// 							</div>

// 							<p className="text-xs text-gray-300 mb-6">{status}</p>

// 							<Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20" onClick={() => setUploading(false)}>
// 								Cancel Upload
// 							</Button>
// 						</div>
// 					</div>
// 				)}

// 				<form onSubmit={handleSubmit}>
// 					<CardContent className="space-y-6">
// 						{!videoFile ? (
// 							<div
// 								className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
// 								onDragOver={(e) => e.preventDefault()}
// 								onDrop={(e) => {
// 									e.preventDefault();
// 									if (e.dataTransfer.files[0]) {
// 										setVideoFile(e.dataTransfer.files[0]);
// 									}
// 								}}
// 							>
// 								<div className="flex flex-col items-center">
// 									<UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
// 									<h3 className="text-lg font-medium mb-2">Drag and drop video files to upload</h3>
// 									<p className="text-sm text-gray-500 mb-4">Your videos will be private until you publish them</p>
// 									<label className="cursor-pointer">
// 										<span className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">SELECT FILES</span>
// 										<Input type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
// 									</label>
// 								</div>
// 							</div>
// 						) : (
// 							<>
// 								<div className="space-y-4">
// 									<div>
// 										<label className="block text-sm font-medium mb-1">Title (required)</label>
// 										<Input
// 											value={videoTitle}
// 											onChange={(e) => setVideoTitle(e.target.value)}
// 											placeholder="Add a title that describes your video"
// 											required
// 										/>
// 									</div>
// 									<div>
// 										<label className="block text-sm font-medium mb-1">Description</label>
// 										<Textarea
// 											value={videoDescription}
// 											onChange={(e) => setVideoDescription(e.target.value)}
// 											placeholder="Tell viewers about your video"
// 											rows={5}
// 										/>
// 									</div>
// 									{videoFile && (
// 										<div className="text-sm text-gray-600">
// 											Detected Duration: <span className="font-medium">{videoDuration}</span>
// 										</div>
// 									)}
// 									<div>
// 										<label className="block text-sm font-medium mb-1">Thumbnail</label>
// 										<div className="flex items-center gap-4">
// 											<div className="relative w-40 h-24 bg-gray-100 rounded-md overflow-hidden">
// 												{thumbnailPreview ? (
// 													<img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
// 												) : (
// 													<div className="flex items-center justify-center h-full">
// 														<span className="text-xs text-gray-500">No thumbnail</span>
// 													</div>
// 												)}
// 											</div>
// 											<label className="cursor-pointer">
// 												<span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition">Upload thumbnail</span>
// 												<Input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
// 											</label>
// 										</div>
// 									</div>
// 									<div>
// 										<label className="block text-sm font-medium mb-1">Visibility</label>
// 										<div className="space-y-2">
// 											<div className="flex items-center p-3 border rounded-md">
// 												<input
// 													type="radio"
// 													id="public"
// 													name="privacy"
// 													value="public"
// 													checked={privacy === "public"}
// 													onChange={() => setPrivacy("public")}
// 													className="mr-3"
// 												/>
// 												<label htmlFor="public" className="flex items-center">
// 													<Globe className="w-5 h-5 mr-2" />
// 													<div>
// 														<div className="font-medium">Public</div>
// 														<div className="text-sm text-gray-500">Everyone can watch your video</div>
// 													</div>
// 												</label>
// 											</div>
// 											<div className="flex items-center p-3 border rounded-md">
// 												<input
// 													type="radio"
// 													id="unlisted"
// 													name="privacy"
// 													value="unlisted"
// 													checked={privacy === "unlisted"}
// 													onChange={() => setPrivacy("unlisted")}
// 													className="mr-3"
// 												/>
// 												<label htmlFor="unlisted" className="flex items-center">
// 													<Users className="w-5 h-5 mr-2" />
// 													<div>
// 														<div className="font-medium">Unlisted</div>
// 														<div className="text-sm text-gray-500">Anyone with the link can watch</div>
// 													</div>
// 												</label>
// 											</div>
// 											<div className="flex items-center p-3 border rounded-md">
// 												<input
// 													type="radio"
// 													id="private"
// 													name="privacy"
// 													value="private"
// 													checked={privacy === "private"}
// 													onChange={() => setPrivacy("private")}
// 													className="mr-3"
// 												/>
// 												<label htmlFor="private" className="flex items-center">
// 													<Lock className="w-5 h-5 mr-2" />
// 													<div>
// 														<div className="font-medium">Private</div>
// 														<div className="text-sm text-gray-500">Only you can watch</div>
// 													</div>
// 												</label>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</>
// 						)}
// 					</CardContent>
// 					{videoFile && (
// 						<CardFooter className="border-t p-4 flex justify-between items-center">
// 							<Button variant="outline" type="button">
// 								<Settings className="w-4 h-4 mr-2" />
// 								Advanced settings
// 							</Button>
// 							<div className="flex gap-3">
// 								<Button variant="outline" type="button">
// 									Save draft
// 								</Button>
// 								<Button type="submit" disabled={!videoTitle || uploading}>
// 									{uploading ? "Uploading..." : "Upload"}
// 								</Button>
// 							</div>
// 						</CardFooter>
// 					)}
// 				</form>
// 			</Card>
// 		</div>
// 	);
// };

// export default UploadPage;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Lock, Settings, UploadCloud, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { apiurl } from "@/constants";

const UploadPage = () => {
	const [videoTitle, setVideoTitle] = useState("");
	const [videoDescription, setVideoDescription] = useState("");
	const [privacy, setPrivacy] = useState("public");
	const [uploading, setUploading] = useState(false);
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
	const [thumbnailPreview, setThumbnailPreview] = useState("");
	const [videoDuration, setVideoDuration] = useState("");
	const [currentMessage, setCurrentMessage] = useState(0);

	const { toast } = useToast();

	// Motivational messages for the loader
	const messages = [
		"Crafting your video experience...",
		"Transmitting to the cloud...",
		"Polishing your masterpiece...",
		"Syncing with the universe...",
	];

	// Cycle through messages every 2.5 seconds
	useEffect(() => {
		if (uploading) {
			const interval = setInterval(() => {
				setCurrentMessage((prev) => (prev + 1) % messages.length);
			}, 2500);
			return () => clearInterval(interval);
		}
	}, [uploading]);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setVideoFile(selectedFile);
			try {
				const duration = await getVideoDuration(selectedFile);
				setVideoDuration(duration); // Auto set duration
				toast({
					title: "Video selected",
					description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB), Duration: ${duration}`,
				});
			} catch (err) {
				toast({
					title: "Failed to read duration",
					description: "Please enter the duration manually.",
					variant: "destructive",
				});
			}
		}
	};

	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setThumbnailFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setThumbnailPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			setVideoFile(e.dataTransfer.files[0]);
			toast({
				title: "Video selected",
				description: `${e.dataTransfer.files[0].name} (${(e.dataTransfer.files[0].size / 1024 / 1024).toFixed(2)} MB)`,
			});
		}
	};

	const handleCancelUpload = () => {
		setUploading(false);
		toast({
			title: "Upload cancelled",
			description: "The video upload has been stopped.",
		});
	};

	const getVideoDuration = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const video = document.createElement("video");
			video.preload = "metadata";
			video.onloadedmetadata = () => {
				window.URL.revokeObjectURL(video.src); // Clean up memory
				const durationInSeconds = video.duration;
				const minutes = Math.floor(durationInSeconds / 60);
				const seconds = Math.floor(durationInSeconds % 60);
				resolve(`${minutes}:${seconds.toString().padStart(2, "0")}`);
			};
			video.onerror = (e) => {
				reject("Error reading video metadata");
			};
			video.src = URL.createObjectURL(file);
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!videoFile) {
			toast({
				title: "Missing fields",
				description: "Please provide a video file",
				variant: "destructive",
			});
			return;
		}

		setUploading(true);
		try {
			const formData = new FormData();
			formData.append("title", videoTitle);
			formData.append("description", videoDescription);
			formData.append("privacy", privacy);
			formData.append("videoFile", videoFile);
			formData.append("duration", videoDuration);

			if (thumbnailFile) {
				formData.append("thumbnail", thumbnailFile);
			}

			const response = await axios.post(`${apiurl}/videos`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			});

			toast({
				title: "Upload successful",
				description: `Your video "${response.data.data.title}" has been uploaded successfully.`,
			});

			// Reset form
			setVideoTitle("");
			setVideoDescription("");
			setPrivacy("public");
			setVideoFile(null);
			setThumbnailFile(null);
			setThumbnailPreview("");
			setVideoDuration("");
		} catch (error: any) {
			toast({
				title: "Upload failed",
				description: error.response?.data?.error || "An error occurred during the upload process.",
				variant: "destructive",
			});
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="container max-w-4xl mx-auto py-8">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Upload Video</CardTitle>
					<CardDescription>Upload a video to share with your audience</CardDescription>
				</CardHeader>

				{/* Loader Modal */}
				{uploading && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
						{/* Particle Background */}
						<div className="absolute inset-0 overflow-hidden">
							<div className="particle" />
							<div className="particle" />
							<div className="particle" />
							<div className="particle" />
						</div>
						<div className="relative flex flex-col items-center p-10 bg-gray-900/95 rounded-2xl shadow-2xl shadow-cyan-500/50 max-w-md w-full animate-zoom-in">
							{/* 3D Rotating Cube */}
							<div className="cube-wrapper mb-6">
								<div className="cube">
									<div className="face front bg-cyan-500/80" />
									<div className="face back bg-cyan-500/80" />
									<div className="face right bg-cyan-500/80" />
									<div className="face left bg-cyan-500/80" />
									<div className="face top bg-cyan-500/80" />
									<div className="face bottom bg-cyan-500/80" />
								</div>
							</div>
							<h2 className="text-2xl font-bold text-white mb-3 animate-text-glow">{messages[currentMessage]}</h2>
							<p className="text-sm text-gray-400 text-center mb-6">Your video is being processed with cutting-edge tech. Stay tuned!</p>
							<Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20" onClick={handleCancelUpload}>
								Cancel Upload
							</Button>
						</div>
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						{!videoFile ? (
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center" onDragOver={handleDragOver} onDrop={handleDrop}>
								<div className="flex flex-col items-center">
									<UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
									<h3 className="text-lg font-medium mb-2">Drag and drop video files to upload</h3>
									<p className="text-sm text-gray-500 mb-4">Your videos will be private until you publish them</p>
									<label className="cursor-pointer">
										<span className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">SELECT FILES</span>
										<Input type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
									</label>
								</div>
							</div>
						) : (
							<>
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium mb-1">Title (required)</label>
										<Input
											value={videoTitle}
											onChange={(e) => setVideoTitle(e.target.value)}
											placeholder="Add a title that describes your video"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Description</label>
										<Textarea
											value={videoDescription}
											onChange={(e) => setVideoDescription(e.target.value)}
											placeholder="Tell viewers about your video"
											rows={5}
										/>
									</div>
									<div className="text-sm text-gray-600">
										Detected Duration: <span className="font-medium">{videoDuration}</span>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Thumbnail</label>
										<div className="flex items-center gap-4">
											<div className="relative w-40 h-24 bg-gray-100 rounded-md overflow-hidden">
												{thumbnailPreview ? (
													<img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
												) : (
													<div className="flex items-center justify-center h-full">
														<span className="text-xs text-gray-500">No thumbnail</span>
													</div>
												)}
											</div>
											<label className="cursor-pointer">
												<span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition">Upload thumbnail</span>
												<Input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
											</label>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Visibility</label>
										<div className="space-y-2">
											{[
												{ id: "public", label: "Public", icon: <Globe /> },
												{ id: "unlisted", label: "Unlisted", icon: <Users /> },
												{ id: "private", label: "Private", icon: <Lock /> },
											].map(({ id, label, icon }) => (
												<div key={id} className="flex items-center p-3 border rounded-md">
													<input
														type="radio"
														id={id}
														name="privacy"
														value={id}
														checked={privacy === id}
														onChange={() => setPrivacy(id)}
														className="mr-3"
													/>
													<label htmlFor={id} className="flex items-center">
														{icon}
														<div className="ml-2">
															<div className="font-medium">{label}</div>
														</div>
													</label>
												</div>
											))}
										</div>
									</div>
								</div>
							</>
						)}
					</CardContent>

					{videoFile && (
						<CardFooter className="border-t p-4 flex justify-between items-center">
							<Button variant="outline" type="button">
								<Settings className="w-4 h-4 mr-2" />
								Advanced settings
							</Button>
							<div className="flex gap-3">
								<Button variant="outline" type="button">
									Save draft
								</Button>
								<Button type="submit" disabled={!videoTitle || uploading}>
									{uploading ? "Uploading..." : "Upload"}
								</Button>
							</div>
						</CardFooter>
					)}
				</form>
			</Card>

			{/* Inline CSS for animations */}
			<style jsx>{`
				/* Particle Background */
				.particle {
					position: absolute;
					border-radius: 50%;
					background: rgba(0, 255, 255, 0.4);
					animation: particle-move 10s infinite ease-in-out;
					pointer-events: none;
				}
				.particle:nth-child(1) {
					width: 20px;
					height: 20px;
					top: 10%;
					left: 20%;
					animation-delay: 0s;
				}
				.particle:nth-child(2) {
					width: 15px;
					height: 15px;
					top: 50%;
					left: 70%;
					animation-delay: 2s;
				}
				.particle:nth-child(3) {
					width: 25px;
					height: 25px;
					top: 80%;
					left: 30%;
					animation-delay: 4s;
				}
				.particle:nth-child(4) {
					width: 10px;
					height: 10px;
					top: 30%;
					left: 90%;
					animation-delay: 6s;
				}
				@keyframes particle-move {
					0%,
					100% {
						transform: translateY(0) scale(1);
						opacity: 0.8;
					}
					50% {
						transform: translateY(-50px) scale(1.5);
						opacity: 0.3;
					}
				}

				/* 3D Cube Animation */
				.cube-wrapper {
					perspective: 1000px;
					width: 80px;
					height: 80px;
				}
				.cube {
					position: relative;
					width: 100%;
					height: 100%;
					transform-style: preserve-3d;
					animation: cube-spin 6s linear infinite;
				}
				.face {
					position: absolute;
					width: 80px;
					height: 80px;
					border: 2px solid rgba(0, 255, 255, 0.8);
					box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
				}
				.front {
					transform: translateZ(40px);
				}
				.back {
					transform: translateZ(-40px) rotateY(180deg);
				}
				.right {
					transform: rotateY(90deg) translateZ(40px);
				}
				.left {
					transform: rotateY(-90deg) translateZ(40px);
				}
				.top {
					transform: rotateX(90deg) translateZ(40px);
				}
				.bottom {
					transform: rotateX(-90deg) translateZ(40px);
				}
				@keyframes cube-spin {
					0% {
						transform: rotateX(0deg) rotateY(0deg);
					}
					100% {
						transform: rotateX(360deg) rotateY(360deg);
					}
				}

				/* Text Glow Animation */
				@keyframes text-glow {
					0%,
					100% {
						text-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3);
					}
					50% {
						text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5);
					}
				}
				.animate-text-glow {
					animation: text-glow 2s ease-in-out infinite;
				}

				/* Zoom In Animation */
				@keyframes zoom-in {
					0% {
						opacity: 0;
						transform: scale(0.8);
					}
					100% {
						opacity: 1;
						transform: scale(1);
					}
				}
				.animate-zoom-in {
					animation: zoom-in 0.6s ease-out;
				}
			`}</style>
		</div>
	);
};

export default UploadPage;
