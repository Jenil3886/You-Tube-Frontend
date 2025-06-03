// import { useState, useRef, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Search, Play, Pause, Download, Plus, Volume2 } from "lucide-react";

// const StudioAudioLibraryPage = () => {
// 	const [playing, setPlaying] = useState<string | null>(null);
// 	const [currentTime, setCurrentTime] = useState(0);
// 	const [duration, setDuration] = useState(0);
// 	const audioRef = useRef<HTMLAudioElement | null>(null);
// 	const [currentTrack, setCurrentTrack] = useState<any>(null);
// 	const [searchQuery, setSearchQuery] = useState(""); // State for search query
// 	const [genreFilter, setGenreFilter] = useState("all-genres"); // State for genre filter
// 	const [moodFilter, setMoodFilter] = useState("all-moods"); // State for mood filter
// 	const [categoryFilter, setCategoryFilter] = useState("all-categories"); // State for category filter

// 	// Mock data for audio tracks with URLs
// 	const musicTracks = [
// 		{
// 			id: "track1",
// 			title: "Epic Adventure",
// 			artist: "SoundStudio",
// 			genre: "Cinematic",
// 			mood: "Inspirational",
// 			duration: "2:45",
// 			attribution: "No attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
// 		},
// 		{
// 			id: "track2",
// 			title: "Summer Breeze",
// 			artist: "MusicMakers",
// 			genre: "Pop",
// 			mood: "Happy",
// 			duration: "3:12",
// 			attribution: "Attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
// 		},
// 		{
// 			id: "track3",
// 			title: "Digital Dreams",
// 			artist: "TechBeats",
// 			genre: "Electronic",
// 			mood: "Energetic",
// 			duration: "4:05",
// 			attribution: "No attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
// 		},
// 		{
// 			id: "track4",
// 			title: "Peaceful Morning",
// 			artist: "NatureSounds",
// 			genre: "Ambient",
// 			mood: "Calm",
// 			duration: "5:20",
// 			attribution: "Attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
// 		},
// 		{
// 			id: "track5",
// 			title: "Urban Rhythm",
// 			artist: "CityBeats",
// 			genre: "Hip Hop",
// 			mood: "Upbeat",
// 			duration: "2:58",
// 			attribution: "No attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
// 		},
// 	];

// 	const soundEffects = [
// 		{
// 			id: "sfx1",
// 			title: "Thunder Crack",
// 			category: "Weather",
// 			duration: "0:04",
// 			attribution: "No attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/Thunder-Crack.mp3",
// 		},
// 		{
// 			id: "sfx2",
// 			title: "Door Slam",
// 			category: "Household",
// 			duration: "0:02",
// 			attribution: "No attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/Door-Slam.mp3",
// 		},
// 		{
// 			id: "sfx3",
// 			title: "Crowd Cheering",
// 			category: "Audience",
// 			duration: "0:08",
// 			attribution: "Attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/Crowd-Cheering.mp3",
// 		},
// 		{
// 			id: "sfx4",
// 			title: "Car Engine Start",
// 			category: "Vehicles",
// 			duration: "0:03",
// 			attribution: "No attribution required",
// 			license: "Free to use in any content",
// 			url: "https://www.soundhelix.com/examples/mp3/Car-Engine.mp3",
// 		},
// 	];

// 	// Filter music tracks based on search query, genre, and mood
// 	const filteredMusicTracks = musicTracks.filter((track) => {
// 		const matchesSearch =
// 			track.title.toLowerCase().includes(searchQuery.toLowerCase()) || track.artist.toLowerCase().includes(searchQuery.toLowerCase());
// 		const matchesGenre = genreFilter === "all-genres" || track.genre === genreFilter;
// 		const matchesMood = moodFilter === "all-moods" || track.mood === moodFilter;
// 		return matchesSearch && matchesGenre && matchesMood;
// 	});

// 	// Filter sound effects based on search query and category
// 	const filteredSoundEffects = soundEffects.filter((sfx) => {
// 		const matchesSearch = sfx.title.toLowerCase().includes(searchQuery.toLowerCase());
// 		const matchesCategory = categoryFilter === "all-categories" || sfx.category === categoryFilter;
// 		return matchesSearch && matchesCategory;
// 	});

