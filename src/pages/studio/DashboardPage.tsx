import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const DashboardPage = () => {
	// Mock data

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Channel dashboard</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left column */}
				<Card className="lg:col-span-1">
					<CardContent className="p-0">
						<div className="flex flex-col items-center p-6">
							<div className="flex flex-col items-center text-center mb-4">
								<svg viewBox="0 0 200 200" className="h-32 w-32 text-blue-400 mb-4" fill="currentColor">
									<path d="M80 40c-11 0-20 9-20 20v80c0 11 9 20 20 20h40c11 0 20-9 20-20V60c0-11-9-20-20-20H80zm0 20h40v80H80V60z" />
									<rect x="50" y="80" width="40" height="60" />
									<path d="M140 100c11 0 20-9 20-20s-9-20-20-20-20 9-20 20 9 20 20 20z" />
								</svg>
								<p className="text-lg mb-2">Want to see metrics on your recent video?</p>
								<p className="text-gray-500 mb-6">Upload and publish a video to get started.</p>
							</div>
							<Button className="w-full sm:w-auto flex items-center gap-2">
								<Upload className="h-4 w-4" />
								Upload videos
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Middle column - Channel analytics */}
				<Card className="lg:col-span-1">
					<CardHeader className="pb-2">
						<CardTitle>Channel analytics</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="mb-4">
							<h3 className="text-sm text-muted-foreground mb-1">Current subscribers</h3>
							<p className="text-3xl font-bold">0</p>
						</div>

						<div className="border-t pt-4">
							<h3 className="text-sm text-muted-foreground mb-2">Summary</h3>
							<p className="text-xs text-muted-foreground mb-4">Last 28 days</p>

							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span>Views</span>
									<div className="flex items-center gap-2">
										<span className="font-bold">0</span>
										<span className="text-xs text-muted-foreground">—</span>
									</div>
								</div>
								<div className="flex justify-between items-center">
									<span>Watch time (hours)</span>
									<div className="flex items-center gap-2">
										<span className="font-bold">0.0</span>
										<span className="text-xs text-muted-foreground">—</span>
									</div>
								</div>
							</div>
						</div>

						<div className="border-t pt-4 mt-4">
							<h3 className="text-sm text-muted-foreground mb-2">Top videos</h3>
							<p className="text-xs text-muted-foreground mb-4">Last 48 hours · Views</p>
						</div>

						<div className="mt-4">
							<Button variant="outline" className="w-full">
								Go to channel analytics
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Right column - Creator Insider */}
				<Card className="lg:col-span-1">
					<CardContent className="p-0">
						<div className="p-4 border-b flex items-center justify-between">
							<h3 className="font-semibold">Creator Insider</h3>
							<div className="flex gap-2">
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
									</svg>
								</Button>
								<span className="text-sm flex items-center">1 / 2</span>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
									</svg>
								</Button>
							</div>
						</div>

						<div className="relative">
							<img
								src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
								alt="YouTube video thumbnail"
								className="w-full aspect-video object-cover"
							/>
							<div className="absolute top-2 right-2 bg-white rounded-full p-2 text-xs font-semibold">CREATOR INSIDER</div>
						</div>

						<div className="p-4">
							<h3 className="text-lg font-medium mb-2">This Week at YouTube</h3>
							<p className="text-sm text-gray-600 mb-4">
								Today's topics: Gift combos launch, auto-dubbing expands for YPP creators, and mid-roll improvements coming this May!
							</p>
							<Button variant="outline">Watch on YouTube</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Footer links */}
			<div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-8">
				<a href="#" className="hover:underline">
					Terms of use
				</a>
				<a href="#" className="hover:underline">
					Privacy policy
				</a>
				<a href="#" className="hover:underline">
					Policies and Safety
				</a>
			</div>
		</div>
	);
};

export default DashboardPage;
