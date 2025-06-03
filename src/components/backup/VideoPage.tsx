// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Button } from "../components/ui/button";
// import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, Bell } from "lucide-react";
// import VideoSkeleton from "../components/skeleton/video";

// // Mock videos data
// const mockVideos = [
// 	{
// 		id: "video1",
// 		thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
// 		videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
// 		title: "Building a YouTube Clone with React and Tailwind CSS",
// 		channelName: "Web Dev Mastery",
// 		channelAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
// 		subscribers: "1.2M",
// 		views: "152K",
// 		timestamp: "2 weeks ago",
// 		likes: "10K",
// 		description:
// 			"In this tutorial, we'll build a YouTube clone using React and Tailwind CSS. We'll cover responsive design, component architecture, and styling with Tailwind CSS. This video is perfect for beginner to intermediate developers who want to improve their React skills.",
// 		comments: [
// 			{
// 				id: "comment1",
// 				user: "Jane Smith",
// 				avatar: "https://randomuser.me/api/portraits/women/65.jpg",
// 				text: "This was incredibly helpful! I've been struggling with Tailwind setup but your explanation made it so clear.",
// 				likes: 245,
// 				timestamp: "3 days ago",
// 			},
// 			{
// 				id: "comment2",
// 				user: "Mark Johnson",
// 				avatar: "https://randomuser.me/api/portraits/men/41.jpg",
// 				text: "Amazing tutorial! Do you have any videos on integrating this with a backend?",
// 				likes: 123,
// 				timestamp: "1 week ago",
// 			},
// 			{
// 				id: "comment3",
// 				user: "Sarah Williams",
// 				avatar: "https://randomuser.me/api/portraits/women/33.jpg",
// 				text: "Just finished coding along. The end result looks fantastic!",
// 				likes: 87,
// 				timestamp: "2 weeks ago",
// 			},
// 		],
// 	},
// ];

// const relatedVideos = [
// 	{
// 		id: "related1",
// 		thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
// 		title: "Learn Tailwind CSS in 30 Minutes - Complete Beginner's Guide",
// 		channelName: "CodeCraft",
// 		views: "1.2M",
// 		timestamp: "8 months ago",
// 		duration: "31:24",
// 	},
// 	{
// 		id: "related2",
// 		thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
// 		title: "React Router v6 - Complete Tutorial with Projects",
// 		channelName: "JavaScript Guru",
// 		views: "450K",
// 		timestamp: "3 months ago",
// 		duration: "25:50",
// 	},
// 	{
// 		id: "related3",
// 		thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop",
// 		title: "Build a Netflix Clone with React, Tailwind and Firebase",
// 		channelName: "TechSolutions",
// 		views: "2.5M",
// 		timestamp: "1 year ago",
// 		duration: "45:12",
// 	},
// 	{
// 		id: "related4",
// 		thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop",
// 		title: "TypeScript Crash Course - Why You Should Use It",
// 		channelName: "Dev Simplified",
// 		views: "750K",
// 		timestamp: "7 months ago",
// 		duration: "28:17",
// 	},
// 	{
// 		id: "related5",
// 		thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300&h=200&fit=crop",
// 		title: "JavaScript Fundamentals - From Zero to Hero",
// 		channelName: "CodeMastery",
// 		views: "3.1M",
// 		timestamp: "2 years ago",
// 		duration: "1:22:45",
// 	},
// ];

// const VideoPage = () => {
// 	const { videoId } = useParams();
// 	const [video, setVideo] = useState<any>(null);
// 	const [isSubscribed, setIsSubscribed] = useState(false);
// 	const [commentText, setCommentText] = useState("");

// 	useEffect(() => {
// 		// Simulate API call
// 		setTimeout(() => {
// 			const foundVideo = mockVideos.find((v) => v.id === videoId);
// 			if (foundVideo) {
// 				setVideo(foundVideo);
// 			}
// 		}, 2000); // Simulate 2-second delay
// 		setIsSubscribed(false);
// 	}, [videoId]);

// 	if (!video) {
// 		return <VideoSkeleton />;
// 	}

// 	return (
// 		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// 			<div className="lg:col-span-2">
// 				{/* Video player */}
// 				<div className="aspect-video bg-black w-full rounded-xl overflow-hidden">
// 					<iframe
// 						className="w-full h-full"
// 						src={video.videoUrl}
// 						title={video.title}
// 						frameBorder="0"
// 						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 						allowFullScreen
// 					></iframe>
// 				</div>

// 				{/* Video info */}
// 				<h1 className="text-xl font-bold mt-4">{video.title}</h1>

