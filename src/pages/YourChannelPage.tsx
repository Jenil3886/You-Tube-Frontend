// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { Button } from "../components/ui/button";
// import { Card, CardContent } from "../components/ui/card";
// import VideoGrid from "../components/video/VideoGrid";
// import { Settings, User, Upload, Bell, PlusCircle, ChevronDown } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// // import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";
// import CustomizeChannelModal from "@/components/channel/CustomizeChannelModal";
// import { apiurl } from "@/constants";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import ChannelSkeleton from "@/components/skeleton/Channel";

// // Type definition for a channel
// interface Channel {
// 	id: string;
// 	name: string;
// 	handle: string;
// 	description?: string;
// 	profilePicture?: string | null;
// 	channelBanner?: string | null;
// 	createdAt: string;
// 	subscribers?: string;
// }

// const YourChannelPage = () => {
// 	const [uploading, setUploading] = useState(false);
// 	const [channel, setChannel] = useState<Channel | null>(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
// 	const navigate = useNavigate();
// 	const { toast } = useToast();

// 	// Sample videos data
// 	const channelVideos = [
// 		{
// 			id: "v1",
// 			thumbnail: "https://picsum.photos/seed/v1/320/180",
// 			title: "How I Built My First React App",
// 			channelName: channel?.name || "Your Channel",
// 			channelAvatar: channel?.profilePicture || "https://github.com/shadcn.png",
// 			views: "14K",
// 			timestamp: "3 days ago",
// 			duration: "12:34",
// 		},
// 		{
// 			id: "v2",
// 			thumbnail: "https://picsum.photos/seed/v2/320/180",
// 			title: "10 JavaScript Tricks You Should Know",
// 			channelName: channel?.name || "Your Channel",
// 			channelAvatar: channel?.profilePicture || "https://github.com/shadcn.png",
// 			views: "28K",
// 			timestamp: "1 week ago",
// 			duration: "8:47",
// 		},
// 		{
// 			id: "v3",
// 			thumbnail: "https://picsum.photos/seed/v3/320/180",
// 			title: "Tailwind CSS Complete Tutorial",
// 			channelName: channel?.name || "Your Channel",
// 			channelAvatar: channel?.profilePicture || "https://github.com/shadcn.png",
// 			views: "42K",
// 			timestamp: "2 weeks ago",
// 			duration: "25:12",
// 		},
// 		{
// 			id: "v4",
// 			thumbnail: "https://picsum.photos/seed/v4/320/180",
// 			title: "Building a Responsive Layout",
// 			channelName: channel?.name || "Your Channel",
// 			channelAvatar: channel?.profilePicture || "https://github.com/shadcn.png",
// 			views: "7.5K",
// 			timestamp: "1 month ago",
// 			duration: "15:08",
// 		},
// 	];

// 	useEffect(() => {
// 		const fetchChannel = async () => {
// 			setIsLoading(true);
// 			try {
// 				// Replace with your actual API endpoint for fetching the user's channel
// 				const response = await axios.get(`${apiurl}/channels/me`, { withCredentials: true });
// 				setChannel(response.data.data || response.data.channel || null);
// 			} catch (error) {
// 				console.error("Error fetching channel:", error);
// 				setChannel(null);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};
// 		fetchChannel();
// 	}, []);

// 	const handleUpload = () => {
// 		setUploading(true);
// 		// Simulate upload process
// 		setTimeout(() => {
// 			setUploading(false);
// 		}, 2000);
// 	};

// 	const handleCustomizeChannel = () => {
// 		setIsCustomizeModalOpen(true);
// 	};

// 	const handleUpdateChannel = (updatedChannel: Channel) => {
// 		toast({
// 			title: "Channel Updated",
// 			description: "Your channel details have been updated successfully.",
// 		});
// 	};

// 	if (isLoading) {
// 		return <ChannelSkeleton />;
// 	}

// 	if (!channel) {
// 		return (
// 			<div className="container mx-auto py-20 flex flex-col items-center justify-center">
// 				<h2 className="text-2xl font-bold mb-4">No channel found</h2>
// 				<p className="mb-8 text-muted-foreground">Create a channel to start uploading videos and engaging with viewers.</p>
// 				{/* Add a button to create channel if needed */}
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="container mx-auto py-8">
// 			{/* Channel Banner */}
// 			<div className="relative mb-6">
// 				<div className="w-full h-40 md:h-60 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl overflow-hidden">
// 					{channel.channelBanner ? (
// 						<img src={channel.channelBanner} alt="Channel banner" className="w-full h-full object-cover" />
// 					) : (
// 						<div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-600" />
// 					)}
// 				</div>

