import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

// Mock search results
const mockSearchResults = [
	{
		id: "video1",
		thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=200&fit=crop",
		title: "Building a YouTube Clone with React and Tailwind CSS",
		channelName: "Web Dev Mastery",
		channelAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
		views: "152K",
		timestamp: "2 weeks ago",
		duration: "10:15",
		description: "In this tutorial, we'll build a YouTube clone using React and Tailwind CSS. Learn how to implement responsive design...",
	},
	{
		id: "video2",
		thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
		title: "Learn Tailwind CSS in 30 Minutes - Complete Beginner's Guide",
		channelName: "CodeCraft",
		channelAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
		views: "1.2M",
		timestamp: "8 months ago",
		duration: "31:24",
		description: "This comprehensive guide will teach you everything you need to know about Tailwind CSS in just 30 minutes...",
	},
	{
		id: "video3",
		thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
		title: "React Router v6 - Complete Tutorial with Projects",
		channelName: "JavaScript Guru",
		channelAvatar: "https://randomuser.me/api/portraits/men/46.jpg",
		views: "450K",
		timestamp: "3 months ago",
		duration: "25:50",
		description: "Master React Router v6 with hands-on projects. Learn how to implement dynamic routing, protected routes...",
	},
	{
		id: "video4",
		thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop",
		title: "Build a Netflix Clone with React, Tailwind and Firebase",
		channelName: "TechSolutions",
		channelAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
		views: "2.5M",
		timestamp: "1 year ago",
		duration: "45:12",
		description: "In this complete course, we'll build a Netflix clone from scratch using React, Tailwind CSS and Firebase...",
	},
	{
		id: "video5",
		thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300&h=200&fit=crop",
		title: "JavaScript Fundamentals - From Zero to Hero",
		channelName: "CodeMastery",
		channelAvatar: "https://randomuser.me/api/portraits/men/18.jpg",
		views: "3.1M",
		timestamp: "2 years ago",
		duration: "1:22:45",
		description: "This comprehensive JavaScript course covers everything from variables and functions to advanced concepts like closures...",
	},
];

const SearchResultsPage = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// In a real app, this would be an API call
		setLoading(true);

		setTimeout(() => {
			// Filter results based on query
			const filtered = mockSearchResults.filter(
				(video) =>
					video.title.toLowerCase().includes(query.toLowerCase()) ||
					video.description.toLowerCase().includes(query.toLowerCase()) ||
					video.channelName.toLowerCase().includes(query.toLowerCase())
			);

			setResults(filtered);
			setLoading(false);
		}, 500); // Simulate loading delay
	}, [query]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (results.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-64 text-center">
				<Search size={48} className="text-muted-foreground mb-4" />
				<h2 className="text-xl font-medium">No results found for "{query}"</h2>
				<p className="text-muted-foreground mt-2">Try different keywords or check the spelling</p>
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-xl font-medium mb-6">Search results for "{query}"</h2>

			<div className="flex flex-col gap-6">
				{results.map((result) => (
					<div key={result.id} className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-shrink-0">
							<a href={`/video/${result.id}`} className="block">
								<img src={result.thumbnail} alt={result.title} className="w-full sm:w-64 h-40 object-cover rounded-xl" />
								<span className="video-duration">{result.duration}</span>
							</a>
						</div>
						<div className="flex-1">
							<a href={`/video/${result.id}`}>
								<h3 className="text-lg font-medium line-clamp-2">{result.title}</h3>
							</a>
							<div className="text-sm text-muted-foreground mt-1">
								{result.views} views • {result.timestamp}
							</div>
							<div className="flex items-center gap-2 mt-2 mb-3">
								<img src={result.channelAvatar} alt={result.channelName} className="w-6 h-6 rounded-full" />
								<a href={`/channel/${result.channelName}`} className="text-sm text-muted-foreground hover:text-foreground">
									{result.channelName}
								</a>
							</div>
							<p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchResultsPage;
