import VideoGrid from "@/components/video/VideoGrid";
import { Button } from "@/components/ui/button";
import { BellIcon, Filter, Users, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mockChannels, mockVideos } from "@/data/mockVideos";

const filters = ["All", "Today", "Continue watching", "Unwatched", "Live", "Posts", "Settings"];

const SubscriptionsPage = () => {
	return (
		<div className="container mx-auto py-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Subscriptions</h1>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm">
						<Users className="mr-2 h-4 w-4" />
						Manage
					</Button>
					<Button variant="outline" size="sm">
						<Filter className="mr-2 h-4 w-4" />
						Filter
					</Button>
				</div>
			</div>

			<ScrollArea className="w-full whitespace-nowrap mb-8">
				<div className="flex space-x-2 pb-4">
					{filters.map((filter) => (
						<Button key={filter} variant={filter === "All" ? "default" : "outline"} className="rounded-full">
							{filter}
						</Button>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>

			<div className="mb-8">
				<h2 className="text-xl font-medium mb-4">Channels</h2>
				<ScrollArea className="w-full whitespace-nowrap">
					<div className="flex space-x-4 pb-4">
						{mockChannels.slice(0, 12).map((channel) => (
							<div key={channel.id} className="text-center space-y-1 w-20">
								<div className="relative inline-block">
									<Avatar className="h-16 w-16 border-2 border-transparent hover:border-primary cursor-pointer">
										<AvatarImage src={channel.avatar} alt={channel.name} />
										<AvatarFallback>{channel.name.substring(0, 2)}</AvatarFallback>
									</Avatar>
									{channel.isLive && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-background" />}
									{channel.hasNewContent && (
										<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
											<BellIcon className="h-3 w-3" />
										</span>
									)}
								</div>
								<p className="text-xs font-medium truncate">{channel.name}</p>
							</div>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>

			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-medium">Today</h2>
					<Button variant="link" className="text-base">
						<Clock className="mr-2 h-4 w-4" />
						View all
					</Button>
				</div>
				<VideoGrid videos={mockVideos.slice(0, 8)} />
			</div>

			<div>
				<h2 className="text-xl font-medium mb-4">Yesterday</h2>
				<VideoGrid videos={mockVideos.slice(8)} />
			</div>
		</div>
	);
};

export default SubscriptionsPage;