// 				<div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-6 md:px-6">
// 					<div className="ml-6 md:ml-0 h-24 w-24 rounded-full border-4 border-background bg-background overflow-hidden">
// 						{channel.profilePicture ? (
// 							<img src={channel.profilePicture} alt="Channel avatar" className="w-full h-full object-cover" />
// 						) : (
// 							<div className="w-full h-full bg-gray-300 flex items-center justify-center">
// 								{/* fallback icon */}
// 								<span className="text-gray-500 text-3xl">?</span>
// 							</div>
// 						)}
// 					</div>

// 					<div className="flex-1 ml-6 md:ml-0 mt-2 md:mt-0 md:mb-6">
// 						<h1 className="text-2xl font-bold">{channel.name}</h1>
// 						<p className="text-muted-foreground">
// 							@{channel.handle} • {channel.subscribers || 0} subscribers
// 						</p>
// 					</div>

// 					<div className="flex gap-2 ml-6 md:ml-0 mt-4 md:mt-0 md:mb-6">
// 						<Button variant="outline" className="flex gap-2" onClick={handleCustomizeChannel}>
// 							<Settings size={16} />
// 							Customize Channel
// 						</Button>
// 						<Button variant="outline" className="flex gap-2">
// 							<User size={16} />
// 							Manage Videos
// 						</Button>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Upload button and analytics summary */}
// 			<div className="flex flex-col md:flex-row gap-4 mb-8">
// 				<Card className="flex-1">
// 					<CardContent className="p-6 flex items-center gap-4">
// 						<div className="bg-primary/10 p-4 rounded-full">
// 							<Upload className="text-primary" />
// 						</div>
// 						<div className="flex-1">
// 							<h3 className="font-medium">Upload a video</h3>
// 							<p className="text-sm text-muted-foreground">Share your content with viewers</p>
// 						</div>
// 						<Button onClick={handleUpload} disabled={uploading}>
// 							{uploading ? "Uploading..." : "Upload"}
// 						</Button>
// 					</CardContent>
// 				</Card>

// 				<Card className="flex-1">
// 					<CardContent className="p-6">
// 						<h3 className="font-medium mb-2">Channel Analytics</h3>
// 						<div className="grid grid-cols-3 gap-4">
// 							<div>
// 								<p className="text-xl font-bold">1.2K</p>
// 								<p className="text-xs text-muted-foreground">Views last 28 days</p>
// 							</div>
// 							<div>
// 								<p className="text-xl font-bold">48</p>
// 								<p className="text-xs text-muted-foreground">New subscribers</p>
// 							</div>
// 							<div>
// 								<p className="text-xl font-bold">124</p>
// 								<p className="text-xs text-muted-foreground">Comments</p>
// 							</div>
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</div>

// 			{/* Channel content tabs */}
// 			<Tabs defaultValue="videos">
// 				<TabsList className="mb-6">
// 					<TabsTrigger value="videos">Videos</TabsTrigger>
// 					<TabsTrigger value="playlists">Playlists</TabsTrigger>
// 					<TabsTrigger value="channels">Channels</TabsTrigger>
// 					<TabsTrigger value="about">About</TabsTrigger>
// 				</TabsList>

// 				<TabsContent value="videos" className="space-y-6">
// 					<div className="flex justify-between items-center">
// 						<h2 className="text-xl font-bold">Your Videos</h2>
// 						<Select>
// 							<SelectTrigger className="w-[220px]">
// 								<SelectValue placeholder="Sort by" />
// 							</SelectTrigger>
// 							<SelectContent>
// 								<SelectItem value="recent">Recently uploaded</SelectItem>
// 								<SelectItem value="popular">Most popular</SelectItem>
// 								<SelectItem value="oldest">Date added (oldest)</SelectItem>
// 							</SelectContent>
// 						</Select>
// 					</div>

// 					<VideoGrid videos={channelVideos} />
// 				</TabsContent>

// 				<TabsContent value="playlists">
// 					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// 						<Card>
// 							<CardContent className="p-4">
// 								<div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-2">
// 									<p className="text-lg font-medium">4 videos</p>
// 								</div>
// 								<h3 className="font-medium">Frontend Development</h3>
// 								<p className="text-sm text-muted-foreground">Updated 3 days ago</p>
// 							</CardContent>
// 						</Card>
// 						<Card>
// 							<CardContent className="p-4">
// 								<div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-2">
// 									<p className="text-lg font-medium">6 videos</p>
// 								</div>
// 								<h3 className="font-medium">React Tutorials</h3>
// 								<p className="text-sm text-muted-foreground">Updated 1 week ago</p>
// 							</CardContent>
// 						</Card>
// 					</div>
// 				</TabsContent>

