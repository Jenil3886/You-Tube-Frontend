import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiurl, FRONTEND_URL } from "@/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { VideoEditSkeleton } from "@/components/skeleton/videoEdit";
import { VideoDetails } from "@/types";

const EditVideo = () => {
	const { videoId } = useParams<{ videoId: string }>(); // Get videoId from URL
	const navigate = useNavigate();
	const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		visibility: "Public",
		madeForKids: false,
		relatedVideo: "None",
	});

	// Fetch video details when the component mounts
	useEffect(() => {
		const fetchVideoDetails = async () => {
			try {
				setLoading(true);
				setError("");
				const token = localStorage.getItem("accessToken");
				const response = await axios.get(`${apiurl}/videos/${videoId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const video = response.data.data;
				setVideoDetails(video);
				setFormData({
					title: video.title || "",
					description: video.description || "",
					visibility: video.visibility || "Public",
					madeForKids: video.madeForKids || false,
					relatedVideo: video.relatedVideo || "None",
				});
			} catch (err: any) {
				setError(err.response?.data?.message || "Failed to fetch video details");
			} finally {
				setLoading(false);
			}
		};

		fetchVideoDetails();
	}, [videoId]);

	// Handle form input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle visibility change
	const handleVisibilityChange = (value: string) => {
		setFormData((prev) => ({ ...prev, visibility: value }));
	};

	// Handle made for kids toggle
	const handleMadeForKidsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, madeForKids: e.target.checked }));
	};

	// Handle related video change
	const handleRelatedVideoChange = (value: string) => {
		setFormData((prev) => ({ ...prev, relatedVideo: value }));
	};

	// Handle form submission to update the video
	const handleSave = async () => {
		try {
			setError("");
			setSuccess("");
			const token = localStorage.getItem("accessToken");
			await axios.patch(
				`${apiurl}/videos/${videoId}`,
				{
					title: formData.title,
					description: formData.description,
					visibility: formData.visibility,
					madeForKids: formData.madeForKids,
					relatedVideo: formData.relatedVideo === "None" ? null : formData.relatedVideo,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			setSuccess("Video updated successfully!");
			setTimeout(() => navigate("/"), 2000);
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to update video");
		}
	};

	// Handle cancel (go back to VideosTab)
	const handleCancel = () => {
		navigate("/");
	};

	if (loading) return <VideoEditSkeleton />;
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-bold mb-4">Video Details</h1>

			{success && (
				<Alert className="mb-4">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Success</AlertTitle>
					<AlertDescription>{success}</AlertDescription>
				</Alert>
			)}

			{error && (
				<Alert className="mb-4" variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left Section: Form Inputs */}
				<div className="md:col-span-2 space-y-4">
					{/* Title */}
					<div>
						<label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Title (required)
						</label>
						<Input id="title" name="title" value={formData.title} onChange={handleInputChange} className="mt-1" placeholder="Add a title" />
					</div>

					{/* Description */}
					<div>
						<label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Description
						</label>
						<Textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							className="mt-1  transform md:translate-x-0 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600"
							placeholder="Tell viewers about your video"
							rows={8}
						/>
					</div>

					{/* Thumbnail */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thumbnail</label>
						<p className="text-xs text-muted-foreground mt-1">You can change the thumbnail on the YouTube Mobile app</p>
					</div>

					{/* Playlists */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Playlists</label>
						<Select defaultValue="none">
							<SelectTrigger className="mt-1">
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="none">None</SelectItem>
								{/* Add playlist options here if available */}
							</SelectContent>
						</Select>
						<p className="text-xs text-muted-foreground mt-1">Add your video to one or more playlists to organize your content for viewers.</p>
					</div>

					{/* Audience (Made for Kids) */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Audience</label>
						<p className="text-sm font-medium mt-2">This video is set to Made for Kids</p>
						<div className="flex items-center mt-2">
							<input type="checkbox" id="madeForKids" checked={formData.madeForKids} onChange={handleMadeForKidsChange} className="mr-2" />
							<label htmlFor="madeForKids" className="text-sm text-gray-700 dark:text-gray-300">
								Set by you
							</label>
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Regardless of your location, you’re legally required to comply with the Children’s Online Privacy Protection Act (COPPA) and/or other
							laws. You’re required to tell us whether your videos are Made for Kids.
						</p>
						<p className="text-xs text-blue-500 mt-1">
							Features like personalized ads and notifications won’t be available on videos Made for Kids. Videos that are set as Made for Kids by you
							are more likely to be recommended alongside other children’s videos.
						</p>
					</div>
				</div>

				{/* Right Section: Video Preview and Additional Options */}
				<div className="space-y-4">
					{/* Video Preview */}
					<div className="border rounded-lg p-4">
						<img src={videoDetails?.thumbnail} alt={videoDetails?.title} className="w-full h-40 object-cover rounded-md mb-2" />
						<div className="flex justify-between text-sm">
							<span>{videoDetails?.duration}</span>
						</div>
						<p className="text-sm mt-2">
							Video link: <a href={`${FRONTEND_URL}/video/${videoId}`} className="text-blue-500">{`https://youtube.com/watch?v=${videoId}`}</a>
						</p>
						<p className="text-sm mt-1">Video quality: HD</p>
					</div>

					{/* Visibility */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Visibility</label>
						<Select onValueChange={handleVisibilityChange} value={formData.visibility}>
							<SelectTrigger className="mt-1">
								<SelectValue placeholder="Select visibility" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Public">Public</SelectItem>
								<SelectItem value="Private">Private</SelectItem>
								<SelectItem value="Unlisted">Unlisted</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Restrictions */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Restrictions</label>
						<p className="text-sm mt-1">Made for Kids</p>
					</div>

					{/* Related Video */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Related video</label>
						<Select onValueChange={handleRelatedVideoChange} value={formData.relatedVideo}>
							<SelectTrigger className="mt-1">
								<SelectValue placeholder="Select related video" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="None">None</SelectItem>
								{/* Add other video options here if available */}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* Save and Cancel Buttons */}
			<div className="mt-6 flex justify-end gap-3">
				<Button variant="outline" onClick={handleCancel}>
					Cancel
				</Button>
				<Button onClick={handleSave}>Save</Button>
			</div>
		</div>
	);
};

export default EditVideo;
