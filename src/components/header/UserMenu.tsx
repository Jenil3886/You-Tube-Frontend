import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Moon, Sun, Settings, LogOut, Globe } from "lucide-react";
import { FaGoogle, FaRegKeyboard } from "react-icons/fa";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { IoLanguageOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { apiurl } from "@/constants";
import {
	AccountsDropdown,
	AppearanceDropdown,
	KeyboardShortcuts,
	LanguageDropdown,
	LocationDropdown,
	RestrictedModeDropdown,
} from "@/components/dropdowns/index";

const UserMenu = () => {
	const { theme } = useTheme();
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [profile, setProfile] = useState<any>(null);
	const [error, setError] = useState("");

	const { toast } = useToast();
	const navigate = useNavigate();
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

	const handleYourChannel = () => {
		navigate("/channel");
	};
	useEffect(() => {
		fetchProfile();
	}, []);

	return (
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
								<span className="font-medium">{error}</span>
								<NavLink to="/channel" onClick={handleYourChannel} className="text-sm text-blue-500 hover:text-blue-400 mt-1">
									View your channel
								</NavLink>
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
							<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
								<Settings className="w-5 h-5 mr-3" />
								Settings
							</button>
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
	);
};

export default UserMenu;