// 				<TabsContent value="channels">
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 						<Card>
// 							<CardContent className="p-6 flex gap-4">
// 								<div className="h-16 w-16 rounded-full overflow-hidden">
// 									<img src="https://picsum.photos/seed/ch1/100/100" alt="Channel" className="h-full w-full object-cover" />
// 								</div>
// 								<div className="flex-1">
// 									<h3 className="font-medium">Web Dev Academy</h3>
// 									<p className="text-sm text-muted-foreground">128K subscribers</p>
// 									<Button size="sm" variant="outline" className="mt-2">
// 										View Channel
// 									</Button>
// 								</div>
// 							</CardContent>
// 						</Card>
// 						<Card>
// 							<CardContent className="p-6 flex gap-4">
// 								<div className="h-16 w-16 rounded-full overflow-hidden">
// 									<img src="https://picsum.photos/seed/ch2/100/100" alt="Channel" className="h-full w-full object-cover" />
// 								</div>
// 								<div className="flex-1">
// 									<h3 className="font-medium">UI/UX Masters</h3>
// 									<p className="text-sm text-muted-foreground">89K subscribers</p>
// 									<Button size="sm" variant="outline" className="mt-2">
// 										View Channel
// 									</Button>
// 								</div>
// 							</CardContent>
// 						</Card>
// 					</div>
// 				</TabsContent>

// 				<TabsContent value="about">
// 					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// 						<div className="md:col-span-2 space-y-6">
// 							<Card>
// 								<CardContent className="p-6">
// 									<h3 className="font-medium mb-2">Description</h3>
// 									<p>
// 										{channel.description ||
// 											"Welcome to my channel! I create content about web development, programming tutorials, and tech reviews. Subscribe for weekly videos on JavaScript, React, CSS and more."}
// 									</p>
// 								</CardContent>
// 							</Card>

// 							<Card>
// 								<CardContent className="p-6">
// 									<h3 className="font-medium mb-2">Details</h3>
// 									<div className="space-y-2">
// 										<div className="flex justify-between">
// 											<span className="text-muted-foreground">Location:</span>
// 											<span>United States</span>
// 										</div>
// 										<div className="flex justify-between">
// 											<span className="text-muted-foreground">Joined:</span>
// 											<span>{channel.createdAt ? new Date(channel.createdAt).toLocaleDateString() : "Jan 15, 2022"}</span>
// 										</div>
// 										<div className="flex justify-between">
// 											<span className="text-muted-foreground">Total Views:</span>
// 											<span>1.4M</span>
// 										</div>
// 									</div>
// 								</CardContent>
// 							</Card>
// 						</div>

// 						<div>
// 							<Card>
// 								<CardContent className="p-6">
// 									<h3 className="font-medium mb-2">Links</h3>
// 									<div className="space-y-2">
// 										<Button variant="link" className="p-0 h-auto">
// 											Twitter
// 										</Button>
// 										<Button variant="link" className="p-0 h-auto">
// 											Instagram
// 										</Button>
// 										<Button variant="link" className="p-0 h-auto">
// 											Personal Website
// 										</Button>
// 									</div>
// 								</CardContent>
// 							</Card>
// 						</div>
// 					</div>
// 				</TabsContent>
// 			</Tabs>

// 			{/* Customize Channel Modal */}
// 			<CustomizeChannelModal
// 				open={isCustomizeModalOpen}
// 				onOpenChange={setIsCustomizeModalOpen}
// 				activeChannel={channel}
// 				onUpdateChannel={handleUpdateChannel}
// 			/>
// 		</div>
// 	);
// };

// export default YourChannelPage;

////

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { Button } from "../components/ui/button";
// import { Card, CardContent } from "../components/ui/card";
// import VideoGrid from "../components/video/VideoGrid";
// import { Settings, User, Upload, Bell, PlusCircle, ChevronDown } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// // import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";
// import CustomizeChannelModal from "@/components/channel/CustomizeChannelModal";
// import { apiurl } from "@/constants";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import ChannelSkeleton from "@/components/skeleton/Channel";
// import { formatDuration } from "@/utils/helper";
// import ErrorPage from "@/components/ui/ErrorPage";

// // Type definition for a channel
// interface Channel {
// 	id: string;
// 	name: string;
// 	handle: string;
// 	description?: string;
// 	profilePicture?: string | null;
// 	channelBanner?: string | null;
// 	createdAt: string;
// 	subscribers?: string;
// }

// const YourChannelPage = () => {
// 	const [uploading, setUploading] = useState(false);
// 	const [channel, setChannel] = useState<Channel | null>(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
// 	const navigate = useNavigate();
// 	const { toast } = useToast();
// 	const [videos, setVideos] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState("");

