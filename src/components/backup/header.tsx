import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlignJustify, Bell, Globe, LogOut, Mic, MicOff, Moon, Plus, Radio, Search, Settings, Sun, User } from "lucide-react";
import { RiShieldUserLine, RiVideoUploadLine } from "react-icons/ri";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import AccountsDropdown from "@/components/dropdowns/AccountsDropdown";
import AppearanceDropdown from "@/components/dropdowns/AppearanceDropdown";
import LanguageDropdown from "@/components/dropdowns/LanguageDropdown";
import RestrictedModeDropdown from "@/components/dropdowns/RestrictedModeDropdown";
import LocationDropdown from "@/components/dropdowns/LocationDropdown";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { IoLanguageOutline } from "react-icons/io5";
import { FaGoogle, FaRegKeyboard } from "react-icons/fa";
import axios from "axios";

import YoutubeLogo from "@/assets/youtubelogo.png";
import KeyboardShortcuts from "@/components/dropdowns/KeyboardShortcuts";
import NotificationsDrawer from "../notifications/NotificationsDrawer";
import { apiurl } from "@/constants";

// Add TypeScript declarations for the Web Speech API
interface SpeechRecognitionErrorEvent extends Event {
	error: string;
}

interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	readonly length: number;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	readonly length: number;
	[index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

interface SpeechRecognition extends EventTarget {
	lang: string;
	continuous: boolean;
	interimResults: boolean;
	start(): void;
	stop(): void;
	onstart: (event: Event) => void;
	onresult: (event: SpeechRecognitionEvent) => void;
	onerror: (event: SpeechRecognitionErrorEvent) => void;
	onend: (event: Event) => void;
}

declare global {
	interface Window {
		SpeechRecognition: new () => SpeechRecognition;
		webkitSpeechRecognition: new () => SpeechRecognition;
	}
}

interface HeaderProps {
	onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isListening, setIsListening] = useState(false);
	const [error, setError] = useState("");
	const [profile, setProfile] = useState<any>(null);

	const navigate = useNavigate();
	const { theme } = useTheme();
	const { toast } = useToast();
	const recognitionRef = useRef<SpeechRecognition | null>(null);

	// State for dropdown visibility
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	const startListening = () => {
		if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
			// Initialize the SpeechRecognition object
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			recognitionRef.current = new SpeechRecognition();

			recognitionRef.current.lang = "en-US";
			recognitionRef.current.continuous = false;
			recognitionRef.current.interimResults = false;

			recognitionRef.current.onstart = () => {
				setIsListening(true);
				toast({
					title: "Listening...",
					description: "Speak now to search",
				});
			};

			recognitionRef.current.onresult = (event) => {
				const transcript = event.results[0][0].transcript;
				setSearchQuery(transcript);
				setIsListening(false);

				// If confidence is high enough, automatically submit search
				if (event.results[0][0].confidence > 0.8) {
					setTimeout(() => {
						navigate(`/search?q=${encodeURIComponent(transcript.trim())}`);
					}, 500);
				}
			};

			recognitionRef.current.onerror = (event) => {
				console.error("Speech recognition error", event.error);
				setIsListening(false);
				toast({
					title: "Error",
					description: `Could not recognize speech: ${event.error}`,
					variant: "destructive",
				});
			};

			recognitionRef.current.onend = () => {
				setIsListening(false);
			};

			recognitionRef.current.start();
		} else {
			toast({
				title: "Not Supported",
				description: "Speech recognition is not supported in your browser.",
				variant: "destructive",
			});
		}
	};

	const stopListening = () => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
			setIsListening(false);
		}
	};

	const toggleListening = () => {
		if (isListening) {
			stopListening();
		} else {
			startListening();
		}
	};

	const handleOpenDropdown = (dropdown: string) => {
		setActiveDropdown(dropdown);
	};

	const handleCloseDropdown = () => {
		setActiveDropdown(null);
	};

	// Toggle user menu visibility
	const toggleUserMenu = () => {
		setIsUserMenuOpen(!isUserMenuOpen);
		if (!isUserMenuOpen) {
			setActiveDropdown(null);
		}
	};

	const toggleNotifications = () => {
		setIsNotificationsOpen(!isNotificationsOpen);
	};

	const handleLogout = async () => {
		try {
			await axios.post(`${apiurl}/users/logout`, {}, { withCredentials: true });
			toast({
				title: "Logged out",
				description: "You have been successfully logged out.",
			});
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
			toast({
				title: "Error",
				description: "Failed to log out. Please try again.",
				variant: "destructive",
			});
		}
	};

	// Render the appropriate dropdown based on activeDropdown state
	const renderActiveDropdown = () => {
		switch (activeDropdown) {
			case "accounts":
				return <AccountsDropdown onClose={handleCloseDropdown} />;
			case "appearance":
				return <AppearanceDropdown onClose={handleCloseDropdown} />;
			case "language":
				return <LanguageDropdown onClose={handleCloseDropdown} />;
			case "restrictedMode":
				return <RestrictedModeDropdown onClose={handleCloseDropdown} />;
			case "location":
				return <LocationDropdown onClose={handleCloseDropdown} />;
			case "KeyboardShortcuts":
				return <KeyboardShortcuts onClose={handleCloseDropdown} />;
			default:
				return null;
		}
	};

	const fetchProfile = async () => {
		try {
			setError("");
			const response = await axios.get(`${apiurl}/users/current-user`, {
				withCredentials: true,
			});
			setProfile(response.data.data);
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to fetch profile data");
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background border-b">
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" onClick={onMenuClick} className="rounded-full">
					<AlignJustify className="h-5 w-5" />
				</Button>
				<Link to="/" className="flex items-baseline gap-1 ">
					<img src={YoutubeLogo} alt="" className="h-5 w-full " />
				</Link>
			</div>

			<form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
				<div className="flex">
					<Input
						type="text"
						placeholder="Search"
						className="rounded-r-none rounded-l-full px-4  border-r-0"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>

					<Button type="submit" variant="ghost" size="icon" className="rounded-r-full rounded-l-none bg-gray-100 dark:bg-[#262626] px-6 border-l">
						<Search className="h-5 w-5" />
					</Button>

					<Button
						variant={isListening ? "default" : "ghost"}
						size="icon"
						className={`rounded-full ml-2 ${isListening ? "bg-youtube-red text-white" : ""}`}
						type="button"
						onClick={toggleListening}
						title={isListening ? "Stop listening" : "Search with voice"}
					>
						{isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
					</Button>
				</div>
			</form>

			<div className="flex items-center gap-4">
				{/* Create Button Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border-none rounded-full">
							<Plus className="h-4 w-4" />
							<span>Create</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="center" className="bg-zinc-900 border-zinc-800 text-white w-52 p-1">
						<Link to="/upload">
							<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
								<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
									<RiVideoUploadLine className="h-6 w-6" />
								</div>

								<span className="text-sm">Upload video</span>
							</div>
						</Link>
						<Link to="/live">
							<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
								<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
									<Radio className="h-6 w-6" />
								</div>
								<span className="text-sm">Go live</span>
							</div>
						</Link>
						<Link to="/post">
							<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
								<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
									<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
										<rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
										<path d="M3 8h18M8 3v18" strokeWidth="2" />
									</svg>
								</div>
								<span className="text-sm">Create post</span>
							</div>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button variant="ghost" size="icon" className="rounded-full relative" onClick={toggleNotifications}>
					<Bell className="h-5 w-5" />
					<span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
				</Button>

				<Popover
					open={isUserMenuOpen || activeDropdown !== null}
					onOpenChange={(open) => {
						setIsUserMenuOpen(open);
						if (!open) setActiveDropdown(null);
					}}
				>
					<PopoverTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0" onClick={toggleUserMenu}>
							<Avatar className="h-9 w-9">
								<AvatarImage src={profile?.avatar} alt={profile?.fullName} />
								<AvatarFallback>{profile?.fullName?.charAt(0)}</AvatarFallback>
							</Avatar>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0 w-80 border-0 bg-transparent shadow-none" align="end">
						{activeDropdown ? (
							renderActiveDropdown()
						) : (
							<div className="rounded-xl py-2 bg-zinc-900 text-white border border-zinc-800 overflow-hidden">
								<div className="px-4 py-2 flex items-center gap-3 border-b border-zinc-800 pb-3">
									<Avatar className="h-9 w-9">
										<AvatarImage src={profile?.avatar} alt={profile?.fullName} />
										<AvatarFallback>{profile?.fullName?.charAt(0)}</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span className="font-medium">{profile?.fullName}</span>
										<span className="text-sm text-gray-400">{profile?.email}</span>
										<Link to="/channel" className="text-sm text-blue-500 hover:text-blue-400 mt-1">
											View your channel
										</Link>
									</div>
								</div>

								<div className="py-1">
									<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<FaGoogle className="w-5 h-5 mr-3" />
										Google Account
									</button>
									<button
										className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
										onClick={() => handleOpenDropdown("accounts")}
									>
										<div className="flex items-center">
											<User className="w-5 h-5 mr-3" />
											Switch account
										</div>
										<span className="text-sm">›</span>
									</button>
									<button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<LogOut className="w-5 h-5 mr-3" />
										Sign out
									</button>
								</div>

								<div className="border-t border-zinc-800 my-1"></div>

								<div className="py-1">
									<Link to="/studio" className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
											<circle cx="12" cy="12" r="3" strokeWidth="2" />
											<path d="M16.5 7.5L16.5 7.51" strokeWidth="2" strokeLinecap="round" />
										</svg>
										YouTube Studio
									</Link>
									<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<PiCurrencyCircleDollar className="w-5 h-5 mr-3" />
										Purchases and memberships
									</button>
									<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<RiShieldUserLine className="w-5 h-5 mr-3" />
										Your data in YouTube
									</button>
								</div>

								<div className="border-t border-zinc-800 my-1"></div>

								<div className="py-1">
									<button
										className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
										onClick={() => handleOpenDropdown("appearance")}
									>
										<div className="flex items-center">
											{theme === "dark" ? <Moon className="w-5 h-5 mr-3" /> : <Sun className="w-5 h-5 mr-3" />}
											Appearance: {theme === "system" ? "Device theme" : theme === "dark" ? "Dark theme" : "Light theme"}
										</div>
										<span className="text-sm">›</span>
									</button>
									<button
										className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
										onClick={() => handleOpenDropdown("language")}
									>
										<div className="flex items-center">
											<IoLanguageOutline className="w-5 h-5 mr-3" />
											Language: British English
										</div>
										<span className="text-sm">›</span>
									</button>
									<button
										className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
										onClick={() => handleOpenDropdown("restrictedMode")}
									>
										<div className="flex items-center">
											<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
												<rect x="3" y="11" width="18" height="10" rx="2" strokeWidth="2" />
												<circle cx="12" cy="5" r="2" strokeWidth="2" />
												<path d="M12 7v4" strokeWidth="2" />
												<path d="M8 21v-4" strokeWidth="2" />
												<path d="M16 21v-4" strokeWidth="2" />
											</svg>
											Restricted Mode: Off
										</div>
										<span className="text-sm">›</span>
									</button>
									<button
										className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
										onClick={() => handleOpenDropdown("location")}
									>
										<div className="flex items-center">
											<Globe className="w-5 h-5 mr-3" />
											Location: India
										</div>
										<span className="text-sm">›</span>
									</button>
									<button
										onClick={() => handleOpenDropdown("KeyboardShortcuts")}
										className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800"
									>
										<FaRegKeyboard className="w-5 h-5 mr-3" />
										Keyboard shortcuts
									</button>
								</div>

								<div className="border-t border-zinc-800 my-1"></div>

								<div className="py-1">
									<Link to="/settings" className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<Settings className="w-5 h-5 mr-3" />
										Settings
									</Link>
								</div>

								<div className="border-t border-zinc-800 my-1"></div>

								<div className="py-1">
									<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<circle cx="12" cy="12" r="10" strokeWidth="2" />
											<path d="M12 16v.01" strokeWidth="2" strokeLinecap="round" />
											<path d="M12 8v4" strokeWidth="2" strokeLinecap="round" />
										</svg>
										Help
									</button>
									<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<path
												d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
												strokeWidth="2"
											/>
										</svg>
										Send feedback
									</button>
								</div>
							</div>
						)}
					</PopoverContent>
				</Popover>
			</div>

			{/* Notifications Drawer */}
			<NotificationsDrawer open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
		</header>
	);
};

export default Header;
