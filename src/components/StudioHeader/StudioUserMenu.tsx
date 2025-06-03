import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { IoLanguageOutline } from "react-icons/io5";
import { LogOut, Moon, Sun, User, Youtube } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { apiurl } from "@/constants";
import { AccountsDropdown, AppearanceDropdown, LanguageDropdown } from "@/components/dropdowns/index";

function StudioUserMenu() {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [profile, setProfile] = useState<any>(null);
	const [error, setError] = useState("");

	const { theme } = useTheme();
	const { toast } = useToast();
	const navigate = useNavigate();
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

	const handleOpenDropdown = (dropdown: string) => {
		setActiveDropdown(dropdown);
	};

	const handleCloseDropdown = () => {
		setActiveDropdown(null);
	};

	const fetchProfile = async () => {
		try {
			setError("");
			const response = await axios.get(`${apiurl}/users/current-user`, {
				withCredentials: true,
			});
			setProfile(response.data.data);
		} catch (err: any) {
			console.log("Error", error);
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

	const renderActiveDropdown = () => {
		switch (activeDropdown) {
			case "accounts":
				return <AccountsDropdown onClose={handleCloseDropdown} />;
			case "appearance":
				return <AppearanceDropdown onClose={handleCloseDropdown} />;
			case "language":
				return <LanguageDropdown onClose={handleCloseDropdown} />;

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
				<Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0">
					<Avatar className="h-8 w-8">
						<AvatarImage src={profile?.avatar} alt={profile?.fullName} />
						<AvatarFallback>{profile?.fullName?.charAt(0)}</AvatarFallback>
					</Avatar>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-72 border-0 bg-transparent shadow-none" align="end">
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
								<NavLink to="/channel" onClick={handleYourChannel} className="text-sm text-blue-500 hover:text-blue-400 mt-1">
									View your channel
								</NavLink>
							</div>
						</div>

						<div className="py-1">
							<Link to="/" className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
								<Youtube className="w-5 h-5 mr-3" />
								YouTube
							</Link>
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
							<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
								<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path d="M12 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" />
									<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeWidth="2" />
									<path d="M12 6v7" strokeWidth="2" strokeLinecap="round" />
								</svg>
								Send feedback
							</button>
						</div>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}

export default StudioUserMenu;
