import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { History, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

const HistoryPage = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const watchHistory = [
		{
			id: "1",
			title: "How to Build a React App with Tailwind CSS",
			thumbnail: "https://picsum.photos/seed/react1/320/180",
			channelName: "CodeMaster",
			channelAvatar: "https://picsum.photos/seed/cm1/40/40",
			views: "245K",
			timestamp: "2 days ago",
			watchedAt: "Today",
		},
		{
			id: "2",
			title: "10 JavaScript Tips You Should Know",
			thumbnail: "https://picsum.photos/seed/js1/320/180",
			channelName: "WebDev Pro",
			channelAvatar: "https://picsum.photos/seed/wd1/40/40",
			views: "512K",
			timestamp: "1 week ago",
			watchedAt: "Today",
		},
		{
			id: "3",
			title: "Learn Python in 30 Minutes",
			thumbnail: "https://picsum.photos/seed/py1/320/180",
			channelName: "Python Master",
			channelAvatar: "https://picsum.photos/seed/pm1/40/40",
			views: "1.2M",
			timestamp: "3 months ago",
			watchedAt: "Yesterday",
		},
		{
			id: "4",
			title: "CSS Grid vs Flexbox - When to Use Each",
			thumbnail: "https://picsum.photos/seed/css1/320/180",
			channelName: "CSS Wizard",
			channelAvatar: "https://picsum.photos/seed/cw1/40/40",
			views: "876K",
			timestamp: "8 months ago",
			watchedAt: "2 days ago",
		},
	];

	const filteredHistory = searchQuery
		? watchHistory.filter(
				(video) =>
					video.title.toLowerCase().includes(searchQuery.toLowerCase()) || video.channelName.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: watchHistory;

	return (
		<div className="container mx-auto py-8">
			<div className="flex items-center mb-6">
				<History size={24} className="mr-2" />
				<h1 className="text-3xl font-bold">Watch History</h1>
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				{/* Sidebar filters */}
				<div className="w-full md:w-64 space-y-6">
					<div className="space-y-2">
						<h3 className="font-medium">History type</h3>
						<Tabs defaultValue="watch" className="w-full">
							<TabsList className="w-full">
								<TabsTrigger value="watch" className="flex-1">
									Watch
								</TabsTrigger>
								<TabsTrigger value="search" className="flex-1">
									Search
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<Separator />

					<div className="space-y-2">
						<h3 className="font-medium">Manage history</h3>
						<div className="space-y-1">
							<Button variant="ghost" className="w-full justify-start">
								<Search size={16} className="mr-2" />
								Search history
							</Button>
							<Button variant="ghost" className="w-full justify-start">
								<Clock size={16} className="mr-2" />
								Watch later
							</Button>
						</div>
					</div>

					<Separator />

					<div className="space-y-2">
						<h3 className="font-medium">Clear history</h3>
						<div className="space-y-1">
							<Button variant="ghost" className="w-full justify-start text-sm">
								Clear all watch history
							</Button>
							<Button variant="ghost" className="w-full justify-start text-sm">
								Clear search history
							</Button>
							<Button variant="ghost" className="w-full justify-start text-sm">
								Pause watch history
							</Button>
						</div>
					</div>
				</div>

				{/* Main content */}
				<div className="flex-1">
					<div className="mb-6">
						<Input placeholder="Search watch history" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="max-w-md" />
					</div>

					<Tabs defaultValue="all" className="mt-6">
						<TabsList className="flex space-x-2">
							<TabsTrigger value="all" className="px-4 py-2 rounded-lg">
								All History
							</TabsTrigger>
							<TabsTrigger value="recent" className="px-4 py-2 rounded-lg">
								Recently Watched
							</TabsTrigger>
						</TabsList>

						<TabsContent value="all" className="mt-4">
							<div className="space-y-6">
								{filteredHistory.reduce((groups, video) => {
									// Group videos by watchedAt date
									if (!groups[video.watchedAt]) {
										groups[video.watchedAt] = [];
									}
									groups[video.watchedAt].push(video);
									return groups;
								}, {} as Record<string, typeof watchHistory>) &&
									// Convert groups object to array of [date, videos] entries
									Object.entries(
										filteredHistory.reduce((groups, video) => {
											if (!groups[video.watchedAt]) {
												groups[video.watchedAt] = [];
											}
											groups[video.watchedAt].push(video);
											return groups;
										}, {} as Record<string, typeof watchHistory>)
									).map(([date, videos]) => (
										<div key={date}>
											<h3 className="font-medium mb-4">{date}</h3>
											<div className="space-y-4">
												{videos.map((video) => (
													<Card key={video.id} className="overflow-hidden">
														<CardContent className="p-4">
															<div className="flex flex-col md:flex-row gap-4">
																<div className="flex-shrink-0">
																	<img src={video.thumbnail} alt={video.title} className="w-full md:w-48 rounded-md aspect-video object-cover" />
																</div>
																<div className="flex-1">
																	<h4 className="font-medium line-clamp-2">{video.title}</h4>
																	<div className="flex items-center mt-1">
																		<img src={video.channelAvatar} alt={video.channelName} className="w-6 h-6 rounded-full mr-2" />
																		<p className="text-sm text-muted-foreground">{video.channelName}</p>
																	</div>
																	<p className="text-xs text-muted-foreground mt-1">
																		{video.views} views • {video.timestamp}
																	</p>
																</div>
															</div>
														</CardContent>
													</Card>
												))}
											</div>
										</div>
									))}

								{filteredHistory.length === 0 && (
									<div className="text-center py-10">
										<p className="text-muted-foreground">No history found matching your search.</p>
									</div>
								)}
							</div>
						</TabsContent>

						<TabsContent value="recent" className="mt-4">
							<div>
								<h2 className="text-lg font-medium">Recently Watched</h2>
								<p className="text-sm text-muted-foreground">List of recently watched videos.</p>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default HistoryPage;
