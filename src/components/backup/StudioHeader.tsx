import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Video, Subscript, Copyright, DollarSign, Settings, Music2, Menu, Search, HelpCircle, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaRegChartBar } from "react-icons/fa";

const StudioLayout2 = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	// const location = useLocation();
	const isMobile = useIsMobile();
	// const [activeTab, setActiveTab] = useState("inspiration");
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	// Close sidebar by default on mobile
	useEffect(() => {
		if (isMobile) {
			setSidebarOpen(false);
		} else {
			setSidebarOpen(true);
		}
	}, [isMobile]);

	// Determine content tab based on path
	// useEffect(() => {
	// 	if (location.pathname.includes("/studio/content")) {
	// 		const hash = location.hash.replace("#", "");
	// 		if (hash) {
	// 			setActiveTab(hash);
	// 		} else {
	// 			setActiveTab("inspiration");
	// 		}
	// 	}
	// }, [location]);

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
			icon: <Settings size={20} />,
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
		<div className="flex flex-col h-screen bg-background">
			{/* Studio Header */}
			<header className="h-16 bg-background border-b flex items-center justify-between px-4 md:px-6 z-10">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-full">
						<Menu size={20} />
					</Button>
					<NavLink to="/studio" className="flex items-center">
						<Video className="h-6 w-6 text-youtube-red mr-2" />
						<span className="text-lg md:text-xl font-semibold">Studio</span>
					</NavLink>
				</div>

				{/* Search bar */}
				<div className="hidden md:flex flex-1 max-w-xl mx-4">
					<div className="flex w-full rounded-full border overflow-hidden">
						<Input type="text" placeholder="Search across your channel" className="rounded-l-full rounded-r-none border-none flex-grow" />
						<Button type="submit" variant="ghost" size="icon" className="rounded-r-full rounded-l-none bg-gray-100 dark:bg-gray-800 px-6 border-l">
							<Search className="h-5 w-5" />
						</Button>
					</div>
				</div>

				{/* Right side icons */}
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon" className="rounded-full">
						<HelpCircle size={20} />
					</Button>

					{/* Create button */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="hidden md:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border-none rounded-full"
							>
								<Plus className="h-4 w-4" />
								<span>Create</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="center" className="bg-zinc-900 border-zinc-800 text-white w-52 p-1">
							<NavLink to="/upload" className="w-full">
								<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
									<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
										<Upload className="h-5 w-5" />
									</div>
									<span className="text-sm">Upload videos</span>
								</div>
							</NavLink>
							<NavLink to="/live" className="w-full">
								<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
									<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
										<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<circle cx="12" cy="12" r="7" strokeWidth="2" />
											<circle cx="12" cy="12" r="3" strokeWidth="2" />
										</svg>
									</div>
									<span className="text-sm">Go live</span>
								</div>
							</NavLink>
							<NavLink to="/post" className="w-full">
								<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
									<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
										<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
											<path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round" />
										</svg>
									</div>
									<span className="text-sm">Create post</span>
								</div>
							</NavLink>
							<NavLink to="/playlist" className="w-full">
								<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
									<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
										<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" />
											<path d="M9 10l6 4-6 4V10z" fill="currentColor" />
										</svg>
									</div>
									<span className="text-sm">New playlist</span>
								</div>
							</NavLink>
							<NavLink to="/podcast" className="w-full">
								<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
									<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
										<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<circle cx="12" cy="12" r="10" strokeWidth="2" />
											<path d="M8 12a4 4 0 0 1 8 0M9 16a3 3 0 0 1 6 0" strokeWidth="2" />
											<circle cx="12" cy="12" r="1" fill="currentColor" />
										</svg>
									</div>
									<span className="text-sm">New podcast</span>
								</div>
							</NavLink>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* User profile */}
					<Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
						<PopoverTrigger asChild>
							<Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://github.com/shadcn.png" alt="Jenil Gajera" />
									<AvatarFallback>JG</AvatarFallback>
								</Avatar>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="p-0 w-72 border-0 bg-transparent shadow-none" align="end">
							<div className="rounded-xl py-2 bg-zinc-900 text-white border border-zinc-800 overflow-hidden">
								<div className="px-4 py-2 flex items-center gap-3 border-b border-zinc-800 pb-3">
									<Avatar className="h-9 w-9">
										<AvatarImage src="https://github.com/shadcn.png" alt="Jenil Gajera" />
										<AvatarFallback>JG</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span className="font-medium">Jenil Gajera</span>
										<span className="text-sm text-gray-400">@jenilgajera7383</span>
										<NavLink to="/channel" className="text-sm text-blue-500 hover:text-blue-400 mt-1">
											View your channel
										</NavLink>
									</div>
								</div>

								<div className="py-1">
									<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
											<path d="M10 12h4m-2-2v4" strokeWidth="2" strokeLinecap="round" />
										</svg>
										YouTube
									</button>
									<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" />
											<path d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2" />
										</svg>
										Switch account
									</button>
									<button className="flex w-full items-center px-4 py-2 text-white hover:bg-zinc-800">
										<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2" />
											<path d="M16 17l5-5-5-5" strokeWidth="2" />
											<path d="M21 12H9" strokeWidth="2" />
										</svg>
										Sign out
									</button>
								</div>

								<div className="border-t border-zinc-800 my-1"></div>

								<div className="py-1">
									<button className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800">
										<div className="flex items-center">
											<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
												<path
													d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
													strokeWidth="2"
													strokeLinecap="round"
												/>
											</svg>
											Appearance: Device theme
										</div>
										<span className="text-sm">›</span>
									</button>
									<button className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800">
										<div className="flex items-center">
											<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
												<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeWidth="2" />
												<path d="M2 12h20" strokeWidth="2" />
												<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
											</svg>
											Language: English
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
						</PopoverContent>
					</Popover>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				{/* Studio Sidebar */}
				<aside
					className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r z-20 transition-all duration-300 overflow-y-auto overflow-x-hidden ${
						sidebarOpen ? "w-64 shadow-lg md:shadow-none" : "w-0 -translate-x-full md:w-0 md:-translate-x-full"
					}`}
				>
					<div className="py-2">
						<div className="px-4 py-4 text-center">
							<Avatar className="h-20 w-20 mx-auto mb-3">
								<AvatarImage src="https://github.com/shadcn.png" alt="Jenil Gajera" />
								<AvatarFallback>JG</AvatarFallback>
							</Avatar>
							<div className="text-sm font-medium mb-1">Your channel</div>
							<div className="text-xs text-muted-foreground">Jenil Gajera</div>
						</div>

						<nav className="mt-2 space-y-1 px-2">
							{studioMenuItems.map((item) => (
								<NavLink
									key={item.path}
									to={item.path}
									className={({ isActive }) =>
										`flex items-center gap-4 px-3 py-2.5 rounded-lg w-full ${
											isActive ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
										}`
									}
									onClick={() => isMobile && setSidebarOpen(false)}
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
									`flex items-center gap-4 px-3 py-2.5 rounded-lg w-full ${
										isActive ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
									}`
								}
							>
								<Settings size={20} />
								<span>Settings</span>
							</NavLink>

							<button className="flex items-center gap-4 px-3 py-2.5 rounded-lg w-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
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

				{/* Overlay for mobile when sidebar is open */}
				{isMobile && sidebarOpen && <div className="fixed inset-0 bg-black/30 z-10" onClick={() => setSidebarOpen(false)} />}

				{/* Main Content */}
				<main className={`flex-1 transition-all duration-300 overflow-auto ${sidebarOpen && !isMobile ? "md:ml-64" : "ml-0"}`}>
					<div className="p-4 md:p-6 max-w-7xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default StudioLayout2;