// 	const togglePlay = (track: any) => {
// 		if (playing === track.id) {
// 			if (audioRef.current) {
// 				audioRef.current.pause();
// 				setPlaying(null);
// 				setCurrentTrack(null);
// 			}
// 		} else {
// 			if (audioRef.current) {
// 				audioRef.current.pause();
// 				audioRef.current = null;
// 			}
// 			audioRef.current = new Audio(track.url);
// 			audioRef.current.play().catch((error) => {
// 				console.error("Error playing audio:", error);
// 			});
// 			setPlaying(track.id);
// 			setCurrentTrack(track);

// 			audioRef.current.onloadedmetadata = () => {
// 				setDuration(audioRef.current?.duration || 0);
// 			};
// 			audioRef.current.ontimeupdate = () => {
// 				setCurrentTime(audioRef.current?.currentTime || 0);
// 			};
// 		}
// 	};

// 	useEffect(() => {
// 		return () => {
// 			if (audioRef.current) {
// 				audioRef.current.pause();
// 				audioRef.current = null;
// 			}
// 		};
// 	}, []);

// 	const formatTime = (seconds: number) => {
// 		const mins = Math.floor(seconds / 60);
// 		const secs = Math.floor(seconds % 60);
// 		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
// 	};

// 	return (
// 		<div className="space-y-6">
// 			<h1 className="text-3xl font-bold">Audio Library</h1>
// 			<p className="text-muted-foreground">Free music and sound effects for your YouTube videos</p>

// 			<Tabs defaultValue="music" className="w-full">
// 				<TabsList>
// 					<TabsTrigger value="music">Music</TabsTrigger>
// 					<TabsTrigger value="sound-effects">Sound Effects</TabsTrigger>
// 					<TabsTrigger value="saved">Saved</TabsTrigger>
// 				</TabsList>

// 				<TabsContent value="music" className="mt-6 space-y-6">
// 					<div className="flex flex-col gap-4 md:flex-row">
// 						<div className="relative flex-1">
// 							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// 							<Input
// 								type="search"
// 								placeholder="Search for music..."
// 								className="pl-8"
// 								value={searchQuery}
// 								onChange={(e) => setSearchQuery(e.target.value)}
// 							/>
// 						</div>
// 						<div className="flex gap-2">
// 							<Select value={genreFilter} onValueChange={setGenreFilter}>
// 								<SelectTrigger className="w-[180px]">
// 									<SelectValue placeholder="Genre" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="all-genres">All Genres</SelectItem>
// 									<SelectItem value="Pop">Pop</SelectItem>
// 									<SelectItem value="Rock">Rock</SelectItem>
// 									<SelectItem value="Electronic">Electronic</SelectItem>
// 									<SelectItem value="Cinematic">Cinematic</SelectItem>
// 									<SelectItem value="Ambient">Ambient</SelectItem>
// 								</SelectContent>
// 							</Select>

// 							<Select value={moodFilter} onValueChange={setMoodFilter}>
// 								<SelectTrigger className="w-[180px]">
// 									<SelectValue placeholder="Mood" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="all-moods">All Moods</SelectItem>
// 									<SelectItem value="Happy">Happy</SelectItem>
// 									<SelectItem value="Sad">Sad</SelectItem>
// 									<SelectItem value="Energetic">Energetic</SelectItem>
// 									<SelectItem value="Calm">Calm</SelectItem>
// 									<SelectItem value="Inspirational">Inspirational</SelectItem>
// 								</SelectContent>
// 							</Select>
// 						</div>
// 					</div>

// 					<Card>
// 						<CardHeader>
// 							<CardTitle>Free Music Tracks</CardTitle>
// 							<CardDescription>Music you can use in your YouTube videos</CardDescription>
// 						</CardHeader>
// 						<CardContent className="p-0">
// 							<div className="divide-y">
// 								{filteredMusicTracks.length > 0 ? (
// 									filteredMusicTracks.map((track) => (
// 										<div key={track.id} className="flex items-center p-4 gap-4">
// 											<Button variant="ghost" size="icon" className="flex-shrink-0" onClick={() => togglePlay(track)}>
// 												{playing === track.id ? <Pause size={20} /> : <Play size={20} />}
// 											</Button>
// 											<div className="flex-1 min-w-0">
// 												<h3 className="font-medium truncate">{track.title}</h3>
// 												<div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
// 													<span>{track.artist}</span>
// 													<span>{track.genre}</span>
// 													<span>{track.duration}</span>
// 												</div>
// 											</div>
// 											<div className="flex gap-2">
// 												<Button variant="ghost" size="icon">
// 													<Plus size={18} />
// 												</Button>
// 												<Button variant="ghost" size="icon">
// 													<Download size={18} />
// 												</Button>
// 											</div>
// 										</div>
// 									))
// 								) : (
// 									<div className="p-4 text-center text-muted-foreground">No tracks found</div>
// 								)}
// 							</div>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>

