import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LayoutDashboard, Video, Subscript, Copyright, DollarSign, Settings as SettingsIcon, Music2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { FaRegChartBar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "@/constants";

interface SidebarProps {
	open: boolean;
}

const StudioSidebar = ({ open }: SidebarProps) => {
	const isMobile = useIsMobile();
	const [profile, setProfile] = useState<any>(null);
	const [error, setError] = useState("");

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

	useEffect(() => {
		fetchProfile();
	}, []);

	const studioMenuItems = [
		{
			icon: <LayoutDashboard size={20} />,
			label: "Dashboard",
			path: "/studio/dashboard",
		},
		{
			icon: <Video size={20} />,
			label: "Content",
			path: "/studio/content",
		},
		{
			icon: <FaRegChartBar size={20} />,
			label: "Analytics",
			path: "/studio/analytics",
		},
		{
			icon: <Subscript size={20} />,
			label: "Subtitles",
			path: "/studio/subtitles",
		},
		{
			icon: <Copyright size={20} />,
			label: "Copyright",
			path: "/studio/copyright",
		},
		{
			icon: <DollarSign size={20} />,
			label: "Earn",
			path: "/studio/earn",
		},
		{
			icon: <SettingsIcon size={20} />,
			label: "Customization",
			path: "/studio/customization",
		},
		{
			icon: <Music2 size={20} />,
			label: "Audio Library",
			path: "/studio/audio-library",
		},
	];

	return (
		<aside
			className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r z-20 transition-all duration-300 overflow-y-auto ${
				open ? "w-64 shadow-lg md:shadow-none" : "w-0 -translate-x-full md:w-0"
			}`}
		>
			<div className="py-2">
				<div className="px-4 py-4 text-center">
					<Avatar className="h-20 w-20 mx-auto mb-3">
						<AvatarImage src={profile?.avatar} alt={profile?.fullName} />
						<AvatarFallback>{profile?.fullName?.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="text-sm font-medium mb-1">Your channel</div>
					<div className="text-xs text-muted-foreground">{profile?.fullName}</div>
				</div>

				<nav className="mt-2 space-y-1 px-2">
					{studioMenuItems.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) =>
								`flex items-center gap-4 px-3 py-2.5 rounded-lg w-full transition-colors ${
									isActive ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
								}`
							}
							onClick={() => isMobile && open}
						>
							{item.icon}
							<span>{item.label}</span>
						</NavLink>
					))}
				</nav>

				<div className="border-t border-zinc-200 dark:border-zinc-800 my-4"></div>

				<nav className="space-y-1 px-2">
					<NavLink
						to="/studio/settings"
						className={({ isActive }) =>
							`flex items-center gap-4 px-3 py-2.5 rounded-lg w-full transition-colors ${
								isActive ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
							}`
						}
					>
						<SettingsIcon size={20} />
						<span>Settings</span>
					</NavLink>

					<button
						type="button"
						className="flex items-center gap-4 px-3 py-2.5 rounded-lg w-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
					>
						<svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
							<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeWidth="2" />
							<path d="M12 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" />
							<path d="M12 6v7" strokeWidth="2" strokeLinecap="round" />
						</svg>
						<span>Send feedback</span>
					</button>
				</nav>
			</div>
		</aside>
	);
};

export default StudioSidebar;
