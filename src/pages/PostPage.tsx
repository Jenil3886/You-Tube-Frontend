import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Link as LinkIcon, Smile, Globe, Users, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const PostPage = () => {
	const [postContent, setPostContent] = useState("");
	const [mediaFiles, setMediaFiles] = useState<File[]>([]);
	const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
	const [privacy, setPrivacy] = useState("public");
	const [isPosting, setIsPosting] = useState(false);

	const { toast } = useToast();

	const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);

			if (filesArray.length + mediaFiles.length > 4) {
				toast({
					title: "Too many files",
					description: "You can only upload a maximum of 4 images",
					variant: "destructive",
				});
				return;
			}

			setMediaFiles((prev) => [...prev, ...filesArray]);

			// Create previews
			filesArray.forEach((file) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					setMediaPreviews((prev) => [...prev, reader.result as string]);
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const removeMedia = (index: number) => {
		setMediaFiles((prev) => prev.filter((_, i) => i !== index));
		setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
	};

	const handlePost = () => {
		if (!postContent.trim() && mediaPreviews.length === 0) {
			toast({
				title: "Empty post",
				description: "Please add some text or media to your post",
				variant: "destructive",
			});
			return;
		}

		setIsPosting(true);

		// Simulate posting
		setTimeout(() => {
			toast({
				title: "Post published",
				description: "Your post has been published successfully",
			});
			setIsPosting(false);
			setPostContent("");
			setMediaFiles([]);
			setMediaPreviews([]);
		}, 1500);
	};

	return (
		<div className="container max-w-2xl mx-auto py-8">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Create post</CardTitle>
					<CardDescription>Share updates, photos, and more with your audience</CardDescription>
				</CardHeader>

				<CardContent className="space-y-6">
					<Textarea
						value={postContent}
						onChange={(e) => setPostContent(e.target.value)}
						placeholder="What would you like to share?"
						className="min-h-[120px] text-base"
					/>

					{mediaPreviews.length > 0 && (
						<div className="grid grid-cols-2 gap-2">
							{mediaPreviews.map((preview, index) => (
								<div key={index} className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
									<img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
									<button
										className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full w-6 h-6 flex items-center justify-center"
										onClick={() => removeMedia(index)}
									>
										&times;
									</button>
								</div>
							))}
						</div>
					)}

					<div className="flex justify-between items-center">
						<div className="flex gap-2">
							<label className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
								<Image className="w-6 h-6 text-gray-600" />
								<Input type="file" className="hidden" accept="image/*" multiple onChange={handleMediaChange} />
							</label>

							<button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
								<LinkIcon className="w-6 h-6 text-gray-600" />
							</button>

							<button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
								<Smile className="w-6 h-6 text-gray-600" />
							</button>
						</div>

						<div className="text-sm text-gray-500">{mediaPreviews.length}/4 images</div>
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
										<div className="text-sm text-gray-500">Everyone can see your post</div>
									</div>
								</label>
							</div>

							<div className="flex items-center p-3 border rounded-md">
								<input
									type="radio"
									id="subscribers"
									name="privacy"
									value="subscribers"
									checked={privacy === "subscribers"}
									onChange={() => setPrivacy("subscribers")}
									className="mr-3"
								/>
								<label htmlFor="subscribers" className="flex items-center">
									<Users className="w-5 h-5 mr-2" />
									<div>
										<div className="font-medium">Subscribers only</div>
										<div className="text-sm text-gray-500">Only your subscribers can see</div>
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
										<div className="text-sm text-gray-500">Only you can see</div>
									</div>
								</label>
							</div>
						</div>
					</div>
				</CardContent>

				<CardFooter className="border-t p-4 flex justify-end">
					<Button onClick={handlePost} disabled={isPosting || (!postContent.trim() && mediaPreviews.length === 0)}>
						{isPosting ? "Posting..." : "Post"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default PostPage;