// 				<TabsContent value="sound-effects" className="mt-6 space-y-6">
// 					<div className="flex flex-col gap-4 md:flex-row">
// 						<div className="relative flex-1">
// 							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// 							<Input
// 								type="search"
// 								placeholder="Search for sound effects..."
// 								className="pl-8"
// 								value={searchQuery}
// 								onChange={(e) => setSearchQuery(e.target.value)}
// 							/>
// 						</div>
// 						<div className="flex gap-2">
// 							<Select value={categoryFilter} onValueChange={setCategoryFilter}>
// 								<SelectTrigger className="w-[180px]">
// 									<SelectValue placeholder="Category" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="all-categories">All Categories</SelectItem>
// 									<SelectItem value="Weather">Weather</SelectItem>
// 									<SelectItem value="Household">Household</SelectItem>
// 									<SelectItem value="Audience">Audience</SelectItem>
// 									<SelectItem value="Vehicles">Vehicles</SelectItem>
// 									<SelectItem value="Animals">Animals</SelectItem>
// 								</SelectContent>
// 							</Select>
// 						</div>
// 					</div>

// 					<Card>
// 						<CardHeader>
// 							<CardTitle>Sound Effects</CardTitle>
// 							<CardDescription>Sound effects you can use in your YouTube videos</CardDescription>
// 						</CardHeader>
// 						<CardContent className="p-0">
// 							<div className="divide-y">
// 								{filteredSoundEffects.length > 0 ? (
// 									filteredSoundEffects.map((sfx) => (
// 										<div key={sfx.id} className="flex items-center p-4 gap-4">
// 											<Button variant="ghost" size="icon" className="flex-shrink-0" onClick={() => togglePlay(sfx)}>
// 												{playing === sfx.id ? <Pause size={20} /> : <Play size={20} />}
// 											</Button>
// 											<div className="flex-1 min-w-0">
// 												<h3 className="font-medium truncate">{sfx.title}</h3>
// 												<div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
// 													<span>{sfx.category}</span>
// 													<span>{sfx.duration}</span>
// 												</div>
// 											</div>
// 											<div className="flex gap-2">
// 												<Button variant="ghost" size="icon">
// 													<Plus size={18} />
// 												</Button>
// 												<Button variant="ghost" size="icon">
// 													<Download size={18} />
// 												</Button>
// 											</div>
// 										</div>
// 									))
// 								) : (
// 									<div className="p-4 text-center text-muted-foreground">No sound effects found</div>
// 								)}
// 							</div>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>

// 				<TabsContent value="saved" className="mt-6">
// 					<Card>
// 						<CardHeader>
// 							<CardTitle>Saved Audio</CardTitle>
// 							<CardDescription>Your saved music and sound effects</CardDescription>
// 						</CardHeader>
// 						<CardContent>
// 							<div className="py-8 text-center">
// 								<p className="text-muted-foreground mb-4">You haven't saved any audio tracks yet.</p>
// 								<Button variant="outline">Browse Audio Library</Button>
// 							</div>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>
// 			</Tabs>

// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Audio Library Usage Rules</CardTitle>
// 				</CardHeader>
// 				<CardContent className="space-y-4">
// 					<p className="text-sm text-muted-foreground">
// 						All tracks in the YouTube Audio Library are free to use in your YouTube videos. However, some tracks may require that you credit the
// 						artist in your video description.
// 					</p>
// 					<div className="space-y-2">
// 						<h3 className="font-medium">Attribution Requirements:</h3>
// 						<ul className="list-disc pl-6 text-sm text-muted-foreground">
// 							<li>
// 								<strong>No attribution required</strong>: You can use these tracks without giving credit to the artist.
// 							</li>
// 							<li>
// 								<strong>Attribution required</strong>: You must include the artist name and track title in your video description.
// 							</li>
// 						</ul>
// 					</div>
// 					<div className="space-y-2">
// 						<h3 className="font-medium">Licenses:</h3>
// 						<ul className="list-disc pl-6 text-sm text-muted-foreground">
// 							<li>
// 								<strong>Free to use in any content</strong>: You can use these tracks in any YouTube video, even if it's monetized.
// 							</li>
// 							<li>
// 								<strong>Non-commercial use only</strong>: These tracks can only be used in videos that aren't monetized.
// 							</li>
// 						</ul>
// 					</div>
// 					<p className="text-sm text-muted-foreground">
// 						Content ID claims will not be placed on any tracks in the Audio Library when used in your YouTube videos.
// 					</p>
// 				</CardContent>
// 			</Card>