// 	useEffect(() => {
// 		const fetchChannel = async () => {
// 			setIsLoading(true);
// 			try {
// 				// Replace with your actual API endpoint for fetching the user's channel
// 				const response = await axios.get(`${apiurl}/channels/me`, { withCredentials: true });
// 				setChannel(response.data.data || response.data.channel || null);
// 			} catch (error) {
// 				console.error("Error fetching channel:", error);
// 				setChannel(null);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};
// 		fetchChannel();
// 	}, []);

// 	useEffect(() => {
// 		const fetchVideos = async () => {
// 			try {
// 				const token = localStorage.getItem("accessToken");
// 				const response = await axios.get(`${apiurl}/videos`, {
// 					headers: { Authorization: `Bearer ${token}` },
// 				});

// 				const mappedVideos = response.data.data.rows.map((video: any) => ({
// 					id: video.id,
// 					thumbnail: video.thumbnail,
// 					title: video.title,
// 					channelName: video.channel?.name || "Unknown Channel",
// 					channelAvatar: video.channel?.profilePicture || "/default-avatar.png",
// 					handle: video.channel?.handle || "",
// 					views: video.views?.toString() || "0",
// 					timestamp: video.createdAt,
// 					duration: formatDuration(video.duration),
// 				}));
// 				setVideos(mappedVideos);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || "Failed to fetch videos");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchVideos();
// 	}, []);

// 	const handleUpload = () => {
// 		setUploading(true);
// 		// Simulate upload process
// 		setTimeout(() => {
// 			setUploading(false);
// 		}, 2000);
// 	};

// 	const handleCustomizeChannel = () => {
// 		setIsCustomizeModalOpen(true);
// 	};

// 	const handleUpdateChannel = (updatedChannel: Channel) => {
// 		toast({
// 			title: "Channel Updated",
// 			description: "Your channel details have been updated successfully.",
// 		});
// 	};

// 	if (isLoading) {
// 		return <ChannelSkeleton />;
// 	}

// 	if (!channel) {
// 		return (
// 			<div className="container mx-auto py-20 flex flex-col items-center justify-center">
// 				<h2 className="text-2xl font-bold mb-4">No channel found</h2>
// 				<p className="mb-8 text-muted-foreground">Create a channel to start uploading videos and engaging with viewers.</p>
// 				{/* Add a button to create channel if needed */}
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="container mx-auto py-8">
// 			{/* Channel Banner */}
// 			<div className="relative mb-6">
// 				<div className="w-full h-40 md:h-60 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl overflow-hidden">
// 					{channel.channelBanner ? (
// 						<img src={channel.channelBanner} alt="Channel banner" className="w-full h-full object-cover" />
// 					) : (
// 						<div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-600" />
// 					)}
// 				</div>

// 				<div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-6 md:px-6">
// 					<div className="ml-6 md:ml-0 h-24 w-24 rounded-full border-4 border-background bg-background overflow-hidden">
// 						{channel.profilePicture ? (
// 							<img src={channel.profilePicture} alt="Channel avatar" className="w-full h-full object-cover" />
// 						) : (
// 							<div className="w-full h-full bg-gray-300 flex items-center justify-center">
// 								{/* fallback icon */}
// 								<span className="text-gray-500 text-3xl">?</span>
// 							</div>
// 						)}
// 					</div>

// 					<div className="flex-1 ml-6 md:ml-0 mt-2 md:mt-0 md:mb-6">
// 						<h1 className="text-2xl font-bold">{channel.name}</h1>
// 						<p className="text-muted-foreground">
// 							@{channel.handle} • {channel.subscribers || 0} subscribers
// 						</p>
// 					</div>

// 					<div className="flex gap-2 ml-6 md:ml-0 mt-4 md:mt-0 md:mb-6">
// 						<Button variant="outline" className="flex gap-2" onClick={handleCustomizeChannel}>
// 							<Settings size={16} />
// 							Customize Channel
// 						</Button>
// 						<Button variant="outline" className="flex gap-2">
// 							<User size={16} />
// 							Manage Videos
// 						</Button>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Upload button and analytics summary */}
// 			<div className="flex flex-col md:flex-row gap-4 mb-8">
// 				<Card className="flex-1">
// 					<CardContent className="p-6 flex items-center gap-4">
// 						<div className="bg-primary/10 p-4 rounded-full">
// 							<Upload className="text-primary" />
// 						</div>
// 						<div className="flex-1">
// 							<h3 className="font-medium">Upload a video</h3>
// 							<p className="text-sm text-muted-foreground">Share your content with viewers</p>
// 						</div>
// 						<Button onClick={handleUpload} disabled={uploading}>
// 							{uploading ? "Uploading..." : "Upload"}
// 						</Button>
// 					</CardContent>
// 				</Card>

