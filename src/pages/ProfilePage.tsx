import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Clock, Twitter, Github, Globe } from "lucide-react";
import axios from "axios";
import ProfileSkeleton from "@/components/skeleton/profile";
import ErrorPage from "@/components/ui/ErrorPage";
// import { Link } from "react-router-dom";
import VideoGrid from "@/components/video/VideoGrid";
import { apiurl } from "@/constants";
import { mapApiVideos } from "@/hooks/useVideos";
import type { Video } from "@/hooks/useVideos";

// interface Profile {
// 	id: string;
// 	username: string;
// 	fullName: string;
// 	email: string;
// 	avatar?: string;
// 	bio?: string;
// 	createdAt?: string;
// }

export interface Profile {
	id: number;
	fullName: string;
	username: string;
	email: string;
	avatar: string;
	coverImage: string;
	name: string;
	handle: string;
	description: string;
	profilePicture: string;
	bannerPicture: string;
	subscriberCount: number;
	ownerId: number;
	createdAt: string;
	updatedAt: string;
}

const ProfilePage = () => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [videos, setVideos] = useState<Video[]>([]);
	const [videosLoading, setVideosLoading] = useState(false);
	const [channelId, setChannelId] = useState<string | null>(null);

	const fetchProfile = async () => {
		try {
			setLoading(true);
			setError("");
			const response = await axios.get(`${apiurl}/users/current-user`, {
				withCredentials: true,
			});
			setProfile(response.data.data);
			// Fetch channel info after profile
			const channelRes = await axios.get(`${apiurl}/channels/me`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
			});
			setChannelId(channelRes.data.data?.id || channelRes.data.channel?.id || null);
		} catch (err) {
			setError(
				axios.isAxiosError(err) && err.response?.data && typeof err.response.data.message === "string"
					? err.response.data.message
					: "Failed to fetch profile data"
			);
		} finally {
			setLoading(false);
		}
	};

	console.log("Profile data:", profile);
	const fetchUserVideos = async () => {
		try {
			setVideosLoading(true);
			const response = await axios.get(`${apiurl}/videos`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
			});
			const mappedVideos = mapApiVideos(response.data.data.rows || response.data.data, channelId || "");
			setVideos(mappedVideos);
		} catch (err) {
			console.error("Failed to fetch user videos:", err);
		} finally {
			setVideosLoading(false);
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	useEffect(() => {
		if (channelId) {
			fetchUserVideos();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [channelId]);

	if (loading) {
		return <ProfileSkeleton />;
	}

	if (error) {
		return <ErrorPage message={error} onRetry={fetchProfile} />;
	}

	return (
		<div className="container mx-auto py-8">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Profile sidebar */}
				<div className="w-full md:w-1/3">
					<Card>
						<CardHeader className="pb-0">
							<div className="flex flex-col items-center">
								<Avatar className="h-24 w-24">
									<AvatarImage src={profile?.avatar} alt={profile?.fullName} />
									<AvatarFallback>{profile?.fullName?.charAt(0)}</AvatarFallback>
								</Avatar>
								<h2 className="text-2xl font-bold mt-4">{profile?.fullName}</h2>
								<p className="text-muted-foreground">@{profile?.username}</p>
								<p className="text-sm mt-2">Joined {new Date(profile?.createdAt).toLocaleDateString()}</p>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Subscribers</span>
									<span className="font-medium">{profile?.subscriberCount || 0}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Total views</span>
									<span className="font-medium">{profile?.totalViews || 0}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Videos</span>
									<span className="font-medium">{videos.length}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Email</span>
									<span className="font-medium">{profile?.email}</span>
								</div>
							</div>
							<div className="mt-6 space-y-2">
								<Button className="w-full" variant="outline">
									Edit Profile
								</Button>
								<Button className="w-full flex gap-2" variant="secondary">
									<Settings size={16} />
									Account Settings
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Profile content */}
				<div className="w-full md:w-2/3">
					<Tabs defaultValue="about">
						<TabsList className="mb-6">
							<TabsTrigger value="about">About</TabsTrigger>
							<TabsTrigger value="videos">Videos</TabsTrigger>
							<TabsTrigger value="playlists">Playlists</TabsTrigger>
							<TabsTrigger value="community">Community</TabsTrigger>
						</TabsList>

						<TabsContent value="about" className="space-y-6">
							<Card>
								<CardHeader>
									<h3 className="text-lg font-medium">Channel Description</h3>
								</CardHeader>
								<CardContent>
									<p>{profile?.description || "No description available."}</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<h3 className="text-lg font-medium">Details</h3>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex gap-3">
										<User size={20} />
										<p>{profile?.bio || "No bio available."}</p>
									</div>
									<div className="flex gap-3">
										<Clock size={20} />
										<p>Uploads every Wednesday at 3:00 PM</p>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<h3 className="text-lg font-medium">Links</h3>
								</CardHeader>
								<CardContent className="space-y-3">
									<Button variant="link" className="flex items-center gap-2 p-0 h-auto">
										<Twitter className="h-6 w-6" />
										<span>{profile?.twitter || "Twitter"}</span>
									</Button>
									<Button variant="link" className="flex items-center gap-2 p-0 h-auto">
										<Github className="h-5 w-5" />
										<span>{profile?.github || "GitHub"}</span>
									</Button>
									<Button variant="link" className="flex items-center gap-2 p-0 h-auto">
										<Globe className="h-5 w-5" />
										<span>{profile?.website || "Personal Website"}</span>
									</Button>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="videos">
							{videosLoading ? (
								<p className="text-center text-muted-foreground">Loading videos...</p>
							) : videos.length > 0 ? (
								<VideoGrid videos={videos} />
							) : (
								<p className="text-center text-muted-foreground">No videos found.</p>
							)}
						</TabsContent>

						<TabsContent value="playlists">
							{/* Playlists Tab Content */}
							<p className="text-center text-muted-foreground">Playlists will be displayed here.</p>
						</TabsContent>

						<TabsContent value="community">
							<Card>
								<CardContent className="p-6">
									<p className="text-center text-muted-foreground">No community posts yet.</p>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