// 			{/* Playback Bar */}
// 			{currentTrack && (
// 				<div className="fixed bottom-0 left-0 right-0 bg-gray-100 dark: border-t border-gray-300 p-4 flex items-center gap-4">
// 					<Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800" onClick={() => togglePlay(currentTrack)}>
// 						{playing === currentTrack.id ? <Pause size={20} /> : <Play size={20} />}
// 					</Button>
// 					<div className="flex-1">
// 						<div className="flex items-center gap-2">
// 							<span className="text-gray-800 truncate">{currentTrack.title}</span>
// 							<span className="text-gray-600">-</span>
// 							<span className="text-gray-600">{currentTrack.artist}</span>
// 						</div>
// 						<div className="flex items-center gap-2">
// 							<span className="text-gray-600 text-sm">{formatTime(currentTime)}</span>
// 							<input
// 								type="range"
// 								min="0"
// 								max={duration}
// 								value={currentTime}
// 								onChange={(e) => {
// 									if (audioRef.current) {
// 										audioRef.current.currentTime = Number(e.target.value);
// 										setCurrentTime(Number(e.target.value));
// 									}
// 								}}
// 								className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
// 							/>
// 							<span className="text-gray-600 text-sm">{formatTime(duration)}</span>
// 						</div>
// 					</div>
// 					<Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
// 						<Volume2 size={20} />
// 					</Button>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default StudioAudioLibraryPage;

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Play, Pause, Download, Plus, Volume2 } from "lucide-react";