// 				<Card className="flex-1">
// 					<CardContent className="p-6">
// 						<h3 className="font-medium mb-2">Channel Analytics</h3>
// 						<div className="grid grid-cols-3 gap-4">
// 							<div>
// 								<p className="text-xl font-bold">1.2K</p>
// 								<p className="text-xs text-muted-foreground">Views last 28 days</p>
// 							</div>
// 							<div>
// 								<p className="text-xl font-bold">48</p>
// 								<p className="text-xs text-muted-foreground">New subscribers</p>
// 							</div>
// 							<div>
// 								<p className="text-xl font-bold">124</p>
// 								<p className="text-xs text-muted-foreground">Comments</p>
// 							</div>
// 						</div>
// 					</CardContent>
// 				</Card>
// 			</div>

// 			{/* Channel content tabs */}
// 			<Tabs defaultValue="videos">
// 				<TabsList className="mb-6">
// 					<TabsTrigger value="videos">Videos</TabsTrigger>
// 					<TabsTrigger value="playlists">Playlists</TabsTrigger>
// 					<TabsTrigger value="channels">Channels</TabsTrigger>
// 					<TabsTrigger value="about">About</TabsTrigger>
// 				</TabsList>

// 				<TabsContent value="videos" className="space-y-6">
// 					<div className="flex justify-between items-center">
// 						<h2 className="text-xl font-bold">Your Videos</h2>
// 						<Select>
// 							<SelectTrigger className="w-[220px]">
// 								<SelectValue placeholder="Sort by" />
// 							</SelectTrigger>
// 							<SelectContent>
// 								<SelectItem value="recent">Recently uploaded</SelectItem>
// 								<SelectItem value="popular">Most popular</SelectItem>
// 								<SelectItem value="oldest">Date added (oldest)</SelectItem>
// 							</SelectContent>
// 						</Select>
// 					</div>

// 					{error ? (
// 						<ErrorPage message={error} />
// 					) : loading ? (
// 						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
// 							{Array.from({ length: 8 }).map((_, index) => (
// 								<div key={index} className="animate-pulse flex flex-col">
// 									<div className="aspect-[16/9] bg-muted rounded-lg"></div>
// 									<div className="mt-2 h-4 bg-muted rounded"></div>
// 									<div className="mt-1 h-4 bg-muted rounded w-3/4"></div>
// 								</div>
// 							))}
// 						</div>
// 					) : (
// 						<VideoGrid videos={videos} />
// 					)}
// 				</TabsContent>

// 				<TabsContent value="playlists">
// 					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// 						<Card>
// 							<CardContent className="p-4">
// 								<div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-2">
// 									<p className="text-lg font-medium">4 videos</p>
// 								</div>
// 								<h3 className="font-medium">Frontend Development</h3>
// 								<p className="text-sm text-muted-foreground">Updated 3 days ago</p>
// 							</CardContent>
// 						</Card>
// 						<Card>
// 							<CardContent className="p-4">
// 								<div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-2">
// 									<p className="text-lg font-medium">6 videos</p>
// 								</div>
// 								<h3 className="font-medium">React Tutorials</h3>
// 								<p className="text-sm text-muted-foreground">Updated 1 week ago</p>
// 							</CardContent>
// 						</Card>
// 					</div>
// 				</TabsContent>

// 				<TabsContent value="channels">
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 						<Card>
// 							<CardContent className="p-6 flex gap-4">
// 								<div className="h-16 w-16 rounded-full overflow-hidden">
// 									<img src="https://picsum.photos/seed/ch1/100/100" alt="Channel" className="h-full w-full object-cover" />
// 								</div>
// 								<div className="flex-1">
// 									<h3 className="font-medium">Web Dev Academy</h3>
// 									<p className="text-sm text-muted-foreground">128K subscribers</p>
// 									<Button size="sm" variant="outline" className="mt-2">
// 										View Channel
// 									</Button>
// 								</div>
// 							</CardContent>
// 						</Card>
// 						<Card>
// 							<CardContent className="p-6 flex gap-4">
// 								<div className="h-16 w-16 rounded-full overflow-hidden">
// 									<img src="https://picsum.photos/seed/ch2/100/100" alt="Channel" className="h-full w-full object-cover" />
// 								</div>
// 								<div className="flex-1">
// 									<h3 className="font-medium">UI/UX Masters</h3>
// 									<p className="text-sm text-muted-foreground">89K subscribers</p>
// 									<Button size="sm" variant="outline" className="mt-2">
// 										View Channel
// 									</Button>
// 								</div>
// 							</CardContent>
// 						</Card>
// 					</div>
// 				</TabsContent>

