import { NavLink } from "react-router-dom";
import {
	Home,
	History,
	Clock,
	ThumbsUp,
	Play,
	Film,
	Music,
	Radio,
	Gamepad2,
	Trophy,
	Newspaper,
	Flame,
	ShoppingBag,
	User,
	Settings,
	PanelLeft,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarItemProps, SidebarProps } from "@/types";

const SidebarItem = ({ icon, text, to, isCollapsed }: SidebarItemProps) => (
	<NavLink
		to={to}
		className={({ isActive }) =>
			`flex items-center gap-5 p-3 rounded-lg w-full transition-all duration-200 ease-in-out hover-lift ${isCollapsed ? "justify-center" : ""} ${
				isActive ? "bg-secondary font-medium" : "hover:bg-secondary/50"
			}`
		}
	>
		<div className="transition-transform duration-300 hover:scale-110">{icon}</div>
		{!isCollapsed && <span className="transition-opacity duration-200">{text}</span>}
	</NavLink>
);

const Sidebar = ({ open }: SidebarProps) => {
	const isMobile = useIsMobile();
	return (
		<aside
			className={`z-40 fixed top-17 left-0 h-[calc(100vh-4rem)] bg-background border-r transition-all duration-300 ease-in-out overflow-y-auto  ${
				isMobile ? (open ? "w-64" : "-translate-x-full") : open ? "w-64" : "w-20"
			} transform md:translate-x-0 [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600`}
		>
			{(open || !isMobile) && (
				<div className="p-2">
					{/* Main navigation */}
					<nav className="mb-6 fade-in">
						<SidebarItem icon={<Home size={20} />} text="Home" to="/" isCollapsed={!open} />
						<SidebarItem icon={<Play size={20} />} text="Shorts" to="/shorts" isCollapsed={!open} />
						<SidebarItem icon={<Film size={20} />} text="Subscriptions" to="/subscriptions" isCollapsed={!open} />
						<SidebarItem icon={<PanelLeft size={20} />} text="YouTube Studio" to="/studio" isCollapsed={!open} />
					</nav>

					{/* Library section */}
					{/* User section */}

					<div className="border-t pt-4 mt-2 mb-6 transition-all duration-300 ease-in-out">
						{open && <h3 className="px-3 mb-1 font-medium slide-in-left">You</h3>}
						<SidebarItem icon={<User size={20} />} text="Your Channel" to="/channel" isCollapsed={!open} />
						<SidebarItem icon={<History size={20} />} text="History" to="/history" isCollapsed={!open} />
						<SidebarItem icon={<Clock size={20} />} text="Watch Later" to="/watchlist" isCollapsed={!open} />
						<SidebarItem icon={<ThumbsUp size={20} />} text="Liked Videos" to="/liked" isCollapsed={!open} />
						<SidebarItem icon={<Settings size={20} />} text="Settings" to="/settings" isCollapsed={!open} />
						<SidebarItem icon={<User size={20} />} text="Profile" to="/profile" isCollapsed={!open} />
					</div>

					{/* Explore section */}
					{open && (
						<div className="border-t pt-4 mt-2 slide-in-left">
							<h3 className="px-3 mb-1 font-medium">Explore</h3>
							<SidebarItem icon={<Flame size={20} />} text="Trending" to="/trending" isCollapsed={!open} />
							<SidebarItem icon={<Music size={20} />} text="Music" to="/music" isCollapsed={!open} />
							<SidebarItem icon={<Radio size={20} />} text="Live" to="/live" isCollapsed={!open} />
							<SidebarItem icon={<Gamepad2 size={20} />} text="Gaming" to="/gaming" isCollapsed={!open} />
							<SidebarItem icon={<Newspaper size={20} />} text="News" to="/news" isCollapsed={!open} />
							<SidebarItem icon={<Trophy size={20} />} text="Sports" to="/sports" isCollapsed={!open} />
							<SidebarItem icon={<ShoppingBag size={20} />} text="Shopping" to="/shopping" isCollapsed={!open} />
						</div>
					)}
				</div>
			)}
		</aside>
	);
};

export default Sidebar;