const StudioAudioLibraryPage = () => {
	const [playing, setPlaying] = useState<string | null>(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentTrack, setCurrentTrack] = useState<any>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [genreFilter, setGenreFilter] = useState("all-genres");
	const [moodFilter, setMoodFilter] = useState("all-moods");
	const [categoryFilter, setCategoryFilter] = useState("all-categories");
	const [musicTracks, setMusicTracks] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Mock sound effects (unchanged)
	const soundEffects = [
		{
			id: "sfx1",
			title: "Thunder Crack",
			category: "Weather",
			duration: "0:04",
			attribution: "No attribution required",
			license: "Free to use in any content",
			url: "https://www.soundhelix.com/examples/mp3/Thunder-Crack.mp3",
		},
		{
			id: "sfx2",
			title: "Door Slam",
			category: "Household",
			duration: "0:02",
			attribution: "No attribution required",
			license: "Free to use in any content",
			url: "https://www.soundhelix.com/examples/mp3/Door-Slam.mp3",
		},
		{
			id: "sfx3",
			title: "Crowd Cheering",
			category: "Audience",
			duration: "0:08",
			attribution: "Attribution required",
			license: "Free to use in any content",
			url: "https://www.soundhelix.com/examples/mp3/Crowd-Cheering.mp3",
		},
		{
			id: "sfx4",
			title: "Car Engine Start",
			category: "Vehicles",
			duration: "0:03",
			attribution: "No attribution required",
			license: "Free to use in any content",
			url: "https://www.soundhelix.com/examples/mp3/Car-Engine.mp3",
		},
	];

	// Fetch music tracks from the Music API
	useEffect(() => {
		const fetchTracks = async () => {
			if (!searchQuery) {
				setMusicTracks([]);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const response = await fetch(`https://musicapi.x007.workers.dev/search?q=${encodeURIComponent(searchQuery)}&searchEngine=gaama`);
				const data = await response.json();

				if (data.status === 200 && data.response) {
					// Map API response to match the track structure
					const tracks = data.response.map((item: any) => ({
						id: item.id,
						title: item.title,
						artist: item.artist || "Unknown Artist",
						genre: item.genre || "Unknown", // API may not always provide genre
						mood: item.mood || "Unknown", // API may not always provide mood
						duration: item.duration || "Unknown", // API may not provide duration
						attribution: "Attribution may be required", // Conservative default
						license: "Check source platform terms", // Conservative default
						url: null, // Will fetch streaming URL later
					}));
					setMusicTracks(tracks);
				} else {
					setError("No tracks found for the search query.");
					setMusicTracks([]);
				}
			} catch (err) {
				setError("Failed to fetch tracks. Please try again.");
				setMusicTracks([]);
			} finally {
				setLoading(false);
			}
		};

		fetchTracks();
	}, [searchQuery]);

	// Fetch streaming URL when playing a track
	const fetchStreamingUrl = async (trackId: string) => {
		try {
			const response = await fetch(`https://musicapi.x007.workers.dev/fetch?id=${trackId}`);
			const data = await response.json();
			if (data.status === 200 && data.response.url) {
				return data.response.url;
			} else {
				throw new Error("Streaming URL not found");
			}
		} catch (err) {
			console.error("Error fetching streaming URL:", err);
			return null;
		}
	};

	// Filter music tracks based on genre and mood
	const filteredMusicTracks = musicTracks.filter((track) => {
		const matchesGenre = genreFilter === "all-genres" || track.genre === genreFilter;
		const matchesMood = moodFilter === "all-moods" || track.mood === moodFilter;
		return matchesGenre && matchesMood;
	});

	// Filter sound effects based on search query and category
	const filteredSoundEffects = soundEffects.filter((sfx) => {
		const matchesSearch = sfx.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = categoryFilter === "all-categories" || sfx.category === categoryFilter;
		return matchesSearch && matchesCategory;
	});

	const togglePlay = async (track: any) => {
		if (playing === track.id) {
			if (audioRef.current) {
				audioRef.current.pause();
				setPlaying(null);
				setCurrentTrack(null);
			}
		} else {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}

			// Fetch streaming URL for music tracks
			let streamingUrl = track.url;
			if (!streamingUrl && track.id) {
				streamingUrl = await fetchStreamingUrl(track.id);
				if (!streamingUrl) {
					setError("Unable to play track. Streaming URL not available.");
					return;
				}
			}

			audioRef.current = new Audio(streamingUrl);
			audioRef.current.play().catch((error) => {
				console.error("Error playing audio:", error);
				setError("Failed to play track. Please try another.");
			});
			setPlaying(track.id);
			setCurrentTrack(track);

			audioRef.current.onloadedmetadata = () => {
				setDuration(audioRef.current?.duration || 0);
			};
			audioRef.current.ontimeupdate = () => {
				setCurrentTime(audioRef.current?.currentTime || 0);
			};
		}
	};

	useEffect(() => {
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, []);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">Audio Library</h1>
			<p className="text-muted-foreground">Free music and sound effects for your YouTube videos</p>

			<Tabs defaultValue="music" className="w-full">
				<TabsList>
					<TabsTrigger value="music">Music</TabsTrigger>
					<TabsTrigger value="sound-effects">Sound Effects</TabsTrigger>
					<TabsTrigger value="saved">Saved</TabsTrigger>
				</TabsList>

				<TabsContent value="music" className="mt-6 space-y-6">
					<div className="flex flex-col gap-4 md:flex-row">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search for music (e.g., Besharam Rang)..."
								className="pl-8"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex gap-2">
							<Select value={genreFilter} onValueChange={setGenreFilter}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Genre" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all-genres">All Genres</SelectItem>
									<SelectItem value="Pop">Pop</SelectItem>
									<SelectItem value="Rock">Rock</SelectItem>
									<SelectItem value="Electronic">Electronic</SelectItem>
									<SelectItem value="Cinematic">Cinematic</SelectItem>
									<SelectItem value="Ambient">Ambient</SelectItem>
								</SelectContent>
							</Select>

							<Select value={moodFilter} onValueChange={setMoodFilter}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Mood" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all-moods">All Moods</SelectItem>
									<SelectItem value="Happy">Happy</SelectItem>
									<SelectItem value="Sad">Sad</SelectItem>
									<SelectItem value="Energetic">Energetic</SelectItem>
									<SelectItem value="Calm">Calm</SelectItem>
									<SelectItem value="Inspirational">Inspirational</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Free Music Tracks</CardTitle>
							<CardDescription>Music you can use in your YouTube videos</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							{loading ? (
								<div className="p-4 text-center text-muted-foreground">Loading tracks...</div>
							) : error ? (
								<div className="p-4 text-center text-red-500">{error}</div>
							) : filteredMusicTracks.length > 0 ? (
								<div className="divide-y">
									{filteredMusicTracks.map((track) => (
										<div key={track.id} className="flex items-center p-4 gap-4">
											<Button variant="ghost" size="icon" className="flex-shrink-0" onClick={() => togglePlay(track)}>
												{playing === track.id ? <Pause size={20} /> : <Play size={20} />}
											</Button>
											<div className="flex-1 min-w-0">
												<h3 className="font-medium truncate">{track.title}</h3>
												<div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
													<span>{track.artist}</span>
													<span>{track.genre}</span>
													<span>{track.duration}</span>
												</div>
											</div>
											<div className="flex gap-2">
												<Button variant="ghost" size="icon">
													<Plus size={18} />
												</Button>
												<Button variant="ghost" size="icon">
													<Download size={18} />
												</Button>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="p-4 text-center text-muted-foreground">No tracks found. Try searching for a song.</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="sound-effects" className="mt-6 space-y-6">
					<div className="flex flex-col gap-4 md:flex-row">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search for sound effects..."
								className="pl-8"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex gap-2">
							<Select value={categoryFilter} onValueChange={setCategoryFilter}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all-categories">All Categories</SelectItem>
									<SelectItem value="Weather">Weather</SelectItem>
									<SelectItem value="Household">Household</SelectItem>
									<SelectItem value="Audience">Audience</SelectItem>
									<SelectItem value="Vehicles">Vehicles</SelectItem>
									<SelectItem value="Animals">Animals</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Sound Effects</CardTitle>
							<CardDescription>Sound effects you can use in your YouTube videos</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							<div className="divide-y">
								{filteredSoundEffects.length > 0 ? (
									filteredSoundEffects.map((sfx) => (
										<div key={sfx.id} className="flex items-center p-4 gap-4">
											<Button variant="ghost" size="icon" className="flex-shrink-0" onClick={() => togglePlay(sfx)}>
												{playing === sfx.id ? <Pause size={20} /> : <Play size={20} />}
											</Button>
											<div className="flex-1 min-w-0">
												<h3 className="font-medium truncate">{sfx.title}</h3>
												<div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
													<span>{sfx.category}</span>
													<span>{sfx.duration}</span>
												</div>
											</div>
											<div className="flex gap-2">
												<Button variant="ghost" size="icon">
													<Plus size={18} />
												</Button>
												<Button variant="ghost" size="icon">
													<Download size={18} />
												</Button>
											</div>
										</div>
									))
								) : (
									<div className="p-4 text-center text-muted-foreground">No sound effects found</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="saved" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Saved Audio</CardTitle>
							<CardDescription>Your saved music and sound effects</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="py-8 text-center">
								<p className="text-muted-foreground mb-4">You haven't saved any audio tracks yet.</p>
								<Button variant="outline">Browse Audio Library</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<Card>
				<CardHeader>
					<CardTitle>Audio Library Usage Rules</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Music tracks are sourced from external platforms via an unofficial API. Always check the terms of the source platform (e.g., Gaana,
						JioSaavn) for usage rights, especially for commercial use.
					</p>
					<div className="space-y-2">
						<h3 className="font-medium">Attribution Requirements:</h3>
						<ul className="list-disc pl-6 text-sm text-muted-foreground">
							<li>
								<strong>Attribution may be required</strong>: Check the source platform’s terms for specific tracks.
							</li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="font-medium">Licenses:</h3>
						<ul className="list-disc pl-6 text-sm text-muted-foreground">
							<li>
								<strong>Check source platform terms</strong>: Usage rights vary by platform and track. Some may restrict commercial use.
							</li>
						</ul>
					</div>
					<p className="text-sm text-muted-foreground">Ensure compliance with the source platform’s licensing to avoid copyright issues.</p>
				</CardContent>
			</Card>

			{currentTrack && (
				<div className="fixed bottom-0 left-0 right-0 bg-gray-100 dark: border-t border-gray-300 p-4 flex items-center gap-4">
					<Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800" onClick={() => togglePlay(currentTrack)}>
						{playing === currentTrack.id ? <Pause size={20} /> : <Play size={20} />}
					</Button>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="text-gray-800 truncate">{currentTrack.title}</span>
							<span className="text-gray-600">-</span>
							<span className="text-gray-600">{currentTrack.artist}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-gray-600 text-sm">{formatTime(currentTime)}</span>
							<input
								type="range"
								min="0"
								max={duration}
								value={currentTime}
								onChange={(e) => {
									if (audioRef.current) {
										audioRef.current.currentTime = Number(e.target.value);
										setCurrentTime(Number(e.target.value));
									}
								}}
								className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
							/>
							<span className="text-gray-600 text-sm">{formatTime(duration)}</span>
						</div>
					</div>
					<Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
						<Volume2 size={20} />
					</Button>
				</div>
			)}
		</div>
	);
};

export default StudioAudioLibraryPage;