// 				<TabsContent value="about">
// 					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// 						<div className="md:col-span-2 space-y-6">
// 							<Card>
// 								<CardContent className="p-6">
// 									<h3 className="font-medium mb-2">Description</h3>
// 									<p>
// 										{channel.description ||
// 											"Welcome to my channel! I create content about web development, programming tutorials, and tech reviews. Subscribe for weekly videos on JavaScript, React, CSS and more."}
// 									</p>
// 								</CardContent>
// 							</Card>

// 							<Card>
// 								<CardContent className="p-6">
// 									<h3 className="font-medium mb-2">Details</h3>
// 									<div className="space-y-2">
// 										<div className="flex justify-between">
// 											<span className="text-muted-foreground">Location:</span>
// 											<span>United States</span>
// 										</div>
// 										<div className="flex justify-between">
// 											<span className="text-muted-foreground">Joined:</span>
// 											<span>{channel.createdAt ? new Date(channel.createdAt).toLocaleDateString() : "Jan 15, 2022"}</span>
// 										</div>
// 										<div className="flex justify-between">
// 											<span className="text-muted-foreground">Total Views:</span>
// 											<span>1.4M</span>
// 										</div>
// 									</div>
// 								</CardContent>
// 							</Card>
// 						</div>

// 						<div>
// 							<Card>
// 								<CardContent className="p-6">
// 									<h3 className="font-medium mb-2">Links</h3>
// 									<div className="space-y-2">
// 										<Button variant="link" className="p-0 h-auto">
// 											Twitter
// 										</Button>
// 										<Button variant="link" className="p-0 h-auto">
// 											Instagram
// 										</Button>
// 										<Button variant="link" className="p-0 h-auto">
// 											Personal Website
// 										</Button>
// 									</div>
// 								</CardContent>
// 							</Card>
// 						</div>
// 					</div>
// 				</TabsContent>
// 			</Tabs>

// 			{/* Customize Channel Modal */}
// 			<CustomizeChannelModal
// 				open={isCustomizeModalOpen}
// 				onOpenChange={setIsCustomizeModalOpen}
// 				activeChannel={channel}
// 				onUpdateChannel={handleUpdateChannel}
// 			/>
// 		</div>
// 	);
// };

// export default YourChannelPage;

////

