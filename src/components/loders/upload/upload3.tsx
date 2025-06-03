// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
// import { Globe, Lock, Settings, UploadCloud, Users } from "lucide-react";
// import { useToast } from "../hooks/use-toast";
// import axios from "axios";

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
// 	const [uploadProgress, setUploadProgress] = useState(0);

// 	const { toast } = useToast();

// 	// Culturally inspired messages
// 	const messages = [
// 		"Weaving your story into the digital tapestry...",
// 		"Lighting up the cloud with your creation...",
// 		"Celebrating your vision with every byte...",
// 		"Your masterpiece is blooming like a lotus...",
// 	];

// 	// Cycle through messages every 2 seconds
// 	useEffect(() => {
// 		if (uploading) {
// 			const interval = setInterval(() => {
// 				setCurrentMessage((prev) => (prev + 1) % messages.length);
// 			}, 2000);
// 			return () => clearInterval(interval);
// 		}
// 	}, [uploading]);

// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files && e.target.files[0]) {
// 			setVideoFile(e.target.files[0]);
// 			toast({
// 				title: "Video selected",
// 				description: `${e.target.files[0].name} (${(e.target.files[0].size / 1024 / 1024).toFixed(2)} MB)`,
// 			});
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
// 			setVideoFile(e.target.files[0]);
// 			toast({
// 				title: "Video selected",
// 				description: `${e.target.files[0].name} (${(e.target.files[0].size / 1024 / 1024).toFixed(2)} MB)`,
// 			});
// 		}
// 	};