// 				<div className="flex flex-wrap justify-between items-center mt-4">
// 					<div className="flex items-center gap-4">
// 						<img src={video.channelAvatar} alt={video.channelName} className="w-10 h-10 rounded-full" />
// 						<div>
// 							<h3 className="font-medium">{video.channelName}</h3>
// 							<span className="text-sm text-muted-foreground">{video.subscribers} subscribers</span>
// 						</div>
// 						<Button
// 							variant={isSubscribed ? "outline" : "default"}
// 							className={`rounded-full ${isSubscribed ? "flex gap-2" : ""}`}
// 							onClick={() => setIsSubscribed(!isSubscribed)}
// 						>
// 							{isSubscribed ? (
// 								<>
// 									<span>Subscribed</span>
// 									<Bell size={16} />
// 								</>
// 							) : (
// 								"Subscribe"
// 							)}
// 						</Button>
// 					</div>

// 					<div className="flex gap-2 mt-4 sm:mt-0">
// 						<div className="flex rounded-full overflow-hidden border">
// 							<Button variant="ghost" className="rounded-r-none border-r">
// 								<ThumbsUp size={18} className="mr-2" />
// 								{video.likes}
// 							</Button>
// 							<Button variant="ghost" className="rounded-l-none">
// 								<ThumbsDown size={18} />
// 							</Button>
// 						</div>

// 						<Button variant="outline" className="rounded-full">
// 							<Share size={18} className="mr-2" />
// 							Share
// 						</Button>

// 						<Button variant="outline" className="rounded-full">
// 							<Download size={18} className="mr-2" />
// 							Download
// 						</Button>

// 						<Button variant="outline" size="icon" className="rounded-full">
// 							<MoreHorizontal size={18} />
// 						</Button>
// 					</div>
// 				</div>

// 				{/* Video description */}
// 				<div className="bg-secondary/50 rounded-xl p-4 mt-4">
// 					<div className="flex gap-2">
// 						<span className="font-medium">{video.views} views</span>
// 						<span className="font-medium">{video.timestamp}</span>
// 					</div>
// 					<p className="mt-2 whitespace-pre-line">{video.description}</p>
// 				</div>

// 				{/* Comments */}
// 				<div className="mt-6">
// 					<h3 className="text-lg font-medium mb-4">{video.comments.length} Comments</h3>

// 					{/* Comment input */}
// 					<div className="flex gap-4 mb-6">
// 						<img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Your avatar" className="w-10 h-10 rounded-full" />
// 						<div className="flex-1">
// 							<input
// 								type="text"
// 								placeholder="Add a comment..."
// 								className="w-full bg-transparent border-b border-secondary outline-none pb-2 focus:border-primary"
// 								value={commentText}
// 								onChange={(e) => setCommentText(e.target.value)}
// 							/>

// 							<div className="flex justify-end gap-2 mt-2">
// 								<Button variant="ghost" onClick={() => setCommentText("")}>
// 									Cancel
// 								</Button>
// 								<Button
// 									disabled={!commentText.trim()}
// 									onClick={() => {
// 										console.log("Comment submitted:", commentText);
// 										setCommentText("");
// 									}}
// 								>
// 									Comment
// 								</Button>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Comment list */}
// 					<div className="flex flex-col gap-6">
// 						{video.comments.map((comment: any) => (
// 							<div key={comment.id} className="flex gap-4">
// 								<img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
// 								<div>
// 									<div className="flex items-center gap-2">
// 										<span className="font-medium">{comment.user}</span>
// 										<span className="text-sm text-muted-foreground">{comment.timestamp}</span>
// 									</div>
// 									<p className="mt-1">{comment.text}</p>
// 									<div className="flex items-center gap-2 mt-2">
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											<ThumbsUp size={16} className="mr-2" />
// 											{comment.likes}
// 										</Button>
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											<ThumbsDown size={16} />
// 										</Button>
// 										<Button variant="ghost" size="sm" className="h-8 px-2">
// 											Reply
// 										</Button>
// 									</div>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Related videos */}
// 			<div className="space-y-4">
// 				<h3 className="text-lg font-medium">Related Videos</h3>
// 				{relatedVideos.map((video) => (
// 					<div key={video.id} className="flex gap-2">
// 						<div className="relative flex-shrink-0">
// 							<img src={video.thumbnail} alt={video.title} className="w-40 h-24 object-cover rounded-lg" />
// 							<span className="video-duration">{video.duration}</span>
// 						</div>
// 						<div className="flex-1">
// 							<h4 className="font-medium line-clamp-2 text-sm">{video.title}</h4>
// 							<p className="text-xs text-muted-foreground mt-1">{video.channelName}</p>
// 							<p className="text-xs text-muted-foreground">
// 								{video.views} views • {video.timestamp}
// 							</p>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default VideoPage;