import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import VideoGrid from "../components/video/VideoGrid";
import { Settings, User, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CustomizeChannelModal from "@/components/channel/CustomizeChannelModal";
import { apiurl } from "@/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChannelSkeleton from "@/components/skeleton/Channel";
import { formatDuration } from "@/utils/helper";
import ErrorPage from "@/components/ui/ErrorPage";

// Type definition for a channel
interface Channel {
	id: string;
	name: string;
	handle: string;
	description?: string;
	profilePicture?: string | null;
	channelBanner?: string | null;
	createdAt: string;
	subscribers?: string;
}

// Type definition for a video
interface Video {
	id: string;
	thumbnail: string;
	title: string;
	channelName: string;
	channelAvatar: string;
	handle: string;
	views: string;
	timestamp: string;
	duration: string;
}

const YourChannelPage = () => {
	const [uploading, setUploading] = useState(false);
	const [channel, setChannel] = useState<Channel | null>(null);
	const [videos, setVideos] = useState<Video[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { toast } = useToast();

	// useEffect(() => {
	// 	const fetchChannelAndVideos = async () => {
	// 		setIsLoading(true);
	// 		try {
	// 			// Fetch channel details
	// 			const channelResponse = await axios.get(`${apiurl}/channels/me`, {
	// 				headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
	// 			});
	// 			const channelData = channelResponse.data.data || channelResponse.data.channel || null;
	// 			setChannel(channelData);

	// 			if (channelData) {
	// 				// Fetch videos
	// 				const videosResponse = await axios.get(`${apiurl}/videos`, {
	// 					headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
	// 				});
	// 				const allVideos = videosResponse.data.data.rows || videosResponse.data.data || [];

	// 				// Filter videos where channelName matches channel.name
	// 				const filteredVideos = allVideos
	// 					.filter((video: any) => video.channel?.name === channelData.name)
	// 					.map((video: any) => ({
	// 						id: video.id,
	// 						thumbnail: video.thumbnail,
	// 						title: video.title,
	// 						channelName: video.channel?.name || "Unknown Channel",
	// 						channelAvatar: video.channel?.profilePicture || "/default-avatar.png",
	// 						handle: video.channel?.handle || "",
	// 						views: video.views?.toString() || "0",
	// 						timestamp: video.createdAt,
	// 						duration: formatDuration(video.duration),
	// 					}));
	// 				setVideos(filteredVideos);
	// 			}
	// 		} catch (err: any) {
	// 			console.error("Error fetching data:", err);
	// 			setError(err.response?.data?.message || "Failed to fetch channel or videos");
	// 			setChannel(null);
	// 			setVideos([]);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};
	// 	fetchChannelAndVideos();
	// }, []);

	useEffect(() => {
		const fetchChannelAndVideos = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get(`${apiurl}/channels/me`, {
					headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
				});

				if (!data?.data && !data?.channel) {
					navigate("/create-channel", { replace: true });
					return;
				}

				const channelData = data.data || data.channel;
				setChannel(channelData);
			} catch (err: any) {
				if (err?.response?.status === 404) {
					navigate("/create-channel", { replace: true });
					return;
				}
				setError(err.response?.data?.message ?? "Failed to fetch channel or videos");
			} finally {
				setIsLoading(false);
			}
		};
		fetchChannelAndVideos();
	}, [navigate]);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				const response = await axios.get(`${apiurl}/videos`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const mappedVideos = response.data.data.rows.map((video: any) => ({
					id: video.id,
					thumbnail: video.thumbnail,
					title: video.title,
					channelName: video.channel?.name || "Unknown Channel",
					channelAvatar: video.channel?.profilePicture || "/default-avatar.png",
					handle: video.channel?.handle || "",
					views: video.views?.toString() || "0",
					timestamp: video.createdAt,
					duration: formatDuration(video.duration),
				}));
				setVideos(mappedVideos);
			} catch (err: any) {
				setError(err.response?.data?.message || "Failed to fetch videos");
			} finally {
				setIsLoading(false);
			}
		};

		fetchVideos();
	}, []);

	const handleUpload = () => {
		setUploading(true);
		setTimeout(() => {
			setUploading(false);
			toast({
				title: "Upload Complete",
				description: "Your video has been uploaded successfully.",
			});
		}, 2000);
	};

	const handleCustomizeChannel = () => {
		setIsCustomizeModalOpen(true);
	};

	const handleUpdateChannel = (updatedChannel: Channel) => {
		setChannel(updatedChannel);
		toast({
			title: "Channel Updated",
			description: "Your channel details have been updated successfully.",
		});
	};

	if (isLoading) {
		return <ChannelSkeleton />;
	}

	if (error) {
		return <ErrorPage message={error} />;
	}

	if (!channel) {
		return (
			<div className="container mx-auto py-20 flex flex-col items-center justify-center">
				<h2 className="text-2xl font-bold mb-4">No channel found</h2>
				<p className="mb-8 text-muted-foreground">Create a channel to start uploading videos and engaging with viewers.</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8">
			{/* Channel Banner */}
			<div className="relative mb-6">
				<div className="w-full h-40 md:h-60 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl overflow-hidden">
					{channel.channelBanner ? (
						<img src={channel.channelBanner} alt="Channel banner" className="w-full h-full object-cover" />
					) : (
						<div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-600" />
					)}
				</div>

				<div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-6 md:px-6">
					<div className="ml-6 md:ml-0 h-24 w-24 rounded-full border-4 border-background bg-background overflow-hidden">
						{channel.profilePicture ? (
							<img src={channel.profilePicture} alt="Channel avatar" className="w-full h-full object-cover" />
						) : (
							<div className="w-full h-full bg-gray-300 flex items-center justify-center">
								<span className="text-gray-500 text-3xl">?</span>
							</div>
						)}
					</div>

					<div className="flex-1 ml-6 md:ml-0 mt-2 md:mt-0 md:mb-6">
						<h1 className="text-2xl font-bold">{channel.name}</h1>
						<p className="text-muted-foreground">
							@{channel.handle} • {channel.subscribers || 0} subscribers
						</p>
					</div>

					<div className="flex gap-2 ml-6 md:ml-0 mt-4 md:mt-0 md:mb-6">
						<Button variant="outline" className="flex gap-2" onClick={handleCustomizeChannel}>
							<Settings size={16} />
							Customize Channel
						</Button>
						<Button variant="outline" className="flex gap-2">
							<User size={16} />
							Manage Videos
						</Button>
					</div>
				</div>
			</div>

			{/* Upload button and analytics summary */}
			<div className="flex flex-col md:flex-row gap-4 mb-8">
				<Card className="flex-1">
					<CardContent className="p-6 flex items-center gap-4">
						<div className="bg-primary/10 p-4 rounded-full">
							<Upload className="text-primary" />
						</div>
						<div className="flex-1">
							<h3 className="font-medium">Upload a video</h3>
							<p className="text-sm text-muted-foreground">Share your content with viewers</p>
						</div>
						<Button onClick={handleUpload} disabled={uploading}>
							{uploading ? "Uploading..." : "Upload"}
						</Button>
					</CardContent>
				</Card>

				<Card className="flex-1">
					<CardContent className="p-6">
						<h3 className="font-medium mb-2">Channel Analytics</h3>
						<div className="grid grid-cols-3 gap-4">
							<div>
								<p className="text-xl font-bold">1.2K</p>
								<p className="text-xs text-muted-foreground">Views last 28 days</p>
							</div>
							<div>
								<p className="text-xl font-bold">48</p>
								<p className="text-xs text-muted-foreground">New subscribers</p>
							</div>
							<div>
								<p className="text-xl font-bold">124</p>
								<p className="text-xs text-muted-foreground">Comments</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Channel content tabs */}
			<Tabs defaultValue="videos">
				<TabsList className="mb-6">
					<TabsTrigger value="videos">Videos</TabsTrigger>
					<TabsTrigger value="playlists">Playlists</TabsTrigger>
					<TabsTrigger value="channels">Channels</TabsTrigger>
					<TabsTrigger value="about">About</TabsTrigger>
				</TabsList>

				<TabsContent value="videos" className="space-y-6">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold">Your Videos</h2>
						<Select>
							<SelectTrigger className="w-[220px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="recent">Recently uploaded</SelectItem>
								<SelectItem value="popular">Most popular</SelectItem>
								<SelectItem value="oldest">Date added (oldest)</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{error ? (
						<ErrorPage message={error} />
					) : isLoading ? (
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
							{Array.from({ length: 8 }).map((_, index) => (
								<div key={index} className="animate-pulse flex flex-col">
									<div className="aspect-[16/9] bg-muted rounded-lg"></div>
									<div className="mt-2 h-4 bg-muted rounded"></div>
									<div className="mt-1 h-4 bg-muted rounded w-3/4"></div>
								</div>
							))}
						</div>
					) : (
						<VideoGrid videos={videos} />
					)}
				</TabsContent>

				<TabsContent value="playlists">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card>
							<CardContent className="p-4">
								<div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-2">
									<p className="text-lg font-medium">4 videos</p>
								</div>
								<h3 className="font-medium">Frontend Development</h3>
								<p className="text-sm text-muted-foreground">Updated 3 days ago</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4">
								<div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-2">
									<p className="text-lg font-medium">6 videos</p>
								</div>
								<h3 className="font-medium">React Tutorials</h3>
								<p className="text-sm text-muted-foreground">Updated 1 week ago</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="channels">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card>
							<CardContent className="p-6 flex gap-4">
								<div className="h-16 w-16 rounded-full overflow-hidden">
									<img src="https://picsum.photos/seed/ch1/100/100" alt="Channel" className="h-full w-full object-cover" />
								</div>
								<div className="flex-1">
									<h3 className="font-medium">Web Dev Academy</h3>
									<p className="text-sm text-muted-foreground">128K subscribers</p>
									<Button size="sm" variant="outline" className="mt-2">
										View Channel
									</Button>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6 flex gap-4">
								<div className="h-16 w-16 rounded-full overflow-hidden">
									<img src="https://picsum.photos/seed/ch2/100/100" alt="Channel" className="h-full w-full object-cover" />
								</div>
								<div className="flex-1">
									<h3 className="font-medium">UI/UX Masters</h3>
									<p className="text-sm text-muted-foreground">89K subscribers</p>
									<Button size="sm" variant="outline" className="mt-2">
										View Channel
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="about">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="md:col-span-2 space-y-6">
							<Card>
								<CardContent className="p-6">
									<h3 className="font-medium mb-2">Description</h3>
									<p>
										{channel.description ||
											"Welcome to my channel! I create content about web development, programming tutorials, and tech reviews. Subscribe for weekly videos on JavaScript, React, CSS and more."}
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<h3 className="font-medium mb-2">Details</h3>
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Location:</span>
											<span>United States</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Joined:</span>
											<span>{channel.createdAt ? new Date(channel.createdAt).toLocaleDateString() : "Jan 15, 2022"}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Total Views:</span>
											<span>1.4M</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						<div>
							<Card>
								<CardContent className="p-6">
									<h3 className="font-medium mb-2">Links</h3>
									<div className="space-y-2">
										<Button variant="link" className="p-0 h-auto">
											Twitter
										</Button>
										<Button variant="link" className="p-0 h-auto">
											Instagram
										</Button>
										<Button variant="link" className="p-0 h-auto">
											Personal Website
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</TabsContent>
			</Tabs>

			{/* Customize Channel Modal */}
			<CustomizeChannelModal
				open={isCustomizeModalOpen}
				onOpenChange={setIsCustomizeModalOpen}
				activeChannel={channel}
				onUpdateChannel={handleUpdateChannel}
			/>
		</div>
	);
};

export default YourChannelPage;
