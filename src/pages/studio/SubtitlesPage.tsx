import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const StudioSubtitlesPage = () => {
	// Mock data for videos with subtitle status
	const videos = [
		{
			id: "vid1",
			title: "How to Build a React App in 10 Minutes",
			subtitles: [
				{ language: "English", type: "Auto-generated", status: "Published" },
				{ language: "Spanish", type: "Community", status: "Published" },
			],
		},
		{
			id: "vid2",
			title: "The Ultimate Guide to Tailwind CSS",
			subtitles: [
				{ language: "English", type: "Auto-generated", status: "Published" },
				{ language: "French", type: "Creator", status: "Published" },
			],
		},
		{
			id: "vid3",
			title: "JavaScript Tips and Tricks",
			subtitles: [{ language: "English", type: "Auto-generated", status: "Published" }],
		},
		{
			id: "vid4",
			title: "Building a Portfolio Website - Full Tutorial",
			subtitles: [
				{ language: "English", type: "Auto-generated", status: "Published" },
				{ language: "German", type: "Community", status: "In review" },
				{ language: "Japanese", type: "Community", status: "Published" },
			],
		},
	];

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">Subtitles</h1>

			<div className="flex items-center space-x-2">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input type="search" placeholder="Search videos..." className="pl-8" />
				</div>
				<Button variant="outline">Filter</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Your Videos</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50%]">Video</TableHead>
								<TableHead>Languages</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{videos.map((video) => (
								<TableRow key={video.id}>
									<TableCell className="font-medium">{video.title}</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1.5">
											{video.subtitles.map((subtitle, index) => (
												<div
													key={index}
													className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs"
													title={`${subtitle.type}, Status: ${subtitle.status}`}
												>
													{subtitle.language}
												</div>
											))}
										</div>
									</TableCell>
									<TableCell>
										<Button variant="outline" size="sm">
											Manage Subtitles
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<div className="space-y-6">
				<h2 className="text-xl font-semibold">Subtitling Options</h2>
				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Auto-generate Subtitles</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">YouTube can automatically generate subtitles in various languages for your videos.</p>
							<Button>Configure Auto-generation</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Community Contributions</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">Allow your community to help by adding subtitles to your videos.</p>
							<Button>Manage Community Settings</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default StudioSubtitlesPage;