// 	const handleCancelUpload = () => {
// 		setUploading(false);
// 		setUploadProgress(0);
// 		toast({
// 			title: "Upload cancelled",
// 			description: "The video upload has been stopped.",
// 		});
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!videoFile || !videoDuration) {
// 			toast({
// 				title: "Missing fields",
// 				description: "Please provide a video file and duration",
// 				variant: "destructive",
// 			});
// 			return;
// 		}

// 		setUploading(true);
// 		try {
// 			const controller = new AbortController();
// 			const formData = new FormData();
// 			formData.append("title", videoTitle);
// 			formData.append("description", videoDescription);
// 			formData.append("privacy", privacy);
// 			formData.append("videoFile", videoFile);
// 			formData.append("duration", videoDuration);
// 			if (thumbnailFile) {
// 				formData.append("thumbnail", thumbnailFile);
// 			}

// 			const response = await axios.post("${apiurl}/videos", formData, {
// 				headers: {
// 					"Content-Type": "multipart/form-data",
// 				},
// 				withCredentials: true,
// 				signal: controller.signal,
// 				onUploadProgress: (progressEvent) => {
// 					if (progressEvent.total) {
// 						const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// 						setUploadProgress(percent);
// 					}
// 				},
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
// 			setUploadProgress(0);
// 		} catch (error: any) {
// 			if (error.name === "AbortError") {
// 				toast({
// 					title: "Upload cancelled",
// 					description: "The video upload was cancelled.",
// 				});
// 			} else {
// 				toast({
// 					title: "Upload failed",
// 					description: error.response?.data?.error || "An error occurred during the upload process.",
// 					variant: "destructive",
// 				});
// 			}
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
// 					<div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-500/80 to-purple-600/80 backdrop-blur-md">
// 						{/* Sparkle Effects */}
// 						<div className="absolute inset-0 overflow-hidden">
// 							<div className="sparkle" />
// 							<div className="sparkle" />
// 							<div className="sparkle" />
// 							<div className="sparkle" />
// 						</div>
// 						<div className="relative flex flex-col items-center p-10 bg-white/90 rounded-3xl shadow-xl shadow-orange-500/30 max-w-sm w-full animate-slide-in">
// 							{/* Rotating Mandala */}
// 							<div className="relative w-28 h-28 mb-6">
// 								<svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
// 									<defs>
// 										<linearGradient id="mandalaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
// 											<stop offset="0%" style={{ stopColor: "#f97316", stopOpacity: 1 }} />
// 											<stop offset="100%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />
// 										</linearGradient>
// 									</defs>
// 									<circle
// 										cx="50"
// 										cy="50"
// 										r="45"
// 										fill="none"
// 										stroke="url(#mandalaGradient)"
// 										strokeWidth="8"
// 										strokeDasharray="283"
// 										strokeDashoffset={283 - (283 * uploadProgress) / 100}
// 									/>
// 									<path
// 										d="M50 10 a40 40 0 0 1 40 40 a40 40 0 0 1 -40 40 a40 40 0 0 1 -40 -40 a40 40 0 0 1 40 -40"
// 										fill="none"
// 										stroke="url(#mandalaGradient)"
// 										strokeWidth="4"
// 										strokeDasharray="10,10"
// 										transform="rotate(45, 50, 50)"
// 									/>
// 									<path
// 										d="M50 20 a30 30 0 0 1 30 30 a30 30 0 0 1 -30 30 a30 30 0 0 1 -30 -30 a30 30 0 0 1 30 -30"
// 										fill="none"
// 										stroke="url(#mandalaGradient)"
// 										strokeWidth="3"
// 										strokeDasharray="8,8"
// 										transform="rotate(-45, 50, 50)"
// 									/>
// 								</svg>
// 								<UploadCloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-orange-500 animate-pulse" />
// 							</div>
// 							<h2 className="text-xl font-semibold text-gray-800 mb-2 animate-text-pulse">{messages[currentMessage]}</h2>
// 							<p className="text-lg font-bold text-orange-600 mb-4">{uploadProgress}% Complete</p>
// 							<p className="text-sm text-gray-600 text-center mb-6">Your creation is shining bright like a Diwali sparkler!</p>
// 							<Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-500/20" onClick={handleCancelUpload}>
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

// 									<div>
// 										<label className="block text-sm font-medium mb-1">Duration (required)</label>
// 										<Input type="text" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} placeholder="e.g., 10:15" required />
// 									</div>

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

// 			{/* Inline CSS for animations and sparkle effects */}
// 			<style jsx>{`
// 				/* Sparkle Effects */
// 				.sparkle {
// 					position: absolute;
// 					width: 8px;
// 					height: 8px;
// 					background: rgba(255, 255, 255, 0.8);
// 					border-radius: 50%;
// 					box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
// 					animation: sparkle-move 6s infinite ease-in-out;
// 					pointer-events: none;
// 				}
// 				.sparkle:nth-child(1) {
// 					top: 20%;
// 					left: 15%;
// 					animation-delay: 0s;
// 				}
// 				.sparkle:nth-child(2) {
// 					top: 60%;
// 					left: 80%;
// 					animation-delay: 1.5s;
// 				}
// 				.sparkle:nth-child(3) {
// 					top: 75%;
// 					left: 30%;
// 					animation-delay: 3s;
// 				}
// 				.sparkle:nth-child(4) {
// 					top: 40%;
// 					left: 90%;
// 					animation-delay: 4.5s;
// 				}
// 				@keyframes sparkle-move {
// 					0%,
// 					100% {
// 						transform: translate(0, 0) scale(1);
// 						opacity: 0.8;
// 					}
// 					50% {
// 						transform: translate(20px, -20px) scale(1.5);
// 						opacity: 0.3;
// 					}
// 				}

// 				/* Mandala Animation */
// 				@keyframes spin-slow {
// 					0% {
// 						transform: rotate(0deg);
// 					}
// 					100% {
// 						transform: rotate(360deg);
// 					}
// 				}
// 				.animate-spin-slow {
// 					animation: spin-slow 8s linear infinite;
// 				}

// 				/* Text Pulse Animation */
// 				@keyframes text-pulse {
// 					0%,
// 					100% {
// 						text-shadow: 0 0 5px rgba(249, 115, 22, 0.5);
// 					}
// 					50% {
// 						text-shadow: 0 0 15px rgba(249, 115, 22, 0.8);
// 					}
// 				}
// 				.animate-text-pulse {
// 					animation: text-pulse 1.5s ease-in-out infinite;
// 				}

// 				/* Slide In Animation */
// 				@keyframes slide-in {
// 					0% {
// 						opacity: 0;
// 						transform: translateY(20px);
// 					}
// 					100% {
// 						opacity: 1;
// 						transform: translateY(0);
// 					}
// 				}
// 				.animate-slide-in {
// 					animation: slide-in 0.5s ease-out;
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default UploadPage;
