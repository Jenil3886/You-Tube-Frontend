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

// 	const { toast } = useToast();

// 	// Motivational messages for the loader
// 	const messages = [
// 		"Preparing your video for the world...",
// 		"Almost there, making it perfect...",
// 		"Uploading your masterpiece...",
// 		"Getting ready to share your story...",
// 	];

// 	// Cycle through messages every 3 seconds
// 	useEffect(() => {
// 		if (uploading) {
// 			const interval = setInterval(() => {
// 				setCurrentMessage((prev) => (prev + 1) % messages.length);
// 			}, 3000);
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
// 			setVideoFile(e.dataTransfer.files[0]);
// 			toast({
// 				title: "Video selected",
// 				description: `${e.dataTransfer.files[0].name} (${(e.dataTransfer.files[0].size / 1024 / 1024).toFixed(2)} MB)`,
// 			});
// 		}
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
// 					<div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600/80 to-purple-600/80 backdrop-blur-md">
// 						<div className="flex flex-col items-center p-12 bg-white/90 rounded-3xl shadow-xl max-w-sm w-full animate-fade-in">
// 							{/* Circular Progress Loader */}
// 							<div className="relative w-24 h-24 mb-6">
// 								<svg className="w-full h-full" viewBox="0 0 100 100">
// 									<circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
// 									<circle
// 										className="text-blue-500 animate-spin-slow"
// 										strokeWidth="8"
// 										stroke="currentColor"
// 										fill="transparent"
// 										r="42"
// 										cx="50"
// 										cy="50"
// 										strokeDasharray="263"
// 										strokeDashoffset="66"
// 									/>
// 								</svg>
// 								<UploadCloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-blue-500 animate-pulse" />
// 							</div>
// 							<h2 className="text-xl font-semibold text-gray-800 mb-4">{messages[currentMessage]}</h2>
// 							<p className="text-sm text-gray-600 text-center">Your video is being processed securely. Hang tight!</p>
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

// 			{/* Inline CSS for animations */}
// 			<style jsx>{`
// 				@keyframes spin-slow {
// 					0% {
// 						transform: rotate(0deg);
// 					}
// 					100% {
// 						transform: rotate(360deg);
// 					}
// 				}
// 				.animate-spin-slow {
// 					animation: spin-slow 3s linear infinite;
// 				}
// 				@keyframes fade-in {
// 					0% {
// 						opacity: 0;
// 						transform: scale(0.95);
// 					}
// 					100% {
// 						opacity: 1;
// 						transform: scale(1);
// 					}
// 				}
// 				.animate-fade-in {
// 					animation: fade-in 0.5s ease-out;
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default UploadPage;
