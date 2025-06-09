import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Lock, Settings, UploadCloud, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { apiurl } from "@/constants";
import { useVideoUploadContext } from "@/context/VideoUploadContext";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
	const [videoTitle, setVideoTitle] = useState("");
	const [videoDescription, setVideoDescription] = useState("");
	const [privacy, setPrivacy] = useState("public");
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
	const [thumbnailPreview, setThumbnailPreview] = useState("");
	const [videoDuration, setVideoDuration] = useState("");

	const { addUploadingVideo, removeUploadingVideo, updateUploadingProgress } = useVideoUploadContext();
	const { toast } = useToast();
	const navigate = useNavigate();

	const getVideoDuration = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const video = document.createElement("video");
			video.preload = "metadata";
			video.onloadedmetadata = () => {
				window.URL.revokeObjectURL(video.src);
				const durationInSeconds = video.duration;
				const minutes = Math.floor(durationInSeconds / 60);
				const seconds = Math.floor(durationInSeconds % 60);
				resolve(`${minutes}:${seconds.toString().padStart(2, "0")}`);
			};
			video.onerror = () => {
				reject("Error reading video metadata");
			};
			video.src = URL.createObjectURL(file);
		});
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setVideoFile(selectedFile);
			try {
				const duration = await getVideoDuration(selectedFile);
				setVideoDuration(duration);
				toast({
					title: "Video selected",
					description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB), Duration: ${duration}`,
				});
			} catch {
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
				setThumbnailPreview(typeof reader.result === "string" ? reader.result : "");
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!videoFile) {
			toast({ title: "Missing fields", description: "Please provide a video file", variant: "destructive" });
			return;
		}
		const tempId = `temp-${Date.now()}`;
		addUploadingVideo(tempId, videoTitle || "Uploading...");
		// Immediately redirect to videos tab after starting upload
		navigate("/studio/content#videos");
		try {
			const formData = new FormData();
			formData.append("title", videoTitle);
			formData.append("description", videoDescription);
			formData.append("privacy", privacy);
			formData.append("videoFile", videoFile);
			formData.append("duration", videoDuration);
			if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

			await axios.post(`${apiurl}/videos`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
				withCredentials: true,
				onUploadProgress: (progressEvent) => {
					const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
					updateUploadingProgress(tempId, percent);
				},
			});
			// No need to reset form here, user is redirected
			// updateUploadedVideo(tempId, response.data.data); // This will be handled by VideosTab fetch
		} catch {
			removeUploadingVideo(tempId);
		}
	};

	return (
		<div className="container max-w-4xl mx-auto py-8">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Upload Video</CardTitle>
					<CardDescription>Upload a video to share with your audience</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						{!videoFile ? (
							<div
								className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									if (e.dataTransfer.files[0]) {
										setVideoFile(e.dataTransfer.files[0]);
									}
								}}
							>
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
									{videoFile && (
										<div className="text-sm text-gray-600">
											Detected Duration: <span className="font-medium">{videoDuration}</span>
										</div>
									)}
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
											<div className="flex items-center p-3 border rounded-md">
												<input
													type="radio"
													id="public"
													name="privacy"
													value="public"
													checked={privacy === "public"}
													onChange={() => setPrivacy("public")}
													className="mr-3"
												/>
												<label htmlFor="public" className="flex items-center">
													<Globe className="w-5 h-5 mr-2" />
													<div>
														<div className="font-medium">Public</div>
														<div className="text-sm text-gray-500">Everyone can watch your video</div>
													</div>
												</label>
											</div>
											<div className="flex items-center p-3 border rounded-md">
												<input
													type="radio"
													id="unlisted"
													name="privacy"
													value="unlisted"
													checked={privacy === "unlisted"}
													onChange={() => setPrivacy("unlisted")}
													className="mr-3"
												/>
												<label htmlFor="unlisted" className="flex items-center">
													<Users className="w-5 h-5 mr-2" />
													<div>
														<div className="font-medium">Unlisted</div>
														<div className="text-sm text-gray-500">Anyone with the link can watch</div>
													</div>
												</label>
											</div>
											<div className="flex items-center p-3 border rounded-md">
												<input
													type="radio"
													id="private"
													name="privacy"
													value="private"
													checked={privacy === "private"}
													onChange={() => setPrivacy("private")}
													className="mr-3"
												/>
												<label htmlFor="private" className="flex items-center">
													<Lock className="w-5 h-5 mr-2" />
													<div>
														<div className="font-medium">Private</div>
														<div className="text-sm text-gray-500">Only you can watch</div>
													</div>
												</label>
											</div>
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
								<Button type="submit">Upload</Button>
							</div>
						</CardFooter>
					)}
				</form>
			</Card>
		</div>
	);
};

export default UploadPage;
